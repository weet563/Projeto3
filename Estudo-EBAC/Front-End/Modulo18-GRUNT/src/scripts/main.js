document.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('form-sorteador').addEventListener('submit', (evento)=> {
        evento.preventDefault();
        let numeroMaximo = document.getElementById('numero-max').value;
        numeroMaximo = parseInt(numeroMaximo);

        let numeroAleatorio = Math.random();
        let numeroFinal = numeroAleatorio * numeroMaximo;
        numeroFinal = Math.round(numeroFinal);
        console.log(numeroFinal);

            if (numeroFinal == 0) {
                document.getElementById('resultado-valor').innerText = 'Tente novamente';
            } else {
                document.getElementById('resultado-valor').innerText = numeroFinal;
            }
        document.querySelector('.resultado').style.display = 'block'; 
    })
})