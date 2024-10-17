import {
  r as r3
} from "./chunk-ZO3OH5QR.js";
import {
  d as d2,
  i,
  o,
  o2,
  r as r2,
  s,
  s2,
  u as u2
} from "./chunk-PCWQQJFX.js";
import {
  G as G2,
  a,
  c,
  e as e3,
  u2 as u3,
  v
} from "./chunk-TNUEEKT7.js";
import {
  i as i2,
  o as o3
} from "./chunk-NJTAGPAH.js";
import {
  A,
  G,
  X,
  b,
  clsx_m_default,
  d,
  e,
  e2,
  n,
  r,
  u
} from "./chunk-OWW5HJNE.js";
import {
  css,
  init_emotion_react_browser_development_esm,
  jsx
} from "./chunk-PXYXWFW7.js";
import "./chunk-KJ5GSRPY.js";
import {
  require_react
} from "./chunk-HCG2JFOZ.js";
import {
  __toESM
} from "./chunk-AUZ3RYOM.js";

// node_modules/@table-library/react-table-library/index-a318de9b.js
var d3 = __toESM(require_react(), 1);
init_emotion_react_browser_development_esm();
var x = null;
var B = function() {
  return x || (x = d3.createContext(null));
};
var v2 = ["data", "theme", "layout", "sort", "pagination", "select", "tree", "onInit", "className", "children"];
var H = { Table: "\n    height: 100%;\n  " };
var h = d3.forwardRef(function(b2, C) {
  var e4 = b2.data, n2 = b2.theme, A2 = b2.layout, W = b2.sort, y = b2.pagination, m = b2.select, V = b2.tree, Y = b2.onInit, x2 = void 0 === Y ? function() {
  } : Y, h2 = b2.className, N2 = void 0 === h2 ? "table" : h2, F2 = b2.children, R2 = e(b2, v2), p3 = function(I) {
    var g = d3.useRef(null);
    return I && (g = I), g;
  }(C), S2 = function(I) {
    var g = d3.useRef(null);
    return g.current || (g.current = { onlyOnce: false, dataColumns: [] }), g;
  }(), f3 = o2({ sort: W, pagination: y, tree: V, select: m })(e4.nodes), j2 = function(I, g) {
    var c2 = d3.useState(false), l = a(c2, 2), b3 = l[0], C2 = l[1];
    return [b3, function(c3) {
      c3 && (b3 || (C2(true), g.current = c3, I(c3)));
    }];
  }(x2, p3), U2 = a(j2, 2), Q2 = U2[0], z2 = U2[1], L2 = i(), k2 = [];
  null != A2 && A2.fixedHeader && (k2 = k2.concat(H)), n2 && (k2 = k2.concat(n2));
  var D2, w2 = r3(k2), O2 = null != A2 && A2.isDiv ? "div" : "table", P2 = B(), T2 = G2(), K2 = u2(), E = r2(), M = s2();
  return jsx(O2, n({ role: "grid", "data-table-library_table": "", css: css((D2 = { isShiftDown: L2 }, "\n  *,\n  *:before,\n  *:after {\n    box-sizing: border-box;\n  }\n\n  overflow: auto;\n  position: relative;\n\n  border-collapse: collapse;\n\n  display: grid;\n\n  --data-table-library_grid-template-columns: '';\n  grid-template-columns: var(--data-table-library_grid-template-columns);\n\n  button * {\n    pointer-events: none;\n  }\n\n  ".concat(D2.isShiftDown ? "\n    user-select: none; /* standard syntax */\n    -webkit-user-select: none; /* webkit (safari, chrome) browsers */\n    -moz-user-select: none; /* mozilla browsers */\n    -khtml-user-select: none; /* webkit (konqueror) browsers */\n    -ms-user-select: none; /* IE10+ */\n    " : "", "\n  ")), " ", null == w2 ? void 0 : w2.Table, ";" + (false ? "" : ";label:Table;"), false ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE2RGlFIiwiZmlsZSI6ImluZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNzIGZyb20gJ2Nsc3gnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XHJcbmltcG9ydCB7IGNyZWF0ZVRhYmxlQ29udGV4dCB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL2NvbnRleHQvVGFibGUnO1xyXG5pbXBvcnQgeyBUaGVtZUNvbnRleHQgfSBmcm9tICdAdGFibGUtbGlicmFyeS9yZWFjdC10YWJsZS1saWJyYXJ5L2NvbW1vbi9jb250ZXh0L1RoZW1lJztcclxuaW1wb3J0IHsgTGF5b3V0UHJvdmlkZXIgfSBmcm9tICdAdGFibGUtbGlicmFyeS9yZWFjdC10YWJsZS1saWJyYXJ5L2NvbW1vbi9jb250ZXh0L0xheW91dCc7XHJcbmltcG9ydCB7IGNyZWF0ZVNvcnRDb250ZXh0IH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vY29udGV4dC9Tb3J0JztcclxuaW1wb3J0IHsgY3JlYXRlU2VsZWN0Q29udGV4dCB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL2NvbnRleHQvU2VsZWN0JztcclxuaW1wb3J0IHsgY3JlYXRlVHJlZUNvbnRleHQgfSBmcm9tICdAdGFibGUtbGlicmFyeS9yZWFjdC10YWJsZS1saWJyYXJ5L2NvbW1vbi9jb250ZXh0L1RyZWUnO1xyXG5pbXBvcnQgeyBjcmVhdGVQYWdpbmF0aW9uQ29udGV4dCB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL2NvbnRleHQvUGFnaW5hdGlvbic7XHJcbmltcG9ydCB7IGFwcGx5TW9kaWZpZXJzIH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vdXRpbC9tb2RpZmllcnMnO1xyXG5pbXBvcnQgeyB1c2VTaGlmdERvd24gfSBmcm9tICdAdGFibGUtbGlicmFyeS9yZWFjdC10YWJsZS1saWJyYXJ5L2NvbW1vbi9ob29rcy91c2VTaGlmdERvd24nO1xyXG5pbXBvcnQgeyB1c2VUaGVtZSB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvdGhlbWUvaW5kZXgnO1xyXG5pbXBvcnQgeyB1c2VPbkluaXQgfSBmcm9tICcuL3VzZU9uSW5pdCc7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMnO1xyXG5jb25zdCB1c2VUYWJsZUVsZW1lbnRSZWYgPSAocmVmKSA9PiB7XHJcbiAgICBsZXQgdGFibGVFbGVtZW50UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xyXG4gICAgaWYgKHJlZilcclxuICAgICAgICB0YWJsZUVsZW1lbnRSZWYgPSByZWY7XHJcbiAgICByZXR1cm4gdGFibGVFbGVtZW50UmVmO1xyXG59O1xyXG5jb25zdCB1c2VUYWJsZU1lbW9yeVJlZiA9IChsYXlvdXQpID0+IHtcclxuICAgIGNvbnN0IHRhYmxlTWVtb3J5UmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xyXG4gICAgaWYgKCF0YWJsZU1lbW9yeVJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgdGFibGVNZW1vcnlSZWYuY3VycmVudCA9IHtcclxuICAgICAgICAgICAgb25seU9uY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBkYXRhQ29sdW1uczogW10sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiB0YWJsZU1lbW9yeVJlZjtcclxufTtcclxuY29uc3QgRlVMTF9IRUlHSFRfVEhFTUUgPSB7XHJcbiAgICBUYWJsZTogYFxuICAgIGhlaWdodDogMTAwJTtcbiAgYCxcclxufTtcclxuY29uc3QgVGFibGUgPSBSZWFjdC5mb3J3YXJkUmVmKCh7IGRhdGEsIHRoZW1lOiBjdXN0b21UaGVtZSwgbGF5b3V0LCBzb3J0LCBwYWdpbmF0aW9uLCBzZWxlY3QsIHRyZWUsIG9uSW5pdCA9ICgpID0+IHsgfSwgY2xhc3NOYW1lID0gJ3RhYmxlJywgY2hpbGRyZW4sIC4uLnJlc3QgfSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCB0YWJsZUVsZW1lbnRSZWYgPSB1c2VUYWJsZUVsZW1lbnRSZWYocmVmKTtcclxuICAgIGNvbnN0IHRhYmxlTWVtb3J5UmVmID0gdXNlVGFibGVNZW1vcnlSZWYobGF5b3V0KTtcclxuICAgIGNvbnN0IG1vZGlmaWVkTm9kZXMgPSBhcHBseU1vZGlmaWVycyh7XHJcbiAgICAgICAgc29ydCxcclxuICAgICAgICBwYWdpbmF0aW9uLFxyXG4gICAgICAgIHRyZWUsXHJcbiAgICAgICAgc2VsZWN0LFxyXG4gICAgfSkoZGF0YS5ub2Rlcyk7XHJcbiAgICBjb25zdCBbY2FsbGVkT25jZSwgY2FsbGJhY2tSZWZdID0gdXNlT25Jbml0KG9uSW5pdCwgdGFibGVFbGVtZW50UmVmKTtcclxuICAgIGNvbnN0IGlzU2hpZnREb3duID0gdXNlU2hpZnREb3duKCk7XHJcbiAgICBsZXQgYWxsVGhlbWVzID0gW107XHJcbiAgICBpZiAobGF5b3V0Py5maXhlZEhlYWRlcikge1xyXG4gICAgICAgIGFsbFRoZW1lcyA9IGFsbFRoZW1lcy5jb25jYXQoRlVMTF9IRUlHSFRfVEhFTUUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1c3RvbVRoZW1lKSB7XHJcbiAgICAgICAgYWxsVGhlbWVzID0gYWxsVGhlbWVzLmNvbmNhdChjdXN0b21UaGVtZSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKGFsbFRoZW1lcyk7XHJcbiAgICBjb25zdCBBcyA9IGxheW91dD8uaXNEaXYgPyAnZGl2JyA6ICd0YWJsZSc7XHJcbiAgICBjb25zdCBUYWJsZUNvbnRleHQgPSBjcmVhdGVUYWJsZUNvbnRleHQoKTtcclxuICAgIGNvbnN0IFNvcnRDb250ZXh0ID0gY3JlYXRlU29ydENvbnRleHQoKTtcclxuICAgIGNvbnN0IFNlbGVjdENvbnRleHQgPSBjcmVhdGVTZWxlY3RDb250ZXh0KCk7XHJcbiAgICBjb25zdCBUcmVlQ29udGV4dCA9IGNyZWF0ZVRyZWVDb250ZXh0KCk7XHJcbiAgICBjb25zdCBQYWdpbmF0aW9uQ29udGV4dCA9IGNyZWF0ZVBhZ2luYXRpb25Db250ZXh0KCk7XHJcbiAgICByZXR1cm4gKDxBcyByb2xlPVwiZ3JpZFwiIGRhdGEtdGFibGUtbGlicmFyeV90YWJsZT1cIlwiIGNzcz17Y3NzIGBcbiAgICAgICAgICAke3N0eWxlcyh7IGlzU2hpZnREb3duIH0pfVxuICAgICAgICAgICR7dGhlbWU/LlRhYmxlfVxuICAgICAgICBgfSBjbGFzc05hbWU9e2NzKGNsYXNzTmFtZSl9IHJlZj17Y2FsbGJhY2tSZWZ9IHsuLi5yZXN0fT5cbiAgICAgICAge2NhbGxlZE9uY2UgJiYgKDxUYWJsZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e2RhdGF9PlxuICAgICAgICAgICAgPFRoZW1lQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dGhlbWV9PlxuICAgICAgICAgICAgICA8U29ydENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3NvcnR9PlxuICAgICAgICAgICAgICAgIDxTZWxlY3RDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXtzZWxlY3R9PlxuICAgICAgICAgICAgICAgICAgPFRyZWVDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt0cmVlfT5cbiAgICAgICAgICAgICAgICAgICAgPFBhZ2luYXRpb25Db250ZXh0LlByb3ZpZGVyIHZhbHVlPXtwYWdpbmF0aW9ufT5cbiAgICAgICAgICAgICAgICAgICAgICA8TGF5b3V0UHJvdmlkZXIgbGF5b3V0PXtsYXlvdXR9IHRhYmxlRWxlbWVudFJlZj17dGFibGVFbGVtZW50UmVmfSB0YWJsZU1lbW9yeVJlZj17dGFibGVNZW1vcnlSZWZ9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVuICYmIGNoaWxkcmVuKG1vZGlmaWVkTm9kZXMpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvTGF5b3V0UHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvUGFnaW5hdGlvbkNvbnRleHQuUHJvdmlkZXI+XG4gICAgICAgICAgICAgICAgICA8L1RyZWVDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgICAgICAgICAgIDwvU2VsZWN0Q29udGV4dC5Qcm92aWRlcj5cbiAgICAgICAgICAgICAgPC9Tb3J0Q29udGV4dC5Qcm92aWRlcj5cbiAgICAgICAgICAgIDwvVGhlbWVDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgICAgIDwvVGFibGVDb250ZXh0LlByb3ZpZGVyPil9XG4gICAgICA8L0FzPik7XHJcbn0pO1xyXG5leHBvcnQgeyBUYWJsZSB9O1xyXG4iXX0= */"), className: clsx_m_default(N2), ref: z2 }, R2), Q2 && jsx(P2.Provider, { value: e4 }, jsx(b.Provider, { value: w2 }, jsx(T2.Provider, { value: W }, jsx(K2.Provider, { value: m }, jsx(E.Provider, { value: V }, jsx(M.Provider, { value: y }, jsx(X, { layout: A2, tableElementRef: p3, tableMemoryRef: S2 }, F2 && F2(f3)))))))));
});
var N = function() {
  return "\n  display: contents;\n\n  &.disabled td {\n    cursor: auto;\n  }\n\n  ".concat(function() {
  }, "\n  background-color: #ffffff;\n");
};
var F = d3.forwardRef(function(I, c2) {
  var l = d3.useContext(A);
  if (!l)
    throw new Error("No Layout Context.");
  var C = l.layout, e4 = null != C && C.isDiv ? "div" : "tr";
  return jsx(e4, n({ css: css(N(), ";" + (false ? "" : ";label:getRowContainerStyle;"), false ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJvdy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY3VDIiwiZmlsZSI6IlJvdy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHsgTGF5b3V0Q29udGV4dCB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL2NvbnRleHQnO1xyXG5jb25zdCBnZXRCYXNlU3R5bGUgPSAoKSA9PiBgXG4gIGRpc3BsYXk6IGNvbnRlbnRzO1xuXG4gICYuZGlzYWJsZWQgdGQge1xuICAgIGN1cnNvcjogYXV0bztcbiAgfVxuXG4gICR7KCkgPT4ge1xyXG59fVxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuYDtcclxuY29uc3QgZ2V0Um93Q29udGFpbmVyU3R5bGUgPSAoKSA9PiBjc3MgYFxuICAke2dldEJhc2VTdHlsZSgpfVxuYDtcclxuY29uc3QgUm93Q29udGFpbmVyID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xyXG4gICAgY29uc3QgY29udGV4dCA9IFJlYWN0LnVzZUNvbnRleHQoTGF5b3V0Q29udGV4dCk7XHJcbiAgICBpZiAoIWNvbnRleHQpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIExheW91dCBDb250ZXh0LicpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBsYXlvdXQgfSA9IGNvbnRleHQ7XHJcbiAgICBjb25zdCBBcyA9IGxheW91dD8uaXNEaXYgPyAnZGl2JyA6ICd0cic7XHJcbiAgICByZXR1cm4gPEFzIGNzcz17Z2V0Um93Q29udGFpbmVyU3R5bGUoKX0gcmVmPXtyZWZ9IHsuLi5wcm9wc30vPjtcclxufSk7XHJcbmNvbnN0IGdldEhlYWRlclJvd0NvbnRhaW5lclN0eWxlID0gKCkgPT4gY3NzIGBcbiAgJHtnZXRCYXNlU3R5bGUoKX1cbmA7XHJcbmNvbnN0IEhlYWRlclJvd0NvbnRhaW5lciA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KExheW91dENvbnRleHQpO1xyXG4gICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBMYXlvdXQgQ29udGV4dC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgQXMgPSBsYXlvdXQ/LmlzRGl2ID8gJ2RpdicgOiAndHInO1xyXG4gICAgcmV0dXJuIDxBcyBjc3M9e2dldEhlYWRlclJvd0NvbnRhaW5lclN0eWxlKCl9IHJlZj17cmVmfSB7Li4ucHJvcHN9Lz47XHJcbn0pO1xyXG5leHBvcnQgeyBSb3dDb250YWluZXIsIEhlYWRlclJvd0NvbnRhaW5lciB9O1xyXG4iXX0= */"), ref: c2 }, I));
});
var R = d3.forwardRef(function(I, c2) {
  var l = d3.useContext(A);
  if (!l)
    throw new Error("No Layout Context.");
  var C = l.layout, e4 = null != C && C.isDiv ? "div" : "tr";
  return jsx(e4, n({ css: css(N(), ";" + (false ? "" : ";label:getHeaderRowContainerStyle;"), false ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJvdy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEI2QyIsImZpbGUiOiJSb3cudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XHJcbmltcG9ydCB7IExheW91dENvbnRleHQgfSBmcm9tICdAdGFibGUtbGlicmFyeS9yZWFjdC10YWJsZS1saWJyYXJ5L2NvbW1vbi9jb250ZXh0JztcclxuY29uc3QgZ2V0QmFzZVN0eWxlID0gKCkgPT4gYFxuICBkaXNwbGF5OiBjb250ZW50cztcblxuICAmLmRpc2FibGVkIHRkIHtcbiAgICBjdXJzb3I6IGF1dG87XG4gIH1cblxuICAkeygpID0+IHtcclxufX1cbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbmA7XHJcbmNvbnN0IGdldFJvd0NvbnRhaW5lclN0eWxlID0gKCkgPT4gY3NzIGBcbiAgJHtnZXRCYXNlU3R5bGUoKX1cbmA7XHJcbmNvbnN0IFJvd0NvbnRhaW5lciA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KExheW91dENvbnRleHQpO1xyXG4gICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBMYXlvdXQgQ29udGV4dC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgQXMgPSBsYXlvdXQ/LmlzRGl2ID8gJ2RpdicgOiAndHInO1xyXG4gICAgcmV0dXJuIDxBcyBjc3M9e2dldFJvd0NvbnRhaW5lclN0eWxlKCl9IHJlZj17cmVmfSB7Li4ucHJvcHN9Lz47XHJcbn0pO1xyXG5jb25zdCBnZXRIZWFkZXJSb3dDb250YWluZXJTdHlsZSA9ICgpID0+IGNzcyBgXG4gICR7Z2V0QmFzZVN0eWxlKCl9XG5gO1xyXG5jb25zdCBIZWFkZXJSb3dDb250YWluZXIgPSBSZWFjdC5mb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChMYXlvdXRDb250ZXh0KTtcclxuICAgIGlmICghY29udGV4dCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gTGF5b3V0IENvbnRleHQuJyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IGxheW91dCB9ID0gY29udGV4dDtcclxuICAgIGNvbnN0IEFzID0gbGF5b3V0Py5pc0RpdiA/ICdkaXYnIDogJ3RyJztcclxuICAgIHJldHVybiA8QXMgY3NzPXtnZXRIZWFkZXJSb3dDb250YWluZXJTdHlsZSgpfSByZWY9e3JlZn0gey4uLnByb3BzfS8+O1xyXG59KTtcclxuZXhwb3J0IHsgUm93Q29udGFpbmVyLCBIZWFkZXJSb3dDb250YWluZXIgfTtcclxuIl19 */"), ref: c2 }, I));
});
var p = function(I) {
  return I.type ? I.type === d3.Fragment : I === d3.Fragment;
};
var S = function(I, g) {
  return d3.Children.toArray(I).reduce(function(I2, c2, l) {
    return d3.isValidElement(c2) ? l >= g ? I2 : c2.props.gridColumnStart || c2.props.gridColumnEnd ? I2 + c2.props.gridColumnEnd - c2.props.gridColumnStart - 1 : I2 : I2;
  }, 0);
};
var f = ["className", "role", "isFooter", "children"];
function j(I, g) {
  var c2 = Object.keys(I);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(I);
    g && (l = l.filter(function(g2) {
      return Object.getOwnPropertyDescriptor(I, g2).enumerable;
    })), c2.push.apply(c2, l);
  }
  return c2;
}
function U(I) {
  for (var g = 1; g < arguments.length; g++) {
    var c2 = null != arguments[g] ? arguments[g] : {};
    g % 2 ? j(Object(c2), true).forEach(function(g2) {
      e2(I, g2, c2[g2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(I, Object.getOwnPropertyDescriptors(c2)) : j(Object(c2)).forEach(function(g2) {
      Object.defineProperty(I, g2, Object.getOwnPropertyDescriptor(c2, g2));
    });
  }
  return I;
}
var Q = function(l) {
  var t, u5 = l.className, W = l.role, X2 = void 0 === W ? "rowheader" : W, J = l.isFooter, a3 = l.children, y = e(l, f), s4 = d3.useContext(b), m = d3.useRef(null);
  return t = d3.useContext(A), d3.useLayoutEffect(function() {
    var I;
    if (!t)
      throw new Error("No Layout Context.");
    var g = t.layout, c2 = t.tableElementRef, l2 = t.tableMemoryRef, b2 = u(c2).map(G);
    if (null === (I = l2.current) || void 0 === I || !I.onlyOnce)
      if (l2.current.onlyOnce = true, null != g && g.resizedLayout) {
        var d4 = null == g ? void 0 : g.resizedLayout;
        r(d4, c2, l2);
      } else if (null != g && g.custom)
        d(c2, l2);
      else {
        var Z = b2.filter(function(I2) {
          return !I2.isHide;
        }).map(function() {
          return "minmax(0px, 1fr)";
        }).join(" ");
        r(Z, c2, l2);
      }
  }, [t]), jsx(R, n({ role: X2, "data-table-library_tr-header": "", css: css(null == s4 ? void 0 : s4.BaseRow, " ", J ? null == s4 ? void 0 : s4.FooterRow : null == s4 ? void 0 : s4.HeaderRow, ";" + (false ? "" : ";label:HeaderRow;"), false ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlYWRlclJvdy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUNxRiIsImZpbGUiOiJIZWFkZXJSb3cudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY3MgZnJvbSAnY2xzeCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHsgSGVhZGVyUm93Q29udGFpbmVyIH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vY29tcG9uZW50cy9Sb3cnO1xyXG5pbXBvcnQgeyBUaGVtZUNvbnRleHQgfSBmcm9tICdAdGFibGUtbGlicmFyeS9yZWFjdC10YWJsZS1saWJyYXJ5L2NvbW1vbi9jb250ZXh0L1RoZW1lJztcclxuaW1wb3J0IHsgTGF5b3V0Q29udGV4dCwgcHJlc2VydmVSZXNpemVkTGF5b3V0LCBzZXRSZXNpemVkTGF5b3V0LCB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL2NvbnRleHQnO1xyXG5pbXBvcnQgeyB0b0RhdGFDb2x1bW4sIGdldEhlYWRlckNvbHVtbnMsIH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vdXRpbC9jb2x1bW5zJztcclxuaW1wb3J0IHsgaXNSZWFjdEZyYWdtZW50IH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vdXRpbC9pc0ZyYWdtZW50JztcclxuaW1wb3J0IHsgZ2V0UHJldmlvdXNDb2xTcGFucyB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL3V0aWwvZ2V0UHJldmlvdXNDb2xTcGFucyc7XHJcbmNvbnN0IHVzZUluaXRpYWxMYXlvdXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gUmVhY3QudXNlQ29udGV4dChMYXlvdXRDb250ZXh0KTtcclxuICAgIFJlYWN0LnVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gTGF5b3V0IENvbnRleHQuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHsgbGF5b3V0LCB0YWJsZUVsZW1lbnRSZWYsIHRhYmxlTWVtb3J5UmVmIH0gPSBjb250ZXh0O1xyXG4gICAgICAgIGNvbnN0IGRhdGFDb2x1bW5zID0gZ2V0SGVhZGVyQ29sdW1ucyh0YWJsZUVsZW1lbnRSZWYpLm1hcCh0b0RhdGFDb2x1bW4pO1xyXG4gICAgICAgIGlmICh0YWJsZU1lbW9yeVJlZi5jdXJyZW50Py5vbmx5T25jZSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRhYmxlTWVtb3J5UmVmLmN1cnJlbnQub25seU9uY2UgPSB0cnVlO1xyXG4gICAgICAgIGlmIChsYXlvdXQ/LnJlc2l6ZWRMYXlvdXQpIHtcclxuICAgICAgICAgICAgY29uc3QgY29udHJvbGxlZFJlc2l6ZWRMYXlvdXQgPSBsYXlvdXQ/LnJlc2l6ZWRMYXlvdXQ7XHJcbiAgICAgICAgICAgIHNldFJlc2l6ZWRMYXlvdXQoY29udHJvbGxlZFJlc2l6ZWRMYXlvdXQsIHRhYmxlRWxlbWVudFJlZiwgdGFibGVNZW1vcnlSZWYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICghbGF5b3V0Py5jdXN0b20pIHtcclxuICAgICAgICAgICAgY29uc3QgdmlzaWJsZURhdGFDb2x1bW5zID0gZGF0YUNvbHVtbnMuZmlsdGVyKChkYXRhQ29sdW1uKSA9PiAhZGF0YUNvbHVtbi5pc0hpZGUpO1xyXG4gICAgICAgICAgICBjb25zdCBnZXRQYXJ0aWFsTGF5b3V0ID0gKCkgPT4gJ21pbm1heCgwcHgsIDFmciknO1xyXG4gICAgICAgICAgICBjb25zdCByZXNpemVkTGF5b3V0ID0gdmlzaWJsZURhdGFDb2x1bW5zLm1hcChnZXRQYXJ0aWFsTGF5b3V0KS5qb2luKCcgJyk7XHJcbiAgICAgICAgICAgIHNldFJlc2l6ZWRMYXlvdXQocmVzaXplZExheW91dCwgdGFibGVFbGVtZW50UmVmLCB0YWJsZU1lbW9yeVJlZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBwcmVzZXJ2ZVJlc2l6ZWRMYXlvdXQodGFibGVFbGVtZW50UmVmLCB0YWJsZU1lbW9yeVJlZik7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2NvbnRleHRdKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IEhlYWRlclJvdyA9ICh7IGNsYXNzTmFtZSwgcm9sZSA9ICdyb3doZWFkZXInLCBpc0Zvb3RlciwgY2hpbGRyZW4sIC4uLnJlc3QgfSkgPT4ge1xyXG4gICAgY29uc3QgdGhlbWUgPSBSZWFjdC51c2VDb250ZXh0KFRoZW1lQ29udGV4dCk7XHJcbiAgICBjb25zdCByZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XHJcbiAgICB1c2VJbml0aWFsTGF5b3V0KCk7XHJcbiAgICByZXR1cm4gKDxIZWFkZXJSb3dDb250YWluZXIgcm9sZT17cm9sZX0gZGF0YS10YWJsZS1saWJyYXJ5X3RyLWhlYWRlcj1cIlwiIGNzcz17Y3NzIGBcbiAgICAgICAgJHt0aGVtZT8uQmFzZVJvd31cbiAgICAgICAgJHtpc0Zvb3RlciA/IHRoZW1lPy5Gb290ZXJSb3cgOiB0aGVtZT8uSGVhZGVyUm93fVxuICAgICAgYH0gY2xhc3NOYW1lPXtjcygndHInLCBjbGFzc05hbWUsIHtcclxuICAgICAgICAgICAgJ3RyLWZvb3Rlcic6IGlzRm9vdGVyLFxyXG4gICAgICAgICAgICAndHItaGVhZGVyJzogIWlzRm9vdGVyLFxyXG4gICAgICAgIH0pfSByZWY9e3JlZn0gey4uLnJlc3R9PlxuICAgICAge1JlYWN0LkNoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pXHJcbiAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbilcclxuICAgICAgICAgICAgLm1hcCgoY2hpbGQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChSZWFjdC5pc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBleHRyYVByb3BzID0ge307XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzUmVhY3RGcmFnbWVudChjaGlsZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBleHRyYVByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5leHRyYVByb3BzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNDb2xTcGFuczogZ2V0UHJldmlvdXNDb2xTcGFucyhjaGlsZHJlbiwgaW5kZXgpLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCBleHRyYVByb3BzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pfVxuICAgIDwvSGVhZGVyUm93Q29udGFpbmVyPik7XHJcbn07XHJcbiJdfQ== */"), className: clsx_m_default("tr", u5, { "tr-footer": J, "tr-header": !J }), ref: m }, y), d3.Children.toArray(a3).filter(Boolean).map(function(I, g) {
    if (d3.isValidElement(I)) {
      var c2 = {};
      return p(I) || (c2 = U(U({}, c2), {}, { index: g, previousColSpans: S(a3, g) })), d3.cloneElement(I, c2);
    }
  }));
};
var z = function() {
};
var L = function(I, g, c2, l) {
  !function(I2) {
    var g2 = I2.onSingleClick, c3 = I2.onDoubleClick, l2 = I2.ref, b2 = d3.useRef(0);
    d3.useEffect(function() {
      var I3 = l2.current, C = function(I4) {
        c3 && (0 === b2.current && g2(I4), b2.current += 1, setTimeout(function() {
          2 === b2.current && c3(I4), b2.current = 0;
        }, 300));
      };
      return null == I3 || I3.addEventListener("click", C), function() {
        null == I3 || I3.removeEventListener("click", C);
      };
    });
  }({ onSingleClick: g ? function(I2) {
    return g(l, I2);
  } : z, onDoubleClick: c2 ? function(I2) {
    return c2(l, I2);
  } : null, ref: I });
};
var k = ["item", "className", "disabled", "onClick", "onDoubleClick", "children"];
function D(I, g) {
  var c2 = Object.keys(I);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(I);
    g && (l = l.filter(function(g2) {
      return Object.getOwnPropertyDescriptor(I, g2).enumerable;
    })), c2.push.apply(c2, l);
  }
  return c2;
}
function w(I) {
  for (var g = 1; g < arguments.length; g++) {
    var c2 = null != arguments[g] ? arguments[g] : {};
    g % 2 ? D(Object(c2), true).forEach(function(g2) {
      e2(I, g2, c2[g2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(I, Object.getOwnPropertyDescriptors(c2)) : D(Object(c2)).forEach(function(g2) {
      Object.defineProperty(I, g2, Object.getOwnPropertyDescriptor(c2, g2));
    });
  }
  return I;
}
var O = function(l) {
  var b2 = l.item, C = l.className, e4 = l.disabled, n2 = l.onClick, A2 = l.onDoubleClick, t = l.children, u5 = e(l, k), W = function(I, g) {
    return Object.values(I).filter(Boolean).filter(function(I2) {
      return null == I2 ? void 0 : I2.hasOwnProperty("_getRowProps");
    }).map(function(c2) {
      return c2._getRowProps(g, I);
    });
  }(d2(), l), X2 = d3.useContext(b), J = function(I, g) {
    var c2 = I.reduce(function(I2, g2) {
      var c3 = g2.theme, l2 = g2.className, b3 = g2.onClick, C2 = "\n        ".concat(I2.themeByFeature, "\n        ").concat(c3, "\n      "), e5 = clsx_m_default(I2.classNamesByFeature, l2), n3 = I2.clickable || !!b3;
      return w(w({}, I2), {}, { themeByFeature: C2, classNamesByFeature: e5, clickable: n3, onClickByFeature: function(g3, c4) {
        b3(g3, c4), I2.onClickByFeature(g3, c4);
      } });
    }, { themeByFeature: "", classNamesByFeature: "", clickable: !!g, onClickByFeature: function(I2, c3) {
      g && s(c3) && g(I2, c3);
    } });
    return { themeByFeature: c2.themeByFeature, classNamesByFeature: c2.classNamesByFeature, clickable: c2.clickable, onClickByFeature: c2.onClickByFeature };
  }(W, n2), a3 = J.themeByFeature, s4 = J.classNamesByFeature, o4 = J.clickable, r5 = J.onClickByFeature, V = d3.useRef(null);
  return L(V, r5, A2, b2), jsx(F, n({ role: "row", "data-table-library_tr-body": "", onClick: e4 || A2 ? function() {
  } : function(I) {
    return r5(b2, I);
  }, css: css(a3, " ", null == X2 ? void 0 : X2.BaseRow, " ", null == X2 ? void 0 : X2.Row, ";" + (false ? "" : ";label:Row;"), false ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJvdy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0VrRyIsImZpbGUiOiJSb3cudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgY3MgZnJvbSAnY2xzeCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHsgaXNSb3dDbGljayB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL3V0aWwvaXNSb3dDbGljayc7XHJcbmltcG9ydCB7IFJvd0NvbnRhaW5lciB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL2NvbXBvbmVudHMvUm93JztcclxuaW1wb3J0IHsgVGhlbWVDb250ZXh0IH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vY29udGV4dC9UaGVtZSc7XHJcbmltcG9ydCB7IHVzZUZlYXR1cmVzIH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vY29udGV4dC9GZWF0dXJlJztcclxuaW1wb3J0IHsgaXNSZWFjdEZyYWdtZW50IH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vdXRpbC9pc0ZyYWdtZW50JztcclxuaW1wb3J0IHsgZ2V0UHJldmlvdXNDb2xTcGFucyB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL3V0aWwvZ2V0UHJldmlvdXNDb2xTcGFucyc7XHJcbmltcG9ydCB7IHVzZURvdWJsZUNsaWNrIH0gZnJvbSAnLi91c2VEb3VibGVDbGljayc7XHJcbmNvbnN0IGdldFJvd1Byb3BzID0gKGZlYXR1cmVzLCBwcm9wcykgPT4gT2JqZWN0LnZhbHVlcyhmZWF0dXJlcylcclxuICAgIC5maWx0ZXIoQm9vbGVhbilcclxuICAgIC5maWx0ZXIoKGZlYXR1cmUpID0+IGZlYXR1cmU/Lmhhc093blByb3BlcnR5KCdfZ2V0Um93UHJvcHMnKSlcclxuICAgIC5tYXAoKGZlYXR1cmUpID0+IGZlYXR1cmUuX2dldFJvd1Byb3BzKHByb3BzLCBmZWF0dXJlcykpO1xyXG5jb25zdCBldmFsdWF0ZVByb3BzID0gKHJvd1Byb3BzQnlGZWF0dXJlLCBvblNpbmdsZUNsaWNrKSA9PiB7XHJcbiAgICBjb25zdCB7IHRoZW1lQnlGZWF0dXJlLCBjbGFzc05hbWVzQnlGZWF0dXJlLCBjbGlja2FibGUsIG9uQ2xpY2tCeUZlYXR1cmUgfSA9IHJvd1Byb3BzQnlGZWF0dXJlLnJlZHVjZSgoYWNjLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgdGhlbWUsIGNsYXNzTmFtZSwgb25DbGljayB9ID0gdmFsdWU7XHJcbiAgICAgICAgY29uc3QgbWVyZ2VkVGhlbWUgPSBgXG4gICAgICAgICR7YWNjLnRoZW1lQnlGZWF0dXJlfVxuICAgICAgICAke3RoZW1lfVxuICAgICAgYDtcclxuICAgICAgICBjb25zdCBtZXJnZWRDbGFzc05hbWUgPSBjcyhhY2MuY2xhc3NOYW1lc0J5RmVhdHVyZSwgY2xhc3NOYW1lKTtcclxuICAgICAgICBjb25zdCBtZXJnZWRDbGlja2FibGUgPSBhY2MuY2xpY2thYmxlIHx8ICEhb25DbGljaztcclxuICAgICAgICBjb25zdCBtZXJnZWRPbkNsaWNrID0gKG5vZGUsIGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIG9uQ2xpY2sobm9kZSwgZXZlbnQpO1xyXG4gICAgICAgICAgICBhY2Mub25DbGlja0J5RmVhdHVyZShub2RlLCBldmVudCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5hY2MsXHJcbiAgICAgICAgICAgIHRoZW1lQnlGZWF0dXJlOiBtZXJnZWRUaGVtZSxcclxuICAgICAgICAgICAgY2xhc3NOYW1lc0J5RmVhdHVyZTogbWVyZ2VkQ2xhc3NOYW1lLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IG1lcmdlZENsaWNrYWJsZSxcclxuICAgICAgICAgICAgb25DbGlja0J5RmVhdHVyZTogbWVyZ2VkT25DbGljayxcclxuICAgICAgICB9O1xyXG4gICAgfSwge1xyXG4gICAgICAgIHRoZW1lQnlGZWF0dXJlOiAnJyxcclxuICAgICAgICBjbGFzc05hbWVzQnlGZWF0dXJlOiAnJyxcclxuICAgICAgICBjbGlja2FibGU6ICEhb25TaW5nbGVDbGljayxcclxuICAgICAgICBvbkNsaWNrQnlGZWF0dXJlOiAobm9kZSwgZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKG9uU2luZ2xlQ2xpY2sgJiYgaXNSb3dDbGljayhldmVudCkpIHtcclxuICAgICAgICAgICAgICAgIG9uU2luZ2xlQ2xpY2sobm9kZSwgZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0aGVtZUJ5RmVhdHVyZSxcclxuICAgICAgICBjbGFzc05hbWVzQnlGZWF0dXJlLFxyXG4gICAgICAgIGNsaWNrYWJsZSxcclxuICAgICAgICBvbkNsaWNrQnlGZWF0dXJlLFxyXG4gICAgfTtcclxufTtcclxuZXhwb3J0IGNvbnN0IFJvdyA9IChwcm9wcykgPT4ge1xyXG4gICAgY29uc3QgeyBpdGVtLCBjbGFzc05hbWUsIGRpc2FibGVkLCBvbkNsaWNrLCBvbkRvdWJsZUNsaWNrLCBjaGlsZHJlbiwgLi4ucmVzdCB9ID0gcHJvcHM7XHJcbiAgICBjb25zdCBmZWF0dXJlcyA9IHVzZUZlYXR1cmVzKCk7XHJcbiAgICBjb25zdCByb3dQcm9wc0J5RmVhdHVyZSA9IGdldFJvd1Byb3BzKGZlYXR1cmVzLCBwcm9wcyk7XHJcbiAgICBjb25zdCB0aGVtZSA9IFJlYWN0LnVzZUNvbnRleHQoVGhlbWVDb250ZXh0KTtcclxuICAgIGNvbnN0IHsgdGhlbWVCeUZlYXR1cmUsIGNsYXNzTmFtZXNCeUZlYXR1cmUsIGNsaWNrYWJsZSwgb25DbGlja0J5RmVhdHVyZSB9ID0gZXZhbHVhdGVQcm9wcyhyb3dQcm9wc0J5RmVhdHVyZSwgb25DbGljayk7XHJcbiAgICBjb25zdCByZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XHJcbiAgICB1c2VEb3VibGVDbGljayhyZWYsIG9uQ2xpY2tCeUZlYXR1cmUsIG9uRG91YmxlQ2xpY2ssIGl0ZW0pO1xyXG4gICAgY29uc3QgaGFuZGxlQ2xpY2sgPSBkaXNhYmxlZFxyXG4gICAgICAgID8gKCkgPT4geyB9XHJcbiAgICAgICAgOiBvbkRvdWJsZUNsaWNrXHJcbiAgICAgICAgICAgID8gKCkgPT4geyB9XHJcbiAgICAgICAgICAgIDogKGV2ZW50KSA9PiBvbkNsaWNrQnlGZWF0dXJlKGl0ZW0sIGV2ZW50KTtcclxuICAgIHJldHVybiAoPFJvd0NvbnRhaW5lciByb2xlPVwicm93XCIgZGF0YS10YWJsZS1saWJyYXJ5X3RyLWJvZHk9XCJcIiBvbkNsaWNrPXtoYW5kbGVDbGlja30gY3NzPXtjc3MgYFxuICAgICAgICAke3RoZW1lQnlGZWF0dXJlfVxuICAgICAgICAke3RoZW1lPy5CYXNlUm93fVxuICAgICAgICAke3RoZW1lPy5Sb3d9XG4gICAgICBgfSBjbGFzc05hbWU9e2NzKCd0cicsICd0ci1ib2R5JywgY2xhc3NOYW1lc0J5RmVhdHVyZSwgY2xhc3NOYW1lLCB7XHJcbiAgICAgICAgICAgIGRpc2FibGVkLFxyXG4gICAgICAgICAgICBjbGlja2FibGU6IGNsaWNrYWJsZSB8fCAhIW9uRG91YmxlQ2xpY2ssXHJcbiAgICAgICAgfSl9IHJlZj17cmVmfSB7Li4ucmVzdH0+XG4gICAgICB7UmVhY3QuQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbilcclxuICAgICAgICAgICAgLmZpbHRlcihCb29sZWFuKVxyXG4gICAgICAgICAgICAubWFwKChjaGlsZCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKFJlYWN0LmlzVmFsaWRFbGVtZW50KGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4dHJhUHJvcHMgPSB7fTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNSZWFjdEZyYWdtZW50KGNoaWxkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhUHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmV4dHJhUHJvcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0NvbFNwYW5zOiBnZXRQcmV2aW91c0NvbFNwYW5zKGNoaWxkcmVuLCBpbmRleCksXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIGV4dHJhUHJvcHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSl9XG4gICAgPC9Sb3dDb250YWluZXI+KTtcclxufTtcclxuIl19 */"), className: clsx_m_default("tr", "tr-body", s4, C, { disabled: e4, clickable: o4 || !!A2 }), ref: V }, u5), d3.Children.toArray(t).filter(Boolean).map(function(I, g) {
    if (d3.isValidElement(I)) {
      var c2 = {};
      return p(I) || (c2 = w(w({}, c2), {}, { index: g, previousColSpans: S(t, g) })), d3.cloneElement(I, c2);
    }
  }));
};
var P = function(I) {
  return jsx(i2, n({}, I, { isFooter: true }));
};
var T = function(I) {
  return jsx(Q, n({}, I, { isFooter: true, role: "rowfooter" }));
};
var K = function(I) {
  return jsx(v, n({}, I, { isFooter: true, role: "columnfooter" }));
};

// node_modules/@table-library/react-table-library/index-b33465ae.js
var r4 = __toESM(require_react(), 1);
var a2 = function(e4) {
  var t = r4.useRef(e4);
  return r4.useEffect(function() {
    t.current = e4;
  }, [e4]), t;
};
function u4(r5, e4) {
  var t = Object.keys(r5);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(r5);
    e4 && (n2 = n2.filter(function(e5) {
      return Object.getOwnPropertyDescriptor(r5, e5).enumerable;
    })), t.push.apply(t, n2);
  }
  return t;
}
function f2(r5) {
  for (var e4 = 1; e4 < arguments.length; e4++) {
    var n2 = null != arguments[e4] ? arguments[e4] : {};
    e4 % 2 ? u4(Object(n2), true).forEach(function(e5) {
      e2(r5, e5, n2[e5]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(r5, Object.getOwnPropertyDescriptors(n2)) : u4(Object(n2)).forEach(function(e5) {
      Object.defineProperty(r5, e5, Object.getOwnPropertyDescriptor(n2, e5));
    });
  }
  return r5;
}
var i3 = function(r5, e4) {
  if ("SET" === e4.type)
    return function(r6, e5) {
      return f2(f2({}, r6), e5.payload);
    }(r5, e4);
  throw new Error();
};
var s3 = {};
var p2 = function(r5, t, a3, u5) {
  var p3, l = f2(f2({}, s3), null !== (p3 = null == a3 ? void 0 : a3.state) && void 0 !== p3 ? p3 : {}), y = null != a3 && a3.onChange ? a3.onChange : function() {
  }, O2 = e3(i3, l, [], [y], u5), b2 = a(O2, 2), j2 = b2[0], d4 = b2[1];
  return c(l, j2, function() {
    return d4({ type: "SET", payload: l });
  }), u3(r5, u5, j2), j2;
};

// node_modules/@table-library/react-table-library/table.js
var import_react2 = __toESM(require_react());
init_emotion_react_browser_development_esm();
export {
  o3 as Body,
  o as Cell,
  P as Footer,
  K as FooterCell,
  T as FooterRow,
  i2 as Header,
  v as HeaderCell,
  Q as HeaderRow,
  O as Row,
  h as Table,
  p2 as useCustom,
  a2 as useTableContext
};
//# sourceMappingURL=@table-library_react-table-library_table.js.map
