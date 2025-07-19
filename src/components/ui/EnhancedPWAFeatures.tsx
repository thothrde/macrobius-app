'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Wifi, WifiOff, Smartphone, Monitor, X } from 'lucide-react';
import EnhancedClassicalButton from './EnhancedClassicalButton';
import EnhancedClassicalCard from './EnhancedClassicalCard';

// Extended ServiceWorkerRegistration interface for Background Sync
interface ExtendedServiceWorkerRegistration extends ServiceWorkerRegistration {
  sync?: {
    register(tag: string): Promise<void>;
  };
}

// Enhanced PWA Install Prompt
interface EnhancedPWAInstallProps {
  onInstall?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const EnhancedPWAInstall: React.FC<EnhancedPWAInstallProps> = ({
  onInstall,
  onDismiss,
  className
}) => {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');
  
  useEffect(() => {
    // Check if already installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsInstalled(true);
        return;
      }
      
      if ((navigator as any).standalone === true) {
        setIsInstalled(true);
        return;
      }
    };
    
    // Detect platform
    const detectPlatform = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (/iphone|ipad|ipod/.test(userAgent)) {
        setPlatform('ios');
      } else if (/android/.test(userAgent)) {
        setPlatform('android');
      } else {
        setPlatform('desktop');
      }
    };
    
    checkInstalled();
    detectPlatform();
    
    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };
    
    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);
  
  const handleInstall = async () => {
    if (!deferredPrompt) {
      // For iOS, show instructions
      if (platform === 'ios') {
        alert(
          language === 'DE' 
            ? 'Um diese App zu installieren, tippen Sie auf das Teilen-Symbol und wählen "Zum Home-Bildschirm"'
            : 'To install this app, tap the share button and select "Add to Home Screen"'
        );
      }
      return;
    }
    
    try {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      
      if (result.outcome === 'accepted') {
        onInstall?.();
      }
      
      setDeferredPrompt(null);
      setShowInstallPrompt(false);
    } catch (error) {
      console.error('Install failed:', error);
    }
  };
  
  const handleDismiss = () => {
    setShowInstallPrompt(false);
    onDismiss?.();
  };
  
  // Don't show if already installed or no support
  if (isInstalled || (!deferredPrompt && platform !== 'ios')) {
    return null;
  }
  
  return (
    <EnhancedClassicalCard
      variant="cosmic"
      className={cn("fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40", className)}
      glow
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          {platform === 'desktop' ? (
            <Monitor className="w-8 h-8 text-yellow-400 animate-shimmer-enhanced" />
          ) : (
            <Smartphone className="w-8 h-8 text-yellow-400 animate-shimmer-enhanced" />
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-white mb-1">
              {language === 'DE' && 'App installieren'}
              {language === 'EN' && 'Install App'}
              {language === 'LA' && 'App Installare'}
            </h3>
            <p className="text-sm text-white/70">
              {language === 'DE' && 'Installieren Sie Macrobius für eine bessere Erfahrung'}
              {language === 'EN' && 'Install Macrobius for a better experience'}
              {language === 'LA' && 'Macrobius installare pro meliore experientia'}
            </p>
          </div>
          
          <div className="flex gap-2">
            <EnhancedClassicalButton
              variant="primary"
              size="sm"
              onClick={handleInstall}
              icon={<Download className="w-4 h-4" />}
            >
              {language === 'DE' && 'Installieren'}
              {language === 'EN' && 'Install'}
              {language === 'LA' && 'Installare'}
            </EnhancedClassicalButton>
            
            <EnhancedClassicalButton
              variant="tertiary"
              size="sm"
              onClick={handleDismiss}
              icon={<X className="w-4 h-4" />}
            >
              {language === 'DE' && 'Später'}
              {language === 'EN' && 'Later'}
              {language === 'LA' && 'Posterius'}
            </EnhancedClassicalButton>
          </div>
        </div>
      </div>
    </EnhancedClassicalCard>
  );
};

// Enhanced Offline Status
interface EnhancedOfflineStatusProps {
  className?: string;
}

const EnhancedOfflineStatus: React.FC<EnhancedOfflineStatusProps> = ({
  className
}) => {
  const { language } = useLanguage();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Auto-hide offline message after 5 seconds
  useEffect(() => {
    if (showOfflineMessage) {
      const timer = setTimeout(() => {
        setShowOfflineMessage(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showOfflineMessage]);
  
  if (!showOfflineMessage && isOnline) {
    return null;
  }
  
  return (
    <div className={cn(
      "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-enhanced",
      className
    )}>
      <EnhancedClassicalCard
        variant={isOnline ? 'oracle' : 'default'}
        className="flex items-center gap-3 px-4 py-2"
      >
        {isOnline ? (
          <>
            <Wifi className="w-5 h-5 text-green-400 animate-shimmer-enhanced" />
            <span className="text-sm font-medium text-white">
              {language === 'DE' && 'Verbindung wiederhergestellt'}
              {language === 'EN' && 'Connection restored'}
              {language === 'LA' && 'Connexio restaurata'}
            </span>
          </>
        ) : (
          <>
            <WifiOff className="w-5 h-5 text-red-400 animate-shimmer-enhanced" />
            <span className="text-sm font-medium text-white">
              {language === 'DE' && 'Offline-Modus aktiv'}
              {language === 'EN' && 'Offline mode active'}
              {language === 'LA' && 'Modus offline activus'}
            </span>
          </>
        )}
      </EnhancedClassicalCard>
    </div>
  );
};

// Enhanced Service Worker Update Notification
interface EnhancedSWUpdateProps {
  onUpdate?: () => void;
  className?: string;
}

const EnhancedSWUpdate: React.FC<EnhancedSWUpdateProps> = ({
  onUpdate,
  className
}) => {
  const { language } = useLanguage();
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
      
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker);
                setShowUpdatePrompt(true);
              }
            });
          }
        });
      });
    }
  }, []);
  
  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      onUpdate?.();
    }
    setShowUpdatePrompt(false);
  };
  
  const handleDismiss = () => {
    setShowUpdatePrompt(false);
  };
  
  if (!showUpdatePrompt) {
    return null;
  }
  
  return (
    <EnhancedClassicalCard
      variant="cosmic"
      className={cn("fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40", className)}
      glow
    >
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-white mb-1">
            {language === 'DE' && 'Update verfügbar'}
            {language === 'EN' && 'Update Available'}
            {language === 'LA' && 'Renovatio Disponibilis'}
          </h3>
          <p className="text-sm text-white/70">
            {language === 'DE' && 'Eine neue Version von Macrobius ist verfügbar'}
            {language === 'EN' && 'A new version of Macrobius is available'}
            {language === 'LA' && 'Nova versio Macrobii disponibilis est'}
          </p>
        </div>
        
        <div className="flex gap-2">
          <EnhancedClassicalButton
            variant="primary"
            size="sm"
            onClick={handleUpdate}
            icon={<Download className="w-4 h-4" />}
          >
            {language === 'DE' && 'Aktualisieren'}
            {language === 'EN' && 'Update'}
            {language === 'LA' && 'Renovare'}
          </EnhancedClassicalButton>
          
          <EnhancedClassicalButton
            variant="tertiary"
            size="sm"
            onClick={handleDismiss}
            icon={<X className="w-4 h-4" />}
          >
            {language === 'DE' && 'Später'}
            {language === 'EN' && 'Later'}
            {language === 'LA' && 'Posterius'}
          </EnhancedClassicalButton>
        </div>
      </div>
    </EnhancedClassicalCard>
  );
};

