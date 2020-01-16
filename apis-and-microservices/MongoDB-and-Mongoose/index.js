require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, function (err) { 
  if (err) throw err;
  console.log('Successfully connected');
}); 

var userSchema = new mongoose.Schema( {
    name: { type: String, default: "Анонимный" },
    age: { type: Number, min: 18, index: true },    
    date: { type: Date }    
});

const userModel = mongoose.model("UserSchema", userSchema);

//var createAndSaveUser = function(done) {
  var ivanPetrov = new User({name: "Ivan Petrov", age: 25, date: 12-07-2019});
  console.log(ivanPetrov);
  ivanPetrov.save(function(err) {
    if (err) return console.error(err);
    //done(null, data)
    console.log('Author successfully saved.');
  });
//};

/*
//Массив объектов
var arrayUsers = [
  {name: "Светлана", age: 21, date: 19-05-2019},
  {name: "Kamila", age: 35, date: 28-07-2019},
  {name: "Олег", age: 27, date: 01-03-2019}
];

var createManyUser = function(arrayUsers, done) {
  User.create(arrayUsers, function (err, user) {
    if (err) return console.log(err);
    done(null, user);
  });
};
*/