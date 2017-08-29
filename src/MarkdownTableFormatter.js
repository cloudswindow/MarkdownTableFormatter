const fs = require('fs');

// 包含需要处理的table md代码文件
const file = './test.md'

const buffer = fs.readFileSync(file)
let body = buffer.toString();

// repeat blank by times depended by param
const repeatBlank = function (times) {
    if (times < 1) {
        return '';
    }
    let result = ' ';
    for (let i = 0; i < times - 1; i++) {
        result += ' ';
    }
    return result;
}

// repeat dash  by times depended by param
const repeatDash = function (times) {
    if (times < 1) {
        return '';
    }
    let result = '-';
    for (let i = 0; i < times - 1; i++) {
        result += '-';
    }
    return result;
}


// split content by \n
let lines = body.split("\n");
let rows = [];
let maxItemLength = 0;

// get max length of cell (split by |) content, and store real(without head or tail blank each cell) content
for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let items = line.split("|");
    let cells = [];
    for (let j = 1; j < items.length - 1; j++) {
        let item = items[j].replace(/(^\s*)/g, '').replace(/\s*$/g, '');
        console.log(item)
        let len = item.length;
        if (len > maxItemLength) {
            maxItemLength = len;
        }
        cells.push(item);
    }
    rows.push(cells);
}


let resultLines = [];
for (let i = 0; i < rows.length; i++) {
    let line = '|';
    let cells = rows[i];
    for (let j = 0; j < cells.length; j++) {
        let cell = cells[j];
        var repeatBlankNum = maxItemLength - cell.length;
        var hasLongChar = false;

        // simple handle with "long character" like chinese....
        for (let k = 0; k < cell.length; k++) {
            if (cell[k].charCodeAt(0) > 0x024F) {
                repeatBlankNum -= 1;
                hasLongChar = true;
            }
        }
        if (hasLongChar) {
            repeatBlankNum += 1;
        }
        //处理第二行，对齐方式
        if (i === 1) {

            // set isLeft value 1 if content start with ":" ,0 otherwise
            let isLeft = /^:/.test(cell) ? 1 : 0;

            // set isLeft value 2 if content start with ":" ,0 otherwise
            let isRight = /:&/.test(cell) ? 2 : 0;

            // set result value with isLeft add with isRight
            let result = isLeft + isRight;

            // three cases
            switch (result) {
                // only start with : means Align left
                case 1:
                    line += ":" + repeatDash(maxItemLength - 1);
                    break;

                // only end with : means Align Right
                case 2:
                    line += repeatDash(maxItemLength - 1) + ":";
                    break;

                    // both start with : and end with : means Align center
                case 3:
                    line += ":" + repeatDash(maxItemLength - 2) + ":";
                    break;
                    // default without :,so just repeat with - means Align left
                default:
                    line += repeatDash(maxItemLength);
            }
        } else {
            line += cell + repeatBlank(repeatBlankNum);
        }

        line += '|'
    }

    resultLines.push(line);
}

console.log(`results:\n\r${resultLines.join('\n\r')}`)

