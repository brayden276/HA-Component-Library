const oa = (t) => t == null ? "" : String(t), L = (t) => oa(t).replace(
  /[&<>"']/g,
  (e) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[e] || e
), vt = (t, e, i, r) => {
  const a = new CustomEvent(e, {
    bubbles: r?.bubbles ?? !0,
    cancelable: !!r?.cancelable,
    composed: r?.composed ?? !0,
    detail: i
  });
  return t.dispatchEvent(a), a;
}, Ga = (t, e) => {
  e && vt(t, "hass-more-info", { entityId: e });
}, ca = (t) => {
  t && (window.history.pushState(null, "", t), vt(window, "location-changed", { replace: !1 }));
}, ki = (t) => {
  const e = t?.locale?.language || (typeof navigator < "u" ? navigator.language : "en-AU") || "en-AU";
  return e === "en" ? "en-AU" : e;
}, Si = (t) => t?.config?.time_zone || void 0, ae = (t, e, i = {}) => {
  const r = Number(e);
  return Number.isFinite(r) ? new Intl.NumberFormat(ki(t), i).format(r) : "—";
}, ft = (t, e, i = {}) => {
  if (e == null || e === "") return "—";
  const r = Number(e);
  if (!Number.isFinite(r)) return "—";
  const a = i.absolute ? Math.abs(r) : r;
  return Math.abs(a) >= 1e3 ? `${ae(t, a / 1e3, { maximumFractionDigits: 1 })} kW` : `${ae(t, Math.round(a), { maximumFractionDigits: 0 })} W`;
}, wt = (t, e) => {
  if (e == null || e === "") return "—";
  const i = Number(e);
  return Number.isFinite(i) ? `${ae(t, i, { maximumFractionDigits: Math.abs(i) < 1 ? 2 : 1 })} kWh` : "—";
}, Ai = (t, e, i) => new Intl.DateTimeFormat(ki(t), {
  timeZone: Si(t),
  ...i
}).format(new Date(e)), Ei = (t, e, i = {}) => {
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  return r ? Ai(
    t,
    Date.UTC(Number(r[1]), Number(r[2]) - 1, Number(r[3]), 12),
    {
      timeZone: "UTC",
      ...i
    }
  ) : "—";
}, la = (t, e) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  if (!i) return null;
  const r = Number(i[1]), a = Number(i[2]) - 1, s = Number(i[3]), n = Si(t);
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
  }), l = (d, f, g) => {
    const h = Date.UTC(d, f, g);
    let u = h;
    for (let p = 0; p < 2; p += 1) {
      const v = Object.fromEntries(
        c.formatToParts(new Date(u)).map((b) => [b.type, b.value])
      ), m = Date.UTC(
        Number(v.year),
        Number(v.month) - 1,
        Number(v.day),
        Number(v.hour),
        Number(v.minute),
        Number(v.second)
      );
      u += h - m;
    }
    return u;
  };
  return {
    start: l(r, a, s),
    end: l(r, a, s + 1)
  };
}, oi = (t, e, i = {}) => Ai(t, e, {
  hour: "numeric",
  minute: "2-digit",
  ...i
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ai = globalThis, nr = ai.ShadowRoot && (ai.ShadyCSS === void 0 || ai.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, or = Symbol(), Ir = /* @__PURE__ */ new WeakMap();
let da = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== or) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (nr && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = Ir.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Ir.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ye = (t) => new da(typeof t == "string" ? t : t + "", void 0, or), y = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, a, s) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(a) + t[s + 1], t[0]);
  return new da(i, t, or);
}, Ka = (t, e) => {
  if (nr) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), a = ai.litNonce;
    a !== void 0 && r.setAttribute("nonce", a), r.textContent = i.cssText, t.appendChild(r);
  }
}, Rr = nr ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return ye(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ya, defineProperty: Qa, getOwnPropertyDescriptor: Za, getOwnPropertyNames: Ja, getOwnPropertySymbols: Xa, getPrototypeOf: ts } = Object, Di = globalThis, Hr = Di.trustedTypes, es = Hr ? Hr.emptyScript : "", is = Di.reactiveElementPolyfillSupport, Se = (t, e) => t, ci = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? es : null;
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
} }, cr = (t, e) => !Ya(t, e), Nr = { attribute: !0, type: String, converter: ci, reflect: !1, useDefault: !1, hasChanged: cr };
Symbol.metadata ??= Symbol("metadata"), Di.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Zt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Nr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), a = this.getPropertyDescriptor(e, r, i);
      a !== void 0 && Qa(this.prototype, e, a);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: a, set: s } = Za(this.prototype, e) ?? { get() {
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
    return this.elementProperties.get(e) ?? Nr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Se("elementProperties"))) return;
    const e = ts(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Se("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Se("properties"))) {
      const i = this.properties, r = [...Ja(i), ...Xa(i)];
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
      for (const a of r) i.unshift(Rr(a));
    } else e !== void 0 && i.push(Rr(e));
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
    return Ka(e, this.constructor.elementStyles), e;
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
      const s = (r.converter?.toAttribute !== void 0 ? r.converter : ci).toAttribute(i, r.type);
      this._$Em = e, s == null ? this.removeAttribute(a) : this.setAttribute(a, s), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, a = r._$Eh.get(e);
    if (a !== void 0 && this._$Em !== a) {
      const s = r.getPropertyOptions(a), n = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : ci;
      this._$Em = a;
      const c = n.fromAttribute(i, s.type);
      this[a] = c ?? this._$Ej?.get(a) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, a = !1, s) {
    if (e !== void 0) {
      const n = this.constructor;
      if (a === !1 && (s = this[e]), r ??= n.getPropertyOptions(e), !((r.hasChanged ?? cr)(s, i) || r.useDefault && r.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, r)))) return;
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
Zt.elementStyles = [], Zt.shadowRootOptions = { mode: "open" }, Zt[Se("elementProperties")] = /* @__PURE__ */ new Map(), Zt[Se("finalized")] = /* @__PURE__ */ new Map(), is?.({ ReactiveElement: Zt }), (Di.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lr = globalThis, Lr = (t) => t, li = lr.trustedTypes, Mr = li ? li.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ha = "$lit$", xt = `lit$${Math.random().toFixed(9).slice(2)}$`, pa = "?" + xt, rs = `<${pa}>`, Ot = document, De = () => Ot.createComment(""), Te = (t) => t === null || typeof t != "object" && typeof t != "function", dr = Array.isArray, as = (t) => dr(t) || typeof t?.[Symbol.iterator] == "function", Bi = `[ 	
\f\r]`, $e = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qr = /-->/g, Ur = />/g, zt = RegExp(`>|${Bi}(?:([^\\s"'>=/]+)(${Bi}*=${Bi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), jr = /'/g, Br = /"/g, ua = /^(?:script|style|textarea|title)$/i, ss = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), o = ss(1), se = Symbol.for("lit-noChange"), F = Symbol.for("lit-nothing"), Fr = /* @__PURE__ */ new WeakMap(), Pt = Ot.createTreeWalker(Ot, 129);
function ma(t, e) {
  if (!dr(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Mr !== void 0 ? Mr.createHTML(e) : e;
}
const ns = (t, e) => {
  const i = t.length - 1, r = [];
  let a, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = $e;
  for (let c = 0; c < i; c++) {
    const l = t[c];
    let d, f, g = -1, h = 0;
    for (; h < l.length && (n.lastIndex = h, f = n.exec(l), f !== null); ) h = n.lastIndex, n === $e ? f[1] === "!--" ? n = qr : f[1] !== void 0 ? n = Ur : f[2] !== void 0 ? (ua.test(f[2]) && (a = RegExp("</" + f[2], "g")), n = zt) : f[3] !== void 0 && (n = zt) : n === zt ? f[0] === ">" ? (n = a ?? $e, g = -1) : f[1] === void 0 ? g = -2 : (g = n.lastIndex - f[2].length, d = f[1], n = f[3] === void 0 ? zt : f[3] === '"' ? Br : jr) : n === Br || n === jr ? n = zt : n === qr || n === Ur ? n = $e : (n = zt, a = void 0);
    const u = n === zt && t[c + 1].startsWith("/>") ? " " : "";
    s += n === $e ? l + rs : g >= 0 ? (r.push(d), l.slice(0, g) + ha + l.slice(g) + xt + u) : l + xt + (g === -2 ? c : u);
  }
  return [ma(t, s + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class ze {
  constructor({ strings: e, _$litType$: i }, r) {
    let a;
    this.parts = [];
    let s = 0, n = 0;
    const c = e.length - 1, l = this.parts, [d, f] = ns(e, i);
    if (this.el = ze.createElement(d, r), Pt.currentNode = this.el.content, i === 2 || i === 3) {
      const g = this.el.content.firstChild;
      g.replaceWith(...g.childNodes);
    }
    for (; (a = Pt.nextNode()) !== null && l.length < c; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) for (const g of a.getAttributeNames()) if (g.endsWith(ha)) {
          const h = f[n++], u = a.getAttribute(g).split(xt), p = /([.?@])?(.*)/.exec(h);
          l.push({ type: 1, index: s, name: p[2], strings: u, ctor: p[1] === "." ? cs : p[1] === "?" ? ls : p[1] === "@" ? ds : Ti }), a.removeAttribute(g);
        } else g.startsWith(xt) && (l.push({ type: 6, index: s }), a.removeAttribute(g));
        if (ua.test(a.tagName)) {
          const g = a.textContent.split(xt), h = g.length - 1;
          if (h > 0) {
            a.textContent = li ? li.emptyScript : "";
            for (let u = 0; u < h; u++) a.append(g[u], De()), Pt.nextNode(), l.push({ type: 2, index: ++s });
            a.append(g[h], De());
          }
        }
      } else if (a.nodeType === 8) if (a.data === pa) l.push({ type: 2, index: s });
      else {
        let g = -1;
        for (; (g = a.data.indexOf(xt, g + 1)) !== -1; ) l.push({ type: 7, index: s }), g += xt.length - 1;
      }
      s++;
    }
  }
  static createElement(e, i) {
    const r = Ot.createElement("template");
    return r.innerHTML = e, r;
  }
}
function ne(t, e, i = t, r) {
  if (e === se) return e;
  let a = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const s = Te(e) ? void 0 : e._$litDirective$;
  return a?.constructor !== s && (a?._$AO?.(!1), s === void 0 ? a = void 0 : (a = new s(t), a._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = a : i._$Cl = a), a !== void 0 && (e = ne(t, a._$AS(t, e.values), a, r)), e;
}
class os {
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
    const { el: { content: i }, parts: r } = this._$AD, a = (e?.creationScope ?? Ot).importNode(i, !0);
    Pt.currentNode = a;
    let s = Pt.nextNode(), n = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let d;
        l.type === 2 ? d = new je(s, s.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (d = new hs(s, this, e)), this._$AV.push(d), l = r[++c];
      }
      n !== l?.index && (s = Pt.nextNode(), n++);
    }
    return Pt.currentNode = Ot, a;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class je {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, a) {
    this.type = 2, this._$AH = F, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = a, this._$Cv = a?.isConnected ?? !0;
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
    e = ne(this, e, i), Te(e) ? e === F || e == null || e === "" ? (this._$AH !== F && this._$AR(), this._$AH = F) : e !== this._$AH && e !== se && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : as(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== F && Te(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ot.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, a = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = ze.createElement(ma(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === a) this._$AH.p(i);
    else {
      const s = new os(a, this), n = s.u(this.options);
      s.p(i), this.T(n), this._$AH = s;
    }
  }
  _$AC(e) {
    let i = Fr.get(e.strings);
    return i === void 0 && Fr.set(e.strings, i = new ze(e)), i;
  }
  k(e) {
    dr(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, a = 0;
    for (const s of e) a === i.length ? i.push(r = new je(this.O(De()), this.O(De()), this, this.options)) : r = i[a], r._$AI(s), a++;
    a < i.length && (this._$AR(r && r._$AB.nextSibling, a), i.length = a);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = Lr(e).nextSibling;
      Lr(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class Ti {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, a, s) {
    this.type = 1, this._$AH = F, this._$AN = void 0, this.element = e, this.name = i, this._$AM = a, this.options = s, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = F;
  }
  _$AI(e, i = this, r, a) {
    const s = this.strings;
    let n = !1;
    if (s === void 0) e = ne(this, e, i, 0), n = !Te(e) || e !== this._$AH && e !== se, n && (this._$AH = e);
    else {
      const c = e;
      let l, d;
      for (e = s[0], l = 0; l < s.length - 1; l++) d = ne(this, c[r + l], i, l), d === se && (d = this._$AH[l]), n ||= !Te(d) || d !== this._$AH[l], d === F ? e = F : e !== F && (e += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    n && !a && this.j(e);
  }
  j(e) {
    e === F ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class cs extends Ti {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === F ? void 0 : e;
  }
}
class ls extends Ti {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== F);
  }
}
class ds extends Ti {
  constructor(e, i, r, a, s) {
    super(e, i, r, a, s), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = ne(this, e, i, 0) ?? F) === se) return;
    const r = this._$AH, a = e === F && r !== F || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, s = e !== F && (r === F || a);
    a && this.element.removeEventListener(this.name, this, r), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class hs {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ne(this, e);
  }
}
const ps = lr.litHtmlPolyfillSupport;
ps?.(ze, je), (lr.litHtmlVersions ??= []).push("3.3.3");
const us = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let a = r._$litPart$;
  if (a === void 0) {
    const s = i?.renderBefore ?? null;
    r._$litPart$ = a = new je(e.insertBefore(De(), s), s, void 0, i ?? {});
  }
  return a._$AI(t), a;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hr = globalThis;
class $t extends Zt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = us(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return se;
  }
}
$t._$litElement$ = !0, $t.finalized = !0, hr.litElementHydrateSupport?.({ LitElement: $t });
const ms = hr.litElementPolyfillSupport;
ms?.({ LitElement: $t });
(hr.litElementVersions ??= []).push("4.2.2");
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
const gs = { attribute: !0, type: String, converter: ci, reflect: !1, hasChanged: cr }, fs = (t = gs, e, i) => {
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
function qt(t) {
  return (e, i) => typeof i == "object" ? fs(t, e, i) : ((r, a, s) => {
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
  return qt({ ...t, state: !0, attribute: !1 });
}
var bs = Object.defineProperty, vs = Object.getOwnPropertyDescriptor, Be = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? vs(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && bs(e, i, a), a;
};
let It = class extends $t {
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
          ${this.cardType ? o`<span class="type-badge">${L(this.cardType)}</span>` : ""}
        </div>
        <textarea
          .value=${t}
          @change=${this._onChange}
          spellcheck="false"
          aria-label="Card Configuration JSON"
        ></textarea>
        ${this._error ? o`<div class="error">⚠️ ${L(this._error)}</div>` : ""}
      </div>
    `;
  }
};
It.styles = y`
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
Be([
  qt({ attribute: !1 })
], It.prototype, "hass", 2);
Be([
  qt({ type: String })
], It.prototype, "cardType", 2);
Be([
  x()
], It.prototype, "_config", 2);
Be([
  x()
], It.prototype, "_error", 2);
It = Be([
  k("ha-component-library-config-editor")
], It);
const _s = (t, e) => {
  e.getStubConfig || (e.getStubConfig = () => ({
    ...e.stubConfig || {}
  })), e.getConfigElement || (e.getConfigElement = () => {
    const i = document.createElement(
      "ha-component-library-config-editor"
    );
    return i.cardType = t, i;
  });
}, A = (t) => {
  const { type: e, element: i, name: r, description: a, preview: s = !0 } = t;
  _s(e, i), customElements.get(e) || customElements.define(e, i), typeof window < "u" && (window.customCards = window.customCards || [], window.customCards.some((n) => n.type === e) || window.customCards.push({
    type: e,
    name: r,
    description: a,
    preview: s
  }));
}, Gt = Object.freeze({
  holdDelay: 500,
  moveTolerance: 10,
  errorDuration: 1800,
  repeatDelay: 350,
  repeatInterval: 110,
  repeatMinimumInterval: 55
}), zl = () => typeof window < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0, ys = `
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
`, xs = (t) => {
  if (!t) return null;
  if (t === !0) return {};
  if (typeof t != "object")
    throw new TypeError(
      "interaction repeat must be false, true, or an options object"
    );
  return t;
}, ws = (t, e) => {
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
}, $s = (t) => {
  const e = t.getRootNode?.();
  if (!e || e.__haInteractionFeedbackV2) return null;
  e.__haInteractionFeedbackV2 = !0;
  const i = document.createElement("style");
  i.setAttribute("data-ha-interaction-styles", "v2"), i.textContent = ys;
  const r = document.createElement("span");
  r.setAttribute("data-ha-interaction-status", "v2"), r.setAttribute("role", "status"), r.setAttribute("aria-live", "polite"), r.setAttribute("aria-atomic", "true");
  const a = e.nodeType === 9 || e.body ? e.body || e.head || e.documentElement : e;
  return a && typeof a.append == "function" && a.append(i, r), r;
}, Vr = [
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
  const i = $s(t), r = typeof e.primary == "function" ? e.primary : null, a = typeof e.hold == "function" ? e.hold : null, s = xs(e.repeat);
  if (a && s)
    throw new TypeError("interaction hold and repeat are mutually exclusive");
  if (!r && (a || s))
    throw new TypeError("interaction hold/repeat requires a primary action");
  const n = e.feedback !== !1, c = e.singleFlight === !0, l = Math.max(
    250,
    Number(e.holdDelay) || Gt.holdDelay
  ), d = Math.max(
    4,
    Number(e.moveTolerance) || Gt.moveTolerance
  ), f = ws(e.optimistic, t), g = e.signal, h = typeof e.onPressChange == "function" ? e.onPressChange : null;
  let u = null, p = null, v = null, m = null, b = 0, $ = !1, _ = null, D = !1, H = 0, M = null, q = !1, w = !1;
  const O = (C) => {
    const et = C?.composedPath?.();
    if (Array.isArray(et) && et.length)
      for (const lt of et) {
        if (lt === t) return !1;
        if (lt?.matches?.(Vr))
          return !0;
      }
    const rt = C?.target;
    if (!rt || rt === t) return !1;
    const at = rt.closest?.(Vr);
    return !!(at && at !== t && t.contains?.(at));
  }, j = () => q || c && H > 0 || t.disabled === !0 || t.getAttribute?.("aria-disabled") === "true", N = () => {
    _ && clearTimeout(_), _ = null, $ = !1;
  }, Y = () => {
    $ = !0, _ && clearTimeout(_), _ = setTimeout(N, 0);
  }, Q = (C) => {
    w !== C && (w = C, n && t.toggleAttribute?.("data-interaction-pressed", C), q || h?.(C, t));
  }, Vt = (C) => {
    H = Math.max(0, H + C), !(!n || q) && (t.toggleAttribute?.("data-interaction-pending", H > 0), t.setAttribute?.("aria-busy", String(H > 0)));
  }, Wt = () => {
    if (!n || q) return;
    M && clearTimeout(M), t.setAttribute?.("data-interaction-error", "true");
    const C = i || t.getRootNode?.()?.querySelector?.(
      "[data-ha-interaction-status]"
    );
    C && (C.textContent = e.errorMessage || "Action failed. Try again."), M = setTimeout(
      () => {
        M = null, q || t.removeAttribute?.("data-interaction-error");
      },
      Math.max(
        250,
        Number(e.errorDuration) || Gt.errorDuration
      )
    );
  }, Ze = (C) => {
    q || t.dispatchEvent?.(
      new CustomEvent("ha-interaction-error", {
        bubbles: !0,
        composed: !0,
        detail: { error: C }
      })
    );
  }, gt = (C, et) => {
    if (j()) return Promise.resolve(void 0);
    const rt = C === "hold" ? a : r;
    if (!rt) return Promise.resolve(void 0);
    let at;
    C === "primary" && f && (at = f.capture(t, et), f.apply(t, et, at));
    let lt;
    try {
      lt = rt(et);
    } catch (Tt) {
      return !q && C === "primary" && f?.rollback && f.rollback(at, Tt, t, et), Wt(), Ze(Tt), Promise.reject(Tt);
    }
    return !lt || typeof lt.then != "function" ? Promise.resolve(lt) : (Vt(1), Promise.resolve(lt).catch((Tt) => {
      throw !q && C === "primary" && f?.rollback && f.rollback(at, Tt, t, et), Wt(), Ze(Tt), Tt;
    }).finally(() => {
      q || Vt(-1);
    }));
  }, I = () => {
    p && clearTimeout(p), p = null, v && clearTimeout(v), v = null, m && clearInterval(m), m = null;
  }, tt = () => {
    I(), u = null, Q(!1);
  }, yt = (C) => {
    if (!s || j()) return;
    const et = Math.max(
      150,
      Number(s.delay) || Gt.repeatDelay
    ), rt = Math.max(
      40,
      Number(s.interval) || Gt.repeatInterval
    );
    b = 0, v = setTimeout(() => {
      if (v = null, q || !u) return;
      D = !0, Y();
      const at = () => {
        if (q || !u) {
          m && clearInterval(m), m = null;
          return;
        }
        if (b += 1, gt("primary", C).catch(() => {
        }), q || !u || !s.accelerate) return;
        const lt = Math.max(
          Number(s.minimumInterval) || Gt.repeatMinimumInterval,
          Math.round(rt * Math.pow(0.93, b))
        );
        m && clearInterval(m), m = setInterval(at, lt);
      };
      gt("primary", C).catch(() => {
      }), !q && u && (m = setInterval(at, rt));
    }, et);
  }, Dt = (C) => {
    if (!(!r || j() || C.button > 0 || O(C))) {
      u = { id: C.pointerId, x: C.clientX, y: C.clientY }, D = !1, N();
      try {
        t.setPointerCapture?.(C.pointerId);
      } catch {
      }
      Q(!0), a ? p = setTimeout(() => {
        p = null, u && (D = !0, Y(), Q(!1), gt("hold", C).catch(() => {
        }));
      }, l) : s && yt(C);
    }
  }, we = (C) => {
    !u || C.pointerId !== u.id || Math.hypot(C.clientX - u.x, C.clientY - u.y) <= d || (D = !0, Y(), tt());
  }, Tr = (C) => {
    if (!u || C.pointerId !== u.id) return;
    if (O(C)) {
      D = !0, Y(), tt();
      return;
    }
    const et = D, rt = s && (v === null || m !== null);
    I(), u = null, D = !1, Q(!1), Y(), !et && !rt && gt("primary", C).catch(() => {
    });
  }, Je = () => {
    D = !1, Y(), tt();
  }, zr = (C) => {
    if (!O(C)) {
      if ($) {
        C.preventDefault(), C.stopImmediatePropagation?.(), N();
        return;
      }
      !r || j() || gt("primary", C).catch(() => {
      });
    }
  }, Pr = (C) => {
    !r || j() || C.repeat || O(C) || C.key !== "Enter" && C.key !== " " || (C.preventDefault(), Q(!0));
  }, Or = (C) => {
    !r || j() || O(C) || C.key !== "Enter" && C.key !== " " || (C.preventDefault(), Q(!1), Y(), gt("primary", C).catch(() => {
    }));
  };
  t.addEventListener("pointerdown", Dt, {
    passive: !0
  }), t.addEventListener("pointermove", we, {
    passive: !0
  }), t.addEventListener("pointerup", Tr, {
    passive: !0
  }), t.addEventListener("pointercancel", Je, {
    passive: !0
  }), t.addEventListener(
    "lostpointercapture",
    Je,
    { passive: !0 }
  ), t.addEventListener("click", zr, !0), t.addEventListener("keydown", Pr), t.addEventListener("keyup", Or);
  const ji = () => {
    q || (q = !0, I(), M && clearTimeout(M), _ && clearTimeout(_), M = null, _ = null, g?.removeEventListener?.("abort", ji), w = !1, H = 0, n && (t.removeAttribute?.("data-interaction-pressed"), t.removeAttribute?.("data-interaction-pending"), t.removeAttribute?.("data-interaction-error"), t.setAttribute?.("aria-busy", "false")), t.removeEventListener("pointerdown", Dt), t.removeEventListener("pointermove", we), t.removeEventListener("pointerup", Tr), t.removeEventListener(
      "pointercancel",
      Je
    ), t.removeEventListener(
      "lostpointercapture",
      Je
    ), t.removeEventListener("click", zr, !0), t.removeEventListener("keydown", Pr), t.removeEventListener("keyup", Or));
  };
  return g?.addEventListener?.("abort", ji, { once: !0 }), Object.freeze({
    element: t,
    destroy: ji,
    get destroyed() {
      return q;
    },
    invoke: (C) => gt("primary", C)
  });
}, pr = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createRequestCoalescer requires a request function");
  let i = !1, r = !1, a, s = !1, n = 0;
  const c = async () => {
    if (!(i || s || !r)) {
      for (i = !0; !s && r; ) {
        r = !1;
        const l = a, d = ++n;
        try {
          await t(l, d), s || e.onSuccess?.(l, d);
        } catch (f) {
          s || e.onError?.(f, l, d), e.stopOnError && (r = !1);
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
}, Pe = (t, e, i, r = {}) => {
  if (!e || typeof i != "function")
    return Promise.reject(
      new TypeError("waitForEntityState requires an entity and predicate")
    );
  const a = typeof t == "function" ? t : () => t, s = Math.max(250, Number(r.timeout) || 9e3), n = Math.max(40, Number(r.interval) || 160), c = r.signal;
  return new Promise((l, d) => {
    let f = null, g = null, h = !1;
    const u = () => {
      f && clearInterval(f), g && clearTimeout(g), c?.removeEventListener?.("abort", v);
    }, p = (b, $) => {
      h || (h = !0, u(), b($));
    }, v = () => p(d, c?.reason || new Error("State confirmation aborted")), m = () => {
      const b = a()?.states?.[e] ?? null;
      try {
        i(b?.state, b) && p(l, b);
      } catch ($) {
        p(d, $);
      }
    };
    if (c?.aborted) return v();
    c?.addEventListener?.("abort", v, { once: !0 }), f = setInterval(m, n), g = setTimeout(
      () => p(d, new Error("State confirmation timed out")),
      s
    ), m();
  });
}, ga = (t, e = {}) => {
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
    const h = c(g), u = h.updatedAt ? Date.now() - h.updatedAt : 1 / 0;
    return Object.freeze({
      value: h.value,
      error: h.error,
      loading: !!h.promise,
      stale: h.value !== void 0 && (h.invalidated || u > r),
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
    const p = c(g), v = Date.now();
    if (p.promise) return p.promise;
    if (!u && v < p.nextRetryAt)
      return p.value !== void 0 ? Promise.resolve(p.value) : Promise.reject(p.error);
    const m = ++p.sequence, b = p.generation;
    return p.promise = Promise.resolve().then(() => t(g, h, m)).then(($) => m !== p.sequence ? p.value : (p.value = $, p.error = null, p.updatedAt = Date.now(), p.failures = 0, p.nextRetryAt = 0, p.invalidated = p.generation !== b, $)).catch(($) => {
      if (m !== p.sequence || (p.error = $ instanceof Error ? $ : new Error(String($)), p.failures += 1, p.nextRetryAt = Date.now() + Math.min(n, s * Math.pow(2, p.failures - 1)), p.value !== void 0 && Date.now() - p.updatedAt <= a))
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
      const p = l(g), v = p.updatedAt ? Date.now() - p.updatedAt : 1 / 0, m = c(g);
      if (!u.force && !m.invalidated && p.value !== void 0 && v <= r)
        return p.value;
      if (!u.force && p.value !== void 0 && v <= a)
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
}, Cs = (t) => {
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
    listen: (c, l, d, f = {}) => {
      const g = r();
      return c?.addEventListener?.(l, d, { ...f, signal: g }), d;
    }
  });
}, fa = (t, e) => {
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
}, ks = "dashboard-style-tokens", ba = `
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
}, ur = y`
  ${ye(ba)}
`, z = [
  ur,
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
      box-shadow:
        0 0 0 1px var(--action-glow-color),
        0 0 12px 2.5px
          color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
      box-shadow:
        0 0 0 1px var(--action-glow-color),
        0 0 16px 3px
          color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
], K = y`
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
`, W = y`
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
    box-shadow:
      0 0 0 1px var(--action-glow-color),
      0 0 12px 2.5px
        color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
    box-shadow:
      0 0 0 1px var(--action-glow-color),
      0 0 12px 2.5px
        color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
    box-shadow:
      0 0 0 1px var(--action-glow-color),
      0 0 12px 2.5px
        color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
    box-shadow:
      0 0 0 1px var(--action-glow-color),
      0 0 12px 2.5px
        color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
    box-shadow:
      0 0 0 1px var(--action-glow-color),
      0 0 12px 2.5px
        color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
    box-shadow:
      0 0 0 1px var(--action-glow-color),
      0 0 12px 2.5px
        color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.97);
  }
  .option-select-btn.selected {
    color: var(--primary-color);
    border-color: var(--primary-color);
    background: var(--dashboard-active-surface);
  }
`, Ut = y`
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
    box-shadow:
      0 0 0 1px var(--action-glow-color),
      0 0 12px 2.5px
        color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
`, U = y`
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
`, va = y`
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
`, Fe = y`
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
    transition:
      margin 0.12s,
      background 0.12s;
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
    box-shadow:
      0 0 0 1px var(--action-glow-color),
      0 0 12px 2.5px
        color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
    transition:
      transform 0.12s ease,
      background-color 0.12s ease;
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
`, Ve = y`
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
`, ut = y`
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
`, mr = y`
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
    border: 1px dashed
      var(--catalogue-border, var(--dashboard-card-border-color));
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
`, ct = y`
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
`, gr = y`
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
`, Ss = y`
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
    box-shadow:
      0 0 0 1px var(--action-glow-color),
      0 0 12px 2.5px
        color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
    transform: scale(0.95);
  }
  .dpad-btn.select-center {
    background: var(--dashboard-active-surface);
    color: var(--primary-color);
    --action-glow-color: var(--primary-color, #03a9f4);
  }
`, At = y`
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
    box-shadow:
      0 0 0 1px var(--action-glow-color),
      0 0 12px 2.5px
        color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
`, mt = y`
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
`, Il = y`
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
`, Rl = y`
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
`, Hl = ks, zi = ba, Nl = () => {
}, Ll = y`
  ${ye(zi)}
`, As = `${zi}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);color:var(--primary-text-color);box-shadow:none}*{box-sizing:border-box}button{font:inherit;color:inherit}button.demo{appearance:none;width:100%;border:0;background:transparent;text-align:inherit;padding:0;cursor:pointer}button.demo:active{transform:scale(.992)}button.demo:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px;border-radius:var(--dashboard-radius-card)}`, Es = `${zi}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);box-shadow:none;color:var(--primary-text-color);box-sizing:border-box}.wrap{box-sizing:border-box;padding:8px 11px}.title{font-size:13px;line-height:1.25;font-weight:600;color:var(--primary-text-color)}.desc{margin-top:2px;font-size:12px;line-height:1.25;color:var(--secondary-text-color)}ha-icon{--mdc-icon-size:20px}button{font:inherit;color:inherit}button.i{appearance:none;border:0;background:transparent;cursor:pointer}button.i:active{background:var(--dashboard-card-muted-surface)}button.i:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px;border-radius:var(--dashboard-radius-control)}@media(max-width:700px){.wrap{padding:8px 10px}}`, Ds = `${zi}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}`, Ts = y`
  ${ye(As)}
`, Ml = y`
  ${ye(Es)}
`, ql = y`
  ${ye(Ds)}
`, Ul = Ts, _a = y`
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
class it extends Error {
  constructor(e, i) {
    super(i), this.name = "HomeAssistantActionError", this.code = e;
  }
}
function ht(t) {
  return t && t.split(".")[0] || "";
}
const R = ht, zs = /^[a-z_][a-z0-9_]*\.[a-zA-Z0-9_]+$/, fr = (t) => t?.entity_id ? Array.isArray(t.entity_id) ? t.entity_id : [t.entity_id] : [], Ps = (t) => !!(t && (fr(t).length > 0 || (Array.isArray(t.device_id) ? t.device_id.length > 0 : t.device_id) || (Array.isArray(t.area_id) ? t.area_id.length > 0 : t.area_id))), Fi = (t, e) => {
  if (t === void 0) return;
  const i = Array.isArray(t) ? t : [t];
  if (i.length === 0 || i.some((r) => typeof r != "string" || !r.trim()))
    throw new it(
      "INVALID_TARGET",
      `Service target ${e} must be a non-empty string or array of strings.`
    );
}, ya = (t, e) => {
  if (!e) return;
  if (!Ps(e))
    throw new it(
      "INVALID_TARGET",
      "Service target must contain an entity_id, device_id, or area_id."
    );
  Fi(e.entity_id, "entity_id"), Fi(e.device_id, "device_id"), Fi(e.area_id, "area_id");
  const i = fr(e);
  for (const r of i) {
    if (!zs.test(r))
      throw new it(
        "INVALID_TARGET",
        `Invalid Home Assistant entity target: ${r}.`
      );
    const a = t.states[r];
    if (!a)
      throw new it(
        "MISSING_TARGET_ENTITY",
        `Home Assistant entity target does not exist: ${r}.`
      );
    if (!bt(a))
      throw new it(
        "UNAVAILABLE_TARGET_ENTITY",
        `Home Assistant entity target is unavailable: ${r}.`
      );
  }
  return e;
}, xa = (t) => {
  const [e, i, r] = t?.split(".") ?? [];
  if (!e || !i || r !== void 0 || !/^[a-z_][a-z0-9_]*$/.test(e) || !/^[a-z_][a-z0-9_]*$/.test(i))
    throw new it(
      "INVALID_SERVICE",
      `Invalid Home Assistant service: ${t || "(missing)"}.`
    );
  return { domain: e, service: i };
}, Os = (t) => {
  if (!t) return {};
  const { entity_id: e, ...i } = t;
  return {
    data: Object.keys(i).length > 0 ? i : void 0,
    target: typeof e == "string" || Array.isArray(e) && e.every((r) => typeof r == "string") ? { entity_id: e } : e === void 0 ? void 0 : (() => {
      throw new it(
        "INVALID_TARGET",
        "service data entity_id must be a string or array of strings."
      );
    })()
  };
}, S = async (t, e) => {
  const { domain: i, service: r } = xa(
    `${e.domain}.${e.service}`
  ), a = Os(e.data), s = ya(t, e.target ?? a.target);
  await t.callService(i, r, a.data, s);
};
function Et(t) {
  let e = t.entry?.name || t.entry?.original_name || t.state?.attributes?.friendly_name || t.fallback || t.entry?.entity_id || t.state?.entity_id || "Control";
  if (t.stripSuffixes && t.stripSuffixes.length > 0)
    for (const i of t.stripSuffixes)
      e = e.replace(i, "").trim();
  return e;
}
function Pi(t, e) {
  return t ? t.attributes?.friendly_name || e || t.entity_id : e || "";
}
function bt(t) {
  if (!t) return !1;
  const e = typeof t == "string" ? t : t.state;
  if (!e) return !1;
  const i = e.toLowerCase().trim();
  return i !== "unavailable" && i !== "unknown" && i !== "";
}
function Z(t) {
  return !bt(t);
}
function X(t, e) {
  if (!t) return "Unavailable";
  if (e?.formatEntityState)
    return e.formatEntityState(t);
  const i = t.state, r = t.attributes?.unit_of_measurement;
  return i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : i === "on" ? "On" : i === "off" ? "Off" : r ? `${i} ${r}` : i.charAt(0).toUpperCase() + i.slice(1);
}
function oe(t) {
  if (!t) return !1;
  const e = t.state;
  if (e === "unavailable" || e === "unknown" || e === "off")
    return !1;
  switch (ht(t.entity_id)) {
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
function xe(t, e) {
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
async function Oi(t, e, i, r) {
  if (!e)
    throw new it(
      "INVALID_ACTION",
      "Home Assistant is required to run an action."
    );
  const a = i?.action || "toggle";
  if (a === "none") return;
  if (i?.haptic && vt(t, "haptic", i.haptic), i?.confirmation) {
    const l = i.confirmation.text || "Are you sure you want to proceed?";
    if (!window.confirm(l))
      return;
  }
  const n = fr(i?.target)[0] || r, c = i?.target || (n ? { entity_id: n } : void 0);
  switch (a) {
    case "toggle": {
      if (!n)
        throw new it(
          "MISSING_TARGET_ENTITY",
          "Toggle actions require an entity target."
        );
      const l = ht(n), d = e.states[n];
      if (!d)
        throw new it(
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
        throw new it(
          "MISSING_TARGET_ENTITY",
          "More-info actions require an entity target."
        );
      ya(e, { entity_id: n }), vt(t, "hass-more-info", { entityId: n });
      break;
    }
    case "call-service":
    case "perform-action": {
      const l = a === "perform-action" ? i?.perform_action : i?.service, d = xa(l);
      await S(e, {
        ...d,
        data: a === "perform-action" ? i?.data : i?.service_data,
        target: c
      });
      break;
    }
    case "navigate": {
      i?.navigation_path && (window.history.pushState(null, "", i.navigation_path), vt(window, "location-changed", { replace: !1 }));
      break;
    }
    case "url": {
      i?.url_path && window.open(i.url_path, "_blank");
      break;
    }
    case "assist": {
      vt(t, "start-voice-assist");
      break;
    }
    default:
      throw new it(
        "INVALID_ACTION",
        `Unsupported Home Assistant action: ${String(a)}.`
      );
  }
}
var Is = Object.defineProperty, br = (t, e, i, r) => {
  for (var a = void 0, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(e, i, a) || a);
  return a && Is(e, i, a), a;
};
class E extends $t {
  constructor() {
    super(...arguments), this._cardError = null, this._lifecycle = Cs(this);
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
    return L(e);
  }
  toText(e) {
    return oa(e);
  }
  moreInfo(e) {
    Ga(this, e);
  }
  navigate(e) {
    ca(e);
  }
  fire(e, i) {
    return vt(this, e, i);
  }
  formatNum(e, i) {
    return ae(this.hass, e, i);
  }
  fmtPower(e, i) {
    return ft(this.hass, e, i);
  }
  fmtEnergy(e) {
    return wt(this.hass, e);
  }
  fmtDate(e, i) {
    return Ai(this.hass, e, i);
  }
  fmtTime(e, i) {
    return oi(this.hass, e, i);
  }
  fmtCalendarDay(e, i) {
    return Ei(this.hass, e, i);
  }
  renderError(e) {
    return o`
      <ha-card class="error-card">
        <div
          style="padding: 16px; color: var(--error-color, #db4437); font-size: 13px; font-weight: 500;"
        >
          ⚠️ ${L(e)}
        </div>
      </ha-card>
    `;
  }
}
br([
  qt({ attribute: !1 })
], E.prototype, "hass");
br([
  x()
], E.prototype, "_config");
br([
  x()
], E.prototype, "_cardError");
class Ii extends E {
  validateConfig(e) {
  }
  setConfig(e) {
    super.setConfig(e), this.validateConfig(e);
  }
  fireConfigChanged() {
    this.fire("config-changed", { config: this._config });
  }
}
const jl = y`
  .primitive-entity-row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    min-height: var(--c-row-min-height, 44px);
    padding: var(--c-space-2, 6px) var(--c-space-3, 8px);
    border-radius: var(--dashboard-radius-control, 6px);
    width: 100%;
    box-sizing: border-box;
    color: var(--primary-text-color);
    text-align: left;
    background: transparent;
    border: 0;
    font: inherit;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease;
  }
  .primitive-entity-row.interactive {
    cursor: pointer;
  }
  .primitive-entity-row.interactive:hover:not(.disabled):not(:disabled) {
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
  }
  .primitive-entity-row.interactive:active:not(.disabled):not(:disabled) {
    transform: scale(0.985);
  }
  .primitive-entity-row.active {
    background: var(--dashboard-active-surface, rgba(3, 169, 244, 0.07));
  }
  .primitive-entity-row.disabled,
  .primitive-entity-row.unavailable {
    opacity: 0.55;
    cursor: not-allowed;
  }
  .primitive-row-leading {
    display: grid;
    place-items: center;
    width: var(--c-icon-box-size, 28px);
    height: var(--c-icon-box-size, 28px);
    flex-shrink: 0;
  }
  .primitive-row-icon-well {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: var(--dashboard-radius-icon, 0px);
    color: var(--primary-color, #03a9f4);
  }
  .primitive-row-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .primitive-row-title {
    font-size: var(--c-font-md, 12px);
    font-weight: var(--c-font-weight-medium, 500);
    line-height: var(--c-line-height-normal, 1.2);
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .primitive-row-subtitle {
    font-size: var(--c-font-sm, 10.5px);
    font-weight: var(--c-font-weight-normal, 400);
    line-height: var(--c-line-height-normal, 1.2);
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .primitive-row-trailing {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .primitive-row-state-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    text-align: right;
  }
  .primitive-row-state-val {
    font-size: var(--c-font-md, 12px);
    font-weight: var(--c-font-weight-medium, 500);
    font-variant-numeric: tabular-nums;
    color: var(--primary-text-color);
  }
  .primitive-row-state-lbl {
    font-size: var(--c-font-xs, 10px);
    color: var(--secondary-text-color);
  }
  .primitive-row-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 7px;
    border-radius: var(--c-radius-pill, 999px);
    font-size: var(--c-font-xs, 10px);
    font-weight: var(--c-font-weight-semibold, 600);
    text-transform: uppercase;
    letter-spacing: 0.03em;
    border: 1px solid
      var(--dashboard-card-border-color, rgba(255, 255, 255, 0.1));
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
    color: var(--secondary-text-color);
  }
  .primitive-row-badge.info {
    color: var(--info-color, #03a9f4);
    background: color-mix(in srgb, var(--info-color, #03a9f4) 12%, transparent);
    border-color: color-mix(
      in srgb,
      var(--info-color, #03a9f4) 30%,
      transparent
    );
  }
  .primitive-row-badge.warning {
    color: var(--warning-color, #f9a825);
    background: var(
      --dashboard-warning-surface,
      color-mix(in srgb, var(--warning-color, #f9a825) 12%, transparent)
    );
    border-color: color-mix(
      in srgb,
      var(--warning-color, #f9a825) 30%,
      transparent
    );
  }
  .primitive-row-badge.critical {
    color: var(--error-color, #e53935);
    background: var(
      --dashboard-critical-surface,
      color-mix(in srgb, var(--error-color, #e53935) 12%, transparent)
    );
    border-color: color-mix(
      in srgb,
      var(--error-color, #e53935) 30%,
      transparent
    );
  }
  .primitive-row-badge.success {
    color: var(--success-color, #4caf50);
    background: color-mix(
      in srgb,
      var(--success-color, #4caf50) 12%,
      transparent
    );
    border-color: color-mix(
      in srgb,
      var(--success-color, #4caf50) 30%,
      transparent
    );
  }
  .primitive-row-toggle {
    width: var(--c-switch-width, 38px);
    height: var(--c-switch-height, 22px);
    border-radius: var(--dashboard-radius-control, 6px);
    background: var(--divider-color, rgba(255, 255, 255, 0.12));
    padding: 3px;
    cursor: pointer;
    border: 0;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    transition: background-color 0.15s ease;
  }
  .primitive-row-toggle.on {
    background: color-mix(
      in srgb,
      var(--primary-color, #03a9f4) 40%,
      var(--divider-color, rgba(255, 255, 255, 0.12))
    );
  }
  .primitive-row-toggle-knob {
    display: block;
    width: var(--c-switch-knob-size, 16px);
    height: var(--c-switch-knob-size, 16px);
    border-radius: 50%;
    background: var(--secondary-text-color);
    transition:
      transform 0.15s ease,
      background-color 0.15s ease;
  }
  .primitive-row-toggle.on .primitive-row-toggle-knob {
    transform: translateX(16px);
    background: var(--primary-color, #03a9f4);
  }
  .primitive-row-action-btn {
    min-height: var(--c-button-sm-height, 26px);
    padding: 0 10px;
    border-radius: var(--dashboard-radius-control, 6px);
    border: var(--dashboard-card-border, 1px solid rgba(255, 255, 255, 0.1));
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
    color: var(--primary-text-color);
    font-size: var(--c-font-sm, 10.5px);
    font-weight: var(--c-font-weight-medium, 500);
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
  .primitive-row-chevron {
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
  }
`;
function Rs(t) {
  return typeof t == "string" ? o`<span class="primitive-row-trailing-text"
      >${L(t)}</span
    >` : "strings" in t ? t : t.type === "toggle" ? o`
      <button
        class="primitive-row-toggle ${t.checked ? "on" : ""}"
        type="button"
        role="switch"
        aria-checked="${t.checked ? "true" : "false"}"
        aria-label="${L(t.ariaLabel || "Toggle")}"
        ?disabled=${t.disabled}
        @click=${(e) => {
    e.stopPropagation(), t.onToggle?.(!t.checked, e);
  }}
      >
        <span class="primitive-row-toggle-knob"></span>
      </button>
    ` : t.type === "action" ? o`
      <button
        class="primitive-row-action-btn"
        type="button"
        aria-label="${L(t.ariaLabel || t.label)}"
        ?disabled=${t.disabled}
        @click=${(e) => {
    e.stopPropagation(), t.onClick?.(e);
  }}
      >
        ${t.icon ? o`<ha-icon icon="${L(t.icon)}"></ha-icon>` : ""}
        <span>${L(t.label)}</span>
      </button>
    ` : t.type === "chevron" ? o`
      <span class="primitive-row-chevron">
        <ha-icon icon="mdi:chevron-right"></ha-icon>
      </span>
    ` : t.type === "custom" ? typeof t.template == "string" ? o`${t.template}` : t.template : o``;
}
function Bl(t) {
  const e = !!(t.interactive ?? t.onClick), i = !!t.unavailable, r = !!(t.disabled || i), a = typeof t.badge == "string" ? { text: t.badge, severity: "neutral" } : t.badge || null, s = [
    "primitive-entity-row",
    e ? "interactive" : "",
    t.active ? "active" : "",
    r ? "disabled" : "",
    i ? "unavailable" : "",
    t.className || ""
  ].filter(Boolean).join(" "), n = `${t.title}${t.subtitle ? `: ${t.subtitle}` : ""}${t.state ? `. ${t.state}` : ""}`, c = t.ariaLabel || n, l = o`
    ${t.icon ? o`
            <div class="primitive-row-leading">
              <div
                class="primitive-row-icon-well"
                style="${t.iconColor ? `color: ${t.iconColor};` : ""}"
              >
                <ha-icon icon="${L(t.icon)}"></ha-icon>
              </div>
            </div>
          ` : ""}
    <div class="primitive-row-copy">
      <div class="primitive-row-title">${L(t.title)}</div>
      ${t.subtitle ? o`<div class="primitive-row-subtitle">
              ${L(t.subtitle)}
            </div>` : ""}
    </div>
    <div class="primitive-row-trailing">
      ${t.state || t.stateLabel ? o`
              <div class="primitive-row-state-block">
                ${t.state ? o`<span class="primitive-row-state-val"
                        >${L(t.state)}</span
                      >` : ""}
                ${t.stateLabel ? o`<span class="primitive-row-state-lbl"
                        >${L(t.stateLabel)}</span
                      >` : ""}
              </div>
            ` : ""}
      ${a ? o`
              <span
                class="primitive-row-badge ${a.severity || "neutral"}"
              >
                ${L(a.text)}
              </span>
            ` : ""}
      ${t.trailing ? Rs(t.trailing) : ""}
    </div>
  `;
  return e ? o`
      <button
        class="${s}"
        type="button"
        aria-label="${L(c)}"
        ?disabled=${r}
        @click=${(d) => {
    r || t.onClick?.(d);
  }}
      >
        ${l}
      </button>
    ` : o`
    <div class="${s}" aria-label="${L(c)}">
      ${l}
    </div>
  `;
}
function Hs(t, e) {
  if (!e || !Number.isFinite(t)) return "normal";
  if (!!e.invert) {
    if (e.critical !== void 0 && t <= e.critical)
      return "critical";
    if (e.warning !== void 0 && t <= e.warning)
      return "warning";
    if (e.info !== void 0 && t <= e.info)
      return "info";
  } else {
    if (e.critical !== void 0 && t >= e.critical)
      return "critical";
    if (e.warning !== void 0 && t >= e.warning)
      return "warning";
    if (e.info !== void 0 && t >= e.info)
      return "info";
  }
  return "normal";
}
const Fl = y`
  .primitive-metric {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
    box-sizing: border-box;
    font: inherit;
    background: transparent;
    border: 0;
    padding: 0;
    color: var(--primary-text-color);
  }
  .primitive-metric.interactive {
    cursor: pointer;
    border-radius: var(--dashboard-radius-control, 6px);
    padding: 4px 6px;
    margin: -4px -6px;
    transition:
      background-color 0.2s ease,
      transform 0.15s ease;
  }
  .primitive-metric.interactive:hover {
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
  }
  .primitive-metric.interactive:active {
    transform: scale(0.98);
  }
  .primitive-metric-main {
    display: inline-flex;
    align-items: baseline;
    gap: 4px;
  }
  .primitive-metric-icon {
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
    color: var(--secondary-text-color);
  }
  .primitive-metric-value {
    font-weight: var(--c-font-weight-semibold, 550);
    font-variant-numeric: tabular-nums;
    line-height: var(--c-line-height-tight, 1.1);
    letter-spacing: -0.02em;
    color: var(--primary-text-color);
  }
  .primitive-metric-value.size-sm {
    font-size: var(--c-font-xl, 15px);
  }
  .primitive-metric-value.size-md {
    font-size: 16px;
  }
  .primitive-metric-value.size-lg {
    font-size: var(--c-font-display, 20px);
  }
  .primitive-metric-unit {
    font-size: var(--c-font-sm, 10.5px);
    font-weight: var(--c-font-weight-normal, 400);
    color: var(--secondary-text-color);
    margin-left: 2px;
  }
  .primitive-metric-trend {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    margin-left: 3px;
  }
  .primitive-metric-trend.up {
    color: var(--success-color, #4caf50);
  }
  .primitive-metric-trend.down {
    color: var(--warning-color, #f9a825);
  }
  .primitive-metric-label {
    font-size: var(--c-font-sm, 11.5px);
    font-weight: var(--c-font-weight-normal, 400);
    line-height: var(--c-line-height-normal, 1.25);
    color: var(--secondary-text-color);
  }
  .primitive-metric-support {
    font-size: var(--c-font-sm, 10.5px);
    line-height: var(--c-line-height-normal, 1.2);
    color: var(--secondary-text-color);
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .primitive-metric-support b {
    font-weight: var(--c-font-weight-semibold, 600);
    color: var(--primary-text-color);
  }
  /* Severity color mappings */
  .primitive-metric.severity-info .primitive-metric-value,
  .primitive-metric.severity-info .primitive-metric-icon {
    color: var(--info-color, #03a9f4);
  }
  .primitive-metric.severity-warning .primitive-metric-value,
  .primitive-metric.severity-warning .primitive-metric-icon {
    color: var(--warning-color, #f9a825);
  }
  .primitive-metric.severity-critical .primitive-metric-value,
  .primitive-metric.severity-critical .primitive-metric-icon {
    color: var(--error-color, #e53935);
  }
  .primitive-metric.severity-success .primitive-metric-value,
  .primitive-metric.severity-success .primitive-metric-icon {
    color: var(--success-color, #4caf50);
  }
`;
function Vl(t) {
  const e = !!(t.interactive ?? t.onClick), i = t.size || "lg";
  let r = t.severity || "normal";
  if (!t.severity && t.thresholds) {
    const d = typeof t.value == "number" ? t.value : parseFloat(String(t.value).replace(/[^0-9.-]/g, ""));
    r = Hs(d, t.thresholds);
  }
  const a = [
    "primitive-metric",
    `severity-${r}`,
    e ? "interactive" : "",
    t.className || ""
  ].filter(Boolean).join(" "), s = String(t.value ?? ""), n = `${t.label || "Metric"}: ${s}${t.unit ? ` ${t.unit}` : ""}${t.supportValue || t.supportLabel ? `. ${t.supportValue || ""} ${t.supportLabel || ""}` : ""}`, c = t.ariaLabel || n, l = o`
    <div class="primitive-metric-main">
      ${t.icon ? o`<span class="primitive-metric-icon"><ha-icon icon="${L(t.icon)}"></ha-icon></span>` : ""}
      <span class="primitive-metric-value size-${i}"
        >${L(s)}</span
      >
      ${t.unit ? o`<span class="primitive-metric-unit">${L(t.unit)}</span>` : ""}
      ${t.trend === "up" ? o`<span class="primitive-metric-trend up"
              ><ha-icon icon="mdi:arrow-up"></ha-icon
            ></span>` : t.trend === "down" ? o`<span class="primitive-metric-trend down"
                ><ha-icon icon="mdi:arrow-down"></ha-icon
              ></span>` : ""}
    </div>
    ${t.label ? o`<div class="primitive-metric-label">${L(t.label)}</div>` : ""}
    ${t.supportValue || t.supportLabel ? o`
            <div class="primitive-metric-support">
              ${t.supportValue ? o`<b>${L(String(t.supportValue))}</b>` : ""}
              ${t.supportLabel ? o`<span>${L(t.supportLabel)}</span>` : ""}
            </div>
          ` : ""}
  `;
  return e ? o`
      <button
        class="${a}"
        type="button"
        aria-label="${L(c)}"
        @click=${t.onClick}
      >
        ${l}
      </button>
    ` : o`
    <div class="${a}" aria-label="${L(c)}">
      ${l}
    </div>
  `;
}
const Wl = y`
  .primitive-nav-item {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    min-height: var(--c-row-min-height, 44px);
    padding: var(--c-space-2, 6px) var(--c-space-3, 8px);
    border-radius: var(--dashboard-radius-control, 6px);
    border: var(--dashboard-card-border, 1px solid rgba(255, 255, 255, 0.1));
    background: var(--dashboard-card-surface, transparent);
    color: var(--primary-text-color);
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      transform 0.15s ease;
  }
  .primitive-nav-item.interactive {
    cursor: pointer;
  }
  .primitive-nav-item.interactive:hover:not(:disabled):not(.disabled) {
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
  }
  .primitive-nav-item.interactive:active:not(:disabled):not(.disabled) {
    transform: scale(0.985);
    border-color: var(--primary-color, #03a9f4);
  }
  .primitive-nav-item.active {
    background: var(--dashboard-active-surface, rgba(3, 169, 244, 0.07));
    border-color: var(--primary-color, #03a9f4);
  }
  .primitive-nav-item:disabled,
  .primitive-nav-item.disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  .primitive-nav-leading {
    display: grid;
    place-items: center;
    width: var(--c-icon-box-size, 28px);
    height: var(--c-icon-box-size, 28px);
    flex-shrink: 0;
  }
  .primitive-nav-icon-well {
    width: 28px;
    height: 28px;
    display: grid;
    place-items: center;
    border-radius: var(--dashboard-radius-icon, 0px);
    color: var(--primary-color, #03a9f4);
  }
  .primitive-nav-content {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .primitive-nav-title {
    font-size: var(--c-font-md, 12px);
    font-weight: var(--c-font-weight-medium, 500);
    line-height: var(--c-line-height-normal, 1.2);
    color: var(--primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .primitive-nav-context {
    font-size: var(--c-font-sm, 10.5px);
    font-weight: var(--c-font-weight-normal, 400);
    line-height: var(--c-line-height-normal, 1.2);
    color: var(--secondary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .primitive-nav-trailing {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
  .primitive-nav-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 7px;
    min-width: 18px;
    border-radius: var(--c-radius-pill, 999px);
    font-size: var(--c-font-xs, 10px);
    font-weight: var(--c-font-weight-semibold, 600);
    background: var(--dashboard-card-muted-surface, rgba(255, 255, 255, 0.04));
    color: var(--secondary-text-color);
    border: 1px solid
      var(--dashboard-card-border-color, rgba(255, 255, 255, 0.1));
  }
  .primitive-nav-badge.info {
    color: var(--info-color, #03a9f4);
    background: color-mix(in srgb, var(--info-color, #03a9f4) 12%, transparent);
    border-color: color-mix(
      in srgb,
      var(--info-color, #03a9f4) 30%,
      transparent
    );
  }
  .primitive-nav-badge.warning {
    color: var(--warning-color, #f9a825);
    background: var(
      --dashboard-warning-surface,
      color-mix(in srgb, var(--warning-color, #f9a825) 12%, transparent)
    );
    border-color: color-mix(
      in srgb,
      var(--warning-color, #f9a825) 30%,
      transparent
    );
  }
  .primitive-nav-badge.critical {
    color: var(--error-color, #e53935);
    background: var(
      --dashboard-critical-surface,
      color-mix(in srgb, var(--error-color, #e53935) 12%, transparent)
    );
    border-color: color-mix(
      in srgb,
      var(--error-color, #e53935) 30%,
      transparent
    );
  }
  .primitive-nav-badge.success {
    color: var(--success-color, #4caf50);
    background: color-mix(
      in srgb,
      var(--success-color, #4caf50) 12%,
      transparent
    );
    border-color: color-mix(
      in srgb,
      var(--success-color, #4caf50) 30%,
      transparent
    );
  }
  .primitive-nav-chevron {
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
  }
`;
function Gl(t) {
  const e = !!(t.interactive !== !1 && (t.path || t.onClick)), i = !!t.disabled, r = t.showChevron ?? (e || !!t.path);
  let a = null;
  t.badge !== void 0 && t.badge !== null && (typeof t.badge == "object" ? a = t.badge : a = { text: t.badge, severity: "neutral" });
  const s = [
    "primitive-nav-item",
    e ? "interactive" : "",
    t.active ? "active" : "",
    i ? "disabled" : "",
    t.className || ""
  ].filter(Boolean).join(" "), n = `${t.title}${t.context ? `: ${t.context}` : ""}. Navigate.`, c = t.ariaLabel || n, l = o`
    ${t.icon ? o`
            <div class="primitive-nav-leading">
              <div
                class="primitive-nav-icon-well"
                style="${t.iconColor ? `color: ${t.iconColor};` : ""}"
              >
                <ha-icon icon="${L(t.icon)}"></ha-icon>
              </div>
            </div>
          ` : ""}
    <div class="primitive-nav-content">
      <div class="primitive-nav-title">${L(t.title)}</div>
      ${t.context ? o`<div class="primitive-nav-context">
              ${L(t.context)}
            </div>` : ""}
    </div>
    <div class="primitive-nav-trailing">
      ${a ? o`
              <span
                class="primitive-nav-badge ${a.severity || "neutral"}"
              >
                ${L(String(a.text))}
              </span>
            ` : ""}
      ${r ? o`
              <span class="primitive-nav-chevron">
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </span>
            ` : ""}
    </div>
  `;
  return e ? o`
      <button
        class="${s}"
        type="button"
        aria-label="${L(c)}"
        ?disabled=${i}
        @click=${(d) => {
    i || t.onClick?.(t.path, d);
  }}
      >
        ${l}
      </button>
    ` : o`
    <div class="${s}" aria-label="${L(c)}">
      ${l}
    </div>
  `;
}
const Ns = /* @__PURE__ */ new Set([
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
]), Ls = /* @__PURE__ */ new Set([
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
]), Ms = /\b(battery|battery_level|battery_low|battery_state|link_?quality|rssi|signal_strength|lqi|voltage|temp(erature)?_offset|humidity_offset|calibration_offset|firmware|firmware_version|ip_address|mac_address|device_temp(erature)?|cpu_temp(erature)?|ping|keep_alive|reporting_interval|uptime|free_heap|wifi_signal|compressor_speed|compressor_frequency|defrost_mode)\b/i, qs = /* @__PURE__ */ new Set([
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
]), vr = (t, e) => {
  if (!t?.entity_id) return !1;
  if (t.entity_category === "diagnostic" || t.entity_category === "config")
    return !0;
  const i = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  if (Ns.has(i))
    return !0;
  const r = `${t.entity_id} ${t.name || ""} ${t.original_name || ""} ${e?.attributes?.friendly_name || ""}`.toLowerCase();
  return Ms.test(r);
}, Kl = (t, e) => {
  if (!t?.entity_id || R(t.entity_id) !== "sensor") return !1;
  const r = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  return Ls.has(r) || !!e?.attributes?.unit_of_measurement;
}, Wr = (t, e) => {
  if (!t?.entity_id || t.disabled_by || t.hidden_by || vr(t, e)) return !1;
  const i = R(t.entity_id);
  return !!(qs.has(i) || i === "binary_sensor" && e?.attributes?.device_class === "garage_door");
}, Us = (t, e) => {
  if (!e || vr(t, e)) return !1;
  const i = R(t.entity_id), r = String(e.state).toLowerCase(), a = e.attributes || {};
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
}, Kt = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), Gr = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Split System", Kr = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, js = (t, e, i, r) => {
  if (R(t?.entity_id) !== "climate") return null;
  const a = /* @__PURE__ */ new Set();
  if (a.add(t.entity_id), t.device_id && i?.byDevice) {
    const b = i.byDevice.get(t.device_id) || [];
    for (const $ of b)
      a.add($.entity_id);
  }
  const s = Kr(t, i), n = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], c = s ? (i?.entities || []).filter(
    (b) => Kr(b, i) === s
  ) : [], l = (i?.entities || []).filter(
    (b) => ["timer", "script", "scene"].includes(R(b?.entity_id))
  ), d = [
    ...new Map(
      [...n, ...c, ...l].map((b) => [
        b.entity_id,
        b
      ])
    ).values()
  ].filter((b) => r?.states?.[b.entity_id]), f = Kt(t, r).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((b) => b.length > 2), g = (b) => {
    const $ = Kt(b, r);
    return !!(t.device_id && b.device_id === t.device_id) || f.length > 0 && f.some((_) => $.includes(_));
  }, h = (b) => {
    const $ = d.filter(
      (_) => R(_.entity_id) === "select" && Kt(_, r).includes(b) && /(vane|swing)/.test(Kt(_, r)) && g(_)
    );
    return $.length === 1 ? $[0].entity_id : null;
  }, u = h("vertical"), p = h("horizontal");
  u && a.add(u), p && a.add(p);
  const v = d.find(
    (b) => R(b.entity_id) === "timer" && g(b) && /(split|climate|air.?con|hvac|timer)/.test(
      Kt(b, r)
    )
  )?.entity_id || null;
  v && a.add(v);
  const m = d.filter(
    (b) => ["script", "scene"].includes(R(b.entity_id)) && g(b) && /(split|climate|air.?con|hvac)/.test(Kt(b, r))
  ).map((b) => (a.add(b.entity_id), {
    entity: b.entity_id,
    name: Gr(r, b, r?.states?.[b.entity_id])
  }));
  return {
    cardConfig: {
      type: "custom:component-split-controller-v4",
      entity: t.entity_id,
      title: Gr(r, t, e),
      vertical_vane_entity: u,
      horizontal_vane_entity: p,
      timer_entity: v,
      profile_entities: m
    },
    claimedEntityIds: a
  };
}, Bs = (t, e, i, r) => {
  if (t?.platform !== "wled" || R(t.entity_id) !== "light")
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
}, Fs = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), Vs = (t, e, i, r) => {
  const a = R(t.entity_id), s = a === "binary_sensor" && e?.attributes?.device_class === "garage_door", n = a === "cover" && (/garage/i.test(t.entity_id) || /garage/i.test(e?.attributes?.friendly_name || "") || e?.attributes?.device_class === "garage");
  if (!s && !n)
    return null;
  const c = /* @__PURE__ */ new Set();
  c.add(t.entity_id);
  let l = null;
  if (t.device_id && i?.byDevice) {
    const h = (i.byDevice.get(t.device_id) || []).filter(
      (u) => R(u?.entity_id) === "button" && r?.states?.[u.entity_id] && String(r.states[u.entity_id].state).toLowerCase() !== "unavailable"
    ).filter(
      (u) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
        Fs(u)
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
}, Ws = (t, e, i, r) => {
  if (R(t?.entity_id) !== "media_player" || t?.platform !== "apple_tv")
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
}, Gs = (t, e, i, r) => {
  if (R(t?.entity_id) !== "camera")
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
}, si = [], Yl = (t) => {
  if (typeof t != "function")
    throw new TypeError("Device resolvers must be functions");
  return si.push(t), () => {
    const e = si.indexOf(t);
    e >= 0 && si.splice(e, 1);
  };
}, Ks = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", Yr = (t, e, i, r) => {
  for (const h of si) {
    const u = h(t, e, i, r);
    if (u) return u;
  }
  const a = js(t, e, i, r);
  if (a) return a;
  const s = Bs(t, e, i);
  if (s) return s;
  const n = Vs(t, e, i, r);
  if (n) return n;
  const c = Ws(t, e, i);
  if (c) return c;
  const l = Gs(t, e, i);
  if (l) return l;
  const d = t.entity_id, f = R(d), g = Ks(r, t, e);
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
}, Qr = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Zr = (t, e) => {
  const i = e?.entity_id ? t?.states?.[e.entity_id] : void 0;
  return e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control";
}, Zi = (t, e, i = {}) => {
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
    const p = t.states[u.entity_id];
    return !(!p || u.device_id && s.has(n.get(u.device_id) || "") || vr(u, p));
  }), d = /* @__PURE__ */ new Set(), f = [];
  for (const u of l) {
    const p = R(u.entity_id), v = Qr(u, e);
    if (!(r === "area" && a && v !== a) && [
      "climate",
      "media_player",
      "camera",
      "binary_sensor",
      "cover",
      "light"
    ].includes(p)) {
      const m = t.states[u.entity_id], b = Yr(u, m, e, t);
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
    const p = t.states[u.entity_id], v = R(u.entity_id), m = Qr(u, e);
    if (r === "area") {
      if (m !== a || !Wr(u, p)) continue;
    } else if (r === "media") {
      if (v !== "media_player") continue;
    } else if (r === "sound") {
      if (!["switch", "number", "select"].includes(v)) continue;
    } else if (!Wr(u, p)) continue;
    const b = Yr(u, p, e, t);
    b && f.push({
      entityId: u.entity_id,
      entry: u,
      cardConfig: b.cardConfig
    });
  }
  const g = r === "active" ? f.filter((u) => {
    const p = t.states[u.entityId];
    return Us(u.entry, p);
  }) : f;
  return g.sort(
    (u, p) => Zr(t, u.entry).localeCompare(
      Zr(t, p.entry),
      void 0,
      { sensitivity: "base" }
    )
  ), Pa(
    g.map((u) => ({ id: u.entityId, card: u })),
    i.prefs
  ).visible.map((u) => ({
    entityId: u.id,
    cardConfig: u.card.cardConfig,
    signature: JSON.stringify(u.card.cardConfig)
  }));
};
class Ys {
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
      const l = Array.isArray(a) ? a : [], d = Array.isArray(s) ? s : [], f = Array.isArray(n) ? n : [], g = Array.isArray(c) ? c : [], h = new Map(
        d.map((v) => [v.id, v.area_id || null])
      ), u = /* @__PURE__ */ new Map();
      for (const v of f) {
        if (!v?.device_id) continue;
        const m = u.get(v.device_id) || [];
        m.push(v), u.set(v.device_id, m);
      }
      const p = new Map(
        l.map((v) => [v.area_id, v])
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
const G = new Ys(), Ae = [], wa = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard entry filters must be functions");
  return Ae.push(t), () => {
    const e = Ae.indexOf(t);
    e >= 0 && Ae.splice(e, 1);
  };
}, $a = (t, e) => {
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
}, Ri = (t, e) => !!(t?.entity_id && !t.disabled_by && !t.hidden_by && !["diagnostic", "config"].includes(t.entity_category || "") && !$a(t, e) && Ae.every((i) => i(t))), st = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", ie = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Yt = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), Ca = (t, e, i, r) => {
  if (R(t?.entity_id) !== "climate") return null;
  const a = ie(t, i), s = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], n = a ? (i?.entities || []).filter(
    (p) => ie(p, i) === a
  ) : [], c = (i?.entities || []).filter(
    (p) => ["timer", "script", "scene"].includes(R(p?.entity_id))
  ), l = [
    ...new Map(
      [...s, ...n, ...c].map((p) => [
        p.entity_id,
        p
      ])
    ).values()
  ].filter((p) => r?.states?.[p.entity_id]), d = Yt(t, r).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((p) => p.length > 2), f = (p) => {
    const v = Yt(p, r);
    return !!(t.device_id && p.device_id === t.device_id) || d.some((m) => v.includes(m));
  }, g = (p) => {
    const v = l.filter(
      (m) => R(m.entity_id) === "select" && Yt(m, r).includes(p) && /(vane|swing)/.test(Yt(m, r)) && f(m)
    );
    return v.length === 1 ? v[0].entity_id : null;
  }, h = l.find(
    (p) => R(p.entity_id) === "timer" && f(p) && /(split|climate|air.?con|hvac|timer)/.test(
      Yt(p, r)
    )
  )?.entity_id || null, u = l.filter(
    (p) => ["script", "scene"].includes(R(p.entity_id)) && f(p) && /(split|climate|air.?con|hvac)/.test(Yt(p, r))
  ).map((p) => ({
    entity: p.entity_id,
    name: st(r, p, r?.states?.[p.entity_id])
  }));
  return {
    type: "custom:component-split-controller-v4",
    entity: t.entity_id,
    title: st(r, t, e),
    vertical_vane_entity: g("vertical"),
    horizontal_vane_entity: g("horizontal"),
    timer_entity: h,
    profile_entities: u
  };
}, Qs = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), ka = (t, e, i) => {
  if (!t?.device_id) return null;
  const a = (e?.byDevice?.get(t.device_id) || []).filter(
    (s) => R(s?.entity_id) === "button" && Ri(s) && i?.states?.[s.entity_id] && String(i.states[s.entity_id].state).toLowerCase() !== "unavailable"
  ).filter(
    (s) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
      Qs(s)
    )
  );
  return a.length === 1 ? a[0].entity_id : null;
}, Sa = (t, e, i, r) => R(t?.entity_id) === "media_player" && t?.platform === "apple_tv" ? {
  type: "custom:component-apple-tv-controller-v1",
  entity: t.entity_id,
  title: st(r, t, e),
  icon: "mdi:apple"
} : null, Aa = /* @__PURE__ */ new Set([
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
]), Zs = (t, e) => Ri(t, e) && (Aa.has(R(t.entity_id)) || R(t.entity_id) === "binary_sensor" && e?.attributes?.device_class === "garage_door"), Js = (t, e) => {
  if (!Ri(t, e) || !e) return !1;
  const i = R(t.entity_id), r = e.state, a = e.attributes || {};
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
}, Ee = [], Ea = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard control resolvers must be functions");
  return Ee.push(t), () => {
    const e = Ee.indexOf(t);
    e >= 0 && Ee.splice(e, 1);
  };
}, Da = (t, e, i, r) => {
  const a = t.entity_id, s = R(a);
  if (s === "climate")
    return Ca(t, e, i, r) || {
      type: "custom:component-split-controller-v4",
      entity: a,
      title: st(r, t, e)
    };
  if (s === "binary_sensor" && e?.attributes?.device_class === "garage_door") {
    const n = ka(t, i, r);
    return n ? {
      type: "custom:component-garage-door-controller-v1",
      title: st(r, t, e).replace(
        / Garage Door Status$/i,
        ""
      ),
      entity: a,
      control_entity: n
    } : {
      type: "custom:component-control-row-v2",
      entity: a,
      title: st(r, t, e)
    };
  }
  return s === "media_player" ? Sa(t, e, i, r) || {
    type: "custom:component-media-row-v2",
    entity: a,
    title: st(r, t, e)
  } : s === "camera" ? {
    type: "custom:component-camera-controller-v1",
    entity: a,
    title: st(r, t, e),
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
    title: st(r, t, e),
    name: st(r, t, e)
  } : null;
}, Xs = (t, e, i, r) => {
  for (const a of Ee) {
    const s = a(t, e, i, r);
    if (s) return s;
  }
  return Da(t, e, i, r);
}, Ta = async (t, e) => {
  if (!t || !e) return { order: [], hidden: [] };
  try {
    return (await t.callWS({
      type: "frontend/get_user_data",
      key: e
    }))?.value || { order: [], hidden: [] };
  } catch {
    return { order: [], hidden: [] };
  }
}, za = (t, e, i) => t.callWS({ type: "frontend/set_user_data", key: e, value: i }), Pa = (t, e) => {
  const i = new Map(t.map((n) => [n.id, n])), r = /* @__PURE__ */ new Set(), a = [];
  for (const n of e?.order || []) {
    const c = i.get(n);
    c && (a.push(c), r.add(n));
  }
  for (const n of t)
    r.has(n.id) || a.push(n);
  const s = new Set(e?.hidden || []);
  return { all: a, visible: a.filter((n) => !s.has(n.id)), hidden: s };
}, Oa = async (t, e) => {
  const i = String(t?.type || ""), r = i.startsWith("custom:") ? i.slice(7) : i;
  let a;
  if (customElements.get(r))
    a = document.createElement(r);
  else {
    const s = globalThis.loadCardHelpers || (typeof window < "u" ? window.loadCardHelpers : void 0);
    if (typeof s == "function")
      try {
        const d = (await s()).createCardElement(t);
        return e && (d.hass = e), d;
      } catch {
      }
    const n = t?.entity || "";
    R(n) === "media_player" ? a = document.createElement("component-media-row-v2") : a = document.createElement("component-control-row-v2");
  }
  if (typeof a.setConfig == "function")
    try {
      a.setConfig(t);
    } catch {
    }
  return e && (a.hass = e), a;
};
globalThis.__homeDashboardV2 ??= {};
const V = globalThis.__homeDashboardV2;
V.REG = G;
V.entryFilters = Ae;
V.registerEntryFilter = wa;
V.uiEntry = Ri;
V.stateName = st;
V.areaOf = ie;
V.domain = R;
V.controlResolvers = Ee;
V.registerControlResolver = Ea;
V.nativeClimateControlConfig = Ca;
V.garageControl = ka;
V.appleTvBundle = Sa;
V.controlConfig = Xs;
V.defaultControlConfig = Da;
V.controlDomains = Aa;
V.isPotential = Zs;
V.isActive = Js;
V.isPeripheral = $a;
V.prefs = Ta;
V.savePrefs = za;
V.applyPrefs = Pa;
V.card = Oa;
V.discoverControls = Zi;
const Jr = /* @__PURE__ */ new WeakMap(), Ql = async (t) => {
  if (!t || !t.sendMessagePromise)
    return { areas: [], devices: [], entities: [] };
  const e = await G.load({ connection: t });
  let i = Jr.get(e);
  return i || (i = {
    areas: e.areas,
    devices: e.devices,
    entities: e.entities
  }, Jr.set(e, i)), i;
}, Zl = async (t, e = !1) => G.load(t, e), tn = /(_controller_temperature|_outside_air_temperature|cpu_temperature|processor_temperature|board_temperature|chip_temperature|internal_temperature)$/i;
function Ia(t, e, i) {
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
  const a = (e?.entities || []).filter((m) => (m.area_id || (m.device_id ? e?.deviceArea?.get(m.device_id) : null)) === t.area_id), s = [];
  for (const m of a) {
    const b = i.states[m.entity_id];
    b && bt(b) && s.push(b);
  }
  let n = 0, c = 0, l = "", d = "", f = !1, g = !1;
  const h = s.find(
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
    const m = s.find(
      (b) => b.entity_id.startsWith("sensor.") && (b.attributes?.device_class === "temperature" || b.attributes?.unit_of_measurement && /°[CF]/i.test(b.attributes.unit_of_measurement)) && !tn.test(b.entity_id) && !Number.isNaN(Number.parseFloat(String(b.state ?? "")))
    );
    if (m) {
      const b = Number.parseFloat(String(m.state)), $ = m.attributes?.unit_of_measurement || i.config?.unit_system?.temperature || "°C";
      l = `${b.toFixed(1)} ${$}`;
    }
  }
  const u = s.find(
    (m) => m.entity_id.startsWith("sensor.") && m.attributes?.device_class === "humidity" && !Number.isNaN(Number.parseFloat(String(m.state ?? "")))
  );
  u && (d = X(u, i));
  for (const m of s) {
    oe(m) && c++, m.entity_id.startsWith("light.") && m.state === "on" && n++;
    const b = m.attributes?.device_class || "";
    m.entity_id.startsWith("binary_sensor.") && m.state === "on" && ["smoke", "moisture", "gas"].includes(b) && (f = !0), (m.entity_id.startsWith("binary_sensor.") && m.state === "on" && b === "garage_door" || m.entity_id.startsWith("cover.") && ["open", "opening"].includes(m.state) && b === "garage") && (g = !0);
  }
  const p = c > 0, v = [];
  return f ? v.push("Attention required") : g && v.push("Garage open"), l && v.push(l), d && !l && v.push(d), n > 0 ? v.push(`${n} light${n === 1 ? "" : "s"} on`) : c > 0 && v.push(
    `${c} active device${c === 1 ? "" : "s"}`
  ), {
    summary: v.slice(0, 3).join(" · "),
    severity: f ? "critical" : g ? "warning" : p ? "active" : "",
    lightsOn: n,
    activeDeviceCount: c,
    temperatureText: l,
    humidityText: d,
    hasCritical: f,
    hasWarning: g
  };
}
const Vi = /* @__PURE__ */ new WeakMap();
let en = 1;
const _r = (t) => {
  const e = t?.connection;
  return e ? (Vi.has(e) || Vi.set(e, en++), Vi.get(e)) : "none";
}, Jt = (t, e, i) => `${_r(t)}|${e}|${i}`, te = /* @__PURE__ */ new WeakMap();
let ee = null;
const rn = (t) => {
  const e = te.get(t);
  te.delete(t), ee === t && (ee = null), e && Promise.resolve(e).then((i) => i()).catch(() => {
  });
}, Xr = (t) => {
  const e = t?.connection;
  if (!e?.subscribeEvents || (ee && ee !== e && rn(ee), ee = e, te.has(e))) return;
  const i = e.subscribeEvents((r) => {
    const a = /^dashboard-profile\.(energy|security)\.([a-z0-9-]+)$/.exec(
      String(r?.data?.key || "")
    );
    a && (Xt.invalidate(Jt(t, a[1], a[2])), globalThis.dispatchEvent(
      new CustomEvent("ha-component-profile-change", {
        detail: { kind: a[1], profileId: a[2] }
      })
    ));
  }, "ha_component_backend_preferences_updated");
  te.set(e, i), Promise.resolve(i).catch(
    () => te.get(e) === i ? te.delete(e) : void 0
  );
}, Xt = ga(
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
), an = Object.freeze({
  async get(t, e, i, r = {}) {
    Xr(t);
    const a = Jt(t, e, i);
    return Xt.read(
      a,
      { hass: t, kind: e, profileId: i },
      r
    );
  },
  invalidate(t, e, i) {
    Xt.invalidate(Jt(t, e, i));
  },
  peek(t, e, i) {
    return Xt.peek(Jt(t, e, i));
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
    return Xt.invalidate(Jt(t, e, i)), n;
  },
  subscribe(t, e, i, r) {
    Xr(t);
    const a = Jt(t, e, i);
    return Xt.subscribe(a, r);
  }
}), Wi = /* @__PURE__ */ new Map(), ta = (t) => String(t).padStart(2, "0"), Oe = (t = /* @__PURE__ */ new Date()) => `${t.getFullYear()}-${ta(t.getMonth() + 1)}-${ta(t.getDate())}`, Ce = (t, e = /* @__PURE__ */ new Date()) => {
  const i = t?.config?.time_zone;
  if (!i) return Oe(e);
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
    return Oe(e);
  }
}, Ra = (t, e = Oe()) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(t || ""));
  if (!i) return null;
  const r = new Date(
    Number(i[1]),
    Number(i[2]) - 1,
    Number(i[3])
  );
  return Oe(r) !== t || t > e ? null : t;
}, Gi = (t = "energy-day") => {
  const e = String(t || "energy-day");
  if (!Wi.has(e)) {
    let i = null;
    try {
      i = sessionStorage.getItem(`ha-component-library:${e}`);
    } catch {
    }
    const r = Ra(i);
    Wi.set(e, {
      value: r || Oe(),
      usesDefault: !r,
      subscribers: /* @__PURE__ */ new Set()
    });
  }
  return Wi.get(e);
}, B = Object.freeze({
  get(t = "energy-day", e) {
    const i = Gi(t);
    return i.usesDefault && (i.value = Ce(e)), i.value;
  },
  set(t = "energy-day", e, i = {}) {
    const r = Gi(t), a = Ce(i.hass), s = Ra(e, a);
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
    const r = Gi(t);
    return r.usesDefault && (r.value = Ce(i.hass)), r.subscribers.add(e), i.replay !== !1 && e({
      channel: t,
      day: r.value,
      isToday: r.value === Ce(i.hass)
    }), () => r.subscribers.delete(e);
  },
  today: Ce
}), Ki = /* @__PURE__ */ new Set(), Xe = (t, e, i) => `${_r(t)}|${e}|${i}`, ke = ga(
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
), re = Object.freeze({
  async get(t, e, i, r = {}) {
    const a = Xe(t, e, i);
    return Ki.add(a), ke.read(a, { hass: t, profileId: e, day: i }, r);
  },
  invalidate(t, e, i) {
    ke.invalidate(Xe(t, e, i));
  },
  invalidateProfile(t, e) {
    const i = `${_r(t)}|${e}|`;
    for (const r of Ki)
      r.startsWith(i) && ke.invalidate(r);
  },
  peek(t, e, i) {
    return ke.peek(Xe(t, e, i));
  },
  subscribe(t, e, i, r) {
    const a = Xe(t, e, i);
    return Ki.add(a), ke.subscribe(a, r);
  }
}), ti = /* @__PURE__ */ new Set(["unknown", "unavailable"]), Hi = (t) => [
  t?.translation_key,
  t?.unique_id,
  t?.entity_id,
  t?.platform
].filter(Boolean).join(" ").toLowerCase(), ei = (t, e) => e?.name || e?.original_name || (e?.entity_id ? t?.states?.[e.entity_id]?.attributes?.friendly_name : "") || e?.entity_id || "Control", ea = (t) => {
  const e = Hi(t);
  return /record/.test(e) ? "Recording" : /detect|motion/.test(e) ? "Detection" : /alert|notification/.test(e) ? "Alerts" : /audio|sound/.test(e) ? "Audio" : null;
}, sn = (t) => /(^|[_ :.-])(ptz|pan|tilt|zoom)([_ :.-]|$)/.test(
  Hi(t)
), ii = (t) => {
  const e = Hi(t);
  return /trigger|operate|open|close/.test(e) ? "operate" : /restart|reboot/.test(e) ? "restart" : "action";
}, nn = (t, e, i = {}) => {
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
    const b = ie(m, e);
    return !s.size || (b ? s.has(b) : !1);
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
    $.sort((I, tt) => {
      const yt = (Dt) => {
        const we = t.states[Dt.entity_id];
        return (r.has(Dt.entity_id) ? 100 : 0) + (we?.attributes?.entity_picture ? 20 : 0) + (we?.attributes?.frontend_stream_type ? 10 : 0);
      };
      return yt(tt) - yt(I) || String(I.unique_id || I.entity_id).localeCompare(
        String(tt.unique_id || tt.entity_id)
      );
    });
    const _ = $[0], D = t.states[_.entity_id], H = (e?.devices || []).find((I) => I.id === _.device_id) || {}, M = ie(_, e), q = (M ? e?.areaMap?.get(M)?.name : "") || "", w = b.filter(
      (I) => R(I.entity_id) === "switch" && ea(I)
    ).map((I) => ({ entity: I, role: ea(I) })), O = b.filter((I) => {
      if (R(I.entity_id) !== "binary_sensor") return !1;
      const tt = t.states[I.entity_id]?.attributes?.device_class || "";
      return /^(motion|occupancy|presence|sound)$/.test(tt) || /detect|motion|person|human/.test(Hi(I));
    }), j = b.filter((I) => R(I.entity_id) === "image").map((I) => {
      const tt = ei(t, I), yt = String(
        H.name_by_user || H.name || ""
      ).trim(), Dt = yt && tt.toLowerCase().startsWith(`${yt.toLowerCase()} `) ? tt.slice(yt.length).trim() : tt;
      return { entity: I, name: Dt };
    }), N = b.filter(
      (I) => R(I.entity_id) === "button" && ii(I) !== "action"
    ).map((I) => ({ entity: I, role: ii(I) })), Y = b.filter(
      (I) => ["button", "number", "select"].includes(R(I.entity_id)) && sn(I)
    ), Q = i.mappings?.[`camera_stream:${_.entity_id}`] || i.mappings?.[`camera_stream:${m}`] || null, Vt = Q ? t.states[Q] : null, Wt = (Vt && !ti.has(String(Vt.state).toLowerCase()) ? Q : _.entity_id) || _.entity_id, Ze = !!(D && !ti.has(String(D.state).toLowerCase())), gt = O.some(
      (I) => t.states[I.entity_id]?.state === "on"
    );
    g.push({
      id: m,
      deviceId: _.device_id || null,
      entityId: _.entity_id,
      entities: $.map((I) => I.entity_id),
      name: String(H.name_by_user || H.name || "").trim() || q || ei(t, _),
      areaId: M,
      areaName: q,
      online: Ze,
      active: gt,
      streamEntityId: Wt,
      switches: w,
      detections: O,
      classifications: j,
      actions: N,
      ptz: Y
    });
  }
  g.sort(
    (m, b) => m.name.localeCompare(b.name, void 0, { sensitivity: "base" })
  );
  const h = [];
  for (const m of l) {
    const b = R(m.entity_id), $ = t.states[m.entity_id], _ = $?.attributes?.device_class || "";
    if (!(b === "binary_sensor" && /^(door|window|garage_door|opening)$/.test(_) || b === "lock" || b === "cover" && /^(door|garage)$/.test(_))) continue;
    const M = m.device_id ? f.get(m.device_id) || [] : [], w = i.mappings?.[`entry_control:${m.entity_id}`] || M.filter((j) => R(j.entity_id) === "button").sort(
      (j, N) => (ii(j) === "operate" ? -1 : 1) - (ii(N) === "operate" ? -1 : 1)
    )[0]?.entity_id || null, O = b === "lock" ? $.state === "unlocked" : /^(on|open|opening)$/.test($.state);
    h.push({
      entityId: m.entity_id,
      deviceId: m.device_id || null,
      controlEntityId: w,
      domain: b,
      deviceClass: _,
      name: ei(t, m),
      state: $.state,
      open: O,
      available: !ti.has(String($.state).toLowerCase()),
      areaId: ie(m, e)
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
    const $ = R(b), _ = u.get($), D = t?.states?.[b];
    if (!_ || !D) return [];
    const H = (e?.entities || []).find(
      (M) => M.entity_id === b
    ) || {
      entity_id: b
    };
    return [
      {
        id: m.slice(13),
        entityId: b,
        domain: $,
        service: _,
        name: ei(t, H),
        icon: D.attributes?.icon || ($ === "script" ? "mdi:script-text-outline" : $ === "scene" ? "mdi:palette-outline" : "mdi:robot-outline"),
        available: !ti.has(String(D.state).toLowerCase())
      }
    ];
  });
  p.sort(
    (m, b) => m.name.localeCompare(b.name, void 0, { sensitivity: "base" })
  );
  const v = [
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
    attention: v,
    allClear: v.length === 0,
    onlineCameras: g.filter((m) => m.online).length
  };
}, We = async (t, e = "household-security", i = {}) => {
  const [r, a] = await Promise.all([
    an.get(t, "security", e, i).catch((n) => ({ found: !1, profile: null, error: n })),
    G.load(t)
  ]);
  return r?.found ? {
    ...nn(t, a, r.profile || {}),
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
}, Yi = R, ia = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]), Ha = (t) => String(
  t?.original_name || t?.name || t?.entity_id || ""
).toLowerCase();
let ra = !1;
const on = () => {
  ra || (ra = !0, wa((t) => t?.platform !== "wled" ? !0 : R(t.entity_id) !== "light" ? !1 : Ha(t) === "main" || !/_\d+$/.test(String(t.unique_id || ""))), Ea((t) => t?.platform !== "wled" || R(t.entity_id) !== "light" ? null : {
    type: "custom:component-wled-controller-v1",
    entity: t.entity_id,
    device_id: t.device_id
  }), G.refresh());
};
on();
const cn = [
  z,
  P,
  W,
  U,
  ct,
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
var ln = Object.getOwnPropertyDescriptor, dn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? ln(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const hn = {
  type: "custom:component-action-v2",
  title: "Action title",
  description: "What this action will do",
  action_text: "Open",
  icon: "mdi:gesture-tap-button",
  navigation_path: null,
  entity: null,
  more_info_entity: null
};
let di = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...hn, ...t });
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
di.styles = cn;
di = dn([
  k("component-action-v2")
], di);
A({
  type: "component-action-v2",
  element: di,
  name: "Action Card",
  description: "Reusable navigation and more-info action card."
});
const pn = [
  z,
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
var un = Object.getOwnPropertyDescriptor, mn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? un(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const gn = {
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
let hi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...gn, ...t });
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
        ${t ? o`<button type="button" aria-label="${this.esc(r)}">
                ${i}
              </button>` : o`<div
                class="context-static"
                aria-label="${this.esc(r)}"
              >
                ${i}
              </div>`}
      </ha-card>
    `;
  }
};
hi.styles = pn;
hi = mn([
  k("component-context-strip-v3")
], hi);
A({
  type: "component-context-strip-v3",
  element: hi,
  name: "Context Strip",
  description: "Reusable context and metric strip component."
});
const fn = [
  z,
  mr,
  mt
];
var bn = Object.getOwnPropertyDescriptor, Na = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? bn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const vn = {
  type: "custom:component-empty-state-v3",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let Ie = class extends E {
  setConfig(t) {
    super.setConfig({ ...vn, ...t });
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
Ie.styles = fn;
Ie = Na([
  k("component-empty-state-v3")
], Ie);
A({
  type: "component-empty-state-v3",
  element: Ie,
  name: "Empty State",
  description: "Reusable empty-state component."
});
let Ji = class extends Ie {
  setConfig(t) {
    super.setConfig({
      ...t,
      type: "custom:component-empty-state-v2"
    });
  }
};
Ji = Na([
  k("component-empty-state-v2")
], Ji);
A({
  type: "component-empty-state-v2",
  element: Ji,
  name: "Empty State V2",
  description: "Reusable compact empty-state component."
});
const _n = [
  z,
  P,
  ct,
  mt,
  y`
    .list-wrap {
      margin: -4px 0;
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
var yn = Object.getOwnPropertyDescriptor, xn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? yn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const wn = {
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
let pi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...wn, ...t });
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
          T(i, {
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
      <ha-card class="assembled-card">
        <div class="list-wrap">
          ${t.map((e, i) => {
      const r = this._getRowActions(e), a = e.entity ? this.hass?.states[e.entity] : null, s = e.title || "Item", n = a && s.startsWith("Item") ? Et({ state: a }) : s, c = a && (e.value === "00" || !e.value) ? X(a, this.hass) : e.value || "", l = `${n}: ${c} ${e.label || ""}${e.description ? `. ${e.description}` : ""}`, d = o`
              <div>
                <div class="label-title title">${this.esc(n)}</div>
                <div class="label-sub desc">${this.esc(e.description)}</div>
              </div>
              <div class="metric">
                <b>${this.esc(c)}</b>${this.esc(e.label)}
              </div>
            `;
      return r.primary ? o`
                  <button
                    class="row"
                    data-index="${i}"
                    type="button"
                    aria-label="${this.esc(l)}"
                  >
                    ${d}
                  </button>
                ` : o`<div
                  class="row"
                  data-index="${i}"
                  aria-label="${this.esc(l)}"
                >
                  ${d}
                </div>`;
    })}
        </div>
      </ha-card>
    `;
  }
};
pi.styles = _n;
pi = xn([
  k("component-list-v2")
], pi);
A({
  type: "component-list-v2",
  element: pi,
  name: "List / Ranking",
  description: "Reusable list and ranking component."
});
const $n = [
  z,
  mr,
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
var Cn = Object.getOwnPropertyDescriptor, kn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Cn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Sn = {
  type: "custom:component-notice-v2",
  title: "Notice title",
  message: "Important supporting information appears here.",
  tone: "info",
  icon: "mdi:information-outline",
  entity: null,
  navigation_path: null
};
let ui = class extends E {
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
    return this._config ? this._config.navigation_path ? () => this.navigate(this._config?.navigation_path) : this._config.entity ? () => this.moreInfo(this._config?.entity) : null : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector(
      ".notice-box"
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
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = this._config.tone === "error" ? "critical" : this._config.tone || "info", r = e && this._config.title === "Notice title" ? Et({ state: e }) : this._config.title || "Notice title", a = e && this._config.message === "Important supporting information appears here." ? X(e, this.hass) : this._config.message || "", s = `${r}${a ? `: ${a}` : ""}`;
    return o`
      <ha-card>
        <div
          class="notice-box ${i} ${t ? "actionable" : ""}"
          role="${t ? "button" : "region"}"
          tabindex="${t ? "0" : "-1"}"
          aria-label="${this.esc(s)}"
        >
          <span>
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </span>
          <div>
            <div class="label-title">${this.esc(r)}</div>
            ${a ? o`<div class="label-sub message">${this.esc(a)}</div>` : ""}
          </div>
        </div>
      </ha-card>
    `;
  }
};
ui.styles = $n;
ui = kn([
  k("component-notice-v2")
], ui);
A({
  type: "component-notice-v2",
  element: ui,
  name: "Alert / Notice",
  description: "Reusable alert and notice component."
});
const An = [
  z,
  P,
  ut,
  mt,
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
var En = Object.getOwnPropertyDescriptor, Dn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? En(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Tn = {
  type: "custom:component-progress-v2",
  value: "68%",
  label: "Progress metric",
  progress: 68,
  target_value: "100%",
  target_label: "Target",
  entity: null,
  navigation_path: null
};
let mi = class extends E {
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
    return this._config ? this._config.navigation_path ? () => this.navigate(this._config?.navigation_path) : this._config.entity ? () => this.moreInfo(this._config?.entity) : null : null;
  }
  updated() {
    const t = this._getAction(), e = this.renderRoot.querySelector(
      ".progress-card"
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
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e && this._config.label === "Progress metric" ? Et({ state: e }) : this._config.label || "Progress metric", r = e && this._config.value === "68%" ? X(e, this.hass) : this._config.value || "68%";
    let a = Math.min(100, Math.max(0, Number(this._config.progress) || 0));
    if (e && this._config.progress === 68) {
      const n = parseFloat(e.state);
      isNaN(n) || (a = Math.min(100, Math.max(0, n)));
    }
    const s = `${i}: ${r}. ${this._config.target_label || "Target"}: ${this._config.target_value || "100%"}`;
    return o`
      <ha-card class="assembled-card">
        <div
          class="progress-card ${t ? "actionable" : ""}"
          role="${t ? "button" : "region"}"
          tabindex="${t ? "0" : "-1"}"
          aria-label="${this.esc(s)}"
        >
          <div class="progress-head">
            <div>
              <div class="kpi-metric-lg">${this.esc(r)}</div>
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
            aria-valuenow="${a}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="${this.esc(i)}"
          >
            <div class="determinate-fill" style="width:${a}%"></div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
mi.styles = An;
mi = Dn([
  k("component-progress-v2")
], mi);
A({
  type: "component-progress-v2",
  element: mi,
  name: "Progress / Target",
  description: "Reusable progress and target component."
});
const zn = [
  z,
  Ve,
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
var Pn = Object.getOwnPropertyDescriptor, On = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Pn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
let gi = class extends E {
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
gi.styles = zn;
gi = On([
  k("component-section-separator-v2")
], gi);
A({
  type: "component-section-separator-v2",
  element: gi,
  name: "Section Separator",
  description: "Reusable section separator component."
});
const In = [
  z,
  P,
  mt,
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
var Rn = Object.getOwnPropertyDescriptor, Hn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Rn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Nn = {
  type: "custom:component-single-kpi-v2",
  value: "00",
  label: "Primary metric",
  support_value: "00",
  support_label: "Supporting context",
  interactive: !0,
  entity: null,
  navigation_path: null
};
let fi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Nn, ...t });
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
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e && this._config.value === "00" ? X(e, this.hass) : this._config.value || "00", r = e && this._config.label === "Primary metric" ? Et({ state: e }) : this._config.label || "Primary metric", a = this._config.support_value || "", s = this._config.support_label || "", n = `${r}: ${i}${a || s ? `. ${a} ${s}` : ""}`, c = o`
      <div class="kpi-row">
        <div>
          <div class="kpi-metric-lg value">${this.esc(i)}</div>
          <div class="label-sub label">${this.esc(r)}</div>
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
      <ha-card class="assembled-card">
        ${t ? o`<button
                class="demo"
                type="button"
                aria-label="${this.esc(n)}"
              >
                ${c}
              </button>` : o`<div class="demo-static">${c}</div>`}
      </ha-card>
    `;
  }
};
fi.styles = In;
fi = Hn([
  k("component-single-kpi-v2")
], fi);
A({
  type: "component-single-kpi-v2",
  element: fi,
  name: "Single KPI",
  description: "Reusable single KPI component."
});
const Ln = [
  z,
  P,
  U,
  ct,
  K,
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
var Mn = Object.getOwnPropertyDescriptor, qn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Mn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Un = {
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
let bi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Un, ...t });
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
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e ? Z(e) : !1, r = this._config.entity ? ht(this._config.entity) : "", a = e && this._config.title === "Status title" ? Et({ state: e }) : this._config.title || "Status title", s = e && this._config.status_value === "Active" ? i ? "Unavailable" : X(e, this.hass) : this._config.status_value || "Active", n = e && this._config.icon === "mdi:information-outline" ? e.attributes.icon || xe(r, e.state) : this._config.icon || "mdi:information-outline", c = this._config.description || "", l = this._config.status_label || "", d = `${a}: ${s}${l ? ` (${l})` : ""}${c ? `. ${c}` : ""}`, f = o`
      <div class="header-row ${i ? "unavailable" : ""}">
        <div class="icon-well control-radius icon">
          <ha-icon icon="${this.esc(n)}"></ha-icon>
        </div>
        <div class="copy-block">
          <div class="label-title title">${this.esc(a)}</div>
          ${c ? o`<div class="label-sub desc">${this.esc(c)}</div>` : ""}
        </div>
        <div class="status">
          <b class="kpi-metric-sm">${this.esc(s)}</b>
          ${l ? o`<span>${this.esc(l)}</span>` : ""}
        </div>
      </div>
    `;
    return o`
      <ha-card class="surface-card">
        ${t ? o`<button
                class="demo"
                type="button"
                aria-label="${this.esc(d)}"
                aria-disabled="${String(i)}"
                ?disabled=${i}
              >
                ${f}
              </button>` : o`<div class="demo-static">${f}</div>`}
      </ha-card>
    `;
  }
};
bi.styles = Ln;
bi = qn([
  k("component-status-row-v2")
], bi);
A({
  type: "component-status-row-v2",
  element: bi,
  name: "Status Row",
  description: "Reusable status row component."
});
const jn = [
  z,
  P,
  U,
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
      animation: stampSweep var(--effect-speed, 2.6s)
        cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    .typewave .title:after {
      content: attr(data-text);
      position: absolute;
      z-index: 3;
      inset: 0;
      color: var(--primary-color);
      clip-path: inset(0 100% 0 0);
      animation: textSweep var(--effect-speed, 2.6s)
        cubic-bezier(0.4, 0, 0.2, 1) infinite;
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
var Bn = Object.getOwnPropertyDescriptor, Fn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Bn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Vn = {
  type: "custom:component-text-effect-v1",
  effect: "stamp",
  description: "",
  icon: null,
  speed: 2.6
};
let vi = class extends E {
  constructor() {
    super(...arguments), this._settleTimer = null;
  }
  setConfig(t) {
    if (!t?.text)
      throw new Error("text is required");
    super.setConfig({ ...Vn, ...t });
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
    ].includes(this._config.effect || "") ? this._config.effect : "stamp", e = t === "rainbow_stamp" ? "stamp" : t, i = Math.max(1.6, Math.min(6, Number(this._config.speed) || 2.6)), r = this._config.text;
    return o`
      <ha-card style="--effect-speed: ${i}s">
        <div class="row ${e} ${this._config.icon ? "has-icon" : ""}">
          ${this._config.icon ? o`
                  <span class="icon">
                    <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
                  </span>
                ` : ""}
          <div class="copy">
            <div class="title" data-text="${this.esc(r)}">
              <span class="base">${this.esc(r)}</span>
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
vi.styles = jn;
vi = Fn([
  k("component-text-effect-v1")
], vi);
A({
  type: "component-text-effect-v1",
  element: vi,
  name: "Signature Text Effect",
  description: "Reusable transient-status effects using the existing signature motion language."
});
const Wn = [
  z,
  P,
  mt,
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
var Gn = Object.getOwnPropertyDescriptor, Kn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Gn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Yn = {
  type: "custom:component-three-stat-v2",
  metric_1_value: "00",
  metric_1_label: "Metric one",
  metric_2_value: "00",
  metric_2_label: "Metric two",
  metric_3_value: "00",
  metric_3_label: "Metric three",
  interactive: !0
};
let _i = class extends E {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Yn, ...t });
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
        T(e, { primary: r, feedback: !0 })
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
      r && (a === "00" || !a) && (a = X(r, this.hass));
      let s = this._config[`metric_${e}_label`];
      r && (s === `Metric ${e === 1 ? "one" : e === 2 ? "two" : "three"}` || !s) && (s = Et({ state: r }));
      const n = this._getAction(e), c = `${s}: ${a}`, l = o`
        <div class="kpi-metric-md value">${this.esc(a)}</div>
        <div class="label-sub label">${this.esc(s)}</div>
      `;
      return n ? o`<button
            class="stat"
            data-index="${e}"
            type="button"
            aria-label="${this.esc(c)}"
          >
            ${l}
          </button>` : o`<div
            class="stat"
            data-index="${e}"
            aria-label="${this.esc(c)}"
          >
            ${l}
          </div>`;
    });
    return o`
      <ha-card class="assembled-card">
        <div class="wrap">${t}</div>
      </ha-card>
    `;
  }
};
_i.styles = Wn;
_i = Kn([
  k("component-three-stat-v2")
], _i);
A({
  type: "component-three-stat-v2",
  element: _i,
  name: "Three-stat Summary",
  description: "Reusable three-stat summary component."
});
const Qn = [
  z,
  P,
  U,
  ct,
  K,
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
var Zn = Object.getOwnPropertyDescriptor, Jn = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Zn(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Xn = {
  type: "custom:component-nav-tile-v2",
  icon: "mdi:door-open",
  title: "Destination",
  context: "Navigation",
  navigation_path: null
};
let yi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Xn, ...t });
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
        ${t ? o`<button
                class="i nav"
                type="button"
                aria-label="${this.esc(i)}"
              >
                ${e}
              </button>` : o`<div
                class="nav nav-static"
                aria-label="${this.esc(i)}"
              >
                ${e}
              </div>`}
      </ha-card>
    `;
  }
};
yi.styles = Qn;
yi = Jn([
  k("component-nav-tile-v2")
], yi);
A({
  type: "component-nav-tile-v2",
  element: yi,
  name: "Navigation Tile",
  description: "Reusable navigation tile component."
});
const to = [
  z,
  P,
  W,
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
var eo = Object.getOwnPropertyDescriptor, io = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? eo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const ro = {
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
let xi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...ro, ...t });
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
xi.styles = to;
xi = io([
  k("component-quick-nav-v2")
], xi);
A({
  type: "component-quick-nav-v2",
  element: xi,
  name: "Quick Navigation",
  description: "Reusable quick navigation component."
});
const ao = [
  z,
  P,
  U,
  K,
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
var so = Object.defineProperty, no = Object.getOwnPropertyDescriptor, La = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? no(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && so(e, i, a), a;
};
const oo = {
  type: "custom:component-room-navigation-v1",
  name: "Room",
  icon: "mdi:home-outline"
};
let Re = class extends E {
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
    super.setConfig({ ...oo, ...t }), this.hass && this._loadRegistry();
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
    this._registryHass = t, this._unsubRegistry = G.subscribe(t, (e) => {
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
      const e = await G.load(t);
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
    const e = Ia(t, this._registries, this.hass);
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
    t && this._config?.navigation_path ? (this._interactionHandle?.destroy(), this._interactionHandle = T(t, {
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
Re.styles = ao;
La([
  x()
], Re.prototype, "_registries", 2);
Re = La([
  k("component-room-navigation-v1")
], Re);
A({
  type: "component-room-navigation-v1",
  element: Re,
  name: "Room Navigation",
  description: "Area-aware room navigation with presence status."
});
const co = [
  z,
  P,
  W,
  U,
  Ve,
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
var lo = Object.getOwnPropertyDescriptor, ho = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? lo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const po = {
  type: "custom:component-room-sheet-v2",
  icon: "mdi:bed-king-outline",
  title: "Room name",
  rows: null
}, aa = [
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
let wi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...po, ...t });
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
    this._interactionHandles = [], (Array.isArray(this._config?.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : aa).forEach((e, i) => {
      const r = this._getAction(e);
      if (!r) return;
      const a = this.renderRoot.querySelector(
        `[data-row="${i}"]`
      );
      a && (a.setAttribute(
        "aria-label",
        e.aria_label || `${e.name || "Room control"}`
      ), this._interactionHandles.push(
        T(a, {
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
    const t = Array.isArray(this._config.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : aa;
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
      const a = i.entity && this.hass?.states ? this.hass.states[i.entity] : null, s = i.entity ? ht(i.entity) : "", n = a && (!i.name || i.name === "Control name" || i.name === "Status metric") ? Et({ state: a }) : i.name || "Control name", c = a && (!i.state || i.state === "Current state" || i.state === "Supporting context") ? X(a, this.hass) : i.state || "", l = a && (!i.icon || i.icon === "mdi:circle-outline") ? a.attributes.icon || xe(s, a.state) : i.icon || "mdi:circle-outline", d = i.value || "", f = i.section || "Controls", g = f !== e;
      g && (e = f);
      const h = this._getAction(i), u = i.aria_label || `${n}: ${c || d}`;
      return o`
                ${g ? o`<div class="sep">${this.esc(f)}</div>` : ""}
                ${h ? o`
                        <button
                          class="row actionable"
                          data-row="${r}"
                          type="button"
                          aria-label="${this.esc(u)}"
                        >
                          <ha-icon icon="${this.esc(l)}"></ha-icon>
                          <span>
                            <div class="rname">${this.esc(n)}</div>
                            ${c ? o`<div class="rstate">${this.esc(c)}</div>` : ""}
                          </span>
                          ${d ? o`<span class="rvalue">${this.esc(d)}</span>` : ""}
                        </button>
                      ` : o`
                        <div
                          class="row"
                          data-row="${r}"
                          aria-label="${this.esc(u)}"
                        >
                          <ha-icon icon="${this.esc(l)}"></ha-icon>
                          <span>
                            <div class="rname">${this.esc(n)}</div>
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
wi.styles = co;
wi = ho([
  k("component-room-sheet-v2")
], wi);
A({
  type: "component-room-sheet-v2",
  element: wi,
  name: "Room Sheet",
  description: "Reusable room-sheet component."
});
const uo = [
  z,
  P,
  ct,
  U,
  W,
  Fe,
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
var mo = Object.defineProperty, go = Object.getOwnPropertyDescriptor, yr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? go(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && mo(e, i, a), a;
};
const fo = {
  type: "custom:component-control-row-v2",
  icon: "mdi:lightbulb-outline",
  title: "Control name",
  state: "Current state",
  mode: "slider",
  value: 68,
  entity: null
};
let ce = class extends E {
  constructor() {
    super(...arguments), this._on = !0, this._val = 68, this._interactionHandles = [], this._coalescer = null;
  }
  setConfig(t) {
    super.setConfig({ ...fo, ...t }), this._on = this._config?.on !== !1, this._val = Math.max(0, Math.min(100, Number(this._config?.value) || 68)), this._resetCoalescer();
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
        Math.min(
          100,
          Math.round(Number(t.attributes?.volume_level ?? 0) * 100)
        )
      );
    if (e === "climate") {
      const r = Number(t.attributes?.min_temp ?? 16), a = Number(t.attributes?.max_temp ?? 30), s = Number(t.attributes?.temperature ?? r);
      if (a > r)
        return Math.max(0, Math.min(100, (s - r) / (a - r) * 100));
    }
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
    return this._coalescer ? this._coalescer : (this._coalescer = pr(
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
      return S(this.hass, {
        domain: i.domain,
        service: i.service,
        data: { ...i.data || {}, [a]: t },
        target: { entity_id: e }
      });
    }
    const r = this._domain();
    if (r === "light")
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
    if (r === "fan")
      return S(this.hass, {
        domain: "fan",
        service: "set_percentage",
        data: { percentage: Math.round(t) },
        target: { entity_id: e }
      });
    if (r === "cover")
      return S(this.hass, {
        domain: "cover",
        service: "set_cover_position",
        data: { position: Math.round(t) },
        target: { entity_id: e }
      });
    if (r === "media_player")
      return S(this.hass, {
        domain: "media_player",
        service: "set_volume_level",
        data: { volume_level: Math.round(t) / 100 },
        target: { entity_id: e }
      });
    if (r === "climate") {
      const a = this._getState(), s = Number(a?.attributes?.min_temp ?? 16), n = Number(a?.attributes?.max_temp ?? 30), c = Number(a?.attributes?.target_temp_step ?? 0.5);
      let l = s + (n - s) * t / 100;
      return l = Number((Math.round(l / c) * c).toFixed(1)), S(this.hass, {
        domain: "climate",
        service: "set_temperature",
        data: { temperature: l },
        target: { entity_id: e }
      });
    }
    if (r === "number" || r === "input_number") {
      const a = this._getState(), s = Number(a?.attributes?.min ?? 0), n = Number(a?.attributes?.max ?? 100), c = s + (n - s) * t / 100;
      return S(this.hass, {
        domain: r,
        service: "set_value",
        data: { value: c },
        target: { entity_id: e }
      });
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
    const t = this._config?.mode || "slider", e = !!this._config?.entity, i = this._getState(), r = e ? this._available(i) : !0, a = e ? i?.state === "on" : this._on;
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
      d && (d.disabled = !r, d.oninput = () => {
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
        c.setAttribute("aria-pressed", String(a)), c.setAttribute(
          "aria-label",
          `${a ? "Turn off" : "Turn on"} ${this._config?.title}`
        );
        const l = c.querySelector(".switch");
        this._interactionHandles.push(
          T(c, {
            primary: () => this._toggle(a),
            hold: () => this.moreInfo(this._config?.entity),
            optimistic: {
              capture: () => a,
              apply: () => {
                const d = !a;
                this._on = d, c.setAttribute("aria-pressed", String(d)), l?.classList.toggle("on", d);
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
        T(c, {
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
                >
                  ${l}
                </button>
              ` : o`<div class="row row-static">${l}</div>`}
      </ha-card>
    `;
  }
};
ce.styles = uo;
yr([
  x()
], ce.prototype, "_on", 2);
yr([
  x()
], ce.prototype, "_val", 2);
ce = yr([
  k("component-control-row-v2")
], ce);
A({
  type: "component-control-row-v2",
  element: ce,
  name: "Control Row",
  description: "Reusable control-row component."
});
const bo = [
  z,
  P,
  ct,
  U,
  W,
  Ut,
  K,
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
var vo = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, Ni = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? _o(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && vo(e, i, a), a;
};
const ri = { pause: 1, previous: 16, next: 32, play: 512 }, yo = {
  type: "custom:component-media-row-v2",
  icon: "mdi:speaker",
  title: "Media player",
  state: "Playing · Media title",
  entity: null
};
let Rt = class extends E {
  constructor() {
    super(...arguments), this._playing = !0, this._optimisticPlaying = null, this._busy = !1, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...yo, ...t }), this._playing = !0, this._optimisticPlaying = null, this._busy = !1;
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
        T(s, {
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
    const a = this.renderRoot.querySelector(
      ".main"
    );
    a && (t ? this._interactionHandles.push(
      T(a, {
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
      T(a, {
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
    const t = this._liveState(), e = !!this._config.entity, i = e && this._available(t), r = i ? t?.state === "playing" : this._playing, a = this._optimisticPlaying ?? r, s = i && this._supported(t, ri.previous), n = i && this._supported(t, ri.next), c = !this._busy && (!e || i && this._supported(
      t,
      a ? ri.pause : ri.play
    ));
    return o`
      <ha-card class="surface-card">
        <div class="header-row media-row">
          <div class="icon-well control-radius icon">
            <ha-icon icon="${this.esc(this._config.icon)}"></ha-icon>
          </div>
          ${e ? o`
                  <button class="identity" type="button">
                    <div class="label-title title">
                      ${this.esc(this._config.title)}
                    </div>
                    <div class="label-sub desc">
                      ${this.esc(this._description(t))}
                    </div>
                  </button>
                ` : o`
                  <div class="copy-block">
                    <div class="label-title title">
                      ${this.esc(this._config.title)}
                    </div>
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
                      ?disabled=${!s}
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
              aria-label="${a ? "Pause" : "Play"}"
              ?disabled=${!c}
            >
              <ha-icon icon="mdi:${a ? "pause" : "play"}"></ha-icon>
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
Rt.styles = bo;
Ni([
  x()
], Rt.prototype, "_playing", 2);
Ni([
  x()
], Rt.prototype, "_optimisticPlaying", 2);
Ni([
  x()
], Rt.prototype, "_busy", 2);
Rt = Ni([
  k("component-media-row-v2")
], Rt);
A({
  type: "component-media-row-v2",
  element: Rt,
  name: "Media Row",
  description: "Reusable media-row component."
});
const xo = [
  ur,
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
var wo = Object.defineProperty, $o = Object.getOwnPropertyDescriptor, xr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? $o(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && wo(e, i, a), a;
};
const Co = "custom:auto-entities", sa = (t) => JSON.parse(JSON.stringify(t));
let le = class extends E {
  constructor() {
    super(...arguments), this._innerCard = null, this._innerError = !1, this._generation = 0, this._retryTimer = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.filter) throw new Error("An Auto-Entities filter is required");
    super.setConfig(sa(t)), this._generation += 1, this._retryTimer && clearTimeout(this._retryTimer), this._retryTimer = null, this._buildCard();
  }
  getCardSize() {
    const t = !!this._config?.header?.title?.trim();
    return (typeof this._innerCard?.getCardSize == "function" && Number(this._innerCard.getCardSize()) || 1) + (t ? 1 : 0);
  }
  getLayoutOptions() {
    return this._innerCard?.getLayoutOptions?.() ?? {};
  }
  _cardConfig() {
    const t = sa(
      this._config || {}
    ), e = t.exclude_invalid_states !== !1;
    delete t.header, delete t.exclude_invalid_states, t.type = Co;
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
le.styles = xo;
xr([
  x()
], le.prototype, "_innerCard", 2);
xr([
  x()
], le.prototype, "_innerError", 2);
le = xr([
  k("component-device-aware-auto-entities-v1")
], le);
A({
  type: "component-device-aware-auto-entities-v1",
  element: le,
  name: "Device Aware Auto Entities",
  description: "Presentation wrapper for Auto-Entities collections."
});
const ko = [
  z,
  P,
  W,
  U,
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
var So = Object.defineProperty, Ao = Object.getOwnPropertyDescriptor, wr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Ao(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && So(e, i, a), a;
};
const Eo = {
  type: "custom:component-device-discovery-v2",
  demo: !1,
  refresh_seconds: 60,
  max_rows: 6
}, Do = [
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
let de = class extends E {
  constructor() {
    super(...arguments), this._flows = [], this._stateKind = "ready", this._timer = null, this._started = !1, this._loadGeneration = 0, this._interactionHandles = [];
  }
  setConfig(t) {
    const e = !!this._config?.demo;
    if (super.setConfig({ ...Eo, ...t }), this._config?.demo) {
      (!e || this._started) && (this._timer && clearInterval(this._timer), this._timer = null, this._started = !1, this._loadGeneration += 1), this._flows = Do, this._stateKind = "ready";
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
      T(t, { primary: () => this.load(), feedback: !0 })
    );
    const e = this.renderRoot.querySelector(
      "button.refresh"
    );
    e && this._interactionHandles.push(
      T(e, { primary: () => this.load(), feedback: !0 })
    ), this.renderRoot.querySelectorAll("button.row").forEach((r) => {
      this._interactionHandles.push(
        T(r, {
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
de.styles = ko;
wr([
  x()
], de.prototype, "_flows", 2);
wr([
  x()
], de.prototype, "_stateKind", 2);
de = wr([
  k("component-device-discovery-v2")
], de);
A({
  type: "component-device-discovery-v2",
  element: de,
  name: "Device Discovery",
  description: "Reusable device-discovery status component."
});
const To = [
  z,
  P,
  W,
  U,
  ct,
  ut,
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
var zo = Object.defineProperty, Po = Object.getOwnPropertyDescriptor, Li = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Po(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && zo(e, i, a), a;
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
let Ht = class extends E {
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
    for (const r of this._interactionHandles) r.destroy();
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
Ht.styles = To;
Li([
  x()
], Ht.prototype, "_busy", 2);
Li([
  x()
], Ht.prototype, "_requested", 2);
Li([
  x()
], Ht.prototype, "_error", 2);
Ht = Li([
  k("component-update-row-v3")
], Ht);
A({
  type: "component-update-row-v3",
  element: Ht,
  name: "Update Row",
  description: "Reusable update row with live update support."
});
const Io = [
  z,
  P,
  W,
  ut,
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
var Ro = Object.defineProperty, Ho = Object.getOwnPropertyDescriptor, $r = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Ho(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Ro(e, i, a), a;
};
const No = {
  type: "custom:component-update-summary-v3",
  count: "3",
  title: "updates available",
  message: "Review the items below before installing.",
  live_updates: !1,
  update_all: !1,
  confirm: !0
};
let he = class extends E {
  constructor() {
    super(...arguments), this._busy = !1, this._error = "", this._messageTimer = null, this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...No, ...t });
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
      r.length && await S(this.hass, {
        domain: "update",
        service: "install",
        target: { entity_id: r }
      });
      for (const a of i)
        t.some((s) => s.entity_id === a) && await S(this.hass, {
          domain: "update",
          service: "install",
          target: { entity_id: a }
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
he.styles = Io;
$r([
  x()
], he.prototype, "_busy", 2);
$r([
  x()
], he.prototype, "_error", 2);
he = $r([
  k("component-update-summary-v3")
], he);
A({
  type: "component-update-summary-v3",
  element: he,
  name: "Update Summary",
  description: "Reusable update summary with live update support."
});
const Lo = [
  z,
  P,
  W,
  Ut,
  U,
  Ss,
  Fe,
  At,
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
      box-shadow:
        0 0 0 1px var(--action-glow-color),
        0 0 12px 2.5px
          color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
var Mo = Object.defineProperty, qo = Object.getOwnPropertyDescriptor, Mi = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? qo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Mo(e, i, a), a;
};
const Uo = Object.freeze([
  ["up", "Up", "mdi:chevron-up"],
  ["left", "Left", "mdi:chevron-left"],
  ["select", "Select", "mdi:circle"],
  ["right", "Right", "mdi:chevron-right"],
  ["down", "Down", "mdi:chevron-down"]
]), jo = Object.freeze([
  ["menu", "Menu", "mdi:menu"],
  ["home", "Home", "mdi:home-outline"],
  ["top_menu", "Top menu", "mdi:format-list-bulleted"]
]);
let Nt = class extends E {
  constructor() {
    super(...arguments), this._activePanel = null, this._actionError = null, this._busyAction = null, this._inFlightActions = /* @__PURE__ */ new Set(), this._lastFocused = null, this._backdropMouseDown = !1;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.entity && !t?.demo)
      throw new Error("An Apple TV media_player entity is required");
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
    t.has("_activePanel") && this._activePanel && this.updateComplete.then(
      () => this.renderRoot.querySelector("[data-dialog-close]")?.focus()
    );
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
    for (const i of this.renderRoot.querySelectorAll(
      "[data-remote-command='wakeup'], [data-remote-command='suspend']"
    ))
      i.setAttribute("aria-busy", String(t)), i.disabled = t || !this._remoteAvailable(), e ? i.setAttribute("data-interaction-error", "true") : i.removeAttribute("data-interaction-error");
  }
  async _callService(t, e, i, r, a) {
    if (!(!this.hass || !this._serviceSupported(e, i) || a && !this._isAvailable(a) || this._inFlightActions.has(t))) {
      this._inFlightActions.add(t), this._busyAction = t, t === "remote:power" && this._setPowerActionFeedback(!0), this._actionError = null;
      try {
        await S(this.hass, {
          domain: e,
          service: i,
          data: r,
          target: a ? { entity_id: a } : void 0
        });
      } catch {
        this._actionError = "Action failed. Check that the Apple TV is available.", t === "remote:power" && this._setPowerActionFeedback(!0, !0);
      } finally {
        this._inFlightActions.delete(t), this._busyAction === t && (this._busyAction = null), t === "remote:power" && this._setPowerActionFeedback(!1, this._actionError !== null);
      }
    }
  }
  _mediaAction(t) {
    return this._callService(
      `media:${t}`,
      "media_player",
      t,
      void 0,
      this._config?.entity
    );
  }
  _remoteAction(t) {
    return this._callService(
      `remote:${t === "wakeup" || t === "suspend" ? "power" : t}`,
      "remote",
      "send_command",
      { command: t },
      this._remoteEntity()
    );
  }
  async _keyboardAction(t) {
    const e = this._config;
    if (!e?.keyboard_entity || !e.keyboard_config_entry_id || !this._isAvailable(e.keyboard_entity))
      return;
    const i = this.renderRoot.querySelector(".keyboard input"), r = {
      config_entry_id: e.keyboard_config_entry_id
    };
    if (t === "set_keyboard_text") {
      if (!i?.value.trim()) return;
      r.text = i.value;
    } else i && (i.value = "");
    await this._callService(`keyboard:${t}`, "apple_tv", t, r);
  }
  render() {
    if (!this._config) return o``;
    const t = this._config.entity || "media_player.demo_apple_tv", e = this.hass?.states?.[t], i = e?.attributes || {}, r = e?.state === "playing", a = this._mediaAvailable("toggle"), s = this._config.title || i.friendly_name || "Apple TV", n = e?.state === "unavailable" || e?.state === "unknown" ? "Unavailable" : [
      r ? "Playing" : e?.state === "off" ? "Off" : "Idle",
      i.app_name || i.media_title
    ].filter(Boolean).join(" · "), c = Array.isArray(i.source_list) ? i.source_list.length : 0;
    return o`
      <ha-card>
        <div class="apple-card">
          <div class="apple-header">
            <button
              class="icon-well control-radius apple-more-info"
              type="button"
              aria-label="Show ${s} details"
              @click=${() => this.moreInfo(this._config?.entity)}
            >
              <ha-icon icon=${i.icon || "mdi:apple"}></ha-icon>
            </button>
            <div class="copy-block">
              <div class="label-title">${this.esc(s)}</div>
              <div class="label-sub" role="status">
                ${this.esc(n || "Idle")}
              </div>
            </div>
            <div class="apple-header-actions">
              <button
                class="btn-icon-44 ${r ? "on" : ""}"
                type="button"
                aria-label="Play or pause"
                ?disabled=${!this._mediaAvailable("media_play_pause")}
                @click=${() => void this._mediaAction("media_play_pause")}
              >
                <ha-icon
                  class="sm"
                  icon="${r ? "mdi:pause" : "mdi:play"}"
                ></ha-icon>
              </button>
              <button
                class="btn-icon-44"
                type="button"
                aria-label="Volume down"
                ?disabled=${!this._mediaAvailable("volume_down")}
                @click=${() => void this._mediaAction("volume_down")}
              >
                <ha-icon class="sm" icon="mdi:volume-minus"></ha-icon>
              </button>
              <button
                class="btn-icon-44"
                type="button"
                aria-label="Volume up"
                ?disabled=${!this._mediaAvailable("volume_up")}
                @click=${() => void this._mediaAction("volume_up")}
              >
                <ha-icon class="sm" icon="mdi:volume-plus"></ha-icon>
              </button>
              <button
                class="btn-icon-44 ${a ? "on" : ""}"
                type="button"
                aria-label="Toggle Apple TV power"
                aria-pressed=${String(e?.state !== "off")}
                ?disabled=${!a}
                @click=${() => void this._mediaAction("toggle")}
              >
                <ha-icon class="sm" icon="mdi:power"></ha-icon>
              </button>
            </div>
          </div>
          <div class="apple-launchers">
            <button
              class="btn-action-pill apple-launcher launcher"
              type="button"
              @click=${(l) => this._openPanel("remote", l)}
            >
              <div class="icon-well control-radius apple-launch-icon">
                <ha-icon class="sm" icon="mdi:remote"></ha-icon>
              </div>
              <div class="copy-block apple-launch-copy">
                <div class="label-title">Remote</div>
                <div class="label-sub">Navigation</div>
              </div>
            </button>
            <button
              class="btn-action-pill apple-launcher launcher"
              type="button"
              ?disabled=${!a}
              @click=${(l) => this._openPanel("apps", l)}
            >
              <div class="icon-well control-radius apple-launch-icon">
                <ha-icon class="sm" icon="mdi:apps"></ha-icon>
              </div>
              <div class="copy-block apple-launch-copy">
                <div class="label-title">Apps</div>
                <div class="label-sub">
                  ${c ? `${c} available` : "Sources"}
                </div>
              </div>
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
    const t = this._remoteAvailable(), e = this._config?.entity || "media_player.demo_apple_tv", r = this.hass?.states?.[e]?.attributes || {}, a = r.volume_level !== void 0 ? Math.round(Number(r.volume_level) * 100) : null, s = [
      null,
      "up",
      null,
      "left",
      "select",
      "right",
      null,
      "down",
      null
    ], n = new Map(
      Uo.map((d) => [d[0], d])
    ), c = !!(this._config?.keyboard_entity && this._config?.keyboard_config_entry_id), l = !!(this._config?.demo || this._config?.keyboard_entity && this._isAvailable(this._config.keyboard_entity) && this.hass?.states?.[this._config.keyboard_entity]?.state === "on");
    return o`<section
      class="remote"
      @click=${(d) => d.stopPropagation()}
      @mousedown=${(d) => d.stopPropagation()}
    >
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
      ${a !== null ? o`<div
              class="volume-row"
              @click=${(d) => d.stopPropagation()}
              @mousedown=${(d) => d.stopPropagation()}
            >
              <button
                class="btn-icon-30"
                type="button"
                aria-label="Toggle mute"
                @click=${(d) => {
      d.stopPropagation(), this._callService(
        "media:volume_mute",
        "media_player",
        "volume_mute",
        { is_volume_muted: !r.is_volume_muted },
        this._config?.entity
      );
    }}
              >
                <ha-icon
                  icon="${r.is_volume_muted ? "mdi:volume-off" : "mdi:volume-high"}"
                ></ha-icon>
              </button>
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(a)}
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
              <span class="volume-val">${a}%</span>
            </div>` : ""}
      <div
        class="dpad dpad-cluster"
        role="group"
        aria-label="Apple TV directional remote"
        tabindex=${t ? "0" : "-1"}
        @keydown=${(d) => this._handleRemoteKey(d, t)}
      >
        ${s.map((d) => {
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
        ${jo.map(
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
      ${c ? o`<div
              class="keyboard"
              @click=${(d) => d.stopPropagation()}
              @mousedown=${(d) => d.stopPropagation()}
            >
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
    const r = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      Enter: "select",
      " ": "select"
    }[t.key];
    r && (t.preventDefault(), this._remoteAction(r));
  }
  _renderApps() {
    const t = this._config?.entity || "media_player.demo_apple_tv", e = this.hass?.states?.[t]?.attributes, i = e?.source_list, r = e?.source, a = Array.isArray(i) ? i.filter((s) => typeof s == "string") : [];
    return a.length ? o`<div
          class="app-grid"
          @click=${(s) => s.stopPropagation()}
          @mousedown=${(s) => s.stopPropagation()}
        >
          ${a.map(
      (s) => o`<button
                class="app-btn ${s === r ? "active" : ""}"
                type="button"
                aria-pressed=${String(s === r)}
                @click=${(n) => {
        n.stopPropagation(), this._callService(
          `source:${s}`,
          "media_player",
          "select_source",
          { source: s },
          this._config?.entity
        );
      }}
              >
                <ha-icon icon="mdi:play-box-outline"></ha-icon>
                <span>${this.esc(s)}</span>
              </button>`
    )}
        </div>` : o`<p class="empty-copy">
          No app sources are currently exposed by this Apple TV.
        </p>`;
  }
};
Nt.styles = Lo;
Mi([
  x()
], Nt.prototype, "_activePanel", 2);
Mi([
  x()
], Nt.prototype, "_actionError", 2);
Mi([
  x()
], Nt.prototype, "_busyAction", 2);
Nt = Mi([
  k("component-apple-tv-controller-v1")
], Nt);
A({
  type: "component-apple-tv-controller-v1",
  element: Nt,
  name: "Apple TV Controller",
  description: "Apple TV media, remote and source controls with the established dashboard presentation."
});
const Bo = [
  z,
  P,
  W,
  Ut,
  U,
  At,
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
var Fo = Object.defineProperty, Vo = Object.getOwnPropertyDescriptor, jt = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Vo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Fo(e, i, a), a;
};
let nt = class extends E {
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
      const r = await We(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      if (e !== this._sequence || i !== this.hass) return;
      this._model = r, this._camera = r.cameras.find(
        (a) => a.entityId === this._config?.entity || a.deviceId === this._config?.device_id
      ) || r.cameras[0] || null;
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
      const e = this.renderRoot.querySelector(
        "dialog"
      );
      if (!(!e || e.open))
        try {
          e.showModal(), e.querySelector(".close")?.focus();
        } catch {
          this._controlsOpener = null;
        }
    });
  }
  _closeControls() {
    const t = this.renderRoot.querySelector(
      "dialog"
    );
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
    const i = t.entity.entity_id, r = this.hass?.states[i];
    if (!this.hass || !bt(r) || this._busyActionId) return;
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
    if (!(!this.hass || !bt(e) || this._busyActionId)) {
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
        @mousedown=${(s) => {
      const n = this.renderRoot.querySelector("dialog");
      if (n && s.target === n) {
        const c = n.getBoundingClientRect();
        c.top <= s.clientY && s.clientY <= c.top + c.height && c.left <= s.clientX && s.clientX <= c.left + c.width || this._closeControls();
      }
    }}
      >
        <div
          class="sheet"
          @click=${(s) => s.stopPropagation()}
          @mousedown=${(s) => s.stopPropagation()}
        >
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
      const i = e.entity.entity_id, r = this.hass?.states[i], a = r?.attributes?.entity_picture, s = r?.last_updated, n = s && new Date(s), c = n && Number.isFinite(n.getTime()) ? Ai(this.hass, n, {
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
      const i = e.entity.entity_id, r = this.hass?.states[i], a = r?.state === "on", s = this._confirmId === i, n = bt(r), c = this._busyActionId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.role || "Control")}</span
                            >
                            <span class="control-state"
                              >${n ? c ? "Working…" : a ? "On" : "Off" : "Unavailable"}</span
                            >
                          </span>
                          <button
                            class="${a ? "on" : ""} ${s ? "confirm" : ""}"
                            type="button"
                            ?disabled=${!n || !!this._busyActionId}
                            aria-busy=${c ? "true" : "false"}
                            @click=${() => this._toggleSwitch(e, a)}
                          >
                            ${c ? "Working…" : s ? "Confirm off" : a ? "On" : "Off"}
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
      const i = e.entity.entity_id, r = this._confirmId === i, a = bt(
        this.hass?.states[i]
      ), s = this._busyActionId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.entity.name || e.entity.original_name || "Action")}</span
                            >
                            <span class="control-state"
                              >${a ? s ? "Working…" : "Available" : "Unavailable"}</span
                            >
                          </span>
                          <button
                            class="${r ? "confirm" : ""}"
                            type="button"
                            ?disabled=${!a || !!this._busyActionId}
                            aria-busy=${s ? "true" : "false"}
                            @click=${() => this._pressAction(i)}
                          >
                            ${s ? "Working…" : r ? "Confirm" : "Run"}
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
      const i = e.entity_id, r = this.hass?.states[i], a = bt(r), s = this._busyActionId === i, n = e.name || e.original_name || "PTZ Control", c = i.split(".")[0];
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name">${this.esc(n)}</span>
                            <span class="control-state"
                              >${a ? s ? "Working…" : r?.state || "Available" : "Unavailable"}</span
                            >
                          </span>
                          <button
                            type="button"
                            ?disabled=${!a || !!this._busyActionId}
                            aria-busy=${s ? "true" : "false"}
                            @click=${() => {
        c === "button" ? this._pressAction(i) : this.moreInfo(i);
      }}
                          >
                            <span
                              >${c === "button" ? "Move" : "Adjust"}</span
                            >
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
nt.stubConfig = { profile: "household-security" };
nt.styles = Bo;
jt([
  x()
], nt.prototype, "_model", 2);
jt([
  x()
], nt.prototype, "_camera", 2);
jt([
  x()
], nt.prototype, "_confirmId", 2);
jt([
  x()
], nt.prototype, "_busyActionId", 2);
jt([
  x()
], nt.prototype, "_actionError", 2);
nt = jt([
  k("component-camera-controller-v2")
], nt);
A({
  type: "component-camera-controller-v2",
  element: nt,
  name: "Camera Controller V2",
  description: "Platform-adapted camera controls with explicit state and protected destructive changes."
});
let Xi = class extends nt {
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      ...t,
      type: "custom:component-camera-controller-v1"
    });
  }
};
Xi = jt([
  k("component-camera-controller-v1")
], Xi);
A({
  type: "component-camera-controller-v1",
  element: Xi,
  name: "Camera Controller V1",
  description: "Legacy camera controller adapter registering custom:component-camera-controller-v1."
});
const Wo = [
  z,
  K,
  P,
  W,
  U,
  At,
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
var Go = Object.defineProperty, Ko = Object.getOwnPropertyDescriptor, Ge = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Ko(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Go(e, i, a), a;
};
let Ct = class extends E {
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
    const t = this._entityState(this._config?.entity), e = this._entityState(this._controlEntityId()), i = this._entityState(this._config?.availability_entity), r = !!this._config?.availability_entity && (!i || i.state !== "on") || !e || Z(e), a = String(t?.state || "unknown").toLowerCase(), s = a === "on" || a === "off", n = s && a === "off", c = s && a === "on", l = !t || Z(t);
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
      if (s === "cover" ? await S(this.hass, {
        domain: "cover",
        service: "toggle",
        target: { entity_id: a }
      }) : s === "switch" ? await S(this.hass, {
        domain: "switch",
        service: "toggle",
        target: { entity_id: a }
      }) : s === "button" ? await S(this.hass, {
        domain: "button",
        service: "press",
        target: { entity_id: a }
      }) : s === "script" ? await S(this.hass, {
        domain: "script",
        service: "turn_on",
        target: { entity_id: a }
      }) : await S(this.hass, {
        domain: "homeassistant",
        service: "toggle",
        target: { entity_id: a }
      }), i !== this._requestGeneration) return;
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
    const t = this._status(), i = (t.state?.attributes?.friendly_name || "").replace(/\s*Garage Door Status$/i, "").trim(), r = this._config.title || i || "Garage door", a = t.controllerUnavailable ? "Controller unavailable" : t.closed ? "Closed" : t.notClosed ? "Not closed" : t.stateUnavailable ? "Door state unavailable" : "Door state unknown", s = t.closed ? "Open" : "Trigger", n = t.controllerUnavailable || this._busy;
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
                  >${this.esc(a)}</span
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
Ct.styles = Wo;
Ge([
  x()
], Ct.prototype, "_busy", 2);
Ge([
  x()
], Ct.prototype, "_pendingLabel", 2);
Ge([
  x()
], Ct.prototype, "_message", 2);
Ge([
  x()
], Ct.prototype, "_messageType", 2);
Ct = Ge([
  k("component-garage-door-controller-v1")
], Ct);
A({
  type: "component-garage-door-controller-v1",
  element: Ct,
  name: "Garage Door Controller",
  description: "A garage-door controller for a closed-position reed sensor and momentary operator trigger."
});
const Yo = [
  z,
  K,
  P,
  W,
  Ut,
  U,
  Fe,
  Ve,
  At,
  mt,
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
      box-shadow:
        0 0 0 1px var(--action-glow-color),
        0 0 12px 2.5px
          color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
      box-shadow:
        0 0 0 1px var(--action-glow-color),
        0 0 12px 2.5px
          color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
var Qo = Object.defineProperty, Zo = Object.getOwnPropertyDescriptor, Cr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Zo(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Qo(e, i, a), a;
};
const J = (t) => !t || ["unknown", "unavailable"].includes(t.state), dt = (t) => {
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
  }, r = e.toLowerCase();
  return i[r] ? i[r] : e.replaceAll("_", " ").split(" ").map((a) => a.charAt(0).toUpperCase() + a.slice(1).toLowerCase()).join(" ");
}, Qt = (t) => Number.isFinite(Number(t)) ? Number(t).toFixed(Number(t) % 1 ? 1 : 0) + "°" : "—", ni = /* @__PURE__ */ new Map(), Ma = (t) => `ha_split_resume_${t}`, Jo = (t) => {
  if (ni.has(t))
    return ni.get(t);
  try {
    const e = typeof localStorage < "u" ? localStorage.getItem(Ma(t)) : null;
    if (e) {
      const i = JSON.parse(e);
      if (i && typeof i.hvacMode == "string")
        return ni.set(t, i), i;
    }
  } catch {
  }
  return null;
}, Xo = (t, e) => {
  ni.set(t, e);
  try {
    typeof localStorage < "u" && localStorage.setItem(Ma(t), JSON.stringify(e));
  } catch {
  }
};
let pe = class extends E {
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
    if (!t || J(t) || t.state === "off") return;
    const e = t.attributes || {}, i = this._vanes().find((s) => s.axis === "Vertical"), r = this._vanes().find((s) => s.axis === "Horizontal"), a = {
      hvacMode: t.state,
      temperature: Number.isFinite(Number(e.temperature)) ? Number(e.temperature) : void 0,
      fanMode: e.fan_mode ? String(e.fan_mode) : void 0,
      swingMode: e.swing_mode ? String(e.swing_mode) : void 0,
      swingHorizontalMode: e.swing_horizontal_mode ? String(e.swing_horizontal_mode) : void 0,
      verticalVaneOption: i?.entity ? i.current : void 0,
      horizontalVaneOption: r?.entity ? r.current : void 0,
      updatedAt: Date.now()
    };
    Xo(this._config.entity, a);
  }
  async _power() {
    if (!this._config?.entity || !this.hass) return;
    const t = this._state();
    if (!t || J(t)) return;
    if (t.state === "off") {
      const i = Jo(this._config.entity), r = t.attributes?.hvac_modes || [], a = i?.hvacMode && r.includes(i.hvacMode) && i.hvacMode !== "off" ? i.hvacMode : r.includes("cool") ? "cool" : r.includes("heat") ? "heat" : r.find((s) => s !== "off") || "cool";
      try {
        await S(this.hass, {
          domain: "climate",
          service: "set_hvac_mode",
          data: { hvac_mode: a },
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
    return this._tempCoalescer ? this._tempCoalescer : (this._tempCoalescer = pr(
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
    const e = this._state()?.attributes || {}, i = Number(e.temperature), r = this._optimisticTemp ?? (Number.isFinite(i) ? i : 21), a = Number(e.target_temp_step || e.step) || 0.5, s = Number(e.min_temp) || 16, n = Number(e.max_temp) || 31, c = Math.min(
      n,
      Math.max(s, Number((r + t * a).toFixed(1)))
    );
    this._optimisticTemp = c, this._getTempCoalescer().request(c);
  }
  _vanes() {
    const t = [], i = this._state()?.attributes || {}, r = this._config?.entity?.replace(/^climate\./, "") || "", a = this._config?.vertical_vane_entity || this._config?.vertical_vane || (this.hass?.states?.[`select.${r}_vertical_vane`] ? `select.${r}_vertical_vane` : void 0) || (this.hass?.states?.[`select.${r}_vane_vertical`] ? `select.${r}_vane_vertical` : void 0), s = this._config?.horizontal_vane_entity || this._config?.horizontal_vane || (this.hass?.states?.[`select.${r}_horizontal_vane`] ? `select.${r}_horizontal_vane` : void 0) || (this.hass?.states?.[`select.${r}_vane_horizontal`] ? `select.${r}_vane_horizontal` : void 0);
    if (a) {
      const n = this._state(a);
      n && !J(n) && t.push({
        axis: "Vertical",
        entity: a,
        state: n,
        options: n.attributes?.options || [],
        current: n.state
      });
    }
    if (s) {
      const n = this._state(s);
      n && !J(n) && t.push({
        axis: "Horizontal",
        entity: s,
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
    const t = this._state(), e = t?.attributes || {}, i = t && !J(t) && t.state !== "off", r = this._state(this._config.timer_entity), s = this._vanes().map((h) => `${h.axis.slice(0, 1)} ${dt(h.current)}`).join(" · "), n = this._config.title || e.friendly_name || "Split system", c = J(t) ? "Unavailable" : i ? dt(t?.state) : e.current_temperature !== void 0 ? `Off · ${Qt(e.current_temperature)}` : "Off", l = this._optimisticTemp ?? e.temperature, d = {
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
              <span class="icon-well"
                ><ha-icon icon="${g}"></ha-icon
              ></span>
              <span class="copy-block">
                <span class="label-title">${this.esc(n)}</span>
                <span class="label-sub" role="status"
                  >${this.esc(c)}</span
                >
              </span>
            </button>
            <button
              class="btn-icon-44"
              type="button"
              aria-label="Profiles"
              ?disabled=${J(t)}
              @click=${() => this._openPanel("settings")}
            >
              <ha-icon icon="mdi:account-circle-outline"></ha-icon>
            </button>
            <button
              class="btn-icon-44"
              type="button"
              aria-label="Advanced settings"
              ?disabled=${J(t)}
              @click=${() => this._openPanel("settings")}
            >
              <ha-icon icon="mdi:cog-outline"></ha-icon>
            </button>
            <button
              class="btn-icon-44 power-btn ${i ? "on" : ""}"
              type="button"
              aria-label="Toggle split system power"
              ?disabled=${J(t)}
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
                        >${Qt(e.current_temperature)}</span
                      >
                      <span class="label-sub room-temperature"
                        >Room temperature</span
                      >
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
                        <div class="stepper-main-val">
                          ${Qt(l)}
                        </div>
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
                      aria-label="HVAC mode: ${dt(t?.state)}"
                      ?disabled=${J(t)}
                      @click=${() => this._openPanel("mode")}
                    >
                      <ha-icon icon="${g}"></ha-icon>
                      <span class="action-label"
                        >Mode · ${dt(t?.state)}</span
                      >
                    </button>
                    <button
                      class="btn-action-pill action-pill"
                      type="button"
                      data-panel="fan"
                      aria-expanded="${String(this._activePanel === "fan")}"
                      aria-label="Fan speed: ${dt(e.fan_mode)}"
                      ?disabled=${J(t)}
                      @click=${() => this._openPanel("fan")}
                    >
                      <ha-icon icon="mdi:fan"></ha-icon>
                      <span class="action-label"
                        >Fan · ${dt(e.fan_mode)}</span
                      >
                    </button>
                    ${s ? o`
                            <button
                              class="btn-action-pill action-pill"
                              type="button"
                              data-panel="vanes"
                              aria-expanded="${String(this._activePanel === "vanes")}"
                              aria-label="Vanes: ${s}"
                              ?disabled=${J(t)}
                              @click=${() => this._openPanel("vanes")}
                            >
                              <ha-icon icon="mdi:swap-vertical"></ha-icon>
                              <span class="action-label"
                                >Vanes · ${this.esc(s)}</span
                              >
                            </button>
                          ` : ""}
                    ${this._config.timer_entity ? o`
                            <button
                              class="btn-action-pill action-pill ${r?.state === "active" ? "active" : ""}"
                              type="button"
                              data-panel="timer"
                              aria-expanded="${String(this._activePanel === "timer")}"
                              aria-label="Off timer: ${r?.state === "active" ? "Active" : "Off"}"
                              ?disabled=${J(t) || J(r)}
                              @click=${() => this._openPanel("timer")}
                            >
                              <ha-icon icon="mdi:timer-outline"></ha-icon>
                              <span class="action-label"
                                >${r?.state === "active" ? "Timer · Active" : "Timer"}</span
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
        <div
          class="pd"
          @click=${(i) => i.stopPropagation()}
          @mousedown=${(i) => i.stopPropagation()}
        >
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
                <span
                  ><ha-icon
                    icon="${i[c] || "mdi:thermostat"}"
                  ></ha-icon
                ></span>
                <span>${dt(c)}</span>
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
                <span>${dt(c)}</span>
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
                      <span>${dt(l)}</span>
                      <span class="oi"
                        >${l === c.current ? o`<ha-icon icon="mdi:check"></ha-icon>` : ""}</span
                      >
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
    const r = Number(e.min_temp), a = Number(e.max_temp), s = Number(e.target_temp_step) || 0.5;
    return o`
      <p class="fb">
        Native Home Assistant controls · ${Qt(r)}–${Qt(a)}
        · ${Qt(s)} steps
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
                  <span class="oi"
                    ><ha-icon icon="mdi:chevron-right"></ha-icon
                  ></span>
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
                  <span class="oi"
                    ><ha-icon icon="mdi:chevron-right"></ha-icon
                  ></span>
                </button>
              ` : ""}
      </div>
      ${Array.isArray(e.preset_modes) && e.preset_modes.length > 0 ? o`
              <div class="og">
                <p class="fb" style="margin-bottom: 6px; font-weight: 600;">
                  Preset mode
                </p>
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
                        <span>${dt(n)}</span>
                        <span class="oi"
                          >${n === e.preset_mode ? o`<ha-icon icon="mdi:check"></ha-icon>` : ""}</span
                        >
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
pe.styles = Yo;
Cr([
  x()
], pe.prototype, "_activePanel", 2);
Cr([
  x()
], pe.prototype, "_optimisticTemp", 2);
pe = Cr([
  k("component-split-controller-v4")
], pe);
A({
  type: "component-split-controller-v4",
  element: pe,
  name: "Split-System Controller",
  description: "Direct Home Assistant climate controls with the established Split System presentation."
});
const tc = [
  z,
  K,
  P,
  W,
  Ut,
  U,
  va,
  Fe,
  Ve,
  At,
  mr,
  mt,
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
      box-shadow:
        0 0 0 1px var(--action-glow-color),
        0 0 12px 2.5px
          color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
var ec = Object.defineProperty, ic = Object.getOwnPropertyDescriptor, Bt = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? ic(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && ec(e, i, a), a;
};
let pt = class extends E {
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
    G.load(t).then((e) => {
      this.hass === t && (this._registries = e, this._bundle = this._resolveBundle());
    });
  }
  _bindRegistry() {
    if (!this.hass || this._registryHass === this.hass && this._unsubRegistry) return;
    this._unsubRegistry?.(), this._unsubRegistry = null, this._registryHass = this.hass, this._registries = null, this._bundle = null;
    const t = this.hass;
    this._unsubRegistry = G.subscribe(t, (e) => {
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
    const e = (this._registries?.entities || []).find((_) => _.entity_id === this._config.entity), i = this._config.device_id || e?.device_id, a = ((i ? this._registries?.byDevice?.get(i) : []) || []).filter(
      (_) => _?.platform === "wled" && !_.disabled_by && this.hass?.states[_.entity_id]
    ), s = a.filter((_) => Yi(_.entity_id) === "light"), n = s.find((_) => _.entity_id === this._config.entity) || s.find((_) => Ha(_) === "main") || s[0], c = s.filter(
      (_) => Array.isArray(this.hass?.states[_.entity_id]?.attributes?.effect_list)
    ), l = a.filter(
      (_) => Yi(_.entity_id) === "select"
    ), d = a.filter(
      (_) => Yi(_.entity_id) === "number"
    ), f = (_, D) => D.test(`${_.entity_id} ${_.original_name || ""} ${_.name || ""}`), g = l.find((_) => f(_, /\bpreset\b/i)), h = l.filter(
      (_) => f(_, /color.?palette|colour.?palette/i)
    ), u = d.filter((_) => f(_, /\bspeed\b/i)), p = d.filter((_) => f(_, /\bintensity\b/i)), v = this._registries?.devices?.find((_) => _.id === i), m = n?.entity_id || this._config.entity, b = c.length ? c.map((_) => _.entity_id) : this.hass.states[m]?.attributes?.effect_list ? [m] : [], $ = v?.name_by_user || v?.name || this.hass?.states[m]?.attributes?.friendly_name || "WLED";
    return {
      deviceId: i || void 0,
      deviceName: $,
      main: m,
      effectLights: b,
      preset: g?.entity_id || null,
      palettes: h.map((_) => _.entity_id),
      speeds: u.map((_) => _.entity_id),
      intensities: p.map((_) => _.entity_id)
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
      (r) => r === (i ? "off" : "on"),
      { timeout: 5e3 }
    );
  }
  _getBrightnessCoalescer() {
    return this._brightnessCoalescer ? this._brightnessCoalescer : (this._brightnessCoalescer = pr(
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
      (r) => r != null && !ia.has(String(r).toLowerCase())
    );
    return i.length ? i.every((r) => String(r) === String(i[0])) ? String(i[0]) : "Mixed" : null;
  }
  async _call(t, e, i, r = {}) {
    const a = [...new Set((i || []).filter(Boolean))];
    !this.hass || !a.length || await Promise.all(
      a.map(
        (s) => S(this.hass, {
          domain: t,
          service: e,
          data: r,
          target: { entity_id: s }
        })
      )
    );
  }
  _openAdvanced(t = !1, e) {
    const i = this.renderRoot.querySelector(
      "dialog"
    ), r = this._bundle || this._resolveBundle();
    if (!i || !r) return;
    const a = this.hass?.states?.[r.main];
    if (String(a?.state || "unavailable").toLowerCase() === "on") {
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
    const e = this.hass.states[t.main], i = String(e?.state || "unavailable").toLowerCase(), r = i === "on", a = i === "on" || i === "off", s = r ? Number(e?.attributes?.brightness ?? 0) : 0, n = this._brightnessIntent ?? s, c = this._same(
      t.effectLights,
      (w) => w?.attributes?.effect
    ), l = this._same(t.palettes, (w) => w?.state), d = this._same(t.speeds, (w) => w?.state), f = this._same(t.intensities, (w) => w?.state), g = t.preset ? this.hass.states[t.preset] : null, h = g?.attributes?.options || [], u = r ? [
      this._pct(n),
      c && c !== "Mixed" ? c : null,
      l && l !== "Mixed" ? l : null
    ].filter(Boolean).join(" · ") : i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : "Off", p = (w) => {
      const O = this.hass?.states?.[w];
      return !!(O && !ia.has(String(O.state).toLowerCase()));
    }, v = !!(t.preset && p(t.preset)), m = t.effectLights.some(p), b = t.palettes.some(p), $ = t.speeds.some(p), _ = t.intensities.some(p), H = t.effectLights.map((w) => this.hass?.states[w]).find(Boolean)?.attributes?.effect_list || [], q = t.palettes.map((w) => this.hass?.states[w]).find(Boolean)?.attributes?.options || [];
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
              class="btn-icon-44 power ${r ? "on" : ""}"
              type="button"
              aria-label="Toggle WLED"
              ?disabled=${!a}
              aria-pressed="${String(r)}"
              @click=${() => void this._runAction(() => this._togglePower())}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>
          ${r ? o`
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
      const O = Number(w.target.value);
      this._brightnessIntent = O, this._getBrightnessCoalescer().request(O);
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
                    ?disabled=${!v}
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
                    ?disabled=${!(v || m || b || $ || _)}
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
      const O = this.renderRoot.querySelector("dialog");
      if (O && w.target === O) {
        const j = O.getBoundingClientRect();
        j.top <= w.clientY && w.clientY <= j.top + j.height && j.left <= w.clientX && w.clientX <= j.left + j.width || O.close();
      }
    }}
      >
        <div
          class="sheet"
          @click=${(w) => w.stopPropagation()}
          @mousedown=${(w) => w.stopPropagation()}
        >
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
      const O = String(g?.state) === String(w);
      return o`
                          <button
                            class="btn-action-pill preset-btn ${O ? "active" : ""}"
                            type="button"
                            role="button"
                            aria-pressed="${String(O)}"
                            title="${this.esc(w)}"
                            @click=${async (j) => {
        j.stopPropagation(), await this._call(
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
      const O = w.target.value;
      O && this._call("light", "turn_on", t.effectLights, {
        effect: O
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
                    ?disabled=${!b || !q.length}
                    @change=${(w) => {
      const O = w.target.value;
      O && this._call("select", "select_option", t.palettes, {
        option: O
      });
    }}
                  >
                    ${!l || l === "Mixed" ? o`<option value="" selected>
                            ${l === "Mixed" ? "Mixed" : "Choose palette"}
                          </option>` : ""}
                    ${q.map(
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
      this._speedIntent = Number(
        w.target.value
      );
    }}
                    @change=${(w) => {
      const O = Number(w.target.value);
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
                    ?disabled=${!_}
                    @input=${(w) => {
      this._intensityIntent = Number(
        w.target.value
      );
    }}
                    @change=${(w) => {
      const O = Number(w.target.value);
      this._intensityIntent = null, this._call("number", "set_value", t.intensities, {
        value: O
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
                      @click=${(O) => {
        O.stopPropagation(), this._call("light", "turn_on", t.effectLights, {
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
pt.styles = tc;
Bt([
  x()
], pt.prototype, "_registries", 2);
Bt([
  x()
], pt.prototype, "_bundle", 2);
Bt([
  x()
], pt.prototype, "_brightnessIntent", 2);
Bt([
  x()
], pt.prototype, "_speedIntent", 2);
Bt([
  x()
], pt.prototype, "_intensityIntent", 2);
Bt([
  x()
], pt.prototype, "_actionError", 2);
pt = Bt([
  k("component-wled-controller-v1")
], pt);
A({
  type: "component-wled-controller-v1",
  element: pt,
  name: "WLED Controller V1",
  description: "Minimal WLED control with advanced settings sheet."
});
const rc = [
  z,
  P,
  ut,
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
var ac = Object.defineProperty, sc = Object.getOwnPropertyDescriptor, qa = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? sc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && ac(e, i, a), a;
};
let ue = class extends E {
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
      const r = await We(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && i === this.hass && (this._model = r);
    } catch (r) {
      e === this._sequence && i === this.hass && (this._model = { error: r, cameras: [] });
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
ue.stubConfig = { profile: "household-security", columns: 2 };
ue.styles = rc;
qa([
  x()
], ue.prototype, "_model", 2);
ue = qa([
  k("component-security-camera-wall-v3")
], ue);
A({
  type: "component-security-camera-wall-v3",
  element: ue,
  name: "Security Camera Wall V3",
  description: "Snapshot-first, lazy live camera wall with capability-driven controls."
});
const nc = [
  z,
  P,
  W,
  Ut,
  U,
  ut,
  Ve,
  K,
  At,
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
        border-radius: var(--dashboard-radius-dialog)
          var(--dashboard-radius-dialog) 0 0;
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
var oc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, Ft = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? cc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && oc(e, i, a), a;
};
let ot = class extends E {
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
      const r = await We(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && i === this.hass && (this._model = r);
    } catch (r) {
      e === this._sequence && i === this.hass && (this._model = {
        error: r,
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
    return bt(this.hass?.states[t]);
  }
  _openViewer(t, e) {
    t.online && (this._viewerOpener = e?.currentTarget, this._viewerCamera = t, this.updateComplete.then(() => {
      const i = this.renderRoot.querySelector(
        ".viewer-dialog"
      );
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
      const i = this.renderRoot.querySelector(
        ".settings-dialog"
      );
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
    const t = this._model || {}, e = this._config.cameras, i = t.cameras || [], r = e && e.length > 0 ? i.filter(
      (h) => e.includes(h.entityId) || h.deviceId && e.includes(h.deviceId) || e.includes(h.id)
    ) : i, a = this._config.entries, s = t.entries || [], n = a && a.length > 0 ? s.filter(
      (h) => a.includes(h.entityId) || h.deviceId && a.includes(h.deviceId)
    ) : s, c = t.quickActions || [], l = (t.attention || []).length, d = !!(t.error || t.profileError || t.profileMissing), f = r.reduce(
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
                    ${c.map((h) => {
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
    })}
                  </div>
                </section>
              ` : ""}

        <section class="panel section camera-section">
          <div class="section-head">
            <h2 class="section-title">Cameras</h2>
            <span class="section-meta"
              >${r.filter((h) => h.online).length}/${r.length}
              online</span
            >
          </div>
          ${r.length === 0 ? o`<div class="empty">
                  No security cameras are configured
                </div>` : o`
                  <div class="camera-grid">
                    ${r.map((h) => {
      const p = this.hass?.states[h.entityId]?.attributes?.entity_picture, v = p ? this.hass?.hassUrl ? this.hass.hassUrl(p) : p : "", m = v ? `${v}${v.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "", b = h.classifications || [];
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
      const u = this._entryConfirmId === h.entityId, p = h.controlEntityId || h.entityId, v = h.available && this._isActionable(p), m = this._busyActionId === p, b = !!(h.controlEntityId || h.domain === "lock" || h.domain === "cover"), $ = h.domain === "lock" ? h.open ? "Lock" : "Unlock" : h.open ? "Close" : "Open";
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
                              ${v ? h.domain === "lock" ? h.open ? "Unlocked" : "Locked" : h.open ? "Open" : "Closed" : "Unavailable"}
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
                                      ?disabled=${!v || !!this._busyActionId}
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
      const u = h.entity.entity_id, v = this.hass?.states[u]?.state === "on", m = this._isActionable(u), b = this._busyActionId === u;
      return o`
                              <div class="control-row">
                                <span>
                                  <span class="control-name"
                                    >${this.esc(h.role || "Control")}</span
                                  >
                                  <span class="control-state"
                                    >${m ? b ? "Working…" : v ? "On" : "Off" : "Unavailable"}</span
                                  >
                                </span>
                                <button
                                  class="control-toggle ${v ? "on" : ""}"
                                  type="button"
                                  ?disabled=${!m || !!this._busyActionId}
                                  aria-busy=${b ? "true" : "false"}
                                  @click=${() => this._toggleCameraSwitch(u, v)}
                                >
                                  ${b ? "Working…" : v ? "Turn off" : "Turn on"}
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
ot.stubConfig = {
  profile: "household-security",
  camera_columns: 2
};
ot.styles = nc;
Ft([
  x()
], ot.prototype, "_model", 2);
Ft([
  x()
], ot.prototype, "_viewerCamera", 2);
Ft([
  x()
], ot.prototype, "_settingsCamera", 2);
Ft([
  x()
], ot.prototype, "_entryConfirmId", 2);
Ft([
  x()
], ot.prototype, "_busyActionId", 2);
Ft([
  x()
], ot.prototype, "_actionError", 2);
ot = Ft([
  k("component-security-dashboard-v1")
], ot);
A({
  type: "component-security-dashboard-v1",
  element: ot,
  name: "Security Dashboard V1",
  description: "Single-owner Security dashboard with on-demand live video, detections, controls, quick actions and entry points."
});
const lc = [
  z,
  P,
  U,
  mt,
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
var dc = Object.defineProperty, hc = Object.getOwnPropertyDescriptor, Ua = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? hc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && dc(e, i, a), a;
};
let me = class extends E {
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
      const r = await We(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && i === this.hass && (this._model = r);
    } catch (r) {
      e === this._sequence && i === this.hass && (this._model = { error: r, entries: [] });
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
            <div class="label-title">
              ${this.esc(this._config.title || "Entry points")}
            </div>
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
      const i = this._entryIcon(e), r = this._entryStateText(e);
      return o`
            <button
              class="entry ${e.open ? "open" : ""}"
              type="button"
              data-entity-id="${e.entityId}"
              ?disabled=${!e.available}
              aria-label="${this.esc(e.name)}, ${this.esc(r)}. Open details."
            >
              <span class="icon-well control-radius icon">
                <ha-icon icon="${i}"></ha-icon>
              </span>
              <span class="copy">
                <span class="label-title name">${this.esc(e.name)}</span>
                <span class="label-sub state">${this.esc(r)}</span>
              </span>
            </button>
          `;
    })}
        </div>
      </ha-card>
    `;
  }
};
me.stubConfig = { profile: "household-security" };
me.styles = lc;
Ua([
  x()
], me.prototype, "_model", 2);
me = Ua([
  k("component-security-entry-points-v1")
], me);
A({
  type: "component-security-entry-points-v1",
  element: me,
  name: "Security Entry Points V1",
  description: "Capability-driven garage, door, window and lock status using the shared garage controller where available."
});
const pc = [
  z,
  P,
  W,
  U,
  K,
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
var uc = Object.defineProperty, mc = Object.getOwnPropertyDescriptor, ja = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? mc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && uc(e, i, a), a;
};
let ge = class extends E {
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
      const r = await We(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      e === this._sequence && i === this.hass && (this._model = r);
    } catch (r) {
      e === this._sequence && i === this.hass && (this._model = {
        error: r,
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
ge.stubConfig = { profile: "household-security" };
ge.styles = pc;
ja([
  x()
], ge.prototype, "_model", 2);
ge = ja([
  k("component-security-summary-v1")
], ge);
A({
  type: "component-security-summary-v1",
  element: ge,
  name: "Security Summary V1",
  description: "Exception-first all-clear and attention summary discovered from Home Assistant capabilities."
});
const gc = [
  ur,
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
], fc = [
  z,
  P,
  W,
  ut,
  gr,
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
var bc = Object.defineProperty, vc = Object.getOwnPropertyDescriptor, Ba = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? vc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && bc(e, i, a), a;
};
let fe = class extends E {
  constructor() {
    super(...arguments), this._selected = B.today(), this._unsubscribe = null, this._interactionHandles = [];
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
    this._selected = B.get(i, this.hass), this.isConnected && e !== i && (this._unsubscribe?.(), this._unsubscribe = B.subscribe(
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
    return this._selected === B.today(this.hass);
  }
  _setDay(t) {
    this._selected = B.set(
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
    super.connectedCallback(), this._unsubscribe || (this._unsubscribe = B.subscribe(
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
    ), r && this._interactionHandles.push(
      T(r, {
        primary: () => this._setDay(B.today(this.hass)),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._isToday(), e = B.today(this.hass), i = Ei(this.hass, this._selected, {
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
fe.stubConfig = { channel: "energy-day" };
fe.styles = fc;
Ba([
  x()
], fe.prototype, "_selected", 2);
fe = Ba([
  k("component-energy-day-selector-v1")
], fe);
A({
  type: "component-energy-day-selector-v1",
  element: fe,
  name: "Energy Day Selector",
  description: "Stable selected-day control shared by every Energy card."
});
const _c = [
  z,
  P,
  ut,
  K,
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
var yc = Object.defineProperty, xc = Object.getOwnPropertyDescriptor, Ke = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? xc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && yc(e, i, a), a;
};
let _t = class extends E {
  constructor() {
    super(...arguments), this._data = null, this._error = null, this._loading = !1, this._day = B.today(), this._sequence = 0, this._dayUnsub = null, this._dataUnsub = null, this._dataHass = null, this._dataProfile = "", this._dataDay = "", this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === (this._config?.profile || "household-energy") && (this.hass && re.invalidateProfile(
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
    this._day = B.get(i, this.hass), this.isConnected && e !== i && this._bindDayChannel(), this._bindDataSubscription(), this._load();
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
    super.willUpdate(t), !(!t.has("hass") || !this.hass) && (this._day = B.get(
      this._config?.day_channel || "energy-day",
      this.hass
    ), this._bindDayChannel(), this._bindDataSubscription(), this._load());
  }
  _bindDayChannel() {
    this._dayUnsub?.(), this._dayUnsub = null, this.isConnected && (this._dayUnsub = B.subscribe(
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
    this._dataUnsub && this._dataHass === t && this._dataProfile === e && this._dataDay === this._day || (this._dataUnsub?.(), this._dataHass = t, this._dataProfile = e, this._dataDay = this._day, this._dataUnsub = re.subscribe(
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
    const e = ++this._sequence, i = this.hass, r = this._config.profile || "household-energy", a = this._day;
    this._loading = !0, this._error = null;
    try {
      const s = await re.get(i, r, a, { force: t });
      e === this._sequence && i === this.hass && a === this._day && (this._data = s);
    } catch (s) {
      e === this._sequence && i === this.hass && a === this._day && (this._error = s);
    } finally {
      e === this._sequence && i === this.hass && a === this._day && (this._loading = !1);
    }
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const r = this.renderRoot.querySelector(e);
      r && this._interactionHandles.push(
        T(r, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house", "sensor.ha_component_house_power"), t(".solar", "sensor.ha_component_solar_power"), t(".grid", "sensor.ha_component_grid_power");
  }
  render() {
    if (!this._config) return o``;
    const t = this._data, e = this._day === B.today(this.hass), i = e ? "Today" : Ei(this.hass, this._day, {
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
              aria-label="House power now: ${ft(this.hass, t?.house_w)}"
            >
              <span class="value"
                >${ft(this.hass, t?.house_w)}</span
              >
              <span class="label">House now</span>
            </button>
            <button
              class="metric solar"
              type="button"
              aria-label="Solar power now: ${ft(this.hass, t?.solar_w)}"
            >
              <span class="value"
                >${ft(this.hass, t?.solar_w)}</span
              >
              <span class="label">Solar now</span>
            </button>
            <button
              class="metric grid"
              type="button"
              aria-label="Grid power now: ${ft(this.hass, t?.grid_w, { absolute: !0 })}, ${a}"
            >
              <span class="value"
                >${ft(this.hass, t?.grid_w, { absolute: !0 })}</span
              >
              <span class="label">${this.esc(a)}</span>
            </button>
          </div>

          <div class="daily">
            <button class="metric consumed" type="button" disabled>
              <span class="value"
                >${wt(this.hass, t?.consumed_kwh)}</span
              >
              <span class="label">Consumed</span>
            </button>
            <button class="metric generated" type="button" disabled>
              <span class="value"
                >${wt(this.hass, t?.generated_kwh)}</span
              >
              <span class="label">Generated</span>
            </button>
            <button class="metric imported" type="button" disabled>
              <span class="value"
                >${wt(this.hass, t?.imported_kwh)}</span
              >
              <span class="label">Imported</span>
            </button>
            <button class="metric exported" type="button" disabled>
              <span class="value"
                >${wt(this.hass, t?.exported_kwh)}</span
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
Ke([
  x()
], _t.prototype, "_data", 2);
Ke([
  x()
], _t.prototype, "_error", 2);
Ke([
  x()
], _t.prototype, "_loading", 2);
Ke([
  x()
], _t.prototype, "_day", 2);
_t = Ke([
  k("component-energy-summary-v1")
], _t);
A({
  type: "component-energy-summary-v1",
  element: _t,
  name: "Energy Summary V1",
  description: "Stable backend-driven live power and selected-day Energy totals."
});
const wc = [
  z,
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
var $c = Object.defineProperty, Cc = Object.getOwnPropertyDescriptor, Fa = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Cc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && $c(e, i, a), a;
};
const kc = {
  type: "custom:solar-daylight-card-v7",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let He = class extends E {
  constructor() {
    super(...arguments), this._forecast = [], this._lastFetch = 0, this._pending = !1, this._failures = 0, this._retryAt = 0, this._interactionHandle = null;
  }
  setConfig(t) {
    const e = this._config?.weather_entity;
    super.setConfig({ ...kc, ...t }), this._config?.weather_entity !== e && (this._forecast = [], this._lastFetch = 0), this._fetchForecast();
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
    return Number.isNaN(e.getTime()) ? "" : oi(this.hass, e);
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
    const t = this._config.sun_entity || "sun.sun", e = this._config.weather_entity || "weather.forecast_home", i = this.hass?.states[t], r = this.hass?.states[e], a = !!(i && ["above_horizon", "below_horizon"].includes(i.state));
    let s = "Sun state unavailable", n = "";
    if (a)
      if (i?.state === "above_horizon") {
        const p = this._num(i.attributes?.elevation, 0), v = this._time(i.attributes?.next_setting);
        s = `Sun ${Math.round(p || 0)}°`, n = v ? `Sunset ${v}` : "Daylight";
      } else {
        const p = this._time(i?.attributes?.next_rising);
        s = "Night", n = p ? `Sunrise ${p}` : "Before sunrise";
      }
    const c = this._num(r?.attributes?.cloud_coverage), l = this._at(4), d = this._at(8), f = this._cloud(c), g = this._cloud(l), h = this._cloud(d), u = `${s}, cloud coverage ${f}, plus 4 hours ${g}, plus 8 hours ${h}, ${n}. Tap for sun details; hold for weather details.`;
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
              <span class="cloud-value plus8">${this.esc(h)}</span>
            </span>
          </span>
          <span class="event">${this.esc(n)}</span>
        </button>
      </ha-card>
    `;
  }
};
He.styles = wc;
Fa([
  x()
], He.prototype, "_forecast", 2);
He = Fa([
  k("solar-daylight-card-v7")
], He);
A({
  type: "solar-daylight-card-v7",
  element: He,
  name: "Solar Daylight Context",
  description: "Full-width sun context with centred current and forecast cloud coverage."
});
const Sc = [
  z,
  P,
  gr,
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
var Ac = Object.defineProperty, Ec = Object.getOwnPropertyDescriptor, qi = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Ec(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Ac(e, i, a), a;
};
const Dc = {
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
let Lt = class extends E {
  constructor() {
    super(...arguments), this._series = {}, this._loading = !1, this._selectedDay = null, this._start = 0, this._end = 0, this._lastRangeKey = null, this._forceRefresh = !1, this._fetchSequence = 0, this._dayUnsubscribe = null, this._energyUnsubscribe = null, this._energyHass = null, this._energyProfile = "", this._energyDay = "", this._pinned = !1, this._pointerState = null, this._resizeObserver = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === this._config?.profile && (this.hass && this._config?.profile && re.invalidateProfile(this.hass, this._config.profile), this._forceRefresh = !0, this._lastRangeKey = null, this._fetchData());
    }, this._outsideListener = (t) => {
      this._pinned && !t.composedPath?.().includes(this) && (this._pinned = !1);
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = { ...Dc, ...t || {} };
    e.profile && (e.calendar_day = !0), super.setConfig(e), this._config?.day_channel && this.hass && (this._selectedDay = B.get(
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
    this._dayUnsubscribe?.(), this._dayUnsubscribe = null, !(!this._config?.calendar_day || !this._config?.day_channel) && (this._dayUnsubscribe = B.subscribe(
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
      house: i.map((r) => ({
        t: new Date(r.start).getTime(),
        v: Number(r.house) || 0
      })),
      solar: i.map((r) => ({
        t: new Date(r.start).getTime(),
        v: Number(r.solar) || 0
      })),
      grid: i.map((r) => ({
        t: new Date(r.start).getTime(),
        v: Number(r.grid) || 0
      }))
    }, this._start = Number(t.range?.start) || e.start, this._end = Number(t.range?.end) || e.end;
  }
  _bindEnergyData() {
    if (!this.isConnected || !this.hass || !this._config?.profile) {
      this._energyUnsubscribe?.(), this._energyUnsubscribe = null, this._energyHass = null, this._energyProfile = "", this._energyDay = "";
      return;
    }
    const t = this._range(), e = this.hass, i = this._config.profile;
    this._energyUnsubscribe && this._energyHass === e && this._energyProfile === i && this._energyDay === t.day || (this._energyUnsubscribe?.(), this._energyHass = e, this._energyProfile = i, this._energyDay = t.day, this._energyUnsubscribe = re.subscribe(
      e,
      i,
      t.day,
      (r) => {
        this._energyHass !== e || this._energyProfile !== i || this._energyDay !== t.day || (this._loading = r.loading, this._applyProfileData(r.value, t));
      }
    ));
  }
  _range() {
    if (this._config?.calendar_day) {
      const r = B.today(this.hass), a = this._selectedDay && this._selectedDay <= r ? this._selectedDay : r, s = la(this.hass, a), n = s?.start ?? Date.now() - 864e5, c = s?.end ?? Date.now();
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
    const i = ++this._fetchSequence, r = this.hass, a = this._config.profile;
    this._loading = !0;
    const s = this._forceRefresh;
    this._forceRefresh = !1;
    try {
      if (a) {
        const n = await re.get(r, a, t.day, {
          force: s
        });
        if (i !== this._fetchSequence || r !== this.hass) return;
        this._applyProfileData(n, t);
      } else
        this._start = t.start, this._end = t.end;
      this._lastRangeKey = e;
    } catch {
    } finally {
      i === this._fetchSequence && r === this.hass && (this._loading = !1);
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
      const d = c.map(
        (f, g) => `${g ? "L" : "M"}${e(f.t).toFixed(1)},${i(f.v).toFixed(1)}`
      ).join(" ");
      if (a.push(d), r !== null) {
        const f = c[0], g = c[c.length - 1];
        s += `${d} L${e(g.t).toFixed(1)},${r.toFixed(1)} L${e(f.t).toFixed(1)},${r.toFixed(1)} Z `;
      }
      c = [];
    };
    for (const d of t || [])
      n !== null && d.t - n > 15 * 6e4 && l(), c.push(d), n = d.t;
    return l(), { line: a.join(" "), fill: s.trim() };
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const r = this.renderRoot.querySelector(e);
      r && i && this._interactionHandles.push(
        T(r, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house-key", this._config?.house_entity), t(".solar-key", this._config?.solar_entity), t(".grid-key", this._config?.grid_entity);
  }
  render() {
    if (!this._config) return o``;
    const t = (this._series.house?.length || 0) > 0 || (this._series.solar?.length || 0) > 0 || (this._series.grid?.length || 0) > 0, e = this._config.calendar_day ? this._selectedDay === B.today(this.hass) ? "Today" : Ei(this.hass, this._selectedDay || "", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }) : null, i = e ? `${e} · ${this._config.bucket_minutes || 10}-minute average` : `${this._config.bucket_minutes || 10}-minute average`, r = 800, a = 420, s = 58, n = 8, c = 6, l = Math.round(a * 0.7), d = l + 20, f = d + 18, g = a - 18, h = s, u = r - n, p = this._start || Date.now() - 864e5, v = this._end || Date.now(), m = (N) => h + (N - p) / (v - p) * (u - h), b = [
      ...this._series.house || [],
      ...this._series.solar || []
    ].map((N) => Math.max(0, N.v)), $ = this._niceMax(Math.max(1, ...b) * 1.06), _ = (N) => l - Math.max(0, N) / $ * (l - c), D = Math.max(
      100,
      ...(this._series.grid || []).map((N) => Math.abs(N.v))
    ), H = this._niceMax(D * 1.08), M = (f + g) / 2, q = (N) => M - N / H * ((g - f) / 2), w = this._paths(this._series.house, m, _), O = this._paths(this._series.solar, m, _, l), j = this._paths(this._series.grid, m, q);
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
      const Y = $ * (1 - N / 4), Q = c + (l - c) * (N / 4);
      return o`
                  <line
                    class="gridline"
                    x1="${h}"
                    y1="${Q}"
                    x2="${u}"
                    y2="${Q}"
                  ></line>
                  <text
                    class="axis"
                    x="${h - 8}"
                    y="${Q + 4}"
                    text-anchor="end"
                  >
                    ${ft(this.hass, Y)}
                  </text>
                `;
    })}
              ${[0, 1, 2, 3, 4, 5, 6].map((N) => {
      const Y = p + (v - p) * N / 6, Q = m(Y), Wt = new Date(Y).getMinutes() === 0 ? oi(this.hass, Y, { minute: void 0 }) : oi(this.hass, Y);
      return o`
                  <text
                    class="axis"
                    x="${Q}"
                    y="${d}"
                    text-anchor="${N === 0 ? "start" : N === 6 ? "end" : "middle"}"
                  >
                    ${Wt}
                  </text>
                `;
    })}

              <line
                class="zero"
                x1="${h}"
                y1="${M}"
                x2="${u}"
                y2="${M}"
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
              ${w.line ? o`<path class="house-line" d="${w.line}"></path>` : ""}
              ${j.line ? o`<path class="grid-line" d="${j.line}"></path>` : ""}
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
Lt.styles = Sc;
qi([
  x()
], Lt.prototype, "_series", 2);
qi([
  x()
], Lt.prototype, "_loading", 2);
qi([
  x()
], Lt.prototype, "_selectedDay", 2);
Lt = qi([
  k("energy-history-card-v3")
], Lt);
A({
  type: "energy-history-card-v3",
  element: Lt,
  name: "Energy History",
  description: "Dense readable power history supporting rolling or local calendar-day ranges using completed 10-minute averages and a signed grid strip."
});
var Tc = Object.getOwnPropertyDescriptor, zc = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Tc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Pc = {
  type: "custom:component-energy-dashboard-v1",
  profile: "household-energy",
  day_channel: "energy-day",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let Ne = class extends E {
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
Ne.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
Ne.styles = gc;
Ne = zc([
  k("component-energy-dashboard-v1")
], Ne);
A({
  type: "component-energy-dashboard-v1",
  element: Ne,
  name: "Energy Dashboard V1",
  description: "Single-card Energy composition using shared day state and one backend data contract."
});
const Oc = [
  z,
  P,
  gr,
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
var Ic = Object.defineProperty, Rc = Object.getOwnPropertyDescriptor, kr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Rc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Ic(e, i, a), a;
};
const Hc = {
  type: "custom:component-history-graph-v2",
  meta_text: "Aggregation label",
  series_1_label: "Primary series",
  series_2_label: "Secondary series",
  series_3_label: "Supporting series",
  positive_label: "Positive",
  negative_label: "Negative"
};
let be = class extends E {
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
    super.setConfig({ ...Hc, ...t });
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
    const i = e.getBoundingClientRect(), r = Math.max(320, Math.round(i.width || 800)), a = r < 520 ? 48 : 58, s = 8, n = a, c = r - s, l = (t.clientX - i.left) * (r / i.width), d = Math.max(n, Math.min(c, l)), f = (d - n) / (c - n), g = Math.round(f * 100), h = [
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
      x: d / r * i.width,
      y: Math.max(70, i.height * 0.42)
    };
  }
  render() {
    if (!this._config) return o``;
    const t = 800, e = 420, i = 58, r = 8, a = 6, s = Math.round(e * 0.7), n = s + 20, c = n + 18, l = e - 18, d = i, f = t - r, g = f - d, h = s - a, u = (c + l) / 2, p = (D, H) => `${(d + g * D).toFixed(1)},${(a + h * H).toFixed(1)}`, v = (D, H) => `${(d + g * D).toFixed(1)},${(u + (l - c) * 0.32 * H).toFixed(1)}`, m = `M${p(0, 0.68)} L${p(0.08, 0.61)} L${p(0.17, 0.7)} L${p(0.26, 0.38)} L${p(0.35, 0.52)} L${p(0.44, 0.24)} L${p(0.53, 0.43)} L${p(0.62, 0.35)} L${p(0.72, 0.63)} L${p(0.82, 0.48)} L${p(0.91, 0.59)} L${p(1, 0.44)}`, b = `M${p(0, 0.86)} L${p(0.12, 0.75)} L${p(0.24, 0.52)} L${p(0.36, 0.42)} L${p(0.48, 0.55)} L${p(0.6, 0.72)} L${p(0.72, 0.82)} L${p(0.84, 0.91)} L${p(1, 0.94)}`, $ = `M${v(0, 0.08)} L${v(0.1, -0.1)} L${v(0.2, 0.12)} L${v(0.3, -0.2)} L${v(0.4, 0.02)} L${v(0.5, -0.35)} L${v(0.6, 0.16)} L${v(0.7, 0.28)} L${v(0.8, -0.12)} L${v(0.9, 0.05)} L${v(1, -0.08)}`, _ = `${b} L${f},${s} L${d},${s} Z`;
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
      const M = a + h * H / 4;
      return o`
                  <line
                    class="grid"
                    x1="${d}"
                    y1="${M}"
                    x2="${f}"
                    y2="${M}"
                  ></line>
                  <text
                    class="axis"
                    x="${d - 8}"
                    y="${M + 4}"
                    text-anchor="end"
                    >${D}</text
                  >
                `;
    })}
              ${["Start", "¼", "½", "¾", "End"].map((D, H) => {
      const M = d + g * H / 4;
      return o`
                  <text
                    class="axis"
                    x="${M}"
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
                      <path class="f2" d="${_}"></path>
                      <path class="l2" d="${b}"></path>
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
              class="tooltip ${this._tooltip.show ? "show" : ""}"
              style="left:${this._tooltip.x}px; top:${this._tooltip.y}px;"
            >
              <div class="tooltip-time">${this._tooltip.percent}</div>
              ${this._tooltip.rows.map(
      (D) => o`<div class="tooltip-row">
                    <span>${D.label}</span
                    ><b class="tooltip-val">${D.value}</b>
                  </div>`
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
be.styles = Oc;
kr([
  x()
], be.prototype, "_hiddenSeries", 2);
kr([
  x()
], be.prototype, "_tooltip", 2);
be = kr([
  k("component-history-graph-v2")
], be);
A({
  type: "component-history-graph-v2",
  element: be,
  name: "History Graph",
  description: "Reusable interactive history graph component."
});
const Nc = [
  z,
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
var Lc = Object.defineProperty, Mc = Object.getOwnPropertyDescriptor, Ye = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Mc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Lc(e, i, a), a;
};
const qc = {
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
let kt = class extends E {
  constructor() {
    super(...arguments), this._selectedDay = B.today(), this._stats = {}, this._loading = !1, this._error = "", this._lastKey = null, this._interactionHandles = [];
  }
  _onDayChange(t) {
    !t || t === this._selectedDay || (this._selectedDay = t, this._error = "", this._lastKey = null, this._scheduleStats());
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = this._config?.day_channel;
    if (super.setConfig({ ...qc, ...t }), this.isConnected && e !== this._config?.day_channel) {
      this._dayUnsubscribe?.();
      const i = this._config?.day_channel || "energy-day";
      this._selectedDay = B.get(i, this.hass), this._dayUnsubscribe = B.subscribe(
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
    this._selectedDay = B.get(t, this.hass), this._dayUnsubscribe = B.subscribe(
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
    return this._selectedDay === B.today(this.hass);
  }
  _range() {
    const t = la(this.hass, this._selectedDay);
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
          const d = typeof l.start == "number" ? l.start : Date.parse(l.start);
          return Number.isFinite(d) && d >= i.start && d < i.end;
        }).map((l) => Number(l.change)).filter(Number.isFinite);
        a[s] = {
          change: c.length ? c.reduce((l, d) => l + d, 0) : null
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
      return wt(this.hass, this._number(t.entity, "change"));
    if (e === "energy_kwh_day_sum") {
      if (!Array.isArray(t.entities) || !t.entities.length) return "—";
      let r = 0;
      for (const a of t.entities) {
        const s = this._number(a, "change");
        if (s === null) return "—";
        r += s;
      }
      return wt(this.hass, r);
    }
    if (e === "energy_kwh_day_formula") {
      if (!Array.isArray(t.terms) || !t.terms.length) return "—";
      let r = 0;
      for (const a of t.terms) {
        const s = this._number(a?.entity, "change");
        if (s === null) return "—";
        r += s * (Number.isFinite(Number(a.factor)) ? Number(a.factor) : 1);
      }
      return wt(this.hass, r);
    }
    if (["watts", "watts_abs"].includes(e))
      return ft(this.hass, this._liveNumber(t.entity), {
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
      T(t, {
        primary: () => this.moreInfo(i),
        feedback: !0
      })
    ), e && r && this._interactionHandles.push(
      T(e, {
        primary: () => this.moreInfo(r),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._resolve(this._config.left_value), e = this._resolve(this._config.left_label), i = this._resolve(this._config.right_value), r = this._resolve(this._config.right_label), a = this._resolve(this._config.right_primary), s = this._resolve(this._config.right_secondary), n = this._clickEntity("left"), c = this._clickEntity("right"), l = [e, t].filter(Boolean).join(": "), d = [i, r, a, s].filter(Boolean).join(" ");
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
kt.styles = Nc;
Ye([
  x()
], kt.prototype, "_selectedDay", 2);
Ye([
  x()
], kt.prototype, "_stats", 2);
Ye([
  x()
], kt.prototype, "_loading", 2);
Ye([
  x()
], kt.prototype, "_error", 2);
kt = Ye([
  k("metric-pair-card-v3")
], kt);
A({
  type: "metric-pair-card-v3",
  element: kt,
  name: "Metric Pair",
  description: "Live power metrics with selected-day energy totals."
});
const Uc = [
  z,
  P,
  K,
  W,
  U,
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
var jc = Object.defineProperty, Bc = Object.getOwnPropertyDescriptor, Qe = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Bc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && jc(e, i, a), a;
};
const Qi = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
let St = class extends E {
  constructor() {
    super(...arguments), this.minimal = !1, this._selected = [], this._registry = null, this._interactionHandles = [], this._unsubRegistry = null, this._registryHass = null;
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
    super.willUpdate(t), t.has("hass") && t.get("hass") !== this.hass && (this._registry = null, this._unsubscribeRegistryEvents()), t.has("hass") && this.hass && (this._subscribeRegistryEvents(), this._ensureRegistry(), this._config?.helpers?.length && !this._config?.preference_key && this._loadBackendFavourites());
  }
  _subscribeRegistryEvents() {
    if (!this.isConnected || !this.hass || this._registryHass === this.hass && this._unsubRegistry) return;
    this._unsubscribeRegistryEvents();
    const t = this.hass;
    this._registryHass = t, this._unsubRegistry = G.subscribe(t, (e) => {
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
    if (!t || Qi.has(String(t).toLowerCase())) return null;
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
    if (!this.hass || this._registry && !t) return;
    const e = this.hass;
    try {
      const i = await G.load(e, t);
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
      const i = t.state.attributes?.media_title, r = this._label(t.state.state);
      return i ? `${r} · ${i}` : r;
    }
    return this._label(t.state.state);
  }
  _label(t) {
    return String(t ?? "").replaceAll("_", " ").replace(/^./, (e) => e.toUpperCase());
  }
  _isActive(t) {
    if (!t.state || Qi.has(String(t.state.state).toLowerCase()))
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
    if (["light", "switch", "fan", "input_boolean"].includes(a)) {
      if (!this.hass) return;
      await S(this.hass, {
        domain: "homeassistant",
        service: "toggle",
        target: { entity_id: r }
      });
    } else if (["automation", "script", "scene"].includes(a)) {
      const s = a === "automation" ? "trigger" : "turn_on";
      if (!this.hass) return;
      await S(this.hass, {
        domain: a,
        service: s,
        target: { entity_id: r }
      });
    } else if (["button", "input_button"].includes(a)) {
      if (!this.hass) return;
      await S(this.hass, {
        domain: a,
        service: "press",
        target: { entity_id: r }
      });
    } else
      this.moreInfo(r);
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll(".item button.main").forEach((e, i) => {
      const r = this._record(this._selected[i]);
      this._interactionHandles.push(
        T(e, {
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
        </ha-card> ` : o`${this._renderCompatibilityStyles()}
      <ha-card>
        <div class="wrap">
          ${this._config.show_header !== !1 ? o`
                  <div class="head">
                    <div class="heading">
                      <ha-icon icon="mdi:star-outline"></ha-icon>
                      <h2>${this._config.title || "Favourites"}</h2>
                    </div>
                    <button
                      class="edit"
                      type="button"
                      aria-label="Edit favourites"
                    >
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
      const i = this._record(e), r = this._name(i), a = this._stateLabel(i), s = this._icon(i), n = this._isActive(i), c = !i.state || Qi.has(String(i.state.state).toLowerCase());
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
      </ha-card> `;
  }
  _renderCompatibilityStyles() {
    return this.minimal ? o`<style>
      .heading h2 {
        font-size: 15px !important;
        font-weight: 500 !important;
      }
      .heading ha-icon {
        color: var(--secondary-text-color) !important;
        --mdc-icon-size: 17px !important;
      }
      .edit {
        min-width: 44px !important;
        min-height: 44px !important;
        padding: 0 !important;
        color: var(--secondary-text-color) !important;
        font-weight: 400 !important;
      }
      .edit ha-icon {
        --mdc-icon-size: 16px !important;
      }
      .edit span {
        display: none !important;
      }
      .icon {
        color: var(--secondary-text-color) !important;
      }
      .name {
        font-weight: 500 !important;
      }
      .state {
        font-size: 12px !important;
      }
      .dialog-title,
      .confirm-title {
        font-size: 16px !important;
        font-weight: 500 !important;
      }
      .subheading,
      .group-title,
      .choice-name,
      .dialog-button {
        font-weight: 500 !important;
      }
      .selected-meta,
      .choice-meta,
      .editor-copy {
        font-size: 12px !important;
      }
    </style>` : o``;
  }
};
St.stubConfig = { helpers: [], max: 4, title: "Favourites" };
St.styles = Uc;
Qe([
  qt({ attribute: !1 })
], St.prototype, "minimal", 2);
Qe([
  x()
], St.prototype, "_selected", 2);
Qe([
  x()
], St.prototype, "_registry", 2);
St = Qe([
  k("component-favourites-v3")
], St);
let $i = class extends E {
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      preference_key: "home-control.favourites.v1",
      ...t || {},
      type: "custom:component-favourites-minimal-v1"
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
$i.styles = y`
    :host {
      display: block;
      min-width: 0;
    }
  `;
$i = Qe([
  k("component-favourites-minimal-v1")
], $i);
A({
  type: "component-favourites-v3",
  element: St,
  name: "Favourites V3",
  description: "Stable household favourites with entity discovery and backend companion storage."
});
A({
  type: "component-favourites-minimal-v1",
  element: $i,
  name: "Favourites Minimal",
  description: "Existing favourites behaviour with restrained Home typography."
});
const Fc = [
  z,
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
], Vc = [
  z,
  P,
  W,
  ct,
  K,
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
var Wc = Object.getOwnPropertyDescriptor, Gc = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Wc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const Kc = {
  type: "custom:component-welcome-header-v1",
  weather_entity: "weather.forecast_home"
};
let Ci = class extends E {
  constructor() {
    super(...arguments), this._cancelMinuteScheduler = null, this._interactionHandle = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (super.setConfig({ ...Kc, ...t }), !this._config?.weather_entity)
      throw new Error("weather_entity is required");
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = fa(
      () => this.requestUpdate()
    );
  }
  disconnectedCallback() {
    this._cancelMinuteScheduler?.(), this._cancelMinuteScheduler = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  _number(t, e = 0) {
    const i = Number(t);
    return Number.isFinite(i) ? ae(this.hass, i, {
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
    const t = /* @__PURE__ */ new Date(), i = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, r = Si(this.hass), a = ki(this.hass), s = this._number(i.temperature, 1), n = this._number(i.cloud_coverage, 0), c = s === null ? "—" : `${s}${i.temperature_unit || "°C"}`, l = n === null ? "Cloud —" : `Cloud ${n}%`, d = new Intl.DateTimeFormat(a, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: r
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
Ci.styles = Vc;
Ci = Gc([
  k("component-welcome-header-v1")
], Ci);
A({
  type: "component-welcome-header-v1",
  element: Ci,
  name: "Welcome Header",
  description: "Compact live weather and home-time header."
});
const Yc = [
  z,
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
var Qc = Object.defineProperty, Zc = Object.getOwnPropertyDescriptor, Ui = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Zc(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && Qc(e, i, a), a;
};
const Jc = {
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
let Mt = class extends E {
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
    super.setConfig({ ...Jc, ...t }), this._structureSig = "", this.hass && (this._config?.pref_key && this._loadPrefs(), this._loadRegistry(), this._syncCards());
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
    this._registryHass = t, this._unsubRegistry = G.subscribe(t, (e) => {
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
      const e = await G.load(t);
      if (this.hass !== t) return;
      this._registry = e, this._syncCards();
    } catch {
    }
  }
  async _loadPrefs() {
    !this.hass || !this._config?.pref_key || (this._prefs = await Ta(this.hass, this._config.pref_key), this._structureSig = "", this._syncCards());
  }
  async _syncCards() {
    if (!this.hass) return;
    const t = ++this._gen, e = Zi(
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
        const n = await Oa(a.cardConfig, this.hass);
        if (t !== this._gen) return;
        r.set(a.entityId, { el: n, sig: a.signature });
      } catch {
      }
    }
    t === this._gen && (this._cardElements = r, this._structureSig = i, this._renderedCards = e.map((a) => r.get(a.entityId)?.el).filter((a) => !!a), this.requestUpdate());
  }
  async openEditor() {
    if (!this.hass || !this._config?.pref_key) return;
    const e = {
      order: Zi(this.hass, this._registry, {
        mode: this._config?.mode,
        area_id: this._config?.area_id,
        exclude_device_names: this._config?.exclude_device_names
      }).map((i) => i.entityId),
      hidden: [...this._prefs.hidden]
    };
    this._prefs = e, await za(this.hass, this._config.pref_key, e), this._structureSig = "", this._syncCards();
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
Mt.styles = Yc;
Ui([
  x()
], Mt.prototype, "_registry", 2);
Ui([
  x()
], Mt.prototype, "_prefs", 2);
Ui([
  x()
], Mt.prototype, "_renderedCards", 2);
Mt = Ui([
  k("component-smart-collection-v3")
], Mt);
A({
  type: "component-smart-collection-v3",
  element: Mt,
  name: "Smart Control Collection V3",
  description: "Stable registry-driven household controls without refresh teardown."
});
const Xc = [
  z,
  P,
  U,
  K,
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
var tl = Object.defineProperty, el = Object.getOwnPropertyDescriptor, Va = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? el(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && tl(e, i, a), a;
};
const il = {
  type: "custom:component-household-directory-v3",
  pref_key: "home-control.household.v2",
  base_path: "/home-control",
  current_dashboard: "home-control",
  title: "Quick actions",
  icon: "mdi:gesture-tap-button",
  quick_action_label: "dashboard_quick_action"
}, na = {
  automation: "trigger",
  scene: "turn_on",
  script: "turn_on",
  button: "press",
  input_button: "press"
};
let Le = class extends E {
  constructor() {
    super(...arguments), this._registry = [], this._unsubRegistry = null, this._registryHass = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...il, ...t }), this.hass && this._loadRegistry();
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
    this._registryHass = t, this._unsubRegistry = G.subscribe(t, (e) => {
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
      const e = await G.load(t);
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
    const i = this._config?.quick_action_label || "dashboard_quick_action", r = this._registry.filter((a) => {
      if (a.disabled_by || a.hidden_by) return !1;
      const s = a.entity_id.split(".")[0];
      return !Object.prototype.hasOwnProperty.call(
        na,
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
        service: na[n],
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
    t.forEach((i, r) => {
      const a = e[r];
      if (!a) return;
      let s = null;
      a.kind === "nav" && a.path ? s = () => ca(a.path) : a.kind === "action" ? s = () => this._runAction(a) : a.kind === "entity" && a.entity && (s = () => this.moreInfo(a.entity)), s && this._interactionHandles.push(
        T(i, {
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
Le.styles = Xc;
Va([
  x()
], Le.prototype, "_registry", 2);
Le = Va([
  k("component-household-directory-v3")
], Le);
A({
  type: "component-household-directory-v3",
  element: Le,
  name: "Household Directory V3",
  description: "Global views and label-driven quick actions directory."
});
const rl = [
  z,
  P,
  W,
  Ut,
  U,
  K,
  At,
  va,
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
var al = Object.defineProperty, sl = Object.getOwnPropertyDescriptor, Sr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? sl(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && al(e, i, a), a;
};
const nl = {
  type: "custom:component-room-directory-v4",
  title: "Rooms",
  icon: "mdi:floor-plan",
  mode: "home",
  pref_key: "home-control.rooms.v2",
  navigation_path: null,
  base_path: "/home-control"
};
let ve = class extends E {
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
    super.setConfig({ ...nl, ...t }), this._bindRegistry();
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
    this._unsubRegistry = G.subscribe(t, (e) => {
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
    return Ia(t, this._registries, this.hass);
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
      const i = this._areaStatus(e), a = i.severity === "active" ? `. ${i.activeDeviceCount} active device${i.activeDeviceCount === 1 ? "" : "s"}` : "";
      return o`
              <button
                class="room ${i.severity}"
                type="button"
                style="--room-active-hue: ${this._activeHue(e.area_id)}"
                aria-label="Open ${e.name}${i.summary ? ". " + i.summary : ""}${a}"
                @click=${(s) => this._openRoom(e, s.currentTarget)}
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
ve.styles = rl;
Sr([
  x()
], ve.prototype, "_registries", 2);
Sr([
  x()
], ve.prototype, "_activeArea", 2);
ve = Sr([
  k("component-room-directory-v4")
], ve);
A({
  type: "component-room-directory-v4",
  element: ve,
  name: "Room Directory V4",
  description: "Stable registry-driven rooms with full-height swipeable room sheets."
});
var ol = Object.getOwnPropertyDescriptor, Wa = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? ol(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
const cl = {
  type: "custom:component-home-overview-v4",
  weather_entity: "weather.forecast_home",
  base_path: "/home-control",
  current_dashboard: "home-control",
  favourites_helpers: []
};
let Me = class extends E {
  constructor() {
    super(...arguments), this._weatherInteraction = null, this._cancelMinuteScheduler = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      ...cl,
      ...t,
      favourites_helpers: []
    });
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = fa(
      () => this.requestUpdate()
    );
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
    const t = /* @__PURE__ */ new Date(), e = Si(this.hass), i = ki(this.hass), r = new Intl.DateTimeFormat(i, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: e
    }).format(t), s = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, n = Number(s.temperature), c = Number.isFinite(n) ? `${ae(this.hass, n, { maximumFractionDigits: 1 })}${s.temperature_unit || "°C"}` : "—", l = Number(s.cloud_coverage), d = Number.isFinite(l) ? `Cloud ${Math.round(l)}%` : "Cloud —", f = `${c} · ${d}`, g = `Outside ${c}, ${d}. Open weather details.`, h = this._config.base_path || "/home-control", u = this._config.current_dashboard || "home-control";
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
Me.styles = Fc;
Me = Wa([
  k("component-home-overview-v4")
], Me);
let tr = class extends Me {
  setConfig(t) {
    super.setConfig({
      ...t,
      type: "custom:component-home-overview-v5"
    });
  }
};
tr = Wa([
  k("component-home-overview-v5")
], tr);
A({
  type: "component-home-overview-v4",
  element: Me,
  name: "Home Overview V4",
  description: "Stable minimal Home overview without state-refresh teardown."
});
A({
  type: "component-home-overview-v5",
  element: tr,
  name: "Home Overview V5",
  description: "Stable minimal Home overview without state-refresh teardown (v5 alias)."
});
const ll = [
  z,
  P,
  U,
  K,
  ut,
  At,
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
      box-shadow:
        0 0 0 1px var(--warning-color),
        0 0 16px 3px color-mix(in srgb, var(--warning-color) 50%, transparent) !important;
      transform: scale(0.985);
    }
    .issue.critical {
      border-left-color: var(--error-color);
      background: var(--dashboard-critical-surface);
    }
    .issue.critical:active {
      box-shadow:
        0 0 0 1px var(--error-color),
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
var dl = Object.defineProperty, hl = Object.getOwnPropertyDescriptor, Ar = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? hl(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && dl(e, i, a), a;
};
const pl = {
  type: "custom:component-household-attention-v2",
  title: "Attention",
  icon: "mdi:alert-circle-outline",
  quiet_title: "Everything quiet",
  quiet_subtitle: "No security or hardware alerts",
  quiet_icon: "mdi:check-circle-outline"
};
let _e = class extends E {
  constructor() {
    super(...arguments), this._registry = null, this._unsubRegistry = null, this._registryHass = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...pl, ...t }), this.hass && !this._config?.demo && this._loadRegistry();
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
    this._registryHass = t, this._unsubRegistry = G.subscribe(t, (e) => {
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
      const e = await G.load(t);
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
        name: Et({ entry: e, state: i }),
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
        T(i, {
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
_e.styles = ll;
Ar([
  x()
], _e.prototype, "_registry", 2);
_e = Ar([
  k("component-household-attention-v2")
], _e);
let er = class extends _e {
  setConfig(t) {
    super.setConfig({
      ...t,
      type: "custom:component-household-attention-v1"
    });
  }
};
er = Ar([
  k("component-household-attention-v1")
], er);
A({
  type: "component-household-attention-v1",
  element: er,
  name: "Household Attention V1",
  description: "Aggregated safety and hardware attention queue (v1)."
});
A({
  type: "component-household-attention-v2",
  element: _e,
  name: "Household Attention V2",
  description: "Aggregated safety and hardware attention queue."
});
const ul = [
  z,
  K,
  P,
  ut,
  U,
  ct,
  y`
    :host {
      --tile-active-color: var(--primary-color, #03a9f4);
    }

    .tile-card {
      --action-glow-color: var(
        --tile-active-color,
        var(--primary-color, #03a9f4)
      );
      transition:
        background-color 0.25s ease,
        border-color 0.4s ease,
        box-shadow 0.75s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.15s ease;
      cursor: pointer;
    }

    .tile-card.interactive:active:not(.unavailable) {
      border-color: var(--action-glow-color) !important;
      box-shadow:
        0 0 0 1px var(--action-glow-color),
        0 0 16px 3px
          color-mix(in srgb, var(--action-glow-color) 50%, transparent) !important;
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
var ml = Object.defineProperty, gl = Object.getOwnPropertyDescriptor, Er = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? gl(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && ml(e, i, a), a;
};
let qe = class extends $t {
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
    vt(this, "config-changed", { config: this._config });
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
qe.styles = [_a];
Er([
  qt({ attribute: !1 })
], qe.prototype, "hass", 2);
Er([
  x()
], qe.prototype, "_config", 2);
qe = Er([
  k("ha-action-tile-editor")
], qe);
var fl = Object.getOwnPropertyDescriptor, bl = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? fl(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
let ir = class extends Ii {
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
    if (!this.hass || !this.config || Z(this.hass.states[this.config.entity])) return;
    const t = this.config.tap_action || { action: "toggle" };
    Oi(this, this.hass, t, this.config.entity);
  }
  _renderBadge() {
    if (!this.hass || !this.config) return F;
    if (this.config.badge_entity && this.hass.states[this.config.badge_entity]) {
      const e = this.hass.states[this.config.badge_entity];
      return o`
        <div class="capsule-badge">
          ${X(e, this.hass)}
        </div>
      `;
    }
    const t = this.hass.states[this.config.entity];
    if (t?.attributes?.brightness !== void 0 && oe(t)) {
      const e = Math.round(t.attributes.brightness / 255 * 100);
      return o`<div class="capsule-badge">${e}%</div>`;
    }
    return t?.attributes?.temperature !== void 0 ? o`<div class="capsule-badge">
        ${t.attributes.temperature}&deg;
      </div>` : F;
  }
  _handleKeyDown(t) {
    !this.hass || !this.config || Z(this.hass.states[this.config.entity]) || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._handleTileTap());
  }
  render() {
    if (!this.hass || !this.config?.entity)
      return this.renderError("No entity configured for ha-action-tile");
    const t = this.hass.states[this.config.entity];
    if (!t)
      return this.renderError(`Entity not found: ${this.config.entity}`);
    const e = ht(this.config.entity), i = Z(t), r = !i && oe(t), a = this.config.name || Pi(t), s = this.config.icon || t.attributes.icon || xe(e, t.state), n = i ? "Unavailable" : X(t, this.hass), c = this.config.color || "#03a9f4";
    return o`
      <ha-card
        class="interactive surface-card tile-card ${r ? "active" : ""} ${i ? "unavailable" : ""}"
        style=${r ? `--tile-active-color: ${c};` : ""}
        role="button"
        tabindex="${i ? "-1" : "0"}"
        aria-pressed="${String(r)}"
        aria-disabled="${String(i)}"
        aria-label="${a}: ${n}"
        @click=${this._handleTileTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="header-row tile-row">
          <div class="icon-well control-radius ${r ? "active" : ""}">
            <ha-icon .icon=${s}></ha-icon>
          </div>
          <div class="copy-block">
            <div class="label-title" title=${a}>${a}</div>
            <div class="label-sub">${n}</div>
          </div>
          ${this._renderBadge()}
        </div>
      </ha-card>
    `;
  }
};
ir.styles = ul;
ir = bl([
  k("ha-action-tile")
], ir);
const vl = [
  z,
  K,
  P,
  U,
  ct,
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
var _l = Object.getOwnPropertyDescriptor, yl = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? _l(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
let rr = class extends Ii {
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
    if (!this.hass || !this.config || Z(this.hass.states[this.config.entity])) return;
    const t = this.config.tap_action || { action: "more-info" };
    Oi(this, this.hass, t, this.config.entity);
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
    const e = ht(this.config.entity), i = Z(t), r = this.config.name || Pi(t), a = this.config.icon || t.attributes.icon || xe(e, t.state), s = i ? NaN : parseFloat(t.state), n = !isNaN(s), c = n ? this._computeColor(s) : i ? "var(--secondary-text-color, #757575)" : "var(--primary-color, #03a9f4)", l = i ? "" : this.config.unit || t.attributes.unit_of_measurement || "", d = i ? "Unavailable" : n ? s : t.state;
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
        aria-label="${r}: ${d}${l ? " " + l : ""}"
        title="${r}: ${X(t, this.hass)}"
      >
        <div class="header-row">
          <div class="icon-well control-radius">
            <ha-icon .icon=${a}></ha-icon>
          </div>
          <div class="copy-block metric-data">
            <div class="metric-value-line">
              <span class="kpi-metric-lg">${d}</span>
              ${l ? o`<span class="unit-text">${l}</span>` : ""}
            </div>
            <div class="label-sub" title=${r}>${r}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
rr.styles = vl;
rr = yl([
  k("ha-metric-badge")
], rr);
const xl = [
  z,
  P,
  ut,
  W,
  mt,
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
var wl = Object.getOwnPropertyDescriptor, $l = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? wl(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
let ar = class extends Ii {
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
    if (!this.hass || Z(this.hass.states[t.entity])) return;
    const e = t.tap_action || { action: "toggle" };
    Oi(this, this.hass, e, t.entity);
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
      r && !Z(r) && oe(r) && e++;
    }), o`
      <ha-card class="assembled-card">
        ${this.config.title || this.config.show_active_count ? o`
                <div class="quick-header">
                  <span class="label-title"
                    >${this.config.title || "Quick Controls"}</span
                  >
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

        <div
          class="quick-actions"
          role="group"
          aria-label="${this.config.title || "Quick Controls"}"
        >
          ${t.map((i) => {
      const r = this.hass?.states[i.entity], a = Z(r), s = !a && oe(r), n = ht(i.entity), c = i.name || Pi(r), l = i.icon || r?.attributes?.icon || xe(n, r?.state), d = a ? "Unavailable" : X(r, this.hass);
      return o`
              <button
                class="btn-action-pill quick-item ${s ? "active" : ""}"
                type="button"
                role="button"
                tabindex="${a ? "-1" : "0"}"
                aria-pressed="${String(s)}"
                ?disabled=${a}
                aria-disabled="${String(a)}"
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
ar.styles = xl;
ar = $l([
  k("ha-quick-bar")
], ar);
const Cl = [
  z,
  P,
  Fe,
  U,
  ct,
  mt,
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
      box-shadow:
        0 0 0 1px var(--primary-color),
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
var kl = Object.defineProperty, Sl = Object.getOwnPropertyDescriptor, Dr = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Sl(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = (r ? n(e, i, a) : n(a)) || a);
  return r && a && kl(e, i, a), a;
};
let Ue = class extends $t {
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
    vt(this, "config-changed", { config: this._config });
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
Ue.styles = [
  _a,
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
Dr([
  qt({ attribute: !1 })
], Ue.prototype, "hass", 2);
Dr([
  x()
], Ue.prototype, "_config", 2);
Ue = Dr([
  k("ha-status-card-editor")
], Ue);
var Al = Object.getOwnPropertyDescriptor, El = (t, e, i, r) => {
  for (var a = r > 1 ? void 0 : r ? Al(e, i) : e, s = t.length - 1, n; s >= 0; s--)
    (n = t[s]) && (a = n(a) || a);
  return a;
};
let sr = class extends Ii {
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
    if (!this.hass || !this.config || Z(this.hass.states[this.config.entity])) return;
    const t = this.config.tap_action || { action: "more-info" };
    Oi(this, this.hass, t, this.config.entity);
  }
  _handleKeyDown(t) {
    !this.hass || !this.config || Z(this.hass.states[this.config.entity]) || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._handleTap());
  }
  async _handleToggle(t) {
    if (t.stopPropagation(), t.preventDefault(), !this.hass || !this.config?.entity) return;
    const e = this.hass.states[this.config.entity];
    if (Z(e)) return;
    const i = ht(this.config.entity), r = i === "lock" ? e.state === "locked" || e.state === "locking" ? "unlock" : "lock" : "toggle";
    await S(this.hass, {
      domain: i,
      service: r,
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
    if (i === "state") return X(t, this.hass);
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
    const e = ht(this.config.entity), i = Z(t), r = !i && oe(t), a = this.config.name || Pi(t), s = this.config.icon || t.attributes.icon || xe(e, t.state), n = i ? "Unavailable" : X(t, this.hass), c = this._getSecondaryText(t, i), l = this.config.show_toggle !== !1 && ["light", "switch", "input_boolean", "fan", "lock"].includes(e), d = i ? "state-unavailable" : r ? "state-active" : "state-inactive";
    return o`
      <ha-card
        class="interactive status-card assembled-card ${i ? "unavailable" : ""}"
        role="button"
        tabindex="${i ? "-1" : "0"}"
        aria-disabled="${String(i)}"
        aria-label="${a}: ${n}"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="header-row ${d}">
          <div class="icon-well control-radius ${r ? "active" : ""}">
            ${this._renderIcon(s)}
          </div>

          <div class="copy-block">
            <div class="label-title" title=${a}>${a}</div>
            <div class="label-sub">
              ${c ? o`${c} &bull; ` : F}
              <span class="state-label">${n}</span>
            </div>
          </div>

          ${l ? o`
                  <button
                    class="toggle-btn"
                    role="switch"
                    aria-checked="${String(r)}"
                    ?disabled=${i}
                    aria-disabled="${String(i)}"
                    @click=${this._handleToggle}
                    aria-label="Toggle ${a}"
                    title="Toggle state"
                  >
                    <span class="switch-pill ${r ? "on" : ""}"
                      ><span></span
                    ></span>
                  </button>
                ` : F}
        </div>
      </ha-card>
    `;
  }
};
sr.styles = Cl;
sr = El([
  k("ha-status-card")
], sr);
console.info(
  "%c HA-COMPONENT-LIBRARY %c 1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #03a9f4; background: #e1f5fe; font-weight: 700; border-radius: 0 3px 3px 0;"
);
export {
  di as ComponentActionV2,
  Nt as ComponentAppleTvControllerV1,
  Xi as ComponentCameraControllerV1,
  nt as ComponentCameraControllerV2,
  hi as ComponentContextStripV3,
  ce as ComponentControlRowV2,
  le as ComponentDeviceAwareAutoEntitiesV1,
  de as ComponentDeviceDiscoveryV2,
  Ji as ComponentEmptyStateV2,
  Ie as ComponentEmptyStateV3,
  Ne as ComponentEnergyDashboardV1,
  fe as ComponentEnergyDaySelectorV1,
  _t as ComponentEnergySummaryV1,
  $i as ComponentFavouritesMinimalV1,
  St as ComponentFavouritesV3,
  Ct as ComponentGarageDoorControllerV1,
  be as ComponentHistoryGraphV2,
  Me as ComponentHomeOverviewV4,
  tr as ComponentHomeOverviewV5,
  er as ComponentHouseholdAttentionV1,
  _e as ComponentHouseholdAttentionV2,
  Le as ComponentHouseholdDirectoryV3,
  pi as ComponentListV2,
  Rt as ComponentMediaRowV2,
  kt as ComponentMetricPairCardV3,
  yi as ComponentNavigationTileV2,
  ui as ComponentNoticeV2,
  mi as ComponentProgressV2,
  xi as ComponentQuickNavigationV2,
  ve as ComponentRoomDirectoryV4,
  Re as ComponentRoomNavigationV1,
  wi as ComponentRoomSheetV2,
  gi as ComponentSectionSeparatorV2,
  ue as ComponentSecurityCameraWallV3,
  ot as ComponentSecurityDashboardV1,
  me as ComponentSecurityEntryPointsV1,
  ge as ComponentSecuritySummaryV1,
  fi as ComponentSingleKpiV2,
  Mt as ComponentSmartCollectionV3,
  pe as ComponentSplitControllerV4,
  bi as ComponentStatusRowV2,
  vi as ComponentTextEffectV1,
  _i as ComponentThreeStatV2,
  Ht as ComponentUpdateRowV3,
  he as ComponentUpdateSummaryV3,
  Ci as ComponentWelcomeHeaderV1,
  pt as ComponentWledControllerV1,
  Es as DASHBOARD_BASE_CARD_STYLES,
  zi as DASHBOARD_SHARED_STYLE_CSS,
  Hl as DASHBOARD_SHARED_STYLE_ID,
  Ys as DashboardRegistryCoordinator,
  Lt as EnergyHistoryCardV3,
  ba as GLOBAL_THEME_CSS,
  ks as GLOBAL_THEME_STYLE_ID,
  ir as HaActionTile,
  Ii as HaBaseCard,
  It as HaComponentLibraryConfigEditor,
  rr as HaMetricBadge,
  ar as HaQuickBar,
  sr as HaStatusCard,
  it as HomeAssistantActionError,
  Gt as INTERACTION_DEFAULTS,
  E as LitBaseCard,
  As as PRESENTATIONAL_CARD_STYLES,
  He as SolarDaylightCardV7,
  Ds as UPDATE_CARD_STYLES,
  Yi as WLED_DOMAIN,
  ia as WLED_INVALID,
  Ha as WLED_NAME,
  cn as actionCardStyles,
  ii as actionRole,
  ul as actionTileCardStyles,
  Sa as appleTvBundle,
  Lo as appleTvCardStyles,
  Pa as applyPrefs,
  ie as areaOf,
  mt as assemblyStyles,
  ut as badgeProgressStyles,
  W as buttonStyles,
  la as calendarDayRange,
  Bo as cameraCardStyles,
  z as cardBaseStyles,
  G as centralRegistry,
  Ul as commonCardStyles,
  Ia as computeAreaStatusSummary,
  ht as computeDomain,
  Et as computeEntityDisplayName,
  Pi as computeEntityName,
  Hs as computeMetricSeverity,
  _r as connectionId,
  pn as contextStripCardStyles,
  Xs as controlConfig,
  Aa as controlDomains,
  Ee as controlResolvers,
  uo as controlRowCardStyles,
  Fe as controlStyles,
  ga as createAsyncBroker,
  Oa as createCardElement,
  Cs as createLifecycle,
  fa as createMinuteScheduler,
  pr as createRequestCoalescer,
  Ml as dashboardBaseCardStyles,
  an as dashboardProfiles,
  Ll as dashboardTokens,
  Oe as dayKey,
  Ce as dayKeyInZone,
  Da as defaultControlConfig,
  xo as deviceAwareAutoEntitiesCardStyles,
  ko as deviceDiscoveryCardStyles,
  At as dialogStyles,
  Zi as discoverControls,
  R as domainOf,
  fn as emptyStateCardStyles,
  gc as energyDashboardCardStyles,
  re as energyDayData,
  fc as energyDaySelectorCardStyles,
  B as energyDayState,
  Sc as energyHistoryCardStyles,
  _c as energySummaryCardStyles,
  $s as ensureInteractionFeedback,
  jl as entityRowPrimitiveStyles,
  Ae as entryFilters,
  L as escapeHtml,
  Uc as favouritesCardStyles,
  mr as feedbackStyles,
  vt as fireEvent,
  va as formControlStyles,
  Ei as formatCalendarDay,
  Ai as formatDate,
  wt as formatEnergy,
  X as formatEntityState,
  ft as formatPower,
  oi as formatTime,
  ka as garageControl,
  Wo as garageDoorCardStyles,
  xe as getDefaultIconForDomain,
  ur as globalTokens,
  Oi as handleAction,
  Ol as headerStyles,
  Zl as healthAwareRegistryLoad,
  Oc as historyGraphCardStyles,
  Fc as homeOverviewCardStyles,
  ll as householdAttentionCardStyles,
  Xc as householdDirectoryCardStyles,
  Rl as iconBoxStyles,
  Ut as iconButtonStyles,
  U as iconWellStyles,
  on as initWledIntegration,
  Nl as injectDashboardTokens,
  Pl as injectGlobalTokens,
  _s as installConfigContract,
  T as interaction,
  ys as interactionStyles,
  Js as isActive,
  Us as isControlActive,
  vr as isDiagnosticOrPeripheral,
  oe as isEntityActive,
  bt as isEntityAvailable,
  Z as isEntityUnavailable,
  $a as isPeripheralEntity,
  Zs as isPotential,
  Wr as isPrimaryControl,
  Kl as isSensorMetric,
  _n as listCardStyles,
  Ql as loadDashboardRegistries,
  Ta as loadPrefs,
  We as loadSecurityModel,
  ki as localeOf,
  bo as mediaRowCardStyles,
  vl as metricBadgeCardStyles,
  Nc as metricPairCardStyles,
  Fl as metricPrimitiveStyles,
  Ca as nativeClimateControlConfig,
  Qn as navTileCardStyles,
  ca as navigateTo,
  Wl as navigationPrimitiveStyles,
  $n as noticeCardStyles,
  ae as numberFormat,
  Ga as openMoreInfo,
  zl as prefersReducedMotion,
  Ts as presentationalCardStyles,
  An as progressCardStyles,
  sn as ptzRole,
  xl as quickBarCardStyles,
  to as quickNavCardStyles,
  A as registerCard,
  Ea as registerControlResolver,
  Yl as registerDeviceResolver,
  wa as registerEntryFilter,
  Ss as remoteStyles,
  Bl as renderEntityRow,
  Vl as renderMetric,
  Gl as renderNavigationItem,
  Yr as resolveDeviceCard,
  rl as roomDirectoryCardStyles,
  ao as roomNavigationCardStyles,
  co as roomSheetCardStyles,
  ct as rowListStyles,
  Il as rowStyles,
  S as runServiceAction,
  za as savePrefs,
  zn as sectionSeparatorCardStyles,
  rc as securityCameraWallCardStyles,
  Hi as securityCapabilityText,
  nc as securityDashboardCardStyles,
  ei as securityEntityLabel,
  lc as securityEntryPointsCardStyles,
  nn as securityModel,
  pc as securitySummaryCardStyles,
  Ve as separatorStyles,
  In as singleKpiCardStyles,
  Yc as smartCollectionCardStyles,
  wc as solarDaylightCardStyles,
  Yo as splitAcCardStyles,
  Yt as splitIdentity,
  st as stateNameOf,
  Cl as statusCardCardStyles,
  Ln as statusRowCardStyles,
  K as surfaceStyles,
  ea as switchRole,
  gr as telemetryStyles,
  jn as textEffectCardStyles,
  Wn as threeStatCardStyles,
  Si as timeZoneOf,
  oa as toText,
  P as typographyStyles,
  Ri as uiEntry,
  ql as updateCardStyles,
  To as updateRowCardStyles,
  Io as updateSummaryCardStyles,
  Ra as validDay,
  Pe as waitForEntityState,
  Vc as welcomeHeaderCardStyles,
  tc as wledCardStyles
};
