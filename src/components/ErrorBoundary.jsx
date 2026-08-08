import React from 'react'
import { I18nContext } from '../i18n/I18nContext.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static contextType = I18nContext

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-slate-50 px-4'>
          <div className='max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg'>
            <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary'>{this.context.t('errorBoundary.somethingWentWrong')}</p>
            <h1 className='h2 mb-3'>{this.context.t('errorBoundary.unexpectedError')}</h1>
            <p className='mb-6 text-slate-600'>{this.context.t('errorBoundary.renderFailed')}</p>
            <div className='flex flex-wrap justify-center gap-3'>
                <button
                type='button'
                onClick={this.handleReset}
                className='rounded-full bg-secondary px-5 py-3 text-sm font-semibold text-slate-950 transition-all hover:opacity-90'
              >
                {this.context.t('errorBoundary.retry')}
              </button>
              <button
                type='button'
                onClick={() => window.location.reload()}
                className='rounded-full border border-slate-900/10 px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50'
              >
                {this.context.t('errorBoundary.refresh')}
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
