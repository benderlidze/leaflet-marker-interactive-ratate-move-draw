!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? e() : "function" == typeof define && define.amd ? define(e) : e() }(0, function () {
    "use strict"; function t(t, e) { return e = { exports: {} }, t(e, e.exports), e.exports } var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}, n = t(function (t) { !function (e) { function n(t, e) { function n(t) { return e.bgcolor && (t.style.backgroundColor = e.bgcolor), e.width && (t.style.width = e.width + "px"), e.height && (t.style.height = e.height + "px"), e.style && Object.keys(e.style).forEach(function (n) { t.style[n] = e.style[n] }), t } return e = e || {}, s(e), Promise.resolve(t).then(function (t) { return u(t, e.filter, !0) }).then(c).then(d).then(n).then(function (n) { return g(n, e.width || h.width(t), e.height || h.height(t)) }) } function i(t, e) { return l(t, e || {}).then(function (e) { return e.getContext("2d").getImageData(0, 0, h.width(t), h.height(t)).data }) } function o(t, e) { return l(t, e || {}).then(function (t) { return t.toDataURL() }) } function r(t, e) { return e = e || {}, l(t, e).then(function (t) { return t.toDataURL("image/jpeg", e.quality || 1) }) } function a(t, e) { return l(t, e || {}).then(h.canvasToBlob) } function s(t) { void 0 === t.imagePlaceholder ? w.impl.options.imagePlaceholder = M.imagePlaceholder : w.impl.options.imagePlaceholder = t.imagePlaceholder, void 0 === t.cacheBust ? w.impl.options.cacheBust = M.cacheBust : w.impl.options.cacheBust = t.cacheBust } function l(t, e) { function i(t) { var n = document.createElement("canvas"); if (n.width = e.width || h.width(t), n.height = e.height || h.height(t), e.bgcolor) { var i = n.getContext("2d"); i.fillStyle = e.bgcolor, i.fillRect(0, 0, n.width, n.height) } return n } return n(t, e).then(h.makeImage).then(h.delay(100)).then(function (e) { var n = i(t); return n.getContext("2d").drawImage(e, 0, 0), n }) } function u(t, e, n) { function i(t) { return t instanceof HTMLCanvasElement ? h.makeImage(t.toDataURL()) : t.cloneNode(!1) } function o(t, e, n) { var i = t.childNodes; return 0 === i.length ? Promise.resolve(e) : function (t, e, n) { var i = Promise.resolve(); return e.forEach(function (e) { i = i.then(function () { return u(e, n) }).then(function (e) { e && t.appendChild(e) }) }), i }(e, h.asArray(i), n).then(function () { return e }) } function r(t, e) { function n() { !function (t, e) { t.cssText ? e.cssText = t.cssText : function (t, e) { h.asArray(t).forEach(function (n) { e.setProperty(n, t.getPropertyValue(n), t.getPropertyPriority(n)) }) }(t, e) }(window.getComputedStyle(t), e.style) } function i() { function n(n) { var i = window.getComputedStyle(t, n), o = i.getPropertyValue("content"); if ("" !== o && "none" !== o) { var r = h.uid(); e.className = e.className + " " + r; var a = document.createElement("style"); a.appendChild(function (t, e, n) { var i = "." + t + ":" + e, o = n.cssText ? function (t) { var e = t.getPropertyValue("content"); return t.cssText + " content: " + e + ";" }(n) : function (t) { function e(e) { return e + ": " + t.getPropertyValue(e) + (t.getPropertyPriority(e) ? " !important" : "") } return h.asArray(t).map(e).join("; ") + ";" }(n); return document.createTextNode(i + "{" + o + "}") }(r, n, i)), e.appendChild(a) } } [":before", ":after"].forEach(function (t) { n(t) }) } function o() { t instanceof HTMLTextAreaElement && (e.innerHTML = t.value), t instanceof HTMLInputElement && e.setAttribute("value", t.value) } function r() { e instanceof SVGElement && (e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), e instanceof SVGRectElement && ["width", "height"].forEach(function (t) { var n = e.getAttribute(t); n && e.style.setProperty(t, n) })) } return e instanceof Element ? Promise.resolve().then(n).then(i).then(o).then(r).then(function () { return e }) : e } return n || !e || e(t) ? Promise.resolve(t).then(i).then(function (n) { return o(t, n, e) }).then(function (e) { return r(t, e) }) : Promise.resolve() } function c(t) { return p.resolveAll().then(function (e) { var n = document.createElement("style"); return t.appendChild(n), n.appendChild(document.createTextNode(e)), t }) } function d(t) { return f.inlineAll(t).then(function () { return t }) } function g(t, e, n) { return Promise.resolve(t).then(function (t) { return t.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), (new XMLSerializer).serializeToString(t) }).then(h.escapeXhtml).then(function (t) { return '<foreignObject x="0" y="0" width="100%" height="100%">' + t + "</foreignObject>" }).then(function (t) { return '<svg xmlns="http://www.w3.org/2000/svg" width="' + e + '" height="' + n + '">' + t + "</svg>" }).then(function (t) { return "data:image/svg+xml;charset=utf-8," + t }) } var h = function () { function t() { var t = "application/font-woff", e = "image/jpeg"; return { woff: t, woff2: t, ttf: "application/font-truetype", eot: "application/vnd.ms-fontobject", png: "image/png", jpg: e, jpeg: e, gif: "image/gif", tiff: "image/tiff", svg: "image/svg+xml" } } function e(t) { var e = /\.([^\.\/]*?)$/g.exec(t); return e ? e[1] : "" } function n(n) { var i = e(n).toLowerCase(); return t()[i] || "" } function i(t) { return -1 !== t.search(/^(data:)/) } function o(t) { return new Promise(function (e) { for (var n = window.atob(t.toDataURL().split(",")[1]), i = n.length, o = new Uint8Array(i), r = 0; r < i; r++)o[r] = n.charCodeAt(r); e(new Blob([o], { type: "image/png" })) }) } function r(t) { return t.toBlob ? new Promise(function (e) { t.toBlob(e) }) : o(t) } function a(t, e) { var n = document.implementation.createHTMLDocument(), i = n.createElement("base"); n.head.appendChild(i); var o = n.createElement("a"); return n.body.appendChild(o), i.href = e, o.href = t, o.href } function s(t) { return new Promise(function (e, n) { var i = new Image; i.onload = function () { e(i) }, i.onerror = n, i.src = t }) } function l(t) { var e = 3e4; return w.impl.options.cacheBust && (t += (/\?/.test(t) ? "&" : "?") + (new Date).getTime()), new Promise(function (n) { function i() { if (4 === a.readyState) { if (200 !== a.status) return void (s ? n(s) : r("cannot fetch resource: " + t + ", status: " + a.status)); var e = new FileReader; e.onloadend = function () { var t = e.result.split(/,/)[1]; n(t) }, e.readAsDataURL(a.response) } } function o() { s ? n(s) : r("timeout of " + e + "ms occured while fetching resource: " + t) } function r(t) { console.error(t), n("") } var a = new XMLHttpRequest; a.onreadystatechange = i, a.ontimeout = o, a.responseType = "blob", a.timeout = e, a.open("GET", t, !0), a.send(); var s; if (w.impl.options.imagePlaceholder) { var l = w.impl.options.imagePlaceholder.split(/,/); l && l[1] && (s = l[1]) } }) } function u(t, e) { return "data:" + e + ";base64," + t } function c(t) { return t.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1") } function d(t) { return function (e) { return new Promise(function (n) { setTimeout(function () { n(e) }, t) }) } } function g(t) { for (var e = [], n = t.length, i = 0; i < n; i++)e.push(t[i]); return e } function h(t) { return t.replace(/#/g, "%23").replace(/\n/g, "%0A") } function m(t) { var e = f(t, "border-left-width"), n = f(t, "border-right-width"); return t.scrollWidth + e + n } function p(t) { var e = f(t, "border-top-width"), n = f(t, "border-bottom-width"); return t.scrollHeight + e + n } function f(t, e) { var n = window.getComputedStyle(t).getPropertyValue(e); return parseFloat(n.replace("px", "")) } return { escape: c, parseExtension: e, mimeType: n, dataAsUrl: u, isDataUrl: i, canvasToBlob: r, resolveUrl: a, getAndEncode: l, uid: function () { var t = 0; return function () { return "u" + function () { return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4) }() + t++ } }(), delay: d, asArray: g, escapeXhtml: h, makeImage: s, width: m, height: p } }(), m = function () { function t(t) { return -1 !== t.search(o) } function e(t) { for (var e, n = []; null !== (e = o.exec(t));)n.push(e[1]); return n.filter(function (t) { return !h.isDataUrl(t) }) } function n(t, e, n, i) { function o(t) { return new RegExp("(url\\(['\"]?)(" + h.escape(t) + ")(['\"]?\\))", "g") } return Promise.resolve(e).then(function (t) { return n ? h.resolveUrl(t, n) : t }).then(i || h.getAndEncode).then(function (t) { return h.dataAsUrl(t, h.mimeType(e)) }).then(function (n) { return t.replace(o(e), "$1" + n + "$3") }) } function i(i, o, r) { return function () { return !t(i) }() ? Promise.resolve(i) : Promise.resolve(i).then(e).then(function (t) { var e = Promise.resolve(i); return t.forEach(function (t) { e = e.then(function (e) { return n(e, t, o, r) }) }), e }) } var o = /url\(['"]?([^'"]+?)['"]?\)/g; return { inlineAll: i, shouldProcess: t, impl: { readUrls: e, inline: n } } }(), p = function () { function t() { return e(document).then(function (t) { return Promise.all(t.map(function (t) { return t.resolve() })) }).then(function (t) { return t.join("\n") }) } function e() { function t(t) { return t.filter(function (t) { return t.type === CSSRule.FONT_FACE_RULE }).filter(function (t) { return m.shouldProcess(t.style.getPropertyValue("src")) }) } function e(t) { var e = []; return t.forEach(function (t) { try { h.asArray(t.cssRules || []).forEach(e.push.bind(e)) } catch (e) { console.log("Error while reading CSS rules from " + t.href, e.toString()) } }), e } function n(t) { return { resolve: function () { var e = (t.parentStyleSheet || {}).href; return m.inlineAll(t.cssText, e) }, src: function () { return t.style.getPropertyValue("src") } } } return Promise.resolve(h.asArray(document.styleSheets)).then(e).then(t).then(function (t) { return t.map(n) }) } return { resolveAll: t, impl: { readAll: e } } }(), f = function () { function t(t) { function e(e) { return h.isDataUrl(t.src) ? Promise.resolve() : Promise.resolve(t.src).then(e || h.getAndEncode).then(function (e) { return h.dataAsUrl(e, h.mimeType(t.src)) }).then(function (e) { return new Promise(function (n, i) { t.onload = n, t.onerror = i, t.src = e }) }) } return { inline: e } } function e(n) { return n instanceof Element ? function (t) { var e = t.style.getPropertyValue("background"); return e ? m.inlineAll(e).then(function (e) { t.style.setProperty("background", e, t.style.getPropertyPriority("background")) }).then(function () { return t }) : Promise.resolve(t) }(n).then(function () { return n instanceof HTMLImageElement ? t(n).inline() : Promise.all(h.asArray(n.childNodes).map(function (t) { return e(t) })) }) : Promise.resolve(n) } return { inlineAll: e, impl: { newImage: t } } }(), M = { imagePlaceholder: void 0, cacheBust: !1 }, w = { toSvg: n, toPng: o, toJpeg: r, toBlob: a, toPixelData: i, impl: { fontFaces: p, images: f, util: h, inliner: m, options: {} } }; t.exports = w }() }), i = t(function (t) { var n = n || function (t) { if (!(void 0 === t || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) { var e = t.document, n = function () { return t.URL || t.webkitURL || t }, i = e.createElementNS("http://www.w3.org/1999/xhtml", "a"), o = "download" in i, r = function (t) { var e = new MouseEvent("click"); t.dispatchEvent(e) }, a = /constructor/i.test(t.HTMLElement) || t.safari, s = /CriOS\/[\d]+/.test(navigator.userAgent), l = function (e) { (t.setImmediate || t.setTimeout)(function () { throw e }, 0) }, u = function (t) { var e = function () { "string" == typeof t ? n().revokeObjectURL(t) : t.remove() }; setTimeout(e, 4e4) }, c = function (t, e, n) { e = [].concat(e); for (var i = e.length; i--;) { var o = t["on" + e[i]]; if ("function" == typeof o) try { o.call(t, n || t) } catch (t) { l(t) } } }, d = function (t) { return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob([String.fromCharCode(65279), t], { type: t.type }) : t }, g = function (e, l, g) { g || (e = d(e)); var h, m = this, p = e.type, f = "application/octet-stream" === p, M = function () { c(m, "writestart progress write writeend".split(" ")) }; if (m.readyState = m.INIT, o) return h = n().createObjectURL(e), void setTimeout(function () { i.href = h, i.download = l, r(i), M(), u(h), m.readyState = m.DONE }); !function () { if ((s || f && a) && t.FileReader) { var i = new FileReader; return i.onloadend = function () { var e = s ? i.result : i.result.replace(/^data:[^;]*;/, "data:attachment/file;"); t.open(e, "_blank") || (t.location.href = e), e = void 0, m.readyState = m.DONE, M() }, i.readAsDataURL(e), void (m.readyState = m.INIT) } if (h || (h = n().createObjectURL(e)), f) t.location.href = h; else { t.open(h, "_blank") || (t.location.href = h) } m.readyState = m.DONE, M(), u(h) }() }, h = g.prototype, m = function (t, e, n) { return new g(t, e || t.name || "download", n) }; return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function (t, e, n) { return e = e || t.name || "download", n || (t = d(t)), navigator.msSaveOrOpenBlob(t, e) } : (h.abort = function () { }, h.readyState = h.INIT = 0, h.WRITING = 1, h.DONE = 2, h.error = h.onwritestart = h.onprogress = h.onwrite = h.onabort = h.onerror = h.onwriteend = null, m) } }("undefined" != typeof self && self || "undefined" != typeof window && window || e.content); t.exports && (t.exports.saveAs = n) });

    L.Control.EasyPrint = L.Control.extend({
        options: {
            apiUrl: null,
            title: 'Print map',
            position: 'topleft',
            sizeModes: ['Current'],
            filename: 'map',
            exportOnly: false,
            hidden: false,
            tileWait: 500,
            hideControlContainer: true,
            hideClasses: [],
            customWindowTitle: window.document.title,
            spinnerBgCOlor: '#0DC5C1',
            customSpinnerClass: 'epLoader',
            defaultSizeTitles: {
                Current: 'Current Size',
                A4Landscape: 'A4 Landscape',
                A4Portrait: 'A4 Portrait'
            }
        },

        onAdd: function () {
            this.mapContainer = this._map.getContainer();
            this.options.sizeModes = this.options.sizeModes.map(function (sizeMode) {
                if (sizeMode === 'Current') {
                    return {
                        name: this.options.defaultSizeTitles.Current,
                        className: 'CurrentSize'
                    }
                }
                if (sizeMode === 'A4Landscape') {
                    return {
                        height: this._a4PageSize.height,
                        width: this._a4PageSize.width,
                        name: this.options.defaultSizeTitles.A4Landscape,
                        className: 'A4Landscape page'
                    }
                }
                if (sizeMode === 'A4Portrait') {
                    return {
                        height: this._a4PageSize.width,
                        width: this._a4PageSize.height,
                        name: this.options.defaultSizeTitles.A4Portrait,
                        className: 'A4Portrait page'
                    }
                };
                return sizeMode;
            }, this);

            var container = L.DomUtil.create('div', 'leaflet-control-easyPrint leaflet-bar leaflet-control');
            if (!this.options.hidden) {
                this._addCss();

                L.DomEvent.addListener(container, 'mouseover', this._togglePageSizeButtons, this);
                L.DomEvent.addListener(container, 'mouseout', this._togglePageSizeButtons, this);

                var btnClass = 'leaflet-control-easyPrint-button'
                if (this.options.exportOnly) btnClass = btnClass + '-export'

                this.link = L.DomUtil.create('a', btnClass, container);
                this.link.id = "leafletEasyPrint";
                this.link.title = this.options.title;
                this.holder = L.DomUtil.create('ul', 'easyPrintHolder', container);

                this.options.sizeModes.forEach(function (sizeMode) {
                    var btn = L.DomUtil.create('li', 'easyPrintSizeMode', this.holder);
                    btn.title = sizeMode.name;
                    var link = L.DomUtil.create('a', sizeMode.className, btn);
                    L.DomEvent.addListener(btn, 'click', this.printMap, this);
                }, this);

                L.DomEvent.disableClickPropagation(container);
            }
            return container;
        },

        printMap: function (event, filename) {
            if (filename) {
                this.options.filename = filename
            }
            if (!this.options.exportOnly) {
                this._page = window.open("", "_blank", 'toolbar=no,status=no,menubar=no,scrollbars=no,resizable=no,left=10, top=10, width=200, height=250, visible=none');
                this._page.document.write(this._createSpinner(this.options.customWindowTitle, this.options.customSpinnerClass, this.options.spinnerBgCOlor));
            }
            this.originalState = {
                mapWidth: this.mapContainer.style.width,
                widthWasAuto: false,
                widthWasPercentage: false,
                mapHeight: this.mapContainer.style.height,
                zoom: this._map.getZoom(),
                center: this._map.getCenter()
            };
            if (this.originalState.mapWidth === 'auto') {
                this.originalState.mapWidth = this._map.getSize().x + 'px'
                this.originalState.widthWasAuto = true
            } else if (this.originalState.mapWidth.includes('%')) {
                this.originalState.percentageWidth = this.originalState.mapWidth
                this.originalState.widthWasPercentage = true
                this.originalState.mapWidth = this._map.getSize().x + 'px'
            }
            this._map.fire("easyPrint-start", { event: event });
            if (!this.options.hidden) {
                this._togglePageSizeButtons({ type: null });
            }
            if (this.options.hideControlContainer) {
                this._toggleControls();
            }
            if (this.options.hideClasses) {
                this._toggleClasses(this.options.hideClasses);
            }
            var sizeMode = typeof event !== 'string' ? event.target.className : event;
            if (sizeMode === 'CurrentSize') {
                return this._printOpertion(sizeMode);
            }
            this.outerContainer = this._createOuterContainer(this.mapContainer)
            if (this.originalState.widthWasAuto) {
                this.outerContainer.style.width = this.originalState.mapWidth
            }
            this._createImagePlaceholder(sizeMode)
        },

        _createImagePlaceholder: function (sizeMode) {
            var plugin = this;
            n.toPng(this.mapContainer, {
                width: parseInt(this.originalState.mapWidth.replace('px')),
                height: parseInt(this.originalState.mapHeight.replace('px'))
            })
                .then(function (dataUrl) {
                    plugin.blankDiv = document.createElement("div");
                    var blankDiv = plugin.blankDiv;
                    plugin.outerContainer.parentElement.insertBefore(blankDiv, plugin.outerContainer);
                    blankDiv.className = 'epHolder';
                    blankDiv.style.backgroundImage = 'url("' + dataUrl + '")';
                    blankDiv.style.position = 'absolute';
                    blankDiv.style.zIndex = 1011;
                    blankDiv.style.display = 'initial';
                    blankDiv.style.width = plugin.originalState.mapWidth;
                    blankDiv.style.height = plugin.originalState.mapHeight;
                    plugin._resizeAndPrintMap(sizeMode);
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });
        },

        _resizeAndPrintMap: function (sizeMode) {
            this.outerContainer.style.opacity = 0;
            var pageSize = this.options.sizeModes.filter(function (item) {
                return item.className.indexOf(sizeMode) > -1;
            });
            pageSize = pageSize[0]
            this.mapContainer.style.width = pageSize.width + 'px';
            this.mapContainer.style.height = pageSize.height + 'px';
            if (this.mapContainer.style.width > this.mapContainer.style.height) {
                this.orientation = 'portrait';
            } else {
                this.orientation = 'landscape';
            }
            this._map.setView(this.originalState.center);
            this._map.setZoom(this.originalState.zoom);
            this._map.invalidateSize();
            if (this.options.tileLayer) {
                this._pausePrint(sizeMode)
            } else {
                this._printOpertion(sizeMode)
            }
        },

        _pausePrint: function (sizeMode) {
            var plugin = this
            var loadingTest = setInterval(function () {
                if (!plugin.options.tileLayer.isLoading()) {
                    clearInterval(loadingTest);
                    plugin._printOpertion(sizeMode)
                }
            }, plugin.options.tileWait);
        },

        _printOpertion: function (sizemode) {
            var plugin = this;
            var widthForExport = this.mapContainer.style.width
            if (this.originalState.widthWasAuto && sizemode === 'CurrentSize' || this.originalState.widthWasPercentage && sizemode === 'CurrentSize') {
                widthForExport = this.originalState.mapWidth
            }
            n.toPng(plugin.mapContainer, {
                width: parseInt(widthForExport),
                height: parseInt(plugin.mapContainer.style.height.replace('px'))
            })
                .then(async function (dataUrl) {
                    var blob = plugin._dataURItoBlob(dataUrl);
                    if (plugin.options.callback) {

                        console.log('blob', blob);
                        plugin.options.callback(blob)

                    } else {
                        plugin._sendToBrowserPrint(dataUrl, plugin.orientation);
                    }
                    plugin._toggleControls(true);
                    plugin._toggleClasses(plugin.options.hideClasses, true);

                    if (plugin.outerContainer) {
                        if (plugin.originalState.widthWasAuto) {
                            plugin.mapContainer.style.width = 'auto'
                        } else if (plugin.originalState.widthWasPercentage) {
                            plugin.mapContainer.style.width = plugin.originalState.percentageWidth
                        }
                        else {
                            plugin.mapContainer.style.width = plugin.originalState.mapWidth;
                        }
                        plugin.mapContainer.style.height = plugin.originalState.mapHeight;
                        plugin._removeOuterContainer(plugin.mapContainer, plugin.outerContainer, plugin.blankDiv)
                        plugin._map.invalidateSize();
                        plugin._map.setView(plugin.originalState.center);
                        plugin._map.setZoom(plugin.originalState.zoom);
                    }
                    plugin._map.fire("easyPrint-finished");
                })
                .catch(function (error) {
                    console.error('Print operation failed', error);
                });
        },

        _sendToBrowserPrint: function (img, orientation) {
            this._page.resizeTo(600, 800);
            var pageContent = this._createNewWindow(img, orientation, this)
            this._page.document.body.innerHTML = ''
            this._page.document.write(pageContent);
            this._page.document.close();
        },

        _createSpinner: function (title, spinnerClass, spinnerColor) {
            return `<html><head><title>` + title + `</title></head><body><style>
      body{
        background: ` + spinnerColor + `;
      }
      .epLoader,
      .epLoader:before,
      .epLoader:after {
        border-radius: 50%;
      }
      .epLoader {
        color: #ffffff;
        font-size: 11px;
        text-indent: -99999em;
        margin: 55px auto;
        position: relative;
        width: 10em;
        height: 10em;
        box-shadow: inset 0 0 0 1em;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
      }
      .epLoader:before,
      .epLoader:after {
        position: absolute;
        content: '';
      }
      .epLoader:before {
        width: 5.2em;
        height: 10.2em;
        background: #0dc5c1;
        border-radius: 10.2em 0 0 10.2em;
        top: -0.1em;
        left: -0.1em;
        -webkit-transform-origin: 5.2em 5.1em;
        transform-origin: 5.2em 5.1em;
        -webkit-animation: load2 2s infinite ease 1.5s;
        animation: load2 2s infinite ease 1.5s;
      }
      .epLoader:after {
        width: 5.2em;
        height: 10.2em;
        background: #0dc5c1;
        border-radius: 0 10.2em 10.2em 0;
        top: -0.1em;
        left: 5.1em;
        -webkit-transform-origin: 0px 5.1em;
        transform-origin: 0px 5.1em;
        -webkit-animation: load2 2s infinite ease;
        animation: load2 2s infinite ease;
      }
      @-webkit-keyframes load2 {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      @keyframes load2 {
        0% {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }
        100% {
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        }
      }
      </style>
    <div class="`+ spinnerClass + `">Loading...</div></body></html>`;
        },

        _createNewWindow: function (img, orientation, plugin) {
            return `<html><head>
        <style>@media print {
          img { max-width: 98%!important; max-height: 98%!important; }
          @page { size: ` + orientation + `;}}
        </style>
        <script>function step1(){
        setTimeout('step2()', 10);}
        function step2(){window.print();window.close()}
        </script></head><body onload='step1()'>
        <img src="` + img + `" style="display:block; margin:auto;"></body></html>`;
        },

        _createOuterContainer: function (mapDiv) {
            var outerContainer = document.createElement('div');
            mapDiv.parentNode.insertBefore(outerContainer, mapDiv);
            mapDiv.parentNode.removeChild(mapDiv);
            outerContainer.appendChild(mapDiv);
            outerContainer.style.width = mapDiv.style.width;
            outerContainer.style.height = mapDiv.style.height;
            outerContainer.style.display = 'inline-block'
            outerContainer.style.overflow = 'hidden';
            return outerContainer;
        },

        _removeOuterContainer: function (mapDiv, outerContainer, blankDiv) {
            if (outerContainer.parentNode) {
                outerContainer.parentNode.insertBefore(mapDiv, outerContainer);
                outerContainer.parentNode.removeChild(blankDiv);
                outerContainer.parentNode.removeChild(outerContainer);
            }
        },

        _addCss: function () {
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = `.leaflet-control-easyPrint-button { 
      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMTI4LDMyaDI1NnY2NEgxMjhWMzJ6IE00ODAsMTI4SDMyYy0xNy42LDAtMzIsMTQuNC0zMiwzMnYxNjBjMCwxNy42LDE0LjM5OCwzMiwzMiwzMmg5NnYxMjhoMjU2VjM1Mmg5NiAgIGMxNy42LDAsMzItMTQuNCwzMi0zMlYxNjBDNTEyLDE0Mi40LDQ5Ny42LDEyOCw0ODAsMTI4eiBNMzUyLDQ0OEgxNjBWMjg4aDE5MlY0NDh6IE00ODcuMTk5LDE3NmMwLDEyLjgxMy0xMC4zODcsMjMuMi0yMy4xOTcsMjMuMiAgIGMtMTIuODEyLDAtMjMuMjAxLTEwLjM4Ny0yMy4yMDEtMjMuMnMxMC4zODktMjMuMiwyMy4xOTktMjMuMkM0NzYuODE0LDE1Mi44LDQ4Ny4xOTksMTYzLjE4Nyw0ODcuMTk5LDE3NnoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
      background-size: 16px 16px; 
      cursor: pointer; 
    }
    .leaflet-control-easyPrint-button-export { 
      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQzMy41IDQzMy41IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MzMuNSA0MzMuNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnIGlkPSJmaWxlLWRvd25sb2FkIj4KCQk8cGF0aCBkPSJNMzk1LjI1LDE1M2gtMTAyVjBoLTE1M3YxNTNoLTEwMmwxNzguNSwxNzguNUwzOTUuMjUsMTUzeiBNMzguMjUsMzgyLjV2NTFoMzU3di01MUgzOC4yNXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);
      background-size: 16px 16px; 
      cursor: pointer; 
    }
    .easyPrintHolder a {
      background-size: 16px 16px;
      cursor: pointer;
    }
    .easyPrintHolder .CurrentSize{
      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTZweCIgdmVyc2lvbj0iMS4xIiBoZWlnaHQ9IjE2cHgiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNjQgNjQiPgogIDxnPgogICAgPGcgZmlsbD0iIzFEMUQxQiI+CiAgICAgIDxwYXRoIGQ9Ik0yNS4yNTUsMzUuOTA1TDQuMDE2LDU3LjE0NVY0Ni41OWMwLTEuMTA4LTAuODk3LTIuMDA4LTIuMDA4LTIuMDA4QzAuODk4LDQ0LjU4MiwwLDQ1LjQ4MSwwLDQ2LjU5djE1LjQwMiAgICBjMCwwLjI2MSwwLjA1MywwLjUyMSwwLjE1NSwwLjc2N2MwLjIwMywwLjQ5MiwwLjU5NCwwLjg4MiwxLjA4NiwxLjA4N0MxLjQ4Niw2My45NDcsMS43NDcsNjQsMi4wMDgsNjRoMTUuNDAzICAgIGMxLjEwOSwwLDIuMDA4LTAuODk4LDIuMDA4LTIuMDA4cy0wLjg5OC0yLjAwOC0yLjAwOC0yLjAwOEg2Ljg1NWwyMS4yMzgtMjEuMjRjMC43ODQtMC43ODQsMC43ODQtMi4wNTUsMC0yLjgzOSAgICBTMjYuMDM5LDM1LjEyMSwyNS4yNTUsMzUuOTA1eiIgZmlsbD0iIzAwMDAwMCIvPgogICAgICA8cGF0aCBkPSJtNjMuODQ1LDEuMjQxYy0wLjIwMy0wLjQ5MS0wLjU5NC0wLjg4Mi0xLjA4Ni0xLjA4Ny0wLjI0NS0wLjEwMS0wLjUwNi0wLjE1NC0wLjc2Ny0wLjE1NGgtMTUuNDAzYy0xLjEwOSwwLTIuMDA4LDAuODk4LTIuMDA4LDIuMDA4czAuODk4LDIuMDA4IDIuMDA4LDIuMDA4aDEwLjU1NmwtMjEuMjM4LDIxLjI0Yy0wLjc4NCwwLjc4NC0wLjc4NCwyLjA1NSAwLDIuODM5IDAuMzkyLDAuMzkyIDAuOTA2LDAuNTg5IDEuNDIsMC41ODlzMS4wMjctMC4xOTcgMS40MTktMC41ODlsMjEuMjM4LTIxLjI0djEwLjU1NWMwLDEuMTA4IDAuODk3LDIuMDA4IDIuMDA4LDIuMDA4IDEuMTA5LDAgMi4wMDgtMC44OTkgMi4wMDgtMi4wMDh2LTE1LjQwMmMwLTAuMjYxLTAuMDUzLTAuNTIyLTAuMTU1LTAuNzY3eiIgZmlsbD0iIzAwMDAwMCIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==)
    }
    .easyPrintHolder .page {
      background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ0NC44MzMgNDQ0LjgzMyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDQ0LjgzMyA0NDQuODMzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNTUuMjUsNDQ0LjgzM2gzMzQuMzMzYzkuMzUsMCwxNy03LjY1LDE3LTE3VjEzOS4xMTdjMC00LjgxNy0xLjk4My05LjM1LTUuMzgzLTEyLjQ2N0wyNjkuNzMzLDQuNTMzICAgIEMyNjYuNjE3LDEuNywyNjIuMzY3LDAsMjU4LjExNywwSDU1LjI1Yy05LjM1LDAtMTcsNy42NS0xNywxN3Y0MTAuODMzQzM4LjI1LDQzNy4xODMsNDUuOSw0NDQuODMzLDU1LjI1LDQ0NC44MzN6ICAgICBNMzcyLjU4MywxNDYuNDgzdjAuODVIMjU2LjQxN3YtMTA4LjhMMzcyLjU4MywxNDYuNDgzeiBNNzIuMjUsMzRoMTUwLjE2N3YxMzAuMzMzYzAsOS4zNSw3LjY1LDE3LDE3LDE3aDEzMy4xNjd2MjI5LjVINzIuMjVWMzR6ICAgICIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
    }
    .easyPrintHolder .A4Landscape { 
      transform: rotate(-90deg);
    }

    .leaflet-control-easyPrint-button{
      display: inline-block;
    }
    .easyPrintHolder{
      margin-top:-31px;
      margin-bottom: -5px;
      margin-left: 30px;
      padding-left: 0px;
      display: none;
    }

    .easyPrintSizeMode {
      display: inline-block;
    }
    .easyPrintHolder .easyPrintSizeMode a {
      border-radius: 0px;
    }

    .easyPrintHolder .easyPrintSizeMode:last-child a{
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      margin-left: -1px;
    }

    .easyPrintPortrait:hover, .easyPrintLandscape:hover{
      background-color: #757570;
      cursor: pointer;
    }`;
            document.body.appendChild(css);
        },

        _dataURItoBlob: function (dataURI) {
            // var byteString = atob(dataURI.split(',')[1]);
            // var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            // var ab = new ArrayBuffer(byteString.length);
            // var dw = new DataView(ab);
            // for (var i = 0; i < byteString.length; i++) {
            //     dw.setUint8(i, byteString.charCodeAt(i));
            // }
            // return new Blob([ab], { type: mimeString });
            return dataURI
        },

        _togglePageSizeButtons: function (e) {
            var holderStyle = this.holder.style
            var linkStyle = this.link.style
            if (e.type === 'mouseover') {
                holderStyle.display = 'block';
                linkStyle.borderTopRightRadius = '0'
                linkStyle.borderBottomRightRadius = '0'
            } else {
                holderStyle.display = 'none';
                linkStyle.borderTopRightRadius = '2px'
                linkStyle.borderBottomRightRadius = '2px'
            }
        },

        _toggleControls: function (show) {
            var controlContainer = document.getElementsByClassName("leaflet-control-container")[0];
            if (show) return controlContainer.style.display = 'block';
            controlContainer.style.display = 'none';
        },
        _toggleClasses: function (classes, show) {
            classes.forEach(function (className) {
                var div = document.getElementsByClassName(className)[0];
                if (show) return div.style.display = 'block';
                div.style.display = 'none';
            });
        },

        _a4PageSize: {
            height: 715,
            width: 1045
        }

    });

    L.easyPrint = function (options) {
        return new L.Control.EasyPrint(options);
    };
});