const brainfuck = (code, stdin) => {
  const data = [];
  const input = stdin.split('');

  let skip = null;
  let output = '';
  let direction = 1;
  let ip = 0; // instruction pointer
  let dp = 30001; // data pointer
  while (dp > 0) data[--dp] = 0; // initialise to 30,000 bytes

  const moveIP = () => { ip += direction; };

  while (true) {
    const char = code[ip];
    if (typeof char === 'undefined') break;

    // handle [] loops properly
    if (skip) {
      if (char === '[') {
        if (direction === 1) skip.depth++;
        else if (direction === -1 && skip.depth > 0) skip.depth--;
        else if (direction === -1 && skip.depth === 0) {
          skip = null;
          direction = 1;
        }
      }

      if (char === ']') {
        if (direction === -1) skip.depth++;
        else if (direction === 1 && skip.depth > 0) skip.depth--;
        else if (direction === 1 && skip.depth === 0) {
          skip = null;
          direction = 1;
        }
      }

      moveIP();
      continue;
    }

    switch (char) {
      // increment the data pointer (to point to the next cell to the right)
      case '>':
        dp++;
        break;

      // decrement the data pointer (to point to the next cell to the left)
      case '<':
        if (dp > 0) dp--;
        break;

      // increment (increase by one, truncate overflow: 255 + 1 = 0) the byte at the data pointer
      case '+':
        if (++data[dp] > 255) data[dp] = 0;
        break;

      // decrement (decrease by one, treat as unsigned byte: 0 - 1 = 255) the byte at the data pointer
      case '-':
        if (--data[dp] < 0) data[dp] = 255;
        break;

      // output the byte at the data pointer
      case '.':
        output += String.fromCharCode(data[dp]);
        break;

      // accept one byte of input, storing its value in the byte at the data pointer
      case ',':
        data[dp] = input.shift().charCodeAt(0);
        break;

      // if the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command,
      // jump it forward to the command after the matching ] command
      case '[':
        // data[dp] == 0: jump to cmd after matching ]
        // data[dp] <> 0 : move forward as usual
        if (data[dp] === 0) {
          skip = { depth: 0 };
          direction = 1;
        }
        break;

      // if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command,
      // jump it back to the command after the matching [ command
      case ']':
        // data[dp] <> 0: jump back to cmd after matching [
        // data[dp] == 0 : move forward as usual
        if (data[dp] !== 0) {
          skip = { depth: 0 };
          direction = -1;
        }
        break;
    }

    moveIP();
  }

  return output
}

module.exports = exports = brainfuck;
