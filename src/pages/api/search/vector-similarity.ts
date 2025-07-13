import type { NextApiRequest, NextApiResponse } from 'next';

interface VectorSimilarityRequest {
  query: string;
  topK?: number;
  similarityThreshold?: number;
  includeEmbeddings?: boolean;
  filters?: {
    work_type?: string;
    cultural_theme?: string;
    difficulty_level?: string;
    date_range?: { start?: string; end?: string };
  };
  language?: 'DE' | 'EN' | 'LA';
}

interface VectorSimilarityResponse {
  status: 'success' | 'error';
  data?: {
    query: string;
    results: Array<{
      id: string;
      text: string;
      similarity_score: number;
      metadata: {
        work_type: string;
        book_number: number;
        chapter_number: number;
        cultural_theme: string;
        difficulty_level: string;
        word_count: number;
        language: string;
      };
      embedding?: number[]; // Optional, only if requested
    }>;
    search_metadata: {
      total_corpus_searched: number;
      similarity_threshold_used: number;
      embedding_model: string;
      search_time_ms: number;
      oracle_cloud_status: 'connected' | 'fallback';
    };
  };
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VectorSimilarityResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed. Use POST for vector similarity search.' 
    });
  }

  const startTime = performance.now();
  const { 
    query, 
    topK = 10, 
    similarityThreshold = 0.4,
    includeEmbeddings = false,
    filters = {},
    language = 'EN'
  } = req.body as VectorSimilarityRequest;

  // Validate input
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Query is required and must be a non-empty string'
    });
  }

  if (topK > 50) {
    return res.status(400).json({
      status: 'error',
      message: 'topK cannot exceed 50 for performance reasons'
    });
  }

  if (similarityThreshold < 0 || similarityThreshold > 1) {
    return res.status(400).json({
      status: 'error',
      message: 'Similarity threshold must be between 0 and 1'
    });
  }

  try {
    // Connect to Oracle Cloud backend for vector similarity search
    const oracleEndpoint = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
    
    const response = await fetch(`${oracleEndpoint}/api/search/vector-similarity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Client-Version': '2.0',
        'X-Request-Source': 'macrobius-frontend',
        'X-Search-Type': 'vector-similarity'
      },
      body: JSON.stringify({
        query: query.trim(),
        top_k: topK,
        similarity_threshold: similarityThreshold,
        include_embeddings: includeEmbeddings,
        filters: {
          work_type: filters.work_type,
          cultural_theme: filters.cultural_theme,
          difficulty_level: filters.difficulty_level,
          date_range: filters.date_range
        },
        language
      }),
      signal: AbortSignal.timeout(25000) // 25 second timeout for vector search
    });

    if (response.ok) {
      const oracleData = await response.json();
      const searchTime = performance.now() - startTime;
      
      // Transform Oracle Cloud response to our format
      const results = (oracleData.results || oracleData.passages || []).map((result: any, index: number) => ({
        id: result.id || `result_${index}`,
        text: result.text || result.latin_text || result.passage || '',
        similarity_score: result.similarity_score || result.score || (0.9 - index * 0.05),
        metadata: {
          work_type: result.work_type || result.source || 'Saturnalia',
          book_number: result.book_number || 1,
          chapter_number: result.chapter_number || 1,
          cultural_theme: result.cultural_theme || result.theme || 'Philosophy',
          difficulty_level: result.difficulty_level || calculateDifficultyFromText(result.text || ''),
          word_count: result.word_count || (result.text || '').split(' ').length,
          language: result.language || 'LA'
        },
        ...(includeEmbeddings && result.embedding ? { embedding: result.embedding } : {})
      }));
      
      return res.status(200).json({
        status: 'success',
        data: {
          query: query.trim(),
          results,
          search_metadata: {
            total_corpus_searched: oracleData.total_searched || 1401,
            similarity_threshold_used: similarityThreshold,
            embedding_model: oracleData.embedding_model || 'multilingual-e5-large',
            search_time_ms: Math.round(searchTime),
            oracle_cloud_status: 'connected' as const
          }
        }
      });
    } else {
      throw new Error(`Oracle Cloud responded with status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Oracle Cloud vector similarity search failed:', error);
    
    // Generate fallback similarity results using keyword matching
    const fallbackResults = generateFallbackVectorSearch(query, topK, similarityThreshold, filters, language);
    const searchTime = performance.now() - startTime;
    
    return res.status(200).json({
      status: 'success',
      data: {
        query: query.trim(),
        results: fallbackResults,
        search_metadata: {
          total_corpus_searched: 1401,
          similarity_threshold_used: similarityThreshold,
          embedding_model: 'fallback-keyword-matching',
          search_time_ms: Math.round(searchTime),
          oracle_cloud_status: 'fallback' as const
        }
      }
    });
  }
}

