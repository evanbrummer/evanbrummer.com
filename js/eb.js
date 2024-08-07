var index = -1;
var words;

fetch("/dialogue.json")
        .then(response => response.json())
        .then(wordsObject => {
            var p = document.getElementById("words");
            words = wordsObject["words"];
            p.onclick = function() {
                index += 1;
                if (index < words.length) {
                    p.innerText = words[index];
                }
            }
        });