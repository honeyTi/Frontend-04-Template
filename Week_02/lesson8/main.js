+function(){
    let reg = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

    let dict = ['Number', 'Whitespace', 'LineTeminator', '*', '/', '+', '-'];

    function* tokenSize(source) {
        let result = null;
        let lastIndex = 0;
        while(true) {
            lastIndex = reg.lastIndex;
            result = reg.exec(source);
            // 如果匹配为空，跳出循环
            if (!result) break;
            if (reg.lastIndex - lastIndex > result[0].length) break;

            let token = {
                type: null,
                value: null
            }

            for (let i = 1; i <= dict.length; i++) {
                if (result[i]) {
                    token.type = dict[i - 1];
                }
            }
            token.value = result[0];
            yield token;
        }
        yield {
            type: 'EOF'
        }
    }
    for (const token of tokenSize("1024 + 10 * 25")) {
        console.log(token);
    }
}()