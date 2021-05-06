import { AI } from './AI';
import { Ball } from './Ball';
import { Player } from './Player';
import { Opponent } from './Opponent'
import { Input } from '../../engine/Input';
import { Char } from '../../engine/Char';
import { logf32, logi32 } from '../../engine/index';
import { bounceSound } from './sounds';
import { DisplayString } from '../../engine/DisplayString';

declare function _networkGetX(): f32

declare function _networkGetY(): f32

declare function _networkBallX(): f32

declare function _networkBallY(): f32

declare function _networkID(): i32

export function getBallX(): f32 {
  return ball.x
}

export function getBallY(): f32 {
  return ball.y
}

const ball = new Ball();
const player = new Player();
//const ai = new AI(ball);
const opponent = new Opponent();
const helloWorld = new DisplayString("AssemblyScript", 0.0, 0.0, 0.05, 0xff_ff_00_ff);

export const d1 = new Char();
d1.y = 0.5;
d1.scale = 0.1;
d1.color = 0xff_00_00_ff;

export const d2 = new Char();
d2.y = -0.5;
d2.scale = 0.1;
d2.color = 0x00_ff_00_ff;

Input.init();

let networkID = -1
export function gameLoop(): void {

  if (networkID === -1) networkID = _networkID()

  // Gotta reverse the number
  let x = _networkBallX()

  let y = _networkBallY()

  if ((networkID === 1) === false) {
    // If not leader, you have to flip.
    if (x > 0) {
      x = 0.0 - x
      // +0.3 becomes -0.3
    } else {
      x = f32(Math.abs(x))
      // -0.3 becomes +0.3
    }

    if (y > 0) {
      y = 0.0 - y
      // +0.3 becomes -0.3
    } else {
      y = f32(Math.abs(y))
      // -0.3 becomes +0.3
    }

    ball.x = x

    ball.y = y

  }

  ball.move();

  opponent.x = _networkGetX()

  if (opponent.x > 0) {
    opponent.x = 0.0 - opponent.x
    // +0.3 becomes -0.3
  } else {
    opponent.x = f32(Math.abs(opponent.x))
    // -0.3 becomes +0.3
  }

  opponent.move(opponent.x)

  player.move(Input.MouseX);

  if (ball.hitTest(player)) {
    bounceSound();

    let dist = player.x - x;
    let w = player.hw + ball.hw;

    ball.yvel = (0.025 * ((w - abs(dist)) / w));

    if (ball.yvel < 0.005) {
      ball.yvel = 0.005;
    }

    if (dist < 0) {
      ball.xvel = 0.025 - ball.yvel;
    }
    else {
      ball.xvel = ball.yvel - 0.025;
    }

  }
  else if (ball.hitTest(opponent)) {
    bounceSound();
    let dist = opponent.x - x;
    let w = opponent.hw + ball.hw;

    ball.yvel = -(0.025 * ((w - abs(dist)) / w));

    if (ball.yvel > -0.005) {
      ball.yvel = -0.005;
    }

    if (dist < 0) {
      ball.xvel = 0.025 + ball.yvel;
    }
    else {
      ball.xvel = -ball.yvel - 0.025;
    }

  }


  opponent.render();
  ball.render();
  player.render();

  d1.render();
  d2.render();

  helloWorld.render();
}