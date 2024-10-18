import {
  l,
  t
} from "./chunk-QGXSMSVG.js";
import {
  a as a2,
  d,
  i,
  o,
  o2,
  s
} from "./chunk-BOGKFJIR.js";
import {
  a,
  c,
  e as e3,
  u,
  u2,
  v
} from "./chunk-OZU5SXW3.js";
import {
  clsx_m_default,
  e,
  e2,
  n
} from "./chunk-JBZKBSH2.js";
import {
  init_emotion_react_browser_development_esm,
  jsx
} from "./chunk-SHJLP4GB.js";
import "./chunk-2IH3JZ3W.js";
import "./chunk-PAHICXFQ.js";
import {
  require_react
} from "./chunk-UMBEC6V5.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/@table-library/react-table-library/select.js
var n2 = __toESM(require_react());
init_emotion_react_browser_development_esm();

// node_modules/@table-library/react-table-library/colors-953946b8.js
var b = "#e0e0e0";

// node_modules/@table-library/react-table-library/index-7b379f2c.js
var t3 = __toESM(require_react(), 1);

// node_modules/@table-library/react-table-library/fromTreeToList-272db833.js
var t2 = function e4(r, n3) {
  return r.reduce(function(r2, t4) {
    return r2 || (t4.id === n3 ? t4 : t4.nodes ? e4(t4.nodes, n3) : r2);
  }, null);
};
var u3 = function e5(r) {
  return (r || []).reduce(function(r2, n3) {
    return r2 = r2.concat(n3), n3.nodes && (r2 = r2.concat(e5(n3.nodes))), r2;
  }, []);
};

