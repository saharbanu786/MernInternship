// const express=require('express')

// const app=express()

// const expenses=[{
//     id:1,
//     title:"Food",
//     amount:200},{
//     id:2,
//     title:"top",
//     amount:500
// }];

// app.get('/api/expenses',(req,res)=>{
//     console.log(req.query)
//    res.status(200).json(expenses)
// });
// app.listen(3000,()=>{
//     console.log("Server is running");
    
// })

const express=require('express')
const mongoose = require("mongoose")
const app=express()
app.use(express.json());
const { v4:uuidv4 } =require ('uuid');
 
mongoose.connect("mongodb://localhost:27017/expenses").then(()=>{
    console.log("Connected to MongoDB");
});

const expenseSchema=new mongoose.Schema({
    id:{type:String,requires:true},
    title:{type:String,requires:true},
    amount:{type:String,requires:true}
});
const Expense=mongoose.model("Expense",expenseSchema);

app.get('/api/expenses',async (req,res)=>{
    try{
    const expense=await Expense.find();
    if(!expense){
        res.status(404).send({message:"no expense found"});
    }
    res.status(200).json(expense);
}catch(error){
    res.status(500).json({message:"Internal server error"});
}
});

app.get("/api/expenses/:id",async (req,res)=>{
    const{id}=req.params;
    try{
    const expense=await Expense.findOne(id);
    if(!expense){
        res.status(404).json({message:"Not Found"});
        return 
    }
    res.status(200).json(expense);
}catch(error){
    res.status(500).json({message:"Internal server error"});
}
});


app.post("/api/expenses/:id",async (req,res)=>{
    try{
    console.log(req.body);
    const {title,amount}=req.body;
    if(!title || !amount){
       res.status(400).json({message:"Please provide both title and amount"});
    }
    const newExpense=new Expense({
        id:uuidv4(),
        title:title,
        amount:amount
    })
    const savedExpense= await newExpense.save()
    res.status(201).json(savedExpense)
    res.end();
}catch(error){
    res.status(500).json({message:"Internal server error"});
}
});

app.delete("/api/expenses/:id", async(req,res) => {
    const {id} = req.params;
    try{
      const deleteExpenses= await Expense.findOneAndDelete({id})
      if(!deleteExpenses){
        res.status(404).json({message:"Expense not found"})
        return
      }
      res.status(200).json({message:"Deleted Successfully"})
    }catch(error){
      res.status(500).json({message:"Internal Server Error"})
    }
  })

  app.put("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;    
    try {
        const updatedExpense = await Expense.findOneAndUpdate({id },updateData,{ new: true });    
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }    
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: "Error updating expense", error: error.message });
    }
});


app.listen(3000,()=>{
    console.log("Server is running")
})