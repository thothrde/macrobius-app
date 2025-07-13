import type { NextApiRequest, NextApiResponse } from 'next';

interface RAGGenerateRequest {
  query: string;
  documents: Array<{
    id: string;
    text: string;
    metadata?: any;
    similarity_score?: number;
  }>;
  language?: 'DE' | 'EN' | 'LA';
  responseStyle?: 'academic' | 'conversational' | 'educational';
  maxLength?: number;
  includeCitations?: boolean;
}

interface RAGGenerateResponse {
  status: 'success' | 'error';
  data?: {
    generated_response: string;
    confidence_score: number;
    citations: Array<{
      document_id: string;
      relevance: number;
      excerpt: string;
      source_reference: string;
    }>;
    response_metadata: {
      style: string;
      language: string;
      word_count: number;
      generation_time_ms: number;
      oracle_cloud_status: 'connected' | 'fallback';
    };
  };
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RAGGenerateResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed. Use POST.' 
    });
  }

  const startTime = performance.now();
  const { 
    query, 
    documents, 
    language = 'EN',
    responseStyle = 'educational',
    maxLength = 500,
    includeCitations = true
  } = req.body as RAGGenerateRequest;

  // Validate input
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Query is required and must be a non-empty string'
    });
  }

  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Documents array is required and must contain at least one document'
    });
  }

  if (maxLength > 2000) {
    return res.status(400).json({
      status: 'error',
      message: 'Maximum response length cannot exceed 2000 characters'
    });
  }

  try {
    // Connect to Oracle Cloud backend for response generation
    const oracleEndpoint = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
    
    const response = await fetch(`${oracleEndpoint}/api/rag/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Client-Version': '2.0',
        'X-Request-Source': 'macrobius-frontend'
      },
      body: JSON.stringify({
        query: query.trim(),
        documents,
        language,
        response_style: responseStyle,
        max_length: maxLength,
        include_citations: includeCitations
      }),
      signal: AbortSignal.timeout(25000) // 25 second timeout for generation
    });

    if (response.ok) {
      const oracleData = await response.json();
      const generationTime = performance.now() - startTime;
      
      return res.status(200).json({
        status: 'success',
        data: {
          generated_response: oracleData.generated_response || oracleData.response || 'Response generated successfully',
          confidence_score: oracleData.confidence_score || oracleData.confidence || 0.85,
          citations: (oracleData.citations || []).map((citation: any, index: number) => ({
            document_id: citation.document_id || citation.id || `doc_${index}`,
            relevance: citation.relevance || citation.score || 0.8,
            excerpt: citation.excerpt || citation.text || citation.snippet || '',
            source_reference: citation.source_reference || citation.reference || `Document ${index + 1}`
          })),
          response_metadata: {
            style: responseStyle,
            language,
            word_count: (oracleData.generated_response || oracleData.response || '').split(' ').length,
            generation_time_ms: Math.round(generationTime),
            oracle_cloud_status: 'connected' as const
          }
        }
      });
    } else {
      throw new Error(`Oracle Cloud responded with status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Oracle Cloud RAG generation failed:', error);
    
    // Generate intelligent fallback response
    const fallbackResult = generateIntelligentResponse(query, documents, language, responseStyle);
    const generationTime = performance.now() - startTime;
    
    return res.status(200).json({
      status: 'success',
      data: {
        generated_response: fallbackResult.response,
        confidence_score: fallbackResult.confidence,
        citations: fallbackResult.citations,
        response_metadata: {
          style: responseStyle,
          language,
          word_count: fallbackResult.response.split(' ').length,
          generation_time_ms: Math.round(generationTime),
          oracle_cloud_status: 'fallback' as const
        }
      }
    });
  }
}

