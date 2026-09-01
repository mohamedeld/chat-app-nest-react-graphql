import { MessageCircle } from "lucide-react";

import { UserAvatar } from "./user-avatar";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <MessageCircle className="h-5 w-5" />
        </div>

        <h1 className="text-lg font-semibold tracking-tight">Chatter</h1>
      </div>

      <UserAvatar />
    </header>
  );
}
