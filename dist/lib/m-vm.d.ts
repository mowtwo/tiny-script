import { Expression } from "./parser.js";
export default class MVm {
    private static vm;
    private static getVm;
    private ast?;
    private ctx;
    private runner;
    private constructor();
    static run(code: string, ctx?: Record<string, number>): number;
    static runAst(ast: Expression, ctx?: Record<string, number>): number;
    parseAsm(asm: string): number;
    setContext(key: string, value: number): this;
    run(code: string): number;
    runAst(ast: Expression): number;
}
