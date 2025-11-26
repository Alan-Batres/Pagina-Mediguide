import { useState } from 'react'
import '../App.css'

function MedCheck(){
    const [formData, setFormData] = useState({
        glucose: '',
        oxygenBlood: '',
        bloodPressure: '',
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
            const response = await fetch('/api/medical-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('¡Información guardada exitosamente!');
                // Reset form
                setFormData({
                    glucose: '',
                    oxygenBlood: '',
                    bloodPressure: '',
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
                <input type='number' name='glucose' id='Glucose' value={formData.glucose} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor='OxigenBlood'>Oxigenación de la sangre (%)</label>
                <input type='number' name='oxygenBlood' id='OxigenBlood' value={formData.oxygenBlood} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor='BloodPres'>Presion Arterial (mmHg)</label>
                <input type='number' name='bloodPressure' id='Bloodpres' value={formData.bloodPressure} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor='Temperature'>Temperatura Corporal (C°)</label>
                <input type='number' name='temperature' id='Temperature' value={formData.temperature} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor='Age'>Edad (Años)</label>
                <input type='number' name='age' id='Age' value={formData.age} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor='Height'>Altura (Metros)</label>
                <input type='number' name='height' id='Height' value={formData.height} onChange={handleChange} step="0.01" required/>
            </div>
            <div>
                <label htmlFor='Weight'>Peso (Kilogramos)</label>
                <input type='number' name='weight' id='Weight' value={formData.weight} onChange={handleChange} step="0.1" required/>
            </div>
            <div>
                <label htmlFor='RespiratoryRate'>Frecuencia Respiratoria (resp/min)</label>
                <input type='number' name='respiratoryRate' id='RespiratoryRate' value={formData.respiratoryRate} onChange={handleChange} required/>
            </div>
            <div>
                <label htmlFor='BloodType'>Tipo de Sangre</label>
                <input type='text' name='bloodType' id='Bloodtype' value={formData.bloodType} onChange={handleChange} maxLength={2} required/> 
            </div>
            <div>
                <label htmlFor='HeartRate'>Frecuencia Cardíaca (lat/min)</label>
                <input type='number' name='heartRate' id='HeartRate' value={formData.heartRate} onChange={handleChange} required/>
            </div>
            <button type='submit' disabled={loading}>{loading ? 'Guardando...' : 'Guardar Información'}</button>
        </form>
    </div>
    )
}

export default MedCheck