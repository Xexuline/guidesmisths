const path = require('path')
const fs = require('fs')
const { promisify } = require('util')

const removeFileAsync = promisify(fs.unlink)
const phone = require('./phone.model');

const removeFile = async (file) => {
  try {
    await removeFileAsync(path.resolve(__dirname,`../../../public/uploads/${file}`))
  } catch { }
  return
}

exports.savePhone = (phoneInfo) => phone.add(phoneInfo);

exports.getPhones = (id) => {
  if (id) {
    return phone.getById(id);
  }

  return phone.getList();
};

exports.updatePhone = async (phoneId, phoneInfo) => {
if(phoneInfo.imageFileName) {
    const oldPhoneInfo = await this.getPhones(phoneId)
    await removeFile(oldPhoneInfo.imageFileName)
  }
  return await phone.update(phoneId, phoneInfo)
};

exports.removePhone = async (phoneId) => {
  const deletedPhone = await phone.delete(phoneId);
  await removeFile(deletedPhone.imageFileName)

  return deletedPhone
}
