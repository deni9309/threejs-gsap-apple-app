import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'

import App from './App.jsx'
import './index.css'

Sentry.init({
  dsn: 'https://1b7c76ba14d0ca0394ff2cd08be6890c@o4507222288105472.ingest.de.sentry.io/4508082339119184',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.metrics.metricsAggregatorIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
    }),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
