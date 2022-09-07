export interface ChartType {
  id: string;
  // preferably use Highcharts.Options
  // Why didn't i use it? There is a bug with data options for charts that some of them have no that parameter but if you try check on it typescript will curse you for your checking
  options: {
    [name: string]: object | [];
    title: {
      text: string
    },
    series: {
      [name: string]: string | number | object | [];
      type: string;
      data: Array<any>[];
    }[]
  };
}
export type ChartsType = ChartType[]

export const data: ChartsType = [
  {
    id: '1',
    options: {
      title: {
        text: 'Area'
      },
      xAxis: {
        type: 'datetime',
      },
      colors: [
        '#8085e9',
        '#91e8e1',
        '#90ed7d',
        '#f7a35c',
        '#434348',
        '#f45b5b',
        '#8085e9',
        '#f15c80',
        '#e4d354',
        '#2b908f',
      ],
      series: [
        {
          type: 'area',
          name: 'area data',
          data: [
            ['2022%1%30%11%13%45', 13.942275910900165],
            ['2022%2%30%11%13%45', 7.318573666825043],
            ['2022%4%30%11%13%45', 4.2514362989011865],
            ['2022%6%30%11%13%45', 7.407737253343039],
            ['2022%7%16%11%13%45', 9.407737253343039],
            ['2022%8%27%11%13%45', 11.407737253343039],
            ['2022%9%02%11%13%45', 13.407737253343039],
            ['2022%10%21%11%13%45', 14.407737253343039],
            ['2022%10%31%11%13%45', 12.407737253343039],
          ]
        },
        {
          type: 'area',
          name: 'area data',
          data: [
            ['2022%1%30%11%13%45', 15.942275910900165],
            ['2022%2%30%11%13%45', 4.318573666825043],
            ['2022%4%30%11%13%45', 6.2514362989011865],
            ['2022%6%30%11%13%45', 9.407737253343039],
            ['2022%7%16%11%13%45', 1.407737253343039],
            ['2022%8%27%11%13%45', 13.407737253343039],
            ['2022%9%02%11%13%45', 19.407737253343039],
            ['2022%10%21%11%13%45', 4.407737253343039],
            ['2022%10%31%11%13%45', 12.407737253343039],
          ]
        },
      ]
    }
  },
  {
    id: '2',
    options: {
      title: {
        text: 'Spline'
      },
      xAxis: {
        type: 'datetime',
      },
      colors: [
        '#2b908f',
        '#91e8e1',
        '#90ed7d',
        '#f7a35c',
        '#434348',
        '#f45b5b',
        '#8085e9',
        '#f15c80',
        '#e4d354',
      ],
      series: [{
        type: 'spline',
        name: 'spline data',
        data: [
          ['2018%7%30%11%13%45', 13.942275910900165],
          ['2020%7%30%11%13%45', 2.318573666825043],
          ['2021%7%30%11%13%45', 2.2514362989011865],
          ['2022%7%30%11%13%45', 2.407737253343039],
        ]
      }]
    },
  },
  {
    id: '3',
    options: {
      title: {
        text: 'Line'
      },
      xAxis: {
        type: 'datetime',
      },
      colors: [
        '#434348',
        '#8085e9',
        '#f45b5b',
        '#2b908f',
        '#91e8e1',
        '#90ed7d',
        '#f7a35c',
        '#f15c80',
        '#e4d354',
      ],
      series: [{
        type: 'line',
        name: 'line data',
        data: [
          ['2015%5%20%12%13%45', 13.942275910900165],
          ['2021%1%12%10%13%45', 2.318573666825043],
          ['2021%2%24%09%13%45', 3.2514362989011865],
          ['2022%1%30%11%13%45', 1.807737253343039],
          ['2022%4%30%11%13%45', 2.707737253343039],
          ['2022%7%30%11%13%45', 2.207737253343039],
        ]
      }]
    },
  },
  {  
    id: '4',
    options: {
      title: {
        text: 'Snow depth at Vikjafjellet, Norway'
      },
      subtitle: {
        text: 'Irregular time data in Highcharts JS'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Snow depth (m)'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
            radius: 2.5
          }
        }
      },
      colors: [
        '#7cb5ec',
        '#90ed7d',
        '#f7a35c',
        '#434348',
        '#f45b5b',
        '#8085e9',
        '#f15c80',
        '#e4d354',
        '#2b908f',
        '#91e8e1'
      ],
      series: [
        {
          type: 'spline',
          name: "Winter 2019-2020",
          data: [
            ['2021%10%24', 0],
            ['2021%10%27', 0.12],
            ['2021%10%30', 0.09],
            ['2021%11%03', 0.13],
            ['2021%11%06', 0.12],
            ['2021%11%09', 0.13],
            ['2021%11%12', 0.13],
            ['2021%11%15', 0.16],
            ['2021%11%18', 0.19],
            ['2021%11%21', 0.25],
            ['2021%11%24', 0.26],
            ['2021%11%27', 0.24],
            ['2021%11%30', 0.25],
            ['2021%12%03', 0.26],
            ['2021%12%06', 0.36],
            ['2021%12%09', 0.43],
            ['2021%12%12', 0.32],
            ['2021%12%15', 0.48],
            ['2021%12%18', 0.5],
            ['2021%12%21', 0.44],
            ['2021%12%24', 0.43],
            ['2021%12%27', 0.45],
            ['2021%12%30', 0.4],
            ['2022%01%03', 0.39],
            ['2022%01%06', 0.56],
            ['2022%01%09', 0.57],
            ['2022%01%12', 0.68],
            ['2022%01%15', 0.93],
            ['2022%01%18', 1.11],
            ['2022%01%21', 1.01],
            ['2022%01%24', 0.99],
            ['2022%01%27', 1.17],
            ['2022%01%30', 1.24],
            ['2022%02%03', 1.41],
            ['2022%02%06', 1.47],
            ['2022%02%09', 1.4],
            ['2022%02%12', 1.92],
            ['2022%02%15', 2.03],
            ['2022%02%18', 2.46],
            ['2022%02%21', 2.53],
            ['2022%02%24', 2.73],
            ['2022%02%27', 2.67],
            ['2022%03%03', 2.65],
            ['2022%03%06', 2.62],
            ['2022%03%09', 2.79],
            ['2022%03%12', 2.93],
            ['2022%03%20', 3.09],
            ['2022%03%27', 2.76],
            ['2022%03%30', 2.73],
            ['2022%04%03', 2.9],
            ['2022%04%09', 2.77],
            ['2022%04%12', 2.78],
            ['2022%04%15', 2.76],
            ['2022%04%18', 2.76],
            ['2022%04%21', 2.7],
            ['2022%04%24', 2.61],
            ['2022%04%27', 2.52],
            ['2022%04%30', 2.53],
            ['2022%05%03', 2.55],
            ['2022%05%06', 2.52],
            ['2022%05%09', 2.44],
            ['2022%05%09', 2.43],
            ['2022%05%15', 2.43],
            ['2022%05%18', 2.48],
            ['2022%05%21', 2.41],
            ['2022%05%24', 2.16],
            ['2022%05%27', 2.01],
            ['2022%05%30', 1.88],
            ['2022%06%02', 1.62],
            ['2022%06%06', 1.43],
            ['2022%06%09', 1.3],
            ['2022%06%12', 1.11],
            ['2022%06%15', 0.84],
            ['2022%06%18', 0.54],
            ['2022%06%21', 0.19],
            ['2022%06%23', 0]
          ]
        }, {
          type: 'spline',
          name: "Winter 2020-2021",
          data: [
            ['2021%11%14', 0],
            ['2021%12%06', 0.35],
            ['2021%12%13', 0.35],
            ['2021%12%20', 0.33],
            ['2021%12%30', 0.53],
            ['2022%01%13', 0.62],
            ['2022%01%20', 0.6],
            ['2022%02%02', 0.69],
            ['2022%02%18', 0.67],
            ['2022%02%21', 0.65],
            ['2022%02%24', 0.66],
            ['2022%02%27', 0.66],
            ['2022%03%03', 0.61],
            ['2022%03%06', 0.6],
            ['2022%03%09', 0.69],
            ['2022%03%12', 0.66],
            ['2022%03%15', 0.75],
            ['2022%03%18', 0.76],
            ['2022%03%21', 0.75],
            ['2022%03%24', 0.69],
            ['2022%03%27', 0.82],
            ['2022%03%30', 0.86],
            ['2022%04%03', 0.81],
            ['2022%04%06', 1],
            ['2022%04%09', 1.15],
            ['2022%04%10', 1.35],
            ['2022%04%12', 1.26],
            ['2022%04%15', 1.18],
            ['2022%04%18', 1.14],
            ['2022%04%21', 1.04],
            ['2022%04%24', 1.06],
            ['2022%04%27', 1.05],
            ['2022%04%30', 1.03],
            ['2022%05%03', 1.01],
            ['2022%05%06', 0.98],
            ['2022%05%09', 0.94],
            ['2022%05%09', 0.8],
            ['2022%05%15', 0.61],
            ['2022%05%18', 0.43],
            ['2022%05%21', 0.29],
            ['2022%05%24', 0.1],
            ['2022%05%26', 0]
          ]
        }, {
          type: 'spline',
          name: "Winter 2021-2022",
          data: [
            ['2021%11%05', 0],
            ['2021%11%12', 0.1],
            ['2021%11%21', 0.15],
            ['2021%11%22', 0.19],
            ['2021%11%27', 0.17],
            ['2021%11%30', 0.27],
            ['2021%12%02', 0.25],
            ['2021%12%04', 0.27],
            ['2021%12%05', 0.26],
            ['2021%12%06', 0.25],
            ['2021%12%07', 0.26],
            ['2021%12%08', 0.26],
            ['2021%12%09', 0.25],
            ['2021%12%10', 0.25],
            ['2021%12%11', 0.25],
            ['2021%12%12', 0.26],
            ['2021%12%22', 0.22],
            ['2021%12%23', 0.22],
            ['2021%12%24', 0.22],
            ['2021%12%25', 0.24],
            ['2021%12%26', 0.24],
            ['2021%12%27', 0.24],
            ['2021%12%28', 0.24],
            ['2021%12%29', 0.24],
            ['2021%12%30', 0.22],
            ['2021%12%31', 0.18],
            ['2022%01%01', 0.17],
            ['2022%01%02', 0.23],
            ['2022%01%09', 0.5],
            ['2022%01%10', 0.5],
            ['2022%01%11', 0.53],
            ['2022%01%12', 0.48],
            ['2022%01%13', 0.4],
            ['2022%01%17', 0.36],
            ['2022%01%22', 0.69],
            ['2022%01%23', 0.62],
            ['2022%01%29', 0.72],
            ['2022%02%02', 0.95],
            ['2022%02%10', 1.73],
            ['2022%02%15', 1.76],
            ['2022%02%26', 2.18],
            ['2022%03%02', 2.22],
            ['2022%03%06', 2.13],
            ['2022%03%08', 2.11],
            ['2022%03%09', 2.12],
            ['2022%03%10', 2.11],
            ['2022%03%11', 2.09],
            ['2022%03%12', 2.08],
            ['2022%03%13', 2.08],
            ['2022%03%14', 2.07],
            ['2022%03%15', 2.08],
            ['2022%03%17', 2.12],
            ['2022%03%18', 2.19],
            ['2022%03%21', 2.11],
            ['2022%03%24', 2.1],
            ['2022%03%27', 1.89],
            ['2022%03%30', 1.92],
            ['2022%04%03', 1.9],
            ['2022%04%06', 1.95],
            ['2022%04%09', 1.94],
            ['2022%04%12', 2],
            ['2022%04%15', 1.9],
            ['2022%04%18', 1.84],
            ['2022%04%21', 1.75],
            ['2022%04%24', 1.69],
            ['2022%04%27', 1.64],
            ['2022%04%30', 1.64],
            ['2022%05%03', 1.58],
            ['2022%05%06', 1.52],
            ['2022%05%09', 1.43],
            ['2022%05%09', 1.42],
            ['2022%05%15', 1.37],
            ['2022%05%18', 1.26],
            ['2022%05%21', 1.11],
            ['2022%05%24', 0.92],
            ['2022%05%27', 0.75],
            ['2022%05%30', 0.55],
            ['2022%06%03', 0.35],
            ['2022%06%06', 0.21],
            ['2022%06%09', 0]
          ]
        }
      ]
    }
  }
]