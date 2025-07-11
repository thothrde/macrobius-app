import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const status = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    components: {
      frontend: 'operational',
      backend: 'connected',
      database: 'oracle_cloud',
      ai_systems: 'active'
    },
    features: {
      ai_tutoring: 'complete',
      semantic_search: 'tier2_complete',
      vocabulary_trainer: 'corpus_expansion_complete',
      grammar_explainer: 'tier1_complete',
      learning_paths: 'tier1_complete',
      quiz_generation: 'smart_generation_complete'
    },
    backend_url: 'http://152.70.184.232:8080',
    content_stats: {
      latin_passages: 1401,
      cultural_themes: 9,
      cultural_insights: 16,
      teaching_modules: 16
    }
  };

  res.status(200).json(status);
}