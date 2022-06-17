import Sorter from './Sorter.js'
import Renderer from './Renderer.js';

let AppSorter = new Sorter();

document.addEventListener('DOMContentLoaded', () => {
    let canvasElement = document.getElementById('appCanvas');
    const screenWidth = window.innerWidth;

    const AppRenderer = new Renderer(canvasElement, 360);

    AppSorter.shuffle(1000);
    AppRenderer.render(AppSorter.sortArray);

    let isRunning = false;

    const rateDisplay = document.querySelector('span.controlRateDisplay');
    const startButton = document.querySelector('span.playButton');
    const stopButton = document.querySelector('span.pauseButton');
    const shuffleButton = document.querySelector('span.shuffleButton');
    let rateInput, algoSelect;
    if (screenWidth < 992) {
        rateInput = document.querySelector('input[name="controlRateM"]');
        algoSelect = document.querySelector('select[name="controlAlgoM"]');
    } else {
        rateInput = document.querySelector('input[name="controlRate"]');
        algoSelect = document.querySelector('select[name="controlAlgo"]');
    }

    rateInput.addEventListener('input', e => {
        currentRate = e.target.value;
        rateDisplay.innerHTML = currentRate + 'ms';
    });

    algoSelect.addEventListener('select', e => {
        currentAlgo = e.target.value;
        AppSorter = new Sorter(currentAlgo);
        isRunning = false;
    });
    
    let currentAlgo = algoSelect.value;
    let currentRate = rateInput.value;
    rateDisplay.innerHTML = currentRate + 'ms';

    // Main loop for sorting
    const doSortLoop = () => {
        if (isRunning) {
            AppSorter.step();
            isRunning = !AppSorter.sorted;
            AppRenderer.render(AppSorter.sortArray);
            setTimeout(() => doSortLoop(), currentRate);
        } else {
            console.log('Stopped.')
            return false;
        }
    }
    isRunning = true;
    doSortLoop();

    // Button Handlers
    startButton.addEventListener('click', () => {
        if (AppSorter.sorted) {
            AppSorter = new Sorter(currentAlgo);
            AppSorter.shuffle(1000);
        }  
        if (isRunning != true) {
            isRunning = true;
            doSortLoop();
        }
    })

    stopButton.addEventListener('click', () => {
        if (isRunning == true) {
            isRunning = false;
        }
    });

    shuffleButton.addEventListener('click', () => {
        isRunning = false;
        AppSorter = new Sorter(currentAlgo);
        AppSorter.shuffle(1000);
        AppRenderer.render(AppSorter.sortArray);
    })
})

