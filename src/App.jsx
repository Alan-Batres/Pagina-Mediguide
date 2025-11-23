import './App.css';
import Header from './components/header';
import UserInfo from './components/userinfo';
import CTA from './components/CTA';
import MedCheck from './components/medinfo';
import Analize from './components/analize';
import HealthPlan from './components/healthplan';
import Footer from './components/footer'

function App(){
  return(
    <div className='Background'>
      <Header/>
      <UserInfo/>
      <CTA/>
      <MedCheck/>
      <Analize/>
      <HealthPlan/>
      <Footer/>
    </div>
  )
}

export default App