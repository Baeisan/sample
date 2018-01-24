var mongoose = require('mongoose');

const userSchema = mongoose.Schema;
const imgSchema = mongoose.Schema;

const apply = new userSchema({
  name: {type: String, required: true},
  major: {type: String, required: true, trim: true},
  studentnumber: {type: String, required: true, trim: true},
  grade: {type: String, required: true},
  motive: String,
  phonenumber: {type: String, required: true, trim: true},
  applyDate: {type: Date, default: new Date()}
});

// const timetableimg = new imgSchema({
//   width: Number,
//   height: Number
// });

module.exports = mongoose.model('apply', apply);
