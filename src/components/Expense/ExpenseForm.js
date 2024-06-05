import { useContext, useEffect, useState } from "react";
import "./ExpenseForm.css";
import { authContext } from "../../Context/authContextProvider";

const ExpenseForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(authContext);
  const [state, setState] = useState({
    money: "",
    desc: "",
    category: "",
  });
  const updatedEmail=authCtx.email.replace(/[@.]/g,'');

  // adding useEffect to get data from the database while reloading the page 
  useEffect(()=>{
    async function getData(){
      try{
        const response=await fetch(`https://expensetracker-90337-default-rtdb.firebaseio.com/${updatedEmail}.json`);
        if(!response.ok){
          const errData=await response.json();
          throw new Error(errData.error.message || 'Failed to get data');
        }
        const resData=await response.json();
        for(let val in resData){
          props.onAddExpense(resData[val]);
        }
      }catch(error){alert(error)};
    }
    getData();
  },[]);


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
    // adding the new item to the database
    async function storeData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://expensetracker-90337-default-rtdb.firebaseio.com/${updatedEmail}.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
          }
        );
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error.message || "Failed to store data");
        }
        const resData = await response.json();
        console.log(resData);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }
    storeData();
    
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
