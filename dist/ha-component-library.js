const Jr = (t) => t == null ? "" : String(t), Ke = (t) => Jr(t).replace(
  /[&<>"']/g,
  (e) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[e] || e
), nt = (t, e, i, r) => {
  const a = new CustomEvent(e, {
    bubbles: r?.bubbles ?? !0,
    cancelable: !!r?.cancelable,
    composed: r?.composed ?? !0,
    detail: i
  });
  return t.dispatchEvent(a), a;
}, La = (t, e) => {
  e && nt(t, "hass-more-info", { entityId: e });
}, Xr = (t) => {
  t && (window.history.pushState(null, "", t), nt(window, "location-changed", { replace: !1 }));
}, gi = (t) => {
  const e = t?.locale?.language || (typeof navigator < "u" ? navigator.language : "en-AU") || "en-AU";
  return e === "en" ? "en-AU" : e;
}, bi = (t) => t?.config?.time_zone || void 0, Ut = (t, e, i = {}) => {
  const r = Number(e);
  return Number.isFinite(r) ? new Intl.NumberFormat(gi(t), i).format(r) : "—";
}, st = (t, e, i = {}) => {
  if (e == null || e === "") return "—";
  const r = Number(e);
  if (!Number.isFinite(r)) return "—";
  const a = i.absolute ? Math.abs(r) : r;
  return Math.abs(a) >= 1e3 ? `${Ut(t, a / 1e3, { maximumFractionDigits: 1 })} kW` : `${Ut(t, Math.round(a), { maximumFractionDigits: 0 })} W`;
}, ft = (t, e) => {
  if (e == null || e === "") return "—";
  const i = Number(e);
  return Number.isFinite(i) ? `${Ut(t, i, { maximumFractionDigits: Math.abs(i) < 1 ? 2 : 1 })} kWh` : "—";
}, _i = (t, e, i) => new Intl.DateTimeFormat(gi(t), {
  timeZone: bi(t),
  ...i
}).format(new Date(e)), vi = (t, e, i = {}) => {
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  return r ? _i(
    t,
    Date.UTC(Number(r[1]), Number(r[2]) - 1, Number(r[3]), 12),
    {
      timeZone: "UTC",
      ...i
    }
  ) : "—";
}, ta = (t, e) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  if (!i) return null;
  const r = Number(i[1]), a = Number(i[2]) - 1, s = Number(i[3]), n = bi(t);
  if (!n)
    return { start: new Date(r, a, s).getTime(), end: new Date(r, a, s + 1).getTime() };
  const c = new Intl.DateTimeFormat("en-AU", {
    timeZone: n,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }), l = (p, f, g) => {
    const d = Date.UTC(p, f, g);
    let u = d;
    for (let h = 0; h < 2; h += 1) {
      const b = Object.fromEntries(
        c.formatToParts(new Date(u)).map((_) => [_.type, _.value])
      ), m = Date.UTC(
        Number(b.year),
        Number(b.month) - 1,
        Number(b.day),
        Number(b.hour),
        Number(b.minute),
        Number(b.second)
      );
      u += d - m;
    }
    return u;
  };
  return {
    start: l(r, a, s),
    end: l(r, a, s + 1)
  };
}, Ye = (t, e, i = {}) => _i(t, e, {
  hour: "numeric",
  minute: "2-digit",
  ...i
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We = globalThis, Zi = We.ShadowRoot && (We.ShadyCSS === void 0 || We.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ji = Symbol(), Cr = /* @__PURE__ */ new WeakMap();
let ea = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== Ji) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Zi && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = Cr.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Cr.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const re = (t) => new ea(typeof t == "string" ? t : t + "", void 0, Ji), y = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, a, s) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + t[s + 1], t[0]);
  return new ea(i, t, Ji);
}, Ia = (t, e) => {
  if (Zi) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), a = We.litNonce;
    a !== void 0 && r.setAttribute("nonce", a), r.textContent = i.cssText, t.appendChild(r);
  }
}, Sr = Zi ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return re(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ma, defineProperty: qa, getOwnPropertyDescriptor: ja, getOwnPropertyNames: Ua, getOwnPropertySymbols: Ba, getPrototypeOf: Fa } = Object, yi = globalThis, Ar = yi.trustedTypes, Va = Ar ? Ar.emptyScript : "", Wa = yi.reactiveElementPolyfillSupport, me = (t, e) => t, Qe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Va : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Xi = (t, e) => !Ma(t, e), Er = { attribute: !0, type: String, converter: Qe, reflect: !1, useDefault: !1, hasChanged: Xi };
Symbol.metadata ??= Symbol("metadata"), yi.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let It = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Er) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), a = this.getPropertyDescriptor(e, r, i);
      a !== void 0 && qa(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: a, set: s } = ja(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: a, set(n) {
      const c = a?.call(this);
      s?.call(this, n), this.requestUpdate(e, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Er;
  }
  static _$Ei() {
    if (this.hasOwnProperty(me("elementProperties"))) return;
    const e = Fa(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(me("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(me("properties"))) {
      const i = this.properties, r = [...Ua(i), ...Ba(i)];
      for (const a of r) this.createProperty(a, i[a]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, a] of i) this.elementProperties.set(r, a);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const a = this._$Eu(i, r);
      a !== void 0 && this._$Eh.set(a, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const a of r) i.unshift(Sr(a));
    } else e !== void 0 && i.push(Sr(e));
    return i;
  }
  static _$Eu(e, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ia(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, r) {
    this._$AK(e, r);
  }
  _$ET(e, i) {
    const r = this.constructor.elementProperties.get(e), a = this.constructor._$Eu(e, r);
    if (a !== void 0 && r.reflect === !0) {
      const s = (r.converter?.toAttribute !== void 0 ? r.converter : Qe).toAttribute(i, r.type);
      this._$Em = e, s == null ? this.removeAttribute(a) : this.setAttribute(a, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, a = r._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const s = r.getPropertyOptions(a), n = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Qe;
      this._$Em = a;
      const c = n.fromAttribute(i, s.type);
      this[a] = c ?? this._$Ej?.get(a) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, a = !1, s) {
    if (e !== void 0) {
      const n = this.constructor;
      if (a === !1 && (s = this[e]), r ??= n.getPropertyOptions(e), !((r.hasChanged ?? Xi)(s, i) || r.useDefault && r.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: a, wrapped: s }, n) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), s !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), a === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [a, s] of this._$Ep) this[a] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [a, s] of r) {
        const { wrapped: n } = s, c = this[a];
        n !== !0 || this._$AL.has(a) || c === void 0 || this.C(a, void 0, s, c);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((r) => r.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((i) => i.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((i) => this._$ET(i, this[i])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
It.elementStyles = [], It.shadowRootOptions = { mode: "open" }, It[me("elementProperties")] = /* @__PURE__ */ new Map(), It[me("finalized")] = /* @__PURE__ */ new Map(), Wa?.({ ReactiveElement: It }), (yi.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tr = globalThis, zr = (t) => t, Ze = tr.trustedTypes, Tr = Ze ? Ze.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ia = "$lit$", mt = `lit$${Math.random().toFixed(9).slice(2)}$`, ra = "?" + mt, Ga = `<${ra}>`, kt = document, be = () => kt.createComment(""), _e = (t) => t === null || typeof t != "object" && typeof t != "function", er = Array.isArray, Ka = (t) => er(t) || typeof t?.[Symbol.iterator] == "function", Hi = `[ 	
\f\r]`, le = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Dr = /-->/g, Or = />/g, wt = RegExp(`>|${Hi}(?:([^\\s"'>=/]+)(${Hi}*=${Hi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Pr = /'/g, Hr = /"/g, aa = /^(?:script|style|textarea|title)$/i, Ya = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), o = Ya(1), Bt = Symbol.for("lit-noChange"), B = Symbol.for("lit-nothing"), Nr = /* @__PURE__ */ new WeakMap(), $t = kt.createTreeWalker(kt, 129);
function sa(t, e) {
  if (!er(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Tr !== void 0 ? Tr.createHTML(e) : e;
}
const Qa = (t, e) => {
  const i = t.length - 1, r = [];
  let a, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = le;
  for (let c = 0; c < i; c++) {
    const l = t[c];
    let p, f, g = -1, d = 0;
    for (; d < l.length && (n.lastIndex = d, f = n.exec(l), f !== null); ) d = n.lastIndex, n === le ? f[1] === "!--" ? n = Dr : f[1] !== void 0 ? n = Or : f[2] !== void 0 ? (aa.test(f[2]) && (a = RegExp("</" + f[2], "g")), n = wt) : f[3] !== void 0 && (n = wt) : n === wt ? f[0] === ">" ? (n = a ?? le, g = -1) : f[1] === void 0 ? g = -2 : (g = n.lastIndex - f[2].length, p = f[1], n = f[3] === void 0 ? wt : f[3] === '"' ? Hr : Pr) : n === Hr || n === Pr ? n = wt : n === Dr || n === Or ? n = le : (n = wt, a = void 0);
    const u = n === wt && t[c + 1].startsWith("/>") ? " " : "";
    s += n === le ? l + Ga : g >= 0 ? (r.push(p), l.slice(0, g) + ia + l.slice(g) + mt + u) : l + mt + (g === -2 ? c : u);
  }
  return [sa(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class ve {
  constructor({ strings: e, _$litType$: i }, r) {
    let a;
    this.parts = [];
    let s = 0, n = 0;
    const c = e.length - 1, l = this.parts, [p, f] = Qa(e, i);
    if (this.el = ve.createElement(p, r), $t.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (a = $t.nextNode()) !== null && l.length < c; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const g of a.getAttributeNames()) if (g.endsWith(ia)) {
          const d = f[n++], u = a.getAttribute(g).split(mt), h = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: s, name: h[2], strings: u, ctor: h[1] === "." ? Ja : h[1] === "?" ? Xa : h[1] === "@" ? ts : xi }), a.removeAttribute(g);
        } else g.startsWith(mt) && (l.push({ type: 6, index: s }), a.removeAttribute(g));
        if (aa.test(a.tagName)) {
          const g = a.textContent.split(mt), d = g.length - 1;
          if (d > 0) {
            a.textContent = Ze ? Ze.emptyScript : "";
            for (let u = 0; u < d; u++) a.append(g[u], be()), $t.nextNode(), l.push({ type: 2, index: ++s });
            a.append(g[d], be());
          }
        }
      } else if (a.nodeType === 8) if (a.data === ra) l.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = a.data.indexOf(mt, g + 1)) !== -1; ) l.push({ type: 7, index: s }), g += mt.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const r = kt.createElement("template");
    return r.innerHTML = e, r;
  }
}
function Ft(t, e, i = t, r) {
  if (e === Bt) return e;
  let a = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const s = _e(e) ? void 0 : e._$litDirective$;
  return a?.constructor !== s && (a?._$AO?.(!1), s === void 0 ? a = void 0 : (a = new s(t), a._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = a : i._$Cl = a), a !== void 0 && (e = Ft(t, a._$AS(t, e.values), a, r)), e;
}
class Za {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: r } = this._$AD, a = (e?.creationScope ?? kt).importNode(i, !0);
    $t.currentNode = a;
    let s = $t.nextNode(), n = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let p;
        l.type === 2 ? p = new De(s, s.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (p = new es(s, this, e)), this._$AV.push(p), l = r[++c];
      }
      n !== l?.index && (s = $t.nextNode(), n++);
    }
    return $t.currentNode = kt, a;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class De {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, a) {
    this.type = 2, this._$AH = B, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = a, this._$Cv = a?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = Ft(this, e, i), _e(e) ? e === B || e == null || e === "" ? (this._$AH !== B && this._$AR(), this._$AH = B) : e !== this._$AH && e !== Bt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ka(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== B && _e(this._$AH) ? this._$AA.nextSibling.data = e : this.T(kt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, a = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = ve.createElement(sa(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === a) this._$AH.p(i);
    else {
      const s = new Za(a, this), n = s.u(this.options);
      s.p(i), this.T(n), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Nr.get(e.strings);
    return i === void 0 && Nr.set(e.strings, i = new ve(e)), i;
  }
  k(e) {
    er(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, a = 0;
    for (const s of e) a === i.length ? i.push(r = new De(this.O(be()), this.O(be()), this, this.options)) : r = i[a], r._$AI(s), a++;
    a < i.length && (this._$AR(r && r._$AB.nextSibling, a), i.length = a);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = zr(e).nextSibling;
      zr(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class xi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, a, s) {
    this.type = 1, this._$AH = B, this._$AN = void 0, this.element = e, this.name = i, this._$AM = a, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = B;
  }
  _$AI(e, i = this, r, a) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) e = Ft(this, e, i, 0), n = !_e(e) || e !== this._$AH && e !== Bt, n && (this._$AH = e);
    else {
      const c = e;
      let l, p;
      for (e = s[0], l = 0; l < s.length - 1; l++) p = Ft(this, c[r + l], i, l), p === Bt && (p = this._$AH[l]), n ||= !_e(p) || p !== this._$AH[l], p === B ? e = B : e !== B && (e += (p ?? "") + s[l + 1]), this._$AH[l] = p;
    }
    n && !a && this.j(e);
  }
  j(e) {
    e === B ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ja extends xi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === B ? void 0 : e;
  }
}
class Xa extends xi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== B);
  }
}
class ts extends xi {
  constructor(e, i, r, a, s) {
    super(e, i, r, a, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Ft(this, e, i, 0) ?? B) === Bt) return;
    const r = this._$AH, a = e === B && r !== B || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== B && (r === B || a);
    a && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class es {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ft(this, e);
  }
}
const is = tr.litHtmlPolyfillSupport;
is?.(ve, De), (tr.litHtmlVersions ??= []).push("3.3.3");
const rs = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let a = r._$litPart$;
  if (a === void 0) {
    const s = i?.renderBefore ?? null;
    r._$litPart$ = a = new De(e.insertBefore(be(), s), s, void 0, i ?? {});
  }
  return a._$AI(t), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ir = globalThis;
class gt extends It {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = rs(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Bt;
  }
}
gt._$litElement$ = !0, gt.finalized = !0, ir.litElementHydrateSupport?.({ LitElement: gt });
const as = ir.litElementPolyfillSupport;
as?.({ LitElement: gt });
(ir.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ss = { attribute: !0, type: String, converter: Qe, reflect: !1, hasChanged: Xi }, ns = (t = ss, e, i) => {
  const { kind: r, metadata: a } = i;
  let s = globalThis.litPropertyMetadata.get(a);
  if (s === void 0 && globalThis.litPropertyMetadata.set(a, s = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), r === "accessor") {
    const { name: n } = i;
    return { set(c) {
      const l = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(n, l, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, t, c), c;
    } };
  }
  if (r === "setter") {
    const { name: n } = i;
    return function(c) {
      const l = this[n];
      e.call(this, c), this.requestUpdate(n, l, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function ae(t) {
  return (e, i) => typeof i == "object" ? ns(t, e, i) : ((r, a, s) => {
    const n = a.hasOwnProperty(s);
    return a.constructor.createProperty(s, r), n ? Object.getOwnPropertyDescriptor(a, s) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(t) {
  return ae({ ...t, state: !0, attribute: !1 });
}
var os = Object.defineProperty, cs = Object.getOwnPropertyDescriptor, Oe = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? cs(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && os(e, i, a), a;
};
let Ct = class extends gt {
  constructor() {
    super(...arguments), this.cardType = "", this._error = null;
  }
  setConfig(t) {
    this._config = t;
  }
  _onChange(t) {
    const e = t.target;
    try {
      const i = JSON.parse(e.value);
      this._error = null, this.dispatchEvent(
        new CustomEvent("config-changed", {
          bubbles: !0,
          composed: !0,
          detail: { config: i }
        })
      );
    } catch (i) {
      this._error = i.message || "Invalid JSON";
    }
  }
  render() {
    const t = this._config ? JSON.stringify(this._config, null, 2) : "{}";
    return o`
      <div class="wrap">
        <div class="header">
          Card Configuration
          ${this.cardType ? o`<span class="type-badge">${Ke(this.cardType)}</span>` : ""}
        </div>
        <textarea
          .value=${t}
          @change=${this._onChange}
          spellcheck="false"
          aria-label="Card Configuration JSON"
        ></textarea>
        ${this._error ? o`<div class="error">⚠️ ${Ke(this._error)}</div>` : ""}
      </div>
    `;
  }
};
Ct.styles = y`
    :host {
      display: block;
      padding: 16px;
      box-sizing: border-box;
      color: var(--primary-text-color);
      font-family: inherit;
    }
    .wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .header {
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .type-badge {
      display: inline-block;
      padding: 2px 6px;
      font-size: 11px;
      border-radius: 4px;
      background: var(
        --dashboard-card-muted-surface,
        rgba(127, 127, 127, 0.15)
      );
      font-family: monospace;
    }
    textarea {
      width: 100%;
      min-height: 180px;
      padding: 10px;
      box-sizing: border-box;
      border: 1px solid
        var(--dashboard-card-border-color, rgba(127, 127, 127, 0.2));
      border-radius: 6px;
      background: var(
        --dashboard-card-surface,
        var(--card-background-color, #1e1e1e)
      );
      color: var(--primary-text-color, #fff);
      font-family: monospace;
      font-size: 12px;
      line-height: 1.4;
      resize: vertical;
    }
    textarea:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .error {
      color: var(--error-color, #db4437);
      font-size: 12px;
      margin-top: 4px;
    }
  `;
Oe([
  ae({ attribute: !1 })
], Ct.prototype, "hass", 2);
Oe([
  ae({ type: String })
], Ct.prototype, "cardType", 2);
Oe([
  x()
], Ct.prototype, "_config", 2);
Oe([
  x()
], Ct.prototype, "_error", 2);
Ct = Oe([
  k("ha-component-library-config-editor")
], Ct);
const ls = (t, e) => {
  e.getStubConfig || (e.getStubConfig = () => ({
    ...e.stubConfig || {}
  })), e.getConfigElement || (e.getConfigElement = () => {
    const i = document.createElement(
      "ha-component-library-config-editor"
    );
    return i.cardType = t, i;
  });
}, E = (t) => {
  const { type: e, element: i, name: r, description: a, preview: s = !0 } = t;
  ls(e, i), customElements.get(e) || customElements.define(e, i), typeof window < "u" && (window.customCards = window.customCards || [], window.customCards.some((n) => n.type === e) || window.customCards.push({
    type: e,
    name: r,
    description: a,
    preview: s
  }));
}, Nt = Object.freeze({
  holdDelay: 500,
  moveTolerance: 10,
  errorDuration: 1800,
  repeatDelay: 350,
  repeatInterval: 110,
  repeatMinimumInterval: 55
}), vl = () => typeof window < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0, ds = `
[data-interaction-pressed="true"] {
  transform: scale(.985);
  filter: brightness(.96);
  transition: transform var(--dashboard-transition-fast, 80ms) var(--dashboard-easing-standard, ease-out), filter var(--dashboard-transition-fast, 80ms) var(--dashboard-easing-standard, ease-out);
}
[data-interaction-pending="true"] {
  cursor: progress !important;
  opacity: .72;
  transition: opacity var(--dashboard-transition-standard, 120ms) var(--dashboard-easing-standard, ease-out);
}
[data-interaction-error="true"] {
  outline: 2px solid var(--error-color, #db4437) !important;
  outline-offset: 2px;
}
[data-ha-interaction-status="v2"] {
  position: fixed !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
@media (prefers-reduced-motion: reduce) {
  [data-interaction-pressed="true"], [data-interaction-pending="true"] {
    transition-duration: 0s !important;
  }
}
`, hs = (t) => {
  if (!t) return null;
  if (t === !0) return {};
  if (typeof t != "object")
    throw new TypeError(
      "interaction repeat must be false, true, or an options object"
    );
  return t;
}, ps = (t, e) => {
  if (!t) return null;
  if (typeof t == "function")
    return { capture: () => {
    }, apply: t, rollback: void 0 };
  if (typeof t == "object")
    return {
      capture: t.capture || (() => {
      }),
      apply: t.apply || (() => {
      }),
      rollback: t.rollback || void 0
    };
  if (t === "toggle")
    return {
      capture: () => e.getAttribute("aria-pressed"),
      apply: () => {
        const i = e.getAttribute("aria-pressed") === "true";
        e.setAttribute("aria-pressed", String(!i));
      },
      rollback: (i) => {
        i === null ? e.removeAttribute("aria-pressed") : e.setAttribute("aria-pressed", String(i));
      }
    };
  if (t === "selection")
    return {
      capture: () => ({
        selected: e.getAttribute("aria-selected"),
        checked: e.getAttribute("aria-checked")
      }),
      apply: () => {
        e.hasAttribute("aria-selected") && e.setAttribute("aria-selected", "true"), e.hasAttribute("aria-checked") && e.setAttribute("aria-checked", "true");
      },
      rollback: (i) => {
        i.selected === null ? e.removeAttribute("aria-selected") : e.setAttribute("aria-selected", i.selected), i.checked === null ? e.removeAttribute("aria-checked") : e.setAttribute("aria-checked", i.checked);
      }
    };
  throw new TypeError(`Unsupported optimistic interaction mode: ${t}`);
}, us = (t) => {
  const e = t.getRootNode?.();
  if (!e || e.__haInteractionFeedbackV2) return null;
  e.__haInteractionFeedbackV2 = !0;
  const i = document.createElement("style");
  i.setAttribute("data-ha-interaction-styles", "v2"), i.textContent = ds;
  const r = document.createElement("span");
  r.setAttribute("data-ha-interaction-status", "v2"), r.setAttribute("role", "status"), r.setAttribute("aria-live", "polite"), r.setAttribute("aria-atomic", "true");
  const a = e.nodeType === 9 || e.body ? e.body || e.head || e.documentElement : e;
  return a && typeof a.append == "function" && a.append(i, r), r;
}, Rr = [
  "button",
  "a[href]",
  "input",
  "select",
  "textarea",
  "summary",
  '[contenteditable="true"]',
  '[role="button"]',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="menuitem"]',
  '[role="option"]',
  '[role="radio"]',
  '[role="slider"]',
  '[role="switch"]',
  "[tabindex]"
].join(","), S = (t, e = {}) => {
  if (!t?.addEventListener)
    throw new TypeError("interaction requires an EventTarget element");
  const i = us(t), r = typeof e.primary == "function" ? e.primary : null, a = typeof e.hold == "function" ? e.hold : null, s = hs(e.repeat);
  if (a && s)
    throw new TypeError("interaction hold and repeat are mutually exclusive");
  if (!r && (a || s))
    throw new TypeError("interaction hold/repeat requires a primary action");
  const n = e.feedback !== !1, c = e.singleFlight === !0, l = Math.max(
    250,
    Number(e.holdDelay) || Nt.holdDelay
  ), p = Math.max(
    4,
    Number(e.moveTolerance) || Nt.moveTolerance
  ), f = ps(e.optimistic, t), g = e.signal, d = typeof e.onPressChange == "function" ? e.onPressChange : null;
  let u = null, h = null, b = null, m = null, _ = 0, $ = !1, v = null, z = !1, N = 0, L = null, M = !1, C = !1;
  const H = (w) => {
    const Q = w?.composedPath?.();
    if (Array.isArray(Q) && Q.length)
      for (const et of Q) {
        if (et === t) return !1;
        if (et?.matches?.(Rr))
          return !0;
      }
    const Z = w?.target;
    if (!Z || Z === t) return !1;
    const J = Z.closest?.(Rr);
    return !!(J && J !== t && t.contains?.(J));
  }, G = () => M || c && N > 0 || t.disabled === !0 || t.getAttribute?.("aria-disabled") === "true", R = () => {
    v && clearTimeout(v), v = null, $ = !1;
  }, V = () => {
    $ = !0, v && clearTimeout(v), v = setTimeout(R, 0);
  }, W = (w) => {
    C !== w && (C = w, n && t.toggleAttribute?.("data-interaction-pressed", w), M || d?.(w, t));
  }, Pt = (w) => {
    N = Math.max(0, N + w), !(!n || M) && (t.toggleAttribute?.("data-interaction-pending", N > 0), t.setAttribute?.("aria-busy", String(N > 0)));
  }, Ht = () => {
    if (!n || M) return;
    L && clearTimeout(L), t.setAttribute?.("data-interaction-error", "true");
    const w = i || t.getRootNode?.()?.querySelector?.(
      "[data-ha-interaction-status]"
    );
    w && (w.textContent = e.errorMessage || "Action failed. Try again."), L = setTimeout(
      () => {
        L = null, M || t.removeAttribute?.("data-interaction-error");
      },
      Math.max(
        250,
        Number(e.errorDuration) || Nt.errorDuration
      )
    );
  }, Me = (w) => {
    M || t.dispatchEvent?.(
      new CustomEvent("ha-interaction-error", {
        bubbles: !0,
        composed: !0,
        detail: { error: w }
      })
    );
  }, rt = (w, Q) => {
    if (G()) return Promise.resolve(void 0);
    const Z = w === "hold" ? a : r;
    if (!Z) return Promise.resolve(void 0);
    let J;
    w === "primary" && f && (J = f.capture(t, Q), f.apply(t, Q, J));
    let et;
    try {
      et = Z(Q);
    } catch (xt) {
      return !M && w === "primary" && f?.rollback && f.rollback(J, xt, t, Q), Ht(), Me(xt), Promise.reject(xt);
    }
    return !et || typeof et.then != "function" ? Promise.resolve(et) : (Pt(1), Promise.resolve(et).catch((xt) => {
      throw !M && w === "primary" && f?.rollback && f.rollback(J, xt, t, Q), Ht(), Me(xt), xt;
    }).finally(() => {
      M || Pt(-1);
    }));
  }, D = () => {
    h && clearTimeout(h), h = null, b && clearTimeout(b), b = null, m && clearInterval(m), m = null;
  }, Y = () => {
    D(), u = null, W(!1);
  }, ut = (w) => {
    if (!s || G()) return;
    const Q = Math.max(
      150,
      Number(s.delay) || Nt.repeatDelay
    ), Z = Math.max(
      40,
      Number(s.interval) || Nt.repeatInterval
    );
    _ = 0, b = setTimeout(() => {
      if (b = null, M || !u) return;
      z = !0, V();
      const J = () => {
        if (M || !u) {
          m && clearInterval(m), m = null;
          return;
        }
        if (_ += 1, rt("primary", w).catch(() => {
        }), M || !u || !s.accelerate) return;
        const et = Math.max(
          Number(s.minimumInterval) || Nt.repeatMinimumInterval,
          Math.round(Z * Math.pow(0.93, _))
        );
        m && clearInterval(m), m = setInterval(J, et);
      };
      rt("primary", w).catch(() => {
      }), !M && u && (m = setInterval(J, Z));
    }, Q);
  }, yt = (w) => {
    if (!(!r || G() || w.button > 0 || H(w))) {
      u = { id: w.pointerId, x: w.clientX, y: w.clientY }, z = !1, R();
      try {
        t.setPointerCapture?.(w.pointerId);
      } catch {
      }
      W(!0), a ? h = setTimeout(() => {
        h = null, u && (z = !0, V(), W(!1), rt("hold", w).catch(() => {
        }));
      }, l) : s && ut(w);
    }
  }, ce = (w) => {
    !u || w.pointerId !== u.id || Math.hypot(w.clientX - u.x, w.clientY - u.y) <= p || (z = !0, V(), Y());
  }, xr = (w) => {
    if (!u || w.pointerId !== u.id) return;
    if (H(w)) {
      z = !0, V(), Y();
      return;
    }
    const Q = z, Z = s && (b === null || m !== null);
    D(), u = null, z = !1, W(!1), V(), !Q && !Z && rt("primary", w).catch(() => {
    });
  }, qe = () => {
    z = !1, V(), Y();
  }, wr = (w) => {
    if (!H(w)) {
      if ($) {
        w.preventDefault(), w.stopImmediatePropagation?.(), R();
        return;
      }
      !r || G() || rt("primary", w).catch(() => {
      });
    }
  }, $r = (w) => {
    !r || G() || w.repeat || H(w) || w.key !== "Enter" && w.key !== " " || (w.preventDefault(), W(!0));
  }, kr = (w) => {
    !r || G() || H(w) || w.key !== "Enter" && w.key !== " " || (w.preventDefault(), W(!1), V(), rt("primary", w).catch(() => {
    }));
  };
  t.addEventListener("pointerdown", yt, {
    passive: !0
  }), t.addEventListener("pointermove", ce, {
    passive: !0
  }), t.addEventListener("pointerup", xr, {
    passive: !0
  }), t.addEventListener("pointercancel", qe, {
    passive: !0
  }), t.addEventListener(
    "lostpointercapture",
    qe,
    { passive: !0 }
  ), t.addEventListener("click", wr, !0), t.addEventListener("keydown", $r), t.addEventListener("keyup", kr);
  const Pi = () => {
    M || (M = !0, D(), L && clearTimeout(L), v && clearTimeout(v), L = null, v = null, g?.removeEventListener?.("abort", Pi), C = !1, N = 0, n && (t.removeAttribute?.("data-interaction-pressed"), t.removeAttribute?.("data-interaction-pending"), t.removeAttribute?.("data-interaction-error"), t.setAttribute?.("aria-busy", "false")), t.removeEventListener("pointerdown", yt), t.removeEventListener("pointermove", ce), t.removeEventListener("pointerup", xr), t.removeEventListener(
      "pointercancel",
      qe
    ), t.removeEventListener(
      "lostpointercapture",
      qe
    ), t.removeEventListener("click", wr, !0), t.removeEventListener("keydown", $r), t.removeEventListener("keyup", kr));
  };
  return g?.addEventListener?.("abort", Pi, { once: !0 }), Object.freeze({
    element: t,
    destroy: Pi,
    get destroyed() {
      return M;
    },
    invoke: (w) => rt("primary", w)
  });
}, rr = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createRequestCoalescer requires a request function");
  let i = !1, r = !1, a, s = !1, n = 0;
  const c = async () => {
    if (!(i || s || !r)) {
      for (i = !0; !s && r; ) {
        r = !1;
        const l = a, p = ++n;
        try {
          await t(l, p), s || e.onSuccess?.(l, p);
        } catch (f) {
          s || e.onError?.(f, l, p), e.stopOnError && (r = !1);
        }
      }
      i = !1, s || e.onIdle?.();
    }
  };
  return Object.freeze({
    request(l) {
      s || (a = l, r = !0, c());
    },
    get pending() {
      return !s && (i || r);
    },
    get destroyed() {
      return s;
    },
    destroy() {
      s = !0, r = !1;
    }
  });
}, ye = (t, e, i, r = {}) => {
  if (!e || typeof i != "function")
    return Promise.reject(
      new TypeError("waitForEntityState requires an entity and predicate")
    );
  const a = typeof t == "function" ? t : () => t, s = Math.max(250, Number(r.timeout) || 9e3), n = Math.max(40, Number(r.interval) || 160), c = r.signal;
  return new Promise((l, p) => {
    let f = null, g = null, d = !1;
    const u = () => {
      f && clearInterval(f), g && clearTimeout(g), c?.removeEventListener?.("abort", b);
    }, h = (_, $) => {
      d || (d = !0, u(), _($));
    }, b = () => h(p, c?.reason || new Error("State confirmation aborted")), m = () => {
      const _ = a()?.states?.[e] ?? null;
      try {
        i(_?.state, _) && h(l, _);
      } catch ($) {
        h(p, $);
      }
    };
    if (c?.aborted) return b();
    c?.addEventListener?.("abort", b, { once: !0 }), f = setInterval(m, n), g = setTimeout(
      () => h(p, new Error("State confirmation timed out")),
      s
    ), m();
  });
}, na = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createAsyncBroker requires a loader");
  const i = /* @__PURE__ */ new Map(), r = Math.max(0, Number(e.ttl) || 12e4), a = Math.max(r, Number(e.maxStale) || 864e5), s = Math.max(250, Number(e.retryBase) || 2e3), n = Math.max(s, Number(e.retryMax) || 6e4), c = (g) => (i.has(g) || i.set(g, {
    value: void 0,
    error: null,
    updatedAt: 0,
    promise: null,
    failures: 0,
    nextRetryAt: 0,
    subscribers: /* @__PURE__ */ new Set(),
    sequence: 0,
    invalidated: !1,
    generation: 0
  }), i.get(g)), l = (g) => {
    const d = c(g), u = d.updatedAt ? Date.now() - d.updatedAt : 1 / 0;
    return Object.freeze({
      value: d.value,
      error: d.error,
      loading: !!d.promise,
      stale: d.value !== void 0 && (d.invalidated || u > r),
      updatedAt: d.updatedAt
    });
  }, p = (g) => {
    const d = l(g);
    for (const u of [...c(g).subscribers])
      try {
        u(d);
      } catch {
      }
  }, f = (g, d, u = !1) => {
    const h = c(g), b = Date.now();
    if (h.promise) return h.promise;
    if (!u && b < h.nextRetryAt)
      return h.value !== void 0 ? Promise.resolve(h.value) : Promise.reject(h.error);
    const m = ++h.sequence, _ = h.generation;
    return h.promise = Promise.resolve().then(() => t(g, d, m)).then(($) => m !== h.sequence ? h.value : (h.value = $, h.error = null, h.updatedAt = Date.now(), h.failures = 0, h.nextRetryAt = 0, h.invalidated = h.generation !== _, $)).catch(($) => {
      if (m !== h.sequence || (h.error = $ instanceof Error ? $ : new Error(String($)), h.failures += 1, h.nextRetryAt = Date.now() + Math.min(n, s * Math.pow(2, h.failures - 1)), h.value !== void 0 && Date.now() - h.updatedAt <= a))
        return h.value;
      throw h.error;
    }).finally(() => {
      m === h.sequence && (h.promise = null), p(g);
    }), p(g), h.promise;
  };
  return Object.freeze({
    clear() {
      i.clear();
    },
    invalidate(g) {
      const d = i.get(g);
      d && (d.invalidated = !0, d.generation += 1, d.nextRetryAt = 0, p(g));
    },
    peek: l,
    async read(g, d, u = {}) {
      const h = l(g), b = h.updatedAt ? Date.now() - h.updatedAt : 1 / 0, m = c(g);
      if (!u.force && !m.invalidated && h.value !== void 0 && b <= r)
        return h.value;
      if (!u.force && h.value !== void 0 && b <= a)
        return f(g, d).catch(() => {
        }), h.value;
      let _;
      try {
        _ = await f(g, d, u.force === !0);
      } catch ($) {
        if (u.force && c(g).invalidated)
          return f(g, d, !0);
        throw $;
      }
      return u.force && c(g).invalidated && (_ = await f(g, d, !0)), _;
    },
    refresh: (g, d) => f(g, d, !0),
    subscribe(g, d, u = {}) {
      const h = c(g);
      return h.subscribers.add(d), u.replay !== !1 && d(l(g)), () => {
        h.subscribers.delete(d);
      };
    }
  });
}, ms = (t) => {
  let e = null, i = [];
  const r = () => (e && !e.signal.aborted || (e = new AbortController()), e.signal);
  return Object.freeze({
    cleanup: (c) => (typeof c != "function" || i.push(c), c),
    connect: r,
    disconnect: () => {
      e?.abort(new Error("Component disconnected")), e = null;
      const c = i;
      i = [];
      for (const l of c.reverse())
        try {
          l();
        } catch {
        }
    },
    get connected() {
      return !!(e && !e.signal.aborted);
    },
    get signal() {
      return r();
    },
    host: t,
    listen: (c, l, p, f = {}) => {
      const g = r();
      return c?.addEventListener?.(l, p, { ...f, signal: g }), p;
    }
  });
}, oa = (t, e) => {
  let i = null, r = !0;
  const a = () => {
    if (!r) return;
    const n = 6e4 - Date.now() % 6e4 + 100;
    i = setTimeout(() => {
      if (r) {
        try {
          t();
        } catch {
        }
        a();
      }
    }, n);
  };
  a();
  const s = () => {
    r = !1, i && (clearTimeout(i), i = null);
  };
  return e && e.cleanup(s), s;
}, Ui = "dashboard-style-tokens", ar = `
:root {
  /* Canonical Design Tokens from Design Catalogue */
  --dashboard-radius-card: 8px;
  --dashboard-radius-control: 6px;
  --dashboard-radius-dialog: 10px;
  --dashboard-radius-icon: 0px;
  --dashboard-modal-scrim: rgba(0, 0, 0, 0.16);
  --dashboard-dialog-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
  --ha-card-border-radius: var(--dashboard-radius-card);
  --ha-card-box-shadow: none;
  --ha-card-border-width: 1px;

  /* Backward compatibility aliases */
  --c-radius-card: var(--dashboard-radius-card);
  --c-radius-control: var(--dashboard-radius-control);
  --c-radius-dialog: var(--dashboard-radius-dialog);
  --c-radius-icon: var(--dashboard-radius-icon);
  --c-radius-pill: 999px;
  --c-card-surface: var(--dashboard-card-surface);
  --c-card-border-color: var(--dashboard-card-border-color);
  --c-card-border: var(--dashboard-card-border);
  --c-muted-surface: var(--dashboard-card-muted-surface);
  --c-active-surface: var(--dashboard-active-surface);
  --c-dialog-shadow: var(--dashboard-dialog-shadow);
  --c-modal-scrim: var(--dashboard-modal-scrim);
  --c-space-1: 3px;
  --c-space-2: 6px;
  --c-space-3: 8px;
  --c-space-4: 10px;
  --c-space-5: 12px;
  --c-space-6: 16px;
  --c-card-padding: 8px 11px;
  --c-card-padding-dense: 6px 10px;
  --c-card-gap: 6px;
  --c-grid-gap: 6px;
  --c-font-xs: 10px;
  --c-font-sm: 10.5px;
  --c-font-base: 11.5px;
  --c-font-md: 12px;
  --c-font-lg: 13.5px;
  --c-font-xl: 15px;
  --c-font-display: 20px;
  --c-font-hero: 22px;
  --c-font-weight-normal: 400;
  --c-font-weight-medium: 500;
  --c-font-weight-semibold: 600;
  --c-line-height-tight: 1.1;
  --c-line-height-normal: 1.2;
  --c-line-height-relaxed: 1.25;
  --c-row-min-height: 44px;
  --c-head-min-height: 32px;
  --c-icon-box-size: 28px;
  --c-icon-size: 17px;
  --c-icon-sm-size: 15px;
  --c-button-height: 34px;
  --c-button-sm-height: 26px;
  --c-button-icon-size: 32px;
  --c-switch-width: 38px;
  --c-switch-height: 22px;
  --c-switch-knob-size: 16px;
  --c-slider-width: 80px;
  --c-slider-height: 6px;
}

[data-theme="dark"], :root {
  --primary-color: #03a9f4;
  --primary-text-color: #e1e1e1;
  --secondary-text-color: #9e9e9e;
  --disabled-text-color: #616161;
  --card-background-color: #1c1c1e;
  --secondary-background-color: #2c2c2e;
  --divider-color: rgba(255, 255, 255, 0.12);
  --ha-card-background: var(--card-background-color);
  --ha-card-border-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  --dashboard-card-surface: var(--ha-card-background, var(--card-background-color));
  --dashboard-card-muted-surface: color-mix(in srgb, var(--primary-text-color) 3%, var(--card-background-color));
  --dashboard-card-border-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  --dashboard-card-border: 1px solid var(--dashboard-card-border-color);
  --dashboard-active-surface: color-mix(in srgb, var(--primary-color) 7%, var(--card-background-color));
  --dashboard-warning-surface: color-mix(in srgb, var(--warning-color, #f9a825) 9%, var(--card-background-color));
  --dashboard-critical-surface: color-mix(in srgb, var(--error-color, #e53935) 8%, var(--card-background-color));
  --warning-color: #f9a825;
  --error-color: #e53935;
  --success-color: #43a047;
  --text-primary-color: #ffffff;
  --catalogue-page-bg: #121214;
  --catalogue-border: #2c2c2e;
}

[data-theme="light"] {
  --primary-color: #0288d1;
  --primary-text-color: #212121;
  --secondary-text-color: #757575;
  --disabled-text-color: #9e9e9e;
  --card-background-color: #ffffff;
  --secondary-background-color: #f5f5f7;
  --divider-color: rgba(0, 0, 0, 0.12);
  --ha-card-background: var(--card-background-color);
  --ha-card-border-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  --dashboard-card-surface: var(--ha-card-background, var(--card-background-color));
  --dashboard-card-muted-surface: color-mix(in srgb, var(--primary-text-color) 3%, var(--card-background-color));
  --dashboard-card-border-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  --dashboard-card-border: 1px solid var(--dashboard-card-border-color);
  --dashboard-active-surface: color-mix(in srgb, var(--primary-color) 7%, var(--card-background-color));
  --dashboard-warning-surface: color-mix(in srgb, var(--warning-color, #f9a825) 9%, var(--card-background-color));
  --dashboard-critical-surface: color-mix(in srgb, var(--error-color, #e53935) 8%, var(--card-background-color));
  --warning-color: #f57f17;
  --error-color: #d32f2f;
  --success-color: #388e3c;
  --text-primary-color: #ffffff;
  --catalogue-page-bg: #f8fafc;
  --catalogue-border: #e2e8f0;
}

@media (max-width: 700px) {
  :root {
    --dashboard-radius-dialog: 8px;
    --c-radius-dialog: 8px;
  }
}
`, ca = () => {
  if (typeof document > "u") return;
  let t = document.getElementById(Ui);
  t || (t = document.createElement("style"), t.id = Ui, document.head?.append(t)), t.textContent = ar;
};
ca();
const fs = y`
  ${re(ar)}
`, T = [
  fs,
  y`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    [hidden] {
      display: none !important;
    }
    button,
    input,
    select {
      font: inherit;
      color: inherit;
      appearance: none;
      border: 0;
      background: transparent;
    }
    button {
      cursor: pointer;
      padding: 0;
    }
    button:disabled,
    input:disabled,
    select:disabled {
      opacity: 0.45;
      cursor: default;
    }
    :is(button, input, select):focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    ha-card {
      position: relative;
      overflow: hidden;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      box-shadow: var(--ha-card-box-shadow, none);
      color: var(--primary-text-color);
      box-sizing: border-box;
    }
    .icon-svg,
    ha-icon {
      fill: currentColor;
      display: inline-block;
      vertical-align: middle;
      flex-shrink: 0;
      --mdc-icon-size: 20px;
    }
    .icon-svg.sm,
    ha-icon.sm {
      width: 18px;
      height: 18px;
      --mdc-icon-size: 18px;
    }
    .icon-svg.xs,
    ha-icon.xs {
      width: 14px;
      height: 14px;
      --mdc-icon-size: 14px;
    }
    .icon-svg.lg,
    ha-icon.lg {
      width: 32px;
      height: 32px;
      --mdc-icon-size: 32px;
    }
  `
], tt = y`
  .surface-card {
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-card);
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
    padding: 14px;
  }
  .surface-card.muted {
    background: var(--dashboard-card-muted-surface);
  }
  .surface-card.active {
    background: var(--dashboard-active-surface);
    border-color: var(--primary-color);
  }
  .surface-card.warning {
    background: var(--dashboard-warning-surface);
    border-left: 3px solid var(--warning-color);
  }
  .surface-card.critical {
    background: var(--dashboard-critical-surface);
    border-left: 3px solid var(--error-color);
  }
`, P = y`
  .kpi-metric-lg {
    font-size: 20px;
    font-weight: 550;
    line-height: 1;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .kpi-metric-md {
    font-size: 16px;
    font-weight: 550;
    line-height: 1;
    letter-spacing: -0.015em;
    font-variant-numeric: tabular-nums;
  }
  .kpi-metric-sm {
    font-size: 15px;
    font-weight: 550;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }
  .label-title {
    font-size: 13px;
    font-weight: 600;
    line-height: 1.25;
  }
  .label-sub {
    font-size: 12px;
    color: var(--secondary-text-color);
    line-height: 1.25;
    margin-top: 3px;
    font-weight: 400;
  }
  .label-micro {
    font-size: 10.5px;
    font-weight: 650;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Signature Animated Text */
  .effect-wrap {
    position: relative;
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
  }
  .stamp-effect {
    padding-bottom: 4px;
  }
  .stamp-effect:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--primary-color) 45%,
      var(--primary-color) 55%,
      transparent 100%
    );
    background-size: 220% 100%;
    animation: stampSweep 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  @keyframes stampSweep {
    0% {
      background-position: 210% 0;
      opacity: 0;
    }
    45% {
      opacity: 0.8;
    }
    100% {
      background-position: -110% 0;
      opacity: 0;
    }
  }
  .signal-effect {
    padding-left: 16px;
  }
  .signal-effect:before {
    content: "";
    position: absolute;
    left: 1px;
    top: 50%;
    width: 7px;
    height: 7px;
    margin-top: -3.5px;
    border: 1.5px solid var(--primary-color);
    border-radius: 2px;
    transform: rotate(45deg);
    animation: signalPulse 2.4s infinite;
  }
  .signal-effect:after {
    content: "";
    position: absolute;
    left: 3.5px;
    top: 50%;
    width: 2.5px;
    height: 2.5px;
    margin-top: -1.25px;
    border-radius: 50%;
    background: var(--primary-color);
  }
  @keyframes signalPulse {
    0%,
    100% {
      opacity: 0.3;
      transform: rotate(45deg) scale(0.85);
    }
    50% {
      opacity: 0.85;
      transform: rotate(45deg) scale(1.1);
    }
  }
`, F = y`
  .btn-primary-solid {
    min-height: 44px;
    padding: 0 16px;
    background: var(--primary-color);
    color: var(--text-primary-color);
    border-radius: var(--dashboard-radius-control);
    font-size: 13px;
    font-weight: 650;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    border: 0;
  }
  .btn-primary-solid:active {
    transform: scale(0.98);
  }
  .btn-secondary-outline {
    min-height: 44px;
    padding: 0 14px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    color: var(--primary-color);
    font-size: 13px;
    font-weight: 650;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    background: transparent;
  }
  .btn-secondary-outline:hover {
    background: var(--dashboard-card-muted-surface);
  }
  .btn-secondary-outline.danger {
    color: var(--error-color);
  }
  .btn-action-pill {
    min-width: 0;
    min-height: 44px;
    flex: 1 1 110px;
    padding: 0 10px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: var(--secondary-text-color);
    font-size: 12.5px;
    font-weight: 600;
    white-space: nowrap;
    background: transparent;
  }
  .btn-action-pill:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .btn-action-pill.active {
    color: var(--primary-color);
    background: var(--dashboard-active-surface);
  }
  .btn-compact-pill {
    min-height: 32px;
    padding: 0 10px;
    border-radius: var(--dashboard-radius-control);
    border: var(--dashboard-card-border);
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-color);
    font-size: 11.5px;
    font-weight: 650;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .btn-compact-pill:hover {
    background: var(--dashboard-active-surface);
  }
  .btn-dashed-add {
    width: 100%;
    min-height: 44px;
    border: 1px dashed var(--dashboard-card-border-color);
    border-radius: var(--dashboard-radius-control);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: var(--primary-color);
    font-size: 13px;
    font-weight: 650;
    background: transparent;
  }
  .btn-dashed-add:hover {
    background: var(--dashboard-card-muted-surface);
  }
  .option-select-btn {
    min-height: 48px;
    width: 100%;
    padding: 0 12px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr) 20px;
    align-items: center;
    gap: 8px;
    text-align: left;
    font-size: 13px;
    font-weight: 600;
    color: var(--primary-text-color);
    background: transparent;
  }
  .option-select-btn:hover {
    background: var(--dashboard-card-muted-surface);
  }
  .option-select-btn.selected {
    color: var(--primary-color);
    border-color: var(--primary-color);
    background: var(--dashboard-active-surface);
  }
`, Dt = y`
  .btn-icon-44 {
    width: 44px;
    height: 44px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: transparent;
  }
  .btn-icon-44:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .btn-icon-44.on {
    color: var(--primary-color);
  }
  .btn-icon-36 {
    width: 36px;
    height: 36px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: transparent;
  }
  .btn-icon-36:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .btn-icon-30 {
    width: 30px;
    height: 30px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: transparent;
  }
  .btn-icon-30:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .btn-icon-30.main {
    color: var(--primary-color);
  }
  .btn-icon-circle {
    width: 44px;
    height: 44px;
    border: var(--dashboard-card-border);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: var(--dashboard-card-muted-surface);
  }
  .btn-icon-circle:hover {
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
  }
  .btn-icon-circle.main {
    color: var(--primary-color);
    border-color: var(--primary-color);
  }
`, q = y`
  .icon-well {
    width: 40px;
    height: 40px;
    border-radius: var(--dashboard-radius-icon);
    display: grid;
    place-items: center;
    color: var(--primary-color);
    background: transparent;
    flex-shrink: 0;
  }
  .icon-well.control-radius {
    border-radius: var(--dashboard-radius-control);
    background: var(--secondary-background-color);
  }
`, gs = y`
  .text-input-control {
    width: 100%;
    height: 44px;
    padding: 0 12px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
    font-size: 13px;
  }
  .text-input-control::placeholder {
    color: var(--disabled-text-color);
  }
  .search-input-wrap {
    position: relative;
    width: 100%;
  }
  .search-input-wrap .icon-svg,
  .search-input-wrap ha-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--secondary-text-color);
    pointer-events: none;
  }
  .search-input-wrap input {
    width: 100%;
    height: 40px;
    padding: 0 12px 0 38px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
    font-size: 12.5px;
  }
  .select-dropdown-control {
    width: 100%;
    height: 44px;
    padding: 0 34px 0 12px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
    font-size: 13px;
    cursor: pointer;
  }
`, wi = y`
  .switch-pill {
    width: 38px;
    height: 22px;
    border-radius: var(--dashboard-radius-control);
    background: var(--divider-color);
    padding: 3px;
    cursor: pointer;
    display: inline-block;
    transition: background 0.12s;
  }
  .switch-pill span {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--secondary-text-color);
    transition: margin 0.12s, background 0.12s;
  }
  .switch-pill.on {
    background: color-mix(
      in srgb,
      var(--primary-color) 35%,
      var(--divider-color)
    );
  }
  .switch-pill.on span {
    margin-left: 16px;
    background: var(--primary-color);
  }
  .stepper-control {
    min-height: 48px;
    display: inline-grid;
    grid-template-columns: 44px minmax(82px, auto) 44px;
    align-items: center;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    background: transparent;
    overflow: hidden;
  }
  .stepper-step-btn {
    width: 44px;
    height: 48px;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: transparent;
    border: 0;
  }
  .stepper-step-btn:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .stepper-display {
    min-width: 0;
    padding: 0 8px;
    text-align: center;
  }
  .stepper-main-val {
    font-size: 15px;
    font-weight: 550;
    font-variant-numeric: tabular-nums;
    line-height: 1.1;
  }
  .stepper-sub-lbl {
    margin-top: 3px;
    color: var(--secondary-text-color);
    font-size: 11.5px;
    line-height: 1.1;
  }
  .slider-track {
    width: 100%;
    height: 6px;
    border-radius: var(--dashboard-radius-control);
    background: var(--divider-color);
    overflow: hidden;
  }
  .slider-fill {
    height: 100%;
    background: var(--primary-color);
    border-radius: inherit;
  }
`, sr = y`
  .card-divider-line {
    height: 1px;
    background: var(--divider-color);
  }
  .labeled-separator {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 6px 0;
  }
  .labeled-separator-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11.5px;
    font-weight: 650;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .labeled-separator-line {
    flex: 1;
    height: 1px;
    background: var(--divider-color);
  }
`, pt = y`
  .capsule-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 3px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 650;
    background: var(--dashboard-card-muted-surface);
    color: var(--secondary-text-color);
    border: var(--dashboard-card-border);
  }
  .capsule-badge.active {
    background: var(--dashboard-active-surface);
    color: var(--primary-color);
    border-color: var(--primary-color);
  }
  .capsule-badge.live {
    background: var(--dashboard-active-surface);
    color: var(--primary-color);
  }
  .capsule-badge.live:before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--primary-color);
  }
  .determinate-progress {
    width: 100%;
    height: 5px;
    border-radius: 999px;
    background: var(--divider-color);
    overflow: hidden;
  }
  .determinate-fill {
    height: 100%;
    background: var(--primary-color);
    border-radius: inherit;
  }
  .indeterminate-progress {
    width: 100%;
    height: 3px;
    position: relative;
    background: var(--divider-color);
    overflow: hidden;
  }
  .indeterminate-progress:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 35%;
    background: var(--primary-color);
    animation: indeterminateSlide 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  @keyframes indeterminateSlide {
    0% {
      left: -35%;
    }
    100% {
      left: 100%;
    }
  }
`, bs = y`
  .notice-box {
    padding: 12px 14px;
    border-radius: var(--dashboard-radius-control);
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr);
    gap: 10px;
    align-items: flex-start;
    font-size: 12.5px;
    line-height: 1.35;
  }
  .notice-box.info {
    background: var(--dashboard-card-muted-surface);
    border: var(--dashboard-card-border);
    color: var(--primary-text-color);
  }
  .notice-box.warning {
    background: var(--dashboard-warning-surface);
    border: 1px solid var(--warning-color);
    color: var(--warning-color);
  }
  .notice-box.critical {
    background: var(--dashboard-critical-surface);
    border: 1px solid var(--error-color);
    color: var(--error-color);
  }
  .notice-box.success {
    background: color-mix(
      in srgb,
      var(--success-color) 10%,
      var(--card-background-color)
    );
    border: 1px solid var(--success-color);
    color: var(--success-color);
  }
  .feedback-line {
    font-size: 12px;
    font-weight: 500;
    color: var(--secondary-text-color);
    min-height: 18px;
  }
  .feedback-line.err {
    color: var(--error-color);
  }
  .empty-state-dashed {
    border: 1px dashed var(--catalogue-border, var(--dashboard-card-border-color));
    border-radius: var(--dashboard-radius-card);
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    color: var(--secondary-text-color);
  }
  .empty-state-dashed .icon-svg,
  .empty-state-dashed ha-icon {
    color: var(--disabled-text-color);
    --mdc-icon-size: 32px;
  }
  .empty-state-dashed .empty-title {
    font-size: 13.5px;
    font-weight: 650;
    color: var(--primary-text-color);
  }
  .empty-state-dashed .empty-desc {
    font-size: 12px;
    max-width: 260px;
  }
`, se = y`
  .header-row {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    min-height: 44px;
  }
  .copy-block {
    min-width: 0;
  }
  .control-item-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
  }
  .control-item-row + .control-item-row {
    border-top: 1px solid var(--divider-color);
  }
  .ranking-item-row {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    font-size: 13px;
  }
  .ranking-item-row + .ranking-item-row {
    border-top: 1px solid var(--divider-color);
  }
  .ranking-badge {
    font-weight: 700;
    color: var(--secondary-text-color);
  }
  .ranking-val {
    font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
  .update-item-row {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
  }
  .version-tag {
    font-size: 11px;
    font-family: monospace;
    color: var(--secondary-text-color);
  }
`, nr = y`
  .date-stepper-cluster {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .chart-svg-frame {
    width: 100%;
    height: 120px;
  }
`, _s = y`
  .dpad-cluster {
    width: 220px;
    height: 220px;
    padding: 10px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-card);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 6px;
    background: var(--dashboard-card-muted-surface);
    margin: 0 auto;
  }
  .dpad-btn {
    border-radius: var(--dashboard-radius-control);
    border: var(--dashboard-card-border);
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    background: var(--dashboard-card-surface);
  }
  .dpad-btn:hover {
    color: var(--primary-text-color);
    background: var(--dashboard-card-muted-surface);
  }
  .dpad-btn.select-center {
    background: var(--dashboard-active-surface);
    color: var(--primary-color);
  }
`, Ot = y`
  .dialog-shell-box {
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-dialog);
    background: var(--card-background-color);
    box-shadow: var(--dashboard-dialog-shadow);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .dialog-head {
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--divider-color);
    font-size: 15px;
    font-weight: 650;
  }
  .dialog-body {
    padding: 16px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .dialog-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid var(--divider-color);
  }
`, la = y`
  .assembled-card {
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-card);
    background: var(--dashboard-card-surface);
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`, yl = y`
  .head {
    min-height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    margin-bottom: 3px;
    padding: 0 2px;
  }
  .heading {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
  }
  .heading ha-icon {
    color: var(--secondary-text-color);
    --mdc-icon-size: 15px;
  }
  .heading h2 {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.2;
    font-weight: 500;
  }
  .head.sep {
    min-height: 26px;
    margin: 2px 0 4px;
  }
  .head.sep .heading {
    flex: 1;
  }
  .head.sep .heading h2 {
    font-size: 11.5px;
    font-weight: 500;
    color: var(--secondary-text-color);
  }
  .head.sep .heading ha-icon {
    display: none;
  }
  .head.sep .heading:after {
    content: "";
    height: 1px;
    background: var(--divider-color);
    flex: 1;
  }
  .edit {
    width: 32px;
    height: 32px;
    border-radius: var(--dashboard-radius-control);
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
  }
  .edit ha-icon {
    --mdc-icon-size: 15px;
  }
  .edit:hover,
  .edit:focus-visible {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
`, xl = y`
  .row {
    width: 100%;
    text-align: left;
  }
  .wrap {
    min-height: 44px;
    padding: 8px 11px;
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
  }
  .identity {
    min-width: 0;
    min-height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: left;
  }
  .copy {
    min-width: 0;
  }
  .name,
  .title {
    display: block;
    font-size: 12px;
    line-height: 1.2;
    font-weight: 500;
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .state,
  .desc,
  .status {
    display: block;
    margin-top: 2px;
    font-size: 10.5px;
    line-height: 1.2;
    font-weight: 400;
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`, wl = y`
  .icon,
  .ico,
  .iw,
  .well {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: var(--dashboard-radius-icon);
    background: transparent;
    color: var(--primary-color);
    flex-shrink: 0;
  }
  .icon ha-icon,
  .ico ha-icon,
  .iw ha-icon,
  .well ha-icon,
  ha-icon {
    --mdc-icon-size: 17px;
  }
`, $l = Ui, vs = ar, ys = () => {
  ca();
};
ys();
const kl = y`
  ${re(vs)}
`, xs = ":host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);color:var(--primary-text-color);box-shadow:none}*{box-sizing:border-box}button{font:inherit;color:inherit}button.demo{appearance:none;width:100%;border:0;background:transparent;text-align:inherit;padding:0;cursor:pointer}button.demo:active{transform:scale(.992)}button.demo:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px;border-radius:var(--dashboard-radius-card)}", ws = ":host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);box-shadow:none;color:var(--primary-text-color);box-sizing:border-box}.wrap{box-sizing:border-box;padding:8px 11px}.title{font-size:13px;line-height:1.25;font-weight:600;color:var(--primary-text-color)}.desc{margin-top:2px;font-size:12px;line-height:1.25;color:var(--secondary-text-color)}ha-icon{--mdc-icon-size:20px}button{font:inherit;color:inherit}button.i{appearance:none;border:0;background:transparent;cursor:pointer}button.i:active{background:var(--dashboard-card-muted-surface)}button.i:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px;border-radius:var(--dashboard-radius-control)}@media(max-width:700px){.wrap{padding:8px 10px}}", $s = ":host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}", ks = y`
  ${re(xs)}
`, or = y`
  ${re(ws)}
`, Cl = y`
  ${re($s)}
`, Sl = ks, da = y`
  .editor-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px 0;
  }
  .form-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .form-label {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--secondary-text-color);
  }
  .form-input,
  .form-select {
    padding: 0 12px;
    height: 44px;
    border-radius: var(--dashboard-radius-control);
    border: var(--dashboard-card-border);
    background: var(--dashboard-card-surface);
    color: var(--primary-text-color);
    font-size: 13px;
    outline: none;
    box-sizing: border-box;
  }
  .form-input:focus,
  .form-select:focus {
    border-color: var(--primary-color);
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;
function it(t) {
  return t && t.split(".")[0] || "";
}
const O = it;
function vt(t) {
  let e = t.entry?.name || t.entry?.original_name || t.state?.attributes?.friendly_name || t.fallback || t.entry?.entity_id || t.state?.entity_id || "Control";
  if (t.stripSuffixes && t.stripSuffixes.length > 0)
    for (const i of t.stripSuffixes)
      e = e.replace(i, "").trim();
  return e;
}
function $i(t, e) {
  return t ? t.attributes?.friendly_name || e || t.entity_id : e || "";
}
function ha(t) {
  if (!t) return !1;
  const e = typeof t == "string" ? t : t.state;
  if (!e) return !1;
  const i = e.toLowerCase().trim();
  return i !== "unavailable" && i !== "unknown" && i !== "";
}
function ot(t) {
  return !ha(t);
}
function K(t, e) {
  if (!t) return "Unavailable";
  if (e?.formatEntityState)
    return e.formatEntityState(t);
  const i = t.state, r = t.attributes?.unit_of_measurement;
  return i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : i === "on" ? "On" : i === "off" ? "Off" : r ? `${i} ${r}` : i.charAt(0).toUpperCase() + i.slice(1);
}
function xe(t) {
  if (!t) return !1;
  const e = t.state;
  if (e === "unavailable" || e === "unknown" || e === "off")
    return !1;
  switch (it(t.entity_id)) {
    case "climate":
      return e !== "off";
    case "cover":
      return e === "open" || e === "opening";
    case "lock":
      return e === "unlocked" || e === "unlocking";
    case "media_player":
      return e === "playing" || e === "paused" || e === "buffering" || e === "on";
    case "vacuum":
      return e === "cleaning" || e === "on";
    case "binary_sensor":
      return e === "on";
    default:
      return e === "on" || e === "active" || e === "home" || e === "open";
  }
}
function ne(t, e) {
  switch (t) {
    case "light":
      return e === "on" ? "mdi:lightbulb" : "mdi:lightbulb-outline";
    case "switch":
      return e === "on" ? "mdi:toggle-switch" : "mdi:toggle-switch-off";
    case "binary_sensor":
      return "mdi:radiobox-marked";
    case "sensor":
      return "mdi:gauge";
    case "climate":
      return "mdi:thermostat";
    case "media_player":
      return e === "playing" ? "mdi:play-circle" : "mdi:cast";
    case "cover":
      return e === "open" ? "mdi:window-shutter-open" : "mdi:window-shutter";
    case "fan":
      return "mdi:fan";
    case "lock":
      return e === "unlocked" ? "mdi:lock-open" : "mdi:lock";
    case "camera":
      return "mdi:cctv";
    case "automation":
      return "mdi:robot";
    case "scene":
      return "mdi:palette";
    case "script":
      return "mdi:script-text";
    case "person":
      return "mdi:account";
    case "weather":
      return "mdi:weather-partly-cloudy";
    default:
      return "mdi:view-dashboard";
  }
}
async function ki(t, e, i, r) {
  if (!e) return;
  const a = i?.action || "toggle";
  if (a === "none") return;
  if (i?.haptic && nt(t, "haptic", i.haptic), i?.confirmation) {
    const n = i.confirmation.text || "Are you sure you want to proceed?";
    if (!window.confirm(n))
      return;
  }
  const s = i?.target?.entity_id || r;
  switch (a) {
    case "toggle": {
      if (!s) return;
      const n = it(s), c = n === "lock" ? "lock" : "toggle";
      await e.callService(n, c, void 0, {
        entity_id: s
      });
      break;
    }
    case "more-info": {
      if (!s) return;
      nt(t, "hass-more-info", { entityId: s });
      break;
    }
    case "call-service": {
      if (!i?.service) return;
      const [n, c] = i.service.split(".");
      n && c && await e.callService(
        n,
        c,
        i.service_data,
        i.target || (s ? { entity_id: s } : void 0)
      );
      break;
    }
    case "navigate": {
      i?.navigation_path && (window.history.pushState(null, "", i.navigation_path), nt(window, "location-changed", { replace: !1 }));
      break;
    }
    case "url": {
      i?.url_path && window.open(i.url_path, "_blank");
      break;
    }
    case "assist": {
      nt(t, "start-voice-assist");
      break;
    }
  }
}
var Cs = Object.defineProperty, cr = (t, e, i, r) => {
  for (var a = void 0, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(e, i, a) || a);
  return a && Cs(e, i, a), a;
};
class A extends gt {
  constructor() {
    super(...arguments), this._cardError = null, this._lifecycle = ms(this);
  }
  static getGridOptions() {
    return {
      columns: 12,
      rows: "auto"
    };
  }
  setConfig(e) {
    if (!e)
      throw new Error("Invalid configuration");
    this._config = { ...e }, this._cardError = null;
  }
  set config(e) {
    this.setConfig(e);
  }
  get config() {
    return this._config;
  }
  connectedCallback() {
    super.connectedCallback(), this._lifecycle.connect();
  }
  disconnectedCallback() {
    this._lifecycle.disconnect(), super.disconnectedCallback();
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    const e = this.constructor.getGridOptions?.() || {}, i = this._config?.grid_options || {};
    return {
      columns: 12,
      rows: "auto",
      ...e,
      ...i
    };
  }
  // Shared utility methods for declarative templates
  esc(e) {
    return Ke(e);
  }
  toText(e) {
    return Jr(e);
  }
  moreInfo(e) {
    La(this, e);
  }
  navigate(e) {
    Xr(e);
  }
  fire(e, i) {
    return nt(this, e, i);
  }
  formatNum(e, i) {
    return Ut(this.hass, e, i);
  }
  fmtPower(e, i) {
    return st(this.hass, e, i);
  }
  fmtEnergy(e) {
    return ft(this.hass, e);
  }
  fmtDate(e, i) {
    return _i(this.hass, e, i);
  }
  fmtTime(e, i) {
    return Ye(this.hass, e, i);
  }
  fmtCalendarDay(e, i) {
    return vi(this.hass, e, i);
  }
  renderError(e) {
    return o`
      <ha-card class="error-card">
        <div
          style="padding: 16px; color: var(--error-color, #db4437); font-size: 13px; font-weight: 500;"
        >
          ⚠️ ${Ke(e)}
        </div>
      </ha-card>
    `;
  }
}
cr([
  ae({ attribute: !1 })
], A.prototype, "hass");
cr([
  x()
], A.prototype, "_config");
cr([
  x()
], A.prototype, "_cardError");
class Ci extends A {
  validateConfig(e) {
  }
  setConfig(e) {
    super.setConfig(e), this.validateConfig(e);
  }
  fireConfigChanged() {
    this.fire("config-changed", { config: this._config });
  }
}
const Ss = /* @__PURE__ */ new Set([
  "battery",
  "signal_strength",
  "connectivity",
  "tamper",
  "update",
  "problem",
  "voltage",
  "current",
  "power_factor",
  "duration",
  "timestamp"
]), As = /* @__PURE__ */ new Set([
  "temperature",
  "humidity",
  "pressure",
  "illuminance",
  "power",
  "energy",
  "energy_storage",
  "apparent_power",
  "reactive_power",
  "carbon_dioxide",
  "carbon_monoxide",
  "nitrogen_dioxide",
  "nitrogen_monoxide",
  "nitrous_oxide",
  "ozone",
  "pm1",
  "pm25",
  "pm10",
  "volatile_organic_compounds",
  "volatile_organic_compounds_parts",
  "water",
  "gas",
  "speed",
  "wind_speed",
  "distance",
  "volume",
  "volume_storage",
  "weight"
]), Es = /\b(battery|battery_level|battery_low|battery_state|link_?quality|rssi|signal_strength|lqi|voltage|temp(erature)?_offset|humidity_offset|calibration_offset|firmware|firmware_version|ip_address|mac_address|device_temp(erature)?|cpu_temp(erature)?|ping|keep_alive|reporting_interval|uptime|free_heap|wifi_signal|compressor_speed|compressor_frequency|defrost_mode)\b/i, zs = /* @__PURE__ */ new Set([
  "light",
  "fan",
  "switch",
  "input_boolean",
  "media_player",
  "climate",
  "cover",
  "lock",
  "vacuum",
  "button",
  "input_button",
  "select",
  "input_select",
  "number",
  "input_number"
]), lr = (t, e) => {
  if (!t?.entity_id) return !1;
  if (t.entity_category === "diagnostic" || t.entity_category === "config")
    return !0;
  const i = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  if (Ss.has(i))
    return !0;
  const r = `${t.entity_id} ${t.name || ""} ${t.original_name || ""} ${e?.attributes?.friendly_name || ""}`.toLowerCase();
  return Es.test(r);
}, Al = (t, e) => {
  if (!t?.entity_id || O(t.entity_id) !== "sensor") return !1;
  const r = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  return As.has(r) || !!e?.attributes?.unit_of_measurement;
}, Lr = (t, e) => {
  if (!t?.entity_id || t.disabled_by || t.hidden_by || lr(t, e)) return !1;
  const i = O(t.entity_id);
  return !!(zs.has(i) || i === "binary_sensor" && e?.attributes?.device_class === "garage_door");
}, Ts = (t, e) => {
  if (!e || lr(t, e)) return !1;
  const i = O(t.entity_id), r = String(e.state).toLowerCase(), a = e.attributes || {};
  if (["light", "fan", "switch", "input_boolean"].includes(i))
    return r === "on";
  if (i === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(r)) return !0;
    if (r === "idle") {
      const s = String(a.media_title || a.app_name || "").trim();
      return !!(s && !/^(idle|home(?: screen)?|default media receiver)$/i.test(s));
    }
    return !1;
  }
  if (i === "climate")
    return /^(heat|cool|heat_cool|auto|dry|fan_only)$/.test(r);
  if (i === "cover")
    return /^(open|opening|closing)$/.test(r);
  if (i === "lock")
    return r === "unlocked";
  if (i === "vacuum")
    return /^(cleaning|returning)$/.test(r);
  if (i === "binary_sensor") {
    const s = String(a.device_class || "").toLowerCase();
    return r === "on" && /^(door|window|garage_door|smoke|moisture|gas|motion|occupancy|presence)$/.test(
      s
    );
  }
  return !1;
}, Rt = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), Ir = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Split System", Mr = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Ds = (t, e, i, r) => {
  if (O(t?.entity_id) !== "climate") return null;
  const a = /* @__PURE__ */ new Set();
  if (a.add(t.entity_id), t.device_id && i?.byDevice) {
    const _ = i.byDevice.get(t.device_id) || [];
    for (const $ of _)
      a.add($.entity_id);
  }
  const s = Mr(t, i), n = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], c = s ? (i?.entities || []).filter(
    (_) => Mr(_, i) === s
  ) : [], l = (i?.entities || []).filter(
    (_) => ["timer", "script", "scene"].includes(O(_?.entity_id))
  ), p = [
    ...new Map(
      [...n, ...c, ...l].map((_) => [
        _.entity_id,
        _
      ])
    ).values()
  ].filter((_) => r?.states?.[_.entity_id]), f = Rt(t, r).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((_) => _.length > 2), g = (_) => {
    const $ = Rt(_, r);
    return !!(t.device_id && _.device_id === t.device_id) || f.length > 0 && f.some((v) => $.includes(v));
  }, d = (_) => {
    const $ = p.filter(
      (v) => O(v.entity_id) === "select" && Rt(v, r).includes(_) && /(vane|swing)/.test(Rt(v, r)) && g(v)
    );
    return $.length === 1 ? $[0].entity_id : null;
  }, u = d("vertical"), h = d("horizontal");
  u && a.add(u), h && a.add(h);
  const b = p.find(
    (_) => O(_.entity_id) === "timer" && g(_) && /(split|climate|air.?con|hvac|timer)/.test(
      Rt(_, r)
    )
  )?.entity_id || null;
  b && a.add(b);
  const m = p.filter(
    (_) => ["script", "scene"].includes(O(_.entity_id)) && g(_) && /(split|climate|air.?con|hvac)/.test(Rt(_, r))
  ).map((_) => (a.add(_.entity_id), {
    entity: _.entity_id,
    name: Ir(r, _, r?.states?.[_.entity_id])
  }));
  return {
    cardConfig: {
      type: "custom:component-split-controller-v4",
      entity: t.entity_id,
      title: Ir(r, t, e),
      vertical_vane_entity: u,
      horizontal_vane_entity: h,
      timer_entity: b,
      profile_entities: m
    },
    claimedEntityIds: a
  };
}, Os = (t, e, i, r) => {
  if (t?.platform !== "wled" || O(t.entity_id) !== "light")
    return null;
  const a = String(
    t.original_name || t.name || t.entity_id || ""
  ).toLowerCase();
  if (/_\d+$/.test(String(t.unique_id || "")) && a !== "main")
    return null;
  const n = /* @__PURE__ */ new Set();
  if (n.add(t.entity_id), t.device_id && i?.byDevice) {
    const c = i.byDevice.get(t.device_id) || [];
    for (const l of c)
      n.add(l.entity_id);
  }
  return {
    cardConfig: {
      type: "custom:component-wled-controller-v1",
      entity: t.entity_id,
      device_id: t.device_id
    },
    claimedEntityIds: n
  };
}, Ps = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), Hs = (t, e, i, r) => {
  const a = O(t.entity_id), s = a === "binary_sensor" && e?.attributes?.device_class === "garage_door", n = a === "cover" && (/garage/i.test(t.entity_id) || /garage/i.test(e?.attributes?.friendly_name || "") || e?.attributes?.device_class === "garage");
  if (!s && !n)
    return null;
  const c = /* @__PURE__ */ new Set();
  c.add(t.entity_id);
  let l = null;
  if (t.device_id && i?.byDevice) {
    const d = (i.byDevice.get(t.device_id) || []).filter(
      (u) => O(u?.entity_id) === "button" && r?.states?.[u.entity_id] && String(r.states[u.entity_id].state).toLowerCase() !== "unavailable"
    ).filter(
      (u) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
        Ps(u)
      )
    );
    d.length === 1 && (l = d[0].entity_id, c.add(l));
  }
  const p = (t.name || t.original_name || e?.attributes?.friendly_name || "Garage Door").replace(/ Garage Door Status$/i, "");
  return {
    cardConfig: {
      type: "custom:component-garage-door-controller-v1",
      entity: t.entity_id,
      control_entity: l || void 0,
      title: p
    },
    claimedEntityIds: c
  };
}, Ns = (t, e, i, r) => {
  if (O(t?.entity_id) !== "media_player" || t?.platform !== "apple_tv")
    return null;
  const a = /* @__PURE__ */ new Set();
  if (a.add(t.entity_id), t.device_id && i?.byDevice) {
    const n = i.byDevice.get(t.device_id) || [];
    for (const c of n)
      a.add(c.entity_id);
  }
  const s = t.name || t.original_name || e?.attributes?.friendly_name || "Apple TV";
  return {
    cardConfig: {
      type: "custom:component-apple-tv-controller-v1",
      entity: t.entity_id,
      title: s,
      icon: "mdi:apple"
    },
    claimedEntityIds: a
  };
}, Rs = (t, e, i, r) => {
  if (O(t?.entity_id) !== "camera")
    return null;
  const a = `${t.entity_id} ${t.name || t.original_name || ""}`;
  if (/sub.?stream/i.test(a))
    return null;
  const s = /* @__PURE__ */ new Set();
  if (s.add(t.entity_id), t.device_id && i?.byDevice) {
    const c = i.byDevice.get(t.device_id) || [];
    for (const l of c)
      s.add(l.entity_id);
  }
  const n = t.name || t.original_name || e?.attributes?.friendly_name || "Camera";
  return {
    cardConfig: {
      type: "custom:component-camera-controller-v1",
      entity: t.entity_id,
      title: n,
      device_id: t.device_id
    },
    claimedEntityIds: s
  };
}, Ge = [], El = (t) => {
  if (typeof t != "function")
    throw new TypeError("Device resolvers must be functions");
  return Ge.push(t), () => {
    const e = Ge.indexOf(t);
    e >= 0 && Ge.splice(e, 1);
  };
}, Ls = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", qr = (t, e, i, r) => {
  for (const d of Ge) {
    const u = d(t, e, i, r);
    if (u) return u;
  }
  const a = Ds(t, e, i, r);
  if (a) return a;
  const s = Os(t, e, i);
  if (s) return s;
  const n = Hs(t, e, i, r);
  if (n) return n;
  const c = Ns(t, e, i);
  if (c) return c;
  const l = Rs(t, e, i);
  if (l) return l;
  const p = t.entity_id, f = O(p), g = Ls(r, t, e);
  return f === "media_player" ? {
    cardConfig: {
      type: "custom:component-media-row-v2",
      entity: p,
      title: g
    },
    claimedEntityIds: /* @__PURE__ */ new Set([p])
  } : [
    "light",
    "fan",
    "switch",
    "input_boolean",
    "cover",
    "lock",
    "vacuum",
    "button",
    "input_button",
    "select",
    "input_select",
    "number",
    "input_number"
  ].includes(f) ? {
    cardConfig: {
      type: "custom:component-control-row-v2",
      entity: p,
      title: g,
      name: g
    },
    claimedEntityIds: /* @__PURE__ */ new Set([p])
  } : null;
}, jr = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Ur = (t, e) => {
  const i = e?.entity_id ? t?.states?.[e.entity_id] : void 0;
  return e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control";
}, Bi = (t, e, i = {}) => {
  if (!t?.states) return [];
  const r = i.mode || "all", a = i.area_id, s = new Set(i.exclude_device_names || []), n = new Map(
    (e?.devices || []).map((u) => [
      u.id,
      u.name_by_user || u.name || ""
    ])
  ), l = (e && e.entities.length > 0 ? e.entities : Object.keys(t.states).map((u) => ({
    entity_id: u,
    device_id: null,
    area_id: null,
    name: t.states[u]?.attributes?.friendly_name || u
  }))).filter((u) => {
    if (!u.entity_id || u.disabled_by || u.hidden_by) return !1;
    const h = t.states[u.entity_id];
    return !(!h || u.device_id && s.has(n.get(u.device_id) || "") || lr(u, h));
  }), p = /* @__PURE__ */ new Set(), f = [];
  for (const u of l) {
    const h = O(u.entity_id), b = jr(u, e);
    if (!(r === "area" && a && b !== a) && [
      "climate",
      "media_player",
      "camera",
      "binary_sensor",
      "cover",
      "light"
    ].includes(h)) {
      const m = t.states[u.entity_id], _ = qr(u, m, e, t);
      if (_ && _.cardConfig.type !== "custom:component-control-row-v2" && _.cardConfig.type !== "custom:component-media-row-v2") {
        for (const $ of _.claimedEntityIds)
          p.add($);
        f.push({
          entityId: u.entity_id,
          entry: u,
          cardConfig: _.cardConfig
        });
      }
    }
  }
  for (const u of l) {
    if (p.has(u.entity_id))
      continue;
    const h = t.states[u.entity_id], b = O(u.entity_id), m = jr(u, e);
    if (r === "area") {
      if (m !== a || !Lr(u, h)) continue;
    } else if (r === "media") {
      if (b !== "media_player") continue;
    } else if (r === "sound") {
      if (!["switch", "number", "select"].includes(b)) continue;
    } else if (!Lr(u, h)) continue;
    const _ = qr(u, h, e, t);
    _ && f.push({
      entityId: u.entity_id,
      entry: u,
      cardConfig: _.cardConfig
    });
  }
  const g = r === "active" ? f.filter((u) => {
    const h = t.states[u.entityId];
    return Ts(u.entry, h);
  }) : f;
  return g.sort(
    (u, h) => Ur(t, u.entry).localeCompare(
      Ur(t, h.entry),
      void 0,
      { sensitivity: "base" }
    )
  ), wa(
    g.map((u) => ({ id: u.entityId, card: u })),
    i.prefs
  ).visible.map((u) => ({
    entityId: u.id,
    cardConfig: u.card.cardConfig,
    signature: JSON.stringify(u.card.cardConfig)
  }));
};
class Is {
  constructor() {
    this._connection = null, this._hass = null, this._data = null, this._promise = null, this._refreshPromise = null, this._refreshQueued = !1, this._subs = /* @__PURE__ */ new Set(), this._unsubs = null, this._retry = null;
  }
  get data() {
    return this._data;
  }
  attach(e) {
    const i = e?.connection || null;
    if (this._connection === i) {
      this._hass = e || null;
      return;
    }
    this.detach(), this._connection = i, this._hass = e || null, this._subs.size > 0 && this.listen();
  }
  detach() {
    const e = this._unsubs;
    this._unsubs = null, this._refreshPromise = null, this._refreshQueued = !1, e && Promise.resolve(e).then((i) => i?.()).catch(() => {
    }), this._retry && (clearTimeout(this._retry), this._retry = null), this._connection = null, this._data = null, this._promise = null;
  }
  listen() {
    const e = this._connection;
    if (!e?.subscribeEvents || this._unsubs) return;
    const i = Promise.all([
      e.subscribeEvents(() => this.refresh(), "area_registry_updated"),
      e.subscribeEvents(() => this.refresh(), "device_registry_updated"),
      e.subscribeEvents(() => this.refresh(), "entity_registry_updated")
    ]).then((r) => () => r.forEach((a) => a?.()));
    this._unsubs = i, i.catch(() => {
      this._unsubs === i && (this._unsubs = null), this._connection && !this._retry && (this._retry = setTimeout(() => {
        this._retry = null, this.listen();
      }, 3e4));
    });
  }
  async load(e, i = !1) {
    if (this.attach(e), this._data && !i) return this._data;
    if (this._promise) return this._promise;
    const r = e?.connection;
    return r?.sendMessagePromise ? (this._promise = Promise.all([
      r.sendMessagePromise({ type: "config/area_registry/list" }),
      r.sendMessagePromise({ type: "config/device_registry/list" }),
      r.sendMessagePromise({ type: "config/entity_registry/list" }),
      e?.callWS ? e.callWS({ type: "lovelace/dashboards/list" }).catch(() => []) : Promise.resolve([])
    ]).then(([a, s, n, c]) => {
      const l = Array.isArray(a) ? a : [], p = Array.isArray(s) ? s : [], f = Array.isArray(n) ? n : [], g = Array.isArray(c) ? c : [], d = new Map(
        p.map((b) => [b.id, b.area_id || null])
      ), u = /* @__PURE__ */ new Map();
      for (const b of f) {
        if (!b?.device_id) continue;
        const m = u.get(b.device_id) || [];
        m.push(b), u.set(b.device_id, m);
      }
      const h = new Map(
        l.map((b) => [b.area_id, b])
      );
      return this._data = {
        areas: l,
        devices: p,
        entities: f,
        dashboards: g,
        deviceArea: d,
        byDevice: u,
        areaMap: h
      }, this._data;
    }).catch(() => this._data || {
      areas: [],
      devices: [],
      entities: [],
      dashboards: [],
      deviceArea: /* @__PURE__ */ new Map(),
      byDevice: /* @__PURE__ */ new Map(),
      areaMap: /* @__PURE__ */ new Map()
    }).finally(() => {
      this._promise = null;
    }), this._promise) : {
      areas: [],
      devices: [],
      entities: [],
      dashboards: [],
      deviceArea: /* @__PURE__ */ new Map(),
      byDevice: /* @__PURE__ */ new Map(),
      areaMap: /* @__PURE__ */ new Map()
    };
  }
  refresh() {
    if (!this._hass) return Promise.resolve(this._data);
    if (this._refreshPromise)
      return this._refreshQueued = !0, this._refreshPromise;
    const e = this._hass, i = () => this._hass !== e ? Promise.resolve(this._data || {}) : (this._data = null, this._promise = null, this.load(e, !0)), r = this._promise ? Promise.resolve(this._promise).catch(() => {
    }).then(i) : i();
    let a;
    return a = Promise.resolve(r).then((s) => {
      if (this._hass === e)
        for (const n of [...this._subs])
          try {
            n(s);
          } catch {
          }
      return s;
    }).finally(() => {
      this._refreshPromise === a && (this._refreshPromise = null, this._refreshQueued && (this._refreshQueued = !1, this.refresh()));
    }), this._refreshPromise = a, a;
  }
  subscribe(e, i) {
    this.attach(e);
    const r = this._subs.size === 0;
    return this._subs.add(i), r && this.listen(), this.load(e).then(i), () => {
      this._subs.delete(i), this._subs.size === 0 && this.detach();
    };
  }
}
const I = new Is(), fe = [], pa = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard entry filters must be functions");
  return fe.push(t), () => {
    const e = fe.indexOf(t);
    e >= 0 && fe.splice(e, 1);
  };
}, ua = (t, e) => {
  if (!t?.entity_id) return !1;
  if (t.entity_category === "diagnostic" || t.entity_category === "config")
    return !0;
  const i = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  if ([
    "battery",
    "signal_strength",
    "connectivity",
    "tamper",
    "update",
    "problem",
    "voltage",
    "current",
    "power_factor",
    "duration",
    "timestamp"
  ].includes(i))
    return !0;
  const r = `${t.entity_id} ${t.name || ""} ${t.original_name || ""} ${e?.attributes?.friendly_name || ""}`.toLowerCase();
  return /\b(battery|battery_level|battery_low|battery_state|link_?quality|rssi|signal_strength|lqi|voltage|temp(erature)?_offset|humidity_offset|calibration_offset|firmware|ip_address|mac_address|device_temp(erature)?|cpu_temp(erature)?|ping|keep_alive|reporting_interval|uptime|free_heap|wifi_signal|compressor_speed|compressor_frequency)\b/i.test(
    r
  );
}, Si = (t, e) => !!(t?.entity_id && !t.disabled_by && !t.hidden_by && !["diagnostic", "config"].includes(t.entity_category || "") && !ua(t, e) && fe.every((i) => i(t))), X = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", jt = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Lt = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), ma = (t, e, i, r) => {
  if (O(t?.entity_id) !== "climate") return null;
  const a = jt(t, i), s = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], n = a ? (i?.entities || []).filter(
    (h) => jt(h, i) === a
  ) : [], c = (i?.entities || []).filter(
    (h) => ["timer", "script", "scene"].includes(O(h?.entity_id))
  ), l = [
    ...new Map(
      [...s, ...n, ...c].map((h) => [
        h.entity_id,
        h
      ])
    ).values()
  ].filter((h) => r?.states?.[h.entity_id]), p = Lt(t, r).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((h) => h.length > 2), f = (h) => {
    const b = Lt(h, r);
    return !!(t.device_id && h.device_id === t.device_id) || p.some((m) => b.includes(m));
  }, g = (h) => {
    const b = l.filter(
      (m) => O(m.entity_id) === "select" && Lt(m, r).includes(h) && /(vane|swing)/.test(Lt(m, r)) && f(m)
    );
    return b.length === 1 ? b[0].entity_id : null;
  }, d = l.find(
    (h) => O(h.entity_id) === "timer" && f(h) && /(split|climate|air.?con|hvac|timer)/.test(
      Lt(h, r)
    )
  )?.entity_id || null, u = l.filter(
    (h) => ["script", "scene"].includes(O(h.entity_id)) && f(h) && /(split|climate|air.?con|hvac)/.test(Lt(h, r))
  ).map((h) => ({
    entity: h.entity_id,
    name: X(r, h, r?.states?.[h.entity_id])
  }));
  return {
    type: "custom:component-split-controller-v4",
    entity: t.entity_id,
    title: X(r, t, e),
    vertical_vane_entity: g("vertical"),
    horizontal_vane_entity: g("horizontal"),
    timer_entity: d,
    profile_entities: u
  };
}, Ms = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), fa = (t, e, i) => {
  if (!t?.device_id) return null;
  const a = (e?.byDevice?.get(t.device_id) || []).filter(
    (s) => O(s?.entity_id) === "button" && Si(s) && i?.states?.[s.entity_id] && String(i.states[s.entity_id].state).toLowerCase() !== "unavailable"
  ).filter(
    (s) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
      Ms(s)
    )
  );
  return a.length === 1 ? a[0].entity_id : null;
}, ga = (t, e, i, r) => O(t?.entity_id) === "media_player" && t?.platform === "apple_tv" ? {
  type: "custom:component-apple-tv-controller-v1",
  entity: t.entity_id,
  title: X(r, t, e),
  icon: "mdi:apple"
} : null, ba = /* @__PURE__ */ new Set([
  "light",
  "fan",
  "switch",
  "input_boolean",
  "media_player",
  "climate",
  "cover",
  "lock",
  "vacuum",
  "button",
  "select",
  "number"
]), qs = (t, e) => Si(t, e) && (ba.has(O(t.entity_id)) || O(t.entity_id) === "binary_sensor" && e?.attributes?.device_class === "garage_door"), js = (t, e) => {
  if (!Si(t, e) || !e) return !1;
  const i = O(t.entity_id), r = e.state, a = e.attributes || {};
  if (["light", "fan", "switch", "input_boolean"].includes(i))
    return r === "on";
  if (i === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(r)) return !0;
    if (r === "idle") {
      const s = String(a.media_title || a.app_name || "");
      return !!(s && !/^(idle|home(?: screen)?|default media receiver)$/i.test(s));
    }
    return !1;
  }
  return i === "climate" ? /^(heat|cool|heat_cool|auto|dry|fan_only)$/.test(r) : i === "cover" ? /^(open|opening|closing)$/.test(r) : i === "lock" ? r === "unlocked" : i === "vacuum" ? /^(cleaning|returning)$/.test(r) : i === "binary_sensor" ? r === "on" && /^(door|window|garage_door|smoke|moisture|gas)$/.test(
    a.device_class || ""
  ) : !1;
}, ge = [], _a = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard control resolvers must be functions");
  return ge.push(t), () => {
    const e = ge.indexOf(t);
    e >= 0 && ge.splice(e, 1);
  };
}, va = (t, e, i, r) => {
  const a = t.entity_id, s = O(a);
  if (s === "climate")
    return ma(t, e, i, r) || {
      type: "custom:component-split-controller-v4",
      entity: a,
      title: X(r, t, e)
    };
  if (s === "binary_sensor" && e?.attributes?.device_class === "garage_door") {
    const n = fa(t, i, r);
    return n ? {
      type: "custom:component-garage-door-controller-v1",
      title: X(r, t, e).replace(
        / Garage Door Status$/i,
        ""
      ),
      entity: a,
      control_entity: n
    } : {
      type: "custom:component-control-row-v2",
      entity: a,
      title: X(r, t, e)
    };
  }
  return s === "media_player" ? ga(t, e, i, r) || {
    type: "custom:component-media-row-v2",
    entity: a,
    title: X(r, t, e)
  } : s === "camera" ? {
    type: "custom:component-camera-controller-v1",
    entity: a,
    title: X(r, t, e),
    device_id: t.device_id
  } : [
    "light",
    "fan",
    "switch",
    "input_boolean",
    "cover",
    "lock",
    "vacuum",
    "button",
    "select",
    "number",
    "binary_sensor"
  ].includes(s) ? {
    type: "custom:component-control-row-v2",
    entity: a,
    title: X(r, t, e),
    name: X(r, t, e)
  } : null;
}, Us = (t, e, i, r) => {
  for (const a of ge) {
    const s = a(t, e, i, r);
    if (s) return s;
  }
  return va(t, e, i, r);
}, ya = async (t, e) => {
  if (!t || !e) return { order: [], hidden: [] };
  try {
    return (await t.callWS({
      type: "frontend/get_user_data",
      key: e
    }))?.value || { order: [], hidden: [] };
  } catch {
    return { order: [], hidden: [] };
  }
}, xa = (t, e, i) => t.callWS({ type: "frontend/set_user_data", key: e, value: i }), wa = (t, e) => {
  const i = new Map(t.map((n) => [n.id, n])), r = /* @__PURE__ */ new Set(), a = [];
  for (const n of e?.order || []) {
    const c = i.get(n);
    c && (a.push(c), r.add(n));
  }
  for (const n of t)
    r.has(n.id) || a.push(n);
  const s = new Set(e?.hidden || []);
  return { all: a, visible: a.filter((n) => !s.has(n.id)), hidden: s };
}, $a = async (t, e) => {
  const i = String(t?.type || ""), r = i.startsWith("custom:") ? i.slice(7) : i;
  let a;
  if (customElements.get(r))
    a = document.createElement(r);
  else {
    const s = globalThis.loadCardHelpers || (typeof window < "u" ? window.loadCardHelpers : void 0);
    if (typeof s == "function")
      try {
        const p = (await s()).createCardElement(t);
        return e && (p.hass = e), p;
      } catch {
      }
    const n = t?.entity || "";
    O(n) === "media_player" ? a = document.createElement("component-media-row-v2") : a = document.createElement("component-control-row-v2");
  }
  if (typeof a.setConfig == "function")
    try {
      a.setConfig(t);
    } catch {
    }
  return e && (a.hass = e), a;
};
globalThis.__homeDashboardV2 ??= {};
const U = globalThis.__homeDashboardV2;
U.REG = I;
U.entryFilters = fe;
U.registerEntryFilter = pa;
U.uiEntry = Si;
U.stateName = X;
U.areaOf = jt;
U.domain = O;
U.controlResolvers = ge;
U.registerControlResolver = _a;
U.nativeClimateControlConfig = ma;
U.garageControl = fa;
U.appleTvBundle = ga;
U.controlConfig = Us;
U.defaultControlConfig = va;
U.controlDomains = ba;
U.isPotential = qs;
U.isActive = js;
U.isPeripheral = ua;
U.prefs = ya;
U.savePrefs = xa;
U.applyPrefs = wa;
U.card = $a;
U.discoverControls = Bi;
const Br = /* @__PURE__ */ new WeakMap(), zl = async (t) => {
  if (!t || !t.sendMessagePromise)
    return { areas: [], devices: [], entities: [] };
  const e = await I.load({ connection: t });
  let i = Br.get(e);
  return i || (i = {
    areas: e.areas,
    devices: e.devices,
    entities: e.entities
  }, Br.set(e, i)), i;
}, Tl = async (t, e = !1) => I.load(t, e), Bs = /(_controller_temperature|_outside_air_temperature|cpu_temperature|processor_temperature|board_temperature|chip_temperature|internal_temperature)$/i;
function ka(t, e, i) {
  if (!i)
    return {
      summary: "",
      severity: "",
      lightsOn: 0,
      temperatureText: "",
      humidityText: "",
      hasCritical: !1,
      hasWarning: !1
    };
  const a = (e?.entities || []).filter((b) => (b.area_id || (b.device_id ? e?.deviceArea?.get(b.device_id) : null)) === t.area_id), s = [];
  for (const b of a) {
    const m = i.states[b.entity_id];
    m && ha(m) && s.push(m);
  }
  let n = 0, c = "", l = "", p = !1, f = !1;
  const g = s.find(
    (b) => b.entity_id.startsWith("climate.") && b.attributes && !Number.isNaN(
      Number.parseFloat(String(b.attributes.current_temperature ?? ""))
    )
  );
  if (g && g.attributes?.current_temperature !== void 0) {
    const b = Number.parseFloat(
      String(g.attributes.current_temperature)
    ), m = g.attributes.temperature_unit || i.config?.unit_system?.temperature || "°C";
    c = `${b.toFixed(1)} ${m}`;
  } else {
    const b = s.find(
      (m) => m.entity_id.startsWith("sensor.") && (m.attributes?.device_class === "temperature" || m.attributes?.unit_of_measurement && /°[CF]/i.test(m.attributes.unit_of_measurement)) && !Bs.test(m.entity_id) && !Number.isNaN(Number.parseFloat(String(m.state ?? "")))
    );
    if (b) {
      const m = Number.parseFloat(String(b.state)), _ = b.attributes?.unit_of_measurement || i.config?.unit_system?.temperature || "°C";
      c = `${m.toFixed(1)} ${_}`;
    }
  }
  const d = s.find(
    (b) => b.entity_id.startsWith("sensor.") && b.attributes?.device_class === "humidity" && !Number.isNaN(Number.parseFloat(String(b.state ?? "")))
  );
  d && (l = K(d, i));
  for (const b of s) {
    b.entity_id.startsWith("light.") && b.state === "on" && n++;
    const m = b.attributes?.device_class || "";
    b.entity_id.startsWith("binary_sensor.") && b.state === "on" && ["smoke", "moisture", "gas"].includes(m) && (p = !0), (b.entity_id.startsWith("binary_sensor.") && b.state === "on" && m === "garage_door" || b.entity_id.startsWith("cover.") && ["open", "opening"].includes(b.state) && m === "garage") && (f = !0);
  }
  const u = n > 0 || s.some(
    (b) => b.entity_id.startsWith("climate.") && ["heating", "cooling", "drying", "fan"].includes(
      b.attributes?.hvac_action || ""
    ) || b.entity_id.startsWith("media_player.") && b.state === "playing"
  ), h = [];
  return p ? h.push("Attention required") : f && h.push("Garage open"), c && h.push(c), l && !c && h.push(l), n > 0 && h.push(`${n} light${n === 1 ? "" : "s"} on`), {
    summary: h.slice(0, 3).join(" · "),
    severity: p ? "critical" : f ? "warning" : u ? "active" : "",
    lightsOn: n,
    temperatureText: c,
    humidityText: l,
    hasCritical: p,
    hasWarning: f
  };
}
const Ni = /* @__PURE__ */ new WeakMap();
let Fs = 1;
const dr = (t) => {
  const e = t?.connection;
  return e ? (Ni.has(e) || Ni.set(e, Fs++), Ni.get(e)) : "none";
}, Mt = (t, e, i) => `${dr(t)}|${e}|${i}`, Ri = /* @__PURE__ */ new WeakMap(), Fr = (t) => {
  const e = t?.connection;
  if (!e?.subscribeEvents || Ri.has(e))
    return;
  const i = e.subscribeEvents((r) => {
    const a = /^dashboard-profile\.(energy|security)\.([a-z0-9-]+)$/.exec(
      String(r?.data?.key || "")
    );
    a && (qt.invalidate(Mt(t, a[1], a[2])), window.dispatchEvent(
      new CustomEvent("ha-component-profile-change", {
        detail: { kind: a[1], profileId: a[2] }
      })
    ));
  }, "ha_component_backend_preferences_updated");
  Ri.set(e, i), Promise.resolve(i).catch(
    () => Ri.delete(e)
  );
}, qt = na(
  async (t, e) => {
    if (!e?.hass?.callWS)
      throw new Error("Home Assistant WebSocket connection is unavailable");
    return e.hass.callWS({
      type: "ha_component_backend/profile/get",
      kind: e.kind,
      profile_id: e.profileId
    });
  },
  { ttl: 3e5, maxStale: 864e5, retryBase: 3e3, retryMax: 6e4 }
), Vs = Object.freeze({
  async get(t, e, i, r = {}) {
    Fr(t);
    const a = Mt(t, e, i);
    return qt.read(a, { hass: t, kind: e, profileId: i }, r);
  },
  invalidate(t, e, i) {
    qt.invalidate(Mt(t, e, i));
  },
  peek(t, e, i) {
    return qt.peek(Mt(t, e, i));
  },
  async save(t, e, i, r, a) {
    const s = {
      type: "ha_component_backend/profile/update",
      kind: e,
      profile_id: i,
      profile: r
    };
    Number.isFinite(Number(a)) && (s.expected_revision = Number(a));
    const n = await t.callWS(s);
    return qt.invalidate(Mt(t, e, i)), n;
  },
  subscribe(t, e, i, r) {
    Fr(t);
    const a = Mt(t, e, i);
    return qt.subscribe(a, r);
  }
}), Li = /* @__PURE__ */ new Map(), Vr = (t) => String(t).padStart(2, "0"), we = (t = /* @__PURE__ */ new Date()) => `${t.getFullYear()}-${Vr(t.getMonth() + 1)}-${Vr(t.getDate())}`, de = (t, e = /* @__PURE__ */ new Date()) => {
  const i = t?.config?.time_zone;
  if (!i) return we(e);
  try {
    const r = Object.fromEntries(
      new Intl.DateTimeFormat("en-AU", {
        timeZone: i,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(e).map((a) => [a.type, a.value])
    );
    return `${r.year}-${r.month}-${r.day}`;
  } catch {
    return we(e);
  }
}, Ca = (t, e = we()) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(t || ""));
  if (!i) return null;
  const r = new Date(
    Number(i[1]),
    Number(i[2]) - 1,
    Number(i[3])
  );
  return we(r) !== t || t > e ? null : t;
}, Ii = (t = "energy-day") => {
  const e = String(t || "energy-day");
  if (!Li.has(e)) {
    let i = null;
    try {
      i = sessionStorage.getItem(`ha-component-library:${e}`);
    } catch {
    }
    const r = Ca(i);
    Li.set(e, {
      value: r || we(),
      usesDefault: !r,
      subscribers: /* @__PURE__ */ new Set()
    });
  }
  return Li.get(e);
}, j = Object.freeze({
  get(t = "energy-day", e) {
    const i = Ii(t);
    return i.usesDefault && (i.value = de(e)), i.value;
  },
  set(t = "energy-day", e, i = {}) {
    const r = Ii(t), a = de(i.hass), s = Ca(e, a);
    if (!s || s === r.value) return r.value;
    r.value = s, r.usesDefault = !1;
    try {
      sessionStorage.setItem(`ha-component-library:${t}`, s);
    } catch {
    }
    const n = {
      channel: t,
      day: s,
      isToday: s === a
    };
    for (const c of [...r.subscribers]) c(n);
    return i.broadcast !== !1 && window.dispatchEvent(
      new CustomEvent("energy-day-selector-change", { detail: n })
    ), s;
  },
  subscribe(t = "energy-day", e, i = {}) {
    const r = Ii(t);
    return r.usesDefault && (r.value = de(i.hass)), r.subscribers.add(e), i.replay !== !1 && e({
      channel: t,
      day: r.value,
      isToday: r.value === de(i.hass)
    }), () => r.subscribers.delete(e);
  },
  today: de
}), Mi = /* @__PURE__ */ new Set(), je = (t, e, i) => `${dr(t)}|${e}|${i}`, he = na(
  async (t, e) => {
    if (!e?.hass?.callWS)
      throw new Error("Home Assistant WebSocket connection is unavailable");
    return e.hass.callWS({
      type: "ha_component_backend/energy/day",
      profile_id: e.profileId,
      day: e.day
    });
  },
  { ttl: 12e4, maxStale: 864e5, retryBase: 2500, retryMax: 6e4 }
), Je = Object.freeze({
  async get(t, e, i, r = {}) {
    const a = je(t, e, i);
    return Mi.add(a), he.read(a, { hass: t, profileId: e, day: i }, r);
  },
  invalidate(t, e, i) {
    he.invalidate(je(t, e, i));
  },
  invalidateProfile(t, e) {
    const i = `${dr(t)}|${e}|`;
    for (const r of Mi)
      r.startsWith(i) && he.invalidate(r);
  },
  peek(t, e, i) {
    return he.peek(je(t, e, i));
  },
  subscribe(t, e, i, r) {
    const a = je(t, e, i);
    return Mi.add(a), he.subscribe(a, r);
  }
}), Ue = /* @__PURE__ */ new Set(["unknown", "unavailable"]), Ai = (t) => [
  t?.translation_key,
  t?.unique_id,
  t?.entity_id,
  t?.platform
].filter(Boolean).join(" ").toLowerCase(), Be = (t, e) => e?.name || e?.original_name || (e?.entity_id ? t?.states?.[e.entity_id]?.attributes?.friendly_name : "") || e?.entity_id || "Control", Wr = (t) => {
  const e = Ai(t);
  return /record/.test(e) ? "Recording" : /detect|motion/.test(e) ? "Detection" : /alert|notification/.test(e) ? "Alerts" : /audio|sound/.test(e) ? "Audio" : null;
}, Ws = (t) => /(^|[_ :.-])(ptz|pan|tilt|zoom)([_ :.-]|$)/.test(
  Ai(t)
), Fe = (t) => {
  const e = Ai(t);
  return /trigger|operate|open|close/.test(e) ? "operate" : /restart|reboot/.test(e) ? "restart" : "action";
}, Gs = (t, e, i = {}) => {
  if (e?.error)
    return {
      error: e.error,
      cameras: [],
      entries: [],
      quickActions: [],
      attention: [],
      allClear: !1,
      onlineCameras: 0
    };
  const r = new Set(i.include_entities || []), a = new Set(i.exclude_entities || []), s = new Set(i.area_ids || []), n = (e?.entities || []).filter((m) => !m?.entity_id || m.disabled_by || m.hidden_by || !t?.states?.[m.entity_id] ? !1 : !a.has(m.entity_id)), c = n.filter((m) => {
    if (r.has(m.entity_id)) return !0;
    const _ = jt(m, e);
    return !s.size || (_ ? s.has(_) : !1);
  }), l = c.filter(
    (m) => !m.disabled_by && !m.hidden_by
  ), p = new Set(
    c.map((m) => m.device_id || m.entity_id)
  ), f = /* @__PURE__ */ new Map();
  for (const m of n) {
    const _ = m.device_id || m.entity_id, $ = f.get(_) || [];
    $.push(m), f.set(_, $);
  }
  const g = [];
  for (const [m, _] of f) {
    if (!p.has(m)) continue;
    const $ = _.filter(
      (D) => O(D.entity_id) === "camera" && !D.disabled_by && !D.hidden_by
    );
    if (!$.length) continue;
    $.sort((D, Y) => {
      const ut = (yt) => {
        const ce = t.states[yt.entity_id];
        return (r.has(yt.entity_id) ? 100 : 0) + (ce?.attributes?.entity_picture ? 20 : 0) + (ce?.attributes?.frontend_stream_type ? 10 : 0);
      };
      return ut(Y) - ut(D) || String(D.unique_id || D.entity_id).localeCompare(
        String(Y.unique_id || Y.entity_id)
      );
    });
    const v = $[0], z = t.states[v.entity_id], N = (e?.devices || []).find((D) => D.id === v.device_id) || {}, L = jt(v, e), M = (L ? e?.areaMap?.get(L)?.name : "") || "", C = _.filter(
      (D) => O(D.entity_id) === "switch" && Wr(D)
    ).map((D) => ({ entity: D, role: Wr(D) })), H = _.filter((D) => {
      if (O(D.entity_id) !== "binary_sensor") return !1;
      const Y = t.states[D.entity_id]?.attributes?.device_class || "";
      return /^(motion|occupancy|presence|sound)$/.test(Y) || /detect|motion|person|human/.test(Ai(D));
    }), G = _.filter((D) => O(D.entity_id) === "image").map((D) => {
      const Y = Be(t, D), ut = String(
        N.name_by_user || N.name || ""
      ).trim(), yt = ut && Y.toLowerCase().startsWith(`${ut.toLowerCase()} `) ? Y.slice(ut.length).trim() : Y;
      return { entity: D, name: yt };
    }), R = _.filter(
      (D) => O(D.entity_id) === "button" && Fe(D) !== "action"
    ).map((D) => ({ entity: D, role: Fe(D) })), V = _.filter(
      (D) => ["button", "number", "select"].includes(O(D.entity_id)) && Ws(D)
    ), W = i.mappings?.[`camera_stream:${v.entity_id}`] || i.mappings?.[`camera_stream:${m}`] || null, Pt = W ? t.states[W] : null, Ht = (Pt && !Ue.has(String(Pt.state).toLowerCase()) ? W : v.entity_id) || v.entity_id, Me = !!(z && !Ue.has(String(z.state).toLowerCase())), rt = H.some(
      (D) => t.states[D.entity_id]?.state === "on"
    );
    g.push({
      id: m,
      deviceId: v.device_id || null,
      entityId: v.entity_id,
      entities: $.map((D) => D.entity_id),
      name: String(N.name_by_user || N.name || "").trim() || M || Be(t, v),
      areaId: L,
      areaName: M,
      online: Me,
      active: rt,
      streamEntityId: Ht,
      switches: C,
      detections: H,
      classifications: G,
      actions: R,
      ptz: V
    });
  }
  g.sort(
    (m, _) => m.name.localeCompare(_.name, void 0, { sensitivity: "base" })
  );
  const d = [];
  for (const m of l) {
    const _ = O(m.entity_id), $ = t.states[m.entity_id], v = $?.attributes?.device_class || "";
    if (!(_ === "binary_sensor" && /^(door|window|garage_door|opening)$/.test(v) || _ === "lock" || _ === "cover" && /^(door|garage)$/.test(v))) continue;
    const L = m.device_id ? f.get(m.device_id) || [] : [], C = i.mappings?.[`entry_control:${m.entity_id}`] || L.filter((G) => O(G.entity_id) === "button").sort(
      (G, R) => (Fe(G) === "operate" ? -1 : 1) - (Fe(R) === "operate" ? -1 : 1)
    )[0]?.entity_id || null, H = _ === "lock" ? $.state === "unlocked" : /^(on|open|opening)$/.test($.state);
    d.push({
      entityId: m.entity_id,
      deviceId: m.device_id || null,
      controlEntityId: C,
      domain: _,
      deviceClass: v,
      name: Be(t, m),
      state: $.state,
      open: H,
      available: !Ue.has(String($.state).toLowerCase()),
      areaId: jt(m, e)
    });
  }
  d.sort(
    (m, _) => m.name.localeCompare(_.name, void 0, { sensitivity: "base" })
  );
  const u = /* @__PURE__ */ new Map([
    ["automation", "trigger"],
    ["scene", "turn_on"],
    ["script", "turn_on"]
  ]), h = Object.entries(
    i.mappings || {}
  ).flatMap(([m, _]) => {
    if (!m.startsWith("quick_action:")) return [];
    const $ = O(_), v = u.get($), z = t?.states?.[_];
    if (!v || !z) return [];
    const N = (e?.entities || []).find(
      (L) => L.entity_id === _
    ) || {
      entity_id: _
    };
    return [
      {
        id: m.slice(13),
        entityId: _,
        domain: $,
        service: v,
        name: Be(t, N),
        icon: z.attributes?.icon || ($ === "script" ? "mdi:script-text-outline" : $ === "scene" ? "mdi:palette-outline" : "mdi:robot-outline"),
        available: !Ue.has(String(z.state).toLowerCase())
      }
    ];
  });
  h.sort(
    (m, _) => m.name.localeCompare(_.name, void 0, { sensitivity: "base" })
  );
  const b = [
    ...g.filter((m) => !m.online).map((m) => ({
      type: "camera-offline",
      label: `${m.name} unavailable`,
      entityId: m.entityId
    })),
    ...g.filter((m) => m.active).map((m) => ({
      type: "camera-activity",
      label: `${m.name} activity`,
      entityId: m.entityId
    })),
    ...d.filter((m) => m.available && m.open).map((m) => ({
      type: "entry-open",
      label: `${m.name} open`,
      entityId: m.entityId
    }))
  ];
  return {
    error: null,
    cameras: g,
    entries: d,
    quickActions: h,
    attention: b,
    allClear: b.length === 0,
    onlineCameras: g.filter((m) => m.online).length
  };
}, Pe = async (t, e = "household-security", i = {}) => {
  const [r, a] = await Promise.all([
    Vs.get(t, "security", e, i).catch((n) => ({ found: !1, profile: null, error: n })),
    I.load(t)
  ]);
  return r?.found ? {
    ...Gs(t, a, r.profile || {}),
    profile: r?.profile || null,
    profileMissing: !r?.found,
    profileError: r?.error || null
  } : {
    error: r?.error || new Error(`Security profile ${e} is not configured`),
    cameras: [],
    entries: [],
    quickActions: [],
    attention: [],
    allClear: !1,
    onlineCameras: 0,
    profile: null,
    profileMissing: !0,
    profileError: r?.error || null
  };
}, qi = O, Gr = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]), Sa = (t) => String(
  t?.original_name || t?.name || t?.entity_id || ""
).toLowerCase();
let Kr = !1;
const Ks = () => {
  Kr || (Kr = !0, pa((t) => t?.platform !== "wled" ? !0 : O(t.entity_id) !== "light" ? !1 : Sa(t) === "main" || !/_\d+$/.test(String(t.unique_id || ""))), _a((t) => t?.platform !== "wled" || O(t.entity_id) !== "light" ? null : {
    type: "custom:component-wled-controller-v1",
    entity: t.entity_id,
    device_id: t.device_id
  }), I.refresh());
};
Ks();
const Ys = [
  T,
  P,
  F,
  q,
  se,
  y`
    .wrap {
      padding: 10px 14px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      min-height: 44px;
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--primary-color);
      flex-shrink: 0;
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .action {
      min-height: 32px;
      padding: 0 10px;
      border-radius: var(--dashboard-radius-control);
      border: var(--dashboard-card-border);
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-color);
      font-size: 11.5px;
      font-weight: 650;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    .action:hover {
      background: var(--dashboard-active-surface);
    }
    .demo-static {
      width: 100%;
      border: 0;
      background: transparent;
      text-align: inherit;
      padding: 0;
    }
  `
];
var Qs = Object.getOwnPropertyDescriptor, Zs = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Qs(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Js = {
  type: "custom:component-action-v2",
  title: "Action title",
  description: "What this action will do",
  action_text: "Open",
  icon: "mdi:gesture-tap-button",
  navigation_path: null,
  entity: null,
  more_info_entity: null
};
let Xe = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Js, ...t });
  }
  getCardSize() {
    return 2;
  }
  _getActions() {
    if (!this._config) return { primary: null, hold: null };
    const t = this._config.more_info_entity || this._config.entity || null, e = this._config.navigation_path || null;
    return {
      primary: e ? () => this.navigate(e) : t ? () => this.moreInfo(t) : null,
      hold: e && t ? () => this.moreInfo(t) : null
    };
  }
  updated() {
    const t = this._getActions(), e = this.renderRoot.querySelector(
      "button.demo"
    );
    t.primary && e ? (this._interactionHandle?.destroy(), this._interactionHandle = S(e, {
      primary: t.primary,
      hold: t.hold || void 0,
      optimistic: !1,
      repeat: !1,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getActions(), e = o`
      <div class="wrap">
        <span class="icon">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
        </span>
        <span>
          <div class="title">${this.esc(this._config.title)}</div>
          <div class="desc">${this.esc(this._config.description)}</div>
        </span>
        <span class="action">${this.esc(this._config.action_text)}</span>
      </div>
    `;
    return o`
      <ha-card>
        ${t.primary ? o`<button class="demo" type="button">${e}</button>` : o`<div class="demo-static">${e}</div>`}
      </ha-card>
    `;
  }
};
Xe.styles = Ys;
Xe = Zs([
  k("component-action-v2")
], Xe);
E({
  type: "component-action-v2",
  element: Xe,
  name: "Action Card",
  description: "Reusable navigation and more-info action card."
});
const Xs = [
  T,
  P,
  y`
    button {
      appearance: none;
      width: 100%;
      min-height: 44px;
      box-sizing: border-box;
      border: 0;
      background: transparent;
      font: inherit;
      padding: 10px 14px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      cursor: pointer;
      font-size: 12px;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      color: inherit;
    }
    button:active {
      transform: scale(0.997);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--dashboard-radius-card);
    }
    .phase {
      color: var(--primary-text-color);
      font-weight: 600;
      text-align: left;
      justify-self: start;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .event {
      color: var(--secondary-text-color);
      text-align: right;
      justify-self: end;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .mid {
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      min-width: 0;
      color: var(--secondary-text-color);
    }
    .item {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .lab {
      font-weight: 400;
    }
    .val {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    @media (max-width: 900px) {
      button {
        gap: 10px;
        padding: 10px 12px;
      }
      .mid {
        gap: 10px;
      }
    }
    @media (max-width: 650px) {
      button {
        gap: 6px;
        padding: 8px 10px;
      }
      .mid {
        gap: 7px;
      }
    }
  `
];
var tn = Object.getOwnPropertyDescriptor, en = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? tn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const rn = {
  type: "custom:component-context-strip-v3",
  left_text: "Left context",
  center_1_label: "Primary metric",
  center_1_value: "00%",
  center_2_label: "Secondary metric",
  center_2_value: "00%",
  center_3_label: "Tertiary metric",
  center_3_value: "00%",
  right_text: "Right context",
  navigation_path: null,
  entity: null
};
let ti = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...rn, ...t });
  }
  getCardSize() {
    return 1;
  }
  _getAction() {
    if (!this._config) return null;
    const t = this._config.navigation_path;
    if (t) return () => this.navigate(t);
    const e = this._config.entity;
    return e ? () => this.moreInfo(e) : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector("button");
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = S(e, {
      primary: t,
      optimistic: !1,
      repeat: !1,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = [1, 2, 3].map((a) => {
      const s = this._config[`center_${a}_label`], n = this._config[`center_${a}_value`];
      return o`
        <span class="item">
          <span class="lab">${this.esc(s)}</span>
          <span class="val">${this.esc(n)}</span>
        </span>
      `;
    }), i = o`
      <span class="phase">${this.esc(this._config.left_text)}</span>
      <span class="mid">${e}</span>
      <span class="event">${this.esc(this._config.right_text)}</span>
    `, r = `${this._config.left_text || ""}. ${[1, 2, 3].map((a) => `${this._config[`center_${a}_label`] || ""}: ${this._config[`center_${a}_value`] || ""}`).join(", ")}. ${this._config.right_text || ""}`;
    return o`
      <ha-card>
        ${t ? o`<button type="button" aria-label="${this.esc(r)}">${i}</button>` : o`<div class="context-static" aria-label="${this.esc(r)}">${i}</div>`}
      </ha-card>
    `;
  }
};
ti.styles = Xs;
ti = en([
  k("component-context-strip-v3")
], ti);
E({
  type: "component-context-strip-v3",
  element: ti,
  name: "Context Strip",
  description: "Reusable context and metric strip component."
});
const an = [
  T,
  q,
  P,
  y`
    .wrap {
      padding: 14px 16px;
      min-height: 64px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
    }
  `
];
var sn = Object.getOwnPropertyDescriptor, Aa = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? sn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const nn = {
  type: "custom:component-empty-state-v3",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let ei = class extends A {
  setConfig(t) {
    super.setConfig({ ...nn, ...t });
  }
  getCardSize() {
    return 1;
  }
  render() {
    return this._config ? o`
      <ha-card>
        <div class="wrap">
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <span>
            <div class="title">${this.esc(this._config.title)}</div>
            <div class="desc">${this.esc(this._config.message)}</div>
          </span>
        </div>
      </ha-card>
    ` : o``;
  }
};
ei.styles = an;
ei = Aa([
  k("component-empty-state-v3")
], ei);
E({
  type: "component-empty-state-v3",
  element: ei,
  name: "Empty State",
  description: "Reusable empty-state component."
});
const on = {
  type: "custom:component-empty-state-v2",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let ii = class extends A {
  setConfig(t) {
    super.setConfig({ ...on, ...t });
  }
  getCardSize() {
    return 1;
  }
  render() {
    return this._config ? o`
      <ha-card>
        <div class="wrap">
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <span>
            <div class="title">${this.esc(this._config.title)}</div>
            <div class="desc">${this.esc(this._config.message)}</div>
          </span>
        </div>
      </ha-card>
    ` : o``;
  }
};
ii.styles = [
  or,
  y`
      ha-card {
        border: 0;
        background: transparent;
        box-shadow: none;
      }
      .wrap {
        min-height: 40px;
        padding: 0 2px;
        display: grid;
        grid-template-columns: 24px minmax(0, 1fr);
        align-items: center;
        gap: 8px;
      }
      .icon {
        width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        background: transparent;
        color: var(--primary-color);
      }
      .icon ha-icon {
        --mdc-icon-size: 18px;
      }
      .desc {
        margin-top: 1px;
        font-size: 12px;
        line-height: 1.3;
      }
    `
];
ii = Aa([
  k("component-empty-state-v2")
], ii);
E({
  type: "component-empty-state-v2",
  element: ii,
  name: "Empty State V2",
  description: "Reusable compact empty-state component."
});
const cn = [
  T,
  P,
  se,
  y`
    .wrap {
      padding: 4px 14px;
    }
    .row {
      appearance: none;
      width: 100%;
      border: 0;
      border-top: 1px solid var(--divider-color);
      background: transparent;
      color: inherit;
      font: inherit;
      min-height: 48px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
      text-align: left;
      cursor: pointer;
    }
    .row:first-child {
      border-top: 0;
    }
    .row:active {
      background: var(--dashboard-card-muted-surface);
    }
    .row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--dashboard-radius-control);
    }
    .title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .metric {
      text-align: right;
      white-space: nowrap;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .metric b {
      font-size: 13px;
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
      margin-right: 4px;
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 4px 12px;
      }
    }
    .row:not(button) {
      cursor: default;
    }
    .row:not(button):active {
      background: transparent;
    }
    .row:not(button):focus-visible {
      outline: none;
    }
  `
];
var ln = Object.getOwnPropertyDescriptor, dn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? ln(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const hn = {
  type: "custom:component-list-v2",
  rows: [
    {
      title: "First item",
      description: "Supporting detail",
      value: "00",
      label: "Metric"
    },
    {
      title: "Second item",
      description: "Supporting detail",
      value: "00",
      label: "Metric"
    },
    {
      title: "Third item",
      description: "Supporting detail",
      value: "00",
      label: "Metric"
    }
  ],
  interactive: !0
};
let ri = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...hn, ...t });
  }
  getCardSize() {
    return 3;
  }
  _getRowActions(t) {
    if (!this._config || this._config.interactive === !1)
      return { primary: null, hold: null };
    const e = typeof t.action == "function" ? () => t.action({ host: this, hass: this.hass, row: t }) : null, i = t.navigation_path || t.path || null, r = t.entity || t.more_info_entity || null;
    return {
      primary: e || (i ? () => this.navigate(i) : r ? () => this.moreInfo(r) : null),
      hold: !e && i && r ? () => this.moreInfo(r) : null
    };
  }
  updated() {
    for (const i of this._interactionHandles) i.destroy();
    this._interactionHandles = [];
    const t = Array.isArray(this._config?.rows) ? this._config.rows.slice(0, 6) : [];
    this.renderRoot.querySelectorAll("button.row").forEach((i) => {
      const r = Number(i.dataset.index), a = t[r];
      if (a) {
        const s = this._getRowActions(a);
        s.primary && this._interactionHandles.push(
          S(i, {
            primary: s.primary,
            hold: s.hold || void 0,
            feedback: !0
          })
        );
      }
    });
  }
  disconnectedCallback() {
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = Array.isArray(this._config.rows) ? this._config.rows.slice(0, 6) : [];
    return o`
      <ha-card>
        <div class="wrap">
          ${t.map((e, i) => {
      const r = this._getRowActions(e), a = e.entity ? this.hass?.states[e.entity] : null, s = e.title || "Item", n = a && s.startsWith("Item") ? vt({ state: a }) : s, c = a && (e.value === "00" || !e.value) ? K(a, this.hass) : e.value || "", l = `${n}: ${c} ${e.label || ""}${e.description ? `. ${e.description}` : ""}`, p = o`
              <span>
                <div class="title">${this.esc(n)}</div>
                <div class="desc">${this.esc(e.description)}</div>
              </span>
              <span class="metric">
                <b>${this.esc(c)}</b>${this.esc(e.label)}
              </span>
            `;
      return r.primary ? o`
                  <button class="row" data-index="${i}" type="button" aria-label="${this.esc(l)}">
                    ${p}
                  </button>
                ` : o`<div class="row" data-index="${i}" aria-label="${this.esc(l)}">${p}</div>`;
    })}
        </div>
      </ha-card>
    `;
  }
};
ri.styles = cn;
ri = dn([
  k("component-list-v2")
], ri);
E({
  type: "component-list-v2",
  element: ri,
  name: "List / Ranking",
  description: "Reusable list and ranking component."
});
const pn = [
  T,
  bs,
  y`
    .wrap {
      padding: 12px 14px;
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr);
      align-items: flex-start;
      gap: 10px;
      min-height: 48px;
      font-size: 12.5px;
      line-height: 1.35;
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .wrap.warning {
      background: var(--dashboard-warning-surface);
      border: 1px solid var(--warning-color);
      color: var(--warning-color);
    }
    .wrap.error,
    .wrap.critical {
      background: var(--dashboard-critical-surface);
      border: 1px solid var(--error-color);
      color: var(--error-color);
    }
    .wrap.success {
      background: color-mix(
        in srgb,
        var(--success-color) 10%,
        var(--card-background-color)
      );
      border: 1px solid var(--success-color);
      color: var(--success-color);
    }
    .icon {
      display: grid;
      place-items: center;
      color: inherit;
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
    }
    .message {
      margin-top: 2px;
      font-size: 12px;
      line-height: 1.25;
      color: inherit;
      opacity: 0.9;
    }
    .wrap.actionable {
      cursor: pointer;
    }
    .wrap.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `
];
var un = Object.getOwnPropertyDescriptor, mn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? un(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const fn = {
  type: "custom:component-notice-v2",
  title: "Notice title",
  message: "Important supporting information appears here.",
  tone: "info",
  icon: "mdi:information-outline",
  entity: null,
  navigation_path: null
};
let ai = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...fn, ...t });
  }
  getCardSize() {
    return 2;
  }
  _getAction() {
    return this._config ? this._config.navigation_path ? () => this.navigate(this._config?.navigation_path) : this._config.entity ? () => this.moreInfo(this._config?.entity) : null : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector(".wrap");
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = S(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = ["warning", "error", "success"].includes(
      this._config.tone || ""
    ) ? this._config.tone : "", r = e && this._config.title === "Notice title" ? vt({ state: e }) : this._config.title || "Notice title", a = e && this._config.message === "Important supporting information appears here." ? K(e, this.hass) : this._config.message || "", s = `${r}${a ? `: ${a}` : ""}`;
    return o`
      <ha-card>
        <div
          class="wrap ${i} ${t ? "actionable" : ""}"
          role="${t ? "button" : "region"}"
          tabindex="${t ? "0" : "-1"}"
          aria-label="${this.esc(s)}"
        >
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <div>
            <div class="title">${this.esc(r)}</div>
            ${a ? o`<div class="message">${this.esc(a)}</div>` : ""}
          </div>
        </div>
      </ha-card>
    `;
  }
};
ai.styles = pn;
ai = mn([
  k("component-notice-v2")
], ai);
E({
  type: "component-notice-v2",
  element: ai,
  name: "Alert / Notice",
  description: "Reusable alert and notice component."
});
const gn = [
  T,
  P,
  pt,
  y`
    .wrap {
      padding: 12px 14px;
      min-height: 56px;
    }
    .head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
    }
    .value {
      font-size: 20px;
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
    .label {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .target {
      text-align: right;
      font-size: 11.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .target b {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .track {
      height: 5px;
      margin-top: 8px;
      border-radius: 999px;
      background: var(--divider-color);
      overflow: hidden;
    }
    .fill {
      height: 100%;
      border-radius: inherit;
      background: var(--primary-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
    }
    .wrap.actionable {
      cursor: pointer;
    }
    .wrap.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }
  `
];
var bn = Object.getOwnPropertyDescriptor, _n = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? bn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const vn = {
  type: "custom:component-progress-v2",
  value: "68%",
  label: "Progress metric",
  progress: 68,
  target_value: "100%",
  target_label: "Target",
  entity: null,
  navigation_path: null
};
let si = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...vn, ...t });
  }
  getCardSize() {
    return 2;
  }
  _getAction() {
    return this._config ? this._config.navigation_path ? () => this.navigate(this._config?.navigation_path) : this._config.entity ? () => this.moreInfo(this._config?.entity) : null : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector(".wrap");
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = S(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e && this._config.label === "Progress metric" ? vt({ state: e }) : this._config.label || "Progress metric", r = e && this._config.value === "68%" ? K(e, this.hass) : this._config.value || "68%";
    let a = Math.min(100, Math.max(0, Number(this._config.progress) || 0));
    if (e && this._config.progress === 68) {
      const n = parseFloat(e.state);
      isNaN(n) || (a = Math.min(100, Math.max(0, n)));
    }
    const s = `${i}: ${r}. ${this._config.target_label || "Target"}: ${this._config.target_value || "100%"}`;
    return o`
      <ha-card>
        <div
          class="wrap ${t ? "actionable" : ""}"
          role="${t ? "button" : "region"}"
          tabindex="${t ? "0" : "-1"}"
          aria-label="${this.esc(s)}"
        >
          <div class="head">
            <div>
              <div class="value">${this.esc(r)}</div>
              <div class="label">${this.esc(i)}</div>
            </div>
            <div class="target">
              <b>${this.esc(this._config.target_value)}</b>
              ${this.esc(this._config.target_label)}
            </div>
          </div>
          <div
            class="track"
            role="progressbar"
            aria-valuenow="${a}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="${this.esc(i)}"
          >
            <div class="fill" style="width:${a}%"></div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
si.styles = gn;
si = _n([
  k("component-progress-v2")
], si);
E({
  type: "component-progress-v2",
  element: si,
  name: "Progress / Target",
  description: "Reusable progress and target component."
});
const yn = [
  T,
  sr,
  y`
    ha-card {
      background: transparent;
      border: 0;
      box-shadow: none;
    }
    .wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 6px 0;
      padding: 0 2px;
    }
    .wrap ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 14px;
    }
    .label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 650;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
    }
    .line {
      flex: 1;
      height: 1px;
      background: var(--divider-color);
    }
  `
];
var xn = Object.getOwnPropertyDescriptor, wn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? xn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
let ni = class extends A {
  setConfig(t) {
    const e = t?.title || t?.label || t?.text || "Section label";
    super.setConfig({
      icon: "mdi:gesture-tap-button",
      ...t,
      type: "custom:component-section-separator-v2",
      title: e
    });
  }
  getCardSize() {
    return 1;
  }
  shouldUpdate(t) {
    return t.size === 1 && t.has("hass") ? !1 : super.shouldUpdate(t);
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.title || this._config.label || this._config.text || "Section label";
    return o`
      <ha-card>
        <div class="wrap">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          <span class="label">${this.esc(t)}</span>
          <span class="line"></span>
        </div>
      </ha-card>
    `;
  }
};
ni.styles = yn;
ni = wn([
  k("component-section-separator-v2")
], ni);
E({
  type: "component-section-separator-v2",
  element: ni,
  name: "Section Separator",
  description: "Reusable section separator component."
});
const $n = [
  T,
  P,
  y`
    .wrap {
      padding: 12px 14px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      min-height: 56px;
    }
    .value {
      font-size: 20px;
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
      white-space: nowrap;
    }
    .label {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support {
      text-align: right;
      font-size: 11.5px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support b {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
    }
    .demo-static {
      width: 100%;
      border: 0;
      background: transparent;
      text-align: inherit;
      padding: 0;
    }
  `
];
var kn = Object.getOwnPropertyDescriptor, Cn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? kn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Sn = {
  type: "custom:component-single-kpi-v2",
  value: "00",
  label: "Primary metric",
  support_value: "00",
  support_label: "Supporting context",
  interactive: !0,
  entity: null,
  navigation_path: null
};
let oi = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Sn, ...t });
  }
  getCardSize() {
    return 2;
  }
  _getAction() {
    return !this._config || this._config.interactive === !1 ? null : this._config.navigation_path ? () => this.navigate(this._config?.navigation_path) : this._config.entity ? () => this.moreInfo(this._config?.entity) : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector(
      "button.demo"
    );
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = S(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  connectedCallback() {
    super.connectedCallback(), this.requestUpdate();
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  shouldUpdate(t) {
    return this._config?.entity ? super.shouldUpdate(t) : t.size === 1 && t.has("hass") ? !1 : super.shouldUpdate(t);
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e && this._config.value === "00" ? K(e, this.hass) : this._config.value || "00", r = e && this._config.label === "Primary metric" ? vt({ state: e }) : this._config.label || "Primary metric", a = this._config.support_value || "", s = this._config.support_label || "", n = `${r}: ${i}${a || s ? `. ${a} ${s}` : ""}`, c = o`
      <div class="wrap">
        <div>
          <div class="value">${this.esc(i)}</div>
          <div class="label">${this.esc(r)}</div>
        </div>
        ${a || s ? o`
                <div class="support">
                  <b>${this.esc(a)}</b>
                  ${this.esc(s)}
                </div>
              ` : ""}
      </div>
    `;
    return o`
      <ha-card>
        ${t ? o`<button class="demo" type="button" aria-label="${this.esc(n)}">${c}</button>` : o`<div class="demo-static">${c}</div>`}
      </ha-card>
    `;
  }
};
oi.styles = $n;
oi = Cn([
  k("component-single-kpi-v2")
], oi);
E({
  type: "component-single-kpi-v2",
  element: oi,
  name: "Single KPI",
  description: "Reusable single KPI component."
});
const An = [
  T,
  P,
  q,
  se,
  y`
    .wrap {
      padding: 10px 14px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      min-height: 44px;
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--primary-color);
      flex-shrink: 0;
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status {
      text-align: right;
      white-space: nowrap;
    }
    .status b {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .status span {
      display: block;
      margin-top: 2px;
      font-size: 11.5px;
      color: var(--secondary-text-color);
    }
    .demo-static {
      width: 100%;
      border: 0;
      background: transparent;
      text-align: inherit;
      padding: 0;
    }
  `
];
var En = Object.getOwnPropertyDescriptor, zn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? En(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Tn = {
  type: "custom:component-status-row-v2",
  title: "Status title",
  description: "Supporting description",
  status_value: "Active",
  status_label: "Current state",
  icon: "mdi:information-outline",
  interactive: !0,
  entity: null,
  navigation_path: null
};
let ci = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Tn, ...t });
  }
  getCardSize() {
    return 2;
  }
  _getAction() {
    return !this._config || this._config.interactive === !1 ? null : this._config.navigation_path ? () => this.navigate(this._config?.navigation_path) : this._config.entity ? () => this.moreInfo(this._config?.entity) : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector(
      "button.demo"
    );
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = S(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e ? ot(e) : !1, r = this._config.entity ? it(this._config.entity) : "", a = e && this._config.title === "Status title" ? vt({ state: e }) : this._config.title || "Status title", s = e && this._config.status_value === "Active" ? i ? "Unavailable" : K(e, this.hass) : this._config.status_value || "Active", n = e && this._config.icon === "mdi:information-outline" ? e.attributes.icon || ne(r, e.state) : this._config.icon || "mdi:information-outline", c = this._config.description || "", l = this._config.status_label || "", p = `${a}: ${s}${l ? ` (${l})` : ""}${c ? `. ${c}` : ""}`, f = o`
      <div class="wrap ${i ? "unavailable" : ""}">
        <span class="icon">
          <ha-icon icon="${this.esc(n)}"></ha-icon>
        </span>
        <div>
          <div class="title">${this.esc(a)}</div>
          ${c ? o`<div class="desc">${this.esc(c)}</div>` : ""}
        </div>
        <div class="status">
          <b>${this.esc(s)}</b>
          ${l ? o`<span>${this.esc(l)}</span>` : ""}
        </div>
      </div>
    `;
    return o`
      <ha-card>
        ${t ? o`<button class="demo" type="button" aria-label="${this.esc(p)}" aria-disabled="${String(i)}">${f}</button>` : o`<div class="demo-static">${f}</div>`}
      </ha-card>
    `;
  }
};
ci.styles = An;
ci = zn([
  k("component-status-row-v2")
], ci);
E({
  type: "component-status-row-v2",
  element: ci,
  name: "Status Row",
  description: "Reusable status row component."
});
const Dn = [
  T,
  P,
  q,
  y`
    .row {
      min-height: 64px;
      padding: 12px 14px;
      display: grid;
      align-items: center;
      gap: 12px;
    }
    .row.has-icon {
      grid-template-columns: 40px minmax(0, 1fr);
    }
    .row:not(.has-icon) {
      grid-template-columns: minmax(0, 1fr);
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .title {
      position: relative;
      display: inline-block;
      max-width: 100%;
      font-size: 13px;
      line-height: 1.25;
      font-weight: 650;
      letter-spacing: -0.005em;
      white-space: nowrap;
      color: var(--primary-text-color);
    }
    .base {
      position: relative;
      z-index: 2;
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .stamp .title {
      padding-bottom: 4px;
    }
    .stamp .title:after {
      content: "";
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      border-radius: 999px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        var(--primary-color) 45%,
        var(--primary-color) 55%,
        transparent 100%
      );
      background-size: 220% 100%;
      animation: stampSweep var(--effect-speed, 2.6s) cubic-bezier(0.4, 0, 0.2, 1)
        infinite;
    }
    .typewave .title:after {
      content: attr(data-text);
      position: absolute;
      z-index: 3;
      inset: 0;
      color: var(--primary-color);
      clip-path: inset(0 100% 0 0);
      animation: textSweep var(--effect-speed, 2.6s) cubic-bezier(0.4, 0, 0.2, 1)
        infinite;
      pointer-events: none;
    }
    .overprint .title:after {
      content: attr(data-text);
      position: absolute;
      z-index: 1;
      inset: 0;
      color: var(--primary-color);
      opacity: 0;
      filter: blur(0.15px);
      animation: softPrint var(--effect-speed, 2.6s) ease-in-out infinite;
      pointer-events: none;
    }
    .signal .title {
      padding-left: 16px;
    }
    .signal .title:before {
      content: "";
      position: absolute;
      left: 1px;
      top: 50%;
      width: 7px;
      height: 7px;
      margin-top: -3.5px;
      border: 1.5px solid var(--primary-color);
      border-radius: 2px;
      transform: rotate(45deg);
      animation: signalPulse var(--effect-speed, 2.4s) infinite;
    }
    .signal .title:after {
      content: "";
      position: absolute;
      left: 3.5px;
      top: 50%;
      width: 2.5px;
      height: 2.5px;
      margin-top: -1.25px;
      border-radius: 50%;
      background: var(--primary-color);
    }
    .rainbow_stamp .title {
      padding-bottom: 4px;
      background: linear-gradient(
        90deg,
        #ff375f,
        #ff9f0a,
        #ffd60a,
        #30d158,
        #64d2ff,
        #0a84ff,
        #bf5af2,
        #ff375f
      );
      background-size: 200% auto;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: rainbowSweep var(--effect-speed, 2.6s) linear infinite;
    }
    .rainbow_stamp .title:after {
      content: "";
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      border-radius: 999px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        #0a84ff 35%,
        #bf5af2 65%,
        transparent 100%
      );
      background-size: 220% 100%;
      opacity: 0.85;
      animation: stampSweep var(--effect-speed, 2.6s) cubic-bezier(0.4, 0, 0.2, 1)
        infinite;
    }
    .gold_stamp .title {
      padding-bottom: 4px;
      background: linear-gradient(
        90deg,
        #f6d365 0%,
        #fda085 50%,
        #f6d365 100%
      );
      background-size: 200% auto;
      color: transparent;
      -webkit-background-clip: text;
      background-clip: text;
      animation: goldShift var(--effect-speed, 2.6s) ease infinite;
    }
    .gold_stamp .title:after {
      content: "";
      position: absolute;
      z-index: 1;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      border-radius: 999px;
      background: linear-gradient(
        90deg,
        transparent 0%,
        #f6d365 42%,
        #fda085 58%,
        transparent 100%
      );
      background-size: 220% 100%;
      opacity: 0.8;
      animation: stampSweep var(--effect-speed, 2.6s) cubic-bezier(0.4, 0, 0.2, 1)
        infinite;
    }

    @keyframes stampSweep {
      0% {
        background-position: 210% 0;
        opacity: 0;
      }
      45% {
        opacity: 0.8;
      }
      100% {
        background-position: -110% 0;
        opacity: 0;
      }
    }
    @keyframes textSweep {
      0% {
        clip-path: inset(0 100% 0 0);
        opacity: 0;
      }
      15% {
        opacity: 1;
      }
      85% {
        clip-path: inset(0 0 0 0);
        opacity: 1;
      }
      100% {
        clip-path: inset(0 0 0 0);
        opacity: 0;
      }
    }
    @keyframes softPrint {
      0%,
      100% {
        opacity: 0;
        transform: translateY(0);
      }
      50% {
        opacity: 0.9;
        transform: translateY(-0.5px);
      }
    }
    @keyframes signalPulse {
      0%,
      100% {
        opacity: 0.3;
        transform: rotate(45deg) scale(0.85);
      }
      50% {
        opacity: 0.85;
        transform: rotate(45deg) scale(1.1);
      }
    }
    @keyframes rainbowSweep {
      to {
        background-position: 200% center;
      }
    }
    @keyframes goldShift {
      0%,
      100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }
  `
];
var On = Object.getOwnPropertyDescriptor, Pn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? On(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Hn = {
  type: "custom:component-text-effect-v1",
  effect: "stamp",
  description: "",
  icon: null,
  speed: 2.6
};
let li = class extends A {
  constructor() {
    super(...arguments), this._settleTimer = null;
  }
  setConfig(t) {
    if (!t?.text)
      throw new Error("text is required");
    super.setConfig({ ...Hn, ...t });
  }
  getCardSize() {
    return 1;
  }
  updated() {
    this._settleTimer && clearTimeout(this._settleTimer);
    const t = Math.max(
      1.6,
      Math.min(6, Number(this._config?.speed) || 2.6)
    ), e = this.renderRoot.querySelector(".row");
    this._settleTimer = setTimeout(
      () => {
        this._settleTimer = null, e?.classList.add("settled");
      },
      Math.round(t * 1e3) + 80
    );
  }
  disconnectedCallback() {
    this._settleTimer && clearTimeout(this._settleTimer), this._settleTimer = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = [
      "stamp",
      "typewave",
      "overprint",
      "signal",
      "rainbow_stamp"
    ].includes(this._config.effect || "") ? this._config.effect : "stamp", e = Math.max(1.6, Math.min(6, Number(this._config.speed) || 2.6)), i = this._config.text;
    return o`
      <ha-card style="--effect-speed: ${e}s">
        <div class="row ${t} ${this._config.icon ? "has-icon" : ""}">
          ${this._config.icon ? o`
                  <span class="icon">
                    <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
                  </span>
                ` : ""}
          <div class="copy">
            <div class="title" data-text="${this.esc(i)}">
              <span class="base">${this.esc(i)}</span>
            </div>
            ${this._config.description ? o`<div class="desc">
                    ${this.esc(this._config.description)}
                  </div>` : ""}
          </div>
        </div>
      </ha-card>
    `;
  }
};
li.styles = Dn;
li = Pn([
  k("component-text-effect-v1")
], li);
E({
  type: "component-text-effect-v1",
  element: li,
  name: "Signature Text Effect",
  description: "Reusable transient-status effects using the existing signature motion language."
});
const Nn = [
  T,
  P,
  y`
    .wrap {
      padding: 12px 14px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      min-height: 56px;
      align-items: center;
    }
    .stat {
      appearance: none;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      padding: 0;
      text-align: center;
      min-width: 0;
      cursor: pointer;
    }
    .stat:first-child {
      text-align: left;
    }
    .stat:last-child {
      text-align: right;
    }
    .stat:active {
      transform: scale(0.98);
    }
    .stat:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }
    .value {
      font-size: 16px;
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
    }
    .stat:not(button) {
      cursor: default;
    }
    .stat:not(button):active {
      transform: none;
    }
    .stat:not(button):focus-visible {
      outline: none;
    }
  `
];
var Rn = Object.getOwnPropertyDescriptor, Ln = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Rn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const In = {
  type: "custom:component-three-stat-v2",
  metric_1_value: "00",
  metric_1_label: "Metric one",
  metric_2_value: "00",
  metric_2_label: "Metric two",
  metric_3_value: "00",
  metric_3_label: "Metric three",
  interactive: !0
};
let di = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...In, ...t });
  }
  getCardSize() {
    return 2;
  }
  _getAction(t) {
    if (!this._config || this._config.interactive === !1) return null;
    const e = this._config[`metric_${t}_action`];
    if (typeof e == "function")
      return () => e({ host: this, hass: this.hass, index: t });
    const i = this._config[`metric_${t}_navigation_path`];
    if (i) return () => this.navigate(i);
    const r = this._config[`metric_${t}_entity`];
    return r ? () => this.moreInfo(r) : null;
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll("button.stat").forEach((e) => {
      const i = Number(e.dataset.index), r = this._getAction(i);
      r && this._interactionHandles.push(
        S(e, { primary: r, feedback: !0 })
      );
    });
  }
  disconnectedCallback() {
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = [1, 2, 3].map((e) => {
      const i = this._config[`metric_${e}_entity`], r = i ? this.hass?.states[i] : null;
      let a = this._config[`metric_${e}_value`];
      r && (a === "00" || !a) && (a = K(r, this.hass));
      let s = this._config[`metric_${e}_label`];
      r && (s === `Metric ${e === 1 ? "one" : e === 2 ? "two" : "three"}` || !s) && (s = vt({ state: r }));
      const n = this._getAction(e), c = `${s}: ${a}`, l = o`
        <div class="value">${this.esc(a)}</div>
        <div class="label">${this.esc(s)}</div>
      `;
      return n ? o`<button class="stat" data-index="${e}" type="button" aria-label="${this.esc(c)}">
            ${l}
          </button>` : o`<div class="stat" data-index="${e}" aria-label="${this.esc(c)}">${l}</div>`;
    });
    return o`
      <ha-card>
        <div class="wrap">${t}</div>
      </ha-card>
    `;
  }
};
di.styles = Nn;
di = Ln([
  k("component-three-stat-v2")
], di);
E({
  type: "component-three-stat-v2",
  element: di,
  name: "Three-stat Summary",
  description: "Reusable three-stat summary component."
});
const Mn = [
  T,
  P,
  q,
  y`
    .nav {
      width: 100%;
      text-align: left;
    }
    .wrap {
      min-height: 44px;
      padding: 8px 12px;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
    }
    .icon {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-icon);
      background: transparent;
      color: var(--primary-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 18px;
    }
    .nav-static {
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      padding: 0;
    }
  `
];
var qn = Object.getOwnPropertyDescriptor, jn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? qn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Un = {
  type: "custom:component-nav-tile-v2",
  icon: "mdi:door-open",
  title: "Destination",
  context: "Navigation",
  navigation_path: null
};
let hi = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Un, ...t });
  }
  getCardSize() {
    return 1;
  }
  updated() {
    const t = this._config?.navigation_path, e = this.renderRoot.querySelector(
      "button.nav"
    );
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = S(e, {
      primary: () => this.navigate(t),
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.navigation_path, e = o`
      <div class="wrap">
        <span class="icon">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
        </span>
        <span>
          <div class="title">${this.esc(this._config.title)}</div>
          <div class="desc">${this.esc(this._config.context)}</div>
        </span>
      </div>
    `, i = `${this._config.title || "Destination"}${this._config.context ? `: ${this._config.context}` : ""}. Navigate.`;
    return o`
      <ha-card>
        ${t ? o`<button class="i nav" type="button" aria-label="${this.esc(i)}">${e}</button>` : o`<div class="nav nav-static" aria-label="${this.esc(i)}">${e}</div>`}
      </ha-card>
    `;
  }
};
hi.styles = Mn;
hi = jn([
  k("component-nav-tile-v2")
], hi);
E({
  type: "component-nav-tile-v2",
  element: hi,
  name: "Navigation Tile",
  description: "Reusable navigation tile component."
});
const Bn = [
  T,
  P,
  F,
  y`
    .wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 6px 10px;
      min-height: 44px;
    }
    .group {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .chip {
      min-height: 32px;
      border: var(--dashboard-card-border) !important;
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      padding: 0 10px !important;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: var(--primary-text-color);
      font-size: 11.5px;
      font-weight: 650;
      white-space: nowrap;
      cursor: pointer;
    }
    .chip:hover {
      background: var(--dashboard-active-surface);
    }
    .chip ha-icon,
    .chip ha-state-icon {
      color: var(--primary-color);
      --mdc-icon-size: 16px;
    }
    .chip:disabled {
      cursor: default;
      opacity: 0.6;
    }
    @media (max-width: 520px) {
      .chip {
        width: 44px;
        padding: 0 !important;
        justify-content: center;
      }
      .chip span {
        display: none;
      }
      .context {
        width: auto;
        padding: 0 12px !important;
      }
      .context span {
        display: inline;
      }
    }
  `
];
var Fn = Object.getOwnPropertyDescriptor, Vn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Fn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Wn = {
  type: "custom:component-quick-nav-v2",
  left_icon: "mdi:weather-partly-cloudy",
  left_text: "Context",
  left_entity: null,
  action_1_icon: "mdi:view-dashboard-outline",
  action_1_text: "Destination",
  action_1_path: null,
  action_2_icon: "mdi:cog-outline",
  action_2_text: "Settings",
  action_2_path: null
};
let pi = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Wn, ...t });
  }
  getCardSize() {
    return 1;
  }
  _formatState() {
    if (!this._config?.left_entity || !this.hass)
      return this._config?.left_text || "Context";
    const t = this.hass.states[this._config.left_entity];
    if (!t) return "Unavailable";
    try {
      return this.hass.formatEntityState ? this.hass.formatEntityState(t) : t.state;
    } catch {
      return t.state;
    }
  }
  updated() {
    for (const r of this._interactionHandles) r.destroy();
    this._interactionHandles = [];
    const t = this.renderRoot.querySelector(
      "#context"
    ), e = this.renderRoot.querySelector(
      "#action-1"
    ), i = this.renderRoot.querySelector(
      "#action-2"
    );
    t && this._interactionHandles.push(
      S(t, {
        primary: () => this.moreInfo(this._config?.left_entity),
        feedback: !0
      })
    ), e && this._config?.action_1_path && this._interactionHandles.push(
      S(e, {
        primary: () => this.navigate(this._config?.action_1_path),
        feedback: !0
      })
    ), i && this._config?.action_2_path && this._interactionHandles.push(
      S(i, {
        primary: () => this.navigate(this._config?.action_2_path),
        feedback: !0
      })
    );
  }
  disconnectedCallback() {
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.left_entity && this.hass ? this.hass.states[this._config.left_entity] : null, e = t ? this._formatState() : this._config.left_entity ? "Unavailable" : this._config.left_text;
    return o`
      <ha-card>
        <div class="wrap">
          <button
            class="i chip context"
            id="context"
            type="button"
            aria-label="${this.esc(this._config.left_text)}"
            ?disabled=${!this._config.left_entity}
          >
            ${t ? o`<ha-state-icon
                    id="context-icon"
                    .hass=${this.hass}
                    .stateObj=${t}
                  ></ha-state-icon>` : o`<ha-icon
                    icon="${this.esc(this._config.left_icon)}"
                  ></ha-icon>`}
            <span>${this.esc(e)}</span>
          </button>
          <div class="group">
            <button
              class="i chip"
              id="action-1"
              type="button"
              aria-label="${this.esc(this._config.action_1_text)}"
              ?disabled=${!this._config.action_1_path}
            >
              <ha-icon icon="${this.esc(this._config.action_1_icon)}"></ha-icon>
              <span>${this.esc(this._config.action_1_text)}</span>
            </button>
            <button
              class="i chip"
              id="action-2"
              type="button"
              aria-label="${this.esc(this._config.action_2_text)}"
              ?disabled=${!this._config.action_2_path}
            >
              <ha-icon icon="${this.esc(this._config.action_2_icon)}"></ha-icon>
              <span>${this.esc(this._config.action_2_text)}</span>
            </button>
          </div>
        </div>
      </ha-card>
    `;
  }
};
pi.styles = Bn;
pi = Vn([
  k("component-quick-nav-v2")
], pi);
E({
  type: "component-quick-nav-v2",
  element: pi,
  name: "Quick Navigation",
  description: "Reusable quick navigation component."
});
const Gn = [
  T,
  P,
  q,
  tt,
  y`
    ha-card {
      overflow: hidden;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      box-shadow: none;
      color: var(--primary-text-color);
    }
    button {
      appearance: none;
      width: 100%;
      min-height: 48px;
      padding: 10px 14px;
      border: 0;
      border-left: 3px solid transparent;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }
    .icon {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .name,
    .summary {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .summary {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    button.active {
      border-left-color: transparent;
      background: transparent;
    }
    button.active .icon {
      color: var(--primary-color);
    }
    button.warning {
      border-left-color: var(--warning-color);
      background: var(--dashboard-warning-surface);
    }
    button.warning .icon {
      color: var(--warning-color);
    }
    button.critical {
      border-left-color: var(--error-color);
      background: var(--dashboard-critical-surface);
    }
    button.critical .icon {
      color: var(--error-color);
    }
    button:hover {
      background: var(--dashboard-card-muted-surface);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--dashboard-radius-card);
    }
  `
];
var Kn = Object.defineProperty, Yn = Object.getOwnPropertyDescriptor, Ea = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Yn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Kn(e, i, a), a;
};
const Qn = {
  type: "custom:component-room-navigation-v1",
  name: "Room",
  icon: "mdi:home-outline"
};
let $e = class extends A {
  constructor() {
    super(...arguments), this._registries = null, this._interactionHandle = null, this._unsubRegistry = null;
  }
  static getGridOptions() {
    return { columns: 6, rows: 1 };
  }
  setConfig(t) {
    if (!t?.area) throw new Error("area is required");
    if (!t?.navigation_path)
      throw new Error("navigation_path is required");
    super.setConfig({ ...Qn, ...t }), this.hass && I.load(this.hass).then((e) => {
      this._registries = e;
    });
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = I.subscribe(this.hass, (t) => {
      this._registries = t;
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  willUpdate() {
    !this._registries && this.hass && I.load(this.hass).then((t) => {
      this._registries = t;
    }), this.isConnected && !this._unsubRegistry && this.hass && (this._unsubRegistry = I.subscribe(this.hass, (t) => {
      this._registries = t;
    }));
  }
  _getArea() {
    if (!this._registries || !this._config) return null;
    const t = String(this._config.area).trim().toLowerCase();
    return this._registries.areas.find(
      (e) => e.area_id === this._config.area || String(e.name || "").trim().toLowerCase() === t
    ) || null;
  }
  _getEntities() {
    const t = this._getArea();
    if (!t || !this._registries || !this.hass) return [];
    const e = this._registries.deviceArea || /* @__PURE__ */ new Map();
    return this._registries.entities.filter(
      (i) => i && !i.disabled_by && !i.hidden_by && (i.area_id === t.area_id || (i.device_id ? e.get(i.device_id) : null) === t.area_id)
    ).map((i) => this.hass.states[i.entity_id]).filter(Boolean);
  }
  _getStatus() {
    const t = this._getArea();
    if (!t) return { summary: "", severity: "" };
    const e = ka(t, this._registries, this.hass);
    return {
      summary: e.summary,
      severity: e.severity
    };
  }
  _presenceDetected() {
    if (this._config?.demo_presence === !0) return !0;
    if (this._config?.demo_presence === !1) return !1;
    const t = this._config?.presence_entity;
    if (t) {
      const e = this.hass?.states?.[t];
      return !!(e && ["on", "home", "occupied", "present", "detected"].includes(
        String(e.state).toLowerCase()
      ));
    }
    return this._getEntities().some((e) => {
      if (!e?.entity_id?.startsWith("binary_sensor.") || e.state !== "on")
        return !1;
      const i = String(
        e.attributes?.device_class || ""
      ).toLowerCase(), r = `${e.entity_id} ${String(e.attributes?.friendly_name || "")}`.toLowerCase();
      return i === "occupancy" || i === "presence" || r.includes("presence") || r.includes("occupancy") || r.includes("mmwave");
    });
  }
  _presenceHue() {
    const t = String(
      this._config?.presence_colour_key || this._config?.area || this._config?.name || "room"
    );
    let e = 2166136261;
    for (let i = 0; i < t.length; i += 1)
      e ^= t.charCodeAt(i), e = Math.imul(e, 16777619);
    return ((e >>> 0) % 360 + 360) % 360;
  }
  updated() {
    const t = this.renderRoot.querySelector("button");
    t && this._config?.navigation_path ? (this._interactionHandle?.destroy(), this._interactionHandle = S(t, {
      primary: () => this.navigate(this._config?.navigation_path),
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  render() {
    if (!this._config) return o``;
    const t = this._getStatus(), e = this._presenceDetected(), i = `Open ${this._config.name}${t.summary ? `. ${t.summary}` : ""}`, r = e ? this._presenceHue() : 0, a = e ? `border-color: hsl(${r} 82% 68% / .62); box-shadow: 0 0 0 1px hsl(${r} 82% 68% / .18), 0 0 14px 2px hsl(${r} 82% 64% / .14);` : "";
    return o`
      <ha-card style="${a}" ?data-presence=${e}>
        <button
          class="${this.esc(t.severity)}"
          type="button"
          aria-label="${this.esc(i)}"
        >
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <span class="copy">
            <span class="name">${this.esc(this._config.name)}</span>
            ${t.summary ? o`<span class="summary">${this.esc(t.summary)}</span>` : ""}
          </span>
        </button>
      </ha-card>
    `;
  }
};
$e.styles = Gn;
Ea([
  x()
], $e.prototype, "_registries", 2);
$e = Ea([
  k("component-room-navigation-v1")
], $e);
E({
  type: "component-room-navigation-v1",
  element: $e,
  name: "Room Navigation",
  description: "Area-aware room navigation with presence status."
});
const Zn = [
  T,
  P,
  F,
  q,
  sr,
  y`
    .wrap {
      padding: 0;
    }
    .head {
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--divider-color);
    }
    .head-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .head-left ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 20px;
    }
    .head h2 {
      font-size: 15px;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .close {
      width: 32px;
      height: 32px;
      border: var(--dashboard-card-border) !important;
      border-radius: var(--dashboard-radius-control) !important;
      color: var(--secondary-text-color);
      padding: 0 !important;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
    .close:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .body {
      padding: 10px 16px 14px;
    }
    .sep {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0 8px;
      font-size: 11.5px;
      font-weight: 650;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .sep:after {
      content: "";
      height: 1px;
      background: var(--divider-color);
      flex: 1;
    }
    .row {
      appearance: none;
      width: 100%;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      min-height: 44px;
      display: grid;
      grid-template-columns: 32px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      border-radius: var(--dashboard-radius-control);
      cursor: pointer;
      padding: 6px 8px;
    }
    .row:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .row ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 18px;
    }
    .rname {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .rstate,
    .rvalue {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .rvalue {
      font-weight: 600;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .row:not(.actionable) {
      cursor: default;
    }
    .row:not(.actionable):hover {
      background: transparent;
    }
  `
];
var Jn = Object.getOwnPropertyDescriptor, Xn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Jn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const to = {
  type: "custom:component-room-sheet-v2",
  icon: "mdi:bed-king-outline",
  title: "Room name",
  rows: null
}, Yr = [
  {
    section: "Room state",
    icon: "mdi:thermometer",
    name: "Status metric",
    state: "Supporting context",
    value: "Value"
  },
  {
    section: "Controls",
    icon: "mdi:lightbulb-outline",
    name: "Control name",
    state: "Current state",
    value: "Value"
  },
  {
    section: "Controls",
    icon: "mdi:thermostat",
    name: "Control name",
    state: "Current state",
    value: "Value"
  }
];
let ui = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...to, ...t });
  }
  getCardSize() {
    return 5;
  }
  _getAction(t) {
    if (t.navigation_path) return () => this.navigate(t.navigation_path);
    if (t.service && this.hass) {
      const [e, i] = String(t.service).split(".");
      if (e && i)
        return () => {
          this.hass.callService(e, i, {
            ...t.service_data || {},
            ...t.entity ? { entity_id: t.entity } : {}
          });
        };
    }
    return t.entity ? () => this.moreInfo(t.entity) : null;
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], (Array.isArray(this._config?.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : Yr).forEach((e, i) => {
      const r = this._getAction(e);
      if (!r) return;
      const a = this.renderRoot.querySelector(
        `[data-row="${i}"]`
      );
      a && (a.setAttribute(
        "aria-label",
        e.aria_label || `${e.name || "Room control"}`
      ), this._interactionHandles.push(
        S(a, {
          primary: r,
          hold: e.entity && e.navigation_path ? () => this.moreInfo(e.entity) : void 0,
          optimistic: !1,
          repeat: !1,
          feedback: !0
        })
      ));
    });
  }
  disconnectedCallback() {
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = Array.isArray(this._config.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : Yr;
    let e = null;
    return o`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <span class="head-left">
              <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
              <span class="title">${this.esc(this._config.title)}</span>
            </span>
            <span class="i close preview-only" aria-hidden="true">
              <ha-icon icon="mdi:close"></ha-icon>
            </span>
          </div>
          <div class="body">
            ${t.map((i, r) => {
      const a = i.entity && this.hass?.states ? this.hass.states[i.entity] : null, s = i.entity ? it(i.entity) : "", n = a && (!i.name || i.name === "Control name" || i.name === "Status metric") ? vt({ state: a }) : i.name || "Control name", c = a && (!i.state || i.state === "Current state" || i.state === "Supporting context") ? K(a, this.hass) : i.state || "", l = a && (!i.icon || i.icon === "mdi:circle-outline") ? a.attributes.icon || ne(s, a.state) : i.icon || "mdi:circle-outline", p = i.value || "", f = i.section || "Controls", g = f !== e;
      g && (e = f);
      const d = this._getAction(i), u = i.aria_label || `${n}: ${c || p}`;
      return o`
                ${g ? o`<div class="sep">${this.esc(f)}</div>` : ""}
                ${d ? o`
                        <button
                          class="row actionable"
                          data-row="${r}"
                          type="button"
                          aria-label="${this.esc(u)}"
                          @click=${d}
                        >
                          <ha-icon
                            icon="${this.esc(l)}"
                          ></ha-icon>
                          <span>
                            <div class="rname">
                              ${this.esc(n)}
                            </div>
                            ${c ? o`<div class="rstate">${this.esc(c)}</div>` : ""}
                          </span>
                          ${p ? o`<span class="rvalue">${this.esc(p)}</span>` : ""}
                        </button>
                      ` : o`
                        <div class="row" data-row="${r}" aria-label="${this.esc(u)}">
                          <ha-icon
                            icon="${this.esc(l)}"
                          ></ha-icon>
                          <span>
                            <div class="rname">
                              ${this.esc(n)}
                            </div>
                            ${c ? o`<div class="rstate">${this.esc(c)}</div>` : ""}
                          </span>
                          ${p ? o`<span class="rvalue">${this.esc(p)}</span>` : ""}
                        </div>
                      `}
              `;
    })}
          </div>
        </div>
      </ha-card>
    `;
  }
};
ui.styles = Zn;
ui = Xn([
  k("component-room-sheet-v2")
], ui);
E({
  type: "component-room-sheet-v2",
  element: ui,
  name: "Room Sheet",
  description: "Reusable room-sheet component."
});
const eo = [
  T,
  P,
  se,
  q,
  F,
  wi,
  y`
    .control {
      justify-self: end;
      min-width: 64px;
      display: flex;
      justify-content: flex-end;
    }
    .slider:has(.live-slider) {
      position: relative;
      overflow: visible;
    }
    .live-slider {
      position: absolute;
      inset: -15px 0;
      width: 100%;
      height: 34px;
      margin: 0;
      opacity: 0;
      cursor: pointer;
    }
    .row-static {
      width: 100%;
      text-align: left;
    }
    .row-static .identity {
      min-width: 0;
    }
  `
];
var io = Object.defineProperty, ro = Object.getOwnPropertyDescriptor, hr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? ro(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && io(e, i, a), a;
};
const ao = {
  type: "custom:component-control-row-v2",
  icon: "mdi:lightbulb-outline",
  title: "Control name",
  state: "Current state",
  mode: "slider",
  value: 68,
  entity: null
};
let Vt = class extends A {
  constructor() {
    super(...arguments), this._on = !0, this._val = 68, this._interactionHandles = [], this._coalescer = null;
  }
  setConfig(t) {
    super.setConfig({ ...ao, ...t }), this._on = this._config?.on !== !1, this._val = Math.max(0, Math.min(100, Number(this._config?.value) || 68)), this._resetCoalescer();
  }
  getCardSize() {
    return 1;
  }
  _getState() {
    return this._config?.entity ? this.hass?.states?.[this._config.entity] ?? null : null;
  }
  _domain() {
    return String(this._config?.entity || "").split(".")[0];
  }
  _available(t = this._getState()) {
    return !!(t && !["unknown", "unavailable"].includes(String(t.state).toLowerCase()));
  }
  _sliderPercent(t) {
    if (!this._config?.entity || !t) return this._val;
    const e = this._domain();
    if (e === "light")
      return t.state === "on" ? Math.round(Number(t.attributes?.brightness ?? 255) / 255 * 100) : 0;
    if (e === "fan")
      return Math.max(
        0,
        Math.min(100, Number(t.attributes?.percentage) || 0)
      );
    if (e === "number" || e === "input_number") {
      const r = Number(t.attributes?.min ?? 0), a = Number(t.attributes?.max ?? 100), s = Number(t.state);
      if (Number.isFinite(s) && Number.isFinite(r) && Number.isFinite(a) && a > r)
        return Math.max(0, Math.min(100, (s - r) / (a - r) * 100));
    }
    const i = Number(t.state);
    return Number.isFinite(i) ? Math.max(0, Math.min(100, i)) : this._val;
  }
  _description(t) {
    if (!this._config?.entity) return this._config?.state || "";
    if (!this._available(t)) return "Unavailable";
    try {
      return t && this.hass?.formatEntityState?.(t) || this._config?.state || "";
    } catch {
      return String(t?.state || this._config?.state || "");
    }
  }
  _resetCoalescer() {
    this._coalescer?.destroy(), this._coalescer = null;
  }
  _sliderCoalescer() {
    return this._coalescer ? this._coalescer : (this._coalescer = rr(
      (t) => this._sendSlider(t),
      {
        onError: () => {
          const t = this._getState();
          this._val = this._sliderPercent(t), this._updateSliderVisual();
        }
      }
    ), this._coalescer);
  }
  async _sendSlider(t) {
    const e = this._config?.entity;
    if (!e || !this.hass) return;
    const i = this._config?.slider_service;
    if (i && typeof i == "object" && i.domain && i.service) {
      const a = i.data_key || "value";
      return this.hass.callService(i.domain, i.service, {
        entity_id: e,
        ...i.data || {},
        [a]: t
      });
    }
    const r = this._domain();
    if (r === "light")
      return t <= 0 ? this.hass.callService("light", "turn_off", { entity_id: e }) : this.hass.callService("light", "turn_on", {
        entity_id: e,
        brightness_pct: Math.round(t)
      });
    if (r === "fan")
      return this.hass.callService("fan", "set_percentage", {
        entity_id: e,
        percentage: Math.round(t)
      });
    if (r === "number" || r === "input_number") {
      const a = this._getState(), s = Number(a?.attributes?.min ?? 0), n = Number(a?.attributes?.max ?? 100), c = s + (n - s) * t / 100;
      return this.hass.callService(r, "set_value", { entity_id: e, value: c });
    }
    throw new Error(
      `Slider mode does not support ${r || "this entity"} without slider_service`
    );
  }
  _updateSliderVisual() {
    const t = this.renderRoot.querySelector(
      ".slider > span"
    );
    t && (t.style.width = `${Math.max(0, Math.min(100, this._val))}%`);
  }
  async _toggle(t) {
    !this._config?.entity || !this.hass || (await this.hass.callService("homeassistant", "toggle", {
      entity_id: this._config.entity
    }), await ye(
      this.hass,
      this._config.entity,
      (e) => e === (t ? "off" : "on"),
      { timeout: 9e3 }
    ));
  }
  _serviceAction() {
    const t = String(this._config?.service || ""), [e, i] = t.split(".");
    return !e || !i ? this.moreInfo(this._config?.entity) : this.hass?.callService(e, i, {
      entity_id: this._config?.entity,
      ...this._config?.service_data || {}
    });
  }
  disconnectedCallback() {
    this._resetCoalescer();
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  updated() {
    for (const l of this._interactionHandles) l.destroy();
    this._interactionHandles = [];
    const t = this._config?.mode || "slider", e = !!this._config?.entity, i = this._getState(), r = e ? this._available(i) : !0, a = e ? i?.state === "on" : this._on;
    if (e && t === "slider") {
      const l = this.renderRoot.querySelector(
        ".identity"
      );
      l && (l.setAttribute("role", "button"), l.setAttribute("tabindex", "0"), l.setAttribute(
        "aria-label",
        `Open details for ${this._config?.title}`
      ), this._interactionHandles.push(
        S(l, {
          primary: () => this.moreInfo(this._config?.entity),
          feedback: !0
        })
      ));
      const p = this.renderRoot.querySelector(
        ".live-slider"
      );
      p && (p.disabled = !r, p.oninput = () => {
        this._val = Number(p.value), this._updateSliderVisual(), this._sliderCoalescer().request(this._val);
      });
      return;
    }
    const n = e ? t !== "slider" : !e && (t === "switch" || t === "slider"), c = this.renderRoot.querySelector(
      n ? "button.row" : ".row"
    );
    if (!(!n || !c)) {
      if (!e) {
        this._interactionHandles.push(
          S(c, {
            primary: () => {
              t === "switch" ? this._on = !this._on : t === "slider" && (this._val = (this._val + 20) % 120, this._val > 100 && (this._val = 0));
            },
            feedback: !0
          })
        );
        return;
      }
      if (t === "switch") {
        c.setAttribute("aria-pressed", String(a)), c.setAttribute(
          "aria-label",
          `${a ? "Turn off" : "Turn on"} ${this._config?.title}`
        );
        const l = c.querySelector(".switch");
        this._interactionHandles.push(
          S(c, {
            primary: () => this._toggle(a),
            hold: () => this.moreInfo(this._config?.entity),
            optimistic: {
              capture: () => a,
              apply: () => {
                const p = !a;
                this._on = p, c.setAttribute("aria-pressed", String(p)), l?.classList.toggle("on", p);
              },
              rollback: () => {
                this._on = a, c.setAttribute("aria-pressed", String(a)), l?.classList.toggle("on", a);
              }
            },
            feedback: !0
          })
        );
        return;
      }
      c.setAttribute(
        "aria-label",
        t === "action" ? `${this._config?.title} action` : `Open details for ${this._config?.title}`
      ), this._interactionHandles.push(
        S(c, {
          primary: () => t === "action" ? this._serviceAction() : this.moreInfo(this._config?.entity),
          feedback: !0
        })
      );
    }
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.mode || "slider", e = !!this._config.entity, i = this._getState(), r = e ? this._available(i) : !0, a = e ? i?.state === "on" : this._on;
    t === "slider" && e && (this._val = this._sliderPercent(i));
    const s = t === "switch" ? o`<span class="switch ${a ? "on" : ""}"
            ><span></span
          ></span>` : t === "state" ? o`<span class="metric"
              >${this.esc(e ? this._description(i) : this._config.value)}</span
            >` : t === "action" ? o`<span class="action">Action</span>` : o`
                <span class="slider">
                  <span style="width:${this._val}%"></span>
                  ${e ? o`
                          <input
                            class="live-slider"
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            .value=${String(Math.round(this._val))}
                            aria-label="${this.esc(this._config.title)}"
                          />
                        ` : ""}
                </span>
              `, c = e ? t !== "slider" : !e && (t === "switch" || t === "slider"), l = o`
      <div class="wrap">
        <span class="icon">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
        </span>
        <span class="identity">
          <div class="title">${this.esc(this._config.title)}</div>
          <div class="desc">${this.esc(this._description(i))}</div>
        </span>
        <span class="control">${s}</span>
      </div>
    `;
    return o`
      <ha-card>
        ${c ? o`
                <button
                  class="i row"
                  type="button"
                  ?disabled=${e && !r}
                  @click=${() => {
      e ? t === "switch" ? this._toggle(a) : t === "action" ? this._serviceAction() : this.moreInfo(this._config?.entity) : t === "switch" ? this._on = !this._on : t === "slider" && (this._val = (this._val + 20) % 120, this._val > 100 && (this._val = 0));
    }}
                >
                  ${l}
                </button>
              ` : o`<div class="row row-static">${l}</div>`}
      </ha-card>
    `;
  }
};
Vt.styles = eo;
hr([
  x()
], Vt.prototype, "_on", 2);
hr([
  x()
], Vt.prototype, "_val", 2);
Vt = hr([
  k("component-control-row-v2")
], Vt);
E({
  type: "component-control-row-v2",
  element: Vt,
  name: "Control Row",
  description: "Reusable control-row component."
});
const so = [
  T,
  P,
  se,
  q,
  F,
  Dt,
  y`
    .buttons {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .btn {
      position: relative;
      width: 36px;
      height: 36px;
      border: var(--dashboard-card-border) !important;
      border-radius: var(--dashboard-radius-control) !important;
      background: var(--dashboard-card-muted-surface) !important;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      padding: 0 !important;
      cursor: pointer;
    }
    .btn:hover {
      background: var(--dashboard-active-surface) !important;
    }
    .btn.main {
      color: var(--primary-color);
    }
    .btn ha-icon {
      position: relative;
      --mdc-icon-size: 18px;
    }
  `
];
var no = Object.defineProperty, oo = Object.getOwnPropertyDescriptor, Ei = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? oo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && no(e, i, a), a;
};
const Ve = { pause: 1, previous: 16, next: 32, play: 512 }, co = {
  type: "custom:component-media-row-v2",
  icon: "mdi:speaker",
  title: "Media player",
  state: "Playing · Media title",
  entity: null
};
let St = class extends A {
  constructor() {
    super(...arguments), this._playing = !0, this._optimisticPlaying = null, this._busy = !1, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...co, ...t }), this._playing = !0, this._optimisticPlaying = null, this._busy = !1;
  }
  getCardSize() {
    return 1;
  }
  _liveState() {
    return this._config?.entity ? this.hass?.states?.[this._config.entity] ?? null : null;
  }
  _available(t) {
    return !!(t && !["unknown", "unavailable"].includes(String(t.state).toLowerCase()));
  }
  _supported(t, e) {
    const i = Number(t?.attributes?.supported_features);
    return !Number.isFinite(i) || !!(i & e);
  }
  _description(t) {
    return this._config?.entity ? this._available(t) ? [String(t?.state || "").replaceAll("_", " ").replace(/^./, (i) => i.toUpperCase()), t?.attributes?.media_title].filter(Boolean).join(" · ") : "Unavailable" : this._config?.state || "";
  }
  async _playPause(t) {
    if (!(this._busy || !this._config?.entity || !this.hass)) {
      this._busy = !0;
      try {
        const e = t ? "media_pause" : "media_play";
        await this.hass.callService("media_player", e, {
          entity_id: this._config.entity
        }), await ye(
          this.hass,
          this._config.entity,
          (i) => t ? i !== "playing" && !["unknown", "unavailable"].includes(String(i).toLowerCase()) : i === "playing",
          { timeout: 9e3 }
        ), this._optimisticPlaying = null, this._busy = !1;
      } catch (e) {
        throw this._busy = !1, e;
      }
    }
  }
  _momentary(t) {
    if (!(!this._config?.entity || !this.hass))
      return this.hass.callService("media_player", t, {
        entity_id: this._config.entity
      });
  }
  disconnectedCallback() {
    this._busy = !1;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  updated() {
    for (const s of this._interactionHandles) s.destroy();
    this._interactionHandles = [];
    const t = !!this._config?.entity, e = this._liveState(), r = t && this._available(e) ? e?.state === "playing" : this._playing;
    if (t) {
      const s = this.renderRoot.querySelector(
        ".identity"
      );
      s && (s.setAttribute(
        "aria-label",
        `Open details for ${this._config?.title}`
      ), this._interactionHandles.push(
        S(s, {
          primary: () => this.moreInfo(this._config?.entity),
          feedback: !0
        })
      ));
      const n = this.renderRoot.querySelector(
        ".previous"
      ), c = this.renderRoot.querySelector(
        ".next"
      );
      n && this._interactionHandles.push(
        S(n, {
          primary: () => this._momentary("media_previous_track"),
          feedback: !0
        })
      ), c && this._interactionHandles.push(
        S(c, {
          primary: () => this._momentary("media_next_track"),
          feedback: !0
        })
      );
    }
    const a = this.renderRoot.querySelector(
      ".main"
    );
    a && (t ? this._interactionHandles.push(
      S(a, {
        primary: () => this._playPause(r),
        optimistic: {
          capture: () => r,
          apply: () => {
            this._optimisticPlaying = !r, a.setAttribute(
              "aria-label",
              r ? "Play" : "Pause"
            ), a.querySelector("ha-icon")?.setAttribute(
              "icon",
              `mdi:${r ? "play" : "pause"}`
            );
          },
          rollback: () => {
            this._optimisticPlaying = null;
          }
        },
        feedback: !0
      })
    ) : this._interactionHandles.push(
      S(a, {
        primary: () => {
          this._playing = !this._playing;
        },
        optimistic: !1,
        feedback: !0
      })
    ));
  }
  render() {
    if (!this._config) return o``;
    const t = this._liveState(), e = !!this._config.entity, i = e && this._available(t), r = i ? t?.state === "playing" : this._playing, a = this._optimisticPlaying ?? r, s = i && this._supported(t, Ve.previous), n = i && this._supported(t, Ve.next), c = !this._busy && (!e || i && this._supported(
      t,
      a ? Ve.pause : Ve.play
    ));
    return o`
      <ha-card>
        <div class="wrap">
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          ${e ? o`
                  <span class="identity" role="button" tabindex="0">
                    <div class="title">${this.esc(this._config.title)}</div>
                    <div class="desc">
                      ${this.esc(this._description(t))}
                    </div>
                  </span>
                ` : o`
                  <span>
                    <div class="title">${this.esc(this._config.title)}</div>
                    <div class="desc">
                      ${this.esc(this._description(t))}
                    </div>
                  </span>
                `}
          <span class="buttons">
            ${e ? o`
                    <button
                      class="i btn previous"
                      type="button"
                      aria-label="Previous"
                      ?disabled=${!s}
                    >
                      <ha-icon icon="mdi:skip-previous"></ha-icon>
                    </button>
                  ` : o`
                    <span class="btn" aria-hidden="true">
                      <ha-icon icon="mdi:skip-previous"></ha-icon>
                    </span>
                  `}
            <button
              class="i btn main"
              type="button"
              aria-label="${a ? "Pause" : "Play"}"
              ?disabled=${!c}
            >
              <ha-icon icon="mdi:${a ? "pause" : "play"}"></ha-icon>
            </button>
            ${e ? o`
                    <button
                      class="i btn next"
                      type="button"
                      aria-label="Next"
                      ?disabled=${!n}
                    >
                      <ha-icon icon="mdi:skip-next"></ha-icon>
                    </button>
                  ` : o`
                    <span class="btn" aria-hidden="true">
                      <ha-icon icon="mdi:skip-next"></ha-icon>
                    </span>
                  `}
          </span>
        </div>
      </ha-card>
    `;
  }
};
St.styles = so;
Ei([
  x()
], St.prototype, "_playing", 2);
Ei([
  x()
], St.prototype, "_optimisticPlaying", 2);
Ei([
  x()
], St.prototype, "_busy", 2);
St = Ei([
  k("component-media-row-v2")
], St);
E({
  type: "component-media-row-v2",
  element: St,
  name: "Media Row",
  description: "Reusable media-row component."
});
const lo = y`
  :host {
    display: block;
    min-width: 0;
  }
  .head {
    min-height: 44px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    padding: 0 2px;
    color: var(--primary-text-color);
  }
  .head[hidden] {
    display: none;
  }
  .head ha-icon {
    color: var(--primary-color);
    --mdc-icon-size: 19px;
  }
  .head h2 {
    margin: 0;
    font-size: 18px;
    line-height: 1.2;
    font-weight: 650;
  }
  .body {
    min-width: 0;
  }
`;
var ho = Object.defineProperty, po = Object.getOwnPropertyDescriptor, pr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? po(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && ho(e, i, a), a;
};
const uo = "custom:auto-entities", Qr = (t) => JSON.parse(JSON.stringify(t));
let Wt = class extends A {
  constructor() {
    super(...arguments), this._innerCard = null, this._innerError = !1, this._generation = 0, this._retryTimer = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.filter) throw new Error("An Auto-Entities filter is required");
    super.setConfig(Qr(t)), this._generation += 1, this._retryTimer && clearTimeout(this._retryTimer), this._retryTimer = null, this._buildCard();
  }
  getCardSize() {
    const t = !!this._config?.header?.title?.trim();
    return (typeof this._innerCard?.getCardSize == "function" && Number(this._innerCard.getCardSize()) || 1) + (t ? 1 : 0);
  }
  getLayoutOptions() {
    return this._innerCard?.getLayoutOptions?.() ?? {};
  }
  _cardConfig() {
    const t = Qr(
      this._config || {}
    ), e = t.exclude_invalid_states !== !1;
    delete t.header, delete t.exclude_invalid_states, t.type = uo;
    const i = t.filter ?? {};
    if (i.exclude = Array.isArray(i.exclude) ? [...i.exclude] : [], e)
      for (const r of ["unavailable", "unknown"])
        i.exclude.some(
          (a) => a?.state === r && Object.keys(a).length === 1
        ) || i.exclude.push({ state: r });
    return t.filter = i, t.unique = !0, t;
  }
  async _buildCard() {
    if (!this.isConnected || !this._config || !this.hass) return;
    const t = globalThis.loadCardHelpers || (typeof window < "u" ? window.loadCardHelpers : void 0);
    if (typeof t != "function") return;
    const e = ++this._generation;
    try {
      const i = await t();
      if (e !== this._generation || !this.isConnected) return;
      const r = i.createCardElement(this._cardConfig());
      r.hass = this.hass, this._innerCard = r, this._innerError = !1;
    } catch {
      if (e !== this._generation) return;
      this._retryTimer && clearTimeout(this._retryTimer), this._retryTimer = setTimeout(() => {
        this._retryTimer = null, this._buildCard();
      }, 31e3), this._innerError = !0;
    }
  }
  connectedCallback() {
    super.connectedCallback(), this._config && this.hass && !this._innerCard && this._buildCard();
  }
  disconnectedCallback() {
    this._retryTimer && clearTimeout(this._retryTimer), this._retryTimer = null, this._generation += 1, super.disconnectedCallback();
  }
  willUpdate() {
    this._innerCard && this.hass ? this._innerCard.hass = this.hass : this.isConnected && this._config && this.hass && !this._innerCard && this._buildCard();
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.header, e = String(t?.title || "").trim();
    return o`
      ${e ? o`
              <div class="head">
                <ha-icon
                  icon="${this.esc(t?.icon || "mdi:format-list-bulleted")}"
                ></ha-icon>
                <h2>${this.esc(e)}</h2>
              </div>
            ` : ""}
      <div class="body">
        ${this._innerCard ? this._innerCard : this._innerError ? o`
                  <ha-alert alert-type="error">
                    Household controls are temporarily unavailable.
                  </ha-alert>
                ` : ""}
      </div>
    `;
  }
};
Wt.styles = lo;
pr([
  x()
], Wt.prototype, "_innerCard", 2);
pr([
  x()
], Wt.prototype, "_innerError", 2);
Wt = pr([
  k("component-device-aware-auto-entities-v1")
], Wt);
E({
  type: "component-device-aware-auto-entities-v1",
  element: Wt,
  name: "Device Aware Auto Entities",
  description: "Presentation wrapper for Auto-Entities collections."
});
const mo = [
  T,
  P,
  F,
  q,
  y`
    .card {
      padding: 4px 14px;
    }
    .summary,
    .state {
      min-height: 56px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .state {
      padding: 8px 0;
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--primary-color);
      flex-shrink: 0;
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .description {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .refresh,
    .review,
    .retry {
      appearance: none;
      min-height: 36px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-color);
      font: inherit;
      font-size: 12.5px;
      font-weight: 650;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .refresh {
      width: 36px;
      padding: 0;
    }
    .review,
    .retry {
      padding: 0 12px;
    }
    .refresh:hover,
    .review:hover,
    .retry:hover {
      background: var(--dashboard-active-surface);
    }
    .refresh:focus-visible,
    .review:focus-visible,
    .retry:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .row {
      min-height: 56px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .row .icon {
      background: var(--secondary-background-color);
    }
    button.row {
      appearance: none;
      width: 100%;
      border-left: 0;
      border-right: 0;
      border-bottom: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    button.row:hover {
      background: var(--dashboard-card-muted-surface);
    }
    button.row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
  `
];
var fo = Object.defineProperty, go = Object.getOwnPropertyDescriptor, ur = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? go(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && fo(e, i, a), a;
};
const bo = {
  type: "custom:component-device-discovery-v2",
  demo: !1,
  refresh_seconds: 60,
  max_rows: 6
}, _o = [
  {
    handler: "example_integration",
    context: {
      source: "zeroconf",
      title_placeholders: { name: "Discovered device" }
    }
  },
  {
    handler: "example_bridge",
    context: {
      source: "dhcp",
      title_placeholders: { name: "Discovered bridge" }
    }
  }
];
let Gt = class extends A {
  constructor() {
    super(...arguments), this._flows = [], this._stateKind = "ready", this._timer = null, this._started = !1, this._loadGeneration = 0, this._interactionHandles = [];
  }
  setConfig(t) {
    const e = !!this._config?.demo;
    if (super.setConfig({ ...bo, ...t }), this._config?.demo) {
      (!e || this._started) && (this._timer && clearInterval(this._timer), this._timer = null, this._started = !1, this._loadGeneration += 1), this._flows = _o, this._stateKind = "ready";
      return;
    }
    e && this._start();
  }
  getCardSize() {
    return 3;
  }
  _isAdmin() {
    return !this.hass?.user || !!this.hass.user.is_admin;
  }
  _start() {
    if (!this.isConnected || !this.hass || this._config?.demo) return;
    if (!this._isAdmin()) {
      this._timer && clearInterval(this._timer), this._timer = null, this._started = !1, this._stateKind = "admin";
      return;
    }
    if (this._started) return;
    this._started = !0, this.load();
    const t = Math.max(30, Number(this._config?.refresh_seconds) || 60);
    this._timer = setInterval(() => this.load(!0), t * 1e3);
  }
  async load(t = !1) {
    if (!this.hass || this._config?.demo) return;
    if (t || (this._stateKind = "loading"), !this._isAdmin()) {
      this._stateKind = "admin";
      return;
    }
    const e = ++this._loadGeneration;
    try {
      const i = await this.hass.callWS({
        type: "config_entries/flow/progress"
      });
      e === this._loadGeneration && !this._config?.demo && (this._flows = this._filterPending(i), this._stateKind = "ready");
    } catch {
      e === this._loadGeneration && !this._config?.demo && (this._stateKind = "error");
    }
  }
  _name(t) {
    const e = t?.context?.title_placeholders || {};
    return e.name || e.device || e.host || t.handler || "Discovered device";
  }
  _source(t) {
    return {
      bluetooth: "Bluetooth",
      dhcp: "DHCP",
      discovery: "Discovery",
      esphome: "ESPHome",
      hardware: "Hardware",
      hassio: "Home Assistant",
      homekit: "HomeKit",
      integration_discovery: "Discovery",
      mqtt: "MQTT",
      ssdp: "SSDP",
      usb: "USB",
      zeroconf: "mDNS"
    }[t || ""] || t || "Discovery";
  }
  _filterPending(t) {
    const e = /* @__PURE__ */ new Set([
      "bluetooth",
      "dhcp",
      "discovery",
      "esphome",
      "hardware",
      "hassio",
      "homekit",
      "integration_discovery",
      "mqtt",
      "ssdp",
      "usb",
      "zeroconf"
    ]);
    return (t || []).filter((i) => e.has(i?.context?.source || "")).sort((i, r) => this._name(i).localeCompare(this._name(r)));
  }
  connectedCallback() {
    super.connectedCallback(), this._start();
  }
  disconnectedCallback() {
    this._timer && clearInterval(this._timer), this._timer = null, this._started = !1, this._loadGeneration += 1;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    this.isConnected && this.hass && !this._config?.demo && !this._started && this._start();
  }
  updated() {
    for (const r of this._interactionHandles) r.destroy();
    this._interactionHandles = [];
    const t = this.renderRoot.querySelector(
      ".retry"
    );
    t && this._interactionHandles.push(
      S(t, { primary: () => this.load(), feedback: !0 })
    );
    const e = this.renderRoot.querySelector(
      "button.refresh"
    );
    e && this._interactionHandles.push(
      S(e, { primary: () => this.load(), feedback: !0 })
    ), this.renderRoot.querySelectorAll("button.row").forEach((r) => {
      this._interactionHandles.push(
        S(r, {
          primary: () => this.navigate("/config/integrations/dashboard"),
          feedback: !0
        })
      );
    });
  }
  render() {
    if (!this._config) return o``;
    if (this._stateKind !== "ready") {
      const n = {
        loading: {
          className: "",
          icon: "mdi:progress-clock",
          title: "Checking for devices",
          description: "Reading Home Assistant discovery suggestions."
        },
        admin: {
          className: "error",
          icon: "mdi:shield-lock-outline",
          title: "Administrator access required",
          description: "Device discovery is available to administrators only."
        },
        error: {
          className: "error",
          icon: "mdi:alert-circle-outline",
          title: "Discovery could not be loaded",
          description: "Retry the Home Assistant discovery check."
        }
      }[this._stateKind];
      return o`
        <ha-card>
          <div class="card">
            <div class="state ${n.className}">
              <span class="icon"
                ><ha-icon icon="${n.icon}"></ha-icon
              ></span>
              <span>
                <div class="title">${n.title}</div>
                <div class="description">${n.description}</div>
              </span>
              ${this._stateKind === "error" ? o`<button class="retry" type="button">Retry</button>` : ""}
            </div>
          </div>
        </ha-card>
      `;
    }
    const t = Math.max(1, Number(this._config.max_rows) || 6), e = this._flows.slice(0, t), i = Math.max(0, this._flows.length - e.length), r = this._flows.length === 0, a = r ? "No devices waiting" : `${this._flows.length} ${this._flows.length === 1 ? "device" : "devices"} found`, s = r ? "Home Assistant has no new setup suggestions." : "Home Assistant has setup suggestions ready to review.";
    return o`
      <ha-card>
        <div class="card">
          <div class="summary ${r ? "success" : ""}">
            <span class="icon">
              <ha-icon
                icon="${r ? "mdi:check-circle-outline" : "mdi:radar"}"
              ></ha-icon>
            </span>
            <span>
              <div class="title">${this.esc(a)}</div>
              <div class="description">${this.esc(s)}</div>
            </span>
            ${this._config.demo ? o`
                    <span class="refresh" aria-hidden="true">
                      <ha-icon icon="mdi:refresh"></ha-icon>
                    </span>
                  ` : o`
                    <button
                      class="refresh"
                      type="button"
                      aria-label="Refresh discovery"
                    >
                      <ha-icon icon="mdi:refresh"></ha-icon>
                    </button>
                  `}
          </div>
          ${e.map((n) => {
      const c = this._name(n), l = `${this._source(n.context?.source)} · ${n.handler}`, p = o`
              <span class="icon"
                ><ha-icon icon="mdi:plus-circle-outline"></ha-icon
              ></span>
              <span>
                <div class="title">${this.esc(c)}</div>
                <div class="description">${this.esc(l)}</div>
              </span>
              <span class="review" aria-hidden="true">Review</span>
            `;
      return this._config?.demo ? o`<div class="row">${p}</div>` : o`<button
                  class="row"
                  type="button"
                  aria-label="Review ${this.esc(c)}"
                >
                  ${p}
                </button>`;
    })}
          ${i ? o`
                  <div class="more">
                    ${i} more
                    ${i === 1 ? "suggestion" : "suggestions"} available
                    in Integrations
                  </div>
                ` : ""}
        </div>
      </ha-card>
    `;
  }
};
Gt.styles = mo;
ur([
  x()
], Gt.prototype, "_flows", 2);
ur([
  x()
], Gt.prototype, "_stateKind", 2);
Gt = ur([
  k("component-device-discovery-v2")
], Gt);
E({
  type: "component-device-discovery-v2",
  element: Gt,
  name: "Device Discovery",
  description: "Reusable device-discovery status component."
});
const vo = [
  T,
  P,
  F,
  q,
  se,
  pt,
  y`
    ha-card {
      position: relative;
    }
    .wrap {
      min-height: 56px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      padding: 0 14px;
    }
    .details {
      appearance: none;
      border: 0;
      background: transparent;
      text-align: left;
      min-width: 0;
      padding: 10px 0;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      cursor: default;
    }
    .details.has-entity {
      cursor: pointer;
    }
    .details:active {
      transform: scale(0.995);
    }
    .details:focus-visible,
    .action:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .title {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .versions {
      margin-top: 3px;
      font-size: 11px;
      font-family: monospace;
      line-height: 1.3;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .versions.error {
      color: var(--error-color);
    }
    .versions b {
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .action {
      appearance: none;
      border: 0;
      min-height: 36px;
      padding: 0 14px;
      border-radius: var(--dashboard-radius-control);
      background: var(--primary-color);
      color: var(--text-primary-color);
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .action:disabled {
      cursor: default;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      opacity: 0.6;
    }
    .progress {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: var(--divider-color);
      overflow: hidden;
    }
    .progress-bar {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 35%;
      background: var(--primary-color);
      animation: indeterminateSlide 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    @keyframes indeterminateSlide {
      0% {
        left: -35%;
      }
      100% {
        left: 100%;
      }
    }
  `
];
var yo = Object.defineProperty, xo = Object.getOwnPropertyDescriptor, zi = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? xo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && yo(e, i, a), a;
};
const wo = {
  type: "custom:component-update-row-v3",
  icon: "mdi:update",
  title: "Update name",
  current: "Current 1.0",
  available: "Available 1.1",
  action: "Update",
  confirm: !0,
  entity: null
};
let At = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._requested = !1, this._error = "", this._startTimer = null, this._errorTimer = null, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...wo, ...t });
  }
  getCardSize() {
    return 1;
  }
  _state() {
    return this._config?.entity && this.hass?.states?.[this._config.entity] || null;
  }
  _name(t) {
    if (this._config?.name) return this._config.name;
    if (!t) return this._config?.title || "Update";
    const e = t.attributes?.title || t.attributes?.friendly_name || this._config?.entity || "Update";
    return String(e).replace(/ Update$/, "");
  }
  _progress(t = {}) {
    const e = t?.in_progress;
    return e === !1 || e === null || e === void 0 ? { active: !1, determinate: !1, value: 0 } : typeof e == "number" && Number.isFinite(e) ? {
      active: !0,
      determinate: !0,
      value: Math.max(0, Math.min(100, e))
    } : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? {
      active: !0,
      determinate: !0,
      value: Math.max(0, Math.min(100, Number(e)))
    } : {
      active: !!e,
      determinate: !1,
      value: 0
    };
  }
  _data() {
    const t = this._state();
    if (!t) {
      const s = !!this._config?.entity;
      return {
        live: !1,
        missing: s,
        unavailable: s,
        title: this._config?.title || "Update",
        current: s ? "Update entity unavailable" : this._config?.current || "Current 1.0",
        available: s ? "" : this._config?.available || "Available 1.1",
        action: s ? "Unavailable" : this._config?.action || "Update",
        pending: !s,
        progress: {
          active: !1,
          determinate: !1,
          value: 0
        }
      };
    }
    const e = t.attributes || {}, i = ["unavailable", "unknown"].includes(t.state), r = t.state === "on", a = this._progress(e);
    return {
      live: !0,
      missing: !1,
      unavailable: i,
      title: this._name(t),
      current: e.installed_version ? `Current ${e.installed_version}` : "Current version unavailable",
      available: e.latest_version ? `Available ${e.latest_version}` : "Latest version unavailable",
      action: i ? "Unavailable" : a.active ? "Updating…" : r ? "Update" : "Current",
      pending: r,
      progress: a
    };
  }
  _setError(t) {
    this._error = t, this._errorTimer && clearTimeout(this._errorTimer), t && (this._errorTimer = setTimeout(() => {
      this._error = "";
    }, 5e3));
  }
  _watchForStart() {
    this._startTimer && clearTimeout(this._startTimer), this._startTimer = setTimeout(() => {
      this._requested && (this._requested = !1, this._setError("The update did not start."));
    }, 12e3);
  }
  async _install(t) {
    if (!t.live || t.unavailable || !t.pending || t.progress.active || this._busy || this._requested || !this.hass || !this._config?.entity)
      return;
    const e = this._state(), i = this._name(e), r = e?.attributes?.latest_version || "the latest version";
    if (!(this._config?.confirm !== !1 && typeof window < "u" && !window.confirm(`Install ${r} for ${i}?`))) {
      this._setError(""), this._busy = !0, this._requested = !0;
      try {
        await this.hass.callService("update", "install", {
          entity_id: this._config.entity
        }), this._watchForStart();
      } catch {
        this._requested = !1, this._startTimer && clearTimeout(this._startTimer), this._setError("The update could not be started.");
      } finally {
        this._busy = !1;
      }
    }
  }
  disconnectedCallback() {
    this._startTimer && clearTimeout(this._startTimer), this._errorTimer && clearTimeout(this._errorTimer);
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  updated() {
    const t = this._data();
    this._requested && (t.progress.active || !t.pending) && (this._requested = !1, this._startTimer && clearTimeout(this._startTimer));
    for (const r of this._interactionHandles) r.destroy();
    this._interactionHandles = [];
    const e = this.renderRoot.querySelector(
      ".details"
    ), i = this.renderRoot.querySelector(
      ".action"
    );
    e && this._state() && (e.setAttribute("aria-label", `Open details for ${t.title}`), this._interactionHandles.push(
      S(e, {
        primary: () => this.moreInfo(this._config?.entity),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    )), i && this._interactionHandles.push(
      S(i, {
        primary: () => this._install(t),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._data(), e = t.progress.active || this._busy || this._requested, i = t.missing || t.unavailable || !t.pending || e, r = this._error ? "Retry" : this._busy || this._requested ? "Starting…" : t.action, a = this._error ? this._error : `${t.current}${t.available ? ` · ${t.available}` : ""}`, s = e ? t.progress.determinate ? o`
            <span
              class="progress determinate"
              role="progressbar"
              aria-label="Updating ${this.esc(t.title)}"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow="${t.progress.value}"
              style="--progress:${t.progress.value}%"
            ></span>
          ` : o`
            <span
              class="progress indeterminate"
              role="progressbar"
              aria-label="${this._busy || this._requested ? "Starting" : "Updating"} ${this.esc(t.title)}"
            ></span>
          ` : "";
    return o`
      <ha-card>
        <div class="wrap">
          <button
            class="details ${this._state() ? "has-entity" : ""}"
            type="button"
            ?disabled=${!this._state()}
          >
            <span class="icon">
              <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
            </span>
            <span class="copy">
              <div class="title">${this.esc(t.title)}</div>
              <div
                class="versions ${this._error ? "error" : ""}"
                role="status"
                aria-live="polite"
              >
                ${this.esc(a)}
              </div>
            </span>
          </button>
          <button
            class="action"
            type="button"
            aria-label="${this.esc(r)} ${this.esc(t.title)}"
            ?disabled=${i}
          >
            ${this.esc(r)}
          </button>
        </div>
        ${s}
      </ha-card>
    `;
  }
};
At.styles = vo;
zi([
  x()
], At.prototype, "_busy", 2);
zi([
  x()
], At.prototype, "_requested", 2);
zi([
  x()
], At.prototype, "_error", 2);
At = zi([
  k("component-update-row-v3")
], At);
E({
  type: "component-update-row-v3",
  element: At,
  name: "Update Row",
  description: "Reusable update row with live update support."
});
const $o = [
  T,
  P,
  F,
  pt,
  y`
    ha-card {
      position: relative;
    }
    .wrap {
      padding: 12px 14px;
      min-height: 64px;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .count {
      font-size: 20px;
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
    .headline {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
    }
    .desc {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .desc.error {
      color: var(--error-color);
    }
    .all {
      appearance: none;
      border: 0;
      min-height: 44px;
      padding: 0 16px;
      border-radius: var(--dashboard-radius-control);
      background: var(--primary-color);
      color: var(--text-primary-color);
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .all:active {
      transform: scale(0.98);
    }
    .all:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .all:disabled {
      cursor: default;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      opacity: 0.6;
    }
    .progress {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: var(--divider-color);
      overflow: hidden;
      pointer-events: none;
    }
    .progress.indeterminate {
      width: 100%;
    }
    .progress.indeterminate:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 35%;
      background: var(--primary-color);
      animation: indeterminateSlide 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    @keyframes indeterminateSlide {
      0% {
        left: -35%;
      }
      100% {
        left: 100%;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .progress.indeterminate:after {
        animation: none;
        width: 100%;
        opacity: 0.55;
      }
    }
  `
];
var ko = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, mr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Co(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && ko(e, i, a), a;
};
const So = {
  type: "custom:component-update-summary-v3",
  count: "3",
  title: "updates available",
  message: "Review the items below before installing.",
  live_updates: !1,
  update_all: !1,
  confirm: !0
};
let Kt = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._error = "", this._messageTimer = null, this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...So, ...t });
  }
  getCardSize() {
    return 1;
  }
  _all() {
    if (!this.hass?.states) return [];
    const t = Array.isArray(this._config?.entities) ? new Set(this._config.entities) : null;
    return Object.values(this.hass.states).filter(
      (e) => !!e?.entity_id?.startsWith("update.") && (!t || t.has(e.entity_id))
    );
  }
  _inProgress(t = {}) {
    const e = t?.in_progress;
    return !(e === !1 || e === null || e === void 0);
  }
  _pending() {
    return this._all().filter((t) => t.state === "on");
  }
  _live() {
    if (!this._config?.live_updates || !this.hass) return null;
    const t = this._pending().length;
    return {
      count: String(t),
      title: t === 1 ? "update available" : "updates available",
      message: t ? "Review the items below before installing." : "Everything is current."
    };
  }
  _setError(t) {
    this._error = t, this._messageTimer && clearTimeout(this._messageTimer), t && (this._messageTimer = setTimeout(() => {
      this._error = "";
    }, 5e3));
  }
  async _installAll() {
    if (!this.hass || this._busy) return;
    const t = this._pending().filter(
      (a) => !this._inProgress(a.attributes)
    );
    if (!t.length) return;
    const e = t.length;
    if (this._config?.confirm !== !1 && typeof window < "u" && !window.confirm(
      `Install ${e} available ${e === 1 ? "update" : "updates"}? Home Assistant may restart if Core, Supervisor or the operating system is included.`
    ))
      return;
    this._setError(""), this._busy = !0;
    const i = [
      "update.home_assistant_supervisor_update",
      "update.home_assistant_operating_system_update",
      "update.home_assistant_core_update"
    ], r = t.map((a) => a.entity_id).filter((a) => !i.includes(a));
    try {
      r.length && await this.hass.callService("update", "install", { entity_id: r });
      for (const a of i)
        t.some((s) => s.entity_id === a) && await this.hass.callService("update", "install", { entity_id: a });
    } catch {
      this._setError("One or more updates could not be started.");
    } finally {
      this._busy = !1;
    }
  }
  disconnectedCallback() {
    this._messageTimer && clearTimeout(this._messageTimer), this._messageTimer = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  updated() {
    const t = this.renderRoot.querySelector(".all");
    t ? (this._interactionHandle?.destroy(), this._interactionHandle = S(t, {
      primary: () => this._installAll(),
      optimistic: !1,
      repeat: !1,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  render() {
    if (!this._config) return o``;
    const t = this._live() || {
      count: this._config.count || "3",
      title: this._config.title || "updates available",
      message: this._config.message || "Review the items below before installing."
    }, e = !!this._config.update_all, i = this.hass ? this._config.live_updates ? Number(t.count) : e ? this._pending().length : 0 : Number(t.count) || 0, r = this._error ? this._error : this._busy ? "Starting available updates…" : t.message;
    return o`
      <ha-card>
        <div class="wrap">
          <span class="count">${this.esc(t.count)}</span>
          <span>
            <div class="headline">${this.esc(t.title)}</div>
            <div
              class="desc ${this._error ? "error" : ""}"
              role="status"
              aria-live="polite"
            >
              ${this.esc(r)}
            </div>
          </span>
          ${e ? o`
                  <button
                    class="all"
                    type="button"
                    ?disabled=${this._busy || i === 0}
                  >
                    ${this.esc(this._busy ? "Starting…" : "Update all")}
                  </button>
                ` : o`<span></span>`}
        </div>
        ${this._busy ? o`
                <span
                  class="progress indeterminate"
                  role="progressbar"
                  aria-label="Starting available updates"
                ></span>
              ` : ""}
      </ha-card>
    `;
  }
};
Kt.styles = $o;
mr([
  x()
], Kt.prototype, "_busy", 2);
mr([
  x()
], Kt.prototype, "_error", 2);
Kt = mr([
  k("component-update-summary-v3")
], Kt);
E({
  type: "component-update-summary-v3",
  element: Kt,
  name: "Update Summary",
  description: "Reusable update summary with live update support."
});
const Ao = [
  T,
  tt,
  P,
  F,
  Dt,
  q,
  _s,
  Ot,
  la,
  y`
    .wrap {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .identity {
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .ico {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .ico ha-icon {
      --mdc-icon-size: 20px;
    }
    .ico.on {
      color: var(--primary-color);
    }
    .name,
    .status {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
    }
    .status {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .header-actions {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .launchers {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }
    .launcher {
      min-height: 56px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
      text-align: left;
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .launcher:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .launcher ha-icon {
      --mdc-icon-size: 18px;
    }
    .launch-icon {
      width: 34px;
      height: 34px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--primary-color);
      flex-shrink: 0;
    }
    .launch-copy {
      min-width: 0;
    }
    .launch-title {
      display: block;
      font-size: 13px;
      font-weight: 600;
      line-height: 1.2;
      color: var(--primary-text-color);
    }
    .launch-sub {
      display: block;
      margin-top: 1px;
      font-size: 11.5px;
      color: var(--secondary-text-color);
    }
    .transport {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 4px 0;
    }
    .transport button {
      width: 44px;
      height: 44px;
      border: var(--dashboard-card-border);
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      background: var(--dashboard-card-muted-surface);
      cursor: pointer;
    }
    .transport button:hover {
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
    }
    .transport button.main {
      color: var(--primary-color);
      border-color: var(--primary-color);
    }
    .dialog-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }
    .dialog-content {
      width: min(380px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      overflow: auto;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      display: flex;
      flex-direction: column;
    }
    .dialog-header {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--divider-color);
      font-size: 15px;
      font-weight: 650;
    }
    .dialog-body {
      padding: 16px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .app-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .app-btn {
      min-height: 48px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
      text-align: left;
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color);
      background: transparent;
      cursor: pointer;
    }
    .app-btn:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .app-btn.active {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }
  `
];
var Eo = Object.defineProperty, zo = Object.getOwnPropertyDescriptor, za = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? zo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Eo(e, i, a), a;
};
const To = Object.freeze([
  ["up", "Up", "mdi:chevron-up"],
  ["left", "Left", "mdi:chevron-left"],
  ["select", "Select", "mdi:radiobox-marked"],
  ["right", "Right", "mdi:chevron-right"],
  ["down", "Down", "mdi:chevron-down"]
]), Do = Object.freeze([
  ["menu", "Menu", "mdi:menu"],
  ["home", "Home", "mdi:home-outline"],
  ["top_menu", "Top Menu", "mdi:format-list-bulleted"]
]), Oo = (t) => ({
  type: "tile",
  entity: t.entity,
  ...t.title ? { name: t.title } : {},
  features_position: "bottom",
  features: [
    {
      type: "media-player-playback",
      controls: [
        "media_previous_track",
        "media_play_pause",
        "media_next_track"
      ]
    },
    { type: "media-player-volume-buttons", show_mute_button: !0 },
    { type: "media-player-source" }
  ]
});
let ke = class extends A {
  constructor() {
    super(...arguments), this._nativeCard = null, this._buildToken = 0, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.entity && !t?.demo)
      throw new Error("An Apple TV media_player entity is required");
    this._buildToken += 1, this._nativeCard = null, super.setConfig({
      type: "custom:component-apple-tv-controller-v1",
      entity: t?.entity || "media_player.demo_apple_tv",
      title: t?.title || void 0,
      demo: !!t?.demo,
      remote_entity: t?.remote_entity || null,
      keyboard_entity: t?.keyboard_entity || null,
      keyboard_config_entry_id: t?.keyboard_config_entry_id || t?.config_entry_id || null
    }), this._buildNativeCard();
  }
  getCardSize() {
    return this._config?.remote_entity ? 4 : 2;
  }
  async _buildNativeCard() {
    if (!this._config || this._nativeCard || !this.isConnected) return;
    const t = globalThis.loadCardHelpers;
    if (typeof t != "function") return;
    const e = ++this._buildToken;
    try {
      const i = await t();
      if (e !== this._buildToken || !this.isConnected) return;
      const r = i.createCardElement(
        Oo(this._config)
      );
      r.hass = this.hass, this._nativeCard = r;
    } catch (i) {
      console.error("Could not create native Apple TV media tile", i);
    }
  }
  connectedCallback() {
    super.connectedCallback(), this._buildNativeCard();
  }
  disconnectedCallback() {
    this._buildToken += 1;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    this._nativeCard && this.hass && (this._nativeCard.hass = this.hass);
  }
  async _remoteCommand(t) {
    const e = this._config?.remote_entity || (this._config?.entity?.startsWith("remote.") ? this._config?.entity : this._config?.entity?.replace(/^media_player\./, "remote."));
    if (!(this._config?.demo || !this.hass || !e))
      try {
        await this.hass.callService("remote", "send_command", {
          entity_id: e,
          command: t
        });
      } catch (i) {
        console.error(`Apple TV remote command failed: ${t}`, i);
      }
  }
  async _keyboardAction(t) {
    if (this._config?.demo || !this.hass || !this._config?.keyboard_config_entry_id)
      return;
    const e = {
      config_entry_id: this._config.keyboard_config_entry_id
    }, i = this.renderRoot.querySelector(
      ".keyboard input"
    );
    if (t === "set_keyboard_text") {
      const r = i?.value;
      if (!r) return;
      e.text = r;
    } else t === "clear_keyboard_text" && i && (i.value = "");
    try {
      await this.hass.callService("apple_tv", t, e);
    } catch (r) {
      console.error(`Apple TV keyboard action failed: ${t}`, r);
    }
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.remote_entity || (this._config.entity?.startsWith("remote.") ? this._config.entity : this._config.entity?.replace(/^media_player\./, "remote.")), e = t && this.hass?.states?.[t], i = this._config.demo || !!(e && e.state !== "unavailable" && e.state !== "unknown"), r = !!(this._config.keyboard_entity && this._config.keyboard_config_entry_id), a = this._config.demo || r && this.hass?.states?.[this._config.keyboard_entity]?.state === "on", s = new Map(
      To.map((c) => [c[0], c])
    ), n = [
      null,
      "up",
      null,
      "left",
      "select",
      "right",
      null,
      "down",
      null
    ];
    return o`
      <div class="stack">
        <div class="native">${this._nativeCard || this._renderMediaBanner()}</div>

        ${t ? o`
                <section class="remote">
                  <div class="remote-head">
                    <span class="remote-title">Remote</span>
                    <span class="power">
                      <button
                        type="button"
                        data-cmd="wakeup"
                        aria-label="Wake"
                        ?disabled=${!i}
                        @click=${() => this._remoteCommand("wakeup")}
                      >
                        <ha-icon icon="mdi:power-on"></ha-icon>
                        <span>Wake</span>
                      </button>
                      <button
                        type="button"
                        data-cmd="suspend"
                        aria-label="Sleep"
                        ?disabled=${!i}
                        @click=${() => this._remoteCommand("suspend")}
                      >
                        <ha-icon icon="mdi:power-sleep"></ha-icon>
                        <span>Sleep</span>
                      </button>
                    </span>
                  </div>

                  <div
                    class="dpad"
                    aria-label="Apple TV directional remote"
                    tabindex="0"
                    role="group"
                    @keydown=${(c) => {
      i && (c.key === "ArrowUp" ? (c.preventDefault(), this._remoteCommand("up")) : c.key === "ArrowDown" ? (c.preventDefault(), this._remoteCommand("down")) : c.key === "ArrowLeft" ? (c.preventDefault(), this._remoteCommand("left")) : c.key === "ArrowRight" ? (c.preventDefault(), this._remoteCommand("right")) : (c.key === "Enter" || c.key === " ") && (c.preventDefault(), this._remoteCommand("select")));
    }}
                  >
                    ${n.map((c) => {
      if (!c)
        return o`<button
                          class="blank"
                          type="button"
                          tabindex="-1"
                          aria-hidden="true"
                        ></button>`;
      const [, l, p] = s.get(c);
      return o`
                        <button
                          class="${c === "select" ? "select" : "direction"}"
                          type="button"
                          data-cmd="${c}"
                          aria-label="${l}"
                          ?disabled=${!i}
                          @click=${() => this._remoteCommand(c)}
                        >
                          <ha-icon icon="${p}"></ha-icon>
                        </button>
                      `;
    })}
                  </div>

                  <div class="utility">
                    ${Do.map(
      ([c, l, p]) => o`
                        <button
                          type="button"
                          data-cmd="${c}"
                          aria-label="${l}"
                          ?disabled=${!i}
                          @click=${() => this._remoteCommand(c)}
                        >
                          <ha-icon icon="${p}"></ha-icon>
                          <span>${l}</span>
                        </button>
                      `
    )}
                  </div>

                  ${r ? o`
                          <div class="keyboard">
                            <input
                              type="text"
                              aria-label="Apple TV keyboard text"
                              placeholder="Type on Apple TV"
                              ?disabled=${!a}
                              @keydown=${(c) => {
      c.key === "Enter" && this._keyboardAction("set_keyboard_text");
    }}
                            />
                            <button
                              class="keyboard-set"
                              type="button"
                              aria-label="Set keyboard text"
                              ?disabled=${!a}
                              @click=${() => this._keyboardAction("set_keyboard_text")}
                            >
                              <ha-icon icon="mdi:keyboard"></ha-icon>
                            </button>
                            <button
                              class="keyboard-clear"
                              type="button"
                              aria-label="Clear keyboard text"
                              ?disabled=${!a}
                              @click=${() => this._keyboardAction("clear_keyboard_text")}
                            >
                              <ha-icon icon="mdi:backspace-outline"></ha-icon>
                            </button>
                          </div>
                        ` : ""}
                </section>
              ` : ""}
      </div>
    `;
  }
  _renderMediaBanner() {
    const t = this._config?.entity, e = t ? this.hass?.states?.[t] : null, i = e?.attributes || {}, r = e?.state === "playing", a = !e || e.state === "off" || e.state === "unavailable" || e.state === "unknown", s = i.media_title || i.app_name || this._config?.title || i.friendly_name || "Apple TV", c = [
      i.app_name && i.media_title ? i.app_name : null,
      i.media_artist,
      i.media_series_title ? `${i.media_series_title}${i.media_season ? ` S${i.media_season}:E${i.media_episode}` : ""}` : null,
      !r && e?.state ? e.state.charAt(0).toUpperCase() + e.state.slice(1) : null
    ].filter(Boolean).join(" · ") || (a ? "Off" : "Idle");
    return o`
      <div class="media-banner">
        <div class="media-info">
          <div class="media-icon">
            <ha-icon icon="${i.icon || "mdi:apple"}"></ha-icon>
          </div>
          <div class="media-details">
            <div class="media-title">${this.esc(s)}</div>
            <div class="media-sub">${this.esc(c)}</div>
          </div>
          <button
            class="media-power"
            type="button"
            aria-label="Toggle Apple TV Power"
            @click=${() => {
      t && this.hass && this.hass.callService("media_player", "toggle", { entity_id: t });
    }}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>

        <div class="media-controls">
          <button
            type="button"
            aria-label="Previous Track"
            ?disabled=${a}
            @click=${() => {
      t && this.hass && this.hass.callService("media_player", "media_previous_track", { entity_id: t });
    }}
          >
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>

          <button
            class="play-pause"
            type="button"
            aria-label="${r ? "Pause" : "Play"}"
            ?disabled=${a}
            @click=${() => {
      t && this.hass && this.hass.callService("media_player", "media_play_pause", { entity_id: t });
    }}
          >
            <ha-icon icon="${r ? "mdi:pause" : "mdi:play"}"></ha-icon>
          </button>

          <button
            type="button"
            aria-label="Next Track"
            ?disabled=${a}
            @click=${() => {
      t && this.hass && this.hass.callService("media_player", "media_next_track", { entity_id: t });
    }}
          >
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>

          <button
            type="button"
            aria-label="Volume Down"
            ?disabled=${a}
            @click=${() => {
      t && this.hass && this.hass.callService("media_player", "volume_down", { entity_id: t });
    }}
          >
            <ha-icon icon="mdi:volume-minus"></ha-icon>
          </button>

          <button
            type="button"
            aria-label="Volume Up"
            ?disabled=${a}
            @click=${() => {
      t && this.hass && this.hass.callService("media_player", "volume_up", { entity_id: t });
    }}
          >
            <ha-icon icon="mdi:volume-plus"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }
};
ke.styles = Ao;
za([
  x()
], ke.prototype, "_nativeCard", 2);
ke = za([
  k("component-apple-tv-controller-v1")
], ke);
E({
  type: "component-apple-tv-controller-v1",
  element: ke,
  name: "Apple TV Controller",
  description: "Native Home Assistant media controls with an optional explicit Apple TV remote."
});
const Po = [
  T,
  P,
  F,
  Dt,
  q,
  Ot,
  y`
    ha-card {
      display: block;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      box-shadow: none;
      color: var(--primary-text-color);
      overflow: hidden;
    }
    .row {
      min-height: 44px;
      padding: 10px 14px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .ico {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .ico ha-icon {
      --mdc-icon-size: 20px;
    }
    .activity .ico {
      color: var(--primary-color);
    }
    .offline .ico {
      color: var(--disabled-text-color);
    }
    .identity {
      appearance: none;
      border: 0;
      background: transparent;
      padding: 0;
      min-width: 0;
      text-align: left;
      cursor: pointer;
    }
    .name,
    .state {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
    }
    .state {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.25;
    }
    .actions {
      display: flex;
      gap: 6px;
    }
    .action,
    .close,
    .switchbtn,
    .maint {
      appearance: none;
      border: var(--dashboard-card-border);
      background: var(--dashboard-card-muted-surface);
      border-radius: var(--dashboard-radius-control);
      cursor: pointer;
    }
    .action {
      min-height: 32px;
      padding: 0 10px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      font-weight: 650;
      color: var(--primary-color);
    }
    .action:hover {
      background: var(--dashboard-active-surface);
    }
    .action ha-icon {
      --mdc-icon-size: 16px;
    }
    .action.active {
      color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }
    .dialog-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }
    .dialog-box {
      width: min(640px, calc(100vw - 32px));
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .dialog-head {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--divider-color);
      font-size: 15px;
      font-weight: 650;
    }
    .dialog-body {
      padding: 16px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
  `
];
var Ho = Object.defineProperty, No = Object.getOwnPropertyDescriptor, He = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? No(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Ho(e, i, a), a;
};
let ct = class extends A {
  constructor() {
    super(...arguments), this._model = null, this._camera = null, this._confirmId = null, this._confirmTimer = null, this._profileListener = (t) => {
      t.detail?.kind === "security" && t.detail?.profileId === (this._config?.profile || "household-security") && this._refresh(!0);
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      expanded: !1,
      ...t,
      type: "custom:component-camera-controller-v2"
    }), this._refresh();
  }
  getCardSize() {
    return this._config?.expanded ? 5 : 1;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._confirmTimer && clearTimeout(this._confirmTimer), super.disconnectedCallback();
  }
  willUpdate() {
    !this._model && this.hass && this._refresh();
  }
  async _refresh(t = !1) {
    if (!(!this.hass || !this._config))
      try {
        const e = await Pe(
          this.hass,
          this._config.profile || "household-security",
          { force: t }
        );
        this._model = e, this._camera = e.cameras.find(
          (i) => i.entityId === this._config?.entity || i.deviceId === this._config?.device_id
        ) || e.cameras[0] || null;
      } catch {
        this._model = null, this._camera = null;
      }
  }
  _openCamera() {
    this._camera?.online && this.dispatchEvent(
      new CustomEvent("security-camera-view-request", {
        bubbles: !0,
        composed: !0,
        detail: {
          camera: this._camera,
          trigger: this.renderRoot.querySelector(".view")
        }
      })
    );
  }
  _askConfirmation(t) {
    this._confirmId = t, this._confirmTimer && clearTimeout(this._confirmTimer), this._confirmTimer = setTimeout(() => {
      this._confirmId = null;
    }, 5e3);
  }
  async _toggleSwitch(t, e) {
    const i = t.entity.entity_id;
    if (e && /^(Recording|Detection|Alerts)$/i.test(t.role || "") && this._confirmId !== i) {
      this._askConfirmation(i);
      return;
    }
    this._confirmId = null, this._confirmTimer && clearTimeout(this._confirmTimer);
    try {
      await this.hass?.callService("switch", e ? "turn_off" : "turn_on", {
        entity_id: i
      }), this._refresh(!0);
    } catch {
    }
  }
  async _pressAction(t) {
    if (this._confirmId !== t) {
      this._askConfirmation(t);
      return;
    }
    this._confirmId = null, this._confirmTimer && clearTimeout(this._confirmTimer);
    try {
      await this.hass?.callService("button", "press", { entity_id: t });
    } catch {
    }
  }
  render() {
    if (!this._config) return o``;
    const t = this._camera, e = this._model?.error || this._model?.profileError, i = t?.name || this._config.title || "Camera", r = this._model?.profileMissing ? `Configure ${this._config.profile || "household-security"}` : e ? "Controls unavailable" : t?.active ? "Activity detected" : t?.online ? "Online" : "Unavailable", a = !!(t && (t.switches.length || t.detections.length || t.actions.length || t.ptz.length));
    return o`
      <ha-card>
        <div class="row">
          <span class="icon"><ha-icon icon="mdi:cctv"></ha-icon></span>
          <button
            class="identity"
            type="button"
            ?disabled=${!t?.online}
            @click=${this._openCamera}
          >
            <span class="name">${this.esc(i)}</span>
            <span class="state">${this.esc(r)}</span>
          </button>
          <span class="actions">
            <button
              class="action view"
              type="button"
              aria-label="View ${this.esc(i)}"
              ?disabled=${!t?.online}
              @click=${this._openCamera}
            >
              <ha-icon icon="mdi:eye-outline"></ha-icon>
              <span>View</span>
            </button>
            <button
              class="action open-controls"
              type="button"
              aria-label="${this.esc(i)} controls"
              ?hidden=${this._config.expanded || !a}
              @click=${() => {
      const s = this.renderRoot.querySelector("dialog");
      s && !s.open && s.showModal();
    }}
            >
              <ha-icon icon="mdi:tune-variant"></ha-icon>
              <span>Controls</span>
            </button>
          </span>
        </div>

        ${this._config.expanded ? o`<div class="inline">${this._renderControlsList()}</div>` : ""}
      </ha-card>

      <dialog
        role="dialog"
        aria-modal="true"
        aria-label="${this.esc(i)} controls"
        @click=${(s) => {
      const n = this.renderRoot.querySelector("dialog");
      s.target === n && n?.close();
    }}
      >
        <div class="sheet">
          <div class="head">
            <span class="sheet-title">${this.esc(i)} controls</span>
            <button
              class="close"
              type="button"
              aria-label="Close"
              @click=${() => {
      const s = this.renderRoot.querySelector("dialog");
      s && s.close();
    }}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="body">${this._renderControlsList()}</div>
        </div>
      </dialog>
    `;
  }
  _renderControlsList() {
    const t = this._camera;
    return t ? o`
      <div class="groups">
        ${t.classifications?.length ? o`
                <section class="group">
                  <div class="group-title">Last detections</div>
                  <div class="group-list classification-list">
                    ${t.classifications.map((e) => {
      const i = e.entity.entity_id, r = this.hass?.states[i], a = r?.attributes?.entity_picture, s = r?.last_updated, n = s && new Date(s), c = n && Number.isFinite(n.getTime()) ? _i(this.hass, n, {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "2-digit"
      }) : "No detection available";
      return o`
                        <button
                          class="classification"
                          type="button"
                          @click=${() => this.moreInfo(i)}
                        >
                          ${a ? o`<img
                                class="classification-image"
                                src="${a}"
                                alt="${this.esc(e.name)}"
                              />` : o`<div class="classification-image"></div>`}
                          <span class="classification-copy">
                            <span class="classification-name"
                              >${this.esc(e.name)}</span
                            >
                            <span class="classification-time"
                              >${this.esc(c)}</span
                            >
                          </span>
                        </button>
                      `;
    })}
                  </div>
                </section>
              ` : ""}
        ${t.detections?.length ? o`
                <section class="group">
                  <div class="group-title">Detection status</div>
                  <div class="group-list">
                    ${t.detections.map((e) => {
      const r = this.hass?.states[e.entity_id]?.state === "on";
      return o`
                        <div class="control detection ${r ? "on" : ""}">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.name || e.original_name || "Detection")}</span
                            >
                            <span class="control-state"
                              >${r ? "Detected" : "Clear"}</span
                            >
                          </span>
                        </div>
                      `;
    })}
                  </div>
                </section>
              ` : ""}
        ${t.switches?.length ? o`
                <section class="group">
                  <div class="group-title">Camera controls</div>
                  <div class="group-list">
                    ${t.switches.map((e) => {
      const i = e.entity.entity_id, a = this.hass?.states[i]?.state === "on", s = this._confirmId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.role || "Control")}</span
                            >
                            <span class="control-state"
                              >${a ? "On" : "Off"}</span
                            >
                          </span>
                          <button
                            class="${a ? "on" : ""} ${s ? "confirm" : ""}"
                            type="button"
                            @click=${() => this._toggleSwitch(e, a)}
                          >
                            ${s ? "Confirm off" : a ? "On" : "Off"}
                          </button>
                        </div>
                      `;
    })}
                  </div>
                </section>
              ` : ""}
        ${t.actions?.length ? o`
                <section class="group">
                  <div class="group-title">Maintenance</div>
                  <div class="group-list">
                    ${t.actions.map((e) => {
      const i = e.entity.entity_id, r = this._confirmId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.entity.name || e.entity.original_name || "Action")}</span
                            >
                            <span class="control-state">Available</span>
                          </span>
                          <button
                            class="${r ? "confirm" : ""}"
                            type="button"
                            @click=${() => this._pressAction(i)}
                          >
                            ${r ? "Confirm" : "Run"}
                          </button>
                        </div>
                      `;
    })}
                  </div>
                </section>
              ` : ""}
      </div>
    ` : o`<div>Camera controls are unavailable</div>`;
  }
};
ct.stubConfig = { profile: "household-security" };
ct.styles = Po;
He([
  x()
], ct.prototype, "_model", 2);
He([
  x()
], ct.prototype, "_camera", 2);
He([
  x()
], ct.prototype, "_confirmId", 2);
ct = He([
  k("component-camera-controller-v2")
], ct);
E({
  type: "component-camera-controller-v2",
  element: ct,
  name: "Camera Controller V2",
  description: "Platform-adapted camera controls with explicit state and protected destructive changes."
});
let Fi = class extends ct {
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      ...t,
      type: "custom:component-camera-controller-v1"
    });
  }
};
Fi = He([
  k("component-camera-controller-v1")
], Fi);
E({
  type: "component-camera-controller-v1",
  element: Fi,
  name: "Camera Controller V1",
  description: "Legacy camera controller adapter registering custom:component-camera-controller-v1."
});
const Ro = [
  T,
  tt,
  P,
  F,
  q,
  Ot,
  y`
    ha-card {
      container-type: inline-size;
    }
    .w {
      padding: 12px 14px;
      border-left: 3px solid transparent;
    }
    .w.warning-surface,
    .w:has(.well.not-closed) {
      border-left-color: var(--warning-color);
      background: var(--dashboard-warning-surface);
    }
    .row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
    }
    .identity {
      min-width: 0;
      min-height: 44px;
      padding: 0;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      gap: 12px;
      align-items: center;
      text-align: left;
      border-radius: var(--dashboard-radius-control);
    }
    .well {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-icon);
      display: grid;
      place-items: center;
      background: transparent;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .well.not-closed {
      color: var(--warning-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .name,
    .state {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .state {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .action {
      min-width: 104px;
      min-height: 44px;
      padding: 0 16px;
      border-radius: var(--dashboard-radius-control);
      font-size: 13px;
      font-weight: 650;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      cursor: pointer;
    }
    .action:active {
      transform: scale(0.98);
    }
    .action.secondary {
      background: transparent;
      border: var(--dashboard-card-border);
      color: var(--primary-color);
    }
    .action.secondary:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .dialog-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }
    .dialog-box {
      width: min(380px, calc(100vw - 32px));
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .dialog-head {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--divider-color);
      font-size: 15px;
      font-weight: 650;
      color: var(--warning-color);
    }
    .dialog-body {
      padding: 16px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid var(--divider-color);
    }
  `
];
var Lo = Object.defineProperty, Io = Object.getOwnPropertyDescriptor, Ne = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Io(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Lo(e, i, a), a;
};
let bt = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._pendingLabel = "", this._message = "", this._messageType = "info", this._messageTimer = null, this._confirmation = null, this._requestGeneration = 0, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.entity)
      throw new Error("A garage-door state entity is required");
    if (!t?.control_entity)
      throw new Error("A garage-door control entity is required");
    this._messageTimer && clearTimeout(this._messageTimer), this._messageTimer = null, this._requestGeneration += 1, this._cancelConfirmation(new Error("Garage configuration changed")), this._busy = !1, this._pendingLabel = "", this._message = "", this._messageType = "info";
    const e = t.confirmation_timeout ?? t.confirm_timeout;
    super.setConfig({
      ...t,
      confirmation_timeout: Math.max(3e3, Number(e) || 2e4)
    });
  }
  getCardSize() {
    return 1;
  }
  _entityState(t) {
    return t ? this.hass?.states?.[t] ?? null : null;
  }
  _controlEntityId() {
    return String(this._config?.control_entity || this._config?.entity || "") || null;
  }
  _status() {
    const t = this._entityState(this._config?.entity), e = this._entityState(this._controlEntityId()), i = this._entityState(this._config?.availability_entity), r = !!this._config?.availability_entity && (!i || i.state !== "on") || !e || ot(e), a = String(t?.state || "unknown").toLowerCase(), s = a === "on" || a === "off", n = s && a === "off", c = s && a === "on", l = !t || ot(t);
    return {
      state: t,
      control: e,
      controllerUnavailable: r,
      stateUnavailable: l,
      known: s,
      closed: n,
      notClosed: c,
      reed: a
    };
  }
  _setMessage(t, e = "info", i = 2600) {
    this._messageTimer && clearTimeout(this._messageTimer), this._message = t, this._messageType = e, i && (this._messageTimer = setTimeout(() => {
      this._messageTimer = null, this._message = "", this._messageType = "info";
    }, i));
  }
  _waitForConfirmation(t) {
    this._cancelConfirmation(new Error("Garage confirmation superseded"));
    const e = this._config?.confirmation_timeout || 2e4;
    return new Promise((i, r) => {
      const a = setTimeout(() => {
        this._confirmation?.timer === a && (this._confirmation = null, r(new Error("Garage state confirmation timed out")));
      }, e);
      this._confirmation = { expected: t, resolve: i, reject: r, timer: a }, this._checkConfirmation();
    });
  }
  _checkConfirmation() {
    const t = this._confirmation;
    if (!t) return;
    const e = String(
      this._entityState(this._config?.entity)?.state || "unknown"
    ).toLowerCase();
    (t.expected ? e === t.expected : e === "on" || e === "off") && (clearTimeout(t.timer), this._confirmation = null, t.resolve(e));
  }
  _cancelConfirmation(t) {
    const e = this._confirmation;
    e && (clearTimeout(e.timer), this._confirmation = null, e.reject(t));
  }
  async _requestAction() {
    const t = this._status();
    if (t.controllerUnavailable || this._busy || !this.hass) return;
    const e = t.closed ? "on" : t.notClosed ? "off" : null, i = this._requestGeneration;
    this._busy = !0, this._pendingLabel = "Sending", this._message = "", this._messageType = "info";
    let r;
    try {
      r = this._waitForConfirmation(e), r.catch(() => {
      });
      const a = this._controlEntityId();
      if (!a) return;
      const s = a.split(".")[0];
      if (s === "cover" ? await this.hass.callService("cover", "toggle", { entity_id: a }) : s === "switch" ? await this.hass.callService("switch", "toggle", { entity_id: a }) : s === "button" ? await this.hass.callService("button", "press", { entity_id: a }) : s === "script" ? await this.hass.callService("script", "turn_on", { entity_id: a }) : await this.hass.callService("homeassistant", "toggle", { entity_id: a }), i !== this._requestGeneration) return;
      this._pendingLabel = e === "on" ? "Opening" : e === "off" ? "Closing" : "Waiting";
      const n = await r;
      if (i !== this._requestGeneration) return;
      this._setMessage(
        n === "off" ? "Closed confirmed." : n === "on" ? "Door movement confirmed." : "Garage state confirmed."
      );
    } catch (a) {
      if (i !== this._requestGeneration) return;
      this._cancelConfirmation(
        a instanceof Error ? a : new Error("Garage command failed")
      );
      const s = String(a?.message || "");
      this._setMessage(
        s.includes("timed out") ? "The command was sent, but the door state was not confirmed." : "The garage-door command failed.",
        "error",
        5e3
      );
    } finally {
      i === this._requestGeneration && (this._busy = !1, this._pendingLabel = "");
    }
  }
  willUpdate() {
    this._checkConfirmation();
  }
  disconnectedCallback() {
    this._messageTimer && clearTimeout(this._messageTimer), this._messageTimer = null, this._requestGeneration += 1, this._cancelConfirmation(new Error("Garage controller disconnected"));
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], this._busy = !1, this._pendingLabel = "", this._message = "", this._messageType = "info", super.disconnectedCallback();
  }
  updated() {
    for (const i of this._interactionHandles) i.destroy();
    this._interactionHandles = [];
    const t = this.renderRoot.querySelector(
      ".identity"
    ), e = this.renderRoot.querySelector(
      ".action"
    );
    t && this._interactionHandles.push(
      S(t, {
        primary: () => this.moreInfo(this._config?.entity),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    ), e && this._interactionHandles.push(
      S(e, {
        primary: () => this._requestAction(),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._status(), i = (t.state?.attributes?.friendly_name || "").replace(/\s*Garage Door Status$/i, "").trim(), r = this._config.title || i || "Garage door", a = t.controllerUnavailable ? "Controller unavailable" : t.closed ? "Closed" : t.notClosed ? "Not closed" : t.stateUnavailable ? "Door state unavailable" : "Door state unknown", s = t.closed ? "Open" : "Trigger", n = t.controllerUnavailable || this._busy;
    return o`
      <ha-card>
        <div class="w">
          <div class="row">
            <button
              class="identity"
              type="button"
              aria-label="Open details for ${this.esc(r)}"
              @click=${() => this.moreInfo(this._config?.entity || this._config?.control_entity)}
            >
              <span class="well ${t.notClosed ? "not-closed" : ""}">
                <ha-icon
                  icon="${t.controllerUnavailable || !t.known ? "mdi:garage-alert" : t.notClosed ? "mdi:garage-open" : "mdi:garage"}"
                ></ha-icon>
              </span>
              <span class="copy">
                <span class="name">${this.esc(r)}</span>
                <span class="state" role="status" aria-live="polite"
                  >${this.esc(a)}</span
                >
              </span>
            </button>
            <button
              class="action ${this._busy ? "pending" : ""}"
              type="button"
              ?disabled=${n}
              aria-disabled="${String(n)}"
              @click=${() => this._requestAction()}
              aria-label="${t.controllerUnavailable ? "Garage door controller unavailable" : this._busy ? `${this._pendingLabel || "Waiting for"} garage door state confirmation` : t.closed ? "Open garage door" : "Trigger garage door operator"}"
            >
              <ha-icon
                icon="${this._busy ? "mdi:progress-clock" : t.closed ? "mdi:garage-open" : "mdi:gesture-tap-button"}"
              ></ha-icon>
              <span
                >${this.esc(this._busy ? this._pendingLabel || "Waiting" : s)}</span
              >
            </button>
          </div>
          ${this._message ? o`
                  <p
                    class="feedback ${this._messageType === "error" ? "error" : ""}"
                    role="status"
                    aria-live="polite"
                  >
                    ${this.esc(this._message)}
                  </p>
                ` : ""}
        </div>
      </ha-card>
    `;
  }
};
bt.styles = Ro;
Ne([
  x()
], bt.prototype, "_busy", 2);
Ne([
  x()
], bt.prototype, "_pendingLabel", 2);
Ne([
  x()
], bt.prototype, "_message", 2);
Ne([
  x()
], bt.prototype, "_messageType", 2);
bt = Ne([
  k("component-garage-door-controller-v1")
], bt);
E({
  type: "component-garage-door-controller-v1",
  element: bt,
  name: "Garage Door Controller",
  description: "A garage-door controller for a closed-position reed sensor and momentary operator trigger."
});
const Mo = [
  T,
  tt,
  P,
  F,
  Dt,
  q,
  wi,
  sr,
  Ot,
  la,
  y`
    ha-card {
      container-type: inline-size;
    }
    .w {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .hd {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 44px;
      align-items: center;
      gap: 12px;
    }
    .hd.settings {
      grid-template-columns: minmax(0, 1fr) 44px 44px;
      gap: 8px;
    }
    .idn {
      min-width: 0;
      min-height: 44px;
      padding: 0;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      text-align: left;
      border-radius: var(--dashboard-radius-control);
    }
    .iw {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-icon);
      display: grid;
      place-items: center;
      background: transparent;
      color: var(--primary-color);
    }
    .iw.control-radius {
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .cp {
      min-width: 0;
    }
    .nm,
    .st {
      display: block;
    }
    .nm {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .st {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pw {
      width: 44px;
      height: 44px;
      padding: 0;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--secondary-text-color);
      display: grid;
      place-items: center;
    }
    .pw:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .pw.on {
      color: var(--primary-color);
    }
    button[disabled],
    button[aria-disabled="true"] {
      opacity: 0.45;
      cursor: default;
    }
    .ct {
      margin-top: 0;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .cr {
      display: grid;
      grid-template-columns: minmax(120px, 1fr) auto;
      align-items: center;
      gap: 16px;
    }
    .cr.to {
      grid-template-columns: auto;
      justify-content: end;
    }
    .rv {
      font-size: 20px;
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
    .ml {
      display: block;
      margin-top: 4px;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.25;
    }
    .tc {
      min-height: 48px;
      display: inline-grid;
      grid-template-columns: 44px minmax(82px, auto) 44px;
      align-items: center;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      overflow: hidden;
    }
    .tb {
      width: 44px;
      height: 48px;
      padding: 0;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      background: transparent;
      border: 0;
    }
    .tb:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .tp {
      min-width: 0;
      padding: 0 8px;
      text-align: center;
    }
    .tv {
      font-size: 15px;
      line-height: 1.1;
      font-weight: 550;
      font-variant-numeric: tabular-nums;
    }
    .ts {
      margin-top: 3px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.1;
      white-space: nowrap;
    }
    .os,
    .uv {
      font-size: 12.5px;
      line-height: 1.35;
      color: var(--secondary-text-color);
    }
    .as {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 0;
    }
    .a {
      min-width: 0;
      min-height: 44px;
      flex: 1 1 110px;
      padding: 0 10px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      color: var(--secondary-text-color);
      background: transparent;
    }
    .a:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .a ha-icon {
      --mdc-icon-size: 18px;
    }
    .al {
      min-width: 0;
      font-size: 12.5px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .a.av,
    .a[aria-expanded="true"] {
      color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }
    .pn {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      overscroll-behavior: contain;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }
    .pd {
      width: min(380px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      overflow: auto;
      overscroll-behavior: contain;
      padding: 12px 16px 16px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-shadow: var(--dashboard-dialog-shadow);
    }
    .ph {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-bottom: 1px solid var(--divider-color);
      padding-bottom: 8px;
      margin-bottom: 12px;
    }
    .pt {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
    }
    .x {
      width: 32px;
      height: 32px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      background: transparent;
    }
    .x:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .og + .og {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .gt {
      margin: 0 4px 8px;
      font-size: 11.5px;
      font-weight: 650;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .qs {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .o {
      min-height: 48px;
      width: 100%;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr) 20px;
      align-items: center;
      gap: 8px;
      text-align: left;
      background: transparent;
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .o:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .oi {
      color: var(--secondary-text-color);
    }
    .o[aria-selected="true"] {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }
    .o[aria-selected="true"] .oi {
      color: var(--primary-color);
    }
    .tpr {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .tpr button,
    .tcu button,
    .tac button {
      min-height: 44px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      font-size: 13px;
      font-weight: 650;
    }
    .tpr button:hover,
    .tcu button:hover,
    .tac button:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .tpr button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .tcu {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: end;
      gap: 8px;
      margin-top: 12px;
    }
    .tcu label {
      font-size: 12.5px;
      color: var(--secondary-text-color);
    }
    .tcu input {
      display: block;
      width: 100%;
      height: 44px;
      margin-top: 6px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      font-size: 13px;
    }
    .tcu button {
      padding: 0 14px;
      color: var(--primary-color);
    }
    .tac {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 12px;
    }
    .tac button:first-child {
      color: var(--primary-color);
    }
    .tac button:last-child {
      color: var(--error-color);
    }
    .fb {
      font-size: 12px;
      line-height: 1.35;
      color: var(--secondary-text-color);
    }
    .fb:not(:empty) {
      margin-top: 10px;
    }
    .fb.er {
      color: var(--error-color);
    }
    @container (max-width: 400px) {
      .as .a {
        flex-basis: calc(50% - 4px);
      }
    }
    @container (max-width: 340px) {
      .cr {
        grid-template-columns: 1fr;
        justify-content: stretch;
      }
      .tc {
        width: 100%;
      }
    }
  `
];
var qo = Object.defineProperty, jo = Object.getOwnPropertyDescriptor, fr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? jo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && qo(e, i, a), a;
};
const pe = (t) => !t || ["unknown", "unavailable"].includes(t.state), at = (t) => String(t || "").replaceAll("_", " ").replace(/^./, (e) => e.toUpperCase()), ue = (t) => Number.isFinite(Number(t)) ? Number(t).toFixed(Number(t) % 1 ? 1 : 0) + "°" : "—";
let Yt = class extends A {
  constructor() {
    super(...arguments), this._activePanel = null, this._optimisticTemp = null, this._interactionHandles = [], this._tempCoalescer = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.entity) throw new Error("A climate entity is required");
    super.setConfig({
      type: "custom:component-split-controller-v4",
      entity: t.entity,
      title: t.title,
      vertical_vane_entity: t.vertical_vane_entity || t.vertical_vane,
      horizontal_vane_entity: t.horizontal_vane_entity || t.horizontal_vane,
      timer_entity: t.timer_entity,
      settings_entities: t.settings_entities || [],
      profile_entities: t.profile_entities || []
    });
  }
  getCardSize() {
    return 1;
  }
  _state(t = this._config?.entity) {
    return t ? this.hass?.states?.[t] : void 0;
  }
  _call(t, e, i) {
    return this.hass?.callService?.(t, e, i);
  }
  async _power() {
    if (!this._config?.entity || !this.hass) return;
    const t = this._state();
    if (!t || pe(t)) return;
    if (t.state === "off") {
      const r = (t.attributes?.hvac_modes || []).find((a) => a !== "off") || "cool";
      try {
        await this.hass.callService("climate", "set_hvac_mode", {
          entity_id: this._config.entity,
          hvac_mode: r
        });
      } catch {
        await this.hass.callService("climate", "turn_on", {
          entity_id: this._config.entity
        });
      }
    } else
      try {
        await this.hass.callService("climate", "set_hvac_mode", {
          entity_id: this._config.entity,
          hvac_mode: "off"
        });
      } catch {
        await this.hass.callService("climate", "turn_off", {
          entity_id: this._config.entity
        });
      }
  }
  _getTempCoalescer() {
    return this._tempCoalescer ? this._tempCoalescer : (this._tempCoalescer = rr(
      async (t) => {
        !this._config?.entity || !this.hass || (await this.hass.callService("climate", "set_temperature", {
          entity_id: this._config.entity,
          temperature: t
        }), await ye(
          this.hass,
          this._config.entity,
          (e, i) => {
            const r = Number(i?.attributes?.temperature);
            return Number.isFinite(r) && Math.abs(r - t) <= 0.1;
          },
          { timeout: 5e3 }
        ));
      },
      {
        onSuccess: (t) => {
          this._optimisticTemp === t && (this._optimisticTemp = null);
        },
        onError: () => {
          this._optimisticTemp = null;
        }
      }
    ), this._tempCoalescer);
  }
  _temperature(t) {
    const e = this._state()?.attributes || {}, i = this._optimisticTemp ?? Number(e.temperature) ?? 21, r = Number(e.target_temp_step || e.step) || 0.5, a = Number(e.min_temp) || 16, s = Number(e.max_temp) || 31, n = Math.min(s, Math.max(a, Number((i + t * r).toFixed(1))));
    this._optimisticTemp = n, this._getTempCoalescer().request(n);
  }
  _vanes() {
    return [
      ["Vertical", this._config?.vertical_vane_entity],
      ["Horizontal", this._config?.horizontal_vane_entity]
    ].flatMap(([e, i]) => {
      const r = this._state(i);
      return i && r && !pe(r) ? [{ axis: e, entity: i, state: r }] : [];
    });
  }
  _closeOverlay() {
    this._activePanel = null;
  }
  _openPanel(t) {
    this._activePanel = t;
  }
  disconnectedCallback() {
    this._tempCoalescer?.destroy(), this._tempCoalescer = null, this._optimisticTemp = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._state(), e = t?.attributes || {}, i = t && !pe(t) && t.state !== "off", r = this._state(this._config.timer_entity), s = this._vanes().map((d) => `${d.axis.slice(0, 1)} ${at(d.state.state)}`).join(" · "), n = this._config.title || e.friendly_name || "Split system", c = pe(t) ? "Unavailable" : i ? at(t?.state) : "Off", l = this._optimisticTemp ?? e.temperature, p = {
      cool: "mdi:snowflake",
      heat: "mdi:fire",
      dry: "mdi:water-percent",
      fan_only: "mdi:fan",
      auto: "mdi:thermostat-auto",
      off: "mdi:power"
    }, f = String(t?.state || "off").toLowerCase(), g = p[f] || "mdi:thermostat";
    return o`
      <ha-card>
        <div class="w">
          <div class="hd settings">
            <button
              class="idn"
              type="button"
              @click=${() => this.moreInfo(this._config?.entity)}
            >
              <span class="iw"><ha-icon icon="${g}"></ha-icon></span>
              <span class="cp">
                <span class="nm">${this.esc(n)}</span>
                <span class="st" role="status">${this.esc(c)}</span>
              </span>
            </button>
            <button
              class="pw sg"
              type="button"
              aria-label="Advanced settings"
              @click=${() => this._openPanel("settings")}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            <button
              class="pw power-btn ${i ? "on" : ""}"
              type="button"
              aria-label="Toggle split system power"
              ?disabled=${pe(t)}
              aria-pressed="${String(i)}"
              @click=${() => this._power()}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>

          <div class="ct">
            <div class="cr">
              <div class="rm">
                <span class="rv"
                  >${ue(e.current_temperature)}</span
                >
                <span class="ml">Room temperature</span>
              </div>
              <div class="tc">
                <button
                  class="tb decrease"
                  type="button"
                  aria-label="Decrease target temperature"
                  ?disabled=${!i}
                  aria-disabled="${String(!i)}"
                  @click=${() => this._temperature(-1)}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <div class="tp">
                  <div class="tv">${ue(l)}</div>
                  <div class="ts">Target</div>
                </div>
                <button
                  class="tb increase"
                  type="button"
                  aria-label="Increase target temperature"
                  ?disabled=${!i}
                  aria-disabled="${String(!i)}"
                  @click=${() => this._temperature(1)}
                >
                  <ha-icon icon="mdi:plus"></ha-icon>
                </button>
              </div>
            </div>

            <div class="as">
              <button
                class="a ma"
                type="button"
                data-panel="mode"
                aria-expanded="${String(this._activePanel === "mode")}"
                aria-label="HVAC mode: ${at(t?.state)}"
                @click=${() => this._openPanel("mode")}
              >
                <ha-icon icon="${g}"></ha-icon>
                <span class="al">Mode · ${at(t?.state)}</span>
              </button>
              <button
                class="a fa"
                type="button"
                data-panel="fan"
                aria-expanded="${String(this._activePanel === "fan")}"
                aria-label="Fan speed: ${at(e.fan_mode)}"
                @click=${() => this._openPanel("fan")}
              >
                <ha-icon icon="mdi:fan"></ha-icon>
                <span class="al">Fan · ${at(e.fan_mode)}</span>
              </button>
              ${s ? o`
                      <button
                        class="a va"
                        type="button"
                        data-panel="vanes"
                        aria-expanded="${String(this._activePanel === "vanes")}"
                        aria-label="Vanes: ${s}"
                        @click=${() => this._openPanel("vanes")}
                      >
                        <ha-icon icon="mdi:swap-vertical"></ha-icon>
                        <span class="al">Vanes · ${this.esc(s)}</span>
                      </button>
                    ` : ""}
              ${this._config.timer_entity ? o`
                      <button
                        class="a ta ${r?.state === "active" ? "av" : ""}"
                        type="button"
                        data-panel="timer"
                        aria-expanded="${String(this._activePanel === "timer")}"
                        aria-label="Off timer: ${r?.state === "active" ? "Active" : "Off"}"
                        @click=${() => this._openPanel("timer")}
                      >
                        <ha-icon icon="mdi:timer-outline"></ha-icon>
                        <span class="al"
                          >${r?.state === "active" ? "Timer · Active" : "Timer"}</span
                        >
                      </button>
                    ` : ""}
            </div>
          </div>
        </div>
      </ha-card>

      ${this._activePanel ? this._renderOverlay() : ""}
    `;
  }
  _renderOverlay() {
    const e = {
      mode: "Mode",
      fan: "Fan",
      vanes: "Vanes",
      timer: "Off timer",
      settings: "Settings"
    }[this._activePanel] || "Settings";
    return o`
      <section
        class="pn"
        id="split-secondary"
        role="dialog"
        aria-modal="true"
        aria-label="${e}"
        @keydown=${(i) => {
      i.key === "Escape" && (i.stopPropagation(), this._closeOverlay());
    }}
        @click=${(i) => {
      i.target === this.renderRoot.querySelector(".pn") && this._closeOverlay();
    }}
      >
        <div class="pd">
          <div class="ph">
            <h3 class="pt">${e}</h3>
            <button
              class="x"
              type="button"
              aria-label="Close"
              @click=${this._closeDialog}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="pb">${this._renderPanelContent()}</div>
        </div>
      </section>
    `;
  }
  _closeDialog() {
    this._closeOverlay();
  }
  _renderPanelContent() {
    const t = this._state(), e = t?.attributes || {}, i = {
      cool: "mdi:snowflake",
      heat: "mdi:fire",
      dry: "mdi:water-percent",
      fan_only: "mdi:fan",
      auto: "mdi:thermostat-auto",
      off: "mdi:power"
    };
    if (this._activePanel === "mode") {
      const n = e.hvac_modes || [];
      return o`
        <div class="qs choices">
          ${n.map(
        (c) => o`
              <button
                class="o choice"
                type="button"
                aria-selected="${String(c === t?.state)}"
                @click=${() => {
          this._call("climate", "set_hvac_mode", {
            entity_id: this._config?.entity,
            hvac_mode: c
          }), this._closeOverlay();
        }}
              >
                <span><ha-icon icon="${i[c] || "mdi:thermostat"}"></ha-icon></span>
                <span>${at(c)}</span>
                <span class="oi"><ha-icon icon="mdi:check"></ha-icon></span>
              </button>
            `
      )}
        </div>
      `;
    }
    if (this._activePanel === "fan") {
      const n = e.fan_modes || [];
      return o`
        <div class="qs choices">
          ${n.map(
        (c) => o`
              <button
                class="o choice"
                type="button"
                aria-selected="${String(c === e.fan_mode)}"
                @click=${() => {
          this._call("climate", "set_fan_mode", {
            entity_id: this._config?.entity,
            fan_mode: c
          }), this._closeOverlay();
        }}
              >
                <span><ha-icon icon="mdi:fan"></ha-icon></span>
                <span>${at(c)}</span>
                <span class="oi"><ha-icon icon="mdi:check"></ha-icon></span>
              </button>
            `
      )}
        </div>
      `;
    }
    if (this._activePanel === "vanes") {
      const n = this._vanes();
      return o`
        ${n.map(
        (c) => o`
            <section class="group og">
              <p class="gt">${c.axis} vane</p>
              <div class="qs choices">
                ${(c.state.attributes?.options || []).map(
          (l) => o`
                    <button
                      class="o choice"
                      type="button"
                      aria-selected="${String(l === c.state.state)}"
                      @click=${() => {
            this._call("select", "select_option", {
              entity_id: c.entity,
              option: l
            }), this._closeOverlay();
          }}
                    >
                      <span></span>
                      <span>${at(l)}</span>
                      <span class="oi"></span>
                    </button>
                  `
        )}
              </div>
            </section>
          `
      )}
      `;
    }
    if (this._activePanel === "timer")
      return o`
        <div class="tpr timers">
          ${[
        ["30 min", "00:30:00"],
        ["1 hour", "01:00:00"],
        ["2 hours", "02:00:00"]
      ].map(
        ([n, c]) => o`
              <button
                type="button"
                @click=${() => {
          this._call("timer", "start", {
            entity_id: this._config?.timer_entity,
            duration: c
          }), this._closeOverlay();
        }}
              >
                ${n}
              </button>
            `
      )}
        </div>
        <div class="tac">
          <button
            type="button"
            @click=${() => {
        this._call("timer", "cancel", {
          entity_id: this._config?.timer_entity
        }), this._closeOverlay();
      }}
          >
            Cancel timer
          </button>
        </div>
      `;
    const r = Number(e.min_temp), a = Number(e.max_temp), s = Number(e.target_temp_step) || 0.5;
    return o`
      <p class="fb">
        Native Home Assistant controls · ${ue(r)}–${ue(a)}
        · ${ue(s)} steps
      </p>
      <div class="qs og">
        ${this._vanes().length ? o`
                <button
                  class="o"
                  type="button"
                  @click=${() => this._openPanel("vanes")}
                >
                  <span></span>
                  <span>Vane settings</span>
                  <span class="oi"></span>
                </button>
              ` : ""}
        ${this._config?.timer_entity ? o`
                <button
                  class="o"
                  type="button"
                  @click=${() => this._openPanel("timer")}
                >
                  <span></span>
                  <span>Off timer</span>
                  <span class="oi"></span>
                </button>
              ` : ""}
      </div>
      <div class="og">
        ${[
      ...this._config?.settings_entities || [],
      ...this._config?.profile_entities || []
    ].map((n) => {
      const c = typeof n == "string" ? n : n?.entity;
      if (!c) return "";
      const l = typeof n == "object" && n.name ? n.name : this._state(c)?.attributes?.friendly_name || c;
      return o`
            <button
              class="o setting"
              type="button"
              style="margin-bottom: 6px;"
              @click=${() => {
        const [p] = c.split(".");
        this._call(p, "turn_on", { entity_id: c }), this._closeOverlay();
      }}
            >
              <span></span>
              <span>${this.esc(l)}</span>
              <span class="oi"></span>
            </button>
          `;
    })}
      </div>
    `;
  }
};
Yt.styles = Mo;
fr([
  x()
], Yt.prototype, "_activePanel", 2);
fr([
  x()
], Yt.prototype, "_optimisticTemp", 2);
Yt = fr([
  k("component-split-controller-v4")
], Yt);
E({
  type: "component-split-controller-v4",
  element: Yt,
  name: "Split-System Controller",
  description: "Direct Home Assistant climate controls with the established Split System presentation."
});
const Uo = [
  T,
  P,
  F,
  Dt,
  q,
  wi,
  Ot,
  y`
    ha-card {
      display: block;
      overflow: hidden;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      box-shadow: none;
      color: var(--primary-text-color);
    }
    .head {
      min-height: 44px;
      padding: 10px 14px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .ico {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .ico ha-icon {
      --mdc-icon-size: 20px;
    }
    .on .ico {
      color: var(--primary-color);
    }
    .identity {
      appearance: none;
      border: 0;
      background: transparent;
      min-width: 0;
      padding: 0;
      text-align: left;
      cursor: pointer;
    }
    .name,
    .status {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .status {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .power,
    .action,
    .close {
      appearance: none;
      border: var(--dashboard-card-border);
      background: transparent;
      border-radius: var(--dashboard-radius-control);
      cursor: pointer;
    }
    .power {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .power ha-icon {
      --mdc-icon-size: 20px;
    }
    .on .power {
      color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }
    .body {
      padding: 0 14px 14px;
      display: grid;
      gap: 10px;
    }
    .slider-wrap {
      display: grid;
      gap: 4px;
    }
    .slider-track {
      width: 100%;
      height: 6px;
      border-radius: var(--dashboard-radius-control);
      background: var(--divider-color);
      overflow: hidden;
    }
    .slider-fill {
      height: 100%;
      background: var(--primary-color);
      border-radius: inherit;
    }
    .actions-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .action {
      min-height: 36px;
      padding: 0 12px;
      font-size: 12.5px;
      font-weight: 600;
      color: var(--primary-color);
      background: var(--dashboard-card-muted-surface);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .action:hover {
      background: var(--dashboard-active-surface);
    }
    .dialog-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }
    .dialog-box {
      width: min(440px, calc(100vw - 32px));
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .dialog-head {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--divider-color);
      font-size: 15px;
      font-weight: 650;
    }
    .dialog-body {
      padding: 16px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
  `
];
var Bo = Object.defineProperty, Fo = Object.getOwnPropertyDescriptor, oe = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Fo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Bo(e, i, a), a;
};
let lt = class extends A {
  constructor() {
    super(...arguments), this._registries = null, this._bundle = null, this._brightnessIntent = null, this._speedIntent = null, this._intensityIntent = null, this._unsubRegistry = null, this._brightnessCoalescer = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.entity) throw new Error("WLED controller requires entity");
    super.setConfig({ ...t }), this._bundle = null, this._loadRegistries();
  }
  getCardSize() {
    return 2;
  }
  _loadRegistries() {
    this.hass && I.load(this.hass).then((t) => {
      this._registries = t, this._bundle = this._resolveBundle();
    });
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = I.subscribe(this.hass, (t) => {
      this._registries = t, this._bundle = this._resolveBundle();
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._brightnessCoalescer?.destroy(), this._brightnessCoalescer = null, this._brightnessIntent = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    !this._unsubRegistry && this.isConnected && this.hass && (this._unsubRegistry = I.subscribe(this.hass, (t) => {
      this._registries = t, this._bundle = this._resolveBundle();
    })), !this._bundle && this.hass && this._registries && (this._bundle = this._resolveBundle());
  }
  _resolveBundle() {
    if (!this._config?.entity || !this.hass) return null;
    const e = (this._registries?.entities || []).find((v) => v.entity_id === this._config.entity), i = this._config.device_id || e?.device_id, a = ((i ? this._registries?.byDevice?.get(i) : []) || []).filter(
      (v) => v?.platform === "wled" && !v.disabled_by && this.hass?.states[v.entity_id]
    ), s = a.filter((v) => qi(v.entity_id) === "light"), n = s.find((v) => v.entity_id === this._config.entity) || s.find((v) => Sa(v) === "main") || s[0], c = s.filter(
      (v) => Array.isArray(this.hass?.states[v.entity_id]?.attributes?.effect_list)
    ), l = a.filter(
      (v) => qi(v.entity_id) === "select"
    ), p = a.filter(
      (v) => qi(v.entity_id) === "number"
    ), f = (v, z) => z.test(`${v.entity_id} ${v.original_name || ""} ${v.name || ""}`), g = l.find((v) => f(v, /\bpreset\b/i)), d = l.filter(
      (v) => f(v, /color.?palette|colour.?palette/i)
    ), u = p.filter((v) => f(v, /\bspeed\b/i)), h = p.filter((v) => f(v, /\bintensity\b/i)), b = this._registries?.devices?.find((v) => v.id === i), m = n?.entity_id || this._config.entity, _ = c.length ? c.map((v) => v.entity_id) : this.hass.states[m]?.attributes?.effect_list ? [m] : [], $ = b?.name_by_user || b?.name || this.hass?.states[m]?.attributes?.friendly_name || "WLED";
    return {
      deviceId: i || void 0,
      deviceName: $,
      main: m,
      effectLights: _,
      preset: g?.entity_id || null,
      palettes: d.map((v) => v.entity_id),
      speeds: u.map((v) => v.entity_id),
      intensities: h.map((v) => v.entity_id)
    };
  }
  _pct(t) {
    const e = Number(t);
    return Number.isFinite(e) ? `${Math.round(e / 255 * 100)}%` : "—";
  }
  async _togglePower() {
    const t = this._bundle?.main || this._config?.entity, e = t ? this.hass?.states?.[t] : null;
    if (!t || !this.hass) return;
    const i = e?.state === "on";
    await this.hass.callService("light", "toggle", { entity_id: t }), await ye(
      this.hass,
      t,
      (r) => r === (i ? "off" : "on"),
      { timeout: 5e3 }
    );
  }
  _getBrightnessCoalescer() {
    return this._brightnessCoalescer ? this._brightnessCoalescer : (this._brightnessCoalescer = rr(
      async (t) => {
        const e = this._bundle?.main;
        !e || !this.hass || (t <= 0 ? await this.hass.callService("light", "turn_off", { entity_id: e }) : await this.hass.callService("light", "turn_on", {
          entity_id: e,
          brightness: t
        }), await ye(
          this.hass,
          e,
          (i, r) => t <= 0 ? i === "off" : i === "on" && Math.abs(Number(r?.attributes?.brightness ?? -999) - t) <= 2,
          { timeout: 7e3 }
        ));
      },
      {
        onSuccess: (t) => {
          this._brightnessIntent === t && (this._brightnessIntent = null);
        },
        onError: () => {
          this._brightnessIntent = null;
        }
      }
    ), this._brightnessCoalescer);
  }
  _same(t, e) {
    if (!this.hass) return null;
    const i = t.map((r) => e(this.hass.states[r])).filter(
      (r) => r != null && !Gr.has(String(r).toLowerCase())
    );
    return i.length ? i.every((r) => String(r) === String(i[0])) ? String(i[0]) : "Mixed" : null;
  }
  async _call(t, e, i, r = {}) {
    const a = [...new Set((i || []).filter(Boolean))];
    !this.hass || !a.length || await Promise.all(
      a.map(
        (s) => this.hass.callService(t, e, { entity_id: s, ...r })
      )
    );
  }
  _openAdvanced(t = !1) {
    const e = this.renderRoot.querySelector(
      "dialog"
    );
    if (!e || !this._bundle) return;
    const i = this.hass?.states?.[this._bundle.main];
    String(i?.state || "unavailable").toLowerCase() === "on" && (e.open || e.showModal(), queueMicrotask(() => {
      t ? this.renderRoot.querySelector(".presets-section")?.scrollIntoView({ block: "start" }) : this.renderRoot.querySelector(".close")?.focus();
    }));
  }
  _closeDialog() {
    const t = this.renderRoot.querySelector(
      "dialog"
    );
    t?.open && t.close();
  }
  updated() {
    for (const c of this._interactionHandles) c.destroy();
    this._interactionHandles = [];
    const t = this.renderRoot.querySelector(
      ".power"
    ), e = this.renderRoot.querySelector(
      ".identity"
    ), i = this.renderRoot.querySelector(
      ".presets"
    ), r = this.renderRoot.querySelector(
      ".colour"
    ), a = this.renderRoot.querySelector(
      ".advanced"
    ), s = this.renderRoot.querySelector(
      ".native-colour"
    ), n = this.renderRoot.querySelector(
      ".close"
    );
    t && this._interactionHandles.push(
      S(t, {
        primary: () => this._togglePower(),
        feedback: !0
      })
    ), e && this._interactionHandles.push(
      S(e, {
        primary: () => this._openAdvanced(!1),
        hold: () => this.moreInfo(this._bundle?.main),
        feedback: !0
      })
    ), i && this._interactionHandles.push(
      S(i, {
        primary: () => this._openAdvanced(!0),
        feedback: !0
      })
    ), r && this._interactionHandles.push(
      S(r, {
        primary: () => this.moreInfo(
          this._bundle?.effectLights?.[0] || this._bundle?.main
        ),
        feedback: !0
      })
    ), a && this._interactionHandles.push(
      S(a, {
        primary: () => this._openAdvanced(!1),
        feedback: !0
      })
    ), s && this._interactionHandles.push(
      S(s, {
        primary: () => this.moreInfo(
          this._bundle?.effectLights?.[0] || this._bundle?.main
        ),
        feedback: !0
      })
    ), n && this._interactionHandles.push(
      S(n, {
        primary: () => this._closeDialog(),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config || !this.hass) return o``;
    const t = this._bundle || this._resolveBundle();
    if (!t)
      return o`<ha-card
        ><div class="head">
          <span class="ico"
            ><ha-icon icon="mdi:led-strip-variant"></ha-icon></span
          ><span class="status">Loading…</span>
        </div></ha-card
      >`;
    const e = this.hass.states[t.main], i = String(e?.state || "unavailable").toLowerCase(), r = i === "on", a = i === "on" || i === "off", s = r ? Number(e?.attributes?.brightness ?? 0) : 0, n = this._brightnessIntent ?? s, c = this._same(
      t.effectLights,
      (C) => C?.attributes?.effect
    ), l = this._same(t.palettes, (C) => C?.state), p = this._same(t.speeds, (C) => C?.state), f = this._same(t.intensities, (C) => C?.state), g = t.preset ? this.hass.states[t.preset] : null, d = g?.attributes?.options || [], u = r ? [
      this._pct(n),
      c && c !== "Mixed" ? c : null,
      l && l !== "Mixed" ? l : null
    ].filter(Boolean).join(" · ") : i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : "Off", h = (C) => {
      const H = this.hass?.states?.[C];
      return !!(H && !Gr.has(String(H.state).toLowerCase()));
    }, b = !!(t.preset && h(t.preset)), m = t.effectLights.some(h), _ = t.palettes.some(h), $ = t.speeds.some(h), v = t.intensities.some(h), N = t.effectLights.map((C) => this.hass?.states[C]).find(Boolean)?.attributes?.effect_list || [], M = t.palettes.map((C) => this.hass?.states[C]).find(Boolean)?.attributes?.options || [];
    return o`
      <ha-card>
        <div class="head ${r ? "on" : ""}">
          <span class="ico"
            ><ha-icon icon="mdi:led-strip-variant"></ha-icon
          ></span>
          <button class="identity" type="button" @click=${() => this._openAdvanced(!1)}>
            <span class="name">${this.esc(t.deviceName)}</span>
            <span class="status">${this.esc(u)}</span>
          </button>
          <button
            class="power"
            type="button"
            aria-label="Toggle WLED"
            ?disabled=${!a}
            aria-pressed="${String(r)}"
            @click=${() => this._togglePower()}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>
        ${r ? o`
                <div class="body">
                  <div class="slider-row">
                    <span class="label">Brightness</span>
                    <input
                      class="brightness"
                      type="range"
                      min="0"
                      max="255"
                      step="1"
                      role="slider"
                      aria-label="Brightness"
                      aria-valuemin="0"
                      aria-valuemax="255"
                      aria-valuenow="${String(Math.max(0, Math.min(255, Number.isFinite(n) ? n : 0)))}"
                      .value=${String(Math.max(0, Math.min(255, Number.isFinite(n) ? n : 0)))}
                      @input=${(C) => {
      const H = Number(C.target.value);
      this._brightnessIntent = H, this._getBrightnessCoalescer().request(H);
    }}
                    />
                    <output class="brightness-value value"
                      >${this._pct(n)}</output
                    >
                  </div>
                  <div class="actions">
                    <button
                      class="action presets"
                      type="button"
                      ?disabled=${!b}
                      aria-label="WLED presets"
                      @click=${() => this._openAdvanced(!0)}
                    >
                      <ha-icon icon="mdi:bookmark-multiple-outline"></ha-icon>
                      <span>Presets</span>
                    </button>
                    <button
                      class="action colour"
                      type="button"
                      ?disabled=${!m}
                      aria-label="WLED colour"
                      @click=${() => this.moreInfo(
      t.effectLights?.[0] || t.main
    )}
                    >
                      <ha-icon icon="mdi:palette-outline"></ha-icon>
                      <span>Colour</span>
                    </button>
                    <button
                      class="action advanced"
                      type="button"
                      ?disabled=${!(b || m || _ || $ || v)}
                      aria-label="WLED advanced settings"
                      @click=${() => this._openAdvanced(!1)}
                    >
                      <ha-icon icon="mdi:tune-variant"></ha-icon>
                      <span>Advanced</span>
                    </button>
                  </div>
                </div>
              ` : ""}
      </ha-card>

      <dialog
        role="dialog"
        aria-modal="true"
        aria-label="${this.esc(t.deviceName)} settings"
        @click=${(C) => {
      const H = this.renderRoot.querySelector("dialog");
      C.target === H && H?.close();
    }}
      >
        <div class="sheet">
          <div class="sheet-head">
            <ha-icon icon="mdi:led-strip-variant"></ha-icon>
            <span class="sheet-title">
              <div class="sheet-name">${this.esc(t.deviceName)}</div>
              <div class="sheet-state">${this.esc(u)}</div>
            </span>
            <button
              class="close"
              type="button"
              aria-label="Close"
              @click=${this._closeDialog}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="sheet-body">
            <section class="section presets-section">
              <div class="section-title">Presets</div>
              <div class="preset-grid">
                ${d.length ? d.map((C) => {
      const H = String(g?.state) === String(C);
      return o`
                          <button
                            class="preset-btn ${H ? "active" : ""}"
                            type="button"
                            role="button"
                            aria-pressed="${String(H)}"
                            title="${this.esc(C)}"
                            @click=${async () => {
        await this._call(
          "select",
          "select_option",
          t.preset ? [t.preset] : [],
          { option: C }
        ), this._closeDialog();
      }}
                          >
                            ${this.esc(C)}
                          </button>
                        `;
    }) : o`<span class="label">No presets configured</span>`}
              </div>
            </section>

            <section class="section">
              <div class="section-title">Effect</div>
              <div class="fields">
                <label class="field">
                  <span>Effect</span>
                  <select
                    class="effect"
                    aria-label="Effect selection"
                    ?disabled=${!m || !N.length}
                    @change=${(C) => {
      const H = C.target.value;
      H && this._call("light", "turn_on", t.effectLights, {
        effect: H
      });
    }}
                  >
                    ${!c || c === "Mixed" ? o`<option value="" selected>
                            ${c === "Mixed" ? "Mixed" : "Choose effect"}
                          </option>` : ""}
                    ${N.map(
      (C) => o`<option
                          value="${this.esc(C)}"
                          ?selected=${c === C}
                        >
                          ${this.esc(C)}
                        </option>`
    )}
                  </select>
                </label>

                <label class="field">
                  <span>Palette</span>
                  <select
                    class="palette"
                    aria-label="Palette selection"
                    ?disabled=${!_ || !M.length}
                    @change=${(C) => {
      const H = C.target.value;
      H && this._call("select", "select_option", t.palettes, {
        option: H
      });
    }}
                  >
                    ${!l || l === "Mixed" ? o`<option value="" selected>
                            ${l === "Mixed" ? "Mixed" : "Choose palette"}
                          </option>` : ""}
                    ${M.map(
      (C) => o`<option
                          value="${this.esc(C)}"
                          ?selected=${l === C}
                        >
                          ${this.esc(C)}
                        </option>`
    )}
                  </select>
                </label>
              </div>
            </section>

            <section class="section">
              <div class="section-title">Animation</div>
              <div class="fine">
                <label class="fine-card">
                  <span class="fine-head">
                    <span>Speed</span>
                    <output class="speed-value"
                      >${this.esc(String((this._speedIntent ?? p) || "—"))}</output
                    >
                  </span>
                  <input
                    class="speed"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    role="slider"
                    aria-label="Animation speed"
                    aria-valuemin="0"
                    aria-valuemax="255"
                    aria-valuenow="${String((this._speedIntent ?? Number(p)) || 0)}"
                    .value=${String((this._speedIntent ?? Number(p)) || 0)}
                    ?disabled=${!$}
                    @input=${(C) => {
      this._speedIntent = Number(C.target.value);
    }}
                    @change=${(C) => {
      const H = Number(C.target.value);
      this._speedIntent = null, this._call("number", "set_value", t.speeds, {
        value: H
      });
    }}
                  />
                </label>

                <label class="fine-card">
                  <span class="fine-head">
                    <span>Intensity</span>
                    <output class="intensity-value"
                      >${this.esc(String((this._intensityIntent ?? f) || "—"))}</output
                    >
                  </span>
                  <input
                    class="intensity"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    role="slider"
                    aria-label="Animation intensity"
                    aria-valuemin="0"
                    aria-valuemax="255"
                    aria-valuenow="${String((this._intensityIntent ?? Number(f)) || 0)}"
                    .value=${String((this._intensityIntent ?? Number(f)) || 0)}
                    ?disabled=${!v}
                    @input=${(C) => {
      this._intensityIntent = Number(C.target.value);
    }}
                    @change=${(C) => {
      const H = Number(C.target.value);
      this._intensityIntent = null, this._call("number", "set_value", t.intensities, {
        value: H
      });
    }}
                  />
                </label>

              </div>
            </section>


            <div class="native">
              <button
                class="action native-colour"
                type="button"
                ?disabled=${!m}
              >
                <ha-icon icon="mdi:palette-outline"></ha-icon>
                <span>Colour & white controls</span>
              </button>
            </div>
          </div>
        </div>
      </dialog>
    `;
  }
};
lt.styles = Uo;
oe([
  x()
], lt.prototype, "_registries", 2);
oe([
  x()
], lt.prototype, "_bundle", 2);
oe([
  x()
], lt.prototype, "_brightnessIntent", 2);
oe([
  x()
], lt.prototype, "_speedIntent", 2);
oe([
  x()
], lt.prototype, "_intensityIntent", 2);
lt = oe([
  k("component-wled-controller-v1")
], lt);
E({
  type: "component-wled-controller-v1",
  element: lt,
  name: "WLED Controller V1",
  description: "Minimal WLED control with advanced settings sheet."
});
const Vo = [
  T,
  P,
  pt,
  y`
    .wrap {
      padding: 14px;
    }
    .head {
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }
    h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .meta {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(var(--security-columns, 2), minmax(0, 1fr));
      gap: 8px;
    }
    .empty {
      min-height: 56px;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      font-size: 12.5px;
    }
    .empty[hidden] {
      display: none;
    }
    .tile {
      min-width: 0;
      overflow: hidden;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
    }
    button {
      appearance: none;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
    }
    .media {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      overflow: hidden;
      padding: 0;
      background: #111;
      cursor: pointer;
    }
    .snapshot {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 1;
    }
    .live-label {
      position: absolute;
      right: 8px;
      bottom: 8px;
      padding: 3px 8px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(4px);
      color: #ffffff;
      font-size: 11px;
      font-weight: 650;
    }
    .live-label:before {
      content: "";
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--error-color, #e53935);
    }
    .footer {
      padding: 8px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      background: var(--dashboard-card-surface);
    }
    .name {
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .state {
      font-size: 11px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `
];
var Wo = Object.defineProperty, Go = Object.getOwnPropertyDescriptor, Ta = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Go(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Wo(e, i, a), a;
};
let Qt = class extends A {
  constructor() {
    super(...arguments), this._model = null, this._sequence = 0, this._timer = null, this._visible = !0, this._snapshotStamp = Math.floor(Date.now() / 1e4), this._profileListener = (t) => {
      t.detail?.kind === "security" && t.detail?.profileId === (this._config?.profile || "household-security") && this._refresh(!0);
    }, this._visibilityListener = () => {
      this._visible = document.visibilityState !== "hidden", this._visible && (this._snapshotStamp = Math.floor(Date.now() / 1e4), this.requestUpdate());
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      columns: 2,
      title: "Camera wall",
      refresh_seconds: 15,
      ...t,
      type: "custom:component-security-camera-wall-v3"
    });
    const e = Math.max(1, Math.min(3, Number(this._config?.columns) || 2));
    this.style.setProperty("--security-columns", String(e)), this._schedule(), this._refresh();
  }
  getCardSize() {
    return 6;
  }
  _schedule() {
    this._timer && clearInterval(this._timer), this._timer = setInterval(
      () => {
        this._visible && this.isConnected && (this._snapshotStamp = Math.floor(Date.now() / 1e4), this.requestUpdate());
      },
      Math.max(10, Number(this._config?.refresh_seconds) || 15) * 1e3
    );
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("visibilitychange", this._visibilityListener), window.addEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._schedule(), this._refresh();
  }
  disconnectedCallback() {
    document.removeEventListener("visibilitychange", this._visibilityListener), window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._timer && clearInterval(this._timer), this._timer = null, super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("hass") && this.hass && this._refresh();
  }
  async _refresh(t = !1) {
    if (!this.hass || !this._config) return;
    const e = ++this._sequence;
    try {
      const i = await Pe(
        this.hass,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && (this._model = i);
    } catch (i) {
      e === this._sequence && (this._model = { error: i, cameras: [] });
    }
  }
  _requestViewer(t, e) {
    this.dispatchEvent(
      new CustomEvent("security-camera-view-request", {
        bubbles: !0,
        composed: !0,
        detail: { camera: t, trigger: e }
      })
    );
  }
  _requestControls(t, e) {
    this.dispatchEvent(
      new CustomEvent("security-camera-control-request", {
        bubbles: !0,
        composed: !0,
        detail: { camera: t, trigger: e }
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.cameras ? Array.isArray(this._config.cameras) ? this._config.cameras : [this._config.cameras] : this._config.entities, e = this._model?.cameras || [], i = t && t.length > 0 ? e.filter(
      (n) => t.includes(n.entityId) || n.deviceId && t.includes(n.deviceId) || t.includes(n.id)
    ) : e, r = i.filter((n) => n.online).length, a = this._model?.error ? "Unavailable" : `${r}/${i.length} online`, s = this._model?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : this._model?.error ? this._model.error.message || "Camera discovery is unavailable" : "No cameras available";
    return o`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <h2>${this.esc(this._config.title || "Camera wall")}</h2>
            <span class="meta">${this.esc(a)}</span>
          </div>

          ${i.length === 0 ? o`<div class="empty">${this.esc(s)}</div>` : o`
                  <div class="grid">
                    ${i.map((n) => {
      const l = this.hass?.states[n.entityId]?.attributes?.entity_picture, p = l ? this.hass?.hassUrl ? this.hass.hassUrl(l) : l : "", f = p ? `${p}${p.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "";
      return o`
                        <article
                          class="tile ${n.online ? "" : "offline"} ${n.active ? "activity" : ""}"
                        >
                          <button
                            class="media"
                            type="button"
                            ?disabled=${!n.online}
                            aria-label="Open full live view for ${this.esc(n.name)}"
                            @click=${(g) => this._requestViewer(n, g.currentTarget)}
                          >
                            ${f ? o`
                                  <img
                                    class="snapshot ready"
                                    src="${f}"
                                    alt="${this.esc(n.name)} camera snapshot"
                                    loading="lazy"
                                  />
                                ` : ""}
                            <span class="live-label">
                              <ha-icon icon="mdi:fullscreen"></ha-icon>
                              <span>Full view</span>
                            </span>
                          </button>
                          <div class="footer">
                            <button
                              class="identity"
                              type="button"
                              ?disabled=${!n.online}
                              aria-label="Open full live view for ${this.esc(n.name)}"
                              @click=${(g) => this._requestViewer(n, g.currentTarget)}
                            >
                              <span class="name">${this.esc(n.name)}</span>
                              <span class="state">
                                ${n.active ? "Activity detected" : n.online ? "Online" : "Unavailable"}
                              </span>
                            </button>
                            <button
                              class="more"
                              type="button"
                              aria-label="Open settings for ${this.esc(n.name)}"
                              @click=${(g) => this._requestControls(n, g.currentTarget)}
                            >
                              <ha-icon icon="mdi:tune-variant"></ha-icon>
                              <span>Settings</span>
                            </button>
                          </div>
                        </article>
                      `;
    })}
                  </div>
                `}
        </div>
      </ha-card>
    `;
  }
};
Qt.stubConfig = { profile: "household-security", columns: 2 };
Qt.styles = Vo;
Ta([
  x()
], Qt.prototype, "_model", 2);
Qt = Ta([
  k("component-security-camera-wall-v3")
], Qt);
E({
  type: "component-security-camera-wall-v3",
  element: Qt,
  name: "Security Camera Wall V3",
  description: "Snapshot-first, lazy live camera wall with capability-driven controls."
});
const Ko = [
  or,
  y`
    :host {
      display: block;
      min-width: 0;
      --security-gap: 10px;
    }
    * {
      box-sizing: border-box;
    }
    button {
      font: inherit;
      color: inherit;
    }
    .page {
      display: grid;
      gap: var(--security-gap);
    }
    .panel {
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 16px);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      overflow: hidden;
    }
    .hero {
      min-height: 88px;
      padding: 14px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 14px;
    }
    .hero-main {
      min-width: 0;
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr);
      align-items: center;
      gap: 11px;
    }
    .hero-icon {
      width: 44px;
      height: 44px;
      border-radius: 13px;
      display: grid;
      place-items: center;
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
      color: var(--primary-color);
    }
    .hero-icon.attention {
      background: color-mix(
        in srgb,
        var(--warning-color, var(--error-color)) 12%,
        transparent
      );
      color: var(--warning-color, var(--error-color));
    }
    .hero-icon ha-icon {
      --mdc-icon-size: 24px;
    }
    .page-title {
      margin: 0;
      font-size: 18px;
      line-height: 1.15;
      font-weight: 700;
    }
    .status-copy {
      margin-top: 4px;
      font-size: 13px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .metrics {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 6px;
    }
    .metric {
      min-height: 34px;
      padding: 0 10px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 650;
      white-space: nowrap;
    }
    .metric ha-icon {
      --mdc-icon-size: 17px;
      color: var(--secondary-text-color);
    }
    .metric.attention {
      color: var(--warning-color, var(--error-color));
    }
    .section {
      padding: 13px 14px 14px;
    }
    .section[hidden] {
      display: none;
    }
    .section-head {
      min-height: 34px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 8px;
    }
    .section-title {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
    }
    .section-meta {
      font-size: 12px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .quick-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .quick-action {
      appearance: none;
      min-width: 0;
      min-height: 58px;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: transparent;
      text-align: left;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr);
      align-items: center;
      gap: 9px;
      cursor: pointer;
    }
    .quick-action:hover {
      background: var(--secondary-background-color);
    }
    .quick-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      background: color-mix(in srgb, var(--primary-color) 9%, transparent);
      color: var(--primary-color);
    }
    .quick-icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .quick-name,
    .quick-state {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .quick-name {
      font-size: 13px;
      font-weight: 650;
    }
    .quick-state {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .camera-grid {
      display: grid;
      grid-template-columns: repeat(var(--security-columns, 2), minmax(0, 1fr));
      gap: 8px;
    }
    .camera {
      min-width: 0;
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      overflow: hidden;
      background: var(--card-background-color);
    }
    .camera-media {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      padding: 0;
      border: 0;
      background: var(--dashboard-media-surface, #111);
      cursor: pointer;
      overflow: hidden;
    }
    .camera-media img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .camera-media.offline:after {
      content: "Camera unavailable";
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 12px;
      background: color-mix(
        in srgb,
        var(--dashboard-media-surface, #111) 72%,
        transparent
      );
      color: var(--dashboard-media-on-surface, #fff);
      font-size: 13px;
      font-weight: 650;
    }
    .camera-badge {
      position: absolute;
      top: 9px;
      left: 9px;
      min-height: 28px;
      padding: 0 8px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 5px;
      background: color-mix(
        in srgb,
        var(--dashboard-media-surface, #111) 78%,
        transparent
      );
      color: var(--dashboard-media-on-surface, #fff);
      font-size: 11px;
      font-weight: 700;
    }
    .camera-badge.activity {
      background: color-mix(
        in srgb,
        var(--warning-color, #f4a100) 88%,
        transparent
      );
    }
    .camera-badge ha-icon {
      --mdc-icon-size: 14px;
    }
    .camera-copy {
      padding: 10px 11px 8px;
    }
    .camera-title-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    .camera-name {
      font-size: 14px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .camera-state {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .classification-summary {
      margin-top: 6px;
      font-size: 12px;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .camera-actions {
      padding: 0 7px 7px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 5px;
    }
    .camera-action {
      appearance: none;
      min-width: 0;
      min-height: 44px;
      padding: 0 7px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 650;
    }
    .camera-action.primary {
      background: color-mix(in srgb, var(--primary-color) 9%, transparent);
      border-color: color-mix(
        in srgb,
        var(--primary-color) 28%,
        var(--divider-color)
      );
      color: var(--primary-color);
    }
    .camera-action:hover {
      background: var(--secondary-background-color);
    }
    .camera-action ha-icon {
      --mdc-icon-size: 17px;
    }
    .entries {
      display: grid;
      gap: 7px;
    }
    .entry {
      min-height: 64px;
      padding: 7px 7px 7px 11px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr) auto;
      align-items: center;
      gap: 9px;
    }
    .entry-icon {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .entry-icon.attention {
      color: var(--warning-color, var(--error-color));
    }
    .entry-icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .entry-name,
    .entry-state {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .entry-name {
      font-size: 13px;
      font-weight: 650;
    }
    .entry-state {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .entry-actions {
      display: flex;
      gap: 4px;
    }
    .entry-detail,
    .entry-operate {
      appearance: none;
      min-height: 44px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
    }
    .entry-detail {
      width: 44px;
      padding: 0;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .entry-operate {
      min-width: 92px;
      padding: 0 10px;
      color: var(--primary-color);
      font-size: 12px;
      font-weight: 700;
    }
    .entry-operate.confirm {
      color: var(--warning-color, var(--error-color));
      border-color: currentColor;
    }
    .entry-detail ha-icon {
      --mdc-icon-size: 18px;
    }
    .empty {
      min-height: 78px;
      display: grid;
      place-items: center;
      text-align: center;
      color: var(--secondary-text-color);
      font-size: 13px;
      padding: 12px;
    }
    dialog {
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 16px;
      background: var(--card-background-color);
      color: var(--primary-text-color);
      box-shadow: var(
        --dashboard-dialog-shadow,
        0 18px 56px rgba(0, 0, 0, 0.28)
      );
      overflow: hidden;
    }
    dialog::backdrop {
      background: var(--dashboard-modal-scrim, rgba(0, 0, 0, 0.46));
      backdrop-filter: blur(2px);
    }
    .dialog-shell {
      display: flex;
      flex-direction: column;
      max-height: calc(100dvh - 24px);
    }
    .dialog-head {
      min-height: 58px;
      padding: 6px 7px 6px 14px;
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .dialog-title {
      min-width: 0;
      flex: 1;
      font-size: 14px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dialog-button {
      appearance: none;
      min-width: 44px;
      height: 44px;
      padding: 0 10px;
      border: 0;
      border-radius: 10px;
      background: transparent;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      cursor: pointer;
    }
    .dialog-button:hover {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
    .dialog-button ha-icon {
      --mdc-icon-size: 19px;
    }
    .dialog-button span {
      font-size: 12px;
      font-weight: 650;
    }
    .dialog-body {
      min-height: 0;
      overflow: auto;
      overscroll-behavior: contain;
      padding: 12px 14px max(14px, env(safe-area-inset-bottom));
    }
    .viewer-dialog {
      width: min(1120px, calc(100vw - 24px));
      height: min(760px, calc(100dvh - 24px));
    }
    .viewer-shell {
      height: 100%;
    }
    .viewer-body {
      position: relative;
      min-height: 0;
      flex: 1;
      display: grid;
      place-items: center;
      background: var(--dashboard-media-surface, #111);
      overflow: hidden;
    }
    .settings-dialog {
      width: min(680px, calc(100vw - 24px));
      max-height: calc(100dvh - 24px);
    }
    .settings-groups {
      display: grid;
      gap: 18px;
    }
    .settings-group {
      display: grid;
      gap: 8px;
    }
    .settings-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .settings-title:after {
      content: "";
      height: 1px;
      background: var(--divider-color);
      flex: 1;
    }
    .detections {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .detection {
      appearance: none;
      min-width: 0;
      padding: 0;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: var(--secondary-background-color);
      overflow: hidden;
      text-align: left;
      cursor: pointer;
    }
    .detection img {
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      background: var(--dashboard-media-surface, #111);
    }
    .detection-copy {
      display: block;
      padding: 8px 10px;
    }
    .detection-name,
    .detection-time {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .detection-name {
      font-size: 13px;
      font-weight: 700;
    }
    .detection-time {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .status-list,
    .control-list {
      display: grid;
      gap: 6px;
    }
    .status-row,
    .control-row {
      min-height: 54px;
      padding: 5px 5px 5px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 11px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
    }
    .control-name,
    .control-state {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .control-name {
      font-size: 13px;
      font-weight: 650;
    }
    .control-state {
      margin-top: 3px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .control-value {
      min-width: 74px;
      text-align: right;
      font-size: 12px;
      font-weight: 700;
    }
    .control-value.on {
      color: var(--warning-color, var(--primary-color));
    }
    .control-toggle {
      appearance: none;
      min-width: 88px;
      min-height: 44px;
      padding: 0 9px;
      border: 1px solid var(--divider-color);
      border-radius: 9px;
      background: transparent;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
    }
    .control-toggle.on {
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 8%, transparent);
      border-color: color-mix(
        in srgb,
        var(--primary-color) 30%,
        var(--divider-color)
      );
    }
    .settings-footer {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
    }
    .footer-action {
      appearance: none;
      min-height: 46px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
    }
    .footer-action ha-icon {
      --mdc-icon-size: 18px;
    }
    :is(button):focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    button:disabled {
      cursor: default;
      opacity: 0.45;
    }
    @media (max-width: 700px) {
      :host {
        --security-gap: 8px;
      }
      .hero {
        grid-template-columns: 1fr;
        padding: 12px;
      }
      .metrics {
        justify-content: flex-start;
      }
      .section {
        padding: 12px;
      }
      .camera-grid,
      .quick-grid {
        grid-template-columns: 1fr;
      }
      .camera-actions {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .dialog-button span {
        display: none;
      }
      .dialog-button {
        padding: 0;
      }
      .viewer-dialog {
        width: 100vw;
        max-width: 100vw;
        height: 100dvh;
        max-height: 100dvh;
        border-width: 0;
        border-radius: 0;
      }
      .settings-dialog {
        width: 100vw;
        max-width: 100vw;
        max-height: 92dvh;
        margin: auto 0 0;
        border-width: 1px 0 0;
        border-radius: 16px 16px 0 0;
      }
      .detections {
        grid-template-columns: 1fr;
      }
      .entry {
        grid-template-columns: 34px minmax(0, 1fr);
      }
      .entry-actions {
        grid-column: 2;
        justify-content: flex-start;
      }
      .entry-operate {
        flex: 1;
      }
      .settings-footer {
        grid-template-columns: 1fr;
      }
    }
  `
];
var Yo = Object.defineProperty, Qo = Object.getOwnPropertyDescriptor, Re = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Qo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Yo(e, i, a), a;
};
let dt = class extends A {
  constructor() {
    super(...arguments), this._model = null, this._viewerCamera = null, this._settingsCamera = null, this._entryConfirmId = null, this._sequence = 0, this._snapshotTimer = null, this._entryConfirmTimer = null, this._snapshotStamp = Math.floor(Date.now() / 1e4), this._profileListener = (t) => {
      t.detail?.kind === "security" && t.detail?.profileId === (this._config?.profile || "household-security") && this._refresh(!0);
    }, this._visibilityListener = () => {
      document.visibilityState !== "hidden" && (this._snapshotStamp = Math.floor(Date.now() / 1e4), this.requestUpdate());
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      camera_columns: 2,
      refresh_seconds: 15,
      title: "Security",
      ...t,
      type: "custom:component-security-dashboard-v1"
    });
    const e = Math.max(
      1,
      Math.min(3, Number(this._config?.camera_columns) || 2)
    );
    this.style.setProperty("--security-columns", String(e)), this._schedule(), this._refresh(!0);
  }
  getCardSize() {
    return 12;
  }
  _schedule() {
    this._snapshotTimer && clearInterval(this._snapshotTimer), this._snapshotTimer = setInterval(
      () => {
        document.visibilityState !== "hidden" && this.isConnected && (this._snapshotStamp = Math.floor(Date.now() / 1e4), this.requestUpdate());
      },
      Math.max(10, Number(this._config?.refresh_seconds) || 15) * 1e3
    );
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("visibilitychange", this._visibilityListener), window.addEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._schedule(), this._refresh();
  }
  disconnectedCallback() {
    document.removeEventListener("visibilitychange", this._visibilityListener), window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._snapshotTimer && clearInterval(this._snapshotTimer), this._snapshotTimer = null, this._entryConfirmTimer && clearTimeout(this._entryConfirmTimer), this._entryConfirmTimer = null, super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("hass") && this.hass && this._refresh();
  }
  async _refresh(t = !1) {
    if (!this.hass || !this._config) return;
    const e = ++this._sequence;
    try {
      const i = await Pe(
        this.hass,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && (this._model = i);
    } catch (i) {
      e === this._sequence && (this._model = {
        error: i,
        cameras: [],
        entries: [],
        quickActions: [],
        attention: [],
        allClear: !1,
        onlineCameras: 0
      });
    }
  }
  async _runQuickAction(t) {
    !this.hass || !t.available || (await this.hass.callService(t.domain, t.service, {
      entity_id: t.entityId
    }), this._refresh(!0));
  }
  async _operateEntry(t) {
    if (this._entryConfirmId !== t.entityId) {
      this._entryConfirmId = t.entityId, this._entryConfirmTimer && clearTimeout(this._entryConfirmTimer), this._entryConfirmTimer = setTimeout(() => {
        this._entryConfirmId = null;
      }, 3e3);
      return;
    }
    if (this._entryConfirmId = null, this._entryConfirmTimer && clearTimeout(this._entryConfirmTimer), this._entryConfirmTimer = null, !!this.hass) {
      if (t.controlEntityId) {
        const e = t.controlEntityId.split(".")[0];
        e === "button" ? await this.hass.callService("button", "press", {
          entity_id: t.controlEntityId
        }) : e === "cover" ? await this.hass.callService(
          "cover",
          t.open ? "close_cover" : "open_cover",
          {
            entity_id: t.controlEntityId
          }
        ) : e === "lock" ? await this.hass.callService("lock", t.open ? "lock" : "unlock", {
          entity_id: t.controlEntityId
        }) : await this.hass.callService("homeassistant", "toggle", {
          entity_id: t.controlEntityId
        });
      } else t.domain === "lock" ? await this.hass.callService("lock", t.open ? "lock" : "unlock", {
        entity_id: t.entityId
      }) : t.domain === "cover" && await this.hass.callService(
        "cover",
        t.open ? "close_cover" : "open_cover",
        {
          entity_id: t.entityId
        }
      );
      this._refresh(!0);
    }
  }
  _openViewer(t) {
    this._viewerCamera = t;
    const e = this.renderRoot.querySelector(
      ".viewer-dialog"
    );
    e && !e.open && e.showModal();
  }
  _closeViewer() {
    const t = this.renderRoot.querySelector(
      ".viewer-dialog"
    );
    t?.open && t.close(), this._viewerCamera = null;
  }
  _openSettings(t) {
    this._settingsCamera = t;
    const e = this.renderRoot.querySelector(
      ".settings-dialog"
    );
    e && !e.open && e.showModal();
  }
  _closeSettings() {
    const t = this.renderRoot.querySelector(
      ".settings-dialog"
    );
    t?.open && t.close(), this._settingsCamera = null;
  }
  render() {
    if (!this._config) return o``;
    const t = this._model || {}, e = this._config.cameras, i = t.cameras || [], r = e && e.length > 0 ? i.filter(
      (d) => e.includes(d.entityId) || d.deviceId && e.includes(d.deviceId) || e.includes(d.id)
    ) : i, a = this._config.entries, s = t.entries || [], n = a && a.length > 0 ? s.filter(
      (d) => a.includes(d.entityId) || d.deviceId && a.includes(d.deviceId)
    ) : s, c = t.quickActions || [], l = (t.attention || []).length, p = !!(t.error || t.profileError || t.profileMissing), f = r.reduce(
      (d, u) => d + (u.detections || []).filter(
        (h) => this.hass?.states?.[h.entity_id]?.state === "on"
      ).length,
      0
    ), g = n.filter((d) => d.available && d.open).length;
    return o`
      <div class="page">
        <section class="panel hero">
          <div class="hero-main">
            <span
              class="hero-icon ${l > 0 || p ? "attention" : ""}"
            >
              <ha-icon
                icon="${p || l > 0 ? "mdi:shield-alert-outline" : "mdi:shield-check-outline"}"
              ></ha-icon>
            </span>
            <div>
              <h1 class="page-title">
                ${this.esc(this._config.title || "Security")}
              </h1>
              <div class="status-copy">
                ${this.esc(
      t.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : t.error || t.profileError ? "Security status is temporarily unavailable" : l > 0 ? `${l} ${l === 1 ? "item needs" : "items need"} attention` : "All clear"
    )}
              </div>
            </div>
          </div>
          <div class="metrics">
            <span
              class="metric ${r.length > 0 && (t.onlineCameras || 0) < r.length ? "attention" : ""}"
            >
              <ha-icon icon="mdi:cctv"></ha-icon>
              <span>${t.onlineCameras || 0}/${r.length} cameras</span>
            </span>
            <span class="metric ${f > 0 ? "attention" : ""}">
              <ha-icon icon="mdi:motion-sensor"></ha-icon>
              <span>${f} active</span>
            </span>
            <span class="metric ${g > 0 ? "attention" : ""}">
              <ha-icon icon="mdi:door"></ha-icon>
              <span>${g} open</span>
            </span>
          </div>
        </section>

        ${c.length ? o`
                <section class="panel section quick-section">
                  <div class="section-head">
                    <h2 class="section-title">Quick actions</h2>
                    <span class="section-meta"
                      >${c.length} actions</span
                    >
                  </div>
                  <div class="quick-grid">
                    ${c.map(
      (d) => o`
                        <button
                          class="quick-action"
                          type="button"
                          ?disabled=${!d.available}
                          aria-label="${this.esc(d.name)}, ${d.available ? "Run" : "Unavailable"}"
                          @click=${() => this._runQuickAction(d)}
                        >
                          <span class="quick-icon"
                            ><ha-icon icon="${this.esc(d.icon)}"></ha-icon
                          ></span>
                          <span>
                            <span class="quick-name"
                              >${this.esc(d.name)}</span
                            >
                            <span class="quick-state"
                              >${d.available ? "Run" : "Unavailable"}</span
                            >
                          </span>
                        </button>
                      `
    )}
                  </div>
                </section>
              ` : ""}

        <section class="panel section camera-section">
          <div class="section-head">
            <h2 class="section-title">Cameras</h2>
            <span class="section-meta"
              >${r.filter((d) => d.online).length}/${r.length}
              online</span
            >
          </div>
          ${r.length === 0 ? o`<div class="empty">
                  No security cameras are configured
                </div>` : o`
                  <div class="camera-grid">
                    ${r.map((d) => {
      const h = this.hass?.states[d.entityId]?.attributes?.entity_picture, b = h ? this.hass?.hassUrl ? this.hass.hassUrl(h) : h : "", m = b ? `${b}${b.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "", _ = d.classifications || [];
      return o`
                        <article class="camera">
                          <button
                            class="camera-media ${d.online ? "" : "offline"}"
                            type="button"
                            ?disabled=${!d.online}
                            aria-label="Open live view for ${this.esc(d.name)}"
                            @click=${() => this._openViewer(d)}
                          >
                            ${m ? o`<img
                                  src="${m}"
                                  alt="${this.esc(d.name)} snapshot"
                                />` : ""}
                            <span
                              class="camera-badge ${d.active ? "activity" : ""}"
                            >
                              <ha-icon
                                icon="${d.active ? "mdi:motion-sensor" : "mdi:cctv"}"
                              ></ha-icon>
                              <span
                                >${d.active ? "Activity" : d.online ? "Live" : "Offline"}</span
                              >
                            </span>
                          </button>
                          <div class="camera-copy">
                            <div class="camera-title-row">
                              <span class="camera-name"
                                >${this.esc(d.name)}</span
                              >
                            </div>
                            <div class="camera-state">
                              ${d.active ? "Activity detected" : d.online ? "Online" : "Unavailable"}
                            </div>
                            <div class="classification-summary">
                              ${_.length ? `Recent: ${_.map(($) => $.name).join(" · ")}` : "No detection image entities"}
                            </div>
                          </div>
                          <div class="camera-actions">
                            <button
                              class="camera-action primary"
                              type="button"
                              ?disabled=${!d.online}
                              aria-label="Live view for ${this.esc(d.name)}"
                              @click=${() => this._openViewer(d)}
                            >
                              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                              <span>Live</span>
                            </button>
                            <button
                              class="camera-action"
                              type="button"
                              ?disabled=${!(_.length || d.detections?.length)}
                              aria-label="Detections for ${this.esc(d.name)}"
                              @click=${() => this._openSettings(d)}
                            >
                              <ha-icon icon="mdi:motion-sensor"></ha-icon>
                              <span>Detections</span>
                            </button>
                            <button
                              class="camera-action"
                              type="button"
                              aria-label="Settings for ${this.esc(d.name)}"
                              @click=${() => this._openSettings(d)}
                            >
                              <ha-icon icon="mdi:tune-variant"></ha-icon>
                              <span>Settings</span>
                            </button>
                          </div>
                        </article>
                      `;
    })}
                  </div>
                `}
        </section>

        ${n.length ? o`
                <section class="panel section entry-section">
                  <div class="section-head">
                    <h2 class="section-title">Entry points</h2>
                    <span class="section-meta">${g} open</span>
                  </div>
                  <div class="entries">
                    ${n.map((d) => {
      const u = this._entryConfirmId === d.entityId, h = !!(d.controlEntityId || d.domain === "lock" || d.domain === "cover"), b = d.domain === "lock" ? d.open ? "Lock" : "Unlock" : d.open ? "Close" : "Open";
      return o`
                        <article class="entry">
                          <span
                            class="entry-icon ${d.open ? "attention" : ""}"
                          >
                            <ha-icon
                              icon="${d.domain === "lock" ? d.open ? "mdi:lock-open-outline" : "mdi:lock-outline" : d.open ? "mdi:door-open" : "mdi:door-closed"}"
                            ></ha-icon>
                          </span>
                          <span>
                            <span class="entry-name"
                              >${this.esc(d.name)}</span
                            >
                            <span class="entry-state">
                              ${d.available ? d.domain === "lock" ? d.open ? "Unlocked" : "Locked" : d.open ? "Open" : "Closed" : "Unavailable"}
                            </span>
                          </span>
                          <span class="entry-actions">
                            <button
                              class="entry-detail"
                              type="button"
                              aria-label="Open details for ${this.esc(d.name)}"
                              @click=${() => this.moreInfo(d.entityId)}
                            >
                              <ha-icon icon="mdi:information-outline"></ha-icon>
                            </button>
                            ${h ? o`
                                    <button
                                      class="entry-operate ${u ? "confirm" : ""}"
                                      type="button"
                                      ?disabled=${!d.available}
                                      aria-label="${u ? "Confirm " + b : b} for ${this.esc(d.name)}"
                                      @click=${() => this._operateEntry(d)}
                                    >
                                      ${u ? "Confirm" : b}
                                    </button>
                                  ` : ""}
                          </span>
                        </article>
                      `;
    })}
                  </div>
                </section>
              ` : ""}
      </div>

      <dialog
        class="viewer-dialog"
        aria-label="Camera live stream"
        @click=${(d) => {
      const u = this.renderRoot.querySelector(".viewer-dialog");
      d.target === u && this._closeViewer();
    }}
      >
        <div class="dialog-shell viewer-shell">
          <div class="dialog-head">
            <span class="dialog-title"
              >${this.esc(this._viewerCamera?.name || "Camera")} live</span
            >
            <button
              class="dialog-button"
              type="button"
              @click=${() => {
      const d = this._viewerCamera;
      this._closeViewer(), d && this._openSettings(d);
    }}
            >
              <ha-icon icon="mdi:tune-variant"></ha-icon>
              <span>Settings</span>
            </button>
            <button
              class="dialog-button"
              type="button"
              @click=${() => {
      this._viewerCamera && this.moreInfo(this._viewerCamera.entityId), this._closeViewer();
    }}
            >
              <ha-icon icon="mdi:information-outline"></ha-icon>
              <span>Details</span>
            </button>
            <button
              class="dialog-button"
              type="button"
              aria-label="Close"
              @click=${this._closeViewer}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="viewer-body">
            <div class="viewer-message">Live stream ready</div>
          </div>
        </div>
      </dialog>

      <dialog
        class="settings-dialog"
        aria-label="Camera settings"
        @click=${(d) => {
      const u = this.renderRoot.querySelector(".settings-dialog");
      d.target === u && this._closeSettings();
    }}
      >
        <div class="dialog-shell">
          <div class="dialog-head">
            <span class="dialog-title"
              >${this.esc(this._settingsCamera?.name || "Camera")}
              settings</span
            >
            <button
              class="dialog-button"
              type="button"
              @click=${() => {
      const d = this._settingsCamera;
      this._closeSettings(), d && this._openViewer(d);
    }}
            >
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span>Live</span>
            </button>
            <button
              class="dialog-button"
              type="button"
              aria-label="Close"
              @click=${this._closeSettings}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-body">
            <div class="settings-groups">
              ${this._settingsCamera?.classifications?.length ? o`
                      <section class="settings-group">
                        <div class="settings-title">Recent detections</div>
                        <div class="detections">
                          ${this._settingsCamera.classifications.map((d) => {
      const h = this.hass?.states[d.entity.entity_id]?.attributes?.entity_picture;
      return o`
                              <button
                                class="detection"
                                type="button"
                                @click=${() => {
        this._closeSettings(), this.moreInfo(d.entity.entity_id);
      }}
                              >
                                ${h ? o`<img src="${h}" alt="${this.esc(d.name)}" />` : ""}
                                <span class="detection-copy">
                                  <span class="detection-name"
                                    >${this.esc(d.name)}</span
                                  >
                                </span>
                              </button>
                            `;
    })}
                        </div>
                      </section>
                    ` : ""}
              ${this._settingsCamera?.switches?.length ? o`
                      <section class="settings-group">
                        <div class="settings-title">Camera controls</div>
                        <div class="control-list">
                          ${this._settingsCamera.switches.map((d) => {
      const h = this.hass?.states[d.entity.entity_id]?.state === "on";
      return o`
                              <div class="control-row">
                                <span>
                                  <span class="control-name"
                                    >${this.esc(d.role || "Control")}</span
                                  >
                                  <span class="control-state"
                                    >${h ? "On" : "Off"}</span
                                  >
                                </span>
                                <button
                                  class="control-toggle ${h ? "on" : ""}"
                                  type="button"
                                  @click=${async () => {
        await this.hass?.callService(
          "switch",
          h ? "turn_off" : "turn_on",
          { entity_id: d.entity.entity_id }
        ), this._refresh(!0);
      }}
                                >
                                  ${h ? "Turn off" : "Turn on"}
                                </button>
                              </div>
                            `;
    })}
                        </div>
                      </section>
                    ` : ""}

              <div class="settings-footer">
                <button
                  class="footer-action"
                  type="button"
                  @click=${() => {
      this._settingsCamera && this.moreInfo(this._settingsCamera.entityId), this._closeSettings();
    }}
                >
                  <ha-icon icon="mdi:information-outline"></ha-icon>
                  <span>Home Assistant details</span>
                </button>
                <button
                  class="footer-action"
                  type="button"
                  ?disabled=${!this._settingsCamera?.online}
                  @click=${() => {
      const d = this._settingsCamera;
      this._closeSettings(), d && this._openViewer(d);
    }}
                >
                  <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                  <span>Open live view</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    `;
  }
};
dt.stubConfig = {
  profile: "household-security",
  camera_columns: 2
};
dt.styles = Ko;
Re([
  x()
], dt.prototype, "_model", 2);
Re([
  x()
], dt.prototype, "_viewerCamera", 2);
Re([
  x()
], dt.prototype, "_settingsCamera", 2);
Re([
  x()
], dt.prototype, "_entryConfirmId", 2);
dt = Re([
  k("component-security-dashboard-v1")
], dt);
E({
  type: "component-security-dashboard-v1",
  element: dt,
  name: "Security Dashboard V1",
  description: "Single-owner Security dashboard with on-demand live video, detections, controls, quick actions and entry points."
});
const Zo = [
  T,
  P,
  q,
  tt,
  y`
    .head {
      min-height: 32px;
      padding: 0 2px;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
    h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .entry {
      appearance: none;
      min-width: 0;
      min-height: 56px;
      padding: 8px 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .entry:hover {
      background: var(--dashboard-card-surface);
    }
    .entry.open {
      border-color: var(--warning-color);
      background: var(--dashboard-warning-surface);
    }
    .entry:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .icon {
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .open .icon {
      color: var(--warning-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .name,
    .state {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
    }
    .state {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .list {
        grid-template-columns: 1fr;
      }
    }
  `
];
var Jo = Object.defineProperty, Xo = Object.getOwnPropertyDescriptor, Da = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Xo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Jo(e, i, a), a;
};
let Zt = class extends A {
  constructor() {
    super(...arguments), this._model = null, this._sequence = 0, this._profileListener = (t) => {
      t.detail?.kind === "security" && t.detail?.profileId === (this._config?.profile || "household-security") && this._refresh(!0);
    }, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      title: "Entry points",
      ...t,
      type: "custom:component-security-entry-points-v1"
    }), this._refresh();
  }
  getCardSize() {
    return this._model?.entries?.length ? 3 : 0;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    );
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  async _refresh(t = !1) {
    if (!this.hass || !this._config) return;
    const e = ++this._sequence;
    try {
      const i = await Pe(
        this.hass,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && (this._model = i);
    } catch (i) {
      e === this._sequence && (this._model = { error: i, entries: [] });
    }
  }
  _entryIcon(t) {
    return t.domain === "lock" ? t.open ? "mdi:lock-open-outline" : "mdi:lock-outline" : t.deviceClass === "window" ? "mdi:window-closed-variant" : "mdi:door-closed";
  }
  _entryStateText(t) {
    return t.available ? t.domain === "lock" ? t.open ? "Unlocked" : "Locked" : t.open ? "Open" : "Closed" : "Unavailable";
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll("button.entry").forEach((e) => {
      const i = e.dataset.entityId;
      i && this._interactionHandles.push(
        S(e, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    });
  }
  render() {
    if (!this._config) return o``;
    const t = this._model?.entries || [];
    return t.length === 0 ? o`` : o`
      <div class="head">
        <h2>${this.esc(this._config.title || "Entry points")}</h2>
      </div>
      <div class="list">
        ${t.map((e) => {
      if (e.deviceClass === "garage_door" && e.controlEntityId)
        return o`
              <component-garage-door-controller-v1
                .hass=${this.hass}
                .config=${{
          type: "custom:component-garage-door-controller-v1",
          entity: e.entityId,
          control_entity: e.controlEntityId,
          title: e.name
        }}
              ></component-garage-door-controller-v1>
            `;
      const i = this._entryIcon(e), r = this._entryStateText(e);
      return o`
            <button
              class="entry ${e.open ? "open" : ""}"
              type="button"
              data-entity-id="${e.entityId}"
              ?disabled=${!e.available}
              aria-label="${this.esc(e.name)}, ${this.esc(r)}. Open details."
            >
              <span class="icon">
                <ha-icon icon="${i}"></ha-icon>
              </span>
              <span class="copy">
                <span class="name">${this.esc(e.name)}</span>
                <span class="state">${this.esc(r)}</span>
              </span>
            </button>
          `;
    })}
      </div>
    `;
  }
};
Zt.stubConfig = { profile: "household-security" };
Zt.styles = Zo;
Da([
  x()
], Zt.prototype, "_model", 2);
Zt = Da([
  k("component-security-entry-points-v1")
], Zt);
E({
  type: "component-security-entry-points-v1",
  element: Zt,
  name: "Security Entry Points V1",
  description: "Capability-driven garage, door, window and lock status using the shared garage controller where available."
});
const tc = [
  T,
  P,
  F,
  q,
  tt,
  y`
    .wrap {
      padding: 14px;
    }
    .top {
      min-height: 44px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .icon {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      display: grid;
      place-items: center;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .ok .icon {
      color: var(--primary-color);
    }
    .copy {
      min-width: 0;
    }
    .title,
    .detail {
      display: block;
    }
    .title {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .detail {
      margin-top: 3px;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.25;
    }
    .count {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .attention {
      display: grid;
      gap: 8px;
      margin-top: 10px;
    }
    .attention button {
      appearance: none;
      width: 100%;
      min-height: 44px;
      padding: 8px 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      color: inherit;
      font: inherit;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .attention button:hover {
      background: var(--dashboard-active-surface);
    }
    .attention button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .attention ha-icon {
      --mdc-icon-size: 18px;
      color: var(--warning-color);
    }
    .attention span {
      font-size: 12.5px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
  `
];
var ec = Object.defineProperty, ic = Object.getOwnPropertyDescriptor, Oa = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? ic(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && ec(e, i, a), a;
};
let Jt = class extends A {
  constructor() {
    super(...arguments), this._model = null, this._sequence = 0, this._profileListener = (t) => {
      t.detail?.kind === "security" && t.detail?.profileId === (this._config?.profile || "household-security") && this._refresh(!0);
    }, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      title: "Security",
      ...t,
      type: "custom:component-security-summary-v1"
    }), this._refresh();
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    );
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  async _refresh(t = !1) {
    if (!this.hass || !this._config) return;
    const e = ++this._sequence;
    try {
      const i = await Pe(
        this.hass,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && (this._model = i);
    } catch (i) {
      e === this._sequence && (this._model = {
        error: i,
        cameras: [],
        entries: [],
        attention: [],
        allClear: !1,
        onlineCameras: 0
      });
    }
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll(".attention button").forEach((e) => {
      const i = e.dataset.entityId;
      i && this._interactionHandles.push(
        S(e, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    });
  }
  render() {
    if (!this._config) return o``;
    const t = this._model, e = t?.error || t?.profileError, i = !e && !!t?.allClear, r = this._config.title || "Security", a = t?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : e ? e.message || "Security status is unavailable" : i ? "All clear" : `${t?.attention?.length || 0} item${(t?.attention?.length || 0) === 1 ? "" : "s"} need attention`, s = e ? "Unavailable" : `${t?.onlineCameras || 0}/${t?.cameras?.length || 0} cameras online`, n = (t?.attention || []).slice(0, 4);
    return o`
      <ha-card>
        <div class="wrap ${i ? "ok" : ""}">
          <div class="top">
            <span class="icon">
              <ha-icon
                icon="${e ? "mdi:shield-alert-outline" : i ? "mdi:shield-check-outline" : "mdi:shield-alert-outline"}"
              ></ha-icon>
            </span>
            <span class="copy">
              <span class="title">${this.esc(r)}</span>
              <span class="detail ${e ? "error" : ""}"
                >${this.esc(a)}</span
              >
            </span>
            <span class="count">${this.esc(s)}</span>
          </div>

          ${n.length ? o`
                  <div class="attention">
                    ${n.map(
      (c) => o`
                        <button
                          type="button"
                          data-entity-id="${c.entityId}"
                          aria-label="${this.esc(c.label)}. Open details."
                        >
                          <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                          <span>${this.esc(c.label)}</span>
                        </button>
                      `
    )}
                  </div>
                ` : ""}
        </div>
      </ha-card>
    `;
  }
};
Jt.stubConfig = { profile: "household-security" };
Jt.styles = tc;
Oa([
  x()
], Jt.prototype, "_model", 2);
Jt = Oa([
  k("component-security-summary-v1")
], Jt);
E({
  type: "component-security-summary-v1",
  element: Jt,
  name: "Security Summary V1",
  description: "Exception-first all-clear and attention summary discovered from Home Assistant capabilities."
});
const rc = y`
  :host {
    display: block;
    min-width: 0;
  }
  .layout {
    display: grid;
    gap: 8px;
    grid-template-columns: minmax(0, 1fr);
  }
  .context {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }
`, ac = [
  T,
  P,
  F,
  pt,
  nr,
  y`
    .row {
      min-height: 48px;
      padding: 6px 10px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) 40px auto;
      align-items: center;
      gap: 8px;
    }
    button {
      appearance: none;
      min-width: 40px;
      min-height: 40px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }
    button:hover {
      background: var(--dashboard-card-muted-surface);
    }
    button:focus-visible,
    .date:focus-within {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    button:disabled {
      color: var(--disabled-text-color);
      cursor: default;
      opacity: 0.45;
    }
    .step {
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .date {
      position: relative;
      min-width: 0;
      min-height: 40px;
      padding: 4px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: var(--dashboard-radius-control);
      border: var(--dashboard-card-border);
      background: var(--dashboard-card-muted-surface);
      overflow: hidden;
    }
    .label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .state {
      flex: 0 0 auto;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--dashboard-card-surface);
      border: var(--dashboard-card-border);
      color: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 650;
    }
    .state.historical {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }
    input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    .today {
      min-height: 36px;
      padding: 0 12px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: var(--primary-color);
      background: var(--dashboard-card-muted-surface);
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      font-size: 12px;
      font-weight: 650;
    }
    .today:hover {
      background: var(--dashboard-active-surface);
    }
    .today:disabled {
      opacity: 0.45;
    }
    @media (max-width: 420px) {
      .row {
        grid-template-columns: 40px minmax(0, 1fr) 40px 40px;
        gap: 4px;
        padding: 6px;
      }
      .today {
        width: 40px;
        padding: 0;
      }
      .today span {
        display: none;
      }
    }
  `
];
var sc = Object.defineProperty, nc = Object.getOwnPropertyDescriptor, Pa = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? nc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && sc(e, i, a), a;
};
let Xt = class extends A {
  constructor() {
    super(...arguments), this._selected = j.today(), this._unsubscribe = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = this._config?.channel;
    super.setConfig({
      channel: "energy-day",
      title: "Energy day",
      ...t,
      type: "custom:component-energy-day-selector-v1"
    });
    const i = this._config?.channel || "energy-day";
    this._selected = j.get(i, this.hass), this.isConnected && e !== i && (this._unsubscribe?.(), this._unsubscribe = j.subscribe(
      i,
      (r) => {
        this._selected = r.day;
      },
      { hass: this.hass }
    ));
  }
  getCardSize() {
    return 1;
  }
  _parse(t) {
    const e = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(t || ""));
    if (!e) return null;
    const i = new Date(
      Number(e[1]),
      Number(e[2]) - 1,
      Number(e[3])
    );
    return this._key(i) === t ? i : null;
  }
  _key(t) {
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }
  _isToday() {
    return this._selected === j.today(this.hass);
  }
  _setDay(t) {
    this._selected = j.set(
      this._config?.channel || "energy-day",
      t,
      {
        hass: this.hass
      }
    );
  }
  _shift(t) {
    const e = this._parse(this._selected) || /* @__PURE__ */ new Date();
    e.setDate(e.getDate() + t), this._setDay(this._key(e));
  }
  connectedCallback() {
    super.connectedCallback(), this._unsubscribe || (this._unsubscribe = j.subscribe(
      this._config?.channel || "energy-day",
      (t) => {
        this._selected = t.day;
      },
      { hass: this.hass }
    ));
  }
  disconnectedCallback() {
    this._unsubscribe?.(), this._unsubscribe = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  updated() {
    for (const a of this._interactionHandles) a.destroy();
    this._interactionHandles = [];
    const t = { delay: 350, interval: 110, accelerate: !0 }, e = this.renderRoot.querySelector(
      ".previous"
    ), i = this.renderRoot.querySelector(
      ".next"
    ), r = this.renderRoot.querySelector(
      ".today"
    );
    e && this._interactionHandles.push(
      S(e, {
        primary: () => this._shift(-1),
        repeat: t,
        feedback: !0
      })
    ), i && this._interactionHandles.push(
      S(i, {
        primary: () => this._shift(1),
        repeat: t,
        feedback: !0
      })
    ), r && this._interactionHandles.push(
      S(r, {
        primary: () => this._setDay(j.today(this.hass)),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._isToday(), e = j.today(this.hass), i = vi(this.hass, this._selected, {
      weekday: "short",
      day: "numeric",
      month: "short",
      ...this._selected.slice(0, 4) === e.slice(0, 4) ? {} : { year: "numeric" }
    });
    return o`
      <ha-card>
        <div class="row">
          <button class="step previous" type="button" aria-label="Previous day">
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>

          <label class="date">
            <span class="label">${this.esc(i)}</span>
            <span class="state ${t ? "" : "historical"}" role="status">
              ${t ? "Today" : "Historical"}
            </span>
            <input
              type="date"
              aria-label="Select Energy day"
              .value=${this._selected}
              max="${e}"
              @change=${(r) => this._setDay(r.target.value)}
            />
          </label>

          <button
            class="step next"
            type="button"
            aria-label="Next day"
            ?disabled=${t}
          >
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>

          <button
            class="today"
            type="button"
            aria-label="Return to today"
            ?disabled=${t}
          >
            <ha-icon icon="mdi:calendar-today-outline"></ha-icon>
            <span>Today</span>
          </button>
        </div>
      </ha-card>
    `;
  }
};
Xt.stubConfig = { channel: "energy-day" };
Xt.styles = ac;
Pa([
  x()
], Xt.prototype, "_selected", 2);
Xt = Pa([
  k("component-energy-day-selector-v1")
], Xt);
E({
  type: "component-energy-day-selector-v1",
  element: Xt,
  name: "Energy Day Selector",
  description: "Stable selected-day control shared by every Energy card."
});
const oc = [
  T,
  P,
  pt,
  tt,
  y`
    .wrap {
      padding: 14px;
    }
    .head {
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }
    h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .context {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 12px;
    }
    .day {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .state {
      flex: 0 0 auto;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--dashboard-card-muted-surface);
      border: var(--dashboard-card-border);
      font-size: 11px;
      font-weight: 650;
      color: var(--secondary-text-color);
    }
    .state.now {
      color: var(--primary-color);
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
    }
    .live {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      margin-bottom: 8px;
    }
    .daily {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }
    .metric {
      appearance: none;
      min-width: 0;
      min-height: 64px;
      padding: 10px 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      color: inherit;
      font: inherit;
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
    }
    .metric:disabled {
      cursor: default;
      opacity: 1;
    }
    .metric:not(:disabled):hover {
      background: var(--dashboard-active-surface);
    }
    .metric:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .value {
      font-size: 20px;
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }
    .label {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
      .live {
        grid-template-columns: 1fr;
      }
      .daily {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `
];
var cc = Object.defineProperty, lc = Object.getOwnPropertyDescriptor, Le = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? lc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && cc(e, i, a), a;
};
let ht = class extends A {
  constructor() {
    super(...arguments), this._data = null, this._error = null, this._loading = !1, this._day = j.today(), this._sequence = 0, this._dayUnsub = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === (this._config?.profile || "household-energy") && (this.hass && Je.invalidateProfile(
        this.hass,
        this._config?.profile || "household-energy"
      ), this._load(!0));
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = this._config?.day_channel;
    super.setConfig({
      profile: "household-energy",
      day_channel: "energy-day",
      title: "Energy",
      ...t,
      type: "custom:component-energy-summary-v1"
    });
    const i = this._config?.day_channel || "energy-day";
    this._day = j.get(i, this.hass), this.isConnected && e !== i && (this._dayUnsub?.(), this._dayUnsub = j.subscribe(
      i,
      (r) => {
        r.day !== this._day && (this._day = r.day, this._load());
      },
      { hass: this.hass }
    )), this._load();
  }
  getCardSize() {
    return 3;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._dayUnsub || (this._dayUnsub = j.subscribe(
      this._config?.day_channel || "energy-day",
      (t) => {
        t.day !== this._day && (this._day = t.day, this._load());
      },
      { hass: this.hass }
    )), this._load();
  }
  disconnectedCallback() {
    window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._dayUnsub?.(), this._dayUnsub = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  async _load(t = !1) {
    if (!this.hass || !this._config || !this._day) return;
    const e = ++this._sequence;
    this._loading = !0, this._error = null;
    try {
      const i = await Je.get(
        this.hass,
        this._config.profile || "household-energy",
        this._day,
        { force: t }
      );
      e === this._sequence && (this._data = i);
    } catch (i) {
      e === this._sequence && (this._error = i);
    } finally {
      e === this._sequence && (this._loading = !1);
    }
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const r = this.renderRoot.querySelector(e);
      r && this._interactionHandles.push(
        S(r, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house", "sensor.ha_component_house_power"), t(".solar", "sensor.ha_component_solar_power"), t(".grid", "sensor.ha_component_grid_power");
  }
  render() {
    if (!this._config) return o``;
    const t = this._data, e = this._day === j.today(this.hass), i = e ? "Today" : vi(this.hass, this._day, {
      weekday: "short",
      day: "numeric",
      month: "short"
    }), r = t?.grid_w == null ? Number.NaN : Number(t.grid_w), a = Number.isFinite(r) ? r > 15 ? "Importing now" : r < -15 ? "Exporting now" : "Grid balanced" : "Grid unavailable", s = Number(t?.coverage), n = this._error ? /unknown energy profile/i.test(this._error.message || "") ? `Configure ${this._config.profile || "household-energy"} in HA Component Backend` : this._error.message || "Energy data is unavailable" : this._loading ? this._data ? "Updating…" : "Loading Energy data…" : t?.stale ? "Showing the last successful update" : Number.isFinite(s) && s < 1 ? `${Math.round(s * 100)}% of source data available` : "";
    return o`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <h2>${this._config.title || "Energy"}</h2>
            <div class="context">
              <span class="day">${i}</span>
              <span class="state ${e ? "now" : ""}"
                >${e ? "Now" : "Historical"}</span
              >
            </div>
          </div>

          <div class="live">
            <button
              class="metric house"
              type="button"
              aria-label="House power now: ${st(this.hass, t?.house_w)}"
            >
              <span class="value"
                >${st(this.hass, t?.house_w)}</span
              >
              <span class="label">House now</span>
            </button>
            <button
              class="metric solar"
              type="button"
              aria-label="Solar power now: ${st(this.hass, t?.solar_w)}"
            >
              <span class="value"
                >${st(this.hass, t?.solar_w)}</span
              >
              <span class="label">Solar now</span>
            </button>
            <button
              class="metric grid"
              type="button"
              aria-label="Grid power now: ${st(this.hass, t?.grid_w, { absolute: !0 })}, ${a}"
            >
              <span class="value"
                >${st(this.hass, t?.grid_w, { absolute: !0 })}</span
              >
              <span class="label">${this.esc(a)}</span>
            </button>
          </div>

          <div class="daily">
            <button class="metric consumed" type="button" disabled>
              <span class="value"
                >${ft(this.hass, t?.consumed_kwh)}</span
              >
              <span class="label">Consumed</span>
            </button>
            <button class="metric generated" type="button" disabled>
              <span class="value"
                >${ft(this.hass, t?.generated_kwh)}</span
              >
              <span class="label">Generated</span>
            </button>
            <button class="metric imported" type="button" disabled>
              <span class="value"
                >${ft(this.hass, t?.imported_kwh)}</span
              >
              <span class="label">Imported</span>
            </button>
            <button class="metric exported" type="button" disabled>
              <span class="value"
                >${ft(this.hass, t?.exported_kwh)}</span
              >
              <span class="label">Exported</span>
            </button>
          </div>

          ${n ? o`
                  <div
                    class="feedback ${this._error ? "error" : ""}"
                    role="status"
                  >
                    ${this.esc(n)}
                  </div>
                ` : ""}
        </div>
      </ha-card>
    `;
  }
};
ht.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
ht.styles = oc;
Le([
  x()
], ht.prototype, "_data", 2);
Le([
  x()
], ht.prototype, "_error", 2);
Le([
  x()
], ht.prototype, "_loading", 2);
Le([
  x()
], ht.prototype, "_day", 2);
ht = Le([
  k("component-energy-summary-v1")
], ht);
E({
  type: "component-energy-summary-v1",
  element: ht,
  name: "Energy Summary V1",
  description: "Stable backend-driven live power and selected-day Energy totals."
});
const dc = [
  T,
  P,
  y`
    button {
      appearance: none;
      width: 100%;
      min-height: 44px;
      box-sizing: border-box;
      border: 0;
      background: transparent;
      font: inherit;
      padding: 10px 14px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      cursor: pointer;
      font-size: 12px;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      color: inherit;
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--dashboard-radius-card);
    }
    .phase {
      color: var(--primary-text-color);
      font-weight: 600;
      text-align: left;
      justify-self: start;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .event {
      color: var(--secondary-text-color);
      text-align: right;
      justify-self: end;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .clouds {
      justify-self: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      min-width: 0;
      color: var(--secondary-text-color);
    }
    .cloud-item {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .cloud-label {
      font-weight: 400;
    }
    .cloud-value {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    @media (max-width: 900px) {
      button {
        gap: 10px;
        padding: 10px 12px;
      }
      .clouds {
        gap: 10px;
      }
    }
    @media (max-width: 650px) {
      button {
        gap: 6px;
        padding: 8px 10px;
      }
      .clouds {
        gap: 7px;
      }
    }
  `
];
var hc = Object.defineProperty, pc = Object.getOwnPropertyDescriptor, Ha = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? pc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && hc(e, i, a), a;
};
const uc = {
  type: "custom:solar-daylight-card-v7",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let Ce = class extends A {
  constructor() {
    super(...arguments), this._forecast = [], this._lastFetch = 0, this._pending = !1, this._failures = 0, this._retryAt = 0, this._interactionHandle = null;
  }
  setConfig(t) {
    const e = this._config?.weather_entity;
    super.setConfig({ ...uc, ...t }), this._config?.weather_entity !== e && (this._forecast = [], this._lastFetch = 0), this._fetchForecast();
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), this._fetchForecast();
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  _num(t, e = null) {
    if (t == null || t === "") return e;
    const i = Number(t);
    return Number.isFinite(i) ? i : e;
  }
  _time(t) {
    if (!t) return "";
    const e = new Date(t);
    return Number.isNaN(e.getTime()) ? "" : Ye(this.hass, e);
  }
  _cloud(t) {
    const e = this._num(t);
    return e === null ? "—" : `${Math.round(Math.min(100, Math.max(0, e)))}%`;
  }
  _at(t) {
    if (!this._forecast.length) return null;
    const e = Date.now() + t * 36e5;
    let i = null, r = 1 / 0;
    for (const a of this._forecast) {
      const s = new Date(a.datetime || 0).getTime(), n = this._num(a.cloud_coverage);
      if (!Number.isFinite(s) || n === null) continue;
      const c = Math.abs(s - e);
      c < r && (r = c, i = n);
    }
    return r <= 90 * 6e4 ? i : null;
  }
  _forecastPayload(t) {
    const e = this._config?.weather_entity || "weather.forecast_home";
    return t?.response?.[e] || t?.service_response?.[e] || t?.[e] || t?.response?.service_response?.[e] || null;
  }
  async _fetchForecast() {
    if (!this.hass || this._pending) return;
    const t = Date.now();
    if (t < (this._retryAt || 0) || this._lastFetch && t - this._lastFetch < 1800 * 1e3)
      return;
    this._pending = !0;
    const e = this._config?.weather_entity || "weather.forecast_home";
    try {
      const i = await this.hass.callWS({
        type: "call_service",
        domain: "weather",
        service: "get_forecasts",
        service_data: { type: "hourly" },
        target: { entity_id: e },
        return_response: !0
      }), r = this._forecastPayload(i);
      e === (this._config?.weather_entity || "weather.forecast_home") && (this._forecast = Array.isArray(r?.forecast) ? r.forecast.slice(0, 24) : [], this._lastFetch = Date.now(), this._failures = 0, this._retryAt = 0);
    } catch {
      e === (this._config?.weather_entity || "weather.forecast_home") && (this._failures = (this._failures || 0) + 1, this._retryAt = Date.now() + Math.min(300 * 1e3, 15e3 * 2 ** (this._failures - 1)));
    } finally {
      this._pending = !1;
    }
  }
  updated() {
    const t = this.renderRoot.querySelector("button");
    t && (this._interactionHandle?.destroy(), this._interactionHandle = S(t, {
      primary: () => this.moreInfo(this._config?.sun_entity || "sun.sun"),
      hold: () => this.moreInfo(
        this._config?.weather_entity || "weather.forecast_home"
      ),
      optimistic: !1,
      repeat: !1,
      feedback: !0
    }));
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.sun_entity || "sun.sun", e = this._config.weather_entity || "weather.forecast_home", i = this.hass?.states[t], r = this.hass?.states[e], a = !!(i && ["above_horizon", "below_horizon"].includes(i.state));
    let s = "Sun state unavailable", n = "";
    if (a)
      if (i?.state === "above_horizon") {
        const h = this._num(i.attributes?.elevation, 0), b = this._time(i.attributes?.next_setting);
        s = `Sun ${Math.round(h || 0)}°`, n = b ? `Sunset ${b}` : "Daylight";
      } else {
        const h = this._time(i?.attributes?.next_rising);
        s = "Night", n = h ? `Sunrise ${h}` : "Before sunrise";
      }
    const c = this._num(r?.attributes?.cloud_coverage), l = this._at(4), p = this._at(8), f = this._cloud(c), g = this._cloud(l), d = this._cloud(p), u = `${s}, cloud coverage ${f}, plus 4 hours ${g}, plus 8 hours ${d}, ${n}. Tap for sun details; hold for weather details.`;
    return o`
      <ha-card>
        <button type="button" aria-label="${this.esc(u)}">
          <span class="phase">${this.esc(s)}</span>
          <span class="clouds">
            <span class="cloud-item">
              <span class="cloud-label">Cloud Coverage</span>
              <span class="cloud-value now">${this.esc(f)}</span>
            </span>
            <span class="cloud-item">
              <span class="cloud-label">+4 Hours</span>
              <span class="cloud-value plus4">${this.esc(g)}</span>
            </span>
            <span class="cloud-item">
              <span class="cloud-label">+8 Hours</span>
              <span class="cloud-value plus8">${this.esc(d)}</span>
            </span>
          </span>
          <span class="event">${this.esc(n)}</span>
        </button>
      </ha-card>
    `;
  }
};
Ce.styles = dc;
Ha([
  x()
], Ce.prototype, "_forecast", 2);
Ce = Ha([
  k("solar-daylight-card-v7")
], Ce);
E({
  type: "solar-daylight-card-v7",
  element: Ce,
  name: "Solar Daylight Context",
  description: "Full-width sun context with centred current and forecast cloud coverage."
});
const mc = [
  T,
  P,
  nr,
  y`
    .wrap {
      box-sizing: border-box;
      padding: 6px 8px 8px;
    }
    .top {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 6px;
      margin: 0;
    }
    .meta {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .legend {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 14px;
      flex-wrap: wrap;
    }
    .legend button {
      appearance: none;
      min-height: 44px;
      border: 0;
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 3px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .legend button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }
    .swatch {
      width: 18px;
      height: 4px;
      border-radius: 999px;
      display: inline-block;
    }
    .house-swatch {
      background: var(--primary-color);
    }
    .solar-swatch {
      background: var(--warning-color);
    }
    .grid-swatch {
      background: var(--secondary-text-color);
    }
    .chart {
      position: relative;
      width: 100%;
      height: clamp(380px, 46vw, 500px);
    }
    .chart svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      touch-action: none;
    }
    .axis {
      fill: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 500;
      font-family: inherit;
    }
    .axis-small {
      fill: var(--secondary-text-color);
      font-size: 10px;
      font-weight: 600;
      font-family: inherit;
    }
    .gridline {
      stroke: var(--divider-color);
      stroke-width: 1;
    }
    .cursor-line {
      stroke: var(--primary-text-color);
      stroke-width: 1;
      opacity: 0.7;
    }
    .tooltip {
      position: absolute;
      top: 8px;
      padding: 8px 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      font-size: 11.5px;
      pointer-events: none;
      white-space: nowrap;
      z-index: 10;
    }
    .tooltip-time {
      font-weight: 650;
      margin-bottom: 4px;
      color: var(--primary-text-color);
    }
    .tooltip-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
      color: var(--secondary-text-color);
    }
    .tooltip-val {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
  `
];
var fc = Object.defineProperty, gc = Object.getOwnPropertyDescriptor, Ti = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? gc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && fc(e, i, a), a;
};
const bc = {
  type: "custom:energy-history-card-v3",
  profile: null,
  house_entity: "sensor.house_consumption_power",
  solar_entity: "sensor.total_solar_power",
  grid_entity: "sensor.refoss_smart_energy_monitor_em_channel_3_power",
  hours: 24,
  bucket_minutes: 10,
  calendar_day: !1,
  day_channel: null
};
let Et = class extends A {
  constructor() {
    super(...arguments), this._series = {}, this._loading = !1, this._selectedDay = null, this._start = 0, this._end = 0, this._lastRangeKey = null, this._forceRefresh = !1, this._fetchSequence = 0, this._dayUnsubscribe = null, this._pinned = !1, this._pointerState = null, this._resizeObserver = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === this._config?.profile && (this.hass && this._config?.profile && Je.invalidateProfile(this.hass, this._config.profile), this._forceRefresh = !0, this._lastRangeKey = null, this._fetchData());
    }, this._outsideListener = (t) => {
      this._pinned && !t.composedPath?.().includes(this) && (this._pinned = !1);
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = { ...bc, ...t || {} };
    e.profile && (e.calendar_day = !0), super.setConfig(e), this._config?.day_channel && this.hass && (this._selectedDay = j.get(
      this._config.day_channel,
      this.hass
    )), this.isConnected && this._bindDayChannel(), this._fetchData();
  }
  getCardSize() {
    return 7;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("pointerdown", this._outsideListener, !0), window.addEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._bindDayChannel(), this._fetchData();
  }
  disconnectedCallback() {
    window.removeEventListener("pointerdown", this._outsideListener, !0), window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._dayUnsubscribe?.(), this._dayUnsubscribe = null, this._resizeObserver?.disconnect(), this._resizeObserver = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  _bindDayChannel() {
    this._dayUnsubscribe?.(), this._dayUnsubscribe = null, !(!this._config?.calendar_day || !this._config?.day_channel) && (this._dayUnsubscribe = j.subscribe(
      this._config.day_channel,
      (t) => {
        t.day !== this._selectedDay && (this._selectedDay = t.day, this._lastRangeKey = null, this._fetchData());
      },
      { hass: this.hass }
    ));
  }
  _range() {
    if (this._config?.calendar_day) {
      const r = j.today(this.hass), a = this._selectedDay && this._selectedDay <= r ? this._selectedDay : r, s = ta(this.hass, a), n = s?.start ?? Date.now() - 864e5, c = s?.end ?? Date.now();
      return { start: n, end: c, day: a, isToday: a === r };
    }
    const t = Math.max(5, Number(this._config?.bucket_minutes) || 10) * 6e4, e = Math.floor(Date.now() / t) * t, i = Math.max(1, Number(this._config?.hours) || 24);
    return { start: e - i * 36e5, end: e, isToday: !1, day: "" };
  }
  _rangeKey(t) {
    return `${t.day}:${t.start}:${t.end}:${t.isToday ? Math.floor(Date.now() / 3e5) : "fixed"}:${this._config?.profile || ""}:${this._config?.house_entity}:${this._config?.solar_entity}:${this._config?.grid_entity}:${this._config?.bucket_minutes}`;
  }
  async _fetchData() {
    if (!this.hass || !this._config) return;
    const t = this._range(), e = this._rangeKey(t);
    if (e === this._lastRangeKey && !this._forceRefresh) return;
    const i = ++this._fetchSequence;
    this._loading = !0;
    const r = this._forceRefresh;
    this._forceRefresh = !1;
    try {
      if (this._config.profile) {
        const a = await Je.get(
          this.hass,
          this._config.profile,
          t.day,
          { force: r }
        );
        if (i !== this._fetchSequence) return;
        const s = Array.isArray(a?.series) ? a.series : [];
        this._series = {
          house: s.map((n) => ({
            t: new Date(n.start).getTime(),
            v: Number(n.house) || 0
          })),
          solar: s.map((n) => ({
            t: new Date(n.start).getTime(),
            v: Number(n.solar) || 0
          })),
          grid: s.map((n) => ({
            t: new Date(n.start).getTime(),
            v: Number(n.grid) || 0
          }))
        }, this._start = Number(a?.range?.start) || t.start, this._end = Number(a?.range?.end) || t.end;
      } else
        this._start = t.start, this._end = t.end;
      this._lastRangeKey = e;
    } catch {
    } finally {
      i === this._fetchSequence && (this._loading = !1);
    }
  }
  _niceMax(t) {
    if (t <= 0) return 1e3;
    const e = 10 ** Math.floor(Math.log10(t)), i = t / e;
    return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * e;
  }
  _paths(t, e, i, r = null) {
    const a = [];
    let s = "", n = null, c = [];
    const l = () => {
      if (!c.length) return;
      const p = c.map(
        (f, g) => `${g ? "L" : "M"}${e(f.t).toFixed(1)},${i(f.v).toFixed(1)}`
      ).join(" ");
      if (a.push(p), r !== null) {
        const f = c[0], g = c[c.length - 1];
        s += `${p} L${e(g.t).toFixed(1)},${r.toFixed(1)} L${e(f.t).toFixed(1)},${r.toFixed(1)} Z `;
      }
      c = [];
    };
    for (const p of t || [])
      n !== null && p.t - n > 15 * 6e4 && l(), c.push(p), n = p.t;
    return l(), { line: a.join(" "), fill: s.trim() };
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const r = this.renderRoot.querySelector(e);
      r && i && this._interactionHandles.push(
        S(r, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house-key", this._config?.house_entity), t(".solar-key", this._config?.solar_entity), t(".grid-key", this._config?.grid_entity);
  }
  render() {
    if (!this._config) return o``;
    const t = (this._series.house?.length || 0) > 0 || (this._series.solar?.length || 0) > 0 || (this._series.grid?.length || 0) > 0, e = this._config.calendar_day ? this._selectedDay === j.today(this.hass) ? "Today" : vi(this.hass, this._selectedDay || "", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }) : null, i = e ? `${e} · ${this._config.bucket_minutes || 10}-minute average` : `${this._config.bucket_minutes || 10}-minute average`, r = 800, a = 420, s = 58, n = 8, c = 6, l = Math.round(a * 0.7), p = l + 20, f = p + 18, g = a - 18, d = s, u = r - n, h = this._start || Date.now() - 864e5, b = this._end || Date.now(), m = (R) => d + (R - h) / (b - h) * (u - d), _ = [
      ...this._series.house || [],
      ...this._series.solar || []
    ].map((R) => Math.max(0, R.v)), $ = this._niceMax(Math.max(1, ..._) * 1.06), v = (R) => l - Math.max(0, R) / $ * (l - c), z = Math.max(
      100,
      ...(this._series.grid || []).map((R) => Math.abs(R.v))
    ), N = this._niceMax(z * 1.08), L = (f + g) / 2, M = (R) => L - R / N * ((g - f) / 2), C = this._paths(this._series.house, m, v), H = this._paths(this._series.solar, m, v, l), G = this._paths(this._series.grid, m, M);
    return o`
      <ha-card>
        <div class="wrap">
          <div class="top">
            <div class="meta">${this.esc(i)}</div>
            <div class="legend">
              <button
                class="house-key"
                type="button"
                aria-label="House power history details"
              >
                <span class="swatch house-swatch"></span>
                <span>House</span>
              </button>
              <button
                class="solar-key"
                type="button"
                aria-label="Solar power history details"
              >
                <span class="swatch solar-swatch"></span>
                <span>Solar</span>
              </button>
              <button
                class="grid-key"
                type="button"
                aria-label="Grid power history details"
              >
                <span class="swatch grid-swatch"></span>
                <span>Grid</span>
              </button>
            </div>
          </div>

          <div class="chart">
            <svg
              viewBox="0 0 ${r} ${a}"
              role="img"
              aria-label="Household power history"
              @pointerdown=${(R) => {
      this._pointerState = {
        id: R.pointerId,
        x: R.clientX,
        y: R.clientY,
        moved: !1
      };
    }}
              @pointermove=${(R) => {
      this._pointerState && Math.hypot(
        R.clientX - this._pointerState.x,
        R.clientY - this._pointerState.y
      ) > 6 && (this._pointerState.moved = !0);
    }}
              @pointerup=${() => {
      this._pointerState = null;
    }}
            >
              ${[0, 1, 2, 3, 4].map((R) => {
      const V = $ * (1 - R / 4), W = c + (l - c) * (R / 4);
      return o`
                  <line
                    class="gridline"
                    x1="${d}"
                    y1="${W}"
                    x2="${u}"
                    y2="${W}"
                  ></line>
                  <text
                    class="axis"
                    x="${d - 8}"
                    y="${W + 4}"
                    text-anchor="end"
                  >
                    ${st(this.hass, V)}
                  </text>
                `;
    })}
              ${[0, 1, 2, 3, 4, 5, 6].map((R) => {
      const V = h + (b - h) * R / 6, W = m(V), Ht = new Date(V).getMinutes() === 0 ? Ye(this.hass, V, { minute: void 0 }) : Ye(this.hass, V);
      return o`
                  <text
                    class="axis"
                    x="${W}"
                    y="${p}"
                    text-anchor="${R === 0 ? "start" : R === 6 ? "end" : "middle"}"
                  >
                    ${Ht}
                  </text>
                `;
    })}

              <line
                class="zero"
                x1="${d}"
                y1="${L}"
                x2="${u}"
                y2="${L}"
              ></line>
              <text
                class="axis-small"
                x="${u - 2}"
                y="${f + 10}"
                text-anchor="end"
              >
                Import
              </text>
              <text
                class="axis-small"
                x="${u - 2}"
                y="${g - 3}"
                text-anchor="end"
              >
                Export
              </text>

              ${H.fill ? o`<path class="solar-fill" d="${H.fill}"></path>` : ""}
              ${H.line ? o`<path class="solar-line" d="${H.line}"></path>` : ""}
              ${C.line ? o`<path class="house-line" d="${C.line}"></path>` : ""}
              ${G.line ? o`<path class="grid-line" d="${G.line}"></path>` : ""}
            </svg>

            ${t ? "" : o`<div class="status">
                    ${this._loading ? "Loading history…" : "No recorded data for this day"}
                  </div>`}
          </div>
        </div>
      </ha-card>
    `;
  }
};
Et.styles = mc;
Ti([
  x()
], Et.prototype, "_series", 2);
Ti([
  x()
], Et.prototype, "_loading", 2);
Ti([
  x()
], Et.prototype, "_selectedDay", 2);
Et = Ti([
  k("energy-history-card-v3")
], Et);
E({
  type: "energy-history-card-v3",
  element: Et,
  name: "Energy History",
  description: "Dense readable power history supporting rolling or local calendar-day ranges using completed 10-minute averages and a signed grid strip."
});
var _c = Object.getOwnPropertyDescriptor, vc = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? _c(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const yc = {
  type: "custom:component-energy-dashboard-v1",
  profile: "household-energy",
  day_channel: "energy-day",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let Se = class extends A {
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...yc, ...t });
  }
  getCardSize() {
    return 12;
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.profile || "household-energy", e = this._config.day_channel || "energy-day", i = this._config.weather_entity || "weather.forecast_home", r = this._config.sun_entity || "sun.sun";
    return o`
      <div class="layout">
        <div class="selector">
          <component-energy-day-selector-v1
            .hass=${this.hass}
            .config=${{
      type: "custom:component-energy-day-selector-v1",
      channel: e
    }}
          ></component-energy-day-selector-v1>
        </div>
        <div class="summary">
          <component-energy-summary-v1
            .hass=${this.hass}
            .config=${{
      type: "custom:component-energy-summary-v1",
      profile: t,
      day_channel: e
    }}
          ></component-energy-summary-v1>
        </div>
        <div class="context">
          <div class="daylight">
            <solar-daylight-card-v7
              .hass=${this.hass}
              .config=${{
      type: "custom:solar-daylight-card-v7",
      weather_entity: i,
      sun_entity: r
    }}
            ></solar-daylight-card-v7>
          </div>
        </div>
        <div class="history">
          <energy-history-card-v3
            .hass=${this.hass}
            .config=${{
      type: "custom:energy-history-card-v3",
      profile: t,
      calendar_day: !0,
      day_channel: e,
      bucket_minutes: 10,
      house_entity: "sensor.ha_component_house_power",
      solar_entity: "sensor.ha_component_solar_power",
      grid_entity: "sensor.ha_component_grid_power"
    }}
          ></energy-history-card-v3>
        </div>
      </div>
    `;
  }
};
Se.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
Se.styles = rc;
Se = vc([
  k("component-energy-dashboard-v1")
], Se);
E({
  type: "component-energy-dashboard-v1",
  element: Se,
  name: "Energy Dashboard V1",
  description: "Single-card Energy composition using shared day state and one backend data contract."
});
const xc = [
  T,
  P,
  nr,
  y`
    .wrap {
      box-sizing: border-box;
      padding: 6px 8px 8px;
    }
    .top {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 6px;
    }
    .meta {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .legend {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 14px;
      flex-wrap: wrap;
    }
    .legend button {
      appearance: none;
      min-height: 44px;
      border: 0;
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      padding: 3px 0;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
    }
    .legend button:active {
      transform: scale(0.97);
    }
    .legend button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }
    .sw {
      width: 18px;
      height: 4px;
      border-radius: 999px;
    }
    .s1 {
      background: var(--primary-color);
    }
    .s2 {
      background: var(--warning-color);
    }
    .s3 {
      background: var(--secondary-text-color);
    }
    .chart {
      position: relative;
      width: 100%;
      height: clamp(380px, 46vw, 500px);
    }
    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      touch-action: none;
    }
    .axis {
      fill: var(--secondary-text-color);
      font-size: 11px;
      font-weight: 500;
      font-family: inherit;
    }
    .small {
      fill: var(--secondary-text-color);
      font-size: 10px;
      font-weight: 600;
      font-family: inherit;
    }
    .grid {
      stroke: var(--divider-color);
      stroke-width: 1px;
    }
    .scrub {
      position: absolute;
      top: 0;
      bottom: 24px;
      width: 1px;
      background: var(--primary-text-color);
      pointer-events: none;
      opacity: 0.7;
    }
    .tooltip {
      position: absolute;
      top: 8px;
      padding: 8px 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      font-size: 11.5px;
      pointer-events: none;
      white-space: nowrap;
      z-index: 10;
    }
    .tooltip-time {
      font-weight: 650;
      margin-bottom: 4px;
      color: var(--primary-text-color);
    }
    .tooltip-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 2px;
      color: var(--secondary-text-color);
    }
    .tooltip-val {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
  `
];
var wc = Object.defineProperty, $c = Object.getOwnPropertyDescriptor, gr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? $c(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && wc(e, i, a), a;
};
const kc = {
  type: "custom:component-history-graph-v2",
  meta_text: "Aggregation label",
  series_1_label: "Primary series",
  series_2_label: "Secondary series",
  series_3_label: "Supporting series",
  positive_label: "Positive",
  negative_label: "Negative"
};
let te = class extends A {
  constructor() {
    super(...arguments), this._hiddenSeries = /* @__PURE__ */ new Set(), this._tooltip = {
      show: !1,
      text: "",
      x: 0,
      y: 0
    }, this._pinned = !1, this._pointerState = null, this._resizeObserver = null, this._outsideListener = (t) => {
      !this._pinned || t.composedPath?.().includes(this) || (this._pinned = !1, this._hideTip());
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...kc, ...t });
  }
  getCardSize() {
    return 7;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("pointerdown", this._outsideListener, !0), this._attachResizeObserver();
  }
  disconnectedCallback() {
    window.removeEventListener("pointerdown", this._outsideListener, !0), this._resizeObserver?.disconnect(), this._resizeObserver = null, super.disconnectedCallback();
  }
  firstUpdated() {
    this._attachResizeObserver();
  }
  _attachResizeObserver() {
    if (typeof ResizeObserver > "u") return;
    this._resizeObserver || (this._resizeObserver = new ResizeObserver(() => {
      this.requestUpdate();
    }));
    const t = this.renderRoot?.querySelector?.(".chart");
    t && this._resizeObserver.observe(t);
  }
  _toggleSeries(t) {
    const e = new Set(this._hiddenSeries);
    e.has(t) ? e.delete(t) : e.add(t), this._hiddenSeries = e;
  }
  _hideTip() {
    this._tooltip = { show: !1, text: "", x: 0, y: 0 };
  }
  _handlePointer(t) {
    const e = this.renderRoot.querySelector(".chart");
    if (!e) return;
    const i = e.getBoundingClientRect(), r = Math.max(320, Math.round(i.width || 800)), a = r < 520 ? 48 : 58, s = 8, n = a, c = r - s, l = (t.clientX - i.left) * (r / i.width), p = Math.max(n, Math.min(c, l)), f = (p - n) / (c - n), g = Math.round(f * 100), d = [
      [
        1,
        this._config?.series_1_label || "Primary series",
        Math.round(20 + f * 80)
      ],
      [
        2,
        this._config?.series_2_label || "Secondary series",
        Math.round(75 - f * 45)
      ],
      [
        3,
        this._config?.series_3_label || "Supporting series",
        Math.round((f - 0.5) * 40)
      ]
    ].filter(([h]) => !this._hiddenSeries.has(Number(h))), u = `<div style="font-weight:650;margin-bottom:4px">${g}% through range</div>${d.map(
      ([, h, b]) => `<div class="tr"><span>${h}</span><b>${b}</b></div>`
    ).join("")}`;
    this._tooltip = {
      show: !0,
      text: u,
      x: p / r * i.width,
      y: Math.max(70, i.height * 0.42)
    };
  }
  render() {
    if (!this._config) return o``;
    const t = 800, e = 420, i = 58, r = 8, a = 6, s = Math.round(e * 0.7), n = s + 20, c = n + 18, l = e - 18, p = i, f = t - r, g = f - p, d = s - a, u = (c + l) / 2, h = (z, N) => `${(p + g * z).toFixed(1)},${(a + d * N).toFixed(1)}`, b = (z, N) => `${(p + g * z).toFixed(1)},${(u + (l - c) * 0.32 * N).toFixed(1)}`, m = `M${h(0, 0.68)} L${h(0.08, 0.61)} L${h(0.17, 0.7)} L${h(0.26, 0.38)} L${h(0.35, 0.52)} L${h(0.44, 0.24)} L${h(0.53, 0.43)} L${h(0.62, 0.35)} L${h(0.72, 0.63)} L${h(0.82, 0.48)} L${h(0.91, 0.59)} L${h(1, 0.44)}`, _ = `M${h(0, 0.86)} L${h(0.12, 0.75)} L${h(0.24, 0.52)} L${h(0.36, 0.42)} L${h(0.48, 0.55)} L${h(0.6, 0.72)} L${h(0.72, 0.82)} L${h(0.84, 0.91)} L${h(1, 0.94)}`, $ = `M${b(0, 0.08)} L${b(0.1, -0.1)} L${b(0.2, 0.12)} L${b(0.3, -0.2)} L${b(0.4, 0.02)} L${b(0.5, -0.35)} L${b(0.6, 0.16)} L${b(0.7, 0.28)} L${b(0.8, -0.12)} L${b(0.9, 0.05)} L${b(1, -0.08)}`, v = `${_} L${f},${s} L${p},${s} Z`;
    return o`
      <ha-card>
        <div class="wrap">
          <div class="top">
            <div class="meta">
              ${this.esc(this._config.meta_text || "Aggregation label")}
            </div>
            <div class="legend">
              <button
                type="button"
                data-series="1"
                aria-pressed="${String(!this._hiddenSeries.has(1))}"
                aria-label="Toggle ${this.esc(this._config.series_1_label || "Primary series")}"
                @click=${() => this._toggleSeries(1)}
              >
                <span class="sw s1"></span>
                <span
                  >${this.esc(this._config.series_1_label || "Primary series")}</span
                >
              </button>
              <button
                type="button"
                data-series="2"
                aria-pressed="${String(!this._hiddenSeries.has(2))}"
                aria-label="Toggle ${this.esc(this._config.series_2_label || "Secondary series")}"
                @click=${() => this._toggleSeries(2)}
              >
                <span class="sw s2"></span>
                <span
                  >${this.esc(this._config.series_2_label || "Secondary series")}</span
                >
              </button>
              <button
                type="button"
                data-series="3"
                aria-pressed="${String(!this._hiddenSeries.has(3))}"
                aria-label="Toggle ${this.esc(this._config.series_3_label || "Supporting series")}"
                @click=${() => this._toggleSeries(3)}
              >
                <span class="sw s3"></span>
                <span
                  >${this.esc(this._config.series_3_label || "Supporting series")}</span
                >
              </button>
            </div>
          </div>

          <div class="chart">
            <svg
              viewBox="0 0 ${t} ${e}"
              role="img"
              aria-label="Interactive reusable graph example"
              @pointerdown=${(z) => {
      this._pointerState = {
        id: z.pointerId,
        x: z.clientX,
        y: z.clientY,
        moved: !1
      }, this._handlePointer(z);
    }}
              @pointermove=${(z) => {
      if (this._pointerState?.id === z.pointerId) {
        Math.hypot(
          z.clientX - this._pointerState.x,
          z.clientY - this._pointerState.y
        ) > 6 && (this._pointerState.moved = !0), this._handlePointer(z);
        return;
      }
      !this._pinned && z.pointerType !== "touch" && this._handlePointer(z);
    }}
              @pointerup=${(z) => {
      const N = this._pointerState;
      !N || N.id !== z.pointerId || (this._pointerState = null, N.moved ? (this._pinned = !1, z.pointerType === "touch" && this._hideTip()) : this._pinned ? (this._pinned = !1, this._hideTip()) : (this._handlePointer(z), this._pinned = !0));
    }}
              @pointerleave=${() => {
      !this._pinned && !this._pointerState && this._hideTip();
    }}
            >
              ${["Max", "75%", "50%", "25%", "0"].map((z, N) => {
      const L = a + d * N / 4;
      return o`
                  <line
                    class="grid"
                    x1="${p}"
                    y1="${L}"
                    x2="${f}"
                    y2="${L}"
                  ></line>
                  <text
                    class="axis"
                    x="${p - 8}"
                    y="${L + 4}"
                    text-anchor="end"
                    >${z}</text
                  >
                `;
    })}
              ${["Start", "¼", "½", "¾", "End"].map((z, N) => {
      const L = p + g * N / 4;
      return o`
                  <text
                    class="axis"
                    x="${L}"
                    y="${n}"
                    text-anchor="${N === 0 ? "start" : N === 4 ? "end" : "middle"}"
                  >
                    ${z}
                  </text>
                `;
    })}
              <line
                class="zero"
                x1="${p}"
                y1="${u}"
                x2="${f}"
                y2="${u}"
              ></line>
              <text
                class="small"
                x="${f - 2}"
                y="${c + 10}"
                text-anchor="end"
              >
                ${this.esc(this._config.positive_label || "Positive")}
              </text>
              <text class="small" x="${f - 2}" y="${l - 3}" text-anchor="end">
                ${this.esc(this._config.negative_label || "Negative")}
              </text>

              ${this._hiddenSeries.has(2) ? "" : o`
                      <path class="f2" d="${v}"></path>
                      <path class="l2" d="${_}"></path>
                    `}
              ${this._hiddenSeries.has(1) ? "" : o`<path class="l1" d="${m}"></path>`}
              ${this._hiddenSeries.has(3) ? "" : o`<path class="l3" d="${$}"></path>`}
              ${this._tooltip.show ? o`<line
                      class="cursor"
                      x1="${this._tooltip.x}"
                      y1="${a}"
                      x2="${this._tooltip.x}"
                      y2="${l}"
                    ></line>` : ""}
            </svg>

            <div
              class="tip ${this._tooltip.show ? "show" : ""}"
              style="left:${this._tooltip.x}px; top:${this._tooltip.y}px;"
              .innerHTML=${this._tooltip.text}
            ></div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
te.styles = xc;
gr([
  x()
], te.prototype, "_hiddenSeries", 2);
gr([
  x()
], te.prototype, "_tooltip", 2);
te = gr([
  k("component-history-graph-v2")
], te);
E({
  type: "component-history-graph-v2",
  element: te,
  name: "History Graph",
  description: "Reusable interactive history graph component."
});
const Cc = [
  T,
  P,
  y`
    .wrap {
      box-sizing: border-box;
      padding: 12px 14px;
      display: grid;
      grid-template-columns: minmax(82px, auto) minmax(0, 1fr);
      gap: 16px;
      align-items: stretch;
    }
    button {
      appearance: none;
      border: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      padding: 0;
      min-width: 0;
      min-height: 44px;
    }
    button:not(:disabled) {
      cursor: pointer;
    }
    button:disabled {
      opacity: 1;
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }
    .left {
      text-align: left;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 1px;
    }
    .right {
      text-align: right;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
    }
    .left-value {
      font-size: 20px;
      line-height: 1;
      font-weight: 550;
      letter-spacing: -0.02em;
      color: var(--primary-text-color);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .left-label {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .right-top,
    .right-bottom {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 5px;
      max-width: 100%;
      font-size: 13px;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .right-bottom {
      margin-top: 3px;
    }
    .right-value,
    .right-primary {
      font-weight: 600;
      color: var(--primary-text-color);
      flex: 0 0 auto;
      font-variant-numeric: tabular-nums;
    }
    .right-label,
    .right-secondary {
      font-weight: 400;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
        grid-template-columns: minmax(76px, auto) minmax(0, 1fr);
        gap: 12px;
      }
    }
  `
];
var Sc = Object.defineProperty, Ac = Object.getOwnPropertyDescriptor, Ie = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Ac(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Sc(e, i, a), a;
};
const Ec = {
  type: "custom:metric-pair-card-v3",
  left_value: "Primary value",
  left_label: "Primary label",
  right_value: "Secondary value",
  right_label: "Secondary label",
  right_primary: "Primary text",
  right_secondary: "Secondary text",
  deadband: 15,
  day_channel: null
};
let _t = class extends A {
  constructor() {
    super(...arguments), this._selectedDay = j.today(), this._stats = {}, this._loading = !1, this._error = "", this._lastKey = null, this._interactionHandles = [];
  }
  _onDayChange(t) {
    !t || t === this._selectedDay || (this._selectedDay = t, this._error = "", this._lastKey = null, this._scheduleStats());
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = this._config?.day_channel;
    if (super.setConfig({ ...Ec, ...t }), this.isConnected && e !== this._config?.day_channel) {
      this._dayUnsubscribe?.();
      const i = this._config?.day_channel || "energy-day";
      this._selectedDay = j.get(i, this.hass), this._dayUnsubscribe = j.subscribe(
        i,
        (r) => this._onDayChange(r.day)
      );
    }
    this._scheduleStats();
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback();
    const t = this._config?.day_channel || "energy-day";
    this._selectedDay = j.get(t, this.hass), this._dayUnsubscribe = j.subscribe(
      t,
      (e) => this._onDayChange(e.day)
    ), this._scheduleStats();
  }
  disconnectedCallback() {
    this._dayUnsubscribe?.(), this._dayUnsubscribe = void 0;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  _isToday() {
    return this._selectedDay === j.today(this.hass);
  }
  _range() {
    const t = ta(this.hass, this._selectedDay);
    if (t) return t;
    const e = /* @__PURE__ */ new Date();
    return e.setHours(0, 0, 0, 0), { start: e.getTime(), end: e.getTime() + 864e5 };
  }
  _entity(t) {
    return !t || typeof t != "object" ? null : typeof t.entity == "string" ? t.entity : Array.isArray(t.entities) ? t.entities.find((e) => typeof e == "string") || null : Array.isArray(t.terms) && t.terms.find((i) => i && typeof i.entity == "string")?.entity || null;
  }
  _clickEntity(t) {
    return t === "left" ? this._config?.left_more_info_entity || this._entity(this._config?.left_value) || this._entity(this._config?.left_label) || null : this._config?.right_more_info_entity || this._entity(this._config?.right_value) || this._entity(this._config?.right_label) || this._entity(this._config?.right_primary) || this._entity(this._config?.right_secondary) || null;
  }
  _formatNeeds(t) {
    return !t || typeof t != "object" ? null : String(t.format || "").startsWith("energy_kwh_day") ? "change" : null;
  }
  _statEntities() {
    const t = /* @__PURE__ */ new Set(), e = [
      this._config?.left_value,
      this._config?.left_label,
      this._config?.right_value,
      this._config?.right_label,
      this._config?.right_primary,
      this._config?.right_secondary
    ];
    for (const i of e)
      if (!(this._formatNeeds(i) !== "change" || typeof i != "object" || !i)) {
        typeof i.entity == "string" && t.add(i.entity);
        for (const r of i.entities || [])
          typeof r == "string" && t.add(r);
        for (const r of i.terms || [])
          typeof r?.entity == "string" && t.add(r.entity);
      }
    return { change: [...t].sort() };
  }
  _currentKey() {
    const t = this._statEntities(), e = this._isToday() ? Math.floor(Date.now() / 3e5) : "fixed";
    return `${this._selectedDay}|${e}|c:${t.change.join(",")}`;
  }
  async _scheduleStats() {
    if (!this.hass || !this._config?.day_channel) return;
    const t = this._statEntities();
    if (!t.change.length) return;
    const e = this._currentKey();
    if (this._loading || e === this._lastKey) return;
    this._loading = !0, this._error = "";
    const i = this._range();
    try {
      const r = await this.hass.callWS({
        type: "recorder/statistics_during_period",
        start_time: new Date(i.start).toISOString(),
        end_time: new Date(i.end).toISOString(),
        statistic_ids: t.change,
        period: "5minute",
        types: ["change"]
      });
      if (e !== this._currentKey()) return;
      const a = {};
      for (const s of t.change) {
        const c = (r?.[s] || []).filter((l) => {
          const p = typeof l.start == "number" ? l.start : Date.parse(l.start);
          return Number.isFinite(p) && p >= i.start && p < i.end;
        }).map((l) => Number(l.change)).filter(Number.isFinite);
        a[s] = {
          change: c.length ? c.reduce((l, p) => l + p, 0) : null
        };
      }
      this._stats = a, this._lastKey = e;
    } catch {
      e === this._currentKey() && (this._error = "Data unavailable");
    } finally {
      this._loading = !1;
    }
  }
  _number(t, e) {
    const i = this._stats?.[t]?.[e];
    return Number.isFinite(i) ? i : null;
  }
  _liveNumber(t) {
    const e = this.hass?.states?.[t];
    if (!e || ["unknown", "unavailable"].includes(e.state)) return null;
    const i = Number(e.state);
    return Number.isFinite(i) ? i : null;
  }
  _resolve(t) {
    if (t == null) return "";
    if (typeof t != "object") return String(t);
    if (t.text !== void 0) return String(t.text);
    const e = String(t.format || "");
    if (this._formatNeeds(t)) {
      if (this._loading) return "Loading…";
      if (this._error) return this._error;
    }
    if (e === "energy_kwh_day")
      return ft(this.hass, this._number(t.entity, "change"));
    if (e === "energy_kwh_day_sum") {
      if (!Array.isArray(t.entities) || !t.entities.length) return "—";
      let r = 0;
      for (const a of t.entities) {
        const s = this._number(a, "change");
        if (s === null) return "—";
        r += s;
      }
      return ft(this.hass, r);
    }
    if (e === "energy_kwh_day_formula") {
      if (!Array.isArray(t.terms) || !t.terms.length) return "—";
      let r = 0;
      for (const a of t.terms) {
        const s = this._number(a?.entity, "change");
        if (s === null) return "—";
        r += s * (Number.isFinite(Number(a.factor)) ? Number(a.factor) : 1);
      }
      return ft(this.hass, r);
    }
    if (["watts", "watts_abs"].includes(e))
      return st(this.hass, this._liveNumber(t.entity), {
        absolute: e === "watts_abs"
      });
    if (e === "grid_import_watts") {
      const r = this._liveNumber(t.entity), a = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "—" : `${Math.round(r >= a ? r : 0)} W`;
    }
    if (e === "grid_export_watts") {
      const r = this._liveNumber(t.entity), a = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "—" : `${Math.round(r <= -a ? Math.abs(r) : 0)} W`;
    }
    if (e === "grid_label") {
      const r = this._liveNumber(t.entity), a = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "Live grid" : r >= a ? "Live grid import" : r <= -a ? "Live grid export" : "Live grid flow";
    }
    if (e === "grid_direction") {
      const r = this._liveNumber(t.entity), a = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "Unavailable" : r >= a ? "Importing now" : r <= -a ? "Exporting now" : "Balanced now";
    }
    if (!t.entity) return "";
    const i = this.hass?.states?.[t.entity];
    return i ? String(i.state) : t.unavailable || "Unavailable";
  }
  updated() {
    for (const a of this._interactionHandles) a.destroy();
    this._interactionHandles = [];
    const t = this.renderRoot.querySelector(
      ".left"
    ), e = this.renderRoot.querySelector(
      ".right"
    ), i = this._clickEntity("left"), r = this._clickEntity("right");
    t && i && this._interactionHandles.push(
      S(t, {
        primary: () => this.moreInfo(i),
        feedback: !0
      })
    ), e && r && this._interactionHandles.push(
      S(e, {
        primary: () => this.moreInfo(r),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._resolve(this._config.left_value), e = this._resolve(this._config.left_label), i = this._resolve(this._config.right_value), r = this._resolve(this._config.right_label), a = this._resolve(this._config.right_primary), s = this._resolve(this._config.right_secondary), n = this._clickEntity("left"), c = this._clickEntity("right"), l = [e, t].filter(Boolean).join(": "), p = [i, r, a, s].filter(Boolean).join(" ");
    return o`
      <ha-card>
        <div class="wrap">
          <button
            class="left"
            type="button"
            ?disabled=${!n}
            aria-label="${this.esc(l || "Left metric")}"
          >
            <div class="left-value">${this.esc(t)}</div>
            <div class="left-label">${this.esc(e)}</div>
          </button>
          <button
            class="right"
            type="button"
            ?disabled=${!c}
            aria-label="${this.esc(p || "Right metric")}"
          >
            <div class="right-top">
              <span class="right-value">${this.esc(i)}</span>
              <span class="right-label">${this.esc(r)}</span>
            </div>
            <div class="right-bottom">
              <span class="right-primary">${this.esc(a)}</span>
              <span class="right-secondary">${this.esc(s)}</span>
            </div>
          </button>
        </div>
      </ha-card>
    `;
  }
};
_t.styles = Cc;
Ie([
  x()
], _t.prototype, "_selectedDay", 2);
Ie([
  x()
], _t.prototype, "_stats", 2);
Ie([
  x()
], _t.prototype, "_loading", 2);
Ie([
  x()
], _t.prototype, "_error", 2);
_t = Ie([
  k("metric-pair-card-v3")
], _t);
E({
  type: "metric-pair-card-v3",
  element: _t,
  name: "Metric Pair",
  description: "Live power metrics with selected-day energy totals."
});
const zc = [
  T,
  P,
  tt,
  F,
  q,
  y`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    }
    .wrap {
      padding: 0;
    }
    .head {
      min-height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      padding: 0 2px;
    }
    .heading {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .heading ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 18px;
    }
    .heading h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
      max-width: 448px;
    }
    .item {
      position: relative;
      min-width: 0;
      min-height: 48px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      overflow: hidden;
      color: var(--primary-text-color);
    }
    .main {
      min-width: 0;
      min-height: 48px;
      padding: 6px 10px;
      text-align: left;
      background: transparent;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .item.has-quick .main {
      padding-right: 4px;
    }
    .main:hover,
    .quick:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .item.active {
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
    }
    .item.active .state {
      color: var(--primary-color);
      font-weight: 600;
    }
    .item.unavailable {
      opacity: 0.45;
    }
    .quick {
      width: 40px;
      min-height: 48px;
      border-left: 1px solid var(--divider-color);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      cursor: pointer;
    }
    .icon {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      color: var(--primary-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 18px;
    }
    .copy {
      min-width: 0;
    }
    .name {
      display: block;
      font-size: 12.5px;
      font-weight: 600;
      line-height: 1.2;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .state {
      display: block;
      margin-top: 2px;
      font-size: 11px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .empty,
    .load-error {
      grid-column: 1 / -1;
      min-height: 48px;
      padding: 12px 14px;
      border: 1px dashed var(--dashboard-card-border-color);
      border-radius: var(--dashboard-radius-card);
      background: transparent;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.35;
      text-align: center;
    }
    @media (max-width: 520px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `
];
var Tc = Object.defineProperty, Dc = Object.getOwnPropertyDescriptor, Di = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Dc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Tc(e, i, a), a;
};
const ji = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
let zt = class extends A {
  constructor() {
    super(...arguments), this._selected = [], this._registry = null, this._interactionHandles = [], this._unsubRegistry = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = Array.isArray(t?.helpers) ? t.helpers.filter((a) => typeof a == "string") : [], i = Array.isArray(t?.items) ? t.items.slice(0, 4) : [], r = String(t?.preference_key || "").trim();
    super.setConfig({
      title: "Favourites",
      max: 4,
      show_header: e.length > 0 || !!r,
      ...t || {},
      helpers: r ? [] : e.slice(0, 4),
      items: i,
      preference_key: r || null
    }), this._loadBackendFavourites(), this._ensureRegistry();
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), this._subscribeRegistryEvents(), this._ensureRegistry(), this._loadBackendFavourites();
  }
  disconnectedCallback() {
    this._unsubscribeRegistryEvents();
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("hass") && this.hass && (this._unsubRegistry || (this._subscribeRegistryEvents(), this._ensureRegistry()), this._config?.helpers?.length && !this._config?.preference_key && this._loadBackendFavourites());
  }
  _subscribeRegistryEvents() {
    !this.isConnected || this._unsubRegistry || !this.hass || (this._unsubRegistry = I.subscribe(this.hass, (t) => {
      this._buildRegistryIndex(t);
    }));
  }
  _unsubscribeRegistryEvents() {
    this._unsubRegistry?.(), this._unsubRegistry = null;
  }
  async _loadBackendFavourites(t = !1) {
    if (!this.hass || !this._config?.preference_key) {
      this._config?.helpers?.length && (this._selected = this._config.helpers.map((e) => this._parseSlot(this.hass?.states?.[e]?.state)).filter((e) => !!e));
      return;
    }
    try {
      const e = globalThis.__homeDashboardV2?.prefs;
      if (e) {
        const i = await e(this.hass, this._config.preference_key);
        this._selected = Array.isArray(i) ? i.map((r) => this._normaliseRef(r)).filter((r) => !!r).slice(0, this._config.max || 4) : [];
      }
    } catch {
    }
  }
  _normaliseRef(t) {
    return t && typeof t == "object" && [t.d, t.p, t.u].every((e) => typeof e == "string" && e) ? {
      v: 1,
      d: t.d,
      p: t.p,
      u: t.u,
      n: typeof t.n == "string" ? t.n.slice(0, 64) : ""
    } : null;
  }
  _parseSlot(t) {
    if (!t || ji.has(String(t).toLowerCase())) return null;
    try {
      return this._normaliseRef(JSON.parse(t));
    } catch {
      return null;
    }
  }
  _buildRegistryIndex(t) {
    const e = t.entities || [], i = t.devices || [], r = t.areas || [], a = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
    for (const n of e) {
      const c = this._entryKey(n);
      c && a.set(c, n), n.device_id && (s.has(n.device_id) || s.set(n.device_id, []), s.get(n.device_id).push(n));
    }
    this._registry = {
      entities: e,
      devices: new Map(i.map((n) => [n.id, n])),
      areas: new Map(r.map((n) => [n.area_id, n.name])),
      byKey: a,
      byDevice: s
    };
  }
  async _ensureRegistry(t = !1) {
    if (this.hass && !(this._registry && !t))
      try {
        const e = await I.load(this.hass, t);
        this._buildRegistryIndex(e);
      } catch {
      }
  }
  _entryKey(t) {
    return t?.entity_id && t.platform && t.unique_id ? `${this._domain(t.entity_id)}|${t.platform}|${t.unique_id}` : null;
  }
  _refKey(t) {
    return t ? `${t.d}|${t.p}|${t.u}` : "";
  }
  _domain(t) {
    return String(t || "").split(".")[0];
  }
  _record(t) {
    const e = this._registry?.byKey.get(this._refKey(t)) || null;
    return {
      ref: t,
      entry: e,
      state: e && this.hass?.states?.[e.entity_id] || null
    };
  }
  _name(t) {
    return t.ref?.n?.trim() || t.entry?.name || t.entry?.original_name || t.state?.attributes?.friendly_name || t.entry?.entity_id || "Favourite not found";
  }
  _icon(t) {
    if (t.state?.attributes?.icon) return t.state.attributes.icon;
    const e = t.entry ? this._domain(t.entry.entity_id) : t.ref?.d;
    return {
      automation: "mdi:robot-outline",
      button: "mdi:gesture-tap-button",
      climate: "mdi:thermostat",
      cover: "mdi:window-shutter",
      fan: "mdi:fan",
      humidifier: "mdi:air-humidifier",
      input_boolean: "mdi:toggle-switch-outline",
      input_button: "mdi:gesture-tap-button",
      light: "mdi:lightbulb-outline",
      lock: "mdi:lock-outline",
      media_player: "mdi:play-circle-outline",
      scene: "mdi:palette-outline",
      script: "mdi:script-text-outline",
      select: "mdi:format-list-bulleted",
      switch: "mdi:toggle-switch-outline",
      vacuum: "mdi:robot-vacuum",
      water_heater: "mdi:water-boiler"
    }[e || ""] || "mdi:star-outline";
  }
  _stateLabel(t) {
    if (!t.entry || !t.state) return "Not found";
    if (t.state.state === "unavailable") return "Unavailable";
    if (t.state.state === "unknown") return "Status unknown";
    const e = this._domain(t.entry.entity_id);
    if (["button", "input_button"].includes(e)) return "Tap to run";
    if (["automation", "script"].includes(e)) return "Tap to start";
    if (e === "scene") return "Tap to activate";
    if (e === "media_player") {
      const i = t.state.attributes?.media_title, r = this._label(t.state.state);
      return i ? `${r} · ${i}` : r;
    }
    return this._label(t.state.state);
  }
  _label(t) {
    return String(t ?? "").replaceAll("_", " ").replace(/^./, (e) => e.toUpperCase());
  }
  _isActive(t) {
    if (!t.state || ji.has(String(t.state.state).toLowerCase()))
      return !1;
    const e = this._domain(t.entry?.entity_id);
    return ["light", "switch", "fan", "input_boolean"].includes(e) ? t.state.state === "on" : e === "media_player" ? ["playing", "paused", "buffering", "on"].includes(t.state.state) : e === "climate" ? t.state.state !== "off" : e === "cover" ? t.state.state !== "closed" : e === "lock" ? t.state.state === "unlocked" : !1;
  }
  async _activate(t) {
    const e = this._selected[t];
    if (!e) return;
    const i = this._record(e);
    if (!i.entry || !i.state) return;
    const r = i.entry.entity_id, a = this._domain(r);
    if (["light", "switch", "fan", "input_boolean"].includes(a))
      await this.hass?.callService("homeassistant", "toggle", {
        entity_id: r
      });
    else if (["automation", "script", "scene"].includes(a)) {
      const s = a === "automation" ? "trigger" : "turn_on";
      await this.hass?.callService(a, s, { entity_id: r });
    } else ["button", "input_button"].includes(a) ? await this.hass?.callService(a, "press", { entity_id: r }) : this.moreInfo(r);
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll(".item button.main").forEach((e, i) => {
      const r = this._record(this._selected[i]);
      this._interactionHandles.push(
        S(e, {
          primary: () => this._activate(i),
          hold: () => {
            r.entry?.entity_id && this.moreInfo(r.entry.entity_id);
          },
          feedback: !0
        })
      );
    });
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.items || [];
    return t.length > 0 && !(this._config.helpers?.length || this._config.preference_key) ? o`
        <ha-card>
          <div class="wrap">
            <div class="grid">
              ${t.map(
      (e) => o`
                  <div class="item">
                    <button class="main" type="button">
                      <span class="icon">
                        <ha-icon
                          icon="${e.icon || "mdi:star-outline"}"
                        ></ha-icon>
                      </span>
                      <span class="copy">
                        <div class="name">${e.title || "Favourite"}</div>
                        <div class="state">
                          ${e.state || "Supporting state"}
                        </div>
                      </span>
                    </button>
                  </div>
                `
    )}
            </div>
          </div>
        </ha-card>
      ` : o`
      <ha-card>
        <div class="wrap">
          ${this._config.show_header !== !1 ? o`
                  <div class="head">
                    <div class="heading">
                      <ha-icon icon="mdi:star-outline"></ha-icon>
                      <h2>${this._config.title || "Favourites"}</h2>
                    </div>
                    <button class="edit" type="button" aria-label="Edit favourites">
                      <ha-icon icon="mdi:pencil-outline"></ha-icon>
                      <span>Edit</span>
                    </button>
                  </div>
                ` : ""}

          <div class="grid">
            ${this._selected.length === 0 ? o`<div class="empty">
                    Add up to four everyday controls here.
                  </div>` : this._selected.map((e) => {
      const i = this._record(e), r = this._name(i), a = this._stateLabel(i), s = this._icon(i), n = this._isActive(i), c = !i.state || ji.has(String(i.state.state).toLowerCase());
      return o`
                      <div
                        class="item ${n ? "active" : ""} ${c ? "unavailable" : ""}"
                      >
                        <button
                          class="main"
                          type="button"
                          ?disabled=${c}
                          aria-label="${r}: ${a}"
                        >
                          <span class="icon">
                            <ha-icon icon="${s}"></ha-icon>
                          </span>
                          <span class="copy">
                            <div class="name">${r}</div>
                            <div class="state">${a}</div>
                          </span>
                        </button>
                      </div>
                    `;
    })}
          </div>
        </div>
      </ha-card>
    `;
  }
};
zt.stubConfig = { helpers: [], max: 4, title: "Favourites" };
zt.styles = zc;
Di([
  x()
], zt.prototype, "_selected", 2);
Di([
  x()
], zt.prototype, "_registry", 2);
zt = Di([
  k("component-favourites-v3")
], zt);
let mi = class extends A {
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      preference_key: "home-control.favourites.v1",
      ...t || {}
    });
  }
  getCardSize() {
    return 2;
  }
  updated() {
    const t = this.renderRoot.querySelector(
      "component-favourites-v3"
    );
    t && t.shadowRoot && this._tune(t.shadowRoot);
  }
  _tune(t) {
    if (t.querySelector(".edit ha-icon")?.setAttribute("icon", "mdi:dots-horizontal"), t.querySelector("style[data-home-minimal]")) return;
    const e = document.createElement("style");
    e.dataset.homeMinimal = "", e.textContent = ".heading h2{font-size:15px!important;font-weight:500!important}.heading ha-icon{color:var(--secondary-text-color)!important;--mdc-icon-size:17px!important}.edit{min-width:44px!important;min-height:44px!important;padding:0!important;color:var(--secondary-text-color)!important;font-weight:400!important}.edit ha-icon{--mdc-icon-size:16px!important}.edit span{display:none!important}.icon{color:var(--secondary-text-color)!important}.name{font-weight:500!important}.state{font-size:12px!important}.dialog-title,.confirm-title{font-size:16px!important;font-weight:500!important}.subheading,.group-title,.choice-name,.dialog-button{font-weight:500!important}.selected-meta,.choice-meta,.editor-copy{font-size:12px!important}", t.append(e);
  }
  render() {
    return this._config ? o`
      <component-favourites-v3
        .hass=${this.hass}
        .config=${this._config}
      ></component-favourites-v3>
    ` : o``;
  }
};
mi.styles = y`
    :host {
      display: block;
      min-width: 0;
    }
  `;
mi = Di([
  k("component-favourites-minimal-v1")
], mi);
E({
  type: "component-favourites-v3",
  element: zt,
  name: "Favourites V3",
  description: "Stable household favourites with entity discovery and backend companion storage."
});
E({
  type: "component-favourites-minimal-v1",
  element: mi,
  name: "Favourites Minimal",
  description: "Existing favourites behaviour with restrained Home typography."
});
const Oc = [
  T,
  y`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    }
    .top {
      min-height: var(--c-head-min-height);
      padding: 0 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--c-space-3);
    }
    .time {
      min-width: 0;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
      line-height: var(--c-line-height-normal);
      font-weight: var(--c-font-weight-normal);
    }
    .weather {
      min-height: var(--c-head-min-height);
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
      line-height: var(--c-line-height-normal);
      font-weight: var(--c-font-weight-normal);
      white-space: nowrap;
      text-align: right;
    }
    .weather:hover {
      text-decoration: underline;
    }
    .sections {
      margin-top: var(--c-space-2);
      display: grid;
      gap: var(--c-space-4);
    }
  `
], Pc = [
  or,
  y`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    button {
      font: inherit;
    }
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      color: var(--primary-text-color);
    }
    .row {
      min-height: 32px;
      padding: 0 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .time {
      min-width: 0;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 12.5px;
      line-height: 1.2;
      font-weight: 400;
    }
    .weather {
      appearance: none;
      border: 0;
      min-height: 32px;
      padding: 0;
      background: transparent;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      line-height: 1.2;
      font-weight: 400;
      white-space: nowrap;
      cursor: pointer;
      text-align: right;
    }
    .weather:hover {
      text-decoration: underline;
    }
    .weather:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 5px;
    }
    @media (max-width: 520px) {
      .row {
        gap: 8px;
      }
      .time {
        font-size: 13px;
      }
      .weather {
        font-size: 12px;
      }
    }
    @media (max-width: 350px) {
      .row {
        gap: 6px;
      }
      .time {
        font-size: 12px;
      }
      .weather {
        font-size: 11px;
      }
    }
  `
];
var Hc = Object.getOwnPropertyDescriptor, Nc = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Hc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Rc = {
  type: "custom:component-welcome-header-v1",
  weather_entity: "weather.forecast_home"
};
let fi = class extends A {
  constructor() {
    super(...arguments), this._cancelMinuteScheduler = null, this._interactionHandle = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (super.setConfig({ ...Rc, ...t }), !this._config?.weather_entity)
      throw new Error("weather_entity is required");
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = oa(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._cancelMinuteScheduler?.(), this._cancelMinuteScheduler = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  _number(t, e = 0) {
    const i = Number(t);
    return Number.isFinite(i) ? Ut(this.hass, i, {
      maximumFractionDigits: e,
      minimumFractionDigits: Number.isInteger(i) ? 0 : Math.min(1, e)
    }) : null;
  }
  updated() {
    const t = this.renderRoot.querySelector(".weather");
    t && (this._interactionHandle?.destroy(), this._interactionHandle = S(t, {
      primary: () => {
        this._config?.weather_entity && this.moreInfo(this._config.weather_entity);
      },
      feedback: !0
    }));
  }
  render() {
    if (!this._config) return o``;
    const t = /* @__PURE__ */ new Date(), i = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, r = bi(this.hass), a = gi(this.hass), s = this._number(i.temperature, 1), n = this._number(i.cloud_coverage, 0), c = s === null ? "—" : `${s}${i.temperature_unit || "°C"}`, l = n === null ? "Cloud —" : `Cloud ${n}%`, p = new Intl.DateTimeFormat(a, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: r
    }).format(t), f = `Outside ${c}, ${l}. Open weather details.`;
    return o`
      <ha-card>
        <div class="row">
          <span class="time">${p}</span>
          <button
            class="weather"
            type="button"
            aria-label="${this.esc(f)}"
          >
            ${c} · ${l}
          </button>
        </div>
      </ha-card>
    `;
  }
};
fi.styles = Pc;
fi = Nc([
  k("component-welcome-header-v1")
], fi);
E({
  type: "component-welcome-header-v1",
  element: fi,
  name: "Welcome Header",
  description: "Compact live weather and home-time header."
});
const Lc = [
  T,
  P,
  y`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    }
    .body {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    .empty {
      min-height: 48px;
      padding: 12px 14px;
      border: 1px dashed var(--dashboard-card-border-color);
      border-radius: var(--dashboard-radius-card);
      color: var(--secondary-text-color);
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .empty ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 18px;
    }
  `
];
var Ic = Object.defineProperty, Mc = Object.getOwnPropertyDescriptor, Oi = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Mc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Ic(e, i, a), a;
};
const qc = {
  type: "custom:component-smart-collection-v3",
  mode: "all",
  title: "Controls",
  icon: "mdi:tune-variant",
  pref_key: null,
  show_header: !0,
  header_style: "title",
  editable: !1,
  exclude_device_names: []
};
let Tt = class extends A {
  constructor() {
    super(...arguments), this._registry = null, this._prefs = { order: [], hidden: [] }, this._renderedCards = [], this._cardElements = /* @__PURE__ */ new Map(), this._structureSig = "", this._gen = 0, this._unsubRegistry = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  get config() {
    return this._config;
  }
  set config(t) {
    t && this.setConfig(t);
  }
  setConfig(t) {
    super.setConfig({ ...qc, ...t }), this._structureSig = "", this.hass && (this._config?.pref_key && this._loadPrefs(), I.load(this.hass).then((e) => {
      this._registry = e, this._syncCards();
    }), this._syncCards());
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = I.subscribe(this.hass, (t) => {
      this._registry = t, this._structureSig = "", this._syncCards();
    })), this._config?.pref_key && this._loadPrefs(), this._syncCards();
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._gen += 1, super.disconnectedCallback();
  }
  willUpdate(t) {
    if (super.willUpdate(t), t.has("hass") && this.hass) {
      for (const e of this._cardElements.values())
        e.el.hass = this.hass;
      this._registry || I.load(this.hass).then((e) => {
        this._registry = e, this._syncCards();
      }), this._syncCards();
    }
  }
  async _loadPrefs() {
    !this.hass || !this._config?.pref_key || (this._prefs = await ya(this.hass, this._config.pref_key), this._structureSig = "", this._syncCards());
  }
  _tune(t) {
    if (t?.localName !== "component-split-controller-v4" || !t.shadowRoot || t.shadowRoot.querySelector("style[data-home-minimal]"))
      return;
    const e = document.createElement("style");
    e.dataset.homeMinimal = "", e.textContent = ".nm{font-weight:500!important}.iw{color:var(--secondary-text-color)!important}.rv{font-size:22px!important;font-weight:500!important}.tv{font-size:16px!important;font-weight:500!important}.al,.pt,.gt,.o,.tpr button,.tcu button,.tac button{font-weight:500!important}.pt{font-size:16px!important}.a ha-icon{--mdc-icon-size:17px!important}", t.shadowRoot.append(e);
  }
  async _syncCards() {
    if (!this.hass) return;
    const t = ++this._gen, e = Bi(
      this.hass,
      this._registry,
      {
        mode: this._config?.mode,
        area_id: this._config?.area_id,
        exclude_device_names: this._config?.exclude_device_names,
        prefs: this._prefs
      }
    ), i = JSON.stringify(
      e.map((a) => [a.entityId, a.signature])
    );
    if (i === this._structureSig) {
      for (const a of this._cardElements.values())
        a.el.hass = this.hass;
      return;
    }
    const r = /* @__PURE__ */ new Map();
    for (const a of e) {
      const s = this._cardElements.get(a.entityId);
      if (s && s.sig === a.signature) {
        s.el.hass = this.hass, r.set(a.entityId, s);
        continue;
      }
      try {
        const n = await $a(a.cardConfig, this.hass);
        if (t !== this._gen) return;
        this._tune(n), r.set(a.entityId, { el: n, sig: a.signature });
      } catch {
      }
    }
    t === this._gen && (this._cardElements = r, this._structureSig = i, this._renderedCards = e.map((a) => r.get(a.entityId)?.el).filter((a) => !!a), this.requestUpdate());
  }
  async openEditor() {
    if (!this.hass || !this._config?.pref_key) return;
    const e = {
      order: Bi(this.hass, this._registry, {
        mode: this._config?.mode,
        area_id: this._config?.area_id,
        exclude_device_names: this._config?.exclude_device_names
      }).map((i) => i.entityId),
      hidden: [...this._prefs.hidden]
    };
    this._prefs = e, await xa(this.hass, this._config.pref_key, e), this._structureSig = "", this._syncCards();
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.header_style === "separator", e = this._config.show_header !== !1, i = this._renderedCards.length > 0;
    return o`
      <ha-card>
        ${e ? o`
                <div class="head ${t ? "sep" : ""}">
                  <span class="heading">
                    <ha-icon
                      icon="${this._config.icon || "mdi:tune-variant"}"
                    ></ha-icon>
                    <h2>${this._config.title || "Controls"}</h2>
                  </span>
                  ${this._config.editable ? o`
                          <button
                            class="edit"
                            type="button"
                            aria-label="Edit"
                            @click=${() => this.openEditor()}
                          >
                            <ha-icon icon="mdi:dots-horizontal"></ha-icon>
                          </button>
                        ` : ""}
                </div>
              ` : ""}

        <div class="body">
          ${i ? this._renderedCards : o`
                  <div class="empty">
                    <ha-icon
                      icon="${this._config.mode === "active" ? "mdi:check-circle-outline" : "mdi:gesture-tap"}"
                    ></ha-icon>
                    <span>
                      ${this._config.mode === "active" ? "Everything is quiet" : "No controls available"}
                    </span>
                  </div>
                `}
        </div>
      </ha-card>
    `;
  }
};
Tt.styles = Lc;
Oi([
  x()
], Tt.prototype, "_registry", 2);
Oi([
  x()
], Tt.prototype, "_prefs", 2);
Oi([
  x()
], Tt.prototype, "_renderedCards", 2);
Tt = Oi([
  k("component-smart-collection-v3")
], Tt);
E({
  type: "component-smart-collection-v3",
  element: Tt,
  name: "Smart Control Collection V3",
  description: "Stable registry-driven household controls without refresh teardown."
});
const jc = [
  T,
  P,
  q,
  tt,
  y`
    ha-card {
      display: block;
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
      color: var(--primary-text-color);
    }
    .head {
      min-height: 38px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      padding: 0 2px;
    }
    .title-row,
    .heading {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .title-row ha-icon,
    .heading ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 18px;
    }
    .title-row h2,
    .heading h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .list,
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .item {
      appearance: none;
      min-height: 56px;
      padding: 8px 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }
    .item:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .item.active {
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
    }
    .item:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .icon {
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .item ha-icon,
    .icon ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
      display: flex;
      flex-direction: column;
    }
    .name {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--primary-text-color);
    }
    .state {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    @media (max-width: 700px) {
      .list,
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `
];
var Uc = Object.defineProperty, Bc = Object.getOwnPropertyDescriptor, Na = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Bc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Uc(e, i, a), a;
};
const Fc = {
  type: "custom:component-household-directory-v3",
  pref_key: "home-control.household.v2",
  base_path: "/home-control",
  current_dashboard: "home-control",
  title: "Quick actions",
  icon: "mdi:gesture-tap-button",
  quick_action_label: "dashboard_quick_action"
}, Zr = {
  automation: "trigger",
  scene: "turn_on",
  script: "turn_on",
  button: "press",
  input_button: "press"
};
let Ae = class extends A {
  constructor() {
    super(...arguments), this._registry = [], this._unsubRegistry = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Fc, ...t }), this.hass && I.load(this.hass).then((e) => {
      this._registry = e.entities || [];
    });
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = I.subscribe(this.hass, (t) => {
      this._registry = t.entities || [];
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    this._registry.length === 0 && this.hass && I.load(this.hass).then((t) => {
      this._registry = t.entities || [];
    });
  }
  _items() {
    if (!this.hass) return [];
    const t = [], e = this._config?.base_path || "/home-control";
    t.push({
      id: "view:media",
      name: "Media",
      icon: "mdi:speaker-multiple",
      kind: "nav",
      path: `${e}/media`,
      meta: "Dashboard view"
    }), t.push({
      id: "view:all-controls",
      name: "Controls",
      icon: "mdi:tune-variant",
      kind: "nav",
      path: `${e}/all-controls`,
      meta: "Dashboard view"
    }), t.push({
      id: "view:security",
      name: "Security",
      icon: "mdi:shield-home-outline",
      kind: "nav",
      path: `${e}/security`,
      meta: "Dashboard view"
    }), t.push({
      id: "view:energy",
      name: "Energy",
      icon: "mdi:lightning-bolt",
      kind: "nav",
      path: `${e}/energy`,
      meta: "Dashboard view"
    });
    const i = this._config?.quick_action_label || "dashboard_quick_action", r = this._registry.filter((a) => {
      if (a.disabled_by || a.hidden_by) return !1;
      const s = a.entity_id.split(".")[0];
      return !Object.prototype.hasOwnProperty.call(
        Zr,
        s
      ) && !(s === "todo") ? !1 : (Array.isArray(a.labels) ? a.labels : []).includes(i);
    });
    for (const a of r) {
      const s = this.hass.states[a.entity_id], n = a.entity_id.split(".")[0], c = s?.attributes?.friendly_name || a.name || a.original_name || a.entity_id, l = s?.attributes?.icon || a.icon || a.original_icon || "mdi:flash";
      n === "todo" ? t.push({
        id: a.entity_id,
        name: c.replace(/\s+List$/i, ""),
        icon: l,
        kind: "entity",
        entity: a.entity_id,
        meta: "To-do list"
      }) : t.push({
        id: a.entity_id,
        name: c,
        icon: l,
        kind: "action",
        entity: a.entity_id,
        domain: n,
        service: Zr[n],
        meta: "Quick action"
      });
    }
    return t;
  }
  async _runAction(t) {
    !this.hass || !t.domain || !t.service || !t.entity || await this.hass.callService(t.domain, t.service, {
      entity_id: t.entity
    });
  }
  updated() {
    for (const i of this._interactionHandles) i.destroy();
    this._interactionHandles = [];
    const t = Array.from(
      this.renderRoot.querySelectorAll("button.item")
    ), e = this._items();
    t.forEach((i, r) => {
      const a = e[r];
      if (!a) return;
      let s = null;
      a.kind === "nav" && a.path ? s = () => Xr(a.path) : a.kind === "action" ? s = () => this._runAction(a) : a.kind === "entity" && a.entity && (s = () => this.moreInfo(a.entity)), s && this._interactionHandles.push(
        S(i, {
          primary: s,
          feedback: !0
        })
      );
    });
  }
  render() {
    if (!this._config) return o``;
    const t = this._items();
    return o`
      <ha-card>
        <div class="head">
          <div class="title-row">
            <ha-icon
              icon="${this._config.icon || "mdi:gesture-tap-button"}"
            ></ha-icon>
            <h2>${this._config.title || "Quick actions"}</h2>
          </div>
        </div>

        <div class="list">
          ${t.map(
      (e) => o`
              <button
                class="item"
                type="button"
                aria-label="${e.name}: ${e.meta}"
              >
                <span class="icon">
                  <ha-icon icon="${e.icon}"></ha-icon>
                </span>
                <span class="copy">
                  <span class="name">${e.name}</span>
                  <span class="meta">${e.meta}</span>
                </span>
                <span class="arrow">
                  <ha-icon icon="mdi:chevron-right"></ha-icon>
                </span>
              </button>
            `
    )}
        </div>
      </ha-card>
    `;
  }
};
Ae.styles = jc;
Na([
  x()
], Ae.prototype, "_registry", 2);
Ae = Na([
  k("component-household-directory-v3")
], Ae);
E({
  type: "component-household-directory-v3",
  element: Ae,
  name: "Household Directory V3",
  description: "Global views and label-driven quick actions directory."
});
const Vc = [
  T,
  P,
  F,
  Dt,
  q,
  tt,
  Ot,
  gs,
  y`
    ha-card {
      display: block;
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
      color: var(--primary-text-color);
    }
    .head {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      padding: 0 2px;
    }
    .open-view {
      appearance: none;
      border: 0;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 44px;
      padding: 0;
      cursor: pointer;
    }
    .open-view ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 18px;
    }
    .open-view h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .edit,
    .room-edit {
      appearance: none;
      width: 44px;
      height: 44px;
      border: 0;
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--secondary-text-color);
      display: grid;
      place-items: center;
      cursor: pointer;
    }
    .edit ha-icon,
    .room-edit ha-icon {
      --mdc-icon-size: 18px;
    }
    .edit:hover,
    .edit:focus-visible,
    .room-edit:hover,
    .room-edit:focus-visible,
    .open-view:focus-visible {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .group {
      grid-column: 1 / -1;
      min-height: 28px;
      padding: 3px 2px 1px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      font-weight: 650;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .group:after {
      content: "";
      height: 1px;
      background: var(--divider-color);
      flex: 1;
    }
    .room {
      min-width: 0;
      min-height: 60px;
      padding: 10px 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      text-align: left;
      cursor: pointer;
      color: inherit;
    }
    .room:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .room.active {
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
    }
    .room.warning {
      background: var(--dashboard-warning-surface);
      border-left: 3px solid var(--warning-color);
    }
    .room.critical {
      background: var(--dashboard-critical-surface);
      border-left: 3px solid var(--error-color);
    }
    .room .icon {
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }
    .room.active .icon {
      color: var(--primary-color);
    }
    .room.warning .icon {
      color: var(--warning-color);
    }
    .room.critical .icon {
      color: var(--error-color);
    }
    .room .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .room .copy {
      min-width: 0;
    }
    .room .title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .room .status {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .dialog-overlay {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }
    .dialog-box {
      width: min(440px, calc(100vw - 32px));
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .dialog-head {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--divider-color);
      font-size: 15px;
      font-weight: 650;
    }
    .dialog-body {
      padding: 16px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid var(--divider-color);
    }
    @media (max-width: 700px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
  `
];
var Wc = Object.defineProperty, Gc = Object.getOwnPropertyDescriptor, br = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Gc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Wc(e, i, a), a;
};
const Kc = {
  type: "custom:component-room-directory-v4",
  title: "Rooms",
  icon: "mdi:floor-plan",
  mode: "home",
  pref_key: "home-control.rooms.v2",
  navigation_path: null,
  base_path: "/home-control"
};
let ee = class extends A {
  constructor() {
    super(...arguments), this._registries = null, this._activeArea = null, this._unsubRegistry = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Kc, ...t }), this.hass && I.load(this.hass).then((e) => {
      this._registries = e;
    });
  }
  getCardSize() {
    return 4;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = I.subscribe(this.hass, (t) => {
      this._registries = t;
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, super.disconnectedCallback();
  }
  willUpdate() {
    !this._registries && this.hass && I.load(this.hass).then((t) => {
      this._registries = t;
    });
  }
  _areas() {
    return [...this._registries?.areas || []].sort(
      (e, i) => e.name.localeCompare(i.name, void 0, { sensitivity: "base" })
    );
  }
  _areaStatus(t) {
    return ka(t, this._registries, this.hass);
  }
  _openRoom(t) {
    this._activeArea = t;
    const e = this.renderRoot.querySelector(
      "dialog"
    );
    e && !e.open && e.showModal();
  }
  _closeRoom() {
    const t = this.renderRoot.querySelector(
      "dialog"
    );
    t?.open && t.close(), this._activeArea = null;
  }
  render() {
    if (!this._config) return o``;
    const t = this._areas();
    return o`
      <ha-card>
        <div class="head">
          <button
            class="open-view"
            type="button"
            ?disabled=${!this._config.navigation_path}
            @click=${() => this._config?.navigation_path && this.navigate(this._config.navigation_path)}
          >
            <ha-icon icon="${this._config.icon || "mdi:floor-plan"}"></ha-icon>
            <h2>${this._config.title || "Rooms"}</h2>
          </button>
        </div>

        <div class="grid">
          ${t.map((e) => {
      const i = this._areaStatus(e);
      return o`
              <button
                class="room ${i.severity}"
                type="button"
                aria-label="Open ${e.name}${i.summary ? ". " + i.summary : ""}"
                @click=${() => this._openRoom(e)}
              >
                <span class="ico">
                  <ha-icon icon="${e.icon || "mdi:home-outline"}"></ha-icon>
                </span>
                <span class="copy">
                  <span class="name">${e.name}</span>
                  ${i.summary ? o`<span class="summary">${i.summary}</span>` : ""}
                </span>
              </button>
            `;
    })}
        </div>
      </ha-card>

      <dialog
        @cancel=${() => {
      this._activeArea = null;
    }}
        @click=${(e) => {
      const i = this.renderRoot.querySelector("dialog");
      e.target === i && this._closeRoom();
    }}
      >
        <div class="sheet">
          <div class="sheet-head">
            <span class="identity">
              <ha-icon
                icon="${this._activeArea?.icon || "mdi:home-outline"}"
              ></ha-icon>
              <span class="sheet-name"
                >${this._activeArea?.name || "Room"}</span
              >
            </span>
            <button
              class="close"
              type="button"
              aria-label="Close room"
              @click=${this._closeRoom}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="sheet-body">
            ${this._activeArea ? o`
                    <component-smart-collection-v3
                      .hass=${this.hass}
                      .config=${{
      type: "custom:component-smart-collection-v3",
      mode: "area",
      area_id: this._activeArea.area_id,
      title: "Controls",
      icon: "mdi:gesture-tap-button",
      header_style: "separator",
      editable: !1,
      pref_key: `home-control.area.${this._activeArea.area_id}.v2`
    }}
                    ></component-smart-collection-v3>
                  ` : ""}
          </div>
        </div>
      </dialog>
    `;
  }
};
ee.styles = Vc;
br([
  x()
], ee.prototype, "_registries", 2);
br([
  x()
], ee.prototype, "_activeArea", 2);
ee = br([
  k("component-room-directory-v4")
], ee);
E({
  type: "component-room-directory-v4",
  element: ee,
  name: "Room Directory V4",
  description: "Stable registry-driven rooms with full-height swipeable room sheets."
});
var Yc = Object.getOwnPropertyDescriptor, Ra = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Yc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Qc = {
  type: "custom:component-home-overview-v4",
  weather_entity: "weather.forecast_home",
  base_path: "/home-control",
  current_dashboard: "home-control",
  favourites_helpers: []
};
let Ee = class extends A {
  constructor() {
    super(...arguments), this._weatherInteraction = null, this._cancelMinuteScheduler = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      ...Qc,
      ...t,
      favourites_helpers: []
    });
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = oa(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._cancelMinuteScheduler?.(), this._cancelMinuteScheduler = null, this._weatherInteraction?.destroy(), this._weatherInteraction = null, super.disconnectedCallback();
  }
  updated() {
    const t = this.renderRoot.querySelector(".weather");
    t && (this._weatherInteraction?.destroy(), this._weatherInteraction = S(t, {
      primary: () => {
        this._config?.weather_entity && this.moreInfo(this._config.weather_entity);
      },
      feedback: !0
    }));
  }
  render() {
    if (!this._config) return o``;
    const t = /* @__PURE__ */ new Date(), e = bi(this.hass), i = gi(this.hass), r = new Intl.DateTimeFormat(i, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: e
    }).format(t), s = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, n = Number(s.temperature), c = Number.isFinite(n) ? `${Ut(this.hass, n, { maximumFractionDigits: 1 })}${s.temperature_unit || "°C"}` : "—", l = Number(s.cloud_coverage), p = Number.isFinite(l) ? `Cloud ${Math.round(l)}%` : "Cloud —", f = `${c} · ${p}`, g = `Outside ${c}, ${p}. Open weather details.`, d = this._config.base_path || "/home-control", u = this._config.current_dashboard || "home-control";
    return o`
      <ha-card>
        <div class="top">
          <span class="time">${r}</span>
          <button
            class="weather"
            type="button"
            aria-label="${this.esc(g)}"
          >
            ${f}
          </button>
        </div>

        <div class="sections">
          <component-favourites-minimal-v1
            .hass=${this.hass}
            .config=${{
      type: "custom:component-favourites-minimal-v1",
      helpers: this._config.favourites_helpers || [],
      max: 4,
      title: "Favourites"
    }}
          ></component-favourites-minimal-v1>

          <component-smart-collection-v3
            .hass=${this.hass}
            .config=${{
      type: "custom:component-smart-collection-v3",
      mode: "active",
      title: "Active now",
      icon: "mdi:motion-play-outline",
      editable: !1,
      pref_key: null
    }}
          ></component-smart-collection-v3>

          <component-household-directory-v3
            .hass=${this.hass}
            .config=${{
      type: "custom:component-household-directory-v3",
      title: "Quick actions",
      icon: "mdi:gesture-tap-button",
      quick_action_label: "dashboard_quick_action",
      pref_key: "home-control.household.v2",
      base_path: d,
      current_dashboard: u
    }}
          ></component-household-directory-v3>

          <component-room-directory-v4
            .hass=${this.hass}
            .config=${{
      type: "custom:component-room-directory-v4",
      mode: "home",
      title: "Rooms",
      icon: "mdi:floor-plan",
      pref_key: "home-control.rooms.v2",
      base_path: d,
      navigation_path: `${d}/rooms`
    }}
          ></component-room-directory-v4>
        </div>
      </ha-card>
    `;
  }
};
Ee.styles = Oc;
Ee = Ra([
  k("component-home-overview-v4")
], Ee);
let Vi = class extends Ee {
};
Vi = Ra([
  k("component-home-overview-v5")
], Vi);
E({
  type: "component-home-overview-v4",
  element: Ee,
  name: "Home Overview V4",
  description: "Stable minimal Home overview without state-refresh teardown."
});
E({
  type: "component-home-overview-v5",
  element: Vi,
  name: "Home Overview V5",
  description: "Stable minimal Home overview without state-refresh teardown (v5 alias)."
});
const Zc = [
  T,
  P,
  q,
  tt,
  pt,
  Ot,
  y`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      color: var(--primary-text-color);
    }
    .head {
      min-height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 6px;
      padding: 0 2px;
    }
    .title-row {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .title-row ha-icon,
    .head ha-icon {
      color: var(--error-color);
      --mdc-icon-size: 19px;
    }
    .head h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .count {
      font-size: 11px;
      font-weight: 650;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--dashboard-warning-surface);
      color: var(--warning-color);
      border: 1px solid var(--warning-color);
    }
    .list,
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 8px;
    }
    .issue {
      appearance: none;
      width: 100%;
      min-height: 56px;
      padding: 8px 12px;
      border: var(--dashboard-card-border);
      border-left: 3px solid var(--warning-color);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-warning-surface);
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) auto auto;
      align-items: center;
      gap: 10px;
      text-align: left;
      cursor: pointer;
      color: inherit;
    }
    .issue.critical {
      border-left-color: var(--error-color);
      background: var(--dashboard-critical-surface);
    }
    .issue:hover,
    .issue:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .icon,
    .issue-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      display: grid;
      place-items: center;
      color: var(--warning-color);
      flex-shrink: 0;
    }
    .issue.critical .icon,
    .issue.critical .issue-icon {
      color: var(--error-color);
    }
    .issue-icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .title,
    .name {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .detail,
    .reason {
      margin-top: 3px;
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `
];
var Jc = Object.defineProperty, Xc = Object.getOwnPropertyDescriptor, _r = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Xc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Jc(e, i, a), a;
};
const tl = {
  type: "custom:component-household-attention-v2",
  title: "Attention",
  icon: "mdi:alert-circle-outline",
  quiet_title: "Everything quiet",
  quiet_subtitle: "No security or hardware alerts",
  quiet_icon: "mdi:check-circle-outline"
};
let ie = class extends A {
  constructor() {
    super(...arguments), this._registry = null, this._unsubRegistry = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...tl, ...t }), this.hass && !this._config?.demo && I.load(this.hass).then((e) => {
      this._registry = e.entities || [];
    });
  }
  getCardSize() {
    return this._config?.demo ? 2 : 1;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && !this._config?.demo && (this._unsubRegistry = I.subscribe(this.hass, (t) => {
      this._registry = t.entities || [];
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    !this._registry && this.hass && !this._config?.demo && I.load(this.hass).then((t) => {
      this._registry = t.entities || [];
    });
  }
  _issues() {
    if (this._config?.demo)
      return [
        {
          entity_id: "binary_sensor.demo_garage",
          name: "Garage door",
          status: "Open",
          severity: "warning",
          severity_text: "Check",
          icon: "mdi:garage-open"
        },
        {
          entity_id: "binary_sensor.demo_leak",
          name: "Laundry leak sensor",
          status: "Detected",
          severity: "critical",
          severity_text: "Critical",
          icon: "mdi:water-alert"
        }
      ];
    if (!this.hass || !this._registry) return [];
    const t = [];
    for (const e of this._registry) {
      if (!e?.entity_id || e.disabled_by || e.hidden_by || ["diagnostic", "config"].includes(e.entity_category))
        continue;
      const i = this.hass.states?.[e.entity_id];
      if (!i) continue;
      const r = e.entity_id.split(".")[0], a = e.device_class || i.attributes?.device_class || "";
      let s = null;
      e.entity_id.endsWith("_controller_status") && i.state === "off" ? s = {
        status: "Controller offline",
        severity: "critical",
        severity_text: "Critical",
        icon: "mdi:access-point-network-off"
      } : r === "binary_sensor" && i.state === "on" && ["smoke", "moisture", "gas"].includes(a) ? s = {
        status: "Detected",
        severity: "critical",
        severity_text: "Critical",
        icon: a === "smoke" ? "mdi:smoke-detector-alert" : a === "gas" ? "mdi:gas-cylinder" : "mdi:water-alert"
      } : r === "binary_sensor" && i.state === "on" && ["door", "window", "garage_door"].includes(a) ? s = {
        status: "Open",
        severity: "warning",
        severity_text: "Check",
        icon: a === "window" ? "mdi:window-open-variant" : a === "garage_door" ? "mdi:garage-open" : "mdi:door-open"
      } : r === "lock" && i.state === "unlocked" && (s = {
        status: "Unlocked",
        severity: "warning",
        severity_text: "Check",
        icon: "mdi:lock-open-variant-outline"
      }), s && t.push({
        entity_id: e.entity_id,
        name: vt({ entry: e, state: i }),
        status: s.status,
        severity: s.severity,
        severity_text: s.severity_text,
        icon: s.icon
      });
    }
    return t.sort(
      (e, i) => (e.severity === "critical" ? 0 : 1) - (i.severity === "critical" ? 0 : 1) || e.name.localeCompare(i.name, void 0, { sensitivity: "base" })
    ).slice(0, 8);
  }
  updated() {
    for (const i of this._interactionHandles) i.destroy();
    this._interactionHandles = [];
    const t = Array.from(
      this.renderRoot.querySelectorAll("button.issue")
    ), e = this._issues();
    t.forEach((i, r) => {
      const a = e[r];
      a && this._interactionHandles.push(
        S(i, {
          primary: () => {
            this._config?.demo || this.moreInfo(a.entity_id);
          },
          feedback: !0
        })
      );
    });
  }
  render() {
    if (!this._config) return o``;
    const t = this._issues();
    return t.length === 0 ? o`
        <ha-card>
          <div class="quiet">
            <span class="quiet-icon">
              <ha-icon
                icon="${this._config.quiet_icon || "mdi:check-circle-outline"}"
              ></ha-icon>
            </span>
            <div class="quiet-text">
              <h3>${this._config.quiet_title || "Everything quiet"}</h3>
              <p>
                ${this._config.quiet_subtitle || "No security or hardware alerts"}
              </p>
            </div>
          </div>
        </ha-card>
      ` : o`
      <ha-card>
        <div class="head">
          <div class="title-row">
            <ha-icon
              icon="${this._config.icon || "mdi:alert-circle-outline"}"
            ></ha-icon>
            <h2>${this._config.title || "Attention"}</h2>
          </div>
          <span class="count">${t.length}</span>
        </div>

        <div class="list">
          ${t.map(
      (e) => o`
              <button
                class="issue ${e.severity}"
                type="button"
                aria-label="${e.name}: ${e.status}. Open details."
              >
                <span class="icon">
                  <ha-icon icon="${e.icon}"></ha-icon>
                </span>
                <span class="copy">
                  <span class="name">${e.name}</span>
                  <span class="status">${e.status}</span>
                </span>
                <span class="badge ${e.severity}"
                  >${e.severity_text}</span
                >
                <span class="arrow">
                  <ha-icon icon="mdi:chevron-right"></ha-icon>
                </span>
              </button>
            `
    )}
        </div>
      </ha-card>
    `;
  }
};
ie.styles = Zc;
_r([
  x()
], ie.prototype, "_registry", 2);
ie = _r([
  k("component-household-attention-v2")
], ie);
let Wi = class extends ie {
};
Wi = _r([
  k("component-household-attention-v1")
], Wi);
E({
  type: "component-household-attention-v1",
  element: Wi,
  name: "Household Attention V1",
  description: "Aggregated safety and hardware attention queue (v1)."
});
E({
  type: "component-household-attention-v2",
  element: ie,
  name: "Household Attention V2",
  description: "Aggregated safety and hardware attention queue."
});
const el = [
  T,
  P,
  pt,
  q,
  y`
    :host {
      --tile-active-color: var(--primary-color, #03a9f4);
    }

    .tile-card {
      height: 100%;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      transition:
        transform 0.12s ease,
        background-color 0.15s ease;
      cursor: pointer;
    }

    .tile-card.active {
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
    }

    .tile-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px 14px;
      min-height: 72px;
      box-sizing: border-box;
      gap: 8px;
    }

    .tile-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .tile-icon-box {
      display: grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-control);
      background-color: var(--secondary-background-color);
      color: var(--secondary-text-color);
      transition: all 0.15s ease;
      flex-shrink: 0;
    }

    .tile-icon-box ha-icon {
      --mdc-icon-size: 18px;
    }

    .tile-icon-box.active {
      background-color: var(--primary-color);
      color: var(--text-primary-color);
    }

    .badge-pill {
      padding: 3px 8px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 650;
      background-color: var(--dashboard-card-muted-surface);
      color: var(--secondary-text-color);
      border: var(--dashboard-card-border);
    }

    .tile-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .tile-card.unavailable {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .tile-card:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `
];
var il = Object.defineProperty, rl = Object.getOwnPropertyDescriptor, vr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? rl(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && il(e, i, a), a;
};
let ze = class extends gt {
  setConfig(t) {
    this._config = { ...t };
  }
  _valueChanged(t, e) {
    if (!this._config) return;
    const r = t.target.value;
    if (r === "") {
      const a = { ...this._config };
      delete a[e], this._config = a;
    } else
      this._config = {
        ...this._config,
        [e]: r
      };
    nt(this, "config-changed", { config: this._config });
  }
  render() {
    if (!this.hass || !this._config)
      return o``;
    const t = Object.keys(this.hass.states || {}).sort();
    return o`
      <div class="editor-container">
        <!-- Main Entity -->
        <div class="form-row">
          <label class="form-label" for="tile-entity">Entity (Required)</label>
          <select
            id="tile-entity"
            class="form-select"
            .value=${this._config.entity || ""}
            @change=${(e) => this._valueChanged(e, "entity")}
          >
            <option value="">Select an entity...</option>
            ${t.map(
      (e) => o`
                <option value=${e} ?selected=${this._config.entity === e}>
                  ${this.hass.states[e]?.attributes?.friendly_name || e}
                  (${e})
                </option>
              `
    )}
          </select>
        </div>

        <!-- Name Override -->
        <div class="form-row">
          <label class="form-label" for="tile-name"
            >Tile Label (Optional)</label
          >
          <input
            id="tile-name"
            type="text"
            class="form-input"
            placeholder="Default to entity name"
            .value=${this._config.name || ""}
            @input=${(e) => this._valueChanged(e, "name")}
          />
        </div>

        <!-- Icon Override -->
        <div class="form-row">
          <label class="form-label" for="tile-icon"
            >Icon (Optional, e.g. mdi:lightbulb)</label
          >
          <input
            id="tile-icon"
            type="text"
            class="form-input"
            placeholder="mdi:default"
            .value=${this._config.icon || ""}
            @input=${(e) => this._valueChanged(e, "icon")}
          />
        </div>

        <!-- Custom Active Color -->
        <div class="form-row">
          <label class="form-label" for="tile-color"
            >Active Color (Hex/CSS)</label
          >
          <input
            id="tile-color"
            type="text"
            class="form-input"
            placeholder="#03a9f4"
            .value=${this._config.color || ""}
            @input=${(e) => this._valueChanged(e, "color")}
          />
        </div>

        <!-- Badge Entity (Optional) -->
        <div class="form-row">
          <label class="form-label" for="tile-badge"
            >Badge Overlay Entity (Optional)</label
          >
          <select
            id="tile-badge"
            class="form-select"
            .value=${this._config.badge_entity || ""}
            @change=${(e) => this._valueChanged(e, "badge_entity")}
          >
            <option value="">None / Auto (Brightness/Temp)</option>
            ${t.map(
      (e) => o`
                <option
                  value=${e}
                  ?selected=${this._config.badge_entity === e}
                >
                  ${this.hass.states[e]?.attributes?.friendly_name || e}
                  (${e})
                </option>
              `
    )}
          </select>
        </div>
      </div>
    `;
  }
};
ze.styles = [da];
vr([
  ae({ attribute: !1 })
], ze.prototype, "hass", 2);
vr([
  x()
], ze.prototype, "_config", 2);
ze = vr([
  k("ha-action-tile-editor")
], ze);
var al = Object.getOwnPropertyDescriptor, sl = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? al(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
let Gi = class extends Ci {
  static async getConfigElement() {
    return document.createElement(
      "ha-action-tile-editor"
    );
  }
  static getStubConfig(t, e, i) {
    return {
      entity: e.find((a) => a.startsWith("light.") || a.startsWith("switch.")) || e[0] || "light.living_room",
      color: "#03a9f4"
    };
  }
  validateConfig(t) {
    if (!t.entity)
      throw new Error("Please define an entity for ha-action-tile");
  }
  getCardSize() {
    return 1;
  }
  getGridOptions() {
    return {
      columns: 6,
      rows: 1,
      min_columns: 3,
      min_rows: 1
    };
  }
  _handleTileTap() {
    if (!this.hass || !this.config) return;
    const t = this.config.tap_action || { action: "toggle" };
    ki(this, this.hass, t, this.config.entity);
  }
  _renderBadge() {
    if (!this.hass || !this.config) return B;
    if (this.config.badge_entity && this.hass.states[this.config.badge_entity]) {
      const e = this.hass.states[this.config.badge_entity];
      return o`
        <div class="badge-pill">
          ${K(e, this.hass)}
        </div>
      `;
    }
    const t = this.hass.states[this.config.entity];
    if (t?.attributes?.brightness !== void 0 && xe(t)) {
      const e = Math.round(t.attributes.brightness / 255 * 100);
      return o`<div class="badge-pill">${e}%</div>`;
    }
    return t?.attributes?.temperature !== void 0 ? o`<div class="badge-pill">
        ${t.attributes.temperature}&deg;
      </div>` : B;
  }
  _handleKeyDown(t) {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._handleTileTap());
  }
  render() {
    if (!this.hass || !this.config?.entity)
      return this.renderError("No entity configured for ha-action-tile");
    const t = this.hass.states[this.config.entity];
    if (!t)
      return this.renderError(`Entity not found: ${this.config.entity}`);
    const e = it(this.config.entity), i = ot(t), r = !i && xe(t), a = this.config.name || $i(t), s = this.config.icon || t.attributes.icon || ne(e, t.state), n = i ? "Unavailable" : K(t, this.hass), c = this.config.color || "#03a9f4";
    return o`
      <ha-card
        class="interactive tile-card ${r ? "active" : ""} ${i ? "unavailable" : ""}"
        style=${r ? `--tile-active-color: ${c};` : ""}
        role="button"
        tabindex="${i ? "-1" : "0"}"
        aria-pressed="${String(r)}"
        aria-disabled="${String(i)}"
        aria-label="${a}: ${n}"
        @click=${this._handleTileTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="tile-body">
          <div class="tile-header">
            <div class="tile-icon-box ${r ? "active" : ""}">
              <ha-icon .icon=${s}></ha-icon>
            </div>
            ${this._renderBadge()}
          </div>

          <div class="tile-content">
            <div class="primary-title" title=${a}>${a}</div>
            <div class="secondary-text">${n}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
Gi.styles = el;
Gi = sl([
  k("ha-action-tile")
], Gi);
const nl = [
  T,
  P,
  q,
  y`
    .metric-badge-card {
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      border-left: 3px solid var(--badge-accent-color, var(--primary-color));
      cursor: pointer;
    }

    .metric-body {
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      padding: 12px 14px;
      gap: 12px;
    }

    .icon-bubble {
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      background: var(--secondary-background-color);
      color: var(--badge-accent-color, var(--primary-color));
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }

    .icon-bubble ha-icon {
      --mdc-icon-size: 20px;
    }

    .metric-data {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .metric-value-line {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .value-text {
      font-size: 20px;
      font-weight: 550;
      line-height: 1;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
      color: var(--primary-text-color);
    }

    .unit-text {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }

    .metric-label {
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.25;
      margin-top: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .metric-badge-card.unavailable {
      opacity: 0.55;
    }

    .metric-badge-card:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `
];
var ol = Object.getOwnPropertyDescriptor, cl = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? ol(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
let Ki = class extends Ci {
  static getStubConfig() {
    return {
      entity: "sensor.temperature",
      thresholds: [
        { value: 18, color: "#03a9f4" },
        { value: 24, color: "#4caf50" },
        { value: 28, color: "#ff9800" },
        { value: 35, color: "#f44336" }
      ]
    };
  }
  validateConfig(t) {
    if (!t.entity)
      throw new Error("Please define an entity for ha-metric-badge");
  }
  getCardSize() {
    return 1;
  }
  _handleTap() {
    if (!this.hass || !this.config) return;
    const t = this.config.tap_action || { action: "more-info" };
    ki(this, this.hass, t, this.config.entity);
  }
  _computeColor(t) {
    if (!this.config?.thresholds || this.config.thresholds.length === 0)
      return "var(--primary-color, #03a9f4)";
    const e = [...this.config.thresholds].sort(
      (r, a) => r.value - a.value
    );
    let i = e[0].color;
    for (const r of e)
      t >= r.value && (i = r.color);
    return i;
  }
  render() {
    if (!this.hass || !this.config?.entity)
      return this.renderError("No entity configured for ha-metric-badge");
    const t = this.hass.states[this.config.entity];
    if (!t)
      return this.renderError(`Entity not found: ${this.config.entity}`);
    const e = it(this.config.entity), i = ot(t), r = this.config.name || $i(t), a = this.config.icon || t.attributes.icon || ne(e, t.state), s = i ? NaN : parseFloat(t.state), n = !isNaN(s), c = n ? this._computeColor(s) : i ? "var(--secondary-text-color, #757575)" : "var(--primary-color, #03a9f4)", l = i ? "" : this.config.unit || t.attributes.unit_of_measurement || "", p = i ? "Unavailable" : n ? s : t.state;
    return o`
      <ha-card
        class="interactive metric-badge-card ${i ? "unavailable" : ""}"
        tabindex="0"
        role="button"
        style="--badge-accent-color: ${c};"
        @click=${this._handleTap}
        @keydown=${(f) => {
      (f.key === "Enter" || f.key === " ") && (f.preventDefault(), this._handleTap());
    }}
        aria-disabled="${String(i)}"
        aria-label="${r}: ${p}${l ? " " + l : ""}"
        title="${r}: ${K(t, this.hass)}"
      >
        <div class="metric-body">
          <div class="icon-bubble">
            <ha-icon .icon=${a}></ha-icon>
          </div>
          <div class="metric-data">
            <div class="metric-value-line">
              <span class="value-text">${p}</span>
              ${l ? o`<span class="unit-text">${l}</span>` : ""}
            </div>
            <div class="metric-label" title=${r}>${r}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
Ki.styles = nl;
Ki = cl([
  k("ha-metric-badge")
], Ki);
const ll = [
  T,
  P,
  pt,
  Dt,
  y`
    .bar-items-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 8px;
      padding: 12px 14px;
    }

    .quick-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 6px;
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      border: var(--dashboard-card-border);
      transition: background-color 0.15s ease;
      cursor: pointer;
    }

    .quick-item.active {
      background: var(--dashboard-active-surface);
      border-color: var(--primary-color);
    }

    .item-icon-circle {
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: var(--dashboard-card-border);
      background-color: var(--dashboard-card-surface);
      color: var(--secondary-text-color);
      transition: all 0.15s ease;
    }

    .item-icon-circle.active {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background-color: var(--dashboard-active-surface);
    }

    .item-icon-circle ha-icon {
      --mdc-icon-size: 20px;
    }

    .item-label {
      font-size: 12px;
      font-weight: 600;
      text-align: center;
      color: var(--primary-text-color);
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .active-badge {
      font-size: 11px;
      font-weight: 650;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--dashboard-card-surface);
      color: var(--secondary-text-color);
      border: var(--dashboard-card-border);
    }

    .active-badge.highlight {
      background: var(--dashboard-active-surface);
      color: var(--primary-color);
      border-color: var(--primary-color);
    }

    .quick-item.unavailable {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .quick-item:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `
];
var dl = Object.getOwnPropertyDescriptor, hl = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? dl(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
let Yi = class extends Ci {
  static getStubConfig() {
    return {
      title: "Quick Controls",
      entities: [
        "light.living_room",
        "switch.coffee_maker",
        "climate.thermostat"
      ],
      show_active_count: !0
    };
  }
  validateConfig(t) {
    if (!t.entities || !Array.isArray(t.entities) || t.entities.length === 0)
      throw new Error(
        "Please specify at least one entity in entities list for ha-quick-bar"
      );
  }
  getCardSize() {
    return 1;
  }
  _handleEntityTap(t) {
    if (!this.hass) return;
    const e = t.tap_action || { action: "toggle" };
    ki(this, this.hass, e, t.entity);
  }
  render() {
    if (!this.hass || !this.config?.entities)
      return this.renderError("No entities configured for ha-quick-bar");
    const t = this.config.entities.map(
      (i) => typeof i == "string" ? { entity: i } : i
    );
    let e = 0;
    return t.forEach((i) => {
      const r = this.hass?.states[i.entity];
      r && !ot(r) && xe(r) && e++;
    }), o`
      <ha-card>
        ${this.config.title || this.config.show_active_count ? o`
                <div class="card-header">
                  <span>${this.config.title || "Quick Controls"}</span>
                  ${this.config.show_active_count !== !1 ? o`
                          <span
                            class="active-badge ${e > 0 ? "highlight" : ""}"
                            aria-label="${e} devices active"
                          >
                            ${e} Active
                          </span>
                        ` : ""}
                </div>
              ` : ""}

        <div class="bar-items-container" role="group" aria-label="${this.config.title || "Quick Controls"}">
          ${t.map((i) => {
      const r = this.hass?.states[i.entity], a = ot(r), s = !a && xe(r), n = it(i.entity), c = i.name || $i(r), l = i.icon || r?.attributes?.icon || ne(n, r?.state), p = a ? "Unavailable" : K(r, this.hass);
      return o`
              <div
                class="quick-item interactive ${s ? "active" : ""} ${a ? "unavailable" : ""}"
                role="button"
                tabindex="${a ? "-1" : "0"}"
                aria-pressed="${String(s)}"
                aria-disabled="${String(a)}"
                aria-label="${c}: ${p}"
                title="${c}: ${p}"
                @click=${() => this._handleEntityTap(i)}
                @keydown=${(f) => {
        (f.key === "Enter" || f.key === " ") && (f.preventDefault(), this._handleEntityTap(i));
      }}
              >
                <div class="item-icon-circle ${s ? "active" : ""}">
                  <ha-icon .icon=${l}></ha-icon>
                </div>
                <span class="item-label">${c}</span>
              </div>
            `;
    })}
        </div>
      </ha-card>
    `;
  }
};
Yi.styles = ll;
Yi = hl([
  k("ha-quick-bar")
], Yi);
const pl = [
  T,
  P,
  wi,
  q,
  y`
    .card-body {
      display: flex;
      align-items: center;
      padding: 12px 14px;
      gap: 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
    }

    .icon-container {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: var(--dashboard-radius-control);
      background-color: var(--secondary-background-color);
      color: var(--secondary-text-color);
      flex-shrink: 0;
    }

    .icon-container.active {
      color: var(--primary-color);
      background-color: var(--dashboard-active-surface);
    }

    .icon-container ha-icon {
      --mdc-icon-size: 20px;
    }

    .info-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      gap: 2px;
    }

    .primary-title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .secondary-text {
      font-size: 12px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .state-label {
      font-weight: 500;
      color: var(--state-color, inherit);
    }

    /* Native Custom Toggle Switch adhering to Section 7 */
    .toggle-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      min-height: 44px;
    }

    .toggle-btn:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }

    .toggle-track {
      position: relative;
      width: 38px;
      height: 22px;
      background-color: var(--divider-color);
      border-radius: var(--dashboard-radius-control);
      padding: 3px;
      box-sizing: border-box;
      transition: background-color 0.12s ease;
    }

    .toggle-thumb {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: var(--secondary-text-color);
      transition:
        transform 0.12s ease,
        background-color 0.12s ease;
    }

    .toggle-track.active {
      background-color: color-mix(
        in srgb,
        var(--primary-color) 35%,
        var(--divider-color)
      );
    }

    .toggle-track.active .toggle-thumb {
      transform: translateX(16px);
      background-color: var(--primary-color);
    }

    .status-card.unavailable {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .status-card:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `
];
var ul = Object.defineProperty, ml = Object.getOwnPropertyDescriptor, yr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? ml(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && ul(e, i, a), a;
};
let Te = class extends gt {
  setConfig(t) {
    this._config = { ...t };
  }
  _valueChanged(t, e) {
    if (!this._config) return;
    const i = t.target;
    let r = i.type === "checkbox" ? i.checked : i.value;
    if (r === "") {
      const a = { ...this._config };
      delete a[e], this._config = a;
    } else
      this._config = {
        ...this._config,
        [e]: r
      };
    nt(this, "config-changed", { config: this._config });
  }
  render() {
    if (!this.hass || !this._config)
      return o``;
    const t = Object.keys(this.hass.states || {}).sort();
    return o`
      <div class="editor-container">
        <!-- Entity Picker -->
        <div class="form-row">
          <label class="form-label" for="entity-select"
            >Entity (Required)</label
          >
          <select
            id="entity-select"
            class="form-select"
            .value=${this._config.entity || ""}
            @change=${(e) => this._valueChanged(e, "entity")}
          >
            <option value="">Select an entity...</option>
            ${t.map(
      (e) => o`
                <option value=${e} ?selected=${this._config.entity === e}>
                  ${this.hass.states[e]?.attributes?.friendly_name || e}
                  (${e})
                </option>
              `
    )}
          </select>
        </div>

        <!-- Custom Name Override -->
        <div class="form-row">
          <label class="form-label" for="name-input"
            >Card Name (Optional)</label
          >
          <input
            id="name-input"
            type="text"
            class="form-input"
            placeholder="Default to entity friendly name"
            .value=${this._config.name || ""}
            @input=${(e) => this._valueChanged(e, "name")}
          />
        </div>

        <!-- Custom Icon -->
        <div class="form-row">
          <label class="form-label" for="icon-input"
            >Icon (Optional, e.g. mdi:lightbulb)</label
          >
          <input
            id="icon-input"
            type="text"
            class="form-input"
            placeholder="mdi:default"
            .value=${this._config.icon || ""}
            @input=${(e) => this._valueChanged(e, "icon")}
          />
        </div>

        <!-- Secondary Info -->
        <div class="form-row">
          <label class="form-label" for="secondary-info-select"
            >Secondary Info</label
          >
          <select
            id="secondary-info-select"
            class="form-select"
            .value=${this._config.secondary_info || "last-changed"}
            @change=${(e) => this._valueChanged(e, "secondary_info")}
          >
            <option value="last-changed">Last Changed Timestamp</option>
            <option value="state">State & Unit</option>
            <option value="entity-id">Entity ID</option>
            <option value="none">None</option>
          </select>
        </div>

        <!-- Toggle Switch Visibility -->
        <label class="form-checkbox-row">
          <input
            type="checkbox"
            .checked=${this._config.show_toggle !== !1}
            @change=${(e) => this._valueChanged(e, "show_toggle")}
          />
          <span class="form-label"
            >Show Quick Toggle Switch (for switchable entities)</span
          >
        </label>
      </div>
    `;
  }
};
Te.styles = [
  da,
  y`
      .form-checkbox-row {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        user-select: none;
      }
      .form-checkbox-row input {
        cursor: pointer;
      }
    `
];
yr([
  ae({ attribute: !1 })
], Te.prototype, "hass", 2);
yr([
  x()
], Te.prototype, "_config", 2);
Te = yr([
  k("ha-status-card-editor")
], Te);
var fl = Object.getOwnPropertyDescriptor, gl = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? fl(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
let Qi = class extends Ci {
  static async getConfigElement() {
    return document.createElement(
      "ha-status-card-editor"
    );
  }
  static getStubConfig(t, e, i) {
    return {
      entity: e.find((a) => a.startsWith("light.") || a.startsWith("switch.")) || e[0] || "light.living_room",
      show_toggle: !0,
      secondary_info: "last-changed"
    };
  }
  validateConfig(t) {
    if (!t.entity)
      throw new Error("Please define an entity");
  }
  getCardSize() {
    return 1;
  }
  _handleTap() {
    if (!this.hass || !this.config) return;
    const t = this.config.tap_action || { action: "more-info" };
    ki(this, this.hass, t, this.config.entity);
  }
  _handleKeyDown(t) {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._handleTap());
  }
  async _handleToggle(t) {
    if (t.stopPropagation(), !this.hass || !this.config?.entity) return;
    const e = this.hass.states[this.config.entity];
    if (ot(e)) return;
    const i = it(this.config.entity), r = i === "lock" ? "lock" : "toggle";
    await this.hass.callService(i, r, void 0, {
      entity_id: this.config.entity
    });
  }
  _renderIcon(t) {
    return t.startsWith("mdi:") ? o`<ha-icon .icon=${t}></ha-icon>` : o`<span>${t}</span>`;
  }
  _getSecondaryText(t, e) {
    if (e) return "Offline";
    const i = this.config?.secondary_info || "last-changed";
    if (i === "none") return "";
    if (i === "state") return K(t, this.hass);
    if (i === "entity-id") return t.entity_id;
    if (i === "last-changed" && t.last_changed)
      try {
        return `Updated ${new Date(t.last_changed).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
      } catch {
        return t.last_changed;
      }
    return "";
  }
  render() {
    if (!this.hass || !this.config?.entity)
      return this.renderError("No entity configured for ha-status-card");
    const t = this.hass.states[this.config.entity];
    if (!t)
      return this.renderError(`Entity not found: ${this.config.entity}`);
    const e = it(this.config.entity), i = ot(t), r = !i && xe(t), a = this.config.name || $i(t), s = this.config.icon || t.attributes.icon || ne(e, t.state), n = i ? "Unavailable" : K(t, this.hass), c = this._getSecondaryText(t, i), l = this.config.show_toggle !== !1 && ["light", "switch", "input_boolean", "fan", "lock"].includes(e), p = i ? "state-unavailable" : r ? "state-active" : "state-inactive";
    return o`
      <ha-card
        class="interactive"
        role="button"
        tabindex="0"
        aria-label="${a}: ${n}"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="card-body ${p}">
          <div class="icon-container ${r ? "active" : ""}">
            ${this._renderIcon(s)}
          </div>

          <div class="info-container">
            <div class="primary-title" title=${a}>${a}</div>
            <div class="secondary-text">
              ${c ? o`${c} &bull; ` : B}
              <span class="state-label">${n}</span>
            </div>
          </div>

          ${l ? o`
                  <button
                    class="toggle-btn ${r ? "active" : ""}"
                    role="switch"
                    aria-checked="${String(r)}"
                    ?disabled=${i}
                    aria-disabled="${String(i)}"
                    @click=${this._handleToggle}
                    @keydown=${(f) => {
      (f.key === "Enter" || f.key === " ") && (f.stopPropagation(), f.preventDefault(), this._handleToggle(f));
    }}
                    aria-label="Toggle ${a}"
                    title="Toggle state"
                  >
                    <div class="toggle-track">
                      <div class="toggle-thumb"></div>
                    </div>
                  </button>
                ` : B}
        </div>
      </ha-card>
    `;
  }
};
Qi.styles = pl;
Qi = gl([
  k("ha-status-card")
], Qi);
console.info(
  "%c HA-COMPONENT-LIBRARY %c 1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #03a9f4; background: #e1f5fe; font-weight: 700; border-radius: 0 3px 3px 0;"
);
export {
  Xe as ComponentActionV2,
  ke as ComponentAppleTvControllerV1,
  Fi as ComponentCameraControllerV1,
  ct as ComponentCameraControllerV2,
  ti as ComponentContextStripV3,
  Vt as ComponentControlRowV2,
  Wt as ComponentDeviceAwareAutoEntitiesV1,
  Gt as ComponentDeviceDiscoveryV2,
  ii as ComponentEmptyStateV2,
  ei as ComponentEmptyStateV3,
  Se as ComponentEnergyDashboardV1,
  Xt as ComponentEnergyDaySelectorV1,
  ht as ComponentEnergySummaryV1,
  mi as ComponentFavouritesMinimalV1,
  zt as ComponentFavouritesV3,
  bt as ComponentGarageDoorControllerV1,
  te as ComponentHistoryGraphV2,
  Ee as ComponentHomeOverviewV4,
  Vi as ComponentHomeOverviewV5,
  Wi as ComponentHouseholdAttentionV1,
  ie as ComponentHouseholdAttentionV2,
  Ae as ComponentHouseholdDirectoryV3,
  ri as ComponentListV2,
  St as ComponentMediaRowV2,
  _t as ComponentMetricPairCardV3,
  hi as ComponentNavigationTileV2,
  ai as ComponentNoticeV2,
  si as ComponentProgressV2,
  pi as ComponentQuickNavigationV2,
  ee as ComponentRoomDirectoryV4,
  $e as ComponentRoomNavigationV1,
  ui as ComponentRoomSheetV2,
  ni as ComponentSectionSeparatorV2,
  Qt as ComponentSecurityCameraWallV3,
  dt as ComponentSecurityDashboardV1,
  Zt as ComponentSecurityEntryPointsV1,
  Jt as ComponentSecuritySummaryV1,
  oi as ComponentSingleKpiV2,
  Tt as ComponentSmartCollectionV3,
  Yt as ComponentSplitControllerV4,
  ci as ComponentStatusRowV2,
  li as ComponentTextEffectV1,
  di as ComponentThreeStatV2,
  At as ComponentUpdateRowV3,
  Kt as ComponentUpdateSummaryV3,
  fi as ComponentWelcomeHeaderV1,
  lt as ComponentWledControllerV1,
  ws as DASHBOARD_BASE_CARD_STYLES,
  vs as DASHBOARD_SHARED_STYLE_CSS,
  $l as DASHBOARD_SHARED_STYLE_ID,
  Is as DashboardRegistryCoordinator,
  Et as EnergyHistoryCardV3,
  ar as GLOBAL_THEME_CSS,
  Ui as GLOBAL_THEME_STYLE_ID,
  Gi as HaActionTile,
  Ci as HaBaseCard,
  Ct as HaComponentLibraryConfigEditor,
  Ki as HaMetricBadge,
  Yi as HaQuickBar,
  Qi as HaStatusCard,
  Nt as INTERACTION_DEFAULTS,
  A as LitBaseCard,
  xs as PRESENTATIONAL_CARD_STYLES,
  Ce as SolarDaylightCardV7,
  $s as UPDATE_CARD_STYLES,
  qi as WLED_DOMAIN,
  Gr as WLED_INVALID,
  Sa as WLED_NAME,
  Ys as actionCardStyles,
  Fe as actionRole,
  el as actionTileCardStyles,
  ga as appleTvBundle,
  Ao as appleTvCardStyles,
  wa as applyPrefs,
  jt as areaOf,
  la as assemblyStyles,
  pt as badgeProgressStyles,
  F as buttonStyles,
  ta as calendarDayRange,
  Po as cameraCardStyles,
  T as cardBaseStyles,
  I as centralRegistry,
  Sl as commonCardStyles,
  ka as computeAreaStatusSummary,
  it as computeDomain,
  vt as computeEntityDisplayName,
  $i as computeEntityName,
  dr as connectionId,
  Xs as contextStripCardStyles,
  Us as controlConfig,
  ba as controlDomains,
  ge as controlResolvers,
  eo as controlRowCardStyles,
  wi as controlStyles,
  na as createAsyncBroker,
  $a as createCardElement,
  ms as createLifecycle,
  oa as createMinuteScheduler,
  rr as createRequestCoalescer,
  or as dashboardBaseCardStyles,
  Vs as dashboardProfiles,
  kl as dashboardTokens,
  we as dayKey,
  de as dayKeyInZone,
  va as defaultControlConfig,
  lo as deviceAwareAutoEntitiesCardStyles,
  mo as deviceDiscoveryCardStyles,
  Ot as dialogStyles,
  Bi as discoverControls,
  O as domainOf,
  an as emptyStateCardStyles,
  rc as energyDashboardCardStyles,
  Je as energyDayData,
  ac as energyDaySelectorCardStyles,
  j as energyDayState,
  mc as energyHistoryCardStyles,
  oc as energySummaryCardStyles,
  us as ensureInteractionFeedback,
  fe as entryFilters,
  Ke as escapeHtml,
  zc as favouritesCardStyles,
  bs as feedbackStyles,
  nt as fireEvent,
  gs as formControlStyles,
  vi as formatCalendarDay,
  _i as formatDate,
  ft as formatEnergy,
  K as formatEntityState,
  st as formatPower,
  Ye as formatTime,
  fa as garageControl,
  Ro as garageDoorCardStyles,
  ne as getDefaultIconForDomain,
  fs as globalTokens,
  ki as handleAction,
  yl as headerStyles,
  Tl as healthAwareRegistryLoad,
  xc as historyGraphCardStyles,
  Oc as homeOverviewCardStyles,
  Zc as householdAttentionCardStyles,
  jc as householdDirectoryCardStyles,
  wl as iconBoxStyles,
  Dt as iconButtonStyles,
  q as iconWellStyles,
  Ks as initWledIntegration,
  ys as injectDashboardTokens,
  ca as injectGlobalTokens,
  ls as installConfigContract,
  S as interaction,
  ds as interactionStyles,
  js as isActive,
  Ts as isControlActive,
  lr as isDiagnosticOrPeripheral,
  xe as isEntityActive,
  ha as isEntityAvailable,
  ot as isEntityUnavailable,
  ua as isPeripheralEntity,
  qs as isPotential,
  Lr as isPrimaryControl,
  Al as isSensorMetric,
  cn as listCardStyles,
  zl as loadDashboardRegistries,
  ya as loadPrefs,
  Pe as loadSecurityModel,
  gi as localeOf,
  so as mediaRowCardStyles,
  nl as metricBadgeCardStyles,
  Cc as metricPairCardStyles,
  ma as nativeClimateControlConfig,
  Mn as navTileCardStyles,
  Xr as navigateTo,
  pn as noticeCardStyles,
  Ut as numberFormat,
  La as openMoreInfo,
  vl as prefersReducedMotion,
  ks as presentationalCardStyles,
  gn as progressCardStyles,
  Ws as ptzRole,
  ll as quickBarCardStyles,
  Bn as quickNavCardStyles,
  E as registerCard,
  _a as registerControlResolver,
  El as registerDeviceResolver,
  pa as registerEntryFilter,
  _s as remoteStyles,
  qr as resolveDeviceCard,
  Vc as roomDirectoryCardStyles,
  Gn as roomNavigationCardStyles,
  Zn as roomSheetCardStyles,
  se as rowListStyles,
  xl as rowStyles,
  xa as savePrefs,
  yn as sectionSeparatorCardStyles,
  Vo as securityCameraWallCardStyles,
  Ai as securityCapabilityText,
  Ko as securityDashboardCardStyles,
  Be as securityEntityLabel,
  Zo as securityEntryPointsCardStyles,
  Gs as securityModel,
  tc as securitySummaryCardStyles,
  sr as separatorStyles,
  $n as singleKpiCardStyles,
  Lc as smartCollectionCardStyles,
  dc as solarDaylightCardStyles,
  Mo as splitAcCardStyles,
  Lt as splitIdentity,
  X as stateNameOf,
  pl as statusCardCardStyles,
  An as statusRowCardStyles,
  tt as surfaceStyles,
  Wr as switchRole,
  nr as telemetryStyles,
  Dn as textEffectCardStyles,
  Nn as threeStatCardStyles,
  bi as timeZoneOf,
  Jr as toText,
  P as typographyStyles,
  Si as uiEntry,
  Cl as updateCardStyles,
  vo as updateRowCardStyles,
  $o as updateSummaryCardStyles,
  Ca as validDay,
  ye as waitForEntityState,
  Pc as welcomeHeaderCardStyles,
  Uo as wledCardStyles
};
