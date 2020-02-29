import React from "react";
import { shallow } from "enzyme";

import EasyButton from "../EasyButton";

import { useTheme } from "../theme";

jest.mock("../theme");

describe("<EasyButton />", () => {
  let wrapper;
  let button;

  beforeAll(() => {
    wrapper = shallow(<EasyButton />);
    button = wrapper.find("button");
  });

  it("should use useTheme context hook", () => {
    expect(useTheme).toHaveBeenCalled();
  });

  it("should use styles according to the theme", () => {
    const style = button.prop("style");
    expect(style).toEqual({ backgroundColor: "white", color: "black" });
  });
});

/*
 * Thougts/Opinions:
 * writing these tests for this comopnent doesn't really serve any purpose
 * since it uses context and to write a test that isn't useless would require
 * some sort of implementation of the component within the context provider
 * and asserting on its behavior, which can be done here in the tests and
 * EasyButtonExample component is there probably for the same reason.
 */
