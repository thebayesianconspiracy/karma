var projection = d3.geo.mercator().scale(1000).translate([-1150, 720]);
    
var popu = {'Andaman & Nicobar Island': [0,0,0,0,1],
'Andhra Pradesh': [170,264,248,128,143],
'Arunanchal Pradesh': [0,0,0,0,2],
'Assam': [13,8,13,6,12],
'Bihar': [93,142,121,143,133],
'Chhattisgarh':[7,35,20,29,32],
'Delhi': [11,24,30,22,19],
'Goa': [0,0,0,1,1],
'Gujarat': [7,16,21,17,24],
'Haryana': [20,32,47,38,30],
'Himachal Pradesh':[0,3,3,2,4],
'Jammu & Kashmir': [1,2,3,5,4],
'Jharkhand':[36,58,72,94,79],
'Karnataka': [11,11,7,11,17],
'Kerala':[14,14,16,12,12],
'Madhya Pradesh':[52,101,80,88,102],
'Maharashtra': [64,96,120,134,110],
'Manipur':[1,1,1,0,1],
'Meghalaya': [0,0,0,2,0],
'Nagaland':[0,0,0,0,1],
'Odisha':[27,40,46,41,43],
'Punjab':[10,18,8,12,17],
'Rajasthan':[87,121,117,129,137],
'Sikkim':[0,0,0,1,0],
'Tamil Nadu': [5,13,17,13,15],
'Telangana':[0,10,35,85,102],
'Tripura':[1,2,0,2,2],
'Uttar Pradesh':[78,117,101,136,116],
'Uttarakhand':[3,5,13,9,13],
'West Bengal': [50,112,103,119,162],
'Lakshadweep':[0,0,0,0,0],
'Mizoram':[0,0,0,0,0]}

var datumass = {
    'OB': [
        [8.5, 0.2],
        [8.7, 0.25],
        [9.2, 0.3],
        [8.2, 0.1],
        [8.1, 0.15],
        [8.5, 0.18],
        [8.9, 0.19],
        [8.3, 0.32]
    ],
    'GE': [
        [9, 0.2],
        [8.5, 0.4],
        [8.2, 0.14],
        [8.1, 0.34],
        [8.9, 0.1],
        [8, 0.4],
        [8.4, 0.2],
        [8.9, 0.18]
    ],
    'SC': [
        [7.5, 0.2],
        [7.8, 0.3],
        [7.96, 0.16],
        [7.45, 0.4],
        [8, 0.2],
        [8.3, 0.12],
        [8.43, 0.12],
        [8.5, 0.4]
    ],
    'ST': [
        [7.2, 0.2],
        [8.5, 0.4],
        [8.9, 0.1],
        [8.2, 0.2],
        [8.34, 0.2],
        [8.7, 0.4],
        [9.23, 0.2],
        [9.33, 0.2]
    ]
};
var colours_items = { 'Category': { 'OB': '#f1c40f', 'GE': '#e74c3c', 'SC': '#8e44ad', 'ST': '#27ae60' }, 'Sex': { 'M': '#3498db', 'F': '#e74c3c' } };
//var colours_items = { 'Category': { 'OB': '#f1c40f', 'GE': '#e74c3c', 'SC': '#8e44ad', 'ST': '#27ae60' }, 'Sex': { 'M': 'none', 'F': 'none' } };
var bubbles = ["Sex", "Category"];
var years = ["All","2012","2013","2014","2015","2016"];
var colours = ["#16a085", "#e74c3c", "#f1c40f", "#27ae60"];
var someele;




