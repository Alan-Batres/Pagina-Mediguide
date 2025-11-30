import { useState, useEffect } from 'react';
import '../App.css';
import logo from '../assets/logoMedguide_transparent.png';

function ResetPassword({ onBack }){
    const [step, setStep] = useState(1); 
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [displayCode, setDisplayCode] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const handlePopState = (event) => {
            event.preventDefault();
            onBack();
            window.history.forward();
        };

        window.addEventListener('popstate', handlePopState);
        window.history.pushState(null, null, window.location.href);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [onBack]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage('Por favor ingresa un correo electrónico válido');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(`Error: ${data.error}`);
                console.error('Backend error:', data.error);
                return;
            }

            console.log('Reset code sent to:', email);
            console.log('Reset code for testing:', data.resetCode);
            setDisplayCode(data.resetCode);
            setMessage('Se ha enviado un código de recuperación a tu correo electrónico.');
            setStep(2);
        } catch (error) {
            console.error('Network error:', error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (resetCode.length < 6) {
            setMessage('El código debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/users/verify-reset-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, resetCode })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(`Error: ${data.error}`);
                console.error('Backend error:', data.error);
                setLoading(false);
                return;
            }

            setMessage('Código verificado. Ingresa tu nueva contraseña.');
            setStep(3);
        } catch (error) {
            console.error('Network error:', error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            if (newPassword !== confirmPassword) {
                setMessage('Las contraseñas no coinciden');
                setLoading(false);
                return;
            }

            if (newPassword.length < 6) {
                setMessage('La contraseña debe tener al menos 6 caracteres');
                setLoading(false);
                return;
            }

            const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);
            if (!hasSpecialChar) {
                setMessage('La contraseña debe contener al menos un carácter especial (!@#$%^&* etc.)');
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:3001/api/users/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, resetCode, newPassword })
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(`Error: ${data.error}`);
                console.error('Backend error:', data.error);
                setLoading(false);
                return;
            }

            console.log('Password reset for:', email);
            setMessage('¡Contraseña actualizada exitosamente! Redirigiendo...');
            setTimeout(() => {
                onBack();
            }, 2000);
        } catch (error) {
            console.error('Network error:', error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="auth-container">
            <div className="auth-card">
                <img src={logo} alt='Mediguide Logo' className="auth-logo"></img>
                
                <h1 className="reset-title">
                    Recuperar Contraseña
                </h1>
                <p className="auth-tagline">
                    Donde la salud del usuario es nuestra prioridad
                </p>

                {message && step !== 3 && (
                    <p className="auth-message" style={{
                        color: (message.includes('Error') || message.includes('válido')) ? '#d32f2f' : '#4CAF50',
                        backgroundColor: (message.includes('Error') || message.includes('válido')) ? '#ffebee' : '#e8f5e9'
                    }}>
                        {message}
                    </p>
                )}

                {/* Step 1: Email */}
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit}>
                        <div className="auth-form-group">
                            <label htmlFor='ResetEmail' className="auth-label">
                                Correo Electrónico
                            </label>
                            <input
                                type='email'
                                id='ResetEmail'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="auth-input"
                                placeholder='Ingresa tu correo electrónico'
                            />
                        </div>
                        <button
                            type='submit'
                            disabled={loading}
                            className="auth-submit-btn"
                            style={{
                                backgroundColor: loading ? '#ccc' : '#0066cc'
                            }}
                        >
                            {loading ? 'Enviando...' : 'Enviar Código'}
                        </button>
                    </form>
                )}

                {/* Step 2: Code */}
                {step === 2 && (
                    <>
                        {displayCode && (
                            <div className="reset-code-display">
                                <p style={{color: '#0052a3', fontWeight: 'bold', marginBottom: '0.5rem'}}>Tu código de recuperación:</p>
                                <div style={{
                                    backgroundColor: '#e3f2fd',
                                    border: '2px solid #0066cc',
                                    borderRadius: '8px',
                                    padding: '1rem',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    color: '#0066cc',
                                    textAlign: 'center',
                                    letterSpacing: '2px',
                                    marginBottom: '1.5rem',
                                    fontFamily: 'monospace'
                                }}>
                                    {displayCode}
                                </div>
                                <p style={{color: '#666', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1.5rem'}}>
                                    Copia este código y pégalo en el campo de abajo
                                </p>
                            </div>
                        )}
                        <form onSubmit={handleCodeSubmit}>
                            <div className="auth-form-group">
                                <label htmlFor='ResetCode' className="auth-label">
                                    Código de Recuperación
                                </label>
                                <input
                                    type='text'
                                    id='ResetCode'
                                    value={resetCode}
                                    onChange={(e) => setResetCode(e.target.value)}
                                    required
                                    className="auth-input"
                                    placeholder='Ingresa el código enviado a tu correo'
                                />
                            </div>
                            <button
                                type='submit'
                                disabled={loading}
                                className="auth-submit-btn"
                                style={{
                                    backgroundColor: loading ? '#ccc' : '#0066cc'
                                }}
                            >
                                {loading ? 'Verificando...' : 'Verificar Código'}
                            </button>
                        </form>
                    </>
                )}

                {/* Step 3: New Password */}
                {step === 3 && (
                    <>
                        {message && (
                            <p className="auth-message" style={{
                                color: (message.includes('Error') || message.includes('no coinciden') || message.includes('menos') || message.includes('especial')) ? '#d32f2f' : '#4CAF50',
                                backgroundColor: (message.includes('Error') || message.includes('no coinciden') || message.includes('menos') || message.includes('especial')) ? '#ffebee' : '#e8f5e9'
                            }}>
                                {message}
                            </p>
                        )}
                        <form onSubmit={handlePasswordSubmit}>
                        <div className="auth-form-group">
                            <label htmlFor='NewPassword' className="auth-label">
                                Nueva Contraseña
                            </label>
                            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    id='NewPassword'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="auth-input"
                                    placeholder='Ingresa tu nueva contraseña'
                                    style={{flex: 1}}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowNewPassword(!showNewPassword)}
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
                                    {showNewPassword ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </div>

                        <div className="auth-form-group">
                            <label htmlFor='ConfirmNewPassword' className="auth-label">
                                Confirmar Contraseña
                            </label>
                            <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id='ConfirmNewPassword'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="auth-input"
                                    placeholder='Confirma tu nueva contraseña'
                                    style={{flex: 1}}
                                />
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

                        <button
                            type='submit'
                            disabled={loading}
                            className="auth-submit-btn"
                            style={{
                                backgroundColor: loading ? '#ccc' : '#0066cc'
                            }}
                        >
                            {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                        </button>
                        </form>
                    </>
                )}

                {/* Back Button */}
                <button
                    type='button'
                    onClick={onBack}
                    className="reset-back-btn"
                >
                    Volver a Iniciar Sesión
                </button>
            </div>
        </div>
    )
}

export default ResetPassword
