const express = require('express');
const { updateArcticle, getArticle } = require('../controllers/articleController');

const router = express.Router();

router.get('/:id', getArticle);

router.patch('/:idArticle', updateArcticle);

module.exports = router;
