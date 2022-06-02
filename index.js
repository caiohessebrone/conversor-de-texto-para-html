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

const manipulingLink = (line) => {
    const infoLink = line.slice(7).replace(/].*/, '').split(',')
    const contentLink = line.slice(7).replace(/.*]/, '').trim()
    fs.appendFileSync(contentPath, `<a href=${infoLink[0]} target="${infoLink[1].trim()}">${contentLink}</a>`)
}

rl.on('line', (line) => {
    if (line.startsWith('[h1]')) {
        manipulingText(line, '[h1]', '<h1>');
    }
    if (line.startsWith('[h2]')) {
        manipulingText(line, '[h2]', '<h2>');
    }
    if (line.startsWith('[link]')) {
        manipulingLink(line)
    }
    console.log(line);
});