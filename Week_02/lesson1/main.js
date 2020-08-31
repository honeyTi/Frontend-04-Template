+function () {
    // 设置数据
    let mapJson = localStorage["map"] ? JSON.parse(localStorage['map']) : Array(10000).fill(0);
    // 鼠标的状态
    let mousedown = false;
    // 是否是右键，加入清除功能
    let clear = false;
    // 获取map
    let mapBox = document.getElementById('map');
    // 初始化执行
    _init();
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
        console.log(mapJson);
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
}()