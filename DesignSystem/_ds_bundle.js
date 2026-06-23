/* @ds-bundle: {"format":3,"namespace":"HinoAIDesignSystem_121ee1","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"RadioCard","sourcePath":"components/forms/RadioCard.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"ChordSheet","sourcePath":"components/hymn/ChordSheet.jsx"},{"name":"ScriptureQuote","sourcePath":"components/hymn/ScriptureQuote.jsx"},{"name":"StepDots","sourcePath":"components/hymn/StepDots.jsx"},{"name":"WaveBars","sourcePath":"components/hymn/WaveBars.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"52606883afe2","components/core/Badge.jsx":"43fc77c055fe","components/core/Button.jsx":"b8eba430d61b","components/core/Card.jsx":"a8dfef189c66","components/core/Icon.jsx":"879f172ae77e","components/core/IconButton.jsx":"37a598bf0038","components/core/Logo.jsx":"44531b8d62e1","components/core/Tag.jsx":"f1cc85cc8f83","components/forms/Checkbox.jsx":"55fdc64f35fd","components/forms/Input.jsx":"e97e1def8cc7","components/forms/RadioCard.jsx":"6abe157366e2","components/forms/Switch.jsx":"0d5b09bead69","components/forms/Textarea.jsx":"159e95487ba5","components/hymn/ChordSheet.jsx":"71f7cbc1a3e6","components/hymn/ScriptureQuote.jsx":"6dca40b68cf8","components/hymn/StepDots.jsx":"825a33f0c6f6","components/hymn/WaveBars.jsx":"537cb10e96ff","ui_kits/creator/GeneratingStep.jsx":"6fa450e72044","ui_kits/creator/RevealStep.jsx":"0b382fd0622e","ui_kits/creator/StoryStep.jsx":"3e0b8828a448","ui_kits/creator/StyleStep.jsx":"4d0ba666b1f9"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HinoAIDesignSystem_121ee1 = window.HinoAIDesignSystem_121ee1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-avatar{font-family:var(--font-sans);display:inline-flex;align-items:center;justify-content:center;flex:none;
  border-radius:50%;overflow:hidden;font-weight:600;color:var(--text-on-gold);background:var(--wash-gold);
  border:1.5px solid rgba(255,255,255,.6);box-shadow:var(--shadow-xs);}
.hino-avatar img{width:100%;height:100%;object-fit:cover;display:block;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-avatar-css')) {
  const s = document.createElement('style');
  s.id = 'hino-avatar-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
const SIZES = {
  sm: 28,
  md: 40,
  lg: 56
};
function initials(name = '') {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] || '') + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
}

/** User avatar — image or warm gold initials fallback. */
function Avatar({
  src,
  name = '',
  size = 'md',
  className = '',
  style = {},
  ...rest
}) {
  const px = typeof size === 'number' ? size : SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `hino-avatar ${className}`.trim(),
    style: {
      width: px,
      height: px,
      fontSize: px * 0.4,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : /*#__PURE__*/React.createElement("span", null, initials(name) || '\u266A'));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-badge{font-family:var(--font-sans);font-weight:600;display:inline-flex;align-items:center;gap:5px;border-radius:var(--radius-pill);
  font-size:11.5px;letter-spacing:.02em;line-height:1;padding:5px 10px;border:1px solid transparent;white-space:nowrap;}
.hino-badge--neutral{background:var(--bg-sunken);color:var(--text-muted);border-color:var(--border);}
.hino-badge--gold{background:var(--accent-soft);color:var(--accent-ink);border-color:var(--border-gold);}
.hino-badge--emotion{background:var(--emotion-soft);color:var(--emotion-strong);}
.hino-badge--success{background:var(--success-soft);color:var(--success);}
.hino-badge--solid{background:var(--accent);color:var(--text-on-gold);}
.hino-badge--dot::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-badge-css')) {
  const s = document.createElement('style');
  s.id = 'hino-badge-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Small status / category label. */
function Badge({
  tone = 'neutral',
  dot = false,
  className = '',
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `hino-badge hino-badge--${tone}${dot ? ' hino-badge--dot' : ''} ${className}`.trim(),
    style: style
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-card{font-family:var(--font-sans);background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-card);
  box-shadow:var(--shadow-sm);color:var(--text-body);transition:box-shadow var(--dur-normal) var(--ease-standard),transform var(--dur-normal) var(--ease-standard),border-color var(--dur-normal) var(--ease-standard);}
.hino-card--pad{padding:var(--space-5);}
.hino-card--pad-lg{padding:var(--space-6);}
.hino-card--interactive{cursor:pointer;}
.hino-card--interactive:hover{box-shadow:var(--shadow-md);transform:translateY(-2px);border-color:var(--border-strong);}
.hino-card--selected{border-color:var(--border-gold);box-shadow:var(--glow-gold);}
.hino-card--raised{box-shadow:var(--shadow-lg);}
.hino-card--flat{box-shadow:none;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-card-css')) {
  const s = document.createElement('style');
  s.id = 'hino-card-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Surface container — white on ivory, warm soft shadow, gently rounded. */
function Card({
  pad = 'md',
  interactive = false,
  selected = false,
  elevation = 'sm',
  as = 'div',
  className = '',
  children,
  style = {},
  ...rest
}) {
  const Tag = as;
  const padCls = pad === 'lg' ? ' hino-card--pad-lg' : pad === 'none' ? '' : ' hino-card--pad';
  const elev = elevation === 'lg' ? ' hino-card--raised' : elevation === 'none' ? ' hino-card--flat' : '';
  const cls = `hino-card${padCls}${elev}${interactive ? ' hino-card--interactive' : ''}${selected ? ' hino-card--selected' : ''} ${className}`.trim();
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    style: style
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hino.AI icon set — a curated subset of Lucide (MIT), inlined so components
 * stay self-contained. Production may swap in the full `lucide-react` package.
 * Stroke icons inherit `currentColor`; a few are solid (play).
 */
const ICONS = {
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  pause: '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z"/>',
  sparkles: '<path d="M9.94 14.06A2 2 0 0 0 8.5 12.62l-5.14-1.32a.5.5 0 0 1 0-.97L8.5 9.01a2 2 0 0 0 1.44-1.44l1.32-5.14a.5.5 0 0 1 .97 0l1.32 5.14a2 2 0 0 0 1.44 1.44l5.14 1.32a.5.5 0 0 1 0 .97l-5.14 1.32a2 2 0 0 0-1.44 1.44l-1.32 5.14a.5.5 0 0 1-.97 0Z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
  book: '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  wave: '<path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  church: '<path d="M10 9h4"/><path d="M12 7v5"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 22V5.6a2 2 0 0 0-1.1-1.8l-4-2.1a2 2 0 0 0-1.8 0l-4 2.1A2 2 0 0 0 6 5.6V22"/><path d="M4 22V11.5a2 2 0 0 1 1-1.7l1-.6"/><path d="M20 22V11.5a2 2 0 0 0-1-1.7l-1-.6"/>',
  wand: '<path d="m15 4 5 5"/><path d="M3 21 17.6 6.4a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L0 16"/><path d="M9 7v2"/><path d="M19 13v2"/>'
};
const SOLID = new Set(['play']);
function Icon({
  name = 'music',
  size = 20,
  stroke = 2,
  color,
  style = {},
  ...rest
}) {
  const inner = ICONS[name] || ICONS.music;
  const solid = SOLID.has(name);
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: solid ? 'currentColor' : 'none',
    stroke: solid ? 'none' : 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      color,
      display: 'inline-block',
      flex: 'none',
      verticalAlign: 'middle',
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: inner
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-btn{font-family:var(--font-sans);font-weight:600;border:1.5px solid transparent;border-radius:var(--radius-pill);
  display:inline-flex;align-items:center;justify-content:center;gap:.5em;cursor:pointer;text-decoration:none;white-space:nowrap;
  transition:transform var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard);}
.hino-btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring);}
.hino-btn:active{transform:scale(.98);}
.hino-btn[disabled]{cursor:not-allowed;opacity:.5;transform:none;box-shadow:none;}
.hino-btn--sm{height:var(--control-h-sm);padding:0 16px;font-size:14px;}
.hino-btn--md{height:var(--control-h-md);padding:0 22px;font-size:15px;}
.hino-btn--lg{height:var(--control-h-lg);padding:0 30px;font-size:17px;}
.hino-btn--full{width:100%;}
.hino-btn--primary{background:var(--accent);color:var(--text-on-gold);box-shadow:var(--shadow-sm);}
.hino-btn--primary:hover:not([disabled]){background:var(--accent-strong);box-shadow:var(--glow-soft);}
.hino-btn--secondary{background:transparent;color:var(--text-heading);border-color:var(--border-strong);}
.hino-btn--secondary:hover:not([disabled]){background:var(--bg-subtle);border-color:var(--accent);color:var(--accent-ink);}
.hino-btn--ghost{background:transparent;color:var(--text-body);}
.hino-btn--ghost:hover:not([disabled]){background:var(--bg-subtle);color:var(--text-heading);}
.hino-btn--gold-soft{background:var(--accent-soft);color:var(--accent-ink);}
.hino-btn--gold-soft:hover:not([disabled]){background:var(--gold-300);}
.hino-btn--danger{background:transparent;color:var(--danger);border-color:color-mix(in srgb,var(--danger) 40%,transparent);}
.hino-btn--danger:hover:not([disabled]){background:var(--danger-soft);}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-btn-css')) {
  const s = document.createElement('style');
  s.id = 'hino-btn-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Primary action control. Pill-shaped, warm gold by default. */
function Button({
  variant = 'primary',
  size = 'md',
  full = false,
  disabled = false,
  iconLeft,
  iconRight,
  as = 'button',
  className = '',
  children,
  style = {},
  ...rest
}) {
  const Tag = as;
  const cls = `hino-btn hino-btn--${size} hino-btn--${variant}${full ? ' hino-btn--full' : ''} ${className}`.trim();
  const isize = size === 'lg' ? 20 : size === 'sm' ? 16 : 18;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    disabled: Tag === 'button' ? disabled : undefined,
    style: style
  }, rest), iconLeft && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: isize
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: isize
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-iconbtn{font-family:var(--font-sans);border:1.5px solid transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;
  border-radius:var(--radius-pill);color:var(--text-body);background:transparent;flex:none;
  transition:transform var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard);}
