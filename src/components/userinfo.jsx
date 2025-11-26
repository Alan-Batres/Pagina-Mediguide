import { useState } from 'react';
import '../App.css';

function UserInfo(){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('¡Usuario registrado exitosamente!');
                // Reset form
                setFormData({
                    username: '',
                    email: '',
                    password: ''
                });
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage(`Error de conexión: ${error.message}`);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return(
    <div>
        <img src='Link de Prueba' alt='LOGO'></img>
        <h1>Mediguide</h1>
        <p>Donde la salud del usuario es nuestra prioridad</p>
        {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='UserName'>Nombre de Usuario</label>
                <input type='text' name='username' id='UserName' value={formData.username} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor='Email'>Correo Electrónico</label>
                <input type='email' name='email' id='Email' value={formData.email} onChange={handleChange} required></input>
            </div>
            <div>
                <label htmlFor='Password'>Contraseña</label>
                <input type='password' name='password' id='Password' value={formData.password} onChange={handleChange} required></input>
            </div>
            <button type='submit' disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
        </form>
        <a href='Link de Prueba'> Olvide mi Contraseña</a>
    </div>
    )
}

export default UserInfo