import Sorter from './Sorter.js'
import Renderer from './Renderer.js';

let AppSorter = new Sorter();

document.addEventListener('DOMContentLoaded', () => {
    let canvasElement = document.getElementById('appCanvas');
    const AppRenderer = new Renderer(canvasElement, 720);

    AppSorter.shuffle(1000);
    AppRenderer.render(AppSorter.sortArray);

    let isRunning = false;

    const rateInput = document.querySelector('input[name="rate"]');
    const rateDisplay = document.querySelector('span.rate-display');

    const algoSelect = document.querySelector('select[name="algo"]');
    
    const startButton = document.querySelector('button.start');
    const stopButton = document.querySelector('button.stop');
    const shuffleButton = document.querySelector('button.shuffle');

    let currentRate = rateInput.value;
    rateDisplay.innerHTML = currentRate + 'ms';
    rateInput.addEventListener('input', e => {
        currentRate = e.target.value;
        rateDisplay.innerHTML = currentRate + 'ms';
    });

    let currentAlgo = algoSelect.value;
    algoSelect.addEventListener('change', e => {
        currentAlgo = e.target.value;
        AppSorter = new Sorter(currentAlgo);
        isRunning = false;
    });

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

