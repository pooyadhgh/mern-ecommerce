import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;
  const quantity = location.search ? +location.search.split('=')[1] : 1;
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  console.log(cart);

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, quantity));
  }, [dispatch, productId, quantity]);

  return <div>heloo</div>;
};

export default CartPage;
