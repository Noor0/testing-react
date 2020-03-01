import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import * as ReachRouter from "@reach/router";

import LoginSubmission from "../LoginSubmission";
import Login from "../Login";

jest.mock("@reach/router");

describe("<LoginSubmission />", () => {
  const mockFetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({ token: "token" })
  });
  const realFetch = window.fetch;
  const creds = {
    username: "username",
    password: "password"
  };

  beforeAll(() => {
    window.fetch = mockFetch;
  });

  beforeEach(() => {
    mockFetch.mockClear();
    window.localStorage.clear();
  });

  afterEach(() => {
    window.fetch = mockFetch;
  });

  afterAll(() => {
    window.fetch = realFetch;
  });

  test("should make a fetch request on form submission and save token in local storage", async () => {
    const wrapper = mount(<LoginSubmission />);

    wrapper.find(Login).invoke("onSubmit")(creds);

    // for state update in useEffect after fetch is successful
    await act(async () => await wrapper.update());

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/login",
      expect.objectContaining({ body: JSON.stringify(creds) })
    );
    expect(window.localStorage).toHaveProperty("token");
  });

  test("should show and hide spinner", async () => {
    const wrapper = mount(<LoginSubmission />);

    expect(wrapper.find(".lds-ripple")).not.toExist();

    wrapper.find(Login).invoke("onSubmit")(creds);
    await act(async () => {
      wrapper.update();
    });
    expect(wrapper.find(".lds-ripple")).toExist();

    await act(async () => {
      wrapper.update();
    });
    expect(wrapper.find(".lds-ripple")).not.toExist();
  });

  // I feel like this test can be written in a better way
  test("should show error on request failure", async () => {
    const message = "request failed";
    const mockFetchFail = jest.fn().mockRejectedValue({ errors: [message] });

    window.fetch = mockFetchFail;

    const wrapper = mount(<LoginSubmission />);

    wrapper.find(Login).invoke("onSubmit")("anything");
    await act(async () => {
      wrapper.update();
    });
    await act(async () => {
      wrapper.update();
    });
    expect(wrapper).toIncludeText(message);
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
