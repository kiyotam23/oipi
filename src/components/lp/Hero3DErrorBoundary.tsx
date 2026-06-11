"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Hero3DErrorBoundaryProps {
  children: ReactNode;
}

interface Hero3DErrorBoundaryState {
  hasError: boolean;
}

export class Hero3DErrorBoundary extends Component<
  Hero3DErrorBoundaryProps,
  Hero3DErrorBoundaryState
> {
  state: Hero3DErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): Hero3DErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Hero 3D viewer failed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="relative h-full w-full min-h-[inherit] bg-sage/15"
          aria-hidden
        />
      );
    }

    return this.props.children;
  }
}
