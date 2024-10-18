import {
  W,
  a,
  u
} from "./chunk-OZU5SXW3.js";
import {
  b,
  clsx_m_default,
  e,
  e2,
  n,
  p
} from "./chunk-JBZKBSH2.js";
import {
  css,
  init_emotion_react_browser_development_esm,
  jsx
} from "./chunk-SHJLP4GB.js";
import {
  require_react
} from "./chunk-UMBEC6V5.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/@table-library/react-table-library/Cell-a4350b14.js
var c = __toESM(require_react(), 1);
init_emotion_react_browser_development_esm();
var i = null;
var r = function() {
  return i || (i = c.createContext(null));
};
var a2 = function() {
  return c.useContext(i);
};
var s = function(c3) {
  return "svg" === c3.target.tagName || "path" === c3.target.tagName || "DIV" === c3.target.tagName || "SPAN" === c3.target.tagName || "TD" === c3.target.tagName;
};
var d = ["index", "className", "hide", "pinLeft", "pinRight", "stiff", "includePreviousColSpan", "previousColSpans", "gridColumnStart", "gridColumnEnd", "onClick", "children", "style"];
function u2(c3, t2) {
  var g = Object.keys(c3);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(c3);
    t2 && (l = l.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(c3, t3).enumerable;
    })), g.push.apply(g, l);
  }
  return g;
}
function A(c3) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var g = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? u2(Object(g), true).forEach(function(t3) {
      e2(c3, t3, g[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(c3, Object.getOwnPropertyDescriptors(g)) : u2(Object(g)).forEach(function(t3) {
      Object.defineProperty(c3, t3, Object.getOwnPropertyDescriptor(g, t3));
    });
  }
  return c3;
}
var o = function(n2) {
  n2.index;
  var i3 = n2.className, r2 = n2.hide, a4 = n2.pinLeft, s3 = n2.pinRight, u4 = n2.stiff, o4 = n2.includePreviousColSpan, m = n2.previousColSpans, G = n2.gridColumnStart, p2 = n2.gridColumnEnd, W2 = n2.onClick, N = n2.children, x = n2.style, y = e(n2, d), H = c.useContext(b), Z = G && p2, J = Z ? p2 - G - 1 : 0, X = o4 ? G + m : G, V = o4 ? p2 + m : p2;
  return jsx(c.Fragment, null, jsx(p, n({ role: "gridcell", "data-table-library_td": "", style: A(A({}, Z ? { gridColumnStart: X, gridColumnEnd: V } : {}), x), css: css(null == H ? void 0 : H.BaseCell, " ", null == H ? void 0 : H.Cell, ";" + (false ? "" : ";label:Cell;"), false ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNlbGwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFCb0IiLCJmaWxlIjoiQ2VsbC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjcyBmcm9tICdjbHN4JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5pbXBvcnQgeyBDZWxsQ29udGFpbmVyIH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vY29tcG9uZW50cy9DZWxsJztcclxuaW1wb3J0IHsgVGhlbWVDb250ZXh0IH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vY29udGV4dC9UaGVtZSc7XHJcbmV4cG9ydCBjb25zdCBDZWxsID0gKHsgaW5kZXgsIGNsYXNzTmFtZSwgaGlkZSwgcGluTGVmdCwgcGluUmlnaHQsIHN0aWZmLCBpbmNsdWRlUHJldmlvdXNDb2xTcGFuLCBwcmV2aW91c0NvbFNwYW5zLCBncmlkQ29sdW1uU3RhcnQsIGdyaWRDb2x1bW5FbmQsIG9uQ2xpY2ssIGNoaWxkcmVuLCBzdHlsZSwgLi4ucmVzdCB9KSA9PiB7XHJcbiAgICBjb25zdCB0aGVtZSA9IFJlYWN0LnVzZUNvbnRleHQoVGhlbWVDb250ZXh0KTtcclxuICAgIGNvbnN0IGhhc0NvbFNwYW4gPSBncmlkQ29sdW1uU3RhcnQgJiYgZ3JpZENvbHVtbkVuZDtcclxuICAgIGNvbnN0IGNvbFNwYW4gPSBoYXNDb2xTcGFuID8gZ3JpZENvbHVtbkVuZCAtIGdyaWRDb2x1bW5TdGFydCAtIDEgOiAwO1xyXG4gICAgY29uc3QgY29tcHV0ZWRHcmlkQ29sdW1uU3RhcnQgPSBpbmNsdWRlUHJldmlvdXNDb2xTcGFuXHJcbiAgICAgICAgPyBncmlkQ29sdW1uU3RhcnQgKyBwcmV2aW91c0NvbFNwYW5zXHJcbiAgICAgICAgOiBncmlkQ29sdW1uU3RhcnQ7XHJcbiAgICBjb25zdCBjb21wdXRlZEdyaWRDb2x1bW5FbmQgPSBpbmNsdWRlUHJldmlvdXNDb2xTcGFuXHJcbiAgICAgICAgPyBncmlkQ29sdW1uRW5kICsgcHJldmlvdXNDb2xTcGFuc1xyXG4gICAgICAgIDogZ3JpZENvbHVtbkVuZDtcclxuICAgIHJldHVybiAoPD5cbiAgICAgIDxDZWxsQ29udGFpbmVyIHJvbGU9XCJncmlkY2VsbFwiIGRhdGEtdGFibGUtbGlicmFyeV90ZD1cIlwiIHN0eWxlPXt7XHJcbiAgICAgICAgICAgIC4uLihoYXNDb2xTcGFuXHJcbiAgICAgICAgICAgICAgICA/IHsgZ3JpZENvbHVtblN0YXJ0OiBjb21wdXRlZEdyaWRDb2x1bW5TdGFydCwgZ3JpZENvbHVtbkVuZDogY29tcHV0ZWRHcmlkQ29sdW1uRW5kIH1cclxuICAgICAgICAgICAgICAgIDoge30pLFxyXG4gICAgICAgICAgICAuLi5zdHlsZSxcclxuICAgICAgICB9fSBjc3M9e2NzcyBgXG4gICAgICAgICAgJHt0aGVtZT8uQmFzZUNlbGx9XG4gICAgICAgICAgJHt0aGVtZT8uQ2VsbH1cbiAgICAgICAgYH0gY2xhc3NOYW1lPXtjcygndGQnLCBjbGFzc05hbWUsIHtcclxuICAgICAgICAgICAgc3RpZmYsXHJcbiAgICAgICAgICAgIGhpZGUsXHJcbiAgICAgICAgICAgICdwaW4tbGVmdCc6IHBpbkxlZnQsXHJcbiAgICAgICAgICAgICdwaW4tcmlnaHQnOiBwaW5SaWdodCxcclxuICAgICAgICB9KX0gb25DbGljaz17b25DbGlja30gey4uLnJlc3R9PlxuICAgICAgICA8ZGl2PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgIDwvQ2VsbENvbnRhaW5lcj5cblxuICAgICAgXG4gICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogY29sU3BhbiB9LCAoKSA9PiAoPENlbGxDb250YWluZXIgY2xhc3NOYW1lPXtjcygndGQnLCAnaGlkZScsICdjb2xzcGFuJyl9Lz4pKX1cbiAgICA8Lz4pO1xyXG59O1xyXG4iXX0= */"), className: clsx_m_default("td", i3, { stiff: u4, hide: r2, "pin-left": a4, "pin-right": s3 }), onClick: W2 }, y), jsx("div", null, N)), Array.from({ length: J }, function() {
    return jsx(p, { className: clsx_m_default("td", "hide", "colspan") });
  }));
};

// node_modules/@table-library/react-table-library/Feature-dc8674d3.js
var t = __toESM(require_react(), 1);
var o2 = null;
var u3 = function() {
  return o2 || (o2 = t.createContext(null));
};
var a3 = function() {
  return t.useContext(o2);
};
var c2 = null;
var s2 = function() {
  return c2 || (c2 = t.createContext(null));
};
var i2 = function() {
  var n2 = t.useState(false), r2 = a(n2, 2), o4 = r2[0], u4 = r2[1];
  return t.useEffect(function() {
    var e3 = function(e4) {
      e4.shiftKey ? u4(true) : o4 && u4(false);
    }, t2 = function() {
      o4 && u4(false);
    };
    return document && (document.addEventListener("keydown", e3), document.addEventListener("keyup", t2)), function() {
      document && (document.removeEventListener("keydown", e3), document.removeEventListener("keyup", t2));
    };
  }, [o4]), o4;
};
var d2 = function() {
  return { select: a3(), tree: a2(), sort: W(), pagination: t.useContext(c2) };
};

// node_modules/@table-library/react-table-library/modifiers-d418f2b2.js
var o3 = function(o4) {
  var i3 = o4.sort, t2 = o4.pagination, a4 = o4.tree;
  return function(o5) {
    var e3 = u(o5);
    return e3 = i3 ? i3.modifier(e3) : e3, e3 = t2 ? t2.modifier(e3) : e3, e3 = a4 ? a4.modifier(e3) : e3;
  };
};

export {
  r,
  s,
  o,
  u3 as u,
  a3 as a,
  s2,
  i2 as i,
  d2 as d,
  o3 as o2
};
//# sourceMappingURL=chunk-BOGKFJIR.js.map
