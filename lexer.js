const TokenType = Object.freeze({
  PAREN_OPEN: "PAREN_OPEN",
  PAREN_CLOSE: "PAREN_CLOSE",

  TYPE_INT: "TYPE_INT",
  TYPE_FLT: "TYPE_FLT",
  TYPE_STR: "TYPE_STR",
  TYPE_TFN: "TYPE_TFN",
  TYPE_ANY: "TYPE_ANY",

  FN_DEF: "FN_DEF",
  END: "END",
  IF_COND: "IF_COND",
  ELSE_COND: "ELSE_COND",
  ELSE: "ELSE",

  ARRAY_START: "ARRAY_START",
  ARRAY_END: "ARRAY_END",

  OP_ADD: "OP_ADD",
  OP_SUB: "OP_SUB",
  OP_MUL: "OP_MUL",
  OP_DIV: "OP_DIV",

  OP_GT: "OP_GT",
  OP_LT: "OP_LT",
  OP_IGT: "OP_IGT",
  OP_ILT: "OP_ILT",
  OP_EQ: "OP_EQ",
  OP_DEQ: "OP_DEQ",
  OP_HV: "OP_HV",
  OP_NV: "OP_NV",

  KW_MOD: "KW_MOD",
  KW_WRITE: "KW_WRITE",
  KW_READ: "KW_READ",
  KW_RN: "KW_RN",
  KW_FN: "KW_FN",
  KW_RETURN: "KW_RETURN",
  KW_WHILE: "KW_WHILE",

  INT_LIT: "INT_LIT",
  FLT_LIT: "FLT_LIT",
  BOOL_TRUE: "BOOL_TRUE",
  BOOL_FALSE: "BOOL_FALSE",
  NULL_LIT: "NULL_LIT",
  STR_LIT: "STR_LIT",

  STRING_START: "STRING_START",
  STRING_END: "STRING_END",

  IDENTIFIER: "IDENTIFIER",
  SEMICOLON: "SEMICOLON",
  COLON: "COLON",
  INCREMENT: "INCREMENT",
  DECREMET: "DECREMENT",

  GATE_AND: "GATE_AND",
  GATE_NAND: "GATE_NAND",
  GATE_OR: "GATE_OR",
  GATE_NOR: "GATE_NOR",
  GATE_NOT: "GATE_NOT",
  GATE_XOR: "GATE_XOR",

  COMMENT_START: "COMMENT_START",
  COMMENT_END: "COMMENT_END",

  EOF: "EOF",
});

const SymbolTokens = Object.freeze({
  ";": TokenType.SEMICOLON,
  ":": TokenType.COLON,
  "++": TokenType.INCREMENT,
  "(": TokenType.PAREN_OPEN,
  ")": TokenType.PAREN_CLOSE,
  "\\": TokenType.STRING_START,
  "/": TokenType.STRING_END,
});

const DelimiterTokens = Object.freeze({
  "/-": TokenType.COMMENT_START,
  "-/": TokenType.COMMENT_END,
});

const LiteralTokens = Object.freeze({
  "true": TokenType.BOOL_TRUE,
  "false": TokenType.BOOL_FALSE,
  "null": TokenType.NULL_LIT,
});

const BracketTokens = Object.freeze({
  "[int]": TokenType.TYPE_INT,
  "[flt]": TokenType.TYPE_FLT,
  "[str]": TokenType.TYPE_STR,
  "[tfn]": TokenType.TYPE_TFN,
  "[any]": TokenType.TYPE_ANY,
  "end": TokenType.END,
  "[ic]": TokenType.IF_COND,
  "[ec]": TokenType.ELSE_COND,
  "[e]": TokenType.ELSE,
  "[as]": TokenType.ARRAY_START,
  "[ae]": TokenType.ARRAY_END,
  "ad": TokenType.OP_ADD,
  "sb": TokenType.OP_SUB,
  "mt": TokenType.OP_MUL,
  "dv": TokenType.OP_DIV,
  "[>>]": TokenType.OP_GT,
  "[<<]": TokenType.OP_LT,
  "[>=]": TokenType.OP_IGT,
  "[<=]": TokenType.OP_ILT,
  "[==]": TokenType.OP_EQ,
  "[!=]": TokenType.OP_DEQ,
  "[1?]": TokenType.OP_HV,
  "[0?]": TokenType.OP_NV,
  "[&&]": TokenType.GATE_AND,
  "[??]": TokenType.GATE_OR,
  "[!!]": TokenType.GATE_NOT,
  "[#?]": TokenType.GATE_XOR,
});

