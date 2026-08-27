const $r = (t) => t == null ? "" : String(t), ze = (t) => $r(t).replace(
  /[&<>"']/g,
  (e) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[e] || e
), X = (t, e, i, r) => {
  const s = new CustomEvent(e, {
    bubbles: r?.bubbles ?? !0,
    cancelable: !!r?.cancelable,
    composed: r?.composed ?? !0,
    detail: i
  });
  return t.dispatchEvent(s), s;
}, Zr = (t, e) => {
  e && X(t, "hass-more-info", { entityId: e });
}, kr = (t) => {
  t && (window.history.pushState(null, "", t), X(window, "location-changed", { replace: !1 }));
}, Ze = (t) => {
  const e = t?.locale?.language || (typeof navigator < "u" ? navigator.language : "en-AU") || "en-AU";
  return e === "en" ? "en-AU" : e;
}, Je = (t) => t?.config?.time_zone || void 0, At = (t, e, i = {}) => {
  const r = Number(e);
  return Number.isFinite(r) ? new Intl.NumberFormat(Ze(t), i).format(r) : "—";
}, Y = (t, e, i = {}) => {
  if (e == null || e === "") return "—";
  const r = Number(e);
  if (!Number.isFinite(r)) return "—";
  const s = i.absolute ? Math.abs(r) : r;
  return Math.abs(s) >= 1e3 ? `${At(t, s / 1e3, { maximumFractionDigits: 1 })} kW` : `${At(t, Math.round(s), { maximumFractionDigits: 0 })} W`;
}, nt = (t, e) => {
  if (e == null || e === "") return "—";
  const i = Number(e);
  return Number.isFinite(i) ? `${At(t, i, { maximumFractionDigits: Math.abs(i) < 1 ? 2 : 1 })} kWh` : "—";
}, ti = (t, e, i) => new Intl.DateTimeFormat(Ze(t), {
  timeZone: Je(t),
  ...i
}).format(new Date(e)), ei = (t, e, i = {}) => {
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  return r ? ti(
    t,
    Date.UTC(Number(r[1]), Number(r[2]) - 1, Number(r[3]), 12),
    {
      timeZone: "UTC",
      ...i
    }
  ) : "—";
}, Cr = (t, e) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  if (!i) return null;
  const r = Number(i[1]), s = Number(i[2]) - 1, n = Number(i[3]), a = Je(t);
  if (!a)
    return { start: new Date(r, s, n).getTime(), end: new Date(r, s, n + 1).getTime() };
  const c = new Intl.DateTimeFormat("en-AU", {
    timeZone: a,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }), d = (u, b, m) => {
    const l = Date.UTC(u, b, m);
    let _ = l;
    for (let p = 0; p < 2; p += 1) {
      const f = Object.fromEntries(
        c.formatToParts(new Date(_)).map((g) => [g.type, g.value])
      ), h = Date.UTC(
        Number(f.year),
        Number(f.month) - 1,
        Number(f.day),
        Number(f.hour),
        Number(f.minute),
        Number(f.second)
      );
      _ += l - h;
    }
    return _;
  };
  return {
    start: d(r, s, n),
    end: d(r, s, n + 1)
  };
}, Te = (t, e, i = {}) => ti(t, e, {
  hour: "numeric",
  minute: "2-digit",
  ...i
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ae = globalThis, Di = Ae.ShadowRoot && (Ae.ShadyCSS === void 0 || Ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Pi = Symbol(), tr = /* @__PURE__ */ new WeakMap();
let Sr = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== Pi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Di && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = tr.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && tr.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const de = (t) => new Sr(typeof t == "string" ? t : t + "", void 0, Pi), w = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, s, n) => r + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[n + 1], t[0]);
  return new Sr(i, t, Pi);
}, Jr = (t, e) => {
  if (Di) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), s = Ae.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = i.cssText, t.appendChild(r);
  }
}, er = Di ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return de(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ts, defineProperty: es, getOwnPropertyDescriptor: is, getOwnPropertyNames: rs, getOwnPropertySymbols: ss, getPrototypeOf: ns } = Object, ii = globalThis, ir = ii.trustedTypes, as = ir ? ir.emptyScript : "", os = ii.reactiveElementPolyfillSupport, Qt = (t, e) => t, Oe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? as : null;
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
} }, Hi = (t, e) => !ts(t, e), rr = { attribute: !0, type: String, converter: Oe, reflect: !1, useDefault: !1, hasChanged: Hi };
Symbol.metadata ??= Symbol("metadata"), ii.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let kt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = rr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), s = this.getPropertyDescriptor(e, r, i);
      s !== void 0 && es(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: s, set: n } = is(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: s, set(a) {
      const c = s?.call(this);
      n?.call(this, a), this.requestUpdate(e, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? rr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Qt("elementProperties"))) return;
    const e = ns(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Qt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Qt("properties"))) {
      const i = this.properties, r = [...rs(i), ...ss(i)];
      for (const s of r) this.createProperty(s, i[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, s] of i) this.elementProperties.set(r, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const s = this._$Eu(i, r);
      s !== void 0 && this._$Eh.set(s, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const s of r) i.unshift(er(s));
    } else e !== void 0 && i.push(er(e));
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
    return Jr(e, this.constructor.elementStyles), e;
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
    const r = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, r);
    if (s !== void 0 && r.reflect === !0) {
      const n = (r.converter?.toAttribute !== void 0 ? r.converter : Oe).toAttribute(i, r.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, s = r._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const n = r.getPropertyOptions(s), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Oe;
      this._$Em = s;
      const c = a.fromAttribute(i, n.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, s = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (s === !1 && (n = this[e]), r ??= a.getPropertyOptions(e), !((r.hasChanged ?? Hi)(n, i) || r.useDefault && r.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: s, wrapped: n }, a) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, n] of this._$Ep) this[s] = n;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, n] of r) {
        const { wrapped: a } = n, c = this[s];
        a !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, n, c);
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
kt.elementStyles = [], kt.shadowRootOptions = { mode: "open" }, kt[Qt("elementProperties")] = /* @__PURE__ */ new Map(), kt[Qt("finalized")] = /* @__PURE__ */ new Map(), os?.({ ReactiveElement: kt }), (ii.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ri = globalThis, sr = (t) => t, De = Ri.trustedTypes, nr = De ? De.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ar = "$lit$", st = `lit$${Math.random().toFixed(9).slice(2)}$`, Er = "?" + st, cs = `<${Er}>`, mt = document, Yt = () => mt.createComment(""), Xt = (t) => t === null || typeof t != "object" && typeof t != "function", Ni = Array.isArray, ls = (t) => Ni(t) || typeof t?.[Symbol.iterator] == "function", gi = `[ 	
\f\r]`, Vt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ar = /-->/g, or = />/g, pt = RegExp(`>|${gi}(?:([^\\s"'>=/]+)(${gi}*=${gi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), cr = /'/g, lr = /"/g, zr = /^(?:script|style|textarea|title)$/i, ds = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), o = ds(1), Et = Symbol.for("lit-noChange"), M = Symbol.for("lit-nothing"), dr = /* @__PURE__ */ new WeakMap(), ut = mt.createTreeWalker(mt, 129);
function Tr(t, e) {
  if (!Ni(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return nr !== void 0 ? nr.createHTML(e) : e;
}
const ps = (t, e) => {
  const i = t.length - 1, r = [];
  let s, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Vt;
  for (let c = 0; c < i; c++) {
    const d = t[c];
    let u, b, m = -1, l = 0;
    for (; l < d.length && (a.lastIndex = l, b = a.exec(d), b !== null); ) l = a.lastIndex, a === Vt ? b[1] === "!--" ? a = ar : b[1] !== void 0 ? a = or : b[2] !== void 0 ? (zr.test(b[2]) && (s = RegExp("</" + b[2], "g")), a = pt) : b[3] !== void 0 && (a = pt) : a === pt ? b[0] === ">" ? (a = s ?? Vt, m = -1) : b[1] === void 0 ? m = -2 : (m = a.lastIndex - b[2].length, u = b[1], a = b[3] === void 0 ? pt : b[3] === '"' ? lr : cr) : a === lr || a === cr ? a = pt : a === ar || a === or ? a = Vt : (a = pt, s = void 0);
    const _ = a === pt && t[c + 1].startsWith("/>") ? " " : "";
    n += a === Vt ? d + cs : m >= 0 ? (r.push(u), d.slice(0, m) + Ar + d.slice(m) + st + _) : d + st + (m === -2 ? c : _);
  }
  return [Tr(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Zt {
  constructor({ strings: e, _$litType$: i }, r) {
    let s;
    this.parts = [];
    let n = 0, a = 0;
    const c = e.length - 1, d = this.parts, [u, b] = ps(e, i);
    if (this.el = Zt.createElement(u, r), ut.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = ut.nextNode()) !== null && d.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(Ar)) {
          const l = b[a++], _ = s.getAttribute(m).split(st), p = /([.?@])?(.*)/.exec(l);
          d.push({ type: 1, index: n, name: p[2], strings: _, ctor: p[1] === "." ? us : p[1] === "?" ? ms : p[1] === "@" ? fs : ri }), s.removeAttribute(m);
        } else m.startsWith(st) && (d.push({ type: 6, index: n }), s.removeAttribute(m));
        if (zr.test(s.tagName)) {
          const m = s.textContent.split(st), l = m.length - 1;
          if (l > 0) {
            s.textContent = De ? De.emptyScript : "";
            for (let _ = 0; _ < l; _++) s.append(m[_], Yt()), ut.nextNode(), d.push({ type: 2, index: ++n });
            s.append(m[l], Yt());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Er) d.push({ type: 2, index: n });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(st, m + 1)) !== -1; ) d.push({ type: 7, index: n }), m += st.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const r = mt.createElement("template");
    return r.innerHTML = e, r;
  }
}
function zt(t, e, i = t, r) {
  if (e === Et) return e;
  let s = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const n = Xt(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== n && (s?._$AO?.(!1), n === void 0 ? s = void 0 : (s = new n(t), s._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = s : i._$Cl = s), s !== void 0 && (e = zt(t, s._$AS(t, e.values), s, r)), e;
}
class hs {
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
    const { el: { content: i }, parts: r } = this._$AD, s = (e?.creationScope ?? mt).importNode(i, !0);
    ut.currentNode = s;
    let n = ut.nextNode(), a = 0, c = 0, d = r[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let u;
        d.type === 2 ? u = new pe(n, n.nextSibling, this, e) : d.type === 1 ? u = new d.ctor(n, d.name, d.strings, this, e) : d.type === 6 && (u = new gs(n, this, e)), this._$AV.push(u), d = r[++c];
      }
      a !== d?.index && (n = ut.nextNode(), a++);
    }
    return ut.currentNode = mt, s;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class pe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, s) {
    this.type = 2, this._$AH = M, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = zt(this, e, i), Xt(e) ? e === M || e == null || e === "" ? (this._$AH !== M && this._$AR(), this._$AH = M) : e !== this._$AH && e !== Et && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ls(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== M && Xt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(mt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, s = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Zt.createElement(Tr(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const n = new hs(s, this), a = n.u(this.options);
      n.p(i), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = dr.get(e.strings);
    return i === void 0 && dr.set(e.strings, i = new Zt(e)), i;
  }
  k(e) {
    Ni(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, s = 0;
    for (const n of e) s === i.length ? i.push(r = new pe(this.O(Yt()), this.O(Yt()), this, this.options)) : r = i[s], r._$AI(n), s++;
    s < i.length && (this._$AR(r && r._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = sr(e).nextSibling;
      sr(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ri {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, s, n) {
    this.type = 1, this._$AH = M, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = M;
  }
  _$AI(e, i = this, r, s) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = zt(this, e, i, 0), a = !Xt(e) || e !== this._$AH && e !== Et, a && (this._$AH = e);
    else {
      const c = e;
      let d, u;
      for (e = n[0], d = 0; d < n.length - 1; d++) u = zt(this, c[r + d], i, d), u === Et && (u = this._$AH[d]), a ||= !Xt(u) || u !== this._$AH[d], u === M ? e = M : e !== M && (e += (u ?? "") + n[d + 1]), this._$AH[d] = u;
    }
    a && !s && this.j(e);
  }
  j(e) {
    e === M ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class us extends ri {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === M ? void 0 : e;
  }
}
class ms extends ri {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== M);
  }
}
class fs extends ri {
  constructor(e, i, r, s, n) {
    super(e, i, r, s, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = zt(this, e, i, 0) ?? M) === Et) return;
    const r = this._$AH, s = e === M && r !== M || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, n = e !== M && (r === M || s);
    s && this.element.removeEventListener(this.name, this, r), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class gs {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    zt(this, e);
  }
}
const bs = Ri.litHtmlPolyfillSupport;
bs?.(Zt, pe), (Ri.litHtmlVersions ??= []).push("3.3.3");
const _s = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let s = r._$litPart$;
  if (s === void 0) {
    const n = i?.renderBefore ?? null;
    r._$litPart$ = s = new pe(e.insertBefore(Yt(), n), n, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Li = globalThis;
class at extends kt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = _s(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Et;
  }
}
at._$litElement$ = !0, at.finalized = !0, Li.litElementHydrateSupport?.({ LitElement: at });
const vs = Li.litElementPolyfillSupport;
vs?.({ LitElement: at });
(Li.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ys = { attribute: !0, type: String, converter: Oe, reflect: !1, hasChanged: Hi }, xs = (t = ys, e, i) => {
  const { kind: r, metadata: s } = i;
  let n = globalThis.litPropertyMetadata.get(s);
  if (n === void 0 && globalThis.litPropertyMetadata.set(s, n = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), r === "accessor") {
    const { name: a } = i;
    return { set(c) {
      const d = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(a, d, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, t, c), c;
    } };
  }
  if (r === "setter") {
    const { name: a } = i;
    return function(c) {
      const d = this[a];
      e.call(this, c), this.requestUpdate(a, d, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function Ft(t) {
  return (e, i) => typeof i == "object" ? xs(t, e, i) : ((r, s, n) => {
    const a = s.hasOwnProperty(n);
    return s.constructor.createProperty(n, r), a ? Object.getOwnPropertyDescriptor(s, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function v(t) {
  return Ft({ ...t, state: !0, attribute: !1 });
}
var ws = Object.defineProperty, $s = Object.getOwnPropertyDescriptor, he = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? $s(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && ws(e, i, s), s;
};
let ft = class extends at {
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
          ${this.cardType ? o`<span class="type-badge">${ze(this.cardType)}</span>` : ""}
        </div>
        <textarea
          .value=${t}
          @change=${this._onChange}
          spellcheck="false"
          aria-label="Card Configuration JSON"
        ></textarea>
        ${this._error ? o`<div class="error">⚠️ ${ze(this._error)}</div>` : ""}
      </div>
    `;
  }
};
ft.styles = w`
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
he([
  Ft({ attribute: !1 })
], ft.prototype, "hass", 2);
he([
  Ft({ type: String })
], ft.prototype, "cardType", 2);
he([
  v()
], ft.prototype, "_config", 2);
he([
  v()
], ft.prototype, "_error", 2);
ft = he([
  $("ha-component-library-config-editor")
], ft);
const ks = (t, e) => {
  e.getStubConfig || (e.getStubConfig = () => ({
    ...e.stubConfig || {}
  })), e.getConfigElement || (e.getConfigElement = () => {
    const i = document.createElement(
      "ha-component-library-config-editor"
    );
    return i.cardType = t, i;
  });
}, S = (t) => {
  const { type: e, element: i, name: r, description: s, preview: n = !0 } = t;
  ks(e, i), customElements.get(e) || customElements.define(e, i), typeof window < "u" && (window.customCards = window.customCards || [], window.customCards.some((a) => a.type === e) || window.customCards.push({
    type: e,
    name: r,
    description: s,
    preview: n
  }));
}, $t = Object.freeze({
  holdDelay: 500,
  moveTolerance: 10,
  errorDuration: 1800,
  repeatDelay: 350,
  repeatInterval: 110,
  repeatMinimumInterval: 55
}), mc = () => typeof window < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0, Cs = `
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
`, Ss = (t) => {
  if (!t) return null;
  if (t === !0) return {};
  if (typeof t != "object")
    throw new TypeError(
      "interaction repeat must be false, true, or an options object"
    );
  return t;
}, As = (t, e) => {
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
}, Es = (t) => {
  const e = t.getRootNode?.();
  if (!e || e.__haInteractionFeedbackV2) return null;
  e.__haInteractionFeedbackV2 = !0;
  const i = document.createElement("style");
  i.setAttribute("data-ha-interaction-styles", "v2"), i.textContent = Cs;
  const r = document.createElement("span");
  r.setAttribute("data-ha-interaction-status", "v2"), r.setAttribute("role", "status"), r.setAttribute("aria-live", "polite"), r.setAttribute("aria-atomic", "true");
  const s = e.nodeType === 9 || e.body ? e.body || e.head || e.documentElement : e;
  return s && typeof s.append == "function" && s.append(i, r), r;
}, pr = [
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
].join(","), x = (t, e = {}) => {
  if (!t?.addEventListener)
    throw new TypeError("interaction requires an EventTarget element");
  const i = Es(t), r = typeof e.primary == "function" ? e.primary : null, s = typeof e.hold == "function" ? e.hold : null, n = Ss(e.repeat);
  if (s && n)
    throw new TypeError("interaction hold and repeat are mutually exclusive");
  if (!r && (s || n))
    throw new TypeError("interaction hold/repeat requires a primary action");
  const a = e.feedback !== !1, c = e.singleFlight === !0, d = Math.max(
    250,
    Number(e.holdDelay) || $t.holdDelay
  ), u = Math.max(
    4,
    Number(e.moveTolerance) || $t.moveTolerance
  ), b = As(e.optimistic, t), m = e.signal, l = typeof e.onPressChange == "function" ? e.onPressChange : null;
  let _ = null, p = null, f = null, h = null, g = 0, A = !1, O = null, E = !1, D = 0, R = null, N = !1, C = !1;
  const T = (y) => {
    const B = y?.composedPath?.();
    if (Array.isArray(B) && B.length)
      for (const K of B) {
        if (K === t) return !1;
        if (K?.matches?.(pr))
          return !0;
      }
    const V = y?.target;
    if (!V || V === t) return !1;
    const W = V.closest?.(pr);
    return !!(W && W !== t && t.contains?.(W));
  }, U = () => N || c && D > 0 || t.disabled === !0 || t.getAttribute?.("aria-disabled") === "true", P = () => {
    O && clearTimeout(O), O = null, A = !1;
  }, I = () => {
    A = !0, O && clearTimeout(O), O = setTimeout(P, 0);
  }, j = (y) => {
    C !== y && (C = y, a && t.toggleAttribute?.("data-interaction-pressed", y), N || l?.(y, t));
  }, xt = (y) => {
    D = Math.max(0, D + y), !(!a || N) && (t.toggleAttribute?.("data-interaction-pending", D > 0), t.setAttribute?.("aria-busy", String(D > 0)));
  }, wt = () => {
    if (!a || N) return;
    R && clearTimeout(R), t.setAttribute?.("data-interaction-error", "true");
    const y = i || t.getRootNode?.()?.querySelector?.(
      "[data-ha-interaction-status]"
    );
    y && (y.textContent = e.errorMessage || "Action failed. Try again."), R = setTimeout(
      () => {
        R = null, N || t.removeAttribute?.("data-interaction-error");
      },
      Math.max(
        250,
        Number(e.errorDuration) || $t.errorDuration
      )
    );
  }, ve = (y) => {
    N || t.dispatchEvent?.(
      new CustomEvent("ha-interaction-error", {
        bubbles: !0,
        composed: !0,
        detail: { error: y }
      })
    );
  }, Q = (y, B) => {
    if (U()) return Promise.resolve(void 0);
    const V = y === "hold" ? s : r;
    if (!V) return Promise.resolve(void 0);
    let W;
    y === "primary" && b && (W = b.capture(t, B), b.apply(t, B, W));
    let K;
    try {
      K = V(B);
    } catch (dt) {
      return !N && y === "primary" && b?.rollback && b.rollback(W, dt, t, B), wt(), ve(dt), Promise.reject(dt);
    }
    return !K || typeof K.then != "function" ? Promise.resolve(K) : (xt(1), Promise.resolve(K).catch((dt) => {
      throw !N && y === "primary" && b?.rollback && b.rollback(W, dt, t, B), wt(), ve(dt), dt;
    }).finally(() => {
      N || xt(-1);
    }));
  }, z = () => {
    p && clearTimeout(p), p = null, f && clearTimeout(f), f = null, h && clearInterval(h), h = null;
  }, F = () => {
    z(), _ = null, j(!1);
  }, rt = (y) => {
    if (!n || U()) return;
    const B = Math.max(
      150,
      Number(n.delay) || $t.repeatDelay
    ), V = Math.max(
      40,
      Number(n.interval) || $t.repeatInterval
    );
    g = 0, f = setTimeout(() => {
      if (f = null, N || !_) return;
      E = !0, I();
      const W = () => {
        if (N || !_) {
          h && clearInterval(h), h = null;
          return;
        }
        if (g += 1, Q("primary", y).catch(() => {
        }), N || !_ || !n.accelerate) return;
        const K = Math.max(
          Number(n.minimumInterval) || $t.repeatMinimumInterval,
          Math.round(V * Math.pow(0.93, g))
        );
        h && clearInterval(h), h = setInterval(W, K);
      };
      Q("primary", y).catch(() => {
      }), !N && _ && (h = setInterval(W, V));
    }, B);
  }, lt = (y) => {
    if (!(!r || U() || y.button > 0 || T(y))) {
      _ = { id: y.pointerId, x: y.clientX, y: y.clientY }, E = !1, P();
      try {
        t.setPointerCapture?.(y.pointerId);
      } catch {
      }
      j(!0), s ? p = setTimeout(() => {
        p = null, _ && (E = !0, I(), j(!1), Q("hold", y).catch(() => {
        }));
      }, d) : n && rt(y);
    }
  }, Bt = (y) => {
    !_ || y.pointerId !== _.id || Math.hypot(y.clientX - _.x, y.clientY - _.y) <= u || (E = !0, I(), F());
  }, Yi = (y) => {
    if (!_ || y.pointerId !== _.id) return;
    if (T(y)) {
      E = !0, I(), F();
      return;
    }
    const B = E, V = n && (f === null || h !== null);
    z(), _ = null, E = !1, j(!1), I(), !B && !V && Q("primary", y).catch(() => {
    });
  }, ye = () => {
    E = !1, I(), F();
  }, Xi = (y) => {
    if (!T(y)) {
      if (A) {
        y.preventDefault(), y.stopImmediatePropagation?.(), P();
        return;
      }
      !r || U() || Q("primary", y).catch(() => {
      });
    }
  }, Zi = (y) => {
    !r || U() || y.repeat || T(y) || y.key !== "Enter" && y.key !== " " || (y.preventDefault(), j(!0));
  }, Ji = (y) => {
    !r || U() || T(y) || y.key !== "Enter" && y.key !== " " || (y.preventDefault(), j(!1), I(), Q("primary", y).catch(() => {
    }));
  };
  t.addEventListener("pointerdown", lt, {
    passive: !0
  }), t.addEventListener("pointermove", Bt, {
    passive: !0
  }), t.addEventListener("pointerup", Yi, {
    passive: !0
  }), t.addEventListener("pointercancel", ye, {
    passive: !0
  }), t.addEventListener(
    "lostpointercapture",
    ye,
    { passive: !0 }
  ), t.addEventListener("click", Xi, !0), t.addEventListener("keydown", Zi), t.addEventListener("keyup", Ji);
  const fi = () => {
    N || (N = !0, z(), R && clearTimeout(R), O && clearTimeout(O), R = null, O = null, m?.removeEventListener?.("abort", fi), C = !1, D = 0, a && (t.removeAttribute?.("data-interaction-pressed"), t.removeAttribute?.("data-interaction-pending"), t.removeAttribute?.("data-interaction-error"), t.setAttribute?.("aria-busy", "false")), t.removeEventListener("pointerdown", lt), t.removeEventListener("pointermove", Bt), t.removeEventListener("pointerup", Yi), t.removeEventListener(
      "pointercancel",
      ye
    ), t.removeEventListener(
      "lostpointercapture",
      ye
    ), t.removeEventListener("click", Xi, !0), t.removeEventListener("keydown", Zi), t.removeEventListener("keyup", Ji));
  };
  return m?.addEventListener?.("abort", fi, { once: !0 }), Object.freeze({
    element: t,
    destroy: fi,
    get destroyed() {
      return N;
    },
    invoke: (y) => Q("primary", y)
  });
}, Or = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createRequestCoalescer requires a request function");
  let i = !1, r = !1, s, n = !1, a = 0;
  const c = async () => {
    if (!(i || n || !r)) {
      for (i = !0; !n && r; ) {
        r = !1;
        const d = s, u = ++a;
        try {
          await t(d, u), n || e.onSuccess?.(d, u);
        } catch (b) {
          n || e.onError?.(b, d, u), e.stopOnError && (r = !1);
        }
      }
      i = !1, n || e.onIdle?.();
    }
  };
  return Object.freeze({
    request(d) {
      n || (s = d, r = !0, c());
    },
    get pending() {
      return !n && (i || r);
    },
    get destroyed() {
      return n;
    },
    destroy() {
      n = !0, r = !1;
    }
  });
}, Pe = (t, e, i, r = {}) => {
  if (!e || typeof i != "function")
    return Promise.reject(
      new TypeError("waitForEntityState requires an entity and predicate")
    );
  const s = typeof t == "function" ? t : () => t, n = Math.max(250, Number(r.timeout) || 9e3), a = Math.max(40, Number(r.interval) || 160), c = r.signal;
  return new Promise((d, u) => {
    let b = null, m = null, l = !1;
    const _ = () => {
      b && clearInterval(b), m && clearTimeout(m), c?.removeEventListener?.("abort", f);
    }, p = (g, A) => {
      l || (l = !0, _(), g(A));
    }, f = () => p(u, c?.reason || new Error("State confirmation aborted")), h = () => {
      const g = s()?.states?.[e] ?? null;
      try {
        i(g?.state, g) && p(d, g);
      } catch (A) {
        p(u, A);
      }
    };
    if (c?.aborted) return f();
    c?.addEventListener?.("abort", f, { once: !0 }), b = setInterval(h, a), m = setTimeout(
      () => p(u, new Error("State confirmation timed out")),
      n
    ), h();
  });
}, Dr = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createAsyncBroker requires a loader");
  const i = /* @__PURE__ */ new Map(), r = Math.max(0, Number(e.ttl) || 12e4), s = Math.max(r, Number(e.maxStale) || 864e5), n = Math.max(250, Number(e.retryBase) || 2e3), a = Math.max(n, Number(e.retryMax) || 6e4), c = (m) => (i.has(m) || i.set(m, {
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
  }), i.get(m)), d = (m) => {
    const l = c(m), _ = l.updatedAt ? Date.now() - l.updatedAt : 1 / 0;
    return Object.freeze({
      value: l.value,
      error: l.error,
      loading: !!l.promise,
      stale: l.value !== void 0 && (l.invalidated || _ > r),
      updatedAt: l.updatedAt
    });
  }, u = (m) => {
    const l = d(m);
    for (const _ of [...c(m).subscribers])
      try {
        _(l);
      } catch {
      }
  }, b = (m, l, _ = !1) => {
    const p = c(m), f = Date.now();
    if (p.promise) return p.promise;
    if (!_ && f < p.nextRetryAt)
      return p.value !== void 0 ? Promise.resolve(p.value) : Promise.reject(p.error);
    const h = ++p.sequence, g = p.generation;
    return p.promise = Promise.resolve().then(() => t(m, l, h)).then((A) => h !== p.sequence ? p.value : (p.value = A, p.error = null, p.updatedAt = Date.now(), p.failures = 0, p.nextRetryAt = 0, p.invalidated = p.generation !== g, A)).catch((A) => {
      if (h !== p.sequence || (p.error = A instanceof Error ? A : new Error(String(A)), p.failures += 1, p.nextRetryAt = Date.now() + Math.min(a, n * Math.pow(2, p.failures - 1)), p.value !== void 0 && Date.now() - p.updatedAt <= s))
        return p.value;
      throw p.error;
    }).finally(() => {
      h === p.sequence && (p.promise = null), u(m);
    }), u(m), p.promise;
  };
  return Object.freeze({
    clear() {
      i.clear();
    },
    invalidate(m) {
      const l = i.get(m);
      l && (l.invalidated = !0, l.generation += 1, l.nextRetryAt = 0, u(m));
    },
    peek: d,
    async read(m, l, _ = {}) {
      const p = d(m), f = p.updatedAt ? Date.now() - p.updatedAt : 1 / 0, h = c(m);
      if (!_.force && !h.invalidated && p.value !== void 0 && f <= r)
        return p.value;
      if (!_.force && p.value !== void 0 && f <= s)
        return b(m, l).catch(() => {
        }), p.value;
      let g;
      try {
        g = await b(m, l, _.force === !0);
      } catch (A) {
        if (_.force && c(m).invalidated)
          return b(m, l, !0);
        throw A;
      }
      return _.force && c(m).invalidated && (g = await b(m, l, !0)), g;
    },
    refresh: (m, l) => b(m, l, !0),
    subscribe(m, l, _ = {}) {
      const p = c(m);
      return p.subscribers.add(l), _.replay !== !1 && l(d(m)), () => {
        p.subscribers.delete(l);
      };
    }
  });
}, zs = (t) => {
  let e = null, i = [];
  const r = () => (e && !e.signal.aborted || (e = new AbortController()), e.signal);
  return Object.freeze({
    cleanup: (c) => (typeof c != "function" || i.push(c), c),
    connect: r,
    disconnect: () => {
      e?.abort(new Error("Component disconnected")), e = null;
      const c = i;
      i = [];
      for (const d of c.reverse())
        try {
          d();
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
    listen: (c, d, u, b = {}) => {
      const m = r();
      return c?.addEventListener?.(d, u, { ...b, signal: m }), u;
    }
  });
}, Pr = (t, e) => {
  let i = null, r = !0;
  const s = () => {
    if (!r) return;
    const a = 6e4 - Date.now() % 6e4 + 100;
    i = setTimeout(() => {
      if (r) {
        try {
          t();
        } catch {
        }
        s();
      }
    }, a);
  };
  s();
  const n = () => {
    r = !1, i && (clearTimeout(i), i = null);
  };
  return e && e.cleanup(n), n;
}, hr = "dashboard-shared-ui-tokens-v3", Hr = ":root{--dashboard-space-1:4px;--dashboard-space-2:8px;--dashboard-space-3:12px;--dashboard-space-4:16px;--dashboard-space-5:24px;--dashboard-control-height:44px;--dashboard-icon-size:22px;--dashboard-transition-fast:80ms;--dashboard-transition-standard:160ms;--dashboard-easing-standard:cubic-bezier(.2,0,0,1);--dashboard-focus-ring:2px solid var(--primary-color);--dashboard-focus-offset:2px;--dashboard-layer-popover:20;--dashboard-layer-overlay:1000;--dashboard-media-surface:#111;--dashboard-media-on-surface:#fff;--dashboard-radius-card:8px;--dashboard-radius-control:6px;--dashboard-radius-dialog:10px;--dashboard-radius-icon:0px;--dashboard-modal-scrim:rgba(0,0,0,.16);--dashboard-card-surface:var(--ha-card-background,var(--card-background-color));--dashboard-card-muted-surface:color-mix(in srgb,var(--primary-text-color) 3%,var(--card-background-color));--dashboard-card-border-color:color-mix(in srgb,var(--primary-text-color) 10%,transparent);--dashboard-card-border:1px solid var(--dashboard-card-border-color);--dashboard-active-surface:color-mix(in srgb,var(--primary-color) 7%,var(--card-background-color));--dashboard-warning-surface:color-mix(in srgb,var(--warning-color,#f9a825) 9%,var(--card-background-color));--dashboard-critical-surface:color-mix(in srgb,var(--error-color) 8%,var(--card-background-color));--dashboard-dialog-shadow:0 16px 48px rgba(0,0,0,.22);--ha-card-border-radius:var(--dashboard-radius-card);--ha-card-box-shadow:none;--ha-card-border-width:1px;--ha-card-border-color:var(--dashboard-card-border-color)}@media(max-width:700px){:root{--dashboard-radius-dialog:8px}}@media(prefers-reduced-motion:reduce){:root{--dashboard-transition-fast:0ms;--dashboard-transition-standard:0ms}}", Ts = () => {
  if (typeof document > "u") return;
  let t = document.getElementById(hr);
  t || (t = document.createElement("style"), t.id = hr, document.head?.append(t)), t.textContent = Hr;
};
Ts();
const fc = w`
  ${de(Hr)}
