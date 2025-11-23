import '../App.css';

function UserInfo(){
    return(
    <div>
        <img src='Link de Prueba' alt='LOGO'></img>
        <h1>Mediguide</h1>
        <p>Donde la salud del usuario es nuestra prioridad</p>
        <form>
            <div>
                <label for='UserName'>Nombre de Usuario</label>
                <input type='text'name='UserName' id='UserName'/>
            </div>
            <div>
                <label for='Email'>Correo Electrónico</label>
                <input type='email' name='Email' id='Email'></input>
            </div>
            <div>
                <label for='Password'>Contraseña</label>
                <input type='password' name='Password' id='Password'></input>
            </div>
        </form>
        <a href='Link de Prueba'> Olvide mi Contraseña</a>
    </div>
    )
}

export default UserInfo