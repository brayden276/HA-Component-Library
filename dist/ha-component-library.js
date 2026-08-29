const or = (t) => t == null ? "" : String(t), ai = (t) => or(t).replace(
  /[&<>"']/g,
  (e) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[e] || e
), bt = (t, e, i, s) => {
  const r = new CustomEvent(e, {
    bubbles: s?.bubbles ?? !0,
    cancelable: !!s?.cancelable,
    composed: s?.composed ?? !0,
    detail: i
  });
  return t.dispatchEvent(r), r;
}, Kr = (t, e) => {
  e && bt(t, "hass-more-info", { entityId: e });
}, cr = (t) => {
  t && (window.history.pushState(null, "", t), bt(window, "location-changed", { replace: !1 }));
}, Si = (t) => {
  const e = t?.locale?.language || (typeof navigator < "u" ? navigator.language : "en-AU") || "en-AU";
  return e === "en" ? "en-AU" : e;
}, Ai = (t) => t?.config?.time_zone || void 0, se = (t, e, i = {}) => {
  const s = Number(e);
  return Number.isFinite(s) ? new Intl.NumberFormat(Si(t), i).format(s) : "—";
}, gt = (t, e, i = {}) => {
  if (e == null || e === "") return "—";
  const s = Number(e);
  if (!Number.isFinite(s)) return "—";
  const r = i.absolute ? Math.abs(s) : s;
  return Math.abs(r) >= 1e3 ? `${se(t, r / 1e3, { maximumFractionDigits: 1 })} kW` : `${se(t, Math.round(r), { maximumFractionDigits: 0 })} W`;
}, xt = (t, e) => {
  if (e == null || e === "") return "—";
  const i = Number(e);
  return Number.isFinite(i) ? `${se(t, i, { maximumFractionDigits: Math.abs(i) < 1 ? 2 : 1 })} kWh` : "—";
}, Ei = (t, e, i) => new Intl.DateTimeFormat(Si(t), {
  timeZone: Ai(t),
  ...i
}).format(new Date(e)), Di = (t, e, i = {}) => {
  const s = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  return s ? Ei(
    t,
    Date.UTC(Number(s[1]), Number(s[2]) - 1, Number(s[3]), 12),
    {
      timeZone: "UTC",
      ...i
    }
  ) : "—";
}, lr = (t, e) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  if (!i) return null;
  const s = Number(i[1]), r = Number(i[2]) - 1, a = Number(i[3]), n = Ai(t);
  if (!n)
    return { start: new Date(s, r, a).getTime(), end: new Date(s, r, a + 1).getTime() };
  const c = new Intl.DateTimeFormat("en-AU", {
    timeZone: n,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }), l = (d, f, g) => {
    const h = Date.UTC(d, f, g);
    let u = h;
    for (let p = 0; p < 2; p += 1) {
      const _ = Object.fromEntries(
        c.formatToParts(new Date(u)).map((b) => [b.type, b.value])
      ), m = Date.UTC(
        Number(_.year),
        Number(_.month) - 1,
        Number(_.day),
        Number(_.hour),
        Number(_.minute),
        Number(_.second)
      );
      u += h - m;
    }
    return u;
  };
  return {
    start: l(s, r, a),
    end: l(s, r, a + 1)
  };
}, ni = (t, e, i = {}) => Ei(t, e, {
  hour: "numeric",
  minute: "2-digit",
  ...i
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ii = globalThis, ns = ii.ShadowRoot && (ii.ShadyCSS === void 0 || ii.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, os = Symbol(), Is = /* @__PURE__ */ new WeakMap();
let dr = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== os) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ns && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = Is.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && Is.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ve = (t) => new dr(typeof t == "string" ? t : t + "", void 0, os), y = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, r, a) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[a + 1], t[0]);
  return new dr(i, t, os);
}, Yr = (t, e) => {
  if (ns) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), r = ii.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, t.appendChild(s);
  }
}, Rs = ns ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return ve(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Qr, defineProperty: Zr, getOwnPropertyDescriptor: Jr, getOwnPropertyNames: Xr, getOwnPropertySymbols: ta, getPrototypeOf: ea } = Object, Ti = globalThis, Hs = Ti.trustedTypes, ia = Hs ? Hs.emptyScript : "", sa = Ti.reactiveElementPolyfillSupport, ke = (t, e) => t, oi = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ia : null;
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
} }, cs = (t, e) => !Qr(t, e), Ns = { attribute: !0, type: String, converter: oi, reflect: !1, useDefault: !1, hasChanged: cs };
Symbol.metadata ??= Symbol("metadata"), Ti.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Qt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ns) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(e, s, i);
      r !== void 0 && Zr(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: r, set: a } = Jr(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: r, set(n) {
      const c = r?.call(this);
      a?.call(this, n), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ns;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ke("elementProperties"))) return;
    const e = ea(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ke("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ke("properties"))) {
      const i = this.properties, s = [...Xr(i), ...ta(i)];
      for (const r of s) this.createProperty(r, i[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [s, r] of i) this.elementProperties.set(s, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, s] of this.elementProperties) {
      const r = this._$Eu(i, s);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const r of s) i.unshift(Rs(r));
    } else e !== void 0 && i.push(Rs(e));
    return i;
  }
  static _$Eu(e, i) {
    const s = i.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
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
    for (const s of i.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Yr(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, i, s) {
    this._$AK(e, s);
  }
  _$ET(e, i) {
    const s = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, s);
    if (r !== void 0 && s.reflect === !0) {
      const a = (s.converter?.toAttribute !== void 0 ? s.converter : oi).toAttribute(i, s.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = s.getPropertyOptions(r), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : oi;
      this._$Em = r;
      const c = n.fromAttribute(i, a.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, r = !1, a) {
    if (e !== void 0) {
      const n = this.constructor;
      if (r === !1 && (a = this[e]), s ??= n.getPropertyOptions(e), !((s.hasChanged ?? cs)(a, i) || s.useDefault && s.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: r, wrapped: a }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, a] of s) {
        const { wrapped: n } = a, c = this[r];
        n !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, a, c);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(i)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
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
Qt.elementStyles = [], Qt.shadowRootOptions = { mode: "open" }, Qt[ke("elementProperties")] = /* @__PURE__ */ new Map(), Qt[ke("finalized")] = /* @__PURE__ */ new Map(), sa?.({ ReactiveElement: Qt }), (Ti.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ls = globalThis, Ls = (t) => t, ci = ls.trustedTypes, Ms = ci ? ci.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, hr = "$lit$", yt = `lit$${Math.random().toFixed(9).slice(2)}$`, pr = "?" + yt, ra = `<${pr}>`, Ot = document, Ee = () => Ot.createComment(""), De = (t) => t === null || typeof t != "object" && typeof t != "function", ds = Array.isArray, aa = (t) => ds(t) || typeof t?.[Symbol.iterator] == "function", Bi = `[ 	
\f\r]`, we = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qs = /-->/g, Us = />/g, Tt = RegExp(`>|${Bi}(?:([^\\s"'>=/]+)(${Bi}*=${Bi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), js = /'/g, Fs = /"/g, ur = /^(?:script|style|textarea|title)$/i, na = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), o = na(1), re = Symbol.for("lit-noChange"), F = Symbol.for("lit-nothing"), Bs = /* @__PURE__ */ new WeakMap(), Pt = Ot.createTreeWalker(Ot, 129);
function mr(t, e) {
  if (!ds(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ms !== void 0 ? Ms.createHTML(e) : e;
}
const oa = (t, e) => {
  const i = t.length - 1, s = [];
  let r, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = we;
  for (let c = 0; c < i; c++) {
    const l = t[c];
    let d, f, g = -1, h = 0;
    for (; h < l.length && (n.lastIndex = h, f = n.exec(l), f !== null); ) h = n.lastIndex, n === we ? f[1] === "!--" ? n = qs : f[1] !== void 0 ? n = Us : f[2] !== void 0 ? (ur.test(f[2]) && (r = RegExp("</" + f[2], "g")), n = Tt) : f[3] !== void 0 && (n = Tt) : n === Tt ? f[0] === ">" ? (n = r ?? we, g = -1) : f[1] === void 0 ? g = -2 : (g = n.lastIndex - f[2].length, d = f[1], n = f[3] === void 0 ? Tt : f[3] === '"' ? Fs : js) : n === Fs || n === js ? n = Tt : n === qs || n === Us ? n = we : (n = Tt, r = void 0);
    const u = n === Tt && t[c + 1].startsWith("/>") ? " " : "";
    a += n === we ? l + ra : g >= 0 ? (s.push(d), l.slice(0, g) + hr + l.slice(g) + yt + u) : l + yt + (g === -2 ? c : u);
  }
  return [mr(t, a + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class Te {
  constructor({ strings: e, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let a = 0, n = 0;
    const c = e.length - 1, l = this.parts, [d, f] = oa(e, i);
    if (this.el = Te.createElement(d, s), Pt.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (r = Pt.nextNode()) !== null && l.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const g of r.getAttributeNames()) if (g.endsWith(hr)) {
          const h = f[n++], u = r.getAttribute(g).split(yt), p = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: a, name: p[2], strings: u, ctor: p[1] === "." ? la : p[1] === "?" ? da : p[1] === "@" ? ha : Pi }), r.removeAttribute(g);
        } else g.startsWith(yt) && (l.push({ type: 6, index: a }), r.removeAttribute(g));
        if (ur.test(r.tagName)) {
          const g = r.textContent.split(yt), h = g.length - 1;
          if (h > 0) {
            r.textContent = ci ? ci.emptyScript : "";
            for (let u = 0; u < h; u++) r.append(g[u], Ee()), Pt.nextNode(), l.push({ type: 2, index: ++a });
            r.append(g[h], Ee());
          }
        }
      } else if (r.nodeType === 8) if (r.data === pr) l.push({ type: 2, index: a });
      else {
        let g = -1;
        for (; (g = r.data.indexOf(yt, g + 1)) !== -1; ) l.push({ type: 7, index: a }), g += yt.length - 1;
      }
      a++;
    }
  }
  static createElement(e, i) {
    const s = Ot.createElement("template");
    return s.innerHTML = e, s;
  }
}
function ae(t, e, i = t, s) {
  if (e === re) return e;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const a = De(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(t), r._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = r : i._$Cl = r), r !== void 0 && (e = ae(t, r._$AS(t, e.values), r, s)), e;
}
class ca {
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
    const { el: { content: i }, parts: s } = this._$AD, r = (e?.creationScope ?? Ot).importNode(i, !0);
    Pt.currentNode = r;
    let a = Pt.nextNode(), n = 0, c = 0, l = s[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let d;
        l.type === 2 ? d = new qe(a, a.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(a, l.name, l.strings, this, e) : l.type === 6 && (d = new pa(a, this, e)), this._$AV.push(d), l = s[++c];
      }
      n !== l?.index && (a = Pt.nextNode(), n++);
    }
    return Pt.currentNode = Ot, r;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class qe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, r) {
    this.type = 2, this._$AH = F, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = ae(this, e, i), De(e) ? e === F || e == null || e === "" ? (this._$AH !== F && this._$AR(), this._$AH = F) : e !== this._$AH && e !== re && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : aa(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== F && De(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ot.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = Te.createElement(mr(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const a = new ca(r, this), n = a.u(this.options);
      a.p(i), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Bs.get(e.strings);
    return i === void 0 && Bs.set(e.strings, i = new Te(e)), i;
  }
  k(e) {
    ds(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const a of e) r === i.length ? i.push(s = new qe(this.O(Ee()), this.O(Ee()), this, this.options)) : s = i[r], s._$AI(a), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = Ls(e).nextSibling;
      Ls(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Pi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, r, a) {
    this.type = 1, this._$AH = F, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = a, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = F;
  }
  _$AI(e, i = this, s, r) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = ae(this, e, i, 0), n = !De(e) || e !== this._$AH && e !== re, n && (this._$AH = e);
    else {
      const c = e;
      let l, d;
      for (e = a[0], l = 0; l < a.length - 1; l++) d = ae(this, c[s + l], i, l), d === re && (d = this._$AH[l]), n ||= !De(d) || d !== this._$AH[l], d === F ? e = F : e !== F && (e += (d ?? "") + a[l + 1]), this._$AH[l] = d;
    }
    n && !r && this.j(e);
  }
  j(e) {
    e === F ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class la extends Pi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === F ? void 0 : e;
  }
}
class da extends Pi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== F);
  }
}
class ha extends Pi {
  constructor(e, i, s, r, a) {
    super(e, i, s, r, a), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = ae(this, e, i, 0) ?? F) === re) return;
    const s = this._$AH, r = e === F && s !== F || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, a = e !== F && (s === F || r);
    r && this.element.removeEventListener(this.name, this, s), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class pa {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ae(this, e);
  }
}
const ua = ls.litHtmlPolyfillSupport;
ua?.(Te, qe), (ls.litHtmlVersions ??= []).push("3.3.3");
const ma = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const a = i?.renderBefore ?? null;
    s._$litPart$ = r = new qe(e.insertBefore(Ee(), a), a, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hs = globalThis;
class wt extends Qt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ma(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return re;
  }
}
wt._$litElement$ = !0, wt.finalized = !0, hs.litElementHydrateSupport?.({ LitElement: wt });
const ga = hs.litElementPolyfillSupport;
ga?.({ LitElement: wt });
(hs.litElementVersions ??= []).push("4.2.2");
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
const fa = { attribute: !0, type: String, converter: oi, reflect: !1, hasChanged: cs }, ba = (t = fa, e, i) => {
  const { kind: s, metadata: r } = i;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(i.name, t), s === "accessor") {
    const { name: n } = i;
    return { set(c) {
      const l = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(n, l, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, t, c), c;
    } };
  }
  if (s === "setter") {
    const { name: n } = i;
    return function(c) {
      const l = this[n];
      e.call(this, c), this.requestUpdate(n, l, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Mt(t) {
  return (e, i) => typeof i == "object" ? ba(t, e, i) : ((s, r, a) => {
    const n = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, s), n ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function x(t) {
  return Mt({ ...t, state: !0, attribute: !1 });
}
var _a = Object.defineProperty, va = Object.getOwnPropertyDescriptor, Ue = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? va(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && _a(e, i, r), r;
};
let zt = class extends wt {
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
          ${this.cardType ? o`<span class="type-badge">${ai(this.cardType)}</span>` : ""}
        </div>
        <textarea
          .value=${t}
          @change=${this._onChange}
          spellcheck="false"
          aria-label="Card Configuration JSON"
        ></textarea>
        ${this._error ? o`<div class="error">⚠️ ${ai(this._error)}</div>` : ""}
      </div>
    `;
  }
};
zt.styles = y`
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
Ue([
  Mt({ attribute: !1 })
], zt.prototype, "hass", 2);
Ue([
  Mt({ type: String })
], zt.prototype, "cardType", 2);
Ue([
  x()
], zt.prototype, "_config", 2);
Ue([
  x()
], zt.prototype, "_error", 2);
zt = Ue([
  k("ha-component-library-config-editor")
], zt);
const ya = (t, e) => {
  e.getStubConfig || (e.getStubConfig = () => ({
    ...e.stubConfig || {}
  })), e.getConfigElement || (e.getConfigElement = () => {
    const i = document.createElement(
      "ha-component-library-config-editor"
    );
    return i.cardType = t, i;
  });
}, E = (t) => {
  const { type: e, element: i, name: s, description: r, preview: a = !0 } = t;
  ya(e, i), customElements.get(e) || customElements.define(e, i), typeof window < "u" && (window.customCards = window.customCards || [], window.customCards.some((n) => n.type === e) || window.customCards.push({
    type: e,
    name: s,
    description: r,
    preview: a
  }));
}, Wt = Object.freeze({
  holdDelay: 500,
  moveTolerance: 10,
  errorDuration: 1800,
  repeatDelay: 350,
  repeatInterval: 110,
  repeatMinimumInterval: 55
}), Tl = () => typeof window < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0, xa = `
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
`, wa = (t) => {
  if (!t) return null;
  if (t === !0) return {};
  if (typeof t != "object")
    throw new TypeError(
      "interaction repeat must be false, true, or an options object"
    );
  return t;
}, $a = (t, e) => {
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
}, Ca = (t) => {
  const e = t.getRootNode?.();
  if (!e || e.__haInteractionFeedbackV2) return null;
  e.__haInteractionFeedbackV2 = !0;
  const i = document.createElement("style");
  i.setAttribute("data-ha-interaction-styles", "v2"), i.textContent = xa;
  const s = document.createElement("span");
  s.setAttribute("data-ha-interaction-status", "v2"), s.setAttribute("role", "status"), s.setAttribute("aria-live", "polite"), s.setAttribute("aria-atomic", "true");
  const r = e.nodeType === 9 || e.body ? e.body || e.head || e.documentElement : e;
  return r && typeof r.append == "function" && r.append(i, s), s;
}, Vs = [
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
].join(","), T = (t, e = {}) => {
  if (!t?.addEventListener)
    throw new TypeError("interaction requires an EventTarget element");
  const i = Ca(t), s = typeof e.primary == "function" ? e.primary : null, r = typeof e.hold == "function" ? e.hold : null, a = wa(e.repeat);
  if (r && a)
    throw new TypeError("interaction hold and repeat are mutually exclusive");
  if (!s && (r || a))
    throw new TypeError("interaction hold/repeat requires a primary action");
  const n = e.feedback !== !1, c = e.singleFlight === !0, l = Math.max(
    250,
    Number(e.holdDelay) || Wt.holdDelay
  ), d = Math.max(
    4,
    Number(e.moveTolerance) || Wt.moveTolerance
  ), f = $a(e.optimistic, t), g = e.signal, h = typeof e.onPressChange == "function" ? e.onPressChange : null;
  let u = null, p = null, _ = null, m = null, b = 0, $ = !1, v = null, D = !1, H = 0, L = null, M = !1, w = !1;
  const z = (C) => {
    const tt = C?.composedPath?.();
    if (Array.isArray(tt) && tt.length)
      for (const ct of tt) {
        if (ct === t) return !1;
        if (ct?.matches?.(Vs))
          return !0;
      }
    const it = C?.target;
    if (!it || it === t) return !1;
    const st = it.closest?.(Vs);
    return !!(st && st !== t && t.contains?.(st));
  }, U = () => M || c && H > 0 || t.disabled === !0 || t.getAttribute?.("aria-disabled") === "true", N = () => {
    v && clearTimeout(v), v = null, $ = !1;
  }, K = () => {
    $ = !0, v && clearTimeout(v), v = setTimeout(N, 0);
  }, Y = (C) => {
    w !== C && (w = C, n && t.toggleAttribute?.("data-interaction-pressed", C), M || h?.(C, t));
  }, Bt = (C) => {
    H = Math.max(0, H + C), !(!n || M) && (t.toggleAttribute?.("data-interaction-pending", H > 0), t.setAttribute?.("aria-busy", String(H > 0)));
  }, Vt = () => {
    if (!n || M) return;
    L && clearTimeout(L), t.setAttribute?.("data-interaction-error", "true");
    const C = i || t.getRootNode?.()?.querySelector?.(
      "[data-ha-interaction-status]"
    );
    C && (C.textContent = e.errorMessage || "Action failed. Try again."), L = setTimeout(
      () => {
        L = null, M || t.removeAttribute?.("data-interaction-error");
      },
      Math.max(
        250,
        Number(e.errorDuration) || Wt.errorDuration
      )
    );
  }, Ye = (C) => {
    M || t.dispatchEvent?.(
      new CustomEvent("ha-interaction-error", {
        bubbles: !0,
        composed: !0,
        detail: { error: C }
      })
    );
  }, mt = (C, tt) => {
    if (U()) return Promise.resolve(void 0);
    const it = C === "hold" ? r : s;
    if (!it) return Promise.resolve(void 0);
    let st;
    C === "primary" && f && (st = f.capture(t, tt), f.apply(t, tt, st));
    let ct;
    try {
      ct = it(tt);
    } catch (Dt) {
      return !M && C === "primary" && f?.rollback && f.rollback(st, Dt, t, tt), Vt(), Ye(Dt), Promise.reject(Dt);
    }
    return !ct || typeof ct.then != "function" ? Promise.resolve(ct) : (Bt(1), Promise.resolve(ct).catch((Dt) => {
      throw !M && C === "primary" && f?.rollback && f.rollback(st, Dt, t, tt), Vt(), Ye(Dt), Dt;
    }).finally(() => {
      M || Bt(-1);
    }));
  }, I = () => {
    p && clearTimeout(p), p = null, _ && clearTimeout(_), _ = null, m && clearInterval(m), m = null;
  }, X = () => {
    I(), u = null, Y(!1);
  }, vt = (C) => {
    if (!a || U()) return;
    const tt = Math.max(
      150,
      Number(a.delay) || Wt.repeatDelay
    ), it = Math.max(
      40,
      Number(a.interval) || Wt.repeatInterval
    );
    b = 0, _ = setTimeout(() => {
      if (_ = null, M || !u) return;
      D = !0, K();
      const st = () => {
        if (M || !u) {
          m && clearInterval(m), m = null;
          return;
        }
        if (b += 1, mt("primary", C).catch(() => {
        }), M || !u || !a.accelerate) return;
        const ct = Math.max(
          Number(a.minimumInterval) || Wt.repeatMinimumInterval,
          Math.round(it * Math.pow(0.93, b))
        );
        m && clearInterval(m), m = setInterval(st, ct);
      };
      mt("primary", C).catch(() => {
      }), !M && u && (m = setInterval(st, it));
    }, tt);
  }, Et = (C) => {
    if (!(!s || U() || C.button > 0 || z(C))) {
      u = { id: C.pointerId, x: C.clientX, y: C.clientY }, D = !1, N();
      try {
        t.setPointerCapture?.(C.pointerId);
      } catch {
      }
      Y(!0), r ? p = setTimeout(() => {
        p = null, u && (D = !0, K(), Y(!1), mt("hold", C).catch(() => {
        }));
      }, l) : a && vt(C);
    }
  }, xe = (C) => {
    !u || C.pointerId !== u.id || Math.hypot(C.clientX - u.x, C.clientY - u.y) <= d || (D = !0, K(), X());
  }, Ts = (C) => {
    if (!u || C.pointerId !== u.id) return;
    if (z(C)) {
      D = !0, K(), X();
      return;
    }
    const tt = D, it = a && (_ === null || m !== null);
    I(), u = null, D = !1, Y(!1), K(), !tt && !it && mt("primary", C).catch(() => {
    });
  }, Qe = () => {
    D = !1, K(), X();
  }, Ps = (C) => {
    if (!z(C)) {
      if ($) {
        C.preventDefault(), C.stopImmediatePropagation?.(), N();
        return;
      }
      !s || U() || mt("primary", C).catch(() => {
      });
    }
  }, Os = (C) => {
    !s || U() || C.repeat || z(C) || C.key !== "Enter" && C.key !== " " || (C.preventDefault(), Y(!0));
  }, zs = (C) => {
    !s || U() || z(C) || C.key !== "Enter" && C.key !== " " || (C.preventDefault(), Y(!1), K(), mt("primary", C).catch(() => {
    }));
  };
  t.addEventListener("pointerdown", Et, {
    passive: !0
  }), t.addEventListener("pointermove", xe, {
    passive: !0
  }), t.addEventListener("pointerup", Ts, {
    passive: !0
  }), t.addEventListener("pointercancel", Qe, {
    passive: !0
  }), t.addEventListener(
    "lostpointercapture",
    Qe,
    { passive: !0 }
  ), t.addEventListener("click", Ps, !0), t.addEventListener("keydown", Os), t.addEventListener("keyup", zs);
  const Fi = () => {
    M || (M = !0, I(), L && clearTimeout(L), v && clearTimeout(v), L = null, v = null, g?.removeEventListener?.("abort", Fi), w = !1, H = 0, n && (t.removeAttribute?.("data-interaction-pressed"), t.removeAttribute?.("data-interaction-pending"), t.removeAttribute?.("data-interaction-error"), t.setAttribute?.("aria-busy", "false")), t.removeEventListener("pointerdown", Et), t.removeEventListener("pointermove", xe), t.removeEventListener("pointerup", Ts), t.removeEventListener(
      "pointercancel",
      Qe
    ), t.removeEventListener(
      "lostpointercapture",
      Qe
    ), t.removeEventListener("click", Ps, !0), t.removeEventListener("keydown", Os), t.removeEventListener("keyup", zs));
  };
  return g?.addEventListener?.("abort", Fi, { once: !0 }), Object.freeze({
    element: t,
    destroy: Fi,
    get destroyed() {
      return M;
    },
    invoke: (C) => mt("primary", C)
  });
}, ps = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createRequestCoalescer requires a request function");
  let i = !1, s = !1, r, a = !1, n = 0;
  const c = async () => {
    if (!(i || a || !s)) {
      for (i = !0; !a && s; ) {
        s = !1;
        const l = r, d = ++n;
        try {
          await t(l, d), a || e.onSuccess?.(l, d);
        } catch (f) {
          a || e.onError?.(f, l, d), e.stopOnError && (s = !1);
        }
      }
      i = !1, a || e.onIdle?.();
    }
  };
  return Object.freeze({
    request(l) {
      a || (r = l, s = !0, c());
    },
    get pending() {
      return !a && (i || s);
    },
    get destroyed() {
      return a;
    },
    destroy() {
      a = !0, s = !1;
    }
  });
}, Pe = (t, e, i, s = {}) => {
  if (!e || typeof i != "function")
    return Promise.reject(
      new TypeError("waitForEntityState requires an entity and predicate")
    );
  const r = typeof t == "function" ? t : () => t, a = Math.max(250, Number(s.timeout) || 9e3), n = Math.max(40, Number(s.interval) || 160), c = s.signal;
  return new Promise((l, d) => {
    let f = null, g = null, h = !1;
    const u = () => {
      f && clearInterval(f), g && clearTimeout(g), c?.removeEventListener?.("abort", _);
    }, p = (b, $) => {
      h || (h = !0, u(), b($));
    }, _ = () => p(d, c?.reason || new Error("State confirmation aborted")), m = () => {
      const b = r()?.states?.[e] ?? null;
      try {
        i(b?.state, b) && p(l, b);
      } catch ($) {
        p(d, $);
      }
    };
    if (c?.aborted) return _();
    c?.addEventListener?.("abort", _, { once: !0 }), f = setInterval(m, n), g = setTimeout(
      () => p(d, new Error("State confirmation timed out")),
      a
    ), m();
  });
}, gr = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createAsyncBroker requires a loader");
  const i = /* @__PURE__ */ new Map(), s = Math.max(0, Number(e.ttl) || 12e4), r = Math.max(s, Number(e.maxStale) || 864e5), a = Math.max(250, Number(e.retryBase) || 2e3), n = Math.max(a, Number(e.retryMax) || 6e4), c = (g) => (i.has(g) || i.set(g, {
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
    const h = c(g), u = h.updatedAt ? Date.now() - h.updatedAt : 1 / 0;
    return Object.freeze({
      value: h.value,
      error: h.error,
      loading: !!h.promise,
      stale: h.value !== void 0 && (h.invalidated || u > s),
      updatedAt: h.updatedAt
    });
  }, d = (g) => {
    const h = l(g);
    for (const u of [...c(g).subscribers])
      try {
        u(h);
      } catch {
      }
  }, f = (g, h, u = !1) => {
    const p = c(g), _ = Date.now();
    if (p.promise) return p.promise;
    if (!u && _ < p.nextRetryAt)
      return p.value !== void 0 ? Promise.resolve(p.value) : Promise.reject(p.error);
    const m = ++p.sequence, b = p.generation;
    return p.promise = Promise.resolve().then(() => t(g, h, m)).then(($) => m !== p.sequence ? p.value : (p.value = $, p.error = null, p.updatedAt = Date.now(), p.failures = 0, p.nextRetryAt = 0, p.invalidated = p.generation !== b, $)).catch(($) => {
      if (m !== p.sequence || (p.error = $ instanceof Error ? $ : new Error(String($)), p.failures += 1, p.nextRetryAt = Date.now() + Math.min(n, a * Math.pow(2, p.failures - 1)), p.value !== void 0 && Date.now() - p.updatedAt <= r))
        return p.value;
      throw p.error;
    }).finally(() => {
      m === p.sequence && (p.promise = null), d(g);
    }), d(g), p.promise;
  };
  return Object.freeze({
    clear() {
      i.clear();
    },
    invalidate(g) {
      const h = i.get(g);
      h && (h.invalidated = !0, h.generation += 1, h.nextRetryAt = 0, d(g));
    },
    peek: l,
    async read(g, h, u = {}) {
      const p = l(g), _ = p.updatedAt ? Date.now() - p.updatedAt : 1 / 0, m = c(g);
      if (!u.force && !m.invalidated && p.value !== void 0 && _ <= s)
        return p.value;
      if (!u.force && p.value !== void 0 && _ <= r)
        return f(g, h).catch(() => {
        }), p.value;
      let b;
      try {
        b = await f(g, h, u.force === !0);
      } catch ($) {
        if (u.force && c(g).invalidated)
          return f(g, h, !0);
        throw $;
      }
      return u.force && c(g).invalidated && (b = await f(g, h, !0)), b;
    },
    refresh: (g, h) => f(g, h, !0),
    subscribe(g, h, u = {}) {
      const p = c(g);
      return p.subscribers.add(h), u.replay !== !1 && h(l(g)), () => {
        p.subscribers.delete(h);
      };
    }
  });
}, ka = (t) => {
  let e = null, i = [];
  const s = () => (e && !e.signal.aborted || (e = new AbortController()), e.signal);
  return Object.freeze({
    cleanup: (c) => (typeof c != "function" || i.push(c), c),
    connect: s,
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
      return s();
    },
    host: t,
    listen: (c, l, d, f = {}) => {
      const g = s();
      return c?.addEventListener?.(l, d, { ...f, signal: g }), d;
    }
  });
}, fr = (t, e) => {
  let i = null, s = !0;
  const r = () => {
    if (!s) return;
    const n = 6e4 - Date.now() % 6e4 + 100;
    i = setTimeout(() => {
      if (s) {
        try {
          t();
        } catch {
        }
        r();
      }
    }, n);
  };
  r();
  const a = () => {
    s = !1, i && (clearTimeout(i), i = null);
  };
  return e && e.cleanup(a), a;
}, Sa = "dashboard-style-tokens", br = `
:host {
  /* Canonical Design Tokens from Design Catalogue */
  --dashboard-radius-card: 8px;
  --dashboard-radius-control: 6px;
  --dashboard-radius-dialog: 10px;
  --dashboard-radius-icon: 0px;
  --dashboard-modal-scrim: rgba(0, 0, 0, 0.16);
  --dashboard-dialog-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
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
  --dashboard-card-surface: var(--ha-card-background, var(--card-background-color, #1c1c1e));
  --dashboard-card-muted-surface: color-mix(in srgb, var(--primary-text-color, #e1e1e1) 3%, var(--card-background-color, #1c1c1e));
  --dashboard-card-border-color: color-mix(in srgb, var(--primary-text-color, #e1e1e1) 10%, transparent);
  --dashboard-card-border: 1px solid var(--dashboard-card-border-color);
  --dashboard-active-surface: color-mix(in srgb, var(--primary-color, #03a9f4) 7%, var(--card-background-color, #1c1c1e));
  --dashboard-warning-surface: color-mix(in srgb, var(--warning-color, #f9a825) 9%, var(--card-background-color, #1c1c1e));
  --dashboard-critical-surface: color-mix(in srgb, var(--error-color, #e53935) 8%, var(--card-background-color, #1c1c1e));
  --action-glow-blur: 10px;
  --action-glow-spread: 1.5px;
  --action-glow-opacity: 0.45;
  --action-glow-color: var(--primary-color, #03a9f4);
}

@media (max-width: 700px) {
  :host {
    --dashboard-radius-dialog: 8px;
    --c-radius-dialog: 8px;
  }
}
`, Pl = () => {
}, us = y`
  ${ve(br)}
`, P = [
  us,
  y`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
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
    input:not([type="range"]):not([type="checkbox"]):not([type="radio"]),
    select {
      font: inherit;
      color: inherit;
      appearance: none;
      border: 0;
      background: transparent;
    }
    input[type="range"] {
      font: inherit;
      color: inherit;
      border: 0;
      background: transparent;
    }
    button {
      cursor: pointer;
      padding: 0;
      --action-glow-color: var(--primary-color, #03a9f4);
      transition:
        transform 0.15s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.25s ease,
        color 0.2s ease;
    }
    button:disabled,
    input:disabled,
    select:disabled {
      opacity: 0.45;
      cursor: default;
    }
    button:active:not(:disabled) {
      border-color: var(--action-glow-color) !important;
      box-shadow: 0 0 0 1px var(--action-glow-color),
                  0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.96);
    }
    :is(button, input, select):focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    ha-card {
      display: block;
      width: 100%;
      position: relative;
      overflow: hidden;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
      box-shadow: var(--ha-card-box-shadow, none);
      color: var(--primary-text-color);
      box-sizing: border-box;
      --action-glow-color: var(--primary-color, #03a9f4);
      transition:
        transform 0.15s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.25s ease,
        color 0.2s ease;
    }
    ha-card.interactive {
      cursor: pointer;
    }
    ha-card.interactive:active:not(.unavailable),
    ha-card:has(> button.demo):active,
    ha-card:has(> button.wrap):active,
    ha-card:has(> button.issue):active,
    ha-card:has(> button:only-child):active,
    ha-card:has(> .tile-card.interactive):active,
    ha-card:has(> .status-card.interactive):active {
      border-color: var(--action-glow-color) !important;
      box-shadow: 0 0 0 1px var(--action-glow-color),
                  0 0 16px 3px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.985);
    }
    ha-card > button.demo,
    ha-card > button.wrap,
    ha-card > button.issue,
    ha-card > button:only-child,
    ha-card > .tile-card,
    ha-card > .status-card {
      box-shadow: none !important;
      outline: none !important;
    }
    ha-card > button.demo:active,
    ha-card > button.wrap:active,
    ha-card > button.issue:active,
    ha-card > button:only-child:active,
    ha-card > .tile-card:active,
    ha-card > .status-card:active {
      box-shadow: none !important;
      border-color: transparent !important;
      transform: none !important;
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
], G = y`
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
`, O = y`
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
`, V = y`
  .btn-primary-solid,
  .btn-secondary-outline,
  .btn-action-pill,
  .btn-compact-pill,
  .btn-dashed-add,
  .option-select-btn {
    --action-glow-color: var(--feedback-color, var(--primary-color, #03a9f4));
    transition:
      transform 0.15s ease,
      border-color 0.4s ease,
      box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.25s ease,
      color 0.2s ease;
  }
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
    border-color: var(--action-glow-color) !important;
    box-shadow: 0 0 0 1px var(--action-glow-color),
                0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.97);
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
  .btn-secondary-outline:active {
    border-color: var(--action-glow-color) !important;
    box-shadow: 0 0 0 1px var(--action-glow-color),
                0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.97);
  }
  .btn-secondary-outline.danger {
    color: var(--error-color);
    --action-glow-color: var(--error-color, #f44336);
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
  .btn-action-pill:active {
    border-color: var(--action-glow-color) !important;
    box-shadow: 0 0 0 1px var(--action-glow-color),
                0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.97);
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
  .btn-compact-pill:active {
    border-color: var(--action-glow-color) !important;
    box-shadow: 0 0 0 1px var(--action-glow-color),
                0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.97);
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
  .btn-dashed-add:active {
    border-color: var(--action-glow-color) !important;
    box-shadow: 0 0 0 1px var(--action-glow-color),
                0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.97);
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
  .option-select-btn:active {
    border-color: var(--action-glow-color) !important;
    box-shadow: 0 0 0 1px var(--action-glow-color),
                0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.97);
  }
  .option-select-btn.selected {
    color: var(--primary-color);
    border-color: var(--primary-color);
    background: var(--dashboard-active-surface);
  }
`, qt = y`
  .btn-icon-44,
  .btn-icon-36,
  .btn-icon-30,
  .btn-icon-circle {
    --action-glow-color: var(--feedback-color, var(--primary-color, #03a9f4));
    transition:
      transform 0.15s ease,
      border-color 0.4s ease,
      box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.25s ease,
      color 0.2s ease;
  }
  .btn-icon-44:active:not(:disabled),
  .btn-icon-36:active:not(:disabled),
  .btn-icon-30:active:not(:disabled),
  .btn-icon-circle:active:not(:disabled) {
    border-color: var(--action-glow-color) !important;
    box-shadow: 0 0 0 1px var(--action-glow-color),
                0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.95);
  }
  .btn-icon-44.power-btn.on,
  .btn-icon-36.power-btn.on,
  .power-btn.on {
    --action-glow-color: var(--error-color, #f44336);
  }
  .btn-icon-44.power-btn:not(.on),
  .btn-icon-36.power-btn:not(.on),
  .power-btn:not(.on) {
    --action-glow-color: var(--success-color, #4caf50);
  }
  .btn-icon-44.play-pause,
  .btn-icon-36.play-pause,
  .play-pause {
    --action-glow-color: var(--warning-color, #ff9800);
  }
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
`, _r = y`
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
  .select-dropdown-control,
  select.select-dropdown-control {
    width: 100%;
    height: 44px;
    padding: 0 34px 0 12px;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-control);
    background: var(--dashboard-card-surface)
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%239e9e9e'%3E%3Cpath d='M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z'/%3E%3C/svg%3E")
      no-repeat right 10px center;
    background-size: 18px 18px;
    color: var(--primary-text-color);
    font-size: 13px;
    cursor: pointer;
  }
  .select-dropdown-control option {
    background: var(--card-background-color, #1c1c1e);
    color: var(--primary-text-color, #e1e1e1);
  }
  input[type="checkbox"],
  input[type="radio"] {
    accent-color: var(--primary-color);
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
  input[type="date"] {
    font-family: inherit;
    font-size: 12.5px;
    color: var(--primary-text-color);
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(0.7);
    cursor: pointer;
  }
`, je = y`
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
    border-radius: var(--dashboard-radius-control);
    --action-glow-color: var(--primary-color, #03a9f4);
    transition:
      transform 0.15s ease,
      border-color 0.4s ease,
      box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.25s ease,
      color 0.2s ease;
  }
  .stepper-step-btn:hover {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  .stepper-step-btn.increase,
  .stepper-step-btn[aria-label*="increase" i],
  .stepper-step-btn[aria-label*="plus" i] {
    --action-glow-color: var(--warning-color, #ff9800);
  }
  .stepper-step-btn.decrease,
  .stepper-step-btn[aria-label*="decrease" i],
  .stepper-step-btn[aria-label*="minus" i] {
    --action-glow-color: var(--info-color, #03a9f4);
  }
  .stepper-step-btn:active:not(:disabled) {
    border-color: var(--action-glow-color) !important;
    box-shadow: 0 0 0 1px var(--action-glow-color),
                0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.95);
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
  input[type="range"],
  .range-slider-control {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 6px;
    border-radius: var(--dashboard-radius-control);
    background: var(--divider-color);
    outline: none;
    cursor: pointer;
    margin: 8px 0;
    padding: 0;
    border: 0;
    display: block;
    accent-color: var(--primary-color);
  }
  input[type="range"]::-webkit-slider-runnable-track,
  .range-slider-control::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    border-radius: var(--dashboard-radius-control);
    background: var(--divider-color);
    border: 0;
  }
  input[type="range"]::-moz-range-track,
  .range-slider-control::-moz-range-track {
    width: 100%;
    height: 6px;
    border-radius: var(--dashboard-radius-control);
    background: var(--divider-color);
    border: 0;
  }
  input[type="range"]::-webkit-slider-thumb,
  .range-slider-control::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--primary-color);
    border: 2px solid var(--dashboard-card-surface, #1c1c1e);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
    margin-top: -6px;
    cursor: pointer;
    transition: transform 0.12s ease, background-color 0.12s ease;
  }
  input[type="range"]::-moz-range-thumb,
  .range-slider-control::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary-color);
    border: 2px solid var(--dashboard-card-surface, #1c1c1e);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
    cursor: pointer;
  }
  input[type="range"]:focus-visible::-webkit-slider-thumb,
  .range-slider-control:focus-visible::-webkit-slider-thumb {
    outline: 2px solid var(--primary-color);
    outline-offset: 3px;
  }
  input[type="range"]:focus-visible::-moz-range-thumb,
  .range-slider-control:focus-visible::-moz-range-thumb {
    outline: 2px solid var(--primary-color);
    outline-offset: 3px;
  }
  input[type="range"]:disabled,
  .range-slider-control:disabled {
    opacity: 0.45;
    cursor: default;
  }
  input[type="range"]:disabled::-webkit-slider-thumb,
  .range-slider-control:disabled::-webkit-slider-thumb {
    cursor: default;
    background: var(--disabled-text-color, #616161);
  }
`, Fe = y`
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
`, ms = y`
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
`, ot = y`
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
`, gs = y`
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
`, Aa = y`
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
    --action-glow-color: var(--primary-color, #03a9f4);
    transition:
      transform 0.15s ease,
      border-color 0.4s ease,
      box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.25s ease,
      color 0.2s ease;
  }
  .dpad-btn:hover {
    color: var(--primary-text-color);
    background: var(--dashboard-card-muted-surface);
  }
  .dpad-btn:active:not(:disabled) {
    border-color: var(--action-glow-color) !important;
    box-shadow: 0 0 0 1px var(--action-glow-color),
                0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.95);
  }
  .dpad-btn.select-center {
    background: var(--dashboard-active-surface);
    color: var(--primary-color);
    --action-glow-color: var(--primary-color, #03a9f4);
  }
`, St = y`
  /* Native dialogs must be styled at the dialog element as well as at their
   * inner shell. A number of controllers render a <dialog><div class="sheet">
   * structure, so styling only .dialog-shell-box leaves the browser's default
   * white inset dialog visible and makes the sheet look unstyled. */
  dialog {
    width: min(640px, calc(100vw - 32px));
    max-width: calc(100vw - 32px);
    max-height: calc(100dvh - 32px);
    margin: auto;
    padding: 0;
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-dialog);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--dashboard-dialog-shadow);
    overflow: hidden;
  }
  dialog::backdrop {
    background: var(--dashboard-modal-scrim);
  }
  dialog .sheet {
    display: flex;
    max-height: inherit;
    min-height: 0;
    flex-direction: column;
    background: var(--card-background-color);
  }
  dialog .sheet-head,
  dialog .head {
    min-height: 56px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid var(--divider-color);
    color: var(--primary-text-color);
  }
  dialog .sheet-title,
  dialog .sheet-name {
    min-width: 0;
    font-size: 15px;
    font-weight: 650;
    line-height: 1.25;
  }
  dialog .sheet-title {
    flex: 1;
  }
  dialog .sheet-state {
    margin-top: 2px;
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 1.25;
  }
  dialog .sheet-body,
  dialog .body {
    min-height: 0;
    padding: 16px;
    overflow: auto;
    color: var(--secondary-text-color);
    font-size: 13px;
  }
  dialog .close {
    width: 32px;
    height: 32px;
    margin-left: auto;
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    border: 0;
    border-radius: var(--dashboard-radius-control);
    background: transparent;
    color: var(--secondary-text-color);
    --action-glow-color: var(--error-color, #f44336);
    transition:
      transform 0.15s ease,
      border-color 0.4s ease,
      box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
      background-color 0.25s ease,
      color 0.2s ease;
  }
  dialog .close:hover,
  dialog .close:focus-visible {
    background: var(--dashboard-card-muted-surface);
    color: var(--primary-text-color);
  }
  dialog .close:active:not(:disabled) {
    box-shadow: 0 0 0 1px var(--action-glow-color),
                0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.95);
  }
  @media (max-width: 700px) {
    dialog {
      width: min(100vw - 16px, 640px);
      max-width: calc(100vw - 16px);
      max-height: calc(100dvh - 16px);
      border-radius: 8px;
    }
  }
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
`, ut = y`
  .assembled-card {
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-card);
    background: var(--dashboard-card-surface);
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`, Ol = y`
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
`, zl = y`
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
`, Il = y`
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
`, Rl = Sa, Oi = br, Hl = () => {
}, Nl = y`
  ${ve(Oi)}
`, Ea = `${Oi}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);color:var(--primary-text-color);box-shadow:none}*{box-sizing:border-box}button{font:inherit;color:inherit}button.demo{appearance:none;width:100%;border:0;background:transparent;text-align:inherit;padding:0;cursor:pointer}button.demo:active{transform:scale(.992)}button.demo:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px;border-radius:var(--dashboard-radius-card)}`, Da = `${Oi}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);box-shadow:none;color:var(--primary-text-color);box-sizing:border-box}.wrap{box-sizing:border-box;padding:8px 11px}.title{font-size:13px;line-height:1.25;font-weight:600;color:var(--primary-text-color)}.desc{margin-top:2px;font-size:12px;line-height:1.25;color:var(--secondary-text-color)}ha-icon{--mdc-icon-size:20px}button{font:inherit;color:inherit}button.i{appearance:none;border:0;background:transparent;cursor:pointer}button.i:active{background:var(--dashboard-card-muted-surface)}button.i:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px;border-radius:var(--dashboard-radius-control)}@media(max-width:700px){.wrap{padding:8px 10px}}`, Ta = `${Oi}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}`, Pa = y`
  ${ve(Ea)}
`, Ll = y`
  ${ve(Da)}
`, Ml = y`
  ${ve(Ta)}
`, ql = Pa, vr = y`
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
class et extends Error {
  constructor(e, i) {
    super(i), this.name = "HomeAssistantActionError", this.code = e;
  }
}
function dt(t) {
  return t && t.split(".")[0] || "";
}
const R = dt, Oa = /^[a-z_][a-z0-9_]*\.[a-zA-Z0-9_]+$/, fs = (t) => t?.entity_id ? Array.isArray(t.entity_id) ? t.entity_id : [t.entity_id] : [], za = (t) => !!(t && (fs(t).length > 0 || (Array.isArray(t.device_id) ? t.device_id.length > 0 : t.device_id) || (Array.isArray(t.area_id) ? t.area_id.length > 0 : t.area_id))), Vi = (t, e) => {
  if (t === void 0) return;
  const i = Array.isArray(t) ? t : [t];
  if (i.length === 0 || i.some((s) => typeof s != "string" || !s.trim()))
    throw new et(
      "INVALID_TARGET",
      `Service target ${e} must be a non-empty string or array of strings.`
    );
}, yr = (t, e) => {
  if (!e) return;
  if (!za(e))
    throw new et(
      "INVALID_TARGET",
      "Service target must contain an entity_id, device_id, or area_id."
    );
  Vi(e.entity_id, "entity_id"), Vi(e.device_id, "device_id"), Vi(e.area_id, "area_id");
  const i = fs(e);
  for (const s of i) {
    if (!Oa.test(s))
      throw new et(
        "INVALID_TARGET",
        `Invalid Home Assistant entity target: ${s}.`
      );
    const r = t.states[s];
    if (!r)
      throw new et(
        "MISSING_TARGET_ENTITY",
        `Home Assistant entity target does not exist: ${s}.`
      );
    if (!ft(r))
      throw new et(
        "UNAVAILABLE_TARGET_ENTITY",
        `Home Assistant entity target is unavailable: ${s}.`
      );
  }
  return e;
}, xr = (t) => {
  const [e, i, s] = t?.split(".") ?? [];
  if (!e || !i || s !== void 0 || !/^[a-z_][a-z0-9_]*$/.test(e) || !/^[a-z_][a-z0-9_]*$/.test(i))
    throw new et(
      "INVALID_SERVICE",
      `Invalid Home Assistant service: ${t || "(missing)"}.`
    );
  return { domain: e, service: i };
}, Ia = (t) => {
  if (!t) return {};
  const { entity_id: e, ...i } = t;
  return {
    data: Object.keys(i).length > 0 ? i : void 0,
    target: typeof e == "string" || Array.isArray(e) && e.every((s) => typeof s == "string") ? { entity_id: e } : e === void 0 ? void 0 : (() => {
      throw new et(
        "INVALID_TARGET",
        "service data entity_id must be a string or array of strings."
      );
    })()
  };
}, S = async (t, e) => {
  const { domain: i, service: s } = xr(`${e.domain}.${e.service}`), r = Ia(e.data), a = yr(t, e.target ?? r.target);
  await t.callService(i, s, r.data, a);
};
function At(t) {
  let e = t.entry?.name || t.entry?.original_name || t.state?.attributes?.friendly_name || t.fallback || t.entry?.entity_id || t.state?.entity_id || "Control";
  if (t.stripSuffixes && t.stripSuffixes.length > 0)
    for (const i of t.stripSuffixes)
      e = e.replace(i, "").trim();
  return e;
}
function zi(t, e) {
  return t ? t.attributes?.friendly_name || e || t.entity_id : e || "";
}
function ft(t) {
  if (!t) return !1;
  const e = typeof t == "string" ? t : t.state;
  if (!e) return !1;
  const i = e.toLowerCase().trim();
  return i !== "unavailable" && i !== "unknown" && i !== "";
}
function Q(t) {
  return !ft(t);
}
function J(t, e) {
  if (!t) return "Unavailable";
  if (e?.formatEntityState)
    return e.formatEntityState(t);
  const i = t.state, s = t.attributes?.unit_of_measurement;
  return i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : i === "on" ? "On" : i === "off" ? "Off" : s ? `${i} ${s}` : i.charAt(0).toUpperCase() + i.slice(1);
}
function ne(t) {
  if (!t) return !1;
  const e = t.state;
  if (e === "unavailable" || e === "unknown" || e === "off")
    return !1;
  switch (dt(t.entity_id)) {
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
function ye(t, e) {
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
async function Ii(t, e, i, s) {
  if (!e)
    throw new et(
      "INVALID_ACTION",
      "Home Assistant is required to run an action."
    );
  const r = i?.action || "toggle";
  if (r === "none") return;
  if (i?.haptic && bt(t, "haptic", i.haptic), i?.confirmation) {
    const l = i.confirmation.text || "Are you sure you want to proceed?";
    if (!window.confirm(l))
      return;
  }
  const n = fs(i?.target)[0] || s, c = i?.target || (n ? { entity_id: n } : void 0);
  switch (r) {
    case "toggle": {
      if (!n)
        throw new et(
          "MISSING_TARGET_ENTITY",
          "Toggle actions require an entity target."
        );
      const l = dt(n), d = e.states[n];
      if (!d)
        throw new et(
          "MISSING_TARGET_ENTITY",
          `Home Assistant entity target does not exist: ${n}.`
        );
      const f = l === "lock" ? d.state === "locked" || d.state === "locking" ? "unlock" : "lock" : "toggle";
      await S(e, {
        domain: l,
        service: f,
        target: c
      });
      break;
    }
    case "more-info": {
      if (!n)
        throw new et(
          "MISSING_TARGET_ENTITY",
          "More-info actions require an entity target."
        );
      yr(e, { entity_id: n }), bt(t, "hass-more-info", { entityId: n });
      break;
    }
    case "call-service":
    case "perform-action": {
      const l = r === "perform-action" ? i?.perform_action : i?.service, d = xr(l);
      await S(e, {
        ...d,
        data: r === "perform-action" ? i?.data : i?.service_data,
        target: c
      });
      break;
    }
    case "navigate": {
      i?.navigation_path && (window.history.pushState(null, "", i.navigation_path), bt(window, "location-changed", { replace: !1 }));
      break;
    }
    case "url": {
      i?.url_path && window.open(i.url_path, "_blank");
      break;
    }
    case "assist": {
      bt(t, "start-voice-assist");
      break;
    }
    default:
      throw new et(
        "INVALID_ACTION",
        `Unsupported Home Assistant action: ${String(r)}.`
      );
  }
}
var Ra = Object.defineProperty, bs = (t, e, i, s) => {
  for (var r = void 0, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(e, i, r) || r);
  return r && Ra(e, i, r), r;
};
class A extends wt {
  constructor() {
    super(...arguments), this._cardError = null, this._lifecycle = ka(this);
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
    return ai(e);
  }
  toText(e) {
    return or(e);
  }
  moreInfo(e) {
    Kr(this, e);
  }
  navigate(e) {
    cr(e);
  }
  fire(e, i) {
    return bt(this, e, i);
  }
  formatNum(e, i) {
    return se(this.hass, e, i);
  }
  fmtPower(e, i) {
    return gt(this.hass, e, i);
  }
  fmtEnergy(e) {
    return xt(this.hass, e);
  }
  fmtDate(e, i) {
    return Ei(this.hass, e, i);
  }
  fmtTime(e, i) {
    return ni(this.hass, e, i);
  }
  fmtCalendarDay(e, i) {
    return Di(this.hass, e, i);
  }
  renderError(e) {
    return o`
      <ha-card class="error-card">
        <div
          style="padding: 16px; color: var(--error-color, #db4437); font-size: 13px; font-weight: 500;"
        >
          ⚠️ ${ai(e)}
        </div>
      </ha-card>
    `;
  }
}
bs([
  Mt({ attribute: !1 })
], A.prototype, "hass");
bs([
  x()
], A.prototype, "_config");
bs([
  x()
], A.prototype, "_cardError");
class Ri extends A {
  validateConfig(e) {
  }
  setConfig(e) {
    super.setConfig(e), this.validateConfig(e);
  }
  fireConfigChanged() {
    this.fire("config-changed", { config: this._config });
  }
}
const Ha = /* @__PURE__ */ new Set([
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
]), Na = /* @__PURE__ */ new Set([
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
]), La = /\b(battery|battery_level|battery_low|battery_state|link_?quality|rssi|signal_strength|lqi|voltage|temp(erature)?_offset|humidity_offset|calibration_offset|firmware|firmware_version|ip_address|mac_address|device_temp(erature)?|cpu_temp(erature)?|ping|keep_alive|reporting_interval|uptime|free_heap|wifi_signal|compressor_speed|compressor_frequency|defrost_mode)\b/i, Ma = /* @__PURE__ */ new Set([
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
]), _s = (t, e) => {
  if (!t?.entity_id) return !1;
  if (t.entity_category === "diagnostic" || t.entity_category === "config")
    return !0;
  const i = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  if (Ha.has(i))
    return !0;
  const s = `${t.entity_id} ${t.name || ""} ${t.original_name || ""} ${e?.attributes?.friendly_name || ""}`.toLowerCase();
  return La.test(s);
}, Ul = (t, e) => {
  if (!t?.entity_id || R(t.entity_id) !== "sensor") return !1;
  const s = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  return Na.has(s) || !!e?.attributes?.unit_of_measurement;
}, Ws = (t, e) => {
  if (!t?.entity_id || t.disabled_by || t.hidden_by || _s(t, e)) return !1;
  const i = R(t.entity_id);
  return !!(Ma.has(i) || i === "binary_sensor" && e?.attributes?.device_class === "garage_door");
}, qa = (t, e) => {
  if (!e || _s(t, e)) return !1;
  const i = R(t.entity_id), s = String(e.state).toLowerCase(), r = e.attributes || {};
  if (["light", "fan", "switch", "input_boolean"].includes(i))
    return s === "on";
  if (i === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(s)) return !0;
    if (s === "idle") {
      const a = String(r.media_title || r.app_name || "").trim();
      return !!(a && !/^(idle|home(?: screen)?|default media receiver)$/i.test(a));
    }
    return !1;
  }
  if (i === "climate")
    return /^(heat|cool|heat_cool|auto|dry|fan_only)$/.test(s);
  if (i === "cover")
    return /^(open|opening|closing)$/.test(s);
  if (i === "lock")
    return s === "unlocked";
  if (i === "vacuum")
    return /^(cleaning|returning)$/.test(s);
  if (i === "binary_sensor") {
    const a = String(r.device_class || "").toLowerCase();
    return s === "on" && /^(door|window|garage_door|smoke|moisture|gas|motion|occupancy|presence)$/.test(
      a
    );
  }
  return !1;
}, Gt = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), Gs = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Split System", Ks = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Ua = (t, e, i, s) => {
  if (R(t?.entity_id) !== "climate") return null;
  const r = /* @__PURE__ */ new Set();
  if (r.add(t.entity_id), t.device_id && i?.byDevice) {
    const b = i.byDevice.get(t.device_id) || [];
    for (const $ of b)
      r.add($.entity_id);
  }
  const a = Ks(t, i), n = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], c = a ? (i?.entities || []).filter(
    (b) => Ks(b, i) === a
  ) : [], l = (i?.entities || []).filter(
    (b) => ["timer", "script", "scene"].includes(R(b?.entity_id))
  ), d = [
    ...new Map(
      [...n, ...c, ...l].map((b) => [
        b.entity_id,
        b
      ])
    ).values()
  ].filter((b) => s?.states?.[b.entity_id]), f = Gt(t, s).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((b) => b.length > 2), g = (b) => {
    const $ = Gt(b, s);
    return !!(t.device_id && b.device_id === t.device_id) || f.length > 0 && f.some((v) => $.includes(v));
  }, h = (b) => {
    const $ = d.filter(
      (v) => R(v.entity_id) === "select" && Gt(v, s).includes(b) && /(vane|swing)/.test(Gt(v, s)) && g(v)
    );
    return $.length === 1 ? $[0].entity_id : null;
  }, u = h("vertical"), p = h("horizontal");
  u && r.add(u), p && r.add(p);
  const _ = d.find(
    (b) => R(b.entity_id) === "timer" && g(b) && /(split|climate|air.?con|hvac|timer)/.test(
      Gt(b, s)
    )
  )?.entity_id || null;
  _ && r.add(_);
  const m = d.filter(
    (b) => ["script", "scene"].includes(R(b.entity_id)) && g(b) && /(split|climate|air.?con|hvac)/.test(Gt(b, s))
  ).map((b) => (r.add(b.entity_id), {
    entity: b.entity_id,
    name: Gs(s, b, s?.states?.[b.entity_id])
  }));
  return {
    cardConfig: {
      type: "custom:component-split-controller-v4",
      entity: t.entity_id,
      title: Gs(s, t, e),
      vertical_vane_entity: u,
      horizontal_vane_entity: p,
      timer_entity: _,
      profile_entities: m
    },
    claimedEntityIds: r
  };
}, ja = (t, e, i, s) => {
  if (t?.platform !== "wled" || R(t.entity_id) !== "light")
    return null;
  const r = String(
    t.original_name || t.name || t.entity_id || ""
  ).toLowerCase();
  if (/_\d+$/.test(String(t.unique_id || "")) && r !== "main")
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
}, Fa = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), Ba = (t, e, i, s) => {
  const r = R(t.entity_id), a = r === "binary_sensor" && e?.attributes?.device_class === "garage_door", n = r === "cover" && (/garage/i.test(t.entity_id) || /garage/i.test(e?.attributes?.friendly_name || "") || e?.attributes?.device_class === "garage");
  if (!a && !n)
    return null;
  const c = /* @__PURE__ */ new Set();
  c.add(t.entity_id);
  let l = null;
  if (t.device_id && i?.byDevice) {
    const h = (i.byDevice.get(t.device_id) || []).filter(
      (u) => R(u?.entity_id) === "button" && s?.states?.[u.entity_id] && String(s.states[u.entity_id].state).toLowerCase() !== "unavailable"
    ).filter(
      (u) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
        Fa(u)
      )
    );
    h.length === 1 && (l = h[0].entity_id, c.add(l));
  }
  const d = (t.name || t.original_name || e?.attributes?.friendly_name || "Garage Door").replace(/ Garage Door Status$/i, "");
  return {
    cardConfig: {
      type: "custom:component-garage-door-controller-v1",
      entity: t.entity_id,
      control_entity: l || void 0,
      title: d
    },
    claimedEntityIds: c
  };
}, Va = (t, e, i, s) => {
  if (R(t?.entity_id) !== "media_player" || t?.platform !== "apple_tv")
    return null;
  const r = /* @__PURE__ */ new Set();
  if (r.add(t.entity_id), t.device_id && i?.byDevice) {
    const n = i.byDevice.get(t.device_id) || [];
    for (const c of n)
      r.add(c.entity_id);
  }
  const a = t.name || t.original_name || e?.attributes?.friendly_name || "Apple TV";
  return {
    cardConfig: {
      type: "custom:component-apple-tv-controller-v1",
      entity: t.entity_id,
      title: a,
      icon: "mdi:apple"
    },
    claimedEntityIds: r
  };
}, Wa = (t, e, i, s) => {
  if (R(t?.entity_id) !== "camera")
    return null;
  const r = `${t.entity_id} ${t.name || t.original_name || ""}`;
  if (/sub.?stream/i.test(r))
    return null;
  const a = /* @__PURE__ */ new Set();
  if (a.add(t.entity_id), t.device_id && i?.byDevice) {
    const c = i.byDevice.get(t.device_id) || [];
    for (const l of c)
      a.add(l.entity_id);
  }
  const n = t.name || t.original_name || e?.attributes?.friendly_name || "Camera";
  return {
    cardConfig: {
      type: "custom:component-camera-controller-v1",
      entity: t.entity_id,
      title: n,
      device_id: t.device_id
    },
    claimedEntityIds: a
  };
}, si = [], jl = (t) => {
  if (typeof t != "function")
    throw new TypeError("Device resolvers must be functions");
  return si.push(t), () => {
    const e = si.indexOf(t);
    e >= 0 && si.splice(e, 1);
  };
}, Ga = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", Ys = (t, e, i, s) => {
  for (const h of si) {
    const u = h(t, e, i, s);
    if (u) return u;
  }
  const r = Ua(t, e, i, s);
  if (r) return r;
  const a = ja(t, e, i);
  if (a) return a;
  const n = Ba(t, e, i, s);
  if (n) return n;
  const c = Va(t, e, i);
  if (c) return c;
  const l = Wa(t, e, i);
  if (l) return l;
  const d = t.entity_id, f = R(d), g = Ga(s, t, e);
  return f === "media_player" ? {
    cardConfig: {
      type: "custom:component-media-row-v2",
      entity: d,
      title: g
    },
    claimedEntityIds: /* @__PURE__ */ new Set([d])
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
      entity: d,
      title: g,
      name: g
    },
    claimedEntityIds: /* @__PURE__ */ new Set([d])
  } : null;
}, Qs = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Zs = (t, e) => {
  const i = e?.entity_id ? t?.states?.[e.entity_id] : void 0;
  return e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control";
}, Ji = (t, e, i = {}) => {
  if (!t?.states) return [];
  const s = i.mode || "all", r = i.area_id, a = new Set(i.exclude_device_names || []), n = new Map(
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
    return !(!p || u.device_id && a.has(n.get(u.device_id) || "") || _s(u, p));
  }), d = /* @__PURE__ */ new Set(), f = [];
  for (const u of l) {
    const p = R(u.entity_id), _ = Qs(u, e);
    if (!(s === "area" && r && _ !== r) && [
      "climate",
      "media_player",
      "camera",
      "binary_sensor",
      "cover",
      "light"
    ].includes(p)) {
      const m = t.states[u.entity_id], b = Ys(u, m, e, t);
      if (b && b.cardConfig.type !== "custom:component-control-row-v2" && b.cardConfig.type !== "custom:component-media-row-v2") {
        for (const $ of b.claimedEntityIds)
          d.add($);
        f.push({
          entityId: u.entity_id,
          entry: u,
          cardConfig: b.cardConfig
        });
      }
    }
  }
  for (const u of l) {
    if (d.has(u.entity_id))
      continue;
    const p = t.states[u.entity_id], _ = R(u.entity_id), m = Qs(u, e);
    if (s === "area") {
      if (m !== r || !Ws(u, p)) continue;
    } else if (s === "media") {
      if (_ !== "media_player") continue;
    } else if (s === "sound") {
      if (!["switch", "number", "select"].includes(_)) continue;
    } else if (!Ws(u, p)) continue;
    const b = Ys(u, p, e, t);
    b && f.push({
      entityId: u.entity_id,
      entry: u,
      cardConfig: b.cardConfig
    });
  }
  const g = s === "active" ? f.filter((u) => {
    const p = t.states[u.entityId];
    return qa(u.entry, p);
  }) : f;
  return g.sort(
    (u, p) => Zs(t, u.entry).localeCompare(
      Zs(t, p.entry),
      void 0,
      { sensitivity: "base" }
    )
  ), Or(
    g.map((u) => ({ id: u.entityId, card: u })),
    i.prefs
  ).visible.map((u) => ({
    entityId: u.id,
    cardConfig: u.card.cardConfig,
    signature: JSON.stringify(u.card.cardConfig)
  }));
};
class Ka {
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
    ]).then((s) => () => s.forEach((r) => r?.()));
    this._unsubs = i, i.catch(() => {
      this._unsubs === i && (this._unsubs = null), this._connection && !this._retry && (this._retry = setTimeout(() => {
        this._retry = null, this.listen();
      }, 3e4));
    });
  }
  async load(e, i = !1) {
    if (this.attach(e), this._data && !i) return this._data;
    if (this._promise) return this._promise;
    const s = e?.connection;
    return s?.sendMessagePromise ? (this._promise = Promise.all([
      s.sendMessagePromise({ type: "config/area_registry/list" }),
      s.sendMessagePromise({ type: "config/device_registry/list" }),
      s.sendMessagePromise({ type: "config/entity_registry/list" }),
      e?.callWS ? e.callWS({ type: "lovelace/dashboards/list" }).catch(() => []) : Promise.resolve([])
    ]).then(([r, a, n, c]) => {
      const l = Array.isArray(r) ? r : [], d = Array.isArray(a) ? a : [], f = Array.isArray(n) ? n : [], g = Array.isArray(c) ? c : [], h = new Map(
        d.map((_) => [_.id, _.area_id || null])
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
        devices: d,
        entities: f,
        dashboards: g,
        deviceArea: h,
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
    const e = this._hass, i = () => this._hass !== e ? Promise.resolve(this._data || {}) : (this._data = null, this._promise = null, this.load(e, !0)), s = this._promise ? Promise.resolve(this._promise).catch(() => {
    }).then(i) : i();
    let r;
    return r = Promise.resolve(s).then((a) => {
      if (this._hass === e)
        for (const n of [...this._subs])
          try {
            n(a);
          } catch {
          }
      return a;
    }).finally(() => {
      this._refreshPromise === r && (this._refreshPromise = null, this._refreshQueued && (this._refreshQueued = !1, this.refresh()));
    }), this._refreshPromise = r, r;
  }
  subscribe(e, i) {
    this.attach(e);
    const s = this._subs.size === 0;
    return this._subs.add(i), s && this.listen(), this.load(e).then(i), () => {
      this._subs.delete(i), this._subs.size === 0 && this.detach();
    };
  }
}
const W = new Ka(), Se = [], wr = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard entry filters must be functions");
  return Se.push(t), () => {
    const e = Se.indexOf(t);
    e >= 0 && Se.splice(e, 1);
  };
}, $r = (t, e) => {
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
  const s = `${t.entity_id} ${t.name || ""} ${t.original_name || ""} ${e?.attributes?.friendly_name || ""}`.toLowerCase();
  return /\b(battery|battery_level|battery_low|battery_state|link_?quality|rssi|signal_strength|lqi|voltage|temp(erature)?_offset|humidity_offset|calibration_offset|firmware|ip_address|mac_address|device_temp(erature)?|cpu_temp(erature)?|ping|keep_alive|reporting_interval|uptime|free_heap|wifi_signal|compressor_speed|compressor_frequency)\b/i.test(
    s
  );
}, Hi = (t, e) => !!(t?.entity_id && !t.disabled_by && !t.hidden_by && !["diagnostic", "config"].includes(t.entity_category || "") && !$r(t, e) && Se.every((i) => i(t))), rt = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", ee = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Kt = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), Cr = (t, e, i, s) => {
  if (R(t?.entity_id) !== "climate") return null;
  const r = ee(t, i), a = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], n = r ? (i?.entities || []).filter(
    (p) => ee(p, i) === r
  ) : [], c = (i?.entities || []).filter(
    (p) => ["timer", "script", "scene"].includes(R(p?.entity_id))
  ), l = [
    ...new Map(
      [...a, ...n, ...c].map((p) => [
        p.entity_id,
        p
      ])
    ).values()
  ].filter((p) => s?.states?.[p.entity_id]), d = Kt(t, s).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((p) => p.length > 2), f = (p) => {
    const _ = Kt(p, s);
    return !!(t.device_id && p.device_id === t.device_id) || d.some((m) => _.includes(m));
  }, g = (p) => {
    const _ = l.filter(
      (m) => R(m.entity_id) === "select" && Kt(m, s).includes(p) && /(vane|swing)/.test(Kt(m, s)) && f(m)
    );
    return _.length === 1 ? _[0].entity_id : null;
  }, h = l.find(
    (p) => R(p.entity_id) === "timer" && f(p) && /(split|climate|air.?con|hvac|timer)/.test(
      Kt(p, s)
    )
  )?.entity_id || null, u = l.filter(
    (p) => ["script", "scene"].includes(R(p.entity_id)) && f(p) && /(split|climate|air.?con|hvac)/.test(Kt(p, s))
  ).map((p) => ({
    entity: p.entity_id,
    name: rt(s, p, s?.states?.[p.entity_id])
  }));
  return {
    type: "custom:component-split-controller-v4",
    entity: t.entity_id,
    title: rt(s, t, e),
    vertical_vane_entity: g("vertical"),
    horizontal_vane_entity: g("horizontal"),
    timer_entity: h,
    profile_entities: u
  };
}, Ya = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), kr = (t, e, i) => {
  if (!t?.device_id) return null;
  const r = (e?.byDevice?.get(t.device_id) || []).filter(
    (a) => R(a?.entity_id) === "button" && Hi(a) && i?.states?.[a.entity_id] && String(i.states[a.entity_id].state).toLowerCase() !== "unavailable"
  ).filter(
    (a) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
      Ya(a)
    )
  );
  return r.length === 1 ? r[0].entity_id : null;
}, Sr = (t, e, i, s) => R(t?.entity_id) === "media_player" && t?.platform === "apple_tv" ? {
  type: "custom:component-apple-tv-controller-v1",
  entity: t.entity_id,
  title: rt(s, t, e),
  icon: "mdi:apple"
} : null, Ar = /* @__PURE__ */ new Set([
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
]), Qa = (t, e) => Hi(t, e) && (Ar.has(R(t.entity_id)) || R(t.entity_id) === "binary_sensor" && e?.attributes?.device_class === "garage_door"), Za = (t, e) => {
  if (!Hi(t, e) || !e) return !1;
  const i = R(t.entity_id), s = e.state, r = e.attributes || {};
  if (["light", "fan", "switch", "input_boolean"].includes(i))
    return s === "on";
  if (i === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(s)) return !0;
    if (s === "idle") {
      const a = String(r.media_title || r.app_name || "");
      return !!(a && !/^(idle|home(?: screen)?|default media receiver)$/i.test(a));
    }
    return !1;
  }
  return i === "climate" ? /^(heat|cool|heat_cool|auto|dry|fan_only)$/.test(s) : i === "cover" ? /^(open|opening|closing)$/.test(s) : i === "lock" ? s === "unlocked" : i === "vacuum" ? /^(cleaning|returning)$/.test(s) : i === "binary_sensor" ? s === "on" && /^(door|window|garage_door|smoke|moisture|gas)$/.test(
    r.device_class || ""
  ) : !1;
}, Ae = [], Er = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard control resolvers must be functions");
  return Ae.push(t), () => {
    const e = Ae.indexOf(t);
    e >= 0 && Ae.splice(e, 1);
  };
}, Dr = (t, e, i, s) => {
  const r = t.entity_id, a = R(r);
  if (a === "climate")
    return Cr(t, e, i, s) || {
      type: "custom:component-split-controller-v4",
      entity: r,
      title: rt(s, t, e)
    };
  if (a === "binary_sensor" && e?.attributes?.device_class === "garage_door") {
    const n = kr(t, i, s);
    return n ? {
      type: "custom:component-garage-door-controller-v1",
      title: rt(s, t, e).replace(
        / Garage Door Status$/i,
        ""
      ),
      entity: r,
      control_entity: n
    } : {
      type: "custom:component-control-row-v2",
      entity: r,
      title: rt(s, t, e)
    };
  }
  return a === "media_player" ? Sr(t, e, i, s) || {
    type: "custom:component-media-row-v2",
    entity: r,
    title: rt(s, t, e)
  } : a === "camera" ? {
    type: "custom:component-camera-controller-v1",
    entity: r,
    title: rt(s, t, e),
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
  ].includes(a) ? {
    type: "custom:component-control-row-v2",
    entity: r,
    title: rt(s, t, e),
    name: rt(s, t, e)
  } : null;
}, Ja = (t, e, i, s) => {
  for (const r of Ae) {
    const a = r(t, e, i, s);
    if (a) return a;
  }
  return Dr(t, e, i, s);
}, Tr = async (t, e) => {
  if (!t || !e) return { order: [], hidden: [] };
  try {
    return (await t.callWS({
      type: "frontend/get_user_data",
      key: e
    }))?.value || { order: [], hidden: [] };
  } catch {
    return { order: [], hidden: [] };
  }
}, Pr = (t, e, i) => t.callWS({ type: "frontend/set_user_data", key: e, value: i }), Or = (t, e) => {
  const i = new Map(t.map((n) => [n.id, n])), s = /* @__PURE__ */ new Set(), r = [];
  for (const n of e?.order || []) {
    const c = i.get(n);
    c && (r.push(c), s.add(n));
  }
  for (const n of t)
    s.has(n.id) || r.push(n);
  const a = new Set(e?.hidden || []);
  return { all: r, visible: r.filter((n) => !a.has(n.id)), hidden: a };
}, zr = async (t, e) => {
  const i = String(t?.type || ""), s = i.startsWith("custom:") ? i.slice(7) : i;
  let r;
  if (customElements.get(s))
    r = document.createElement(s);
  else {
    const a = globalThis.loadCardHelpers || (typeof window < "u" ? window.loadCardHelpers : void 0);
    if (typeof a == "function")
      try {
        const d = (await a()).createCardElement(t);
        return e && (d.hass = e), d;
      } catch {
      }
    const n = t?.entity || "";
    R(n) === "media_player" ? r = document.createElement("component-media-row-v2") : r = document.createElement("component-control-row-v2");
  }
  if (typeof r.setConfig == "function")
    try {
      r.setConfig(t);
    } catch {
    }
  return e && (r.hass = e), r;
};
globalThis.__homeDashboardV2 ??= {};
const B = globalThis.__homeDashboardV2;
B.REG = W;
B.entryFilters = Se;
B.registerEntryFilter = wr;
B.uiEntry = Hi;
B.stateName = rt;
B.areaOf = ee;
B.domain = R;
B.controlResolvers = Ae;
B.registerControlResolver = Er;
B.nativeClimateControlConfig = Cr;
B.garageControl = kr;
B.appleTvBundle = Sr;
B.controlConfig = Ja;
B.defaultControlConfig = Dr;
B.controlDomains = Ar;
B.isPotential = Qa;
B.isActive = Za;
B.isPeripheral = $r;
B.prefs = Tr;
B.savePrefs = Pr;
B.applyPrefs = Or;
B.card = zr;
B.discoverControls = Ji;
const Js = /* @__PURE__ */ new WeakMap(), Fl = async (t) => {
  if (!t || !t.sendMessagePromise)
    return { areas: [], devices: [], entities: [] };
  const e = await W.load({ connection: t });
  let i = Js.get(e);
  return i || (i = {
    areas: e.areas,
    devices: e.devices,
    entities: e.entities
  }, Js.set(e, i)), i;
}, Bl = async (t, e = !1) => W.load(t, e), Xa = /(_controller_temperature|_outside_air_temperature|cpu_temperature|processor_temperature|board_temperature|chip_temperature|internal_temperature)$/i;
function Ir(t, e, i) {
  if (!i)
    return {
      summary: "",
      severity: "",
      lightsOn: 0,
      activeDeviceCount: 0,
      temperatureText: "",
      humidityText: "",
      hasCritical: !1,
      hasWarning: !1
    };
  const r = (e?.entities || []).filter((m) => (m.area_id || (m.device_id ? e?.deviceArea?.get(m.device_id) : null)) === t.area_id), a = [];
  for (const m of r) {
    const b = i.states[m.entity_id];
    b && ft(b) && a.push(b);
  }
  let n = 0, c = 0, l = "", d = "", f = !1, g = !1;
  const h = a.find(
    (m) => m.entity_id.startsWith("climate.") && m.attributes && !Number.isNaN(
      Number.parseFloat(String(m.attributes.current_temperature ?? ""))
    )
  );
  if (h && h.attributes?.current_temperature !== void 0) {
    const m = Number.parseFloat(
      String(h.attributes.current_temperature)
    ), b = h.attributes.temperature_unit || i.config?.unit_system?.temperature || "°C";
    l = `${m.toFixed(1)} ${b}`;
  } else {
    const m = a.find(
      (b) => b.entity_id.startsWith("sensor.") && (b.attributes?.device_class === "temperature" || b.attributes?.unit_of_measurement && /°[CF]/i.test(b.attributes.unit_of_measurement)) && !Xa.test(b.entity_id) && !Number.isNaN(Number.parseFloat(String(b.state ?? "")))
    );
    if (m) {
      const b = Number.parseFloat(String(m.state)), $ = m.attributes?.unit_of_measurement || i.config?.unit_system?.temperature || "°C";
      l = `${b.toFixed(1)} ${$}`;
    }
  }
  const u = a.find(
    (m) => m.entity_id.startsWith("sensor.") && m.attributes?.device_class === "humidity" && !Number.isNaN(Number.parseFloat(String(m.state ?? "")))
  );
  u && (d = J(u, i));
  for (const m of a) {
    ne(m) && c++, m.entity_id.startsWith("light.") && m.state === "on" && n++;
    const b = m.attributes?.device_class || "";
    m.entity_id.startsWith("binary_sensor.") && m.state === "on" && ["smoke", "moisture", "gas"].includes(b) && (f = !0), (m.entity_id.startsWith("binary_sensor.") && m.state === "on" && b === "garage_door" || m.entity_id.startsWith("cover.") && ["open", "opening"].includes(m.state) && b === "garage") && (g = !0);
  }
  const p = c > 0, _ = [];
  return f ? _.push("Attention required") : g && _.push("Garage open"), l && _.push(l), d && !l && _.push(d), n > 0 ? _.push(`${n} light${n === 1 ? "" : "s"} on`) : c > 0 && _.push(
    `${c} active device${c === 1 ? "" : "s"}`
  ), {
    summary: _.slice(0, 3).join(" · "),
    severity: f ? "critical" : g ? "warning" : p ? "active" : "",
    lightsOn: n,
    activeDeviceCount: c,
    temperatureText: l,
    humidityText: d,
    hasCritical: f,
    hasWarning: g
  };
}
const Wi = /* @__PURE__ */ new WeakMap();
let tn = 1;
const vs = (t) => {
  const e = t?.connection;
  return e ? (Wi.has(e) || Wi.set(e, tn++), Wi.get(e)) : "none";
}, Zt = (t, e, i) => `${vs(t)}|${e}|${i}`, Xt = /* @__PURE__ */ new WeakMap();
let te = null;
const en = (t) => {
  const e = Xt.get(t);
  Xt.delete(t), te === t && (te = null), e && Promise.resolve(e).then((i) => i()).catch(() => {
  });
}, Xs = (t) => {
  const e = t?.connection;
  if (!e?.subscribeEvents || (te && te !== e && en(te), te = e, Xt.has(e))) return;
  const i = e.subscribeEvents((s) => {
    const r = /^dashboard-profile\.(energy|security)\.([a-z0-9-]+)$/.exec(
      String(s?.data?.key || "")
    );
    r && (Jt.invalidate(Zt(t, r[1], r[2])), globalThis.dispatchEvent(
      new CustomEvent("ha-component-profile-change", {
        detail: { kind: r[1], profileId: r[2] }
      })
    ));
  }, "ha_component_backend_preferences_updated");
  Xt.set(e, i), Promise.resolve(i).catch(
    () => Xt.get(e) === i ? Xt.delete(e) : void 0
  );
}, Jt = gr(
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
), sn = Object.freeze({
  async get(t, e, i, s = {}) {
    Xs(t);
    const r = Zt(t, e, i);
    return Jt.read(r, { hass: t, kind: e, profileId: i }, s);
  },
  invalidate(t, e, i) {
    Jt.invalidate(Zt(t, e, i));
  },
  peek(t, e, i) {
    return Jt.peek(Zt(t, e, i));
  },
  async save(t, e, i, s, r) {
    const a = {
      type: "ha_component_backend/profile/update",
      kind: e,
      profile_id: i,
      profile: s
    };
    Number.isFinite(Number(r)) && (a.expected_revision = Number(r));
    const n = await t.callWS(a);
    return Jt.invalidate(Zt(t, e, i)), n;
  },
  subscribe(t, e, i, s) {
    Xs(t);
    const r = Zt(t, e, i);
    return Jt.subscribe(r, s);
  }
}), Gi = /* @__PURE__ */ new Map(), tr = (t) => String(t).padStart(2, "0"), Oe = (t = /* @__PURE__ */ new Date()) => `${t.getFullYear()}-${tr(t.getMonth() + 1)}-${tr(t.getDate())}`, $e = (t, e = /* @__PURE__ */ new Date()) => {
  const i = t?.config?.time_zone;
  if (!i) return Oe(e);
  try {
    const s = Object.fromEntries(
      new Intl.DateTimeFormat("en-AU", {
        timeZone: i,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(e).map((r) => [r.type, r.value])
    );
    return `${s.year}-${s.month}-${s.day}`;
  } catch {
    return Oe(e);
  }
}, Rr = (t, e = Oe()) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(t || ""));
  if (!i) return null;
  const s = new Date(
    Number(i[1]),
    Number(i[2]) - 1,
    Number(i[3])
  );
  return Oe(s) !== t || t > e ? null : t;
}, Ki = (t = "energy-day") => {
  const e = String(t || "energy-day");
  if (!Gi.has(e)) {
    let i = null;
    try {
      i = sessionStorage.getItem(`ha-component-library:${e}`);
    } catch {
    }
    const s = Rr(i);
    Gi.set(e, {
      value: s || Oe(),
      usesDefault: !s,
      subscribers: /* @__PURE__ */ new Set()
    });
  }
  return Gi.get(e);
}, j = Object.freeze({
  get(t = "energy-day", e) {
    const i = Ki(t);
    return i.usesDefault && (i.value = $e(e)), i.value;
  },
  set(t = "energy-day", e, i = {}) {
    const s = Ki(t), r = $e(i.hass), a = Rr(e, r);
    if (!a || a === s.value) return s.value;
    s.value = a, s.usesDefault = !1;
    try {
      sessionStorage.setItem(`ha-component-library:${t}`, a);
    } catch {
    }
    const n = {
      channel: t,
      day: a,
      isToday: a === r
    };
    for (const c of [...s.subscribers]) c(n);
    return i.broadcast !== !1 && window.dispatchEvent(
      new CustomEvent("energy-day-selector-change", { detail: n })
    ), a;
  },
  subscribe(t = "energy-day", e, i = {}) {
    const s = Ki(t);
    return s.usesDefault && (s.value = $e(i.hass)), s.subscribers.add(e), i.replay !== !1 && e({
      channel: t,
      day: s.value,
      isToday: s.value === $e(i.hass)
    }), () => s.subscribers.delete(e);
  },
  today: $e
}), Yi = /* @__PURE__ */ new Set(), Ze = (t, e, i) => `${vs(t)}|${e}|${i}`, Ce = gr(
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
), ie = Object.freeze({
  async get(t, e, i, s = {}) {
    const r = Ze(t, e, i);
    return Yi.add(r), Ce.read(r, { hass: t, profileId: e, day: i }, s);
  },
  invalidate(t, e, i) {
    Ce.invalidate(Ze(t, e, i));
  },
  invalidateProfile(t, e) {
    const i = `${vs(t)}|${e}|`;
    for (const s of Yi)
      s.startsWith(i) && Ce.invalidate(s);
  },
  peek(t, e, i) {
    return Ce.peek(Ze(t, e, i));
  },
  subscribe(t, e, i, s) {
    const r = Ze(t, e, i);
    return Yi.add(r), Ce.subscribe(r, s);
  }
}), Je = /* @__PURE__ */ new Set(["unknown", "unavailable"]), Ni = (t) => [
  t?.translation_key,
  t?.unique_id,
  t?.entity_id,
  t?.platform
].filter(Boolean).join(" ").toLowerCase(), Xe = (t, e) => e?.name || e?.original_name || (e?.entity_id ? t?.states?.[e.entity_id]?.attributes?.friendly_name : "") || e?.entity_id || "Control", er = (t) => {
  const e = Ni(t);
  return /record/.test(e) ? "Recording" : /detect|motion/.test(e) ? "Detection" : /alert|notification/.test(e) ? "Alerts" : /audio|sound/.test(e) ? "Audio" : null;
}, rn = (t) => /(^|[_ :.-])(ptz|pan|tilt|zoom)([_ :.-]|$)/.test(
  Ni(t)
), ti = (t) => {
  const e = Ni(t);
  return /trigger|operate|open|close/.test(e) ? "operate" : /restart|reboot/.test(e) ? "restart" : "action";
}, an = (t, e, i = {}) => {
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
  const s = new Set(i.include_entities || []), r = new Set(i.exclude_entities || []), a = new Set(i.area_ids || []), n = (e?.entities || []).filter((m) => !m?.entity_id || m.disabled_by || m.hidden_by || !t?.states?.[m.entity_id] ? !1 : !r.has(m.entity_id)), c = n.filter((m) => {
    if (s.has(m.entity_id)) return !0;
    const b = ee(m, e);
    return !a.size || (b ? a.has(b) : !1);
  }), l = c.filter(
    (m) => !m.disabled_by && !m.hidden_by
  ), d = new Set(
    c.map((m) => m.device_id || m.entity_id)
  ), f = /* @__PURE__ */ new Map();
  for (const m of n) {
    const b = m.device_id || m.entity_id, $ = f.get(b) || [];
    $.push(m), f.set(b, $);
  }
  const g = [];
  for (const [m, b] of f) {
    if (!d.has(m)) continue;
    const $ = b.filter(
      (I) => R(I.entity_id) === "camera" && !I.disabled_by && !I.hidden_by
    );
    if (!$.length) continue;
    $.sort((I, X) => {
      const vt = (Et) => {
        const xe = t.states[Et.entity_id];
        return (s.has(Et.entity_id) ? 100 : 0) + (xe?.attributes?.entity_picture ? 20 : 0) + (xe?.attributes?.frontend_stream_type ? 10 : 0);
      };
      return vt(X) - vt(I) || String(I.unique_id || I.entity_id).localeCompare(
        String(X.unique_id || X.entity_id)
      );
    });
    const v = $[0], D = t.states[v.entity_id], H = (e?.devices || []).find((I) => I.id === v.device_id) || {}, L = ee(v, e), M = (L ? e?.areaMap?.get(L)?.name : "") || "", w = b.filter(
      (I) => R(I.entity_id) === "switch" && er(I)
    ).map((I) => ({ entity: I, role: er(I) })), z = b.filter((I) => {
      if (R(I.entity_id) !== "binary_sensor") return !1;
      const X = t.states[I.entity_id]?.attributes?.device_class || "";
      return /^(motion|occupancy|presence|sound)$/.test(X) || /detect|motion|person|human/.test(Ni(I));
    }), U = b.filter((I) => R(I.entity_id) === "image").map((I) => {
      const X = Xe(t, I), vt = String(
        H.name_by_user || H.name || ""
      ).trim(), Et = vt && X.toLowerCase().startsWith(`${vt.toLowerCase()} `) ? X.slice(vt.length).trim() : X;
      return { entity: I, name: Et };
    }), N = b.filter(
      (I) => R(I.entity_id) === "button" && ti(I) !== "action"
    ).map((I) => ({ entity: I, role: ti(I) })), K = b.filter(
      (I) => ["button", "number", "select"].includes(R(I.entity_id)) && rn(I)
    ), Y = i.mappings?.[`camera_stream:${v.entity_id}`] || i.mappings?.[`camera_stream:${m}`] || null, Bt = Y ? t.states[Y] : null, Vt = (Bt && !Je.has(String(Bt.state).toLowerCase()) ? Y : v.entity_id) || v.entity_id, Ye = !!(D && !Je.has(String(D.state).toLowerCase())), mt = z.some(
      (I) => t.states[I.entity_id]?.state === "on"
    );
    g.push({
      id: m,
      deviceId: v.device_id || null,
      entityId: v.entity_id,
      entities: $.map((I) => I.entity_id),
      name: String(H.name_by_user || H.name || "").trim() || M || Xe(t, v),
      areaId: L,
      areaName: M,
      online: Ye,
      active: mt,
      streamEntityId: Vt,
      switches: w,
      detections: z,
      classifications: U,
      actions: N,
      ptz: K
    });
  }
  g.sort(
    (m, b) => m.name.localeCompare(b.name, void 0, { sensitivity: "base" })
  );
  const h = [];
  for (const m of l) {
    const b = R(m.entity_id), $ = t.states[m.entity_id], v = $?.attributes?.device_class || "";
    if (!(b === "binary_sensor" && /^(door|window|garage_door|opening)$/.test(v) || b === "lock" || b === "cover" && /^(door|garage)$/.test(v))) continue;
    const L = m.device_id ? f.get(m.device_id) || [] : [], w = i.mappings?.[`entry_control:${m.entity_id}`] || L.filter((U) => R(U.entity_id) === "button").sort(
      (U, N) => (ti(U) === "operate" ? -1 : 1) - (ti(N) === "operate" ? -1 : 1)
    )[0]?.entity_id || null, z = b === "lock" ? $.state === "unlocked" : /^(on|open|opening)$/.test($.state);
    h.push({
      entityId: m.entity_id,
      deviceId: m.device_id || null,
      controlEntityId: w,
      domain: b,
      deviceClass: v,
      name: Xe(t, m),
      state: $.state,
      open: z,
      available: !Je.has(String($.state).toLowerCase()),
      areaId: ee(m, e)
    });
  }
  h.sort(
    (m, b) => m.name.localeCompare(b.name, void 0, { sensitivity: "base" })
  );
  const u = /* @__PURE__ */ new Map([
    ["automation", "trigger"],
    ["scene", "turn_on"],
    ["script", "turn_on"]
  ]), p = Object.entries(
    i.mappings || {}
  ).flatMap(([m, b]) => {
    if (!m.startsWith("quick_action:")) return [];
    const $ = R(b), v = u.get($), D = t?.states?.[b];
    if (!v || !D) return [];
    const H = (e?.entities || []).find(
      (L) => L.entity_id === b
    ) || {
      entity_id: b
    };
    return [
      {
        id: m.slice(13),
        entityId: b,
        domain: $,
        service: v,
        name: Xe(t, H),
        icon: D.attributes?.icon || ($ === "script" ? "mdi:script-text-outline" : $ === "scene" ? "mdi:palette-outline" : "mdi:robot-outline"),
        available: !Je.has(String(D.state).toLowerCase())
      }
    ];
  });
  p.sort(
    (m, b) => m.name.localeCompare(b.name, void 0, { sensitivity: "base" })
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
    ...h.filter((m) => m.available && m.open).map((m) => ({
      type: "entry-open",
      label: `${m.name} open`,
      entityId: m.entityId
    }))
  ];
  return {
    error: null,
    cameras: g,
    entries: h,
    quickActions: p,
    attention: _,
    allClear: _.length === 0,
    onlineCameras: g.filter((m) => m.online).length
  };
}, Be = async (t, e = "household-security", i = {}) => {
  const [s, r] = await Promise.all([
    sn.get(t, "security", e, i).catch((n) => ({ found: !1, profile: null, error: n })),
    W.load(t)
  ]);
  return s?.found ? {
    ...an(t, r, s.profile || {}),
    profile: s?.profile || null,
    profileMissing: !s?.found,
    profileError: s?.error || null
  } : {
    error: s?.error || new Error(`Security profile ${e} is not configured`),
    cameras: [],
    entries: [],
    quickActions: [],
    attention: [],
    allClear: !1,
    onlineCameras: 0,
    profile: null,
    profileMissing: !0,
    profileError: s?.error || null
  };
}, Qi = R, ir = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]), Hr = (t) => String(
  t?.original_name || t?.name || t?.entity_id || ""
).toLowerCase();
let sr = !1;
const nn = () => {
  sr || (sr = !0, wr((t) => t?.platform !== "wled" ? !0 : R(t.entity_id) !== "light" ? !1 : Hr(t) === "main" || !/_\d+$/.test(String(t.unique_id || ""))), Er((t) => t?.platform !== "wled" || R(t.entity_id) !== "light" ? null : {
    type: "custom:component-wled-controller-v1",
    entity: t.entity_id,
    device_id: t.device_id
  }), W.refresh());
};
nn();
const on = [
  P,
  O,
  V,
  q,
  ot,
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
var cn = Object.getOwnPropertyDescriptor, ln = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? cn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const dn = {
  type: "custom:component-action-v2",
  title: "Action title",
  description: "What this action will do",
  action_text: "Open",
  icon: "mdi:gesture-tap-button",
  navigation_path: null,
  entity: null,
  more_info_entity: null
};
let li = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...dn, ...t });
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
    t.primary && e ? (this._interactionHandle?.destroy(), this._interactionHandle = T(e, {
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
li.styles = on;
li = ln([
  k("component-action-v2")
], li);
E({
  type: "component-action-v2",
  element: li,
  name: "Action Card",
  description: "Reusable navigation and more-info action card."
});
const hn = [
  P,
  O,
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
var pn = Object.getOwnPropertyDescriptor, un = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? pn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const mn = {
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
let di = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...mn, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = T(e, {
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
    const t = this._getAction(), e = [1, 2, 3].map((r) => {
      const a = this._config[`center_${r}_label`], n = this._config[`center_${r}_value`];
      return o`
        <span class="item">
          <span class="lab">${this.esc(a)}</span>
          <span class="val">${this.esc(n)}</span>
        </span>
      `;
    }), i = o`
      <span class="phase">${this.esc(this._config.left_text)}</span>
      <span class="mid">${e}</span>
      <span class="event">${this.esc(this._config.right_text)}</span>
    `, s = `${this._config.left_text || ""}. ${[1, 2, 3].map((r) => `${this._config[`center_${r}_label`] || ""}: ${this._config[`center_${r}_value`] || ""}`).join(", ")}. ${this._config.right_text || ""}`;
    return o`
      <ha-card>
        ${t ? o`<button type="button" aria-label="${this.esc(s)}">${i}</button>` : o`<div class="context-static" aria-label="${this.esc(s)}">${i}</div>`}
      </ha-card>
    `;
  }
};
di.styles = hn;
di = un([
  k("component-context-strip-v3")
], di);
E({
  type: "component-context-strip-v3",
  element: di,
  name: "Context Strip",
  description: "Reusable context and metric strip component."
});
const Nr = [
  P,
  ms,
  ut
];
var gn = Object.getOwnPropertyDescriptor, Lr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? gn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const fn = {
  type: "custom:component-empty-state-v3",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let hi = class extends A {
  setConfig(t) {
    super.setConfig({ ...fn, ...t });
  }
  getCardSize() {
    return 1;
  }
  render() {
    return this._config ? o`
      <ha-card class="assembled-card">
        <div class="empty-state-dashed">
          <ha-icon class="lg" icon="${this.esc(this._config.icon)}"></ha-icon>
          <div class="empty-title">${this.esc(this._config.title)}</div>
          <div class="empty-desc">${this.esc(this._config.message)}</div>
        </div>
      </ha-card>
    ` : o``;
  }
};
hi.styles = Nr;
hi = Lr([
  k("component-empty-state-v3")
], hi);
E({
  type: "component-empty-state-v3",
  element: hi,
  name: "Empty State",
  description: "Reusable empty-state component."
});
const bn = {
  type: "custom:component-empty-state-v2",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let pi = class extends A {
  setConfig(t) {
    super.setConfig({ ...bn, ...t });
  }
  getCardSize() {
    return 1;
  }
  render() {
    return this._config ? o`
      <ha-card class="assembled-card">
        <div class="empty-state-dashed">
          <ha-icon class="lg" icon="${this.esc(this._config.icon)}"></ha-icon>
          <div class="empty-title">${this.esc(this._config.title)}</div>
          <div class="empty-desc">${this.esc(this._config.message)}</div>
        </div>
      </ha-card>
    ` : o``;
  }
};
pi.styles = Nr;
pi = Lr([
  k("component-empty-state-v2")
], pi);
E({
  type: "component-empty-state-v2",
  element: pi,
  name: "Empty State V2",
  description: "Reusable compact empty-state component."
});
const _n = [
  P,
  O,
  ot,
  ut,
  y`
    .list-wrap { margin: -4px 0; }
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .desc {
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
var vn = Object.getOwnPropertyDescriptor, yn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? vn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const xn = {
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
let ui = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...xn, ...t });
  }
  getCardSize() {
    return 3;
  }
  _getRowActions(t) {
    if (!this._config || this._config.interactive === !1)
      return { primary: null, hold: null };
    const e = typeof t.action == "function" ? () => t.action({ host: this, hass: this.hass, row: t }) : null, i = t.navigation_path || t.path || null, s = t.entity || t.more_info_entity || null;
    return {
      primary: e || (i ? () => this.navigate(i) : s ? () => this.moreInfo(s) : null),
      hold: !e && i && s ? () => this.moreInfo(s) : null
    };
  }
  updated() {
    for (const i of this._interactionHandles) i.destroy();
    this._interactionHandles = [];
    const t = Array.isArray(this._config?.rows) ? this._config.rows.slice(0, 6) : [];
    this.renderRoot.querySelectorAll("button.row").forEach((i) => {
      const s = Number(i.dataset.index), r = t[s];
      if (r) {
        const a = this._getRowActions(r);
        a.primary && this._interactionHandles.push(
          T(i, {
            primary: a.primary,
            hold: a.hold || void 0,
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
      <ha-card class="assembled-card">
        <div class="list-wrap">
          ${t.map((e, i) => {
      const s = this._getRowActions(e), r = e.entity ? this.hass?.states[e.entity] : null, a = e.title || "Item", n = r && a.startsWith("Item") ? At({ state: r }) : a, c = r && (e.value === "00" || !e.value) ? J(r, this.hass) : e.value || "", l = `${n}: ${c} ${e.label || ""}${e.description ? `. ${e.description}` : ""}`, d = o`
              <div>
                <div class="label-title title">${this.esc(n)}</div>
                <div class="label-sub desc">${this.esc(e.description)}</div>
              </div>
              <div class="metric">
                <b>${this.esc(c)}</b>${this.esc(e.label)}
              </div>
            `;
      return s.primary ? o`
                  <button class="row" data-index="${i}" type="button" aria-label="${this.esc(l)}">
                    ${d}
                  </button>
                ` : o`<div class="row" data-index="${i}" aria-label="${this.esc(l)}">${d}</div>`;
    })}
        </div>
      </ha-card>
    `;
  }
};
ui.styles = _n;
ui = yn([
  k("component-list-v2")
], ui);
E({
  type: "component-list-v2",
  element: ui,
  name: "List / Ranking",
  description: "Reusable list and ranking component."
});
const wn = [
  P,
  ms,
  y`
    .message {
      color: inherit;
      opacity: 0.9;
    }
    .notice-box.actionable {
      cursor: pointer;
    }
    .notice-box.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
  `
];
var $n = Object.getOwnPropertyDescriptor, Cn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? $n(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const kn = {
  type: "custom:component-notice-v2",
  title: "Notice title",
  message: "Important supporting information appears here.",
  tone: "info",
  icon: "mdi:information-outline",
  entity: null,
  navigation_path: null
};
let mi = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...kn, ...t });
  }
  getCardSize() {
    return 2;
  }
  _getAction() {
    return this._config ? this._config.navigation_path ? () => this.navigate(this._config?.navigation_path) : this._config.entity ? () => this.moreInfo(this._config?.entity) : null : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector(".notice-box");
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = T(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = this._config.tone === "error" ? "critical" : this._config.tone || "info", s = e && this._config.title === "Notice title" ? At({ state: e }) : this._config.title || "Notice title", r = e && this._config.message === "Important supporting information appears here." ? J(e, this.hass) : this._config.message || "", a = `${s}${r ? `: ${r}` : ""}`;
    return o`
      <ha-card>
        <div
          class="notice-box ${i} ${t ? "actionable" : ""}"
          role="${t ? "button" : "region"}"
          tabindex="${t ? "0" : "-1"}"
          aria-label="${this.esc(a)}"
        >
          <span>
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <div>
            <div class="label-title">${this.esc(s)}</div>
            ${r ? o`<div class="label-sub message">${this.esc(r)}</div>` : ""}
          </div>
        </div>
      </ha-card>
    `;
  }
};
mi.styles = wn;
mi = Cn([
  k("component-notice-v2")
], mi);
E({
  type: "component-notice-v2",
  element: mi,
  name: "Alert / Notice",
  description: "Reusable alert and notice component."
});
const Sn = [
  P,
  O,
  pt,
  ut,
  y`
    .progress-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
    }
    .target {
      text-align: right;
      white-space: nowrap;
    }
    .target b {
      font-weight: 650;
      color: var(--primary-text-color);
      font-variant-numeric: tabular-nums;
    }
    .determinate-progress {
      margin-top: 8px;
    }
    .progress-card.actionable {
      cursor: pointer;
    }
    .progress-card.actionable:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: var(--dashboard-radius-control);
    }
  `
];
var An = Object.getOwnPropertyDescriptor, En = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? An(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const Dn = {
  type: "custom:component-progress-v2",
  value: "68%",
  label: "Progress metric",
  progress: 68,
  target_value: "100%",
  target_label: "Target",
  entity: null,
  navigation_path: null
};
let gi = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Dn, ...t });
  }
  getCardSize() {
    return 2;
  }
  _getAction() {
    return this._config ? this._config.navigation_path ? () => this.navigate(this._config?.navigation_path) : this._config.entity ? () => this.moreInfo(this._config?.entity) : null : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector(".progress-card");
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = T(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e && this._config.label === "Progress metric" ? At({ state: e }) : this._config.label || "Progress metric", s = e && this._config.value === "68%" ? J(e, this.hass) : this._config.value || "68%";
    let r = Math.min(100, Math.max(0, Number(this._config.progress) || 0));
    if (e && this._config.progress === 68) {
      const n = parseFloat(e.state);
      isNaN(n) || (r = Math.min(100, Math.max(0, n)));
    }
    const a = `${i}: ${s}. ${this._config.target_label || "Target"}: ${this._config.target_value || "100%"}`;
    return o`
      <ha-card class="assembled-card">
        <div
          class="progress-card ${t ? "actionable" : ""}"
          role="${t ? "button" : "region"}"
          tabindex="${t ? "0" : "-1"}"
          aria-label="${this.esc(a)}"
        >
          <div class="progress-head">
            <div>
              <div class="kpi-metric-lg">${this.esc(s)}</div>
              <div class="label-sub">${this.esc(i)}</div>
            </div>
            <div class="label-sub target">
              <b>${this.esc(this._config.target_value)}</b>
              ${this.esc(this._config.target_label)}
            </div>
          </div>
          <div
            class="determinate-progress"
            role="progressbar"
            aria-valuenow="${r}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="${this.esc(i)}"
          >
            <div class="determinate-fill" style="width:${r}%"></div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
gi.styles = Sn;
gi = En([
  k("component-progress-v2")
], gi);
E({
  type: "component-progress-v2",
  element: gi,
  name: "Progress / Target",
  description: "Reusable progress and target component."
});
const Tn = [
  P,
  Fe,
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
var Pn = Object.getOwnPropertyDescriptor, On = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Pn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let fi = class extends A {
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
fi.styles = Tn;
fi = On([
  k("component-section-separator-v2")
], fi);
E({
  type: "component-section-separator-v2",
  element: fi,
  name: "Section Separator",
  description: "Reusable section separator component."
});
const zn = [
  P,
  O,
  ut,
  y`
    .kpi-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      min-height: 56px;
    }
    .value {
      white-space: nowrap;
    }
    .label {
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
    .demo-static {
      width: 100%;
      border: 0;
      background: transparent;
      text-align: inherit;
      padding: 0;
    }
    .demo {
      width: 100%;
      text-align: left;
    }
  `
];
var In = Object.getOwnPropertyDescriptor, Rn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? In(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const Hn = {
  type: "custom:component-single-kpi-v2",
  value: "00",
  label: "Primary metric",
  support_value: "00",
  support_label: "Supporting context",
  interactive: !0,
  entity: null,
  navigation_path: null
};
let bi = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Hn, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = T(e, {
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
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e && this._config.value === "00" ? J(e, this.hass) : this._config.value || "00", s = e && this._config.label === "Primary metric" ? At({ state: e }) : this._config.label || "Primary metric", r = this._config.support_value || "", a = this._config.support_label || "", n = `${s}: ${i}${r || a ? `. ${r} ${a}` : ""}`, c = o`
      <div class="kpi-row">
        <div>
          <div class="kpi-metric-lg value">${this.esc(i)}</div>
          <div class="label-sub label">${this.esc(s)}</div>
        </div>
        ${r || a ? o`
                <div class="support">
                  <b>${this.esc(r)}</b>
                  ${this.esc(a)}
                </div>
              ` : ""}
      </div>
    `;
    return o`
      <ha-card class="assembled-card">
        ${t ? o`<button class="demo" type="button" aria-label="${this.esc(n)}">${c}</button>` : o`<div class="demo-static">${c}</div>`}
      </ha-card>
    `;
  }
};
bi.styles = zn;
bi = Rn([
  k("component-single-kpi-v2")
], bi);
E({
  type: "component-single-kpi-v2",
  element: bi,
  name: "Single KPI",
  description: "Reusable single KPI component."
});
const Nn = [
  P,
  O,
  q,
  ot,
  G,
  y`
    .demo {
      width: 100%;
      text-align: left;
    }
    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--primary-text-color);
    }
    .desc {
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
var Ln = Object.getOwnPropertyDescriptor, Mn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ln(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const qn = {
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
let _i = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...qn, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = T(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e ? Q(e) : !1, s = this._config.entity ? dt(this._config.entity) : "", r = e && this._config.title === "Status title" ? At({ state: e }) : this._config.title || "Status title", a = e && this._config.status_value === "Active" ? i ? "Unavailable" : J(e, this.hass) : this._config.status_value || "Active", n = e && this._config.icon === "mdi:information-outline" ? e.attributes.icon || ye(s, e.state) : this._config.icon || "mdi:information-outline", c = this._config.description || "", l = this._config.status_label || "", d = `${r}: ${a}${l ? ` (${l})` : ""}${c ? `. ${c}` : ""}`, f = o`
      <div class="header-row ${i ? "unavailable" : ""}">
        <div class="icon-well control-radius icon">
          <ha-icon icon="${this.esc(n)}"></ha-icon>
        </div>
        <div class="copy-block">
          <div class="label-title title">${this.esc(r)}</div>
          ${c ? o`<div class="label-sub desc">${this.esc(c)}</div>` : ""}
        </div>
        <div class="status">
          <b class="kpi-metric-sm">${this.esc(a)}</b>
          ${l ? o`<span>${this.esc(l)}</span>` : ""}
        </div>
      </div>
    `;
    return o`
      <ha-card class="surface-card">
        ${t ? o`<button class="demo" type="button" aria-label="${this.esc(d)}" aria-disabled="${String(i)}" ?disabled=${i}>${f}</button>` : o`<div class="demo-static">${f}</div>`}
      </ha-card>
    `;
  }
};
_i.styles = Nn;
_i = Mn([
  k("component-status-row-v2")
], _i);
E({
  type: "component-status-row-v2",
  element: _i,
  name: "Status Row",
  description: "Reusable status row component."
});
const Un = [
  P,
  O,
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
  `
];
var jn = Object.getOwnPropertyDescriptor, Fn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? jn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const Bn = {
  type: "custom:component-text-effect-v1",
  effect: "stamp",
  description: "",
  icon: null,
  speed: 2.6
};
let vi = class extends A {
  constructor() {
    super(...arguments), this._settleTimer = null;
  }
  setConfig(t) {
    if (!t?.text)
      throw new Error("text is required");
    super.setConfig({ ...Bn, ...t });
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
    ].includes(this._config.effect || "") ? this._config.effect : "stamp", e = t === "rainbow_stamp" ? "stamp" : t, i = Math.max(1.6, Math.min(6, Number(this._config.speed) || 2.6)), s = this._config.text;
    return o`
      <ha-card style="--effect-speed: ${i}s">
        <div class="row ${e} ${this._config.icon ? "has-icon" : ""}">
          ${this._config.icon ? o`
                  <span class="icon">
                    <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
                  </span>
                ` : ""}
          <div class="copy">
            <div class="title" data-text="${this.esc(s)}">
              <span class="base">${this.esc(s)}</span>
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
vi.styles = Un;
vi = Fn([
  k("component-text-effect-v1")
], vi);
E({
  type: "component-text-effect-v1",
  element: vi,
  name: "Signature Text Effect",
  description: "Reusable transient-status effects using the existing signature motion language."
});
const Vn = [
  P,
  O,
  ut,
  y`
    .wrap {
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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
var Wn = Object.getOwnPropertyDescriptor, Gn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Wn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const Kn = {
  type: "custom:component-three-stat-v2",
  metric_1_value: "00",
  metric_1_label: "Metric one",
  metric_2_value: "00",
  metric_2_label: "Metric two",
  metric_3_value: "00",
  metric_3_label: "Metric three",
  interactive: !0
};
let yi = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Kn, ...t });
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
    const s = this._config[`metric_${t}_entity`];
    return s ? () => this.moreInfo(s) : null;
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll("button.stat").forEach((e) => {
      const i = Number(e.dataset.index), s = this._getAction(i);
      s && this._interactionHandles.push(
        T(e, { primary: s, feedback: !0 })
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
      const i = this._config[`metric_${e}_entity`], s = i ? this.hass?.states[i] : null;
      let r = this._config[`metric_${e}_value`];
      s && (r === "00" || !r) && (r = J(s, this.hass));
      let a = this._config[`metric_${e}_label`];
      s && (a === `Metric ${e === 1 ? "one" : e === 2 ? "two" : "three"}` || !a) && (a = At({ state: s }));
      const n = this._getAction(e), c = `${a}: ${r}`, l = o`
        <div class="kpi-metric-md value">${this.esc(r)}</div>
        <div class="label-sub label">${this.esc(a)}</div>
      `;
      return n ? o`<button class="stat" data-index="${e}" type="button" aria-label="${this.esc(c)}">
            ${l}
          </button>` : o`<div class="stat" data-index="${e}" aria-label="${this.esc(c)}">${l}</div>`;
    });
    return o`
      <ha-card class="assembled-card">
        <div class="wrap">${t}</div>
      </ha-card>
    `;
  }
};
yi.styles = Vn;
yi = Gn([
  k("component-three-stat-v2")
], yi);
E({
  type: "component-three-stat-v2",
  element: yi,
  name: "Three-stat Summary",
  description: "Reusable three-stat summary component."
});
const Yn = [
  P,
  O,
  q,
  ot,
  G,
  y`
    .nav {
      width: 100%;
      text-align: left;
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
var Qn = Object.getOwnPropertyDescriptor, Zn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Qn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const Jn = {
  type: "custom:component-nav-tile-v2",
  icon: "mdi:door-open",
  title: "Destination",
  context: "Navigation",
  navigation_path: null
};
let xi = class extends A {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Jn, ...t });
  }
  getCardSize() {
    return 1;
  }
  updated() {
    const t = this._config?.navigation_path, e = this.renderRoot.querySelector(
      "button.nav"
    );
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = T(e, {
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
      <div class="header-row nav-row">
        <div class="icon-well control-radius icon">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
        </div>
        <div class="copy-block">
          <div class="label-title title">${this.esc(this._config.title)}</div>
          <div class="label-sub desc">${this.esc(this._config.context)}</div>
        </div>
      </div>
    `, i = `${this._config.title || "Destination"}${this._config.context ? `: ${this._config.context}` : ""}. Navigate.`;
    return o`
      <ha-card class="surface-card">
        ${t ? o`<button class="i nav" type="button" aria-label="${this.esc(i)}">${e}</button>` : o`<div class="nav nav-static" aria-label="${this.esc(i)}">${e}</div>`}
      </ha-card>
    `;
  }
};
xi.styles = Yn;
xi = Zn([
  k("component-nav-tile-v2")
], xi);
E({
  type: "component-nav-tile-v2",
  element: xi,
  name: "Navigation Tile",
  description: "Reusable navigation tile component."
});
const Xn = [
  P,
  O,
  V,
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
var to = Object.getOwnPropertyDescriptor, eo = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? to(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const io = {
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
let wi = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...io, ...t });
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
    for (const s of this._interactionHandles) s.destroy();
    this._interactionHandles = [];
    const t = this.renderRoot.querySelector(
      "#context"
    ), e = this.renderRoot.querySelector(
      "#action-1"
    ), i = this.renderRoot.querySelector(
      "#action-2"
    );
    t && this._interactionHandles.push(
      T(t, {
        primary: () => this.moreInfo(this._config?.left_entity),
        feedback: !0
      })
    ), e && this._config?.action_1_path && this._interactionHandles.push(
      T(e, {
        primary: () => this.navigate(this._config?.action_1_path),
        feedback: !0
      })
    ), i && this._config?.action_2_path && this._interactionHandles.push(
      T(i, {
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
wi.styles = Xn;
wi = eo([
  k("component-quick-nav-v2")
], wi);
E({
  type: "component-quick-nav-v2",
  element: wi,
  name: "Quick Navigation",
  description: "Reusable quick navigation component."
});
const so = [
  P,
  O,
  q,
  G,
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
var ro = Object.defineProperty, ao = Object.getOwnPropertyDescriptor, Mr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ao(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && ro(e, i, r), r;
};
const no = {
  type: "custom:component-room-navigation-v1",
  name: "Room",
  icon: "mdi:home-outline"
};
let ze = class extends A {
  constructor() {
    super(...arguments), this._registries = null, this._interactionHandle = null, this._unsubRegistry = null, this._registryHass = null;
  }
  static getGridOptions() {
    return { columns: 6, rows: 1 };
  }
  setConfig(t) {
    if (!t?.area) throw new Error("area is required");
    if (!t?.navigation_path)
      throw new Error("navigation_path is required");
    super.setConfig({ ...no, ...t }), this.hass && this._loadRegistry();
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), this._bindRegistry(), this._loadRegistry();
  }
  disconnectedCallback() {
    this._unbindRegistry(), this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  willUpdate(t) {
    t.has("hass") && t.get("hass") !== this.hass && (this._registries = null, this._unbindRegistry()), this.hass && (this._bindRegistry(), (!this._registries || t.has("hass")) && this._loadRegistry());
  }
  _bindRegistry() {
    if (!this.isConnected || !this.hass || this._registryHass === this.hass && this._unsubRegistry) return;
    this._unbindRegistry();
    const t = this.hass;
    this._registryHass = t, this._unsubRegistry = W.subscribe(t, (e) => {
      this.hass === t && (this._registries = e);
    });
  }
  _unbindRegistry() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._registryHass = null;
  }
  async _loadRegistry() {
    if (!this.hass) return;
    const t = this.hass;
    try {
      const e = await W.load(t);
      this.hass === t && (this._registries = e);
    } catch {
    }
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
    const e = Ir(t, this._registries, this.hass);
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
      ).toLowerCase(), s = `${e.entity_id} ${String(e.attributes?.friendly_name || "")}`.toLowerCase();
      return i === "occupancy" || i === "presence" || s.includes("presence") || s.includes("occupancy") || s.includes("mmwave");
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
    t && this._config?.navigation_path ? (this._interactionHandle?.destroy(), this._interactionHandle = T(t, {
      primary: () => this.navigate(this._config?.navigation_path),
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  render() {
    if (!this._config) return o``;
    const t = this._getStatus(), e = this._presenceDetected(), i = `Open ${this._config.name}${t.summary ? `. ${t.summary}` : ""}`, s = e ? this._presenceHue() : 0, r = e ? `border-color: hsl(${s} 82% 68% / .62); box-shadow: 0 0 0 1px hsl(${s} 82% 68% / .18), 0 0 14px 2px hsl(${s} 82% 64% / .14);` : "";
    return o`
      <ha-card style="${r}" ?data-presence=${e}>
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
ze.styles = so;
Mr([
  x()
], ze.prototype, "_registries", 2);
ze = Mr([
  k("component-room-navigation-v1")
], ze);
E({
  type: "component-room-navigation-v1",
  element: ze,
  name: "Room Navigation",
  description: "Area-aware room navigation with presence status."
});
const oo = [
  P,
  O,
  V,
  q,
  Fe,
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
var co = Object.getOwnPropertyDescriptor, lo = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? co(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const ho = {
  type: "custom:component-room-sheet-v2",
  icon: "mdi:bed-king-outline",
  title: "Room name",
  rows: null
}, rr = [
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
let $i = class extends A {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...ho, ...t });
  }
  getCardSize() {
    return 5;
  }
  _getAction(t) {
    if (t.navigation_path) return () => this.navigate(t.navigation_path);
    if (t.service && this.hass) {
      const [e, i] = String(t.service).split(".");
      if (e && i)
        return () => S(this.hass, {
          domain: e,
          service: i,
          data: t.service_data,
          target: t.entity ? { entity_id: t.entity } : void 0
        });
    }
    return t.entity ? () => this.moreInfo(t.entity) : null;
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], (Array.isArray(this._config?.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : rr).forEach((e, i) => {
      const s = this._getAction(e);
      if (!s) return;
      const r = this.renderRoot.querySelector(
        `[data-row="${i}"]`
      );
      r && (r.setAttribute(
        "aria-label",
        e.aria_label || `${e.name || "Room control"}`
      ), this._interactionHandles.push(
        T(r, {
          primary: s,
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
    const t = Array.isArray(this._config.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : rr;
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
            ${t.map((i, s) => {
      const r = i.entity && this.hass?.states ? this.hass.states[i.entity] : null, a = i.entity ? dt(i.entity) : "", n = r && (!i.name || i.name === "Control name" || i.name === "Status metric") ? At({ state: r }) : i.name || "Control name", c = r && (!i.state || i.state === "Current state" || i.state === "Supporting context") ? J(r, this.hass) : i.state || "", l = r && (!i.icon || i.icon === "mdi:circle-outline") ? r.attributes.icon || ye(a, r.state) : i.icon || "mdi:circle-outline", d = i.value || "", f = i.section || "Controls", g = f !== e;
      g && (e = f);
      const h = this._getAction(i), u = i.aria_label || `${n}: ${c || d}`;
      return o`
                ${g ? o`<div class="sep">${this.esc(f)}</div>` : ""}
                ${h ? o`
                        <button
                          class="row actionable"
                          data-row="${s}"
                          type="button"
                          aria-label="${this.esc(u)}"
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
                          ${d ? o`<span class="rvalue">${this.esc(d)}</span>` : ""}
                        </button>
                      ` : o`
                        <div class="row" data-row="${s}" aria-label="${this.esc(u)}">
                          <ha-icon
                            icon="${this.esc(l)}"
                          ></ha-icon>
                          <span>
                            <div class="rname">
                              ${this.esc(n)}
                            </div>
                            ${c ? o`<div class="rstate">${this.esc(c)}</div>` : ""}
                          </span>
                          ${d ? o`<span class="rvalue">${this.esc(d)}</span>` : ""}
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
$i.styles = oo;
$i = lo([
  k("component-room-sheet-v2")
], $i);
E({
  type: "component-room-sheet-v2",
  element: $i,
  name: "Room Sheet",
  description: "Reusable room-sheet component."
});
const po = [
  P,
  O,
  ot,
  q,
  V,
  je,
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
var uo = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, ys = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? mo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && uo(e, i, r), r;
};
const go = {
  type: "custom:component-control-row-v2",
  icon: "mdi:lightbulb-outline",
  title: "Control name",
  state: "Current state",
  mode: "slider",
  value: 68,
  entity: null
};
let oe = class extends A {
  constructor() {
    super(...arguments), this._on = !0, this._val = 68, this._interactionHandles = [], this._coalescer = null;
  }
  setConfig(t) {
    super.setConfig({ ...go, ...t }), this._on = this._config?.on !== !1, this._val = Math.max(0, Math.min(100, Number(this._config?.value) || 68)), this._resetCoalescer();
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
    if (e === "cover")
      return Math.max(
        0,
        Math.min(100, Number(t.attributes?.current_position) || 0)
      );
    if (e === "media_player")
      return Math.max(
        0,
        Math.min(100, Math.round(Number(t.attributes?.volume_level ?? 0) * 100))
      );
    if (e === "climate") {
      const s = Number(t.attributes?.min_temp ?? 16), r = Number(t.attributes?.max_temp ?? 30), a = Number(t.attributes?.temperature ?? s);
      if (r > s)
        return Math.max(0, Math.min(100, (a - s) / (r - s) * 100));
    }
    if (e === "number" || e === "input_number") {
      const s = Number(t.attributes?.min ?? 0), r = Number(t.attributes?.max ?? 100), a = Number(t.state);
      if (Number.isFinite(a) && Number.isFinite(s) && Number.isFinite(r) && r > s)
        return Math.max(0, Math.min(100, (a - s) / (r - s) * 100));
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
    return this._coalescer ? this._coalescer : (this._coalescer = ps(
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
      const r = i.data_key || "value";
      return S(this.hass, {
        domain: i.domain,
        service: i.service,
        data: { ...i.data || {}, [r]: t },
        target: { entity_id: e }
      });
    }
    const s = this._domain();
    if (s === "light")
      return t <= 0 ? S(this.hass, {
        domain: "light",
        service: "turn_off",
        target: { entity_id: e }
      }) : S(this.hass, {
        domain: "light",
        service: "turn_on",
        data: { brightness_pct: Math.round(t) },
        target: { entity_id: e }
      });
    if (s === "fan")
      return S(this.hass, {
        domain: "fan",
        service: "set_percentage",
        data: { percentage: Math.round(t) },
        target: { entity_id: e }
      });
    if (s === "cover")
      return S(this.hass, {
        domain: "cover",
        service: "set_cover_position",
        data: { position: Math.round(t) },
        target: { entity_id: e }
      });
    if (s === "media_player")
      return S(this.hass, {
        domain: "media_player",
        service: "set_volume_level",
        data: { volume_level: Math.round(t) / 100 },
        target: { entity_id: e }
      });
    if (s === "climate") {
      const r = this._getState(), a = Number(r?.attributes?.min_temp ?? 16), n = Number(r?.attributes?.max_temp ?? 30), c = Number(r?.attributes?.target_temp_step ?? 0.5);
      let l = a + (n - a) * t / 100;
      return l = Number((Math.round(l / c) * c).toFixed(1)), S(this.hass, {
        domain: "climate",
        service: "set_temperature",
        data: { temperature: l },
        target: { entity_id: e }
      });
    }
    if (s === "number" || s === "input_number") {
      const r = this._getState(), a = Number(r?.attributes?.min ?? 0), n = Number(r?.attributes?.max ?? 100), c = a + (n - a) * t / 100;
      return S(this.hass, {
        domain: s,
        service: "set_value",
        data: { value: c },
        target: { entity_id: e }
      });
    }
    throw new Error(
      `Slider mode does not support ${s || "this entity"} without slider_service`
    );
  }
  _updateSliderVisual() {
    const t = this.renderRoot.querySelector(
      ".slider > span"
    );
    t && (t.style.width = `${Math.max(0, Math.min(100, this._val))}%`);
  }
  async _toggle(t) {
    !this._config?.entity || !this.hass || (await S(this.hass, {
      domain: "homeassistant",
      service: "toggle",
      target: { entity_id: this._config.entity }
    }), await Pe(
      this.hass,
      this._config.entity,
      (e) => e === (t ? "off" : "on"),
      { timeout: 9e3 }
    ));
  }
  _serviceAction() {
    const t = String(this._config?.service || ""), [e, i] = t.split(".");
    if (!e || !i) return this.moreInfo(this._config?.entity);
    if (!(!this.hass || !this._config?.entity))
      return S(this.hass, {
        domain: e,
        service: i,
        data: this._config.service_data,
        target: { entity_id: this._config.entity }
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
    const t = this._config?.mode || "slider", e = !!this._config?.entity, i = this._getState(), s = e ? this._available(i) : !0, r = e ? i?.state === "on" : this._on;
    if (e && t === "slider") {
      const l = this.renderRoot.querySelector(
        ".identity"
      );
      l && (l.setAttribute("role", "button"), l.setAttribute("tabindex", "0"), l.setAttribute(
        "aria-label",
        `Open details for ${this._config?.title}`
      ), this._interactionHandles.push(
        T(l, {
          primary: () => this.moreInfo(this._config?.entity),
          feedback: !0
        })
      ));
      const d = this.renderRoot.querySelector(
        ".live-slider"
      );
      d && (d.disabled = !s, d.oninput = () => {
        this._val = Number(d.value), this._updateSliderVisual(), this._sliderCoalescer().request(this._val);
      });
      return;
    }
    const n = e ? t !== "slider" : !e && (t === "switch" || t === "slider"), c = this.renderRoot.querySelector(
      n ? "button.row" : ".row"
    );
    if (!(!n || !c)) {
      if (!e) {
        this._interactionHandles.push(
          T(c, {
            primary: () => {
              t === "switch" ? this._on = !this._on : t === "slider" && (this._val = (this._val + 20) % 120, this._val > 100 && (this._val = 0));
            },
            feedback: !0
          })
        );
        return;
      }
      if (t === "switch") {
        c.setAttribute("aria-pressed", String(r)), c.setAttribute(
          "aria-label",
          `${r ? "Turn off" : "Turn on"} ${this._config?.title}`
        );
        const l = c.querySelector(".switch");
        this._interactionHandles.push(
          T(c, {
            primary: () => this._toggle(r),
            hold: () => this.moreInfo(this._config?.entity),
            optimistic: {
              capture: () => r,
              apply: () => {
                const d = !r;
                this._on = d, c.setAttribute("aria-pressed", String(d)), l?.classList.toggle("on", d);
              },
              rollback: () => {
                this._on = r, c.setAttribute("aria-pressed", String(r)), l?.classList.toggle("on", r);
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
        T(c, {
          primary: () => t === "action" ? this._serviceAction() : this.moreInfo(this._config?.entity),
          feedback: !0
        })
      );
    }
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.mode || "slider", e = !!this._config.entity, i = this._getState(), s = e ? this._available(i) : !0, r = e ? i?.state === "on" : this._on;
    t === "slider" && e && (this._val = this._sliderPercent(i));
    const a = t === "switch" ? o`<span class="switch ${r ? "on" : ""}"
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
        <span class="control">${a}</span>
      </div>
    `;
    return o`
      <ha-card>
        ${c ? o`
                <button
                  class="i row"
                  type="button"
                  ?disabled=${e && !s}
                >
                  ${l}
                </button>
              ` : o`<div class="row row-static">${l}</div>`}
      </ha-card>
    `;
  }
};
oe.styles = po;
ys([
  x()
], oe.prototype, "_on", 2);
ys([
  x()
], oe.prototype, "_val", 2);
oe = ys([
  k("component-control-row-v2")
], oe);
E({
  type: "component-control-row-v2",
  element: oe,
  name: "Control Row",
  description: "Reusable control-row component."
});
const fo = [
  P,
  O,
  ot,
  q,
  V,
  qt,
  G,
  y`
    .media-row {
      grid-template-columns: 40px minmax(0, 1fr) auto;
    }
    .identity {
      min-width: 0;
      min-height: 44px;
      text-align: left;
    }
    .identity .label-title,
    .identity .label-sub {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .buttons {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .btn {
      flex: 0 0 auto;
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
var bo = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, Li = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? _o(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && bo(e, i, r), r;
};
const ei = { pause: 1, previous: 16, next: 32, play: 512 }, vo = {
  type: "custom:component-media-row-v2",
  icon: "mdi:speaker",
  title: "Media player",
  state: "Playing · Media title",
  entity: null
};
let It = class extends A {
  constructor() {
    super(...arguments), this._playing = !0, this._optimisticPlaying = null, this._busy = !1, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...vo, ...t }), this._playing = !0, this._optimisticPlaying = null, this._busy = !1;
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
        await S(this.hass, {
          domain: "media_player",
          service: e,
          target: { entity_id: this._config.entity }
        }), await Pe(
          () => this.hass,
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
      return S(this.hass, {
        domain: "media_player",
        service: t,
        target: { entity_id: this._config.entity }
      });
  }
  disconnectedCallback() {
    this._busy = !1;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  updated() {
    for (const a of this._interactionHandles) a.destroy();
    this._interactionHandles = [];
    const t = !!this._config?.entity, e = this._liveState(), s = t && this._available(e) ? e?.state === "playing" : this._playing;
    if (t) {
      const a = this.renderRoot.querySelector(
        ".identity"
      );
      a && (a.setAttribute(
        "aria-label",
        `Open details for ${this._config?.title}`
      ), this._interactionHandles.push(
        T(a, {
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
        T(n, {
          primary: () => this._momentary("media_previous_track"),
          feedback: !0
        })
      ), c && this._interactionHandles.push(
        T(c, {
          primary: () => this._momentary("media_next_track"),
          feedback: !0
        })
      );
    }
    const r = this.renderRoot.querySelector(
      ".main"
    );
    r && (t ? this._interactionHandles.push(
      T(r, {
        primary: () => this._playPause(s),
        optimistic: {
          capture: () => s,
          apply: () => {
            this._optimisticPlaying = !s, r.setAttribute(
              "aria-label",
              s ? "Play" : "Pause"
            ), r.querySelector("ha-icon")?.setAttribute(
              "icon",
              `mdi:${s ? "play" : "pause"}`
            );
          },
          rollback: () => {
            this._optimisticPlaying = null;
          }
        },
        feedback: !0
      })
    ) : this._interactionHandles.push(
      T(r, {
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
    const t = this._liveState(), e = !!this._config.entity, i = e && this._available(t), s = i ? t?.state === "playing" : this._playing, r = this._optimisticPlaying ?? s, a = i && this._supported(t, ei.previous), n = i && this._supported(t, ei.next), c = !this._busy && (!e || i && this._supported(
      t,
      r ? ei.pause : ei.play
    ));
    return o`
      <ha-card class="surface-card">
        <div class="header-row media-row">
          <div class="icon-well control-radius icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </div>
          ${e ? o`
                  <button class="identity" type="button">
                    <div class="label-title title">${this.esc(this._config.title)}</div>
                    <div class="label-sub desc">
                      ${this.esc(this._description(t))}
                    </div>
                  </button>
                ` : o`
                  <div class="copy-block">
                    <div class="label-title title">${this.esc(this._config.title)}</div>
                    <div class="label-sub desc">
                      ${this.esc(this._description(t))}
                    </div>
                  </div>
                `}
          <div class="buttons">
            ${e ? o`
                    <button
                      class="btn-icon-36 btn previous"
                      type="button"
                      aria-label="Previous"
                      ?disabled=${!a}
                    >
                      <ha-icon icon="mdi:skip-previous"></ha-icon>
                    </button>
                  ` : o`
                    <span class="btn-icon-36 btn" aria-hidden="true">
                      <ha-icon icon="mdi:skip-previous"></ha-icon>
                    </span>
                  `}
            <button
              class="btn-icon-36 btn main"
              type="button"
              aria-label="${r ? "Pause" : "Play"}"
              ?disabled=${!c}
            >
              <ha-icon icon="mdi:${r ? "pause" : "play"}"></ha-icon>
            </button>
            ${e ? o`
                    <button
                      class="btn-icon-36 btn next"
                      type="button"
                      aria-label="Next"
                      ?disabled=${!n}
                    >
                      <ha-icon icon="mdi:skip-next"></ha-icon>
                    </button>
                  ` : o`
                    <span class="btn-icon-36 btn" aria-hidden="true">
                      <ha-icon icon="mdi:skip-next"></ha-icon>
                    </span>
                  `}
          </div>
        </div>
      </ha-card>
    `;
  }
};
It.styles = fo;
Li([
  x()
], It.prototype, "_playing", 2);
Li([
  x()
], It.prototype, "_optimisticPlaying", 2);
Li([
  x()
], It.prototype, "_busy", 2);
It = Li([
  k("component-media-row-v2")
], It);
E({
  type: "component-media-row-v2",
  element: It,
  name: "Media Row",
  description: "Reusable media-row component."
});
const yo = [
  us,
  y`
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
`
];
var xo = Object.defineProperty, wo = Object.getOwnPropertyDescriptor, xs = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? wo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && xo(e, i, r), r;
};
const $o = "custom:auto-entities", ar = (t) => JSON.parse(JSON.stringify(t));
let ce = class extends A {
  constructor() {
    super(...arguments), this._innerCard = null, this._innerError = !1, this._generation = 0, this._retryTimer = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.filter) throw new Error("An Auto-Entities filter is required");
    super.setConfig(ar(t)), this._generation += 1, this._retryTimer && clearTimeout(this._retryTimer), this._retryTimer = null, this._buildCard();
  }
  getCardSize() {
    const t = !!this._config?.header?.title?.trim();
    return (typeof this._innerCard?.getCardSize == "function" && Number(this._innerCard.getCardSize()) || 1) + (t ? 1 : 0);
  }
  getLayoutOptions() {
    return this._innerCard?.getLayoutOptions?.() ?? {};
  }
  _cardConfig() {
    const t = ar(
      this._config || {}
    ), e = t.exclude_invalid_states !== !1;
    delete t.header, delete t.exclude_invalid_states, t.type = $o;
    const i = t.filter ?? {};
    if (i.exclude = Array.isArray(i.exclude) ? [...i.exclude] : [], e)
      for (const s of ["unavailable", "unknown"])
        i.exclude.some(
          (r) => r?.state === s && Object.keys(r).length === 1
        ) || i.exclude.push({ state: s });
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
      const s = i.createCardElement(this._cardConfig());
      s.hass = this.hass, this._innerCard = s, this._innerError = !1;
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
ce.styles = yo;
xs([
  x()
], ce.prototype, "_innerCard", 2);
xs([
  x()
], ce.prototype, "_innerError", 2);
ce = xs([
  k("component-device-aware-auto-entities-v1")
], ce);
E({
  type: "component-device-aware-auto-entities-v1",
  element: ce,
  name: "Device Aware Auto Entities",
  description: "Presentation wrapper for Auto-Entities collections."
});
const Co = [
  P,
  O,
  V,
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
var ko = Object.defineProperty, So = Object.getOwnPropertyDescriptor, ws = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? So(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && ko(e, i, r), r;
};
const Ao = {
  type: "custom:component-device-discovery-v2",
  demo: !1,
  refresh_seconds: 60,
  max_rows: 6
}, Eo = [
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
let le = class extends A {
  constructor() {
    super(...arguments), this._flows = [], this._stateKind = "ready", this._timer = null, this._started = !1, this._loadGeneration = 0, this._interactionHandles = [];
  }
  setConfig(t) {
    const e = !!this._config?.demo;
    if (super.setConfig({ ...Ao, ...t }), this._config?.demo) {
      (!e || this._started) && (this._timer && clearInterval(this._timer), this._timer = null, this._started = !1, this._loadGeneration += 1), this._flows = Eo, this._stateKind = "ready";
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
    return (t || []).filter((i) => e.has(i?.context?.source || "")).sort((i, s) => this._name(i).localeCompare(this._name(s)));
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
    for (const s of this._interactionHandles) s.destroy();
    this._interactionHandles = [];
    const t = this.renderRoot.querySelector(
      ".retry"
    );
    t && this._interactionHandles.push(
      T(t, { primary: () => this.load(), feedback: !0 })
    );
    const e = this.renderRoot.querySelector(
      "button.refresh"
    );
    e && this._interactionHandles.push(
      T(e, { primary: () => this.load(), feedback: !0 })
    ), this.renderRoot.querySelectorAll("button.row").forEach((s) => {
      this._interactionHandles.push(
        T(s, {
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
    const t = Math.max(1, Number(this._config.max_rows) || 6), e = this._flows.slice(0, t), i = Math.max(0, this._flows.length - e.length), s = this._flows.length === 0, r = s ? "No devices waiting" : `${this._flows.length} ${this._flows.length === 1 ? "device" : "devices"} found`, a = s ? "Home Assistant has no new setup suggestions." : "Home Assistant has setup suggestions ready to review.";
    return o`
      <ha-card>
        <div class="card">
          <div class="summary ${s ? "success" : ""}">
            <span class="icon">
              <ha-icon
                icon="${s ? "mdi:check-circle-outline" : "mdi:radar"}"
              ></ha-icon>
            </span>
            <span>
              <div class="title">${this.esc(r)}</div>
              <div class="description">${this.esc(a)}</div>
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
      const c = this._name(n), l = `${this._source(n.context?.source)} · ${n.handler}`, d = o`
              <span class="icon"
                ><ha-icon icon="mdi:plus-circle-outline"></ha-icon
              ></span>
              <span>
                <div class="title">${this.esc(c)}</div>
                <div class="description">${this.esc(l)}</div>
              </span>
              <span class="review" aria-hidden="true">Review</span>
            `;
      return this._config?.demo ? o`<div class="row">${d}</div>` : o`<button
                  class="row"
                  type="button"
                  aria-label="Review ${this.esc(c)}"
                >
                  ${d}
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
le.styles = Co;
ws([
  x()
], le.prototype, "_flows", 2);
ws([
  x()
], le.prototype, "_stateKind", 2);
le = ws([
  k("component-device-discovery-v2")
], le);
E({
  type: "component-device-discovery-v2",
  element: le,
  name: "Device Discovery",
  description: "Reusable device-discovery status component."
});
const Do = [
  P,
  O,
  V,
  q,
  ot,
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
var To = Object.defineProperty, Po = Object.getOwnPropertyDescriptor, Mi = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Po(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && To(e, i, r), r;
};
const Oo = {
  type: "custom:component-update-row-v3",
  icon: "mdi:update",
  title: "Update name",
  current: "Current 1.0",
  available: "Available 1.1",
  action: "Update",
  confirm: !0,
  entity: null
};
let Rt = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._requested = !1, this._error = "", this._startTimer = null, this._errorTimer = null, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Oo, ...t });
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
      const a = !!this._config?.entity;
      return {
        live: !1,
        missing: a,
        unavailable: a,
        title: this._config?.title || "Update",
        current: a ? "Update entity unavailable" : this._config?.current || "Current 1.0",
        available: a ? "" : this._config?.available || "Available 1.1",
        action: a ? "Unavailable" : this._config?.action || "Update",
        pending: !a,
        progress: {
          active: !1,
          determinate: !1,
          value: 0
        }
      };
    }
    const e = t.attributes || {}, i = ["unavailable", "unknown"].includes(t.state), s = t.state === "on", r = this._progress(e);
    return {
      live: !0,
      missing: !1,
      unavailable: i,
      title: this._name(t),
      current: e.installed_version ? `Current ${e.installed_version}` : "Current version unavailable",
      available: e.latest_version ? `Available ${e.latest_version}` : "Latest version unavailable",
      action: i ? "Unavailable" : r.active ? "Updating…" : s ? "Update" : "Current",
      pending: s,
      progress: r
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
    const e = this._state(), i = this._name(e), s = e?.attributes?.latest_version || "the latest version";
    if (!(this._config?.confirm !== !1 && typeof window < "u" && !window.confirm(`Install ${s} for ${i}?`))) {
      this._setError(""), this._busy = !0, this._requested = !0;
      try {
        await S(this.hass, {
          domain: "update",
          service: "install",
          target: { entity_id: this._config.entity }
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
    for (const s of this._interactionHandles) s.destroy();
    this._interactionHandles = [];
    const e = this.renderRoot.querySelector(
      ".details"
    ), i = this.renderRoot.querySelector(
      ".action"
    );
    e && this._state() && (e.setAttribute("aria-label", `Open details for ${t.title}`), this._interactionHandles.push(
      T(e, {
        primary: () => this.moreInfo(this._config?.entity),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    )), i && this._interactionHandles.push(
      T(i, {
        primary: () => this._install(t),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._data(), e = t.progress.active || this._busy || this._requested, i = t.missing || t.unavailable || !t.pending || e, s = this._error ? "Retry" : this._busy || this._requested ? "Starting…" : t.action, r = this._error ? this._error : `${t.current}${t.available ? ` · ${t.available}` : ""}`, a = e ? t.progress.determinate ? o`
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
                ${this.esc(r)}
              </div>
            </span>
          </button>
          <button
            class="action"
            type="button"
            aria-label="${this.esc(s)} ${this.esc(t.title)}"
            ?disabled=${i}
          >
            ${this.esc(s)}
          </button>
        </div>
        ${a}
      </ha-card>
    `;
  }
};
Rt.styles = Do;
Mi([
  x()
], Rt.prototype, "_busy", 2);
Mi([
  x()
], Rt.prototype, "_requested", 2);
Mi([
  x()
], Rt.prototype, "_error", 2);
Rt = Mi([
  k("component-update-row-v3")
], Rt);
E({
  type: "component-update-row-v3",
  element: Rt,
  name: "Update Row",
  description: "Reusable update row with live update support."
});
const zo = [
  P,
  O,
  V,
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
var Io = Object.defineProperty, Ro = Object.getOwnPropertyDescriptor, $s = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ro(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Io(e, i, r), r;
};
const Ho = {
  type: "custom:component-update-summary-v3",
  count: "3",
  title: "updates available",
  message: "Review the items below before installing.",
  live_updates: !1,
  update_all: !1,
  confirm: !0
};
let de = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._error = "", this._messageTimer = null, this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Ho, ...t });
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
      (r) => !this._inProgress(r.attributes)
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
    ], s = t.map((r) => r.entity_id).filter((r) => !i.includes(r));
    try {
      s.length && await S(this.hass, {
        domain: "update",
        service: "install",
        target: { entity_id: s }
      });
      for (const r of i)
        t.some((a) => a.entity_id === r) && await S(this.hass, {
          domain: "update",
          service: "install",
          target: { entity_id: r }
        });
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
    t ? (this._interactionHandle?.destroy(), this._interactionHandle = T(t, {
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
    }, e = !!this._config.update_all, i = this.hass ? this._config.live_updates ? Number(t.count) : e ? this._pending().length : 0 : Number(t.count) || 0, s = this._error ? this._error : this._busy ? "Starting available updates…" : t.message;
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
              ${this.esc(s)}
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
de.styles = zo;
$s([
  x()
], de.prototype, "_busy", 2);
$s([
  x()
], de.prototype, "_error", 2);
de = $s([
  k("component-update-summary-v3")
], de);
E({
  type: "component-update-summary-v3",
  element: de,
  name: "Update Summary",
  description: "Reusable update summary with live update support."
});
const No = [
  P,
  O,
  V,
  qt,
  q,
  Aa,
  je,
  St,
  y`
    .apple-card {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .apple-header {
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) auto;
      gap: 12px;
      align-items: center;
    }

    .apple-more-info {
      border: 0;
      padding: 0;
      cursor: pointer;
    }

    .apple-header-actions {
      display: flex;
      gap: 6px;
    }

    .apple-launchers {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .apple-launcher {
      min-height: 56px;
      justify-content: flex-start;
      padding: 0 12px;
      text-align: left;
    }

    .apple-launch-icon {
      width: 34px;
      height: 34px;
      margin-right: 4px;
    }

    .apple-launch-copy {
      text-align: left;
    }

    .apple-launch-copy .label-title,
    .apple-launch-copy .label-sub {
      display: block;
    }

    .apple-launch-copy .label-title {
      font-size: 13px;
    }

    .apple-launch-copy .label-sub {
      margin-top: 1px;
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
      color: var(--primary-text-color);
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

    .dialog-header .btn-icon-44 {
      width: 32px;
      height: 32px;
    }

    .dialog-body {
      padding: 16px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }

    .remote-toolbar {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .remote-power,
    .utility button,
    .keyboard button,
    .apple-launcher,
    .app-btn {
      --action-glow-color: var(--primary-color, #03a9f4);
      transition:
        transform 0.15s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.25s ease,
        color 0.2s ease;
    }

    .remote-power:active:not(:disabled),
    .utility button:active:not(:disabled),
    .keyboard button:active:not(:disabled),
    .apple-launcher:active:not(:disabled),
    .app-btn:active:not(:disabled) {
      border-color: var(--action-glow-color) !important;
      box-shadow: 0 0 0 1px var(--action-glow-color),
                  0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.96);
    }

    .remote-power[data-cmd="wakeup"] {
      --action-glow-color: var(--success-color, #4caf50);
    }

    .remote-power[data-cmd="suspend"] {
      --action-glow-color: var(--error-color, #f44336);
    }

    .utility button[data-cmd="play"],
    .utility button[data-cmd="pause"],
    .utility button[data-cmd="play_pause"] {
      --action-glow-color: var(--warning-color, #ff9800);
    }

    .keyboard button[data-action="send"],
    .keyboard button[aria-label*="send" i] {
      --action-glow-color: var(--primary-color, #03a9f4);
    }

    .keyboard button[data-action="clear"],
    .keyboard button[aria-label*="clear" i] {
      --action-glow-color: var(--error-color, #f44336);
    }

    .remote-power,
    .utility button,
    .keyboard button {
      min-height: 44px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      color: var(--secondary-text-color);
      font-size: 12.5px;
      font-weight: 600;
    }

    .remote-power:hover:not(:disabled),
    .utility button:hover:not(:disabled),
    .keyboard button:hover:not(:disabled) {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }

    .remote-power ha-icon,
    .utility ha-icon,
    .keyboard ha-icon {
      --mdc-icon-size: 18px;
    }

    .dpad-cluster {
      max-width: 100%;
      box-sizing: border-box;
    }

    .dpad-btn:disabled {
      cursor: default;
    }

    .dpad-btn ha-icon {
      --mdc-icon-size: 22px;
    }

    .utility {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      margin-top: 12px;
    }

    .utility button {
      width: 100%;
      padding: 0 8px;
    }

    .keyboard {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 44px 44px;
      gap: 8px;
      margin-top: 12px;
    }

    .keyboard input {
      min-width: 0;
      height: 44px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      font-size: 13px;
    }

    .keyboard input::placeholder {
      color: var(--disabled-text-color);
    }

    .keyboard button {
      width: 44px;
      padding: 0;
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
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 600;
    }

    .app-btn:hover:not(:disabled) {
      background: var(--dashboard-card-muted-surface);
    }

    .app-btn.active {
      color: var(--primary-color);
      border-color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }

    .empty-copy,
    .action-error {
      min-height: 18px;
      font-size: 12px;
      font-weight: 500;
      line-height: 1.35;
      color: var(--secondary-text-color);
    }

    .action-error {
      color: var(--error-color);
    }

    .volume-row {
      display: grid;
      grid-template-columns: 24px minmax(0, 1fr) 24px auto;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: var(--dashboard-card-muted-surface);
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      margin: 8px 0;
    }

    .volume-row ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 18px;
    }

    .volume-val {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }

    @media (max-width: 480px) {
      .apple-header {
        grid-template-columns: 40px minmax(0, 1fr);
      }

      .apple-header-actions {
        grid-column: 1 / -1;
        justify-content: flex-end;
      }

      .remote-toolbar {
        flex-wrap: wrap;
      }
    }
  `
];
var Lo = Object.defineProperty, Mo = Object.getOwnPropertyDescriptor, qi = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Mo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Lo(e, i, r), r;
};
const qo = Object.freeze([
  ["up", "Up", "mdi:chevron-up"],
  ["left", "Left", "mdi:chevron-left"],
  ["select", "Select", "mdi:circle"],
  ["right", "Right", "mdi:chevron-right"],
  ["down", "Down", "mdi:chevron-down"]
]), Uo = Object.freeze([
  ["menu", "Menu", "mdi:menu"],
  ["home", "Home", "mdi:home-outline"],
  ["top_menu", "Top menu", "mdi:format-list-bulleted"]
]);
let Ht = class extends A {
  constructor() {
    super(...arguments), this._activePanel = null, this._actionError = null, this._busyAction = null, this._inFlightActions = /* @__PURE__ */ new Set(), this._lastFocused = null, this._backdropMouseDown = !1;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.entity && !t?.demo) throw new Error("An Apple TV media_player entity is required");
    this._activePanel = null, this._actionError = null, super.setConfig({
      type: "custom:component-apple-tv-controller-v1",
      entity: t?.entity || "media_player.demo_apple_tv",
      title: t?.title || void 0,
      demo: !!t?.demo,
      remote_entity: t?.remote_entity || null,
      keyboard_entity: t?.keyboard_entity || null,
      keyboard_config_entry_id: t?.keyboard_config_entry_id || t?.config_entry_id || null
    });
  }
  getCardSize() {
    return this._config?.remote_entity ? 4 : 2;
  }
  disconnectedCallback() {
    this._activePanel = null, this._lastFocused = null, super.disconnectedCallback();
  }
  updated(t) {
    t.has("_activePanel") && this._activePanel && this.updateComplete.then(() => this.renderRoot.querySelector("[data-dialog-close]")?.focus());
  }
  _isAvailable(t) {
    const e = t ? this.hass?.states?.[t]?.state : void 0;
    return e !== void 0 && e !== "unavailable" && e !== "unknown";
  }
  _serviceSupported(t, e) {
    const i = this.hass?.services;
    return !i || Object.keys(i).length === 0 || !!i[t]?.[e];
  }
  _remoteEntity() {
    const t = this._config?.entity;
    return this._config?.remote_entity || (t ? t.startsWith("remote.") ? t : t.replace(/^media_player\./, "remote.") : null);
  }
  _remoteAvailable() {
    const t = this._remoteEntity();
    return !!(this._config?.demo || t && this._isAvailable(t) && this._serviceSupported("remote", "send_command"));
  }
  _mediaAvailable(t) {
    return !!(this._config?.demo || this._isAvailable(this._config?.entity) && this._serviceSupported("media_player", t));
  }
  _openPanel(t, e) {
    this._lastFocused = e.currentTarget instanceof HTMLElement ? e.currentTarget : null, this._actionError = null, this._activePanel = t;
  }
  _closePanel() {
    this._activePanel = null;
    const t = this._lastFocused;
    this._lastFocused = null, t?.focus();
  }
  _setPowerActionFeedback(t, e = !1) {
    for (const i of this.renderRoot.querySelectorAll("[data-remote-command='wakeup'], [data-remote-command='suspend']"))
      i.setAttribute("aria-busy", String(t)), i.disabled = t || !this._remoteAvailable(), e ? i.setAttribute("data-interaction-error", "true") : i.removeAttribute("data-interaction-error");
  }
  async _callService(t, e, i, s, r) {
    if (!(!this.hass || !this._serviceSupported(e, i) || r && !this._isAvailable(r) || this._inFlightActions.has(t))) {
      this._inFlightActions.add(t), this._busyAction = t, t === "remote:power" && this._setPowerActionFeedback(!0), this._actionError = null;
      try {
        await S(this.hass, { domain: e, service: i, data: s, target: r ? { entity_id: r } : void 0 });
      } catch {
        this._actionError = "Action failed. Check that the Apple TV is available.", t === "remote:power" && this._setPowerActionFeedback(!0, !0);
      } finally {
        this._inFlightActions.delete(t), this._busyAction === t && (this._busyAction = null), t === "remote:power" && this._setPowerActionFeedback(!1, this._actionError !== null);
      }
    }
  }
  _mediaAction(t) {
    return this._callService(`media:${t}`, "media_player", t, void 0, this._config?.entity);
  }
  _remoteAction(t) {
    return this._callService(`remote:${t === "wakeup" || t === "suspend" ? "power" : t}`, "remote", "send_command", { command: t }, this._remoteEntity());
  }
  async _keyboardAction(t) {
    const e = this._config;
    if (!e?.keyboard_entity || !e.keyboard_config_entry_id || !this._isAvailable(e.keyboard_entity)) return;
    const i = this.renderRoot.querySelector(".keyboard input"), s = { config_entry_id: e.keyboard_config_entry_id };
    if (t === "set_keyboard_text") {
      if (!i?.value.trim()) return;
      s.text = i.value;
    } else i && (i.value = "");
    await this._callService(`keyboard:${t}`, "apple_tv", t, s);
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.entity || "media_player.demo_apple_tv", e = this.hass?.states?.[t], i = e?.attributes || {}, s = e?.state === "playing", r = this._mediaAvailable("toggle"), a = this._config.title || i.friendly_name || "Apple TV", n = e?.state === "unavailable" || e?.state === "unknown" ? "Unavailable" : [s ? "Playing" : e?.state === "off" ? "Off" : "Idle", i.app_name || i.media_title].filter(Boolean).join(" · "), c = Array.isArray(i.source_list) ? i.source_list.length : 0;
    return o`
      <ha-card>
        <div class="apple-card">
          <div class="apple-header">
            <button
              class="icon-well control-radius apple-more-info"
              type="button"
              aria-label="Show ${a} details"
              @click=${() => this.moreInfo(this._config?.entity)}
            ><ha-icon icon=${i.icon || "mdi:apple"}></ha-icon></button>
            <div class="copy-block">
              <div class="label-title">${this.esc(a)}</div>
              <div class="label-sub" role="status">${this.esc(n || "Idle")}</div>
            </div>
            <div class="apple-header-actions">
              <button class="btn-icon-44 ${s ? "on" : ""}" type="button" aria-label="Play or pause" ?disabled=${!this._mediaAvailable("media_play_pause")} @click=${() => void this._mediaAction("media_play_pause")}><ha-icon class="sm" icon="${s ? "mdi:pause" : "mdi:play"}"></ha-icon></button>
              <button class="btn-icon-44" type="button" aria-label="Volume down" ?disabled=${!this._mediaAvailable("volume_down")} @click=${() => void this._mediaAction("volume_down")}><ha-icon class="sm" icon="mdi:volume-minus"></ha-icon></button>
              <button class="btn-icon-44" type="button" aria-label="Volume up" ?disabled=${!this._mediaAvailable("volume_up")} @click=${() => void this._mediaAction("volume_up")}><ha-icon class="sm" icon="mdi:volume-plus"></ha-icon></button>
              <button class="btn-icon-44 ${r ? "on" : ""}" type="button" aria-label="Toggle Apple TV power" aria-pressed=${String(e?.state !== "off")} ?disabled=${!r} @click=${() => void this._mediaAction("toggle")}><ha-icon class="sm" icon="mdi:power"></ha-icon></button>
            </div>
          </div>
          <div class="apple-launchers">
            <button class="btn-action-pill apple-launcher launcher" type="button" @click=${(l) => this._openPanel("remote", l)}>
              <div class="icon-well control-radius apple-launch-icon"><ha-icon class="sm" icon="mdi:remote"></ha-icon></div>
              <div class="copy-block apple-launch-copy"><div class="label-title">Remote</div><div class="label-sub">Navigation</div></div>
            </button>
            <button class="btn-action-pill apple-launcher launcher" type="button" ?disabled=${!r} @click=${(l) => this._openPanel("apps", l)}>
              <div class="icon-well control-radius apple-launch-icon"><ha-icon class="sm" icon="mdi:apps"></ha-icon></div>
              <div class="copy-block apple-launch-copy"><div class="label-title">Apps</div><div class="label-sub">${c ? `${c} available` : "Sources"}</div></div>
            </button>
          </div>
          ${this._actionError ? o`<p class="action-error" role="alert">${this._actionError}</p>` : ""}
        </div>
      </ha-card>
      ${this._activePanel ? this._renderDialog() : ""}
    `;
  }
  _renderDialog() {
    const t = this._activePanel === "remote" ? "Remote" : "Apps";
    return o`<section
      class="dialog-overlay"
      role="presentation"
      @mousedown=${(e) => {
      this._backdropMouseDown = e.target === e.currentTarget;
    }}
      @click=${(e) => {
      e.target === e.currentTarget && this._backdropMouseDown && this._closePanel(), this._backdropMouseDown = !1;
    }}
    >
      <section
        class="dialog-content"
        role="dialog"
        aria-modal="true"
        aria-label=${t}
        @click=${(e) => e.stopPropagation()}
        @mousedown=${(e) => e.stopPropagation()}
        @keydown=${(e) => {
      e.key === "Escape" && (e.stopPropagation(), this._closePanel());
    }}
      >
        <header class="dialog-header">
          <span>${t}</span>
          <button
            data-dialog-close
            class="btn-icon-44"
            type="button"
            aria-label="Close ${t}"
            @click=${this._closePanel}
          >
            <ha-icon class="sm" icon="mdi:close"></ha-icon>
          </button>
        </header>
        <div class="dialog-body">
          ${this._activePanel === "remote" ? this._renderRemote() : this._renderApps()}
        </div>
      </section>
    </section>`;
  }
  _renderRemote() {
    const t = this._remoteAvailable(), e = this._config?.entity || "media_player.demo_apple_tv", s = this.hass?.states?.[e]?.attributes || {}, r = s.volume_level !== void 0 ? Math.round(Number(s.volume_level) * 100) : null, a = [null, "up", null, "left", "select", "right", null, "down", null], n = new Map(qo.map((d) => [d[0], d])), c = !!(this._config?.keyboard_entity && this._config?.keyboard_config_entry_id), l = !!(this._config?.demo || this._config?.keyboard_entity && this._isAvailable(this._config.keyboard_entity) && this.hass?.states?.[this._config.keyboard_entity]?.state === "on");
    return o`<section class="remote" @click=${(d) => d.stopPropagation()} @mousedown=${(d) => d.stopPropagation()}>
      <div class="remote-toolbar">
        <button
          type="button"
          class="remote-power"
          data-remote-command="wakeup"
          data-cmd="wakeup"
          aria-busy=${String(this._busyAction === "remote:power")}
          data-interaction-error=${this._actionError ? "true" : F}
          ?disabled=${!t || this._busyAction === "remote:power"}
          @click=${(d) => {
      d.stopPropagation(), this._remoteAction("wakeup");
    }}
        >
          <ha-icon icon="mdi:power-on"></ha-icon>
          <span>Wake</span>
        </button>
        <button
          type="button"
          class="remote-power"
          data-remote-command="suspend"
          data-cmd="suspend"
          aria-busy=${String(this._busyAction === "remote:power")}
          ?disabled=${!t || this._busyAction === "remote:power"}
          @click=${(d) => {
      d.stopPropagation(), this._remoteAction("suspend");
    }}
        >
          <ha-icon icon="mdi:power-sleep"></ha-icon>
          <span>Sleep</span>
        </button>
        <button
          type="button"
          class="remote-power play-pause"
          ?disabled=${!this._mediaAvailable("media_play_pause")}
          @click=${(d) => {
      d.stopPropagation(), this._mediaAction("media_play_pause");
    }}
        >
          <ha-icon icon="mdi:play-pause"></ha-icon>
          <span>Play/pause</span>
        </button>
      </div>
      ${r !== null ? o`<div class="volume-row" @click=${(d) => d.stopPropagation()} @mousedown=${(d) => d.stopPropagation()}>
            <button
              class="btn-icon-30"
              type="button"
              aria-label="Toggle mute"
              @click=${(d) => {
      d.stopPropagation(), this._callService(
        "media:volume_mute",
        "media_player",
        "volume_mute",
        { is_volume_muted: !s.is_volume_muted },
        this._config?.entity
      );
    }}
            >
              <ha-icon
                icon="${s.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}"
              ></ha-icon>
            </button>
            <input
              type="range"
              min="0"
              max="100"
              .value=${String(r)}
              aria-label="Volume"
              @click=${(d) => d.stopPropagation()}
              @mousedown=${(d) => d.stopPropagation()}
              @change=${(d) => {
      d.stopPropagation();
      const f = Number(d.target.value) / 100;
      this._callService(
        "media:volume_set",
        "media_player",
        "set_volume_level",
        { volume_level: f },
        this._config?.entity
      );
    }}
            />
            <span class="volume-val">${r}%</span>
          </div>` : ""}
      <div
        class="dpad dpad-cluster"
        role="group"
        aria-label="Apple TV directional remote"
        tabindex=${t ? "0" : "-1"}
        @keydown=${(d) => this._handleRemoteKey(d, t)}
      >
        ${a.map((d) => {
      if (!d) return o`<span class="blank" aria-hidden="true"></span>`;
      const [, f, g] = n.get(d);
      return o`<button
            class="dpad-btn ${d === "select" ? "select-center select" : "direction"}"
            data-key=${d}
            type="button"
            aria-label=${f}
            ?disabled=${!t}
            @click=${(h) => {
        h.stopPropagation(), this._remoteAction(d);
      }}
          >
            <ha-icon icon=${g}></ha-icon>
          </button>`;
    })}
      </div>
      <div class="utility">
        ${Uo.map(
      ([d, f, g]) => o`<button
              type="button"
              ?disabled=${!t}
              @click=${(h) => {
        h.stopPropagation(), this._remoteAction(d);
      }}
            >
              <ha-icon icon=${g}></ha-icon>
              <span>${f}</span>
            </button>`
    )}
      </div>
      ${c ? o`<div class="keyboard" @click=${(d) => d.stopPropagation()} @mousedown=${(d) => d.stopPropagation()}>
            <input
              type="text"
              aria-label="Apple TV keyboard text"
              placeholder="Type on Apple TV"
              ?disabled=${!l}
              @keydown=${(d) => {
      d.key === "Enter" && this._keyboardAction("set_keyboard_text");
    }}
            />
            <button
              type="button"
              aria-label="Send keyboard text"
              ?disabled=${!l}
              @click=${(d) => {
      d.stopPropagation(), this._keyboardAction("set_keyboard_text");
    }}
            >
              <ha-icon icon="mdi:keyboard"></ha-icon>
            </button>
            <button
              type="button"
              aria-label="Clear keyboard text"
              ?disabled=${!l}
              @click=${(d) => {
      d.stopPropagation(), this._keyboardAction("clear_keyboard_text");
    }}
            >
              <ha-icon icon="mdi:backspace-outline"></ha-icon>
            </button>
          </div>` : ""}
    </section>`;
  }
  _handleRemoteKey(t, e) {
    if (!e) return;
    const s = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      Enter: "select",
      " ": "select"
    }[t.key];
    s && (t.preventDefault(), this._remoteAction(s));
  }
  _renderApps() {
    const t = this._config?.entity || "media_player.demo_apple_tv", e = this.hass?.states?.[t]?.attributes, i = e?.source_list, s = e?.source, r = Array.isArray(i) ? i.filter((a) => typeof a == "string") : [];
    return r.length ? o`<div class="app-grid" @click=${(a) => a.stopPropagation()} @mousedown=${(a) => a.stopPropagation()}>
          ${r.map(
      (a) => o`<button
                class="app-btn ${a === s ? "active" : ""}"
                type="button"
                aria-pressed=${String(a === s)}
                @click=${(n) => {
        n.stopPropagation(), this._callService(
          `source:${a}`,
          "media_player",
          "select_source",
          { source: a },
          this._config?.entity
        );
      }}
              >
                <ha-icon icon="mdi:play-box-outline"></ha-icon>
                <span>${this.esc(a)}</span>
              </button>`
    )}
        </div>` : o`<p class="empty-copy">
          No app sources are currently exposed by this Apple TV.
        </p>`;
  }
};
Ht.styles = No;
qi([
  x()
], Ht.prototype, "_activePanel", 2);
qi([
  x()
], Ht.prototype, "_actionError", 2);
qi([
  x()
], Ht.prototype, "_busyAction", 2);
Ht = qi([
  k("component-apple-tv-controller-v1")
], Ht);
E({
  type: "component-apple-tv-controller-v1",
  element: Ht,
  name: "Apple TV Controller",
  description: "Apple TV media, remote and source controls with the established dashboard presentation."
});
const jo = [
  P,
  O,
  V,
  qt,
  q,
  St,
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
    .ico,
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
    .ico ha-icon,
    .icon ha-icon {
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
var Fo = Object.defineProperty, Bo = Object.getOwnPropertyDescriptor, Ut = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Bo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Fo(e, i, r), r;
};
let at = class extends A {
  constructor() {
    super(...arguments), this._model = null, this._camera = null, this._confirmId = null, this._busyActionId = null, this._actionError = null, this._confirmTimer = null, this._controlsOpener = null, this._sequence = 0, this._profileListener = (t) => {
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
    this._sequence++, window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._confirmTimer && clearTimeout(this._confirmTimer), super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("hass") && this.hass && this._refresh();
  }
  async _refresh(t = !1) {
    if (!this.hass || !this._config) return;
    const e = ++this._sequence, i = this.hass;
    try {
      const s = await Be(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      if (e !== this._sequence || i !== this.hass) return;
      this._model = s, this._camera = s.cameras.find(
        (r) => r.entityId === this._config?.entity || r.deviceId === this._config?.device_id
      ) || s.cameras[0] || null;
    } catch {
      if (e !== this._sequence || i !== this.hass) return;
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
  _openControls(t) {
    this._controlsOpener = t.currentTarget, this.updateComplete.then(() => {
      const e = this.renderRoot.querySelector("dialog");
      if (!(!e || e.open))
        try {
          e.showModal(), e.querySelector(".close")?.focus();
        } catch {
          this._controlsOpener = null;
        }
    });
  }
  _closeControls() {
    const t = this.renderRoot.querySelector("dialog");
    t?.open && t.close();
  }
  _handleControlsClosed() {
    const t = this._controlsOpener;
    this._controlsOpener = null, t?.focus();
  }
  _askConfirmation(t) {
    this._confirmId = t, this._confirmTimer && clearTimeout(this._confirmTimer), this._confirmTimer = setTimeout(() => {
      this._confirmId = null;
    }, 5e3);
  }
  async _toggleSwitch(t, e) {
    const i = t.entity.entity_id, s = this.hass?.states[i];
    if (!this.hass || !ft(s) || this._busyActionId) return;
    if (e && /^(Recording|Detection|Alerts)$/i.test(t.role || "") && this._confirmId !== i) {
      this._askConfirmation(i);
      return;
    }
    this._confirmId = null, this._confirmTimer && clearTimeout(this._confirmTimer), this._busyActionId = i, this._actionError = null;
    try {
      await S(this.hass, {
        domain: "switch",
        service: e ? "turn_off" : "turn_on",
        target: { entity_id: i }
      }), this._refresh(!0);
    } catch {
      this._actionError = "Action failed. Try again.";
    } finally {
      this._busyActionId = null;
    }
  }
  async _pressAction(t) {
    const e = this.hass?.states[t];
    if (!(!this.hass || !ft(e) || this._busyActionId)) {
      if (this._confirmId !== t) {
        this._askConfirmation(t);
        return;
      }
      this._confirmId = null, this._confirmTimer && clearTimeout(this._confirmTimer), this._busyActionId = t, this._actionError = null;
      try {
        await S(this.hass, {
          domain: "button",
          service: "press",
          target: { entity_id: t }
        }), this._refresh(!0);
      } catch {
        this._actionError = "Action failed. Try again.";
      } finally {
        this._busyActionId = null;
      }
    }
  }
  render() {
    if (!this._config) return o``;
    const t = this._camera, e = this._model?.error || this._model?.profileError, i = t?.name || this._config.title || "Camera", s = this._model?.profileMissing ? `Configure ${this._config.profile || "household-security"}` : e ? "Controls unavailable" : t?.active ? "Activity detected" : t?.online ? "Online" : "Unavailable", r = !!(t && (t.switches.length || t.detections.length || t.actions.length || t.ptz.length));
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
            <span class="state">${this.esc(s)}</span>
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
              ?hidden=${this._config.expanded || !r}
              @click=${this._openControls}
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
        @close=${this._handleControlsClosed}
        @mousedown=${(a) => {
      const n = this.renderRoot.querySelector("dialog");
      if (n && a.target === n) {
        const c = n.getBoundingClientRect();
        c.top <= a.clientY && a.clientY <= c.top + c.height && c.left <= a.clientX && a.clientX <= c.left + c.width || this._closeControls();
      }
    }}
      >
        <div class="sheet" @click=${(a) => a.stopPropagation()} @mousedown=${(a) => a.stopPropagation()}>
          <div class="head">
            <span class="sheet-title">${this.esc(i)} controls</span>
            <button
              class="close"
              type="button"
              aria-label="Close"
              @click=${this._closeControls}
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
      const i = e.entity.entity_id, s = this.hass?.states[i], r = s?.attributes?.entity_picture, a = s?.last_updated, n = a && new Date(a), c = n && Number.isFinite(n.getTime()) ? Ei(this.hass, n, {
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
                          ${r ? o`<img
                                class="classification-image"
                                src="${r}"
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
      const s = this.hass?.states[e.entity_id]?.state === "on";
      return o`
                        <div class="control detection ${s ? "on" : ""}">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.name || e.original_name || "Detection")}</span
                            >
                            <span class="control-state"
                              >${s ? "Detected" : "Clear"}</span
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
      const i = e.entity.entity_id, s = this.hass?.states[i], r = s?.state === "on", a = this._confirmId === i, n = ft(s), c = this._busyActionId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.role || "Control")}</span
                            >
                            <span class="control-state"
                              >${n ? c ? "Working…" : r ? "On" : "Off" : "Unavailable"}</span
                            >
                          </span>
                          <button
                            class="${r ? "on" : ""} ${a ? "confirm" : ""}"
                            type="button"
                            ?disabled=${!n || !!this._busyActionId}
                            aria-busy=${c ? "true" : "false"}
                            @click=${() => this._toggleSwitch(e, r)}
                          >
                            ${c ? "Working…" : a ? "Confirm off" : r ? "On" : "Off"}
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
      const i = e.entity.entity_id, s = this._confirmId === i, r = ft(this.hass?.states[i]), a = this._busyActionId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.entity.name || e.entity.original_name || "Action")}</span
                            >
                            <span class="control-state">${r ? a ? "Working…" : "Available" : "Unavailable"}</span>
                          </span>
                          <button
                            class="${s ? "confirm" : ""}"
                            type="button"
                            ?disabled=${!r || !!this._busyActionId}
                            aria-busy=${a ? "true" : "false"}
                            @click=${() => this._pressAction(i)}
                          >
                            ${a ? "Working…" : s ? "Confirm" : "Run"}
                          </button>
                        </div>
                      `;
    })}
                  </div>
                </section>
              ` : ""}
        ${t.ptz?.length ? o`
                <section class="group">
                  <div class="group-title">PTZ Controls</div>
                  <div class="group-list">
                    ${t.ptz.map((e) => {
      const i = e.entity_id, s = this.hass?.states[i], r = ft(s), a = this._busyActionId === i, n = e.name || e.original_name || "PTZ Control", c = i.split(".")[0];
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name">${this.esc(n)}</span>
                            <span class="control-state">${r ? a ? "Working…" : s?.state || "Available" : "Unavailable"}</span>
                          </span>
                          <button
                            type="button"
                            ?disabled=${!r || !!this._busyActionId}
                            aria-busy=${a ? "true" : "false"}
                            @click=${() => {
        c === "button" ? this._pressAction(i) : this.moreInfo(i);
      }}
                          >
                            <span>${c === "button" ? "Move" : "Adjust"}</span>
                          </button>
                        </div>
                      `;
    })}
                  </div>
                </section>
              ` : ""}
      </div>
      ${this._actionError ? o`<div role="status">${this._actionError}</div>` : ""}
    ` : o`<div>Camera controls are unavailable</div>`;
  }
};
at.stubConfig = { profile: "household-security" };
at.styles = jo;
Ut([
  x()
], at.prototype, "_model", 2);
Ut([
  x()
], at.prototype, "_camera", 2);
Ut([
  x()
], at.prototype, "_confirmId", 2);
Ut([
  x()
], at.prototype, "_busyActionId", 2);
Ut([
  x()
], at.prototype, "_actionError", 2);
at = Ut([
  k("component-camera-controller-v2")
], at);
E({
  type: "component-camera-controller-v2",
  element: at,
  name: "Camera Controller V2",
  description: "Platform-adapted camera controls with explicit state and protected destructive changes."
});
let Xi = class extends at {
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      ...t,
      type: "custom:component-camera-controller-v1"
    });
  }
};
Xi = Ut([
  k("component-camera-controller-v1")
], Xi);
E({
  type: "component-camera-controller-v1",
  element: Xi,
  name: "Camera Controller V1",
  description: "Legacy camera controller adapter registering custom:component-camera-controller-v1."
});
const Vo = [
  P,
  G,
  O,
  V,
  q,
  St,
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
var Wo = Object.defineProperty, Go = Object.getOwnPropertyDescriptor, Ve = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Go(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Wo(e, i, r), r;
};
let $t = class extends A {
  constructor() {
    super(...arguments), this._busy = !1, this._pendingLabel = "", this._message = "", this._messageType = "info", this._messageTimer = null, this._confirmation = null, this._requestGeneration = 0, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.entity)
      throw new Error("A garage-door state entity is required");
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
    const t = this._config?.control_entity;
    if (t) return t;
    const e = this._config?.entity || "", i = e.split(".")[0];
    return ["button", "cover", "lock", "script", "switch"].includes(i) ? e : null;
  }
  _status() {
    const t = this._entityState(this._config?.entity), e = this._entityState(this._controlEntityId()), i = this._entityState(this._config?.availability_entity), s = !!this._config?.availability_entity && (!i || i.state !== "on") || !e || Q(e), r = String(t?.state || "unknown").toLowerCase(), a = r === "on" || r === "off", n = a && r === "off", c = a && r === "on", l = !t || Q(t);
    return {
      state: t,
      control: e,
      controllerUnavailable: s,
      stateUnavailable: l,
      known: a,
      closed: n,
      notClosed: c,
      reed: r
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
    return new Promise((i, s) => {
      const r = setTimeout(() => {
        this._confirmation?.timer === r && (this._confirmation = null, s(new Error("Garage state confirmation timed out")));
      }, e);
      this._confirmation = { expected: t, resolve: i, reject: s, timer: r }, this._checkConfirmation();
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
    let s;
    try {
      s = this._waitForConfirmation(e), s.catch(() => {
      });
      const r = this._controlEntityId();
      if (!r) return;
      const a = r.split(".")[0];
      if (a === "cover" ? await S(this.hass, { domain: "cover", service: "toggle", target: { entity_id: r } }) : a === "switch" ? await S(this.hass, { domain: "switch", service: "toggle", target: { entity_id: r } }) : a === "button" ? await S(this.hass, { domain: "button", service: "press", target: { entity_id: r } }) : a === "script" ? await S(this.hass, { domain: "script", service: "turn_on", target: { entity_id: r } }) : await S(this.hass, { domain: "homeassistant", service: "toggle", target: { entity_id: r } }), i !== this._requestGeneration) return;
      this._pendingLabel = e === "on" ? "Opening" : e === "off" ? "Closing" : "Waiting";
      const n = await s;
      if (i !== this._requestGeneration) return;
      this._setMessage(
        n === "off" ? "Closed confirmed." : n === "on" ? "Door movement confirmed." : "Garage state confirmed."
      );
    } catch (r) {
      if (i !== this._requestGeneration) return;
      this._cancelConfirmation(
        r instanceof Error ? r : new Error("Garage command failed")
      );
      const a = String(r?.message || "");
      this._setMessage(
        a.includes("timed out") ? "The command was sent, but the door state was not confirmed." : "The garage-door command failed.",
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
      T(t, {
        primary: () => this.moreInfo(this._config?.entity),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    ), e && this._interactionHandles.push(
      T(e, {
        primary: () => this._requestAction(),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._status(), i = (t.state?.attributes?.friendly_name || "").replace(/\s*Garage Door Status$/i, "").trim(), s = this._config.title || i || "Garage door", r = t.controllerUnavailable ? "Controller unavailable" : t.closed ? "Closed" : t.notClosed ? "Not closed" : t.stateUnavailable ? "Door state unavailable" : "Door state unknown", a = t.closed ? "Open" : "Trigger", n = t.controllerUnavailable || this._busy;
    return o`
      <ha-card>
        <div class="w">
          <div class="row">
            <button
              class="identity"
              type="button"
              aria-label="Open details for ${this.esc(s)}"
            >
              <span class="well ${t.notClosed ? "not-closed" : ""}">
                <ha-icon
                  icon="${t.controllerUnavailable || !t.known ? "mdi:garage-alert" : t.notClosed ? "mdi:garage-open" : "mdi:garage"}"
                ></ha-icon>
              </span>
              <span class="copy">
                <span class="name">${this.esc(s)}</span>
                <span class="state" role="status" aria-live="polite"
                  >${this.esc(r)}</span
                >
              </span>
            </button>
            <button
              class="action ${this._busy ? "pending" : ""}"
              type="button"
              ?disabled=${n}
              aria-disabled="${String(n)}"
              aria-label="${t.controllerUnavailable ? "Garage door controller unavailable" : this._busy ? `${this._pendingLabel || "Waiting for"} garage door state confirmation` : t.closed ? "Open garage door" : "Trigger garage door operator"}"
            >
              <ha-icon
                icon="${this._busy ? "mdi:progress-clock" : t.closed ? "mdi:garage-open" : "mdi:gesture-tap-button"}"
              ></ha-icon>
              <span
                >${this.esc(this._busy ? this._pendingLabel || "Waiting" : a)}</span
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
$t.styles = Vo;
Ve([
  x()
], $t.prototype, "_busy", 2);
Ve([
  x()
], $t.prototype, "_pendingLabel", 2);
Ve([
  x()
], $t.prototype, "_message", 2);
Ve([
  x()
], $t.prototype, "_messageType", 2);
$t = Ve([
  k("component-garage-door-controller-v1")
], $t);
E({
  type: "component-garage-door-controller-v1",
  element: $t,
  name: "Garage Door Controller",
  description: "A garage-door controller for a closed-position reed sensor and momentary operator trigger."
});
const Ko = [
  P,
  G,
  O,
  V,
  qt,
  q,
  je,
  Fe,
  St,
  ut,
  y`
    ha-card {
      container-type: inline-size;
    }

    .split-card {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .split-toolbar {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 44px 44px 44px;
      gap: 8px;
      align-items: center;
    }

    .split-identity {
      min-width: 0;
      min-height: 44px;
      padding: 0;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
      text-align: left;
    }

    .split-identity .label-title,
    .split-identity .label-sub {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .split-climate-row {
      display: grid;
      grid-template-columns: minmax(120px, 1fr) auto;
      align-items: center;
      gap: 16px;
    }

    .room-temperature {
      display: block;
      margin-top: 4px;
    }

    .split-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .action-label {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* The Split secondary panels pre-date the native-dialog component, but
     * intentionally use the same catalogue dialog shell, head and body parts.
     */
    .pn {
      position: fixed;
      inset: 0;
      z-index: 1000;
      display: grid;
      place-items: center;
      padding: 16px;
      background: var(--dashboard-modal-scrim);
    }

    .pd {
      width: min(440px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      overflow: auto;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--card-background-color);
      box-shadow: var(--dashboard-dialog-shadow);
      color: var(--primary-text-color);
    }

    .ph {
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--divider-color);
      font-size: 15px;
      font-weight: 650;
    }

    .pt {
      margin: 0;
      font: inherit;
    }

    .x {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      color: var(--secondary-text-color);
    }

    .x:hover {
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }

    .pb {
      padding: 16px;
      color: var(--secondary-text-color);
      font-size: 13px;
    }

    .og + .og {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }

    .gt {
      margin: 0 4px 8px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      font-weight: 650;
      letter-spacing: 0.04em;
      text-transform: uppercase;
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
      display: grid;
      grid-template-columns: 20px minmax(0, 1fr) 20px;
      align-items: center;
      gap: 8px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 600;
      text-align: left;
      --action-glow-color: var(--primary-color, #03a9f4);
      transition:
        transform 0.15s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.25s ease,
        color 0.2s ease;
    }

    .o:hover {
      background: var(--dashboard-card-muted-surface);
    }

    .o:active {
      border-color: var(--action-glow-color) !important;
      box-shadow: 0 0 0 1px var(--action-glow-color),
                  0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.97);
    }

    .o[aria-selected="true"] {
      border-color: var(--primary-color);
      background: var(--dashboard-active-surface);
      color: var(--primary-color);
    }

    .oi {
      color: currentColor;
    }

    .tpr,
    .tac {
      display: grid;
      gap: 8px;
    }

    .tpr {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .tac {
      grid-template-columns: 1fr;
      margin-top: 12px;
    }

    .tpr button,
    .tac button {
      min-height: 44px;
      padding: 0 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--primary-color);
      font-size: 13px;
      font-weight: 650;
      --action-glow-color: var(--primary-color, #03a9f4);
      transition:
        transform 0.15s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.25s ease,
        color 0.2s ease;
    }

    .tpr button {
      --action-glow-color: var(--warning-color, #ff9800);
    }

    .tpr button:hover,
    .tac button:hover {
      background: var(--dashboard-card-muted-surface);
    }

    .tpr button:active,
    .tac button:active {
      border-color: var(--action-glow-color) !important;
      box-shadow: 0 0 0 1px var(--action-glow-color),
                  0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.97);
    }

    .tac button {
      color: var(--error-color);
      --action-glow-color: var(--error-color, #f44336);
    }

    .fb {
      margin: 0 0 12px;
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.35;
    }

    @container (max-width: 400px) {
      .split-actions .btn-action-pill {
        flex-basis: calc(50% - 4px);
      }
    }

    @container (max-width: 340px) {
      .split-toolbar {
        grid-template-columns: repeat(3, 44px);
        justify-content: end;
      }

      .split-identity {
        grid-column: 1 / -1;
      }

      .split-climate-row {
        grid-template-columns: 1fr;
      }

      .stepper-control {
        width: 100%;
      }
    }
  `
];
var Yo = Object.defineProperty, Qo = Object.getOwnPropertyDescriptor, Cs = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Qo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Yo(e, i, r), r;
};
const Z = (t) => !t || ["unknown", "unavailable"].includes(t.state), lt = (t) => {
  const e = String(t || "");
  if (!e) return "";
  const i = {
    "1_up": "1 (Up)",
    "2_up_middle": "2 (Up Mid)",
    "3_middle": "3 (Middle)",
    "4_down_middle": "4 (Down Mid)",
    "5_down": "5 (Down)",
    "1_left": "1 (Left)",
    "2_left_center": "2 (Left Mid)",
    "3_center": "3 (Center)",
    "4_right_center": "4 (Right Mid)",
    "5_right": "5 (Right)",
    left_right: "Split (Left/Right)",
    fan_only: "Fan",
    heat_cool: "Auto"
  }, s = e.toLowerCase();
  return i[s] ? i[s] : e.replaceAll("_", " ").split(" ").map((r) => r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()).join(" ");
}, Yt = (t) => Number.isFinite(Number(t)) ? Number(t).toFixed(Number(t) % 1 ? 1 : 0) + "°" : "—", ri = /* @__PURE__ */ new Map(), qr = (t) => `ha_split_resume_${t}`, Zo = (t) => {
  if (ri.has(t))
    return ri.get(t);
  try {
    const e = typeof localStorage < "u" ? localStorage.getItem(qr(t)) : null;
    if (e) {
      const i = JSON.parse(e);
      if (i && typeof i.hvacMode == "string")
        return ri.set(t, i), i;
    }
  } catch {
  }
  return null;
}, Jo = (t, e) => {
  ri.set(t, e);
  try {
    typeof localStorage < "u" && localStorage.setItem(qr(t), JSON.stringify(e));
  } catch {
  }
};
let he = class extends A {
  constructor() {
    super(...arguments), this._activePanel = null, this._optimisticTemp = null, this._interactionHandles = [], this._tempCoalescer = null, this._lastFocused = null, this._backdropMouseDown = !1;
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
    return this.hass ? S(this.hass, { domain: t, service: e, data: i }) : void 0;
  }
  updated(t) {
    super.updated(t), this._captureActiveState();
  }
  _captureActiveState() {
    if (!this._config?.entity) return;
    const t = this._state();
    if (!t || Z(t) || t.state === "off") return;
    const e = t.attributes || {}, i = this._vanes().find((a) => a.axis === "Vertical"), s = this._vanes().find((a) => a.axis === "Horizontal"), r = {
      hvacMode: t.state,
      temperature: Number.isFinite(Number(e.temperature)) ? Number(e.temperature) : void 0,
      fanMode: e.fan_mode ? String(e.fan_mode) : void 0,
      swingMode: e.swing_mode ? String(e.swing_mode) : void 0,
      swingHorizontalMode: e.swing_horizontal_mode ? String(e.swing_horizontal_mode) : void 0,
      verticalVaneOption: i?.entity ? i.current : void 0,
      horizontalVaneOption: s?.entity ? s.current : void 0,
      updatedAt: Date.now()
    };
    Jo(this._config.entity, r);
  }
  async _power() {
    if (!this._config?.entity || !this.hass) return;
    const t = this._state();
    if (!t || Z(t)) return;
    if (t.state === "off") {
      const i = Zo(this._config.entity), s = t.attributes?.hvac_modes || [], r = i?.hvacMode && s.includes(i.hvacMode) && i.hvacMode !== "off" ? i.hvacMode : s.includes("cool") ? "cool" : s.includes("heat") ? "heat" : s.find((a) => a !== "off") || "cool";
      try {
        await S(this.hass, {
          domain: "climate",
          service: "set_hvac_mode",
          data: { hvac_mode: r },
          target: { entity_id: this._config.entity }
        });
      } catch {
        await S(this.hass, {
          domain: "climate",
          service: "turn_on",
          target: { entity_id: this._config.entity }
        });
      }
      if (i?.temperature && Number.isFinite(i.temperature))
        try {
          await S(this.hass, {
            domain: "climate",
            service: "set_temperature",
            data: { temperature: i.temperature },
            target: { entity_id: this._config.entity }
          });
        } catch {
        }
      if (i?.fanMode && Array.isArray(t.attributes?.fan_modes) && t.attributes.fan_modes.includes(i.fanMode))
        try {
          await S(this.hass, {
            domain: "climate",
            service: "set_fan_mode",
            data: { fan_mode: i.fanMode },
            target: { entity_id: this._config.entity }
          });
        } catch {
        }
      if (i?.swingMode && Array.isArray(t.attributes?.swing_modes) && t.attributes.swing_modes.includes(i.swingMode))
        try {
          await S(this.hass, {
            domain: "climate",
            service: "set_swing_mode",
            data: { swing_mode: i.swingMode },
            target: { entity_id: this._config.entity }
          });
        } catch {
        }
    } else {
      this._captureActiveState();
      try {
        await S(this.hass, {
          domain: "climate",
          service: "set_hvac_mode",
          data: { hvac_mode: "off" },
          target: { entity_id: this._config.entity }
        });
      } catch {
        await S(this.hass, {
          domain: "climate",
          service: "turn_off",
          target: { entity_id: this._config.entity }
        });
      }
    }
  }
  _getTempCoalescer() {
    return this._tempCoalescer ? this._tempCoalescer : (this._tempCoalescer = ps(
      async (t) => {
        !this._config?.entity || !this.hass || (await S(this.hass, {
          domain: "climate",
          service: "set_temperature",
          data: { temperature: t },
          target: { entity_id: this._config.entity }
        }), await Pe(
          this.hass,
          this._config.entity,
          (e, i) => {
            const s = Number(i?.attributes?.temperature);
            return Number.isFinite(s) && Math.abs(s - t) <= 0.1;
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
    const e = this._state()?.attributes || {}, i = Number(e.temperature), s = this._optimisticTemp ?? (Number.isFinite(i) ? i : 21), r = Number(e.target_temp_step || e.step) || 0.5, a = Number(e.min_temp) || 16, n = Number(e.max_temp) || 31, c = Math.min(n, Math.max(a, Number((s + t * r).toFixed(1))));
    this._optimisticTemp = c, this._getTempCoalescer().request(c);
  }
  _vanes() {
    const t = [], i = this._state()?.attributes || {}, s = this._config?.entity?.replace(/^climate\./, "") || "", r = this._config?.vertical_vane_entity || this._config?.vertical_vane || (this.hass?.states?.[`select.${s}_vertical_vane`] ? `select.${s}_vertical_vane` : void 0) || (this.hass?.states?.[`select.${s}_vane_vertical`] ? `select.${s}_vane_vertical` : void 0), a = this._config?.horizontal_vane_entity || this._config?.horizontal_vane || (this.hass?.states?.[`select.${s}_horizontal_vane`] ? `select.${s}_horizontal_vane` : void 0) || (this.hass?.states?.[`select.${s}_vane_horizontal`] ? `select.${s}_vane_horizontal` : void 0);
    if (r) {
      const n = this._state(r);
      n && !Z(n) && t.push({
        axis: "Vertical",
        entity: r,
        state: n,
        options: n.attributes?.options || [],
        current: n.state
      });
    }
    if (a) {
      const n = this._state(a);
      n && !Z(n) && t.push({
        axis: "Horizontal",
        entity: a,
        state: n,
        options: n.attributes?.options || [],
        current: n.state
      });
    }
    return !t.some((n) => n.axis === "Vertical") && Array.isArray(i.swing_modes) && i.swing_modes.length > 0 && t.push({
      axis: "Vertical",
      isClimateSwing: !0,
      options: i.swing_modes,
      current: String(i.swing_mode || "off")
    }), !t.some((n) => n.axis === "Horizontal") && Array.isArray(i.swing_horizontal_modes) && i.swing_horizontal_modes.length > 0 && t.push({
      axis: "Horizontal",
      isClimateHorizontalSwing: !0,
      options: i.swing_horizontal_modes,
      current: String(i.swing_horizontal_mode || "off")
    }), t;
  }
  _closeOverlay() {
    this._activePanel = null;
    const t = this._lastFocused;
    this._lastFocused = null, t?.focus();
  }
  _openPanel(t) {
    const e = this.renderRoot.querySelector(":focus");
    this._lastFocused = e instanceof HTMLElement ? e : null, this._activePanel = t, this.updateComplete.then(
      () => this.renderRoot.querySelector(".pn [data-dialog-close]")?.focus()
    );
  }
  disconnectedCallback() {
    this._tempCoalescer?.destroy(), this._tempCoalescer = null, this._optimisticTemp = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._state(), e = t?.attributes || {}, i = t && !Z(t) && t.state !== "off", s = this._state(this._config.timer_entity), a = this._vanes().map((h) => `${h.axis.slice(0, 1)} ${lt(h.current)}`).join(" · "), n = this._config.title || e.friendly_name || "Split system", c = Z(t) ? "Unavailable" : i ? lt(t?.state) : e.current_temperature !== void 0 ? `Off · ${Yt(e.current_temperature)}` : "Off", l = this._optimisticTemp ?? e.temperature, d = {
      cool: "mdi:snowflake",
      heat: "mdi:fire",
      dry: "mdi:water-percent",
      fan_only: "mdi:fan",
      auto: "mdi:thermostat-auto",
      off: "mdi:power"
    }, f = String(t?.state || "off").toLowerCase(), g = d[f] || "mdi:thermostat";
    return o`
      <ha-card>
        <div class="split-card">
          <div class="split-toolbar">
            <button
              class="split-identity"
              type="button"
              @click=${() => this.moreInfo(this._config?.entity)}
            >
              <span class="icon-well"><ha-icon icon="${g}"></ha-icon></span>
              <span class="copy-block">
                <span class="label-title">${this.esc(n)}</span>
                <span class="label-sub" role="status">${this.esc(c)}</span>
              </span>
            </button>
            <button
              class="btn-icon-44"
              type="button"
              aria-label="Profiles"
              ?disabled=${Z(t)}
              @click=${() => this._openPanel("settings")}
            >
              <ha-icon icon="mdi:account-circle-outline"></ha-icon>
            </button>
            <button
              class="btn-icon-44"
              type="button"
              aria-label="Advanced settings"
              ?disabled=${Z(t)}
              @click=${() => this._openPanel("settings")}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            <button
              class="btn-icon-44 power-btn ${i ? "on" : ""}"
              type="button"
              aria-label="Toggle split system power"
              ?disabled=${Z(t)}
              aria-pressed="${String(i)}"
              @click=${() => this._power()}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>

          ${i ? o`
                  <div class="card-divider-line"></div>

                  <div class="split-climate-row">
                    <div>
                      <span class="kpi-metric-lg"
                        >${Yt(e.current_temperature)}</span
                      >
                      <span class="label-sub room-temperature">Room temperature</span>
                    </div>
                    <div class="stepper-control">
                      <button
                        class="stepper-step-btn decrease"
                        type="button"
                        aria-label="Decrease target temperature"
                        ?disabled=${!i}
                        aria-disabled="${String(!i)}"
                        @click=${() => this._temperature(-1)}
                      >
                        <ha-icon icon="mdi:minus"></ha-icon>
                      </button>
                      <div class="stepper-display">
                        <div class="stepper-main-val">${Yt(l)}</div>
                        <div class="stepper-sub-lbl">Target</div>
                      </div>
                      <button
                        class="stepper-step-btn increase"
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

                  <div class="split-actions">
                    <button
                      class="btn-action-pill action-pill ${i ? "active" : ""}"
                      type="button"
                      data-panel="mode"
                      aria-expanded="${String(this._activePanel === "mode")}"
                      aria-label="HVAC mode: ${lt(t?.state)}"
                      ?disabled=${Z(t)}
                      @click=${() => this._openPanel("mode")}
                    >
                      <ha-icon icon="${g}"></ha-icon>
                      <span class="action-label">Mode · ${lt(t?.state)}</span>
                    </button>
                    <button
                      class="btn-action-pill action-pill"
                      type="button"
                      data-panel="fan"
                      aria-expanded="${String(this._activePanel === "fan")}"
                      aria-label="Fan speed: ${lt(e.fan_mode)}"
                      ?disabled=${Z(t)}
                      @click=${() => this._openPanel("fan")}
                    >
                      <ha-icon icon="mdi:fan"></ha-icon>
                      <span class="action-label">Fan · ${lt(e.fan_mode)}</span>
                    </button>
                    ${a ? o`
                            <button
                              class="btn-action-pill action-pill"
                              type="button"
                              data-panel="vanes"
                              aria-expanded="${String(this._activePanel === "vanes")}"
                              aria-label="Vanes: ${a}"
                              ?disabled=${Z(t)}
                              @click=${() => this._openPanel("vanes")}
                            >
                              <ha-icon icon="mdi:swap-vertical"></ha-icon>
                              <span class="action-label">Vanes · ${this.esc(a)}</span>
                            </button>
                          ` : ""}
                    ${this._config.timer_entity ? o`
                            <button
                              class="btn-action-pill action-pill ${s?.state === "active" ? "active" : ""}"
                              type="button"
                              data-panel="timer"
                              aria-expanded="${String(this._activePanel === "timer")}"
                              aria-label="Off timer: ${s?.state === "active" ? "Active" : "Off"}"
                              ?disabled=${Z(t) || Z(s)}
                              @click=${() => this._openPanel("timer")}
                            >
                              <ha-icon icon="mdi:timer-outline"></ha-icon>
                              <span class="action-label"
                                >${s?.state === "active" ? "Timer · Active" : "Timer"}</span
                              >
                            </button>
                          ` : ""}
                  </div>
                ` : ""}
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
        @mousedown=${(i) => {
      this._backdropMouseDown = i.target === i.currentTarget;
    }}
        @keydown=${(i) => {
      i.key === "Escape" && (i.stopPropagation(), this._closeOverlay());
    }}
        @click=${(i) => {
      i.target === i.currentTarget && this._backdropMouseDown && this._closeOverlay(), this._backdropMouseDown = !1;
    }}
      >
        <div class="pd" @click=${(i) => i.stopPropagation()} @mousedown=${(i) => i.stopPropagation()}>
          <div class="ph">
            <h3 class="pt">${e}</h3>
            <button
              class="x"
              data-dialog-close
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
                @click=${(l) => {
          l.stopPropagation(), this._call("climate", "set_hvac_mode", {
            entity_id: this._config?.entity,
            hvac_mode: c
          });
        }}
              >
                <span><ha-icon icon="${i[c] || "mdi:thermostat"}"></ha-icon></span>
                <span>${lt(c)}</span>
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
                @click=${(l) => {
          l.stopPropagation(), this._call("climate", "set_fan_mode", {
            entity_id: this._config?.entity,
            fan_mode: c
          });
        }}
              >
                <span><ha-icon icon="mdi:fan"></ha-icon></span>
                <span>${lt(c)}</span>
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
                ${c.options.map(
          (l) => o`
                    <button
                      class="o choice"
                      type="button"
                      aria-selected="${String(l === c.current)}"
                      @click=${(d) => {
            d.stopPropagation(), c.isClimateSwing ? this._call("climate", "set_swing_mode", {
              entity_id: this._config?.entity,
              swing_mode: l
            }) : c.isClimateHorizontalSwing ? this._call("climate", "set_swing_horizontal_mode", {
              entity_id: this._config?.entity,
              swing_horizontal_mode: l
            }) : c.entity && this._call("select", "select_option", {
              entity_id: c.entity,
              option: l
            });
          }}
                    >
                      <span><ha-icon icon="mdi:swap-vertical"></ha-icon></span>
                      <span>${lt(l)}</span>
                      <span class="oi">${l === c.current ? o`<ha-icon icon="mdi:check"></ha-icon>` : ""}</span>
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
                @click=${(l) => {
          l.stopPropagation(), this._call("timer", "start", {
            entity_id: this._config?.timer_entity,
            duration: c
          });
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
            @click=${(n) => {
        n.stopPropagation(), this._call("timer", "cancel", {
          entity_id: this._config?.timer_entity
        });
      }}
          >
            Cancel timer
          </button>
        </div>
      `;
    const s = Number(e.min_temp), r = Number(e.max_temp), a = Number(e.target_temp_step) || 0.5;
    return o`
      <p class="fb">
        Native Home Assistant controls · ${Yt(s)}–${Yt(r)}
        · ${Yt(a)} steps
      </p>
      <div class="qs og">
        ${this._vanes().length ? o`
                <button
                  class="o"
                  type="button"
                  @click=${(n) => {
      n.stopPropagation(), this._openPanel("vanes");
    }}
                >
                  <span><ha-icon icon="mdi:swap-vertical"></ha-icon></span>
                  <span>Vane settings</span>
                  <span class="oi"><ha-icon icon="mdi:chevron-right"></ha-icon></span>
                </button>
              ` : ""}
        ${this._config?.timer_entity ? o`
                <button
                  class="o"
                  type="button"
                  @click=${(n) => {
      n.stopPropagation(), this._openPanel("timer");
    }}
                >
                  <span><ha-icon icon="mdi:timer-outline"></ha-icon></span>
                  <span>Off timer</span>
                  <span class="oi"><ha-icon icon="mdi:chevron-right"></ha-icon></span>
                </button>
              ` : ""}
      </div>
      ${Array.isArray(e.preset_modes) && e.preset_modes.length > 0 ? o`
              <div class="og">
                <p class="fb" style="margin-bottom: 6px; font-weight: 600;">Preset mode</p>
                <div class="qs choices">
                  ${e.preset_modes.map(
      (n) => o`
                      <button
                        class="o choice"
                        type="button"
                        aria-selected="${String(n === e.preset_mode)}"
                        @click=${(c) => {
        c.stopPropagation(), this._call("climate", "set_preset_mode", {
          entity_id: this._config?.entity,
          preset_mode: n
        });
      }}
                      >
                        <span><ha-icon icon="mdi:tune"></ha-icon></span>
                        <span>${lt(n)}</span>
                        <span class="oi">${n === e.preset_mode ? o`<ha-icon icon="mdi:check"></ha-icon>` : ""}</span>
                      </button>
                    `
    )}
                </div>
              </div>
            ` : ""}
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
              @click=${(d) => {
        d.stopPropagation();
        const [f] = c.split(".");
        this._call(f, "turn_on", { entity_id: c });
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
he.styles = Ko;
Cs([
  x()
], he.prototype, "_activePanel", 2);
Cs([
  x()
], he.prototype, "_optimisticTemp", 2);
he = Cs([
  k("component-split-controller-v4")
], he);
E({
  type: "component-split-controller-v4",
  element: he,
  name: "Split-System Controller",
  description: "Direct Home Assistant climate controls with the established Split System presentation."
});
const Xo = [
  P,
  G,
  O,
  V,
  qt,
  q,
  _r,
  je,
  Fe,
  St,
  ms,
  ut,
  y`
    .wled-card {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .wled-toolbar {
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr) 44px;
      align-items: center;
      gap: 12px;
    }

    .identity {
      min-width: 0;
      min-height: 44px;
      padding: 0;
      display: block;
      text-align: left;
    }

    .identity .label-title,
    .identity .label-sub {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .power.on {
      color: var(--primary-color);
      background: var(--dashboard-active-surface);
      --action-glow-color: var(--error-color, #f44336);
    }

    .power:not(.on) {
      --action-glow-color: var(--success-color, #4caf50);
    }

    .preset-btn {
      --action-glow-color: var(--warning-color, #ff9800);
    }

    .preset-btn:active:not(:disabled) {
      border-color: var(--action-glow-color) !important;
      box-shadow: 0 0 0 1px var(--action-glow-color),
                  0 0 12px 2.5px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.97);
    }

    .brightness-control {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 8px 12px;
      align-items: center;
    }

    .brightness-control input,
    .fine-card input {
      width: 100%;
      height: 6px;
      accent-color: var(--primary-color);
      cursor: pointer;
    }

    .brightness-control input {
      grid-column: 1 / -1;
    }

    .brightness-value {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 12px;
      font-variant-numeric: tabular-nums;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .actions .action {
      flex: 1 1 110px;
    }

    .section + .section,
    .native {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }

    .section-title {
      margin-bottom: 8px;
      color: var(--secondary-text-color);
      font-size: 11.5px;
      font-weight: 650;
      letter-spacing: 0.04em;
      line-height: 1.25;
      text-transform: uppercase;
    }

    .preset-grid,
    .fields,
    .fine {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .preset-btn {
      width: 100%;
      flex: initial;
    }

    .preset-btn.active {
      color: var(--primary-color);
      background: var(--dashboard-active-surface);
    }

    .field {
      display: grid;
      gap: 6px;
      min-width: 0;
      color: var(--secondary-text-color);
      font-size: 12.5px;
    }

    .field select {
      min-width: 0;
    }

    .fine-card {
      min-width: 0;
      padding: 12px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      color: var(--primary-text-color);
    }

    .fine-head {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 10px;
      font-size: 12.5px;
      font-weight: 600;
    }

    .fine-head output {
      color: var(--secondary-text-color);
      font-variant-numeric: tabular-nums;
    }

    .native .action {
      width: 100%;
      justify-content: flex-start;
      padding: 0 12px;
    }

    dialog {
      width: min(440px, calc(100vw - 32px));
    }

    dialog .close {
      border: var(--dashboard-card-border);
    }

    @container (max-width: 360px) {
      .preset-grid,
      .fields,
      .fine {
        grid-template-columns: 1fr;
      }
    }
  `
];
var tc = Object.defineProperty, ec = Object.getOwnPropertyDescriptor, jt = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ec(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && tc(e, i, r), r;
};
let ht = class extends A {
  constructor() {
    super(...arguments), this._registries = null, this._bundle = null, this._brightnessIntent = null, this._speedIntent = null, this._intensityIntent = null, this._unsubRegistry = null, this._registryHass = null, this._brightnessCoalescer = null, this._dialogOpener = null, this._actionError = null, this._handleDialogClosed = () => {
      const t = this._dialogOpener;
      this._dialogOpener = null, t?.focus();
    };
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
    if (!this.hass) return;
    const t = this.hass;
    W.load(t).then((e) => {
      this.hass === t && (this._registries = e, this._bundle = this._resolveBundle());
    });
  }
  _bindRegistry() {
    if (!this.hass || this._registryHass === this.hass && this._unsubRegistry) return;
    this._unsubRegistry?.(), this._unsubRegistry = null, this._registryHass = this.hass, this._registries = null, this._bundle = null;
    const t = this.hass;
    this._unsubRegistry = W.subscribe(t, (e) => {
      this.hass === t && (this._registries = e, this._bundle = this._resolveBundle());
    });
  }
  connectedCallback() {
    super.connectedCallback(), this._bindRegistry();
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._registryHass = null, this._brightnessCoalescer?.destroy(), this._brightnessCoalescer = null, this._brightnessIntent = null, super.disconnectedCallback();
  }
  willUpdate() {
    this.isConnected && this._bindRegistry(), !this._bundle && this.hass && this._registries && (this._bundle = this._resolveBundle());
  }
  _resolveBundle() {
    if (!this._config?.entity || !this.hass) return null;
    const e = (this._registries?.entities || []).find((v) => v.entity_id === this._config.entity), i = this._config.device_id || e?.device_id, r = ((i ? this._registries?.byDevice?.get(i) : []) || []).filter(
      (v) => v?.platform === "wled" && !v.disabled_by && this.hass?.states[v.entity_id]
    ), a = r.filter((v) => Qi(v.entity_id) === "light"), n = a.find((v) => v.entity_id === this._config.entity) || a.find((v) => Hr(v) === "main") || a[0], c = a.filter(
      (v) => Array.isArray(this.hass?.states[v.entity_id]?.attributes?.effect_list)
    ), l = r.filter(
      (v) => Qi(v.entity_id) === "select"
    ), d = r.filter(
      (v) => Qi(v.entity_id) === "number"
    ), f = (v, D) => D.test(`${v.entity_id} ${v.original_name || ""} ${v.name || ""}`), g = l.find((v) => f(v, /\bpreset\b/i)), h = l.filter(
      (v) => f(v, /color.?palette|colour.?palette/i)
    ), u = d.filter((v) => f(v, /\bspeed\b/i)), p = d.filter((v) => f(v, /\bintensity\b/i)), _ = this._registries?.devices?.find((v) => v.id === i), m = n?.entity_id || this._config.entity, b = c.length ? c.map((v) => v.entity_id) : this.hass.states[m]?.attributes?.effect_list ? [m] : [], $ = _?.name_by_user || _?.name || this.hass?.states[m]?.attributes?.friendly_name || "WLED";
    return {
      deviceId: i || void 0,
      deviceName: $,
      main: m,
      effectLights: b,
      preset: g?.entity_id || null,
      palettes: h.map((v) => v.entity_id),
      speeds: u.map((v) => v.entity_id),
      intensities: p.map((v) => v.entity_id)
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
    await S(this.hass, {
      domain: "light",
      service: "toggle",
      target: { entity_id: t }
    }), await Pe(
      () => this.hass,
      t,
      (s) => s === (i ? "off" : "on"),
      { timeout: 5e3 }
    );
  }
  _getBrightnessCoalescer() {
    return this._brightnessCoalescer ? this._brightnessCoalescer : (this._brightnessCoalescer = ps(
      async (t) => {
        const e = this._bundle?.main;
        !e || !this.hass || (t <= 0 ? await S(this.hass, {
          domain: "light",
          service: "turn_off",
          target: { entity_id: e }
        }) : await S(this.hass, {
          domain: "light",
          service: "turn_on",
          data: { brightness: t },
          target: { entity_id: e }
        }), await Pe(
          () => this.hass,
          e,
          (i, s) => t <= 0 ? i === "off" : i === "on" && Math.abs(Number(s?.attributes?.brightness ?? -999) - t) <= 2,
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
    const i = t.map((s) => e(this.hass.states[s])).filter(
      (s) => s != null && !ir.has(String(s).toLowerCase())
    );
    return i.length ? i.every((s) => String(s) === String(i[0])) ? String(i[0]) : "Mixed" : null;
  }
  async _call(t, e, i, s = {}) {
    const r = [...new Set((i || []).filter(Boolean))];
    !this.hass || !r.length || await Promise.all(
      r.map(
        (a) => S(this.hass, {
          domain: t,
          service: e,
          data: s,
          target: { entity_id: a }
        })
      )
    );
  }
  _openAdvanced(t = !1, e) {
    const i = this.renderRoot.querySelector(
      "dialog"
    ), s = this._bundle || this._resolveBundle();
    if (!i || !s) return;
    const r = this.hass?.states?.[s.main];
    if (String(r?.state || "unavailable").toLowerCase() === "on") {
      if (this._dialogOpener = e?.currentTarget instanceof HTMLElement ? e.currentTarget : this._dialogOpener, !i.open)
        try {
          i.showModal();
        } catch {
          this._dialogOpener = null;
          return;
        }
      queueMicrotask(() => {
        t ? this.renderRoot.querySelector(".presets-section")?.scrollIntoView({ block: "start" }) : this.renderRoot.querySelector(".close")?.focus();
      });
    }
  }
  _closeDialog() {
    const t = this.renderRoot.querySelector(
      "dialog"
    );
    t?.open && t.close();
  }
  async _runAction(t) {
    this._actionError = null;
    try {
      await t();
    } catch {
      this._actionError = "Action failed. Check that the WLED device is available.";
    }
  }
  render() {
    if (!this._config || !this.hass) return o``;
    const t = this._bundle || this._resolveBundle();
    if (!t)
      return o`
        <ha-card>
          <div class="wled-card">
            <div class="wled-toolbar" aria-busy="true">
              <div class="icon-well control-radius">
                <ha-icon icon="mdi:led-strip-variant"></ha-icon>
              </div>
              <div class="copy-block">
                <div class="label-title">Loading WLED</div>
                <div class="label-sub" role="status">Loading…</div>
              </div>
            </div>
          </div>
        </ha-card>
      `;
    const e = this.hass.states[t.main], i = String(e?.state || "unavailable").toLowerCase(), s = i === "on", r = i === "on" || i === "off", a = s ? Number(e?.attributes?.brightness ?? 0) : 0, n = this._brightnessIntent ?? a, c = this._same(
      t.effectLights,
      (w) => w?.attributes?.effect
    ), l = this._same(t.palettes, (w) => w?.state), d = this._same(t.speeds, (w) => w?.state), f = this._same(t.intensities, (w) => w?.state), g = t.preset ? this.hass.states[t.preset] : null, h = g?.attributes?.options || [], u = s ? [
      this._pct(n),
      c && c !== "Mixed" ? c : null,
      l && l !== "Mixed" ? l : null
    ].filter(Boolean).join(" · ") : i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : "Off", p = (w) => {
      const z = this.hass?.states?.[w];
      return !!(z && !ir.has(String(z.state).toLowerCase()));
    }, _ = !!(t.preset && p(t.preset)), m = t.effectLights.some(p), b = t.palettes.some(p), $ = t.speeds.some(p), v = t.intensities.some(p), H = t.effectLights.map((w) => this.hass?.states[w]).find(Boolean)?.attributes?.effect_list || [], M = t.palettes.map((w) => this.hass?.states[w]).find(Boolean)?.attributes?.options || [];
    return o`
      <ha-card>
        <div class="wled-card">
          <div class="wled-toolbar">
          <div class="icon-well control-radius">
            <ha-icon icon="mdi:led-strip-variant"></ha-icon>
          </div>
          <button
            class="identity"
            type="button"
            aria-label="Open ${this.esc(t.deviceName)} settings"
            @click=${(w) => this._openAdvanced(!1, w)}
          >
            <div class="copy-block">
              <div class="label-title">${this.esc(t.deviceName)}</div>
              <div class="label-sub" role="status">${this.esc(u)}</div>
            </div>
          </button>
          <button
            class="btn-icon-44 power ${s ? "on" : ""}"
            type="button"
            aria-label="Toggle WLED"
            ?disabled=${!r}
            aria-pressed="${String(s)}"
            @click=${() => void this._runAction(() => this._togglePower())}
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
          </div>
        ${s ? o`
                <div class="card-divider-line"></div>
                <div class="brightness-control">
                    <span class="label-title">Brightness</span>
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
                      @input=${(w) => {
      const z = Number(w.target.value);
      this._brightnessIntent = z, this._getBrightnessCoalescer().request(z);
    }}
                    />
                    <output class="brightness-value"
                      >${this._pct(n)}</output
                    >
                </div>
                  <div class="actions">
                    <button
                      class="btn-action-pill action presets"
                      type="button"
                      ?disabled=${!_}
                      aria-label="WLED presets"
                      @click=${(w) => this._openAdvanced(!0, w)}
                    >
                      <ha-icon icon="mdi:bookmark-multiple-outline"></ha-icon>
                      <span>Presets</span>
                    </button>
                    <button
                      class="btn-action-pill action colour"
                      type="button"
                      ?disabled=${!m}
                      aria-label="WLED colour"
                      @click=${() => this.moreInfo(t.effectLights[0] || t.main)}
                    >
                      <ha-icon icon="mdi:palette-outline"></ha-icon>
                      <span>Colour</span>
                    </button>
                    <button
                      class="btn-action-pill action advanced"
                      type="button"
                      ?disabled=${!(_ || m || b || $ || v)}
                      aria-label="WLED advanced settings"
                      @click=${(w) => this._openAdvanced(!1, w)}
                    >
                      <ha-icon icon="mdi:tune-variant"></ha-icon>
                      <span>Advanced</span>
                    </button>
                  </div>
                  ${this._actionError ? o`<div class="feedback-line err" role="alert">${this._actionError}</div>` : ""}
              ` : ""}
        </div>
      </ha-card>

      <dialog
        role="dialog"
        aria-modal="true"
        aria-label="${this.esc(t.deviceName)} settings"
        @close=${this._handleDialogClosed}
        @mousedown=${(w) => {
      const z = this.renderRoot.querySelector("dialog");
      if (z && w.target === z) {
        const U = z.getBoundingClientRect();
        U.top <= w.clientY && w.clientY <= U.top + U.height && U.left <= w.clientX && w.clientX <= U.left + U.width || z.close();
      }
    }}
      >
        <div class="sheet" @click=${(w) => w.stopPropagation()} @mousedown=${(w) => w.stopPropagation()}>
          <div class="sheet-head">
            <div class="icon-well control-radius">
              <ha-icon icon="mdi:led-strip-variant"></ha-icon>
            </div>
            <div class="sheet-title">
              <div class="sheet-name">${this.esc(t.deviceName)}</div>
              <div class="sheet-state">${this.esc(u)}</div>
            </div>
            <button
              class="close"
              type="button"
              aria-label="Close"
              @click=${() => this._closeDialog()}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="sheet-body">
            <section class="section presets-section">
              <div class="section-title">Presets</div>
              <div class="preset-grid">
                ${h.length ? h.map((w) => {
      const z = String(g?.state) === String(w);
      return o`
                          <button
                            class="btn-action-pill preset-btn ${z ? "active" : ""}"
                            type="button"
                            role="button"
                            aria-pressed="${String(z)}"
                            title="${this.esc(w)}"
                            @click=${async (U) => {
        U.stopPropagation(), await this._call(
          "select",
          "select_option",
          t.preset ? [t.preset] : [],
          { option: w }
        );
      }}
                          >
                            ${this.esc(w)}
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
                    class="select-dropdown-control effect"
                    aria-label="Effect selection"
                    ?disabled=${!m || !H.length}
                    @change=${(w) => {
      const z = w.target.value;
      z && this._call("light", "turn_on", t.effectLights, {
        effect: z
      });
    }}
                  >
                    ${!c || c === "Mixed" ? o`<option value="" selected>
                            ${c === "Mixed" ? "Mixed" : "Choose effect"}
                          </option>` : ""}
                    ${H.map(
      (w) => o`<option
                          value="${this.esc(w)}"
                          ?selected=${c === w}
                        >
                          ${this.esc(w)}
                        </option>`
    )}
                  </select>
                </label>

                <label class="field">
                  <span>Palette</span>
                  <select
                    class="select-dropdown-control palette"
                    aria-label="Palette selection"
                    ?disabled=${!b || !M.length}
                    @change=${(w) => {
      const z = w.target.value;
      z && this._call("select", "select_option", t.palettes, {
        option: z
      });
    }}
                  >
                    ${!l || l === "Mixed" ? o`<option value="" selected>
                            ${l === "Mixed" ? "Mixed" : "Choose palette"}
                          </option>` : ""}
                    ${M.map(
      (w) => o`<option
                          value="${this.esc(w)}"
                          ?selected=${l === w}
                        >
                          ${this.esc(w)}
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
                      >${this.esc(String((this._speedIntent ?? d) || "—"))}</output
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
                    aria-valuenow="${String((this._speedIntent ?? Number(d)) || 0)}"
                    .value=${String((this._speedIntent ?? Number(d)) || 0)}
                    ?disabled=${!$}
                    @input=${(w) => {
      this._speedIntent = Number(w.target.value);
    }}
                    @change=${(w) => {
      const z = Number(w.target.value);
      this._speedIntent = null, this._call("number", "set_value", t.speeds, {
        value: z
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
                    @input=${(w) => {
      this._intensityIntent = Number(w.target.value);
    }}
                    @change=${(w) => {
      const z = Number(w.target.value);
      this._intensityIntent = null, this._call("number", "set_value", t.intensities, {
        value: z
      });
    }}
                  />
                </label>

              </div>
            </section>

            <section class="section">
              <div class="section-title">Colour Presets</div>
              <div class="preset-grid">
                ${[
      { name: "Warm White", rgb: [255, 180, 100] },
      { name: "Neutral White", rgb: [255, 255, 255] },
      { name: "Cool White", rgb: [200, 220, 255] },
      { name: "Red", rgb: [255, 0, 0] },
      { name: "Amber", rgb: [255, 140, 0] },
      { name: "Green", rgb: [0, 255, 60] },
      { name: "Cyan", rgb: [0, 220, 255] },
      { name: "Blue", rgb: [0, 80, 255] },
      { name: "Purple", rgb: [180, 0, 255] },
      { name: "Pink", rgb: [255, 40, 150] }
    ].map(
      (w) => o`
                    <button
                      class="btn-action-pill preset-btn"
                      type="button"
                      aria-label="${w.name}"
                      style="--action-glow-color: rgb(${w.rgb.join(",")});"
                      @click=${(z) => {
        z.stopPropagation(), this._call("light", "turn_on", t.effectLights, {
          rgb_color: w.rgb
        });
      }}
                    >
                      <span
                        style="display:inline-block;width:12px;height:12px;border-radius:50%;background:rgb(${w.rgb.join(",")});margin-right:6px;border:1px solid var(--divider-color);flex-shrink:0;"
                      ></span>
                      <span>${w.name}</span>
                    </button>
                  `
    )}
              </div>
            </section>

            <div class="native">
              <button
                class="btn-action-pill action native-colour"
                type="button"
                ?disabled=${!m}
                @click=${() => this.moreInfo(t.effectLights[0] || t.main)}
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
ht.styles = Xo;
jt([
  x()
], ht.prototype, "_registries", 2);
jt([
  x()
], ht.prototype, "_bundle", 2);
jt([
  x()
], ht.prototype, "_brightnessIntent", 2);
jt([
  x()
], ht.prototype, "_speedIntent", 2);
jt([
  x()
], ht.prototype, "_intensityIntent", 2);
jt([
  x()
], ht.prototype, "_actionError", 2);
ht = jt([
  k("component-wled-controller-v1")
], ht);
E({
  type: "component-wled-controller-v1",
  element: ht,
  name: "WLED Controller V1",
  description: "Minimal WLED control with advanced settings sheet."
});
const ic = [
  P,
  O,
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
      background: var(--dashboard-card-muted-surface);
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
      background: color-mix(
        in srgb,
        var(--dashboard-card-surface) 78%,
        transparent
      );
      color: var(--primary-text-color);
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
var sc = Object.defineProperty, rc = Object.getOwnPropertyDescriptor, Ur = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? rc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && sc(e, i, r), r;
};
let pe = class extends A {
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
    this._sequence++, document.removeEventListener("visibilitychange", this._visibilityListener), window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._timer && clearInterval(this._timer), this._timer = null, super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("hass") && this.hass && this._refresh();
  }
  async _refresh(t = !1) {
    if (!this.hass || !this._config) return;
    const e = ++this._sequence, i = this.hass;
    try {
      const s = await Be(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && i === this.hass && (this._model = s);
    } catch (s) {
      e === this._sequence && i === this.hass && (this._model = { error: s, cameras: [] });
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
    ) : e, s = i.filter((n) => n.online).length, r = this._model?.error ? "Unavailable" : `${s}/${i.length} online`, a = this._model?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : this._model?.error ? this._model.error.message || "Camera discovery is unavailable" : "No cameras available";
    return o`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <h2>${this.esc(this._config.title || "Camera wall")}</h2>
            <span class="meta">${this.esc(r)}</span>
          </div>

          ${i.length === 0 ? o`<div class="empty">${this.esc(a)}</div>` : o`
                  <div class="grid">
                    ${i.map((n) => {
      const l = this.hass?.states[n.entityId]?.attributes?.entity_picture, d = l ? this.hass?.hassUrl ? this.hass.hassUrl(l) : l : "", f = d ? `${d}${d.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "";
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
pe.stubConfig = { profile: "household-security", columns: 2 };
pe.styles = ic;
Ur([
  x()
], pe.prototype, "_model", 2);
pe = Ur([
  k("component-security-camera-wall-v3")
], pe);
E({
  type: "component-security-camera-wall-v3",
  element: pe,
  name: "Security Camera Wall V3",
  description: "Snapshot-first, lazy live camera wall with capability-driven controls."
});
const ac = [
  P,
  O,
  V,
  qt,
  q,
  pt,
  Fe,
  G,
  St,
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      background: var(--dashboard-card-surface);
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
      border-radius: var(--dashboard-radius-control);
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
      background: var(--dashboard-card-muted-surface);
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      text-align: left;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr);
      align-items: center;
      gap: 9px;
      cursor: pointer;
    }
    .quick-action:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .quick-icon {
      width: 36px;
      height: 36px;
      border-radius: var(--dashboard-radius-control);
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-card);
      overflow: hidden;
      background: var(--dashboard-card-surface);
    }
    .camera-media {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      padding: 0;
      border: 0;
      background: var(--dashboard-card-muted-surface);
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
        var(--dashboard-card-muted-surface) 72%,
        transparent
      );
      color: var(--primary-text-color);
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
        var(--dashboard-card-muted-surface) 78%,
        transparent
      );
      color: var(--primary-text-color);
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
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
      background: var(--dashboard-card-muted-surface);
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-dialog);
      background: var(--dashboard-card-surface);
      color: var(--primary-text-color);
      box-shadow: var(--dashboard-dialog-shadow);
      overflow: hidden;
    }
    dialog::backdrop {
      background: var(--dashboard-modal-scrim);
    }
    .dialog-shell {
      display: flex;
      flex-direction: column;
      max-height: calc(100dvh - 32px);
    }
    .dialog-head {
      min-height: 56px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .dialog-title {
      min-width: 0;
      flex: 1;
      font-size: 15px;
      font-weight: 650;
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
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--secondary-text-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      cursor: pointer;
    }
    .dialog-button:hover {
      background: var(--dashboard-card-muted-surface);
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
      padding: 16px 16px max(16px, env(safe-area-inset-bottom));
    }
    .viewer-dialog {
      width: min(1120px, calc(100vw - 32px));
      height: min(760px, calc(100dvh - 32px));
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
      background: var(--dashboard-card-muted-surface);
      overflow: hidden;
    }
    .settings-dialog {
      width: min(680px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: var(--dashboard-card-muted-surface);
      overflow: hidden;
      text-align: left;
      cursor: pointer;
    }
    .detection img {
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      background: var(--dashboard-card-muted-surface);
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
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
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
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
        border-radius: var(--dashboard-radius-dialog) var(--dashboard-radius-dialog) 0 0;
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
var nc = Object.defineProperty, oc = Object.getOwnPropertyDescriptor, Ft = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? oc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && nc(e, i, r), r;
};
let nt = class extends A {
  constructor() {
    super(...arguments), this._model = null, this._viewerCamera = null, this._settingsCamera = null, this._entryConfirmId = null, this._busyActionId = null, this._actionError = null, this._sequence = 0, this._snapshotTimer = null, this._entryConfirmTimer = null, this._snapshotStamp = Math.floor(Date.now() / 1e4), this._viewerOpener = null, this._settingsOpener = null, this._profileListener = (t) => {
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
    this._sequence++, document.removeEventListener("visibilitychange", this._visibilityListener), window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._snapshotTimer && clearInterval(this._snapshotTimer), this._snapshotTimer = null, this._entryConfirmTimer && clearTimeout(this._entryConfirmTimer), this._entryConfirmTimer = null, super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("hass") && this.hass && this._refresh();
  }
  async _refresh(t = !1) {
    if (!this.hass || !this._config) return;
    const e = ++this._sequence, i = this.hass;
    try {
      const s = await Be(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && i === this.hass && (this._model = s);
    } catch (s) {
      e === this._sequence && i === this.hass && (this._model = {
        error: s,
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
    if (!(!this.hass || !this._isActionable(t.entityId) || this._busyActionId)) {
      this._busyActionId = t.entityId, this._actionError = null;
      try {
        await S(this.hass, {
          domain: t.domain,
          service: t.service,
          target: { entity_id: t.entityId }
        }), this._refresh(!0);
      } catch {
        this._actionError = "Action failed. Try again.";
      } finally {
        this._busyActionId = null;
      }
    }
  }
  async _operateEntry(t) {
    const e = t.controlEntityId || t.entityId;
    if (!(!this.hass || !this._isActionable(e) || this._busyActionId)) {
      if (this._entryConfirmId !== t.entityId) {
        this._entryConfirmId = t.entityId, this._entryConfirmTimer && clearTimeout(this._entryConfirmTimer), this._entryConfirmTimer = setTimeout(() => {
          this._entryConfirmId = null;
        }, 3e3);
        return;
      }
      this._entryConfirmId = null, this._entryConfirmTimer && clearTimeout(this._entryConfirmTimer), this._entryConfirmTimer = null, this._busyActionId = e, this._actionError = null;
      try {
        if (t.controlEntityId) {
          const i = t.controlEntityId.split(".")[0];
          i === "button" ? await S(this.hass, {
            domain: "button",
            service: "press",
            target: { entity_id: t.controlEntityId }
          }) : i === "cover" ? await S(this.hass, {
            domain: "cover",
            service: t.open ? "close_cover" : "open_cover",
            target: { entity_id: t.controlEntityId }
          }) : i === "lock" ? await S(this.hass, {
            domain: "lock",
            service: t.open ? "lock" : "unlock",
            target: { entity_id: t.controlEntityId }
          }) : await S(this.hass, {
            domain: "homeassistant",
            service: "toggle",
            target: { entity_id: t.controlEntityId }
          });
        } else t.domain === "lock" ? await S(this.hass, {
          domain: "lock",
          service: t.open ? "lock" : "unlock",
          target: { entity_id: t.entityId }
        }) : t.domain === "cover" && await S(this.hass, {
          domain: "cover",
          service: t.open ? "close_cover" : "open_cover",
          target: { entity_id: t.entityId }
        });
        this._refresh(!0);
      } catch {
        this._actionError = "Action failed. Try again.";
      } finally {
        this._busyActionId = null;
      }
    }
  }
  _isActionable(t) {
    return ft(this.hass?.states[t]);
  }
  _openViewer(t, e) {
    t.online && (this._viewerOpener = e?.currentTarget, this._viewerCamera = t, this.updateComplete.then(() => {
      const i = this.renderRoot.querySelector(".viewer-dialog");
      if (!(!i || i.open))
        try {
          i.showModal(), i.querySelector(".dialog-button[aria-label='Close']")?.focus();
        } catch {
          this._viewerCamera = null, this._viewerOpener = null;
        }
    }));
  }
  _closeViewer() {
    const t = this.renderRoot.querySelector(
      ".viewer-dialog"
    );
    t?.open ? t.close() : this._handleViewerClosed();
  }
  _handleViewerClosed() {
    this._viewerCamera = null;
    const t = this._viewerOpener;
    this._viewerOpener = null, t?.focus();
  }
  _openSettings(t, e) {
    this._settingsOpener = e?.currentTarget, this._settingsCamera = t, this.updateComplete.then(() => {
      const i = this.renderRoot.querySelector(".settings-dialog");
      if (!(!i || i.open))
        try {
          i.showModal(), i.querySelector(".dialog-button[aria-label='Close']")?.focus();
        } catch {
          this._settingsCamera = null, this._settingsOpener = null;
        }
    });
  }
  _closeSettings() {
    const t = this.renderRoot.querySelector(
      ".settings-dialog"
    );
    t?.open ? t.close() : this._handleSettingsClosed();
  }
  _handleSettingsClosed() {
    this._settingsCamera = null;
    const t = this._settingsOpener;
    this._settingsOpener = null, t?.focus();
  }
  async _toggleCameraSwitch(t, e) {
    if (!(!this.hass || !this._isActionable(t) || this._busyActionId)) {
      this._busyActionId = t, this._actionError = null;
      try {
        await S(this.hass, {
          domain: "switch",
          service: e ? "turn_off" : "turn_on",
          target: { entity_id: t }
        }), this._refresh(!0);
      } catch {
        this._actionError = "Action failed. Try again.";
      } finally {
        this._busyActionId = null;
      }
    }
  }
  render() {
    if (!this._config) return o``;
    const t = this._model || {}, e = this._config.cameras, i = t.cameras || [], s = e && e.length > 0 ? i.filter(
      (h) => e.includes(h.entityId) || h.deviceId && e.includes(h.deviceId) || e.includes(h.id)
    ) : i, r = this._config.entries, a = t.entries || [], n = r && r.length > 0 ? a.filter(
      (h) => r.includes(h.entityId) || h.deviceId && r.includes(h.deviceId)
    ) : a, c = t.quickActions || [], l = (t.attention || []).length, d = !!(t.error || t.profileError || t.profileMissing), f = s.reduce(
      (h, u) => h + (u.detections || []).filter(
        (p) => this.hass?.states?.[p.entity_id]?.state === "on"
      ).length,
      0
    ), g = n.filter((h) => h.available && h.open).length;
    return o`
      <div class="page">
        <section class="panel hero">
          <div class="hero-main">
            <span
              class="hero-icon ${l > 0 || d ? "attention" : ""}"
            >
              <ha-icon
                icon="${d || l > 0 ? "mdi:shield-alert-outline" : "mdi:shield-check-outline"}"
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
              class="metric ${s.length > 0 && (t.onlineCameras || 0) < s.length ? "attention" : ""}"
            >
              <ha-icon icon="mdi:cctv"></ha-icon>
              <span>${t.onlineCameras || 0}/${s.length} cameras</span>
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
      (h) => {
        const u = h.available && this._isActionable(h.entityId), p = this._busyActionId === h.entityId;
        return o`
                        <button
                          class="quick-action"
                          type="button"
                          ?disabled=${!u || !!this._busyActionId}
                          aria-busy=${p ? "true" : "false"}
                          aria-label="${this.esc(h.name)}, ${p ? "Working" : u ? "Run" : "Unavailable"}"
                          @click=${() => this._runQuickAction(h)}
                        >
                          <span class="quick-icon"
                            ><ha-icon icon="${this.esc(h.icon)}"></ha-icon
                          ></span>
                          <span>
                            <span class="quick-name"
                              >${this.esc(h.name)}</span
                            >
                            <span class="quick-state"
                              >${p ? "Working…" : u ? "Run" : "Unavailable"}</span
                            >
                          </span>
                        </button>
                      `;
      }
    )}
                  </div>
                </section>
              ` : ""}

        <section class="panel section camera-section">
          <div class="section-head">
            <h2 class="section-title">Cameras</h2>
            <span class="section-meta"
              >${s.filter((h) => h.online).length}/${s.length}
              online</span
            >
          </div>
          ${s.length === 0 ? o`<div class="empty">
                  No security cameras are configured
                </div>` : o`
                  <div class="camera-grid">
                    ${s.map((h) => {
      const p = this.hass?.states[h.entityId]?.attributes?.entity_picture, _ = p ? this.hass?.hassUrl ? this.hass.hassUrl(p) : p : "", m = _ ? `${_}${_.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "", b = h.classifications || [];
      return o`
                        <article class="camera">
                          <button
                            class="camera-media ${h.online ? "" : "offline"}"
                            type="button"
                            ?disabled=${!h.online}
                            aria-label="Open live view for ${this.esc(h.name)}"
                            @click=${($) => this._openViewer(h, $)}
                          >
                            ${m ? o`<img
                                  src="${m}"
                                  alt="${this.esc(h.name)} snapshot"
                                />` : ""}
                            <span
                              class="camera-badge ${h.active ? "activity" : ""}"
                            >
                              <ha-icon
                                icon="${h.active ? "mdi:motion-sensor" : "mdi:cctv"}"
                              ></ha-icon>
                              <span
                                >${h.active ? "Activity" : h.online ? "Live" : "Offline"}</span
                              >
                            </span>
                          </button>
                          <div class="camera-copy">
                            <div class="camera-title-row">
                              <span class="camera-name"
                                >${this.esc(h.name)}</span
                              >
                            </div>
                            <div class="camera-state">
                              ${h.active ? "Activity detected" : h.online ? "Online" : "Unavailable"}
                            </div>
                            <div class="classification-summary">
                              ${b.length ? `Recent: ${b.map(($) => $.name).join(" · ")}` : "No detection image entities"}
                            </div>
                          </div>
                          <div class="camera-actions">
                            <button
                              class="camera-action primary"
                              type="button"
                              ?disabled=${!h.online}
                              aria-label="Live view for ${this.esc(h.name)}"
                              @click=${($) => this._openViewer(h, $)}
                            >
                              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                              <span>Live</span>
                            </button>
                            <button
                              class="camera-action"
                              type="button"
                              ?disabled=${!(b.length || h.detections?.length)}
                              aria-label="Detections for ${this.esc(h.name)}"
                              @click=${($) => this._openSettings(h, $)}
                            >
                              <ha-icon icon="mdi:motion-sensor"></ha-icon>
                              <span>Detections</span>
                            </button>
                            <button
                              class="camera-action"
                              type="button"
                              aria-label="Settings for ${this.esc(h.name)}"
                              @click=${($) => this._openSettings(h, $)}
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
                    ${n.map((h) => {
      const u = this._entryConfirmId === h.entityId, p = h.controlEntityId || h.entityId, _ = h.available && this._isActionable(p), m = this._busyActionId === p, b = !!(h.controlEntityId || h.domain === "lock" || h.domain === "cover"), $ = h.domain === "lock" ? h.open ? "Lock" : "Unlock" : h.open ? "Close" : "Open";
      return o`
                        <article class="entry">
                          <span
                            class="entry-icon ${h.open ? "attention" : ""}"
                          >
                            <ha-icon
                              icon="${h.domain === "lock" ? h.open ? "mdi:lock-open-outline" : "mdi:lock-outline" : h.open ? "mdi:door-open" : "mdi:door-closed"}"
                            ></ha-icon>
                          </span>
                          <span>
                            <span class="entry-name"
                              >${this.esc(h.name)}</span
                            >
                            <span class="entry-state">
                              ${_ ? h.domain === "lock" ? h.open ? "Unlocked" : "Locked" : h.open ? "Open" : "Closed" : "Unavailable"}
                            </span>
                          </span>
                          <span class="entry-actions">
                            <button
                              class="entry-detail"
                              type="button"
                              aria-label="Open details for ${this.esc(h.name)}"
                              @click=${() => this.moreInfo(h.entityId)}
                            >
                              <ha-icon icon="mdi:information-outline"></ha-icon>
                            </button>
                            ${b ? o`
                                    <button
                                      class="entry-operate ${u ? "confirm" : ""}"
                                      type="button"
                                      ?disabled=${!_ || !!this._busyActionId}
                                      aria-busy=${m ? "true" : "false"}
                                      aria-label="${m ? "Working" : u ? "Confirm " + $ : $} for ${this.esc(h.name)}"
                                      @click=${() => this._operateEntry(h)}
                                    >
                                      ${m ? "Working…" : u ? "Confirm" : $}
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
      ${this._actionError ? o`<div class="empty" role="status">${this._actionError}</div>` : ""}

      <dialog
        class="viewer-dialog"
        aria-label="Camera live stream"
        @close=${this._handleViewerClosed}
        @click=${(h) => {
      const u = this.renderRoot.querySelector(".viewer-dialog");
      h.target === u && this._closeViewer();
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
              ?disabled=${!this._viewerCamera?.online}
              @click=${() => {
      const h = this._viewerCamera;
      this._closeViewer(), h && this._openSettings(h);
    }}
            >
              <ha-icon icon="mdi:tune-variant"></ha-icon>
              <span>Settings</span>
            </button>
            <button
              class="dialog-button"
              type="button"
              ?disabled=${!this._isActionable(this._viewerCamera?.entityId || "")}
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
        @close=${this._handleSettingsClosed}
        @click=${(h) => {
      const u = this.renderRoot.querySelector(".settings-dialog");
      h.target === u && this._closeSettings();
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
              ?disabled=${!this._settingsCamera?.online}
              @click=${() => {
      const h = this._settingsCamera;
      this._closeSettings(), h && this._openViewer(h);
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
                          ${this._settingsCamera.classifications.map((h) => {
      const p = this.hass?.states[h.entity.entity_id]?.attributes?.entity_picture;
      return o`
                              <button
                                class="detection"
                                type="button"
                                @click=${() => {
        this._closeSettings(), this.moreInfo(h.entity.entity_id);
      }}
                              >
                                ${p ? o`<img src="${p}" alt="${this.esc(h.name)}" />` : ""}
                                <span class="detection-copy">
                                  <span class="detection-name"
                                    >${this.esc(h.name)}</span
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
                          ${this._settingsCamera.switches.map((h) => {
      const u = h.entity.entity_id, _ = this.hass?.states[u]?.state === "on", m = this._isActionable(u), b = this._busyActionId === u;
      return o`
                              <div class="control-row">
                                <span>
                                  <span class="control-name"
                                    >${this.esc(h.role || "Control")}</span
                                  >
                                  <span class="control-state"
                                    >${m ? b ? "Working…" : _ ? "On" : "Off" : "Unavailable"}</span
                                  >
                                </span>
                                <button
                                  class="control-toggle ${_ ? "on" : ""}"
                                  type="button"
                                  ?disabled=${!m || !!this._busyActionId}
                                  aria-busy=${b ? "true" : "false"}
                                  @click=${() => this._toggleCameraSwitch(u, _)}
                                >
                                  ${b ? "Working…" : _ ? "Turn off" : "Turn on"}
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
      const h = this._settingsCamera;
      this._closeSettings(), h && this._openViewer(h);
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
nt.stubConfig = {
  profile: "household-security",
  camera_columns: 2
};
nt.styles = ac;
Ft([
  x()
], nt.prototype, "_model", 2);
Ft([
  x()
], nt.prototype, "_viewerCamera", 2);
Ft([
  x()
], nt.prototype, "_settingsCamera", 2);
Ft([
  x()
], nt.prototype, "_entryConfirmId", 2);
Ft([
  x()
], nt.prototype, "_busyActionId", 2);
Ft([
  x()
], nt.prototype, "_actionError", 2);
nt = Ft([
  k("component-security-dashboard-v1")
], nt);
E({
  type: "component-security-dashboard-v1",
  element: nt,
  name: "Security Dashboard V1",
  description: "Single-owner Security dashboard with on-demand live video, detections, controls, quick actions and entry points."
});
const cc = [
  P,
  O,
  q,
  ut,
  y`
    .list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .entry {
      appearance: none;
      min-width: 0;
      min-height: 44px;
      padding: 8px 10px;
      border: var(--dashboard-card-border);
      border-radius: var(--dashboard-radius-control);
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      display: grid;
      grid-template-columns: 40px minmax(0, 1fr);
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }
    .entry:hover {
      background: var(--dashboard-card-muted-surface);
    }
    .entry.open {
      border-color: var(--warning-color);
      background: var(--dashboard-warning-surface);
    }
    .entry:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .open .icon {
      color: var(--warning-color);
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
    @media (max-width: 700px) {
      .list {
        grid-template-columns: 1fr;
      }
    }
  `
];
var lc = Object.defineProperty, dc = Object.getOwnPropertyDescriptor, jr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? dc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && lc(e, i, r), r;
};
let ue = class extends A {
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
    this._sequence++, window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    );
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("hass") && this.hass && this._refresh();
  }
  async _refresh(t = !1) {
    if (!this.hass || !this._config) return;
    const e = ++this._sequence, i = this.hass;
    try {
      const s = await Be(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && i === this.hass && (this._model = s);
    } catch (s) {
      e === this._sequence && i === this.hass && (this._model = { error: s, entries: [] });
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
        T(e, {
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
      <ha-card class="assembled-card">
        <div class="header-row">
          <div class="icon-well control-radius">
            <ha-icon icon="mdi:shield-home-outline"></ha-icon>
          </div>
          <div class="copy-block">
            <div class="label-title">${this.esc(this._config.title || "Entry points")}</div>
            <div class="label-sub">${t.length} monitored</div>
          </div>
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
      const i = this._entryIcon(e), s = this._entryStateText(e);
      return o`
            <button
              class="entry ${e.open ? "open" : ""}"
              type="button"
              data-entity-id="${e.entityId}"
              ?disabled=${!e.available}
              aria-label="${this.esc(e.name)}, ${this.esc(s)}. Open details."
            >
              <span class="icon-well control-radius icon">
                <ha-icon icon="${i}"></ha-icon>
              </span>
              <span class="copy">
                <span class="label-title name">${this.esc(e.name)}</span>
                <span class="label-sub state">${this.esc(s)}</span>
              </span>
            </button>
          `;
    })}
        </div>
      </ha-card>
    `;
  }
};
ue.stubConfig = { profile: "household-security" };
ue.styles = cc;
jr([
  x()
], ue.prototype, "_model", 2);
ue = jr([
  k("component-security-entry-points-v1")
], ue);
E({
  type: "component-security-entry-points-v1",
  element: ue,
  name: "Security Entry Points V1",
  description: "Capability-driven garage, door, window and lock status using the shared garage controller where available."
});
const hc = [
  P,
  O,
  V,
  q,
  G,
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
var pc = Object.defineProperty, uc = Object.getOwnPropertyDescriptor, Fr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? uc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && pc(e, i, r), r;
};
let me = class extends A {
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
    this._sequence++, window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    );
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("hass") && this.hass && this._refresh();
  }
  async _refresh(t = !1) {
    if (!this.hass || !this._config) return;
    const e = ++this._sequence, i = this.hass;
    try {
      const s = await Be(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && i === this.hass && (this._model = s);
    } catch (s) {
      e === this._sequence && i === this.hass && (this._model = {
        error: s,
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
        T(e, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    });
  }
  render() {
    if (!this._config) return o``;
    const t = this._model, e = t?.error || t?.profileError, i = !e && !!t?.allClear, s = this._config.title || "Security", r = t?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : e ? e.message || "Security status is unavailable" : i ? "All clear" : `${t?.attention?.length || 0} item${(t?.attention?.length || 0) === 1 ? "" : "s"} need attention`, a = e ? "Unavailable" : `${t?.onlineCameras || 0}/${t?.cameras?.length || 0} cameras online`, n = (t?.attention || []).slice(0, 4);
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
              <span class="title">${this.esc(s)}</span>
              <span class="detail ${e ? "error" : ""}"
                >${this.esc(r)}</span
              >
            </span>
            <span class="count">${this.esc(a)}</span>
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
me.stubConfig = { profile: "household-security" };
me.styles = hc;
Fr([
  x()
], me.prototype, "_model", 2);
me = Fr([
  k("component-security-summary-v1")
], me);
E({
  type: "component-security-summary-v1",
  element: me,
  name: "Security Summary V1",
  description: "Exception-first all-clear and attention summary discovered from Home Assistant capabilities."
});
const mc = [
  us,
  y`
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
`
], gc = [
  P,
  O,
  V,
  pt,
  gs,
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
var fc = Object.defineProperty, bc = Object.getOwnPropertyDescriptor, Br = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? bc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && fc(e, i, r), r;
};
let ge = class extends A {
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
      (s) => {
        this._selected = s.day;
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
    for (const r of this._interactionHandles) r.destroy();
    this._interactionHandles = [];
    const t = { delay: 350, interval: 110, accelerate: !0 }, e = this.renderRoot.querySelector(
      ".previous"
    ), i = this.renderRoot.querySelector(
      ".next"
    ), s = this.renderRoot.querySelector(
      ".today"
    );
    e && this._interactionHandles.push(
      T(e, {
        primary: () => this._shift(-1),
        repeat: t,
        feedback: !0
      })
    ), i && this._interactionHandles.push(
      T(i, {
        primary: () => this._shift(1),
        repeat: t,
        feedback: !0
      })
    ), s && this._interactionHandles.push(
      T(s, {
        primary: () => this._setDay(j.today(this.hass)),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._isToday(), e = j.today(this.hass), i = Di(this.hass, this._selected, {
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
              @change=${(s) => this._setDay(s.target.value)}
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
ge.stubConfig = { channel: "energy-day" };
ge.styles = gc;
Br([
  x()
], ge.prototype, "_selected", 2);
ge = Br([
  k("component-energy-day-selector-v1")
], ge);
E({
  type: "component-energy-day-selector-v1",
  element: ge,
  name: "Energy Day Selector",
  description: "Stable selected-day control shared by every Energy card."
});
const _c = [
  P,
  O,
  pt,
  G,
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
var vc = Object.defineProperty, yc = Object.getOwnPropertyDescriptor, We = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? yc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && vc(e, i, r), r;
};
let _t = class extends A {
  constructor() {
    super(...arguments), this._data = null, this._error = null, this._loading = !1, this._day = j.today(), this._sequence = 0, this._dayUnsub = null, this._dataUnsub = null, this._dataHass = null, this._dataProfile = "", this._dataDay = "", this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === (this._config?.profile || "household-energy") && (this.hass && ie.invalidateProfile(
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
    this._day = j.get(i, this.hass), this.isConnected && e !== i && this._bindDayChannel(), this._bindDataSubscription(), this._load();
  }
  getCardSize() {
    return 3;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._bindDayChannel(), this._bindDataSubscription(), this._load();
  }
  disconnectedCallback() {
    window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._dayUnsub?.(), this._dayUnsub = null, this._dataUnsub?.(), this._dataUnsub = null, this._dataHass = null, this._sequence++;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), !(!t.has("hass") || !this.hass) && (this._day = j.get(
      this._config?.day_channel || "energy-day",
      this.hass
    ), this._bindDayChannel(), this._bindDataSubscription(), this._load());
  }
  _bindDayChannel() {
    this._dayUnsub?.(), this._dayUnsub = null, this.isConnected && (this._dayUnsub = j.subscribe(
      this._config?.day_channel || "energy-day",
      (t) => {
        t.day !== this._day && (this._day = t.day, this._bindDataSubscription(), this._load());
      },
      { hass: this.hass }
    ));
  }
  _bindDataSubscription() {
    if (!this.isConnected || !this.hass || !this._config || !this._day) return;
    const t = this.hass, e = this._config.profile || "household-energy";
    this._dataUnsub && this._dataHass === t && this._dataProfile === e && this._dataDay === this._day || (this._dataUnsub?.(), this._dataHass = t, this._dataProfile = e, this._dataDay = this._day, this._dataUnsub = ie.subscribe(
      t,
      e,
      this._day,
      (i) => {
        this._dataHass !== t || this._dataProfile !== e || this._dataDay !== this._day || (i.value && (this._data = i.value), this._error = i.error, this._loading = i.loading);
      }
    ));
  }
  async _load(t = !1) {
    if (!this.hass || !this._config || !this._day) return;
    const e = ++this._sequence, i = this.hass, s = this._config.profile || "household-energy", r = this._day;
    this._loading = !0, this._error = null;
    try {
      const a = await ie.get(
        i,
        s,
        r,
        { force: t }
      );
      e === this._sequence && i === this.hass && r === this._day && (this._data = a);
    } catch (a) {
      e === this._sequence && i === this.hass && r === this._day && (this._error = a);
    } finally {
      e === this._sequence && i === this.hass && r === this._day && (this._loading = !1);
    }
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const s = this.renderRoot.querySelector(e);
      s && this._interactionHandles.push(
        T(s, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house", "sensor.ha_component_house_power"), t(".solar", "sensor.ha_component_solar_power"), t(".grid", "sensor.ha_component_grid_power");
  }
  render() {
    if (!this._config) return o``;
    const t = this._data, e = this._day === j.today(this.hass), i = e ? "Today" : Di(this.hass, this._day, {
      weekday: "short",
      day: "numeric",
      month: "short"
    }), s = t?.grid_w == null ? Number.NaN : Number(t.grid_w), r = Number.isFinite(s) ? s > 15 ? "Importing now" : s < -15 ? "Exporting now" : "Grid balanced" : "Grid unavailable", a = Number(t?.coverage), n = this._error ? /unknown energy profile/i.test(this._error.message || "") ? `Configure ${this._config.profile || "household-energy"} in HA Component Backend` : this._error.message || "Energy data is unavailable" : this._loading ? this._data ? "Updating…" : "Loading Energy data…" : t?.stale ? "Showing the last successful update" : Number.isFinite(a) && a < 1 ? `${Math.round(a * 100)}% of source data available` : "";
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
              aria-label="House power now: ${gt(this.hass, t?.house_w)}"
            >
              <span class="value"
                >${gt(this.hass, t?.house_w)}</span
              >
              <span class="label">House now</span>
            </button>
            <button
              class="metric solar"
              type="button"
              aria-label="Solar power now: ${gt(this.hass, t?.solar_w)}"
            >
              <span class="value"
                >${gt(this.hass, t?.solar_w)}</span
              >
              <span class="label">Solar now</span>
            </button>
            <button
              class="metric grid"
              type="button"
              aria-label="Grid power now: ${gt(this.hass, t?.grid_w, { absolute: !0 })}, ${r}"
            >
              <span class="value"
                >${gt(this.hass, t?.grid_w, { absolute: !0 })}</span
              >
              <span class="label">${this.esc(r)}</span>
            </button>
          </div>

          <div class="daily">
            <button class="metric consumed" type="button" disabled>
              <span class="value"
                >${xt(this.hass, t?.consumed_kwh)}</span
              >
              <span class="label">Consumed</span>
            </button>
            <button class="metric generated" type="button" disabled>
              <span class="value"
                >${xt(this.hass, t?.generated_kwh)}</span
              >
              <span class="label">Generated</span>
            </button>
            <button class="metric imported" type="button" disabled>
              <span class="value"
                >${xt(this.hass, t?.imported_kwh)}</span
              >
              <span class="label">Imported</span>
            </button>
            <button class="metric exported" type="button" disabled>
              <span class="value"
                >${xt(this.hass, t?.exported_kwh)}</span
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
_t.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
_t.styles = _c;
We([
  x()
], _t.prototype, "_data", 2);
We([
  x()
], _t.prototype, "_error", 2);
We([
  x()
], _t.prototype, "_loading", 2);
We([
  x()
], _t.prototype, "_day", 2);
_t = We([
  k("component-energy-summary-v1")
], _t);
E({
  type: "component-energy-summary-v1",
  element: _t,
  name: "Energy Summary V1",
  description: "Stable backend-driven live power and selected-day Energy totals."
});
const xc = [
  P,
  O,
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
var wc = Object.defineProperty, $c = Object.getOwnPropertyDescriptor, Vr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? $c(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && wc(e, i, r), r;
};
const Cc = {
  type: "custom:solar-daylight-card-v7",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let Ie = class extends A {
  constructor() {
    super(...arguments), this._forecast = [], this._lastFetch = 0, this._pending = !1, this._failures = 0, this._retryAt = 0, this._interactionHandle = null;
  }
  setConfig(t) {
    const e = this._config?.weather_entity;
    super.setConfig({ ...Cc, ...t }), this._config?.weather_entity !== e && (this._forecast = [], this._lastFetch = 0), this._fetchForecast();
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
    return Number.isNaN(e.getTime()) ? "" : ni(this.hass, e);
  }
  _cloud(t) {
    const e = this._num(t);
    return e === null ? "—" : `${Math.round(Math.min(100, Math.max(0, e)))}%`;
  }
  _at(t) {
    if (!this._forecast.length) return null;
    const e = Date.now() + t * 36e5;
    let i = null, s = 1 / 0;
    for (const r of this._forecast) {
      const a = new Date(r.datetime || 0).getTime(), n = this._num(r.cloud_coverage);
      if (!Number.isFinite(a) || n === null) continue;
      const c = Math.abs(a - e);
      c < s && (s = c, i = n);
    }
    return s <= 90 * 6e4 ? i : null;
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
      }), s = this._forecastPayload(i);
      e === (this._config?.weather_entity || "weather.forecast_home") && (this._forecast = Array.isArray(s?.forecast) ? s.forecast.slice(0, 24) : [], this._lastFetch = Date.now(), this._failures = 0, this._retryAt = 0);
    } catch {
      e === (this._config?.weather_entity || "weather.forecast_home") && (this._failures = (this._failures || 0) + 1, this._retryAt = Date.now() + Math.min(300 * 1e3, 15e3 * 2 ** (this._failures - 1)));
    } finally {
      this._pending = !1;
    }
  }
  updated() {
    const t = this.renderRoot.querySelector("button");
    t && (this._interactionHandle?.destroy(), this._interactionHandle = T(t, {
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
    const t = this._config.sun_entity || "sun.sun", e = this._config.weather_entity || "weather.forecast_home", i = this.hass?.states[t], s = this.hass?.states[e], r = !!(i && ["above_horizon", "below_horizon"].includes(i.state));
    let a = "Sun state unavailable", n = "";
    if (r)
      if (i?.state === "above_horizon") {
        const p = this._num(i.attributes?.elevation, 0), _ = this._time(i.attributes?.next_setting);
        a = `Sun ${Math.round(p || 0)}°`, n = _ ? `Sunset ${_}` : "Daylight";
      } else {
        const p = this._time(i?.attributes?.next_rising);
        a = "Night", n = p ? `Sunrise ${p}` : "Before sunrise";
      }
    const c = this._num(s?.attributes?.cloud_coverage), l = this._at(4), d = this._at(8), f = this._cloud(c), g = this._cloud(l), h = this._cloud(d), u = `${a}, cloud coverage ${f}, plus 4 hours ${g}, plus 8 hours ${h}, ${n}. Tap for sun details; hold for weather details.`;
    return o`
      <ha-card>
        <button type="button" aria-label="${this.esc(u)}">
          <span class="phase">${this.esc(a)}</span>
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
              <span class="cloud-value plus8">${this.esc(h)}</span>
            </span>
          </span>
          <span class="event">${this.esc(n)}</span>
        </button>
      </ha-card>
    `;
  }
};
Ie.styles = xc;
Vr([
  x()
], Ie.prototype, "_forecast", 2);
Ie = Vr([
  k("solar-daylight-card-v7")
], Ie);
E({
  type: "solar-daylight-card-v7",
  element: Ie,
  name: "Solar Daylight Context",
  description: "Full-width sun context with centred current and forecast cloud coverage."
});
const kc = [
  P,
  O,
  gs,
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
var Sc = Object.defineProperty, Ac = Object.getOwnPropertyDescriptor, Ui = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ac(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Sc(e, i, r), r;
};
const Ec = {
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
let Nt = class extends A {
  constructor() {
    super(...arguments), this._series = {}, this._loading = !1, this._selectedDay = null, this._start = 0, this._end = 0, this._lastRangeKey = null, this._forceRefresh = !1, this._fetchSequence = 0, this._dayUnsubscribe = null, this._energyUnsubscribe = null, this._energyHass = null, this._energyProfile = "", this._energyDay = "", this._pinned = !1, this._pointerState = null, this._resizeObserver = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === this._config?.profile && (this.hass && this._config?.profile && ie.invalidateProfile(this.hass, this._config.profile), this._forceRefresh = !0, this._lastRangeKey = null, this._fetchData());
    }, this._outsideListener = (t) => {
      this._pinned && !t.composedPath?.().includes(this) && (this._pinned = !1);
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = { ...Ec, ...t || {} };
    e.profile && (e.calendar_day = !0), super.setConfig(e), this._config?.day_channel && this.hass && (this._selectedDay = j.get(
      this._config.day_channel,
      this.hass
    )), this.isConnected && (this._bindDayChannel(), this._bindEnergyData()), this._fetchData();
  }
  getCardSize() {
    return 7;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("pointerdown", this._outsideListener, !0), window.addEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._bindDayChannel(), this._bindEnergyData(), this._fetchData();
  }
  disconnectedCallback() {
    window.removeEventListener("pointerdown", this._outsideListener, !0), window.removeEventListener(
      "ha-component-profile-change",
      this._profileListener
    ), this._dayUnsubscribe?.(), this._dayUnsubscribe = null, this._energyUnsubscribe?.(), this._energyUnsubscribe = null, this._energyHass = null, this._fetchSequence++, this._resizeObserver?.disconnect(), this._resizeObserver = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("hass") && this.hass && (this._bindDayChannel(), this._bindEnergyData(), this._fetchData());
  }
  _bindDayChannel() {
    this._dayUnsubscribe?.(), this._dayUnsubscribe = null, !(!this._config?.calendar_day || !this._config?.day_channel) && (this._dayUnsubscribe = j.subscribe(
      this._config.day_channel,
      (t) => {
        t.day !== this._selectedDay && (this._selectedDay = t.day, this._lastRangeKey = null, this._bindEnergyData(), this._fetchData());
      },
      { hass: this.hass }
    ));
  }
  _applyProfileData(t, e) {
    if (!t) return;
    const i = Array.isArray(t.series) ? t.series : [];
    this._series = {
      house: i.map((s) => ({
        t: new Date(s.start).getTime(),
        v: Number(s.house) || 0
      })),
      solar: i.map((s) => ({
        t: new Date(s.start).getTime(),
        v: Number(s.solar) || 0
      })),
      grid: i.map((s) => ({
        t: new Date(s.start).getTime(),
        v: Number(s.grid) || 0
      }))
    }, this._start = Number(t.range?.start) || e.start, this._end = Number(t.range?.end) || e.end;
  }
  _bindEnergyData() {
    if (!this.isConnected || !this.hass || !this._config?.profile) {
      this._energyUnsubscribe?.(), this._energyUnsubscribe = null, this._energyHass = null, this._energyProfile = "", this._energyDay = "";
      return;
    }
    const t = this._range(), e = this.hass, i = this._config.profile;
    this._energyUnsubscribe && this._energyHass === e && this._energyProfile === i && this._energyDay === t.day || (this._energyUnsubscribe?.(), this._energyHass = e, this._energyProfile = i, this._energyDay = t.day, this._energyUnsubscribe = ie.subscribe(
      e,
      i,
      t.day,
      (s) => {
        this._energyHass !== e || this._energyProfile !== i || this._energyDay !== t.day || (this._loading = s.loading, this._applyProfileData(s.value, t));
      }
    ));
  }
  _range() {
    if (this._config?.calendar_day) {
      const s = j.today(this.hass), r = this._selectedDay && this._selectedDay <= s ? this._selectedDay : s, a = lr(this.hass, r), n = a?.start ?? Date.now() - 864e5, c = a?.end ?? Date.now();
      return { start: n, end: c, day: r, isToday: r === s };
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
    const i = ++this._fetchSequence, s = this.hass, r = this._config.profile;
    this._loading = !0;
    const a = this._forceRefresh;
    this._forceRefresh = !1;
    try {
      if (r) {
        const n = await ie.get(
          s,
          r,
          t.day,
          { force: a }
        );
        if (i !== this._fetchSequence || s !== this.hass) return;
        this._applyProfileData(n, t);
      } else
        this._start = t.start, this._end = t.end;
      this._lastRangeKey = e;
    } catch {
    } finally {
      i === this._fetchSequence && s === this.hass && (this._loading = !1);
    }
  }
  _niceMax(t) {
    if (t <= 0) return 1e3;
    const e = 10 ** Math.floor(Math.log10(t)), i = t / e;
    return (i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * e;
  }
  _paths(t, e, i, s = null) {
    const r = [];
    let a = "", n = null, c = [];
    const l = () => {
      if (!c.length) return;
      const d = c.map(
        (f, g) => `${g ? "L" : "M"}${e(f.t).toFixed(1)},${i(f.v).toFixed(1)}`
      ).join(" ");
      if (r.push(d), s !== null) {
        const f = c[0], g = c[c.length - 1];
        a += `${d} L${e(g.t).toFixed(1)},${s.toFixed(1)} L${e(f.t).toFixed(1)},${s.toFixed(1)} Z `;
      }
      c = [];
    };
    for (const d of t || [])
      n !== null && d.t - n > 15 * 6e4 && l(), c.push(d), n = d.t;
    return l(), { line: r.join(" "), fill: a.trim() };
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const s = this.renderRoot.querySelector(e);
      s && i && this._interactionHandles.push(
        T(s, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house-key", this._config?.house_entity), t(".solar-key", this._config?.solar_entity), t(".grid-key", this._config?.grid_entity);
  }
  render() {
    if (!this._config) return o``;
    const t = (this._series.house?.length || 0) > 0 || (this._series.solar?.length || 0) > 0 || (this._series.grid?.length || 0) > 0, e = this._config.calendar_day ? this._selectedDay === j.today(this.hass) ? "Today" : Di(this.hass, this._selectedDay || "", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }) : null, i = e ? `${e} · ${this._config.bucket_minutes || 10}-minute average` : `${this._config.bucket_minutes || 10}-minute average`, s = 800, r = 420, a = 58, n = 8, c = 6, l = Math.round(r * 0.7), d = l + 20, f = d + 18, g = r - 18, h = a, u = s - n, p = this._start || Date.now() - 864e5, _ = this._end || Date.now(), m = (N) => h + (N - p) / (_ - p) * (u - h), b = [
      ...this._series.house || [],
      ...this._series.solar || []
    ].map((N) => Math.max(0, N.v)), $ = this._niceMax(Math.max(1, ...b) * 1.06), v = (N) => l - Math.max(0, N) / $ * (l - c), D = Math.max(
      100,
      ...(this._series.grid || []).map((N) => Math.abs(N.v))
    ), H = this._niceMax(D * 1.08), L = (f + g) / 2, M = (N) => L - N / H * ((g - f) / 2), w = this._paths(this._series.house, m, v), z = this._paths(this._series.solar, m, v, l), U = this._paths(this._series.grid, m, M);
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
              viewBox="0 0 ${s} ${r}"
              role="img"
              aria-label="Household power history"
              @pointerdown=${(N) => {
      this._pointerState = {
        id: N.pointerId,
        x: N.clientX,
        y: N.clientY,
        moved: !1
      };
    }}
              @pointermove=${(N) => {
      this._pointerState && Math.hypot(
        N.clientX - this._pointerState.x,
        N.clientY - this._pointerState.y
      ) > 6 && (this._pointerState.moved = !0);
    }}
              @pointerup=${() => {
      this._pointerState = null;
    }}
            >
              ${[0, 1, 2, 3, 4].map((N) => {
      const K = $ * (1 - N / 4), Y = c + (l - c) * (N / 4);
      return o`
                  <line
                    class="gridline"
                    x1="${h}"
                    y1="${Y}"
                    x2="${u}"
                    y2="${Y}"
                  ></line>
                  <text
                    class="axis"
                    x="${h - 8}"
                    y="${Y + 4}"
                    text-anchor="end"
                  >
                    ${gt(this.hass, K)}
                  </text>
                `;
    })}
              ${[0, 1, 2, 3, 4, 5, 6].map((N) => {
      const K = p + (_ - p) * N / 6, Y = m(K), Vt = new Date(K).getMinutes() === 0 ? ni(this.hass, K, { minute: void 0 }) : ni(this.hass, K);
      return o`
                  <text
                    class="axis"
                    x="${Y}"
                    y="${d}"
                    text-anchor="${N === 0 ? "start" : N === 6 ? "end" : "middle"}"
                  >
                    ${Vt}
                  </text>
                `;
    })}

              <line
                class="zero"
                x1="${h}"
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

              ${z.fill ? o`<path class="solar-fill" d="${z.fill}"></path>` : ""}
              ${z.line ? o`<path class="solar-line" d="${z.line}"></path>` : ""}
              ${w.line ? o`<path class="house-line" d="${w.line}"></path>` : ""}
              ${U.line ? o`<path class="grid-line" d="${U.line}"></path>` : ""}
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
Nt.styles = kc;
Ui([
  x()
], Nt.prototype, "_series", 2);
Ui([
  x()
], Nt.prototype, "_loading", 2);
Ui([
  x()
], Nt.prototype, "_selectedDay", 2);
Nt = Ui([
  k("energy-history-card-v3")
], Nt);
E({
  type: "energy-history-card-v3",
  element: Nt,
  name: "Energy History",
  description: "Dense readable power history supporting rolling or local calendar-day ranges using completed 10-minute averages and a signed grid strip."
});
var Dc = Object.getOwnPropertyDescriptor, Tc = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Dc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const Pc = {
  type: "custom:component-energy-dashboard-v1",
  profile: "household-energy",
  day_channel: "energy-day",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let Re = class extends A {
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Pc, ...t });
  }
  getCardSize() {
    return 12;
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.profile || "household-energy", e = this._config.day_channel || "energy-day", i = this._config.weather_entity || "weather.forecast_home", s = this._config.sun_entity || "sun.sun";
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
      sun_entity: s
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
Re.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
Re.styles = mc;
Re = Tc([
  k("component-energy-dashboard-v1")
], Re);
E({
  type: "component-energy-dashboard-v1",
  element: Re,
  name: "Energy Dashboard V1",
  description: "Single-card Energy composition using shared day state and one backend data contract."
});
const Oc = [
  P,
  O,
  gs,
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
var zc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, ks = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ic(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && zc(e, i, r), r;
};
const Rc = {
  type: "custom:component-history-graph-v2",
  meta_text: "Aggregation label",
  series_1_label: "Primary series",
  series_2_label: "Secondary series",
  series_3_label: "Supporting series",
  positive_label: "Positive",
  negative_label: "Negative"
};
let fe = class extends A {
  constructor() {
    super(...arguments), this._hiddenSeries = /* @__PURE__ */ new Set(), this._tooltip = {
      show: !1,
      percent: "",
      rows: [],
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
    super.setConfig({ ...Rc, ...t });
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
    this._tooltip = { show: !1, percent: "", rows: [], x: 0, y: 0 };
  }
  _handlePointer(t) {
    const e = this.renderRoot.querySelector(".chart");
    if (!e) return;
    const i = e.getBoundingClientRect(), s = Math.max(320, Math.round(i.width || 800)), r = s < 520 ? 48 : 58, a = 8, n = r, c = s - a, l = (t.clientX - i.left) * (s / i.width), d = Math.max(n, Math.min(c, l)), f = (d - n) / (c - n), g = Math.round(f * 100), h = [
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
    ].filter(([u]) => !this._hiddenSeries.has(Number(u)));
    this._tooltip = {
      show: !0,
      percent: `${g}% through range`,
      rows: h.map(([, u, p]) => ({
        label: String(u),
        value: String(p)
      })),
      x: d / s * i.width,
      y: Math.max(70, i.height * 0.42)
    };
  }
  render() {
    if (!this._config) return o``;
    const t = 800, e = 420, i = 58, s = 8, r = 6, a = Math.round(e * 0.7), n = a + 20, c = n + 18, l = e - 18, d = i, f = t - s, g = f - d, h = a - r, u = (c + l) / 2, p = (D, H) => `${(d + g * D).toFixed(1)},${(r + h * H).toFixed(1)}`, _ = (D, H) => `${(d + g * D).toFixed(1)},${(u + (l - c) * 0.32 * H).toFixed(1)}`, m = `M${p(0, 0.68)} L${p(0.08, 0.61)} L${p(0.17, 0.7)} L${p(0.26, 0.38)} L${p(0.35, 0.52)} L${p(0.44, 0.24)} L${p(0.53, 0.43)} L${p(0.62, 0.35)} L${p(0.72, 0.63)} L${p(0.82, 0.48)} L${p(0.91, 0.59)} L${p(1, 0.44)}`, b = `M${p(0, 0.86)} L${p(0.12, 0.75)} L${p(0.24, 0.52)} L${p(0.36, 0.42)} L${p(0.48, 0.55)} L${p(0.6, 0.72)} L${p(0.72, 0.82)} L${p(0.84, 0.91)} L${p(1, 0.94)}`, $ = `M${_(0, 0.08)} L${_(0.1, -0.1)} L${_(0.2, 0.12)} L${_(0.3, -0.2)} L${_(0.4, 0.02)} L${_(0.5, -0.35)} L${_(0.6, 0.16)} L${_(0.7, 0.28)} L${_(0.8, -0.12)} L${_(0.9, 0.05)} L${_(1, -0.08)}`, v = `${b} L${f},${a} L${d},${a} Z`;
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
              @pointerdown=${(D) => {
      this._pointerState = {
        id: D.pointerId,
        x: D.clientX,
        y: D.clientY,
        moved: !1
      }, this._handlePointer(D);
    }}
              @pointermove=${(D) => {
      if (this._pointerState?.id === D.pointerId) {
        Math.hypot(
          D.clientX - this._pointerState.x,
          D.clientY - this._pointerState.y
        ) > 6 && (this._pointerState.moved = !0), this._handlePointer(D);
        return;
      }
      !this._pinned && D.pointerType !== "touch" && this._handlePointer(D);
    }}
              @pointerup=${(D) => {
      const H = this._pointerState;
      !H || H.id !== D.pointerId || (this._pointerState = null, H.moved ? (this._pinned = !1, D.pointerType === "touch" && this._hideTip()) : this._pinned ? (this._pinned = !1, this._hideTip()) : (this._handlePointer(D), this._pinned = !0));
    }}
              @pointerleave=${() => {
      !this._pinned && !this._pointerState && this._hideTip();
    }}
            >
              ${["Max", "75%", "50%", "25%", "0"].map((D, H) => {
      const L = r + h * H / 4;
      return o`
                  <line
                    class="grid"
                    x1="${d}"
                    y1="${L}"
                    x2="${f}"
                    y2="${L}"
                  ></line>
                  <text
                    class="axis"
                    x="${d - 8}"
                    y="${L + 4}"
                    text-anchor="end"
                    >${D}</text
                  >
                `;
    })}
              ${["Start", "¼", "½", "¾", "End"].map((D, H) => {
      const L = d + g * H / 4;
      return o`
                  <text
                    class="axis"
                    x="${L}"
                    y="${n}"
                    text-anchor="${H === 0 ? "start" : H === 4 ? "end" : "middle"}"
                  >
                    ${D}
                  </text>
                `;
    })}
              <line
                class="zero"
                x1="${d}"
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
                      <path class="l2" d="${b}"></path>
                    `}
              ${this._hiddenSeries.has(1) ? "" : o`<path class="l1" d="${m}"></path>`}
              ${this._hiddenSeries.has(3) ? "" : o`<path class="l3" d="${$}"></path>`}
              ${this._tooltip.show ? o`<line
                      class="cursor"
                      x1="${this._tooltip.x}"
                      y1="${r}"
                      x2="${this._tooltip.x}"
                      y2="${l}"
                    ></line>` : ""}
            </svg>

            <div
              class="tooltip ${this._tooltip.show ? "show" : ""}"
              style="left:${this._tooltip.x}px; top:${this._tooltip.y}px;"
            >
              <div class="tooltip-time">${this._tooltip.percent}</div>
              ${this._tooltip.rows.map(
      (D) => o`<div class="tooltip-row">
                  <span>${D.label}</span><b class="tooltip-val">${D.value}</b>
                </div>`
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
fe.styles = Oc;
ks([
  x()
], fe.prototype, "_hiddenSeries", 2);
ks([
  x()
], fe.prototype, "_tooltip", 2);
fe = ks([
  k("component-history-graph-v2")
], fe);
E({
  type: "component-history-graph-v2",
  element: fe,
  name: "History Graph",
  description: "Reusable interactive history graph component."
});
const Hc = [
  P,
  O,
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
var Nc = Object.defineProperty, Lc = Object.getOwnPropertyDescriptor, Ge = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Lc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Nc(e, i, r), r;
};
const Mc = {
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
let Ct = class extends A {
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
    if (super.setConfig({ ...Mc, ...t }), this.isConnected && e !== this._config?.day_channel) {
      this._dayUnsubscribe?.();
      const i = this._config?.day_channel || "energy-day";
      this._selectedDay = j.get(i, this.hass), this._dayUnsubscribe = j.subscribe(
        i,
        (s) => this._onDayChange(s.day)
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
    const t = lr(this.hass, this._selectedDay);
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
        for (const s of i.entities || [])
          typeof s == "string" && t.add(s);
        for (const s of i.terms || [])
          typeof s?.entity == "string" && t.add(s.entity);
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
      const s = await this.hass.callWS({
        type: "recorder/statistics_during_period",
        start_time: new Date(i.start).toISOString(),
        end_time: new Date(i.end).toISOString(),
        statistic_ids: t.change,
        period: "5minute",
        types: ["change"]
      });
      if (e !== this._currentKey()) return;
      const r = {};
      for (const a of t.change) {
        const c = (s?.[a] || []).filter((l) => {
          const d = typeof l.start == "number" ? l.start : Date.parse(l.start);
          return Number.isFinite(d) && d >= i.start && d < i.end;
        }).map((l) => Number(l.change)).filter(Number.isFinite);
        r[a] = {
          change: c.length ? c.reduce((l, d) => l + d, 0) : null
        };
      }
      this._stats = r, this._lastKey = e;
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
      return xt(this.hass, this._number(t.entity, "change"));
    if (e === "energy_kwh_day_sum") {
      if (!Array.isArray(t.entities) || !t.entities.length) return "—";
      let s = 0;
      for (const r of t.entities) {
        const a = this._number(r, "change");
        if (a === null) return "—";
        s += a;
      }
      return xt(this.hass, s);
    }
    if (e === "energy_kwh_day_formula") {
      if (!Array.isArray(t.terms) || !t.terms.length) return "—";
      let s = 0;
      for (const r of t.terms) {
        const a = this._number(r?.entity, "change");
        if (a === null) return "—";
        s += a * (Number.isFinite(Number(r.factor)) ? Number(r.factor) : 1);
      }
      return xt(this.hass, s);
    }
    if (["watts", "watts_abs"].includes(e))
      return gt(this.hass, this._liveNumber(t.entity), {
        absolute: e === "watts_abs"
      });
    if (e === "grid_import_watts") {
      const s = this._liveNumber(t.entity), r = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return s === null ? "—" : `${Math.round(s >= r ? s : 0)} W`;
    }
    if (e === "grid_export_watts") {
      const s = this._liveNumber(t.entity), r = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return s === null ? "—" : `${Math.round(s <= -r ? Math.abs(s) : 0)} W`;
    }
    if (e === "grid_label") {
      const s = this._liveNumber(t.entity), r = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return s === null ? "Live grid" : s >= r ? "Live grid import" : s <= -r ? "Live grid export" : "Live grid flow";
    }
    if (e === "grid_direction") {
      const s = this._liveNumber(t.entity), r = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return s === null ? "Unavailable" : s >= r ? "Importing now" : s <= -r ? "Exporting now" : "Balanced now";
    }
    if (!t.entity) return "";
    const i = this.hass?.states?.[t.entity];
    return i ? String(i.state) : t.unavailable || "Unavailable";
  }
  updated() {
    for (const r of this._interactionHandles) r.destroy();
    this._interactionHandles = [];
    const t = this.renderRoot.querySelector(
      ".left"
    ), e = this.renderRoot.querySelector(
      ".right"
    ), i = this._clickEntity("left"), s = this._clickEntity("right");
    t && i && this._interactionHandles.push(
      T(t, {
        primary: () => this.moreInfo(i),
        feedback: !0
      })
    ), e && s && this._interactionHandles.push(
      T(e, {
        primary: () => this.moreInfo(s),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._resolve(this._config.left_value), e = this._resolve(this._config.left_label), i = this._resolve(this._config.right_value), s = this._resolve(this._config.right_label), r = this._resolve(this._config.right_primary), a = this._resolve(this._config.right_secondary), n = this._clickEntity("left"), c = this._clickEntity("right"), l = [e, t].filter(Boolean).join(": "), d = [i, s, r, a].filter(Boolean).join(" ");
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
            aria-label="${this.esc(d || "Right metric")}"
          >
            <div class="right-top">
              <span class="right-value">${this.esc(i)}</span>
              <span class="right-label">${this.esc(s)}</span>
            </div>
            <div class="right-bottom">
              <span class="right-primary">${this.esc(r)}</span>
              <span class="right-secondary">${this.esc(a)}</span>
            </div>
          </button>
        </div>
      </ha-card>
    `;
  }
};
Ct.styles = Hc;
Ge([
  x()
], Ct.prototype, "_selectedDay", 2);
Ge([
  x()
], Ct.prototype, "_stats", 2);
Ge([
  x()
], Ct.prototype, "_loading", 2);
Ge([
  x()
], Ct.prototype, "_error", 2);
Ct = Ge([
  k("metric-pair-card-v3")
], Ct);
E({
  type: "metric-pair-card-v3",
  element: Ct,
  name: "Metric Pair",
  description: "Live power metrics with selected-day energy totals."
});
const qc = [
  P,
  O,
  G,
  V,
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
var Uc = Object.defineProperty, jc = Object.getOwnPropertyDescriptor, Ke = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? jc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Uc(e, i, r), r;
};
const Zi = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
let kt = class extends A {
  constructor() {
    super(...arguments), this.minimal = !1, this._selected = [], this._registry = null, this._interactionHandles = [], this._unsubRegistry = null, this._registryHass = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = Array.isArray(t?.helpers) ? t.helpers.filter((r) => typeof r == "string") : [], i = Array.isArray(t?.items) ? t.items.slice(0, 4) : [], s = String(t?.preference_key || "").trim();
    super.setConfig({
      title: "Favourites",
      max: 4,
      show_header: e.length > 0 || !!s,
      ...t || {},
      helpers: s ? [] : e.slice(0, 4),
      items: i,
      preference_key: s || null
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
    super.willUpdate(t), t.has("hass") && t.get("hass") !== this.hass && (this._registry = null, this._unsubscribeRegistryEvents()), t.has("hass") && this.hass && (this._subscribeRegistryEvents(), this._ensureRegistry(), this._config?.helpers?.length && !this._config?.preference_key && this._loadBackendFavourites());
  }
  _subscribeRegistryEvents() {
    if (!this.isConnected || !this.hass || this._registryHass === this.hass && this._unsubRegistry) return;
    this._unsubscribeRegistryEvents();
    const t = this.hass;
    this._registryHass = t, this._unsubRegistry = W.subscribe(t, (e) => {
      this.hass === t && this._buildRegistryIndex(e);
    });
  }
  _unsubscribeRegistryEvents() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._registryHass = null;
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
        this._selected = Array.isArray(i) ? i.map((s) => this._normaliseRef(s)).filter((s) => !!s).slice(0, this._config.max || 4) : [];
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
    if (!t || Zi.has(String(t).toLowerCase())) return null;
    try {
      return this._normaliseRef(JSON.parse(t));
    } catch {
      return null;
    }
  }
  _buildRegistryIndex(t) {
    const e = t.entities || [], i = t.devices || [], s = t.areas || [], r = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
    for (const n of e) {
      const c = this._entryKey(n);
      c && r.set(c, n), n.device_id && (a.has(n.device_id) || a.set(n.device_id, []), a.get(n.device_id).push(n));
    }
    this._registry = {
      entities: e,
      devices: new Map(i.map((n) => [n.id, n])),
      areas: new Map(s.map((n) => [n.area_id, n.name])),
      byKey: r,
      byDevice: a
    };
  }
  async _ensureRegistry(t = !1) {
    if (!this.hass || this._registry && !t) return;
    const e = this.hass;
    try {
      const i = await W.load(e, t);
      this.hass === e && this._buildRegistryIndex(i);
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
      const i = t.state.attributes?.media_title, s = this._label(t.state.state);
      return i ? `${s} · ${i}` : s;
    }
    return this._label(t.state.state);
  }
  _label(t) {
    return String(t ?? "").replaceAll("_", " ").replace(/^./, (e) => e.toUpperCase());
  }
  _isActive(t) {
    if (!t.state || Zi.has(String(t.state.state).toLowerCase()))
      return !1;
    const e = this._domain(t.entry?.entity_id);
    return ["light", "switch", "fan", "input_boolean"].includes(e) ? t.state.state === "on" : e === "media_player" ? ["playing", "paused", "buffering", "on"].includes(t.state.state) : e === "climate" ? t.state.state !== "off" : e === "cover" ? t.state.state !== "closed" : e === "lock" ? t.state.state === "unlocked" : !1;
  }
  async _activate(t) {
    const e = this._selected[t];
    if (!e) return;
    const i = this._record(e);
    if (!i.entry || !i.state) return;
    const s = i.entry.entity_id, r = this._domain(s);
    if (["light", "switch", "fan", "input_boolean"].includes(r)) {
      if (!this.hass) return;
      await S(this.hass, {
        domain: "homeassistant",
        service: "toggle",
        target: { entity_id: s }
      });
    } else if (["automation", "script", "scene"].includes(r)) {
      const a = r === "automation" ? "trigger" : "turn_on";
      if (!this.hass) return;
      await S(this.hass, {
        domain: r,
        service: a,
        target: { entity_id: s }
      });
    } else if (["button", "input_button"].includes(r)) {
      if (!this.hass) return;
      await S(this.hass, {
        domain: r,
        service: "press",
        target: { entity_id: s }
      });
    } else
      this.moreInfo(s);
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll(".item button.main").forEach((e, i) => {
      const s = this._record(this._selected[i]);
      this._interactionHandles.push(
        T(e, {
          primary: () => this._activate(i),
          hold: () => {
            s.entry?.entity_id && this.moreInfo(s.entry.entity_id);
          },
          feedback: !0
        })
      );
    });
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.items || [];
    return t.length > 0 && !(this._config.helpers?.length || this._config.preference_key) ? o`${this._renderCompatibilityStyles()}
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
      ` : o`${this._renderCompatibilityStyles()}
      <ha-card>
        <div class="wrap">
          ${this._config.show_header !== !1 ? o`
                  <div class="head">
                    <div class="heading">
                      <ha-icon icon="mdi:star-outline"></ha-icon>
                      <h2>${this._config.title || "Favourites"}</h2>
                    </div>
                    <button class="edit" type="button" aria-label="Edit favourites">
                      <ha-icon
                        icon="${this.minimal ? "mdi:dots-horizontal" : "mdi:pencil-outline"}"
                      ></ha-icon>
                      <span>Edit</span>
                    </button>
                  </div>
                ` : ""}

          <div class="grid">
            ${this._selected.length === 0 ? o`<div class="empty">
                    Add up to four everyday controls here.
                  </div>` : this._selected.map((e) => {
      const i = this._record(e), s = this._name(i), r = this._stateLabel(i), a = this._icon(i), n = this._isActive(i), c = !i.state || Zi.has(String(i.state.state).toLowerCase());
      return o`
                      <div
                        class="item ${n ? "active" : ""} ${c ? "unavailable" : ""}"
                      >
                        <button
                          class="main"
                          type="button"
                          ?disabled=${c}
                          aria-label="${s}: ${r}"
                        >
                          <span class="icon">
                            <ha-icon icon="${a}"></ha-icon>
                          </span>
                          <span class="copy">
                            <div class="name">${s}</div>
                            <div class="state">${r}</div>
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
  _renderCompatibilityStyles() {
    return this.minimal ? o`<style>
      .heading h2{font-size:15px!important;font-weight:500!important}.heading ha-icon{color:var(--secondary-text-color)!important;--mdc-icon-size:17px!important}.edit{min-width:44px!important;min-height:44px!important;padding:0!important;color:var(--secondary-text-color)!important;font-weight:400!important}.edit ha-icon{--mdc-icon-size:16px!important}.edit span{display:none!important}.icon{color:var(--secondary-text-color)!important}.name{font-weight:500!important}.state{font-size:12px!important}.dialog-title,.confirm-title{font-size:16px!important;font-weight:500!important}.subheading,.group-title,.choice-name,.dialog-button{font-weight:500!important}.selected-meta,.choice-meta,.editor-copy{font-size:12px!important}
    </style>` : o``;
  }
};
kt.stubConfig = { helpers: [], max: 4, title: "Favourites" };
kt.styles = qc;
Ke([
  Mt({ attribute: !1 })
], kt.prototype, "minimal", 2);
Ke([
  x()
], kt.prototype, "_selected", 2);
Ke([
  x()
], kt.prototype, "_registry", 2);
kt = Ke([
  k("component-favourites-v3")
], kt);
let Ci = class extends A {
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
  render() {
    return this._config ? o`
      <component-favourites-v3
        .hass=${this.hass}
        .config=${this._config}
        .minimal=${!0}
      ></component-favourites-v3>
    ` : o``;
  }
};
Ci.styles = y`
    :host {
      display: block;
      min-width: 0;
    }
  `;
Ci = Ke([
  k("component-favourites-minimal-v1")
], Ci);
E({
  type: "component-favourites-v3",
  element: kt,
  name: "Favourites V3",
  description: "Stable household favourites with entity discovery and backend companion storage."
});
E({
  type: "component-favourites-minimal-v1",
  element: Ci,
  name: "Favourites Minimal",
  description: "Existing favourites behaviour with restrained Home typography."
});
const Fc = [
  P,
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
], Bc = [
  P,
  O,
  V,
  ot,
  G,
  y`
    .time {
      min-width: 0;
      white-space: nowrap;
    }
    .weather {
      white-space: nowrap;
      text-align: right;
    }
  `
];
var Vc = Object.getOwnPropertyDescriptor, Wc = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Vc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const Gc = {
  type: "custom:component-welcome-header-v1",
  weather_entity: "weather.forecast_home"
};
let ki = class extends A {
  constructor() {
    super(...arguments), this._cancelMinuteScheduler = null, this._interactionHandle = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (super.setConfig({ ...Gc, ...t }), !this._config?.weather_entity)
      throw new Error("weather_entity is required");
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = fr(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._cancelMinuteScheduler?.(), this._cancelMinuteScheduler = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  _number(t, e = 0) {
    const i = Number(t);
    return Number.isFinite(i) ? se(this.hass, i, {
      maximumFractionDigits: e,
      minimumFractionDigits: Number.isInteger(i) ? 0 : Math.min(1, e)
    }) : null;
  }
  updated() {
    const t = this.renderRoot.querySelector(".weather");
    t && (this._interactionHandle?.destroy(), this._interactionHandle = T(t, {
      primary: () => {
        this._config?.weather_entity && this.moreInfo(this._config.weather_entity);
      },
      feedback: !0
    }));
  }
  render() {
    if (!this._config) return o``;
    const t = /* @__PURE__ */ new Date(), i = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, s = Ai(this.hass), r = Si(this.hass), a = this._number(i.temperature, 1), n = this._number(i.cloud_coverage, 0), c = a === null ? "—" : `${a}${i.temperature_unit || "°C"}`, l = n === null ? "Cloud —" : `Cloud ${n}%`, d = new Intl.DateTimeFormat(r, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: s
    }).format(t), f = `Outside ${c}, ${l}. Open weather details.`;
    return o`
      <ha-card class="surface-card">
        <div class="control-item-row">
          <span class="copy-block">
            <span class="kpi-metric-md time">${d}</span>
          </span>
          <button
            class="btn-compact-pill weather"
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
ki.styles = Bc;
ki = Wc([
  k("component-welcome-header-v1")
], ki);
E({
  type: "component-welcome-header-v1",
  element: ki,
  name: "Welcome Header",
  description: "Compact live weather and home-time header."
});
const Kc = [
  P,
  O,
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
var Yc = Object.defineProperty, Qc = Object.getOwnPropertyDescriptor, ji = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Qc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Yc(e, i, r), r;
};
const Zc = {
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
let Lt = class extends A {
  constructor() {
    super(...arguments), this._registry = null, this._prefs = { order: [], hidden: [] }, this._renderedCards = [], this._cardElements = /* @__PURE__ */ new Map(), this._structureSig = "", this._gen = 0, this._unsubRegistry = null, this._registryHass = null;
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
    super.setConfig({ ...Zc, ...t }), this._structureSig = "", this.hass && (this._config?.pref_key && this._loadPrefs(), this._loadRegistry(), this._syncCards());
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), this._bindRegistry(), this._loadRegistry(), this._config?.pref_key && this._loadPrefs(), this._syncCards();
  }
  disconnectedCallback() {
    this._unbindRegistry(), this._gen += 1, super.disconnectedCallback();
  }
  willUpdate(t) {
    if (super.willUpdate(t), t.has("hass") && t.get("hass") !== this.hass && (this._registry = null, this._unbindRegistry()), t.has("hass") && this.hass) {
      this._bindRegistry();
      for (const e of this._cardElements.values())
        e.el.hass = this.hass;
      this._loadRegistry(), this._syncCards();
    }
  }
  _bindRegistry() {
    if (!this.isConnected || !this.hass || this._registryHass === this.hass && this._unsubRegistry) return;
    this._unbindRegistry();
    const t = this.hass;
    this._registryHass = t, this._unsubRegistry = W.subscribe(t, (e) => {
      this.hass === t && (this._registry = e, this._structureSig = "", this._syncCards());
    });
  }
  _unbindRegistry() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._registryHass = null;
  }
  async _loadRegistry() {
    if (!this.hass) return;
    const t = this.hass;
    try {
      const e = await W.load(t);
      if (this.hass !== t) return;
      this._registry = e, this._syncCards();
    } catch {
    }
  }
  async _loadPrefs() {
    !this.hass || !this._config?.pref_key || (this._prefs = await Tr(this.hass, this._config.pref_key), this._structureSig = "", this._syncCards());
  }
  async _syncCards() {
    if (!this.hass) return;
    const t = ++this._gen, e = Ji(
      this.hass,
      this._registry,
      {
        mode: this._config?.mode,
        area_id: this._config?.area_id,
        exclude_device_names: this._config?.exclude_device_names,
        prefs: this._prefs
      }
    ), i = JSON.stringify(
      e.map((r) => [r.entityId, r.signature])
    );
    if (i === this._structureSig) {
      for (const r of this._cardElements.values())
        r.el.hass = this.hass;
      return;
    }
    const s = /* @__PURE__ */ new Map();
    for (const r of e) {
      const a = this._cardElements.get(r.entityId);
      if (a && a.sig === r.signature) {
        a.el.hass = this.hass, s.set(r.entityId, a);
        continue;
      }
      try {
        const n = await zr(r.cardConfig, this.hass);
        if (t !== this._gen) return;
        s.set(r.entityId, { el: n, sig: r.signature });
      } catch {
      }
    }
    t === this._gen && (this._cardElements = s, this._structureSig = i, this._renderedCards = e.map((r) => s.get(r.entityId)?.el).filter((r) => !!r), this.requestUpdate());
  }
  async openEditor() {
    if (!this.hass || !this._config?.pref_key) return;
    const e = {
      order: Ji(this.hass, this._registry, {
        mode: this._config?.mode,
        area_id: this._config?.area_id,
        exclude_device_names: this._config?.exclude_device_names
      }).map((i) => i.entityId),
      hidden: [...this._prefs.hidden]
    };
    this._prefs = e, await Pr(this.hass, this._config.pref_key, e), this._structureSig = "", this._syncCards();
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
Lt.styles = Kc;
ji([
  x()
], Lt.prototype, "_registry", 2);
ji([
  x()
], Lt.prototype, "_prefs", 2);
ji([
  x()
], Lt.prototype, "_renderedCards", 2);
Lt = ji([
  k("component-smart-collection-v3")
], Lt);
E({
  type: "component-smart-collection-v3",
  element: Lt,
  name: "Smart Control Collection V3",
  description: "Stable registry-driven household controls without refresh teardown."
});
const Jc = [
  P,
  O,
  q,
  G,
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
var Xc = Object.defineProperty, tl = Object.getOwnPropertyDescriptor, Wr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? tl(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Xc(e, i, r), r;
};
const el = {
  type: "custom:component-household-directory-v3",
  pref_key: "home-control.household.v2",
  base_path: "/home-control",
  current_dashboard: "home-control",
  title: "Quick actions",
  icon: "mdi:gesture-tap-button",
  quick_action_label: "dashboard_quick_action"
}, nr = {
  automation: "trigger",
  scene: "turn_on",
  script: "turn_on",
  button: "press",
  input_button: "press"
};
let He = class extends A {
  constructor() {
    super(...arguments), this._registry = [], this._unsubRegistry = null, this._registryHass = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...el, ...t }), this.hass && this._loadRegistry();
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), this._bindRegistry(), this._loadRegistry();
  }
  disconnectedCallback() {
    this._unbindRegistry();
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate(t) {
    t.has("hass") && t.get("hass") !== this.hass && (this._registry = [], this._unbindRegistry()), this.hass && (this._bindRegistry(), (this._registry.length === 0 || t.has("hass")) && this._loadRegistry());
  }
  _bindRegistry() {
    if (!this.isConnected || !this.hass || this._registryHass === this.hass && this._unsubRegistry) return;
    this._unbindRegistry();
    const t = this.hass;
    this._registryHass = t, this._unsubRegistry = W.subscribe(t, (e) => {
      this.hass === t && (this._registry = e.entities || []);
    });
  }
  _unbindRegistry() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._registryHass = null;
  }
  async _loadRegistry() {
    if (!this.hass) return;
    const t = this.hass;
    try {
      const e = await W.load(t);
      this.hass === t && (this._registry = e.entities || []);
    } catch {
    }
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
    const i = this._config?.quick_action_label || "dashboard_quick_action", s = this._registry.filter((r) => {
      if (r.disabled_by || r.hidden_by) return !1;
      const a = r.entity_id.split(".")[0];
      return !Object.prototype.hasOwnProperty.call(
        nr,
        a
      ) && !(a === "todo") ? !1 : (Array.isArray(r.labels) ? r.labels : []).includes(i);
    });
    for (const r of s) {
      const a = this.hass.states[r.entity_id], n = r.entity_id.split(".")[0], c = a?.attributes?.friendly_name || r.name || r.original_name || r.entity_id, l = a?.attributes?.icon || r.icon || r.original_icon || "mdi:flash";
      n === "todo" ? t.push({
        id: r.entity_id,
        name: c.replace(/\s+List$/i, ""),
        icon: l,
        kind: "entity",
        entity: r.entity_id,
        meta: "To-do list"
      }) : t.push({
        id: r.entity_id,
        name: c,
        icon: l,
        kind: "action",
        entity: r.entity_id,
        domain: n,
        service: nr[n],
        meta: "Quick action"
      });
    }
    return t;
  }
  async _runAction(t) {
    !this.hass || !t.domain || !t.service || !t.entity || await S(this.hass, {
      domain: t.domain,
      service: t.service,
      target: { entity_id: t.entity }
    });
  }
  updated() {
    for (const i of this._interactionHandles) i.destroy();
    this._interactionHandles = [];
    const t = Array.from(
      this.renderRoot.querySelectorAll("button.item")
    ), e = this._items();
    t.forEach((i, s) => {
      const r = e[s];
      if (!r) return;
      let a = null;
      r.kind === "nav" && r.path ? a = () => cr(r.path) : r.kind === "action" ? a = () => this._runAction(r) : r.kind === "entity" && r.entity && (a = () => this.moreInfo(r.entity)), a && this._interactionHandles.push(
        T(i, {
          primary: a,
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
He.styles = Jc;
Wr([
  x()
], He.prototype, "_registry", 2);
He = Wr([
  k("component-household-directory-v3")
], He);
E({
  type: "component-household-directory-v3",
  element: He,
  name: "Household Directory V3",
  description: "Global views and label-driven quick actions directory."
});
const il = [
  P,
  O,
  V,
  qt,
  q,
  G,
  St,
  _r,
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
      background: var(--dashboard-card-surface);
      border-color: hsl(var(--room-active-hue) 72% 52% / 0.72);
      box-shadow: 0 0 8px hsl(var(--room-active-hue) 72% 52% / 0.26);
    }
    .room.warning {
      background: var(--dashboard-warning-surface);
      border-left: 3px solid var(--warning-color);
    }
    .room.critical {
      background: var(--dashboard-critical-surface);
      border-left: 3px solid var(--error-color);
    }
    .room .ico,
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
    .room.active .ico,
    .room.active .icon {
      color: var(--primary-color);
    }
    .room.warning .ico,
    .room.warning .icon {
      color: var(--warning-color);
    }
    .room.critical .ico,
    .room.critical .icon {
      color: var(--error-color);
    }
    .room .ico ha-icon,
    .room .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .room .copy {
      min-width: 0;
    }
    .room .name,
    .room .title {
      font-size: 13px;
      font-weight: 600;
      line-height: 1.25;
      color: var(--primary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .room .summary,
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
    @media (prefers-reduced-motion: reduce) {
      .room.active {
        box-shadow: none;
      }
    }
  `
];
var sl = Object.defineProperty, rl = Object.getOwnPropertyDescriptor, Ss = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? rl(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && sl(e, i, r), r;
};
const al = {
  type: "custom:component-room-directory-v4",
  title: "Rooms",
  icon: "mdi:floor-plan",
  mode: "home",
  pref_key: "home-control.rooms.v2",
  navigation_path: null,
  base_path: "/home-control"
};
let be = class extends A {
  constructor() {
    super(...arguments), this._registries = null, this._activeArea = null, this._unsubRegistry = null, this._registryHass = null, this._dialogOpener = null, this._handleDialogClose = () => {
      this._activeArea = null;
      const t = this._dialogOpener;
      this._dialogOpener = null, t?.focus?.();
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...al, ...t }), this._bindRegistry();
  }
  getCardSize() {
    return 4;
  }
  connectedCallback() {
    super.connectedCallback(), this._bindRegistry();
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._registryHass = null, super.disconnectedCallback();
  }
  willUpdate(t) {
    super.willUpdate(t), t.has("hass") && this._bindRegistry();
  }
  _bindRegistry() {
    if (!this.isConnected || !this.hass || this._registryHass === this.hass && this._unsubRegistry) return;
    this._unsubRegistry?.(), this._registryHass = this.hass;
    const t = this.hass;
    this._unsubRegistry = W.subscribe(t, (e) => {
      this._registryHass === t && (this._registries = e);
    });
  }
  _activeHue(t) {
    let e = 0;
    for (const i of t)
      e = e * 31 + i.charCodeAt(0) >>> 0;
    return 12 + e % 336;
  }
  _areas() {
    return [...this._registries?.areas || []].sort(
      (e, i) => e.name.localeCompare(i.name, void 0, { sensitivity: "base" })
    );
  }
  _areaStatus(t) {
    return Ir(t, this._registries, this.hass);
  }
  _openRoom(t, e) {
    this._dialogOpener = e || null, this._activeArea = t, this.updateComplete.then(() => {
      const i = this.renderRoot.querySelector(
        "dialog"
      );
      if (!(!i || i.open))
        try {
          i.showModal(), i.querySelector("button.close")?.focus();
        } catch {
          this._activeArea = null, this._dialogOpener = null;
        }
    });
  }
  _closeRoom() {
    const t = this.renderRoot.querySelector(
      "dialog"
    );
    t?.open ? t.close() : this._handleDialogClose();
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
      const i = this._areaStatus(e), r = i.severity === "active" ? `. ${i.activeDeviceCount} active device${i.activeDeviceCount === 1 ? "" : "s"}` : "";
      return o`
              <button
                class="room ${i.severity}"
                type="button"
                style="--room-active-hue: ${this._activeHue(e.area_id)}"
                aria-label="Open ${e.name}${i.summary ? ". " + i.summary : ""}${r}"
                @click=${(a) => this._openRoom(e, a.currentTarget)}
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
        @close=${this._handleDialogClose}
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
be.styles = il;
Ss([
  x()
], be.prototype, "_registries", 2);
Ss([
  x()
], be.prototype, "_activeArea", 2);
be = Ss([
  k("component-room-directory-v4")
], be);
E({
  type: "component-room-directory-v4",
  element: be,
  name: "Room Directory V4",
  description: "Stable registry-driven rooms with full-height swipeable room sheets."
});
var nl = Object.getOwnPropertyDescriptor, Gr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? nl(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
const ol = {
  type: "custom:component-home-overview-v4",
  weather_entity: "weather.forecast_home",
  base_path: "/home-control",
  current_dashboard: "home-control",
  favourites_helpers: []
};
let Ne = class extends A {
  constructor() {
    super(...arguments), this._weatherInteraction = null, this._cancelMinuteScheduler = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      ...ol,
      ...t,
      favourites_helpers: []
    });
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = fr(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._cancelMinuteScheduler?.(), this._cancelMinuteScheduler = null, this._weatherInteraction?.destroy(), this._weatherInteraction = null, super.disconnectedCallback();
  }
  updated() {
    const t = this.renderRoot.querySelector(".weather");
    t && (this._weatherInteraction?.destroy(), this._weatherInteraction = T(t, {
      primary: () => {
        this._config?.weather_entity && this.moreInfo(this._config.weather_entity);
      },
      feedback: !0
    }));
  }
  render() {
    if (!this._config) return o``;
    const t = /* @__PURE__ */ new Date(), e = Ai(this.hass), i = Si(this.hass), s = new Intl.DateTimeFormat(i, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: e
    }).format(t), a = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, n = Number(a.temperature), c = Number.isFinite(n) ? `${se(this.hass, n, { maximumFractionDigits: 1 })}${a.temperature_unit || "°C"}` : "—", l = Number(a.cloud_coverage), d = Number.isFinite(l) ? `Cloud ${Math.round(l)}%` : "Cloud —", f = `${c} · ${d}`, g = `Outside ${c}, ${d}. Open weather details.`, h = this._config.base_path || "/home-control", u = this._config.current_dashboard || "home-control";
    return o`
      <ha-card>
        <div class="top">
          <span class="time">${s}</span>
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
      base_path: h,
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
      base_path: h,
      navigation_path: `${h}/rooms`
    }}
          ></component-room-directory-v4>
        </div>
      </ha-card>
    `;
  }
};
Ne.styles = Fc;
Ne = Gr([
  k("component-home-overview-v4")
], Ne);
let ts = class extends Ne {
};
ts = Gr([
  k("component-home-overview-v5")
], ts);
E({
  type: "component-home-overview-v4",
  element: Ne,
  name: "Home Overview V4",
  description: "Stable minimal Home overview without state-refresh teardown."
});
E({
  type: "component-home-overview-v5",
  element: ts,
  name: "Home Overview V5",
  description: "Stable minimal Home overview without state-refresh teardown (v5 alias)."
});
const cl = [
  P,
  O,
  q,
  G,
  pt,
  St,
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
      transition:
        transform 0.15s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        background-color 0.25s ease;
    }
    .issue:active {
      box-shadow: 0 0 0 1px var(--warning-color),
                  0 0 16px 3px color-mix(in srgb, var(--warning-color) 50%, transparent) !important;
      transform: scale(0.985);
    }
    .issue.critical {
      border-left-color: var(--error-color);
      background: var(--dashboard-critical-surface);
    }
    .issue.critical:active {
      box-shadow: 0 0 0 1px var(--error-color),
                  0 0 16px 3px color-mix(in srgb, var(--error-color) 50%, transparent) !important;
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
var ll = Object.defineProperty, dl = Object.getOwnPropertyDescriptor, As = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? dl(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && ll(e, i, r), r;
};
const hl = {
  type: "custom:component-household-attention-v2",
  title: "Attention",
  icon: "mdi:alert-circle-outline",
  quiet_title: "Everything quiet",
  quiet_subtitle: "No security or hardware alerts",
  quiet_icon: "mdi:check-circle-outline"
};
let _e = class extends A {
  constructor() {
    super(...arguments), this._registry = null, this._unsubRegistry = null, this._registryHass = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...hl, ...t }), this.hass && !this._config?.demo && this._loadRegistry();
  }
  getCardSize() {
    return this._config?.demo ? 2 : 1;
  }
  connectedCallback() {
    super.connectedCallback(), this._bindRegistry(), this._loadRegistry();
  }
  disconnectedCallback() {
    this._unbindRegistry();
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate(t) {
    t.has("hass") && t.get("hass") !== this.hass && (this._registry = null, this._unbindRegistry()), this.hass && !this._config?.demo && (this._bindRegistry(), (!this._registry || t.has("hass")) && this._loadRegistry());
  }
  _bindRegistry() {
    if (!this.isConnected || !this.hass || this._config?.demo || this._registryHass === this.hass && this._unsubRegistry) return;
    this._unbindRegistry();
    const t = this.hass;
    this._registryHass = t, this._unsubRegistry = W.subscribe(t, (e) => {
      this.hass === t && (this._registry = e.entities || []);
    });
  }
  _unbindRegistry() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._registryHass = null;
  }
  async _loadRegistry() {
    if (!this.hass || this._config?.demo) return;
    const t = this.hass;
    try {
      const e = await W.load(t);
      this.hass === t && (this._registry = e.entities || []);
    } catch {
    }
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
      const s = e.entity_id.split(".")[0], r = e.device_class || i.attributes?.device_class || "";
      let a = null;
      e.entity_id.endsWith("_controller_status") && i.state === "off" ? a = {
        status: "Controller offline",
        severity: "critical",
        severity_text: "Critical",
        icon: "mdi:access-point-network-off"
      } : s === "binary_sensor" && i.state === "on" && ["smoke", "moisture", "gas"].includes(r) ? a = {
        status: "Detected",
        severity: "critical",
        severity_text: "Critical",
        icon: r === "smoke" ? "mdi:smoke-detector-alert" : r === "gas" ? "mdi:gas-cylinder" : "mdi:water-alert"
      } : s === "binary_sensor" && i.state === "on" && ["door", "window", "garage_door"].includes(r) ? a = {
        status: "Open",
        severity: "warning",
        severity_text: "Check",
        icon: r === "window" ? "mdi:window-open-variant" : r === "garage_door" ? "mdi:garage-open" : "mdi:door-open"
      } : s === "lock" && i.state === "unlocked" && (a = {
        status: "Unlocked",
        severity: "warning",
        severity_text: "Check",
        icon: "mdi:lock-open-variant-outline"
      }), a && t.push({
        entity_id: e.entity_id,
        name: At({ entry: e, state: i }),
        status: a.status,
        severity: a.severity,
        severity_text: a.severity_text,
        icon: a.icon
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
    t.forEach((i, s) => {
      const r = e[s];
      r && this._interactionHandles.push(
        T(i, {
          primary: () => {
            this._config?.demo || this.moreInfo(r.entity_id);
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
_e.styles = cl;
As([
  x()
], _e.prototype, "_registry", 2);
_e = As([
  k("component-household-attention-v2")
], _e);
let es = class extends _e {
};
es = As([
  k("component-household-attention-v1")
], es);
E({
  type: "component-household-attention-v1",
  element: es,
  name: "Household Attention V1",
  description: "Aggregated safety and hardware attention queue (v1)."
});
E({
  type: "component-household-attention-v2",
  element: _e,
  name: "Household Attention V2",
  description: "Aggregated safety and hardware attention queue."
});
const pl = [
  P,
  G,
  O,
  pt,
  q,
  ot,
  y`
    :host {
      --tile-active-color: var(--primary-color, #03a9f4);
    }

    .tile-card {
      --action-glow-color: var(--tile-active-color, var(--primary-color, #03a9f4));
      transition:
        background-color 0.25s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.15s ease;
      cursor: pointer;
    }

    .tile-card.interactive:active:not(.unavailable) {
      border-color: var(--action-glow-color) !important;
      box-shadow: 0 0 0 1px var(--action-glow-color),
                  0 0 16px 3px color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
      transform: scale(0.985);
    }

    .tile-card.active {
      border-color: var(--tile-active-color);
    }

    .tile-row {
      grid-template-columns: 40px minmax(0, 1fr) auto;
    }

    .icon-well.active {
      color: var(--tile-active-color);
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
var ul = Object.defineProperty, ml = Object.getOwnPropertyDescriptor, Es = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ml(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && ul(e, i, r), r;
};
let Le = class extends wt {
  setConfig(t) {
    this._config = { ...t };
  }
  _valueChanged(t, e) {
    if (!this._config) return;
    const s = t.target.value;
    if (s === "") {
      const r = { ...this._config };
      delete r[e], this._config = r;
    } else
      this._config = {
        ...this._config,
        [e]: s
      };
    bt(this, "config-changed", { config: this._config });
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
Le.styles = [vr];
Es([
  Mt({ attribute: !1 })
], Le.prototype, "hass", 2);
Es([
  x()
], Le.prototype, "_config", 2);
Le = Es([
  k("ha-action-tile-editor")
], Le);
var gl = Object.getOwnPropertyDescriptor, fl = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? gl(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let is = class extends Ri {
  static async getConfigElement() {
    return document.createElement(
      "ha-action-tile-editor"
    );
  }
  static getStubConfig(t, e, i) {
    return {
      entity: e.find((r) => r.startsWith("light.") || r.startsWith("switch.")) || e[0] || "light.living_room",
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
    if (!this.hass || !this.config || Q(this.hass.states[this.config.entity])) return;
    const t = this.config.tap_action || { action: "toggle" };
    Ii(this, this.hass, t, this.config.entity);
  }
  _renderBadge() {
    if (!this.hass || !this.config) return F;
    if (this.config.badge_entity && this.hass.states[this.config.badge_entity]) {
      const e = this.hass.states[this.config.badge_entity];
      return o`
        <div class="capsule-badge">
          ${J(e, this.hass)}
        </div>
      `;
    }
    const t = this.hass.states[this.config.entity];
    if (t?.attributes?.brightness !== void 0 && ne(t)) {
      const e = Math.round(t.attributes.brightness / 255 * 100);
      return o`<div class="capsule-badge">${e}%</div>`;
    }
    return t?.attributes?.temperature !== void 0 ? o`<div class="capsule-badge">
        ${t.attributes.temperature}&deg;
      </div>` : F;
  }
  _handleKeyDown(t) {
    !this.hass || !this.config || Q(this.hass.states[this.config.entity]) || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._handleTileTap());
  }
  render() {
    if (!this.hass || !this.config?.entity)
      return this.renderError("No entity configured for ha-action-tile");
    const t = this.hass.states[this.config.entity];
    if (!t)
      return this.renderError(`Entity not found: ${this.config.entity}`);
    const e = dt(this.config.entity), i = Q(t), s = !i && ne(t), r = this.config.name || zi(t), a = this.config.icon || t.attributes.icon || ye(e, t.state), n = i ? "Unavailable" : J(t, this.hass), c = this.config.color || "#03a9f4";
    return o`
      <ha-card
        class="interactive surface-card tile-card ${s ? "active" : ""} ${i ? "unavailable" : ""}"
        style=${s ? `--tile-active-color: ${c};` : ""}
        role="button"
        tabindex="${i ? "-1" : "0"}"
        aria-pressed="${String(s)}"
        aria-disabled="${String(i)}"
        aria-label="${r}: ${n}"
        @click=${this._handleTileTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="header-row tile-row">
          <div class="icon-well control-radius ${s ? "active" : ""}">
              <ha-icon .icon=${a}></ha-icon>
          </div>
          <div class="copy-block">
            <div class="label-title" title=${r}>${r}</div>
            <div class="label-sub">${n}</div>
          </div>
          ${this._renderBadge()}
        </div>
      </ha-card>
    `;
  }
};
is.styles = pl;
is = fl([
  k("ha-action-tile")
], is);
const bl = [
  P,
  G,
  O,
  q,
  ot,
  y`
    .metric-badge-card {
      cursor: pointer;
    }

    .icon-well {
      color: var(--badge-accent-color, var(--primary-color));
    }

    .metric-value-line {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .unit-text {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
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
var _l = Object.getOwnPropertyDescriptor, vl = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? _l(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let ss = class extends Ri {
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
    if (!this.hass || !this.config || Q(this.hass.states[this.config.entity])) return;
    const t = this.config.tap_action || { action: "more-info" };
    Ii(this, this.hass, t, this.config.entity);
  }
  _computeColor(t) {
    if (!this.config?.thresholds || this.config.thresholds.length === 0)
      return "var(--primary-color, #03a9f4)";
    const e = [...this.config.thresholds].sort(
      (s, r) => s.value - r.value
    );
    let i = e[0].color;
    for (const s of e)
      t >= s.value && (i = s.color);
    return i;
  }
  render() {
    if (!this.hass || !this.config?.entity)
      return this.renderError("No entity configured for ha-metric-badge");
    const t = this.hass.states[this.config.entity];
    if (!t)
      return this.renderError(`Entity not found: ${this.config.entity}`);
    const e = dt(this.config.entity), i = Q(t), s = this.config.name || zi(t), r = this.config.icon || t.attributes.icon || ye(e, t.state), a = i ? NaN : parseFloat(t.state), n = !isNaN(a), c = n ? this._computeColor(a) : i ? "var(--secondary-text-color, #757575)" : "var(--primary-color, #03a9f4)", l = i ? "" : this.config.unit || t.attributes.unit_of_measurement || "", d = i ? "Unavailable" : n ? a : t.state;
    return o`
      <ha-card
        class="interactive surface-card metric-badge-card ${i ? "unavailable" : ""}"
        tabindex="${i ? "-1" : "0"}"
        role="button"
        style="--badge-accent-color: ${c};"
        @click=${this._handleTap}
        @keydown=${(f) => {
      i || (f.key === "Enter" || f.key === " ") && (f.preventDefault(), this._handleTap());
    }}
        aria-disabled="${String(i)}"
        aria-label="${s}: ${d}${l ? " " + l : ""}"
        title="${s}: ${J(t, this.hass)}"
      >
        <div class="header-row">
          <div class="icon-well control-radius">
            <ha-icon .icon=${r}></ha-icon>
          </div>
          <div class="copy-block metric-data">
            <div class="metric-value-line">
              <span class="kpi-metric-lg">${d}</span>
              ${l ? o`<span class="unit-text">${l}</span>` : ""}
            </div>
            <div class="label-sub" title=${s}>${s}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
ss.styles = bl;
ss = vl([
  k("ha-metric-badge")
], ss);
const yl = [
  P,
  O,
  pt,
  V,
  ut,
  y`
    .quick-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .quick-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .quick-item {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `
];
var xl = Object.getOwnPropertyDescriptor, wl = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? xl(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let rs = class extends Ri {
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
    if (!this.hass || Q(this.hass.states[t.entity])) return;
    const e = t.tap_action || { action: "toggle" };
    Ii(this, this.hass, e, t.entity);
  }
  render() {
    if (!this.hass || !this.config?.entities)
      return this.renderError("No entities configured for ha-quick-bar");
    const t = this.config.entities.map(
      (i) => typeof i == "string" ? { entity: i } : i
    );
    let e = 0;
    return t.forEach((i) => {
      const s = this.hass?.states[i.entity];
      s && !Q(s) && ne(s) && e++;
    }), o`
      <ha-card class="assembled-card">
        ${this.config.title || this.config.show_active_count ? o`
                <div class="quick-header">
                  <span class="label-title">${this.config.title || "Quick Controls"}</span>
                  ${this.config.show_active_count !== !1 ? o`
                          <span
                            class="capsule-badge ${e > 0 ? "active" : ""}"
                            aria-label="${e} devices active"
                          >
                            ${e} Active
                          </span>
                        ` : ""}
                </div>
              ` : ""}

        <div class="quick-actions" role="group" aria-label="${this.config.title || "Quick Controls"}">
          ${t.map((i) => {
      const s = this.hass?.states[i.entity], r = Q(s), a = !r && ne(s), n = dt(i.entity), c = i.name || zi(s), l = i.icon || s?.attributes?.icon || ye(n, s?.state), d = r ? "Unavailable" : J(s, this.hass);
      return o`
              <button
                class="btn-action-pill quick-item ${a ? "active" : ""}"
                type="button"
                role="button"
                tabindex="${r ? "-1" : "0"}"
                aria-pressed="${String(a)}"
                ?disabled=${r}
                aria-disabled="${String(r)}"
                aria-label="${c}: ${d}"
                title="${c}: ${d}"
                @click=${() => this._handleEntityTap(i)}
              >
                <ha-icon class="sm" .icon=${l}></ha-icon>
                <span>${c}</span>
              </button>
            `;
    })}
        </div>
      </ha-card>
    `;
  }
};
rs.styles = yl;
rs = wl([
  k("ha-quick-bar")
], rs);
const $l = [
  P,
  O,
  je,
  q,
  ot,
  ut,
  y`
    .status-card {
      transition:
        background-color 0.25s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.15s ease;
    }

    .status-card.interactive:active:not(.unavailable) {
      border-color: var(--primary-color) !important;
      box-shadow: 0 0 0 1px var(--primary-color),
                  0 0 16px 3px color-mix(in srgb, var(--primary-color) 50%, transparent) !important;
      transform: scale(0.985);
    }

    .icon-well.active {
      color: var(--primary-color);
    }

    .state-label {
      font-weight: 500;
      color: var(--state-color, inherit);
    }

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
var Cl = Object.defineProperty, kl = Object.getOwnPropertyDescriptor, Ds = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? kl(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (s ? n(e, i, r) : n(r)) || r);
  return s && r && Cl(e, i, r), r;
};
let Me = class extends wt {
  setConfig(t) {
    this._config = { ...t };
  }
  _valueChanged(t, e) {
    if (!this._config) return;
    const i = t.target;
    let s = i.type === "checkbox" ? i.checked : i.value;
    if (s === "") {
      const r = { ...this._config };
      delete r[e], this._config = r;
    } else
      this._config = {
        ...this._config,
        [e]: s
      };
    bt(this, "config-changed", { config: this._config });
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
Me.styles = [
  vr,
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
Ds([
  Mt({ attribute: !1 })
], Me.prototype, "hass", 2);
Ds([
  x()
], Me.prototype, "_config", 2);
Me = Ds([
  k("ha-status-card-editor")
], Me);
var Sl = Object.getOwnPropertyDescriptor, Al = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Sl(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let as = class extends Ri {
  static async getConfigElement() {
    return document.createElement(
      "ha-status-card-editor"
    );
  }
  static getStubConfig(t, e, i) {
    return {
      entity: e.find((r) => r.startsWith("light.") || r.startsWith("switch.")) || e[0] || "light.living_room",
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
    if (!this.hass || !this.config || Q(this.hass.states[this.config.entity])) return;
    const t = this.config.tap_action || { action: "more-info" };
    Ii(this, this.hass, t, this.config.entity);
  }
  _handleKeyDown(t) {
    !this.hass || !this.config || Q(this.hass.states[this.config.entity]) || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._handleTap());
  }
  async _handleToggle(t) {
    if (t.stopPropagation(), t.preventDefault(), !this.hass || !this.config?.entity) return;
    const e = this.hass.states[this.config.entity];
    if (Q(e)) return;
    const i = dt(this.config.entity), s = i === "lock" ? e.state === "locked" || e.state === "locking" ? "unlock" : "lock" : "toggle";
    await S(this.hass, {
      domain: i,
      service: s,
      target: { entity_id: this.config.entity }
    });
  }
  _renderIcon(t) {
    return t.startsWith("mdi:") ? o`<ha-icon .icon=${t}></ha-icon>` : o`<span>${t}</span>`;
  }
  _getSecondaryText(t, e) {
    if (e) return "Offline";
    const i = this.config?.secondary_info || "last-changed";
    if (i === "none") return "";
    if (i === "state") return J(t, this.hass);
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
    const e = dt(this.config.entity), i = Q(t), s = !i && ne(t), r = this.config.name || zi(t), a = this.config.icon || t.attributes.icon || ye(e, t.state), n = i ? "Unavailable" : J(t, this.hass), c = this._getSecondaryText(t, i), l = this.config.show_toggle !== !1 && ["light", "switch", "input_boolean", "fan", "lock"].includes(e), d = i ? "state-unavailable" : s ? "state-active" : "state-inactive";
    return o`
      <ha-card
        class="interactive status-card assembled-card ${i ? "unavailable" : ""}"
        role="button"
        tabindex="${i ? "-1" : "0"}"
        aria-disabled="${String(i)}"
        aria-label="${r}: ${n}"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="header-row ${d}">
          <div class="icon-well control-radius ${s ? "active" : ""}">
            ${this._renderIcon(a)}
          </div>

          <div class="copy-block">
            <div class="label-title" title=${r}>${r}</div>
            <div class="label-sub">
              ${c ? o`${c} &bull; ` : F}
              <span class="state-label">${n}</span>
            </div>
          </div>

          ${l ? o`
                  <button
                    class="toggle-btn"
                    role="switch"
                    aria-checked="${String(s)}"
                    ?disabled=${i}
                    aria-disabled="${String(i)}"
                    @click=${this._handleToggle}
                    aria-label="Toggle ${r}"
                    title="Toggle state"
                  >
                    <span class="switch-pill ${s ? "on" : ""}"><span></span></span>
                  </button>
                ` : F}
        </div>
      </ha-card>
    `;
  }
};
as.styles = $l;
as = Al([
  k("ha-status-card")
], as);
console.info(
  "%c HA-COMPONENT-LIBRARY %c 1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #03a9f4; background: #e1f5fe; font-weight: 700; border-radius: 0 3px 3px 0;"
);
export {
  li as ComponentActionV2,
  Ht as ComponentAppleTvControllerV1,
  Xi as ComponentCameraControllerV1,
  at as ComponentCameraControllerV2,
  di as ComponentContextStripV3,
  oe as ComponentControlRowV2,
  ce as ComponentDeviceAwareAutoEntitiesV1,
  le as ComponentDeviceDiscoveryV2,
  pi as ComponentEmptyStateV2,
  hi as ComponentEmptyStateV3,
  Re as ComponentEnergyDashboardV1,
  ge as ComponentEnergyDaySelectorV1,
  _t as ComponentEnergySummaryV1,
  Ci as ComponentFavouritesMinimalV1,
  kt as ComponentFavouritesV3,
  $t as ComponentGarageDoorControllerV1,
  fe as ComponentHistoryGraphV2,
  Ne as ComponentHomeOverviewV4,
  ts as ComponentHomeOverviewV5,
  es as ComponentHouseholdAttentionV1,
  _e as ComponentHouseholdAttentionV2,
  He as ComponentHouseholdDirectoryV3,
  ui as ComponentListV2,
  It as ComponentMediaRowV2,
  Ct as ComponentMetricPairCardV3,
  xi as ComponentNavigationTileV2,
  mi as ComponentNoticeV2,
  gi as ComponentProgressV2,
  wi as ComponentQuickNavigationV2,
  be as ComponentRoomDirectoryV4,
  ze as ComponentRoomNavigationV1,
  $i as ComponentRoomSheetV2,
  fi as ComponentSectionSeparatorV2,
  pe as ComponentSecurityCameraWallV3,
  nt as ComponentSecurityDashboardV1,
  ue as ComponentSecurityEntryPointsV1,
  me as ComponentSecuritySummaryV1,
  bi as ComponentSingleKpiV2,
  Lt as ComponentSmartCollectionV3,
  he as ComponentSplitControllerV4,
  _i as ComponentStatusRowV2,
  vi as ComponentTextEffectV1,
  yi as ComponentThreeStatV2,
  Rt as ComponentUpdateRowV3,
  de as ComponentUpdateSummaryV3,
  ki as ComponentWelcomeHeaderV1,
  ht as ComponentWledControllerV1,
  Da as DASHBOARD_BASE_CARD_STYLES,
  Oi as DASHBOARD_SHARED_STYLE_CSS,
  Rl as DASHBOARD_SHARED_STYLE_ID,
  Ka as DashboardRegistryCoordinator,
  Nt as EnergyHistoryCardV3,
  br as GLOBAL_THEME_CSS,
  Sa as GLOBAL_THEME_STYLE_ID,
  is as HaActionTile,
  Ri as HaBaseCard,
  zt as HaComponentLibraryConfigEditor,
  ss as HaMetricBadge,
  rs as HaQuickBar,
  as as HaStatusCard,
  et as HomeAssistantActionError,
  Wt as INTERACTION_DEFAULTS,
  A as LitBaseCard,
  Ea as PRESENTATIONAL_CARD_STYLES,
  Ie as SolarDaylightCardV7,
  Ta as UPDATE_CARD_STYLES,
  Qi as WLED_DOMAIN,
  ir as WLED_INVALID,
  Hr as WLED_NAME,
  on as actionCardStyles,
  ti as actionRole,
  pl as actionTileCardStyles,
  Sr as appleTvBundle,
  No as appleTvCardStyles,
  Or as applyPrefs,
  ee as areaOf,
  ut as assemblyStyles,
  pt as badgeProgressStyles,
  V as buttonStyles,
  lr as calendarDayRange,
  jo as cameraCardStyles,
  P as cardBaseStyles,
  W as centralRegistry,
  ql as commonCardStyles,
  Ir as computeAreaStatusSummary,
  dt as computeDomain,
  At as computeEntityDisplayName,
  zi as computeEntityName,
  vs as connectionId,
  hn as contextStripCardStyles,
  Ja as controlConfig,
  Ar as controlDomains,
  Ae as controlResolvers,
  po as controlRowCardStyles,
  je as controlStyles,
  gr as createAsyncBroker,
  zr as createCardElement,
  ka as createLifecycle,
  fr as createMinuteScheduler,
  ps as createRequestCoalescer,
  Ll as dashboardBaseCardStyles,
  sn as dashboardProfiles,
  Nl as dashboardTokens,
  Oe as dayKey,
  $e as dayKeyInZone,
  Dr as defaultControlConfig,
  yo as deviceAwareAutoEntitiesCardStyles,
  Co as deviceDiscoveryCardStyles,
  St as dialogStyles,
  Ji as discoverControls,
  R as domainOf,
  Nr as emptyStateCardStyles,
  mc as energyDashboardCardStyles,
  ie as energyDayData,
  gc as energyDaySelectorCardStyles,
  j as energyDayState,
  kc as energyHistoryCardStyles,
  _c as energySummaryCardStyles,
  Ca as ensureInteractionFeedback,
  Se as entryFilters,
  ai as escapeHtml,
  qc as favouritesCardStyles,
  ms as feedbackStyles,
  bt as fireEvent,
  _r as formControlStyles,
  Di as formatCalendarDay,
  Ei as formatDate,
  xt as formatEnergy,
  J as formatEntityState,
  gt as formatPower,
  ni as formatTime,
  kr as garageControl,
  Vo as garageDoorCardStyles,
  ye as getDefaultIconForDomain,
  us as globalTokens,
  Ii as handleAction,
  Ol as headerStyles,
  Bl as healthAwareRegistryLoad,
  Oc as historyGraphCardStyles,
  Fc as homeOverviewCardStyles,
  cl as householdAttentionCardStyles,
  Jc as householdDirectoryCardStyles,
  Il as iconBoxStyles,
  qt as iconButtonStyles,
  q as iconWellStyles,
  nn as initWledIntegration,
  Hl as injectDashboardTokens,
  Pl as injectGlobalTokens,
  ya as installConfigContract,
  T as interaction,
  xa as interactionStyles,
  Za as isActive,
  qa as isControlActive,
  _s as isDiagnosticOrPeripheral,
  ne as isEntityActive,
  ft as isEntityAvailable,
  Q as isEntityUnavailable,
  $r as isPeripheralEntity,
  Qa as isPotential,
  Ws as isPrimaryControl,
  Ul as isSensorMetric,
  _n as listCardStyles,
  Fl as loadDashboardRegistries,
  Tr as loadPrefs,
  Be as loadSecurityModel,
  Si as localeOf,
  fo as mediaRowCardStyles,
  bl as metricBadgeCardStyles,
  Hc as metricPairCardStyles,
  Cr as nativeClimateControlConfig,
  Yn as navTileCardStyles,
  cr as navigateTo,
  wn as noticeCardStyles,
  se as numberFormat,
  Kr as openMoreInfo,
  Tl as prefersReducedMotion,
  Pa as presentationalCardStyles,
  Sn as progressCardStyles,
  rn as ptzRole,
  yl as quickBarCardStyles,
  Xn as quickNavCardStyles,
  E as registerCard,
  Er as registerControlResolver,
  jl as registerDeviceResolver,
  wr as registerEntryFilter,
  Aa as remoteStyles,
  Ys as resolveDeviceCard,
  il as roomDirectoryCardStyles,
  so as roomNavigationCardStyles,
  oo as roomSheetCardStyles,
  ot as rowListStyles,
  zl as rowStyles,
  S as runServiceAction,
  Pr as savePrefs,
  Tn as sectionSeparatorCardStyles,
  ic as securityCameraWallCardStyles,
  Ni as securityCapabilityText,
  ac as securityDashboardCardStyles,
  Xe as securityEntityLabel,
  cc as securityEntryPointsCardStyles,
  an as securityModel,
  hc as securitySummaryCardStyles,
  Fe as separatorStyles,
  zn as singleKpiCardStyles,
  Kc as smartCollectionCardStyles,
  xc as solarDaylightCardStyles,
  Ko as splitAcCardStyles,
  Kt as splitIdentity,
  rt as stateNameOf,
  $l as statusCardCardStyles,
  Nn as statusRowCardStyles,
  G as surfaceStyles,
  er as switchRole,
  gs as telemetryStyles,
  Un as textEffectCardStyles,
  Vn as threeStatCardStyles,
  Ai as timeZoneOf,
  or as toText,
  O as typographyStyles,
  Hi as uiEntry,
  Ml as updateCardStyles,
  Do as updateRowCardStyles,
  zo as updateSummaryCardStyles,
  Rr as validDay,
  Pe as waitForEntityState,
  Bc as welcomeHeaderCardStyles,
  Xo as wledCardStyles
};
