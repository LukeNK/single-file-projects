import { readFileSync, writeFileSync } from 'fs';

let stats = {}, processed = 0;

function run(sufix) {
    let text = readFileSync('viwik18/dataset/viwik19_' + sufix, 'utf-8');

    text = text.toLowerCase()
        .replaceAll('end of page', '')
        .replaceAll(/\n{1,}/g, ' ')
        .replaceAll(/[?!"@\.,\-=:\(\)\/]/g, ' ')
        .replaceAll(/[ ]+/g, ' ')
        .split(' ');

    for (const word of text) {
        if (stats[word]) stats[word]++;
        else stats[word] = 1;
    }

    processed += text.length;
    console.log(`${sufix}: ${processed.toString().padStart(15)} (${Object.keys(stats).length})`);
}

let letters = 'abcdefghijklmnopqrstuvwxyz', done = false;
for (const l1 of letters) {
    for (const l2 of letters) {
        run(l1 + l2);
        // done = true; break;
        if (l1 == 'f' && l2 == 'f') {
            done = true;
            break
        }
    }
    if (done) break;
}

let words = Object.keys(stats);
words = words.sort((a, b) =>
    stats[b] - stats[a]
)

let rank = 1, out = '',
    arr = [], lastCount = 0;
for (let word of words) {
    out += rank + '\t' + word + '\t' + stats[word] + '\n',
    rank++;

    if (lastCount != stats[word]) {
        lastCount = stats[word];
        arr.push(0)
    }
    arr[arr.length - 1]++;
}
writeFileSync('wiki.txt', out, 'utf-8');

out = '';
for (const i in arr) {
    out += i + '\t' + arr[i] + '\n'
}
writeFileSync('wika.txt', out, 'utf-8');