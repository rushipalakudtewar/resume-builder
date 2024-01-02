import './App.css';
import Login from './components/Login';
import { Routes,Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ChooseTemplates from './components/ChooseTemplates';
import SignUp from './components/Signup';
import Template1 from './components/templates/Template1';
import Template2 from './components/templates/Template2';
import Template3 from './components/templates/Template3';
import Spinner from './components/templates/spinner/Spinner';



function App() {
  return (
    <div>        
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/choosetemplates" element={<ChooseTemplates/>}/>
          <Route path='/template1' element={<Template1 />} />
          <Route path='/template2' element={<Template2 />} />
          <Route path='/template3' element={<Template3  />} />
          <Route path='/spinner' element={<Spinner />} />
        </Routes>
    </div>
    
  );
}

export default App;
