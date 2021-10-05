import { useState, useEffect } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail, updateUserDetail } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfilePage = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.userDetail);
  const { userInfo } = useSelector(state => state.userLogin);
  const { success } = useSelector(state => state.userUpdateProfile);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetail('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, history, dispatch, user]);

  const submitHandler = event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords are not match');
    } else {
      dispatch(updateUserDetail({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>Profile</h2>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && (
          <Message variant="success">Profile updated successfully</Message>
        )}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="confirm-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-3" controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="my-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Orders</h2>
      </Col>
    </Row>
  );
};
export default ProfilePage;