`, Os = ":host{display:block;min-width:0}ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,16px);background:var(--ha-card-background,var(--card-background-color));color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}button.demo{appearance:none;width:100%;border:0;background:transparent;text-align:inherit;padding:0;cursor:pointer}button.demo:active{transform:scale(.992)}button.demo:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px;border-radius:var(--ha-card-border-radius,16px)}", Ds = ":host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border,1px solid var(--divider-color));border-radius:var(--dashboard-radius-card,var(--ha-card-border-radius,6px));background:var(--dashboard-card-surface,var(--ha-card-background,var(--card-background-color)));box-shadow:none;color:var(--primary-text-color);box-sizing:border-box}.wrap{box-sizing:border-box;padding:12px 14px}.title{font-size:13px;line-height:1.25;font-weight:600;color:var(--primary-text-color)}.desc{margin-top:3px;font-size:11px;line-height:1.3;color:var(--secondary-text-color)}ha-icon{--mdc-icon-size:19px}button{font:inherit;color:inherit}button.i{appearance:none;border:0;background:transparent;cursor:pointer}button.i:active{background:var(--dashboard-card-muted-surface,var(--secondary-background-color))}button.i:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px;border-radius:var(--dashboard-radius-control,5px)}@media(max-width:700px){.wrap{padding:12px}}", Ps = ":host{display:block;min-width:0}ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,16px);background:var(--ha-card-background,var(--card-background-color));color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}", it = w`
  ${de(Os)}
`, H = w`
  ${de(Ds)}
`, qi = w`
  ${de(Ps)}
