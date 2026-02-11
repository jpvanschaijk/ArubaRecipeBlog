const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Home page
router.get('/', async (req, res) => {
  const recipes = await Recipe.find().sort({ createdAt: -1 });
  res.render('index', { recipes });
});

// Recipe detail
router.get('/recipe/:id', async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) return res.redirect('/');
  res.render('recipe', { recipe });
});

// Submit recipe form
router.get('/create', (req, res) => res.render('create'));

// Create recipe
router.post('/recipes', upload.single('image'), async (req, res) => {
  const { title, description, ingredients, instructions } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : '';

  await Recipe.create({
    title,
    description,
    ingredients: ingredients.split(','),
    instructions,
    image
  });

  res.redirect('/');
});

// Delete recipe
router.post('/recipe/:id/delete', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.redirect('/');
    if (recipe.image) {
      const imagePath = `public${recipe.image}`;
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
});

module.exports = router;
