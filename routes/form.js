const express = require('express')
const router = express.Router()
const multer = require("multer");



const formController = require('../controllers/functions.js')

const upload = multer({
    dest: "./user_images/tmp/"
});

//Mostrar todos los alumnos (GET)
router.get('/', formController.loadForm)
//Crear alumno (POST)
router.post('/validateForm', formController.validateForm)

router.post('/uploadLogoImage', upload.single("file") , formController.loadLogos)

router.post('/uploadBannerImage', upload.single("file") , formController.loadBanner)


router.get('/deleteUserPhotos',formController.deleteUserPhotos)


router.get('/deleteBanner',formController.deleteBanner)

router.post('/deleteLogo',formController.deleteLogo)

module.exports = router