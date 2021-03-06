+function(){
    // 设置数据
    let mapJson = localStorage["map"] ? JSON.parse(localStorage['map']) : Array(10000).fill(0);
    // 鼠标的状态
    let mousedown = false;
    // 是否是右键，加入清除功能
    let clear = false;
    // 获取map
    let mapBox = document.getElementById('map');
    // 路径栈空间
    let queue = [];
    // 复制数据
    let table;
    // 初始化执行
    _init();
    class Sorted {
        constructor(data, compare) {
            this.data = data.slice();
            this.compare = compare || ((a,b) => a - b);
        }
        take() {
            if (!this.data.length) {
                return ;
            }
            // 寻找最小值
            let minData = this.data[0];
            let minIndex = 0;

            for (let i = 1; i < this.data.length; i++) {
                if (this.compare(this.data[i], minData) < 0) {
                    minData = this.data[i];
                    minIndex = i;
                }
            }

            this.data[minIndex] = this.data[this.data.length - 1];
            this.data.length--;
            return minData;
        }
        // 增加内容
        give(v) {
            this.data.push(v);
        }
        // 数组长度
        get length() {
            return this.data.length;
        }
    }
    function _init() {
        // 创建地图
        createMap();
        // 添加全局按下操作
        addMousedown();
        // 给按钮添加点击事件
        addButtonSaveEvent();
    }
    // 生成地图
    function createMap() {
        // 遍历
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                // 创建元素
                let cell = document.createElement('div');
                cell.classList.add('cell');
                // 判断元素的值是否是1 ，如果是1修改颜色；
                boxStyle(mapJson[100 * i + j] === 1, cell);
                // 添加事件
                addCellEvent(cell, 100 * i + j);
                // 添加到页面上面
                mapBox.appendChild(cell);
            }
        }
    }
    // 添加鼠标移动事件
    function addCellEvent(dom, position) {
        let p = position;
        dom.addEventListener('mousemove', () => {
            if (mousedown) {
                // 判断是否是清除长按操作
                if (clear) {
                    boxStyle(false, dom);
                    mapJson[p] = 0;
                } else {
                    boxStyle(true, dom);
                    mapJson[p] = 1;
                }
            }
        })
    }
    // 添加元素样式
    function boxStyle(bool, dom) {
        bool ? dom.classList.add('back') : dom.classList.remove('back');
    }
    // 添加全局事件
    function addMousedown() {
        // 鼠标按下操作
        document.addEventListener('mousedown', (e) => {
            mousedown = true;
            // 判断是否是右键事件
            clear = (e.which === 3);
        });
        // 鼠标放开事件
        document.addEventListener('mouseup', () => {
            mousedown = false;
        });
        // 剔除原有的右键事件
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
    // 给按钮添加点击事件
    function addButtonSaveEvent() {
        let saveBtn = document.getElementById('save');
        saveBtn.addEventListener('click', () => {
            localStorage.setItem('map', JSON.stringify(mapJson));
        })
    }
    // 计算路径
    async function path(start, end) {
        // 生成新的queue
        queue = new Sorted([start], (a, b) => distance(a, end) - distance(b, end));
        table = Object.create(mapJson);
        while(queue.length) {
            let [x, y] = queue.take();
            if (x === end[0] && y === end[1]) {
                console.log(table, x, y);
                let pathList = [];
                while(x !== start[0] || y !== start[1]) {
                    pathList.push(mapJson[x * 100 + y]);
                    [x, y] = table[100 * x + y];
                    await sleep(20);
                    mapBox.children[100 * x + y].classList.add('red');
                }
                return true;
            }
            await insert(x, y - 1, [x, y]);
            await insert(x, y + 1, [x, y]);
            await insert(x + 1, y, [x, y]);
            await insert(x - 1, y, [x, y]);

            // 斜角方向
            await insert(x - 1, y - 1, [x, y]);
            await insert(x + 1, y + 1, [x, y]);
            await insert(x + 1, y - 1, [x, y]);
            await insert(x - 1, y + 1, [x, y]);
        }
        return null;
    }
    // 计算该点直线距离终点位置 利用勾股定理
    function distance(position, end) {
        return (position[0] - end[0]) ** 2 + (position[1] - end[1]) ** 2;
    }
    // 插入数据队列数据
    function insert(x, y, pre, end) {
        if (x < 0 || x >= 100 || y < 0 || y >= 100) {
            return;
        } else if (mapJson[100 * x + y]) {
            return;
        }
        mapBox.children[100 * x + y].classList.add('path');
        mapJson[100 * x + y] = 2;
        table[100 * x + y] = pre;
        queue.give([x, y]);
        
    }
    // 寻找最优点
    function getBestPostion(x, y, pre) {
    }
    // sleep函数
    function sleep(t) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, t);
        })
    }

    path([0, 0], [50, 50]);
}()