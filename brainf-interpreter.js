let inp = '', cur = 0; // input, read cursor
let mem = [0], pnt = 0; // memory, pointer
let out = ''; // output

// sanitize
inp = inp.replace(/\w*/g, '');
inp = inp.replace(/,/g, '');

let temp = 0;
for (let l1 = 0; l1 < inp.length; l1++) {
    if (inp[l1] == '[') temp++;
    else if (inp[l1] == ']') temp--;
}
if (temp) throw new Error('Missing bracket(s)');

function bf(inp) {
    for (let pos = 0; pos < inp.length; pos++) {
        switch (inp[pos]) {
            case '>':
                pnt++;
                if (pnt == mem.length) mem.push(0);
                break;
            case '<':
                pnt--;
                if (pnt == -1) throw new Error('Memory depleted');
                break;
            case '+':
                mem[pnt]++;
                if (mem[pnt] == 256) mem[pnt] == 0; // overflow
                break;
            case '-':
                mem[pnt]--;
                if (mem[pnt] == -1) mem[pnt] == 255; // overflow
                break;
            case '.':
                out += String.fromCharCode(mem[pnt]);
                break
            case '[':
                // search for matching ']'
                let match = 1, l1 = pos + 1;
                for (; l1 < inp.length; l1++) {
                    if (inp[l1] == '[') match++;
                    else if (inp[l1] == ']') match--;
                    if (!match) break
                }
                let inside = inp.slice(pos + 1, l1);

                while (mem[pnt]) 
                    bf(inside)
                pos = l1;
                break
            default:
                break;
        }
    }
};

bf(inp);
console.log(mem);
console.log(out);
