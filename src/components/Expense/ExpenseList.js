import React, { useContext} from "react";
import ExpenseItem from "./ExpenseItem";
import './ExpenseList.css';
import ExpenseForm from "./ExpenseForm";
import { expenseContext } from "../../Context/ExpenseContextProvider";

const ExpenseList = () => {
 const expenseCtx=useContext(expenseContext);
 
  return (
    <div>
      <ExpenseForm  />
      <ul className="expense-list">
        {expenseCtx.items.map((item, ind) => (
          <ExpenseItem key={ind} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
