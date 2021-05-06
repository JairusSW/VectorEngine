import { renderLine } from './index';

export class Char {
  public static SPACE: u32 = 100;
  private charData: StaticArray<StaticArray<f32>> =
    [
      [
        -0.1171875, 0.7421875,
        0.25, 0.75,
        0.5, 0.5,
        0.5, -0.5,
        0.25, -0.75,
        -0.125, -0.75,
        -0.375, -0.5,
        -0.375, 0.5,
        -0.1171875, 0.7421875,], // 0
      [0.2578125, -0.7578125,
        -0.265625, -0.75,
        0, -0.75,
        0, 0.75,
        -0.25, 0.5,], // 1
      [-0.5, 0.25,
      -0.5, 0.5,
      -0.375, 0.671875,
      -0.125, 0.75,
        0.125, 0.75,
        0.375, 0.671875,
        0.5, 0.5,
        0.5, 0.125,
        0.375, 0,
        0.125, -0.125,
      -0.125, -0.125,
      -0.359375, -0.203125,
      -0.5, -0.390625,
      -0.5, -0.75,
        0.5078125,
      -0.7578125,], // 2
      [-0.5, 0.3125,
      -0.5, 0.453125,
      -0.390625, 0.671875,
      -0.125, 0.75,
        0.125, 0.75,
        0.34375, 0.703125,
        0.5, 0.5,
        0.5, 0.25,
        0.25, 0,
        0, 0,
        0.25, 0,
        0.5, -0.25,
        0.5, -0.5,
        0.34375, -0.671875,
        0.125, -0.75,
      -0.125, -0.75,
      -0.390625, -0.671875,
      -0.5, -0.5,
      -0.5, -0.25,], // 3
      [0.125, -0.75,
        0.1328125, 0.7421875,
        -0.5, 0,
        0.375, 0,], // 4
      [0.375, 0.75, -0.375, 0.75, -0.375, 0.25, -0.125, 0.25,
        0.140625, 0.140625, 0.25, 0, 0.375, -0.203125, 0.375,
        -0.375, 0.25, -0.625, 0, -0.75, -0.25, -0.75, -0.40625,
        -0.703125,], // 5
      [0.125, 0.875, -0.375, 0.25, -0.5, 0, -0.5, -0.25, -0.375,
        -0.5, -0.25, -0.625, 0, -0.75, 0.25, -0.75, 0.5, -0.625,
        0.625, -0.5, 0.703125, -0.3125, 0.703125, -0.125, 0.609375,
        0.078125, 0.5, 0.203125, 0.25, 0.203125, 0, 0.078125,
        -0.125, -0.046875, -0.25, -0.25, -0.25, -0.625,], // 6
      [-0.4921875, 0.6328125, -0.5, 0.75, 0.375,
        0.75, 0.375, 0.5, -0.375, -0.75,], // 7
      [-0.125, 0.75, 0.125, 0.75, 0.296875, 0.65625, 0.375,
        0.484375, 0.375, 0.34375, 0.328125, 0.171875, 0.125,
        0.0625, -0.125, 0.0625, -0.375, -0.046875, -0.5,
      -0.25, -0.5, -0.46875, -0.40625, -0.625, -0.125,
      -0.75, 0.125, -0.75, 0.40625, -0.625, 0.5, -0.46875,
        0.5, -0.25, 0.375, -0.046875, 0.125, 0.0625, -0.125,
        0.0625, -0.3125, 0.171875, -0.375, 0.34375, -0.375,
        0.484375, -0.296875, 0.65625, -0.125, 0.75,], // 8
      [0.375, 0.25, 0.203125, 0.09375, -0.03125, 0, -0.21875,
        0, -0.3671875, 0.1171875, -0.5, 0.328125, -0.5, 0.5,
        -0.40625, 0.703125, -0.203125, 0.828125, 0.078125,
        0.828125, 0.25, 0.75, 0.375, 0.5, 0.375, 0.25, 0.125,
        -0.25, -0.3671875, -0.7578125,], // 9
      [-0.6171875, -0.7421875, 0.0078125, 0.7578125, 0.6328125,
      -0.7578125, 0.328125, 0, -0.3359375, 0.0078125,], // A
      [-0.5, -0.75, -0.5, 0.75, 0.125, 0.75, 0.515625, 0.640625,
        0.640625, 0.4375, 0.625, 0.203125, 0.5, 0, -0.5, 0,
        0.484375, -0.015625, 0.625, -0.21875, 0.625, -0.4375,
        0.5625, -0.578125, 0.40625, -0.6875, 0.125, -0.75,
      -0.5, -0.75,], // B
      [0.625, 0.203125, 0.625, 0.296875, 0.5, 0.5, 0.375,
        0.625, 0.125, 0.75, -0.25, 0.75, -0.5, 0.625, -0.625,
        0.5, -0.75, 0.25, -0.75, -0.25, -0.625, -0.5, -0.5,
        -0.625, -0.25, -0.75, 0.125, -0.75, 0.375, -0.625,
        0.5, -0.5, 0.625, -0.3125, 0.625, -0.15625,], // C
      [-0.625, -0.75, -0.625, 0.75, 0, 0.75, 0.25, 0.625,
        0.375, 0.5, 0.5, 0.25, 0.5, -0.25, 0.375, -0.5,
        0.25, -0.625, 0.0078125, -0.7578125, -0.625, -0.75,], // D
      [0.5, 0.75, -0.5, 0.75, -0.5, 0, 0.25, 0, -0.5,
        0, -0.5, -0.75, 0.5078125, -0.7421875,], // E
      [0.5, 0.75, -0.5, 0.75, -0.5, 0, 0.25, 0, -0.5, 0, -0.5, -0.75,], // F
      [0.625, 0.171875, 0.625, 0.3125, 0.5, 0.5, 0.375,
        0.625, 0.125, 0.75, -0.125, 0.75, -0.375, 0.625,
        -0.5, 0.5, -0.625, 0.25, -0.625, -0.25, -0.5,
        -0.5, -0.375, -0.625, -0.125, -0.75, 0.125, -0.75,
        0.375, -0.625, 0.5, -0.5, 0.625, -0.25, 0.625,
        -0.125, 0, -0.125,], // G
      [-0.5, 0.75, -0.5, -0.75, -0.5, 0, 0.5, 0,
        0.5, 0.75, 0.5078125, -0.7578125,], // H
      [-0.5, 0.75, 0.5, 0.75, 0, 0.75, 0, -0.75,
      -0.5, -0.75, 0.5078125, -0.7421875,], // I
      [0.5, 0.75, 0.5, -0.125, 0.453125, -0.390625, 0.34375,
        -0.59375, 0.1875, -0.75, -0.015625, -0.75, -0.234375,
        -0.671875, -0.375, -0.546875, -0.46875, -0.328125,
        -0.5, -0.125, -0.5, 0,], // J
      [-0.5, 0.75, -0.5, -0.75, -0.5, 0, 0.3828125, 0.7421875,
      -0.5, 0, 0.375, -0.75,], // K
      [-0.4921875, 0.7421875, -0.5, -0.75, 0.5, -0.75,], // L
      [-0.625, -0.75, -0.625, 0.75, 0, -0.375, 0.625,
        0.75, 0.6328125, -0.7578125,], // M
      [-0.5, -0.75, -0.5, 0.75, 0.5, -0.75, 0.5078125, 0.7421875,], // N
      [
        -0.1171875, 0.7421875, 0.25, 0.75,
        0.5, 0.5, 0.5, -0.5,
        0.25, -0.75, -0.125, -0.75,
        -0.375, -0.5, -0.375, 0.5, -0.1171875, 0.7421875,], // O
      [-0.5, -0.75, -0.5, 0.75, 0.0078125, 0.7421875, 0.2421875,
        0.6171875, 0.3828125, 0.4921875, 0.5, 0.3125, 0.5, 0.1875,
        0.375, 0, 0.25, -0.125, 0, -0.25, -0.5, -0.25,], // P
      [0.625, -0.5, 0.5078125, -0.6328125, 0.25, -0.75, -0.25,
        -0.75, -0.5, -0.625, -0.625, -0.5, -0.75, -0.25, -0.75,
        0.25, -0.625, 0.5, -0.5, 0.625, -0.25, 0.75, 0.25, 0.75,
        0.5, 0.625, 0.625, 0.5, 0.75, 0.25, 0.75, -0.25, 0.625,
        -0.5, 0.5, -0.375, 0.875, -0.75,], // Q
      [-0.5, -0.75, -0.5, 0.75, 0.125, 0.75, 0.375, 0.625, 0.5,
        0.5, 0.5, 0.25, 0.375, 0.125, 0.125, 0, -0.5, 0, -0.0078125,
        0.0078125, 0.5078125, -0.7578125,], // R
      [0.625, 0.203125, 0.625, 0.375, 0.5625, 0.546875, 0.375, 0.6875,
        0.125, 0.75, -0.125, 0.75, -0.375, 0.640625, -0.484375, 0.5,
        -0.625, 0.296875, -0.625, 0.140625, -0.515625, -0.03125,
        -0.375, -0.109375, 0, -0.125, 0.375, -0.1875, 0.546875, -0.28125,
        0.625, -0.421875, 0.625, -0.5625, 0.421875, -0.703125, 0.125,
        -0.765625, -0.265625, -0.75, -0.4375, -0.671875, -0.578125,
        -0.484375, -0.625, -0.28125,], // S
      [-0.5, 0.75, 0.5, 0.75, 0.0078125, 0.7421875, 0, -0.75,], // T
      [-0.625, 0.75, -0.625, -0.25, -0.5, -0.5, -0.375, -0.625,
      -0.125, -0.75, 0.125, -0.75, 0.375, -0.625, 0.5, -0.5,
        0.625, -0.25, 0.6328125, 0.7421875,], // U
      [-0.625, 0.75, 0.0078125, -0.7578125, 0.625, 0.75,], // V
      [-0.625, 0.75, -0.625, -0.75, 0, 0, 0.625, -0.75, 0.6328125, 0.7421875,], // W
      [-0.625, 0.75, 0.625, -0.75, 0.0078125, 0.0078125, -0.625, -0.75, 0.625, 0.75,], // X
      [-0.625, 0.75, 0, 0, 0, -0.875, 0, 0, 0.6328125, 0.7421875,], // Y
      [-0.625, 0.625, -0.625, 0.75, 0.625, 0.75, 0.625, 0.625,
      -0.625, -0.625, -0.625, -0.75, 0.625, -0.75, 0.6328125, -0.6328125,], // Z
      [-0.0625, -0.3125, -0.171875, -0.421875, -0.171875, -0.578125, -0.0625,
      -0.6875, 0.0625, -0.6875, 0.171875, -0.5625, 0.171875, -0.421875,
        0.0625, -0.3125, -0.0625, -0.3125,], // . array #36 ASCII #46
      [-0.5, 0.125, 0.5, 0.125, 0.5078125, -0.1171875, -0.5, -0.125,
      -0.5, 0.125,], // - array #37 ASCII #45
      [-0.046875, 0.796875, -0.125, 0.875, -0.875, 0, -0.125, -0.875,
      -0.046875, -0.796875, -0.75, 0, -0.046875, 0.796875,], // array #38 ASCII #60
      [0.046875, 0.796875, 0.125, 0.875, 0.875, 0, 0.125, -0.875,
        0.046875, -0.796875, 0.75, 0, 0.046875, 0.796875,],// array #39 ASCII #62
    ];

