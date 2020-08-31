+function () {
    let patten = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]

    let color = 1;

    function show(patten) {
        let board = document.getElementById('board');
        board.innerHTML = '';
        for (let i = 0; i < patten.length; i++) {
            for (let j = 0; j < patten[i].length; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.innerText = patten[i][j] === 2 ? "X"
                : patten[i][j] === 1 ?
                'O': '';
                cell.addEventListener('click', () => {
                    move(i, j)
                })
                board.appendChild(cell);
            }

            board.appendChild(document.createElement('br'));
        }
    }
    // 落子
    function move(x, y) {
        patten[x][y] = color;
        if (check(patten, color)) {
            alert(color === 2 ? 'X is winner' : 'O is winer')
        }
        color = 3 - color;
        show(patten);
        // 判断输赢
        computerMove();
    }

    // 判断输赢
    function check(patten, color) {
        // 三行
        for (let i = 0; i < patten.length; i++) {
            let win = true;
            for (let j = 0; j < patten[i].length; j++) {
                if (patten[i][j] !== color) {
                    win = false;
                }
            }
            if (win) {
                return true;
            }
        }
        // 三列
        for (let i = 0; i < patten.length; i++) {
            let win = true;
            for (let j = 0; j < patten[i].length; j++) {
                if (patten[j][i] !== color) {
                    win = false;
                }
            }
            if (win) {
                return true;
            }
        }
        // 相等坐标情况
        {
            let win = true;
            for (let j = 0; j < patten.length; j++) {
                if (patten[j][j] !== color) {
                    win = false;
                }
            }
            if (win) {
                return true;
            }
        }
        // 不相等的坐标
        {
            let win = true;
            for (let j = 0; j < patten.length; j++) {
                if (patten[j][2 - j] !== color) {
                    win = false;
                }
            }
            if (win) {
                return true;
            }
        }
        // 如果没有匹配对象，返回false
        return false;
    }

    // 判断输赢深拷贝
    function clone(patten) {
        return JSON.parse(JSON.stringify(patten));
    }
    function willWin(patten, color) {
        for (let i = 0; i < patten.length; i++) {
            for (let j = 0; j < patten[i].length; j++) {
                if(!patten[i][j]){
                    let tep = clone(patten);
                    tep[i][j] = color;
                    if (check(tep, color)) {
                        return [i, j]
                    }
                }
            }
        }
        return null;
    }

    // 策略选择
    function bestChoice(patten, color) {
        let p;
        if (p = willWin(patten, color)) {
            return {
                point: p,
                result: 1,
            }
        }
        let result = -2, point = null;
        for (let i = 0; i < patten.length; i++) {
            for (let j = 0; j < patten[i].length; j++) {
                if (!patten[i][j]) {
                    let temp = clone(patten);
                    temp[i][j] = color;
                    let r = bestChoice(temp, 3 - color).result;
                    if (-r > result) {
                        result = -r;
                        point =  [i, j]
                    }
                }
            }
            
        }
        return {
            point,
            result: point ? result : 0
        }
    }

    // 人机对战
    function computerMove() {
        let { point } = bestChoice(patten, color);
        if (point) {
            patten[point[0]][point[1]] = color;
        }
        if (check(patten, color)) {
            alert(color === 2 ? 'X is winner' : 'O is winer')
        }
        color = 3 - color;
        show(patten);
    }

    show(patten);
}()