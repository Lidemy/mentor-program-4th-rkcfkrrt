## 什麼是 Ajax？
Ajax 的全名為「Asynchronous JavaScript and XML」也就是指**非同步**的 JavaScript 和 XML。
它使我們可以在送出 Request 後無需等待 Response 回來而可以先去執行其他事項，也就是可以與伺服器進行非同步更新，在不需要重新整理網頁的情況下，可以得到想要的資料（Response）。

## 用 Ajax 與我們用表單送出資料的差別在哪？
表單：送出資料即發一個 Request 到新的頁面去（也就是會換頁），瀏覽器再渲染出 Response。比較像是純粹透過 HTML 的元素帶某些參數到新頁面去，與 JavaScript 沒什麼關係。
Ajax：則是透過 JavaScript 交換資料。當 Server 回傳 Response，最後是會傳給瀏覽器上的 JavaScript。

## JSONP 是什麼？
JSONP 的全名為「JSON with Padding」，為可以讓網頁繞過同源政策從其他網域請求資料的作法，其方法是利用 `<script>` 標籤可以跨網域請求的特性，取得回傳的是 JavaScript object 的資料，它在 Server 端做填充，並在 client 端用函式拿到資料。

## 要如何存取跨網域的 API？
在存取資源時，若同時滿足相同的通訊協定、網域、通訊埠，則為同源；若在非同源的情況下，即會產生跨來源請求，例如存取跨網域的 API 便是其中一例，在此情況下要存取資源時，會因為安全性問題而被瀏覽器拒絕；若要成功執行，則必須得遵守 CORS 的規範。
CORS（Cross-Origin Resource Sharing）提供跨網域呼叫所要遵守的規範，簡單來說 CORS 使得當想要透過 JavaScript 存取跨網域的資源時必須得到 Server 的允許才能進行，取得授權的方法是在 response header 裡加上 `Access-Control-Allow-Origin`，可以直接加上：*，也就是 `Access-Control-Allow-Origin：*`，或是跟 origin 相同的 host，相符的情況下該請求便為成功，我們也可以透過 JavaScript 讀取 response。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
第四週是用 node.js 發 Request 到 Server，沒有瀏覽器的限制，可以任意發 Request 並取得 Response。
本週的各種應用則是有經過**透過瀏覽器**來進行，而瀏覽器基於安全性考量，設有各種限制（如同源政策），使得使用者要存取資料並非易事，無法隨意讀取各種檔案，而是必須在符合瀏覽器規範情況下，才可成功進行。
