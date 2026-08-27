const Ds = (t) => t == null ? "" : String(t), Re = (t) => Ds(t).replace(
  /[&<>"']/g,
  (e) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[e] || e
), J = (t, e, i, s) => {
  const r = new CustomEvent(e, {
    bubbles: s?.bubbles ?? !0,
    cancelable: !!s?.cancelable,
    composed: s?.composed ?? !0,
    detail: i
  });
  return t.dispatchEvent(r), r;
}, vr = (t, e) => {
  e && J(t, "hass-more-info", { entityId: e });
}, Ps = (t) => {
  t && (window.history.pushState(null, "", t), J(window, "location-changed", { replace: !1 }));
}, ri = (t) => {
  const e = t?.locale?.language || (typeof navigator < "u" ? navigator.language : "en-AU") || "en-AU";
  return e === "en" ? "en-AU" : e;
}, ni = (t) => t?.config?.time_zone || void 0, Pt = (t, e, i = {}) => {
  const s = Number(e);
  return Number.isFinite(s) ? new Intl.NumberFormat(ri(t), i).format(s) : "—";
}, Z = (t, e, i = {}) => {
  if (e == null || e === "") return "—";
  const s = Number(e);
  if (!Number.isFinite(s)) return "—";
  const r = i.absolute ? Math.abs(s) : s;
  return Math.abs(r) >= 1e3 ? `${Pt(t, r / 1e3, { maximumFractionDigits: 1 })} kW` : `${Pt(t, Math.round(r), { maximumFractionDigits: 0 })} W`;
}, at = (t, e) => {
  if (e == null || e === "") return "—";
  const i = Number(e);
  return Number.isFinite(i) ? `${Pt(t, i, { maximumFractionDigits: Math.abs(i) < 1 ? 2 : 1 })} kWh` : "—";
}, ai = (t, e, i) => new Intl.DateTimeFormat(ri(t), {
  timeZone: ni(t),
  ...i
}).format(new Date(e)), oi = (t, e, i = {}) => {
  const s = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  return s ? ai(
    t,
    Date.UTC(Number(s[1]), Number(s[2]) - 1, Number(s[3]), 12),
    {
      timeZone: "UTC",
      ...i
    }
  ) : "—";
}, Hs = (t, e) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(e || ""));
  if (!i) return null;
  const s = Number(i[1]), r = Number(i[2]) - 1, n = Number(i[3]), a = ni(t);
  if (!a)
    return { start: new Date(s, r, n).getTime(), end: new Date(s, r, n + 1).getTime() };
  const c = new Intl.DateTimeFormat("en-AU", {
    timeZone: a,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }), d = (f, h, u) => {
    const l = Date.UTC(f, h, u);
    let v = l;
    for (let p = 0; p < 2; p += 1) {
      const g = Object.fromEntries(
        c.formatToParts(new Date(v)).map((_) => [_.type, _.value])
      ), m = Date.UTC(
        Number(g.year),
        Number(g.month) - 1,
        Number(g.day),
        Number(g.hour),
        Number(g.minute),
        Number(g.second)
      );
      v += l - m;
    }
    return v;
  };
  return {
    start: d(s, r, n),
    end: d(s, r, n + 1)
  };
}, Ne = (t, e, i = {}) => ai(t, e, {
  hour: "numeric",
  minute: "2-digit",
  ...i
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const He = globalThis, Ii = He.ShadowRoot && (He.ShadyCSS === void 0 || He.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ji = Symbol(), ls = /* @__PURE__ */ new WeakMap();
let Rs = class {
  constructor(e, i, s) {
    if (this._$cssResult$ = !0, s !== ji) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (Ii && e === void 0) {
      const s = i !== void 0 && i.length === 1;
      s && (e = ls.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && ls.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const _e = (t) => new Rs(typeof t == "string" ? t : t + "", void 0, ji), w = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((s, r, n) => s + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[n + 1], t[0]);
  return new Rs(i, t, ji);
}, br = (t, e) => {
  if (Ii) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const s = document.createElement("style"), r = He.litNonce;
    r !== void 0 && s.setAttribute("nonce", r), s.textContent = i.cssText, t.appendChild(s);
  }
}, ds = Ii ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const s of e.cssRules) i += s.cssText;
  return _e(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yr, defineProperty: xr, getOwnPropertyDescriptor: wr, getOwnPropertyNames: $r, getOwnPropertySymbols: Cr, getPrototypeOf: kr } = Object, ci = globalThis, ps = ci.trustedTypes, Sr = ps ? ps.emptyScript : "", Ar = ci.reactiveElementPolyfillSupport, te = (t, e) => t, Le = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Sr : null;
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
} }, Ui = (t, e) => !yr(t, e), hs = { attribute: !0, type: String, converter: Le, reflect: !1, useDefault: !1, hasChanged: Ui };
Symbol.metadata ??= Symbol("metadata"), ci.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Tt = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = hs) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const s = Symbol(), r = this.getPropertyDescriptor(e, s, i);
      r !== void 0 && xr(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, s) {
    const { get: r, set: n } = wr(this.prototype, e) ?? { get() {
      return this[i];
    }, set(a) {
      this[i] = a;
    } };
    return { get: r, set(a) {
      const c = r?.call(this);
      n?.call(this, a), this.requestUpdate(e, c, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? hs;
  }
  static _$Ei() {
    if (this.hasOwnProperty(te("elementProperties"))) return;
    const e = kr(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(te("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(te("properties"))) {
      const i = this.properties, s = [...$r(i), ...Cr(i)];
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
      for (const r of s) i.unshift(ds(r));
    } else e !== void 0 && i.push(ds(e));
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
    return br(e, this.constructor.elementStyles), e;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : Le).toAttribute(i, s.type);
      this._$Em = e, n == null ? this.removeAttribute(r) : this.setAttribute(r, n), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const s = this.constructor, r = s._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const n = s.getPropertyOptions(r), a = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : Le;
      this._$Em = r;
      const c = a.fromAttribute(i, n.type);
      this[r] = c ?? this._$Ej?.get(r) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, i, s, r = !1, n) {
    if (e !== void 0) {
      const a = this.constructor;
      if (r === !1 && (n = this[e]), s ??= a.getPropertyOptions(e), !((s.hasChanged ?? Ui)(n, i) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, s)))) return;
      this.C(e, i, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: s, reflect: r, wrapped: n }, a) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? i ?? this[e]), n !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [r, n] of this._$Ep) this[r] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [r, n] of s) {
        const { wrapped: a } = n, c = this[r];
        a !== !0 || this._$AL.has(r) || c === void 0 || this.C(r, void 0, n, c);
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
Tt.elementStyles = [], Tt.shadowRootOptions = { mode: "open" }, Tt[te("elementProperties")] = /* @__PURE__ */ new Map(), Tt[te("finalized")] = /* @__PURE__ */ new Map(), Ar?.({ ReactiveElement: Tt }), (ci.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bi = globalThis, us = (t) => t, qe = Bi.trustedTypes, ms = qe ? qe.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ns = "$lit$", nt = `lit$${Math.random().toFixed(9).slice(2)}$`, Ls = "?" + nt, Er = `<${Ls}>`, vt = document, se = () => vt.createComment(""), re = (t) => t === null || typeof t != "object" && typeof t != "function", Fi = Array.isArray, zr = (t) => Fi(t) || typeof t?.[Symbol.iterator] == "function", $i = `[ 	
\f\r]`, Yt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, fs = /-->/g, gs = />/g, mt = RegExp(`>|${$i}(?:([^\\s"'>=/]+)(${$i}*=${$i}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _s = /'/g, vs = /"/g, qs = /^(?:script|style|textarea|title)$/i, Tr = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), o = Tr(1), Ht = Symbol.for("lit-noChange"), I = Symbol.for("lit-nothing"), bs = /* @__PURE__ */ new WeakMap(), gt = vt.createTreeWalker(vt, 129);
function Ms(t, e) {
  if (!Fi(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ms !== void 0 ? ms.createHTML(e) : e;
}
const Or = (t, e) => {
  const i = t.length - 1, s = [];
  let r, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = Yt;
  for (let c = 0; c < i; c++) {
    const d = t[c];
    let f, h, u = -1, l = 0;
    for (; l < d.length && (a.lastIndex = l, h = a.exec(d), h !== null); ) l = a.lastIndex, a === Yt ? h[1] === "!--" ? a = fs : h[1] !== void 0 ? a = gs : h[2] !== void 0 ? (qs.test(h[2]) && (r = RegExp("</" + h[2], "g")), a = mt) : h[3] !== void 0 && (a = mt) : a === mt ? h[0] === ">" ? (a = r ?? Yt, u = -1) : h[1] === void 0 ? u = -2 : (u = a.lastIndex - h[2].length, f = h[1], a = h[3] === void 0 ? mt : h[3] === '"' ? vs : _s) : a === vs || a === _s ? a = mt : a === fs || a === gs ? a = Yt : (a = mt, r = void 0);
    const v = a === mt && t[c + 1].startsWith("/>") ? " " : "";
    n += a === Yt ? d + Er : u >= 0 ? (s.push(f), d.slice(0, u) + Ns + d.slice(u) + nt + v) : d + nt + (u === -2 ? c : v);
  }
  return [Ms(t, n + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class ne {
  constructor({ strings: e, _$litType$: i }, s) {
    let r;
    this.parts = [];
    let n = 0, a = 0;
    const c = e.length - 1, d = this.parts, [f, h] = Or(e, i);
    if (this.el = ne.createElement(f, s), gt.currentNode = this.el.content, i === 2 || i === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (r = gt.nextNode()) !== null && d.length < c; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const u of r.getAttributeNames()) if (u.endsWith(Ns)) {
          const l = h[a++], v = r.getAttribute(u).split(nt), p = /([.?@])?(.*)/.exec(l);
          d.push({ type: 1, index: n, name: p[2], strings: v, ctor: p[1] === "." ? Pr : p[1] === "?" ? Hr : p[1] === "@" ? Rr : li }), r.removeAttribute(u);
        } else u.startsWith(nt) && (d.push({ type: 6, index: n }), r.removeAttribute(u));
        if (qs.test(r.tagName)) {
          const u = r.textContent.split(nt), l = u.length - 1;
          if (l > 0) {
            r.textContent = qe ? qe.emptyScript : "";
            for (let v = 0; v < l; v++) r.append(u[v], se()), gt.nextNode(), d.push({ type: 2, index: ++n });
            r.append(u[l], se());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Ls) d.push({ type: 2, index: n });
      else {
        let u = -1;
        for (; (u = r.data.indexOf(nt, u + 1)) !== -1; ) d.push({ type: 7, index: n }), u += nt.length - 1;
      }
      n++;
    }
  }
  static createElement(e, i) {
    const s = vt.createElement("template");
    return s.innerHTML = e, s;
  }
}
function Rt(t, e, i = t, s) {
  if (e === Ht) return e;
  let r = s !== void 0 ? i._$Co?.[s] : i._$Cl;
  const n = re(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== n && (r?._$AO?.(!1), n === void 0 ? r = void 0 : (r = new n(t), r._$AT(t, i, s)), s !== void 0 ? (i._$Co ??= [])[s] = r : i._$Cl = r), r !== void 0 && (e = Rt(t, r._$AS(t, e.values), r, s)), e;
}
class Dr {
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
    const { el: { content: i }, parts: s } = this._$AD, r = (e?.creationScope ?? vt).importNode(i, !0);
    gt.currentNode = r;
    let n = gt.nextNode(), a = 0, c = 0, d = s[0];
    for (; d !== void 0; ) {
      if (a === d.index) {
        let f;
        d.type === 2 ? f = new ve(n, n.nextSibling, this, e) : d.type === 1 ? f = new d.ctor(n, d.name, d.strings, this, e) : d.type === 6 && (f = new Nr(n, this, e)), this._$AV.push(f), d = s[++c];
      }
      a !== d?.index && (n = gt.nextNode(), a++);
    }
    return gt.currentNode = vt, r;
  }
  p(e) {
    let i = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, i), i += s.strings.length - 2) : s._$AI(e[i])), i++;
  }
}
class ve {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, s, r) {
    this.type = 2, this._$AH = I, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = s, this.options = r, this._$Cv = r?.isConnected ?? !0;
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
    e = Rt(this, e, i), re(e) ? e === I || e == null || e === "" ? (this._$AH !== I && this._$AR(), this._$AH = I) : e !== this._$AH && e !== Ht && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : zr(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== I && re(this._$AH) ? this._$AA.nextSibling.data = e : this.T(vt.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: s } = e, r = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = ne.createElement(Ms(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const n = new Dr(r, this), a = n.u(this.options);
      n.p(i), this.T(a), this._$AH = n;
    }
  }
  _$AC(e) {
    let i = bs.get(e.strings);
    return i === void 0 && bs.set(e.strings, i = new ne(e)), i;
  }
  k(e) {
    Fi(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s, r = 0;
    for (const n of e) r === i.length ? i.push(s = new ve(this.O(se()), this.O(se()), this, this.options)) : s = i[r], s._$AI(n), r++;
    r < i.length && (this._$AR(s && s._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const s = us(e).nextSibling;
      us(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class li {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, s, r, n) {
    this.type = 1, this._$AH = I, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = I;
  }
  _$AI(e, i = this, s, r) {
    const n = this.strings;
    let a = !1;
    if (n === void 0) e = Rt(this, e, i, 0), a = !re(e) || e !== this._$AH && e !== Ht, a && (this._$AH = e);
    else {
      const c = e;
      let d, f;
      for (e = n[0], d = 0; d < n.length - 1; d++) f = Rt(this, c[s + d], i, d), f === Ht && (f = this._$AH[d]), a ||= !re(f) || f !== this._$AH[d], f === I ? e = I : e !== I && (e += (f ?? "") + n[d + 1]), this._$AH[d] = f;
    }
    a && !r && this.j(e);
  }
  j(e) {
    e === I ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Pr extends li {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === I ? void 0 : e;
  }
}
class Hr extends li {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== I);
  }
}
class Rr extends li {
  constructor(e, i, s, r, n) {
    super(e, i, s, r, n), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = Rt(this, e, i, 0) ?? I) === Ht) return;
    const s = this._$AH, r = e === I && s !== I || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== I && (s === I || r);
    r && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Nr {
  constructor(e, i, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Rt(this, e);
  }
}
const Lr = Bi.litHtmlPolyfillSupport;
Lr?.(ne, ve), (Bi.litHtmlVersions ??= []).push("3.3.3");
const qr = (t, e, i) => {
  const s = i?.renderBefore ?? e;
  let r = s._$litPart$;
  if (r === void 0) {
    const n = i?.renderBefore ?? null;
    s._$litPart$ = r = new ve(e.insertBefore(se(), n), n, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vi = globalThis;
class ot extends Tt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = qr(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ht;
  }
}
ot._$litElement$ = !0, ot.finalized = !0, Vi.litElementHydrateSupport?.({ LitElement: ot });
const Mr = Vi.litElementPolyfillSupport;
Mr?.({ LitElement: ot });
(Vi.litElementVersions ??= []).push("4.2.2");
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
const Ir = { attribute: !0, type: String, converter: Le, reflect: !1, hasChanged: Ui }, jr = (t = Ir, e, i) => {
  const { kind: s, metadata: r } = i;
  let n = globalThis.litPropertyMetadata.get(r);
  if (n === void 0 && globalThis.litPropertyMetadata.set(r, n = /* @__PURE__ */ new Map()), s === "setter" && ((t = Object.create(t)).wrapped = !0), n.set(i.name, t), s === "accessor") {
    const { name: a } = i;
    return { set(c) {
      const d = e.get.call(this);
      e.set.call(this, c), this.requestUpdate(a, d, t, !0, c);
    }, init(c) {
      return c !== void 0 && this.C(a, void 0, t, c), c;
    } };
  }
  if (s === "setter") {
    const { name: a } = i;
    return function(c) {
      const d = this[a];
      e.call(this, c), this.requestUpdate(a, d, t, !0, c);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Kt(t) {
  return (e, i) => typeof i == "object" ? jr(t, e, i) : ((s, r, n) => {
    const a = r.hasOwnProperty(n);
    return r.constructor.createProperty(n, s), a ? Object.getOwnPropertyDescriptor(r, n) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function b(t) {
  return Kt({ ...t, state: !0, attribute: !1 });
}
var Ur = Object.defineProperty, Br = Object.getOwnPropertyDescriptor, be = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Br(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && Ur(e, i, r), r;
};
let bt = class extends ot {
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
          ${this.cardType ? o`<span class="type-badge">${Re(this.cardType)}</span>` : ""}
        </div>
        <textarea
          .value=${t}
          @change=${this._onChange}
          spellcheck="false"
          aria-label="Card Configuration JSON"
        ></textarea>
        ${this._error ? o`<div class="error">⚠️ ${Re(this._error)}</div>` : ""}
      </div>
    `;
  }
};
bt.styles = w`
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
be([
  Kt({ attribute: !1 })
], bt.prototype, "hass", 2);
be([
  Kt({ type: String })
], bt.prototype, "cardType", 2);
be([
  b()
], bt.prototype, "_config", 2);
be([
  b()
], bt.prototype, "_error", 2);
bt = be([
  $("ha-component-library-config-editor")
], bt);
const Fr = (t, e) => {
  e.getStubConfig || (e.getStubConfig = () => ({
    ...e.stubConfig || {}
  })), e.getConfigElement || (e.getConfigElement = () => {
    const i = document.createElement(
      "ha-component-library-config-editor"
    );
    return i.cardType = t, i;
  });
}, S = (t) => {
  const { type: e, element: i, name: s, description: r, preview: n = !0 } = t;
  Fr(e, i), customElements.get(e) || customElements.define(e, i), typeof window < "u" && (window.customCards = window.customCards || [], window.customCards.some((a) => a.type === e) || window.customCards.push({
    type: e,
    name: s,
    description: r,
    preview: n
  }));
}, Et = Object.freeze({
  holdDelay: 500,
  moveTolerance: 10,
  errorDuration: 1800,
  repeatDelay: 350,
  repeatInterval: 110,
  repeatMinimumInterval: 55
}), Hc = () => typeof window < "u" && globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === !0, Vr = `
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
`, Wr = (t) => {
  if (!t) return null;
  if (t === !0) return {};
  if (typeof t != "object")
    throw new TypeError(
      "interaction repeat must be false, true, or an options object"
    );
  return t;
}, Gr = (t, e) => {
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
}, Kr = (t) => {
  const e = t.getRootNode?.();
  if (!e || e.__haInteractionFeedbackV2) return null;
  e.__haInteractionFeedbackV2 = !0;
  const i = document.createElement("style");
  i.setAttribute("data-ha-interaction-styles", "v2"), i.textContent = Vr;
  const s = document.createElement("span");
  s.setAttribute("data-ha-interaction-status", "v2"), s.setAttribute("role", "status"), s.setAttribute("aria-live", "polite"), s.setAttribute("aria-atomic", "true");
  const r = e.nodeType === 9 || e.body ? e.body || e.head || e.documentElement : e;
  return r && typeof r.append == "function" && r.append(i, s), s;
}, ys = [
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
  const i = Kr(t), s = typeof e.primary == "function" ? e.primary : null, r = typeof e.hold == "function" ? e.hold : null, n = Wr(e.repeat);
  if (r && n)
    throw new TypeError("interaction hold and repeat are mutually exclusive");
  if (!s && (r || n))
    throw new TypeError("interaction hold/repeat requires a primary action");
  const a = e.feedback !== !1, c = e.singleFlight === !0, d = Math.max(
    250,
    Number(e.holdDelay) || Et.holdDelay
  ), f = Math.max(
    4,
    Number(e.moveTolerance) || Et.moveTolerance
  ), h = Gr(e.optimistic, t), u = e.signal, l = typeof e.onPressChange == "function" ? e.onPressChange : null;
  let v = null, p = null, g = null, m = null, _ = 0, A = !1, O = null, E = !1, P = 0, N = null, q = !1, k = !1;
  const T = (y) => {
    const G = y?.composedPath?.();
    if (Array.isArray(G) && G.length)
      for (const Y of G) {
        if (Y === t) return !1;
        if (Y?.matches?.(ys))
          return !0;
      }
    const K = y?.target;
    if (!K || K === t) return !1;
    const Q = K.closest?.(ys);
    return !!(Q && Q !== t && t.contains?.(Q));
  }, V = () => q || c && P > 0 || t.disabled === !0 || t.getAttribute?.("aria-disabled") === "true", H = () => {
    O && clearTimeout(O), O = null, A = !1;
  }, U = () => {
    A = !0, O && clearTimeout(O), O = setTimeout(H, 0);
  }, B = (y) => {
    k !== y && (k = y, a && t.toggleAttribute?.("data-interaction-pressed", y), q || l?.(y, t));
  }, St = (y) => {
    P = Math.max(0, P + y), !(!a || q) && (t.toggleAttribute?.("data-interaction-pending", P > 0), t.setAttribute?.("aria-busy", String(P > 0)));
  }, At = () => {
    if (!a || q) return;
    N && clearTimeout(N), t.setAttribute?.("data-interaction-error", "true");
    const y = i || t.getRootNode?.()?.querySelector?.(
      "[data-ha-interaction-status]"
    );
    y && (y.textContent = e.errorMessage || "Action failed. Try again."), N = setTimeout(
      () => {
        N = null, q || t.removeAttribute?.("data-interaction-error");
      },
      Math.max(
        250,
        Number(e.errorDuration) || Et.errorDuration
      )
    );
  }, Se = (y) => {
    q || t.dispatchEvent?.(
      new CustomEvent("ha-interaction-error", {
        bubbles: !0,
        composed: !0,
        detail: { error: y }
      })
    );
  }, X = (y, G) => {
    if (V()) return Promise.resolve(void 0);
    const K = y === "hold" ? r : s;
    if (!K) return Promise.resolve(void 0);
    let Q;
    y === "primary" && h && (Q = h.capture(t, G), h.apply(t, G, Q));
    let Y;
    try {
      Y = K(G);
    } catch (ut) {
      return !q && y === "primary" && h?.rollback && h.rollback(Q, ut, t, G), At(), Se(ut), Promise.reject(ut);
    }
    return !Y || typeof Y.then != "function" ? Promise.resolve(Y) : (St(1), Promise.resolve(Y).catch((ut) => {
      throw !q && y === "primary" && h?.rollback && h.rollback(Q, ut, t, G), At(), Se(ut), ut;
    }).finally(() => {
      q || St(-1);
    }));
  }, z = () => {
    p && clearTimeout(p), p = null, g && clearTimeout(g), g = null, m && clearInterval(m), m = null;
  }, W = () => {
    z(), v = null, B(!1);
  }, rt = (y) => {
    if (!n || V()) return;
    const G = Math.max(
      150,
      Number(n.delay) || Et.repeatDelay
    ), K = Math.max(
      40,
      Number(n.interval) || Et.repeatInterval
    );
    _ = 0, g = setTimeout(() => {
      if (g = null, q || !v) return;
      E = !0, U();
      const Q = () => {
        if (q || !v) {
          m && clearInterval(m), m = null;
          return;
        }
        if (_ += 1, X("primary", y).catch(() => {
        }), q || !v || !n.accelerate) return;
        const Y = Math.max(
          Number(n.minimumInterval) || Et.repeatMinimumInterval,
          Math.round(K * Math.pow(0.93, _))
        );
        m && clearInterval(m), m = setInterval(Q, Y);
      };
      X("primary", y).catch(() => {
      }), !q && v && (m = setInterval(Q, K));
    }, G);
  }, ht = (y) => {
    if (!(!s || V() || y.button > 0 || T(y))) {
      v = { id: y.pointerId, x: y.clientX, y: y.clientY }, E = !1, H();
      try {
        t.setPointerCapture?.(y.pointerId);
      } catch {
      }
      B(!0), r ? p = setTimeout(() => {
        p = null, v && (E = !0, U(), B(!1), X("hold", y).catch(() => {
        }));
      }, d) : n && rt(y);
    }
  }, Qt = (y) => {
    !v || y.pointerId !== v.id || Math.hypot(y.clientX - v.x, y.clientY - v.y) <= f || (E = !0, U(), W());
  }, ns = (y) => {
    if (!v || y.pointerId !== v.id) return;
    if (T(y)) {
      E = !0, U(), W();
      return;
    }
    const G = E, K = n && (g === null || m !== null);
    z(), v = null, E = !1, B(!1), U(), !G && !K && X("primary", y).catch(() => {
    });
  }, Ae = () => {
    E = !1, U(), W();
  }, as = (y) => {
    if (!T(y)) {
      if (A) {
        y.preventDefault(), y.stopImmediatePropagation?.(), H();
        return;
      }
      !s || V() || X("primary", y).catch(() => {
      });
    }
  }, os = (y) => {
    !s || V() || y.repeat || T(y) || y.key !== "Enter" && y.key !== " " || (y.preventDefault(), B(!0));
  }, cs = (y) => {
    !s || V() || T(y) || y.key !== "Enter" && y.key !== " " || (y.preventDefault(), B(!1), U(), X("primary", y).catch(() => {
    }));
  };
  t.addEventListener("pointerdown", ht, {
    passive: !0
  }), t.addEventListener("pointermove", Qt, {
    passive: !0
  }), t.addEventListener("pointerup", ns, {
    passive: !0
  }), t.addEventListener("pointercancel", Ae, {
    passive: !0
  }), t.addEventListener(
    "lostpointercapture",
    Ae,
    { passive: !0 }
  ), t.addEventListener("click", as, !0), t.addEventListener("keydown", os), t.addEventListener("keyup", cs);
  const wi = () => {
    q || (q = !0, z(), N && clearTimeout(N), O && clearTimeout(O), N = null, O = null, u?.removeEventListener?.("abort", wi), k = !1, P = 0, a && (t.removeAttribute?.("data-interaction-pressed"), t.removeAttribute?.("data-interaction-pending"), t.removeAttribute?.("data-interaction-error"), t.setAttribute?.("aria-busy", "false")), t.removeEventListener("pointerdown", ht), t.removeEventListener("pointermove", Qt), t.removeEventListener("pointerup", ns), t.removeEventListener(
      "pointercancel",
      Ae
    ), t.removeEventListener(
      "lostpointercapture",
      Ae
    ), t.removeEventListener("click", as, !0), t.removeEventListener("keydown", os), t.removeEventListener("keyup", cs));
  };
  return u?.addEventListener?.("abort", wi, { once: !0 }), Object.freeze({
    element: t,
    destroy: wi,
    get destroyed() {
      return q;
    },
    invoke: (y) => X("primary", y)
  });
}, Is = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createRequestCoalescer requires a request function");
  let i = !1, s = !1, r, n = !1, a = 0;
  const c = async () => {
    if (!(i || n || !s)) {
      for (i = !0; !n && s; ) {
        s = !1;
        const d = r, f = ++a;
        try {
          await t(d, f), n || e.onSuccess?.(d, f);
        } catch (h) {
          n || e.onError?.(h, d, f), e.stopOnError && (s = !1);
        }
      }
      i = !1, n || e.onIdle?.();
    }
  };
  return Object.freeze({
    request(d) {
      n || (r = d, s = !0, c());
    },
    get pending() {
      return !n && (i || s);
    },
    get destroyed() {
      return n;
    },
    destroy() {
      n = !0, s = !1;
    }
  });
}, Me = (t, e, i, s = {}) => {
  if (!e || typeof i != "function")
    return Promise.reject(
      new TypeError("waitForEntityState requires an entity and predicate")
    );
  const r = typeof t == "function" ? t : () => t, n = Math.max(250, Number(s.timeout) || 9e3), a = Math.max(40, Number(s.interval) || 160), c = s.signal;
  return new Promise((d, f) => {
    let h = null, u = null, l = !1;
    const v = () => {
      h && clearInterval(h), u && clearTimeout(u), c?.removeEventListener?.("abort", g);
    }, p = (_, A) => {
      l || (l = !0, v(), _(A));
    }, g = () => p(f, c?.reason || new Error("State confirmation aborted")), m = () => {
      const _ = r()?.states?.[e] ?? null;
      try {
        i(_?.state, _) && p(d, _);
      } catch (A) {
        p(f, A);
      }
    };
    if (c?.aborted) return g();
    c?.addEventListener?.("abort", g, { once: !0 }), h = setInterval(m, a), u = setTimeout(
      () => p(f, new Error("State confirmation timed out")),
      n
    ), m();
  });
}, js = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError("createAsyncBroker requires a loader");
  const i = /* @__PURE__ */ new Map(), s = Math.max(0, Number(e.ttl) || 12e4), r = Math.max(s, Number(e.maxStale) || 864e5), n = Math.max(250, Number(e.retryBase) || 2e3), a = Math.max(n, Number(e.retryMax) || 6e4), c = (u) => (i.has(u) || i.set(u, {
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
  }), i.get(u)), d = (u) => {
    const l = c(u), v = l.updatedAt ? Date.now() - l.updatedAt : 1 / 0;
    return Object.freeze({
      value: l.value,
      error: l.error,
      loading: !!l.promise,
      stale: l.value !== void 0 && (l.invalidated || v > s),
      updatedAt: l.updatedAt
    });
  }, f = (u) => {
    const l = d(u);
    for (const v of [...c(u).subscribers])
      try {
        v(l);
      } catch {
      }
  }, h = (u, l, v = !1) => {
    const p = c(u), g = Date.now();
    if (p.promise) return p.promise;
    if (!v && g < p.nextRetryAt)
      return p.value !== void 0 ? Promise.resolve(p.value) : Promise.reject(p.error);
    const m = ++p.sequence, _ = p.generation;
    return p.promise = Promise.resolve().then(() => t(u, l, m)).then((A) => m !== p.sequence ? p.value : (p.value = A, p.error = null, p.updatedAt = Date.now(), p.failures = 0, p.nextRetryAt = 0, p.invalidated = p.generation !== _, A)).catch((A) => {
      if (m !== p.sequence || (p.error = A instanceof Error ? A : new Error(String(A)), p.failures += 1, p.nextRetryAt = Date.now() + Math.min(a, n * Math.pow(2, p.failures - 1)), p.value !== void 0 && Date.now() - p.updatedAt <= r))
        return p.value;
      throw p.error;
    }).finally(() => {
      m === p.sequence && (p.promise = null), f(u);
    }), f(u), p.promise;
  };
  return Object.freeze({
    clear() {
      i.clear();
    },
    invalidate(u) {
      const l = i.get(u);
      l && (l.invalidated = !0, l.generation += 1, l.nextRetryAt = 0, f(u));
    },
    peek: d,
    async read(u, l, v = {}) {
      const p = d(u), g = p.updatedAt ? Date.now() - p.updatedAt : 1 / 0, m = c(u);
      if (!v.force && !m.invalidated && p.value !== void 0 && g <= s)
        return p.value;
      if (!v.force && p.value !== void 0 && g <= r)
        return h(u, l).catch(() => {
        }), p.value;
      let _;
      try {
        _ = await h(u, l, v.force === !0);
      } catch (A) {
        if (v.force && c(u).invalidated)
          return h(u, l, !0);
        throw A;
      }
      return v.force && c(u).invalidated && (_ = await h(u, l, !0)), _;
    },
    refresh: (u, l) => h(u, l, !0),
    subscribe(u, l, v = {}) {
      const p = c(u);
      return p.subscribers.add(l), v.replay !== !1 && l(d(u)), () => {
        p.subscribers.delete(l);
      };
    }
  });
}, Qr = (t) => {
  let e = null, i = [];
  const s = () => (e && !e.signal.aborted || (e = new AbortController()), e.signal);
  return Object.freeze({
    cleanup: (c) => (typeof c != "function" || i.push(c), c),
    connect: s,
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
      return s();
    },
    host: t,
    listen: (c, d, f, h = {}) => {
      const u = s();
      return c?.addEventListener?.(d, f, { ...h, signal: u }), f;
    }
  });
}, Us = (t, e) => {
  let i = null, s = !0;
  const r = () => {
    if (!s) return;
    const a = 6e4 - Date.now() % 6e4 + 100;
    i = setTimeout(() => {
      if (s) {
        try {
          t();
        } catch {
        }
        r();
      }
    }, a);
  };
  r();
  const n = () => {
    s = !1, i && (clearTimeout(i), i = null);
  };
  return e && e.cleanup(n), n;
}, xs = "dashboard-shared-ui-tokens-v3", Bs = ":root{--dashboard-space-1:4px;--dashboard-space-2:8px;--dashboard-space-3:12px;--dashboard-space-4:16px;--dashboard-space-5:24px;--dashboard-control-height:44px;--dashboard-icon-size:22px;--dashboard-transition-fast:80ms;--dashboard-transition-standard:160ms;--dashboard-easing-standard:cubic-bezier(.2,0,0,1);--dashboard-focus-ring:2px solid var(--primary-color);--dashboard-focus-offset:2px;--dashboard-layer-popover:20;--dashboard-layer-overlay:1000;--dashboard-media-surface:#111;--dashboard-media-on-surface:#fff;--dashboard-radius-card:8px;--dashboard-radius-control:6px;--dashboard-radius-dialog:10px;--dashboard-radius-icon:0px;--dashboard-modal-scrim:rgba(0,0,0,.16);--dashboard-card-surface:var(--ha-card-background,var(--card-background-color));--dashboard-card-muted-surface:color-mix(in srgb,var(--primary-text-color) 3%,var(--card-background-color));--dashboard-card-border-color:color-mix(in srgb,var(--primary-text-color) 10%,transparent);--dashboard-card-border:1px solid var(--dashboard-card-border-color);--dashboard-active-surface:color-mix(in srgb,var(--primary-color) 7%,var(--card-background-color));--dashboard-warning-surface:color-mix(in srgb,var(--warning-color,#f9a825) 9%,var(--card-background-color));--dashboard-critical-surface:color-mix(in srgb,var(--error-color) 8%,var(--card-background-color));--dashboard-dialog-shadow:0 16px 48px rgba(0,0,0,.22);--ha-card-border-radius:var(--dashboard-radius-card);--ha-card-box-shadow:none;--ha-card-border-width:1px;--ha-card-border-color:var(--dashboard-card-border-color)}@media(max-width:700px){:root{--dashboard-radius-dialog:8px}}@media(prefers-reduced-motion:reduce){:root{--dashboard-transition-fast:0ms;--dashboard-transition-standard:0ms}}", Yr = () => {
  if (typeof document > "u") return;
  let t = document.getElementById(xs);
  t || (t = document.createElement("style"), t.id = xs, document.head?.append(t)), t.textContent = Bs;
};
Yr();
const Rc = w`
  ${_e(Bs)}
`, Xr = ":host{display:block;min-width:0}ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,16px);background:var(--ha-card-background,var(--card-background-color));color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}button.demo{appearance:none;width:100%;border:0;background:transparent;text-align:inherit;padding:0;cursor:pointer}button.demo:active{transform:scale(.992)}button.demo:focus-visible{outline:2px solid var(--primary-color);outline-offset:-2px;border-radius:var(--ha-card-border-radius,16px)}", Zr = ":host{display:block;min-width:0}ha-card{overflow:hidden;border:var(--dashboard-card-border,1px solid var(--divider-color));border-radius:var(--dashboard-radius-card,var(--ha-card-border-radius,6px));background:var(--dashboard-card-surface,var(--ha-card-background,var(--card-background-color)));box-shadow:none;color:var(--primary-text-color);box-sizing:border-box}.wrap{box-sizing:border-box;padding:12px 14px}.title{font-size:13px;line-height:1.25;font-weight:600;color:var(--primary-text-color)}.desc{margin-top:3px;font-size:11px;line-height:1.3;color:var(--secondary-text-color)}ha-icon{--mdc-icon-size:19px}button{font:inherit;color:inherit}button.i{appearance:none;border:0;background:transparent;cursor:pointer}button.i:active{background:var(--dashboard-card-muted-surface,var(--secondary-background-color))}button.i:focus-visible{outline:2px solid var(--primary-color);outline-offset:2px;border-radius:var(--dashboard-radius-control,5px)}@media(max-width:700px){.wrap{padding:12px}}", Jr = ":host{display:block;min-width:0}ha-card{overflow:hidden;border-radius:var(--ha-card-border-radius,16px);background:var(--ha-card-background,var(--card-background-color));color:var(--primary-text-color)}*{box-sizing:border-box}button{font:inherit;color:inherit}", st = w`
  ${_e(Xr)}
`, R = w`
  ${_e(Zr)}
`, Wi = w`
  ${_e(Jr)}
`, di = st, Fs = w`
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
function lt(t) {
  return t && t.split(".")[0] || "";
}
const D = lt;
function tn(t) {
  let e = t.entry?.name || t.entry?.original_name || t.state?.attributes?.friendly_name || t.fallback || t.entry?.entity_id || t.state?.entity_id || "Control";
  if (t.stripSuffixes && t.stripSuffixes.length > 0)
    for (const i of t.stripSuffixes)
      e = e.replace(i, "").trim();
  return e;
}
function pi(t, e) {
  return t ? t.attributes?.friendly_name || e || t.entity_id : e || "";
}
function Vs(t) {
  if (!t) return !1;
  const e = typeof t == "string" ? t : t.state;
  if (!e) return !1;
  const i = e.toLowerCase().trim();
  return i !== "unavailable" && i !== "unknown" && i !== "";
}
function ws(t) {
  return !Vs(t);
}
function Nt(t, e) {
  if (!t) return "Unavailable";
  if (e?.formatEntityState)
    return e.formatEntityState(t);
  const i = t.state, s = t.attributes?.unit_of_measurement;
  return i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : i === "on" ? "On" : i === "off" ? "Off" : s ? `${i} ${s}` : i.charAt(0).toUpperCase() + i.slice(1);
}
function ae(t) {
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
function hi(t, e) {
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
async function ui(t, e, i, s) {
  if (!e) return;
  const r = i?.action || "toggle";
  if (r === "none") return;
  if (i?.haptic && J(t, "haptic", i.haptic), i?.confirmation) {
    const a = i.confirmation.text || "Are you sure you want to proceed?";
    if (!window.confirm(a))
      return;
  }
  const n = i?.target?.entity_id || s;
  switch (r) {
    case "toggle": {
      if (!n) return;
      const a = lt(n), c = a === "lock" ? "lock" : "toggle";
      await e.callService(a, c, void 0, {
        entity_id: n
      });
      break;
    }
    case "more-info": {
      if (!n) return;
      J(t, "hass-more-info", { entityId: n });
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
      i?.navigation_path && (window.history.pushState(null, "", i.navigation_path), J(window, "location-changed", { replace: !1 }));
      break;
    }
    case "url": {
      i?.url_path && window.open(i.url_path, "_blank");
      break;
    }
    case "assist": {
      J(t, "start-voice-assist");
      break;
    }
  }
}
var en = Object.defineProperty, Gi = (t, e, i, s) => {
  for (var r = void 0, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(e, i, r) || r);
  return r && en(e, i, r), r;
};
class C extends ot {
  constructor() {
    super(...arguments), this._cardError = null, this._lifecycle = Qr(this);
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
    return Re(e);
  }
  toText(e) {
    return Ds(e);
  }
  moreInfo(e) {
    vr(this, e);
  }
  navigate(e) {
    Ps(e);
  }
  fire(e, i) {
    return J(this, e, i);
  }
  formatNum(e, i) {
    return Pt(this.hass, e, i);
  }
  fmtPower(e, i) {
    return Z(this.hass, e, i);
  }
  fmtEnergy(e) {
    return at(this.hass, e);
  }
  fmtDate(e, i) {
    return ai(this.hass, e, i);
  }
  fmtTime(e, i) {
    return Ne(this.hass, e, i);
  }
  fmtCalendarDay(e, i) {
    return oi(this.hass, e, i);
  }
  renderError(e) {
    return o`
      <ha-card class="error-card">
        <div
          style="padding: 16px; color: var(--error-color, #db4437); font-size: 13px; font-weight: 500;"
        >
          ⚠️ ${Re(e)}
        </div>
      </ha-card>
    `;
  }
}
Gi([
  Kt({ attribute: !1 })
], C.prototype, "hass");
Gi([
  b()
], C.prototype, "_config");
Gi([
  b()
], C.prototype, "_cardError");
class mi extends C {
  validateConfig(e) {
  }
  setConfig(e) {
    super.setConfig(e), this.validateConfig(e);
  }
  fireConfigChanged() {
    this.fire("config-changed", { config: this._config });
  }
}
class sn {
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
    ]).then(([r, n, a, c]) => {
      const d = Array.isArray(r) ? r : [], f = Array.isArray(n) ? n : [], h = Array.isArray(a) ? a : [], u = Array.isArray(c) ? c : [], l = new Map(
        f.map((g) => [g.id, g.area_id || null])
      ), v = /* @__PURE__ */ new Map();
      for (const g of h) {
        if (!g?.device_id) continue;
        const m = v.get(g.device_id) || [];
        m.push(g), v.set(g.device_id, m);
      }
      const p = new Map(
        d.map((g) => [g.area_id, g])
      );
      return this._data = {
        areas: d,
        devices: f,
        entities: h,
        dashboards: u,
        deviceArea: l,
        byDevice: v,
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
    return r = Promise.resolve(s).then((n) => {
      if (this._hass === e)
        for (const a of [...this._subs])
          try {
            a(n);
          } catch {
          }
      return n;
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
const L = new sn(), ee = [], Ws = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard entry filters must be functions");
  return ee.push(t), () => {
    const e = ee.indexOf(t);
    e >= 0 && ee.splice(e, 1);
  };
}, Gs = (t, e) => {
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
}, _t = (t, e) => !!(t?.entity_id && !t.disabled_by && !t.hidden_by && !["diagnostic", "config"].includes(t.entity_category || "") && !Gs(t, e) && ee.every((i) => i(t))), F = (t, e, i) => e?.name || e?.original_name || i?.attributes?.friendly_name || e?.entity_id || "Control", ct = (t, e) => t?.area_id || t?.device_id && e?.deviceArea?.get(t.device_id) || null || null, zt = (t, e) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""} ${e?.states?.[t?.entity_id || ""]?.attributes?.friendly_name || ""}`.toLowerCase(), Ki = (t, e, i, s) => {
  if (D(t?.entity_id) !== "climate") return null;
  const r = ct(t, i), n = t.device_id ? i?.byDevice?.get(t.device_id) || [] : [], a = r ? (i?.entities || []).filter(
    (p) => ct(p, i) === r
  ) : [], c = (i?.entities || []).filter(
    (p) => ["timer", "script", "scene"].includes(D(p?.entity_id))
  ), d = [
    ...new Map(
      [...n, ...a, ...c].map((p) => [
        p.entity_id,
        p
      ])
    ).values()
  ].filter((p) => s?.states?.[p.entity_id]), f = zt(t, s).replace(/climate\.|split|system|climate|air conditioner|aircon|hvac/g, " ").trim().split(/\s+/).filter((p) => p.length > 2), h = (p) => {
    const g = zt(p, s);
    return !!(t.device_id && p.device_id === t.device_id) || f.some((m) => g.includes(m));
  }, u = (p) => {
    const g = d.filter(
      (m) => D(m.entity_id) === "select" && zt(m, s).includes(p) && /(vane|swing)/.test(zt(m, s)) && h(m)
    );
    return g.length === 1 ? g[0].entity_id : null;
  }, l = d.find(
    (p) => D(p.entity_id) === "timer" && h(p) && /(split|climate|air.?con|hvac|timer)/.test(
      zt(p, s)
    )
  )?.entity_id || null, v = d.filter(
    (p) => ["script", "scene"].includes(D(p.entity_id)) && h(p) && /(split|climate|air.?con|hvac)/.test(zt(p, s))
  ).map((p) => ({
    entity: p.entity_id,
    name: F(s, p, s?.states?.[p.entity_id])
  }));
  return {
    type: "custom:component-split-controller-v4",
    entity: t.entity_id,
    title: F(s, t, e),
    vertical_vane_entity: u("vertical"),
    horizontal_vane_entity: u("horizontal"),
    timer_entity: l,
    profile_entities: v
  };
}, rn = (t) => `${t?.entity_id || ""} ${t?.name || ""} ${t?.original_name || ""}`.toLowerCase().replace(/[_./-]+/g, " "), Ks = (t, e, i) => {
  if (!t?.device_id) return null;
  const r = (e?.byDevice?.get(t.device_id) || []).filter(
    (n) => D(n?.entity_id) === "button" && _t(n) && i?.states?.[n.entity_id] && String(i.states[n.entity_id].state).toLowerCase() !== "unavailable"
  ).filter(
    (n) => /\bgarage\s+door\b.*\b(trigger|operate|operator)\b|\b(trigger|operate|operator)\b.*\bgarage\s+door\b/.test(
      rn(n)
    )
  );
  return r.length === 1 ? r[0].entity_id : null;
}, Qs = (t, e, i, s) => D(t?.entity_id) === "media_player" && t?.platform === "apple_tv" ? {
  type: "custom:component-apple-tv-controller-v1",
  entity: t.entity_id,
  title: F(s, t, e),
  icon: "mdi:apple"
} : null, Ys = /* @__PURE__ */ new Set([
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
]), Oi = (t, e) => _t(t, e) && (Ys.has(D(t.entity_id)) || D(t.entity_id) === "binary_sensor" && e?.attributes?.device_class === "garage_door"), Xs = (t, e) => {
  if (!_t(t, e) || !e) return !1;
  const i = D(t.entity_id), s = e.state, r = e.attributes || {};
  if (["light", "fan", "switch", "input_boolean"].includes(i))
    return s === "on";
  if (i === "media_player") {
    if (["playing", "paused", "buffering", "on"].includes(s)) return !0;
    if (s === "idle") {
      const n = String(r.media_title || r.app_name || "");
      return !!(n && !/^(idle|home(?: screen)?|default media receiver)$/i.test(n));
    }
    return !1;
  }
  return i === "climate" ? /^(heat|cool|heat_cool|auto|dry|fan_only)$/.test(s) : i === "cover" ? /^(open|opening|closing)$/.test(s) : i === "lock" ? s === "unlocked" : i === "vacuum" ? /^(cleaning|returning)$/.test(s) : i === "binary_sensor" ? s === "on" && /^(door|window|garage_door|smoke|moisture|gas)$/.test(
    r.device_class || ""
  ) : !1;
}, ie = [], Zs = (t) => {
  if (typeof t != "function")
    throw new TypeError("Dashboard control resolvers must be functions");
  return ie.push(t), () => {
    const e = ie.indexOf(t);
    e >= 0 && ie.splice(e, 1);
  };
}, Js = (t, e, i, s) => {
  const r = t.entity_id, n = D(r);
  if (n === "climate")
    return Ki(t, e, i, s) || {
      type: "custom:component-split-controller-v4",
      entity: r,
      title: F(s, t, e)
    };
  if (n === "binary_sensor" && e?.attributes?.device_class === "garage_door") {
    const a = Ks(t, i, s);
    return a ? {
      type: "custom:component-garage-door-controller-v1",
      title: F(s, t, e).replace(
        / Garage Door Status$/i,
        ""
      ),
      entity: r,
      control_entity: a
    } : {
      type: "custom:component-control-row-v2",
      entity: r,
      title: F(s, t, e)
    };
  }
  return n === "media_player" ? Qs(t, e, i, s) || {
    type: "custom:component-media-row-v2",
    entity: r,
    title: F(s, t, e)
  } : n === "camera" ? {
    type: "custom:component-camera-controller-v1",
    entity: r,
    title: F(s, t, e),
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
  ].includes(n) ? {
    type: "custom:component-control-row-v2",
    entity: r,
    title: F(s, t, e),
    name: F(s, t, e)
  } : null;
}, tr = (t, e, i, s) => {
  for (const r of ie) {
    const n = r(t, e, i, s);
    if (n) return n;
  }
  return Js(t, e, i, s);
}, er = async (t, e) => {
  if (!t || !e) return { order: [], hidden: [] };
  try {
    return (await t.callWS({
      type: "frontend/get_user_data",
      key: e
    }))?.value || { order: [], hidden: [] };
  } catch {
    return { order: [], hidden: [] };
  }
}, ir = (t, e, i) => t.callWS({ type: "frontend/set_user_data", key: e, value: i }), Di = (t, e) => {
  const i = new Map(t.map((a) => [a.id, a])), s = /* @__PURE__ */ new Set(), r = [];
  for (const a of e?.order || []) {
    const c = i.get(a);
    c && (r.push(c), s.add(a));
  }
  for (const a of t)
    s.has(a.id) || r.push(a);
  const n = new Set(e?.hidden || []);
  return { all: r, visible: r.filter((a) => !n.has(a.id)), hidden: n };
}, sr = async (t, e) => {
  const i = String(t?.type || ""), s = i.startsWith("custom:") ? i.slice(7) : i;
  let r;
  if (customElements.get(s))
    r = document.createElement(s);
  else {
    const n = globalThis.loadCardHelpers || (typeof window < "u" ? window.loadCardHelpers : void 0);
    if (typeof n == "function")
      try {
        const f = (await n()).createCardElement(t);
        return e && (f.hass = e), f;
      } catch {
      }
    const a = t?.entity || "";
    D(a) === "media_player" ? r = document.createElement("component-media-row-v2") : r = document.createElement("component-control-row-v2");
  }
  if (typeof r.setConfig == "function")
    try {
      r.setConfig(t);
    } catch {
    }
  return e && (r.hass = e), r;
};
globalThis.__homeDashboardV2 ??= {};
const j = globalThis.__homeDashboardV2;
j.REG = L;
j.entryFilters = ee;
j.registerEntryFilter = Ws;
j.uiEntry = _t;
j.stateName = F;
j.areaOf = ct;
j.domain = D;
j.controlResolvers = ie;
j.registerControlResolver = Zs;
j.nativeClimateControlConfig = Ki;
j.garageControl = Ks;
j.appleTvBundle = Qs;
j.controlConfig = tr;
j.defaultControlConfig = Js;
j.controlDomains = Ys;
j.isPotential = Oi;
j.isActive = Xs;
j.isPeripheral = Gs;
j.prefs = er;
j.savePrefs = ir;
j.applyPrefs = Di;
j.card = sr;
const $s = /* @__PURE__ */ new WeakMap(), Nc = async (t) => {
  if (!t || !t.sendMessagePromise)
    return { areas: [], devices: [], entities: [] };
  const e = await L.load({ connection: t });
  let i = $s.get(e);
  return i || (i = {
    areas: e.areas,
    devices: e.devices,
    entities: e.entities
  }, $s.set(e, i)), i;
}, Lc = async (t, e = !1) => L.load(t, e), nn = /(_controller_temperature|_outside_air_temperature|cpu_temperature|processor_temperature|board_temperature|chip_temperature|internal_temperature)$/i;
function rr(t, e, i) {
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
  const r = (e?.entities || []).filter((g) => (g.area_id || (g.device_id ? e?.deviceArea?.get(g.device_id) : null)) === t.area_id), n = [];
  for (const g of r) {
    const m = i.states[g.entity_id];
    m && Vs(m) && n.push(m);
  }
  let a = 0, c = "", d = "", f = !1, h = !1;
  const u = n.find(
    (g) => g.entity_id.startsWith("climate.") && g.attributes && !Number.isNaN(
      Number.parseFloat(String(g.attributes.current_temperature ?? ""))
    )
  );
  if (u && u.attributes?.current_temperature !== void 0) {
    const g = Number.parseFloat(
      String(u.attributes.current_temperature)
    ), m = u.attributes.temperature_unit || i.config?.unit_system?.temperature || "°C";
    c = `${g.toFixed(1)} ${m}`;
  } else {
    const g = n.find(
      (m) => m.entity_id.startsWith("sensor.") && (m.attributes?.device_class === "temperature" || m.attributes?.unit_of_measurement && /°[CF]/i.test(m.attributes.unit_of_measurement)) && !nn.test(m.entity_id) && !Number.isNaN(Number.parseFloat(String(m.state ?? "")))
    );
    if (g) {
      const m = Number.parseFloat(String(g.state)), _ = g.attributes?.unit_of_measurement || i.config?.unit_system?.temperature || "°C";
      c = `${m.toFixed(1)} ${_}`;
    }
  }
  const l = n.find(
    (g) => g.entity_id.startsWith("sensor.") && g.attributes?.device_class === "humidity" && !Number.isNaN(Number.parseFloat(String(g.state ?? "")))
  );
  l && (d = Nt(l, i));
  for (const g of n) {
    g.entity_id.startsWith("light.") && g.state === "on" && a++;
    const m = g.attributes?.device_class || "";
    g.entity_id.startsWith("binary_sensor.") && g.state === "on" && ["smoke", "moisture", "gas"].includes(m) && (f = !0), (g.entity_id.startsWith("binary_sensor.") && g.state === "on" && m === "garage_door" || g.entity_id.startsWith("cover.") && ["open", "opening"].includes(g.state) && m === "garage") && (h = !0);
  }
  const v = a > 0 || n.some(
    (g) => g.entity_id.startsWith("climate.") && ["heating", "cooling", "drying", "fan"].includes(
      g.attributes?.hvac_action || ""
    ) || g.entity_id.startsWith("media_player.") && g.state === "playing"
  ), p = [];
  return f ? p.push("Attention required") : h && p.push("Garage open"), c && p.push(c), d && !c && p.push(d), a > 0 && p.push(`${a} light${a === 1 ? "" : "s"} on`), {
    summary: p.slice(0, 3).join(" · "),
    severity: f ? "critical" : h ? "warning" : v ? "active" : "",
    lightsOn: a,
    temperatureText: c,
    humidityText: d,
    hasCritical: f,
    hasWarning: h
  };
}
const Ci = /* @__PURE__ */ new WeakMap();
let an = 1;
const Qi = (t) => {
  const e = t?.connection;
  return e ? (Ci.has(e) || Ci.set(e, an++), Ci.get(e)) : "none";
}, Ot = (t, e, i) => `${Qi(t)}|${e}|${i}`, ki = /* @__PURE__ */ new WeakMap(), Cs = (t) => {
  const e = t?.connection;
  if (!e?.subscribeEvents || ki.has(e))
    return;
  const i = e.subscribeEvents((s) => {
    const r = /^dashboard-profile\.(energy|security)\.([a-z0-9-]+)$/.exec(
      String(s?.data?.key || "")
    );
    r && (Dt.invalidate(Ot(t, r[1], r[2])), window.dispatchEvent(
      new CustomEvent("ha-component-profile-change", {
        detail: { kind: r[1], profileId: r[2] }
      })
    ));
  }, "ha_component_backend_preferences_updated");
  ki.set(e, i), Promise.resolve(i).catch(
    () => ki.delete(e)
  );
}, Dt = js(
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
), on = Object.freeze({
  async get(t, e, i, s = {}) {
    Cs(t);
    const r = Ot(t, e, i);
    return Dt.read(r, { hass: t, kind: e, profileId: i }, s);
  },
  invalidate(t, e, i) {
    Dt.invalidate(Ot(t, e, i));
  },
  peek(t, e, i) {
    return Dt.peek(Ot(t, e, i));
  },
  async save(t, e, i, s, r) {
    const n = {
      type: "ha_component_backend/profile/update",
      kind: e,
      profile_id: i,
      profile: s
    };
    Number.isFinite(Number(r)) && (n.expected_revision = Number(r));
    const a = await t.callWS(n);
    return Dt.invalidate(Ot(t, e, i)), a;
  },
  subscribe(t, e, i, s) {
    Cs(t);
    const r = Ot(t, e, i);
    return Dt.subscribe(r, s);
  }
}), Si = /* @__PURE__ */ new Map(), ks = (t) => String(t).padStart(2, "0"), oe = (t = /* @__PURE__ */ new Date()) => `${t.getFullYear()}-${ks(t.getMonth() + 1)}-${ks(t.getDate())}`, Xt = (t, e = /* @__PURE__ */ new Date()) => {
  const i = t?.config?.time_zone;
  if (!i) return oe(e);
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
    return oe(e);
  }
}, nr = (t, e = oe()) => {
  const i = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(t || ""));
  if (!i) return null;
  const s = new Date(
    Number(i[1]),
    Number(i[2]) - 1,
    Number(i[3])
  );
  return oe(s) !== t || t > e ? null : t;
}, Ai = (t = "energy-day") => {
  const e = String(t || "energy-day");
  if (!Si.has(e)) {
    let i = null;
    try {
      i = sessionStorage.getItem(`ha-component-library:${e}`);
    } catch {
    }
    const s = nr(i);
    Si.set(e, {
      value: s || oe(),
      usesDefault: !s,
      subscribers: /* @__PURE__ */ new Set()
    });
  }
  return Si.get(e);
}, M = Object.freeze({
  get(t = "energy-day", e) {
    const i = Ai(t);
    return i.usesDefault && (i.value = Xt(e)), i.value;
  },
  set(t = "energy-day", e, i = {}) {
    const s = Ai(t), r = Xt(i.hass), n = nr(e, r);
    if (!n || n === s.value) return s.value;
    s.value = n, s.usesDefault = !1;
    try {
      sessionStorage.setItem(`ha-component-library:${t}`, n);
    } catch {
    }
    const a = {
      channel: t,
      day: n,
      isToday: n === r
    };
    for (const c of [...s.subscribers]) c(a);
    return i.broadcast !== !1 && window.dispatchEvent(
      new CustomEvent("energy-day-selector-change", { detail: a })
    ), n;
  },
  subscribe(t = "energy-day", e, i = {}) {
    const s = Ai(t);
    return s.usesDefault && (s.value = Xt(i.hass)), s.subscribers.add(e), i.replay !== !1 && e({
      channel: t,
      day: s.value,
      isToday: s.value === Xt(i.hass)
    }), () => s.subscribers.delete(e);
  },
  today: Xt
}), Ei = /* @__PURE__ */ new Set(), Ee = (t, e, i) => `${Qi(t)}|${e}|${i}`, Zt = js(
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
), Ie = Object.freeze({
  async get(t, e, i, s = {}) {
    const r = Ee(t, e, i);
    return Ei.add(r), Zt.read(r, { hass: t, profileId: e, day: i }, s);
  },
  invalidate(t, e, i) {
    Zt.invalidate(Ee(t, e, i));
  },
  invalidateProfile(t, e) {
    const i = `${Qi(t)}|${e}|`;
    for (const s of Ei)
      s.startsWith(i) && Zt.invalidate(s);
  },
  peek(t, e, i) {
    return Zt.peek(Ee(t, e, i));
  },
  subscribe(t, e, i, s) {
    const r = Ee(t, e, i);
    return Ei.add(r), Zt.subscribe(r, s);
  }
}), ze = /* @__PURE__ */ new Set(["unknown", "unavailable"]), fi = (t) => [
  t?.translation_key,
  t?.unique_id,
  t?.entity_id,
  t?.platform
].filter(Boolean).join(" ").toLowerCase(), Te = (t, e) => e?.name || e?.original_name || (e?.entity_id ? t?.states?.[e.entity_id]?.attributes?.friendly_name : "") || e?.entity_id || "Control", Ss = (t) => {
  const e = fi(t);
  return /record/.test(e) ? "Recording" : /detect|motion/.test(e) ? "Detection" : /alert|notification/.test(e) ? "Alerts" : /audio|sound/.test(e) ? "Audio" : null;
}, cn = (t) => /(^|[_ :.-])(ptz|pan|tilt|zoom)([_ :.-]|$)/.test(
  fi(t)
), Oe = (t) => {
  const e = fi(t);
  return /trigger|operate|open|close/.test(e) ? "operate" : /restart|reboot/.test(e) ? "restart" : "action";
}, ln = (t, e, i = {}) => {
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
  const s = new Set(i.include_entities || []), r = new Set(i.exclude_entities || []), n = new Set(i.area_ids || []), a = (e?.entities || []).filter((m) => !m?.entity_id || m.disabled_by || m.hidden_by || !t?.states?.[m.entity_id] ? !1 : !r.has(m.entity_id)), c = a.filter((m) => {
    if (s.has(m.entity_id)) return !0;
    const _ = ct(m, e);
    return !n.size || (_ ? n.has(_) : !1);
  }), d = c.filter(
    (m) => !m.disabled_by && !m.hidden_by
  ), f = new Set(
    c.map((m) => m.device_id || m.entity_id)
  ), h = /* @__PURE__ */ new Map();
  for (const m of a) {
    const _ = m.device_id || m.entity_id, A = h.get(_) || [];
    A.push(m), h.set(_, A);
  }
  const u = [];
  for (const [m, _] of h) {
    if (!f.has(m)) continue;
    const A = _.filter(
      (z) => D(z.entity_id) === "camera" && !z.disabled_by && !z.hidden_by
    );
    if (!A.length) continue;
    A.sort((z, W) => {
      const rt = (ht) => {
        const Qt = t.states[ht.entity_id];
        return (s.has(ht.entity_id) ? 100 : 0) + (Qt?.attributes?.entity_picture ? 20 : 0) + (Qt?.attributes?.frontend_stream_type ? 10 : 0);
      };
      return rt(W) - rt(z) || String(z.unique_id || z.entity_id).localeCompare(
        String(W.unique_id || W.entity_id)
      );
    });
    const O = A[0], E = t.states[O.entity_id], P = (e?.devices || []).find((z) => z.id === O.device_id) || {}, N = ct(O, e), q = (N ? e?.areaMap?.get(N)?.name : "") || "", k = _.filter(
      (z) => D(z.entity_id) === "switch" && Ss(z)
    ).map((z) => ({ entity: z, role: Ss(z) })), T = _.filter((z) => {
      if (D(z.entity_id) !== "binary_sensor") return !1;
      const W = t.states[z.entity_id]?.attributes?.device_class || "";
      return /^(motion|occupancy|presence|sound)$/.test(W) || /detect|motion|person|human/.test(fi(z));
    }), V = _.filter((z) => D(z.entity_id) === "image").map((z) => {
      const W = Te(t, z), rt = String(
        P.name_by_user || P.name || ""
      ).trim(), ht = rt && W.toLowerCase().startsWith(`${rt.toLowerCase()} `) ? W.slice(rt.length).trim() : W;
      return { entity: z, name: ht };
    }), H = _.filter(
      (z) => D(z.entity_id) === "button" && Oe(z) !== "action"
    ).map((z) => ({ entity: z, role: Oe(z) })), U = _.filter(
      (z) => ["button", "number", "select"].includes(D(z.entity_id)) && cn(z)
    ), B = i.mappings?.[`camera_stream:${O.entity_id}`] || i.mappings?.[`camera_stream:${m}`] || null, St = B ? t.states[B] : null, At = (St && !ze.has(String(St.state).toLowerCase()) ? B : O.entity_id) || O.entity_id, Se = !!(E && !ze.has(String(E.state).toLowerCase())), X = T.some(
      (z) => t.states[z.entity_id]?.state === "on"
    );
    u.push({
      id: m,
      deviceId: O.device_id || null,
      entityId: O.entity_id,
      entities: A.map((z) => z.entity_id),
      name: String(P.name_by_user || P.name || "").trim() || q || Te(t, O),
      areaId: N,
      areaName: q,
      online: Se,
      active: X,
      streamEntityId: At,
      switches: k,
      detections: T,
      classifications: V,
      actions: H,
      ptz: U
    });
  }
  u.sort(
    (m, _) => m.name.localeCompare(_.name, void 0, { sensitivity: "base" })
  );
  const l = [];
  for (const m of d) {
    const _ = D(m.entity_id), A = t.states[m.entity_id], O = A?.attributes?.device_class || "";
    if (!(_ === "binary_sensor" && /^(door|window|garage_door|opening)$/.test(O) || _ === "lock" || _ === "cover" && /^(door|garage)$/.test(O))) continue;
    const N = m.device_id ? h.get(m.device_id) || [] : [], k = i.mappings?.[`entry_control:${m.entity_id}`] || N.filter((V) => D(V.entity_id) === "button").sort(
      (V, H) => (Oe(V) === "operate" ? -1 : 1) - (Oe(H) === "operate" ? -1 : 1)
    )[0]?.entity_id || null, T = _ === "lock" ? A.state === "unlocked" : /^(on|open|opening)$/.test(A.state);
    l.push({
      entityId: m.entity_id,
      deviceId: m.device_id || null,
      controlEntityId: k,
      domain: _,
      deviceClass: O,
      name: Te(t, m),
      state: A.state,
      open: T,
      available: !ze.has(String(A.state).toLowerCase()),
      areaId: ct(m, e)
    });
  }
  l.sort(
    (m, _) => m.name.localeCompare(_.name, void 0, { sensitivity: "base" })
  );
  const v = /* @__PURE__ */ new Map([
    ["automation", "trigger"],
    ["scene", "turn_on"],
    ["script", "turn_on"]
  ]), p = Object.entries(
    i.mappings || {}
  ).flatMap(([m, _]) => {
    if (!m.startsWith("quick_action:")) return [];
    const A = D(_), O = v.get(A), E = t?.states?.[_];
    if (!O || !E) return [];
    const P = (e?.entities || []).find(
      (N) => N.entity_id === _
    ) || {
      entity_id: _
    };
    return [
      {
        id: m.slice(13),
        entityId: _,
        domain: A,
        service: O,
        name: Te(t, P),
        icon: E.attributes?.icon || (A === "script" ? "mdi:script-text-outline" : A === "scene" ? "mdi:palette-outline" : "mdi:robot-outline"),
        available: !ze.has(String(E.state).toLowerCase())
      }
    ];
  });
  p.sort(
    (m, _) => m.name.localeCompare(_.name, void 0, { sensitivity: "base" })
  );
  const g = [
    ...u.filter((m) => !m.online).map((m) => ({
      type: "camera-offline",
      label: `${m.name} unavailable`,
      entityId: m.entityId
    })),
    ...u.filter((m) => m.active).map((m) => ({
      type: "camera-activity",
      label: `${m.name} activity`,
      entityId: m.entityId
    })),
    ...l.filter((m) => m.available && m.open).map((m) => ({
      type: "entry-open",
      label: `${m.name} open`,
      entityId: m.entityId
    }))
  ];
  return {
    error: null,
    cameras: u,
    entries: l,
    quickActions: p,
    attention: g,
    allClear: g.length === 0,
    onlineCameras: u.filter((m) => m.online).length
  };
}, ye = async (t, e = "household-security", i = {}) => {
  const [s, r] = await Promise.all([
    on.get(t, "security", e, i).catch((a) => ({ found: !1, profile: null, error: a })),
    L.load(t)
  ]);
  return s?.found ? {
    ...ln(t, r, s.profile || {}),
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
}, zi = D, As = /* @__PURE__ */ new Set(["unknown", "unavailable", "none", ""]), ar = (t) => String(
  t?.original_name || t?.name || t?.entity_id || ""
).toLowerCase();
let Es = !1;
const dn = () => {
  Es || (Es = !0, Ws((t) => t?.platform !== "wled" ? !0 : D(t.entity_id) !== "light" ? !1 : ar(t) === "main" || !/_\d+$/.test(String(t.unique_id || ""))), Zs((t) => t?.platform !== "wled" || D(t.entity_id) !== "light" ? null : {
    type: "custom:component-wled-controller-v1",
    entity: t.entity_id,
    device_id: t.device_id
  }), L.refresh());
};
dn();
const pn = [
  st,
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
var hn = Object.getOwnPropertyDescriptor, un = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? hn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const mn = {
  type: "custom:component-action-v2",
  title: "Action title",
  description: "What this action will do",
  action_text: "Open",
  icon: "mdi:gesture-tap-button",
  navigation_path: null,
  entity: null,
  more_info_entity: null
};
let je = class extends C {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...mn, ...t });
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
je.styles = pn;
je = un([
  $("component-action-v2")
], je);
S({
  type: "component-action-v2",
  element: je,
  name: "Action Card",
  description: "Reusable navigation and more-info action card."
});
const fn = w`
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
var gn = Object.getOwnPropertyDescriptor, _n = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? gn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const vn = {
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
let Ue = class extends C {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...vn, ...t });
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
    const t = this._getAction(), e = [1, 2, 3].map((s) => {
      const r = this._config[`center_${s}_label`], n = this._config[`center_${s}_value`];
      return o`
        <span class="item">
          <span class="lab">${this.esc(r)}</span>
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
Ue.styles = fn;
Ue = _n([
  $("component-context-strip-v3")
], Ue);
S({
  type: "component-context-strip-v3",
  element: Ue,
  name: "Context Strip",
  description: "Reusable context and metric strip component."
});
const bn = [
  Wi,
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
var yn = Object.getOwnPropertyDescriptor, or = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? yn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const xn = {
  type: "custom:component-empty-state-v3",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let Be = class extends C {
  setConfig(t) {
    super.setConfig({ ...xn, ...t });
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
Be.styles = bn;
Be = or([
  $("component-empty-state-v3")
], Be);
S({
  type: "component-empty-state-v3",
  element: Be,
  name: "Empty State",
  description: "Reusable empty-state component."
});
const wn = {
  type: "custom:component-empty-state-v2",
  icon: "mdi:check-circle-outline",
  title: "Nothing requires attention",
  message: "Supporting empty-state message."
};
let Fe = class extends C {
  setConfig(t) {
    super.setConfig({ ...wn, ...t });
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
Fe.styles = [
  R,
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
Fe = or([
  $("component-empty-state-v2")
], Fe);
S({
  type: "component-empty-state-v2",
  element: Fe,
  name: "Empty State V2",
  description: "Reusable compact empty-state component."
});
const $n = [
  st,
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
var Cn = Object.getOwnPropertyDescriptor, kn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Cn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const Sn = {
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
let Ve = class extends C {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Sn, ...t });
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
        const n = this._getRowActions(r);
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
      const s = this._getRowActions(e), r = o`
              <span>
                <div class="title">${this.esc(e.title)}</div>
                <div class="desc">${this.esc(e.description)}</div>
              </span>
              <span class="metric">
                <b>${this.esc(e.value)}</b>${this.esc(e.label)}
              </span>
            `;
      return s.primary ? o`
                  <button class="row" data-index="${i}" type="button">
                    ${r}
                  </button>
                ` : o`<div class="row" data-index="${i}">${r}</div>`;
    })}
        </div>
      </ha-card>
    `;
  }
};
Ve.styles = $n;
Ve = kn([
  $("component-list-v2")
], Ve);
S({
  type: "component-list-v2",
  element: Ve,
  name: "List / Ranking",
  description: "Reusable list and ranking component."
});
const An = [
  st,
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
var En = Object.getOwnPropertyDescriptor, zn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? En(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const Tn = {
  type: "custom:component-notice-v2",
  title: "Notice title",
  message: "Important supporting information appears here.",
  tone: "info",
  icon: "mdi:information-outline",
  entity: null,
  navigation_path: null
};
let We = class extends C {
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
We.styles = An;
We = zn([
  $("component-notice-v2")
], We);
S({
  type: "component-notice-v2",
  element: We,
  name: "Alert / Notice",
  description: "Reusable alert and notice component."
});
const On = [
  st,
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
var Dn = Object.getOwnPropertyDescriptor, Pn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Dn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const Hn = {
  type: "custom:component-progress-v2",
  value: "68%",
  label: "Progress metric",
  progress: 68,
  target_value: "100%",
  target_label: "Target",
  entity: null,
  navigation_path: null
};
let Ge = class extends C {
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
Ge.styles = On;
Ge = Pn([
  $("component-progress-v2")
], Ge);
S({
  type: "component-progress-v2",
  element: Ge,
  name: "Progress / Target",
  description: "Reusable progress and target component."
});
const Rn = [
  R,
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
var Nn = Object.getOwnPropertyDescriptor, Ln = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Nn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
let Ke = class extends C {
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
Ke.styles = Rn;
Ke = Ln([
  $("component-section-separator-v2")
], Ke);
S({
  type: "component-section-separator-v2",
  element: Ke,
  name: "Section Separator",
  description: "Reusable section separator component."
});
const qn = [
  st,
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
var Mn = Object.getOwnPropertyDescriptor, In = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Mn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const jn = {
  type: "custom:component-single-kpi-v2",
  value: "00",
  label: "Primary metric",
  support_value: "00",
  support_label: "Supporting context",
  interactive: !0,
  entity: null,
  navigation_path: null
};
let Qe = class extends C {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...jn, ...t });
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
Qe.styles = qn;
Qe = In([
  $("component-single-kpi-v2")
], Qe);
S({
  type: "component-single-kpi-v2",
  element: Qe,
  name: "Single KPI",
  description: "Reusable single KPI component."
});
const Un = [
  st,
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
var Bn = Object.getOwnPropertyDescriptor, Fn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Bn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const Vn = {
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
let Ye = class extends C {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Vn, ...t });
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
Ye.styles = Un;
Ye = Fn([
  $("component-status-row-v2")
], Ye);
S({
  type: "component-status-row-v2",
  element: Ye,
  name: "Status Row",
  description: "Reusable status row component."
});
const Wn = w`
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
var Gn = Object.getOwnPropertyDescriptor, Kn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Gn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const Qn = {
  type: "custom:component-text-effect-v1",
  effect: "stamp",
  description: "",
  icon: null,
  speed: 2.6
};
let Xe = class extends C {
  constructor() {
    super(...arguments), this._settleTimer = null;
  }
  setConfig(t) {
    if (!t?.text)
      throw new Error("text is required");
    super.setConfig({ ...Qn, ...t });
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
Xe.styles = Wn;
Xe = Kn([
  $("component-text-effect-v1")
], Xe);
S({
  type: "component-text-effect-v1",
  element: Xe,
  name: "Signature Text Effect",
  description: "Reusable transient-status effects using the existing signature motion language."
});
const Yn = [
  st,
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
var Xn = Object.getOwnPropertyDescriptor, Zn = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Xn(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const Jn = {
  type: "custom:component-three-stat-v2",
  metric_1_value: "00",
  metric_1_label: "Metric one",
  metric_2_value: "00",
  metric_2_label: "Metric two",
  metric_3_value: "00",
  metric_3_label: "Metric three",
  interactive: !0
};
let Ze = class extends C {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Jn, ...t });
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
        x(e, { primary: s, feedback: !0 })
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
      const i = this._config[`metric_${e}_value`], s = this._config[`metric_${e}_label`], r = this._getAction(e), n = o`
        <div class="value">${this.esc(i)}</div>
        <div class="label">${this.esc(s)}</div>
      `;
      return r ? o`<button class="stat" data-index="${e}" type="button">
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
Ze.styles = Yn;
Ze = Zn([
  $("component-three-stat-v2")
], Ze);
S({
  type: "component-three-stat-v2",
  element: Ze,
  name: "Three-stat Summary",
  description: "Reusable three-stat summary component."
});
const ta = [
  R,
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
var ea = Object.getOwnPropertyDescriptor, ia = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ea(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const sa = {
  type: "custom:component-nav-tile-v2",
  icon: "mdi:door-open",
  title: "Destination",
  context: "Navigation",
  navigation_path: null
};
let Je = class extends C {
  constructor() {
    super(...arguments), this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...sa, ...t });
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
Je.styles = ta;
Je = ia([
  $("component-nav-tile-v2")
], Je);
S({
  type: "component-nav-tile-v2",
  element: Je,
  name: "Navigation Tile",
  description: "Reusable navigation tile component."
});
const ra = [
  R,
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
var na = Object.getOwnPropertyDescriptor, aa = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? na(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const oa = {
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
let ti = class extends C {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...oa, ...t });
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
ti.styles = ra;
ti = aa([
  $("component-quick-nav-v2")
], ti);
S({
  type: "component-quick-nav-v2",
  element: ti,
  name: "Quick Navigation",
  description: "Reusable quick navigation component."
});
const ca = w`
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
var la = Object.defineProperty, da = Object.getOwnPropertyDescriptor, cr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? da(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && la(e, i, r), r;
};
const pa = {
  type: "custom:component-room-navigation-v1",
  name: "Room",
  icon: "mdi:home-outline"
};
let ce = class extends C {
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
    super.setConfig({ ...pa, ...t }), this.hass && L.load(this.hass).then((e) => {
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
    const e = rr(t, this._registries, this.hass);
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
    t && this._config?.navigation_path ? (this._interactionHandle?.destroy(), this._interactionHandle = x(t, {
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
ce.styles = ca;
cr([
  b()
], ce.prototype, "_registries", 2);
ce = cr([
  $("component-room-navigation-v1")
], ce);
S({
  type: "component-room-navigation-v1",
  element: ce,
  name: "Room Navigation",
  description: "Area-aware room navigation with presence status."
});
const ha = [
  R,
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
var ua = Object.getOwnPropertyDescriptor, ma = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ua(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const fa = {
  type: "custom:component-room-sheet-v2",
  icon: "mdi:bed-king-outline",
  title: "Room name",
  rows: null
}, zs = [
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
let ei = class extends C {
  constructor() {
    super(...arguments), this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...fa, ...t });
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
    this._interactionHandles = [], (Array.isArray(this._config?.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : zs).forEach((e, i) => {
      const s = this._getAction(e);
      if (!s) return;
      const r = this.renderRoot.querySelector(
        `[data-row="${i}"]`
      );
      r && (r.setAttribute(
        "aria-label",
        e.aria_label || `${e.name || "Room control"}`
      ), this._interactionHandles.push(
        x(r, {
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
    const t = Array.isArray(this._config.rows) && this._config.rows.length ? this._config.rows.slice(0, 8) : zs;
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
      const r = i.section || "Controls", n = r !== e;
      n && (e = r);
      const a = this._getAction(i);
      return o`
                ${n ? o`<div class="sep">${this.esc(r)}</div>` : ""}
                ${a ? o`
                        <button
                          class="row actionable"
                          data-row="${s}"
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
                        <div class="row" data-row="${s}">
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
ei.styles = ha;
ei = ma([
  $("component-room-sheet-v2")
], ei);
S({
  type: "component-room-sheet-v2",
  element: ei,
  name: "Room Sheet",
  description: "Reusable room-sheet component."
});
const ga = [
  R,
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
var _a = Object.defineProperty, va = Object.getOwnPropertyDescriptor, Yi = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? va(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && _a(e, i, r), r;
};
const ba = {
  type: "custom:component-control-row-v2",
  icon: "mdi:lightbulb-outline",
  title: "Control name",
  state: "Current state",
  mode: "slider",
  value: 68,
  entity: null
};
let Lt = class extends C {
  constructor() {
    super(...arguments), this._on = !0, this._val = 68, this._interactionHandles = [], this._coalescer = null;
  }
  setConfig(t) {
    super.setConfig({ ...ba, ...t }), this._on = this._config?.on !== !1, this._val = Math.max(0, Math.min(100, Number(this._config?.value) || 68)), this._resetCoalescer();
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
      const s = Number(t.attributes?.min ?? 0), r = Number(t.attributes?.max ?? 100), n = Number(t.state);
      if (Number.isFinite(n) && Number.isFinite(s) && Number.isFinite(r) && r > s)
        return Math.max(0, Math.min(100, (n - s) / (r - s) * 100));
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
    return this._coalescer ? this._coalescer : (this._coalescer = Is(
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
      return this.hass.callService(i.domain, i.service, {
        entity_id: e,
        ...i.data || {},
        [r]: t
      });
    }
    const s = this._domain();
    if (s === "light")
      return t <= 0 ? this.hass.callService("light", "turn_off", { entity_id: e }) : this.hass.callService("light", "turn_on", {
        entity_id: e,
        brightness_pct: Math.round(t)
      });
    if (s === "fan")
      return this.hass.callService("fan", "set_percentage", {
        entity_id: e,
        percentage: Math.round(t)
      });
    if (s === "number" || s === "input_number") {
      const r = this._getState(), n = Number(r?.attributes?.min ?? 0), a = Number(r?.attributes?.max ?? 100), c = n + (a - n) * t / 100;
      return this.hass.callService(s, "set_value", { entity_id: e, value: c });
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
    !this._config?.entity || !this.hass || (await this.hass.callService("homeassistant", "toggle", {
      entity_id: this._config.entity
    }), await Me(
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
    const t = this._config?.mode || "slider", e = !!this._config?.entity, i = this._getState(), s = e ? this._available(i) : !0, r = e ? i?.state === "on" : this._on;
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
      const f = this.renderRoot.querySelector(
        ".live-slider"
      );
      f && (f.disabled = !s, f.oninput = () => {
        this._val = Number(f.value), this._updateSliderVisual(), this._sliderCoalescer().request(this._val);
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
        c.setAttribute("aria-pressed", String(r)), c.setAttribute(
          "aria-label",
          `${r ? "Turn off" : "Turn on"} ${this._config?.title}`
        );
        const d = c.querySelector(".switch");
        this._interactionHandles.push(
          x(c, {
            primary: () => this._toggle(r),
            hold: () => this.moreInfo(this._config?.entity),
            optimistic: {
              capture: () => r,
              apply: () => {
                const f = !r;
                this._on = f, c.setAttribute("aria-pressed", String(f)), d?.classList.toggle("on", f);
              },
              rollback: () => {
                this._on = r, c.setAttribute("aria-pressed", String(r)), d?.classList.toggle("on", r);
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
    const t = this._config.mode || "slider", e = !!this._config.entity, i = this._getState(), s = e ? this._available(i) : !0, r = e ? i?.state === "on" : this._on;
    t === "slider" && e && (this._val = this._sliderPercent(i));
    const n = t === "switch" ? o`<span class="switch ${r ? "on" : ""}"
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
                  ?disabled=${e && !s}
                >
                  ${d}
                </button>
              ` : o`<div class="row row-static">${d}</div>`}
      </ha-card>
    `;
  }
};
Lt.styles = ga;
Yi([
  b()
], Lt.prototype, "_on", 2);
Yi([
  b()
], Lt.prototype, "_val", 2);
Lt = Yi([
  $("component-control-row-v2")
], Lt);
S({
  type: "component-control-row-v2",
  element: Lt,
  name: "Control Row",
  description: "Reusable control-row component."
});
const ya = [
  R,
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
var xa = Object.defineProperty, wa = Object.getOwnPropertyDescriptor, gi = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? wa(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && xa(e, i, r), r;
};
const De = { pause: 1, previous: 16, next: 32, play: 512 }, $a = {
  type: "custom:component-media-row-v2",
  icon: "mdi:speaker",
  title: "Media player",
  state: "Playing · Media title",
  entity: null
};
let yt = class extends C {
  constructor() {
    super(...arguments), this._playing = !0, this._optimisticPlaying = null, this._busy = !1, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...$a, ...t }), this._playing = !0, this._optimisticPlaying = null, this._busy = !1;
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
        }), await Me(
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
    const t = !!this._config?.entity, e = this._liveState(), s = t && this._available(e) ? e?.state === "playing" : this._playing;
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
    const r = this.renderRoot.querySelector(
      ".main"
    );
    r && (t ? this._interactionHandles.push(
      x(r, {
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
      x(r, {
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
    const t = this._liveState(), e = !!this._config.entity, i = e && this._available(t), s = i ? t?.state === "playing" : this._playing, r = this._optimisticPlaying ?? s, n = i && this._supported(t, De.previous), a = i && this._supported(t, De.next), c = !this._busy && (!e || i && this._supported(
      t,
      r ? De.pause : De.play
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
              aria-label="${r ? "Pause" : "Play"}"
              ?disabled=${!c}
            >
              <ha-icon icon="mdi:${r ? "pause" : "play"}"></ha-icon>
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
yt.styles = ya;
gi([
  b()
], yt.prototype, "_playing", 2);
gi([
  b()
], yt.prototype, "_optimisticPlaying", 2);
gi([
  b()
], yt.prototype, "_busy", 2);
yt = gi([
  $("component-media-row-v2")
], yt);
S({
  type: "component-media-row-v2",
  element: yt,
  name: "Media Row",
  description: "Reusable media-row component."
});
const Ca = w`
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
var ka = Object.defineProperty, Sa = Object.getOwnPropertyDescriptor, Xi = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Sa(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && ka(e, i, r), r;
};
const Aa = "custom:auto-entities", Ts = (t) => JSON.parse(JSON.stringify(t));
let qt = class extends C {
  constructor() {
    super(...arguments), this._innerCard = null, this._innerError = !1, this._generation = 0, this._retryTimer = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (!t?.filter) throw new Error("An Auto-Entities filter is required");
    super.setConfig(Ts(t)), this._generation += 1, this._retryTimer && clearTimeout(this._retryTimer), this._retryTimer = null, this._buildCard();
  }
  getCardSize() {
    const t = !!this._config?.header?.title?.trim();
    return (typeof this._innerCard?.getCardSize == "function" && Number(this._innerCard.getCardSize()) || 1) + (t ? 1 : 0);
  }
  getLayoutOptions() {
    return this._innerCard?.getLayoutOptions?.() ?? {};
  }
  _cardConfig() {
    const t = Ts(
      this._config || {}
    ), e = t.exclude_invalid_states !== !1;
    delete t.header, delete t.exclude_invalid_states, t.type = Aa;
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
qt.styles = Ca;
Xi([
  b()
], qt.prototype, "_innerCard", 2);
Xi([
  b()
], qt.prototype, "_innerError", 2);
qt = Xi([
  $("component-device-aware-auto-entities-v1")
], qt);
S({
  type: "component-device-aware-auto-entities-v1",
  element: qt,
  name: "Device Aware Auto Entities",
  description: "Presentation wrapper for Auto-Entities collections."
});
const Ea = [
  st,
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
var za = Object.defineProperty, Ta = Object.getOwnPropertyDescriptor, Zi = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ta(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && za(e, i, r), r;
};
const Oa = {
  type: "custom:component-device-discovery-v2",
  demo: !1,
  refresh_seconds: 60,
  max_rows: 6
}, Da = [
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
let Mt = class extends C {
  constructor() {
    super(...arguments), this._flows = [], this._stateKind = "ready", this._timer = null, this._started = !1, this._loadGeneration = 0, this._interactionHandles = [];
  }
  setConfig(t) {
    const e = !!this._config?.demo;
    if (super.setConfig({ ...Oa, ...t }), this._config?.demo) {
      (!e || this._started) && (this._timer && clearInterval(this._timer), this._timer = null, this._started = !1, this._loadGeneration += 1), this._flows = Da, this._stateKind = "ready";
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
      x(t, { primary: () => this.load(), feedback: !0 })
    );
    const e = this.renderRoot.querySelector(
      "button.refresh"
    );
    e && this._interactionHandles.push(
      x(e, { primary: () => this.load(), feedback: !0 })
    ), this.renderRoot.querySelectorAll("button.row").forEach((s) => {
      this._interactionHandles.push(
        x(s, {
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
    const t = Math.max(1, Number(this._config.max_rows) || 6), e = this._flows.slice(0, t), i = Math.max(0, this._flows.length - e.length), s = this._flows.length === 0, r = s ? "No devices waiting" : `${this._flows.length} ${this._flows.length === 1 ? "device" : "devices"} found`, n = s ? "Home Assistant has no new setup suggestions." : "Home Assistant has setup suggestions ready to review.";
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
      const c = this._name(a), d = `${this._source(a.context?.source)} · ${a.handler}`, f = o`
              <span class="icon"
                ><ha-icon icon="mdi:plus-circle-outline"></ha-icon
              ></span>
              <span>
                <div class="title">${this.esc(c)}</div>
                <div class="description">${this.esc(d)}</div>
              </span>
              <span class="review" aria-hidden="true">Review</span>
            `;
      return this._config?.demo ? o`<div class="row">${f}</div>` : o`<button
                  class="row"
                  type="button"
                  aria-label="Review ${this.esc(c)}"
                >
                  ${f}
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
Mt.styles = Ea;
Zi([
  b()
], Mt.prototype, "_flows", 2);
Zi([
  b()
], Mt.prototype, "_stateKind", 2);
Mt = Zi([
  $("component-device-discovery-v2")
], Mt);
S({
  type: "component-device-discovery-v2",
  element: Mt,
  name: "Device Discovery",
  description: "Reusable device-discovery status component."
});
const Pa = [
  Wi,
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
var Ha = Object.defineProperty, Ra = Object.getOwnPropertyDescriptor, _i = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ra(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && Ha(e, i, r), r;
};
const Na = {
  type: "custom:component-update-row-v3",
  icon: "mdi:update",
  title: "Update name",
  current: "Current 1.0",
  available: "Available 1.1",
  action: "Update",
  confirm: !0,
  entity: null
};
let xt = class extends C {
  constructor() {
    super(...arguments), this._busy = !1, this._requested = !1, this._error = "", this._startTimer = null, this._errorTimer = null, this._interactionHandles = [];
  }
  setConfig(t) {
    super.setConfig({ ...Na, ...t });
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
    for (const s of this._interactionHandles) s.destroy();
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
    const t = this._data(), e = t.progress.active || this._busy || this._requested, i = t.missing || t.unavailable || !t.pending || e, s = this._error ? "Retry" : this._busy || this._requested ? "Starting…" : t.action, r = this._error ? this._error : `${t.current}${t.available ? ` · ${t.available}` : ""}`, n = e ? t.progress.determinate ? o`
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
        ${n}
      </ha-card>
    `;
  }
};
xt.styles = Pa;
_i([
  b()
], xt.prototype, "_busy", 2);
_i([
  b()
], xt.prototype, "_requested", 2);
_i([
  b()
], xt.prototype, "_error", 2);
xt = _i([
  $("component-update-row-v3")
], xt);
S({
  type: "component-update-row-v3",
  element: xt,
  name: "Update Row",
  description: "Reusable update row with live update support."
});
const La = [
  Wi,
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
var qa = Object.defineProperty, Ma = Object.getOwnPropertyDescriptor, Ji = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ma(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && qa(e, i, r), r;
};
const Ia = {
  type: "custom:component-update-summary-v3",
  count: "3",
  title: "updates available",
  message: "Review the items below before installing.",
  live_updates: !1,
  update_all: !1,
  confirm: !0
};
let It = class extends C {
  constructor() {
    super(...arguments), this._busy = !1, this._error = "", this._messageTimer = null, this._interactionHandle = null;
  }
  setConfig(t) {
    super.setConfig({ ...Ia, ...t });
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
      s.length && await this.hass.callService("update", "install", { entity_id: s });
      for (const r of i)
        t.some((n) => n.entity_id === r) && await this.hass.callService("update", "install", { entity_id: r });
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
It.styles = La;
Ji([
  b()
], It.prototype, "_busy", 2);
Ji([
  b()
], It.prototype, "_error", 2);
It = Ji([
  $("component-update-summary-v3")
], It);
S({
  type: "component-update-summary-v3",
  element: It,
  name: "Update Summary",
  description: "Reusable update summary with live update support."
});
const ja = w`
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
var Ua = Object.defineProperty, Ba = Object.getOwnPropertyDescriptor, lr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ba(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && Ua(e, i, r), r;
};
const Fa = Object.freeze([
  ["up", "Up", "mdi:chevron-up"],
  ["left", "Left", "mdi:chevron-left"],
  ["select", "Select", "mdi:radiobox-marked"],
  ["right", "Right", "mdi:chevron-right"],
  ["down", "Down", "mdi:chevron-down"]
]), Va = Object.freeze([
  ["menu", "Menu", "mdi:menu"],
  ["home", "Home", "mdi:home-outline"],
  ["top_menu", "Top Menu", "mdi:format-list-bulleted"]
]), Wa = (t) => ({
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
let le = class extends C {
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
      const s = i.createCardElement(
        Wa(this._config)
      );
      s.hass = this.hass, this._nativeCard = s;
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
      const s = i?.value;
      if (!s) return;
      e.text = s;
    } else t === "clear_keyboard_text" && i && (i.value = "");
    try {
      await this.hass.callService("apple_tv", t, e);
    } catch (s) {
      console.error(`Apple TV keyboard action failed: ${t}`, s);
    }
  }
  updated() {
    for (const s of this._interactionHandles) s.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll(
      ".remote button[data-cmd]"
    ).forEach((s) => {
      const r = s.dataset.cmd;
      r && this._interactionHandles.push(
        x(s, {
          primary: () => this._remoteCommand(r),
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
    const t = this._config.remote_entity, e = t && this.hass?.states?.[t], i = this._config.demo || !!(e && e.state !== "unavailable" && e.state !== "unknown"), s = !!(this._config.keyboard_entity && this._config.keyboard_config_entry_id), r = this._config.demo || s && this.hass?.states?.[this._config.keyboard_entity]?.state === "on", n = new Map(
      Fa.map((c) => [c[0], c])
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
      const [, d, f] = n.get(c);
      return o`
                        <button
                          class="${c === "select" ? "select" : "direction"}"
                          type="button"
                          data-cmd="${c}"
                          aria-label="${d}"
                          ?disabled=${!i}
                        >
                          <ha-icon icon="${f}"></ha-icon>
                        </button>
                      `;
    })}
                  </div>

                  <div class="utility">
                    ${Va.map(
      ([c, d, f]) => o`
                        <button
                          type="button"
                          data-cmd="${c}"
                          aria-label="${d}"
                          ?disabled=${!i}
                        >
                          <ha-icon icon="${f}"></ha-icon>
                          <span>${d}</span>
                        </button>
                      `
    )}
                  </div>

                  ${s ? o`
                          <div class="keyboard">
                            <input
                              type="text"
                              aria-label="Apple TV keyboard text"
                              placeholder="Type on Apple TV"
                              ?disabled=${!r}
                              @keydown=${(c) => {
      c.key === "Enter" && this._keyboardAction("set_keyboard_text");
    }}
                            />
                            <button
                              class="keyboard-set"
                              type="button"
                              aria-label="Set keyboard text"
                              ?disabled=${!r}
                            >
                              <ha-icon icon="mdi:keyboard"></ha-icon>
                            </button>
                            <button
                              class="keyboard-clear"
                              type="button"
                              aria-label="Clear keyboard text"
                              ?disabled=${!r}
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
le.styles = ja;
lr([
  b()
], le.prototype, "_nativeCard", 2);
le = lr([
  $("component-apple-tv-controller-v1")
], le);
S({
  type: "component-apple-tv-controller-v1",
  element: le,
  name: "Apple TV Controller",
  description: "Native Home Assistant media controls with an optional explicit Apple TV remote."
});
const Ga = w`
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
var Ka = Object.defineProperty, Qa = Object.getOwnPropertyDescriptor, xe = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Qa(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && Ka(e, i, r), r;
};
let tt = class extends C {
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
        const e = await ye(
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
      const i = e.entity.entity_id, s = this.hass?.states[i], r = s?.attributes?.entity_picture, n = s?.last_updated, a = n && new Date(n), c = a && Number.isFinite(a.getTime()) ? ai(this.hass, a, {
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
      const i = e.entity.entity_id, r = this.hass?.states[i]?.state === "on", n = this._confirmId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.role || "Control")}</span
                            >
                            <span class="control-state"
                              >${r ? "On" : "Off"}</span
                            >
                          </span>
                          <button
                            class="${r ? "on" : ""} ${n ? "confirm" : ""}"
                            type="button"
                            @click=${() => this._toggleSwitch(e, r)}
                          >
                            ${n ? "Confirm off" : r ? "On" : "Off"}
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
      const i = e.entity.entity_id, s = this._confirmId === i;
      return o`
                        <div class="control">
                          <span class="copy">
                            <span class="control-name"
                              >${this.esc(e.entity.name || e.entity.original_name || "Action")}</span
                            >
                            <span class="control-state">Available</span>
                          </span>
                          <button
                            class="${s ? "confirm" : ""}"
                            type="button"
                            @click=${() => this._pressAction(i)}
                          >
                            ${s ? "Confirm" : "Run"}
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
tt.stubConfig = { profile: "household-security" };
tt.styles = Ga;
xe([
  b()
], tt.prototype, "_model", 2);
xe([
  b()
], tt.prototype, "_camera", 2);
xe([
  b()
], tt.prototype, "_confirmId", 2);
tt = xe([
  $("component-camera-controller-v2")
], tt);
S({
  type: "component-camera-controller-v2",
  element: tt,
  name: "Camera Controller V2",
  description: "Platform-adapted camera controls with explicit state and protected destructive changes."
});
let Pi = class extends tt {
  setConfig(t) {
    super.setConfig({
      profile: "household-security",
      ...t,
      type: "custom:component-camera-controller-v1"
    });
  }
};
Pi = xe([
  $("component-camera-controller-v1")
], Pi);
S({
  type: "component-camera-controller-v1",
  element: Pi,
  name: "Camera Controller V1",
  description: "Legacy camera controller adapter registering custom:component-camera-controller-v1."
});
const Ya = [
  R,
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
var Xa = Object.defineProperty, Za = Object.getOwnPropertyDescriptor, we = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Za(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && Xa(e, i, r), r;
};
let dt = class extends C {
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
    const t = this._entityState(this._config?.entity), e = this._entityState(this._controlEntityId()), i = this._entityState(this._config?.availability_entity), s = !!this._config?.availability_entity && (!i || i.state !== "on") || !e || ws(e), r = String(t?.state || "unknown").toLowerCase(), n = r === "on" || r === "off", a = n && r === "off", c = n && r === "on", d = !t || ws(t);
    return {
      state: t,
      control: e,
      controllerUnavailable: s,
      stateUnavailable: d,
      known: n,
      closed: a,
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
      if (s = this._waitForConfirmation(e), s.catch(() => {
      }), await this.hass.callService("button", "press", {
        entity_id: this._controlEntityId()
      }), i !== this._requestGeneration) return;
      this._pendingLabel = e === "on" ? "Opening" : e === "off" ? "Closing" : "Waiting";
      const r = await s;
      if (i !== this._requestGeneration) return;
      this._setMessage(
        r === "off" ? "Closed confirmed." : r === "on" ? "Door movement confirmed." : "Garage state confirmed."
      );
    } catch (r) {
      if (i !== this._requestGeneration) return;
      this._cancelConfirmation(
        r instanceof Error ? r : new Error("Garage command failed")
      );
      const n = String(r?.message || "");
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
    const t = this._status(), i = (t.state?.attributes?.friendly_name || "").replace(/\s*Garage Door Status$/i, "").trim(), s = this._config.title || i || "Garage door", r = t.controllerUnavailable ? "Controller unavailable" : t.closed ? "Closed" : t.notClosed ? "Not closed" : t.stateUnavailable ? "Door state unavailable" : "Door state unknown", n = t.closed ? "Open" : "Trigger", a = t.controllerUnavailable || this._busy;
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
dt.styles = Ya;
we([
  b()
], dt.prototype, "_busy", 2);
we([
  b()
], dt.prototype, "_pendingLabel", 2);
we([
  b()
], dt.prototype, "_message", 2);
we([
  b()
], dt.prototype, "_messageType", 2);
dt = we([
  $("component-garage-door-controller-v1")
], dt);
S({
  type: "component-garage-door-controller-v1",
  element: dt,
  name: "Garage Door Controller",
  description: "A garage-door controller for a closed-position reed sensor and momentary operator trigger."
});
const Ja = [
  R,
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
var to = Object.defineProperty, eo = Object.getOwnPropertyDescriptor, dr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? eo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && to(e, i, r), r;
};
const Pe = (t) => !t || ["unknown", "unavailable"].includes(t.state), ft = (t) => String(t || "").replaceAll("_", " ").replace(/^./, (e) => e.toUpperCase()), Jt = (t) => Number.isFinite(Number(t)) ? Number(t).toFixed(Number(t) % 1 ? 1 : 0) + "°" : "—";
let de = class extends C {
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
    const e = this._state()?.attributes || {}, i = Number(e.temperature), s = Number(e.target_temp_step) || 0.5;
    if (Number.isFinite(i))
      return this._call("climate", "set_temperature", {
        entity_id: this._config?.entity,
        temperature: i + t * s
      });
  }
  _vanes() {
    return [
      ["Vertical", this._config?.vertical_vane_entity],
      ["Horizontal", this._config?.horizontal_vane_entity]
    ].flatMap(([e, i]) => {
      const s = this._state(i);
      return i && s && !Pe(s) ? [{ axis: e, entity: i, state: s }] : [];
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
      const s = this.renderRoot.querySelector(e);
      s && this._interactionHandles.push(
        x(s, { primary: i, feedback: !0 })
      );
    };
    t(".pw", () => this._power()), t(".sg", () => this._openPanel("settings")), t(".decrease", () => this._temperature(-1)), t(".increase", () => this._temperature(1)), t(".ma", () => this._openPanel("mode")), t(".fa", () => this._openPanel("fan")), t(".va", () => this._openPanel("vanes")), t(".ta", () => this._openPanel("timer"));
  }
  render() {
    if (!this._config) return o``;
    const t = this._state(), e = t?.attributes || {}, i = t && !Pe(t) && t.state !== "off", s = this._state(this._config.timer_entity), n = this._vanes().map((d) => `${d.axis.slice(0, 1)} ${ft(d.state.state)}`).join(" · "), a = this._config.title || e.friendly_name || "Split system", c = Pe(t) ? "Unavailable" : i ? ft(t?.state) : "Off";
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
              ?disabled=${Pe(t)}
            >
              <ha-icon icon="mdi:power"></ha-icon>
            </button>
          </div>

          <div class="ct">
            <div class="cr">
              <div class="rm">
                <span class="rv"
                  >${Jt(e.current_temperature)}</span
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
                  <div class="tv">${Jt(e.temperature)}</div>
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
                <span class="al">Mode · ${ft(t?.state)}</span>
              </button>
              <button
                class="a fa"
                type="button"
                data-panel="fan"
                aria-expanded="${String(this._activePanel === "fan")}"
              >
                <ha-icon icon="mdi:fan"></ha-icon>
                <span class="al">Fan · ${ft(e.fan_mode)}</span>
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
                        class="a ta ${s?.state === "active" ? "av" : ""}"
                        type="button"
                        data-panel="timer"
                        aria-expanded="${String(this._activePanel === "timer")}"
                      >
                        <ha-icon icon="mdi:timer-outline"></ha-icon>
                        <span class="al"
                          >${s?.state === "active" ? "Timer · Active" : "Timer"}</span
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
                <span>${ft(a)}</span>
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
                <span>${ft(a)}</span>
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
                      <span>${ft(c)}</span>
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
    const i = Number(e.min_temp), s = Number(e.max_temp), r = Number(e.target_temp_step) || 0.5;
    return o`
      <p class="fb">
        Native Home Assistant controls · ${Jt(i)}–${Jt(s)}
        · ${Jt(r)} steps
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
de.styles = Ja;
dr([
  b()
], de.prototype, "_activePanel", 2);
de = dr([
  $("component-split-controller-v4")
], de);
S({
  type: "component-split-controller-v4",
  element: de,
  name: "Split-System Controller",
  description: "Direct Home Assistant climate controls with the established Split System presentation."
});
const io = [
  R,
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
var so = Object.defineProperty, ro = Object.getOwnPropertyDescriptor, vi = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? ro(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && so(e, i, r), r;
};
let wt = class extends C {
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
    const e = (this._registries?.entities || []).find((_) => _.entity_id === this._config.entity), i = this._config.device_id || e?.device_id, r = ((i ? this._registries?.byDevice?.get(i) : []) || []).filter(
      (_) => _?.platform === "wled" && !_.disabled_by && this.hass?.states[_.entity_id]
    ), n = r.filter((_) => zi(_.entity_id) === "light"), a = n.find((_) => _.entity_id === this._config.entity) || n.find((_) => ar(_) === "main") || n[0], c = n.filter(
      (_) => Array.isArray(this.hass?.states[_.entity_id]?.attributes?.effect_list)
    ), d = r.filter(
      (_) => zi(_.entity_id) === "select"
    ), f = r.filter(
      (_) => zi(_.entity_id) === "number"
    ), h = (_, A) => A.test(`${_.entity_id} ${_.original_name || ""} ${_.name || ""}`), u = d.find((_) => h(_, /\bpreset\b/i)), l = d.filter(
      (_) => h(_, /color.?palette|colour.?palette/i)
    ), v = f.filter((_) => h(_, /\bspeed\b/i)), p = f.filter((_) => h(_, /\bintensity\b/i)), g = this._registries?.devices?.find((_) => _.id === i), m = g?.name_by_user || g?.name || this.hass?.states[a?.entity_id || ""]?.attributes?.friendly_name || "WLED";
    return {
      deviceId: i || void 0,
      deviceName: m,
      main: a?.entity_id || this._config.entity,
      effectLights: c.map((_) => _.entity_id),
      preset: u?.entity_id || null,
      palettes: l.map((_) => _.entity_id),
      speeds: v.map((_) => _.entity_id),
      intensities: p.map((_) => _.entity_id)
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
    await this.hass.callService("light", "toggle", { entity_id: t }), await Me(
      this.hass,
      t,
      (s) => s === (i ? "off" : "on"),
      { timeout: 9e3 }
    );
  }
  _getBrightnessCoalescer() {
    return this._brightnessCoalescer ? this._brightnessCoalescer : (this._brightnessCoalescer = Is(
      async (t) => {
        const e = this._bundle?.main;
        !e || !this.hass || (t <= 0 ? await this.hass.callService("light", "turn_off", { entity_id: e }) : await this.hass.callService("light", "turn_on", {
          entity_id: e,
          brightness: t
        }), await Me(
          this.hass,
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
      (s) => s != null && !As.has(String(s).toLowerCase())
    );
    return i.length ? i.every((s) => String(s) === String(i[0])) ? String(i[0]) : "Mixed" : null;
  }
  async _call(t, e, i, s = {}) {
    const r = [...new Set((i || []).filter(Boolean))];
    !this.hass || !r.length || await Promise.all(
      r.map(
        (n) => this.hass.callService(t, e, { entity_id: n, ...s })
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
    ), s = this.renderRoot.querySelector(
      ".colour"
    ), r = this.renderRoot.querySelector(
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
    ), s && this._interactionHandles.push(
      x(s, {
        primary: () => this.moreInfo(
          this._bundle?.effectLights?.[0] || this._bundle?.main
        ),
        feedback: !0
      })
    ), r && this._interactionHandles.push(
      x(r, {
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
    const e = this.hass.states[t.main], i = String(e?.state || "unavailable").toLowerCase(), s = i === "on", r = i === "on" || i === "off", n = s ? Number(e?.attributes?.brightness ?? 0) : 0, a = this._brightnessIntent ?? n, c = this._same(
      t.effectLights,
      (k) => k?.attributes?.effect
    ), d = this._same(t.palettes, (k) => k?.state), f = this._same(t.speeds, (k) => k?.state), h = this._same(t.intensities, (k) => k?.state), u = t.preset ? this.hass.states[t.preset] : null, l = u?.attributes?.options || [], v = s ? [
      this._pct(a),
      c && c !== "Mixed" ? c : null,
      d && d !== "Mixed" ? d : null
    ].filter(Boolean).join(" · ") : i === "unavailable" ? "Unavailable" : i === "unknown" ? "Unknown" : "Off", p = (k) => {
      const T = this.hass?.states?.[k];
      return !!(T && !As.has(String(T.state).toLowerCase()));
    }, g = !!(t.preset && p(t.preset)), m = t.effectLights.some(p), _ = t.palettes.some(p), A = t.speeds.some(p), O = t.intensities.some(p), P = t.effectLights.map((k) => this.hass?.states[k]).find(Boolean)?.attributes?.effect_list || [], q = t.palettes.map((k) => this.hass?.states[k]).find(Boolean)?.attributes?.options || [];
    return o`
      <ha-card>
        <div class="head ${s ? "on" : ""}">
          <span class="ico"
            ><ha-icon icon="mdi:led-strip-variant"></ha-icon
          ></span>
          <button class="identity" type="button">
            <span class="name">${this.esc(t.deviceName)}</span>
            <span class="status">${this.esc(v)}</span>
          </button>
          <button
            class="power"
            type="button"
            aria-label="Toggle WLED"
            ?disabled=${!r}
            aria-pressed="${String(s)}"
          >
            <ha-icon icon="mdi:power"></ha-icon>
          </button>
        </div>
        ${s ? o`
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
                      @input=${(k) => {
      const T = Number(k.target.value);
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
                      ?disabled=${!g}
                    >
                      <ha-icon icon="mdi:bookmark-multiple-outline"></ha-icon>
                      <span>Presets</span>
                    </button>
                    <button
                      class="action colour"
                      type="button"
                      ?disabled=${!m}
                    >
                      <ha-icon icon="mdi:palette-outline"></ha-icon>
                      <span>Colour</span>
                    </button>
                    <button
                      class="action advanced"
                      type="button"
                      ?disabled=${!(g || m || _ || A || O)}
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
        @click=${(k) => {
      const T = this.renderRoot.querySelector("dialog");
      k.target === T && T?.close();
    }}
      >
        <div class="sheet">
          <div class="sheet-head">
            <ha-icon icon="mdi:led-strip-variant"></ha-icon>
            <span class="sheet-title">
              <div class="sheet-name">${this.esc(t.deviceName)}</div>
              <div class="sheet-state">${this.esc(v)}</div>
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
                ${l.length ? l.map((k) => {
      const T = String(u?.state) === String(k);
      return o`
                          <button
                            class="preset-btn ${T ? "active" : ""}"
                            type="button"
                            title="${this.esc(k)}"
                            @click=${async () => {
        await this._call(
          "select",
          "select_option",
          t.preset ? [t.preset] : [],
          { option: k }
        ), this._closeDialog();
      }}
                          >
                            ${this.esc(k)}
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
                    ?disabled=${!m || !P.length}
                    @change=${(k) => {
      const T = k.target.value;
      T && this._call("light", "turn_on", t.effectLights, {
        effect: T
      });
    }}
                  >
                    ${!c || c === "Mixed" ? o`<option value="" selected>
                            ${c === "Mixed" ? "Mixed" : "Choose effect"}
                          </option>` : ""}
                    ${P.map(
      (k) => o`<option
                          value="${this.esc(k)}"
                          ?selected=${c === k}
                        >
                          ${this.esc(k)}
                        </option>`
    )}
                  </select>
                </label>

                <label class="field">
                  <span>Palette</span>
                  <select
                    class="palette"
                    ?disabled=${!_ || !q.length}
                    @change=${(k) => {
      const T = k.target.value;
      T && this._call("select", "select_option", t.palettes, {
        option: T
      });
    }}
                  >
                    ${!d || d === "Mixed" ? o`<option value="" selected>
                            ${d === "Mixed" ? "Mixed" : "Choose palette"}
                          </option>` : ""}
                    ${q.map(
      (k) => o`<option
                          value="${this.esc(k)}"
                          ?selected=${d === k}
                        >
                          ${this.esc(k)}
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
                      >${this.esc(f || "—")}</output
                    >
                  </span>
                  <input
                    class="speed"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    .value=${String(Number(f) || 0)}
                    ?disabled=${!A}
                    @change=${(k) => {
      const T = Number(k.target.value);
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
                      >${this.esc(h || "—")}</output
                    >
                  </span>
                  <input
                    class="intensity"
                    type="range"
                    min="0"
                    max="255"
                    step="1"
                    .value=${String(Number(h) || 0)}
                    ?disabled=${!O}
                    @change=${(k) => {
      const T = Number(k.target.value);
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
wt.styles = io;
vi([
  b()
], wt.prototype, "_registries", 2);
vi([
  b()
], wt.prototype, "_bundle", 2);
vi([
  b()
], wt.prototype, "_brightnessIntent", 2);
wt = vi([
  $("component-wled-controller-v1")
], wt);
S({
  type: "component-wled-controller-v1",
  element: wt,
  name: "WLED Controller V1",
  description: "Minimal WLED control with advanced settings sheet."
});
const no = [
  R,
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
var ao = Object.defineProperty, oo = Object.getOwnPropertyDescriptor, pr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? oo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && ao(e, i, r), r;
};
let jt = class extends C {
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
      const i = await ye(
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
    ) : e, s = i.filter((a) => a.online).length, r = this._model?.error ? "Unavailable" : `${s}/${i.length} online`, n = this._model?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : this._model?.error ? this._model.error.message || "Camera discovery is unavailable" : "No cameras available";
    return o`
      <ha-card>
        <div class="wrap">
          <div class="head">
            <h2>${this.esc(this._config.title || "Camera wall")}</h2>
            <span class="meta">${this.esc(r)}</span>
          </div>

          ${i.length === 0 ? o`<div class="empty">${this.esc(n)}</div>` : o`
                  <div class="grid">
                    ${i.map((a) => {
      const d = this.hass?.states[a.entityId]?.attributes?.entity_picture, f = d ? this.hass?.hassUrl ? this.hass.hassUrl(d) : d : "", h = f ? `${f}${f.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "";
      return o`
                        <article
                          class="tile ${a.online ? "" : "offline"} ${a.active ? "activity" : ""}"
                        >
                          <button
                            class="media"
                            type="button"
                            ?disabled=${!a.online}
                            aria-label="Open full live view for ${this.esc(a.name)}"
                            @click=${(u) => this._requestViewer(a, u.currentTarget)}
                          >
                            ${h ? o`
                                  <img
                                    class="snapshot ready"
                                    src="${h}"
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
                              @click=${(u) => this._requestViewer(a, u.currentTarget)}
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
                              @click=${(u) => this._requestControls(a, u.currentTarget)}
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
jt.stubConfig = { profile: "household-security", columns: 2 };
jt.styles = no;
pr([
  b()
], jt.prototype, "_model", 2);
jt = pr([
  $("component-security-camera-wall-v3")
], jt);
S({
  type: "component-security-camera-wall-v3",
  element: jt,
  name: "Security Camera Wall V3",
  description: "Snapshot-first, lazy live camera wall with capability-driven controls."
});
const co = [
  R,
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
var lo = Object.defineProperty, po = Object.getOwnPropertyDescriptor, $e = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? po(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && lo(e, i, r), r;
};
let et = class extends C {
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
      const i = await ye(
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
    const t = this._model || {}, e = this._config.cameras, i = t.cameras || [], s = e && e.length > 0 ? i.filter(
      (l) => e.includes(l.entityId) || l.deviceId && e.includes(l.deviceId) || e.includes(l.id)
    ) : i, r = this._config.entries, n = t.entries || [], a = r && r.length > 0 ? n.filter(
      (l) => r.includes(l.entityId) || l.deviceId && r.includes(l.deviceId)
    ) : n, c = t.quickActions || [], d = (t.attention || []).length, f = !!(t.error || t.profileError || t.profileMissing), h = s.reduce(
      (l, v) => l + (v.detections || []).filter(
        (p) => this.hass?.states?.[p.entity_id]?.state === "on"
      ).length,
      0
    ), u = a.filter((l) => l.available && l.open).length;
    return o`
      <div class="page">
        <section class="panel hero">
          <div class="hero-main">
            <span
              class="hero-icon ${d > 0 || f ? "attention" : ""}"
            >
              <ha-icon
                icon="${f || d > 0 ? "mdi:shield-alert-outline" : "mdi:shield-check-outline"}"
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
              class="metric ${s.length > 0 && (t.onlineCameras || 0) < s.length ? "attention" : ""}"
            >
              <ha-icon icon="mdi:cctv"></ha-icon>
              <span>${t.onlineCameras || 0}/${s.length} cameras</span>
            </span>
            <span class="metric ${h > 0 ? "attention" : ""}">
              <ha-icon icon="mdi:motion-sensor"></ha-icon>
              <span>${h} active</span>
            </span>
            <span class="metric ${u > 0 ? "attention" : ""}">
              <ha-icon icon="mdi:door"></ha-icon>
              <span>${u} open</span>
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
              >${s.filter((l) => l.online).length}/${s.length}
              online</span
            >
          </div>
          ${s.length === 0 ? o`<div class="empty">
                  No security cameras are configured
                </div>` : o`
                  <div class="camera-grid">
                    ${s.map((l) => {
      const p = this.hass?.states[l.entityId]?.attributes?.entity_picture, g = p ? this.hass?.hassUrl ? this.hass.hassUrl(p) : p : "", m = g ? `${g}${g.includes("?") ? "&" : "?"}_=${this._snapshotStamp}` : "", _ = l.classifications || [];
      return o`
                        <article class="camera">
                          <button
                            class="camera-media ${l.online ? "" : "offline"}"
                            type="button"
                            ?disabled=${!l.online}
                            aria-label="Open live view for ${this.esc(l.name)}"
                            @click=${() => this._openViewer(l)}
                          >
                            ${m ? o`<img
                                  src="${m}"
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
                              ${_.length ? `Recent: ${_.map((A) => A.name).join(" · ")}` : "No detection image entities"}
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
                              ?disabled=${!(_.length || l.detections?.length)}
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
                    <span class="section-meta">${u} open</span>
                  </div>
                  <div class="entries">
                    ${a.map((l) => {
      const v = this._entryConfirmId === l.entityId, p = !!(l.controlEntityId || l.domain === "lock" || l.domain === "cover"), g = l.domain === "lock" ? l.open ? "Lock" : "Unlock" : l.open ? "Close" : "Open";
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
                                      class="entry-operate ${v ? "confirm" : ""}"
                                      type="button"
                                      ?disabled=${!l.available}
                                      aria-label="${v ? "Confirm " + g : g} for ${this.esc(l.name)}"
                                      @click=${() => this._operateEntry(l)}
                                    >
                                      ${v ? "Confirm" : g}
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
      const v = this.renderRoot.querySelector(".viewer-dialog");
      l.target === v && this._closeViewer();
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
      const v = this.renderRoot.querySelector(".settings-dialog");
      l.target === v && this._closeSettings();
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
et.stubConfig = {
  profile: "household-security",
  camera_columns: 2
};
et.styles = co;
$e([
  b()
], et.prototype, "_model", 2);
$e([
  b()
], et.prototype, "_viewerCamera", 2);
$e([
  b()
], et.prototype, "_settingsCamera", 2);
$e([
  b()
], et.prototype, "_entryConfirmId", 2);
et = $e([
  $("component-security-dashboard-v1")
], et);
S({
  type: "component-security-dashboard-v1",
  element: et,
  name: "Security Dashboard V1",
  description: "Single-owner Security dashboard with on-demand live video, detections, controls, quick actions and entry points."
});
const ho = [
  R,
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
var uo = Object.defineProperty, mo = Object.getOwnPropertyDescriptor, hr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? mo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && uo(e, i, r), r;
};
let Ut = class extends C {
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
      const i = await ye(
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
      const i = this._entryIcon(e), s = this._entryStateText(e);
      return o`
            <button
              class="entry ${e.open ? "open" : ""}"
              type="button"
              data-entity-id="${e.entityId}"
              ?disabled=${!e.available}
              aria-label="${this.esc(e.name)}, ${this.esc(s)}. Open details."
            >
              <span class="icon">
                <ha-icon icon="${i}"></ha-icon>
              </span>
              <span class="copy">
                <span class="name">${this.esc(e.name)}</span>
                <span class="state">${this.esc(s)}</span>
              </span>
            </button>
          `;
    })}
      </div>
    `;
  }
};
Ut.stubConfig = { profile: "household-security" };
Ut.styles = ho;
hr([
  b()
], Ut.prototype, "_model", 2);
Ut = hr([
  $("component-security-entry-points-v1")
], Ut);
S({
  type: "component-security-entry-points-v1",
  element: Ut,
  name: "Security Entry Points V1",
  description: "Capability-driven garage, door, window and lock status using the shared garage controller where available."
});
const fo = [
  R,
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
var go = Object.defineProperty, _o = Object.getOwnPropertyDescriptor, ur = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? _o(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && go(e, i, r), r;
};
let Bt = class extends C {
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
      const i = await ye(
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
    const t = this._model, e = t?.error || t?.profileError, i = !e && !!t?.allClear, s = this._config.title || "Security", r = t?.profileMissing ? `Configure ${this._config.profile || "household-security"} in HA Component Backend` : e ? e.message || "Security status is unavailable" : i ? "All clear" : `${t?.attention?.length || 0} item${(t?.attention?.length || 0) === 1 ? "" : "s"} need attention`, n = e ? "Unavailable" : `${t?.onlineCameras || 0}/${t?.cameras?.length || 0} cameras online`, a = (t?.attention || []).slice(0, 4);
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
Bt.stubConfig = { profile: "household-security" };
Bt.styles = fo;
ur([
  b()
], Bt.prototype, "_model", 2);
Bt = ur([
  $("component-security-summary-v1")
], Bt);
S({
  type: "component-security-summary-v1",
  element: Bt,
  name: "Security Summary V1",
  description: "Exception-first all-clear and attention summary discovered from Home Assistant capabilities."
});
const vo = w`
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
`, bo = [
  R,
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
var yo = Object.defineProperty, xo = Object.getOwnPropertyDescriptor, mr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? xo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && yo(e, i, r), r;
};
let Ft = class extends C {
  constructor() {
    super(...arguments), this._selected = M.today(), this._unsubscribe = null, this._interactionHandles = [];
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
    this._selected = M.get(i, this.hass), this.isConnected && e !== i && (this._unsubscribe?.(), this._unsubscribe = M.subscribe(
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
    return this._selected === M.today(this.hass);
  }
  _setDay(t) {
    this._selected = M.set(
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
    super.connectedCallback(), this._unsubscribe || (this._unsubscribe = M.subscribe(
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
    ), s && this._interactionHandles.push(
      x(s, {
        primary: () => this._setDay(M.today(this.hass)),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._isToday(), e = M.today(this.hass), i = oi(this.hass, this._selected, {
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
Ft.stubConfig = { channel: "energy-day" };
Ft.styles = bo;
mr([
  b()
], Ft.prototype, "_selected", 2);
Ft = mr([
  $("component-energy-day-selector-v1")
], Ft);
S({
  type: "component-energy-day-selector-v1",
  element: Ft,
  name: "Energy Day Selector",
  description: "Stable selected-day control shared by every Energy card."
});
const wo = [
  R,
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
var $o = Object.defineProperty, Co = Object.getOwnPropertyDescriptor, Ce = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Co(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && $o(e, i, r), r;
};
let it = class extends C {
  constructor() {
    super(...arguments), this._data = null, this._error = null, this._loading = !1, this._day = M.today(), this._sequence = 0, this._dayUnsub = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === (this._config?.profile || "household-energy") && (this.hass && Ie.invalidateProfile(
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
    this._day = M.get(i, this.hass), this.isConnected && e !== i && (this._dayUnsub?.(), this._dayUnsub = M.subscribe(
      i,
      (s) => {
        s.day !== this._day && (this._day = s.day, this._load());
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
    ), this._dayUnsub || (this._dayUnsub = M.subscribe(
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
      const i = await Ie.get(
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
      const s = this.renderRoot.querySelector(e);
      s && this._interactionHandles.push(
        x(s, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house", "sensor.ha_component_house_power"), t(".solar", "sensor.ha_component_solar_power"), t(".grid", "sensor.ha_component_grid_power");
  }
  render() {
    if (!this._config) return o``;
    const t = this._data, e = this._day === M.today(this.hass), i = e ? "Today" : oi(this.hass, this._day, {
      weekday: "short",
      day: "numeric",
      month: "short"
    }), s = t?.grid_w == null ? Number.NaN : Number(t.grid_w), r = Number.isFinite(s) ? s > 15 ? "Importing now" : s < -15 ? "Exporting now" : "Grid balanced" : "Grid unavailable", n = Number(t?.coverage), a = this._error ? /unknown energy profile/i.test(this._error.message || "") ? `Configure ${this._config.profile || "household-energy"} in HA Component Backend` : this._error.message || "Energy data is unavailable" : this._loading ? this._data ? "Updating…" : "Loading Energy data…" : t?.stale ? "Showing the last successful update" : Number.isFinite(n) && n < 1 ? `${Math.round(n * 100)}% of source data available` : "";
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
              aria-label="House power now: ${Z(this.hass, t?.house_w)}"
            >
              <span class="value"
                >${Z(this.hass, t?.house_w)}</span
              >
              <span class="label">House now</span>
            </button>
            <button
              class="metric solar"
              type="button"
              aria-label="Solar power now: ${Z(this.hass, t?.solar_w)}"
            >
              <span class="value"
                >${Z(this.hass, t?.solar_w)}</span
              >
              <span class="label">Solar now</span>
            </button>
            <button
              class="metric grid"
              type="button"
              aria-label="Grid power now: ${Z(this.hass, t?.grid_w, { absolute: !0 })}, ${r}"
            >
              <span class="value"
                >${Z(this.hass, t?.grid_w, { absolute: !0 })}</span
              >
              <span class="label">${this.esc(r)}</span>
            </button>
          </div>

          <div class="daily">
            <button class="metric consumed" type="button" disabled>
              <span class="value"
                >${at(this.hass, t?.consumed_kwh)}</span
              >
              <span class="label">Consumed</span>
            </button>
            <button class="metric generated" type="button" disabled>
              <span class="value"
                >${at(this.hass, t?.generated_kwh)}</span
              >
              <span class="label">Generated</span>
            </button>
            <button class="metric imported" type="button" disabled>
              <span class="value"
                >${at(this.hass, t?.imported_kwh)}</span
              >
              <span class="label">Imported</span>
            </button>
            <button class="metric exported" type="button" disabled>
              <span class="value"
                >${at(this.hass, t?.exported_kwh)}</span
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
it.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
it.styles = wo;
Ce([
  b()
], it.prototype, "_data", 2);
Ce([
  b()
], it.prototype, "_error", 2);
Ce([
  b()
], it.prototype, "_loading", 2);
Ce([
  b()
], it.prototype, "_day", 2);
it = Ce([
  $("component-energy-summary-v1")
], it);
S({
  type: "component-energy-summary-v1",
  element: it,
  name: "Energy Summary V1",
  description: "Stable backend-driven live power and selected-day Energy totals."
});
const ko = [
  R,
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
var So = Object.defineProperty, Ao = Object.getOwnPropertyDescriptor, fr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Ao(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && So(e, i, r), r;
};
const Eo = {
  type: "custom:solar-daylight-card-v7",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let pe = class extends C {
  constructor() {
    super(...arguments), this._forecast = [], this._lastFetch = 0, this._pending = !1, this._failures = 0, this._retryAt = 0, this._interactionHandle = null;
  }
  setConfig(t) {
    const e = this._config?.weather_entity;
    super.setConfig({ ...Eo, ...t }), this._config?.weather_entity !== e && (this._forecast = [], this._lastFetch = 0), this._fetchForecast();
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
    return Number.isNaN(e.getTime()) ? "" : Ne(this.hass, e);
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
      const n = new Date(r.datetime || 0).getTime(), a = this._num(r.cloud_coverage);
      if (!Number.isFinite(n) || a === null) continue;
      const c = Math.abs(n - e);
      c < s && (s = c, i = a);
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
    const t = this._config.sun_entity || "sun.sun", e = this._config.weather_entity || "weather.forecast_home", i = this.hass?.states[t], s = this.hass?.states[e], r = !!(i && ["above_horizon", "below_horizon"].includes(i.state));
    let n = "Sun state unavailable", a = "";
    if (r)
      if (i?.state === "above_horizon") {
        const p = this._num(i.attributes?.elevation, 0), g = this._time(i.attributes?.next_setting);
        n = `Sun ${Math.round(p || 0)}°`, a = g ? `Sunset ${g}` : "Daylight";
      } else {
        const p = this._time(i?.attributes?.next_rising);
        n = "Night", a = p ? `Sunrise ${p}` : "Before sunrise";
      }
    const c = this._num(s?.attributes?.cloud_coverage), d = this._at(4), f = this._at(8), h = this._cloud(c), u = this._cloud(d), l = this._cloud(f), v = `${n}, cloud coverage ${h}, plus 4 hours ${u}, plus 8 hours ${l}, ${a}. Tap for sun details; hold for weather details.`;
    return o`
      <ha-card>
        <button type="button" aria-label="${this.esc(v)}">
          <span class="phase">${this.esc(n)}</span>
          <span class="clouds">
            <span class="cloud-item">
              <span class="cloud-label">Cloud Coverage</span>
              <span class="cloud-value now">${this.esc(h)}</span>
            </span>
            <span class="cloud-item">
              <span class="cloud-label">+4 Hours</span>
              <span class="cloud-value plus4">${this.esc(u)}</span>
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
pe.styles = ko;
fr([
  b()
], pe.prototype, "_forecast", 2);
pe = fr([
  $("solar-daylight-card-v7")
], pe);
S({
  type: "solar-daylight-card-v7",
  element: pe,
  name: "Solar Daylight Context",
  description: "Full-width sun context with centred current and forecast cloud coverage."
});
const zo = [
  R,
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
var To = Object.defineProperty, Oo = Object.getOwnPropertyDescriptor, bi = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Oo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && To(e, i, r), r;
};
const Do = {
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
let $t = class extends C {
  constructor() {
    super(...arguments), this._series = {}, this._loading = !1, this._selectedDay = null, this._start = 0, this._end = 0, this._lastRangeKey = null, this._forceRefresh = !1, this._fetchSequence = 0, this._dayUnsubscribe = null, this._pinned = !1, this._pointerState = null, this._resizeObserver = null, this._interactionHandles = [], this._profileListener = (t) => {
      t.detail?.kind === "energy" && t.detail?.profileId === this._config?.profile && (this.hass && this._config?.profile && Ie.invalidateProfile(this.hass, this._config.profile), this._forceRefresh = !0, this._lastRangeKey = null, this._fetchData());
    }, this._outsideListener = (t) => {
      this._pinned && !t.composedPath?.().includes(this) && (this._pinned = !1);
    };
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = { ...Do, ...t || {} };
    e.profile && (e.calendar_day = !0), super.setConfig(e), this._config?.day_channel && this.hass && (this._selectedDay = M.get(
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
    this._dayUnsubscribe?.(), this._dayUnsubscribe = null, !(!this._config?.calendar_day || !this._config?.day_channel) && (this._dayUnsubscribe = M.subscribe(
      this._config.day_channel,
      (t) => {
        t.day !== this._selectedDay && (this._selectedDay = t.day, this._lastRangeKey = null, this._fetchData());
      },
      { hass: this.hass }
    ));
  }
  _range() {
    if (this._config?.calendar_day) {
      const s = M.today(this.hass), r = this._selectedDay && this._selectedDay <= s ? this._selectedDay : s, n = Hs(this.hass, r), a = n?.start ?? Date.now() - 864e5, c = n?.end ?? Date.now();
      return { start: a, end: c, day: r, isToday: r === s };
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
    const s = this._forceRefresh;
    this._forceRefresh = !1;
    try {
      if (this._config.profile) {
        const r = await Ie.get(
          this.hass,
          this._config.profile,
          t.day,
          { force: s }
        );
        if (i !== this._fetchSequence) return;
        const n = Array.isArray(r?.series) ? r.series : [];
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
        }, this._start = Number(r?.range?.start) || t.start, this._end = Number(r?.range?.end) || t.end;
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
  _paths(t, e, i, s = null) {
    const r = [];
    let n = "", a = null, c = [];
    const d = () => {
      if (!c.length) return;
      const f = c.map(
        (h, u) => `${u ? "L" : "M"}${e(h.t).toFixed(1)},${i(h.v).toFixed(1)}`
      ).join(" ");
      if (r.push(f), s !== null) {
        const h = c[0], u = c[c.length - 1];
        n += `${f} L${e(u.t).toFixed(1)},${s.toFixed(1)} L${e(h.t).toFixed(1)},${s.toFixed(1)} Z `;
      }
      c = [];
    };
    for (const f of t || [])
      a !== null && f.t - a > 15 * 6e4 && d(), c.push(f), a = f.t;
    return d(), { line: r.join(" "), fill: n.trim() };
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [];
    const t = (e, i) => {
      const s = this.renderRoot.querySelector(e);
      s && i && this._interactionHandles.push(
        x(s, {
          primary: () => this.moreInfo(i),
          feedback: !0
        })
      );
    };
    t(".house-key", this._config?.house_entity), t(".solar-key", this._config?.solar_entity), t(".grid-key", this._config?.grid_entity);
  }
  render() {
    if (!this._config) return o``;
    const t = (this._series.house?.length || 0) > 0 || (this._series.solar?.length || 0) > 0 || (this._series.grid?.length || 0) > 0, e = this._config.calendar_day ? this._selectedDay === M.today(this.hass) ? "Today" : oi(this.hass, this._selectedDay || "", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }) : null, i = e ? `${e} · ${this._config.bucket_minutes || 10}-minute average` : `${this._config.bucket_minutes || 10}-minute average`, s = 800, r = 420, n = 58, a = 8, c = 6, d = Math.round(r * 0.7), f = d + 20, h = f + 18, u = r - 18, l = n, v = s - a, p = this._start || Date.now() - 864e5, g = this._end || Date.now(), m = (H) => l + (H - p) / (g - p) * (v - l), _ = [
      ...this._series.house || [],
      ...this._series.solar || []
    ].map((H) => Math.max(0, H.v)), A = this._niceMax(Math.max(1, ..._) * 1.06), O = (H) => d - Math.max(0, H) / A * (d - c), E = Math.max(
      100,
      ...(this._series.grid || []).map((H) => Math.abs(H.v))
    ), P = this._niceMax(E * 1.08), N = (h + u) / 2, q = (H) => N - H / P * ((u - h) / 2), k = this._paths(this._series.house, m, O), T = this._paths(this._series.solar, m, O, d), V = this._paths(this._series.grid, m, q);
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
      const U = A * (1 - H / 4), B = c + (d - c) * (H / 4);
      return o`
                  <line
                    class="gridline"
                    x1="${l}"
                    y1="${B}"
                    x2="${v}"
                    y2="${B}"
                  ></line>
                  <text
                    class="axis"
                    x="${l - 8}"
                    y="${B + 4}"
                    text-anchor="end"
                  >
                    ${Z(this.hass, U)}
                  </text>
                `;
    })}
              ${[0, 1, 2, 3, 4, 5, 6].map((H) => {
      const U = p + (g - p) * H / 6, B = m(U), At = new Date(U).getMinutes() === 0 ? Ne(this.hass, U, { minute: void 0 }) : Ne(this.hass, U);
      return o`
                  <text
                    class="axis"
                    x="${B}"
                    y="${f}"
                    text-anchor="${H === 0 ? "start" : H === 6 ? "end" : "middle"}"
                  >
                    ${At}
                  </text>
                `;
    })}

              <line
                class="zero"
                x1="${l}"
                y1="${N}"
                x2="${v}"
                y2="${N}"
              ></line>
              <text
                class="axis-small"
                x="${v - 2}"
                y="${h + 10}"
                text-anchor="end"
              >
                Import
              </text>
              <text
                class="axis-small"
                x="${v - 2}"
                y="${u - 3}"
                text-anchor="end"
              >
                Export
              </text>

              ${T.fill ? o`<path class="solar-fill" d="${T.fill}"></path>` : ""}
              ${T.line ? o`<path class="solar-line" d="${T.line}"></path>` : ""}
              ${k.line ? o`<path class="house-line" d="${k.line}"></path>` : ""}
              ${V.line ? o`<path class="grid-line" d="${V.line}"></path>` : ""}
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
$t.styles = zo;
bi([
  b()
], $t.prototype, "_series", 2);
bi([
  b()
], $t.prototype, "_loading", 2);
bi([
  b()
], $t.prototype, "_selectedDay", 2);
$t = bi([
  $("energy-history-card-v3")
], $t);
S({
  type: "energy-history-card-v3",
  element: $t,
  name: "Energy History",
  description: "Dense readable power history supporting rolling or local calendar-day ranges using completed 10-minute averages and a signed grid strip."
});
var Po = Object.getOwnPropertyDescriptor, Ho = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Po(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const Ro = {
  type: "custom:component-energy-dashboard-v1",
  profile: "household-energy",
  day_channel: "energy-day",
  weather_entity: "weather.forecast_home",
  sun_entity: "sun.sun"
};
let he = class extends C {
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...Ro, ...t });
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
he.stubConfig = {
  profile: "household-energy",
  day_channel: "energy-day"
};
he.styles = vo;
he = Ho([
  $("component-energy-dashboard-v1")
], he);
S({
  type: "component-energy-dashboard-v1",
  element: he,
  name: "Energy Dashboard V1",
  description: "Single-card Energy composition using shared day state and one backend data contract."
});
const No = [
  R,
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
var Lo = Object.defineProperty, qo = Object.getOwnPropertyDescriptor, ts = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? qo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && Lo(e, i, r), r;
};
const Mo = {
  type: "custom:component-history-graph-v2",
  meta_text: "Aggregation label",
  series_1_label: "Primary series",
  series_2_label: "Secondary series",
  series_3_label: "Supporting series",
  positive_label: "Positive",
  negative_label: "Negative"
};
let Vt = class extends C {
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
    super.setConfig({ ...Mo, ...t });
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
    const i = e.getBoundingClientRect(), s = Math.max(320, Math.round(i.width || 800)), r = s < 520 ? 48 : 58, n = 8, a = r, c = s - n, d = (t.clientX - i.left) * (s / i.width), f = Math.max(a, Math.min(c, d)), h = (f - a) / (c - a), u = Math.round(h * 100), l = [
      [
        1,
        this._config?.series_1_label || "Primary series",
        Math.round(20 + h * 80)
      ],
      [
        2,
        this._config?.series_2_label || "Secondary series",
        Math.round(75 - h * 45)
      ],
      [
        3,
        this._config?.series_3_label || "Supporting series",
        Math.round((h - 0.5) * 40)
      ]
    ].filter(([p]) => !this._hiddenSeries.has(Number(p))), v = `<div style="font-weight:650;margin-bottom:4px">${u}% through range</div>${l.map(
      ([, p, g]) => `<div class="tr"><span>${p}</span><b>${g}</b></div>`
    ).join("")}`;
    this._tooltip = {
      show: !0,
      text: v,
      x: f / s * i.width,
      y: Math.max(70, i.height * 0.42)
    };
  }
  render() {
    if (!this._config) return o``;
    const t = 800, e = 420, i = 58, s = 8, r = 6, n = Math.round(e * 0.7), a = n + 20, c = a + 18, d = e - 18, f = i, h = t - s, u = h - f, l = n - r, v = (c + d) / 2, p = (E, P) => `${(f + u * E).toFixed(1)},${(r + l * P).toFixed(1)}`, g = (E, P) => `${(f + u * E).toFixed(1)},${(v + (d - c) * 0.32 * P).toFixed(1)}`, m = `M${p(0, 0.68)} L${p(0.08, 0.61)} L${p(0.17, 0.7)} L${p(0.26, 0.38)} L${p(0.35, 0.52)} L${p(0.44, 0.24)} L${p(0.53, 0.43)} L${p(0.62, 0.35)} L${p(0.72, 0.63)} L${p(0.82, 0.48)} L${p(0.91, 0.59)} L${p(1, 0.44)}`, _ = `M${p(0, 0.86)} L${p(0.12, 0.75)} L${p(0.24, 0.52)} L${p(0.36, 0.42)} L${p(0.48, 0.55)} L${p(0.6, 0.72)} L${p(0.72, 0.82)} L${p(0.84, 0.91)} L${p(1, 0.94)}`, A = `M${g(0, 0.08)} L${g(0.1, -0.1)} L${g(0.2, 0.12)} L${g(0.3, -0.2)} L${g(0.4, 0.02)} L${g(0.5, -0.35)} L${g(0.6, 0.16)} L${g(0.7, 0.28)} L${g(0.8, -0.12)} L${g(0.9, 0.05)} L${g(1, -0.08)}`, O = `${_} L${h},${n} L${f},${n} Z`;
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
      const P = this._pointerState;
      !P || P.id !== E.pointerId || (this._pointerState = null, P.moved ? (this._pinned = !1, E.pointerType === "touch" && this._hideTip()) : this._pinned ? (this._pinned = !1, this._hideTip()) : (this._handlePointer(E), this._pinned = !0));
    }}
              @pointerleave=${() => {
      !this._pinned && !this._pointerState && this._hideTip();
    }}
            >
              ${["Max", "75%", "50%", "25%", "0"].map((E, P) => {
      const N = r + l * P / 4;
      return o`
                  <line
                    class="grid"
                    x1="${f}"
                    y1="${N}"
                    x2="${h}"
                    y2="${N}"
                  ></line>
                  <text
                    class="axis"
                    x="${f - 8}"
                    y="${N + 4}"
                    text-anchor="end"
                    >${E}</text
                  >
                `;
    })}
              ${["Start", "¼", "½", "¾", "End"].map((E, P) => {
      const N = f + u * P / 4;
      return o`
                  <text
                    class="axis"
                    x="${N}"
                    y="${a}"
                    text-anchor="${P === 0 ? "start" : P === 4 ? "end" : "middle"}"
                  >
                    ${E}
                  </text>
                `;
    })}
              <line
                class="zero"
                x1="${f}"
                y1="${v}"
                x2="${h}"
                y2="${v}"
              ></line>
              <text
                class="small"
                x="${h - 2}"
                y="${c + 10}"
                text-anchor="end"
              >
                ${this.esc(this._config.positive_label || "Positive")}
              </text>
              <text class="small" x="${h - 2}" y="${d - 3}" text-anchor="end">
                ${this.esc(this._config.negative_label || "Negative")}
              </text>

              ${this._hiddenSeries.has(2) ? "" : o`
                      <path class="f2" d="${O}"></path>
                      <path class="l2" d="${_}"></path>
                    `}
              ${this._hiddenSeries.has(1) ? "" : o`<path class="l1" d="${m}"></path>`}
              ${this._hiddenSeries.has(3) ? "" : o`<path class="l3" d="${A}"></path>`}
              ${this._tooltip.show ? o`<line
                      class="cursor"
                      x1="${this._tooltip.x}"
                      y1="${r}"
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
Vt.styles = No;
ts([
  b()
], Vt.prototype, "_hiddenSeries", 2);
ts([
  b()
], Vt.prototype, "_tooltip", 2);
Vt = ts([
  $("component-history-graph-v2")
], Vt);
S({
  type: "component-history-graph-v2",
  element: Vt,
  name: "History Graph",
  description: "Reusable interactive history graph component."
});
const Io = [
  R,
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
var jo = Object.defineProperty, Uo = Object.getOwnPropertyDescriptor, ke = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Uo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && jo(e, i, r), r;
};
const Bo = {
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
let pt = class extends C {
  constructor() {
    super(...arguments), this._selectedDay = M.today(), this._stats = {}, this._loading = !1, this._error = "", this._lastKey = null, this._interactionHandles = [];
  }
  _onDayChange(t) {
    !t || t === this._selectedDay || (this._selectedDay = t, this._error = "", this._lastKey = null, this._scheduleStats());
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    const e = this._config?.day_channel;
    if (super.setConfig({ ...Bo, ...t }), this.isConnected && e !== this._config?.day_channel) {
      this._dayUnsubscribe?.();
      const i = this._config?.day_channel || "energy-day";
      this._selectedDay = M.get(i, this.hass), this._dayUnsubscribe = M.subscribe(
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
    this._selectedDay = M.get(t, this.hass), this._dayUnsubscribe = M.subscribe(
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
    return this._selectedDay === M.today(this.hass);
  }
  _range() {
    const t = Hs(this.hass, this._selectedDay);
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
      for (const n of t.change) {
        const c = (s?.[n] || []).filter((d) => {
          const f = typeof d.start == "number" ? d.start : Date.parse(d.start);
          return Number.isFinite(f) && f >= i.start && f < i.end;
        }).map((d) => Number(d.change)).filter(Number.isFinite);
        r[n] = {
          change: c.length ? c.reduce((d, f) => d + f, 0) : null
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
      return at(this.hass, this._number(t.entity, "change"));
    if (e === "energy_kwh_day_sum") {
      if (!Array.isArray(t.entities) || !t.entities.length) return "—";
      let s = 0;
      for (const r of t.entities) {
        const n = this._number(r, "change");
        if (n === null) return "—";
        s += n;
      }
      return at(this.hass, s);
    }
    if (e === "energy_kwh_day_formula") {
      if (!Array.isArray(t.terms) || !t.terms.length) return "—";
      let s = 0;
      for (const r of t.terms) {
        const n = this._number(r?.entity, "change");
        if (n === null) return "—";
        s += n * (Number.isFinite(Number(r.factor)) ? Number(r.factor) : 1);
      }
      return at(this.hass, s);
    }
    if (["watts", "watts_abs"].includes(e))
      return Z(this.hass, this._liveNumber(t.entity), {
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
      x(t, {
        primary: () => this.moreInfo(i),
        feedback: !0
      })
    ), e && s && this._interactionHandles.push(
      x(e, {
        primary: () => this.moreInfo(s),
        feedback: !0
      })
    );
  }
  render() {
    if (!this._config) return o``;
    const t = this._resolve(this._config.left_value), e = this._resolve(this._config.left_label), i = this._resolve(this._config.right_value), s = this._resolve(this._config.right_label), r = this._resolve(this._config.right_primary), n = this._resolve(this._config.right_secondary), a = this._clickEntity("left"), c = this._clickEntity("right"), d = [e, t].filter(Boolean).join(": "), f = [i, s, r, n].filter(Boolean).join(" ");
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
            aria-label="${this.esc(f || "Right metric")}"
          >
            <div class="right-top">
              <span class="right-value">${this.esc(i)}</span>
              <span class="right-label">${this.esc(s)}</span>
            </div>
            <div class="right-bottom">
              <span class="right-primary">${this.esc(r)}</span>
              <span class="right-secondary">${this.esc(n)}</span>
            </div>
          </button>
        </div>
      </ha-card>
    `;
  }
};
pt.styles = Io;
ke([
  b()
], pt.prototype, "_selectedDay", 2);
ke([
  b()
], pt.prototype, "_stats", 2);
ke([
  b()
], pt.prototype, "_loading", 2);
ke([
  b()
], pt.prototype, "_error", 2);
pt = ke([
  $("metric-pair-card-v3")
], pt);
S({
  type: "metric-pair-card-v3",
  element: pt,
  name: "Metric Pair",
  description: "Live power metrics with selected-day energy totals."
});
const Fo = [
  R,
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
var Vo = Object.defineProperty, Wo = Object.getOwnPropertyDescriptor, yi = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Wo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && Vo(e, i, r), r;
};
const Ti = /* @__PURE__ */ new Set(["unavailable", "unknown"]);
let Ct = class extends C {
  constructor() {
    super(...arguments), this._selected = [], this._registry = null, this._interactionHandles = [], this._unsubRegistry = null;
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
    if (!t || Ti.has(String(t).toLowerCase())) return null;
    try {
      return this._normaliseRef(JSON.parse(t));
    } catch {
      return null;
    }
  }
  _buildRegistryIndex(t) {
    const e = t.entities || [], i = t.devices || [], s = t.areas || [], r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
    for (const a of e) {
      const c = this._entryKey(a);
      c && r.set(c, a), a.device_id && (n.has(a.device_id) || n.set(a.device_id, []), n.get(a.device_id).push(a));
    }
    this._registry = {
      entities: e,
      devices: new Map(i.map((a) => [a.id, a])),
      areas: new Map(s.map((a) => [a.area_id, a.name])),
      byKey: r,
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
      const i = t.state.attributes?.media_title, s = this._label(t.state.state);
      return i ? `${s} · ${i}` : s;
    }
    return this._label(t.state.state);
  }
  _label(t) {
    return String(t ?? "").replaceAll("_", " ").replace(/^./, (e) => e.toUpperCase());
  }
  _isActive(t) {
    if (!t.state || Ti.has(String(t.state.state).toLowerCase()))
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
    if (["light", "switch", "fan", "input_boolean"].includes(r))
      await this.hass?.callService("homeassistant", "toggle", {
        entity_id: s
      });
    else if (["automation", "script", "scene"].includes(r)) {
      const n = r === "automation" ? "trigger" : "turn_on";
      await this.hass?.callService(r, n, { entity_id: s });
    } else ["button", "input_button"].includes(r) ? await this.hass?.callService(r, "press", { entity_id: s }) : this.moreInfo(s);
  }
  updated() {
    for (const e of this._interactionHandles) e.destroy();
    this._interactionHandles = [], this.renderRoot.querySelectorAll(".item button.main").forEach((e, i) => {
      const s = this._record(this._selected[i]);
      this._interactionHandles.push(
        x(e, {
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
      const i = this._record(e), s = this._name(i), r = this._stateLabel(i), n = this._icon(i), a = this._isActive(i), c = !i.state || Ti.has(String(i.state.state).toLowerCase());
      return o`
                      <div
                        class="item ${a ? "active" : ""} ${c ? "unavailable" : ""}"
                      >
                        <button
                          class="main"
                          type="button"
                          ?disabled=${c}
                          aria-label="${s}: ${r}"
                        >
                          <span class="icon">
                            <ha-icon icon="${n}"></ha-icon>
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
};
Ct.stubConfig = { helpers: [], max: 4, title: "Favourites" };
Ct.styles = Fo;
yi([
  b()
], Ct.prototype, "_selected", 2);
yi([
  b()
], Ct.prototype, "_registry", 2);
Ct = yi([
  $("component-favourites-v3")
], Ct);
let ii = class extends C {
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
ii.styles = w`
    :host {
      display: block;
      min-width: 0;
    }
  `;
ii = yi([
  $("component-favourites-minimal-v1")
], ii);
S({
  type: "component-favourites-v3",
  element: Ct,
  name: "Favourites V3",
  description: "Stable household favourites with entity discovery and backend companion storage."
});
S({
  type: "component-favourites-minimal-v1",
  element: ii,
  name: "Favourites Minimal",
  description: "Existing favourites behaviour with restrained Home typography."
});
const Go = [
  R,
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
], Ko = [
  R,
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
var Qo = Object.getOwnPropertyDescriptor, Yo = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Qo(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const Xo = {
  type: "custom:component-welcome-header-v1",
  weather_entity: "weather.forecast_home"
};
let si = class extends C {
  constructor() {
    super(...arguments), this._cancelMinuteScheduler = null, this._interactionHandle = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    if (super.setConfig({ ...Xo, ...t }), !this._config?.weather_entity)
      throw new Error("weather_entity is required");
  }
  getCardSize() {
    return 1;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = Us(() => this.requestUpdate());
  }
  disconnectedCallback() {
    this._cancelMinuteScheduler?.(), this._cancelMinuteScheduler = null, this._interactionHandle?.destroy(), this._interactionHandle = null, super.disconnectedCallback();
  }
  _number(t, e = 0) {
    const i = Number(t);
    return Number.isFinite(i) ? Pt(this.hass, i, {
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
    const t = /* @__PURE__ */ new Date(), i = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, s = ni(this.hass), r = ri(this.hass), n = this._number(i.temperature, 1), a = this._number(i.cloud_coverage, 0), c = n === null ? "—" : `${n}${i.temperature_unit || "°C"}`, d = a === null ? "Cloud —" : `Cloud ${a}%`, f = new Intl.DateTimeFormat(r, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: s
    }).format(t), h = `Outside ${c}, ${d}. Open weather details.`;
    return o`
      <ha-card>
        <div class="row">
          <span class="time">${f}</span>
          <button
            class="weather"
            type="button"
            aria-label="${this.esc(h)}"
          >
            ${c} · ${d}
          </button>
        </div>
      </ha-card>
    `;
  }
};
si.styles = Ko;
si = Yo([
  $("component-welcome-header-v1")
], si);
S({
  type: "component-welcome-header-v1",
  element: si,
  name: "Welcome Header",
  description: "Compact live weather and home-time header."
});
const Zo = [
  R,
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
var Jo = Object.defineProperty, tc = Object.getOwnPropertyDescriptor, xi = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? tc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && Jo(e, i, r), r;
};
const ec = {
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
let kt = class extends C {
  constructor() {
    super(...arguments), this._registry = null, this._prefs = { order: [], hidden: [] }, this._renderedCards = [], this._cardElements = /* @__PURE__ */ new Map(), this._structureSig = "", this._gen = 0, this._unsubRegistry = null, this._activeStateSubscription = null, this._activeStateToken = null, this._activeStateConnection = null, this._activeStateRetry = null;
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
    super.setConfig({ ...ec, ...t }), this._structureSig = "", this.hass && (this._config?.pref_key && this._loadPrefs(), L.load(this.hass).then((e) => {
      this._registry = e, this._syncCards();
    }), this._syncCards());
  }
  getCardSize() {
    return 2;
  }
  connectedCallback() {
    super.connectedCallback(), !this._unsubRegistry && this.hass && (this._unsubRegistry = L.subscribe(this.hass, (t) => {
      this._registry = t, this._structureSig = "", this._syncCards();
    })), this._config?.pref_key && this._loadPrefs(), this._syncCards(), this._config?.mode === "active" && this._startActiveStateStream();
  }
  disconnectedCallback() {
    this._unsubRegistry?.(), this._unsubRegistry = null, this._stopActiveStateStream(), this._gen += 1, super.disconnectedCallback();
  }
  willUpdate(t) {
    if (super.willUpdate(t), t.has("hass") && this.hass) {
      for (const e of this._cardElements.values())
        e.el.hass = this.hass;
      this._registry || L.load(this.hass).then((e) => {
        this._registry = e, this._syncCards();
      }), this._syncCards(), this._config?.mode === "active" && this._startActiveStateStream();
    }
  }
  async _loadPrefs() {
    !this.hass || !this._config?.pref_key || (this._prefs = await er(this.hass, this._config.pref_key), this._structureSig = "", this._syncCards());
  }
  _stopActiveStateStream() {
    this._activeStateRetry && (clearTimeout(this._activeStateRetry), this._activeStateRetry = null), this._activeStateToken = null, this._activeStateConnection = null;
    const t = this._activeStateSubscription;
    this._activeStateSubscription = null, t && Promise.resolve(t).then((e) => e?.()).catch(() => {
    });
  }
  _handleActiveStateChanged(t) {
    if (this._config?.mode !== "active" || !this.hass) return;
    const i = (t?.data || t)?.entity_id;
    if (!i) return;
    const s = D(i);
    [
      "light",
      "fan",
      "switch",
      "input_boolean",
      "media_player",
      "climate",
      "cover",
      "lock",
      "vacuum",
      "binary_sensor"
    ].includes(s) && (this._structureSig = "", this._syncCards());
  }
  _startActiveStateStream() {
    if (this._config?.mode !== "active" || !this.isConnected) return;
    const t = this.hass?.connection;
    if (!t?.subscribeEvents || this._activeStateConnection === t && this._activeStateSubscription)
      return;
    this._stopActiveStateStream(), this._activeStateConnection = t;
    const e = {};
    this._activeStateToken = e;
    let i;
    try {
      i = t.subscribeEvents((s) => {
        this._activeStateToken === e && this._handleActiveStateChanged(s);
      }, "state_changed");
    } catch {
      i = Promise.reject(new Error("state subscription failed"));
    }
    this._activeStateSubscription = Promise.resolve(i).catch(() => {
      this._activeStateToken === e && (this._activeStateSubscription = null, this._activeStateRetry = setTimeout(() => {
        this._activeStateRetry = null, this._startActiveStateStream();
      }, 1e4));
    });
  }
  _isCameraOwner(t) {
    if (t?.platform !== "onvif" || D(t.entity_id) !== "camera")
      return !1;
    const e = `${t.entity_id} ${t.name || t.original_name || ""}`;
    return !/sub.?stream/i.test(e);
  }
  _isCameraDeviceActive(t) {
    return t?.device_id ? (this._registry?.byDevice?.get(t.device_id) || []).some(
      (e) => {
        if (D(e.entity_id) !== "binary_sensor") return !1;
        const i = this.hass?.states?.[e.entity_id], s = i?.attributes?.device_class || "", r = `${e.entity_id} ${e.name || e.original_name || ""}`;
        return i?.state === "on" && (/^(motion|occupancy|presence|sound)$/.test(s) || /motion|human|person|detect/i.test(r));
      }
    ) : !1;
  }
  _isGarageTrigger(t, e) {
    if (!t.device_id || !e.has(t.device_id) || D(t.entity_id) !== "button")
      return !1;
    const i = `${t.entity_id || ""} ${t.name || ""} ${t.original_name || ""}`.toLowerCase();
    return /(garage.?door|door).*(trigger|operate)|(trigger|operate).*(garage.?door|door)/.test(
      i
    );
  }
  _candidates() {
    if (!this.hass) return [];
    const t = this._registry && this._registry.entities.length > 0 ? this._registry.entities : Object.keys(this.hass.states).map((h) => ({
      entity_id: h,
      device_id: null,
      area_id: null,
      name: this.hass?.states[h]?.attributes?.friendly_name || h
    })), e = t.filter(
      (h) => _t(h, this.hass?.states[h.entity_id]) && D(h.entity_id) === "media_player" && this.hass?.states[h.entity_id]
    ), i = new Set(
      e.map((h) => h.device_id).filter((h) => !!h)
    ), s = e.map(
      (h) => F(this.hass, h, this.hass?.states[h.entity_id]).trim().toLowerCase()
    ).filter(Boolean), r = new Set(this._config?.exclude_device_names || []), n = new Map(
      (this._registry?.devices || []).map((h) => [
        h.id,
        h.name_by_user || h.name || ""
      ])
    ), a = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set();
    for (const h of t.filter(
      (u) => D(u.entity_id) === "climate" && _t(u, this.hass?.states[u.entity_id])
    )) {
      h.device_id && a.add(h.device_id);
      const u = Ki(
        h,
        this.hass.states[h.entity_id],
        this._registry,
        this.hass
      );
      for (const l of [
        u?.vertical_vane_entity,
        u?.horizontal_vane_entity,
        u?.timer_entity
      ].filter(Boolean))
        c.add(l);
      for (const l of u?.profile_entities || [])
        l?.entity && c.add(l.entity);
    }
    const d = new Set(
      t.filter(
        (h) => D(h.entity_id) === "binary_sensor" && this.hass?.states[h.entity_id]?.attributes?.device_class === "garage_door"
      ).map((h) => h.device_id).filter((h) => !!h)
    );
    return t.filter((h) => {
      const u = this.hass?.states[h.entity_id], l = this._isCameraOwner(h);
      if (!(this._config?.mode === "sound" ? !!(h?.entity_id && !h.disabled_by) : _t(h, u) && (h.platform !== "onvif" || l)) || !u || h.device_id && r.has(n.get(h.device_id) || ""))
        return !1;
      const p = D(h.entity_id), g = ct(h, this._registry), m = F(this.hass, h, u).trim().toLowerCase();
      return h.device_id && a.has(h.device_id) && p !== "climate" || c.has(h.entity_id) || this._isGarageTrigger(h, d) ? !1 : this._config?.mode === "area" ? g === this._config.area_id && (Oi(h, u) || l) : this._config?.mode === "media" ? p === "media_player" : this._config?.mode === "sound" ? ["switch", "number", "select"].includes(p) && (h.device_id && i.has(h.device_id) || s.some((_) => m.startsWith(`${_} `))) : this._config?.mode === "active" || this._config?.mode === "all" || !this._config?.mode ? l || Oi(h, u) || this._config?.mode === "active" && p === "binary_sensor" && /^(door|window|smoke|moisture|gas)$/.test(
        u.attributes?.device_class || ""
      ) : !1;
    });
  }
  _shown(t) {
    return this._config?.mode === "active" ? t.filter(
      (e) => this._isCameraOwner(e) ? this._isCameraDeviceActive(e) : Xs(e, this.hass?.states[e.entity_id])
    ) : t;
  }
  _resolveCardConfig(t) {
    return this._isCameraOwner(t) ? {
      type: "custom:component-camera-controller-v1",
      entity: t.entity_id,
      device_id: t.device_id
    } : tr(
      t,
      this.hass?.states[t.entity_id],
      this._registry,
      this.hass
    );
  }
  _tune(t) {
    if (t?.localName !== "component-split-controller-v4" || !t.shadowRoot || t.shadowRoot.querySelector("style[data-home-minimal]"))
      return;
    const e = document.createElement("style");
    e.dataset.homeMinimal = "", e.textContent = ".nm{font-weight:500!important}.iw{color:var(--secondary-text-color)!important}.rv{font-size:22px!important;font-weight:500!important}.tv{font-size:16px!important;font-weight:500!important}.al,.pt,.gt,.o,.tpr button,.tcu button,.tac button{font-weight:500!important}.pt{font-size:16px!important}.a ha-icon{--mdc-icon-size:17px!important}", t.shadowRoot.append(e);
  }
  async _syncCards() {
    if (!this.hass) return;
    const t = ++this._gen, e = this._candidates().sort(
      (c, d) => F(
        this.hass,
        c,
        this.hass?.states[c.entity_id]
      ).localeCompare(
        F(this.hass, d, this.hass?.states[d.entity_id]),
        void 0,
        { sensitivity: "base" }
      )
    ), i = Di(
      e.map((c) => ({ id: c.entity_id, entry: c })),
      this._prefs
    ), s = this._shown(i.visible.map((c) => c.entry)), r = [];
    for (const c of s) {
      const d = this._resolveCardConfig(c);
      d && r.push({ entry: c, config: d, sig: JSON.stringify(d) });
    }
    const n = JSON.stringify(
      r.map((c) => [c.entry.entity_id, c.sig])
    );
    if (n === this._structureSig) {
      for (const c of this._cardElements.values())
        c.el.hass = this.hass;
      return;
    }
    const a = /* @__PURE__ */ new Map();
    for (const c of r) {
      const d = this._cardElements.get(c.entry.entity_id);
      if (d && d.sig === c.sig) {
        d.el.hass = this.hass, a.set(c.entry.entity_id, d);
        continue;
      }
      try {
        const f = await sr(c.config, this.hass);
        if (t !== this._gen) return;
        this._tune(f), a.set(c.entry.entity_id, { el: f, sig: c.sig });
      } catch {
      }
    }
    t === this._gen && (this._cardElements = a, this._structureSig = n, this._renderedCards = r.map((c) => a.get(c.entry.entity_id)?.el).filter((c) => !!c), this.requestUpdate());
  }
  async openEditor() {
    if (!this.hass || !this._config?.pref_key) return;
    const t = this._candidates().map((s) => ({
      id: s.entity_id,
      name: F(this.hass, s, this.hass?.states[s.entity_id]),
      meta: `${this._registry?.areaMap?.get(ct(s, this._registry) || "")?.name || "Household"} · ${D(s.entity_id)}`,
      icon: this._isCameraOwner(s) ? "mdi:cctv" : this.hass?.states[s.entity_id]?.attributes?.icon || "mdi:gesture-tap"
    })), e = Di(t, this._prefs), i = {
      order: e.all.map((s) => s.id),
      hidden: [...e.hidden]
    };
    this._prefs = i, await ir(this.hass, this._config.pref_key, i), this._structureSig = "", this._syncCards();
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
kt.styles = Zo;
xi([
  b()
], kt.prototype, "_registry", 2);
xi([
  b()
], kt.prototype, "_prefs", 2);
xi([
  b()
], kt.prototype, "_renderedCards", 2);
kt = xi([
  $("component-smart-collection-v3")
], kt);
S({
  type: "component-smart-collection-v3",
  element: kt,
  name: "Smart Control Collection V3",
  description: "Stable registry-driven household controls without refresh teardown."
});
const ic = [
  R,
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
var sc = Object.defineProperty, rc = Object.getOwnPropertyDescriptor, gr = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? rc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && sc(e, i, r), r;
};
const nc = {
  type: "custom:component-household-directory-v3",
  pref_key: "home-control.household.v2",
  base_path: "/home-control",
  current_dashboard: "home-control",
  title: "Quick actions",
  icon: "mdi:gesture-tap-button",
  quick_action_label: "dashboard_quick_action"
}, Os = {
  automation: "trigger",
  scene: "turn_on",
  script: "turn_on",
  button: "press",
  input_button: "press"
};
let ue = class extends C {
  constructor() {
    super(...arguments), this._registry = [], this._unsubRegistry = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...nc, ...t }), this.hass && L.load(this.hass).then((e) => {
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
    const i = this._config?.quick_action_label || "dashboard_quick_action", s = this._registry.filter((r) => {
      if (r.disabled_by || r.hidden_by) return !1;
      const n = r.entity_id.split(".")[0];
      return !Object.prototype.hasOwnProperty.call(
        Os,
        n
      ) && !(n === "todo") ? !1 : (Array.isArray(r.labels) ? r.labels : []).includes(i);
    });
    for (const r of s) {
      const n = this.hass.states[r.entity_id], a = r.entity_id.split(".")[0], c = n?.attributes?.friendly_name || r.name || r.original_name || r.entity_id, d = n?.attributes?.icon || r.icon || r.original_icon || "mdi:flash";
      a === "todo" ? t.push({
        id: r.entity_id,
        name: c.replace(/\s+List$/i, ""),
        icon: d,
        kind: "entity",
        entity: r.entity_id,
        meta: "To-do list"
      }) : t.push({
        id: r.entity_id,
        name: c,
        icon: d,
        kind: "action",
        entity: r.entity_id,
        domain: a,
        service: Os[a],
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
    t.forEach((i, s) => {
      const r = e[s];
      if (!r) return;
      let n = null;
      r.kind === "nav" && r.path ? n = () => Ps(r.path) : r.kind === "action" ? n = () => this._runAction(r) : r.kind === "entity" && r.entity && (n = () => this.moreInfo(r.entity)), n && this._interactionHandles.push(
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
ue.styles = ic;
gr([
  b()
], ue.prototype, "_registry", 2);
ue = gr([
  $("component-household-directory-v3")
], ue);
S({
  type: "component-household-directory-v3",
  element: ue,
  name: "Household Directory V3",
  description: "Global views and label-driven quick actions directory."
});
const ac = [
  R,
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
var oc = Object.defineProperty, cc = Object.getOwnPropertyDescriptor, es = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? cc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && oc(e, i, r), r;
};
const lc = {
  type: "custom:component-room-directory-v4",
  title: "Rooms",
  icon: "mdi:floor-plan",
  mode: "home",
  pref_key: "home-control.rooms.v2",
  navigation_path: null,
  base_path: "/home-control"
};
let Wt = class extends C {
  constructor() {
    super(...arguments), this._registries = null, this._activeArea = null, this._unsubRegistry = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...lc, ...t }), this.hass && L.load(this.hass).then((e) => {
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
    return rr(t, this._registries, this.hass);
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
Wt.styles = ac;
es([
  b()
], Wt.prototype, "_registries", 2);
es([
  b()
], Wt.prototype, "_activeArea", 2);
Wt = es([
  $("component-room-directory-v4")
], Wt);
S({
  type: "component-room-directory-v4",
  element: Wt,
  name: "Room Directory V4",
  description: "Stable registry-driven rooms with full-height swipeable room sheets."
});
var dc = Object.getOwnPropertyDescriptor, _r = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? dc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
const pc = {
  type: "custom:component-home-overview-v4",
  weather_entity: "weather.forecast_home",
  base_path: "/home-control",
  current_dashboard: "home-control",
  favourites_helpers: []
};
let me = class extends C {
  constructor() {
    super(...arguments), this._weatherInteraction = null, this._cancelMinuteScheduler = null;
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({
      ...pc,
      ...t,
      favourites_helpers: []
    });
  }
  getCardSize() {
    return 12;
  }
  connectedCallback() {
    super.connectedCallback(), this._cancelMinuteScheduler = Us(() => this.requestUpdate());
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
    const t = /* @__PURE__ */ new Date(), e = ni(this.hass), i = ri(this.hass), s = new Intl.DateTimeFormat(i, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: e
    }).format(t), n = this.hass?.states?.[this._config.weather_entity || "weather.forecast_home"]?.attributes || {}, a = Number(n.temperature), c = Number.isFinite(a) ? `${Pt(this.hass, a, { maximumFractionDigits: 1 })}${n.temperature_unit || "°C"}` : "—", d = Number(n.cloud_coverage), f = Number.isFinite(d) ? `Cloud ${Math.round(d)}%` : "Cloud —", h = `${c} · ${f}`, u = `Outside ${c}, ${f}. Open weather details.`, l = this._config.base_path || "/home-control", v = this._config.current_dashboard || "home-control";
    return o`
      <ha-card>
        <div class="top">
          <span class="time">${s}</span>
          <button
            class="weather"
            type="button"
            aria-label="${this.esc(u)}"
          >
            ${h}
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
      current_dashboard: v
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
me.styles = Go;
me = _r([
  $("component-home-overview-v4")
], me);
let Hi = class extends me {
};
Hi = _r([
  $("component-home-overview-v5")
], Hi);
S({
  type: "component-home-overview-v4",
  element: me,
  name: "Home Overview V4",
  description: "Stable minimal Home overview without state-refresh teardown."
});
S({
  type: "component-home-overview-v5",
  element: Hi,
  name: "Home Overview V5",
  description: "Stable minimal Home overview without state-refresh teardown (v5 alias)."
});
const hc = [
  R,
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
var uc = Object.defineProperty, mc = Object.getOwnPropertyDescriptor, is = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? mc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && uc(e, i, r), r;
};
const fc = {
  type: "custom:component-household-attention-v2",
  title: "Attention",
  icon: "mdi:alert-circle-outline",
  quiet_title: "Everything quiet",
  quiet_subtitle: "No security or hardware alerts",
  quiet_icon: "mdi:check-circle-outline"
};
let Gt = class extends C {
  constructor() {
    super(...arguments), this._registry = null, this._unsubRegistry = null, this._interactionHandles = [];
  }
  static getGridOptions() {
    return { columns: 12, rows: "auto" };
  }
  setConfig(t) {
    super.setConfig({ ...fc, ...t }), this.hass && !this._config?.demo && L.load(this.hass).then((e) => {
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
      const s = e.entity_id.split(".")[0], r = e.device_class || i.attributes?.device_class || "";
      let n = null;
      e.entity_id.endsWith("_controller_status") && i.state === "off" ? n = {
        status: "Controller offline",
        severity: "critical",
        severity_text: "Critical",
        icon: "mdi:access-point-network-off"
      } : s === "binary_sensor" && i.state === "on" && ["smoke", "moisture", "gas"].includes(r) ? n = {
        status: "Detected",
        severity: "critical",
        severity_text: "Critical",
        icon: r === "smoke" ? "mdi:smoke-detector-alert" : r === "gas" ? "mdi:gas-cylinder" : "mdi:water-alert"
      } : s === "binary_sensor" && i.state === "on" && ["door", "window", "garage_door"].includes(r) ? n = {
        status: "Open",
        severity: "warning",
        severity_text: "Check",
        icon: r === "window" ? "mdi:window-open-variant" : r === "garage_door" ? "mdi:garage-open" : "mdi:door-open"
      } : s === "lock" && i.state === "unlocked" && (n = {
        status: "Unlocked",
        severity: "warning",
        severity_text: "Check",
        icon: "mdi:lock-open-variant-outline"
      }), n && t.push({
        entity_id: e.entity_id,
        name: tn({ entry: e, state: i }),
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
    t.forEach((i, s) => {
      const r = e[s];
      r && this._interactionHandles.push(
        x(i, {
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
Gt.styles = hc;
is([
  b()
], Gt.prototype, "_registry", 2);
Gt = is([
  $("component-household-attention-v2")
], Gt);
let Ri = class extends Gt {
};
Ri = is([
  $("component-household-attention-v1")
], Ri);
S({
  type: "component-household-attention-v1",
  element: Ri,
  name: "Household Attention V1",
  description: "Aggregated safety and hardware attention queue (v1)."
});
S({
  type: "component-household-attention-v2",
  element: Gt,
  name: "Household Attention V2",
  description: "Aggregated safety and hardware attention queue."
});
const gc = [
  di,
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
var _c = Object.defineProperty, vc = Object.getOwnPropertyDescriptor, ss = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? vc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && _c(e, i, r), r;
};
let fe = class extends ot {
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
    J(this, "config-changed", { config: this._config });
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
fe.styles = [Fs];
ss([
  Kt({ attribute: !1 })
], fe.prototype, "hass", 2);
ss([
  b()
], fe.prototype, "_config", 2);
fe = ss([
  $("ha-action-tile-editor")
], fe);
var bc = Object.getOwnPropertyDescriptor, yc = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? bc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
let Ni = class extends mi {
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
    if (!this.hass || !this.config) return;
    const t = this.config.tap_action || { action: "toggle" };
    ui(this, this.hass, t, this.config.entity);
  }
  _renderBadge() {
    if (!this.hass || !this.config) return I;
    if (this.config.badge_entity && this.hass.states[this.config.badge_entity]) {
      const e = this.hass.states[this.config.badge_entity];
      return o`
        <div class="badge-pill">
          ${Nt(e, this.hass)}
        </div>
      `;
    }
    const t = this.hass.states[this.config.entity];
    if (t?.attributes?.brightness !== void 0 && ae(t)) {
      const e = Math.round(t.attributes.brightness / 255 * 100);
      return o`<div class="badge-pill">${e}%</div>`;
    }
    return t?.attributes?.temperature !== void 0 ? o`<div class="badge-pill">
        ${t.attributes.temperature}&deg;
      </div>` : I;
  }
  render() {
    if (!this.hass || !this.config?.entity)
      return this.renderError("No entity configured for ha-action-tile");
    const t = this.hass.states[this.config.entity];
    if (!t)
      return this.renderError(`Entity not found: ${this.config.entity}`);
    const e = lt(this.config.entity), i = ae(t), s = this.config.name || pi(t), r = this.config.icon || t.attributes.icon || hi(e, t.state), n = Nt(t, this.hass), a = this.config.color || "#03a9f4";
    return o`
      <ha-card
        class="interactive tile-card ${i ? "active" : ""}"
        style=${i ? `--tile-active-color: ${a};` : ""}
        @click=${this._handleTileTap}
      >
        <div class="tile-body">
          <div class="tile-header">
            <div class="tile-icon-box ${i ? "active" : ""}">
              <ha-icon .icon=${r}></ha-icon>
            </div>
            ${this._renderBadge()}
          </div>

          <div class="tile-content">
            <div class="primary-title" title=${s}>${s}</div>
            <div class="secondary-text">${n}</div>
          </div>
        </div>
      </ha-card>
    `;
  }
};
Ni.styles = gc;
Ni = yc([
  $("ha-action-tile")
], Ni);
const xc = [
  di,
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
var wc = Object.getOwnPropertyDescriptor, $c = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? wc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
let Li = class extends mi {
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
    ui(this, this.hass, t, this.config.entity);
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
    const e = lt(this.config.entity), i = this.config.name || pi(t), s = this.config.icon || t.attributes.icon || hi(e, t.state), r = parseFloat(t.state), n = !isNaN(r), a = n ? this._computeColor(r) : "var(--primary-color, #03a9f4)", c = this.config.unit || t.attributes.unit_of_measurement || "";
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
        aria-label="${i}: ${n ? r : t.state}${c ? " " + c : ""}"
        title="${i}: ${Nt(t, this.hass)}"
      >
        <div class="metric-body">
          <div class="icon-bubble">
            <ha-icon .icon=${s}></ha-icon>
          </div>
          <div class="metric-data">
            <div class="metric-value-line">
              <span class="value-text"
                >${n ? r : t.state}</span
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
Li.styles = xc;
Li = $c([
  $("ha-metric-badge")
], Li);
const Cc = [
  di,
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
var kc = Object.getOwnPropertyDescriptor, Sc = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? kc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
let qi = class extends mi {
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
    ui(this, this.hass, e, t.entity);
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
      s && ae(s) && e++;
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
      const s = this.hass?.states[i.entity], r = ae(s), n = lt(i.entity), a = i.name || pi(s), c = i.icon || s?.attributes?.icon || hi(n, s?.state);
      return o`
              <div
                class="quick-item interactive ${r ? "active" : ""}"
                @click=${() => this._handleEntityTap(i)}
                title="${a}: ${s?.state || "unknown"}"
              >
                <div class="item-icon-circle ${r ? "active" : ""}">
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
qi.styles = Cc;
qi = Sc([
  $("ha-quick-bar")
], qi);
const Ac = [
  di,
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
var Ec = Object.defineProperty, zc = Object.getOwnPropertyDescriptor, rs = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? zc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = (s ? a(e, i, r) : a(r)) || r);
  return s && r && Ec(e, i, r), r;
};
let ge = class extends ot {
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
    J(this, "config-changed", { config: this._config });
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
ge.styles = [
  Fs,
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
rs([
  Kt({ attribute: !1 })
], ge.prototype, "hass", 2);
rs([
  b()
], ge.prototype, "_config", 2);
ge = rs([
  $("ha-status-card-editor")
], ge);
var Tc = Object.getOwnPropertyDescriptor, Oc = (t, e, i, s) => {
  for (var r = s > 1 ? void 0 : s ? Tc(e, i) : e, n = t.length - 1, a; n >= 0; n--)
    (a = t[n]) && (r = a(r) || r);
  return r;
};
let Mi = class extends mi {
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
    if (!this.hass || !this.config) return;
    const t = this.config.tap_action || { action: "more-info" };
    ui(this, this.hass, t, this.config.entity);
  }
  async _handleToggle(t) {
    if (t.stopPropagation(), !this.hass || !this.config?.entity) return;
    const e = lt(this.config.entity), i = e === "lock" ? "lock" : "toggle";
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
    if (e === "state") return Nt(t, this.hass);
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
    const e = lt(this.config.entity), i = ae(t), s = this.config.name || pi(t), r = this.config.icon || t.attributes.icon || hi(e, t.state), n = Nt(t, this.hass), a = this._getSecondaryText(t), c = this.config.show_toggle !== !1 && ["light", "switch", "input_boolean", "fan", "lock"].includes(e);
    return o`
      <ha-card class="interactive" @click=${this._handleTap}>
        <div class="card-body ${i ? "state-active" : "state-inactive"}">
          <div class="icon-container ${i ? "active" : ""}">
            ${this._renderIcon(r)}
          </div>

          <div class="info-container">
            <div class="primary-title" title=${s}>${s}</div>
            <div class="secondary-text">
              ${a ? o`${a} &bull; ` : I}
              <span class="state-label">${n}</span>
            </div>
          </div>

          ${c ? o`
                  <button
                    class="toggle-btn ${i ? "active" : ""}"
                    @click=${this._handleToggle}
                    aria-label="Toggle ${s}"
                    title="Toggle state"
                  >
                    <div class="toggle-track">
                      <div class="toggle-thumb"></div>
                    </div>
                  </button>
                ` : I}
        </div>
      </ha-card>
    `;
  }
};
Mi.styles = Ac;
Mi = Oc([
  $("ha-status-card")
], Mi);
console.info(
  "%c HA-COMPONENT-LIBRARY %c 1.0.0 ",
  "color: white; background: #03a9f4; font-weight: 700; border-radius: 3px 0 0 3px;",
  "color: #03a9f4; background: #e1f5fe; font-weight: 700; border-radius: 0 3px 3px 0;"
);
export {
  je as ComponentActionV2,
  le as ComponentAppleTvControllerV1,
  Pi as ComponentCameraControllerV1,
  tt as ComponentCameraControllerV2,
  Ue as ComponentContextStripV3,
  Lt as ComponentControlRowV2,
  qt as ComponentDeviceAwareAutoEntitiesV1,
  Mt as ComponentDeviceDiscoveryV2,
  Fe as ComponentEmptyStateV2,
  Be as ComponentEmptyStateV3,
  he as ComponentEnergyDashboardV1,
  Ft as ComponentEnergyDaySelectorV1,
  it as ComponentEnergySummaryV1,
  ii as ComponentFavouritesMinimalV1,
  Ct as ComponentFavouritesV3,
  dt as ComponentGarageDoorControllerV1,
  Vt as ComponentHistoryGraphV2,
  me as ComponentHomeOverviewV4,
  Hi as ComponentHomeOverviewV5,
  Ri as ComponentHouseholdAttentionV1,
  Gt as ComponentHouseholdAttentionV2,
  ue as ComponentHouseholdDirectoryV3,
  Ve as ComponentListV2,
  yt as ComponentMediaRowV2,
  pt as ComponentMetricPairCardV3,
  Je as ComponentNavigationTileV2,
  We as ComponentNoticeV2,
  Ge as ComponentProgressV2,
  ti as ComponentQuickNavigationV2,
  Wt as ComponentRoomDirectoryV4,
  ce as ComponentRoomNavigationV1,
  ei as ComponentRoomSheetV2,
  Ke as ComponentSectionSeparatorV2,
  jt as ComponentSecurityCameraWallV3,
  et as ComponentSecurityDashboardV1,
  Ut as ComponentSecurityEntryPointsV1,
  Bt as ComponentSecuritySummaryV1,
  Qe as ComponentSingleKpiV2,
  kt as ComponentSmartCollectionV3,
  de as ComponentSplitControllerV4,
  Ye as ComponentStatusRowV2,
  Xe as ComponentTextEffectV1,
  Ze as ComponentThreeStatV2,
  xt as ComponentUpdateRowV3,
  It as ComponentUpdateSummaryV3,
  si as ComponentWelcomeHeaderV1,
  wt as ComponentWledControllerV1,
  Zr as DASHBOARD_BASE_CARD_STYLES,
  Bs as DASHBOARD_SHARED_STYLE_CSS,
  xs as DASHBOARD_SHARED_STYLE_ID,
  sn as DashboardRegistryCoordinator,
  $t as EnergyHistoryCardV3,
  Ni as HaActionTile,
  mi as HaBaseCard,
  bt as HaComponentLibraryConfigEditor,
  Li as HaMetricBadge,
  qi as HaQuickBar,
  Mi as HaStatusCard,
  Et as INTERACTION_DEFAULTS,
  C as LitBaseCard,
  Xr as PRESENTATIONAL_CARD_STYLES,
  pe as SolarDaylightCardV7,
  Jr as UPDATE_CARD_STYLES,
  zi as WLED_DOMAIN,
  As as WLED_INVALID,
  ar as WLED_NAME,
  pn as actionCardStyles,
  Oe as actionRole,
  gc as actionTileCardStyles,
  Qs as appleTvBundle,
  ja as appleTvCardStyles,
  Di as applyPrefs,
  ct as areaOf,
  Hs as calendarDayRange,
  Ga as cameraCardStyles,
  L as centralRegistry,
  di as commonCardStyles,
  rr as computeAreaStatusSummary,
  lt as computeDomain,
  tn as computeEntityDisplayName,
  pi as computeEntityName,
  Qi as connectionId,
  fn as contextStripCardStyles,
  tr as controlConfig,
  Ys as controlDomains,
  ie as controlResolvers,
  ga as controlRowCardStyles,
  js as createAsyncBroker,
  sr as createCardElement,
  Qr as createLifecycle,
  Us as createMinuteScheduler,
  Is as createRequestCoalescer,
  R as dashboardBaseCardStyles,
  on as dashboardProfiles,
  Rc as dashboardTokens,
  oe as dayKey,
  Xt as dayKeyInZone,
  Js as defaultControlConfig,
  Ca as deviceAwareAutoEntitiesCardStyles,
  Ea as deviceDiscoveryCardStyles,
  D as domainOf,
  bn as emptyStateCardStyles,
  vo as energyDashboardCardStyles,
  Ie as energyDayData,
  bo as energyDaySelectorCardStyles,
  M as energyDayState,
  zo as energyHistoryCardStyles,
  wo as energySummaryCardStyles,
  Kr as ensureInteractionFeedback,
  ee as entryFilters,
  Re as escapeHtml,
  Fo as favouritesCardStyles,
  J as fireEvent,
  oi as formatCalendarDay,
  ai as formatDate,
  at as formatEnergy,
  Nt as formatEntityState,
  Z as formatPower,
  Ne as formatTime,
  Ks as garageControl,
  Ya as garageDoorCardStyles,
  hi as getDefaultIconForDomain,
  ui as handleAction,
  Lc as healthAwareRegistryLoad,
  No as historyGraphCardStyles,
  Go as homeOverviewCardStyles,
  hc as householdAttentionCardStyles,
  ic as householdDirectoryCardStyles,
  dn as initWledIntegration,
  Yr as injectDashboardTokens,
  Fr as installConfigContract,
  x as interaction,
  Vr as interactionStyles,
  Xs as isActive,
  ae as isEntityActive,
  Vs as isEntityAvailable,
  ws as isEntityUnavailable,
  Gs as isPeripheralEntity,
  Oi as isPotential,
  $n as listCardStyles,
  Nc as loadDashboardRegistries,
  er as loadPrefs,
  ye as loadSecurityModel,
  ri as localeOf,
  ya as mediaRowCardStyles,
  xc as metricBadgeCardStyles,
  Io as metricPairCardStyles,
  Ki as nativeClimateControlConfig,
  ta as navTileCardStyles,
  Ps as navigateTo,
  An as noticeCardStyles,
  Pt as numberFormat,
  vr as openMoreInfo,
  Hc as prefersReducedMotion,
  st as presentationalCardStyles,
  On as progressCardStyles,
  cn as ptzRole,
  Cc as quickBarCardStyles,
  ra as quickNavCardStyles,
  S as registerCard,
  Zs as registerControlResolver,
  Ws as registerEntryFilter,
  ac as roomDirectoryCardStyles,
  ca as roomNavigationCardStyles,
  ha as roomSheetCardStyles,
  ir as savePrefs,
  Rn as sectionSeparatorCardStyles,
  no as securityCameraWallCardStyles,
  fi as securityCapabilityText,
  co as securityDashboardCardStyles,
  Te as securityEntityLabel,
  ho as securityEntryPointsCardStyles,
  ln as securityModel,
  fo as securitySummaryCardStyles,
  qn as singleKpiCardStyles,
  Zo as smartCollectionCardStyles,
  ko as solarDaylightCardStyles,
  Ja as splitAcCardStyles,
  zt as splitIdentity,
  F as stateNameOf,
  Ac as statusCardCardStyles,
  Un as statusRowCardStyles,
  Ss as switchRole,
  Wn as textEffectCardStyles,
  Yn as threeStatCardStyles,
  ni as timeZoneOf,
  Ds as toText,
  _t as uiEntry,
  Wi as updateCardStyles,
  Pa as updateRowCardStyles,
  La as updateSummaryCardStyles,
  nr as validDay,
  Me as waitForEntityState,
  Ko as welcomeHeaderCardStyles,
  io as wledCardStyles
};
