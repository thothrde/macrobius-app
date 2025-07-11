import type { NextApiRequest, NextApiResponse } from 'next';

interface ChatRequest {
  query: string;
  language?: 'DE' | 'EN' | 'LA';
  context?: string;
}

interface Source {
  text: string;
  source: string;
  theme: string;
  similarity: number;
}

interface ChatResponse {
  response: string;
  sources: Source[];
  query: string;
  timestamp: string;
  fallback_mode: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, language = 'DE', context } = req.body as ChatRequest;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required and must be a string' });
  }

  try {
    // Try to connect to Oracle Cloud RAG system
    const oracleEndpoint = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
    
    const response = await fetch(`${oracleEndpoint}/api/rag/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        language,
        context
      }),
      signal: AbortSignal.timeout(30000), // 30 second timeout for AI processing
    });

    if (response.ok) {
      const data = await response.json();
      return res.status(200).json({
        ...data,
        fallback_mode: false
      });
    } else {
      throw new Error(`Oracle Cloud RAG responded with status ${response.status}`);
    }
  } catch (error) {
    console.error('Oracle Cloud RAG connection failed:', error);
    
    // Fallback response based on query content and language
    const fallbackResponse = generateFallbackResponse(query, language);
    
    return res.status(200).json({
      response: fallbackResponse.response,
      sources: fallbackResponse.sources,
      query,
      timestamp: new Date().toISOString(),
      fallback_mode: true
    });
  }
}

function generateFallbackResponse(query: string, language: 'DE' | 'EN' | 'LA'): { response: string; sources: Source[] } {
  const queryLower = query.toLowerCase();
  
  // Language-specific responses
  const responses = {
    DE: {
      dream: "Macrobius unterscheidet in seinem 'Commentarii in Somnium Scipionis' zwischen verschiedenen Arten von Träumen. Er folgt der Tradition Ciceros und beschreibt, wie Träume als Verbindung zwischen der physischen und geistigen Welt fungieren. Die Traumdeutung wird als Weg zur Erkenntnis höherer Wahrheiten verstanden.",
      harmony: "Die Harmonie der Sphären wird von Macrobius als mathematisches Prinzip beschrieben, das die Bewegungen der Himmelskörper regelt. Er verbindet dabei pythagoräische Zahlenlehre mit kosmologischen Vorstellungen und erklärt, wie die Planeten durch ihre Umlaufbahnen eine kosmische Musik erzeugen.",
      religion: "Macrobius zeigt große Ehrfurcht vor den traditionellen römischen Göttern und religiösen Praktiken. In den Saturnalia werden verschiedene religiöse Riten und ihre philosophischen Bedeutungen diskutiert. Er betont die Bedeutung der Religion für die Gesellschaft und das individuelle Leben.",
      soul: "Die Seele wird von Macrobius als unsterblich und göttlichen Ursprungs beschrieben. Sie durchläuft verschiedene Sphären und sammelt dabei Wissen und Reinheit. Der Aufstieg der Seele durch die Planetensphären ist ein zentrales Thema in seinem Werk über Scipios Traum.",
      banquet: "Das Gastmahl in den Saturnalia wird als ideale Umgebung für gelehrte Diskussionen dargestellt, wo Philosophie, Literatur und Wissenschaft in geselliger Atmosphäre behandelt werden. Die Teilnehmer verkörpern verschiedene Aspekte der römischen Bildung und Kultur.",
      default: "Das ist eine interessante Frage über Macrobius. Leider kann das RAG-System derzeit nicht auf die vollständige Datenbank zugreifen. Die Antwort basiert auf allgemeinem Wissen über Macrobius' Werke und Philosophie. Für detailliertere Antworten empfehle ich die anderen Funktionen der App."
    },
    EN: {
      dream: "Macrobius distinguishes in his 'Commentary on Scipio's Dream' between different types of dreams. He follows Cicero's tradition and describes how dreams function as a connection between the physical and spiritual world. Dream interpretation is understood as a path to recognizing higher truths.",
      harmony: "The harmony of the spheres is described by Macrobius as a mathematical principle that governs the movements of celestial bodies. He connects Pythagorean number theory with cosmological concepts and explains how planets create cosmic music through their orbits.",
      religion: "Macrobius shows great reverence for traditional Roman gods and religious practices. In the Saturnalia, various religious rites and their philosophical meanings are discussed. He emphasizes the importance of religion for society and individual life.",
      soul: "The soul is described by Macrobius as immortal and of divine origin. It passes through various spheres, gathering knowledge and purity along the way. The ascent of the soul through the planetary spheres is a central theme in his work on Scipio's Dream.",
      banquet: "The banquet in the Saturnalia is portrayed as an ideal environment for scholarly discussions, where philosophy, literature, and science are treated in a convivial atmosphere. The participants embody various aspects of Roman education and culture.",
      default: "That's an interesting question about Macrobius. Unfortunately, the RAG system cannot currently access the complete database. This answer is based on general knowledge of Macrobius' works and philosophy. For more detailed answers, I recommend using the other functions of the app."
    },
    LA: {
      dream: "Macrobius in 'Commentariis in Somnium Scipionis' inter varias somniorum species distinguit. Traditionem Ciceronis sequitur et describit quomodo somnia ut connexio inter mundum physicum et spiritualem fungant. Interpretatio somniorum ut via ad veritates superiores cognoscendas intelligitur.",
      harmony: "Harmonia sphaerarum a Macrobio ut principium mathematicum describitur quod motus corporum caelestium regit. Doctrinam numerorum Pythagoricam cum conceptibus cosmologicis coniungit et explicat quomodo planetae per suas orbitas musicam cosmicam creant.",
      religion: "Macrobius magnam reverentiam erga deos Romanos traditionales et practicas religiosas ostendit. In Saturnalibus varii ritus religiosi eorumque significationes philosophicae disputantur. Importantiam religionis pro societate et vita individuali emphasizat.",
      soul: "Anima a Macrobio ut immortalis et divinae originis describitur. Per varias sphaeras transit, scientiam et puritatem colligens. Ascensus animae per sphaeras planetarias thema centrale in opere eius de Somnio Scipionis est.",
      banquet: "Convivium in Saturnalibus ut ambitus idealis pro disputationibus eruditis depingitur, ubi philosophia, litterae, et scientia in atmosphaera sociali tractantur. Participantes varios aspectus educationis et culturae Romanae incarnant.",
      default: "Haec quaestio interessans de Macrobio est. Infortunate systema RAG nunc ad completam basem datorum accedere non potest. Responsio in scientia generali operum et philosophiae Macrobii fundatur. Pro responsionibus detailioribus, alias functiones app uti commendo."
    }
  };

  const langResponses = responses[language];
  
  let response = "";
  let themeUsed = "Philosophy";
  
  if (queryLower.includes('traum') || queryLower.includes('dream') || queryLower.includes('somni')) {
    response = langResponses.dream;
    themeUsed = "Dreams & Interpretation";
  } else if (queryLower.includes('harmonie') || queryLower.includes('harmony') || queryLower.includes('harmonia')) {
    response = langResponses.harmony;
    themeUsed = "Astronomy";
  } else if (queryLower.includes('religion') || queryLower.includes('götter') || queryLower.includes('religio')) {
    response = langResponses.religion;
    themeUsed = "Religious Practices";
  } else if (queryLower.includes('seele') || queryLower.includes('soul') || queryLower.includes('anima')) {
    response = langResponses.soul;
    themeUsed = "Philosophy";
  } else if (queryLower.includes('gastmahl') || queryLower.includes('banquet') || queryLower.includes('convivium')) {
    response = langResponses.banquet;
    themeUsed = "Social Customs";
  } else {
    response = langResponses.default;
    themeUsed = "General";
  }

  const sources: Source[] = [
    {
      text: "[Fallback Mode] Relevant excerpt from Macrobius' corpus",
      source: themeUsed === "Dreams & Interpretation" ? "Commentarii in Somnium Scipionis, Ch. 3" : "Saturnalia, Book I, Ch. 2",
      theme: themeUsed,
      similarity: 0.75
    }
  ];

  return { response, sources };
}