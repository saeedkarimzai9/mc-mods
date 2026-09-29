// MineHop movement settings
// Edit these numbers, then rebuild/repackage the add-on.
//
// EASY PRESETS:
// speed:        0.70 = slower / 0.95 = default / 1.20 = faster
// air accel:    0.035 = floaty / 0.055 = default / 0.090 = strong
// jump:        0.36 = low / 0.42 = default / 0.50 = high

export const SETTINGS = {
  MAX_SPEED: 0.95,
  GROUND_ACCEL: 0.085,
  AIR_ACCEL: 0.055,
  AIR_SPEED: 0.78,
  GROUND_FRICTION: 0.82,
  JUMP_VELOCITY: 0.42,
  MIN_MOVE: 0.05,

  // Keep this true for automatic bunnyhopping while Jump is held.
  AUTO_BHOP: true
};
