import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
import {
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Form,
  Card,
} from 'react-bootstrap';

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;
  const quantity = location.search ? +location.search.split('=')[1] : 1;
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, quantity));
  }, [dispatch, productId, quantity]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    console.log('checkout');
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Cart</h1>
          {cartItems.length === 0 && <Message>Your cart is empty</Message>}

          <ListGroup variant="flush">
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>

                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.quantity}
                      onChange={e => {
                        dispatch(addToCart(item.product, +e.target.value));
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map(qty => (
                        <option key={qty + 1} value={qty + 1}>
                          {qty + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={2}>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total Items:</strong>
                  </Col>
                  <Col>
                    <p>
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total Pice:</strong>
                  </Col>
                  <Col>
                    <p>
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="d-grid">
                <Button
                  onClick={checkoutHandler}
                  className="btn-block"
                  type="button"
                  disabled={cartItems.length === 0}
                >
                  Go To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartPage;
