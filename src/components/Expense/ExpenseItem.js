import React, { useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./ExpenseItem.css";
import { expenseContext } from "../../Context/ExpenseContextProvider";

const ExpenseItem = (props) => {
  const expenseCtx = useContext(expenseContext);
const editHandler=(id)=>{
  // console.log(id)/
  expenseCtx.editItem(id);
}
  return (
    <div className="expense-item">
      <h3>{props.desc}</h3>
      <p>Amount:{props.money}</p>
      <p>category:{props.category}</p>
      <button
        className="delete"
        onClick={() => expenseCtx.deleteItem(props.id)}
      >
        <DeleteOutlineIcon />
      </button>
      <button onClick={()=>editHandler(props.id)} className="edit">
        <EditIcon />
      </button>
    </div>
  );
};

export default ExpenseItem;
