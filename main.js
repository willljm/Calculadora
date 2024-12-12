const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".btn");

let operacionEnCurso = false;

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const botonApretado = boton.textContent;

        if (boton.id === "c") {
            pantalla.textContent = "0";
            operacionEnCurso = false;
            return;
        }

        if (boton.id === "borrar") {
            if (pantalla.textContent.length === 1 || pantalla.textContent === "Error!") {
                pantalla.textContent = "0";
            } else {
                pantalla.textContent = pantalla.textContent.slice(0, -1);
            }
            return;
        }

        if (boton.id === "igual") {
            try {
                let expresion = pantalla.textContent;
                expresion = expresion
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/−/g, '-')
                    .replace(/%/g, '/100');
                
                const resultado = eval(expresion);
                
                pantalla.textContent = Number(resultado.toFixed(8)).toString();
                operacionEnCurso = true;
            } catch {
                pantalla.textContent = "Error!";
            }
            return;
        }

        if (pantalla.textContent === "0" || pantalla.textContent === "Error!" || operacionEnCurso) {
            if ("×÷+-".includes(botonApretado)) {
                if (pantalla.textContent === "Error!") {
                    pantalla.textContent = "0" + botonApretado;
                } else {
                    pantalla.textContent = pantalla.textContent + botonApretado;
                }
            } else {
                pantalla.textContent = botonApretado;
            }
            operacionEnCurso = false;
        } else {
            if (botonApretado === "." && pantalla.textContent.includes(".")) {
                return;
            }
            if ("×÷+-".includes(botonApretado) && "×÷+-".includes(pantalla.textContent.slice(-1))) {
                pantalla.textContent = pantalla.textContent.slice(0, -1) + botonApretado;
                return;
            }
            pantalla.textContent += botonApretado;
        }
    });
});