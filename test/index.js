import { MVm, parser } from "../dist/index.js";

const { ast } = parser("a/2-1*(3/3)");
console.log(ast.asmCode);
console.log(
  MVm.runAst(ast, {
    a: 4,
  })
);