// node_modules/@table-library/react-table-library/index-7b379f2c.js
var d2 = function(n3, e6) {
  return n3.every(function(n4) {
    return e6.includes(n4);
  });
};
function c2(n3, e6) {
  var r = Object.keys(n3);
  if (Object.getOwnPropertySymbols) {
    var t4 = Object.getOwnPropertySymbols(n3);
    e6 && (t4 = t4.filter(function(e7) {
      return Object.getOwnPropertyDescriptor(n3, e7).enumerable;
    })), r.push.apply(r, t4);
  }
  return r;
}
function l2(n3) {
  for (var e6 = 1; e6 < arguments.length; e6++) {
    var t4 = null != arguments[e6] ? arguments[e6] : {};
    e6 % 2 ? c2(Object(t4), true).forEach(function(e7) {
      e2(n3, e7, t4[e7]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n3, Object.getOwnPropertyDescriptors(t4)) : c2(Object(t4)).forEach(function(e7) {
      Object.defineProperty(n3, e7, Object.getOwnPropertyDescriptor(t4, e7));
    });
  }
  return n3;
}
var s2 = "ADD_BY_ID";
var f = "REMOVE_BY_ID";
var y = "ADD_BY_IDS";
var p = "REMOVE_BY_IDS";
var I = "ADD_BY_ID_EXCLUSIVELY";
var v2 = "REMOVE_BY_ID_EXCLUSIVELY";
var b2 = "ADD_ALL";
var g = "REMOVE_ALL";
var m = function(n3, r) {
  switch (r.type) {
    case s2:
      return function(n4, e6) {
        return l2(l2({}, n4), {}, { id: null, ids: n4.ids.concat(e6.payload.id) });
      }(n3, r);
    case f:
      return function(n4, e6) {
        return l2(l2({}, n4), {}, { id: null, ids: n4.ids.filter(function(n5) {
          return n5 !== e6.payload.id;
        }) });
      }(n3, r);
    case y:
      return function(n4, r2) {
        var t4 = r2.payload.options.isCarryForward && null != n4.id ? u(Array.from(new Set(r2.payload.ids.concat(n4.id)))) : n4.ids.concat(r2.payload.ids);
        return l2(l2({}, n4), {}, { id: null, ids: t4 });
      }(n3, r);
    case p:
      return function(n4, e6) {
        return l2(l2({}, n4), {}, { id: null, ids: n4.ids.filter(function(n5) {
          return !e6.payload.ids.includes(n5);
        }) });
      }(n3, r);
    case I:
      return function(n4, e6) {
        return l2(l2({}, n4), {}, { id: e6.payload.id, ids: [] });
      }(n3, r);
    case v2:
      return function(n4) {
        return l2(l2({}, n4), {}, { id: null, ids: [] });
      }(n3);
    case b2:
      return function(n4, r2) {
        return l2(l2({}, n4), {}, { id: null, ids: u(Array.from(new Set([].concat(u(n4.ids), u(r2.payload.ids))))) });
      }(n3, r);
    case g:
      return function(n4) {
        return l2(l2({}, n4), {}, { id: null, ids: [] });
      }(n3);
    case "SET":
      return function(n4, e6) {
        return l2(l2({}, n4), e6.payload);
      }(n3, r);
    default:
      throw new Error();
  }
};
var A = { isCarryForward: true, isPartialToAll: false };
var C = function(n3) {
  return l2(l2({}, A), n3);
};
var O = function(n3, r) {
  var t4 = t2(r, n3);
  return [t4].concat(u(u3(null == t4 ? void 0 : t4.nodes))).map(function(n4) {
    return n4.id;
  });
};
var S = function(e6, r, i2, c3) {
  var A2 = e3(m, r, [], [i2], c3), S2 = a(A2, 2), E = S2[0], T2 = S2[1], h = t3.useRef({ lastToggledId: null, currentShiftIds: [] }), B2 = !E.ids.length, D = !!e6.nodes.length && d2(e6.nodes.map(function(n3) {
    return n3.id;
  }), E.ids), j2 = t3.useCallback(function(n3) {
    return T2({ type: s2, payload: { id: n3 } });
  }, [T2]), k2 = t3.useCallback(function(n3) {
    return T2({ type: f, payload: { id: n3 } });
  }, [T2]), _ = t3.useCallback(function(n3) {
    E.ids.includes(n3) ? k2(n3) : j2(n3), h.current.lastToggledId = n3, h.current.currentShiftIds = [];
  }, [E, j2, k2]), P2 = t3.useCallback(function(n3, e7) {
    var r2 = C(e7);
    T2({ type: y, payload: { ids: n3, options: r2 } });
  }, [T2]), w = t3.useCallback(function(n3) {
    T2({ type: p, payload: { ids: n3 } });
  }, [T2]), R2 = t3.useCallback(function(n3, r2) {
    var t4, o3, i3 = C(r2), u4 = O(n3, e6.nodes);
    i3.isPartialToAll || (t4 = u4, o3 = E.ids, t4.every(function(n4) {
      return !o3.includes(n4);
    }) ? P2(u4, i3) : w(u4)), i3.isPartialToAll && (d2(u4, E.ids) ? w(u4) : P2(u4, i3)), h.current.lastToggledId = n3, h.current.currentShiftIds = [];
  }, [e6.nodes, E.ids, P2, w]), L = t3.useCallback(function(n3, r2) {
    var t4 = C(r2), o3 = O(n3, e6.nodes);
    P2(o3, t4);
  }, [e6.nodes, P2]), Y = t3.useCallback(function(n3) {
    var r2 = O(n3, e6.nodes);
    w(r2);
  }, [e6.nodes, w]), x2 = t3.useCallback(function(n3) {
    T2({ type: I, payload: { id: n3 } });
  }, [T2]), V = t3.useCallback(function() {
    T2({ type: v2 });
  }, [T2]), M = t3.useCallback(function(n3) {
    n3 === E.id ? V() : x2(n3), h.current.lastToggledId = n3, h.current.currentShiftIds = [];
  }, [E, V, x2]), F = t3.useCallback(function(n3) {
    T2({ type: b2, payload: { ids: n3 } });
  }, [T2]), U = t3.useCallback(function() {
    T2({ type: g });
  }, [T2]), X = t3.useCallback(function(n3) {
    var r2 = C(n3), t4 = u3(e6.nodes).map(function(n4) {
      return n4.id;
    });
    r2.isPartialToAll || (B2 ? F(t4) : U()), r2.isPartialToAll && (D ? U() : F(t4));
  }, [e6.nodes, B2, F, U, D]), q = t3.useCallback(function(n3, r2, t4) {
    var o3 = C(r2);
    h.current.currentShiftIds.length && (w(h.current.currentShiftIds), h.current.currentShiftIds = []);
    var i3 = h.current.lastToggledId, u4 = n3, a3 = t4(e6.nodes).map(function(n4) {
      return n4.id;
    }), d3 = a3.findIndex(function(n4) {
      return n4 === i3;
    }), c4 = a3.findIndex(function(n4) {
      return n4 === u4;
    });
    if (d3 > c4) {
      var l3 = [c4, d3];
      d3 = l3[0], c4 = l3[1];
    }
    var s3 = a3.slice(d3, c4 + 1);
    P2(s3, o3), h.current.currentShiftIds = s3;
  }, [e6.nodes, P2, w]);
  c(r, E, function() {
    return T2({ type: "SET", payload: r });
  });
  var z = t3.useMemo(function() {
    return { onAddById: j2, onRemoveById: k2, onToggleById: _, onAddByIds: P2, onRemoveByIds: w, onToggleByIdRecursively: R2, onAddByIdRecursively: L, onRemoveByIdRecursively: Y, onAddByIdExclusively: x2, onRemoveByIdExclusively: V, onToggleByIdExclusively: M, onToggleByIdShift: q, onAddAll: F, onRemoveAll: U, onToggleAll: X };
  }, [F, j2, P2, U, k2, w, x2, V, M, X, _, R2, q, L, Y]);
  return [l2(l2({}, E), {}, { none: B2, all: D }), z];
};

// node_modules/@table-library/react-table-library/select.js
var j = false ? { name: "e0dnmk", styles: "cursor:pointer" } : { name: "e0dnmk", styles: "cursor:pointer", map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ21CIiwiZmlsZSI6InN0eWxlcy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XHJcbmV4cG9ydCBkZWZhdWx0IGNzcyBgXG4gIGN1cnNvcjogcG9pbnRlcjtcbmA7XHJcbiJdfQ== */", toString: function() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
} };
var v3 = n2.forwardRef(function(e6, t4) {
  return jsx("input", n({ type: "checkbox", ref: t4 }, e6, { css: j }));
});
var C2 = function(e6) {
  var t4 = e6.checked, o3 = e6.isIndeterminate, r = e6.onChange;
  return jsx(v3, { ref: function(e7) {
    e7 && (t4 ? (e7.indeterminate = false, e7.checked = true) : o3 ? (e7.indeterminate = true, e7.checked = false) : (e7.indeterminate = false, e7.checked = false));
  }, type: "checkbox", onChange: r });
};
var k = ["item"];
var T = n2.memo(function(t4) {
  var i2 = t4.item, a3 = e(t4, k), u4 = a2(), m2 = d(), b3 = i();
  if (!u4)
    throw new Error("No Select Context. No return value from useRowSelect provided to Table component.");
  var y2 = u4.options.buttonSelect === l.SingleSelect && u4.state.id === i2.id || u4.state.ids.includes(i2.id), g2 = n2.useCallback(function() {
    var t5 = u4.options.buttonSelect === l.MultiSelect;
    b3 && t5 ? u4.fns.onToggleByIdShift(i2.id, u4.options, o2(m2)) : t5 ? u4.fns.onToggleByIdRecursively(i2.id, { isCarryForward: u4.options.isCarryForward, isPartialToAll: u4.options.isPartialToAll }) : u4.fns.onToggleByIdExclusively(i2.id);
  }, [b3, m2, i2.id, u4]);
  return jsx(o, n({ stiff: true }, a3), jsx(C2, { checked: !!y2, onChange: g2 }));
});
var I2 = n2.memo(function(t4) {
  var r = a2();
  if (!r)
    throw new Error("No Select Context. No return value from useRowSelect provided to Table component.");
  var n3 = r.state.all, i2 = !r.state.all && !r.state.none || r.options.buttonSelect === l.SingleSelect && null != r.state.id;
  return jsx(v, n({ stiff: true }, t4), jsx(C2, { checked: !!n3, isIndeterminate: i2, onChange: function() {
    return r.fns.onToggleAll({ isPartialToAll: r.options.isPartialToAll });
  } }));
});
function O2(e6, t4) {
  var o3 = Object.keys(e6);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e6);
    t4 && (r = r.filter(function(t5) {
      return Object.getOwnPropertyDescriptor(e6, t5).enumerable;
    })), o3.push.apply(o3, r);
  }
  return o3;
}
function P(e6) {
  for (var t4 = 1; t4 < arguments.length; t4++) {
    var o3 = null != arguments[t4] ? arguments[t4] : {};
    t4 % 2 ? O2(Object(o3), true).forEach(function(t5) {
      e2(e6, t5, o3[t5]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e6, Object.getOwnPropertyDescriptors(o3)) : O2(Object(o3)).forEach(function(t5) {
      Object.defineProperty(e6, t5, Object.getOwnPropertyDescriptor(o3, t5));
    });
  }
  return e6;
}
var B = function(o3, r) {
  var n3 = o3.item, c3 = r.select;
  if (!c3)
    throw new Error("No 'select' in getRowProps. That's odd");
  var s3 = c3.state.ids.includes(n3.id), l3 = c3.state.id === n3.id;
  return { theme: "\n    &.row-select-selected,\n    &.row-select-single-selected {\n      font-weight: bold;\n\n      background-color: ".concat(b, ";\n    }\n\n    &.row-select-clickable {\n      cursor: pointer;\n    }\n  "), className: clsx_m_default("row-select", { "row-select-clickable": c3.options.clickType === t.RowClick, "row-select-selected": s3, "row-select-single-selected": l3 }), onClick: function(o4, n4) {
    if (s(n4) && c3.options.clickType === t.RowClick) {
      var i2 = c3.options.rowSelect === l.MultiSelect || c3.options.buttonSelect === l.MultiSelect, s4 = c3.options.rowSelect === l.MultiSelect, l4 = !!n4.metaKey, a3 = !!n4.shiftKey;
      l4 && i2 ? c3.fns.onToggleById(o4.id) : a3 && i2 ? c3.fns.onToggleByIdShift(o4.id, c3.options, o2(r)) : s4 ? c3.fns.onToggleById(o4.id) : c3.fns.onToggleByIdExclusively(o4.id);
    }
  } };
};
var N = { ids: [], id: null };
var x = { clickType: t.RowClick, rowSelect: l.SingleSelect, buttonSelect: l.MultiSelect, isCarryForward: true, isPartialToAll: false };
var R = function(e6, t4, o3, r) {
  var n3, i2 = P(P({}, N), null !== (n3 = null == t4 ? void 0 : t4.state) && void 0 !== n3 ? n3 : {}), c3 = null != t4 && t4.onChange ? t4.onChange : function() {
  }, s3 = S(e6, i2, c3, r), l3 = a(s3, 2), a3 = l3[0], d3 = l3[1];
  return u2("select", r, a3), { state: a3, fns: d3, options: P(P({}, x), null != o3 ? o3 : {}), _getRowProps: B, components: { HeaderCellSelect: I2, CellSelect: T } };
};
export {
  T as CellSelect,
  C2 as Checkbox,
  I2 as HeaderCellSelect,
  t as SelectClickTypes,
  l as SelectTypes,
  R as useRowSelect
};
//# sourceMappingURL=@table-library_react-table-library_select.js.map
