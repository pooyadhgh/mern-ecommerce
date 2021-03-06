import { Button, Col, Row, Image, ListGroup, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useEffect } from 'react';

const OrderPage = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();
  const { loading, error, order } = useSelector(state => state.orderDetails);
  const {
    loading: loadingPay,
    error: errorPay,
    success,
  } = useSelector(state => state.orderPay);

  useEffect(() => {
    dispatch({ type: ORDER_PAY_RESET });
    if (!order || order._id !== orderId || success) {
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch, success]);

  const payHandler = event => {
    event.preventDefault();
    if (!order.isPaid) dispatch(payOrder(orderId));
  };

  return (
    <>
      {errorPay && <Message variant="danger">{errorPay}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <h1>Order {order._id}</h1>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map(item => (
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
                            {item.quantity * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Shipping Address</h2>
                <strong>Name:</strong> {order.user.name}, {order.user.email}
                <p>
                  {order.shippingAddress.address},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.city}, {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant="success">
                    Order is delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="danger">
                    Order has not delivered yet
                  </Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">
                    Order is paid successfully on {order.paidAt}
                  </Message>
                ) : (
                  <Message variant="danger">Order has not paid yet</Message>
                )}
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
                    <Col>
                      <strong>Total:</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="d-grid">
                  {loadingPay ? (
                    <Loader />
                  ) : (
                    <Button
                      onClick={payHandler}
                      className="btn-block"
                      type="button"
                      disabled={order.orderItems.length === 0 || order.isPaid}
                    >
                      Pay
                    </Button>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
export default OrderPage;
