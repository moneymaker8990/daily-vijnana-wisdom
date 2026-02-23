/**
 * ErrorBoundary - React Error Boundary
 *
 * Catches unhandled errors and shows a glass-styled fallback UI.
 */

import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
          <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center shadow-2xl">
            <div className="text-5xl mb-4">🕊️</div>
            <h1 className="text-xl font-serif text-white mb-2">Something went wrong</h1>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              An unexpected error occurred. You can try again or reload the app.
            </p>

            {this.state.error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-left">
                <p className="text-xs text-red-300/80 font-mono break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 py-3 bg-violet-500 hover:bg-violet-400 rounded-xl text-white font-medium shadow-lg shadow-violet-500/25 transition-all"
              >
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white/80 transition-colors"
              >
                Reload App
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
