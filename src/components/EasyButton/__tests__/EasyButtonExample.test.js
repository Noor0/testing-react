import React from "react";
import { mount } from "enzyme";

import EasyButton from "../EasyButton";
import EasyButtonExample from "../EasyButtonExample";

describe("<EasyButtonExample />", () => {
  let wrapper;
  let toggler;

  beforeEach(() => {
    wrapper = mount(<EasyButtonExample />);
    toggler = wrapper.find("button").filterWhere(n => {
      return n.text().includes("Toggle theme:");
    });
  });

  test("should toggle theme", () => {
    expect(toggler).toIncludeText("light");
    toggler.simulate("click");
    expect(toggler).toIncludeText("dark");
  });

  test("<EasyButton /> should change styles according to theme", () => {
    expect(
      wrapper
        .find(EasyButton)
        .find("button")
        .prop("style")
    ).toEqual({
      backgroundColor: "white",
      color: "black"
    });

    toggler.simulate("click");

    expect(
      wrapper
        .find(EasyButton)
        .find("button")
        .prop("style")
    ).toEqual({
      backgroundColor: "black",
      color: "white"
    });
  });
});

/* 
 // extracting out child components to variables causes issues with state updates
 // with context or maybe it happens always
 * https://enzymejs.github.io/enzyme/docs/guides/migration-from-2-to-3.html#calling-props-after-a-state-change
 * since i'm using props to check styles it's required to use find() after
 * updating the component
 */