.hino-iconbtn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring);}
.hino-iconbtn:active{transform:scale(.94);}
.hino-iconbtn[disabled]{cursor:not-allowed;opacity:.45;}
.hino-iconbtn--ghost:hover:not([disabled]){background:var(--bg-subtle);color:var(--text-heading);}
.hino-iconbtn--outline{border-color:var(--border-strong);}
.hino-iconbtn--outline:hover:not([disabled]){border-color:var(--accent);color:var(--accent-ink);background:var(--bg-subtle);}
.hino-iconbtn--solid{background:var(--accent);color:var(--text-on-gold);box-shadow:var(--shadow-sm);}
.hino-iconbtn--solid:hover:not([disabled]){background:var(--accent-strong);box-shadow:var(--glow-soft);}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-iconbtn-css')) {
  const s = document.createElement('style');
  s.id = 'hino-iconbtn-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
const SIZES = {
  sm: 36,
  md: 44,
  lg: 56
};

/** Square-ish circular button containing a single icon. */
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  label,
  disabled = false,
  className = '',
  style = {},
  ...rest
}) {
  const px = SIZES[size] || SIZES.md;
  const isize = size === 'lg' ? 24 : size === 'sm' ? 18 : 20;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: `hino-iconbtn hino-iconbtn--${variant} ${className}`.trim(),
    "aria-label": label,
    title: label,
    disabled: disabled,
    style: {
      width: px,
      height: px,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: isize
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Hino.AI logo — gold roundel with a music-note mark + "Hino.AI" wordmark.
 * variant 'light' for ivory backgrounds, 'sanctuary' for the dark theme.
 */
function Logo({
  variant = 'light',
  size = 40,
  showWordmark = true,
  style = {},
  ...rest
}) {
  const sanctuary = variant === 'sanctuary';
  const noteColor = sanctuary ? '#e6cf96' : '#11192b';
  const wordColor = sanctuary ? '#fdfaf3' : '#1a2438';
  const aiColor = sanctuary ? '#d9b86a' : '#c9a14a';
  const mark = /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 72 72",
    fill: "none",
    style: {
      flex: 'none',
      display: 'block'
    },
    "aria-hidden": "true"
  }, sanctuary ? /*#__PURE__*/React.createElement("circle", {
    cx: "36",
    cy: "36",
    r: "34",
    fill: "none",
    stroke: "#c9a14a",
    strokeWidth: "1.5"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "hinoGoldLogo",
    x1: "10",
    y1: "6",
    x2: "62",
    y2: "66",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    stopColor: "#d9b86a"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#b8893a"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: "36",
    cy: "36",
    r: "34",
    fill: "url(#hinoGoldLogo)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "36",
    cy: "36",
    r: "33",
    fill: "none",
    stroke: "#9c7330",
    strokeOpacity: "0.45"
  })), /*#__PURE__*/React.createElement("g", {
    transform: "translate(13.5,12) scale(1.62)",
    stroke: noteColor,
    strokeWidth: "2.1",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18V5l12-2v13",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "3",
    fill: noteColor
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "18",
    cy: "16",
    r: "3",
    fill: noteColor
  })));
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.34,
      ...style
    }
  }, rest), mark, showWordmark && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: size * 0.86,
      letterSpacing: '-0.02em',
      lineHeight: 1,
      color: wordColor
    }
  }, "Hino", /*#__PURE__*/React.createElement("span", {
    style: {
      color: aiColor
    }
  }, ".AI")));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-tag{font-family:var(--font-sans);font-weight:500;display:inline-flex;align-items:center;gap:7px;border-radius:var(--radius-pill);
  font-size:13.5px;line-height:1;padding:8px 14px;cursor:pointer;user-select:none;
  background:var(--surface-card);color:var(--text-body);border:1.5px solid var(--border);
  transition:background var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard);}
