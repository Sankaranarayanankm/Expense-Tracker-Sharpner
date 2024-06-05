import { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  console.log(props)
  const [state, setState] = useState({
    money: "",
    desc: "",
    category: "",
  });
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
    props.onAddExpense(state);
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
        <button>Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
