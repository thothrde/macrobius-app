// Enhanced Service Worker for Macrobius App
// Version 2.0.0

const CACHE_NAME = 'macrobius-v2.0.0';
const DYNAMIC_CACHE = 'macrobius-dynamic-v2.0.0';
const ORACLE_CACHE = 'macrobius-oracle-v2.0.0';

// Enhanced Cache Strategy Configuration
const CACHE_STRATEGIES = {
  NETWORK_FIRST: 'networkFirst',
  CACHE_FIRST: 'cacheFirst',
  STALE_WHILE_REVALIDATE: 'staleWhileRevalidate'
};

// Enhanced Static Assets to Cache
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/_next/static/css/',
  '/_next/static/js/',
  '/offline.html'
];

// Enhanced API Endpoints Configuration
const API_ENDPOINTS = {
  oracle: {
    base: 'http://152.70.184.232:8080',
    endpoints: ['/api/passages', '/api/themes', '/api/insights', '/api/search'],
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    cacheDuration: 1000 * 60 * 30 // 30 minutes
  },
  local: {
    base: location.origin,
    endpoints: ['/api/'],
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    cacheDuration: 1000 * 60 * 5 // 5 minutes
  }
};

// Enhanced Install Event
self.addEventListener('install', (event) => {
  console.log('[SW] Enhanced Service Worker installing...');
  
  event.waitUntil(
    (async () => {
      try {
        // Open static cache
        const staticCache = await caches.open(CACHE_NAME);
        
        // Cache static assets
        await staticCache.addAll(STATIC_ASSETS);
        
        // Create dynamic and Oracle caches
        await caches.open(DYNAMIC_CACHE);
        await caches.open(ORACLE_CACHE);
        
        console.log('[SW] Enhanced caches created successfully');
        
        // Skip waiting to activate immediately
        self.skipWaiting();
      } catch (error) {
        console.error('[SW] Installation failed:', error);
      }
    })()
  );
});

// Enhanced Activate Event
self.addEventListener('activate', (event) => {
  console.log('[SW] Enhanced Service Worker activating...');
  
  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames
          .filter(name => 
            name.startsWith('macrobius-') && 
            ![
              CACHE_NAME, 
              DYNAMIC_CACHE, 
              ORACLE_CACHE
            ].includes(name)
          )
          .map(name => caches.delete(name));
        
        await Promise.all(deletePromises);
        
        console.log('[SW] Old caches cleaned up');
        
        // Claim all clients
        await self.clients.claim();
        
        console.log('[SW] Enhanced Service Worker activated');
      } catch (error) {
        console.error('[SW] Activation failed:', error);
      }
    })()
  );
});

// Enhanced Fetch Event with Multiple Strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Enhanced Oracle Cloud API handling
  if (url.hostname === '152.70.184.232') {
    event.respondWith(handleOracleRequest(request));
    return;
  }
  
  // Enhanced Static Asset handling
  if (isStaticAsset(url)) {
    event.respondWith(handleStaticAsset(request));
    return;
  }
  
  // Enhanced API handling
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleAPIRequest(request));
    return;
  }
  
  // Enhanced Navigation handling
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }
  
  // Enhanced Default handling
  event.respondWith(handleDefault(request));
});

// Enhanced Oracle Cloud Request Handler
async function handleOracleRequest(request) {
  try {
    // Try network first with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const networkResponse = await fetch(request, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (networkResponse.ok) {
      // Cache successful Oracle responses
      const cache = await caches.open(ORACLE_CACHE);
      cache.put(request, networkResponse.clone());
      
      console.log('[SW] Oracle request successful, cached');
      return networkResponse;
    }
    
    throw new Error(`Oracle request failed: ${networkResponse.status}`);
  } catch (error) {
    console.warn('[SW] Oracle network failed, trying cache:', error.message);
    
    // Try cache as fallback
    const cache = await caches.open(ORACLE_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      console.log('[SW] Serving Oracle request from cache');
      return cachedResponse;
    }
    
    // Return offline fallback for Oracle requests
    return new Response(
      JSON.stringify({
        error: 'Oracle Cloud offline',
        message: 'Using offline mode',
        offline: true,
        data: []
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'SW-Cache-Status': 'offline-fallback'
        }
      }
    );
  }
}

