/**
 * Created by Yash on 2/13/2017.
 */

var w = 350,
    h = 100,
    padding = 20;

function getDate(d) {
    var strDate = new String(d);
    var year = strDate.substr(0,4),
        month = strDate.substr(4,2)-1,
        day = strDate.substr(6,2);

    return new Date(year, month, day);
}

function buildLine(ds){
    var svg = d3.select("body").append("svg").attrs({ width:w, height:h, "id":"svg-"+ds.category});
    var minDate = getDate(ds.monthlySales[0]['month']);
    var maxDate = getDate(ds.monthlySales[ds.monthlySales.length-1]['month']);

    var xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([padding+5,w-padding]);

    var yScale = d3.scaleLinear()
        .domain([
            0, d3.max(ds.monthlySales, function (d) {
                return d.sales;
            })
        ])
        .range([h-padding,10]);

    var xAxisGen = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%b"));
    var yAxisGen = d3.axisLeft().scale(yScale).ticks(4);

    var lineFn = d3.line()
        .x(function (d) {
            return xScale(getDate(d.month));
        }).y(function (d) {
            return yScale(d.sales);
        });

    var xAxis = svg.append("g").call(xAxisGen)
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + (h - padding) + ")");

    var yAxis = svg.append("g").call(yAxisGen)
        .attr("class", "y-axis")
        .attr("transform", "translate(" + padding + ", 0)");

    svg.append("path").attrs({
        d: lineFn(ds.monthlySales),
        "stroke": "purple",
        "stroke-width": 2,
        "fill": "none",
        "class": "path-"+ds.category
    });
}

function updateLine(ds){
    var svg = d3.select("body").select("#svg-"+ds.category);
    var minDate = getDate(ds.monthlySales[0]['month']);
    var maxDate = getDate(ds.monthlySales[ds.monthlySales.length-1]['month']);

    var xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([padding+5,w-padding]);

    var yScale = d3.scaleLinear()
        .domain([
            0, d3.max(ds.monthlySales, function (d) {
                return d.sales;
            })
        ])
        .range([h-padding,10]);

    var xAxisGen = d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%b")).ticks(ds.monthlySales.length-1);
    var yAxisGen = d3.axisLeft().scale(yScale).ticks(4);

    var lineFn = d3.line()
        .x(function (d) {
            return xScale(getDate(d.month));
        }).y(function (d) {
            return yScale(d.sales);
        });

    var xAxis = svg.selectAll("g.x-axis").call(xAxisGen);

    var yAxis = svg.selectAll("g.y-axis").call(yAxisGen);

    svg.selectAll(".path-"+ds.category).attrs({
        d: lineFn(ds.monthlySales)
    });
}

function showHeader(ds) {
    d3.select("body").append("h1")
        .text(ds.category + " Sales (2013)");
}

d3.json('https://api.github.com/repos/pately1/D3_examples/contents/MonthlySalesbyCategoryMultiple.json', function(error, data){
    if (error){
        console.log(error);
    } else {
        console.log(data);
    }

    var decodedData = JSON.parse(window.atob(data.content));
    decodedData.contents.forEach(function (d) {
        showHeader(d);
        buildLine(d);
    });

    d3.select("select")
        .on("change", function (d) {
           var sel = d3.select("#date-option").node().value;
           var decodedData = JSON.parse(window.atob(data.content));

            decodedData.contents.forEach(function (ds) {
                ds.monthlySales.splice(0,ds.monthlySales.length-sel);
               updateLine(ds);
            });
        });
});