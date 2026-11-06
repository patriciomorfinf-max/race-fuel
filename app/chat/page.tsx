"use client";

import { useState } from "react";
import { intakeQuestions, generateResponse, humanCheckpoint, type IntakeAnswers } from "@/lib/chatLogic";

interface Message {
  role: "bot" | "user";
  text: string;
  rating?: "up" | "down";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: intakeQuestions[0].text },
  ]);
  const [input, setInput] = useState("");
  const [intakeStep, setIntakeStep] = useState(0);
  const [intake, setIntake] = useState<IntakeAnswers>({ sport: "", duration: "", experience: "" });
  const [intakeDone, setIntakeDone] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);

  function send() {
    if (!input.trim()) return;
    const userText = input.trim();
    const newMessages: Message[] = [...messages, { role: "user", text: userText }];

    if (!intakeDone) {
      const key = intakeQuestions[intakeStep].key as keyof IntakeAnswers;
      const updatedIntake = { ...intake, [key]: userText };
      setIntake(updatedIntake);

      if (intakeStep + 1 < intakeQuestions.length) {
        newMessages.push({ role: "bot", text: intakeQuestions[intakeStep + 1].text });
        setIntakeStep(intakeStep + 1);
      } else {
        newMessages.push({
          role: "bot",
          text: `Got it — a ${updatedIntake.duration}-hour ${updatedIntake.sport}, and this is ${updatedIntake.experience}. Ask me anything about carbs, sodium, fluids, or pricing.`,
        });
        setIntakeDone(true);
      }
    } else {
      const reply = generateResponse(userText, intake);
      newMessages.push({ role: "bot", text: reply });
    }

    setMessages(newMessages);
    setInput("");
  }

  function rate(index: number, rating: "up" | "down") {
    setMessages((prev) => prev.map((m, i) => (i === index ? { ...m, rating } : m)));
    fetch("/api/chat-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message_index: index, rating }),
    });
  }

  async function saveSession() {
    await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...intake, messages }),
    });
    setSessionSaved(true);
  }

  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Guided assistant</h1>
      <p className="mt-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs font-medium text-amber-400">
        {humanCheckpoint}
      </p>

      <div className="mt-6 flex-1 space-y-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                m.role === "user" ? "bg-orange-500 text-slate-950" : "bg-slate-800 text-slate-200"
              }`}
            >
              <p>{m.text}</p>
              {m.role === "bot" && i > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => rate(i, "up")}
                    className={`rounded-md border px-2 py-1 text-xs ${m.rating === "up" ? "border-emerald-400 bg-emerald-500/20 text-emerald-300" : "border-slate-600 text-slate-300 hover:border-slate-400"}`}
                  >
                    👍
                  </button>
                  <button
                    type="button"
                    onClick={() => rate(i, "down")}
                    className={`rounded-md border px-2 py-1 text-xs ${m.rating === "down" ? "border-red-400 bg-red-500/20 text-red-300" : "border-slate-600 text-slate-300 hover:border-slate-400"}`}
                  >
                    👎
                  </button>
                  {m.rating && <span className="text-xs text-slate-400">Thanks for the feedback!</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type your answer..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-white outline-none focus:border-orange-500"
        />
        <button
          onClick={send}
          className="rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-orange-400"
        >
          Send
        </button>
      </div>

      {intakeDone && (
        <button
          onClick={saveSession}
          disabled={sessionSaved}
          className="mt-4 self-start rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-slate-500 disabled:opacity-50"
        >
          {sessionSaved ? "Conversation saved ✓" : "Save this conversation"}
        </button>
      )}
    </main>
  );
}
