import React, { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { BookOpen, Calendar, Globe, User, Clock, Crown, Scroll, ArrowRight } from 'lucide-react'

interface IntroSectionProps {
  language?: 'DE' | 'EN' | 'LA'
}

// 🚨 EMERGENCY DIRECT TRANSLATIONS - BYPASSING BROKEN CONTEXT
const DIRECT_TRANSLATIONS = {
  DE: {
    title: 'Wer War Macrobius?',
    subtitle: 'Entdecke Den Spätantiken Gelehrten Und Seine Werke',
    // ENHANCED: Längerer motivationaler Text wie angefordert
    longMotivationalText: `🏛️ **Eine antike Flaschenpost an die Zukunft** 🏛️

Stellen Sie sich vor: Es ist das Jahr 420 n. Chr. Das Weströmische Reich bricht zusammen, barbarische Stämme überrennen die Grenzen, und jahrhundertealtes Wissen droht für immer verloren zu gehen. In dieser Krisenzeit erkennt ein Mann seine historische Verantwortung: **Ambrosius Theodosius Macrobius**.

Als **Praefectus praetorio per Hispanias** - einer der höchsten Verwaltungsbeamten des Reiches - erlebt Macrobius den dramatischen Niedergang hautnah mit. Aber anstatt zu verzweifeln, wird er zum **Kulturbewahrer**. Seine Mission: Das intellektuelle Erbe der Antike für kommende Generationen zu retten.

**Seine Strategie war genial:** Er schreibt keine trockenen Handbücher, sondern erschafft lebendige **Dialogszenen** - fiktive Gelehrtengespräche beim Gastmahl, die das Beste der römischen Bildung bewahren. Seine Werke sind wie eine **kulturelle Arche Noah** - gefüllt mit Philosophie, Astronomie, Literaturkritik, Religionswissenschaft und Kulturanthropologie.

**Das Faszinierende:** Macrobius entwickelt ein **revolutionäres pädagogisches Konzept**. Er verpackt komplexes Wissen in unterhaltsame Erzählungen. Seine "Saturnalia" lesen sich wie eine antike Talkshow - gelehrte Römer diskutieren beim Festmahl über Literatur, Religion und Wissenschaft. Sein "Kommentar zum Traum des Scipio" wird zum **ersten populärwissenschaftlichen Astronomie-Bestseller** der Geschichte.

**Sein Vermächtnis ist überwältigend:** Über 1000 Jahre prägen seine Schriften das europäische Bildungswesen. Von den Klosterschulen Karls des Großen bis zu den Renaissance-Universitäten - überall lernen Studenten mit Macrobius. Columbus navigiert mit seinem geographischen System nach Amerika. Mittelalterliche Weltkarten basieren auf seinen Beschreibungen.

**Heute revolutioniert künstliche Intelligenz unser Verständnis seiner Werke.** Diese App erschließt erstmals den **kompletten Macrobius-Korpus** mit modernster KI-Technologie. Sie können authentische lateinische Texte analysieren, kulturelle Muster erkennen und Verbindungen zur Gegenwart entdecken.

**Macrobius' Botschaft an uns:** In Krisenzeiten bewahrt Bildung die Zivilisation. Sein Beispiel zeigt, wie ein Einzelner durch **Weisheit, Kreativität und Beharrlichkeit** das kulturelle Erbe der Menschheit retten kann.

**Willkommen in seiner Welt!** 🌟`,
    biography: {
      title: 'Biographie',
      content: 'Ambrosius Theodosius Macrobius (um 385-430 n. Chr.) war ein spätantiker römischer Gelehrter, Grammatiker und Philosoph. Er lebte während des Übergangs vom römischen Reich zum byzantinischen Reich und war bekannt für seine umfassende Bildung in Literatur, Philosophie und Naturwissenschaften.'
    },
    works: {
      title: 'Hauptwerke',
      saturnalia: {
        title: 'Saturnalia',
        description: 'Ein fiktives Symposium, das während der Saturnalien stattfindet. Das Werk behandelt Literatur, Philosophie, Antiquitäten und Naturwissenschaften in Form von Dialogen zwischen gelehrten Römern.'
      },
      commentary: {
        title: 'Commentarii in Somnium Scipionis',
        description: 'Ein Kommentar zu Ciceros "Traum des Scipio", der sich mit Kosmologie, Astronomie und der Struktur des Universums beschäftigt.'
      }
    },
    significance: {
      title: 'Bedeutung',
      content: 'Macrobius\'s Werke überbrückten die antike und mittelalterliche Welt und beeinflussten spätere Gelehrte erheblich. Seine Beschreibungen der Geographie und Kosmologie prägten das mittelalterliche Weltbild.'
    },
    explore: 'Werke Erkunden',
    culturalTreasures: 'Kulturelle Schätze entdecken',
    clickForDetails: '📜 Klicken Sie auf die Bilder für detaillierte kulturelle Hintergründe',
    declining_rome_title: 'Das untergehende Römische Reich',
    declining_rome_subtitle: 'Kultureller Niedergang und die Mission der Gelehrten',
    macrobius_son_title: 'Macrobius mit seinem Sohn',
    macrobius_son_subtitle: 'dem er seine Werke widmete',
    cosmology_title: 'Kosmologie des Scipio',
    cosmology_subtitle: 'Astronomische Visualisierungen',
    message_bottle_title: 'Eine antike Flaschenpost',
    message_bottle_subtitle: 'Eine Nachricht aus der Antike an die Zukunft'
  },
  EN: {
    title: 'Who Was Macrobius?',
    subtitle: 'Discover The Late Antique Scholar And His Works',
    longMotivationalText: `🏛️ **An Ancient Message in a Bottle to the Future** 🏛️

Imagine this: It's the year 420 CE. The Western Roman Empire is collapsing, barbarian tribes are overrunning the borders, and centuries-old knowledge threatens to be lost forever. In this time of crisis, one man recognizes his historic responsibility: **Ambrosius Theodosius Macrobius**.

As **Praefectus praetorio per Hispanias** - one of the highest administrative officials of the Empire - Macrobius witnesses the dramatic decline firsthand. But instead of despair, he becomes a **cultural preserver**. His mission: to save the intellectual heritage of antiquity for future generations.

**His strategy was ingenious:** He doesn't write dry handbooks, but creates living **dialogue scenes** - fictional scholarly conversations at banquets that preserve the best of Roman education. His works are like a **cultural Noah's Ark** - filled with philosophy, astronomy, literary criticism, religious studies, and cultural anthropology.

**The fascinating part:** Macrobius develops a **revolutionary pedagogical concept**. He packages complex knowledge in entertaining narratives. His "Saturnalia" reads like an ancient talk show - learned Romans discuss literature, religion, and science at a feast. His "Commentary on Scipio's Dream" becomes the **first popular science astronomy bestseller** in history.

**His legacy is overwhelming:** For over 1000 years, his writings shape European education. From Charlemagne's monastery schools to Renaissance universities - everywhere students learn with Macrobius. Columbus navigates to America using his geographical system. Medieval world maps are based on his descriptions.

**Today artificial intelligence revolutionizes our understanding of his works.** This app unlocks for the first time the **complete Macrobius corpus** with cutting-edge AI technology. You can analyze authentic Latin texts, recognize cultural patterns, and discover connections to the present.

**Macrobius' message to us:** In times of crisis, education preserves civilization. His example shows how a single individual through **wisdom, creativity, and perseverance** can save humanity's cultural heritage.

**Welcome to his world!** 🌟`,
    biography: {
      title: 'Biography',
      content: 'Ambrosius Theodosius Macrobius (c. 385-430 CE) was a late antique Roman scholar, grammarian, and philosopher. He lived during the transition from the Roman Empire to the Byzantine Empire and was known for his comprehensive education in literature, philosophy, and natural sciences.'
    },
    works: {
      title: 'Major Works',
      saturnalia: {
        title: 'Saturnalia',
        description: 'A fictional symposium taking place during the Saturnalia festival. The work covers literature, philosophy, antiquities, and natural sciences in the form of dialogues between learned Romans.'
      },
      commentary: {
        title: 'Commentary on Scipio\'s Dream',
        description: 'A commentary on Cicero\'s "Dream of Scipio" that deals with cosmology, astronomy, and the structure of the universe.'
      }
    },
    significance: {
      title: 'Significance',
      content: 'Macrobius\'s works bridged the ancient and medieval worlds, significantly influencing later scholars. His descriptions of geography and cosmology shaped the medieval worldview.'
    },
    explore: 'Explore Works',
    culturalTreasures: 'Discover Cultural Treasures',
    clickForDetails: '📜 Click on images for detailed cultural backgrounds',
    declining_rome_title: 'The Declining Roman Empire',
    declining_rome_subtitle: 'Cultural decline and the mission of scholars',
    macrobius_son_title: 'Macrobius with his Son',
    macrobius_son_subtitle: 'to whom he dedicated his works',
    cosmology_title: 'Cosmology of Scipio',
    cosmology_subtitle: 'Astronomical Visualizations',
    message_bottle_title: 'An Ancient Message in a Bottle',
    message_bottle_subtitle: 'A message from antiquity to the future'
  },
  LA: {
    title: 'Quis Erat Macrobius?',
    subtitle: 'Eruditum Antiquitatis Serae Et Opera Eius Disce',
    longMotivationalText: `🏛️ **Epistula Antiqua in Ampulla ad Futurum** 🏛️

Imaginare: Annus est 420 post Christum natum. Imperium Romanum Occidentale collabitur, tribus barbarae fines superant, et scientia saeculorum periclitatur ut in perpetuum pereat. In hoc tempore crisis, unus homo suam responsabilitatem historicam agnoscit: **Ambrosius Theodosius Macrobius**.

Ut **Praefectus praetorio per Hispanias** - unus ex summis administrationis officiis Imperii - Macrobius declinionem dramaticam propria experientia testatur. Sed pro desperatione, **conservator culturae** fit. Missio sua: hereditatem intellectualem antiquitatis pro generationibus futuris servare.

**Consilium eius geniale erat:** Non scribit aridos libros manuales, sed **dialogorum scenas** vivas creat - colloquia ficta eruditorum in conviviis quae optimum educationis Romanae conservant. Opera eius sunt quasi **arca culturalis Noe** - plena philosophia, astronomia, critica litterarum, studiis religiosis, et anthropologia culturali.

**Pars fascinans:** Macrobius **conceptum paedagogicum revolutionarium** evolvit. Scientiam complexam in narrationes delectabiles involvit. Eius "Saturnalia" leguntur quasi antiquum spectaculum - Romani eruditi de litteris, religione, et scientia in convivio disputant. Eius "Commentarius in Somnium Scipionis" fit **primus liber popularis scientiae astronomiae** in historia.

**Hereditas eius stupenda est:** Per plus quam 1000 annos, scripta eius educationem Europaeam formant. A scholis monasticis Caroli Magni ad universitates Renascentiae - ubique studentes cum Macrobio discunt. Columbus ad Americam navigat systemate eius geographico utens. Mappae mundi medievales in descriptionibus eius fundantur.

**Hodie intelligentia artificialis intellectum operum eius revolutionibus facit.** Haec app primum **corpus Macrobii completum** cum technologia AI ultima aperit. Potes textus Latinos authenticos analyzare, formas culturales recognoscere, et connexiones ad praesens detegere.

**Nuntius Macrobii ad nos:** Temporibus crisis, educatio civilizationem conservat. Exemplum eius ostendit quomodo unus homo per **sapientiam, creativitatem, et perseverantiam** hereditatem culturalem humanitatis servare potest.

**Salve in mundum eius!** 🌟`,
    biography: {
      title: 'Vita',
      content: 'Ambrosius Theodosius Macrobius (c. 385-430 p. Chr. n.) fuit eruditus Romanus antiquitatis serae, grammaticus, et philosophus. Vixit tempore transitus ab Imperio Romano ad Imperium Byzantinum et notus erat propter educationem comprehensivam in litteris, philosophia, et scientiis naturalibus.'
    },
    works: {
      title: 'Opera Praecipua',
      saturnalia: {
        title: 'Saturnalia',
        description: 'Symposium fictum tempore Saturnalium celebratum. Opus complectitur litteras, philosophiam, antiquitates, et scientias naturales in forma dialogorum inter eruditos Romanos.'
      },
      commentary: {
        title: 'Commentarii in Somnium Scipionis',
        description: 'Commentarius in "Somnium Scipionis" Ciceronis qui tractat cosmologiam, astronomiam, et structuram universi.'
      }
    },
    significance: {
      title: 'Momentum',
      content: 'Opera Macrobii mundum antiquum et medievalem coniunxerunt, eruditos posteriores significanter influentia. Descriptiones eius geographiae et cosmologiae visionem mundi medievalis formaverunt.'
    },
    explore: 'Opera Explorare',
    culturalTreasures: 'Thesauros Culturales Detegere',
    clickForDetails: '📜 Imagines tangi ad contextus culturales detaliatos',
    declining_rome_title: 'Imperium Romanum Declinans',
    declining_rome_subtitle: 'Declinatio culturalis et missio eruditorum',
    macrobius_son_title: 'Macrobius cum Filio',
    macrobius_son_subtitle: 'cui opera sua dedicavit',
    cosmology_title: 'Cosmologia Scipionis',
    cosmology_subtitle: 'Visualizationes Astronomicae',
    message_bottle_title: 'Epistula Antiqua in Ampulla',
    message_bottle_subtitle: 'Nuntius ex Antiquitate ad Futurum'
  }
} as const;

export function IntroSection({ language: propLanguage }: IntroSectionProps) {
  // 🚨 EMERGENCY: Use language prop directly, bypass broken context
  const language = propLanguage || 'DE';
  const t = DIRECT_TRANSLATIONS[language];
  
  // 🛡️ FALLBACK: If translation missing, try German, then English
  const safeT = (key: string): string => {
    const keys = key.split('.');
    let value: any = t;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Try German fallback
        if (language !== 'DE') {
          return safeT(key); // This will use the German translations
        }
        console.warn(`Translation missing: ${key} (${language})`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  return (
    <section id="intro" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* ENHANCED: Longer motivational text as requested */}
        <div className="mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-8 md:p-12 border-2 border-amber-200 shadow-2xl">
              <div className="prose prose-lg md:prose-xl max-w-none text-gray-800 leading-relaxed">
                <div style={{ whiteSpace: 'pre-line' }} className="space-y-4">
                  {t.longMotivationalText.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph.split('**').map((part, partIndex) => 
                        partIndex % 2 === 1 ? <strong key={partIndex} className="text-amber-800 font-bold">{part}</strong> : part
                      )}
                    </p>
                  ))}
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="mt-8 text-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    const element = document.querySelector('#search')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <ArrowRight className="mr-2 h-6 w-6" />
                  {t.explore}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Context Images */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t.culturalTreasures}
            </h3>
            <p className="text-gray-600">
              {t.clickForDetails}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Roman Empire Decline */}
            <div className="bg-gradient-to-br from-red-100 to-amber-100 rounded-lg p-6 border-2 border-amber-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm">
                  {t.declining_rome_title}
                </h4>
                <p className="text-xs text-gray-600 line-clamp-3">
                  {t.declining_rome_subtitle}
                </p>
              </div>
            </div>
            
            {/* Macrobius with Son */}
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-6 border-2 border-blue-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scroll className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm">
                  {t.macrobius_son_title}
                </h4>
                <p className="text-xs text-gray-600">
                  {t.macrobius_son_subtitle}
                </p>
              </div>
            </div>
            
            {/* Cosmology */}
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-6 border-2 border-green-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm">
                  {t.cosmology_title}
                </h4>
                <p className="text-xs text-gray-600">
                  {t.cosmology_subtitle}
                </p>
              </div>
            </div>
            
            {/* Message in a Bottle */}
            <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg p-6 border-2 border-purple-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm">
                  {t.message_bottle_title}
                </h4>
                <p className="text-xs text-gray-600">
                  {t.message_bottle_subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Biography Card */}
          <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t.biography.title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.biography.content}
            </p>
          </Card>

          {/* Significance Card */}
          <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mr-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{t.significance.title}</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {t.significance.content}
            </p>
          </Card>
        </div>

        {/* Major Works Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.works.title}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Saturnalia */}
            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-blue-500">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
                <h4 className="text-xl font-bold text-gray-900">{t.works.saturnalia.title}</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t.works.saturnalia.description}
              </p>
            </Card>

            {/* Commentary */}
            <Card className="p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-amber-500">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-amber-500 mr-3" />
                <h4 className="text-xl font-bold text-gray-900">{t.works.commentary.title}</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t.works.commentary.description}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

// Add default export for compatibility with index.tsx
export default IntroSection