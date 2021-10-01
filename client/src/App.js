import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" component={HomePage} exact />
        <Route path="/product/:id" component={ProductPage} exact />
      </Layout>
    </Router>
  );
};

export default App;
