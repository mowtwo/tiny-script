import lexer from "./lexer.js"
import MAsm from "./m-asm.js"

export class Expression {
  left: Expression | null = null
  right: Expression | null = null
  constructor(
    private asmWriter: MAsm,
    public readonly token: string = 'expression'
  ) { }
  private cacheAsmCode() {
    this.left?.cacheAsmCode?.()
    this.right?.cacheAsmCode?.()
    if (this.asmWriter.isOperator(this.token)) {
      this.asmWriter.operator(this.token)
    } else {
      this.asmWriter.push(this.token)
    }
  }
  get asmCode() {
    this.cacheAsmCode()
    return this.asmWriter.outCode
  }
}

export function isNumber(token: string) {
  return /\d+/.test(token)
}

export function isVariable(token: string) {
  return /[A-Za-z]+/.test(token)
}


export default function parser(code: string) {
  const { tokens, origin } = lexer(code)

  const oprMap = {
    '+': 'add',
    '-': 'sub',
    '*': 'mul',
    '/': 'div'
  }

  let position = 0

  const peek = () => tokens[position]
  const consume = (t: string) => {
    if (t !== tokens[position]) {
      throw new Error(t)
    }
    position++
  }

  const parseTermExpression = (asmWriter: MAsm) => {
    let t = peek()
    if (isNumber(t)) {
      consume(t)
      return new Expression(asmWriter, t)
    } else if (isVariable(t)) {
      consume(t)
      return new Expression(asmWriter, t)
    } else if (t === "(") {
      consume(t)
      const expr = parseExpression(asmWriter)
      if (peek() !== ")") {
        throw new SyntaxError(t)
      }
      consume(")")
      return expr
    } else {
      throw new SyntaxError(t)
    }
  }

  const parseMultExpression = (asmWriter: MAsm) => {
    let expr: Expression = parseTermExpression(asmWriter)
    let t = peek()

    while (t === "*" || t === "/") {
      consume(t)
      const left = expr
      const right = parseTermExpression(asmWriter)
      expr = new Expression(asmWriter, t)
      expr.left = left
      expr.right = right
      t = peek()
    }
    return expr
  }

  const parseExpression = (asmWriter: MAsm = new MAsm(oprMap)) => {
    let expr: Expression = parseMultExpression(asmWriter)
    let t = peek()

    while (t === '+' || t === '-') {
      consume(t)
      const left = expr
      const right = parseMultExpression(asmWriter)
      expr = new Expression(asmWriter, t)
      expr.left = left
      expr.right = right
      t = peek()
    }

    return expr
  }

  const ast: Expression = parseExpression()

  if (position !== tokens.length) {
    throw new SyntaxError(peek())
  }

  return {
    tokens, origin, ast
  }
}