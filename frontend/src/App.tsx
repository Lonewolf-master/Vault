import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Module from '../components/Models'
import InputText from '../components/InputText'

type ChatMessage = {
  id: string
  role: 'user' | 'ai'
  content: string
  agentName?: string
}

type AgentConfig = {
  model: string
  name: string
  settings: {
    temperature: number
    maxTokens: number
  }
}

const API_BASE = 'http://localhost:5000'

const DEFAULT_AGENTS: AgentConfig[] = [
  { model: 'gpt-4o', name: 'GPT-4o', settings: { temperature: 0.7, maxTokens: 500 } },
  { model: 'claude', name: 'Claude', settings: { temperature: 0.7, maxTokens: 500 } },
  { model: 'gemini', name: 'Gemini', settings: { temperature: 0.7, maxTokens: 500 } },
  { model: 'deepseek', name: 'DeepSeek', settings: { temperature: 0.7, maxTokens: 500 } },
  { model: 'grok', name: 'Grok', settings: { temperature: 0.7, maxTokens: 500 } },
  { model: 'gemma', name: 'Gemma', settings: { temperature: 0.7, maxTokens: 500 } }
]

export default function App() {
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function init() {
      const storedId = window.localStorage.getItem('vaultConversationId')
      if (storedId) {
        setConversationId(storedId)
        return
      }
      try {
        const res = await fetch(`${API_BASE}/api/conversations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: 'Vault AI group chat',
            aiAgents: DEFAULT_AGENTS
          })
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Unable to create conversation')
        }
        window.localStorage.setItem('vaultConversationId', data._id)
        setConversationId(data._id)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to create conversation')
      }
    }

    init()
  }, [])

  const handleSend = async () => {
    if (!inputText.trim()) return
    if (!conversationId) {
      setError('Waiting for conversation setup...')
      return
    }

    setLoading(true)
    setError(null)

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputText.trim()
    }
    setMessages((prev) => [...prev, userMessage])
    setInputText('')

    try {
      const res = await fetch(`${API_BASE}/api/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: userMessage.content,
          sender: { type: 'user' }
        })
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      const aiMessages = data.aiMessages?.map((item: any) => ({
        id: item._id || `ai-${Math.random()}`,
        role: 'ai' as const,
        content: item.content,
        agentName: item.sender?.aiAgent?.name || item.sender?.aiAgent?.model || 'AI'
      })) || []

      setMessages((prev) => [...prev, ...aiMessages])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Send failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id='main' className='min-h-screen bg-background-tertiary text-text-primary'>
      <Navbar />
      <Module />
      <main className='mx-auto max-w-5xl px-6 pb-10'>
        <section className='mt-6 rounded-3xl border border-border bg-surface-DEFAULT p-6 shadow-soft'>
          <div className='mb-4 flex flex-wrap items-center justify-between gap-4'>
            <div>
              <h1 className='text-3xl font-bold'>Vault Chat</h1>
              <p className='text-sm text-text-muted'>Send a message and receive a reply from your configured AI agents.</p>
            </div>
            <div className='rounded-2xl bg-surface-subtle px-4 py-2 text-sm text-text-muted'>
              Backend: {conversationId ? 'Ready' : 'Starting...'}
            </div>
          </div>

          <div className='mb-4 max-h-[450px] overflow-y-auto rounded-3xl border border-border p-4 bg-[#090b10]'>
            {messages.length === 0 ? (
              <div className='text-text-muted'>Start typing to begin the conversation.</div>
            ) : (
              <div className='space-y-4'>
                {messages.map((message) => (
                  <div key={message.id} className={`rounded-3xl px-4 py-3 ${message.role === 'user' ? 'bg-primary-active/10 self-end text-text-primary' : 'bg-surface/80 text-text-muted'} w-fit max-w-full`}>
                    {message.role === 'ai' && (
                      <div className='mb-1 text-xs uppercase text-text-muted'>{message.agentName}</div>
                    )}
                    <div>{message.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='space-y-3'>
            {error && <div className='rounded-xl bg-status-error/10 px-4 py-3 text-sm text-status-error'>{error}</div>}
            <InputText
              value={inputText}
              onChange={setInputText}
              onSubmit={handleSend}
              disabled={loading || !conversationId}
            />
          </div>
        </section>
      </main>
    </section>
  )
}
