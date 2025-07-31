const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// POST /cart - Add to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const newItem = new CartItem({ productId, quantity });
    const savedItem = await newItem.save();

    console.log(' Saved cart item:', savedItem); // Add this line
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('❌ Error saving cart item:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// PUT /cart/:id - Update quantity
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await CartItem.findByIdAndUpdate(
      req.params.id,
      { quantity: req.body.quantity },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE /cart/:id - Remove item
router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;
