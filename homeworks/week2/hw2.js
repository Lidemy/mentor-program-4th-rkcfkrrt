function capitalize(str) {
    var a =str.charAt(0)
    var b =str.replace(a, a.toUpperCase()) 
    return b
  }
  
  console.log(capitalize('hello'));