`, si = it, Rr = w`
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
const G = Z;
function Hs(t) {
  let e = t.entry?.name || t.entry?.original_name || t.state?.attributes?.friendly_name || t.fallback || t.entry?.entity_id || t.state?.entity_id || "Control";
  if (t.stripSuffixes && t.stripSuffixes.length > 0)
    for (const i of t.stripSuffixes)
      e = e.replace(i, "").trim();
  return e;
}
function ni(t, e) {
  return t ? t.attributes?.friendly_name || e || t.entity_id : e || "";
}
function Nr(t) {
  if (!t) return !1;
  const e = typeof t == "string" ? t : t.state;
  if (!e) return !1;
  const i = e.toLowerCase().trim();
  return i !== "unavailable" && i !== "unknown" && i !== "";
}
function ur(t) {
  return !Nr(t);
}
function Tt(t, e) {
  if (!t) return "Unavailable";
  if (e?.formatEntityState)
    return e.formatEntityState(t);
  const i = t.state, r = t.attributes?.unit_of_measurement;
  return i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : i === "on" ? "On" : i === "off" ? "Off" : r ? `${i} ${r}` : i.charAt(0).toUpperCase() + i.slice(1);
}
function Ot(t) {
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
function ai(t, e) {
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
async function oi(t, e, i, r) {
  if (!e) return;
  const s = i?.action || "toggle";
  if (s === "none") return;
  if (i?.haptic && X(t, "haptic", i.haptic), i?.confirmation) {
    const a = i.confirmation.text || "Are you sure you want to proceed?";
    if (!window.confirm(a))
      return;
  }
  const n = i?.target?.entity_id || r;
  switch (s) {
    case "toggle": {
      if (!n) return;
      const a = Z(n), c = a === "lock" ? "lock" : "toggle";
      await e.callService(a, c, void 0, {
        entity_id: n
      });
      break;
    }
    case "more-info": {
      if (!n) return;
      X(t, "hass-more-info", { entityId: n });
      break;
    }
    case "call-service": {
      if (!i?.service) return;
      const [a, c] = i.service.split(".");
      a && c && await e.callService(
        a,
        c,
        i.service_data,
        i.target || (n ? { entity_id: n } : void 0)
      );
      break;
    }
    case "navigate": {
      i?.navigation_path && (window.history.pushState(null, "", i.navigation_path), X(window, "location-changed", { replace: !1 }));
      break;
    }
    case "url": {
      i?.url_path && window.open(i.url_path, "_blank");
      break;
    }
    case "assist": {
      X(t, "start-voice-assist");
      break;
    }
  }
}
var Rs = Object.defineProperty, Mi = (t, e, i, r) => {
  for (var s = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(e, i, s) || s);
  return s && Rs(e, i, s), s;
};
class k extends at {
  constructor() {
    super(...arguments), this._cardError = null, this._lifecycle = zs(this);
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
    return ze(e);
  }
  toText(e) {
    return $r(e);
  }
  moreInfo(e) {
    Zr(this, e);
  }
  navigate(e) {
    kr(e);
  }
  fire(e, i) {
    return X(this, e, i);
  }
  formatNum(e, i) {
    return At(this.hass, e, i);
  }
  fmtPower(e, i) {
    return Y(this.hass, e, i);
  }
  fmtEnergy(e) {
    return nt(this.hass, e);
  }
  fmtDate(e, i) {
    return ti(this.hass, e, i);
  }
  fmtTime(e, i) {
    return Te(this.hass, e, i);
  }
  fmtCalendarDay(e, i) {
    return ei(this.hass, e, i);
  }
  renderError(e) {
    return o`
      <ha-card class="error-card">
        <div
          style="padding: 16px; color: var(--error-color, #db4437); font-size: 13px; font-weight: 500;"
        >
          ⚠️ ${ze(e)}
        </div>
      </ha-card>
    `;
  }
}
Mi([
  Ft({ attribute: !1 })
], k.prototype, "hass");
Mi([
  v()
], k.prototype, "_config");
Mi([
  v()
], k.prototype, "_cardError");
class ci extends k {
  validateConfig(e) {
  }
  setConfig(e) {
    super.setConfig(e), this.validateConfig(e);
  }
  fireConfigChanged() {
    this.fire("config-changed", { config: this._config });
  }
}
class Ns {
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
    ]).then((r) => () => r.forEach((s) => s?.()));
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
    ]).then(([s, n, a, c]) => {
      const d = Array.isArray(s) ? s : [], u = Array.isArray(n) ? n : [], b = Array.isArray(a) ? a : [], m = Array.isArray(c) ? c : [], l = new Map(
        u.map((f) => [f.id, f.area_id || null])
      ), _ = /* @__PURE__ */ new Map();
      for (const f of b) {
        if (!f?.device_id) continue;
        const h = _.get(f.device_id) || [];
        h.push(f), _.set(f.device_id, h);
      }
      const p = new Map(
        d.map((f) => [f.area_id, f])
      );
      return this._data = {
        areas: d,
        devices: u,
        entities: b,
        dashboards: m,
        deviceArea: l,
        byDevice: _,
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
    let s;
    return s = Promise.resolve(r).then((n) => {
      if (this._hass === e)
        for (const a of [...this._subs])
          try {
            a(n);
          } catch {
          }
      return n;
    }).finally(() => {
      this._refreshPromise === s && (this._refreshPromise = null, this._refreshQueued && (this._refreshQueued = !1, this.refresh()));
    }), this._refreshPromise = s, s;
  }
  subscribe(e, i) {
    this.attach(e);
    const r = this._subs.size === 0;
    return this._subs.add(i), r && this.listen(), this.load(e).then(i), () => {
      this._subs.delete(i), this._subs.size === 0 && this.detach();
    };
  }
}
const L = new Ns(), Ee = [], Ls = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard entry filters must be functions");
  return Ee.push(t), () => {
    const e = Ee.indexOf(t);
    e >= 0 && Ee.splice(e, 1);
  };
}, gc = (t) => !!(t?.entity_id && !t.disabled_by && !t.hidden_by && !["diagnostic", "config"].includes(t.entity_category || "") && Ee.every((e) => e(t))), bc = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", bi = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, mr = /* @__PURE__ */ new WeakMap(), _c = async (t) => {
  if (!t || !t.sendMessagePromise)
    return { areas: [], devices: [], entities: [] };
  const e = await L.load({ connection: t });
  let i = mr.get(e);
  return i || (i = {
    areas: e.areas,
    devices: e.devices,
    entities: e.entities
  }, mr.set(e, i)), i;
}, vc = async (t, e = !1) => L.load(t, e), qs = /(_controller_temperature|_outside_air_temperature|cpu_temperature|processor_temperature|board_temperature|chip_temperature|internal_temperature)$/i;
function Lr(t, e, i) {
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
  const s = (e?.entities || []).filter((f) => (f.area_id || (f.device_id ? e?.deviceArea?.get(f.device_id) : null)) === t.area_id), n = [];
  for (const f of s) {
    const h = i.states[f.entity_id];
    h && Nr(h) && n.push(h);
  }
  let a = 0, c = "", d = "", u = !1, b = !1;
  const m = n.find(
    (f) => f.entity_id.startsWith("climate.") && f.attributes && !Number.isNaN(
      Number.parseFloat(String(f.attributes.current_temperature ?? ""))
    )
  );
  if (m && m.attributes?.current_temperature !== void 0) {
    const f = Number.parseFloat(
      String(m.attributes.current_temperature)
    ), h = m.attributes.temperature_unit || i.config?.unit_system?.temperature || "°C";
    c = `${f.toFixed(1)} ${h}`;
  } else {
    const f = n.find(
      (h) => h.entity_id.startsWith("sensor.") && (h.attributes?.device_class === "temperature" || h.attributes?.unit_of_measurement && /°[CF]/i.test(h.attributes.unit_of_measurement)) && !qs.test(h.entity_id) && !Number.isNaN(Number.parseFloat(String(h.state ?? "")))
    );
    if (f) {
      const h = Number.parseFloat(String(f.state)), g = f.attributes?.unit_of_measurement || i.config?.unit_system?.temperature || "°C";
      c = `${h.toFixed(1)} ${g}`;
    }
  }
  const l = n.find(
    (f) => f.entity_id.startsWith("sensor.") && f.attributes?.device_class === "humidity" && !Number.isNaN(Number.parseFloat(String(f.state ?? "")))
  );
  l && (d = Tt(l, i));
  for (const f of n) {
    f.entity_id.startsWith("light.") && f.state === "on" && a++;
    const h = f.attributes?.device_class || "";
    f.entity_id.startsWith("binary_sensor.") && f.state === "on" && ["smoke", "moisture", "gas"].includes(h) && (u = !0), (f.entity_id.startsWith("binary_sensor.") && f.state === "on" && h === "garage_door" || f.entity_id.startsWith("cover.") && ["open", "opening"].includes(f.state) && h === "garage") && (b = !0);
  }
  const _ = a > 0 || n.some(
    (f) => f.entity_id.startsWith("climate.") && ["heating", "cooling", "drying", "fan"].includes(
      f.attributes?.hvac_action || ""
    ) || f.entity_id.startsWith("media_player.") && f.state === "playing"
  ), p = [];
  return u ? p.push("Attention required") : b && p.push("Garage open"), c && p.push(c), d && !c && p.push(d), a > 0 && p.push(`${a} light${a === 1 ? "" : "s"} on`), {
    summary: p.slice(0, 3).join(" · "),
    severity: u ? "critical" : b ? "warning" : _ ? "active" : "",
    lightsOn: a,
    temperatureText: c,
    humidityText: d,
    hasCritical: u,
    hasWarning: b
  };
}
const _i = /* @__PURE__ */ new WeakMap();
let Ms = 1;
const Ii = (t) => {
  const e = t?.connection;
  return e ? (_i.has(e) || _i.set(e, Ms++), _i.get(e)) : "none";
}, Ct = (t, e, i) => `${Ii(t)}|${e}|${i}`, vi = /* @__PURE__ */ new WeakMap(), fr = (t) => {
  const e = t?.connection;
  if (!e?.subscribeEvents || vi.has(e))
    return;
  const i = e.subscribeEvents((r) => {
    const s = /^dashboard-profile\.(energy|security)\.([a-z0-9-]+)$/.exec(
      String(r?.data?.key || "")
    );
    s && (St.invalidate(Ct(t, s[1], s[2])), window.dispatchEvent(
      new CustomEvent("ha-component-profile-change", {
        detail: { kind: s[1], profileId: s[2] }
      })
    ));
  }, "ha_component_backend_preferences_updated");
  vi.set(e, i), Promise.resolve(i).catch(
    () => vi.delete(e)
  );
}, St = Dr(
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
), Is = Object.freeze({
  async get(t, e, i, r = {}) {
    fr(t);
    const s = Ct(t, e, i);
    return St.read(s, { hass: t, kind: e, profileId: i }, r);
  },
  invalidate(t, e, i) {
    St.invalidate(Ct(t, e, i));
  },
  peek(t, e, i) {
    return St.peek(Ct(t, e, i));
  },
  async save(t, e, i, r, s) {
    const n = {
      type: "ha_component_backend/profile/update",
      kind: e,
      profile_id: i,
      profile: r
    };
    Number.isFinite(Number(s)) && (n.expected_revision = Number(s));
    const a = await t.callWS(n);
    return St.invalidate(Ct(t, e, i)), a;
  },
  subscribe(t, e, i, r) {
    fr(t);
    const s = Ct(t, e, i);
    return St.subscribe(s, r);
  }
}), yi = /* @__PURE__ */ new Map(), gr = (t) => String(t).padStart(2, "0"), Jt = (t = /* @__PURE__ */ new Date()) => `${t.getFullYear()}-${gr(t.getMonth() + 1)}-${gr(t.getDate())}`, Wt = (t, e = /* @__PURE__ */ new Date()) => {
  const i = t?.config?.time_zone;
  if (!i) return Jt(e);
  try {
    const r = Object.fromEntries(
      new Intl.DateTimeFormat("en-AU", {
        timeZone: i,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }).formatToParts(e).map((s) => [s.type, s.value])
    );
    return `${r.year}-${r.month}-${r.day}`;
  } catch {
    return Jt(e);
  }
}, qr = (t, e = Jt()) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(t || ""));
  if (!i) return null;
  const r = new Date(
    Number(i[1]),
    Number(i[2]) - 1,
    Number(i[3])
  );
  return Jt(r) !== t || t > e ? null : t;
}, xi = (t = "energy-day") => {
  const e = String(t || "energy-day");
  if (!yi.has(e)) {
    let i = null;
    try {
      i = sessionStorage.getItem(`ha-component-library:${e}`);
    } catch {
    }
    const r = qr(i);
    yi.set(e, {
      value: r || Jt(),
      usesDefault: !r,
      subscribers: /* @__PURE__ */ new Set()
    });
  }
  return yi.get(e);
}, q = Object.freeze({
  get(t = "energy-day", e) {
    const i = xi(t);
    return i.usesDefault && (i.value = Wt(e)), i.value;
  },
  set(t = "energy-day", e, i = {}) {
    const r = xi(t), s = Wt(i.hass), n = qr(e, s);
    if (!n || n === r.value) return r.value;
    r.value = n, r.usesDefault = !1;
    try {
      sessionStorage.setItem(`ha-component-library:${t}`, n);
    } catch {
    }
    const a = {
      channel: t,
      day: n,
      isToday: n === s
    };
    for (const c of [...r.subscribers]) c(a);
    return i.broadcast !== !1 && window.dispatchEvent(
      new CustomEvent("energy-day-selector-change", { detail: a })
    ), n;
  },
  subscribe(t = "energy-day", e, i = {}) {
    const r = xi(t);
    return r.usesDefault && (r.value = Wt(i.hass)), r.subscribers.add(e), i.replay !== !1 && e({
      channel: t,
      day: r.value,
      isToday: r.value === Wt(i.hass)
    }), () => r.subscribers.delete(e);
  },
  today: Wt
}), wi = /* @__PURE__ */ new Set(), xe = (t, e, i) => `${Ii(t)}|${e}|${i}`, Gt = Dr(
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
), He = Object.freeze({
  async get(t, e, i, r = {}) {
    const s = xe(t, e, i);
    return wi.add(s), Gt.read(s, { hass: t, profileId: e, day: i }, r);
  },
  invalidate(t, e, i) {
    Gt.invalidate(xe(t, e, i));
  },
  invalidateProfile(t, e) {
    const i = `${Ii(t)}|${e}|`;
    for (const r of wi)
      r.startsWith(i) && Gt.invalidate(r);
  },
  peek(t, e, i) {
    return Gt.peek(xe(t, e, i));
  },
  subscribe(t, e, i, r) {
    const s = xe(t, e, i);
    return wi.add(s), Gt.subscribe(s, r);
  }
}), we = /* @__PURE__ */ new Set(["unknown", "unavailable"]), li = (t) => [
  t?.translation_key,
  t?.unique_id,
  t?.entity_id,
  t?.platform
].filter(Boolean).join(" ").toLowerCase(), $e = (t, e) => e?.name || e?.original_name || (e?.entity_id ? t?.states?.[e.entity_id]?.attributes?.friendly_name : "") || e?.entity_id || "Control", br = (t) => {
  const e = li(t);
  return /record/.test(e) ? "Recording" : /detect|motion/.test(e) ? "Detection" : /alert|notification/.test(e) ? "Alerts" : /audio|sound/.test(e) ? "Audio" : null;
}, js = (t) => /(^|[_ :.-])(ptz|pan|tilt|zoom)([_ :.-]|$)/.test(
  li(t)
), ke = (t) => {
  const e = li(t);
  return /trigger|operate|open|close/.test(e) ? "operate" : /restart|reboot/.test(e) ? "restart" : "action";
}, Us = (t, e, i = {}) => {
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
  const r = new Set(i.include_entities || []), s = new Set(i.exclude_entities || []), n = new Set(i.area_ids || []), a = (e?.entities || []).filter((h) => !h?.entity_id || h.disabled_by || h.hidden_by || !t?.states?.[h.entity_id] ? !1 : !s.has(h.entity_id)), c = a.filter((h) => {
    if (r.has(h.entity_id)) return !0;
    const g = bi(h, e);
    return !n.size || (g ? n.has(g) : !1);
  }), d = c.filter(
    (h) => !h.disabled_by && !h.hidden_by
  ), u = new Set(
    c.map((h) => h.device_id || h.entity_id)
  ), b = /* @__PURE__ */ new Map();
  for (const h of a) {
    const g = h.device_id || h.entity_id, A = b.get(g) || [];
    A.push(h), b.set(g, A);
  }
  const m = [];
  for (const [h, g] of b) {
    if (!u.has(h)) continue;
    const A = g.filter(
      (z) => G(z.entity_id) === "camera" && !z.disabled_by && !z.hidden_by
    );
    if (!A.length) continue;
    A.sort((z, F) => {
      const rt = (lt) => {
        const Bt = t.states[lt.entity_id];
        return (r.has(lt.entity_id) ? 100 : 0) + (Bt?.attributes?.entity_picture ? 20 : 0) + (Bt?.attributes?.frontend_stream_type ? 10 : 0);
      };
      return rt(F) - rt(z) || String(z.unique_id || z.entity_id).localeCompare(
        String(F.unique_id || F.entity_id)
      );
    });
    const O = A[0], E = t.states[O.entity_id], D = (e?.devices || []).find((z) => z.id === O.device_id) || {}, R = bi(O, e), N = (R ? e?.areaMap?.get(R)?.name : "") || "", C = g.filter(
      (z) => G(z.entity_id) === "switch" && br(z)
    ).map((z) => ({ entity: z, role: br(z) })), T = g.filter((z) => {
      if (G(z.entity_id) !== "binary_sensor") return !1;
      const F = t.states[z.entity_id]?.attributes?.device_class || "";
      return /^(motion|occupancy|presence|sound)$/.test(F) || /detect|motion|person|human/.test(li(z));
    }), U = g.filter((z) => G(z.entity_id) === "image").map((z) => {
      const F = $e(t, z), rt = String(
        D.name_by_user || D.name || ""
      ).trim(), lt = rt && F.toLowerCase().startsWith(`${rt.toLowerCase()} `) ? F.slice(rt.length).trim() : F;
      return { entity: z, name: lt };
    }), P = g.filter(
      (z) => G(z.entity_id) === "button" && ke(z) !== "action"
    ).map((z) => ({ entity: z, role: ke(z) })), I = g.filter(
      (z) => ["button", "number", "select"].includes(G(z.entity_id)) && js(z)
    ), j = i.mappings?.[`camera_stream:${O.entity_id}`] || i.mappings?.[`camera_stream:${h}`] || null, xt = j ? t.states[j] : null, wt = (xt && !we.has(String(xt.state).toLowerCase()) ? j : O.entity_id) || O.entity_id, ve = !!(E && !we.has(String(E.state).toLowerCase())), Q = T.some(
      (z) => t.states[z.entity_id]?.state === "on"
    );
    m.push({
      id: h,
      deviceId: O.device_id || null,
      entityId: O.entity_id,
      entities: A.map((z) => z.entity_id),
      name: String(D.name_by_user || D.name || "").trim() || N || $e(t, O),
      areaId: R,
      areaName: N,
      online: ve,
      active: Q,
      streamEntityId: wt,
      switches: C,
      detections: T,
      classifications: U,
      actions: P,
      ptz: I
    });
  }
  m.sort(
    (h, g) => h.name.localeCompare(g.name, void 0, { sensitivity: "base" })
  );
  const l = [];
  for (const h of d) {
    const g = G(h.entity_id), A = t.states[h.entity_id], O = A?.attributes?.device_class || "";
    if (!(g === "binary_sensor" && /^(door|window|garage_door|opening)$/.test(O) || g === "lock" || g === "cover" && /^(door|garage)$/.test(O))) continue;
    const R = h.device_id ? b.get(h.device_id) || [] : [], C = i.mappings?.[`entry_control:${h.entity_id}`] || R.filter((U) => G(U.entity_id) === "button").sort(
      (U, P) => (ke(U) === "operate" ? -1 : 1) - (ke(P) === "operate" ? -1 : 1)
    )[0]?.entity_id || null, T = g === "lock" ? A.state === "unlocked" : /^(on|open|opening)$/.test(A.state);
    l.push({
      entityId: h.entity_id,
      deviceId: h.device_id || null,
      controlEntityId: C,
      domain: g,
      deviceClass: O,
      name: $e(t, h),
      state: A.state,
      open: T,
      available: !we.has(String(A.state).toLowerCase()),
      areaId: bi(h, e)
    });
  }
  l.sort(
    (h, g) => h.name.localeCompare(g.name, void 0, { sensitivity: "base" })
  );
  const _ = /* @__PURE__ */ new Map([
    ["automation", "trigger"],
    ["scene", "turn_on"],
    ["script", "turn_on"]
  ]), p = Object.entries(
    i.mappings || {}
  ).flatMap(([h, g]) => {
    if (!h.startsWith("quick_action:")) return [];
    const A = G(g), O = _.get(A), E = t?.states?.[g];
    if (!O || !E) return [];
    const D = (e?.entities || []).find(
      (R) => R.entity_id === g
    ) || {
      entity_id: g
    };
    return [
      {
        id: h.slice(13),
        entityId: g,
        domain: A,
        service: O,
        name: $e(t, D),
        icon: E.attributes?.icon || (A === "script" ? "mdi:script-text-outline" : A === "scene" ? "mdi:palette-outline" : "mdi:robot-outline"),
        available: !we.has(String(E.state).toLowerCase())
      }
    ];
  });
  p.sort(
    (h, g) => h.name.localeCompare(g.name, void 0, { sensitivity: "base" })
  );
  const f = [
    ...m.filter((h) => !h.online).map((h) => ({
      type: "camera-offline",
      label: `${h.name} unavailable`,
      entityId: h.entityId
    })),
    ...m.filter((h) => h.active).map((h) => ({
      type: "camera-activity",
      label: `${h.name} activity`,
      entityId: h.entityId
    })),
    ...l.filter((h) => h.available && h.open).map((h) => ({
      type: "entry-open",
      label: `${h.name} open`,
      entityId: h.entityId
    }))
  ];
  return {
    error: null,
    cameras: m,
    entries: l,
    quickActions: p,
    attention: f,
    allClear: f.length === 0,
    onlineCameras: m.filter((h) => h.online).length
  };
}, ue = async (t, e = "household-security", i = {}) => {
  const [r, s] = await Promise.all([
    Is.get(t, "security", e, i).catch((a) => ({ found: !1, profile: null, error: a })),
    L.load(t)
  ]);
  return r?.found ? {
    ...Us(t, s, r.profile || {}),
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
}, $i = G, _r = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]), Mr = (t) => String(
  t?.original_name || t?.name || t?.entity_id || ""
).toLowerCase();
let vr = !1;
const Fs = () => {
  vr || (vr = !0, Ls((t) => t?.platform !== "wled" ? !0 : G(t.entity_id) !== "light" ? !1 : Mr(t) === "main" || !/_\d+$/.test(String(t.unique_id || ""))), L.refresh());
};
Fs();
const Bs = [
  it,
  w`
    .wrap {
      padding: 12px 14px;
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      min-height: 70px;
    }
    .icon {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 11px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    ha-icon {
      --mdc-icon-size: 19px;
    }
    .title {
      font-size: 13px;
      font-weight: 650;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .desc {
      margin-top: 3px;
      font-size: 10.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .action {
      min-height: 32px;
      padding: 0 10px;
      border-radius: 11px;
      display: flex;
      align-items: center;
      background: var(--secondary-background-color);
      color: var(--primary-color);
      font-size: 11.5px;
      font-weight: 650;
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
var Vs = Object.getOwnPropertyDescriptor, Ws = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Vs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const Gs = {
  type: "custom:component-action-v2",
  title: "Action title",
  description: "What this action will do",
  action_text: "Open",
  icon: "mdi:gesture-tap-button",
  navigation_path: null,
  entity: null,
  more_info_entity: null
};
let Re = class extends k {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Gs, ...t });
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
    t.primary && e ? (this._interactionHandle?.destroy(), this._interactionHandle = x(e, {
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
Re.styles = Bs;
Re = Ws([
  $("component-action-v2")
], Re);
S({
  type: "component-action-v2",
  element: Re,
  name: "Action Card",
  description: "Reusable navigation and more-info action card."
});
const Ks = w`
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
    color: inherit;
  }
  button:active {
    transform: scale(0.997);
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
  .mid {
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 18px;
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
var Qs = Object.getOwnPropertyDescriptor, Ys = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Qs(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const Xs = {
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
let Ne = class extends k {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Xs, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = x(e, {
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
      const s = this._config[`center_${r}_label`], n = this._config[`center_${r}_value`];
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
    `;
    return o`
      <ha-card>
        ${t ? o`<button type="button">${i}</button>` : o`<div class="context-static">${i}</div>`}
      </ha-card>
    `;
  }
};
Ne.styles = Ks;
Ne = Ys([
  $("component-context-strip-v3")
], Ne);
S({
  type: "component-context-strip-v3",
  element: Ne,
  name: "Context Strip",
  description: "Reusable context and metric strip component."
});
const Zs = [
  qi,
  w`
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
var Js = Object.getOwnPropertyDescriptor, Ir = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Js(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const tn = {
  type: "custom:component-empty-state-v3",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let Le = class extends k {
  setConfig(t) {
    super.setConfig({ ...tn, ...t });
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
Le.styles = Zs;
Le = Ir([
  $("component-empty-state-v3")
], Le);
S({
  type: "component-empty-state-v3",
  element: Le,
  name: "Empty State",
  description: "Reusable empty-state component."
});
const en = {
  type: "custom:component-empty-state-v2",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let qe = class extends k {
  setConfig(t) {
    super.setConfig({ ...en, ...t });
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
qe.styles = [
  H,
  w`
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
qe = Ir([
  $("component-empty-state-v2")
], qe);
S({
  type: "component-empty-state-v2",
  element: qe,
  name: "Empty State V2",
  description: "Reusable compact empty-state component."
});
const rn = [
  it,
  w`
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
var sn = Object.getOwnPropertyDescriptor, nn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? sn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const an = {
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
let Me = class extends k {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...an, ...t });
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
      const r = Number(i.dataset.index), s = t[r];
      if (s) {
        const n = this._getRowActions(s);
        n.primary && this._interactionHandles.push(
          x(i, {
            primary: n.primary,
            hold: n.hold || void 0,
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
      const r = this._getRowActions(e), s = o`
              <span>
                <div class="title">${this.esc(e.title)}</div>
                <div class="desc">${this.esc(e.description)}</div>
              </span>
              <span class="metric">
                <b>${this.esc(e.value)}</b>${this.esc(e.label)}
              </span>
            `;
      return r.primary ? o`
                  <button class="row" data-index="${i}" type="button">
                    ${s}
                  </button>
                ` : o`<div class="row" data-index="${i}">${s}</div>`;
    })}
        </div>
      </ha-card>
    `;
  }
};
Me.styles = rn;
Me = nn([
  $("component-list-v2")
], Me);
S({
  type: "component-list-v2",
  element: Me,
  name: "List / Ranking",
  description: "Reusable list and ranking component."
});
const on = [
  it,
  w`
    .wrap {
      padding: 12px 14px;
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
      min-height: 70px;
    }
    .icon {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 11px;
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
      --mdc-icon-size: 19px;
    }
    .title {
      font-size: 13px;
      font-weight: 650;
    }
    .message {
      margin-top: 3px;
      font-size: 10.5px;
      line-height: 1.35;
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
var cn = Object.getOwnPropertyDescriptor, ln = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? cn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const dn = {
  type: "custom:component-notice-v2",
  title: "Notice title",
  message: "Important supporting information appears here.",
  tone: "info",
  icon: "mdi:information-outline",
  entity: null,
  navigation_path: null
};
let Ie = class extends k {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...dn, ...t });
  }
  getCardSize() {
    return 2;
  }
  _getAction() {
    return this._config ? this._config.navigation_path ? () => this.navigate(this._config?.navigation_path) : this._config.entity ? () => this.moreInfo(this._config?.entity) : null : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector(".wrap");
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = x(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = ["warning", "error", "success"].includes(
      this._config.tone || ""
    ) ? this._config.tone : "";
    return o`
      <ha-card>
        <div
          class="wrap ${e} ${t ? "actionable" : ""}"
          role="${t ? "button" : "none"}"
          tabindex="${t ? "0" : "-1"}"
        >
          <span class="icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <div>
            <div class="title">${this.esc(this._config.title)}</div>
            <div class="message">${this.esc(this._config.message)}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
Ie.styles = on;
Ie = ln([
  $("component-notice-v2")
], Ie);
S({
  type: "component-notice-v2",
  element: Ie,
  name: "Alert / Notice",
  description: "Reusable alert and notice component."
});
const pn = [
  it,
  w`
    .wrap {
      padding: 12px 14px;
      min-height: 78px;
    }
    .head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 14px;
    }
    .value {
      font-size: 27px;
      line-height: 1;
      font-weight: 650;
      letter-spacing: -0.035em;
    }
    .label {
      margin-top: 4px;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .target {
      text-align: right;
      font-size: 11.5px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .target b {
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .track {
      height: 5px;
      margin-top: 11px;
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
var hn = Object.getOwnPropertyDescriptor, un = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? hn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const mn = {
  type: "custom:component-progress-v2",
  value: "68%",
  label: "Progress metric",
  progress: 68,
  target_value: "100%",
  target_label: "Target",
  entity: null,
  navigation_path: null
};
let je = class extends k {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...mn, ...t });
  }
  getCardSize() {
    return 2;
  }
  _getAction() {
    return this._config ? this._config.navigation_path ? () => this.navigate(this._config?.navigation_path) : this._config.entity ? () => this.moreInfo(this._config?.entity) : null : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector(".wrap");
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = x(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = Math.min(100, Math.max(0, Number(this._config.progress) || 0));
    return o`
      <ha-card>
        <div
          class="wrap ${t ? "actionable" : ""}"
          role="${t ? "button" : "none"}"
          tabindex="${t ? "0" : "-1"}"
        >
          <div class="head">
            <div>
              <div class="value">${this.esc(this._config.value)}</div>
              <div class="label">${this.esc(this._config.label)}</div>
            </div>
            <div class="target">
              <b>${this.esc(this._config.target_value)}</b>
              ${this.esc(this._config.target_label)}
            </div>
          </div>
          <div class="track">
            <div class="fill" style="width:${e}%"></div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
je.styles = pn;
je = un([
  $("component-progress-v2")
], je);
S({
  type: "component-progress-v2",
  element: je,
  name: "Progress / Target",
  description: "Reusable progress and target component."
});
const fn = [
  H,
  w`
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
var gn = Object.getOwnPropertyDescriptor, bn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? gn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
let Ue = class extends k {
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
Ue.styles = fn;
Ue = bn([
  $("component-section-separator-v2")
], Ue);
S({
  type: "component-section-separator-v2",
  element: Ue,
  name: "Section Separator",
  description: "Reusable section separator component."
});
const _n = [
  it,
  w`
    .wrap {
      padding: 12px 14px;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
      min-height: 70px;
    }
    .value {
      font-size: 27px;
      line-height: 1;
      font-weight: 650;
      letter-spacing: -0.035em;
      white-space: nowrap;
    }
    .label {
      margin-top: 4px;
      font-size: 11px;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support {
      text-align: right;
      font-size: 11.5px;
      line-height: 1.3;
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    .support b {
      font-weight: 600;
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
var vn = Object.getOwnPropertyDescriptor, yn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? vn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const xn = {
  type: "custom:component-single-kpi-v2",
  value: "00",
  label: "Primary metric",
  support_value: "00",
  support_label: "Supporting context",
  interactive: !0,
  entity: null,
  navigation_path: null
};
let Fe = class extends k {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...xn, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = x(e, {
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
    return t.size === 1 && t.has("hass") ? !1 : super.shouldUpdate(t);
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = o`
      <div class="wrap">
        <div>
          <div class="value">${this.esc(this._config.value)}</div>
          <div class="label">${this.esc(this._config.label)}</div>
        </div>
        <div class="support">
          <b>${this.esc(this._config.support_value)}</b>
          ${this.esc(this._config.support_label)}
        </div>
      </div>
    `;
    return o`
      <ha-card>
        ${t ? o`<button class="demo" type="button">${e}</button>` : o`<div class="demo-static">${e}</div>`}
      </ha-card>
    `;
  }
};
Fe.styles = _n;
Fe = yn([
  $("component-single-kpi-v2")
], Fe);
S({
  type: "component-single-kpi-v2",
  element: Fe,
  name: "Single KPI",
  description: "Reusable single KPI component."
});
const wn = [
  it,
  w`
    .wrap {
      padding: 12px 14px;
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
      min-height: 70px;
    }
    .icon {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 11px;
      background: var(--secondary-background-color);
      color: var(--primary-color);
    }
    ha-icon {
      --mdc-icon-size: 19px;
    }
    .title {
      font-size: 13px;
      font-weight: 650;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .desc {
      margin-top: 3px;
      font-size: 10.5px;
      line-height: 1.3;
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
      font-size: 12px;
      font-weight: 650;
    }
    .status span {
      display: block;
      margin-top: 3px;
      font-size: 10.5px;
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
var $n = Object.getOwnPropertyDescriptor, kn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? $n(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const Cn = {
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
let Be = class extends k {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Cn, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = x(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = o`
      <div class="wrap">
        <span class="icon">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
        </span>
        <div>
          <div class="title">${this.esc(this._config.title)}</div>
          <div class="desc">${this.esc(this._config.description)}</div>
        </div>
        <div class="status">
          <b>${this.esc(this._config.status_value)}</b>
          <span>${this.esc(this._config.status_label)}</span>
        </div>
      </div>
    `;
    return o`
      <ha-card>
        ${t ? o`<button class="demo" type="button">${e}</button>` : o`<div class="demo-static">${e}</div>`}
      </ha-card>
    `;
  }
};
Be.styles = wn;
Be = kn([
  $("component-status-row-v2")
], Be);
S({
  type: "component-status-row-v2",
  element: Be,
  name: "Status Row",
  description: "Reusable status row component."
});
const Sn = w`
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
var An = Object.getOwnPropertyDescriptor, En = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? An(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const zn = {
  type: "custom:component-text-effect-v1",
  effect: "stamp",
  description: "",
  icon: null,
  speed: 2.6
};
let Ve = class extends k {
  constructor() {
    super(...arguments), this._settleTimer = null;
  }
  setConfig(t) {
    if (!t?.text)
      throw new Error("text is required");
    super.setConfig({ ...zn, ...t });
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
Ve.styles = Sn;
Ve = En([
  $("component-text-effect-v1")
], Ve);
S({
  type: "component-text-effect-v1",
  element: Ve,
  name: "Signature Text Effect",
  description: "Reusable transient-status effects using the existing signature motion language."
});
const Tn = [
  it,
  w`
    .wrap {
      padding: 12px 14px;
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      min-height: 70px;
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
      outline-offset: 3px;
      border-radius: 8px;
    }
    .value {
      font-size: 22px;
      line-height: 1;
      font-weight: 650;
      letter-spacing: -0.025em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .label {
      margin-top: 5px;
      font-size: 10.5px;
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
var On = Object.getOwnPropertyDescriptor, Dn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? On(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const Pn = {
  type: "custom:component-three-stat-v2",
  metric_1_value: "00",
  metric_1_label: "Metric one",
  metric_2_value: "00",
  metric_2_label: "Metric two",
  metric_3_value: "00",
  metric_3_label: "Metric three",
  interactive: !0
};
let We = class extends k {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Pn, ...t });
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
        x(e, { primary: r, feedback: !0 })
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
      const i = this._config[`metric_${e}_value`], r = this._config[`metric_${e}_label`], s = this._getAction(e), n = o`
        <div class="value">${this.esc(i)}</div>
        <div class="label">${this.esc(r)}</div>
      `;
      return s ? o`<button class="stat" data-index="${e}" type="button">
            ${n}
          </button>` : o`<div class="stat" data-index="${e}">${n}</div>`;
    });
    return o`
      <ha-card>
        <div class="wrap">${t}</div>
      </ha-card>
    `;
  }
};
We.styles = Tn;
We = Dn([
  $("component-three-stat-v2")
], We);
S({
  type: "component-three-stat-v2",
  element: We,
  name: "Three-stat Summary",
  description: "Reusable three-stat summary component."
});
const Hn = [
  H,
  w`
    .nav {
      width: 100%;
      text-align: left;
    }
    .wrap {
      min-height: 58px;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr);
      align-items: center;
      gap: 10px;
    }
    .icon {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-icon, 6px);
      background: transparent;
      color: var(--primary-color);
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
var Rn = Object.getOwnPropertyDescriptor, Nn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Rn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const Ln = {
  type: "custom:component-nav-tile-v2",
  icon: "mdi:door-open",
  title: "Destination",
  context: "Navigation",
  navigation_path: null
};
let Ge = class extends k {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Ln, ...t });
  }
  getCardSize() {
    return 1;
  }
  updated() {
    const t = this._config?.navigation_path, e = this.renderRoot.querySelector(
      "button.nav"
    );
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = x(e, {
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
    `;
    return o`
      <ha-card>
        ${t ? o`<button class="i nav" type="button">${e}</button>` : o`<div class="nav nav-static">${e}</div>`}
      </ha-card>
    `;
  }
};
Ge.styles = Hn;
Ge = Nn([
  $("component-nav-tile-v2")
], Ge);
S({
  type: "component-nav-tile-v2",
  element: Ge,
  name: "Navigation Tile",
  description: "Reusable navigation tile component."
});
const qn = [
  H,
  w`
    .wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-height: 56px;
    }
    .group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .chip {
      min-height: 44px;
      border: 1px solid var(--divider-color) !important;
      border-radius: var(--dashboard-radius-control, 8px);
      padding: 0 13px !important;
      display: flex;
      align-items: center;
      gap: 7px;
      color: var(--primary-text-color);
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }
    .chip ha-icon,
    .chip ha-state-icon {
      color: var(--primary-color);
      --mdc-icon-size: 19px;
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
var Mn = Object.getOwnPropertyDescriptor, In = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Mn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const jn = {
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
let Ke = class extends k {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...jn, ...t });
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
      x(t, {
        primary: () => this.moreInfo(this._config?.left_entity),
        feedback: !0
      })
    ), e && this._config?.action_1_path && this._interactionHandles.push(
      x(e, {
        primary: () => this.navigate(this._config?.action_1_path),
        feedback: !0
      })
    ), i && this._config?.action_2_path && this._interactionHandles.push(
      x(i, {
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
Ke.styles = qn;
Ke = In([
  $("component-quick-nav-v2")
], Ke);
S({
  type: "component-quick-nav-v2",
  element: Ke,
  name: "Quick Navigation",
  description: "Reusable quick navigation component."
});
const Un = w`
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
var Fn = Object.defineProperty, Bn = Object.getOwnPropertyDescriptor, jr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Bn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Fn(e, i, s), s;
};
const Vn = {
  type: "custom:component-room-navigation-v1",
  name: "Room",
  icon: "mdi:home-outline"
};
let te = class extends k {
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
    super.setConfig({ ...Vn, ...t }), this.hass && L.load(this.hass).then((e) => {
      this._registries = e;
    });
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = L.subscribe(this.hass, (t) => {
      this._registries = t;
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  willUpdate() {
    !this._registries && this.hass && L.load(this.hass).then((t) => {
      this._registries = t;
    }), this.isConnected && !this._unsubRegistry && this.hass && (this._unsubRegistry = L.subscribe(this.hass, (t) => {
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
    const e = Lr(t, this._registries, this.hass);
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
    t && this._config?.navigation_path ? (this._interactionHandle?.destroy(), this._interactionHandle = x(t, {
      primary: () => this.navigate(this._config?.navigation_path),
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  render() {
    if (!this._config) return o``;
    const t = this._getStatus(), e = this._presenceDetected(), i = `Open ${this._config.name}${t.summary ? `. ${t.summary}` : ""}`, r = e ? this._presenceHue() : 0, s = e ? `border-color: hsl(${r} 82% 68% / .62); box-shadow: 0 0 0 1px hsl(${r} 82% 68% / .18), 0 0 14px 2px hsl(${r} 82% 64% / .14);` : "";
    return o`
      <ha-card style="${s}" ?data-presence=${e}>
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
te.styles = Un;
jr([
  v()
], te.prototype, "_registries", 2);
te = jr([
  $("component-room-navigation-v1")
], te);
S({
  type: "component-room-navigation-v1",
  element: te,
  name: "Room Navigation",
  description: "Area-aware room navigation with presence status."
});
const Wn = [
  H,
  w`
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
var Gn = Object.getOwnPropertyDescriptor, Kn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Gn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const Qn = {
  type: "custom:component-room-sheet-v2",
  icon: "mdi:bed-king-outline",
  title: "Room name",
  rows: null
}, yr = [
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
let Qe = class extends k {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Qn, ...t });
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
    this._interactionHandles = [], (Array.isArray(this._config?.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : yr).forEach((e, i) => {
      const r = this._getAction(e);
      if (!r) return;
      const s = this.renderRoot.querySelector(
        `[data-row="${i}"]`
      );
      s && (s.setAttribute(
        "aria-label",
        e.aria_label || `${e.name || "Room control"}`
      ), this._interactionHandles.push(
        x(s, {
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
    const t = Array.isArray(this._config.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : yr;
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
      const s = i.section || "Controls", n = s !== e;
      n && (e = s);
      const a = this._getAction(i);
      return o`
                ${n ? o`<div class="sep">${this.esc(s)}</div>` : ""}
                ${a ? o`
                        <button
                          class="row actionable"
                          data-row="${r}"
                          type="button"
                        >
                          <ha-icon
                            icon="${this.esc(i.icon || "mdi:circle-outline")}"
                          ></ha-icon>
                          <span>
                            <div class="rname">
                              ${this.esc(i.name || "Control name")}
                            </div>
                            <div class="rstate">
                              ${this.esc(i.state || "")}
                            </div>
                          </span>
                          <span class="rvalue"
                            >${this.esc(i.value || "")}</span
                          >
                        </button>
                      ` : o`
                        <div class="row" data-row="${r}">
                          <ha-icon
                            icon="${this.esc(i.icon || "mdi:circle-outline")}"
                          ></ha-icon>
                          <span>
                            <div class="rname">
                              ${this.esc(i.name || "Control name")}
                            </div>
                            <div class="rstate">
                              ${this.esc(i.state || "")}
                            </div>
                          </span>
                          <span class="rvalue"
                            >${this.esc(i.value || "")}</span
                          >
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
Qe.styles = Wn;
Qe = Kn([
  $("component-room-sheet-v2")
], Qe);
S({
  type: "component-room-sheet-v2",
  element: Qe,
  name: "Room Sheet",
  description: "Reusable room-sheet component."
});
const Yn = [
  H,
  w`
    .row {
      width: 100%;
      text-align: left;
    }
    .wrap {
      min-height: 56px;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) minmax(72px, auto);
      align-items: center;
      gap: 10px;
    }
    .icon {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-icon, 6px);
      background: transparent;
      color: var(--primary-color);
    }
    .control {
      justify-self: end;
      min-width: 72px;
      display: flex;
      justify-content: flex-end;
    }
    .metric {
      font-size: 13px;
      font-weight: 600;
    }
    .slider {
      width: 96px;
      height: 5px;
      border-radius: var(--dashboard-radius-control, 8px);
      background: var(--divider-color);
      overflow: hidden;
    }
    .slider span {
      display: block;
      height: 100%;
      background: var(--primary-color);
      border-radius: var(--dashboard-radius-control, 8px);
    }
    .switch {
      width: 38px;
      height: 22px;
      border-radius: var(--dashboard-radius-control, 8px);
      background: var(--divider-color);
      padding: 3px;
      box-sizing: border-box;
    }
    .switch span {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--secondary-text-color);
      transition:
        margin 0.12s,
        background 0.12s;
    }
    .switch.on {
      background: color-mix(
        in srgb,
        var(--primary-color) 35%,
        var(--divider-color)
      );
    }
    .switch.on span {
      margin-left: 16px;
      background: var(--primary-color);
    }
    .action {
      min-height: 30px;
      padding: 0 10px;
      border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
      border-radius: var(--dashboard-radius-control, 5px);
      background: transparent;
      color: var(--primary-color);
      font-size: 11.5px;
      font-weight: 600;
      display: grid;
      place-items: center;
    }
    .slider:has(.live-slider) {
      position: relative;
      overflow: visible;
    }
    .live-slider {
      position: absolute;
      inset: -19px 0;
      width: 100%;
      height: 44px;
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
var Xn = Object.defineProperty, Zn = Object.getOwnPropertyDescriptor, ji = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Zn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Xn(e, i, s), s;
};
const Jn = {
  type: "custom:component-control-row-v2",
  icon: "mdi:lightbulb-outline",
  title: "Control name",
  state: "Current state",
  mode: "slider",
  value: 68,
  entity: null
};
let Dt = class extends k {
  constructor() {
    super(...arguments), this._on = !0, this._val = 68, this._interactionHandles = [], this._coalescer = null;
  }
  setConfig(t) {
    super.setConfig({ ...Jn, ...t }), this._on = this._config?.on !== !1, this._val = Math.max(0, Math.min(100, Number(this._config?.value) || 68)), this._resetCoalescer();
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
      const r = Number(t.attributes?.min ?? 0), s = Number(t.attributes?.max ?? 100), n = Number(t.state);
      if (Number.isFinite(n) && Number.isFinite(r) && Number.isFinite(s) && s > r)
        return Math.max(0, Math.min(100, (n - r) / (s - r) * 100));
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
    return this._coalescer ? this._coalescer : (this._coalescer = Or(
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
      const s = i.data_key || "value";
      return this.hass.callService(i.domain, i.service, {
        entity_id: e,
        ...i.data || {},
        [s]: t
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
      const s = this._getState(), n = Number(s?.attributes?.min ?? 0), a = Number(s?.attributes?.max ?? 100), c = n + (a - n) * t / 100;
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
    }), await Pe(
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
    for (const d of this._interactionHandles) d.destroy();
    this._interactionHandles = [];
    const t = this._config?.mode || "slider", e = !!this._config?.entity, i = this._getState(), r = e ? this._available(i) : !0, s = e ? i?.state === "on" : this._on;
    if (e && t === "slider") {
      const d = this.renderRoot.querySelector(
        ".identity"
      );
      d && (d.setAttribute("role", "button"), d.setAttribute("tabindex", "0"), d.setAttribute(
        "aria-label",
        `Open details for ${this._config?.title}`
      ), this._interactionHandles.push(
        x(d, {
          primary: () => this.moreInfo(this._config?.entity),
          feedback: !0
        })
      ));
      const u = this.renderRoot.querySelector(
        ".live-slider"
      );
      u && (u.disabled = !r, u.oninput = () => {
        this._val = Number(u.value), this._updateSliderVisual(), this._sliderCoalescer().request(this._val);
      });
      return;
    }
    const a = e ? t !== "slider" : !e && (t === "switch" || t === "slider"), c = this.renderRoot.querySelector(
      a ? "button.row" : ".row"
    );
    if (!(!a || !c)) {
      if (!e) {
        this._interactionHandles.push(
          x(c, {
            primary: () => {
              t === "switch" ? this._on = !this._on : t === "slider" && (this._val = (this._val + 20) % 120, this._val > 100 && (this._val = 0));
            },
            feedback: !0
          })
        );
        return;
      }
      if (t === "switch") {
        c.setAttribute("aria-pressed", String(s)), c.setAttribute(
          "aria-label",
          `${s ? "Turn off" : "Turn on"} ${this._config?.title}`
        );
        const d = c.querySelector(".switch");
        this._interactionHandles.push(
          x(c, {
            primary: () => this._toggle(s),
            hold: () => this.moreInfo(this._config?.entity),
            optimistic: {
              capture: () => s,
              apply: () => {
                const u = !s;
                this._on = u, c.setAttribute("aria-pressed", String(u)), d?.classList.toggle("on", u);
              },
              rollback: () => {
                this._on = s, c.setAttribute("aria-pressed", String(s)), d?.classList.toggle("on", s);
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
        x(c, {
          primary: () => t === "action" ? this._serviceAction() : this.moreInfo(this._config?.entity),
          feedback: !0
        })
      );
    }
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.mode || "slider", e = !!this._config.entity, i = this._getState(), r = e ? this._available(i) : !0, s = e ? i?.state === "on" : this._on;
    t === "slider" && e && (this._val = this._sliderPercent(i));
    const n = t === "switch" ? o`<span class="switch ${s ? "on" : ""}"
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
              `, c = e ? t !== "slider" : !e && (t === "switch" || t === "slider"), d = o`
      <div class="wrap">
        <span class="icon">
          <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
        </span>
        <span class="identity">
          <div class="title">${this.esc(this._config.title)}</div>
          <div class="desc">${this.esc(this._description(i))}</div>
        </span>
        <span class="control">${n}</span>
      </div>
    `;
    return o`
      <ha-card>
        ${c ? o`
                <button
                  class="i row"
                  type="button"
                  ?disabled=${e && !r}
                >
                  ${d}
                </button>
              ` : o`<div class="row row-static">${d}</div>`}
      </ha-card>
    `;
  }
};
Dt.styles = Yn;
ji([
  v()
], Dt.prototype, "_on", 2);
ji([
  v()
], Dt.prototype, "_val", 2);
Dt = ji([
  $("component-control-row-v2")
], Dt);
S({
  type: "component-control-row-v2",
  element: Dt,
  name: "Control Row",
  description: "Reusable control-row component."
});
const ta = [
  H,
  w`
    .wrap {
      min-height: 56px;
      display: grid;
      grid-template-columns: 36px minmax(0, 1fr) auto;
      align-items: center;
      gap: 10px;
    }
    .icon {
      width: 36px;
      height: 36px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-icon, 0px);
      background: transparent;
      color: var(--primary-color);
    }
    .buttons {
      display: flex;
      gap: 4px;
    }
    .btn {
      position: relative;
      width: 44px;
      height: 44px;
      border: 0 !important;
      border-radius: var(--dashboard-radius-control, 5px) !important;
      background: transparent !important;
      display: grid;
      place-items: center;
      color: var(--secondary-text-color);
      padding: 0 !important;
    }
    .btn:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border: 1px solid var(--dashboard-card-border-color, var(--divider-color));
      border-radius: var(--dashboard-radius-control, 5px);
    }
    .btn.main {
      color: var(--primary-color);
    }
    .btn ha-icon {
      position: relative;
      --mdc-icon-size: 17px;
    }
  `
];
var ea = Object.defineProperty, ia = Object.getOwnPropertyDescriptor, di = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ia(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && ea(e, i, s), s;
};
const Ce = { pause: 1, previous: 16, next: 32, play: 512 }, ra = {
  type: "custom:component-media-row-v2",
  icon: "mdi:speaker",
  title: "Media player",
  state: "Playing · Media title",
  entity: null
};
let gt = class extends k {
  constructor() {
    super(...arguments), this._playing = !0, this._optimisticPlaying = null, this._busy = !1, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...ra, ...t }), this._playing = !0, this._optimisticPlaying = null, this._busy = !1;
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
        }), await Pe(
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
    for (const n of this._interactionHandles) n.destroy();
    this._interactionHandles = [];
    const t = !!this._config?.entity, e = this._liveState(), r = t && this._available(e) ? e?.state === "playing" : this._playing;
    if (t) {
      const n = this.renderRoot.querySelector(
        ".identity"
      );
      n && (n.setAttribute(
        "aria-label",
        `Open details for ${this._config?.title}`
      ), this._interactionHandles.push(
        x(n, {
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
        x(a, {
          primary: () => this._momentary("media_previous_track"),
          feedback: !0
        })
      ), c && this._interactionHandles.push(
        x(c, {
          primary: () => this._momentary("media_next_track"),
          feedback: !0
        })
      );
    }
    const s = this.renderRoot.querySelector(
      ".main"
    );
    s && (t ? this._interactionHandles.push(
      x(s, {
        primary: () => this._playPause(r),
        optimistic: {
          capture: () => r,
          apply: () => {
            this._optimisticPlaying = !r, s.setAttribute(
              "aria-label",
              r ? "Play" : "Pause"
            ), s.querySelector("ha-icon")?.setAttribute(
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
      x(s, {
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
    const t = this._liveState(), e = !!this._config.entity, i = e && this._available(t), r = i ? t?.state === "playing" : this._playing, s = this._optimisticPlaying ?? r, n = i && this._supported(t, Ce.previous), a = i && this._supported(t, Ce.next), c = !this._busy && (!e || i && this._supported(
      t,
      s ? Ce.pause : Ce.play
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
                      ?disabled=${!n}
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
              aria-label="${s ? "Pause" : "Play"}"
              ?disabled=${!c}
            >
              <ha-icon icon="mdi:${s ? "pause" : "play"}"></ha-icon>
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
gt.styles = ta;
di([
  v()
], gt.prototype, "_playing", 2);
di([
  v()
], gt.prototype, "_optimisticPlaying", 2);
di([
  v()
], gt.prototype, "_busy", 2);
gt = di([
  $("component-media-row-v2")
], gt);
S({
  type: "component-media-row-v2",
  element: gt,
  name: "Media Row",
  description: "Reusable media-row component."
});
const sa = w`
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
var na = Object.defineProperty, aa = Object.getOwnPropertyDescriptor, Ui = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? aa(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && na(e, i, s), s;
};
const oa = "custom:auto-entities", xr = (t) => JSON.parse(JSON.stringify(t));
let Pt = class extends k {
  constructor() {
    super(...arguments), this._innerCard = null, this._innerError = !1, this._generation = 0, this._retryTimer = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.filter) throw new Error("An Auto-Entities filter is required");
    super.setConfig(xr(t)), this._generation += 1, this._retryTimer && clearTimeout(this._retryTimer), this._retryTimer = null, this._buildCard();
  }
  getCardSize() {
    const t = !!this._config?.header?.title?.trim();
    return (typeof this._innerCard?.getCardSize == "function" && Number(this._innerCard.getCardSize()) || 1) + (t ? 1 : 0);
  }
  getLayoutOptions() {
    return this._innerCard?.getLayoutOptions?.() ?? {};
  }
  _cardConfig() {
    const t = xr(
      this._config || {}
    ), e = t.exclude_invalid_states !== !1;
    delete t.header, delete t.exclude_invalid_states, t.type = oa;
    const i = t.filter ?? {};
    if (i.exclude = Array.isArray(i.exclude) ? [...i.exclude] : [], e)
      for (const r of ["unavailable", "unknown"])
        i.exclude.some(
          (s) => s?.state === r && Object.keys(s).length === 1
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
Pt.styles = sa;
Ui([
  v()
], Pt.prototype, "_innerCard", 2);
Ui([
  v()
], Pt.prototype, "_innerError", 2);
Pt = Ui([
  $("component-device-aware-auto-entities-v1")
], Pt);
S({
  type: "component-device-aware-auto-entities-v1",
  element: Pt,
  name: "Device Aware Auto Entities",
  description: "Presentation wrapper for Auto-Entities collections."
});
const ca = [
  it,
  w`
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
var la = Object.defineProperty, da = Object.getOwnPropertyDescriptor, Fi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? da(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && la(e, i, s), s;
};
const pa = {
  type: "custom:component-device-discovery-v2",
  demo: !1,
  refresh_seconds: 60,
  max_rows: 6
}, ha = [
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
let Ht = class extends k {
  constructor() {
    super(...arguments), this._flows = [], this._stateKind = "ready", this._timer = null, this._started = !1, this._loadGeneration = 0, this._interactionHandles = [];
  }
  setConfig(t) {
    const e = !!this._config?.demo;
    if (super.setConfig({ ...pa, ...t }), this._config?.demo) {
      (!e || this._started) && (this._timer && clearInterval(this._timer), this._timer = null, this._started = !1, this._loadGeneration += 1), this._flows = ha, this._stateKind = "ready";
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
      x(t, { primary: () => this.load(), feedback: !0 })
    );
    const e = this.renderRoot.querySelector(
      "button.refresh"
    );
    e && this._interactionHandles.push(
      x(e, { primary: () => this.load(), feedback: !0 })
    ), this.renderRoot.querySelectorAll("button.row").forEach((r) => {
      this._interactionHandles.push(
        x(r, {
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
    const t = Math.max(1, Number(this._config.max_rows) || 6), e = this._flows.slice(0, t), i = Math.max(0, this._flows.length - e.length), r = this._flows.length === 0, s = r ? "No devices waiting" : `${this._flows.length} ${this._flows.length === 1 ? "device" : "devices"} found`, n = r ? "Home Assistant has no new setup suggestions." : "Home Assistant has setup suggestions ready to review.";
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
              <div class="title">${this.esc(s)}</div>
              <div class="description">${this.esc(n)}</div>
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
      const c = this._name(a), d = `${this._source(a.context?.source)} · ${a.handler}`, u = o`
              <span class="icon"
                ><ha-icon icon="mdi:plus-circle-outline"></ha-icon
              ></span>
              <span>
                <div class="title">${this.esc(c)}</div>
                <div class="description">${this.esc(d)}</div>
              </span>
              <span class="review" aria-hidden="true">Review</span>
            `;
      return this._config?.demo ? o`<div class="row">${u}</div>` : o`<button
                  class="row"
                  type="button"
                  aria-label="Review ${this.esc(c)}"
                >
                  ${u}
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
Ht.styles = ca;
Fi([
  v()
], Ht.prototype, "_flows", 2);
Fi([
  v()
], Ht.prototype, "_stateKind", 2);
Ht = Fi([
  $("component-device-discovery-v2")
], Ht);
S({
  type: "component-device-discovery-v2",
  element: Ht,
  name: "Device Discovery",
  description: "Reusable device-discovery status component."
});
const ua = [
  qi,
  w`
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
var ma = Object.defineProperty, fa = Object.getOwnPropertyDescriptor, pi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? fa(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && ma(e, i, s), s;
};
const ga = {
  type: "custom:component-update-row-v3",
  icon: "mdi:update",
  title: "Update name",
  current: "Current 1.0",
  available: "Available 1.1",
  action: "Update",
  confirm: !0,
  entity: null
};
let bt = class extends k {
  constructor() {
    super(...arguments), this._busy = !1, this._requested = !1, this._error = "", this._startTimer = null, this._errorTimer = null, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...ga, ...t });
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
      const n = !!this._config?.entity;
      return {
        live: !1,
        missing: n,
        unavailable: n,
        title: this._config?.title || "Update",
        current: n ? "Update entity unavailable" : this._config?.current || "Current 1.0",
        available: n ? "" : this._config?.available || "Available 1.1",
        action: n ? "Unavailable" : this._config?.action || "Update",
        pending: !n,
        progress: {
          active: !1,
          determinate: !1,
          value: 0
        }
      };
    }
    const e = t.attributes || {}, i = ["unavailable", "unknown"].includes(t.state), r = t.state === "on", s = this._progress(e);
    return {
      live: !0,
      missing: !1,
      unavailable: i,
      title: this._name(t),
      current: e.installed_version ? `Current ${e.installed_version}` : "Current version unavailable",
      available: e.latest_version ? `Available ${e.latest_version}` : "Latest version unavailable",
      action: i ? "Unavailable" : s.active ? "Updating…" : r ? "Update" : "Current",
      pending: r,
      progress: s
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
      x(e, {
        primary: () => this.moreInfo(this._config?.entity),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    )), i && this._interactionHandles.push(
      x(i, {
        primary: () => this._install(t),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._data(), e = t.progress.active || this._busy || this._requested, i = t.missing || t.unavailable || !t.pending || e, r = this._error ? "Retry" : this._busy || this._requested ? "Starting…" : t.action, s = this._error ? this._error : `${t.current}${t.available ? ` · ${t.available}` : ""}`, n = e ? t.progress.determinate ? o`
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
                ${this.esc(s)}
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
        ${n}
      </ha-card>
    `;
  }
};
bt.styles = ua;
pi([
  v()
], bt.prototype, "_busy", 2);
pi([
  v()
], bt.prototype, "_requested", 2);
pi([
  v()
], bt.prototype, "_error", 2);
bt = pi([
  $("component-update-row-v3")
], bt);
S({
  type: "component-update-row-v3",
  element: bt,
  name: "Update Row",
  description: "Reusable update row with live update support."
});
const ba = [
  qi,
  w`
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
var _a = Object.defineProperty, va = Object.getOwnPropertyDescriptor, Bi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? va(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && _a(e, i, s), s;
};
const ya = {
  type: "custom:component-update-summary-v3",
  count: "3",
  title: "updates available",
  message: "Review the items below before installing.",
  live_updates: !1,
  update_all: !1,
  confirm: !0
};
let Rt = class extends k {
  constructor() {
    super(...arguments), this._busy = !1, this._error = "", this._messageTimer = null, this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...ya, ...t });
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
      (s) => !this._inProgress(s.attributes)
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
    ], r = t.map((s) => s.entity_id).filter((s) => !i.includes(s));
    try {
      r.length && await this.hass.callService("update", "install", { entity_id: r });
      for (const s of i)
        t.some((n) => n.entity_id === s) && await this.hass.callService("update", "install", { entity_id: s });
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
    t ? (this._interactionHandle?.destroy(), this._interactionHandle = x(t, {
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
Rt.styles = ba;
Bi([
  v()
], Rt.prototype, "_busy", 2);
Bi([
  v()
], Rt.prototype, "_error", 2);
Rt = Bi([
  $("component-update-summary-v3")
], Rt);
S({
  type: "component-update-summary-v3",
  element: Rt,
  name: "Update Summary",
  description: "Reusable update summary with live update support."
});
const xa = w`
  :host {
    display: block;
    min-width: 0;
  }
  * {
    box-sizing: border-box;
  }
  .stack {
    display: grid;
    gap: 8px;
  }
  .remote {
    padding: 12px;
    border: var(--dashboard-card-border, 1px solid var(--divider-color));
    border-radius: var(
      --dashboard-radius-card,
      var(--ha-card-border-radius, 8px)
    );
    background: var(
      --dashboard-card-surface,
      var(--ha-card-background, var(--card-background-color))
    );
    color: var(--primary-text-color);
  }
  .remote[hidden] {
    display: none;
  }
  .remote-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
  }
  .remote-title {
    font-size: 13px;
    font-weight: 600;
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
    appearance: none;
    border: 1px solid var(--divider-color);
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    font: inherit;
    cursor: pointer;
  }
  .power button,
  .utility button {
    min-height: 44px;
    padding: 0 10px;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
  }
  .power ha-icon,
  .utility ha-icon {
    --mdc-icon-size: 17px;
  }
  .dpad {
    width: min(230px, 72vw);
    aspect-ratio: 1;
    margin: 8px auto 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 6px;
  }
  .dpad button {
    border-radius: 50%;
    display: grid;
    place-items: center;
  }
  .dpad button.select {
    background: var(--card-background-color);
    color: var(--primary-color);
  }
  .dpad button.blank {
    visibility: hidden;
  }
  .dpad ha-icon {
    --mdc-icon-size: 26px;
  }
  .utility {
    justify-content: center;
  }
  .keyboard {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    gap: 6px;
    margin-top: 10px;
  }
  .keyboard[hidden] {
    display: none;
  }
  .keyboard input {
    min-width: 0;
    height: 44px;
    padding: 0 10px;
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font: inherit;
  }
  .keyboard button {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: grid;
    place-items: center;
  }
  .keyboard ha-icon {
    --mdc-icon-size: 18px;
  }
  :is(button, input):focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  button:disabled,
  input:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;
var wa = Object.defineProperty, $a = Object.getOwnPropertyDescriptor, Ur = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? $a(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && wa(e, i, s), s;
};
const ka = Object.freeze([
  ["up", "Up", "mdi:chevron-up"],
  ["left", "Left", "mdi:chevron-left"],
  ["select", "Select", "mdi:radiobox-marked"],
  ["right", "Right", "mdi:chevron-right"],
  ["down", "Down", "mdi:chevron-down"]
]), Ca = Object.freeze([
  ["menu", "Menu", "mdi:menu"],
  ["home", "Home", "mdi:home-outline"],
  ["top_menu", "Top Menu", "mdi:format-list-bulleted"]
]), Sa = (t) => ({
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
let ee = class extends k {
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
        Sa(this._config)
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
    if (!(this._config?.demo || !this.hass || !this._config?.remote_entity))
      try {
        await this.hass.callService("remote", "send_command", {
          entity_id: this._config.remote_entity,
          command: t
        });
      } catch (e) {
        console.error(`Apple TV remote command failed: ${t}`, e);
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
  updated() {
    for (const r of this._interactionHandles) r.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll(
      ".remote button[data-cmd]"
    ).forEach((r) => {
      const s = r.dataset.cmd;
      s && this._interactionHandles.push(
        x(r, {
          primary: () => this._remoteCommand(s),
          feedback: !0
        })
      );
    });
    const e = this.renderRoot.querySelector(
      ".keyboard-set"
    ), i = this.renderRoot.querySelector(
      ".keyboard-clear"
    );
    e && this._interactionHandles.push(
      x(e, {
        primary: () => this._keyboardAction("set_keyboard_text"),
        feedback: !0
      })
    ), i && this._interactionHandles.push(
      x(i, {
        primary: () => this._keyboardAction("clear_keyboard_text"),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.remote_entity, e = t && this.hass?.states?.[t], i = this._config.demo || !!(e && e.state !== "unavailable" && e.state !== "unknown"), r = !!(this._config.keyboard_entity && this._config.keyboard_config_entry_id), s = this._config.demo || r && this.hass?.states?.[this._config.keyboard_entity]?.state === "on", n = new Map(
      ka.map((c) => [c[0], c])
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
        <div class="native">${this._nativeCard}</div>

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
                      >
                        <ha-icon icon="mdi:power-on"></ha-icon>
                        <span>Wake</span>
                      </button>
                      <button
                        type="button"
                        data-cmd="suspend"
                        aria-label="Sleep"
                        ?disabled=${!i}
                      >
                        <ha-icon icon="mdi:power-sleep"></ha-icon>
                        <span>Sleep</span>
                      </button>
                    </span>
                  </div>

                  <div class="dpad" aria-label="Apple TV directional remote">
                    ${a.map((c) => {
      if (!c)
        return o`<button
                          class="blank"
                          type="button"
                          tabindex="-1"
                          aria-hidden="true"
                        ></button>`;
      const [, d, u] = n.get(c);
      return o`
                        <button
                          class="${c === "select" ? "select" : "direction"}"
                          type="button"
                          data-cmd="${c}"
                          aria-label="${d}"
                          ?disabled=${!i}
                        >
                          <ha-icon icon="${u}"></ha-icon>
                        </button>
                      `;
    })}
                  </div>

                  <div class="utility">
                    ${Ca.map(
      ([c, d, u]) => o`
                        <button
                          type="button"
                          data-cmd="${c}"
                          aria-label="${d}"
                          ?disabled=${!i}
                        >
                          <ha-icon icon="${u}"></ha-icon>
                          <span>${d}</span>
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
                              ?disabled=${!s}
                              @keydown=${(c) => {
      c.key === "Enter" && this._keyboardAction("set_keyboard_text");
    }}
                            />
                            <button
                              class="keyboard-set"
                              type="button"
                              aria-label="Set keyboard text"
                              ?disabled=${!s}
                            >
                              <ha-icon icon="mdi:keyboard"></ha-icon>
                            </button>
                            <button
                              class="keyboard-clear"
                              type="button"
                              aria-label="Clear keyboard text"
                              ?disabled=${!s}
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
};
ee.styles = xa;
Ur([
  v()
], ee.prototype, "_nativeCard", 2);
ee = Ur([
  $("component-apple-tv-controller-v1")
], ee);
S({
  type: "component-apple-tv-controller-v1",
  element: ee,
  name: "Apple TV Controller",
  description: "Native Home Assistant media controls with an optional explicit Apple TV remote."
});
const Aa = w`
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
    overflow: hidden;
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
  }
  .row {
    min-height: 62px;
    padding: 8px 9px 8px 12px;
    display: grid;
    grid-template-columns: 36px minmax(0, 1fr) auto;
    align-items: center;
    gap: 9px;
  }
  .icon {
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    color: var(--secondary-text-color);
  }
  .icon ha-icon {
    --mdc-icon-size: 21px;
  }
  .identity {
    appearance: none;
    border: 0;
    background: transparent;
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
  .actions {
    display: flex;
    gap: 4px;
  }
  .action,
  .close {
    appearance: none;
    min-width: 44px;
    height: 44px;
    padding: 0 10px;
    border: 0;
    border-radius: 10px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    color: var(--secondary-text-color);
  }
  .action:hover,
  .close:hover {
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
  }
  .action ha-icon,
  .close ha-icon {
    --mdc-icon-size: 19px;
  }
  button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  button:disabled {
    cursor: default;
    opacity: 0.45;
  }
  dialog {
    width: min(560px, calc(100vw - 24px));
    max-height: calc(100dvh - 24px);
    padding: 0;
    border: 1px solid var(--divider-color);
    border-radius: var(--ha-card-border-radius, 16px);
    background: var(--card-background-color);
    color: var(--primary-text-color);
    box-shadow: var(--dashboard-dialog-shadow, 0 16px 48px rgba(0, 0, 0, 0.24));
    overflow: hidden;
  }
  dialog::backdrop {
    background: var(--dashboard-modal-scrim, rgba(0, 0, 0, 0.32));
    backdrop-filter: blur(3px);
  }
  .sheet {
    display: flex;
    flex-direction: column;
    max-height: calc(100dvh - 24px);
  }
  .head {
    min-height: 56px;
    padding: 6px 7px 6px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--divider-color);
  }
  .sheet-title {
    min-width: 0;
    flex: 1;
    font-size: 14px;
    font-weight: 650;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .body,
  .inline {
    overflow: auto;
    overscroll-behavior: contain;
    padding: 12px 14px max(14px, env(safe-area-inset-bottom));
  }
  .inline {
    border-top: 1px solid var(--divider-color);
  }
  .inline[hidden] {
    display: none;
  }
  .groups {
    display: grid;
    gap: 16px;
  }
  .group {
    display: grid;
    gap: 7px;
  }
  .group-list {
    display: grid;
    gap: 6px;
  }
  .group-title {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--secondary-text-color);
    font-size: 13px;
    font-weight: 600;
  }
  .group-title:after {
    content: "";
    height: 1px;
    background: var(--divider-color);
    flex: 1;
  }
  .classification-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .classification {
    appearance: none;
    min-width: 0;
    padding: 0;
    overflow: hidden;
    border: 1px solid var(--divider-color);
    border-radius: 12px;
    background: var(--secondary-background-color);
    color: inherit;
    text-align: left;
    cursor: pointer;
  }
  .classification-image {
    display: block;
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    background: var(--dashboard-media-surface, #111);
  }
  .classification-copy {
    display: block;
    min-height: 52px;
    padding: 8px 10px;
  }
  .classification-name,
  .classification-time {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .classification-name {
    font-size: 13px;
    font-weight: 650;
  }
  .classification-time {
    margin-top: 3px;
    color: var(--secondary-text-color);
    font-size: 13px;
  }
  .classification:hover {
    border-color: color-mix(
      in srgb,
      var(--primary-color) 36%,
      var(--divider-color)
    );
  }
  .classification:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  .control {
    min-height: 52px;
    padding: 5px 5px 5px 10px;
    border: 1px solid var(--divider-color);
    border-radius: 12px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
  }
  .copy {
    min-width: 0;
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
    font-weight: 600;
  }
  .control-state {
    margin-top: 3px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }
  .control button {
    appearance: none;
    width: 96px;
    min-height: 44px;
    padding: 0 10px;
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    background: transparent;
    cursor: pointer;
  }
  .control button.on {
    color: var(--primary-color);
    border-color: color-mix(
      in srgb,
      var(--primary-color) 45%,
      var(--divider-color)
    );
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  }
  .control button.confirm {
    color: var(--warning-color, var(--error-color));
    border-color: currentColor;
  }
  .detection.on {
    border-color: color-mix(
      in srgb,
      var(--primary-color) 40%,
      var(--divider-color)
    );
  }
  .feedback {
    min-height: 18px;
    margin-top: 8px;
    color: var(--secondary-text-color);
    font-size: 13px;
  }
  .feedback.error {
    color: var(--error-color);
  }
  @media (max-width: 520px) {
    .action span {
      display: none;
    }
    .action {
      padding: 0;
    }
    dialog {
      width: 100vw;
      max-width: 100vw;
      max-height: 90dvh;
      margin: auto 0 0;
      border-width: 1px 0 0;
      border-radius: 16px 16px 0 0;
    }
    .sheet {
      max-height: 90dvh;
    }
    .body {
      padding: 10px 12px max(18px, env(safe-area-inset-bottom));
    }
    .classification-list {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;
var Ea = Object.defineProperty, za = Object.getOwnPropertyDescriptor, me = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? za(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Ea(e, i, s), s;
};
let J = class extends k {
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
        const e = await ue(
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
    const t = this._camera, e = this._model?.error || this._model?.profileError, i = t?.name || this._config.title || "Camera", r = this._model?.profileMissing ? `Configure ${this._config.profile || "household-security"}` : e ? "Controls unavailable" : t?.active ? "Activity detected" : t?.online ? "Online" : "Unavailable", s = !!(t && (t.switches.length || t.detections.length || t.actions.length || t.ptz.length));
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
              ?hidden=${this._config.expanded || !s}
              @click=${() => {
      const n = this.renderRoot.querySelector("dialog");
      n && !n.open && n.showModal();
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
        @click=${(n) => {
      const a = this.renderRoot.querySelector("dialog");
      n.target === a && a?.close();
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
      const n = this.renderRoot.querySelector("dialog");
      n && n.close();
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
      const i = e.entity.entity_id, r = this.hass?.states[i], s = r?.attributes?.entity_picture, n = r?.last_updated, a = n && new Date(n), c = a && Number.isFinite(a.getTime()) ? ti(this.hass, a, {
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
                          ${s ? o`<img
                                class="classification-image"
                                src="${s}"
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
      const i = e.entity.entity_id, s = this.hass?.states[i]?.state === "on", n = this._confirmId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.role || "Control")}</span
                            >
                            <span class="control-state"
                              >${s ? "On" : "Off"}</span
                            >
                          </span>
                          <button
                            class="${s ? "on" : ""} ${n ? "confirm" : ""}"
                            type="button"
                            @click=${() => this._toggleSwitch(e, s)}
                          >
                            ${n ? "Confirm off" : s ? "On" : "Off"}
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
J.stubConfig = { profile: "household-security" };
J.styles = Aa;
me([
  v()
], J.prototype, "_model", 2);
me([
  v()
], J.prototype, "_camera", 2);
me([
  v()
], J.prototype, "_confirmId", 2);
J = me([
  $("component-camera-controller-v2")
], J);
S({
  type: "component-camera-controller-v2",
  element: J,
  name: "Camera Controller V2",
  description: "Platform-adapted camera controls with explicit state and protected destructive changes."
});
let Ci = class extends J {
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      ...t,
      type: "custom:component-camera-controller-v1"
    });
  }
};
Ci = me([
  $("component-camera-controller-v1")
], Ci);
S({
  type: "component-camera-controller-v1",
  element: Ci,
  name: "Camera Controller V1",
  description: "Legacy camera controller adapter registering custom:component-camera-controller-v1."
});
const Ta = [
  H,
  w`
    :host {
      display: block;
      min-width: 0;
    }
    ha-card {
      container-type: inline-size;
      overflow: hidden;
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
  `
];
var Oa = Object.defineProperty, Da = Object.getOwnPropertyDescriptor, fe = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Da(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Oa(e, i, s), s;
};
let ot = class extends k {
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
    const t = String(this._config?.control_entity || "");
    return t.startsWith("button.") ? t : null;
  }
  _status() {
    const t = this._entityState(this._config?.entity), e = this._entityState(this._controlEntityId()), i = this._entityState(this._config?.availability_entity), r = !!this._config?.availability_entity && (!i || i.state !== "on") || !e || ur(e), s = String(t?.state || "unknown").toLowerCase(), n = s === "on" || s === "off", a = n && s === "off", c = n && s === "on", d = !t || ur(t);
    return {
      state: t,
      control: e,
      controllerUnavailable: r,
      stateUnavailable: d,
      known: n,
      closed: a,
      notClosed: c,
      reed: s
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
      const s = setTimeout(() => {
        this._confirmation?.timer === s && (this._confirmation = null, r(new Error("Garage state confirmation timed out")));
      }, e);
      this._confirmation = { expected: t, resolve: i, reject: r, timer: s }, this._checkConfirmation();
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
      if (r = this._waitForConfirmation(e), r.catch(() => {
      }), await this.hass.callService("button", "press", {
        entity_id: this._controlEntityId()
      }), i !== this._requestGeneration) return;
      this._pendingLabel = e === "on" ? "Opening" : e === "off" ? "Closing" : "Waiting";
      const s = await r;
      if (i !== this._requestGeneration) return;
      this._setMessage(
        s === "off" ? "Closed confirmed." : s === "on" ? "Door movement confirmed." : "Garage state confirmed."
      );
    } catch (s) {
      if (i !== this._requestGeneration) return;
      this._cancelConfirmation(
        s instanceof Error ? s : new Error("Garage command failed")
      );
      const n = String(s?.message || "");
      this._setMessage(
        n.includes("timed out") ? "The command was sent, but the door state was not confirmed." : "The garage-door command failed.",
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
      x(t, {
        primary: () => this.moreInfo(this._config?.entity),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    ), e && this._interactionHandles.push(
      x(e, {
        primary: () => this._requestAction(),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._status(), i = (t.state?.attributes?.friendly_name || "").replace(/\s*Garage Door Status$/i, "").trim(), r = this._config.title || i || "Garage door", s = t.controllerUnavailable ? "Controller unavailable" : t.closed ? "Closed" : t.notClosed ? "Not closed" : t.stateUnavailable ? "Door state unavailable" : "Door state unknown", n = t.closed ? "Open" : "Trigger", a = t.controllerUnavailable || this._busy;
    return o`
      <ha-card>
        <div class="w">
          <div class="row">
            <button
              class="identity"
              type="button"
              aria-label="Open details for ${this.esc(r)}"
            >
              <span class="well ${t.notClosed ? "not-closed" : ""}">
                <ha-icon
                  icon="${t.controllerUnavailable || !t.known ? "mdi:garage-alert" : t.notClosed ? "mdi:garage-open" : "mdi:garage"}"
                ></ha-icon>
              </span>
              <span class="copy">
                <span class="name">${this.esc(r)}</span>
                <span class="state" role="status" aria-live="polite"
                  >${this.esc(s)}</span
                >
              </span>
            </button>
            <button
              class="action ${this._busy ? "pending" : ""}"
              type="button"
              ?disabled=${a}
              aria-disabled="${String(a)}"
              aria-label="${t.controllerUnavailable ? "Garage door controller unavailable" : this._busy ? `${this._pendingLabel || "Waiting for"} garage door state confirmation` : t.closed ? "Open garage door" : "Trigger garage door operator"}"
            >
              <ha-icon
                icon="${this._busy ? "mdi:progress-clock" : t.closed ? "mdi:garage-open" : "mdi:gesture-tap-button"}"
              ></ha-icon>
              <span
                >${this.esc(this._busy ? this._pendingLabel || "Waiting" : n)}</span
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
ot.styles = Ta;
fe([
  v()
], ot.prototype, "_busy", 2);
fe([
  v()
], ot.prototype, "_pendingLabel", 2);
fe([
  v()
], ot.prototype, "_message", 2);
fe([
  v()
], ot.prototype, "_messageType", 2);
ot = fe([
  $("component-garage-door-controller-v1")
], ot);
S({
  type: "component-garage-door-controller-v1",
  element: ot,
  name: "Garage Door Controller",
  description: "A garage-door controller for a closed-position reed sensor and momentary operator trigger."
});
const Pa = [
  H,
  w`
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
      background: var(
        --dashboard-modal-scrim,
        var(
          --ha-dialog-scrim-color,
          color-mix(in srgb, var(--primary-text-color) 32%, transparent)
        )
      );
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
      box-shadow: var(
        --dashboard-dialog-shadow,
        0 16px 48px rgba(0, 0, 0, 0.22)
      );
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
      .w {
        padding: 12px;
      }
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
var Ha = Object.defineProperty, Ra = Object.getOwnPropertyDescriptor, Fr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ra(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Ha(e, i, s), s;
};
const Se = (t) => !t || ["unknown", "unavailable"].includes(t.state), ht = (t) => String(t || "").replaceAll("_", " ").replace(/^./, (e) => e.toUpperCase()), Kt = (t) => Number.isFinite(Number(t)) ? Number(t).toFixed(Number(t) % 1 ? 1 : 0) + "°" : "—";
let ie = class extends k {
  constructor() {
    super(...arguments), this._activePanel = null, this._interactionHandles = [];
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
  _power() {
    const t = this._state();
    return this._call("climate", t?.state === "off" ? "turn_on" : "turn_off", {
      entity_id: this._config?.entity
    });
  }
  _temperature(t) {
    const e = this._state()?.attributes || {}, i = Number(e.temperature), r = Number(e.target_temp_step) || 0.5;
    if (Number.isFinite(i))
      return this._call("climate", "set_temperature", {
        entity_id: this._config?.entity,
        temperature: i + t * r
      });
  }
  _vanes() {
    return [
      ["Vertical", this._config?.vertical_vane_entity],
      ["Horizontal", this._config?.horizontal_vane_entity]
    ].flatMap(([e, i]) => {
      const r = this._state(i);
      return i && r && !Se(r) ? [{ axis: e, entity: i, state: r }] : [];
    });
  }
  _closeOverlay() {
    this._activePanel = null;
  }
  _openPanel(t) {
    this._activePanel = t;
  }
  disconnectedCallback() {
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const r = this.renderRoot.querySelector(e);
      r && this._interactionHandles.push(
        x(r, { primary: i, feedback: !0 })
      );
    };
    t(".pw", () => this._power()), t(".sg", () => this._openPanel("settings")), t(".decrease", () => this._temperature(-1)), t(".increase", () => this._temperature(1)), t(".ma", () => this._openPanel("mode")), t(".fa", () => this._openPanel("fan")), t(".va", () => this._openPanel("vanes")), t(".ta", () => this._openPanel("timer"));
  }
  render() {
    if (!this._config) return o``;
    const t = this._state(), e = t?.attributes || {}, i = t && !Se(t) && t.state !== "off", r = this._state(this._config.timer_entity), n = this._vanes().map((d) => `${d.axis.slice(0, 1)} ${ht(d.state.state)}`).join(" · "), a = this._config.title || e.friendly_name || "Split system", c = Se(t) ? "Unavailable" : i ? ht(t?.state) : "Off";
    return o`
      <ha-card>
        <div class="w">
          <div class="hd settings">
            <button
              class="idn"
              type="button"
              @click=${() => this.moreInfo(this._config?.entity)}
            >
              <span class="iw"><ha-icon icon="mdi:thermostat"></ha-icon></span>
              <span class="cp">
                <span class="nm">${this.esc(a)}</span>
                <span class="st" role="status">${this.esc(c)}</span>
              </span>
            </button>
            <button class="pw sg" type="button" aria-label="Advanced settings">
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            <button
              class="pw ${i ? "on" : ""}"
              type="button"
              aria-label="Toggle split system power"
              ?disabled=${Se(t)}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>

          <div class="ct">
            <div class="cr">
              <div class="rm">
                <span class="rv"
                  >${Kt(e.current_temperature)}</span
                >
                <span class="ml">Room temperature</span>
              </div>
              <div class="tc">
                <button
                  class="tb decrease"
                  type="button"
                  aria-label="Decrease target temperature"
                  ?disabled=${!i}
                >
                  <ha-icon icon="mdi:minus"></ha-icon>
                </button>
                <div class="tp">
                  <div class="tv">${Kt(e.temperature)}</div>
                  <div class="ts">Target</div>
                </div>
                <button
                  class="tb increase"
                  type="button"
                  aria-label="Increase target temperature"
                  ?disabled=${!i}
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
              >
                <ha-icon icon="mdi:thermostat"></ha-icon>
                <span class="al">Mode · ${ht(t?.state)}</span>
              </button>
              <button
                class="a fa"
                type="button"
                data-panel="fan"
                aria-expanded="${String(this._activePanel === "fan")}"
              >
                <ha-icon icon="mdi:fan"></ha-icon>
                <span class="al">Fan · ${ht(e.fan_mode)}</span>
              </button>
              ${n ? o`
                      <button
                        class="a va"
                        type="button"
                        data-panel="vanes"
                        aria-expanded="${String(this._activePanel === "vanes")}"
                      >
                        <ha-icon icon="mdi:swap-vertical"></ha-icon>
                        <span class="al">Vanes · ${this.esc(n)}</span>
                      </button>
                    ` : ""}
              ${this._config.timer_entity ? o`
                      <button
                        class="a ta ${r?.state === "active" ? "av" : ""}"
                        type="button"
                        data-panel="timer"
                        aria-expanded="${String(this._activePanel === "timer")}"
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
              @click=${this._closeOverlay}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="pb">${this._renderPanelContent()}</div>
        </div>
      </section>
    `;
  }
  _renderPanelContent() {
    const t = this._state(), e = t?.attributes || {};
    if (this._activePanel === "mode") {
      const n = e.hvac_modes || [];
      return o`
        <div class="qs choices">
          ${n.map(
        (a) => o`
              <button
                class="o choice"
                type="button"
                aria-selected="${String(a === t?.state)}"
                @click=${() => {
          this._call("climate", "set_hvac_mode", {
            entity_id: this._config?.entity,
            hvac_mode: a
          }), this._closeOverlay();
        }}
              >
                <span></span>
                <span>${ht(a)}</span>
                <span class="oi"></span>
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
        (a) => o`
              <button
                class="o choice"
                type="button"
                aria-selected="${String(a === e.fan_mode)}"
                @click=${() => {
          this._call("climate", "set_fan_mode", {
            entity_id: this._config?.entity,
            fan_mode: a
          }), this._closeOverlay();
        }}
              >
                <span></span>
                <span>${ht(a)}</span>
                <span class="oi"></span>
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
        (a) => o`
            <section class="group og">
              <p class="gt">${a.axis} vane</p>
              <div class="qs choices">
                ${(a.state.attributes?.options || []).map(
          (c) => o`
                    <button
                      class="o choice"
                      type="button"
                      aria-selected="${String(c === a.state.state)}"
                      @click=${() => {
            this._call("select", "select_option", {
              entity_id: a.entity,
              option: c
            }), this._closeOverlay();
          }}
                    >
                      <span></span>
                      <span>${ht(c)}</span>
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
        ([n, a]) => o`
              <button
                type="button"
                @click=${() => {
          this._call("timer", "start", {
            entity_id: this._config?.timer_entity,
            duration: a
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
    const i = Number(e.min_temp), r = Number(e.max_temp), s = Number(e.target_temp_step) || 0.5;
    return o`
      <p class="fb">
        Native Home Assistant controls · ${Kt(i)}–${Kt(r)}
        · ${Kt(s)} steps
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
      const a = typeof n == "string" ? n : n?.entity;
      if (!a) return "";
      const c = typeof n == "object" && n.name ? n.name : this._state(a)?.attributes?.friendly_name || a;
      return o`
            <button
              class="o setting"
              type="button"
              style="margin-bottom: 6px;"
              @click=${() => {
        const [d] = a.split(".");
        this._call(d, "turn_on", { entity_id: a }), this._closeOverlay();
      }}
            >
              <span></span>
              <span>${this.esc(c)}</span>
              <span class="oi"></span>
            </button>
          `;
    })}
      </div>
    `;
  }
};
ie.styles = Pa;
Fr([
  v()
], ie.prototype, "_activePanel", 2);
ie = Fr([
  $("component-split-controller-v4")
], ie);
S({
  type: "component-split-controller-v4",
  element: ie,
  name: "Split-System Controller",
  description: "Direct Home Assistant climate controls with the established Split System presentation."
});
const Na = [
  H,
  w`
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
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
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
      box-shadow: var(
        --dashboard-dialog-shadow,
        0 16px 48px rgba(0, 0, 0, 0.22)
      );
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
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
    }
    .preset-btn.active {
      border-color: color-mix(
        in srgb,
        var(--primary-color) 55%,
        var(--divider-color)
      );
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
        border-radius: var(--dashboard-radius-dialog, 8px)
          var(--dashboard-radius-dialog, 8px) 0 0;
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
  `
];
var La = Object.defineProperty, qa = Object.getOwnPropertyDescriptor, hi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? qa(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && La(e, i, s), s;
};
let _t = class extends k {
  constructor() {
    super(...arguments), this._registries = null, this._bundle = null, this._brightnessIntent = null, this._unsubRegistry = null, this._brightnessCoalescer = null, this._interactionHandles = [];
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
    this.hass && L.load(this.hass).then((t) => {
      this._registries = t, this._bundle = this._resolveBundle();
    });
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = L.subscribe(this.hass, (t) => {
      this._registries = t, this._bundle = this._resolveBundle();
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._brightnessCoalescer?.destroy(), this._brightnessCoalescer = null, this._brightnessIntent = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    !this._unsubRegistry && this.isConnected && this.hass && (this._unsubRegistry = L.subscribe(this.hass, (t) => {
      this._registries = t, this._bundle = this._resolveBundle();
    })), !this._bundle && this.hass && this._registries && (this._bundle = this._resolveBundle());
  }
  _resolveBundle() {
    if (!this._config?.entity || !this.hass) return null;
    const e = (this._registries?.entities || []).find((g) => g.entity_id === this._config.entity), i = this._config.device_id || e?.device_id, s = ((i ? this._registries?.byDevice?.get(i) : []) || []).filter(
      (g) => g?.platform === "wled" && !g.disabled_by && this.hass?.states[g.entity_id]
    ), n = s.filter((g) => $i(g.entity_id) === "light"), a = n.find((g) => g.entity_id === this._config.entity) || n.find((g) => Mr(g) === "main") || n[0], c = n.filter(
      (g) => Array.isArray(this.hass?.states[g.entity_id]?.attributes?.effect_list)
    ), d = s.filter(
      (g) => $i(g.entity_id) === "select"
    ), u = s.filter(
      (g) => $i(g.entity_id) === "number"
    ), b = (g, A) => A.test(`${g.entity_id} ${g.original_name || ""} ${g.name || ""}`), m = d.find((g) => b(g, /\bpreset\b/i)), l = d.filter(
      (g) => b(g, /color.?palette|colour.?palette/i)
    ), _ = u.filter((g) => b(g, /\bspeed\b/i)), p = u.filter((g) => b(g, /\bintensity\b/i)), f = this._registries?.devices?.find((g) => g.id === i), h = f?.name_by_user || f?.name || this.hass?.states[a?.entity_id || ""]?.attributes?.friendly_name || "WLED";
    return {
      deviceId: i || void 0,
      deviceName: h,
      main: a?.entity_id || this._config.entity,
      effectLights: c.map((g) => g.entity_id),
      preset: m?.entity_id || null,
      palettes: l.map((g) => g.entity_id),
      speeds: _.map((g) => g.entity_id),
      intensities: p.map((g) => g.entity_id)
    };
  }
  _pct(t) {
    const e = Number(t);
    return Number.isFinite(e) ? `${Math.round(e / 255 * 100)}%` : "—";
  }
  async _togglePower() {
    const t = this._bundle?.main, e = t ? this.hass?.states?.[t] : null;
    if (!t || !e || !this.hass) return;
    const i = e.state === "on";
    await this.hass.callService("light", "toggle", { entity_id: t }), await Pe(
      this.hass,
      t,
      (r) => r === (i ? "off" : "on"),
      { timeout: 9e3 }
    );
  }
  _getBrightnessCoalescer() {
    return this._brightnessCoalescer ? this._brightnessCoalescer : (this._brightnessCoalescer = Or(
      async (t) => {
        const e = this._bundle?.main;
        !e || !this.hass || (t <= 0 ? await this.hass.callService("light", "turn_off", { entity_id: e }) : await this.hass.callService("light", "turn_on", {
          entity_id: e,
          brightness: t
        }), await Pe(
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
      (r) => r != null && !_r.has(String(r).toLowerCase())
    );
    return i.length ? i.every((r) => String(r) === String(i[0])) ? String(i[0]) : "Mixed" : null;
  }
  async _call(t, e, i, r = {}) {
    const s = [...new Set((i || []).filter(Boolean))];
    !this.hass || !s.length || await Promise.all(
      s.map(
        (n) => this.hass.callService(t, e, { entity_id: n, ...r })
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
    ), s = this.renderRoot.querySelector(
      ".advanced"
    ), n = this.renderRoot.querySelector(
      ".native-colour"
    ), a = this.renderRoot.querySelector(
      ".close"
    );
    t && this._interactionHandles.push(
      x(t, {
        primary: () => this._togglePower(),
        feedback: !0
      })
    ), e && this._interactionHandles.push(
      x(e, {
        primary: () => this._openAdvanced(!1),
        hold: () => this.moreInfo(this._bundle?.main),
        feedback: !0
      })
    ), i && this._interactionHandles.push(
      x(i, {
        primary: () => this._openAdvanced(!0),
        feedback: !0
      })
    ), r && this._interactionHandles.push(
      x(r, {
        primary: () => this.moreInfo(
          this._bundle?.effectLights?.[0] || this._bundle?.main
        ),
        feedback: !0
      })
    ), s && this._interactionHandles.push(
      x(s, {
        primary: () => this._openAdvanced(!1),
        feedback: !0
      })
    ), n && this._interactionHandles.push(
      x(n, {
        primary: () => this.moreInfo(
          this._bundle?.effectLights?.[0] || this._bundle?.main
        ),
        feedback: !0
      })
    ), a && this._interactionHandles.push(
      x(a, {
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
    const e = this.hass.states[t.main], i = String(e?.state || "unavailable").toLowerCase(), r = i === "on", s = i === "on" || i === "off", n = r ? Number(e?.attributes?.brightness ?? 0) : 0, a = this._brightnessIntent ?? n, c = this._same(
      t.effectLights,
      (C) => C?.attributes?.effect
    ), d = this._same(t.palettes, (C) => C?.state), u = this._same(t.speeds, (C) => C?.state), b = this._same(t.intensities, (C) => C?.state), m = t.preset ? this.hass.states[t.preset] : null, l = m?.attributes?.options || [], _ = r ? [
      this._pct(a),
      c && c !== "Mixed" ? c : null,
      d && d !== "Mixed" ? d : null
    ].filter(Boolean).join(" · ") : i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : "Off", p = (C) => {
      const T = this.hass?.states?.[C];
      return !!(T && !_r.has(String(T.state).toLowerCase()));
    }, f = !!(t.preset && p(t.preset)), h = t.effectLights.some(p), g = t.palettes.some(p), A = t.speeds.some(p), O = t.intensities.some(p), D = t.effectLights.map((C) => this.hass?.states[C]).find(Boolean)?.attributes?.effect_list || [], N = t.palettes.map((C) => this.hass?.states[C]).find(Boolean)?.attributes?.options || [];
    return o`
      <ha-card>
        <div class="head ${r ? "on" : ""}">
          <span class="ico"
            ><ha-icon icon="mdi:led-strip-variant"></ha-icon
          ></span>
          <button class="identity" type="button">
            <span class="name">${this.esc(t.deviceName)}</span>
            <span class="status">${this.esc(_)}</span>
          </button>
          <button
            class="power"
            type="button"
            aria-label="Toggle WLED"
            ?disabled=${!s}
            aria-pressed="${String(r)}"
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
                      .value=${String(Math.max(0, Math.min(255, Number.isFinite(a) ? a : 0)))}
                      @input=${(C) => {
      const T = Number(C.target.value);
      this._brightnessIntent = T, this._getBrightnessCoalescer().request(T);
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
                      ?disabled=${!f}
                    >
                      <ha-icon icon="mdi:bookmark-multiple-outline"></ha-icon>
                      <span>Presets</span>
                    </button>
                    <button
                      class="action colour"
                      type="button"
                      ?disabled=${!h}
                    >
                      <ha-icon icon="mdi:palette-outline"></ha-icon>
                      <span>Colour</span>
                    </button>
                    <button
                      class="action advanced"
                      type="button"
                      ?disabled=${!(f || h || g || A || O)}
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
      const T = this.renderRoot.querySelector("dialog");
      C.target === T && T?.close();
    }}
      >
        <div class="sheet">
          <div class="sheet-head">
            <ha-icon icon="mdi:led-strip-variant"></ha-icon>
            <span class="sheet-title">
              <div class="sheet-name">${this.esc(t.deviceName)}</div>
              <div class="sheet-state">${this.esc(_)}</div>
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
                ${l.length ? l.map((C) => {
      const T = String(m?.state) === String(C);
      return o`
                          <button
                            class="preset-btn ${T ? "active" : ""}"
                            type="button"
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
                    ?disabled=${!h || !D.length}
                    @change=${(C) => {
      const T = C.target.value;
      T && this._call("light", "turn_on", t.effectLights, {
        effect: T
      });
    }}
                  >
                    ${!c || c === "Mixed" ? o`<option value="" selected>
                            ${c === "Mixed" ? "Mixed" : "Choose effect"}
                          </option>` : ""}
                    ${D.map(
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
                    ?disabled=${!g || !N.length}
                    @change=${(C) => {
      const T = C.target.value;
      T && this._call("select", "select_option", t.palettes, {
        option: T
      });
    }}
                  >
                    ${!d || d === "Mixed" ? o`<option value="" selected>
                            ${d === "Mixed" ? "Mixed" : "Choose palette"}
                          </option>` : ""}
                    ${N.map(
      (C) => o`<option
                          value="${this.esc(C)}"
                          ?selected=${d === C}
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
                      >${this.esc(u || "—")}</output
                    >
                  </span>
                  <input
                    class="speed"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    .value=${String(Number(u) || 0)}
                    ?disabled=${!A}
                    @change=${(C) => {
      const T = Number(C.target.value);
      this._call("number", "set_value", t.speeds, {
        value: T
      });
    }}
                  />
                </label>

                <label class="fine-card">
                  <span class="fine-head">
                    <span>Intensity</span>
                    <output class="intensity-value"
                      >${this.esc(b || "—")}</output
                    >
                  </span>
                  <input
                    class="intensity"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    .value=${String(Number(b) || 0)}
                    ?disabled=${!O}
                    @change=${(C) => {
      const T = Number(C.target.value);
      this._call("number", "set_value", t.intensities, {
        value: T
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
                ?disabled=${!h}
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
_t.styles = Na;
hi([
  v()
], _t.prototype, "_registries", 2);
hi([
  v()
], _t.prototype, "_bundle", 2);
hi([
  v()
], _t.prototype, "_brightnessIntent", 2);
_t = hi([
  $("component-wled-controller-v1")
], _t);
S({
  type: "component-wled-controller-v1",
  element: _t,
  name: "WLED Controller V1",
  description: "Minimal WLED control with advanced settings sheet."
});
const Ma = [
  H,
  w`
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
var Ia = Object.defineProperty, ja = Object.getOwnPropertyDescriptor, Br = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ja(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Ia(e, i, s), s;
};
let Nt = class extends k {
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
      const i = await ue(
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
    ) : e, r = i.filter((a) => a.online).length, s = this._model?.error ? "Unavailable" : `${r}/${i.length} online`, n = this._model?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : this._model?.error ? this._model.error.message || "Camera discovery is unavailable" : "No cameras available";
    return o`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <h2>${this.esc(this._config.title || "Camera wall")}</h2>
            <span class="meta">${this.esc(s)}</span>
          </div>

          ${i.length === 0 ? o`<div class="empty">${this.esc(n)}</div>` : o`
                  <div class="grid">
                    ${i.map((a) => {
      const d = this.hass?.states[a.entityId]?.attributes?.entity_picture, u = d ? this.hass?.hassUrl ? this.hass.hassUrl(d) : d : "", b = u ? `${u}${u.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "";
      return o`
                        <article
                          class="tile ${a.online ? "" : "offline"} ${a.active ? "activity" : ""}"
                        >
                          <button
                            class="media"
                            type="button"
                            ?disabled=${!a.online}
                            aria-label="Open full live view for ${this.esc(a.name)}"
                            @click=${(m) => this._requestViewer(a, m.currentTarget)}
                          >
                            ${b ? o`
                                  <img
                                    class="snapshot ready"
                                    src="${b}"
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
                              @click=${(m) => this._requestViewer(a, m.currentTarget)}
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
                              @click=${(m) => this._requestControls(a, m.currentTarget)}
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
Nt.stubConfig = { profile: "household-security", columns: 2 };
Nt.styles = Ma;
Br([
  v()
], Nt.prototype, "_model", 2);
Nt = Br([
  $("component-security-camera-wall-v3")
], Nt);
S({
  type: "component-security-camera-wall-v3",
  element: Nt,
  name: "Security Camera Wall V3",
  description: "Snapshot-first, lazy live camera wall with capability-driven controls."
});
const Ua = [
  H,
  w`
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
var Fa = Object.defineProperty, Ba = Object.getOwnPropertyDescriptor, ge = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ba(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Fa(e, i, s), s;
};
let tt = class extends k {
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
      const i = await ue(
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
      (l) => e.includes(l.entityId) || l.deviceId && e.includes(l.deviceId) || e.includes(l.id)
    ) : i, s = this._config.entries, n = t.entries || [], a = s && s.length > 0 ? n.filter(
      (l) => s.includes(l.entityId) || l.deviceId && s.includes(l.deviceId)
    ) : n, c = t.quickActions || [], d = (t.attention || []).length, u = !!(t.error || t.profileError || t.profileMissing), b = r.reduce(
      (l, _) => l + (_.detections || []).filter(
        (p) => this.hass?.states?.[p.entity_id]?.state === "on"
      ).length,
      0
    ), m = a.filter((l) => l.available && l.open).length;
    return o`
      <div class="page">
        <section class="panel hero">
          <div class="hero-main">
            <span
              class="hero-icon ${d > 0 || u ? "attention" : ""}"
            >
              <ha-icon
                icon="${u || d > 0 ? "mdi:shield-alert-outline" : "mdi:shield-check-outline"}"
              ></ha-icon>
            </span>
            <div>
              <h1 class="page-title">
                ${this.esc(this._config.title || "Security")}
              </h1>
              <div class="status-copy">
                ${this.esc(
      t.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : t.error || t.profileError ? "Security status is temporarily unavailable" : d > 0 ? `${d} ${d === 1 ? "item needs" : "items need"} attention` : "All clear"
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
            <span class="metric ${b > 0 ? "attention" : ""}">
              <ha-icon icon="mdi:motion-sensor"></ha-icon>
              <span>${b} active</span>
            </span>
            <span class="metric ${m > 0 ? "attention" : ""}">
              <ha-icon icon="mdi:door"></ha-icon>
              <span>${m} open</span>
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
      (l) => o`
                        <button
                          class="quick-action"
                          type="button"
                          ?disabled=${!l.available}
                          aria-label="${this.esc(l.name)}, ${l.available ? "Run" : "Unavailable"}"
                          @click=${() => this._runQuickAction(l)}
                        >
                          <span class="quick-icon"
                            ><ha-icon icon="${this.esc(l.icon)}"></ha-icon
                          ></span>
                          <span>
                            <span class="quick-name"
                              >${this.esc(l.name)}</span
                            >
                            <span class="quick-state"
                              >${l.available ? "Run" : "Unavailable"}</span
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
              >${r.filter((l) => l.online).length}/${r.length}
              online</span
            >
          </div>
          ${r.length === 0 ? o`<div class="empty">
                  No security cameras are configured
                </div>` : o`
                  <div class="camera-grid">
                    ${r.map((l) => {
      const p = this.hass?.states[l.entityId]?.attributes?.entity_picture, f = p ? this.hass?.hassUrl ? this.hass.hassUrl(p) : p : "", h = f ? `${f}${f.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "", g = l.classifications || [];
      return o`
                        <article class="camera">
                          <button
                            class="camera-media ${l.online ? "" : "offline"}"
                            type="button"
                            ?disabled=${!l.online}
                            aria-label="Open live view for ${this.esc(l.name)}"
                            @click=${() => this._openViewer(l)}
                          >
                            ${h ? o`<img
                                  src="${h}"
                                  alt="${this.esc(l.name)} snapshot"
                                />` : ""}
                            <span
                              class="camera-badge ${l.active ? "activity" : ""}"
                            >
                              <ha-icon
                                icon="${l.active ? "mdi:motion-sensor" : "mdi:cctv"}"
                              ></ha-icon>
                              <span
                                >${l.active ? "Activity" : l.online ? "Live" : "Offline"}</span
                              >
                            </span>
                          </button>
                          <div class="camera-copy">
                            <div class="camera-title-row">
                              <span class="camera-name"
                                >${this.esc(l.name)}</span
                              >
                            </div>
                            <div class="camera-state">
                              ${l.active ? "Activity detected" : l.online ? "Online" : "Unavailable"}
                            </div>
                            <div class="classification-summary">
                              ${g.length ? `Recent: ${g.map((A) => A.name).join(" · ")}` : "No detection image entities"}
                            </div>
                          </div>
                          <div class="camera-actions">
                            <button
                              class="camera-action primary"
                              type="button"
                              ?disabled=${!l.online}
                              aria-label="Live view for ${this.esc(l.name)}"
                              @click=${() => this._openViewer(l)}
                            >
                              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                              <span>Live</span>
                            </button>
                            <button
                              class="camera-action"
                              type="button"
                              ?disabled=${!(g.length || l.detections?.length)}
                              aria-label="Detections for ${this.esc(l.name)}"
                              @click=${() => this._openSettings(l)}
                            >
                              <ha-icon icon="mdi:motion-sensor"></ha-icon>
                              <span>Detections</span>
                            </button>
                            <button
                              class="camera-action"
                              type="button"
                              aria-label="Settings for ${this.esc(l.name)}"
                              @click=${() => this._openSettings(l)}
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
                    <span class="section-meta">${m} open</span>
                  </div>
                  <div class="entries">
                    ${a.map((l) => {
      const _ = this._entryConfirmId === l.entityId, p = !!(l.controlEntityId || l.domain === "lock" || l.domain === "cover"), f = l.domain === "lock" ? l.open ? "Lock" : "Unlock" : l.open ? "Close" : "Open";
      return o`
                        <article class="entry">
                          <span
                            class="entry-icon ${l.open ? "attention" : ""}"
                          >
                            <ha-icon
                              icon="${l.domain === "lock" ? l.open ? "mdi:lock-open-outline" : "mdi:lock-outline" : l.open ? "mdi:door-open" : "mdi:door-closed"}"
                            ></ha-icon>
                          </span>
                          <span>
                            <span class="entry-name"
                              >${this.esc(l.name)}</span
                            >
                            <span class="entry-state">
                              ${l.available ? l.domain === "lock" ? l.open ? "Unlocked" : "Locked" : l.open ? "Open" : "Closed" : "Unavailable"}
                            </span>
                          </span>
                          <span class="entry-actions">
                            <button
                              class="entry-detail"
                              type="button"
                              aria-label="Open details for ${this.esc(l.name)}"
                              @click=${() => this.moreInfo(l.entityId)}
                            >
                              <ha-icon icon="mdi:information-outline"></ha-icon>
                            </button>
                            ${p ? o`
                                    <button
                                      class="entry-operate ${_ ? "confirm" : ""}"
                                      type="button"
                                      ?disabled=${!l.available}
                                      aria-label="${_ ? "Confirm " + f : f} for ${this.esc(l.name)}"
                                      @click=${() => this._operateEntry(l)}
                                    >
                                      ${_ ? "Confirm" : f}
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
        @click=${(l) => {
      const _ = this.renderRoot.querySelector(".viewer-dialog");
      l.target === _ && this._closeViewer();
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
      const l = this._viewerCamera;
      this._closeViewer(), l && this._openSettings(l);
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
        @click=${(l) => {
      const _ = this.renderRoot.querySelector(".settings-dialog");
      l.target === _ && this._closeSettings();
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
      const l = this._settingsCamera;
      this._closeSettings(), l && this._openViewer(l);
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
                          ${this._settingsCamera.classifications.map((l) => {
      const p = this.hass?.states[l.entity.entity_id]?.attributes?.entity_picture;
      return o`
                              <button
                                class="detection"
                                type="button"
                                @click=${() => {
        this._closeSettings(), this.moreInfo(l.entity.entity_id);
      }}
                              >
                                ${p ? o`<img src="${p}" alt="${this.esc(l.name)}" />` : ""}
                                <span class="detection-copy">
                                  <span class="detection-name"
                                    >${this.esc(l.name)}</span
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
                          ${this._settingsCamera.switches.map((l) => {
      const p = this.hass?.states[l.entity.entity_id]?.state === "on";
      return o`
                              <div class="control-row">
                                <span>
                                  <span class="control-name"
                                    >${this.esc(l.role || "Control")}</span
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
          { entity_id: l.entity.entity_id }
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
      const l = this._settingsCamera;
      this._closeSettings(), l && this._openViewer(l);
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
tt.stubConfig = {
  profile: "household-security",
  camera_columns: 2
};
tt.styles = Ua;
ge([
  v()
], tt.prototype, "_model", 2);
ge([
  v()
], tt.prototype, "_viewerCamera", 2);
ge([
  v()
], tt.prototype, "_settingsCamera", 2);
ge([
  v()
], tt.prototype, "_entryConfirmId", 2);
tt = ge([
  $("component-security-dashboard-v1")
], tt);
S({
  type: "component-security-dashboard-v1",
  element: tt,
  name: "Security Dashboard V1",
  description: "Single-owner Security dashboard with on-demand live video, detections, controls, quick actions and entry points."
});
const Va = [
  H,
  w`
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
var Wa = Object.defineProperty, Ga = Object.getOwnPropertyDescriptor, Vr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ga(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Wa(e, i, s), s;
};
let Lt = class extends k {
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
      const i = await ue(
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
        x(e, {
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
Lt.stubConfig = { profile: "household-security" };
Lt.styles = Va;
Vr([
  v()
], Lt.prototype, "_model", 2);
Lt = Vr([
  $("component-security-entry-points-v1")
], Lt);
S({
  type: "component-security-entry-points-v1",
  element: Lt,
  name: "Security Entry Points V1",
  description: "Capability-driven garage, door, window and lock status using the shared garage controller where available."
});
const Ka = [
  H,
  w`
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
var Qa = Object.defineProperty, Ya = Object.getOwnPropertyDescriptor, Wr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ya(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Qa(e, i, s), s;
};
let qt = class extends k {
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
      const i = await ue(
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
        x(e, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    });
  }
  render() {
    if (!this._config) return o``;
    const t = this._model, e = t?.error || t?.profileError, i = !e && !!t?.allClear, r = this._config.title || "Security", s = t?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : e ? e.message || "Security status is unavailable" : i ? "All clear" : `${t?.attention?.length || 0} item${(t?.attention?.length || 0) === 1 ? "" : "s"} need attention`, n = e ? "Unavailable" : `${t?.onlineCameras || 0}/${t?.cameras?.length || 0} cameras online`, a = (t?.attention || []).slice(0, 4);
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
                >${this.esc(s)}</span
              >
            </span>
            <span class="count">${this.esc(n)}</span>
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
qt.stubConfig = { profile: "household-security" };
qt.styles = Ka;
Wr([
  v()
], qt.prototype, "_model", 2);
qt = Wr([
  $("component-security-summary-v1")
], qt);
S({
  type: "component-security-summary-v1",
  element: qt,
  name: "Security Summary V1",
  description: "Exception-first all-clear and attention summary discovered from Home Assistant capabilities."
});
const Xa = w`
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
`, Za = [
  H,
  w`
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
var Ja = Object.defineProperty, to = Object.getOwnPropertyDescriptor, Gr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? to(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Ja(e, i, s), s;
};
let Mt = class extends k {
  constructor() {
    super(...arguments), this._selected = q.today(), this._unsubscribe = null, this._interactionHandles = [];
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
    this._selected = q.get(i, this.hass), this.isConnected && e !== i && (this._unsubscribe?.(), this._unsubscribe = q.subscribe(
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
    return this._selected === q.today(this.hass);
  }
  _setDay(t) {
    this._selected = q.set(
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
    super.connectedCallback(), this._unsubscribe || (this._unsubscribe = q.subscribe(
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
    for (const s of this._interactionHandles) s.destroy();
    this._interactionHandles = [];
    const t = { delay: 350, interval: 110, accelerate: !0 }, e = this.renderRoot.querySelector(
      ".previous"
    ), i = this.renderRoot.querySelector(
      ".next"
    ), r = this.renderRoot.querySelector(
      ".today"
    );
    e && this._interactionHandles.push(
      x(e, {
        primary: () => this._shift(-1),
        repeat: t,
        feedback: !0
      })
    ), i && this._interactionHandles.push(
      x(i, {
        primary: () => this._shift(1),
        repeat: t,
        feedback: !0
      })
    ), r && this._interactionHandles.push(
      x(r, {
        primary: () => this._setDay(q.today(this.hass)),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._isToday(), e = q.today(this.hass), i = ei(this.hass, this._selected, {
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
Mt.stubConfig = { channel: "energy-day" };
Mt.styles = Za;
Gr([
  v()
], Mt.prototype, "_selected", 2);
Mt = Gr([
  $("component-energy-day-selector-v1")
], Mt);
S({
  type: "component-energy-day-selector-v1",
  element: Mt,
  name: "Energy Day Selector",
  description: "Stable selected-day control shared by every Energy card."
});
const eo = [
  H,
  w`
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
var io = Object.defineProperty, ro = Object.getOwnPropertyDescriptor, be = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ro(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && io(e, i, s), s;
};
let et = class extends k {
  constructor() {
    super(...arguments), this._data = null, this._error = null, this._loading = !1, this._day = q.today(), this._sequence = 0, this._dayUnsub = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === (this._config?.profile || "household-energy") && (this.hass && He.invalidateProfile(
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
    this._day = q.get(i, this.hass), this.isConnected && e !== i && (this._dayUnsub?.(), this._dayUnsub = q.subscribe(
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
    ), this._dayUnsub || (this._dayUnsub = q.subscribe(
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
      const i = await He.get(
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
        x(r, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house", "sensor.ha_component_house_power"), t(".solar", "sensor.ha_component_solar_power"), t(".grid", "sensor.ha_component_grid_power");
  }
  render() {
    if (!this._config) return o``;
    const t = this._data, e = this._day === q.today(this.hass), i = e ? "Today" : ei(this.hass, this._day, {
      weekday: "short",
      day: "numeric",
      month: "short"
    }), r = t?.grid_w == null ? Number.NaN : Number(t.grid_w), s = Number.isFinite(r) ? r > 15 ? "Importing now" : r < -15 ? "Exporting now" : "Grid balanced" : "Grid unavailable", n = Number(t?.coverage), a = this._error ? /unknown energy profile/i.test(this._error.message || "") ? `Configure ${this._config.profile || "household-energy"} in HA Component Backend` : this._error.message || "Energy data is unavailable" : this._loading ? this._data ? "Updating…" : "Loading Energy data…" : t?.stale ? "Showing the last successful update" : Number.isFinite(n) && n < 1 ? `${Math.round(n * 100)}% of source data available` : "";
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
              aria-label="House power now: ${Y(this.hass, t?.house_w)}"
            >
              <span class="value"
                >${Y(this.hass, t?.house_w)}</span
              >
              <span class="label">House now</span>
            </button>
            <button
              class="metric solar"
              type="button"
              aria-label="Solar power now: ${Y(this.hass, t?.solar_w)}"
            >
              <span class="value"
                >${Y(this.hass, t?.solar_w)}</span
              >
              <span class="label">Solar now</span>
            </button>
            <button
              class="metric grid"
              type="button"
              aria-label="Grid power now: ${Y(this.hass, t?.grid_w, { absolute: !0 })}, ${s}"
            >
              <span class="value"
                >${Y(this.hass, t?.grid_w, { absolute: !0 })}</span
              >
              <span class="label">${this.esc(s)}</span>
            </button>
          </div>

          <div class="daily">
            <button class="metric consumed" type="button" disabled>
              <span class="value"
                >${nt(this.hass, t?.consumed_kwh)}</span
              >
              <span class="label">Consumed</span>
            </button>
            <button class="metric generated" type="button" disabled>
              <span class="value"
                >${nt(this.hass, t?.generated_kwh)}</span
              >
              <span class="label">Generated</span>
            </button>
            <button class="metric imported" type="button" disabled>
              <span class="value"
                >${nt(this.hass, t?.imported_kwh)}</span
              >
              <span class="label">Imported</span>
            </button>
            <button class="metric exported" type="button" disabled>
              <span class="value"
                >${nt(this.hass, t?.exported_kwh)}</span
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
et.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
et.styles = eo;
be([
  v()
], et.prototype, "_data", 2);
be([
  v()
], et.prototype, "_error", 2);
be([
  v()
], et.prototype, "_loading", 2);
be([
  v()
], et.prototype, "_day", 2);
et = be([
  $("component-energy-summary-v1")
], et);
S({
  type: "component-energy-summary-v1",
  element: et,
  name: "Energy Summary V1",
  description: "Stable backend-driven live power and selected-day Energy totals."
});
const so = [
  H,
  w`
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
var no = Object.defineProperty, ao = Object.getOwnPropertyDescriptor, Kr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ao(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && no(e, i, s), s;
};
const oo = {
  type: "custom:solar-daylight-card-v7",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let re = class extends k {
  constructor() {
    super(...arguments), this._forecast = [], this._lastFetch = 0, this._pending = !1, this._failures = 0, this._retryAt = 0, this._interactionHandle = null;
  }
  setConfig(t) {
    const e = this._config?.weather_entity;
    super.setConfig({ ...oo, ...t }), this._config?.weather_entity !== e && (this._forecast = [], this._lastFetch = 0), this._fetchForecast();
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
    return Number.isNaN(e.getTime()) ? "" : Te(this.hass, e);
  }
  _cloud(t) {
    const e = this._num(t);
    return e === null ? "—" : `${Math.round(Math.min(100, Math.max(0, e)))}%`;
  }
  _at(t) {
    if (!this._forecast.length) return null;
    const e = Date.now() + t * 36e5;
    let i = null, r = 1 / 0;
    for (const s of this._forecast) {
      const n = new Date(s.datetime || 0).getTime(), a = this._num(s.cloud_coverage);
      if (!Number.isFinite(n) || a === null) continue;
      const c = Math.abs(n - e);
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
    t && (this._interactionHandle?.destroy(), this._interactionHandle = x(t, {
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
    const t = this._config.sun_entity || "sun.sun", e = this._config.weather_entity || "weather.forecast_home", i = this.hass?.states[t], r = this.hass?.states[e], s = !!(i && ["above_horizon", "below_horizon"].includes(i.state));
    let n = "Sun state unavailable", a = "";
    if (s)
      if (i?.state === "above_horizon") {
        const p = this._num(i.attributes?.elevation, 0), f = this._time(i.attributes?.next_setting);
        n = `Sun ${Math.round(p || 0)}°`, a = f ? `Sunset ${f}` : "Daylight";
      } else {
        const p = this._time(i?.attributes?.next_rising);
        n = "Night", a = p ? `Sunrise ${p}` : "Before sunrise";
      }
    const c = this._num(r?.attributes?.cloud_coverage), d = this._at(4), u = this._at(8), b = this._cloud(c), m = this._cloud(d), l = this._cloud(u), _ = `${n}, cloud coverage ${b}, plus 4 hours ${m}, plus 8 hours ${l}, ${a}. Tap for sun details; hold for weather details.`;
    return o`
      <ha-card>
        <button type="button" aria-label="${this.esc(_)}">
          <span class="phase">${this.esc(n)}</span>
          <span class="clouds">
            <span class="cloud-item">
              <span class="cloud-label">Cloud Coverage</span>
              <span class="cloud-value now">${this.esc(b)}</span>
            </span>
            <span class="cloud-item">
              <span class="cloud-label">+4 Hours</span>
              <span class="cloud-value plus4">${this.esc(m)}</span>
            </span>
            <span class="cloud-item">
              <span class="cloud-label">+8 Hours</span>
              <span class="cloud-value plus8">${this.esc(l)}</span>
            </span>
          </span>
          <span class="event">${this.esc(a)}</span>
        </button>
      </ha-card>
    `;
  }
};
re.styles = so;
Kr([
  v()
], re.prototype, "_forecast", 2);
re = Kr([
  $("solar-daylight-card-v7")
], re);
S({
  type: "solar-daylight-card-v7",
  element: re,
  name: "Solar Daylight Context",
  description: "Full-width sun context with centred current and forecast cloud coverage."
});
const co = [
  H,
  w`
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
var lo = Object.defineProperty, po = Object.getOwnPropertyDescriptor, ui = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? po(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && lo(e, i, s), s;
};
const ho = {
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
let vt = class extends k {
  constructor() {
    super(...arguments), this._series = {}, this._loading = !1, this._selectedDay = null, this._start = 0, this._end = 0, this._lastRangeKey = null, this._forceRefresh = !1, this._fetchSequence = 0, this._dayUnsubscribe = null, this._pinned = !1, this._pointerState = null, this._resizeObserver = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === this._config?.profile && (this.hass && this._config?.profile && He.invalidateProfile(this.hass, this._config.profile), this._forceRefresh = !0, this._lastRangeKey = null, this._fetchData());
    }, this._outsideListener = (t) => {
      this._pinned && !t.composedPath?.().includes(this) && (this._pinned = !1);
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = { ...ho, ...t || {} };
    e.profile && (e.calendar_day = !0), super.setConfig(e), this._config?.day_channel && this.hass && (this._selectedDay = q.get(
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
    this._dayUnsubscribe?.(), this._dayUnsubscribe = null, !(!this._config?.calendar_day || !this._config?.day_channel) && (this._dayUnsubscribe = q.subscribe(
      this._config.day_channel,
      (t) => {
        t.day !== this._selectedDay && (this._selectedDay = t.day, this._lastRangeKey = null, this._fetchData());
      },
      { hass: this.hass }
    ));
  }
  _range() {
    if (this._config?.calendar_day) {
      const r = q.today(this.hass), s = this._selectedDay && this._selectedDay <= r ? this._selectedDay : r, n = Cr(this.hass, s), a = n?.start ?? Date.now() - 864e5, c = n?.end ?? Date.now();
      return { start: a, end: c, day: s, isToday: s === r };
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
        const s = await He.get(
          this.hass,
          this._config.profile,
          t.day,
          { force: r }
        );
        if (i !== this._fetchSequence) return;
        const n = Array.isArray(s?.series) ? s.series : [];
        this._series = {
          house: n.map((a) => ({
            t: new Date(a.start).getTime(),
            v: Number(a.house) || 0
          })),
          solar: n.map((a) => ({
            t: new Date(a.start).getTime(),
            v: Number(a.solar) || 0
          })),
          grid: n.map((a) => ({
            t: new Date(a.start).getTime(),
            v: Number(a.grid) || 0
          }))
        }, this._start = Number(s?.range?.start) || t.start, this._end = Number(s?.range?.end) || t.end;
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
    const s = [];
    let n = "", a = null, c = [];
    const d = () => {
      if (!c.length) return;
      const u = c.map(
        (b, m) => `${m ? "L" : "M"}${e(b.t).toFixed(1)},${i(b.v).toFixed(1)}`
      ).join(" ");
      if (s.push(u), r !== null) {
        const b = c[0], m = c[c.length - 1];
        n += `${u} L${e(m.t).toFixed(1)},${r.toFixed(1)} L${e(b.t).toFixed(1)},${r.toFixed(1)} Z `;
      }
      c = [];
    };
    for (const u of t || [])
      a !== null && u.t - a > 15 * 6e4 && d(), c.push(u), a = u.t;
    return d(), { line: s.join(" "), fill: n.trim() };
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const r = this.renderRoot.querySelector(e);
      r && i && this._interactionHandles.push(
        x(r, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house-key", this._config?.house_entity), t(".solar-key", this._config?.solar_entity), t(".grid-key", this._config?.grid_entity);
  }
  render() {
    if (!this._config) return o``;
    const t = (this._series.house?.length || 0) > 0 || (this._series.solar?.length || 0) > 0 || (this._series.grid?.length || 0) > 0, e = this._config.calendar_day ? this._selectedDay === q.today(this.hass) ? "Today" : ei(this.hass, this._selectedDay || "", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }) : null, i = e ? `${e} · ${this._config.bucket_minutes || 10}-minute average` : `${this._config.bucket_minutes || 10}-minute average`, r = 800, s = 420, n = 58, a = 8, c = 6, d = Math.round(s * 0.7), u = d + 20, b = u + 18, m = s - 18, l = n, _ = r - a, p = this._start || Date.now() - 864e5, f = this._end || Date.now(), h = (P) => l + (P - p) / (f - p) * (_ - l), g = [
      ...this._series.house || [],
      ...this._series.solar || []
    ].map((P) => Math.max(0, P.v)), A = this._niceMax(Math.max(1, ...g) * 1.06), O = (P) => d - Math.max(0, P) / A * (d - c), E = Math.max(
      100,
      ...(this._series.grid || []).map((P) => Math.abs(P.v))
    ), D = this._niceMax(E * 1.08), R = (b + m) / 2, N = (P) => R - P / D * ((m - b) / 2), C = this._paths(this._series.house, h, O), T = this._paths(this._series.solar, h, O, d), U = this._paths(this._series.grid, h, N);
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
              viewBox="0 0 ${r} ${s}"
              role="img"
              aria-label="Household power history"
              @pointerdown=${(P) => {
      this._pointerState = {
        id: P.pointerId,
        x: P.clientX,
        y: P.clientY,
        moved: !1
      };
    }}
              @pointermove=${(P) => {
      this._pointerState && Math.hypot(
        P.clientX - this._pointerState.x,
        P.clientY - this._pointerState.y
      ) > 6 && (this._pointerState.moved = !0);
    }}
              @pointerup=${() => {
      this._pointerState = null;
    }}
            >
              ${[0, 1, 2, 3, 4].map((P) => {
      const I = A * (1 - P / 4), j = c + (d - c) * (P / 4);
      return o`
                  <line
                    class="gridline"
                    x1="${l}"
                    y1="${j}"
                    x2="${_}"
                    y2="${j}"
                  ></line>
                  <text
                    class="axis"
                    x="${l - 8}"
                    y="${j + 4}"
                    text-anchor="end"
                  >
                    ${Y(this.hass, I)}
                  </text>
                `;
    })}
              ${[0, 1, 2, 3, 4, 5, 6].map((P) => {
      const I = p + (f - p) * P / 6, j = h(I), wt = new Date(I).getMinutes() === 0 ? Te(this.hass, I, { minute: void 0 }) : Te(this.hass, I);
      return o`
                  <text
                    class="axis"
                    x="${j}"
                    y="${u}"
                    text-anchor="${P === 0 ? "start" : P === 6 ? "end" : "middle"}"
                  >
                    ${wt}
                  </text>
                `;
    })}

              <line
                class="zero"
                x1="${l}"
                y1="${R}"
                x2="${_}"
                y2="${R}"
              ></line>
              <text
                class="axis-small"
                x="${_ - 2}"
                y="${b + 10}"
                text-anchor="end"
              >
                Import
              </text>
              <text
                class="axis-small"
                x="${_ - 2}"
                y="${m - 3}"
                text-anchor="end"
              >
                Export
              </text>

              ${T.fill ? o`<path class="solar-fill" d="${T.fill}"></path>` : ""}
              ${T.line ? o`<path class="solar-line" d="${T.line}"></path>` : ""}
              ${C.line ? o`<path class="house-line" d="${C.line}"></path>` : ""}
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
vt.styles = co;
ui([
  v()
], vt.prototype, "_series", 2);
ui([
  v()
], vt.prototype, "_loading", 2);
ui([
  v()
], vt.prototype, "_selectedDay", 2);
vt = ui([
  $("energy-history-card-v3")
], vt);
S({
  type: "energy-history-card-v3",
  element: vt,
  name: "Energy History",
  description: "Dense readable power history supporting rolling or local calendar-day ranges using completed 10-minute averages and a signed grid strip."
});
var uo = Object.getOwnPropertyDescriptor, mo = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? uo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const fo = {
  type: "custom:component-energy-dashboard-v1",
  profile: "household-energy",
  day_channel: "energy-day",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let se = class extends k {
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...fo, ...t });
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
se.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
se.styles = Xa;
se = mo([
  $("component-energy-dashboard-v1")
], se);
S({
  type: "component-energy-dashboard-v1",
  element: se,
  name: "Energy Dashboard V1",
  description: "Single-card Energy composition using shared day state and one backend data contract."
});
const go = [
  H,
  w`
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
var bo = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, Vi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? _o(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && bo(e, i, s), s;
};
const vo = {
  type: "custom:component-history-graph-v2",
  meta_text: "Aggregation label",
  series_1_label: "Primary series",
  series_2_label: "Secondary series",
  series_3_label: "Supporting series",
  positive_label: "Positive",
  negative_label: "Negative"
};
let It = class extends k {
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
    super.setConfig({ ...vo, ...t });
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
    const i = e.getBoundingClientRect(), r = Math.max(320, Math.round(i.width || 800)), s = r < 520 ? 48 : 58, n = 8, a = s, c = r - n, d = (t.clientX - i.left) * (r / i.width), u = Math.max(a, Math.min(c, d)), b = (u - a) / (c - a), m = Math.round(b * 100), l = [
      [
        1,
        this._config?.series_1_label || "Primary series",
        Math.round(20 + b * 80)
      ],
      [
        2,
        this._config?.series_2_label || "Secondary series",
        Math.round(75 - b * 45)
      ],
      [
        3,
        this._config?.series_3_label || "Supporting series",
        Math.round((b - 0.5) * 40)
      ]
    ].filter(([p]) => !this._hiddenSeries.has(Number(p))), _ = `<div style="font-weight:650;margin-bottom:4px">${m}% through range</div>${l.map(
      ([, p, f]) => `<div class="tr"><span>${p}</span><b>${f}</b></div>`
    ).join("")}`;
    this._tooltip = {
      show: !0,
      text: _,
      x: u / r * i.width,
      y: Math.max(70, i.height * 0.42)
    };
  }
  render() {
    if (!this._config) return o``;
    const t = 800, e = 420, i = 58, r = 8, s = 6, n = Math.round(e * 0.7), a = n + 20, c = a + 18, d = e - 18, u = i, b = t - r, m = b - u, l = n - s, _ = (c + d) / 2, p = (E, D) => `${(u + m * E).toFixed(1)},${(s + l * D).toFixed(1)}`, f = (E, D) => `${(u + m * E).toFixed(1)},${(_ + (d - c) * 0.32 * D).toFixed(1)}`, h = `M${p(0, 0.68)} L${p(0.08, 0.61)} L${p(0.17, 0.7)} L${p(0.26, 0.38)} L${p(0.35, 0.52)} L${p(0.44, 0.24)} L${p(0.53, 0.43)} L${p(0.62, 0.35)} L${p(0.72, 0.63)} L${p(0.82, 0.48)} L${p(0.91, 0.59)} L${p(1, 0.44)}`, g = `M${p(0, 0.86)} L${p(0.12, 0.75)} L${p(0.24, 0.52)} L${p(0.36, 0.42)} L${p(0.48, 0.55)} L${p(0.6, 0.72)} L${p(0.72, 0.82)} L${p(0.84, 0.91)} L${p(1, 0.94)}`, A = `M${f(0, 0.08)} L${f(0.1, -0.1)} L${f(0.2, 0.12)} L${f(0.3, -0.2)} L${f(0.4, 0.02)} L${f(0.5, -0.35)} L${f(0.6, 0.16)} L${f(0.7, 0.28)} L${f(0.8, -0.12)} L${f(0.9, 0.05)} L${f(1, -0.08)}`, O = `${g} L${b},${n} L${u},${n} Z`;
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
              @pointerdown=${(E) => {
      this._pointerState = {
        id: E.pointerId,
        x: E.clientX,
        y: E.clientY,
        moved: !1
      }, this._handlePointer(E);
    }}
              @pointermove=${(E) => {
      if (this._pointerState?.id === E.pointerId) {
        Math.hypot(
          E.clientX - this._pointerState.x,
          E.clientY - this._pointerState.y
        ) > 6 && (this._pointerState.moved = !0), this._handlePointer(E);
        return;
      }
      !this._pinned && E.pointerType !== "touch" && this._handlePointer(E);
    }}
              @pointerup=${(E) => {
      const D = this._pointerState;
      !D || D.id !== E.pointerId || (this._pointerState = null, D.moved ? (this._pinned = !1, E.pointerType === "touch" && this._hideTip()) : this._pinned ? (this._pinned = !1, this._hideTip()) : (this._handlePointer(E), this._pinned = !0));
    }}
              @pointerleave=${() => {
      !this._pinned && !this._pointerState && this._hideTip();
    }}
            >
              ${["Max", "75%", "50%", "25%", "0"].map((E, D) => {
      const R = s + l * D / 4;
      return o`
                  <line
                    class="grid"
                    x1="${u}"
                    y1="${R}"
                    x2="${b}"
                    y2="${R}"
                  ></line>
                  <text
                    class="axis"
                    x="${u - 8}"
                    y="${R + 4}"
                    text-anchor="end"
                    >${E}</text
                  >
                `;
    })}
              ${["Start", "¼", "½", "¾", "End"].map((E, D) => {
      const R = u + m * D / 4;
      return o`
                  <text
                    class="axis"
                    x="${R}"
                    y="${a}"
                    text-anchor="${D === 0 ? "start" : D === 4 ? "end" : "middle"}"
                  >
                    ${E}
                  </text>
                `;
    })}
              <line
                class="zero"
                x1="${u}"
                y1="${_}"
                x2="${b}"
                y2="${_}"
              ></line>
              <text
                class="small"
                x="${b - 2}"
                y="${c + 10}"
                text-anchor="end"
              >
                ${this.esc(this._config.positive_label || "Positive")}
              </text>
              <text class="small" x="${b - 2}" y="${d - 3}" text-anchor="end">
                ${this.esc(this._config.negative_label || "Negative")}
              </text>

              ${this._hiddenSeries.has(2) ? "" : o`
                      <path class="f2" d="${O}"></path>
                      <path class="l2" d="${g}"></path>
                    `}
              ${this._hiddenSeries.has(1) ? "" : o`<path class="l1" d="${h}"></path>`}
              ${this._hiddenSeries.has(3) ? "" : o`<path class="l3" d="${A}"></path>`}
              ${this._tooltip.show ? o`<line
                      class="cursor"
                      x1="${this._tooltip.x}"
                      y1="${s}"
                      x2="${this._tooltip.x}"
                      y2="${d}"
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
It.styles = go;
Vi([
  v()
], It.prototype, "_hiddenSeries", 2);
Vi([
  v()
], It.prototype, "_tooltip", 2);
It = Vi([
  $("component-history-graph-v2")
], It);
S({
  type: "component-history-graph-v2",
  element: It,
  name: "History Graph",
  description: "Reusable interactive history graph component."
});
const yo = [
  H,
  w`
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
var xo = Object.defineProperty, wo = Object.getOwnPropertyDescriptor, _e = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? wo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && xo(e, i, s), s;
};
const $o = {
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
let ct = class extends k {
  constructor() {
    super(...arguments), this._selectedDay = q.today(), this._stats = {}, this._loading = !1, this._error = "", this._lastKey = null, this._interactionHandles = [];
  }
  _onDayChange(t) {
    !t || t === this._selectedDay || (this._selectedDay = t, this._error = "", this._lastKey = null, this._scheduleStats());
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = this._config?.day_channel;
    if (super.setConfig({ ...$o, ...t }), this.isConnected && e !== this._config?.day_channel) {
      this._dayUnsubscribe?.();
      const i = this._config?.day_channel || "energy-day";
      this._selectedDay = q.get(i, this.hass), this._dayUnsubscribe = q.subscribe(
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
    this._selectedDay = q.get(t, this.hass), this._dayUnsubscribe = q.subscribe(
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
    return this._selectedDay === q.today(this.hass);
  }
  _range() {
    const t = Cr(this.hass, this._selectedDay);
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
      const s = {};
      for (const n of t.change) {
        const c = (r?.[n] || []).filter((d) => {
          const u = typeof d.start == "number" ? d.start : Date.parse(d.start);
          return Number.isFinite(u) && u >= i.start && u < i.end;
        }).map((d) => Number(d.change)).filter(Number.isFinite);
        s[n] = {
          change: c.length ? c.reduce((d, u) => d + u, 0) : null
        };
      }
      this._stats = s, this._lastKey = e;
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
      return nt(this.hass, this._number(t.entity, "change"));
    if (e === "energy_kwh_day_sum") {
      if (!Array.isArray(t.entities) || !t.entities.length) return "—";
      let r = 0;
      for (const s of t.entities) {
        const n = this._number(s, "change");
        if (n === null) return "—";
        r += n;
      }
      return nt(this.hass, r);
    }
    if (e === "energy_kwh_day_formula") {
      if (!Array.isArray(t.terms) || !t.terms.length) return "—";
      let r = 0;
      for (const s of t.terms) {
        const n = this._number(s?.entity, "change");
        if (n === null) return "—";
        r += n * (Number.isFinite(Number(s.factor)) ? Number(s.factor) : 1);
      }
      return nt(this.hass, r);
    }
    if (["watts", "watts_abs"].includes(e))
      return Y(this.hass, this._liveNumber(t.entity), {
        absolute: e === "watts_abs"
      });
    if (e === "grid_import_watts") {
      const r = this._liveNumber(t.entity), s = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "—" : `${Math.round(r >= s ? r : 0)} W`;
    }
    if (e === "grid_export_watts") {
      const r = this._liveNumber(t.entity), s = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "—" : `${Math.round(r <= -s ? Math.abs(r) : 0)} W`;
    }
    if (e === "grid_label") {
      const r = this._liveNumber(t.entity), s = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "Live grid" : r >= s ? "Live grid import" : r <= -s ? "Live grid export" : "Live grid flow";
    }
    if (e === "grid_direction") {
      const r = this._liveNumber(t.entity), s = Math.max(0, Number(t.deadband ?? this._config?.deadband) || 15);
      return r === null ? "Unavailable" : r >= s ? "Importing now" : r <= -s ? "Exporting now" : "Balanced now";
    }
    if (!t.entity) return "";
    const i = this.hass?.states?.[t.entity];
    return i ? String(i.state) : t.unavailable || "Unavailable";
  }
  updated() {
    for (const s of this._interactionHandles) s.destroy();
    this._interactionHandles = [];
    const t = this.renderRoot.querySelector(
      ".left"
    ), e = this.renderRoot.querySelector(
      ".right"
    ), i = this._clickEntity("left"), r = this._clickEntity("right");
    t && i && this._interactionHandles.push(
      x(t, {
        primary: () => this.moreInfo(i),
        feedback: !0
      })
    ), e && r && this._interactionHandles.push(
      x(e, {
        primary: () => this.moreInfo(r),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._resolve(this._config.left_value), e = this._resolve(this._config.left_label), i = this._resolve(this._config.right_value), r = this._resolve(this._config.right_label), s = this._resolve(this._config.right_primary), n = this._resolve(this._config.right_secondary), a = this._clickEntity("left"), c = this._clickEntity("right"), d = [e, t].filter(Boolean).join(": "), u = [i, r, s, n].filter(Boolean).join(" ");
    return o`
      <ha-card>
        <div class="wrap">
          <button
            class="left"
            type="button"
            ?disabled=${!a}
            aria-label="${this.esc(d || "Left metric")}"
          >
            <div class="left-value">${this.esc(t)}</div>
            <div class="left-label">${this.esc(e)}</div>
          </button>
          <button
            class="right"
            type="button"
            ?disabled=${!c}
            aria-label="${this.esc(u || "Right metric")}"
          >
            <div class="right-top">
              <span class="right-value">${this.esc(i)}</span>
              <span class="right-label">${this.esc(r)}</span>
            </div>
            <div class="right-bottom">
              <span class="right-primary">${this.esc(s)}</span>
              <span class="right-secondary">${this.esc(n)}</span>
            </div>
          </button>
        </div>
      </ha-card>
    `;
  }
};
ct.styles = yo;
_e([
  v()
], ct.prototype, "_selectedDay", 2);
_e([
  v()
], ct.prototype, "_stats", 2);
_e([
  v()
], ct.prototype, "_loading", 2);
_e([
  v()
], ct.prototype, "_error", 2);
ct = _e([
  $("metric-pair-card-v3")
], ct);
S({
  type: "metric-pair-card-v3",
  element: ct,
  name: "Metric Pair",
  description: "Live power metrics with selected-day energy totals."
});
const ko = [
  H,
  w`
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
      cursor: pointer;
    }
    ha-card {
      border: 0;
      box-shadow: none;
      background: transparent;
      overflow: visible;
      color: var(--primary-text-color);
    }
    .wrap {
      padding: 0;
    }
    .head {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }
    .heading {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .heading ha-icon {
      color: var(--primary-color);
      --mdc-icon-size: 19px;
    }
    .heading h2 {
      margin: 0;
      font-size: 18px;
      line-height: 1.2;
      font-weight: 650;
    }
    .edit {
      min-width: 44px;
      min-height: 44px;
      padding: 0 10px;
      border-radius: var(--dashboard-radius-control, 8px);
      background: transparent;
      color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 600;
    }
    .edit:hover,
    .edit:focus-visible {
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
    }
    .edit ha-icon {
      --mdc-icon-size: 18px;
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
      min-height: 52px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-card, 6px);
      background: var(--dashboard-card-surface, var(--card-background-color));
      overflow: hidden;
    }
    .main {
      min-width: 0;
      min-height: 52px;
      padding: 6px 8px;
      text-align: left;
      background: transparent;
      display: grid;
      grid-template-columns: 32px minmax(0, 1fr);
      align-items: center;
      gap: 8px;
    }
    .item.has-quick .main {
      padding-right: 4px;
    }
    .main:active,
    .quick:active {
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }
    .main:focus-visible,
    .quick:focus-visible,
    .edit:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .icon {
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      border-radius: var(--dashboard-radius-icon, 6px);
      background: transparent;
      color: var(--primary-color);
    }
    .icon ha-icon {
      --mdc-icon-size: 20px;
    }
    .copy {
      min-width: 0;
    }
    .name,
    .state {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .name {
      font-size: 13px;
      font-weight: 650;
    }
    .state {
      margin-top: 2px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .item.active {
      background: var(--dashboard-active-surface, var(--card-background-color));
      box-shadow: inset 2px 0 0 var(--primary-color);
    }
    .item.active .icon {
      background: transparent;
      color: var(--primary-color);
    }
    .item.active .state {
      color: var(--primary-color);
      font-weight: 600;
    }
    .item.unavailable {
      opacity: 0.55;
    }
    .quick {
      width: 44px;
      min-height: 52px;
      padding: 0;
      border-left: 1px solid
        var(--dashboard-card-border-color, var(--divider-color));
      background: transparent;
      color: var(--primary-color);
      display: grid;
      place-items: center;
    }
    .quick ha-icon {
      --mdc-icon-size: 21px;
    }
    .empty,
    .load-error {
      grid-column: 1 / -1;
      min-height: 44px;
      padding: 9px 11px;
      border: 1px dashed
        var(--dashboard-card-border-color, var(--divider-color));
      border-radius: var(--dashboard-radius-card, 6px);
      background: transparent;
      color: var(--secondary-text-color);
      font-size: 13px;
      line-height: 1.35;
    }
    @media (max-width: 420px) {
      .head {
        margin-bottom: 6px;
      }
      .edit span {
        display: none;
      }
      .edit {
        padding: 0;
      }
      .grid {
        gap: 8px;
      }
      .main {
        padding: 6px;
      }
    }
  `
];
var Co = Object.defineProperty, So = Object.getOwnPropertyDescriptor, mi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? So(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Co(e, i, s), s;
};
const ki = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
let yt = class extends k {
  constructor() {
    super(...arguments), this._selected = [], this._registry = null, this._interactionHandles = [], this._unsubRegistry = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = Array.isArray(t?.helpers) ? t.helpers.filter((s) => typeof s == "string") : [], i = Array.isArray(t?.items) ? t.items.slice(0, 4) : [], r = String(t?.preference_key || "").trim();
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
    !this.isConnected || this._unsubRegistry || !this.hass || (this._unsubRegistry = L.subscribe(this.hass, (t) => {
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
    if (!t || ki.has(String(t).toLowerCase())) return null;
    try {
      return this._normaliseRef(JSON.parse(t));
    } catch {
      return null;
    }
  }
  _buildRegistryIndex(t) {
    const e = t.entities || [], i = t.devices || [], r = t.areas || [], s = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    for (const a of e) {
      const c = this._entryKey(a);
      c && s.set(c, a), a.device_id && (n.has(a.device_id) || n.set(a.device_id, []), n.get(a.device_id).push(a));
    }
    this._registry = {
      entities: e,
      devices: new Map(i.map((a) => [a.id, a])),
      areas: new Map(r.map((a) => [a.area_id, a.name])),
      byKey: s,
      byDevice: n
    };
  }
  async _ensureRegistry(t = !1) {
    if (this.hass && !(this._registry && !t))
      try {
        const e = await L.load(this.hass, t);
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
    if (!t.state || ki.has(String(t.state.state).toLowerCase()))
      return !1;
    const e = this._domain(t.entry?.entity_id);
    return ["light", "switch", "fan", "input_boolean"].includes(e) ? t.state.state === "on" : e === "media_player" ? ["playing", "paused", "buffering", "on"].includes(t.state.state) : e === "climate" ? t.state.state !== "off" : e === "cover" ? t.state.state !== "closed" : e === "lock" ? t.state.state === "unlocked" : !1;
  }
  async _activate(t) {
    const e = this._selected[t];
    if (!e) return;
    const i = this._record(e);
    if (!i.entry || !i.state) return;
    const r = i.entry.entity_id, s = this._domain(r);
    if (["light", "switch", "fan", "input_boolean"].includes(s))
      await this.hass?.callService("homeassistant", "toggle", {
        entity_id: r
      });
    else if (["automation", "script", "scene"].includes(s)) {
      const n = s === "automation" ? "trigger" : "turn_on";
      await this.hass?.callService(s, n, { entity_id: r });
    } else ["button", "input_button"].includes(s) ? await this.hass?.callService(s, "press", { entity_id: r }) : this.moreInfo(r);
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll(".item button.main").forEach((e, i) => {
      const r = this._record(this._selected[i]);
      this._interactionHandles.push(
        x(e, {
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
      const i = this._record(e), r = this._name(i), s = this._stateLabel(i), n = this._icon(i), a = this._isActive(i), c = !i.state || ki.has(String(i.state.state).toLowerCase());
      return o`
                      <div
                        class="item ${a ? "active" : ""} ${c ? "unavailable" : ""}"
                      >
                        <button
                          class="main"
                          type="button"
                          ?disabled=${c}
                          aria-label="${r}: ${s}"
                        >
                          <span class="icon">
                            <ha-icon icon="${n}"></ha-icon>
                          </span>
                          <span class="copy">
                            <div class="name">${r}</div>
                            <div class="state">${s}</div>
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
yt.stubConfig = { helpers: [], max: 4, title: "Favourites" };
yt.styles = ko;
mi([
  v()
], yt.prototype, "_selected", 2);
mi([
  v()
], yt.prototype, "_registry", 2);
yt = mi([
  $("component-favourites-v3")
], yt);
let Ye = class extends k {
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
Ye.styles = w`
    :host {
      display: block;
      min-width: 0;
    }
  `;
Ye = mi([
  $("component-favourites-minimal-v1")
], Ye);
S({
  type: "component-favourites-v3",
  element: yt,
  name: "Favourites V3",
  description: "Stable household favourites with entity discovery and backend companion storage."
});
S({
  type: "component-favourites-minimal-v1",
  element: Ye,
  name: "Favourites Minimal",
  description: "Existing favourites behaviour with restrained Home typography."
});
const Ao = [
  H,
  w`
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
    .top {
      min-height: 44px;
      padding: 0 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .time {
      min-width: 0;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 1.2;
      font-weight: 400;
    }
    .weather {
      appearance: none;
      border: 0;
      min-height: 44px;
      padding: 0;
      background: transparent;
      color: var(--secondary-text-color);
      font: inherit;
      font-size: 13px;
      line-height: 1.2;
      font-weight: 400;
      white-space: nowrap;
      cursor: pointer;
    }
    .weather:hover {
      text-decoration: underline;
    }
    .weather:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 6px;
    }
    .sections {
      margin-top: 8px;
      display: grid;
      gap: 16px;
    }
    @media (max-width: 520px) {
      .time {
        font-size: 13px;
      }
      .weather {
        font-size: 12px;
      }
    }
    @media (max-width: 350px) {
      .time {
        font-size: 12px;
      }
      .weather {
        font-size: 11px;
      }
    }
  `
], Eo = [
  H,
  w`
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
      min-height: 44px;
      padding: 0 2px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .time {
      min-width: 0;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 14px;
      line-height: 1.2;
      font-weight: 400;
    }
    .weather {
      appearance: none;
      border: 0;
      min-height: 44px;
      padding: 0;
      background: transparent;
      color: var(--secondary-text-color);
      font-size: 13px;
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
      border-radius: 6px;
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
var zo = Object.getOwnPropertyDescriptor, To = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? zo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const Oo = {
  type: "custom:component-welcome-header-v1",
  weather_entity: "weather.forecast_home"
};
let Xe = class extends k {
  constructor() {
    super(...arguments), this._cancelMinuteScheduler = null, this._interactionHandle = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (super.setConfig({ ...Oo, ...t }), !this._config?.weather_entity)
      throw new Error("weather_entity is required");
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = Pr(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._cancelMinuteScheduler?.(), this._cancelMinuteScheduler = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  _number(t, e = 0) {
    const i = Number(t);
    return Number.isFinite(i) ? At(this.hass, i, {
      maximumFractionDigits: e,
      minimumFractionDigits: Number.isInteger(i) ? 0 : Math.min(1, e)
    }) : null;
  }
  updated() {
    const t = this.renderRoot.querySelector(".weather");
    t && (this._interactionHandle?.destroy(), this._interactionHandle = x(t, {
      primary: () => {
        this._config?.weather_entity && this.moreInfo(this._config.weather_entity);
      },
      feedback: !0
    }));
  }
  render() {
    if (!this._config) return o``;
    const t = /* @__PURE__ */ new Date(), i = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, r = Je(this.hass), s = Ze(this.hass), n = this._number(i.temperature, 1), a = this._number(i.cloud_coverage, 0), c = n === null ? "—" : `${n}${i.temperature_unit || "°C"}`, d = a === null ? "Cloud —" : `Cloud ${a}%`, u = new Intl.DateTimeFormat(s, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: r
    }).format(t), b = `Outside ${c}, ${d}. Open weather details.`;
    return o`
      <ha-card>
        <div class="row">
          <span class="time">${u}</span>
          <button
            class="weather"
            type="button"
            aria-label="${this.esc(b)}"
          >
            ${c} · ${d}
          </button>
        </div>
      </ha-card>
    `;
  }
};
Xe.styles = Eo;
Xe = To([
  $("component-welcome-header-v1")
], Xe);
S({
  type: "component-welcome-header-v1",
  element: Xe,
  name: "Welcome Header",
  description: "Compact live weather and home-time header."
});
const Do = [
  H,
  w`
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
    .heading {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 0;
    }
    .heading ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 17px;
    }
    .heading h2 {
      margin: 0;
      font-size: 15px;
      line-height: 1.2;
      font-weight: 500;
    }
    .edit {
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
    .edit ha-icon {
      --mdc-icon-size: 16px;
    }
    .edit:hover,
    .edit:focus-visible {
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
      color: var(--primary-text-color);
    }
    .head.sep {
      min-height: 30px;
      margin: 2px 0 6px;
    }
    .head.sep .heading {
      flex: 1;
    }
    .head.sep .heading h2 {
      font-size: 12px;
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
    .body {
      display: grid;
      gap: 8px;
      min-width: 0;
    }
    .empty {
      min-height: 44px;
      padding: 8px 10px;
      border: var(--dashboard-card-border, 1px solid var(--divider-color));
      border-radius: var(--dashboard-radius-card, 8px);
      color: var(--secondary-text-color);
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .empty ha-icon {
      color: var(--secondary-text-color);
      --mdc-icon-size: 17px;
    }
  `
];
var Po = Object.defineProperty, Ho = Object.getOwnPropertyDescriptor, Qr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ho(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Po(e, i, s), s;
};
const Ro = {
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
let ne = class extends k {
  constructor() {
    super(...arguments), this._registry = null, this._unsubRegistry = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Ro, ...t }), this.hass && L.load(this.hass).then((e) => {
      this._registry = e;
    });
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = L.subscribe(this.hass, (t) => {
      this._registry = t;
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, super.disconnectedCallback();
  }
  willUpdate() {
    !this._registry && this.hass && L.load(this.hass).then((t) => {
      this._registry = t;
    });
  }
  _candidates() {
    if (!this._registry || !this.hass) return [];
    const t = this._config?.mode || "all", e = this._config?.area_id;
    return this._registry.entities.filter((i) => {
      if (i.disabled_by || i.hidden_by) return !1;
      const r = this.hass?.states[i.entity_id];
      if (!r) return !1;
      const s = Z(i.entity_id);
      return t === "area" ? (i.area_id || (i.device_id ? this._registry?.deviceArea?.get(i.device_id) : null)) === e : t === "media" ? s === "media_player" : t === "active" ? Ot(r) : [
        "light",
        "switch",
        "fan",
        "cover",
        "climate",
        "media_player",
        "lock"
      ].includes(s);
    });
  }
  render() {
    if (!this._config) return o``;
    const t = this._candidates(), e = this._config.header_style === "separator", i = this._config.show_header !== !1;
    return o`
      <ha-card>
        ${i ? o`
                <div class="head ${e ? "sep" : ""}">
                  <span class="heading">
                    <ha-icon
                      icon="${this._config.icon || "mdi:tune-variant"}"
                    ></ha-icon>
                    <h2>${this._config.title || "Controls"}</h2>
                  </span>
                  ${this._config.editable ? o`
                          <button class="edit" type="button" aria-label="Edit">
                            <ha-icon icon="mdi:dots-horizontal"></ha-icon>
                          </button>
                        ` : ""}
                </div>
              ` : ""}

        <div class="body">
          ${t.length === 0 ? o`
                  <div class="empty">
                    <ha-icon
                      icon="${this._config.mode === "active" ? "mdi:check-circle-outline" : "mdi:gesture-tap"}"
                    ></ha-icon>
                    <span>
                      ${this._config.mode === "active" ? "Everything is quiet" : "No controls available"}
                    </span>
                  </div>
                ` : t.map(
      (r) => o`
                    <component-control-row-v2
                      .hass=${this.hass}
                      .config=${{
        type: "custom:component-control-row-v2",
        entity: r.entity_id,
        title: r.name || r.original_name || this.hass?.states[r.entity_id]?.attributes?.friendly_name || r.entity_id,
        name: r.name || r.original_name || this.hass?.states[r.entity_id]?.attributes?.friendly_name || r.entity_id
      }}
                    ></component-control-row-v2>
                  `
    )}
        </div>
      </ha-card>
    `;
  }
};
ne.styles = Do;
Qr([
  v()
], ne.prototype, "_registry", 2);
ne = Qr([
  $("component-smart-collection-v3")
], ne);
S({
  type: "component-smart-collection-v3",
  element: ne,
  name: "Smart Control Collection V3",
  description: "Stable registry-driven household controls without refresh teardown."
});
const No = [
  H,
  w`
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
var Lo = Object.defineProperty, qo = Object.getOwnPropertyDescriptor, Yr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? qo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Lo(e, i, s), s;
};
const Mo = {
  type: "custom:component-household-directory-v3",
  pref_key: "home-control.household.v2",
  base_path: "/home-control",
  current_dashboard: "home-control",
  title: "Quick actions",
  icon: "mdi:gesture-tap-button",
  quick_action_label: "dashboard_quick_action"
}, wr = {
  automation: "trigger",
  scene: "turn_on",
  script: "turn_on",
  button: "press",
  input_button: "press"
};
let ae = class extends k {
  constructor() {
    super(...arguments), this._registry = [], this._unsubRegistry = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Mo, ...t }), this.hass && L.load(this.hass).then((e) => {
      this._registry = e.entities || [];
    });
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = L.subscribe(this.hass, (t) => {
      this._registry = t.entities || [];
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    this._registry.length === 0 && this.hass && L.load(this.hass).then((t) => {
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
    const i = this._config?.quick_action_label || "dashboard_quick_action", r = this._registry.filter((s) => {
      if (s.disabled_by || s.hidden_by) return !1;
      const n = s.entity_id.split(".")[0];
      return !Object.prototype.hasOwnProperty.call(
        wr,
        n
      ) && !(n === "todo") ? !1 : (Array.isArray(s.labels) ? s.labels : []).includes(i);
    });
    for (const s of r) {
      const n = this.hass.states[s.entity_id], a = s.entity_id.split(".")[0], c = n?.attributes?.friendly_name || s.name || s.original_name || s.entity_id, d = n?.attributes?.icon || s.icon || s.original_icon || "mdi:flash";
      a === "todo" ? t.push({
        id: s.entity_id,
        name: c.replace(/\s+List$/i, ""),
        icon: d,
        kind: "entity",
        entity: s.entity_id,
        meta: "To-do list"
      }) : t.push({
        id: s.entity_id,
        name: c,
        icon: d,
        kind: "action",
        entity: s.entity_id,
        domain: a,
        service: wr[a],
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
      const s = e[r];
      if (!s) return;
      let n = null;
      s.kind === "nav" && s.path ? n = () => kr(s.path) : s.kind === "action" ? n = () => this._runAction(s) : s.kind === "entity" && s.entity && (n = () => this.moreInfo(s.entity)), n && this._interactionHandles.push(
        x(i, {
          primary: n,
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
ae.styles = No;
Yr([
  v()
], ae.prototype, "_registry", 2);
ae = Yr([
  $("component-household-directory-v3")
], ae);
S({
  type: "component-household-directory-v3",
  element: ae,
  name: "Household Directory V3",
  description: "Global views and label-driven quick actions directory."
});
const Io = [
  H,
  w`
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
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
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
      background: var(
        --dashboard-card-muted-surface,
        var(--secondary-background-color)
      );
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
      color: var(--primary-color);
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
      box-shadow: var(
        --dashboard-dialog-shadow,
        0 16px 48px rgba(0, 0, 0, 0.22)
      );
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
    }
    .sheet-head {
      flex: 0 0 auto;
      min-height: 54px;
      padding: 5px 6px 5px 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--divider-color);
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
      margin-left: auto;
    }
    .sheet-body {
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
      padding: 10px 14px max(14px, env(safe-area-inset-bottom));
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
        border-radius: var(--dashboard-radius-dialog, 8px)
          var(--dashboard-radius-dialog, 8px) 0 0;
      }
    }
  `
];
var jo = Object.defineProperty, Uo = Object.getOwnPropertyDescriptor, Wi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Uo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && jo(e, i, s), s;
};
const Fo = {
  type: "custom:component-room-directory-v4",
  title: "Rooms",
  icon: "mdi:floor-plan",
  mode: "home",
  pref_key: "home-control.rooms.v2",
  navigation_path: null,
  base_path: "/home-control"
};
let jt = class extends k {
  constructor() {
    super(...arguments), this._registries = null, this._activeArea = null, this._unsubRegistry = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Fo, ...t }), this.hass && L.load(this.hass).then((e) => {
      this._registries = e;
    });
  }
  getCardSize() {
    return 4;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = L.subscribe(this.hass, (t) => {
      this._registries = t;
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, super.disconnectedCallback();
  }
  willUpdate() {
    !this._registries && this.hass && L.load(this.hass).then((t) => {
      this._registries = t;
    });
  }
  _areas() {
    return [...this._registries?.areas || []].sort(
      (e, i) => e.name.localeCompare(i.name, void 0, { sensitivity: "base" })
    );
  }
  _areaStatus(t) {
    return Lr(t, this._registries, this.hass);
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
jt.styles = Io;
Wi([
  v()
], jt.prototype, "_registries", 2);
Wi([
  v()
], jt.prototype, "_activeArea", 2);
jt = Wi([
  $("component-room-directory-v4")
], jt);
S({
  type: "component-room-directory-v4",
  element: jt,
  name: "Room Directory V4",
  description: "Stable registry-driven rooms with full-height swipeable room sheets."
});
var Bo = Object.getOwnPropertyDescriptor, Xr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Bo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
const Vo = {
  type: "custom:component-home-overview-v4",
  weather_entity: "weather.forecast_home",
  base_path: "/home-control",
  current_dashboard: "home-control",
  favourites_helpers: []
};
let oe = class extends k {
  constructor() {
    super(...arguments), this._weatherInteraction = null, this._cancelMinuteScheduler = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      ...Vo,
      ...t,
      favourites_helpers: []
    });
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = Pr(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._cancelMinuteScheduler?.(), this._cancelMinuteScheduler = null, this._weatherInteraction?.destroy(), this._weatherInteraction = null, super.disconnectedCallback();
  }
  updated() {
    const t = this.renderRoot.querySelector(".weather");
    t && (this._weatherInteraction?.destroy(), this._weatherInteraction = x(t, {
      primary: () => {
        this._config?.weather_entity && this.moreInfo(this._config.weather_entity);
      },
      feedback: !0
    }));
  }
  render() {
    if (!this._config) return o``;
    const t = /* @__PURE__ */ new Date(), e = Je(this.hass), i = Ze(this.hass), r = new Intl.DateTimeFormat(i, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: e
    }).format(t), n = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, a = Number(n.temperature), c = Number.isFinite(a) ? `${At(this.hass, a, { maximumFractionDigits: 1 })}${n.temperature_unit || "°C"}` : "—", d = Number(n.cloud_coverage), u = Number.isFinite(d) ? `Cloud ${Math.round(d)}%` : "Cloud —", b = `${c} · ${u}`, m = `Outside ${c}, ${u}. Open weather details.`, l = this._config.base_path || "/home-control", _ = this._config.current_dashboard || "home-control";
    return o`
      <ha-card>
        <div class="top">
          <span class="time">${r}</span>
          <button
            class="weather"
            type="button"
            aria-label="${this.esc(m)}"
          >
            ${b}
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
      base_path: l,
      current_dashboard: _
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
      base_path: l,
      navigation_path: `${l}/rooms`
    }}
          ></component-room-directory-v4>
        </div>
      </ha-card>
    `;
  }
};
oe.styles = Ao;
oe = Xr([
  $("component-home-overview-v4")
], oe);
let Si = class extends oe {
};
Si = Xr([
  $("component-home-overview-v5")
], Si);
S({
  type: "component-home-overview-v4",
  element: oe,
  name: "Home Overview V4",
  description: "Stable minimal Home overview without state-refresh teardown."
});
S({
  type: "component-home-overview-v5",
  element: Si,
  name: "Home Overview V5",
  description: "Stable minimal Home overview without state-refresh teardown (v5 alias)."
});
const Wo = [
  H,
  w`
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
var Go = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, Gi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ko(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Go(e, i, s), s;
};
const Qo = {
  type: "custom:component-household-attention-v2",
  title: "Attention",
  icon: "mdi:alert-circle-outline",
  quiet_title: "Everything quiet",
  quiet_subtitle: "No security or hardware alerts",
  quiet_icon: "mdi:check-circle-outline"
};
let Ut = class extends k {
  constructor() {
    super(...arguments), this._registry = null, this._unsubRegistry = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Qo, ...t }), this.hass && !this._config?.demo && L.load(this.hass).then((e) => {
      this._registry = e.entities || [];
    });
  }
  getCardSize() {
    return this._config?.demo ? 2 : 1;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && !this._config?.demo && (this._unsubRegistry = L.subscribe(this.hass, (t) => {
      this._registry = t.entities || [];
    }));
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null;
    for (const t of this._interactionHandles) t.destroy();
    this._interactionHandles = [], super.disconnectedCallback();
  }
  willUpdate() {
    !this._registry && this.hass && !this._config?.demo && L.load(this.hass).then((t) => {
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
      const r = e.entity_id.split(".")[0], s = e.device_class || i.attributes?.device_class || "";
      let n = null;
      e.entity_id.endsWith("_controller_status") && i.state === "off" ? n = {
        status: "Controller offline",
        severity: "critical",
        severity_text: "Critical",
        icon: "mdi:access-point-network-off"
      } : r === "binary_sensor" && i.state === "on" && ["smoke", "moisture", "gas"].includes(s) ? n = {
        status: "Detected",
        severity: "critical",
        severity_text: "Critical",
        icon: s === "smoke" ? "mdi:smoke-detector-alert" : s === "gas" ? "mdi:gas-cylinder" : "mdi:water-alert"
      } : r === "binary_sensor" && i.state === "on" && ["door", "window", "garage_door"].includes(s) ? n = {
        status: "Open",
        severity: "warning",
        severity_text: "Check",
        icon: s === "window" ? "mdi:window-open-variant" : s === "garage_door" ? "mdi:garage-open" : "mdi:door-open"
      } : r === "lock" && i.state === "unlocked" && (n = {
        status: "Unlocked",
        severity: "warning",
        severity_text: "Check",
        icon: "mdi:lock-open-variant-outline"
      }), n && t.push({
        entity_id: e.entity_id,
        name: Hs({ entry: e, state: i }),
        status: n.status,
        severity: n.severity,
        severity_text: n.severity_text,
        icon: n.icon
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
      const s = e[r];
      s && this._interactionHandles.push(
        x(i, {
          primary: () => {
            this._config?.demo || this.moreInfo(s.entity_id);
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
Ut.styles = Wo;
Gi([
  v()
], Ut.prototype, "_registry", 2);
Ut = Gi([
  $("component-household-attention-v2")
], Ut);
let Ai = class extends Ut {
};
Ai = Gi([
  $("component-household-attention-v1")
], Ai);
S({
  type: "component-household-attention-v1",
  element: Ai,
  name: "Household Attention V1",
  description: "Aggregated safety and hardware attention queue (v1)."
});
S({
  type: "component-household-attention-v2",
  element: Ut,
  name: "Household Attention V2",
  description: "Aggregated safety and hardware attention queue."
});
const Yo = [
  si,
  w`
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
      padding: 14px;
      min-height: 80px;
      box-sizing: border-box;
    }

    .tile-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .tile-icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background-color: var(
        --secondary-background-color,
        rgba(128, 128, 128, 0.1)
      );
      color: var(--secondary-text-color, #757575);
      transition: all 0.25s ease;
    }

    .tile-icon-box.active {
      background-color: var(--tile-active-color);
      color: #ffffff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }

    .badge-pill {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
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
  `
];
var Xo = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, Ki = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Zo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && Xo(e, i, s), s;
};
let ce = class extends at {
  setConfig(t) {
    this._config = { ...t };
  }
  _valueChanged(t, e) {
    if (!this._config) return;
    const r = t.target.value;
    if (r === "") {
      const s = { ...this._config };
      delete s[e], this._config = s;
    } else
      this._config = {
        ...this._config,
        [e]: r
      };
    X(this, "config-changed", { config: this._config });
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
ce.styles = [Rr];
Ki([
  Ft({ attribute: !1 })
], ce.prototype, "hass", 2);
Ki([
  v()
], ce.prototype, "_config", 2);
ce = Ki([
  $("ha-action-tile-editor")
], ce);
var Jo = Object.getOwnPropertyDescriptor, tc = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Jo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
let Ei = class extends ci {
  static async getConfigElement() {
    return document.createElement(
      "ha-action-tile-editor"
    );
  }
  static getStubConfig(t, e, i) {
    return {
      entity: e.find((s) => s.startsWith("light.") || s.startsWith("switch.")) || e[0] || "light.living_room",
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
    oi(this, this.hass, t, this.config.entity);
  }
  _renderBadge() {
    if (!this.hass || !this.config) return M;
    if (this.config.badge_entity && this.hass.states[this.config.badge_entity]) {
      const e = this.hass.states[this.config.badge_entity];
      return o`
        <div class="badge-pill">
          ${Tt(e, this.hass)}
        </div>
      `;
    }
    const t = this.hass.states[this.config.entity];
    if (t?.attributes?.brightness !== void 0 && Ot(t)) {
      const e = Math.round(t.attributes.brightness / 255 * 100);
      return o`<div class="badge-pill">${e}%</div>`;
    }
    return t?.attributes?.temperature !== void 0 ? o`<div class="badge-pill">
        ${t.attributes.temperature}&deg;
      </div>` : M;
  }
  render() {
    if (!this.hass || !this.config?.entity)
      return this.renderError("No entity configured for ha-action-tile");
    const t = this.hass.states[this.config.entity];
    if (!t)
      return this.renderError(`Entity not found: ${this.config.entity}`);
    const e = Z(this.config.entity), i = Ot(t), r = this.config.name || ni(t), s = this.config.icon || t.attributes.icon || ai(e, t.state), n = Tt(t, this.hass), a = this.config.color || "#03a9f4";
    return o`
      <ha-card
        class="interactive tile-card ${i ? "active" : ""}"
        style=${i ? `--tile-active-color: ${a};` : ""}
        @click=${this._handleTileTap}
      >
        <div class="tile-body">
          <div class="tile-header">
            <div class="tile-icon-box ${i ? "active" : ""}">
              <ha-icon .icon=${s}></ha-icon>
            </div>
            ${this._renderBadge()}
          </div>

          <div class="tile-content">
            <div class="primary-title" title=${r}>${r}</div>
            <div class="secondary-text">${n}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
Ei.styles = Yo;
Ei = tc([
  $("ha-action-tile")
], Ei);
const ec = [
  si,
  w`
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
  `
];
var ic = Object.getOwnPropertyDescriptor, rc = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ic(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
let zi = class extends ci {
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
    oi(this, this.hass, t, this.config.entity);
  }
  _computeColor(t) {
    if (!this.config?.thresholds || this.config.thresholds.length === 0)
      return "var(--primary-color, #03a9f4)";
    const e = [...this.config.thresholds].sort(
      (r, s) => r.value - s.value
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
    const e = Z(this.config.entity), i = this.config.name || ni(t), r = this.config.icon || t.attributes.icon || ai(e, t.state), s = parseFloat(t.state), n = !isNaN(s), a = n ? this._computeColor(s) : "var(--primary-color, #03a9f4)", c = this.config.unit || t.attributes.unit_of_measurement || "";
    return o`
      <ha-card
        class="interactive metric-badge-card"
        tabindex="0"
        role="button"
        style="--badge-accent-color: ${a};"
        @click=${this._handleTap}
        @keydown=${(d) => {
      (d.key === "Enter" || d.key === " ") && (d.preventDefault(), this._handleTap());
    }}
        aria-label="${i}: ${n ? s : t.state}${c ? " " + c : ""}"
        title="${i}: ${Tt(t, this.hass)}"
      >
        <div class="metric-body">
          <div class="icon-bubble">
            <ha-icon .icon=${r}></ha-icon>
          </div>
          <div class="metric-data">
            <div class="metric-value-line">
              <span class="value-text"
                >${n ? s : t.state}</span
              >
              ${c ? o`<span class="unit-text">${c}</span>` : ""}
            </div>
            <div class="metric-label" title=${i}>${i}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
zi.styles = ec;
zi = rc([
  $("ha-metric-badge")
], zi);
const sc = [
  si,
  w`
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
  `
];
var nc = Object.getOwnPropertyDescriptor, ac = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? nc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
let Ti = class extends ci {
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
    oi(this, this.hass, e, t.entity);
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
      r && Ot(r) && e++;
    }), o`
      <ha-card>
        ${this.config.title || this.config.show_active_count ? o`
                <div class="card-header">
                  <span>${this.config.title || "Quick Controls"}</span>
                  ${this.config.show_active_count !== !1 ? o`
                          <span
                            class="active-badge ${e > 0 ? "highlight" : ""}"
                          >
                            ${e} Active
                          </span>
                        ` : ""}
                </div>
              ` : ""}

        <div class="bar-items-container">
          ${t.map((i) => {
      const r = this.hass?.states[i.entity], s = Ot(r), n = Z(i.entity), a = i.name || ni(r), c = i.icon || r?.attributes?.icon || ai(n, r?.state);
      return o`
              <div
                class="quick-item interactive ${s ? "active" : ""}"
                @click=${() => this._handleEntityTap(i)}
                title="${a}: ${r?.state || "unknown"}"
              >
                <div class="item-icon-circle ${s ? "active" : ""}">
                  <ha-icon .icon=${c}></ha-icon>
                </div>
                <span class="item-label">${a}</span>
              </div>
            `;
    })}
        </div>
      </ha-card>
    `;
  }
};
Ti.styles = sc;
Ti = ac([
  $("ha-quick-bar")
], Ti);
const oc = [
  si,
  w`
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

    .toggle-btn.active .toggle-track {
      background-color: var(--primary-color, #03a9f4);
    }

    .toggle-btn.active .toggle-thumb {
      transform: translateX(20px);
    }
  `
];
var cc = Object.defineProperty, lc = Object.getOwnPropertyDescriptor, Qi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? lc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = (r ? a(e, i, s) : a(s)) || s);
  return r && s && cc(e, i, s), s;
};
let le = class extends at {
  setConfig(t) {
    this._config = { ...t };
  }
  _valueChanged(t, e) {
    if (!this._config) return;
    const i = t.target;
    let r = i.type === "checkbox" ? i.checked : i.value;
    if (r === "") {
      const s = { ...this._config };
      delete s[e], this._config = s;
    } else
      this._config = {
        ...this._config,
        [e]: r
      };
    X(this, "config-changed", { config: this._config });
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
le.styles = [
  Rr,
  w`
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
Qi([
  Ft({ attribute: !1 })
], le.prototype, "hass", 2);
Qi([
  v()
], le.prototype, "_config", 2);
le = Qi([
  $("ha-status-card-editor")
], le);
var dc = Object.getOwnPropertyDescriptor, pc = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? dc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (s = a(s) || s);
  return s;
};
let Oi = class extends ci {
  static async getConfigElement() {
    return document.createElement(
      "ha-status-card-editor"
    );
  }
  static getStubConfig(t, e, i) {
    return {
      entity: e.find((s) => s.startsWith("light.") || s.startsWith("switch.")) || e[0] || "light.living_room",
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
    oi(this, this.hass, t, this.config.entity);
  }
  async _handleToggle(t) {
    if (t.stopPropagation(), !this.hass || !this.config?.entity) return;
    const e = Z(this.config.entity), i = e === "lock" ? "lock" : "toggle";
    await this.hass.callService(e, i, void 0, {
      entity_id: this.config.entity
    });
  }
  _renderIcon(t) {
    return t.startsWith("mdi:") ? o`<ha-icon .icon=${t}></ha-icon>` : o`<span>${t}</span>`;
  }
  _getSecondaryText(t) {
    const e = this.config?.secondary_info || "last-changed";
    if (e === "none") return "";
    if (e === "state") return Tt(t, this.hass);
    if (e === "entity-id") return t.entity_id;
    if (e === "last-changed" && t.last_changed)
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
    const e = Z(this.config.entity), i = Ot(t), r = this.config.name || ni(t), s = this.config.icon || t.attributes.icon || ai(e, t.state), n = Tt(t, this.hass), a = this._getSecondaryText(t), c = this.config.show_toggle !== !1 && ["light", "switch", "input_boolean", "fan", "lock"].includes(e);
    return o`
      <ha-card class="interactive" @click=${this._handleTap}>
        <div class="card-body ${i ? "state-active" : "state-inactive"}">
          <div class="icon-container ${i ? "active" : ""}">
            ${this._renderIcon(s)}
          </div>

          <div class="info-container">
            <div class="primary-title" title=${r}>${r}</div>
            <div class="secondary-text">
              ${a ? o`${a} &bull; ` : M}
              <span class="state-label">${n}</span>
            </div>
          </div>

          ${c ? o`
                  <button
                    class="toggle-btn ${i ? "active" : ""}"
                    @click=${this._handleToggle}
                    aria-label="Toggle ${r}"
                    title="Toggle state"
                  >
                    <div class="toggle-track">
                      <div class="toggle-thumb"></div>
                    </div>
                  </button>
                ` : M}
        </div>
      </ha-card>
    `;
  }
};
Oi.styles = oc;
Oi = pc([
  $("ha-status-card")
], Oi);
console.info(
  "%c HA-COMPONENT-LIBRARY %c 1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #03a9f4; background: #e1f5fe; font-weight: 700; border-radius: 0 3px 3px 0;"
);
export {
  Re as ComponentActionV2,
  ee as ComponentAppleTvControllerV1,
  Ci as ComponentCameraControllerV1,
  J as ComponentCameraControllerV2,
  Ne as ComponentContextStripV3,
  Dt as ComponentControlRowV2,
  Pt as ComponentDeviceAwareAutoEntitiesV1,
  Ht as ComponentDeviceDiscoveryV2,
  qe as ComponentEmptyStateV2,
  Le as ComponentEmptyStateV3,
  se as ComponentEnergyDashboardV1,
  Mt as ComponentEnergyDaySelectorV1,
  et as ComponentEnergySummaryV1,
  Ye as ComponentFavouritesMinimalV1,
  yt as ComponentFavouritesV3,
  ot as ComponentGarageDoorControllerV1,
  It as ComponentHistoryGraphV2,
  oe as ComponentHomeOverviewV4,
  Si as ComponentHomeOverviewV5,
  Ai as ComponentHouseholdAttentionV1,
  Ut as ComponentHouseholdAttentionV2,
  ae as ComponentHouseholdDirectoryV3,
  Me as ComponentListV2,
  gt as ComponentMediaRowV2,
  ct as ComponentMetricPairCardV3,
  Ge as ComponentNavigationTileV2,
  Ie as ComponentNoticeV2,
  je as ComponentProgressV2,
  Ke as ComponentQuickNavigationV2,
  jt as ComponentRoomDirectoryV4,
  te as ComponentRoomNavigationV1,
  Qe as ComponentRoomSheetV2,
  Ue as ComponentSectionSeparatorV2,
  Nt as ComponentSecurityCameraWallV3,
  tt as ComponentSecurityDashboardV1,
  Lt as ComponentSecurityEntryPointsV1,
  qt as ComponentSecuritySummaryV1,
  Fe as ComponentSingleKpiV2,
  ne as ComponentSmartCollectionV3,
  ie as ComponentSplitControllerV4,
  Be as ComponentStatusRowV2,
  Ve as ComponentTextEffectV1,
  We as ComponentThreeStatV2,
  bt as ComponentUpdateRowV3,
  Rt as ComponentUpdateSummaryV3,
  Xe as ComponentWelcomeHeaderV1,
  _t as ComponentWledControllerV1,
  Ds as DASHBOARD_BASE_CARD_STYLES,
  Hr as DASHBOARD_SHARED_STYLE_CSS,
  hr as DASHBOARD_SHARED_STYLE_ID,
  Ns as DashboardRegistryCoordinator,
  vt as EnergyHistoryCardV3,
  Ei as HaActionTile,
  ci as HaBaseCard,
  ft as HaComponentLibraryConfigEditor,
  zi as HaMetricBadge,
  Ti as HaQuickBar,
  Oi as HaStatusCard,
  $t as INTERACTION_DEFAULTS,
  k as LitBaseCard,
  Os as PRESENTATIONAL_CARD_STYLES,
  re as SolarDaylightCardV7,
  Ps as UPDATE_CARD_STYLES,
  $i as WLED_DOMAIN,
  _r as WLED_INVALID,
  Mr as WLED_NAME,
  Bs as actionCardStyles,
  ke as actionRole,
  Yo as actionTileCardStyles,
  xa as appleTvCardStyles,
  bi as areaOf,
  Cr as calendarDayRange,
  Aa as cameraCardStyles,
  L as centralRegistry,
  si as commonCardStyles,
  Lr as computeAreaStatusSummary,
  Z as computeDomain,
  Hs as computeEntityDisplayName,
  ni as computeEntityName,
  Ii as connectionId,
  Ks as contextStripCardStyles,
  Yn as controlRowCardStyles,
  Dr as createAsyncBroker,
  zs as createLifecycle,
  Pr as createMinuteScheduler,
  Or as createRequestCoalescer,
  H as dashboardBaseCardStyles,
  Is as dashboardProfiles,
  fc as dashboardTokens,
  Jt as dayKey,
  Wt as dayKeyInZone,
  sa as deviceAwareAutoEntitiesCardStyles,
  ca as deviceDiscoveryCardStyles,
  G as domainOf,
  Zs as emptyStateCardStyles,
  Xa as energyDashboardCardStyles,
  He as energyDayData,
  Za as energyDaySelectorCardStyles,
  q as energyDayState,
  co as energyHistoryCardStyles,
  eo as energySummaryCardStyles,
  Es as ensureInteractionFeedback,
  Ee as entryFilters,
  ze as escapeHtml,
  ko as favouritesCardStyles,
  X as fireEvent,
  ei as formatCalendarDay,
  ti as formatDate,
  nt as formatEnergy,
  Tt as formatEntityState,
  Y as formatPower,
  Te as formatTime,
  Ta as garageDoorCardStyles,
  ai as getDefaultIconForDomain,
  oi as handleAction,
  vc as healthAwareRegistryLoad,
  go as historyGraphCardStyles,
  Ao as homeOverviewCardStyles,
  Wo as householdAttentionCardStyles,
  No as householdDirectoryCardStyles,
  Fs as initWledIntegration,
  Ts as injectDashboardTokens,
  ks as installConfigContract,
  x as interaction,
  Cs as interactionStyles,
  Ot as isEntityActive,
  Nr as isEntityAvailable,
  ur as isEntityUnavailable,
  rn as listCardStyles,
  _c as loadDashboardRegistries,
  ue as loadSecurityModel,
  Ze as localeOf,
  ta as mediaRowCardStyles,
  ec as metricBadgeCardStyles,
  yo as metricPairCardStyles,
  Hn as navTileCardStyles,
  kr as navigateTo,
  on as noticeCardStyles,
  At as numberFormat,
  Zr as openMoreInfo,
  mc as prefersReducedMotion,
  it as presentationalCardStyles,
  pn as progressCardStyles,
  js as ptzRole,
  sc as quickBarCardStyles,
  qn as quickNavCardStyles,
  S as registerCard,
  Ls as registerEntryFilter,
  Io as roomDirectoryCardStyles,
  Un as roomNavigationCardStyles,
  Wn as roomSheetCardStyles,
  fn as sectionSeparatorCardStyles,
  Ma as securityCameraWallCardStyles,
  li as securityCapabilityText,
  Ua as securityDashboardCardStyles,
  $e as securityEntityLabel,
  Va as securityEntryPointsCardStyles,
  Us as securityModel,
  Ka as securitySummaryCardStyles,
  _n as singleKpiCardStyles,
  Do as smartCollectionCardStyles,
  so as solarDaylightCardStyles,
  Pa as splitAcCardStyles,
  bc as stateNameOf,
  oc as statusCardCardStyles,
  wn as statusRowCardStyles,
  br as switchRole,
  Sn as textEffectCardStyles,
  Tn as threeStatCardStyles,
  Je as timeZoneOf,
  $r as toText,
  gc as uiEntry,
  qi as updateCardStyles,
  ua as updateRowCardStyles,
  ba as updateSummaryCardStyles,
  qr as validDay,
  Pe as waitForEntityState,
  Eo as welcomeHeaderCardStyles,
  Na as wledCardStyles
};