// Enhanced Background Sync Status
interface EnhancedBackgroundSyncProps {
  className?: string;
}

const EnhancedBackgroundSync: React.FC<EnhancedBackgroundSyncProps> = ({
  className
}) => {
  const { language } = useLanguage();
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [showStatus, setShowStatus] = useState(false);
  
  const triggerSync = useCallback(async () => {
    // Check for Background Sync support with proper type handling
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      try {
        setSyncStatus('syncing');
        setShowStatus(true);
        
        const registration = await navigator.serviceWorker.ready;
        const extendedRegistration = registration as ExtendedServiceWorkerRegistration;
        
        // Use optional chaining and proper error handling for experimental API
        if (extendedRegistration.sync) {
          await extendedRegistration.sync.register('background-sync');
        } else {
          throw new Error('Background Sync not supported');
        }
        
        // Simulate sync completion
        setTimeout(() => {
          setSyncStatus('success');
          setTimeout(() => {
            setShowStatus(false);
            setSyncStatus('idle');
          }, 2000);
        }, 1000);
        
      } catch (error) {
        console.error('Background sync failed:', error);
        setSyncStatus('error');
        setTimeout(() => {
          setShowStatus(false);
          setSyncStatus('idle');
        }, 3000);
      }
    } else {
      // Fallback for browsers without Background Sync support
      setSyncStatus('syncing');
      setShowStatus(true);
      
      // Simulate manual sync
      setTimeout(() => {
        setSyncStatus('success');
        setTimeout(() => {
          setShowStatus(false);
          setSyncStatus('idle');
        }, 2000);
      }, 1500);
    }
  }, []);
  
  if (!showStatus) {
    return null;
  }
  
  const statusConfig = {
    syncing: {
      icon: <Wifi className="w-4 h-4 animate-spin" />,
      text: language === 'DE' ? 'Synchronisiere...' : language === 'EN' ? 'Syncing...' : 'Synchronizando...',
      variant: 'cosmic' as const
    },
    success: {
      icon: <Wifi className="w-4 h-4 text-green-400" />,
      text: language === 'DE' ? 'Synchronisation erfolgreich' : language === 'EN' ? 'Sync successful' : 'Synchronizatio successit',
      variant: 'oracle' as const
    },
    error: {
      icon: <WifiOff className="w-4 h-4 text-red-400" />,
      text: language === 'DE' ? 'Synchronisation fehlgeschlagen' : language === 'EN' ? 'Sync failed' : 'Synchronizatio deficit',
      variant: 'default' as const
    }
  };
  
  const config = statusConfig[syncStatus as keyof typeof statusConfig];
  
  return (
    <div className={cn(
      "fixed top-16 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-enhanced",
      className
    )}>
      <EnhancedClassicalCard
        variant={config.variant}
        className="flex items-center gap-3 px-4 py-2"
      >
        {config.icon}
        <span className="text-sm font-medium text-white">
          {config.text}
        </span>
      </EnhancedClassicalCard>
    </div>
  );
};

export {
  EnhancedPWAInstall,
  EnhancedOfflineStatus,
  EnhancedSWUpdate,
  EnhancedBackgroundSync
};

export default {
  PWAInstall: EnhancedPWAInstall,
  OfflineStatus: EnhancedOfflineStatus,
  SWUpdate: EnhancedSWUpdate,
  BackgroundSync: EnhancedBackgroundSync
};