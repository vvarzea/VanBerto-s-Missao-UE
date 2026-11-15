/*************************************************
 * VanBerto's — A Missão Europa 🇪🇺  ·  flags.js
 * Bandeiras desenhadas em SVG (os emojis de bandeiras não aparecem no Windows).
 * Uso: flagHTML("PT") → <svg> pronto a pôr no HTML (viewBox 30×20, proporção 3:2).
 *************************************************/
const R = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
const V3 = (a, b, c) => R(0, 0, 10, 20, a) + R(10, 0, 10, 20, b) + R(20, 0, 10, 20, c);
const H3 = (a, b, c) => R(0, 0, 30, 6.67, a) + R(0, 6.67, 30, 6.67, b) + R(0, 13.33, 30, 6.67, c);
function stars(cx, cy, r, n, R2, fill) {
  let o = "";
  for (let k = 0; k < n; k++) {
    const a = -Math.PI / 2 + k * 2 * Math.PI / n, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
    let p = "";
    for (let i = 0; i < 10; i++) { const t = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? R2 * 0.42 : R2; p += (i ? "L" : "M") + (x + Math.cos(t) * rr).toFixed(2) + " " + (y + Math.sin(t) * rr).toFixed(2); }
    o += `<path d="${p}Z" fill="${fill}"/>`;
  }
  return o;
}
const FLAGS = {
  EU: () => R(0, 0, 30, 20, "#003399") + stars(15, 10, 6.2, 12, 1.5, "#ffcc00"),
  PT: () => R(0, 0, 12, 20, "#046a38") + R(12, 0, 18, 20, "#da291c") +
        `<circle cx="12" cy="10" r="3.6" fill="#ffe000" stroke="#da291c" stroke-width=".5"/><path d="M10.2 8.4h3.6v2.6a1.8 1.9 0 0 1-3.6 0z" fill="#fff" stroke="#da291c" stroke-width=".7"/>`,
  ES: () => R(0, 0, 30, 5, "#c60b1e") + R(0, 5, 30, 10, "#ffc400") + R(0, 15, 30, 5, "#c60b1e"),
  FR: () => V3("#0055a4", "#ffffff", "#ef4135"),
  IT: () => V3("#009246", "#ffffff", "#ce2b37"),
  BE: () => V3("#000000", "#fdda24", "#ef3340"),
  IE: () => V3("#169b62", "#ffffff", "#ff883e"),
  RO: () => V3("#002b7f", "#fcd116", "#ce1126"),
  DE: () => H3("#000000", "#dd0000", "#ffce00"),
  NL: () => H3("#ae1c28", "#ffffff", "#21468b"),
  HU: () => H3("#cd2a3e", "#ffffff", "#436f4d"),
  AT: () => R(0, 0, 30, 6.67, "#ed2939") + R(0, 6.67, 30, 6.66, "#ffffff") + R(0, 13.33, 30, 6.67, "#ed2939"),
  PL: () => R(0, 0, 30, 10, "#ffffff") + R(0, 10, 30, 10, "#dc143c"),
  SE: () => R(0, 0, 30, 20, "#006aa7") + R(9, 0, 4, 20, "#fecc00") + R(0, 8, 30, 4, "#fecc00"),
  FI: () => R(0, 0, 30, 20, "#ffffff") + R(8, 0, 5, 20, "#003580") + R(0, 7.5, 30, 5, "#003580"),
  DK: () => R(0, 0, 30, 20, "#c8102e") + R(9, 0, 3.4, 20, "#ffffff") + R(0, 8.3, 30, 3.4, "#ffffff"),
  GR: () => {
    let s = R(0, 0, 30, 20, "#0d5eaf");
    for (let i = 0; i < 4; i++) s += R(0, (1 + 2 * i) * 20 / 9, 30, 20 / 9, "#ffffff");
    s += R(0, 0, 11.1, 11.1, "#0d5eaf") + R(4.4, 0, 2.3, 11.1, "#ffffff") + R(0, 4.4, 11.1, 2.3, "#ffffff");
    return s;
  }
};
export function flagHTML(code, cls = "quiz-flag") {
  const f = FLAGS[code]; if (!f) return "";
  return `<svg class="${cls}" viewBox="0 0 30 20" role="img" aria-label="Bandeira" xmlns="http://www.w3.org/2000/svg">${f()}<rect x=".3" y=".3" width="29.4" height="19.4" fill="none" stroke="#0a2466" stroke-width=".6"/></svg>`;
}
export const FLAG_CODES = Object.keys(FLAGS);
