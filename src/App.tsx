import './App.css'
import DesktopView from './Components/DesktopView'
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Pagination from './Components/Pagination'

function App() {

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 800);

  const updateMedia = () => {
    setIsDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  });

  return (
    <>
      <Navbar/>
      {isDesktop ? <DesktopView /> : <></>}
      <div style={{padding:30}}>
        <Pagination/>
      </div>
    </>
  )
} 

export default App
