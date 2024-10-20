const express = require('express');
const router = express.Router();
const multer = require('multer');

const uploadmMiddelware = multer({ 
    limits: {
        fileSize: 1000000
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'routes/uploads/')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }),
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})


router.post('/upload', uploadmMiddelware.single('upload'), (req, res) => {
    if(!req.file) {
        return res.send({error: 'Please upload a file'})
    }
    return res.send({
        message: 'File uploaded successfully',
        file: req.file
    })
})

router.get('/:file', (req, res) => {
    res.sendFile(__dirname  + '/uploads/' + req.params.file)
})


module.exports = router;