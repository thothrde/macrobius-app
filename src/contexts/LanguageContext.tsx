import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'DE' | 'EN' | 'LA';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 🔧 COMPLETE TRANSLATION OBJECT - SSG COMPATIBLE WITH 320+ KEYS
const translations = {
  DE: {
    // Navigation translations
    'nav.home': 'Home',
    'nav.intro': 'Einführung',
    'nav.quiz': 'Quiz',
    'nav.worldmap': 'Weltkarte',
    'nav.cosmos': 'Kosmos',
    'nav.banquet': 'Gastmahl',
    'nav.textsearch': 'Textsuche',
    'nav.learning': 'Lernen',
    'nav.visualizations': 'Visualisierungen',
    'nav.ai_systems': 'KI-SYSTEME',
    'nav.ai_cultural': 'KI-Kulturanalyse',
    'nav.ai_learning': 'Lernpfade',
    'nav.ai_tutoring': 'KI-Tutor',
    'nav.ai_modules': 'Kulturmodule',
    'nav.oracle_status': '1.401 Kulturelle Texte',
    
    // Hero section translations
    'hero.badge': 'Kulturschätze der Antike',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digital',
    'hero.description': 'Entdecken Sie die Kulturschätze der Antike',
    
    // 🔍 SEARCH SECTION TRANSLATIONS (15+ keys)
    'search.title': 'Textsuche',
    'search.description': 'Durchsuche 1.401 authentische Macrobius-Passagen mit Oracle Cloud',
    'search.placeholder': 'Suche in authentischen Macrobius-Passagen... (z.B. "convivium", "stella", "virtus")',
    'search.button': 'Suchen',
    'search.searching': 'Suche...',
    'search.results_title': 'Ergebnisse aus Oracle Cloud',
    'search.latin_text': 'Lateinischer Text',
    'search.error': 'Suche fehlgeschlagen. Oracle Cloud Backend nicht verfügbar.',
    'search.no_results': 'Keine Ergebnisse gefunden',
    'search.example_queries': 'Beispielsuchen',
    'search.filters': 'Filter',
    'search.sort_by': 'Sortieren nach',
    'search.relevance': 'Relevanz',
    'search.chronological': 'Chronologisch',
    'search.clear_results': 'Ergebnisse löschen',
    
    // 🗺️ WORLDMAP SECTION TRANSLATIONS (New - 40+ keys)
    'worldmap.title': 'Macrobius\' Weltkarte',
    'worldmap.subtitle': 'Die Fünf Klimazonen der Erde',
    'worldmap.description': 'Macrobius\' geographische Weltanschauung teilte die Erde in fünf konzentrische Klimazonen - eine bemerkenswert genaue wissenschaftliche Beschreibung für das 5. Jahrhundert. Diese Theorie beeinflusste die mittelalterliche Geographie über 1000 Jahre lang.',
    'worldmap.earth_title': 'Die Erdkugel nach Macrobius',
    'worldmap.click_zones': 'Klicken Sie auf die Zonen für Details',
    'worldmap.zones_details_title': 'Klimazonen-Details',
    'worldmap.description_label': 'Beschreibung',
    'worldmap.characteristics_label': 'Eigenschaften',
    'worldmap.macrobius_quote_label': 'Macrobius\' Originaltext',
    
    // Climate Zones (5 zones x 5 properties = 25 keys)
    'worldmap.zone1_name': 'Arktische Zone',
    'worldmap.zone1_latin': 'Zona Frigida Septentrionalis',
    'worldmap.zone1_description': 'Die nördliche Eiszone - unbewohnbar aufgrund extremer Kälte',
    'worldmap.zone1_characteristics': 'Ewiges Eis, keine Vegetation, unbewohnbar',
    'worldmap.zone1_quote': 'Zona frigida et inhabitabilis propter nimium frigus',
    
    'worldmap.zone2_name': 'Nördliche gemäßigte Zone',
    'worldmap.zone2_latin': 'Zona Temperata Septentrionalis',
    'worldmap.zone2_description': 'Die bewohnbare Zone der nördlichen Hemisphäre',
    'worldmap.zone2_characteristics': 'Vier Jahreszeiten, fruchtbare Länder, dichte Besiedlung',
    'worldmap.zone2_quote': 'Zona temperata et habitabilis, ubi nos vivimus',
    
    'worldmap.zone3_name': 'Heiße Äquatorzone',
    'worldmap.zone3_latin': 'Zona Torrida',
    'worldmap.zone3_description': 'Die brennende Zone am Äquator - zu heiß für menschliches Leben',
    'worldmap.zone3_characteristics': 'Extreme Hitze, Wüsten, schwer überwindbar',
    'worldmap.zone3_quote': 'Zona torrida et inhabitabilis propter nimium calorem',
    
    'worldmap.zone4_name': 'Südliche gemäßigte Zone',
    'worldmap.zone4_latin': 'Zona Temperata Australis',
    'worldmap.zone4_description': 'Die hypothetische Antipoden-Zone der südlichen Hemisphäre',
    'worldmap.zone4_characteristics': 'Spiegel unserer Welt, aber unzugänglich',
    'worldmap.zone4_quote': 'Zona temperata sed nobis incognita',
    
    'worldmap.zone5_name': 'Südliche Eiszone',
    'worldmap.zone5_latin': 'Zona Frigida Australis',
    'worldmap.zone5_description': 'Die südliche Eiszone - Spiegelbild der nördlichen Kälte',
    'worldmap.zone5_characteristics': 'Ewiges Eis, symmetrisch zur nördlichen Zone',
    'worldmap.zone5_quote': 'Zona frigida australis, similis septentrionali',
    
    // Scientific Legacy (6 keys)
    'worldmap.scientific_legacy_title': 'Wissenschaftliches Erbe',
    'worldmap.climate_science_title': 'Klimawissenschaft',
    'worldmap.climate_science_description': 'Macrobius\' Klimazonen-Theorie war wissenschaftlich bemerkenswert genau und beeinflusste die Geographie bis zur Renaissance',
    'worldmap.cartography_title': 'Kartographie',
    'worldmap.cartography_description': 'Seine Beschreibungen prägten mittelalterliche Weltkarten und förderten das Verständnis der Erdkugel',
    'worldmap.modern_confirmation_title': 'Moderne Bestätigung',
    'worldmap.modern_confirmation_description': 'Die Köppen-Klimaklassifikation bestätigt heute Macrobius\' grundlegende Einteilung der Klimazonen',
    
    // 🏛️ THEMES TRANSLATIONS (10+ keys)
    'themes.philosophy': 'Philosophie',
    'themes.religion': 'Religion',
    'themes.astronomy': 'Astronomie',
    'themes.literature': 'Literatur',
    'themes.history': 'Geschichte',
    'themes.law': 'Recht',
    'themes.education': 'Bildung',
    'themes.social_customs': 'Gesellschaftsbräuche',
    'themes.general': 'Allgemein',
    'themes.all': 'Alle Themen',
    
    // ☁️ ORACLE CLOUD INTEGRATION (Extended - 25+ keys)
    'oracle.connecting': 'Verbinde zu Oracle Cloud...',
    'oracle.connected': '✅ Verbunden mit Oracle Cloud (1.401 Texte)',
    'oracle.disconnected': '❌ Oracle Cloud Verbindung fehlgeschlagen - Port 8080 prüfen',
    'oracle.error': 'Verbindung zu Oracle Cloud fehlgeschlagen',
    'oracle.connection_failed': 'Oracle Cloud Backend ist nicht erreichbar. Bitte überprüfen Sie Firewall-Einstellungen für Port 8080.',
    'oracle.connection_error': 'Verbindungsfehler',
    'oracle.unavailable_title': 'Oracle Cloud Backend nicht verfügbar',
    'oracle.unavailable_message': 'Die Verbindung zu Oracle Cloud (152.70.184.232:8080) konnte nicht hergestellt werden.',
    'oracle.troubleshooting_title': 'Lösungsschritte',
    'oracle.troubleshoot_firewall': 'Firewall-Port 8080 für externe Verbindungen öffnen',
    'oracle.troubleshoot_security': 'Oracle Cloud Security Rules prüfen',
    'oracle.troubleshoot_service': 'Backend-Service-Status überprüfen',
    'oracle.troubleshoot_network': 'Netzwerkverbindung testen',
    'oracle.integration_title': 'Oracle Cloud Integration',
    'oracle.backend': 'Backend',
    'oracle.backend_value': 'Oracle Cloud Free Tier',
    'oracle.endpoint': 'Endpunkt',
    'oracle.status': 'Status',
    'oracle.status_operational': '✅ Operational',
    'oracle.status_connection_required': '❌ Verbindung erforderlich',
    'oracle.corpus': 'Korpus',
    'oracle.corpus_value': '1.401 authentische Passagen',
    'oracle.themes': 'Themen',
    'oracle.themes_value': '9 kulturelle Kategorien',
    'oracle.features': 'Features',
    'oracle.features_value': 'Volltext-Suche, Filter, Kontext',
    'oracle.fallback': 'Verwende lokale Inhalte als Fallback',
    'oracle.retry': 'Verbindung wiederholen',
    'oracle.timeout': 'Verbindungszeitüberschreitung',
    'oracle.server_error': 'Serverfehler',
    'oracle.network_error': 'Netzwerkfehler',
    'oracle.authentication_error': 'Authentifizierungsfehler',
    'oracle.loading': 'Lade Daten...',
    'oracle.success': 'Erfolgreich verbunden',
    'oracle.status_checking': 'Überprüfe Verbindungsstatus...',
    'oracle.offline_mode': 'Offline-Modus aktiv',
    'oracle.reconnecting': 'Versuche erneut zu verbinden...',
    'oracle.data_loaded': 'Daten erfolgreich geladen',
    
    // Modal content translations
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Kultureller Bewahrer der spätantiken Welt (ca. 385-430 n. Chr.)',
    'about_biography': 'Macrobius Ambrosius Theodosius war eine der faszinierendsten Gestalten der späten Antike - ein Mann, der an der Schwelle zwischen zwei Welten stand. Als hoher Verwaltungsbeamter des untergehenden Weströmischen Reiches und gleichzeitig als leidenschaftlicher Gelehrter verkörperte er die dramatische Spannung seiner Zeit: den Versuch, die klassische Kultur vor dem Untergang zu bewahren.',
    'about_works': 'Macrobius\' zwei Hauptwerke "Saturnalia" und "Commentarii in Somnium Scipionis" sind Meisterwerke spätantiker Gelehrsamkeit. Die "Saturnalia" präsentieren sich als lebendige Tischgespräche während der römischen Winterfeste, in denen die gebildete Elite Roms über Literatur, Philosophie, Religion und Naturwissenschaften diskutiert. Die "Commentarii" bieten eine systematische Einführung in die antike Kosmologie und Traumdeutung.',
    'about_legacy': 'Macrobius\' kulturelle "Flaschenpost" erwies sich als eines der erfolgreichsten Projekte der Weltgeschichte. Seine Werke überdauerten den Untergang Roms, wurden von mittelalterlichen Klöstern bewahrt und prägten das geistige Leben des Mittelalters und der Renaissance nachhaltig. Durch ihn blieben zentrale Texte Ciceros, Vergils und der antiken Philosophie für die Nachwelt erhalten.',
    'about_pontanus_title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'about_pontanus_subtitle': 'Astronomische Renaissance und die Wiederentdeckung des Macrobius (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus war mehr als nur ein Assistent des großen Tycho Brahe - er war ein Brückenbauer zwischen den Welten der antiken Weisheit und moderner Wissenschaft. Geboren 1571 in Dänemark, wurde er zum Zeitzeugen einer der dramatischsten Epochen der Wissenschaftsgeschichte: der astronomischen Revolution.',
    'about_pontanus_work': 'Die editorische Leistung des Pontanus war bahnbrechend. Seine kommentierten Ausgaben der Macrobius-Werke vereinten philologische Präzision mit astronomischem Fachwissen. Er erkannte als einer der ersten, dass Macrobius\' kosmologische Texte nicht nur literarische Curiosa waren, sondern wertvolle Zeugnisse antiker Wissenschaft.',
    'about_pontanus_legacy': 'Durch Pontanus\' Arbeit wurde die entscheidende Brücke zwischen antiker Kultur und Renaissance-Gelehrsamkeit geschlagen. Seine Editionen machten Macrobius\' Werke für die Gelehrtenwelt der frühen Neuzeit zugänglich und trugen zur "Wiedergeburt" der antiken Wissenschaften bei.',
    'pontanus_historical_details': 'Die Edition des Pontanus folgt dem gedruckten Text mit 117 Seiten voller eigener gelehrter Notizen, die das astronomische Wissen seiner Zeit mit den antiken Texten verknüpfen.',
    'declining_rome_title': 'Das untergehende Römische Reich',
    'declining_rome_subtitle': 'Kultureller Niedergang und die Mission der Gelehrten (4.-5. Jahrhundert n. Chr.)',
    'declining_rome_content': 'Die Zeit des Macrobius war geprägt vom dramatischen Niedergang des Weströmischen Reiches. Barbareneinfälle, politische Instabilität und wirtschaftlicher Kollaps bedrohten nicht nur die politische Ordnung, sondern auch das gesamte kulturelle Erbe der Antike. Bibliotheken wurden zerstört, Schulen geschlossen, und jahrhundertealtes Wissen drohte für immer verloren zu gehen.\\n\\n**Die Mission der Kulturbewahrer**\\n\\nIn dieser Krisenzeit erkannten Gelehrte wie Macrobius ihre historische Verantwortung: Sie mussten das kulturelle Erbe für kommende Generationen retten. Durch systematische Sammlung, Kommentierung und Übertragung der klassischen Texte schufen sie eine Art "kulturelle Arche", die das Wissen der Antike über die dunklen Jahrhunderte hinweg bewahren sollte.',
    'cultural_story': 'Vor 1500 Jahren, als das römische Reich dem Untergang entgegensah, fertigte Macrobius eine Flaschenpost an die Zukunft an. Diese "Flaschenpost" waren seine beiden großen Werke: die "Saturnalia" und der "Kommentar zu Scipios Traum". In ihnen bewahrte er das Beste der antiken Kultur - von Ciceros Rhetorik bis zu den Geheimnissen der Astronomie. Seine Mission: das kulturelle Erbe für kommende Generationen zu retten.',
    'explore_texts': 'ERKUNDEN SIE DIE ZWEI WERKE DES MACROBIUS',
    'more_about_macrobius': 'Mehr über Macrobius',
    'more_about_pontanus': 'Mehr über Pontanus',
    'close_modal': 'Schließen',

    // 🍽️ BANQUET SECTION TRANSLATIONS (35+ keys)
    'banquet.title': 'Saturnalia',
    'banquet.subtitle': 'Das Gelehrte Gastmahl',
    'banquet.description': 'In Macrobius\' Saturnalia treffen sich die gebildetsten Männer Roms zu einem mehrtägigen Gastmahl während der Winterfeste. Diese literarische Darstellung eines intellektuellen Symposiums bewahrt die Tradition des gelehrten Gesprächs und vermittelt uns ein einzigartiges Bild der spätantiken Bildungskultur.',
    'banquet.scene_title': 'Das Gastmahl',
    'banquet.participants_title': 'Die Teilnehmer',
    'banquet.participant1_name': 'Vettius Agorius Praetextatus',
    'banquet.participant1_role': 'Stadtpräfekt und Philosoph',
    'banquet.participant1_description': 'Praetextatus war eine der bedeutendsten Gestalten der spätrömischen Elite. Als Stadtpräfekt von Rom und eingeweihter Anhänger verschiedener Mysterienkulte verkörperte er die letzte Blüte des traditionellen römischen Heidentums. Seine philosophische Bildung und religiöse Toleranz machten ihn zum idealen Gastgeber gelehrter Diskussionen.',
    'banquet.participant2_name': 'Virius Nicomachus Flavianus',
    'banquet.participant2_role': 'Historiker und Staatsmann',
    'banquet.participant2_description': 'Flavianus entstammte einer der vornehmsten Familien Roms und bekleidete höchste Staatsämter. Als Historiker und Verteidiger der traditionellen Religion führte er die intellektuelle Opposition gegen das aufstrebende Christentum an. Seine historischen Werke und kulturelle Patronage prägten das geistige Leben seiner Zeit.',
    'banquet.participant3_name': 'Quintus Aurelius Symmachus',
    'banquet.participant3_role': 'Redner und Senator',
    'banquet.participant3_description': 'Symmachus war der größte Redner seiner Generation und ein leidenschaftlicher Verteidiger der römischen Tradition. Seine Briefe und Reden geben uns heute das lebendigste Bild des aristokratischen Lebens im späten 4. Jahrhundert. Er kämpfte erfolglos für die Erhaltung des Altars der Victoria im Senat.',
    'banquet.participant4_name': 'Servius',
    'banquet.participant4_role': 'Grammatiker und Vergil-Kommentator',
    'banquet.participant4_description': 'Servius war der bedeutendste Vergil-Kommentator der Antike. Seine detaillierten Erklärungen zu Vergils Werken wurden zum Standardwerk für alle folgenden Jahrhunderte. Durch ihn blieb nicht nur das Verständnis Vergils erhalten, sondern auch unzählige Details über antike Kultur, Religion und Geschichte.',
    'banquet.participant5_name': 'Caecina Albinus',
    'banquet.participant5_role': 'Gelehrter und Politiker',
    'banquet.participant5_description': 'Albinus vereinte wie viele seiner Zeitgenossen politische Macht mit gelehrter Bildung. Als Mitglied der senatorischen Elite und gleichzeitig als Philosoph und Literat repräsentierte er das Ideal des gebildeten römischen Aristokraten, der öffentliche Verantwortung mit intellektueller Neugier verband.',
    'banquet.context_title': 'Kultureller Kontext',
    'banquet.context_description': 'Diese Männer repräsentierten die letzte Generation der klassisch gebildeten römischen Elite. In einer Zeit des Umbruchs, als das Christentum zur Staatsreligion wurde und germanische Völker das Reich bedrängten, versuchten sie, die Traditionen und das Wissen von tausend Jahren römischer Kultur zu bewahren.',
    'banquet.topics_title': 'Gesprächsthemen',
    'banquet.day1': 'Tag 1',
    'banquet.day1_topic1': 'Vergils Dichtkunst',
    'banquet.day1_topic2': 'Antike Grammatik',
    'banquet.day1_topic3': 'Sprachgeschichte',
    'banquet.day2': 'Tag 2',
    'banquet.day2_topic1': 'Philosophie und Religion',
    'banquet.day2_topic2': 'Astronomie',
    'banquet.day2_topic3': 'Naturwissenschaften',
    'banquet.day3': 'Tag 3',
    'banquet.day3_topic1': 'Recht und Gesellschaft',
    'banquet.day3_topic2': 'Geschichte Roms',
    'banquet.day3_topic3': 'Kulturelle Traditionen',
    'banquet.quote': '"In solchen Gesprächen zeigt sich die wahre Bildung: nicht das Anhäufen von Wissen, sondern die Kunst, es in lebendiger Diskussion zu teilen und zu vertiefen."',
    'banquet.quote_attribution': 'Macrobius über die Saturnalien',
    'banquet.legacy_title': 'Kulturelles Erbe',
    'banquet.legacy1_title': 'Textbewahrung',
    'banquet.legacy1_description': 'Die Saturnalien konservierten hunderte von Zitaten und Anekdoten aus verlorenen antiken Werken und wurden so zu einer unerschöpflichen Quelle für das Verständnis der römischen Literatur.',
    'banquet.legacy2_title': 'Bildungsideal',
    'banquet.legacy2_description': 'Das Modell des gelehrten Gesprächs prägte die Bildungskultur des Mittelalters und der Renaissance. Von den Klosterschulen bis zu den humanistischen Akademien orientierte man sich am Vorbild der Saturnalien.',
    'banquet.legacy3_title': 'Kulturvermittlung',
    'banquet.legacy3_description': 'Die Verbindung von Unterhaltung und Belehrung, wie sie in den Saturnalien verwirklicht ist, wurde zum Modell für unzählige spätere Werke der Bildungsliteratur.',

    // 🌌 COSMOS SECTION TRANSLATIONS (60+ keys)
    'cosmos.title': 'Macrobius\' Kosmos',
    'cosmos.subtitle': 'Die Neun Himmlischen Sphären',
    'cosmos.description': 'Im 5. Jahrhundert nach Christus dokumentierte Macrobius in seinem "Kommentar zu Scipios Traum" ein faszinierendes kosmologisches System. Seine Beschreibung der neun himmlischen Sphären vereint platonische Philosophie, pythagoräische Zahlenmystik und astronomische Beobachtung zu einem einheitlichen Weltbild, das das mittelalterliche und renaissance Denken über Jahrhunderte prägen sollte.',
    'cosmos.sphere1_name': 'Sphäre des Mondes',
    'cosmos.sphere1_description': 'Die unterste Sphäre, dem irdischen Bereich am nächsten',
    'cosmos.sphere1_properties': 'Wandelbar, vergänglich, Einfluss auf das Unterbewusstsein',
    'cosmos.sphere1_influence': 'Träume, Instinkte, natürliche Zyklen',
    'cosmos.sphere2_name': 'Sphäre des Merkur',
    'cosmos.sphere2_description': 'Sphäre der Kommunikation und des Handels',
    'cosmos.sphere2_properties': 'Schnelle Bewegung, Vermittlung, Intelligenz',
    'cosmos.sphere2_influence': 'Sprache, Handel, Wissenschaft',
    'cosmos.sphere3_name': 'Sphäre der Venus',
    'cosmos.sphere3_description': 'Sphäre der Schönheit und Harmonie',
    'cosmos.sphere3_properties': 'Anziehung, Ästhetik, Liebe',
    'cosmos.sphere3_influence': 'Kunst, Musik, menschliche Beziehungen',
    'cosmos.sphere4_name': 'Sphäre der Sonne',
    'cosmos.sphere4_description': 'Zentrale Sphäre, Quelle des Lichts und Lebens',
    'cosmos.sphere4_properties': 'Vitalität, Führung, Erleuchtung',
    'cosmos.sphere4_influence': 'Leben, Weisheit, göttliche Erkenntnis',
    'cosmos.sphere5_name': 'Sphäre des Mars',
    'cosmos.sphere5_description': 'Sphäre der Energie und des Willens',
    'cosmos.sphere5_properties': 'Kraft, Mut, Durchsetzungsvermögen',
    'cosmos.sphere5_influence': 'Krieg, Mut, aktive Energie',
    'cosmos.sphere6_name': 'Sphäre des Jupiter',
    'cosmos.sphere6_description': 'Sphäre der Weisheit und Gerechtigkeit',
    'cosmos.sphere6_properties': 'Gerechtigkeit, Weisheit, Expansion',
    'cosmos.sphere6_influence': 'Recht, Philosophie, geistige Führung',
    'cosmos.sphere7_name': 'Sphäre des Saturn',
    'cosmos.sphere7_description': 'Sphäre der Zeit und Struktur',
    'cosmos.sphere7_properties': 'Zeit, Begrenzung, Disziplin',
    'cosmos.sphere7_influence': 'Chronos, Struktur, geistige Disziplin',
    'cosmos.sphere8_name': 'Sphäre der Fixsterne',
    'cosmos.sphere8_description': 'Sphäre der ewigen Ordnung',
    'cosmos.sphere8_properties': 'Unveränderlichkeit, ewige Muster',
    'cosmos.sphere8_influence': 'Schicksal, kosmische Ordnung',
    'cosmos.sphere9_name': 'Das Primum Mobile',
    'cosmos.sphere9_description': 'Erste Bewegung, Quelle aller Bewegung',
    'cosmos.sphere9_properties': 'Reine Bewegung, göttlicher Impuls',
    'cosmos.sphere9_influence': 'Göttlicher Wille, erste Ursache',
    'cosmos.properties_label': 'Eigenschaften',
    'cosmos.influence_label': 'Einfluss',
    'cosmos.insights_title': 'Kosmologische Erkenntnisse',
    'cosmos.insight1_title': 'Harmonie der Sphären',
    'cosmos.insight1_description': 'Jede Sphäre erzeugt einen Ton in perfekter harmonischer Proportion. Diese Sphärenmusik, unhörbar für sterbliche Ohren, bildet die Grundlage aller irdischen Musik und Harmonie.',
    'cosmos.insight2_title': 'Numerische Ordnung',
    'cosmos.insight2_description': 'Pythagoräische Zahlenverhältnisse bestimmen die Abstände und Bewegungen der Sphären. Diese mathematische Ordnung spiegelt die rationale Struktur des gesamten Kosmos wider.',
    'cosmos.insight3_title': 'Seelenwanderung',
    'cosmos.insight3_description': 'Die Seele durchläuft die Sphären auf ihrem Weg zwischen Himmel und Erde. Jede Sphäre prägt sie mit besonderen Eigenschaften und Erkenntnissen.',
    'cosmos.tycho_title': 'Tychos Erbe',
    'cosmos.tycho_description': 'Tycho Brahe studierte Macrobius\' Kosmologie intensiv. Seine Synthese aus antiker Weisheit und moderner Beobachtung revolutionierte das astronomische Denken und bereitete den Weg für Kepler und Newton.',
    'cosmos.start_rotation': 'Rotation starten',
    'cosmos.stop_rotation': 'Rotation stoppen',
    'cosmos.reset_view': 'Ansicht zurücksetzen',
    'cosmos.click_sphere': 'Klicken Sie auf eine Sphäre für Details',
    'cosmos.rotating': 'Rotiert',
    'cosmos.stationary': 'Stillstehend',
    
    // UI elements
    'loading': 'Wird geladen...',
    'error': 'Ein Fehler ist aufgetreten',
    'back': 'Zurück',
    'next': 'Weiter',
    'submit': 'Senden',
    'close': 'Schließen',
  },
  EN: {
    // Navigation translations
    'nav.home': 'Home',
    'nav.intro': 'Introduction',
    'nav.quiz': 'Quiz',
    'nav.worldmap': 'World Map',
    'nav.cosmos': 'Cosmos',
    'nav.banquet': 'Banquet',
    'nav.textsearch': 'Text Search',
    'nav.learning': 'Learning',
    'nav.visualizations': 'Visualizations',
    'nav.ai_systems': 'AI SYSTEMS',
    'nav.ai_cultural': 'AI Cultural Analysis',
    'nav.ai_learning': 'Learning Paths',
    'nav.ai_tutoring': 'AI Tutor',
    'nav.ai_modules': 'Cultural Modules',
    'nav.oracle_status': '1,401 Cultural Texts',
    
    // Hero section translations
    'hero.badge': 'Cultural Treasures of Antiquity',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digital',
    'hero.description': 'Discover the Cultural Treasures of Antiquity',
    
    // 🔍 SEARCH SECTION TRANSLATIONS
    'search.title': 'Text Search',
    'search.description': 'Search through 1,401 authentic Macrobius passages with Oracle Cloud',
    'search.placeholder': 'Search authentic Macrobius passages... (e.g. "convivium", "stella", "virtus")',
    'search.button': 'Search',
    'search.searching': 'Searching...',
    'search.results_title': 'Results from Oracle Cloud',
    'search.latin_text': 'Latin Text',
    'search.error': 'Search failed. Oracle Cloud backend unavailable.',
    'search.no_results': 'No results found',
    'search.example_queries': 'Example searches',
    'search.filters': 'Filters',
    'search.sort_by': 'Sort by',
    'search.relevance': 'Relevance',
    'search.chronological': 'Chronological',
    'search.clear_results': 'Clear results',
    
    // 🗺️ WORLDMAP SECTION TRANSLATIONS
    'worldmap.title': 'Macrobius\' World Map',
    'worldmap.subtitle': 'The Five Climate Zones of Earth',
    'worldmap.description': 'Macrobius\' geographical worldview divided the Earth into five concentric climate zones - a remarkably accurate scientific description for the 5th century. This theory influenced medieval geography for over 1000 years.',
    'worldmap.earth_title': 'The Earth Globe according to Macrobius',
    'worldmap.click_zones': 'Click on zones for details',
    'worldmap.zones_details_title': 'Climate Zone Details',
    'worldmap.description_label': 'Description',
    'worldmap.characteristics_label': 'Characteristics',
    'worldmap.macrobius_quote_label': 'Macrobius\' Original Text',
    
    // Climate Zones
    'worldmap.zone1_name': 'Arctic Zone',
    'worldmap.zone1_latin': 'Zona Frigida Septentrionalis',
    'worldmap.zone1_description': 'The northern ice zone - uninhabitable due to extreme cold',
    'worldmap.zone1_characteristics': 'Eternal ice, no vegetation, uninhabitable',
    'worldmap.zone1_quote': 'Zona frigida et inhabitabilis propter nimium frigus',
    
    'worldmap.zone2_name': 'Northern Temperate Zone',
    'worldmap.zone2_latin': 'Zona Temperata Septentrionalis',
    'worldmap.zone2_description': 'The habitable zone of the northern hemisphere',
    'worldmap.zone2_characteristics': 'Four seasons, fertile lands, dense settlement',
    'worldmap.zone2_quote': 'Zona temperata et habitabilis, ubi nos vivimus',
    
    'worldmap.zone3_name': 'Hot Equatorial Zone',
    'worldmap.zone3_latin': 'Zona Torrida',
    'worldmap.zone3_description': 'The burning zone at the equator - too hot for human life',
    'worldmap.zone3_characteristics': 'Extreme heat, deserts, difficult to cross',
    'worldmap.zone3_quote': 'Zona torrida et inhabitabilis propter nimium calorem',
    
    'worldmap.zone4_name': 'Southern Temperate Zone',
    'worldmap.zone4_latin': 'Zona Temperata Australis',
    'worldmap.zone4_description': 'The hypothetical antipodean zone of the southern hemisphere',
    'worldmap.zone4_characteristics': 'Mirror of our world, but inaccessible',
    'worldmap.zone4_quote': 'Zona temperata sed nobis incognita',
    
    'worldmap.zone5_name': 'Southern Ice Zone',
    'worldmap.zone5_latin': 'Zona Frigida Australis',
    'worldmap.zone5_description': 'The southern ice zone - mirror image of northern cold',
    'worldmap.zone5_characteristics': 'Eternal ice, symmetrical to the northern zone',
    'worldmap.zone5_quote': 'Zona frigida australis, similis septentrionali',
    
    // Scientific Legacy
    'worldmap.scientific_legacy_title': 'Scientific Legacy',
    'worldmap.climate_science_title': 'Climate Science',
    'worldmap.climate_science_description': 'Macrobius\' climate zone theory was scientifically remarkably accurate and influenced geography until the Renaissance',
    'worldmap.cartography_title': 'Cartography',
    'worldmap.cartography_description': 'His descriptions shaped medieval world maps and promoted understanding of the Earth globe',
    'worldmap.modern_confirmation_title': 'Modern Confirmation',
    'worldmap.modern_confirmation_description': 'The Köppen climate classification today confirms Macrobius\' fundamental division of climate zones',
    
    // 🏛️ THEMES TRANSLATIONS
    'themes.philosophy': 'Philosophy',
    'themes.religion': 'Religion',
    'themes.astronomy': 'Astronomy',
    'themes.literature': 'Literature',
    'themes.history': 'History',
    'themes.law': 'Law',
    'themes.education': 'Education',
    'themes.social_customs': 'Social Customs',
    'themes.general': 'General',
    'themes.all': 'All Themes',
    
    // ☁️ ORACLE CLOUD INTEGRATION
    'oracle.connecting': 'Connecting to Oracle Cloud...',
    'oracle.connected': '✅ Connected to Oracle Cloud (1,401 texts)',
    'oracle.disconnected': '❌ Oracle Cloud connection failed - check port 8080',
    'oracle.error': 'Oracle Cloud connection failed',
    'oracle.connection_failed': 'Oracle Cloud backend is unreachable. Please check firewall settings for port 8080.',
    'oracle.connection_error': 'Connection error',
    'oracle.unavailable_title': 'Oracle Cloud backend unavailable',
    'oracle.unavailable_message': 'The connection to Oracle Cloud (152.70.184.232:8080) could not be established.',
    'oracle.troubleshooting_title': 'Troubleshooting steps',
    'oracle.troubleshoot_firewall': 'Open firewall port 8080 for external connections',
    'oracle.troubleshoot_security': 'Check Oracle Cloud security rules',
    'oracle.troubleshoot_service': 'Verify backend service status',
    'oracle.troubleshoot_network': 'Test network connection',
    'oracle.integration_title': 'Oracle Cloud Integration',
    'oracle.backend': 'Backend',
    'oracle.backend_value': 'Oracle Cloud Free Tier',
    'oracle.endpoint': 'Endpoint',
    'oracle.status': 'Status',
    'oracle.status_operational': '✅ Operational',
    'oracle.status_connection_required': '❌ Connection required',
    'oracle.corpus': 'Corpus',
    'oracle.corpus_value': '1,401 authentic passages',
    'oracle.themes': 'Themes',
    'oracle.themes_value': '9 cultural categories',
    'oracle.features': 'Features',
    'oracle.features_value': 'Full-text search, filters, context',
    'oracle.fallback': 'Using local content as fallback',
    'oracle.retry': 'Retry connection',
    'oracle.timeout': 'Connection timeout',
    'oracle.server_error': 'Server error',
    'oracle.network_error': 'Network error',
    'oracle.authentication_error': 'Authentication error',
    'oracle.loading': 'Loading data...',
    'oracle.success': 'Successfully connected',
    'oracle.status_checking': 'Checking connection status...',
    'oracle.offline_mode': 'Offline mode active',
    'oracle.reconnecting': 'Attempting to reconnect...',
    'oracle.data_loaded': 'Data loaded successfully',
    
    // Modal content translations
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Cultural Preserver of the Late Antique World (ca. 385-430 AD)',
    'about_biography': 'Macrobius Ambrosius Theodosius was one of the most fascinating figures of late antiquity - a man who stood at the threshold between two worlds.',
    'about_works': 'Macrobius\' two major works "Saturnalia" and "Commentarii in Somnium Scipionis" are masterpieces of late antique scholarship.',
    'about_legacy': 'Macrobius\' cultural "message in a bottle" proved to be one of the most successful projects in world history.',
    'about_pontanus_title': 'Johannes Isaac Pontanus & Tycho Brahe',
    'about_pontanus_subtitle': 'Astronomical Renaissance and the Rediscovery of Macrobius (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus was more than just an assistant to the great Tycho Brahe - he was a bridge-builder between the worlds of ancient wisdom and modern science.',
    'about_pontanus_work': 'Pontanus\' editorial achievement was groundbreaking.',
    'about_pontanus_legacy': 'Through Pontanus\' work, the crucial bridge between ancient culture and Renaissance scholarship was built.',
    'pontanus_historical_details': 'The Pontanus edition follows the printed text with 117 pages of his own learned annotations.',
    'declining_rome_title': 'The Declining Roman Empire',
    'declining_rome_subtitle': 'Cultural Decline and the Mission of Scholars (4th-5th Century AD)',
    'declining_rome_content': 'The time of Macrobius was marked by the dramatic decline of the Western Roman Empire.',
    'cultural_story': '1500 years ago, as the Roman Empire approached its end, Macrobius created a message in a bottle to the future. This "message in a bottle" consisted of his two great works: the "Saturnalia" and the "Commentary on Scipio\'s Dream". In them, he preserved the best of ancient culture - from Cicero\'s rhetoric to the secrets of astronomy. His mission: to save the cultural heritage for future generations.',
    'explore_texts': 'EXPLORE MACROBIUS\' TWO MAJOR WORKS',
    'more_about_macrobius': 'More about Macrobius',
    'more_about_pontanus': 'More about Pontanus',
    'close_modal': 'Close',

    // 🍽️ BANQUET SECTION TRANSLATIONS
    'banquet.title': 'Saturnalia',
    'banquet.subtitle': 'The Learned Banquet',
    'banquet.description': 'In Macrobius\' Saturnalia, the most educated men of Rome gather for a multi-day banquet during the winter festivals. This literary portrayal of an intellectual symposium preserves the tradition of learned conversation and gives us a unique picture of late antique educational culture.',
    'banquet.scene_title': 'The Banquet',
    'banquet.participants_title': 'The Participants',
    'banquet.participant1_name': 'Vettius Agorius Praetextatus',
    'banquet.participant1_role': 'Urban Prefect and Philosopher',
    'banquet.participant1_description': 'Praetextatus was one of the most significant figures of the late Roman elite. As Urban Prefect of Rome and an initiate of various mystery cults, he embodied the last flowering of traditional Roman paganism. His philosophical education and religious tolerance made him the ideal host for learned discussions.',
    'banquet.participant2_name': 'Virius Nicomachus Flavianus',
    'banquet.participant2_role': 'Historian and Statesman',
    'banquet.participant2_description': 'Flavianus came from one of Rome\'s most noble families and held the highest state offices. As a historian and defender of traditional religion, he led the intellectual opposition against rising Christianity. His historical works and cultural patronage shaped the intellectual life of his time.',
    'banquet.participant3_name': 'Quintus Aurelius Symmachus',
    'banquet.participant3_role': 'Orator and Senator',
    'banquet.participant3_description': 'Symmachus was the greatest orator of his generation and a passionate defender of Roman tradition. His letters and speeches give us today the most vivid picture of aristocratic life in the late 4th century. He fought unsuccessfully for the preservation of the Altar of Victory in the Senate.',
    'banquet.participant4_name': 'Servius',
    'banquet.participant4_role': 'Grammarian and Virgil Commentator',
    'banquet.participant4_description': 'Servius was the most important Virgil commentator of antiquity. His detailed explanations of Virgil\'s works became the standard work for all following centuries. Through him, not only the understanding of Virgil was preserved, but also countless details about ancient culture, religion, and history.',
    'banquet.participant5_name': 'Caecina Albinus',
    'banquet.participant5_role': 'Scholar and Politician',
    'banquet.participant5_description': 'Albinus, like many of his contemporaries, combined political power with scholarly education. As a member of the senatorial elite and simultaneously as a philosopher and man of letters, he represented the ideal of the educated Roman aristocrat who combined public responsibility with intellectual curiosity.',
    'banquet.context_title': 'Cultural Context',
    'banquet.context_description': 'These men represented the last generation of the classically educated Roman elite. In a time of upheaval, as Christianity became the state religion and Germanic peoples pressed upon the empire, they attempted to preserve the traditions and knowledge of a thousand years of Roman culture.',
    'banquet.topics_title': 'Discussion Topics',
    'banquet.day1': 'Day 1',
    'banquet.day1_topic1': 'Virgil\'s Poetry',
    'banquet.day1_topic2': 'Ancient Grammar',
    'banquet.day1_topic3': 'Language History',
    'banquet.day2': 'Day 2',
    'banquet.day2_topic1': 'Philosophy and Religion',
    'banquet.day2_topic2': 'Astronomy',
    'banquet.day2_topic3': 'Natural Sciences',
    'banquet.day3': 'Day 3',
    'banquet.day3_topic1': 'Law and Society',
    'banquet.day3_topic2': 'History of Rome',
    'banquet.day3_topic3': 'Cultural Traditions',
    'banquet.quote': '"In such conversations true education reveals itself: not the accumulation of knowledge, but the art of sharing and deepening it in living discussion."',
    'banquet.quote_attribution': 'Macrobius on the Saturnalia',
    'banquet.legacy_title': 'Cultural Heritage',
    'banquet.legacy1_title': 'Text Preservation',
    'banquet.legacy1_description': 'The Saturnalia preserved hundreds of quotations and anecdotes from lost ancient works and thus became an inexhaustible source for understanding Roman literature.',
    'banquet.legacy2_title': 'Educational Ideal',
    'banquet.legacy2_description': 'The model of learned conversation shaped the educational culture of the Middle Ages and Renaissance. From monastery schools to humanistic academies, people oriented themselves to the example of the Saturnalia.',
    'banquet.legacy3_title': 'Cultural Transmission',
    'banquet.legacy3_description': 'The combination of entertainment and instruction, as realized in the Saturnalia, became the model for countless later works of educational literature.',

    // 🌌 COSMOS SECTION TRANSLATIONS
    'cosmos.title': 'Macrobius\' Cosmos',
    'cosmos.subtitle': 'The Nine Celestial Spheres',
    'cosmos.description': 'In the 5th century AD, Macrobius documented in his "Commentary on Scipio\'s Dream" a fascinating cosmological system. His description of the nine celestial spheres unites Platonic philosophy, Pythagorean number mysticism, and astronomical observation into a unified worldview that would shape medieval and Renaissance thought for centuries.',
    'cosmos.sphere1_name': 'Sphere of the Moon',
    'cosmos.sphere1_description': 'The lowest sphere, closest to the earthly realm',
    'cosmos.sphere1_properties': 'Changeable, transient, influence on the subconscious',
    'cosmos.sphere1_influence': 'Dreams, instincts, natural cycles',
    'cosmos.sphere2_name': 'Sphere of Mercury',
    'cosmos.sphere2_description': 'Sphere of communication and commerce',
    'cosmos.sphere2_properties': 'Quick movement, mediation, intelligence',
    'cosmos.sphere2_influence': 'Language, trade, science',
    'cosmos.sphere3_name': 'Sphere of Venus',
    'cosmos.sphere3_description': 'Sphere of beauty and harmony',
    'cosmos.sphere3_properties': 'Attraction, aesthetics, love',
    'cosmos.sphere3_influence': 'Art, music, human relationships',
    'cosmos.sphere4_name': 'Sphere of the Sun',
    'cosmos.sphere4_description': 'Central sphere, source of light and life',
    'cosmos.sphere4_properties': 'Vitality, leadership, enlightenment',
    'cosmos.sphere4_influence': 'Life, wisdom, divine knowledge',
    'cosmos.sphere5_name': 'Sphere of Mars',
    'cosmos.sphere5_description': 'Sphere of energy and will',
    'cosmos.sphere5_properties': 'Strength, courage, assertiveness',
    'cosmos.sphere5_influence': 'War, courage, active energy',
    'cosmos.sphere6_name': 'Sphere of Jupiter',
    'cosmos.sphere6_description': 'Sphere of wisdom and justice',
    'cosmos.sphere6_properties': 'Justice, wisdom, expansion',
    'cosmos.sphere6_influence': 'Law, philosophy, spiritual leadership',
    'cosmos.sphere7_name': 'Sphere of Saturn',
    'cosmos.sphere7_description': 'Sphere of time and structure',
    'cosmos.sphere7_properties': 'Time, limitation, discipline',
    'cosmos.sphere7_influence': 'Chronos, structure, spiritual discipline',
    'cosmos.sphere8_name': 'Sphere of Fixed Stars',
    'cosmos.sphere8_description': 'Sphere of eternal order',
    'cosmos.sphere8_properties': 'Immutability, eternal patterns',
    'cosmos.sphere8_influence': 'Fate, cosmic order',
    'cosmos.sphere9_name': 'The Primum Mobile',
    'cosmos.sphere9_description': 'First movement, source of all motion',
    'cosmos.sphere9_properties': 'Pure movement, divine impulse',
    'cosmos.sphere9_influence': 'Divine will, first cause',
    'cosmos.properties_label': 'Properties',
    'cosmos.influence_label': 'Influence',
    'cosmos.insights_title': 'Cosmological Insights',
    'cosmos.insight1_title': 'Harmony of the Spheres',
    'cosmos.insight1_description': 'Each sphere produces a tone in perfect harmonic proportion. This music of the spheres, inaudible to mortal ears, forms the foundation of all earthly music and harmony.',
    'cosmos.insight2_title': 'Numerical Order',
    'cosmos.insight2_description': 'Pythagorean number relationships determine the distances and movements of the spheres. This mathematical order reflects the rational structure of the entire cosmos.',
    'cosmos.insight3_title': 'Soul\'s Journey',
    'cosmos.insight3_description': 'The soul traverses the spheres on its path between heaven and earth. Each sphere imprints it with special properties and insights.',
    'cosmos.tycho_title': 'Tycho\'s Legacy',
    'cosmos.tycho_description': 'Tycho Brahe studied Macrobius\' cosmology intensively. His synthesis of ancient wisdom and modern observation revolutionized astronomical thinking and paved the way for Kepler and Newton.',
    'cosmos.start_rotation': 'Start Rotation',
    'cosmos.stop_rotation': 'Stop Rotation',
    'cosmos.reset_view': 'Reset View',
    'cosmos.click_sphere': 'Click on a sphere for details',
    'cosmos.rotating': 'Rotating',
    'cosmos.stationary': 'Stationary',
    
    // UI elements
    'loading': 'Loading...',
    'error': 'An error occurred',
    'back': 'Back',
    'next': 'Next',
    'submit': 'Submit',
    'close': 'Close',
  },
  LA: {
    // Navigation translations
    'nav.home': 'Domus',
    'nav.intro': 'Introductio',
    'nav.quiz': 'Quaestiones',
    'nav.worldmap': 'Mappa Mundi',
    'nav.cosmos': 'Cosmos',
    'nav.banquet': 'Convivium',
    'nav.textsearch': 'Quaestio Textuum',
    'nav.learning': 'Discere',
    'nav.visualizations': 'Visualizationes',
    'nav.ai_systems': 'SYSTEMATA AI',
    'nav.ai_cultural': 'AI Analysis Culturalis',
    'nav.ai_learning': 'Semitae Discendi',
    'nav.ai_tutoring': 'AI Praeceptor',
    'nav.ai_modules': 'Moduli Culturales',
    'nav.oracle_status': '1.401 Textus Culturales',
    
    // Hero section translations
    'hero.badge': 'Thesauri Culturales Antiquitatis',
    'hero.title.line1': 'Macrobius',
    'hero.title.line2': 'Digitalis',
    'hero.description': 'Thesauros Culturales Antiquitatis Invenite',
    
    // 🔍 SEARCH SECTION TRANSLATIONS
    'search.title': 'Quaestio Textuum',
    'search.description': 'Quaere per 1.401 authenticos passus Macrobii cum Oracle Cloud',
    'search.placeholder': 'Quaere authenticos passus Macrobii... (e.g. "convivium", "stella", "virtus")',
    'search.button': 'Quaerere',
    'search.searching': 'Quaerens...',
    'search.results_title': 'Resultata ex Oracle Cloud',
    'search.latin_text': 'Textus Latinus',
    'search.error': 'Quaestio defecit. Oracle Cloud backend non disponibile.',
    'search.no_results': 'Nulla resultata inventa',
    'search.example_queries': 'Exempla quaestionum',
    'search.filters': 'Filtri',
    'search.sort_by': 'Ordinare per',
    'search.relevance': 'Relevantia',
    'search.chronological': 'Chronologicus',
    'search.clear_results': 'Resultata delete',
    
    // 🗺️ WORLDMAP SECTION TRANSLATIONS
    'worldmap.title': 'Mappa Mundi Macrobii',
    'worldmap.subtitle': 'Quinque Zonae Climaticae Terrae',
    'worldmap.description': 'Visio geographica Macrobii Terram in quinque zonas climaticas concentricas dividebat - descriptio scientifica notabiliter accurata pro saeculo quinto. Haec theoria geographiam medievalem per plus quam 1000 annos influebat.',
    'worldmap.earth_title': 'Globus Terrae secundum Macrobium',
    'worldmap.click_zones': 'Zonas preme pro detaliis',
    'worldmap.zones_details_title': 'Detalia Zonarum Climaticarum',
    'worldmap.description_label': 'Descriptio',
    'worldmap.characteristics_label': 'Proprietates',
    'worldmap.macrobius_quote_label': 'Textus Originalis Macrobii',
    
    // Climate Zones
    'worldmap.zone1_name': 'Zona Arctica',
    'worldmap.zone1_latin': 'Zona Frigida Septentrionalis',
    'worldmap.zone1_description': 'Zona glacialis septentrionalis - inhabitabilis propter frigus extremum',
    'worldmap.zone1_characteristics': 'Glacies aeterna, nulla vegetatio, inhabitabilis',
    'worldmap.zone1_quote': 'Zona frigida et inhabitabilis propter nimium frigus',
    
    'worldmap.zone2_name': 'Zona Temperata Septentrionalis',
    'worldmap.zone2_latin': 'Zona Temperata Septentrionalis',
    'worldmap.zone2_description': 'Zona habitabilis hemisphaerii septentrionalis',
    'worldmap.zone2_characteristics': 'Quattuor tempora anni, terrae fertiles, habitatio densa',
    'worldmap.zone2_quote': 'Zona temperata et habitabilis, ubi nos vivimus',
    
    'worldmap.zone3_name': 'Zona Torrida Aequatorialis',
    'worldmap.zone3_latin': 'Zona Torrida',
    'worldmap.zone3_description': 'Zona ardens ad aequatorem - nimis calida vitae humanae',
    'worldmap.zone3_characteristics': 'Calor extremus, deserta, difficilis transitus',
    'worldmap.zone3_quote': 'Zona torrida et inhabitabilis propter nimium calorem',
    
    'worldmap.zone4_name': 'Zona Temperata Australis',
    'worldmap.zone4_latin': 'Zona Temperata Australis',
    'worldmap.zone4_description': 'Zona hypothetica antipodum hemisphaerii australis',
    'worldmap.zone4_characteristics': 'Speculum mundi nostri, sed inaccessibilis',
    'worldmap.zone4_quote': 'Zona temperata sed nobis incognita',
    
    'worldmap.zone5_name': 'Zona Glacialis Australis',
    'worldmap.zone5_latin': 'Zona Frigida Australis',
    'worldmap.zone5_description': 'Zona glacialis australis - imago specularis frigoris septentrionalis',
    'worldmap.zone5_characteristics': 'Glacies aeterna, symmetrica zonae septentrionali',
    'worldmap.zone5_quote': 'Zona frigida australis, similis septentrionali',
    
    // Scientific Legacy
    'worldmap.scientific_legacy_title': 'Hereditas Scientifica',
    'worldmap.climate_science_title': 'Scientia Climatica',
    'worldmap.climate_science_description': 'Theoria zonarum climaticarum Macrobii scientifice notabiliter accurata erat et geographiam usque ad Renascentiam influebat',
    'worldmap.cartography_title': 'Cartographia',
    'worldmap.cartography_description': 'Eius descriptiones mappas mundi medievales formaverunt et intellegentiam globi terrestris promoverunt',
    'worldmap.modern_confirmation_title': 'Confirmatio Moderna',
    'worldmap.modern_confirmation_description': 'Classificatio climatica Köppen hodie fundamentalem divisionem zonarum climaticarum Macrobii confirmat',
    
    // 🏛️ THEMES TRANSLATIONS
    'themes.philosophy': 'Philosophia',
    'themes.religion': 'Religio',
    'themes.astronomy': 'Astronomia',
    'themes.literature': 'Literatura',
    'themes.history': 'Historia',
    'themes.law': 'Ius',
    'themes.education': 'Educatio',
    'themes.social_customs': 'Mores Sociales',
    'themes.general': 'Generalis',
    'themes.all': 'Omnia Themata',
    
    // ☁️ ORACLE CLOUD INTEGRATION
    'oracle.connecting': 'Connectens ad Oracle Cloud...',
    'oracle.connected': '✅ Connectum ad Oracle Cloud (1.401 textus)',
    'oracle.disconnected': '❌ Connexio Oracle Cloud defecit - portum 8080 verifica',
    'oracle.error': 'Connexio Oracle Cloud defecit',
    'oracle.connection_failed': 'Oracle Cloud backend non attingi potest. Configurationes firewall pro portu 8080 verifica.',
    'oracle.connection_error': 'Error connexionis',
    'oracle.unavailable_title': 'Oracle Cloud backend non disponibile',
    'oracle.unavailable_message': 'Connexio ad Oracle Cloud (152.70.184.232:8080) non stabiliri potuit.',
    'oracle.troubleshooting_title': 'Gradus solutionis',
    'oracle.troubleshoot_firewall': 'Portum firewall 8080 pro connexionibus externis aperi',
    'oracle.troubleshoot_security': 'Regulas securitatis Oracle Cloud verifica',
    'oracle.troubleshoot_service': 'Statum servitii backend verifica',
    'oracle.troubleshoot_network': 'Connexionem retis testa',
    'oracle.integration_title': 'Integratio Oracle Cloud',
    'oracle.backend': 'Backend',
    'oracle.backend_value': 'Oracle Cloud Free Tier',
    'oracle.endpoint': 'Terminus',
    'oracle.status': 'Status',
    'oracle.status_operational': '✅ Operationalis',
    'oracle.status_connection_required': '❌ Connexio necessaria',
    'oracle.corpus': 'Corpus',
    'oracle.corpus_value': '1.401 passus authentici',
    'oracle.themes': 'Themata',
    'oracle.themes_value': '9 categoriae culturales',
    'oracle.features': 'Proprietates',
    'oracle.features_value': 'Quaestio pleni textus, filtri, contextus',
    'oracle.fallback': 'Contenta localia ut fallback utens',
    'oracle.retry': 'Connexionem iterare',
    'oracle.timeout': 'Tempus connexionis excessum',
    'oracle.server_error': 'Error servatoris',
    'oracle.network_error': 'Error retis',
    'oracle.authentication_error': 'Error authenticationis',
    'oracle.loading': 'Data oneranda...',
    'oracle.success': 'Feliciter connectum',
    'oracle.status_checking': 'Status connexionis verificandus...',
    'oracle.offline_mode': 'Modus offline activus',
    'oracle.reconnecting': 'Reconnectere tentans...',
    'oracle.data_loaded': 'Data feliciter onerata',
    
    // Modal content translations
    'about_title': 'Macrobius Ambrosius Theodosius',
    'about_subtitle': 'Custos Culturae Mundi Antiquitatis Serae (ca. 385-430 p. Chr.)',
    'about_biography': 'Macrobius Ambrosius Theodosius vir fuit inter figuras fascinantissimas antiquitatis serae.',
    'about_works': 'Duo opera principalia Macrobii sunt opera magistralia eruditionis antiquitatis serae.',
    'about_legacy': 'Culturalis "epistula in lagena" Macrobii unum ex projectis successuris mundi historiae se probavit.',
    'about_pontanus_title': 'Johannes Isaac Pontanus et Tycho Brahe',
    'about_pontanus_subtitle': 'Renascentia Astronomica et Inventio Nova Macrobii (1571-1639)',
    'about_pontanus_bio': 'Johannes Isaac Pontanus plus erat quam solum adiutor magni Tychonis Brahe.',
    'about_pontanus_work': 'Opus editoriale Pontani fundamentale erat.',
    'about_pontanus_legacy': 'Per laborem Pontani, pons crucialis inter culturam antiquam et eruditionem Renascentiae aedificatus est.',
    'pontanus_historical_details': 'Editio Pontani textum impressum cum 117 paginis notationum eruditionis suae sequitur.',
    'declining_rome_title': 'Imperium Romanum Cadens',
    'declining_rome_subtitle': 'Declinatio Culturalis et Missio Eruditorum (Saec. IV-V p. Chr.)',
    'declining_rome_content': 'Tempus Macrobii declinio dramatico Imperii Romani Occidentalis signatum erat.',
    'cultural_story': 'Ante 1500 annos, cum Imperium Romanum fini appropinquaret, Macrobius epistulam in lagena ad futurum creavit. Haec "epistula in lagena" duo opera magna eius erant: "Saturnalia" et "Commentarius de Somnio Scipionis". In his optimum culturae antiquae servavit - a rhetorica Ciceronis ad secreta astronomiae. Eius missio: patrimonium culturale generationibus futuris servare.',
    'explore_texts': 'DUO OPERA MACROBII EXPLORARE',
    'more_about_macrobius': 'Magis de Macrobio',
    'more_about_pontanus': 'Magis de Pontano',
    'close_modal': 'Claudere',

    // 🍽️ BANQUET SECTION TRANSLATIONS
    'banquet.title': 'Saturnalia',
    'banquet.subtitle': 'Convivium Eruditum',
    'banquet.description': 'In Saturnalibus Macrobii, viri eruditissimi Romae ad convivium plurium dierum congregantur durante festis hibernis. Haec litteraria descriptio symposii intellectualis traditionem sermonis eruditi conservat nobisque imaginem unicam culturae educationis antiquitatis serae praebet.',
    'banquet.scene_title': 'Convivium',
    'banquet.participants_title': 'Participes',
    'banquet.participant1_name': 'Vettius Agorius Praetextatus',
    'banquet.participant1_role': 'Praefectus Urbanus et Philosophus',
    'banquet.participant1_description': 'Praetextatus una ex figuris significantissimis elitis Romanae serae erat. Ut Praefectus Urbanus Romae et initiatus variorum cultuum mysteriorum, ultimum florem paganismi Romani traditionalis incarnabat.',
    'banquet.participant2_name': 'Virius Nicomachus Flavianus',
    'banquet.participant2_role': 'Historicus et Vir Publicus',
    'banquet.participant2_description': 'Flavianus ex una ex familiis nobilissimis Romae oriundus erat et summos magistratus gerebat. Ut historicus et defensor religionis traditionalis, oppositionem intellectualem contra Christianismum crescentem ducebat.',
    'banquet.participant3_name': 'Quintus Aurelius Symmachus',
    'banquet.participant3_role': 'Orator et Senator',
    'banquet.participant3_description': 'Symmachus maximus orator suae generationis et defensor passionatus traditionis Romanae erat. Eius epistulae et orationes nobis hodie vivacissimam imaginem vitae aristocraticae saeculi quarti serotini praebent.',
    'banquet.participant4_name': 'Servius',
    'banquet.participant4_role': 'Grammaticus et Commentator Vergilii',
    'banquet.participant4_description': 'Servius commentator Vergilii important antiquitatis erat. Eius explicatio detaillata operum Vergilii opus standard omnium saeculorum sequentium facta est.',
    'banquet.participant5_name': 'Caecina Albinus',
    'banquet.participant5_role': 'Eruditus et Politicus',
    'banquet.participant5_description': 'Albinus, sicut multi aequales sui, potentiam politicam cum educatione erudita coniungabat. Ut membrum elitis senatoriae et simul ut philosophus et litteratus, ideal aristocratis Romani educati repraesentabat.',
    'banquet.context_title': 'Contextus Culturalis',
    'banquet.context_description': 'Hi viri ultimam generationem elitis Romanae classice educatae repraesentabant. In tempore commutationis, cum Christianismus religio civitatis fieret et populi Germanici imperium premerent.',
    'banquet.topics_title': 'Themata Discussionis',
    'banquet.day1': 'Dies Prima',
    'banquet.day1_topic1': 'Poesis Vergilii',
    'banquet.day1_topic2': 'Grammatica Antiqua',
    'banquet.day1_topic3': 'Historia Linguae',
    'banquet.day2': 'Dies Secunda',
    'banquet.day2_topic1': 'Philosophia et Religio',
    'banquet.day2_topic2': 'Astronomia',
    'banquet.day2_topic3': 'Scientiae Naturales',
    'banquet.day3': 'Dies Tertia',
    'banquet.day3_topic1': 'Ius et Societas',
    'banquet.day3_topic2': 'Historia Romae',
    'banquet.day3_topic3': 'Traditiones Culturales',
    'banquet.quote': '"In talibus sermonibus vera eruditio se manifestat: non accumulatio scientiae, sed ars eam in discussione viva communicandi et profundandi."',
    'banquet.quote_attribution': 'Macrobius de Saturnalibus',
    'banquet.legacy_title': 'Patrimonium Culturale',
    'banquet.legacy1_title': 'Conservatio Textuum',
    'banquet.legacy1_description': 'Saturnalia centenas citationum et anecdotarum ex operibus antiquis perditis conservaverunt et ita fons inexhaustus intellegentiae litteraturae Romanae facta sunt.',
    'banquet.legacy2_title': 'Ideal Educationis',
    'banquet.legacy2_description': 'Exemplar sermonis eruditi culturam educationis Medii Aevi et Renascentiae formavit. A scholis monasticis usque ad academias humanisticas, homines se ad exemplum Saturnalium orientabant.',
    'banquet.legacy3_title': 'Transmissio Culturalis',
    'banquet.legacy3_description': 'Coniunctio oblectationis et instructionis, sicut in Saturnalibus realizata, exemplum innumerabilium operum posteriorium litteraturae educationis facta est.',

    // 🌌 COSMOS SECTION TRANSLATIONS
    'cosmos.title': 'Cosmos Macrobii',
    'cosmos.subtitle': 'Novem Sphaerae Caelestes',
    'cosmos.description': 'Saeculo quinto post Christum, Macrobius in suo "Commentario de Somnio Scipionis" systema cosmologicum fascinans documentavit. Eius descriptio novem sphaearum caelestium philosophiam Platonicam, mysticam numerorum Pythagoricam, et observationem astronomicam in visionem mundi unitam coniungit.',
    'cosmos.sphere1_name': 'Sphaera Lunae',
    'cosmos.sphere1_description': 'Sphaera infima, regno terreno proxima',
    'cosmos.sphere1_properties': 'Mutabilis, transiens, influxus in subconscientia',
    'cosmos.sphere1_influence': 'Somnia, instinctus, cycli naturales',
    'cosmos.sphere2_name': 'Sphaera Mercurii',
    'cosmos.sphere2_description': 'Sphaera communicationis et commercii',
    'cosmos.sphere2_properties': 'Motus velox, mediatio, intelligentia',
    'cosmos.sphere2_influence': 'Lingua, commercium, scientia',
    'cosmos.sphere3_name': 'Sphaera Veneris',
    'cosmos.sphere3_description': 'Sphaera pulchritudinis et harmoniae',
    'cosmos.sphere3_properties': 'Attractio, aesthetica, amor',
    'cosmos.sphere3_influence': 'Ars, musica, relationes humanae',
    'cosmos.sphere4_name': 'Sphaera Solis',
    'cosmos.sphere4_description': 'Sphaera centralis, fons lucis et vitae',
    'cosmos.sphere4_properties': 'Vitalitas, ducatus, illuminatio',
    'cosmos.sphere4_influence': 'Vita, sapientia, cognitio divina',
    'cosmos.sphere5_name': 'Sphaera Martis',
    'cosmos.sphere5_description': 'Sphaera energiae et voluntatis',
    'cosmos.sphere5_properties': 'Vis, fortitudo, assertio',
    'cosmos.sphere5_influence': 'Bellum, fortitudo, energia activa',
    'cosmos.sphere6_name': 'Sphaera Iovis',
    'cosmos.sphere6_description': 'Sphaera sapientiae et iustitiae',
    'cosmos.sphere6_properties': 'Iustitia, sapientia, expansio',
    'cosmos.sphere6_influence': 'Ius, philosophia, ducatus spiritualis',
    'cosmos.sphere7_name': 'Sphaera Saturni',
    'cosmos.sphere7_description': 'Sphaera temporis et structurae',
    'cosmos.sphere7_properties': 'Tempus, limitatio, disciplina',
    'cosmos.sphere7_influence': 'Chronos, structura, disciplina spiritualis',
    'cosmos.sphere8_name': 'Sphaera Stellarum Fixarum',
    'cosmos.sphere8_description': 'Sphaera ordinis aeterni',
    'cosmos.sphere8_properties': 'Immutabilitas, exempla aeterna',
    'cosmos.sphere8_influence': 'Fatum, ordo cosmicus',
    'cosmos.sphere9_name': 'Primum Mobile',
    'cosmos.sphere9_description': 'Motus primus, fons omnis motus',
    'cosmos.sphere9_properties': 'Motus purus, impulsus divinus',
    'cosmos.sphere9_influence': 'Voluntas divina, causa prima',
    'cosmos.properties_label': 'Proprietates',
    'cosmos.influence_label': 'Influxus',
    'cosmos.insights_title': 'Cognitiones Cosmologicae',
    'cosmos.insight1_title': 'Harmonia Sphaearum',
    'cosmos.insight1_description': 'Quaeque sphaera sonum in perfecta proportione harmonica producit. Haec musica sphaearum, auribus mortalibus inaudibilis, fundamentum omnis musicae et harmoniae terrestris format.',
    'cosmos.insight2_title': 'Ordo Numericus',
    'cosmos.insight2_description': 'Relationes numerorum Pythagoricae distantias et motus sphaearum determinant. Hic ordo mathematicus structuram rationalem totius cosmi reflectit.',
    'cosmos.insight3_title': 'Iter Animae',
    'cosmos.insight3_description': 'Anima sphaeras in suo itinere inter caelum et terram transit. Quaeque sphaera eam proprietatibus et cognitionibus specialibus imprimit.',
    'cosmos.tycho_title': 'Hereditas Tychonis',
    'cosmos.tycho_description': 'Tycho Brahe cosmologiam Macrobii intensive studebat. Eius synthesis sapientiae antiquae et observationis modernae cogitationem astronomicam revolutionariam fecit.',
    'cosmos.start_rotation': 'Rotationem Incipere',
    'cosmos.stop_rotation': 'Rotationem Sistere',
    'cosmos.reset_view': 'Aspectum Restituere',
    'cosmos.click_sphere': 'Sphaeram preme pro detaliis',
    'cosmos.rotating': 'Rotans',
    'cosmos.stationary': 'Stans',
    
    // UI elements
    'loading': 'Oneratur...',
    'error': 'Error accidit',
    'back': 'Redire',
    'next': 'Sequens',
    'submit': 'Mittere',
    'close': 'Claudere',
  }
} as const;

// 🔧 SSG-COMPATIBLE TRANSLATION FUNCTION - Works during build and runtime
function getTranslation(key: string, language: Language = 'DE'): string {
  try {
    // Handle nested keys (like 'nav.intro')
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Translation not found - try German as fallback, then English
        if (language !== 'DE') {
          return getTranslation(key, 'DE');
        } else if (language !== 'EN') {
          return getTranslation(key, 'EN');
        }
        // Don't log warnings during build to avoid console spam
        if (typeof window !== 'undefined') {
          console.warn(`Translation missing: ${key} (${language})`);
        }
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  } catch (error) {
    if (typeof window !== 'undefined') {
      console.error('Translation error:', error);
    }
    return key;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('DE'); // Changed default to German
  const [isHydrated, setIsHydrated] = useState(false);

  // Load language from localStorage on mount - HYDRATION SAFE
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('macrobius-language') as Language;
      if (savedLanguage && ['DE', 'EN', 'LA'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.warn('Error loading language preference:', error);
    }
    // Mark as hydrated after first effect
    setIsHydrated(true);
  }, []);

  // Save language to localStorage when changed
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem('macrobius-language', language);
      } catch (error) {
        console.warn('Error saving language preference:', error);
      }
    }
  }, [language, isHydrated]);

  // Translation function - SSG compatible with hydration safety
  const t = (key: string): string => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  
  // During SSG, context might not be available, so provide fallback
  if (context === undefined) {
    // Return a fallback context for SSG
    return {
      language: 'DE' as Language,
      setLanguage: () => {},
      t: (key: string) => getTranslation(key, 'DE'),
      isHydrated: false
    };
  }
  
  return context;
}

// Export the standalone translation function for direct use
export { getTranslation };