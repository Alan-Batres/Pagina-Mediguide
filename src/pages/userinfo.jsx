import { useState } from 'react';
import '../App.css';
import logo from '../assets/logoMedguide_transparent.png';
import ResetPassword from './resetpassword';

function UserInfo({ onAuthSuccess }){
    const [isLogin, setIsLogin] = useState(true);
    const [showReset, setShowReset] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

        const apiUrl = 'http://localhost:3001';

        try {
            if (isLogin) {
                const response = await fetch(`${apiUrl}/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password
                    })
                });

                console.log('Response status:', response.status);
                console.log('Response ok:', response.ok);

                const text = await response.text();
                console.log('Response text:', text);

                if (!text) {
                    setMessage('Error: Servidor no respondió');
                    setLoading(false);
                    return;
                }

                const data = JSON.parse(text);

                if (response.ok) {
                    setMessage('¡Bienvenido de vuelta!');
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('username', data.username);
                    setTimeout(() => onAuthSuccess(), 1000);
                } else {
                    setMessage(`Error: ${data.error}`);
                    console.error('Login error:', data.error);
                }
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    setMessage('Por favor ingresa un correo electrónico válido');
                    setLoading(false);
                    return;
                }

                if (formData.password !== formData.confirmPassword) {
                    setMessage('Las contraseñas no coinciden');
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${apiUrl}/api/users/signup`, {
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

                console.log('Response status:', response.status);
                console.log('Response ok:', response.ok);

                const text = await response.text();
                console.log('Response text:', text);

                if (!text) {
                    setMessage('Error: Servidor no respondió');
                    setLoading(false);
                    return;
                }

                const data = JSON.parse(text);

                if (response.ok) {
                    setMessage('¡Cuenta creada exitosamente! Iniciando sesión...');
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('username', data.username);
                    setTimeout(() => onAuthSuccess(), 1000);
                } else {
                    setMessage(`Error: ${data.error}`);
                    console.error('Signup error:', data.error);
                }
            }
        } catch (error) {
            setMessage(`Error de conexión: ${error.message}`);
            console.error('Network error:', error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            {showReset ? (
                <ResetPassword onBack={() => setShowReset(false)} />
            ) : (
                <div className="auth-container">
                    <div className="auth-card">
                        <img src={logo} alt='Mediguide Logo' className="auth-logo"></img>
                        
                        <p className="auth-tagline">
                            Donde la salud del usuario es nuestra prioridad
                        </p>

                        {/* Toggle between Login and Signup */}
                        <div className="auth-toggle">
                            <button
                                type='button'
                                onClick={() => !loading && toggleMode()}
                                className="auth-toggle-btn"
                                style={{
                                    backgroundColor: isLogin ? '#0066cc' : 'transparent',
                                    color: isLogin ? 'white' : '#333'
                                }}
                                disabled={loading}
                            >
                                Iniciar Sesión
                            </button>
                            <button
                                type='button'
                                onClick={() => !loading && toggleMode()}
                                className="auth-toggle-btn"
                                style={{
                                    backgroundColor: !isLogin ? '#0066cc' : 'transparent',
                                    color: !isLogin ? 'white' : '#333'
                                }}
                                disabled={loading}
                            >
                                Registrarse
                            </button>
                        </div>

                        {/* Message */}
                        {message && (
                            <p className="auth-message" style={{
                                color: (message.includes('Error') || message.includes('no coinciden') || message.includes('válido')) ? '#d32f2f' : '#4CAF50',
                                backgroundColor: (message.includes('Error') || message.includes('no coinciden') || message.includes('válido')) ? '#ffebee' : '#e8f5e9'
                            }}>
                                {message}
                            </p>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="auth-form-group">
                                <label htmlFor='UserName' className="auth-label">
                                    Nombre de Usuario
                                </label>
                                <input
                                    type='text'
                                    name='username'
                                    id='UserName'
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="auth-input"
                                    placeholder='Ingresa tu nombre de usuario'
                                />
                            </div>

                            {!isLogin && (
                                <div className="auth-form-group">
                                    <label htmlFor='Email' className="auth-label">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type='email'
                                        name='email'
                                        id='Email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required={!isLogin}
                                        className="auth-input"
                                        placeholder='Ingresa tu correo electrónico'
                                    ></input>
                                </div>
                            )}

                            <div className="auth-form-group">
                                <label htmlFor='Password' className="auth-label">
                                    Contraseña
                                </label>
                                <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
                                        id='Password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="auth-input"
                                        placeholder='Ingresa tu contraseña'
                                        style={{flex: 1}}
                                    ></input>
                                    <button
                                        type='button'
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            padding: '0.6rem 0.8rem',
                                            backgroundColor: '#0066cc',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            fontWeight: 'bold',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#0052a3'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#0066cc'}
                                    >
                                        {showPassword ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                            </div>

                            {!isLogin && (
                                <div className="auth-form-group">
                                    <label htmlFor='ConfirmPassword' className="auth-label">
                                        Confirmar Contraseña
                                    </label>
                                    <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name='confirmPassword'
                                            id='ConfirmPassword'
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required={!isLogin}
                                            className="auth-input"
                                            placeholder='Confirma tu contraseña'
                                            style={{flex: 1}}
                                        ></input>
                                        <button
                                            type='button'
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{
                                                padding: '0.6rem 0.8rem',
                                                backgroundColor: '#0066cc',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                fontWeight: 'bold',
                                                transition: 'background-color 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => e.target.style.backgroundColor = '#0052a3'}
                                            onMouseLeave={(e) => e.target.style.backgroundColor = '#0066cc'}
                                        >
                                            {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                type='submit'
                                disabled={loading}
                                className="auth-submit-btn"
                                style={{
                                    backgroundColor: loading ? '#ccc' : '#0066cc'
                                }}
                            >
                                {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                            </button>
                        </form>

                        {isLogin && (
                            <div className="auth-forgot-password">
                                <button
                                    type='button'
                                    onClick={() => setShowReset(true)}
                                    className="auth-forgot-link"
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default UserInfo