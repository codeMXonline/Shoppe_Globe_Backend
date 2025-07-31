const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

dotenv.config();
const userRoutes = require('./routes/userRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/api/users', userRoutes);  
// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB and start server
mongoose.connect('mongodb://127.0.0.1:27017/shoppyglobe', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
