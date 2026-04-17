"use client";

import React, { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 bg-background h-full w-full absolute inset-0 z-50">
          <img src="/quacky-sad.png" alt="Quacky sad" className="w-32 h-32 object-contain" />
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-foreground">Oops! Something went wrong.</h1>
            <p className="text-muted-foreground font-medium">Don't worry, even little founders hit bumps in the road.</p>
          </div>
          <Button
            className="font-bold h-12 rounded-xl px-8 shadow-sm"
            onClick={() => window.location.reload()}
          >
            Try Again!
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
