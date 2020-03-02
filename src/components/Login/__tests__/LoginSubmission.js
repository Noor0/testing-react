import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import { navigate } from "@reach/router";

import LoginSubmission from "../LoginSubmission";
import Login from "../Login";

jest.mock("@reach/router");

const flushPromises = () => new Promise(setImmediate);
const flushPromisesAct = async () =>
  await act(async () => {
    await flushPromises();
  });

describe("<LoginSubmission />", () => {
  const mockFetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({ token: "token" })
  });
  const realFetch = window.fetch;
  const creds = {
    username: "username",
    password: "password"
  };

  let wrapper, onSubmit;

  beforeAll(() => {
    window.fetch = mockFetch;
  });

  beforeEach(() => {
    [mockFetch, navigate].forEach(mock => mock.mockClear());
    window.fetch = mockFetch;
    window.localStorage.clear();
    wrapper = mount(<LoginSubmission />);
    onSubmit = wrapper.find(Login).invoke("onSubmit");
  });

  afterAll(() => {
    window.fetch = realFetch;
  });

  test("should make a fetch request on form submission and save token in local storage", async () => {
    onSubmit(creds);

    // for state update in useEffect after fetch is successful
    await flushPromisesAct();
    wrapper.update();

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/login",
      expect.objectContaining({ body: JSON.stringify(creds) })
    );
    expect(window.localStorage).toHaveProperty("token");
  });

  test("should show and hide spinner", async () => {
    expect(wrapper.find(".lds-ripple")).not.toExist();

    onSubmit(creds);
    expect(wrapper.find(".lds-ripple")).toExist();

    await flushPromisesAct();
    wrapper.update();

    expect(wrapper.find(".lds-ripple")).not.toExist();
  });

  test("should show error on request failure", async () => {
    const message = "request failed";
    const mockFetchFail = jest.fn().mockRejectedValue({ errors: [message] });

    window.fetch = mockFetchFail;

    const wrapper = mount(<LoginSubmission />);

    wrapper.find(Login).invoke("onSubmit")("anything");
    await flushPromisesAct();
    wrapper.update();

    expect(navigate).not.toHaveBeenCalled();
    expect(wrapper).toIncludeText(message);
  });

  test("should navigate to /app after success", async () => {
    onSubmit("anything");
    await flushPromisesAct();
    wrapper.update();

    expect(navigate).toHaveBeenCalledWith("/app");
  });
});

/*
 * use await act(async () => (...)) to wait for useEffect updates in component
 * https://github.com/enzymejs/enzyme/issues/2153#issuecomment-499219572
 */

/*
 * don't understand why I had to use act twice in the last test but it wouldn't
 * update the enzyme representation
 */

/*
 * await act(async () => (...)) adds a wrapper.update() at the end of microtask
 * queue which is why two async acts were required to get the final state.
 * flushPromises makes it easier to understand the order of execution of code and
 * makes wrapper.update() more predictable, we wait until all our promise
 * callbacks are executed and wrap flushPromises() in act as some of the
 * callbacks are causing changes to the component and then we update enzyme's
 * represenation of the react tree to assert.
 */
