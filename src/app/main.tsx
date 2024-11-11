import ReactDOM from 'react-dom/client'

import '../styles/index.css'

import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Providers from '../components/providers/providers'
import Routes from './router/routes'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <Providers>
//       <Routes />
//     </Providers>
//   </React.StrictMode>,
// )

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <React.StrictMode>
      <Providers>
        <Routes />
      </Providers>
    </React.StrictMode>
  </StrictMode>,
)
