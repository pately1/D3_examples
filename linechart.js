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

var lineFn = d3.line()
          .x(function(d) { return d.month*3;})
          .y(function(d) { return h - d.sales;});

var svg = d3.select("body").append("svg").attrs({width:w, height: h});

var viz = svg.append("path")
          .attrs({
            d: lineFn(monthlySales),
            "stroke": "purple",
            "stroke-width": 2,
            "fill": "none"
          });

svg.selectAll("text")
  .data(monthlySales)
  .enter()
  .append("text")
  .text(function(d) { return d.sales;})
  .attrs({
  x: function(d) { return d.month*3-25;},
  y: function(d) { return h - d.sales;},
  "text-anchor": "start",
  "fill": "#666666",
  "font-weight": function(d, i){
    if (i===0 || i===(monthlySales.length-1)){
      return "bold";
    }
      else {
        return "normal";
      }
  }
});