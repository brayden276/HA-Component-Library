const Qr = (t) => t == null ? "" : String(t), I = (t) => Qr(t).replace(
  /[&<>"']/g,
  (e) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[e] || e
), ft = (t, e, i, r) => {
  const s = new CustomEvent(e, {
    bubbles: r?.bubbles ?? !0,
    cancelable: !!r?.cancelable,
    composed: r?.composed ?? !0,
    detail: i
  });
  return t.dispatchEvent(s), s;
}, Hs = (t, e) => {
  e && ft(t, "hass-more-info", { entityId: e });
}, Zr = (t) => {
  t && (window.history.pushState(null, "", t), ft(window, "location-changed", { replace: !1 }));
}, Ki = (t) => {
  const e = t?.locale?.language || (typeof navigator < "u" ? navigator.language : "en-AU") || "en-AU";
  return e === "en" ? "en-AU" : e;
}, Yi = (t) => t?.config?.time_zone || void 0, ke = (t, e, i = {}) => {
  const r = Number(e);
  return Number.isFinite(r) ? new Intl.NumberFormat(Ki(t), i).format(r) : "—";
}, mt = (t, e, i = {}) => {
  if (e == null || e === "") return "—";
  const r = Number(e);
  if (!Number.isFinite(r)) return "—";
  const s = i.absolute ? Math.abs(r) : r;
  return Math.abs(s) >= 1e3 ? `${ke(t, s / 1e3, { maximumFractionDigits: 1 })} kW` : `${ke(t, Math.round(s), { maximumFractionDigits: 0 })} W`;
}, xt = (t, e) => {
  if (e == null || e === "") return "—";
  const i = Number(e);
  return Number.isFinite(i) ? `${ke(t, i, { maximumFractionDigits: Math.abs(i) < 1 ? 2 : 1 })} kWh` : "—";
}, bi = (t, e, i) => new Intl.DateTimeFormat(Ki(t), {
  timeZone: Yi(t),
  ...i
}).format(new Date(e)), _i = (t, e, i = {}) => {
  const r = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  return r ? bi(
    t,
    Date.UTC(Number(r[1]), Number(r[2]) - 1, Number(r[3]), 12),
    {
      timeZone: "UTC",
      ...i
    }
  ) : "—";
}, Jr = (t, e) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  if (!i) return null;
  const r = Number(i[1]), s = Number(i[2]) - 1, a = Number(i[3]), n = Yi(t);
  if (!n)
    return { start: new Date(r, s, a).getTime(), end: new Date(r, s, a + 1).getTime() };
  const c = new Intl.DateTimeFormat("en-AU", {
    timeZone: n,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }), l = (d, f, m) => {
    const b = Date.UTC(d, f, m);
    let u = b;
    for (let h = 0; h < 2; h += 1) {
      const _ = Object.fromEntries(
        c.formatToParts(new Date(u)).map((g) => [g.type, g.value])
      ), p = Date.UTC(
        Number(_.year),
        Number(_.month) - 1,
        Number(_.day),
        Number(_.hour),
        Number(_.minute),
        Number(_.second)
      );
      u += b - p;
    }
    return u;
  };
  return {
    start: l(r, s, a),
    end: l(r, s, a + 1)
  };
}, Xe = (t, e, i = {}) => bi(t, e, {
  hour: "numeric",
  minute: "2-digit",
  ...i
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = globalThis, Qi = Qe.ShadowRoot && (Qe.ShadyCSS === void 0 || Qe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Zi = Symbol(), $r = /* @__PURE__ */ new WeakMap();
let Xr = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== Zi) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Qi && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = $r.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && $r.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ue = (t) => new Xr(typeof t == "string" ? t : t + "", void 0, Zi), y = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, s, a) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + t[a + 1], t[0]);
  return new Xr(i, t, Zi);
}, Ns = (t, e) => {
  if (Qi) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), s = Qe.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = i.cssText, t.appendChild(r);
  }
}, Cr = Qi ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return ue(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ls, defineProperty: Is, getOwnPropertyDescriptor: Ms, getOwnPropertyNames: qs, getOwnPropertySymbols: Us, getPrototypeOf: js } = Object, vi = globalThis, kr = vi.trustedTypes, Bs = kr ? kr.emptyScript : "", Fs = vi.reactiveElementPolyfillSupport, we = (t, e) => t, ti = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Bs : null;
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
} }, Ji = (t, e) => !Ls(t, e), Sr = { attribute: !0, type: String, converter: ti, reflect: !1, useDefault: !1, hasChanged: Ji };
Symbol.metadata ??= Symbol("metadata"), vi.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Wt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Sr) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), s = this.getPropertyDescriptor(e, r, i);
      s !== void 0 && Is(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: s, set: a } = Ms(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: s, set(n) {
      const c = s?.call(this);
      a?.call(this, n), this.requestUpdate(e, c, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Sr;
  }
  static _$Ei() {
    if (this.hasOwnProperty(we("elementProperties"))) return;
    const e = js(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(we("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(we("properties"))) {
      const i = this.properties, r = [...qs(i), ...Us(i)];
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
      for (const s of r) i.unshift(Cr(s));
    } else e !== void 0 && i.push(Cr(e));
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
    return Ns(e, this.constructor.elementStyles), e;
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
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : ti).toAttribute(i, r.type);
      this._$Em = e, a == null ? this.removeAttribute(s) : this.setAttribute(s, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const r = this.constructor, s = r._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const a = r.getPropertyOptions(s), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : ti;
      this._$Em = s;
      const c = n.fromAttribute(i, a.type);
      this[s] = c ?? this._$Ej?.get(s) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, s = !1, a) {
    if (e !== void 0) {
      const n = this.constructor;
      if (s === !1 && (a = this[e]), r ??= n.getPropertyOptions(e), !((r.hasChanged ?? Ji)(a, i) || r.useDefault && r.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(n._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: s, wrapped: a }, n) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [s, a] of r) {
        const { wrapped: n } = a, c = this[s];
        n !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, a, c);
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
Wt.elementStyles = [], Wt.shadowRootOptions = { mode: "open" }, Wt[we("elementProperties")] = /* @__PURE__ */ new Map(), Wt[we("finalized")] = /* @__PURE__ */ new Map(), Fs?.({ ReactiveElement: Wt }), (vi.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xi = globalThis, Ar = (t) => t, ei = Xi.trustedTypes, Er = ei ? ei.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ts = "$lit$", vt = `lit$${Math.random().toFixed(9).slice(2)}$`, es = "?" + vt, Vs = `<${es}>`, Tt = document, Se = () => Tt.createComment(""), Ae = (t) => t === null || typeof t != "object" && typeof t != "function", tr = Array.isArray, Ws = (t) => tr(t) || typeof t?.[Symbol.iterator] == "function", Hi = `[ 	
\f\r]`, ve = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Dr = /-->/g, Tr = />/g, Et = RegExp(`>|${Hi}(?:([^\\s"'>=/]+)(${Hi}*=${Hi}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Pr = /'/g, zr = /"/g, is = /^(?:script|style|textarea|title)$/i, Gs = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), o = Gs(1), Xt = Symbol.for("lit-noChange"), F = Symbol.for("lit-nothing"), Or = /* @__PURE__ */ new WeakMap(), Dt = Tt.createTreeWalker(Tt, 129);
function rs(t, e) {
  if (!tr(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Er !== void 0 ? Er.createHTML(e) : e;
}
const Ks = (t, e) => {
  const i = t.length - 1, r = [];
  let s, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = ve;
  for (let c = 0; c < i; c++) {
    const l = t[c];
    let d, f, m = -1, b = 0;
    for (; b < l.length && (n.lastIndex = b, f = n.exec(l), f !== null); ) b = n.lastIndex, n === ve ? f[1] === "!--" ? n = Dr : f[1] !== void 0 ? n = Tr : f[2] !== void 0 ? (is.test(f[2]) && (s = RegExp("</" + f[2], "g")), n = Et) : f[3] !== void 0 && (n = Et) : n === Et ? f[0] === ">" ? (n = s ?? ve, m = -1) : f[1] === void 0 ? m = -2 : (m = n.lastIndex - f[2].length, d = f[1], n = f[3] === void 0 ? Et : f[3] === '"' ? zr : Pr) : n === zr || n === Pr ? n = Et : n === Dr || n === Tr ? n = ve : (n = Et, s = void 0);
    const u = n === Et && t[c + 1].startsWith("/>") ? " " : "";
    a += n === ve ? l + Vs : m >= 0 ? (r.push(d), l.slice(0, m) + ts + l.slice(m) + vt + u) : l + vt + (m === -2 ? c : u);
  }
  return [rs(t, a + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Ee {
  constructor({ strings: e, _$litType$: i }, r) {
    let s;
    this.parts = [];
    let a = 0, n = 0;
    const c = e.length - 1, l = this.parts, [d, f] = Ks(e, i);
    if (this.el = Ee.createElement(d, r), Dt.currentNode = this.el.content, i === 2 || i === 3) {
      const m = this.el.content.firstChild;
      m.replaceWith(...m.childNodes);
    }
    for (; (s = Dt.nextNode()) !== null && l.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const m of s.getAttributeNames()) if (m.endsWith(ts)) {
          const b = f[n++], u = s.getAttribute(m).split(vt), h = /([.?@])?(.*)/.exec(b);
          l.push({ type: 1, index: a, name: h[2], strings: u, ctor: h[1] === "." ? Qs : h[1] === "?" ? Zs : h[1] === "@" ? Js : yi }), s.removeAttribute(m);
        } else m.startsWith(vt) && (l.push({ type: 6, index: a }), s.removeAttribute(m));
        if (is.test(s.tagName)) {
          const m = s.textContent.split(vt), b = m.length - 1;
          if (b > 0) {
            s.textContent = ei ? ei.emptyScript : "";
            for (let u = 0; u < b; u++) s.append(m[u], Se()), Dt.nextNode(), l.push({ type: 2, index: ++a });
            s.append(m[b], Se());
          }
        }
      } else if (s.nodeType === 8) if (s.data === es) l.push({ type: 2, index: a });
      else {
        let m = -1;
        for (; (m = s.data.indexOf(vt, m + 1)) !== -1; ) l.push({ type: 7, index: a }), m += vt.length - 1;
      }
      a++;
    }
  }
  static createElement(e, i) {
    const r = Tt.createElement("template");
    return r.innerHTML = e, r;
  }
}
function te(t, e, i = t, r) {
  if (e === Xt) return e;
  let s = r !== void 0 ? i._$Co?.[r] : i._$Cl;
  const a = Ae(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== a && (s?._$AO?.(!1), a === void 0 ? s = void 0 : (s = new a(t), s._$AT(t, i, r)), r !== void 0 ? (i._$Co ??= [])[r] = s : i._$Cl = s), s !== void 0 && (e = te(t, s._$AS(t, e.values), s, r)), e;
}
class Ys {
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
    const { el: { content: i }, parts: r } = this._$AD, s = (e?.creationScope ?? Tt).importNode(i, !0);
    Dt.currentNode = s;
    let a = Dt.nextNode(), n = 0, c = 0, l = r[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let d;
        l.type === 2 ? d = new Le(a, a.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(a, l.name, l.strings, this, e) : l.type === 6 && (d = new Xs(a, this, e)), this._$AV.push(d), l = r[++c];
      }
      n !== l?.index && (a = Dt.nextNode(), n++);
    }
    return Dt.currentNode = Tt, s;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class Le {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, r, s) {
    this.type = 2, this._$AH = F, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    e = te(this, e, i), Ae(e) ? e === F || e == null || e === "" ? (this._$AH !== F && this._$AR(), this._$AH = F) : e !== this._$AH && e !== Xt && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ws(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== F && Ae(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Tt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: r } = e, s = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Ee.createElement(rs(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === s) this._$AH.p(i);
    else {
      const a = new Ys(s, this), n = a.u(this.options);
      a.p(i), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Or.get(e.strings);
    return i === void 0 && Or.set(e.strings, i = new Ee(e)), i;
  }
  k(e) {
    tr(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, s = 0;
    for (const a of e) s === i.length ? i.push(r = new Le(this.O(Se()), this.O(Se()), this, this.options)) : r = i[s], r._$AI(a), s++;
    s < i.length && (this._$AR(r && r._$AB.nextSibling, s), i.length = s);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const r = Ar(e).nextSibling;
      Ar(e).remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class yi {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, s, a) {
    this.type = 1, this._$AH = F, this._$AN = void 0, this.element = e, this.name = i, this._$AM = s, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = F;
  }
  _$AI(e, i = this, r, s) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = te(this, e, i, 0), n = !Ae(e) || e !== this._$AH && e !== Xt, n && (this._$AH = e);
    else {
      const c = e;
      let l, d;
      for (e = a[0], l = 0; l < a.length - 1; l++) d = te(this, c[r + l], i, l), d === Xt && (d = this._$AH[l]), n ||= !Ae(d) || d !== this._$AH[l], d === F ? e = F : e !== F && (e += (d ?? "") + a[l + 1]), this._$AH[l] = d;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === F ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Qs extends yi {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === F ? void 0 : e;
  }
}
class Zs extends yi {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== F);
  }
}
class Js extends yi {
  constructor(e, i, r, s, a) {
    super(e, i, r, s, a), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = te(this, e, i, 0) ?? F) === Xt) return;
    const r = this._$AH, s = e === F && r !== F || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== F && (r === F || s);
    s && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Xs {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    te(this, e);
  }
}
const ta = Xi.litHtmlPolyfillSupport;
ta?.(Ee, Le), (Xi.litHtmlVersions ??= []).push("3.3.3");
const ea = (t, e, i) => {
  const r = i?.renderBefore ?? e;
  let s = r._$litPart$;
  if (s === void 0) {
    const a = i?.renderBefore ?? null;
    r._$litPart$ = s = new Le(e.insertBefore(Se(), a), a, void 0, i ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const er = globalThis;
class wt extends Wt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ea(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Xt;
  }
}
wt._$litElement$ = !0, wt.finalized = !0, er.litElementHydrateSupport?.({ LitElement: wt });
const ia = er.litElementPolyfillSupport;
ia?.({ LitElement: wt });
(er.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const S = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ra = { attribute: !0, type: String, converter: ti, reflect: !1, hasChanged: Ji }, sa = (t = ra, e, i) => {
  const { kind: r, metadata: s } = i;
  let a = globalThis.litPropertyMetadata.get(s);
  if (a === void 0 && globalThis.litPropertyMetadata.set(s, a = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(i.name, t), r === "accessor") {
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
function me(t) {
  return (e, i) => typeof i == "object" ? sa(t, e, i) : ((r, s, a) => {
    const n = s.hasOwnProperty(a);
    return s.constructor.createProperty(a, r), n ? Object.getOwnPropertyDescriptor(s, a) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function w(t) {
  return me({ ...t, state: !0, attribute: !1 });
}
var aa = Object.defineProperty, na = Object.getOwnPropertyDescriptor, Ie = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? na(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && aa(e, i, s), s;
};
let Pt = class extends wt {
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
          ${this.cardType ? o`<span class="type-badge">${I(this.cardType)}</span>` : ""}
        </div>
        <textarea
          .value=${t}
          @change=${this._onChange}
          spellcheck="false"
          aria-label="Card Configuration JSON"
        ></textarea>
        ${this._error ? o`<div class="error">⚠️ ${I(this._error)}</div>` : ""}
      </div>
    `;
  }
};
Pt.styles = y`
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
Ie([
  me({ attribute: !1 })
], Pt.prototype, "hass", 2);
Ie([
  me({ type: String })
], Pt.prototype, "cardType", 2);
Ie([
  w()
], Pt.prototype, "_config", 2);
Ie([
  w()
], Pt.prototype, "_error", 2);
Pt = Ie([
  S("ha-component-library-config-editor")
], Pt);
const oa = (t, e) => {
  e.getStubConfig || (e.getStubConfig = () => ({
    ...e.stubConfig || {}
  })), e.getConfigElement || (e.getConfigElement = () => {
    const i = document.createElement(
      "ha-component-library-config-editor"
    );
    return i.cardType = t, i;
  });
}, R = (t) => {
  const { type: e, element: i, name: r, description: s, preview: a = !0 } = t;
  oa(e, i), customElements.get(e) || customElements.define(e, i), typeof window < "u" && (window.customCards = window.customCards || [], window.customCards.some((n) => n.type === e) || window.customCards.push({
    type: e,
    name: r,
    description: s,
    preview: a
  }));
}, jt = Object.freeze({
  holdDelay: 500,
  moveTolerance: 10,
  errorDuration: 1800,
  repeatDelay: 350,
  repeatInterval: 110,
  repeatMinimumInterval: 55
}), hl = () => typeof window < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0, ca = `
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
`, la = (t) => {
  if (!t) return null;
  if (t === !0) return {};
  if (typeof t != "object")
    throw new TypeError(
      "interaction repeat must be false, true, or an options object"
    );
  return t;
}, da = (t, e) => {
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
}, ha = (t) => {
  const e = t.getRootNode?.();
  if (!e || e.__haInteractionFeedbackV2) return null;
  e.__haInteractionFeedbackV2 = !0;
  const i = document.createElement("style");
  i.setAttribute("data-ha-interaction-styles", "v2"), i.textContent = ca;
  const r = document.createElement("span");
  r.setAttribute("data-ha-interaction-status", "v2"), r.setAttribute("role", "status"), r.setAttribute("aria-live", "polite"), r.setAttribute("aria-atomic", "true");
  const s = e.nodeType === 9 || e.body ? e.body || e.head || e.documentElement : e;
  return s && typeof s.append == "function" && s.append(i, r), r;
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
].join(","), A = (t, e = {}) => {
  if (!t?.addEventListener)
    throw new TypeError("interaction requires an EventTarget element");
  const i = ha(t), r = typeof e.primary == "function" ? e.primary : null, s = typeof e.hold == "function" ? e.hold : null, a = la(e.repeat);
  if (s && a)
    throw new TypeError("interaction hold and repeat are mutually exclusive");
  if (!r && (s || a))
    throw new TypeError("interaction hold/repeat requires a primary action");
  const n = e.feedback !== !1, c = e.singleFlight === !0, l = Math.max(
    250,
    Number(e.holdDelay) || jt.holdDelay
  ), d = Math.max(
    4,
    Number(e.moveTolerance) || jt.moveTolerance
  ), f = da(e.optimistic, t), m = e.signal, b = typeof e.onPressChange == "function" ? e.onPressChange : null;
  let u = null, h = null, _ = null, p = null, g = 0, C = !1, v = null, k = !1, N = 0, M = null, q = !1, x = !1;
  const P = ($) => {
    const et = $?.composedPath?.();
    if (Array.isArray(et) && et.length)
      for (const ot of et) {
        if (ot === t) return !1;
        if (ot?.matches?.(Rr))
          return !0;
      }
    const rt = $?.target;
    if (!rt || rt === t) return !1;
    const st = rt.closest?.(Rr);
    return !!(st && st !== t && t.contains?.(st));
  }, U = () => q || c && N > 0 || t.disabled === !0 || t.getAttribute?.("aria-disabled") === "true", L = () => {
    v && clearTimeout(v), v = null, C = !1;
  }, K = () => {
    C = !0, v && clearTimeout(v), v = setTimeout(L, 0);
  }, Y = ($) => {
    x !== $ && (x = $, n && t.toggleAttribute?.("data-interaction-pressed", $), q || b?.($, t));
  }, qt = ($) => {
    N = Math.max(0, N + $), !(!n || q) && (t.toggleAttribute?.("data-interaction-pending", N > 0), t.setAttribute?.("aria-busy", String(N > 0)));
  }, Ut = () => {
    if (!n || q) return;
    M && clearTimeout(M), t.setAttribute?.("data-interaction-error", "true");
    const $ = i || t.getRootNode?.()?.querySelector?.(
      "[data-ha-interaction-status]"
    );
    $ && ($.textContent = e.errorMessage || "Action failed. Try again."), M = setTimeout(
      () => {
        M = null, q || t.removeAttribute?.("data-interaction-error");
      },
      Math.max(
        250,
        Number(e.errorDuration) || jt.errorDuration
      )
    );
  }, Be = ($) => {
    q || t.dispatchEvent?.(
      new CustomEvent("ha-interaction-error", {
        bubbles: !0,
        composed: !0,
        detail: { error: $ }
      })
    );
  }, ut = ($, et) => {
    if (U()) return Promise.resolve(void 0);
    const rt = $ === "hold" ? s : r;
    if (!rt) return Promise.resolve(void 0);
    let st;
    $ === "primary" && f && (st = f.capture(t, et), f.apply(t, et, st));
    let ot;
    try {
      ot = rt(et);
    } catch (At) {
      return !q && $ === "primary" && f?.rollback && f.rollback(st, At, t, et), Ut(), Be(At), Promise.reject(At);
    }
    return !ot || typeof ot.then != "function" ? Promise.resolve(ot) : (qt(1), Promise.resolve(ot).catch((At) => {
      throw !q && $ === "primary" && f?.rollback && f.rollback(st, At, t, et), Ut(), Be(At), At;
    }).finally(() => {
      q || qt(-1);
    }));
  }, z = () => {
    h && clearTimeout(h), h = null, _ && clearTimeout(_), _ = null, p && clearInterval(p), p = null;
  }, tt = () => {
    z(), u = null, Y(!1);
  }, _t = ($) => {
    if (!a || U()) return;
    const et = Math.max(
      150,
      Number(a.delay) || jt.repeatDelay
    ), rt = Math.max(
      40,
      Number(a.interval) || jt.repeatInterval
    );
    g = 0, _ = setTimeout(() => {
      if (_ = null, q || !u) return;
      k = !0, K();
      const st = () => {
        if (q || !u) {
          p && clearInterval(p), p = null;
          return;
        }
        if (g += 1, ut("primary", $).catch(() => {
        }), q || !u || !a.accelerate) return;
        const ot = Math.max(
          Number(a.minimumInterval) || jt.repeatMinimumInterval,
          Math.round(rt * Math.pow(0.93, g))
        );
        p && clearInterval(p), p = setInterval(st, ot);
      };
      ut("primary", $).catch(() => {
      }), !q && u && (p = setInterval(st, rt));
    }, et);
  }, St = ($) => {
    if (!(!r || U() || $.button > 0 || P($))) {
      u = { id: $.pointerId, x: $.clientX, y: $.clientY }, k = !1, L();
      try {
        t.setPointerCapture?.($.pointerId);
      } catch {
      }
      Y(!0), s ? h = setTimeout(() => {
        h = null, u && (k = !0, K(), Y(!1), ut("hold", $).catch(() => {
        }));
      }, l) : a && _t($);
    }
  }, _e = ($) => {
    !u || $.pointerId !== u.id || Math.hypot($.clientX - u.x, $.clientY - u.y) <= d || (k = !0, K(), tt());
  }, vr = ($) => {
    if (!u || $.pointerId !== u.id) return;
    if (P($)) {
      k = !0, K(), tt();
      return;
    }
    const et = k, rt = a && (_ === null || p !== null);
    z(), u = null, k = !1, Y(!1), K(), !et && !rt && ut("primary", $).catch(() => {
    });
  }, Fe = () => {
    k = !1, K(), tt();
  }, yr = ($) => {
    if (!P($)) {
      if (C) {
        $.preventDefault(), $.stopImmediatePropagation?.(), L();
        return;
      }
      !r || U() || ut("primary", $).catch(() => {
      });
    }
  }, xr = ($) => {
    !r || U() || $.repeat || P($) || $.key !== "Enter" && $.key !== " " || ($.preventDefault(), Y(!0));
  }, wr = ($) => {
    !r || U() || P($) || $.key !== "Enter" && $.key !== " " || ($.preventDefault(), Y(!1), K(), ut("primary", $).catch(() => {
    }));
  };
  t.addEventListener("pointerdown", St, {
    passive: !0
  }), t.addEventListener("pointermove", _e, {
    passive: !0
  }), t.addEventListener("pointerup", vr, {
    passive: !0
  }), t.addEventListener("pointercancel", Fe, {
    passive: !0
  }), t.addEventListener(
    "lostpointercapture",
    Fe,
    { passive: !0 }
  ), t.addEventListener("click", yr, !0), t.addEventListener("keydown", xr), t.addEventListener("keyup", wr);
  const Ri = () => {
    q || (q = !0, z(), M && clearTimeout(M), v && clearTimeout(v), M = null, v = null, m?.removeEventListener?.("abort", Ri), x = !1, N = 0, n && (t.removeAttribute?.("data-interaction-pressed"), t.removeAttribute?.("data-interaction-pending"), t.removeAttribute?.("data-interaction-error"), t.setAttribute?.("aria-busy", "false")), t.removeEventListener("pointerdown", St), t.removeEventListener("pointermove", _e), t.removeEventListener("pointerup", vr), t.removeEventListener(
      "pointercancel",
      Fe
    ), t.removeEventListener(
      "lostpointercapture",
      Fe
    ), t.removeEventListener("click", yr, !0), t.removeEventListener("keydown", xr), t.removeEventListener("keyup", wr));
  };
  return m?.addEventListener?.("abort", Ri, { once: !0 }), Object.freeze({
    element: t,
    destroy: Ri,
    get destroyed() {
      return q;
    },
    invoke: ($) => ut("primary", $)
  });
}, ir = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createRequestCoalescer requires a request function");
  let i = !1, r = !1, s, a = !1, n = 0;
  const c = async () => {
    if (!(i || a || !r)) {
      for (i = !0; !a && r; ) {
        r = !1;
        const l = s, d = ++n;
        try {
          await t(l, d), a || e.onSuccess?.(l, d);
        } catch (f) {
          a || e.onError?.(f, l, d), e.stopOnError && (r = !1);
        }
      }
      i = !1, a || e.onIdle?.();
    }
  };
  return Object.freeze({
    request(l) {
      a || (s = l, r = !0, c());
    },
    get pending() {
      return !a && (i || r);
    },
    get destroyed() {
      return a;
    },
    destroy() {
      a = !0, r = !1;
    }
  });
}, De = (t, e, i, r = {}) => {
  if (!e || typeof i != "function")
    return Promise.reject(
      new TypeError("waitForEntityState requires an entity and predicate")
    );
  const s = typeof t == "function" ? t : () => t, a = Math.max(250, Number(r.timeout) || 9e3), n = Math.max(40, Number(r.interval) || 160), c = r.signal;
  return new Promise((l, d) => {
    let f = null, m = null, b = !1;
    const u = () => {
      f && clearInterval(f), m && clearTimeout(m), c?.removeEventListener?.("abort", _);
    }, h = (g, C) => {
      b || (b = !0, u(), g(C));
    }, _ = () => h(d, c?.reason || new Error("State confirmation aborted")), p = () => {
      const g = s()?.states?.[e] ?? null;
      try {
        i(g?.state, g) && h(l, g);
      } catch (C) {
        h(d, C);
      }
    };
    if (c?.aborted) return _();
    c?.addEventListener?.("abort", _, { once: !0 }), f = setInterval(p, n), m = setTimeout(
      () => h(d, new Error("State confirmation timed out")),
      a
    ), p();
  });
}, ss = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createAsyncBroker requires a loader");
  const i = /* @__PURE__ */ new Map(), r = Math.max(0, Number(e.ttl) || 12e4), s = Math.max(r, Number(e.maxStale) || 864e5), a = Math.max(250, Number(e.retryBase) || 2e3), n = Math.max(a, Number(e.retryMax) || 6e4), c = (m) => (i.has(m) || i.set(m, {
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
  }), i.get(m)), l = (m) => {
    const b = c(m), u = b.updatedAt ? Date.now() - b.updatedAt : 1 / 0;
    return Object.freeze({
      value: b.value,
      error: b.error,
      loading: !!b.promise,
      stale: b.value !== void 0 && (b.invalidated || u > r),
      updatedAt: b.updatedAt
    });
  }, d = (m) => {
    const b = l(m);
    for (const u of [...c(m).subscribers])
      try {
        u(b);
      } catch {
      }
  }, f = (m, b, u = !1) => {
    const h = c(m), _ = Date.now();
    if (h.promise) return h.promise;
    if (!u && _ < h.nextRetryAt)
      return h.value !== void 0 ? Promise.resolve(h.value) : Promise.reject(h.error);
    const p = ++h.sequence, g = h.generation;
    return h.promise = Promise.resolve().then(() => t(m, b, p)).then((C) => p !== h.sequence ? h.value : (h.value = C, h.error = null, h.updatedAt = Date.now(), h.failures = 0, h.nextRetryAt = 0, h.invalidated = h.generation !== g, C)).catch((C) => {
      if (p !== h.sequence || (h.error = C instanceof Error ? C : new Error(String(C)), h.failures += 1, h.nextRetryAt = Date.now() + Math.min(n, a * Math.pow(2, h.failures - 1)), h.value !== void 0 && Date.now() - h.updatedAt <= s))
        return h.value;
      throw h.error;
    }).finally(() => {
      p === h.sequence && (h.promise = null), d(m);
    }), d(m), h.promise;
  };
  return Object.freeze({
    clear() {
      i.clear();
    },
    invalidate(m) {
      const b = i.get(m);
      b && (b.invalidated = !0, b.generation += 1, b.nextRetryAt = 0, d(m));
    },
    peek: l,
    async read(m, b, u = {}) {
      const h = l(m), _ = h.updatedAt ? Date.now() - h.updatedAt : 1 / 0, p = c(m);
      if (!u.force && !p.invalidated && h.value !== void 0 && _ <= r)
        return h.value;
      if (!u.force && h.value !== void 0 && _ <= s)
        return f(m, b).catch(() => {
        }), h.value;
      let g;
      try {
        g = await f(m, b, u.force === !0);
      } catch (C) {
        if (u.force && c(m).invalidated)
          return f(m, b, !0);
        throw C;
      }
      return u.force && c(m).invalidated && (g = await f(m, b, !0)), g;
    },
    refresh: (m, b) => f(m, b, !0),
    subscribe(m, b, u = {}) {
      const h = c(m);
      return h.subscribers.add(b), u.replay !== !1 && b(l(m)), () => {
        h.subscribers.delete(b);
      };
    }
  });
}, pa = (t) => {
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
      const m = r();
      return c?.addEventListener?.(l, d, { ...f, signal: m }), d;
    }
  });
}, ua = (t, e) => {
  let i = null, r = !0;
  const s = () => {
    if (!r) return;
    const n = 6e4 - Date.now() % 6e4 + 100;
    i = setTimeout(() => {
      if (r) {
        try {
          t();
        } catch {
        }
        s();
      }
    }, n);
  };
  s();
  const a = () => {
    r = !1, i && (clearTimeout(i), i = null);
  };
  return e && e.cleanup(a), a;
}, ma = "dashboard-style-tokens", as = `
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
`, pl = () => {
}, ns = y`
  ${ue(as)}
`, T = [
  ns,
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
], Q = y`
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
`, H = y`
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
`, fe = y`
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
`, j = y`
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
`, os = y`
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
`, Me = y`
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
`, xi = y`
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
`, bt = y`
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
`, rr = y`
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
`, nt = y`
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
`, sr = y`
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
`, fa = y`
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
`, It = y`
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
`, pt = y`
  .assembled-card {
    border: var(--dashboard-card-border);
    border-radius: var(--dashboard-radius-card);
    background: var(--dashboard-card-surface);
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`, ul = y`
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
`, ml = y`
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
`, fl = y`
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
`, gl = ma, wi = as, bl = () => {
}, _l = y`
  ${ue(wi)}
`, ga = `${wi}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);color:var(--primary-text-color);box-shadow:none}*{box-sizing:border-box}button{font:inherit;color:inherit}button.demo{appearance:none;width:100%;border:0;background:transparent;text-align:inherit;padding:0;cursor:pointer}button.demo:active{transform:scale(.992)}button.demo:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px;border-radius:var(--dashboard-radius-card)}`, ba = `${wi}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);box-shadow:none;color:var(--primary-text-color);box-sizing:border-box}.wrap{box-sizing:border-box;padding:8px 11px}.title{font-size:13px;line-height:1.25;font-weight:600;color:var(--primary-text-color)}.desc{margin-top:2px;font-size:12px;line-height:1.25;color:var(--secondary-text-color)}ha-icon{--mdc-icon-size:20px}button{font:inherit;color:inherit}button.i{appearance:none;border:0;background:transparent;cursor:pointer}button.i:active{background:var(--dashboard-card-muted-surface)}button.i:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px;border-radius:var(--dashboard-radius-control)}@media(max-width:700px){.wrap{padding:8px 10px}}`, _a = `${wi}:host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border);border-radius:var(--dashboard-radius-card);background:var(--dashboard-card-surface);color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}`, va = y`
  ${ue(ga)}
