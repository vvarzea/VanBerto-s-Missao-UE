/*************************************************
 * Arte dos bosses (imagens recortadas) + projéteis novos.
 * Cada boss é uma PNG com fundo transparente; aqui desenhamos, para cada um,
 * a textura "boss_<id>" (e as variantes _ouch / _angry / _sad / _laugh que o
 * motor já usa) numa tela de 232×232 — o dobro da antiga (116×116) — para a
 * hitbox e o tamanho no ecrã ficarem iguais (bossScale 0.75 em vez de 1.5).
 *************************************************/
// Cada boss tem 7 poses (imagem enviada): 0 normal · 1 riso · 2 ataque · 3 espanto (ouch) · 4 zangado · 5 salto · 6 triste
export const BOSS_ART_FILES = {
  guardiao_mapas:    "guardiao",   // 🗺️ Guardião dos Mapas
  dragao_confusao: "dragao",     // 🐉 Dragão da Confusão Cultural
  titan_discordia:        "tita",       // 🤖 Titã da Discórdia
  sombra_indiferenca:   "sombra"      // 🌑 Sombra da Indiferença
};
// URL da pose de um boss (0 normal · 1 riso · 2 ataque · 3 espanto · 4 zangado · 5 salto · 6 triste)
export function bossPoseUrl(id, pose) { const nm = BOSS_ART_FILES[id]; return nm ? "boss/" + nm + "_" + pose + ".webp" : ""; }
const POSE_OF = { "": 0, "_laugh": 1, "_armsdown": 2, "_ouch": 3, "_angry": 4, "_sad": 6 };

export function loadBossArt(scene) {
  Object.entries(BOSS_ART_FILES).forEach(([id, nm]) => {
    for (let i = 0; i < 7; i++) {
      const key = "bossimg_" + id + "_" + i;
      if (!scene.textures.exists(key)) scene.load.image(key, "boss/" + nm + "_" + i + ".webp");
    }
  });
}

function canvasTex(scene, key, w, h) {
  if (scene.textures.exists(key)) scene.textures.remove(key);
  const t = scene.textures.createCanvas(key, w, h);
  return { t, c: t.getContext() };
}

export function buildBossArt(scene) {
  const S = 232;
  Object.keys(BOSS_ART_FILES).forEach(id => {
    const imgs = [];
    for (let i = 0; i < 7; i++) {
      const k = "bossimg_" + id + "_" + i;
      imgs.push(scene.textures.exists(k) ? scene.textures.get(k).getSourceImage() : null);
    }
    if (!imgs[0] || !imgs[0].width) return;                      // sem imagens → mantém o desenho antigo
    const k0 = Math.min(210 / imgs[0].width, 212 / imgs[0].height);   // escala comum a todas as poses
    const draw = (c, pose) => {
      const img = (imgs[pose] && imgs[pose].width) ? imgs[pose] : imgs[0];
      const k = Math.min(k0, 226 / img.width, 214 / img.height);
      const w = img.width * k, h = img.height * k;
      c.clearRect(0, 0, S, S);
      c.drawImage(img, (S - w) / 2, 214 - h, w, h);              // pés a ~107px do centro
    };
    const done = new Set();
    Object.entries(POSE_OF).forEach(([suffix, pose]) => {
      const { t, c } = canvasTex(scene, "boss_" + id + suffix, S, S);
      draw(c, pose); t.refresh(); done.add("boss_" + id + suffix);
    });
    // Outras variantes do desenho antigo (ex.: "_blink") passam a mostrar a pose normal
    scene.textures.getTextureKeys().filter(k => k.startsWith("boss_" + id + "_") && !done.has(k)).forEach(k => {
      const { t, c } = canvasTex(scene, k, S, S);
      draw(c, 0); t.refresh();
    });
  });

  // ----- projéteis novos (30×30) -----
  if (!scene.textures.exists("boss_proj_globe")) {         // globo azul do Guardião
    const { t, c } = canvasTex(scene, "boss_proj_globe", 30, 30);
    const g = c.createRadialGradient(11, 10, 2, 15, 15, 14);
    g.addColorStop(0, "#d8f4ff"); g.addColorStop(0.5, "#3aa0ff"); g.addColorStop(1, "#1d4ed8");
    c.fillStyle = g; c.beginPath(); c.arc(15, 15, 13, 0, 7); c.fill();
    c.strokeStyle = "rgba(255,255,255,0.85)"; c.lineWidth = 1.4;
    c.beginPath(); c.ellipse(15, 15, 13, 5, 0, 0, 7); c.stroke();
    c.beginPath(); c.ellipse(15, 15, 5, 13, 0, 0, 7); c.stroke();
    c.beginPath(); c.moveTo(2, 15); c.lineTo(28, 15); c.stroke();
    c.strokeStyle = "#0a2466"; c.lineWidth = 2; c.beginPath(); c.arc(15, 15, 13, 0, 7); c.stroke();
    t.refresh();
  }
  if (!scene.textures.exists("boss_proj_notif")) {         // notificação enganadora do Manipulador
    const { t, c } = canvasTex(scene, "boss_proj_notif", 34, 30);
    c.fillStyle = "#ffcc00"; c.strokeStyle = "#0a2466"; c.lineWidth = 2.5;
    c.beginPath(); c.moveTo(6, 3); c.lineTo(28, 3); c.quadraticCurveTo(32, 3, 32, 7); c.lineTo(32, 18);
    c.quadraticCurveTo(32, 22, 28, 22); c.lineTo(15, 22); c.lineTo(8, 28); c.lineTo(9, 22); c.lineTo(6, 22);
    c.quadraticCurveTo(2, 22, 2, 18); c.lineTo(2, 7); c.quadraticCurveTo(2, 3, 6, 3); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = "#0a2466"; c.font = "900 17px Arial"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("!", 17, 13);
    t.refresh();
  }
  if (!scene.textures.exists("boss_proj_data")) {          // pacote de dados da IA
    const { t, c } = canvasTex(scene, "boss_proj_data", 30, 30);
    c.fillStyle = "#0a2466"; c.fillRect(3, 3, 24, 24);
    const g = c.createLinearGradient(0, 0, 30, 30); g.addColorStop(0, "#67e8f9"); g.addColorStop(1, "#a855f7");
    c.fillStyle = g; c.fillRect(5, 5, 20, 20);
    c.fillStyle = "rgba(255,255,255,0.9)"; c.fillRect(8, 9, 14, 2); c.fillRect(8, 14, 10, 2); c.fillRect(8, 19, 12, 2);
    t.refresh();
  }
}
