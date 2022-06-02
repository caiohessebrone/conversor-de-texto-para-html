const readline = require('readline');
const fs = require('fs');
const readable = fs.createReadStream('simple.file.txt');
const contentPath = './arq.txt';

const rl = readline.createInterface({
    input: readable,
});

rl.on('line', (line) => {
    if (line.startsWith('##')) {
        fs.appendFileSync(contentPath, line.replace('##', 'h1'))
    }
    if (line.startsWith('#')) {
        fs.appendFileSync(contentPath, line.replace('#', 'h2')+'\n');
    }
    console.log(line);
});