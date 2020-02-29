import React from "react";
import { shallow, mount } from "enzyme";

import Login from "../Login";

describe("<Login />", () => {
  const mockOnSubmit = jest.fn();

  const getUsernameField = wrapper => wrapper.find("input[name='username']");
  const getPasswordField = wrapper => wrapper.find("input[name='password']");
  const getButton = wrapper => wrapper.find("button");

  beforeEach(() => {
    mockOnSubmit.mockReset();
  });

  test("should have username, password and submit button", () => {
    const wrapper = shallow(<Login />);

    const username = getUsernameField(wrapper);
    const password = getPasswordField(wrapper);
    const button = getButton(wrapper);

    expect(username).toExist();
    expect(password).toExist();
    expect(button).toExist();
  });

  test("should call onSubmit with username and password", () => {
    const wrapper = mount(<Login onSubmit={mockOnSubmit} />);

    const username = getUsernameField(wrapper);
    const password = getPasswordField(wrapper);

    username.getDOMNode().value = "username";
    password.getDOMNode().value = "password";

    wrapper.simulate("submit");

    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: "username",
      password: "password"
    });
  });
});
