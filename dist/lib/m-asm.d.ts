export default class MAsm<R extends Record<string, string> = Record<string, string>> {
    private readonly operatorMapper;
    private code;
    constructor(operatorMapper: R);
    private get unknownOpr();
    private write;
    private writeLine;
    isOperator(opr: string): boolean;
    push(value: string | number): void;
    operator(opr: keyof R): void;
    isUnkonwOperator(opr: string): boolean;
    get outCode(): string;
}