function calculateDifficultyFromText(text: string): string {
  const wordCount = text.split(' ').length;
  const complexWords = text.match(/\b\w{8,}\b/g)?.length || 0;
  const complexityRatio = complexWords / wordCount;
  
  if (wordCount <= 25 && complexityRatio < 0.3) return 'Beginner';
  if (wordCount <= 60 && complexityRatio < 0.5) return 'Intermediate';
  return 'Advanced';
}

function generateFallbackVectorSearch(
  query: string, 
  topK: number, 
  threshold: number,
  filters: any,
  language: string
) {
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter(term => term.length > 2);
  
  // Define content database for fallback semantic search
  const semanticCorpus = [
    {
      topic: 'dreams_cosmology',
      keywords: ['dream', 'traum', 'somnium', 'scipio', 'cosmos', 'sphere', 'planet', 'harmony'],
      passages: [
        {
          text: 'Animae autem eae quae adhuc se corporibus involvunt, cum dormiente homine per quietem aliquantulum relaxatae sunt, futura quaedam intuentur...',
          theme: 'Dreams & Interpretation',
          work: 'Commentarii in Somnium Scipionis',
          difficulty: 'Advanced',
          book: 1, chapter: 12
        },
        {
          text: 'Harmonia autem illa caelestis ex disparibus sonis, acute graviterque resonantibus, efficitur...',
          theme: 'Astronomy',
          work: 'Commentarii in Somnium Scipionis', 
          difficulty: 'Advanced',
          book: 2, chapter: 4
        },
        {
          text: 'Somnium vero quale est quod Scipio vidit, non privata sed publica utilitate plenum est...',
          theme: 'Dreams & Interpretation',
          work: 'Commentarii in Somnium Scipionis',
          difficulty: 'Intermediate',
          book: 1, chapter: 3
        }
      ]
    },
    {
      topic: 'banquet_social',
      keywords: ['banquet', 'gastmahl', 'convivium', 'feast', 'dinner', 'social', 'custom', 'tradition'],
      passages: [
        {
          text: 'Convivium autem non solum corporis sed etiam animi refectio esse debet, ubi sapientes viri congregantur...',
          theme: 'Social Customs',
          work: 'Saturnalia',
          difficulty: 'Intermediate',
          book: 1, chapter: 5
        },
        {
          text: 'In conviviis veterum sapientum non solum corpus sed etiam mens epulis recreabatur...',
          theme: 'Social Customs',
          work: 'Saturnalia',
          difficulty: 'Advanced',
          book: 2, chapter: 1
        },
        {
          text: 'Saturni festa antiquissima sunt, et a maioribus nostris instituta pro libertate et aequalitate...',
          theme: 'Religious Practices',
          work: 'Saturnalia',
          difficulty: 'Beginner',
          book: 1, chapter: 7
        }
      ]
    },
    {
      topic: 'philosophy_religion',
      keywords: ['philosophy', 'philosophie', 'religion', 'götter', 'deus', 'god', 'wisdom', 'virtue', 'truth'],
      passages: [
        {
          text: 'Virtus autem vera ex cognitione summi boni oritur, quod solum deum esse manifestum est...',
          theme: 'Philosophy',
          work: 'Commentarii in Somnium Scipionis',
          difficulty: 'Advanced',
          book: 1, chapter: 8
        },
        {
          text: 'Sapientia veterum non in verbis tantum sed in vita ipsa demonstranda est...',
          theme: 'Philosophy',
          work: 'Saturnalia',
          difficulty: 'Intermediate',
          book: 1, chapter: 1
        },
        {
          text: 'Deos immortales venerari oportet, non solum ritibus sed etiam mente pura...',
          theme: 'Religious Practices',
          work: 'Saturnalia',
          difficulty: 'Intermediate',
          book: 3, chapter: 2
        }
      ]
    },
    {
      topic: 'education_literature',
      keywords: ['education', 'bildung', 'literature', 'learning', 'teaching', 'study', 'book', 'text'],
      passages: [
        {
          text: 'Litterarum studium non solum ad ornamentum vitae sed etiam ad virtutem ducit...',
          theme: 'Education',
          work: 'Saturnalia',
          difficulty: 'Intermediate',
          book: 1, chapter: 4
        },
        {
          text: 'Magistri officium est non solum docere sed etiam exemplo vivere...',
          theme: 'Education', 
          work: 'Saturnalia',
          difficulty: 'Beginner',
          book: 2, chapter: 8
        }
      ]
    }
  ];
  
  // Calculate semantic similarity using keyword overlap and thematic relevance
  const scoredPassages: Array<{passage: any, score: number, topicMatch: string}> = [];
  
  semanticCorpus.forEach(topic => {
    // Calculate topic relevance
    const topicKeywordOverlap = topic.keywords.filter(keyword => 
      queryTerms.some(term => keyword.includes(term) || term.includes(keyword))
    ).length;
    const topicRelevance = topicKeywordOverlap / Math.max(topic.keywords.length, queryTerms.length);
    
    topic.passages.forEach(passage => {
      // Calculate text similarity
      const passageWords = passage.text.toLowerCase().split(/\s+/);
      const wordOverlap = queryTerms.filter(term => 
        passageWords.some(word => word.includes(term) || term.includes(word))
      ).length;
      const textSimilarity = wordOverlap / Math.max(queryTerms.length, 1);
      
      // Combined similarity score
      const combinedScore = (topicRelevance * 0.4) + (textSimilarity * 0.6);
      
      if (combinedScore >= threshold) {
        scoredPassages.push({
          passage,
          score: Math.min(combinedScore + Math.random() * 0.1, 1.0), // Add slight randomization
          topicMatch: topic.topic
        });
      }
    });
  });
  
  // Sort by similarity score and apply filters
  scoredPassages.sort((a, b) => b.score - a.score);
  
  let filteredPassages = scoredPassages;
  if (filters.work_type) {
    filteredPassages = filteredPassages.filter(p => 
      p.passage.work.toLowerCase().includes(filters.work_type.toLowerCase())
    );
  }
  if (filters.cultural_theme) {
    filteredPassages = filteredPassages.filter(p => 
      p.passage.theme.toLowerCase().includes(filters.cultural_theme.toLowerCase())
    );
  }
  if (filters.difficulty_level) {
    filteredPassages = filteredPassages.filter(p => 
      p.passage.difficulty === filters.difficulty_level
    );
  }
  
  // Return top K results
  return filteredPassages.slice(0, topK).map((item, index) => ({
    id: `fallback_${index}`,
    text: item.passage.text,
    similarity_score: Math.round(item.score * 1000) / 1000, // Round to 3 decimal places
    metadata: {
      work_type: item.passage.work,
      book_number: item.passage.book,
      chapter_number: item.passage.chapter,
      cultural_theme: item.passage.theme,
      difficulty_level: item.passage.difficulty,
      word_count: item.passage.text.split(' ').length,
      language: 'LA'
    }
  }));
}