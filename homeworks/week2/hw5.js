function join(arr, concatStr) {
  if (arr.length ===0){
    return '';
  }
  
    var result = arr[0];
    for(i=1; i<arr.length; i++){
      result += concatStr + arr[i];
    }
    return result;
}

function repeat(str, times) {
    var result = '';
    for(i=1; i<=times; i++){
      result += str;
    }
    return result;
}

console.log(join(["a", "b", "c"], "!"));
console.log(repeat('xd', 5));
