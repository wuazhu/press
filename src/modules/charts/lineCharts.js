let option = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,0.8)',
    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
    textStyle: {
      color: '#f9f9f9'
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    show: false,
    data: ['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12']
  },
  yAxis: {
    type: 'value',
    show: false
  },
  series: [{
    smooth: true,
    data: [10, 13, 16, 20, 30, 30, 32, 16, 20, 30, 30, 32],
    type: 'line',
    areaStyle: {
      color: '#229541'
    }
  }],
  grid: {
    // 设置图表在容器中开始绘制的坐标
    left: 0,
    right: 0,
    bottom: 40
  }
}

export default option
