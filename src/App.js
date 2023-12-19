import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VideoCapture from './page/video'
import Home from './page/home'
import Template from './page/template'
import Login from './page/login'
import Camera from './components/test'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/template' element={<Template />} />
        <Route path='/capture' element={<VideoCapture />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Camera' element={<Camera />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App