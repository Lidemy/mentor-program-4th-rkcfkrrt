## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. <blink>：閃爍的文字，一個可以製造浮誇效果的標籤。
2. <center>：置中標籤，可以把文字、圖片與表格等東西置中。
3. <blockquote>：可以把包起來的文字往右縮排，且此標籤功能可累加。

## 請問什麼是盒模型（box modal）

盒模型即指在 HTML 裡面，每一個元素都可以視作一個盒子，它涵蓋 content、padding、border 和 margin，而我們可以在 CSS 裡對上述這些結構作調整，以進行設計和排版。
在預設情況下區塊尺寸計算是：width + padding + border + margin
可見的尺寸之計算則是：width + padding + border
此即表示當我們在考慮一個元素的長寬時，需連帶 padding 和 border 一同考慮，如此才是畫面實際顯示的該元素長寬。
為了開發上的便利，於是叫做 box-sizing 的 CSS 屬性便因此誕生，使得開發者只要設定：`box-sizing: border-box`，便可使元素最終尺寸的會等於我們幫它設的長寬，而不用再自己考慮 padding 和 border 在那邊加加減減。


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

CSS 的 display 屬性是表示該元素的顯示類型，依不同元素會有各自的預設值，通常為 block 或 inline。
1. display:block 用於區塊元素，特性是讓內容自新的一行開始顯示，並佔據整行，且可以設定長寬、margin、padding。例：<header>、<section>、<footer>、<p>、<form> 等，皆為常見的區塊元素。
2. display:inline 用於行內元素，特性是可以和其他元素在同一行上排列，但不可設定長寬，也無法透過設定上下 margin、padding 以使排版隨著設定改變。常見的行內元素有 <a>、<span>、<imput> 等。
3. inline-block 則是使元素以 inline 的方式呈現，並同時擁有 block 的屬性，即可以設定長寬乃至於 padding、margin，並且可以水平排列。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
position 用於設定元素位置。
1. static 是預設值，套用此預設值的元素會按照瀏覽器預設的配置自動排版。
2. relative 相對定位，是以「自己原本顯示的位置為基準作偏移」，也就是偏移顯示，透過 top、left、right、bottom 的設定來偏移，但它並不會從資料當中抽掉，且它佔據的位置和大小不變。
3. absolute 絕對定位，使元素以「基準」為起點（其基準為往上找到的第一個 position 不是 static 的元素），透過 top、left、right、bottom 的設定決定其實際位置。
4. fixed 固定定位，是依據視窗做定位，所以永遠固定在視窗上；且因為從資料中抽離，是自己獨立一層，所以會蓋住其他東西。在未設定上下左右位置時，它會定在原本元素距離視窗頂端和左側的位置（所以拉動捲軸時它依舊停在那裡），常見的例子如蓋版廣告。
