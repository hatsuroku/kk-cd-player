/* eslint @typescript-eslint/no-var-requires: "off" */

const csvToJson = require('csvtojson')
const axios = require('axios')
const fs = require('fs');
const path = require('path');

// 同时下载任务限制（注：每个任务可能由六个 HTTPS 请求构成）
const threads = 1;
const inputFile = './list.csv';
const assetPath = [
    './K.K. Songs/img-cover',
    './K.K. Songs/song-live',
    './K.K. Songs/song-aircheck',
    './K.K. Songs/song-music_box',
    './K.K. Songs/song-dj_kk_remix',
    './K.K. Songs/song-nes_remix'];

// 递归目录创建
function mkdirRecursion (dirName) {
    if (fs.existsSync(dirName)) {
        return true;
    } else {
        if (mkdirRecursion(path.dirname(dirName))) {
            fs.mkdirSync(dirName);
            return true;
        }
    }
}

// 下载器
async function downloader (url, filePath, fileName) {
    const file = path.resolve(filePath, fileName);
    const writer = fs.createWriteStream(file);
    const response = await axios({
        url,
        method: "GET",
        timeout: 5000,
        responseType: "stream"
    });
    console.log(url, filePath, fileName)
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    })
    // console.log(url, filePath, fileName)
    // return Promise.resolve()
}

// 下载分配
async function taskAllocator(task) {
    // 模板
    const taskSth = (getFunc) => {
        return (downloadPath) => {
            if (getFunc(task) !== '-') {
                const fileExtension = getFunc(task).split('.').pop().toLowerCase();
                const fileName = task.name_en + '.' + fileExtension;
                return downloader(getFunc(task), downloadPath, fileName);
            } else {
                return Promise.resolve();
            }
        }
    }

    const taskCoverImg = taskSth(function (task) { return task.coverImg })

    return Promise.all([taskCoverImg()])

    // const taskCoverImg = new Promise((resolve, reject) => {
    //     if (task.coverImg !== "-") {
    //         const fileExtension = task.coverImg.split('.').pop().toLowerCase();
    //         const fileName = task.name_en + '.' + fileExtension
    //         return downloader(task.coverImg, './', fileName)
    //     } else {
    //         return Promise.resolve()
    //     }
    // })
    //
    // return Promise.all([])
}

// 下载任务管理器
function taskManager (list) {
    const unfinishedList = list;
    let activeThreads = 0;

    function idle () { return activeThreads < threads }
    function haveAnyTask () { return unfinishedList.length > 0 }

    const pollingTimer = setInterval(()=>{
        if (idle() && haveAnyTask()) {
            const current = unfinishedList.shift();
            activeThreads++;
            taskAllocator(current)
                .then(() => { activeThreads--; })
                .catch(() => { unfinishedList.push(current) })
        }
        if (unfinishedList.length <= 0) {
            console.log('下载已完成')
            clearInterval(pollingTimer)
        }
    }, 500)
}

// 入口
new function () {
    // 创建需要的目录
    for (let item of assetPath) {
        mkdirRecursion(item);
    }
    // 解析 csv 文件，发起下载
    csvToJson()
        .fromFile(inputFile)
        .then((json) => {
            taskManager(json)
        })
}
