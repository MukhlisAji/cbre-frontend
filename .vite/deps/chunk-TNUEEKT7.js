import {
  A,
  G,
  Z,
  a,
  b,
  clsx_m_default,
  e,
  e2,
  m,
  n,
  o,
  r,
  u,
  x
} from "./chunk-OWW5HJNE.js";
import {
  css,
  init_emotion_react_browser_development_esm,
  jsx
} from "./chunk-PXYXWFW7.js";
import {
  require_react
} from "./chunk-HCG2JFOZ.js";
import {
  __toESM
} from "./chunk-AUZ3RYOM.js";

// node_modules/@table-library/react-table-library/unsupportedIterableToArray-dc74e326.js
var r2 = function(r4, t4) {
  (null == t4 || t4 > r4.length) && (t4 = r4.length);
  for (var n5 = 0, e7 = new Array(t4); n5 < t4; n5++)
    e7[n5] = r4[n5];
  return e7;
};
var t = r2;
var n2 = function(r4, n5) {
  if (r4) {
    if ("string" == typeof r4)
      return t(r4, n5);
    var e7 = Object.prototype.toString.call(r4).slice(8, -1);
    return "Object" === e7 && r4.constructor && (e7 = r4.constructor.name), "Map" === e7 || "Set" === e7 ? Array.from(r4) : "Arguments" === e7 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e7) ? t(r4, n5) : void 0;
  }
};

// node_modules/@table-library/react-table-library/slicedToArray-c92cae3a.js
var t2 = function(r4) {
  if (Array.isArray(r4))
    return r4;
};
var e3 = function(r4, t4) {
  if ("undefined" != typeof Symbol && Symbol.iterator in Object(r4)) {
    var e7 = [], n5 = true, o4 = false, a4 = void 0;
    try {
      for (var i2, u4 = r4[Symbol.iterator](); !(n5 = (i2 = u4.next()).done) && (e7.push(i2.value), !t4 || e7.length !== t4); n5 = true)
        ;
    } catch (r5) {
      o4 = true, a4 = r5;
    } finally {
      try {
        n5 || null == u4.return || u4.return();
      } finally {
        if (o4)
          throw a4;
      }
    }
    return e7;
  }
};
var n3 = n2;
var o2 = function() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
};
var a2 = function(r4, a4) {
  return t2(r4) || e3(r4, a4) || n3(r4, a4) || o2();
};

// node_modules/@table-library/react-table-library/toConsumableArray-25e5c43c.js
var e4 = r2;
var n4 = function(r4) {
  if (Array.isArray(r4))
    return e4(r4);
};
var o3 = function(r4) {
  if ("undefined" != typeof Symbol && Symbol.iterator in Object(r4))
    return Array.from(r4);
};
var a3 = n2;
var i = function() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
};
var u2 = function(r4) {
  return n4(r4) || o3(r4) || a3(r4) || i();
};

