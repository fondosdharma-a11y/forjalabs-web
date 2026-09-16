/* Cambio de idioma de Forja Labs.
   El espanol vive en el HTML; los demas idiomas se cargan bajo demanda desde /i18n/<codigo>.json */
(function () {
  "use strict";
  var IDIOMAS = [
    { c: "es", n: "Espa\u00f1ol" },
    { c: "en", n: "English" },
    { c: "zh", n: "\u4e2d\u6587" },
    { c: "hi", n: "\u0939\u093f\u0928\u094d\u0926\u0940" },
    { c: "ar", n: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", rtl: true },
    { c: "pt", n: "Portugu\u00eas" },
    { c: "bn", n: "\u09ac\u09be\u0982\u09b2\u09be" },
    { c: "ru", n: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439" },
    { c: "fr", n: "Fran\u00e7ais" },
    { c: "ur", n: "\u0627\u0631\u062f\u0648", rtl: true }
  ];
  var base = {};
  var sel = document.getElementById("idioma");
  if (!sel) return;

  IDIOMAS.forEach(function (i) {
    var o = document.createElement("option");
    o.value = i.c; o.textContent = i.n;
    sel.appendChild(o);
  });

  function nodos() { return document.querySelectorAll("[data-i18n]"); }

  // Guarda el espanol original la primera vez
  nodos().forEach(function (el) { base[el.getAttribute("data-i18n")] = el.innerHTML; });

  function esRtl(c) {
    for (var i = 0; i < IDIOMAS.length; i++) if (IDIOMAS[i].c === c) return !!IDIOMAS[i].rtl;
    return false;
  }

  function aplicar(dic, codigo) {
    nodos().forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = (dic && dic[k]) || base[k];
      if (v != null) el.innerHTML = v;
    });
    document.documentElement.lang = codigo;
    document.documentElement.dir = esRtl(codigo) ? "rtl" : "ltr";
    sel.value = codigo;
    try { localStorage.setItem("fl-idioma", codigo); } catch (e) {}
    document.dispatchEvent(new CustomEvent("fl:idioma", { detail: { codigo: codigo, dic: dic } }));
  }

  var cache = {};
  function cambiar(codigo) {
    if (codigo === "es") return aplicar(null, "es");
    if (cache[codigo]) return aplicar(cache[codigo], codigo);
    sel.disabled = true;
    fetch("/i18n/" + codigo + ".json", { cache: "force-cache" })
      .then(function (r) { if (!r.ok) throw new Error("sin traduccion"); return r.json(); })
      .then(function (d) { cache[codigo] = d; aplicar(d, codigo); })
      .catch(function () { aplicar(null, "es"); })
      .then(function () { sel.disabled = false; });
  }

  sel.addEventListener("change", function () { cambiar(sel.value); });

  // Idioma inicial: el guardado, si no el del navegador, si no espanol
  var inicial = null;
  try { inicial = localStorage.getItem("fl-idioma"); } catch (e) {}
  if (!inicial) {
    var nav = (navigator.language || "es").slice(0, 2).toLowerCase();
    for (var i = 0; i < IDIOMAS.length; i++) if (IDIOMAS[i].c === nav) inicial = nav;
  }
  sel.value = inicial || "es";
  if (inicial && inicial !== "es") cambiar(inicial);
})();
