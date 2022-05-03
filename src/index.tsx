import './sprite'
import './assets/style/main.scss'
import { createRoot } from 'react-dom/client'
import { App } from './components/App'

const container = document.getElementById('app') as Element
const root = createRoot(container)
root.render(<App />)
