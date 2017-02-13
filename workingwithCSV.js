/**
 * Created by Yash on 2/12/2017.
 */

var w = 400,
    h = 100,
    dataset,
    salesTotal = 0.0,
    salesAvg = 0.0,
    metrics = [];

function buildLine(){
    var svg = d3.select("body").append("svg").attrs({ width:w, height:h});

    var lineFn = d3.line()
        .x(function (d) {
            return ((d.month-20130001)/3.25);
        }).y(function (d) {
            return h - d.sales;
        });

    svg.append("path").attrs({
        d: lineFn(dataset),
        "stroke": "purple",
        "stroke-width": 2,
        "fill": "none"
    });
}

function showTotals() {
    salesTotal = d3.sum(dataset, function (d) {
        return d.sales;
    });

    salesAvg = salesTotal / dataset.length;

    metrics.push("Sales Total: "+ salesTotal);
    metrics.push("Sales Average: "+ salesAvg.toFixed(2));

    var t = d3.select("body").append("table");
    var tr = t.selectAll("tr").data(metrics)
        .enter().append("tr").append("td")
        .text(function (d) {
           return d;
        });

}

d3.csv('MonthlySales.csv', function(error, data){
    if (error){
        console.log(error);
    } else {
        console.log(data);
        dataset = data;
    }
    buildLine();
    showTotals();
});