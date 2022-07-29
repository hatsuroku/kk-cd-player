# Song list generator

本工具可完成该项目中大量 K.K. 音频资源和图像资源的批量下载和列表生成。  
使用后，列表 JSON 文件和资源文件将分别生成或下载至本目录，方便进一步上传至 CDN 或对象存储。

## 使用：
本工具会自动解析 list.csv 并完成文件内链接文件的下载和整理。

下载前，确保需要下载的内容已如本目录下 csv 文件 `list.csv.template` 所示正确编写：  
|列|意义|
|--|----|
|serial|音频序列（和列表顺序无关）|
|name_en|唱片的英文名|
|name_zh|唱片的中文名|
|name_jp|唱片的日文名|
|coverImg|唱片封面 URL|
|live|现场演唱版 URL|
|aircheck|零售唱片版 URL|
|music_box|音乐盒版 URL|
|dj_kk_remix|K.K. 混音版 URL|
|nes_remix|NES 8bit 版 URL|
|description|三国语言的注释，JavaScript 对象。结构如示例样式|

一切就绪，执行 `node index.js` 即可开始下载 