(function () {
    // 设置唯一的$标识
    let $ = Symbol('$');
    let a = {}
    a['c'] = {};

    console.log(a["b"], a["c"]);
    // 创建字典
    class Trie {
        constructor () {
            this.root = Object.create(null); 
        }
        // 插入方法
        insert(word) {
            let node = this.root;
            for (const c of word) {
                if (!node[c]) {
                    node[c] = Object.create(null);
                }
                node = node[c];
                console.log(node, this.root)
            }
            if (!($ in node)) {
                node[$] = 0;
            }
            node[$]++
        }
        // 出现最多的字符串
        most() {
            let max = 0;
            let maxWord = null;
            let visit = (node, word) => {
                if (node[$] && node[$] > max) {
                    max = node[$];
                    maxWord = word;
                }
                for (const p in node) {
                    visit(node[p], word + p)
                }
            }
            visit(this.root, '');
            console.log(maxWord, max);
        }
    }
    // 随机字符串
    function rendomWord(length) {
        var s = '';
        for (let i = 0; i < length; i++) {
            s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0))
        }
        return s;
    }
    // 生成列表
    let trie1 = new Trie();

    for (let i = 0; i < 100000; i++) {
        trie1.insert(rendomWord(4));
    }
    console.log(trie1, trie1.most());
})()