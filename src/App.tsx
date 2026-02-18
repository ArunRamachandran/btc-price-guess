import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

const App = () => {
  return (
    <Router basename="/btc-price-guess">
      <AppRoutes />
    </Router>
  )
}

export default App