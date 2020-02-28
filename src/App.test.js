import React from "react";
import Enzyme, { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import App from "./App";

test("renders learn react link", () => {
  const wrapper = shallow(<App />);
  const linkElement = wrapper.find(".App-link");
  expect(linkElement).toExist();
});

test("test markup", () => {
  const wrapper = shallow(<App />);
  const markup = toJson(wrapper);
  expect(markup).toMatchSnapshot();
});
