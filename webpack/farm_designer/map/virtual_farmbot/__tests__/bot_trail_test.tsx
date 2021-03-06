import * as React from "react";
import { shallow } from "enzyme";
import { BotTrail, BotTrailProps, VirtualTrail } from "../bot_trail";

describe("<BotTrail/>", () => {
  function fakeProps(): BotTrailProps {
    sessionStorage[VirtualTrail.records] = JSON.stringify([
      { x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 },
      { x: 4, y: 4 }]);
    return {
      position: { x: 0, y: 0, z: 0 },
      mapTransformProps: {
        quadrant: 2, gridSize: { x: 3000, y: 1500 }
      }
    };
  }

  it("shows custom length trail", () => {
    sessionStorage[VirtualTrail.length] = JSON.stringify(5);
    const p = fakeProps();
    p.mapTransformProps.quadrant = 2;
    const wrapper = shallow(<BotTrail {...p } />);
    const lines = wrapper.find("#trail").find("line");
    expect(lines.length).toEqual(4);
    expect(lines.first().props()).toEqual({
      id: "trail-line-1",
      stroke: "red",
      strokeOpacity: 0.25,
      strokeWidth: 0.5,
      x1: 2, x2: 1, y1: 2, y2: 1
    });
    expect(lines.last().props()).toEqual({
      id: "trail-line-4",
      stroke: "red",
      strokeOpacity: 1,
      strokeWidth: 2,
      x1: 0, x2: 4, y1: 0, y2: 4
    });
  });

  it("shows default length trail", () => {
    sessionStorage[VirtualTrail.length] = undefined;
    const wrapper = shallow(<BotTrail {...fakeProps() } />);
    const lines = wrapper.find("#trail").find("line");
    expect(lines.length).toEqual(5);
  });

  it("doesn't store duplicate last trail point", () => {
    sessionStorage[VirtualTrail.length] = undefined;
    const p = fakeProps();
    p.position = { x: 4, y: 4, z: 0 };
    const wrapper = shallow(<BotTrail {...p } />);
    const lines = wrapper.find("#trail").find("line");
    expect(lines.length).toEqual(4);
  });

});
