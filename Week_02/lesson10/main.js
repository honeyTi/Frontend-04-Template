+function(){
    let reg = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

    let dict = ['Number', 'Whitespace', 'LineTeminator', '*', '/', '+', '-'];

    let source = [];

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
    // 生成内容；
    for (const token of tokenSize("1 + 2 * 5 + 3")) {
        if (token.type !== 'Whitespace' && token.type !== 'LineTeminator') {
            source.push(token);
        }
    }
    function additiveExpression(source) {
        if (source[0].type === 'MultiplicativeExpression') {
            let node = {
                type: 'AdditiveExpression',
                children: [source[0]]
            }
            source[0] = node;
            return additiveExpression(source);
        }

        // 加号
        if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '+') {
            let node = {
                type: 'AdditiveExpression',
                operator: '+',
                children: []
            }
            node.children.push(source.shift());
            node.children.push(source.shift());
            multiplicativeExpression(source);
            node.children.push(source.unshift());
            source.unshift(node);
            return additiveExpression(source);
        }
        // 减号
        if (source[0].type === 'AdditiveExpression' && source[1] && source[1].type === '-') {
            let node = {
                type: 'AdditiveExpression',
                operator: '-',
                children: []
            }
            node.children.push(source.shift());
            node.children.push(source.shift());
            multiplicativeExpression(source);
            node.children.push(source.unshift());
            source.unshift(node);
            return additiveExpression(source);
        }
        if (source[0].type === "AdditiveExpression") {
            return source[0];
        }
        multiplicativeExpression(source);
        return additiveExpression(source);
    }
    // 乘法
    function multiplicativeExpression(source) {
        if (source[0].type === 'Number') {
            let node = {
                type: 'MultiplicativeExpression',
                children: [source[0]]
            }
            source[0] = node;
            return multiplicativeExpression(source);
        }

        if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '*') {
            let node = {
                type: 'MultiplicativeExpression',
                operator: '*',
                chilren: []
            }
            node.chilren.push(source.shift());
            node.chilren.push(source.shift());
            node.chilren.push(source.shift());
            source.unshift(node);
            return multiplicativeExpression(source);
        }

        if (source[0].type === 'MultiplicativeExpression' && source[1] && source[1].type === '/') {
            let node = {
                type: 'MultiplicativeExpression',
                operator: '/',
                chilren: []
            }
            node.chilren.push(source.shift());
            node.chilren.push(source.shift());
            node.chilren.push(source.shift());
            source.unshift(node);
            return multiplicativeExpression(source);
        }

        if (source[0].type === 'MultiplicativeExpression') {
            return source[0];
        }

        return multiplicativeExpression(source);
    }

    console.log(additiveExpression(source))
}()