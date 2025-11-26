import { useState, useEffect } from 'react';
import '../App.css';
import logo from '../assets/logoMedguide_transparent.png';

function HealthPlan(){
    const [medicalData, setMedicalData] = useState(null);
    const [healthPlans, setHealthPlans] = useState([]);
    const [symptoms, setSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMedicalData();
    }, []);

    const fetchMedicalData = async () => {
        try {
            console.log('Fetching medical data...');
            const response = await fetch('/api/medical-info/latest');
            const data = await response.json();
            
            console.log('Response status:', response.status);
            console.log('Response data:', data);
            
            if (response.ok && data && Object.keys(data).length > 0) {
                console.log('Medical data received:', data);
                setMedicalData(data);
                analyzeHealth(data);
                setLoading(false);
            } else {
                console.log('No valid data received');
                setError('No hay datos médicos registrados. Por favor, completa el formulario de chequeo médico.');
                setLoading(false);
            }
        } catch (err) {
            console.error('Error fetching medical data:', err);
            setError('Error al obtener datos médicos: ' + err.message);
            setLoading(false);
        }
    };

    const analyzeHealth = (data) => {
        const plans = [];
        const detectedSymptoms = [];

        // Análisis de Glucosa
        if (data.glucose < 70) {
            detectedSymptoms.push({
                parameter: 'Glucosa',
                level: 'CRÍTICO - Hipoglucemia',
                value: `${data.glucose} mg/dL`,
                symptoms: ['Temblores', 'Sudoración', 'Palpitaciones', 'Mareos', 'Confusión'],
                recommendations: ['Consumir azúcar o bebida azucarada inmediatamente', 'Buscar atención médica urgente', 'Descansar y mantenerse hidratado'],
                risk: 'ALTO'
            });
        } else if (data.glucose >= 100 && data.glucose <= 125) {
            detectedSymptoms.push({
                parameter: 'Glucosa',
                level: 'PREDIABETES',
                value: `${data.glucose} mg/dL`,
                symptoms: ['Sed excesiva', 'Mayor frecuencia urinaria', 'Fatiga', 'Visión borrosa'],
                recommendations: ['Reducir ingesta de azúcares y carbohidratos refinados', 'Aumentar actividad física (30 min/día)', 'Consultar endocrinólogo', 'Monitorear glucosa regularmente'],
                risk: 'MEDIO'
            });
            plans.push({
                name: 'Plan de Control de Glucosa - 4 Semanas',
                duration: 'Semanal',
                activities: [
                    'Día 1-3: Medir glucosa en ayunas',
                    'Día 4-7: Ejercicio cardiovascular 30 min/día',
                    'Reducir bebidas azucaradas y postres',
                    'Aumentar consumo de verduras y proteínas'
                ]
            });
        } else if (data.glucose > 125) {
            detectedSymptoms.push({
                parameter: 'Glucosa',
                level: 'DIABETES - Valores Elevados',
                value: `${data.glucose} mg/dL`,
                symptoms: ['Sed excesiva', 'Micción frecuente', 'Fatiga crónica', 'Infecciones recurrentes', 'Visión borrosa'],
                recommendations: ['Consultar médico inmediatamente', 'Iniciar tratamiento farmacológico si es necesario', 'Cambios dietéticos severos', 'Monitoreo diario de glucosa'],
                risk: 'CRÍTICO'
            });
            plans.push({
                name: 'Plan de Gestión de Diabetes - Mensual',
                duration: 'Mensual',
                activities: [
                    'Semana 1: Consulta con endocrinólogo',
                    'Semana 2: Iniciar dieta baja en carbohidratos',
                    'Semana 3-4: Ejercicio regular y monitoreo diario',
                    'Visitas de seguimiento cada 2 semanas'
                ]
            });
        }

        // Análisis de Oxigenación (SpO₂)
        if (data.oxygen_blood < 90) {
            detectedSymptoms.push({
                parameter: 'Saturación de Oxígeno (SpO₂)',
                level: data.oxygen_blood < 75 ? 'CRÍTICO - Hipoxemia Grave' : 'ALERTA - Hipoxemia',
                value: `${data.oxygen_blood}%`,
                symptoms: ['Falta de aire', 'Fatiga', 'Mareos', 'Confusión', 'Color azulado en piel'],
                recommendations: data.oxygen_blood < 75 ? 
                    ['Buscar atención médica de emergencia', 'Oxígeno suplementario requerido', 'No realizar actividad física'] :
                    ['Descansar en posición sentada', 'Respirar profundamente', 'Consultar médico', 'Evitar actividad extenuante'],
                risk: data.oxygen_blood < 75 ? 'CRÍTICO' : 'ALTO'
            });
        }

        // Análisis de Presión Arterial
        if (data.blood_pressure >= 130) {
            const level = data.blood_pressure >= 180 ? 'EMERGENCIA - Crisis Hipertensiva' : 
                         data.blood_pressure >= 140 ? 'HIPERTENSIÓN Etapa 2' : 'HIPERTENSIÓN Etapa 1';
            detectedSymptoms.push({
                parameter: 'Presión Arterial',
                level: level,
                value: `${data.blood_pressure} mmHg`,
                symptoms: ['A menudo asintomática (asesino silencioso)', 'Cefalea', 'Visión borrosa', 'Dolor torácico en casos severos'],
                recommendations: data.blood_pressure >= 180 ?
                    ['EMERGENCIA: Buscar atención médica inmediata', 'Permanecer acostado y calmado', 'No automedicarse'] :
                    ['Reducir ingesta de sal a <2.3g/día', 'Aumentar ejercicio aeróbico', 'Reducir estrés', 'Iniciar medicación si médico lo indica'],
                risk: data.blood_pressure >= 180 ? 'CRÍTICO' : 'ALTO'
            });
            plans.push({
                name: 'Plan de Control de Presión Arterial - 8 Semanas',
                duration: 'Mensual',
                activities: [
                    'Semana 1-2: Mediciones diarias de PA',
                    'Semana 3-4: Dieta DASH (baja en sodio)',
                    'Semana 5-8: Ejercicio 150 min/semana + técnicas de relajación',
                    'Consulta médica para ajustar medicamentos si es necesario'
                ]
            });
        }

        // Análisis de Frecuencia Cardíaca
        if (data.heart_rate > 100) {
            detectedSymptoms.push({
                parameter: 'Frecuencia Cardíaca',
                level: 'TAQUICARDIA',
                value: `${data.heart_rate} lpm`,
                symptoms: ['Palpitaciones', 'Ansiedad', 'Fatiga', 'Mareos en algunos casos'],
                recommendations: ['Reducir cafeína y estrés', 'Aumentar ejercicio cardiovascular gradualmente', 'Técnicas de relajación (meditación)', 'Consultar cardiólogo si persiste'],
                risk: 'MEDIO'
            });
            plans.push({
                name: 'Plan de Estabilidad Cardíaca - 3 Semanas',
                duration: 'Semanal',
                activities: [
                    'Día 1-3: Eliminar cafeína y bebidas energéticas',
                    'Día 4-7: Meditación 10 min/día',
                    'Semana 2-3: Ejercicio aeróbico moderado 30 min/día',
                    'Monitoreo diario de FC en reposo'
                ]
            });
        } else if (data.heart_rate < 60 && data.age < 50) {
            detectedSymptoms.push({
                parameter: 'Frecuencia Cardíaca',
                level: 'BRADICARDIA',
                value: `${data.heart_rate} lpm`,
                symptoms: ['Fatiga', 'Mareos', 'Síncope en casos severos'],
                recommendations: ['Evaluar si hay síntomas asociados', 'Consultar cardiólogo para descartar problemas de conducción', 'Monitoreo continuo'],
                risk: 'BAJO-MEDIO'
            });
        }

        // Análisis de Temperatura
        if (data.temperature >= 38) {
            const level = data.temperature >= 41 ? 'CRÍTICO - Hipertermia Peligrosa' : 
                         data.temperature >= 39.5 ? 'FIEBRE ALTA' : 'FIEBRE';
            detectedSymptoms.push({
                parameter: 'Temperatura Corporal',
                level: level,
                value: `${data.temperature}°C`,
                symptoms: ['Escalofríos', 'Malestar general', 'Dolor corporal', 'Sudoración en niveles altos'],
                recommendations: data.temperature >= 41 ?
                    ['EMERGENCIA: Ir a urgencias inmediatamente', 'Aplicar compresas frías', 'Hidratación inmediata'] :
                    ['Reposo en cama', 'Hidratación abundante', 'Paracetamol o ibuprofeno según indicaciones', 'Consultar médico si dura >3 días'],
                risk: data.temperature >= 41 ? 'CRÍTICO' : 'ALTO'
            });
        } else if (data.temperature < 35) {
            detectedSymptoms.push({
                parameter: 'Temperatura Corporal',
                level: 'HIPOTERMIA - Riesgo Vital',
                value: `${data.temperature}°C`,
                symptoms: ['Confusión', 'Temblores', 'Pulso débil', 'Dificultad para hablar'],
                recommendations: ['Buscar atención médica de emergencia', 'Calentar gradualmente el cuerpo', 'Evitar movimientos bruscos'],
                risk: 'CRÍTICO'
            });
        }

        // Análisis de Frecuencia Respiratoria
        if (data.respiratory_rate > 20) {
            detectedSymptoms.push({
                parameter: 'Frecuencia Respiratoria',
                level: 'TAQUIPNEA - Respiración Acelerada',
                value: `${data.respiratory_rate} resp/min`,
                symptoms: ['Dificultad para respirar', 'Falta de aire', 'Ansiedad', 'Cansancio'],
                recommendations: ['Descansar en ambiente tranquilo', 'Técnicas de respiración lenta y profunda', 'Consultar médico para descartar infecciones respiratorias', 'Evitar contaminación ambiental'],
                risk: 'MEDIO'
            });
            plans.push({
                name: 'Plan de Salud Respiratoria - 2 Semanas',
                duration: 'Semanal',
                activities: [
                    'Ejercicios de respiración diafragmática 10 min/día',
                    'Evitar alérgenos y aire contaminado',
                    'Hidratación abundante',
                    'Consulta con neumólogo si síntomas persisten'
                ]
            });
        }

        // Análisis de IMC (usando altura y peso)
        if (data.height && data.weight) {
            const imc = data.weight / (data.height * data.height);
            let imcStatus = '';
            if (imc < 18.5) imcStatus = 'BAJO PESO';
            else if (imc < 25) imcStatus = 'PESO NORMAL';
            else if (imc < 30) imcStatus = 'SOBREPESO';
            else imcStatus = 'OBESIDAD';

            if (imcStatus !== 'PESO NORMAL') {
                detectedSymptoms.push({
                    parameter: 'Índice de Masa Corporal (IMC)',
                    level: imcStatus,
                    value: `${imc.toFixed(1)} kg/m²`,
                    symptoms: ['Fatiga', 'Dificultad para respirar con actividad', 'Problemas articulares'],
                    recommendations: imcStatus === 'SOBREPESO' || imcStatus === 'OBESIDAD' ?
                        ['Crear déficit calórico de 500 cal/día', 'Ejercicio 300 min/semana', 'Dieta rica en proteína y fibra', 'Consultar nutricionista'] :
                        ['Aumentar ingesta calórica saludable', 'Incluir proteína en cada comida', 'Consultar nutricionista'],
                    risk: imcStatus === 'OBESIDAD' ? 'ALTO' : 'MEDIO'
                });

                if (imcStatus === 'SOBREPESO' || imcStatus === 'OBESIDAD') {
                    plans.push({
                        name: `Plan de Pérdida de Peso Saludable - ${imcStatus === 'OBESIDAD' ? '12 Semanas' : '8 Semanas'}`,
                        duration: 'Mensual',
                        activities: [
                            'Dieta balanceada con déficit calórico moderado',
                            'Ejercicio aeróbico 3x/semana',
                            'Entrenamiento de fuerza 2x/semana',
                            'Seguimiento nutricional y médico'
                        ]
                    });
                }
            }
        }

        setHealthPlans(plans);
        setSymptoms(detectedSymptoms);
    };

    if (loading) return <div className="loading">Cargando datos médicos...</div>;

    return(
        <div className="health-plan-container">
            <img src={logo} alt='Mediguide Logo' style={{height: '60px', width: 'auto'}}></img>
            <h1>Nuestros Planes de Salud Personalizados</h1>
            <p style={{fontStyle: 'italic', color: '#666'}}>⚠️ Descargo de responsabilidad: Esta información es educativa y NO reemplaza la consulta médica profesional. Consulta a un médico para diagnóstico y tratamiento.</p>

            {error && <div style={{color: 'red', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '5px'}}>{error}</div>}

            {medicalData && (
                <>
                    {/* Datos Médicos Actuales */}
                    <section style={{backgroundColor: '#284259ff', padding: '15px', borderRadius: '8px', marginBottom: '20px'}}>
                        <h2>📊 Tus Datos Médicos Actuales</h2>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px'}}>
                            <p><strong>Glucosa:</strong> {medicalData.glucose !== null && medicalData.glucose !== undefined ? `${medicalData.glucose} mg/dL` : 'N/A'}</p>
                            <p><strong>SpO₂:</strong> {medicalData.oxygen_blood !== null && medicalData.oxygen_blood !== undefined ? `${medicalData.oxygen_blood}%` : 'N/A'}</p>
                            <p><strong>Presión Arterial:</strong> {medicalData.blood_pressure !== null && medicalData.blood_pressure !== undefined ? `${medicalData.blood_pressure} mmHg` : 'N/A'}</p>
                            <p><strong>Frecuencia Cardíaca:</strong> {medicalData.heart_rate !== null && medicalData.heart_rate !== undefined ? `${medicalData.heart_rate} lpm` : 'N/A'}</p>
                            <p><strong>Temperatura:</strong> {medicalData.temperature !== null && medicalData.temperature !== undefined ? `${medicalData.temperature}°C` : 'N/A'}</p>
                            <p><strong>Frecuencia Respiratoria:</strong> {medicalData.respiratory_rate !== null && medicalData.respiratory_rate !== undefined ? `${medicalData.respiratory_rate} resp/min` : 'N/A'}</p>
                            <p><strong>Edad:</strong> {medicalData.age !== null && medicalData.age !== undefined ? `${medicalData.age} años` : 'N/A'}</p>
                            <p><strong>Altura:</strong> {medicalData.height !== null && medicalData.height !== undefined ? `${medicalData.height} m` : 'N/A'}</p>
                            <p><strong>Peso:</strong> {medicalData.weight !== null && medicalData.weight !== undefined ? `${medicalData.weight} kg` : 'N/A'}</p>
                            <p><strong>Tipo de Sangre:</strong> {medicalData.blood_type !== null && medicalData.blood_type !== undefined ? medicalData.blood_type : 'N/A'}</p>
                        </div>
                    </section>

                    {/* Síntomas y Alertas */}
                    {symptoms.length > 0 && (
                        <section style={{marginBottom: '20px'}}>
                            <h2>⚠️ Hallazgos Detectados ({symptoms.length})</h2>
                            {symptoms.map((item, index) => (
                                <div key={index} style={{
                                    border: `3px solid ${item.risk === 'CRÍTICO' ? '#d32f2f' : item.risk === 'ALTO' ? '#f57c00' : '#fbc02d'}`,
                                    padding: '15px',
                                    marginBottom: '15px',
                                    borderRadius: '8px',
                                    backgroundColor: item.risk === 'CRÍTICO' ? '#ffebee' : item.risk === 'ALTO' ? '#fff3e0' : '#fffde7',
                                    color: '#000000'
                                }}>
                                    <h3>{item.parameter} - {item.level}</h3>
                                    <p><strong>Valor:</strong> {item.value}</p>
                                    <p><strong>Posibles síntomas:</strong> {item.symptoms.join(', ')}</p>
                                    <p><strong>Recomendaciones:</strong></p>
                                    <ul>
                                        {item.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Planes de Salud */}
                    {healthPlans.length > 0 && (
                        <section>
                            <h2>📅 Planes de Salud Recomendados ({healthPlans.length})</h2>
                            {healthPlans.map((plan, index) => (
                                <section key={index} style={{
                                    backgroundColor: '#e8f5e9',
                                    border: '2px solid #4caf50',
                                    padding: '15px',
                                    marginBottom: '15px',
                                    borderRadius: '8px',
                                    color: '#000000'
                                }}>
                                    <h3>{plan.name}</h3>
                                    <p><strong>Duración:</strong> {plan.duration}</p>
                                    <p><strong>Actividades recomendadas:</strong></p>
                                    <ul>
                                        {plan.activities.map((activity, i) => <li key={i}>{activity}</li>)}
                                    </ul>
                                </section>
                            ))}
                        </section>
                    )}

                    {symptoms.length === 0 && (
                        <section style={{backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '8px', textAlign: 'center'}}>
                            <h2>✅ ¡Excelente!</h2>
                            <p>Tus parámetros biométricos están dentro de los rangos normales. Mantén estos hábitos saludables.</p>
                            <p>Recomendaciones generales:</p>
                            <ul>
                                <li>Ejercicio regular: 150 min/semana de actividad cardiovascular</li>
                                <li>Dieta equilibrada: variada en verduras, frutas, proteína magra</li>
                                <li>Sueño: 7-9 horas diarias</li>
                                <li>Estrés: Técnicas de relajación y meditación</li>
                                <li>Revisiones: Chequeo médico anual</li>
                            </ul>
                        </section>
                    )}
                </>
            )}
        </div>
    )
}

export default HealthPlan