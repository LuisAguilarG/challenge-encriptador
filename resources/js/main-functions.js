let $text_input = document.querySelector("#text-input");
let $encrypt_button = document.querySelector("#encrypt-button");
let $decrypt_button = document.querySelector("#decrypt-button");
let $system_output = document.querySelector("#system-output");


$encrypt_button.addEventListener("click", encrypt);
$decrypt_button.addEventListener("click", decrypt);


function isValidInput() {
    let expresion = new RegExp(/^[a-z\s\u00f1]*$/, 'gm'); 

    if (expresion.test($text_input.value) && $text_input.value != "") {
        return true;
    } else {
        return false;
    }
}

function encrypt() {
    if (isValidInput()) {
        let originalInput = $text_input.value.toString();
        let modifiedInput = "";

        /* Solución 1: dependiente del órden de los "replace". Válido para este caso de uso, pero no para otros más complejos. 
        Si se cambia el órden de remplazo de las vocales de "e,i,a,o,u" a uno como "a,e,i,o,u", se terminan "retroalimentando" entre sí y dan un resultado incorrecto.  */
        /*    
        originalInput = originalInput.replace(/e/g, "enter");
        originalInput = originalInput.replace(/i/g, "imes");
        originalInput = originalInput.replace(/a/g, "ai");
        originalInput = originalInput.replace(/o/g, "ober");
        originalInput = originalInput.replace(/u/g, "ufat"); 
        */


        /* Solución 2: generalización. Es válido para más casos de uso y no afecta el órden de remplazo.  */
        for (let i = 0; i < originalInput.length; i++) {
            if ("aeiou".includes(originalInput.charAt(i))) { // Si es vocal
                if (originalInput.charAt(i) == "a") {
                    modifiedInput += "ai";
                } else if (originalInput.charAt(i) == "e") {
                    modifiedInput += "enter";
                } else if (originalInput.charAt(i) == "i") {
                    modifiedInput += "imes";
                } else if (originalInput.charAt(i) == "o") {
                    modifiedInput += "ober";
                } else if (originalInput.charAt(i) == "u") {
                    modifiedInput += "ufat";
                }
            } else { // Si es consonante o un espacio vacío
                modifiedInput += originalInput.charAt(i);
            }
        }
        /* Alternativa para remover los nodos */
        /* 
        $system_output.removeChild(document.querySelector("#missing-data"));
        $system_output.removeChild(document.querySelector("#message-output-1"));
        $system_output.removeChild(document.querySelector("#message-output-2"));
        */
        $system_output.innerHTML = "";
        generateOutput(modifiedInput);
    } else {
        showAlert();
    }

}


function decrypt() {
    if (isValidInput()) {
        let originalInput = $text_input.value.toString();
        let modifiedInput = originalInput;
        
        modifiedInput = modifiedInput.replace(/enter/g, "e");
        modifiedInput = modifiedInput.replace(/imes/g, "i");
        modifiedInput = modifiedInput.replace(/ai/g, "a");
        modifiedInput = modifiedInput.replace(/ober/g, "o");
        modifiedInput = modifiedInput.replace(/ufat/g, "u");

        $system_output.innerHTML = "";
        generateOutput(modifiedInput);
    } else {
        showAlert();
    }
}

function showAlert() {
    
}

function generateOutput(content) {
    let newElementOutput = document.createElement("p")
    newElementOutput.textContent = content;
    newElementOutput.id = "message-output-3";
    $system_output.appendChild(newElementOutput);

    let newClipboardButton = document.createElement("button");
    newClipboardButton.id = "clipboard-button";
    newClipboardButton.innerHTML = "Copiar";
    $system_output.appendChild(newClipboardButton);
    newClipboardButton.addEventListener("click", function () {
        navigator.clipboard.writeText(content);
        newClipboardButton.innerHTML = "Copiado";
    });
}


