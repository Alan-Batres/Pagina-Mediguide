import '../App.css'
import logo from '../assets/logoMedguide_transparent.png'

function Footer(){
    return(
        <div>
            <img src={logo} alt='Mediguide Logo' style={{height: '60px', width: 'auto'}}/>
            <h1>Centro Médico del Bosque</h1>
            <h2>Comunicate con Nosotros</h2>
            <button type='button'>Dudas y Sugerencias</button>
            <button type='button'>Información Legal</button>
            <section>
                <h3>Correo Electrónico</h3>
                <p>hola@sitioincreible.com</p>
            </section>
            <section>
                <h3>Teléfono</h3>
                <p>(55) 1234 5678</p>
            </section>
        </div>
    )
}

export default Footer