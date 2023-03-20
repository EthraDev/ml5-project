let click = document.querySelector('.classify')

let classifier;

// A variable to hold the image we want to classify
let img;
let input = document.querySelector('#input');

function preload() {
classifier = ml5.imageClassifier('MobileNet');
img = loadImage(`${input.value}`);
}


function setup() {
    createCanvas(400, 400);
    classifier.classify(img, gotResult);
    image(img, 0, 0);

}

function gotResult(error, results) {
    // Display error in the console
    if (error) {
        console.error(error);
    } else {
        // The results are in an array ordered by confidence.
        console.log(results[0].label);

        if (results[0].label == 'window screen') return

        document.querySelector(".resultat").innerHTML = `<p>Label: ${results[0].label} <br> Confidence: ${nf(results[0].confidence, 0, 2)}</p>`;
    }
}

click.addEventListener('click', function() {
    let div = document.querySelector('.ladiv')
    preload();
    setup();
    div.innerHTML = `<img src="${input.value}" style="width: 400px;">`
    input.value = '';
    gotResult();
})