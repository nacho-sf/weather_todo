import React from "react";
import { shallow } from "enzyme";
import CurrentWeather from "./CurrentWeather";

describe("CurrentWeather", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<CurrentWeather />);
    expect(wrapper).toMatchSnapshot();
  });
});
