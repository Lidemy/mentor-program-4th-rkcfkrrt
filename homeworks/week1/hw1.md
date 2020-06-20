## 交作業流程
1. 開一個新的 **branch**：`git branch week1`
2. 切到上一步驟的 branch 寫作業：`git checkout week1`
3. 把作業檔案加入 git：`git add .`
4. 有異動後可提交一新版本並加上 commit：`git commit`
5. 當週作業全數完成並看完自我檢討與進行修正。
6. 把為了當週作業新開的那條 **branch** 使用 `git push` 指令丟上遠端。
    以我自己為例，我的 branch 名為 week1、遠端的節點為 **origin**，因此指令為 `git push origin week1`。
7. 打開自己 Github 專案的頁面，點擊 **pull requests** 的按鈕進入後，找到 **Compare & pull request** 的按鈕並點擊。
8. 若無法完成步驟 7，則點擊 **New pull request** 進入頁面，並自選正確的 **branch** 。
9. 在頁面底下的預覽畫面再次確認東西都有寫好後，填寫作業相關信息或提問並送出。
10. 打開學習系統的作業列表點擊新增作業，並填寫相關信息（作業周次與 **pull requests** 的連結）送出。
11. 當作業批改完成並 **merge** 後，local 端記得切換回 master，並把遠端的 master 使用指令 `git pull origin master` 到 local 端使兩邊同步。
12. 刪掉 local 端的 **branch**：`git branch -d week1`，即完成所有交作業流程。