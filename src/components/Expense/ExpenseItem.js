import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./ExpenseItem.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpenseHandler, editExpenseHandler } from "../../store/expense-action";

const ExpenseItem = (props) => {
  const email=useSelector(state=>state.auth.email);
  const dispatch=useDispatch();
const editHandler=(id)=>{   
  dispatch(editExpenseHandler(email,id));
}
const deleteItemHandler=id=>{
  dispatch(deleteExpenseHandler(email,id));
}
  return (
    <div className="expense-item">
      <h3>{props.desc}</h3>
      <p>Amount:{props.money}</p>
      <p>category:{props.category}</p>
      <button
        className="delete"
        onClick={() => deleteItemHandler(props.id)}
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
