// Tiles TEMPORALES del museo, dibujados con código (16×16 px) en los colores del sitio.
// Cuando tengas tu tileset, se reemplaza drawTile por recortes de tu imagen.
import { TILE, museumMap } from "@/data/museum";

type Ctx = CanvasRenderingContext2D;

const C = {
  wallTop: "#150408",
  wallTopEdge: "#3a1520",
  wall: "#3a1a26",
  wallPanel: "#45202d",
  wallTrim: "#f09a97",
  wainscot: "#2a0d14",
  wood: "#4a2228",
  woodDark: "#3a1a1f",
  woodLight: "#5a2c33",
  marbleA: "#5c2c34",
  marbleB: "#4d2329",
  carpet: "#7a1f35",
  carpetDot: "#962a45",
  carpetEdge: "#f7d58b",
  stone: "#cbb3aa",
  stoneDark: "#9a8079",
  stoneLight: "#e6d2c9",
  pot: "#8a4a2a",
  potDark: "#5e2f1a",
  leaf: "#3f8f5a",
  leafLight: "#6fca86",
  deskTop: "#8a5236",
  desk: "#5e3322",
  gold: "#f7d58b",
  goldDark: "#b8862e",
  black: "#0b0305",
};

const rect = (ctx: Ctx, x: number, y: number, w: number, h: number, color: string) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const at = (x: number, y: number) => museumMap[y]?.[x] ?? "#";
const isWall = (x: number, y: number) => at(x, y) === "#";

/** Una pared muestra su "cara" si debajo (a 3 casillas o menos) hay piso; si no, se ve el borde superior. */
function wallFaceRow(x: number, y: number) {
  for (let d = 1; d <= 3; d++) {
    if (!isWall(x, y + d)) return d; // d = 1 es la fila de abajo de la pared
  }
  return 0;
}

function floor(ctx: Ctx, px: number, py: number, x: number, y: number) {
  const lobby = x >= 22 && y >= 12;
  if (lobby) {
    // Mármol a cuadros
    rect(ctx, px, py, TILE, TILE, (x + y) % 2 ? C.marbleA : C.marbleB);
    rect(ctx, px, py, TILE, 1, "#6a343d");
    return;
  }
  // Tablas de madera
  rect(ctx, px, py, TILE, TILE, C.wood);
  rect(ctx, px, py + 7, TILE, 1, C.woodDark);
  rect(ctx, px, py + 15, TILE, 1, C.woodDark);
  const seam = (x * 7 + y * 3) % 12;
  rect(ctx, px + seam, py, 1, 7, C.woodDark);
  rect(ctx, px + ((seam + 6) % 14), py + 8, 1, 7, C.woodDark);
  rect(ctx, px + 2, py + 2, 3, 1, C.woodLight);
}

function wall(ctx: Ctx, px: number, py: number, x: number, y: number) {
  const face = wallFaceRow(x, y);
  if (!face) {
    rect(ctx, px, py, TILE, TILE, C.wallTop);
    // borde visible donde la parte de arriba se junta con piso o con cara de pared
    if (!isWall(x, y + 1) || wallFaceRow(x, y + 1)) rect(ctx, px, py + 14, TILE, 2, C.wallTopEdge);
    if (!isWall(x - 1, y)) rect(ctx, px, py, 2, TILE, C.wallTopEdge);
    if (!isWall(x + 1, y)) rect(ctx, px + 14, py, 2, TILE, C.wallTopEdge);
    return;
  }
  rect(ctx, px, py, TILE, TILE, C.wall);
  // paneles verticales
  rect(ctx, px + 7, py, 2, TILE, C.wallPanel);
  if (face === 1) {
    // fila de abajo: zócalo oscuro con una línea rosada
    rect(ctx, px, py + 10, TILE, 6, C.wainscot);
    rect(ctx, px, py + 10, TILE, 1, C.wallTrim);
  }
  // fila de más arriba: moldura bajo el techo
  if (!wallFaceRow(x, y - 1)) rect(ctx, px, py, TILE, 2, C.wallTopEdge);
}

function carpet(ctx: Ctx, px: number, py: number, x: number, y: number) {
  rect(ctx, px, py, TILE, TILE, C.carpet);
  if ((x + y) % 2 === 0) rect(ctx, px + 7, py + 7, 2, 2, C.carpetDot);
  // borde dorado donde termina la alfombra
  if (at(x - 1, y) !== "_" && at(x - 1, y) !== "#") rect(ctx, px, py, 1, TILE, C.carpetEdge);
  if (at(x + 1, y) !== "_" && at(x + 1, y) !== "#") rect(ctx, px + 15, py, 1, TILE, C.carpetEdge);
  if (at(x, y - 1) !== "_" && at(x, y - 1) !== "#") rect(ctx, px, py, TILE, 1, C.carpetEdge);
  if (at(x, y + 1) !== "_" && at(x, y + 1) !== "#" && at(x, y + 1) !== "D") rect(ctx, px, py + 15, TILE, 1, C.carpetEdge);
}