var mapWithLatLng = function(divid, width, height, mapdata, datasource, id, color, colid, scale, transx, transy) {

    var projection = d3.geo.mercator().scale(scale).translate([transx,transy]);
    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select(divid).append("svg").attr("width", width).attr("height", height).attr("class","onetruemap")
        .attr("preserveAspectRatio", "xMidYMid meet").style("background", "#f0f0f0");
    var cantons = topojson.feature(mapdata, mapdata.objects.india);


    //svg.call(tip);
    var group = svg.append("g").selectAll("g")
        .data(cantons.features)
        .enter()
        .append("g")
        .append("path")
        .attr("d", path)
        .attr("class", "area")
        .style("stroke", "#999999")
        .style("stroke-width", 0.5)
        .style("fill", "#f0f0f0");


    for (var key in datasource){
        //console.log(datasource[key].length);
        
        svg.append("g").attr("class","batch"+key).selectAll(".pin")
            .data(datasource[key])
            .enter().append("circle").attr("class", "pin pin"+key)
            .attr("r", 2)
            .attr("opacity", 0.5)
            .attr("fill", function(d) {
                return color[colid][d[id]];
            })
            .attr("transform", function(d) {
                return "translate(" + projection([
                    d[3],
                    d[2]
                ]) + ")";
            })
            .style("display","inline-block");
    };

    var layer1 = svg.append("g").attr("class","layer1");

    layer1.append("rect").attr("class","q1").attr("fill","black").attr("stroke","white").attr("stroke-width",2).attr("opacity",0.3).style("display","none");
    layer1.append("rect").attr("class","q2").attr("fill","black").attr("stroke","white").attr("stroke-width",2).attr("opacity",0.5).style("display","none");
    layer1.append("rect").attr("class","q3").attr("fill","black").attr("stroke","white").attr("stroke-width",2).attr("opacity",0.5).style("display","none");
    layer1.append("rect").attr("class","q4").attr("fill","black").attr("stroke","white").attr("stroke-width",2).attr("opacity",0.3).style("display","none");
    layer1.append("text").attr("class","q1text").attr("text-anchor","middle").attr("font-family","Lato").attr("font-size",25).attr("fill","yellow").style("display","none").text("Yo1");
    layer1.append("text").attr("class","q2text").attr("text-anchor","middle").attr("font-family","Lato").attr("font-size",25).attr("fill","yellow").style("display","none").text("Yo2");
    layer1.append("text").attr("class","q3text").attr("text-anchor","middle").attr("font-family","Lato").attr("font-size",25).attr("fill","yellow").style("display","none").text("Yo3");
    layer1.append("text").attr("class","q4text").attr("text-anchor","middle").attr("font-family","Lato").attr("font-size",25).attr("fill","yellow").style("display","none").text("Yo4");


    svg.selectAll(".legcir")
        .data(Object.keys(color[colid]))
        .enter().append("circle").attr("class", "legcir")
        .attr("cx", function(d, i) {
            return 350;
        })
        .attr("cy", function(d, i) {
            return 500 + 30 * i;
        })
        .attr("r", 7)
        .attr("fill", function(d, i) {
            return color[colid][d];
        })

    svg.selectAll(".legtxt")
        .data(Object.keys(color[colid]))
        .enter().append("text").attr("class", "legcir")
        .attr("x", function(d, i) {
            return 365;
        })
        .attr("y", function(d, i) {
            return 507 + 29 * i;
        })
        .text(function(d, i) {
            return d;
        })

    kgpLoc(svg);
    return svg;

};

var mapWithChoropleth = function(divid, width, height, dommin, dommax, colmin, colmax, mapdata, title, datasource,year) {
    var color = d3.scale.linear()
        .domain([dommin, dommax])
        .range([colmin, colmax]);


    var projection = d3.geo.mercator().scale(400).translate([-160, 370]);
    //var projection = d3.geo.mercator().scale(700).translate([-500, 500]);
    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select(divid).append("svg").attr("width", width).attr("height", height)
        .attr("preserveAspectRatio", "xMidYMid meet").style("background", "#f0f0f0");
    var cantons = topojson.feature(mapdata, mapdata.objects.india);
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var group = svg.selectAll("g")
        .data(cantons.features)
        .enter()
        .append("g")
        .append("path")
        .attr("d", path)
        .style("transform", "translate(-300px,0px)")
        .attr("class", "area")
        .style("stroke", "#777")
        .style("stroke-width", 1)
        .style("fill", function(d) {
            //console.log(d.properties.ST_NM);
            try{
                return color(datasource[d.properties.ST_NM][year]);
            }
            catch(err){
                //console.log(err);
            }
        }).text(function(d){return d.properties.ST_NM + " : " + datasource[d.properties.ST_NM][year];});


    var x = d3.scale.linear()
        .domain([dommin, dommax])
        .rangeRound([25, 225]);

    var scalex = []

    for (var i = 0; i < dommax / 50 + 1; i++) {
        scalex.push(i * 50)
    }

    var g = svg.append("g")
        .attr("class", "key")
        .attr("transform", "translate(-10,30)");

    g.selectAll("rect")
        .data(scalex)
        .enter().append("rect")
        .attr("height", 8)
        .attr("x", function(d, i) {
            return x(d);
        })
        .attr("width", function(d, i) {
            if (i < scalex.length - 1) {
                return x(scalex[i + 1]) - x(d);
            }
        })
        .attr("fill", function(d) {
            return color(d);
        });

    g.append("text")
        .attr("class", "caption")
        .attr("x", x.range()[0])
        .attr("y", -6)
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(title);


    var xAxis2 = d3.svg.axis()
        .scale(x)
        .orient("bottom").ticks(5);

    g.call(xAxis2);
    g.select('.domain').remove();

};
var mapWithChoropleth2 = function() {
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var group = d3.selectAll(".area")
        .on("mouseover", function() {
            //console.log($(this).attr("dval"));
            div.style("opacity", 1);
            div.html($(this).attr("dval"))
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.style("opacity", 0);
        });
};

