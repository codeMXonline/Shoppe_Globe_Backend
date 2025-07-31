const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// POST /cart - Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required.' });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const newItem = new CartItem({ productId, quantity });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding to cart.' });
  }
};

// PUT /cart/:id - Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Valid quantity is required.' });
    }

    const updatedItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating cart.' });
  }
};

// DELETE /cart/:id - Delete cart item
const deleteCartItem = async (req, res) => {
  try {
    const deletedItem = await CartItem.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }

    res.json({ message: 'Item removed from cart.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting from cart.' });
  }
};

module.exports = { addToCart, updateCartItem, deleteCartItem };