.hino-tag:hover{border-color:var(--accent);color:var(--accent-ink);}
.hino-tag[aria-pressed="true"]{background:var(--accent-soft);border-color:var(--border-gold);color:var(--accent-ink);font-weight:600;}
.hino-tag:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring);}
.hino-tag--static{cursor:default;}
.hino-tag--static:hover{border-color:var(--border);color:var(--text-body);}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-tag-css')) {
  const s = document.createElement('style');
  s.id = 'hino-tag-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Selectable chip — themes, moods, filters. Becomes static (non-interactive) when `selectable={false}`. */
function Tag({
  selected = false,
  selectable = true,
  onClick,
  className = '',
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: `hino-tag${selectable ? '' : ' hino-tag--static'} ${className}`.trim(),
    "aria-pressed": selectable ? selected : undefined,
    onClick: onClick,
    style: style
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-check{font-family:var(--font-sans);display:inline-flex;align-items:flex-start;gap:11px;cursor:pointer;user-select:none;color:var(--text-body);}
.hino-check input{position:absolute;opacity:0;width:0;height:0;}
.hino-check__box{width:21px;height:21px;flex:none;border-radius:6px;border:1.5px solid var(--border-strong);background:var(--surface-card);
  display:flex;align-items:center;justify-content:center;color:var(--text-on-gold);margin-top:1px;
  transition:background var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard);}
.hino-check__box svg{opacity:0;transform:scale(.6);transition:opacity var(--dur-fast),transform var(--dur-fast) var(--ease-out);}
.hino-check input:checked + .hino-check__box{background:var(--accent);border-color:var(--accent);}
.hino-check input:checked + .hino-check__box svg{opacity:1;transform:scale(1);}
.hino-check input:focus-visible + .hino-check__box{box-shadow:0 0 0 3px var(--focus-ring);}
.hino-check__txt{font-size:14.5px;line-height:1.45;}
.hino-check--round .hino-check__box{border-radius:50%;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-check-css')) {
  const s = document.createElement('style');
  s.id = 'hino-check-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Checkbox (square) or radio-style (round) with a label. */
function Checkbox({
  label,
  checked,
  round = false,
  className = '',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `hino-check${round ? ' hino-check--round' : ''} ${className}`.trim(),
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: round ? 'radio' : 'checkbox',
    checked: checked
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "hino-check__box"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    stroke: 3
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "hino-check__txt"
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-field{font-family:var(--font-sans);display:flex;flex-direction:column;gap:7px;}
.hino-field__label{font-size:13px;font-weight:600;color:var(--text-heading);}
.hino-field__req{color:var(--emotion);margin-left:2px;}
.hino-field__wrap{position:relative;display:flex;align-items:center;}
.hino-field__icon{position:absolute;left:14px;color:var(--text-faint);pointer-events:none;display:flex;}
.hino-input{font-family:var(--font-sans);width:100%;box-sizing:border-box;height:var(--control-h-md);padding:0 14px;font-size:15px;color:var(--text-heading);
  background:var(--surface-card);border:1.5px solid var(--border);border-radius:var(--radius-md);outline:none;
  transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard);}
.hino-input::placeholder{color:var(--text-faint);}
.hino-input:hover{border-color:var(--border-strong);}
.hino-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--focus-ring);}
.hino-input--icon{padding-left:42px;}
.hino-input--invalid{border-color:var(--danger);}
.hino-input--invalid:focus{box-shadow:0 0 0 3px var(--danger-soft);}
.hino-field__hint{font-size:12.5px;color:var(--text-muted);}
.hino-field__hint--err{color:var(--danger);}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-input-css')) {
  const s = document.createElement('style');
  s.id = 'hino-input-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Single-line text field with optional label, leading icon, hint and error. */
function Input({
  label,
  icon,
  hint,
  error,
  required = false,
  id,
  className = '',
  style = {},
  ...rest
}) {
  const fid = id || (label ? 'in-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: `hino-field ${className}`.trim(),
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "hino-field__label",
    htmlFor: fid
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "hino-field__req"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "hino-field__wrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "hino-field__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: `hino-input${icon ? ' hino-input--icon' : ''}${error ? ' hino-input--invalid' : ''}`,
    "aria-invalid": !!error
  }, rest))), (error || hint) && /*#__PURE__*/React.createElement("span", {
    className: `hino-field__hint${error ? ' hino-field__hint--err' : ''}`
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-radiocard{font-family:var(--font-sans);position:relative;display:flex;align-items:flex-start;gap:14px;width:100%;text-align:left;cursor:pointer;
  background:var(--surface-card);border:1.5px solid var(--border);border-radius:var(--radius-lg);padding:18px;box-shadow:var(--shadow-xs);
  transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-standard);}
.hino-radiocard:hover{border-color:var(--border-strong);box-shadow:var(--shadow-sm);}
.hino-radiocard:active{transform:scale(.99);}
.hino-radiocard:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring);}
.hino-radiocard[aria-pressed="true"]{border-color:var(--border-gold);box-shadow:var(--glow-gold);}
.hino-radiocard__icon{width:44px;height:44px;flex:none;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;
  background:var(--accent-soft);color:var(--accent-ink);}
