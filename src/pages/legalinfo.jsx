import '../App.css'
import logo from '../assets/logoMedguide_transparent.png'

function LegalInfo({ onClose }){
    return(
        <div className="legal-info-container">
            <div className="legal-info-header">
                <img src={logo} alt='Mediguide Logo'></img>
                <h1>Información Legal</h1>
                <button type='button' onClick={onClose} className="close-button">Cerrar</button>
            </div>

            <div className="legal-info-content">
                <section>
                    <h2>Descargo de Responsabilidad Fundamental</h2>
                    <p>
                        Este análisis es informativo y educativo, basado en la legislación pública federal de México. 
                        No constituye asesoría legal de ningún tipo. La legislación puede cambiar y su aplicación exacta depende 
                        de su caso particular (ej. si es un hospital, un consultorio, un blog de salud, etc.).
                    </p>
                    <p>
                        <strong>Es absolutamente indispensable que consulte a un abogado especialista en derecho sanitario 
                        y protección de datos antes de iniciar cualquier proyecto.</strong>
                    </p>
                </section>

                <section>
                    <h2>1. Regulación Sanitaria y Publicitaria (La más crítica)</h2>
                    <p>
                        El actor principal aquí es la COFEPRIS (Comisión Federal para la Protección contra Riesgos Sanitarios). 
                        Para la ley, su sitio web es considerado un medio de publicidad.
                    </p>
                    
                    <h3>A. Ley General de Salud (LGS)</h3>
                    <p>Esta es la ley marco. Establece que la publicidad de servicios de salud debe ser veraz y no inducir al error.</p>
                    <ul>
                        <li><strong>Artículo 300:</strong> Establece que la publicidad (en cualquier medio, incluido internet) no debe atribuir 
                        cualidades preventivas, terapéuticas, o rehabilitatorias a productos o servicios que no las tengan.</li>
                        <li><strong>Artículo 310:</strong> Indica que la publicidad de servicios de salud requiere autorización (Permiso de Publicidad) 
                        o aviso (Aviso de Publicidad) de la Secretaría de Salud (a través de COFEPRIS), según la naturaleza del servicio. 
                        Generalmente, los servicios de un consultorio médico requieren un Aviso de Publicidad, mientras que procedimientos más 
                        complejos o establecimientos como hospitales pueden requerir un Permiso de Publicidad.</li>
                    </ul>

                    <h3>B. Reglamento de la Ley General de Salud en Materia de Publicidad (RLGSMP)</h3>
                    <p>Este reglamento es el más importante para su sitio web. Detalla qué puede y qué no puede hacer.</p>
                    <ul>
                        <li><strong>Artículo 8:</strong> Exige que en la publicidad de servicios de salud prestados por profesionales (médicos) 
                        se incluya, de forma visual y clara, el nombre de la institución que expidió su título y su número de cédula profesional.</li>
                        <li><strong>Artículo 79:</strong> Esta es una lista de prohibiciones clave para la publicidad de servicios de salud:
                            <ul style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>
                                <li>No se pueden prometer resultados infalibles o "curas garantizadas".</li>
                                <li>No se puede exagerar las características del servicio.</li>
                                <li>No se pueden usar testimonios de pacientes (a menos que se sigan reglas muy específicas y se tenga permiso).</li>
                                <li>No se pueden ofrecer "consultas gratuitas" o servicios similares que promuevan el consumo de un tratamiento.</li>
                                <li>No se debe usar lenguaje ambiguo o técnico que el público general no pueda entender.</li>
                            </ul>
                        </li>
                        <li><strong>Artículos 118 y 119:</strong> Detallan el proceso para solicitar un Permiso de Publicidad o presentar un 
                        Aviso de Publicidad ante COFEPRIS. Su sitio web no puede estar en línea hasta que este trámite esté completado y 
                        aprobado (en el caso del permiso) o presentado (en el caso del aviso).</li>
                    </ul>
                    <p><strong>Implicación clave:</strong> Su sitio web es publicidad. Debe tramitar un Aviso o Permiso de Publicidad ante 
                    COFEPRIS y todo el contenido debe adherirse al RLGSMP, incluyendo la visibilidad de las cédulas profesionales.</p>
                </section>

                <section>
                    <h2>2. Protección de Datos Personales (INAI)</h2>
                    <p>
                        Si su sitio web tiene un formulario de contacto, un sistema de citas, o almacena cualquier dato de un paciente 
                        (nombre, email, teléfono, historial), está sujeto a esta ley. El actor principal es el INAI (Instituto Nacional de 
                        Transparencia, Acceso a la Información y Protección de Datos Personales).
                    </p>
                    
                    <h3>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</h3>
                    <ul>
                        <li>Los datos de salud son considerados de la categoría más alta de protección.</li>
                        <li><strong>Artículo 3, Fracción VI:</strong> Define los "Datos personales sensibles". Estos son aquellos que 
                        "puedan dar origen a discriminación... como el origen racial o étnico, estado de salud presente y futuro, información genética..."</li>
                        <li><strong>Artículo 9:</strong> Establece que el tratamiento de datos personales sensibles requiere el consentimiento 
                        expreso y por escrito del titular (el paciente), mediante su firma autógrafa, electrónica o cualquier mecanismo de 
                        autenticación. Un simple "Acepto" en una casilla puede no ser suficiente; a menudo se requiere un acto más explícito.</li>
                        <li><strong>Artículos 15 y 16:</strong> Obligan al responsable (usted/su consultorio) a poner a disposición del titular 
                        el Aviso de Privacidad. Este documento debe estar visible y accesible en su sitio web antes de que el usuario ingrese cualquier dato.</li>
                        <li><strong>Artículo 19:</strong> Le obliga a mantener medidas de seguridad administrativas, técnicas y físicas 
                        (ej. encriptación SSL, bases de datos seguras) para proteger los datos contra daño, pérdida, alteración o acceso no autorizado.</li>
                    </ul>
                    <p><strong>Implicación clave:</strong> Necesita un Aviso de Privacidad robusto y específico para datos de salud, un mecanismo 
                    para obtener consentimiento explícito (no tácito) y medidas de ciberseguridad fuertes para proteger esa información.</p>
                </section>

                <section>
                    <h2>3. Regulación de la Práctica Profesional y Telemedicina</h2>
                    <p>Su sitio web no solo publicita, sino que representa el ejercicio de una profesión.</p>
                    
                    <h3>A. Ley Reglamentaria del Artículo 5o. Constitucional (Ley de Profesiones)</h3>
                    <ul>
                        <li><strong>Artículo 25:</strong> Establece que para ejercer una profesión (como la medicina) se requiere estar en 
                        pleno goce de derechos civiles y poseer un título legalmente expedido y registrado.</li>
                    </ul>
                    <p><strong>Implicación:</strong> Su sitio debe mostrar de forma prominente la cédula profesional (y de especialidad, si aplica) 
                    de todos los médicos que ofrezcan servicios. Esto se alinea con el Artículo 8 del RLGSMP.</p>

                    <h3>B. Normas Oficiales Mexicanas (NOMs)</h3>
                    <p>Si su sitio web ofrece servicios de telemedicina o maneja expedientes:</p>
                    <ul>
                        <li><strong>NOM-004-SSA3-2012, Del expediente clínico:</strong> Define la estructura y titularidad del expediente clínico. 
                        Aunque el paciente es el titular, el médico tiene la obligación de resguardarlo por 5 años.</li>
                        <li><strong>NOM-024-SSA3-2012, Sistemas de Información de Registro Electrónico para la Salud (SIRES):</strong> Si su sitio web 
                        se conecta a un sistema de expedientes clínicos electrónicos, debe asegurarse de que ese sistema cumpla con esta NOM, que 
                        regula la seguridad, confidencialidad e interoperabilidad de los datos.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Protección al Consumidor (PROFECO)</h2>
                    <p>Si a través de su sitio web se realiza el pago de consultas o servicios, también entra en juego la Ley Federal de 
                    Protección al Consumidor (LFPC).</p>
                    <ul>
                        <li><strong>Artículo 7:</strong> Obliga a que toda información sobre bienes y servicios sea veraz, comprobable, clara 
                        y exenta de textos engañosos.</li>
                        <li><strong>Artículo 32:</strong> Prohíbe la publicidad engañosa. En el contexto médico, esto refuerza las prohibiciones 
                        de COFEPRIS sobre prometer resultados.</li>
                        <li><strong>Artículos 76 Bis:</strong> Regula los derechos de los consumidores en transacciones efectuadas por medios 
                        electrónicos (e-commerce). Obliga a:
                            <ul style={{marginTop: '0.5rem', marginBottom: '0.5rem'}}>
                                <li>Usar información confidencial y segura para el consumidor (se alinea con LFPDPPP).</li>
                                <li>Proporcionar información clara y precisa sobre el servicio y los costos totales.</li>
                                <li>Tener Términos y Condiciones claros y accesibles.</li>
                            </ul>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>Checklist Práctico: Lo que debe hacer</h2>
                    <p>Basado en la ley, esto es lo que implica operativamente:</p>
                    
                    <h3>1. Contratar Asesoría Legal</h3>
                    <p>Un abogado especializado en derecho sanitario y protección de datos es su primer paso.</p>

                    <h3>2. Trámite ante COFEPRIS</h3>
                    <ul>
                        <li>Preparar su proyecto de sitio web (el "storyboard" o diseño de lo que dirá).</li>
                        <li>Llenar los formatos correspondientes para un Aviso de Publicidad (más común para consultorios) o un 
                        Permiso de Publicidad (para servicios más complejos).</li>
                        <li>Incluir las Cédulas Profesionales de todos los médicos en el trámite.</li>
                        <li>No lanzar el sitio hasta tener la respuesta o el acuse de COFEPRIS.</li>
                    </ul>

                    <h3>3. Elaboración de Documentos Legales</h3>
                    <ul>
                        <li><strong>Aviso de Privacidad</strong> (Integral y Corto): Redactado por un experto, específico para "datos sensibles 
                        de salud" y que explique cómo se obtendrá el consentimiento expreso.</li>
                        <li><strong>Términos y Condiciones del Servicio:</strong> Especialmente si se agendan o pagan citas en línea.</li>
                    </ul>

                    <h3>4. Diseño y Contenido Web (Revisión Legal)</h3>
                    <ul>
                        <li><strong>Visibilidad de Cédulas:</strong> El nombre del médico, la universidad y la cédula profesional deben ser fáciles de encontrar.</li>
                        <li><strong>Contenido Veraz:</strong> Todo el contenido debe ser informativo, científico y nunca prometer resultados 
                        ("le garantizamos", "cura definitiva").</li>
                        <li><strong>Botones de Consentimiento:</strong> Implementar un mecanismo (como un checkbox obligatorio antes de enviar un 
                        formulario) donde el usuario declare haber leído y aceptado el Aviso de Privacidad.</li>
                    </ul>

                    <h3>5. Seguridad Técnica (Ciberseguridad)</h3>
                    <ul>
                        <li><strong>Certificado SSL:</strong> Que su sitio opere bajo https://.</li>
                        <li><strong>Base de Datos Segura:</strong> Asegurarse de que la base de datos donde se guardan los contactos o citas 
                        esté encriptada y protegida contra accesos no autorizados.</li>
                    </ul>
                </section>

                <section>
                    <h2>Conclusión</h2>
                    <p>
                        Crear un sitio web médico en México es un proyecto de alto rigor legal, pero hacerlo correctamente protege a sus pacientes, 
                        le da seriedad a su práctica y le evita sanciones severas por parte de COFEPRIS o el INAI.
                    </p>
                </section>
            </div>
        </div>
    )
}

export default LegalInfo
