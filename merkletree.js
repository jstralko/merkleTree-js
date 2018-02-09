const crypto = require('crypto');

const list = ['1', '2', '3', '4'];
const stack = [];
let merkleRoot = null;

while (merkleRoot == null) {
    if (stack.length === 1 && list.length === 0) {
        merkleRoot = stack.pop();
    }
    else if (stack.length < 2 || !isSameHeight()) {
        const item = list.pop();
        const node = {};

        node.height = 1;
        node.hash = sha256(item);

        stack.push(node);
    }
    else {
        const left = stack.pop();
        const right = stack.pop();
        const child = {};

        child.height = left.height + 1;
        child.hash = sha256(left.hash + right.hash);
        child.left = left;
        child.right = right;

        stack.push(child);
    }
}

console.log(`merkleRoot: ${JSON.stringify(merkleRoot.hash)}`);

function sha256(data) {
    return crypto.createHmac('sha256', data)
        .digest('hex');
}


function isSameHeight() {
    if (stack.length > 1) {
        if (stack[stack.length - 1].height === stack[stack.length - 2].height) {
            return true;
        }
    }

    return false;
}
