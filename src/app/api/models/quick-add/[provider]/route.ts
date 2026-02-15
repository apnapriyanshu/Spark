import { NextRequest, NextResponse } from 'next/server'

// Quick Add Templates - 50% Chinese + 50% International
const quickAddTemplates: Record<string, any> = {
  // ===== CHINESE MODELS =====
  deepseek: {
    id: 'deepseek-v4', name: 'DeepSeek V4', provider: 'DeepSeek',
    api_type: 'openai_compatible', base_url: 'https://api.deepseek.com/v1',
    api_key_env: 'DEEPSEEK_API_KEY', model_name: 'deepseek-v4',
    max_context: 256000, strengths: ['coding', 'algorithms', 'backend'],
    cost_per_1k_tokens: 0.0003, priority: 10,
  },
  glm: {
    id: 'glm-4-plus', name: 'GLM-4 Plus', provider: 'Zhipu AI',
    api_type: 'zhipuai', api_key_env: 'GLM_API_KEY', model_name: 'glm-4-plus',
    max_context: 128000, strengths: ['enterprise', 'database'],
    cost_per_1k_tokens: 0.01, priority: 9,
  },
  zhipu: {
    id: 'glm-z1', name: 'GLM-Z1', provider: 'Zhipu AI',
    api_type: 'zhipuai', api_key_env: 'GLM_API_KEY', model_name: 'glm-z1',
    max_context: 256000, strengths: ['reasoning', 'analysis'],
    cost_per_1k_tokens: 0.02, priority: 9,
  },
  kimi: {
    id: 'kimi-k2', name: 'Kimi K2', provider: 'Moonshot AI',
    api_type: 'openai_compatible', base_url: 'https://api.moonshot.cn/v1',
    api_key_env: 'MOONSHOT_API_KEY', model_name: 'kimi-k2',
    max_context: 2000000, strengths: ['ultra_long_context'],
    cost_per_1k_tokens: 0.012, priority: 10,
  },
  moonshot: {
    id: 'kimi-128k', name: 'Kimi 128K', provider: 'Moonshot AI',
    api_type: 'openai_compatible', base_url: 'https://api.moonshot.cn/v1',
    api_key_env: 'MOONSHOT_API_KEY', model_name: 'moonshot-v1-128k',
    max_context: 128000, strengths: ['long_context'],
    cost_per_1k_tokens: 0.01, priority: 8,
  },
  minimax: {
    id: 'minimax-abab7', name: 'MiniMax abab7', provider: 'MiniMax',
    api_type: 'minimax', base_url: 'https://api.minimax.chat/v1',
    api_key_env: 'MINIMAX_API_KEY', model_name: 'abab7-chat',
    max_context: 256000, strengths: ['multimodal', 'voice'],
    cost_per_1k_tokens: 0.008, priority: 9,
  },
  baichuan: {
    id: 'baichuan-4', name: 'Baichuan 4', provider: 'Baichuan AI',
    api_type: 'openai_compatible', base_url: 'https://api.baichuan-ai.com/v1',
    api_key_env: 'BAICHUAN_API_KEY', model_name: 'Baichuan4',
    max_context: 128000, strengths: ['security', 'enterprise'],
    cost_per_1k_tokens: 0.008, priority: 8,
  },
  yi: {
    id: 'yi-large', name: 'Yi Large', provider: '01.AI',
    api_type: 'openai_compatible', base_url: 'https://api.lingyiwanwu.com/v1',
    api_key_env: 'YI_API_KEY', model_name: 'yi-large',
    max_context: 256000, strengths: ['complex_reasoning'],
    cost_per_1k_tokens: 0.005, priority: 9,
  },
  stepfun: {
    id: 'step-2', name: 'Step 2', provider: 'StepFun',
    api_type: 'openai_compatible', base_url: 'https://api.stepfun.com/v1',
    api_key_env: 'STEPFUN_API_KEY', model_name: 'step-2-16k',
    max_context: 128000, strengths: ['reasoning', 'mathematics'],
    cost_per_1k_tokens: 0.01, priority: 8,
  },
  qwen: {
    id: 'qwen-3-coder', name: 'Qwen 3 Coder', provider: 'Alibaba',
    api_type: 'openai_compatible', base_url: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    api_key_env: 'DASHSCOPE_API_KEY', model_name: 'qwen-3-coder',
    max_context: 256000, strengths: ['coding', 'fullstack'],
    cost_per_1k_tokens: 0.0005, priority: 9,
  },
  alibaba: {
    id: 'qwen-max', name: 'Qwen Max', provider: 'Alibaba',
    api_type: 'dashscope', api_key_env: 'DASHSCOPE_API_KEY', model_name: 'qwen-max',
    max_context: 128000, strengths: ['general', 'reasoning'],
    cost_per_1k_tokens: 0.001, priority: 8,
  },
  ernie: {
    id: 'ernie-4.5', name: 'Ernie 4.5', provider: 'Baidu',
    api_type: 'openai_compatible', base_url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop',
    api_key_env: 'BAIDU_API_KEY', model_name: 'ernie-4.5-8k',
    max_context: 128000, strengths: ['enterprise', 'chinese_nlp'],
    cost_per_1k_tokens: 0.012, priority: 8,
  },
  baidu: {
    id: 'ernie-4.5', name: 'Ernie 4.5', provider: 'Baidu',
    api_type: 'openai_compatible', base_url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop',
    api_key_env: 'BAIDU_API_KEY', model_name: 'ernie-4.5-8k',
    max_context: 128000, strengths: ['enterprise', 'chinese_nlp'],
    cost_per_1k_tokens: 0.012, priority: 8,
  },
  hunyuan: {
    id: 'hunyuan-large', name: 'Hunyuan Large', provider: 'Tencent',
    api_type: 'openai_compatible', base_url: 'https://api.hunyuan.cloud.tencent.com/v1',
    api_key_env: 'TENCENT_API_KEY', model_name: 'hunyuan-large',
    max_context: 128000, strengths: ['gaming', 'social'],
    cost_per_1k_tokens: 0.008, priority: 7,
  },
  tencent: {
    id: 'hunyuan-large', name: 'Hunyuan Large', provider: 'Tencent',
    api_type: 'openai_compatible', base_url: 'https://api.hunyuan.cloud.tencent.com/v1',
    api_key_env: 'TENCENT_API_KEY', model_name: 'hunyuan-large',
    max_context: 128000, strengths: ['gaming', 'social'],
    cost_per_1k_tokens: 0.008, priority: 7,
  },
  doubao: {
    id: 'doubao-pro', name: 'Doubao Pro', provider: 'ByteDance',
    api_type: 'openai_compatible', base_url: 'https://ark.cn-beijing.volces.com/api/v3',
    api_key_env: 'BYTEDANCE_API_KEY', model_name: 'doubao-pro-256k',
    max_context: 256000, strengths: ['content', 'creative'],
    cost_per_1k_tokens: 0.005, priority: 7,
  },
  bytedance: {
    id: 'doubao-pro', name: 'Doubao Pro', provider: 'ByteDance',
    api_type: 'openai_compatible', base_url: 'https://ark.cn-beijing.volces.com/api/v3',
    api_key_env: 'BYTEDANCE_API_KEY', model_name: 'doubao-pro-256k',
    max_context: 256000, strengths: ['content', 'creative'],
    cost_per_1k_tokens: 0.005, priority: 7,
  },
  sensetime: {
    id: 'sensenova-5', name: 'SenseNova 5', provider: 'SenseTime',
    api_type: 'openai_compatible', base_url: 'https://api.sensenova.cn/v1',
    api_key_env: 'SENSETIME_API_KEY', model_name: 'sensenova-5',
    max_context: 128000, strengths: ['cv', 'multimodal'],
    cost_per_1k_tokens: 0.01, priority: 7,
  },

  // ===== INTERNATIONAL MODELS =====
  openai: {
    id: 'gpt-5.2', name: 'GPT-5.2', provider: 'OpenAI',
    api_type: 'openai', base_url: 'https://api.openai.com/v1',
    api_key_env: 'OPENAI_API_KEY', model_name: 'gpt-5.2',
    max_context: 200000, strengths: ['coding', 'reasoning', 'frontend'],
    cost_per_1k_tokens: 0.00175, priority: 10,
  },
  gpt: {
    id: 'gpt-5', name: 'GPT-5', provider: 'OpenAI',
    api_type: 'openai', base_url: 'https://api.openai.com/v1',
    api_key_env: 'OPENAI_API_KEY', model_name: 'gpt-5',
    max_context: 160000, strengths: ['coding', 'debugging'],
    cost_per_1k_tokens: 0.00125, priority: 9,
  },
  anthropic: {
    id: 'claude-opus-4.6', name: 'Claude Opus 4.6', provider: 'Anthropic',
    api_type: 'anthropic', api_key_env: 'ANTHROPIC_API_KEY',
    model_name: 'claude-opus-4-6-20260201', max_context: 1000000,
    strengths: ['deep_reasoning', 'research', 'long_context'],
    cost_per_1k_tokens: 0.005, priority: 10,
  },
  claude: {
    id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', provider: 'Anthropic',
    api_type: 'anthropic', api_key_env: 'ANTHROPIC_API_KEY',
    model_name: 'claude-sonnet-4-5-20260115', max_context: 500000,
    strengths: ['coding', 'refactoring', 'code_review'],
    cost_per_1k_tokens: 0.003, priority: 9,
  },
  google: {
    id: 'gemini-3-flash', name: 'Gemini 3 Flash', provider: 'Google',
    api_type: 'gemini', api_key_env: 'GOOGLE_API_KEY',
    model_name: 'gemini-3-flash', max_context: 2000000,
    strengths: ['fast', 'multimodal', 'ultra_long_context'],
    cost_per_1k_tokens: 0, priority: 9,
  },
  gemini: {
    id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google',
    api_type: 'gemini', api_key_env: 'GOOGLE_API_KEY',
    model_name: 'gemini-2.5-pro', max_context: 2000000,
    strengths: ['reasoning', 'multimodal'],
    cost_per_1k_tokens: 0.00125, priority: 8,
  },
  xai: {
    id: 'grok-5', name: 'Grok 5', provider: 'xAI',
    api_type: 'openai_compatible', base_url: 'https://api.x.ai/v1',
    api_key_env: 'XAI_API_KEY', model_name: 'grok-5',
    max_context: 512000, strengths: ['deep_reasoning', 'super_intelligence'],
    cost_per_1k_tokens: 0.005, priority: 10,
  },
  grok: {
    id: 'grok-3', name: 'Grok 3', provider: 'xAI',
    api_type: 'openai_compatible', base_url: 'https://api.x.ai/v1',
    api_key_env: 'XAI_API_KEY', model_name: 'grok-3',
    max_context: 256000, strengths: ['reasoning', 'real_time'],
    cost_per_1k_tokens: 0.002, priority: 9,
  },
  mistral: {
    id: 'codestral-2', name: 'Codestral 2', provider: 'Mistral AI',
    api_type: 'openai_compatible', base_url: 'https://api.mistral.ai/v1',
    api_key_env: 'MISTRAL_API_KEY', model_name: 'codestral-2-latest',
    max_context: 128000, strengths: ['coding', 'fast'],
    cost_per_1k_tokens: 0.0005, priority: 9,
  },
  codestral: {
    id: 'codestral-2', name: 'Codestral 2', provider: 'Mistral AI',
    api_type: 'openai_compatible', base_url: 'https://api.mistral.ai/v1',
    api_key_env: 'MISTRAL_API_KEY', model_name: 'codestral-2-latest',
    max_context: 128000, strengths: ['coding', 'fast'],
    cost_per_1k_tokens: 0.0005, priority: 9,
  },
  meta: {
    id: 'llama-4', name: 'Llama 4', provider: 'Meta',
    api_type: 'openai_compatible', base_url: 'https://api.llama-api.com/v1',
    api_key_env: 'LLAMA_API_KEY', model_name: 'llama-4',
    max_context: 512000, strengths: ['coding', 'open_source'],
    cost_per_1k_tokens: 0.001, priority: 8,
  },
  llama: {
    id: 'llama-4', name: 'Llama 4', provider: 'Meta',
    api_type: 'openai_compatible', base_url: 'https://api.llama-api.com/v1',
    api_key_env: 'LLAMA_API_KEY', model_name: 'llama-4',
    max_context: 512000, strengths: ['coding', 'open_source'],
    cost_per_1k_tokens: 0.001, priority: 8,
  },
  groq: {
    id: 'llama-4-groq', name: 'Llama 4 (Groq)', provider: 'Groq',
    api_type: 'openai_compatible', base_url: 'https://api.groq.com/openai/v1',
    api_key_env: 'GROQ_API_KEY', model_name: 'llama-4-8b',
    max_context: 128000, strengths: ['ultra_fast', 'streaming'],
    cost_per_1k_tokens: 0, priority: 8,
  },
  openrouter: {
    id: 'openrouter-auto', name: 'OpenRouter Auto', provider: 'OpenRouter',
    api_type: 'openai_compatible', base_url: 'https://openrouter.ai/api/v1',
    api_key_env: 'OPENROUTER_API_KEY', model_name: 'openrouter/auto',
    max_context: 128000, strengths: ['auto_selection', 'cost_optimized'],
    cost_per_1k_tokens: 0.0005, priority: 6,
  },
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params
  const providerLower = provider.toLowerCase()
  
  if (!quickAddTemplates[providerLower]) {
    return NextResponse.json({
      success: false,
      detail: `Unknown provider. Supported: ${Object.keys(quickAddTemplates).slice(0, 10).join(', ')}... and more`,
    }, { status: 400 })
  }
  
  const config = quickAddTemplates[providerLower]
  
  return NextResponse.json({
    success: true,
    message: `Added ${config.name} successfully!`,
    model: config,
  })
}
