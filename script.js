var ctx = document.getElementById("Sort_Graph").getContext("2d");
var randomize = document.querySelector("#randomize");
var fresh_numbers = document.querySelector("#Fresh_Numbers")
var sort_options = document.querySelector("#Sort_Options")
var sort = document.querySelector("#sort_btn");
var algo_time = document.getElementById("algo_time")


var choice = document.querySelector("#algo");
var speed = document.querySelector("#speed");


var barColors = [];
var yValues = [9, 10, 15, 23, 4, 13, 66]

//Used to update and populate the chart
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


//functions for manipulating the data

function removeData(chart) {
    while (chart.data.labels.length !== 0 && chart.data.datasets[0].backgroundColor !== 0) {
        chart.data.labels.pop();
        chart.data.datasets[0].backgroundColor.pop(); 
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

async function insertionSortND(arr) {
    let l = arr.length;
    var start = performance.now();
    for (let i = 1; i < l; i++) {
        for (let j = i - 1; j > -1; j--) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }

    };
    var end = performance.now();
    if (end-start == 0){
        algo_time.innerText= `Total sort time: < .1 milliseconds`;
    }else{
        algo_time.innerText= `Total sort time: ~${Math.round((end-start)*100)/100} milliseconds`;
    }
    barColors = (Array.from({ length: l }, () => "green"))
    UpdateNumbers(arr, barColors);
    fresh_numbers.style.display = "inline-block";
    algo_time.style.display = "flex";
    return arr;
};

async function bubbleSort(arr) {
    let l = arr.length;
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
            if (speed.options[speed.selectedIndex].value !== 0) {
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
        }
    };
    barColors = (Array.from({ length: l }, () => "green"))
    UpdateNumbers(arr, barColors);
    fresh_numbers.style.display = "inline-block"
    return arr;
};

async function bubbleSortND(arr) {
    let l = arr.length;
    var start = performance.now();
    for (let i = 0; i < l; i++) {
        for (let j = 0; j < l - i - 1; j++) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            }
        }
    };
    var end = performance.now();
    if (end-start == 0){
        algo_time.innerText= `Total sort time: < .1 milliseconds`;
    }else{
        algo_time.innerText= `Total sort time: ~${Math.round((end-start)*100)/100} milliseconds`;
    }
    barColors = (Array.from({ length: l }, () => "green"))
    UpdateNumbers(arr, barColors);
    fresh_numbers.style.display = "inline-block";
    algo_time.style.display = "flex";
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

async function selectionSortND(arr) {
    let min;
    let l = arr.length;
    var start = performance.now();
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
    }
    var end = performance.now();
    
    if (end-start == 0){
        algo_time.innerText= `Total sort time: < .1 milliseconds`;
    }else{
        algo_time.innerText= `Total sort time: ~${Math.round((end-start)*100)/100} milliseconds`;
    }
    
    barColors = (Array.from({ length: l }, () => "green"))
    UpdateNumbers(arr, barColors);
    fresh_numbers.style.display = "inline-block"
    algo_time.style.display = "flex";
    return arr;
};

function instantSortChoice() {
    sort_options.style.display = "none";
    switch (choice.options[choice.selectedIndex].value) {
        case "bubble": bubbleSortND(yValues); break;
        case "selection": selectionSortND(yValues); break;
        case "insertion": insertionSortND(yValues); break;
    }
};

function SortChoice() {
    sort_options.style.display = "none";
    if (speed.options[speed.selectedIndex].value == 0) return instantSortChoice();
    switch (choice.options[choice.selectedIndex].value) {
        case "bubble": bubbleSort(yValues); break;
        case "selection": selectionSort(yValues); break;
        case "insertion": insertionSort(yValues); break;
    }
};

function NewNumbers() {
    fresh_numbers.style.display = "none"
    algo_time.style.display = "none";
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
