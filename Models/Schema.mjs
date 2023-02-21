import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  qtyPerUnit: {
    type: String,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  unitInStock: {
    type: Number,
    required: true
  },
  discontinued: {
    type: Boolean,
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

const Product = mongoose.model('Product', productSchema);




