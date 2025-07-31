const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://127.0.0.1:27017/shoppyglobe', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sampleProducts = [
  { name: 'Laptop', price: 69999, description: 'Powerful laptop', stock: 10 },
  { name: 'Headphones', price: 2499, description: 'Noise cancelling', stock: 50 },
  { name: 'Keyboard', price: 999, description: 'Mechanical keyboard', stock: 25 }
];

const insertData = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('✅ Sample products inserted');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error inserting products:', error);
  }
};

insertData();
