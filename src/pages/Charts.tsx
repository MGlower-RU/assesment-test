import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Card, CardContent, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import HighchartsReact from "highcharts-react-official";
import Highcharts from 'highcharts';
import { useContext } from 'react'
import { MainContext } from '../components/Context';
import { ChartsType, ChartType } from '../chartsData';

const GridItems = ({ data }: { data: ChartsType }) => {
  return (
    <>
      {data.length > 0 && data.map((el: ChartType) => (
        <Grid key={el.id} xs={12} lg={6} sx={{
          textAlign: 'center',
          flexGrow: 1
        }}>
          <Card>
            <CardContent>
              <HighchartsReact highcharts={Highcharts} options={el.options} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  )
}

export default function Charts() {
  const theme = useTheme()

  const { dateRange, setDateRange, filteredData } = useContext(MainContext)

  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <>
      { filteredData.length === 0 ? <Typography variant='h4' component='h2' align="center">Sorry there are no any charts!</Typography> : null }
      <Box sx={{
        display: filteredData.length > 0 ? 'flex' : 'none',
        gap: 2,
        justifyContent: 'flex-end',
        width: '100%',
        mb: 4
      }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            renderInput={props => <TextField {...props} />}
            label="Start date"
            minDate={dayjs('1970-01-01')}
            maxDate={dateRange.endDate}
            orientation={isMobile ? 'portrait' : 'landscape'}
            value={dateRange.startDate}
            onChange={val => setDateRange({...dateRange, startDate: val})}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            renderInput={props => <TextField {...props} />}
            label="End date"
            minDate={dateRange.startDate}
            orientation={isMobile ? 'portrait' : 'landscape'}
            value={dateRange.endDate}
            onChange={val => setDateRange({...dateRange, endDate: val})}
          />
        </LocalizationProvider>
      </Box>
      <Grid container
        rowSpacing={{ xs: 2, sm: 3 }}
        columnSpacing={{ xs: 0, sm: 3 }}
        direction={isMobile ? 'column' : 'row'}
      >
        <GridItems data={filteredData} />
      </Grid>
    </>
  )
}