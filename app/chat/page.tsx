import { PageShell } from "@/components/PageShell";
import { ChatInterface } from "@/components/chat-interface";

export default function ChatPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl">
        <ChatInterface />
      </div>
    </PageShell>
  );
}
