import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'
import Theme from './themes/Theme'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Theme>
    <App />
  </Theme>,
)
