# MineHop — CS-style Bunnyhop for Minecraft Bedrock

Target: Minecraft Bedrock v26.52.

MineHop recreates the *movement feel* of classic Counter-Strike bunnyhopping as closely as Bedrock scripting allows. The pack uses the Bedrock Script API for player input and movement. Microsoft documents `InputInfo.getMovementVector()` and `getButtonState()` for player input. citeturn1search1turn1search0

## What is new

### Easy movement settings

You do **not** need to edit `scripts/main.js`.

Open:

`minehop/settings.js`

Change these values:

- `MAX_SPEED` — maximum horizontal speed
- `GROUND_ACCEL` — acceleration while grounded
- `AIR_ACCEL` — air/strafe acceleration
- `AIR_SPEED` — target air speed
- `GROUND_FRICTION` — how quickly you slow down on the ground
- `JUMP_VELOCITY` — jump strength
- `AUTO_BHOP` — `true` or `false`

Example:

```js
MAX_SPEED: 1.20,
AIR_ACCEL: 0.080,
JUMP_VELOCITY: 0.45,
AUTO_BHOP: true
```

After changing settings, you must rebuild/repackage the add-on before importing the updated version into Minecraft.

## Automatic import

The final distribution is designed to contain:

```text
MineHop-CS-Style-Bhop-v1.0.1.mcpack
INSTALL_MineHop.bat
```

1. Download the MineHop ZIP.
2. Extract the ZIP.
3. Open the extracted MineHop folder.
4. Double-click **INSTALL_MineHop.bat**.
5. The BAT file launches the `.mcpack` file.
6. Windows/Minecraft should open the pack importer automatically.
7. Activate the MineHop behavior pack in your world.

A `.mcpack` is a ZIP-based Minecraft Bedrock pack format intended for transferring resource or behavior packs. citeturn0search14

If Windows does not open Minecraft automatically, right-click the `.mcpack` and choose **Open with → Minecraft**.

## In Minecraft

1. Create or edit a world.
2. Open **Behavior Packs**.
3. Activate **MineHop - CS Style Bhop**.
4. Enable any scripting/API option your particular Bedrock build asks for.
5. Enter the world.
6. Hold Jump while moving.
7. Use A/D and mouse turning to practice air strafing.

## Project layout

```text
minehop/
├── manifest.json
├── settings.js
├── scripts/
│   └── main.js
├── INSTALL_MineHop.bat
└── README.md
```

The manifest is the file Minecraft uses to identify and load the pack, and script modules declare their JavaScript entry point and Script API dependency. citeturn0search0turn0search2

## Important

This is a **Bedrock recreation of CS-style bhop**, not the original Counter-Strike/Source engine. Bedrock's physics and Script API are different, so exact 1:1 Source-engine physics cannot be guaranteed.

The GitHub repo is:

https://github.com/saeedkarimzai9/mc-mods
