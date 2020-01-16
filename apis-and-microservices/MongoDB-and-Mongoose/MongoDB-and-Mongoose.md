---
title: Основы MongoDB и Mongoose
data: 08-01-2020
---

## Введение в MongoDB и Mongoose

**MongoDB** - это база данных, которая хранит ваши данные в виде документов для использования приложением. Как правило, эти документы имеют структуру, подобную JSON (JavaScript Object Notation - текстовый формат обмена данными, основанный на JavaScript). Mongo - это нереляционная база данных "NoSQL". Это означает, что Mongo хранит все связанные данные в одной записи, а не хранит их во многих заранее заданных таблицах, как в базе данных SQL. Некоторые преимущества этой модели хранения заключаются в следующем:

* Масштабируемость: по умолчанию нереляционные базы данных распределяются (или "совместно используются") на множество систем, а не только на одну. Это облегчает повышение производительности при меньших затратах.
* Гибкость: новые наборы данных и свойств могут быть добавлены в документ без необходимости создавать новую таблицу для этих данных.
* Репликация: копии базы данных выполняются параллельно, поэтому, если одна из них не работает, одна из копий становится новым основным источником данных.

Хотя существует много нереляционных баз данных, использование Mongo с JSON в качестве структуры хранения документов делает его логичным выбором при изучении бэкенда JavaScript. Доступ к документам и их свойствам подобен доступу к объектам в JavaScript.

**Mongoose.js** - это модуль npm для Node.js, который позволяет вам писать объекты для Mongo так же, как и в JavaScript. Это может облегчить создание документов для хранения в Mongo.

Для создания веб-приложений с помощью базы данных MongoDB вы можете использовать три пути:

