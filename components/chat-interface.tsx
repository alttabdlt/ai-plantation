"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const text = await res.text();
      // Parse AI SDK data stream format: lines starting with "0:" contain text
      let content = "";
      for (const line of text.split("\n")) {
        if (line.startsWith("0:")) {
          content += JSON.parse(line.slice(2));
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content },
      ]);
    } catch {
      setError("Unable to connect to AI. Please check your API configuration.");
    } finally {
      setIsLoading(false);
    }
  }

  function submitQuestion(q: string) {
    setInput(q);
    // Use a timeout to let the state update, then submit
    setTimeout(() => {
      const form = document.querySelector<HTMLFormElement>("[data-chat-form]");
      form?.requestSubmit();
    }, 50);
  }

  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col">
      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 px-6 py-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4 py-20">
            <div className="flex size-14 items-center justify-center rounded-full border border-border bg-card">
              <Bot className="size-7 text-emerald-500" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">
                Ask me anything about your plantation
              </h3>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                I have access to all your field data, sensor readings, weather
                forecasts, and soil analysis. Ask in plain language.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {[
                "Why is Field D stressed?",
                "What should I do before the rain?",
                "How can I improve yield?",
                "Which fields need attention?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => submitQuestion(q)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
            >
              {m.role === "assistant" && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Bot className="size-4 text-emerald-500" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-card-foreground"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
              {m.role === "user" && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <User className="size-4 text-primary" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                <Loader2 className="size-4 animate-spin text-emerald-500" />
              </div>
              <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                Analyzing plantation data...
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="border-t border-border p-4">
        <form data-chat-form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your plantation..."
            className="flex-1 bg-card"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
