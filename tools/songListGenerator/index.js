/* eslint @typescript-eslint/no-var-requires: "off" */

const csvToJson = require('csvtojson')
const axios = require('axios')
const fs = require('fs');
const path = require('path');

// 同时下载任务限制（注：每个任务可能由六个 HTTPS 请求构成）
const threads = 3;
const inputFile = './list.csv';
const outputJSON = './K.K. Songs/list.json'
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
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    })
    // return Promise.resolve();
}

// 生成文件名
function genFilename(downloadLink, task) {
    const fileExtension = downloadLink.split('.').pop().toLowerCase();
    return task.name_en + '.' + fileExtension;
}


// 下载分配
async function taskAllocator(task) {
    function downloadSth(downloadLink, downloadPath) {
        if (downloadLink) {
            const fileName = genFilename(downloadLink, task)
            console.log('开始下载:', fileName);
            return downloader(downloadLink, downloadPath, fileName)
                .then(() => { return Promise.resolve() })
                .catch(() => {
                    console.log('资源', downloadLink, '请求失败');
                    return Promise.reject()
                })
        } else {
            return Promise.resolve();
        }
    }

    return Promise.all([
        downloadSth(task.coverImg, assetPath[0]),
        downloadSth(task.live, assetPath[1]),
        downloadSth(task.aircheck, assetPath[2]),
        downloadSth(task.music_box, assetPath[3]),
        downloadSth(task.dj_kk_remix, assetPath[4]),
        downloadSth(task.nes_remix, assetPath[5])
    ])
}

// 保存 JSON 文件
function genJSON(json) {
    try {
        fs.writeFileSync(outputJSON, JSON.stringify(json));
        console.log("对应 JSON 文件已生成");
    } catch (err) {
        console.error(err);
    }
}

// 下载任务管理器
function taskManager (list) {
    const finishedList = [];
    const unfinishedList = list;
    let activeThreads = 0;

    function idle () { return activeThreads < threads }
    function haveAnyTask () { return unfinishedList.length > 0 }

    const pollingTimer = setInterval(()=>{
        if (idle() && haveAnyTask()) {
            const current = unfinishedList.shift();
            activeThreads++;
            console.log(`已新建任务: ${current.name_en}，还有 ${unfinishedList.length} 个任务`);
            taskAllocator(current)
                .then(() => {
                    finishedList.splice(current.serial - 1, 0,{
                        "name": {
                            "en": current.name_en,
                            "zh": current.name_zh,
                            "jp": current.name_jp
                        },
                        "coverImg": `${assetPath[0]}/${genFilename(current.coverImg, current)}`,
                        "song": {}
                    })
                    if (current.live) finishedList[current.serial - 1].song.live = `${assetPath[1]}/${genFilename(current.live, current)}`;
                    if (current.aircheck) finishedList[current.serial - 1].song.aircheck = `${assetPath[2]}/${genFilename(current.aircheck, current)}`;
                    if (current.music_box) finishedList[current.serial - 1].song.music_box = `${assetPath[3]}/${genFilename(current.music_box, current)}`;
                    if (current.dj_kk_remix) finishedList[current.serial - 1].song.dj_kk_remix = `${assetPath[4]}/${genFilename(current.dj_kk_remix, current)}`;
                    if (current.nes_remix) finishedList[current.serial - 1].song.nes_remix = `${assetPath[5]}/${genFilename(current.nes_remix, current)}`;
                    if (current.description) finishedList[current.serial - 1].description = JSON.parse(current.description);

                    console.log('已完成任务:', current.name_en);
                    activeThreads--;
                })
                .catch(() => {
                    console.log(current)
                    console.log('任务', current.name_en, '已失败，稍后重试');
                    activeThreads--;
                    unfinishedList.push(current)
                })
        }
        if (idle() && !haveAnyTask()) {
            clearInterval(pollingTimer)
            setTimeout(() => { genJSON(finishedList) }, 100)
        }
    }, 10)
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
