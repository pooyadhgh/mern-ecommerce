import Order from '../models/orders.js';
import HttpError from '../models/httpError.js';

export const addOrder = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  try {
    await order.save();
  } catch (err) {
    const error = new HttpError('Could not place order', 500);
    return next(error);
  }

  res.json(order);
};
