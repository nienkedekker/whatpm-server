import { expect } from 'chai';
import { describe, it } from 'mocha';

import Movie from '../Movie.js';

describe('Model: Movie', () => {
  const defaultOptions = {
    title: 'Transformers',
    director: 'Michael Bay',
    published_year: 2007,
    belongs_to_year: '2007',
    redo: false,
  };

  it('should be invalid when title is empty', (done) => {
    const newMovie = new Movie({
      ...defaultOptions,
      title: '',
    });
    newMovie.validate((err) => {
      expect(err.errors.title).to.exist;
      done();
    });
  });

  it('should be invalid when a key defined in the discriminator schema is passed incorrectly', (done) => {
    const newMovie = new Movie({
      ...defaultOptions,
      published_year: 'i-should-be-a-number',
    });
    newMovie.validate((err) => {
      expect(err.errors).to.exist;
      done();
    });
  });

  it('should set the key value of director when given one', (done) => {
    const newMovie = new Movie({
      ...defaultOptions,
    });
    newMovie.validate(() => {
      expect(newMovie.director).to.equal('Michael Bay');
      done();
    });
  });

  it('should be valid when a key not defined in the schema is passed', (done) => {
    const newMovie = new Movie({
      ...defaultOptions,
      notHere: '',
    });
    newMovie.validate(() => {
      expect(newMovie.notHere).to.not.exist;
      done();
    });
  });

  it('should be invalid when a key defined in the discriminator schema is passed incorrectly', (done) => {
    const newMovie = new Movie({
      ...defaultOptions,
      published_year: 'i-should-be-a-number',
    });
    newMovie.validate((err) => {
      expect(err.errors).to.exist;
      done();
    });
  });
});
