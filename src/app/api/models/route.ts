import { NextRequest, NextResponse } from 'next/server'

// PRIMARY: Chinese Models (Priority 8-10)
// FALLBACK: International Models (Priority 5-7)
const modelsRegistry: Record<string, any> = {
  // ===== CHINESE PRIMARY MODELS =====
  'deepseek-v3.2': {
    id: 'deepseek-v3.2', name: 'DeepSeek V3.2', provider: 'DeepSeek',
    api_type: 'openai_compatible', base_url: 'https://api.deepseek.com/v1',
    api_key_env: 'DEEPSEEK_API_KEY', model_name: 'deepseek-v3.2',
    max_context: 256000, strengths: ['coding', 'algorithms', 'backend', 'debugging'],
    cost_per_1k_tokens: 0.0003, priority: 10, is_chinese: true, is_available: true,
  },
  'deepseek-r1': {
    id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek',
    api_type: 'openai_compatible', base_url: 'https://api.deepseek.com/v1',
    api_key_env: 'DEEPSEEK_API_KEY', model_name: 'deepseek-reasoner',
    max_context: 128000, strengths: ['deep_reasoning', 'mathematics', 'research'],
    cost_per_1k_tokens: 0.0005, priority: 10, is_chinese: true, is_available: true,
  },
  'qwen3-max': {
    id: 'qwen3-max', name: 'Qwen3-Max', provider: 'Alibaba',
    api_type: 'openai_compatible', base_url: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    api_key_env: 'DASHSCOPE_API_KEY', model_name: 'qwen3-max',
    max_context: 256000, strengths: ['enterprise', 'code_generation', 'fullstack'],
    cost_per_1k_tokens: 0.0005, priority: 10, is_chinese: true, is_available: true,
  },
  'qwen3-coder': {
    id: 'qwen3-coder', name: 'Qwen3-Coder', provider: 'Alibaba',
    api_type: 'openai_compatible', base_url: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    api_key_env: 'DASHSCOPE_API_KEY', model_name: 'qwen3-coder',
    max_context: 256000, strengths: ['coding', 'frontend', 'backend', 'devops'],
    cost_per_1k_tokens: 0.0004, priority: 10, is_chinese: true, is_available: true,
  },
  'kimi-k2.5': {
    id: 'kimi-k2.5', name: 'Kimi K2.5', provider: 'Moonshot AI',
    api_type: 'openai_compatible', base_url: 'https://api.moonshot.cn/v1',
    api_key_env: 'MOONSHOT_API_KEY', model_name: 'kimi-k2.5',
    max_context: 2000000, strengths: ['ultra_long_context', 'code_handling', 'large_codebase'],
    cost_per_1k_tokens: 0.008, priority: 10, is_chinese: true, is_available: true,
  },
  'kimi-k2': {
    id: 'kimi-k2', name: 'Kimi K2', provider: 'Moonshot AI',
    api_type: 'openai_compatible', base_url: 'https://api.moonshot.cn/v1',
    api_key_env: 'MOONSHOT_API_KEY', model_name: 'kimi-k2',
    max_context: 1000000, strengths: ['long_context', 'code_review', 'documentation'],
    cost_per_1k_tokens: 0.005, priority: 9, is_chinese: true, is_available: true,
  },
  'glm-5': {
    id: 'glm-5', name: 'GLM-5', provider: 'Zhipu AI',
    api_type: 'zhipuai', api_key_env: 'GLM_API_KEY', model_name: 'glm-5',
    max_context: 256000, strengths: ['open_source', 'general', 'coding', 'reasoning'],
    cost_per_1k_tokens: 0.002, priority: 9, is_chinese: true, is_available: true,
  },
  'glm-5-plus': {
    id: 'glm-5-plus', name: 'GLM-5 Plus', provider: 'Zhipu AI',
    api_type: 'zhipuai', api_key_env: 'GLM_API_KEY', model_name: 'glm-5-plus',
    max_context: 512000, strengths: ['enterprise', 'database', 'multimodal'],
    cost_per_1k_tokens: 0.005, priority: 9, is_chinese: true, is_available: true,
  },
  'yi-coder': {
    id: 'yi-coder', name: 'Yi-Coder', provider: '01.AI',
    api_type: 'openai_compatible', base_url: 'https://api.lingyiwanwu.com/v1',
    api_key_env: 'YI_API_KEY', model_name: 'yi-coder',
    max_context: 128000, strengths: ['coding', 'code_completion', 'debugging'],
    cost_per_1k_tokens: 0.0003, priority: 10, is_chinese: true, is_available: true,
  },
  'yi-large': {
    id: 'yi-large', name: 'Yi-Large', provider: '01.AI',
    api_type: 'openai_compatible', base_url: 'https://api.lingyiwanwu.com/v1',
    api_key_env: 'YI_API_KEY', model_name: 'yi-large',
    max_context: 256000, strengths: ['complex_reasoning', 'research', 'mathematics'],
    cost_per_1k_tokens: 0.003, priority: 9, is_chinese: true, is_available: true,
  },
  'yi-lightning': {
    id: 'yi-lightning', name: 'Yi-Lightning', provider: '01.AI',
    api_type: 'openai_compatible', base_url: 'https://api.lingyiwanwu.com/v1',
    api_key_env: 'YI_API_KEY', model_name: 'yi-lightning',
    max_context: 128000, strengths: ['fast', 'simple_tasks'],
    cost_per_1k_tokens: 0.0001, priority: 8, is_chinese: true, is_available: true,
  },
  'pangu-sigma': {
    id: 'pangu-sigma', name: 'PanGu-Σ', provider: 'Huawei',
    api_type: 'openai_compatible', base_url: 'https://api.pangu.huawei.com/v1',
    api_key_env: 'PANGU_API_KEY', model_name: 'pangu-sigma',
    max_context: 256000, strengths: ['research', 'coding', 'mathematics', 'scientific'],
    cost_per_1k_tokens: 0.008, priority: 9, is_chinese: true, is_available: true,
  },
  'pangu-coder': {
    id: 'pangu-coder', name: 'PanGu-Coder', provider: 'Huawei',
    api_type: 'openai_compatible', base_url: 'https://api.pangu.huawei.com/v1',
    api_key_env: 'PANGU_API_KEY', model_name: 'pangu-coder',
    max_context: 128000, strengths: ['coding', 'enterprise', 'security'],
    cost_per_1k_tokens: 0.005, priority: 8, is_chinese: true, is_available: true,
  },
  'doubao-2': {
    id: 'doubao-2', name: 'Doubao 2.0', provider: 'ByteDance',
    api_type: 'openai_compatible', base_url: 'https://ark.cn-beijing.volces.com/api/v3',
    api_key_env: 'BYTEDANCE_API_KEY', model_name: 'doubao-2-pro-256k',
    max_context: 256000, strengths: ['general_agent', 'language', 'content', 'creative'],
    cost_per_1k_tokens: 0.003, priority: 9, is_chinese: true, is_available: true,
  },
  'doubao-lite': {
    id: 'doubao-lite', name: 'Doubao Lite', provider: 'ByteDance',
    api_type: 'openai_compatible', base_url: 'https://ark.cn-beijing.volces.com/api/v3',
    api_key_env: 'BYTEDANCE_API_KEY', model_name: 'doubao-lite-128k',
    max_context: 128000, strengths: ['fast', 'simple_tasks'],
    cost_per_1k_tokens: 0.001, priority: 8, is_chinese: true, is_available: true,
  },
  'minimax-m2.5': {
    id: 'minimax-m2.5', name: 'MiniMax m2.5', provider: 'MiniMax',
    api_type: 'minimax', base_url: 'https://api.minimax.chat/v1',
    api_key_env: 'MINIMAX_API_KEY', model_name: 'm2.5-chat',
    max_context: 256000, strengths: ['multimodal', 'voice', 'video', 'creative'],
    cost_per_1k_tokens: 0.005, priority: 9, is_chinese: true, is_available: true,
  },
  'minimax-abab7': {
    id: 'minimax-abab7', name: 'MiniMax abab7', provider: 'MiniMax',
    api_type: 'minimax', base_url: 'https://api.minimax.chat/v1',
    api_key_env: 'MINIMAX_API_KEY', model_name: 'abab7-chat',
    max_context: 256000, strengths: ['general', 'conversation'],
    cost_per_1k_tokens: 0.006, priority: 8, is_chinese: true, is_available: true,
  },
  'baichuan-4': {
    id: 'baichuan-4', name: 'Baichuan 4', provider: 'Baichuan AI',
    api_type: 'openai_compatible', base_url: 'https://api.baichuan-ai.com/v1',
    api_key_env: 'BAICHUAN_API_KEY', model_name: 'Baichuan4',
    max_context: 128000, strengths: ['security', 'enterprise', 'compliance'],
    cost_per_1k_tokens: 0.005, priority: 8, is_chinese: true, is_available: true,
  },
  'step-2': {
    id: 'step-2', name: 'Step 2', provider: 'StepFun',
    api_type: 'openai_compatible', base_url: 'https://api.stepfun.com/v1',
    api_key_env: 'STEPFUN_API_KEY', model_name: 'step-2-16k',
    max_context: 128000, strengths: ['reasoning', 'mathematics', 'step_by_step'],
    cost_per_1k_tokens: 0.008, priority: 8, is_chinese: true, is_available: true,
  },
  'hunyuan-large': {
    id: 'hunyuan-large', name: 'Hunyuan Large', provider: 'Tencent',
    api_type: 'openai_compatible', base_url: 'https://api.hunyuan.cloud.tencent.com/v1',
    api_key_env: 'TENCENT_API_KEY', model_name: 'hunyuan-large',
    max_context: 128000, strengths: ['gaming', 'social', 'general'],
    cost_per_1k_tokens: 0.004, priority: 8, is_chinese: true, is_available: true,
  },
  'ernie-4.5': {
    id: 'ernie-4.5', name: 'Ernie 4.5', provider: 'Baidu',
    api_type: 'openai_compatible', base_url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop',
    api_key_env: 'BAIDU_API_KEY', model_name: 'ernie-4.5-8k',
    max_context: 128000, strengths: ['enterprise', 'chinese_nlp', 'knowledge_graph'],
    cost_per_1k_tokens: 0.008, priority: 8, is_chinese: true, is_available: true,
  },
  'sensenova-5': {
    id: 'sensenova-5', name: 'SenseNova 5', provider: 'SenseTime',
    api_type: 'openai_compatible', base_url: 'https://api.sensenova.cn/v1',
    api_key_env: 'SENSETIME_API_KEY', model_name: 'sensenova-5',
    max_context: 128000, strengths: ['computer_vision', 'multimodal'],
    cost_per_1k_tokens: 0.006, priority: 7, is_chinese: true, is_available: true,
  },

  // ===== INTERNATIONAL FALLBACK MODELS =====
  'gpt-5.2': {
    id: 'gpt-5.2', name: 'GPT-5.2', provider: 'OpenAI',
    api_type: 'openai', base_url: 'https://api.openai.com/v1',
    api_key_env: 'OPENAI_API_KEY', model_name: 'gpt-5.2',
    max_context: 200000, strengths: ['vision', 'multimodal_complex', 'frontend_generation'],
    cost_per_1k_tokens: 0.00175, priority: 7, is_chinese: false, is_available: true,
  },
  'gpt-5.2-pro': {
    id: 'gpt-5.2-pro', name: 'GPT-5.2 Pro', provider: 'OpenAI',
    api_type: 'openai', base_url: 'https://api.openai.com/v1',
    api_key_env: 'OPENAI_API_KEY', model_name: 'gpt-5.2-pro',
    max_context: 200000, strengths: ['deep_reasoning_complex', 'mathematics_advanced'],
    cost_per_1k_tokens: 0.021, priority: 6, is_chinese: false, is_available: true,
  },
  'claude-opus-4.6': {
    id: 'claude-opus-4.6', name: 'Claude Opus 4.6', provider: 'Anthropic',
    api_type: 'anthropic', api_key_env: 'ANTHROPIC_API_KEY',
    model_name: 'claude-opus-4-6-20260201', max_context: 1000000,
    strengths: ['code_review_complex', 'security_audit', 'long_context_review'],
    cost_per_1k_tokens: 0.005, priority: 7, is_chinese: false, is_available: true,
  },
  'claude-sonnet-4.5': {
    id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', provider: 'Anthropic',
    api_type: 'anthropic', api_key_env: 'ANTHROPIC_API_KEY',
    model_name: 'claude-sonnet-4-5-20260115', max_context: 500000,
    strengths: ['refactoring', 'documentation'],
    cost_per_1k_tokens: 0.003, priority: 6, is_chinese: false, is_available: true,
  },
  'gemini-3-flash': {
    id: 'gemini-3-flash', name: 'Gemini 3 Flash', provider: 'Google',
    api_type: 'gemini', api_key_env: 'GOOGLE_API_KEY',
    model_name: 'gemini-3-flash', max_context: 2000000,
    strengths: ['ultra_long_context', 'fast_free'],
    cost_per_1k_tokens: 0, priority: 7, is_chinese: false, is_available: true,
  },
  'grok-3': {
    id: 'grok-3', name: 'Grok 3', provider: 'xAI',
    api_type: 'openai_compatible', base_url: 'https://api.x.ai/v1',
    api_key_env: 'XAI_API_KEY', model_name: 'grok-3',
    max_context: 256000, strengths: ['real_time_info', 'truth_seeking'],
    cost_per_1k_tokens: 0.002, priority: 6, is_chinese: false, is_available: true,
  },
  'codestral-2': {
    id: 'codestral-2', name: 'Codestral 2', provider: 'Mistral AI',
    api_type: 'openai_compatible', base_url: 'https://api.mistral.ai/v1',
    api_key_env: 'MISTRAL_API_KEY', model_name: 'codestral-2-latest',
    max_context: 128000, strengths: ['fast_coding', 'code_completion'],
    cost_per_1k_tokens: 0.0005, priority: 6, is_chinese: false, is_available: true,
  },
  'llama-4': {
    id: 'llama-4', name: 'Llama 4', provider: 'Meta',
    api_type: 'openai_compatible', base_url: 'https://api.llama-api.com/v1',
    api_key_env: 'LLAMA_API_KEY', model_name: 'llama-4',
    max_context: 512000, strengths: ['open_source', 'general'],
    cost_per_1k_tokens: 0.001, priority: 5, is_chinese: false, is_available: true,
  },
  'deepseek-groq': {
    id: 'deepseek-groq', name: 'DeepSeek (Groq)', provider: 'Groq',
    api_type: 'openai_compatible', base_url: 'https://api.groq.com/openai/v1',
    api_key_env: 'GROQ_API_KEY', model_name: 'deepseek-r1',
    max_context: 128000, strengths: ['ultra_fast', 'free_tier'],
    cost_per_1k_tokens: 0, priority: 7, is_chinese: true, is_available: true,
  },
  'openrouter-auto': {
    id: 'openrouter-auto', name: 'OpenRouter Auto', provider: 'OpenRouter',
    api_type: 'openai_compatible', base_url: 'https://openrouter.ai/api/v1',
    api_key_env: 'OPENROUTER_API_KEY', model_name: 'deepseek/deepseek-r1',
    max_context: 128000, strengths: ['model_fallback', 'cost_optimized'],
    cost_per_1k_tokens: 0.0003, priority: 6, is_chinese: false, is_available: true,
  },

  // ===== LOCAL MODELS =====
  'ollama-deepseek': {
    id: 'ollama-deepseek', name: 'DeepSeek (Local)', provider: 'Ollama',
    api_type: 'ollama', base_url: 'http://localhost:11434', model_name: 'deepseek-r1',
    max_context: 128000, strengths: ['local', 'free', 'private', 'offline'],
    cost_per_1k_tokens: 0, priority: 5, is_chinese: true, is_available: true,
  },
  'ollama-qwen': {
    id: 'ollama-qwen', name: 'Qwen (Local)', provider: 'Ollama',
    api_type: 'ollama', base_url: 'http://localhost:11434', model_name: 'qwen2.5-coder',
    max_context: 128000, strengths: ['local', 'free', 'coding'],
    cost_per_1k_tokens: 0, priority: 5, is_chinese: true, is_available: true,
  },
}

