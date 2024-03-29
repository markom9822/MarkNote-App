function uuidv4() {
  const hex = [...Array(256).keys()].map((index) => index.toString(16).padStart(2, "0"));
  const r = crypto.getRandomValues(new Uint8Array(16));
  r[6] = r[6] & 15 | 64;
  r[8] = r[8] & 63 | 128;
  return [...r.entries()].map(([index, int]) => [4, 6, 8, 10].includes(index) ? `-${hex[int]}` : hex[int]).join("");
}
export {
  uuidv4
};
