function Show(){

    let chosen = document.getElementById("input").value;
    if (chosen === "sideandangle"){
        document.getElementById("angle").hidden = false;
        document.getElementById("firstside").hidden = false;
        document.getElementById("secondside").hidden = true;
    }
    else if (chosen === "twosides") {
        document.getElementById("firstside").hidden = false;
        document.getElementById("secondside").hidden = false;
        document.getElementById("angle").hidden = true;
    }
    else {
        document.getElementById("firstside").hidden = true;
        document.getElementById("secondside").hidden = true;
        document.getElementById("angle").hidden = true;
        TurnRed(document.getElementById("input"));
    }
    Clear();
}

function Clear(){
    document.getElementById("firstsideinput").value = "";
    document.getElementById("secondsideinput").value = "";
    document.getElementById("angleinput").value = "";
    let a = document.getElementById("answers");
    a.hidden = true;
    a.value = "";
}

function ClearAll(){
    Clear();
    document.getElementById("input").value = "none";
    document.getElementById("firstside").hidden = true;
    document.getElementById("secondside").hidden = true;
    document.getElementById("angle").hidden = true;
    fields = document.querySelectorAll('select')
    fields.forEach(function(field){
        field.value = "";
        TurnBlack(field);
    })
}

function TurnRed(...item) {
    for (let i = 0; i < item.length; i++) {
        item[i].style.color = "red";
    }
}

function TurnBlack(...item) {
    for (let i = 0; i < item.length; i++) {
        item[i].style.color = "black";
    }
}

function Checked(){
    let chosen = document.getElementById("input").value;
    let output = document.getElementById("answers");
    output.innerHTML = "";
    document.getElementById("answers").hidden = false;
    let bool = true;
    if (chosen === "none") {
        output.innerHTML = "\n<p>Выберете входные значения.</p>";
        TurnRed(document.getElementById("input"));
        bool = false;
    }
    else if (chosen === "sideandangle"){
        let angle = document.getElementById("angleinput").value;
        let side = document.getElementById("firstsideinput").value;
        if (angle === "") {
            output.innerHTML += "\n<p>Введите значение угла при основании.</p>";
            TurnRed(document.getElementById("angle"));
            bool = false;
        }
        if (side === "") {
            output.innerHTML += "\n<p>Введите длину стороны.</p>";
            TurnRed(document.getElementById("firstside"));
            bool = false;
        }
        if (angle <= 0) {
            output.innerHTML += "\n<p>Угол не может быть меньше или равным нулю.</p>";
            TurnRed(document.getElementById("angle"));
            bool = false;
        }
        if (angle >= 90) {
            output.innerHTML += "\n<p>Угол при основании равнобедренного треугольника не может быть больше или равным 90 градусов.</p>";
            TurnRed(document.getElementById("angle"));
            bool = false;
        }
        if (side <= 0) {
            output.innerHTML += "\n<p>Сторона не может быть меньше или равна нулю.</p>";
            TurnRed(document.getElementById("firstside"));
            bool = false;
        }
    }
    else {
        let firstside = document.getElementById("firstsideinput").value;
        let secondside = document.getElementById("secondsideinput").value;
        if (firstside === "") {
            output.innerHTML += "\n<p>Введите длину боковой стороны.</p>";
            TurnRed(document.getElementById("firstside"));
            bool = false;
        }
        if (secondside === "") {
            output.innerHTML += "\n<p>Введите длину основания.</p>";
            TurnRed(document.getElementById("secondside"));
            bool = false;
        }
        if (firstside <= 0) {
            output.innerHTML += "\n<p>Сторона не может быть меньше или равна нулю.</p>";
            TurnRed(document.getElementById("firstside"));
            bool = false;
        }
        if (secondside <= 0) {
            output.innerHTML += "\n<p>Сторона не может быть меньше или равна нулю.</p>";
            TurnRed(document.getElementById("secondside"));
            bool = false;
        }
        if (secondside >= 2*firstside) {
            output.innerHTML += "\n<p>Любая сторона треугольника должна быть меньше суммы двух других сторон.</p>";
            TurnRed(document.getElementById("secondside"));
            bool = false;
        }
    }
    if (document.getElementById("whattofind").value === ""){
        output.innerHTML += "\n<p>Не были выбраны ответы для решения.</p>";
        TurnRed(document.getElementById("whattofind"));
        bool = false;
    }
    return bool;
}

function Solve() {
    TurnBlack(
        document.getElementById("angleinput"),
        document.getElementById("input"),
        document.getElementById("firstsideinput"),
        document.getElementById("secondsideinput"),
        document.getElementById("whattofind"));
    if (Checked()) {
        document.getElementById("answers").hidden = false;
        let output = document.getElementById("answers");
        output.innerHTML = "<p><b>Результат:</b></p>";
        let chosenoption = document.getElementById("input").value;
        let selectedAns = document.getElementById("whattofind");
        for (var i = 0; i < selectedAns.options.length; ++i) {
            let opt = selectedAns.options[i];
            if (opt.selected) {
                switch (opt.value) {
                    case "innercircle": {
                        if (chosenoption === "sideandangle"){
                            let angle = +document.getElementById("angleinput").value;
                            let side = +document.getElementById("firstsideinput").value;
                            let answer = side * Math.cos(angle) * Math.tan(angle / 2);
                            output.innerHTML += `<p>r = ${answer}</p>`;
                        }
                        else {
                            let side1 = +document.getElementById("firstsideinput").value;
                            let side2 = +document.getElementById("secondsideinput").value;
                            let answer = side2 / 2 * Math.sqrt((2 * side1 - side2)/(2 * side1 + side2));
                            output.innerHTML += `<p>r = ${answer}</p>`;
                        }
                        break;
                    }
                    case "outercircle": {
                        if (chosenoption === "sideandangle"){
                            let angle = 180 - 2 * document.getElementById("angleinput").value;
                            let side = +document.getElementById("firstsideinput").value;
                            let answer = side * Math.sqrt(2 * (1 - Math.cos(angle))) / (2 * Math.sin(angle));
                            output.innerHTML += `<p>R = ${answer}</p>`;
                        }
                        else {
                            let side1 = +document.getElementById("firstsideinput").value;
                            let side2 = +document.getElementById("secondsideinput").value;
                            let answer = side1 * side1 / Math.sqrt(4 * side1 * side1 - side2 * side2);
                            output.innerHTML += `<p>R = ${answer}</p>`;
                        }
                        break;
                    }
                    case "perimeter": {
                        if (chosenoption === "sideandangle"){
                            let angle = 180 - 2 * document.getElementById("angleinput").value;
                            let side = +document.getElementById("firstsideinput").value;
                            let answer = Math.sqrt(side * side * 2 - 2 * side * Math.cos(angle)) + side * 2;
                            output.innerHTML += `<p>P = ${answer}</p>`;
                        }
                        else {
                            let side1 = +document.getElementById("firstsideinput").value;
                            let side2 = +document.getElementById("secondsideinput").value;
                            let answer = side1 * 2 + side2;
                            output.innerHTML += `<p>P = ${answer}</p>`;
                        }
                        break;
                    }
                }
            }
        }
    }
    event.preventDefault();
}