var lineplotWithDeviation = function(divid, width, height, tickpadding, xmin, xmax, ymin, ymax, xaxistext, yaxistext, datasource, colours, colid) {

    var svg = d3.select(divid).append("svg").attr("width", width).attr("height", height).attr('style', 'background:#f0f0f0').append("g");
    var x = d3.scale.linear().range([70, width - 30]);
    var y = d3.scale.linear().range([height - 60, 20]);


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom").ticks(10).innerTickSize(90 - height)
        .outerTickSize(0)
        .tickPadding(tickpadding)

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10).innerTickSize(100 - width)
        .outerTickSize(0)
        .tickPadding(tickpadding);
    x.domain([xmin, xmax]);
    y.domain([ymin, ymax]);


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 330 + ")").call(xAxis);

    svg.append("g")
        .attr("class", "y axis").attr("transform", "translate(70," + -10 + ")").call(yAxis)

    svg.append("text")
        .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "rotate(-90) translate(" + (-180) + "," + 20 + ")").attr("class", "mired") // centre below axis
        .text(yaxistext);

    svg.append("text")
        .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + 425 + "," + 380 + ")").attr("class", "mired") // centre below axis
        .text(xaxistext);

    var area = d3.svg.area()
        .x(function(d, i) {
            return x(i + 1);
        })
        .y0(function(d) {
            return y(d[0] + d[1]);
        })
        .y1(function(d) {
            return y(d[0] - d[1]);
        })
        .interpolate("cardinal");


    var lineFunction = d3.svg.line()
        .x(function(d, i) {
            return x(i + 1);
        })
        .y(function(d) {
            return y(d[0]);
        })
        .interpolate("cardinal");


    for (var key in datasource) {


        svg.append("path")
            .attr("class", "area")
            .style("fill", colours[colid][key])
            .style("opacity", 0.2)
            .style("stroke", "none")
            .attr("d", area(datasource[key]));



        svg.append('path').attr("class", "lines")
            .style("stroke", colours[colid][key])
            .style("fill", "none")
            .style("stroke-width", 2)
            .attr('d', lineFunction(datasource[key]));



        svg.selectAll('.circles').data(datasource[key])
            .enter().append('circle').attr('cx', function(d, i) {
                return x(i + 1);
            })
            .attr('cy', function(d) {
                return y(d[0]);
            })
            .attr('r', 3)
            .attr('fill', colours[colid][key])
    }
};

