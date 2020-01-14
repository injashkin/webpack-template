require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 

var userSchema = new mongoose.Schema( {
    name: { type: String, default: "Анонимный" },
    age: { type: Number, min: 18, index: true },    
    date: { type: Date }    
});

const userModel = mongoose.model("UserSchema", userSchema);

//Создание экземпляра модели и сохранение его в БД
var createAndSavePerson = function(done) {
  var ivanPetrov = new Person({name: "Ivan Petrov", age: 25, date: 12-07-2019});	

  ivanPetrov.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
