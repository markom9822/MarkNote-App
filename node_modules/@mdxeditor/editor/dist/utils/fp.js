function compose(a, b) {
  return (arg) => a(b(arg));
}
function thrush(arg, proc) {
  return proc(arg);
}
function curry2to1(proc, arg1) {
  return (arg2) => proc(arg1, arg2);
}
function curry1to0(proc, arg) {
  return () => proc(arg);
}
function prop(property) {
  return (object) => object[property];
}
function tap(arg, proc) {
  proc(arg);
  return arg;
}
function call(proc) {
  proc();
}
function always(value) {
  return () => value;
}
function joinProc(...procs) {
  return () => {
    procs.map(call);
  };
}
function noop() {
}
export {
  always,
  call,
  compose,
  curry1to0,
  curry2to1,
  joinProc,
  noop,
  prop,
  tap,
  thrush
};
