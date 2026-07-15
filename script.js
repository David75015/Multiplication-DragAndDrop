const numbers = document.querySelectorAll(".number");

const dropzones = document.querySelectorAll(".dropzone");

const checkButton = document.getElementById("checkButton");

const resetButton = document.getElementById("resetButton");

const message = document.getElementById("message");


let draggedNumber = null;


/* =========================
   DRAG DES CHIFFRES
========================= */

numbers.forEach(number => {

    number.addEventListener("dragstart", () => {

        draggedNumber = number.textContent;

    });

});


/* =========================
   DROP ZONES
========================= */

dropzones.forEach(dropzone => {


    /* AUTORISER LE DROP */

    dropzone.addEventListener("dragover", event => {

        event.preventDefault();

    });


    /* ENTREE DANS LA CASE */

    dropzone.addEventListener("dragenter", () => {

        dropzone.classList.add("drag-over");

    });


    /* SORTIE DE LA CASE */

    dropzone.addEventListener("dragleave", () => {

        dropzone.classList.remove("drag-over");

    });


    /* DEPOT DU CHIFFRE */

    dropzone.addEventListener("drop", event => {

        event.preventDefault();

        dropzone.textContent = draggedNumber;

        dropzone.classList.remove("drag-over");

        message.textContent = "";

        message.className = "";

    });

});


/* =========================
   RECUPERER UN NOMBRE
========================= */

function getNumber(lineId) {
    const line = document.getElementById(lineId);
    const boxes = line.querySelectorAll(".box");

    let number = "";

    boxes.forEach(box => {
        number += box.textContent || "0";
    });

    return Number(number);
}


/* =========================
   VERIFIER L'ADDITION
========================= */

checkButton.addEventListener("click", () => {

    const firstNumber = getNumber("firstNumber");

    const secondNumber = getNumber("secondNumber");

    const result = getNumber("result");


    /* CASES NON REMPLIES */

    if (
        firstNumber === null ||
        secondNumber === null ||
        result === null
    ) {

        message.textContent = "Incorrect ❌";

        message.className = "incorrect";

        return;

    }


    /* VERIFICATION */

    if (firstNumber + secondNumber === result) {

        message.textContent = "Bravo";

        message.className = "correct";

    } else {

        message.textContent = "Incorrect";

        message.className = "incorrect";

    }

});


/* =========================
   RESET
========================= */

resetButton.addEventListener("click", () => {

    dropzones.forEach(dropzone => {

        dropzone.textContent = "";

        dropzone.classList.remove("drag-over");

    });


    message.textContent = "";

    message.className = "";

    draggedNumber = null;

});

dropzones.forEach(dropzone => {
    dropzone.addEventListener("click", () => {
        dropzone.textContent = "";

        message.textContent = "";
        message.className = "";
    });
});

numbers.forEach(number => {
    number.addEventListener("dragstart", () => {
        draggedNumber = number.textContent;
        number.classList.add("dragging"); // Ajoute la classe pour le style grabbing
    });

    // Ajoute un écouteur pour dragend
    number.addEventListener("dragend", () => {
        number.classList.remove("dragging"); // Retire la classe à la fin du drag
    });
});