import parser, { isNumber } from "./parser.js";
export default class MVm {
    static vm = null;
    static getVm() {
        if (!this.vm) {
            MVm.vm = new MVm();
        }
        return MVm.vm;
    }
    ast;
    ctx = {};
    runner = {
        stack: [],
        push(n) {
            this.stack.push(n);
        },
        pop() {
            return this.stack.pop();
        },
        add() {
            const n1 = this.pop();
            const n2 = this.pop();
            this.push(n2 + n1);
        },
        sub() {
            const n1 = this.pop();
            const n2 = this.pop();
            this.push(n2 - n1);
        },
        mul() {
            const n1 = this.pop();
            const n2 = this.pop();
            this.push(n2 * n1);
        },
        div() {
            const n1 = this.pop();
            const n2 = this.pop();
            this.push(n2 / n1);
        }
    };
    constructor() { }
    static run(code, ctx = {}) {
        return MVm.runAst(parser(code).ast, ctx);
    }
    static runAst(ast, ctx = {}) {
        const vm = MVm.getVm();
        for (const k in ctx) {
            vm.setContext(k, ctx[k]);
        }
        return vm.runAst(ast);
    }
    parseAsm(asm) {
        const lines = asm.trim().split('\n');
        for (const line of lines) {
            const expr = line.split(' ');
            if (expr.length == 1) {
                const [opr] = expr;
                this.runner[opr]();
            }
            else {
                const [opr, val] = expr;
                if (isNumber(val)) {
                    this.runner[opr](parseInt(val));
                }
                else {
                    this.runner[opr](this.ctx[val] ?? 0);
                }
            }
        }
        return this.runner.pop();
    }
    setContext(key, value) {
        this.ctx[key] = value;
        return this;
    }
    run(code) {
        return this.runAst(parser(code).ast);
    }
    runAst(ast) {
        this.ast = ast;
        return this.parseAsm(this.ast.asmCode);
    }
}
