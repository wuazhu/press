let option = {
  color: ['#1C90D3'],
  xAxis: {
    show: false,
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Sunb', 'Sat1', 'Sun1', 'Sunb1'],
    axisLine: {
      lineStyle: {
        bgColor: '#1C90D3'
      }
    }
  },
  yAxis: {
    show: false,
    type: 'value'
  },
  series: [{
    data: [120, 200, 150, 100, 70, 110, 130, 80, 110, 130, 80],
    type: 'bar',
    barMaxWidth: '12'
  }],
  grid: {
    // 设置图表在容器中开始绘制的坐标
    left: 0,
    right: 0,
    bottom: 80
  }
}

export default option
