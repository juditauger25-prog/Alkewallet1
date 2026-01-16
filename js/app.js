const usuarioCorrecto = "admin";
const passwordCorrecta = "1234";

function validarLogin() {

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    if (usuario === usuarioCorrecto && password === passwordCorrecta) {
        document.getElementById("mensaje").innerText = "Acceso permitido";
        window.location.assign("./menu.html");

        return false;
    } else {
        document.getElementById("mensaje").innerText =
            "Usuario o contraseña incorrectos";
        return false;
    }
}



function irDepositar() {
    window.location.href = "deposit.html";

}
function irEnviar() {
    window.location.href = "sendmoney.html";
}

function irTransacciones() {
    window.location.href = "transactions.html";
}


function cerrarSesion() {
    localStorage.clear();
    window.location.href = "login.html";
}

if (localStorage.getItem("saldo") === null) {
    localStorage.setItem("saldo", "0");
}


function mostrarSaldo() {
    const saldo = localStorage.getItem("saldo");
    const spanSaldo = document.getElementById("saldo");
    if (spanSaldo) {
        spanSaldo.innerText = saldo;
    }
}

function depositar() {
    const montoInput = document.getElementById("monto");
    const monto = parseInt(montoInput.value);

    if (isNaN(monto) || monto <= 0) {
        alert("Ingrese un monto válido");
        return;
    }

    let saldoActual = parseInt(localStorage.getItem("saldo"));
    saldoActual += monto;

    localStorage.setItem("saldo", saldoActual.toString());

    montoInput.value = "";
    mostrarSaldo();
}
function volverMenu() {
    window.location.href = "menu.html";
}
document.addEventListener("DOMContentLoaded", mostrarSaldo);


function obtenerContactos() {
    const contactos = localStorage.getItem("contactos");
    return contactos ? JSON.parse(contactos) : [];
}


function guardarContactos(contactos) {
    localStorage.setItem("contactos", JSON.stringify(contactos));
}


function agregarContacto() {
    const nombre = document.getElementById("nombre").value.trim();
    const cuenta = document.getElementById("cuenta").value.trim();
    const montos = document.getElementById("montos").value.trim();

    if (nombre === "" ||  cuenta === "" || montos === "") {
        alert("Complete todos los campos");
        return;
    }

    const contactos = obtenerContactos();

    contactos.push({ nombre, cuenta, montos });

    guardarContactos(contactos);

    document.getElementById("nombre").value = "";
    document.getElementById("cuenta").value = "";
    document.getElementById("montos").value = "";

    mostrarContactos();
}


function mostrarContactos() {
    const lista = document.getElementById("listaContactos");
    if (!lista) return;

    lista.innerHTML = "";

    const contactos = obtenerContactos();

    contactos.forEach((contacto, index) => {
        const li = document.createElement("li");
        li.textContent = `${contacto.nombre} - Cuenta: ${contacto.cuenta} - $${contacto.montos}`;
        lista.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", mostrarContactos);