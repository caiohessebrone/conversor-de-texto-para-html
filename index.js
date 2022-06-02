const readline = require('readline');
const fs = require('fs');
const readable = fs.createReadStream('simple.file.txt');
const contentPath = './arq.txt';

const rl = readline.createInterface({
    input: readable,
});

const manipulingText = (line, condition, newValue) => {
    output = line.replace(condition, '').trim()
    fs.appendFileSync(contentPath, `${newValue}${output}${newValue.replace('<', '</')}\n`)
}

rl.on('line', (line) => {
    if (line.startsWith('[h1]')) {
        manipulingText(line, '[h1]', '<h1>');
    }
    if (line.startsWith('[h2]')) {
        manipulingText(line, '[h2]', '<h2>');
    }
    console.log(line);
});