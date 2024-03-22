import React from 'react'
import './App.css'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'


import WidgetList from './components/Home/WidgetList'
import Header from './components/reusable/Header'
import Footer from './components/reusable/Footer'

const App = () => {
  return (<Box height={"100vh"} bgcolor={'#F5F5F5'}>
    
    <Stack height={"100%"} padding={0}>
      <Header/>   
      <WidgetList></WidgetList>
      <Footer/>
    </Stack>
  </Box>)
}

export default App
