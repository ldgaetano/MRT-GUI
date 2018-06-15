// client-side code
$(function () {
    var socket = io();

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
                text: "Time (ms)"
            },
            scrollbar: {
                enabled: true
            }
        },
        yAxis: {
            title: {
                text: 'Altitude (m)'
            },
            min: -5,
            max: 50000
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
            type: 'line'
        },
        title: {
            text: 'Rocket Temperature'
        },
        xAxis: {
            title: {
                text: "Time (ms)"
            },
            scrollbar: {
                enabled: true
            }
        },
        yAxis: {
            title: {
                text: 'Temperature (Celsius)'
            },
            min: 0,
            max: 100
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
            type: 'scatter'
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
            min: 0,
            max: 360
        },
        yAxis: {
            title: {
                text: 'Latitude (deg)'
            },
            min: -90,
            max: 90
        },
        series: [{
            name: "Position",
            color: '#22ee00',
            data: []
        }]
    });

    socket.on('send data', function (data) {
        console.log('request received');

        // Convert JSON to javascript
        var dataObject = JSON.parse(data);

        $('.data-element').remove();
        $('#data-field-1').append($('<span class="data-element">').text(dataObject.lat));
        $('#data-field-2').append($('<span class="data-element">').text(dataObject.long));
        $('#data-field-3').append($('<span class="data-element">').text(dataObject.alt));
        $('#data-field-4').append($('<span class="data-element">').text(dataObject.time));
        $('#data-field-5').append($('<span class="data-element">').text(dataObject.temp));
        $('#data-field-6').append($('<span class="data-element">').text(dataObject.vel));
        $('#data-field-7').append($('<span class="data-element">').text(dataObject.acc));
        $('#data-field-8').append($('<span class="data-element">').text(dataObject.sat));

        // Add data point to charts
        var alt_point = [dataObject.time, dataObject.alt];
        var temp_point = [dataObject.time, dataObject.temp];
        var position_point = [dataObject.long, dataObject.lat];
        //var shift = chart_altitude.series[0].data.length > 300;
        chart_altitude.series[0].addPoint(alt_point, true, false);
        chart_temperature.series[0].addPoint(temp_point, true, false);
        chart_position.series[0].addPoint(position_point, true, false);
    });
});