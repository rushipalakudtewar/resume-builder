import './App.css';
import Login from './components/Login';
// import Dashboard from './components/Dashboard';
import { Routes,Route} from 'react-router-dom';
import CreateResume from './components/CreateResume';
import Dashboard from './components/Dashboard';
import ChooseTemplates from './components/ChooseTemplates';
import SignUp from './components/Signup';
import Template1 from './components/templates/Template1';
import Template2 from './components/templates/Template2';
import Template3 from './components/templates/Template3';
import SharedPage from './components/templates/SharedPage';





function App() {
  return (
    <div>        
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/resume-dashboard" element={<Dashboard/>}/>
          <Route path="/choosetemplates" element={<ChooseTemplates/>}/>
          <Route path="/resume" element={<CreateResume/>}/>
          <Route path='/template1' element={<Template1 />} />
          <Route path='/template2' element={<Template2 />} />
          <Route path='/template3' element={<Template3  />} />
          <Route path="/shared/:token" element={<SharedPage/>} />
        </Routes>
    </div>
    
  );
}

export default App;
