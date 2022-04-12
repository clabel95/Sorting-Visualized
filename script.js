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

function removeData(chart) {
    //console.log(chart.data.labels.length)
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
    //document.getElementById("randomize").style.display = "none";
    //document.getElementById("randomize").style.display = "none";
    var quantityValue = document.querySelector("#sortSize");
    yValues = (Array.from({ length: quantityValue.value  }, () => (Math.floor(Math.random() * (1000 - 1) + 1))))
    removeData(Visualization);
    addData(Visualization, yValues)
}

//using this function any sort function can update the chart.
//this way we can update the chart every time a datapoint moves.
function UpdateNumbers(data){
    removeData(Visualization);
    addData(Visualization, data);
}

//randomize.addEventListener("click",UpdateNumbers);
randomize.addEventListener("click", NewNumbers);
window.onload = NewNumbers;

