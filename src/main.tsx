import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const { VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENTID: clientId, VITE_AUTH0_AUDIENCE: audience } = import.meta.env
const redirectUri = window.location.origin + '/Home'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience
      }}>
      <App />
    </Auth0Provider>
  </React.StrictMode >,
)
