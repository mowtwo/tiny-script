export default class MAsm<R extends Record<string, string> = Record<string, string>> {
  private code = ''
  constructor(private readonly operatorMapper: R) { }
  private get unknownOpr() {
    return '$?'
  }

  private write(code: string) {
    this.code += code
  }
  private writeLine(code: string) {
    this.write(`${code}\n`)
  }

  isOperator(opr: string) {
    return opr in this.operatorMapper
  }

  push(value: string | number) {
    this.writeLine(`push ${value}`)
  }
  operator(opr: keyof R) {
    this.writeLine(`${this.operatorMapper?.[opr] ?? this.unknownOpr}`)
  }
  isUnkonwOperator(opr: string) {
    return opr === this.unknownOpr
  }
  get outCode() {
    return this.code
  }
}