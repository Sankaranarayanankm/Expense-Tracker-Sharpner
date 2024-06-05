import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import './ExpenseList.css';
import ExpenseForm from "./ExpenseForm";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const addExpenseHandler = (item) => {
    setExpenses((prev) => [...prev, item]);
  };
  console.log(expenses);
  return (
    <div>
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <ul className="expense-list">
        {expenses.map((item, ind) => (
          <ExpenseItem key={ind} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
