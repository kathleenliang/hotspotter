import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from "./components/Navbar"
import LandingPage from './components/LandingPage'
import EligibilityPage from './components/EligibilityPage'
import EligiblePage from './components/EligiblePage'
import ClinicPage from './components/ClinicPage'
import SubmitLocationPage from './components/SubmitLocationPage'

function App() {
  return (
    <BrowserRouter>
        <div>
          <Navbar />
            <Switch>
             <Route path="/" component={LandingPage} exact/>
             <Route path="/eligibility" component={EligibilityPage}/>
             <Route path="/eligible" render={props => <EligiblePage {...props}/>} />
             <Route path="/clinics" render={props => <ClinicPage {...props}/>}/>
             <Route path="/submit" component={SubmitLocationPage}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
  );
}

export default App;