  visible: bool = false;
  color: u32 = 0xff_ff_ff_ff;
  x: f32 = 0.0;
  y: f32 = 0.0;
  scale: f32 = 0.0;
  rotation: f32 = 0.0;
  private index: u32 = 0;

  @inline public render(): void {
    // don't render if this is a space
    if (this.index == Char.SPACE) {
      return;
    }
    renderLine(this.charData[this.index],
      this.x, this.y, this.color, this.rotation, this.scale);
  }

  @inline set num(d: u32) {

    if (d > 9) {
      return;
    }

    this.index = d;
  }

  @inline get num(): u32 {
    return this.index;
  }

  @inline set char(c: string) {
    this.charCode = <u32>c.charCodeAt(0);
  }

  @inline set charCode(cc: u32) {
    this.index = Char.charCodeToIndex(cc);
  }

  @inline static charCodeToIndex(cc: u32): u32 {
    if (cc >= 48 && cc <= 57) {
      return cc - 48;
    }
    else if (cc >= 65 && cc <= 90) {
      return cc - 55;
    }
    else if (cc >= 97 && cc <= 122) {
      return cc - 87;
    }
    else if (cc == 46) {
      return 36;
    }
    else if (cc == 45) {
      return 37;
    }
    else if (cc == 60) {
      return 38;
    }
    else if (cc == 62) {
      return 39;
    }
    return Char.SPACE; // space for everything undefined
  }

}