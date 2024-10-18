import {
  useTheme_default
} from "./chunk-FGTAPMRG.js";
import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_identifier
} from "./chunk-LD2AEMIW.js";
import {
  require_react
} from "./chunk-UMBEC6V5.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/@mui/material/styles/useTheme.js
var React = __toESM(require_react());
init_defaultTheme();
init_identifier();
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}

// node_modules/@mui/material/styles/getOverlayAlpha.js
var getOverlayAlpha = (elevation) => {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return (alphaValue / 100).toFixed(2);
};
var getOverlayAlpha_default = getOverlayAlpha;

export {
  useTheme,
  getOverlayAlpha_default
};
//# sourceMappingURL=chunk-YE5Q6WFL.js.map
