import { system, world } from "@minecraft/server";

// MineHop movement tuning.
// These values are intentionally exposed so the movement can be tuned toward
// classic CS-style bhop without replacing Minecraft's entire movement engine.
const MAX_SPEED = 0.95;
const GROUND_ACCEL = 0.085;
const AIR_ACCEL = 0.055;
const AIR_SPEED = 0.78;
const GROUND_FRICTION = 0.82;
const JUMP_VELOCITY = 0.42;
const MIN_MOVE = 0.05;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function horizontalSpeed(v) {
  return Math.sqrt(v.x * v.x + v.z * v.z);
}

function normalize(x, z) {
  const len = Math.sqrt(x * x + z * z);
  if (len < 0.0001) return { x: 0, z: 0 };
  return { x: x / len, z: z / len };
}

function wishDirection(player) {
  const input = player.inputInfo.getMovementVector();
  const forward = input.y;
  const side = input.x;

  // Convert local WASD input into world-space using the player's yaw.
  const yaw = player.getRotation().y * Math.PI / 180;
  const fx = -Math.sin(yaw);
  const fz = Math.cos(yaw);
  const rx = Math.cos(yaw);
  const rz = Math.sin(yaw);

  const x = fx * forward + rx * side;
  const z = fz * forward + rz * side;
  return normalize(x, z);
}

function isGrounded(player) {
  try {
    return player.getBlockStandingOn() !== undefined;
  } catch {
    return false;
  }
}

function accelerate(player, dir, targetSpeed, acceleration) {
  if (dir.x === 0 && dir.z === 0) return;

  const v = player.getVelocity();
  const currentAlongWish = v.x * dir.x + v.z * dir.z;
  const addSpeed = targetSpeed - currentAlongWish;
  if (addSpeed <= 0) return;

  const amount = Math.min(acceleration, addSpeed);
  player.applyImpulse({
    x: dir.x * amount,
    y: 0,
    z: dir.z * amount
  });
}

function limitSpeed(player) {
  const v = player.getVelocity();
  const speed = horizontalSpeed(v);
  if (speed <= MAX_SPEED) return;

  const scale = MAX_SPEED / speed;
  player.applyImpulse({
    x: v.x * (scale - 1),
    y: 0,
    z: v.z * (scale - 1)
  });
}

function tickPlayer(player) {
  if (!player.isValid) return;

  const grounded = isGrounded(player);
  const jumping = player.isJumping;
  const dir = wishDirection(player);
  const moving = Math.abs(dir.x) > MIN_MOVE || Math.abs(dir.z) > MIN_MOVE;

  let v = player.getVelocity();

  // CS-like ground friction: preserve speed while the player is actively
  // bunnyhopping, but slow down when there is no movement input.
  if (grounded && !moving) {
    player.applyImpulse({
      x: -v.x * (1 - GROUND_FRICTION),
      y: 0,
      z: -v.z * (1 - GROUND_FRICTION)
    });
    v = player.getVelocity();
  }

  if (grounded) {
    if (moving) accelerate(player, dir, MAX_SPEED, GROUND_ACCEL);

    // Auto-bhop: holding Jump chains jumps on landing.
    if (jumping) {
      player.applyImpulse({ x: 0, y: JUMP_VELOCITY, z: 0 });
    }
  } else {
    // Air acceleration is the important part of CS-style strafing.
    if (moving) accelerate(player, dir, AIR_SPEED, AIR_ACCEL);
  }

  limitSpeed(player);
}

system.runInterval(() => {
  for (const player of world.getAllPlayers()) {
    try {
      tickPlayer(player);
    } catch {
      // Ignore a player that becomes invalid between ticks.
    }
  }
}, 1);
