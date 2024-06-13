import { useState, useEffect } from "react";
import "./ExpenseForm.css";
import Modal from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addExpenseHandler } from "../../store/expense-action";
import { modalActions } from "../../store/modalSlice";

const ExpenseForm = () => {
  const email = useSelector((state) => state.auth.email);
  const isLoading = useSelector((state) => state.expense.loading);
  const editedItem = useSelector((state) => state.expense.editedItem);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    money: "",
    desc: "",
    category: "",
  });

  useEffect(() => {
    if (editedItem.id) {
      setState({
        money: editedItem.money || "",
        desc: editedItem.desc || "",
        category: editedItem.category || "",
      });
    }
  }, [editedItem]);

  const hideModalHandler = () => {
    dispatch(modalActions.hideModal());
  };

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

    // expenseCtx.addItem(state);
    dispatch(addExpenseHandler(state, email));
    setState({
      money: "",
      desc: "",
      category: "",
    });
  };

  return (
    <Modal>
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
          <select
            value={state.category}
            name="category"
            onChange={changeHandler}
          >
            <option>select catogory</option>
            <option>Food</option>
            <option>Medicine</option>
            <option>Clothing</option>
            <option>Fitness</option>
            <option>Other</option>
          </select>
          <div className="button">
            <button> {isLoading ? "please wait.." : "Add Expense"}</button>
            <button className="modal-cancel" onClick={hideModalHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ExpenseForm;
