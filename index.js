const readline = require('readline');
const fs = require('fs');
const readable = fs.createReadStream('simple.file.txt');
const contentPath = './arq.txt';

const rl = readline.createInterface({
    input: readable,
});

const manipulingLink = (line, outElement=false) => {
    const link = line.match(/\[link.*\]/)[0].split(';').slice(1);
    const metaLink = {
        href: link[0].split(',')[0].replace('[', '').trim(),
        target: link[0].split(',')[1].replace(']', '').trim(),
    }
    const result = `<a href=${metaLink.href} target="${metaLink.target}">${link[1]}</a>`;
    if (!outElement) {
        return result;
    }else {
        fs.appendFileSync(contentPath, result);
    }

}

const manipulingText = (line, condition, newValue) => {
    output = line.replace(condition, '').trim()
    lineOutpu = `${newValue}${output}${newValue.replace('<', '</')}\n`;
    if (line.includes('[link]')) {
        const link = lineOutpu.match(/\[link.*\]/)[0].split(';').slice(1);
        const fullString = lineOutpu.replace(/\[link.*\]/, manipulingLink(lineOutpu))
        fs.appendFileSync(contentPath, fullString)
    }else {
        fs.appendFileSync(contentPath, lineOutpu)
    }
}

rl.on('line', (line) => {
    if (line.startsWith('[h1]')) {
        manipulingText(line, '[h1]', '<h1>');
    }
    if (line.startsWith('[h2]')) {
        manipulingText(line, '[h2]', '<h2>');
    }
    if (line.startsWith('[link]')) {
        manipulingLink(line, true)
    }
    console.log(line);
});