.hino-radiocard[aria-pressed="true"] .hino-radiocard__icon{background:var(--accent);color:var(--text-on-gold);}
.hino-radiocard__title{font-family:var(--font-display);font-weight:600;font-size:18px;color:var(--text-heading);line-height:1.15;margin:0 0 3px;}
.hino-radiocard__desc{font-size:13.5px;color:var(--text-muted);line-height:1.45;margin:0;}
.hino-radiocard__tick{position:absolute;top:14px;right:14px;width:22px;height:22px;border-radius:50%;border:1.5px solid var(--border-strong);
  display:flex;align-items:center;justify-content:center;color:#fff;background:transparent;transition:all var(--dur-fast) var(--ease-standard);}
.hino-radiocard[aria-pressed="true"] .hino-radiocard__tick{background:var(--accent);border-color:var(--accent);}
.hino-radiocard__tick svg{opacity:0;transition:opacity var(--dur-fast);}
.hino-radiocard[aria-pressed="true"] .hino-radiocard__tick svg{opacity:1;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-radiocard-css')) {
  const s = document.createElement('style');
  s.id = 'hino-radiocard-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Large selectable option card — hymn style, voice, plan. Gold ring + tick when selected. */
function RadioCard({
  icon = 'music',
  title,
  description,
  selected = false,
  onClick,
  className = '',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: `hino-radiocard ${className}`.trim(),
    "aria-pressed": selected,
    onClick: onClick,
    style: style
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "hino-radiocard__icon"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      paddingRight: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "hino-radiocard__title"
  }, title), description && /*#__PURE__*/React.createElement("span", {
    className: "hino-radiocard__desc"
  }, description)), /*#__PURE__*/React.createElement("span", {
    className: "hino-radiocard__tick"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    stroke: 3
  })));
}
Object.assign(__ds_scope, { RadioCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-switch{font-family:var(--font-sans);display:inline-flex;align-items:center;gap:11px;cursor:pointer;user-select:none;color:var(--text-body);}
.hino-switch input{position:absolute;opacity:0;width:0;height:0;}
.hino-switch__track{width:44px;height:26px;flex:none;border-radius:var(--radius-pill);background:var(--ink-300);position:relative;
  transition:background var(--dur-normal) var(--ease-standard);}
.hino-switch__thumb{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:var(--shadow-sm);
  transition:transform var(--dur-normal) var(--ease-out);}
.hino-switch input:checked + .hino-switch__track{background:var(--accent);}
.hino-switch input:checked + .hino-switch__track .hino-switch__thumb{transform:translateX(18px);}
.hino-switch input:focus-visible + .hino-switch__track{box-shadow:0 0 0 3px var(--focus-ring);}
.hino-switch__txt{font-size:14.5px;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-switch-css')) {
  const s = document.createElement('style');
  s.id = 'hino-switch-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** On/off toggle with a label. */
function Switch({
  label,
  checked,
  className = '',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: `hino-switch ${className}`.trim(),
    style: style
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "hino-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hino-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "hino-switch__txt"
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-ta-field{font-family:var(--font-sans);display:flex;flex-direction:column;gap:7px;}
.hino-ta-label{font-size:13px;font-weight:600;color:var(--text-heading);}
.hino-textarea{font-family:var(--font-sans);width:100%;box-sizing:border-box;padding:13px 15px;font-size:15px;line-height:1.55;color:var(--text-heading);
  background:var(--surface-card);border:1.5px solid var(--border);border-radius:var(--radius-md);outline:none;resize:vertical;min-height:120px;
  transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard);}
.hino-textarea::placeholder{color:var(--text-faint);}
.hino-textarea:hover{border-color:var(--border-strong);}
.hino-textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--focus-ring);}
.hino-ta-foot{display:flex;justify-content:space-between;font-size:12.5px;color:var(--text-muted);}
.hino-ta-count{font-family:var(--font-mono);font-size:11.5px;color:var(--text-faint);}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-textarea-css')) {
  const s = document.createElement('style');
  s.id = 'hino-textarea-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Multi-line input — the testimony / story field. Optional character count. */
function Textarea({
  label,
  hint,
  value,
  maxLength,
  showCount = false,
  id,
  className = '',
  style = {},
  ...rest
}) {
  const fid = id || (label ? 'ta-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const len = typeof value === 'string' ? value.length : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: `hino-ta-field ${className}`.trim(),
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "hino-ta-label",
    htmlFor: fid
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    className: "hino-textarea",
    value: value,
    maxLength: maxLength
  }, rest)), (hint || showCount) && /*#__PURE__*/React.createElement("div", {
    className: "hino-ta-foot"
  }, /*#__PURE__*/React.createElement("span", null, hint), showCount && /*#__PURE__*/React.createElement("span", {
    className: "hino-ta-count"
  }, len, maxLength ? ` / ${maxLength}` : '')));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/hymn/ChordSheet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-chordsheet{font-family:var(--font-mono);font-size:15px;line-height:1.25;color:var(--text-body);}
