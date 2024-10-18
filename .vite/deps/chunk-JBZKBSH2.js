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

// node_modules/@table-library/react-table-library/styles-492c6342.js
var g = __toESM(require_react(), 1);
init_emotion_react_browser_development_esm();
function t() {
  return l = t = Object.assign || function(g2) {
    for (var c = 1; c < arguments.length; c++) {
      var I = arguments[c];
      for (var t2 in I)
        Object.prototype.hasOwnProperty.call(I, t2) && (g2[t2] = I[t2]);
    }
    return g2;
  }, t.apply(this, arguments);
}
var l = t;
var n = l;
var i = function(g2, c) {
  if (null == g2)
    return {};
  var I, t2, l2 = {}, n2 = Object.keys(g2);
  for (t2 = 0; t2 < n2.length; t2++)
    I = n2[t2], c.indexOf(I) >= 0 || (l2[I] = g2[I]);
  return l2;
};
var e = function(g2, c) {
  if (null == g2)
    return {};
  var I, t2, l2 = i(g2, c);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(g2);
    for (t2 = 0; t2 < n2.length; t2++)
      I = n2[t2], c.indexOf(I) >= 0 || Object.prototype.propertyIsEnumerable.call(g2, I) && (l2[I] = g2[I]);
  }
  return l2;
};
var b = g.createContext(null);
var u = function(g2) {
  var c = g2.current.querySelector(".tr-header");
  return Array.from((null == c ? void 0 : c.querySelectorAll(".th")) || []);
};
var C = function(g2, c, I, t2) {
  return Array.from(g2.current.querySelectorAll(I)).forEach(function(g3) {
    var I2 = Array.from(g3.querySelectorAll(t2)), l2 = I2.length;
    I2.forEach(function(g4, I3) {
      return c(g4, I3, l2);
    });
  });
};
var o = function(g2, c) {
  return C(g2, c, ".tr-header", ".th");
};
var a = function(g2, c) {
  return C(g2, c, ".tr-body", ".td");
};
var G = function(g2, c) {
  return { index: c, minWidth: +g2.getAttribute("data-resize-min-width"), width: g2.getBoundingClientRect().width, isStiff: g2.classList.contains("stiff"), isHide: "true" === g2.getAttribute("data-hide"), isColSpan: g2.classList.contains("colspan") };
};
var A = g.createContext(null);
var X = function(I) {
  var t2 = I.tableElementRef, l2 = I.tableMemoryRef, n2 = I.layout, i2 = I.children, e3 = g.useMemo(function() {
    return { layout: n2, tableElementRef: t2, tableMemoryRef: l2 };
  }, [n2, t2, l2]);
  return jsx(A.Provider, { value: e3 }, i2);
};
var d = function(g2, c) {
  var I = u(g2).map(G);
  c.current.dataColumns = I;
};
var r = function(g2, c, I) {
  var t2 = c.current.style.getPropertyValue("--data-table-library_grid-template-columns") !== g2;
  c.current && g2 && t2 && (c.current.style.setProperty("--data-table-library_grid-template-columns", g2), d(c, I));
};
var x = function(g2, c) {
  null != c && c.onLayoutChange && g2 && c.onLayoutChange(g2);
};
var y = "\n  ".concat(function() {
}, "\n  padding: 0;\n  margin: 0;\n\n  ").concat(function() {
}, "\n  display: flex;\n  align-items: center;\n\n  ").concat(function() {
}, "\n  align-self: stretch;\n\n\n  & > div {\n    ").concat(function() {
}, "\n    flex: 1;\n\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n  }\n\n  &.hide {\n    display: none;\n  }\n\n  &.pin-left,\n  &.pin-right {\n    position: sticky;\n    z-index: 2;\n  }\n\n  ").concat(function() {
}, "\n  background-color: inherit;\n");
var s = css(y, ";" + (false ? "" : ";label:CELL_CONTAINER_STYLE;"), false ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNlbGwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJDaUMiLCJmaWxlIjoiQ2VsbC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHsgTGF5b3V0Q29udGV4dCB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL2NvbnRleHQnO1xyXG5jb25zdCBCQVNFX1NUWUxFID0gYFxuICAkeygpID0+IHtcclxufX1cbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuXG4gICR7KCkgPT4ge1xyXG59fVxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICR7KCkgPT4ge1xyXG59fVxuICBhbGlnbi1zZWxmOiBzdHJldGNoO1xuXG5cbiAgJiA+IGRpdiB7XG4gICAgJHsoKSA9PiB7XHJcbn19XG4gICAgZmxleDogMTtcblxuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgfVxuXG4gICYuaGlkZSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gICYucGluLWxlZnQsXG4gICYucGluLXJpZ2h0IHtcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgIHotaW5kZXg6IDI7XG4gIH1cblxuICAkeygpID0+IHtcclxufX1cbiAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcbmA7XHJcbmNvbnN0IENFTExfQ09OVEFJTkVSX1NUWUxFID0gY3NzIGBcbiAgJHtCQVNFX1NUWUxFfVxuYDtcclxuY29uc3QgQ2VsbENvbnRhaW5lciA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KExheW91dENvbnRleHQpO1xyXG4gICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBMYXlvdXQgQ29udGV4dC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgQXMgPSBsYXlvdXQ/LmlzRGl2ID8gJ2RpdicgOiAndGQnO1xyXG4gICAgcmV0dXJuIDxBcyBjc3M9e0NFTExfQ09OVEFJTkVSX1NUWUxFfSByZWY9e3JlZn0gey4uLnByb3BzfS8+O1xyXG59KTtcclxuY29uc3QgSEVBREVSX0NFTExfQ09OVEFJTkVSX1NUWUxFID0gY3NzIGBcbiAgJHtCQVNFX1NUWUxFfVxuXG4gIHotaW5kZXg6IDE7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcblxuICAmLnBpbi1sZWZ0LFxuICAmLnBpbi1yaWdodCB7XG4gICAgei1pbmRleDogMztcbiAgfVxuYDtcclxuY29uc3QgSGVhZGVyQ2VsbENvbnRhaW5lciA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KExheW91dENvbnRleHQpO1xyXG4gICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBMYXlvdXQgQ29udGV4dC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgQXMgPSBsYXlvdXQ/LmlzRGl2ID8gJ2RpdicgOiAndGgnO1xyXG4gICAgcmV0dXJuIDxBcyBjc3M9e0hFQURFUl9DRUxMX0NPTlRBSU5FUl9TVFlMRX0gcmVmPXtyZWZ9IHsuLi5wcm9wc30vPjtcclxufSk7XHJcbmV4cG9ydCB7IENlbGxDb250YWluZXIsIEhlYWRlckNlbGxDb250YWluZXIgfTtcclxuIl19 */");
var p = g.forwardRef(function(I, t2) {
  var l2 = g.useContext(A);
  if (!l2)
    throw new Error("No Layout Context.");
  var i2 = l2.layout, e3 = null != i2 && i2.isDiv ? "div" : "td";
  return jsx(e3, n({ css: s, ref: t2 }, I));
});
var B = css(y, " z-index:1;text-align:left;position:sticky;top:0;&.pin-left,&.pin-right{z-index:3;}" + (false ? "" : ";label:HEADER_CELL_CONTAINER_STYLE;"), false ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNlbGwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVEd0MiLCJmaWxlIjoiQ2VsbC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuaW1wb3J0IHsgTGF5b3V0Q29udGV4dCB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvY29tbW9uL2NvbnRleHQnO1xyXG5jb25zdCBCQVNFX1NUWUxFID0gYFxuICAkeygpID0+IHtcclxufX1cbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuXG4gICR7KCkgPT4ge1xyXG59fVxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICR7KCkgPT4ge1xyXG59fVxuICBhbGlnbi1zZWxmOiBzdHJldGNoO1xuXG5cbiAgJiA+IGRpdiB7XG4gICAgJHsoKSA9PiB7XHJcbn19XG4gICAgZmxleDogMTtcblxuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgfVxuXG4gICYuaGlkZSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxuXG4gICYucGluLWxlZnQsXG4gICYucGluLXJpZ2h0IHtcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xuICAgIHotaW5kZXg6IDI7XG4gIH1cblxuICAkeygpID0+IHtcclxufX1cbiAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcbmA7XHJcbmNvbnN0IENFTExfQ09OVEFJTkVSX1NUWUxFID0gY3NzIGBcbiAgJHtCQVNFX1NUWUxFfVxuYDtcclxuY29uc3QgQ2VsbENvbnRhaW5lciA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KExheW91dENvbnRleHQpO1xyXG4gICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBMYXlvdXQgQ29udGV4dC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgQXMgPSBsYXlvdXQ/LmlzRGl2ID8gJ2RpdicgOiAndGQnO1xyXG4gICAgcmV0dXJuIDxBcyBjc3M9e0NFTExfQ09OVEFJTkVSX1NUWUxFfSByZWY9e3JlZn0gey4uLnByb3BzfS8+O1xyXG59KTtcclxuY29uc3QgSEVBREVSX0NFTExfQ09OVEFJTkVSX1NUWUxFID0gY3NzIGBcbiAgJHtCQVNFX1NUWUxFfVxuXG4gIHotaW5kZXg6IDE7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcblxuICAmLnBpbi1sZWZ0LFxuICAmLnBpbi1yaWdodCB7XG4gICAgei1pbmRleDogMztcbiAgfVxuYDtcclxuY29uc3QgSGVhZGVyQ2VsbENvbnRhaW5lciA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KExheW91dENvbnRleHQpO1xyXG4gICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBMYXlvdXQgQ29udGV4dC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgbGF5b3V0IH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgQXMgPSBsYXlvdXQ/LmlzRGl2ID8gJ2RpdicgOiAndGgnO1xyXG4gICAgcmV0dXJuIDxBcyBjc3M9e0hFQURFUl9DRUxMX0NPTlRBSU5FUl9TVFlMRX0gcmVmPXtyZWZ9IHsuLi5wcm9wc30vPjtcclxufSk7XHJcbmV4cG9ydCB7IENlbGxDb250YWluZXIsIEhlYWRlckNlbGxDb250YWluZXIgfTtcclxuIl19 */");
var Z = g.forwardRef(function(I, t2) {
  var l2 = g.useContext(A);
  if (!l2)
    throw new Error("No Layout Context.");
  var i2 = l2.layout, e3 = null != i2 && i2.isDiv ? "div" : "th";
  return jsx(e3, n({ css: B, ref: t2 }, I));
});
var W = false ? { name: "1k13m5t", styles: "z-index:2;position:absolute;top:0;right:0;bottom:0;width:1px;margin:4px 0" } : { name: "1ysef1f-handle", styles: "z-index:2;position:absolute;top:0;right:0;bottom:0;width:1px;margin:4px 0;label:handle;", map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPb0IiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5jb25zdCByZXNpemVyU3R5bGUgPSAocmVzaXplKSA9PiB7XHJcbiAgICBjb25zdCB3aWR0aCA9IHR5cGVvZiByZXNpemUgPT09ICdib29sZWFuJyB8fCByZXNpemU/LnJlc2l6ZXJXaWR0aCA9PSBudWxsID8gMTAgOiByZXNpemUucmVzaXplcldpZHRoO1xyXG4gICAgY29uc3QgaGlnaGxpZ2h0ID0gdHlwZW9mIHJlc2l6ZSA9PT0gJ2Jvb2xlYW4nIHx8IHJlc2l6ZT8ucmVzaXplckhpZ2hsaWdodCA9PSBudWxsXHJcbiAgICAgICAgPyAndHJhbnNwYXJlbnQnXHJcbiAgICAgICAgOiByZXNpemUucmVzaXplckhpZ2hsaWdodDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaGFuZGxlOiBjc3MgYFxuICAgICAgei1pbmRleDogMjtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgYm90dG9tOiAwO1xuXG4gICAgICB3aWR0aDogMXB4O1xuICAgICAgbWFyZ2luOiA0cHggMDtcbiAgICBgLFxyXG4gICAgICAgIGFyZWE6IGNzcyBgXG4gICAgICB6LWluZGV4OiAxO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAwO1xuICAgICAgcmlnaHQ6IDA7XG4gICAgICBib3R0b206IDA7XG5cbiAgICAgIGN1cnNvcjogZXctcmVzaXplO1xuICAgICAgd2lkdGg6ICR7d2lkdGh9cHg7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG5cbiAgICAgICY6aG92ZXIsXG4gICAgICAmLmFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7aGlnaGxpZ2h0fTtcbiAgICAgIH1cbiAgICBgLFxyXG4gICAgfTtcclxufTtcclxuZXhwb3J0IHsgcmVzaXplclN0eWxlIH07XHJcbiJdfQ== */", toString: function() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
} };
var m = function(g2) {
  var c = "boolean" == typeof g2 || null == (null == g2 ? void 0 : g2.resizerWidth) ? 10 : g2.resizerWidth, t2 = "boolean" == typeof g2 || null == (null == g2 ? void 0 : g2.resizerHighlight) ? "transparent" : g2.resizerHighlight;
  return { handle: W, area: css("z-index:1;position:absolute;top:0;right:0;bottom:0;cursor:ew-resize;width:", c, "px;height:100%;&:hover,&.active{background-color:", t2, ";}" + (false ? "" : ";label:area;"), false ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQmtCIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcclxuY29uc3QgcmVzaXplclN0eWxlID0gKHJlc2l6ZSkgPT4ge1xyXG4gICAgY29uc3Qgd2lkdGggPSB0eXBlb2YgcmVzaXplID09PSAnYm9vbGVhbicgfHwgcmVzaXplPy5yZXNpemVyV2lkdGggPT0gbnVsbCA/IDEwIDogcmVzaXplLnJlc2l6ZXJXaWR0aDtcclxuICAgIGNvbnN0IGhpZ2hsaWdodCA9IHR5cGVvZiByZXNpemUgPT09ICdib29sZWFuJyB8fCByZXNpemU/LnJlc2l6ZXJIaWdobGlnaHQgPT0gbnVsbFxyXG4gICAgICAgID8gJ3RyYW5zcGFyZW50J1xyXG4gICAgICAgIDogcmVzaXplLnJlc2l6ZXJIaWdobGlnaHQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGhhbmRsZTogY3NzIGBcbiAgICAgIHotaW5kZXg6IDI7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJvdHRvbTogMDtcblxuICAgICAgd2lkdGg6IDFweDtcbiAgICAgIG1hcmdpbjogNHB4IDA7XG4gICAgYCxcclxuICAgICAgICBhcmVhOiBjc3MgYFxuICAgICAgei1pbmRleDogMTtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgYm90dG9tOiAwO1xuXG4gICAgICBjdXJzb3I6IGV3LXJlc2l6ZTtcbiAgICAgIHdpZHRoOiAke3dpZHRofXB4O1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgICAmOmhvdmVyLFxuICAgICAgJi5hY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2hpZ2hsaWdodH07XG4gICAgICB9XG4gICAgYCxcclxuICAgIH07XHJcbn07XHJcbmV4cG9ydCB7IHJlc2l6ZXJTdHlsZSB9O1xyXG4iXX0= */") };
};

// node_modules/@table-library/react-table-library/node_modules/clsx/dist/clsx.m.js
function toVal(mix) {
  var k, y2, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if (y2 = toVal(mix[k])) {
            str && (str += " ");
            str += y2;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += " ");
          str += k;
        }
      }
    }
  }
  return str;
}
function clsx_m_default() {
  var i2 = 0, tmp, x2, str = "";
  while (i2 < arguments.length) {
    if (tmp = arguments[i2++]) {
      if (x2 = toVal(tmp)) {
        str && (str += " ");
        str += x2;
      }
    }
  }
  return str;
}

// node_modules/@table-library/react-table-library/defineProperty-9f9de5d0.js
var e2 = function(e3, r2, n2) {
  return r2 in e3 ? Object.defineProperty(e3, r2, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[r2] = n2, e3;
};

export {
  n,
  e,
  b,
  u,
  o,
  a,
  G,
  A,
  X,
  d,
  r,
  x,
  p,
  Z,
  m,
  clsx_m_default,
  e2
};
//# sourceMappingURL=chunk-JBZKBSH2.js.map
