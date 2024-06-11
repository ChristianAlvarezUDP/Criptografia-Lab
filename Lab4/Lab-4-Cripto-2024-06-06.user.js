// ==UserScript==
// @name         Lab-4-Cripto
// @namespace    http://tampermonkey.net/
// @version      2024-06-06
// @description  try to take over the world!
// @author       Christian Alvarez
// @match        https://cripto.tiiny.site/
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Se crea un script el cual verificara que la libreria sea correcta
    var script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js';

    // Hash de la libreria CryptoJS
    script.integrity = 'sha384-mgWScxWVKP8F7PBbpNp7i/aSb17kN0LcifBpahAplF3Mn0GR4/u1oMpWIm2rD8yY';
    script.crossOrigin = 'anonymous';

    document.head.appendChild(script);

    // Ejecuta el script en caso de que se verifique la libreria
    script.onload = function() {
        console.log('Se verifico la libreria CryptoJS');

        // Obtiene todos los tags div que tienen una clase la cual empieza con M
        var message_divs = document.querySelectorAll("div[class^='M']")

        // Obtiene la llave remplazando las letras no mayusculas del texto original
        var main_p = document.getElementsByTagName("p")[0].innerHTML
        var key = main_p.replace(/[^A-Z]/g, '')

        console.log("La llave es: " + key)
        console.log("Los mensajes cifrados son: " + message_divs.length)

        for (var i = 0; i < message_divs.length; i++) {
            var message = message_divs[i].id

            var words = CryptoJS.enc.Base64.parse(message)
            var keyUtf8 = CryptoJS.enc.Utf8.parse(key) // Necesario por CryptoJS

            const decryptedTripleDes = CryptoJS.TripleDES.decrypt({ ciphertext: words }, keyUtf8,
            {
                // Necesario por CryptoJS
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });

            const decryptedTextDes = decryptedTripleDes.toString(CryptoJS.enc.Utf8);

            console.log(message + " " + decryptedTextDes)

            // Añade el mensaje al HTML
            var newDiv = document.createElement('div');
            newDiv.innerHTML += decryptedTextDes
            document.body.appendChild(newDiv);
        }
    };

    script.onerror = function() {
        console.error('No se pudo verificar la libreria CryptoJS');
    };
})();