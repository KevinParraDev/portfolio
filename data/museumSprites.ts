// Generado a partir de los GIFs de public/img/galery (pixel art a tamaño real, 1 pixel = 1 pixel).
// Para cambiar un personaje, reemplaza su PNG en public/museum/sprites manteniendo el tamaño de cuadro.

export type SpriteSheet = { src: string; width: number; height: number; frames: number; ms: number };

export const sprites = {
  "juan-walk": {
    "src": "/museum/sprites/juan-walk.png",
    "width": 16,
    "height": 23,
    "frames": 8,
    "ms": 90
  },
  "juan-idle": {
    "src": "/museum/sprites/juan-idle.png",
    "width": 16,
    "height": 22,
    "frames": 3,
    "ms": 200
  },
  "kio-host": {
    "src": "/museum/sprites/kio-host.png",
    "width": 15,
    "height": 26,
    "frames": 5,
    "ms": 140
  },
  "kio-blonde": {
    "src": "/museum/sprites/kio-blonde.png",
    "width": 20,
    "height": 23,
    "frames": 6,
    "ms": 140
  },
  "zeri": {
    "src": "/museum/sprites/zeri.png",
    "width": 25,
    "height": 30,
    "frames": 5,
    "ms": 160
  },
  "grecko": {
    "src": "/museum/sprites/grecko.png",
    "width": 23,
    "height": 19,
    "frames": 8,
    "ms": 120
  },
  "robot": {
    "src": "/museum/sprites/robot.png",
    "width": 19,
    "height": 17,
    "frames": 13,
    "ms": 110
  },
  "clock": {
    "src": "/museum/sprites/clock.png",
    "width": 20,
    "height": 17,
    "frames": 9,
    "ms": 120
  },
  "mushroom-a": {
    "src": "/museum/sprites/mushroom-a.png",
    "width": 8,
    "height": 9,
    "frames": 10,
    "ms": 110
  },
  "mushroom-b": {
    "src": "/museum/sprites/mushroom-b.png",
    "width": 8,
    "height": 9,
    "frames": 10,
    "ms": 110
  },
  "slime": {
    "src": "/museum/sprites/slime.png",
    "width": 22,
    "height": 16,
    "frames": 12,
    "ms": 110
  },
  "bull": {
    "src": "/museum/sprites/bull.png",
    "width": 266,
    "height": 49,
    "frames": 53,
    "ms": 100
  }
} satisfies Record<string, SpriteSheet>;

export type SpriteName = keyof typeof sprites;