var drawBubbles = function(svg, width, height, bubbles, bubbles2, colours, typeofplot) {
    var buttLen = 100;
    var topPad = 100;
    var bottomPad = 50;
    var pad = 10;
    var buttheight = 30;
    var bublis = svg.append("g").selectAll(".bubbles_" + typeofplot)
        .data(bubbles).enter().append("rect").attr("class", ".bubbles_" + typeofplot)
        .attr("x", function(d, i) {
            return width - buttLen + 10;
        })
        .attr("y", function(d, i) {
            return (topPad-10) + i * (buttheight + pad);
        })
        .attr("width", buttLen)
        .attr("height", buttheight)
        .attr("fill", "#eee")
        .attr("stroke", "#333")
        .attr("stroke-width", 2)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("cursor", "pointer");


    svg.append("g").selectAll(".text_" + typeofplot)
        .data(bubbles).enter().append("text").attr("class",".text_" + typeofplot)
        .attr("x", function(d, i) {
            return width - buttLen / 2 + 10;
        })
        .attr("y", function(d, i) {
            return (topPad-10) + (buttheight + pad) / 2 + i * (buttheight + pad);
        })
        .attr("text-anchor", "middle")
        .style("pointer-events", "none")
        .text(function(d) {
            return d;
        });


    var tri = svg.append("polygon").attr("class", "tri").attr("points", function() {
        var ret = [0, 0, -10, -7, -10, 7].join(",");
        return ret;
    }).style("transform", function() {
        var y = (topPad - 10)+ (buttheight) / 2;
        var x = width - buttLen +10 - pad - pad;
        return "translate(" + x + "px," + y + "px)";
    });

    bublis.on("click", function() {
        var anosvg = this;
        var datum = d3.select(this).data()[0];
        var i;
        if (datum === "Sex") {
            i = 0;
        } else {
            i = 1;
        }
        //console.log("." + typeofplot + d3.select(this).data()[0]);
        //console.log(d3.select(this).attr("y"),d3.select(this).attr("x"), d3.select(".tri"), anosvg);
        var y = parseInt(d3.select(this).attr("y")) + (buttheight / 2);
        var x = parseInt(d3.select(this).attr("x") - pad - pad);
        d3.select(".tri").transition().duration(200).attr("style", "transform:translate(" + x + "px," + y + "px)");
        d3.selectAll("." + typeofplot).transition().duration(1000).attr("fill", function(d) {
            return colours[datum][d[i]];
        });

        d3.selectAll(".legcir").remove();
        d3.selectAll(".legtxt").remove();

        svg.selectAll(".legcir")
            .data(Object.keys(colours[datum]))
            .enter().append("circle").attr("class", "legcir")
            .attr("cx", function(d, i) {
                return 350;
            })
            .attr("cy", function(d, i) {
                return 500 + 30 * i;
            })
            .attr("r", 7)
            .attr("fill", function(d, i) {
                return colours[datum][d];
            })

        svg.selectAll(".legtxt")
            .data(Object.keys(colours[datum]))
            .enter().append("text").attr("class", "legtxt")
            .attr("x", function(d, i) {
                return 365;
            })
            .attr("y", function(d, i) {
                return 507 + 29 * i;
            })
            .text(function(d, i) {
                return d;
            })

    });


    var bublis2 = svg.append("g").selectAll(".bubbles2_" + typeofplot)
        .data(bubbles2).enter().append("rect").attr("class", ".bubbles2_" + typeofplot)
        .attr("x", function(d, i) {
            return  (i%2)*(buttLen -3* pad) + 2*topPad + 10*pad;
        })
        .attr("y", function(d, i) {
            return (buttheight  + 2*pad + 5)*(parseInt(i/2)+1);
        })
        .attr("width", buttLen-4*pad)
        .attr("height", buttheight)
        .attr("fill", "#eee")
        .attr("stroke", "#333")
        .attr("stroke-width", 2)
        .attr("rx", 5)
        .attr("ry", 5)
        .style("cursor", "pointer");


    svg.append("g").selectAll(".text2_" + typeofplot)
        .data(bubbles2).enter().append("text").attr("class",".text2_" + typeofplot)
        .attr("x", function(d, i) {
            return (i%2)*(buttLen -3* pad) + 2*topPad + 8*pad + buttLen / 2;
        })
        .attr("y", function(d, i) {
            return (buttheight  + 2*pad + 5)*(parseInt(i/2)+1)+buttheight/2+5;
        })
        .attr("text-anchor", "middle")
        .style("pointer-events", "none")
        .text(function(d) {
            return d;
        });

        
    var tri2 = svg.append("polygon").attr("class", "tri2").attr("points", function() {
        var ret = [0, 0, -7, 10, 7, 10].join(",");
        return ret;
    }).style("transform", function() {
        var y = topPad - (buttheight)/2 + 5;
        var x = 2*topPad + 8*pad + buttLen / 2;
        return "translate(" + x + "px," + y + "px)";
    });

    bublis2.on("click", function() {
        var anosvg = this;
        var datum = d3.select(this).data()[0];
        for ( var j= 2012;j<2017;j++){
            d3.selectAll(".pin"+j).style("display","none");
        }
        if(datum=="All"){
            for ( var j= 2012;j<2017;j++){
            d3.selectAll(".pin"+j).style("display","inline-block");
            }
        }
        else {
            d3.selectAll(".pin"+datum).style("display","inline-block");   
        }
        //console.log(d3.select(this).attr("y"),d3.select(this).attr("x"), d3.select(".tri2"), anosvg);
        var y = parseInt(d3.select(this).attr("y")) + (buttheight / 2) + pad + pad ;
        var x = parseInt(d3.select(this).attr("x")) + buttLen/2 - pad - pad;
        d3.select(".tri2").transition().duration(200).attr("style", "transform:translate(" + x + "px," + y + "px)");
        
        //d3.selectAll("." + typeofplot).transition().duration(1000).attr("fill", function(d) {

    });
    svg.append("line").attr("x1",460).attr("y1",75).attr("x2",460).attr("y2",175).attr("stroke-width",2)
    .attr("stroke","#333").style("stroke-dasharray",(3,3));

    var toggle = svg.append("g");
    toggle. append("rect").attr("class","toggle").attr("x",500).attr("y",600).attr("width",50).attr("height",26).attr("rx",13).attr("ry",13)
    .attr("fill","#aaaaaa").attr("val",0).style("cursor","pointer");
    //toggle. append("circle").attr("cx",563).attr("cy",613).attr("r",10).attr("fill","#2196f3");
    toggle.append("circle").attr("class","togglecircle").attr("cx",0).attr("cy",0).attr("r",10).attr("fill","#eeeeee").style('pointer-events',"none").style("transform","translate(513px,613px)");
    toggle.append("text").attr("x",525).attr("y",650).attr("text-anchor","middle").text("Toggle Quadrant View");
    d3.select(".toggle").on("click",function(){
        //console.log($(this).attr("val"));
        if($(this).attr("val")==="0"){
            //console.log("yoyo");
            d3.select("#map3").on("mousemove",function(){
                //console.log($(this).offset().left,$(this).offset().top);
                var xpos = d3.event.pageX;
                var ypos = d3.event.pageY;
                //console.log(xpos,ypos);

                var svgx = $(".onetruemap").offset().left;
                var svgy = $(".onetruemap").offset().top;
                //console.log(svgx,svgy);
                d3.select(".q1").attr("x",-10).attr("y",-10).attr("width",xpos-svgx+10).attr("height",ypos-svgy+10);
                d3.select(".q2").attr("x",xpos-svgx).attr("y",-10).attr("width",width).attr("height",ypos-svgy+10);
                d3.select(".q3").attr("x",-10).attr("y",ypos-svgy).attr("width",xpos-svgx+10).attr("height",height);
                d3.select(".q4").attr("x",xpos-svgx).attr("y",ypos-svgy).attr("width",width).attr("height",height);
                d3.select(".q1text").attr("x",(xpos-svgx+10)-100).attr("y",(ypos-svgy+10)-30);
                d3.select(".q2text").attr("x",(xpos-svgx+10)+80).attr("y",(ypos-svgy+10)-30);
                d3.select(".q3text").attr("x",(xpos-svgx+10)-100).attr("y",(ypos-svgy+10)+30);
                d3.select(".q4text").attr("x",(xpos-svgx+10)+80).attr("y",(ypos-svgy+10)+30);

                var xline = xpos-svgx;
                var yline = ypos - svgy;
                var pins = $(".pin").filter(function() { return $(this).css("display") == "inline-block" });
                //var pins = d3.selectAll(".pin");
                var qvalues = [0,0,0,0];
                for (var i =0;i<pins.length;i++){
                    var pinx = $(pins[i]).attr("transform").split(/\(|\)|,/)[1];
                    var piny = $(pins[i]).attr("transform").split(/\(|\)|,/)[2];
                    if (pinx>xline){
                        if(piny>yline){
                            qvalues[3]+=1;
                        }else {
                            qvalues[1]+=1;
                        }
                    }else {
                        if(piny>yline){
                            qvalues[2]+=1;
                        }else{
                            qvalues[0]+=1;
                        }
                    }
                }
                console.log(qvalues);
                var qsum = qvalues[0]+qvalues[1]+qvalues[2]+qvalues[3];
                d3.select(".q1text").text(((qvalues[0]*100)/qsum).toFixed(2)+" %");
                d3.select(".q2text").text(((qvalues[1]*100)/qsum).toFixed(2)+" %");
                d3.select(".q3text").text(((qvalues[2]*100)/qsum).toFixed(2)+" %");
                d3.select(".q4text").text(((qvalues[3]*100)/qsum).toFixed(2)+" %");




            });

            $(this).attr("val",1);
            $(this).attr("fill","#27ae60");
            d3.select(".q1").style("display","block");
            d3.select(".q2").style("display","block");
            d3.select(".q3").style("display","block");
            d3.select(".q4").style("display","block");
            d3.select(".q1text").style("display","block");
            d3.select(".q2text").style("display","block");
            d3.select(".q3text").style("display","block");
            d3.select(".q4text").style("display","block");
            d3.select(".togglecircle").style("transform","translate(537px,613px)");
        }
        else{
            d3.select("#map3").on("mousemove",function(){});
            
            $(this).attr("val",0);
            $(this).attr("fill","#aaaaaa");
            d3.select(".q1").style("display","none");
            d3.select(".q2").style("display","none");
            d3.select(".q3").style("display","none");
            d3.select(".q4").style("display","none");
            d3.select(".q1text").style("display","none");
            d3.select(".q2text").style("display","none");
            d3.select(".q3text").style("display","none");
            d3.select(".q4text").style("display","none");
            d3.select(".togglecircle").style("transform","translate(513px,613px)");
        }
    });

}

