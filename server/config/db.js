import mongoose from 'mongoose';

// DB configuration
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Mongodb Connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
