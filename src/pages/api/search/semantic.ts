import type { NextApiRequest, NextApiResponse } from 'next';

interface SemanticSearchRequest {
  query: string;
  searchType?: 'passages' | 'concepts' | 'themes' | 'all';
  filters?: {
    work_type?: string;
    cultural_theme?: string;
    difficulty_level?: string;
    book_number?: number;
    chapter_number?: number;
    language?: string;
  };
  sortBy?: 'relevance' | 'similarity' | 'date' | 'difficulty';
  sortOrder?: 'desc' | 'asc';
  limit?: number;
  offset?: number;
  includeContext?: boolean;
  expandQuery?: boolean;
}

interface SemanticSearchResponse {
  status: 'success' | 'error';
  data?: {
    query: {
      original: string;
      expanded?: string[];
      semantic_concepts: string[];
    };
    results: {
      passages: Array<{
        id: string;
        text: string;
        similarity_score: number;
        relevance_rank: number;
        metadata: {
          work_type: string;
          book_number: number;
          chapter_number: number;
          section_number?: number;
          cultural_theme: string;
          difficulty_level: string;
          word_count: number;
          context_before?: string;
          context_after?: string;
        };
        highlights: string[];
        semantic_tags: string[];
      }>;
      themes: Array<{
        name: string;
        relevance_score: number;
        passage_count: number;
        related_concepts: string[];
      }>;
      concepts: Array<{
        concept: string;
        frequency: number;
        related_passages: string[];
        semantic_weight: number;
      }>;
    };
    search_metadata: {
      total_results: number;
      search_time_ms: number;
      query_complexity: string;
      semantic_model_used: string;
      oracle_cloud_status: 'connected' | 'fallback';
    };
  };
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SemanticSearchResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed. Use POST for semantic search.' 
    });
  }

  const startTime = performance.now();
  const { 
    query, 
    searchType = 'all',
    filters = {},
    sortBy = 'relevance',
    sortOrder = 'desc',
    limit = 10,
    offset = 0,
    includeContext = true,
    expandQuery = true
  } = req.body as SemanticSearchRequest;

  // Validate input
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Query is required and must be a non-empty string'
    });
  }

  if (limit > 50) {
    return res.status(400).json({
      status: 'error',
      message: 'Limit cannot exceed 50 for performance reasons'
    });
  }

  if (!['passages', 'concepts', 'themes', 'all'].includes(searchType)) {
    return res.status(400).json({
      status: 'error',
      message: 'searchType must be one of: passages, concepts, themes, all'
    });
  }

  try {
    // Connect to Oracle Cloud backend for semantic search
    const oracleEndpoint = process.env.ORACLE_CLOUD_ENDPOINT || 'http://152.70.184.232:8080';
    
    const response = await fetch(`${oracleEndpoint}/api/search/semantic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Client-Version': '2.0',
        'X-Request-Source': 'macrobius-frontend',
        'X-Search-Type': 'semantic'
      },
      body: JSON.stringify({
        query: query.trim(),
        search_type: searchType,
        filters: {
          work_type: filters.work_type,
          cultural_theme: filters.cultural_theme,
          difficulty_level: filters.difficulty_level,
          book_number: filters.book_number,
          chapter_number: filters.chapter_number,
          language: filters.language
        },
        sort_by: sortBy,
        sort_order: sortOrder,
        limit,
        offset,
        include_context: includeContext,
        expand_query: expandQuery
      }),
      signal: AbortSignal.timeout(30000) // 30 second timeout for complex semantic search
    });

    if (response.ok) {
      const oracleData = await response.json();
      const searchTime = performance.now() - startTime;
      
      // Transform Oracle Cloud response to our format
      const transformedData = {
        query: {
          original: query.trim(),
          expanded: oracleData.expanded_query || [],
          semantic_concepts: oracleData.semantic_concepts || extractSemanticConcepts(query)
        },
        results: {
          passages: (oracleData.passages || []).map((passage: any, index: number) => ({
            id: passage.id || `passage_${index}`,
            text: passage.text || passage.latin_text || '',
            similarity_score: passage.similarity_score || passage.score || (0.9 - index * 0.05),
            relevance_rank: passage.relevance_rank || index + 1,
            metadata: {
              work_type: passage.work_type || 'Saturnalia',
              book_number: passage.book_number || 1,
              chapter_number: passage.chapter_number || 1,
              section_number: passage.section_number,
              cultural_theme: passage.cultural_theme || 'Philosophy',
              difficulty_level: passage.difficulty_level || 'Intermediate',
              word_count: passage.word_count || (passage.text || '').split(' ').length,
              context_before: includeContext ? passage.context_before : undefined,
              context_after: includeContext ? passage.context_after : undefined
            },
            highlights: passage.highlights || [],
            semantic_tags: passage.semantic_tags || []
          })),
          themes: (oracleData.themes || []).map((theme: any) => ({
            name: theme.name || theme.theme,
            relevance_score: theme.relevance_score || theme.score || 0.8,
            passage_count: theme.passage_count || 0,
            related_concepts: theme.related_concepts || []
          })),
          concepts: (oracleData.concepts || []).map((concept: any) => ({
            concept: concept.concept || concept.name,
            frequency: concept.frequency || 1,
            related_passages: concept.related_passages || [],
            semantic_weight: concept.semantic_weight || concept.weight || 0.5
          }))
        },
        search_metadata: {
          total_results: oracleData.total_results || oracleData.total || 0,
          search_time_ms: Math.round(searchTime),
          query_complexity: analyzeQueryComplexity(query),
          semantic_model_used: oracleData.model_used || 'multilingual-semantic-e5',
          oracle_cloud_status: 'connected' as const
        }
      };
      
      return res.status(200).json({
        status: 'success',
        data: transformedData
      });
    } else {
      throw new Error(`Oracle Cloud responded with status ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Oracle Cloud semantic search failed:', error);
    
    // Generate intelligent fallback semantic search
    const fallbackResults = generateFallbackSemanticSearch(
      query, searchType, filters, sortBy, sortOrder, limit, offset, includeContext, expandQuery
    );
    const searchTime = performance.now() - startTime;
    
    return res.status(200).json({
      status: 'success',
      data: {
        query: {
          original: query.trim(),
          expanded: fallbackResults.expandedQuery,
          semantic_concepts: extractSemanticConcepts(query)
        },
        results: fallbackResults.results,
        search_metadata: {
          total_results: fallbackResults.results.passages.length,
          search_time_ms: Math.round(searchTime),
          query_complexity: analyzeQueryComplexity(query),
          semantic_model_used: 'fallback-keyword-semantic',
          oracle_cloud_status: 'fallback' as const
        }
      }
    });
  }
}

