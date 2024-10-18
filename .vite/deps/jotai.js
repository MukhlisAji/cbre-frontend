import {
  require_react
} from "./chunk-UMBEC6V5.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/jotai/esm/vanilla.mjs
var keyCount = 0;
function atom(read, write) {
  const key = `atom${++keyCount}`;
  const config = {
    toString() {
      return (import.meta.env ? import.meta.env.MODE : void 0) !== "production" && this.debugLabel ? key + ":" + this.debugLabel : key;
    }
  };
  if (typeof read === "function") {
    config.read = read;
  } else {
    config.init = read;
    config.read = defaultRead;
    config.write = defaultWrite;
  }
  if (write) {
    config.write = write;
  }
  return config;
}
function defaultRead(get) {
  return get(this);
}
function defaultWrite(get, set, arg) {
  return set(
    this,
    typeof arg === "function" ? arg(get(this)) : arg
  );
}
var isSelfAtom = (atom2, a) => atom2.unstable_is ? atom2.unstable_is(a) : a === atom2;
var hasInitialValue = (atom2) => "init" in atom2;
var isActuallyWritableAtom = (atom2) => !!atom2.write;
var CONTINUE_PROMISE = Symbol(
  (import.meta.env ? import.meta.env.MODE : void 0) !== "production" ? "CONTINUE_PROMISE" : ""
);
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";
var isContinuablePromise = (promise) => typeof promise === "object" && promise !== null && CONTINUE_PROMISE in promise;
var continuablePromiseMap = /* @__PURE__ */ new WeakMap();
var createContinuablePromise = (promise, abort, complete) => {
  if (!continuablePromiseMap.has(promise)) {
    let continuePromise;
    const p = new Promise((resolve, reject) => {
      let curr = promise;
      const onFulfilled = (me) => (v) => {
        if (curr === me) {
          p.status = FULFILLED;
          p.value = v;
          resolve(v);
          complete();
        }
      };
      const onRejected = (me) => (e) => {
        if (curr === me) {
          p.status = REJECTED;
          p.reason = e;
          reject(e);
          complete();
        }
      };
      promise.then(onFulfilled(promise), onRejected(promise));
      continuePromise = (nextPromise, nextAbort) => {
        if (nextPromise) {
          continuablePromiseMap.set(nextPromise, p);
          curr = nextPromise;
          nextPromise.then(onFulfilled(nextPromise), onRejected(nextPromise));
          abort();
          abort = nextAbort;
        }
      };
    });
    p.status = PENDING;
    p[CONTINUE_PROMISE] = continuePromise;
    continuablePromiseMap.set(promise, p);
  }
  return continuablePromiseMap.get(promise);
};
var isPromiseLike = (x) => typeof (x == null ? void 0 : x.then) === "function";
var isAtomStateInitialized = (atomState) => "v" in atomState || "e" in atomState;
var returnAtomValue = (atomState) => {
  if ("e" in atomState) {
    throw atomState.e;
  }
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !("v" in atomState)) {
    throw new Error("[Bug] atom state is not initialized");
  }
  return atomState.v;
};
var getPendingContinuablePromise = (atomState) => {
  const value = atomState.v;
  if (isContinuablePromise(value) && value.status === PENDING) {
    return value;
  }
  return null;
};
var addPendingContinuablePromiseToDependency = (atom2, promise, dependencyAtomState) => {
  if (!dependencyAtomState.p.has(atom2)) {
    dependencyAtomState.p.add(atom2);
    promise.then(
      () => {
        dependencyAtomState.p.delete(atom2);
      },
      () => {
        dependencyAtomState.p.delete(atom2);
      }
    );
  }
};
var addDependency = (pending, atom2, atomState, a, aState) => {
  var _a;
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && a === atom2) {
    throw new Error("[Bug] atom cannot depend on itself");
  }
  atomState.d.set(a, aState.n);
  const continuablePromise = getPendingContinuablePromise(atomState);
  if (continuablePromise) {
    addPendingContinuablePromiseToDependency(atom2, continuablePromise, aState);
  }
  (_a = aState.m) == null ? void 0 : _a.t.add(atom2);
  if (pending) {
    addPendingDependent(pending, a, atom2);
  }
};
var createPending = () => [/* @__PURE__ */ new Map(), /* @__PURE__ */ new Map(), /* @__PURE__ */ new Set()];
var addPendingAtom = (pending, atom2, atomState) => {
  if (!pending[0].has(atom2)) {
    pending[0].set(atom2, /* @__PURE__ */ new Set());
  }
  pending[1].set(atom2, atomState);
};
var addPendingDependent = (pending, atom2, dependent) => {
  const dependents = pending[0].get(atom2);
  if (dependents) {
    dependents.add(dependent);
  }
};
var getPendingDependents = (pending, atom2) => pending[0].get(atom2);
var addPendingFunction = (pending, fn) => {
  pending[2].add(fn);
};
var flushPending = (pending) => {
  while (pending[1].size || pending[2].size) {
    pending[0].clear();
    const atomStates = new Set(pending[1].values());
    pending[1].clear();
    const functions = new Set(pending[2]);
    pending[2].clear();
    atomStates.forEach((atomState) => {
      var _a;
      return (_a = atomState.m) == null ? void 0 : _a.l.forEach((l) => l());
    });
    functions.forEach((fn) => fn());
  }
};
var buildStore = (getAtomState) => {
  let debugMountedAtoms;
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
    debugMountedAtoms = /* @__PURE__ */ new Set();
  }
  const setAtomStateValueOrPromise = (atom2, atomState, valueOrPromise, abortPromise = () => {
  }, completePromise = () => {
  }) => {
    const hasPrevValue = "v" in atomState;
    const prevValue = atomState.v;
    const pendingPromise = getPendingContinuablePromise(atomState);
    if (isPromiseLike(valueOrPromise)) {
      if (pendingPromise) {
        if (pendingPromise !== valueOrPromise) {
          pendingPromise[CONTINUE_PROMISE](valueOrPromise, abortPromise);
          ++atomState.n;
        }
      } else {
        const continuablePromise = createContinuablePromise(
          valueOrPromise,
          abortPromise,
          completePromise
        );
        if (continuablePromise.status === PENDING) {
          for (const a of atomState.d.keys()) {
            addPendingContinuablePromiseToDependency(
              atom2,
              continuablePromise,
              getAtomState(a, atomState)
            );
          }
        }
        atomState.v = continuablePromise;
        delete atomState.e;
      }
    } else {
      if (pendingPromise) {
        pendingPromise[CONTINUE_PROMISE](
          Promise.resolve(valueOrPromise),
          abortPromise
        );
      }
      atomState.v = valueOrPromise;
      delete atomState.e;
    }
    if (!hasPrevValue || !Object.is(prevValue, atomState.v)) {
      ++atomState.n;
    }
  };
  const readAtomState = (pending, atom2, atomState, force) => {
    if (!(force == null ? void 0 : force(atom2)) && isAtomStateInitialized(atomState)) {
      if (atomState.m) {
        return atomState;
      }
      if (Array.from(atomState.d).every(
        ([a, n]) => (
          // Recursively, read the atom state of the dependency, and
          // check if the atom epoch number is unchanged
          readAtomState(pending, a, getAtomState(a, atomState), force).n === n
        )
      )) {
        return atomState;
      }
    }
    atomState.d.clear();
    let isSync = true;
    const getter = (a) => {
      if (isSelfAtom(atom2, a)) {
        const aState2 = getAtomState(a, atomState);
        if (!isAtomStateInitialized(aState2)) {
          if (hasInitialValue(a)) {
            setAtomStateValueOrPromise(a, aState2, a.init);
          } else {
            throw new Error("no atom init");
          }
        }
        return returnAtomValue(aState2);
      }
      const aState = readAtomState(
        pending,
        a,
        getAtomState(a, atomState),
        force
      );
      if (isSync) {
        addDependency(pending, atom2, atomState, a, aState);
      } else {
        const pending2 = createPending();
        addDependency(pending2, atom2, atomState, a, aState);
        mountDependencies(pending2, atom2, atomState);
        flushPending(pending2);
      }
      return returnAtomValue(aState);
    };
    let controller;
    let setSelf;
    const options = {
      get signal() {
        if (!controller) {
          controller = new AbortController();
        }
        return controller.signal;
      },
      get setSelf() {
        if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !isActuallyWritableAtom(atom2)) {
          console.warn("setSelf function cannot be used with read-only atom");
        }
        if (!setSelf && isActuallyWritableAtom(atom2)) {
          setSelf = (...args) => {
            if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && isSync) {
              console.warn("setSelf function cannot be called in sync");
            }
            if (!isSync) {
              return writeAtom(atom2, ...args);
            }
          };
        }
        return setSelf;
      }
    };
    try {
      const valueOrPromise = atom2.read(getter, options);
      setAtomStateValueOrPromise(
        atom2,
        atomState,
        valueOrPromise,
        () => controller == null ? void 0 : controller.abort(),
        () => {
          if (atomState.m) {
            const pending2 = createPending();
            mountDependencies(pending2, atom2, atomState);
            flushPending(pending2);
          }
        }
      );
      return atomState;
    } catch (error) {
      delete atomState.v;
      atomState.e = error;
      ++atomState.n;
      return atomState;
    } finally {
      isSync = false;
    }
  };
  const readAtom = (atom2) => returnAtomValue(readAtomState(void 0, atom2, getAtomState(atom2)));
  const getDependents = (pending, atom2, atomState) => {
    var _a, _b;
    const dependents = /* @__PURE__ */ new Map();
    for (const a of ((_a = atomState.m) == null ? void 0 : _a.t) || []) {
      dependents.set(a, getAtomState(a, atomState));
    }
    for (const atomWithPendingContinuablePromise of atomState.p) {
      dependents.set(
        atomWithPendingContinuablePromise,
        getAtomState(atomWithPendingContinuablePromise, atomState)
      );
    }
    (_b = getPendingDependents(pending, atom2)) == null ? void 0 : _b.forEach((dependent) => {
      dependents.set(dependent, getAtomState(dependent, atomState));
    });
    return dependents;
  };
  const recomputeDependents = (pending, atom2, atomState) => {
    const topsortedAtoms = [];
    const markedAtoms = /* @__PURE__ */ new Set();
    const visit = (a, aState) => {
      if (markedAtoms.has(a)) {
        return;
      }
      markedAtoms.add(a);
      for (const [d, s] of getDependents(pending, a, aState)) {
        if (a !== d) {
          visit(d, s);
        }
      }
      topsortedAtoms.push([a, aState, aState.n]);
    };
    visit(atom2, atomState);
    const changedAtoms = /* @__PURE__ */ new Set([atom2]);
    const isMarked = (a) => markedAtoms.has(a);
    for (let i = topsortedAtoms.length - 1; i >= 0; --i) {
      const [a, aState, prevEpochNumber] = topsortedAtoms[i];
      let hasChangedDeps = false;
      for (const dep of aState.d.keys()) {
        if (dep !== a && changedAtoms.has(dep)) {
          hasChangedDeps = true;
          break;
        }
      }
      if (hasChangedDeps) {
        readAtomState(pending, a, aState, isMarked);
        mountDependencies(pending, a, aState);
        if (prevEpochNumber !== aState.n) {
          addPendingAtom(pending, a, aState);
          changedAtoms.add(a);
        }
      }
      markedAtoms.delete(a);
    }
  };
  const writeAtomState = (pending, atom2, atomState, ...args) => {
    const getter = (a) => returnAtomValue(readAtomState(pending, a, getAtomState(a, atomState)));
    const setter = (a, ...args2) => {
      const aState = getAtomState(a, atomState);
      let r;
      if (isSelfAtom(atom2, a)) {
        if (!hasInitialValue(a)) {
          throw new Error("atom not writable");
        }
        const hasPrevValue = "v" in aState;
        const prevValue = aState.v;
        const v = args2[0];
        setAtomStateValueOrPromise(a, aState, v);
        mountDependencies(pending, a, aState);
        if (!hasPrevValue || !Object.is(prevValue, aState.v)) {
          addPendingAtom(pending, a, aState);
          recomputeDependents(pending, a, aState);
        }
      } else {
        r = writeAtomState(pending, a, aState, ...args2);
      }
      flushPending(pending);
      return r;
    };
    const result = atom2.write(getter, setter, ...args);
    return result;
  };
  const writeAtom = (atom2, ...args) => {
    const pending = createPending();
    const result = writeAtomState(pending, atom2, getAtomState(atom2), ...args);
    flushPending(pending);
    return result;
  };
  const mountDependencies = (pending, atom2, atomState) => {
    if (atomState.m && !getPendingContinuablePromise(atomState)) {
      for (const a of atomState.d.keys()) {
        if (!atomState.m.d.has(a)) {
          const aMounted = mountAtom(pending, a, getAtomState(a, atomState));
          aMounted.t.add(atom2);
          atomState.m.d.add(a);
        }
      }
      for (const a of atomState.m.d || []) {
        if (!atomState.d.has(a)) {
          atomState.m.d.delete(a);
          const aMounted = unmountAtom(pending, a, getAtomState(a, atomState));
          aMounted == null ? void 0 : aMounted.t.delete(atom2);
        }
      }
    }
  };
  const mountAtom = (pending, atom2, atomState) => {
    if (!atomState.m) {
      readAtomState(pending, atom2, atomState);
      for (const a of atomState.d.keys()) {
        const aMounted = mountAtom(pending, a, getAtomState(a, atomState));
        aMounted.t.add(atom2);
      }
      atomState.m = {
        l: /* @__PURE__ */ new Set(),
        d: new Set(atomState.d.keys()),
        t: /* @__PURE__ */ new Set()
      };
      if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
        debugMountedAtoms.add(atom2);
      }
      if (isActuallyWritableAtom(atom2) && atom2.onMount) {
        const mounted = atomState.m;
        const { onMount } = atom2;
        addPendingFunction(pending, () => {
          const onUnmount = onMount(
            (...args) => writeAtomState(pending, atom2, atomState, ...args)
          );
          if (onUnmount) {
            mounted.u = onUnmount;
          }
        });
      }
    }
    return atomState.m;
  };
  const unmountAtom = (pending, atom2, atomState) => {
    if (atomState.m && !atomState.m.l.size && !Array.from(atomState.m.t).some(
      (a) => {
        var _a;
        return (_a = getAtomState(a, atomState).m) == null ? void 0 : _a.d.has(atom2);
      }
    )) {
      const onUnmount = atomState.m.u;
      if (onUnmount) {
        addPendingFunction(pending, onUnmount);
      }
      delete atomState.m;
      if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
        debugMountedAtoms.delete(atom2);
      }
      for (const a of atomState.d.keys()) {
        const aMounted = unmountAtom(pending, a, getAtomState(a, atomState));
        aMounted == null ? void 0 : aMounted.t.delete(atom2);
      }
      const pendingPromise = getPendingContinuablePromise(atomState);
      if (pendingPromise) {
        pendingPromise[CONTINUE_PROMISE](void 0, () => {
        });
      }
      return void 0;
    }
    return atomState.m;
  };
  const subscribeAtom = (atom2, listener) => {
    const pending = createPending();
    const atomState = getAtomState(atom2);
    const mounted = mountAtom(pending, atom2, atomState);
    flushPending(pending);
    const listeners = mounted.l;
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
      const pending2 = createPending();
      unmountAtom(pending2, atom2, atomState);
      flushPending(pending2);
    };
  };
  const unstable_derive = (fn) => buildStore(...fn(getAtomState));
  const store = {
    get: readAtom,
    set: writeAtom,
    sub: subscribeAtom,
    unstable_derive
  };
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
    const devStore = {
      // store dev methods (these are tentative and subject to change without notice)
      dev4_get_internal_weak_map: () => ({
        get: (atom2) => {
          const atomState = getAtomState(atom2);
          if (atomState.n === 0) {
            return void 0;
          }
          return atomState;
        }
      }),
      dev4_get_mounted_atoms: () => debugMountedAtoms,
      dev4_restore_atoms: (values) => {
        const pending = createPending();
        for (const [atom2, value] of values) {
          if (hasInitialValue(atom2)) {
            const atomState = getAtomState(atom2);
            const hasPrevValue = "v" in atomState;
            const prevValue = atomState.v;
            setAtomStateValueOrPromise(atom2, atomState, value);
            mountDependencies(pending, atom2, atomState);
            if (!hasPrevValue || !Object.is(prevValue, atomState.v)) {
              addPendingAtom(pending, atom2, atomState);
              recomputeDependents(pending, atom2, atomState);
            }
          }
        }
        flushPending(pending);
      }
    };
    Object.assign(store, devStore);
  }
  return store;
};
var createStore = () => {
  const atomStateMap = /* @__PURE__ */ new WeakMap();
  const getAtomState = (atom2) => {
    let atomState = atomStateMap.get(atom2);
    if (!atomState) {
      atomState = { d: /* @__PURE__ */ new Map(), p: /* @__PURE__ */ new Set(), n: 0 };
      atomStateMap.set(atom2, atomState);
    }
    return atomState;
  };
  return buildStore(getAtomState);
};
var defaultStore;
var getDefaultStore = () => {
  if (!defaultStore) {
    defaultStore = createStore();
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      globalThis.__JOTAI_DEFAULT_STORE__ || (globalThis.__JOTAI_DEFAULT_STORE__ = defaultStore);
      if (globalThis.__JOTAI_DEFAULT_STORE__ !== defaultStore) {
        console.warn(
          "Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"
        );
      }
    }
  }
  return defaultStore;
};

