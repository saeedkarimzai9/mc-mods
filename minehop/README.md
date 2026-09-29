# MineHop — CS-style Bunnyhop for Minecraft Bedrock

Target: Minecraft Bedrock v26.52.

## New in v1.0.1

### Easy movement settings

You no longer need to edit the main movement script.

Open:

    minehop/settings.js

Change:

- MAX_SPEED — maximum horizontal speed
- GROUND_ACCEL — ground acceleration
- AIR_ACCEL — air/strafe acceleration
- AIR_SPEED — target air speed
- GROUND_FRICTION — ground slowdown
- JUMP_VELOCITY — jump strength
- AUTO_BHOP — automatic bunnyhop on/off

Example:

    MAX_SPEED: 1.20,
    AIR_ACCEL: 0.080,
    JUMP_VELOCITY: 0.45,
    AUTO_BHOP: true

After changing settings, rebuild/repackage the add-on before importing the updated pack.

## One-click import

The distribution is designed to contain:

    MineHop-CS-Style-Bhop-v1.0.1.mcpack
    INSTALL_MineHop.bat

Extract the downloaded ZIP, then double-click:

    INSTALL_MineHop.bat

The BAT file opens the .mcpack with Windows. If Minecraft is associated with .mcpack files, Minecraft will import it automatically.

## Minecraft setup

1. Open or create a world.
2. Go to Behavior Packs.
3. Activate MineHop.
4. Enable any scripting/API option your Bedrock build requests.
5. Enter the world.
6. Hold Jump while moving.
7. Use A/D plus mouse movement to practice air strafing.

## Important

This is a Bedrock recreation of CS-style bunnyhop, not the original Counter-Strike/Source engine. Bedrock physics and the Script API are different, so exact 1:1 Source-engine physics cannot be guaranteed.
