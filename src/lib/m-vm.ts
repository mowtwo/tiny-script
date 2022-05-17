import parser, { Expression, isNumber } from "./parser.js";


export default class MVm {
  private static vm: MVm | null = null
  private static getVm() {
    if (!this.vm) {
      MVm.vm = new MVm()
    }
    return MVm.vm!
  }
  private ast?: Expression
  private ctx: Record<string, number> = {}
  private runner = {
    stack: [] as number[],
    push(n: number) {
      this.stack.push(n)
    },

    pop() {
      return this.stack.pop()
    },

    add() {
      const n1 = this.pop()!
      const n2 = this.pop()!
      this.push(n2 + n1)
    },

    sub() {
      const n1 = this.pop()!
      const n2 = this.pop()!
      this.push(n2 - n1)
    },

    mul() {
      const n1 = this.pop()!
      const n2 = this.pop()!
      this.push(n2 * n1)
    },

    div() {
      const n1 = this.pop()!
      const n2 = this.pop()!
      this.push(n2 / n1)
    }
  }

  private constructor() { }
  static run(code: string, ctx: Record<string, number> = {}) {
    return MVm.runAst(parser(code).ast, ctx)
  }
  static runAst(ast: Expression, ctx: Record<string, number> = {}) {
    const vm = MVm.getVm()
    for (const k in ctx) {
      vm.setContext(k, ctx[k])
    }
    return vm.runAst(ast)
  }

  parseAsm(asm: string) {
    const lines = asm.trim().split('\n')

    for (const line of lines) {
      const expr = line.split(' ')
      if (expr.length == 1) {
        const [opr] = expr
        type K = 'add' | 'sub' | 'div' | 'mul' | 'pop'
        this.runner[opr as K]()
      } else {
        const [opr, val] = expr
        type K = 'push'
        if (isNumber(val)) {
          this.runner[opr as K](parseInt(val))
        } else {
          this.runner[opr as K](this.ctx[val] ?? 0)
        }
      }
    }
    return this.runner.pop()!
  }

  setContext(key: string, value: number) {
    this.ctx[key] = value
    return this
  }

  run(code: string) {
    return this.runAst(parser(code).ast)
  }
  runAst(ast: Expression) {
    this.ast = ast
    return this.parseAsm(this.ast.asmCode)
  }
}