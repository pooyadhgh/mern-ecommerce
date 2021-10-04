import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(state => state.userLogin);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) history.push(redirect);
  }, [userInfo, history, redirect]);

  const submitHandler = event => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Login</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="my-3" type="submit" variant="primary">
          Sign in
        </Button>
      </Form>

      <Row>
        <Col>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Signup now
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default LoginPage;
