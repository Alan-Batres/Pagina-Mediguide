import '../App.css'

function MedCheck(){
    return(
    <div>
        <p>CHEQUEO MEDICO</p>
        <h2>MEDIGUIDE OFRECE GUIAS MEDICAS EN BASE A LA SALUD DE NUESTROS USUARIOS</h2>
        <form>
            <div>
                <label for='Glucose'>Nivel de Glucosa (mg/dl)</label>
                <input type='number' name='Glucose' id='Glucose'/>
            </div>
            <div>
                <label for='OxigenBlood'>Oxigenación de la sangre (%)</label>
                <input type='number' name='OxigenBlood' id='OxigenBlood'/>
            </div>
            <div>
                <label for='BloodPres'>Presion Arterial (mmHg)</label>
                <input type='number' name='Bloodpres' id='Bloodpres'/>
            </div>
            <div>
                <label for='Temperature'>Temperatura Corporal (C°)</label>
                <input type='number' name='Temperature' id='Temperature'/>
            </div>
            <div>
                <label for='Age'>Edad (Años)</label>
                <input type='number' name='Age' id='Age'/>
            </div>
            <div>
                <label for='Height'>Altura (Metros)</label>
                <input type='number' name='Height' id='Height'/>
            </div>
            <div>
                <label for='Weight'>Peso (Kilogramos)</label>
                <input type='number' name='Weight' id='Weight'/>
            </div>
            <div>
                <label for='RespiratoryRate'>Frecuencia Respiratoria (resp/min)</label>
                <input type='number' name='RespiratoryRate' id='RespiratoryRate'/>
            </div>
            <div>
                <label for='BloodType'>Tipo de Sangre</label>
                <input type='text' name='Bloodtype' id='Bloodtype' maxLength={2}/> 
            </div>
            <div>
                <label for='HeartRate'>Frecuencia Cardíaca (lat/min)</label>
                <input type='number' name='HeartRate' id='HeartRate'/>
            </div>
        </form>
    </div>
    )
}

export default MedCheck