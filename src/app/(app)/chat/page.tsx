"use client";

import { TopBar } from "@/components/ui/TopBar";
import { QuackyAvatar } from "@/components/ui/QuackyAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-full">
      <TopBar title="Chat with Quacky" showBack={false} />

      <div className="flex-1 p-4 flex flex-col">
        {/* Messages area */}
        <div className="flex-1 space-y-4 overflow-y-auto pb-4">
          <div className="flex items-end space-x-2">
            <QuackyAvatar state="happy" size="sm" />
            <div className="bg-card border border-border/50 rounded-2xl rounded-bl-none px-4 py-3 max-w-[80%] shadow-sm">
              <p className="text-sm font-medium">Quack! I&apos;m your AI business coach. What do you want to build today?</p>
            </div>
          </div>

          <div className="flex items-end justify-end space-x-2">
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-none px-4 py-3 max-w-[80%] shadow-sm shadow-primary/20">
              <p className="text-sm font-medium">I want to make a lemonade stand!</p>
            </div>
          </div>

          <div className="flex items-end space-x-2">
            <QuackyAvatar state="amazed" size="sm" />
            <div className="bg-card border border-border/50 rounded-2xl rounded-bl-none px-4 py-3 max-w-[80%] shadow-sm">
              <p className="text-sm font-medium">That&apos;s a classic! The first step is figuring out who your customers are. Who usually buys lemonade on a hot day?</p>
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="pt-2 flex items-center space-x-2 bg-background">
          <Input
            placeholder="Type your message..."
            className="flex-1 bg-card border-border/50 h-12 rounded-xl"
          />
          <Button size="icon" className="h-12 w-12 rounded-xl shrink-0 shadow-sm shadow-primary/20">
            <Send className="h-5 w-5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
