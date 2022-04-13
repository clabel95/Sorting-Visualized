var ctx = document.getElementById("Sort_Graph").getContext("2d");
var randomize = document.querySelector("#randomize");
var sort = document.querySelector("#sort_btn");
let delay = 0;


var choice = document.getElementById("algo");
//var choice_v = choice.options[choice.selectedIndex].value;

var barColors = "red";
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
    while (chart.data.labels.length !== 0) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update("none");
    }

}
function addData(chart, label, data) {
    let l = label.length
    for (let i = 0; i < l; i++) {
        chart.data.labels.push(label[i]);
    }
    delay = delay - 1;
    chart.update("none");
}

async function bubbleSort(arr) {
    let l = arr.length;
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
            UpdateNumbers(arr);
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 300)
            );

        }
    };
    return arr;
};

async function insertionSort(arr) {
    let l = arr.length;
    for (let i = 1; i < l; i++) {
        for (let j = i - 1; j > -1; j--) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
            UpdateNumbers(arr);
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 300)
            );
        }
    };
    return arr;
};


async function selectionSort(arr) {
    let min;
    let l = arr.length;
    for (let i = 0; i < l; i++) {
        min = i;
        for (let j = i + 1; j < l; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
        }
        UpdateNumbers(arr);
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 300)
        );
    }
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
    yValues = (Array.from({ length: quantityValue.value }, () => (Math.floor(Math.random() * (1000 - 1) + 1))))
    removeData(Visualization);
    addData(Visualization, yValues)
    return yValues;
}

//using this function any sort function can update the chart.
//this way we can update the chart every time a datapoint moves.
function UpdateNumbers(data) {
    removeData(Visualization);
    addData(Visualization, data);
}


randomize.addEventListener("click", NewNumbers);
sort.addEventListener("click", SortChoice);
window.onload = NewNumbers;