.hino-chordsheet__line{margin:0 0 14px;}
.hino-chordsheet__chords{color:var(--accent-ink);font-weight:700;white-space:pre;margin:0;}
.hino-chordsheet__lyric{color:var(--text-heading);white-space:pre;margin:0;}
.hino-chordsheet__section{font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent-ink);margin:0 0 8px;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-chordsheet-css')) {
  const s = document.createElement('style');
  s.id = 'hino-chordsheet-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Cifra — fixed-width chord line aligned above its lyric line. */
function ChordSheet({
  lines = [],
  section,
  className = '',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `hino-chordsheet ${className}`.trim(),
    style: style
  }, rest), section && /*#__PURE__*/React.createElement("p", {
    className: "hino-chordsheet__section"
  }, section), lines.map((ln, i) => /*#__PURE__*/React.createElement("div", {
    className: "hino-chordsheet__line",
    key: i
  }, ln.chords != null && /*#__PURE__*/React.createElement("p", {
    className: "hino-chordsheet__chords"
  }, ln.chords), /*#__PURE__*/React.createElement("p", {
    className: "hino-chordsheet__lyric"
  }, ln.text))));
}
Object.assign(__ds_scope, { ChordSheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/hymn/ChordSheet.jsx", error: String((e && e.message) || e) }); }

// components/hymn/ScriptureQuote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-scripture{font-family:var(--font-serif);position:relative;}
.hino-scripture__halo{position:absolute;left:50%;top:-30%;width:140%;height:160%;transform:translateX(-50%);background:var(--wash-halo);pointer-events:none;}
.hino-scripture__verse{font-style:italic;font-weight:500;line-height:1.32;margin:0 0 .5em;color:var(--text-heading);position:relative;}
.hino-scripture__ref{font-family:var(--font-sans);font-weight:600;letter-spacing:.04em;color:var(--accent-ink);position:relative;}
.hino-scripture--center{text-align:center;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-scripture-css')) {
  const s = document.createElement('style');
  s.id = 'hino-scripture-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
const SIZES = {
  sm: 20,
  md: 28,
  lg: 40,
  xl: 56
};

/** The signature scripture treatment — italic Spectral verse + reference, optional golden halo. */
function ScriptureQuote({
  verse,
  reference,
  size = 'md',
  align = 'left',
  halo = false,
  className = '',
  style = {},
  ...rest
}) {
  const fs = SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: `hino-scripture${align === 'center' ? ' hino-scripture--center' : ''} ${className}`.trim(),
    style: {
      margin: 0,
      ...style
    }
  }, rest), halo && /*#__PURE__*/React.createElement("span", {
    className: "hino-scripture__halo"
  }), /*#__PURE__*/React.createElement("blockquote", {
    className: "hino-scripture__verse",
    style: {
      fontSize: fs
    }
  }, `\u201C${verse}\u201D`), reference && /*#__PURE__*/React.createElement("figcaption", {
    className: "hino-scripture__ref",
    style: {
      fontSize: Math.max(12, fs * 0.34)
    }
  }, "\u2014 ", reference));
}
Object.assign(__ds_scope, { ScriptureQuote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/hymn/ScriptureQuote.jsx", error: String((e && e.message) || e) }); }

// components/hymn/StepDots.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.hino-steps{font-family:var(--font-sans);display:flex;align-items:center;gap:0;}
.hino-steps__dot{width:11px;height:11px;border-radius:50%;background:var(--ink-200);flex:none;
  transition:background var(--dur-normal) var(--ease-standard),transform var(--dur-normal) var(--ease-standard);}
.hino-steps__dot--done{background:var(--accent);}
.hino-steps__dot--current{background:var(--accent);transform:scale(1.35);box-shadow:0 0 0 4px var(--accent-soft);}
.hino-steps__seg{width:34px;height:2px;background:var(--ink-200);flex:none;}
.hino-steps__seg--done{background:var(--accent);}
.hino-steps__label{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--text-faint);margin-left:14px;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-steps-css')) {
  const s = document.createElement('style');
  s.id = 'hino-steps-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}

/** Progress dots for the creation flow — "PASSO n DE total". */
function StepDots({
  total = 3,
  current = 1,
  showLabel = true,
  className = '',
  style = {},
  ...rest
}) {
  const items = [];
  for (let i = 1; i <= total; i++) {
    const state = i < current ? 'done' : i === current ? 'current' : '';
    items.push(/*#__PURE__*/React.createElement("span", {
      key: 'd' + i,
      className: `hino-steps__dot${state ? ' hino-steps__dot--' + state : ''}`
    }));
    if (i < total) items.push(/*#__PURE__*/React.createElement("span", {
      key: 's' + i,
      className: `hino-steps__seg${i < current ? ' hino-steps__seg--done' : ''}`
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: `hino-steps ${className}`.trim(),
    style: style,
    role: "progressbar",
    "aria-valuenow": current,
    "aria-valuemin": 1,
    "aria-valuemax": total
  }, rest), items, showLabel && /*#__PURE__*/React.createElement("span", {
    className: "hino-steps__label"
  }, "Passo ", current, " de ", total));
}
Object.assign(__ds_scope, { StepDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/hymn/StepDots.jsx", error: String((e && e.message) || e) }); }

// components/hymn/WaveBars.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
@keyframes hino-wave{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
.hino-wave{display:inline-flex;align-items:center;gap:3px;height:32px;}
.hino-wave__bar{width:3.5px;border-radius:var(--radius-pill);background:var(--accent);transform-origin:center;transform:scaleY(.4);}
.hino-wave--playing .hino-wave__bar{animation:hino-wave 900ms var(--ease-standard) infinite;}
@media (prefers-reduced-motion: reduce){.hino-wave--playing .hino-wave__bar{animation:none;}}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-wave-css')) {
  const s = document.createElement('style');
  s.id = 'hino-wave-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
// deterministic pseudo-random heights for a natural waveform
const H = [0.5, 0.8, 0.45, 1, 0.65, 0.9, 0.4, 0.75, 0.55, 0.95, 0.6, 0.85, 0.5, 0.7, 0.42, 0.88, 0.58, 0.78, 0.48, 0.92];

/** Audio waveform bars — animate while playing. */
function WaveBars({
  bars = 20,
  playing = false,
  height = 32,
  color,
  className = '',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `hino-wave${playing ? ' hino-wave--playing' : ''} ${className}`.trim(),
    style: {
      height,
      ...style
    }
  }, rest), Array.from({
    length: bars
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "hino-wave__bar",
    style: {
      height: '100%',
      transform: `scaleY(${H[i % H.length]})`,
      animationDelay: `${i % H.length * 70}ms`,
      background: color
    }
  })));
}
Object.assign(__ds_scope, { WaveBars });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/hymn/WaveBars.jsx", error: String((e && e.message) || e) }); }

// ui_kits/creator/GeneratingStep.jsx
try { (() => {
// GeneratingStep — the "compondo seu hino" moment: pulsing mark + waveform + progress.
(function () {
  const {
    Logo,
    WaveBars,
    ScriptureQuote
  } = window.HinoAIDesignSystem_121ee1;
  const STAGES = ['Interpretando seu testemunho…', 'Escrevendo a letra…', 'Compondo a melodia…', 'Gravando a voz…'];
  function GeneratingStep({
    progress,
    stage
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 26,
        padding: '20px 0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        width: 132,
        height: 132,
        borderRadius: '50%',
        background: 'var(--wash-halo)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "hino-pulse",
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      showWordmark: false,
      size: 72
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 34,
        lineHeight: 1.15,
        color: 'var(--text-heading)',
        margin: '0 0 10px',
        whiteSpace: 'nowrap'
      }
    }, "Compondo seu hino"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 16,
        color: 'var(--text-muted)',
        margin: 0,
        minHeight: 22
      }
    }, STAGES[stage] || STAGES[0])), /*#__PURE__*/React.createElement(WaveBars, {
      playing: true,
      bars: 32,
      height: 44
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 320,
        maxWidth: '80%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 'var(--radius-pill)',
        background: 'var(--bg-sunken)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: '100%',
        width: progress + '%',
        background: 'var(--wash-gold)',
        borderRadius: 'var(--radius-pill)',
        transition: 'width 400ms var(--ease-out)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--text-faint)',
        marginTop: 8
      }
    }, progress, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        paddingTop: 8
      }
    }, /*#__PURE__*/React.createElement(ScriptureQuote, {
      verse: "Cantai ao Senhor um c\xE2ntico novo.",
      reference: "Salmos 96:1",
      size: "sm",
      align: "center"
    })));
  }
  window.GeneratingStep = GeneratingStep;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/creator/GeneratingStep.jsx", error: String((e && e.message) || e) }); }