function pedestal(ctx: Ctx, px: number, py: number) {
  rect(ctx, px + 1, py + 12, 14, 3, "#00000055"); // sombra
  rect(ctx, px + 2, py + 4, 12, 9, C.stoneDark);
  rect(ctx, px + 1, py + 2, 14, 4, C.stone);
  rect(ctx, px + 1, py + 2, 14, 1, C.stoneLight);
  rect(ctx, px + 2, py + 12, 12, 2, C.stone);
  rect(ctx, px + 6, py + 8, 4, 2, C.gold); // placa
}

function plant(ctx: Ctx, px: number, py: number) {
  rect(ctx, px + 4, py + 10, 8, 5, C.pot);
  rect(ctx, px + 4, py + 10, 8, 1, C.potDark);
  rect(ctx, px + 3, py + 3, 10, 7, C.leaf);
  rect(ctx, px + 5, py + 1, 6, 4, C.leaf);
  rect(ctx, px + 5, py + 3, 2, 2, C.leafLight);
  rect(ctx, px + 9, py + 5, 2, 2, C.leafLight);
}

function bench(ctx: Ctx, px: number, py: number) {
  rect(ctx, px, py + 6, TILE, 4, C.deskTop);
  rect(ctx, px, py + 6, TILE, 1, "#a8694a");
  rect(ctx, px + 1, py + 10, 2, 5, C.desk);
  rect(ctx, px + 13, py + 10, 2, 5, C.desk);
}

function desk(ctx: Ctx, px: number, py: number, x: number, y: number) {
  rect(ctx, px, py + 2, TILE, 13, C.desk);
  rect(ctx, px, py + 2, TILE, 4, C.deskTop);
  rect(ctx, px, py + 2, TILE, 1, "#a8694a");
  if (at(x - 1, y) !== "R") rect(ctx, px, py + 2, 1, 13, C.black);
  if (at(x + 1, y) !== "R") rect(ctx, px + 15, py + 2, 1, 13, C.black);
}

function door(ctx: Ctx, px: number, py: number, x: number, y: number) {
  rect(ctx, px, py, TILE, TILE, C.black);
  rect(ctx, px, py + 10, TILE, 6, C.carpet); // tapete
  rect(ctx, px, py + 10, TILE, 1, C.gold);
  if (at(x - 1, y) !== "D") rect(ctx, px, py, 2, TILE, C.gold);
  if (at(x + 1, y) !== "D") rect(ctx, px + 14, py, 2, TILE, C.gold);
}

/** Dibuja todo el mapa (sin personajes) en un canvas fijo, una sola vez. */
export function drawMap(ctx: Ctx) {
  museumMap.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const px = x * TILE;
      const py = y * TILE;
      if (ch === "#") return wall(ctx, px, py, x, y);
      if (ch === "_") return carpet(ctx, px, py, x, y);
      if (ch === "D") return door(ctx, px, py, x, y);
      floor(ctx, px, py, x, y);
      if (ch === "P") pedestal(ctx, px, py);
      if (ch === "p") plant(ctx, px, py);
      if (ch === "b") bench(ctx, px, py);
      if (ch === "R") desk(ctx, px, py, x, y);
    });
  });
}

/** Marco dorado con la obra adentro, colgado en la pared. */
export function drawArtwork(ctx: Ctx, img: CanvasImageSource, x: number, y: number, w: number, h: number) {
  const px = x * TILE + 2;
  const py = y * TILE + 2;
  const pw = w * TILE - 4;
  const ph = h * TILE - 7;
  rect(ctx, px + 1, py + 1, pw, ph, "#00000066"); // sombra
  rect(ctx, px - 1, py - 1, pw + 2, ph + 2, C.goldDark);
  rect(ctx, px, py, pw, ph, C.gold);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(img, px + 2, py + 2, pw - 4, ph - 4);
  ctx.imageSmoothingEnabled = false;
  rect(ctx, px + pw / 2 - 3, py + ph + 2, 6, 2, C.gold); // placa
}

/** Marco del mural, dibujado debajo del toro animado. */
export function drawMuralFrame(ctx: Ctx, x: number, y: number, w: number, h: number) {
  // Ocupa toda la cara de la pared: el toro mide 49 px de alto y debe caber a tamaño real
  const px = x * TILE;
  const py = y * TILE;
  const pw = w * TILE;
  const ph = h * TILE;
  rect(ctx, px, py, pw, ph, "#2a0d14");
  rect(ctx, px, py, pw, 1, C.gold);
  rect(ctx, px, py + ph - 1, pw, 1, C.gold);
  rect(ctx, px, py, 1, ph, C.gold);
  rect(ctx, px + pw - 1, py, 1, ph, C.gold);
}

/** Casillas por donde no se puede caminar. */
export const isSolidTile = (x: number, y: number) => "#PRpb".includes(at(x, y));
