import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  return (
    <div className="expense-item">
      <h3>{props.desc}</h3>
      <p>Amount:{props.money}</p>
      <p>category:{props.category}</p>
      <button>
        <DeleteOutlineIcon />
      </button>
    </div>
  );
};

export default ExpenseItem;
