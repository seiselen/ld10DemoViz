// CODE FOR LD-10 DEMO VIZ (SEISELEN 2018)

var div = d3.select("body").append("div") .attr("class", "tooltip")       .style("opacity", 0);
var svg = d3.select("#map").append("svg").attr("width", 750).attr("height", 700);
svg.append("rect").attr("width", "100%").attr("height", "100%").attr("fill", "black");
var group = svg.append("g").attr("transform", "scale(.25)translate(100,75)")
var txt = d3.select("body").append("div").attr("width", 480).attr("height", 600);

pctName = svg.append("text").attr("x", 10).attr("y", 590).attr("text-anchor", "left").style("font-size", "20px").style("fill","white").style("font-weight","bold").text("");
rVoters = svg.append("text").attr("x", 10).attr("y", 620).attr("text-anchor", "left").style("font-size", "14px").style("fill","white").style("font-weight","bold").text("");
dVoters = svg.append("text").attr("x", 10).attr("y", 640).attr("text-anchor", "left").style("font-size", "14px").style("fill","white").style("font-weight","bold").text("");
rdRatio = svg.append("text").attr("x", 10).attr("y", 660).attr("text-anchor", "left").style("font-size", "14px").style("fill","white").style("font-weight","bold").text("");
oVoters = svg.append("text").attr("x", 10).attr("y", 680).attr("text-anchor", "left").style("font-size", "14px").style("fill","white").style("font-weight","bold").text("");
svg.append("text").attr("x", 400).attr("y", 690).style("font-size", "10px").style("fill","white").text("Developed by Steven Eiselen 2018. Note: For Demonstration Purposes Only!");

colScaleRep = d3.scaleLinear().domain([-1,1]).range(["blue","red"]);

function GetColor(pct){
  if(numbers[pct]){return colScaleRep((numbers[pct][0]-numbers[pct][1])/(numbers[pct][0]+numbers[pct][1]));} 
  return "gray";
} // Ends Function GetColor

function ChangeText(v){
  pctName.text("Precinct: "+v);
  if(numbers[v]){  
    rVoters.text("Registered REP = " + numbers[v][0]);
    dVoters.text("Registered DEM = " + numbers[v][1]);
    oVoters.text("Registered OTH = " + numbers[v][2] + " (i.e. IND, PND, etc.)");
    rdRatio.text("REP/DEM Ratio = "  + Math.round((numbers[v][0]/numbers[v][1])*100)/100);
  }
  else{
    rVoters.text("Dataset has no information for this Precinct!");
    dVoters.text("");
    oVoters.text("");
    rdRatio.text("");
  }

} // Ends Function ChangeText

function ClearText(){
  pctName.text("Precinct:");      
  rVoters.text("Registered REP");
  dVoters.text("Registered DEM");
  oVoters.text("Registered OTH");
  rdRatio.text("REP/DEM Ratio");  
} // Ends Function ClearText

function CreateColormap(){
  var axisL = d3.axisRight(d3.scaleLinear().domain([-1,1]).range([-100,100]));
  var numTicks = 20;
  var cMapSize = 200/20;
  var iterPerColL = 2/numTicks;
  var legendIntervalL = [];
  for(var i=0; i<=numTicks; i++){legendIntervalL.push( -1+(i*iterPerColL) );}
  legendIntervalL.reverse();

  svg.selectAll("rect").data(legendIntervalL).enter().append("rect")
  .attr("x", 15).attr("y", function(d,i){return (i*cMapSize)+10;})
  .attr("width",cMapSize*3).attr("height",cMapSize)
  .attr("fill", function(d){return colScaleRep(d);});

  svg.append("g").attr("class", "axis").attr("transform","translate("+45+","+(120)+")").call(axisL);
  
  svg.append("text").attr("x", 90).attr("y", 30).attr("text-anchor", "left").style("fill","white").style("font-size", "12px").style("font-weight","bold").text("REP Edge");
  svg.append("text").attr("x", 90).attr("y", 220).attr("text-anchor", "left").style("fill","white").style("font-size", "12px").style("font-weight","bold").text("DEM Edge");
} // Ends function createColormap

ClearText();
CreateColormap();
group.selectAll("path").data(precincts).enter().append("path")
    .attr("d", function(v){return v.path;})
    .style('fill', function(v){ return GetColor(v.id);} )
    .attr('stroke-width', 2)
    .style('stroke', 'white')
    .on("mouseover", function(v) {    
      div.transition().duration(200).style("opacity", .9);    
      div.html("Precinct "+v.id).style("left", (d3.mouse(document.body)[0]) + "px").style("top", (d3.mouse(document.body)[1]) + "px");  
      return ChangeText(v.id);
    })
    .on("mouseout", function(v) {
      div.transition().duration(500).style("opacity", 0);
      return ClearText();}
    )
   ;
