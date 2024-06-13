import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import ExpenseForm from "./ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../store/modalSlice";

const ExpenseList = () => {
  const showForm = useSelector((state) => state.modal.show);
  const expenseItems = useSelector((state) => state.expense.items);
  const dispatch = useDispatch();
  const showFormHandler = () => {
    dispatch(modalActions.showModal());
  };
  const totalExpense = expenseItems.reduce((acc, item) => {
    return acc + +item.money;
  }, 0);
  const handleDownload = () => {
    let out = [];
    for (let val in expenseItems[0]) {
      if (val !== "id") {
        out.push(val);
      }
    }
    const datas = expenseItems.map((item) => {
      let values = [];
      for (let val in item) {
        if (val !== "id") values.push(item[val]);
      }
      return values;
    });
    let final = [out, ...datas];

    // to make it downloadable make these values make a fuction that will concat these values to a csv file
    // in the function what we do is we join every cells and for next add a new line for next item property
    function makeCSV(rows) {
      return rows.map((r) => r.join(" ")).join("\n");
    }
    const blob = new Blob([makeCSV(final)], { type: "csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "trial.csv";
    a.click();
  };

  return (
    <div className="add-expense">
      {showForm && <ExpenseForm />}
      <div>
        {!showForm && <button onClick={showFormHandler}>Add Expense</button>}
        {totalExpense > 10000 && (
          <button onClick={handleDownload} className="get-premium">
            Get Premium Features
          </button>
        )}
      </div>
      <ul className="expense-list">
        {expenseItems.map((item, ind) => (
          <ExpenseItem key={ind} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
