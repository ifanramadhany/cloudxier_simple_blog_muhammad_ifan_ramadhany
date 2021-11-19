const axios = require("axios");
const FormData = require("form-data");

function imageKit(req, res, next) {
  if(!req.file) {
    next()
  } else {
    // const fileSize = req.file.size;
    const fileFormat = req.file.mimetype;
    if (fileFormat === 'image/png' || fileFormat === 'image/jpeg') {
    const file = req.file.buffer.toString(`base64`);
    const fileName = req.file.originalname;
  
    // console.log(req.file);
  
    const privateKey = `${process.env.PRIVATE_KEY_IMAGEKIT}`;
    const privateKeyEncode = new Buffer.from(privateKey).toString(`base64`);
    const form = new FormData();
    form.append(`file`, file);
    form.append(`fileName`, fileName);

    axios({
      method: "post",
      url: `${process.env.URL_IMAGE_KIT}`,
      data: form,
      headers: {
        ...form.getHeaders(),
        Authorization: `Basic ${privateKeyEncode}`,
      },
    })
      .then((res) => {
        req.body.imgUrl = res.data.url;
        next();
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
    } else {
      throw ({ name: 'imageInvalid' })
    }
    
  }
}

module.exports = imageKit;
