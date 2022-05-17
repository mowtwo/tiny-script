import MAsm from "./m-asm.js";
export declare class Expression {
    private asmWriter;
    readonly token: string;
    left: Expression | null;
    right: Expression | null;
    constructor(asmWriter: MAsm, token?: string);
    private cacheAsmCode;
    get asmCode(): string;
}
export declare function isNumber(token: string): boolean;
export declare function isVariable(token: string): boolean;
export default function parser(code: string): {
    tokens: string[];
    origin: string;
    ast: Expression;
};
