requirejs.config({
    paths: {
        jquery: '../../lib/jquery',
        backbone: '../../lib/backbone',
        d3: "../../lib/d3",
        queue: "http://d3js.org/queue.v1.min",
        topojson: "../../lib/topojson",
        underscore: "../../lib/underscore",
        colorbrewer: "../../lib/colorbrewer",
        jqueryui: "../../lib/jquery-ui"
    },
    shims: {
        "d3": {
            exports: "d3"
        },
        "topojson": {
            exports: "topojson"
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        "colorbrewer" :{
            exports: "colorbrewer"
        },
        "jqueryui": {
            deps: ["jquery"]
        }
    }
});

require(["chart_base", "queue"], function(BaseChart, queue){
    d3.selection.prototype.moveToFront = function() {
      return this.each(function(){
        this.parentNode.appendChild(this);
      });
    };

    queue()
        .defer(d3.json, "lib/dk.json")
        .defer(d3.csv, "raw_logs/disposable_household_income.csv")
        .await(ready);

    function ready(error, dk_map, income_data) {

        var ch = new BaseChart({
            el: "#disposable-income",
            palette: "PuRd",
            tooltip: true,
            enhance: true,
        });
        ch.render();
        ch.render_map(dk_map);

        ch.render_cholopleth(income_data, "y-2000");
        ch.render_legend()
        ch.render_slider(income_data)       
    }
})