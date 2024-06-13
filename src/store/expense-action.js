import { expenseAction } from "./expenseSlice";
import { modalActions } from "./modalSlice";
import { toast } from "react-hot-toast";

export function addExpenseHandler(item, email) {
  const updatedEmail = email.replace(/[@.]/g, "");

  return async (dispatch) => {
    dispatch(expenseAction.loadingHandler(true));
    const sendRequest = async () => {
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
      return resData;
    };

    try {
      const data = await sendRequest();
      // console.log( data);
      dispatch(expenseAction.addItem({ ...item, id: data.name }));
      toast.success("Added new Expense");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(expenseAction.loadingHandler(false));
    }
  };
}

export function deleteExpenseHandler(email, id) {
  const updatedEmail = email.replace(/[@.]/g, "");
  return async (dispatch) => {
    dispatch(expenseAction.loadingHandler(true));
    async function sendRequest() {
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
    }
    try {
      await sendRequest();
      console.log(updatedEmail, id);
      dispatch(expenseAction.deleteItem(id));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(expenseAction.loadingHandler(false));
    }
  };
}

export const editExpenseHandler = (email, id) => {
  const updatedEmail = email.replace(/[@.]/g, "");
  return async (dispatch) => {
    // create function to send http request
    async function sendRequest() {
      const response = await fetch(
        `https://expensetracker-90337-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error.message || "Failed to edit data");
      }
      const data = await response.json();
      console.log(data);
      return data;
    }
    try {
      const data = await sendRequest();
      console.log(data);
      dispatch(expenseAction.setEditedItem({ ...data, id }));
      dispatch(modalActions.showModal());
      dispatch(deleteExpenseHandler(email, id));
    } catch (error) {
      console.log(error);
    }
  };
};

export function getExpenseData(email) {
  const updatedEmail = email.replace(/[@.]/g, "");
  return async (dispatch) => {
    async function sendRequest() {
      const response = await fetch(
        `https://expensetracker-90337-default-rtdb.firebaseio.com/${updatedEmail}.json`
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error.message || "Failed to get data");
      }
      const resData = await response.json();
      return resData;
    }
    try {
      const data = await sendRequest();
      for (let val in data) {
        dispatch(expenseAction.addItem({ ...data[val], id: val }));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
