此段程式碼會輸出的東西依序是：
2
2
undefined

要求得答案，必須先找出各個 this 是什麼，我們可以先把下面這段程式碼，轉成使用 `call` 的形式，在它後面放上我們呼叫 function 以前的東西。

轉換前：
```js
obj.inner.hello()
obj2.hello()
hello()
```

轉換後：
```js
obj.inner.hello.call(obj.inner)
obj2.hello.call(obj2)
hello.call()
```
在 `call` 裡面，小括號的第一個參數即為 this。
在知道各 this 是什麼後，我們所要求的東西便呼之欲出。
第一個 this 是 obj.inner，因此 value 為 2。
第二個 this 是 obj2，又因 `obj2 = obj.inner` 因此 value 為 2。
第三個 this 因為 hello 沒有傳東西進去，在非嚴格模式中，會是 window，而 value 則為 undefined。