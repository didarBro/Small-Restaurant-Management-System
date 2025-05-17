const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  name: String,
  price: Number
}, { _id: false });

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: {
    type: String,
    required: true,
    enum: ['Starter', 'Main Course', 'Dessert', 'Drink', 'Side']
  },
  price: {
    type: Number,
    required: function () {
      return this.variants.length === 0;
    }
  },
  variants: [VariantSchema],
  imageUrl: String,
  isAvailable: { type: Boolean, default: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MenuItem', MenuItemSchema);
