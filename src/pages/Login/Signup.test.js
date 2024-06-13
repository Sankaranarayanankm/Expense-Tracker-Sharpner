import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Signup from "./Signup";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import store from "../../store";

describe("Testing in Sign-up page", () => {
  test("testing based on placeholder", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
    const element = screen.getByPlaceholderText("password", { exact: false });
    expect(element).toBeInTheDocument();
  });

  test("testing with find", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
    const element = await screen.findByText("signup", { exact: false });
    expect(element).toBeInTheDocument();
  });

  test("using find to get password via placeholder", async () => {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
    const element = await screen.findByPlaceholderText("confirm", {
      exact: false,
    });
    expect(element).toBeInTheDocument();
  });

  test("using find to get email", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </Provider>
    );
    const element = await screen.findByPlaceholderText("email", {
      exact: false,
    });
    expect(element).toBeInTheDocument();
  });
});
