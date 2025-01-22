const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const { v4: uuidv4 } = require("uuid");

mongoose.connect("mongodb+srv://saharbanua2023cse:Munna2005@cluster0.wq7to.mongodb.net/expenses").then(()=>{
    console.log("Connected to MongoDB");
});
const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: String, required: true },
});

const Expense = mongoose.model("Expense", expenseSchema);
// const expenses = [
//   {
//     id: 1,
//     title: "Food",
//     amount: 200,
//   },
//   {
//     id: 2,
//     title: "Truf",
//     amount: 500,
//   },
// ];
app.get("/api/expenses", async (req, res) => {
  const expenses = await Expense.find();
  try {
    if (!expenses) {
      res.status(406).send({ message: "No expense found" });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ massage: "Internal Server Error" });
  }
});

app.get("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findOne({ id });
    if (!expense) {
      res.status(404).json({ message: "Not Found" });
      return;
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
});

app.post("/api/expenses", async (req, res) => {
  const { title, amount } = req.body;
  try {
    if (!title || !amount) {
      res.status(400).json({ message: "Please provide both title and amount" });
      return;
    }
    const newExpense = new Expense({ id: uuidv4(), title, amount });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteExpenses = await Expense.findOneAndDelete({ id });
    if (!deleteExpenses) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const putExpense = await Expense.findOneAndUpdate({ id }, req.body);
    if (!putExpense) {
      res.status(404).json({ message: "Expense not found" });
      return;
    }
    res.status(200).json({ message: "Put Method Completed Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});