import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/Database.mjs';


connectDB();

const app = express();

app.use(bodyParser.json());

// Create a new product and category
app.post('/products', async (req, res) => {
  const { categoryName, ...productData } = req.body;

  try {
    const category = await Category.create({ categoryName });
    const product = await Product.create({ ...productData, categoryId: category._id });
    res.json({ product, category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a particular record from the product table
app.get('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('categoryId');
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all the records from the product table
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a particular record of the product
app.put('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a particular record of the product
app.delete('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server listening on port 7000'));