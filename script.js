var ctx = document.getElementById("Sort_Graph").getContext("2d");
var randomize = document.querySelector("#randomize");
var sort = document.querySelector("#sort_btn");
let delay = 0;


var choice = document.getElementById("algo");


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

console.log(Visualization.data.datasets[0].backgroundColor)

function removeData(chart) {
    while (chart.data.labels.length !== 0 && chart.data.datasets[0].backgroundColor !== 0) {
        chart.data.labels.pop();
        // chart.data.datasets.forEach((dataset) => {
        //     dataset.data.pop();
        // });
        chart.data.datasets[0].backgroundColor.pop();
        chart.update("none");
    }
}
function addData(chart, label, color) {
    //console.log(chart.data.datasets[0].backgroundColor)
    let l = label.length
    for (let i = 0; i < l; i++) {
        chart.data.labels.push(label[i]);
        chart.data.datasets[0].backgroundColor.push(color[i]);
    }
    delay = delay - 1;
    chart.update("none");
}

async function bubbleSort(arr) {
    let l = arr.length;
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l - i - 1; j++) {
            barColors[j] = "red";
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
            barColors[j] = "red";
            barColors[j + 1] = "green";
            UpdateNumbers(arr, barColors);
            //console.log(barColors)

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 150)
            );

        }
    };
    barColors = (Array.from({ length: l }, () => "green"))
    UpdateNumbers(arr, barColors);
    return arr;
};

async function insertionSort(arr) {
    let l = arr.length;
    for (let i = 1; i < l; i++) {
        for (let j = i - 1; j > -1; j--) {
            
            barColors[j+1] = "blue"
            barColors[j] = "orange"
            barColors[i] = "yellow"
            UpdateNumbers(arr, barColors);
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 200)
            );
            barColors[j+1] = "orange"
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }

    };

    barColors = (Array.from({ length: l }, () => "green"))

    UpdateNumbers(arr, barColors);
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
                }, 300)
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
            }, 300)
        );
    }
    barColors = (Array.from({ length: l }, () => "green"))
    UpdateNumbers(arr, barColors);

    return arr;
}

function SortChoice() {
    switch (choice.options[choice.selectedIndex].value) {
        case "bubble": bubbleSort(yValues); break;
        case "selection": selectionSort(yValues); break;
        case "insertion": insertionSort(yValues); break;
        case "quick": break;
        case "binary": break;
    }
}


function NewNumbers() {
    var quantityValue = document.querySelector("#sortSize");
    barColors = (Array.from({ length: quantityValue.value }, () => "red"))
    yValues = (Array.from({ length: quantityValue.value }, () => (Math.floor(Math.random() * (1000 - 1) + 1))))
    removeData(Visualization);
    addData(Visualization, yValues, barColors)
    return yValues, barColors;
}

//using this function any sort function can update the chart.
//this way we can update the chart every time a datapoint moves.
function UpdateNumbers(data, colors) {
    removeData(Visualization);
    addData(Visualization, data, colors);
}

randomize.addEventListener("click", NewNumbers);
sort.addEventListener("click", SortChoice);
window.onload = NewNumbers;
