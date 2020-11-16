const phone = require('./phone.model');

exports.savePhone = (phoneInfo) => {
  if (phoneInfo == null || Object.keys(phoneInfo).length === 0 || phoneInfo.length <= 0) {
    return Promise.reject(new Error('empty-phone-info'));
  }

  return phone.add(phoneInfo);
};

exports.getPhones = (id) => {
  if (id) {
    console.log('id:', id);
    return phone.getById(id);
  }

  return phone.getList();
};
