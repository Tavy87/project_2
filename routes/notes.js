const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notes');
const ensureLoggedIn = require('../config/ensureLoggedIn');


// POST /movies/:id/reviews (create review for a movie)
router.post('/characters/:id/notes', ensureLoggedIn, notesCtrl.create);
router.delete('/notes/:id', ensureLoggedIn, notesCtrl.delete);


module.exports = router;