// ui_kits/creator/RevealStep.jsx
try { (() => {
// RevealStep — the sanctuary "reveal": finished hymn presented on dark.
(function () {
  const {
    Logo,
    Button,
    IconButton,
    WaveBars,
    Badge
  } = window.HinoAIDesignSystem_121ee1;
  function RevealStep({
    title,
    themes,
    playing,
    setPlaying,
    onRestart,
    onOpenPlayer
  }) {
    return /*#__PURE__*/React.createElement("div", {
      "data-theme": "sanctuary",
      className: "hino-reveal",
      style: {
        background: 'var(--wash-sanctuary)',
        borderRadius: 'var(--radius-xl)',
        padding: '46px 40px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: 'var(--shadow-xl)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'var(--wash-halo)',
        pointerEvents: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 22
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "solid"
    }, "Seu hino est\xE1 pronto"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 52,
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
        color: 'var(--text-heading)',
        margin: 0
      }
    }, "Uma porta melhor"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    }, themes.map(t => /*#__PURE__*/React.createElement(Badge, {
      key: t,
      tone: "gold"
    }, t))), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: 19,
        lineHeight: 1.7,
        color: 'var(--text-body)',
        maxWidth: 440,
        margin: '4px 0 0'
      }
    }, "\u201CQuando a porta se fechou, eu chorei;", /*#__PURE__*/React.createElement("br", null), "mas o Senhor abriu o c\xE9u pra mim.\u201D"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        marginTop: 6
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      icon: playing ? 'pause' : 'play',
      variant: "solid",
      size: "lg",
      label: "Tocar",
      onClick: () => setPlaying(p => !p)
    }), /*#__PURE__*/React.createElement(WaveBars, {
      playing: playing,
      bars: 36,
      height: 46,
      color: "var(--gold-400)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement(Button, {
      iconLeft: "book",
      onClick: onOpenPlayer
    }, "Abrir player"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconLeft: "download"
    }, "Baixar"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      iconLeft: "share"
    }, "Compartilhar")), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onRestart,
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: 13.5,
        marginTop: 4,
        textDecoration: 'underline',
        textUnderlineOffset: 3
      }
    }, "Criar outro hino")));
  }
  window.RevealStep = RevealStep;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/creator/RevealStep.jsx", error: String((e && e.message) || e) }); }

