'use strict';

const brainfuck = require('../src/brainfuck');
const chai = require('chai');
const assert = chai.assert;

//
// Tests
//
describe('Loop test', () => {
  it('should loop properly with single loop', (done) => {
    const code = ',[-]';
    brainfuck(code, String.fromCharCode(5));
    done();
  });

  it('should loop properly with double loop', (done) => {
    const code = ',[-[>]<]';
    brainfuck(code, String.fromCharCode(5));
    done();
  });
});


describe('Echo until byte(255) encountered', () => {
  it('should return Hello', (done) => {
    const result = brainfuck(',+[-.,+]', 'Hello' + String.fromCharCode(255));
    console.log('result:', result);
    assert.equal(result, 'Hello');
    done();
  });
});

describe('Echo until byte(0) encountered', () => {
  it('should return Hello', (done) => {
    const result = brainfuck(',[.[-],]', 'Hello' + String.fromCharCode(0));
    console.log('result:', result);
    assert.equal(result, 'Hello');
    done();
  });
});

describe('Two numbers multiplier', () => {
  it('should return char code 72', (done) => {
    const result = brainfuck(',>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.', String.fromCharCode(8,9));
    console.log('result:', result);
    assert.equal(result, String.fromCharCode(72));
    done();
  });
});

describe('Hello World!', () => {
  it('should do something', (done) => {
    const helloWorld = '++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.++++++'
                     + '+..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.';
    const result = brainfuck(helloWorld, '');
    console.log('result:', result);
    assert.equal(result, 'Hello World!');
    done();
  });
});

describe('Fibonacci', () => {
  it('should return first ten Fibonacci numbers', (done) => {
    const slowCode =
      ',>+>>>>++++++++++++++++++++++++++++++++++++++++++++>++++++++++++++++++++++++++++++++<<<<<' +
      '<[>[>>>>>>+>+<<<<<<<-]>>>>>>>[<<<<<<<+>>>>>>>-]<[>++++++++++[-<-[>>+>+<<<-]>>>[<<<+>>>-]+' +
      '<[>[-]<[-]]>[<<[>>>+<<<-]>>[-]]<<]>>>[>>+>+<<<-]>>>[<<<+>>>-]+<[>[-]<[-]]>[<<+>>[-]]<<<<<' +
      '<<]>>>>>[++++++++++++++++++++++++++++++++++++++++++++++++.[-]]++++++++++<[->-<]>+++++++++' +
      '+++++++++++++++++++++++++++++++++++++++.[-]<<<<<<<<<<<<[>>>+>+<<<<-]>>>>[<<<<+>>>>-]<-[>>' +
      '.>.<<<[-]]<<[>>+>+<<<-]>>>[<<<+>>>-]<<[<+>-]>[<+>-]<<<-]';
    const input = String.fromCharCode(10);
    const result = brainfuck(slowCode, input);
    console.log('result:', result);
    assert.equal(result, '1, 1, 2, 3, 5, 8, 13, 21, 34, 55');
    done();
  });
});
