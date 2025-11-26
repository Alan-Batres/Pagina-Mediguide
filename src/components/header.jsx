import '../App.css'
import logo from '../assets/logoMedguide_transparent.png'

function HeaderContent({ onLogout }){
    const username = localStorage.getItem('username');
    
    return(
    <header>
        <img src={logo} alt='Mediguide Logo' style={{height: '60px', width: 'auto'}}></img>
        <h2>Guia sobre Salud</h2>
        <p>Donde la salud del usuario es nuestra prioridad</p>
        {username && (
            <div style={{display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'flex-end'}}>
                <span style={{color: 'white', fontWeight: 'bold'}}>Bienvenido, {username}</span>
                <button 
                    type='button' 
                    onClick={onLogout}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#d32f2f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Cerrar Sesión
                </button>
            </div>
        )}
        <img src='Link de Prueba' alt='Foto Stock'></img>
    </header>
    )
}

export default HeaderContent