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
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  //Если при соединении с БД происходит ошибка, то выбрасывается исключение, и все дальнейшее исполнение функции прерывается.
  if (err) throw err;
  //Если соединение с БД выполнено успешно выводится сообщение 'БД подключена'
  console.log('БД подключена');
});
```
В функции `connect()` первый параметр `process.env.MONGO_URI` - это URI для подключения приложения к БД (в данном случае значение свойства MONGO_URI хранится в файле `.env`). Вторым параметром в функции `connect()` является необязательный объект опций. Третий параметр - это функция обратного вызова, которая будет вызвана после попытки соединения с базой данных.

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

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) throw err;
  console.log('БД подключена');
});

//Создание схемы
var userSchema = new mongoose.Schema({
  name: { type: String, default: "Анонимный" },
  age: { type: Number, min: 18, index: true }
});

//Создание модели из схемы.
const UserModel = mongoose.model("UserModel", userSchema);
```

Каждое поле в `mongoose.Schema` характеризуется типом и может иметь дополнительные характеристики: `default`, `min` и `max` (для Number), `match` и `enum` (для String), `index` и `unique` (для индексов). Подробнее о типах можно почитать [тут](https://mongoosejs.com/docs/schematypes.html).

В функции `mongoose.model` первый параметр - это имя модели, второй параметр - имя схемы, из которой создается модель.

Схемы - это строительный блок для моделей. Модель позволяет создавать экземпляры ваших объектов, называемых документами.

## Создание и сохранение записи модели

```js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) throw err;
  console.log('БД подключена');
});

var userSchema = new mongoose.Schema({
  name: { type: String, default: "Анонимный" },
  age: { type: Number, min: 18, index: true }
});

const UserModel = mongoose.model("UserModel", userSchema);

//Создание объекта модели
var ivanPetrov = new UserModel({ name: "Ivan Petrov", age: 25, date: 12 - 07 - 2019 });

//Сохранение объекта модели в БД
ivanPetrov.save(function (err) {
  if (err) return console.error(err);
  console.log('Пользователь сохранен');
});
```

## Создание нескольких записей с помощью model.create()

```js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) throw err;
  console.log('БД подключена');
});

var userSchema = new mongoose.Schema({
  name: { type: String, default: "Анонимный" },
  age: { type: Number, min: 18, index: true }
});

const UserModel = mongoose.model("UserModel", userSchema);

var ivanPetrov = new UserModel({ name: "Ivan Petrov", age: 25, date: 12 - 07 - 2019 });

ivanPetrov.save(function (err) {
  if (err) return console.error(err);
  console.log('Пользователь сохранен');
});

//Массив объектов
var arrayUsers = [
  { name: "Светлана", age: 21 },
  { name: "Kamila", age: 35 },
  { name: "Олег", age: 27 }
];

UserModel.create(arrayUsers, function (err, user) {
  if (err) return console.log(err);
  console.log('Пользователи созданы');
});
```

## Использование model.find() для поиска в базе данных

В файл `index.js` скопируйте следующий код.

```js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) throw err;
  console.log('БД подключена');
});

var userSchema = new mongoose.Schema({
  name: { type: String, default: "Анонимный" },
  age: { type: Number, min: 18, index: true }
});

const UserModel = mongoose.model("UserModel", userSchema);

var ivanPetrov = new UserModel({ name: "Ivan Petrov", age: 25, date: 12 - 07 - 2019 });

ivanPetrov.save(function (err) {
  if (err) return console.error(err);
  console.log('Пользователь сохранен');
});

var arrayUsers = [
  { name: "Светлана", age: 21 },
  { name: "Kamila", age: 35 },
  { name: "Олег", age: 27 }
];

UserModel.create(arrayUsers, function (err, user) {
  if (err) return console.log(err);
  console.log('Пользователи созданы');
});

//Поиск в БД
UserModel.find({name: "Светлана"}, function (err, userFound) {
  if (err) return console.log(err);
  console.log('В базе данных найдено следующее: ');
  console.log(userFound);
});
```

Первый параметр в функции `find()` - это селектор в виде объекта, который указывает, что нужно искать в базе данных. Если селектор не указан, возвращаются все документы из БД. Вторым параметром в функции `find()` является функция обратного вызова.

Функция `find()` находит и возвращает все документы, соответствующие селектору. Результатом будет массив документов.

Если в результате будет слишком много документов, чтобы поместиться в памяти, используйте функцию `cursor()`


## Использование `model.findOne()` для возвращения одного документа из базы данных

`findOne()` ведет себя как `.find()`, но возвращает только один документ (не массив), даже если элементов несколько. Это особенно полезно при поиске по свойствам, которые вы объявили уникальными.







Найдите только одного человека, у которого есть определенная еда в фаворитах человека, используя `Model.findOne() -> Person`. Используйте аргумент функции food в качестве ключа поиска.





MongoDB, как и MySQL, может содержать множество баз данных, но вместо таблиц базы данных MongoDB содержат “коллекции”.
Коллекция - это что-то типа таблицы, только без колонок. Вместо этого каждая строка содержит наборы записей в виде ключ:значение.


Найденые ресурсы

* http://www.coldfox.ru/article/5be022d49227d914a1c83fe3/%D0%9F%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%BE%D0%B5-%D1%80%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE-%D0%BF%D0%BE-MongoDB-Mongoose

* https://metanit.com/nosql/mongodb/


Используемые ресурсы

* https://code.tutsplus.com/ru/articles/an-introduction-to-mongoose-for-mongodb-and-nodejs--cms-29527

* http://stepansuvorov.com/blog/2012/11/mongoose-%D0%B4%D0%BB%D1%8F-mongodb/

* https://developer.mozilla.org/ru/docs/Learn/Server-side/Express_Nodejs/mongoose