const phone = require('./phone.model');

exports.savePhone = (phoneInfo) => phone.add(phoneInfo);

exports.getPhones = (id) => {
  if (id) {
    return phone.getById(id);
  }

  return phone.getList();
};

exports.updatePhone = (phoneId, phoneInfo) => phone.update(phoneId, phoneInfo);