// Enhanced Static Asset Handler
async function handleStaticAsset(request) {
  try {
    // Cache first strategy for static assets
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      // Update cache in background
      updateCacheInBackground(request, cache);
      return cachedResponse;
    }
    
    // If not in cache, fetch and cache
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Static asset fetch failed:', error);
    
    // Try to serve from any available cache
    const allCaches = await caches.keys();
    for (const cacheName of allCaches) {
      const cache = await caches.open(cacheName);
      const response = await cache.match(request);
      if (response) {
        return response;
      }
    }
    
    throw error;
  }
}

// Enhanced API Request Handler
async function handleAPIRequest(request) {
  try {
    // Network first with fallback to cache
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache API responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      
      return networkResponse;
    }
    
    throw new Error(`API request failed: ${networkResponse.status}`);
  } catch (error) {
    console.warn('[SW] API network failed, trying cache:', error.message);
    
    // Try cache as fallback
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return error response
    return new Response(
      JSON.stringify({
        error: 'API offline',
        message: 'Service temporarily unavailable'
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Enhanced Navigation Handler
async function handleNavigation(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      return networkResponse;
    }
    
    throw new Error(`Navigation failed: ${networkResponse.status}`);
  } catch (error) {
    console.warn('[SW] Navigation network failed, serving app shell:', error.message);
    
    // Serve app shell from cache
    const cache = await caches.open(CACHE_NAME);
    const appShell = await cache.match('/');
    
    if (appShell) {
      return appShell;
    }
    
    // Fallback to offline page
    const offlinePage = await cache.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }
    
    // Ultimate fallback
    return new Response(
      '<html><body><h1>Offline</h1><p>App is offline. Please check your connection.</p></body></html>',
      {
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }
}

// Enhanced Default Handler
async function handleDefault(request) {
  try {
    // Stale while revalidate strategy
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    // Fetch from network in background
    const networkPromise = fetch(request)
      .then(response => {
        if (response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      })
      .catch(error => {
        console.warn('[SW] Background fetch failed:', error.message);
        return null;
      });
    
    // Return cached version immediately if available
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Otherwise wait for network
    return await networkPromise;
  } catch (error) {
    console.error('[SW] Default handler failed:', error);
    throw error;
  }
}

// Enhanced Background Sync
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(performBackgroundSync());
  }
});

// Enhanced Background Sync Function
async function performBackgroundSync() {
  try {
    console.log('[SW] Performing background sync...');
    
    // Sync any pending data
    // This would typically sync offline actions, user data, etc.
    
    // Example: sync user progress
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        timestamp: Date.now()
      });
    });
    
    console.log('[SW] Background sync completed');
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// Enhanced Push Notification Handler
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: 'Neue Inhalte in Macrobius verfügbar!',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'open',
        title: 'Öffnen',
        icon: '/icon-96x96.png'
      },
      {
        action: 'dismiss',
        title: 'Schließen',
        icon: '/icon-96x96.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Macrobius', options)
  );
});

// Enhanced Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      self.clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// Enhanced Message Handler
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: '2.0.0',
      caches: [CACHE_NAME, DYNAMIC_CACHE, ORACLE_CACHE]
    });
  }
});

// Enhanced Utility Functions
function isStaticAsset(url) {
  return (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2')
  );
}

async function updateCacheInBackground(request, cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response);
      console.log('[SW] Cache updated in background for:', request.url);
    }
  } catch (error) {
    console.warn('[SW] Background cache update failed:', error.message);
  }
}

// Enhanced Cache Management
async function cleanupCaches() {
  try {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
      name.startsWith('macrobius-') && 
      ![
        CACHE_NAME,
        DYNAMIC_CACHE,
        ORACLE_CACHE
      ].includes(name)
    );
    
    await Promise.all(oldCaches.map(name => caches.delete(name)));
    console.log('[SW] Cleaned up old caches:', oldCaches);
  } catch (error) {
    console.error('[SW] Cache cleanup failed:', error);
  }
}

// Enhanced Periodic Cache Cleanup
setInterval(cleanupCaches, 1000 * 60 * 60); // Every hour

console.log('[SW] Enhanced Macrobius Service Worker v2.0.0 loaded');
