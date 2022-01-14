/* eslint-disable no-unused-expressions */

import { expect } from "chai";
import { describe, it } from "mocha";

import { range, getCurrentYear } from "../Item";

describe("Model: Item", () => {
  it("returns the correct range", () => {
    const newRange = [...range(2007, 2010)];
    expect(newRange).to.eql([2007, 2008, 2009, 2010]);
  });

  it("returns the correct year: use case 1", () => {
    const year = getCurrentYear(new Date("2019-01-01"));
    expect(year).to.eql(2019);
  });

  it("returns the correct year: use case 2", () => {
    const year = getCurrentYear(new Date("2022-01-01"));
    expect(year).to.eql(2022);
  });
});
