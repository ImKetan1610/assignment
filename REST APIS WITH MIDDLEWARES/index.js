const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false");
};

const booksSchema = new mongoose.Schema(
  {
    name: { type : String, required: true },
    body: { type : String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Book = mongoose.model("book", booksSchema);

app.get("/books", allBooks, async (req, res) => {
    try{
        const books = await Book.find().lean().exec();
        return res.send({ book: books });
    }catch(err){
        return res.status(500).send(err.message);
    }

});

app.get("/books/:name", async (req, res) => {
  try {
    const book = await Book.findOne({"req.name" :"req.params.name"}).lean().exec();
    return res.status(200).send({ book: book});
  } catch (error) {
    console.log("error:", error);
    return res.status(500).send(error.message);
  } 
});

app.post("/books", async (req, res) => {
  try {
    const books = await Book.create(req.body);
    return res.status(201).send({ book: books });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// app.get

function allBooks(req, res, next) {
  console.log("Fetching all Books");
  next();
}

app.listen(1234, async () => {
    try{
        await connect();
        console.log("listening on port 1234");
    }
    catch(err){
        return res.status(500).send(error.message);
    }   
});
