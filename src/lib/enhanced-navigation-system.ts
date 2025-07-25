// 🧭 ENHANCED NAVIGATION SYSTEM - Fixed Event Handling
// ✅ FIXED: Reliable cross-component navigation
// ✅ ENHANCED: Better event handling and error recovery
// 🚀 IMPROVED: Support for all navigation scenarios

export type NavigationSection = 
  | 'intro' 
  | 'banquet' 
  | 'cosmos' 
  | 'worldmap' 
  | 'textsearch' 
  | 'learning' 
  | 'quiz'
  | 'visualizations'
  | 'ai-cultural-analysis'
  | 'ai-tutoring'
  | 'personalized-learning'
  | 'ki-rag-assistant';

export interface NavigationEvent {
  section: NavigationSection;
  source?: string;
  data?: any;
}

class EnhancedNavigationSystem {
  private listeners: Map<string, (event: NavigationEvent) => void> = new Map();
  private currentSection: NavigationSection = 'intro';
  private navigationHistory: NavigationSection[] = ['intro'];
  
  constructor() {
    // Initialize event listeners
    this.initializeEventListeners();
  }
  
  /**
   * 🔧 ENHANCED: Initialize robust event listeners
   */
  private initializeEventListeners(): void {
    if (typeof window === 'undefined') return;
    
    // Listen for custom navigation events
    window.addEventListener('navigateToSection', this.handleNavigationEvent.bind(this));
    
    // Listen for browser navigation
    window.addEventListener('popstate', this.handleBrowserNavigation.bind(this));
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', this.cleanup.bind(this));
  }
  
  /**
   * 🎯 ENHANCED: Handle navigation events with better error handling
   */
  private handleNavigationEvent(event: Event): void {
    try {
      const customEvent = event as CustomEvent<NavigationEvent>;
      const { section, source, data } = customEvent.detail;
      
      console.log(`🧭 Navigation triggered: ${this.currentSection} → ${section} (source: ${source || 'unknown'})`);
      
      // Validate section
      if (!this.isValidSection(section)) {
        console.error(`❌ Invalid navigation section: ${section}`);
        return;
      }
      
      // Update navigation state
      this.currentSection = section;
      this.navigationHistory.push(section);
      
      // Limit history size
      if (this.navigationHistory.length > 20) {
        this.navigationHistory = this.navigationHistory.slice(-20);
      }
      
      // Notify all listeners
      this.notifyListeners({ section, source, data });
      
      // Update URL without page reload
      this.updateURL(section);
      
    } catch (error) {
      console.error('❌ Navigation event handling failed:', error);
    }
  }
  
  /**
   * 🌐 ENHANCED: Handle browser navigation (back/forward buttons)
   */
  private handleBrowserNavigation(event: PopStateEvent): void {
    try {
      const section = this.getSectionFromURL();
      if (section && section !== this.currentSection) {
        console.log(`🌐 Browser navigation: ${this.currentSection} → ${section}`);
        this.navigateToSection(section, 'browser');
      }
    } catch (error) {
      console.error('❌ Browser navigation handling failed:', error);
    }
  }
  
  /**
   * 🎯 MAIN NAVIGATION METHOD: Navigate to a specific section
   */
  navigateToSection(section: NavigationSection, source: string = 'api', data?: any): void {
    try {
      if (!this.isValidSection(section)) {
        console.error(`❌ Invalid section: ${section}`);
        return;
      }
      
      console.log(`🚀 Navigating to ${section} (source: ${source})`);
      
      if (typeof window !== 'undefined') {
        // Create enhanced navigation event
        const navigationEvent = new CustomEvent('navigateToSection', {
          detail: { section, source, data },
          bubbles: true,
          cancelable: true
        });
        
        // Dispatch the event
        window.dispatchEvent(navigationEvent);
      } else {
        // Fallback for server-side rendering
        console.warn('⚠️ Navigation attempted on server-side, using fallback');
        this.currentSection = section;
        this.notifyListeners({ section, source, data });
      }
    } catch (error) {
      console.error('❌ Navigation failed:', error);
    }
  }
  
