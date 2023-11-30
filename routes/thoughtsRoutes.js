const express = require('express')
const router  = express.Router()
const ThoughtController = require('../controllers/ThoughtController')

//helper
const checkAuth = require('../helpers/auth').checkAuth

router.post('/add', checkAuth ,ThoughtController.createThoughtSave)
router.get('/add', checkAuth ,ThoughtController.createThought)
router.get('/edit/:id', checkAuth, ThoughtController.editThought)
router.post('/edit', checkAuth, ThoughtController.updateThought)
router.get('/dashboard', checkAuth ,ThoughtController.dashboard)
router.post('/remove', checkAuth, ThoughtController.removeThought)
router.get('/', ThoughtController.showThoughts)


module.exports = router