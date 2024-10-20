const express = require('express');
const app = express();
const multer = require('multer')

const uploadmMiddelware = multer({ 
    limits: {
        fileSize: 1000000
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
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


app.post('/upload', uploadmMiddelware.single('upload'), (req, res) => {
    if(!req.file) {
        return res.send({error: 'Please upload a file'})
    }
    return res.send({
        message: 'File uploaded successfully',
        file: req.file
    })
})

app.get('/uploads/:file', (req, res) => {
    res.sendFile(__dirname  + '/uploads/' + req.params.file)
})





app.listen(9090, () => {
    console.log("Server is running on port 9090")
})