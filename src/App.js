import { Route, Routes } from 'react-router-dom';
import './App.css';
import CommonLayout from './layout/CommonLayout';
import EnMapContainer from './map/EnMapContainer';
import MapContainers from './map/MapContainers';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route index element={<CommonLayout children={<MapContainers />} />} />
        <Route path="allColl" element={<CommonLayout children={<MapContainers />} />} />
        <Route path="history" element={<CommonLayout children={<EnMapContainer />} />} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>
  )
}

export default App;
