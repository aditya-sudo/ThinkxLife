"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User, Bot } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

type ChatInterfaceProps = {
  initialMessage: string
}

export default function ChatInterface({ initialMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: initialMessage,
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return

    // Display the user's message immediately
    const userMsg: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])

    // Clear the input immediately to reduce perceived latency
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content, history }),
      })

      if (!res.ok) {
        console.error("Chat API error:", await res.text())
        return
      }

      const data = (await res.json()) as { response: string }

      // Update history
      setHistory((h) => [
        ...h,
        { role: "user", content: userMsg.content },
        { role: "assistant", content: data.response },
      ])

      // Display Zoe's reply
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      console.error("Chat API error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-xl flex flex-col h-[70vh]">
      <div className="bg-purple-700 p-4 border-b border-purple-600 text-white">
        <h2 className="text-xl font-semibold">Chat with Zoe</h2>
        <p className="text-purple-100 text-sm">Your AI companion for emotional support</p>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user" ? "bg-purple-100 text-gray-800" : "bg-gray-100 text-gray-800"
              }`}>
              <div className="flex items-center mb-1">
                {message.sender === "user" ? (
                  <> <span className="font-medium mr-2">You</span><User size={14} className="text-purple-700" /> </>
                ) : (
                  <> <span className="font-medium mr-2">Zoe</span><Bot size={14} className="text-purple-700" /> </>
                )}
              </div>
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-grow border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
          <Button type="submit" disabled={loading} className="bg-purple-700 hover:bg-purple-800 text-white">
            {loading ? '...' : <Send size={18} />}
          </Button>
        </form>
      </div>
    </div>
  )
}
