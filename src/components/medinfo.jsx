import { useState } from 'react'
import '../App.css'
import { medicalDataEmitter } from '../utils/medicalDataContext'

function MedCheck(){
    const [formData, setFormData] = useState({
        glucose: '',
        oxygenBlood: '',
        bloodPressureSystolic: '',
        bloodPressureDiastolic: '',
        temperature: '',
        age: '',
        height: '',
        weight: '',
        respiratoryRate: '',
        bloodType: '',
        heartRate: ''
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
            const userId = localStorage.getItem('userId');
            const response = await fetch('http://localhost:3001/api/medical-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, userId })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('¡Información guardada exitosamente!');
                medicalDataEmitter.emit();
                setFormData({
                    glucose: '',
                    oxygenBlood: '',
                    bloodPressureSystolic: '',
                    bloodPressureDiastolic: '',
                    temperature: '',
                    age: '',
                    height: '',
                    weight: '',
                    respiratoryRate: '',
                    bloodType: '',
                    heartRate: ''
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
        <p>CHEQUEO MEDICO</p>
        <h2>MEDIGUIDE OFRECE GUIAS MEDICAS EN BASE A LA SALUD DE NUESTROS USUARIOS</h2>
        {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='Glucose'>Nivel de Glucosa (mg/dl)</label>
                <input type='number' name='glucose' id='Glucose' value={formData.glucose} onChange={handleChange} min="0" max="999" required/>
            </div>
            <div>
                <label htmlFor='OxigenBlood'>Oxigenación de la sangre (%)</label>
                <input type='number' name='oxygenBlood' id='OxigenBlood' value={formData.oxygenBlood} onChange={handleChange} min="0" max="100" required/>
            </div>
            <div>
                <label htmlFor='BloodPresSystolic'>Presión Arterial Sistólica - (Número superior) (mmHg)</label>
                <input type='number' name='bloodPressureSystolic' id='BloodPresSystolic' value={formData.bloodPressureSystolic} onChange={handleChange} min="0" max="300" required/>
            </div>
            <div>
                <label htmlFor='BloodPresDiastolic'>Presión Arterial Diastólica - (Número inferior) (mmHg)</label>
                <input type='number' name='bloodPressureDiastolic' id='BloodPresDiastolic' value={formData.bloodPressureDiastolic} onChange={handleChange} min="0" max="200" required/>
            </div>
            <div>
                <label htmlFor='Temperature'>Temperatura Corporal (C°)</label>
                <input type='number' name='temperature' id='Temperature' value={formData.temperature} onChange={handleChange} min="0" max="50" step="0.1" required/>
            </div>
            <div>
                <label htmlFor='Age'>Edad (Años)</label>
                <input type='number' name='age' id='Age' value={formData.age} onChange={handleChange} min="0" max="150" required/>
            </div>
            <div>
                <label htmlFor='Height'>Altura (Metros)</label>
                <input type='number' name='height' id='Height' value={formData.height} onChange={handleChange} step="0.01" min="0" max="3" required/>
            </div>
            <div>
                <label htmlFor='Weight'>Peso (Kilogramos)</label>
                <input type='number' name='weight' id='Weight' value={formData.weight} onChange={handleChange} step="0.1" min="0" max="500" required/>
            </div>
            <div>
                <label htmlFor='RespiratoryRate'>Frecuencia Respiratoria (resp/min)</label>
                <input type='number' name='respiratoryRate' id='RespiratoryRate' value={formData.respiratoryRate} onChange={handleChange} min="0" max="150" required/>
            </div>
            <div>
                <label htmlFor='BloodType'>Tipo de Sangre</label>
                <select name='bloodType' id='BloodType' value={formData.bloodType} onChange={handleChange} required>
                    <option value={""}></option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                </select>
            </div>
            <div>
                <label htmlFor='HeartRate'>Frecuencia Cardíaca (lat/min)</label>
                <input type='number' name='heartRate' id='HeartRate' value={formData.heartRate} onChange={handleChange} min="0" max="300" required/>
            </div>
            <button type='submit' disabled={loading}>{loading ? 'Guardando...' : 'Guardar Información'}</button>
        </form>
    </div>
    )
}

export default MedCheck