import { findByRole, findByText, render, screen } from "@testing-library/react";
import ForgetPasswrod from "./ForgetPasswrod";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("renders check email after sending request", async () => {
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({});
  render(
    <BrowserRouter>
      <ForgetPasswrod />
    </BrowserRouter>
  );
  //  act
  const btn = screen.getByRole("button");
  userEvent.click(btn);

  const element = await screen.findByText(
    "email",
    { exact: false },
    { timeout: 2000 }
  );
  expect(element).toBeInTheDocument();
});
