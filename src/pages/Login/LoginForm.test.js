import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import "@testing-library/jest-dom/extend-expect";

describe("Testing in Login Form", () => {
  test("Testing using query", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    const element = screen.queryByText("Don't have an account?", {
      exact: false,
    });
    expect(element).toBeInTheDocument();
  });

  test("Testing using query ", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    const element = screen.queryByPlaceholderText("email", { exact: false });
    expect(element).toBeVisible();
    // this checks weather the element is visible or not (not visible means css property display-none Opacity-0 or visibility-hidden )
  });

  test("Testing using query", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    const element = screen.queryByPlaceholderText("password", {
      exact: false,
    });
    expect(element).toBeVisible();
  });
});
