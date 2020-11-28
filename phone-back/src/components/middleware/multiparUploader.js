const multer = require('multer');
const ImgurStorage = require('multer-storage-imgur');
const config = require('../../../config');


const upload = multer({
  storage: ImgurStorage({ clientId: config.imgUrl.clientId })
})


module.exports = (req, res, next) => {
  if(req.headers["content-type"] && req.headers["content-type"].includes('multipart/form-data')) {
    return upload.single('imageFileName')(req,res, next)
  } else {
    next()
  }
}