function extractSemanticConcepts(query: string): string[] {
  const queryLower = query.toLowerCase();
  const concepts: string[] = [];
  
  // Map query terms to semantic concepts
  const conceptMappings = {
    'dream': ['oneirology', 'prophecy', 'spiritual vision', 'divine communication'],
    'banquet': ['symposium', 'social gathering', 'intellectual discourse', 'cultural exchange'],
    'philosophy': ['wisdom', 'metaphysics', 'ethics', 'epistemology', 'neoplatonism'],
    'religion': ['theology', 'divine worship', 'ritual practice', 'sacred tradition'],
    'cosmos': ['cosmology', 'astronomy', 'celestial harmony', 'universal order'],
    'music': ['harmonic theory', 'mathematical proportion', 'celestial music'],
    'soul': ['psyche', 'immortality', 'spiritual ascent', 'divine nature'],
    'virtue': ['moral excellence', 'ethical behavior', 'character development'],
    'wisdom': ['sophia', 'philosophical insight', 'divine knowledge']
  };
  
  Object.entries(conceptMappings).forEach(([key, values]) => {
    if (queryLower.includes(key)) {
      concepts.push(...values);
    }
  });
  
  return concepts.slice(0, 5); // Limit to top 5 concepts
}

function analyzeQueryComplexity(query: string): string {
  const wordCount = query.split(' ').length;
  const hasSpecialTerms = /\b(how|why|what|when|where|compare|analyze|explain|describe)\b/i.test(query);
  const hasComplexStructure = query.includes('?') || query.includes(';') || query.includes(',');
  
  if (wordCount <= 3 && !hasSpecialTerms) return 'simple';
  if (wordCount <= 8 && (hasSpecialTerms || hasComplexStructure)) return 'moderate';
  return 'complex';
}

