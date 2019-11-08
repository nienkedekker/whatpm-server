/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { describe, it } from 'mocha';

import Show from '../Show';

describe('Model: Show', () => {
  const defaultOptions = {
    title: 'Battlestar Galactica',
    season: 4,
    published_year: 2009,
    belongs_to_year: '2019',
    redo: true,
  };

  it('should be invalid if season is empty', (done) => {
    const newShow = new Show({
      defaultOptions,
      season: '',
    });
    newShow.validate((err) => {
      expect(err.errors.season).to.exist;
      done();
    });
  });

  it('should be invalid when a key defined in the discriminator schema is passed incorrectly', (done) => {
    const newShow = new Show({
      ...defaultOptions,
      published_year: 'i-should-be-a-number',
    });
    newShow.validate((err) => {
      expect(err.errors).to.exist;
      done();
    });
  });

  it('should set the key value of season when given one', (done) => {
    const newShow = new Show({
      ...defaultOptions,
    });
    newShow.validate(() => {
      expect(newShow.season).to.equal(4);
      done();
    });
  });

  it('should be valid when a key not defined in the schema is passed', (done) => {
    const newShow = new Show({
      ...defaultOptions,
      notHere: '',
    });
    newShow.validate(() => {
      expect(newShow.notHere).to.not.exist;
      done();
    });
  });

  it('should be invalid when a key defined in the discriminator schema is passed incorrectly', (done) => {
    const newShow = new Show({
      ...defaultOptions,
      published_year: 'i-should-be-a-number',
    });
    newShow.validate((err) => {
      expect(err.errors).to.exist;
      done();
    });
  });
});
