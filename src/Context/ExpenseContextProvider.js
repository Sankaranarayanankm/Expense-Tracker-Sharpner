import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { authContext } from "./authContextProvider";

export const expenseContext = createContext({
  items: [],
  isLoading: false,
  editedItem: {},
  addItem: () => {},
  deleteItem: () => {},
  editItem: () => {},
});
const initialState = {
  items: [],
  isLoading: false,
  editedItem: {},
};
const reducer = (state, action) => {
  if (action.type === "ADD") {
    console.log(action.item);
    const updatedItems = state.items.concat(action.item);
    return {
      ...state,
      items: updatedItems,
      editedItem:{}
    };
  } else if (action.type === "DELETE") {
    const updatedItems = state.items.filter((item) => item.id !== action.id);
    return {
      ...state,
      items: updatedItems,
    };
  } else if (action.type === "EDIT") {
    const updatedItems = state.items.filter(
      (item) => item.id !== action.item.id
    );
    const updatedItem = { ...action.item };
    return {
      ...state,
      items: updatedItems,
      editedItem: updatedItem,
    };

  } else return state;
};

const ExpenseContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const authCtx = useContext(authContext);
  const [isLoading, setIsLoading] = useState(false);
  const updatedEmail = authCtx.email.replace(/[@.]/g, "");
  // adding useEffect to get data from the database while reloading the page
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `https://expensetracker-90337-default-rtdb.firebaseio.com/${updatedEmail}.json`
        );
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error.message || "Failed to get data");
        }
        const resData = await response.json();
        for (let val in resData) {
          dispatch({ type: "ADD", item: { ...resData[val], id: val } });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [updatedEmail]);

  const addExpenseHandler = (item) => {
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
            body: JSON.stringify(item),
          }
        );
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error.message || "Failed to store data");
        }
        const resData = await response.json();
        // props.onAddExpense({...state,id:resData.name});
        dispatch({ type: "ADD", item: { ...item, id: resData.name } });
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    }
    storeData();
  };
  const deleteExpenseHandler = (id) => {
    dispatch({ type: "DELETE", id: id });
    const deleteHandler = async () => {
      const response = await fetch(
        `https://expensetracker-90337-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error.message || "Failed to delete Item");
      }
      console.log("Expense Successfully deleted");
    };
    deleteHandler();
  };
  const editExpenseHandler = (id) => {
    const getItem = async () => {
      const response = await fetch(
        `https://expensetracker-90337-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error.message || "Failed to edit data");
      }
      const resData = await response.json();
      // console.log(data);
      dispatch({ type: "EDIT", item: { ...resData, id } });
    };
    getItem();
    deleteExpenseHandler(id);

  };

  const defaultContext = {
    items: state.items,
    isLoading,
    editedItem: state.editedItem,
    addItem: addExpenseHandler,
    deleteItem: deleteExpenseHandler,
    editItem: editExpenseHandler,
  };
  return (
    <expenseContext.Provider value={defaultContext}>
      {props.children}
    </expenseContext.Provider>
  );
};

export default ExpenseContextProvider;
