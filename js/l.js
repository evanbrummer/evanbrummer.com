var container = document.getElementById("container");
var dayOfWeek = new Date().toLocaleString('en-US', { weekday: 'long' });
var workoutIndex = 0;

switch (dayOfWeek) {
    case "Saturday":
    case "Sunday":
    case "Monday":
        workoutIndex = 0;
        break;
    case "Tuesday":
    case "Wednesday":
        workoutIndex = 1;
        break;
    case "Thursday":
        workoutIndex = 2;
        break;
    case "Friday":
        workoutIndex = 3;
        break;
}

function init() {

    container.innerHTML = "";

    let buttons = document.createElement("div");
    for (let i = 0; i < 4; i++) {
        let dayButton = document.createElement("button");
        dayButton.innerText = i+1;
        dayButton.onclick = () => {
            workoutIndex = i;
            init();
        }
        if (i == workoutIndex) {
            dayButton.style.borderWidth = "9px";
        }
        if (i == 1) {
            dayButton.style.marginRight = "40px";
        }
        buttons.appendChild(dayButton);
    }
    container.appendChild(buttons);
    
    fetch('/fourday.json')
        .then(response => response.json())
        .then(
            routine => {

                let workout = routine[workoutIndex];

                let header = document.createElement("h3");
                header.innerText = workout.title;

                container.appendChild(header);

                workout.lifts.forEach(lift => {
                    let p = document.createElement("p");
                    let checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    p.appendChild(checkbox);
                    let span = document.createElement("span");
                    span.innerText = lift + " ";
                    span.style.paddingLeft = "10px";
                    span.style.paddingRight = "8px";
                    p.appendChild(span);
                    let input = document.createElement("input");
                    input.onchange = () => {
                        localStorage.setItem(lift, input.value)
                    }

                    let note = localStorage.getItem(lift)
                    if (note != null) {
                        input.value = note;
                    } else {
                        input.value = "2x8";
                    }

                    p.appendChild(input);
                    container.append(p);
                });
            }
        )

}

init();