let fs = require('fs'),
    com = fs.readFileSync('comment.txt', 'utf-8').split('\n'),
    wiki = fs.readFileSync('wiki.txt', 'utf-8').split('\n');

let out = '', i = 0, j = 0, out2 = '';

for (i = 0; i < com.length; i++) {
    let curCom = com[i].split('\t')[1];
    for (j = 0; j < wiki.length; j++)
        if (curCom == wiki[j].split('\t')[1]) {
            out += `${i + 1}\t${curCom}\t${i - j}\t${j + 1}\n`;
            break;
        }
    if (j == wiki.length)
        out2 += `${i + 1}\t${curCom}\n`;
    if (i % 250 == 0) console.log(i);
}

fs.writeFileSync('diff.txt', out, 'utf-8');
fs.writeFileSync('diff2.txt', out2, 'utf-8');