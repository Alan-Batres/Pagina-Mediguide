import '../App.css'
import logo from '../assets/logoMedguide_transparent.png'

function Analize(){
    return(
        <div>
            <img src={logo} alt='Mediguide Logo' style={{height: '60px', width: 'auto'}}></img>
            <h1>Analizando Datos</h1>
            <img src={logo} alt='Mediguide Logo' style={{height: '60px', width: 'auto'}}></img>
            <h2>Gracias por ingresar tus datos medicos en la aplicación, ahora veras como te encuentras en tu salud</h2>
            <section>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </section>
        </div>
    )
}

export default Analize