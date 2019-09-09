class Random{
    constructor() {
        var r ;
        if(arguments.length){
            if(typeof arguments[0] === "function"){
                var arg = [...arguments];
                console.log({arguments,arg})
                arguments[0].call(Random,arg.splice(1));
            }else if(arguments.length === 1){
                if(typeof arguments[0] === "number"){
                    console.log('1')
                    r = Random.number(arguments[0])
                }
            }else if(arguments.length >= 2){
                if(typeof arguments[0] === "number" && typeof arguments[1] === "number"){
                    console.log('>2')
                    r = Random.number(arguments[0],arguments[1])
                }
            }
        }else{
            return Random.number(10000);
        }
        console.log('r')
        this[0] = r
        return r
    }
    static id($,start,end){
        var o     = [[9,48],[25,65],[25,97]],
            b     = "",
            start = start ? start : "",
            end   = end   ? end   : "";
        for(var i=0;i<$;i++){
            var n = Random.number(o.length);
            b += String.fromCharCode(Random.number(o[n][0],o[n][1]));
        }
        return `${start}${b}${end}`;
    }
    static number(a,b){
        // generate a number between 0,a ; if b is define will add to random number
        var n = Math.floor(Math.random() * a);
        if(typeof b === "number"){
            return n+b;
        }
        return n
    }
    static between(a,b){
        // generate a number between a,b
        var bb;
        if(a>b){
            bb = b; b = a; a = bb;
        };
        return a+Random.number(b-a);
    }
    static generateID(start,between,end,obj){
        var a = between[0] ? between[0] : 0,
            b = between[1] ? between[1] : 0;
        var $ = Random.between(a,b);
        var key = Random.id($,start,end);
        if(Array.isArray(obj)){
            if(obj.indexOf(key) !== -1){
                return Random.generateID(start,between,end,obj);
            }
        }else{
            if(obj[key] || obj[key] == [] || obj[key] == {}){
                return Random.generateID(start,between,end,obj);
            }
        }
        return key;
    }
}
module.exports = Random
// export default Random