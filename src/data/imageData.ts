/**
 * Comprehensive Image Database
 * Contains all clickable images with rich cultural background information
 */

export interface ImageInfo {
  id: string;
  src: string;
  title: string;
  subtitle?: string;
  description: string;
  culturalContext: string;
  historicalPeriod: string;
  macrobiusConnection?: string;
  tychoConnection?: string;
  modernRelevance?: string;
  latinQuote?: string;
  translation?: string;
  tags?: string[];
  relatedImages?: string[];
  section: string;
}

export const imageDatabase: Record<string, ImageInfo> = {
  // INTRO SECTION IMAGES
  'macrobius-bottle': {
    id: 'macrobius-bottle',
    src: '/MacrobiusBottle.jpg',
    title: 'Macrobius\' Flaschenpost',
    subtitle: 'Eine Botschaft durch die Jahrhunderte',
    description: 'Diese symbolische Darstellung zeigt Macrobius\' Werke als "Flaschenpost" an die Zukunft - eine Metapher für die Übertragung antiker Weisheit durch die dunklen Jahrhunderte des Mittelalters bis zur Renaissance.',
    culturalContext: 'Die Flaschenpost symbolisiert Macrobius\' bewusste Anstrengung, das kulturelle Erbe der spätantiken Welt für zukünftige Generationen zu bewahren. Seine Werke dienten als Brücke zwischen der klassischen Antike und der mittelalterlichen Gelehrsamkeit.',
    historicalPeriod: '5. Jahrhundert n. Chr. (Symbolische Darstellung)',
    macrobiusConnection: 'Macrobius verstand seine Rolle als Kulturbewahrer in einer Zeit des Umbruchs. Er sammelte und kommentierte antikes Wissen mit dem ausdrücklichen Ziel, es für die Nachwelt zu erhalten.',
    tychoConnection: 'Tycho Brahe erkannte in Macrobius\' Werken die Brücke zwischen antiker astronomischer Weisheit und moderner Beobachtung. Pontanus\' Edition von 1597 machte diese "Flaschenpost" für die Renaissance-Wissenschaft zugänglich.',
    modernRelevance: 'Heute verstehen wir Macrobius als frühen "Wissensmanger", der systematisch kulturelles Erbe digitalisierte und übertrug - ein Vordenker moderner Kulturerhaltung.',
    latinQuote: 'Tradenda posteris antiquorum sapientia',
    translation: 'Die Weisheit der Alten muss an die Nachwelt übertragen werden',
    tags: ['Kulturerhaltung', 'Wissensvermittlung', 'Spätantike', 'Renaissance'],
    relatedImages: ['tycho-assistant', 'macrobius-portrait'],
    section: 'intro'
  }
};

// Helper functions for image integration
export const getImagesBySection = (section: string): ImageInfo[] => {
  return Object.values(imageDatabase).filter(image => image.section === section);
};

export const getImageById = (id: string): ImageInfo | undefined => {
  return imageDatabase[id];
};

export const getRelatedImages = (imageId: string): ImageInfo[] => {
  const image = imageDatabase[imageId];
  if (!image || !image.relatedImages) return [];
  
  return image.relatedImages
    .map(id => imageDatabase[id])
    .filter(img => img !== undefined);
};

export const searchImages = (query: string): ImageInfo[] => {
  const lowerQuery = query.toLowerCase();
  return Object.values(imageDatabase).filter(image => 
    image.title.toLowerCase().includes(lowerQuery) ||
    image.description.toLowerCase().includes(lowerQuery) ||
    image.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};