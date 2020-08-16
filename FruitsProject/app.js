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
//end fruit Schema

//New person Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);
//End new person Schema

//start Pineapple
const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit."
});
// //pineapple.save();
//end Pineapple

//start Amy
// const person = new Person({
//   name: "Amy",
//   age: 18,
//   favoriteFruit: pineapple
// });
//End Amy

//start Plum
const plum = new Fruit({
  name: "Plum",
  score: 10,
  review: "Good Stuff."
});
// plum.save();
//End Plum

//Start John
// const person = new Person({
//   name: "John",
//   age: 37,
//   favoriteFruit: plum
// });
// person.save();
//End John

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

//How to change John's favroite fruit through update method (I changed it above instead)
Person.updateOne({name: "John"}, {favoriteFruit: plum}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated the document");
  }
});
//End Update Method

// Delete method
// Fruit.deleteOne({ _id: "5f3754a085c65f2a94524593"}, function (err) {
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully deleted");
//   }
// });

// Person.deleteOne({ _id: "5f37519df51f790444d737a3"}, function (err) {
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully deleted");
//   }
// });
// End Delete method

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