export async function GET(request: NextRequest) {
  const chineseCount = Object.values(modelsRegistry).filter(m => m.is_chinese).length
  const totalCount = Object.keys(modelsRegistry).length
  
  return NextResponse.json({
    success: true,
    data: {
      total_models: totalCount,
      chinese_models: chineseCount,
      international_models: totalCount - chineseCount,
      chinese_percentage: Math.round((chineseCount / totalCount) * 100),
      models: modelsRegistry,
    }
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  if (body.id && body.name && body.provider) {
    modelsRegistry[body.id] = { ...body, is_available: true }
    return NextResponse.json({ success: true, message: `Model '${body.id}' added!` })
  }
  
  if (body.model_id && body.prompt) {
    const model = modelsRegistry[body.model_id]
    if (!model) {
      return NextResponse.json({ success: false, error: `Model '${body.model_id}' not found` })
    }
    return NextResponse.json({
      success: true,
      data: { content: `Response from ${model.name}`, model_id: body.model_id }
    })
  }
  
  return NextResponse.json({ success: false, error: 'Invalid request' })
}

export async function DELETE(request: NextRequest) {
  const modelId = request.nextUrl.searchParams.get('id')
  if (!modelId || !modelsRegistry[modelId]) {
    return NextResponse.json({ success: false, error: 'Model not found' })
  }
  delete modelsRegistry[modelId]
  return NextResponse.json({ success: true, message: `Model '${modelId}' removed` })
}
