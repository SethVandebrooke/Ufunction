function U(s) {
    function DOM(obj) {
        try {
          return obj instanceof HTMLElement;
        }
        catch(e){
          return (typeof obj==="object") && (obj.nodeType===1) && (typeof obj.style === "object") && (typeof obj.ownerDocument ==="object");
        }
    }
    if (DOM(s)) {
        var tar = s;
        tar.on = function (n, f) {
            tar.addEventListener(n, f);
            return tar;
        };
        tar.attr = function (k, v) {
            if (k) {
                if (v) {
                    tar.setAttribute(k, v);
                    return tar;
                } else {
                    return tar.getAttribute(k);
                }
            }
        };
        tar.html = function (v) {
            if (v) {
                tar.innerHTML = v;
                return tar;
            } else {
                return tar.innerHTML;
            }
        }
        return tar;
    } else if (typeof s == "string") {
        var tar = document.querySelectorAll(s);
        if (tar.length === 1) {
            return U(tar[0]);
        }
        tar.each = function (f) { tar.forEach(f); return tar; };
        tar.on = function (n, f) {
            tar.each(e => U(e).on(n, f));
            return tar;
        };
        tar.attr = function (k, v) {
            if (typeof k == "string" && typeof v == "string") {
                tar.each(e => U(e).attr(k, v));
            }
            return tar;
        };
        tar.html = function (v) {
            if (typeof v == "string") {
                tar.each(e => U(e).html(v));
            }
            return tar;
        };
        return tar;
    } else if (s === undefined) {
        console.warn("wut");
    }
}
U.copyObj = function (obj) {
    var r = {};
    for (var k in obj) {
        r[k] = obj[k];
    } return r;
};
U.extendObj = function (obj,obj2) {
    for (var k in obj2) {
        obj[k] = obj2[k];
    } return obj;
};
U.storage = function (){
    this.set = (k,v) => localStorage.setItem(k,JSON.stringify(v));
    this.get = k => JSON.parse(localStorage.getItem(k));
    this.remove = k => localStorage.removeItem(k);
};
