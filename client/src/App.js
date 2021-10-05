import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" component={HomePage} exact />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/cart/:id?" component={CartPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/shipping" component={ShippingPage} />
      </Layout>
    </Router>
  );
};

export default App;