var kgpLoc = function(svg1) {

    var lineData = [{ "x": 383, "y": 324 }, { "x": 390, "y": 335 },
        { "x": 420, "y": 345 }, { "x": 425, "y": 344 }
    ];

    svg1.append('circle').attr("cx", 385).attr("cy", 316).attr("r", 6).attr("fill", "#eee").attr("stroke", "#333").attr("stroke-width", 2);
    svg1.append('circle').attr("cx", 385).attr("cy", 316).attr("r", 3).attr("fill", "#333");

    var lineFunction = d3.svg.line()
        .x(function(d) {
            return d.x; })
        .y(function(d) {
            return d.y; })
        .interpolate("basis");
    svg1.append("path").attr("d", lineFunction(lineData)).attr("stroke", "#333").attr("stroke-width", 2).attr("fill", "none");

    svg1.append("text").attr("x", 430).attr("y", 350).attr("font-family", "Lato").attr("fill", "#333").text("IIT KGP");

};

var one100peeps = function(id, width, height) {

    var dataset = {
        "Course" : [[0,0,50,0],['B.Tech',41,337,'#16a085'],['DD',38,603,'#c0392b'],['M.Sc',18,729,'#2980b9'],['B.Arch',3,750,'#2c3e50']],
        "Dep" : [[0,0,50,0],['ME',12,134,'#16a085'],['EE',8,190,'#c0392b'],['EC',8,246,'#2980b9'],['CS',8,302,'#2c3e50'],['CH',6,344,'#d35400'],
        ['CE',6,386,'#8e44ad'],['MI',5,421,'#7f8c8d'],['IM',5,456,'#f1c40f'],['GG',5,491,'#34495e'],['MA',5,526,'#1abc9c'],['AG',5,561,'#3498db']
        ,['MT',4,589,'#e74c3c'],['AE',4,617,'#e67e22'],['NA',4,645,'#95a5a6'],['BT',4,673,'#27ae60'],['HS',4,701,'#9b59b6'],['Others',7,750,'#2ecc71']],
        "Year" : [[0,0,50,0],['2012',13,141,'#16a085'],['2013',21,288,'#c0392b'],['2014',21,435,'#2980b9'],['2015',22,589,'#2c3e50'],['2016',23,750,'#d35400']],
        "Category" : [[0,0,50,0],['GE',50,400,'#16a085'],['OB',28,596,'#c0392b'],['SC',15,701,'#2980b9'],['ST',7,750,'#2c3e50']],
        "Hall" : [[0,0,50,0],['LBS',24,218,'#16a085'],['RPH',12,302,'#c0392b'],['AZD',11,379,'#2980b9'],['RKH',10,449,'#2c3e50'],['NHR',7,498,'#d35400']
        ,['PAT',7,547,'#8e44ad'],['MS',6,589,'#7f8c8d'],['SN/IG',5,624,'#f1c40f'],['Others',18,750,'#34495e']],
        "State" : [[0,0,50,0],['AP',16,162,'#16a085'],['BH',11,239,'#c0392b'],['RA',10,309,'#2980b9'],['UP',9,372,'#2c3e50'],['WB',9,435,'#d35400'],
        ['MH',9,498,'#8e44ad'],['MP',7,547,'#7f8c8d'],['JH',6,589,'#f1c40f'],['TE',4,617,'#34495e'],['Others',19,750,'#1abc9c']],
        "Age" : [[0,0,50,0],['<18',2,64,'#16a085'],['18',11,141,'#c0392b'],['19',21,288,'#2980b9'],['20',23,449,'#2c3e50'],['21',20,589,'#d35400'],
        ['22',15,694,'#8e44ad'],['>22',8,750,'#7f8c8d']],
        "Sex" : [[0,0,50,0],['Males',91,687,'#16a085'],['Females',9,750,'#c0392b']]
    };
    var svg = d3.select(id).append("svg").attr("width", width).attr("height", height).attr('style', 'background:#f0f0f0').append("g");
    var x = d3.scale.linear().domain([0, 24]).range([50, width - 50]);
    var y = d3.scale.linear().domain([0, 3]).range([125, height - 75]);

    //svg.append("text").attr("x",width/2).attr("y",30).attr("text-anchor","middle").attr("font-size",30).attr("font-weight",100).text("If KGP was 100 people");
    var button100 = svg.selectAll(".button100").data(["Sex","Dep","Hall","Category","Course","Year","Age","State"]).enter().append("rect").attr("class","button100")
    .attr("id",function (d) {
        return d;
        /* body... */
    }).attr("x",function(d,i){
        return 90*i + 50;

    }).attr("y",55).attr("width",70).attr("height",30).attr("fill","#f0f0f0").attr("stroke","#333").attr("stroke-width",2).attr("rx",3).attr("ry",3).style("cursor","pointer");

    svg.selectAll(".button100text").data(["Sex","Dep","Hall","Category","Course","Year","Age","State"]).enter().append("text").attr("class","button100text")
    .attr("x",function(d,i){
        return 90*i + 85;

    }).attr("y",75).attr("text-anchor","middle").text(function(d){
        return d;
    }).style("pointer-events","none");


    var line1 = svg.append("g").attr("class","line1");

    button100.on("click",function () {
        d3.selectAll(".button100").attr("stroke","#333");
        d3.select(this).attr("stroke","#c0392b");
        d3.selectAll(".yoline").remove();
        d3.selectAll(".yopeeptext1").remove();
        d3.selectAll(".yopeeptext2").remove();
        //console.log(d3.select(this).attr("id"));
        var idofthis = d3.select(this).attr("id");
        for (var yoyo=1;yoyo<dataset[idofthis].length;yoyo++){
            line1.append("line").attr("class","yoline").attr("x1",dataset[idofthis][yoyo-1][2]).attr("x2",dataset[idofthis][yoyo][2]).attr("y1",height-50).attr("y2",height-50)
            .attr("stroke",dataset[idofthis][yoyo][3]).attr("stroke-width",4);
            line1.append("text").attr("class","yopeeptext1").attr("x",(dataset[idofthis][yoyo-1][2]+dataset[idofthis][yoyo][2])/2).attr("y",height-25).attr("text-anchor","middle")
            .text(dataset[idofthis][yoyo][0]);
            line1.append("text").attr("class","yopeeptext2").attr("x",(dataset[idofthis][yoyo-1][2]+dataset[idofthis][yoyo][2])/2).attr("y",height-5).attr("text-anchor","middle")
            .text("("+dataset[idofthis][yoyo][1]+")");
        }

        var peeps = [];
        for (var hi = 1;hi<dataset[idofthis].length;hi++){
            peeps = peeps.concat(Array.apply(null, Array(dataset[idofthis][hi][1])).map(String.prototype.valueOf,dataset[idofthis][hi][3]));
        }
       //console.log(peeps); 

    //console.log(peeps);
        svg.selectAll(".peeps").remove();
        svg.selectAll(".peeps").data(peeps).enter()
        .append("circle").attr("class", "peeps").attr("cx", function(d, i) {
            return x(parseInt(i / 4));
        }).attr("cy", function(d, i) {
            return y(parseInt(i % 4));
        }).attr("r", 7).attr("fill",function (d) {
            return d;
        });
    });

    jQuery.fn.d3Click = function () {
        this.each(function (i, e) {
            var evt = new MouseEvent("click");
            e.dispatchEvent(evt);
        });
    };
    $("#Sex").d3Click();
    
}