`, vl = y`
  ${ue(ba)}
`, yl = y`
  ${ue(_a)}
`, xl = va, cs = y`
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
function lt(t) {
  return t && t.split(".")[0] || "";
}
const O = lt, ya = /^[a-z_][a-z0-9_]*\.[a-zA-Z0-9_]+$/, ar = (t) => t?.entity_id ? Array.isArray(t.entity_id) ? t.entity_id : [t.entity_id] : [], xa = (t) => !!(t && (ar(t).length > 0 || (Array.isArray(t.device_id) ? t.device_id.length > 0 : t.device_id) || (Array.isArray(t.area_id) ? t.area_id.length > 0 : t.area_id))), Ni = (t, e) => {
  if (t === void 0) return;
  const i = Array.isArray(t) ? t : [t];
  if (i.length === 0 || i.some((r) => typeof r != "string" || !r.trim()))
    throw new it(
      "INVALID_TARGET",
      `Service target ${e} must be a non-empty string or array of strings.`
    );
}, ls = (t, e) => {
  if (!e) return;
  if (!xa(e))
    throw new it(
      "INVALID_TARGET",
      "Service target must contain an entity_id, device_id, or area_id."
    );
  Ni(e.entity_id, "entity_id"), Ni(e.device_id, "device_id"), Ni(e.area_id, "area_id");
  const i = ar(e);
  for (const r of i) {
    if (!ya.test(r))
      throw new it(
        "INVALID_TARGET",
        `Invalid Home Assistant entity target: ${r}.`
      );
    const s = t.states[r];
    if (!s)
      throw new it(
        "MISSING_TARGET_ENTITY",
        `Home Assistant entity target does not exist: ${r}.`
      );
    if (!yt(s))
      throw new it(
        "UNAVAILABLE_TARGET_ENTITY",
        `Home Assistant entity target is unavailable: ${r}.`
      );
  }
  return e;
}, ds = (t) => {
  const [e, i, r] = t?.split(".") ?? [];
  if (!e || !i || r !== void 0 || !/^[a-z_][a-z0-9_]*$/.test(e) || !/^[a-z_][a-z0-9_]*$/.test(i))
    throw new it(
      "INVALID_SERVICE",
      `Invalid Home Assistant service: ${t || "(missing)"}.`
    );
  return { domain: e, service: i };
}, wa = (t) => {
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
}, D = async (t, e) => {
  const { domain: i, service: r } = ds(
    `${e.domain}.${e.service}`
  ), s = wa(e.data), a = ls(t, e.target ?? s.target);
  await t.callService(i, r, s.data, a);
};
function kt(t) {
  let e = t.entry?.name || t.entry?.original_name || t.state?.attributes?.friendly_name || t.fallback || t.entry?.entity_id || t.state?.entity_id || "Control";
  if (t.stripSuffixes && t.stripSuffixes.length > 0)
    for (const i of t.stripSuffixes)
      e = e.replace(i, "").trim();
  return e;
}
function $i(t, e) {
  return t ? t.attributes?.friendly_name || e || t.entity_id : e || "";
}
function yt(t) {
  if (!t) return !1;
  const e = typeof t == "string" ? t : t.state;
  if (!e) return !1;
  const i = e.toLowerCase().trim();
  return i !== "unavailable" && i !== "unknown" && i !== "";
}
function Z(t) {
  return !yt(t);
}
function X(t, e) {
  if (!t) return "Unavailable";
  if (e?.formatEntityState)
    return e.formatEntityState(t);
  const i = t.state, r = t.attributes?.unit_of_measurement;
  return i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : i === "on" ? "On" : i === "off" ? "Off" : r ? `${i} ${r}` : i.charAt(0).toUpperCase() + i.slice(1);
}
function ee(t) {
  if (!t) return !1;
  const e = t.state;
  if (e === "unavailable" || e === "unknown" || e === "off")
    return !1;
  switch (lt(t.entity_id)) {
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
function ge(t, e) {
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
async function Ci(t, e, i, r) {
  if (!e)
    throw new it(
      "INVALID_ACTION",
      "Home Assistant is required to run an action."
    );
  const s = i?.action || "toggle";
  if (s === "none") return;
  if (i?.haptic && ft(t, "haptic", i.haptic), i?.confirmation) {
    const l = i.confirmation.text || "Are you sure you want to proceed?";
    if (!window.confirm(l))
      return;
  }
  const n = ar(i?.target)[0] || r, c = i?.target || (n ? { entity_id: n } : void 0);
  switch (s) {
    case "toggle": {
      if (!n)
        throw new it(
          "MISSING_TARGET_ENTITY",
          "Toggle actions require an entity target."
        );
      const l = lt(n), d = e.states[n];
      if (!d)
        throw new it(
          "MISSING_TARGET_ENTITY",
          `Home Assistant entity target does not exist: ${n}.`
        );
      const f = l === "lock" ? d.state === "locked" || d.state === "locking" ? "unlock" : "lock" : "toggle";
      await D(e, {
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
      ls(e, { entity_id: n }), ft(t, "hass-more-info", { entityId: n });
      break;
    }
    case "call-service":
    case "perform-action": {
      const l = s === "perform-action" ? i?.perform_action : i?.service, d = ds(l);
      await D(e, {
        ...d,
        data: s === "perform-action" ? i?.data : i?.service_data,
        target: c
      });
      break;
    }
    case "navigate": {
      i?.navigation_path && (window.history.pushState(null, "", i.navigation_path), ft(window, "location-changed", { replace: !1 }));
      break;
    }
    case "url": {
      i?.url_path && window.open(i.url_path, "_blank");
      break;
    }
    case "assist": {
      ft(t, "start-voice-assist");
      break;
    }
    default:
      throw new it(
        "INVALID_ACTION",
        `Unsupported Home Assistant action: ${String(s)}.`
      );
  }
}
var $a = Object.defineProperty, nr = (t, e, i, r) => {
  for (var s = void 0, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(e, i, s) || s);
  return s && $a(e, i, s), s;
};
class E extends wt {
  constructor() {
    super(...arguments), this._cardError = null, this._lifecycle = pa(this);
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
    return I(e);
  }
  toText(e) {
    return Qr(e);
  }
  moreInfo(e) {
    Hs(this, e);
  }
  navigate(e) {
    Zr(e);
  }
  fire(e, i) {
    return ft(this, e, i);
  }
  formatNum(e, i) {
    return ke(this.hass, e, i);
  }
  fmtPower(e, i) {
    return mt(this.hass, e, i);
  }
  fmtEnergy(e) {
    return xt(this.hass, e);
  }
  fmtDate(e, i) {
    return bi(this.hass, e, i);
  }
  fmtTime(e, i) {
    return Xe(this.hass, e, i);
  }
  fmtCalendarDay(e, i) {
    return _i(this.hass, e, i);
  }
  renderError(e) {
    return o`
      <ha-card class="error-card">
        <div
          style="padding: 16px; color: var(--error-color, #db4437); font-size: 13px; font-weight: 500;"
        >
          ⚠️ ${I(e)}
        </div>
      </ha-card>
    `;
  }
}
nr([
  me({ attribute: !1 })
], E.prototype, "hass");
nr([
  w()
], E.prototype, "_config");
nr([
  w()
], E.prototype, "_cardError");
class ki extends E {
  validateConfig(e) {
  }
  setConfig(e) {
    super.setConfig(e), this.validateConfig(e);
  }
  fireConfigChanged() {
    this.fire("config-changed", { config: this._config });
  }
}
const wl = y`
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
function Ca(t) {
  return typeof t == "string" ? o`<span class="primitive-row-trailing-text"
      >${I(t)}</span
    >` : "strings" in t ? t : t.type === "toggle" ? o`
      <button
        class="primitive-row-toggle ${t.checked ? "on" : ""}"
        type="button"
        role="switch"
        aria-checked="${t.checked ? "true" : "false"}"
        aria-label="${I(t.ariaLabel || "Toggle")}"
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
        aria-label="${I(t.ariaLabel || t.label)}"
        ?disabled=${t.disabled}
        @click=${(e) => {
    e.stopPropagation(), t.onClick?.(e);
  }}
      >
        ${t.icon ? o`<ha-icon icon="${I(t.icon)}"></ha-icon>` : ""}
        <span>${I(t.label)}</span>
      </button>
    ` : t.type === "chevron" ? o`
      <span class="primitive-row-chevron">
        <ha-icon icon="mdi:chevron-right"></ha-icon>
      </span>
    ` : t.type === "custom" ? typeof t.template == "string" ? o`${t.template}` : t.template : o``;
}
function $l(t) {
  const e = !!(t.interactive ?? t.onClick), i = !!t.unavailable, r = !!(t.disabled || i), s = typeof t.badge == "string" ? { text: t.badge, severity: "neutral" } : t.badge || null, a = [
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
                <ha-icon icon="${I(t.icon)}"></ha-icon>
              </div>
            </div>
          ` : ""}
    <div class="primitive-row-copy">
      <div class="primitive-row-title">${I(t.title)}</div>
      ${t.subtitle ? o`<div class="primitive-row-subtitle">
              ${I(t.subtitle)}
            </div>` : ""}
    </div>
    <div class="primitive-row-trailing">
      ${t.state || t.stateLabel ? o`
              <div class="primitive-row-state-block">
                ${t.state ? o`<span class="primitive-row-state-val"
                        >${I(t.state)}</span
                      >` : ""}
                ${t.stateLabel ? o`<span class="primitive-row-state-lbl"
                        >${I(t.stateLabel)}</span
                      >` : ""}
              </div>
            ` : ""}
      ${s ? o`
              <span
                class="primitive-row-badge ${s.severity || "neutral"}"
              >
                ${I(s.text)}
              </span>
            ` : ""}
      ${t.trailing ? Ca(t.trailing) : ""}
    </div>
  `;
  return e ? o`
      <button
        class="${a}"
        type="button"
        aria-label="${I(c)}"
        ?disabled=${r}
        @click=${(d) => {
    r || t.onClick?.(d);
  }}
      >
        ${l}
      </button>
    ` : o`
    <div class="${a}" aria-label="${I(c)}">
      ${l}
    </div>
  `;
}
function ka(t, e) {
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
const Cl = y`
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
function kl(t) {
  const e = !!(t.interactive ?? t.onClick), i = t.size || "lg";
  let r = t.severity || "normal";
  if (!t.severity && t.thresholds) {
    const d = typeof t.value == "number" ? t.value : parseFloat(String(t.value).replace(/[^0-9.-]/g, ""));
    r = ka(d, t.thresholds);
  }
  const s = [
    "primitive-metric",
    `severity-${r}`,
    e ? "interactive" : "",
    t.className || ""
  ].filter(Boolean).join(" "), a = String(t.value ?? ""), n = `${t.label || "Metric"}: ${a}${t.unit ? ` ${t.unit}` : ""}${t.supportValue || t.supportLabel ? `. ${t.supportValue || ""} ${t.supportLabel || ""}` : ""}`, c = t.ariaLabel || n, l = o`
    <div class="primitive-metric-main">
      ${t.icon ? o`<span class="primitive-metric-icon"><ha-icon icon="${I(t.icon)}"></ha-icon></span>` : ""}
      <span class="primitive-metric-value size-${i}"
        >${I(a)}</span
      >
      ${t.unit ? o`<span class="primitive-metric-unit">${I(t.unit)}</span>` : ""}
      ${t.trend === "up" ? o`<span class="primitive-metric-trend up"
              ><ha-icon icon="mdi:arrow-up"></ha-icon
            ></span>` : t.trend === "down" ? o`<span class="primitive-metric-trend down"
                ><ha-icon icon="mdi:arrow-down"></ha-icon
              ></span>` : ""}
    </div>
    ${t.label ? o`<div class="primitive-metric-label">${I(t.label)}</div>` : ""}
    ${t.supportValue || t.supportLabel ? o`
            <div class="primitive-metric-support">
              ${t.supportValue ? o`<b>${I(String(t.supportValue))}</b>` : ""}
              ${t.supportLabel ? o`<span>${I(t.supportLabel)}</span>` : ""}
            </div>
          ` : ""}
  `;
  return e ? o`
      <button
        class="${s}"
        type="button"
        aria-label="${I(c)}"
        @click=${t.onClick}
      >
        ${l}
      </button>
    ` : o`
    <div class="${s}" aria-label="${I(c)}">
      ${l}
    </div>
  `;
}
const Sl = y`
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
function Al(t) {
  const e = !!(t.interactive !== !1 && (t.path || t.onClick)), i = !!t.disabled, r = t.showChevron ?? (e || !!t.path);
  let s = null;
  t.badge !== void 0 && t.badge !== null && (typeof t.badge == "object" ? s = t.badge : s = { text: t.badge, severity: "neutral" });
  const a = [
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
                <ha-icon icon="${I(t.icon)}"></ha-icon>
              </div>
            </div>
          ` : ""}
    <div class="primitive-nav-content">
      <div class="primitive-nav-title">${I(t.title)}</div>
      ${t.context ? o`<div class="primitive-nav-context">
              ${I(t.context)}
            </div>` : ""}
    </div>
    <div class="primitive-nav-trailing">
      ${s ? o`
              <span
                class="primitive-nav-badge ${s.severity || "neutral"}"
              >
                ${I(String(s.text))}
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
        class="${a}"
        type="button"
        aria-label="${I(c)}"
        ?disabled=${i}
        @click=${(d) => {
    i || t.onClick?.(t.path, d);
  }}
      >
        ${l}
      </button>
    ` : o`
    <div class="${a}" aria-label="${I(c)}">
      ${l}
    </div>
  `;
}
const Sa = /* @__PURE__ */ new Set([
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
]), Aa = /* @__PURE__ */ new Set([
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
]), Ea = /\b(battery|battery_level|battery_low|battery_state|link_?quality|rssi|signal_strength|lqi|voltage|temp(erature)?_offset|humidity_offset|calibration_offset|firmware|firmware_version|ip_address|mac_address|device_temp(erature)?|cpu_temp(erature)?|ping|keep_alive|reporting_interval|uptime|free_heap|wifi_signal|compressor_speed|compressor_frequency|defrost_mode)\b/i, Da = /* @__PURE__ */ new Set([
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
]), or = (t, e) => {
  if (!t?.entity_id) return !1;
  if (t.entity_category === "diagnostic" || t.entity_category === "config")
    return !0;
  const i = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  if (Sa.has(i))
    return !0;
  const r = `${t.entity_id} ${t.name || ""} ${t.original_name || ""} ${e?.attributes?.friendly_name || ""}`.toLowerCase();
  return Ea.test(r);
}, El = (t, e) => {
  if (!t?.entity_id || O(t.entity_id) !== "sensor") return !1;
  const r = String(
    e?.attributes?.device_class || t.device_class || ""
  ).toLowerCase();
  return Aa.has(r) || !!e?.attributes?.unit_of_measurement;
}, Hr = (t, e) => {
  if (!t?.entity_id || t.disabled_by || t.hidden_by || or(t, e)) return !1;
  const i = O(t.entity_id);
  return !!(Da.has(i) || i === "binary_sensor" && e?.attributes?.device_class === "garage_door");
}, Ta = (t, e) => {
  if (!e || or(t, e)) return !1;
  const i = O(t.entity_id), r = String(e.state).toLowerCase(), s = e.attributes || {};
  if (["light", "fan", "switch", "input_boolean"].includes(i))
    return r === "on";
  if (i === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(r)) return !0;
    if (r === "idle") {
      const a = String(s.media_title || s.app_name || "").trim();
      return !!(a && !/^(idle|home(?: screen)?|default media receiver)$/i.test(a));
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
    const a = String(s.device_class || "").toLowerCase();
    return r === "on" && /^(door|window|garage_door|smoke|moisture|gas|motion|occupancy|presence)$/.test(
      a
    );
  }
  return !1;
}, Bt = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), Nr = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Split System", Lr = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Pa = (t, e, i, r) => {
  if (O(t?.entity_id) !== "climate") return null;
  const s = /* @__PURE__ */ new Set();
  if (s.add(t.entity_id), t.device_id && i?.byDevice) {
    const g = i.byDevice.get(t.device_id) || [];
    for (const C of g)
      s.add(C.entity_id);
  }
  const a = Lr(t, i), n = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], c = a ? (i?.entities || []).filter(
    (g) => Lr(g, i) === a
  ) : [], l = (i?.entities || []).filter(
    (g) => ["timer", "script", "scene"].includes(O(g?.entity_id))
  ), d = [
    ...new Map(
      [...n, ...c, ...l].map((g) => [
        g.entity_id,
        g
      ])
    ).values()
  ].filter((g) => r?.states?.[g.entity_id]), f = Bt(t, r).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((g) => g.length > 2), m = (g) => {
    const C = Bt(g, r);
    return !!(t.device_id && g.device_id === t.device_id) || f.length > 0 && f.some((v) => C.includes(v));
  }, b = (g) => {
    const C = d.filter(
      (v) => O(v.entity_id) === "select" && Bt(v, r).includes(g) && /(vane|swing)/.test(Bt(v, r)) && m(v)
    );
    return C.length === 1 ? C[0].entity_id : null;
  }, u = b("vertical"), h = b("horizontal");
  u && s.add(u), h && s.add(h);
  const _ = d.find(
    (g) => O(g.entity_id) === "timer" && m(g) && /(split|climate|air.?con|hvac|timer)/.test(
      Bt(g, r)
    )
  )?.entity_id || null;
  _ && s.add(_);
  const p = d.filter(
    (g) => ["script", "scene"].includes(O(g.entity_id)) && m(g) && /(split|climate|air.?con|hvac)/.test(Bt(g, r))
  ).map((g) => (s.add(g.entity_id), {
    entity: g.entity_id,
    name: Nr(r, g, r?.states?.[g.entity_id])
  }));
  return {
    cardConfig: {
      type: "custom:component-split-controller-v4",
      entity: t.entity_id,
      title: Nr(r, t, e),
      vertical_vane_entity: u,
      horizontal_vane_entity: h,
      timer_entity: _,
      profile_entities: p
    },
    claimedEntityIds: s
  };
}, za = (t, e, i, r) => {
  if (t?.platform !== "wled" || O(t.entity_id) !== "light")
    return null;
  const s = String(
    t.original_name || t.name || t.entity_id || ""
  ).toLowerCase();
  if (/_\d+$/.test(String(t.unique_id || "")) && s !== "main")
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
}, Oa = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), Ra = (t, e, i, r) => {
  const s = O(t.entity_id), a = s === "binary_sensor" && e?.attributes?.device_class === "garage_door", n = s === "cover" && (/garage/i.test(t.entity_id) || /garage/i.test(e?.attributes?.friendly_name || "") || e?.attributes?.device_class === "garage");
  if (!a && !n)
    return null;
  const c = /* @__PURE__ */ new Set();
  c.add(t.entity_id);
  let l = null;
  if (t.device_id && i?.byDevice) {
    const b = (i.byDevice.get(t.device_id) || []).filter(
      (u) => O(u?.entity_id) === "button" && r?.states?.[u.entity_id] && String(r.states[u.entity_id].state).toLowerCase() !== "unavailable"
    ).filter(
      (u) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
        Oa(u)
      )
    );
    b.length === 1 && (l = b[0].entity_id, c.add(l));
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
}, Ha = (t, e, i, r) => {
  if (O(t?.entity_id) !== "media_player" || t?.platform !== "apple_tv")
    return null;
  const s = /* @__PURE__ */ new Set();
  if (s.add(t.entity_id), t.device_id && i?.byDevice) {
    const n = i.byDevice.get(t.device_id) || [];
    for (const c of n)
      s.add(c.entity_id);
  }
  const a = t.name || t.original_name || e?.attributes?.friendly_name || "Apple TV";
  return {
    cardConfig: {
      type: "custom:component-apple-tv-controller-v1",
      entity: t.entity_id,
      title: a,
      icon: "mdi:apple"
    },
    claimedEntityIds: s
  };
}, Na = (t, e, i, r) => {
  if (O(t?.entity_id) !== "camera")
    return null;
  const s = `${t.entity_id} ${t.name || t.original_name || ""}`;
  if (/sub.?stream/i.test(s))
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
}, Ze = [], Dl = (t) => {
  if (typeof t != "function")
    throw new TypeError("Device resolvers must be functions");
  return Ze.push(t), () => {
    const e = Ze.indexOf(t);
    e >= 0 && Ze.splice(e, 1);
  };
}, La = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", Ir = (t, e, i, r) => {
  for (const b of Ze) {
    const u = b(t, e, i, r);
    if (u) return u;
  }
  const s = Pa(t, e, i, r);
  if (s) return s;
  const a = za(t, e, i);
  if (a) return a;
  const n = Ra(t, e, i, r);
  if (n) return n;
  const c = Ha(t, e, i);
  if (c) return c;
  const l = Na(t, e, i);
  if (l) return l;
  const d = t.entity_id, f = O(d), m = La(r, t, e);
  return f === "media_player" ? {
    cardConfig: {
      type: "custom:component-media-row-v2",
      entity: d,
      title: m
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
      title: m,
      name: m
    },
    claimedEntityIds: /* @__PURE__ */ new Set([d])
  } : null;
}, Mr = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, qr = (t, e) => {
  const i = e?.entity_id ? t?.states?.[e.entity_id] : void 0;
  return e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control";
}, Bi = (t, e, i = {}) => {
  if (!t?.states) return [];
  const r = i.mode || "all", s = i.area_id, a = new Set(i.exclude_device_names || []), n = new Map(
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
    return !(!h || u.device_id && a.has(n.get(u.device_id) || "") || or(u, h));
  }), d = /* @__PURE__ */ new Set(), f = [];
  for (const u of l) {
    const h = O(u.entity_id), _ = Mr(u, e);
    if (!(r === "area" && s && _ !== s) && [
      "climate",
      "media_player",
      "camera",
      "binary_sensor",
      "cover",
      "light"
    ].includes(h)) {
      const p = t.states[u.entity_id], g = Ir(u, p, e, t);
      if (g && g.cardConfig.type !== "custom:component-control-row-v2" && g.cardConfig.type !== "custom:component-media-row-v2") {
        for (const C of g.claimedEntityIds)
          d.add(C);
        f.push({
          entityId: u.entity_id,
          entry: u,
          cardConfig: g.cardConfig
        });
      }
    }
  }
  for (const u of l) {
    if (d.has(u.entity_id))
      continue;
    const h = t.states[u.entity_id], _ = O(u.entity_id), p = Mr(u, e);
    if (r === "area") {
      if (p !== s || !Hr(u, h)) continue;
    } else if (r === "media") {
      if (_ !== "media_player") continue;
    } else if (r === "sound") {
      if (!["switch", "number", "select"].includes(_)) continue;
    } else if (!Hr(u, h)) continue;
    const g = Ir(u, h, e, t);
    g && f.push({
      entityId: u.entity_id,
      entry: u,
      cardConfig: g.cardConfig
    });
  }
  const m = r === "active" ? f.filter((u) => {
    const h = t.states[u.entityId];
    return Ta(u.entry, h);
  }) : f;
  return m.sort(
    (u, h) => qr(t, u.entry).localeCompare(
      qr(t, h.entry),
      void 0,
      { sensitivity: "base" }
    )
  ), xs(
    m.map((u) => ({ id: u.entityId, card: u })),
    i.prefs
  ).visible.map((u) => ({
    entityId: u.id,
    cardConfig: u.card.cardConfig,
    signature: JSON.stringify(u.card.cardConfig)
  }));
};
class Ia {
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
    ]).then(([s, a, n, c]) => {
      const l = Array.isArray(s) ? s : [], d = Array.isArray(a) ? a : [], f = Array.isArray(n) ? n : [], m = Array.isArray(c) ? c : [], b = new Map(
        d.map((_) => [_.id, _.area_id || null])
      ), u = /* @__PURE__ */ new Map();
      for (const _ of f) {
        if (!_?.device_id) continue;
        const p = u.get(_.device_id) || [];
        p.push(_), u.set(_.device_id, p);
      }
      const h = new Map(
        l.map((_) => [_.area_id, _])
      );
      return this._data = {
        areas: l,
        devices: d,
        entities: f,
        dashboards: m,
        deviceArea: b,
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
    let s;
    return s = Promise.resolve(r).then((a) => {
      if (this._hass === e)
        for (const n of [...this._subs])
          try {
            n(a);
          } catch {
          }
      return a;
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
const G = new Ia(), $e = [], hs = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard entry filters must be functions");
  return $e.push(t), () => {
    const e = $e.indexOf(t);
    e >= 0 && $e.splice(e, 1);
  };
}, ps = (t, e) => {
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
}, Si = (t, e) => !!(t?.entity_id && !t.disabled_by && !t.hidden_by && !["diagnostic", "config"].includes(t.entity_category || "") && !ps(t, e) && $e.every((i) => i(t))), at = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", Zt = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, Ft = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), us = (t, e, i, r) => {
  if (O(t?.entity_id) !== "climate") return null;
  const s = Zt(t, i), a = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], n = s ? (i?.entities || []).filter(
    (h) => Zt(h, i) === s
  ) : [], c = (i?.entities || []).filter(
    (h) => ["timer", "script", "scene"].includes(O(h?.entity_id))
  ), l = [
    ...new Map(
      [...a, ...n, ...c].map((h) => [
        h.entity_id,
        h
      ])
    ).values()
  ].filter((h) => r?.states?.[h.entity_id]), d = Ft(t, r).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((h) => h.length > 2), f = (h) => {
    const _ = Ft(h, r);
    return !!(t.device_id && h.device_id === t.device_id) || d.some((p) => _.includes(p));
  }, m = (h) => {
    const _ = l.filter(
      (p) => O(p.entity_id) === "select" && Ft(p, r).includes(h) && /(vane|swing)/.test(Ft(p, r)) && f(p)
    );
    return _.length === 1 ? _[0].entity_id : null;
  }, b = l.find(
    (h) => O(h.entity_id) === "timer" && f(h) && /(split|climate|air.?con|hvac|timer)/.test(
      Ft(h, r)
    )
  )?.entity_id || null, u = l.filter(
    (h) => ["script", "scene"].includes(O(h.entity_id)) && f(h) && /(split|climate|air.?con|hvac)/.test(Ft(h, r))
  ).map((h) => ({
    entity: h.entity_id,
    name: at(r, h, r?.states?.[h.entity_id])
  }));
  return {
    type: "custom:component-split-controller-v4",
    entity: t.entity_id,
    title: at(r, t, e),
    vertical_vane_entity: m("vertical"),
    horizontal_vane_entity: m("horizontal"),
    timer_entity: b,
    profile_entities: u
  };
}, Ma = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), ms = (t, e, i) => {
  if (!t?.device_id) return null;
  const s = (e?.byDevice?.get(t.device_id) || []).filter(
    (a) => O(a?.entity_id) === "button" && Si(a) && i?.states?.[a.entity_id] && String(i.states[a.entity_id].state).toLowerCase() !== "unavailable"
  ).filter(
    (a) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
      Ma(a)
    )
  );
  return s.length === 1 ? s[0].entity_id : null;
}, fs = (t, e, i, r) => O(t?.entity_id) === "media_player" && t?.platform === "apple_tv" ? {
  type: "custom:component-apple-tv-controller-v1",
  entity: t.entity_id,
  title: at(r, t, e),
  icon: "mdi:apple"
} : null, gs = /* @__PURE__ */ new Set([
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
]), qa = (t, e) => Si(t, e) && (gs.has(O(t.entity_id)) || O(t.entity_id) === "binary_sensor" && e?.attributes?.device_class === "garage_door"), Ua = (t, e) => {
  if (!Si(t, e) || !e) return !1;
  const i = O(t.entity_id), r = e.state, s = e.attributes || {};
  if (["light", "fan", "switch", "input_boolean"].includes(i))
    return r === "on";
  if (i === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(r)) return !0;
    if (r === "idle") {
      const a = String(s.media_title || s.app_name || "");
      return !!(a && !/^(idle|home(?: screen)?|default media receiver)$/i.test(a));
    }
    return !1;
  }
  return i === "climate" ? /^(heat|cool|heat_cool|auto|dry|fan_only)$/.test(r) : i === "cover" ? /^(open|opening|closing)$/.test(r) : i === "lock" ? r === "unlocked" : i === "vacuum" ? /^(cleaning|returning)$/.test(r) : i === "binary_sensor" ? r === "on" && /^(door|window|garage_door|smoke|moisture|gas)$/.test(
    s.device_class || ""
  ) : !1;
}, Ce = [], bs = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard control resolvers must be functions");
  return Ce.push(t), () => {
    const e = Ce.indexOf(t);
    e >= 0 && Ce.splice(e, 1);
  };
}, _s = (t, e, i, r) => {
  const s = t.entity_id, a = O(s);
  if (a === "climate")
    return us(t, e, i, r) || {
      type: "custom:component-split-controller-v4",
      entity: s,
      title: at(r, t, e)
    };
  if (a === "binary_sensor" && e?.attributes?.device_class === "garage_door") {
    const n = ms(t, i, r);
    return n ? {
      type: "custom:component-garage-door-controller-v1",
      title: at(r, t, e).replace(
        / Garage Door Status$/i,
        ""
      ),
      entity: s,
      control_entity: n
    } : {
      type: "custom:component-control-row-v2",
      entity: s,
      title: at(r, t, e)
    };
  }
  return a === "media_player" ? fs(t, e, i, r) || {
    type: "custom:component-media-row-v2",
    entity: s,
    title: at(r, t, e)
  } : a === "camera" ? {
    type: "custom:component-camera-controller-v1",
    entity: s,
    title: at(r, t, e),
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
    entity: s,
    title: at(r, t, e),
    name: at(r, t, e)
  } : null;
}, ja = (t, e, i, r) => {
  for (const s of Ce) {
    const a = s(t, e, i, r);
    if (a) return a;
  }
  return _s(t, e, i, r);
}, vs = async (t, e) => {
  if (!t || !e) return { order: [], hidden: [] };
  try {
    return (await t.callWS({
      type: "frontend/get_user_data",
      key: e
    }))?.value || { order: [], hidden: [] };
  } catch {
    return { order: [], hidden: [] };
  }
}, ys = (t, e, i) => t.callWS({ type: "frontend/set_user_data", key: e, value: i }), xs = (t, e) => {
  const i = new Map(t.map((n) => [n.id, n])), r = /* @__PURE__ */ new Set(), s = [];
  for (const n of e?.order || []) {
    const c = i.get(n);
    c && (s.push(c), r.add(n));
  }
  for (const n of t)
    r.has(n.id) || s.push(n);
  const a = new Set(e?.hidden || []);
  return { all: s, visible: s.filter((n) => !a.has(n.id)), hidden: a };
}, ws = async (t, e) => {
  const i = String(t?.type || ""), r = i.startsWith("custom:") ? i.slice(7) : i;
  let s;
  if (customElements.get(r))
    s = document.createElement(r);
  else {
    const a = globalThis.loadCardHelpers || (typeof window < "u" ? window.loadCardHelpers : void 0);
    if (typeof a == "function")
      try {
        const d = (await a()).createCardElement(t);
        return e && (d.hass = e), d;
      } catch {
      }
    const n = t?.entity || "";
    O(n) === "media_player" ? s = document.createElement("component-media-row-v2") : s = document.createElement("component-control-row-v2");
  }
  if (typeof s.setConfig == "function")
    try {
      s.setConfig(t);
    } catch {
    }
  return e && (s.hass = e), s;
};
globalThis.__homeDashboardV2 ??= {};
const V = globalThis.__homeDashboardV2;
V.REG = G;
V.entryFilters = $e;
V.registerEntryFilter = hs;
V.uiEntry = Si;
V.stateName = at;
V.areaOf = Zt;
V.domain = O;
V.controlResolvers = Ce;
V.registerControlResolver = bs;
V.nativeClimateControlConfig = us;
V.garageControl = ms;
V.appleTvBundle = fs;
V.controlConfig = ja;
V.defaultControlConfig = _s;
V.controlDomains = gs;
V.isPotential = qa;
V.isActive = Ua;
V.isPeripheral = ps;
V.prefs = vs;
V.savePrefs = ys;
V.applyPrefs = xs;
V.card = ws;
V.discoverControls = Bi;
const Ur = /* @__PURE__ */ new WeakMap(), Tl = async (t) => {
  if (!t || !t.sendMessagePromise)
    return { areas: [], devices: [], entities: [] };
  const e = await G.load({ connection: t });
  let i = Ur.get(e);
  return i || (i = {
    areas: e.areas,
    devices: e.devices,
    entities: e.entities
  }, Ur.set(e, i)), i;
}, Pl = async (t, e = !1) => G.load(t, e), Ba = /(_controller_temperature|_outside_air_temperature|cpu_temperature|processor_temperature|board_temperature|chip_temperature|internal_temperature)$/i;
function $s(t, e, i) {
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
  const s = (e?.entities || []).filter((p) => (p.area_id || (p.device_id ? e?.deviceArea?.get(p.device_id) : null)) === t.area_id), a = [];
  for (const p of s) {
    const g = i.states[p.entity_id];
    g && yt(g) && a.push(g);
  }
  let n = 0, c = 0, l = "", d = "", f = !1, m = !1;
  const b = a.find(
    (p) => p.entity_id.startsWith("climate.") && p.attributes && !Number.isNaN(
      Number.parseFloat(String(p.attributes.current_temperature ?? ""))
    )
  );
  if (b && b.attributes?.current_temperature !== void 0) {
    const p = Number.parseFloat(
      String(b.attributes.current_temperature)
    ), g = b.attributes.temperature_unit || i.config?.unit_system?.temperature || "°C";
    l = `${p.toFixed(1)} ${g}`;
  } else {
    const p = a.find(
      (g) => g.entity_id.startsWith("sensor.") && (g.attributes?.device_class === "temperature" || g.attributes?.unit_of_measurement && /°[CF]/i.test(g.attributes.unit_of_measurement)) && !Ba.test(g.entity_id) && !Number.isNaN(Number.parseFloat(String(g.state ?? "")))
    );
    if (p) {
      const g = Number.parseFloat(String(p.state)), C = p.attributes?.unit_of_measurement || i.config?.unit_system?.temperature || "°C";
      l = `${g.toFixed(1)} ${C}`;
    }
  }
  const u = a.find(
    (p) => p.entity_id.startsWith("sensor.") && p.attributes?.device_class === "humidity" && !Number.isNaN(Number.parseFloat(String(p.state ?? "")))
  );
  u && (d = X(u, i));
  for (const p of a) {
    ee(p) && c++, p.entity_id.startsWith("light.") && p.state === "on" && n++;
    const g = p.attributes?.device_class || "";
    p.entity_id.startsWith("binary_sensor.") && p.state === "on" && ["smoke", "moisture", "gas"].includes(g) && (f = !0), (p.entity_id.startsWith("binary_sensor.") && p.state === "on" && g === "garage_door" || p.entity_id.startsWith("cover.") && ["open", "opening"].includes(p.state) && g === "garage") && (m = !0);
  }
  const h = c > 0, _ = [];
  return f ? _.push("Attention required") : m && _.push("Garage open"), l && _.push(l), d && !l && _.push(d), n > 0 ? _.push(`${n} light${n === 1 ? "" : "s"} on`) : c > 0 && _.push(
    `${c} active device${c === 1 ? "" : "s"}`
  ), {
    summary: _.slice(0, 3).join(" · "),
    severity: f ? "critical" : m ? "warning" : h ? "active" : "",
    lightsOn: n,
    activeDeviceCount: c,
    temperatureText: l,
    humidityText: d,
    hasCritical: f,
    hasWarning: m
  };
}
const Li = /* @__PURE__ */ new WeakMap();
let Fa = 1;
const cr = (t) => {
  const e = t?.connection;
  return e ? (Li.has(e) || Li.set(e, Fa++), Li.get(e)) : "none";
}, Gt = (t, e, i) => `${cr(t)}|${e}|${i}`, Yt = /* @__PURE__ */ new WeakMap();
let Qt = null;
const Va = (t) => {
  const e = Yt.get(t);
  Yt.delete(t), Qt === t && (Qt = null), e && Promise.resolve(e).then((i) => i()).catch(() => {
  });
}, jr = (t) => {
  const e = t?.connection;
  if (!e?.subscribeEvents || (Qt && Qt !== e && Va(Qt), Qt = e, Yt.has(e))) return;
  const i = e.subscribeEvents((r) => {
    const s = /^dashboard-profile\.(energy|security)\.([a-z0-9-]+)$/.exec(
      String(r?.data?.key || "")
    );
    s && (Kt.invalidate(Gt(t, s[1], s[2])), globalThis.dispatchEvent(
      new CustomEvent("ha-component-profile-change", {
        detail: { kind: s[1], profileId: s[2] }
      })
    ));
  }, "ha_component_backend_preferences_updated");
  Yt.set(e, i), Promise.resolve(i).catch(
    () => Yt.get(e) === i ? Yt.delete(e) : void 0
  );
}, Kt = ss(
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
), Wa = Object.freeze({
  async get(t, e, i, r = {}) {
    jr(t);
    const s = Gt(t, e, i);
    return Kt.read(
      s,
      { hass: t, kind: e, profileId: i },
      r
    );
  },
  invalidate(t, e, i) {
    Kt.invalidate(Gt(t, e, i));
  },
  peek(t, e, i) {
    return Kt.peek(Gt(t, e, i));
  },
  async save(t, e, i, r, s) {
    const a = {
      type: "ha_component_backend/profile/update",
      kind: e,
      profile_id: i,
      profile: r
    };
    Number.isFinite(Number(s)) && (a.expected_revision = Number(s));
    const n = await t.callWS(a);
    return Kt.invalidate(Gt(t, e, i)), n;
  },
  subscribe(t, e, i, r) {
    jr(t);
    const s = Gt(t, e, i);
    return Kt.subscribe(s, r);
  }
}), Ii = /* @__PURE__ */ new Map(), Br = (t) => String(t).padStart(2, "0"), Te = (t = /* @__PURE__ */ new Date()) => `${t.getFullYear()}-${Br(t.getMonth() + 1)}-${Br(t.getDate())}`, ye = (t, e = /* @__PURE__ */ new Date()) => {
  const i = t?.config?.time_zone;
  if (!i) return Te(e);
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
    return Te(e);
  }
}, Cs = (t, e = Te()) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(t || ""));
  if (!i) return null;
  const r = new Date(
    Number(i[1]),
    Number(i[2]) - 1,
    Number(i[3])
  );
  return Te(r) !== t || t > e ? null : t;
}, Mi = (t = "energy-day") => {
  const e = String(t || "energy-day");
  if (!Ii.has(e)) {
    let i = null;
    try {
      i = sessionStorage.getItem(`ha-component-library:${e}`);
    } catch {
    }
    const r = Cs(i);
    Ii.set(e, {
      value: r || Te(),
      usesDefault: !r,
      subscribers: /* @__PURE__ */ new Set()
    });
  }
  return Ii.get(e);
}, B = Object.freeze({
  get(t = "energy-day", e) {
    const i = Mi(t);
    return i.usesDefault && (i.value = ye(e)), i.value;
  },
  set(t = "energy-day", e, i = {}) {
    const r = Mi(t), s = ye(i.hass), a = Cs(e, s);
    if (!a || a === r.value) return r.value;
    r.value = a, r.usesDefault = !1;
    try {
      sessionStorage.setItem(`ha-component-library:${t}`, a);
    } catch {
    }
    const n = {
      channel: t,
      day: a,
      isToday: a === s
    };
    for (const c of [...r.subscribers]) c(n);
    return i.broadcast !== !1 && window.dispatchEvent(
      new CustomEvent("energy-day-selector-change", { detail: n })
    ), a;
  },
  subscribe(t = "energy-day", e, i = {}) {
    const r = Mi(t);
    return r.usesDefault && (r.value = ye(i.hass)), r.subscribers.add(e), i.replay !== !1 && e({
      channel: t,
      day: r.value,
      isToday: r.value === ye(i.hass)
    }), () => r.subscribers.delete(e);
  },
  today: ye
}), qi = /* @__PURE__ */ new Set(), Ve = (t, e, i) => `${cr(t)}|${e}|${i}`, xe = ss(
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
), Jt = Object.freeze({
  async get(t, e, i, r = {}) {
    const s = Ve(t, e, i);
    return qi.add(s), xe.read(s, { hass: t, profileId: e, day: i }, r);
  },
  invalidate(t, e, i) {
    xe.invalidate(Ve(t, e, i));
  },
  invalidateProfile(t, e) {
    const i = `${cr(t)}|${e}|`;
    for (const r of qi)
      r.startsWith(i) && xe.invalidate(r);
  },
  peek(t, e, i) {
    return xe.peek(Ve(t, e, i));
  },
  subscribe(t, e, i, r) {
    const s = Ve(t, e, i);
    return qi.add(s), xe.subscribe(s, r);
  }
}), We = /* @__PURE__ */ new Set(["unknown", "unavailable"]), Ai = (t) => [
  t?.translation_key,
  t?.unique_id,
  t?.entity_id,
  t?.platform
].filter(Boolean).join(" ").toLowerCase(), Ge = (t, e) => e?.name || e?.original_name || (e?.entity_id ? t?.states?.[e.entity_id]?.attributes?.friendly_name : "") || e?.entity_id || "Control", Fr = (t) => {
  const e = Ai(t);
  return /record/.test(e) ? "Recording" : /detect|motion/.test(e) ? "Detection" : /alert|notification/.test(e) ? "Alerts" : /audio|sound/.test(e) ? "Audio" : null;
}, Ga = (t) => /(^|[_ :.-])(ptz|pan|tilt|zoom)([_ :.-]|$)/.test(
  Ai(t)
), Ke = (t) => {
  const e = Ai(t);
  return /trigger|operate|open|close/.test(e) ? "operate" : /restart|reboot/.test(e) ? "restart" : "action";
}, Ka = (t, e, i = {}) => {
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
  const r = new Set(i.include_entities || []), s = new Set(i.exclude_entities || []), a = new Set(i.area_ids || []), n = (e?.entities || []).filter((p) => !p?.entity_id || p.disabled_by || p.hidden_by || !t?.states?.[p.entity_id] ? !1 : !s.has(p.entity_id)), c = n.filter((p) => {
    if (r.has(p.entity_id)) return !0;
    const g = Zt(p, e);
    return !a.size || (g ? a.has(g) : !1);
  }), l = c.filter(
    (p) => !p.disabled_by && !p.hidden_by
  ), d = new Set(
    c.map((p) => p.device_id || p.entity_id)
  ), f = /* @__PURE__ */ new Map();
  for (const p of n) {
    const g = p.device_id || p.entity_id, C = f.get(g) || [];
    C.push(p), f.set(g, C);
  }
  const m = [];
  for (const [p, g] of f) {
    if (!d.has(p)) continue;
    const C = g.filter(
      (z) => O(z.entity_id) === "camera" && !z.disabled_by && !z.hidden_by
    );
    if (!C.length) continue;
    C.sort((z, tt) => {
      const _t = (St) => {
        const _e = t.states[St.entity_id];
        return (r.has(St.entity_id) ? 100 : 0) + (_e?.attributes?.entity_picture ? 20 : 0) + (_e?.attributes?.frontend_stream_type ? 10 : 0);
      };
      return _t(tt) - _t(z) || String(z.unique_id || z.entity_id).localeCompare(
        String(tt.unique_id || tt.entity_id)
      );
    });
    const v = C[0], k = t.states[v.entity_id], N = (e?.devices || []).find((z) => z.id === v.device_id) || {}, M = Zt(v, e), q = (M ? e?.areaMap?.get(M)?.name : "") || "", x = g.filter(
      (z) => O(z.entity_id) === "switch" && Fr(z)
    ).map((z) => ({ entity: z, role: Fr(z) })), P = g.filter((z) => {
      if (O(z.entity_id) !== "binary_sensor") return !1;
      const tt = t.states[z.entity_id]?.attributes?.device_class || "";
      return /^(motion|occupancy|presence|sound)$/.test(tt) || /detect|motion|person|human/.test(Ai(z));
    }), U = g.filter((z) => O(z.entity_id) === "image").map((z) => {
      const tt = Ge(t, z), _t = String(
        N.name_by_user || N.name || ""
      ).trim(), St = _t && tt.toLowerCase().startsWith(`${_t.toLowerCase()} `) ? tt.slice(_t.length).trim() : tt;
      return { entity: z, name: St };
    }), L = g.filter(
      (z) => O(z.entity_id) === "button" && Ke(z) !== "action"
    ).map((z) => ({ entity: z, role: Ke(z) })), K = g.filter(
      (z) => ["button", "number", "select"].includes(O(z.entity_id)) && Ga(z)
    ), Y = i.mappings?.[`camera_stream:${v.entity_id}`] || i.mappings?.[`camera_stream:${p}`] || null, qt = Y ? t.states[Y] : null, Ut = (qt && !We.has(String(qt.state).toLowerCase()) ? Y : v.entity_id) || v.entity_id, Be = !!(k && !We.has(String(k.state).toLowerCase())), ut = P.some(
      (z) => t.states[z.entity_id]?.state === "on"
    );
    m.push({
      id: p,
      deviceId: v.device_id || null,
      entityId: v.entity_id,
      entities: C.map((z) => z.entity_id),
      name: String(N.name_by_user || N.name || "").trim() || q || Ge(t, v),
      areaId: M,
      areaName: q,
      online: Be,
      active: ut,
      streamEntityId: Ut,
      switches: x,
      detections: P,
      classifications: U,
      actions: L,
      ptz: K
    });
  }
  m.sort(
    (p, g) => p.name.localeCompare(g.name, void 0, { sensitivity: "base" })
  );
  const b = [];
  for (const p of l) {
    const g = O(p.entity_id), C = t.states[p.entity_id], v = C?.attributes?.device_class || "";
    if (!(g === "binary_sensor" && /^(door|window|garage_door|opening)$/.test(v) || g === "lock" || g === "cover" && /^(door|garage)$/.test(v))) continue;
    const M = p.device_id ? f.get(p.device_id) || [] : [], x = i.mappings?.[`entry_control:${p.entity_id}`] || M.filter((U) => O(U.entity_id) === "button").sort(
      (U, L) => (Ke(U) === "operate" ? -1 : 1) - (Ke(L) === "operate" ? -1 : 1)
    )[0]?.entity_id || null, P = g === "lock" ? C.state === "unlocked" : /^(on|open|opening)$/.test(C.state);
    b.push({
      entityId: p.entity_id,
      deviceId: p.device_id || null,
      controlEntityId: x,
      domain: g,
      deviceClass: v,
      name: Ge(t, p),
      state: C.state,
      open: P,
      available: !We.has(String(C.state).toLowerCase()),
      areaId: Zt(p, e)
    });
  }
  b.sort(
    (p, g) => p.name.localeCompare(g.name, void 0, { sensitivity: "base" })
  );
  const u = /* @__PURE__ */ new Map([
    ["automation", "trigger"],
    ["scene", "turn_on"],
    ["script", "turn_on"]
  ]), h = Object.entries(
    i.mappings || {}
  ).flatMap(([p, g]) => {
    if (!p.startsWith("quick_action:")) return [];
    const C = O(g), v = u.get(C), k = t?.states?.[g];
    if (!v || !k) return [];
    const N = (e?.entities || []).find(
      (M) => M.entity_id === g
    ) || {
      entity_id: g
    };
    return [
      {
        id: p.slice(13),
        entityId: g,
        domain: C,
        service: v,
        name: Ge(t, N),
        icon: k.attributes?.icon || (C === "script" ? "mdi:script-text-outline" : C === "scene" ? "mdi:palette-outline" : "mdi:robot-outline"),
        available: !We.has(String(k.state).toLowerCase())
      }
    ];
  });
  h.sort(
    (p, g) => p.name.localeCompare(g.name, void 0, { sensitivity: "base" })
  );
  const _ = [
    ...m.filter((p) => !p.online).map((p) => ({
      type: "camera-offline",
      label: `${p.name} unavailable`,
      entityId: p.entityId
    })),
    ...m.filter((p) => p.active).map((p) => ({
      type: "camera-activity",
      label: `${p.name} activity`,
      entityId: p.entityId
    })),
    ...b.filter((p) => p.available && p.open).map((p) => ({
      type: "entry-open",
      label: `${p.name} open`,
      entityId: p.entityId
    }))
  ];
  return {
    error: null,
    cameras: m,
    entries: b,
    quickActions: h,
    attention: _,
    allClear: _.length === 0,
    onlineCameras: m.filter((p) => p.online).length
  };
}, Ei = async (t, e = "household-security", i = {}) => {
  const [r, s] = await Promise.all([
    Wa.get(t, "security", e, i).catch((n) => ({ found: !1, profile: null, error: n })),
    G.load(t)
  ]);
  return r?.found ? {
    ...Ka(t, s, r.profile || {}),
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
}, Ui = O, Vr = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]), ks = (t) => String(
  t?.original_name || t?.name || t?.entity_id || ""
).toLowerCase();
let Wr = !1;
const Ya = () => {
  Wr || (Wr = !0, hs((t) => t?.platform !== "wled" ? !0 : O(t.entity_id) !== "light" ? !1 : ks(t) === "main" || !/_\d+$/.test(String(t.unique_id || ""))), bs((t) => t?.platform !== "wled" || O(t.entity_id) !== "light" ? null : {
    type: "custom:component-wled-controller-v1",
    entity: t.entity_id,
    device_id: t.device_id
  }), G.refresh());
};
Ya();
const Qa = [
  T,
  H,
  W,
  j,
  nt,
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
var Za = Object.getOwnPropertyDescriptor, Ja = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Za(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const Xa = {
  type: "custom:component-action-v2",
  title: "Action title",
  description: "What this action will do",
  action_text: "Open",
  icon: "mdi:gesture-tap-button",
  navigation_path: null,
  entity: null,
  more_info_entity: null
};
let ii = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Xa, ...t });
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
    t.primary && e ? (this._interactionHandle?.destroy(), this._interactionHandle = A(e, {
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
ii.styles = Qa;
ii = Ja([
  S("component-action-v2")
], ii);
R({
  type: "component-action-v2",
  element: ii,
  name: "Action Card",
  description: "Reusable navigation and more-info action card."
});
const tn = [
  T,
  H,
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
var en = Object.getOwnPropertyDescriptor, rn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? en(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const sn = {
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
let ri = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...sn, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = A(e, {
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
    const t = this._getAction(), e = [1, 2, 3].map((s) => {
      const a = this._config[`center_${s}_label`], n = this._config[`center_${s}_value`];
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
    `, r = `${this._config.left_text || ""}. ${[1, 2, 3].map((s) => `${this._config[`center_${s}_label`] || ""}: ${this._config[`center_${s}_value`] || ""}`).join(", ")}. ${this._config.right_text || ""}`;
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
ri.styles = tn;
ri = rn([
  S("component-context-strip-v3")
], ri);
R({
  type: "component-context-strip-v3",
  element: ri,
  name: "Context Strip",
  description: "Reusable context and metric strip component."
});
const an = [
  T,
  rr,
  pt
];
var nn = Object.getOwnPropertyDescriptor, on = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? nn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const cn = {
  type: "custom:component-empty-state-v3",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let si = class extends E {
  setConfig(t) {
    super.setConfig({ ...cn, ...t });
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
si.styles = an;
si = on([
  S("component-empty-state-v3")
], si);
R({
  type: "component-empty-state-v3",
  element: si,
  name: "Empty State",
  description: "Reusable empty-state component."
});
const ln = [
  T,
  H,
  nt,
  pt,
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
var dn = Object.getOwnPropertyDescriptor, hn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? dn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const pn = {
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
let ai = class extends E {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...pn, ...t });
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
        const a = this._getRowActions(s);
        a.primary && this._interactionHandles.push(
          A(i, {
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
      const r = this._getRowActions(e), s = e.entity ? this.hass?.states[e.entity] : null, a = e.title || "Item", n = s && a.startsWith("Item") ? kt({ state: s }) : a, c = s && (e.value === "00" || !e.value) ? X(s, this.hass) : e.value || "", l = `${n}: ${c} ${e.label || ""}${e.description ? `. ${e.description}` : ""}`, d = o`
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
ai.styles = ln;
ai = hn([
  S("component-list-v2")
], ai);
R({
  type: "component-list-v2",
  element: ai,
  name: "List / Ranking",
  description: "Reusable list and ranking component."
});
const un = [
  T,
  rr,
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
var mn = Object.getOwnPropertyDescriptor, fn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? mn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const gn = {
  type: "custom:component-notice-v2",
  title: "Notice title",
  message: "Important supporting information appears here.",
  tone: "info",
  icon: "mdi:information-outline",
  entity: null,
  navigation_path: null
};
let ni = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...gn, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = A(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = this._config.tone === "error" ? "critical" : this._config.tone || "info", r = e && this._config.title === "Notice title" ? kt({ state: e }) : this._config.title || "Notice title", s = e && this._config.message === "Important supporting information appears here." ? X(e, this.hass) : this._config.message || "", a = `${r}${s ? `: ${s}` : ""}`;
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
            <div class="label-title">${this.esc(r)}</div>
            ${s ? o`<div class="label-sub message">${this.esc(s)}</div>` : ""}
          </div>
        </div>
      </ha-card>
    `;
  }
};
ni.styles = un;
ni = fn([
  S("component-notice-v2")
], ni);
R({
  type: "component-notice-v2",
  element: ni,
  name: "Alert / Notice",
  description: "Reusable alert and notice component."
});
const bn = [
  T,
  H,
  bt,
  pt,
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
var _n = Object.getOwnPropertyDescriptor, vn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? _n(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const yn = {
  type: "custom:component-progress-v2",
  value: "68%",
  label: "Progress metric",
  progress: 68,
  target_value: "100%",
  target_label: "Target",
  entity: null,
  navigation_path: null
};
let oi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...yn, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = A(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e && this._config.label === "Progress metric" ? kt({ state: e }) : this._config.label || "Progress metric", r = e && this._config.value === "68%" ? X(e, this.hass) : this._config.value || "68%";
    let s = Math.min(100, Math.max(0, Number(this._config.progress) || 0));
    if (e && this._config.progress === 68) {
      const n = parseFloat(e.state);
      isNaN(n) || (s = Math.min(100, Math.max(0, n)));
    }
    const a = `${i}: ${r}. ${this._config.target_label || "Target"}: ${this._config.target_value || "100%"}`;
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
            aria-valuenow="${s}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="${this.esc(i)}"
          >
            <div class="determinate-fill" style="width:${s}%"></div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
oi.styles = bn;
oi = vn([
  S("component-progress-v2")
], oi);
R({
  type: "component-progress-v2",
  element: oi,
  name: "Progress / Target",
  description: "Reusable progress and target component."
});
const xn = [
  T,
  xi,
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
var wn = Object.getOwnPropertyDescriptor, $n = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? wn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
let ci = class extends E {
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
ci.styles = xn;
ci = $n([
  S("component-section-separator-v2")
], ci);
R({
  type: "component-section-separator-v2",
  element: ci,
  name: "Section Separator",
  description: "Reusable section separator component."
});
const Cn = [
  T,
  H,
  pt,
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
var kn = Object.getOwnPropertyDescriptor, Sn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? kn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const An = {
  type: "custom:component-single-kpi-v2",
  value: "00",
  label: "Primary metric",
  support_value: "00",
  support_label: "Supporting context",
  interactive: !0,
  entity: null,
  navigation_path: null
};
let li = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...An, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = A(e, {
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
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e && this._config.value === "00" ? X(e, this.hass) : this._config.value || "00", r = e && this._config.label === "Primary metric" ? kt({ state: e }) : this._config.label || "Primary metric", s = this._config.support_value || "", a = this._config.support_label || "", n = `${r}: ${i}${s || a ? `. ${s} ${a}` : ""}`, c = o`
      <div class="kpi-row">
        <div>
          <div class="kpi-metric-lg value">${this.esc(i)}</div>
          <div class="label-sub label">${this.esc(r)}</div>
        </div>
        ${s || a ? o`
                <div class="support">
                  <b>${this.esc(s)}</b>
                  ${this.esc(a)}
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
li.styles = Cn;
li = Sn([
  S("component-single-kpi-v2")
], li);
R({
  type: "component-single-kpi-v2",
  element: li,
  name: "Single KPI",
  description: "Reusable single KPI component."
});
const En = [
  T,
  H,
  j,
  nt,
  Q,
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
var Dn = Object.getOwnPropertyDescriptor, Tn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Dn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const Pn = {
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
let di = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Pn, ...t });
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
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = A(e, {
      primary: t,
      feedback: !0
    })) : (this._interactionHandle?.destroy(), this._interactionHandle = null);
  }
  disconnectedCallback() {
    this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  render() {
    if (!this._config) return o``;
    const t = this._getAction(), e = this._config.entity ? this.hass?.states[this._config.entity] : null, i = e ? Z(e) : !1, r = this._config.entity ? lt(this._config.entity) : "", s = e && this._config.title === "Status title" ? kt({ state: e }) : this._config.title || "Status title", a = e && this._config.status_value === "Active" ? i ? "Unavailable" : X(e, this.hass) : this._config.status_value || "Active", n = e && this._config.icon === "mdi:information-outline" ? e.attributes.icon || ge(r, e.state) : this._config.icon || "mdi:information-outline", c = this._config.description || "", l = this._config.status_label || "", d = `${s}: ${a}${l ? ` (${l})` : ""}${c ? `. ${c}` : ""}`, f = o`
      <div class="header-row ${i ? "unavailable" : ""}">
        <div class="icon-well control-radius icon">
          <ha-icon icon="${this.esc(n)}"></ha-icon>
        </div>
        <div class="copy-block">
          <div class="label-title title">${this.esc(s)}</div>
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
di.styles = En;
di = Tn([
  S("component-status-row-v2")
], di);
R({
  type: "component-status-row-v2",
  element: di,
  name: "Status Row",
  description: "Reusable status row component."
});
const zn = [
  T,
  H,
  j,
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
var On = Object.getOwnPropertyDescriptor, Rn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? On(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const Hn = {
  type: "custom:component-text-effect-v1",
  effect: "stamp",
  description: "",
  icon: null,
  speed: 2.6
};
let hi = class extends E {
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
hi.styles = zn;
hi = Rn([
  S("component-text-effect-v1")
], hi);
R({
  type: "component-text-effect-v1",
  element: hi,
  name: "Signature Text Effect",
  description: "Reusable transient-status effects using the existing signature motion language."
});
const Nn = [
  T,
  H,
  pt,
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
var Ln = Object.getOwnPropertyDescriptor, In = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ln(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const Mn = {
  type: "custom:component-three-stat-v2",
  metric_1_value: "00",
  metric_1_label: "Metric one",
  metric_2_value: "00",
  metric_2_label: "Metric two",
  metric_3_value: "00",
  metric_3_label: "Metric three",
  interactive: !0
};
let pi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Mn, ...t });
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
        A(e, { primary: r, feedback: !0 })
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
      let s = this._config[`metric_${e}_value`];
      r && (s === "00" || !s) && (s = X(r, this.hass));
      let a = this._config[`metric_${e}_label`];
      r && (a === `Metric ${e === 1 ? "one" : e === 2 ? "two" : "three"}` || !a) && (a = kt({ state: r }));
      const n = this._getAction(e), c = `${a}: ${s}`, l = o`
        <div class="kpi-metric-md value">${this.esc(s)}</div>
        <div class="label-sub label">${this.esc(a)}</div>
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
pi.styles = Nn;
pi = In([
  S("component-three-stat-v2")
], pi);
R({
  type: "component-three-stat-v2",
  element: pi,
  name: "Three-stat Summary",
  description: "Reusable three-stat summary component."
});
const qn = [
  T,
  H,
  j,
  nt,
  Q,
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
var Un = Object.getOwnPropertyDescriptor, jn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Un(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const Bn = {
  type: "custom:component-nav-tile-v2",
  icon: "mdi:door-open",
  title: "Destination",
  context: "Navigation",
  navigation_path: null
};
let ui = class extends E {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Bn, ...t });
  }
  getCardSize() {
    return 1;
  }
  updated() {
    const t = this._config?.navigation_path, e = this.renderRoot.querySelector(
      "button.nav"
    );
    t && e ? (this._interactionHandle?.destroy(), this._interactionHandle = A(e, {
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
ui.styles = qn;
ui = jn([
  S("component-nav-tile-v2")
], ui);
R({
  type: "component-nav-tile-v2",
  element: ui,
  name: "Navigation Tile",
  description: "Reusable navigation tile component."
});
const Fn = [
  T,
  H,
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
var Vn = Object.getOwnPropertyDescriptor, Wn = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Vn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const Gn = {
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
let mi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Gn, ...t });
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
      A(t, {
        primary: () => this.moreInfo(this._config?.left_entity),
        feedback: !0
      })
    ), e && this._config?.action_1_path && this._interactionHandles.push(
      A(e, {
        primary: () => this.navigate(this._config?.action_1_path),
        feedback: !0
      })
    ), i && this._config?.action_2_path && this._interactionHandles.push(
      A(i, {
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
mi.styles = Fn;
mi = Wn([
  S("component-quick-nav-v2")
], mi);
R({
  type: "component-quick-nav-v2",
  element: mi,
  name: "Quick Navigation",
  description: "Reusable quick navigation component."
});
const Kn = [
  T,
  H,
  j,
  Q,
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
var Yn = Object.defineProperty, Qn = Object.getOwnPropertyDescriptor, Ss = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Qn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && Yn(e, i, s), s;
};
const Zn = {
  type: "custom:component-room-navigation-v1",
  name: "Room",
  icon: "mdi:home-outline"
};
let Pe = class extends E {
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
    super.setConfig({ ...Zn, ...t }), this.hass && this._loadRegistry();
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
    const e = $s(t, this._registries, this.hass);
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
    t && this._config?.navigation_path ? (this._interactionHandle?.destroy(), this._interactionHandle = A(t, {
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
Pe.styles = Kn;
Ss([
  w()
], Pe.prototype, "_registries", 2);
Pe = Ss([
  S("component-room-navigation-v1")
], Pe);
R({
  type: "component-room-navigation-v1",
  element: Pe,
  name: "Room Navigation",
  description: "Area-aware room navigation with presence status."
});
const Jn = [
  T,
  H,
  W,
  j,
  xi,
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
var Xn = Object.getOwnPropertyDescriptor, to = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Xn(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const eo = {
  type: "custom:component-room-sheet-v2",
  icon: "mdi:bed-king-outline",
  title: "Room name",
  rows: null
}, Gr = [
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
let fi = class extends E {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...eo, ...t });
  }
  getCardSize() {
    return 5;
  }
  _getAction(t) {
    if (t.navigation_path) return () => this.navigate(t.navigation_path);
    if (t.service && this.hass) {
      const [e, i] = String(t.service).split(".");
      if (e && i)
        return () => D(this.hass, {
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
    this._interactionHandles = [], (Array.isArray(this._config?.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : Gr).forEach((e, i) => {
      const r = this._getAction(e);
      if (!r) return;
      const s = this.renderRoot.querySelector(
        `[data-row="${i}"]`
      );
      s && (s.setAttribute(
        "aria-label",
        e.aria_label || `${e.name || "Room control"}`
      ), this._interactionHandles.push(
        A(s, {
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
    const t = Array.isArray(this._config.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : Gr;
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
      const s = i.entity && this.hass?.states ? this.hass.states[i.entity] : null, a = i.entity ? lt(i.entity) : "", n = s && (!i.name || i.name === "Control name" || i.name === "Status metric") ? kt({ state: s }) : i.name || "Control name", c = s && (!i.state || i.state === "Current state" || i.state === "Supporting context") ? X(s, this.hass) : i.state || "", l = s && (!i.icon || i.icon === "mdi:circle-outline") ? s.attributes.icon || ge(a, s.state) : i.icon || "mdi:circle-outline", d = i.value || "", f = i.section || "Controls", m = f !== e;
      m && (e = f);
      const b = this._getAction(i), u = i.aria_label || `${n}: ${c || d}`;
      return o`
                ${m ? o`<div class="sep">${this.esc(f)}</div>` : ""}
                ${b ? o`
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
fi.styles = Jn;
fi = to([
  S("component-room-sheet-v2")
], fi);
R({
  type: "component-room-sheet-v2",
  element: fi,
  name: "Room Sheet",
  description: "Reusable room-sheet component."
});
const io = [
  T,
  H,
  nt,
  j,
  W,
  Me,
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
var ro = Object.defineProperty, so = Object.getOwnPropertyDescriptor, lr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? so(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && ro(e, i, s), s;
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
let ie = class extends E {
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
      const r = Number(t.attributes?.min_temp ?? 16), s = Number(t.attributes?.max_temp ?? 30), a = Number(t.attributes?.temperature ?? r);
      if (s > r)
        return Math.max(0, Math.min(100, (a - r) / (s - r) * 100));
    }
    if (e === "number" || e === "input_number") {
      const r = Number(t.attributes?.min ?? 0), s = Number(t.attributes?.max ?? 100), a = Number(t.state);
      if (Number.isFinite(a) && Number.isFinite(r) && Number.isFinite(s) && s > r)
        return Math.max(0, Math.min(100, (a - r) / (s - r) * 100));
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
    return this._coalescer ? this._coalescer : (this._coalescer = ir(
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
      return D(this.hass, {
        domain: i.domain,
        service: i.service,
        data: { ...i.data || {}, [s]: t },
        target: { entity_id: e }
      });
    }
    const r = this._domain();
    if (r === "light")
      return t <= 0 ? D(this.hass, {
        domain: "light",
        service: "turn_off",
        target: { entity_id: e }
      }) : D(this.hass, {
        domain: "light",
        service: "turn_on",
        data: { brightness_pct: Math.round(t) },
        target: { entity_id: e }
      });
    if (r === "fan")
      return D(this.hass, {
        domain: "fan",
        service: "set_percentage",
        data: { percentage: Math.round(t) },
        target: { entity_id: e }
      });
    if (r === "cover")
      return D(this.hass, {
        domain: "cover",
        service: "set_cover_position",
        data: { position: Math.round(t) },
        target: { entity_id: e }
      });
    if (r === "media_player")
      return D(this.hass, {
        domain: "media_player",
        service: "set_volume_level",
        data: { volume_level: Math.round(t) / 100 },
        target: { entity_id: e }
      });
    if (r === "climate") {
      const s = this._getState(), a = Number(s?.attributes?.min_temp ?? 16), n = Number(s?.attributes?.max_temp ?? 30), c = Number(s?.attributes?.target_temp_step ?? 0.5);
      let l = a + (n - a) * t / 100;
      return l = Number((Math.round(l / c) * c).toFixed(1)), D(this.hass, {
        domain: "climate",
        service: "set_temperature",
        data: { temperature: l },
        target: { entity_id: e }
      });
    }
    if (r === "number" || r === "input_number") {
      const s = this._getState(), a = Number(s?.attributes?.min ?? 0), n = Number(s?.attributes?.max ?? 100), c = a + (n - a) * t / 100;
      return D(this.hass, {
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
    !this._config?.entity || !this.hass || (await D(this.hass, {
      domain: "homeassistant",
      service: "toggle",
      target: { entity_id: this._config.entity }
    }), await De(
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
      return D(this.hass, {
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
    const t = this._config?.mode || "slider", e = !!this._config?.entity, i = this._getState(), r = e ? this._available(i) : !0, s = e ? i?.state === "on" : this._on;
    if (e && t === "slider") {
      const l = this.renderRoot.querySelector(
        ".identity"
      );
      l && (l.setAttribute("role", "button"), l.setAttribute("tabindex", "0"), l.setAttribute(
        "aria-label",
        `Open details for ${this._config?.title}`
      ), this._interactionHandles.push(
        A(l, {
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
          A(c, {
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
        const l = c.querySelector(".switch");
        this._interactionHandles.push(
          A(c, {
            primary: () => this._toggle(s),
            hold: () => this.moreInfo(this._config?.entity),
            optimistic: {
              capture: () => s,
              apply: () => {
                const d = !s;
                this._on = d, c.setAttribute("aria-pressed", String(d)), l?.classList.toggle("on", d);
              },
              rollback: () => {
                this._on = s, c.setAttribute("aria-pressed", String(s)), l?.classList.toggle("on", s);
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
        A(c, {
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
    const a = t === "switch" ? o`<span class="switch ${s ? "on" : ""}"
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
                  ?disabled=${e && !r}
                >
                  ${l}
                </button>
              ` : o`<div class="row row-static">${l}</div>`}
      </ha-card>
    `;
  }
};
ie.styles = io;
lr([
  w()
], ie.prototype, "_on", 2);
lr([
  w()
], ie.prototype, "_val", 2);
ie = lr([
  S("component-control-row-v2")
], ie);
R({
  type: "component-control-row-v2",
  element: ie,
  name: "Control Row",
  description: "Reusable control-row component."
});
const no = [
  T,
  H,
  nt,
  j,
  W,
  fe,
  Q,
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
var oo = Object.defineProperty, co = Object.getOwnPropertyDescriptor, Di = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? co(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && oo(e, i, s), s;
};
const Ye = { pause: 1, previous: 16, next: 32, play: 512 }, lo = {
  type: "custom:component-media-row-v2",
  icon: "mdi:speaker",
  title: "Media player",
  state: "Playing · Media title",
  entity: null
};
let zt = class extends E {
  constructor() {
    super(...arguments), this._playing = !0, this._optimisticPlaying = null, this._busy = !1, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...lo, ...t }), this._playing = !0, this._optimisticPlaying = null, this._busy = !1;
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
        await D(this.hass, {
          domain: "media_player",
          service: e,
          target: { entity_id: this._config.entity }
        }), await De(
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
      return D(this.hass, {
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
    const t = !!this._config?.entity, e = this._liveState(), r = t && this._available(e) ? e?.state === "playing" : this._playing;
    if (t) {
      const a = this.renderRoot.querySelector(
        ".identity"
      );
      a && (a.setAttribute(
        "aria-label",
        `Open details for ${this._config?.title}`
      ), this._interactionHandles.push(
        A(a, {
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
        A(n, {
          primary: () => this._momentary("media_previous_track"),
          feedback: !0
        })
      ), c && this._interactionHandles.push(
        A(c, {
          primary: () => this._momentary("media_next_track"),
          feedback: !0
        })
      );
    }
    const s = this.renderRoot.querySelector(
      ".main"
    );
    s && (t ? this._interactionHandles.push(
      A(s, {
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
      A(s, {
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
    const t = this._liveState(), e = !!this._config.entity, i = e && this._available(t), r = i ? t?.state === "playing" : this._playing, s = this._optimisticPlaying ?? r, a = i && this._supported(t, Ye.previous), n = i && this._supported(t, Ye.next), c = !this._busy && (!e || i && this._supported(
      t,
      s ? Ye.pause : Ye.play
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
              aria-label="${s ? "Pause" : "Play"}"
              ?disabled=${!c}
            >
              <ha-icon icon="mdi:${s ? "pause" : "play"}"></ha-icon>
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
zt.styles = no;
Di([
  w()
], zt.prototype, "_playing", 2);
Di([
  w()
], zt.prototype, "_optimisticPlaying", 2);
Di([
  w()
], zt.prototype, "_busy", 2);
zt = Di([
  S("component-media-row-v2")
], zt);
R({
  type: "component-media-row-v2",
  element: zt,
  name: "Media Row",
  description: "Reusable media-row component."
});
const ho = [
  ns,
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
var po = Object.defineProperty, uo = Object.getOwnPropertyDescriptor, dr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? uo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && po(e, i, s), s;
};
const mo = "custom:auto-entities", Kr = (t) => JSON.parse(JSON.stringify(t));
let re = class extends E {
  constructor() {
    super(...arguments), this._innerCard = null, this._innerError = !1, this._generation = 0, this._retryTimer = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.filter) throw new Error("An Auto-Entities filter is required");
    super.setConfig(Kr(t)), this._generation += 1, this._retryTimer && clearTimeout(this._retryTimer), this._retryTimer = null, this._buildCard();
  }
  getCardSize() {
    const t = !!this._config?.header?.title?.trim();
    return (typeof this._innerCard?.getCardSize == "function" && Number(this._innerCard.getCardSize()) || 1) + (t ? 1 : 0);
  }
  getLayoutOptions() {
    return this._innerCard?.getLayoutOptions?.() ?? {};
  }
  _cardConfig() {
    const t = Kr(
      this._config || {}
    ), e = t.exclude_invalid_states !== !1;
    delete t.header, delete t.exclude_invalid_states, t.type = mo;
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
re.styles = ho;
dr([
  w()
], re.prototype, "_innerCard", 2);
dr([
  w()
], re.prototype, "_innerError", 2);
re = dr([
  S("component-device-aware-auto-entities-v1")
], re);
R({
  type: "component-device-aware-auto-entities-v1",
  element: re,
  name: "Device Aware Auto Entities",
  description: "Presentation wrapper for Auto-Entities collections."
});
const fo = [
  T,
  H,
  W,
  j,
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
var go = Object.defineProperty, bo = Object.getOwnPropertyDescriptor, hr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? bo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && go(e, i, s), s;
};
const _o = {
  type: "custom:component-device-discovery-v2",
  demo: !1,
  refresh_seconds: 60,
  max_rows: 6
}, vo = [
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
let se = class extends E {
  constructor() {
    super(...arguments), this._flows = [], this._stateKind = "ready", this._timer = null, this._started = !1, this._loadGeneration = 0, this._interactionHandles = [];
  }
  setConfig(t) {
    const e = !!this._config?.demo;
    if (super.setConfig({ ..._o, ...t }), this._config?.demo) {
      (!e || this._started) && (this._timer && clearInterval(this._timer), this._timer = null, this._started = !1, this._loadGeneration += 1), this._flows = vo, this._stateKind = "ready";
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
      A(t, { primary: () => this.load(), feedback: !0 })
    );
    const e = this.renderRoot.querySelector(
      "button.refresh"
    );
    e && this._interactionHandles.push(
      A(e, { primary: () => this.load(), feedback: !0 })
    ), this.renderRoot.querySelectorAll("button.row").forEach((r) => {
      this._interactionHandles.push(
        A(r, {
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
    const t = Math.max(1, Number(this._config.max_rows) || 6), e = this._flows.slice(0, t), i = Math.max(0, this._flows.length - e.length), r = this._flows.length === 0, s = r ? "No devices waiting" : `${this._flows.length} ${this._flows.length === 1 ? "device" : "devices"} found`, a = r ? "Home Assistant has no new setup suggestions." : "Home Assistant has setup suggestions ready to review.";
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
se.styles = fo;
hr([
  w()
], se.prototype, "_flows", 2);
hr([
  w()
], se.prototype, "_stateKind", 2);
se = hr([
  S("component-device-discovery-v2")
], se);
R({
  type: "component-device-discovery-v2",
  element: se,
  name: "Device Discovery",
  description: "Reusable device-discovery status component."
});
const yo = [
  T,
  H,
  W,
  j,
  nt,
  bt,
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
var xo = Object.defineProperty, wo = Object.getOwnPropertyDescriptor, Ti = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? wo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && xo(e, i, s), s;
};
const $o = {
  type: "custom:component-update-row-v3",
  icon: "mdi:update",
  title: "Update name",
  current: "Current 1.0",
  available: "Available 1.1",
  action: "Update",
  confirm: !0,
  entity: null
};
let Ot = class extends E {
  constructor() {
    super(...arguments), this._busy = !1, this._requested = !1, this._error = "", this._startTimer = null, this._errorTimer = null, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...$o, ...t });
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
        await D(this.hass, {
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
      A(e, {
        primary: () => this.moreInfo(this._config?.entity),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    )), i && this._interactionHandles.push(
      A(i, {
        primary: () => this._install(t),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._data(), e = t.progress.active || this._busy || this._requested, i = t.missing || t.unavailable || !t.pending || e, r = this._error ? "Retry" : this._busy || this._requested ? "Starting…" : t.action, s = this._error ? this._error : `${t.current}${t.available ? ` · ${t.available}` : ""}`, a = e ? t.progress.determinate ? o`
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
        ${a}
      </ha-card>
    `;
  }
};
Ot.styles = yo;
Ti([
  w()
], Ot.prototype, "_busy", 2);
Ti([
  w()
], Ot.prototype, "_requested", 2);
Ti([
  w()
], Ot.prototype, "_error", 2);
Ot = Ti([
  S("component-update-row-v3")
], Ot);
R({
  type: "component-update-row-v3",
  element: Ot,
  name: "Update Row",
  description: "Reusable update row with live update support."
});
const Co = [
  T,
  H,
  W,
  bt,
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
var ko = Object.defineProperty, So = Object.getOwnPropertyDescriptor, pr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? So(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && ko(e, i, s), s;
};
const Ao = {
  type: "custom:component-update-summary-v3",
  count: "3",
  title: "updates available",
  message: "Review the items below before installing.",
  live_updates: !1,
  update_all: !1,
  confirm: !0
};
let ae = class extends E {
  constructor() {
    super(...arguments), this._busy = !1, this._error = "", this._messageTimer = null, this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Ao, ...t });
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
      r.length && await D(this.hass, {
        domain: "update",
        service: "install",
        target: { entity_id: r }
      });
      for (const s of i)
        t.some((a) => a.entity_id === s) && await D(this.hass, {
          domain: "update",
          service: "install",
          target: { entity_id: s }
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
    t ? (this._interactionHandle?.destroy(), this._interactionHandle = A(t, {
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
ae.styles = Co;
pr([
  w()
], ae.prototype, "_busy", 2);
pr([
  w()
], ae.prototype, "_error", 2);
ae = pr([
  S("component-update-summary-v3")
], ae);
R({
  type: "component-update-summary-v3",
  element: ae,
  name: "Update Summary",
  description: "Reusable update summary with live update support."
});
const Eo = [
  T,
  H,
  W,
  fe,
  j,
  fa,
  Me,
  It,
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
var Do = Object.defineProperty, To = Object.getOwnPropertyDescriptor, Pi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? To(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && Do(e, i, s), s;
};
const Po = Object.freeze([
  ["up", "Up", "mdi:chevron-up"],
  ["left", "Left", "mdi:chevron-left"],
  ["select", "Select", "mdi:circle"],
  ["right", "Right", "mdi:chevron-right"],
  ["down", "Down", "mdi:chevron-down"]
]), zo = Object.freeze([
  ["menu", "Menu", "mdi:menu"],
  ["home", "Home", "mdi:home-outline"],
  ["top_menu", "Top menu", "mdi:format-list-bulleted"]
]);
let Rt = class extends E {
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
  async _callService(t, e, i, r, s) {
    if (!(!this.hass || !this._serviceSupported(e, i) || s && !this._isAvailable(s) || this._inFlightActions.has(t))) {
      this._inFlightActions.add(t), this._busyAction = t, t === "remote:power" && this._setPowerActionFeedback(!0), this._actionError = null;
      try {
        await D(this.hass, {
          domain: e,
          service: i,
          data: r,
          target: s ? { entity_id: s } : void 0
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
    const t = this._config.entity || "media_player.demo_apple_tv", e = this.hass?.states?.[t], i = e?.attributes || {}, r = e?.state === "playing", s = this._mediaAvailable("toggle"), a = this._config.title || i.friendly_name || "Apple TV", n = e?.state === "unavailable" || e?.state === "unknown" ? "Unavailable" : [
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
              aria-label="Show ${a} details"
              @click=${() => this.moreInfo(this._config?.entity)}
            >
              <ha-icon icon=${i.icon || "mdi:apple"}></ha-icon>
            </button>
            <div class="copy-block">
              <div class="label-title">${this.esc(a)}</div>
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
                class="btn-icon-44 ${s ? "on" : ""}"
                type="button"
                aria-label="Toggle Apple TV power"
                aria-pressed=${String(e?.state !== "off")}
                ?disabled=${!s}
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
              ?disabled=${!s}
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
    const t = this._remoteAvailable(), e = this._config?.entity || "media_player.demo_apple_tv", r = this.hass?.states?.[e]?.attributes || {}, s = r.volume_level !== void 0 ? Math.round(Number(r.volume_level) * 100) : null, a = [
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
      Po.map((d) => [d[0], d])
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
      ${s !== null ? o`<div
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
                .value=${String(s)}
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
              <span class="volume-val">${s}%</span>
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
      const [, f, m] = n.get(d);
      return o`<button
            class="dpad-btn ${d === "select" ? "select-center select" : "direction"}"
            data-key=${d}
            type="button"
            aria-label=${f}
            ?disabled=${!t}
            @click=${(b) => {
        b.stopPropagation(), this._remoteAction(d);
      }}
          >
            <ha-icon icon=${m}></ha-icon>
          </button>`;
    })}
      </div>
      <div class="utility">
        ${zo.map(
      ([d, f, m]) => o`<button
              type="button"
              ?disabled=${!t}
              @click=${(b) => {
        b.stopPropagation(), this._remoteAction(d);
      }}
            >
              <ha-icon icon=${m}></ha-icon>
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
    const t = this._config?.entity || "media_player.demo_apple_tv", e = this.hass?.states?.[t]?.attributes, i = e?.source_list, r = e?.source, s = Array.isArray(i) ? i.filter((a) => typeof a == "string") : [];
    return s.length ? o`<div
          class="app-grid"
          @click=${(a) => a.stopPropagation()}
          @mousedown=${(a) => a.stopPropagation()}
        >
          ${s.map(
      (a) => o`<button
                class="app-btn ${a === r ? "active" : ""}"
                type="button"
                aria-pressed=${String(a === r)}
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
Rt.styles = Eo;
Pi([
  w()
], Rt.prototype, "_activePanel", 2);
Pi([
  w()
], Rt.prototype, "_actionError", 2);
Pi([
  w()
], Rt.prototype, "_busyAction", 2);
Rt = Pi([
  S("component-apple-tv-controller-v1")
], Rt);
R({
  type: "component-apple-tv-controller-v1",
  element: Rt,
  name: "Apple TV Controller",
  description: "Apple TV media, remote and source controls with the established dashboard presentation."
});
const Oo = [
  T,
  H,
  W,
  fe,
  j,
  It,
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
var Ro = Object.defineProperty, Ho = Object.getOwnPropertyDescriptor, be = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ho(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && Ro(e, i, s), s;
};
let dt = class extends E {
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
      const r = await Ei(
        i,
        this._config.profile || "household-security",
        { force: t }
      );
      if (e !== this._sequence || i !== this.hass) return;
      this._model = r, this._camera = r.cameras.find(
        (s) => s.entityId === this._config?.entity || s.deviceId === this._config?.device_id
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
    if (!this.hass || !yt(r) || this._busyActionId) return;
    if (e && /^(Recording|Detection|Alerts)$/i.test(t.role || "") && this._confirmId !== i) {
      this._askConfirmation(i);
      return;
    }
    this._confirmId = null, this._confirmTimer && clearTimeout(this._confirmTimer), this._busyActionId = i, this._actionError = null;
    try {
      await D(this.hass, {
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
    if (!(!this.hass || !yt(e) || this._busyActionId)) {
      if (this._confirmId !== t) {
        this._askConfirmation(t);
        return;
      }
      this._confirmId = null, this._confirmTimer && clearTimeout(this._confirmTimer), this._busyActionId = t, this._actionError = null;
      try {
        await D(this.hass, {
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
        <div
          class="sheet"
          @click=${(a) => a.stopPropagation()}
          @mousedown=${(a) => a.stopPropagation()}
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
      const i = e.entity.entity_id, r = this.hass?.states[i], s = r?.attributes?.entity_picture, a = r?.last_updated, n = a && new Date(a), c = n && Number.isFinite(n.getTime()) ? bi(this.hass, n, {
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
      const i = e.entity.entity_id, r = this.hass?.states[i], s = r?.state === "on", a = this._confirmId === i, n = yt(r), c = this._busyActionId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.role || "Control")}</span
                            >
                            <span class="control-state"
                              >${n ? c ? "Working…" : s ? "On" : "Off" : "Unavailable"}</span
                            >
                          </span>
                          <button
                            class="${s ? "on" : ""} ${a ? "confirm" : ""}"
                            type="button"
                            ?disabled=${!n || !!this._busyActionId}
                            aria-busy=${c ? "true" : "false"}
                            @click=${() => this._toggleSwitch(e, s)}
                          >
                            ${c ? "Working…" : a ? "Confirm off" : s ? "On" : "Off"}
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
      const i = e.entity.entity_id, r = this._confirmId === i, s = yt(
        this.hass?.states[i]
      ), a = this._busyActionId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.entity.name || e.entity.original_name || "Action")}</span
                            >
                            <span class="control-state"
                              >${s ? a ? "Working…" : "Available" : "Unavailable"}</span
                            >
                          </span>
                          <button
                            class="${r ? "confirm" : ""}"
                            type="button"
                            ?disabled=${!s || !!this._busyActionId}
                            aria-busy=${a ? "true" : "false"}
                            @click=${() => this._pressAction(i)}
                          >
                            ${a ? "Working…" : r ? "Confirm" : "Run"}
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
      const i = e.entity_id, r = this.hass?.states[i], s = yt(r), a = this._busyActionId === i, n = e.name || e.original_name || "PTZ Control", c = i.split(".")[0];
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name">${this.esc(n)}</span>
                            <span class="control-state"
                              >${s ? a ? "Working…" : r?.state || "Available" : "Unavailable"}</span
                            >
                          </span>
                          <button
                            type="button"
                            ?disabled=${!s || !!this._busyActionId}
                            aria-busy=${a ? "true" : "false"}
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
dt.stubConfig = { profile: "household-security" };
dt.styles = Oo;
be([
  w()
], dt.prototype, "_model", 2);
be([
  w()
], dt.prototype, "_camera", 2);
be([
  w()
], dt.prototype, "_confirmId", 2);
be([
  w()
], dt.prototype, "_busyActionId", 2);
be([
  w()
], dt.prototype, "_actionError", 2);
dt = be([
  S("component-camera-controller-v2")
], dt);
R({
  type: "component-camera-controller-v2",
  element: dt,
  name: "Camera Controller V2",
  description: "Platform-adapted camera controls with explicit state and protected destructive changes."
});
const No = [
  T,
  Q,
  H,
  W,
  j,
  It,
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
var Lo = Object.defineProperty, Io = Object.getOwnPropertyDescriptor, qe = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Io(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && Lo(e, i, s), s;
};
let $t = class extends E {
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
    const t = this._entityState(this._config?.entity), e = this._entityState(this._controlEntityId()), i = this._entityState(this._config?.availability_entity), r = !!this._config?.availability_entity && (!i || i.state !== "on") || !e || Z(e), s = String(t?.state || "unknown").toLowerCase(), a = s === "on" || s === "off", n = a && s === "off", c = a && s === "on", l = !t || Z(t);
    return {
      state: t,
      control: e,
      controllerUnavailable: r,
      stateUnavailable: l,
      known: a,
      closed: n,
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
      r = this._waitForConfirmation(e), r.catch(() => {
      });
      const s = this._controlEntityId();
      if (!s) return;
      const a = s.split(".")[0];
      if (a === "cover" ? await D(this.hass, {
        domain: "cover",
        service: "toggle",
        target: { entity_id: s }
      }) : a === "switch" ? await D(this.hass, {
        domain: "switch",
        service: "toggle",
        target: { entity_id: s }
      }) : a === "button" ? await D(this.hass, {
        domain: "button",
        service: "press",
        target: { entity_id: s }
      }) : a === "script" ? await D(this.hass, {
        domain: "script",
        service: "turn_on",
        target: { entity_id: s }
      }) : await D(this.hass, {
        domain: "homeassistant",
        service: "toggle",
        target: { entity_id: s }
      }), i !== this._requestGeneration) return;
      this._pendingLabel = e === "on" ? "Opening" : e === "off" ? "Closing" : "Waiting";
      const n = await r;
      if (i !== this._requestGeneration) return;
      this._setMessage(
        n === "off" ? "Closed confirmed." : n === "on" ? "Door movement confirmed." : "Garage state confirmed."
      );
    } catch (s) {
      if (i !== this._requestGeneration) return;
      this._cancelConfirmation(
        s instanceof Error ? s : new Error("Garage command failed")
      );
      const a = String(s?.message || "");
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
      A(t, {
        primary: () => this.moreInfo(this._config?.entity),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    ), e && this._interactionHandles.push(
      A(e, {
        primary: () => this._requestAction(),
        optimistic: !1,
        repeat: !1,
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._status(), i = (t.state?.attributes?.friendly_name || "").replace(/\s*Garage Door Status$/i, "").trim(), r = this._config.title || i || "Garage door", s = t.controllerUnavailable ? "Controller unavailable" : t.closed ? "Closed" : t.notClosed ? "Not closed" : t.stateUnavailable ? "Door state unavailable" : "Door state unknown", a = t.closed ? "Open" : "Trigger", n = t.controllerUnavailable || this._busy;
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
$t.styles = No;
qe([
  w()
], $t.prototype, "_busy", 2);
qe([
  w()
], $t.prototype, "_pendingLabel", 2);
qe([
  w()
], $t.prototype, "_message", 2);
qe([
  w()
], $t.prototype, "_messageType", 2);
$t = qe([
  S("component-garage-door-controller-v1")
], $t);
R({
  type: "component-garage-door-controller-v1",
  element: $t,
  name: "Garage Door Controller",
  description: "A garage-door controller for a closed-position reed sensor and momentary operator trigger."
});
const Mo = [
  T,
  Q,
  H,
  W,
  fe,
  j,
  Me,
  xi,
  It,
  pt,
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
var qo = Object.defineProperty, Uo = Object.getOwnPropertyDescriptor, ur = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Uo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && qo(e, i, s), s;
};
const J = (t) => !t || ["unknown", "unavailable"].includes(t.state), ct = (t) => {
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
  return i[r] ? i[r] : e.replaceAll("_", " ").split(" ").map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(" ");
}, Vt = (t) => Number.isFinite(Number(t)) ? Number(t).toFixed(Number(t) % 1 ? 1 : 0) + "°" : "—", Je = /* @__PURE__ */ new Map(), As = (t) => `ha_split_resume_${t}`, jo = (t) => {
  if (Je.has(t))
    return Je.get(t);
  try {
    const e = typeof localStorage < "u" ? localStorage.getItem(As(t)) : null;
    if (e) {
      const i = JSON.parse(e);
      if (i && typeof i.hvacMode == "string")
        return Je.set(t, i), i;
    }
  } catch {
  }
  return null;
}, Bo = (t, e) => {
  Je.set(t, e);
  try {
    typeof localStorage < "u" && localStorage.setItem(As(t), JSON.stringify(e));
  } catch {
  }
};
let ne = class extends E {
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
    return this.hass ? D(this.hass, { domain: t, service: e, data: i }) : void 0;
  }
  updated(t) {
    super.updated(t), this._captureActiveState();
  }
  _captureActiveState() {
    if (!this._config?.entity) return;
    const t = this._state();
    if (!t || J(t) || t.state === "off") return;
    const e = t.attributes || {}, i = this._vanes().find((a) => a.axis === "Vertical"), r = this._vanes().find((a) => a.axis === "Horizontal"), s = {
      hvacMode: t.state,
      temperature: Number.isFinite(Number(e.temperature)) ? Number(e.temperature) : void 0,
      fanMode: e.fan_mode ? String(e.fan_mode) : void 0,
      swingMode: e.swing_mode ? String(e.swing_mode) : void 0,
      swingHorizontalMode: e.swing_horizontal_mode ? String(e.swing_horizontal_mode) : void 0,
      verticalVaneOption: i?.entity ? i.current : void 0,
      horizontalVaneOption: r?.entity ? r.current : void 0,
      updatedAt: Date.now()
    };
    Bo(this._config.entity, s);
  }
  async _power() {
    if (!this._config?.entity || !this.hass) return;
    const t = this._state();
    if (!t || J(t)) return;
    if (t.state === "off") {
      const i = jo(this._config.entity), r = t.attributes?.hvac_modes || [], s = i?.hvacMode && r.includes(i.hvacMode) && i.hvacMode !== "off" ? i.hvacMode : r.includes("cool") ? "cool" : r.includes("heat") ? "heat" : r.find((a) => a !== "off") || "cool";
      try {
        await D(this.hass, {
          domain: "climate",
          service: "set_hvac_mode",
          data: { hvac_mode: s },
          target: { entity_id: this._config.entity }
        });
      } catch {
        await D(this.hass, {
          domain: "climate",
          service: "turn_on",
          target: { entity_id: this._config.entity }
        });
      }
      if (i?.temperature && Number.isFinite(i.temperature))
        try {
          await D(this.hass, {
            domain: "climate",
            service: "set_temperature",
            data: { temperature: i.temperature },
            target: { entity_id: this._config.entity }
          });
        } catch {
        }
      if (i?.fanMode && Array.isArray(t.attributes?.fan_modes) && t.attributes.fan_modes.includes(i.fanMode))
        try {
          await D(this.hass, {
            domain: "climate",
            service: "set_fan_mode",
            data: { fan_mode: i.fanMode },
            target: { entity_id: this._config.entity }
          });
        } catch {
        }
      if (i?.swingMode && Array.isArray(t.attributes?.swing_modes) && t.attributes.swing_modes.includes(i.swingMode))
        try {
          await D(this.hass, {
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
        await D(this.hass, {
          domain: "climate",
          service: "set_hvac_mode",
          data: { hvac_mode: "off" },
          target: { entity_id: this._config.entity }
        });
      } catch {
        await D(this.hass, {
          domain: "climate",
          service: "turn_off",
          target: { entity_id: this._config.entity }
        });
      }
    }
  }
  _getTempCoalescer() {
    return this._tempCoalescer ? this._tempCoalescer : (this._tempCoalescer = ir(
      async (t) => {
        !this._config?.entity || !this.hass || (await D(this.hass, {
          domain: "climate",
          service: "set_temperature",
          data: { temperature: t },
          target: { entity_id: this._config.entity }
        }), await De(
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
    const e = this._state()?.attributes || {}, i = Number(e.temperature), r = this._optimisticTemp ?? (Number.isFinite(i) ? i : 21), s = Number(e.target_temp_step || e.step) || 0.5, a = Number(e.min_temp) || 16, n = Number(e.max_temp) || 31, c = Math.min(
      n,
      Math.max(a, Number((r + t * s).toFixed(1)))
    );
    this._optimisticTemp = c, this._getTempCoalescer().request(c);
  }
  _vanes() {
    const t = [], i = this._state()?.attributes || {}, r = this._config?.entity?.replace(/^climate\./, "") || "", s = this._config?.vertical_vane_entity || this._config?.vertical_vane || (this.hass?.states?.[`select.${r}_vertical_vane`] ? `select.${r}_vertical_vane` : void 0) || (this.hass?.states?.[`select.${r}_vane_vertical`] ? `select.${r}_vane_vertical` : void 0), a = this._config?.horizontal_vane_entity || this._config?.horizontal_vane || (this.hass?.states?.[`select.${r}_horizontal_vane`] ? `select.${r}_horizontal_vane` : void 0) || (this.hass?.states?.[`select.${r}_vane_horizontal`] ? `select.${r}_vane_horizontal` : void 0);
    if (s) {
      const n = this._state(s);
      n && !J(n) && t.push({
        axis: "Vertical",
        entity: s,
        state: n,
        options: n.attributes?.options || [],
        current: n.state
      });
    }
    if (a) {
      const n = this._state(a);
      n && !J(n) && t.push({
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
    const t = this._state(), e = t?.attributes || {}, i = t && !J(t) && t.state !== "off", r = this._state(this._config.timer_entity), a = this._vanes().map((b) => `${b.axis.slice(0, 1)} ${ct(b.current)}`).join(" · "), n = this._config.title || e.friendly_name || "Split system", c = J(t) ? "Unavailable" : i ? ct(t?.state) : e.current_temperature !== void 0 ? `Off · ${Vt(e.current_temperature)}` : "Off", l = this._optimisticTemp ?? e.temperature, d = {
      cool: "mdi:snowflake",
      heat: "mdi:fire",
      dry: "mdi:water-percent",
      fan_only: "mdi:fan",
      auto: "mdi:thermostat-auto",
      off: "mdi:power"
    }, f = String(t?.state || "off").toLowerCase(), m = d[f] || "mdi:thermostat";
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
                ><ha-icon icon="${m}"></ha-icon
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
                        >${Vt(e.current_temperature)}</span
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
                          ${Vt(l)}
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
                      aria-label="HVAC mode: ${ct(t?.state)}"
                      ?disabled=${J(t)}
                      @click=${() => this._openPanel("mode")}
                    >
                      <ha-icon icon="${m}"></ha-icon>
                      <span class="action-label"
                        >Mode · ${ct(t?.state)}</span
                      >
                    </button>
                    <button
                      class="btn-action-pill action-pill"
                      type="button"
                      data-panel="fan"
                      aria-expanded="${String(this._activePanel === "fan")}"
                      aria-label="Fan speed: ${ct(e.fan_mode)}"
                      ?disabled=${J(t)}
                      @click=${() => this._openPanel("fan")}
                    >
                      <ha-icon icon="mdi:fan"></ha-icon>
                      <span class="action-label"
                        >Fan · ${ct(e.fan_mode)}</span
                      >
                    </button>
                    ${a ? o`
                            <button
                              class="btn-action-pill action-pill"
                              type="button"
                              data-panel="vanes"
                              aria-expanded="${String(this._activePanel === "vanes")}"
                              aria-label="Vanes: ${a}"
                              ?disabled=${J(t)}
                              @click=${() => this._openPanel("vanes")}
                            >
                              <ha-icon icon="mdi:swap-vertical"></ha-icon>
                              <span class="action-label"
                                >Vanes · ${this.esc(a)}</span
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
                <span>${ct(c)}</span>
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
                <span>${ct(c)}</span>
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
                      <span>${ct(l)}</span>
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
    const r = Number(e.min_temp), s = Number(e.max_temp), a = Number(e.target_temp_step) || 0.5;
    return o`
      <p class="fb">
        Native Home Assistant controls · ${Vt(r)}–${Vt(s)}
        · ${Vt(a)} steps
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
                        <span>${ct(n)}</span>
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
ne.styles = Mo;
ur([
  w()
], ne.prototype, "_activePanel", 2);
ur([
  w()
], ne.prototype, "_optimisticTemp", 2);
ne = ur([
  S("component-split-controller-v4")
], ne);
R({
  type: "component-split-controller-v4",
  element: ne,
  name: "Split-System Controller",
  description: "Direct Home Assistant climate controls with the established Split System presentation."
});
const Fo = [
  T,
  Q,
  H,
  W,
  fe,
  j,
  os,
  Me,
  xi,
  It,
  rr,
  pt,
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
var Vo = Object.defineProperty, Wo = Object.getOwnPropertyDescriptor, Mt = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Wo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && Vo(e, i, s), s;
};
let ht = class extends E {
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
    const e = (this._registries?.entities || []).find((v) => v.entity_id === this._config.entity), i = this._config.device_id || e?.device_id, s = ((i ? this._registries?.byDevice?.get(i) : []) || []).filter(
      (v) => v?.platform === "wled" && !v.disabled_by && this.hass?.states[v.entity_id]
    ), a = s.filter((v) => Ui(v.entity_id) === "light"), n = a.find((v) => v.entity_id === this._config.entity) || a.find((v) => ks(v) === "main") || a[0], c = a.filter(
      (v) => Array.isArray(this.hass?.states[v.entity_id]?.attributes?.effect_list)
    ), l = s.filter(
      (v) => Ui(v.entity_id) === "select"
    ), d = s.filter(
      (v) => Ui(v.entity_id) === "number"
    ), f = (v, k) => k.test(`${v.entity_id} ${v.original_name || ""} ${v.name || ""}`), m = l.find((v) => f(v, /\bpreset\b/i)), b = l.filter(
      (v) => f(v, /color.?palette|colour.?palette/i)
    ), u = d.filter((v) => f(v, /\bspeed\b/i)), h = d.filter((v) => f(v, /\bintensity\b/i)), _ = this._registries?.devices?.find((v) => v.id === i), p = n?.entity_id || this._config.entity, g = c.length ? c.map((v) => v.entity_id) : this.hass.states[p]?.attributes?.effect_list ? [p] : [], C = _?.name_by_user || _?.name || this.hass?.states[p]?.attributes?.friendly_name || "WLED";
    return {
      deviceId: i || void 0,
      deviceName: C,
      main: p,
      effectLights: g,
      preset: m?.entity_id || null,
      palettes: b.map((v) => v.entity_id),
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
    await D(this.hass, {
      domain: "light",
      service: "toggle",
      target: { entity_id: t }
    }), await De(
      () => this.hass,
      t,
      (r) => r === (i ? "off" : "on"),
      { timeout: 5e3 }
    );
  }
  _getBrightnessCoalescer() {
    return this._brightnessCoalescer ? this._brightnessCoalescer : (this._brightnessCoalescer = ir(
      async (t) => {
        const e = this._bundle?.main;
        !e || !this.hass || (t <= 0 ? await D(this.hass, {
          domain: "light",
          service: "turn_off",
          target: { entity_id: e }
        }) : await D(this.hass, {
          domain: "light",
          service: "turn_on",
          data: { brightness: t },
          target: { entity_id: e }
        }), await De(
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
      (r) => r != null && !Vr.has(String(r).toLowerCase())
    );
    return i.length ? i.every((r) => String(r) === String(i[0])) ? String(i[0]) : "Mixed" : null;
  }
  async _call(t, e, i, r = {}) {
    const s = [...new Set((i || []).filter(Boolean))];
    !this.hass || !s.length || await Promise.all(
      s.map(
        (a) => D(this.hass, {
          domain: t,
          service: e,
          data: r,
          target: { entity_id: a }
        })
      )
    );
  }
  _openAdvanced(t = !1, e) {
    const i = this.renderRoot.querySelector(
      "dialog"
    ), r = this._bundle || this._resolveBundle();
    if (!i || !r) return;
    const s = this.hass?.states?.[r.main];
    if (String(s?.state || "unavailable").toLowerCase() === "on") {
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
    const e = this.hass.states[t.main], i = String(e?.state || "unavailable").toLowerCase(), r = i === "on", s = i === "on" || i === "off", a = r ? Number(e?.attributes?.brightness ?? 0) : 0, n = this._brightnessIntent ?? a, c = this._same(
      t.effectLights,
      (x) => x?.attributes?.effect
    ), l = this._same(t.palettes, (x) => x?.state), d = this._same(t.speeds, (x) => x?.state), f = this._same(t.intensities, (x) => x?.state), m = t.preset ? this.hass.states[t.preset] : null, b = m?.attributes?.options || [], u = r ? [
      this._pct(n),
      c && c !== "Mixed" ? c : null,
      l && l !== "Mixed" ? l : null
    ].filter(Boolean).join(" · ") : i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : "Off", h = (x) => {
      const P = this.hass?.states?.[x];
      return !!(P && !Vr.has(String(P.state).toLowerCase()));
    }, _ = !!(t.preset && h(t.preset)), p = t.effectLights.some(h), g = t.palettes.some(h), C = t.speeds.some(h), v = t.intensities.some(h), N = t.effectLights.map((x) => this.hass?.states[x]).find(Boolean)?.attributes?.effect_list || [], q = t.palettes.map((x) => this.hass?.states[x]).find(Boolean)?.attributes?.options || [];
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
              @click=${(x) => this._openAdvanced(!1, x)}
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
              ?disabled=${!s}
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
                    @input=${(x) => {
      const P = Number(x.target.value);
      this._brightnessIntent = P, this._getBrightnessCoalescer().request(P);
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
                    @click=${(x) => this._openAdvanced(!0, x)}
                  >
                    <ha-icon icon="mdi:bookmark-multiple-outline"></ha-icon>
                    <span>Presets</span>
                  </button>
                  <button
                    class="btn-action-pill action colour"
                    type="button"
                    ?disabled=${!p}
                    aria-label="WLED colour"
                    @click=${() => this.moreInfo(t.effectLights[0] || t.main)}
                  >
                    <ha-icon icon="mdi:palette-outline"></ha-icon>
                    <span>Colour</span>
                  </button>
                  <button
                    class="btn-action-pill action advanced"
                    type="button"
                    ?disabled=${!(_ || p || g || C || v)}
                    aria-label="WLED advanced settings"
                    @click=${(x) => this._openAdvanced(!1, x)}
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
        @mousedown=${(x) => {
      const P = this.renderRoot.querySelector("dialog");
      if (P && x.target === P) {
        const U = P.getBoundingClientRect();
        U.top <= x.clientY && x.clientY <= U.top + U.height && U.left <= x.clientX && x.clientX <= U.left + U.width || P.close();
      }
    }}
      >
        <div
          class="sheet"
          @click=${(x) => x.stopPropagation()}
          @mousedown=${(x) => x.stopPropagation()}
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
                ${b.length ? b.map((x) => {
      const P = String(m?.state) === String(x);
      return o`
                          <button
                            class="btn-action-pill preset-btn ${P ? "active" : ""}"
                            type="button"
                            role="button"
                            aria-pressed="${String(P)}"
                            title="${this.esc(x)}"
                            @click=${async (U) => {
        U.stopPropagation(), await this._call(
          "select",
          "select_option",
          t.preset ? [t.preset] : [],
          { option: x }
        );
      }}
                          >
                            ${this.esc(x)}
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
                    ?disabled=${!p || !N.length}
                    @change=${(x) => {
      const P = x.target.value;
      P && this._call("light", "turn_on", t.effectLights, {
        effect: P
      });
    }}
                  >
                    ${!c || c === "Mixed" ? o`<option value="" selected>
                            ${c === "Mixed" ? "Mixed" : "Choose effect"}
                          </option>` : ""}
                    ${N.map(
      (x) => o`<option
                          value="${this.esc(x)}"
                          ?selected=${c === x}
                        >
                          ${this.esc(x)}
                        </option>`
    )}
                  </select>
                </label>

                <label class="field">
                  <span>Palette</span>
                  <select
                    class="select-dropdown-control palette"
                    aria-label="Palette selection"
                    ?disabled=${!g || !q.length}
                    @change=${(x) => {
      const P = x.target.value;
      P && this._call("select", "select_option", t.palettes, {
        option: P
      });
    }}
                  >
                    ${!l || l === "Mixed" ? o`<option value="" selected>
                            ${l === "Mixed" ? "Mixed" : "Choose palette"}
                          </option>` : ""}
                    ${q.map(
      (x) => o`<option
                          value="${this.esc(x)}"
                          ?selected=${l === x}
                        >
                          ${this.esc(x)}
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
                    ?disabled=${!C}
                    @input=${(x) => {
      this._speedIntent = Number(
        x.target.value
      );
    }}
                    @change=${(x) => {
      const P = Number(x.target.value);
      this._speedIntent = null, this._call("number", "set_value", t.speeds, {
        value: P
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
                    @input=${(x) => {
      this._intensityIntent = Number(
        x.target.value
      );
    }}
                    @change=${(x) => {
      const P = Number(x.target.value);
      this._intensityIntent = null, this._call("number", "set_value", t.intensities, {
        value: P
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
      (x) => o`
                    <button
                      class="btn-action-pill preset-btn"
                      type="button"
                      aria-label="${x.name}"
                      style="--action-glow-color: rgb(${x.rgb.join(",")});"
                      @click=${(P) => {
        P.stopPropagation(), this._call("light", "turn_on", t.effectLights, {
          rgb_color: x.rgb
        });
      }}
                    >
                      <span
                        style="display:inline-block;width:12px;height:12px;border-radius:50%;background:rgb(${x.rgb.join(",")});margin-right:6px;border:1px solid var(--divider-color);flex-shrink:0;"
                      ></span>
                      <span>${x.name}</span>
                    </button>
                  `
    )}
              </div>
            </section>

            <div class="native">
              <button
                class="btn-action-pill action native-colour"
                type="button"
                ?disabled=${!p}
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
ht.styles = Fo;
Mt([
  w()
], ht.prototype, "_registries", 2);
Mt([
  w()
], ht.prototype, "_bundle", 2);
Mt([
  w()
], ht.prototype, "_brightnessIntent", 2);
Mt([
  w()
], ht.prototype, "_speedIntent", 2);
Mt([
  w()
], ht.prototype, "_intensityIntent", 2);
Mt([
  w()
], ht.prototype, "_actionError", 2);
ht = Mt([
  S("component-wled-controller-v1")
], ht);
R({
  type: "component-wled-controller-v1",
  element: ht,
  name: "WLED Controller V1",
  description: "Minimal WLED control with advanced settings sheet."
});
const Go = [
  T,
  H,
  bt,
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
var Ko = Object.defineProperty, Yo = Object.getOwnPropertyDescriptor, Es = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Yo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && Ko(e, i, s), s;
};
let oe = class extends E {
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
      const r = await Ei(
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
    ) : e, r = i.filter((n) => n.online).length, s = this._model?.error ? "Unavailable" : `${r}/${i.length} online`, a = this._model?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : this._model?.error ? this._model.error.message || "Camera discovery is unavailable" : "No cameras available";
    return o`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <h2>${this.esc(this._config.title || "Camera wall")}</h2>
            <span class="meta">${this.esc(s)}</span>
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
                            @click=${(m) => this._requestViewer(n, m.currentTarget)}
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
                              @click=${(m) => this._requestViewer(n, m.currentTarget)}
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
                              @click=${(m) => this._requestControls(n, m.currentTarget)}
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
oe.stubConfig = { profile: "household-security", columns: 2 };
oe.styles = Go;
Es([
  w()
], oe.prototype, "_model", 2);
oe = Es([
  S("component-security-camera-wall-v3")
], oe);
R({
  type: "component-security-camera-wall-v3",
  element: oe,
  name: "Security Camera Wall V3",
  description: "Snapshot-first, lazy live camera wall with capability-driven controls."
});
const Qo = [
  T,
  H,
  j,
  pt,
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
var Zo = Object.defineProperty, Jo = Object.getOwnPropertyDescriptor, Ds = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Jo(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && Zo(e, i, s), s;
};
let ce = class extends E {
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
      const r = await Ei(
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
        A(e, {
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
ce.stubConfig = { profile: "household-security" };
ce.styles = Qo;
Ds([
  w()
], ce.prototype, "_model", 2);
ce = Ds([
  S("component-security-entry-points-v1")
], ce);
R({
  type: "component-security-entry-points-v1",
  element: ce,
  name: "Security Entry Points V1",
  description: "Capability-driven garage, door, window and lock status using the shared garage controller where available."
});
const Xo = [
  T,
  H,
  W,
  j,
  Q,
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
var tc = Object.defineProperty, ec = Object.getOwnPropertyDescriptor, Ts = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ec(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && tc(e, i, s), s;
};
let le = class extends E {
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
      const r = await Ei(
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
        A(e, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    });
  }
  render() {
    if (!this._config) return o``;
    const t = this._model, e = t?.error || t?.profileError, i = !e && !!t?.allClear, r = this._config.title || "Security", s = t?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : e ? e.message || "Security status is unavailable" : i ? "All clear" : `${t?.attention?.length || 0} item${(t?.attention?.length || 0) === 1 ? "" : "s"} need attention`, a = e ? "Unavailable" : `${t?.onlineCameras || 0}/${t?.cameras?.length || 0} cameras online`, n = (t?.attention || []).slice(0, 4);
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
le.stubConfig = { profile: "household-security" };
le.styles = Xo;
Ts([
  w()
], le.prototype, "_model", 2);
le = Ts([
  S("component-security-summary-v1")
], le);
R({
  type: "component-security-summary-v1",
  element: le,
  name: "Security Summary V1",
  description: "Exception-first all-clear and attention summary discovered from Home Assistant capabilities."
});
const ic = [
  T,
  H,
  W,
  bt,
  sr,
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
var rc = Object.defineProperty, sc = Object.getOwnPropertyDescriptor, Ps = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? sc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && rc(e, i, s), s;
};
let de = class extends E {
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
      A(e, {
        primary: () => this._shift(-1),
        repeat: t,
        feedback: !0
      })
    ), i && this._interactionHandles.push(
      A(i, {
        primary: () => this._shift(1),
        repeat: t,
        feedback: !0
      })
    ), r && this._interactionHandles.push(
      A(r, {
        primary: () => this._setDay(B.today(this.hass)),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._isToday(), e = B.today(this.hass), i = _i(this.hass, this._selected, {
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
de.stubConfig = { channel: "energy-day" };
de.styles = ic;
Ps([
  w()
], de.prototype, "_selected", 2);
de = Ps([
  S("component-energy-day-selector-v1")
], de);
R({
  type: "component-energy-day-selector-v1",
  element: de,
  name: "Energy Day Selector",
  description: "Stable selected-day control shared by every Energy card."
});
const ac = [
  T,
  H,
  sr,
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
var nc = Object.defineProperty, oc = Object.getOwnPropertyDescriptor, zi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? oc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && nc(e, i, s), s;
};
const cc = {
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
let Ht = class extends E {
  constructor() {
    super(...arguments), this._series = {}, this._loading = !1, this._selectedDay = null, this._start = 0, this._end = 0, this._lastRangeKey = null, this._forceRefresh = !1, this._fetchSequence = 0, this._dayUnsubscribe = null, this._energyUnsubscribe = null, this._energyHass = null, this._energyProfile = "", this._energyDay = "", this._pinned = !1, this._pointerState = null, this._resizeObserver = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === this._config?.profile && (this.hass && this._config?.profile && Jt.invalidateProfile(this.hass, this._config.profile), this._forceRefresh = !0, this._lastRangeKey = null, this._fetchData());
    }, this._outsideListener = (t) => {
      this._pinned && !t.composedPath?.().includes(this) && (this._pinned = !1);
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = { ...cc, ...t || {} };
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
    this._energyUnsubscribe && this._energyHass === e && this._energyProfile === i && this._energyDay === t.day || (this._energyUnsubscribe?.(), this._energyHass = e, this._energyProfile = i, this._energyDay = t.day, this._energyUnsubscribe = Jt.subscribe(
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
      const r = B.today(this.hass), s = this._selectedDay && this._selectedDay <= r ? this._selectedDay : r, a = Jr(this.hass, s), n = a?.start ?? Date.now() - 864e5, c = a?.end ?? Date.now();
      return { start: n, end: c, day: s, isToday: s === r };
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
    const i = ++this._fetchSequence, r = this.hass, s = this._config.profile;
    this._loading = !0;
    const a = this._forceRefresh;
    this._forceRefresh = !1;
    try {
      if (s) {
        const n = await Jt.get(r, s, t.day, {
          force: a
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
    const s = [];
    let a = "", n = null, c = [];
    const l = () => {
      if (!c.length) return;
      const d = c.map(
        (f, m) => `${m ? "L" : "M"}${e(f.t).toFixed(1)},${i(f.v).toFixed(1)}`
      ).join(" ");
      if (s.push(d), r !== null) {
        const f = c[0], m = c[c.length - 1];
        a += `${d} L${e(m.t).toFixed(1)},${r.toFixed(1)} L${e(f.t).toFixed(1)},${r.toFixed(1)} Z `;
      }
      c = [];
    };
    for (const d of t || [])
      n !== null && d.t - n > 15 * 6e4 && l(), c.push(d), n = d.t;
    return l(), { line: s.join(" "), fill: a.trim() };
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const r = this.renderRoot.querySelector(e);
      r && i && this._interactionHandles.push(
        A(r, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house-key", this._config?.house_entity), t(".solar-key", this._config?.solar_entity), t(".grid-key", this._config?.grid_entity);
  }
  render() {
    if (!this._config) return o``;
    const t = (this._series.house?.length || 0) > 0 || (this._series.solar?.length || 0) > 0 || (this._series.grid?.length || 0) > 0, e = this._config.calendar_day ? this._selectedDay === B.today(this.hass) ? "Today" : _i(this.hass, this._selectedDay || "", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }) : null, i = e ? `${e} · ${this._config.bucket_minutes || 10}-minute average` : `${this._config.bucket_minutes || 10}-minute average`, r = 800, s = 420, a = 58, n = 8, c = 6, l = Math.round(s * 0.7), d = l + 20, f = d + 18, m = s - 18, b = a, u = r - n, h = this._start || Date.now() - 864e5, _ = this._end || Date.now(), p = (L) => b + (L - h) / (_ - h) * (u - b), g = [
      ...this._series.house || [],
      ...this._series.solar || []
    ].map((L) => Math.max(0, L.v)), C = this._niceMax(Math.max(1, ...g) * 1.06), v = (L) => l - Math.max(0, L) / C * (l - c), k = Math.max(
      100,
      ...(this._series.grid || []).map((L) => Math.abs(L.v))
    ), N = this._niceMax(k * 1.08), M = (f + m) / 2, q = (L) => M - L / N * ((m - f) / 2), x = this._paths(this._series.house, p, v), P = this._paths(this._series.solar, p, v, l), U = this._paths(this._series.grid, p, q);
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
              @pointerdown=${(L) => {
      this._pointerState = {
        id: L.pointerId,
        x: L.clientX,
        y: L.clientY,
        moved: !1
      };
    }}
              @pointermove=${(L) => {
      this._pointerState && Math.hypot(
        L.clientX - this._pointerState.x,
        L.clientY - this._pointerState.y
      ) > 6 && (this._pointerState.moved = !0);
    }}
              @pointerup=${() => {
      this._pointerState = null;
    }}
            >
              ${[0, 1, 2, 3, 4].map((L) => {
      const K = C * (1 - L / 4), Y = c + (l - c) * (L / 4);
      return o`
                  <line
                    class="gridline"
                    x1="${b}"
                    y1="${Y}"
                    x2="${u}"
                    y2="${Y}"
                  ></line>
                  <text
                    class="axis"
                    x="${b - 8}"
                    y="${Y + 4}"
                    text-anchor="end"
                  >
                    ${mt(this.hass, K)}
                  </text>
                `;
    })}
              ${[0, 1, 2, 3, 4, 5, 6].map((L) => {
      const K = h + (_ - h) * L / 6, Y = p(K), Ut = new Date(K).getMinutes() === 0 ? Xe(this.hass, K, { minute: void 0 }) : Xe(this.hass, K);
      return o`
                  <text
                    class="axis"
                    x="${Y}"
                    y="${d}"
                    text-anchor="${L === 0 ? "start" : L === 6 ? "end" : "middle"}"
                  >
                    ${Ut}
                  </text>
                `;
    })}

              <line
                class="zero"
                x1="${b}"
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
                y="${m - 3}"
                text-anchor="end"
              >
                Export
              </text>

              ${P.fill ? o`<path class="solar-fill" d="${P.fill}"></path>` : ""}
              ${P.line ? o`<path class="solar-line" d="${P.line}"></path>` : ""}
              ${x.line ? o`<path class="house-line" d="${x.line}"></path>` : ""}
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
Ht.styles = ac;
zi([
  w()
], Ht.prototype, "_series", 2);
zi([
  w()
], Ht.prototype, "_loading", 2);
zi([
  w()
], Ht.prototype, "_selectedDay", 2);
Ht = zi([
  S("energy-history-card-v3")
], Ht);
R({
  type: "energy-history-card-v3",
  element: Ht,
  name: "Energy History",
  description: "Dense readable power history supporting rolling or local calendar-day ranges using completed 10-minute averages and a signed grid strip."
});
const lc = [
  T,
  H,
  bt,
  Q,
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
var dc = Object.defineProperty, hc = Object.getOwnPropertyDescriptor, Ue = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? hc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && dc(e, i, s), s;
};
let gt = class extends E {
  constructor() {
    super(...arguments), this._data = null, this._error = null, this._loading = !1, this._day = B.today(), this._sequence = 0, this._dayUnsub = null, this._dataUnsub = null, this._dataHass = null, this._dataProfile = "", this._dataDay = "", this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === (this._config?.profile || "household-energy") && (this.hass && Jt.invalidateProfile(
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
    this._dataUnsub && this._dataHass === t && this._dataProfile === e && this._dataDay === this._day || (this._dataUnsub?.(), this._dataHass = t, this._dataProfile = e, this._dataDay = this._day, this._dataUnsub = Jt.subscribe(
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
    const e = ++this._sequence, i = this.hass, r = this._config.profile || "household-energy", s = this._day;
    this._loading = !0, this._error = null;
    try {
      const a = await Jt.get(i, r, s, { force: t });
      e === this._sequence && i === this.hass && s === this._day && (this._data = a);
    } catch (a) {
      e === this._sequence && i === this.hass && s === this._day && (this._error = a);
    } finally {
      e === this._sequence && i === this.hass && s === this._day && (this._loading = !1);
    }
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const r = this.renderRoot.querySelector(e);
      r && this._interactionHandles.push(
        A(r, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house", "sensor.ha_component_house_power"), t(".solar", "sensor.ha_component_solar_power"), t(".grid", "sensor.ha_component_grid_power");
  }
  render() {
    if (!this._config) return o``;
    const t = this._data, e = this._day === B.today(this.hass), i = e ? "Today" : _i(this.hass, this._day, {
      weekday: "short",
      day: "numeric",
      month: "short"
    }), r = t?.grid_w == null ? Number.NaN : Number(t.grid_w), s = Number.isFinite(r) ? r > 15 ? "Importing now" : r < -15 ? "Exporting now" : "Grid balanced" : "Grid unavailable", a = Number(t?.coverage), n = this._error ? /unknown energy profile/i.test(this._error.message || "") ? `Configure ${this._config.profile || "household-energy"} in HA Component Backend` : this._error.message || "Energy data is unavailable" : this._loading ? this._data ? "Updating…" : "Loading Energy data…" : t?.stale ? "Showing the last successful update" : Number.isFinite(a) && a < 1 ? `${Math.round(a * 100)}% of source data available` : "";
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
              aria-label="House power now: ${mt(this.hass, t?.house_w)}"
            >
              <span class="value"
                >${mt(this.hass, t?.house_w)}</span
              >
              <span class="label">House now</span>
            </button>
            <button
              class="metric solar"
              type="button"
              aria-label="Solar power now: ${mt(this.hass, t?.solar_w)}"
            >
              <span class="value"
                >${mt(this.hass, t?.solar_w)}</span
              >
              <span class="label">Solar now</span>
            </button>
            <button
              class="metric grid"
              type="button"
              aria-label="Grid power now: ${mt(this.hass, t?.grid_w, { absolute: !0 })}, ${s}"
            >
              <span class="value"
                >${mt(this.hass, t?.grid_w, { absolute: !0 })}</span
              >
              <span class="label">${this.esc(s)}</span>
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
gt.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
gt.styles = lc;
Ue([
  w()
], gt.prototype, "_data", 2);
Ue([
  w()
], gt.prototype, "_error", 2);
Ue([
  w()
], gt.prototype, "_loading", 2);
Ue([
  w()
], gt.prototype, "_day", 2);
gt = Ue([
  S("component-energy-summary-v1")
], gt);
R({
  type: "component-energy-summary-v1",
  element: gt,
  name: "Energy Summary V1",
  description: "Stable backend-driven live power and selected-day Energy totals."
});
const pc = [
  T,
  H,
  sr,
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
var uc = Object.defineProperty, mc = Object.getOwnPropertyDescriptor, mr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? mc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && uc(e, i, s), s;
};
const fc = {
  type: "custom:component-history-graph-v2",
  meta_text: "Aggregation label",
  series_1_label: "Primary series",
  series_2_label: "Secondary series",
  series_3_label: "Supporting series",
  positive_label: "Positive",
  negative_label: "Negative"
};
let he = class extends E {
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
    super.setConfig({ ...fc, ...t });
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
    const i = e.getBoundingClientRect(), r = Math.max(320, Math.round(i.width || 800)), s = r < 520 ? 48 : 58, a = 8, n = s, c = r - a, l = (t.clientX - i.left) * (r / i.width), d = Math.max(n, Math.min(c, l)), f = (d - n) / (c - n), m = Math.round(f * 100), b = [
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
      percent: `${m}% through range`,
      rows: b.map(([, u, h]) => ({
        label: String(u),
        value: String(h)
      })),
      x: d / r * i.width,
      y: Math.max(70, i.height * 0.42)
    };
  }
  render() {
    if (!this._config) return o``;
    const t = 800, e = 420, i = 58, r = 8, s = 6, a = Math.round(e * 0.7), n = a + 20, c = n + 18, l = e - 18, d = i, f = t - r, m = f - d, b = a - s, u = (c + l) / 2, h = (k, N) => `${(d + m * k).toFixed(1)},${(s + b * N).toFixed(1)}`, _ = (k, N) => `${(d + m * k).toFixed(1)},${(u + (l - c) * 0.32 * N).toFixed(1)}`, p = `M${h(0, 0.68)} L${h(0.08, 0.61)} L${h(0.17, 0.7)} L${h(0.26, 0.38)} L${h(0.35, 0.52)} L${h(0.44, 0.24)} L${h(0.53, 0.43)} L${h(0.62, 0.35)} L${h(0.72, 0.63)} L${h(0.82, 0.48)} L${h(0.91, 0.59)} L${h(1, 0.44)}`, g = `M${h(0, 0.86)} L${h(0.12, 0.75)} L${h(0.24, 0.52)} L${h(0.36, 0.42)} L${h(0.48, 0.55)} L${h(0.6, 0.72)} L${h(0.72, 0.82)} L${h(0.84, 0.91)} L${h(1, 0.94)}`, C = `M${_(0, 0.08)} L${_(0.1, -0.1)} L${_(0.2, 0.12)} L${_(0.3, -0.2)} L${_(0.4, 0.02)} L${_(0.5, -0.35)} L${_(0.6, 0.16)} L${_(0.7, 0.28)} L${_(0.8, -0.12)} L${_(0.9, 0.05)} L${_(1, -0.08)}`, v = `${g} L${f},${a} L${d},${a} Z`;
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
              @pointerdown=${(k) => {
      this._pointerState = {
        id: k.pointerId,
        x: k.clientX,
        y: k.clientY,
        moved: !1
      }, this._handlePointer(k);
    }}
              @pointermove=${(k) => {
      if (this._pointerState?.id === k.pointerId) {
        Math.hypot(
          k.clientX - this._pointerState.x,
          k.clientY - this._pointerState.y
        ) > 6 && (this._pointerState.moved = !0), this._handlePointer(k);
        return;
      }
      !this._pinned && k.pointerType !== "touch" && this._handlePointer(k);
    }}
              @pointerup=${(k) => {
      const N = this._pointerState;
      !N || N.id !== k.pointerId || (this._pointerState = null, N.moved ? (this._pinned = !1, k.pointerType === "touch" && this._hideTip()) : this._pinned ? (this._pinned = !1, this._hideTip()) : (this._handlePointer(k), this._pinned = !0));
    }}
              @pointerleave=${() => {
      !this._pinned && !this._pointerState && this._hideTip();
    }}
            >
              ${["Max", "75%", "50%", "25%", "0"].map((k, N) => {
      const M = s + b * N / 4;
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
                    >${k}</text
                  >
                `;
    })}
              ${["Start", "¼", "½", "¾", "End"].map((k, N) => {
      const M = d + m * N / 4;
      return o`
                  <text
                    class="axis"
                    x="${M}"
                    y="${n}"
                    text-anchor="${N === 0 ? "start" : N === 4 ? "end" : "middle"}"
                  >
                    ${k}
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
                      <path class="l2" d="${g}"></path>
                    `}
              ${this._hiddenSeries.has(1) ? "" : o`<path class="l1" d="${p}"></path>`}
              ${this._hiddenSeries.has(3) ? "" : o`<path class="l3" d="${C}"></path>`}
              ${this._tooltip.show ? o`<line
                      class="cursor"
                      x1="${this._tooltip.x}"
                      y1="${s}"
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
      (k) => o`<div class="tooltip-row">
                    <span>${k.label}</span
                    ><b class="tooltip-val">${k.value}</b>
                  </div>`
    )}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
he.styles = pc;
mr([
  w()
], he.prototype, "_hiddenSeries", 2);
mr([
  w()
], he.prototype, "_tooltip", 2);
he = mr([
  S("component-history-graph-v2")
], he);
R({
  type: "component-history-graph-v2",
  element: he,
  name: "History Graph",
  description: "Reusable interactive history graph component."
});
const gc = [
  T,
  H,
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
var bc = Object.defineProperty, _c = Object.getOwnPropertyDescriptor, je = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? _c(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && bc(e, i, s), s;
};
const vc = {
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
let Ct = class extends E {
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
    if (super.setConfig({ ...vc, ...t }), this.isConnected && e !== this._config?.day_channel) {
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
    const t = Jr(this.hass, this._selectedDay);
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
      for (const a of t.change) {
        const c = (r?.[a] || []).filter((l) => {
          const d = typeof l.start == "number" ? l.start : Date.parse(l.start);
          return Number.isFinite(d) && d >= i.start && d < i.end;
        }).map((l) => Number(l.change)).filter(Number.isFinite);
        s[a] = {
          change: c.length ? c.reduce((l, d) => l + d, 0) : null
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
      return xt(this.hass, this._number(t.entity, "change"));
    if (e === "energy_kwh_day_sum") {
      if (!Array.isArray(t.entities) || !t.entities.length) return "—";
      let r = 0;
      for (const s of t.entities) {
        const a = this._number(s, "change");
        if (a === null) return "—";
        r += a;
      }
      return xt(this.hass, r);
    }
    if (e === "energy_kwh_day_formula") {
      if (!Array.isArray(t.terms) || !t.terms.length) return "—";
      let r = 0;
      for (const s of t.terms) {
        const a = this._number(s?.entity, "change");
        if (a === null) return "—";
        r += a * (Number.isFinite(Number(s.factor)) ? Number(s.factor) : 1);
      }
      return xt(this.hass, r);
    }
    if (["watts", "watts_abs"].includes(e))
      return mt(this.hass, this._liveNumber(t.entity), {
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
      A(t, {
        primary: () => this.moreInfo(i),
        feedback: !0
      })
    ), e && r && this._interactionHandles.push(
      A(e, {
        primary: () => this.moreInfo(r),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._resolve(this._config.left_value), e = this._resolve(this._config.left_label), i = this._resolve(this._config.right_value), r = this._resolve(this._config.right_label), s = this._resolve(this._config.right_primary), a = this._resolve(this._config.right_secondary), n = this._clickEntity("left"), c = this._clickEntity("right"), l = [e, t].filter(Boolean).join(": "), d = [i, r, s, a].filter(Boolean).join(" ");
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
              <span class="right-primary">${this.esc(s)}</span>
              <span class="right-secondary">${this.esc(a)}</span>
            </div>
          </button>
        </div>
      </ha-card>
    `;
  }
};
Ct.styles = gc;
je([
  w()
], Ct.prototype, "_selectedDay", 2);
je([
  w()
], Ct.prototype, "_stats", 2);
je([
  w()
], Ct.prototype, "_loading", 2);
je([
  w()
], Ct.prototype, "_error", 2);
Ct = je([
  S("metric-pair-card-v3")
], Ct);
R({
  type: "metric-pair-card-v3",
  element: Ct,
  name: "Metric Pair",
  description: "Live power metrics with selected-day energy totals."
});
const yc = [
  T,
  H,
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
var xc = Object.defineProperty, wc = Object.getOwnPropertyDescriptor, zs = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? wc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && xc(e, i, s), s;
};
const $c = {
  type: "custom:solar-daylight-card-v7",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let ze = class extends E {
  constructor() {
    super(...arguments), this._forecast = [], this._lastFetch = 0, this._pending = !1, this._failures = 0, this._retryAt = 0, this._interactionHandle = null;
  }
  setConfig(t) {
    const e = this._config?.weather_entity;
    super.setConfig({ ...$c, ...t }), this._config?.weather_entity !== e && (this._forecast = [], this._lastFetch = 0), this._fetchForecast();
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
    return Number.isNaN(e.getTime()) ? "" : Xe(this.hass, e);
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
      const a = new Date(s.datetime || 0).getTime(), n = this._num(s.cloud_coverage);
      if (!Number.isFinite(a) || n === null) continue;
      const c = Math.abs(a - e);
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
    t && (this._interactionHandle?.destroy(), this._interactionHandle = A(t, {
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
    let a = "Sun state unavailable", n = "";
    if (s)
      if (i?.state === "above_horizon") {
        const h = this._num(i.attributes?.elevation, 0), _ = this._time(i.attributes?.next_setting);
        a = `Sun ${Math.round(h || 0)}°`, n = _ ? `Sunset ${_}` : "Daylight";
      } else {
        const h = this._time(i?.attributes?.next_rising);
        a = "Night", n = h ? `Sunrise ${h}` : "Before sunrise";
      }
    const c = this._num(r?.attributes?.cloud_coverage), l = this._at(4), d = this._at(8), f = this._cloud(c), m = this._cloud(l), b = this._cloud(d), u = `${a}, cloud coverage ${f}, plus 4 hours ${m}, plus 8 hours ${b}, ${n}. Tap for sun details; hold for weather details.`;
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
              <span class="cloud-value plus4">${this.esc(m)}</span>
            </span>
            <span class="cloud-item">
              <span class="cloud-label">+8 Hours</span>
              <span class="cloud-value plus8">${this.esc(b)}</span>
            </span>
          </span>
          <span class="event">${this.esc(n)}</span>
        </button>
      </ha-card>
    `;
  }
};
ze.styles = yc;
zs([
  w()
], ze.prototype, "_forecast", 2);
ze = zs([
  S("solar-daylight-card-v7")
], ze);
R({
  type: "solar-daylight-card-v7",
  element: ze,
  name: "Solar Daylight Context",
  description: "Full-width sun context with centred current and forecast cloud coverage."
});
const Cc = [
  T,
  H,
  Q,
  W,
  j,
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
var kc = Object.defineProperty, Sc = Object.getOwnPropertyDescriptor, fr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Sc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && kc(e, i, s), s;
};
const ji = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
let Nt = class extends E {
  constructor() {
    super(...arguments), this._selected = [], this._registry = null, this._interactionHandles = [], this._unsubRegistry = null, this._registryHass = null;
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
    if (!t || ji.has(String(t).toLowerCase())) return null;
    try {
      return this._normaliseRef(JSON.parse(t));
    } catch {
      return null;
    }
  }
  _buildRegistryIndex(t) {
    const e = t.entities || [], i = t.devices || [], r = t.areas || [], s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
    for (const n of e) {
      const c = this._entryKey(n);
      c && s.set(c, n), n.device_id && (a.has(n.device_id) || a.set(n.device_id, []), a.get(n.device_id).push(n));
    }
    this._registry = {
      entities: e,
      devices: new Map(i.map((n) => [n.id, n])),
      areas: new Map(r.map((n) => [n.area_id, n.name])),
      byKey: s,
      byDevice: a
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
    const r = i.entry.entity_id, s = this._domain(r);
    if (["light", "switch", "fan", "input_boolean"].includes(s)) {
      if (!this.hass) return;
      await D(this.hass, {
        domain: "homeassistant",
        service: "toggle",
        target: { entity_id: r }
      });
    } else if (["automation", "script", "scene"].includes(s)) {
      const a = s === "automation" ? "trigger" : "turn_on";
      if (!this.hass) return;
      await D(this.hass, {
        domain: s,
        service: a,
        target: { entity_id: r }
      });
    } else if (["button", "input_button"].includes(s)) {
      if (!this.hass) return;
      await D(this.hass, {
        domain: s,
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
        A(e, {
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
                    <button
                      class="edit"
                      type="button"
                      aria-label="Edit favourites"
                    >
                      <ha-icon icon="mdi:pencil-outline"></ha-icon>
                      <span>Edit</span>
                    </button>
                  </div>
                ` : ""}

          <div class="grid">
            ${this._selected.length === 0 ? o`<div class="empty">
                    Add up to four everyday controls here.
                  </div>` : this._selected.map((e) => {
      const i = this._record(e), r = this._name(i), s = this._stateLabel(i), a = this._icon(i), n = this._isActive(i), c = !i.state || ji.has(String(i.state.state).toLowerCase());
      return o`
                      <div
                        class="item ${n ? "active" : ""} ${c ? "unavailable" : ""}"
                      >
                        <button
                          class="main"
                          type="button"
                          ?disabled=${c}
                          aria-label="${r}: ${s}"
                        >
                          <span class="icon">
                            <ha-icon icon="${a}"></ha-icon>
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
Nt.stubConfig = { helpers: [], max: 4, title: "Favourites" };
Nt.styles = Cc;
fr([
  w()
], Nt.prototype, "_selected", 2);
fr([
  w()
], Nt.prototype, "_registry", 2);
Nt = fr([
  S("component-favourites-v3")
], Nt);
R({
  type: "component-favourites-v3",
  element: Nt,
  name: "Favourites V3",
  description: "Stable household favourites with entity discovery and backend companion storage."
});
const Ac = [
  T,
  H,
  j,
  Q,
  bt,
  It,
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
var Ec = Object.defineProperty, Dc = Object.getOwnPropertyDescriptor, Os = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Dc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && Ec(e, i, s), s;
};
const Tc = {
  type: "custom:component-household-attention-v2",
  title: "Attention",
  icon: "mdi:alert-circle-outline",
  quiet_title: "Everything quiet",
  quiet_subtitle: "No security or hardware alerts",
  quiet_icon: "mdi:check-circle-outline"
};
let Oe = class extends E {
  constructor() {
    super(...arguments), this._registry = null, this._unsubRegistry = null, this._registryHass = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Tc, ...t }), this.hass && !this._config?.demo && this._loadRegistry();
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
      const r = e.entity_id.split(".")[0], s = e.device_class || i.attributes?.device_class || "";
      let a = null;
      e.entity_id.endsWith("_controller_status") && i.state === "off" ? a = {
        status: "Controller offline",
        severity: "critical",
        severity_text: "Critical",
        icon: "mdi:access-point-network-off"
      } : r === "binary_sensor" && i.state === "on" && ["smoke", "moisture", "gas"].includes(s) ? a = {
        status: "Detected",
        severity: "critical",
        severity_text: "Critical",
        icon: s === "smoke" ? "mdi:smoke-detector-alert" : s === "gas" ? "mdi:gas-cylinder" : "mdi:water-alert"
      } : r === "binary_sensor" && i.state === "on" && ["door", "window", "garage_door"].includes(s) ? a = {
        status: "Open",
        severity: "warning",
        severity_text: "Check",
        icon: s === "window" ? "mdi:window-open-variant" : s === "garage_door" ? "mdi:garage-open" : "mdi:door-open"
      } : r === "lock" && i.state === "unlocked" && (a = {
        status: "Unlocked",
        severity: "warning",
        severity_text: "Check",
        icon: "mdi:lock-open-variant-outline"
      }), a && t.push({
        entity_id: e.entity_id,
        name: kt({ entry: e, state: i }),
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
    t.forEach((i, r) => {
      const s = e[r];
      s && this._interactionHandles.push(
        A(i, {
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
Oe.styles = Ac;
Os([
  w()
], Oe.prototype, "_registry", 2);
Oe = Os([
  S("component-household-attention-v2")
], Oe);
R({
  type: "component-household-attention-v2",
  element: Oe,
  name: "Household Attention V2",
  description: "Aggregated safety and hardware attention queue."
});
const Pc = [
  T,
  H,
  j,
  Q,
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
var zc = Object.defineProperty, Oc = Object.getOwnPropertyDescriptor, Rs = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Oc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && zc(e, i, s), s;
};
const Rc = {
  type: "custom:component-household-directory-v3",
  pref_key: "home-control.household.v2",
  base_path: "/home-control",
  current_dashboard: "home-control",
  title: "Quick actions",
  icon: "mdi:gesture-tap-button",
  quick_action_label: "dashboard_quick_action"
}, Yr = {
  automation: "trigger",
  scene: "turn_on",
  script: "turn_on",
  button: "press",
  input_button: "press"
};
let Re = class extends E {
  constructor() {
    super(...arguments), this._registry = [], this._unsubRegistry = null, this._registryHass = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Rc, ...t }), this.hass && this._loadRegistry();
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
    const i = this._config?.quick_action_label || "dashboard_quick_action", r = this._registry.filter((s) => {
      if (s.disabled_by || s.hidden_by) return !1;
      const a = s.entity_id.split(".")[0];
      return !Object.prototype.hasOwnProperty.call(
        Yr,
        a
      ) && !(a === "todo") ? !1 : (Array.isArray(s.labels) ? s.labels : []).includes(i);
    });
    for (const s of r) {
      const a = this.hass.states[s.entity_id], n = s.entity_id.split(".")[0], c = a?.attributes?.friendly_name || s.name || s.original_name || s.entity_id, l = a?.attributes?.icon || s.icon || s.original_icon || "mdi:flash";
      n === "todo" ? t.push({
        id: s.entity_id,
        name: c.replace(/\s+List$/i, ""),
        icon: l,
        kind: "entity",
        entity: s.entity_id,
        meta: "To-do list"
      }) : t.push({
        id: s.entity_id,
        name: c,
        icon: l,
        kind: "action",
        entity: s.entity_id,
        domain: n,
        service: Yr[n],
        meta: "Quick action"
      });
    }
    return t;
  }
  async _runAction(t) {
    !this.hass || !t.domain || !t.service || !t.entity || await D(this.hass, {
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
      const s = e[r];
      if (!s) return;
      let a = null;
      s.kind === "nav" && s.path ? a = () => Zr(s.path) : s.kind === "action" ? a = () => this._runAction(s) : s.kind === "entity" && s.entity && (a = () => this.moreInfo(s.entity)), a && this._interactionHandles.push(
        A(i, {
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
Re.styles = Pc;
Rs([
  w()
], Re.prototype, "_registry", 2);
Re = Rs([
  S("component-household-directory-v3")
], Re);
R({
  type: "component-household-directory-v3",
  element: Re,
  name: "Household Directory V3",
  description: "Global views and label-driven quick actions directory."
});
const Hc = [
  T,
  H,
  W,
  fe,
  j,
  Q,
  It,
  os,
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
], Nc = [
  T,
  H,
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
var Lc = Object.defineProperty, Ic = Object.getOwnPropertyDescriptor, Oi = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Ic(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && Lc(e, i, s), s;
};
const Mc = {
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
let Lt = class extends E {
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
    super.setConfig({ ...Mc, ...t }), this._structureSig = "", this.hass && (this._config?.pref_key && this._loadPrefs(), this._loadRegistry(), this._syncCards());
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
    !this.hass || !this._config?.pref_key || (this._prefs = await vs(this.hass, this._config.pref_key), this._structureSig = "", this._syncCards());
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
      e.map((s) => [s.entityId, s.signature])
    );
    if (i === this._structureSig) {
      for (const s of this._cardElements.values())
        s.el.hass = this.hass;
      return;
    }
    const r = /* @__PURE__ */ new Map();
    for (const s of e) {
      const a = this._cardElements.get(s.entityId);
      if (a && a.sig === s.signature) {
        a.el.hass = this.hass, r.set(s.entityId, a);
        continue;
      }
      try {
        const n = await ws(s.cardConfig, this.hass);
        if (t !== this._gen) return;
        r.set(s.entityId, { el: n, sig: s.signature });
      } catch {
      }
    }
    t === this._gen && (this._cardElements = r, this._structureSig = i, this._renderedCards = e.map((s) => r.get(s.entityId)?.el).filter((s) => !!s), this.requestUpdate());
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
    this._prefs = e, await ys(this.hass, this._config.pref_key, e), this._structureSig = "", this._syncCards();
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
Lt.styles = Nc;
Oi([
  w()
], Lt.prototype, "_registry", 2);
Oi([
  w()
], Lt.prototype, "_prefs", 2);
Oi([
  w()
], Lt.prototype, "_renderedCards", 2);
Lt = Oi([
  S("component-smart-collection-v3")
], Lt);
R({
  type: "component-smart-collection-v3",
  element: Lt,
  name: "Smart Control Collection V3",
  description: "Stable registry-driven household controls without refresh teardown."
});
var qc = Object.defineProperty, Uc = Object.getOwnPropertyDescriptor, gr = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Uc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && qc(e, i, s), s;
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
let pe = class extends E {
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
    super.setConfig({ ...jc, ...t }), this._bindRegistry();
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
    return $s(t, this._registries, this.hass);
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
      const i = this._areaStatus(e), s = i.severity === "active" ? `. ${i.activeDeviceCount} active device${i.activeDeviceCount === 1 ? "" : "s"}` : "";
      return o`
              <button
                class="room ${i.severity}"
                type="button"
                style="--room-active-hue: ${this._activeHue(e.area_id)}"
                aria-label="Open ${e.name}${i.summary ? ". " + i.summary : ""}${s}"
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
pe.styles = Hc;
gr([
  w()
], pe.prototype, "_registries", 2);
gr([
  w()
], pe.prototype, "_activeArea", 2);
pe = gr([
  S("component-room-directory-v4")
], pe);
R({
  type: "component-room-directory-v4",
  element: pe,
  name: "Room Directory V4",
  description: "Stable registry-driven rooms with full-height swipeable room sheets."
});
const Bc = [
  T,
  H,
  W,
  nt,
  Q,
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
var Fc = Object.getOwnPropertyDescriptor, Vc = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Fc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
const Wc = {
  type: "custom:component-welcome-header-v1",
  weather_entity: "weather.forecast_home"
};
let gi = class extends E {
  constructor() {
    super(...arguments), this._cancelMinuteScheduler = null, this._interactionHandle = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (super.setConfig({ ...Wc, ...t }), !this._config?.weather_entity)
      throw new Error("weather_entity is required");
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = ua(
      () => this.requestUpdate()
    );
  }
  disconnectedCallback() {
    this._cancelMinuteScheduler?.(), this._cancelMinuteScheduler = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  _number(t, e = 0) {
    const i = Number(t);
    return Number.isFinite(i) ? ke(this.hass, i, {
      maximumFractionDigits: e,
      minimumFractionDigits: Number.isInteger(i) ? 0 : Math.min(1, e)
    }) : null;
  }
  updated() {
    const t = this.renderRoot.querySelector(".weather");
    t && (this._interactionHandle?.destroy(), this._interactionHandle = A(t, {
      primary: () => {
        this._config?.weather_entity && this.moreInfo(this._config.weather_entity);
      },
      feedback: !0
    }));
  }
  render() {
    if (!this._config) return o``;
    const t = /* @__PURE__ */ new Date(), i = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, r = Yi(this.hass), s = Ki(this.hass), a = this._number(i.temperature, 1), n = this._number(i.cloud_coverage, 0), c = a === null ? "—" : `${a}${i.temperature_unit || "°C"}`, l = n === null ? "Cloud —" : `Cloud ${n}%`, d = new Intl.DateTimeFormat(s, {
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
gi.styles = Bc;
gi = Vc([
  S("component-welcome-header-v1")
], gi);
R({
  type: "component-welcome-header-v1",
  element: gi,
  name: "Welcome Header",
  description: "Compact live weather and home-time header."
});
const Gc = [
  T,
  Q,
  H,
  bt,
  j,
  nt,
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
var Kc = Object.defineProperty, Yc = Object.getOwnPropertyDescriptor, br = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Yc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && Kc(e, i, s), s;
};
let He = class extends wt {
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
    ft(this, "config-changed", { config: this._config });
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
He.styles = [cs];
br([
  me({ attribute: !1 })
], He.prototype, "hass", 2);
br([
  w()
], He.prototype, "_config", 2);
He = br([
  S("ha-action-tile-editor")
], He);
var Qc = Object.getOwnPropertyDescriptor, Zc = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Qc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
let Fi = class extends ki {
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
    if (!this.hass || !this.config || Z(this.hass.states[this.config.entity])) return;
    const t = this.config.tap_action || { action: "toggle" };
    Ci(this, this.hass, t, this.config.entity);
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
    if (t?.attributes?.brightness !== void 0 && ee(t)) {
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
    const e = lt(this.config.entity), i = Z(t), r = !i && ee(t), s = this.config.name || $i(t), a = this.config.icon || t.attributes.icon || ge(e, t.state), n = i ? "Unavailable" : X(t, this.hass), c = this.config.color || "#03a9f4";
    return o`
      <ha-card
        class="interactive surface-card tile-card ${r ? "active" : ""} ${i ? "unavailable" : ""}"
        style=${r ? `--tile-active-color: ${c};` : ""}
        role="button"
        tabindex="${i ? "-1" : "0"}"
        aria-pressed="${String(r)}"
        aria-disabled="${String(i)}"
        aria-label="${s}: ${n}"
        @click=${this._handleTileTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="header-row tile-row">
          <div class="icon-well control-radius ${r ? "active" : ""}">
            <ha-icon .icon=${a}></ha-icon>
          </div>
          <div class="copy-block">
            <div class="label-title" title=${s}>${s}</div>
            <div class="label-sub">${n}</div>
          </div>
          ${this._renderBadge()}
        </div>
      </ha-card>
    `;
  }
};
Fi.styles = Gc;
Fi = Zc([
  S("ha-action-tile")
], Fi);
const Jc = [
  T,
  Q,
  H,
  j,
  nt,
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
var Xc = Object.getOwnPropertyDescriptor, tl = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Xc(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
let Vi = class extends ki {
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
    Ci(this, this.hass, t, this.config.entity);
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
    const e = lt(this.config.entity), i = Z(t), r = this.config.name || $i(t), s = this.config.icon || t.attributes.icon || ge(e, t.state), a = i ? NaN : parseFloat(t.state), n = !isNaN(a), c = n ? this._computeColor(a) : i ? "var(--secondary-text-color, #757575)" : "var(--primary-color, #03a9f4)", l = i ? "" : this.config.unit || t.attributes.unit_of_measurement || "", d = i ? "Unavailable" : n ? a : t.state;
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
            <ha-icon .icon=${s}></ha-icon>
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
Vi.styles = Jc;
Vi = tl([
  S("ha-metric-badge")
], Vi);
const el = [
  T,
  H,
  bt,
  W,
  pt,
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
var il = Object.getOwnPropertyDescriptor, rl = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? il(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
let Wi = class extends ki {
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
    Ci(this, this.hass, e, t.entity);
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
      r && !Z(r) && ee(r) && e++;
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
      const r = this.hass?.states[i.entity], s = Z(r), a = !s && ee(r), n = lt(i.entity), c = i.name || $i(r), l = i.icon || r?.attributes?.icon || ge(n, r?.state), d = s ? "Unavailable" : X(r, this.hass);
      return o`
              <button
                class="btn-action-pill quick-item ${a ? "active" : ""}"
                type="button"
                role="button"
                tabindex="${s ? "-1" : "0"}"
                aria-pressed="${String(a)}"
                ?disabled=${s}
                aria-disabled="${String(s)}"
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
Wi.styles = el;
Wi = rl([
  S("ha-quick-bar")
], Wi);
const sl = [
  T,
  H,
  Me,
  j,
  nt,
  pt,
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
var al = Object.defineProperty, nl = Object.getOwnPropertyDescriptor, _r = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? nl(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = (r ? n(e, i, s) : n(s)) || s);
  return r && s && al(e, i, s), s;
};
let Ne = class extends wt {
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
    ft(this, "config-changed", { config: this._config });
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
Ne.styles = [
  cs,
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
_r([
  me({ attribute: !1 })
], Ne.prototype, "hass", 2);
_r([
  w()
], Ne.prototype, "_config", 2);
Ne = _r([
  S("ha-status-card-editor")
], Ne);
var ol = Object.getOwnPropertyDescriptor, cl = (t, e, i, r) => {
  for (var s = r > 1 ? void 0 : r ? ol(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (s = n(s) || s);
  return s;
};
let Gi = class extends ki {
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
    if (!this.hass || !this.config || Z(this.hass.states[this.config.entity])) return;
    const t = this.config.tap_action || { action: "more-info" };
    Ci(this, this.hass, t, this.config.entity);
  }
  _handleKeyDown(t) {
    !this.hass || !this.config || Z(this.hass.states[this.config.entity]) || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._handleTap());
  }
  async _handleToggle(t) {
    if (t.stopPropagation(), t.preventDefault(), !this.hass || !this.config?.entity) return;
    const e = this.hass.states[this.config.entity];
    if (Z(e)) return;
    const i = lt(this.config.entity), r = i === "lock" ? e.state === "locked" || e.state === "locking" ? "unlock" : "lock" : "toggle";
    await D(this.hass, {
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
    const e = lt(this.config.entity), i = Z(t), r = !i && ee(t), s = this.config.name || $i(t), a = this.config.icon || t.attributes.icon || ge(e, t.state), n = i ? "Unavailable" : X(t, this.hass), c = this._getSecondaryText(t, i), l = this.config.show_toggle !== !1 && ["light", "switch", "input_boolean", "fan", "lock"].includes(e), d = i ? "state-unavailable" : r ? "state-active" : "state-inactive";
    return o`
      <ha-card
        class="interactive status-card assembled-card ${i ? "unavailable" : ""}"
        role="button"
        tabindex="${i ? "-1" : "0"}"
        aria-disabled="${String(i)}"
        aria-label="${s}: ${n}"
        @click=${this._handleTap}
        @keydown=${this._handleKeyDown}
      >
        <div class="header-row ${d}">
          <div class="icon-well control-radius ${r ? "active" : ""}">
            ${this._renderIcon(a)}
          </div>

          <div class="copy-block">
            <div class="label-title" title=${s}>${s}</div>
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
                    aria-label="Toggle ${s}"
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
Gi.styles = sl;
Gi = cl([
  S("ha-status-card")
], Gi);
console.info(
  "%c HA-COMPONENT-LIBRARY %c 1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #03a9f4; background: #e1f5fe; font-weight: 700; border-radius: 0 3px 3px 0;"
);
export {
  ii as ComponentActionV2,
  Rt as ComponentAppleTvControllerV1,
  dt as ComponentCameraControllerV2,
  ri as ComponentContextStripV3,
  ie as ComponentControlRowV2,
  re as ComponentDeviceAwareAutoEntitiesV1,
  se as ComponentDeviceDiscoveryV2,
  si as ComponentEmptyStateV3,
  de as ComponentEnergyDaySelectorV1,
  gt as ComponentEnergySummaryV1,
  Nt as ComponentFavouritesV3,
  $t as ComponentGarageDoorControllerV1,
  he as ComponentHistoryGraphV2,
  Oe as ComponentHouseholdAttentionV2,
  Re as ComponentHouseholdDirectoryV3,
  ai as ComponentListV2,
  zt as ComponentMediaRowV2,
  Ct as ComponentMetricPairCardV3,
  ui as ComponentNavigationTileV2,
  ni as ComponentNoticeV2,
  oi as ComponentProgressV2,
  mi as ComponentQuickNavigationV2,
  pe as ComponentRoomDirectoryV4,
  Pe as ComponentRoomNavigationV1,
  fi as ComponentRoomSheetV2,
  ci as ComponentSectionSeparatorV2,
  oe as ComponentSecurityCameraWallV3,
  ce as ComponentSecurityEntryPointsV1,
  le as ComponentSecuritySummaryV1,
  li as ComponentSingleKpiV2,
  Lt as ComponentSmartCollectionV3,
  ne as ComponentSplitControllerV4,
  di as ComponentStatusRowV2,
  hi as ComponentTextEffectV1,
  pi as ComponentThreeStatV2,
  Ot as ComponentUpdateRowV3,
  ae as ComponentUpdateSummaryV3,
  gi as ComponentWelcomeHeaderV1,
  ht as ComponentWledControllerV1,
  ba as DASHBOARD_BASE_CARD_STYLES,
  wi as DASHBOARD_SHARED_STYLE_CSS,
  gl as DASHBOARD_SHARED_STYLE_ID,
  Ia as DashboardRegistryCoordinator,
  Ht as EnergyHistoryCardV3,
  as as GLOBAL_THEME_CSS,
  ma as GLOBAL_THEME_STYLE_ID,
  Fi as HaActionTile,
  ki as HaBaseCard,
  Pt as HaComponentLibraryConfigEditor,
  Vi as HaMetricBadge,
  Wi as HaQuickBar,
  Gi as HaStatusCard,
  it as HomeAssistantActionError,
  jt as INTERACTION_DEFAULTS,
  E as LitBaseCard,
  ga as PRESENTATIONAL_CARD_STYLES,
  ze as SolarDaylightCardV7,
  _a as UPDATE_CARD_STYLES,
  Ui as WLED_DOMAIN,
  Vr as WLED_INVALID,
  ks as WLED_NAME,
  Qa as actionCardStyles,
  Ke as actionRole,
  Gc as actionTileCardStyles,
  fs as appleTvBundle,
  Eo as appleTvCardStyles,
  xs as applyPrefs,
  Zt as areaOf,
  pt as assemblyStyles,
  bt as badgeProgressStyles,
  W as buttonStyles,
  Jr as calendarDayRange,
  Oo as cameraCardStyles,
  T as cardBaseStyles,
  G as centralRegistry,
  xl as commonCardStyles,
  $s as computeAreaStatusSummary,
  lt as computeDomain,
  kt as computeEntityDisplayName,
  $i as computeEntityName,
  ka as computeMetricSeverity,
  cr as connectionId,
  tn as contextStripCardStyles,
  ja as controlConfig,
  gs as controlDomains,
  Ce as controlResolvers,
  io as controlRowCardStyles,
  Me as controlStyles,
  ss as createAsyncBroker,
  ws as createCardElement,
  pa as createLifecycle,
  ua as createMinuteScheduler,
  ir as createRequestCoalescer,
  vl as dashboardBaseCardStyles,
  Wa as dashboardProfiles,
  _l as dashboardTokens,
  Te as dayKey,
  ye as dayKeyInZone,
  _s as defaultControlConfig,
  ho as deviceAwareAutoEntitiesCardStyles,
  fo as deviceDiscoveryCardStyles,
  It as dialogStyles,
  Bi as discoverControls,
  O as domainOf,
  an as emptyStateCardStyles,
  Jt as energyDayData,
  ic as energyDaySelectorCardStyles,
  B as energyDayState,
  ac as energyHistoryCardStyles,
  lc as energySummaryCardStyles,
  ha as ensureInteractionFeedback,
  wl as entityRowPrimitiveStyles,
  $e as entryFilters,
  I as escapeHtml,
  Cc as favouritesCardStyles,
  rr as feedbackStyles,
  ft as fireEvent,
  os as formControlStyles,
  _i as formatCalendarDay,
  bi as formatDate,
  xt as formatEnergy,
  X as formatEntityState,
  mt as formatPower,
  Xe as formatTime,
  ms as garageControl,
  No as garageDoorCardStyles,
  ge as getDefaultIconForDomain,
  ns as globalTokens,
  Ci as handleAction,
  ul as headerStyles,
  Pl as healthAwareRegistryLoad,
  pc as historyGraphCardStyles,
  Ac as householdAttentionCardStyles,
  Pc as householdDirectoryCardStyles,
  fl as iconBoxStyles,
  fe as iconButtonStyles,
  j as iconWellStyles,
  Ya as initWledIntegration,
  bl as injectDashboardTokens,
  pl as injectGlobalTokens,
  oa as installConfigContract,
  A as interaction,
  ca as interactionStyles,
  Ua as isActive,
  Ta as isControlActive,
  or as isDiagnosticOrPeripheral,
  ee as isEntityActive,
  yt as isEntityAvailable,
  Z as isEntityUnavailable,
  ps as isPeripheralEntity,
  qa as isPotential,
  Hr as isPrimaryControl,
  El as isSensorMetric,
  ln as listCardStyles,
  Tl as loadDashboardRegistries,
  vs as loadPrefs,
  Ei as loadSecurityModel,
  Ki as localeOf,
  no as mediaRowCardStyles,
  Jc as metricBadgeCardStyles,
  gc as metricPairCardStyles,
  Cl as metricPrimitiveStyles,
  us as nativeClimateControlConfig,
  qn as navTileCardStyles,
  Zr as navigateTo,
  Sl as navigationPrimitiveStyles,
  un as noticeCardStyles,
  ke as numberFormat,
  Hs as openMoreInfo,
  hl as prefersReducedMotion,
  va as presentationalCardStyles,
  bn as progressCardStyles,
  Ga as ptzRole,
  el as quickBarCardStyles,
  Fn as quickNavCardStyles,
  R as registerCard,
  bs as registerControlResolver,
  Dl as registerDeviceResolver,
  hs as registerEntryFilter,
  fa as remoteStyles,
  $l as renderEntityRow,
  kl as renderMetric,
  Al as renderNavigationItem,
  Ir as resolveDeviceCard,
  Hc as roomDirectoryCardStyles,
  Kn as roomNavigationCardStyles,
  Jn as roomSheetCardStyles,
  nt as rowListStyles,
  ml as rowStyles,
  D as runServiceAction,
  ys as savePrefs,
  xn as sectionSeparatorCardStyles,
  Go as securityCameraWallCardStyles,
  Ai as securityCapabilityText,
  Ge as securityEntityLabel,
  Qo as securityEntryPointsCardStyles,
  Ka as securityModel,
  Xo as securitySummaryCardStyles,
  xi as separatorStyles,
  Cn as singleKpiCardStyles,
  Nc as smartCollectionCardStyles,
  yc as solarDaylightCardStyles,
  Mo as splitAcCardStyles,
  Ft as splitIdentity,
  at as stateNameOf,
  sl as statusCardCardStyles,
  En as statusRowCardStyles,
  Q as surfaceStyles,
  Fr as switchRole,
  sr as telemetryStyles,
  zn as textEffectCardStyles,
  Nn as threeStatCardStyles,
  Yi as timeZoneOf,
  Qr as toText,
  H as typographyStyles,
  Si as uiEntry,
  yl as updateCardStyles,
  yo as updateRowCardStyles,
  Co as updateSummaryCardStyles,
  Cs as validDay,
  De as waitForEntityState,
  Bc as welcomeHeaderCardStyles,
  Fo as wledCardStyles
};
