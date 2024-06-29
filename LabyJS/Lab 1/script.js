function count(){
    const a = Number(document.querySelector("#a").value)
    const b = Number(document.querySelector("#b").value)
    const c = Number(document.querySelector("#c").value)
    const d = Number(document.querySelector("#d").value)

    var sum = a+b+c+d
    var avg = (a+b+c+d)/4
    var min = Math.min(a,b,c,d)
    var max = Math.max(a,b,c,d)

    document.querySelector("#sum").innerHTML=sum
    document.querySelector("#avg").innerHTML=avg
    document.querySelector("#min").innerHTML=min
    document.querySelector("#max").innerHTML=min
}

