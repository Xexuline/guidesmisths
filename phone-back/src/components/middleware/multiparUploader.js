const multer = require('multer');
const path = require('path')
// const upload = multer({ dest: `${__dirname}/public/uploads`})
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../../../public/uploads'))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`.replace(/[^A-Za-z0-9 ]/, '')
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })


module.exports = (req, res, next) => {
  if(req.headers["content-type"] && req.headers["content-type"].includes('multipart/form-data')) {
    return upload.single('imageFileName')(req,res, next)
  } else {
    next()
  }
}