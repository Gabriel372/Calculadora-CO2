import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { MyProvider } from './context/ApiContext';
import LoginPage from './page1/LoginPage';
import AdmRegisterPage from './page2/AdmRegisterPage';
import ClientRegisterPage from './page3/ClientRegisterPage';
import ClientManager from './page3/ClientManager'
import ClientRegistered from './page3/ClientRegistered';
import InsertData from './page4/InsertData'
import ReportPage from './page5/ReportPage';
import EletricEmiss from './page5/EletricEmiss'
import WaterEmiss from './page5/WaterEmiss'
import ResidueGen from './page5/ResidueGen'
//BrowserRouter

function App() {
  return (
    <MyProvider>
   <div className="App">
<BrowserRouter>

<div className="b-bottom"></div>
<Routes>
<Route exact path='/' element={<LoginPage/>}/>
<Route  path='/AdmRegisterPage' element={<AdmRegisterPage/>}/>
<Route  path='/ClientRegisterPage' element={<ClientRegisterPage/>}/>
<Route  path='/ClientRegistered' element={<ClientRegistered/>}/>
<Route  path='/ClientManager' element={<ClientManager/>}/>
<Route  path='/InsertData' element={<InsertData/>}/>
<Route  path='/ReportPage' element={<ReportPage/>}/>
<Route  path='/EletricEmiss' element={<EletricEmiss/>}/>
<Route  path='/WaterEmiss' element={<WaterEmiss/>}/>
<Route  path='/ResidueGen' element={<ResidueGen/>}/>

</Routes>
{/* <LoginPage/> */}
{/* <RegisterAdmPage/> */}
</BrowserRouter>
  </div>  
  </MyProvider>
  )
}

export default App;

