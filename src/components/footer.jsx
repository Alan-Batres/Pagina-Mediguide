import '../App.css'
import { useState, useEffect } from 'react'
import logo from '../assets/logoMedguide_transparent.png'
import LegalInfo from '../pages/legalinfo'

function Footer(){
    const [showLegalInfo, setShowLegalInfo] = useState(false);

    useEffect(() => {
        const handlePopState = (event) => {
            if (showLegalInfo) {
                event.preventDefault();
                setShowLegalInfo(false);
                window.history.forward();
            }
        };

        window.addEventListener('popstate', handlePopState);
        
        if (showLegalInfo) {
            window.history.pushState(null, null, window.location.href);
        }

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [showLegalInfo]);

    const handleOpenModal = (setModal) => {
        window.history.pushState(null, null, window.location.href);
        setModal(true);
    };

    const handleCloseModal = (setModal) => {
        setModal(false);
        window.history.back();
    };

    return(
        <>
            {showLegalInfo && <LegalInfo onClose={() => handleCloseModal(setShowLegalInfo)} />}
            <footer>
                <div className="footer-content">
                    <img src={logo} alt='Mediguide Logo'/>
                    <h1>Comunicate con Nosotros</h1>
                    <section>
                        <h3>Correo Electrónico</h3>
                        <p>mediguide05@gmail.com</p>
                    </section>
                    <section>
                        <h3>Teléfono</h3>
                        <p>(614) 609 7295</p>
                    </section>
                    <button type='button' onClick={() => handleOpenModal(setShowLegalInfo)}>Información Legal</button>
                </div>
            </footer>
        </>
    )
}

export default Footer