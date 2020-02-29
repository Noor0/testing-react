import React from "react";
import { shallow, mount } from "enzyme";

import Login from "../Login";

describe("<Login />", () => {
  const mockOnSubmit = jest.fn();

  let wrapper, username, password, button;

  beforeEach(() => {
    wrapper = mount(<Login onSubmit={mockOnSubmit} />);
    username = wrapper.find("input[name='username']");
    password = wrapper.find("input[name='password']");
    button = wrapper.find("button");
  });

  test("should have username, password and submit button", () => {
    expect(username).toExist();
    expect(password).toExist();
    expect(button).toExist();
  });

  test("should call onSubmit with username and password", () => {
    username.getDOMNode().value = "username";
    password.getDOMNode().value = "password";

    button.simulate("submit", {
      target: {
        elements: {
          username: username.getDOMNode(),
          password: password.getDOMNode()
        }
      }
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: "username",
      password: "password"
    });
  });
});
