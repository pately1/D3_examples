var w = 350,
    h = 400;

var monthlySales = [
  {"month":10, "sales":100},
  {"month":20, "sales":130},
  {"month":30, "sales":250},
  {"month":40, "sales":300},
  {"month":50, "sales":265},
  {"month":60, "sales":225},
  {"month":70, "sales":180},
  {"month":80, "sales":120},
  {"month":90, "sales":145},
  {"month":100, "sales":130},
];

function colorPick(v) {
  if (v >=250) { return "#33CC66";}
  else if (v < 250) { return "#666666";}
}

function showMinMax(ds, col, val, type){
  var max = d3.max(ds, function(d) { return d[col]; });
  var min = d3.min(ds, function(d) { return d[col]; });
  
  if (type=="minmax" && (val == max || val == min)){
    return val;
  }
  else if(type=="all") {
    return val;
  }
}

var svg = d3.select("body").append("svg").attrs({
  width: w,
  height: h
});

svg.selectAll("circle").data(monthlySales)
  .enter().append("circle")
  .attrs({
  cx: function(d) { return d.month*3;},
  cy: function(d) { return h - d.sales;},
  r: 5,
  "fill": function(d) {
    return colorPick(d.sales);
  }
});

svg.selectAll("text").data(monthlySales)
  .enter().append("text")
  .text(function(d) {
  return showMinMax(monthlySales, 'sales', d.sales, 'all');
})
  .attrs({
  x: function(d) { return d.month*3-28; },
  y: function(d) { return h - d.sales;},
  "text-anchor": "start",
  "font-size": "12px",
  "font-family": "sans-serif",
  "fill": "#666666"
});

d3.select("select")
  .on("change", function (d) {
     var sel = d3.select("#label-option").node().value;
     svg.selectAll("text")
         .data(monthlySales)
         .text(function (d) {
             return showMinMax(monthlySales, 'sales', d.sales, sel);
         })
  });