function Plan(name, price, space, transfer, pages, discountMonths) {
    this.name = "Name:" + name;
    this.price = price;
    this.space = "Amount of Space: " + space;
    this.transfer = "Transfer Speed: " + transfer;
    this.pages = "# of Pages: " + pages;
    this.discountMonths = discountMonths;
    this.calcAnnual =
        function (discPercent) {
            var discPrice = this.price;
            //console.log("Price: " + discPrice);
            var currentDate = new Date();
            //console.log("Current Date: " + currentDate);
            var currentMonth = currentDate.getMonth();
            //console.log("This Month: " + currentMonth);
            for (var i = 0; i < this.discountMonths.length; i++) {
                //console.log("Length of Discount Months: " + this.discountMonths.length);
                if (this.discountMonths[i] === currentMonth) {
                    discPrice = this.price * discPercent;
                    //console.log("Price after discount" + discPrice);
                    break;
                }
            }
            return (discPrice * 12);
        }
};
var plan_1 = new Plan("Basic", 3.99, 100, 1000, 10, [0, 7]);
var plan_2 = new Plan("Professional", 5.99, 500, 5000, 50, [0, 7, 11]);
var plan_3 = new Plan("Ultimate", 10.99, 2000, 20000, 50, [0, 7]);

var annualPrice1_b = plan_1.calcAnnual();
var annualPrice2_b = plan_2.calcAnnual();
var annualPrice3_b = plan_3.calcAnnual();
console.log(annualPrice1_b, annualPrice2_b, annualPrice3_b);

var annualPrice1 = plan_1.calcAnnual(.80);
var annualPrice2 = plan_2.calcAnnual(.80);
var annualPrice3 = plan_3.calcAnnual(.80);
console.log(annualPrice1, annualPrice2, annualPrice3);

function plan1() {
    if (document.getElementById("name1").innerHTML == "") {
        document.getElementById("name1").innerHTML = plan_1.name;
        document.getElementById("basePrice1").innerHTML = "Price: $" + plan_1.price;
        document.getElementById("space1").innerHTML = plan_1.space;
        document.getElementById("transfer1").innerHTML = plan_1.transfer;
        document.getElementById("pages1").innerHTML = plan_1.pages;
        document.getElementById("discountMonths1").innerHTML = "Discount Months: " + plan_1.discountMonths;
        document.getElementById("plan1_choose").style.display = "inline";
        document.getElementById("plan1_choose").innerHTML = "Choose Basic Plan";
        document.getElementById("plan1").style.backgroundColor = "rgba(0, 255, 255, 0.562)";
    }
    else if (document.getElementById("name1").innerHTML == plan_1.name) {
        document.getElementById("name1").innerHTML = "";
        document.getElementById("basePrice1").innerHTML = "";
        document.getElementById("space1").innerHTML = "";
        document.getElementById("transfer1").innerHTML = "";
        document.getElementById("pages1").innerHTML = "";
        document.getElementById("discountMonths1").innerHTML = "";
        document.getElementById("plan1_choose").style.display = "none";
        document.getElementById("plan1_choose").innerHTML = "";
        document.getElementById("plan1").style.backgroundColor = "";
    }
};
function plan2() {
    if (document.getElementById("name2").innerHTML == "") {
        document.getElementById("name2").innerHTML = plan_2.name;
        document.getElementById("basePrice2").innerHTML = "Price: $" + plan_2.price;
        document.getElementById("space2").innerHTML = plan_2.space;
        document.getElementById("transfer2").innerHTML = plan_2.transfer;
        document.getElementById("pages2").innerHTML = plan_2.pages;
        document.getElementById("discountMonths2").innerHTML = "Discount Months: " + plan_2.discountMonths;
        document.getElementById("plan2_choose").style.display = "inline";
        document.getElementById("plan2_choose").innerHTML = "Choose Professional Plan";
        document.getElementById("plan2").style.backgroundColor = "rgba(43, 255, 0, 0.562)";
    }
    else if (document.getElementById("name2").innerHTML == plan_2.name) {
        document.getElementById("name2").innerHTML = "";
        document.getElementById("basePrice2").innerHTML = "";
        document.getElementById("space2").innerHTML = "";
        document.getElementById("transfer2").innerHTML = "";
        document.getElementById("pages2").innerHTML = "";
        document.getElementById("discountMonths2").innerHTML = "";
        document.getElementById("plan2_choose").style.display = "none";
        document.getElementById("plan2_choose").innerHTML = "";
        document.getElementById("plan2").style.backgroundColor = "";
    }
};
function plan3() {
    if (document.getElementById("name3").innerHTML == "") {
        document.getElementById("name3").innerHTML = plan_3.name;
        document.getElementById("basePrice3").innerHTML = "Price: $" + plan_3.price;
        document.getElementById("space3").innerHTML = plan_3.space;
        document.getElementById("transfer3").innerHTML = plan_3.transfer;
        document.getElementById("pages3").innerHTML = plan_3.pages;
        document.getElementById("discountMonths3").innerHTML = "Discount Months: " + plan_3.discountMonths;
        document.getElementById("plan3_choose").style.display = "inline";
        document.getElementById("plan3_choose").innerHTML = "Choose Ultimate Plan";
        document.getElementById("plan3").style.backgroundColor = "rgba(255, 106, 106, 0.562)";
    }
    else if (document.getElementById("name3").innerHTML == plan_3.name) {
        document.getElementById("name3").innerHTML = "";
        document.getElementById("basePrice3").innerHTML = "";
        document.getElementById("space3").innerHTML = "";
        document.getElementById("transfer3").innerHTML = "";
        document.getElementById("pages3").innerHTML = "";
        document.getElementById("discountMonths3").innerHTML = "";
        document.getElementById("plan3_choose").style.display = "none";
        document.getElementById("plan3_choose").innerHTML = "";
        document.getElementById("plan3").style.backgroundColor = "";
    }
};
function choose_plan1() {
    document.getElementById("popup-form").style.display = "block";
    document.getElementById("plan-name").innerHTML = "Basic Plan";
}
function choose_plan2() {
    document.getElementById("popup-form").style.display = "block";
    document.getElementById("plan-name").innerHTML = "Professional Plan";
}
function choose_plan3() {
    document.getElementById("popup-form").style.display = "block";
    document.getElementById("plan-name").innerHTML = "Ultimate Plan";
}

function closeform() {
    document.getElementById("popup-form").style.display = 'none';
    document.getElementById("annual-price").style.display = "none";
}

function submit_form() {
    if (document.getElementById("plan-name").innerHTML == "Basic Plan") {
        document.getElementById("beforePrice").innerHTML = "Original Price: $" + annualPrice1_b + "/year";
        document.getElementById("afterPrice").innerHTML = "Price after Discount: $" + annualPrice1 + "/year";
        document.getElementById("annual-price").style.display = "block";
    }
    else if (document.getElementById("plan-name").innerHTML == "Professional Plan") {
        document.getElementById("beforePrice").innerHTML = "Original Price: $" + annualPrice2_b + "/year";
        document.getElementById("afterPrice").innerHTML = "Price after Discount: $" + annualPrice2 + "/year";
        document.getElementById("annual-price").style.display = "block";
    }
    else if (document.getElementById("plan-name").innerHTML == "Ultimate Plan") {
        document.getElementById("beforePrice").innerHTML = "Original Price: $" + annualPrice3_b + "/year";
        document.getElementById("afterPrice").innerHTML = "Price after Discount: $" + annualPrice3 + "/year";
        document.getElementById("annual-price").style.display = "block";
    }
    else {
        console.log("Error")
    }
}