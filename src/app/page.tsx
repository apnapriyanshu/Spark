'use client'

import { useState, useEffect, useRef } from 'react'

// Types
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Block {
  id: string
  type: 'hero' | 'features' | 'pricing' | 'cta' | 'testimonials'
  title: string
}

// Floating Orb Component
function FloatingOrb({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50 group hover:scale-110 transition-all duration-300"
      style={{
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
        animation: 'float 3s ease-in-out infinite',
        boxShadow: '0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)',
      }}
    >
      <div className="absolute inset-0 rounded-full opacity-75 blur-md group-hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)' }}
      />
      <span className="text-white text-2xl relative z-10">✨</span>
    </button>
  )
}

// AI Avatar Component
function AIAvatar({ isThinking }: { isThinking: boolean }) {
  return (
    <div className="relative w-10 h-10">
      <div 
        className={`absolute inset-0 rounded-full ${isThinking ? 'animate-pulse' : ''}`}
        style={{ 
          background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
          filter: 'blur(8px)', 
          opacity: 0.6 
        }} 
      />
      <div 
        className="relative w-10 h-10 rounded-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}
      >
        <span className="text-white text-sm font-bold">AI</span>
      </div>
      {isThinking && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
          <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </div>
  )
}

// Typing Animation Component
function TypingText({ text, isTyping }: { text: string; isTyping: boolean }) {
  if (!isTyping) {
    return <span>{text}</span>
  }
  return (
    <span>
      {text}
      <span className="inline-block w-0.5 h-4 bg-indigo-500 ml-0.5 animate-pulse" />
    </span>
  )
}

// Main Component
export default function Home() {
  // State
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [activeTab, setActiveTab] = useState<'chat' | 'blocks' | 'history'>('chat')
  const [showOrbModal, setShowOrbModal] = useState(false)
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate')
  
  const chatRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Blocks
  const blocks: Block[] = [
    { id: '1', type: 'hero', title: 'Hero Section' },
    { id: '2', type: 'features', title: 'Features Grid' },
    { id: '3', type: 'pricing', title: 'Pricing Table' },
    { id: '4', type: 'cta', title: 'Call to Action' },
    { id: '5', type: 'testimonials', title: 'Testimonials' },
  ]

  // Initial message
  const welcomeMessage = "Hi! I'm your AI assistant. Describe what you want to build, and I'll create it for you. Try saying 'Build a modern SaaS landing page' or 'Create a pricing table component'."
  
  // Initialize messages only once
  const allMessages = messages.length === 0 
    ? [{ id: '1', role: 'assistant' as const, content: welcomeMessage, timestamp: new Date() }] 
    : messages

  // Auto scroll
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [allMessages])

  // Handle send
  const handleSend = async () => {
    if (!inputValue.trim() || isThinking) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsThinking(true)

    // Simulate AI response
    await new Promise(r => setTimeout(r, 1500))

    const responses = [
      "I've generated a beautiful hero section with gradient background, animated text, and a call-to-action button. Check the preview!",
      "Created a responsive pricing table with 3 tiers, hover effects, and a featured badge. It's mobile-ready!",
      "Built a feature grid with icons, hover animations, and a clean layout. You can customize the colors!",
      "I've added a testimonials section with card layout, star ratings, and smooth animations!",
    ]

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, aiMessage])
    setIsThinking(false)
  }

  // Theme styles
  const bgMain = darkMode ? 'bg-[#0a0a0f]' : 'bg-[#f8fafc]'
  const bgSecondary = darkMode ? 'bg-[#111118]' : 'bg-white'
  const bgTertiary = darkMode ? 'bg-[#1a1a24]' : 'bg-[#f1f5f9]'
  const textColor = darkMode ? 'text-white' : 'text-[#0f172a]'
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600'
  const borderColor = darkMode ? 'border-white/10' : 'border-gray-200'

  return (
    <div className={`min-h-screen ${bgMain} ${textColor} font-sans transition-colors duration-300`}>
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(${darkMode ? '#fff' : '#000'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Top Bar */}
      <header className={`sticky top-0 z-40 ${bgSecondary}/80 backdrop-blur-xl border-b ${borderColor}`}>
        <div className="flex items-center justify-between px-4 h-14">
          {/* Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg ${bgTertiary} hover:opacity-80 transition-opacity`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)' }}
              >
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <span className="font-semibold text-lg">Spark</span>
            </div>

            {/* Project Switcher */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg ${bgTertiary} cursor-pointer hover:opacity-80`}>
              <span className="text-sm opacity-60">Project:</span>
              <span className="text-sm font-medium">My App</span>
              <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Auto Save Indicator */}
            <div className="flex items-center gap-1.5 text-xs text-green-500">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Saved
            </div>

            {/* Skill Level Toggle */}
            <div className={`hidden lg:flex items-center gap-1 p-1 rounded-lg ${bgTertiary}`}>
              {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => setSkillLevel(level)}
                  className={`px-2 py-1 text-xs rounded-md transition-all ${
                    skillLevel === level 
                      ? 'text-white' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={skillLevel === level ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' } : {}}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${bgTertiary} hover:opacity-80 transition-all`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* Profile */}
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium cursor-pointer hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              U
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} ${bgSecondary} border-r ${borderColor} flex flex-col transition-all duration-300`}>
          <nav className="flex-1 p-3 space-y-1">
            {[
              { icon: '💬', label: 'AI Chat', tab: 'chat' as const },
              { icon: '🧱', label: 'Blocks', tab: 'blocks' as const },
              { icon: '📜', label: 'History', tab: 'history' as const },
              { icon: '🎨', label: 'Themes', tab: null },
              { icon: '⚡', label: 'Integrations', tab: null },
              { icon: '📊', label: 'Analytics', tab: null },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => item.tab && setActiveTab(item.tab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  item.tab === activeTab 
                    ? 'text-white shadow-lg' 
                    : `hover:${bgTertiary}`
                }`}
                style={item.tab === activeTab ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)' } : {}}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Bottom */}
          {sidebarOpen && (
            <div className={`p-4 m-3 rounded-xl ${bgTertiary}`}>
              <div className="text-xs text-gray-500 mb-2">AI Credits</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full w-3/4 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                  />
                </div>
                <span className="text-xs font-medium">75%</span>
              </div>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Left Panel - Chat/Blocks */}
          <div className={`w-[400px] ${bgSecondary} border-r ${borderColor} flex flex-col`}>
            {/* Tabs */}
            <div className={`flex border-b ${borderColor}`}>
              {(['chat', 'blocks', 'history'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab 
                      ? 'border-b-2 border-indigo-500 text-indigo-400' 
                      : `${textSecondary} hover:text-white`
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Chat Panel */}
            {activeTab === 'chat' && (
              <>
                {/* Messages */}
                <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  {allMessages.map((msg, idx) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      {msg.role === 'assistant' && <AIAvatar isThinking={isThinking && idx === allMessages.length - 1} />}
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'text-white'
                            : bgTertiary
                        }`}
                        style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' } : {}}
                      >
                        <p className="text-sm leading-relaxed">
                          <TypingText text={msg.content} isTyping={isThinking && msg.role === 'assistant' && idx === allMessages.length - 1} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suggestions */}
                <div className="px-4 py-2 flex gap-2 overflow-x-auto">
                  {['Build landing page', 'Add pricing section', 'Create nav bar'].map(s => (
                    <button
                      key={s}
                      onClick={() => setInputValue(s)}
                      className={`px-3 py-1.5 text-xs rounded-full ${bgTertiary} hover:opacity-80 whitespace-nowrap transition-all`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className={`p-4 border-t ${borderColor}`}>
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl ${bgTertiary}`}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder="Describe what you want to build..."
                      className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isThinking}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                      style={inputValue.trim() && !isThinking ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white' } : {}}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Blocks Panel */}
            {activeTab === 'blocks' && (
              <div className="flex-1 overflow-y-auto p-4">
                <p className={`text-xs ${textSecondary} mb-3`}>Drag blocks to preview</p>
                <div className="space-y-2">
                  {blocks.map(block => (
                    <div
                      key={block.id}
                      className={`p-4 rounded-xl ${bgTertiary} cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-indigo-500/50 transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">
                          {block.type === 'hero' ? '🚀' : block.type === 'features' ? '✨' : block.type === 'pricing' ? '💎' : block.type === 'cta' ? '📣' : '💬'}
                        </span>
                        <span className="text-sm font-medium">{block.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* History Panel */}
            {activeTab === 'history' && (
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`p-4 rounded-xl ${bgTertiary}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Today, {10 + i}:30 AM</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">Completed</span>
                      </div>
                      <p className="text-sm">Build a hero section with gradient...</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Center - Preview */}
          <div className="flex-1 flex flex-col">
            {/* Preview Header */}
            <div className={`flex items-center justify-between px-6 py-3 border-b ${borderColor}`}>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Live Preview</span>
                <div className={`flex items-center gap-1 p-1 rounded-lg ${bgTertiary}`}>
                  {(['desktop', 'tablet', 'mobile'] as const).map(device => (
                    <button
                      key={device}
                      onClick={() => setPreviewDevice(device)}
                      className={`px-3 py-1.5 text-xs rounded-md transition-all ${
                        previewDevice === device ? 'text-white' : ''
                      }`}
                      style={previewDevice === device ? { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' } : {}}
                    >
                      {device === 'desktop' ? '🖥️' : device === 'tablet' ? '📱' : '📲'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={`px-3 py-1.5 text-xs rounded-lg ${bgTertiary} hover:opacity-80`}>
                  ↻ Refresh
                </button>
                <button 
                  className="px-3 py-1.5 text-xs rounded-lg text-white"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  Export Code
                </button>
              </div>
            </div>

            {/* Preview Area */}
            <div className={`flex-1 p-6 ${bgMain} overflow-hidden`}>
              <div 
                className={`mx-auto h-full rounded-2xl ${bgSecondary} border ${borderColor} overflow-hidden transition-all duration-500`}
                style={{
                  width: previewDevice === 'desktop' ? '100%' : previewDevice === 'tablet' ? '768px' : '375px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                }}
              >
                {/* Mock Preview Content */}
                <div className="h-full flex flex-col">
                  {/* Mock Navbar */}
                  <div className={`flex items-center justify-between px-6 py-4 border-b ${borderColor}`}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                      />
                      <span className="text-sm font-semibold">My App</span>
                    </div>
                    <div className="flex gap-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`w-12 h-2 rounded ${bgTertiary}`} />
                      ))}
                    </div>
                  </div>

                  {/* Mock Hero */}
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                      <div 
                        className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                      >
                        <span className="text-3xl">🚀</span>
                      </div>
                      <h1 className="text-2xl font-bold">Welcome to My App</h1>
                      <p className={`${textSecondary} max-w-sm mx-auto`}>
                        Build amazing products with AI-powered development
                      </p>
                      <div className="flex justify-center gap-3 pt-2">
                        <button 
                          className="px-6 py-2.5 rounded-xl text-white text-sm font-medium"
                          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                        >
                          Get Started
                        </button>
                        <button className={`px-6 py-2.5 rounded-xl ${bgTertiary} text-sm`}>
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Context Tools */}
          <div className={`w-64 ${bgSecondary} border-l ${borderColor} p-4 hidden xl:block`}>
            <h3 className="text-sm font-semibold mb-4">AI Suggestions</h3>
            <div className="space-y-3">
              {[
                { icon: '🎨', title: 'Add gradient background', desc: 'Make it pop!' },
                { icon: '✨', title: 'Add animations', desc: 'Smooth transitions' },
                { icon: '📱', title: 'Optimize mobile', desc: 'Responsive design' },
                { icon: '🔍', title: 'Add SEO meta tags', desc: 'Better ranking' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  className={`w-full p-3 rounded-xl ${bgTertiary} text-left hover:ring-2 hover:ring-indigo-500/30 transition-all`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div className={`text-xs ${textSecondary}`}>{item.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Theme Generator */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-3">Auto Theme</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  ['#6366f1', '#8b5cf6'],
                  ['#ec4899', '#f43f5e'],
                  ['#14b8a6', '#06b6d4'],
                  ['#f59e0b', '#eab308'],
                ].map((colors, idx) => (
                  <button
                    key={idx}
                    className="w-full aspect-square rounded-lg"
                    style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating AI Orb */}
      <FloatingOrb onClick={() => setShowOrbModal(true)} />

      {/* AI Modal */}
      {showOrbModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowOrbModal(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div 
            className={`relative w-full max-w-md p-6 rounded-2xl ${bgSecondary} border ${borderColor}`}
            onClick={e => e.stopPropagation()}
            style={{ 
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div className="text-center mb-4">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)' }}
              >
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-bold">Ask AI Anything</h3>
              <p className={`text-sm ${textSecondary} mt-1`}>What would you like to create?</p>
            </div>
            <input
              type="text"
              placeholder="Type your request..."
              className={`w-full px-4 py-3 rounded-xl ${bgTertiary} outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowOrbModal(false)}
                className={`flex-1 px-4 py-2.5 rounded-xl ${bgTertiary} text-sm`}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowOrbModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm font-medium"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        code, pre {
          font-family: 'JetBrains Mono', monospace;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.3);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </div>
  )
}
