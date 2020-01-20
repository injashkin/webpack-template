require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) throw err;
  console.log('БД подключена');
});

var userSchema = new mongoose.Schema({  
  name: { type: String, default: "Анонимный" },
  age: { type: Number, min: 18, index: true },
  favoriteFoods: [String]
});

const UserModel = mongoose.model("UserModel", userSchema);

//Создание объекта модели, т. е. документа
var ivanPetrov = new UserModel({ name: "Ivan Petrov", age: 25, favoriteFoods: ["чипсы", "кока-кола"] });

//Сохранение документа в БД
ivanPetrov.save(function (err, data) {
  if (err) return console.error(err);
  console.log('Пользователь с именем ' + data.name + ' сохранен');
});

/*
//Массив, из которого данные будут помещены в БД
var arrayUsers = [
  { name: "Светлана", age: 21, favoriteFoods: ["чипсы", "кофе"] },
  { name: "Kamila", age: 35, favoriteFoods: ["гамбургер", "кока-кола"] },
  { name: "Олег", age: 27, favoriteFoods: ["роллы", "кофе"] }
];

UserModel.create(arrayUsers, function (err, users) {
  if (err) return console.log(err);
  console.log('В базе данных созданы ' + users.length + ' документа');
});


var userName = "Светлана";

UserModel.find({ name: userName }, function (err, data) {
  if (err) return console.log(err);
  console.log('Все пользователи с именем ' + userName + ' найдены. Их всего ' + data.length);
});


UserModel.findOne({ name: "Светлана" }, function (err, data) {
  if (err) return console.log(err);
  console.log('Пользователь ' + data.name + ' найден');
});
*/
/*
var userId = "5e24c27a0d07d02119c39ed7";

UserModel.findById(userId, function (err, data) {
  if (err) return console.log(err);
  console.log('Пользователь c id = ' + data._id + ' найден, его зовут ' + data.name + ', ему ' + data.age + ' лет');
});
*/
/*
UserModel.findById(userId, function (err, data) {
  if (err) return console.log(err);
  console.log('Пользователь c id = ' + data._id + ' найден, его зовут ' + data.name);
}).update();
*/
