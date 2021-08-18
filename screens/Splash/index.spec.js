import React from "react";
import renderer from "react-test-renderer";

import Splash from ".";
jest.mock('lottie-react-native')
jest.requireActual('lottie-react-native')


describe("<Splash />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<Splash />).toJSON();
    // await waitFor(() => jest.advanceTimersByTime(60));

    expect(tree.children.length).toBe(1);
  });
});
