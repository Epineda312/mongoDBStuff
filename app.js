//jshint esversion:6

const mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost:27017/fruitsDB");
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

//New fruit Schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({

  rating: 10,
  review: "Peaches are so yummy!"
});

//fruit.save();
//end fruit

//New person Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "John",
  age: 37
});

//person.save();
//end person

//no longer in use, commented out for reference
//add more than one fruit to database at one time
// const kiwi = new Fruit({
//   name: "Kiwi",
//   score: 10,
//   review: "The best fruit!"
// });
//
// const orange = new Fruit({
//   name: "orange",
//   score: 10,
//   review: "Too sour for me"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   score: 3,
//   review: "Weird texture"
// });

// Fruit.insertMany( [kiwi, orange, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else{
//     console.log("Successfully saved all the fruits to fruitsDB");
//   }
// });
//End insert many code block


Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  } else{

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

//Update method
// Fruit.updateOne({_id: "5f371f0a0f1937216c69abc1"}, {name: "Orange"}, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully updated the document.");
//   }
// });
//End Update Method

//Delete method
// Fruit.deleteOne({ _id: "5f372fac1ef4b343f0b3ae00"}, function (err) {
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully deleted");
//   }
// });
//End Delete method

//deleteMany Method
// Person.deleteMany({ name: "John"}, function (err) {
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully deleted all the documents");
//   }
// });
//End deleteMany Method

//Rest of the code
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
