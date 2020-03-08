import React from "react";
import { shallow } from "enzyme";

import Counter from "../Counter";

describe("<Counter />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Counter />);
  });

  test("should increment on clicking the button", () => {
    wrapper.find("button").simulate("click");
    expect(wrapper.find("button").text()).toEqual("1");

    wrapper.find("button").simulate("click");
    expect(wrapper.find("button").text()).toEqual("2");
  });
});

/*
 * refinding the components in shallow mode seems to solve the update problem
 * since simulate() simulates nothing, it finds the handler in prop and execute
 * it
 * https://enzymejs.github.io/enzyme/docs/guides/migration-from-2-to-3.html#calling-props-after-a-state-change
 */

/*
 * state updates work as expected with mount and not with shallow probably
 * because of this:
 * https://enzymejs.github.io/enzyme/docs/guides/migration-from-2-to-3.html#for-mount-updates-are-sometimes-required-when-they-werent-before
 */

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
