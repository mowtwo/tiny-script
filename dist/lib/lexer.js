export default function lexer(code) {
    const tokens = [];
    let input = code;
    const origin = input;
    while (true) {
        const regx = /\s*([A-Za-z]+|[0-9]+|\S)\s*/;
        const m = regx.exec(input);
        if (m) {
            tokens.push(m[1]);
            input = input.replace(m[1], '');
        }
        else {
            break;
        }
    }
    return {
        tokens,
        origin
    };
}