function generateIntelligentResponse(
  query: string, 
  documents: any[], 
  language: 'DE' | 'EN' | 'LA',
  style: string
) {
  const queryLower = query.toLowerCase();
  
  // Analyze query to determine appropriate response approach
  let responseTemplate = '';
  let topicFocus = 'general';
  
  if (/what|was|wie|quid|quomodo/i.test(query)) {
    topicFocus = 'explanation';
  } else if (/why|warum|cur|quare/i.test(query)) {
    topicFocus = 'reasoning';
  } else if (/how|wie|quomodo/i.test(query)) {
    topicFocus = 'process';
  } else if (/compare|vergleich|differ/i.test(query)) {
    topicFocus = 'comparison';
  }
  
  // Extract themes from documents
  const themes = new Set<string>();
  const works = new Set<string>();
  let contextSentences: string[] = [];
  
  documents.forEach(doc => {
    if (doc.metadata?.cultural_theme) themes.add(doc.metadata.cultural_theme);
    if (doc.metadata?.work_type) works.add(doc.metadata.work_type);
    if (doc.text && doc.text.length > 10) {
      contextSentences.push(doc.text.substring(0, 100) + (doc.text.length > 100 ? '...' : ''));
    }
  });
  
  // Language-specific response generation
  const responseTemplates = {
    DE: {
      explanation: `Basierend auf den Schriften des Macrobius ${contextSentences.length > 0 ? 'und den relevanten Textpassagen' : ''}, lässt sich folgendes sagen: `,
      reasoning: `Macrobius erklärt dies durch seine tiefe Verbindung zur neuplatonischen Philosophie. In seinen Werken ${Array.from(works).join(' und ')} zeigt er, dass `,
      process: `Der Prozess, den Macrobius beschreibt, folgt einem klaren philosophischen Schema. ${themes.size > 0 ? `Besonders in den Bereichen ${Array.from(themes).join(', ')} ` : ''}`,
      comparison: `Macrobius' Ansatz unterscheidet sich von anderen antiken Autoren durch seine einzigartige Synthese. `,
      general: `Aus der Analyse der Macrobius-Texte ${contextSentences.length > 0 ? 'und der gefundenen Passagen' : ''} ergibt sich: `
    },
    EN: {
      explanation: `Based on Macrobius's writings ${contextSentences.length > 0 ? 'and the relevant textual passages' : ''}, we can understand that `,
      reasoning: `Macrobius explains this through his deep connection to Neoplatonic philosophy. In his works ${Array.from(works).join(' and ')}, he demonstrates that `,
      process: `The process described by Macrobius follows a clear philosophical schema. ${themes.size > 0 ? `Particularly in the areas of ${Array.from(themes).join(', ')}, ` : ''}`,
      comparison: `Macrobius's approach differs from other ancient authors through his unique synthesis. `,
      general: `From the analysis of Macrobius texts ${contextSentences.length > 0 ? 'and the found passages' : ''}, it emerges that: `
    },
    LA: {
      explanation: `Ex scriptis Macrobii ${contextSentences.length > 0 ? 'et locis textualibus pertinentibus' : ''} intelligere possumus quod `,
      reasoning: `Macrobius hoc per profundam connexionem suam cum philosophia Neoplatonica explicat. In operibus suis ${Array.from(works).join(' et ')}, demonstrat quod `,
      process: `Processus quem Macrobius describit schema philosophicum clarum sequitur. ${themes.size > 0 ? `Praecipue in rebus ${Array.from(themes).join(', ')}, ` : ''}`,
      comparison: `Macrobii ratio ab aliis auctoribus antiquis per synthesin unicam differt. `,
      general: `Ex analysi textuum Macrobii ${contextSentences.length > 0 ? 'et passuum inventorum' : ''} apparet: `
    }
  };
  
  const langTemplates = responseTemplates[language];
  const openingSentence = langTemplates[topicFocus as keyof typeof langTemplates] || langTemplates.general;
  
  // Generate substantive content based on document themes
  let mainContent = '';
  if (themes.has('Dreams & Interpretation')) {
    const dreamContent = {
      DE: 'die verschiedenen Arten von Träumen und ihre Bedeutung für die Seelenwanderung eine zentrale Rolle spielen. Macrobius folgt der platonischen Tradition, wonach Träume als Verbindung zwischen physischer und geistiger Welt verstanden werden.',
      EN: 'the various types of dreams and their significance for the soul\'s journey play a central role. Macrobius follows the Platonic tradition, whereby dreams are understood as a connection between the physical and spiritual world.',
      LA: 'varia genera somniorum eorumque significatio pro itinere animae partem centralem ludunt. Macrobius traditionem Platonicam sequitur, qua somnia ut connexio inter mundum physicum et spiritualem intelliguntur.'
    };
    mainContent = dreamContent[language];
  } else if (themes.has('Social Customs')) {
    const socialContent = {
      DE: 'das ideale römische Gastmahl als Ort der gelehrten Diskussion und kulturellen Bildung verstanden wird. Die Saturnalia zeigen, wie Wissen und Geselligkeit in harmonischer Weise verbunden werden können.',
      EN: 'the ideal Roman banquet is understood as a place of scholarly discussion and cultural education. The Saturnalia show how knowledge and sociability can be harmoniously combined.',
      LA: 'convivium Romanum ideale ut locus disputationis eruditae et educationis culturalis intelligitur. Saturnalia ostendunt quomodo scientia et sociabilitas harmonice coniungi possint.'
    };
    mainContent = socialContent[language];
  } else {
    const generalContent = {
      DE: 'die Verbindung von antiker Weisheit und praktischer Anwendung im Zentrum steht. Macrobius zeigt, wie philosophische Erkenntnisse in das tägliche Leben integriert werden können.',
      EN: 'the connection between ancient wisdom and practical application is central. Macrobius shows how philosophical insights can be integrated into daily life.',
      LA: 'connexio inter sapientiam antiquam et applicationem practicam centralis est. Macrobius ostendit quomodo perspicaciae philosophicae in vitam quotidianam integrari possint.'
    };
    mainContent = generalContent[language];
  }
  
  const fullResponse = openingSentence + mainContent;
  
  // Generate citations
  const citations = documents.slice(0, 3).map((doc, index) => ({
    document_id: doc.id,
    relevance: doc.similarity_score || (0.9 - index * 0.1),
    excerpt: doc.text ? doc.text.substring(0, 80) + '...' : 'Relevant excerpt from Macrobius corpus',
    source_reference: doc.metadata?.work_type 
      ? `${doc.metadata.work_type}, Book ${doc.metadata?.book_number || 1}` 
      : 'Macrobius Corpus'
  }));
  
  return {
    response: fullResponse,
    confidence: contextSentences.length > 0 ? 0.75 : 0.65, // Higher confidence with real documents
    citations
  };
}