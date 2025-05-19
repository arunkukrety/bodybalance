import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import mockData from "../data/MockData";
import { Groq } from "groq-sdk";

// Create Groq client instance
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY, dangerouslyAllowBrowser: true 
});

export default function AIAnalysisPage() {
  const [userPrompt, setUserPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const formatWeightData = () =>
    mockData
      .map((entry) => `Date: ${entry.date}, Weight: ${entry.weight}kg`)
      .join("\n");

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: userPrompt.trim() }
    ];
    setMessages(newMessages);
    setLoading(true);

    const context = `
You are an expert health and weight analysis assistant. Here is the user's weight data:
${formatWeightData()}

User prompt: ${userPrompt}
Please analyze the user's weight trend and answer the prompt above with actionable insights in 150-200 words unless user asks for a longer answer.
    `.trim();

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are an expert health and fitness analysis AI assistant. Provide clear, actionable insights based on weight data." },
          { role: "user", content: context }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 1000,
      });

      const aiContent = completion.choices[0]?.message?.content || "No response.";
      setMessages([
        ...newMessages,
        { role: "assistant", content: aiContent }
      ]);
    } catch (err) {
      console.error('Groq API Error:', err);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, there was an error analyzing your data. Please try again later." }
      ]);
    }
    setLoading(false);
    setUserPrompt("");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-2 sm:p-6">
      <div className="container mx-auto px-1 xs:px-2 sm:px-4 py-4 sm:py-6 max-w-full sm:max-w-3xl">
        <Header activePage={"ai-analysis"} />
        <div className="space-y-6">
          <div className="card-glass p-4 sm:p-6 rounded-2xl green-tint-gradient animate-scale-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  AI Weight Analysis
                </h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  Get personalized insights about your weight journey
                </p>
              </div>
              <div className="mt-2 sm:mt-0 text-xs sm:text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-green-400">●</span> AI Assistant Online
              </div>
            </div>

            {/* Chat Section with improved styling */}
            <div className="flex flex-col h-[400px] sm:h-[500px] bg-black/20 rounded-lg mb-4 overflow-hidden border border-white/10">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && !loading && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm space-y-2">
                    <div className="w-12 h-12 rounded-full bg-green-700/20 flex items-center justify-center mb-2">
                      <span className="text-xl">🤖</span>
                    </div>
                    <span className="font-medium text-base text-white/90">How can I help you today?</span>
                    <span className="text-sm text-white/60">Ask about your weight trends, goals, or suggestions</span>
                  </div>
                )}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-scale-in`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm sm:text-base leading-relaxed ${
                        msg.role === "user"
                          ? "bg-green-700 text-white rounded-br-none"
                          : "bg-white/10 text-gray-100 rounded-bl-none border border-white/10"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start animate-pulse">
                    <div className="max-w-[85%] px-4 py-2.5 rounded-2xl bg-white/10 text-gray-100 rounded-bl-none border border-white/10">
                      <div className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "0.4s" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Form with improved styling */}
              <div className="p-4 border-t border-white/10 bg-black/20">
                <form onSubmit={handleAnalyze} className="flex gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      className="w-full min-h-[44px] max-h-[120px] pl-4 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-green-500/50 text-sm sm:text-base text-white placeholder-white/40 transition-all resize-none"
                      placeholder="Ask anything about your weight data..."
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      disabled={loading}
                      required
                    />
                    <div className="absolute right-3 bottom-3 text-xs text-white/40">
                      AI
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !userPrompt.trim()}
                    className="px-4 sm:px-6 py-3 bg-green-700 text-white font-medium rounded-xl transition-all hover:bg-green-600 active:scale-95 disabled:opacity-50 disabled:hover:bg-green-700 text-sm sm:text-base flex items-center gap-2 min-w-[80px] justify-center"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Send"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}