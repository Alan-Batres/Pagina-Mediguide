import { useState } from 'react';
import '../App.css';
import logo from '../assets/logoMedguide_transparent.png';

function UserInfo({ onAuthSuccess }){
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
        setMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            if (isLogin) {
                // Login
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage('¡Bienvenido de vuelta!');
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('username', data.username);
                    setTimeout(() => onAuthSuccess(), 1000);
                } else {
                    setMessage(`Error: ${data.error}`);
                }
            } else {
                // Signup
                if (formData.password !== formData.confirmPassword) {
                    setMessage('Las contraseñas no coinciden');
                    setLoading(false);
                    return;
                }

                const response = await fetch('/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage('¡Cuenta creada exitosamente! Iniciando sesión...');
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('username', data.username);
                    setTimeout(() => onAuthSuccess(), 1000);
                } else {
                    setMessage(`Error: ${data.error}`);
                }
            }
        } catch (error) {
            setMessage(`Error de conexión: ${error.message}`);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return(
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px'
    }}>
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '40px',
            maxWidth: '500px',
            width: '100%'
        }}>
            <img src={logo} alt='Mediguide Logo' style={{
                width: '100px',
                height: 'auto',
                display: 'block',
                margin: '0 auto 20px'
            }}></img>
            
            <p style={{textAlign: 'center', color: '#666', marginBottom: '30px'}}>
                Donde la salud del usuario es nuestra prioridad
            </p>

            {/* Toggle between Login and Signup */}
            <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '25px',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: '#e0e0e0'
            }}>
                <button
                    type='button'
                    onClick={() => !loading && toggleMode()}
                    style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: isLogin ? '#4CAF50' : 'transparent',
                        color: isLogin ? 'white' : '#333',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                    }}
                    disabled={loading}
                >
                    Iniciar Sesión
                </button>
                <button
                    type='button'
                    onClick={() => !loading && toggleMode()}
                    style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: !isLogin ? '#4CAF50' : 'transparent',
                        color: !isLogin ? 'white' : '#333',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                    }}
                    disabled={loading}
                >
                    Registrarse
                </button>
            </div>

            {/* Message */}
            {message && (
                <p style={{
                    color: message.includes('Error') ? '#d32f2f' : '#4CAF50',
                    textAlign: 'center',
                    marginBottom: '20px',
                    padding: '10px',
                    backgroundColor: message.includes('Error') ? '#ffebee' : '#e8f5e9',
                    borderRadius: '4px',
                    fontSize: '14px'
                }}>
                    {message}
                </p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '15px'}}>
                    <label htmlFor='UserName' style={{display: 'block', marginBottom: '5px', fontWeight: '500'}}>
                        Nombre de Usuario
                    </label>
                    <input
                        type='text'
                        name='username'
                        id='UserName'
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                        }}
                        placeholder='Ingresa tu nombre de usuario'
                    />
                </div>

                {!isLogin && (
                    <div style={{marginBottom: '15px'}}>
                        <label htmlFor='Email' style={{display: 'block', marginBottom: '5px', fontWeight: '500'}}>
                            Correo Electrónico
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='Email'
                            value={formData.email}
                            onChange={handleChange}
                            required={!isLogin}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                            placeholder='Ingresa tu correo electrónico'
                        ></input>
                    </div>
                )}

                <div style={{marginBottom: '15px'}}>
                    <label htmlFor='Password' style={{display: 'block', marginBottom: '5px', fontWeight: '500'}}>
                        Contraseña
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='Password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                        }}
                        placeholder='Ingresa tu contraseña'
                    ></input>
                </div>

                {!isLogin && (
                    <div style={{marginBottom: '15px'}}>
                        <label htmlFor='ConfirmPassword' style={{display: 'block', marginBottom: '5px', fontWeight: '500'}}>
                            Confirmar Contraseña
                        </label>
                        <input
                            type='password'
                            name='confirmPassword'
                            id='ConfirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required={!isLogin}
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                            placeholder='Confirma tu contraseña'
                        ></input>
                    </div>
                )}

                <button
                    type='submit'
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: loading ? '#ccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                </button>
            </form>

            {isLogin && (
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <a href='#' style={{color: '#4CAF50', textDecoration: 'none', fontSize: '14px'}}>
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            )}
        </div>
    </div>
    )
}

export default UserInfo
