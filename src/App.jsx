
import './App.css'
import LanddPage from './land/LanddPage';
import ScrollGalleryPinned from './ScrollGalleryPinned'
import ScrollVelocity from './ScrollVelocity';

import PageLand from './PageLand';
import { useEffect } from 'react';


function App() {
    useEffect(() => {
    document.body.style.overflowX = "hidden"; 
      
  }, []);
  return (
    <>

  <LanddPage/>
    
    </>
  )
}

export default App