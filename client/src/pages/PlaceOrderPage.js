import { Button, Col, Row, Image, ListGroup, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const PlaceOrderPage = ({ history }) => {
  const cart = useSelector(state => state.cart);
  if (!cart.paymentMethod) history.push('/payment');
  const dispatch = useDispatch();

  // Calculate prices
  const addDecimals = num => +(Math.round(num * 100) / 100).toFixed(2);

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

  cart.taxPrice = addDecimals((0.15 * cart.itemsPrice).toFixed(2));

  cart.totalPrice = addDecimals(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  );

  const placeOrderHandler = event => {
    event.preventDefault();
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col md={4}>{item.name}</Col>

                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {addDecimals(item.quantity * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>{cart.paymentMethod}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary:</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax Price:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Total:</strong>
                  </Col>
                  <Col>
                    <strong>${cart.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="d-grid">
                <Button
                  onClick={placeOrderHandler}
                  className="btn-block"
                  type="button"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default PlaceOrderPage;
