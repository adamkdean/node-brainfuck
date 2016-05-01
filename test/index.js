'use strict';

const brainfuck = require('../src/brainfuck');
const chai = require('chai');
const assert = chai.assert;

//
// Tests
//
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

describe('Infinite loop', () => {
  it('should complete executing', (done) => {
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
