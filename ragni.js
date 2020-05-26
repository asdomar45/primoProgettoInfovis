function ragni(){
//data path
json_path = "/ragniJson"

//global variables
var configuration = 0;


var svg = d3.select("body").append("svg")
    .attr('width', 1500)
    .attr('height', 1500);

//Main
d3.json(json_path).then(function(data) {
    updateDrawing(data, configuration);

    var ragno;
    var index;

    d3.selectAll('g').on('mousedown', function(d) {
        index = parseInt(d.id.charAt(d.id.length - 1));

        ragno = d3.select('#' + d.id);
        ragno.remove();

        for (var i = 0; i <= data[configuration]['ragni'].length - 1; i++) {
            if (parseInt(data[configuration]['ragni'][i].id.charAt(data[configuration]['ragni'][i].id.length - 1)) > index) {
                data[configuration]['ragni'][i].id = 'ragno' + (i - 1);
                d3.selectAll('g').attr('id', function(d) {
                    return d.id;
                })
            }
        }
        updateDrawing(data, configuration, ragno);
    });

    svg.on('mousedown', function(d) {
        if (configuration == 4)
            configuration = -1;
        configuration = configuration + 1;

        var currentConfiguration = data[configuration]["ragni"];
        updateDrawing(data, configuration, ragno);
    });

});

//Support Functions
function point_on_ellipse(d, angle) {
    x = (d.width * Math.cos(angle)) + d.horizontalPosition;
    y = (d.length * Math.sin(angle)) + d.verticalPosition + d.length;
    return [x, y]
}

function get_side_length(diagonal) {
    return diagonal / Math.sqrt(2)
}


var indice = 0;

function updateDrawing(data, configuration, ragno) {

    indice++;
    var position = data["position"]
    var values = data["ragni"]
    var currentConfiguration = data[configuration]["ragni"];

    svg.selectAll("g").data(currentConfiguration).join(
        //Enter

        function(enter) {
            var elems = d3.selectAll('g');
            if (indice <= 1) {
                g = enter.append("g").attr('id', function(d) {

                        return d.id;
                    })
                    .attr('class', function(d) {
                        return d.alive;
                    });
                //body

                g.append("ellipse")
                    .attr('cx', function(d) {
                        return d.horizontalPosition
                    })
                    .attr('cy', function(d) {
                        return d.verticalPosition + d.length
                    })
                    .attr('rx', function(d) {
                        return d.width
                    })
                    .attr('ry', function(d) {
                        return d.length
                    })
                    .attr("stroke-width", 2)
                    .attr("stroke", "black")
                    .attr("class", "body")
                    .attr('fill', "black");
                //front right leg
                g.append("polyline")
                    .attr("points", function(d) {
                        [x, y] = point_on_ellipse(d, -Math.PI / 4);
                        s = get_side_length(d.legLength / 4)
                        return [x, y, x + s, y - s, x + s, y - d.legLength];
                    })
                    .attr("class", "front_right_leg")
                    .attr("fill", "None")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                //front left leg
                g.append("polyline")
                    .attr("points", function(d) {
                        [x, y] = point_on_ellipse(d, -Math.PI * 3 / 4);
                        s = get_side_length(d.legLength / 4);
                        return [x, y, x - s, y - s, x - s, y - d.legLength];
                    })
                    .attr("class", "front_left_leg")
                    .attr("fill", "None")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                //middle right leg 1
                g.append("polyline")
                    .attr("points", function(d) {
                        [x, y] = [d.horizontalPosition + d.width, d.verticalPosition + d.length];
                        s = get_side_length(d.legLength * 3 / 4);
                        return [x, y, x + d.legLength / 4, y, x + d.legLength / 4 + s, y + s];
                    })
                    .attr("class", "middle_right_leg_1")
                    .attr("fill", "None")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                //middle left leg 1
                g.append("polyline")
                    .attr("points", function(d) {
                        [x, y] = [d.horizontalPosition - d.width, d.verticalPosition + d.length];
                        s = get_side_length(d.legLength * 3 / 4);
                        return [x, y, x - d.legLength / 4, y, x - d.legLength / 4 - s, y + s];
                    })
                    .attr("class", "middle_left_leg_1")
                    .attr("fill", "None")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                //middle right leg 2
                g.append("polyline")
                    .attr("points", function(d) {
                        [x, y] = [d.horizontalPosition + d.width, d.verticalPosition + d.length];
                        s = get_side_length(d.legLength * 3 / 4);
                        return [x, y, x + d.legLength / 4, y - s, x + d.legLength / 4 + s, y - s];
                    })
                    .attr("class", "middle_right_leg_2")
                    .attr("fill", "None")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                //middle left leg 2
                g.append("polyline")
                    .attr("points", function(d) {
                        [x, y] = [d.horizontalPosition - d.width, d.verticalPosition + d.length];
                        s = get_side_length(d.legLength * 3 / 4);
                        return [x, y, x - d.legLength / 4, y - s, x - d.legLength / 4 - s, y - s];
                    })
                    .attr("class", "middle_left_leg_2")
                    .attr("fill", "None")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                //back right leg
                g.append("polyline")
                    .attr("points", function(d) {
                        [x, y] = point_on_ellipse(d, Math.PI / 4);
                        s = get_side_length(d.legLength / 4)
                        return [x, y, x + s, y + s, x + s, y + d.legLength];
                    })
                    .attr("class", "back_right_leg")
                    .attr("fill", "None")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
                //back left leg
                g.append("polyline")
                    .attr("points", function(d) {
                        [x, y] = point_on_ellipse(d, Math.PI * 3 / 4);
                        s = get_side_length(d.legLength / 4)
                        return [x, y, x - s, y + s, x - s, y + d.legLength];
                    })
                    .attr("class", "back_left_leg")
                    .attr("fill", "None")
                    .attr("stroke-width", 2)
                    .attr("stroke", "black");
            }
        },

        //Update

        function(update) {
            tx = d3.transition().duration(1000)

            update.select(".body")
                .transition(tx)
                .attr('cx', function(d) {
                    return d.horizontalPosition
                })
                .attr('cy', function(d) {
                    return d.verticalPosition + d.length
                })
                .attr('rx', function(d) {
                    return d.width
                })
                .attr('ry', function(d) {
                    return d.length
                })
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .attr('fill', "black");
            //front right leg
            update.select(".front_right_leg")
                .transition(tx)
                .attr("points", function(d) {
                    [x, y] = point_on_ellipse(d, -Math.PI / 4);
                    s = get_side_length(d.legLength / 4)
                    return [x, y, x + s, y - s, x + s, y - d.legLength];
                })
                .attr("fill", "None")
                .attr("stroke-width", 2)
                .attr("stroke", "black");
            //front left leg
            update.select(".front_left_leg")
                .transition(tx)
                .attr("points", function(d) {
                    [x, y] = point_on_ellipse(d, -Math.PI * 3 / 4);
                    s = get_side_length(d.legLength / 4);
                    return [x, y, x - s, y - s, x - s, y - d.legLength];
                })
                .attr("fill", "None")
                .attr("stroke-width", 2)
                .attr("stroke", "black");
            //middle right leg 1
            update.select(".middle_right_leg_1")
                .transition(tx)
                .attr("points", function(d) {
                    [x, y] = [d.horizontalPosition + d.width, d.verticalPosition + d.length];
                    s = get_side_length(d.legLength * 3 / 4);
                    return [x, y, x + d.legLength / 4, y, x + d.legLength / 4 + s, y + s];
                })
                .attr("fill", "None")
                .attr("stroke-width", 2)
                .attr("stroke", "black");
            //middle left leg 1
            update.select(".middle_left_leg_1")
                .transition(tx)
                .attr("points", function(d) {
                    [x, y] = [d.horizontalPosition - d.width, d.verticalPosition + d.length];
                    s = get_side_length(d.legLength * 3 / 4);
                    return [x, y, x - d.legLength / 4, y, x - d.legLength / 4 - s, y + s];
                })
                .attr("fill", "None")
                .attr("stroke-width", 2)
                .attr("stroke", "black");
            //middle right leg 2
            update.select(".middle_right_leg_2")
                .transition(tx)
                .attr("points", function(d) {
                    [x, y] = [d.horizontalPosition + d.width, d.verticalPosition + d.length];
                    s = get_side_length(d.legLength * 3 / 4);
                    return [x, y, x + d.legLength / 4, y - s, x + d.legLength / 4 + s, y - s];
                })
                .attr("fill", "None")
                .attr("stroke-width", 2)
                .attr("stroke", "black");
            //middle left leg 2
            update.select(".middle_left_leg_2")
                .transition(tx)
                .attr("points", function(d) {
                    [x, y] = [d.horizontalPosition - d.width, d.verticalPosition + d.length];
                    s = get_side_length(d.legLength * 3 / 4);
                    return [x, y, x - d.legLength / 4, y - s, x - d.legLength / 4 - s, y - s];
                })
                .attr("fill", "None")
                .attr("stroke-width", 2)
                .attr("stroke", "black");
            //back right leg
            update.select(".back_right_leg")
                .transition(tx)
                .attr("points", function(d) {
                    [x, y] = point_on_ellipse(d, Math.PI / 4);
                    s = get_side_length(d.legLength / 4)
                    return [x, y, x + s, y + s, x + s, y + d.legLength];
                })
                .attr("fill", "None")
                .attr("stroke-width", 2)
                .attr("stroke", "black");
            //back left leg
            update.select(".back_left_leg")
                .transition(tx)
                .attr("points", function(d) {
                    [x, y] = point_on_ellipse(d, Math.PI * 3 / 4);
                    s = get_side_length(d.legLength / 4)
                    return [x, y, x - s, y + s, x - s, y + d.legLength];
                })
                .attr("fill", "None")
                .attr("stroke-width", 2)
                .attr("stroke", "black");

        });
}

}