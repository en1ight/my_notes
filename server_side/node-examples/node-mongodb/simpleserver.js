/**
 * Created by bobrenko on 08.06.2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// URL для соединения, тут же указано имя БД
var url = 'mongodb://localhost:27017/conFusion';
// Метод для коннекта к серверу
MongoClient.connect(url, function (err, db){
  // Выведет ошибку в консоль, или сообщение - connected correctly
  assert.equal(err, null);
  console.log("Connected correctly to server");

  // создаем новый документ из вызванного обьекта db через callback
  var collection = db.collection("dishes");

  // инсертим первую пару ключ:значение в документ
  collection.insertOne({name: "Ultrapizza", description: "test"},
    function (err, result){ // callback функция
      assert.equal(err, null);  // ошибка в консоль
      console.log("After Insert:"); // или сообщение
      console.log(result.ops); // с массивом того, что было доабвлено

      // после инсерта посмотрим, что лежит в документе
      // вызывается специально в коллбеке, что бы док уже существовал
      collection.find({}).toArray(function (err,docs){
        assert.equal(err, null);
        console.log("Found:");
        console.log(docs);

        // еще один колбек - удаление коллекции документов
        db.dropCollection("dishes", function (err, result){
          assert.equal(err,null);
          db.close();
        });// end db.dropCollection
      }); // end collection.find
    }); // end collection.insertOne
}); // end MongoClient.connect