// node_modules/@table-library/react-table-library/HeaderCell-1d879c3c.js
var e5 = __toESM(require_react(), 1);
init_emotion_react_browser_development_esm();
var A2 = null;
var G2 = function() {
  return A2 || (A2 = e5.createContext(null));
};
var W = function() {
  return e5.useContext(A2);
};
function X(e7, c2) {
  var t4 = Object.keys(e7);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e7);
    c2 && (l = l.filter(function(c3) {
      return Object.getOwnPropertyDescriptor(e7, c3).enumerable;
    })), t4.push.apply(t4, l);
  }
  return t4;
}
function V(e7) {
  for (var c2 = 1; c2 < arguments.length; c2++) {
    var t4 = null != arguments[c2] ? arguments[c2] : {};
    c2 % 2 ? X(Object(t4), true).forEach(function(c3) {
      e2(e7, c3, t4[c3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e7, Object.getOwnPropertyDescriptors(t4)) : X(Object(t4)).forEach(function(c3) {
      Object.defineProperty(e7, c3, Object.getOwnPropertyDescriptor(t4, c3));
    });
  }
  return e7;
}
var y = function(b2, C) {
  var i2 = e5.useContext(A);
  if (!i2)
    throw new Error("No Layout Context.");
  var u4 = i2.tableElementRef, a4 = i2.tableMemoryRef, d = i2.layout, s = e5.useRef(null), m2 = e5.useRef(null), o4 = e5.useRef(""), A3 = e5.useRef(null), G3 = e5.useRef(false), W2 = e5.useCallback(function(e7) {
    var c2;
    e7.preventDefault(), o4.current = u4.current.style.getPropertyValue("--data-table-library_grid-template-columns"), G3.current = true, A3.current = s.current.offsetWidth - e7.pageX, null === (c2 = s.current) || void 0 === c2 || c2.querySelector(".resizer-area").classList.add("active");
  }, [u4]), X2 = e5.useCallback(function(e7) {
    if (G3.current) {
      e7.preventDefault();
      var c2 = A3.current + e7.pageX, l = function(e8, c3, t4, l2) {
        var b3 = u(t4).map(G).filter(function(e9) {
          return !e9.isHide;
        }), C2 = b3.findIndex(function(c4) {
          return c4.index === e8;
        }), i3 = (b3 = b3.map(function(e9, c4) {
          return V(V({}, e9), {}, { index: c4 });
        })).reduce(function(e9, c4, t5) {
          return e9 || (t5 > C2 && 0 !== c4.width ? c4 : e9);
        }, null), u5 = b3.reduce(function(e9, c4) {
          return e9 + c4.width;
        }, 0), a5 = b3[C2].minWidth, d2 = l2 > a5 && 0 !== l2 ? l2 : a5, s2 = d2 - b3[C2].width, m3 = b3.map(function(e9, c4) {
          if (i3 && C2 === c4)
            return i3.width - s2 > a5 ? d2 : e9.width;
          if ((null == i3 ? void 0 : i3.index) === c4) {
            var t5 = e9.width - s2;
            return t5 > a5 ? t5 : e9.width;
          }
          return e9.width;
        }), o5 = u5 - m3.reduce(function(e9, c4) {
          return e9 + c4;
        }, 0);
        m3[C2] = m3[C2] + o5;
        var A4 = false, G4 = b3.slice(0).reverse().map(function(e9, t5) {
          var l3 = m3.slice(0).reverse()[t5], n5 = l3 / u5 * 100;
          return e9.isStiff || null != c3 && c3.horizontalScroll ? "".concat(l3, "px") : A4 ? "minmax(0, ".concat(n5, "%)") : (A4 = true, "minmax(0, 1fr)");
        }).slice(0).reverse().join(" "), W3 = function(e9, c4) {
          if (u2(Array.from(e9.classList)).includes("pin-left")) {
            var t5 = m3.reduce(function(e10, t6, l4) {
              return l4 >= c4 ? e10 : e10 + t6;
            }, 0);
            e9.style.left = "".concat(t5, "px");
          }
          if (u2(Array.from(e9.classList)).includes("pin-right")) {
            var l3 = m3.reduceRight(function(e10, t6, l4) {
              return l4 <= c4 ? e10 : e10 + t6;
            }, 0);
            e9.style.right = "".concat(l3, "px");
          }
        };
        return o(t4, W3), a(t4, W3), G4;
      }(b2, d, u4, c2);
      r(l, u4, a4);
    }
  }, [b2, d, u4, a4]), y2 = e5.useCallback(function() {
    var e7;
    G3.current = false;
    var c2 = u4.current.style.getPropertyValue("--data-table-library_grid-template-columns");
    if (o4.current !== c2) {
      x(c2, d);
      var t4 = u(u4).map(G);
      a4.current.dataColumns = t4;
    }
    null === (e7 = s.current) || void 0 === e7 || e7.querySelector(".resizer-area").classList.remove("active");
  }, [d, u4, a4]);
  return e5.useEffect(function() {
    var e7 = m2.current;
    return e7 && (e7.addEventListener("mousedown", W2), document.addEventListener("mousemove", X2), document.addEventListener("mouseup", y2)), function() {
      e7 && (e7.removeEventListener("mousedown", W2), document.removeEventListener("mousemove", X2), document.removeEventListener("mouseup", y2));
    };
  }, [C, W2, X2, y2]), { cellRef: s, resizeRef: m2 };
};
var p = ["index", "className", "hide", "pinLeft", "pinRight", "stiff", "isFooter", "includePreviousColSpan", "previousColSpans", "gridColumnStart", "gridColumnEnd", "resize", "role", "children", "style"];
function h(e7, c2) {
  var t4 = Object.keys(e7);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(e7);
    c2 && (l = l.filter(function(c3) {
      return Object.getOwnPropertyDescriptor(e7, c3).enumerable;
    })), t4.push.apply(t4, l);
  }
  return t4;
}
function x2(e7) {
  for (var c2 = 1; c2 < arguments.length; c2++) {
    var t4 = null != arguments[c2] ? arguments[c2] : {};
    c2 % 2 ? h(Object(t4), true).forEach(function(c3) {
      e2(e7, c3, t4[c3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e7, Object.getOwnPropertyDescriptors(t4)) : h(Object(t4)).forEach(function(c3) {
      Object.defineProperty(e7, c3, Object.getOwnPropertyDescriptor(t4, c3));
    });
  }
  return e7;
}
var R = function(e7, c2) {
  return c2.find(function(c3) {
    return c3.index === e7;
  });
};
var v = function(r4) {
  var I = r4.index, d = r4.className, Z2 = r4.hide, A3 = r4.pinLeft, G3 = r4.pinRight, W2 = r4.stiff, X2 = r4.isFooter, V2 = r4.includePreviousColSpan, h2 = r4.previousColSpans, v2 = r4.gridColumnStart, J = r4.gridColumnEnd, f = r4.resize, H = r4.role, Y = void 0 === H ? "columnheader" : H, N = r4.children, B = r4.style, F = e(r4, p), z = e5.useContext(b);
  !function(r5, I2) {
    var b2 = e5.useContext(A);
    if (!b2)
      throw new Error("No Layout Context.");
    var C = b2.layout, i2 = b2.tableElementRef, u4 = b2.tableMemoryRef;
    e5.useLayoutEffect(function() {
      var e7 = u4.current.dataColumns, c2 = u(i2).map(G), b3 = R(r5, e7), a4 = (null == b3 ? void 0 : b3.isHide) === !!I2;
      if (null != e7 && e7.length && !a4) {
        var d2 = c2.filter(function(e8) {
          return !e8.isHide;
        }).map(function(c3) {
          if (c3.isStiff || null != C && C.horizontalScroll) {
            var t4 = R(c3.index, e7);
            return t4 ? "".concat(t4.width || 2 * t4.minWidth, "px") : "minmax(0px, 1fr)";
          }
          return "minmax(0px, 1fr)";
        }).join(" ");
        r(d2, i2, u4), x(d2, C);
        var s = u(i2).map(G);
        u4.current.dataColumns = s;
      }
    }, [r5, I2, C, i2, u4]);
  }(I, Z2);
  var S = y(I, Z2), Q = S.cellRef, w = S.resizeRef, D = v2 && J, k = D ? J - v2 - 1 : 0, L = V2 ? v2 + h2 : v2, j = V2 ? J + h2 : J;
  return jsx(e5.Fragment, null, jsx(Z, n({ role: Y, "data-table-library_th": "", "data-hide": !!Z2, "data-resize-min-width": "boolean" == typeof f || null == (null == f ? void 0 : f.minWidth) ? 75 : f.minWidth, style: x2(x2({}, D ? { gridColumnStart: L, gridColumnEnd: j } : {}), B), css: css(null == z ? void 0 : z.BaseCell, " ", X2 ? null == z ? void 0 : z.FooterCell : null == z ? void 0 : z.HeaderCell, ";" + (false ? "" : ";label:HeaderCell;"), false ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlYWRlckNlbGwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdFb0IiLCJmaWxlIjoiSGVhZGVyQ2VsbC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBjcyBmcm9tICdjbHN4JztcclxuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xyXG5pbXBvcnQgeyBIZWFkZXJDZWxsQ29udGFpbmVyIH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vY29tcG9uZW50cy9DZWxsJztcclxuaW1wb3J0IHsgVGhlbWVDb250ZXh0IH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vY29udGV4dC9UaGVtZSc7XHJcbmltcG9ydCB7IExheW91dENvbnRleHQsIHByb3BhZ2F0ZVJlc2l6ZWRMYXlvdXQsIHNldFJlc2l6ZWRMYXlvdXQsIH0gZnJvbSAnQHRhYmxlLWxpYnJhcnkvcmVhY3QtdGFibGUtbGlicmFyeS9jb21tb24vY29udGV4dCc7XHJcbmltcG9ydCB7IHJlc2l6ZXJTdHlsZSB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvcmVzaXplL3N0eWxlcyc7XHJcbmltcG9ydCB7IHVzZVJlc2l6ZSB9IGZyb20gJ0B0YWJsZS1saWJyYXJ5L3JlYWN0LXRhYmxlLWxpYnJhcnkvcmVzaXplL3VzZVJlc2l6ZSc7XHJcbmltcG9ydCB7IHRvRGF0YUNvbHVtbiwgZ2V0SGVhZGVyQ29sdW1ucywgfSBmcm9tICdAdGFibGUtbGlicmFyeS9yZWFjdC10YWJsZS1saWJyYXJ5L2NvbW1vbi91dGlsL2NvbHVtbnMnO1xyXG5jb25zdCBnZXRQcmVzZXJ2ZWRDb2x1bW4gPSAoaW5kZXgsIHByZXNlcnZlZERhdGFDb2x1bW5zKSA9PiB7XHJcbiAgICBjb25zdCBmaW5kUHJlc2VydmVkRGF0YUNvbHVtbiA9IChkYXRhQ29sdW1uKSA9PiBkYXRhQ29sdW1uLmluZGV4ID09PSBpbmRleDtcclxuICAgIGNvbnN0IHByZXNlcnZlZERhdGFDb2x1bW4gPSBwcmVzZXJ2ZWREYXRhQ29sdW1ucy5maW5kKGZpbmRQcmVzZXJ2ZWREYXRhQ29sdW1uKTtcclxuICAgIHJldHVybiBwcmVzZXJ2ZWREYXRhQ29sdW1uO1xyXG59O1xyXG5jb25zdCB1c2VVcGRhdGVMYXlvdXQgPSAoaW5kZXgsIGhpZGUpID0+IHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBSZWFjdC51c2VDb250ZXh0KExheW91dENvbnRleHQpO1xyXG4gICAgaWYgKCFjb250ZXh0KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBMYXlvdXQgQ29udGV4dC4nKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHsgbGF5b3V0LCB0YWJsZUVsZW1lbnRSZWYsIHRhYmxlTWVtb3J5UmVmIH0gPSBjb250ZXh0O1xyXG4gICAgUmVhY3QudXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXJ2ZWREYXRhQ29sdW1ucyA9IHRhYmxlTWVtb3J5UmVmLmN1cnJlbnQuZGF0YUNvbHVtbnM7XHJcbiAgICAgICAgY29uc3QgZGF0YUNvbHVtbnMgPSBnZXRIZWFkZXJDb2x1bW5zKHRhYmxlRWxlbWVudFJlZikubWFwKHRvRGF0YUNvbHVtbik7XHJcbiAgICAgICAgY29uc3QgdGhpc1ByZXNlcnZlZERhdGFDb2x1bW4gPSBnZXRQcmVzZXJ2ZWRDb2x1bW4oaW5kZXgsIHByZXNlcnZlZERhdGFDb2x1bW5zKTtcclxuICAgICAgICBjb25zdCBoaWRlU3RhdHVzRGlkTm90Q2hhbmdlID0gdGhpc1ByZXNlcnZlZERhdGFDb2x1bW4/LmlzSGlkZSA9PT0gISFoaWRlO1xyXG4gICAgICAgIGlmICghcHJlc2VydmVkRGF0YUNvbHVtbnM/Lmxlbmd0aCB8fCBoaWRlU3RhdHVzRGlkTm90Q2hhbmdlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY29uc3QgdmlzaWJsZURhdGFDb2x1bW5zID0gZGF0YUNvbHVtbnMuZmlsdGVyKChkYXRhQ29sdW1uKSA9PiAhZGF0YUNvbHVtbi5pc0hpZGUpO1xyXG4gICAgICAgIGNvbnN0IGdldFBhcnRpYWxSZXNpemVkTGF5b3V0ID0gKGRhdGFDb2x1bW4pID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGFDb2x1bW4uaXNTdGlmZiB8fCBsYXlvdXQ/Lmhvcml6b250YWxTY3JvbGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXNlcnZlZERhdGFDb2x1bW4gPSBnZXRQcmVzZXJ2ZWRDb2x1bW4oZGF0YUNvbHVtbi5pbmRleCwgcHJlc2VydmVkRGF0YUNvbHVtbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwcmVzZXJ2ZWREYXRhQ29sdW1uKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnbWlubWF4KDBweCwgMWZyKSc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7cHJlc2VydmVkRGF0YUNvbHVtbi53aWR0aCB8fCBwcmVzZXJ2ZWREYXRhQ29sdW1uLm1pbldpZHRoICogMn1weGA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ21pbm1heCgwcHgsIDFmciknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXNpemVkTGF5b3V0ID0gdmlzaWJsZURhdGFDb2x1bW5zLm1hcChnZXRQYXJ0aWFsUmVzaXplZExheW91dCkuam9pbignICcpO1xyXG4gICAgICAgIHNldFJlc2l6ZWRMYXlvdXQocmVzaXplZExheW91dCwgdGFibGVFbGVtZW50UmVmLCB0YWJsZU1lbW9yeVJlZik7XHJcbiAgICAgICAgcHJvcGFnYXRlUmVzaXplZExheW91dChyZXNpemVkTGF5b3V0LCBsYXlvdXQpO1xyXG4gICAgICAgIGNvbnN0IG5ld1ByZXNlcnZlZERhdGFDb2x1bW5zID0gZ2V0SGVhZGVyQ29sdW1ucyh0YWJsZUVsZW1lbnRSZWYpLm1hcCh0b0RhdGFDb2x1bW4pO1xyXG4gICAgICAgIHRhYmxlTWVtb3J5UmVmLmN1cnJlbnQuZGF0YUNvbHVtbnMgPSBuZXdQcmVzZXJ2ZWREYXRhQ29sdW1ucztcclxuICAgIH0sIFtpbmRleCwgaGlkZSwgbGF5b3V0LCB0YWJsZUVsZW1lbnRSZWYsIHRhYmxlTWVtb3J5UmVmXSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBIZWFkZXJDZWxsID0gKHsgaW5kZXgsIGNsYXNzTmFtZSwgaGlkZSwgcGluTGVmdCwgcGluUmlnaHQsIHN0aWZmLCBpc0Zvb3RlciwgaW5jbHVkZVByZXZpb3VzQ29sU3BhbiwgcHJldmlvdXNDb2xTcGFucywgZ3JpZENvbHVtblN0YXJ0LCBncmlkQ29sdW1uRW5kLCByZXNpemUsIHJvbGUgPSAnY29sdW1uaGVhZGVyJywgY2hpbGRyZW4sIHN0eWxlLCAuLi5yZXN0IH0pID0+IHtcclxuICAgIGNvbnN0IHRoZW1lID0gUmVhY3QudXNlQ29udGV4dChUaGVtZUNvbnRleHQpO1xyXG4gICAgdXNlVXBkYXRlTGF5b3V0KGluZGV4LCBoaWRlKTtcclxuICAgIGNvbnN0IHsgY2VsbFJlZiwgcmVzaXplUmVmIH0gPSB1c2VSZXNpemUoaW5kZXgsIGhpZGUpO1xyXG4gICAgY29uc3QgaGFzQ29sU3BhbiA9IGdyaWRDb2x1bW5TdGFydCAmJiBncmlkQ29sdW1uRW5kO1xyXG4gICAgY29uc3QgY29sU3BhbiA9IGhhc0NvbFNwYW4gPyBncmlkQ29sdW1uRW5kIC0gZ3JpZENvbHVtblN0YXJ0IC0gMSA6IDA7XHJcbiAgICBjb25zdCBjb21wdXRlZEdyaWRDb2x1bW5TdGFydCA9IGluY2x1ZGVQcmV2aW91c0NvbFNwYW5cclxuICAgICAgICA/IGdyaWRDb2x1bW5TdGFydCArIHByZXZpb3VzQ29sU3BhbnNcclxuICAgICAgICA6IGdyaWRDb2x1bW5TdGFydDtcclxuICAgIGNvbnN0IGNvbXB1dGVkR3JpZENvbHVtbkVuZCA9IGluY2x1ZGVQcmV2aW91c0NvbFNwYW5cclxuICAgICAgICA/IGdyaWRDb2x1bW5FbmQgKyBwcmV2aW91c0NvbFNwYW5zXHJcbiAgICAgICAgOiBncmlkQ29sdW1uRW5kO1xyXG4gICAgcmV0dXJuICg8PlxuICAgICAgPEhlYWRlckNlbGxDb250YWluZXIgcm9sZT17cm9sZX0gZGF0YS10YWJsZS1saWJyYXJ5X3RoPVwiXCIgZGF0YS1oaWRlPXshIWhpZGV9IGRhdGEtcmVzaXplLW1pbi13aWR0aD17dHlwZW9mIHJlc2l6ZSA9PT0gJ2Jvb2xlYW4nIHx8IHJlc2l6ZT8ubWluV2lkdGggPT0gbnVsbCA/IDc1IDogcmVzaXplLm1pbldpZHRofSBzdHlsZT17e1xyXG4gICAgICAgICAgICAuLi4oaGFzQ29sU3BhblxyXG4gICAgICAgICAgICAgICAgPyB7IGdyaWRDb2x1bW5TdGFydDogY29tcHV0ZWRHcmlkQ29sdW1uU3RhcnQsIGdyaWRDb2x1bW5FbmQ6IGNvbXB1dGVkR3JpZENvbHVtbkVuZCB9XHJcbiAgICAgICAgICAgICAgICA6IHt9KSxcclxuICAgICAgICAgICAgLi4uc3R5bGUsXHJcbiAgICAgICAgfX0gY3NzPXtjc3MgYFxuICAgICAgICAgICR7dGhlbWU/LkJhc2VDZWxsfVxuICAgICAgICAgICR7aXNGb290ZXIgPyB0aGVtZT8uRm9vdGVyQ2VsbCA6IHRoZW1lPy5IZWFkZXJDZWxsfVxuICAgICAgICBgfSBjbGFzc05hbWU9e2NzKCd0aCcsIGNsYXNzTmFtZSwge1xyXG4gICAgICAgICAgICBzdGlmZixcclxuICAgICAgICAgICAgaGlkZSxcclxuICAgICAgICAgICAgcmVzaXplLFxyXG4gICAgICAgICAgICAncGluLWxlZnQnOiBwaW5MZWZ0LFxyXG4gICAgICAgICAgICAncGluLXJpZ2h0JzogcGluUmlnaHQsXHJcbiAgICAgICAgfSl9IHJlZj17Y2VsbFJlZn0gey4uLnJlc3R9PlxuICAgICAgICA8ZGl2PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAge3Jlc2l6ZSAmJiAhaGlkZSAmJiAoPGRpdiBjbGFzc05hbWU9XCJyZXNpemVyLWFyZWFcIiByZWY9e3Jlc2l6ZVJlZn0gY3NzPXtyZXNpemVyU3R5bGUocmVzaXplKS5hcmVhfT5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc2l6ZXItaGFuZGxlXCIgY3NzPXtyZXNpemVyU3R5bGUocmVzaXplKS5oYW5kbGV9Lz5cbiAgICAgICAgICA8L2Rpdj4pfVxuICAgICAgPC9IZWFkZXJDZWxsQ29udGFpbmVyPlxuXG4gICAgICBcbiAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiBjb2xTcGFuIH0sICgpID0+ICg8SGVhZGVyQ2VsbENvbnRhaW5lciBjbGFzc05hbWU9e2NzKCd0aCcsICdoaWRlJywgJ2NvbHNwYW4nKX0vPikpfVxuICAgIDwvPik7XHJcbn07XHJcbiJdfQ== */"), className: clsx_m_default("th", d, { stiff: W2, hide: Z2, resize: f, "pin-left": A3, "pin-right": G3 }), ref: Q }, F), jsx("div", null, N), f && !Z2 && jsx("div", { className: "resizer-area", ref: w, css: m(f).area }, jsx("span", { className: "resizer-handle", css: m(f).handle }))), Array.from({ length: k }, function() {
    return jsx(Z, { className: clsx_m_default("th", "hide", "colspan") });
  }));
};

// node_modules/@table-library/react-table-library/useSyncControlledState-6e39bfdc.js
var r3 = __toESM(require_react(), 1);
var u3 = function(n5, u4, e7) {
  r3.useEffect(function() {
    u4 && (u4.current[n5] = { state: e7 });
  }, [u4, n5, e7]);
};
var e6 = function(u4, e7, t4, c2, f) {
  var o4 = r3.useReducer(u4, e7), i2 = a2(o4, 2), s = i2[0], a4 = i2[1], l = r3.useRef(null), v2 = r3.useRef(null);
  return r3.useEffect(function() {
    v2.current && (c2.forEach(function(r4) {
      return r4(v2.current, l.current, f ? f.current : void 0);
    }), v2.current = null, l.current = null);
  }, [f, c2, s]), [s, function(r4) {
    t4.forEach(function(n6) {
      return n6(r4, s, f ? f.current : void 0);
    });
    var n5 = u4(s, r4);
    l.current = n5, v2.current = r4, a4(r4);
  }];
};
var t3 = function(r4, n5) {
  return JSON.stringify(r4) === JSON.stringify(n5);
};
var c = function(n5, u4, e7) {
  var c2 = r3.useRef(n5), f = r3.useRef(n5);
  r3.useEffect(function() {
    t3(u4, f.current) && (t3(n5, c2.current) || t3(n5, u4) || e7()), c2.current = n5, f.current = u4;
  }, [u4, e7, n5]);
};

export {
  a2 as a,
  u2 as u,
  G2 as G,
  W,
  v,
  u3 as u2,
  e6 as e,
  c
};
//# sourceMappingURL=chunk-TNUEEKT7.js.map
