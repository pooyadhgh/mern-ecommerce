import { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const PaymentPage = ({ history }) => {
  const { shippingAddress } = useSelector(state => state.cart);
  if (!shippingAddress) history.push('/shipping');
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const submitHandler = event => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-3">
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              value="Paypal"
              id="Paypal"
              label="Paypal"
              checked
              name="paymentMethod"
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type="radio"
              value="Credit Card"
              id="CreditCard"
              label="Credit Card"
              name="paymentMethod"
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type="radio"
              value="Stripe"
              id="Stripe"
              label="Stripe"
              name="paymentMethod"
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className="my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
export default PaymentPage;
