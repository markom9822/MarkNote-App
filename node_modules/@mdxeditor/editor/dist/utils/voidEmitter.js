import { noop } from "./fp.js";
function voidEmitter() {
  let subscription = noop;
  return {
    publish: () => {
      subscription();
    },
    subscribe: (cb) => {
      subscription = cb;
    }
  };
}
export {
  voidEmitter
};
