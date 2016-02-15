! function(t, e, i, n) {
    var a = e.document,
        o = t(a),
        r = t(e),
        s = Array.prototype,
        l = 1.41,
        c = true,
        u = 3e4,
        h = false,
        f = navigator.userAgent.toLowerCase(),
        d = e.location.hash.replace(/#\//, ""),
        p = e.location.protocol,
        g = Math,
        m = function() {},
        v = function() {
            return false
        },
        y = function() {
            var t = 3,
                e = a.createElement("div"),
                i = e.getElementsByTagName("i");
            do {
                e.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->"
            } while (i[0]);
            return t > 4 ? t : a.documentMode || n
        }(),
        _ = function() {
            return {
                html: a.documentElement,
                body: a.body,
                head: a.getElementsByTagName("head")[0],
                title: a.title
            }
        },
        b = e.parent !== e.self,
        w = "data ready thumbnail loadstart loadfinish image play pause progress " + "fullscreen_enter fullscreen_exit idle_enter idle_exit rescale " + "lightbox_open lightbox_close lightbox_image",
        x = function() {
            var e = [];
            t.each(w.split(" "), function(t, i) {
                e.push(i);
                if (/_/.test(i)) {
                    e.push(i.replace(/_/g, ""))
                }
            });
            return e
        }(),
        T = function(e) {
            var i;
            if (typeof e !== "object") {
                return e
            }
            t.each(e, function(n, a) {
                if (/^[a-z]+_/.test(n)) {
                    i = "";
                    t.each(n.split("_"), function(t, e) {
                        i += t > 0 ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
                    });
                    e[i] = a;
                    delete e[n]
                }
            });
            return e
        },
        k = function(e) {
            if (t.inArray(e, x) > -1) {
                return i[e.toUpperCase()]
            }
            return e
        },
        C = {
            youtube: {
                reg: /https?:\/\/(?:[a-zA_Z]{2,3}.)?(?:youtube\.com\/watch\?)((?:[\w\d\-\_\=]+&amp;(?:amp;)?)*v(?:&lt;[A-Z]+&gt;)?=([0-9a-zA-Z\-\_]+))/i,
                embed: function() {
                    return "http://www.youtube.com/embed/" + this.id
                },
                getUrl: function() {
                    return p + "//gdata.youtube.com/feeds/api/videos/" + this.id + "?v=2&alt=json-in-script&callback=?"
                },
                get_thumb: function(t) {
                    return t.entry.media$group.media$thumbnail[2].url
                },
                get_image: function(t) {
                    if (t.entry.yt$hd) {
                        return p + "//img.youtube.com/vi/" + this.id + "/maxresdefault.jpg"
                    }
                    return t.entry.media$group.media$thumbnail[3].url
                }
            },
            vimeo: {
                reg: /https?:\/\/(?:www\.)?(vimeo\.com)\/(?:hd#)?([0-9]+)/i,
                embed: function() {
                    return "http://player.vimeo.com/video/" + this.id
                },
                getUrl: function() {
                    return p + "//vimeo.com/api/v2/video/" + this.id + ".json?callback=?"
                },
                get_thumb: function(t) {
                    return t[0].thumbnail_medium
                },
                get_image: function(t) {
                    return t[0].thumbnail_large
                }
            },
            dailymotion: {
                reg: /https?:\/\/(?:www\.)?(dailymotion\.com)\/video\/([^_]+)/,
                embed: function() {
                    return p + "//www.dailymotion.com/embed/video/" + this.id
                },
                getUrl: function() {
                    return "https://api.dailymotion.com/video/" + this.id + "?fields=thumbnail_240_url,thumbnail_720_url&callback=?"
                },
                get_thumb: function(t) {
                    return t.thumbnail_240_url
                },
                get_image: function(t) {
                    return t.thumbnail_720_url
                }
            },
            _inst: []
        },
        I = function(e, i) {
            for (var n = 0; n < C._inst.length; n++) {
                if (C._inst[n].id === i && C._inst[n].type == e) {
                    return C._inst[n]
                }
            }
            this.type = e;
            this.id = i;
            this.readys = [];
            C._inst.push(this);
            var a = this;
            t.extend(this, C[e]);
            t.getJSON(this.getUrl(), function(e) {
                a.data = e;
                t.each(a.readys, function(t, e) {
                    e(a.data)
                });
                a.readys = []
            });
            this.getMedia = function(t, e, i) {
                i = i || m;
                var n = this;
                var a = function(i) {
                    e(n["get_" + t](i))
                };
                try {
                    if (n.data) {
                        a(n.data)
                    } else {
                        n.readys.push(a)
                    }
                } catch (o) {
                    i()
                }
            }
        },
        S = function(t) {
            var e;
            for (var i in C) {
                e = t && C[i].reg && t.match(C[i].reg);
                if (e && e.length) {
                    return {
                        id: e[2],
                        provider: i
                    }
                }
            }
            return false
        },
        A = {
            support: function() {
                var t = _().html;
                return !b && (t.requestFullscreen || t.msRequestFullscreen || t.mozRequestFullScreen || t.webkitRequestFullScreen)
            }(),
            callback: m,
            enter: function(t, e, i) {
                this.instance = t;
                this.callback = e || m;
                i = i || _().html;
                if (i.requestFullscreen) {
                    i.requestFullscreen()
                } else if (i.msRequestFullscreen) {
                    i.msRequestFullscreen()
                } else if (i.mozRequestFullScreen) {
                    i.mozRequestFullScreen()
                } else if (i.webkitRequestFullScreen) {
                    i.webkitRequestFullScreen()
                }
            },
            exit: function(t) {
                this.callback = t || m;
                if (a.exitFullscreen) {
                    a.exitFullscreen()
                } else if (a.msExitFullscreen) {
                    a.msExitFullscreen()
                } else if (a.mozCancelFullScreen) {
                    a.mozCancelFullScreen()
                } else if (a.webkitCancelFullScreen) {
                    a.webkitCancelFullScreen()
                }
            },
            instance: null,
            listen: function() {
                if (!this.support) {
                    return
                }
                var t = function() {
                    if (!A.instance) {
                        return
                    }
                    var t = A.instance._fullscreen;
                    if (a.fullscreen || a.mozFullScreen || a.webkitIsFullScreen || a.msFullscreenElement && a.msFullscreenElement !== null) {
                        t._enter(A.callback)
                    } else {
                        t._exit(A.callback)
                    }
                };
                a.addEventListener("fullscreenchange", t, false);
                a.addEventListener("MSFullscreenChange", t, false);
                a.addEventListener("mozfullscreenchange", t, false);
                a.addEventListener("webkitfullscreenchange", t, false)
            }
        },
        E = [],
        D = [],
        $ = false,
        L = false,
        P = [],
        z = [],
        F = function(e) {
            z.push(e);
            t.each(P, function(t, i) {
                if (i._options.theme == e.name || !i._initialized && !i._options.theme) {
                    i.theme = e;
                    i._init.call(i)
                }
            })
        },
        H = function() {
            return {
                clearTimer: function(e) {
                    t.each(i.get(), function() {
                        this.clearTimer(e)
                    })
                },
                addTimer: function(e) {
                    t.each(i.get(), function() {
                        this.addTimer(e)
                    })
                },
                array: function(t) {
                    return s.slice.call(t, 0)
                },
                create: function(t, e) {
                    e = e || "div";
                    var i = a.createElement(e);
                    i.className = t;
                    return i
                },
                removeFromArray: function(e, i) {
                    t.each(e, function(t, n) {
                        if (n == i) {
                            e.splice(t, 1);
                            return false
                        }
                    });
                    return e
                },
                getScriptPath: function(e) {
                    e = e || t("script:last").attr("src");
                    var i = e.split("/");
                    if (i.length == 1) {
                        return ""
                    }
                    i.pop();
                    return i.join("/") + "/"
                },
                animate: function() {
                    var n = function(t) {
                        var i = "transition WebkitTransition MozTransition OTransition".split(" "),
                            n;
                        if (e.opera) {
                            return false
                        }
                        for (n = 0; i[n]; n++) {
                            if (typeof t[i[n]] !== "undefined") {
                                return i[n]
                            }
                        }
                        return false
                    }((a.body || a.documentElement).style);
                    var o = {
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        WebkitTransition: "webkitTransitionEnd",
                        transition: "transitionend"
                    }[n];
                    var r = {
                        _default: [.25, .1, .25, 1],
                        galleria: [.645, .045, .355, 1],
                        galleriaIn: [.55, .085, .68, .53],
                        galleriaOut: [.25, .46, .45, .94],
                        ease: [.25, 0, .25, 1],
                        linear: [.25, .25, .75, .75],
                        "ease-in": [.42, 0, 1, 1],
                        "ease-out": [0, 0, .58, 1],
                        "ease-in-out": [.42, 0, .58, 1]
                    };
                    var s = function(e, i, n) {
                        var a = {};
                        n = n || "transition";
                        t.each("webkit moz ms o".split(" "), function() {
                            a["-" + this + "-" + n] = i
                        });
                        e.css(a)
                    };
                    var l = function(t) {
                        s(t, "none", "transition");
                        if (i.WEBKIT && i.TOUCH) {
                            s(t, "translate3d(0,0,0)", "transform");
                            if (t.data("revert")) {
                                t.css(t.data("revert"));
                                t.data("revert", null)
                            }
                        }
                    };
                    var c, u, h, f, d, p, g;
                    return function(a, v, y) {
                        y = t.extend({
                            duration: 400,
                            complete: m,
                            stop: false
                        }, y);
                        a = t(a);
                        if (!y.duration) {
                            a.css(v);
                            y.complete.call(a[0]);
                            return
                        }
                        if (!n) {
                            a.animate(v, y);
                            return
                        }
                        if (y.stop) {
                            a.off(o);
                            l(a)
                        }
                        c = false;
                        t.each(v, function(t, e) {
                            g = a.css(t);
                            if (H.parseValue(g) != H.parseValue(e)) {
                                c = true
                            }
                            a.css(t, g)
                        });
                        if (!c) {
                            e.setTimeout(function() {
                                y.complete.call(a[0])
                            }, y.duration);
                            return
                        }
                        u = [];
                        h = y.easing in r ? r[y.easing] : r._default;
                        f = " " + y.duration + "ms" + " cubic-bezier(" + h.join(",") + ")";
                        e.setTimeout(function(e, n, a, o) {
                            return function() {
                                e.one(n, function(t) {
                                    return function() {
                                        l(t);
                                        y.complete.call(t[0])
                                    }
                                }(e));
                                if (i.WEBKIT && i.TOUCH) {
                                    d = {};
                                    p = [0, 0, 0];
                                    t.each(["left", "top"], function(t, i) {
                                        if (i in a) {
                                            p[t] = H.parseValue(a[i]) - H.parseValue(e.css(i)) + "px";
                                            d[i] = a[i];
                                            delete a[i]
                                        }
                                    });
                                    if (p[0] || p[1]) {
                                        e.data("revert", d);
                                        u.push("-webkit-transform" + o);
                                        s(e, "translate3d(" + p.join(",") + ")", "transform")
                                    }
                                }
                                t.each(a, function(t, e) {
                                    u.push(t + o)
                                });
                                s(e, u.join(","));
                                e.css(a)
                            }
                        }(a, o, v, f), 2)
                    }
                }(),
                removeAlpha: function(t) {
                    if (t instanceof jQuery) {
                        t = t[0]
                    }
                    if (y < 9 && t) {
                        var e = t.style,
                            i = t.currentStyle,
                            n = i && i.filter || e.filter || "";
                        if (/alpha/.test(n)) {
                            e.filter = n.replace(/alpha\([^)]*\)/i, "")
                        }
                    }
                },
                forceStyles: function(e, i) {
                    e = t(e);
                    if (e.attr("style")) {
                        e.data("styles", e.attr("style")).removeAttr("style")
                    }
                    e.css(i)
                },
                revertStyles: function() {
                    t.each(H.array(arguments), function(e, i) {
                        i = t(i);
                        i.removeAttr("style");
                        i.attr("style", "");
                        if (i.data("styles")) {
                            i.attr("style", i.data("styles")).data("styles", null)
                        }
                    })
                },
                moveOut: function(t) {
                    H.forceStyles(t, {
                        position: "absolute",
                        left: -1e4
                    })
                },
                moveIn: function() {
                    H.revertStyles.apply(H, H.array(arguments))
                },
                hide: function(e, i, n) {
                    n = n || m;
                    var a = t(e);
                    e = a[0];
                    if (!a.data("opacity")) {
                        a.data("opacity", a.css("opacity"))
                    }
                    var o = {
                        opacity: 0
                    };
                    if (i) {
                        var r = y < 9 && e ? function() {
                            H.removeAlpha(e);
                            e.style.visibility = "hidden";
                            n.call(e)
                        } : n;
                        H.animate(e, o, {
                            duration: i,
                            complete: r,
                            stop: true
                        })
                    } else {
                        if (y < 9 && e) {
                            H.removeAlpha(e);
                            e.style.visibility = "hidden"
                        } else {
                            a.css(o)
                        }
                    }
                },
                show: function(e, i, n) {
                    n = n || m;
                    var a = t(e);
                    e = a[0];
                    var o = parseFloat(a.data("opacity")) || 1,
                        r = {
                            opacity: o
                        };
                    if (i) {
                        if (y < 9) {
                            a.css("opacity", 0);
                            e.style.visibility = "visible"
                        }
                        var s = y < 9 && e ? function() {
                            if (r.opacity == 1) {
                                H.removeAlpha(e)
                            }
                            n.call(e)
                        } : n;
                        H.animate(e, r, {
                            duration: i,
                            complete: s,
                            stop: true
                        })
                    } else {
                        if (y < 9 && r.opacity == 1 && e) {
                            H.removeAlpha(e);
                            e.style.visibility = "visible"
                        } else {
                            a.css(r)
                        }
                    }
                },
                wait: function(n) {
                    i._waiters = i._waiters || [];
                    n = t.extend({
                        until: v,
                        success: m,
                        error: function() {
                            i.raise("Could not complete wait function.")
                        },
                        timeout: 3e3
                    }, n);
                    var a = H.timestamp(),
                        o, r, s, l = function() {
                            r = H.timestamp();
                            o = r - a;
                            H.removeFromArray(i._waiters, s);
                            if (n.until(o)) {
                                n.success();
                                return false
                            }
                            if (typeof n.timeout == "number" && r >= a + n.timeout) {
                                n.error();
                                return false
                            }
                            i._waiters.push(s = e.setTimeout(l, 10))
                        };
                    i._waiters.push(s = e.setTimeout(l, 10))
                },
                toggleQuality: function(t, e) {
                    if (y !== 7 && y !== 8 || !t || t.nodeName.toUpperCase() != "IMG") {
                        return
                    }
                    if (typeof e === "undefined") {
                        e = t.style.msInterpolationMode === "nearest-neighbor"
                    }
                    t.style.msInterpolationMode = e ? "bicubic" : "nearest-neighbor"
                },
                insertStyleTag: function(e, i) {
                    if (i && t("#" + i).length) {
                        return
                    }
                    var n = a.createElement("style");
                    if (i) {
                        n.id = i
                    }
                    _().head.appendChild(n);
                    if (n.styleSheet) {
                        n.styleSheet.cssText = e
                    } else {
                        var o = a.createTextNode(e);
                        n.appendChild(o)
                    }
                },
                loadScript: function(e, i) {
                    var n = false,
                        a = t("<scr" + "ipt>").attr({
                            src: e,
                            async: true
                        }).get(0);
                    a.onload = a.onreadystatechange = function() {
                        if (!n && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                            n = true;
                            a.onload = a.onreadystatechange = null;
                            if (typeof i === "function") {
                                i.call(this, this)
                            }
                        }
                    };
                    _().head.appendChild(a)
                },
                parseValue: function(t) {
                    if (typeof t === "number") {
                        return t
                    } else if (typeof t === "string") {
                        var e = t.match(/\-?\d|\./g);
                        return e && e.constructor === Array ? e.join("") * 1 : 0
                    } else {
                        return 0
                    }
                },
                timestamp: function() {
                    return (new Date).getTime()
                },
                loadCSS: function(e, o, r) {
                    var s, l;
                    t("link[rel=stylesheet]").each(function() {
                        if (new RegExp(e).test(this.href)) {
                            s = this;
                            return false
                        }
                    });
                    if (typeof o === "function") {
                        r = o;
                        o = n
                    }
                    r = r || m;
                    if (s) {
                        r.call(s, s);
                        return s
                    }
                    l = a.styleSheets.length;
                    if (t("#" + o).length) {
                        t("#" + o).attr("href", e);
                        l--
                    } else {
                        s = t("<link>").attr({
                            rel: "stylesheet",
                            href: e,
                            id: o
                        }).get(0);
                        var c = t('link[rel="stylesheet"], style');
                        if (c.length) {
                            c.get(0).parentNode.insertBefore(s, c[0])
                        } else {
                            _().head.appendChild(s)
                        }
                        if (y && l >= 31) {
                            i.raise("You have reached the browser stylesheet limit (31)", true);
                            return
                        }
                    }
                    if (typeof r === "function") {
                        var u = t("<s>").attr("id", "galleria-loader").hide().appendTo(_().body);
                        H.wait({
                            until: function() {
                                return u.height() == 1
                            },
                            success: function() {
                                u.remove();
                                r.call(s, s)
                            },
                            error: function() {
                                u.remove();
                                i.raise("Theme CSS could not load after 20 sec. " + (i.QUIRK ? "Your browser is in Quirks Mode, please add a correct doctype." : "Please download the latest theme at http://galleria.io/customer/."), true)
                            },
                            timeout: 5e3
                        })
                    }
                    return s
                }
            }
        }(),
        O = function(e) {
            var i = ".galleria-videoicon{width:60px;height:60px;position:absolute;top:50%;left:50%;z-index:1;" + "margin:-30px 0 0 -30px;cursor:pointer;background:#000;background:rgba(0,0,0,.8);border-radius:3px;-webkit-transition:all 150ms}" + ".galleria-videoicon i{width:0px;height:0px;border-style:solid;border-width:10px 0 10px 16px;display:block;" + "border-color:transparent transparent transparent #ffffff;margin:20px 0 0 22px}.galleria-image:hover .galleria-videoicon{background:#000}";
            H.insertStyleTag(i, "galleria-videoicon");
            return t(H.create("galleria-videoicon")).html("<i></i>").appendTo(e).click(function() {
                t(this).siblings("img").mouseup()
            })
        },
        M = function() {
            var e = function(e, i, n, a) {
                var o = this.getOptions("easing"),
                    r = this.getStageWidth(),
                    s = {
                        left: r * (e.rewind ? -1 : 1)
                    },
                    l = {
                        left: 0
                    };
                if (n) {
                    s.opacity = 0;
                    l.opacity = 1
                } else {
                    s.opacity = 1
                }
                t(e.next).css(s);
                H.animate(e.next, l, {
                    duration: e.speed,
                    complete: function(t) {
                        return function() {
                            i();
                            t.css({
                                left: 0
                            })
                        }
                    }(t(e.next).add(e.prev)),
                    queue: false,
                    easing: o
                });
                if (a) {
                    e.rewind = !e.rewind
                }
                if (e.prev) {
                    s = {
                        left: 0
                    };
                    l = {
                        left: r * (e.rewind ? 1 : -1)
                    };
                    if (n) {
                        s.opacity = 1;
                        l.opacity = 0
                    }
                    t(e.prev).css(s);
                    H.animate(e.prev, l, {
                        duration: e.speed,
                        queue: false,
                        easing: o,
                        complete: function() {
                            t(this).css("opacity", 0)
                        }
                    })
                }
            };
            return {
                active: false,
                init: function(t, e, i) {
                    if (M.effects.hasOwnProperty(t)) {
                        M.effects[t].call(this, e, i)
                    }
                },
                effects: {
                    fade: function(e, i) {
                        t(e.next).css({
                            opacity: 0,
                            left: 0
                        });
                        H.animate(e.next, {
                            opacity: 1
                        }, {
                            duration: e.speed,
                            complete: i
                        });
                        if (e.prev) {
                            t(e.prev).css("opacity", 1).show();
                            H.animate(e.prev, {
                                opacity: 0
                            }, {
                                duration: e.speed
                            })
                        }
                    },
                    flash: function(e, i) {
                        t(e.next).css({
                            opacity: 0,
                            left: 0
                        });
                        if (e.prev) {
                            H.animate(e.prev, {
                                opacity: 0
                            }, {
                                duration: e.speed / 2,
                                complete: function() {
                                    H.animate(e.next, {
                                        opacity: 1
                                    }, {
                                        duration: e.speed,
                                        complete: i
                                    })
                                }
                            })
                        } else {
                            H.animate(e.next, {
                                opacity: 1
                            }, {
                                duration: e.speed,
                                complete: i
                            })
                        }
                    },
                    pulse: function(e, i) {
                        if (e.prev) {
                            t(e.prev).hide()
                        }
                        t(e.next).css({
                            opacity: 0,
                            left: 0
                        }).show();
                        H.animate(e.next, {
                            opacity: 1
                        }, {
                            duration: e.speed,
                            complete: i
                        })
                    },
                    slide: function(t, i) {
                        e.apply(this, H.array(arguments))
                    },
                    fadeslide: function(t, i) {
                        e.apply(this, H.array(arguments).concat([true]))
                    },
                    doorslide: function(t, i) {
                        e.apply(this, H.array(arguments).concat([false, true]))
                    }
                }
            }
        }();
    A.listen();
    t.event.special["click:fast"] = {
        propagate: true,
        add: function(i) {
            var n = function(t) {
                if (t.touches && t.touches.length) {
                    var e = t.touches[0];
                    return {
                        x: e.pageX,
                        y: e.pageY
                    }
                }
            };
            var a = {
                touched: false,
                touchdown: false,
                coords: {
                    x: 0,
                    y: 0
                },
                evObj: {}
            };
            t(this).data({
                clickstate: a,
                timer: 0
            }).on("touchstart.fast", function(i) {
                e.clearTimeout(t(this).data("timer"));
                t(this).data("clickstate", {
                    touched: true,
                    touchdown: true,
                    coords: n(i.originalEvent),
                    evObj: i
                })
            }).on("touchmove.fast", function(e) {
                var i = n(e.originalEvent),
                    a = t(this).data("clickstate"),
                    o = Math.max(Math.abs(a.coords.x - i.x), Math.abs(a.coords.y - i.y));
                if (o > 6) {
                    t(this).data("clickstate", t.extend(a, {
                        touchdown: false
                    }))
                }
            }).on("touchend.fast", function(n) {
                var o = t(this),
                    r = o.data("clickstate");
                if (r.touchdown) {
                    i.handler.call(this, n)
                }
                o.data("timer", e.setTimeout(function() {
                    o.data("clickstate", a)
                }, 400))
            }).on("click.fast", function(e) {
                var n = t(this).data("clickstate");
                if (n.touched) {
                    return false
                }
                t(this).data("clickstate", a);
                i.handler.call(this, e)
            })
        },
        remove: function() {
            t(this).off("touchstart.fast touchmove.fast touchend.fast click.fast")
        }
    };
    r.on("orientationchange", function() {
        t(this).resize()
    });
    i = function() {
        var s = this;
        this._options = {};
        this._playing = false;
        this._playtime = 5e3;
        this._active = null;
        this._queue = {
            length: 0
        };
        this._data = [];
        this._dom = {};
        this._thumbnails = [];
        this._layers = [];
        this._initialized = false;
        this._firstrun = false;
        this._stageWidth = 0;
        this._stageHeight = 0;
        this._target = n;
        this._binds = [];
        this._id = parseInt(g.random() * 1e4, 10);
        var l = "container stage images image-nav image-nav-left image-nav-right " + "info info-text info-title info-description " + "thumbnails thumbnails-list thumbnails-container thumb-nav-left thumb-nav-right " + "loader counter tooltip",
            c = "current total";
        t.each(l.split(" "), function(t, e) {
            s._dom[e] = H.create("galleria-" + e)
        });
        t.each(c.split(" "), function(t, e) {
            s._dom[e] = H.create("galleria-" + e, "span")
        });
        var u = this._keyboard = {
            keys: {
                UP: 38,
                DOWN: 40,
                LEFT: 37,
                RIGHT: 39,
                RETURN: 13,
                ESCAPE: 27,
                BACKSPACE: 8,
                SPACE: 32
            },
            map: {},
            bound: false,
            press: function(t) {
                var e = t.keyCode || t.which;
                if (e in u.map && typeof u.map[e] === "function") {
                    u.map[e].call(s, t)
                }
            },
            attach: function(t) {
                var e, i;
                for (e in t) {
                    if (t.hasOwnProperty(e)) {
                        i = e.toUpperCase();
                        if (i in u.keys) {
                            u.map[u.keys[i]] = t[e]
                        } else {
                            u.map[i] = t[e]
                        }
                    }
                }
                if (!u.bound) {
                    u.bound = true;
                    o.on("keydown", u.press)
                }
            },
            detach: function() {
                u.bound = false;
                u.map = {};
                o.off("keydown", u.press)
            }
        };
        var h = this._controls = {
            0: n,
            1: n,
            active: 0,
            swap: function() {
                h.active = h.active ? 0 : 1
            },
            getActive: function() {
                return s._options.swipe ? h.slides[s._active] : h[h.active]
            },
            getNext: function() {
                return s._options.swipe ? h.slides[s.getNext(s._active)] : h[1 - h.active]
            },
            slides: [],
            frames: [],
            layers: []
        };
        var d = this._carousel = {
            next: s.$("thumb-nav-right"),
            prev: s.$("thumb-nav-left"),
            width: 0,
            current: 0,
            max: 0,
            hooks: [],
            update: function() {
                var e = 0,
                    i = 0,
                    n = [0];
                t.each(s._thumbnails, function(a, o) {
                    if (o.ready) {
                        e += o.outerWidth || t(o.container).outerWidth(true);
                        var r = t(o.container).width();
                        e += r - g.floor(r);
                        n[a + 1] = e;
                        i = g.max(i, o.outerHeight || t(o.container).outerHeight(true))
                    }
                });
                s.$("thumbnails").css({
                    width: e,
                    height: i
                });
                d.max = e;
                d.hooks = n;
                d.width = s.$("thumbnails-list").width();
                d.setClasses();
                s.$("thumbnails-container").toggleClass("galleria-carousel", e > d.width);
                d.width = s.$("thumbnails-list").width()
            },
            bindControls: function() {
                var t;
                d.next.on("click:fast", function(e) {
                    e.preventDefault();
                    if (s._options.carouselSteps === "auto") {
                        for (t = d.current; t < d.hooks.length; t++) {
                            if (d.hooks[t] - d.hooks[d.current] > d.width) {
                                d.set(t - 2);
                                break
                            }
                        }
                    } else {
                        d.set(d.current + s._options.carouselSteps)
                    }
                });
                d.prev.on("click:fast", function(e) {
                    e.preventDefault();
                    if (s._options.carouselSteps === "auto") {
                        for (t = d.current; t >= 0; t--) {
                            if (d.hooks[d.current] - d.hooks[t] > d.width) {
                                d.set(t + 2);
                                break
                            } else if (t === 0) {
                                d.set(0);
                                break
                            }
                        }
                    } else {
                        d.set(d.current - s._options.carouselSteps)
                    }
                })
            },
            set: function(t) {
                t = g.max(t, 0);
                while (d.hooks[t - 1] + d.width >= d.max && t >= 0) {
                    t--
                }
                d.current = t;
                d.animate()
            },
            getLast: function(t) {
                return (t || d.current) - 1
            },
            follow: function(t) {
                if (t === 0 || t === d.hooks.length - 2) {
                    d.set(t);
                    return
                }
                var e = d.current;
                while (d.hooks[e] - d.hooks[d.current] < d.width && e <= d.hooks.length) {
                    e++
                }
                if (t - 1 < d.current) {
                    d.set(t - 1)
                } else if (t + 2 > e) {
                    d.set(t - e + d.current + 2)
                }
            },
            setClasses: function() {
                d.prev.toggleClass("disabled", !d.current);
                d.next.toggleClass("disabled", d.hooks[d.current] + d.width >= d.max)
            },
            animate: function(e) {
                d.setClasses();
                var i = d.hooks[d.current] * -1;
                if (isNaN(i)) {
                    return
                }
                s.$("thumbnails").css("left", function() {
                    return t(this).css("left")
                });
                H.animate(s.get("thumbnails"), {
                    left: i
                }, {
                    duration: s._options.carouselSpeed,
                    easing: s._options.easing,
                    queue: false
                })
            }
        };
        var p = this._tooltip = {
            initialized: false,
            open: false,
            timer: "tooltip" + s._id,
            swapTimer: "swap" + s._id,
            init: function() {
                p.initialized = true;
                var t = ".galleria-tooltip{padding:3px 8px;max-width:50%;background:#ffe;color:#000;z-index:3;position:absolute;font-size:11px;line-height:1.3;" + "opacity:0;box-shadow:0 0 2px rgba(0,0,0,.4);-moz-box-shadow:0 0 2px rgba(0,0,0,.4);-webkit-box-shadow:0 0 2px rgba(0,0,0,.4);}";
                H.insertStyleTag(t, "galleria-tooltip");
                s.$("tooltip").css({
                    opacity: .8,
                    visibility: "visible",
                    display: "none"
                })
            },
            move: function(t) {
                var e = s.getMousePosition(t).x,
                    i = s.getMousePosition(t).y,
                    n = s.$("tooltip"),
                    a = e,
                    o = i,
                    r = n.outerHeight(true) + 1,
                    l = n.outerWidth(true),
                    c = r + 15;
                var u = s.$("container").width() - l - 2,
                    h = s.$("container").height() - r - 2;
                if (!isNaN(a) && !isNaN(o)) {
                    a += 10;
                    o -= r + 8;
                    a = g.max(0, g.min(u, a));
                    o = g.max(0, g.min(h, o));
                    if (i < c) {
                        o = c
                    }
                    n.css({
                        left: a,
                        top: o
                    })
                }
            },
            bind: function(e, n) {
                if (i.TOUCH) {
                    return
                }
                if (!p.initialized) {
                    p.init()
                }
                var a = function() {
                    s.$("container").off("mousemove", p.move);
                    s.clearTimer(p.timer);
                    s.$("tooltip").stop().animate({
                        opacity: 0
                    }, 200, function() {
                        s.$("tooltip").hide();
                        s.addTimer(p.swapTimer, function() {
                            p.open = false
                        }, 1e3)
                    })
                };
                var o = function(e, i) {
                    p.define(e, i);
                    t(e).hover(function() {
                        s.clearTimer(p.swapTimer);
                        s.$("container").off("mousemove", p.move).on("mousemove", p.move).trigger("mousemove");
                        p.show(e);
                        s.addTimer(p.timer, function() {
                            s.$("tooltip").stop().show().animate({
                                opacity: 1
                            });
                            p.open = true
                        }, p.open ? 0 : 500)
                    }, a).click(a)
                };
                if (typeof n === "string") {
                    o(e in s._dom ? s.get(e) : e, n)
                } else {
                    t.each(e, function(t, e) {
                        o(s.get(t), e)
                    })
                }
            },
            show: function(i) {
                i = t(i in s._dom ? s.get(i) : i);
                var n = i.data("tt"),
                    a = function(t) {
                        e.setTimeout(function(t) {
                            return function() {
                                p.move(t)
                            }
                        }(t), 10);
                        i.off("mouseup", a)
                    };
                n = typeof n === "function" ? n() : n;
                if (!n) {
                    return
                }
                s.$("tooltip").html(n.replace(/\s/, "&#160;"));
                i.on("mouseup", a)
            },
            define: function(e, i) {
                if (typeof i !== "function") {
                    var n = i;
                    i = function() {
                        return n
                    }
                }
                e = t(e in s._dom ? s.get(e) : e).data("tt", i);
                p.show(e)
            }
        };
        var m = this._fullscreen = {
            scrolled: 0,
            crop: n,
            active: false,
            prev: t(),
            beforeEnter: function(t) {
                t()
            },
            beforeExit: function(t) {
                t()
            },
            keymap: s._keyboard.map,
            parseCallback: function(e, i) {
                return M.active ? function() {
                    if (typeof e == "function") {
                        e.call(s)
                    }
                    var n = s._controls.getActive(),
                        a = s._controls.getNext();
                    s._scaleImage(a);
                    s._scaleImage(n);
                    if (i && s._options.trueFullscreen) {
                        t(n.container).add(a.container).trigger("transitionend")
                    }
                } : e
            },
            enter: function(t) {
                m.beforeEnter(function() {
                    t = m.parseCallback(t, true);
                    if (s._options.trueFullscreen && A.support) {
                        m.active = true;
                        H.forceStyles(s.get("container"), {
                            width: "100%",
                            height: "100%"
                        });
                        s.rescale();
                        if (i.MAC) {
                            if (!(i.SAFARI && /version\/[1-5]/.test(f))) {
                                s.$("container").css("opacity", 0).addClass("fullscreen");
                                e.setTimeout(function() {
                                    m.scale();
                                    s.$("container").css("opacity", 1)
                                }, 50)
                            } else {
                                s.$("stage").css("opacity", 0);
                                e.setTimeout(function() {
                                    m.scale();
                                    s.$("stage").css("opacity", 1)
                                }, 4)
                            }
                        } else {
                            s.$("container").addClass("fullscreen")
                        }
                        r.resize(m.scale);
                        A.enter(s, t, s.get("container"))
                    } else {
                        m.scrolled = r.scrollTop();
                        if (!i.TOUCH) {
                            e.scrollTo(0, 0)
                        }
                        m._enter(t)
                    }
                })
            },
            _enter: function(o) {
                m.active = true;
                if (b) {
                    m.iframe = function() {
                        var n, o = a.referrer,
                            r = a.createElement("a"),
                            s = e.location;
                        r.href = o;
                        if (r.protocol != s.protocol || r.hostname != s.hostname || r.port != s.port) {
                            i.raise("Parent fullscreen not available. Iframe protocol, domains and ports must match.");
                            return false
                        }
                        m.pd = e.parent.document;
                        t(m.pd).find("iframe").each(function() {
                            var t = this.contentDocument || this.contentWindow.document;
                            if (t === a) {
                                n = this;
                                return false
                            }
                        });
                        return n
                    }()
                }
                H.hide(s.getActiveImage());
                if (b && m.iframe) {
                    m.iframe.scrolled = t(e.parent).scrollTop();
                    e.parent.scrollTo(0, 0)
                }
                var l = s.getData(),
                    c = s._options,
                    u = !s._options.trueFullscreen || !A.support,
                    h = {
                        height: "100%",
                        overflow: "hidden",
                        margin: 0,
                        padding: 0
                    };
                if (u) {
                    s.$("container").addClass("fullscreen");
                    m.prev = s.$("container").prev();
                    if (!m.prev.length) {
                        m.parent = s.$("container").parent()
                    }
                    s.$("container").appendTo("body");
                    H.forceStyles(s.get("container"), {
                        position: i.TOUCH ? "absolute" : "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1e4
                    });
                    H.forceStyles(_().html, h);
                    H.forceStyles(_().body, h)
                }
                if (b && m.iframe) {
                    H.forceStyles(m.pd.documentElement, h);
                    H.forceStyles(m.pd.body, h);
                    H.forceStyles(m.iframe, t.extend(h, {
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        position: "fixed",
                        zIndex: 1e4,
                        border: "none"
                    }))
                }
                m.keymap = t.extend({}, s._keyboard.map);
                s.attachKeyboard({
                    escape: s.exitFullscreen,
                    right: s.next,
                    left: s.prev
                });
                m.crop = c.imageCrop;
                if (c.fullscreenCrop != n) {
                    c.imageCrop = c.fullscreenCrop
                }
                if (l && l.big && l.image !== l.big) {
                    var f = new i.Picture,
                        d = f.isCached(l.big),
                        p = s.getIndex(),
                        g = s._thumbnails[p];
                    s.trigger({
                        type: i.LOADSTART,
                        cached: d,
                        rewind: false,
                        index: p,
                        imageTarget: s.getActiveImage(),
                        thumbTarget: g,
                        galleriaData: l
                    });
                    f.load(l.big, function(e) {
                        s._scaleImage(e, {
                            complete: function(e) {
                                s.trigger({
                                    type: i.LOADFINISH,
                                    cached: d,
                                    index: p,
                                    rewind: false,
                                    imageTarget: e.image,
                                    thumbTarget: g
                                });
                                var n = s._controls.getActive().image;
                                if (n) {
                                    t(n).width(e.image.width).height(e.image.height).attr("style", t(e.image).attr("style")).attr("src", e.image.src)
                                }
                            }
                        })
                    });
                    var v = s.getNext(p),
                        y = new i.Picture,
                        w = s.getData(v);
                    y.preload(s.isFullscreen() && w.big ? w.big : w.image)
                }
                s.rescale(function() {
                    s.addTimer(false, function() {
                        if (u) {
                            H.show(s.getActiveImage())
                        }
                        if (typeof o === "function") {
                            o.call(s)
                        }
                        s.rescale()
                    }, 100);
                    s.trigger(i.FULLSCREEN_ENTER)
                });
                if (!u) {
                    H.show(s.getActiveImage())
                } else {
                    r.resize(m.scale)
                }
            },
            scale: function() {
                s.rescale()
            },
            exit: function(t) {
                m.beforeExit(function() {
                    t = m.parseCallback(t);
                    if (s._options.trueFullscreen && A.support) {
                        A.exit(t)
                    } else {
                        m._exit(t)
                    }
                })
            },
            _exit: function(t) {
                m.active = false;
                var n = !s._options.trueFullscreen || !A.support,
                    a = s.$("container").removeClass("fullscreen");
                if (m.parent) {
                    m.parent.prepend(a)
                } else {
                    a.insertAfter(m.prev)
                }
                if (n) {
                    H.hide(s.getActiveImage());
                    H.revertStyles(s.get("container"), _().html, _().body);
                    if (!i.TOUCH) {
                        e.scrollTo(0, m.scrolled)
                    }
                    var o = s._controls.frames[s._controls.active];
                    if (o && o.image) {
                        o.image.src = o.image.src
                    }
                }
                if (b && m.iframe) {
                    H.revertStyles(m.pd.documentElement, m.pd.body, m.iframe);
                    if (m.iframe.scrolled) {
                        e.parent.scrollTo(0, m.iframe.scrolled)
                    }
                }
                s.detachKeyboard();
                s.attachKeyboard(m.keymap);
                s._options.imageCrop = m.crop;
                var l = s.getData().big,
                    c = s._controls.getActive().image;
                if (!s.getData().iframe && c && l && l == c.src) {
                    e.setTimeout(function(t) {
                        return function() {
                            c.src = t
                        }
                    }(s.getData().image), 1)
                }
                s.rescale(function() {
                    s.addTimer(false, function() {
                        if (n) {
                            H.show(s.getActiveImage())
                        }
                        if (typeof t === "function") {
                            t.call(s)
                        }
                        r.trigger("resize")
                    }, 50);
                    s.trigger(i.FULLSCREEN_EXIT)
                });
                r.off("resize", m.scale)
            }
        };
        var v = this._idle = {
            trunk: [],
            bound: false,
            active: false,
            add: function(e, n, a, o) {
                if (!e || i.TOUCH) {
                    return
                }
                if (!v.bound) {
                    v.addEvent()
                }
                e = t(e);
                if (typeof a == "boolean") {
                    o = a;
                    a = {}
                }
                a = a || {};
                var r = {},
                    s;
                for (s in n) {
                    if (n.hasOwnProperty(s)) {
                        r[s] = e.css(s)
                    }
                }
                e.data("idle", {
                    from: t.extend(r, a),
                    to: n,
                    complete: true,
                    busy: false
                });
                if (!o) {
                    v.addTimer()
                } else {
                    e.css(n)
                }
                v.trunk.push(e)
            },
            remove: function(e) {
                e = t(e);
                t.each(v.trunk, function(t, i) {
                    if (i && i.length && !i.not(e).length) {
                        e.css(e.data("idle").from);
                        v.trunk.splice(t, 1)
                    }
                });
                if (!v.trunk.length) {
                    v.removeEvent();
                    s.clearTimer(v.timer)
                }
            },
            addEvent: function() {
                v.bound = true;
                s.$("container").on("mousemove click", v.showAll);
                if (s._options.idleMode == "hover") {
                    s.$("container").on("mouseleave", v.hide)
                }
            },
            removeEvent: function() {
                v.bound = false;
                s.$("container").on("mousemove click", v.showAll);
                if (s._options.idleMode == "hover") {
                    s.$("container").off("mouseleave", v.hide)
                }
            },
            addTimer: function() {
                if (s._options.idleMode == "hover") {
                    return
                }
                s.addTimer("idle", function() {
                    v.hide()
                }, s._options.idleTime)
            },
            hide: function() {
                if (!s._options.idleMode || s.getIndex() === false) {
                    return
                }
                s.trigger(i.IDLE_ENTER);
                var e = v.trunk.length;
                t.each(v.trunk, function(t, i) {
                    var n = i.data("idle");
                    if (!n) {
                        return
                    }
                    i.data("idle").complete = false;
                    H.animate(i, n.to, {
                        duration: s._options.idleSpeed,
                        complete: function() {
                            if (t == e - 1) {
                                v.active = false
                            }
                        }
                    })
                })
            },
            showAll: function() {
                s.clearTimer("idle");
                t.each(v.trunk, function(t, e) {
                    v.show(e)
                })
            },
            show: function(e) {
                var n = e.data("idle");
                if (!v.active || !n.busy && !n.complete) {
                    n.busy = true;
                    s.trigger(i.IDLE_EXIT);
                    s.clearTimer("idle");
                    H.animate(e, n.from, {
                        duration: s._options.idleSpeed / 2,
                        complete: function() {
                            v.active = true;
                            t(e).data("idle").busy = false;
                            t(e).data("idle").complete = true
                        }
                    })
                }
                v.addTimer()
            }
        };
        var w = this._lightbox = {
            width: 0,
            height: 0,
            initialized: false,
            active: null,
            image: null,
            elems: {},
            keymap: false,
            init: function() {
                if (w.initialized) {
                    return
                }
                w.initialized = true;
                var e = "overlay box content shadow title info close prevholder prev nextholder next counter image",
                    n = {},
                    a = s._options,
                    o = "",
                    r = "position:absolute;",
                    l = "lightbox-",
                    c = {
                        overlay: "position:fixed;display:none;opacity:" + a.overlayOpacity + ";filter:alpha(opacity=" + a.overlayOpacity * 100 + ");top:0;left:0;width:100%;height:100%;background:" + a.overlayBackground + ";z-index:99990",
                        box: "position:fixed;display:none;width:400px;height:400px;top:50%;left:50%;margin-top:-200px;margin-left:-200px;z-index:99991",
                        shadow: r + "background:#000;width:100%;height:100%;",
                        content: r + "background-color:#fff;top:10px;left:10px;right:10px;bottom:10px;overflow:hidden",
                        info: r + "bottom:10px;left:10px;right:10px;color:#444;font:11px/13px arial,sans-serif;height:13px",
                        close: r + "top:10px;right:10px;height:20px;width:20px;background:#fff;text-align:center;cursor:pointer;color:#444;font:16px/22px arial,sans-serif;z-index:99999",
                        image: r + "top:10px;left:10px;right:10px;bottom:30px;overflow:hidden;display:block;",
                        prevholder: r + "width:50%;top:0;bottom:40px;cursor:pointer;",
                        nextholder: r + "width:50%;top:0;bottom:40px;right:-1px;cursor:pointer;",
                        prev: r + "top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;left:20px;display:none;text-align:center;color:#000;font:bold 16px/36px arial,sans-serif",
                        next: r + "top:50%;margin-top:-20px;height:40px;width:30px;background:#fff;right:20px;left:auto;display:none;font:bold 16px/36px arial,sans-serif;text-align:center;color:#000",
                        title: "float:left",
                        counter: "float:right;margin-left:8px;"
                    },
                    u = function(e) {
                        return e.hover(function() {
                            t(this).css("color", "#bbb")
                        }, function() {
                            t(this).css("color", "#444")
                        })
                    },
                    h = {};
                var f = "";
                if (y > 7) {
                    f = y < 9 ? "background:#000;filter:alpha(opacity=0);" : "background:rgba(0,0,0,0);"
                } else {
                    f = "z-index:99999"
                }
                c.nextholder += f;
                c.prevholder += f;
                t.each(c, function(t, e) {
                    o += ".galleria-" + l + t + "{" + e + "}"
                });
                o += ".galleria-" + l + "box.iframe .galleria-" + l + "prevholder," + ".galleria-" + l + "box.iframe .galleria-" + l + "nextholder{" + "width:100px;height:100px;top:50%;margin-top:-70px}";
                H.insertStyleTag(o, "galleria-lightbox");
                t.each(e.split(" "), function(t, e) {
                    s.addElement("lightbox-" + e);
                    n[e] = w.elems[e] = s.get("lightbox-" + e)
                });
                w.image = new i.Picture;
                t.each({
                    box: "shadow content close prevholder nextholder",
                    info: "title counter",
                    content: "info image",
                    prevholder: "prev",
                    nextholder: "next"
                }, function(e, i) {
                    var n = [];
                    t.each(i.split(" "), function(t, e) {
                        n.push(l + e)
                    });
                    h[l + e] = n
                });
                s.append(h);
                t(n.image).append(w.image.container);
                t(_().body).append(n.overlay, n.box);
                u(t(n.close).on("click:fast", w.hide).html("&#215;"));
                t.each(["Prev", "Next"], function(e, a) {
                    var o = t(n[a.toLowerCase()]).html(/v/.test(a) ? "&#8249;&#160;" : "&#160;&#8250;"),
                        r = t(n[a.toLowerCase() + "holder"]);
                    r.on("click:fast", function() {
                        w["show" + a]()
                    });
                    if (y < 8 || i.TOUCH) {
                        o.show();
                        return
                    }
                    r.hover(function() {
                        o.show()
                    }, function(t) {
                        o.stop().fadeOut(200)
                    })
                });
                t(n.overlay).on("click:fast", w.hide);
                if (i.IPAD) {
                    s._options.lightboxTransitionSpeed = 0
                }
            },
            rescale: function(e) {
                var n = g.min(r.width() - 40, w.width),
                    a = g.min(r.height() - 60, w.height),
                    o = g.min(n / w.width, a / w.height),
                    l = g.round(w.width * o) + 40,
                    c = g.round(w.height * o) + 60,
                    u = {
                        width: l,
                        height: c,
                        "margin-top": g.ceil(c / 2) * -1,
                        "margin-left": g.ceil(l / 2) * -1
                    };
                if (e) {
                    t(w.elems.box).css(u)
                } else {
                    t(w.elems.box).animate(u, {
                        duration: s._options.lightboxTransitionSpeed,
                        easing: s._options.easing,
                        complete: function() {
                            var e = w.image,
                                n = s._options.lightboxFadeSpeed;
                            s.trigger({
                                type: i.LIGHTBOX_IMAGE,
                                imageTarget: e.image
                            });
                            t(e.container).show();
                            t(e.image).animate({
                                opacity: 1
                            }, n);
                            H.show(w.elems.info, n)
                        }
                    })
                }
            },
            hide: function() {
                w.image.image = null;
                r.off("resize", w.rescale);
                t(w.elems.box).hide().find("iframe").remove();
                H.hide(w.elems.info);
                s.detachKeyboard();
                s.attachKeyboard(w.keymap);
                w.keymap = false;
                H.hide(w.elems.overlay, 200, function() {
                    t(this).hide().css("opacity", s._options.overlayOpacity);
                    s.trigger(i.LIGHTBOX_CLOSE)
                })
            },
            showNext: function() {
                w.show(s.getNext(w.active))
            },
            showPrev: function() {
                w.show(s.getPrev(w.active))
            },
            show: function(n) {
                w.active = n = typeof n === "number" ? n : s.getIndex() || 0;
                if (!w.initialized) {
                    w.init()
                }
                s.trigger(i.LIGHTBOX_OPEN);
                if (!w.keymap) {
                    w.keymap = t.extend({}, s._keyboard.map);
                    s.attachKeyboard({
                        escape: w.hide,
                        right: w.showNext,
                        left: w.showPrev
                    })
                }
                r.off("resize", w.rescale);
                var a = s.getData(n),
                    o = s.getDataLength(),
                    l = s.getNext(n),
                    c, u, h;
                H.hide(w.elems.info);
                try {
                    for (h = s._options.preload; h > 0; h--) {
                        u = new i.Picture;
                        c = s.getData(l);
                        u.preload(c.big ? c.big : c.image);
                        l = s.getNext(l)
                    }
                } catch (f) {}
                w.image.isIframe = a.iframe && !a.image;
                t(w.elems.box).toggleClass("iframe", w.image.isIframe);
                t(w.image.container).find(".galleria-videoicon").remove();
                w.image.load(a.big || a.image || a.iframe, function(i) {
                    if (i.isIframe) {
                        var l = t(e).width(),
                            c = t(e).height();
                        if (i.video && s._options.maxVideoSize) {
                            var u = g.min(s._options.maxVideoSize / l, s._options.maxVideoSize / c);
                            if (u < 1) {
                                l *= u;
                                c *= u
                            }
                        }
                        w.width = l;
                        w.height = c
                    } else {
                        w.width = i.original.width;
                        w.height = i.original.height
                    }
                    t(i.image).css({
                        width: i.isIframe ? "100%" : "100.1%",
                        height: i.isIframe ? "100%" : "100.1%",
                        top: 0,
                        bottom: 0,
                        zIndex: 99998,
                        opacity: 0,
                        visibility: "visible"
                    }).parent().height("100%");
                    w.elems.title.innerHTML = a.title || "";
                    w.elems.counter.innerHTML = n + 1 + " / " + o;
                    r.resize(w.rescale);
                    w.rescale();
                    if (a.image && a.iframe) {
                        t(w.elems.box).addClass("iframe");
                        if (a.video) {
                            var h = O(i.container).hide();
                            e.setTimeout(function() {
                                h.fadeIn(200)
                            }, 200)
                        }
                        t(i.image).css("cursor", "pointer").mouseup(function(e, i) {
                            return function(n) {
                                t(w.image.container).find(".galleria-videoicon").remove();
                                n.preventDefault();
                                i.isIframe = true;
                                i.load(e.iframe + (e.video ? "&autoplay=1" : ""), {
                                    width: "100%",
                                    height: y < 8 ? t(w.image.container).height() : "100%"
                                })
                            }
                        }(a, i))
                    }
                });
                t(w.elems.overlay).show().css("visibility", "visible");
                t(w.elems.box).show()
            }
        };
        var x = this._timer = {
            trunk: {},
            add: function(t, i, n, a) {
                t = t || (new Date).getTime();
                a = a || false;
                this.clear(t);
                if (a) {
                    var o = i;
                    i = function() {
                        o();
                        x.add(t, i, n)
                    }
                }
                this.trunk[t] = e.setTimeout(i, n)
            },
            clear: function(t) {
                var i = function(t) {
                        e.clearTimeout(this.trunk[t]);
                        delete this.trunk[t]
                    },
                    n;
                if (!!t && t in this.trunk) {
                    i.call(this, t)
                } else if (typeof t === "undefined") {
                    for (n in this.trunk) {
                        if (this.trunk.hasOwnProperty(n)) {
                            i.call(this, n)
                        }
                    }
                }
            }
        };
        return this
    };
    i.prototype = {
        constructor: i,
        init: function(e, a) {
            a = T(a);
            this._original = {
                target: e,
                options: a,
                data: null
            };
            this._target = this._dom.target = e.nodeName ? e : t(e).get(0);
            this._original.html = this._target.innerHTML;
            D.push(this);
            if (!this._target) {
                i.raise("Target not found", true);
                return
            }
            this._options = {
                autoplay: false,
                carousel: true,
                carouselFollow: true,
                carouselSpeed: 400,
                carouselSteps: "auto",
                clicknext: false,
                dailymotion: {
                    foreground: "%23EEEEEE",
                    highlight: "%235BCEC5",
                    background: "%23222222",
                    logo: 0,
                    hideInfos: 1
                },
                dataConfig: function(t) {
                    return {}
                },
                dataSelector: "img",
                dataSort: false,
                dataSource: this._target,
                debug: n,
                dummy: n,
                easing: "galleria",
                extend: function(t) {},
                fullscreenCrop: n,
                fullscreenDoubleTap: true,
                fullscreenTransition: n,
                height: 0,
                idleMode: true,
                idleTime: 3e3,
                idleSpeed: 200,
                imageCrop: false,
                imageMargin: 0,
                imagePan: false,
                imagePanSmoothness: 12,
                imagePosition: "50%",
                imageTimeout: n,
                initialTransition: n,
                keepSource: false,
                layerFollow: true,
                lightbox: false,
                lightboxFadeSpeed: 200,
                lightboxTransitionSpeed: 200,
                linkSourceImages: true,
                maxScaleRatio: n,
                maxVideoSize: n,
                minScaleRatio: n,
                overlayOpacity: .85,
                overlayBackground: "#0b0b0b",
                pauseOnInteraction: true,
                popupLinks: false,
                preload: 2,
                queue: true,
                responsive: true,
                show: 0,
                showInfo: true,
                showCounter: true,
                showImagenav: true,
                swipe: "auto",
                theme: null,
                thumbCrop: true,
                thumbEventType: "click:fast",
                thumbMargin: 0,
                thumbQuality: "auto",
                thumbDisplayOrder: true,
                thumbPosition: "50%",
                thumbnails: true,
                touchTransition: n,
                transition: "fade",
                transitionInitial: n,
                transitionSpeed: 400,
                trueFullscreen: true,
                useCanvas: false,
                variation: "",
                videoPoster: true,
                vimeo: {
                    title: 0,
                    byline: 0,
                    portrait: 0,
                    color: "aaaaaa"
                },
                wait: 5e3,
                width: "auto",
                youtube: {
                    modestbranding: 1,
                    autohide: 1,
                    color: "white",
                    hd: 1,
                    rel: 0,
                    showinfo: 0
                }
            };
            this._options.initialTransition = this._options.initialTransition || this._options.transitionInitial;
            if (a) {
                if (a.debug === false) {
                    c = false
                }
                if (typeof a.imageTimeout === "number") {
                    u = a.imageTimeout
                }
                if (typeof a.dummy === "string") {
                    h = a.dummy
                }
                if (typeof a.theme == "string") {
                    this._options.theme = a.theme
                }
            }
            t(this._target).children().hide();
            if (i.QUIRK) {
                i.raise("Your page is in Quirks mode, Galleria may not render correctly. Please validate your HTML and add a correct doctype.")
            }
            if (z.length) {
                if (this._options.theme) {
                    for (var o = 0; o < z.length; o++) {
                        if (this._options.theme === z[o].name) {
                            this.theme = z[o];
                            break
                        }
                    }
                } else {
                    this.theme = z[0]
                }
            }
            if (typeof this.theme == "object") {
                this._init()
            } else {
                P.push(this)
            }
            return this
        },
        _init: function() {
            var o = this,
                s = this._options;
            if (this._initialized) {
                i.raise("Init failed: Gallery instance already initialized.");
                return this
            }
            this._initialized = true;
            if (!this.theme) {
                i.raise("Init failed: No theme found.", true);
                return this
            }
            t.extend(true, s, this.theme.defaults, this._original.options, i.configure.options);
            s.swipe = function(t) {
                if (t == "enforced") {
                    return true
                }
                if (t === false || t == "disabled") {
                    return false
                }
                return !!i.TOUCH
            }(s.swipe);
            if (s.swipe) {
                s.clicknext = false;
                s.imagePan = false
            }! function(t) {
                if (!("getContext" in t)) {
                    t = null;
                    return
                }
                L = L || {
                    elem: t,
                    context: t.getContext("2d"),
                    cache: {},
                    length: 0
                }
            }(a.createElement("canvas"));
            this.bind(i.DATA, function() {
                if (e.screen && e.screen.width && Array.prototype.forEach) {
                    this._data.forEach(function(t) {
                        var i = "devicePixelRatio" in e ? e.devicePixelRatio : 1,
                            n = g.max(e.screen.width, e.screen.height);
                        if (n * i < 1024) {
                            t.big = t.image
                        }
                    })
                }
                this._original.data = this._data;
                this.get("total").innerHTML = this.getDataLength();
                var t = this.$("container");
                if (o._options.height < 2) {
                    o._userRatio = o._ratio = o._options.height
                }
                var n = {
                    width: 0,
                    height: 0
                };
                var a = function() {
                    return o.$("stage").height()
                };
                H.wait({
                    until: function() {
                        n = o._getWH();
                        t.width(n.width).height(n.height);
                        return a() && n.width && n.height > 50
                    },
                    success: function() {
                        o._width = n.width;
                        o._height = n.height;
                        o._ratio = o._ratio || n.height / n.width;
                        if (i.WEBKIT) {
                            e.setTimeout(function() {
                                o._run()
                            }, 1)
                        } else {
                            o._run()
                        }
                    },
                    error: function() {
                        if (a()) {
                            i.raise("Could not extract sufficient width/height of the gallery container. Traced measures: width:" + n.width + "px, height: " + n.height + "px.", true)
                        } else {
                            i.raise("Could not extract a stage height from the CSS. Traced height: " + a() + "px.", true)
                        }
                    },
                    timeout: typeof this._options.wait == "number" ? this._options.wait : false
                })
            });
            this.append({
                "info-text": ["info-title", "info-description"],
                info: ["info-text"],
                "image-nav": ["image-nav-right", "image-nav-left"],
                stage: ["images", "loader", "counter", "image-nav"],
                "thumbnails-list": ["thumbnails"],
                "thumbnails-container": ["thumb-nav-left", "thumbnails-list", "thumb-nav-right"],
                container: ["stage", "thumbnails-container", "info", "tooltip"]
            });
            H.hide(this.$("counter").append(this.get("current"), a.createTextNode(" / "), this.get("total")));
            this.setCounter("&#8211;");
            H.hide(o.get("tooltip"));
            this.$("container").addClass([i.TOUCH ? "touch" : "notouch", this._options.variation, "galleria-theme-" + this.theme.name].join(" "));
            if (!this._options.swipe) {
                t.each(new Array(2), function(e) {
                    var n = new i.Picture;
                    t(n.container).css({
                        position: "absolute",
                        top: 0,
                        left: 0
                    }).prepend(o._layers[e] = t(H.create("galleria-layer")).css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 2
                    })[0]);
                    o.$("images").append(n.container);
                    o._controls[e] = n;
                    var a = new i.Picture;
                    a.isIframe = true;
                    t(a.container).attr("class", "galleria-frame").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 4,
                        background: "#000",
                        display: "none"
                    }).appendTo(n.container);
                    o._controls.frames[e] = a
                })
            }
            this.$("images").css({
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            });
            if (s.swipe) {
                this.$("images").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 0,
                    height: "100%"
                });
                this.finger = new i.Finger(this.get("stage"), {
                    onchange: function(t) {
                        o.pause().show(t)
                    },
                    oncomplete: function(e) {
                        var i = g.max(0, g.min(parseInt(e, 10), o.getDataLength() - 1)),
                            n = o.getData(i);
                        t(o._thumbnails[i].container).addClass("active").siblings(".active").removeClass("active");
                        if (!n) {
                            return
                        }
                        o.$("images").find(".galleria-frame").css("opacity", 0).hide().find("iframe").remove();
                        if (o._options.carousel && o._options.carouselFollow) {
                            o._carousel.follow(i)
                        }
                    }
                });
                this.bind(i.RESCALE, function() {
                    this.finger.setup()
                });
                this.$("stage").on("click", function(i) {
                    var a = o.getData();
                    if (!a) {
                        return
                    }
                    if (a.iframe) {
                        if (o.isPlaying()) {
                            o.pause()
                        }
                        var r = o._controls.frames[o._active],
                            s = o._stageWidth,
                            l = o._stageHeight;
                        if (t(r.container).find("iframe").length) {
                            return
                        }
                        t(r.container).css({
                            width: s,
                            height: l,
                            opacity: 0
                        }).show().animate({
                            opacity: 1
                        }, 200);
                        e.setTimeout(function() {
                            r.load(a.iframe + (a.video ? "&autoplay=1" : ""), {
                                width: s,
                                height: l
                            }, function(t) {
                                o.$("container").addClass("videoplay");
                                t.scale({
                                    width: o._stageWidth,
                                    height: o._stageHeight,
                                    iframelimit: a.video ? o._options.maxVideoSize : n
                                })
                            })
                        }, 100);
                        return
                    }
                    if (a.link) {
                        if (o._options.popupLinks) {
                            var c = e.open(a.link, "_blank")
                        } else {
                            e.location.href = a.link
                        }
                        return
                    }
                });
                this.bind(i.IMAGE, function(e) {
                    o.setCounter(e.index);
                    o.setInfo(e.index);
                    var i = this.getNext(),
                        n = this.getPrev();
                    var a = [n, i];
                    a.push(this.getNext(i), this.getPrev(n), o._controls.slides.length - 1);
                    var r = [];
                    t.each(a, function(e, i) {
                        if (t.inArray(i, r) == -1) {
                            r.push(i)
                        }
                    });
                    t.each(r, function(e, i) {
                        var n = o.getData(i),
                            a = o._controls.slides[i],
                            r = o.isFullscreen() && n.big ? n.big : n.image || n.iframe;
                        if (n.iframe && !n.image) {
                            a.isIframe = true
                        }
                        if (!a.ready) {
                            o._controls.slides[i].load(r, function(e) {
                                if (!e.isIframe) {
                                    t(e.image).css("visibility", "hidden")
                                }
                                o._scaleImage(e, {
                                    complete: function(e) {
                                        if (!e.isIframe) {
                                            t(e.image).css({
                                                opacity: 0,
                                                visibility: "visible"
                                            }).animate({
                                                opacity: 1
                                            }, 200)
                                        }
                                    }
                                })
                            })
                        }
                    })
                })
            }
            this.$("thumbnails, thumbnails-list").css({
                overflow: "hidden",
                position: "relative"
            });
            this.$("image-nav-right, image-nav-left").on("click:fast", function(t) {
                if (s.pauseOnInteraction) {
                    o.pause()
                }
                var e = /right/.test(this.className) ? "next" : "prev";
                o[e]()
            }).on("click", function(t) {
                t.preventDefault();
                if (s.clicknext || s.swipe) {
                    t.stopPropagation()
                }
            });
            t.each(["info", "counter", "image-nav"], function(t, e) {
                if (s["show" + e.substr(0, 1).toUpperCase() + e.substr(1).replace(/-/, "")] === false) {
                    H.moveOut(o.get(e.toLowerCase()))
                }
            });
            this.load();
            if (!s.keepSource && !y) {
                this._target.innerHTML = ""
            }
            if (this.get("errors")) {
                this.appendChild("target", "errors")
            }
            this.appendChild("target", "container");
            if (s.carousel) {
                var l = 0,
                    c = s.show;
                this.bind(i.THUMBNAIL, function() {
                    this.updateCarousel();
                    if (++l == this.getDataLength() && typeof c == "number" && c > 0) {
                        this._carousel.follow(c)
                    }
                })
            }
            if (s.responsive) {
                r.on("resize", function() {
                    if (!o.isFullscreen()) {
                        o.resize()
                    }
                })
            }
            if (s.fullscreenDoubleTap) {
                this.$("stage").on("touchstart", function() {
                    var t, e, i, n, a, r, s = function(t) {
                        return t.originalEvent.touches ? t.originalEvent.touches[0] : t
                    };
                    o.$("stage").on("touchmove", function() {
                        t = 0
                    });
                    return function(l) {
                        if (/(-left|-right)/.test(l.target.className)) {
                            return
                        }
                        r = H.timestamp();
                        e = s(l).pageX;
                        i = s(l).pageY;
                        if (l.originalEvent.touches.length < 2 && r - t < 300 && e - n < 20 && i - a < 20) {
                            o.toggleFullscreen();
                            l.preventDefault();
                            return
                        }
                        t = r;
                        n = e;
                        a = i
                    }
                }())
            }
            t.each(i.on.binds, function(e, i) {
                if (t.inArray(i.hash, o._binds) == -1) {
                    o.bind(i.type, i.callback)
                }
            });
            return this
        },
        addTimer: function() {
            this._timer.add.apply(this._timer, H.array(arguments));
            return this
        },
        clearTimer: function() {
            this._timer.clear.apply(this._timer, H.array(arguments));
            return this
        },
        _getWH: function() {
            var e = this.$("container"),
                i = this.$("target"),
                n = this,
                a = {},
                o;
            t.each(["width", "height"], function(t, r) {
                if (n._options[r] && typeof n._options[r] === "number") {
                    a[r] = n._options[r]
                } else {
                    o = [H.parseValue(e.css(r)), H.parseValue(i.css(r)), e[r](), i[r]()];
                    if (!n["_" + r]) {
                        o.splice(o.length, H.parseValue(e.css("min-" + r)), H.parseValue(i.css("min-" + r)))
                    }
                    a[r] = g.max.apply(g, o)
                }
            });
            if (n._userRatio) {
                a.height = a.width * n._userRatio
            }
            return a
        },
        _createThumbnails: function(n) {
            this.get("total").innerHTML = this.getDataLength();
            var o, r, s, l, c = this,
                u = this._options,
                h = n ? this._data.length - n.length : 0,
                f = h,
                d = [],
                p = 0,
                g = y < 8 ? "http://upload.wikimedia.org/wikipedia/commons/c/c0/Blank.gif" : "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw%3D%3D",
                m = function() {
                    var t = c.$("thumbnails").find(".active");
                    if (!t.length) {
                        return false
                    }
                    return t.find("img").attr("src")
                }(),
                v = typeof u.thumbnails === "string" ? u.thumbnails.toLowerCase() : null,
                _ = function(t) {
                    return a.defaultView && a.defaultView.getComputedStyle ? a.defaultView.getComputedStyle(r.container, null)[t] : l.css(t)
                },
                b = function(e, n, a) {
                    return function() {
                        t(a).append(e);
                        c.trigger({
                            type: i.THUMBNAIL,
                            thumbTarget: e,
                            index: n,
                            galleriaData: c.getData(n)
                        })
                    }
                },
                w = function(e) {
                    if (u.pauseOnInteraction) {
                        c.pause()
                    }
                    var i = t(e.currentTarget).data("index");
                    if (c.getIndex() !== i) {
                        c.show(i)
                    }
                    e.preventDefault()
                },
                x = function(e, n) {
                    t(e.container).css("visibility", "visible");
                    c.trigger({
                        type: i.THUMBNAIL,
                        thumbTarget: e.image,
                        index: e.data.order,
                        galleriaData: c.getData(e.data.order)
                    });
                    if (typeof n == "function") {
                        n.call(c, e)
                    }
                },
                T = function(e, i) {
                    e.scale({
                        width: e.data.width,
                        height: e.data.height,
                        crop: u.thumbCrop,
                        margin: u.thumbMargin,
                        canvas: u.useCanvas,
                        position: u.thumbPosition,
                        complete: function(e) {
                            var n = ["left", "top"],
                                a = ["Width", "Height"],
                                o, r, s = c.getData(e.index);
                            t.each(a, function(i, a) {
                                o = a.toLowerCase();
                                if (u.thumbCrop !== true || u.thumbCrop === o) {
                                    r = {};
                                    r[o] = e[o];
                                    t(e.container).css(r);
                                    r = {};
                                    r[n[i]] = 0;
                                    t(e.image).css(r)
                                }
                                e["outer" + a] = t(e.container)["outer" + a](true)
                            });
                            H.toggleQuality(e.image, u.thumbQuality === true || u.thumbQuality === "auto" && e.original.width < e.width * 3);
                            if (u.thumbDisplayOrder && !e.lazy) {
                                t.each(d, function(t, e) {
                                    if (t === p && e.ready && !e.displayed) {
                                        p++;
                                        e.displayed = true;
                                        x(e, i);
                                        return
                                    }
                                })
                            } else {
                                x(e, i)
                            }
                        }
                    })
                };
            if (!n) {
                this._thumbnails = [];
                this.$("thumbnails").empty()
            }
            for (; this._data[h]; h++) {
                s = this._data[h];
                o = s.thumb || s.image;
                if ((u.thumbnails === true || v == "lazy") && (s.thumb || s.image)) {
                    r = new i.Picture(h);
                    r.index = h;
                    r.displayed = false;
                    r.lazy = false;
                    r.video = false;
                    this.$("thumbnails").append(r.container);
                    l = t(r.container);
                    l.css("visibility", "hidden");
                    r.data = {
                        width: H.parseValue(_("width")),
                        height: H.parseValue(_("height")),
                        order: h,
                        src: o
                    };
                    if (u.thumbCrop !== true) {
                        l.css({
                            width: "auto",
                            height: "auto"
                        })
                    } else {
                        l.css({
                            width: r.data.width,
                            height: r.data.height
                        })
                    }
                    if (v == "lazy") {
                        l.addClass("lazy");
                        r.lazy = true;
                        r.load(g, {
                            height: r.data.height,
                            width: r.data.width
                        })
                    } else {
                        r.load(o, T)
                    }
                    if (u.preload === "all") {
                        r.preload(s.image)
                    }
                } else if (s.iframe && v !== null || v === "empty" || v === "numbers") {
                    r = {
                        container: H.create("galleria-image"),
                        image: H.create("img", "span"),
                        ready: true,
                        data: {
                            order: h
                        }
                    };
                    if (v === "numbers") {
                        t(r.image).text(h + 1)
                    }
                    if (s.iframe) {
                        t(r.image).addClass("iframe")
                    }
                    this.$("thumbnails").append(r.container);
                    e.setTimeout(b(r.image, h, r.container), 50 + h * 20)
                } else {
                    r = {
                        container: null,
                        image: null
                    }
                }
                t(r.container).add(u.keepSource && u.linkSourceImages ? s.original : null).data("index", h).on(u.thumbEventType, w).data("thumbload", T);
                if (m === o) {
                    t(r.container).addClass("active")
                }
                this._thumbnails.push(r)
            }
            d = this._thumbnails.slice(f);
            return this
        },
        lazyLoad: function(e, i) {
            var n = e.constructor == Array ? e : [e],
                a = this,
                o = 0;
            t.each(n, function(e, r) {
                if (r > a._thumbnails.length - 1) {
                    return
                }
                var s = a._thumbnails[r],
                    l = s.data,
                    c = function() {
                        if (++o == n.length && typeof i == "function") {
                            i.call(a)
                        }
                    },
                    u = t(s.container).data("thumbload");
                if (s.video) {
                    u.call(a, s, c)
                } else {
                    s.load(l.src, function(t) {
                        u.call(a, t, c)
                    })
                }
            });
            return this
        },
        lazyLoadChunks: function(t, i) {
            var n = this.getDataLength(),
                a = 0,
                o = 0,
                r = [],
                s = [],
                l = this;
            i = i || 0;
            for (; a < n; a++) {
                s.push(a);
                if (++o == t || a == n - 1) {
                    r.push(s);
                    o = 0;
                    s = []
                }
            }
            var c = function(t) {
                var n = r.shift();
                if (n) {
                    e.setTimeout(function() {
                        l.lazyLoad(n, function() {
                            c(true)
                        })
                    }, i && t ? i : 0)
                }
            };
            c(false);
            return this
        },
        _run: function() {
            var a = this;
            a._createThumbnails();
            H.wait({
                timeout: 1e4,
                until: function() {
                    if (i.OPERA) {
                        a.$("stage").css("display", "inline-block")
                    }
                    a._stageWidth = a.$("stage").width();
                    a._stageHeight = a.$("stage").height();
                    return a._stageWidth && a._stageHeight > 50
                },
                success: function() {
                    E.push(a);
                    if (a._options.swipe) {
                        var o = a.$("images").width(a.getDataLength() * a._stageWidth);
                        t.each(new Array(a.getDataLength()), function(e) {
                            var n = new i.Picture,
                                r = a.getData(e);
                            t(n.container).css({
                                position: "absolute",
                                top: 0,
                                left: a._stageWidth * e
                            }).prepend(a._layers[e] = t(H.create("galleria-layer")).css({
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 2
                            })[0]).appendTo(o);
                            if (r.video) {
                                O(n.container)
                            }
                            a._controls.slides.push(n);
                            var s = new i.Picture;
                            s.isIframe = true;
                            t(s.container).attr("class", "galleria-frame").css({
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 4,
                                background: "#000",
                                display: "none"
                            }).appendTo(n.container);
                            a._controls.frames.push(s)
                        });
                        a.finger.setup()
                    }
                    H.show(a.get("counter"));
                    if (a._options.carousel) {
                        a._carousel.bindControls()
                    }
                    if (a._options.autoplay) {
                        a.pause();
                        if (typeof a._options.autoplay === "number") {
                            a._playtime = a._options.autoplay
                        }
                        a._playing = true
                    }
                    if (a._firstrun) {
                        if (a._options.autoplay) {
                            a.trigger(i.PLAY)
                        }
                        if (typeof a._options.show === "number") {
                            a.show(a._options.show)
                        }
                        return
                    }
                    a._firstrun = true;
                    if (i.History) {
                        i.History.change(function(t) {
                            if (isNaN(t)) {
                                e.history.go(-1)
                            } else {
                                a.show(t, n, true)
                            }
                        })
                    }
                    a.trigger(i.READY);
                    a.theme.init.call(a, a._options);
                    t.each(i.ready.callbacks, function(t, e) {
                        if (typeof e == "function") {
                            e.call(a, a._options)
                        }
                    });
                    a._options.extend.call(a, a._options);
                    if (/^[0-9]{1,4}$/.test(d) && i.History) {
                        a.show(d, n, true)
                    } else if (a._data[a._options.show]) {
                        a.show(a._options.show)
                    }
                    if (a._options.autoplay) {
                        a.trigger(i.PLAY)
                    }
                },
                error: function() {
                    i.raise("Stage width or height is too small to show the gallery. Traced measures: width:" + a._stageWidth + "px, height: " + a._stageHeight + "px.", true)
                }
            })
        },
        load: function(e, n, a) {
            var o = this,
                r = this._options;
            this._data = [];
            this._thumbnails = [];
            this.$("thumbnails").empty();
            if (typeof n === "function") {
                a = n;
                n = null
            }
            e = e || r.dataSource;
            n = n || r.dataSelector;
            a = a || r.dataConfig;
            if (t.isPlainObject(e)) {
                e = [e]
            }
            if (t.isArray(e)) {
                if (this.validate(e)) {
                    this._data = e
                } else {
                    i.raise("Load failed: JSON Array not valid.")
                }
            } else {
                n += ",.video,.iframe";
                t(e).find(n).each(function(e, i) {
                    i = t(i);
                    var n = {},
                        r = i.parent(),
                        s = r.attr("href"),
                        l = r.attr("rel");
                    if (s && (i[0].nodeName == "IMG" || i.hasClass("video")) && S(s)) {
                        n.video = s
                    } else if (s && i.hasClass("iframe")) {
                        n.iframe = s
                    } else {
                        n.image = n.big = s
                    }
                    if (l) {
                        n.big = l
                    }
                    t.each("big title description link layer image".split(" "), function(t, e) {
                        if (i.data(e)) {
                            n[e] = i.data(e).toString()
                        }
                    });
                    if (!n.big) {
                        n.big = n.image
                    }
                    o._data.push(t.extend({
                        title: i.attr("title") || "",
                        thumb: i.attr("src"),
                        image: i.attr("src"),
                        big: i.attr("src"),
                        description: i.attr("alt") || "",
                        link: i.attr("longdesc"),
                        original: i.get(0)
                    }, n, a(i)))
                })
            }
            if (typeof r.dataSort == "function") {
                s.sort.call(this._data, r.dataSort)
            } else if (r.dataSort == "random") {
                this._data.sort(function() {
                    return g.round(g.random()) - .5
                })
            }
            if (this.getDataLength()) {
                this._parseData(function() {
                    this.trigger(i.DATA)
                })
            }
            return this
        },
        _parseData: function(e) {
            var i = this,
                a, o = false,
                r = function() {
                    var n = true;
                    t.each(i._data, function(t, e) {
                        if (e.loading) {
                            n = false;
                            return false
                        }
                    });
                    if (n && !o) {
                        o = true;
                        e.call(i)
                    }
                };
            t.each(this._data, function(e, o) {
                a = i._data[e];
                if ("thumb" in o === false) {
                    a.thumb = o.image
                }
                if (!o.big) {
                    a.big = o.image
                }
                if ("video" in o) {
                    var s = S(o.video);
                    if (s) {
                        a.iframe = new I(s.provider, s.id).embed() + function() {
                            if (typeof i._options[s.provider] == "object") {
                                var e = "?",
                                    n = [];
                                t.each(i._options[s.provider], function(t, e) {
                                    n.push(t + "=" + e)
                                });
                                if (s.provider == "youtube") {
                                    n = ["wmode=opaque"].concat(n)
                                }
                                return e + n.join("&")
                            }
                            return ""
                        }();
                        if (!a.thumb || !a.image) {
                            t.each(["thumb", "image"], function(t, e) {
                                if (e == "image" && !i._options.videoPoster) {
                                    a.image = n;
                                    return
                                }
                                var o = new I(s.provider, s.id);
                                if (!a[e]) {
                                    a.loading = true;
                                    o.getMedia(e, function(t, e) {
                                        return function(i) {
                                            t[e] = i;
                                            if (e == "image" && !t.big) {
                                                t.big = t.image
                                            }
                                            delete t.loading;
                                            r()
                                        }
                                    }(a, e))
                                }
                            })
                        }
                    }
                }
            });
            r();
            return this
        },
        destroy: function() {
            this.$("target").data("galleria", null);
            this.$("container").off("galleria");
            this.get("target").innerHTML = this._original.html;
            this.clearTimer();
            H.removeFromArray(D, this);
            H.removeFromArray(E, this);
            if (i._waiters.length) {
                t.each(i._waiters, function(t, i) {
                    if (i) e.clearTimeout(i)
                })
            }
            return this
        },
        splice: function() {
            var t = this,
                i = H.array(arguments);
            e.setTimeout(function() {
                s.splice.apply(t._data, i);
                t._parseData(function() {
                    t._createThumbnails()
                })
            }, 2);
            return t
        },
        push: function() {
            var t = this,
                i = H.array(arguments);
            if (i.length == 1 && i[0].constructor == Array) {
                i = i[0]
            }
            e.setTimeout(function() {
                s.push.apply(t._data, i);
                t._parseData(function() {
                    t._createThumbnails(i)
                })
            }, 2);
            return t
        },
        _getActive: function() {
            return this._controls.getActive()
        },
        validate: function(t) {
            return true
        },
        bind: function(t, e) {
            t = k(t);
            this.$("container").on(t, this.proxy(e));
            return this
        },
        unbind: function(t) {
            t = k(t);
            this.$("container").off(t);
            return this
        },
        trigger: function(e) {
            e = typeof e === "object" ? t.extend(e, {
                scope: this
            }) : {
                type: k(e),
                scope: this
            };
            this.$("container").trigger(e);
            return this
        },
        addIdleState: function(t, e, i, n) {
            this._idle.add.apply(this._idle, H.array(arguments));
            return this
        },
        removeIdleState: function(t) {
            this._idle.remove.apply(this._idle, H.array(arguments));
            return this
        },
        enterIdleMode: function() {
            this._idle.hide();
            return this
        },
        exitIdleMode: function() {
            this._idle.showAll();
            return this
        },
        enterFullscreen: function(t) {
            this._fullscreen.enter.apply(this, H.array(arguments));
            return this
        },
        exitFullscreen: function(t) {
            this._fullscreen.exit.apply(this, H.array(arguments));
            return this
        },
        toggleFullscreen: function(t) {
            this._fullscreen[this.isFullscreen() ? "exit" : "enter"].apply(this, H.array(arguments));
            return this
        },
        bindTooltip: function(t, e) {
            this._tooltip.bind.apply(this._tooltip, H.array(arguments));
            return this
        },
        defineTooltip: function(t, e) {
            this._tooltip.define.apply(this._tooltip, H.array(arguments));
            return this
        },
        refreshTooltip: function(t) {
            this._tooltip.show.apply(this._tooltip, H.array(arguments));
            return this
        },
        openLightbox: function() {
            this._lightbox.show.apply(this._lightbox, H.array(arguments));
            return this
        },
        closeLightbox: function() {
            this._lightbox.hide.apply(this._lightbox, H.array(arguments));
            return this
        },
        hasVariation: function(e) {
            return t.inArray(e, this._options.variation.split(/\s+/)) > -1
        },
        getActiveImage: function() {
            var t = this._getActive();
            return t ? t.image : n
        },
        getActiveThumb: function() {
            return this._thumbnails[this._active].image || n
        },
        getMousePosition: function(t) {
            return {
                x: t.pageX - this.$("container").offset().left,
                y: t.pageY - this.$("container").offset().top
            }
        },
        addPan: function(e) {
            if (this._options.imageCrop === false) {
                return
            }
            e = t(e || this.getActiveImage());
            var i = this,
                n = e.width() / 2,
                a = e.height() / 2,
                o = parseInt(e.css("left"), 10),
                r = parseInt(e.css("top"), 10),
                s = o || 0,
                l = r || 0,
                c = 0,
                u = 0,
                h = false,
                f = H.timestamp(),
                d = 0,
                p = 0,
                m = function(t, i, n) {
                    if (t > 0) {
                        p = g.round(g.max(t * -1, g.min(0, i)));
                        if (d !== p) {
                            d = p;
                            if (y === 8) {
                                e.parent()["scroll" + n](p * -1)
                            } else {
                                var a = {};
                                a[n.toLowerCase()] = p;
                                e.css(a)
                            }
                        }
                    }
                },
                v = function(t) {
                    if (H.timestamp() - f < 50) {
                        return
                    }
                    h = true;
                    n = i.getMousePosition(t).x;
                    a = i.getMousePosition(t).y
                },
                _ = function(t) {
                    if (!h) {
                        return
                    }
                    c = e.width() - i._stageWidth;
                    u = e.height() - i._stageHeight;
                    o = n / i._stageWidth * c * -1;
                    r = a / i._stageHeight * u * -1;
                    s += (o - s) / i._options.imagePanSmoothness;
                    l += (r - l) / i._options.imagePanSmoothness;
                    m(u, l, "Top");
                    m(c, s, "Left")
                };
            if (y === 8) {
                e.parent().scrollTop(l * -1).scrollLeft(s * -1);
                e.css({
                    top: 0,
                    left: 0
                })
            }
            this.$("stage").off("mousemove", v).on("mousemove", v);
            this.addTimer("pan" + i._id, _, 50, true);
            return this
        },
        proxy: function(t, e) {
            if (typeof t !== "function") {
                return m
            }
            e = e || this;
            return function() {
                return t.apply(e, H.array(arguments))
            }
        },
        getThemeName: function() {
            return this.theme.name
        },
        removePan: function() {
            this.$("stage").off("mousemove");
            this.clearTimer("pan" + this._id);
            return this
        },
        addElement: function(e) {
            var i = this._dom;
            t.each(H.array(arguments), function(t, e) {
                i[e] = H.create("galleria-" + e)
            });
            return this
        },
        attachKeyboard: function(t) {
            this._keyboard.attach.apply(this._keyboard, H.array(arguments));
            return this
        },
        detachKeyboard: function() {
            this._keyboard.detach.apply(this._keyboard, H.array(arguments));
            return this
        },
        appendChild: function(t, e) {
            this.$(t).append(this.get(e) || e);
            return this
        },
        prependChild: function(t, e) {
            this.$(t).prepend(this.get(e) || e);
            return this
        },
        remove: function(t) {
            this.$(H.array(arguments).join(",")).remove();
            return this
        },
        append: function(t) {
            var e, i;
            for (e in t) {
                if (t.hasOwnProperty(e)) {
                    if (t[e].constructor === Array) {
                        for (i = 0; t[e][i]; i++) {
                            this.appendChild(e, t[e][i])
                        }
                    } else {
                        this.appendChild(e, t[e])
                    }
                }
            }
            return this
        },
        _scaleImage: function(e, i) {
            e = e || this._controls.getActive();
            if (!e) {
                return
            }
            var n, a = function(e) {
                t(e.container).children(":first").css({
                    top: g.max(0, H.parseValue(e.image.style.top)),
                    left: g.max(0, H.parseValue(e.image.style.left)),
                    width: H.parseValue(e.image.width),
                    height: H.parseValue(e.image.height)
                })
            };
            i = t.extend({
                width: this._stageWidth,
                height: this._stageHeight,
                crop: this._options.imageCrop,
                max: this._options.maxScaleRatio,
                min: this._options.minScaleRatio,
                margin: this._options.imageMargin,
                position: this._options.imagePosition,
                iframelimit: this._options.maxVideoSize
            }, i);
            if (this._options.layerFollow && this._options.imageCrop !== true) {
                if (typeof i.complete == "function") {
                    n = i.complete;
                    i.complete = function() {
                        n.call(e, e);
                        a(e)
                    }
                } else {
                    i.complete = a
                }
            } else {
                t(e.container).children(":first").css({
                    top: 0,
                    left: 0
                })
            }
            e.scale(i);
            return this
        },
        updateCarousel: function() {
            this._carousel.update();
            return this
        },
        resize: function(e, i) {
            if (typeof e == "function") {
                i = e;
                e = n
            }
            e = t.extend({
                width: 0,
                height: 0
            }, e);
            var a = this,
                o = this.$("container");
            t.each(e, function(t, i) {
                if (!i) {
                    o[t]("auto");
                    e[t] = a._getWH()[t]
                }
            });
            t.each(e, function(t, e) {
                o[t](e)
            });
            return this.rescale(i)
        },
        rescale: function(e, a, o) {
            var r = this;
            if (typeof e === "function") {
                o = e;
                e = n
            }
            var s = function() {
                r._stageWidth = e || r.$("stage").width();
                r._stageHeight = a || r.$("stage").height();
                if (r._options.swipe) {
                    t.each(r._controls.slides, function(e, i) {
                        r._scaleImage(i);
                        t(i.container).css("left", r._stageWidth * e)
                    });
                    r.$("images").css("width", r._stageWidth * r.getDataLength())
                } else {
                    r._scaleImage()
                }
                if (r._options.carousel) {
                    r.updateCarousel()
                }
                var n = r._controls.frames[r._controls.active];
                if (n) {
                    r._controls.frames[r._controls.active].scale({
                        width: r._stageWidth,
                        height: r._stageHeight,
                        iframelimit: r._options.maxVideoSize
                    })
                }
                r.trigger(i.RESCALE);
                if (typeof o === "function") {
                    o.call(r)
                }
            };
            s.call(r);
            return this
        },
        refreshImage: function() {
            this._scaleImage();
            if (this._options.imagePan) {
                this.addPan()
            }
            return this
        },
        _preload: function() {
            if (this._options.preload) {
                var t, e, n = this.getNext(),
                    a;
                try {
                    for (e = this._options.preload; e > 0; e--) {
                        t = new i.Picture;
                        a = this.getData(n);
                        t.preload(this.isFullscreen() && a.big ? a.big : a.image);
                        n = this.getNext(n)
                    }
                } catch (o) {}
            }
        },
        show: function(n, a, o) {
            var r = this._options.swipe;
            if (!r && (this._queue.length > 3 || n === false || !this._options.queue && this._queue.stalled)) {
                return
            }
            n = g.max(0, g.min(parseInt(n, 10), this.getDataLength() - 1));
            a = typeof a !== "undefined" ? !!a : n < this.getIndex();
            o = o || false;
            if (!o && i.History) {
                i.History.set(n.toString());
                return
            }
            if (this.finger && n !== this._active) {
                this.finger.to = -(n * this.finger.width);
                this.finger.index = n
            }
            this._active = n;
            if (r) {
                var l = this.getData(n),
                    c = this;
                if (!l) {
                    return
                }
                var u = this.isFullscreen() && l.big ? l.big : l.image || l.iframe,
                    h = this._controls.slides[n],
                    f = h.isCached(u),
                    d = this._thumbnails[n];
                var p = {
                    cached: f,
                    index: n,
                    rewind: a,
                    imageTarget: h.image,
                    thumbTarget: d.image,
                    galleriaData: l
                };
                this.trigger(t.extend(p, {
                    type: i.LOADSTART
                }));
                c.$("container").removeClass("videoplay");
                var m = function() {
                    c._layers[n].innerHTML = c.getData().layer || "";
                    c.trigger(t.extend(p, {
                        type: i.LOADFINISH
                    }));
                    c._playCheck()
                };
                c._preload();
                e.setTimeout(function() {
                    if (!h.ready || t(h.image).attr("src") != u) {
                        if (l.iframe && !l.image) {
                            h.isIframe = true
                        }
                        h.load(u, function(e) {
                            p.imageTarget = e.image;
                            c._scaleImage(e, m).trigger(t.extend(p, {
                                type: i.IMAGE
                            }));
                            m()
                        })
                    } else {
                        c.trigger(t.extend(p, {
                            type: i.IMAGE
                        }));
                        m()
                    }
                }, 100)
            } else {
                s.push.call(this._queue, {
                    index: n,
                    rewind: a
                });
                if (!this._queue.stalled) {
                    this._show()
                }
            }
            return this
        },
        _show: function() {
            var a = this,
                o = this._queue[0],
                r = this.getData(o.index);
            if (!r) {
                return
            }
            var l = this.isFullscreen() && r.big ? r.big : r.image || r.iframe,
                c = this._controls.getActive(),
                u = this._controls.getNext(),
                h = u.isCached(l),
                f = this._thumbnails[o.index],
                d = function() {
                    t(u.image).trigger("mouseup")
                };
            a.$("container").toggleClass("iframe", !!r.isIframe).removeClass("videoplay");
            var p = function(o, r, l, c, u) {
                return function() {
                    var h;
                    M.active = false;
                    H.toggleQuality(r.image, a._options.imageQuality);
                    a._layers[a._controls.active].innerHTML = "";
                    t(l.container).css({
                        zIndex: 0,
                        opacity: 0
                    }).show();
                    t(l.container).find("iframe, .galleria-videoicon").remove();
                    t(a._controls.frames[a._controls.active].container).hide();
                    t(r.container).css({
                        zIndex: 1,
                        left: 0,
                        top: 0
                    }).show();
                    a._controls.swap();
                    if (a._options.imagePan) {
                        a.addPan(r.image)
                    }
                    if (o.iframe && o.image || o.link || a._options.lightbox || a._options.clicknext) {
                        t(r.image).css({
                            cursor: "pointer"
                        }).on("mouseup", function(r) {
                            if (typeof r.which == "number" && r.which > 1) {
                                return
                            }
                            if (o.iframe) {
                                if (a.isPlaying()) {
                                    a.pause()
                                }
                                var s = a._controls.frames[a._controls.active],
                                    l = a._stageWidth,
                                    c = a._stageHeight;
                                t(s.container).css({
                                    width: l,
                                    height: c,
                                    opacity: 0
                                }).show().animate({
                                    opacity: 1
                                }, 200);
                                e.setTimeout(function() {
                                    s.load(o.iframe + (o.video ? "&autoplay=1" : ""), {
                                        width: l,
                                        height: c
                                    }, function(t) {
                                        a.$("container").addClass("videoplay");
                                        t.scale({
                                            width: a._stageWidth,
                                            height: a._stageHeight,
                                            iframelimit: o.video ? a._options.maxVideoSize : n
                                        })
                                    })
                                }, 100);
                                return
                            }
                            if (a._options.clicknext && !i.TOUCH) {
                                if (a._options.pauseOnInteraction) {
                                    a.pause()
                                }
                                a.next();
                                return
                            }
                            if (o.link) {
                                if (a._options.popupLinks) {
                                    h = e.open(o.link, "_blank")
                                } else {
                                    e.location.href = o.link
                                }
                                return
                            }
                            if (a._options.lightbox) {
                                a.openLightbox()
                            }
                        })
                    }
                    a._playCheck();
                    a.trigger({
                        type: i.IMAGE,
                        index: c.index,
                        imageTarget: r.image,
                        thumbTarget: u.image,
                        galleriaData: o
                    });
                    s.shift.call(a._queue);
                    a._queue.stalled = false;
                    if (a._queue.length) {
                        a._show()
                    }
                }
            }(r, u, c, o, f);
            if (this._options.carousel && this._options.carouselFollow) {
                this._carousel.follow(o.index)
            }
            a._preload();
            H.show(u.container);
            u.isIframe = r.iframe && !r.image;
            t(a._thumbnails[o.index].container).addClass("active").siblings(".active").removeClass("active");
            a.trigger({
                type: i.LOADSTART,
                cached: h,
                index: o.index,
                rewind: o.rewind,
                imageTarget: u.image,
                thumbTarget: f.image,
                galleriaData: r
            });
            a._queue.stalled = true;
            u.load(l, function(e) {
                var s = t(a._layers[1 - a._controls.active]).html(r.layer || "").hide();
                a._scaleImage(e, {
                    complete: function(e) {
                        if ("image" in c) {
                            H.toggleQuality(c.image, false)
                        }
                        H.toggleQuality(e.image, false);
                        a.removePan();
                        a.setInfo(o.index);
                        a.setCounter(o.index);
                        if (r.layer) {
                            s.show();
                            if (r.iframe && r.image || r.link || a._options.lightbox || a._options.clicknext) {
                                s.css("cursor", "pointer").off("mouseup").mouseup(d)
                            }
                        }
                        if (r.video && r.image) {
                            O(e.container)
                        }
                        var l = a._options.transition;
                        t.each({
                            initial: c.image === null,
                            touch: i.TOUCH,
                            fullscreen: a.isFullscreen()
                        }, function(t, e) {
                            if (e && a._options[t + "Transition"] !== n) {
                                l = a._options[t + "Transition"];
                                return false
                            }
                        });
                        if (l in M.effects === false) {
                            p()
                        } else {
                            var u = {
                                prev: c.container,
                                next: e.container,
                                rewind: o.rewind,
                                speed: a._options.transitionSpeed || 400
                            };
                            M.active = true;
                            M.init.call(a, l, u, p)
                        }
                        a.trigger({
                            type: i.LOADFINISH,
                            cached: h,
                            index: o.index,
                            rewind: o.rewind,
                            imageTarget: e.image,
                            thumbTarget: a._thumbnails[o.index].image,
                            galleriaData: a.getData(o.index)
                        })
                    }
                })
            })
        },
        getNext: function(t) {
            t = typeof t === "number" ? t : this.getIndex();
            return t === this.getDataLength() - 1 ? 0 : t + 1
        },
        getPrev: function(t) {
            t = typeof t === "number" ? t : this.getIndex();
            return t === 0 ? this.getDataLength() - 1 : t - 1
        },
        next: function() {
            if (this.getDataLength() > 1) {
                this.show(this.getNext(), false)
            }
            return this
        },
        prev: function() {
            if (this.getDataLength() > 1) {
                this.show(this.getPrev(), true)
            }
            return this
        },
        get: function(t) {
            return t in this._dom ? this._dom[t] : null
        },
        getData: function(t) {
            return t in this._data ? this._data[t] : this._data[this._active]
        },
        getDataLength: function() {
            return this._data.length
        },
        getIndex: function() {
            return typeof this._active === "number" ? this._active : false
        },
        getStageHeight: function() {
            return this._stageHeight
        },
        getStageWidth: function() {
            return this._stageWidth
        },
        getOptions: function(t) {
            return typeof t === "undefined" ? this._options : this._options[t]
        },
        setOptions: function(e, i) {
            if (typeof e === "object") {
                t.extend(this._options, e)
            } else {
                this._options[e] = i
            }
            return this
        },
        play: function(t) {
            this._playing = true;
            this._playtime = t || this._playtime;
            this._playCheck();
            this.trigger(i.PLAY);
            return this
        },
        pause: function() {
            this._playing = false;
            this.trigger(i.PAUSE);
            return this
        },
        playToggle: function(t) {
            return this._playing ? this.pause() : this.play(t)
        },
        isPlaying: function() {
            return this._playing
        },
        isFullscreen: function() {
            return this._fullscreen.active
        },
        _playCheck: function() {
            var t = this,
                e = 0,
                n = 20,
                a = H.timestamp(),
                o = "play" + this._id;
            if (this._playing) {
                this.clearTimer(o);
                var r = function() {
                    e = H.timestamp() - a;
                    if (e >= t._playtime && t._playing) {
                        t.clearTimer(o);
                        t.next();
                        return
                    }
                    if (t._playing) {
                        t.trigger({
                            type: i.PROGRESS,
                            percent: g.ceil(e / t._playtime * 100),
                            seconds: g.floor(e / 1e3),
                            milliseconds: e
                        });
                        t.addTimer(o, r, n)
                    }
                };
                t.addTimer(o, r, n)
            }
        },
        setPlaytime: function(t) {
            this._playtime = t;
            return this
        },
        setIndex: function(t) {
            this._active = t;
            return this
        },
        setCounter: function(t) {
            if (typeof t === "number") {
                t++
            } else if (typeof t === "undefined") {
                t = this.getIndex() + 1
            }
            this.get("current").innerHTML = t;
            if (y) {
                var e = this.$("counter"),
                    i = e.css("opacity");
                if (parseInt(i, 10) === 1) {
                    H.removeAlpha(e[0])
                } else {
                    this.$("counter").css("opacity", i)
                }
            }
            return this
        },
        setInfo: function(e) {
            var i = this,
                n = this.getData(e);
            t.each(["title", "description"], function(t, e) {
                var a = i.$("info-" + e);
                if (!!n[e]) {
                    a[n[e].length ? "show" : "hide"]().html(n[e])
                } else {
                    a.empty().hide()
                }
            });
            return this
        },
        hasInfo: function(t) {
            var e = "title description".split(" "),
                i;
            for (i = 0; e[i]; i++) {
                if (!!this.getData(t)[e[i]]) {
                    return true
                }
            }
            return false
        },
        jQuery: function(e) {
            var i = this,
                n = [];
            t.each(e.split(","), function(e, a) {
                a = t.trim(a);
                if (i.get(a)) {
                    n.push(a)
                }
            });
            var a = t(i.get(n.shift()));
            t.each(n, function(t, e) {
                a = a.add(i.get(e))
            });
            return a
        },
        $: function(t) {
            return this.jQuery.apply(this, H.array(arguments))
        }
    };
    t.each(x, function(t, e) {
        var n = /_/.test(e) ? e.replace(/_/g, "") : e;
        i[e.toUpperCase()] = "galleria." + n
    });
    t.extend(i, {
        IE9: y === 9,
        IE8: y === 8,
        IE7: y === 7,
        IE6: y === 6,
        IE: y,
        WEBKIT: /webkit/.test(f),
        CHROME: /chrome/.test(f),
        SAFARI: /safari/.test(f) && !/chrome/.test(f),
        QUIRK: y && a.compatMode && a.compatMode === "BackCompat",
        MAC: /mac/.test(navigator.platform.toLowerCase()),
        OPERA: !!e.opera,
        IPHONE: /iphone/.test(f),
        IPAD: /ipad/.test(f),
        ANDROID: /android/.test(f),
        TOUCH: "ontouchstart" in a
    });
    i.addTheme = function(n) {
        if (!n.name) {
            i.raise("No theme name specified")
        }
        if (typeof n.defaults !== "object") {
            n.defaults = {}
        } else {
            n.defaults = T(n.defaults)
        }
        var a = false,
            o;
        if (typeof n.css === "string") {
            t("link").each(function(t, e) {
                o = new RegExp(n.css);
                if (o.test(e.href)) {
                    a = true;
                    F(n);
                    return false
                }
            });
            if (!a) {
                t(function() {
                    var r = 0;
                    var s = function() {
                        t("script").each(function(t, i) {
                            o = new RegExp("galleria\\." + n.name.toLowerCase() + "\\.");
                            if (o.test(i.src)) {
                                a = i.src.replace(/[^\/]*$/, "") + n.css;
                                e.setTimeout(function() {
                                    H.loadCSS(a, "galleria-theme-" + n.name, function() {
                                        F(n)
                                    })
                                }, 1)
                            }
                        });
                        if (!a) {
                            if (r++ > 5) {
                                i.raise("No theme CSS loaded")
                            } else {
                                e.setTimeout(s, 500)
                            }
                        }
                    };
                    s()
                })
            }
        } else {
            F(n)
        }
        return n
    };
    i.loadTheme = function(n, a) {
        if (t("script").filter(function() {
                return t(this).attr("src") == n
            }).length) {
            return
        }
        var o = false,
            r;
        t(e).load(function() {
            if (!o) {
                r = e.setTimeout(function() {
                    if (!o) {
                        i.raise("Galleria had problems loading theme at " + n + ". Please check theme path or load manually.", true)
                    }
                }, 2e4)
            }
        });
        H.loadScript(n, function() {
            o = true;
            e.clearTimeout(r)
        });
        return i
    };
    i.get = function(t) {
        if (!!D[t]) {
            return D[t]
        } else if (typeof t !== "number") {
            return D
        } else {
            i.raise("Gallery index " + t + " not found")
        }
    };
    i.configure = function(e, n) {
        var a = {};
        if (typeof e == "string" && n) {
            a[e] = n;
            e = a
        } else {
            t.extend(a, e)
        }
        i.configure.options = a;
        t.each(i.get(), function(t, e) {
            e.setOptions(a)
        });
        return i
    };
    i.configure.options = {};
    i.on = function(e, n) {
        if (!e) {
            return
        }
        n = n || m;
        var a = e + n.toString().replace(/\s/g, "") + H.timestamp();
        t.each(i.get(), function(t, i) {
            i._binds.push(a);
            i.bind(e, n)
        });
        i.on.binds.push({
            type: e,
            callback: n,
            hash: a
        });
        return i
    };
    i.on.binds = [];
    i.run = function(e, n) {
        if (t.isFunction(n)) {
            n = {
                extend: n
            }
        }
        t(e || "#galleria").galleria(n);
        return i
    };
    i.addTransition = function(t, e) {
        M.effects[t] = e;
        return i
    };
    i.utils = H;
    i.log = function() {
        var i = H.array(arguments);
        if ("console" in e && "log" in e.console) {
            try {
                return e.console.log.apply(e.console, i)
            } catch (n) {
                t.each(i, function() {
                    e.console.log(this)
                })
            }
        } else {
            return e.alert(i.join("<br>"))
        }
    };
    i.ready = function(e) {
        if (typeof e != "function") {
            return i
        }
        t.each(E, function(t, i) {
            e.call(i, i._options)
        });
        i.ready.callbacks.push(e);
        return i
    };
    i.ready.callbacks = [];
    i.raise = function(e, i) {
        var n = i ? "Fatal error" : "Error",
            a = {
                color: "#fff",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1e5
            },
            o = function(e) {
                var o = '<div style="padding:4px;margin:0 0 2px;background:#' + (i ? "811" : "222") + ';">' + (i ? "<strong>" + n + ": </strong>" : "") + e + "</div>";
                t.each(D, function() {
                    var t = this.$("errors"),
                        e = this.$("target");
                    if (!t.length) {
                        e.css("position", "relative");
                        t = this.addElement("errors").appendChild("target", "errors").$("errors").css(a)
                    }
                    t.append(o)
                });
                if (!D.length) {
                    t("<div>").css(t.extend(a, {
                        position: "fixed"
                    })).append(o).appendTo(_().body)
                }
            };
        if (c) {
            o(e);
            if (i) {
                throw new Error(n + ": " + e)
            }
        } else if (i) {
            if ($) {
                return
            }
            $ = true;
            i = false;
            o("Gallery could not load.")
        }
    };
    i.version = l;
    i.getLoadedThemes = function() {
        return t.map(z, function(t) {
            return t.name
        })
    };
    i.requires = function(t, e) {
        e = e || "You need to upgrade Galleria to version " + t + " to use one or more components.";
        if (i.version < t) {
            i.raise(e, true)
        }
        return i
    };
    i.Picture = function(e) {
        this.id = e || null;
        this.image = null;
        this.container = H.create("galleria-image");
        t(this.container).css({
            overflow: "hidden",
            position: "relative"
        });
        this.original = {
            width: 0,
            height: 0
        };
        this.ready = false;
        this.isIframe = false
    };
    i.Picture.prototype = {
        cache: {},
        show: function() {
            H.show(this.image)
        },
        hide: function() {
            H.moveOut(this.image)
        },
        clear: function() {
            this.image = null
        },
        isCached: function(t) {
            return !!this.cache[t]
        },
        preload: function(e) {
            t(new Image).load(function(t, e) {
                return function() {
                    e[t] = t
                }
            }(e, this.cache)).attr("src", e)
        },
        load: function(n, a, o) {
            if (typeof a == "function") {
                o = a;
                a = null
            }
            if (this.isIframe) {
                var r = "if" + (new Date).getTime();
                var s = this.image = t("<iframe>", {
                    src: n,
                    frameborder: 0,
                    id: r,
                    allowfullscreen: true,
                    css: {
                        visibility: "hidden"
                    }
                })[0];
                if (a) {
                    t(s).css(a)
                }
                t(this.container).find("iframe,img").remove();
                this.container.appendChild(this.image);
                t("#" + r).load(function(i, n) {
                    return function() {
                        e.setTimeout(function() {
                            t(i.image).css("visibility", "visible");
                            if (typeof n == "function") {
                                n.call(i, i)
                            }
                        }, 10)
                    }
                }(this, o));
                return this.container
            }
            this.image = new Image;
            if (i.IE8) {
                t(this.image).css("filter", "inherit")
            }
            if (!i.IE && !i.CHROME && !i.SAFARI) {
                t(this.image).css("image-rendering", "optimizequality")
            }
            var l = false,
                c = false,
                u = t(this.container),
                f = t(this.image),
                d = function() {
                    if (!l) {
                        l = true;
                        e.setTimeout(function(t, e) {
                            return function() {
                                t.attr("src", e + (e.indexOf("?") > -1 ? "&" : "?") + H.timestamp())
                            }
                        }(t(this), n), 50)
                    } else {
                        if (h) {
                            t(this).attr("src", h)
                        } else {
                            i.raise("Image not found: " + n)
                        }
                    }
                },
                p = function(n, o, r) {
                    return function() {
                        var s = function() {
                            t(this).off("load");
                            n.original = a || {
                                height: this.height,
                                width: this.width
                            };
                            if (i.HAS3D) {
                                this.style.MozTransform = this.style.webkitTransform = "translate3d(0,0,0)"
                            }
                            u.append(this);
                            n.cache[r] = r;
                            if (typeof o == "function") {
                                e.setTimeout(function() {
                                    o.call(n, n)
                                }, 1)
                            }
                        };
                        if (!this.width || !this.height) {
                            ! function(e) {
                                H.wait({
                                    until: function() {
                                        return e.width && e.height
                                    },
                                    success: function() {
                                        s.call(e)
                                    },
                                    error: function() {
                                        if (!c) {
                                            t(new Image).load(p).attr("src", e.src);
                                            c = true
                                        } else {
                                            i.raise("Could not extract width/height from image: " + e.src + ". Traced measures: width:" + e.width + "px, height: " + e.height + "px.")
                                        }
                                    },
                                    timeout: 100
                                })
                            }(this)
                        } else {
                            s.call(this)
                        }
                    }
                }(this, o, n);
            u.find("iframe,img").remove();
            f.css("display", "block");
            H.hide(this.image);
            t.each("minWidth minHeight maxWidth maxHeight".split(" "), function(t, e) {
                f.css(e, /min/.test(e) ? "0" : "none")
            });
            f.load(p).on("error", d).attr("src", n);
            return this.container
        },
        scale: function(e) {
            var a = this;
            e = t.extend({
                width: 0,
                height: 0,
                min: n,
                max: n,
                margin: 0,
                complete: m,
                position: "center",
                crop: false,
                canvas: false,
                iframelimit: n
            }, e);
            if (this.isIframe) {
                var o = e.width,
                    r = e.height,
                    s, l;
                if (e.iframelimit) {
                    var c = g.min(e.iframelimit / o, e.iframelimit / r);
                    if (c < 1) {
                        s = o * c;
                        l = r * c;
                        t(this.image).css({
                            top: r / 2 - l / 2,
                            left: o / 2 - s / 2,
                            position: "absolute"
                        })
                    } else {
                        t(this.image).css({
                            top: 0,
                            left: 0
                        })
                    }
                }
                t(this.image).width(s || o).height(l || r).removeAttr("width").removeAttr("height");
                t(this.container).width(o).height(r);
                e.complete.call(a, a);
                try {
                    if (this.image.contentWindow) {
                        t(this.image.contentWindow).trigger("resize")
                    }
                } catch (u) {}
                return this.container
            }
            if (!this.image) {
                return this.container
            }
            var h, f, d = t(a.container),
                p;
            H.wait({
                until: function() {
                    h = e.width || d.width() || H.parseValue(d.css("width"));
                    f = e.height || d.height() || H.parseValue(d.css("height"));
                    return h && f
                },
                success: function() {
                    var i = (h - e.margin * 2) / a.original.width,
                        n = (f - e.margin * 2) / a.original.height,
                        o = g.min(i, n),
                        r = g.max(i, n),
                        s = {
                            "true": r,
                            width: i,
                            height: n,
                            "false": o,
                            landscape: a.original.width > a.original.height ? r : o,
                            portrait: a.original.width < a.original.height ? r : o
                        },
                        l = s[e.crop.toString()],
                        c = "";
                    if (e.max) {
                        l = g.min(e.max, l)
                    }
                    if (e.min) {
                        l = g.max(e.min, l)
                    }
                    t.each(["width", "height"], function(e, i) {
                        t(a.image)[i](a[i] = a.image[i] = g.round(a.original[i] * l))
                    });
                    t(a.container).width(h).height(f);
                    if (e.canvas && L) {
                        L.elem.width = a.width;
                        L.elem.height = a.height;
                        c = a.image.src + ":" + a.width + "x" + a.height;
                        a.image.src = L.cache[c] || function(t) {
                            L.context.drawImage(a.image, 0, 0, a.original.width * l, a.original.height * l);
                            try {
                                p = L.elem.toDataURL();
                                L.length += p.length;
                                L.cache[t] = p;
                                return p
                            } catch (e) {
                                return a.image.src
                            }
                        }(c)
                    }
                    var u = {},
                        d = {},
                        m = function(e, i, n) {
                            var o = 0;
                            if (/\%/.test(e)) {
                                var r = parseInt(e, 10) / 100,
                                    s = a.image[i] || t(a.image)[i]();
                                o = g.ceil(s * -1 * r + n * r)
                            } else {
                                o = H.parseValue(e)
                            }
                            return o
                        },
                        v = {
                            top: {
                                top: 0
                            },
                            left: {
                                left: 0
                            },
                            right: {
                                left: "100%"
                            },
                            bottom: {
                                top: "100%"
                            }
                        };
                    t.each(e.position.toLowerCase().split(" "), function(t, e) {
                        if (e === "center") {
                            e = "50%"
                        }
                        u[t ? "top" : "left"] = e
                    });
                    t.each(u, function(e, i) {
                        if (v.hasOwnProperty(i)) {
                            t.extend(d, v[i])
                        }
                    });
                    u = u.top ? t.extend(u, d) : d;
                    u = t.extend({
                        top: "50%",
                        left: "50%"
                    }, u);
                    t(a.image).css({
                        position: "absolute",
                        top: m(u.top, "height", f),
                        left: m(u.left, "width", h)
                    });
                    a.show();
                    a.ready = true;
                    e.complete.call(a, a)
                },
                error: function() {
                    i.raise("Could not scale image: " + a.image.src)
                },
                timeout: 1e3
            });
            return this
        }
    };
    t.extend(t.easing, {
        galleria: function(t, e, i, n, a) {
            if ((e /= a / 2) < 1) {
                return n / 2 * e * e * e + i
            }
            return n / 2 * ((e -= 2) * e * e + 2) + i
        },
        galleriaIn: function(t, e, i, n, a) {
            return n * (e /= a) * e + i
        },
        galleriaOut: function(t, e, i, n, a) {
            return -n * (e /= a) * (e - 2) + i
        }
    });
    i.Finger = function() {
        var n = g.abs;
        var r = i.HAS3D = function() {
            var e = a.createElement("p"),
                i, n = ["webkit", "O", "ms", "Moz", ""],
                o, r = 0,
                s = "transform";
            _().html.insertBefore(e, null);
            for (; n[r]; r++) {
                o = n[r] ? n[r] + "Transform" : s;
                if (e.style[o] !== undefined) {
                    e.style[o] = "translate3d(1px,1px,1px)";
                    i = t(e).css(n[r] ? "-" + n[r].toLowerCase() + "-" + s : s)
                }
            }
            _().html.removeChild(e);
            return i !== undefined && i.length > 0 && i !== "none"
        }();
        var s = function() {
            var t = "RequestAnimationFrame";
            return e.requestAnimationFrame || e["webkit" + t] || e["moz" + t] || e["o" + t] || e["ms" + t] || function(t) {
                e.setTimeout(t, 1e3 / 60)
            }
        }();
        var l = function(i, n) {
            this.config = {
                start: 0,
                duration: 500,
                onchange: function() {},
                oncomplete: function() {},
                easing: function(t, e, i, n, a) {
                    return -n * ((e = e / a - 1) * e * e * e - 1) + i
                }
            };
            this.easeout = function(t, e, i, n, a) {
                return n * ((e = e / a - 1) * e * e * e * e + 1) + i
            };
            if (!i.children.length) {
                return
            }
            var a = this;
            t.extend(this.config, n);
            this.elem = i;
            this.child = i.children[0];
            this.to = this.pos = 0;
            this.touching = false;
            this.start = {};
            this.index = this.config.start;
            this.anim = 0;
            this.easing = this.config.easing;
            if (!r) {
                this.child.style.position = "absolute";
                this.elem.style.position = "relative"
            }
            t.each(["ontouchstart", "ontouchmove", "ontouchend", "setup"], function(t, e) {
                a[e] = function(t) {
                    return function() {
                        t.apply(a, arguments)
                    }
                }(a[e])
            });
            this.setX = function() {
                var t = a.child.style;
                if (!r) {
                    t.left = a.pos + "px";
                    return
                }
                t.MozTransform = t.webkitTransform = t.transform = "translate3d(" + a.pos + "px,0,0)";
                return
            };
            t(i).on("touchstart", this.ontouchstart);
            t(e).on("resize", this.setup);
            t(e).on("orientationchange", this.setup);
            this.setup();
            ! function o() {
                s(o);
                a.loop.call(a)
            }()
        };
        l.prototype = {
            constructor: l,
            setup: function() {
                this.width = t(this.elem).width();
                this.length = g.ceil(t(this.child).width() / this.width);
                if (this.index !== 0) {
                    this.index = g.max(0, g.min(this.index, this.length - 1));
                    this.pos = this.to = -this.width * this.index
                }
            },
            setPosition: function(t) {
                this.pos = t;
                this.to = t
            },
            ontouchstart: function(t) {
                var e = t.originalEvent.touches;
                this.start = {
                    pageX: e[0].pageX,
                    pageY: e[0].pageY,
                    time: +new Date
                };
                this.isScrolling = null;
                this.touching = true;
                this.deltaX = 0;
                o.on("touchmove", this.ontouchmove);
                o.on("touchend", this.ontouchend)
            },
            ontouchmove: function(t) {
                var e = t.originalEvent.touches;
                if (e && e.length > 1 || t.scale && t.scale !== 1) {
                    return
                }
                this.deltaX = e[0].pageX - this.start.pageX;
                if (this.isScrolling === null) {
                    this.isScrolling = !!(this.isScrolling || g.abs(this.deltaX) < g.abs(e[0].pageY - this.start.pageY))
                }
                if (!this.isScrolling) {
                    t.preventDefault();
                    this.deltaX /= !this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0 ? g.abs(this.deltaX) / this.width + 1.8 : 1;
                    this.to = this.deltaX - this.index * this.width
                }
                t.stopPropagation()
            },
            ontouchend: function(t) {
                this.touching = false;
                var e = +new Date - this.start.time < 250 && g.abs(this.deltaX) > 40 || g.abs(this.deltaX) > this.width / 2,
                    i = !this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0;
                if (!this.isScrolling) {
                    this.show(this.index + (e && !i ? this.deltaX < 0 ? 1 : -1 : 0))
                }
                o.off("touchmove", this.ontouchmove);
                o.off("touchend", this.ontouchend)
            },
            show: function(t) {
                if (t != this.index) {
                    this.config.onchange.call(this, t)
                } else {
                    this.to = -(t * this.width)
                }
            },
            moveTo: function(t) {
                if (t != this.index) {
                    this.pos = this.to = -(t * this.width);
                    this.index = t
                }
            },
            loop: function() {
                var t = this.to - this.pos,
                    e = 1;
                if (this.width && t) {
                    e = g.max(.5, g.min(1.5, g.abs(t / this.width)))
                }
                if (this.touching || g.abs(t) <= 1) {
                    this.pos = this.to;
                    t = 0;
                    if (this.anim && !this.touching) {
                        this.config.oncomplete(this.index)
                    }
                    this.anim = 0;
                    this.easing = this.config.easing
                } else {
                    if (!this.anim) {
                        this.anim = {
                            start: this.pos,
                            time: +new Date,
                            distance: t,
                            factor: e,
                            destination: this.to
                        }
                    }
                    var i = +new Date - this.anim.time;
                    var n = this.config.duration * this.anim.factor;
                    if (i > n || this.anim.destination != this.to) {
                        this.anim = 0;
                        this.easing = this.easeout;
                        return
                    }
                    this.pos = this.easing(null, i, this.anim.start, this.anim.distance, n)
                }
                this.setX()
            }
        };
        return l
    }();
    t.fn.galleria = function(e) {
        var n = this.selector;
        if (!t(this).length) {
            t(function() {
                if (t(n).length) {
                    t(n).galleria(e)
                } else {
                    i.utils.wait({
                        until: function() {
                            return t(n).length
                        },
                        success: function() {
                            t(n).galleria(e)
                        },
                        error: function() {
                            i.raise('Init failed: Galleria could not find the element "' + n + '".')
                        },
                        timeout: 5e3
                    })
                }
            });
            return this
        }
        return this.each(function() {
            if (t.data(this, "galleria")) {
                t.data(this, "galleria").destroy();
                t(this).find("*").hide()
            }
            t.data(this, "galleria", (new i).init(this, e))
        })
    };
    if (typeof module === "object" && module && typeof module.exports === "object") {
        module.exports = i
    } else {
        e.Galleria = i;
        if (typeof define === "function" && define.amd) {
            define("galleria", ["jquery"], function() {
                return i
            })
        }
    }
}(jQuery, this);
