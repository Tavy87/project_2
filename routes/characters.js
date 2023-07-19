var express = require("express");
var router = express.Router();
const charactersCtrl = require('../controllers/characters');
	
// GET /movies
router.get('/', charactersCtrl.index);
// GET /movies/new
router.get('/new', charactersCtrl.new);
// GET /movies/:id (show functionality) MUST be below new route
// router.get('/:id', charactersCtrl.show);
// POST /movies
// router.post('/', charactersCtrl.create);

module.exports = router;