import { BarChart, Delete, MultilineChart, PieChart, ShowChart, Add as AddIcon, Close } from "@mui/icons-material";
import { Button, Fab, FormControl, IconButton, InputLabel, List, ListItem, MenuItem, Modal, Paper, Select, TextField, Theme, Tooltip, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useId, useState } from "react";
import { NavigateFunction, NavLink, NavLinkProps, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { ChartsType } from "../chartsData";
import { MainContext, SetChartsData } from "../components/Context";
import { merge } from 'lodash'

interface ChartsListProps {
  navigate: NavigateFunction;
  deleteChart: (id: string, data: ChartsType, setData: SetChartsData) => void;
  charts: ChartsType;
  theme: Theme;
}

const ChartIcon = ({ type }: { type: string }) => {
  if(type === 'bar') return <BarChart />
  if(type === 'line' || type === 'spline') return <ShowChart />
  if(type === 'pie') return <PieChart />
  return <MultilineChart />
}

const CloseModalButton = () => {
  const navigate = useNavigate()

  return (
    <IconButton onClick={() => navigate('/settings')} aria-label="modal-close" color="primary"
      sx={{ position: 'absolute', top: 17, right: 30 }}
    >
      <Close />
    </IconButton>
  )
}

function deleteChart(id: string, data: ChartsType, setData: SetChartsData) {
  setData(data.filter(el => el.id !== id))
}

export default function Settings() {
  const theme = useTheme()
  const { chartsData, filteredData } = useContext(MainContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isModalPath = pathname.split('/').filter(el => el !== '').length > 1
  const [modal, setModal] = useState<boolean>(isModalPath);

  useEffect(() => {
    isModalPath ? setModal(true) : setModal(false)
  }, [pathname, isModalPath])

  return (
    <>
      {filteredData.length < 1 ? <Typography variant='h4' component='h2' align="center">There is nothing here.</Typography> : null}
      <ChartsList navigate={navigate} charts={chartsData} theme={theme} deleteChart={deleteChart} />
      <Modal
        disableAutoFocus={true}
        open={modal}
        onClose={() => navigate('/settings')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={false}
        sx={{ overflow: 'auto' }}
      >
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          maxWidth: 800, width: '100%', maxHeight: '100vh', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, px: 4, py: 3,
          overflow: 'auto'
        }}>
          <Outlet />
        </Box>
      </Modal>
      <Fab
        color="primary" aria-label="add"
        sx={{ position: 'fixed', bottom: 40, right: 40 }}
        component={NavLink as React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLAnchorElement>>}
        to={'add-chart'}
      >
        <AddIcon />
      </Fab>
    </>
  )
}

function ChartsList({ navigate, deleteChart, charts, theme }: ChartsListProps) {
  const { filteredData, setChartsData } = useContext(MainContext)

  const handleModal = (e: React.MouseEvent<HTMLElement, MouseEvent>, id: string): void => {
    if((e.target as HTMLButtonElement).closest('.settings__chart-list__button--delete') === null) {
      navigate(`/settings/${id}`)
    }
  }

  return (
    <List>
      {charts.map((el) => (
        <ListItem
          key={el.id} onClick={(e) => handleModal(e, el.id)}
          sx={{
            maxWidth: 600,
            mx: 'auto',
            cursor: 'pointer',
            '&:hover > div': {
              bgcolor: 'primary.light',
              color: 'primary.contrastText'
            }
          }}
        >
          <Paper sx={{
            display: 'flex', alignItems: 'center', gap: 1, width: '100%', px: 2, py: 1,
            transition: theme.transitions.create(['background-color', 'color'], { duration: theme.transitions.duration.standard })
          }}>
            <ChartIcon type={el.options.series[0].type} />
            <Typography>{el.options.title.text}</Typography>
            <Button
              className="settings__chart-list__button--delete" aria-label="delete"
              variant="contained" color="error" sx={{ ml: 'auto' }} onClick={() => deleteChart(el.id, filteredData, setChartsData)}
            ><Delete fontSize="small"/></Button>
          </Paper>
        </ListItem>
      ))}
    </List>
  )
}

export function CreateChart() {
  const { availableChartTypes, setChartsData, filteredData } = useContext(MainContext)

  const navigate = useNavigate()
  const id = `chart-${useId()}`

  const [name, setName] = useState('')
  const [type, setType] = useState('line')
  const [data, setData] = useState<string>('[]')
  const [customOptions, setCustomOptions] = useState<string>('{}')
  const [colors, setColors] = useState<string[] | string>([
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
  ])

  function addChart() {
    if(data.indexOf('data') === -1 && data.indexOf('name') === -1) {
      alert('You have no either DATA or NAME string in your data')
      return
    }
    try {
      JSON.parse(data).map((el: any) => ({...el, type: type}))
      JSON.parse(customOptions)
    } catch(err) {
      alert('Your data is incorrect')
      return
    }

    const seriesData = JSON.parse(data).map((el: any) => ({...el, type: type}))
    const customOptionsData = JSON.parse(customOptions)

    if(typeof customOptionsData !== 'object') {
      alert('Your custom options written incorrectly')
      return
    }

    const newChart = {
      id: id,
      options: {
        title: {
          text: name
        },
        xAxis: {
          type: 'datetime',
        },
        colors: colors[0].match(/^(?:#[0-9a-f]{3}|#[0-9a-f]{6})$/) ? colors : [
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
        series: seriesData
      }
    }

    const newChartCustomOptions = {...newChart, options: {...newChart.options, ...customOptionsData}}

    setChartsData([...filteredData, newChartCustomOptions])
    navigate('/charts')
  }

  return (
    <>
      <CloseModalButton />
      <Typography id="modal-modal-title" variant="h5" component="h2" align={'center'} sx={{ mb: 3 }}>
        Create chart
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Chart name" color="primary"
          value={name} onChange={e => e.target.value.match(/^.{0,50}$/) && setName(e.target.value)}
        />
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={e => setType(e.target.value)}
          >
            {availableChartTypes.map((el, i) => (
              <MenuItem key={i} value={el}>{el}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip
          title={`[{"name": "String name", "data": [["YYYY%M%D%h%m%s%ms", "value"], ["YYYY%M", "value"]]}, {"name": "Number name", "data": [["YYYY", number], ["YYYY", number]]}]`}
          enterTouchDelay={0} followCursor
        >
          <TextField label="Data" color="primary" helperText={`[{"name":"String name","data":[["YYYY%M%D%h%m%s%ms","value"],["YYYY%M","value"]]}](JSON)`}
            value={data} onChange={e => setData(e.target.value.replaceAll('  ', ' '))} multiline maxRows={5}
          />
        </Tooltip>
        <TextField label="Colors" color="primary" helperText="Colors format(hex): color,color,color" multiline maxRows={2}
          value={colors} onChange={e => setColors(e.target.value.replace(/[^0-9a-f#,]/i, '').split(','))}
        />
        <Tooltip title={`{"title": {"text": "New title name"}}`} enterTouchDelay={0} followCursor>
          <TextField label="Custom options" color="primary"
            helperText="Paste your own options to add new or override existing(JSON)" multiline maxRows={5}
            value={customOptions} onChange={e => setCustomOptions(e.target.value.replaceAll('  ', ' '))}
          />
        </Tooltip>
        <Box>
          <Button variant={'contained'} onClick={addChart}>Add chart</Button>
        </Box>
      </Box>
    </>
  )
}

export function EditChart() {
  const { availableChartTypes, setChartsData, chartsData, filteredData } = useContext(MainContext)
  const { chartId } = useParams()
  const navigate = useNavigate()

  const chartById = chartsData.find(el => el.id === chartId)

  const [name, setName] = useState(chartById ? chartById.options.title.text : '')
  const [type, setType] = useState(chartById ? chartById.options.series[0].type : 'line')
  const [data, setData] = useState<string>(chartById ? JSON.stringify(chartById.options.series.map(({ type, ...rest }) => rest)) : '[]')
  const [customOptions, setCustomOptions] = useState<string>('{}')
  const [colors, setColors] = useState<string[] | string>(chartById ? chartById.options.colors : [''])

  function editChart() {
    if(chartById !== undefined) {
      if(data.indexOf('data') === -1 && data.indexOf('name') === -1) {
        alert('You have no either DATA or NAME string in your data')
        return
      }
      try {
        JSON.parse(data).map((el: any) => ({...el, type: type}))
        JSON.parse(customOptions)
      } catch(err) {
        alert('Your data is incorrect')
        return
      }

      const seriesData = JSON.parse(data).map((el: any) => ({...el, type: type}))
      const customOptionsData = JSON.parse(customOptions)

      if(typeof customOptionsData !== 'object') {
        alert('Your custom options written incorrectly')
        return
      }

      const editedChart = {
        options: {
          title: {
            text: name
          },
          xAxis: {
            type: 'datetime',
          },
          colors: colors[0].match(/^(?:#[0-9a-f]{3}|#[0-9a-f]{6})$/) ? colors : [
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
          series: seriesData
        }
      }

      const editedChartMerged = merge(chartById, editedChart, {options: customOptionsData})

      setChartsData(chartsData.map(el => el.id === chartById.id ? editedChartMerged : el))
      navigate('/charts')
    }
  }

  const deleteChartHandle = () => {
    deleteChart(chartId as string, filteredData, setChartsData)
    navigate('/settings')
  }

  useEffect(() => {
    if(chartById === undefined) {
      navigate('/settings/add-chart', { replace: true })
    }
  }, [chartById, navigate])

  return (
    <>
      <CloseModalButton />
      <Typography id="modal-modal-title" variant="h5" component="h2" align={'center'} sx={{ mb: 3 }}>
        Edit chart
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Chart name" color="primary"
          value={name} onChange={e => e.target.value.match(/^.{0,50}$/) && setName(e.target.value)}
        />
        <FormControl>
          <InputLabel>Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Type"
            onChange={e => setType(e.target.value)}
          >
            {availableChartTypes.map((el, i) => (
              <MenuItem key={i} value={el}>{el}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip
          title={`[{"name": "String name", "data": [["YYYY%M%D%h%m%s%ms", "value"], ["YYYY%M", "value"]]}, {"name": "Number name", "data": [["YYYY", number], ["YYYY", number]]}]`}
          enterTouchDelay={0} followCursor
        >
          <TextField label="Data" color="primary" helperText={`[{"name":"String name","data":[["YYYY%M%D%h%m%s%ms","value"],["YYYY%M","value"]]}](JSON)`}
            value={data} onChange={e => setData(e.target.value.replaceAll('  ', ' '))} multiline maxRows={5}
          />
        </Tooltip>
        <TextField label="Colors" color="primary" helperText="Colors format(hex): color,color,color" multiline maxRows={2}
          value={colors} onChange={e => setColors(e.target.value.replace(/[^0-9a-f#,]/i, '').split(','))}
        />
        <Tooltip title={`{"title": {"text": "New title name"}}`} enterTouchDelay={0} followCursor>
          <TextField label="Custom options" color="primary"
            helperText="Paste your own options to add new or override existing(JSON)" multiline maxRows={5}
            value={customOptions} onChange={e => setCustomOptions(e.target.value.replaceAll('  ', ' '))}
          />
        </Tooltip>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button variant={'contained'} onClick={editChart}>Add chart</Button>
          <Button variant={'contained'} color="error" onClick={deleteChartHandle}>Delete chart</Button>
        </Box>
      </Box>
    </>
  )
}