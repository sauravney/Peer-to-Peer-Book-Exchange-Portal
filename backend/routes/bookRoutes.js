import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// Add a new book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get books by owner
router.get("/owner/:ownerId", async (req, res) => {
  const books = await Book.find({ ownerId: req.params.ownerId });
  res.json(books);
});

// Update a book
router.put("/:id", async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete a book
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

// Toggle rent status
router.patch("/:id/toggle", async (req, res) => {
  const book = await Book.findById(req.params.id);
  book.isRented = !book.isRented;
  await book.save();
  res.json(book);
});

export default router;
