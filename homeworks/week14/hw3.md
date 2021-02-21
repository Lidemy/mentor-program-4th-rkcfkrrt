## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？
DNS（Domain Name System）網域名稱系統，是用於將網域名稱(Domain Name)與 IP 位址(IP address)相互轉換。網域名稱由字母組成，是給人類看的、便於人類記憶，IP 位址則是以數字組成、為電腦所用，透過 DNS 可以將兩者轉換無礙。人們的上網行為便是始於透過網址訪問 DNS 以查詢 IP 位址，接著才能連線到正確的 IP 位址。
而 Google 提供的公開的 DNS，對使用者而言，它有著便利與加速瀏覽體驗的優點；而對 Google 本身而言，他們得藉此收集使用者的上網記錄，這些上網行為將可變成他們掌握的資料，可進一步將用戶數據應用於像是廣告投放等方面。

1. [第十九章、主機名稱控制者： DNS 伺服器](http://linux.vbird.org/linux_server/0350dns.php#theory)
2. [什麼是 DNS？](https://aws.amazon.com/tw/route53/what-is-dns/)
3. [還在 Google DNS 8.8.8.8？更安全好用的「1.1.1.1」讓臉書不卡卡](https://www.vedfolnir.com/world-best-dns-1111-rather-than-8888-and-hinet-dns-29245.html)
4. [適合所有人的DNS：優點和缺點](https://zh-tw.secnews.gr/189699/dns%E5%9C%A8%E7%B7%9A/)

## 什麼是資料庫的 lock？為什麼我們需要 lock？

在同時間有多個交易(transaction)欲存取某一資料，可能會產生幾個問題，像是遺失更新(Lost Update)、不一致分析(Inconsistent Analysis)、未確認相依(Uncommitted Dependency)、無法重複讀取(Nonrepeatable Read)等問題，**並行控制**便是為避免以上問題，用於使各交易不會互相干擾，甚至導致不一致的情形發生。
並行控制的作法有數種，一般多使用鎖定(lock)來解決，簡單來說就是在交易 A 執行像是讀取或寫入操作時，會鎖定該資料項，如交易 B 也想存取同樣的資料時，會因為資料已被鎖定而須待交易 A 解除鎖定後才可進行。
被鎖定的資料項的單位視需求而可大可小，大至整個資料庫，小至一個欄位，使用 lock 時須仔細考量資料項的層級，避免造成效能問題。
鎖定還可分為三種常見的模式，二元鎖定(Binary Locking)、共享/互斥鎖定(Shared and Exclusive Locking)與兩階段鎖定(Two Phase Locking)，在此則不細談。
藉由 lock 的使用，助於確保資料的正確性，避免某一交易讀取到其他交易正在更改中的資料或是防止多個交易同時變更同一筆資料。

參考資料
1. [淺談SQL Server的鎖定原理](https://cbw0731.pixnet.net/blog/post/5143648)
2. [兩階段鎖定法 - 資料結構](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj9pInrs-HuAhW5w4sBHdPBB_YQFjAIegQIBxAC&url=http%3A%2F%2Fim2.nhu.edu.tw%2Ffiles%2Fpersonal_subject%2F%2F246_a4086719.ppt&usg=AOvVaw0E2TTHhSYPPBZk9BfzfNZ6)
3. [交易管理](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj9pInrs-HuAhW5w4sBHdPBB_YQFjAEegQICxAC&url=https%3A%2F%2Fwww.mis.nsysu.edu.tw%2Fdb-book%2FCh12.ppt&usg=AOvVaw0nJ3iC41DKy9SDaT6yNhCu)
4. [SQL vs NoSQL 沒有硝煙的戰爭！](https://codertw.com/%E8%B3%87%E6%96%99%E5%BA%AB/16617/)
5. [SQL vs NoSQL: The Differences](https://www.kshuang.xyz/doku.php/database:sql_vs_nosql)
6. [了解NoSQL不可不知的5項觀念](https://www.ithome.com.tw/news/92506)

## NoSQL 跟 SQL 的差別在哪裡？
NoSQL 即 Not Only SQL，指的是非關聯式資料庫，相對來說，NoSQL 可儲存巨量的資料，且資料可以被割並放至不同的伺服器儲存，我們還可以從幾個方面來比較 NoSQL 跟 SQL（關聯式資料庫）。
1. 資料儲存格式：SQL 以 table 來儲存相關連的資料；NoSQL 儲存資料的格式則可以類似 JSON 的格式儲存，也可說是 Key-Value 資料模式，不同筆的資料間不具有關連性。
2. schema：SQL 在開始儲存資料前，須事先設計好欄位與其類型等設定，嚴格定義不同單位資料間的關係，在日後要進行 schema 的變更，會是一件難事；NoSQL 則沒有此限制，可將效能最佳化。
3. 資料庫擴展：SQL 須透過增加硬體運算能力，或新增唯讀工作負載副本的方式，增加效能或容量，向外擴展；NoSQL 則可水平擴充，以增加新的伺服器設備來增加容量進行擴充，且新設備甚至能採用普通等級電腦，用較低成本打造大型資料庫系統。
4. 資料一致性：SQL 採用的是交易(transaction)的設計，因此具有 ACID 的特性；NoSQL 大多沒有交易的設計，而是採用 CAP 資料庫理論，以 Eventually Consistency（資料遲早會一致）的寬鬆作法，讓資料庫得以維持分散式的擴充架構，允許資料暫時性的不一致，得到更彈性的作用。
5. 適合應用處：SQL 適合用在注重交易性、資料完整性，或須高度一致性線上交易處理；NoSQL 則適合用在有大量不確定的、無關連的或不斷變化的資料上。因此使用上的選擇，須考慮實際應用之處來決定。

參考資料
1. [什麼是 NoSQL？](https://aws.amazon.com/tw/nosql/)
2. [了解NoSQL不可不知的5項觀念](https://www.ithome.com.tw/news/92506)

## 資料庫的 ACID 是什麼？

為確保交易(transaction)的正確性與資料庫的正常運作，因此要求每個交易都必須符合 ACID 的特性。
1. 原子性(Atomicity)：交易有最小的運作單位，使資料操作的結果是具一致性的，皆成功或皆失敗。例如：買東西時，買方付錢和賣方給物品，要嘛都發生、要嘛都不發生，不會出現付完錢沒拿到物品，或不付錢卻拿走物品的情形。
2. 一致性(Consistency)：資料的改動是遵循原先訂好的資料規則，也就是 schema 的規範，以保持資料的一致。如改動不符合規則，資料則會回復狀態至改動前；如符合規則即可完成變更(Commit)。
3. 隔離性(Isolation)：資料庫透過鎖定(lock)的機制，使資料維持正確性，即使有多個交易同時在操作，也不會使同一筆資料在同時間被改動、發生數據不一致的情形。
4. 持久性(Durability)：當交易提交變更(Commit)後，該操作產生的資料便會永久保存、不會佚失，即使寫入的當下當機，也有方法可復原；例外是存放空間的硬體受損，才可能導致資料流失。

參考資料
1. [第十三章交易管理和並行控制](http://www.csie.sju.edu.tw/cm/course/db/ch13.pdf)
2. [│資料庫│淺談關聯式資料庫與ACID特性](https://medium.com/appxtech/%E8%B3%87%E6%96%99%E5%BA%AB-%E6%B7%BA%E8%AB%87%E9%97%9C%E8%81%AF%E5%BC%8F%E8%B3%87%E6%96%99%E5%BA%AB%E8%88%87acid%E7%89%B9%E6%80%A7-83a1b4178981)
3. [MySQL 基本運作介紹，從資料庫交易與 ACID 特性開始](https://tw.alphacamp.co/blog/mysql-intro-acid-in-databases)
