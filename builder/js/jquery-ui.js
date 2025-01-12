/*! jQuery UI - v1.11.4 - 2017-12-18
 * http://jqueryui.com
 * Includes: core.js, widget.js, mouse.js, position.js, draggable.js, resizable.js, sortable.js, tooltip.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

(function (t) {
	"function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
})(function (t) {
	function e(e, s) {
		var n, o, a, r = e.nodeName.toLowerCase();
		return "area" === r ? (n = e.parentNode, o = n.name, e.href && o && "map" === n.nodeName.toLowerCase() ? (a = t("img[usemap='#" + o + "']")[0], !!a && i(a)) : !1) : (/^(input|select|textarea|button|object)$/.test(r) ? !e.disabled : "a" === r ? e.href || s : s) && i(e)
	}

	function i(e) {
		return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function () {
			return "hidden" === t.css(this, "visibility")
		}).length
	}

	t.ui = t.ui || {}, t.extend(t.ui, {
		version: "1.11.4",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38
		}
	}), t.fn.extend({
		scrollParent: function (e) {
			var i = this.css("position"), s = "absolute" === i, n = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
				o = this.parents().filter(function () {
					var e = t(this);
					return s && "static" === e.css("position") ? !1 : n.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
				}).eq(0);
			return "fixed" !== i && o.length ? o : t(this[0].ownerDocument || document)
		}, uniqueId: function () {
			var t = 0;
			return function () {
				return this.each(function () {
					this.id || (this.id = "ui-id-" + ++t)
				})
			}
		}(), removeUniqueId: function () {
			return this.each(function () {
				/^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
			})
		}
	}), t.extend(t.expr[":"], {
		data: t.expr.createPseudo ? t.expr.createPseudo(function (e) {
			return function (i) {
				return !!t.data(i, e)
			}
		}) : function (e, i, s) {
			return !!t.data(e, s[3])
		}, focusable: function (i) {
			return e(i, !isNaN(t.attr(i, "tabindex")))
		}, tabbable: function (i) {
			var s = t.attr(i, "tabindex"), n = isNaN(s);
			return (n || s >= 0) && e(i, !n)
		}
	}), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function (e, i) {
		function s(e, i, s, o) {
			return t.each(n, function () {
				i -= parseFloat(t.css(e, "padding" + this)) || 0, s && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
			}), i
		}

		var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"], o = i.toLowerCase(), a = {
			innerWidth: t.fn.innerWidth,
			innerHeight: t.fn.innerHeight,
			outerWidth: t.fn.outerWidth,
			outerHeight: t.fn.outerHeight
		};
		t.fn["inner" + i] = function (e) {
			return void 0 === e ? a["inner" + i].call(this) : this.each(function () {
				t(this).css(o, s(this, e) + "px")
			})
		}, t.fn["outer" + i] = function (e, n) {
			return "number" != typeof e ? a["outer" + i].call(this, e) : this.each(function () {
				t(this).css(o, s(this, e, !0, n) + "px")
			})
		}
	}), t.fn.addBack || (t.fn.addBack = function (t) {
		return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
	}), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function (e) {
		return function (i) {
			return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
		}
	}(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.fn.extend({
		focus: function (e) {
			return function (i, s) {
				return "number" == typeof i ? this.each(function () {
					var e = this;
					setTimeout(function () {
						t(e).focus(), s && s.call(e)
					}, i)
				}) : e.apply(this, arguments)
			}
		}(t.fn.focus), disableSelection: function () {
			var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
			return function () {
				return this.bind(t + ".ui-disableSelection", function (t) {
					t.preventDefault()
				})
			}
		}(), enableSelection: function () {
			return this.unbind(".ui-disableSelection")
		}, zIndex: function (e) {
			if (void 0 !== e) return this.css("zIndex", e);
			if (this.length) for (var i, s, n = t(this[0]); n.length && n[0] !== document;) {
				if (i = n.css("position"), ("absolute" === i || "relative" === i || "fixed" === i) && (s = parseInt(n.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
				n = n.parent()
			}
			return 0
		}
	}), t.ui.plugin = {
		add: function (e, i, s) {
			var n, o = t.ui[e].prototype;
			for (n in s) o.plugins[n] = o.plugins[n] || [], o.plugins[n].push([i, s[n]])
		}, call: function (t, e, i, s) {
			var n, o = t.plugins[e];
			if (o && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)) for (n = 0; o.length > n; n++) t.options[o[n][0]] && o[n][1].apply(t.element, i)
		}
	};
	var s = 0, n = Array.prototype.slice;
	t.cleanData = function (e) {
		return function (i) {
			var s, n, o;
			for (o = 0; null != (n = i[o]); o++) try {
				s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove")
			} catch (a) {
			}
			e(i)
		}
	}(t.cleanData), t.widget = function (e, i, s) {
		var n, o, a, r, l = {}, h = e.split(".")[0];
		return e = e.split(".")[1], n = h + "-" + e, s || (s = i, i = t.Widget), t.expr[":"][n.toLowerCase()] = function (e) {
			return !!t.data(e, n)
		}, t[h] = t[h] || {}, o = t[h][e], a = t[h][e] = function (t, e) {
			return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new a(t, e)
		}, t.extend(a, o, {
			version: s.version,
			_proto: t.extend({}, s),
			_childConstructors: []
		}), r = new i, r.options = t.widget.extend({}, r.options), t.each(s, function (e, s) {
			return t.isFunction(s) ? (l[e] = function () {
				var t = function () {
					return i.prototype[e].apply(this, arguments)
				}, n = function (t) {
					return i.prototype[e].apply(this, t)
				};
				return function () {
					var e, i = this._super, o = this._superApply;
					return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = o, e
				}
			}(), void 0) : (l[e] = s, void 0)
		}), a.prototype = t.widget.extend(r, {widgetEventPrefix: o ? r.widgetEventPrefix || e : e}, l, {
			constructor: a,
			namespace: h,
			widgetName: e,
			widgetFullName: n
		}), o ? (t.each(o._childConstructors, function (e, i) {
			var s = i.prototype;
			t.widget(s.namespace + "." + s.widgetName, a, i._proto)
		}), delete o._childConstructors) : i._childConstructors.push(a), t.widget.bridge(e, a), a
	}, t.widget.extend = function (e) {
		for (var i, s, o = n.call(arguments, 1), a = 0, r = o.length; r > a; a++) for (i in o[a]) s = o[a][i], o[a].hasOwnProperty(i) && void 0 !== s && (e[i] = t.isPlainObject(s) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], s) : t.widget.extend({}, s) : s);
		return e
	}, t.widget.bridge = function (e, i) {
		var s = i.prototype.widgetFullName || e;
		t.fn[e] = function (o) {
			var a = "string" == typeof o, r = n.call(arguments, 1), l = this;
			return a ? this.each(function () {
				var i, n = t.data(this, s);
				return "instance" === o ? (l = n, !1) : n ? t.isFunction(n[o]) && "_" !== o.charAt(0) ? (i = n[o].apply(n, r), i !== n && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + o + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + o + "'")
			}) : (r.length && (o = t.widget.extend.apply(null, [o].concat(r))), this.each(function () {
				var e = t.data(this, s);
				e ? (e.option(o || {}), e._init && e._init()) : t.data(this, s, new i(o, this))
			})), l
		}
	}, t.Widget = function () {
	}, t.Widget._childConstructors = [], t.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {disabled: !1, create: null},
		_createWidget: function (e, i) {
			i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = s++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), i !== this && (t.data(i, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function (t) {
					t.target === i && this.destroy()
				}
			}), this.document = t(i.style ? i.ownerDocument : i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
		},
		_getCreateOptions: t.noop,
		_getCreateEventData: t.noop,
		_create: t.noop,
		_init: t.noop,
		destroy: function () {
			this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
		},
		_destroy: t.noop,
		widget: function () {
			return this.element
		},
		option: function (e, i) {
			var s, n, o, a = e;
			if (0 === arguments.length) return t.widget.extend({}, this.options);
			if ("string" == typeof e) if (a = {}, s = e.split("."), e = s.shift(), s.length) {
				for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; s.length - 1 > o; o++) n[s[o]] = n[s[o]] || {}, n = n[s[o]];
				if (e = s.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e];
				n[e] = i
			} else {
				if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
				a[e] = i
			}
			return this._setOptions(a), this
		},
		_setOptions: function (t) {
			var e;
			for (e in t) this._setOption(e, t[e]);
			return this
		},
		_setOption: function (t, e) {
			return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
		},
		enable: function () {
			return this._setOptions({disabled: !1})
		},
		disable: function () {
			return this._setOptions({disabled: !0})
		},
		_on: function (e, i, s) {
			var n, o = this;
			"boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function (s, a) {
				function r() {
					return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0
				}

				"string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++);
				var l = s.match(/^([\w:-]*)\s*(.*)$/), h = l[1] + o.eventNamespace, c = l[2];
				c ? n.delegate(c, h, r) : i.bind(h, r)
			})
		},
		_off: function (e, i) {
			i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(i).undelegate(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
		},
		_delay: function (t, e) {
			function i() {
				return ("string" == typeof t ? s[t] : t).apply(s, arguments)
			}

			var s = this;
			return setTimeout(i, e || 0)
		},
		_hoverable: function (e) {
			this.hoverable = this.hoverable.add(e), this._on(e, {
				mouseenter: function (e) {
					t(e.currentTarget).addClass("ui-state-hover")
				}, mouseleave: function (e) {
					t(e.currentTarget).removeClass("ui-state-hover")
				}
			})
		},
		_focusable: function (e) {
			this.focusable = this.focusable.add(e), this._on(e, {
				focusin: function (e) {
					t(e.currentTarget).addClass("ui-state-focus")
				}, focusout: function (e) {
					t(e.currentTarget).removeClass("ui-state-focus")
				}
			})
		},
		_trigger: function (e, i, s) {
			var n, o, a = this.options[e];
			if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (n in o) n in i || (i[n] = o[n]);
			return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
		}
	}, t.each({show: "fadeIn", hide: "fadeOut"}, function (e, i) {
		t.Widget.prototype["_" + e] = function (s, n, o) {
			"string" == typeof n && (n = {effect: n});
			var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
			n = n || {}, "number" == typeof n && (n = {duration: n}), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function (i) {
				t(this)[e](), o && o.call(s[0]), i()
			})
		}
	}), t.widget;
	var o = !1;
	t(document).mouseup(function () {
		o = !1
	}), t.widget("ui.mouse", {
		version: "1.11.4",
		options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0},
		_mouseInit: function () {
			var e = this;
			this.element.bind("mousedown." + this.widgetName, function (t) {
				return e._mouseDown(t)
			}).bind("click." + this.widgetName, function (i) {
				return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
			}), this.started = !1
		},
		_mouseDestroy: function () {
			this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function (e) {
			if (!o) {
				this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
				var i = this, s = 1 === e.which,
					n = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1;
				return s && !n && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
					i.mouseDelayMet = !0
				}, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) {
					return i._mouseMove(t)
				}, this._mouseUpDelegate = function (t) {
					return i._mouseUp(t)
				}, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), o = !0, !0)) : !0
			}
		},
		_mouseMove: function (e) {
			if (this._mouseMoved) {
				if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);
				if (!e.which) return this._mouseUp(e)
			}
			return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
		},
		_mouseUp: function (e) {
			return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), o = !1, !1
		},
		_mouseDistanceMet: function (t) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function () {
			return this.mouseDelayMet
		},
		_mouseStart: function () {
		},
		_mouseDrag: function () {
		},
		_mouseStop: function () {
		},
		_mouseCapture: function () {
			return !0
		}
	}), function () {
		function e(t, e, i) {
			return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
		}

		function i(e, i) {
			return parseInt(t.css(e, i), 10) || 0
		}

		function s(e) {
			var i = e[0];
			return 9 === i.nodeType ? {
				width: e.width(),
				height: e.height(),
				offset: {top: 0, left: 0}
			} : t.isWindow(i) ? {
				width: e.width(),
				height: e.height(),
				offset: {top: e.scrollTop(), left: e.scrollLeft()}
			} : i.preventDefault ? {
				width: 0,
				height: 0,
				offset: {top: i.pageY, left: i.pageX}
			} : {width: e.outerWidth(), height: e.outerHeight(), offset: e.offset()}
		}

		t.ui = t.ui || {};
		var n, o, a = Math.max, r = Math.abs, l = Math.round, h = /left|center|right/, c = /top|center|bottom/,
			u = /[\+\-]\d+(\.[\d]+)?%?/, d = /^\w+/, p = /%$/, f = t.fn.position;
		t.position = {
			scrollbarWidth: function () {
				if (void 0 !== n) return n;
				var e, i,
					s = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
					o = s.children()[0];
				return t("body").append(s), e = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, e === i && (i = s[0].clientWidth), s.remove(), n = e - i
			}, getScrollInfo: function (e) {
				var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
					s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
					n = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
					o = "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight;
				return {width: o ? t.position.scrollbarWidth() : 0, height: n ? t.position.scrollbarWidth() : 0}
			}, getWithinInfo: function (e) {
				var i = t(e || window), s = t.isWindow(i[0]), n = !!i[0] && 9 === i[0].nodeType;
				return {
					element: i,
					isWindow: s,
					isDocument: n,
					offset: i.offset() || {left: 0, top: 0},
					scrollLeft: i.scrollLeft(),
					scrollTop: i.scrollTop(),
					width: s || n ? i.width() : i.outerWidth(),
					height: s || n ? i.height() : i.outerHeight()
				}
			}
		}, t.fn.position = function (n) {
			if (!n || !n.of) return f.apply(this, arguments);
			n = t.extend({}, n);
			var p, g, m, _, v, b, y = t(n.of), w = t.position.getWithinInfo(n.within), k = t.position.getScrollInfo(w),
				x = (n.collision || "flip").split(" "), C = {};
			return b = s(y), y[0].preventDefault && (n.at = "left top"), g = b.width, m = b.height, _ = b.offset, v = t.extend({}, _), t.each(["my", "at"], function () {
				var t, e, i = (n[this] || "").split(" ");
				1 === i.length && (i = h.test(i[0]) ? i.concat(["center"]) : c.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = h.test(i[0]) ? i[0] : "center", i[1] = c.test(i[1]) ? i[1] : "center", t = u.exec(i[0]), e = u.exec(i[1]), C[this] = [t ? t[0] : 0, e ? e[0] : 0], n[this] = [d.exec(i[0])[0], d.exec(i[1])[0]]
			}), 1 === x.length && (x[1] = x[0]), "right" === n.at[0] ? v.left += g : "center" === n.at[0] && (v.left += g / 2), "bottom" === n.at[1] ? v.top += m : "center" === n.at[1] && (v.top += m / 2), p = e(C.at, g, m), v.left += p[0], v.top += p[1], this.each(function () {
				var s, h, c = t(this), u = c.outerWidth(), d = c.outerHeight(), f = i(this, "marginLeft"),
					b = i(this, "marginTop"), D = u + f + i(this, "marginRight") + k.width,
					T = d + b + i(this, "marginBottom") + k.height, I = t.extend({}, v),
					M = e(C.my, c.outerWidth(), c.outerHeight());
				"right" === n.my[0] ? I.left -= u : "center" === n.my[0] && (I.left -= u / 2), "bottom" === n.my[1] ? I.top -= d : "center" === n.my[1] && (I.top -= d / 2), I.left += M[0], I.top += M[1], o || (I.left = l(I.left), I.top = l(I.top)), s = {
					marginLeft: f,
					marginTop: b
				}, t.each(["left", "top"], function (e, i) {
					t.ui.position[x[e]] && t.ui.position[x[e]][i](I, {
						targetWidth: g,
						targetHeight: m,
						elemWidth: u,
						elemHeight: d,
						collisionPosition: s,
						collisionWidth: D,
						collisionHeight: T,
						offset: [p[0] + M[0], p[1] + M[1]],
						my: n.my,
						at: n.at,
						within: w,
						elem: c
					})
				}), n.using && (h = function (t) {
					var e = _.left - I.left, i = e + g - u, s = _.top - I.top, o = s + m - d, l = {
						target: {element: y, left: _.left, top: _.top, width: g, height: m},
						element: {element: c, left: I.left, top: I.top, width: u, height: d},
						horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
						vertical: 0 > o ? "top" : s > 0 ? "bottom" : "middle"
					};
					u > g && g > r(e + i) && (l.horizontal = "center"), d > m && m > r(s + o) && (l.vertical = "middle"), l.important = a(r(e), r(i)) > a(r(s), r(o)) ? "horizontal" : "vertical", n.using.call(this, t, l)
				}), c.offset(t.extend(I, {using: h}))
			})
		}, t.ui.position = {
			fit: {
				left: function (t, e) {
					var i, s = e.within, n = s.isWindow ? s.scrollLeft : s.offset.left, o = s.width,
						r = t.left - e.collisionPosition.marginLeft, l = n - r, h = r + e.collisionWidth - o - n;
					e.collisionWidth > o ? l > 0 && 0 >= h ? (i = t.left + l + e.collisionWidth - o - n, t.left += l - i) : t.left = h > 0 && 0 >= l ? n : l > h ? n + o - e.collisionWidth : n : l > 0 ? t.left += l : h > 0 ? t.left -= h : t.left = a(t.left - r, t.left)
				}, top: function (t, e) {
					var i, s = e.within, n = s.isWindow ? s.scrollTop : s.offset.top, o = e.within.height,
						r = t.top - e.collisionPosition.marginTop, l = n - r, h = r + e.collisionHeight - o - n;
					e.collisionHeight > o ? l > 0 && 0 >= h ? (i = t.top + l + e.collisionHeight - o - n, t.top += l - i) : t.top = h > 0 && 0 >= l ? n : l > h ? n + o - e.collisionHeight : n : l > 0 ? t.top += l : h > 0 ? t.top -= h : t.top = a(t.top - r, t.top)
				}
			}, flip: {
				left: function (t, e) {
					var i, s, n = e.within, o = n.offset.left + n.scrollLeft, a = n.width,
						l = n.isWindow ? n.scrollLeft : n.offset.left, h = t.left - e.collisionPosition.marginLeft,
						c = h - l, u = h + e.collisionWidth - a - l,
						d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
						p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
						f = -2 * e.offset[0];
					0 > c ? (i = t.left + d + p + f + e.collisionWidth - a - o, (0 > i || r(c) > i) && (t.left += d + p + f)) : u > 0 && (s = t.left - e.collisionPosition.marginLeft + d + p + f - l, (s > 0 || u > r(s)) && (t.left += d + p + f))
				}, top: function (t, e) {
					var i, s, n = e.within, o = n.offset.top + n.scrollTop, a = n.height,
						l = n.isWindow ? n.scrollTop : n.offset.top, h = t.top - e.collisionPosition.marginTop,
						c = h - l, u = h + e.collisionHeight - a - l, d = "top" === e.my[1],
						p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
						f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
						g = -2 * e.offset[1];
					0 > c ? (s = t.top + p + f + g + e.collisionHeight - a - o, (0 > s || r(c) > s) && (t.top += p + f + g)) : u > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + g - l, (i > 0 || u > r(i)) && (t.top += p + f + g))
				}
			}, flipfit: {
				left: function () {
					t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
				}, top: function () {
					t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
				}
			}
		}, function () {
			var e, i, s, n, a, r = document.getElementsByTagName("body")[0], l = document.createElement("div");
			e = document.createElement(r ? "div" : "body"), s = {
				visibility: "hidden",
				width: 0,
				height: 0,
				border: 0,
				margin: 0,
				background: "none"
			}, r && t.extend(s, {position: "absolute", left: "-1000px", top: "-1000px"});
			for (a in s) e.style[a] = s[a];
			e.appendChild(l), i = r || document.documentElement, i.insertBefore(e, i.firstChild), l.style.cssText = "position: absolute; left: 10.7432222px;", n = t(l).offset().left, o = n > 10 && 11 > n, e.innerHTML = "", i.removeChild(e)
		}()
	}(), t.ui.position, t.widget("ui.draggable", t.ui.mouse, {
		version: "1.11.4",
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1,
			drag: null,
			start: null,
			stop: null
		},
		_create: function () {
			"original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._setHandleClassName(), this._mouseInit()
		},
		_setOption: function (t, e) {
			this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
		},
		_destroy: function () {
			return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._removeHandleClassName(), this._mouseDestroy(), void 0)
		},
		_mouseCapture: function (e) {
			var i = this.options;
			return this._blurActiveElement(e), this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e), this.handle ? (this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
		},
		_blockFrames: function (e) {
			this.iframeBlocks = this.document.find(e).map(function () {
				var e = t(this);
				return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
			})
		},
		_unblockFrames: function () {
			this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
		},
		_blurActiveElement: function (e) {
			var i = this.document[0];
			if (this.handleElement.is(e.target)) try {
				i.activeElement && "body" !== i.activeElement.nodeName.toLowerCase() && t(i.activeElement).blur()
			} catch (s) {
			}
		},
		_mouseStart: function (e) {
			var i = this.options;
			return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function () {
				return "fixed" === t(this).css("position")
			}).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._normalizeRightBottom(), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
		},
		_refreshOffsets: function (t) {
			this.offset = {
				top: this.positionAbs.top - this.margins.top,
				left: this.positionAbs.left - this.margins.left,
				scroll: !1,
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			}, this.offset.click = {left: t.pageX - this.offset.left, top: t.pageY - this.offset.top}
		},
		_mouseDrag: function (e, i) {
			if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
				var s = this._uiHash();
				if (this._trigger("drag", e, s) === !1) return this._mouseUp({}), !1;
				this.position = s.position
			}
			return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
		},
		_mouseStop: function (e) {
			var i = this, s = !1;
			return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
				i._trigger("stop", e) !== !1 && i._clear()
			}) : this._trigger("stop", e) !== !1 && this._clear(), !1
		},
		_mouseUp: function (e) {
			return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.focus(), t.ui.mouse.prototype._mouseUp.call(this, e)
		},
		cancel: function () {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
		},
		_getHandle: function (e) {
			return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0
		},
		_setHandleClassName: function () {
			this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this.handleElement.addClass("ui-draggable-handle")
		},
		_removeHandleClassName: function () {
			this.handleElement.removeClass("ui-draggable-handle")
		},
		_createHelper: function (e) {
			var i = this.options, s = t.isFunction(i.helper),
				n = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
			return n.parents("body").length || n.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && n[0] === this.element[0] && this._setPositionRelative(), n[0] === this.element[0] || /(fixed|absolute)/.test(n.css("position")) || n.css("position", "absolute"), n
		},
		_setPositionRelative: function () {
			/^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
		},
		_adjustOffsetFromHelper: function (e) {
			"string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
				left: +e[0],
				top: +e[1] || 0
			}), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
		},
		_isRootNode: function (t) {
			return /(html|body)/i.test(t.tagName) || t === this.document[0]
		},
		_getParentOffset: function () {
			var e = this.offsetParent.offset(), i = this.document[0];
			return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
				top: 0,
				left: 0
			}), {
				top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function () {
			if ("relative" !== this.cssPosition) return {top: 0, left: 0};
			var t = this.element.position(), e = this._isRootNode(this.scrollParent[0]);
			return {
				top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
				left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
			}
		},
		_cacheMargins: function () {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function () {
			this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
		},
		_setContainment: function () {
			var e, i, s, n = this.options, o = this.document[0];
			return this.relativeContainer = null, n.containment ? "window" === n.containment ? (this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === n.containment ? (this.containment = [0, 0, t(o).width() - this.helperProportions.width - this.margins.left, (t(o).height() || o.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : n.containment.constructor === Array ? (this.containment = n.containment, void 0) : ("parent" === n.containment && (n.containment = this.helper[0].parentNode), i = t(n.containment), s = i[0], s && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i), void 0) : (this.containment = null, void 0)
		},
		_convertPositionTo: function (t, e) {
			e || (e = this.position);
			var i = "absolute" === t ? 1 : -1, s = this._isRootNode(this.scrollParent[0]);
			return {
				top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
				left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
			}
		},
		_generatePosition: function (t, e) {
			var i, s, n, o, a = this.options, r = this._isRootNode(this.scrollParent[0]), l = t.pageX, h = t.pageY;
			return r && this.offset.scroll || (this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			}), e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)), a.grid && (n = a.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / a.grid[1]) * a.grid[1] : this.originalPageY, h = i ? n - this.offset.click.top >= i[1] || n - this.offset.click.top > i[3] ? n : n - this.offset.click.top >= i[1] ? n - a.grid[1] : n + a.grid[1] : n, o = a.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / a.grid[0]) * a.grid[0] : this.originalPageX, l = i ? o - this.offset.click.left >= i[0] || o - this.offset.click.left > i[2] ? o : o - this.offset.click.left >= i[0] ? o - a.grid[0] : o + a.grid[0] : o), "y" === a.axis && (l = this.originalPageX), "x" === a.axis && (h = this.originalPageY)), {
				top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top),
				left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left)
			}
		},
		_clear: function () {
			this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
		},
		_normalizeRightBottom: function () {
			"y" !== this.options.axis && "auto" !== this.helper.css("right") && (this.helper.width(this.helper.width()), this.helper.css("right", "auto")), "x" !== this.options.axis && "auto" !== this.helper.css("bottom") && (this.helper.height(this.helper.height()), this.helper.css("bottom", "auto"))
		},
		_trigger: function (e, i, s) {
			return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, s)
		},
		plugins: {},
		_uiHash: function () {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	}), t.ui.plugin.add("draggable", "connectToSortable", {
		start: function (e, i, s) {
			var n = t.extend({}, i, {item: s.element});
			s.sortables = [], t(s.options.connectToSortable).each(function () {
				var i = t(this).sortable("instance");
				i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, n))
			})
		}, stop: function (e, i, s) {
			var n = t.extend({}, i, {item: s.element});
			s.cancelHelperRemoval = !1, t.each(s.sortables, function () {
				var t = this;
				t.isOver ? (t.isOver = 0, s.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
					position: t.placeholder.css("position"),
					top: t.placeholder.css("top"),
					left: t.placeholder.css("left")
				}, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, n))
			})
		}, drag: function (e, i, s) {
			t.each(s.sortables, function () {
				var n = !1, o = this;
				o.positionAbs = s.positionAbs, o.helperProportions = s.helperProportions, o.offset.click = s.offset.click, o._intersectsWith(o.containerCache) && (n = !0, t.each(s.sortables, function () {
					return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== o && this._intersectsWith(this.containerCache) && t.contains(o.element[0], this.element[0]) && (n = !1), n
				})), n ? (o.isOver || (o.isOver = 1, s._parent = i.helper.parent(), o.currentItem = i.helper.appendTo(o.element).data("ui-sortable-item", !0), o.options._helper = o.options.helper, o.options.helper = function () {
					return i.helper[0]
				}, e.target = o.currentItem[0], o._mouseCapture(e, !0), o._mouseStart(e, !0, !0), o.offset.click.top = s.offset.click.top, o.offset.click.left = s.offset.click.left, o.offset.parent.left -= s.offset.parent.left - o.offset.parent.left, o.offset.parent.top -= s.offset.parent.top - o.offset.parent.top, s._trigger("toSortable", e), s.dropped = o.element, t.each(s.sortables, function () {
					this.refreshPositions()
				}), s.currentItem = s.element, o.fromOutside = s), o.currentItem && (o._mouseDrag(e), i.position = o.position)) : o.isOver && (o.isOver = 0, o.cancelHelperRemoval = !0, o.options._revert = o.options.revert, o.options.revert = !1, o._trigger("out", e, o._uiHash(o)), o._mouseStop(e, !0), o.options.revert = o.options._revert, o.options.helper = o.options._helper, o.placeholder && o.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(e), i.position = s._generatePosition(e, !0), s._trigger("fromSortable", e), s.dropped = !1, t.each(s.sortables, function () {
					this.refreshPositions()
				}))
			})
		}
	}), t.ui.plugin.add("draggable", "cursor", {
		start: function (e, i, s) {
			var n = t("body"), o = s.options;
			n.css("cursor") && (o._cursor = n.css("cursor")), n.css("cursor", o.cursor)
		}, stop: function (e, i, s) {
			var n = s.options;
			n._cursor && t("body").css("cursor", n._cursor)
		}
	}), t.ui.plugin.add("draggable", "opacity", {
		start: function (e, i, s) {
			var n = t(i.helper), o = s.options;
			n.css("opacity") && (o._opacity = n.css("opacity")), n.css("opacity", o.opacity)
		}, stop: function (e, i, s) {
			var n = s.options;
			n._opacity && t(i.helper).css("opacity", n._opacity)
		}
	}), t.ui.plugin.add("draggable", "scroll", {
		start: function (t, e, i) {
			i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
		}, drag: function (e, i, s) {
			var n = s.options, o = !1, a = s.scrollParentNotHidden[0], r = s.document[0];
			a !== r && "HTML" !== a.tagName ? (n.axis && "x" === n.axis || (s.overflowOffset.top + a.offsetHeight - e.pageY < n.scrollSensitivity ? a.scrollTop = o = a.scrollTop + n.scrollSpeed : e.pageY - s.overflowOffset.top < n.scrollSensitivity && (a.scrollTop = o = a.scrollTop - n.scrollSpeed)), n.axis && "y" === n.axis || (s.overflowOffset.left + a.offsetWidth - e.pageX < n.scrollSensitivity ? a.scrollLeft = o = a.scrollLeft + n.scrollSpeed : e.pageX - s.overflowOffset.left < n.scrollSensitivity && (a.scrollLeft = o = a.scrollLeft - n.scrollSpeed))) : (n.axis && "x" === n.axis || (e.pageY - t(r).scrollTop() < n.scrollSensitivity ? o = t(r).scrollTop(t(r).scrollTop() - n.scrollSpeed) : t(window).height() - (e.pageY - t(r).scrollTop()) < n.scrollSensitivity && (o = t(r).scrollTop(t(r).scrollTop() + n.scrollSpeed))), n.axis && "y" === n.axis || (e.pageX - t(r).scrollLeft() < n.scrollSensitivity ? o = t(r).scrollLeft(t(r).scrollLeft() - n.scrollSpeed) : t(window).width() - (e.pageX - t(r).scrollLeft()) < n.scrollSensitivity && (o = t(r).scrollLeft(t(r).scrollLeft() + n.scrollSpeed)))), o !== !1 && t.ui.ddmanager && !n.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e)
		}
	}), t.ui.plugin.add("draggable", "snap", {
		start: function (e, i, s) {
			var n = s.options;
			s.snapElements = [], t(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function () {
				var e = t(this), i = e.offset();
				this !== s.element[0] && s.snapElements.push({
					item: this,
					width: e.outerWidth(),
					height: e.outerHeight(),
					top: i.top,
					left: i.left
				})
			})
		}, drag: function (e, i, s) {
			var n, o, a, r, l, h, c, u, d, p, f = s.options, g = f.snapTolerance, m = i.offset.left,
				_ = m + s.helperProportions.width, v = i.offset.top, b = v + s.helperProportions.height;
			for (d = s.snapElements.length - 1; d >= 0; d--) l = s.snapElements[d].left - s.margins.left, h = l + s.snapElements[d].width, c = s.snapElements[d].top - s.margins.top, u = c + s.snapElements[d].height, l - g > _ || m > h + g || c - g > b || v > u + g || !t.contains(s.snapElements[d].item.ownerDocument, s.snapElements[d].item) ? (s.snapElements[d].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), {snapItem: s.snapElements[d].item})), s.snapElements[d].snapping = !1) : ("inner" !== f.snapMode && (n = g >= Math.abs(c - b), o = g >= Math.abs(u - v), a = g >= Math.abs(l - _), r = g >= Math.abs(h - m), n && (i.position.top = s._convertPositionTo("relative", {
				top: c - s.helperProportions.height,
				left: 0
			}).top), o && (i.position.top = s._convertPositionTo("relative", {
				top: u,
				left: 0
			}).top), a && (i.position.left = s._convertPositionTo("relative", {
				top: 0,
				left: l - s.helperProportions.width
			}).left), r && (i.position.left = s._convertPositionTo("relative", {
				top: 0,
				left: h
			}).left)), p = n || o || a || r, "outer" !== f.snapMode && (n = g >= Math.abs(c - v), o = g >= Math.abs(u - b), a = g >= Math.abs(l - m), r = g >= Math.abs(h - _), n && (i.position.top = s._convertPositionTo("relative", {
				top: c,
				left: 0
			}).top), o && (i.position.top = s._convertPositionTo("relative", {
				top: u - s.helperProportions.height,
				left: 0
			}).top), a && (i.position.left = s._convertPositionTo("relative", {
				top: 0,
				left: l
			}).left), r && (i.position.left = s._convertPositionTo("relative", {
				top: 0,
				left: h - s.helperProportions.width
			}).left)), !s.snapElements[d].snapping && (n || o || a || r || p) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), {snapItem: s.snapElements[d].item})), s.snapElements[d].snapping = n || o || a || r || p)
		}
	}), t.ui.plugin.add("draggable", "stack", {
		start: function (e, i, s) {
			var n, o = s.options, a = t.makeArray(t(o.stack)).sort(function (e, i) {
				return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
			});
			a.length && (n = parseInt(t(a[0]).css("zIndex"), 10) || 0, t(a).each(function (e) {
				t(this).css("zIndex", n + e)
			}), this.css("zIndex", n + a.length))
		}
	}), t.ui.plugin.add("draggable", "zIndex", {
		start: function (e, i, s) {
			var n = t(i.helper), o = s.options;
			n.css("zIndex") && (o._zIndex = n.css("zIndex")), n.css("zIndex", o.zIndex)
		}, stop: function (e, i, s) {
			var n = s.options;
			n._zIndex && t(i.helper).css("zIndex", n._zIndex)
		}
	}), t.ui.draggable, t.widget("ui.resizable", t.ui.mouse, {
		version: "1.11.4",
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 90,
			resize: null,
			start: null,
			stop: null
		},
		_num: function (t) {
			return parseInt(t, 10) || 0
		},
		_isNumber: function (t) {
			return !isNaN(parseInt(t, 10))
		},
		_hasScroll: function (e, i) {
			if ("hidden" === t(e).css("overflow")) return !1;
			var s = i && "left" === i ? "scrollLeft" : "scrollTop", n = !1;
			return e[s] > 0 ? !0 : (e[s] = 1, n = e[s] > 0, e[s] = 0, n)
		},
		_create: function () {
			var e, i, s, n, o, a = this, r = this.options;
			if (this.element.addClass("ui-resizable"), t.extend(this, {
					_aspectRatio: !!r.aspectRatio,
					aspectRatio: r.aspectRatio,
					originalElement: this.element,
					_proportionallyResizeElements: [],
					_helper: r.helper || r.ghost || r.animate ? r.helper || "ui-resizable-helper" : null
				}), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
					position: this.element.css("position"),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css("top"),
					left: this.element.css("left")
				})), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, this.element.css({
					marginLeft: this.originalElement.css("marginLeft"),
					marginTop: this.originalElement.css("marginTop"),
					marginRight: this.originalElement.css("marginRight"),
					marginBottom: this.originalElement.css("marginBottom")
				}), this.originalElement.css({
					marginLeft: 0,
					marginTop: 0,
					marginRight: 0,
					marginBottom: 0
				}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
					position: "static",
					zoom: 1,
					display: "block"
				})), this.originalElement.css({margin: this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
					n: ".ui-resizable-n",
					e: ".ui-resizable-e",
					s: ".ui-resizable-s",
					w: ".ui-resizable-w",
					se: ".ui-resizable-se",
					sw: ".ui-resizable-sw",
					ne: ".ui-resizable-ne",
					nw: ".ui-resizable-nw"
				} : "e,s,se"), this._handles = t(), this.handles.constructor === String) for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), e = this.handles.split(","), this.handles = {}, i = 0; e.length > i; i++) s = t.trim(e[i]), o = "ui-resizable-" + s, n = t("<div class='ui-resizable-handle " + o + "'></div>"), n.css({zIndex: r.zIndex}), "se" === s && n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(n);
			this._renderAxis = function (e) {
				var i, s, n, o;
				e = e || this.element;
				for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], {mousedown: a._mouseDown})), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[i], this.element), o = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), n = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(n, o), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
			}, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.mouseover(function () {
				a.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), a.axis = n && n[1] ? n[1] : "se")
			}), r.autoHide && (this._handles.hide(), t(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
				r.disabled || (t(this).removeClass("ui-resizable-autohide"), a._handles.show())
			}).mouseleave(function () {
				r.disabled || a.resizing || (t(this).addClass("ui-resizable-autohide"), a._handles.hide())
			})), this._mouseInit()
		},
		_destroy: function () {
			this._mouseDestroy();
			var e, i = function (e) {
				t(e).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
			};
			return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
				position: e.css("position"),
				width: e.outerWidth(),
				height: e.outerHeight(),
				top: e.css("top"),
				left: e.css("left")
			}).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
		},
		_mouseCapture: function (e) {
			var i, s, n = !1;
			for (i in this.handles) s = t(this.handles[i])[0], (s === e.target || t.contains(s, e.target)) && (n = !0);
			return !this.options.disabled && n
		},
		_mouseStart: function (e) {
			var i, s, n, o = this.options, a = this.element;
			return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), o.containment && (i += t(o.containment).scrollLeft() || 0, s += t(o.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
				left: i,
				top: s
			}, this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {width: a.width(), height: a.height()}, this.originalSize = this._helper ? {
				width: a.outerWidth(),
				height: a.outerHeight()
			} : {width: a.width(), height: a.height()}, this.sizeDiff = {
				width: a.outerWidth() - a.width(),
				height: a.outerHeight() - a.height()
			}, this.originalPosition = {left: i, top: s}, this.originalMousePosition = {
				left: e.pageX,
				top: e.pageY
			}, this.aspectRatio = "number" == typeof o.aspectRatio ? o.aspectRatio : this.originalSize.width / this.originalSize.height || 1, n = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === n ? this.axis + "-resize" : n), a.addClass("ui-resizable-resizing"), this._propagate("start", e), !0
		},
		_mouseDrag: function (e) {
			var i, s, n = this.originalMousePosition, o = this.axis, a = e.pageX - n.left || 0,
				r = e.pageY - n.top || 0, l = this._change[o];
			return this._updatePrevProperties(), l ? (i = l.apply(this, [e, a, r]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1) : !1
		},
		_mouseStop: function (e) {
			this.resizing = !1;
			var i, s, n, o, a, r, l, h = this.options, c = this;
			return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), n = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, o = s ? 0 : c.sizeDiff.width, a = {
				width: c.helper.width() - o,
				height: c.helper.height() - n
			}, r = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, l = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null, h.animate || this.element.css(t.extend(a, {
				top: l,
				left: r
			})), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !h.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
		},
		_updatePrevProperties: function () {
			this.prevPosition = {
				top: this.position.top,
				left: this.position.left
			}, this.prevSize = {width: this.size.width, height: this.size.height}
		},
		_applyChanges: function () {
			var t = {};
			return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
		},
		_updateVirtualBoundaries: function (t) {
			var e, i, s, n, o, a = this.options;
			o = {
				minWidth: this._isNumber(a.minWidth) ? a.minWidth : 0,
				maxWidth: this._isNumber(a.maxWidth) ? a.maxWidth : 1 / 0,
				minHeight: this._isNumber(a.minHeight) ? a.minHeight : 0,
				maxHeight: this._isNumber(a.maxHeight) ? a.maxHeight : 1 / 0
			}, (this._aspectRatio || t) && (e = o.minHeight * this.aspectRatio, s = o.minWidth / this.aspectRatio, i = o.maxHeight * this.aspectRatio, n = o.maxWidth / this.aspectRatio, e > o.minWidth && (o.minWidth = e), s > o.minHeight && (o.minHeight = s), o.maxWidth > i && (o.maxWidth = i), o.maxHeight > n && (o.maxHeight = n)), this._vBoundaries = o
		},
		_updateCache: function (t) {
			this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
		},
		_updateRatio: function (t) {
			var e = this.position, i = this.size, s = this.axis;
			return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
		},
		_respectSize: function (t) {
			var e = this._vBoundaries, i = this.axis, s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
				n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
				o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
				a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
				r = this.originalPosition.left + this.originalSize.width, l = this.position.top + this.size.height,
				h = /sw|nw|w/.test(i), c = /nw|ne|n/.test(i);
			return o && (t.width = e.minWidth), a && (t.height = e.minHeight), s && (t.width = e.maxWidth), n && (t.height = e.maxHeight), o && h && (t.left = r - e.minWidth), s && h && (t.left = r - e.maxWidth), a && c && (t.top = l - e.minHeight), n && c && (t.top = l - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
		},
		_getPaddingPlusBorderDimensions: function (t) {
			for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], n = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++) i[e] = parseInt(s[e], 10) || 0, i[e] += parseInt(n[e], 10) || 0;
			return {height: i[0] + i[2], width: i[1] + i[3]}
		},
		_proportionallyResize: function () {
			if (this._proportionallyResizeElements.length) for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++) t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
				height: i.height() - this.outerDimensions.height || 0,
				width: i.width() - this.outerDimensions.width || 0
			})
		},
		_renderProxy: function () {
			var e = this.element, i = this.options;
			this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() - 1,
				height: this.element.outerHeight() - 1,
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++i.zIndex
			}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
		},
		_change: {
			e: function (t, e) {
				return {width: this.originalSize.width + e}
			}, w: function (t, e) {
				var i = this.originalSize, s = this.originalPosition;
				return {left: s.left + e, width: i.width - e}
			}, n: function (t, e, i) {
				var s = this.originalSize, n = this.originalPosition;
				return {top: n.top + i, height: s.height - i}
			}, s: function (t, e, i) {
				return {height: this.originalSize.height + i}
			}, se: function (e, i, s) {
				return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
			}, sw: function (e, i, s) {
				return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
			}, ne: function (e, i, s) {
				return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
			}, nw: function (e, i, s) {
				return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
			}
		},
		_propagate: function (e, i) {
			t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
		},
		plugins: {},
		ui: function () {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	}), t.ui.plugin.add("resizable", "animate", {
		stop: function (e) {
			var i = t(this).resizable("instance"), s = i.options, n = i._proportionallyResizeElements,
				o = n.length && /textarea/i.test(n[0].nodeName),
				a = o && i._hasScroll(n[0], "left") ? 0 : i.sizeDiff.height, r = o ? 0 : i.sizeDiff.width,
				l = {width: i.size.width - r, height: i.size.height - a},
				h = parseInt(i.element.css("left"), 10) + (i.position.left - i.originalPosition.left) || null,
				c = parseInt(i.element.css("top"), 10) + (i.position.top - i.originalPosition.top) || null;
			i.element.animate(t.extend(l, c && h ? {top: c, left: h} : {}), {
				duration: s.animateDuration,
				easing: s.animateEasing,
				step: function () {
					var s = {
						width: parseInt(i.element.css("width"), 10),
						height: parseInt(i.element.css("height"), 10),
						top: parseInt(i.element.css("top"), 10),
						left: parseInt(i.element.css("left"), 10)
					};
					n && n.length && t(n[0]).css({
						width: s.width,
						height: s.height
					}), i._updateCache(s), i._propagate("resize", e)
				}
			})
		}
	}), t.ui.plugin.add("resizable", "containment", {
		start: function () {
			var e, i, s, n, o, a, r, l = t(this).resizable("instance"), h = l.options, c = l.element, u = h.containment,
				d = u instanceof t ? u.get(0) : /parent/.test(u) ? c.parent().get(0) : u;
			d && (l.containerElement = t(d), /document/.test(u) || u === document ? (l.containerOffset = {
				left: 0,
				top: 0
			}, l.containerPosition = {left: 0, top: 0}, l.parentData = {
				element: t(document),
				left: 0,
				top: 0,
				width: t(document).width(),
				height: t(document).height() || document.body.parentNode.scrollHeight
			}) : (e = t(d), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function (t, s) {
				i[t] = l._num(e.css("padding" + s))
			}), l.containerOffset = e.offset(), l.containerPosition = e.position(), l.containerSize = {
				height: e.innerHeight() - i[3],
				width: e.innerWidth() - i[1]
			}, s = l.containerOffset, n = l.containerSize.height, o = l.containerSize.width, a = l._hasScroll(d, "left") ? d.scrollWidth : o, r = l._hasScroll(d) ? d.scrollHeight : n, l.parentData = {
				element: d,
				left: s.left,
				top: s.top,
				width: a,
				height: r
			}))
		}, resize: function (e) {
			var i, s, n, o, a = t(this).resizable("instance"), r = a.options, l = a.containerOffset, h = a.position,
				c = a._aspectRatio || e.shiftKey, u = {top: 0, left: 0}, d = a.containerElement, p = !0;
			d[0] !== document && /static/.test(d.css("position")) && (u = l), h.left < (a._helper ? l.left : 0) && (a.size.width = a.size.width + (a._helper ? a.position.left - l.left : a.position.left - u.left), c && (a.size.height = a.size.width / a.aspectRatio, p = !1), a.position.left = r.helper ? l.left : 0), h.top < (a._helper ? l.top : 0) && (a.size.height = a.size.height + (a._helper ? a.position.top - l.top : a.position.top), c && (a.size.width = a.size.height * a.aspectRatio, p = !1), a.position.top = a._helper ? l.top : 0), n = a.containerElement.get(0) === a.element.parent().get(0), o = /relative|absolute/.test(a.containerElement.css("position")), n && o ? (a.offset.left = a.parentData.left + a.position.left, a.offset.top = a.parentData.top + a.position.top) : (a.offset.left = a.element.offset().left, a.offset.top = a.element.offset().top), i = Math.abs(a.sizeDiff.width + (a._helper ? a.offset.left - u.left : a.offset.left - l.left)), s = Math.abs(a.sizeDiff.height + (a._helper ? a.offset.top - u.top : a.offset.top - l.top)), i + a.size.width >= a.parentData.width && (a.size.width = a.parentData.width - i, c && (a.size.height = a.size.width / a.aspectRatio, p = !1)), s + a.size.height >= a.parentData.height && (a.size.height = a.parentData.height - s, c && (a.size.width = a.size.height * a.aspectRatio, p = !1)), p || (a.position.left = a.prevPosition.left, a.position.top = a.prevPosition.top, a.size.width = a.prevSize.width, a.size.height = a.prevSize.height)
		}, stop: function () {
			var e = t(this).resizable("instance"), i = e.options, s = e.containerOffset, n = e.containerPosition,
				o = e.containerElement, a = t(e.helper), r = a.offset(), l = a.outerWidth() - e.sizeDiff.width,
				h = a.outerHeight() - e.sizeDiff.height;
			e._helper && !i.animate && /relative/.test(o.css("position")) && t(this).css({
				left: r.left - n.left - s.left,
				width: l,
				height: h
			}), e._helper && !i.animate && /static/.test(o.css("position")) && t(this).css({
				left: r.left - n.left - s.left,
				width: l,
				height: h
			})
		}
	}), t.ui.plugin.add("resizable", "alsoResize", {
		start: function () {
			var e = t(this).resizable("instance"), i = e.options;
			t(i.alsoResize).each(function () {
				var e = t(this);
				e.data("ui-resizable-alsoresize", {
					width: parseInt(e.width(), 10),
					height: parseInt(e.height(), 10),
					left: parseInt(e.css("left"), 10),
					top: parseInt(e.css("top"), 10)
				})
			})
		}, resize: function (e, i) {
			var s = t(this).resizable("instance"), n = s.options, o = s.originalSize, a = s.originalPosition, r = {
				height: s.size.height - o.height || 0,
				width: s.size.width - o.width || 0,
				top: s.position.top - a.top || 0,
				left: s.position.left - a.left || 0
			};
			t(n.alsoResize).each(function () {
				var e = t(this), s = t(this).data("ui-resizable-alsoresize"), n = {},
					o = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
				t.each(o, function (t, e) {
					var i = (s[e] || 0) + (r[e] || 0);
					i && i >= 0 && (n[e] = i || null)
				}), e.css(n)
			})
		}, stop: function () {
			t(this).removeData("resizable-alsoresize")
		}
	}), t.ui.plugin.add("resizable", "ghost", {
		start: function () {
			var e = t(this).resizable("instance"), i = e.options, s = e.size;
			e.ghost = e.originalElement.clone(), e.ghost.css({
				opacity: .25,
				display: "block",
				position: "relative",
				height: s.height,
				width: s.width,
				margin: 0,
				left: 0,
				top: 0
			}).addClass("ui-resizable-ghost").addClass("string" == typeof i.ghost ? i.ghost : ""), e.ghost.appendTo(e.helper)
		}, resize: function () {
			var e = t(this).resizable("instance");
			e.ghost && e.ghost.css({position: "relative", height: e.size.height, width: e.size.width})
		}, stop: function () {
			var e = t(this).resizable("instance");
			e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
		}
	}), t.ui.plugin.add("resizable", "grid", {
		resize: function () {
			var e, i = t(this).resizable("instance"), s = i.options, n = i.size, o = i.originalSize,
				a = i.originalPosition, r = i.axis, l = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
				h = l[0] || 1, c = l[1] || 1, u = Math.round((n.width - o.width) / h) * h,
				d = Math.round((n.height - o.height) / c) * c, p = o.width + u, f = o.height + d,
				g = s.maxWidth && p > s.maxWidth, m = s.maxHeight && f > s.maxHeight, _ = s.minWidth && s.minWidth > p,
				v = s.minHeight && s.minHeight > f;
			s.grid = l, _ && (p += h), v && (f += c), g && (p -= h), m && (f -= c), /^(se|s|e)$/.test(r) ? (i.size.width = p, i.size.height = f) : /^(ne)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.top = a.top - d) : /^(sw)$/.test(r) ? (i.size.width = p, i.size.height = f, i.position.left = a.left - u) : ((0 >= f - c || 0 >= p - h) && (e = i._getPaddingPlusBorderDimensions(this)), f - c > 0 ? (i.size.height = f, i.position.top = a.top - d) : (f = c - e.height, i.size.height = f, i.position.top = a.top + o.height - f), p - h > 0 ? (i.size.width = p, i.position.left = a.left - u) : (p = h - e.width, i.size.width = p, i.position.left = a.left + o.width - p))
		}
	}), t.ui.resizable, t.widget("ui.sortable", t.ui.mouse, {
		version: "1.11.4",
		widgetEventPrefix: "sort",
		ready: !1,
		options: {
			appendTo: "parent",
			axis: !1,
			connectWith: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			dropOnEmpty: !0,
			forcePlaceholderSize: !1,
			forceHelperSize: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			items: "> *",
			opacity: !1,
			placeholder: !1,
			revert: !1,
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1e3,
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},
		_isOverAxis: function (t, e, i) {
			return t >= e && e + i > t
		},
		_isFloating: function (t) {
			return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
		},
		_create: function () {
			this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
		},
		_setOption: function (t, e) {
			this._super(t, e), "handle" === t && this._setHandleClassName()
		},
		_setHandleClassName: function () {
			this.element.find(".ui-sortable-handle").removeClass("ui-sortable-handle"), t.each(this.items, function () {
				(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item).addClass("ui-sortable-handle")
			})
		},
		_destroy: function () {
			this.element.removeClass("ui-sortable ui-sortable-disabled").find(".ui-sortable-handle").removeClass("ui-sortable-handle"), this._mouseDestroy();
			for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
			return this
		},
		_mouseCapture: function (e, i) {
			var s = null, n = !1, o = this;
			return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(e), t(e.target).parents().each(function () {
				return t.data(this, o.widgetName + "-item") === o ? (s = t(this), !1) : void 0
			}), t.data(e.target, o.widgetName + "-item") === o && (s = t(e.target)), s ? !this.options.handle || i || (t(this.options.handle, s).find("*").addBack().each(function () {
				this === e.target && (n = !0)
			}), n) ? (this.currentItem = s, this._removeCurrentsFromItems(), !0) : !1 : !1)
		},
		_mouseStart: function (e, i, s) {
			var n, o, a = this.options;
			if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
					top: this.offset.top - this.margins.top,
					left: this.offset.left - this.margins.left
				}, t.extend(this.offset, {
					click: {left: e.pageX - this.offset.left, top: e.pageY - this.offset.top},
					parent: this._getParentOffset(),
					relative: this._getRelativeOffset()
				}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, a.cursorAt && this._adjustOffsetFromHelper(a.cursorAt), this.domPosition = {
					prev: this.currentItem.prev()[0],
					parent: this.currentItem.parent()[0]
				}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), a.containment && this._setContainment(), a.cursor && "auto" !== a.cursor && (o = this.document.find("body"), this.storedCursor = o.css("cursor"), o.css("cursor", a.cursor), this.storedStylesheet = t("<style>*{ cursor: " + a.cursor + " !important; }</style>").appendTo(o)), a.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", a.opacity)), a.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", a.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s) for (n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("activate", e, this._uiHash(this));
			return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
		},
		_mouseDrag: function (e) {
			var i, s, n, o, a = this.options, r = !1;
			for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < a.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + a.scrollSpeed : e.pageY - this.overflowOffset.top < a.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - a.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < a.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + a.scrollSpeed : e.pageX - this.overflowOffset.left < a.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - a.scrollSpeed)) : (e.pageY - this.document.scrollTop() < a.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - a.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < a.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + a.scrollSpeed)), e.pageX - this.document.scrollLeft() < a.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - a.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < a.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + a.scrollSpeed))), r !== !1 && t.ui.ddmanager && !a.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--) if (s = this.items[i], n = s.item[0], o = this._intersectsWithPointer(s), o && s.instance === this.currentContainer && n !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== n && !t.contains(this.placeholder[0], n) && ("semi-dynamic" === this.options.type ? !t.contains(this.element[0], n) : !0)) {
				if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
				this._rearrange(e, s), this._trigger("change", e, this._uiHash());
				break
			}
			return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
		},
		_mouseStop: function (e, i) {
			if (e) {
				if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
					var s = this, n = this.placeholder.offset(), o = this.options.axis, a = {};
					o && "x" !== o || (a.left = n.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), o && "y" !== o || (a.top = n.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(a, parseInt(this.options.revert, 10) || 500, function () {
						s._clear(e)
					})
				} else this._clear(e, i);
				return !1
			}
		},
		cancel: function () {
			if (this.dragging) {
				this._mouseUp({target: null}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
				for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
			}
			return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
				helper: null,
				dragging: !1,
				reverting: !1,
				_noFinalSort: null
			}), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
		},
		serialize: function (e) {
			var i = this._getItemsAsjQuery(e && e.connected), s = [];
			return e = e || {}, t(i).each(function () {
				var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
				i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
			}), !s.length && e.key && s.push(e.key + "="), s.join("&")
		},
		toArray: function (e) {
			var i = this._getItemsAsjQuery(e && e.connected), s = [];
			return e = e || {}, i.each(function () {
				s.push(t(e.item || this).attr(e.attribute || "id") || "")
			}), s
		},
		_intersectsWith: function (t) {
			var e = this.positionAbs.left, i = e + this.helperProportions.width, s = this.positionAbs.top,
				n = s + this.helperProportions.height, o = t.left, a = o + t.width, r = t.top, l = r + t.height,
				h = this.offset.click.top, c = this.offset.click.left,
				u = "x" === this.options.axis || s + h > r && l > s + h,
				d = "y" === this.options.axis || e + c > o && a > e + c, p = u && d;
			return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > o && a > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > r && l > n - this.helperProportions.height / 2
		},
		_intersectsWithPointer: function (t) {
			var e = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
				i = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
				s = e && i, n = this._getDragVerticalDirection(), o = this._getDragHorizontalDirection();
			return s ? this.floating ? o && "right" === o || "down" === n ? 2 : 1 : n && ("down" === n ? 2 : 1) : !1
		},
		_intersectsWithSides: function (t) {
			var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
				i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
				s = this._getDragVerticalDirection(), n = this._getDragHorizontalDirection();
			return this.floating && n ? "right" === n && i || "left" === n && !i : s && ("down" === s && e || "up" === s && !e)
		},
		_getDragVerticalDirection: function () {
			var t = this.positionAbs.top - this.lastPositionAbs.top;
			return 0 !== t && (t > 0 ? "down" : "up")
		},
		_getDragHorizontalDirection: function () {
			var t = this.positionAbs.left - this.lastPositionAbs.left;
			return 0 !== t && (t > 0 ? "right" : "left")
		},
		refresh: function (t) {
			return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this
		},
		_connectWith: function () {
			var t = this.options;
			return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
		},
		_getItemsAsjQuery: function (e) {
			function i() {
				r.push(this)
			}

			var s, n, o, a, r = [], l = [], h = this._connectWith();
			if (h && e) for (s = h.length - 1; s >= 0; s--) for (o = t(h[s], this.document[0]), n = o.length - 1; n >= 0; n--) a = t.data(o[n], this.widgetFullName), a && a !== this && !a.options.disabled && l.push([t.isFunction(a.options.items) ? a.options.items.call(a.element) : t(a.options.items, a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), a]);
			for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
				options: this.options,
				item: this.currentItem
			}) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), s = l.length - 1; s >= 0; s--) l[s][0].each(i);
			return t(r)
		},
		_removeCurrentsFromItems: function () {
			var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
			this.items = t.grep(this.items, function (t) {
				for (var i = 0; e.length > i; i++) if (e[i] === t.item[0]) return !1;
				return !0
			})
		},
		_refreshItems: function (e) {
			this.items = [], this.containers = [this];
			var i, s, n, o, a, r, l, h, c = this.items,
				u = [[t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {item: this.currentItem}) : t(this.options.items, this.element), this]],
				d = this._connectWith();
			if (d && this.ready) for (i = d.length - 1; i >= 0; i--) for (n = t(d[i], this.document[0]), s = n.length - 1; s >= 0; s--) o = t.data(n[s], this.widgetFullName), o && o !== this && !o.options.disabled && (u.push([t.isFunction(o.options.items) ? o.options.items.call(o.element[0], e, {item: this.currentItem}) : t(o.options.items, o.element), o]), this.containers.push(o));
			for (i = u.length - 1; i >= 0; i--) for (a = u[i][1], r = u[i][0], s = 0, h = r.length; h > s; s++) l = t(r[s]), l.data(this.widgetName + "-item", a), c.push({
				item: l,
				instance: a,
				width: 0,
				height: 0,
				left: 0,
				top: 0
			})
		},
		refreshPositions: function (e) {
			this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1, this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
			var i, s, n, o;
			for (i = this.items.length - 1; i >= 0; i--) s = this.items[i], s.instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (n = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = n.outerWidth(), s.height = n.outerHeight()), o = n.offset(), s.left = o.left, s.top = o.top);
			if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this); else for (i = this.containers.length - 1; i >= 0; i--) o = this.containers[i].element.offset(), this.containers[i].containerCache.left = o.left, this.containers[i].containerCache.top = o.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			return this
		},
		_createPlaceholder: function (e) {
			e = e || this;
			var i, s = e.options;
			s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
				element: function () {
					var s = e.currentItem[0].nodeName.toLowerCase(),
						n = t("<" + s + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
					return "tbody" === s ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(n)) : "tr" === s ? e._createTrPlaceholder(e.currentItem, n) : "img" === s && n.attr("src", e.currentItem.attr("src")), i || n.css("visibility", "hidden"), n
				}, update: function (t, n) {
					(!i || s.forcePlaceholderSize) && (n.height() || n.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), n.width() || n.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
				}
			}), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder)
		},
		_createTrPlaceholder: function (e, i) {
			var s = this;
			e.children().each(function () {
				t("<td>&#160;</td>", s.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i)
			})
		},
		_contactContainers: function (e) {
			var i, s, n, o, a, r, l, h, c, u, d = null, p = null;
			for (i = this.containers.length - 1; i >= 0; i--) if (!t.contains(this.currentItem[0], this.containers[i].element[0])) if (this._intersectsWith(this.containers[i].containerCache)) {
				if (d && t.contains(this.containers[i].element[0], d.element[0])) continue;
				d = this.containers[i], p = i
			} else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
			if (d) if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1); else {
				for (n = 1e4, o = null, c = d.floating || this._isFloating(this.currentItem), a = c ? "left" : "top", r = c ? "width" : "height", u = c ? "clientX" : "clientY", s = this.items.length - 1; s >= 0; s--) t.contains(this.containers[p].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (l = this.items[s].item.offset()[a], h = !1, e[u] - l > this.items[s][r] / 2 && (h = !0), n > Math.abs(e[u] - l) && (n = Math.abs(e[u] - l), o = this.items[s], this.direction = h ? "up" : "down"));
				if (!o && !this.options.dropOnEmpty) return;
				if (this.currentContainer === this.containers[p]) return this.currentContainer.containerCache.over || (this.containers[p]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0;
				o ? this._rearrange(e, o, null, !0) : this._rearrange(e, null, this.containers[p].element, !0), this._trigger("change", e, this._uiHash()), this.containers[p]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", e, this._uiHash(this)), this.containers[p].containerCache.over = 1
			}
		},
		_createHelper: function (e) {
			var i = this.options,
				s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
			return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
				width: this.currentItem[0].style.width,
				height: this.currentItem[0].style.height,
				position: this.currentItem.css("position"),
				top: this.currentItem.css("top"),
				left: this.currentItem.css("left")
			}), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
		},
		_adjustOffsetFromHelper: function (e) {
			"string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
				left: +e[0],
				top: +e[1] || 0
			}), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
		},
		_getParentOffset: function () {
			this.offsetParent = this.helper.offsetParent();
			var e = this.offsetParent.offset();
			return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
				top: 0,
				left: 0
			}), {
				top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function () {
			if ("relative" === this.cssPosition) {
				var t = this.currentItem.position();
				return {
					top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {top: 0, left: 0}
		},
		_cacheMargins: function () {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			}
		},
		_cacheHelperProportions: function () {
			this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
		},
		_setContainment: function () {
			var e, i, s, n = this.options;
			"parent" === n.containment && (n.containment = this.helper[0].parentNode), ("document" === n.containment || "window" === n.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === n.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === n.containment ? this.document.width() : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(n.containment) || (e = t(n.containment)[0], i = t(n.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
		},
		_convertPositionTo: function (e, i) {
			i || (i = this.position);
			var s = "absolute" === e ? 1 : -1,
				n = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				o = /(html|body)/i.test(n[0].tagName);
			return {
				top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : o ? 0 : n.scrollTop()) * s,
				left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : o ? 0 : n.scrollLeft()) * s
			}
		},
		_generatePosition: function (e) {
			var i, s, n = this.options, o = e.pageX, a = e.pageY,
				r = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				l = /(html|body)/i.test(r[0].tagName);
			return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (o = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (a = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (o = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (a = this.containment[3] + this.offset.click.top)), n.grid && (i = this.originalPageY + Math.round((a - this.originalPageY) / n.grid[1]) * n.grid[1], a = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - n.grid[1] : i + n.grid[1] : i, s = this.originalPageX + Math.round((o - this.originalPageX) / n.grid[0]) * n.grid[0], o = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - n.grid[0] : s + n.grid[0] : s)), {
				top: a - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : r.scrollTop()),
				left: o - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : r.scrollLeft())
			}
		},
		_rearrange: function (t, e, i, s) {
			i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
			var n = this.counter;
			this._delay(function () {
				n === this.counter && this.refreshPositions(!s)
			})
		},
		_clear: function (t, e) {
			function i(t, e, i) {
				return function (s) {
					i._trigger(t, s, e._uiHash(e))
				}
			}

			this.reverting = !1;
			var s, n = [];
			if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
				for (s in this._storedCSS) ("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
			} else this.currentItem.show();
			for (this.fromOutside && !e && n.push(function (t) {
				this._trigger("receive", t, this._uiHash(this.fromOutside))
			}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || n.push(function (t) {
				this._trigger("update", t, this._uiHash())
			}), this !== this.currentContainer && (e || (n.push(function (t) {
				this._trigger("remove", t, this._uiHash())
			}), n.push(function (t) {
				return function (e) {
					t._trigger("receive", e, this._uiHash(this))
				}
			}.call(this, this.currentContainer)), n.push(function (t) {
				return function (e) {
					t._trigger("update", e, this._uiHash(this))
				}
			}.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) e || n.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (n.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
			if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
				for (s = 0; n.length > s; s++) n[s].call(this, t);
				this._trigger("stop", t, this._uiHash())
			}
			return this.fromOutside = !1, !this.cancelHelperRemoval
		},
		_trigger: function () {
			t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
		},
		_uiHash: function (e) {
			var i = e || this;
			return {
				helper: i.helper,
				placeholder: i.placeholder || t([]),
				position: i.position,
				originalPosition: i.originalPosition,
				offset: i.positionAbs,
				item: i.currentItem,
				sender: e ? e.element : null
			}
		}
	}), t.widget("ui.tooltip", {
		version: "1.11.4", options: {
			content: function () {
				var e = t(this).attr("title") || "";
				return t("<a>").text(e).html()
			},
			hide: !0,
			items: "[title]:not([disabled])",
			position: {my: "left top+15", at: "left bottom", collision: "flipfit flip"},
			show: !0,
			tooltipClass: null,
			track: !1,
			close: null,
			open: null
		}, _addDescribedBy: function (e, i) {
			var s = (e.attr("aria-describedby") || "").split(/\s+/);
			s.push(i), e.data("ui-tooltip-id", i).attr("aria-describedby", t.trim(s.join(" ")))
		}, _removeDescribedBy: function (e) {
			var i = e.data("ui-tooltip-id"), s = (e.attr("aria-describedby") || "").split(/\s+/), n = t.inArray(i, s);
			-1 !== n && s.splice(n, 1), e.removeData("ui-tooltip-id"), s = t.trim(s.join(" ")), s ? e.attr("aria-describedby", s) : e.removeAttr("aria-describedby")
		}, _create: function () {
			this._on({
				mouseover: "open",
				focusin: "open"
			}), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable(), this.liveRegion = t("<div>").attr({
				role: "log",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			}).addClass("ui-helper-hidden-accessible").appendTo(this.document[0].body)
		}, _setOption: function (e, i) {
			var s = this;
			return "disabled" === e ? (this[i ? "_disable" : "_enable"](), this.options[e] = i, void 0) : (this._super(e, i), "content" === e && t.each(this.tooltips, function (t, e) {
				s._updateContent(e.element)
			}), void 0)
		}, _disable: function () {
			var e = this;
			t.each(this.tooltips, function (i, s) {
				var n = t.Event("blur");
				n.target = n.currentTarget = s.element[0], e.close(n, !0)
			}), this.element.find(this.options.items).addBack().each(function () {
				var e = t(this);
				e.is("[title]") && e.data("ui-tooltip-title", e.attr("title")).removeAttr("title")
			})
		}, _enable: function () {
			this.element.find(this.options.items).addBack().each(function () {
				var e = t(this);
				e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title"))
			})
		}, open: function (e) {
			var i = this, s = t(e ? e.target : this.element).closest(this.options.items);
			s.length && !s.data("ui-tooltip-id") && (s.attr("title") && s.data("ui-tooltip-title", s.attr("title")), s.data("ui-tooltip-open", !0), e && "mouseover" === e.type && s.parents().each(function () {
				var e, s = t(this);
				s.data("ui-tooltip-open") && (e = t.Event("blur"), e.target = e.currentTarget = this, i.close(e, !0)), s.attr("title") && (s.uniqueId(), i.parents[this.id] = {
					element: this,
					title: s.attr("title")
				}, s.attr("title", ""))
			}), this._registerCloseHandlers(e, s), this._updateContent(s, e))
		}, _updateContent: function (t, e) {
			var i, s = this.options.content, n = this, o = e ? e.type : null;
			return "string" == typeof s ? this._open(e, t, s) : (i = s.call(t[0], function (i) {
				n._delay(function () {
					t.data("ui-tooltip-open") && (e && (e.type = o), this._open(e, t, i))
				})
			}), i && this._open(e, t, i), void 0)
		}, _open: function (e, i, s) {
			function n(t) {
				h.of = t, a.is(":hidden") || a.position(h)
			}

			var o, a, r, l, h = t.extend({}, this.options.position);
			if (s) {
				if (o = this._find(i)) return o.tooltip.find(".ui-tooltip-content").html(s), void 0;
				i.is("[title]") && (e && "mouseover" === e.type ? i.attr("title", "") : i.removeAttr("title")), o = this._tooltip(i), a = o.tooltip, this._addDescribedBy(i, a.attr("id")), a.find(".ui-tooltip-content").html(s), this.liveRegion.children().hide(), s.clone ? (l = s.clone(), l.removeAttr("id").find("[id]").removeAttr("id")) : l = s, t("<div>").html(l).appendTo(this.liveRegion), this.options.track && e && /^mouse/.test(e.type) ? (this._on(this.document, {mousemove: n}), n(e)) : a.position(t.extend({of: i}, this.options.position)), a.hide(), this._show(a, this.options.show), this.options.show && this.options.show.delay && (r = this.delayedShow = setInterval(function () {
					a.is(":visible") && (n(h.of), clearInterval(r))
				}, t.fx.interval)), this._trigger("open", e, {tooltip: a})
			}
		}, _registerCloseHandlers: function (e, i) {
			var s = {
				keyup: function (e) {
					if (e.keyCode === t.ui.keyCode.ESCAPE) {
						var s = t.Event(e);
						s.currentTarget = i[0], this.close(s, !0)
					}
				}
			};
			i[0] !== this.element[0] && (s.remove = function () {
				this._removeTooltip(this._find(i).tooltip)
			}), e && "mouseover" !== e.type || (s.mouseleave = "close"), e && "focusin" !== e.type || (s.focusout = "close"), this._on(!0, i, s)
		}, close: function (e) {
			var i, s = this, n = t(e ? e.currentTarget : this.element), o = this._find(n);
			return o ? (i = o.tooltip, o.closing || (clearInterval(this.delayedShow), n.data("ui-tooltip-title") && !n.attr("title") && n.attr("title", n.data("ui-tooltip-title")), this._removeDescribedBy(n), o.hiding = !0, i.stop(!0), this._hide(i, this.options.hide, function () {
				s._removeTooltip(t(this))
			}), n.removeData("ui-tooltip-open"), this._off(n, "mouseleave focusout keyup"), n[0] !== this.element[0] && this._off(n, "remove"), this._off(this.document, "mousemove"), e && "mouseleave" === e.type && t.each(this.parents, function (e, i) {
				t(i.element).attr("title", i.title), delete s.parents[e]
			}), o.closing = !0, this._trigger("close", e, {tooltip: i}), o.hiding || (o.closing = !1)), void 0) : (n.removeData("ui-tooltip-open"), void 0)
		}, _tooltip: function (e) {
			var i = t("<div>").attr("role", "tooltip").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")),
				s = i.uniqueId().attr("id");
			return t("<div>").addClass("ui-tooltip-content").appendTo(i), i.appendTo(this.document[0].body), this.tooltips[s] = {
				element: e,
				tooltip: i
			}
		}, _find: function (t) {
			var e = t.data("ui-tooltip-id");
			return e ? this.tooltips[e] : null
		}, _removeTooltip: function (t) {
			t.remove(), delete this.tooltips[t.attr("id")]
		}, _destroy: function () {
			var e = this;
			t.each(this.tooltips, function (i, s) {
				var n = t.Event("blur"), o = s.element;
				n.target = n.currentTarget = o[0], e.close(n, !0), t("#" + i).remove(), o.data("ui-tooltip-title") && (o.attr("title") || o.attr("title", o.data("ui-tooltip-title")), o.removeData("ui-tooltip-title"))
			}), this.liveRegion.remove()
		}
	})
});