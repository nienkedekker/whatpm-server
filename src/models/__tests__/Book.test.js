import { expect } from 'chai';
import { describe, it } from 'mocha';

import Book from '../Book.js';

describe('Model: Book', () => {
  const defaultOptions = {
    title: 'The Shining',
    author: 'Stephen King',
    published_year: 1977,
    belongs_to_year: '2015',
    redo: true,
  };

  it('should be invalid if author is empty', (done) => {
    const newBook = new Book({
      defaultOptions,
      author: '',
    });
    newBook.validate((err) => {
      expect(err.errors.author).to.exist;
      done();
    });
  });

  it('should be invalid when a key defined in the discriminator schema is passed incorrectly', (done) => {
    const newBook = new Book({
      ...defaultOptions,
      published_year: 'i-should-be-a-number',
    });
    newBook.validate((err) => {
      expect(err.errors).to.exist;
      done();
    });
  });

  it('should set the key value of author when given one', (done) => {
    const newBook = new Book({
      ...defaultOptions,
    });
    newBook.validate(() => {
      expect(newBook.author).to.equal('Stephen King');
      done();
    });
  });

  it('should be valid when a key not defined in the schema is passed', (done) => {
    const newBook = new Book({
      ...defaultOptions,
      notHere: '',
    });
    newBook.validate(() => {
      expect(newBook.notHere).to.not.exist;
      done();
    });
  });

  it('should be invalid when a key defined in the discriminator schema is passed incorrectly', (done) => {
    const newBook = new Book({
      ...defaultOptions,
      published_year: 'i-should-be-a-number',
    });
    newBook.validate((err) => {
      expect(err.errors).to.exist;
      done();
    });
  });
});
