// Type declarations for lite-youtube-embed
declare namespace JSX {
  interface IntrinsicElements {
    'lite-youtube': {
      videoid: string;
      style?: React.CSSProperties;
      playlabel?: string;
      params?: string;
      nocookie?: boolean;
      children?: React.ReactNode;
    };
  }
}

// Global type for the lite-youtube element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lite-youtube': {
        videoid: string;
        style?: React.CSSProperties;
        playlabel?: string;
        params?: string;
        nocookie?: boolean;
        children?: React.ReactNode;
      };
    }
  }
}