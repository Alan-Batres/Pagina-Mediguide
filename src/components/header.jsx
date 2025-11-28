import '../App.css'
import logo from '../assets/logoMedguide_transparent.png'

function HeaderContent({ onLogout }){
    const username = localStorage.getItem('username');
    
    return(
    <header>
        <img src={logo} alt='Mediguide Logo'></img>
        <p>Donde la salud del usuario es nuestra prioridad</p>
        {username && (
            <div className="header-user-section">
                <span className="welcome-text">Bienvenido, {username}</span>
                <button 
                    type='button' 
                    onClick={onLogout}
                    className="logout-button"
                >
                    Cerrar Sesión
                </button>
            </div>
        )}
    </header>
    )
}

export default HeaderContent