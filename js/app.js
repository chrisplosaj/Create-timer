/*
 * Main javascript code
 * 
 */

function App() {
    var _this   = this;
    this.debug  = true;
    
    this.daysChart = null;
    this.hoursChart = null;
    this.minutesChart = null;
    this.secondsChart = null;
    
    
    //create donut chart
    this.createPlot = function(id) {
        var s1 = [['a', 60], ['b', 0]];
         
        var plot = $.jqplot(id, [s1], {
            seriesDefaults: {
                seriesColors: ['#5D2971', '#EC008C'], 
                markerOptions: {
                    size: 3
                },
                renderer: $.jqplot.DonutRenderer,
                rendererOptions: {
                    sliceMargin: 3,
                    startAngle: 270,
                    padding: 40,
                    diameter: 170,
                    highlightMouseOver: false,
                    highlightMouseDown: false,
                    highlightColor: null,
                    shadow: false
                }
            },
            grid: {
                shadow: false,
                background: 'transparent',
                borderWidth: 0
            }
        });
        
        
        return plot;
    }
    
    //init application
    this.init = function() {
        
        //create charts for days, hours, minutes and seconds
        this.daysChart = this.createPlot("daysChart");
        this.hoursChart = this.createPlot("hoursChart");
        this.minutesChart = this.createPlot("minutesChart");
        this.secondsChart = this.createPlot("secondsChart");
        
        //at start update counter
        this.checkDate();


        //every 1 sec update counter
        window.setInterval(function() {
            _this.checkDate();
        }, 1000);
    }
    
    //counter update function
    this.checkDate = function() {
        //get actually date
        var now = new Date();
        //get difference from launch date (declared in head in index.html)
        var diff = date.getTime() - now.getTime();

        //change multisecond result to seconds, minutes, hours and days
        var tmp = diff / 1000;
        var seconds = Math.floor(tmp % 60);
        tmp /= 60;
        var minutes = Math.floor(tmp % 60);
        tmp /= 60;
        var hours = Math.floor(tmp % 24);
        tmp /= 24;
        var days = Math.floor(tmp);

        //render in text
        $("#days .number").html(days);
        $("#hours .number").html(hours - 8);
        $("#minutes .number").html(minutes);
        $("#seconds .number").html(seconds);

        //prepare new data for charts
        var daysData    = [['a', 2 - days], ['b', days]];
        var hoursData   = [['a', 24  - hours], ['b', hours]];
        var minutesData = [['a', 60 - minutes], ['b', minutes]];
        var secondsData = [['a', 60 - seconds], ['b', seconds]];

        //draw charts with new data
        this.daysChart.series[0].data = daysData;
        this.daysChart.redraw();
        this.hoursChart.series[0].data = hoursData;
        this.hoursChart.redraw();
        this.minutesChart.series[0].data = minutesData;
        this.minutesChart.redraw();
        this.secondsChart.series[0].data = secondsData;
        this.secondsChart.redraw();
    }
    
    
    //log function
    this.log = function(data) {
        //if is debug and console is available then write to console
        if(this.debug && console) {
            console.log(data);
        }
    }
	
	this.isIOS = function() {
        return navigator.userAgent.match(/(iPhone|iPod|iPad)/i);
    }
	
	this.isAndroid = function() {
        return navigator.userAgent.toLowerCase().indexOf("android") > -1;
    }
}

$(document).ready(function(){
   //create application
   var app = new App();
   app.init();
});
