import './styles/reset.css'
import './styles/styles.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'

import { DogsProvider } from './context/dogs'

const domNode = document.getElementById('root')
const root = createRoot(domNode)

root.render(
    <BrowserRouter>
        <DogsProvider>
            <App />
        </DogsProvider>
    </BrowserRouter>
)
