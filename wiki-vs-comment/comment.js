import { parse } from 'csv-parse/sync';
import { readFileSync, writeFileSync, appendFileSync } from 'fs';

let data =
    readFileSync('ViLexNorm/data/dev.csv', 'utf-8') + '\n'
    + readFileSync('ViLexNorm/data/test.csv', 'utf-8') + '\n'
    + readFileSync('ViLexNorm/data/train.csv', 'utf-8');

data = parse(data, {
    columns: true,
    skip_empty_lines: true
});

let text = '';
for (let i = 0; i < data.length; i++)
    text += data[i].normalized + '  ';

text = text.toLowerCase()
    .replaceAll(/[?!"@\.,\-=:\(\)]/g, ' ')
    .replaceAll(/[ ]+/g, ' ');

writeFileSync('comment.txt', text, 'utf-8');

data = text.split(' ');

let stats = {};
for (const word of data) {
    if (stats[word]) stats[word]++;
    else stats[word] = 1;
}

let words = Object.keys(stats);
console.log('Unique word: ' + words.length);
console.log('Word processed: ' + data.length);

let max = 0, word = '', rank = 1;
for (let _ of words) {
    for (let l1 = 0; l1 < words.length; l1 ++) {
        if (stats[words[l1]] > max) {
            word = words[l1]
            max = stats[word];
        }
    }

    appendFileSync(
        'stats.txt',
        rank + '\t' + word + '\t' + max + '\n',
        'utf-8'
    )
    rank++
    stats[word] = 0;
    max = 0;
}