class Draw {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private paint: boolean;

  private clickX: number[] = [];
  private clickY: number[] = [];
  private clickDrag: boolean[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.paint = false;
    this.context = <CanvasRenderingContext2D>canvas.getContext("2d");
    this.context.lineCap = "round";
    this.context.lineJoin = "round";
    this.context.strokeStyle = "black";
    this.context.lineWidth = 1;
    this.createUserEvents();
  }

  private createUserEvents() {
    this.canvas.addEventListener("mousedown", this.pressEventHandler);
    this.canvas.addEventListener("mousemove", this.dragEventHandler);
    this.canvas.addEventListener("mouseup", this.releaseEventHandler);
    this.canvas.addEventListener("mouseout", this.cancelEventHandler);
    this.canvas.addEventListener("touchstart", this.pressEventHandler);
    this.canvas.addEventListener("touchmove", this.dragEventHandler);
    this.canvas.addEventListener("touchend", this.releaseEventHandler);
    this.canvas.addEventListener("touchcancel", this.cancelEventHandler);
  }

  private redraw() {
    let clickX = this.clickX;
    let context = this.context;
    let clickDrag = this.clickDrag;
    let clickY = this.clickY;
    for (let i = 0; i < clickX.length; ++i) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }
      context.lineTo(clickX[i], clickY[i]);
      context.stroke();
    }
    context.closePath();
  }

  private addClick(x: number, y: number, dragging: boolean) {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }

  private clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
  }

  private clearEventHandler = () => {
    this.clearCanvas();
  };

  private releaseEventHandler = () => {
    this.paint = false;
    this.redraw();
  };

  private cancelEventHandler = () => {
    this.paint = false;
  };

  private pressEventHandler = (e: MouseEvent | TouchEvent) => {
    let mouseX = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageX
      : (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageY
      : (e as MouseEvent).pageY;
    mouseX -= this.canvas.offsetLeft;
    mouseY -= this.canvas.offsetTop;

    this.paint = true;
    this.addClick(mouseX, mouseY, false);
    this.redraw();
  };

  private dragEventHandler = (e: MouseEvent | TouchEvent) => {
    let mouseX = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageX
      : (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches
      ? (e as TouchEvent).changedTouches[0].pageY
      : (e as MouseEvent).pageY;
    mouseX -= this.canvas.offsetLeft;
    mouseY -= this.canvas.offsetTop;

    if (this.paint) {
      this.addClick(mouseX, mouseY, true);
      this.redraw();
    }

    e.preventDefault();
  };
}

export default Draw;
