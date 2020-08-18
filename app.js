//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//implementing mongoDB
//Connect to mongoDB
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

//New items Schema
const itemsSchema = {
  name: String
};
// end items Schema

//create new documents for database
 const Item = mongoose.model("Item", itemsSchema);

 const item1 = new Item({
   name: "Welcome to your todolist!"
 });

 const item2 = new Item({
   name: "Hit the + button to add a new item."
 });

 const item3 = new Item({
   name: "<--- hit this to delete an item."
 });

 const defaultItems = [item1, item2, item3];
//end document creation

//Start insertMany method
// Item.insertMany(defaultItems, function(err){
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully saved default items to DB.");
//   };
// });
//end insertMany method

//start delete method
// Item.deleteOne({ _id: "5f3b27065322845b2c542d35"}, function (err) {
//   if(err){
//     console.log(err);
//   } else{
//     console.log("Successfully deleted");
//   }
// });
// End Delete method
//end mongoDB implementation

//rest of original code
app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){

    if (foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        } else{
          console.log("Successfully saved default items to DB.");
        }
      });
      res.redirect("/");
    }else {
        res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  });
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
