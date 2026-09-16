/* Idiomas y cuenta regresiva de Forja Labs.
   El español vive en el HTML; los demás idiomas se cargan de /i18n/<codigo>.json.
   Si falta una clave, se queda el texto en español. */
(function () {
  "use strict";

  var RTL = { ar: 1, ur: 1 };
  var sel = document.getElementById("idioma");
  var base = {};
  var cache = {};
  var actual = "es";

  // Guarda el texto original en español como respaldo
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    base[el.getAttribute("data-i18n")] = el.textContent;
  });

  function meta(nombre, valor) {
    if (!valor) return;
    var e = document.querySelector("meta[" + (nombre.indexOf("og:") === 0 ? "property" : "name") + "='" + nombre + "']");
    if (e) e.setAttribute("content", valor);
  }

  function aplicar(dic, codigo) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = (dic && dic[k]) || base[k];
      if (v) el.textContent = v;
    });
    document.documentElement.lang = codigo;
    document.documentElement.dir = RTL[codigo] ? "rtl" : "ltr";
    actual = codigo;
    window.FORJA_DIC = dic || {};

    // La pestaña del navegador y las vistas previas siguen el idioma elegido
    var titular = (dic && dic.h1) || base.h1;
    var entrada = (dic && dic.lead) || base.lead;
    if (titular) { document.title = titular + " — Forja Labs"; meta("og:title", titular); }
    if (entrada) { meta("description", entrada); meta("og:description", entrada); }
    meta("og:locale", codigo);

    reloj();
    try { localStorage.setItem("forja-idioma", codigo); } catch (e) {}
  }

  function cambiar(codigo) {
    if (codigo === "es") return aplicar(null, "es");
    if (cache[codigo]) return aplicar(cache[codigo], codigo);
    fetch("/i18n/" + codigo + ".json")
      .then(function (r) { if (!r.ok) throw new Error("no"); return r.json(); })
      .then(function (d) { cache[codigo] = d; aplicar(d, codigo); })
      .catch(function () { aplicar(null, "es"); if (sel) sel.value = "es"; });
  }

  /* Cuenta regresiva */
  var cuenta = document.getElementById("cuenta");
  var fin = document.getElementById("fin");
  var relojCorto = document.getElementById("reloj");
  var LIM = new Date(window.FIN_PROMO || "2026-10-16T23:59:59-06:00").getTime();

  function t(k, d) { var x = window.FORJA_DIC || {}; return x[k] || d; }

  function reloj() {
    if (!cuenta) return;
    var falta = LIM - Date.now();
    if (falta <= 0) {
      cuenta.innerHTML = "";
      if (fin) fin.textContent = t("promoFin", "La promoci\u00f3n de apertura termin\u00f3. Escr\u00edbanos: siempre hay forma de ajustar el alcance a su presupuesto.");
      if (relojCorto) relojCorto.textContent = "";
      return;
    }
    var s = Math.floor(falta / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), g = s % 60;
    var et = [[d, t("dias", "d\u00edas")], [h, t("horas", "horas")], [m, t("minutos", "min")], [g, t("segundos", "seg")]];
    cuenta.innerHTML = et.map(function (p) {
      return "<div class='casilla'><b>" + String(p[0]).padStart(2, "0") + "</b><span>" + p[1] + "</span></div>";
    }).join("");
    if (fin) {
      // La fecha es la misma para todos: el cierre ocurre en horario de México
      var opc = { day: "numeric", month: "long", year: "numeric", timeZone: "America/Mexico_City" };
      var texto;
      try { texto = new Date(LIM).toLocaleDateString(actual === "es" ? "es-MX" : actual, opc); }
      catch (e) { texto = new Date(LIM).toLocaleDateString("es-MX", opc); }
      fin.textContent = t("terminaEl", "Termina el") + " " + texto;
    }
    if (relojCorto) relojCorto.textContent = d + t("dAbrev", "d") + " " + String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + ":" + String(g).padStart(2, "0");
  }
  reloj();
  setInterval(reloj, 1000);

  /* Selector */
  if (sel) {
    sel.addEventListener("change", function () { cambiar(sel.value); });
    var guardado = null;
    try { guardado = localStorage.getItem("forja-idioma"); } catch (e) {}
    var inicial = guardado || (navigator.language || "es").slice(0, 2).toLowerCase();
    var existe = Array.prototype.some.call(sel.options, function (o) { return o.value === inicial; });
    if (existe && inicial !== "es") { sel.value = inicial; cambiar(inicial); }
  }
})();
