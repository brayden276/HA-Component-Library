const Gr = (t) => t == null ? "" : String(t), Ue = (t) => Gr(t).replace(
  /[&<>"']/g,
  (e) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[e] || e
), it = (t, e, i, r) => {
  const n = new CustomEvent(e, {
    bubbles: r?.bubbles ?? !0,
    cancelable: !!r?.cancelable,
    composed: r?.composed ?? !0,
    detail: i
  });
  return t.dispatchEvent(n), n;
}, Hn = (t, e) => {
  e && it(t, "hass-more-info", { entityId: e });
}, Kr = (t) => {
  t && (window.history.pushState(null, "", t), it(window, "location-changed", { replace: !1 }));
}, di = (t) => {
  const e = t?.locale?.language || (typeof navigator < "u" ? navigator.language : "en-AU") || "en-AU";
  return e === "en" ? "en-AU" : e;
}, pi = (t) => t?.config?.time_zone || void 0, Rt = (t, e, i = {}) => {
  const r = Number(e);
  return Number.isFinite(r) ? new Intl.NumberFormat(di(t), i).format(r) : "—";
}, et = (t, e, i = {}) => {
  if (e == null || e === "") return "—";
  const r = Number(e);
  if (!Number.isFinite(r)) return "—";
  const n = i.absolute ? Math.abs(r) : r;
  return Math.abs(n) >= 1e3 ? `${Rt(t, n / 1e3, { maximumFractionDigits: 1 })} kW` : `${Rt(t, Math.round(n), { maximumFractionDigits: 0 })} W`;
}, pt = (t, e) => {
  if (e == null || e === "") return "—";
  const i = Number(e);
  return Number.isFinite(i) ? `${Rt(t, i, { maximumFractionDigits: Math.abs(i) < 1 ? 2 : 1 })} kWh` : "—";
}, hi = (t, e, i) => new Intl.DateTimeFormat(di(t), {
  timeZone: pi(t),
  ...i
}).format(new Date(e)), ui = (t, e, i = {}) => {
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  return r ? hi(
    t,
    Date.UTC(Number(r[1]), Number(r[2]) - 1, Number(r[3]), 12),
    {
      timeZone: "UTC",
      ...i
    }
  ) : "—";
}, Yr = (t, e) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  if (!i) return null;
  const r = Number(i[1]), n = Number(i[2]) - 1, s = Number(i[3]), a = pi(t);
  if (!a)
    return { start: new Date(r, n, s).getTime(), end: new Date(r, n, s + 1).getTime() };
  const c = new Intl.DateTimeFormat("en-AU", {
    timeZone: a,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }), l = (h, f, g) => {
    const d = Date.UTC(h, f, g);
    let u = d;
    for (let p = 0; p < 2; p += 1) {
      const _ = Object.fromEntries(
        c.formatToParts(new Date(u)).map((v) => [v.type, v.value])
      ), m = Date.UTC(
        Number(_.year),
        Number(_.month) - 1,
        Number(_.day),
        Number(_.hour),
        Number(_.minute),
        Number(_.second)
      );
      u += d - m;
    }
    return u;
  };
  return {
    start: l(r, n, s),
    end: l(r, n, s + 1)
  };
}, Be = (t, e, i = {}) => hi(t, e, {
  hour: "numeric",
  minute: "2-digit",
  ...i
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qe = globalThis, Fi = qe.ShadowRoot && (qe.ShadyCSS === void 0 || qe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Vi = Symbol(), vr = /* @__PURE__ */ new WeakMap();
let Qr = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== Vi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Fi && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = vr.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && vr.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Xt = (t) => new Qr(typeof t == "string" ? t : t + "", void 0, Vi), x = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, n, s) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new Qr(i, t, Vi);
}, Nn = (t, e) => {
  if (Fi) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), n = qe.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, t.appendChild(r);
  }
}, br = Fi ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return Xt(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Rn, defineProperty: In, getOwnPropertyDescriptor: Ln, getOwnPropertyNames: Mn, getOwnPropertySymbols: qn, getPrototypeOf: jn } = Object, mi = globalThis, yr = mi.trustedTypes, Un = yr ? yr.emptyScript : "", Bn = mi.reactiveElementPolyfillSupport, oe = (t, e) => t, Fe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Un : null;
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
} }, Wi = (t, e) => !Rn(t, e), xr = { attribute: !0, type: String, converter: Fe, reflect: !1, useDefault: !1, hasChanged: Wi };
Symbol.metadata ??= Symbol("metadata"), mi.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ot = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = xr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), n = this.getPropertyDescriptor(e, r, i);
      n !== void 0 && In(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: n, set: s } = Ln(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: n, set(a) {
      const c = n?.call(this);
      s?.call(this, a), this.requestUpdate(e, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? xr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(oe("elementProperties"))) return;
    const e = jn(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(oe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(oe("properties"))) {
      const i = this.properties, r = [...Mn(i), ...qn(i)];
      for (const n of r) this.createProperty(n, i[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, n] of i) this.elementProperties.set(r, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const n = this._$Eu(i, r);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const n of r) i.unshift(br(n));
    } else e !== void 0 && i.push(br(e));
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
    return Nn(e, this.constructor.elementStyles), e;
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
    const r = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, r);
    if (n !== void 0 && r.reflect === !0) {
      const s = (r.converter?.toAttribute !== void 0 ? r.converter : Fe).toAttribute(i, r.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, n = r._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const s = r.getPropertyOptions(n), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Fe;
      this._$Em = n;
      const c = a.fromAttribute(i, s.type);
      this[n] = c ?? this._$Ej?.get(n) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, n = !1, s) {
    if (e !== void 0) {
      const a = this.constructor;
      if (n === !1 && (s = this[e]), r ??= a.getPropertyOptions(e), !((r.hasChanged ?? Wi)(s, i) || r.useDefault && r.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: n, wrapped: s }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), s !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), n === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [n, s] of this._$Ep) this[n] = s;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [n, s] of r) {
        const { wrapped: a } = s, c = this[n];
        a !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, s, c);
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
Ot.elementStyles = [], Ot.shadowRootOptions = { mode: "open" }, Ot[oe("elementProperties")] = /* @__PURE__ */ new Map(), Ot[oe("finalized")] = /* @__PURE__ */ new Map(), Bn?.({ ReactiveElement: Ot }), (mi.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gi = globalThis, wr = (t) => t, Ve = Gi.trustedTypes, $r = Ve ? Ve.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Xr = "$lit$", dt = `lit$${Math.random().toFixed(9).slice(2)}$`, Zr = "?" + dt, Fn = `<${Zr}>`, yt = document, de = () => yt.createComment(""), pe = (t) => t === null || typeof t != "object" && typeof t != "function", Ki = Array.isArray, Vn = (t) => Ki(t) || typeof t?.[Symbol.iterator] == "function", Ei = `[ 	
\f\r]`, ie = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, kr = /-->/g, Cr = />/g, vt = RegExp(`>|${Ei}(?:([^\\s"'>=/]+)(${Ei}*=${Ei}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Sr = /'/g, Ar = /"/g, Jr = /^(?:script|style|textarea|title)$/i, Wn = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), o = Wn(1), It = Symbol.for("lit-noChange"), q = Symbol.for("lit-nothing"), Er = /* @__PURE__ */ new WeakMap(), bt = yt.createTreeWalker(yt, 129);
function tn(t, e) {
  if (!Ki(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return $r !== void 0 ? $r.createHTML(e) : e;
}
const Gn = (t, e) => {
  const i = t.length - 1, r = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = ie;
  for (let c = 0; c < i; c++) {
    const l = t[c];
    let h, f, g = -1, d = 0;
    for (; d < l.length && (a.lastIndex = d, f = a.exec(l), f !== null); ) d = a.lastIndex, a === ie ? f[1] === "!--" ? a = kr : f[1] !== void 0 ? a = Cr : f[2] !== void 0 ? (Jr.test(f[2]) && (n = RegExp("</" + f[2], "g")), a = vt) : f[3] !== void 0 && (a = vt) : a === vt ? f[0] === ">" ? (a = n ?? ie, g = -1) : f[1] === void 0 ? g = -2 : (g = a.lastIndex - f[2].length, h = f[1], a = f[3] === void 0 ? vt : f[3] === '"' ? Ar : Sr) : a === Ar || a === Sr ? a = vt : a === kr || a === Cr ? a = ie : (a = vt, n = void 0);
    const u = a === vt && t[c + 1].startsWith("/>") ? " " : "";
    s += a === ie ? l + Fn : g >= 0 ? (r.push(h), l.slice(0, g) + Xr + l.slice(g) + dt + u) : l + dt + (g === -2 ? c : u);
  }
  return [tn(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class he {
  constructor({ strings: e, _$litType$: i }, r) {
    let n;
    this.parts = [];
    let s = 0, a = 0;
    const c = e.length - 1, l = this.parts, [h, f] = Gn(e, i);
    if (this.el = he.createElement(h, r), bt.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (n = bt.nextNode()) !== null && l.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const g of n.getAttributeNames()) if (g.endsWith(Xr)) {
          const d = f[a++], u = n.getAttribute(g).split(dt), p = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: s, name: p[2], strings: u, ctor: p[1] === "." ? Yn : p[1] === "?" ? Qn : p[1] === "@" ? Xn : fi }), n.removeAttribute(g);
        } else g.startsWith(dt) && (l.push({ type: 6, index: s }), n.removeAttribute(g));
        if (Jr.test(n.tagName)) {
          const g = n.textContent.split(dt), d = g.length - 1;
          if (d > 0) {
            n.textContent = Ve ? Ve.emptyScript : "";
            for (let u = 0; u < d; u++) n.append(g[u], de()), bt.nextNode(), l.push({ type: 2, index: ++s });
            n.append(g[d], de());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Zr) l.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = n.data.indexOf(dt, g + 1)) !== -1; ) l.push({ type: 7, index: s }), g += dt.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const r = yt.createElement("template");
    return r.innerHTML = e, r;
  }
}
function Lt(t, e, i = t, r) {
  if (e === It) return e;
  let n = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const s = pe(e) ? void 0 : e._$litDirective$;
  return n?.constructor !== s && (n?._$AO?.(!1), s === void 0 ? n = void 0 : (n = new s(t), n._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = n : i._$Cl = n), n !== void 0 && (e = Lt(t, n._$AS(t, e.values), n, r)), e;
}
class Kn {
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
    const { el: { content: i }, parts: r } = this._$AD, n = (e?.creationScope ?? yt).importNode(i, !0);
    bt.currentNode = n;
    let s = bt.nextNode(), a = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let h;
        l.type === 2 ? h = new ke(s, s.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (h = new Zn(s, this, e)), this._$AV.push(h), l = r[++c];
      }
      a !== l?.index && (s = bt.nextNode(), a++);
    }
    return bt.currentNode = yt, n;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class ke {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, n) {
    this.type = 2, this._$AH = q, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = n, this._$Cv = n?.isConnected ?? !0;
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
    e = Lt(this, e, i), pe(e) ? e === q || e == null || e === "" ? (this._$AH !== q && this._$AR(), this._$AH = q) : e !== this._$AH && e !== It && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Vn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== q && pe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(yt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, n = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = he.createElement(tn(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === n) this._$AH.p(i);
    else {
      const s = new Kn(n, this), a = s.u(this.options);
      s.p(i), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Er.get(e.strings);
    return i === void 0 && Er.set(e.strings, i = new he(e)), i;
  }
  k(e) {
    Ki(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, n = 0;
    for (const s of e) n === i.length ? i.push(r = new ke(this.O(de()), this.O(de()), this, this.options)) : r = i[n], r._$AI(s), n++;
    n < i.length && (this._$AR(r && r._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = wr(e).nextSibling;
      wr(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class fi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, n, s) {
    this.type = 1, this._$AH = q, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = q;
  }
  _$AI(e, i = this, r, n) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = Lt(this, e, i, 0), a = !pe(e) || e !== this._$AH && e !== It, a && (this._$AH = e);
    else {
      const c = e;
      let l, h;
      for (e = s[0], l = 0; l < s.length - 1; l++) h = Lt(this, c[r + l], i, l), h === It && (h = this._$AH[l]), a ||= !pe(h) || h !== this._$AH[l], h === q ? e = q : e !== q && (e += (h ?? "") + s[l + 1]), this._$AH[l] = h;
    }
    a && !n && this.j(e);
  }
  j(e) {
    e === q ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Yn extends fi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === q ? void 0 : e;
  }
}
class Qn extends fi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== q);
  }
}
class Xn extends fi {
  constructor(e, i, r, n, s) {
    super(e, i, r, n, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Lt(this, e, i, 0) ?? q) === It) return;
    const r = this._$AH, n = e === q && r !== q || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== q && (r === q || n);
    n && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Zn {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Lt(this, e);
  }
}
const Jn = Gi.litHtmlPolyfillSupport;
Jn?.(he, ke), (Gi.litHtmlVersions ??= []).push("3.3.3");
const ts = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let n = r._$litPart$;
  if (n === void 0) {
    const s = i?.renderBefore ?? null;
    r._$litPart$ = n = new ke(e.insertBefore(de(), s), s, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yi = globalThis;
class ht extends Ot {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ts(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return It;
  }
}
ht._$litElement$ = !0, ht.finalized = !0, Yi.litElementHydrateSupport?.({ LitElement: ht });
const es = Yi.litElementPolyfillSupport;
es?.({ LitElement: ht });
(Yi.litElementVersions ??= []).push("4.2.2");
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
const is = { attribute: !0, type: String, converter: Fe, reflect: !1, hasChanged: Wi }, rs = (t = is, e, i) => {
  const { kind: r, metadata: n } = i;
  let s = globalThis.litPropertyMetadata.get(n);
  if (s === void 0 && globalThis.litPropertyMetadata.set(n, s = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(i.name, t), r === "accessor") {
    const { name: a } = i;
    return { set(c) {
      const l = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(a, l, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, t, c), c;
    } };
  }
  if (r === "setter") {
    const { name: a } = i;
    return function(c) {
      const l = this[a];
      e.call(this, c), this.requestUpdate(a, l, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function Zt(t) {
  return (e, i) => typeof i == "object" ? rs(t, e, i) : ((r, n, s) => {
    const a = n.hasOwnProperty(s);
    return n.constructor.createProperty(s, r), a ? Object.getOwnPropertyDescriptor(n, s) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function y(t) {
  return Zt({ ...t, state: !0, attribute: !1 });
}
var ns = Object.defineProperty, ss = Object.getOwnPropertyDescriptor, Ce = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ss(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && ns(e, i, n), n;
};
let xt = class extends ht {
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
          ${this.cardType ? o`<span class="type-badge">${Ue(this.cardType)}</span>` : ""}
        </div>
        <textarea
          .value=${t}
          @change=${this._onChange}
          spellcheck="false"
          aria-label="Card Configuration JSON"
        ></textarea>
        ${this._error ? o`<div class="error">⚠️ ${Ue(this._error)}</div>` : ""}
      </div>
    `;
  }
};
xt.styles = x`
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
Ce([
  Zt({ attribute: !1 })
], xt.prototype, "hass", 2);
Ce([
  Zt({ type: String })
], xt.prototype, "cardType", 2);
Ce([
  y()
], xt.prototype, "_config", 2);
Ce([
  y()
], xt.prototype, "_error", 2);
xt = Ce([
  k("ha-component-library-config-editor")
], xt);
const as = (t, e) => {
  e.getStubConfig || (e.getStubConfig = () => ({
    ...e.stubConfig || {}
  })), e.getConfigElement || (e.getConfigElement = () => {
    const i = document.createElement(
      "ha-component-library-config-editor"
    );
    return i.cardType = t, i;
  });
}, E = (t) => {
  const { type: e, element: i, name: r, description: n, preview: s = !0 } = t;
  as(e, i), customElements.get(e) || customElements.define(e, i), typeof window < "u" && (window.customCards = window.customCards || [], window.customCards.some((a) => a.type === e) || window.customCards.push({
    type: e,
    name: r,
    description: n,
    preview: s
  }));
}, zt = Object.freeze({
  holdDelay: 500,
  moveTolerance: 10,
  errorDuration: 1800,
  repeatDelay: 350,
  repeatInterval: 110,
  repeatMinimumInterval: 55
}), hl = () => typeof window < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0, os = `
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
`, cs = (t) => {
  if (!t) return null;
  if (t === !0) return {};
  if (typeof t != "object")
    throw new TypeError(
      "interaction repeat must be false, true, or an options object"
    );
  return t;
}, ls = (t, e) => {
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
}, ds = (t) => {
  const e = t.getRootNode?.();
  if (!e || e.__haInteractionFeedbackV2) return null;
  e.__haInteractionFeedbackV2 = !0;
  const i = document.createElement("style");
  i.setAttribute("data-ha-interaction-styles", "v2"), i.textContent = os;
  const r = document.createElement("span");
  r.setAttribute("data-ha-interaction-status", "v2"), r.setAttribute("role", "status"), r.setAttribute("aria-live", "polite"), r.setAttribute("aria-atomic", "true");
  const n = e.nodeType === 9 || e.body ? e.body || e.head || e.documentElement : e;
  return n && typeof n.append == "function" && n.append(i, r), r;
}, zr = [
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
  const i = ds(t), r = typeof e.primary == "function" ? e.primary : null, n = typeof e.hold == "function" ? e.hold : null, s = cs(e.repeat);
  if (n && s)
    throw new TypeError("interaction hold and repeat are mutually exclusive");
  if (!r && (n || s))
    throw new TypeError("interaction hold/repeat requires a primary action");
  const a = e.feedback !== !1, c = e.singleFlight === !0, l = Math.max(
    250,
    Number(e.holdDelay) || zt.holdDelay
  ), h = Math.max(
    4,
    Number(e.moveTolerance) || zt.moveTolerance
  ), f = ls(e.optimistic, t), g = e.signal, d = typeof e.onPressChange == "function" ? e.onPressChange : null;
  let u = null, p = null, _ = null, m = null, v = 0, $ = !1, b = null, z = !1, P = 0, N = null, I = !1, C = !1;
  const O = (w) => {
    const G = w?.composedPath?.();
    if (Array.isArray(G) && G.length)
      for (const X of G) {
        if (X === t) return !1;
        if (X?.matches?.(zr))
          return !0;
      }
    const K = w?.target;
    if (!K || K === t) return !1;
    const Y = K.closest?.(zr);
    return !!(Y && Y !== t && t.contains?.(Y));
  }, F = () => I || c && P > 0 || t.disabled === !0 || t.getAttribute?.("aria-disabled") === "true", H = () => {
    b && clearTimeout(b), b = null, $ = !1;
  }, U = () => {
    $ = !0, b && clearTimeout(b), b = setTimeout(H, 0);
  }, B = (w) => {
    C !== w && (C = w, a && t.toggleAttribute?.("data-interaction-pressed", w), I || d?.(w, t));
  }, At = (w) => {
    P = Math.max(0, P + w), !(!a || I) && (t.toggleAttribute?.("data-interaction-pending", P > 0), t.setAttribute?.("aria-busy", String(P > 0)));
  }, Et = () => {
    if (!a || I) return;
    N && clearTimeout(N), t.setAttribute?.("data-interaction-error", "true");
    const w = i || t.getRootNode?.()?.querySelector?.(
      "[data-ha-interaction-status]"
    );
    w && (w.textContent = e.errorMessage || "Action failed. Try again."), N = setTimeout(
      () => {
        N = null, I || t.removeAttribute?.("data-interaction-error");
      },
      Math.max(
        250,
        Number(e.errorDuration) || zt.errorDuration
      )
    );
  }, Pe = (w) => {
    I || t.dispatchEvent?.(
      new CustomEvent("ha-interaction-error", {
        bubbles: !0,
        composed: !0,
        detail: { error: w }
      })
    );
  }, J = (w, G) => {
    if (F()) return Promise.resolve(void 0);
    const K = w === "hold" ? n : r;
    if (!K) return Promise.resolve(void 0);
    let Y;
    w === "primary" && f && (Y = f.capture(t, G), f.apply(t, G, Y));
    let X;
    try {
      X = K(G);
    } catch (_t) {
      return !I && w === "primary" && f?.rollback && f.rollback(Y, _t, t, G), Et(), Pe(_t), Promise.reject(_t);
    }
    return !X || typeof X.then != "function" ? Promise.resolve(X) : (At(1), Promise.resolve(X).catch((_t) => {
      throw !I && w === "primary" && f?.rollback && f.rollback(Y, _t, t, G), Et(), Pe(_t), _t;
    }).finally(() => {
      I || At(-1);
    }));
  }, T = () => {
    p && clearTimeout(p), p = null, _ && clearTimeout(_), _ = null, m && clearInterval(m), m = null;
  }, W = () => {
    T(), u = null, B(!1);
  }, lt = (w) => {
    if (!s || F()) return;
    const G = Math.max(
      150,
      Number(s.delay) || zt.repeatDelay
    ), K = Math.max(
      40,
      Number(s.interval) || zt.repeatInterval
    );
    v = 0, _ = setTimeout(() => {
      if (_ = null, I || !u) return;
      z = !0, U();
      const Y = () => {
        if (I || !u) {
          m && clearInterval(m), m = null;
          return;
        }
        if (v += 1, J("primary", w).catch(() => {
        }), I || !u || !s.accelerate) return;
        const X = Math.max(
          Number(s.minimumInterval) || zt.repeatMinimumInterval,
          Math.round(K * Math.pow(0.93, v))
        );
        m && clearInterval(m), m = setInterval(Y, X);
      };
      J("primary", w).catch(() => {
      }), !I && u && (m = setInterval(Y, K));
    }, G);
  }, gt = (w) => {
    if (!(!r || F() || w.button > 0 || O(w))) {
      u = { id: w.pointerId, x: w.clientX, y: w.clientY }, z = !1, H();
      try {
        t.setPointerCapture?.(w.pointerId);
      } catch {
      }
      B(!0), n ? p = setTimeout(() => {
        p = null, u && (z = !0, U(), B(!1), J("hold", w).catch(() => {
        }));
      }, l) : s && lt(w);
    }
  }, ee = (w) => {
    !u || w.pointerId !== u.id || Math.hypot(w.clientX - u.x, w.clientY - u.y) <= h || (z = !0, U(), W());
  }, mr = (w) => {
    if (!u || w.pointerId !== u.id) return;
    if (O(w)) {
      z = !0, U(), W();
      return;
    }
    const G = z, K = s && (_ === null || m !== null);
    T(), u = null, z = !1, B(!1), U(), !G && !K && J("primary", w).catch(() => {
    });
  }, He = () => {
    z = !1, U(), W();
  }, fr = (w) => {
    if (!O(w)) {
      if ($) {
        w.preventDefault(), w.stopImmediatePropagation?.(), H();
        return;
      }
      !r || F() || J("primary", w).catch(() => {
      });
    }
  }, gr = (w) => {
    !r || F() || w.repeat || O(w) || w.key !== "Enter" && w.key !== " " || (w.preventDefault(), B(!0));
  }, _r = (w) => {
    !r || F() || O(w) || w.key !== "Enter" && w.key !== " " || (w.preventDefault(), B(!1), U(), J("primary", w).catch(() => {
    }));
  };
  t.addEventListener("pointerdown", gt, {
    passive: !0
  }), t.addEventListener("pointermove", ee, {
    passive: !0
  }), t.addEventListener("pointerup", mr, {
    passive: !0
  }), t.addEventListener("pointercancel", He, {
    passive: !0
  }), t.addEventListener(
    "lostpointercapture",
    He,
    { passive: !0 }
  ), t.addEventListener("click", fr, !0), t.addEventListener("keydown", gr), t.addEventListener("keyup", _r);
  const Ai = () => {
    I || (I = !0, T(), N && clearTimeout(N), b && clearTimeout(b), N = null, b = null, g?.removeEventListener?.("abort", Ai), C = !1, P = 0, a && (t.removeAttribute?.("data-interaction-pressed"), t.removeAttribute?.("data-interaction-pending"), t.removeAttribute?.("data-interaction-error"), t.setAttribute?.("aria-busy", "false")), t.removeEventListener("pointerdown", gt), t.removeEventListener("pointermove", ee), t.removeEventListener("pointerup", mr), t.removeEventListener(
      "pointercancel",
      He
    ), t.removeEventListener(
      "lostpointercapture",
      He
    ), t.removeEventListener("click", fr, !0), t.removeEventListener("keydown", gr), t.removeEventListener("keyup", _r));
  };
  return g?.addEventListener?.("abort", Ai, { once: !0 }), Object.freeze({
    element: t,
    destroy: Ai,
    get destroyed() {
      return I;
    },
    invoke: (w) => J("primary", w)
  });
}, Qi = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createRequestCoalescer requires a request function");
  let i = !1, r = !1, n, s = !1, a = 0;
  const c = async () => {
    if (!(i || s || !r)) {
      for (i = !0; !s && r; ) {
        r = !1;
        const l = n, h = ++a;
        try {
          await t(l, h), s || e.onSuccess?.(l, h);
        } catch (f) {
          s || e.onError?.(f, l, h), e.stopOnError && (r = !1);
        }
      }
      i = !1, s || e.onIdle?.();
    }
  };
  return Object.freeze({
    request(l) {
      s || (n = l, r = !0, c());
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
}, ue = (t, e, i, r = {}) => {
  if (!e || typeof i != "function")
    return Promise.reject(
      new TypeError("waitForEntityState requires an entity and predicate")
    );
  const n = typeof t == "function" ? t : () => t, s = Math.max(250, Number(r.timeout) || 9e3), a = Math.max(40, Number(r.interval) || 160), c = r.signal;
  return new Promise((l, h) => {
    let f = null, g = null, d = !1;
    const u = () => {
      f && clearInterval(f), g && clearTimeout(g), c?.removeEventListener?.("abort", _);
    }, p = (v, $) => {
      d || (d = !0, u(), v($));
    }, _ = () => p(h, c?.reason || new Error("State confirmation aborted")), m = () => {
      const v = n()?.states?.[e] ?? null;
      try {
        i(v?.state, v) && p(l, v);
      } catch ($) {
        p(h, $);
      }
    };
    if (c?.aborted) return _();
    c?.addEventListener?.("abort", _, { once: !0 }), f = setInterval(m, a), g = setTimeout(
      () => p(h, new Error("State confirmation timed out")),
      s
    ), m();
  });
}, en = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createAsyncBroker requires a loader");
  const i = /* @__PURE__ */ new Map(), r = Math.max(0, Number(e.ttl) || 12e4), n = Math.max(r, Number(e.maxStale) || 864e5), s = Math.max(250, Number(e.retryBase) || 2e3), a = Math.max(s, Number(e.retryMax) || 6e4), c = (g) => (i.has(g) || i.set(g, {
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
  }, h = (g) => {
    const d = l(g);
    for (const u of [...c(g).subscribers])
      try {
        u(d);
      } catch {
      }
  }, f = (g, d, u = !1) => {
    const p = c(g), _ = Date.now();
    if (p.promise) return p.promise;
    if (!u && _ < p.nextRetryAt)
      return p.value !== void 0 ? Promise.resolve(p.value) : Promise.reject(p.error);
    const m = ++p.sequence, v = p.generation;
    return p.promise = Promise.resolve().then(() => t(g, d, m)).then(($) => m !== p.sequence ? p.value : (p.value = $, p.error = null, p.updatedAt = Date.now(), p.failures = 0, p.nextRetryAt = 0, p.invalidated = p.generation !== v, $)).catch(($) => {
      if (m !== p.sequence || (p.error = $ instanceof Error ? $ : new Error(String($)), p.failures += 1, p.nextRetryAt = Date.now() + Math.min(a, s * Math.pow(2, p.failures - 1)), p.value !== void 0 && Date.now() - p.updatedAt <= n))
        return p.value;
      throw p.error;
    }).finally(() => {
      m === p.sequence && (p.promise = null), h(g);
    }), h(g), p.promise;
  };
  return Object.freeze({
    clear() {
      i.clear();
    },
    invalidate(g) {
      const d = i.get(g);
      d && (d.invalidated = !0, d.generation += 1, d.nextRetryAt = 0, h(g));
    },
    peek: l,
    async read(g, d, u = {}) {
      const p = l(g), _ = p.updatedAt ? Date.now() - p.updatedAt : 1 / 0, m = c(g);
      if (!u.force && !m.invalidated && p.value !== void 0 && _ <= r)
        return p.value;
      if (!u.force && p.value !== void 0 && _ <= n)
        return f(g, d).catch(() => {
        }), p.value;
      let v;
      try {
        v = await f(g, d, u.force === !0);
      } catch ($) {
        if (u.force && c(g).invalidated)
          return f(g, d, !0);
        throw $;
      }
      return u.force && c(g).invalidated && (v = await f(g, d, !0)), v;
    },
    refresh: (g, d) => f(g, d, !0),
    subscribe(g, d, u = {}) {
      const p = c(g);
      return p.subscribers.add(d), u.replay !== !1 && d(l(g)), () => {
        p.subscribers.delete(d);
      };
    }
  });
}, ps = (t) => {
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
    listen: (c, l, h, f = {}) => {
      const g = r();
      return c?.addEventListener?.(l, h, { ...f, signal: g }), h;
    }
  });
}, rn = (t, e) => {
  let i = null, r = !0;
  const n = () => {
    if (!r) return;
    const a = 6e4 - Date.now() % 6e4 + 100;
    i = setTimeout(() => {
      if (r) {
        try {
          t();
        } catch {
        }
        n();
      }
    }, a);
  };
  n();
  const s = () => {
    r = !1, i && (clearTimeout(i), i = null);
  };
  return e && e.cleanup(s), s;
}, Tr = "ha-component-library-theme-tokens", nn = `
:root {
  /* ==========================================================================
     SPACING & LAYOUT TOKENS
     ========================================================================== */
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

  /* ==========================================================================
     TYPOGRAPHY SCALE
     ========================================================================== */
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

  /* ==========================================================================
     COMPONENT DIMENSIONS
     ========================================================================== */
  --c-row-min-height: 44px;
  --c-head-min-height: 32px;
  --c-icon-box-size: 28px;
  --c-icon-size: 17px;
  --c-icon-sm-size: 15px;
  
  --c-button-height: 34px;
  --c-button-sm-height: 26px;
  --c-button-icon-size: 32px;
  
  --c-switch-width: 32px;
  --c-switch-height: 18px;
  --c-switch-knob-size: 14px;
  --c-slider-width: 80px;
  --c-slider-height: 4px;

  /* ==========================================================================
     BORDER RADII
     ========================================================================== */
  --c-radius-card: 7px;
  --c-radius-control: 5px;
  --c-radius-icon: 5px;
  --c-radius-dialog: 8px;
  --c-radius-pill: 999px;

  /* ==========================================================================
     SURFACES & BORDERS
     ========================================================================== */
  --c-card-surface: var(--ha-card-background, var(--card-background-color));
  --c-card-border-color: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
  --c-card-border: 1px solid var(--c-card-border-color);
  --c-muted-surface: color-mix(in srgb, var(--primary-text-color) 3%, var(--card-background-color));
  --c-active-surface: color-mix(in srgb, var(--primary-color) 7%, var(--card-background-color));
  --c-dialog-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
  --c-modal-scrim: rgba(0, 0, 0, 0.16);

  /* Home Assistant Core Fallbacks */
  --ha-card-border-radius: var(--c-radius-card);
  --ha-card-box-shadow: none;
  --ha-card-border-width: 1px;
  --ha-card-border-color: var(--c-card-border-color);
}

@media (max-width: 700px) {
  :root {
    --c-card-padding: 8px 10px;
    --c-radius-dialog: 7px;
  }
}
`, hs = () => {
  if (typeof document > "u") return;
  let t = document.getElementById(Tr);
  t || (t = document.createElement("style"), t.id = Tr, document.head?.append(t)), t.textContent = nn;
};
hs();
const us = x`
  ${Xt(nn)}
`, Se = [
  us,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    [hidden] {
      display: none !important;
    }
    button,
    input,
    select {
      font: inherit;
      color: inherit;
    }
    button {
      appearance: none;
      border: 0;
      background: transparent;
      padding: 0;
      cursor: pointer;
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
      overflow: hidden;
      border: var(--c-card-border);
      border-radius: var(--c-radius-card);
      background: var(--c-card-surface);
      box-shadow: none;
      color: var(--primary-text-color);
    }
  `
], sn = x`
  .head {
    min-height: var(--c-head-min-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--c-space-2);
    margin-bottom: var(--c-space-1);
    padding: 0 2px;
  }
  .heading {
    display: flex;
    align-items: center;
    gap: var(--c-space-2);
    min-width: 0;
  }
  .heading ha-icon {
    color: var(--secondary-text-color);
    --mdc-icon-size: var(--c-icon-sm-size);
  }
  .heading h2 {
    margin: 0;
    font-size: var(--c-font-lg);
    line-height: var(--c-line-height-normal);
    font-weight: var(--c-font-weight-medium);
  }
  .head.sep {
    min-height: 26px;
    margin: 2px 0 4px;
  }
  .head.sep .heading {
    flex: 1;
  }
  .head.sep .heading h2 {
    font-size: var(--c-font-base);
    font-weight: var(--c-font-weight-medium);
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
    width: var(--c-button-icon-size);
    height: var(--c-button-icon-size);
    border-radius: var(--c-radius-control);
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
  }
  .edit ha-icon {
    --mdc-icon-size: var(--c-icon-sm-size);
  }
  .edit:hover,
  .edit:focus-visible {
    background: var(--c-muted-surface);
    color: var(--primary-text-color);
  }
`, Xi = x`
  .row {
    width: 100%;
    text-align: left;
  }
  .wrap {
    min-height: var(--c-row-min-height);
    padding: var(--c-card-padding);
    display: grid;
    grid-template-columns: var(--c-icon-box-size) minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--c-space-3);
  }
  .identity {
    min-width: 0;
    min-height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    gap: var(--c-space-3);
    text-align: left;
  }
  .copy {
    min-width: 0;
  }
  .name,
  .title {
    display: block;
    font-size: var(--c-font-md);
    line-height: var(--c-line-height-normal);
    font-weight: var(--c-font-weight-medium);
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
    font-size: var(--c-font-sm);
    line-height: var(--c-line-height-normal);
    font-weight: var(--c-font-weight-normal);
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`, Zi = x`
  .icon,
  .ico,
  .iw,
  .well {
    width: var(--c-icon-box-size);
    height: var(--c-icon-box-size);
    display: grid;
    place-items: center;
    border-radius: var(--c-radius-icon);
    background: transparent;
    color: var(--primary-color);
    flex-shrink: 0;
  }
  .icon ha-icon,
  .ico ha-icon,
  .iw ha-icon,
  .well ha-icon,
  ha-icon {
    --mdc-icon-size: var(--c-icon-size);
  }
`, Ji = x`
  .action,
  .btn,
  .pw,
  .quick,
  .close {
    border: 1px solid var(--c-card-border-color);
    border-radius: var(--c-radius-control);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--c-space-2);
    font-size: var(--c-font-base);
    font-weight: var(--c-font-weight-medium);
    color: var(--secondary-text-color);
    transition: background 0.12s, color 0.12s, border-color 0.12s;
  }
  .action {
    min-height: var(--c-button-sm-height);
    padding: 0 8px;
    color: var(--primary-color);
  }
  .pw,
  .close {
    width: var(--c-button-height);
    height: var(--c-button-height);
    padding: 0;
  }
  .pw.on {
    color: var(--primary-color);
    background: var(--c-active-surface);
  }
  .action:hover,
  .btn:hover,
  .pw:hover,
  .close:hover {
    background: var(--c-muted-surface);
    color: var(--primary-text-color);
  }
`, ms = x`
  .switch {
    width: var(--c-switch-width);
    height: var(--c-switch-height);
    border-radius: var(--c-radius-control);
    background: var(--divider-color);
    padding: 2px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .switch span {
    display: block;
    width: var(--c-switch-knob-size);
    height: var(--c-switch-knob-size);
    border-radius: 50%;
    background: var(--secondary-text-color);
    transition: margin 0.12s, background 0.12s;
  }
  .switch.on {
    background: color-mix(in srgb, var(--primary-color) 35%, var(--divider-color));
  }
  .switch.on span {
    margin-left: 14px;
    background: var(--primary-color);
  }
  .slider {
    width: var(--c-slider-width);
    height: var(--c-slider-height);
    border-radius: var(--c-radius-control);
    background: var(--divider-color);
    overflow: hidden;
  }
  .slider span {
    display: block;
    height: 100%;
    background: var(--primary-color);
    border-radius: var(--c-radius-control);
  }
  .metric {
    font-size: var(--c-font-base);
    font-weight: var(--c-font-weight-medium);
  }
`, ul = x`
  dialog {
    width: min(720px, calc(100vw - 24px));
    height: min(760px, calc(100dvh - 32px));
    min-height: min(560px, calc(100dvh - 32px));
    margin: auto;
    padding: 0;
    border: var(--c-card-border);
    border-radius: var(--c-radius-dialog);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--c-dialog-shadow);
    overflow: hidden;
  }
  dialog::backdrop {
    background: var(--c-modal-scrim);
    backdrop-filter: blur(3px);
  }
  .sheet {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .sheet-head {
    flex: 0 0 auto;
    min-height: 42px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    gap: var(--c-space-3);
    border-bottom: 1px solid var(--divider-color);
  }
  .sheet-name,
  .sheet-title {
    font-size: var(--c-font-lg);
    line-height: var(--c-line-height-normal);
    font-weight: var(--c-font-weight-medium);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sheet-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    padding: var(--c-card-padding);
  }
  @media (max-width: 700px) {
    dialog {
      width: 100vw;
      max-width: 100vw;
      height: 92dvh;
      min-height: 92dvh;
      max-height: 92dvh;
      margin: auto 0 0;
      border-width: 1px 0 0;
      border-radius: var(--c-radius-dialog) var(--c-radius-dialog) 0 0;
    }
  }
`, Dr = "dashboard-shared-ui-tokens-v3", an = ":root{--dashboard-space-1:3px;--dashboard-space-2:6px;--dashboard-space-3:10px;--dashboard-space-4:12px;--dashboard-space-5:18px;--dashboard-control-height:38px;--dashboard-icon-size:18px;--dashboard-transition-fast:80ms;--dashboard-transition-standard:160ms;--dashboard-easing-standard:cubic-bezier(.2,0,0,1);--dashboard-focus-ring:2px solid var(--primary-color);--dashboard-focus-offset:2px;--dashboard-layer-popover:20;--dashboard-layer-overlay:1000;--dashboard-media-surface:#111;--dashboard-media-on-surface:#fff;--dashboard-radius-card:7px;--dashboard-radius-control:5px;--dashboard-radius-dialog:8px;--dashboard-radius-icon:0px;--dashboard-modal-scrim:rgba(0,0,0,.16);--dashboard-card-surface:var(--ha-card-background,var(--card-background-color));--dashboard-card-muted-surface:color-mix(in srgb,var(--primary-text-color) 3%,var(--card-background-color));--dashboard-card-border-color:color-mix(in srgb,var(--primary-text-color) 10%,transparent);--dashboard-card-border:1px solid var(--dashboard-card-border-color);--dashboard-active-surface:color-mix(in srgb,var(--primary-color) 7%,var(--card-background-color));--dashboard-warning-surface:color-mix(in srgb,var(--warning-color,#f9a825) 9%,var(--card-background-color));--dashboard-critical-surface:color-mix(in srgb,var(--error-color) 8%,var(--card-background-color));--dashboard-dialog-shadow:0 12px 36px rgba(0,0,0,.18);--ha-card-border-radius:var(--dashboard-radius-card);--ha-card-box-shadow:none;--ha-card-border-width:1px;--ha-card-border-color:var(--dashboard-card-border-color)}@media(max-width:700px){:root{--dashboard-radius-dialog:7px}}@media(prefers-reduced-motion:reduce){:root{--dashboard-transition-fast:0ms;--dashboard-transition-standard:0ms}}", fs = () => {
  if (typeof document > "u") return;
  let t = document.getElementById(Dr);
  t || (t = document.createElement("style"), t.id = Dr, document.head?.append(t)), t.textContent = an;
};
fs();
const ml = x`
  ${Xt(an)}
`, gs = ":host{display:block;min-width:0}ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,12px);background:var(--ha-card-background,var(--card-background-color));color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}button.demo{appearance:none;width:100%;border:0;background:transparent;text-align:inherit;padding:0;cursor:pointer}button.demo:active{transform:scale(.992)}button.demo:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px;border-radius:var(--ha-card-border-radius,12px)}", _s = ":host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border,1px solid var(--divider-color));border-radius:var(--dashboard-radius-card,var(--ha-card-border-radius,6px));background:var(--dashboard-card-surface,var(--ha-card-background,var(--card-background-color)));box-shadow:none;color:var(--primary-text-color);box-sizing:border-box}.wrap{box-sizing:border-box;padding:8px 11px}.title{font-size:12px;line-height:1.2;font-weight:500;color:var(--primary-text-color)}.desc{margin-top:2px;font-size:10.5px;line-height:1.25;color:var(--secondary-text-color)}ha-icon{--mdc-icon-size:17px}button{font:inherit;color:inherit}button.i{appearance:none;border:0;background:transparent;cursor:pointer}button.i:active{background:var(--dashboard-card-muted-surface,var(--secondary-background-color))}button.i:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px;border-radius:var(--dashboard-radius-control,4px)}@media(max-width:700px){.wrap{padding:8px 10px}}", vs = ":host{display:block;min-width:0}ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,16px);background:var(--ha-card-background,var(--card-background-color));color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}", ct = x`
  ${Xt(gs)}
`, j = x`
  ${Xt(_s)}
`, tr = x`
  ${Xt(vs)}
`, gi = ct, on = x`
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
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--secondary-text-color, #757575);
  }
  .form-input,
  .form-select {
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.25));
    background: var(--card-background-color, #ffffff);
    color: var(--primary-text-color, #212121);
    font-size: 0.9rem;
    outline: none;
  }
  .form-input:focus,
  .form-select:focus {
    border-color: var(--primary-color, #03a9f4);
  }
`;
function Z(t) {
  return t && t.split(".")[0] || "";
}
const D = Z;
function ft(t) {
  let e = t.entry?.name || t.entry?.original_name || t.state?.attributes?.friendly_name || t.fallback || t.entry?.entity_id || t.state?.entity_id || "Control";
  if (t.stripSuffixes && t.stripSuffixes.length > 0)
    for (const i of t.stripSuffixes)
      e = e.replace(i, "").trim();
  return e;
}
function _i(t, e) {
  return t ? t.attributes?.friendly_name || e || t.entity_id : e || "";
}
function cn(t) {
  if (!t) return !1;
  const e = typeof t == "string" ? t : t.state;
  if (!e) return !1;
  const i = e.toLowerCase().trim();
  return i !== "unavailable" && i !== "unknown" && i !== "";
}
function rt(t) {
  return !cn(t);
}
function V(t, e) {
  if (!t) return "Unavailable";
  if (e?.formatEntityState)
    return e.formatEntityState(t);
  const i = t.state, r = t.attributes?.unit_of_measurement;
  return i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : i === "on" ? "On" : i === "off" ? "Off" : r ? `${i} ${r}` : i.charAt(0).toUpperCase() + i.slice(1);
}
function me(t) {
  if (!t) return !1;
  const e = t.state;
  if (e === "unavailable" || e === "unknown" || e === "off")
    return !1;
  switch (Z(t.entity_id)) {
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
function Jt(t, e) {
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
async function vi(t, e, i, r) {
  if (!e) return;
  const n = i?.action || "toggle";
  if (n === "none") return;
  if (i?.haptic && it(t, "haptic", i.haptic), i?.confirmation) {
    const a = i.confirmation.text || "Are you sure you want to proceed?";
    if (!window.confirm(a))
      return;
  }
  const s = i?.target?.entity_id || r;
  switch (n) {
    case "toggle": {
      if (!s) return;
      const a = Z(s), c = a === "lock" ? "lock" : "toggle";
      await e.callService(a, c, void 0, {
        entity_id: s
      });
      break;
    }
    case "more-info": {
      if (!s) return;
      it(t, "hass-more-info", { entityId: s });
      break;
    }
    case "call-service": {
      if (!i?.service) return;
      const [a, c] = i.service.split(".");
      a && c && await e.callService(
        a,
        c,
        i.service_data,
        i.target || (s ? { entity_id: s } : void 0)
      );
      break;
    }
    case "navigate": {
      i?.navigation_path && (window.history.pushState(null, "", i.navigation_path), it(window, "location-changed", { replace: !1 }));
      break;
    }
    case "url": {
      i?.url_path && window.open(i.url_path, "_blank");
      break;
    }
    case "assist": {
      it(t, "start-voice-assist");
      break;
    }
  }
}
var bs = Object.defineProperty, er = (t, e, i, r) => {
  for (var n = void 0, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(e, i, n) || n);
  return n && bs(e, i, n), n;
};
class A extends ht {
  constructor() {
    super(...arguments), this._cardError = null, this._lifecycle = ps(this);
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
    return Ue(e);
  }
  toText(e) {
    return Gr(e);
  }
  moreInfo(e) {
    Hn(this, e);
  }
  navigate(e) {
    Kr(e);
  }
  fire(e, i) {
    return it(this, e, i);
  }
  formatNum(e, i) {
    return Rt(this.hass, e, i);
  }
  fmtPower(e, i) {
    return et(this.hass, e, i);
  }
  fmtEnergy(e) {
    return pt(this.hass, e);
  }
  fmtDate(e, i) {
    return hi(this.hass, e, i);
  }
  fmtTime(e, i) {
    return Be(this.hass, e, i);
  }
  fmtCalendarDay(e, i) {
    return ui(this.hass, e, i);
  }
  renderError(e) {
    return o`
      <ha-card class="error-card">
        <div
          style="padding: 16px; color: var(--error-color, #db4437); font-size: 13px; font-weight: 500;"
        >
          ⚠️ ${Ue(e)}
        </div>
      </ha-card>
    `;
  }
}
er([
  Zt({ attribute: !1 })
], A.prototype, "hass");
er([
  y()
], A.prototype, "_config");
er([
  y()
], A.prototype, "_cardError");
class bi extends A {
  validateConfig(e) {
  }
  setConfig(e) {
    super.setConfig(e), this.validateConfig(e);
  }
  fireConfigChanged() {
    this.fire("config-changed", { config: this._config });
  }
}
const ys = /* @__PURE__ */ new Set([
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
]), xs = /* @__PURE__ */ new Set([
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
]), ws = /\b(battery|battery_level|battery_low|battery_state|link_?quality|rssi|signal_strength|lqi|voltage|temp(erature)?_offset|humidity_offset|calibration_offset|firmware|firmware_version|ip_address|mac_address|device_temp(erature)?|cpu_temp(erature)?|ping|keep_alive|reporting_interval|uptime|free_heap|wifi_signal|compressor_speed|compressor_frequency|defrost_mode)\b/i, $s = /* @__PURE__ */ new Set([
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
]), ir = (t, e) => {
  if (!t?.entity_id) return !1;
  if (t.entity_category === "diagnostic" || t.entity_category === "config")
    return !0;
  const i = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  if (ys.has(i))
    return !0;
  const r = `${t.entity_id} ${t.name || ""} ${t.original_name || ""} ${e?.attributes?.friendly_name || ""}`.toLowerCase();
  return ws.test(r);
}, fl = (t, e) => {
  if (!t?.entity_id || D(t.entity_id) !== "sensor") return !1;
  const r = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  return xs.has(r) || !!e?.attributes?.unit_of_measurement;
}, Or = (t, e) => {
  if (!t?.entity_id || t.disabled_by || t.hidden_by || ir(t, e)) return !1;
  const i = D(t.entity_id);
  return !!($s.has(i) || i === "binary_sensor" && e?.attributes?.device_class === "garage_door");
}, ks = (t, e) => {
  if (!e || ir(t, e)) return !1;
  const i = D(t.entity_id), r = String(e.state).toLowerCase(), n = e.attributes || {};
  if (["light", "fan", "switch", "input_boolean"].includes(i))
    return r === "on";
  if (i === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(r)) return !0;
    if (r === "idle") {
      const s = String(n.media_title || n.app_name || "").trim();
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
    const s = String(n.device_class || "").toLowerCase();
    return r === "on" && /^(door|window|garage_door|smoke|moisture|gas|motion|occupancy|presence)$/.test(
      s
    );
  }
  return !1;
}, Tt = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), Pr = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Split System", Hr = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Cs = (t, e, i, r) => {
  if (D(t?.entity_id) !== "climate") return null;
  const n = /* @__PURE__ */ new Set();
  if (n.add(t.entity_id), t.device_id && i?.byDevice) {
    const v = i.byDevice.get(t.device_id) || [];
    for (const $ of v)
      n.add($.entity_id);
  }
  const s = Hr(t, i), a = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], c = s ? (i?.entities || []).filter(
    (v) => Hr(v, i) === s
  ) : [], l = (i?.entities || []).filter(
    (v) => ["timer", "script", "scene"].includes(D(v?.entity_id))
  ), h = [
    ...new Map(
      [...a, ...c, ...l].map((v) => [
        v.entity_id,
        v
      ])
    ).values()
  ].filter((v) => r?.states?.[v.entity_id]), f = Tt(t, r).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((v) => v.length > 2), g = (v) => {
    const $ = Tt(v, r);
    return !!(t.device_id && v.device_id === t.device_id) || f.length > 0 && f.some((b) => $.includes(b));
  }, d = (v) => {
    const $ = h.filter(
      (b) => D(b.entity_id) === "select" && Tt(b, r).includes(v) && /(vane|swing)/.test(Tt(b, r)) && g(b)
    );
    return $.length === 1 ? $[0].entity_id : null;
  }, u = d("vertical"), p = d("horizontal");
  u && n.add(u), p && n.add(p);
  const _ = h.find(
    (v) => D(v.entity_id) === "timer" && g(v) && /(split|climate|air.?con|hvac|timer)/.test(
      Tt(v, r)
    )
  )?.entity_id || null;
  _ && n.add(_);
  const m = h.filter(
    (v) => ["script", "scene"].includes(D(v.entity_id)) && g(v) && /(split|climate|air.?con|hvac)/.test(Tt(v, r))
  ).map((v) => (n.add(v.entity_id), {
    entity: v.entity_id,
    name: Pr(r, v, r?.states?.[v.entity_id])
  }));
  return {
    cardConfig: {
      type: "custom:component-split-controller-v4",
      entity: t.entity_id,
      title: Pr(r, t, e),
      vertical_vane_entity: u,
      horizontal_vane_entity: p,
      timer_entity: _,
      profile_entities: m
    },
    claimedEntityIds: n
  };
}, Ss = (t, e, i, r) => {
  if (t?.platform !== "wled" || D(t.entity_id) !== "light")
    return null;
  const n = String(
    t.original_name || t.name || t.entity_id || ""
  ).toLowerCase();
  if (/_\d+$/.test(String(t.unique_id || "")) && n !== "main")
    return null;
  const a = /* @__PURE__ */ new Set();
  if (a.add(t.entity_id), t.device_id && i?.byDevice) {
    const c = i.byDevice.get(t.device_id) || [];
    for (const l of c)
      a.add(l.entity_id);
  }
  return {
    cardConfig: {
      type: "custom:component-wled-controller-v1",
      entity: t.entity_id,
      device_id: t.device_id
    },
    claimedEntityIds: a
  };
}, As = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), Es = (t, e, i, r) => {
  const n = D(t.entity_id), s = n === "binary_sensor" && e?.attributes?.device_class === "garage_door", a = n === "cover" && (/garage/i.test(t.entity_id) || /garage/i.test(e?.attributes?.friendly_name || "") || e?.attributes?.device_class === "garage");
  if (!s && !a)
    return null;
  const c = /* @__PURE__ */ new Set();
  c.add(t.entity_id);
  let l = null;
  if (t.device_id && i?.byDevice) {
    const d = (i.byDevice.get(t.device_id) || []).filter(
      (u) => D(u?.entity_id) === "button" && r?.states?.[u.entity_id] && String(r.states[u.entity_id].state).toLowerCase() !== "unavailable"
    ).filter(
      (u) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
        As(u)
      )
    );
    d.length === 1 && (l = d[0].entity_id, c.add(l));
  }
  const h = (t.name || t.original_name || e?.attributes?.friendly_name || "Garage Door").replace(/ Garage Door Status$/i, "");
  return {
    cardConfig: {
      type: "custom:component-garage-door-controller-v1",
      entity: t.entity_id,
      control_entity: l || void 0,
      title: h
    },
    claimedEntityIds: c
  };
}, zs = (t, e, i, r) => {
  if (D(t?.entity_id) !== "media_player" || t?.platform !== "apple_tv")
    return null;
  const n = /* @__PURE__ */ new Set();
  if (n.add(t.entity_id), t.device_id && i?.byDevice) {
    const a = i.byDevice.get(t.device_id) || [];
    for (const c of a)
      n.add(c.entity_id);
  }
  const s = t.name || t.original_name || e?.attributes?.friendly_name || "Apple TV";
  return {
    cardConfig: {
      type: "custom:component-apple-tv-controller-v1",
      entity: t.entity_id,
      title: s,
      icon: "mdi:apple"
    },
    claimedEntityIds: n
  };
}, Ts = (t, e, i, r) => {
  if (D(t?.entity_id) !== "camera")
    return null;
  const n = `${t.entity_id} ${t.name || t.original_name || ""}`;
  if (/sub.?stream/i.test(n))
    return null;
  const s = /* @__PURE__ */ new Set();
  if (s.add(t.entity_id), t.device_id && i?.byDevice) {
    const c = i.byDevice.get(t.device_id) || [];
    for (const l of c)
      s.add(l.entity_id);
  }
  const a = t.name || t.original_name || e?.attributes?.friendly_name || "Camera";
  return {
    cardConfig: {
      type: "custom:component-camera-controller-v1",
      entity: t.entity_id,
      title: a,
      device_id: t.device_id
    },
    claimedEntityIds: s
  };
}, je = [], gl = (t) => {
  if (typeof t != "function")
    throw new TypeError("Device resolvers must be functions");
  return je.push(t), () => {
    const e = je.indexOf(t);
    e >= 0 && je.splice(e, 1);
  };
}, Ds = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", Nr = (t, e, i, r) => {
  for (const d of je) {
    const u = d(t, e, i, r);
    if (u) return u;
  }
  const n = Cs(t, e, i, r);
  if (n) return n;
  const s = Ss(t, e, i);
  if (s) return s;
  const a = Es(t, e, i, r);
  if (a) return a;
  const c = zs(t, e, i);
  if (c) return c;
  const l = Ts(t, e, i);
  if (l) return l;
  const h = t.entity_id, f = D(h), g = Ds(r, t, e);
  return f === "media_player" ? {
    cardConfig: {
      type: "custom:component-media-row-v2",
      entity: h,
      title: g
    },
    claimedEntityIds: /* @__PURE__ */ new Set([h])
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
      entity: h,
      title: g,
      name: g
    },
    claimedEntityIds: /* @__PURE__ */ new Set([h])
  } : null;
}, Rr = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Ir = (t, e) => {
  const i = e?.entity_id ? t?.states?.[e.entity_id] : void 0;
  return e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control";
}, Ri = (t, e, i = {}) => {
  if (!t?.states) return [];
  const r = i.mode || "all", n = i.area_id, s = new Set(i.exclude_device_names || []), a = new Map(
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
    const p = t.states[u.entity_id];
    return !(!p || u.device_id && s.has(a.get(u.device_id) || "") || ir(u, p));
  }), h = /* @__PURE__ */ new Set(), f = [];
  for (const u of l) {
    const p = D(u.entity_id), _ = Rr(u, e);
    if (!(r === "area" && n && _ !== n) && [
      "climate",
      "media_player",
      "camera",
      "binary_sensor",
      "cover",
      "light"
    ].includes(p)) {
      const m = t.states[u.entity_id], v = Nr(u, m, e, t);
      if (v && v.cardConfig.type !== "custom:component-control-row-v2" && v.cardConfig.type !== "custom:component-media-row-v2") {
        for (const $ of v.claimedEntityIds)
          h.add($);
        f.push({
          entityId: u.entity_id,
          entry: u,
          cardConfig: v.cardConfig
        });
      }
    }
  }
  for (const u of l) {
    if (h.has(u.entity_id))
      continue;
    const p = t.states[u.entity_id], _ = D(u.entity_id), m = Rr(u, e);
    if (r === "area") {
      if (m !== n || !Or(u, p)) continue;
    } else if (r === "media") {
      if (_ !== "media_player") continue;
    } else if (r === "sound") {
      if (!["switch", "number", "select"].includes(_)) continue;
    } else if (!Or(u, p)) continue;
    const v = Nr(u, p, e, t);
    v && f.push({
      entityId: u.entity_id,
      entry: u,
      cardConfig: v.cardConfig
    });
  }
  const g = r === "active" ? f.filter((u) => {
    const p = t.states[u.entityId];
    return ks(u.entry, p);
  }) : f;
  return g.sort(
    (u, p) => Ir(t, u.entry).localeCompare(
      Ir(t, p.entry),
      void 0,
      { sensitivity: "base" }
    )
  ), bn(
    g.map((u) => ({ id: u.entityId, card: u })),
    i.prefs
  ).visible.map((u) => ({
    entityId: u.id,
    cardConfig: u.card.cardConfig,
    signature: JSON.stringify(u.card.cardConfig)
  }));
};
class Os {
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
    ]).then((r) => () => r.forEach((n) => n?.()));
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
    ]).then(([n, s, a, c]) => {
      const l = Array.isArray(n) ? n : [], h = Array.isArray(s) ? s : [], f = Array.isArray(a) ? a : [], g = Array.isArray(c) ? c : [], d = new Map(
        h.map((_) => [_.id, _.area_id || null])
      ), u = /* @__PURE__ */ new Map();
      for (const _ of f) {
        if (!_?.device_id) continue;
        const m = u.get(_.device_id) || [];
        m.push(_), u.set(_.device_id, m);
      }
      const p = new Map(
        l.map((_) => [_.area_id, _])
      );
      return this._data = {
        areas: l,
        devices: h,
        entities: f,
        dashboards: g,
        deviceArea: d,
        byDevice: u,
        areaMap: p
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
    let n;
    return n = Promise.resolve(r).then((s) => {
      if (this._hass === e)
        for (const a of [...this._subs])
          try {
            a(s);
          } catch {
          }
      return s;
    }).finally(() => {
      this._refreshPromise === n && (this._refreshPromise = null, this._refreshQueued && (this._refreshQueued = !1, this.refresh()));
    }), this._refreshPromise = n, n;
  }
  subscribe(e, i) {
    this.attach(e);
    const r = this._subs.size === 0;
    return this._subs.add(i), r && this.listen(), this.load(e).then(i), () => {
      this._subs.delete(i), this._subs.size === 0 && this.detach();
    };
  }
}
const R = new Os(), ce = [], ln = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard entry filters must be functions");
  return ce.push(t), () => {
    const e = ce.indexOf(t);
    e >= 0 && ce.splice(e, 1);
  };
}, dn = (t, e) => {
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
}, yi = (t, e) => !!(t?.entity_id && !t.disabled_by && !t.hidden_by && !["diagnostic", "config"].includes(t.entity_category || "") && !dn(t, e) && ce.every((i) => i(t))), Q = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", Nt = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Dt = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), pn = (t, e, i, r) => {
  if (D(t?.entity_id) !== "climate") return null;
  const n = Nt(t, i), s = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], a = n ? (i?.entities || []).filter(
    (p) => Nt(p, i) === n
  ) : [], c = (i?.entities || []).filter(
    (p) => ["timer", "script", "scene"].includes(D(p?.entity_id))
  ), l = [
    ...new Map(
      [...s, ...a, ...c].map((p) => [
        p.entity_id,
        p
      ])
    ).values()
  ].filter((p) => r?.states?.[p.entity_id]), h = Dt(t, r).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((p) => p.length > 2), f = (p) => {
    const _ = Dt(p, r);
    return !!(t.device_id && p.device_id === t.device_id) || h.some((m) => _.includes(m));
  }, g = (p) => {
    const _ = l.filter(
      (m) => D(m.entity_id) === "select" && Dt(m, r).includes(p) && /(vane|swing)/.test(Dt(m, r)) && f(m)
    );
    return _.length === 1 ? _[0].entity_id : null;
  }, d = l.find(
    (p) => D(p.entity_id) === "timer" && f(p) && /(split|climate|air.?con|hvac|timer)/.test(
      Dt(p, r)
    )
  )?.entity_id || null, u = l.filter(
    (p) => ["script", "scene"].includes(D(p.entity_id)) && f(p) && /(split|climate|air.?con|hvac)/.test(Dt(p, r))
  ).map((p) => ({
    entity: p.entity_id,
    name: Q(r, p, r?.states?.[p.entity_id])
  }));
  return {
    type: "custom:component-split-controller-v4",
    entity: t.entity_id,
    title: Q(r, t, e),
    vertical_vane_entity: g("vertical"),
    horizontal_vane_entity: g("horizontal"),
    timer_entity: d,
    profile_entities: u
  };
}, Ps = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), hn = (t, e, i) => {
  if (!t?.device_id) return null;
  const n = (e?.byDevice?.get(t.device_id) || []).filter(
    (s) => D(s?.entity_id) === "button" && yi(s) && i?.states?.[s.entity_id] && String(i.states[s.entity_id].state).toLowerCase() !== "unavailable"
  ).filter(
    (s) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
      Ps(s)
    )
  );
  return n.length === 1 ? n[0].entity_id : null;
}, un = (t, e, i, r) => D(t?.entity_id) === "media_player" && t?.platform === "apple_tv" ? {
  type: "custom:component-apple-tv-controller-v1",
  entity: t.entity_id,
  title: Q(r, t, e),
  icon: "mdi:apple"
} : null, mn = /* @__PURE__ */ new Set([
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
]), Hs = (t, e) => yi(t, e) && (mn.has(D(t.entity_id)) || D(t.entity_id) === "binary_sensor" && e?.attributes?.device_class === "garage_door"), Ns = (t, e) => {
  if (!yi(t, e) || !e) return !1;
  const i = D(t.entity_id), r = e.state, n = e.attributes || {};
  if (["light", "fan", "switch", "input_boolean"].includes(i))
    return r === "on";
  if (i === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(r)) return !0;
    if (r === "idle") {
      const s = String(n.media_title || n.app_name || "");
      return !!(s && !/^(idle|home(?: screen)?|default media receiver)$/i.test(s));
    }
    return !1;
  }
  return i === "climate" ? /^(heat|cool|heat_cool|auto|dry|fan_only)$/.test(r) : i === "cover" ? /^(open|opening|closing)$/.test(r) : i === "lock" ? r === "unlocked" : i === "vacuum" ? /^(cleaning|returning)$/.test(r) : i === "binary_sensor" ? r === "on" && /^(door|window|garage_door|smoke|moisture|gas)$/.test(
    n.device_class || ""
  ) : !1;
}, le = [], fn = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard control resolvers must be functions");
  return le.push(t), () => {
    const e = le.indexOf(t);
    e >= 0 && le.splice(e, 1);
  };
}, gn = (t, e, i, r) => {
  const n = t.entity_id, s = D(n);
  if (s === "climate")
    return pn(t, e, i, r) || {
      type: "custom:component-split-controller-v4",
      entity: n,
      title: Q(r, t, e)
    };
  if (s === "binary_sensor" && e?.attributes?.device_class === "garage_door") {
    const a = hn(t, i, r);
    return a ? {
      type: "custom:component-garage-door-controller-v1",
      title: Q(r, t, e).replace(
        / Garage Door Status$/i,
        ""
      ),
      entity: n,
      control_entity: a
    } : {
      type: "custom:component-control-row-v2",
      entity: n,
      title: Q(r, t, e)
    };
  }
  return s === "media_player" ? un(t, e, i, r) || {
    type: "custom:component-media-row-v2",
    entity: n,
    title: Q(r, t, e)
  } : s === "camera" ? {
    type: "custom:component-camera-controller-v1",
    entity: n,
    title: Q(r, t, e),
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
    entity: n,
    title: Q(r, t, e),
    name: Q(r, t, e)
  } : null;
}, Rs = (t, e, i, r) => {
  for (const n of le) {
    const s = n(t, e, i, r);
    if (s) return s;
  }
  return gn(t, e, i, r);
}, _n = async (t, e) => {
  if (!t || !e) return { order: [], hidden: [] };
  try {
    return (await t.callWS({
      type: "frontend/get_user_data",
      key: e
    }))?.value || { order: [], hidden: [] };
  } catch {
    return { order: [], hidden: [] };
  }
}, vn = (t, e, i) => t.callWS({ type: "frontend/set_user_data", key: e, value: i }), bn = (t, e) => {
  const i = new Map(t.map((a) => [a.id, a])), r = /* @__PURE__ */ new Set(), n = [];
  for (const a of e?.order || []) {
    const c = i.get(a);
    c && (n.push(c), r.add(a));
  }
  for (const a of t)
    r.has(a.id) || n.push(a);
  const s = new Set(e?.hidden || []);
  return { all: n, visible: n.filter((a) => !s.has(a.id)), hidden: s };
}, yn = async (t, e) => {
  const i = String(t?.type || ""), r = i.startsWith("custom:") ? i.slice(7) : i;
  let n;
  if (customElements.get(r))
    n = document.createElement(r);
  else {
    const s = globalThis.loadCardHelpers || (typeof window < "u" ? window.loadCardHelpers : void 0);
    if (typeof s == "function")
      try {
        const h = (await s()).createCardElement(t);
        return e && (h.hass = e), h;
      } catch {
      }
    const a = t?.entity || "";
    D(a) === "media_player" ? n = document.createElement("component-media-row-v2") : n = document.createElement("component-control-row-v2");
  }
  if (typeof n.setConfig == "function")
    try {
      n.setConfig(t);
    } catch {
    }
  return e && (n.hass = e), n;
};
globalThis.__homeDashboardV2 ??= {};
const M = globalThis.__homeDashboardV2;
M.REG = R;
M.entryFilters = ce;
M.registerEntryFilter = ln;
M.uiEntry = yi;
M.stateName = Q;
M.areaOf = Nt;
M.domain = D;
M.controlResolvers = le;
M.registerControlResolver = fn;
M.nativeClimateControlConfig = pn;
M.garageControl = hn;
M.appleTvBundle = un;
M.controlConfig = Rs;
M.defaultControlConfig = gn;
M.controlDomains = mn;
M.isPotential = Hs;
M.isActive = Ns;
M.isPeripheral = dn;
M.prefs = _n;
M.savePrefs = vn;
M.applyPrefs = bn;
M.card = yn;
M.discoverControls = Ri;
const Lr = /* @__PURE__ */ new WeakMap(), _l = async (t) => {
  if (!t || !t.sendMessagePromise)
    return { areas: [], devices: [], entities: [] };
  const e = await R.load({ connection: t });
  let i = Lr.get(e);
  return i || (i = {
    areas: e.areas,
    devices: e.devices,
    entities: e.entities
  }, Lr.set(e, i)), i;
}, vl = async (t, e = !1) => R.load(t, e), Is = /(_controller_temperature|_outside_air_temperature|cpu_temperature|processor_temperature|board_temperature|chip_temperature|internal_temperature)$/i;
function xn(t, e, i) {
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
  const n = (e?.entities || []).filter((_) => (_.area_id || (_.device_id ? e?.deviceArea?.get(_.device_id) : null)) === t.area_id), s = [];
  for (const _ of n) {
    const m = i.states[_.entity_id];
    m && cn(m) && s.push(m);
  }
  let a = 0, c = "", l = "", h = !1, f = !1;
  const g = s.find(
    (_) => _.entity_id.startsWith("climate.") && _.attributes && !Number.isNaN(
      Number.parseFloat(String(_.attributes.current_temperature ?? ""))
    )
  );
  if (g && g.attributes?.current_temperature !== void 0) {
    const _ = Number.parseFloat(
      String(g.attributes.current_temperature)
    ), m = g.attributes.temperature_unit || i.config?.unit_system?.temperature || "°C";
    c = `${_.toFixed(1)} ${m}`;
  } else {
    const _ = s.find(
      (m) => m.entity_id.startsWith("sensor.") && (m.attributes?.device_class === "temperature" || m.attributes?.unit_of_measurement && /°[CF]/i.test(m.attributes.unit_of_measurement)) && !Is.test(m.entity_id) && !Number.isNaN(Number.parseFloat(String(m.state ?? "")))
    );
    if (_) {
      const m = Number.parseFloat(String(_.state)), v = _.attributes?.unit_of_measurement || i.config?.unit_system?.temperature || "°C";
      c = `${m.toFixed(1)} ${v}`;
    }
  }
  const d = s.find(
    (_) => _.entity_id.startsWith("sensor.") && _.attributes?.device_class === "humidity" && !Number.isNaN(Number.parseFloat(String(_.state ?? "")))
  );
  d && (l = V(d, i));
  for (const _ of s) {
    _.entity_id.startsWith("light.") && _.state === "on" && a++;
    const m = _.attributes?.device_class || "";
    _.entity_id.startsWith("binary_sensor.") && _.state === "on" && ["smoke", "moisture", "gas"].includes(m) && (h = !0), (_.entity_id.startsWith("binary_sensor.") && _.state === "on" && m === "garage_door" || _.entity_id.startsWith("cover.") && ["open", "opening"].includes(_.state) && m === "garage") && (f = !0);
  }
  const u = a > 0 || s.some(
    (_) => _.entity_id.startsWith("climate.") && ["heating", "cooling", "drying", "fan"].includes(
      _.attributes?.hvac_action || ""
    ) || _.entity_id.startsWith("media_player.") && _.state === "playing"
  ), p = [];
  return h ? p.push("Attention required") : f && p.push("Garage open"), c && p.push(c), l && !c && p.push(l), a > 0 && p.push(`${a} light${a === 1 ? "" : "s"} on`), {
    summary: p.slice(0, 3).join(" · "),
    severity: h ? "critical" : f ? "warning" : u ? "active" : "",
    lightsOn: a,
    temperatureText: c,
    humidityText: l,
    hasCritical: h,
    hasWarning: f
  };
}
const zi = /* @__PURE__ */ new WeakMap();
let Ls = 1;
const rr = (t) => {
  const e = t?.connection;
  return e ? (zi.has(e) || zi.set(e, Ls++), zi.get(e)) : "none";
}, Pt = (t, e, i) => `${rr(t)}|${e}|${i}`, Ti = /* @__PURE__ */ new WeakMap(), Mr = (t) => {
  const e = t?.connection;
  if (!e?.subscribeEvents || Ti.has(e))
    return;
  const i = e.subscribeEvents((r) => {
    const n = /^dashboard-profile\.(energy|security)\.([a-z0-9-]+)$/.exec(
      String(r?.data?.key || "")
    );
    n && (Ht.invalidate(Pt(t, n[1], n[2])), window.dispatchEvent(
      new CustomEvent("ha-component-profile-change", {
        detail: { kind: n[1], profileId: n[2] }
      })
    ));
  }, "ha_component_backend_preferences_updated");
  Ti.set(e, i), Promise.resolve(i).catch(
    () => Ti.delete(e)
  );
}, Ht = en(
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
), Ms = Object.freeze({
  async get(t, e, i, r = {}) {
    Mr(t);
    const n = Pt(t, e, i);
    return Ht.read(n, { hass: t, kind: e, profileId: i }, r);
  },
  invalidate(t, e, i) {
    Ht.invalidate(Pt(t, e, i));
  },
  peek(t, e, i) {
    return Ht.peek(Pt(t, e, i));
  },
  async save(t, e, i, r, n) {
    const s = {
      type: "ha_component_backend/profile/update",
      kind: e,
      profile_id: i,
      profile: r
    };
    Number.isFinite(Number(n)) && (s.expected_revision = Number(n));
    const a = await t.callWS(s);
    return Ht.invalidate(Pt(t, e, i)), a;
  },
  subscribe(t, e, i, r) {
    Mr(t);
    const n = Pt(t, e, i);
    return Ht.subscribe(n, r);
  }
}), Di = /* @__PURE__ */ new Map(), qr = (t) => String(t).padStart(2, "0"), fe = (t = /* @__PURE__ */ new Date()) => `${t.getFullYear()}-${qr(t.getMonth() + 1)}-${qr(t.getDate())}`, re = (t, e = /* @__PURE__ */ new Date()) => {
  const i = t?.config?.time_zone;
  if (!i) return fe(e);
  try {
    const r = Object.fromEntries(
      new Intl.DateTimeFormat("en-AU", {
        timeZone: i,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(e).map((n) => [n.type, n.value])
    );
    return `${r.year}-${r.month}-${r.day}`;
  } catch {
    return fe(e);
  }
}, wn = (t, e = fe()) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(t || ""));
  if (!i) return null;
  const r = new Date(
    Number(i[1]),
    Number(i[2]) - 1,
    Number(i[3])
  );
  return fe(r) !== t || t > e ? null : t;
}, Oi = (t = "energy-day") => {
  const e = String(t || "energy-day");
  if (!Di.has(e)) {
    let i = null;
    try {
      i = sessionStorage.getItem(`ha-component-library:${e}`);
    } catch {
    }
    const r = wn(i);
    Di.set(e, {
      value: r || fe(),
      usesDefault: !r,
      subscribers: /* @__PURE__ */ new Set()
    });
  }
  return Di.get(e);
}, L = Object.freeze({
  get(t = "energy-day", e) {
    const i = Oi(t);
    return i.usesDefault && (i.value = re(e)), i.value;
  },
  set(t = "energy-day", e, i = {}) {
    const r = Oi(t), n = re(i.hass), s = wn(e, n);
    if (!s || s === r.value) return r.value;
    r.value = s, r.usesDefault = !1;
    try {
      sessionStorage.setItem(`ha-component-library:${t}`, s);
    } catch {
    }
    const a = {
      channel: t,
      day: s,
      isToday: s === n
    };
    for (const c of [...r.subscribers]) c(a);
    return i.broadcast !== !1 && window.dispatchEvent(
      new CustomEvent("energy-day-selector-change", { detail: a })
    ), s;
  },
  subscribe(t = "energy-day", e, i = {}) {
    const r = Oi(t);
    return r.usesDefault && (r.value = re(i.hass)), r.subscribers.add(e), i.replay !== !1 && e({
      channel: t,
      day: r.value,
      isToday: r.value === re(i.hass)
    }), () => r.subscribers.delete(e);
  },
  today: re
}), Pi = /* @__PURE__ */ new Set(), Ne = (t, e, i) => `${rr(t)}|${e}|${i}`, ne = en(
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
), We = Object.freeze({
  async get(t, e, i, r = {}) {
    const n = Ne(t, e, i);
    return Pi.add(n), ne.read(n, { hass: t, profileId: e, day: i }, r);
  },
  invalidate(t, e, i) {
    ne.invalidate(Ne(t, e, i));
  },
  invalidateProfile(t, e) {
    const i = `${rr(t)}|${e}|`;
    for (const r of Pi)
      r.startsWith(i) && ne.invalidate(r);
  },
  peek(t, e, i) {
    return ne.peek(Ne(t, e, i));
  },
  subscribe(t, e, i, r) {
    const n = Ne(t, e, i);
    return Pi.add(n), ne.subscribe(n, r);
  }
}), Re = /* @__PURE__ */ new Set(["unknown", "unavailable"]), xi = (t) => [
  t?.translation_key,
  t?.unique_id,
  t?.entity_id,
  t?.platform
].filter(Boolean).join(" ").toLowerCase(), Ie = (t, e) => e?.name || e?.original_name || (e?.entity_id ? t?.states?.[e.entity_id]?.attributes?.friendly_name : "") || e?.entity_id || "Control", jr = (t) => {
  const e = xi(t);
  return /record/.test(e) ? "Recording" : /detect|motion/.test(e) ? "Detection" : /alert|notification/.test(e) ? "Alerts" : /audio|sound/.test(e) ? "Audio" : null;
}, qs = (t) => /(^|[_ :.-])(ptz|pan|tilt|zoom)([_ :.-]|$)/.test(
  xi(t)
), Le = (t) => {
  const e = xi(t);
  return /trigger|operate|open|close/.test(e) ? "operate" : /restart|reboot/.test(e) ? "restart" : "action";
}, js = (t, e, i = {}) => {
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
  const r = new Set(i.include_entities || []), n = new Set(i.exclude_entities || []), s = new Set(i.area_ids || []), a = (e?.entities || []).filter((m) => !m?.entity_id || m.disabled_by || m.hidden_by || !t?.states?.[m.entity_id] ? !1 : !n.has(m.entity_id)), c = a.filter((m) => {
    if (r.has(m.entity_id)) return !0;
    const v = Nt(m, e);
    return !s.size || (v ? s.has(v) : !1);
  }), l = c.filter(
    (m) => !m.disabled_by && !m.hidden_by
  ), h = new Set(
    c.map((m) => m.device_id || m.entity_id)
  ), f = /* @__PURE__ */ new Map();
  for (const m of a) {
    const v = m.device_id || m.entity_id, $ = f.get(v) || [];
    $.push(m), f.set(v, $);
  }
  const g = [];
  for (const [m, v] of f) {
    if (!h.has(m)) continue;
    const $ = v.filter(
      (T) => D(T.entity_id) === "camera" && !T.disabled_by && !T.hidden_by
    );
    if (!$.length) continue;
    $.sort((T, W) => {
      const lt = (gt) => {
        const ee = t.states[gt.entity_id];
        return (r.has(gt.entity_id) ? 100 : 0) + (ee?.attributes?.entity_picture ? 20 : 0) + (ee?.attributes?.frontend_stream_type ? 10 : 0);
      };
      return lt(W) - lt(T) || String(T.unique_id || T.entity_id).localeCompare(
        String(W.unique_id || W.entity_id)
      );
    });
    const b = $[0], z = t.states[b.entity_id], P = (e?.devices || []).find((T) => T.id === b.device_id) || {}, N = Nt(b, e), I = (N ? e?.areaMap?.get(N)?.name : "") || "", C = v.filter(
      (T) => D(T.entity_id) === "switch" && jr(T)
    ).map((T) => ({ entity: T, role: jr(T) })), O = v.filter((T) => {
      if (D(T.entity_id) !== "binary_sensor") return !1;
      const W = t.states[T.entity_id]?.attributes?.device_class || "";
      return /^(motion|occupancy|presence|sound)$/.test(W) || /detect|motion|person|human/.test(xi(T));
    }), F = v.filter((T) => D(T.entity_id) === "image").map((T) => {
      const W = Ie(t, T), lt = String(
        P.name_by_user || P.name || ""
      ).trim(), gt = lt && W.toLowerCase().startsWith(`${lt.toLowerCase()} `) ? W.slice(lt.length).trim() : W;
      return { entity: T, name: gt };
    }), H = v.filter(
      (T) => D(T.entity_id) === "button" && Le(T) !== "action"
    ).map((T) => ({ entity: T, role: Le(T) })), U = v.filter(
      (T) => ["button", "number", "select"].includes(D(T.entity_id)) && qs(T)
    ), B = i.mappings?.[`camera_stream:${b.entity_id}`] || i.mappings?.[`camera_stream:${m}`] || null, At = B ? t.states[B] : null, Et = (At && !Re.has(String(At.state).toLowerCase()) ? B : b.entity_id) || b.entity_id, Pe = !!(z && !Re.has(String(z.state).toLowerCase())), J = O.some(
      (T) => t.states[T.entity_id]?.state === "on"
    );
    g.push({
      id: m,
      deviceId: b.device_id || null,
      entityId: b.entity_id,
      entities: $.map((T) => T.entity_id),
      name: String(P.name_by_user || P.name || "").trim() || I || Ie(t, b),
      areaId: N,
      areaName: I,
      online: Pe,
      active: J,
      streamEntityId: Et,
      switches: C,
      detections: O,
      classifications: F,
      actions: H,
      ptz: U
    });
  }
  g.sort(
    (m, v) => m.name.localeCompare(v.name, void 0, { sensitivity: "base" })
  );
  const d = [];
  for (const m of l) {
    const v = D(m.entity_id), $ = t.states[m.entity_id], b = $?.attributes?.device_class || "";
    if (!(v === "binary_sensor" && /^(door|window|garage_door|opening)$/.test(b) || v === "lock" || v === "cover" && /^(door|garage)$/.test(b))) continue;
    const N = m.device_id ? f.get(m.device_id) || [] : [], C = i.mappings?.[`entry_control:${m.entity_id}`] || N.filter((F) => D(F.entity_id) === "button").sort(
      (F, H) => (Le(F) === "operate" ? -1 : 1) - (Le(H) === "operate" ? -1 : 1)
    )[0]?.entity_id || null, O = v === "lock" ? $.state === "unlocked" : /^(on|open|opening)$/.test($.state);
    d.push({
      entityId: m.entity_id,
      deviceId: m.device_id || null,
      controlEntityId: C,
      domain: v,
      deviceClass: b,
      name: Ie(t, m),
      state: $.state,
      open: O,
      available: !Re.has(String($.state).toLowerCase()),
      areaId: Nt(m, e)
    });
  }
  d.sort(
    (m, v) => m.name.localeCompare(v.name, void 0, { sensitivity: "base" })
  );
  const u = /* @__PURE__ */ new Map([
    ["automation", "trigger"],
    ["scene", "turn_on"],
    ["script", "turn_on"]
  ]), p = Object.entries(
    i.mappings || {}
  ).flatMap(([m, v]) => {
    if (!m.startsWith("quick_action:")) return [];
    const $ = D(v), b = u.get($), z = t?.states?.[v];
    if (!b || !z) return [];
    const P = (e?.entities || []).find(
      (N) => N.entity_id === v
    ) || {
      entity_id: v
    };
    return [
      {
        id: m.slice(13),
        entityId: v,
        domain: $,
        service: b,
        name: Ie(t, P),
        icon: z.attributes?.icon || ($ === "script" ? "mdi:script-text-outline" : $ === "scene" ? "mdi:palette-outline" : "mdi:robot-outline"),
        available: !Re.has(String(z.state).toLowerCase())
      }
    ];
  });
  p.sort(
    (m, v) => m.name.localeCompare(v.name, void 0, { sensitivity: "base" })
  );
  const _ = [
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
    quickActions: p,
    attention: _,
    allClear: _.length === 0,
    onlineCameras: g.filter((m) => m.online).length
  };
}, Ae = async (t, e = "household-security", i = {}) => {
  const [r, n] = await Promise.all([
    Ms.get(t, "security", e, i).catch((a) => ({ found: !1, profile: null, error: a })),
    R.load(t)
  ]);
  return r?.found ? {
    ...js(t, n, r.profile || {}),
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
}, Hi = D, Ur = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]), $n = (t) => String(
  t?.original_name || t?.name || t?.entity_id || ""
).toLowerCase();
let Br = !1;
const Us = () => {
  Br || (Br = !0, ln((t) => t?.platform !== "wled" ? !0 : D(t.entity_id) !== "light" ? !1 : $n(t) === "main" || !/_\d+$/.test(String(t.unique_id || ""))), fn((t) => t?.platform !== "wled" || D(t.entity_id) !== "light" ? null : {
    type: "custom:component-wled-controller-v1",
    entity: t.entity_id,
    device_id: t.device_id
  }), R.refresh());
};
Us();
const Bs = [
  ct,
  x`
    .wrap {
      padding: 8px 11px;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
      min-height: 48px;
    }
    .icon {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border-radius: 6px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    ha-icon {
      --mdc-icon-size: 16px;
    }
    .title {
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .desc {
      margin-top: 2px;
      font-size: 10px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .action {
      min-height: 28px;
      padding: 0 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      background: var(--secondary-background-color);
      color: var(--primary-color);
      font-size: 10.5px;
      font-weight: 500;
      white-space: nowrap;
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
var Fs = Object.getOwnPropertyDescriptor, Vs = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Fs(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const Ws = {
  type: "custom:component-action-v2",
  title: "Action title",
  description: "What this action will do",
  action_text: "Open",
  icon: "mdi:gesture-tap-button",
  navigation_path: null,
  entity: null,
  more_info_entity: null
};
let Ge = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Ws, ...t });
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
Ge.styles = Bs;
Ge = Vs([
  k("component-action-v2")
], Ge);
E({
  type: "component-action-v2",
  element: Ge,
  name: "Action Card",
  description: "Reusable navigation and more-info action card."
});
const Gs = x`
  :host {
    display: block;
    min-width: 0;
  }
  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
  }
  button {
    appearance: none;
    width: 100%;
    min-height: 34px;
    box-sizing: border-box;
    border: 0;
    background: transparent;
    font: inherit;
    padding: 8px 11px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-size: 11px;
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
    border-radius: var(--ha-card-border-radius, 12px);
  }
  .phase {
    color: var(--primary-text-color);
    font-weight: 500;
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
    font-weight: 500;
  }
  .val {
    font-weight: 600;
    color: var(--primary-text-color);
  }
  @media (max-width: 900px) {
    button {
      gap: 10px;
      padding: 11px 12px;
      font-size: 11px;
    }
    .mid {
      gap: 10px;
    }
    .item {
      gap: 3px;
    }
  }
  @media (max-width: 650px) {
    button {
      font-size: 11px;
      gap: 6px;
      padding: 10px;
    }
    .mid {
      gap: 7px;
    }
  }
  .context-static {
    width: 100%;
    min-height: 44px;
    box-sizing: border-box;
    padding: 12px 14px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 16px;
    font-size: 11.5px;
    line-height: 1.3;
    white-space: nowrap;
    overflow: hidden;
  }
  @media (max-width: 900px) {
    .context-static {
      gap: 10px;
      padding: 11px 12px;
      font-size: 11px;
    }
  }
  @media (max-width: 650px) {
    .context-static {
      font-size: 11px;
      gap: 6px;
      padding: 10px;
    }
  }
