import React, { createContext, useEffect, useState } from 'react'
import { ChartsType, data } from '../chartsData'
import Highcharts from 'highcharts'
import HighchartsHeatMap from "highcharts/modules/heatmap";
import dayjs, { Dayjs } from 'dayjs';

HighchartsHeatMap(Highcharts)

interface InputProviderProps { children: React.ReactNode }
interface DateRange { startDate: Dayjs | null, endDate: Dayjs | null }

export type SetChartsData = React.Dispatch<React.SetStateAction<ChartsType>>
export type SetDateRange = React.Dispatch<React.SetStateAction<DateRange>>

export const MainContext = createContext<{
  chartsData: ChartsType;
  setChartsData: SetChartsData;
  filteredData: ChartsType;
  setFilteredData: SetChartsData;
  dateRange: DateRange;
  setDateRange: SetDateRange;
  availableChartTypes: string[];
}>({
  chartsData: [], setChartsData: () => {},
  dateRange: { startDate: null, endDate: null }, setDateRange: () => null,
  filteredData: [], setFilteredData: () => {}, availableChartTypes: ['']
})

export default function Context({ children }: InputProviderProps) {
  const [chartsData, setChartsData] = useState<ChartsType | []>(() => {
    const savedTodos = localStorage.getItem("charts");
    return savedTodos ? JSON.parse(savedTodos) : data;
  })
  const [filteredData, setFilteredData] = useState<ChartsType | []>([])
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: dayjs('2020-01-01'),
    endDate: dayjs('2025-01-01')
  })
  const [availableChartTypes] = useState(['line', 'spline', 'area', 'areaspline'])

  useEffect(() => {
    const setDateToMS = (date: string): number => {
      const time = new Highcharts.Time({})
      const dateArray: number[] = date.split('%').map(el => +el)
      return time.makeTime(dateArray[0] ?? 1970, dateArray[1]-1 ?? 0, dateArray[2] ?? 1, dateArray[3] ?? 0, dateArray[4] ?? 0, dateArray[5] ?? 0)
    }

    const dateInMS = chartsData.filter(el => el.options.series.length !== 0).map(el => (
      {...el, options: {
        ...el.options,
        series: el.options.series.map(el => ({
          ...el,
          data: el.data.filter(date => {
            const MSdate = (typeof date[0] === 'number') ? date[0] : setDateToMS(date[0])
            return (MSdate > dayjs(dateRange.startDate).valueOf() && MSdate < dayjs(dateRange.endDate).valueOf())
          }).map((date) => (typeof date[0] === 'number') ? date : [setDateToMS(date[0]), date[1]]).sort((a, b) => a[0] - b[0])
        }))}
      }
    ))

    setFilteredData(dateInMS)
  }, [dateRange, chartsData])

  useEffect(() => {
    localStorage.setItem('charts', JSON.stringify(chartsData))
  }, [chartsData])

  return (
    <MainContext.Provider value={{
      chartsData, setChartsData,
      dateRange, setDateRange,
      filteredData, setFilteredData,
      availableChartTypes
    }}>
      {children}
    </MainContext.Provider>
  )
}