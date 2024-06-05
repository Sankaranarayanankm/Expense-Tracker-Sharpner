import { useContext, useState,useEffect } from "react";
import "./ExpenseForm.css";
import { expenseContext } from "../../Context/ExpenseContextProvider";

const ExpenseForm = (props) => {
  const expenseCtx = useContext(expenseContext);

  const [state, setState] = useState({
    money: "",
    desc: "",
    category: "",
  });
  const { isLoading } = expenseCtx;

  useEffect(() => {
    if (expenseCtx.editedItem.id) {
      setState({
        money: expenseCtx.editedItem.money || "",
        desc: expenseCtx.editedItem.desc || "",
        category: expenseCtx.editedItem.category || "",
      });
    }
  }, [expenseCtx.editedItem]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    // props.onAddExpense(state);
    // adding the new item to the database
    expenseCtx.addItem(state);
    setState({
      money: "",
      desc: "",
      category: "",
    });
  };

  return (
    <div className="expense-input">
      <form className="expense-form" onSubmit={submitHandler}>
        <h1>Add your Expense</h1>
        <label htmlFor="money">Money</label>
        <input
          type="number"
          name="money"
          id="money"
          onChange={changeHandler}
          value={state.money}
        />
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="desc"
          name="desc"
          value={state.desc}
          onChange={changeHandler}
        />
        <select value={state.category} name="category" onChange={changeHandler}>
          <option>select catogory</option>
          <option>Food</option>
          <option>Petrol</option>
          <option>Medicine</option>
          <option>Clothing</option>
          <option>Internet</option>
          <option>Fitness</option>
          <option>Other</option>
        </select>
        <button> {isLoading ? "please wait.." : "Add Expense"}</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
