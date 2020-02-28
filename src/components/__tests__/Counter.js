import React from "react";
import { mount } from "enzyme";

import Counter from "../Counter";

describe("<Counter />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Counter />);
  });

  test("should increment on clicking the button", () => {
    const button = wrapper.find("button");

    button.simulate("click");
    expect(button.text()).toEqual("1");

    button.simulate("click");
    expect(button.text()).toEqual("2");
  });
});

/*
 * not using shallow because there's some bug that doesn't update components that
 * use useState
 * https://github.com/enzymejs/enzyme/issues/2196
 */

/*
 * using .props().onClick() with hook doesn't update state more than once
 * this is also an opened bug as of yet
 * https://github.com/enzymejs/enzyme/issues/2333
 */

/*
 * can mock useState to assert on state changes
 * https://stackoverflow.com/questions/57025753/how-to-set-initial-state-for-usestate-hook-in-jest-and-enzyme
 */