const KeywordTokens = Object.freeze({
  "mod": TokenType.KW_MOD,
  "write:": TokenType.KW_WRITE,
  "read": TokenType.KW_READ,
  "return": TokenType.KW_RETURN,
  "rn": TokenType.KW_RN,
  "while": TokenType.KW_WHILE,
});

function token(value, type) {
  return { value, type };
}

function alphabetic(str) {
  isAlpha = (src) => /^[a-zA-Z]+$/.test(src);

  return isAlpha(str);
}

function skip(src) {
  return src === " " || src === "\t" || src === "\r" || src === "\n" || src === "_";
}

function integer(src) {
  const isDigits = (str) => /^\d+$/.test(str);

  return isDigits(src);
}

function tokenize(srcCode) {
  const tokens = [];
  const src = srcCode.split("");

  while (src.length > 0) {
    if (src[0] === ";") {
      tokens.push(token(src.shift(), TokenType.SEMICOLON));
    } else if (src[0] === ":") {
      tokens.push(token(src.shift(), TokenType.COLON));
    } else if (src[0] === "[") {
      const intExpected = ["[", "i", "n", "t", "]"];
      const fltExpected = ["[", "f", "l", "t", "]"];
      const strExpected = ["[", "s", "t", "r", "]"];
      const tfnExpected = ["[", "t", "f", "n", "]"];
      const anyExpected = ["[", "a", "n", "y", "]"];

      if (intExpected.every((ch, idx) => src[idx] === ch)) {
        src.splice(0, intExpected.length);
        tokens.push(token(intExpected.join(""), TokenType.TYPE_INT));
      } else if (fltExpected.every((ch, idx) => src[idx] === ch)) {
        src.splice(0, fltExpected.length);
        tokens.push(token(fltExpected.join(""), TokenType.TYPE_FLT));
      } else if (strExpected.every((ch, idx) => src[idx] === ch)) {
        src.splice(0, strExpected.length);
        tokens.push(token(strExpected.join(""), TokenType.TYPE_STR));
      } else if (tfnExpected.every((ch, idx) => src[idx] === ch)) {
        src.splice(0, tfnExpected.length);
        tokens.push(token(tfnExpected.join(""), TokenType.TYPE_TFN));
      } else if (anyExpected.every((ch, idx) => src[idx] === ch)) {
        src.splice(0, anyExpected.length);
        tokens.push(token(anyExpected.join(""), TokenType.TYPE_ANY));
      } else {
        console.log("Unrecognized character found in source:", src[0]);
        src.shift();
      }
    } else if (src[0 === "s"]) {
      src.shift();

      if (src[0 === "\\"]) {
      }
    } else {
      if (integer(src[0])) {
        let number = "";
        while (src.length > 0 && integer(src[0])) {
          number += src.shift();
        }

        tokens.push(token(number, TokenType.INT_LIT));
      } else if (alphabetic(src[0])) {
        let ident = "";
        while (src.length > 0 && alphabetic(src[0])) {
          ident += src.shift();
        }

        const reserved = KeywordTokens[ident];
        if (reserved === undefined) {
          tokens.push(token(ident, TokenType.IDENTIFIER));
        } else {
          tokens.push(token(ident, TokenType.IDENTIFIER));
        }
      } else if (skip(src[0])) {
        src.shift();
      } else {
        console.log("Unrecognized character found in source:", src[0]);
        src.shift();
        return;
      }
    }
  }

  console.log(tokens);
  return tokens;
}

const source = "[int] integer 9; [flt] float 9; [str] integer 9;";
tokenize(source);
