!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Imgur = t());
})(this, function () {
    "use strict";
    return class {
        static version = "1.0.3";
        clientid;
        endpoint;
        dropzone;
        info;
        onLoading;
        onSuccess;
        onSuccessAll;
        onError;
        constructor(e) {
            if (!e || !e.clientid) throw "Provide a valid Client Id here: https://api.imgur.com/";
            (this.clientid = e.clientid),
                (this.endpoint = "https://api.imgur.com/3/image"),
                (this.dropzone = document.querySelectorAll(".dropzone")),
                (this.info = document.querySelectorAll(".info")),
                (this.onLoading =
                    e.onLoading ||
                    (() => {
                        document.body.classList.add("loading");
                    })),
                (this.onSuccess =
                    e.onSuccess ||
                    ((e) => {
                        document.body.classList.remove("loading");
                    })),
                (this.onSuccessAll =
                    e.onSuccessAll ||
                    ((e) => {
                        document.body.classList.remove("loading");
                    })),
                (this.onError =
                    e.onError ||
                    ((e) => {
                        document.body.classList.remove("loading"), console.error("Invalid archive", e);
                    })),
                this.run();
        }
        createEls(e, t, o) {
            const i = document.createElement(e);
            for (const e in t) t.hasOwnProperty(e) && (i[e] = t[e]);
            return o && i.appendChild(document.createTextNode(o)), i;
        }
        async post(e, t) {
            const o = await fetch(e, { method: "POST", headers: { Authorization: "Client-ID " + this.clientid }, body: t });
            if (o.ok) return o.json();
            throw new Error(`HTTP error, status = ${o.status}`);
        }
        createDragZone() {
            const e = this.createEls("p", {}, "Drop or Paste Image File Here"),
                t = this.createEls("p", {}, "Or click here to select image"),
                o = this.createEls("input", { type: "file", multiple: "multiple", className: "input", accept: "image/*" });
            Array.from(this.info).forEach((o) => {
                o.appendChild(e), o.appendChild(t);
            }),
                Array.from(this.dropzone).forEach((e) => {
                    e.appendChild(o), this.upload(e);
                }),
                window.addEventListener("paste", (e) => {
                    const t = this.dropzone[0],
                        o = (e.clipboardData || e.originalEvent?.clipboardData).items;
                    for (let e = 0; e < o.length; e++) {
                        const i = o[e];
                        if ("file" === i.kind && i.type.startsWith("image")) {
                            const n = i.getAsFile();
                            this.matchFiles(n, t, [e, o.length]);
                        }
                    }
                });
        }
        loading() {
            const e = this.createEls("div", { className: "loading-modal" }),
                t = this.createEls("table", { className: "loading-table" }),
                o = this.createEls("img", { className: "loading-image", src: "./css/loading-spin.svg" });
            e.appendChild(t), t.appendChild(o), document.body.appendChild(e);
        }
        matchFiles(e, t, o) {
            if (e.type.match(/image/) && "image/svg+xml" !== e.type) {
                this.onLoading();
                const t = new FormData();
                t.append("image", e),
                    this.post(this.endpoint, t)
                        .then((e) => {
                            o[0] + 1 === o[1] && this.onSuccessAll(e), this.onSuccess(e);
                        })
                        .catch((e) => {
                            throw (this.onError(e), new Error(e));
                        });
            } else this.onError(new Error("Invalid archive"));
        }
        upload(e) {
            const t = (e, t, o) => {
                if (t.target && "INPUT" === t.target.nodeName && "file" === t.target.type && ("dragleave" === e || "drop" === e)) {
                    const e = t.target.parentElement;
                    e && e.classList[o]("dropzone-dragging");
                }
            };
            e.addEventListener("change", (t) => {
                if (t.target && "INPUT" === t.target.nodeName && "file" === t.target.type) {
                    const o = t.target.files;
                    for (let t = 0; t < o.length; t++) this.matchFiles(o[t], e, [t, o.length]);
                }
                t.target.value = "";
            }),
                ["dragenter", "dragleave", "dragover", "drop"].forEach((o) => {
                    e.addEventListener(o, (e) => t(o, e, "add"), !1), e.addEventListener(o, (e) => t(o, e, "remove"), !1);
                });
        }
        run() {
            document.querySelector(".loading-modal") || this.loading(), this.createDragZone();
        }
    };
});
