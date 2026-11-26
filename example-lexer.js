/* const TokenType = Object.freeze({
  TYPE_INT: "TYPE_INT",
  TYPE_FLT: "TYPE_FLT",
  TYPE_STR: "TYPE_STR",
  TYPE_TFN: "TYPE_TFN",
  TYPE_ANY: "TYPE_ANY",
  MOD_CHANGEABLE: "MOD_CHANGEABLE",

  FUNC_DEF: "FUNC_DEF",
  PARAMS: "PARAMS",
  DO: "DO",
  END: "END",
  IF_COND: "IF_COND",
  ELSE_COND: "ELSE_COND",

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

  KW_REASSIGN: "KW_REASSIGN",
  KW_WRITE: "KW_WRITE",
  KW_READ: "KW_READ",
  KW_RETURN: "KW_RETURN",
  KW_CALL_FUNC: "KW_CALL_FUNC",
  KW_WHILE: "KW_WHILE",
  KW_FORWARD: "KW_FORWARD",
  KW_BACKWARD: "KW_BACKWARD",

  INT_LIT: "INT_LIT",
  FLT_LIT: "FLT_LIT",
  BOOL_TRUE: "BOOL_TRUE",
  BOOL_FALSE: "BOOL_FALSE",
  NULL_LIT: "NULL_LIT",

  STRING_START: "STRING_START",
  STRING_TEXT: "STRING_TEXT",
  STRING_END: "STRING_END",
  VAR_START: "VAR_START",
  VAR_END: "VAR_END",

  IDENTIFIER: "IDENTIFIER",
  SEMICOLON: "SEMICOLON",
  COLON: "COLON",
  INCREMENT: "INCREMENT",

  GATE_AND: "AND",
  GATE_NOT: "NOT",
  GATE_OR: "OR",
  GATE_XOR: "XOR",
  GATE_XNOR: "XNOR",

  EOF: "EOF",
});

const SymbolTokens = Object.freeze({
  ";": TokenType.SEMICOLON,
  ":": TokenType.COLON,
  "++": TokenType.INCREMENT,
});

const DelimiterTokens = Object.freeze({
  "s\\": TokenType.STRING_START,
  "/s": TokenType.STRING_END,
  "v\\": TokenType.VAR_START,
  "/v": TokenType.VAR_END,
});

const LiteralTokens = Object.freeze({
  "T^": TokenType.BOOL_TRUE,
  "F^": TokenType.BOOL_FALSE,
  "N^": TokenType.NULL_LIT,
});

const BracketTokens = Object.freeze({
  "[int]": TokenType.TYPE_INT,
  "[flt]": TokenType.TYPE_FLT,
  "[str]": TokenType.TYPE_STR,
  "[tfn]": TokenType.TYPE_TFN,
  "[any]": TokenType.TYPE_ANY,
  "[c]": TokenType.MOD_CHANGEABLE,
  "[f]": TokenType.FUNC_DEF,
  "[pars]": TokenType.PARAMS,
  "[d]": TokenType.DO,
  "[e]": TokenType.END,
  "[ic]": TokenType.IF_COND,
  "[ec]": TokenType.ELSE_COND,
  "[as]": TokenType.ARRAY_START,
  "[ae]": TokenType.ARRAY_END,
  "[ad]": TokenType.OP_ADD,
  "[st]": TokenType.OP_SUB,
  "[my]": TokenType.OP_MUL,
  "[dv]": TokenType.OP_DIV,
  "[GT]": TokenType.OP_GT,
  "[LT]": TokenType.OP_LT,
  "[IGT]": TokenType.OP_IGT,
  "[ILT]": TokenType.OP_ILT,
  "[EQ]": TokenType.OP_EQ,
  "[DEQ]": TokenType.OP_DEQ,
  "[HV]": TokenType.OP_HV,
  "[NV]": TokenType.OP_NV,
  "[&&]": TokenType.GATE_AND,
  "[??]": TokenType.GATE_OR,
  "[!!]": TokenType.GATE_NOT,
  "[#?]": TokenType.GATE_XOR,
  "[!#?]": TokenType.GATE_XNOR,
});

const KeywordTokens = Object.freeze({
  reassign: TokenType.KW_REASSIGN,
  write: TokenType.KW_WRITE,
  read: TokenType.KW_READ,
  return: TokenType.KW_RETURN,
  callFunc: TokenType.KW_CALL_FUNC,
  while: TokenType.KW_WHILE,
  forward: TokenType.KW_FORWARD,
  backward: TokenType.KW_BACKWARD,
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

*/
