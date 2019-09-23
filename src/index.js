const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

var encodings = new Map();

function makeNewEncodings() {
  for (let key in MORSE_TABLE) {
    let new_key = key;
    new_key = new_key.replace(/\./g,'10');
    new_key = new_key.replace(/-/g,'11');

    let add_zeroes_count = 10 - new_key.length;
    for (let i = 0; i < add_zeroes_count; i++) {
      new_key = "0" + new_key;
    }

    encodings[new_key] = MORSE_TABLE[key];
  }

  encodings["**********"] = " ";
}

function decode(expr) {
  if (expr.length % 10 != 0) {
    return undefined;
  }

  makeNewEncodings();

  let str_pos = 0,
      decoded_str = "";

  while (str_pos < expr.length) {
    let substr = expr.substr(str_pos, 10);

    let val = encodings[substr];

    if (val === undefined) {
      return undefined;
    }

    decoded_str += val;
    str_pos += 10;
  }

  return decoded_str;
}

module.exports = {
    decode
}