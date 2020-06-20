## 交作業流程
1. 當週作業全數完成並看完自我檢討與進行修正。
2. 把為了當週作業新開的那條 **branch** 使用 `git push` 指令丟上遠端。
    以我自己為例，我的 branch 名為 week1、遠端的節點為 **origin**，因此指令為 `git push origin week1`。
3. 打開自己 Github 專案的頁面，點擊 **pull requests** 的按鈕進入。
4. 找到 **Compare & pull request** 的按鈕並點擊。
5. 若無法完成步驟3，則點擊 **New pull request** 進入頁面，並自選正確的 **branch** 。
6. 在頁面底下的預覽畫面再次確認東西都有寫好後，填寫作業相關信息或提問並送出。
7. 打開學習系統的作業列表點擊新增作業，並填寫相關信息（作業周次與 **pull requests** 的連結）送出。
8. 當助教批改完成並 **merge** 後，把遠端的 **master** 使用 `git pull origin master` 到 local 端使兩邊同步。
9. 刪掉 local 端的 **branch**，即完成所有交作業流程。

