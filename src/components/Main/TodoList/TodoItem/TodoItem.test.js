import React from "react";
import { shallow } from "enzyme";
import TodoItem from "./TodoItem";

describe("TodoItem", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TodoItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
