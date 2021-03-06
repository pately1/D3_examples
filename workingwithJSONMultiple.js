/**
 * Created by Yash on 2/12/2017.
 */

var w = 400,
    h = 100;

function buildLine(ds){
    var svg = d3.select("body").append("svg").attrs({ width:w, height:h});

    var lineFn = d3.line()
        .x(function (d) {
            return ((d.month-20130001)/3.25);
        }).y(function (d) {
            return h - d.sales;
        });

    svg.append("path").attrs({
        d: lineFn(ds.monthlySales),
        "stroke": "purple",
        "stroke-width": 2,
        "fill": "none"
    });
}

function showHeader(ds) {
    d3.select("body").append("h1")
        .text(ds.category + " Sales (2013)");
}

d3.json('MonthlySalesbyCategoryMultiple.json', function(error, data){
    if (error){
        console.log(error);
    } else {
        console.log(data);
    }

    data.contents.forEach(function (d) {
        showHeader(d);
        buildLine(d);
    });
});