import { renderLine, renderLoop } from "../../engine";
import { InvaderObj } from "./InvaderObj";

export class InvaderWide extends InvaderObj {

  frame1: StaticArray<f32> = [
    -0.375, 0.625, 0.375, 0.625,
    0.75, 0.5, 0.75, 0.125,
    0.375, -0.125, 0.625, -0.25,
    0.625, -0.5, 0.5, -0.5,
    0.5, -0.375, 0.25, -0.25,
    0.125, -0.125, 0, -0.25,
    -0.125, -0.125, -0.25, -0.25,
    -0.5, -0.375, -0.5, -0.5,
    -0.625, -0.5, -0.625, -0.25,
    -0.375, -0.125, -0.75, 0.125,
    -0.75, 0.5,];
  frame2: StaticArray<f32> = [-0.375, 0.625, 0.375, 0.625, 0.75, 0.5, 0.75, 0.125, 0.375, -0.125, 0.625, -0.25, 0.546875, -0.5, 0.25, -0.625, 0.25, -0.5, 0.40625, -0.421875, 0.25, -0.1875, 0, -0.25, -0.25, -0.1875, -0.40625, -0.421875, -0.25, -0.5, -0.25, -0.625, -0.546875, -0.5, -0.546875, -0.375, -0.375, -0.125, -0.75, 0.125, -0.75, 0.5,];

  eye_layer: StaticArray<f32> = [-0.5, 0.375, -0.125, 0.25, 0.125, 0.25, 0.5, 0.375, 0.0078125, 0.0078125,];

  constructor() {
    super();
    this.hw = 0.75 * this._scale;
    this.hh = 0.625 * this._scale;
  }
  @inline render(): void {
    if (this.active == false) {
      return;
    }

    if (this.frame == 1) {
      renderLoop(this.frame1, this.x, this.y, this.color, 0.0, 0.05);
    }
    else {
      renderLoop(this.frame2, this.x, this.y, this.color, 0.0, 0.05);
    }
    renderLoop(this.eye_layer, this.x, this.y, this.color, 0.0, 0.05);
  }

}