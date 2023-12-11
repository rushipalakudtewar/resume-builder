import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div>        
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/resume" element={<Dashboard/>}/>
        </Routes>
    </div>
    
  );
}

export default App;
