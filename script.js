var ctx = document.getElementById("Sort_Graph").getContext("2d");
var randomize = document.querySelector("#randomize");
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





//var xValues = [];
//var yValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

function removeData(chart) {
    console.log(chart.data.labels.length)
    while (chart.data.labels.length !== 0) {
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update("none");
    }

}
function addData(chart, label, data) {
    for (let i = 0; i < label.length; i++) {
        chart.data.labels.push(label[i]);
        // chart.data.datasets.forEach((dataset) => {
        //     dataset.data.push(data[i]);
        // });
    }

    chart.update("none");
}


function NewNumbers() {
    var quantityValue = document.querySelector("#sortSize");
    console.log(quantityValue.value)
    Array.from({ length: quantityValue.value }, () => Math.floor(Math.random() * 100));
    //randomArray = (length, max) => [...new Array(length)].map(() => Math.round(Math.random() * max));

    yValues = (Array.from({ length: quantityValue.value }, () => Math.floor(Math.random() * 100)))
    console.log(yValues)
    removeData(Visualization);
    addData(Visualization, yValues)
}

//using this function any sort function can update the chart.
//this way we can update the chart every time a datapoint moves.
function UpdateNumbers(data){
    removeData(Visualization);
    addData(Visualization, data);
}

function updateAll() {
    console.log("is this doing anything?");
    var clear = clearcanvas();
    var newNumbers = NewNumbers();

    clear;
    newNumbers;
}


//randomize.addEventListener("click",UpdateNumbers);
randomize.addEventListener("click", NewNumbers);
window.onload = UpdateNumbers;

