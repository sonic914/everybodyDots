import Highcharts from "highcharts";

Template.myChart.onCreated (function() {
    var self = this;
    self.colorList = ["black", "silver", "maroon", "red",
                      "navy", "blue", "purple", "fuchsia",
                      "green", "lime", "olive", "yellow",
                      "teal", "aqua", "gray", "white"];
    self.updatePie = function() {
        // 데이터 만들기
        var list = self.colorList;
        var rtn = [];

        for (var i=0, len=list.length; i<len; i++) {
            rtn.push ({
                name: list[i],
                y: ( Dot.find({color: list[i]}).count()),
                color: list[i]
            });
        }
        // 만든 데이터 차트에 주입하기
        var chart = $('div[name=pieChart]').highcharts();
        chart.series[0].setData(rtn);
        // 차트 다시 그리기
        chart.redraw();
    };
    
    self.updateLine = function() {
        var list = self.colorList;
        var rtn = [];

        for (var i=0, len=list.length; i<len; i++) {
            rtn.push(Dot.find({color: list[i]}).count());
        }

        var chart = $('div[name=lineChart]').highcharts();
        chart.series[0].setData(rtn);
        chart.series[1].setData(rtn);
        chart.redraw();
    };
});

Template.myChart.onRendered (function () {
    var self = this;
    $('div[name=pieChart]').highcharts({
        // 차트 생성 옵션    
        title: { text: '모두의 도트 색상 파이차트'},
        series: [{
            type: 'pie',
            name: 'dot',
            data: (function () {
                var list = self.colorList;
                var rtn = [];
                for (var i=0, len=list.length; i<len; i++) {
                    rtn.push ({name: list[i], y:10, color: list[i]});
                }
                return rtn;
            })()
        }]
    }, function() {
        self.autorun(function () {
            if (subl.ready()) {
                self.updatePie();
            }
        });
        var chart = this;
        Dot.find().observe({
            changed: function (oldDoc, newDoc) {
                var list = self.colorList;
                chart.series[0].points[_.indexOf(list, oldDoc.color)].update(
                    Dot.find({color: oldDoc.color}).count()
                );
                chart.series[0].points[_.indexOf(list, newDoc.color)].update(
                    Dot.find({color: newDoc.color}).count()
                );
            }
        });
    });
    $('div[name=lineChart').highcharts({
        title: { text: '모두의 도트 색상 라인차트' },
        xAxis: { categories: self.colorList },
        series: [{
            type: 'line',
            name: '색상',
            data: []
        }, 
        {
            type: 'column',
            name: '색상',
            data: []
        }]
    }, function() {
        self.autorun(function () {
            if(subl.ready()) {
                self.updateLine();
            }
        });
        var chart = this;
        Dot.find().observe({
            changed: function (oldDoc, newDoc) {
                var list = self.colorList;
                for (var i=0, len=chart.series.length; i<len; i++) {
                    chart.series[i].points[_.indexOf(list, oldDoc.color)].update(
                        Dot.find({color: oldDoc.color}).count()
                    );
                    chart.series[i].points[_.indexOf(list, newDoc.color)].update(
                        Dot.find({color: newDoc.color}).count()
                    );
                }
            }
        });
    });
});