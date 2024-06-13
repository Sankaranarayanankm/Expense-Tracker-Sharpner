import { render, screen } from "@testing-library/react";
import AboutUs from "./AboutUS";
import { Provider } from "react-redux";
import store from "../../store";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

describe("Testing About us Page", () => {
  test("testing about us page", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AboutUs />
        </BrowserRouter>
      </Provider>
    );
    const element = screen.getByText(/About/i);
    expect(element).toBeInTheDocument();
  });
  test("testing to find join our community", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <AboutUs />
        </BrowserRouter>
      </Provider>
    );
    const element = screen.getByText("Join our Community", { exact: false });
    expect(element).toBeInTheDocument();
  });
  
});
