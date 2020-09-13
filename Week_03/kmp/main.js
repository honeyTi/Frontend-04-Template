function kmp(source, pattern) {
    // 计算跳转表格
    // 创建条状表
    let table = new Array(pattern.length).fill(0);
    // 重复字符串判断标志
    {
        let i = 1, j = 0;

        // abceabcd
        while(i < pattern.length) {
            if (pattern[i] === pattern[j]) {
                ++i; ++j;
                table[i] = j;
            } else {
                if (j > 0) {
                    j = table[j]
                } else {
                    ++i
                }
            }
        }
    }
    // 匹配内容
    console.log(table);
    {
        let i = 0, j = 0;
        while (i < source.length) {
            if (pattern[j] === source[i]) {
                ++i; ++j;
            } else {
                if (j > 0) {
                    j = table[j];
                } else {
                    ++i
                }
            }

            if (j === pattern.length) {
                return true;
            }
        }
        return false;
    }
    
}

console.log(kmp("abc", 'abc'));