let inp = '', out = ''; // put your code here
let stdin = '', pos = 0; // manual input and position
let mem = [], pnt = 2;
for (let l1 = 0; l1 < 11; l1++) mem.push(false);

function toBin(n) {
    n = n.toString(2);
    while (n.length < 8) n = '0' + n;
    return n;
}

function toDec(n) {
    let r = 0, o = 0;
    for (let l1 = n.length - 1; l1 >= 0; l1--) {
        if (n[l1] == '1') o += 2**r;
        r++;
    }
    return o;
}

for (let cur = 0; cur < inp.length; cur++) {
    switch (inp[cur]) {
        case '<':
            if (pnt) pnt--; // if not 0, move left
            break;
        case '(':
            pnt++;
            if (pnt == mem.length) mem.push(0)
            mem[pnt] = !mem[pnt];
            if (!mem[pnt]) cur++;
            break;
        default:
            break;
    }
    if (mem[1] == true) { // if I/O enable
        let c = true;
        for (let l1 = 4; l1 <= 11; l1++) if (mem[l1]) {c=!c; break}; // check I/O bits
        if (c) { // if input
            c = toBin(stdin.charCodeAt(pos));
            pos++;
            for (let l1 = 3; l1 < 11; l1++) mem[l1] = (c[l1-3] == 1)? true : false;
        } else { // if output
            c = '';
            for (let l1 = 3; l1 < 11; l1++) c += (mem[l1])? '1' : '0';
            c = String.fromCharCode(toDec(c));
            out += c;
        }
        mem[1] = false;
    }
    if (cur + 1 == inp.length) {
        if (mem[pnt]) cur = 0;
    }
}

console.log(mem);
console.log(out);