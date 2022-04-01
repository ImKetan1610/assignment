const express = require("express");

const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/library");
};

const bookSchema = new mongoose.Schema(
  {
    bookName: { type: String, required: true },
    body: { type: String, required: false },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = mongoose.model("book", bookSchema);

app.get("/books", async (req, res) => {
  try {
    const book = await Book.find().lean().exec();
    console.log("books are here");
    return res.status(200).send(book);
  } catch (error) {
    return res.status(500).send("error", error.message);
  }
});

app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    return res.status(201).send({ book: book });
  } catch (error) {
    return res.status(500).send("error", error.message);
  }
});

const sectionSchema = new mongoose.Schema(
  {
    sectionName: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Section = mongoose.model("section", sectionSchema);

app.get("/section", async (req, res) => {
  try {
    const section = await Section.find().lean().exec();
    return res.status(200).send(section);
  } catch (error) {
    return res.status(500).send("error", error.message);
  }
});

app.post("/section", async (req, res) => {
  try {
    const section = await Section.create(req.body);
    return res.status(201).send({ section: section });
  } catch (error) {
    return res.status(500).send("error", error.message);
  }
});

const authorSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Author = mongoose.model("author", authorSchema);

app.get("/author", async (req, res) => {
  try {
    const author = await Author.find().lean().exec();
    return res.status(200).send(author);
  } catch (error) {
    return res.status(500).send("error", error.message);
  }
});

app.post("/author", async (req, res) => {
  try {
    const author = await Author.create(req.body);
    return res.status(201).send({ author: author });
  } catch (error) {
    return res.status(500).send("error", error.message);
  }
});

const checkedOutSchema = new mongoose.Schema(
  {
    checkedOutTime: { type: Date, required: true, default: null },
    checkedInTime: { type: Date, required: true, default: null },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CheckedOut = mongoose.model("checkedOut", checkedOutSchema);

app.get("/checkedOut", async (req, res) => {
  try {
    const checkedOut = await CheckedOut.find().lean().exec();
    return res.status(200).send(checkedOut);
  } catch (error) {
    return res.status(500).send("error", error.message);
  }
});

app.post("/checkedOut", async (req, res) => {
  try {
    const checkedOut = await CheckedOut.create(req.body);
    return res.status(201).send({ checkedOut: checkedOut });
  } catch (error) {
    return res.status(500).send("error", error.message);
  }
});

app.listen(1610, async () => {
  try {
    await connect();
    console.log("Listening on Port 1610");
    console.log("here");
  } catch (error) {
    console.log("error:", error);
  }
});
