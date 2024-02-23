import React, { useEffect, useState, useMemo, useRef } from 'react';
import * as echarts from 'echarts';
import type { CSSProperties } from 'react';
import { forceResizeCharts } from './UtilsForCharts';

interface IOnEvents {
  type: string;
  func: Function;
  componentType: string;
  dataIndex: number;
}

interface CurrencyChartProps {
  data: {
    date: string;
    month: string;
    indicator: string;
    value: number;
  }[];
  currency: string;
}

// Объект, связывающий иконки валют с их названиями
const currencyIcons: Record<string, string> = {
  'Курс доллара': '$',
  'Курс евро': '€',
  'Курс юаня': '¥'
};

// Компонент для отображения графика валюты
export function CurrencyChart({ data, currency }: CurrencyChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [averageValue, setAverageValue] = useState<number | null>(null);
  const theme = 'light';

  useEffect(() => {
    const chart = echarts.init(chartRef.current!, theme);

    const filteredData = data.filter((item) => item.indicator === currency);

    // Находим среднее значение для выбранной валюты
    const average = filteredData.reduce((acc, item) => acc + item.value, 0) / filteredData.length;

    setAverageValue(average);
    
    //Конфигурация оси Y и оси X графика
    const options = {
      xAxis: {
        type: 'category',
        data: filteredData.map((item) => item.month),
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            type: 'dashed',
            color: 'gray',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        scale: 'false',
        splitNumber: '3',
        type: 'value',
        axisLabel: {
          formatter: (value: string, index: number) => {
            // Скрыть первую метку
            if (index === 0) {
              return '';
            }
            return value;
          },
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
      },
      series: [
        {
          data: filteredData.map((item) => item.value),
          type: 'line',
          lineStyle: {
            color: 'orange',
          },
          symbol: 'none',
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          crossStyle: {
            color: '#999'
          }
        },
        formatter: (params: IOnEvents[]) => {
          const dataIndex = params[0].dataIndex;
          const selectedData = filteredData[dataIndex];
          return `
            <b>${selectedData.month} год</b><br/>
            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:orange"></span>
            ${selectedData.indicator} &nbsp;&nbsp;&nbsp;<b>${selectedData.value}₽</b>`;
        },
        textStyle: {
          fontFamily: 'Inter'
        },
      },
    };

    chart.setOption(options);

    return () => {
      chart.dispose();
    };
  }, [currency, data, theme]);

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', display: 'flex'}}>
      <div>
        <h1 style={{ color: 'black', font: '20px Inter', textTransform: 'uppercase', marginTop: '-25px', marginLeft: '-25px', fontWeight: 'bold'}}>{currency}, {currencyIcons[currency]}/₽</h1>
        <div ref={chartRef} style={{ width: '800px', height: '400px' }} />
      </div>
      {averageValue !== null && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <p style={{ font: '27px Inter', color: 'gray', marginTop: '150px' }}>Среднее за период</p>
          <p style={{ textAlign: 'right', font: '48px Inter', color: 'orange', marginTop: '25px', marginRight: '50px' }}>{averageValue.toFixed(1)}<b style={{ font: '27px Inter', color: 'gray' }}>  ₽</b></p>
        </div>
      )}
    </div>
  );
}

export default CurrencyChart;

export interface ReactEChartsProps {
  option: any; // We leave any, since not all typed echarts options are needed to work
  data: {
    date: string;
    month: string;
    indicator: string;
    value: number;
  }[];
  onEvents?: IOnEvents;
  style?: CSSProperties;
  settings?: echarts.SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
  forceResize?: boolean;
}

export function ReactECharts({
  option,
  onEvents,
  style,
  settings,
  loading,
  theme,
  forceResize = true,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  const memoizedTheme = useMemo(() => theme, [theme])

  useEffect(() => {
    // Initialize chart
    let chart: echarts.ECharts | undefined;

    if (chartRef.current !== null) {
      chart = echarts.init(chartRef.current, memoizedTheme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }

    window.addEventListener('resize', resizeChart);

    let observer: MutationObserver | false | undefined = false;

    if (forceResize) observer = forceResizeCharts(resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [memoizedTheme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
      chart?.on(onEvents?.type!, function (params: any) {
        onEvents?.func(params);
        chart?.setOption(option, settings);
      });
    }
  }, [option, settings, onEvents, memoizedTheme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = echarts.getInstanceByDom(chartRef.current);

      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, memoizedTheme]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />
  );
}