// ui_kits/creator/StoryStep.jsx
try { (() => {
// StoryStep — "Conte sua história": testimony textarea + theme tags.
(function () {
  const {
    Textarea,
    Tag,
    Button,
    StepDots,
    ScriptureQuote
  } = window.HinoAIDesignSystem_121ee1;
  const THEMES = ['Gratidão', 'Esperança', 'Fé', 'Família', 'Cura', 'Segunda vinda', 'Perdão'];
  function StoryStep({
    story,
    setStory,
    themes,
    toggleTheme,
    onNext
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 28
      }
    }, /*#__PURE__*/React.createElement(StepDots, {
      total: 3,
      current: 1
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 40,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: 'var(--text-heading)',
        margin: '0 0 10px'
      }
    }, "Conte sua hist\xF3ria"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 17,
        lineHeight: 1.55,
        color: 'var(--text-muted)',
        margin: 0,
        maxWidth: 460
      }
    }, "Um momento de f\xE9, uma supera\xE7\xE3o, uma gra\xE7a recebida. N\xF3s transformamos em louvor.")), /*#__PURE__*/React.createElement(Textarea, {
      label: "Seu testemunho",
      placeholder: "Perdi meu emprego em 2024, mas Deus abriu uma porta melhor\u2026",
      showCount: true,
      maxLength: 600,
      value: story,
      onChange: e => setStory(e.target.value),
      rows: 5
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-heading)',
        margin: '0 0 12px'
      }
    }, "Temas que aparecem na sua hist\xF3ria"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 9
      }
    }, THEMES.map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t,
      selected: themes.includes(t),
      onClick: () => toggleTheme(t)
    }, t)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        paddingTop: 4
      }
    }, /*#__PURE__*/React.createElement(ScriptureQuote, {
      verse: "Cantai ao Senhor um c\xE2ntico novo.",
      reference: "Salmos 96:1",
      size: "sm"
    }), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      iconRight: "arrowRight",
      disabled: story.trim().length < 12,
      onClick: onNext
    }, "Continuar")));
  }
  window.StoryStep = StoryStep;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/creator/StoryStep.jsx", error: String((e && e.message) || e) }); }

