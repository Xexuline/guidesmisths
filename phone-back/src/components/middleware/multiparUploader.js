const multer = require('multer');
const ImgurStorage = require('multer-storage-imgur');
const path = require('path')

const upload = multer({
  storage: ImgurStorage({ clientId: process.env.IMGURL_ID })
})


module.exports = (req, res, next) => {
  if(req.headers["content-type"] && req.headers["content-type"].includes('multipart/form-data')) {
    return upload.single('imageFileName')(req,res, next)
  } else {
    next()
  }
}