1. Использовать собственный компьютер для создания базы данных MongoDB и разработки приложения. Для этого вы должны установить [сервер Node](https://nodejs.org/ru/download/package-manager/) и [сервер базы данных MongoDB](https://docs.mongodb.com/master/installation/) на своем ПК.
2. Использовать облачный сервис MongoDB Atlas для создания базы данных MongoDB, а приложение разрабатывать и запускать на локальном ПК.
3. Использовать облачный сервис MongoDB Atlas для создания базы данных MongoDB, а приложение разрабатывать и запускать на каком-нибудь облачном сервисе, например [Glitch](https://glitch.com).

Здесь будет рассмотрен второй способ.

## Установка и настройка Mongoose и MongoDB

Дальнейшие действия предполагают, что у вас нет своего проекта, и что вы начнете с нуля.

В терминале создайте каталог `myapp` и сделайте его рабочим.

```
md myapp
cd myapp
```

С помощью команды `npm init` создайте файл `package.json`. 

```
npm init
```

Эта команда выдает целый ряд приглашений, например, приглашение указать имя и версию вашего приложения. На данный момент, достаточно просто нажать клавишу ВВОД, чтобы принять предлагаемые значения по умолчанию для большинства пунктов, кроме следующего:

```
entry point: (index.js)
```

Введите app.js или любое другое имя главного файла по своему желанию. Если вас устраивает index.js, нажмите клавишу ВВОД, чтобы принять предложенное имя файла по умолчанию.

Чтобы ваше приложение могло работать с базой данных MongoDB нужно установить драйвер. Установите драйвер MongoDB и его зависимости, выполнив в терминале из каталога `myapp` следующую команду.

```
npm install mongodb
```

Теперь установите модуль mongoose в каталоге `myapp`, набрав следующую команду в терминале.

```
npm install mongoose
```

После установки в каталоге `myapp` будут находится два файла `package.json`, `package-lock.json` и каталог `node_modules`. В файле `package.json` будут добавлены зависимости:

```json
"dependencies": {
    "mongodb": "^3.4.1",
    "mongoose": "^5.8.7"
}
```

## Переменные окружения в файле .env

Для хранения переменных окружения вы будете использовать файл `.env`. Создайте его в корне проекта и скопируйте в него URI базы данных MongoDB Atlas, полученный раннее:

```
MONGO_URI='mongodb+srv://<user>:<password>@cluster0-hsvns.mongodb.net/test?retryWrites=true&w=majority'
```

Обратите внимание: URI окружен одинарными (можно двойными) кавычками; между переменной MONGO_URI и знаком `=`, а также, между знаком `=` и URI не должно быть пробела; замените <user> на имя пользователя, а <password> на свой пароль в MongoDB Atlas. Там не должно быть символов <> (если только они не находятся в вашем пароле).

Обратите внимание, в файле `.env` хранится пароль, поэтому при сохраненинии проекта в репозиторий, данный файл нужно включить в список исключений в файле `.gitignore`.

Для того, чтобы переменные окружения из файла `env` можно было использовать в приложении нужно установить пакет `dotenv`:

```
npm install dotenv
```

В файле `package.json` будет добавлена зависимость:

```json
  "dependencies": {
    "dotenv": "^8.2.0", 
  }
```

Теперь, если вам необходимо использовать какую-нибудь переменную окружения из файла `env` в одном из файлов вашего приложения, вы должны в этом файле просто подключить пакет `dotenv` следующим образом:

```js
require('dotenv').config();
```

Теперь все переменные из файла `.env` будут доступны в `process.env`. Чтобы прочитать значение переменной, например, PASSWORD нужно обратиться к свойству `process.env.PASSWORD`.

## Подключение БД MongoDB

В корне проекта создайте файл `index.js`, в который скопируйте следующий код.

```js 
//Подключение к файлу модуля mongoose под именем mongoose
var mongoose = require('mongoose');
//Использование пакета dotenv для чтения переменных из файла .env в Node
require('dotenv').config();
//Соединение с базой данных
mongoose.connect(process.env.MONGO_URI);
var db = mongoose.connection;
//Если при соединении с БД происходит ошибка выводится сообщение 'MongoDB connection error:'
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//Если соединение с БД выполнено успешно выполняется код в колбек-функции
db.once('open', function() {
  console.log("we're connected!")
});
```

Как только наше соединение откроется, будет вызван наш колбек.

## Создание модели

### CRUD Часть I - создание

CRUD - это сокращение для операций Create, Read, Update and Delete (создать, прочесть, обновить и удалить). Эти операции являются основными для работы с базами данных, таких как MongoDB.

В mongoose все завязано на 2х ключевых понятиях Схема(Schema) – описание сущности и Модель – сама сущность.
Прежде всего вам нужна [схема]https://mongoosejs.com/docs/guide.html. 

Создадайте схему и модель из неё.

В файл `index.js` скопируйте следующий код.

```js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI); 

//Создание схемы
var userSchema = new mongoose.Schema( {
    name: { type: String, default: "Анонимный" },
    age: { type: Number, min: 18, index: true },    
    date: { type: Date }    
});

//Создание модели из схемы.
const User = mongoose.model("User", userSchema);
```

Каждое поле в `mongoose.Schema` характеризуется типом и может иметь дополнительные характеристики: `default`, `min` и `max` (для Number), `match` и `enum` (для String), `index` и `unique` (для индексов). Подробнее о типах можно почитать [тут](https://mongoosejs.com/docs/schematypes.html).

В функции `mongoose.model` первый параметр - это имя модели, второй параметр - имя схемы, из которой создается модель.

Схемы - это строительный блок для моделей. Они могут быть вложенными для создания сложных моделей, но в этом случае мы будем держать вещи простыми. Модель позволяет создавать экземпляры ваших объектов, называемых документами.

## Создание и сохранение записи модели

```js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI); 

var userSchema = new mongoose.Schema( {
    name: { type: String, default: "Анонимный" },
    age: { type: Number, min: 18, index: true },    
    date: { type: Date }    
});

const userModel = mongoose.model("UserSchema", userSchema);

//Создание экземпляра модели и сохранение его в БД
var createAndSaveUser = function(done) {
  var ivanPetrov = new User({name: "Ivan Petrov", age: 25, date: 12-07-2019});
  ivanPetrov.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};
```

## Создание нескольких записей с помощью model.create()

```js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI); 

var userSchema = new mongoose.Schema( {
    name: { type: String, default: "Анонимный" },
    age: { type: Number, min: 18, index: true },    
    date: { type: Date }    
});

const User = mongoose.model("User", userSchema);

var createAndSaveUser = function(done) {
  var ivanPetrov = new User({name: "Ivan Petrov", age: 25, date: 12-07-2019});
  ivanPetrov.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

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
```

## Использование model.find() для поиска в базе данных

Найдите всех людей, имеющих данное имя, используя `model.find()` - > [Person]

В самом простом ее использовании - `model.find()` принимает документ запроса (объект JSON) в качестве первого аргумента, а затем обратный вызов. Он возвращает массив совпадений. Он поддерживает чрезвычайно широкий спектр вариантов поиска. Проверьте это в документах. Используйте аргумент функции `personName` в качестве ключа поиска.

```js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI); 

var userSchema = new mongoose.Schema( {
    name: { type: String, default: "Анонимный" },
    age: { type: Number, min: 18, index: true },    
    date: { type: Date }    
});

const User = mongoose.model("User", userSchema);

var createAndSaveUser = function(done) {
  var ivanPetrov = new User({name: "Ivan Petrov", age: 25, date: 12-07-2019});
  ivanPetrov.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

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

//
var findUserByName = function(userName, done) {
  User.find({name: userName}, function (err, userFound) {
    if (err) return console.log(err);
    done(null, userFound);
  });
};
```






MongoDB, как и MySQL, может содержать множество баз данных, но вместо таблиц базы данных MongoDB содержат “коллекции”.
Коллекция - это что-то типа таблицы, только без колонок. Вместо этого каждая строка содержит наборы записей в виде ключ:значение.


Найденые ресурсы

* http://www.coldfox.ru/article/5be022d49227d914a1c83fe3/%D0%9F%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%BE%D0%B5-%D1%80%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE-%D0%BF%D0%BE-MongoDB-Mongoose

* https://metanit.com/nosql/mongodb/


Используемые ресурсы

* https://code.tutsplus.com/ru/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527

* http://stepansuvorov.com/blog/2012/11/mongoose-%D0%B4%D0%BB%D1%8F-mongodb/

* https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs/mongoose