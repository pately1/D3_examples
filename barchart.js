var w = 300,
    h = 120,
    padding = 2,
    dataSet = [5,10,13,19,21,25,11,25,22,18,7];

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

function colorPicker(v) {
  if (v <= 20) { return "#666666";}
  else if (v > 20) { return "#FF0033"; }
}

svg.selectAll("rect")
  .data(dataSet)
  .enter().append("rect")
  .attrs({
  x: function(d, i){ return (i * (w / dataSet.length)); },
  y: function(d) { return h - (d*4); },
  width: w / dataSet.length - padding,
  height: function(d) { return d * 4; },
  fill: function(d) { return colorPicker(d);}});

svg.selectAll("text")
    .data(dataSet)
    .enter().append("text")
    .text(function(d) { return d;})
    .attrs({
  "text-anchor": "middle",
  x: function(d, i) { return i * (w / dataSet.length)+(w / dataSet.length - padding) / 2;},
  y: function(d) { return h - (d * 4)+14;},
  "font-family": "sans-serif",
  "fill": "white",
  "font-size": 12
});