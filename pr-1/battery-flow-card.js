//#region node_modules/@lit/reactive-element/css-tag.js
var e = globalThis, t = e.ShadowRoot && (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, n = Symbol(), r = /* @__PURE__ */ new WeakMap(), i = class {
	constructor(e, t, r) {
		if (this._$cssResult$ = !0, r !== n) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
		this.cssText = e, this.t = t;
	}
	get styleSheet() {
		let e = this.o, n = this.t;
		if (t && e === void 0) {
			let t = n !== void 0 && n.length === 1;
			t && (e = r.get(n)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), t && r.set(n, e));
		}
		return e;
	}
	toString() {
		return this.cssText;
	}
}, a = (e) => new i(typeof e == "string" ? e : e + "", void 0, n), o = (e, ...t) => new i(e.length === 1 ? e[0] : t.reduce((t, n, r) => t + ((e) => {
	if (!0 === e._$cssResult$) return e.cssText;
	if (typeof e == "number") return e;
	throw Error("Value passed to 'css' function must be a 'css' function result: " + e + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
})(n) + e[r + 1], e[0]), e, n), s = (n, r) => {
	if (t) n.adoptedStyleSheets = r.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
	else for (let t of r) {
		let r = document.createElement("style"), i = e.litNonce;
		i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, n.appendChild(r);
	}
}, c = t ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((e) => {
	let t = "";
	for (let n of e.cssRules) t += n.cssText;
	return a(t);
})(e) : e, { is: l, defineProperty: u, getOwnPropertyDescriptor: d, getOwnPropertyNames: f, getOwnPropertySymbols: p, getPrototypeOf: m } = Object, h = globalThis, g = h.trustedTypes, ee = g ? g.emptyScript : "", _ = h.reactiveElementPolyfillSupport, v = (e, t) => e, y = {
	toAttribute(e, t) {
		switch (t) {
			case Boolean:
				e = e ? ee : null;
				break;
			case Object:
			case Array: e = e == null ? e : JSON.stringify(e);
		}
		return e;
	},
	fromAttribute(e, t) {
		let n = e;
		switch (t) {
			case Boolean:
				n = e !== null;
				break;
			case Number:
				n = e === null ? null : Number(e);
				break;
			case Object:
			case Array: try {
				n = JSON.parse(e);
			} catch {
				n = null;
			}
		}
		return n;
	}
}, b = (e, t) => !l(e, t), x = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	useDefault: !1,
	hasChanged: b
};
Symbol.metadata ??= Symbol("metadata"), h.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var S = class extends HTMLElement {
	static addInitializer(e) {
		this._$Ei(), (this.l ??= []).push(e);
	}
	static get observedAttributes() {
		return this.finalize(), this._$Eh && [...this._$Eh.keys()];
	}
	static createProperty(e, t = x) {
		if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
			let n = Symbol(), r = this.getPropertyDescriptor(e, n, t);
			r !== void 0 && u(this.prototype, e, r);
		}
	}
	static getPropertyDescriptor(e, t, n) {
		let { get: r, set: i } = d(this.prototype, e) ?? {
			get() {
				return this[t];
			},
			set(e) {
				this[t] = e;
			}
		};
		return {
			get: r,
			set(t) {
				let a = r?.call(this);
				i?.call(this, t), this.requestUpdate(e, a, n);
			},
			configurable: !0,
			enumerable: !0
		};
	}
	static getPropertyOptions(e) {
		return this.elementProperties.get(e) ?? x;
	}
	static _$Ei() {
		if (this.hasOwnProperty(v("elementProperties"))) return;
		let e = m(this);
		e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
	}
	static finalize() {
		if (this.hasOwnProperty(v("finalized"))) return;
		if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(v("properties"))) {
			let e = this.properties, t = [...f(e), ...p(e)];
			for (let n of t) this.createProperty(n, e[n]);
		}
		let e = this[Symbol.metadata];
		if (e !== null) {
			let t = litPropertyMetadata.get(e);
			if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
		}
		this._$Eh = /* @__PURE__ */ new Map();
		for (let [e, t] of this.elementProperties) {
			let n = this._$Eu(e, t);
			n !== void 0 && this._$Eh.set(n, e);
		}
		this.elementStyles = this.finalizeStyles(this.styles);
	}
	static finalizeStyles(e) {
		let t = [];
		if (Array.isArray(e)) {
			let n = new Set(e.flat(1 / 0).reverse());
			for (let e of n) t.unshift(c(e));
		} else e !== void 0 && t.push(c(e));
		return t;
	}
	static _$Eu(e, t) {
		let n = t.attribute;
		return !1 === n ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
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
		let e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
		for (let n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
		e.size > 0 && (this._$Ep = e);
	}
	createRenderRoot() {
		let e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
		return s(e, this.constructor.elementStyles), e;
	}
	connectedCallback() {
		this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
	}
	enableUpdating(e) {}
	disconnectedCallback() {
		this._$EO?.forEach((e) => e.hostDisconnected?.());
	}
	attributeChangedCallback(e, t, n) {
		this._$AK(e, n);
	}
	_$ET(e, t) {
		let n = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, n);
		if (r !== void 0 && !0 === n.reflect) {
			let i = (n.converter?.toAttribute === void 0 ? y : n.converter).toAttribute(t, n.type);
			this._$Em = e, i == null ? this.removeAttribute(r) : this.setAttribute(r, i), this._$Em = null;
		}
	}
	_$AK(e, t) {
		let n = this.constructor, r = n._$Eh.get(e);
		if (r !== void 0 && this._$Em !== r) {
			let e = n.getPropertyOptions(r), i = typeof e.converter == "function" ? { fromAttribute: e.converter } : e.converter?.fromAttribute === void 0 ? y : e.converter;
			this._$Em = r;
			let a = i.fromAttribute(t, e.type);
			this[r] = a ?? this._$Ej?.get(r) ?? a, this._$Em = null;
		}
	}
	requestUpdate(e, t, n, r = !1, i) {
		if (e !== void 0) {
			let a = this.constructor;
			if (!1 === r && (i = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? b)(i, t) || n.useDefault && n.reflect && i === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
			this.C(e, t, n);
		}
		!1 === this.isUpdatePending && (this._$ES = this._$EP());
	}
	C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
		n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), !0 === r && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
	}
	async _$EP() {
		this.isUpdatePending = !0;
		try {
			await this._$ES;
		} catch (e) {
			Promise.reject(e);
		}
		let e = this.scheduleUpdate();
		return e != null && await e, !this.isUpdatePending;
	}
	scheduleUpdate() {
		return this.performUpdate();
	}
	performUpdate() {
		if (!this.isUpdatePending) return;
		if (!this.hasUpdated) {
			if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
				for (let [e, t] of this._$Ep) this[e] = t;
				this._$Ep = void 0;
			}
			let e = this.constructor.elementProperties;
			if (e.size > 0) for (let [t, n] of e) {
				let { wrapped: e } = n, r = this[t];
				!0 !== e || this._$AL.has(t) || r === void 0 || this.C(t, void 0, n, r);
			}
		}
		let e = !1, t = this._$AL;
		try {
			e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(t)) : this._$EM();
		} catch (t) {
			throw e = !1, this._$EM(), t;
		}
		e && this._$AE(t);
	}
	willUpdate(e) {}
	_$AE(e) {
		this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
		this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
	}
	updated(e) {}
	firstUpdated(e) {}
};
S.elementStyles = [], S.shadowRootOptions = { mode: "open" }, S[v("elementProperties")] = /* @__PURE__ */ new Map(), S[v("finalized")] = /* @__PURE__ */ new Map(), _?.({ ReactiveElement: S }), (h.reactiveElementVersions ??= []).push("2.1.2");
//#endregion
//#region node_modules/lit-html/lit-html.js
var C = globalThis, te = (e) => e, w = C.trustedTypes, ne = w ? w.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, re = "$lit$", T = `lit$${Math.random().toFixed(9).slice(2)}$`, ie = "?" + T, ae = `<${ie}>`, E = document, D = () => E.createComment(""), O = (e) => e === null || typeof e != "object" && typeof e != "function", k = Array.isArray, oe = (e) => k(e) || typeof e?.[Symbol.iterator] == "function", A = "[ 	\n\f\r]", j = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, se = /-->/g, ce = />/g, M = RegExp(`>|${A}(?:([^\\s"'>=/]+)(${A}*=${A}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), le = /'/g, ue = /"/g, de = /^(?:script|style|textarea|title)$/i, fe = (e) => (t, ...n) => ({
	_$litType$: e,
	strings: t,
	values: n
}), N = fe(1), P = fe(2), F = Symbol.for("lit-noChange"), I = Symbol.for("lit-nothing"), L = /* @__PURE__ */ new WeakMap(), R = E.createTreeWalker(E, 129);
function pe(e, t) {
	if (!k(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
	return ne === void 0 ? t : ne.createHTML(t);
}
var me = (e, t) => {
	let n = e.length - 1, r = [], i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = j;
	for (let t = 0; t < n; t++) {
		let n = e[t], s, c, l = -1, u = 0;
		for (; u < n.length && (o.lastIndex = u, c = o.exec(n), c !== null);) u = o.lastIndex, o === j ? c[1] === "!--" ? o = se : c[1] === void 0 ? c[2] === void 0 ? c[3] !== void 0 && (o = M) : (de.test(c[2]) && (i = RegExp("</" + c[2], "g")), o = M) : o = ce : o === M ? c[0] === ">" ? (o = i ?? j, l = -1) : c[1] === void 0 ? l = -2 : (l = o.lastIndex - c[2].length, s = c[1], o = c[3] === void 0 ? M : c[3] === "\"" ? ue : le) : o === ue || o === le ? o = M : o === se || o === ce ? o = j : (o = M, i = void 0);
		let d = o === M && e[t + 1].startsWith("/>") ? " " : "";
		a += o === j ? n + ae : l >= 0 ? (r.push(s), n.slice(0, l) + re + n.slice(l) + T + d) : n + T + (l === -2 ? t : d);
	}
	return [pe(e, a + (e[n] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
}, z = class e {
	constructor({ strings: t, _$litType$: n }, r) {
		let i;
		this.parts = [];
		let a = 0, o = 0, s = t.length - 1, c = this.parts, [l, u] = me(t, n);
		if (this.el = e.createElement(l, r), R.currentNode = this.el.content, n === 2 || n === 3) {
			let e = this.el.content.firstChild;
			e.replaceWith(...e.childNodes);
		}
		for (; (i = R.nextNode()) !== null && c.length < s;) {
			if (i.nodeType === 1) {
				if (i.hasAttributes()) for (let e of i.getAttributeNames()) if (e.endsWith(re)) {
					let t = u[o++], n = i.getAttribute(e).split(T), r = /([.?@])?(.*)/.exec(t);
					c.push({
						type: 1,
						index: a,
						name: r[2],
						strings: n,
						ctor: r[1] === "." ? ge : r[1] === "?" ? _e : r[1] === "@" ? ve : H
					}), i.removeAttribute(e);
				} else e.startsWith(T) && (c.push({
					type: 6,
					index: a
				}), i.removeAttribute(e));
				if (de.test(i.tagName)) {
					let e = i.textContent.split(T), t = e.length - 1;
					if (t > 0) {
						i.textContent = w ? w.emptyScript : "";
						for (let n = 0; n < t; n++) i.append(e[n], D()), R.nextNode(), c.push({
							type: 2,
							index: ++a
						});
						i.append(e[t], D());
					}
				}
			} else if (i.nodeType === 8) {
				if (i.data === ie) c.push({
					type: 2,
					index: a
				});
				else {
					let e = -1;
					for (; (e = i.data.indexOf(T, e + 1)) !== -1;) c.push({
						type: 7,
						index: a
					}), e += T.length - 1;
				}
			}
			a++;
		}
	}
	static createElement(e, t) {
		let n = E.createElement("template");
		return n.innerHTML = e, n;
	}
};
function B(e, t, n = e, r) {
	if (t === F) return t;
	let i = r === void 0 ? n._$Cl : n._$Co?.[r], a = O(t) ? void 0 : t._$litDirective$;
	return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(e), i._$AT(e, n, r)), r === void 0 ? n._$Cl = i : (n._$Co ??= [])[r] = i), i !== void 0 && (t = B(e, i._$AS(e, t.values), i, r)), t;
}
var he = class {
	constructor(e, t) {
		this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
	}
	get parentNode() {
		return this._$AM.parentNode;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	u(e) {
		let { el: { content: t }, parts: n } = this._$AD, r = (e?.creationScope ?? E).importNode(t, !0);
		R.currentNode = r;
		let i = R.nextNode(), a = 0, o = 0, s = n[0];
		for (; s !== void 0;) {
			if (a === s.index) {
				let t;
				s.type === 2 ? t = new V(i, i.nextSibling, this, e) : s.type === 1 ? t = new s.ctor(i, s.name, s.strings, this, e) : s.type === 6 && (t = new ye(i, this, e)), this._$AV.push(t), s = n[++o];
			}
			a !== s?.index && (i = R.nextNode(), a++);
		}
		return R.currentNode = E, r;
	}
	p(e) {
		let t = 0;
		for (let n of this._$AV) n !== void 0 && (n.strings === void 0 ? n._$AI(e[t]) : (n._$AI(e, n, t), t += n.strings.length - 2)), t++;
	}
}, V = class e {
	get _$AU() {
		return this._$AM?._$AU ?? this._$Cv;
	}
	constructor(e, t, n, r) {
		this.type = 2, this._$AH = I, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = r, this._$Cv = r?.isConnected ?? !0;
	}
	get parentNode() {
		let e = this._$AA.parentNode, t = this._$AM;
		return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
	}
	get startNode() {
		return this._$AA;
	}
	get endNode() {
		return this._$AB;
	}
	_$AI(e, t = this) {
		e = B(this, e, t), O(e) ? e === I || e == null || e === "" ? (this._$AH !== I && this._$AR(), this._$AH = I) : e !== this._$AH && e !== F && this._(e) : e._$litType$ === void 0 ? e.nodeType === void 0 ? oe(e) ? this.k(e) : this._(e) : this.T(e) : this.$(e);
	}
	O(e) {
		return this._$AA.parentNode.insertBefore(e, this._$AB);
	}
	T(e) {
		this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
	}
	_(e) {
		this._$AH !== I && O(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
	}
	$(e) {
		let { values: t, _$litType$: n } = e, r = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = z.createElement(pe(n.h, n.h[0]), this.options)), n);
		if (this._$AH?._$AD === r) this._$AH.p(t);
		else {
			let e = new he(r, this), n = e.u(this.options);
			e.p(t), this.T(n), this._$AH = e;
		}
	}
	_$AC(e) {
		let t = L.get(e.strings);
		return t === void 0 && L.set(e.strings, t = new z(e)), t;
	}
	k(t) {
		k(this._$AH) || (this._$AH = [], this._$AR());
		let n = this._$AH, r, i = 0;
		for (let a of t) i === n.length ? n.push(r = new e(this.O(D()), this.O(D()), this, this.options)) : r = n[i], r._$AI(a), i++;
		i < n.length && (this._$AR(r && r._$AB.nextSibling, i), n.length = i);
	}
	_$AR(e = this._$AA.nextSibling, t) {
		for (this._$AP?.(!1, !0, t); e !== this._$AB;) {
			let t = te(e).nextSibling;
			te(e).remove(), e = t;
		}
	}
	setConnected(e) {
		this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
	}
}, H = class {
	get tagName() {
		return this.element.tagName;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	constructor(e, t, n, r, i) {
		this.type = 1, this._$AH = I, this._$AN = void 0, this.element = e, this.name = t, this._$AM = r, this.options = i, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(/* @__PURE__ */ new String()), this.strings = n) : this._$AH = I;
	}
	_$AI(e, t = this, n, r) {
		let i = this.strings, a = !1;
		if (i === void 0) e = B(this, e, t, 0), a = !O(e) || e !== this._$AH && e !== F, a && (this._$AH = e);
		else {
			let r = e, o, s;
			for (e = i[0], o = 0; o < i.length - 1; o++) s = B(this, r[n + o], t, o), s === F && (s = this._$AH[o]), a ||= !O(s) || s !== this._$AH[o], s === I ? e = I : e !== I && (e += (s ?? "") + i[o + 1]), this._$AH[o] = s;
		}
		a && !r && this.j(e);
	}
	j(e) {
		e === I ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
	}
}, ge = class extends H {
	constructor() {
		super(...arguments), this.type = 3;
	}
	j(e) {
		this.element[this.name] = e === I ? void 0 : e;
	}
}, _e = class extends H {
	constructor() {
		super(...arguments), this.type = 4;
	}
	j(e) {
		this.element.toggleAttribute(this.name, !!e && e !== I);
	}
}, ve = class extends H {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i), this.type = 5;
	}
	_$AI(e, t = this) {
		if ((e = B(this, e, t, 0) ?? I) === F) return;
		let n = this._$AH, r = e === I && n !== I || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, i = e !== I && (n === I || r);
		r && this.element.removeEventListener(this.name, this, n), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
	}
	handleEvent(e) {
		typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
	}
}, ye = class {
	constructor(e, t, n) {
		this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
	}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AI(e) {
		B(this, e);
	}
}, be = C.litHtmlPolyfillSupport;
be?.(z, V), (C.litHtmlVersions ??= []).push("3.3.3");
var xe = (e, t, n) => {
	let r = n?.renderBefore ?? t, i = r._$litPart$;
	if (i === void 0) {
		let e = n?.renderBefore ?? null;
		r._$litPart$ = i = new V(t.insertBefore(D(), e), e, void 0, n ?? {});
	}
	return i._$AI(e), i;
}, U = globalThis, W = class extends S {
	constructor() {
		super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
	}
	createRenderRoot() {
		let e = super.createRenderRoot();
		return this.renderOptions.renderBefore ??= e.firstChild, e;
	}
	update(e) {
		let t = this.render();
		this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = xe(t, this.renderRoot, this.renderOptions);
	}
	connectedCallback() {
		super.connectedCallback(), this._$Do?.setConnected(!0);
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this._$Do?.setConnected(!1);
	}
	render() {
		return F;
	}
};
W._$litElement$ = !0, W.finalized = !0, U.litElementHydrateSupport?.({ LitElement: W });
var Se = U.litElementPolyfillSupport;
Se?.({ LitElement: W }), (U.litElementVersions ??= []).push("4.2.2");
//#endregion
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var Ce = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, we = {
	attribute: !0,
	type: String,
	converter: y,
	reflect: !1,
	hasChanged: b
}, Te = (e = we, t, n) => {
	let { kind: r, metadata: i } = n, a = globalThis.litPropertyMetadata.get(i);
	if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((e = Object.create(e)).wrapped = !0), a.set(n.name, e), r === "accessor") {
		let { name: r } = n;
		return {
			set(n) {
				let i = t.get.call(this);
				t.set.call(this, n), this.requestUpdate(r, i, e, !0, n);
			},
			init(t) {
				return t !== void 0 && this.C(r, void 0, e, t), t;
			}
		};
	}
	if (r === "setter") {
		let { name: r } = n;
		return function(n) {
			let i = this[r];
			t.call(this, n), this.requestUpdate(r, i, e, !0, n);
		};
	}
	throw Error("Unsupported decorator location: " + r);
};
function Ee(e) {
	return (t, n) => typeof n == "object" ? Te(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function De(e) {
	return Ee({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
//#region src/helpers/battery-state.ts
function G(e, t = 10) {
	return e > t ? "charging" : e < -t ? "discharging" : "idle";
}
var K = 7, Oe = [
	9.8,
	8.4,
	7,
	5.6,
	4.2,
	2.8,
	1.4
];
function ke(e, t, n, r) {
	if (t === "idle") return 1;
	let i = t === "charging" ? n : r;
	if (i <= 0) return 1;
	let a = Math.min(Math.abs(e) / i, 1), o = Math.ceil(a * K);
	return Math.max(1, o);
}
function Ae(e, t, n, r, i) {
	let a = ke(e, t, n, r);
	if (t === "idle" || i === null || !Number.isInteger(i) || i < 1 || i > K) return a;
	let o = t === "charging" ? n : r;
	if (!(o > 0)) return a;
	let s = Math.min(Math.abs(e) / o, 1), c = .01, l = i;
	for (; l < K && s > l / K + c;) l++;
	for (; l > 1 && s < (l - 1) / K - c;) l--;
	return l;
}
function je(e, t, n, r, i) {
	return Oe[(i ?? ke(e, t, n, r)) - 1];
}
//#endregion
//#region src/components/battery-display.ts
function Me(e, t, n, r, i) {
	let a = Math.min(i, n / 2, r);
	return r <= 0 ? "" : r <= a ? `
      M ${e} ${t + r}
      L ${e} ${t + a}
      Q ${e} ${t} ${e + a} ${t}
      L ${e + n - a} ${t}
      Q ${e + n} ${t} ${e + n} ${t + a}
      L ${e + n} ${t + r}
      Z
    ` : `
    M ${e} ${t + r}
    L ${e} ${t + a}
    Q ${e} ${t} ${e + a} ${t}
    L ${e + n - a} ${t}
    Q ${e + n} ${t} ${e + n} ${t + a}
    L ${e + n} ${t + r}
    Z
  `;
}
function Ne(e, t) {
	let n = Math.min(Math.max(e.soc, 0), 100), r = e.power, i = e.maxChargePower, a = e.maxDischargePower, o = Math.min(Math.max(e.minSoc, 0), 100), s = Math.min(Math.max(e.maxSoc, 0), 100), c = G(r), l = 221 * n / 100, u = 286 - l, d = Me(32, u, 116, l, 10);
	return N`
    <div class="battery-wrapper">
      ${P`
        <svg
          class="battery battery--${c}"
          viewBox="0 25 180 320"
          role="img"
          aria-label="Battery state of charge ${n}%"
        >
          <defs>
            <clipPath id="battery-inner-clip">
              <rect
                x="${32}"
                y="${65}"
                width="${116}"
                height="${221}"
                rx="${10}"
              />
            </clipPath>
            <linearGradient
              id="battery-flow-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0" />
              <stop offset="35%" stop-color="#ffffff" stop-opacity="0.12" />
              <stop offset="50%" stop-color="#ffffff" stop-opacity="0.28" />
              <stop offset="65%" stop-color="#ffffff" stop-opacity="0.12" />
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
            </linearGradient>
          </defs>

          <path
            class="battery-terminal"
            d="
              M ${68} ${60}
              L ${68} ${48}
              Q ${68} ${42}
                ${74} ${42}
              L ${106} ${42}
              Q ${112} ${42}
                ${112} ${48}
              L ${112} ${60}
              Z
            "
          />

          <rect
            class="battery-outline"
            x="${25}"
            y="${58}"
            width="${130}"
            height="${235}"
            rx="${18}"
          />

          <rect
            class="battery-background"
            x="${32}"
            y="${65}"
            width="${116}"
            height="${221}"
            rx="${10}"
          />

          <g clip-path="url(#battery-inner-clip)">
            ${l > 0 ? P`
                    <path
                      class="battery-fill"
                      d="${d}"
                    />
                  ` : null}
            
            ${Fe(o, "min", 32, 65, 116, 221)}

            ${Fe(s, "max", 32, 65, 116, 221)}


            ${c === "idle" ? null : Pe(c, r, i, a, 32, u, 116, l, t)}
          </g>
        </svg>
      `}
    </div>
  `;
}
function Pe(e, t, n, r, i, a, o, s, c) {
	if (s <= 0 || e === "idle") return N``;
	let l = je(t, e, n, r, c), u = -(l / 2), d = e === "charging" ? a + s - 9 : a - 9;
	return P`
    <g
      class="battery-flow battery-flow--${e}"
      style="
        --flow-distance: ${s}px;
        --flow-duration: ${l}s;
        --flow-delay: ${u}s;
      "
    >
      <rect
        class="battery-flow-bar"
        x="${i}"
        y="${d}"
        width="${o}"
        height="${18}"
        rx="${9}"
      />

      <rect
        class="battery-flow-bar battery-flow-bar--delayed"
        x="${i}"
        y="${d}"
        width="${o}"
        height="${18}"
        rx="${9}"
      />
    </g>
  `;
}
function Fe(e, t, n, r, i, a) {
	if (e <= 0 || e >= 100) return null;
	let o = r + a - a * e / 100;
	return P`
    <g class="battery-limit battery-limit--${t}">
      <line
        class="battery-limit-line"
        x1="${n + 4}"
        y1="${o}"
        x2="${n + i - 4}"
        y2="${o}"
      />

      <text
        class="battery-limit-label"
        x="${n + i - 6}"
        y="${o - 4}"
        text-anchor="end"
      >
        ${e}%
      </text>
    </g>
  `;
}
//#endregion
//#region src/helpers/localize.ts
var Ie = {
	en: {
		charging: "Charging",
		discharging: "Discharging",
		idle: "Idle",
		max_charge: "Max. charge",
		max_discharge: "Max. discharge",
		current_capacity: "Current capacity",
		current_power: "Current power",
		estimated_time: "Estimated time",
		estimated_time_to: "Estimated time to",
		target_reached: "Target reached"
	},
	de: {
		charging: "Laden",
		discharging: "Entladen",
		idle: "Leerlauf",
		max_charge: "Max. Laden",
		max_discharge: "Max. Entladen",
		current_capacity: "Aktuelle Kapazität",
		current_power: "Aktuelle Leistung",
		estimated_time: "Geschätzte Zeit",
		estimated_time_to: "Geschätzte Zeit bis",
		target_reached: "Ziel erreicht"
	},
	nl: {
		charging: "Opladen",
		discharging: "Ontladen",
		idle: "Inactief",
		max_charge: "Max. laden",
		max_discharge: "Max. ontladen",
		current_capacity: "Huidige capaciteit",
		current_power: "Huidig vermogen",
		estimated_time: "Geschatte tijd",
		estimated_time_to: "Geschatte tijd tot",
		target_reached: "Doel bereikt"
	},
	fr: {
		charging: "Charge",
		discharging: "Décharge",
		idle: "Inactif",
		max_charge: "Charge max.",
		max_discharge: "Décharge max.",
		current_capacity: "Capacité actuelle",
		current_power: "Puissance actuelle",
		estimated_time: "Temps estimé",
		estimated_time_to: "Temps estimé jusqu'à",
		target_reached: "Objectif atteint"
	},
	pl: {
		charging: "Ładowanie",
		discharging: "Rozładowywanie",
		idle: "Bezczynny",
		max_charge: "Maks. ładowanie",
		max_discharge: "Maks. rozładowanie",
		current_capacity: "Aktualna pojemność",
		current_power: "Aktualna moc",
		estimated_time: "Szacowany czas",
		estimated_time_to: "Szacowany czas do",
		target_reached: "Cel osiągnięty"
	},
	es: {
		charging: "Cargando",
		discharging: "Descargando",
		idle: "Inactivo",
		max_charge: "Carga máx.",
		max_discharge: "Descarga máx.",
		current_capacity: "Capacidad actual",
		current_power: "Potencia actual",
		estimated_time: "Tiempo estimado",
		estimated_time_to: "Tiempo estimado hasta",
		target_reached: "Objetivo alcanzado"
	},
	it: {
		charging: "Carica",
		discharging: "Scarica",
		idle: "Inattivo",
		max_charge: "Carica max.",
		max_discharge: "Scarica max.",
		current_capacity: "Capacità attuale",
		current_power: "Potenza attuale",
		estimated_time: "Tempo stimato",
		estimated_time_to: "Tempo stimato fino a",
		target_reached: "Obiettivo raggiunto"
	},
	sv: {
		charging: "Laddar",
		discharging: "Urladdar",
		idle: "Inaktiv",
		max_charge: "Max. laddning",
		max_discharge: "Max. urladdning",
		current_capacity: "Aktuell kapacitet",
		current_power: "Aktuell effekt",
		estimated_time: "Beräknad tid",
		estimated_time_to: "Beräknad tid till",
		target_reached: "Mål uppnått"
	},
	pt: {
		charging: "A carregar",
		discharging: "A descarregar",
		idle: "Inativo",
		max_charge: "Carga máx.",
		max_discharge: "Descarga máx.",
		current_capacity: "Capacidade atual",
		current_power: "Potência atual",
		estimated_time: "Tempo estimado",
		estimated_time_to: "Tempo estimado até",
		target_reached: "Objetivo alcançado"
	},
	nb: {
		charging: "Lader",
		discharging: "Lader ut",
		idle: "Inaktiv",
		max_charge: "Maks. lading",
		max_discharge: "Maks. utlading",
		current_capacity: "Nåværende kapasitet",
		current_power: "Nåværende effekt",
		estimated_time: "Estimert tid",
		estimated_time_to: "Estimert tid til",
		target_reached: "Mål nådd"
	}
}, Le = "en";
function Re(e) {
	if (!e) return Le;
	let t = e.trim().toLowerCase().replace("_", "-").split("-")[0];
	return t in Ie ? t : Le;
}
function q(e, t) {
	return Ie[Re(t)][e];
}
//#endregion
//#region src/helpers/time-estimation.ts
function ze(e, t, n, r, i, a, o) {
	if (e === "idle" || n === 0 || r <= 0) return { status: "unavailable" };
	let s = Math.abs(n) / 1e3;
	if (s <= 0) return { status: "unavailable" };
	let c = (e === "charging" ? o : a) / 100 * r, l;
	if (l = e === "charging" ? c - i : i - c, l <= 0) return { status: "target_reached" };
	let u = l / s;
	return {
		status: "estimate",
		minutes: Math.round(u * 60)
	};
}
//#endregion
//#region src/components/battery-details.ts
function Be(e, t) {
	let n = G(e.power), r = ze(n, e.soc, e.power, e.capacityKwh, e.currentCapacityKwh, e.minSoc, e.maxSoc), i = Ge(n, e.minSoc, e.maxSoc);
	return N`
    <div class="battery-details">
      <div class="battery-details__soc">
        ${Ve(e.soc)}
      </div>

      <div class="battery-details__row">
        <span class="battery-details__label">
          ${q("current_capacity", t)}
        </span>

        <span class="battery-details__value">
          ${He(e.currentCapacityKwh)}
        </span>
      </div>

      <div class="battery-details__row">
        <span class="battery-details__label">
          ${q(n, t)}
        </span>

        <span class="battery-details__value">
          ${Ue(e.power)}
        </span>
      </div>

      <div class="battery-details__row">
        <span class="battery-details__label">
          ${i === null ? q("estimated_time", t) : `${q("estimated_time_to", t)} ${i}%`}
        </span>

        <span class="battery-details__value">
          ${We(r)}
        </span>
      </div>
    </div>
  `;
}
function Ve(e) {
	return `${e.toFixed(0)}%`;
}
function He(e) {
	return `${e.toFixed(2)} kWh`;
}
function Ue(e) {
	let t = Math.abs(e);
	return t >= 1e3 ? `${(t / 1e3).toFixed(2)} kW` : `${t.toFixed(0)} W`;
}
function We(e, t) {
	if (e.status === "target_reached") return q("target_reached", t);
	if (e.status === "unavailable") return "—";
	let n = e.minutes;
	if (n <= 0) return "0 min";
	let r = Math.floor(n / 60), i = n % 60;
	return r === 0 ? `${i} min` : i === 0 ? `${r} h` : `${r} h ${i} min`;
}
function Ge(e, t, n) {
	return e === "charging" ? n : e === "discharging" ? t : null;
}
//#endregion
//#region src/components/power-bar.ts
function Ke(e, t) {
	let n = e.power, r = n > 0, i = n < 0, a = r ? e.maxChargePower : e.maxDischargePower, o = (a > 0 ? Math.min(Math.abs(n) / a, 1) : 0) * 50;
	return N`
    <div class="power-bar-wrapper">
      <div class="power-bar-labels">
        <span>
          ${q("max_discharge", t)}:
          ${J(e.maxDischargePower)}
        </span>

        <span>
          ${q("max_charge", t)}:
          ${J(e.maxChargePower)}
        </span>
      </div>

      <div class="power-bar">
        <div class="power-bar-center"></div>

        ${i ? N`
                <div
                  class="power-bar-fill power-bar-fill--discharging"
                  style="
                    right: 50%;
                    width: ${o}%;
                  "
                ></div>
              ` : null}

        ${r ? N`
                <div
                  class="power-bar-fill power-bar-fill--charging"
                  style="
                    left: 50%;
                    width: ${o}%;
                  "
                ></div>
              ` : null}
      </div>
    </div>
  `;
}
function J(e) {
	return Math.abs(e) >= 1e3 ? `${(e / 1e3).toFixed(1)} kW` : `${e.toFixed(0)} W`;
}
//#endregion
//#region src/config/config-form.ts
function qe() {
	return {
		schema: [
			{
				name: "name",
				selector: { text: {} }
			},
			{
				name: "use_battery_sim_device",
				default: !1,
				selector: { boolean: {} }
			},
			{
				name: "battery_sim_device",
				selector: { device: { filter: { integration: "battery_sim" } } },
				visible: {
					field: "use_battery_sim_device",
					value: !0
				}
			},
			{
				name: "soc_entity",
				required: !0,
				selector: { entity: {} },
				visible: {
					field: "use_battery_sim_device",
					operator: "not_eq",
					value: !0
				}
			},
			{
				name: "current_capacity_entity",
				selector: { entity: {} },
				visible: {
					field: "use_battery_sim_device",
					operator: "not_eq",
					value: !0
				}
			},
			{
				name: "capacity_kwh",
				required: !0,
				selector: { number: {
					min: .1,
					step: .1,
					mode: "box",
					unit_of_measurement: "kWh"
				} },
				visible: {
					field: "use_battery_sim_device",
					operator: "not_eq",
					value: !0
				}
			},
			{
				type: "expandable",
				name: "",
				title: "Power",
				flatten: !0,
				schema: [
					{
						name: "use_split_power_entities",
						default: !1,
						selector: { boolean: {} }
					},
					{
						name: "power_entity",
						selector: { entity: {} },
						visible: {
							field: "use_split_power_entities",
							operator: "not_eq",
							value: !0
						}
					},
					{
						name: "charging_power_entity",
						selector: { entity: {} },
						visible: {
							field: "use_split_power_entities",
							value: !0
						}
					},
					{
						name: "discharging_power_entity",
						selector: { entity: {} },
						visible: {
							field: "use_split_power_entities",
							value: !0
						}
					}
				],
				visible: {
					field: "use_battery_sim_device",
					operator: "not_eq",
					value: !0
				}
			},
			{
				type: "expandable",
				name: "",
				title: "SOC limits",
				flatten: !0,
				schema: [
					{
						name: "use_soc_limit_entities",
						default: !1,
						selector: { boolean: {} }
					},
					{
						name: "min_soc",
						selector: { number: {
							min: 0,
							max: 100,
							step: 1,
							mode: "box",
							unit_of_measurement: "%"
						} },
						visible: {
							field: "use_soc_limit_entities",
							operator: "not_eq",
							value: !0
						}
					},
					{
						name: "max_soc",
						selector: { number: {
							min: 0,
							max: 100,
							step: 1,
							mode: "box",
							unit_of_measurement: "%"
						} },
						visible: {
							field: "use_soc_limit_entities",
							operator: "not_eq",
							value: !0
						}
					},
					{
						name: "min_soc_entity",
						selector: { entity: {} },
						visible: {
							field: "use_soc_limit_entities",
							value: !0
						}
					},
					{
						name: "max_soc_entity",
						selector: { entity: {} },
						visible: {
							field: "use_soc_limit_entities",
							value: !0
						}
					}
				],
				visible: {
					field: "use_battery_sim_device",
					operator: "not_eq",
					value: !0
				}
			},
			{
				type: "expandable",
				name: "",
				title: "Power limits",
				flatten: !0,
				schema: [
					{
						name: "use_power_limit_entities",
						default: !1,
						selector: { boolean: {} }
					},
					{
						name: "max_charge_power",
						selector: { number: {
							min: 0,
							step: 100,
							mode: "box",
							unit_of_measurement: "W"
						} },
						visible: {
							field: "use_power_limit_entities",
							operator: "not_eq",
							value: !0
						}
					},
					{
						name: "max_discharge_power",
						selector: { number: {
							min: 0,
							step: 100,
							mode: "box",
							unit_of_measurement: "W"
						} },
						visible: {
							field: "use_power_limit_entities",
							operator: "not_eq",
							value: !0
						}
					},
					{
						name: "max_charge_power_entity",
						selector: { entity: {} },
						visible: {
							field: "use_power_limit_entities",
							value: !0
						}
					},
					{
						name: "max_discharge_power_entity",
						selector: { entity: {} },
						visible: {
							field: "use_power_limit_entities",
							value: !0
						}
					}
				],
				visible: {
					field: "use_battery_sim_device",
					operator: "not_eq",
					value: !0
				}
			}
		],
		computeLabel: (e) => {
			switch (e.name) {
				case "name": return "Battery name";
				case "soc_entity": return "SOC entity";
				case "current_capacity_entity": return "Current capacity entity";
				case "capacity_kwh": return "Battery capacity";
				case "power_entity": return "Bidirectional power entity";
				case "charging_power_entity": return "Charging power entity";
				case "discharging_power_entity": return "Discharging power entity";
				case "min_soc_entity": return "Minimum SOC entity";
				case "max_soc_entity": return "Maximum SOC entity";
				case "min_soc": return "Minimum SOC";
				case "max_soc": return "Maximum SOC";
				case "max_charge_power_entity": return "Maximum charging power entity";
				case "max_discharge_power_entity": return "Maximum discharging power entity";
				case "max_charge_power": return "Maximum charging power";
				case "max_discharge_power": return "Maximum discharging power";
				case "use_battery_sim_device": return "Use Battery Simulator device";
				case "battery_sim_device": return "Battery Simulator device";
				default: return;
			}
		}
	};
}
//#endregion
//#region src/styles/card-styles.ts
var Je = o`
  :host {
    display: block;
  }

  .card {
    container-type: inline-size;
    container-name: battery-card;

    --battery-width: clamp(105px, 34cqw, 180px);
    --summary-gap: clamp(4px, 2cqw, 8px);
  }

  @container battery-card (max-width: 520px) {
    .card {
      --battery-width: clamp(95px, 28cqw, 145px);
      --summary-gap: 6px;
    }

    .battery-details__soc {
      font-size: clamp(36px, 9cqw, 52px);
    }
  }

  .battery-card-header {
    width: min(520px, calc(100% - 32px));
    margin: 16px auto 0px;
    color: var(--primary-text-color, #424242);
    font-size: 30px;
    font-weight: 700;
    line-height: 1.2;
    text-align: center;
  }

  .battery-summary {
    display: grid;
    grid-template-columns: var(--battery-width) minmax(0, 1fr);
    gap: var(--summary-gap);
    align-items: center;
    width: min(520px, calc(100% - 20px));
    margin: 0 auto;
  }
  .battery-summary__visual {
    display: flex;
    justify-content: center;
  }

  .battery-summary__details {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .battery-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 0;
  }

  .battery {
    display: block;
    width: 100%;
    height: auto;
  }

  .battery-outline {
    fill: transparent;
    stroke: var(--primary-text-color, #424242);
    stroke-width: 6;
  }

  .battery-terminal {
    fill: var(--primary-text-color, #424242);
  }

  .battery-background {
    fill: rgba(0, 0, 0, 0.08);
  }

  .battery-fill {
    fill: #4caf50;
  }

  .battery--charging .battery-fill {
    fill: #4caf50;
  }

  .battery--discharging .battery-fill {
    fill: #ff9800;
  }

  .battery--idle .battery-fill {
    fill: #78909c;
  }

  .battery-limit-line {
    stroke-width: 2;
    stroke-dasharray: 6 4;
    opacity: 0.65;
  }

  .battery-limit--min .battery-limit-line {
    stroke: #c20707;
  }

  .battery-limit--max .battery-limit-line {
    stroke: #0f325e;
  }

  .battery-limit-label {
    font-size: 10px;
    font-weight: 600;
    opacity: 0.7;
  }

  .battery-limit--min .battery-limit-label {
    fill: #c20707;
  }

  .battery-limit--max .battery-limit-label {
    fill: #0f325e;
  }

  .battery-flow-bar {
    fill: url(#battery-flow-gradient);
  }

  .battery-flow--charging .battery-flow-bar {
    animation:
      battery-flow-up
      var(--flow-duration)
      linear
      infinite;
  }

  .battery-flow--discharging .battery-flow-bar {
    animation:
      battery-flow-down
      var(--flow-duration)
      linear
      infinite;
  }

  .battery-flow-bar--delayed {
    animation-delay: var(--flow-delay) !important;
  }

  @keyframes battery-flow-up {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    85% {
      opacity: 1;
    }

    to {
      transform: translateY(calc(-1 * var(--flow-distance)));
      opacity: 0;
    }
  }

  @keyframes battery-flow-down {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    85% {
      opacity: 1;
    }

    to {
      transform: translateY(var(--flow-distance));
      opacity: 0;
    }
  }

  .battery-details {
    width: 100%;
    min-width: 0;
  }

  .battery-details__soc {
    margin-bottom: 20px;
    color: var(--primary-text-color, #424242);
    font-size: clamp(38px, 10cqw, 60px);
    font-weight: 700;
    line-height: 1;
  }

  .battery-details__row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: baseline;
    margin-bottom: 8px;
  }

  .battery-details__label {
    color: var(--secondary-text-color, #666666);
    font-size: clamp(12px, 3.2cqw, 14px);
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .battery-details__value {
    color: var(--primary-text-color, #424242);
    font-size: clamp(12px, 3.2cqw, 14px);
    font-weight: 600;
    text-align: right;
    white-space: nowrap;
  }

  .power-bar-wrapper {
    width: min(520px, calc(100% - 32px));
    margin: -30px auto 24px;
    padding-left: 20px;
    padding-right: 2px;
    box-sizing: border-box;
  }

  .power-bar-labels {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    color: var(--secondary-text-color, #666666);
    font-size: 13px;
  }

  .power-bar {
    position: relative;
    width: 100%;
    height: 18px;
    overflow: hidden;
    background: rgba(127, 127, 127, 0.16);
    border-radius: 9px;
  }

  .power-bar-center {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-1px);
    background: var(--primary-text-color, #424242);
    opacity: 0.55;
    z-index: 2;
  }

  .power-bar-fill {
    position: absolute;
    top: 0;
    bottom: 0;
    transition: width 0.25s ease;
  }

  .power-bar-fill--charging {
    background: #4caf50;
  }

  .power-bar-fill--discharging {
    background: #ff9800;
  }

  .card-error {
    padding: 16px;
    color: var(--error-color, #db4437);
    font-weight: 600;
  }



  @container battery-card (max-width: 370px) {
    .card {
      --battery-width: clamp(85px, 26cqw, 120px);
      --summary-gap: 4px;
    }

    .battery-details__row {
      gap: 6px;
      margin-bottom: 6px;
    }

    .battery-details__soc {
      margin-bottom: 12px;
      font-size: 34px;
    }

    .battery-card-header {
      font-size: 24px;
    }

    .power-bar-labels {
      font-size: 10px;
    }
  }
  
  .card-setup-message {
    padding: 32px 16px;
    color: var(--secondary-text-color, #666666);
    font-size: 14px;
    text-align: center;
  }
`;
//#endregion
//#region src/helpers/entity-value.ts
function Y(e, t) {
	let n = e.states[t];
	if (!n) return null;
	let r = Number(n.state);
	return Number.isFinite(r) ? r : null;
}
function X(e, t) {
	let n = e.states[t];
	if (!n) return null;
	let r = Number(n.state);
	if (!Number.isFinite(r)) return null;
	let i = n.attributes.unit_of_measurement;
	switch (i) {
		case "kW": return r * 1e3;
		case "MW": return r * 1e6;
		case "W":
		case void 0:
		case null: return r;
		default: return console.warn(`[Battery Flow Card] Unsupported power unit "${String(i)}" for ${t}. Value is interpreted as watts.`), r;
	}
}
function Ye(e, t) {
	let n = e.states[t];
	if (!n) return null;
	let r = Number(n.state);
	if (!Number.isFinite(r)) return null;
	let i = n.attributes.unit_of_measurement;
	switch (i) {
		case "Wh": return r / 1e3;
		case "kWh": return r;
		case "MWh": return r * 1e3;
		case void 0:
		case null: return r;
		default: return console.warn(`[Battery Flow Card] Unsupported energy unit "${String(i)}" for ${t}. Value is interpreted as kWh.`), r;
	}
}
//#endregion
//#region src/helpers/power-source.ts
function Xe(e, t) {
	if (t.power_entity) return X(e, t.power_entity);
	let n = t.charging_power_entity ? X(e, t.charging_power_entity) : 0, r = t.discharging_power_entity ? X(e, t.discharging_power_entity) : 0;
	return n === null || r === null ? null : n > 0 ? n : r > 0 ? -r : 0;
}
//#endregion
//#region src/helpers/battery-sim-device.ts
function Ze(e, t) {
	let n = Object.values(e.entities).filter((e) => e.device_id === t && e.platform === "battery_sim");
	if (n.length === 0) return console.error(`[Battery Flow Card] No Battery Simulator entities found for device ${t}.`), null;
	let r = e.devices[t], i = Qe(e, n), a = Z(n, "State of charge"), o = Z(n, "Current charging rate"), s = Z(n, "Current discharging rate"), c = Z(n, "Minimum soc"), l = Z(n, "Maximum soc"), u = Z(n, "Charge limit"), d = Z(n, "Discharge limit");
	if (!i) return console.error("[Battery Flow Card] Main Battery Simulator sensor not found."), null;
	if (!a) return console.error("[Battery Flow Card] Battery Simulator SOC entity not found."), null;
	if (!o || !s) return console.error("[Battery Flow Card] Battery Simulator power entities not found."), null;
	let f = e.states[i.entity_id];
	if (!f) return null;
	let p = Ye(e, i.entity_id), m = Y(e, a.entity_id), h = X(e, o.entity_id), g = X(e, s.entity_id);
	if (p === null || m === null || h === null || g === null) return console.error("[Battery Flow Card] Invalid Battery Simulator state values."), null;
	let ee = $e(f.attributes, "size_kwh"), _ = m > 0 ? p / (m / 100) : null, v = ee ?? _;
	if (v === null || !Number.isFinite(v) || v <= 0) return console.error("[Battery Flow Card] Battery Simulator capacity could not be determined."), null;
	let y = c ? Y(e, c.entity_id) ?? 0 : 0, b = l ? Y(e, l.entity_id) ?? 100 : 100, x = u ? X(e, u.entity_id) ?? 0 : 0, S = d ? X(e, d.entity_id) ?? 0 : 0, C = h > 0 ? h : g > 0 ? -g : 0;
	return {
		name: r?.name_by_user ?? r?.name ?? "Battery Simulator",
		soc: m,
		power: C,
		capacityKwh: v,
		currentCapacityKwh: p,
		minSoc: y,
		maxSoc: b,
		maxChargePower: x,
		maxDischargePower: S
	};
}
function Qe(e, t) {
	return t.find((t) => t.entity_id.startsWith("sensor.") ? e.states[t.entity_id]?.attributes.size_kwh !== void 0 : !1) || t.find((t) => !t.entity_id.startsWith("sensor.") || t.name ? !1 : e.states[t.entity_id]?.attributes.unit_of_measurement === "kWh");
}
function Z(e, t) {
	let n = t.trim().toLowerCase();
	return e.find((e) => e.name?.trim().toLowerCase() === n);
}
function $e(e, t) {
	let n = Number(e[t]);
	return Number.isFinite(n) ? n : null;
}
//#endregion
//#region \0@oxc-project+runtime@0.149.0/helpers/esm/decorate.js
function Q(e, t, n, r) {
	var i = arguments.length, a = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, n) : r, o;
	if (typeof Reflect == "object" && typeof Reflect.decorate == "function") a = Reflect.decorate(e, t, n, r);
	else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
	return i > 3 && a && Object.defineProperty(t, n, a), a;
}
//#endregion
//#region src/battery-flow-card.ts
var $ = class extends W {
	constructor(...e) {
		super(...e), this.previousFlowState = "idle", this.previousFlowSpeedLevel = null;
	}
	static {
		this.styles = Je;
	}
	setConfig(e) {
		if (!e) throw Error("Invalid configuration");
		this.config = {
			...e,
			capacity_kwh: e.capacity_kwh ?? 7,
			min_soc: e.min_soc ?? 0,
			max_soc: e.max_soc ?? 100
		}, this.previousFlowState = "idle", this.previousFlowSpeedLevel = null;
	}
	static getConfigForm() {
		return qe();
	}
	static getStubConfig() {
		return {
			name: "Battery",
			use_battery_sim_device: !1,
			battery_sim_device: "",
			soc_entity: "",
			use_split_power_entities: !1,
			power_entity: "",
			capacity_kwh: 7,
			use_soc_limit_entities: !1,
			min_soc: 0,
			max_soc: 100,
			use_power_limit_entities: !1,
			max_charge_power: 3e3,
			max_discharge_power: 3e3
		};
	}
	render() {
		if (!this.config) return N``;
		let e = !!(this.config.use_battery_sim_device && this.config.battery_sim_device), t = !!this.config.soc_entity, n = !!(this.config.power_entity || this.config.charging_power_entity || this.config.discharging_power_entity);
		if (!e && (!t || !n)) return N`
        <div class="card card--setup">
          <div class="battery-card-header">
            ${this.config.name ?? "Battery"}
          </div>

          <div class="card-setup-message">
            Configure the battery entities to display the preview.
          </div>
        </div>
      `;
		if (!this.hass) return N`
        <div class="card-error">
          Home Assistant data unavailable
        </div>
      `;
		let r = this.getBatteryData();
		if (!r) return N`
        <div class="card-error">
          Battery data unavailable
        </div>
      `;
		let i = G(r.power), a = i === this.previousFlowState ? this.previousFlowSpeedLevel : null, o = Ae(r.power, i, r.maxChargePower, r.maxDischargePower, a);
		return this.previousFlowState = i, this.previousFlowSpeedLevel = i === "idle" ? null : o, N`
      <div class="card">
        <div class="battery-card-header">
          ${r.name}
        </div>

        <div class="battery-summary">
          <div class="battery-summary__visual">
            ${Ne(r, o)}
          </div>

          <div class="battery-summary__details">
            ${Be(r, this.hass.language)}
          </div>
        </div>

        ${Ke(r, this.hass.language)}
      </div>
    `;
	}
	getBatteryData() {
		if (!this.hass || !this.config) return null;
		if (this.config.use_battery_sim_device && this.config.battery_sim_device) return Ze(this.hass, this.config.battery_sim_device);
		let e = this.hass.states[this.config.soc_entity];
		if (!e) return null;
		let t = Xe(this.hass, this.config);
		if (t === null) return null;
		let n = Number(e.state), r = this.config.capacity_kwh * (n / 100), i = this.config.current_capacity_entity ? Ye(this.hass, this.config.current_capacity_entity) ?? r : r, a = this.getConfiguredNumericValue(this.config.min_soc_entity, this.config.min_soc, 0), o = this.getConfiguredNumericValue(this.config.max_soc_entity, this.config.max_soc, 100), s = this.getConfiguredPowerWatts(this.config.max_charge_power_entity, this.config.max_charge_power, 0), c = this.getConfiguredPowerWatts(this.config.max_discharge_power_entity, this.config.max_discharge_power, 0);
		return !Number.isFinite(n) || !Number.isFinite(t) ? null : {
			name: this.config.name ?? "Battery",
			soc: n,
			power: t,
			capacityKwh: this.config.capacity_kwh,
			currentCapacityKwh: i,
			minSoc: a,
			maxSoc: o,
			maxChargePower: s,
			maxDischargePower: c
		};
	}
	getConfiguredNumericValue(e, t, n) {
		if (this.hass && e) {
			let t = Y(this.hass, e);
			if (t !== null) return t;
		}
		return t !== void 0 && Number.isFinite(t) ? t : n;
	}
	getConfiguredPowerWatts(e, t, n) {
		if (this.hass && e) {
			let t = X(this.hass, e);
			if (t !== null) return t;
		}
		return t !== void 0 && Number.isFinite(t) ? t : n;
	}
};
Q([Ee({ attribute: !1 })], $.prototype, "hass", void 0), Q([De()], $.prototype, "config", void 0), $ = Q([Ce("battery-flow-card")], $), window.customCards = window.customCards || [], window.customCards.push({
	type: "battery-flow-card",
	name: "Battery Flow Card",
	description: "Visualizes battery SOC, power flow and SOC limits.",
	preview: !0,
	documentationURL: "https://github.com/Bhomas86/battery-flow-card"
});
//#endregion
export { $ as BatteryFlowCard };
