import jwt from 'jsonwebtoken';

export const generateToken = async data => {
  let token;

  try {
    token = await jwt.sign(data, process.env.JWT_KEY);
    return token;
  } catch (err) {
    const error = new HttpError('Verifying Data Failed', 500);
    return next(error);
  }
};
