function makeHslTransparent(hsl, alpha) {
  return hsl.replace("hsl", "hsla").replace(")", `, ${alpha})`);
}
export {
  makeHslTransparent
};
