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

export const getOrderById = async (req, res, next) => {
  const orderId = req.params.id;
  let order;

  try {
    order = await Order.findById(orderId).populate('user', 'name email');
  } catch (err) {
    const error = new HttpError('Could not find order', 500);
    return next(error);
  }

  if (!order) {
    const error = new HttpError('No order found', 404);
    return next(error);
  }

  res.json(order);
};

export const updateOrderToPaid = async (req, res, next) => {
  const orderId = req.params.id;
  let order;

  try {
    order = await Order.findById(orderId);
  } catch (err) {
    const error = new HttpError('Could not find order', 500);
    return next(error);
  }

  if (!order) {
    const error = new HttpError('No order found', 404);
    return next(error);
  }

  order.isPaid = true;
  order.paidAt = Date.now();

  let updatedOrder;
  try {
    updatedOrder = await Order.save();
  } catch (err) {
    const error = new HttpError('Could not save order', 500);
    return next(error);
  }

  res.json(updatedOrder);
};
