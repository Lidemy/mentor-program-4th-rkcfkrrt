## Webpack 是做什麼用的？可以不用它嗎？
Webpack 是把模組化打包的工具，可用在瀏覽器實作一些原本瀏覽器不支援的功能，像是 require 或其他模組化的 JavaScript；另外也可把 JavaScript、Sass、圖片等東西打包，透過各種 loader 把不同的檔案類型載入進來使用，並且在載入過程中可以額外做像是資源轉換或優化程式碼之類的事項。
即使不使用 Webpack，也是可以透過其他方法達成上述的事項，只是步驟繁瑣許多，也需要花費更多的時間進行，使用 Webpack 便可以以較簡單的作法達成，幫助我們提昇效率，也節省時間。

參考資料
1. [Webpack Tutorial 繁體中文 Gitbook](https://neighborhood999.github.io/webpack-tutorial-gitbook/Part1/#%E7%82%BA%E4%BB%80%E9%BA%BC%E8%A6%81-webpack)
2. [Webpack教學 (一) ：什麼是Webpack? 能吃嗎？](https://medium.com/i-am-mike/%E4%BB%80%E9%BA%BC%E6%98%AFwebpack-%E4%BD%A0%E9%9C%80%E8%A6%81webpack%E5%97%8E-2d8f9658241d)

## gulp 跟 webpack 有什麼不一樣？
gulp 可說是自動化任務管理工具，能自行定義不同的工作並撰寫任務讓它們依序執行，它本身做不到 bundle，但可搭配各種功能的套件使用，像是 gulp-jshint 此套件可用於檢查 JavaScript 有無錯誤、gulp-uglify 則可用於最小化 JavaScript 檔案；而 webpack 則是模組化的 bundler，將需要的東西打包成模組，供使用者使用。
在部分功能上確實有所重疊，但是從定位上來說，兩者是有很明顯區別的。

參考資料
1. [Gulp](https://medium.com/hissing-f2e/gulp-3f7282a19c77)
2. [Gulp 基本使用教學](https://github.com/twtrubiks/Gulp-Beginners-Guide)
3. [<01 - 起手式> 安裝 webpack](https://ithelp.ithome.com.tw/articles/10184589)

## CSS Selector 權重的計算方式為何？
當有多個樣式存在時，CSS 最終套用的樣式是決定於權重值最高的樣式，而在 CSS Selector 權重的計算裡，我們最常使用的規則是： **id > class > 標籤**，也就是愈詳細指涉到元素/項目的 Selector 權重愈重。
計算方法是以 id 、class/pseudo class/ attribute、標籤此排序，依序對應到權重值(0, 0, 0)，根據含有的 Selector 計算權重值，取得實際 CSS Selector 為多少來做比較。舉例來說，權重值(1, 0, 0) > (0, 1, 1) > (0, 0, 2) > (0, 0, 1)。
此外，當權重相等時，後面的樣式會覆蓋前面的。
在 id、class、標籤之上，還有權重更重的 inline style，加上它的權重值是(1, 0, 0, 0)。最後則是權重最高的 !important，加上它的效果是，無視其他 id、class、標籤和 inline style，強行覆蓋該樣式。
在大部分情況下，建議還是以 id、class與標籤的權重來考慮，以免造成日後維護上的不便。

參考資料
1. [Day14 CSS：權重](https://ithelp.ithome.com.tw/articles/10221486?sc=rss.iron)
