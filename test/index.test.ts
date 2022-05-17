import { MVm, parser } from "../dist/index";
import { describe, test } from "vitest";
import { expect } from "vitest";

describe('simple expression', () => {
  test('should execute simple expression', () => {
    const { ast } = parser("a/2-1*(3/3)");
    expect(ast.asmCode).toMatchInlineSnapshot(`
      "push a
      push 2
      div
      push 1
      push 3
      push 3
      div
      mul
      sub
      "
    `)
    expect(MVm.runAst(ast, { a: 4 })).toMatchInlineSnapshot('1')
  });
});