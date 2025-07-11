export interface ImageInfo {
  id: string;
  src: string;
  title: string;
  subtitle?: string;
  description: string;
  category: 'historical' | 'cultural' | 'astronomical' | 'literary';
  period?: string;
  source?: string;
  culturalContext?: string;
}

export const imageDatabase: ImageInfo[] = [
  {
    id: 'macrobius-bottle',
    src: '/MacrobiusBottle.jpg',
    title: 'Macrobius Ambrosius Theodosius',
    subtitle: 'Kultureller Bewahrer der spätantiken Welt',
    description: 'Macrobius (ca. 385-430 n. Chr.) war ein römischer Gelehrter und Staatsmann, der durch seine Werke "Saturnalia" und "Commentarii in Somnium Scipionis" das kulturelle Erbe der Antike für die Nachwelt bewahrte.',
    category: 'historical',
    period: 'Spätantike (4.-5. Jahrhundert n. Chr.)',
    source: 'Mittelalterliche Handschrift',
    culturalContext: 'Bewahrung klassischer Bildung in der Zeit des Untergangs des Weströmischen Reiches'
  },
  {
    id: 'rome-under',
    src: '/Rome-under.jpg',
    title: 'Das untergehende Römische Reich',
    subtitle: 'Kultureller Niedergang und die Mission der Gelehrten',
    description: 'Das 5. Jahrhundert markierte das Ende des Weströmischen Reiches. In dieser Zeit der Ungewissheit arbeiteten Gelehrte wie Macrobius daran, das kulturelle Erbe zu bewahren.',
    category: 'historical',
    period: '5. Jahrhundert n. Chr.',
    source: 'Historische Darstellung',
    culturalContext: 'Transformation der antiken Welt und Übergang zum Mittelalter'
  },
  {
    id: 'tycho-assistant',
    src: '/TychoAssistent.jpg',
    title: 'Johannes Isaac Pontanus & Tycho Brahe',
    subtitle: 'Astronomische Renaissance und die Wiederentdeckung',
    description: 'Die Renaissance brachte eine Wiederentdeckung antiker Texte. Astronomen wie Tycho Brahe studierten Macrobius\' astronomische Kommentare und erkannten deren wissenschaftlichen Wert.',
    category: 'astronomical',
    period: 'Renaissance (16.-17. Jahrhundert)',
    source: 'Historisches Porträt',
    culturalContext: 'Wissenschaftliche Revolution und Wiederentdeckung antiker Wissenschaft'
  },
  {
    id: 'astrolabe',
    src: '/Astrolab.jpg',
    title: 'Historisches Astrolabium',
    subtitle: 'Instrument antiker Astronomie',
    description: 'Das Astrolabium war ein zentrales Instrument der antiken und mittelalterlichen Astronomie. Macrobius beschrieb in seinen Werken die Verwendung solcher Instrumente zur Himmelsbeobachtung.',
    category: 'astronomical',
    period: 'Antike bis Mittelalter',
    source: 'Historisches Instrument',
    culturalContext: 'Astronomische Praxis und Himmelsbeobachtung in der Antike'
  }
];

export function getImagesBySection(section: string): ImageInfo[] {
  switch (section) {
    case 'historical':
      return imageDatabase.filter(img => img.category === 'historical');
    case 'cultural':
      return imageDatabase.filter(img => img.category === 'cultural');
    case 'astronomical':
      return imageDatabase.filter(img => img.category === 'astronomical');
    case 'literary':
      return imageDatabase.filter(img => img.category === 'literary');
    default:
      return imageDatabase;
  }
}

export function getImageById(id: string): ImageInfo | undefined {
  return imageDatabase.find(img => img.id === id);
}