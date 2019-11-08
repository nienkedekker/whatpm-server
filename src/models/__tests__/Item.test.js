/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { describe, it } from 'mocha';

import { range } from '../Item';

describe('Model: Item', () => {
  it('returns the correct range', () => {
    const newRange = [...range(2007, 2010)];
    expect(newRange).to.eql([2007, 2008, 2009, 2010]);
  });
});
