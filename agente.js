/* Chispa — asistente de Forja Labs. Corre en el navegador del visitante; no envía nada a ningún servidor. */
(function () {
  "use strict";
  var WA = "523223102049";
  var P = {
    combo: { n: "Vender y Atender", r: "La página que cobra más el agente que contesta, trabajando juntos.", l: "$28,000", p: "$14,000 con el 50 % de apertura · anticipo de $7,000", c: "$12,600 de contado (10 % extra) con prioridad", m: "más $2,500 al mes por el agente", e: "3 semanas", u: "https://buy.stripe.com/9B628sa7S3v23EN3KlgEg0S", a: "https://buy.stripe.com/7sY14ofsc6Heb7f5StgEg0I" },
    pagina: { n: "Solo la página", r: "Página profesional con cobro por tarjeta, agenda y dominio propio.", l: "$12,000", p: "$6,000 con el 50 % de apertura · anticipo de $3,000", c: "$5,400 de contado (10 % extra) con prioridad", m: "sin mensualidad obligatoria", e: "10 días", u: "https://buy.stripe.com/14A00k0xi8Pmcbj1CdgEg0P", a: "https://buy.stripe.com/8x2dRagwg0iQ3EN4OpgEg0H" },
    agente: { n: "Solo el agente", r: "Atiende su WhatsApp día y noche, responde dudas y agenda citas.", l: "$20,000", p: "$10,000 con el 50 % de apertura · anticipo de $5,000", c: "$9,000 de contado (10 % extra) con prioridad", m: "más $2,500 al mes", e: "2 semanas", u: "https://buy.stripe.com/aFaeVe0xie9Gdfn80BgEg0Q", a: "https://buy.stripe.com/3cI3cw1Bm3v25MV5StgEg0G" },
    alumnos: { n: "Plataforma de alumnos", r: "Área privada con cursos, membresías y cobro automático cada mes.", l: "$35,000", p: "$17,500 con el 50 % de apertura · anticipo de $8,750", c: "$15,750 de contado (10 % extra) con prioridad", m: "más $2,000 al mes", e: "3 a 4 semanas", u: "https://buy.stripe.com/dRm14ofsc8Pm3EN4OpgEg0R", a: "https://buy.stripe.com/7sYeVe4Ny1mUdfn0y9gEg0J" }
  };
  var R = [
    { k: ["precio", "cuesta", "costo", "cuanto", "cuánto", "tarifa", "presupuesto", "vale", "cobran"],
      t: "Con el 50 % de apertura: el paquete completo queda en $14,000 (lista $28,000), la página sola en $6,000 y el agente solo en $10,000. Pagando de contado se descuenta otro 10 % y su proyecto entra primero en la fila.",
      o: ["¿Qué me conviene?", "¿Hasta cuándo dura?"] },
    { k: ["hasta cuando", "hasta cuándo", "dura", "vence", "termina", "promoción", "promocion", "descuento", "oferta"],
      t: "El 50 % es por apertura y dura un mes: termina el 16 de octubre de 2026. Después los precios vuelven a lista y no se repite. Si paga de contado, se descuenta un 10 % adicional y su proyecto arranca en 48 horas.",
      o: ["¿Qué me conviene?", "Ver precios"] },
    { k: ["contado", "prioridad", "adelantado", "completo", "todo junto"],
      t: "Pagar de contado le da cuatro cosas: 10 % extra de descuento, prioridad en la fila de producción, arranque en 48 horas y una ronda adicional de ajustes sin costo.",
      o: ["¿Qué me conviene?", "Ver precios"] },
    { k: ["real", "inflado", "truco", "engaño", "de verdad"],
      t: "El descuento es real y es por apertura. Forja Labs abre este mes y necesita casos reales más que margen. Pasado el mes los precios vuelven a lista.",
      o: ["Ver precios", "Quiero hablar con una persona"] },
    { k: ["tarda", "tiempo", "cuando entregan", "entrega", "plazo", "rápido", "rapido"],
      t: "El paquete completo se entrega en 3 semanas; la página sola en 10 días; el agente solo en 2 semanas. Pagando de contado el proyecto arranca en 48 horas en lugar de esperar turno.",
      o: ["¿Qué me conviene?", "Ver precios"] },
    { k: ["dinero", "stripe", "tarjeta", "transferencia", "oxxo", "cobro", "cobra"],
      t: "Los cobros llegan a su propia cuenta de Stripe, conectada a su banco. Forja Labs nunca toca ese dinero. Sus clientes pueden pagar con tarjeta, transferencia y OXXO.",
      o: ["¿Qué me conviene?", "Quiero hablar con una persona"] },
    { k: ["mensual", "mensualidad", "suscrip", "renta", "iguala", "mantenimiento"],
      t: "El agente lleva $2,500 al mes porque cada conversación consume IA y hospedaje; esa parte no entra en la promoción. La página no necesita mensualidad: su mantenimiento de $900 es opcional.",
      o: ["¿Qué me conviene?", "Ver precios"] },
    { k: ["invent", "miente", "equivoc", "error", "alucina", "confiable"],
      t: "El agente se entrena con la información real de su negocio y con instrucciones de qué no debe responder. Cuando no sabe algo, lo dice y pasa la conversación a usted. Además, usted aprueba las respuestas antes de que salga al aire.",
      o: ["¿Qué me conviene?", "Quiero hablar con una persona"] },
    { k: ["espant", "robot", "frío", "frio", "impersonal", "humano"],
      t: "El agente se presenta como asistente y no finge ser usted. En cuanto hay una queja, una negociación o un caso delicado, le entrega la conversación. La alternativa real no es usted contestando al instante: es nadie contestando.",
      o: ["¿Qué me conviene?", "Quiero hablar con una persona"] },
    { k: ["pequeño", "pequeno", "chico", "apenas empiezo", "nuevo"],
      t: "Si ya tiene clientes que le escriben, su negocio no es demasiado pequeño. Entre más chico el equipo, más pesa cada mensaje sin contestar.",
      o: ["¿Qué me conviene?", "Ver precios"] },
    { k: ["dominio", "hosting", "hospedaje", "servidor"],
      t: "El dominio y el hospedaje van incluidos y quedan a su nombre. Si algún día quiere llevarse todo a otro lado, puede hacerlo sin pedirnos permiso.",
      o: ["¿Qué me conviene?", "Quiero hablar con una persona"] },
    { k: ["curso", "alumno", "membres", "clases", "escuela", "instituto", "taller"],
      t: "Para cursos y membresías existe la Plataforma de alumnos: área privada, cobro automático cada mes y baja automática de quien deja de pagar.",
      p: "alumnos" },
    { k: ["cita", "agenda", "reserva", "calendario", "apart"],
      t: "Sí. El agente agenda citas mientras conversa y las manda a su calendario, y la página permite apartar con pago por adelantado.",
      o: ["¿Qué me conviene?", "Ver precios"] },
    { k: ["garantia", "garantía", "no me gusta", "devoluci", "reembolso"],
      t: "Ve el diseño antes de que construyamos nada. Si en la propuesta no hay acuerdo, no se paga el segundo 50 % y ahí termina el compromiso.",
      o: ["¿Qué me conviene?", "Quiero hablar con una persona"] },
    { k: ["factura", "fiscal", "iva", "sat", "cfdi"],
      t: "Sí emitimos factura; se indica al contratar. Para dudas fiscales más finas prefiero pasarle con JP en lugar de improvisar.",
      o: ["Quiero hablar con una persona"] },
    { k: ["quien", "quién", "forja", "ustedes", "empresa", "experiencia", "portafolio"],
      t: "Forja Labs es un estudio mexicano que construye páginas que cobran y agentes de IA que atienden. Precio fijo, fecha por escrito y todo queda a nombre del cliente.",
      o: ["¿Qué me conviene?", "Ver precios"] }
  ];
  var S = { abierto: false, ctx: "" };

  var css = "#chispa-btn{position:fixed;right:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:9px;background:var(--ember,#FF5722);color:#fff;border:0;border-radius:999px;padding:13px 19px;font:600 15px/1 'Instrument Sans',-apple-system,'Segoe UI',sans-serif;cursor:pointer;box-shadow:0 8px 26px rgba(0,0,0,.28)}#chispa-btn svg{width:18px;height:18px;fill:var(--spark,#FFC845)}#chispa-btn:hover{filter:brightness(1.07)}#chispa{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(380px,calc(100vw - 24px));height:min(610px,calc(100dvh - 24px));background:var(--bg,#EEEFF1);color:var(--ink,#15191D);border:1px solid var(--line,#D3D7DC);border-radius:16px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.32);font-family:'Instrument Sans',-apple-system,'Segoe UI',sans-serif}#chispa.abierto{display:flex}#chispa .cab{display:flex;align-items:center;gap:10px;padding:14px;background:var(--iron,#20262B);color:#F2F0EC}#chispa .cab svg{width:26px;height:26px;flex:none}#chispa .cab b{display:block;font-size:15px;font-weight:600}#chispa .cab span{display:block;font-size:12.5px;color:#A9B1B9}#chispa .cerrar{margin-left:auto;background:none;border:0;color:#A9B1B9;font-size:24px;line-height:1;cursor:pointer;padding:0 4px}#chispa .hilo{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}#chispa .m{max-width:88%;padding:11px 14px;border-radius:14px;font-size:15px;line-height:1.5}#chispa .m.bot{background:var(--paper,#F8F8F7);border:1px solid var(--line,#D3D7DC);border-bottom-left-radius:5px;align-self:flex-start;white-space:pre-line}#chispa .m.yo{background:var(--ember,#FF5722);color:#fff;border-bottom-right-radius:5px;align-self:flex-end}#chispa .ficha{align-self:flex-start;max-width:92%;background:var(--paper,#F8F8F7);border:1px solid var(--ember,#FF5722);border-radius:14px;padding:14px}#chispa .ficha h4{margin:0 0 4px;font:600 17px/1.2 'Fraunces',Georgia,serif}#chispa .ficha p{margin:0;font-size:14px;color:var(--ink-soft,#586069)}#chispa .ficha .dato{margin-top:8px;font-size:14px}#chispa .ficha .tach{text-decoration:line-through;color:var(--ink-soft,#586069);margin-right:6px}#chispa .ficha .acc{margin-top:12px;display:flex;flex-wrap:wrap;gap:8px}#chispa .ficha a{text-decoration:none;font-size:14px;font-weight:600;padding:10px 14px;border-radius:8px}#chispa .ficha a.oro{background:var(--spark,#FFC845);color:#20262B}#chispa .ficha a.pri{background:var(--ember,#FF5722);color:#fff}#chispa .ficha a.sec{border:1px solid var(--line,#D3D7DC);color:var(--ink,#15191D)}#chispa .ops{display:flex;flex-wrap:wrap;gap:7px;padding:0 16px 8px}#chispa .ops button{background:none;border:1px solid var(--ember,#FF5722);color:var(--ember,#FF5722);border-radius:999px;padding:8px 13px;font:500 14px/1 inherit;cursor:pointer}#chispa .ops button:hover{background:var(--ember,#FF5722);color:#fff}#chispa .caja{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line,#D3D7DC);background:var(--paper,#F8F8F7)}#chispa input{flex:1;min-width:0;background:var(--bg,#fff);color:inherit;border:1px solid var(--line,#D3D7DC);border-radius:9px;padding:11px 12px;font:15px/1.3 inherit}#chispa input:focus,#chispa button:focus-visible,#chispa a:focus-visible{outline:2px solid var(--ember,#FF5722);outline-offset:2px}#chispa .enviar{background:var(--ember,#FF5722);border:0;color:#fff;border-radius:9px;padding:0 15px;font:600 15px inherit;cursor:pointer}@media (max-width:480px){#chispa{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0;border:0}}";

  var MARCA = "<svg viewBox='0 0 1080 1080' aria-hidden='true'><path d='M293 283a28 28 0 0 1 28-28h326a28 28 0 0 1 28 28v67a28 28 0 0 1-28 28H420v351a28 28 0 0 1-28 28h-71a28 28 0 0 1-28-28z' fill='#F2F0EC'/><rect x='293' y='478' width='254' height='114' rx='26' fill='#FF5722'/><path d='M712 526q14 90 100 104-86 14-100 104-14-90-100-104 86-14 100-104z' fill='#FFC845'/></svg>";
  var ICONO = "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M12 2q1.6 8 10 10-8.4 2-10 10-1.6-8-10-10 8.4-2 10-10z'/></svg>";

  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var boton = document.createElement("button");
  boton.id = "chispa-btn"; boton.type = "button";
  boton.setAttribute("aria-label", "Abrir el asistente de Forja Labs");
  boton.innerHTML = ICONO + "<span>50 % de apertura</span>";
  document.body.appendChild(boton);

  var panel = document.createElement("div");
  panel.id = "chispa"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Asistente de Forja Labs");
  panel.innerHTML = "<div class='cab'>" + MARCA + "<div><b>Chispa</b><span>Asistente de Forja Labs</span></div><button class='cerrar' type='button' aria-label='Cerrar'>&times;</button></div><div class='hilo' id='chispa-hilo' aria-live='polite'></div><div class='ops' id='chispa-ops'></div><div class='caja'><input id='chispa-input' type='text' placeholder='Escriba su pregunta…' autocomplete='off' aria-label='Escriba su pregunta'><button class='enviar' type='button' id='chispa-enviar'>Enviar</button></div>";
  document.body.appendChild(panel);

  var hilo = panel.querySelector("#chispa-hilo"), ops = panel.querySelector("#chispa-ops"), input = panel.querySelector("#chispa-input");

  function wa(t) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t); }
  function abajo() { hilo.scrollTop = hilo.scrollHeight; }
  function decir(t, d) { setTimeout(function () { var e = document.createElement("div"); e.className = "m bot"; e.textContent = t; hilo.appendChild(e); abajo(); }, d || 0); }
  function yo(t) { var e = document.createElement("div"); e.className = "m yo"; e.textContent = t; hilo.appendChild(e); abajo(); }
  function opciones(l, d) {
    setTimeout(function () {
      ops.innerHTML = "";
      (l || []).forEach(function (t) { var b = document.createElement("button"); b.type = "button"; b.textContent = t; b.addEventListener("click", function () { manejar(t); }); ops.appendChild(b); });
      abajo();
    }, d || 0);
  }
  function ficha(clave, d) {
    var p = P[clave]; S.ctx = p.n;
    setTimeout(function () {
      var e = document.createElement("div"); e.className = "ficha";
      e.innerHTML = "<h4>" + p.n + "</h4><p>" + p.r + "</p>" +
        "<div class='dato'><span class='tach'>" + p.l + "</span><strong>" + p.p + "</strong></div>" +
        "<div class='dato'>⭐ " + p.c + "</div>" +
        "<div class='dato'>" + p.m + " · entrega en " + p.e + "</div>" +
        "<div class='acc'><a class='oro' href='" + p.u + "'>Pagar de contado</a><a class='pri' href='" + p.a + "'>Pagar anticipo</a><a class='sec' href='" + wa("Hola, me interesa " + p.n + " con la promoción de apertura. Mi negocio es: ") + "'>Hablar antes</a></div>";
      hilo.appendChild(e); abajo();
    }, d || 0);
  }

  function bienvenida() {
    hilo.innerHTML = "";
    decir("Buen día. Soy Chispa, el asistente de Forja Labs. Estamos de apertura: 50 % de descuento en todo, solo durante este mes.");
    decir("¿Qué se le atora hoy?", 450);
    opciones(["Mis clientes no pueden pagarme en línea", "Se me quedan mensajes sin contestar", "Las dos cosas", "¿Hasta cuándo dura la promoción?"], 520);
  }
  function recomendar(c, intro) {
    decir(intro); ficha(c, 520);
    opciones(["Ver las otras opciones", "¿Qué gano pagando de contado?", "Quiero hablar con una persona"], 620);
  }

  function manejar(texto) {
    var t = (texto || "").trim(); if (!t) return;
    yo(t); ops.innerHTML = ""; var n = t.toLowerCase();

    if (/las dos|ambas|todo junto/.test(n)) return recomendar("combo", "Entonces le conviene el paquete completo. Con el 50 % de apertura queda en $14,000 en lugar de $28,000.");
    if (/no pueden pagarme|pagar en l|cobrar/.test(n)) return recomendar("pagina", "Eso lo resuelve la página: el cliente entra, entiende qué ofrece y paga sin llamarle.");
    if (/sin contestar|no contest|mensajes/.test(n)) return recomendar("agente", "Eso es trabajo del agente: contesta a cualquier hora y le pasa a usted solo lo que vale su tiempo.");
    if (/otras opciones|que me conviene|qué me conviene|cual me conviene|cuál me conviene/.test(n)) {
      decir("Cuatro caminos, todos con el 50 % de apertura ya aplicado:\n\n• Vender y Atender — $14,000 (lista $28,000), más $2,500 al mes. 3 semanas.\n• Solo la página — $6,000 (lista $12,000). 10 días.\n• Solo el agente — $10,000 (lista $20,000), más $2,500 al mes. 2 semanas.\n• Plataforma de alumnos — $17,500 (lista $35,000), más $2,000 al mes.\n\nDe contado se descuenta otro 10 % y su proyecto entra primero.");
      opciones(["Las dos cosas", "Solo la página", "Solo el agente", "Vendo cursos"], 520); return;
    }
    if (/^solo la página$|^solo la pagina$/.test(n)) return recomendar("pagina", "De acuerdo, solo la página.");
    if (/^solo el agente$/.test(n)) return recomendar("agente", "De acuerdo, solo el agente.");
    if (/vendo cursos/.test(n)) return recomendar("alumnos", "Para cursos y membresías, la Plataforma de alumnos.");
    if (/gano pagando de contado|que gano|qué gano/.test(n)) return manejar("contado");
    if (/proceso|cómo funciona|como funciona/.test(n)) {
      decir("Cinco pasos:\n\n1. Llamada de 30 minutos.\n2. Propuesta en 48 horas, con fecha por escrito.\n3. Construimos y entrenamos al agente con su información.\n4. Probamos un cobro real y conversaciones de prueba; usted aprueba.\n5. Entrega con manual, y dos semanas de ajustes sin costo.");
      opciones(["Ver precios", "Quiero hablar con una persona"], 520); return;
    }
    if (/ver precios/.test(n)) return manejar("precio");
    if (/hablar con una persona|hablar con alguien|persona|humano|asesor/.test(n)) {
      decir("Con gusto. JP le contesta el mismo día.");
      setTimeout(function () {
        var e = document.createElement("div"); e.className = "ficha";
        e.innerHTML = "<h4>Hablar con JP</h4><p>WhatsApp 322 310 2049 o hola@forjalabs.org.</p><div class='acc'><a class='pri' href='" + wa("Hola, vengo de la página de Forja Labs" + (S.ctx ? " y me interesa " + S.ctx : "") + " con la promoción de apertura. Mi negocio es: ") + "'>Abrir WhatsApp</a><a class='sec' href='mailto:hola@forjalabs.org'>Escribir correo</a></div>";
        hilo.appendChild(e); abajo();
      }, 450);
      return;
    }
    if (/solo tengo una duda|duda|pregunta/.test(n)) {
      decir("Adelante. Si no lo sé, se lo digo y le paso con JP.");
      opciones(["Ver precios", "¿Hasta cuándo dura?", "¿El agente puede inventar cosas?"], 420); return;
    }

    for (var i = 0; i < R.length; i++) {
      for (var j = 0; j < R[i].k.length; j++) {
        if (n.indexOf(R[i].k[j]) !== -1) {
          decir(R[i].t);
          if (R[i].p) { ficha(R[i].p, 520); opciones(["Ver las otras opciones", "Quiero hablar con una persona"], 620); }
          else { opciones(R[i].o || ["¿Qué me conviene?", "Quiero hablar con una persona"], 520); }
          return;
        }
      }
    }
    decir("Esa no me la sé con certeza, y prefiero no inventarle una respuesta. JP se la contesta bien en un par de minutos por WhatsApp.");
    opciones(["Quiero hablar con una persona", "¿Qué me conviene?", "Ver precios"], 450);
  }

  function abrir() {
    S.abierto = true; panel.classList.add("abierto"); boton.style.display = "none";
    if (!hilo.children.length) bienvenida();
    if (window.innerWidth > 480) setTimeout(function () { input.focus(); }, 120);
  }
  function cerrar() { S.abierto = false; panel.classList.remove("abierto"); boton.style.display = "flex"; }
  function enviar() { var v = input.value; input.value = ""; manejar(v); }

  boton.addEventListener("click", abrir);
  panel.querySelector(".cerrar").addEventListener("click", cerrar);
  panel.querySelector("#chispa-enviar").addEventListener("click", enviar);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") enviar(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && S.abierto) cerrar(); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-chispa]");
    if (!a) return; e.preventDefault(); abrir(); manejar(a.getAttribute("data-chispa"));
  });
})();
