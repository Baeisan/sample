var mongoose = require('mongoose');

const userSchema = mongoose.Schema;
const imgSchema = mongoose.Schema;

const apply = new userSchema({
  name: {type: String, required: true},
  major: {type: String, required: true, trim: true},
  studentnumber: {type: Number, required: true, trim: true},
  grade: {type: Number, required: true, min: 1, max: 4},
  motive: String,
  phonenumber: {type: Number, required: true, trim: true},
  applyDate: {type: Date, default: new Date()}
});

// const timetableimg = new imgSchema({
//   width: Number,
//   height: Number
// });

module.exports = mongoose.model('apply', apply);
