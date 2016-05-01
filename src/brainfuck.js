const brainfuck = (code, stdin) => {
  const data = [];
  const input = stdin.split('');

  console.log('code:', code);
  console.log('stdin:', `[${stdin}]`);
  console.log('input.length:', input.length);

  let output = '';
  let ip = 0; // instruction pointer
  let dp = 30001; // data pointer
  let opc = 0; // operation counter
  while (dp > 0) data[--dp] = 0; // initialise to 30,000 bytes

  while (true) {
    const char = code[ip++];
    if (typeof char === 'undefined') break;
    // console.log(`>> interpreting "${char}" at ${ip}/${dp} (${++opc}) ${data[dp]}`);

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
        if (data[dp] === 0) data[dp] = 255;
        else data[dp]--;
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
        if (data[dp] === 0) {
          let c = code[++ip];

          let layers = 0;
          let searching = true;
          while (searching) {
            c = code[++ip];
            if (c === '[') layers++;
            else if (c === ']' && layers > 0) layers--;
            if (c !== '[' && layers === 0) searching = false;
          }
          ip++;
        }
        break;

      // if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command,
      // jump it back to the command after the matching [ command
      case ']':
        if (data[dp] !== 0) {
          let c = code[ip - 2];

          let layers = 0;
          let searching = true;
          while (searching) {
            c = code[--ip];
            if (c === ']') layers++;
            else if (c === '[' && layers > 0) layers--;
            if (c !== '[' && layers === 0) searching = false;
          }
          ip++;
        }
        break;
    }
  }

  return output
}

module.exports = exports = brainfuck;
