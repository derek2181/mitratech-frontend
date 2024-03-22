import React from 'react'
import './App.css'
import Stack from '@mui/material/Stack'

import WidgetList from './components/WidgetList'
import Header from './components/reusable/Header'

const App = () => {
  return (<Stack>
    <Header/>   
    <WidgetList></WidgetList>
  </Stack>)
}

export default App
