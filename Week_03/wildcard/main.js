// ab*cd*abc*a?d
function find(source, pattern) {
    // 计算*号
    let startCount = 0;
    for (let i = 0; i < pattern.length; i++) {
        if(pattern[i] === '*') {
            startCount++;
        }
    }
    // 如果没有* 号的情况去
    if (startCount === 0) {
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] !== source[i] && pattern[i] !== "?") {
                return false;
            }
        }
        return;
    }
    // pattern的位置
    let i = 0;
    // source字符串的位置
    let lastIndex = 0;
    // 匹配第一个*之前的内容
    for (i = 0; pattern[i] !== '*'; i++) {
        if (pattern[i] !== source[i] && pattern[i] !== "?") {
            return false
        }
    }

    lastIndex = i;

    
}