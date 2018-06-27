// client-side code
$(function () {
    var socket = io();

    // function to check launch altitude and zero the time displayed on graph
    var zeroAltTime = null;
    var prevAltTime = null;
    var prevAlt = null;
    /*
    function checkAltitude(alt, time) {

        // set the change in altitude we look for in meters
        let deltaAlt = 3.0;

        // if a launch is detected
        if ( ((alt - prevAlt) >= deltaAlt) && (zeroAltTime === null) && (prevAlt !== null)) {
            zeroAltTime = time;
            prevAltTime = time;
            let newAltTime = time - zeroAltTime;
            return newAltTime;
        } else if (((time - zeroAltTime) > prevAltTime) && (zeroAltTime !== null) && (prevAltTime !== null)) {
            prevAltTime = time;
            let newAltTime = (time - zeroAltTime);
            return newAltTime;
        } else {
            // Occurs if launch has not been detected
            prevAlt = alt;
            prevAltTime = time;
            console.log("Launch not detected");
            return 0;
        }



    }
    */

    // Create empty altitude chart
    var chart_altitude = Highcharts.chart({
        chart: {
            renderTo: 'graph-alt',
            type: 'line',
            zoomType: 'xy'
        },
        title: {
            text: 'Rocket Altitude'
        },
        xAxis: {
            title: {
                text: "Time (sec)"
            },
            scrollbar: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Altitude (ft)'
            },
            max: 40000,
            min: -10,
            gridLineWidth: 1
        },
        series: [{
            name: "Altitude",
            color: '#005bee',
            data: []
        }]
    });

    // Create empty temperature chart
    var chart_temperature = Highcharts.chart({
        chart: {
            renderTo: 'graph-temp',
            type: 'line',
            zoomType: 'xy'
        },
        title: {
            text: 'Rocket Temperature'
        },
        xAxis: {
            title: {
                text: "Time (sec)"
            },
            scrollbar: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Temperature (Celsius)'
            },
            min: 0,
            max: 80,
            gridLineWidth: 1
        },
        series: [{
            name: "Temperature",
            color: '#ee0008',
            data: []
        }]
    });

    // Create empty position chart
    var chart_position = Highcharts.chart({
        chart: {
            renderTo: 'graph-position',
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Rocket Position'
        },
        xAxis: {
            title: {
                text: "Longitude (deg)"
            },
            scrollbar: {
                enabled: false
            },
            min: -180,
            max: 180
        },
        yAxis: {
            title: {
                text: 'Latitude (deg)'
            },
            min: -90,
            max: 90,
            gridLineWidth: 1
        },
        series: [{
            name: "Position",
            color: '#22ee00',
            data: []
        }]
    });

    // Create empty velocity chart
    var chart_vel = Highcharts.chart({
        chart: {
            renderTo: 'graph-vel',
            type: 'line',
            zoomType: 'xy'
        },
        title: {
            text: 'Rocket Velocity'
        },
        xAxis: {
            title: {
                text: "Time (sec)"
            },
            scrollbar: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Velocity (m/s)'
            },
            gridLineWidth: 1
        },
        series: [{
            name: "Velocity",
            color: '#ac00ee',
            data: []
        }]
    });

    // Create empty acceleration chart
    var chart_acc = Highcharts.chart({
        chart: {
            renderTo: 'graph-acc',
            type: 'line',
            zoomType: 'xy'
        },
        title: {
            text: 'Rocket Acceleration'
        },
        xAxis: {
            title: {
                text: "Time (sec)"
            },
            scrollbar: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Acceleration (m/s/s)'
            },
            gridLineWidth: 1
        },
        series: [{
            name: "Acceleration",
            color: '#ee9500',
            data: []
        }]
    });

    socket.on('send data', function (data) {
        try{
            console.log('request received: \n');
            console.log(data);

            // Convert JSON to javascript
            var dataObject = JSON.parse(data);

            $('.data-element').remove();
            $('#data-field-1').append($('<span class="data-element">').text(dataObject.lat + " " + "(deg)"));
            $('#data-field-2').append($('<span class="data-element">').text(dataObject.long + " " + "(deg)"));
            $('#data-field-3').append($('<span class="data-element">').text(dataObject.alt + " " + "(ft)"));
            $('#data-field-4').append($('<span class="data-element">').text(dataObject.time + " " + "(sec)"));
            $('#data-field-5').append($('<span class="data-element">').text(dataObject.temp + " " + "(deg. Celsius)"));
            $('#data-field-6').append($('<span class="data-element">').text(dataObject.vel + " " + "(m/s)"));
            $('#data-field-7').append($('<span class="data-element">').text(dataObject.acc + " " + "(m/s/s)"));
            $('#data-field-8').append($('<span class="data-element">').text(dataObject.sat));

            // Add data point to charts
            var alt_point = [dataObject.time, dataObject.alt];
            var temp_point = [dataObject.time, dataObject.temp];
            var position_point = [dataObject.long, dataObject.lat];
            var vel_point = [dataObject.time, dataObject.vel];
            var acc_point = [dataObject.time, dataObject.acc];

            chart_altitude.series[0].addPoint(alt_point, true, false);
            chart_temperature.series[0].addPoint(temp_point, true, false);
            chart_position.series[0].addPoint(position_point, true, false);
            chart_vel.series[0].addPoint(vel_point, true, false);
            chart_acc.series[0].addPoint(acc_point, true, false);

        } catch(err){
            console.log('request error: \n');
            console.log(err);
        }

    });
});