const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TYPES = Schema.Types;

const PhoneSchema = new Schema({
  id: { type: TYPES.ObjectId },
  timestamp: { type: TYPES.Date, default: Date.now },
  name: { type: TYPES.String },
  manufacturer: { type: TYPES.String },
  description: { type: TYPES.String },
  color: { type: TYPES.String },
  price: { type: TYPES.Number },
  imageFileName: { type: TYPES.String },
  screen: { type: TYPES.String },
  processor: { type: TYPES.String },
  ram: { type: TYPES.Number },
});

const PhoneModel = mongoose.model('phones', PhoneSchema);

exports.add = async (phoneInfo) => {
  const phone = new PhoneModel(phoneInfo);
  return phone.save();
};

exports.getList = async () => PhoneModel.find({}).select('name manufacturer imageFileName price');

exports.getById = async (id) => PhoneModel.findById(id);

exports.update = async (phoneId, phoneInfo) => PhoneModel.findByIdAndUpdate(phoneId, phoneInfo, { new: true });

exports.delete = async (phoneId) => PhoneModel.findByIdAndDelete(phoneId);
