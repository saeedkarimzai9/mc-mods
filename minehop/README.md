# MineHop — CS-style Bunnyhop for Minecraft Bedrock

Target: Minecraft Bedrock v26.52.

MineHop recreates the *movement feel* of classic Counter-Strike bunnyhopping as closely as Bedrock scripting allows:
- automatic jump chaining while Jump is held
- ground friction control
- air acceleration
- strafe acceleration from movement input
- configurable maximum horizontal speed
- speed preservation through jumps
- no weapons, textures, sounds, or CS assets are included

## Install

1. Import the behavior pack folder as an add-on pack.
2. Activate the **MineHop** behavior pack in your world.
3. Enable the scripting/Beta APIs required by your Bedrock build if the game asks for them.
4. Join the world and hold **Jump** while moving.

## Tuning

Edit `scripts/main.js`:
- `MAX_SPEED` — horizontal speed cap
- `GROUND_ACCEL` — ground acceleration
- `AIR_ACCEL` — air acceleration
- `AIR_SPEED` — air acceleration target
- `GROUND_FRICTION` — friction when grounded
- `JUMP_VELOCITY` — jump impulse

This is a Bedrock recreation, not the original Counter-Strike engine. Bedrock exposes player velocity and impulses through its Script API, so the exact Source-engine physics cannot be reproduced 1:1.

API reference: https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/entity
