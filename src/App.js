import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { MyProvider } from './context/ApiContext';
import LoginPage from './page1/LoginPage';
import AdmRegisterPage from './page2/AdmRegisterPage';
import ClientRegisterPage from './page3/ClientRegisterPage';
import ClientManager from './page3/ClientManager'
import ClientRegistered from './page3/ClientRegistered';
import InsertData from './page4/InsertData'
import SearchPrjctClnt from './page5/SearchPrjctClnt';
import SearchPrjctBigTax from './page5/SearchPrjctBigTax';
import SearchPrjctClntMnth from './page5/SearchPrjctClntMnth';
import AllProjct from './page5/AllProjct';
import ListConMonth from './page5/ListConMonth'
import StartPg from './page2/StartPg'

function App() {
  return (
    <MyProvider>
   <div className="App">
<BrowserRouter>

<div className="b-bottom"></div>
<Routes>
<Route exact path='/' element={<LoginPage/>}/>
<Route  path='/StartPg' element={<StartPg/>}/>
<Route  path='/AdmRegisterPage' element={<AdmRegisterPage/>}/>
<Route  path='/ClientRegisterPage' element={<ClientRegisterPage/>}/>
<Route  path='/ClientRegistered' element={<ClientRegistered/>}/>
<Route  path='/ClientManager' element={<ClientManager/>}/>
<Route  path='/InsertData' element={<InsertData/>}/>
<Route  path='/SearchPrjctClnt' element={<SearchPrjctClnt/>}/>
<Route  path='/SearchPrjctBigTax' element={<SearchPrjctBigTax/>}/>
<Route  path='/SearchPrjctClntMnth' element={<SearchPrjctClntMnth/>}/>
<Route  path='/AllProjct' element={<AllProjct/>}/>
<Route  path='/ListConMonth' element={<ListConMonth/>}/>
</Routes>
</BrowserRouter>
  </div>  
  </MyProvider>
  )
}

export default App;

