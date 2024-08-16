const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new post
router.post('/create', async (req, res) => {
  const { title, imageUrl, artistId } = req.body;

  try {
    const newPost = new Post({ title, imageUrl, artist: artistId });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
});

module.exports = router;
