/* Chispa — asistente de Forja Labs.
   Habla con /api/chat (IA real). Si la IA no está disponible, cae a un guión mínimo y pasa a WhatsApp. */
(function () {
  "use strict";
  var WA = "523223102049";
  var API = "/api/chat";
  var hist = [];
  var S = { abierto: false, ocupado: false, ia: true };

  var ENLACES = {
    combo: ["Vender y Atender", "https://buy.stripe.com/9B628sa7S3v23EN3KlgEg0S", "https://buy.stripe.com/7sY14ofsc6Heb7f5StgEg0I"],
    pagina: ["Solo la página", "https://buy.stripe.com/14A00k0xi8Pmcbj1CdgEg0P", "https://buy.stripe.com/8x2dRagwg0iQ3EN4OpgEg0H"],
    agente: ["Solo el agente", "https://buy.stripe.com/aFaeVe0xie9Gdfn80BgEg0Q", "https://buy.stripe.com/3cI3cw1Bm3v25MV5StgEg0G"],
    alumnos: ["Plataforma de alumnos", "https://buy.stripe.com/dRm14ofsc8Pm3EN4OpgEg0R", "https://buy.stripe.com/7sYeVe4Ny1mUdfn0y9gEg0J"],
    express: ["Cobro Express", "https://buy.stripe.com/8x2bJ2gwg3v26QZbcNgEg0T", "https://buy.stripe.com/5kQbJ2bbW7Ligrz3KlgEg0U"]
  };
  var GUION = "Con el 50 % de apertura: paquete completo $14,000 (lista $28,000), p\u00e1gina sola $6,000, agente solo $10,000, Cobro Express $3,000. De contado se descuenta otro 10 % y su proyecto entra primero. JP le contesta el mismo d\u00eda por WhatsApp.";

  var css = "#chispa-btn{position:fixed;inset-inline-end:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:9px;background:var(--ember,#FF5722);color:#fff;border:0;border-radius:999px;padding:13px 19px;font:600 15px/1 'Instrument Sans',-apple-system,'Segoe UI',sans-serif;cursor:pointer;box-shadow:0 8px 26px rgba(0,0,0,.28)}#chispa-btn svg{width:18px;height:18px;fill:var(--spark,#FFC845)}#chispa-btn:hover{filter:brightness(1.07)}#chispa{position:fixed;inset-inline-end:18px;bottom:18px;z-index:9999;width:min(380px,calc(100vw - 24px));height:min(620px,calc(100dvh - 24px));background:var(--bg,#EEEFF1);color:var(--ink,#15191D);border:1px solid var(--line,#D3D7DC);border-radius:16px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.32);font-family:'Instrument Sans',-apple-system,'Segoe UI',sans-serif}#chispa.abierto{display:flex}#chispa .cab{display:flex;align-items:center;gap:10px;padding:14px;background:var(--iron,#20262B);color:#F2F0EC}#chispa .cab svg{width:26px;height:26px;flex:none}#chispa .cab b{display:block;font-size:15px;font-weight:600}#chispa .cab span{display:block;font-size:12.5px;color:#A9B1B9}#chispa .cerrar{margin-inline-start:auto;background:none;border:0;color:#A9B1B9;font-size:24px;line-height:1;cursor:pointer;padding:0 4px}#chispa .hilo{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}#chispa .m{max-width:88%;padding:11px 14px;border-radius:14px;font-size:15px;line-height:1.5;white-space:pre-line}#chispa .m.bot{background:var(--paper,#F8F8F7);border:1px solid var(--line,#D3D7DC);border-end-start-radius:5px;align-self:flex-start}#chispa .m.yo{background:var(--ember,#FF5722);color:#fff;border-end-end-radius:5px;align-self:flex-end}#chispa .m.bot a{color:var(--ember,#FF5722);font-weight:600}#chispa .puntos{align-self:flex-start;display:flex;gap:4px;padding:12px 14px}#chispa .puntos i{width:7px;height:7px;border-radius:50%;background:var(--ink-soft,#586069);opacity:.35;animation:cp 1.1s infinite}#chispa .puntos i:nth-child(2){animation-delay:.15s}#chispa .puntos i:nth-child(3){animation-delay:.3s}@keyframes cp{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:.85;transform:translateY(-3px)}}#chispa .ficha{align-self:flex-start;max-width:92%;background:var(--paper,#F8F8F7);border:1px solid var(--ember,#FF5722);border-radius:14px;padding:14px}#chispa .ficha h4{margin:0 0 8px;font:600 16px/1.2 'Fraunces',Georgia,serif}#chispa .ficha .acc{display:flex;flex-wrap:wrap;gap:8px}#chispa .ficha a{text-decoration:none;font-size:14px;font-weight:600;padding:10px 14px;border-radius:8px}#chispa .ficha a.oro{background:var(--spark,#FFC845);color:#20262B}#chispa .ficha a.pri{background:var(--ember,#FF5722);color:#fff}#chispa .ficha a.sec{border:1px solid var(--line,#D3D7DC);color:var(--ink,#15191D)}#chispa .ops{display:flex;flex-wrap:wrap;gap:7px;padding:0 16px 8px}#chispa .ops button{background:none;border:1px solid var(--ember,#FF5722);color:var(--ember,#FF5722);border-radius:999px;padding:8px 13px;font:500 14px/1 inherit;cursor:pointer}#chispa .ops button:hover{background:var(--ember,#FF5722);color:#fff}#chispa .caja{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line,#D3D7DC);background:var(--paper,#F8F8F7)}#chispa input{flex:1;min-width:0;background:var(--bg,#fff);color:inherit;border:1px solid var(--line,#D3D7DC);border-radius:9px;padding:11px 12px;font:16px/1.3 inherit}#chispa input:focus,#chispa button:focus-visible,#chispa a:focus-visible{outline:2px solid var(--ember,#FF5722);outline-offset:2px}#chispa .enviar{background:var(--ember,#FF5722);border:0;color:#fff;border-radius:9px;padding:0 15px;font:600 15px inherit;cursor:pointer}#chispa .enviar[disabled]{opacity:.5}@media (max-width:480px){#chispa{inset-inline-end:0;bottom:0;width:100vw;height:100dvh;border-radius:0;border:0}}";

  var MARCA = "<svg viewBox='0 0 1080 1080' aria-hidden='true'><path d='M293 283a28 28 0 0 1 28-28h326a28 28 0 0 1 28 28v67a28 28 0 0 1-28 28H420v351a28 28 0 0 1-28 28h-71a28 28 0 0 1-28-28z' fill='#F2F0EC'/><rect x='293' y='478' width='254' height='114' rx='26' fill='#FF5722'/><path d='M712 526q14 90 100 104-86 14-100 104-14-90-100-104 86-14 100-104z' fill='#FFC845'/></svg>";
  var ICONO = "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M12 2q1.6 8 10 10-8.4 2-10 10-1.6-8-10-10 8.4-2 10-10z'/></svg>";

  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var boton = document.createElement("button");
  boton.id = "chispa-btn"; boton.type = "button";
  boton.setAttribute("aria-label", "Abrir el asistente de Forja Labs");
  boton.innerHTML = ICONO + "<span data-chispa-btn>50 % de apertura</span>";
  document.body.appendChild(boton);

  var panel = document.createElement("div");
  panel.id = "chispa"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Asistente de Forja Labs");
  panel.innerHTML = "<div class='cab'>" + MARCA + "<div><b>Chispa</b><span data-chispa-sub>Asistente de Forja Labs</span></div><button class='cerrar' type='button' aria-label='Cerrar'>&times;</button></div><div class='hilo' id='chispa-hilo' aria-live='polite'></div><div class='ops' id='chispa-ops'></div><div class='caja'><input id='chispa-input' type='text' autocomplete='off' aria-label='Escriba su pregunta'><button class='enviar' type='button' id='chispa-enviar'>↑</button></div>";
  document.body.appendChild(panel);

  var hilo = panel.querySelector("#chispa-hilo"), ops = panel.querySelector("#chispa-ops"), input = panel.querySelector("#chispa-input");

  function T(k, d) { var x = window.FORJA_DIC || {}; return x[k] || d; }
  function wa(t) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t); }
  function abajo() { hilo.scrollTop = hilo.scrollHeight; }

  function burbuja(t, clase) {
    var e = document.createElement("div"); e.className = "m " + clase; e.textContent = t;
    hilo.appendChild(e); abajo(); return e;
  }
  function pensando() {
    var e = document.createElement("div"); e.className = "puntos";
    e.innerHTML = "<i></i><i></i><i></i>"; hilo.appendChild(e); abajo(); return e;
  }
  function opciones(l) {
    ops.innerHTML = "";
    (l || []).forEach(function (t) {
      var b = document.createElement("button"); b.type = "button"; b.textContent = t;
      b.addEventListener("click", function () { enviar(t); });
      ops.appendChild(b);
    });
    abajo();
  }
  function fichaPago(clave) {
    var p = ENLACES[clave]; if (!p) return;
    var e = document.createElement("div"); e.className = "ficha";
    e.innerHTML = "<h4>" + p[0] + "</h4><div class='acc'><a class='oro' href='" + p[1] + "'>" + T("pagarContado", "Pagar de contado") + "</a><a class='pri' href='" + p[2] + "'>" + T("pagarAnticipo", "Pagar anticipo") + "</a><a class='sec' href='" + wa("Hola, me interesa " + p[0] + " de Forja Labs. Mi negocio es: ") + "'>WhatsApp</a></div>";
    hilo.appendChild(e); abajo();
  }
  function detectaPaquete(txt) {
    var n = txt.toLowerCase();
    if (/cobro express/.test(n)) return "express";
    if (/vender y atender|paquete completo/.test(n)) return "combo";
    if (/plataforma de alumnos/.test(n)) return "alumnos";
    if (/solo el agente/.test(n)) return "agente";
    if (/solo la p\u00e1gina|solo la pagina/.test(n)) return "pagina";
    if (/\$?1[24],?[06]00|\$?2,?700|\$?7,?000/.test(n)) return "combo";
    return null;
  }

  function bienvenida() {
    hilo.innerHTML = "";
    burbuja(T("chispaHola", "Buen d\u00eda. Soy Chispa, el asistente de Forja Labs. Preg\u00fanteme lo que quiera sobre precios, plazos o qu\u00e9 le conviene a su negocio — contesto en su idioma."), "bot");
    opciones([
      T("chispaO1", "¿Qué me conviene?"),
      T("chispaO2", "¿Cuánto cuesta?"),
      T("chispaO3", "¿Hasta cuándo dura la promoción?"),
      T("chispaO4", "Quiero hablar con una persona")
    ]);
    input.placeholder = T("chispaPlaceholder", "Escriba su pregunta…");
  }

  function paseAHumano() {
    var e = document.createElement("div"); e.className = "ficha";
    e.innerHTML = "<h4>" + T("chispaJP", "Hablar con JP") + "</h4><div class='acc'><a class='pri' href='" + wa("Hola, vengo de la p\u00e1gina de Forja Labs. Mi negocio es: ") + "'>WhatsApp</a><a class='sec' href='mailto:hola@forjalabs.org'>" + T("chispaCorreo", "Correo") + "</a></div>";
    hilo.appendChild(e); abajo();
  }

  function enviar(texto) {
    var t = (texto || "").trim();
    if (!t || S.ocupado) return;
    burbuja(t, "yo"); ops.innerHTML = ""; input.value = "";
    hist.push({ role: "user", content: t.slice(0, 2000) });
    S.ocupado = true;
    panel.querySelector("#chispa-enviar").disabled = true;
    var p = pensando();

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensajes: hist.slice(-14), modo: window.CHISPA_MODO || "ventas", negocio: window.CHISPA_NEGOCIO || null })
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        p.remove();
        if (d && d.texto) {
          hist.push({ role: "assistant", content: d.texto });
          burbuja(d.texto, "bot");
          if (!window.CHISPA_MODO) {
            var pk = detectaPaquete(d.texto);
            if (pk) fichaPago(pk);
            if (/whatsapp|jp\b/i.test(d.texto)) paseAHumano();
          }
        } else {
          S.ia = false;
          burbuja(GUION, "bot");
          paseAHumano();
        }
      })
      .catch(function () {
        p.remove();
        S.ia = false;
        burbuja(T("chispaCaido", "Se me cay\u00f3 la conexi\u00f3n. ") + GUION, "bot");
        paseAHumano();
      })
      .finally(function () {
        S.ocupado = false;
        panel.querySelector("#chispa-enviar").disabled = false;
      });
  }

  function abrir() {
    S.abierto = true; panel.classList.add("abierto"); boton.style.display = "none";
    if (!hilo.children.length) bienvenida();
    if (window.innerWidth > 480) setTimeout(function () { input.focus(); }, 120);
  }
  function cerrar() { S.abierto = false; panel.classList.remove("abierto"); boton.style.display = "flex"; }

  boton.addEventListener("click", abrir);
  panel.querySelector(".cerrar").addEventListener("click", cerrar);
  panel.querySelector("#chispa-enviar").addEventListener("click", function () { enviar(input.value); });
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") enviar(input.value); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && S.abierto) cerrar(); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-chispa]");
    if (!a) return; e.preventDefault(); abrir(); enviar(a.getAttribute("data-chispa"));
  });

  window.CHISPA = { abrir: abrir, enviar: enviar, reiniciar: function () { hist = []; hilo.innerHTML = ""; bienvenida(); } };
})();
