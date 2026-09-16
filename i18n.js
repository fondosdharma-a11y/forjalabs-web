/* Forja Labs — cambio de idioma.
   El español vive en el HTML. Cualquier otro idioma se carga desde /i18n/<codigo>.json
   y se aplica sobre los elementos con data-i18n. Árabe y urdu cambian a escritura derecha-izquierda. */
(function () {
  "use strict";

  var IDIOMAS = [
    { c: "es", n: "Español" },
    { c: "en", n: "English" },
    { c: "zh", n: "\u4e2d\u6587" },
    { c: "hi", n: "\u0939\u093f\u0928\u094d\u0926\u0940" },
    { c: "ar", n: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", rtl: true },
    { c: "fr", n: "Fran\u00e7ais" },
    { c: "bn", n: "\u09ac\u09be\u0982\u09b2\u09be" },
    { c: "pt", n: "Portugu\u00eas" },
    { c: "ru", n: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
    { c: "ur", n: "\u0627\u0631\u062f\u0648", rtl: true }
  ];

  var base = {};   // textos originales en español
  var cache = {};  // diccionarios ya descargados

  function nodos() { return document.querySelectorAll("[data-i18n]"); }

  function guardarBase() {
    nodos().forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var attr = el.getAttribute("data-i18n-attr");
      base[k] = attr ? el.getAttribute(attr) : el.innerHTML;
    });
  }

  function aplicar(dic, codigo) {
    nodos().forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var attr = el.getAttribute("data-i18n-attr");
      var v = (dic && dic[k] != null) ? dic[k] : base[k];
      if (v == null) return;
      if (attr) el.setAttribute(attr, v); else el.innerHTML = v;
    });
    var info = IDIOMAS.filter(function (i) { return i.c === codigo; })[0] || IDIOMAS[0];
    document.documentElement.lang = codigo;
    document.documentElement.dir = info.rtl ? "rtl" : "ltr";
    var sel = document.getElementById("idioma");
    if (sel) sel.value = codigo;
    try { localStorage.setItem("forja-idioma", codigo); } catch (e) {}
  }

  function cambiar(codigo) {
    if (codigo === "es") { aplicar(null, "es"); return; }
    if (cache[codigo]) { aplicar(cache[codigo], codigo); return; }
    fetch("/i18n/" + codigo + ".json", { cache: "force-cache" })
      .then(function (r) { if (!r.ok) throw new Error("sin traduccion"); return r.json(); })
      .then(function (d) { cache[codigo] = d; aplicar(d, codigo); })
      .catch(function () { aplicar(null, "es"); });
  }

  function montar() {
    guardarBase();

    var caja = document.getElementById("caja-idioma");
    if (!caja) return;
    var sel = document.createElement("select");
    sel.id = "idioma";
    sel.setAttribute("aria-label", "Idioma / Language");
    IDIOMAS.forEach(function (i) {
      var o = document.createElement("option");
      o.value = i.c; o.textContent = i.n;
      sel.appendChild(o);
    });
    sel.addEventListener("change", function () { cambiar(sel.value); });
    caja.appendChild(sel);

    var guardado = null;
    try { guardado = localStorage.getItem("forja-idioma"); } catch (e) {}
    var inicial = guardado;
    if (!inicial) {
      var nav = (navigator.language || "es").slice(0, 2).toLowerCase();
      inicial = IDIOMAS.some(function (i) { return i.c === nav; }) ? nav : "es";
    }
    if (inicial !== "es") cambiar(inicial); else sel.value = "es";
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", montar);
  else montar();
})();