window.onload = function() {

        $(".loading").css("display", "none");
        $("#actualbody").css("display", "inline-block");

        //lineplotWithDeviation("#numsvg", 800, 400, 10, 0, 9, 5, 10, "Semesters", "CGPA", datumass, colours_items, "Category");

        one100peeps("#peeps", 800, 280);
        //console.log(states);
        /*
        mapWithChoropleth("#_mapy1", 230, 350, 0, 300, "#f2f0f7", "#4900a7", states, "5th Year Students", popu, 0);
        mapWithChoropleth("#_mapy2", 230, 350, 0, 300, "#f2f0f7", "#4900a7", states, "4th Year Students", popu, 1);
        mapWithChoropleth("#_mapy3", 230, 350, 0, 300, "#f2f0f7", "#4900a7", states, "3rd Year Students", popu, 2);
        mapWithChoropleth("#_mapy4", 230, 350, 0, 300, "#f2f0f7", "#4900a7", states, "2nd Year Students", popu, 3);
        mapWithChoropleth("#_mapy5", 230, 350, 0, 300, "#f2f0f7", "#4900a7", states, "1st Year Students", popu, 4);
        */
        //mapWithChoropleth2();
        //console.log(places);

        var svg1 = mapWithLatLng("#map3", 650, 670, states, places, 0, colours_items, "Sex", 1000, -1150, 720);
        var projection = d3.geo.mercator().scale(1000).translate([-1150, 720]);
        someele = svg1;
        
        
        
        drawBubbles(svg1, 600, 700, bubbles, years, colours_items, "pin");

        /*
        var svg1 = mapWithLatLng("#map4", 600, 700, states, places, 1, colours_items, "Category", 1000, -1150, 720);
        var projection = d3.geo.mercator().scale(1000).translate([-1150, 720]);
        //console.log(projection([77.2513, 28.5485]));

        svg1.append('circle').attr("cx", 198).attr("cy", 200).attr("r", 60).attr("fill", "#2c3e50").attr("opacity", 0.15);
        svg1.append('circle').attr("cx", 198).attr("cy", 200).attr("r", 60).attr("stroke", "#555").attr("stroke-width", 2).attr("fill", "none");


        svg1.append('circle').attr("cx", 345).attr("cy", 285).attr("r", 75).attr("fill", "#2c3e50").attr("opacity", 0.15);
        svg1.append('circle').attr("cx", 345).attr("cy", 285).attr("r", 75).attr("stroke", "#555").attr("stroke-width", 2).attr("fill", "none");


        svg1.append('circle').attr("cx", 265).attr("cy", 415).attr("r", 65).attr("fill", "#2c3e50").attr("opacity", 0.15);
        svg1.append('circle').attr("cx", 265).attr("cy", 415).attr("r", 65).attr("stroke", "#555").attr("stroke-width", 2).attr("fill", "none");
        */

}