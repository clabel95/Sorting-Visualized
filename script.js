var ctx = document.getElementById("Sort_Graph").getContext("2d");
var randomize = document.querySelector("#randomize");
var fresh_numbers = document.querySelector("#Fresh_Numbers")
var sort_options = document.querySelector("#Sort_Options")
var sort = document.querySelector("#sort_btn");


var choice = document.querySelector("#algo");
var speed = document.querySelector("#speed");


var barColors = [];
var yValues = [9, 10, 15, 23, 4, 13, 66]




const Visualization = new Chart(ctx, {
    type: "bar",
    data: {
        labels: yValues,
        datasets: [{
            data: yValues,
            backgroundColor: barColors,
        }]
    },
    options: {
        tooltip: { enabled: false },
        scales: {
            x: {
                grid: { display: false },
                ticks: { display: false }
            },
            y: {
                grid: { display: false },
                ticks: { display: false }
            },
        },
        plugins: {
            legend: { display: false }
        },
        maintainAspectRatio: false,
    }
});

function removeData(chart) {
    while (chart.data.labels.length !== 0 && chart.data.datasets[0].backgroundColor !== 0) {
        chart.data.labels.pop();
        chart.data.datasets[0].backgroundColor.pop();
        chart.update("none");
    }
};

function addData(chart, label, color) {
    let l = label.length
    for (let i = 0; i < l; i++) {
        chart.data.labels.push(label[i]);
        chart.data.datasets[0].backgroundColor.push(color[i]);
    }
    chart.update("none");
};

async function insertionSort(arr) {
    console.log(speed.options[choice.selectedIndex])
    let l = arr.length;
    for (let i = 1; i < l; i++) {
        for (let j = i - 1; j > -1; j--) {

            barColors[j + 1] = "blue"
            barColors[j] = "orange"
            barColors[i] = "yellow"
            UpdateNumbers(arr, barColors);
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed.options[speed.selectedIndex].value)
            );
            barColors[j + 1] = "orange"
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }

    };

    barColors = (Array.from({ length: l }, () => "green"))

    UpdateNumbers(arr, barColors);
    fresh_numbers.style.display = "inline-block"
    return arr;
};

async function bubbleSort(arr) {
    let l = arr.length;
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
            barColors[j] = "red";
            barColors[j + 1] = "blue";
            UpdateNumbers(arr, barColors);

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed.options[speed.selectedIndex].value)
            );
            if (j == (l - i - 2)) {
                barColors[j + 1] = "green"
                UpdateNumbers(arr, barColors);

                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, speed.options[speed.selectedIndex].value)
                );
            }

        }
    };
    barColors = (Array.from({ length: l }, () => "green"))
    UpdateNumbers(arr, barColors);
    fresh_numbers.style.display = "inline-block"
    return arr;
};

async function selectionSort(arr) {
    let min;
    let l = arr.length;
    for (let i = 0; i < l; i++) {
        min = i;
        for (let j = i + 1; j < l; j++) {
            barColors[j] = "yellow";
            barColors[min] = "blue";
            UpdateNumbers(arr, barColors);
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, speed.options[speed.selectedIndex].value)
            );
            barColors[j] = "red";
            barColors[min] = "red";

            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
        }
        barColors[i] = "green"
        UpdateNumbers(arr, barColors);
        //barColors[min] = "red"
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, speed.options[speed.selectedIndex].value)
        );
    }
    barColors = (Array.from({ length: l }, () => "green"))
    UpdateNumbers(arr, barColors);
    fresh_numbers.style.display = "inline-block"
    return arr;
};

function SortChoice() {
    sort_options.style.display = "none";
    switch (choice.options[choice.selectedIndex].value) {
        case "bubble": bubbleSort(yValues); break;
        case "selection": selectionSort(yValues); break;
        case "insertion": insertionSort(yValues); break;
        case "quick": break;
        case "binary": break;
    }

};

function NewNumbers() {
    fresh_numbers.style.display = "none"
    var quantityValue = document.querySelector("#sortSize");
    barColors = (Array.from({ length: quantityValue.value }, () => "red"))
    yValues = (Array.from({ length: quantityValue.value }, () => (Math.floor(Math.random() * (1000 - 1) + 1))))
    removeData(Visualization);
    addData(Visualization, yValues, barColors)
    sort_options.style.display = "inline-block";
    return yValues, barColors;
};

//using this function any sort function can update the chart.
//this way we can update the chart every time a datapoint moves.
function UpdateNumbers(data, colors) {
    removeData(Visualization);
    addData(Visualization, data, colors);
};

randomize.addEventListener("click", NewNumbers);
sort.addEventListener("click", SortChoice);
window.onload = NewNumbers;