  /**
   * 📝 Register a navigation listener
   */
  addListener(id: string, callback: (event: NavigationEvent) => void): void {
    this.listeners.set(id, callback);
    console.log(`🔗 Navigation listener registered: ${id}`);
  }
  
  /**
   * 🗑️ Remove a navigation listener
   */
  removeListener(id: string): void {
    this.listeners.delete(id);
    console.log(`🔗 Navigation listener removed: ${id}`);
  }
  
  /**
   * 📢 Notify all registered listeners
   */
  private notifyListeners(event: NavigationEvent): void {
    for (const [id, callback] of this.listeners) {
      try {
        callback(event);
      } catch (error) {
        console.error(`❌ Listener ${id} failed:`, error);
      }
    }
  }
  
  /**
   * ✅ Validate section name
   */
  private isValidSection(section: string): section is NavigationSection {
    const validSections: NavigationSection[] = [
      'intro', 'banquet', 'cosmos', 'worldmap', 'textsearch',
      'learning', 'quiz', 'visualizations', 'ai-cultural-analysis',
      'ai-tutoring', 'personalized-learning', 'ki-rag-assistant'
    ];
    return validSections.includes(section as NavigationSection);
  }
  
  /**
   * 🔗 Update URL without page reload
   */
  private updateURL(section: NavigationSection): void {
    if (typeof window === 'undefined') return;
    
    try {
      const url = section === 'intro' ? '/' : `/?section=${section}`;
      window.history.pushState({ section }, '', url);
    } catch (error) {
      console.warn('⚠️ URL update failed:', error);
    }
  }
  
  /**
   * 🔍 Get current section from URL
   */
  private getSectionFromURL(): NavigationSection | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const params = new URLSearchParams(window.location.search);
      const section = params.get('section');
      return section && this.isValidSection(section) ? section : 'intro';
    } catch (error) {
      console.warn('⚠️ URL parsing failed:', error);
      return null;
    }
  }
  
  /**
   * 📊 Get current navigation state
   */
  getCurrentState(): {
    currentSection: NavigationSection;
    history: NavigationSection[];
    canGoBack: boolean;
  } {
    return {
      currentSection: this.currentSection,
      history: [...this.navigationHistory],
      canGoBack: this.navigationHistory.length > 1
    };
  }
  
  /**
   * ⬅️ Go back in navigation history
   */
  goBack(): void {
    if (this.navigationHistory.length > 1) {
      this.navigationHistory.pop(); // Remove current
      const previousSection = this.navigationHistory[this.navigationHistory.length - 1];
      this.navigateToSection(previousSection, 'history-back');
    }
  }
  
  /**
   * 🧹 Cleanup event listeners
   */
  private cleanup(): void {
    if (typeof window === 'undefined') return;
    
    window.removeEventListener('navigateToSection', this.handleNavigationEvent.bind(this));
    window.removeEventListener('popstate', this.handleBrowserNavigation.bind(this));
    window.removeEventListener('beforeunload', this.cleanup.bind(this));
    
    this.listeners.clear();
  }
  
  /**
   * 🔄 Force refresh navigation system
   */
  refresh(): void {
    console.log('🔄 Refreshing navigation system...');
    this.cleanup();
    this.initializeEventListeners();
    
    // Detect current section from URL
    const urlSection = this.getSectionFromURL();
    if (urlSection && urlSection !== this.currentSection) {
      this.currentSection = urlSection;
    }
  }
}

// Export singleton instance
export const navigationSystem = new EnhancedNavigationSystem();

// Export convenience functions
export const navigateToSection = (section: NavigationSection, source?: string, data?: any) => {
  navigationSystem.navigateToSection(section, source, data);
};

export const addNavigationListener = (id: string, callback: (event: NavigationEvent) => void) => {
  navigationSystem.addListener(id, callback);
};

export const removeNavigationListener = (id: string) => {
  navigationSystem.removeListener(id);
};

export const getCurrentNavigationState = () => {
  return navigationSystem.getCurrentState();
};

export const goBackInNavigation = () => {
  navigationSystem.goBack();
};

export const refreshNavigation = () => {
  navigationSystem.refresh();
};

// Export default
export default navigationSystem;