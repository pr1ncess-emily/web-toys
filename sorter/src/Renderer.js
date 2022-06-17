export default class Renderer {
    constructor(canvasElement, canvasSize) {
        this.canvas = canvasElement.getContext('2d');
        this.size = canvasSize;
        this.renderRatio = Math.round(canvasSize/360);
    }

    clear() {
        this.canvas.fillStyle = "#fff";
        this.canvas.fillRect(0, 0, this.size, this.size);
    }

    render(sortArray) {
        this.clear();
        sortArray.forEach((value, index) => {
            this.canvas.fillStyle = `hsl(${value} 100% 50%)`;
            this.canvas.fillRect((index * this.renderRatio), this.size-(value*this.renderRatio), this.renderRatio, (value * this.renderRatio));
        });
    }
}