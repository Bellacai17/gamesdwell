import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[400px] flex items-center justify-center bg-dark/50 backdrop-blur-sm rounded-lg">
          <div className="text-center p-6 bg-dark/80 rounded-lg">
            <h3 className="text-xl font-tech text-accent mb-2">Something went wrong</h3>
            <p className="text-text-secondary mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="button-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 