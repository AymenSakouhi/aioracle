import { useState } from 'react'
import './App.css'

// Define the structure of a chat message
interface Message {
  role: 'user' | 'assistant' // Either a user message or AI assistant response
  content: string // The actual text content of the message
}

export default function App() {
  // State management
  const [input, setInput] = useState('') // Current input field value
  const [messages, setMessages] = useState<Message[]>([]) // Array of all messages in the conversation
  const [isLoading, setIsLoading] = useState(false) // Loading state for the AI response
  const [error, setError] = useState<Error | null>(null) // Error state if something goes wrong

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission
    if (!input.trim()) return // Don't do anything if input is empty

    // Add user message to the conversation history immediately
    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('') // Clear the input field right away

    // Set loading state and clear any previous errors
    setIsLoading(true)
    setError(null)

    try {
      // Make the API request to the backend
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      })

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Get the response stream reader
      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No reader available')
      }

      // Set up stream processing
      const decoder = new TextDecoder() // For converting binary data to text
      let result = '' // Accumulate the streaming response

      // Process the stream chunk by chunk
      while (true) {
        const { done, value } = await reader.read()
        if (done) break // Exit loop when stream is complete

        // Decode and accumulate the chunk
        const chunk = decoder.decode(value)
        result += chunk

        // Update the messages array with the latest AI response
        setMessages((prev) => {
          const newMessages = [...prev]
          const lastMessage = newMessages[newMessages.length - 1]

          // If there's already an AI message, update it
          // Otherwise, add a new AI message
          if (lastMessage?.role === 'assistant') {
            lastMessage.content = result
          } else {
            newMessages.push({ role: 'assistant', content: result })
          }
          return newMessages
        })
      }
    } catch (err) {
      // Handle any errors that occur during the request
      setError(
        err instanceof Error ? err : new Error('An unknown error occurred'),
      )
    } finally {
      // Always turn off loading state when done
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold">🔮 AI Chat Oracle</h1>
          <p className="text-gray-400">
            Ask any question and you will get mystical answer
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 space-y-2 h-96 overflow-y-auto">
          {/* Render all messages in the conversation */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-[80%] ${message.role === 'user' ? 'text-[#333333] ml-auto bg-[#eae4dd]' : 'mr-auto bg-indigo-700'}`}
            >
              {message.content}
            </div>
          ))}
          {/* Show loading indicator while waiting for AI response */}
          {isLoading && (
            <div className="p-2 bg-indigo-700 rounded-lg text-white">
              Thinking...
            </div>
          )}
          {/* Show error message if something went wrong */}
          {error && (
            <div className="p-2 bg-red-500 rounded-lg text-white">
              Error: {error.message}
            </div>
          )}
        </div>
        {/* Chat input form */}
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            name="prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-ring-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
