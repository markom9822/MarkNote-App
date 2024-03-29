const CAN_USE_DOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const IS_APPLE = CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
function controlOrMeta(metaKey, ctrlKey) {
  if (IS_APPLE) {
    return metaKey;
  }
  return ctrlKey;
}
export {
  CAN_USE_DOM,
  IS_APPLE,
  controlOrMeta
};
