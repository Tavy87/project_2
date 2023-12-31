const express = require('express');
const router = express.Router();
const campaignsCtrl = require('../controllers/campaigns');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// This router is mounted to a "starts with" path of '/'

// GET /performers/new (new functionality)
router.get('/campaigns/new', ensureLoggedIn, campaignsCtrl.new);
// POST /performers (create functionality)
// router.get('/:id', ensureLoggedIn, campaignsCtrl.show);
router.post('/campaigns', ensureLoggedIn, campaignsCtrl.create);
// POST /movies/:id/performers (associate a performer with a movie)
router.post('/characters/:id/campaigns', campaignsCtrl.addToGame);

module.exports = router;