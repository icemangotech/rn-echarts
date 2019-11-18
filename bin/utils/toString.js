export default function toString(obj) {
    let result = JSON.stringify(obj, function (key, val) {
        if (typeof val === 'function') {
            return `~--demo--~${val}~--demo--~`;
        }
        return val;
    });
    return unescape(result
        .replace(/"?~--demo--~"?/g, '')
        .replace(/\\n/g, '')
        .replace(/\\\"/g, '"') //将release模式中莫名生成的\"转换成"
        .replace(/\\u/g, '%u'));
}
