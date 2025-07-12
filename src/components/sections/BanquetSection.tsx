import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, Users, BookOpen, Clock, Crown, Scroll, Globe } from 'lucide-react';

interface BanquetSectionProps {
  isActive: boolean;
  language?: 'DE' | 'EN' | 'LA';
}

// 🚨 EMERGENCY DIRECT TRANSLATIONS - BYPASSING BROKEN CONTEXT
const DIRECT_TRANSLATIONS = {
  DE: {
    title: 'Saturnalia',
    subtitle: 'Das Gelehrte Gastmahl',
    description: 'In Macrobius\' Saturnalia treffen sich die gebildetsten Männer Roms zu einem mehrtägigen Gastmahl während der Winterfeste. Diese literarische Darstellung eines intellektuellen Symposiums bewahrt die Tradition des gelehrten Gesprächs und vermittelt uns ein einzigartiges Bild der spätantiken Bildungskultur.',
    scene_title: 'Das Gastmahl',
    participants_title: 'Die Teilnehmer',
    participant1_name: 'Vettius Agorius Praetextatus',
    participant1_role: 'Stadtpräfekt und Philosoph',
    participant1_description: 'Praetextatus war eine der bedeutendsten Gestalten der spätrömischen Elite. Als Stadtpräfekt von Rom und eingeweihter Anhänger verschiedener Mysterienkulte verkörperte er die letzte Blüte des traditionellen römischen Heidentums.',
    participant2_name: 'Virius Nicomachus Flavianus',
    participant2_role: 'Historiker und Staatsmann',
    participant2_description: 'Flavianus entstammte einer der vornehmsten Familien Roms und bekleidete höchste Staatsämter. Als Historiker und Verteidiger der traditionellen Religion führte er die intellektuelle Opposition gegen das aufstrebende Christentum an.',
    participant3_name: 'Quintus Aurelius Symmachus',
    participant3_role: 'Redner und Senator',
    participant3_description: 'Symmachus war der größte Redner seiner Generation und ein leidenschaftlicher Verteidiger der römischen Tradition. Seine Briefe und Reden geben uns heute das lebendigste Bild des aristokratischen Lebens im späten 4. Jahrhundert.',
    participant4_name: 'Servius',
    participant4_role: 'Grammatiker und Vergil-Kommentator',
    participant4_description: 'Servius war der bedeutendste Vergil-Kommentator der Antike. Seine detaillierten Erklärungen zu Vergils Werken wurden zum Standardwerk für alle folgenden Jahrhunderte.',
    participant5_name: 'Caecina Albinus',
    participant5_role: 'Gelehrter und Politiker',
    participant5_description: 'Albinus vereinte wie viele seiner Zeitgenossen politische Macht mit gelehrter Bildung. Als Mitglied der senatorischen Elite repräsentierte er das Ideal des gebildeten römischen Aristokraten.',
    context_title: 'Kultureller Kontext',
    context_description: 'Diese Männer repräsentierten die letzte Generation der klassisch gebildeten römischen Elite. In einer Zeit des Umbruchs versuchten sie, die Traditionen und das Wissen von tausend Jahren römischer Kultur zu bewahren.',
    topics_title: 'Gesprächsthemen',
    day1: 'Tag 1',
    day1_topic1: 'Vergils Dichtkunst',
    day1_topic2: 'Antike Grammatik',
    day1_topic3: 'Sprachgeschichte',
    day2: 'Tag 2',
    day2_topic1: 'Philosophie und Religion',
    day2_topic2: 'Astronomie',
    day2_topic3: 'Naturwissenschaften',
    day3: 'Tag 3',
    day3_topic1: 'Recht und Gesellschaft',
    day3_topic2: 'Geschichte Roms',
    day3_topic3: 'Kulturelle Traditionen',
    quote: '"In solchen Gesprächen zeigt sich die wahre Bildung: nicht das Anhäufen von Wissen, sondern die Kunst, es in lebendiger Diskussion zu teilen und zu vertiefen."',
    quote_attribution: 'Macrobius über die Saturnalien',
    legacy_title: 'Kulturelles Erbe',
    legacy1_title: 'Textbewahrung',
    legacy1_description: 'Die Saturnalien konservierten hunderte von Zitaten und Anekdoten aus verlorenen antiken Werken und wurden so zu einer unerschwerlich Quelle für das Verständnis der römischen Literatur.',
    legacy2_title: 'Bildungsideal',
    legacy2_description: 'Das Modell des gelehrten Gesprächs prägte die Bildungskultur des Mittelalters und der Renaissance. Von den Klosterschulen bis zu den humanistischen Akademien orientierte man sich am Vorbild der Saturnalien.',
    legacy3_title: 'Kulturvermittlung',
    legacy3_description: 'Die Verbindung von Unterhaltung und Belehrung, wie sie in den Saturnalien verwirklicht ist, wurde zum Modell für unzählige spätere Werke der Bildungsliteratur.',
    participants_detail_title: 'Teilnehmer im Detail',
    click_to_learn: 'Klicken Sie für weitere Informationen'
  },
  EN: {
    title: 'Saturnalia',
    subtitle: 'The Scholarly Banquet',
    description: 'In Macrobius\' Saturnalia, the most educated men of Rome gather for a multi-day banquet during the winter festival. This literary depiction of an intellectual symposium preserves the tradition of scholarly conversation and gives us a unique picture of late antique educational culture.',
    scene_title: 'The Banquet',
    participants_title: 'The Participants',
    participant1_name: 'Vettius Agorius Praetextatus',
    participant1_role: 'Urban Prefect and Philosopher',
    participant1_description: 'Praetextatus was one of the most significant figures of the late Roman elite. As Urban Prefect of Rome and initiated follower of various mystery cults, he embodied the last flowering of traditional Roman paganism.',
    participant2_name: 'Virius Nicomachus Flavianus',
    participant2_role: 'Historian and Statesman',
    participant2_description: 'Flavianus came from one of Rome\'s most distinguished families and held the highest state offices. As a historian and defender of traditional religion, he led the intellectual opposition against rising Christianity.',
    participant3_name: 'Quintus Aurelius Symmachus',
    participant3_role: 'Orator and Senator',
    participant3_description: 'Symmachus was the greatest orator of his generation and a passionate defender of Roman tradition. His letters and speeches give us today the most vivid picture of aristocratic life in the late 4th century.',
    participant4_name: 'Servius',
    participant4_role: 'Grammarian and Virgil Commentator',
    participant4_description: 'Servius was the most important Virgil commentator of antiquity. His detailed explanations of Virgil\'s works became the standard reference for all subsequent centuries.',
    participant5_name: 'Caecina Albinus',
    participant5_role: 'Scholar and Politician',
    participant5_description: 'Albinus, like many of his contemporaries, combined political power with scholarly education. As a member of the senatorial elite, he represented the ideal of the educated Roman aristocrat.',
    context_title: 'Cultural Context',
    context_description: 'These men represented the last generation of classically educated Roman elite. In a time of upheaval, they attempted to preserve the traditions and knowledge of a thousand years of Roman culture.',
    topics_title: 'Discussion Topics',
    day1: 'Day 1',
    day1_topic1: 'Virgil\'s Poetry',
    day1_topic2: 'Ancient Grammar',
    day1_topic3: 'History of Language',
    day2: 'Day 2',
    day2_topic1: 'Philosophy and Religion',
    day2_topic2: 'Astronomy',
    day2_topic3: 'Natural Sciences',
    day3: 'Day 3',
    day3_topic1: 'Law and Society',
    day3_topic2: 'History of Rome',
    day3_topic3: 'Cultural Traditions',
    quote: '"In such conversations true education is revealed: not the accumulation of knowledge, but the art of sharing and deepening it through living discussion."',
    quote_attribution: 'Macrobius on the Saturnalia',
    legacy_title: 'Cultural Heritage',
    legacy1_title: 'Text Preservation',
    legacy1_description: 'The Saturnalia preserved hundreds of quotations and anecdotes from lost ancient works, becoming an inexhaustible source for understanding Roman literature.',
    legacy2_title: 'Educational Ideal',
    legacy2_description: 'The model of scholarly conversation shaped the educational culture of the Middle Ages and Renaissance. From monastery schools to humanistic academies, they followed the example of the Saturnalia.',
    legacy3_title: 'Cultural Transmission',
    legacy3_description: 'The combination of entertainment and instruction, as realized in the Saturnalia, became the model for countless later works of educational literature.',
    participants_detail_title: 'Participants in Detail',
    click_to_learn: 'Click to learn more'
  },
  LA: {
    title: 'Saturnalia',
    subtitle: 'Convivium Eruditum',
    description: 'In Saturnalibus Macrobii, viri doctissimi Romae ad convivium plurium dierum tempore festivitatis hiemalis conveniunt. Haec depictio litteraria symposii intellectualis traditionem colloquii eruditi conservat et nobis imaginem singularem culturae educationis antiquitatis serae praebet.',
    scene_title: 'Convivium',
    participants_title: 'Participes',
    participant1_name: 'Vettius Agorius Praetextatus',
    participant1_role: 'Praefectus Urbanus et Philosophus',
    participant1_description: 'Praetextatus erat una ex figuris significantissimis elitae Romanae serae. Ut Praefectus Urbanus Romae et initiatus sectator variorum cultuum mysteriorum, ultimam florentiam paganismi Romani traditionalis corporabat.',
    participant2_name: 'Virius Nicomachus Flavianus',
    participant2_role: 'Historicus et Rei Publicae Vir',
    participant2_description: 'Flavianus ex una nobilissimarum familiarum Romae oriebatur et summos magistratus gerebat. Ut historicus et defensor religionis traditionalis, oppositionem intellectualem contra Christianismum crescentem ducebat.',
    participant3_name: 'Quintus Aurelius Symmachus',
    participant3_role: 'Orator et Senator',
    participant3_description: 'Symmachus erat maximus orator suae generationis et defensor vehemens traditionis Romanae. Epistulae et orationes eius nobis hodie vivissimam imaginem vitae aristocraticae saeculi quarti seri praebent.',
    participant4_name: 'Servius',
    participant4_role: 'Grammaticus et Commentator Vergilii',
    participant4_description: 'Servius erat commentator Vergilii maximi momenti antiquitatis. Explanationes eius detaillatae operum Vergilii opus standard pro omnibus saeculis sequentibus factae sunt.',
    participant5_name: 'Caecina Albinus',
    participant5_role: 'Eruditus et Politicus',
    participant5_description: 'Albinus, sicut multi aequales sui, potentiam politicam cum educatione erudita coniungebat. Ut membrum elitae senatoriae, ideal aristocratis Romani eruditi repraesentabat.',
    context_title: 'Contextus Culturalis',
    context_description: 'Hi viri ultimam generationem elitae Romanae classice educatae repraesentabant. Tempore perturbationis, traditiones et scientiam mille annorum culturae Romanae conservare tentabant.',
    topics_title: 'Themata Colloquiorum',
    day1: 'Dies I',
    day1_topic1: 'Poesis Vergilii',
    day1_topic2: 'Grammatica Antiqua',
    day1_topic3: 'Historia Linguae',
    day2: 'Dies II',
    day2_topic1: 'Philosophia et Religio',
    day2_topic2: 'Astronomia',
    day2_topic3: 'Scientiae Naturales',
    day3: 'Dies III',
    day3_topic1: 'Ius et Societas',
    day3_topic2: 'Historia Romae',
    day3_topic3: 'Traditiones Culturales',
    quote: '"In talibus colloquiis vera educatio se ostendit: non cumulatio scientiae, sed ars eam per discussionem vivam communicandi et profundandi."',
    quote_attribution: 'Macrobius de Saturnalibus',
    legacy_title: 'Hereditas Culturalis',
    legacy1_title: 'Conservatio Textuum',
    legacy1_description: 'Saturnalia centenas citationum et anecdotarum ex operibus antiquis amissis conservaverunt, fontem inexhaustum pro intellectu litterarum Romanarum facta.',
    legacy2_title: 'Ideal Educationis',
    legacy2_description: 'Exemplar colloquii eruditi culturam educationis medii aevi et Renascentiae formavit. A scholis monasticis ad academias humanisticas, exemplo Saturnalium se orientabant.',
    legacy3_title: 'Transmissio Culturalis',
    legacy3_description: 'Coniunctio oblectationis et instructionis, ut in Saturnalibus realizata est, exemplar innumerabilium operum posteriorum litteraturae educationis facta est.',
    participants_detail_title: 'Participes in Detaillis',
    click_to_learn: 'Tange ut plura discas'
  }
} as const;

