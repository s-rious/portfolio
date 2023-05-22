function insert(num) {
    document.output.outputtext.value = document.output.outputtext.value + num;
}

function equal() {
    var exp = document.output.outputtext.value;
    try {
        if(exp) {
        document.output.outputresult.value = eval(exp);
        }
        else if (exp = " ") {
            document.output.outputresult.value = "undefined"
        }
    }
    catch {
        document.output.outputresult.value = "undefined";
    }
}