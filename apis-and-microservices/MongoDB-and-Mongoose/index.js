require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) throw err;
  console.log('БД подключена');
});

var userSchema = new mongoose.Schema({
  _id: { type: Number },
  name: { type: String, default: "Анонимный" },
  age: { type: Number, min: 18, index: true }
});

const UserModel = mongoose.model("UserModel", userSchema);

var ivanPetrov = new UserModel({ _id: 1, name: "Ivan Petrov", age: 25, date: 12 - 07 - 2019 });

ivanPetrov.save(function (err) {
  if (err) return console.error(err);
  console.log('Пользователь сохранен');
});

var arrayUsers = [
  { _id: 2, name: "Светлана", age: 21 },
  { _id: 3, name: "Kamila", age: 35 },
  { _id: 4, name: "Олег", age: 27 }
];

UserModel.create(arrayUsers, function (err) {
  if (err) return console.log(err);
  console.log('Пользователи созданы');
});

UserModel.find({ name: "Светлана" }, function (err, userFound) {
  if (err) return console.log(err);
  console.log('Пользователь' + userFound + 'найден');
});

UserModel.findOne({ name: "Светлана" }, function (err, data) {
  if (err) return console.log(err);
  console.log('Пользователь' + data + 'найден');
});

userId = 4
UserModel.findById(userId, function (err, dat) {
  if (err) return console.log(err);
  console.log('Пользователь c _id = ' + userId + ' найден');
  console.log(dat);
});
