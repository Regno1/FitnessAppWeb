// src/components/common/ErrorBoundry.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          padding: '2rem',
        }}>
          <div style={{
            background: 'var(--bg-glass)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: 'var(--radius-xl)',
            padding: '3rem',
            maxWidth: 520,
            width: '100%',
            textAlign: 'center',
            backdropFilter: 'blur(12px)',
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>💥</div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.75rem',
            }}>
              Something went wrong
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              lineHeight: 1.6,
            }}>
              An unexpected error occurred. Please try refreshing the page.
            </p>

            {this.state.error && (
              <details style={{
                background: 'rgba(239,68,68,0.07)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
                marginBottom: '1.5rem',
                textAlign: 'left',
                cursor: 'pointer',
              }}>
                <summary style={{
                  color: '#fca5a5',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}>
                  Error details
                </summary>
                <pre style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'var(--font-mono)',
                  marginTop: '0.5rem',
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <button
              onClick={this.handleReset}
              style={{
                background: 'var(--gradient-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 2rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
            >
              🔄 Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
