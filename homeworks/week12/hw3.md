## 請簡單解釋什麼是 Single Page Application
Single Page Application（SPA）可以稱為單頁應用，有別於過去每換一個功能便須切換一次頁面以重新載入的 Multi-Page，SPA 的應用表示網頁在無須切換頁面的狀態下即可處理一些基本功能（例如：CRUD），它主要是利用 Ajax 的技術傳輸資料、做動態更新，使網頁可以僅更新部分資料、不必重新載入所有的東西，促使網頁更加流暢，進而讓使用體驗提昇。

## SPA 的優缺點為何
SPA 的優點：
1. 只做部分更新，可以有效節省時間與資源。
2. 在使用上更加流暢。
3. 讓前後端職責切分更加明確，便於日後維護。

缺點：
1. 首次載入頁面時必須先取得 JavaScript 等程式碼，需要比較長的反應時間（和 SSR，即伺服器端 render 相比的話）。
2. 因為內容是由 JavaScript 動態產生，在 SEO（搜尋引擎最佳化）上會有需面對的問題。
3. 因為要由單一頁面做所有的事，無法藉由 URL 網址的變化得知資料傳輸的狀態，需透過自訂狀態等方式做判斷。
補充：SPA 的網址並非不可變，但相較透過後端的方式，SPA 在過程中並不會發一個 request 到 server，而是自己處理變動再 render。

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

本週的作法即表示前後端分離，簡單來說優點是可以增進開發效率也便於維護程式碼，解決前後端分工不均的問題。
過去透過 PHP 直接輸出內容的留言板，是一次輸出整份完整的 HTML 檔案給瀏覽器顯示。
前後端分離的作法則是，先輸出完整的網頁架構，再透過 JavaScript 取得資料後將其動態填入網頁，因此若在瀏覽器上檢視原始碼，會發現 HTML 上並無法看到後來動態填入的資料、只有一開始即輸出「完整的網頁／HTML 檔案」的部分。SPA 的實現就是前後端分離的展現，通過技術的進步讓使用者體驗有所提升，優缺點也很明顯，即上兩題所述的那些。

參考：
1. [前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)
2. [跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9)
3. [單一頁面應用程式](https://mybaseball52.medium.com/%E5%96%AE%E4%B8%80%E9%A0%81%E9%9D%A2%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F-c98c8a17081)
4. [凡走過請留下痕跡：AJAX網頁的狀態與瀏覽記錄](http://rettamkrad.blogspot.com/2013/04/ajaxandhistoryapi.html)
5. [前端三十｜18. [FE] 為什麼網站要做成 SPA？SSR 的優點是什麼？](https://medium.com/schaoss-blog/%E5%89%8D%E7%AB%AF%E4%B8%89%E5%8D%81-18-fe-%E7%82%BA%E4%BB%80%E9%BA%BC%E7%B6%B2%E7%AB%99%E8%A6%81%E5%81%9A%E6%88%90-spa-ssr-%E7%9A%84%E5%84%AA%E9%BB%9E%E6%98%AF%E4%BB%80%E9%BA%BC-c926145078a4)
6. [單頁應用](https://zh.wikipedia.org/wiki/%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8)
7. [淺述 SSR SPA 優缺點](https://blog.niclin.tw/2019/01/06/%E6%B7%BA%E8%BF%B0-ssr-spa-%E5%84%AA%E7%BC%BA%E9%BB%9E/)
