/* Chispa — asistente de Forja Labs. Corre en el navegador del visitante; no envía nada a ningún servidor. */
(function () {
  "use strict";
  var WA = "523223102049";
  var P = {
    combo: { n: "Vender y Atender", r: "La página que cobra más el agente que contesta, trabajando juntos.", p: "$28,000 MXN · anticipo de $14,000 · más $2,500 al mes", e: "3 semanas", u: "https://buy.stripe.com/aFadRa4Ny3v23EN2GhgEg0w" },
    pagina: { n: "Solo la página", r: "Página profesional con cobro por tarjeta, agenda y dominio propio.", p: "$12,000 MXN · anticipo de $6,000", e: "10 días", u: "https://buy.stripe.com/eVqaEY0xi3v2grz2GhgEg0p" },
    agente: { n: "Solo el agente", r: "Atiende su WhatsApp día y noche, responde dudas y agenda citas.", p: "$20,000 MXN · anticipo de $10,000 · más $2,500 al mes", e: "2 semanas", u: "https://buy.stripe.com/9B68wQ5RC3v28Z70y9gEg0s" },
    alumnos: { n: "Plataforma de alumnos", r: "Área privada con cursos, membresías y cobro automático cada mes.", p: "$35,000 MXN · anticipo de $17,500 · más $2,000 al mes", e: "3 a 4 semanas", u: "https://buy.stripe.com/aFa9AU2Fq2qY2AJ1CdgEg0v" }
  };
  var R = [
    { k: ["precio", "cuesta", "costo", "cuanto", "cuánto", "tarifa", "presupuesto", "vale", "cobran"],
      t: "El paquete completo, página más agente, cuesta $28,000 MXN y $2,500 al mes por el agente. Por separado: la página $12,000 y el agente $20,000. Todo se paga 50 % al iniciar y 50 % al entregar.",
      o: ["¿Qué me conviene?", "¿Cuánto tardan?"] },
    { k: ["tarda", "tiempo", "cuando", "cuándo", "entrega", "plazo", "rápido", "rapido"],
      t: "El paquete completo se entrega en 3 semanas. Solo la página, en 10 días. Solo el agente, en 2 semanas. El reloj empieza el día de la llamada de arranque.",
      o: ["¿Qué me conviene?", "Ver precios"] },
    { k: ["dinero", "stripe", "tarjeta", "transferencia", "oxxo", "cobro", "cobra"],
      t: "Los cobros llegan a su propia cuenta de Stripe, conectada a su banco. Forja Labs nunca toca ese dinero. Sus clientes pueden pagar con tarjeta, transferencia y OXXO.",
      o: ["¿Qué me conviene?", "Quiero hablar con una persona"] },
    { k: ["mensual", "mensualidad", "suscrip", "renta", "iguala", "mantenimiento"],
      t: "El agente lleva $2,500 al mes porque cada conversación consume IA y hospedaje. La página no necesita mensualidad: el mantenimiento de $900 es opcional. La plataforma de alumnos lleva $2,000 al mes.",
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

  var css = "#chispa-btn{position:fixed;right:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:9px;background:var(--ember,#FF5722);color:#fff;border:0;border-radius:999px;padding:13px 19px;font:600 15px/1 'Instrument Sans',-apple-system,'Segoe UI',sans-serif;cursor:pointer;box-shadow:0 8px 26px rgba(0,0,0,.28)}#chispa-btn svg{width:18px;height:18px;fill:var(--spark,#FFC845)}#chispa-btn:hover{filter:brightness(1.07)}#chispa{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(380px,calc(100vw - 24px));height:min(610px,calc(100dvh - 24px));background:var(--bg,#EEEFF1);color:var(--ink,#15191D);border:1px solid var(--line,#D3D7DC);border-radius:16px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.32);font-family:'Instrument Sans',-apple-system,'Segoe UI',sans-serif}#chispa.abierto{display:flex}#chispa .cab{display:flex;align-items:center;gap:10px;padding:14px;background:var(--iron,#20262B);color:#F2F0EC}#chispa .cab svg{width:26px;height:26px;flex:none}#chispa .cab b{display:block;font-size:15px;font-weight:600}#chispa .cab span{display:block;font-size:12.5px;color:#A9B1B9}#chispa .cerrar{margin-left:auto;background:none;border:0;color:#A9B1B9;font-size:24px;line-height:1;cursor:pointer;padding:0 4px}#chispa .hilo{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}#chispa .m{max-width:88%;padding:11px 14px;border-radius:14px;font-size:15px;line-height:1.5}#chispa .m.bot{background:var(--paper,#F8F8F7);border:1px solid var(--line,#D3D7DC);border-bottom-left-radius:5px;align-self:flex-start;white-space:pre-line}#chispa .m.yo{background:var(--ember,#FF5722);color:#fff;border-bottom-right-radius:5px;align-self:flex-end}#chispa .ficha{align-self:flex-start;max-width:92%;background:var(--paper,#F8F8F7);border:1px solid var(--ember,#FF5722);border-radius:14px;padding:14px}#chispa .ficha h4{margin:0 0 4px;font:600 17px/1.2 'Fraunces',Georgia,serif}#chispa .ficha p{margin:0;font-size:14px;color:var(--ink-soft,#586069)}#chispa .ficha .dato{margin-top:8px;font-size:14px}#chispa .ficha .acc{margin-top:12px;display:flex;flex-wrap:wrap;gap:8px}#chispa .ficha a{text-decoration:none;font-size:14px;font-weight:600;padding:10px 14px;border-radius:8px}#chispa .ficha a.pri{background:var(--ember,#FF5722);color:#fff}#chispa .ficha a.sec{border:1px solid var(--line,#D3D7DC);color:var(--ink,#15191D)}#chispa .ops{display:flex;flex-wrap:wrap;gap:7px;padding:0 16px 8px}#chispa .ops button{background:none;border:1px solid var(--ember,#FF5722);color:var(--ember,#FF5722);border-radius:999px;padding:8px 13px;font:500 14px/1 inherit;cursor:pointer}#chispa .ops button:hover{background:var(--ember,#FF5722);color:#fff}#chispa .caja{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line,#D3D7DC);background:var(--paper,#F8F8F7)}#chispa input{flex:1;min-width:0;background:var(--bg,#fff);color:inherit;border:1px solid var(--line,#D3D7DC);border-radius:9px;padding:11px 12px;font:15px/1.3 inherit}#chispa input:focus,#chispa button:focus-visible,#chispa a:focus-visible{outline:2px solid var(--ember,#FF5722);outline-offset:2px}#chispa .enviar{background:var(--ember,#FF5722);border:0;color:#fff;border-radius:9px;padding:0 15px;font:600 15px inherit;cursor:pointer}@media (max-width:480px){#chispa{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0;border:0}}";

  var MARCA = "<svg viewBox='0 0 1080 1080' aria-hidden='true'><path d='M293 283a28 28 0 0 1 28-28h326a28 28 0 0 1 28 28v67a28 28 0 0 1-28 28H420v351a28 28 0 0 1-28 28h-71a28 28 0 0 1-28-28z' fill='#F2F0EC'/><rect x='293' y='478' width='254' height='114' rx='26' fill='#FF5722'/><path d='M712 526q14 90 100 104-86 14-100 104-14-90-100-104 86-14 100-104z' fill='#FFC845'/></svg>";
  var ICONO = "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M12 2q1.6 8 10 10-8.4 2-10 10-1.6-8-10-10 8.4-2 10-10z'/></svg>";

  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var boton = document.createElement("button");
  boton.id = "chispa-btn"; boton.type = "button";
  boton.setAttribute("aria-label", "Abrir el asistente de Forja Labs");
  boton.innerHTML = ICONO + "<span>¿Dudas? Pregúnteme</span>";
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
      e.innerHTML = "<h4>" + p.n + "</h4><p>" + p.r + "</p><div class='dato'><strong>" + p.p + "</strong></div><div class='dato'>Entrega en " + p.e + "</div><div class='acc'><a class='pri' href='" + p.u + "'>Pagar anticipo</a><a class='sec' href='" + wa("Hola, me interesa " + p.n + " de Forja Labs. Mi negocio es: ") + "'>Hablar antes</a></div>";
      hilo.appendChild(e); abajo();
    }, d || 0);
  }

  function bienvenida() {
    hilo.innerHTML = "";
    decir("Buen día. Soy Chispa, el asistente de Forja Labs. Le digo qué le conviene a su negocio y, si ya lo sabe, lo contrata en un minuto.");
    decir("¿Qué se le atora hoy?", 450);
    opciones(["Mis clientes no pueden pagarme en línea", "Se me quedan mensajes sin contestar", "Las dos cosas", "Solo tengo una duda"], 520);
  }
  function recomendar(c, intro) {
    decir(intro); ficha(c, 520);
    opciones(["Ver las otras opciones", "¿Cómo es el proceso?", "Quiero hablar con una persona"], 620);
  }

  function manejar(texto) {
    var t = (texto || "").trim(); if (!t) return;
    yo(t); ops.innerHTML = ""; var n = t.toLowerCase();

    if (/las dos|ambas|todo/.test(n)) return recomendar("combo", "Entonces le conviene el paquete completo: la página cobra mientras el agente contesta. Sale $4,000 menos que contratarlos por separado.");
    if (/no pueden pagarme|pagar en l|cobrar/.test(n)) return recomendar("pagina", "Eso lo resuelve la página: el cliente entra, entiende qué ofrece y paga sin llamarle.");
    if (/sin contestar|no contest|mensajes/.test(n)) return recomendar("agente", "Eso es trabajo del agente: contesta a cualquier hora, resuelve lo de siempre y le pasa a usted solo lo que vale su tiempo.");
    if (/otras opciones|que me conviene|qué me conviene|cual me conviene|cuál me conviene/.test(n)) {
      decir("Hay cuatro caminos:\n\n• Vender y Atender — página más agente. $28,000 y $2,500 al mes, en 3 semanas. Es el que recomendamos.\n• Solo la página — $12,000, en 10 días.\n• Solo el agente — $20,000 y $2,500 al mes, en 2 semanas.\n• Plataforma de alumnos — si vende cursos o membresías. $35,000 y $2,000 al mes.");
      opciones(["Las dos cosas", "Solo la página", "Solo el agente", "Vendo cursos"], 520); return;
    }
    if (/^solo la página$|^solo la pagina$/.test(n)) return recomendar("pagina", "De acuerdo, solo la página.");
    if (/^solo el agente$/.test(n)) return recomendar("agente", "De acuerdo, solo el agente.");
    if (/vendo cursos/.test(n)) return recomendar("alumnos", "Para cursos y membresías, la Plataforma de alumnos.");
    if (/proceso|cómo funciona|como funciona/.test(n)) {
      decir("Cinco pasos:\n\n1. Llamada de 30 minutos.\n2. Propuesta en 48 horas, con fecha por escrito.\n3. Construimos y entrenamos al agente con su información.\n4. Probamos un cobro real y conversaciones de prueba; usted aprueba.\n5. Entrega con manual, y dos semanas de ajustes sin costo.");
      opciones(["Ver precios", "Quiero hablar con una persona"], 520); return;
    }
    if (/ver precios/.test(n)) return manejar("precio");
    if (/hablar con una persona|hablar con alguien|persona|humano|asesor/.test(n)) {
      decir("Con gusto. JP le contesta el mismo día.");
      setTimeout(function () {
        var e = document.createElement("div"); e.className = "ficha";
        e.innerHTML = "<h4>Hablar con JP</h4><p>WhatsApp 322 310 2049 o hola@forjalabs.org.</p><div class='acc'><a class='pri' href='" + wa("Hola, vengo de la página de Forja Labs" + (S.ctx ? " y me interesa " + S.ctx : "") + ". Mi negocio es: ") + "'>Abrir WhatsApp</a><a class='sec' href='mailto:hola@forjalabs.org'>Escribir correo</a></div>";
        hilo.appendChild(e); abajo();
      }, 450);
      return;
    }
    if (/solo tengo una duda|duda|pregunta/.test(n)) {
      decir("Adelante. Si no lo sé, se lo digo y le paso con JP.");
      opciones(["Ver precios", "¿Cuánto tardan?", "¿El agente puede inventar cosas?"], 420); return;
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