// node_modules/jotai/esm/react.mjs
var import_react = __toESM(require_react(), 1);
var StoreContext = (0, import_react.createContext)(
  void 0
);
var useStore = (options) => {
  const store = (0, import_react.useContext)(StoreContext);
  return (options == null ? void 0 : options.store) || store || getDefaultStore();
};
var Provider = ({
  children,
  store
}) => {
  const storeRef = (0, import_react.useRef)();
  if (!store && !storeRef.current) {
    storeRef.current = createStore();
  }
  return (0, import_react.createElement)(
    StoreContext.Provider,
    {
      value: store || storeRef.current
    },
    children
  );
};
var isPromiseLike2 = (x) => typeof (x == null ? void 0 : x.then) === "function";
var use = import_react.default.use || ((promise) => {
  if (promise.status === "pending") {
    throw promise;
  } else if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else {
    promise.status = "pending";
    promise.then(
      (v) => {
        promise.status = "fulfilled";
        promise.value = v;
      },
      (e) => {
        promise.status = "rejected";
        promise.reason = e;
      }
    );
    throw promise;
  }
});
function useAtomValue(atom2, options) {
  const store = useStore(options);
  const [[valueFromReducer, storeFromReducer, atomFromReducer], rerender] = (0, import_react.useReducer)(
    (prev) => {
      const nextValue = store.get(atom2);
      if (Object.is(prev[0], nextValue) && prev[1] === store && prev[2] === atom2) {
        return prev;
      }
      return [nextValue, store, atom2];
    },
    void 0,
    () => [store.get(atom2), store, atom2]
  );
  let value = valueFromReducer;
  if (storeFromReducer !== store || atomFromReducer !== atom2) {
    rerender();
    value = store.get(atom2);
  }
  const delay = options == null ? void 0 : options.delay;
  (0, import_react.useEffect)(() => {
    const unsub = store.sub(atom2, () => {
      if (typeof delay === "number") {
        setTimeout(rerender, delay);
        return;
      }
      rerender();
    });
    rerender();
    return unsub;
  }, [store, atom2, delay]);
  (0, import_react.useDebugValue)(value);
  return isPromiseLike2(value) ? use(value) : value;
}
function useSetAtom(atom2, options) {
  const store = useStore(options);
  const setAtom = (0, import_react.useCallback)(
    (...args) => {
      if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !("write" in atom2)) {
        throw new Error("not writable atom");
      }
      return store.set(atom2, ...args);
    },
    [store, atom2]
  );
  return setAtom;
}
function useAtom(atom2, options) {
  return [
    useAtomValue(atom2, options),
    // We do wrong type assertion here, which results in throwing an error.
    useSetAtom(atom2, options)
  ];
}
export {
  Provider,
  atom,
  createStore,
  getDefaultStore,
  useAtom,
  useAtomValue,
  useSetAtom,
  useStore
};
//# sourceMappingURL=jotai.js.map
