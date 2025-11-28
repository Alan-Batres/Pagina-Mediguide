import '../App.css'
import { useState } from 'react'
import logo from '../assets/logoMedguide_transparent.png'
import LegalInfo from '../pages/legalinfo'

function Footer(){
    const [showLegalInfo, setShowLegalInfo] = useState(false);

    return(
        <>
            {showLegalInfo && <LegalInfo onClose={() => setShowLegalInfo(false)} />}
            <div>
                <img src={logo} alt='Mediguide Logo'/>
                <h1>Centro Médico del Bosque</h1>
                <h2>Comunicate con Nosotros</h2>
                <button type='button'>Dudas y Sugerencias</button>
                <button type='button' onClick={() => setShowLegalInfo(true)}>Información Legal</button>
                <section>
                    <h3>Correo Electrónico</h3>
                    <p>hola@sitioincreible.com</p>
                </section>
                <section>
                    <h3>Teléfono</h3>
                    <p>(55) 1234 5678</p>
                </section>
            </div>
        </>
    )
}

export default Footer