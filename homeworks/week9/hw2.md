## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

varchar 和 text 都可用於儲存字串。
在長度上，varchar 長度可變，且可以設置最大長度，上限為 65535 字節，適合用在長度會變的屬性；text 則無法設置長度，適合在不知道屬性最大長度時使用，但其易佔用資源，是一大缺點。
另外，在資料查詢的效率上，由於 varchar 相對省空間且存於 table 的一部分，相較存於 table 外的 text，索引速度是 varchar > text。
所以在大部分的時候選用 VARCHAR，會是較好的選擇。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 是網站在瀏覽器儲存各種資訊的資料，可能會包含一些個人識別資訊（例如 session）、個人偏好設定、使用者行為的記錄等，便於網站提供符合使用者需求的資訊、或讓使用上更加便利。
當要設定 Cookie 時，HTTP 送出帶有 `Set-Cookie` 的 response header 到瀏覽器，告訴瀏覽器要儲存一個 Cookie；接下來瀏覽器的每個 repuest 會帶上含相對應的 `Cookie` 的標頭，將過去儲存的 cookies 傳給 Server。

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

以目前的留言板來說，
1. 如果在留言內容放入 HTML 標籤，標籤本身並不會被顯示在留言處，而是會顯示該標籤帶的效果，一如它在網頁裡應顯示的樣子。像是 `<span>yo</span>` 在留言板上僅顯示為 yo，而不會顯示有 `<span>`。
2. 密碼現在是未加密的狀態、也就是明碼，易外洩而造成很大的資安風險。
3. Cookie 容易被更改內容。判斷身分時如以存在 Cookie 裡的 user id 為憑藉，可藉由更改 Cookie 來偽造身分。
