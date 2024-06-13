import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
import "@testing-library/jest-dom/extend-expect";
import { display } from "@mui/system";
import { Opacity } from "@mui/icons-material";

describe("Testing in Login Form", () => {
  test("Testing email", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    const element = await screen.findByPlaceholderText("Email");
    expect(element).toBeInTheDocument();
  });

  test("Testing using query", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </Provider>
    );
    const element = screen.queryByText("account", { exact: false });
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
    const element = screen.queryByPlaceholderText("Password");
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
    const element = screen.queryAllByPlaceholderText("passoword", {
      exact: false,
    });
    expect(element).toBeVisible();
  });
});
