! function(i) {
    Galleria.addTheme({
        name: "classic",
        author: "Galleria",
        css: "galleria.classic.css",
        defaults: {
            transition: "slide",
            thumbCrop: "height",
            _toggleInfo: true
        },
        init: function(t) {
            Galleria.requires(1.4, "This version of Classic theme requires Galleria 1.4 or later");
            this.addElement("info-link", "info-close");
            this.append({
                info: ["info-link", "info-close"]
            });
            var e = this.$("info-link,info-close,info-text"),
                s = Galleria.TOUCH;
            this.$("loader,counter").show().css("opacity", .4);
            if (!s) {
                this.addIdleState(this.get("image-nav-left"), {
                    left: -50
                });
                this.addIdleState(this.get("image-nav-right"), {
                    right: -50
                });
                this.addIdleState(this.get("counter"), {
                    opacity: 0
                })
            }
            if (t._toggleInfo === true) {
                e.bind("click:fast", function() {
                    e.toggle()
                })
            } else {
                e.show();
                this.$("info-link, info-close").hide()
            }
            this.bind("thumbnail", function(t) {
                if (!s) {
                    i(t.thumbTarget).css("opacity", .6).parent().hover(function() {
                        i(this).not(".active").children().stop().fadeTo(100, 1)
                    }, function() {
                        i(this).not(".active").children().stop().fadeTo(400, .6)
                    });
                    if (t.index === this.getIndex()) {
                        i(t.thumbTarget).css("opacity", 1)
                    }
                } else {
                    i(t.thumbTarget).css("opacity", this.getIndex() ? 1 : .6).bind("click:fast", function() {
                        i(this).css("opacity", 1).parent().siblings().children().css("opacity", .6)
                    })
                }
            });
            var n = function(t) {
                i(t.thumbTarget).css({"opacity" : 1}).parent().siblings().children().css({"opacity" : .6})
                i(t.thumbTarget).css({"border-radius" : "15px", "border" : "2px double #222"})
                i(t.thumbTarget).parent().siblings().children().css({"border-radius" : "0px"})
            };
            this.bind("loadstart", function(i) {
                if (!i.cached) {
                    this.$("loader").show().fadeTo(200, .4)
                }
                window.setTimeout(function() {
                    n(i)
                }, s ? 300 : 0);
                this.$("info").toggle(this.hasInfo())
            });
            this.bind("loadfinish", function(i) {
                this.$("loader").fadeOut(200)
            })
        }
    })
}(jQuery);
