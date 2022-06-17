export default class Sorter {
    constructor(algorithm) {
        this.algo = this.getAlgo(algorithm);
        this.sortArray = [];
        for (let i = 0; i < 360; i++) {
            this.sortArray[i] = i;
        }
        this.iterator = 0;
        this.sorted = false;
    }

    getAlgo(algoName) {
        switch (algoName) {
            case 'insert':
                return () => this.insert();
            default:
                return () => this.insert();
        }
    }

    step() {
        if (this.sorted) return;
        this.algo();
    }

    insert() {
        if (this.iterator < 360) {
            let j = this.iterator;
            while (j > 0 && this.sortArray[j-1] > this.sortArray[j]) {
                let valueGreater = this.sortArray[j-1];
                let valueLesser = this.sortArray[j];
                this.sortArray[j-1] = valueLesser;
                this.sortArray[j] = valueGreater;
                j--;
            }
            this.iterator++;
        } else {
            this.sorted = true;
        }
    }

    shuffle(iterations) {
        for (let i = 0; i < iterations; i++) {
            let randValue = () => Math.floor(Math.random() * 360);
            let indexA = randValue();
            let valueA = this.sortArray[indexA];
            let indexB = randValue();
            let valueB = this.sortArray[indexB];
            if (indexA == indexB) {
                i--;
            } else {
                this.sortArray[indexA] = valueB;
                this.sortArray[indexB] = valueA;
            }
        }
    }
}