// ui_kits/creator/StyleStep.jsx
try { (() => {
// StyleStep — "Escolha o estilo": hymn arrangement + tone + options.
(function () {
  const {
    RadioCard,
    Switch,
    Button,
    StepDots,
    Badge
  } = window.HinoAIDesignSystem_121ee1;
  const STYLES = [{
    id: 'trad',
    icon: 'church',
    title: 'Hino tradicional',
    desc: 'Solene, do hinário clássico adventista'
  }, {
    id: 'quart',
    icon: 'music',
    title: 'Quarteto',
    desc: 'Quatro vozes em harmonia'
  }, {
    id: 'cong',
    icon: 'user',
    title: 'Congregacional',
    desc: 'Simples, para toda a igreja cantar'
  }, {
    id: 'jovem',
    icon: 'sparkles',
    title: 'Jovem',
    desc: 'Contemporâneo e inspirador'
  }];
  const TONES = ['Solene', 'Alegre', 'Inspirador', 'Sereno'];
  function StyleStep({
    style,
    setStyle,
    tone,
    setTone,
    video,
    setVideo,
    onBack,
    onCreate
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 26
      }
    }, /*#__PURE__*/React.createElement(StepDots, {
      total: 3,
      current: 2
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: 40,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: 'var(--text-heading)',
        margin: '0 0 10px'
      }
    }, "Escolha o estilo"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 17,
        lineHeight: 1.55,
        color: 'var(--text-muted)',
        margin: 0
      }
    }, "Como voc\xEA imagina o seu hino sendo cantado?")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }
    }, STYLES.map(s => /*#__PURE__*/React.createElement(RadioCard, {
      key: s.id,
      icon: s.icon,
      title: s.title,
      description: s.desc,
      selected: style === s.id,
      onClick: () => setStyle(s.id)
    }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--text-heading)',
        margin: '0 0 12px'
      }
    }, "Tom emocional"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 9
      }
    }, TONES.map(t => /*#__PURE__*/React.createElement("button", {
      key: t,
      type: "button",
      onClick: () => setTone(t),
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13.5,
        fontWeight: tone === t ? 600 : 500,
        cursor: 'pointer',
        padding: '8px 16px',
        borderRadius: 'var(--radius-pill)',
        border: '1.5px solid ' + (tone === t ? 'var(--border-gold)' : 'var(--border)'),
        background: tone === t ? 'var(--accent-soft)' : 'var(--surface-card)',
        color: tone === t ? 'var(--accent-ink)' : 'var(--text-body)'
      }
    }, t)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '16px 18px',
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-heading)'
      }
    }, "Gerar v\xEDdeo para redes"), /*#__PURE__*/React.createElement(Badge, {
      tone: "gold"
    }, "Minist\xE9rio")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, "V\xEDdeo vertical para Instagram, TikTok e WhatsApp")), /*#__PURE__*/React.createElement(Switch, {
      checked: video,
      onChange: e => setVideo(e.target.checked)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        paddingTop: 2
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      iconLeft: "chevronLeft",
      onClick: onBack
    }, "Voltar"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      iconLeft: "sparkles",
      onClick: onCreate
    }, "Criar meu hino")));
  }
  window.StyleStep = StyleStep;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/creator/StyleStep.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.RadioCard = __ds_scope.RadioCard;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.ChordSheet = __ds_scope.ChordSheet;

__ds_ns.ScriptureQuote = __ds_scope.ScriptureQuote;

__ds_ns.StepDots = __ds_scope.StepDots;

__ds_ns.WaveBars = __ds_scope.WaveBars;

})();