function BanquetSection({ isActive, language = 'DE' }: BanquetSectionProps) {
  const t = DIRECT_TRANSLATIONS[language];
  
  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  if (!isActive) return null;

  const participants = [
    {
      name: t.participant1_name,
      role: t.participant1_role,
      description: t.participant1_description,
      icon: '🎭',
      color: 'from-purple-500/20 to-blue-500/20 border-purple-400/50'
    },
    {
      name: t.participant2_name,
      role: t.participant2_role,
      description: t.participant2_description,
      icon: '📜',
      color: 'from-blue-500/20 to-indigo-500/20 border-blue-400/50'
    },
    {
      name: t.participant3_name,
      role: t.participant3_role,
      description: t.participant3_description,
      icon: '🏭',
      color: 'from-indigo-500/20 to-purple-500/20 border-indigo-400/50'
    },
    {
      name: t.participant4_name,
      role: t.participant4_role,
      description: t.participant4_description,
      icon: '📜',
      color: 'from-green-500/20 to-emerald-500/20 border-green-400/50'
    },
    {
      name: t.participant5_name,
      role: t.participant5_role,
      description: t.participant5_description,
      icon: '🎭',
      color: 'from-amber-500/20 to-orange-500/20 border-amber-400/50'
    }
  ];

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/90 to-blue-900/90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Wine className="w-8 h-8 text-yellow-400" />
            <h1 className="text-5xl md:text-7xl font-bold text-yellow-400">
              {t.title}
            </h1>
            <Users className="w-8 h-8 text-yellow-400" />
          </div>
          
          <h2 className="text-2xl md:text-3xl text-yellow-200 mb-8">
            {t.subtitle}
          </h2>
          
          <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
          {/* Participants Section */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <Users className="w-6 h-6" />
              {t.participants_title}
            </h3>
            
            <div className="space-y-4">
              {participants.map((participant, index) => (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-r ${participant.color} rounded-lg p-4 cursor-pointer hover:scale-105 transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  onClick={() => setSelectedParticipant(selectedParticipant === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{participant.icon}</span>
                      <div>
                        <h4 className="font-semibold text-white text-lg">{participant.name}</h4>
                        <p className="text-white/80 text-sm">{participant.role}</p>
                      </div>
                    </div>
                    <Crown className="w-5 h-5 text-yellow-400/60" />
                  </div>
                  
                  <AnimatePresence>
                    {selectedParticipant === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/20"
                      >
                        <p className="text-white/90 text-sm leading-relaxed">
                          {participant.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 bg-purple-500/20 border border-purple-400/50 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t.context_title}
              </h4>
              <p className="text-white/80 text-sm leading-relaxed">
                {t.context_description}
              </p>
            </div>
          </motion.div>

          {/* Discussion Topics */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              {t.topics_title}
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  day: t.day1,
                  topics: [
                    t.day1_topic1,
                    t.day1_topic2,
                    t.day1_topic3
                  ],
                  icon: '📜',
                  color: 'from-red-500/20 to-orange-500/20 border-red-400/50'
                },
                {
                  day: t.day2, 
                  topics: [
                    t.day2_topic1,
                    t.day2_topic2,
                    t.day2_topic3
                  ],
                  icon: '🌌',
                  color: 'from-blue-500/20 to-cyan-500/20 border-blue-400/50'
                },
                {
                  day: t.day3,
                  topics: [
                    t.day3_topic1,
                    t.day3_topic2,
                    t.day3_topic3
                  ],
                  icon: '⚖️',
                  color: 'from-green-500/20 to-emerald-500/20 border-green-400/50'
                }
              ].map((day, index) => (
                <motion.div
                  key={day.day}
                  className={`bg-gradient-to-r ${day.color} rounded-lg p-4 hover:scale-105 transition-all cursor-pointer`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.2 }}
                  onClick={() => setSelectedDay(selectedDay === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{day.icon}</span>
                      <div>
                        <h4 className="font-semibold text-white text-lg">{day.day}</h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {day.topics.map((topic, topicIndex) => (
                            <span
                              key={topicIndex}
                              className="px-3 py-1 bg-white/20 text-white/90 rounded-full text-sm font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Clock className="w-5 h-5 text-yellow-400/60" />
                  </div>
                  
                  <AnimatePresence>
                    {selectedDay === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-white/20"
                      >
                        <div className="bg-white/10 rounded-lg p-4">
                          <p className="text-white/90 text-sm italic leading-relaxed mb-2">
                            {t.quote}
                          </p>
                          <p className="text-yellow-400/80 text-xs">- {t.quote_attribution}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cultural Legacy */}
        <motion.div
          className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 rounded-xl p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <h3 className="text-3xl font-bold text-yellow-400 mb-8 text-center flex items-center justify-center gap-3">
            <Scroll className="w-8 h-8" />
            {t.legacy_title}
            <Scroll className="w-8 h-8" />
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📜',
                title: t.legacy1_title,
                description: t.legacy1_description,
                color: 'from-blue-500/20 to-indigo-500/20 border-blue-400/50'
              },
              {
                icon: '🎓',
                title: t.legacy2_title,
                description: t.legacy2_description,
                color: 'from-purple-500/20 to-pink-500/20 border-purple-400/50'
              },
              {
                icon: '🌍',
                title: t.legacy3_title,
                description: t.legacy3_description,
                color: 'from-green-500/20 to-emerald-500/20 border-green-400/50'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${item.color} rounded-lg p-6 text-center hover:scale-105 transition-all duration-300`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="font-semibold text-yellow-400 mb-3 text-lg">{item.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default BanquetSection;