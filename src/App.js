import React,{useState} from 'react';
import Chat from './pages/chat';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import VideoCall from './pages/videocall';
const div_style = {
  width: '100vw',
  height: '100vh',
  display: 'grid',
  placeItems: 'center'
}
const Log_out = () => {
  const [file, setFile] = useState({});
  const handleFileChange = (e) => {
    console.log("file>>>", e.target.files[0].name)
    setFile(e.target.files[0]);
};

  return (<div style={div_style}>
    <input type="file" onChange={handleFileChange} accept="image/*"/>
    <h1>🔥⚡Thanks </h1></div>
    
    )
}
// function Log_out
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        {/* <Route index element={<Home />} /> */}
        {/* <Route path="blogs" element={<Blogs />} /> */}
        {/* <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
        <Route path="/Logout" element={<Log_out />} />
      </Routes>
    </BrowserRouter>



  );
}
export default App;