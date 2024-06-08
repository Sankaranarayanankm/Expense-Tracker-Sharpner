import React, { useContext, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import ExpenseForm from "./ExpenseForm";
import { expenseContext } from "../../Context/ExpenseContextProvider";

const ExpenseList = () => {
  const [showForm, setShowForm] = useState(false);
  const showFormHandler = () => setShowForm(true);
  const hideFormHandler = () => setShowForm(false);
  const expenseCtx = useContext(expenseContext);
  const totalExpense = expenseCtx.items.reduce((acc, item) => {
    return acc + +item.money;
  }, 0);
  console.log(totalExpense);

  return (
    <div className="add-expense">
      {showForm && <ExpenseForm hide={hideFormHandler} />}
      <div>
        {!showForm && <button onClick={showFormHandler}>Add Expense</button>}
        {totalExpense > 10000 && <button className="get-premium">Get Premium Features</button>}
      </div>
      <ul className="expense-list">
        {expenseCtx.items.map((item, ind) => (
          <ExpenseItem key={ind} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
