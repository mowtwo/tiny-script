export default class MAsm {
    operatorMapper;
    code = '';
    constructor(operatorMapper) {
        this.operatorMapper = operatorMapper;
    }
    get unknownOpr() {
        return '$?';
    }
    write(code) {
        this.code += code;
    }
    writeLine(code) {
        this.write(`${code}\n`);
    }
    isOperator(opr) {
        return opr in this.operatorMapper;
    }
    push(value) {
        this.writeLine(`push ${value}`);
    }
    operator(opr) {
        this.writeLine(`${this.operatorMapper?.[opr] ?? this.unknownOpr}`);
    }
    isUnkonwOperator(opr) {
        return opr === this.unknownOpr;
    }
    get outCode() {
        return this.code;
    }
}