function generateFallbackSemanticSearch(
  query: string,
  searchType: string,
  filters: any,
  sortBy: string,
  sortOrder: string,
  limit: number,
  offset: number,
  includeContext: boolean,
  expandQuery: boolean
) {
  const queryLower = query.toLowerCase();
  const semanticDatabase = {
    passages: [
      {
        id: 'sem_1',
        text: 'Animae autem eae quae adhuc se corporibus involvunt, cum dormiente homine per quietem aliquantulum relaxatae sunt, futura quaedam intuentur, sed non libere nec expedite, propter reliquias corporearum perturbationum.',
        theme: 'Dreams & Interpretation',
        work: 'Commentarii in Somnium Scipionis',
        book: 1, chapter: 12, section: 3,
        difficulty: 'Advanced',
        concepts: ['soul', 'dreams', 'prophecy', 'spiritual vision'],
        context_before: 'De variis somniorum generibus Macrobius disputat...',
        context_after: 'Haec est causa cur non omnia somnia vera sunt...'
      },
      {
        id: 'sem_2', 
        text: 'Convivium autem non solum corporis sed etiam animi refectio esse debet, ubi sapientes viri congregantur ad communem sapientiae participationem.',
        theme: 'Social Customs',
        work: 'Saturnalia',
        book: 1, chapter: 5, section: 1,
        difficulty: 'Intermediate',
        concepts: ['banquet', 'wisdom', 'social gathering', 'intellectual discourse'],
        context_before: 'De more convivandi apud veteres...',
        context_after: 'Sic enim fit ut et corpus et animus simul reficiantur...'
      },
      {
        id: 'sem_3',
        text: 'Harmonia autem illa caelestis ex disparibus sonis, acute graviterque resonantibus, efficitur, quae planetarum motibus disparibus, sed tamen pro rata distributis, concinnitur.',
        theme: 'Astronomy',
        work: 'Commentarii in Somnium Scipionis',
        book: 2, chapter: 4, section: 2,
        difficulty: 'Advanced',
        concepts: ['cosmic harmony', 'celestial music', 'planetary motion', 'mathematical proportion'],
        context_before: 'De harmonia sphaerarum et musica mundana...',
        context_after: 'Haec est illa musica quam sapienti soli audire datum est...'
      },
      {
        id: 'sem_4',
        text: 'Virtus autem vera ex cognitione summi boni oritur, quod solum deum esse manifestum est omnibus qui rectam rationem sequuntur.',
        theme: 'Philosophy', 
        work: 'Commentarii in Somnium Scipionis',
        book: 1, chapter: 8, section: 5,
        difficulty: 'Advanced',
        concepts: ['virtue', 'supreme good', 'divine nature', 'rational thought'],
        context_before: 'De virtutibus et summo bono disputatio...',
        context_after: 'Hoc est finem ultimum sapientiae...'
      },
      {
        id: 'sem_5',
        text: 'Saturni festa antiquissima sunt, et a maioribus nostris instituta pro libertate et aequalitate quae inter omnes homines esse debet.',
        theme: 'Religious Practices',
        work: 'Saturnalia',
        book: 1, chapter: 7, section: 2,
        difficulty: 'Beginner',
        concepts: ['religious festival', 'equality', 'social tradition', 'ancient custom'],
        context_before: 'De origine festorum Saturni...',
        context_after: 'Haec est causa cur in his festis domini servis ministrant...'
      }
    ],
    themes: [
      { name: 'Dreams & Interpretation', concepts: ['prophecy', 'spiritual vision', 'divine communication'] },
      { name: 'Social Customs', concepts: ['banquet', 'social gathering', 'cultural exchange'] },
      { name: 'Astronomy', concepts: ['cosmic harmony', 'celestial music', 'planetary motion'] },
      { name: 'Philosophy', concepts: ['wisdom', 'virtue', 'supreme good', 'neoplatonism'] },
      { name: 'Religious Practices', concepts: ['divine worship', 'ritual practice', 'sacred tradition'] }
    ]
  };
  
  // Semantic matching based on concepts and themes
  const queryTerms = queryLower.split(/\s+/).filter(term => term.length > 2);
  const queryConcepts = extractSemanticConcepts(query);
  
  // Score passages based on semantic relevance
  const scoredPassages = semanticDatabase.passages.map(passage => {
    let score = 0;
    
    // Direct text matching
    const textScore = queryTerms.filter(term => 
      passage.text.toLowerCase().includes(term)
    ).length / Math.max(queryTerms.length, 1);
    
    // Concept matching
    const conceptScore = passage.concepts.filter(concept => 
      queryConcepts.some(qc => qc.includes(concept.toLowerCase()) || concept.toLowerCase().includes(qc))
    ).length / Math.max(passage.concepts.length, 1);
    
    // Theme relevance
    const themeScore = queryLower.includes(passage.theme.toLowerCase()) ? 0.3 : 0;
    
    score = (textScore * 0.4) + (conceptScore * 0.4) + (themeScore * 0.2);
    
    return { ...passage, similarity_score: Math.min(score + Math.random() * 0.1, 1.0) };
  });
  
  // Apply filters
  let filteredPassages = scoredPassages.filter(p => p.similarity_score > 0.1);
  
  if (filters.work_type) {
    filteredPassages = filteredPassages.filter(p => 
      p.work.toLowerCase().includes(filters.work_type.toLowerCase())
    );
  }
  if (filters.cultural_theme) {
    filteredPassages = filteredPassages.filter(p => 
      p.theme.toLowerCase().includes(filters.cultural_theme.toLowerCase())
    );
  }
  if (filters.difficulty_level) {
    filteredPassages = filteredPassages.filter(p => p.difficulty === filters.difficulty_level);
  }
  
  // Sort results
  if (sortBy === 'relevance' || sortBy === 'similarity') {
    filteredPassages.sort((a, b) => sortOrder === 'desc' ? b.similarity_score - a.similarity_score : a.similarity_score - b.similarity_score);
  } else if (sortBy === 'difficulty') {
    const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
    filteredPassages.sort((a, b) => {
      const aVal = difficultyOrder[a.difficulty as keyof typeof difficultyOrder];
      const bVal = difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });
  }
  
  // Apply pagination
  const paginatedPassages = filteredPassages.slice(offset, offset + limit);
  
  // Generate expanded query
  const expandedQuery = expandQuery ? generateExpandedQuery(query) : [];
  
  // Format results
  const results = {
    passages: paginatedPassages.map((passage, index) => ({
      id: passage.id,
      text: passage.text,
      similarity_score: Math.round(passage.similarity_score * 1000) / 1000,
      relevance_rank: index + 1,
      metadata: {
        work_type: passage.work,
        book_number: passage.book,
        chapter_number: passage.chapter,
        section_number: passage.section,
        cultural_theme: passage.theme,
        difficulty_level: passage.difficulty,
        word_count: passage.text.split(' ').length,
        context_before: includeContext ? passage.context_before : undefined,
        context_after: includeContext ? passage.context_after : undefined
      },
      highlights: extractHighlights(passage.text, queryTerms),
      semantic_tags: passage.concepts
    })),
    themes: semanticDatabase.themes.map(theme => ({
      name: theme.name,
      relevance_score: queryConcepts.some(concept => 
        theme.concepts.some(tc => tc.includes(concept) || concept.includes(tc))
      ) ? 0.8 : 0.3,
      passage_count: filteredPassages.filter(p => p.theme === theme.name).length,
      related_concepts: theme.concepts
    })),
    concepts: Array.from(new Set(paginatedPassages.flatMap(p => p.concepts))).map(concept => ({
      concept,
      frequency: paginatedPassages.filter(p => p.concepts.includes(concept)).length,
      related_passages: paginatedPassages.filter(p => p.concepts.includes(concept)).map(p => p.id),
      semantic_weight: 0.7
    }))
  };
  
  return { results, expandedQuery };
}

function generateExpandedQuery(query: string): string[] {
  const queryLower = query.toLowerCase();
  const expansions: string[] = [];
  
  const synonymMap = {
    'dream': ['vision', 'prophecy', 'somnium'],
    'banquet': ['feast', 'convivium', 'symposium'],
    'philosophy': ['wisdom', 'sapientia', 'knowledge'],
    'religion': ['worship', 'ritual', 'sacred'],
    'music': ['harmony', 'sound', 'celestial'],
    'soul': ['anima', 'spirit', 'psyche']
  };
  
  Object.entries(synonymMap).forEach(([key, synonyms]) => {
    if (queryLower.includes(key)) {
      expansions.push(...synonyms);
    }
  });
  
  return expansions.slice(0, 3);
}

function extractHighlights(text: string, queryTerms: string[]): string[] {
  const highlights: string[] = [];
  
  queryTerms.forEach(term => {
    const regex = new RegExp(`\\b\\w*${term}\\w*\\b`, 'gi');
    const matches = text.match(regex);
    if (matches) {
      highlights.push(...matches);
    }
  });
  
  return Array.from(new Set(highlights)).slice(0, 5);
}