`;
var Ks = Object.getOwnPropertyDescriptor, Ys = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ks(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const Qs = {
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
let Ke = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Qs, ...t });
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
    const t = this._getAction(), e = [1, 2, 3].map((n) => {
      const s = this._config[`center_${n}_label`], a = this._config[`center_${n}_value`];
      return o`
        <span class="item">
          <span class="lab">${this.esc(s)}</span>
          <span class="val">${this.esc(a)}</span>
        </span>
      `;
    }), i = o`
      <span class="phase">${this.esc(this._config.left_text)}</span>
      <span class="mid">${e}</span>
      <span class="event">${this.esc(this._config.right_text)}</span>
    `, r = `${this._config.left_text || ""}. ${[1, 2, 3].map((n) => `${this._config[`center_${n}_label`] || ""}: ${this._config[`center_${n}_value`] || ""}`).join(", ")}. ${this._config.right_text || ""}`;
    return o`
      <ha-card>
        ${t ? o`<button type="button" aria-label="${this.esc(r)}">${i}</button>` : o`<div class="context-static" aria-label="${this.esc(r)}">${i}</div>`}
      </ha-card>
    `;
  }
};
Ke.styles = Gs;
Ke = Ys([
  k("component-context-strip-v3")
], Ke);
E({
  type: "component-context-strip-v3",
  element: Ke,
  name: "Context Strip",
  description: "Reusable context and metric strip component."
});
const Xs = [
  tr,
  x`
    .wrap {
      padding: 12px 14px;
      min-height: 72px;
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
      border-radius: 13px;
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
    }
    .desc {
      margin-top: 3px;
      font-size: 13px;
      line-height: 1.3;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
    }
  `
];
var Zs = Object.getOwnPropertyDescriptor, kn = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Zs(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const Js = {
  type: "custom:component-empty-state-v3",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let Ye = class extends A {
  setConfig(t) {
    super.setConfig({ ...Js, ...t });
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
Ye.styles = Xs;
Ye = kn([
  k("component-empty-state-v3")
], Ye);
E({
  type: "component-empty-state-v3",
  element: Ye,
  name: "Empty State",
  description: "Reusable empty-state component."
});
const ta = {
  type: "custom:component-empty-state-v2",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let Qe = class extends A {
  setConfig(t) {
    super.setConfig({ ...ta, ...t });
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
Qe.styles = [
  j,
  x`
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
Qe = kn([
  k("component-empty-state-v2")
], Qe);
E({
  type: "component-empty-state-v2",
  element: Qe,
  name: "Empty State V2",
  description: "Reusable compact empty-state component."
});
const ea = [
  ct,
  x`
    .wrap {
      padding: 2px 14px;
    }
    .row {
      appearance: none;
      width: 100%;
      border: 0;
      border-top: 1px solid var(--divider-color);
      background: transparent;
      color: inherit;
      font: inherit;
      min-height: 54px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 14px;
      padding: 0;
      text-align: left;
      cursor: pointer;
    }
    .row:first-child {
      border-top: 0;
    }
    .row:active {
      background: var(--secondary-background-color);
    }
    .row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: 8px;
    }
    .title {
      font-size: 12.5px;
      font-weight: 650;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .desc {
      margin-top: 2px;
      font-size: 10.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .metric {
      text-align: right;
      white-space: nowrap;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .metric b {
      font-size: 12px;
      font-weight: 650;
      color: var(--primary-text-color);
      margin-right: 4px;
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 2px 12px;
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
var ia = Object.getOwnPropertyDescriptor, ra = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ia(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const na = {
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
let Xe = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...na, ...t });
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
      const r = Number(i.dataset.index), n = t[r];
      if (n) {
        const s = this._getRowActions(n);
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
      const r = this._getRowActions(e), n = e.entity ? this.hass?.states[e.entity] : null, s = e.title || "Item", a = n && s.startsWith("Item") ? ft({ state: n }) : s, c = n && (e.value === "00" || !e.value) ? V(n, this.hass) : e.value || "", l = `${a}: ${c} ${e.label || ""}${e.description ? `. ${e.description}` : ""}`, h = o`
              <span>
                <div class="title">${this.esc(a)}</div>
                <div class="desc">${this.esc(e.description)}</div>
              </span>
              <span class="metric">
                <b>${this.esc(c)}</b>${this.esc(e.label)}
              </span>
            `;
      return r.primary ? o`
                  <button class="row" data-index="${i}" type="button" aria-label="${this.esc(l)}">
                    ${h}
                  </button>
                ` : o`<div class="row" data-index="${i}" aria-label="${this.esc(l)}">${h}</div>`;
    })}
        </div>
      </ha-card>
    `;
  }
};
Xe.styles = ea;
Xe = ra([
  k("component-list-v2")
], Xe);
E({
  type: "component-list-v2",
  element: Xe,
  name: "List / Ranking",
  description: "Reusable list and ranking component."
});
const sa = [
  ct,
  x`
    .wrap {
      padding: 8px 11px;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
      min-height: 48px;
    }
    .icon {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border-radius: 6px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    .warning .icon {
      color: var(--warning-color, var(--primary-color));
    }
    .error .icon {
      color: var(--error-color, var(--primary-color));
    }
    .success .icon {
      color: var(--success-color, var(--primary-color));
    }
    ha-icon {
      --mdc-icon-size: 16px;
    }
    .title {
      font-size: 12px;
      font-weight: 500;
    }
    .message {
      margin-top: 2px;
      font-size: 10px;
      line-height: 1.25;
      color: var(--secondary-text-color);
    }
    .wrap.actionable {
      cursor: pointer;
    }
    .wrap.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--ha-card-border-radius, 16px);
    }
  `
];
var aa = Object.getOwnPropertyDescriptor, oa = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? aa(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const ca = {
  type: "custom:component-notice-v2",
  title: "Notice title",
  message: "Important supporting information appears here.",
  tone: "info",
  icon: "mdi:information-outline",
  entity: null,
  navigation_path: null
};
let Ze = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...ca, ...t });
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
    ) ? this._config.tone : "", r = e && this._config.title === "Notice title" ? ft({ state: e }) : this._config.title || "Notice title", n = e && this._config.message === "Important supporting information appears here." ? V(e, this.hass) : this._config.message || "", s = `${r}${n ? `: ${n}` : ""}`;
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
            ${n ? o`<div class="message">${this.esc(n)}</div>` : ""}
          </div>
        </div>
      </ha-card>
    `;
  }
};
Ze.styles = sa;
Ze = oa([
  k("component-notice-v2")
], Ze);
E({
  type: "component-notice-v2",
  element: Ze,
  name: "Alert / Notice",
  description: "Reusable alert and notice component."
});
const la = [
  ct,
  x`
    .wrap {
      padding: 8px 11px;
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
      font-weight: 500;
      letter-spacing: -0.025em;
    }
    .label {
      margin-top: 2px;
      font-size: 10.5px;
      color: var(--secondary-text-color);
    }
    .target {
      text-align: right;
      font-size: 10.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .target b {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .track {
      height: 4px;
      margin-top: 8px;
      border-radius: 999px;
      background: var(--secondary-background-color);
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
      .value {
        font-size: 25px;
      }
      .target {
        font-size: 11px;
      }
    }
    .wrap.actionable {
      cursor: pointer;
    }
    .wrap.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--ha-card-border-radius, 16px);
    }
  `
];
var da = Object.getOwnPropertyDescriptor, pa = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? da(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const ha = {
  type: "custom:component-progress-v2",
  value: "68%",
  label: "Progress metric",
  progress: 68,
  target_value: "100%",
  target_label: "Target",
  entity: null,
  navigation_path: null
};
let Je = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...ha, ...t });
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
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e && this._config.label === "Progress metric" ? ft({ state: e }) : this._config.label || "Progress metric", r = e && this._config.value === "68%" ? V(e, this.hass) : this._config.value || "68%";
    let n = Math.min(100, Math.max(0, Number(this._config.progress) || 0));
    if (e && this._config.progress === 68) {
      const a = parseFloat(e.state);
      isNaN(a) || (n = Math.min(100, Math.max(0, a)));
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
            aria-valuenow="${n}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="${this.esc(i)}"
          >
            <div class="fill" style="width:${n}%"></div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
Je.styles = la;
Je = pa([
  k("component-progress-v2")
], Je);
E({
  type: "component-progress-v2",
  element: Je,
  name: "Progress / Target",
  description: "Reusable progress and target component."
});
const ua = [
  j,
  x`
    ha-card {
      background: transparent;
      border: 0;
      box-shadow: none;
    }
    .wrap {
      padding: 7px 2px 5px;
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--secondary-text-color);
    }
    .wrap ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 18px;
    }
    .label {
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .line {
      height: 1px;
      background: var(--divider-color);
      flex: 1;
    }
  `
];
var ma = Object.getOwnPropertyDescriptor, fa = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ma(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
let ti = class extends A {
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
ti.styles = ua;
ti = fa([
  k("component-section-separator-v2")
], ti);
E({
  type: "component-section-separator-v2",
  element: ti,
  name: "Section Separator",
  description: "Reusable section separator component."
});
const ga = [
  ct,
  x`
    .wrap {
      padding: 8px 11px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      min-height: 52px;
    }
    .value {
      font-size: 20px;
      line-height: 1;
      font-weight: 500;
      letter-spacing: -0.025em;
      white-space: nowrap;
    }
    .label {
      margin-top: 2px;
      font-size: 10.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support {
      text-align: right;
      font-size: 10.5px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support b {
      font-weight: 500;
      color: var(--primary-text-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
      .value {
        font-size: 25px;
      }
      .support {
        font-size: 11px;
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
var _a = Object.getOwnPropertyDescriptor, va = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? _a(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const ba = {
  type: "custom:component-single-kpi-v2",
  value: "00",
  label: "Primary metric",
  support_value: "00",
  support_label: "Supporting context",
  interactive: !0,
  entity: null,
  navigation_path: null
};
let ei = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...ba, ...t });
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
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e && this._config.value === "00" ? V(e, this.hass) : this._config.value || "00", r = e && this._config.label === "Primary metric" ? ft({ state: e }) : this._config.label || "Primary metric", n = this._config.support_value || "", s = this._config.support_label || "", a = `${r}: ${i}${n || s ? `. ${n} ${s}` : ""}`, c = o`
      <div class="wrap">
        <div>
          <div class="value">${this.esc(i)}</div>
          <div class="label">${this.esc(r)}</div>
        </div>
        ${n || s ? o`
                <div class="support">
                  <b>${this.esc(n)}</b>
                  ${this.esc(s)}
                </div>
              ` : ""}
      </div>
    `;
    return o`
      <ha-card>
        ${t ? o`<button class="demo" type="button" aria-label="${this.esc(a)}">${c}</button>` : o`<div class="demo-static">${c}</div>`}
      </ha-card>
    `;
  }
};
ei.styles = ga;
ei = va([
  k("component-single-kpi-v2")
], ei);
E({
  type: "component-single-kpi-v2",
  element: ei,
  name: "Single KPI",
  description: "Reusable single KPI component."
});
const ya = [
  ct,
  x`
    .wrap {
      padding: 8px 11px;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
      min-height: 48px;
    }
    .icon {
      width: 28px;
      height: 28px;
      display: grid;
      place-items: center;
      border-radius: 6px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    ha-icon {
      --mdc-icon-size: 16px;
    }
    .title {
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .desc {
      margin-top: 2px;
      font-size: 10px;
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
      font-size: 11px;
      font-weight: 500;
    }
    .status span {
      display: block;
      margin-top: 2px;
      font-size: 10px;
      color: var(--secondary-text-color);
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
var xa = Object.getOwnPropertyDescriptor, wa = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? xa(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const $a = {
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
let ii = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...$a, ...t });
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
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e ? rt(e) : !1, r = this._config.entity ? Z(this._config.entity) : "", n = e && this._config.title === "Status title" ? ft({ state: e }) : this._config.title || "Status title", s = e && this._config.status_value === "Active" ? i ? "Unavailable" : V(e, this.hass) : this._config.status_value || "Active", a = e && this._config.icon === "mdi:information-outline" ? e.attributes.icon || Jt(r, e.state) : this._config.icon || "mdi:information-outline", c = this._config.description || "", l = this._config.status_label || "", h = `${n}: ${s}${l ? ` (${l})` : ""}${c ? `. ${c}` : ""}`, f = o`
      <div class="wrap ${i ? "unavailable" : ""}">
        <span class="icon">
          <ha-icon icon="${this.esc(a)}"></ha-icon>
        </span>
        <div>
          <div class="title">${this.esc(n)}</div>
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
        ${t ? o`<button class="demo" type="button" aria-label="${this.esc(h)}" aria-disabled="${String(i)}">${f}</button>` : o`<div class="demo-static">${f}</div>`}
      </ha-card>
    `;
  }
};
ii.styles = ya;
ii = wa([
  k("component-status-row-v2")
], ii);
E({
  type: "component-status-row-v2",
  element: ii,
  name: "Status Row",
  description: "Reusable status row component."
});
const ka = x`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  ha-card {
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
  }
  .row {
    min-height: 70px;
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
    border-radius: 12px;
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
    margin-top: 4px;
    font-size: 13px;
    line-height: 1.3;
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
      var(--primary-color) 42%,
      var(--primary-color) 58%,
      transparent 100%
    );
    background-size: 220% 100%;
    opacity: 0.72;
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
    opacity: 0.45;
    animation: signalPulse var(--effect-speed, 2.6s)
      cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
  .signal .title:after {
    content: "";
    position: absolute;
    left: 3px;
    top: 50%;
    width: 3px;
    height: 3px;
    margin-top: -1.5px;
    border-radius: 50%;
    background: var(--primary-color);
    animation: signalDot var(--effect-speed, 2.6s) cubic-bezier(0.4, 0, 0.2, 1)
      infinite;
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
    background-size: 260% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    animation: rainbow var(--effect-speed, 2.6s) linear infinite;
  }
  .rainbow_stamp .title:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      #ff375f,
      #ff9f0a,
      #ffd60a,
      #30d158,
      #64d2ff,
      #0a84ff,
      #bf5af2
    );
    background-size: 240% 100%;
    opacity: 0.55;
    animation: rainbow var(--effect-speed, 2.6s) linear infinite;
  }
  @keyframes stampSweep {
    0% {
      background-position: 210% 0;
      opacity: 0;
    }
    15% {
      opacity: 0.28;
    }
    42% {
      opacity: 0.78;
    }
    70% {
      opacity: 0.28;
    }
    100% {
      background-position: -110% 0;
      opacity: 0;
    }
  }
  @keyframes textSweep {
    0%,
    8% {
      clip-path: inset(0 100% 0 0);
      opacity: 0;
    }
    22% {
      opacity: 0.75;
    }
    52% {
      clip-path: inset(0 0 0 0);
      opacity: 0.75;
    }
    72% {
      clip-path: inset(0 0 0 100%);
      opacity: 0.2;
    }
    100% {
      clip-path: inset(0 0 0 100%);
      opacity: 0;
    }
  }
  @keyframes softPrint {
    0%,
    48%,
    100% {
      opacity: 0;
      transform: translateX(0);
    }
    60% {
      opacity: 0.22;
      transform: translateX(0.6px);
    }
    70% {
      opacity: 0.1;
      transform: translateX(0);
    }
  }
  @keyframes signalPulse {
    0%,
    100% {
      opacity: 0.25;
      transform: rotate(45deg) scale(0.88);
    }
    48% {
      opacity: 0.7;
      transform: rotate(45deg) scale(1.06);
    }
    70% {
      opacity: 0.35;
      transform: rotate(45deg) scale(0.96);
    }
  }
  @keyframes signalDot {
    0%,
    100% {
      opacity: 0.35;
      transform: scale(0.7);
    }
    48% {
      opacity: 1;
      transform: scale(1);
    }
    70% {
      opacity: 0.5;
      transform: scale(0.8);
    }
  }
  @keyframes rainbow {
    to {
      background-position: 260% 50%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .stamp .title:after,
    .typewave .title:after,
    .overprint .title:after,
    .signal .title:before,
    .signal .title:after,
    .rainbow_stamp .title,
    .rainbow_stamp .title:after {
      animation: none !important;
    }
    .stamp .title:after {
      opacity: 0.35;
      background: var(--primary-color);
    }
    .typewave .title:after,
    .overprint .title:after {
      display: none;
    }
    .signal .title:before {
      opacity: 0.45;
    }
    .signal .title:after {
      opacity: 0.7;
    }
  }
  @media (max-width: 700px) {
    .row {
      padding: 12px;
    }
    .desc {
      font-size: 12px;
    }
  }
  .row.settled .title:after,
  .row.settled .title:before,
  .row.settled .title {
    animation: none !important;
  }
  .row.settled.typewave .title:after,
  .row.settled.overprint .title:after {
    display: none;
  }
  .row.settled.stamp .title:after {
    opacity: 0.35;
    background: var(--primary-color);
  }
  .row.settled.signal .title:before {
    opacity: 0.45;
  }
  .row.settled.signal .title:after {
    opacity: 0.7;
  }
`;
var Ca = Object.getOwnPropertyDescriptor, Sa = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ca(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const Aa = {
  type: "custom:component-text-effect-v1",
  effect: "stamp",
  description: "",
  icon: null,
  speed: 2.6
};
let ri = class extends A {
  constructor() {
    super(...arguments), this._settleTimer = null;
  }
  setConfig(t) {
    if (!t?.text)
      throw new Error("text is required");
    super.setConfig({ ...Aa, ...t });
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
ri.styles = ka;
ri = Sa([
  k("component-text-effect-v1")
], ri);
E({
  type: "component-text-effect-v1",
  element: ri,
  name: "Signature Text Effect",
  description: "Reusable transient-status effects using the existing signature motion language."
});
const Ea = [
  ct,
  x`
    .wrap {
      padding: 8px 11px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      min-height: 52px;
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
      border-radius: 6px;
    }
    .value {
      font-size: 16px;
      line-height: 1;
      font-weight: 500;
      letter-spacing: -0.02em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      margin-top: 3px;
      font-size: 10px;
      line-height: 1.2;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
        gap: 8px;
      }
      .value {
        font-size: 20px;
      }
      .label {
        font-size: 10px;
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
var za = Object.getOwnPropertyDescriptor, Ta = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? za(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const Da = {
  type: "custom:component-three-stat-v2",
  metric_1_value: "00",
  metric_1_label: "Metric one",
  metric_2_value: "00",
  metric_2_label: "Metric two",
  metric_3_value: "00",
  metric_3_label: "Metric three",
  interactive: !0
};
let ni = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Da, ...t });
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
      let n = this._config[`metric_${e}_value`];
      r && (n === "00" || !n) && (n = V(r, this.hass));
      let s = this._config[`metric_${e}_label`];
      r && (s === `Metric ${e === 1 ? "one" : e === 2 ? "two" : "three"}` || !s) && (s = ft({ state: r }));
      const a = this._getAction(e), c = `${s}: ${n}`, l = o`
        <div class="value">${this.esc(n)}</div>
        <div class="label">${this.esc(s)}</div>
      `;
      return a ? o`<button class="stat" data-index="${e}" type="button" aria-label="${this.esc(c)}">
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
ni.styles = Ea;
ni = Ta([
  k("component-three-stat-v2")
], ni);
E({
  type: "component-three-stat-v2",
  element: ni,
  name: "Three-stat Summary",
  description: "Reusable three-stat summary component."
});
const Oa = [
  j,
  x`
    .nav {
      width: 100%;
      text-align: left;
    }
    .wrap {
      min-height: 44px;
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
      border-radius: var(--dashboard-radius-icon, 5px);
      background: transparent;
      color: var(--primary-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 17px;
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
var Pa = Object.getOwnPropertyDescriptor, Ha = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Pa(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const Na = {
  type: "custom:component-nav-tile-v2",
  icon: "mdi:door-open",
  title: "Destination",
  context: "Navigation",
  navigation_path: null
};
let si = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Na, ...t });
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
si.styles = Oa;
si = Ha([
  k("component-nav-tile-v2")
], si);
E({
  type: "component-nav-tile-v2",
  element: si,
  name: "Navigation Tile",
  description: "Reusable navigation tile component."
});
const Ra = [
  j,
  x`
    .wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-height: 42px;
    }
    .group {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .chip {
      min-height: 32px;
      border: 1px solid var(--divider-color) !important;
      border-radius: var(--dashboard-radius-control, 6px);
      padding: 0 9px !important;
      display: flex;
      align-items: center;
      gap: 5px;
      color: var(--primary-text-color);
      font-size: 11.5px;
      font-weight: 500;
      white-space: nowrap;
    }
    .chip ha-icon,
    .chip ha-state-icon {
      color: var(--primary-color);
      --mdc-icon-size: 15px;
    }
    .chip:disabled {
      cursor: default;
      opacity: 1;
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
var Ia = Object.getOwnPropertyDescriptor, La = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ia(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const Ma = {
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
let ai = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Ma, ...t });
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
ai.styles = Ra;
ai = La([
  k("component-quick-nav-v2")
], ai);
E({
  type: "component-quick-nav-v2",
  element: ai,
  name: "Quick Navigation",
  description: "Reusable quick navigation component."
});
const qa = x`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  ha-card {
    overflow: hidden;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 6px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    box-shadow: none;
    color: var(--primary-text-color);
    transition:
      border-color 220ms ease,
      box-shadow 220ms ease;
  }
  button {
    appearance: none;
    width: 100%;
    min-height: 56px;
    padding: 0 12px 0 10px;
    border: 0;
    border-left: 2px solid transparent;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  .icon {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    background: transparent;
    color: var(--secondary-text-color);
  }
  .icon ha-icon {
    --mdc-icon-size: 21px;
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
    font-weight: 500;
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
    color: color-mix(
      in srgb,
      var(--primary-color) 68%,
      var(--secondary-text-color)
    );
  }
  button.warning {
    border-left-color: var(--warning-color, #f9a825);
    background: var(--dashboard-warning-surface, var(--card-background-color));
  }
  button.warning .icon {
    color: var(--warning-color, #f9a825);
  }
  button.critical {
    border-left-color: var(--error-color);
    background: var(--dashboard-critical-surface, var(--card-background-color));
  }
  button.critical .icon {
    color: var(--error-color);
  }
  button:active {
    background: var(
      --dashboard-card-muted-surface,
      var(--secondary-background-color)
    );
  }
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }
  @media (max-width: 420px) {
    button {
      padding-right: 10px;
      gap: 8px;
    }
  }
`;
var ja = Object.defineProperty, Ua = Object.getOwnPropertyDescriptor, Cn = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ua(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && ja(e, i, n), n;
};
const Ba = {
  type: "custom:component-room-navigation-v1",
  name: "Room",
  icon: "mdi:home-outline"
};
let ge = class extends A {
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
    super.setConfig({ ...Ba, ...t }), this.hass && R.load(this.hass).then((e) => {
      this._registries = e;
    });
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = R.subscribe(this.hass, (t) => {
      this._registries = t;
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  willUpdate() {
    !this._registries && this.hass && R.load(this.hass).then((t) => {
      this._registries = t;
    }), this.isConnected && !this._unsubRegistry && this.hass && (this._unsubRegistry = R.subscribe(this.hass, (t) => {
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
    const e = xn(t, this._registries, this.hass);
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
    const t = this._getStatus(), e = this._presenceDetected(), i = `Open ${this._config.name}${t.summary ? `. ${t.summary}` : ""}`, r = e ? this._presenceHue() : 0, n = e ? `border-color: hsl(${r} 82% 68% / .62); box-shadow: 0 0 0 1px hsl(${r} 82% 68% / .18), 0 0 14px 2px hsl(${r} 82% 64% / .14);` : "";
    return o`
      <ha-card style="${n}" ?data-presence=${e}>
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
ge.styles = qa;
Cn([
  y()
], ge.prototype, "_registries", 2);
ge = Cn([
  k("component-room-navigation-v1")
], ge);
E({
  type: "component-room-navigation-v1",
  element: ge,
  name: "Room Navigation",
  description: "Area-aware room navigation with presence status."
});
const Fa = [
  j,
  x`
    .wrap {
      padding: 0;
    }
    .head {
      padding: 13px 14px 11px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--divider-color);
    }
    .head-left {
      display: flex;
      align-items: center;
      gap: 9px;
    }
    .head-left ha-icon {
      color: var(--primary-color);
    }
    .close {
      width: 32px;
      height: 32px;
      border: 1px solid var(--dashboard-card-border-color, var(--divider-color)) !important;
      border-radius: var(--dashboard-radius-control, 5px) !important;
      color: var(--secondary-text-color);
      padding: 0 !important;
    }
    .body {
      padding: 8px 14px 12px;
    }
    .sep {
      display: flex;
      align-items: center;
      gap: 7px;
      margin: 8px 0 6px;
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text-color);
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
      min-height: 46px;
      display: grid;
      grid-template-columns: 30px minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
      border-radius: var(--dashboard-radius-control, 8px);
      cursor: pointer;
      padding: 0;
    }
    .row:active {
      background: var(--secondary-background-color);
    }
    .row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .row ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 18px;
    }
    .rname {
      font-size: 12px;
      font-weight: 600;
    }
    .rstate,
    .rvalue {
      font-size: 10.5px;
      color: var(--secondary-text-color);
    }
    .rvalue {
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .row:not(.actionable) {
      cursor: default;
    }
    .row:not(.actionable):active {
      background: transparent;
    }
    .close.preview-only {
      display: grid;
      place-items: center;
    }
  `
];
var Va = Object.getOwnPropertyDescriptor, Wa = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Va(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const Ga = {
  type: "custom:component-room-sheet-v2",
  icon: "mdi:bed-king-outline",
  title: "Room name",
  rows: null
}, Fr = [
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
let oi = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Ga, ...t });
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
    this._interactionHandles = [], (Array.isArray(this._config?.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : Fr).forEach((e, i) => {
      const r = this._getAction(e);
      if (!r) return;
      const n = this.renderRoot.querySelector(
        `[data-row="${i}"]`
      );
      n && (n.setAttribute(
        "aria-label",
        e.aria_label || `${e.name || "Room control"}`
      ), this._interactionHandles.push(
        S(n, {
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
    const t = Array.isArray(this._config.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : Fr;
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
      const n = i.entity && this.hass?.states ? this.hass.states[i.entity] : null, s = i.entity ? Z(i.entity) : "", a = n && (!i.name || i.name === "Control name" || i.name === "Status metric") ? ft({ state: n }) : i.name || "Control name", c = n && (!i.state || i.state === "Current state" || i.state === "Supporting context") ? V(n, this.hass) : i.state || "", l = n && (!i.icon || i.icon === "mdi:circle-outline") ? n.attributes.icon || Jt(s, n.state) : i.icon || "mdi:circle-outline", h = i.value || "", f = i.section || "Controls", g = f !== e;
      g && (e = f);
      const d = this._getAction(i), u = i.aria_label || `${a}: ${c || h}`;
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
                              ${this.esc(a)}
                            </div>
                            ${c ? o`<div class="rstate">${this.esc(c)}</div>` : ""}
                          </span>
                          ${h ? o`<span class="rvalue">${this.esc(h)}</span>` : ""}
                        </button>
                      ` : o`
                        <div class="row" data-row="${r}" aria-label="${this.esc(u)}">
                          <ha-icon
                            icon="${this.esc(l)}"
                          ></ha-icon>
                          <span>
                            <div class="rname">
                              ${this.esc(a)}
                            </div>
                            ${c ? o`<div class="rstate">${this.esc(c)}</div>` : ""}
                          </span>
                          ${h ? o`<span class="rvalue">${this.esc(h)}</span>` : ""}
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
oi.styles = Fa;
oi = Wa([
  k("component-room-sheet-v2")
], oi);
E({
  type: "component-room-sheet-v2",
  element: oi,
  name: "Room Sheet",
  description: "Reusable room-sheet component."
});
const Ka = [
  Se,
  Xi,
  Zi,
  Ji,
  ms,
  x`
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
var Ya = Object.defineProperty, Qa = Object.getOwnPropertyDescriptor, nr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Qa(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Ya(e, i, n), n;
};
const Xa = {
  type: "custom:component-control-row-v2",
  icon: "mdi:lightbulb-outline",
  title: "Control name",
  state: "Current state",
  mode: "slider",
  value: 68,
  entity: null
};
let Mt = class extends A {
  constructor() {
    super(...arguments), this._on = !0, this._val = 68, this._interactionHandles = [], this._coalescer = null;
  }
  setConfig(t) {
    super.setConfig({ ...Xa, ...t }), this._on = this._config?.on !== !1, this._val = Math.max(0, Math.min(100, Number(this._config?.value) || 68)), this._resetCoalescer();
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
      const r = Number(t.attributes?.min ?? 0), n = Number(t.attributes?.max ?? 100), s = Number(t.state);
      if (Number.isFinite(s) && Number.isFinite(r) && Number.isFinite(n) && n > r)
        return Math.max(0, Math.min(100, (s - r) / (n - r) * 100));
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
    return this._coalescer ? this._coalescer : (this._coalescer = Qi(
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
      const n = i.data_key || "value";
      return this.hass.callService(i.domain, i.service, {
        entity_id: e,
        ...i.data || {},
        [n]: t
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
      const n = this._getState(), s = Number(n?.attributes?.min ?? 0), a = Number(n?.attributes?.max ?? 100), c = s + (a - s) * t / 100;
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
    }), await ue(
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
    const t = this._config?.mode || "slider", e = !!this._config?.entity, i = this._getState(), r = e ? this._available(i) : !0, n = e ? i?.state === "on" : this._on;
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
      const h = this.renderRoot.querySelector(
        ".live-slider"
      );
      h && (h.disabled = !r, h.oninput = () => {
        this._val = Number(h.value), this._updateSliderVisual(), this._sliderCoalescer().request(this._val);
      });
      return;
    }
    const a = e ? t !== "slider" : !e && (t === "switch" || t === "slider"), c = this.renderRoot.querySelector(
      a ? "button.row" : ".row"
    );
    if (!(!a || !c)) {
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
        c.setAttribute("aria-pressed", String(n)), c.setAttribute(
          "aria-label",
          `${n ? "Turn off" : "Turn on"} ${this._config?.title}`
        );
        const l = c.querySelector(".switch");
        this._interactionHandles.push(
          S(c, {
            primary: () => this._toggle(n),
            hold: () => this.moreInfo(this._config?.entity),
            optimistic: {
              capture: () => n,
              apply: () => {
                const h = !n;
                this._on = h, c.setAttribute("aria-pressed", String(h)), l?.classList.toggle("on", h);
              },
              rollback: () => {
                this._on = n, c.setAttribute("aria-pressed", String(n)), l?.classList.toggle("on", n);
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
    const t = this._config.mode || "slider", e = !!this._config.entity, i = this._getState(), r = e ? this._available(i) : !0, n = e ? i?.state === "on" : this._on;
    t === "slider" && e && (this._val = this._sliderPercent(i));
    const s = t === "switch" ? o`<span class="switch ${n ? "on" : ""}"
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
      e ? t === "switch" ? this._toggle(n) : t === "action" ? this._serviceAction() : this.moreInfo(this._config?.entity) : t === "switch" ? this._on = !this._on : t === "slider" && (this._val = (this._val + 20) % 120, this._val > 100 && (this._val = 0));
    }}
                >
                  ${l}
                </button>
              ` : o`<div class="row row-static">${l}</div>`}
      </ha-card>
    `;
  }
};
Mt.styles = Ka;
nr([
  y()
], Mt.prototype, "_on", 2);
nr([
  y()
], Mt.prototype, "_val", 2);
Mt = nr([
  k("component-control-row-v2")
], Mt);
E({
  type: "component-control-row-v2",
  element: Mt,
  name: "Control Row",
  description: "Reusable control-row component."
});
const Za = [
  Se,
  Xi,
  Zi,
  Ji,
  x`
    .buttons {
      display: flex;
      gap: var(--c-space-1);
    }
    .btn {
      position: relative;
      width: 36px;
      height: 36px;
      border: 0 !important;
      border-radius: var(--c-radius-control) !important;
      background: transparent !important;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      padding: 0 !important;
    }
    .btn:before {
      content: "";
      position: absolute;
      width: 26px;
      height: 26px;
      border: 1px solid var(--c-card-border-color);
      border-radius: var(--c-radius-control);
    }
    .btn.main {
      color: var(--primary-color);
    }
    .btn ha-icon {
      position: relative;
      --mdc-icon-size: var(--c-icon-sm-size);
    }
  `
];
var Ja = Object.defineProperty, to = Object.getOwnPropertyDescriptor, wi = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? to(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Ja(e, i, n), n;
};
const Me = { pause: 1, previous: 16, next: 32, play: 512 }, eo = {
  type: "custom:component-media-row-v2",
  icon: "mdi:speaker",
  title: "Media player",
  state: "Playing · Media title",
  entity: null
};
let wt = class extends A {
  constructor() {
    super(...arguments), this._playing = !0, this._optimisticPlaying = null, this._busy = !1, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...eo, ...t }), this._playing = !0, this._optimisticPlaying = null, this._busy = !1;
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
        }), await ue(
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
      const a = this.renderRoot.querySelector(
        ".previous"
      ), c = this.renderRoot.querySelector(
        ".next"
      );
      a && this._interactionHandles.push(
        S(a, {
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
    const n = this.renderRoot.querySelector(
      ".main"
    );
    n && (t ? this._interactionHandles.push(
      S(n, {
        primary: () => this._playPause(r),
        optimistic: {
          capture: () => r,
          apply: () => {
            this._optimisticPlaying = !r, n.setAttribute(
              "aria-label",
              r ? "Play" : "Pause"
            ), n.querySelector("ha-icon")?.setAttribute(
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
      S(n, {
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
    const t = this._liveState(), e = !!this._config.entity, i = e && this._available(t), r = i ? t?.state === "playing" : this._playing, n = this._optimisticPlaying ?? r, s = i && this._supported(t, Me.previous), a = i && this._supported(t, Me.next), c = !this._busy && (!e || i && this._supported(
      t,
      n ? Me.pause : Me.play
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
              aria-label="${n ? "Pause" : "Play"}"
              ?disabled=${!c}
            >
              <ha-icon icon="mdi:${n ? "pause" : "play"}"></ha-icon>
            </button>
            ${e ? o`
                    <button
                      class="i btn next"
                      type="button"
                      aria-label="Next"
                      ?disabled=${!a}
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
wt.styles = Za;
wi([
  y()
], wt.prototype, "_playing", 2);
wi([
  y()
], wt.prototype, "_optimisticPlaying", 2);
wi([
  y()
], wt.prototype, "_busy", 2);
wt = wi([
  k("component-media-row-v2")
], wt);
E({
  type: "component-media-row-v2",
  element: wt,
  name: "Media Row",
  description: "Reusable media-row component."
});
const io = x`
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
var ro = Object.defineProperty, no = Object.getOwnPropertyDescriptor, sr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? no(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && ro(e, i, n), n;
};
const so = "custom:auto-entities", Vr = (t) => JSON.parse(JSON.stringify(t));
let qt = class extends A {
  constructor() {
    super(...arguments), this._innerCard = null, this._innerError = !1, this._generation = 0, this._retryTimer = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.filter) throw new Error("An Auto-Entities filter is required");
    super.setConfig(Vr(t)), this._generation += 1, this._retryTimer && clearTimeout(this._retryTimer), this._retryTimer = null, this._buildCard();
  }
  getCardSize() {
    const t = !!this._config?.header?.title?.trim();
    return (typeof this._innerCard?.getCardSize == "function" && Number(this._innerCard.getCardSize()) || 1) + (t ? 1 : 0);
  }
  getLayoutOptions() {
    return this._innerCard?.getLayoutOptions?.() ?? {};
  }
  _cardConfig() {
    const t = Vr(
      this._config || {}
    ), e = t.exclude_invalid_states !== !1;
    delete t.header, delete t.exclude_invalid_states, t.type = so;
    const i = t.filter ?? {};
    if (i.exclude = Array.isArray(i.exclude) ? [...i.exclude] : [], e)
      for (const r of ["unavailable", "unknown"])
        i.exclude.some(
          (n) => n?.state === r && Object.keys(n).length === 1
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
qt.styles = io;
sr([
  y()
], qt.prototype, "_innerCard", 2);
sr([
  y()
], qt.prototype, "_innerError", 2);
qt = sr([
  k("component-device-aware-auto-entities-v1")
], qt);
E({
  type: "component-device-aware-auto-entities-v1",
  element: qt,
  name: "Device Aware Auto Entities",
  description: "Presentation wrapper for Auto-Entities collections."
});
const ao = [
  ct,
  x`
    .card {
      padding: 4px 14px;
    }
    .summary,
    .state {
      min-height: 64px;
      display: grid;
      grid-template-columns: 38px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .state {
      padding: 8px 0;
    }
    .icon {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    ha-icon {
      --mdc-icon-size: 20px;
    }
    .title {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 650;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .description {
      margin-top: 4px;
      font-size: 13px;
      line-height: 1.35;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .refresh,
    .review,
    .retry {
      appearance: none;
      min-width: 44px;
      min-height: 44px;
      border: 0;
      border-radius: 12px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
      font: inherit;
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
    }
    .refresh {
      width: 44px;
      padding: 0;
      display: grid;
      place-items: center;
    }
    .review,
    .retry {
      padding: 0 12px;
      display: grid;
      place-items: center;
    }
    .refresh:active,
    .review:active,
    .retry:active {
      transform: scale(0.98);
    }
    .refresh:focus-visible,
    .review:focus-visible,
    .retry:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .row {
      min-height: 64px;
      display: grid;
      grid-template-columns: 38px minmax(0, 1fr) auto;
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
      border-right: 0;
      border-bottom: 0;
      border-left: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    button.row:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: 8px;
    }
    .more {
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .error .icon {
      color: var(--error-color, var(--primary-color));
    }
    .success .icon {
      color: var(--success-color, var(--primary-color));
    }
    @media (max-width: 700px) {
      .card {
        padding: 4px 12px;
      }
      .summary,
      .state,
      .row {
        gap: 10px;
      }
    }
  `
];
var oo = Object.defineProperty, co = Object.getOwnPropertyDescriptor, ar = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? co(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && oo(e, i, n), n;
};
const lo = {
  type: "custom:component-device-discovery-v2",
  demo: !1,
  refresh_seconds: 60,
  max_rows: 6
}, po = [
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
let jt = class extends A {
  constructor() {
    super(...arguments), this._flows = [], this._stateKind = "ready", this._timer = null, this._started = !1, this._loadGeneration = 0, this._interactionHandles = [];
  }
  setConfig(t) {
    const e = !!this._config?.demo;
    if (super.setConfig({ ...lo, ...t }), this._config?.demo) {
      (!e || this._started) && (this._timer && clearInterval(this._timer), this._timer = null, this._started = !1, this._loadGeneration += 1), this._flows = po, this._stateKind = "ready";
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
      const a = {
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
            <div class="state ${a.className}">
              <span class="icon"
                ><ha-icon icon="${a.icon}"></ha-icon
              ></span>
              <span>
                <div class="title">${a.title}</div>
                <div class="description">${a.description}</div>
              </span>
              ${this._stateKind === "error" ? o`<button class="retry" type="button">Retry</button>` : ""}
            </div>
          </div>
        </ha-card>
      `;
    }
    const t = Math.max(1, Number(this._config.max_rows) || 6), e = this._flows.slice(0, t), i = Math.max(0, this._flows.length - e.length), r = this._flows.length === 0, n = r ? "No devices waiting" : `${this._flows.length} ${this._flows.length === 1 ? "device" : "devices"} found`, s = r ? "Home Assistant has no new setup suggestions." : "Home Assistant has setup suggestions ready to review.";
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
              <div class="title">${this.esc(n)}</div>
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
          ${e.map((a) => {
      const c = this._name(a), l = `${this._source(a.context?.source)} · ${a.handler}`, h = o`
              <span class="icon"
                ><ha-icon icon="mdi:plus-circle-outline"></ha-icon
              ></span>
              <span>
                <div class="title">${this.esc(c)}</div>
                <div class="description">${this.esc(l)}</div>
              </span>
              <span class="review" aria-hidden="true">Review</span>
            `;
      return this._config?.demo ? o`<div class="row">${h}</div>` : o`<button
                  class="row"
                  type="button"
                  aria-label="Review ${this.esc(c)}"
                >
                  ${h}
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
jt.styles = ao;
ar([
  y()
], jt.prototype, "_flows", 2);
ar([
  y()
], jt.prototype, "_stateKind", 2);
jt = ar([
  k("component-device-discovery-v2")
], jt);
E({
  type: "component-device-discovery-v2",
  element: jt,
  name: "Device Discovery",
  description: "Reusable device-discovery status component."
});
const ho = [
  tr,
  x`
    ha-card {
      position: relative;
    }
    .wrap {
      min-height: 68px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
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
      gap: 10px;
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
      border-radius: 10px;
    }
    .icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: 12px;
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
    }
    .versions {
      margin-top: 3px;
      font-size: 13px;
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
      min-height: 44px;
      padding: 0 13px;
      border-radius: 11px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    .action:disabled {
      cursor: default;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
      opacity: 1;
    }
    .progress {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      border-radius: 0 999px 999px 0;
      background: var(--primary-color);
      pointer-events: none;
    }
    .progress.determinate {
      width: var(--progress);
      transition: width 0.25s ease;
    }
    .progress.indeterminate {
      width: 34%;
      animation: update-slide 1.15s ease-in-out infinite;
    }
    @keyframes update-slide {
      0% {
        transform: translateX(-105%);
      }
      50% {
        transform: translateX(150%);
      }
      100% {
        transform: translateX(305%);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .progress.indeterminate {
        animation: none;
        width: 100%;
        opacity: 0.55;
      }
      .progress.determinate {
        transition: none;
      }
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 0 12px;
      }
    }
  `
];
var uo = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, $i = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? mo(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && uo(e, i, n), n;
};
const fo = {
  type: "custom:component-update-row-v3",
  icon: "mdi:update",
  title: "Update name",
  current: "Current 1.0",
  available: "Available 1.1",
  action: "Update",
  confirm: !0,
  entity: null
};
let $t = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._requested = !1, this._error = "", this._startTimer = null, this._errorTimer = null, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...fo, ...t });
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
    const e = t.attributes || {}, i = ["unavailable", "unknown"].includes(t.state), r = t.state === "on", n = this._progress(e);
    return {
      live: !0,
      missing: !1,
      unavailable: i,
      title: this._name(t),
      current: e.installed_version ? `Current ${e.installed_version}` : "Current version unavailable",
      available: e.latest_version ? `Available ${e.latest_version}` : "Latest version unavailable",
      action: i ? "Unavailable" : n.active ? "Updating…" : r ? "Update" : "Current",
      pending: r,
      progress: n
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
    const t = this._data(), e = t.progress.active || this._busy || this._requested, i = t.missing || t.unavailable || !t.pending || e, r = this._error ? "Retry" : this._busy || this._requested ? "Starting…" : t.action, n = this._error ? this._error : `${t.current}${t.available ? ` · ${t.available}` : ""}`, s = e ? t.progress.determinate ? o`
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
                ${this.esc(n)}
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
$t.styles = ho;
$i([
  y()
], $t.prototype, "_busy", 2);
$i([
  y()
], $t.prototype, "_requested", 2);
$i([
  y()
], $t.prototype, "_error", 2);
$t = $i([
  k("component-update-row-v3")
], $t);
E({
  type: "component-update-row-v3",
  element: $t,
  name: "Update Row",
  description: "Reusable update row with live update support."
});
const go = [
  tr,
  x`
    ha-card {
      position: relative;
    }
    .wrap {
      padding: 12px 14px;
      min-height: 72px;
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
    }
    .count {
      font-size: 27px;
      line-height: 1;
      font-weight: 650;
      letter-spacing: -0.035em;
    }
    .headline {
      font-size: 13px;
      font-weight: 600;
    }
    .desc {
      margin-top: 3px;
      font-size: 13px;
      line-height: 1.3;
      color: var(--secondary-text-color);
    }
    .desc.error {
      color: var(--error-color);
    }
    .all {
      appearance: none;
      border: 0;
      min-height: 44px;
      padding: 0 14px;
      border-radius: 11px;
      background: var(--primary-color);
      color: var(--text-primary-color);
      font-size: 13px;
      font-weight: 650;
      cursor: pointer;
      white-space: nowrap;
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
    }
    .progress {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      border-radius: 0 999px 999px 0;
      background: var(--primary-color);
      pointer-events: none;
    }
    .progress.indeterminate {
      width: 34%;
      animation: update-slide 1.15s ease-in-out infinite;
    }
    @keyframes update-slide {
      0% {
        transform: translateX(-105%);
      }
      50% {
        transform: translateX(150%);
      }
      100% {
        transform: translateX(305%);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .progress.indeterminate {
        animation: none;
        width: 100%;
        opacity: 0.55;
      }
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
        gap: 10px;
      }
      .count {
        font-size: 25px;
      }
      .all {
        padding: 0 12px;
      }
    }
  `
];
var _o = Object.defineProperty, vo = Object.getOwnPropertyDescriptor, or = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? vo(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && _o(e, i, n), n;
};
const bo = {
  type: "custom:component-update-summary-v3",
  count: "3",
  title: "updates available",
  message: "Review the items below before installing.",
  live_updates: !1,
  update_all: !1,
  confirm: !0
};
let Ut = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._error = "", this._messageTimer = null, this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...bo, ...t });
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
      (n) => !this._inProgress(n.attributes)
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
    ], r = t.map((n) => n.entity_id).filter((n) => !i.includes(n));
    try {
      r.length && await this.hass.callService("update", "install", { entity_id: r });
      for (const n of i)
        t.some((s) => s.entity_id === n) && await this.hass.callService("update", "install", { entity_id: n });
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
Ut.styles = go;
or([
  y()
], Ut.prototype, "_busy", 2);
or([
  y()
], Ut.prototype, "_error", 2);
Ut = or([
  k("component-update-summary-v3")
], Ut);
E({
  type: "component-update-summary-v3",
  element: Ut,
  name: "Update Summary",
  description: "Reusable update summary with live update support."
});
const yo = x`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  button,
  input {
    font: inherit;
    color: inherit;
  }
  button {
    appearance: none;
    border: 0;
    background: transparent;
    cursor: pointer;
  }
  ha-card {
    overflow: hidden;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 8px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    box-shadow: none;
    color: var(--primary-text-color);
  }
  .wrap {
    padding: 14px 16px;
    display: grid;
    gap: 12px;
  }
  .identity {
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr);
    align-items: center;
    gap: 10px;
  }
  .ico {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  .ico ha-icon {
    --mdc-icon-size: 24px;
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
    font-weight: 700;
    line-height: 1.2;
  }
  .status {
    margin-top: 3px;
    font-size: 12px;
    line-height: 1.2;
    color: var(--secondary-text-color);
  }
  .launchers {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }
  .launcher {
    min-height: 52px;
    padding: 0 12px;
    border: 1px solid var(--divider-color);
    border-radius: 14px;
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr) 16px;
    align-items: center;
    gap: 8px;
    text-align: left;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .launcher ha-icon {
    --mdc-icon-size: 18px;
  }
  .launch-icon {
    display: grid;
    place-items: center;
    color: var(--primary-color);
  }
  .launch-copy {
    min-width: 0;
  }
  .launch-title,
  .launch-meta {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .launch-title {
    font-size: 12px;
    font-weight: 700;
    line-height: 1.2;
  }
  .launch-meta {
    margin-top: 2px;
    font-size: 11px;
    line-height: 1.2;
    color: var(--secondary-text-color);
  }
  .launcher:hover,
  .launcher:focus-visible {
    background: var(--dashboard-card-muted-surface, var(--secondary-background-color));
  }
  .stack {
    display: grid;
    gap: 8px;
  }
  .remote {
    padding: 12px 14px;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 8px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    color: var(--primary-text-color);
  }
  .remote-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 8px;
  }
  .remote-title {
    font-size: 12px;
    font-weight: 650;
  }
  .power,
  .utility {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .power button,
  .utility button,
  .dpad button,
  .keyboard button {
    border: 1px solid var(--divider-color);
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .power button,
  .utility button {
    min-height: 44px;
    padding: 0 14px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 650;
  }
  .power ha-icon,
  .utility ha-icon {
    --mdc-icon-size: 18px;
  }
  .dpad {
    width: min(286px, 78vw);
    aspect-ratio: 1;
    margin: 8px auto 12px;
    padding: 14px;
    border: 1px solid var(--divider-color);
    border-radius: 50%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 5px;
    background: color-mix(in srgb, var(--secondary-background-color) 72%, transparent);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
  .dpad button {
    min-width: 0;
    min-height: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  .dpad button.select {
    border: 1px solid var(--divider-color);
    background: var(--card-background-color);
    color: var(--primary-color);
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.12);
  }
  .dpad button.blank {
    visibility: hidden;
  }
  .dpad ha-icon {
    --mdc-icon-size: 30px;
  }
  .utility {
    justify-content: center;
  }
  .keyboard {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 8px;
    margin-top: 8px;
  }
  .keyboard input {
    width: 100%;
    min-height: 42px;
    padding: 0 11px;
    border: 1px solid var(--divider-color);
    border-radius: 12px;
    background: transparent;
    color: var(--primary-text-color);
    font-size: 13px;
  }
  .keyboard button {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: grid;
    place-items: center;
  }
  .keyboard ha-icon {
    --mdc-icon-size: 18px;
  }
  .media-banner {
    padding: 12px 14px;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 8px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    color: var(--primary-text-color);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .media-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .media-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: var(--secondary-background-color);
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .media-icon ha-icon {
    --mdc-icon-size: 22px;
  }
  .media-details {
    min-width: 0;
    flex: 1;
  }
  .media-title {
    font-size: 13px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .media-sub {
    font-size: 11.5px;
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2px;
  }
  .media-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
  }
  .media-controls button {
    min-height: 44px;
    min-width: 44px;
    padding: 0 10px;
    border: 1px solid var(--divider-color);
    border-radius: 14px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  .media-controls button.play-pause {
    background: var(--card-background-color);
    color: var(--primary-color);
    border-color: var(--primary-color);
  }
  .media-controls button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  :is(button, input):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  @media (max-width: 420px) {
    .wrap {
      padding: 12px;
    }
    .dpad {
      width: min(270px, 78vw);
    }
  }
`;
var xo = Object.defineProperty, wo = Object.getOwnPropertyDescriptor, Sn = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? wo(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && xo(e, i, n), n;
};
const $o = Object.freeze([
  ["up", "Up", "mdi:chevron-up"],
  ["left", "Left", "mdi:chevron-left"],
  ["select", "Select", "mdi:radiobox-marked"],
  ["right", "Right", "mdi:chevron-right"],
  ["down", "Down", "mdi:chevron-down"]
]), ko = Object.freeze([
  ["menu", "Menu", "mdi:menu"],
  ["home", "Home", "mdi:home-outline"],
  ["top_menu", "Top Menu", "mdi:format-list-bulleted"]
]), Co = (t) => ({
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
let _e = class extends A {
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
        Co(this._config)
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
    const t = this._config.remote_entity || (this._config.entity?.startsWith("remote.") ? this._config.entity : this._config.entity?.replace(/^media_player\./, "remote.")), e = t && this.hass?.states?.[t], i = this._config.demo || !!(e && e.state !== "unavailable" && e.state !== "unknown"), r = !!(this._config.keyboard_entity && this._config.keyboard_config_entry_id), n = this._config.demo || r && this.hass?.states?.[this._config.keyboard_entity]?.state === "on", s = new Map(
      $o.map((c) => [c[0], c])
    ), a = [
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
                    ${a.map((c) => {
      if (!c)
        return o`<button
                          class="blank"
                          type="button"
                          tabindex="-1"
                          aria-hidden="true"
                        ></button>`;
      const [, l, h] = s.get(c);
      return o`
                        <button
                          class="${c === "select" ? "select" : "direction"}"
                          type="button"
                          data-cmd="${c}"
                          aria-label="${l}"
                          ?disabled=${!i}
                          @click=${() => this._remoteCommand(c)}
                        >
                          <ha-icon icon="${h}"></ha-icon>
                        </button>
                      `;
    })}
                  </div>

                  <div class="utility">
                    ${ko.map(
      ([c, l, h]) => o`
                        <button
                          type="button"
                          data-cmd="${c}"
                          aria-label="${l}"
                          ?disabled=${!i}
                          @click=${() => this._remoteCommand(c)}
                        >
                          <ha-icon icon="${h}"></ha-icon>
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
                              ?disabled=${!n}
                              @keydown=${(c) => {
      c.key === "Enter" && this._keyboardAction("set_keyboard_text");
    }}
                            />
                            <button
                              class="keyboard-set"
                              type="button"
                              aria-label="Set keyboard text"
                              ?disabled=${!n}
                              @click=${() => this._keyboardAction("set_keyboard_text")}
                            >
                              <ha-icon icon="mdi:keyboard"></ha-icon>
                            </button>
                            <button
                              class="keyboard-clear"
                              type="button"
                              aria-label="Clear keyboard text"
                              ?disabled=${!n}
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
    const t = this._config?.entity, e = t ? this.hass?.states?.[t] : null, i = e?.attributes || {}, r = e?.state === "playing", n = !e || e.state === "off" || e.state === "unavailable" || e.state === "unknown", s = i.media_title || i.app_name || this._config?.title || i.friendly_name || "Apple TV", c = [
      i.app_name && i.media_title ? i.app_name : null,
      i.media_artist,
      i.media_series_title ? `${i.media_series_title}${i.media_season ? ` S${i.media_season}:E${i.media_episode}` : ""}` : null,
      !r && e?.state ? e.state.charAt(0).toUpperCase() + e.state.slice(1) : null
    ].filter(Boolean).join(" · ") || (n ? "Off" : "Idle");
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
            ?disabled=${n}
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
            ?disabled=${n}
            @click=${() => {
      t && this.hass && this.hass.callService("media_player", "media_play_pause", { entity_id: t });
    }}
          >
            <ha-icon icon="${r ? "mdi:pause" : "mdi:play"}"></ha-icon>
          </button>

          <button
            type="button"
            aria-label="Next Track"
            ?disabled=${n}
            @click=${() => {
      t && this.hass && this.hass.callService("media_player", "media_next_track", { entity_id: t });
    }}
          >
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>

          <button
            type="button"
            aria-label="Volume Down"
            ?disabled=${n}
            @click=${() => {
      t && this.hass && this.hass.callService("media_player", "volume_down", { entity_id: t });
    }}
          >
            <ha-icon icon="mdi:volume-minus"></ha-icon>
          </button>

          <button
            type="button"
            aria-label="Volume Up"
            ?disabled=${n}
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
_e.styles = yo;
Sn([
  y()
], _e.prototype, "_nativeCard", 2);
_e = Sn([
  k("component-apple-tv-controller-v1")
], _e);
E({
  type: "component-apple-tv-controller-v1",
  element: _e,
  name: "Apple TV Controller",
  description: "Native Home Assistant media controls with an optional explicit Apple TV remote."
});
const So = x`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  button {
    font: inherit;
    color: inherit;
  }
  ha-card {
    display: block;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 8px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    box-shadow: none;
    color: var(--primary-text-color);
    overflow: hidden;
  }
  .row {
    min-height: 62px;
    padding: 8px 9px 8px 10px;
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr) auto;
    align-items: center;
    gap: 9px;
  }
  .ico {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  .ico ha-icon {
    --mdc-icon-size: 20px;
  }
  .activity .ico {
    color: var(--primary-color);
  }
  .offline .ico {
    color: var(--disabled-text-color, var(--secondary-text-color));
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
    font-weight: 500;
    line-height: 1.25;
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
    border: 1px solid var(--divider-color);
    background: transparent;
    border-radius: var(--dashboard-radius-control, 8px);
    cursor: pointer;
  }
  .action {
    min-height: 38px;
    padding: 0 9px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    color: var(--secondary-text-color);
  }
  .action ha-icon {
    --mdc-icon-size: 16px;
  }
  .action:hover,
  .action:focus-visible {
    background: var(--dashboard-card-muted-surface, var(--secondary-background-color));
    color: var(--primary-text-color);
  }
  button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  dialog {
    width: min(560px, calc(100vw - 24px));
    max-height: min(720px, calc(100dvh - 24px));
    padding: 0;
    margin: auto;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-dialog, 10px);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--dashboard-dialog-shadow, 0 16px 48px rgba(0, 0, 0, 0.22));
    overflow: hidden;
  }
  dialog::backdrop {
    background: var(--dashboard-modal-scrim, rgba(0, 0, 0, 0.16));
    backdrop-filter: blur(3px);
  }
  .sheet {
    display: flex;
    flex-direction: column;
    max-height: min(720px, calc(100dvh - 24px));
  }
  .head {
    min-height: 54px;
    padding: 6px 7px 6px 14px;
    display: flex;
    align-items: center;
    gap: 9px;
    border-bottom: 1px solid var(--divider-color);
  }
  .head > ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }
  .title {
    min-width: 0;
    flex: 1;
  }
  .sheet-name,
  .sheet-state {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sheet-name {
    font-size: 14px;
    font-weight: 500;
  }
  .sheet-state {
    margin-top: 2px;
    font-size: 11.5px;
    color: var(--secondary-text-color);
  }
  .close {
    width: 40px;
    height: 40px;
    border-color: transparent;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  .close ha-icon {
    --mdc-icon-size: 18px;
  }
  .body {
    overflow: auto;
    overscroll-behavior: contain;
    padding: 12px 14px max(14px, env(safe-area-inset-bottom));
    display: grid;
    gap: 16px;
  }
  .section {
    display: grid;
    gap: 7px;
  }
  .section[hidden] {
    display: none;
  }
  .section-title {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 500;
    color: var(--secondary-text-color);
  }
  .section-title:after {
    content: "";
    height: 1px;
    background: var(--divider-color);
    flex: 1;
  }
  .control,
  .detect,
  .maintenance {
    min-height: 46px;
    padding: 5px 6px 5px 10px;
    border: 1px solid var(--divider-color);
    border-radius: var(--dashboard-radius-control, 8px);
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
  }
  .copy {
    min-width: 0;
  }
  .ctl-name,
  .ctl-state {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ctl-name {
    font-size: 12.5px;
  }
  .ctl-state {
    margin-top: 2px;
    font-size: 11px;
    color: var(--secondary-text-color);
  }
  .detect.on {
    border-color: color-mix(in srgb, var(--primary-color) 42%, var(--divider-color));
  }
  .detect .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--divider-color);
  }
  .detect.on .dot {
    background: var(--primary-color);
  }
  .switchbtn {
    min-width: 58px;
    height: 34px;
    padding: 0 9px;
    font-size: 11px;
    color: var(--secondary-text-color);
  }
  .switchbtn.on {
    color: var(--primary-color);
    border-color: color-mix(in srgb, var(--primary-color) 45%, var(--divider-color));
    background: color-mix(in srgb, var(--primary-color) 7%, transparent);
  }
  .maint {
    grid-template-columns: minmax(0, 1fr) auto;
  }
  .maint button {
    min-width: 78px;
    height: 34px;
    padding: 0 9px;
  }
  .maint button.confirm {
    border-color: var(--warning-color, var(--primary-color));
    color: var(--warning-color, var(--primary-color));
  }
  :is(button):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  @media (max-width: 520px) {
    .row {
      grid-template-columns: 34px minmax(0, 1fr) auto;
      padding-left: 8px;
    }
    .actions .action span {
      display: none;
    }
    .action {
      width: 40px;
      padding: 0;
      justify-content: center;
    }
    dialog {
      width: 100vw;
      max-width: 100vw;
      height: 88dvh;
      max-height: 88dvh;
      margin: auto 0 0;
      border-width: 1px 0 0;
      border-radius: 8px 8px 0 0;
    }
    .sheet {
      height: 88dvh;
      max-height: 88dvh;
    }
    .body {
      padding: 10px 12px max(18px, env(safe-area-inset-bottom));
    }
  }
`;
var Ao = Object.defineProperty, Eo = Object.getOwnPropertyDescriptor, Ee = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Eo(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Ao(e, i, n), n;
};
let nt = class extends A {
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
        const e = await Ae(
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
    const t = this._camera, e = this._model?.error || this._model?.profileError, i = t?.name || this._config.title || "Camera", r = this._model?.profileMissing ? `Configure ${this._config.profile || "household-security"}` : e ? "Controls unavailable" : t?.active ? "Activity detected" : t?.online ? "Online" : "Unavailable", n = !!(t && (t.switches.length || t.detections.length || t.actions.length || t.ptz.length));
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
              ?hidden=${this._config.expanded || !n}
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
      const a = this.renderRoot.querySelector("dialog");
      s.target === a && a?.close();
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
      const i = e.entity.entity_id, r = this.hass?.states[i], n = r?.attributes?.entity_picture, s = r?.last_updated, a = s && new Date(s), c = a && Number.isFinite(a.getTime()) ? hi(this.hass, a, {
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
                          ${n ? o`<img
                                class="classification-image"
                                src="${n}"
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
      const i = e.entity.entity_id, n = this.hass?.states[i]?.state === "on", s = this._confirmId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.role || "Control")}</span
                            >
                            <span class="control-state"
                              >${n ? "On" : "Off"}</span
                            >
                          </span>
                          <button
                            class="${n ? "on" : ""} ${s ? "confirm" : ""}"
                            type="button"
                            @click=${() => this._toggleSwitch(e, n)}
                          >
                            ${s ? "Confirm off" : n ? "On" : "Off"}
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
nt.stubConfig = { profile: "household-security" };
nt.styles = So;
Ee([
  y()
], nt.prototype, "_model", 2);
Ee([
  y()
], nt.prototype, "_camera", 2);
Ee([
  y()
], nt.prototype, "_confirmId", 2);
nt = Ee([
  k("component-camera-controller-v2")
], nt);
E({
  type: "component-camera-controller-v2",
  element: nt,
  name: "Camera Controller V2",
  description: "Platform-adapted camera controls with explicit state and protected destructive changes."
});
let Ii = class extends nt {
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      ...t,
      type: "custom:component-camera-controller-v1"
    });
  }
};
Ii = Ee([
  k("component-camera-controller-v1")
], Ii);
E({
  type: "component-camera-controller-v1",
  element: Ii,
  name: "Camera Controller V1",
  description: "Legacy camera controller adapter registering custom:component-camera-controller-v1."
});
const zo = x`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  button {
    appearance: none;
    border: 0;
    background: transparent;
    font: inherit;
    color: inherit;
    cursor: pointer;
  }
  ha-card {
    container-type: inline-size;
    overflow: hidden;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, var(--ha-card-border-radius, 6px));
    background: var(--dashboard-card-surface, var(--ha-card-background, var(--card-background-color)));
    box-shadow: none;
    color: var(--primary-text-color);
  }
  .w {
    padding: 12px 14px;
    border-left: 2px solid transparent;
  }
  .w:has(.well.not-closed) {
    border-left-color: var(
      --warning-color,
      var(--state-cover-open-color, var(--primary-color))
    );
    background: var(
      --dashboard-warning-surface,
      var(--card-background-color)
    );
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
    border-radius: var(--dashboard-radius-control, 8px);
  }
  .well {
    width: 40px;
    height: 40px;
    border-radius: var(--dashboard-radius-icon, 6px);
    display: grid;
    place-items: center;
    background: transparent;
    color: var(--secondary-text-color);
  }
  .well.not-closed {
    color: var(
      --warning-color,
      var(--state-cover-open-color, var(--primary-color))
    );
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
    font-weight: 650;
  }
  .state {
    margin-top: 3px;
    font-size: 13px;
    line-height: 1.25;
    color: var(--secondary-text-color);
  }
  .action {
    min-width: 104px;
    height: 44px;
    padding: 0 13px;
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: var(--primary-color);
    font-size: 13px;
    font-weight: 650;
  }
  .action.pending {
    color: var(--secondary-text-color);
  }
  button[disabled],
  button[aria-disabled="true"] {
    opacity: 0.5;
    cursor: default;
  }
  .feedback {
    min-height: 0;
    margin: 0;
    font-size: 13px;
    line-height: 1.35;
    color: var(--secondary-text-color);
  }
  .feedback:not(:empty) {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--divider-color);
  }
  .feedback.error {
    color: var(--error-color);
  }
  :is(button):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  @container (max-width: 340px) {
    .row {
      grid-template-columns: 1fr;
    }
    .action {
      width: 100%;
    }
  }
`;
var To = Object.defineProperty, Do = Object.getOwnPropertyDescriptor, ze = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Do(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && To(e, i, n), n;
};
let ut = class extends A {
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
    const t = this._entityState(this._config?.entity), e = this._entityState(this._controlEntityId()), i = this._entityState(this._config?.availability_entity), r = !!this._config?.availability_entity && (!i || i.state !== "on") || !e || rt(e), n = String(t?.state || "unknown").toLowerCase(), s = n === "on" || n === "off", a = s && n === "off", c = s && n === "on", l = !t || rt(t);
    return {
      state: t,
      control: e,
      controllerUnavailable: r,
      stateUnavailable: l,
      known: s,
      closed: a,
      notClosed: c,
      reed: n
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
      const n = setTimeout(() => {
        this._confirmation?.timer === n && (this._confirmation = null, r(new Error("Garage state confirmation timed out")));
      }, e);
      this._confirmation = { expected: t, resolve: i, reject: r, timer: n }, this._checkConfirmation();
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
      const n = this._controlEntityId();
      if (!n) return;
      const s = n.split(".")[0];
      if (s === "cover" ? await this.hass.callService("cover", "toggle", { entity_id: n }) : s === "switch" ? await this.hass.callService("switch", "toggle", { entity_id: n }) : s === "button" ? await this.hass.callService("button", "press", { entity_id: n }) : s === "script" ? await this.hass.callService("script", "turn_on", { entity_id: n }) : await this.hass.callService("homeassistant", "toggle", { entity_id: n }), i !== this._requestGeneration) return;
      this._pendingLabel = e === "on" ? "Opening" : e === "off" ? "Closing" : "Waiting";
      const a = await r;
      if (i !== this._requestGeneration) return;
      this._setMessage(
        a === "off" ? "Closed confirmed." : a === "on" ? "Door movement confirmed." : "Garage state confirmed."
      );
    } catch (n) {
      if (i !== this._requestGeneration) return;
      this._cancelConfirmation(
        n instanceof Error ? n : new Error("Garage command failed")
      );
      const s = String(n?.message || "");
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
    const t = this._status(), i = (t.state?.attributes?.friendly_name || "").replace(/\s*Garage Door Status$/i, "").trim(), r = this._config.title || i || "Garage door", n = t.controllerUnavailable ? "Controller unavailable" : t.closed ? "Closed" : t.notClosed ? "Not closed" : t.stateUnavailable ? "Door state unavailable" : "Door state unknown", s = t.closed ? "Open" : "Trigger", a = t.controllerUnavailable || this._busy;
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
                  >${this.esc(n)}</span
                >
              </span>
            </button>
            <button
              class="action ${this._busy ? "pending" : ""}"
              type="button"
              ?disabled=${a}
              aria-disabled="${String(a)}"
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
ut.styles = zo;
ze([
  y()
], ut.prototype, "_busy", 2);
ze([
  y()
], ut.prototype, "_pendingLabel", 2);
ze([
  y()
], ut.prototype, "_message", 2);
ze([
  y()
], ut.prototype, "_messageType", 2);
ut = ze([
  k("component-garage-door-controller-v1")
], ut);
E({
  type: "component-garage-door-controller-v1",
  element: ut,
  name: "Garage Door Controller",
  description: "A garage-door controller for a closed-position reed sensor and momentary operator trigger."
});
const Oo = x`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  [hidden] {
    display: none !important;
  }
  button,
  input {
    font: inherit;
    color: inherit;
  }
  button {
    appearance: none;
    border: 0;
    background: transparent;
    cursor: pointer;
  }
  ha-card {
    container-type: inline-size;
    overflow: hidden;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, var(--ha-card-border-radius, 6px));
    background: var(--dashboard-card-surface, var(--ha-card-background, var(--card-background-color)));
    box-shadow: none;
    color: var(--primary-text-color);
  }
  .w {
    padding: 12px 14px;
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
    border-radius: var(--dashboard-radius-control, 8px);
  }
  .iw {
    width: 40px;
    height: 40px;
    border-radius: var(--dashboard-radius-icon, 6px);
    display: grid;
    place-items: center;
    background: transparent;
    color: var(--primary-color);
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
    font-weight: 650;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .st {
    margin-top: 3px;
    font-size: 13px;
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
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    background: transparent;
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
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
    margin-top: 12px;
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
    font-size: 27px;
    line-height: 1;
    font-weight: 650;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
  .ml {
    display: block;
    margin-top: 6px;
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.2;
  }
  .tc {
    min-height: 48px;
    display: grid;
    grid-template-columns: 44px minmax(82px, auto) 44px;
    align-items: center;
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    background: transparent;
    overflow: hidden;
  }
  .tb {
    width: 44px;
    height: 48px;
    padding: 0;
    display: grid;
    place-items: center;
  }
  .tp {
    min-width: 0;
    padding: 0 8px;
    text-align: center;
  }
  .tv {
    font-size: 18px;
    line-height: 1.1;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
  .ts {
    margin-top: 3px;
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.1;
    white-space: nowrap;
  }
  .os,
  .uv {
    font-size: 13px;
    line-height: 1.35;
    color: var(--secondary-text-color);
  }
  .as {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  .a {
    min-width: 0;
    min-height: 44px;
    flex: 1 1 118px;
    padding: 0 10px;
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: var(--secondary-text-color);
  }
  .a ha-icon {
    --mdc-icon-size: 18px;
  }
  .al {
    min-width: 0;
    font-size: 13px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .a.av,
  .a[aria-expanded="true"] {
    color: var(--primary-color);
    background: var(--dashboard-active-surface, var(--card-background-color));
  }
  .pn {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    overscroll-behavior: contain;
    padding: 16px;
    background: var(--dashboard-modal-scrim, var(--ha-dialog-scrim-color, color-mix(in srgb, var(--primary-text-color) 32%, transparent)));
  }
  .pd {
    width: min(380px, calc(100vw - 32px));
    max-height: calc(100dvh - 32px);
    overflow: auto;
    overscroll-behavior: contain;
    padding: 12px 14px 14px;
    border: 1px solid var(--divider-color);
    border-radius: var(--dashboard-radius-dialog, 8px);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--dashboard-dialog-shadow, 0 16px 48px rgba(0, 0, 0, 0.22));
  }
  .ph {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .pt {
    margin: 0;
    font-size: 18px;
    line-height: 1.2;
    font-weight: 650;
  }
  .x {
    width: 44px;
    height: 44px;
    border-radius: var(--dashboard-radius-control, 8px);
    display: grid;
    place-items: center;
  }
  .og + .og {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--divider-color);
  }
  .gt {
    margin: 0 4px 8px;
    font-size: 13px;
    font-weight: 650;
    color: var(--secondary-text-color);
  }
  .qs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .o {
    min-height: 50px;
    width: 100%;
    padding: 0 10px;
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr) 20px;
    align-items: center;
    gap: 8px;
    text-align: left;
    background: transparent;
    font-size: 13px;
    font-weight: 600;
  }
  .oi {
    color: var(--secondary-text-color);
  }
  .o[aria-selected="true"] {
    color: var(--primary-color);
    box-shadow: inset 0 0 0 1px var(--primary-color);
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
    border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
    border-radius: var(--dashboard-radius-control, 5px);
    background: transparent;
    font-size: 13px;
    font-weight: 650;
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
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .tcu input {
    display: block;
    width: 100%;
    height: 44px;
    margin-top: 6px;
    padding: 0 11px;
    border: 1px solid var(--divider-color);
    border-radius: var(--dashboard-radius-control, 5px);
    background: transparent;
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
    font-size: 13px;
    line-height: 1.35;
    color: var(--secondary-text-color);
  }
  .fb:not(:empty) {
    margin-top: 10px;
  }
  .fb.er {
    color: var(--error-color);
  }
  :is(button, input):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
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
`;
var Po = Object.defineProperty, Ho = Object.getOwnPropertyDescriptor, cr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ho(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Po(e, i, n), n;
};
const se = (t) => !t || ["unknown", "unavailable"].includes(t.state), tt = (t) => String(t || "").replaceAll("_", " ").replace(/^./, (e) => e.toUpperCase()), ae = (t) => Number.isFinite(Number(t)) ? Number(t).toFixed(Number(t) % 1 ? 1 : 0) + "°" : "—";
let Bt = class extends A {
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
    if (!t || se(t)) return;
    if (t.state === "off") {
      const r = (t.attributes?.hvac_modes || []).find((n) => n !== "off") || "cool";
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
    return this._tempCoalescer ? this._tempCoalescer : (this._tempCoalescer = Qi(
      async (t) => {
        !this._config?.entity || !this.hass || (await this.hass.callService("climate", "set_temperature", {
          entity_id: this._config.entity,
          temperature: t
        }), await ue(
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
    const e = this._state()?.attributes || {}, i = this._optimisticTemp ?? Number(e.temperature) ?? 21, r = Number(e.target_temp_step || e.step) || 0.5, n = Number(e.min_temp) || 16, s = Number(e.max_temp) || 31, a = Math.min(s, Math.max(n, Number((i + t * r).toFixed(1))));
    this._optimisticTemp = a, this._getTempCoalescer().request(a);
  }
  _vanes() {
    return [
      ["Vertical", this._config?.vertical_vane_entity],
      ["Horizontal", this._config?.horizontal_vane_entity]
    ].flatMap(([e, i]) => {
      const r = this._state(i);
      return i && r && !se(r) ? [{ axis: e, entity: i, state: r }] : [];
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
    const t = this._state(), e = t?.attributes || {}, i = t && !se(t) && t.state !== "off", r = this._state(this._config.timer_entity), s = this._vanes().map((d) => `${d.axis.slice(0, 1)} ${tt(d.state.state)}`).join(" · "), a = this._config.title || e.friendly_name || "Split system", c = se(t) ? "Unavailable" : i ? tt(t?.state) : "Off", l = this._optimisticTemp ?? e.temperature, h = {
      cool: "mdi:snowflake",
      heat: "mdi:fire",
      dry: "mdi:water-percent",
      fan_only: "mdi:fan",
      auto: "mdi:thermostat-auto",
      off: "mdi:power"
    }, f = String(t?.state || "off").toLowerCase(), g = h[f] || "mdi:thermostat";
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
                <span class="nm">${this.esc(a)}</span>
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
              ?disabled=${se(t)}
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
                  >${ae(e.current_temperature)}</span
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
                  <div class="tv">${ae(l)}</div>
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
                aria-label="HVAC mode: ${tt(t?.state)}"
                @click=${() => this._openPanel("mode")}
              >
                <ha-icon icon="${g}"></ha-icon>
                <span class="al">Mode · ${tt(t?.state)}</span>
              </button>
              <button
                class="a fa"
                type="button"
                data-panel="fan"
                aria-expanded="${String(this._activePanel === "fan")}"
                aria-label="Fan speed: ${tt(e.fan_mode)}"
                @click=${() => this._openPanel("fan")}
              >
                <ha-icon icon="mdi:fan"></ha-icon>
                <span class="al">Fan · ${tt(e.fan_mode)}</span>
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
      const a = e.hvac_modes || [];
      return o`
        <div class="qs choices">
          ${a.map(
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
                <span>${tt(c)}</span>
                <span class="oi"><ha-icon icon="mdi:check"></ha-icon></span>
              </button>
            `
      )}
        </div>
      `;
    }
    if (this._activePanel === "fan") {
      const a = e.fan_modes || [];
      return o`
        <div class="qs choices">
          ${a.map(
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
                <span>${tt(c)}</span>
                <span class="oi"><ha-icon icon="mdi:check"></ha-icon></span>
              </button>
            `
      )}
        </div>
      `;
    }
    if (this._activePanel === "vanes") {
      const a = this._vanes();
      return o`
        ${a.map(
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
                      <span>${tt(l)}</span>
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
        ([a, c]) => o`
              <button
                type="button"
                @click=${() => {
          this._call("timer", "start", {
            entity_id: this._config?.timer_entity,
            duration: c
          }), this._closeOverlay();
        }}
              >
                ${a}
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
    const r = Number(e.min_temp), n = Number(e.max_temp), s = Number(e.target_temp_step) || 0.5;
    return o`
      <p class="fb">
        Native Home Assistant controls · ${ae(r)}–${ae(n)}
        · ${ae(s)} steps
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
    ].map((a) => {
      const c = typeof a == "string" ? a : a?.entity;
      if (!c) return "";
      const l = typeof a == "object" && a.name ? a.name : this._state(c)?.attributes?.friendly_name || c;
      return o`
            <button
              class="o setting"
              type="button"
              style="margin-bottom: 6px;"
              @click=${() => {
        const [h] = c.split(".");
        this._call(h, "turn_on", { entity_id: c }), this._closeOverlay();
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
Bt.styles = Oo;
cr([
  y()
], Bt.prototype, "_activePanel", 2);
cr([
  y()
], Bt.prototype, "_optimisticTemp", 2);
Bt = cr([
  k("component-split-controller-v4")
], Bt);
E({
  type: "component-split-controller-v4",
  element: Bt,
  name: "Split-System Controller",
  description: "Direct Home Assistant climate controls with the established Split System presentation."
});
const No = x`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  button,
  select,
  input {
    font: inherit;
    color: inherit;
  }
  ha-card {
    display: block;
    overflow: hidden;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 8px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    box-shadow: none;
    color: var(--primary-text-color);
  }
  .head {
    min-height: 58px;
    padding: 8px 8px 7px 10px;
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr) auto;
    align-items: center;
    gap: 9px;
  }
  .ico {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
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
    font-weight: 500;
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
    border: 1px solid var(--divider-color);
    background: transparent;
    border-radius: var(--dashboard-radius-control, 8px);
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
    --mdc-icon-size: 18px;
  }
  .on .power {
    color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  }
  .body {
    padding: 0 10px 10px;
    display: grid;
    gap: 8px;
  }
  .slider-row {
    display: grid;
    grid-template-columns: 74px minmax(0, 1fr) 38px;
    align-items: center;
    gap: 8px;
  }
  .label {
    font-size: 11px;
    color: var(--secondary-text-color);
  }
  .value {
    font-size: 11px;
    text-align: right;
    color: var(--secondary-text-color);
    font-variant-numeric: tabular-nums;
  }
  input[type="range"] {
    width: 100%;
    min-width: 0;
    accent-color: var(--primary-color);
  }
  .actions {
    display: flex;
    gap: 6px;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
  .action {
    min-height: 44px;
    padding: 0 9px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11.5px;
    color: var(--secondary-text-color);
  }
  .action ha-icon {
    --mdc-icon-size: 15px;
  }
  .action:hover,
  .action:focus-visible {
    color: var(--primary-text-color);
    background: var(--dashboard-card-muted-surface, var(--secondary-background-color));
  }
  dialog {
    width: min(620px, calc(100vw - 24px));
    max-height: min(760px, calc(100dvh - 24px));
    padding: 0;
    margin: auto;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-dialog, 10px);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--dashboard-dialog-shadow, 0 16px 48px rgba(0, 0, 0, 0.22));
    overflow: hidden;
  }
  dialog::backdrop {
    background: var(--dashboard-modal-scrim, rgba(0, 0, 0, 0.16));
    backdrop-filter: blur(3px);
  }
  .sheet {
    display: flex;
    flex-direction: column;
    max-height: min(760px, calc(100dvh - 24px));
  }
  .sheet-head {
    min-height: 54px;
    padding: 5px 7px 5px 14px;
    display: flex;
    align-items: center;
    gap: 9px;
    border-bottom: 1px solid var(--divider-color);
  }
  .sheet-head ha-icon {
    --mdc-icon-size: 18px;
    color: var(--secondary-text-color);
  }
  .sheet-title {
    min-width: 0;
    flex: 1;
  }
  .sheet-name {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sheet-state {
    margin-top: 2px;
    font-size: 11.5px;
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .close {
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
    border-color: transparent;
  }
  .close ha-icon {
    --mdc-icon-size: 18px;
  }
  .sheet-body {
    overflow: auto;
    overscroll-behavior: contain;
    padding: 12px 14px max(14px, env(safe-area-inset-bottom));
    display: grid;
    gap: 16px;
  }
  .section {
    display: grid;
    gap: 8px;
  }
  .section-title {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    font-weight: 500;
    color: var(--secondary-text-color);
  }
  .section-title:after {
    content: "";
    height: 1px;
    background: var(--divider-color);
    flex: 1;
  }
  .preset-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }
  .preset-btn {
    appearance: none;
    min-height: 44px;
    padding: 6px 9px;
    border: 1px solid var(--divider-color);
    border-radius: var(--dashboard-radius-control, 8px);
    background: transparent;
    color: var(--primary-text-color);
    text-align: left;
    font-size: 12px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .preset-btn:hover,
  .preset-btn:focus-visible {
    background: var(--dashboard-card-muted-surface, var(--secondary-background-color));
  }
  .preset-btn.active {
    border-color: color-mix(in srgb, var(--primary-color) 55%, var(--divider-color));
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
    color: var(--primary-color);
  }
  .fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .field {
    display: grid;
    gap: 4px;
    min-width: 0;
  }
  .field > span {
    font-size: 11px;
    color: var(--secondary-text-color);
    padding-left: 2px;
  }
  select {
    width: 100%;
    height: 44px;
    min-width: 0;
    padding: 0 28px 0 9px;
    border: 1px solid var(--divider-color);
    border-radius: var(--dashboard-radius-control, 8px);
    background: var(--card-background-color);
    font-size: 12px;
    outline: none;
  }
  .fine {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .fine-card {
    min-width: 0;
    padding: 8px 9px;
    border: 1px solid var(--divider-color);
    border-radius: var(--dashboard-radius-control, 8px);
  }
  .fine-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    margin-bottom: 4px;
  }
  .fine-head span,
  .fine-head output {
    font-size: 11px;
    color: var(--secondary-text-color);
  }
  .fine-head output {
    font-variant-numeric: tabular-nums;
  }
  .native {
    display: flex;
    justify-content: flex-end;
  }
  :is(button, select, input):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  button:disabled,
  select:disabled,
  input:disabled {
    opacity: 0.45;
    cursor: default;
  }
  @media (max-width: 520px) {
    dialog {
      width: 100vw;
      max-width: 100vw;
      height: 88dvh;
      max-height: 88dvh;
      margin: auto 0 0;
      border-width: 1px 0 0;
      border-radius: var(--dashboard-radius-dialog, 8px) var(--dashboard-radius-dialog, 8px) 0 0;
    }
    .sheet {
      height: 88dvh;
      max-height: 88dvh;
    }
    .sheet-body {
      padding: 10px 12px max(18px, env(safe-area-inset-bottom));
    }
    .preset-grid {
      grid-template-columns: 1fr;
    }
    .fields,
    .fine {
      grid-template-columns: 1fr;
    }
    .body {
      padding-left: 9px;
      padding-right: 9px;
    }
    .head {
      padding-left: 8px;
    }
    .slider-row {
      grid-template-columns: 68px minmax(0, 1fr) 36px;
    }
    .actions {
      justify-content: stretch;
    }
    .actions .action {
      flex: 1;
      justify-content: center;
    }
  }
`;
var Ro = Object.defineProperty, Io = Object.getOwnPropertyDescriptor, te = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Io(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Ro(e, i, n), n;
};
let st = class extends A {
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
    this.hass && R.load(this.hass).then((t) => {
      this._registries = t, this._bundle = this._resolveBundle();
    });
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = R.subscribe(this.hass, (t) => {
      this._registries = t, this._bundle = this._resolveBundle();
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._brightnessCoalescer?.destroy(), this._brightnessCoalescer = null, this._brightnessIntent = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    !this._unsubRegistry && this.isConnected && this.hass && (this._unsubRegistry = R.subscribe(this.hass, (t) => {
      this._registries = t, this._bundle = this._resolveBundle();
    })), !this._bundle && this.hass && this._registries && (this._bundle = this._resolveBundle());
  }
  _resolveBundle() {
    if (!this._config?.entity || !this.hass) return null;
    const e = (this._registries?.entities || []).find((b) => b.entity_id === this._config.entity), i = this._config.device_id || e?.device_id, n = ((i ? this._registries?.byDevice?.get(i) : []) || []).filter(
      (b) => b?.platform === "wled" && !b.disabled_by && this.hass?.states[b.entity_id]
    ), s = n.filter((b) => Hi(b.entity_id) === "light"), a = s.find((b) => b.entity_id === this._config.entity) || s.find((b) => $n(b) === "main") || s[0], c = s.filter(
      (b) => Array.isArray(this.hass?.states[b.entity_id]?.attributes?.effect_list)
    ), l = n.filter(
      (b) => Hi(b.entity_id) === "select"
    ), h = n.filter(
      (b) => Hi(b.entity_id) === "number"
    ), f = (b, z) => z.test(`${b.entity_id} ${b.original_name || ""} ${b.name || ""}`), g = l.find((b) => f(b, /\bpreset\b/i)), d = l.filter(
      (b) => f(b, /color.?palette|colour.?palette/i)
    ), u = h.filter((b) => f(b, /\bspeed\b/i)), p = h.filter((b) => f(b, /\bintensity\b/i)), _ = this._registries?.devices?.find((b) => b.id === i), m = a?.entity_id || this._config.entity, v = c.length ? c.map((b) => b.entity_id) : this.hass.states[m]?.attributes?.effect_list ? [m] : [], $ = _?.name_by_user || _?.name || this.hass?.states[m]?.attributes?.friendly_name || "WLED";
    return {
      deviceId: i || void 0,
      deviceName: $,
      main: m,
      effectLights: v,
      preset: g?.entity_id || null,
      palettes: d.map((b) => b.entity_id),
      speeds: u.map((b) => b.entity_id),
      intensities: p.map((b) => b.entity_id)
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
    await this.hass.callService("light", "toggle", { entity_id: t }), await ue(
      this.hass,
      t,
      (r) => r === (i ? "off" : "on"),
      { timeout: 5e3 }
    );
  }
  _getBrightnessCoalescer() {
    return this._brightnessCoalescer ? this._brightnessCoalescer : (this._brightnessCoalescer = Qi(
      async (t) => {
        const e = this._bundle?.main;
        !e || !this.hass || (t <= 0 ? await this.hass.callService("light", "turn_off", { entity_id: e }) : await this.hass.callService("light", "turn_on", {
          entity_id: e,
          brightness: t
        }), await ue(
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
      (r) => r != null && !Ur.has(String(r).toLowerCase())
    );
    return i.length ? i.every((r) => String(r) === String(i[0])) ? String(i[0]) : "Mixed" : null;
  }
  async _call(t, e, i, r = {}) {
    const n = [...new Set((i || []).filter(Boolean))];
    !this.hass || !n.length || await Promise.all(
      n.map(
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
    ), n = this.renderRoot.querySelector(
      ".advanced"
    ), s = this.renderRoot.querySelector(
      ".native-colour"
    ), a = this.renderRoot.querySelector(
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
    ), n && this._interactionHandles.push(
      S(n, {
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
    ), a && this._interactionHandles.push(
      S(a, {
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
    const e = this.hass.states[t.main], i = String(e?.state || "unavailable").toLowerCase(), r = i === "on", n = i === "on" || i === "off", s = r ? Number(e?.attributes?.brightness ?? 0) : 0, a = this._brightnessIntent ?? s, c = this._same(
      t.effectLights,
      (C) => C?.attributes?.effect
    ), l = this._same(t.palettes, (C) => C?.state), h = this._same(t.speeds, (C) => C?.state), f = this._same(t.intensities, (C) => C?.state), g = t.preset ? this.hass.states[t.preset] : null, d = g?.attributes?.options || [], u = r ? [
      this._pct(a),
      c && c !== "Mixed" ? c : null,
      l && l !== "Mixed" ? l : null
    ].filter(Boolean).join(" · ") : i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : "Off", p = (C) => {
      const O = this.hass?.states?.[C];
      return !!(O && !Ur.has(String(O.state).toLowerCase()));
    }, _ = !!(t.preset && p(t.preset)), m = t.effectLights.some(p), v = t.palettes.some(p), $ = t.speeds.some(p), b = t.intensities.some(p), P = t.effectLights.map((C) => this.hass?.states[C]).find(Boolean)?.attributes?.effect_list || [], I = t.palettes.map((C) => this.hass?.states[C]).find(Boolean)?.attributes?.options || [];
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
            ?disabled=${!n}
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
                      aria-valuenow="${String(Math.max(0, Math.min(255, Number.isFinite(a) ? a : 0)))}"
                      .value=${String(Math.max(0, Math.min(255, Number.isFinite(a) ? a : 0)))}
                      @input=${(C) => {
      const O = Number(C.target.value);
      this._brightnessIntent = O, this._getBrightnessCoalescer().request(O);
    }}
                    />
                    <output class="brightness-value value"
                      >${this._pct(a)}</output
                    >
                  </div>
                  <div class="actions">
                    <button
                      class="action presets"
                      type="button"
                      ?disabled=${!_}
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
                      ?disabled=${!(_ || m || v || $ || b)}
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
      const O = this.renderRoot.querySelector("dialog");
      C.target === O && O?.close();
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
      const O = String(g?.state) === String(C);
      return o`
                          <button
                            class="preset-btn ${O ? "active" : ""}"
                            type="button"
                            role="button"
                            aria-pressed="${String(O)}"
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
                    ?disabled=${!m || !P.length}
                    @change=${(C) => {
      const O = C.target.value;
      O && this._call("light", "turn_on", t.effectLights, {
        effect: O
      });
    }}
                  >
                    ${!c || c === "Mixed" ? o`<option value="" selected>
                            ${c === "Mixed" ? "Mixed" : "Choose effect"}
                          </option>` : ""}
                    ${P.map(
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
                    ?disabled=${!v || !I.length}
                    @change=${(C) => {
      const O = C.target.value;
      O && this._call("select", "select_option", t.palettes, {
        option: O
      });
    }}
                  >
                    ${!l || l === "Mixed" ? o`<option value="" selected>
                            ${l === "Mixed" ? "Mixed" : "Choose palette"}
                          </option>` : ""}
                    ${I.map(
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
                      >${this.esc(String((this._speedIntent ?? h) || "—"))}</output
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
                    aria-valuenow="${String((this._speedIntent ?? Number(h)) || 0)}"
                    .value=${String((this._speedIntent ?? Number(h)) || 0)}
                    ?disabled=${!$}
                    @input=${(C) => {
      this._speedIntent = Number(C.target.value);
    }}
                    @change=${(C) => {
      const O = Number(C.target.value);
      this._speedIntent = null, this._call("number", "set_value", t.speeds, {
        value: O
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
                    ?disabled=${!b}
                    @input=${(C) => {
      this._intensityIntent = Number(C.target.value);
    }}
                    @change=${(C) => {
      const O = Number(C.target.value);
      this._intensityIntent = null, this._call("number", "set_value", t.intensities, {
        value: O
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
st.styles = No;
te([
  y()
], st.prototype, "_registries", 2);
te([
  y()
], st.prototype, "_bundle", 2);
te([
  y()
], st.prototype, "_brightnessIntent", 2);
te([
  y()
], st.prototype, "_speedIntent", 2);
te([
  y()
], st.prototype, "_intensityIntent", 2);
st = te([
  k("component-wled-controller-v1")
], st);
E({
  type: "component-wled-controller-v1",
  element: st,
  name: "WLED Controller V1",
  description: "Minimal WLED control with advanced settings sheet."
});
const Lo = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 16px);
    }
    .wrap {
      padding: 12px 14px 14px;
    }
    .head {
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }
    h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 600;
    }
    .meta {
      font-size: 13px;
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
      font-size: 13px;
    }
    .empty[hidden] {
      display: none;
    }
    .tile {
      min-width: 0;
      overflow: hidden;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--secondary-background-color);
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
      background: var(--dashboard-media-surface, #111);
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
      min-height: 32px;
      padding: 0 9px;
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
      font-size: 12px;
      font-weight: 650;
    }
    .live-label[hidden],
    .offline .live-label {
      display: none;
    }
    .live-label ha-icon {
      --mdc-icon-size: 16px;
    }
    .offline .media:after {
      content: "Camera unavailable";
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      padding: 12px;
      background: color-mix(
        in srgb,
        var(--dashboard-media-surface, #111) 74%,
        transparent
      );
      color: var(--dashboard-media-on-surface, #fff);
      font-size: 13px;
      font-weight: 600;
      text-align: center;
    }
    .footer {
      min-height: 52px;
      padding: 4px 4px 4px 10px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 4px;
      background: var(--card-background-color);
    }
    .identity {
      min-width: 0;
      min-height: 44px;
      padding: 4px 0;
      text-align: left;
      cursor: pointer;
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
      font-weight: 650;
    }
    .state {
      margin-top: 3px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .more {
      min-width: 44px;
      height: 44px;
      padding: 0 10px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: var(--secondary-text-color);
      cursor: pointer;
    }
    .more:hover {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .more ha-icon {
      --mdc-icon-size: 20px;
    }
    .more span {
      font-size: 13px;
      font-weight: 600;
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
var Mo = Object.defineProperty, qo = Object.getOwnPropertyDescriptor, An = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? qo(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Mo(e, i, n), n;
};
let Ft = class extends A {
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
      const i = await Ae(
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
      (a) => t.includes(a.entityId) || a.deviceId && t.includes(a.deviceId) || t.includes(a.id)
    ) : e, r = i.filter((a) => a.online).length, n = this._model?.error ? "Unavailable" : `${r}/${i.length} online`, s = this._model?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : this._model?.error ? this._model.error.message || "Camera discovery is unavailable" : "No cameras available";
    return o`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <h2>${this.esc(this._config.title || "Camera wall")}</h2>
            <span class="meta">${this.esc(n)}</span>
          </div>

          ${i.length === 0 ? o`<div class="empty">${this.esc(s)}</div>` : o`
                  <div class="grid">
                    ${i.map((a) => {
      const l = this.hass?.states[a.entityId]?.attributes?.entity_picture, h = l ? this.hass?.hassUrl ? this.hass.hassUrl(l) : l : "", f = h ? `${h}${h.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "";
      return o`
                        <article
                          class="tile ${a.online ? "" : "offline"} ${a.active ? "activity" : ""}"
                        >
                          <button
                            class="media"
                            type="button"
                            ?disabled=${!a.online}
                            aria-label="Open full live view for ${this.esc(a.name)}"
                            @click=${(g) => this._requestViewer(a, g.currentTarget)}
                          >
                            ${f ? o`
                                  <img
                                    class="snapshot ready"
                                    src="${f}"
                                    alt="${this.esc(a.name)} camera snapshot"
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
                              ?disabled=${!a.online}
                              aria-label="Open full live view for ${this.esc(a.name)}"
                              @click=${(g) => this._requestViewer(a, g.currentTarget)}
                            >
                              <span class="name">${this.esc(a.name)}</span>
                              <span class="state">
                                ${a.active ? "Activity detected" : a.online ? "Online" : "Unavailable"}
                              </span>
                            </button>
                            <button
                              class="more"
                              type="button"
                              aria-label="Open settings for ${this.esc(a.name)}"
                              @click=${(g) => this._requestControls(a, g.currentTarget)}
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
Ft.stubConfig = { profile: "household-security", columns: 2 };
Ft.styles = Lo;
An([
  y()
], Ft.prototype, "_model", 2);
Ft = An([
  k("component-security-camera-wall-v3")
], Ft);
E({
  type: "component-security-camera-wall-v3",
  element: Ft,
  name: "Security Camera Wall V3",
  description: "Snapshot-first, lazy live camera wall with capability-driven controls."
});
const jo = [
  j,
  x`
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
var Uo = Object.defineProperty, Bo = Object.getOwnPropertyDescriptor, Te = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Bo(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Uo(e, i, n), n;
};
let at = class extends A {
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
      const i = await Ae(
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
    ) : i, n = this._config.entries, s = t.entries || [], a = n && n.length > 0 ? s.filter(
      (d) => n.includes(d.entityId) || d.deviceId && n.includes(d.deviceId)
    ) : s, c = t.quickActions || [], l = (t.attention || []).length, h = !!(t.error || t.profileError || t.profileMissing), f = r.reduce(
      (d, u) => d + (u.detections || []).filter(
        (p) => this.hass?.states?.[p.entity_id]?.state === "on"
      ).length,
      0
    ), g = a.filter((d) => d.available && d.open).length;
    return o`
      <div class="page">
        <section class="panel hero">
          <div class="hero-main">
            <span
              class="hero-icon ${l > 0 || h ? "attention" : ""}"
            >
              <ha-icon
                icon="${h || l > 0 ? "mdi:shield-alert-outline" : "mdi:shield-check-outline"}"
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
      const p = this.hass?.states[d.entityId]?.attributes?.entity_picture, _ = p ? this.hass?.hassUrl ? this.hass.hassUrl(p) : p : "", m = _ ? `${_}${_.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "", v = d.classifications || [];
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
                              ${v.length ? `Recent: ${v.map(($) => $.name).join(" · ")}` : "No detection image entities"}
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
                              ?disabled=${!(v.length || d.detections?.length)}
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

        ${a.length ? o`
                <section class="panel section entry-section">
                  <div class="section-head">
                    <h2 class="section-title">Entry points</h2>
                    <span class="section-meta">${g} open</span>
                  </div>
                  <div class="entries">
                    ${a.map((d) => {
      const u = this._entryConfirmId === d.entityId, p = !!(d.controlEntityId || d.domain === "lock" || d.domain === "cover"), _ = d.domain === "lock" ? d.open ? "Lock" : "Unlock" : d.open ? "Close" : "Open";
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
                            ${p ? o`
                                    <button
                                      class="entry-operate ${u ? "confirm" : ""}"
                                      type="button"
                                      ?disabled=${!d.available}
                                      aria-label="${u ? "Confirm " + _ : _} for ${this.esc(d.name)}"
                                      @click=${() => this._operateEntry(d)}
                                    >
                                      ${u ? "Confirm" : _}
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
      const p = this.hass?.states[d.entity.entity_id]?.attributes?.entity_picture;
      return o`
                              <button
                                class="detection"
                                type="button"
                                @click=${() => {
        this._closeSettings(), this.moreInfo(d.entity.entity_id);
      }}
                              >
                                ${p ? o`<img src="${p}" alt="${this.esc(d.name)}" />` : ""}
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
      const p = this.hass?.states[d.entity.entity_id]?.state === "on";
      return o`
                              <div class="control-row">
                                <span>
                                  <span class="control-name"
                                    >${this.esc(d.role || "Control")}</span
                                  >
                                  <span class="control-state"
                                    >${p ? "On" : "Off"}</span
                                  >
                                </span>
                                <button
                                  class="control-toggle ${p ? "on" : ""}"
                                  type="button"
                                  @click=${async () => {
        await this.hass?.callService(
          "switch",
          p ? "turn_off" : "turn_on",
          { entity_id: d.entity.entity_id }
        ), this._refresh(!0);
      }}
                                >
                                  ${p ? "Turn off" : "Turn on"}
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
at.stubConfig = {
  profile: "household-security",
  camera_columns: 2
};
at.styles = jo;
Te([
  y()
], at.prototype, "_model", 2);
Te([
  y()
], at.prototype, "_viewerCamera", 2);
Te([
  y()
], at.prototype, "_settingsCamera", 2);
Te([
  y()
], at.prototype, "_entryConfirmId", 2);
at = Te([
  k("component-security-dashboard-v1")
], at);
E({
  type: "component-security-dashboard-v1",
  element: at,
  name: "Security Dashboard V1",
  description: "Single-owner Security dashboard with on-demand live video, detections, controls, quick actions and entry points."
});
const Fo = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
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
      font-weight: 600;
    }
    .list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .entry {
      appearance: none;
      min-width: 0;
      min-height: 60px;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr);
      align-items: center;
      gap: 9px;
      cursor: pointer;
    }
    .entry:hover {
      background: var(--secondary-background-color);
    }
    .entry:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .icon {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
    }
    .open .icon {
      color: var(--warning-color, var(--primary-color));
    }
    .icon ha-icon {
      --mdc-icon-size: 21px;
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
      font-weight: 650;
    }
    .state {
      margin-top: 3px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .list {
        grid-template-columns: 1fr;
      }
    }
  `
];
var Vo = Object.defineProperty, Wo = Object.getOwnPropertyDescriptor, En = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Wo(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Vo(e, i, n), n;
};
let Vt = class extends A {
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
      const i = await Ae(
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
Vt.stubConfig = { profile: "household-security" };
Vt.styles = Fo;
En([
  y()
], Vt.prototype, "_model", 2);
Vt = En([
  k("component-security-entry-points-v1")
], Vt);
E({
  type: "component-security-entry-points-v1",
  element: Vt,
  name: "Security Entry Points V1",
  description: "Capability-driven garage, door, window and lock status using the shared garage controller where available."
});
const Go = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 16px);
    }
    .wrap {
      padding: 12px 14px;
    }
    .top {
      min-height: 44px;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
    }
    .icon {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      background: var(--secondary-background-color);
      color: var(--secondary-text-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 22px;
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
      font-size: 15px;
      line-height: 1.2;
      font-weight: 650;
    }
    .detail {
      margin-top: 3px;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.3;
    }
    .count {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .attention {
      display: grid;
      gap: 6px;
      margin-top: 8px;
    }
    .attention button {
      appearance: none;
      width: 100%;
      min-height: 44px;
      padding: 8px 10px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: left;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .attention button:hover {
      background: var(--secondary-background-color);
    }
    .attention button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .attention ha-icon {
      --mdc-icon-size: 18px;
      color: var(--warning-color, var(--primary-color));
    }
    .attention span {
      font-size: 13px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .error {
      color: var(--error-color);
    }
    @media (max-width: 420px) {
      .wrap {
        padding: 12px;
      }
      .count {
        display: none;
      }
    }
  `
];
var Ko = Object.defineProperty, Yo = Object.getOwnPropertyDescriptor, zn = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Yo(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Ko(e, i, n), n;
};
let Wt = class extends A {
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
      const i = await Ae(
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
    const t = this._model, e = t?.error || t?.profileError, i = !e && !!t?.allClear, r = this._config.title || "Security", n = t?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : e ? e.message || "Security status is unavailable" : i ? "All clear" : `${t?.attention?.length || 0} item${(t?.attention?.length || 0) === 1 ? "" : "s"} need attention`, s = e ? "Unavailable" : `${t?.onlineCameras || 0}/${t?.cameras?.length || 0} cameras online`, a = (t?.attention || []).slice(0, 4);
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
                >${this.esc(n)}</span
              >
            </span>
            <span class="count">${this.esc(s)}</span>
          </div>

          ${a.length ? o`
                  <div class="attention">
                    ${a.map(
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
Wt.stubConfig = { profile: "household-security" };
Wt.styles = Go;
zn([
  y()
], Wt.prototype, "_model", 2);
Wt = zn([
  k("component-security-summary-v1")
], Wt);
E({
  type: "component-security-summary-v1",
  element: Wt,
  name: "Security Summary V1",
  description: "Exception-first all-clear and attention summary discovered from Home Assistant capabilities."
});
const Qo = x`
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
`, Xo = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 16px);
    }
    .row {
      min-height: 56px;
      padding: 6px 8px;
      display: grid;
      grid-template-columns: 44px minmax(0, 1fr) 44px auto;
      align-items: center;
      gap: 8px;
    }
    button {
      appearance: none;
      min-width: 44px;
      min-height: 44px;
      border: 0;
      border-radius: 12px;
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: pointer;
    }
    button:focus-visible,
    .date:focus-within {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    button:disabled {
      color: var(--disabled-text-color, var(--secondary-text-color));
      cursor: default;
      opacity: 0.45;
    }
    .step {
      display: grid;
      place-items: center;
    }
    ha-icon {
      --mdc-icon-size: 22px;
    }
    .date {
      position: relative;
      min-width: 0;
      min-height: 44px;
      padding: 4px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: 12px;
      background: var(--secondary-background-color);
      overflow: hidden;
    }
    .label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      font-weight: 650;
    }
    .state {
      flex: 0 0 auto;
      padding: 3px 7px;
      border-radius: 999px;
      background: var(--card-background-color);
      color: var(--secondary-text-color);
      font-size: 13px;
      font-weight: 600;
    }
    .state.historical {
      color: var(--primary-color);
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
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      color: var(--primary-color);
      background: var(--secondary-background-color);
      font-size: 13px;
      font-weight: 650;
    }
    .today:disabled {
      opacity: 0.55;
    }
    @media (max-width: 420px) {
      .row {
        grid-template-columns: 44px minmax(0, 1fr) 44px 44px;
        gap: 4px;
        padding: 6px;
      }
      .today {
        width: 44px;
        padding: 0;
      }
      .today span {
        display: none;
      }
    }
  `
];
var Zo = Object.defineProperty, Jo = Object.getOwnPropertyDescriptor, Tn = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Jo(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Zo(e, i, n), n;
};
let Gt = class extends A {
  constructor() {
    super(...arguments), this._selected = L.today(), this._unsubscribe = null, this._interactionHandles = [];
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
    this._selected = L.get(i, this.hass), this.isConnected && e !== i && (this._unsubscribe?.(), this._unsubscribe = L.subscribe(
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
    return this._selected === L.today(this.hass);
  }
  _setDay(t) {
    this._selected = L.set(
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
    super.connectedCallback(), this._unsubscribe || (this._unsubscribe = L.subscribe(
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
    for (const n of this._interactionHandles) n.destroy();
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
        primary: () => this._setDay(L.today(this.hass)),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._isToday(), e = L.today(this.hass), i = ui(this.hass, this._selected, {
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
Gt.stubConfig = { channel: "energy-day" };
Gt.styles = Xo;
Tn([
  y()
], Gt.prototype, "_selected", 2);
Gt = Tn([
  k("component-energy-day-selector-v1")
], Gt);
E({
  type: "component-energy-day-selector-v1",
  element: Gt,
  name: "Energy Day Selector",
  description: "Stable selected-day control shared by every Energy card."
});
const tc = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 16px);
    }
    .wrap {
      padding: 12px 14px 14px;
    }
    .head {
      min-height: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }
    h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 600;
    }
    .context {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 13px;
    }
    .day {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .state {
      flex: 0 0 auto;
      padding: 3px 7px;
      border-radius: 999px;
      background: var(--secondary-background-color);
      font-weight: 600;
    }
    .state.now {
      color: var(--primary-color);
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
      min-height: 68px;
      padding: 10px 11px;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px);
      background: transparent;
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
      background: var(--secondary-background-color);
    }
    .metric:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .value {
      font-size: 22px;
      line-height: 1;
      font-weight: 650;
      letter-spacing: -0.025em;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      margin-top: 6px;
      font-size: 13px;
      line-height: 1.2;
      font-weight: 500;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .daily .value {
      font-size: 18px;
    }
    .daily .metric {
      min-height: 62px;
    }
    .feedback {
      min-height: 18px;
      margin-top: 8px;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.35;
    }
    .feedback.error {
      color: var(--error-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 12px;
      }
      .daily {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .value {
        font-size: 20px;
      }
    }
    @media (max-width: 420px) {
      .live {
        grid-template-columns: 1fr;
      }
      .metric {
        min-height: 58px;
      }
      .live .metric {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
      }
      .live .label {
        grid-column: 1;
        grid-row: 1;
        margin: 0;
      }
      .live .value {
        grid-column: 2;
        grid-row: 1;
      }
      .head {
        align-items: flex-start;
      }
      .context {
        justify-content: flex-end;
      }
    }
  `
];
var ec = Object.defineProperty, ic = Object.getOwnPropertyDescriptor, De = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ic(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && ec(e, i, n), n;
};
let ot = class extends A {
  constructor() {
    super(...arguments), this._data = null, this._error = null, this._loading = !1, this._day = L.today(), this._sequence = 0, this._dayUnsub = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === (this._config?.profile || "household-energy") && (this.hass && We.invalidateProfile(
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
    this._day = L.get(i, this.hass), this.isConnected && e !== i && (this._dayUnsub?.(), this._dayUnsub = L.subscribe(
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
    ), this._dayUnsub || (this._dayUnsub = L.subscribe(
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
      const i = await We.get(
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
    const t = this._data, e = this._day === L.today(this.hass), i = e ? "Today" : ui(this.hass, this._day, {
      weekday: "short",
      day: "numeric",
      month: "short"
    }), r = t?.grid_w == null ? Number.NaN : Number(t.grid_w), n = Number.isFinite(r) ? r > 15 ? "Importing now" : r < -15 ? "Exporting now" : "Grid balanced" : "Grid unavailable", s = Number(t?.coverage), a = this._error ? /unknown energy profile/i.test(this._error.message || "") ? `Configure ${this._config.profile || "household-energy"} in HA Component Backend` : this._error.message || "Energy data is unavailable" : this._loading ? this._data ? "Updating…" : "Loading Energy data…" : t?.stale ? "Showing the last successful update" : Number.isFinite(s) && s < 1 ? `${Math.round(s * 100)}% of source data available` : "";
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
              aria-label="House power now: ${et(this.hass, t?.house_w)}"
            >
              <span class="value"
                >${et(this.hass, t?.house_w)}</span
              >
              <span class="label">House now</span>
            </button>
            <button
              class="metric solar"
              type="button"
              aria-label="Solar power now: ${et(this.hass, t?.solar_w)}"
            >
              <span class="value"
                >${et(this.hass, t?.solar_w)}</span
              >
              <span class="label">Solar now</span>
            </button>
            <button
              class="metric grid"
              type="button"
              aria-label="Grid power now: ${et(this.hass, t?.grid_w, { absolute: !0 })}, ${n}"
            >
              <span class="value"
                >${et(this.hass, t?.grid_w, { absolute: !0 })}</span
              >
              <span class="label">${this.esc(n)}</span>
            </button>
          </div>

          <div class="daily">
            <button class="metric consumed" type="button" disabled>
              <span class="value"
                >${pt(this.hass, t?.consumed_kwh)}</span
              >
              <span class="label">Consumed</span>
            </button>
            <button class="metric generated" type="button" disabled>
              <span class="value"
                >${pt(this.hass, t?.generated_kwh)}</span
              >
              <span class="label">Generated</span>
            </button>
            <button class="metric imported" type="button" disabled>
              <span class="value"
                >${pt(this.hass, t?.imported_kwh)}</span
              >
              <span class="label">Imported</span>
            </button>
            <button class="metric exported" type="button" disabled>
              <span class="value"
                >${pt(this.hass, t?.exported_kwh)}</span
              >
              <span class="label">Exported</span>
            </button>
          </div>

          ${a ? o`
                  <div
                    class="feedback ${this._error ? "error" : ""}"
                    role="status"
                  >
                    ${this.esc(a)}
                  </div>
                ` : ""}
        </div>
      </ha-card>
    `;
  }
};
ot.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
ot.styles = tc;
De([
  y()
], ot.prototype, "_data", 2);
De([
  y()
], ot.prototype, "_error", 2);
De([
  y()
], ot.prototype, "_loading", 2);
De([
  y()
], ot.prototype, "_day", 2);
ot = De([
  k("component-energy-summary-v1")
], ot);
E({
  type: "component-energy-summary-v1",
  element: ot,
  name: "Energy Summary V1",
  description: "Stable backend-driven live power and selected-day Energy totals."
});
const rc = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 16px);
    }
    button {
      appearance: none;
      width: 100%;
      min-height: 44px;
      box-sizing: border-box;
      border: 0;
      background: transparent;
      font: inherit;
      padding: 12px 14px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center;
      gap: 16px;
      cursor: pointer;
      font-size: 11.5px;
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
      border-radius: var(--ha-card-border-radius, 16px);
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
      gap: 18px;
      min-width: 0;
      color: var(--secondary-text-color);
    }
    .cloud-item {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .cloud-label {
      font-weight: 500;
    }
    .cloud-value {
      font-weight: 600;
      color: var(--primary-text-color);
    }
    @media (max-width: 900px) {
      button {
        gap: 10px;
        padding: 11px 12px;
        font-size: 11px;
      }
      .clouds {
        gap: 10px;
      }
      .cloud-item {
        gap: 3px;
      }
    }
    @media (max-width: 650px) {
      button {
        font-size: 11px;
        gap: 6px;
        padding: 10px;
      }
      .clouds {
        gap: 7px;
      }
    }
  `
];
var nc = Object.defineProperty, sc = Object.getOwnPropertyDescriptor, Dn = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? sc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && nc(e, i, n), n;
};
const ac = {
  type: "custom:solar-daylight-card-v7",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let ve = class extends A {
  constructor() {
    super(...arguments), this._forecast = [], this._lastFetch = 0, this._pending = !1, this._failures = 0, this._retryAt = 0, this._interactionHandle = null;
  }
  setConfig(t) {
    const e = this._config?.weather_entity;
    super.setConfig({ ...ac, ...t }), this._config?.weather_entity !== e && (this._forecast = [], this._lastFetch = 0), this._fetchForecast();
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
    return Number.isNaN(e.getTime()) ? "" : Be(this.hass, e);
  }
  _cloud(t) {
    const e = this._num(t);
    return e === null ? "—" : `${Math.round(Math.min(100, Math.max(0, e)))}%`;
  }
  _at(t) {
    if (!this._forecast.length) return null;
    const e = Date.now() + t * 36e5;
    let i = null, r = 1 / 0;
    for (const n of this._forecast) {
      const s = new Date(n.datetime || 0).getTime(), a = this._num(n.cloud_coverage);
      if (!Number.isFinite(s) || a === null) continue;
      const c = Math.abs(s - e);
      c < r && (r = c, i = a);
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
    const t = this._config.sun_entity || "sun.sun", e = this._config.weather_entity || "weather.forecast_home", i = this.hass?.states[t], r = this.hass?.states[e], n = !!(i && ["above_horizon", "below_horizon"].includes(i.state));
    let s = "Sun state unavailable", a = "";
    if (n)
      if (i?.state === "above_horizon") {
        const p = this._num(i.attributes?.elevation, 0), _ = this._time(i.attributes?.next_setting);
        s = `Sun ${Math.round(p || 0)}°`, a = _ ? `Sunset ${_}` : "Daylight";
      } else {
        const p = this._time(i?.attributes?.next_rising);
        s = "Night", a = p ? `Sunrise ${p}` : "Before sunrise";
      }
    const c = this._num(r?.attributes?.cloud_coverage), l = this._at(4), h = this._at(8), f = this._cloud(c), g = this._cloud(l), d = this._cloud(h), u = `${s}, cloud coverage ${f}, plus 4 hours ${g}, plus 8 hours ${d}, ${a}. Tap for sun details; hold for weather details.`;
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
          <span class="event">${this.esc(a)}</span>
        </button>
      </ha-card>
    `;
  }
};
ve.styles = rc;
Dn([
  y()
], ve.prototype, "_forecast", 2);
ve = Dn([
  k("solar-daylight-card-v7")
], ve);
E({
  type: "solar-daylight-card-v7",
  element: ve,
  name: "Solar Daylight Context",
  description: "Full-width sun context with centred current and forecast cloud coverage."
});
const oc = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 16px);
    }
    .wrap {
      box-sizing: border-box;
      padding: 4px 5px 5px;
    }
    .top {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 5px;
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
      border-radius: 5px;
    }
    .swatch {
      width: 17px;
      height: 3px;
      border-radius: 999px;
      display: inline-block;
    }
    .house-swatch {
      background: var(--primary-color);
    }
    .solar-swatch {
      background: var(--warning-color, #f5b942);
    }
    .grid-swatch {
      background: var(--secondary-text-color);
    }
    .chart {
      position: relative;
      width: 100%;
      height: clamp(400px, 48vw, 520px);
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
      opacity: 0.58;
    }
    .zero {
      stroke: var(--divider-color);
      stroke-width: 1.35;
      opacity: 0.95;
    }
    .house-line {
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 3;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .solar-line {
      fill: none;
      stroke: var(--warning-color, #f5b942);
      stroke-width: 2.6;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .solar-fill {
      fill: color-mix(in srgb, var(--warning-color, #f5b942) 12%, transparent);
    }
    .grid-line {
      fill: none;
      stroke: var(--secondary-text-color);
      stroke-width: 2.2;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .cursor {
      stroke: var(--secondary-text-color);
      stroke-width: 1;
      stroke-dasharray: 3 3;
      opacity: 0;
      vector-effect: non-scaling-stroke;
    }
    .tooltip {
      position: absolute;
      z-index: 2;
      min-width: 150px;
      padding: 10px 11px;
      border-radius: 11px;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      box-shadow: 0 7px 22px rgba(0, 0, 0, 0.2);
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, -100%);
      font-size: 12px;
      line-height: 1.45;
    }
    .tooltip.show {
      opacity: 1;
    }
    .tooltip-time {
      font-size: 12.5px;
      font-weight: 650;
      color: var(--primary-text-color);
      margin-bottom: 5px;
    }
    .tip-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      color: var(--secondary-text-color);
    }
    .tip-row b {
      font-weight: 650;
      color: var(--primary-text-color);
    }
    .status {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      font-size: 13px;
      pointer-events: none;
    }
    .status[hidden] {
      display: none;
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 3px;
      }
      .top {
        padding: 0 4px;
      }
      .legend {
        gap: 9px;
      }
      .legend button {
        font-size: 10.5px;
      }
      .meta {
        font-size: 13px;
      }
      .chart {
        height: 400px;
      }
      .axis {
        font-size: 10px;
      }
      .axis-small {
        font-size: 9.5px;
      }
      .tooltip {
        font-size: 11.5px;
        min-width: 140px;
        padding: 9px 10px;
      }
    }
  `
];
var cc = Object.defineProperty, lc = Object.getOwnPropertyDescriptor, ki = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? lc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && cc(e, i, n), n;
};
const dc = {
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
let kt = class extends A {
  constructor() {
    super(...arguments), this._series = {}, this._loading = !1, this._selectedDay = null, this._start = 0, this._end = 0, this._lastRangeKey = null, this._forceRefresh = !1, this._fetchSequence = 0, this._dayUnsubscribe = null, this._pinned = !1, this._pointerState = null, this._resizeObserver = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === this._config?.profile && (this.hass && this._config?.profile && We.invalidateProfile(this.hass, this._config.profile), this._forceRefresh = !0, this._lastRangeKey = null, this._fetchData());
    }, this._outsideListener = (t) => {
      this._pinned && !t.composedPath?.().includes(this) && (this._pinned = !1);
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = { ...dc, ...t || {} };
    e.profile && (e.calendar_day = !0), super.setConfig(e), this._config?.day_channel && this.hass && (this._selectedDay = L.get(
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
    this._dayUnsubscribe?.(), this._dayUnsubscribe = null, !(!this._config?.calendar_day || !this._config?.day_channel) && (this._dayUnsubscribe = L.subscribe(
      this._config.day_channel,
      (t) => {
        t.day !== this._selectedDay && (this._selectedDay = t.day, this._lastRangeKey = null, this._fetchData());
      },
      { hass: this.hass }
    ));
  }
  _range() {
    if (this._config?.calendar_day) {
      const r = L.today(this.hass), n = this._selectedDay && this._selectedDay <= r ? this._selectedDay : r, s = Yr(this.hass, n), a = s?.start ?? Date.now() - 864e5, c = s?.end ?? Date.now();
      return { start: a, end: c, day: n, isToday: n === r };
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
        const n = await We.get(
          this.hass,
          this._config.profile,
          t.day,
          { force: r }
        );
        if (i !== this._fetchSequence) return;
        const s = Array.isArray(n?.series) ? n.series : [];
        this._series = {
          house: s.map((a) => ({
            t: new Date(a.start).getTime(),
            v: Number(a.house) || 0
          })),
          solar: s.map((a) => ({
            t: new Date(a.start).getTime(),
            v: Number(a.solar) || 0
          })),
          grid: s.map((a) => ({
            t: new Date(a.start).getTime(),
            v: Number(a.grid) || 0
          }))
        }, this._start = Number(n?.range?.start) || t.start, this._end = Number(n?.range?.end) || t.end;
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
    const n = [];
    let s = "", a = null, c = [];
    const l = () => {
      if (!c.length) return;
      const h = c.map(
        (f, g) => `${g ? "L" : "M"}${e(f.t).toFixed(1)},${i(f.v).toFixed(1)}`
      ).join(" ");
      if (n.push(h), r !== null) {
        const f = c[0], g = c[c.length - 1];
        s += `${h} L${e(g.t).toFixed(1)},${r.toFixed(1)} L${e(f.t).toFixed(1)},${r.toFixed(1)} Z `;
      }
      c = [];
    };
    for (const h of t || [])
      a !== null && h.t - a > 15 * 6e4 && l(), c.push(h), a = h.t;
    return l(), { line: n.join(" "), fill: s.trim() };
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
    const t = (this._series.house?.length || 0) > 0 || (this._series.solar?.length || 0) > 0 || (this._series.grid?.length || 0) > 0, e = this._config.calendar_day ? this._selectedDay === L.today(this.hass) ? "Today" : ui(this.hass, this._selectedDay || "", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }) : null, i = e ? `${e} · ${this._config.bucket_minutes || 10}-minute average` : `${this._config.bucket_minutes || 10}-minute average`, r = 800, n = 420, s = 58, a = 8, c = 6, l = Math.round(n * 0.7), h = l + 20, f = h + 18, g = n - 18, d = s, u = r - a, p = this._start || Date.now() - 864e5, _ = this._end || Date.now(), m = (H) => d + (H - p) / (_ - p) * (u - d), v = [
      ...this._series.house || [],
      ...this._series.solar || []
    ].map((H) => Math.max(0, H.v)), $ = this._niceMax(Math.max(1, ...v) * 1.06), b = (H) => l - Math.max(0, H) / $ * (l - c), z = Math.max(
      100,
      ...(this._series.grid || []).map((H) => Math.abs(H.v))
    ), P = this._niceMax(z * 1.08), N = (f + g) / 2, I = (H) => N - H / P * ((g - f) / 2), C = this._paths(this._series.house, m, b), O = this._paths(this._series.solar, m, b, l), F = this._paths(this._series.grid, m, I);
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
              viewBox="0 0 ${r} ${n}"
              role="img"
              aria-label="Household power history"
              @pointerdown=${(H) => {
      this._pointerState = {
        id: H.pointerId,
        x: H.clientX,
        y: H.clientY,
        moved: !1
      };
    }}
              @pointermove=${(H) => {
      this._pointerState && Math.hypot(
        H.clientX - this._pointerState.x,
        H.clientY - this._pointerState.y
      ) > 6 && (this._pointerState.moved = !0);
    }}
              @pointerup=${() => {
      this._pointerState = null;
    }}
            >
              ${[0, 1, 2, 3, 4].map((H) => {
      const U = $ * (1 - H / 4), B = c + (l - c) * (H / 4);
      return o`
                  <line
                    class="gridline"
                    x1="${d}"
                    y1="${B}"
                    x2="${u}"
                    y2="${B}"
                  ></line>
                  <text
                    class="axis"
                    x="${d - 8}"
                    y="${B + 4}"
                    text-anchor="end"
                  >
                    ${et(this.hass, U)}
                  </text>
                `;
    })}
              ${[0, 1, 2, 3, 4, 5, 6].map((H) => {
      const U = p + (_ - p) * H / 6, B = m(U), Et = new Date(U).getMinutes() === 0 ? Be(this.hass, U, { minute: void 0 }) : Be(this.hass, U);
      return o`
                  <text
                    class="axis"
                    x="${B}"
                    y="${h}"
                    text-anchor="${H === 0 ? "start" : H === 6 ? "end" : "middle"}"
                  >
                    ${Et}
                  </text>
                `;
    })}

              <line
                class="zero"
                x1="${d}"
                y1="${N}"
                x2="${u}"
                y2="${N}"
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

              ${O.fill ? o`<path class="solar-fill" d="${O.fill}"></path>` : ""}
              ${O.line ? o`<path class="solar-line" d="${O.line}"></path>` : ""}
              ${C.line ? o`<path class="house-line" d="${C.line}"></path>` : ""}
              ${F.line ? o`<path class="grid-line" d="${F.line}"></path>` : ""}
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
kt.styles = oc;
ki([
  y()
], kt.prototype, "_series", 2);
ki([
  y()
], kt.prototype, "_loading", 2);
ki([
  y()
], kt.prototype, "_selectedDay", 2);
kt = ki([
  k("energy-history-card-v3")
], kt);
E({
  type: "energy-history-card-v3",
  element: kt,
  name: "Energy History",
  description: "Dense readable power history supporting rolling or local calendar-day ranges using completed 10-minute averages and a signed grid strip."
});
var pc = Object.getOwnPropertyDescriptor, hc = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? pc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const uc = {
  type: "custom:component-energy-dashboard-v1",
  profile: "household-energy",
  day_channel: "energy-day",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let be = class extends A {
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...uc, ...t });
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
be.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
be.styles = Qo;
be = hc([
  k("component-energy-dashboard-v1")
], be);
E({
  type: "component-energy-dashboard-v1",
  element: be,
  name: "Energy Dashboard V1",
  description: "Single-card Energy composition using shared day state and one backend data contract."
});
const mc = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 16px);
    }
    .wrap {
      box-sizing: border-box;
      padding: 4px 5px 5px;
    }
    .top {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 0 5px;
    }
    .meta {
      font-size: 11.5px;
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
      border-radius: 5px;
    }
    .sw {
      width: 17px;
      height: 3px;
      border-radius: 999px;
    }
    .s1 {
      background: var(--primary-color);
    }
    .s2 {
      background: var(--warning-color, #f5b942);
    }
    .s3 {
      background: var(--secondary-text-color);
    }
    .chart {
      position: relative;
      width: 100%;
      height: clamp(400px, 48vw, 520px);
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
      stroke-width: 1;
      opacity: 0.58;
    }
    .zero {
      stroke: var(--divider-color);
      stroke-width: 1.35;
      opacity: 0.95;
    }
    .l1 {
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 3;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .l2 {
      fill: none;
      stroke: var(--warning-color, #f5b942);
      stroke-width: 2.6;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .f2 {
      fill: color-mix(in srgb, var(--warning-color, #f5b942) 12%, transparent);
    }
    .l3 {
      fill: none;
      stroke: var(--secondary-text-color);
      stroke-width: 2.2;
      stroke-linejoin: round;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .cursor {
      stroke: var(--secondary-text-color);
      stroke-width: 1;
      stroke-dasharray: 3 3;
    }
    .tip {
      position: absolute;
      min-width: 145px;
      padding: 9px 10px;
      border-radius: 11px;
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      box-shadow: 0 7px 22px rgba(0, 0, 0, 0.2);
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, -100%);
      font-size: 11.5px;
      line-height: 1.45;
    }
    .tip.show {
      opacity: 1;
    }
    .tip b {
      color: var(--primary-text-color);
      font-weight: 650;
    }
    .tr {
      display: flex;
      justify-content: space-between;
      gap: 14px;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .wrap {
        padding: 3px;
      }
      .legend {
        gap: 9px;
      }
      .legend button,
      .meta {
        font-size: 10.5px;
      }
      .chart {
        height: 400px;
      }
      .axis {
        font-size: 10px;
      }
      .small {
        font-size: 9.5px;
      }
    }
  `
];
var fc = Object.defineProperty, gc = Object.getOwnPropertyDescriptor, lr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? gc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && fc(e, i, n), n;
};
const _c = {
  type: "custom:component-history-graph-v2",
  meta_text: "Aggregation label",
  series_1_label: "Primary series",
  series_2_label: "Secondary series",
  series_3_label: "Supporting series",
  positive_label: "Positive",
  negative_label: "Negative"
};
let Kt = class extends A {
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
    super.setConfig({ ..._c, ...t });
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
    const i = e.getBoundingClientRect(), r = Math.max(320, Math.round(i.width || 800)), n = r < 520 ? 48 : 58, s = 8, a = n, c = r - s, l = (t.clientX - i.left) * (r / i.width), h = Math.max(a, Math.min(c, l)), f = (h - a) / (c - a), g = Math.round(f * 100), d = [
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
    ].filter(([p]) => !this._hiddenSeries.has(Number(p))), u = `<div style="font-weight:650;margin-bottom:4px">${g}% through range</div>${d.map(
      ([, p, _]) => `<div class="tr"><span>${p}</span><b>${_}</b></div>`
    ).join("")}`;
    this._tooltip = {
      show: !0,
      text: u,
      x: h / r * i.width,
      y: Math.max(70, i.height * 0.42)
    };
  }
  render() {
    if (!this._config) return o``;
    const t = 800, e = 420, i = 58, r = 8, n = 6, s = Math.round(e * 0.7), a = s + 20, c = a + 18, l = e - 18, h = i, f = t - r, g = f - h, d = s - n, u = (c + l) / 2, p = (z, P) => `${(h + g * z).toFixed(1)},${(n + d * P).toFixed(1)}`, _ = (z, P) => `${(h + g * z).toFixed(1)},${(u + (l - c) * 0.32 * P).toFixed(1)}`, m = `M${p(0, 0.68)} L${p(0.08, 0.61)} L${p(0.17, 0.7)} L${p(0.26, 0.38)} L${p(0.35, 0.52)} L${p(0.44, 0.24)} L${p(0.53, 0.43)} L${p(0.62, 0.35)} L${p(0.72, 0.63)} L${p(0.82, 0.48)} L${p(0.91, 0.59)} L${p(1, 0.44)}`, v = `M${p(0, 0.86)} L${p(0.12, 0.75)} L${p(0.24, 0.52)} L${p(0.36, 0.42)} L${p(0.48, 0.55)} L${p(0.6, 0.72)} L${p(0.72, 0.82)} L${p(0.84, 0.91)} L${p(1, 0.94)}`, $ = `M${_(0, 0.08)} L${_(0.1, -0.1)} L${_(0.2, 0.12)} L${_(0.3, -0.2)} L${_(0.4, 0.02)} L${_(0.5, -0.35)} L${_(0.6, 0.16)} L${_(0.7, 0.28)} L${_(0.8, -0.12)} L${_(0.9, 0.05)} L${_(1, -0.08)}`, b = `${v} L${f},${s} L${h},${s} Z`;
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
      const P = this._pointerState;
      !P || P.id !== z.pointerId || (this._pointerState = null, P.moved ? (this._pinned = !1, z.pointerType === "touch" && this._hideTip()) : this._pinned ? (this._pinned = !1, this._hideTip()) : (this._handlePointer(z), this._pinned = !0));
    }}
              @pointerleave=${() => {
      !this._pinned && !this._pointerState && this._hideTip();
    }}
            >
              ${["Max", "75%", "50%", "25%", "0"].map((z, P) => {
      const N = n + d * P / 4;
      return o`
                  <line
                    class="grid"
                    x1="${h}"
                    y1="${N}"
                    x2="${f}"
                    y2="${N}"
                  ></line>
                  <text
                    class="axis"
                    x="${h - 8}"
                    y="${N + 4}"
                    text-anchor="end"
                    >${z}</text
                  >
                `;
    })}
              ${["Start", "¼", "½", "¾", "End"].map((z, P) => {
      const N = h + g * P / 4;
      return o`
                  <text
                    class="axis"
                    x="${N}"
                    y="${a}"
                    text-anchor="${P === 0 ? "start" : P === 4 ? "end" : "middle"}"
                  >
                    ${z}
                  </text>
                `;
    })}
              <line
                class="zero"
                x1="${h}"
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
                      <path class="f2" d="${b}"></path>
                      <path class="l2" d="${v}"></path>
                    `}
              ${this._hiddenSeries.has(1) ? "" : o`<path class="l1" d="${m}"></path>`}
              ${this._hiddenSeries.has(3) ? "" : o`<path class="l3" d="${$}"></path>`}
              ${this._tooltip.show ? o`<line
                      class="cursor"
                      x1="${this._tooltip.x}"
                      y1="${n}"
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
Kt.styles = mc;
lr([
  y()
], Kt.prototype, "_hiddenSeries", 2);
lr([
  y()
], Kt.prototype, "_tooltip", 2);
Kt = lr([
  k("component-history-graph-v2")
], Kt);
E({
  type: "component-history-graph-v2",
  element: Kt,
  name: "History Graph",
  description: "Reusable interactive history graph component."
});
const vc = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    ha-card {
      overflow: hidden;
      border-radius: var(--ha-card-border-radius, 16px);
    }
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
      outline-offset: 4px;
      border-radius: 8px;
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
      font-size: 27px;
      line-height: 1;
      font-weight: 650;
      letter-spacing: -0.035em;
      color: var(--primary-text-color);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .left-label {
      margin-top: 4px;
      font-size: 13px;
      line-height: 1.2;
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
      line-height: 1.3;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .right-bottom {
      margin-top: 4px;
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
      font-weight: 500;
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
      .left-value {
        font-size: 25px;
      }
      .right-top,
      .right-bottom {
        font-size: 13px;
      }
    }
  `
];
var bc = Object.defineProperty, yc = Object.getOwnPropertyDescriptor, Oe = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? yc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && bc(e, i, n), n;
};
const xc = {
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
let mt = class extends A {
  constructor() {
    super(...arguments), this._selectedDay = L.today(), this._stats = {}, this._loading = !1, this._error = "", this._lastKey = null, this._interactionHandles = [];
  }
  _onDayChange(t) {
    !t || t === this._selectedDay || (this._selectedDay = t, this._error = "", this._lastKey = null, this._scheduleStats());
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = this._config?.day_channel;
    if (super.setConfig({ ...xc, ...t }), this.isConnected && e !== this._config?.day_channel) {
      this._dayUnsubscribe?.();
      const i = this._config?.day_channel || "energy-day";
      this._selectedDay = L.get(i, this.hass), this._dayUnsubscribe = L.subscribe(
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
    this._selectedDay = L.get(t, this.hass), this._dayUnsubscribe = L.subscribe(
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
    return this._selectedDay === L.today(this.hass);
  }
  _range() {
    const t = Yr(this.hass, this._selectedDay);
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
      const n = {};
      for (const s of t.change) {
        const c = (r?.[s] || []).filter((l) => {
          const h = typeof l.start == "number" ? l.start : Date.parse(l.start);
          return Number.isFinite(h) && h >= i.start && h < i.end;
        }).map((l) => Number(l.change)).filter(Number.isFinite);
        n[s] = {
          change: c.length ? c.reduce((l, h) => l + h, 0) : null
        };
      }
      this._stats = n, this._lastKey = e;
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
      return pt(this.hass, this._number(t.entity, "change"));
    if (e === "energy_kwh_day_sum") {
      if (!Array.isArray(t.entities) || !t.entities.length) return "—";
      let r = 0;
      for (const n of t.entities) {
        const s = this._number(n, "change");
        if (s === null) return "—";
        r += s;
      }
      return pt(this.hass, r);
    }
    if (e === "energy_kwh_day_formula") {
      if (!Array.isArray(t.terms) || !t.terms.length) return "—";
      let r = 0;
      for (const n of t.terms) {
        const s = this._number(n?.entity, "change");
        if (s === null) return "—";
        r += s * (Number.isFinite(Number(n.factor)) ? Number(n.factor) : 1);
      }
      return pt(this.hass, r);
    }
    if (["watts", "watts_abs"].includes(e))
      return et(this.hass, this._liveNumber(t.entity), {
        absolute: e === "watts_abs"
      });
    if (e === "grid_import_watts") {
      const r = this._liveNumber(t.entity), n = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "—" : `${Math.round(r >= n ? r : 0)} W`;
    }
    if (e === "grid_export_watts") {
      const r = this._liveNumber(t.entity), n = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "—" : `${Math.round(r <= -n ? Math.abs(r) : 0)} W`;
    }
    if (e === "grid_label") {
      const r = this._liveNumber(t.entity), n = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "Live grid" : r >= n ? "Live grid import" : r <= -n ? "Live grid export" : "Live grid flow";
    }
    if (e === "grid_direction") {
      const r = this._liveNumber(t.entity), n = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "Unavailable" : r >= n ? "Importing now" : r <= -n ? "Exporting now" : "Balanced now";
    }
    if (!t.entity) return "";
    const i = this.hass?.states?.[t.entity];
    return i ? String(i.state) : t.unavailable || "Unavailable";
  }
  updated() {
    for (const n of this._interactionHandles) n.destroy();
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
    const t = this._resolve(this._config.left_value), e = this._resolve(this._config.left_label), i = this._resolve(this._config.right_value), r = this._resolve(this._config.right_label), n = this._resolve(this._config.right_primary), s = this._resolve(this._config.right_secondary), a = this._clickEntity("left"), c = this._clickEntity("right"), l = [e, t].filter(Boolean).join(": "), h = [i, r, n, s].filter(Boolean).join(" ");
    return o`
      <ha-card>
        <div class="wrap">
          <button
            class="left"
            type="button"
            ?disabled=${!a}
            aria-label="${this.esc(l || "Left metric")}"
          >
            <div class="left-value">${this.esc(t)}</div>
            <div class="left-label">${this.esc(e)}</div>
          </button>
          <button
            class="right"
            type="button"
            ?disabled=${!c}
            aria-label="${this.esc(h || "Right metric")}"
          >
            <div class="right-top">
              <span class="right-value">${this.esc(i)}</span>
              <span class="right-label">${this.esc(r)}</span>
            </div>
            <div class="right-bottom">
              <span class="right-primary">${this.esc(n)}</span>
              <span class="right-secondary">${this.esc(s)}</span>
            </div>
          </button>
        </div>
      </ha-card>
    `;
  }
};
mt.styles = vc;
Oe([
  y()
], mt.prototype, "_selectedDay", 2);
Oe([
  y()
], mt.prototype, "_stats", 2);
Oe([
  y()
], mt.prototype, "_loading", 2);
Oe([
  y()
], mt.prototype, "_error", 2);
mt = Oe([
  k("metric-pair-card-v3")
], mt);
E({
  type: "metric-pair-card-v3",
  element: mt,
  name: "Metric Pair",
  description: "Live power metrics with selected-day energy totals."
});
const wc = [
  Se,
  sn,
  Xi,
  Zi,
  Ji,
  x`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    }
    .wrap {
      padding: 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: var(--c-grid-gap);
      max-width: 448px;
    }
    .item {
      position: relative;
      min-width: 0;
      min-height: 42px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      border: var(--c-card-border);
      border-radius: var(--c-radius-card);
      background: var(--c-card-surface);
      overflow: hidden;
    }
    .main {
      min-width: 0;
      min-height: 42px;
      padding: 4px 6px;
      text-align: left;
      background: transparent;
      display: grid;
      grid-template-columns: 26px minmax(0, 1fr);
      align-items: center;
      gap: var(--c-space-2);
    }
    .item.has-quick .main {
      padding-right: 2px;
    }
    .main:active,
    .quick:active {
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }
    .item.active {
      background: var(--c-active-surface);
      box-shadow: inset 2px 0 0 var(--primary-color);
    }
    .item.active .state {
      color: var(--primary-color);
      font-weight: var(--c-font-weight-medium);
    }
    .item.unavailable {
      opacity: 0.55;
    }
    .quick {
      width: 36px;
      min-height: 42px;
      border-left: 1px solid var(--c-card-border-color);
    }
    .empty,
    .load-error {
      grid-column: 1 / -1;
      min-height: 38px;
      padding: var(--c-card-padding-dense);
      border: 1px dashed var(--c-card-border-color);
      border-radius: var(--c-radius-card);
      background: transparent;
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
      line-height: var(--c-line-height-relaxed);
    }
  `
];
var $c = Object.defineProperty, kc = Object.getOwnPropertyDescriptor, Ci = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? kc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && $c(e, i, n), n;
};
const Ni = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
let Ct = class extends A {
  constructor() {
    super(...arguments), this._selected = [], this._registry = null, this._interactionHandles = [], this._unsubRegistry = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = Array.isArray(t?.helpers) ? t.helpers.filter((n) => typeof n == "string") : [], i = Array.isArray(t?.items) ? t.items.slice(0, 4) : [], r = String(t?.preference_key || "").trim();
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
    !this.isConnected || this._unsubRegistry || !this.hass || (this._unsubRegistry = R.subscribe(this.hass, (t) => {
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
    if (!t || Ni.has(String(t).toLowerCase())) return null;
    try {
      return this._normaliseRef(JSON.parse(t));
    } catch {
      return null;
    }
  }
  _buildRegistryIndex(t) {
    const e = t.entities || [], i = t.devices || [], r = t.areas || [], n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
    for (const a of e) {
      const c = this._entryKey(a);
      c && n.set(c, a), a.device_id && (s.has(a.device_id) || s.set(a.device_id, []), s.get(a.device_id).push(a));
    }
    this._registry = {
      entities: e,
      devices: new Map(i.map((a) => [a.id, a])),
      areas: new Map(r.map((a) => [a.area_id, a.name])),
      byKey: n,
      byDevice: s
    };
  }
  async _ensureRegistry(t = !1) {
    if (this.hass && !(this._registry && !t))
      try {
        const e = await R.load(this.hass, t);
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
    if (!t.state || Ni.has(String(t.state.state).toLowerCase()))
      return !1;
    const e = this._domain(t.entry?.entity_id);
    return ["light", "switch", "fan", "input_boolean"].includes(e) ? t.state.state === "on" : e === "media_player" ? ["playing", "paused", "buffering", "on"].includes(t.state.state) : e === "climate" ? t.state.state !== "off" : e === "cover" ? t.state.state !== "closed" : e === "lock" ? t.state.state === "unlocked" : !1;
  }
  async _activate(t) {
    const e = this._selected[t];
    if (!e) return;
    const i = this._record(e);
    if (!i.entry || !i.state) return;
    const r = i.entry.entity_id, n = this._domain(r);
    if (["light", "switch", "fan", "input_boolean"].includes(n))
      await this.hass?.callService("homeassistant", "toggle", {
        entity_id: r
      });
    else if (["automation", "script", "scene"].includes(n)) {
      const s = n === "automation" ? "trigger" : "turn_on";
      await this.hass?.callService(n, s, { entity_id: r });
    } else ["button", "input_button"].includes(n) ? await this.hass?.callService(n, "press", { entity_id: r }) : this.moreInfo(r);
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
      const i = this._record(e), r = this._name(i), n = this._stateLabel(i), s = this._icon(i), a = this._isActive(i), c = !i.state || Ni.has(String(i.state.state).toLowerCase());
      return o`
                      <div
                        class="item ${a ? "active" : ""} ${c ? "unavailable" : ""}"
                      >
                        <button
                          class="main"
                          type="button"
                          ?disabled=${c}
                          aria-label="${r}: ${n}"
                        >
                          <span class="icon">
                            <ha-icon icon="${s}"></ha-icon>
                          </span>
                          <span class="copy">
                            <div class="name">${r}</div>
                            <div class="state">${n}</div>
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
Ct.stubConfig = { helpers: [], max: 4, title: "Favourites" };
Ct.styles = wc;
Ci([
  y()
], Ct.prototype, "_selected", 2);
Ci([
  y()
], Ct.prototype, "_registry", 2);
Ct = Ci([
  k("component-favourites-v3")
], Ct);
let ci = class extends A {
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
ci.styles = x`
    :host {
      display: block;
      min-width: 0;
    }
  `;
ci = Ci([
  k("component-favourites-minimal-v1")
], ci);
E({
  type: "component-favourites-v3",
  element: Ct,
  name: "Favourites V3",
  description: "Stable household favourites with entity discovery and backend companion storage."
});
E({
  type: "component-favourites-minimal-v1",
  element: ci,
  name: "Favourites Minimal",
  description: "Existing favourites behaviour with restrained Home typography."
});
const Cc = [
  Se,
  x`
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
], Sc = [
  j,
  x`
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
var Ac = Object.getOwnPropertyDescriptor, Ec = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Ac(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const zc = {
  type: "custom:component-welcome-header-v1",
  weather_entity: "weather.forecast_home"
};
let li = class extends A {
  constructor() {
    super(...arguments), this._cancelMinuteScheduler = null, this._interactionHandle = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (super.setConfig({ ...zc, ...t }), !this._config?.weather_entity)
      throw new Error("weather_entity is required");
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = rn(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._cancelMinuteScheduler?.(), this._cancelMinuteScheduler = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  _number(t, e = 0) {
    const i = Number(t);
    return Number.isFinite(i) ? Rt(this.hass, i, {
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
    const t = /* @__PURE__ */ new Date(), i = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, r = pi(this.hass), n = di(this.hass), s = this._number(i.temperature, 1), a = this._number(i.cloud_coverage, 0), c = s === null ? "—" : `${s}${i.temperature_unit || "°C"}`, l = a === null ? "Cloud —" : `Cloud ${a}%`, h = new Intl.DateTimeFormat(n, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: r
    }).format(t), f = `Outside ${c}, ${l}. Open weather details.`;
    return o`
      <ha-card>
        <div class="row">
          <span class="time">${h}</span>
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
li.styles = Sc;
li = Ec([
  k("component-welcome-header-v1")
], li);
E({
  type: "component-welcome-header-v1",
  element: li,
  name: "Welcome Header",
  description: "Compact live weather and home-time header."
});
const Tc = [
  Se,
  sn,
  x`
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
    }
    .body {
      display: grid;
      gap: var(--c-card-gap);
      min-width: 0;
    }
    .empty {
      min-height: 38px;
      padding: var(--c-card-padding-dense);
      border: var(--c-card-border);
      border-radius: var(--c-radius-card);
      color: var(--secondary-text-color);
      font-size: var(--c-font-base);
      display: flex;
      align-items: center;
      gap: var(--c-space-2);
    }
    .empty ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: var(--c-icon-sm-size);
    }
  `
];
var Dc = Object.defineProperty, Oc = Object.getOwnPropertyDescriptor, Si = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Oc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Dc(e, i, n), n;
};
const Pc = {
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
let St = class extends A {
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
    super.setConfig({ ...Pc, ...t }), this._structureSig = "", this.hass && (this._config?.pref_key && this._loadPrefs(), R.load(this.hass).then((e) => {
      this._registry = e, this._syncCards();
    }), this._syncCards());
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = R.subscribe(this.hass, (t) => {
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
      this._registry || R.load(this.hass).then((e) => {
        this._registry = e, this._syncCards();
      }), this._syncCards();
    }
  }
  async _loadPrefs() {
    !this.hass || !this._config?.pref_key || (this._prefs = await _n(this.hass, this._config.pref_key), this._structureSig = "", this._syncCards());
  }
  _tune(t) {
    if (t?.localName !== "component-split-controller-v4" || !t.shadowRoot || t.shadowRoot.querySelector("style[data-home-minimal]"))
      return;
    const e = document.createElement("style");
    e.dataset.homeMinimal = "", e.textContent = ".nm{font-weight:500!important}.iw{color:var(--secondary-text-color)!important}.rv{font-size:22px!important;font-weight:500!important}.tv{font-size:16px!important;font-weight:500!important}.al,.pt,.gt,.o,.tpr button,.tcu button,.tac button{font-weight:500!important}.pt{font-size:16px!important}.a ha-icon{--mdc-icon-size:17px!important}", t.shadowRoot.append(e);
  }
  async _syncCards() {
    if (!this.hass) return;
    const t = ++this._gen, e = Ri(
      this.hass,
      this._registry,
      {
        mode: this._config?.mode,
        area_id: this._config?.area_id,
        exclude_device_names: this._config?.exclude_device_names,
        prefs: this._prefs
      }
    ), i = JSON.stringify(
      e.map((n) => [n.entityId, n.signature])
    );
    if (i === this._structureSig) {
      for (const n of this._cardElements.values())
        n.el.hass = this.hass;
      return;
    }
    const r = /* @__PURE__ */ new Map();
    for (const n of e) {
      const s = this._cardElements.get(n.entityId);
      if (s && s.sig === n.signature) {
        s.el.hass = this.hass, r.set(n.entityId, s);
        continue;
      }
      try {
        const a = await yn(n.cardConfig, this.hass);
        if (t !== this._gen) return;
        this._tune(a), r.set(n.entityId, { el: a, sig: n.signature });
      } catch {
      }
    }
    t === this._gen && (this._cardElements = r, this._structureSig = i, this._renderedCards = e.map((n) => r.get(n.entityId)?.el).filter((n) => !!n), this.requestUpdate());
  }
  async openEditor() {
    if (!this.hass || !this._config?.pref_key) return;
    const e = {
      order: Ri(this.hass, this._registry, {
        mode: this._config?.mode,
        area_id: this._config?.area_id,
        exclude_device_names: this._config?.exclude_device_names
      }).map((i) => i.entityId),
      hidden: [...this._prefs.hidden]
    };
    this._prefs = e, await vn(this.hass, this._config.pref_key, e), this._structureSig = "", this._syncCards();
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
St.styles = Tc;
Si([
  y()
], St.prototype, "_registry", 2);
Si([
  y()
], St.prototype, "_prefs", 2);
Si([
  y()
], St.prototype, "_renderedCards", 2);
St = Si([
  k("component-smart-collection-v3")
], St);
E({
  type: "component-smart-collection-v3",
  element: St,
  name: "Smart Control Collection V3",
  description: "Stable registry-driven household controls without refresh teardown."
});
const Hc = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
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
      gap: 7px;
    }
    .title-row ha-icon,
    .heading ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 17px;
    }
    .title-row h2,
    .heading h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 500;
    }
    .list,
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .item {
      appearance: none;
      min-height: 52px;
      padding: 8px 10px;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-card, 8px);
      background: var(--dashboard-card-surface, var(--card-background-color));
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: 32px minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
    .item:hover {
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
    }
    .item:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .icon {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .meta {
      margin-top: 2px;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .arrow {
      color: var(--secondary-text-color);
      display: grid;
      place-items: center;
    }
    .arrow ha-icon {
      --mdc-icon-size: 18px;
      color: var(--secondary-text-color);
    }
    .empty {
      margin: 0;
      padding: 9px 2px;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.35;
    }
    @media (max-width: 340px) {
      .list,
      .grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `
];
var Nc = Object.defineProperty, Rc = Object.getOwnPropertyDescriptor, On = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Rc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Nc(e, i, n), n;
};
const Ic = {
  type: "custom:component-household-directory-v3",
  pref_key: "home-control.household.v2",
  base_path: "/home-control",
  current_dashboard: "home-control",
  title: "Quick actions",
  icon: "mdi:gesture-tap-button",
  quick_action_label: "dashboard_quick_action"
}, Wr = {
  automation: "trigger",
  scene: "turn_on",
  script: "turn_on",
  button: "press",
  input_button: "press"
};
let ye = class extends A {
  constructor() {
    super(...arguments), this._registry = [], this._unsubRegistry = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Ic, ...t }), this.hass && R.load(this.hass).then((e) => {
      this._registry = e.entities || [];
    });
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = R.subscribe(this.hass, (t) => {
      this._registry = t.entities || [];
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    this._registry.length === 0 && this.hass && R.load(this.hass).then((t) => {
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
    const i = this._config?.quick_action_label || "dashboard_quick_action", r = this._registry.filter((n) => {
      if (n.disabled_by || n.hidden_by) return !1;
      const s = n.entity_id.split(".")[0];
      return !Object.prototype.hasOwnProperty.call(
        Wr,
        s
      ) && !(s === "todo") ? !1 : (Array.isArray(n.labels) ? n.labels : []).includes(i);
    });
    for (const n of r) {
      const s = this.hass.states[n.entity_id], a = n.entity_id.split(".")[0], c = s?.attributes?.friendly_name || n.name || n.original_name || n.entity_id, l = s?.attributes?.icon || n.icon || n.original_icon || "mdi:flash";
      a === "todo" ? t.push({
        id: n.entity_id,
        name: c.replace(/\s+List$/i, ""),
        icon: l,
        kind: "entity",
        entity: n.entity_id,
        meta: "To-do list"
      }) : t.push({
        id: n.entity_id,
        name: c,
        icon: l,
        kind: "action",
        entity: n.entity_id,
        domain: a,
        service: Wr[a],
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
      const n = e[r];
      if (!n) return;
      let s = null;
      n.kind === "nav" && n.path ? s = () => Kr(n.path) : n.kind === "action" ? s = () => this._runAction(n) : n.kind === "entity" && n.entity && (s = () => this.moreInfo(n.entity)), s && this._interactionHandles.push(
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
ye.styles = Hc;
On([
  y()
], ye.prototype, "_registry", 2);
ye = On([
  k("component-household-directory-v3")
], ye);
E({
  type: "component-household-directory-v3",
  element: ye,
  name: "Household Directory V3",
  description: "Global views and label-driven quick actions directory."
});
const Lc = x`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  ha-card {
    display: block;
    border: 0;
    box-shadow: none;
    background: transparent;
    overflow: visible;
    color: var(--primary-text-color);
  }
  button {
    font: inherit;
    color: inherit;
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
    gap: 7px;
    min-height: 44px;
    padding: 0;
    cursor: pointer;
  }
  .open-view ha-icon {
    color: var(--secondary-text-color);
    --mdc-icon-size: 17px;
  }
  .open-view h2 {
    margin: 0;
    font-size: 15px;
    line-height: 1.2;
    font-weight: 500;
  }
  .edit,
  .room-edit {
    appearance: none;
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: var(--dashboard-radius-control, 8px);
    background: transparent;
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  .edit ha-icon,
  .room-edit ha-icon {
    --mdc-icon-size: 16px;
  }
  .edit:hover,
  .edit:focus-visible,
  .room-edit:hover,
  .room-edit:focus-visible,
  .open-view:focus-visible {
    background: var(--dashboard-card-muted-surface, var(--secondary-background-color));
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
    font-size: 12px;
    font-weight: 500;
  }
  .group:after {
    content: "";
    height: 1px;
    background: var(--divider-color);
    flex: 1;
  }
  .room {
    appearance: none;
    min-width: 0;
    min-height: 56px;
    padding: 0 12px 0 10px;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-card, 8px);
    background: var(--dashboard-card-surface, var(--card-background-color));
    text-align: left;
    display: grid;
    grid-template-columns: 34px minmax(0, 1fr);
    align-items: center;
    gap: 9px;
    cursor: pointer;
  }
  .room:active {
    background: var(--dashboard-card-muted-surface, var(--secondary-background-color));
  }
  .room:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }
  .ico {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  .ico ha-icon {
    --mdc-icon-size: 19px;
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
    font-weight: 500;
  }
  .summary {
    margin-top: 3px;
    font-size: 12px;
    line-height: 1.25;
    font-weight: 400;
    color: var(--secondary-text-color);
  }
  .room.active .ico {
    color: color-mix(in srgb, var(--primary-color) 55%, var(--secondary-text-color));
  }
  .room.warning {
    border-left-color: var(--warning-color, #f9a825);
  }
  .room.warning .ico {
    color: var(--warning-color, #f9a825);
  }
  .room.critical {
    border-left-color: var(--error-color);
  }
  .room.critical .ico {
    color: var(--error-color);
  }
  dialog {
    width: min(720px, calc(100vw - 24px));
    height: min(760px, calc(100dvh - 32px));
    min-height: min(560px, calc(100dvh - 32px));
    margin: auto;
    padding: 0;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(--dashboard-radius-dialog, 10px);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--dashboard-dialog-shadow, 0 16px 48px rgba(0, 0, 0, 0.22));
    overflow: hidden;
  }
  dialog::backdrop {
    background: var(--dashboard-modal-scrim, rgba(0, 0, 0, 0.16));
    backdrop-filter: blur(3px);
  }
  .sheet {
    height: 100%;
    display: flex;
    flex-direction: column;
    will-change: transform;
    transition: transform 0.18s ease;
  }
  .sheet.dragging {
    transition: none;
  }
  .sheet-head {
    flex: 0 0 auto;
    min-height: 54px;
    padding: 5px 6px 5px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--divider-color);
    touch-action: pan-y;
  }
  .identity {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .identity ha-icon {
    color: var(--secondary-text-color);
    --mdc-icon-size: 18px;
  }
  .sheet-name {
    font-size: 14px;
    line-height: 1.2;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .environment {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    min-width: 0;
    color: var(--secondary-text-color);
  }
  .metric {
    appearance: none;
    border: 0;
    background: transparent;
    min-height: 44px;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 3px;
    white-space: nowrap;
    cursor: pointer;
    color: inherit;
    font-size: 12px;
  }
  .metric ha-icon {
    --mdc-icon-size: 15px;
    color: var(--secondary-text-color);
  }
  .dot {
    font-size: 11px;
    color: var(--disabled-text-color, var(--secondary-text-color));
  }
  .close {
    appearance: none;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: var(--dashboard-radius-control, 8px);
    background: transparent;
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
    cursor: pointer;
    flex: 0 0 auto;
  }
  .close ha-icon {
    --mdc-icon-size: 18px;
  }
  .sheet-body {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    overscroll-behavior: contain;
    padding: 10px 14px max(14px, env(safe-area-inset-bottom));
    touch-action: pan-y;
  }
  @media (max-width: 700px) {
    dialog {
      width: 100vw;
      max-width: 100vw;
      height: 92dvh;
      min-height: 92dvh;
      max-height: 92dvh;
      margin: auto 0 0;
      border-width: 1px 0 0;
      border-radius: var(--dashboard-radius-dialog, 8px) var(--dashboard-radius-dialog, 8px) 0 0;
    }
    .sheet-head {
      padding-left: 12px;
    }
    .sheet-body {
      padding: 8px 12px max(18px, env(safe-area-inset-bottom));
    }
  }
  @media (max-width: 520px) {
    .identity ha-icon {
      display: none;
    }
    .sheet-head {
      gap: 5px;
    }
    .environment {
      gap: 4px;
    }
    .metric {
      font-size: 11.5px;
    }
    .room-edit,
    .close {
      width: 44px;
      height: 44px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .sheet {
      transition: none;
    }
  }
`;
var Mc = Object.defineProperty, qc = Object.getOwnPropertyDescriptor, dr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? qc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Mc(e, i, n), n;
};
const jc = {
  type: "custom:component-room-directory-v4",
  title: "Rooms",
  icon: "mdi:floor-plan",
  mode: "home",
  pref_key: "home-control.rooms.v2",
  navigation_path: null,
  base_path: "/home-control"
};
let Yt = class extends A {
  constructor() {
    super(...arguments), this._registries = null, this._activeArea = null, this._unsubRegistry = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...jc, ...t }), this.hass && R.load(this.hass).then((e) => {
      this._registries = e;
    });
  }
  getCardSize() {
    return 4;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = R.subscribe(this.hass, (t) => {
      this._registries = t;
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, super.disconnectedCallback();
  }
  willUpdate() {
    !this._registries && this.hass && R.load(this.hass).then((t) => {
      this._registries = t;
    });
  }
  _areas() {
    return [...this._registries?.areas || []].sort(
      (e, i) => e.name.localeCompare(i.name, void 0, { sensitivity: "base" })
    );
  }
  _areaStatus(t) {
    return xn(t, this._registries, this.hass);
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
Yt.styles = Lc;
dr([
  y()
], Yt.prototype, "_registries", 2);
dr([
  y()
], Yt.prototype, "_activeArea", 2);
Yt = dr([
  k("component-room-directory-v4")
], Yt);
E({
  type: "component-room-directory-v4",
  element: Yt,
  name: "Room Directory V4",
  description: "Stable registry-driven rooms with full-height swipeable room sheets."
});
var Uc = Object.getOwnPropertyDescriptor, Pn = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Uc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
const Bc = {
  type: "custom:component-home-overview-v4",
  weather_entity: "weather.forecast_home",
  base_path: "/home-control",
  current_dashboard: "home-control",
  favourites_helpers: []
};
let xe = class extends A {
  constructor() {
    super(...arguments), this._weatherInteraction = null, this._cancelMinuteScheduler = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      ...Bc,
      ...t,
      favourites_helpers: []
    });
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = rn(() => this.requestUpdate());
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
    const t = /* @__PURE__ */ new Date(), e = pi(this.hass), i = di(this.hass), r = new Intl.DateTimeFormat(i, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: e
    }).format(t), s = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, a = Number(s.temperature), c = Number.isFinite(a) ? `${Rt(this.hass, a, { maximumFractionDigits: 1 })}${s.temperature_unit || "°C"}` : "—", l = Number(s.cloud_coverage), h = Number.isFinite(l) ? `Cloud ${Math.round(l)}%` : "Cloud —", f = `${c} · ${h}`, g = `Outside ${c}, ${h}. Open weather details.`, d = this._config.base_path || "/home-control", u = this._config.current_dashboard || "home-control";
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
xe.styles = Cc;
xe = Pn([
  k("component-home-overview-v4")
], xe);
let Li = class extends xe {
};
Li = Pn([
  k("component-home-overview-v5")
], Li);
E({
  type: "component-home-overview-v4",
  element: xe,
  name: "Home Overview V4",
  description: "Stable minimal Home overview without state-refresh teardown."
});
E({
  type: "component-home-overview-v5",
  element: Li,
  name: "Home Overview V5",
  description: "Stable minimal Home overview without state-refresh teardown (v5 alias)."
});
const Fc = [
  j,
  x`
    :host {
      display: block;
      min-width: 0;
    }
    * {
      box-sizing: border-box;
    }
    button {
      font: inherit;
      color: inherit;
    }
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
      color: var(--error-color, #db4437);
      --mdc-icon-size: 19px;
    }
    .head h2 {
      margin: 0;
      font-size: 18px;
      line-height: 1.2;
      font-weight: 650;
    }
    .count {
      font-size: 12px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--warning-color, #f9a825) 15%, transparent);
      color: var(--warning-color, #f9a825);
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
      min-height: 52px;
      padding: 6px 10px;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-left: 3px solid var(--warning-color, #f9a825);
      border-radius: var(--dashboard-radius-card, 6px);
      background: var(
        --dashboard-warning-surface,
        var(--card-background-color)
      );
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) auto auto;
      align-items: center;
      gap: 8px;
      text-align: left;
      cursor: pointer;
    }
    .issue.critical {
      border-left-color: var(--error-color, #db4437);
      background: var(
        --dashboard-critical-surface,
        var(--card-background-color)
      );
    }
    .issue:hover,
    .issue:focus-visible {
      background: var(
        --dashboard-card-muted-surface,
        var(--card-background-color)
      );
      outline: 2px solid var(--primary-color);
      outline-offset: 1px;
    }
    .icon,
    .issue-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-icon, 6px);
      display: grid;
      place-items: center;
      color: var(--warning-color, #f9a825);
      background: transparent;
    }
    .critical .icon,
    .critical .issue-icon {
      color: var(--error-color, #db4437);
    }
    .icon ha-icon,
    .issue-icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .name {
      font-size: 13px;
      line-height: 1.25;
      font-weight: 650;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .status,
    .state {
      font-size: 13px;
      line-height: 1.25;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .badge,
    .severity {
      font-size: 12px;
      font-weight: 650;
      color: var(--warning-color, #f9a825);
      padding: 2px 6px;
      border-radius: 4px;
    }
    .badge.critical,
    .critical .severity {
      color: var(--error-color, #db4437);
    }
    .arrow {
      color: var(--secondary-text-color);
      display: grid;
      place-items: center;
    }
    .arrow ha-icon {
      --mdc-icon-size: 18px;
    }
    .quiet {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-card, 6px);
      background: var(--dashboard-card-surface, var(--card-background-color));
    }
    .quiet-icon {
      color: var(--success-color, #4caf50);
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }
    .quiet-icon ha-icon {
      --mdc-icon-size: 24px;
    }
    .quiet-text h3 {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .quiet-text p {
      margin: 2px 0 0 0;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    @media (max-width: 700px) {
      .list,
      .grid {
        grid-template-columns: 1fr;
      }
      .issue {
        min-height: 56px;
      }
    }
  `
];
var Vc = Object.defineProperty, Wc = Object.getOwnPropertyDescriptor, pr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Wc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Vc(e, i, n), n;
};
const Gc = {
  type: "custom:component-household-attention-v2",
  title: "Attention",
  icon: "mdi:alert-circle-outline",
  quiet_title: "Everything quiet",
  quiet_subtitle: "No security or hardware alerts",
  quiet_icon: "mdi:check-circle-outline"
};
let Qt = class extends A {
  constructor() {
    super(...arguments), this._registry = null, this._unsubRegistry = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Gc, ...t }), this.hass && !this._config?.demo && R.load(this.hass).then((e) => {
      this._registry = e.entities || [];
    });
  }
  getCardSize() {
    return this._config?.demo ? 2 : 1;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && !this._config?.demo && (this._unsubRegistry = R.subscribe(this.hass, (t) => {
      this._registry = t.entities || [];
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    !this._registry && this.hass && !this._config?.demo && R.load(this.hass).then((t) => {
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
      const r = e.entity_id.split(".")[0], n = e.device_class || i.attributes?.device_class || "";
      let s = null;
      e.entity_id.endsWith("_controller_status") && i.state === "off" ? s = {
        status: "Controller offline",
        severity: "critical",
        severity_text: "Critical",
        icon: "mdi:access-point-network-off"
      } : r === "binary_sensor" && i.state === "on" && ["smoke", "moisture", "gas"].includes(n) ? s = {
        status: "Detected",
        severity: "critical",
        severity_text: "Critical",
        icon: n === "smoke" ? "mdi:smoke-detector-alert" : n === "gas" ? "mdi:gas-cylinder" : "mdi:water-alert"
      } : r === "binary_sensor" && i.state === "on" && ["door", "window", "garage_door"].includes(n) ? s = {
        status: "Open",
        severity: "warning",
        severity_text: "Check",
        icon: n === "window" ? "mdi:window-open-variant" : n === "garage_door" ? "mdi:garage-open" : "mdi:door-open"
      } : r === "lock" && i.state === "unlocked" && (s = {
        status: "Unlocked",
        severity: "warning",
        severity_text: "Check",
        icon: "mdi:lock-open-variant-outline"
      }), s && t.push({
        entity_id: e.entity_id,
        name: ft({ entry: e, state: i }),
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
      const n = e[r];
      n && this._interactionHandles.push(
        S(i, {
          primary: () => {
            this._config?.demo || this.moreInfo(n.entity_id);
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
Qt.styles = Fc;
pr([
  y()
], Qt.prototype, "_registry", 2);
Qt = pr([
  k("component-household-attention-v2")
], Qt);
let Mi = class extends Qt {
};
Mi = pr([
  k("component-household-attention-v1")
], Mi);
E({
  type: "component-household-attention-v1",
  element: Mi,
  name: "Household Attention V1",
  description: "Aggregated safety and hardware attention queue (v1)."
});
E({
  type: "component-household-attention-v2",
  element: Qt,
  name: "Household Attention V2",
  description: "Aggregated safety and hardware attention queue."
});
const Kc = [
  gi,
  x`
    :host {
      --tile-active-color: var(--primary-color, #03a9f4);
    }

    .tile-card {
      height: 100%;
      transition:
        transform 0.15s ease,
        box-shadow 0.15s ease,
        background-color 0.2s ease;
    }

    .tile-card.active {
      background: linear-gradient(
        135deg,
        var(--ha-card-background, #ffffff) 60%,
        rgba(3, 169, 244, 0.08) 100%
      );
    }

    .tile-body {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 12px;
      min-height: 64px;
      box-sizing: border-box;
    }

    .tile-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .tile-icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 6px;
      background-color: var(
        --secondary-background-color,
        rgba(128, 128, 128, 0.1)
      );
      color: var(--secondary-text-color, #757575);
      transition: all 0.25s ease;
    }

    .tile-icon-box ha-icon {
      --mdc-icon-size: 16px;
    }

    .tile-icon-box.active {
      background-color: var(--tile-active-color);
      color: #ffffff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
    }

    .badge-pill {
      padding: 2px 6px;
      border-radius: 8px;
      font-size: 0.7rem;
      font-weight: 500;
      background-color: var(
        --secondary-background-color,
        rgba(128, 128, 128, 0.12)
      );
      color: var(--primary-text-color, #212121);
    }

    .tile-content {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .tile-card.unavailable {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .tile-card:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
  `
];
var Yc = Object.defineProperty, Qc = Object.getOwnPropertyDescriptor, hr = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Qc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && Yc(e, i, n), n;
};
let we = class extends ht {
  setConfig(t) {
    this._config = { ...t };
  }
  _valueChanged(t, e) {
    if (!this._config) return;
    const r = t.target.value;
    if (r === "") {
      const n = { ...this._config };
      delete n[e], this._config = n;
    } else
      this._config = {
        ...this._config,
        [e]: r
      };
    it(this, "config-changed", { config: this._config });
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
we.styles = [on];
hr([
  Zt({ attribute: !1 })
], we.prototype, "hass", 2);
hr([
  y()
], we.prototype, "_config", 2);
we = hr([
  k("ha-action-tile-editor")
], we);
var Xc = Object.getOwnPropertyDescriptor, Zc = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? Xc(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
let qi = class extends bi {
  static async getConfigElement() {
    return document.createElement(
      "ha-action-tile-editor"
    );
  }
  static getStubConfig(t, e, i) {
    return {
      entity: e.find((n) => n.startsWith("light.") || n.startsWith("switch.")) || e[0] || "light.living_room",
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
    vi(this, this.hass, t, this.config.entity);
  }
  _renderBadge() {
    if (!this.hass || !this.config) return q;
    if (this.config.badge_entity && this.hass.states[this.config.badge_entity]) {
      const e = this.hass.states[this.config.badge_entity];
      return o`
        <div class="badge-pill">
          ${V(e, this.hass)}
        </div>
      `;
    }
    const t = this.hass.states[this.config.entity];
    if (t?.attributes?.brightness !== void 0 && me(t)) {
      const e = Math.round(t.attributes.brightness / 255 * 100);
      return o`<div class="badge-pill">${e}%</div>`;
    }
    return t?.attributes?.temperature !== void 0 ? o`<div class="badge-pill">
        ${t.attributes.temperature}&deg;
      </div>` : q;
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
    const e = Z(this.config.entity), i = rt(t), r = !i && me(t), n = this.config.name || _i(t), s = this.config.icon || t.attributes.icon || Jt(e, t.state), a = i ? "Unavailable" : V(t, this.hass), c = this.config.color || "#03a9f4";
    return o`
      <ha-card
        class="interactive tile-card ${r ? "active" : ""} ${i ? "unavailable" : ""}"
        style=${r ? `--tile-active-color: ${c};` : ""}
        role="button"
        tabindex="${i ? "-1" : "0"}"
        aria-pressed="${String(r)}"
        aria-disabled="${String(i)}"
        aria-label="${n}: ${a}"
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
            <div class="primary-title" title=${n}>${n}</div>
            <div class="secondary-text">${a}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
qi.styles = Kc;
qi = Zc([
  k("ha-action-tile")
], qi);
const Jc = [
  gi,
  x`
    .metric-badge-card {
      border-left: 4px solid var(--badge-accent-color);
    }

    .metric-body {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      gap: 12px;
    }

    .icon-bubble {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(
        --secondary-background-color,
        rgba(128, 128, 128, 0.1)
      );
      color: var(--badge-accent-color);
    }

    .metric-data {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .metric-value-line {
      display: flex;
      align-items: baseline;
      gap: 3px;
    }

    .value-text {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.1;
      color: var(--primary-text-color, #212121);
    }

    .unit-text {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--secondary-text-color, #757575);
    }

    .metric-label {
      font-size: 0.8rem;
      color: var(--secondary-text-color, #757575);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .metric-badge-card.unavailable {
      opacity: 0.55;
    }

    .metric-badge-card:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
  `
];
var tl = Object.getOwnPropertyDescriptor, el = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? tl(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
let ji = class extends bi {
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
    vi(this, this.hass, t, this.config.entity);
  }
  _computeColor(t) {
    if (!this.config?.thresholds || this.config.thresholds.length === 0)
      return "var(--primary-color, #03a9f4)";
    const e = [...this.config.thresholds].sort(
      (r, n) => r.value - n.value
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
    const e = Z(this.config.entity), i = rt(t), r = this.config.name || _i(t), n = this.config.icon || t.attributes.icon || Jt(e, t.state), s = i ? NaN : parseFloat(t.state), a = !isNaN(s), c = a ? this._computeColor(s) : i ? "var(--secondary-text-color, #757575)" : "var(--primary-color, #03a9f4)", l = i ? "" : this.config.unit || t.attributes.unit_of_measurement || "", h = i ? "Unavailable" : a ? s : t.state;
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
        aria-label="${r}: ${h}${l ? " " + l : ""}"
        title="${r}: ${V(t, this.hass)}"
      >
        <div class="metric-body">
          <div class="icon-bubble">
            <ha-icon .icon=${n}></ha-icon>
          </div>
          <div class="metric-data">
            <div class="metric-value-line">
              <span class="value-text">${h}</span>
              ${l ? o`<span class="unit-text">${l}</span>` : ""}
            </div>
            <div class="metric-label" title=${r}>${r}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
ji.styles = Jc;
ji = el([
  k("ha-metric-badge")
], ji);
const il = [
  gi,
  x`
    .bar-items-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 8px;
      padding: 12px 16px 16px 16px;
    }

    .quick-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 8px 4px;
      border-radius: 10px;
      background: var(--secondary-background-color, rgba(128, 128, 128, 0.05));
      transition:
        background-color 0.2s ease,
        transform 0.15s ease;
    }

    .quick-item.active {
      background: var(--state-color-container, rgba(3, 169, 244, 0.12));
    }

    .item-icon-circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background-color: var(--card-background-color, #ffffff);
      color: var(--secondary-text-color, #757575);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.25s ease;
    }

    .item-icon-circle.active {
      background-color: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .item-label {
      font-size: 0.75rem;
      font-weight: 500;
      text-align: center;
      color: var(--primary-text-color, #212121);
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .active-badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 10px;
      background: var(--divider-color, rgba(128, 128, 128, 0.2));
      color: var(--secondary-text-color, #757575);
    }

    .active-badge.highlight {
      background: var(--primary-color, #03a9f4);
      color: #ffffff;
    }

    .quick-item.unavailable {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .quick-item:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }
  `
];
var rl = Object.getOwnPropertyDescriptor, nl = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? rl(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
let Ui = class extends bi {
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
    vi(this, this.hass, e, t.entity);
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
      r && !rt(r) && me(r) && e++;
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
      const r = this.hass?.states[i.entity], n = rt(r), s = !n && me(r), a = Z(i.entity), c = i.name || _i(r), l = i.icon || r?.attributes?.icon || Jt(a, r?.state), h = n ? "Unavailable" : V(r, this.hass);
      return o`
              <div
                class="quick-item interactive ${s ? "active" : ""} ${n ? "unavailable" : ""}"
                role="button"
                tabindex="${n ? "-1" : "0"}"
                aria-pressed="${String(s)}"
                aria-disabled="${String(n)}"
                aria-label="${c}: ${h}"
                title="${c}: ${h}"
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
Ui.styles = il;
Ui = nl([
  k("ha-quick-bar")
], Ui);
const sl = [
  gi,
  x`
    .card-body {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      gap: 14px;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(
        --secondary-background-color,
        rgba(128, 128, 128, 0.1)
      );
      color: var(--secondary-text-color, #757575);
      flex-shrink: 0;
    }

    .icon-container.active {
      color: var(--primary-color, #03a9f4);
      background-color: color-mix(in srgb, var(--primary-color, #03a9f4) 12%, transparent);
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
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--primary-text-color, #212121);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .secondary-text {
      font-size: 0.8rem;
      color: var(--secondary-text-color, #757575);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .state-label {
      font-weight: 500;
      color: var(--state-color, inherit);
    }

    /* Native Custom Toggle Switch */
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
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
      border-radius: 12px;
    }

    .toggle-track {
      position: relative;
      width: 44px;
      height: 24px;
      background-color: var(--divider-color, rgba(128, 128, 128, 0.3));
      border-radius: 12px;
      transition: background-color 0.25s ease;
    }

    .toggle-thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background-color: #ffffff;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
      transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .card-body.state-unavailable {
      opacity: 0.55;
    }

    ha-card.interactive:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 2px;
    }

    .toggle-btn:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    .toggle-btn.active .toggle-btn:disabled .toggle-track {
      opacity: 0.5;
    }
  `
];
var al = Object.defineProperty, ol = Object.getOwnPropertyDescriptor, ur = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? ol(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = (r ? a(e, i, n) : a(n)) || n);
  return r && n && al(e, i, n), n;
};
let $e = class extends ht {
  setConfig(t) {
    this._config = { ...t };
  }
  _valueChanged(t, e) {
    if (!this._config) return;
    const i = t.target;
    let r = i.type === "checkbox" ? i.checked : i.value;
    if (r === "") {
      const n = { ...this._config };
      delete n[e], this._config = n;
    } else
      this._config = {
        ...this._config,
        [e]: r
      };
    it(this, "config-changed", { config: this._config });
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
$e.styles = [
  on,
  x`
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
ur([
  Zt({ attribute: !1 })
], $e.prototype, "hass", 2);
ur([
  y()
], $e.prototype, "_config", 2);
$e = ur([
  k("ha-status-card-editor")
], $e);
var cl = Object.getOwnPropertyDescriptor, ll = (t, e, i, r) => {
  for (var n = r > 1 ? void 0 : r ? cl(e, i) : e, s = t.length - 1, a; s >= 0; s--)
    (a = t[s]) && (n = a(n) || n);
  return n;
};
let Bi = class extends bi {
  static async getConfigElement() {
    return document.createElement(
      "ha-status-card-editor"
    );
  }
  static getStubConfig(t, e, i) {
    return {
      entity: e.find((n) => n.startsWith("light.") || n.startsWith("switch.")) || e[0] || "light.living_room",
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
    vi(this, this.hass, t, this.config.entity);
  }
  _handleKeyDown(t) {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._handleTap());
  }
  async _handleToggle(t) {
    if (t.stopPropagation(), !this.hass || !this.config?.entity) return;
    const e = this.hass.states[this.config.entity];
    if (rt(e)) return;
    const i = Z(this.config.entity), r = i === "lock" ? "lock" : "toggle";
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
    if (i === "state") return V(t, this.hass);
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
    const e = Z(this.config.entity), i = rt(t), r = !i && me(t), n = this.config.name || _i(t), s = this.config.icon || t.attributes.icon || Jt(e, t.state), a = i ? "Unavailable" : V(t, this.hass), c = this._getSecondaryText(t, i), l = this.config.show_toggle !== !1 && ["light", "switch", "input_boolean", "fan", "lock"].includes(e), h = i ? "state-unavailable" : r ? "state-active" : "state-inactive";
    return o`
      <ha-card
        class="interactive"
        role="button"
        tabindex="0"
        aria-label="${n}: ${a}"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="card-body ${h}">
          <div class="icon-container ${r ? "active" : ""}">
            ${this._renderIcon(s)}
          </div>

          <div class="info-container">
            <div class="primary-title" title=${n}>${n}</div>
            <div class="secondary-text">
              ${c ? o`${c} &bull; ` : q}
              <span class="state-label">${a}</span>
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
                    aria-label="Toggle ${n}"
                    title="Toggle state"
                  >
                    <div class="toggle-track">
                      <div class="toggle-thumb"></div>
                    </div>
                  </button>
                ` : q}
        </div>
      </ha-card>
    `;
  }
};
Bi.styles = sl;
Bi = ll([
  k("ha-status-card")
], Bi);
console.info(
  "%c HA-COMPONENT-LIBRARY %c 1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #03a9f4; background: #e1f5fe; font-weight: 700; border-radius: 0 3px 3px 0;"
);
export {
  Ge as ComponentActionV2,
  _e as ComponentAppleTvControllerV1,
  Ii as ComponentCameraControllerV1,
  nt as ComponentCameraControllerV2,
  Ke as ComponentContextStripV3,
  Mt as ComponentControlRowV2,
  qt as ComponentDeviceAwareAutoEntitiesV1,
  jt as ComponentDeviceDiscoveryV2,
  Qe as ComponentEmptyStateV2,
  Ye as ComponentEmptyStateV3,
  be as ComponentEnergyDashboardV1,
  Gt as ComponentEnergyDaySelectorV1,
  ot as ComponentEnergySummaryV1,
  ci as ComponentFavouritesMinimalV1,
  Ct as ComponentFavouritesV3,
  ut as ComponentGarageDoorControllerV1,
  Kt as ComponentHistoryGraphV2,
  xe as ComponentHomeOverviewV4,
  Li as ComponentHomeOverviewV5,
  Mi as ComponentHouseholdAttentionV1,
  Qt as ComponentHouseholdAttentionV2,
  ye as ComponentHouseholdDirectoryV3,
  Xe as ComponentListV2,
  wt as ComponentMediaRowV2,
  mt as ComponentMetricPairCardV3,
  si as ComponentNavigationTileV2,
  Ze as ComponentNoticeV2,
  Je as ComponentProgressV2,
  ai as ComponentQuickNavigationV2,
  Yt as ComponentRoomDirectoryV4,
  ge as ComponentRoomNavigationV1,
  oi as ComponentRoomSheetV2,
  ti as ComponentSectionSeparatorV2,
  Ft as ComponentSecurityCameraWallV3,
  at as ComponentSecurityDashboardV1,
  Vt as ComponentSecurityEntryPointsV1,
  Wt as ComponentSecuritySummaryV1,
  ei as ComponentSingleKpiV2,
  St as ComponentSmartCollectionV3,
  Bt as ComponentSplitControllerV4,
  ii as ComponentStatusRowV2,
  ri as ComponentTextEffectV1,
  ni as ComponentThreeStatV2,
  $t as ComponentUpdateRowV3,
  Ut as ComponentUpdateSummaryV3,
  li as ComponentWelcomeHeaderV1,
  st as ComponentWledControllerV1,
  _s as DASHBOARD_BASE_CARD_STYLES,
  an as DASHBOARD_SHARED_STYLE_CSS,
  Dr as DASHBOARD_SHARED_STYLE_ID,
  Os as DashboardRegistryCoordinator,
  kt as EnergyHistoryCardV3,
  nn as GLOBAL_THEME_CSS,
  Tr as GLOBAL_THEME_STYLE_ID,
  qi as HaActionTile,
  bi as HaBaseCard,
  xt as HaComponentLibraryConfigEditor,
  ji as HaMetricBadge,
  Ui as HaQuickBar,
  Bi as HaStatusCard,
  zt as INTERACTION_DEFAULTS,
  A as LitBaseCard,
  gs as PRESENTATIONAL_CARD_STYLES,
  ve as SolarDaylightCardV7,
  vs as UPDATE_CARD_STYLES,
  Hi as WLED_DOMAIN,
  Ur as WLED_INVALID,
  $n as WLED_NAME,
  Bs as actionCardStyles,
  Le as actionRole,
  Kc as actionTileCardStyles,
  un as appleTvBundle,
  yo as appleTvCardStyles,
  bn as applyPrefs,
  Nt as areaOf,
  Ji as buttonStyles,
  Yr as calendarDayRange,
  So as cameraCardStyles,
  Se as cardBaseStyles,
  R as centralRegistry,
  gi as commonCardStyles,
  xn as computeAreaStatusSummary,
  Z as computeDomain,
  ft as computeEntityDisplayName,
  _i as computeEntityName,
  rr as connectionId,
  Gs as contextStripCardStyles,
  Rs as controlConfig,
  mn as controlDomains,
  le as controlResolvers,
  Ka as controlRowCardStyles,
  ms as controlStyles,
  en as createAsyncBroker,
  yn as createCardElement,
  ps as createLifecycle,
  rn as createMinuteScheduler,
  Qi as createRequestCoalescer,
  j as dashboardBaseCardStyles,
  Ms as dashboardProfiles,
  ml as dashboardTokens,
  fe as dayKey,
  re as dayKeyInZone,
  gn as defaultControlConfig,
  io as deviceAwareAutoEntitiesCardStyles,
  ao as deviceDiscoveryCardStyles,
  Ri as discoverControls,
  D as domainOf,
  Xs as emptyStateCardStyles,
  Qo as energyDashboardCardStyles,
  We as energyDayData,
  Xo as energyDaySelectorCardStyles,
  L as energyDayState,
  oc as energyHistoryCardStyles,
  tc as energySummaryCardStyles,
  ds as ensureInteractionFeedback,
  ce as entryFilters,
  Ue as escapeHtml,
  wc as favouritesCardStyles,
  it as fireEvent,
  ui as formatCalendarDay,
  hi as formatDate,
  pt as formatEnergy,
  V as formatEntityState,
  et as formatPower,
  Be as formatTime,
  hn as garageControl,
  zo as garageDoorCardStyles,
  Jt as getDefaultIconForDomain,
  us as globalTokens,
  vi as handleAction,
  sn as headerStyles,
  vl as healthAwareRegistryLoad,
  mc as historyGraphCardStyles,
  Cc as homeOverviewCardStyles,
  Fc as householdAttentionCardStyles,
  Hc as householdDirectoryCardStyles,
  Zi as iconBoxStyles,
  Us as initWledIntegration,
  fs as injectDashboardTokens,
  hs as injectGlobalTokens,
  as as installConfigContract,
  S as interaction,
  os as interactionStyles,
  Ns as isActive,
  ks as isControlActive,
  ir as isDiagnosticOrPeripheral,
  me as isEntityActive,
  cn as isEntityAvailable,
  rt as isEntityUnavailable,
  dn as isPeripheralEntity,
  Hs as isPotential,
  Or as isPrimaryControl,
  fl as isSensorMetric,
  ea as listCardStyles,
  _l as loadDashboardRegistries,
  _n as loadPrefs,
  Ae as loadSecurityModel,
  di as localeOf,
  Za as mediaRowCardStyles,
  Jc as metricBadgeCardStyles,
  vc as metricPairCardStyles,
  pn as nativeClimateControlConfig,
  Oa as navTileCardStyles,
  Kr as navigateTo,
  sa as noticeCardStyles,
  Rt as numberFormat,
  Hn as openMoreInfo,
  hl as prefersReducedMotion,
  ct as presentationalCardStyles,
  la as progressCardStyles,
  qs as ptzRole,
  il as quickBarCardStyles,
  Ra as quickNavCardStyles,
  E as registerCard,
  fn as registerControlResolver,
  gl as registerDeviceResolver,
  ln as registerEntryFilter,
  Nr as resolveDeviceCard,
  Lc as roomDirectoryCardStyles,
  qa as roomNavigationCardStyles,
  Fa as roomSheetCardStyles,
  Xi as rowStyles,
  vn as savePrefs,
  ua as sectionSeparatorCardStyles,
  Lo as securityCameraWallCardStyles,
  xi as securityCapabilityText,
  jo as securityDashboardCardStyles,
  Ie as securityEntityLabel,
  Fo as securityEntryPointsCardStyles,
  js as securityModel,
  Go as securitySummaryCardStyles,
  ul as sheetStyles,
  ga as singleKpiCardStyles,
  Tc as smartCollectionCardStyles,
  rc as solarDaylightCardStyles,
  Oo as splitAcCardStyles,
  Dt as splitIdentity,
  Q as stateNameOf,
  sl as statusCardCardStyles,
  ya as statusRowCardStyles,
  jr as switchRole,
  ka as textEffectCardStyles,
  Ea as threeStatCardStyles,
  pi as timeZoneOf,
  Gr as toText,
  yi as uiEntry,
  tr as updateCardStyles,
  ho as updateRowCardStyles,
  go as updateSummaryCardStyles,
  wn as validDay,
  ue as waitForEntityState,
  Sc as welcomeHeaderCardStyles,
  No as wledCardStyles
};
