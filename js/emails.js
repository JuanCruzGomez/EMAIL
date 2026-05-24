document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Lógica del Formulario ---
    const form = document.getElementById('capture-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        const email = document.getElementById('email').value;
        
        // La URL de MailerLite que nos pasaste
        const mailerLiteUrl = "https://assets.mailerlite.com/jsonp/2371965/forms/188197334039922288/subscribe"; 

        // Creamos los datos en el formato de formulario que espera MailerLite
        const formData = new FormData();
        formData.append('fields[email]', email);

        try {
            // Enviamos la petición a MailerLite
            const response = await fetch(mailerLiteUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Necesario para evitar bloqueos de seguridad (CORS) con MailerLite
            });

            // Al usar 'no-cors', el navegador no nos permite leer la respuesta exacta, 
            // pero si la petición no va al "catch", significa que se envió correctamente.
            alert("¡Gracias por unirte al GSIX LAB! Tu cupón está en camino.");
            form.reset();

        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Hubo un problema al registrar tu email. Por favor, intentá de nuevo.");
        }
    });

    // --- 2. Lógica del Contador (Countdown) ---
    // (A partir de acá dejá tu código tal cual lo tenías...)

    // --- 2. Lógica del Contador (Countdown) ---
    // Configuramos la fecha límite sumando 5 días a la fecha actual para el ejemplo
    const dropDate = new Date();
    dropDate.setDate(dropDate.getDate() + 5);
    dropDate.setHours(dropDate.getHours() + 12);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const diff = dropDate - now;

        if (diff <= 0) {
            // El contador llegó a cero
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            return;
        }

        const d = Math.floor(diff / 1000 / 60 / 60 / 24);
        const h = Math.floor(diff / 1000 / 60 / 60) % 24;
        const m = Math.floor(diff / 1000 / 60) % 60;
        const s = Math.floor(diff / 1000) % 60;

        // Formatear para que siempre tenga 2 dígitos (ej: 05 en vez de 5)
        daysEl.innerText = d < 10 ? '0' + d : d;
        hoursEl.innerText = h < 10 ? '0' + h : h;
        minutesEl.innerText = m < 10 ? '0' + m : m;
        secondsEl.innerText = s < 10 ? '0' + s : s;
    }

    // Actualizar cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Llamada inicial
});