import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUICK = [
  "How do I apply?",
  "Eligibility criteria",
  "Required documents",
  "Application status",
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hi! I'm Saathi, your scholarship assistant. Ask me anything before reaching out to support." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Thanks! Here's a quick answer based on our FAQs. For detailed help, visit the Guidance section." },
      ]);
    }, 600);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-6 z-50 group"
          aria-label="Open chat assistant"
        >
          <span className="absolute inset-0 rounded-full animate-pulse-glow" />
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary shadow-elegant ring-[3px] ring-white transition-transform group-hover:scale-105">
            <MessageCircle className="h-6 w-6 text-primary-foreground" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-gold shadow-gold">
              <Sparkles className="h-2.5 w-2.5 text-accent-foreground" />
            </span>
          </span>
          <span className="absolute right-[4.25rem] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-soft transition group-hover:opacity-100">
            Chat with Saathi
          </span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(92vw,380px)] overflow-hidden rounded-3xl border bg-card shadow-elegant animate-fade-up">
          <div className="bg-gradient-primary p-4 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Saathi Assistant</div>
                  <div className="flex items-center gap-1.5 text-xs opacity-90">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Online now
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1.5 hover:bg-white/15" aria-label="Close chat">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto bg-gradient-soft p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card border rounded-bl-sm"
                    }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {QUICK.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-medium text-primary hover:bg-primary/5"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t bg-card p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <Button type="submit" size="icon" className="rounded-full">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
