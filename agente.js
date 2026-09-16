/* Chispa — asistente de Forja Labs
   Atiende dudas en la página, recomienda el paquete correcto y lleva al pago o a WhatsApp.
   No necesita servidor: todo corre en el navegador del visitante. */
(function () {
  "use strict";

  var WHATSAPP = "523223102049";
  var PAQUETES = {
    presencia: {
      nombre: "Presencia que cobra",
      resumen: "Una página profesional con cobro por tarjeta, agenda y dominio propio.",
      precio: "Desde $12,000 MXN, anticipo de $6,000",
      entrega: "10 días",
      pago: "https://buy.stripe.com/eVqaEY0xi3v2grz2GhgEg0p"
    },
    plataforma: {
      nombre: "Plataforma de alumnos",
      resumen: "Área privada con cursos, membresías y cobro automático cada mes.",
      precio: "Desde $35,000 MXN, anticipo de $17,500, más $2,000 al mes",
      entrega: "3 a 4 semanas",
      pago: "https://buy.stripe.com/aFa9AU2Fq2qY2AJ1CdgEg0v"
    },
    agente: {
      nombre: "Agente de IA",
      resumen: "Atiende su WhatsApp día y noche, responde dudas y agenda citas.",
      precio: "Desde $20,000 MXN, anticipo de $10,000, más $2,500 al mes",
      entrega: "2 a 3 semanas",
      pago: "https://buy.stripe.com/9B68wQ5RC3v28Z70y9gEg0s"
    }
  };

  var RESPUESTAS = [
    { k: ["precio", "cuesta", "costo", "cuanto", "cuánto", "tarifa", "presupuesto", "vale"],
      t: "Los precios de partida son: página con cobros desde $12,000 MXN, plataforma de alumnos desde $35,000 y agente de IA desde $20,000. Todos se pagan 50 % al iniciar y 50 % al entregar. Si su proyecto necesita más de lo que incluye el paquete, se lo decimos antes de cobrar.",
      o: ["¿Cuál me conviene?", "¿Cuánto tardan?"] },
    { k: ["tarda", "tiempo", "cuando", "cuándo", "entrega", "plazo", "rapido", "rápido"],
      t: "La página con cobros se entrega en 10 días. La plataforma de alumnos en 3 a 4 semanas. El agente de IA en 2 a 3 semanas. El reloj empieza el día de la llamada de arranque.",
      o: ["¿Cuál me conviene?", "Ver precios"] },
    { k: ["dinero", "cobro", "cobra", "stripe", "pago", "pagos", "tarjeta", "deposit"],
      t: "Los cobros de sus clientes llegan a su propia cuenta de Stripe, conectada a su banco. Forja Labs nunca toca ese dinero. Aceptan tarjeta, y en México también transferencia y OXXO.",
      o: ["¿Cuál me conviene?", "Quiero hablar con una persona"] },
    { k: ["mantenimiento", "mensual", "mensualidad", "suscrip", "renta"],
      t: "La página sencilla no necesita mensualidad; es opcional desde $900 al mes si quiere que nosotros hagamos los cambios. La plataforma de alumnos lleva $2,000 al mes y el agente de IA $2,500, porque siguen consumiendo hospedaje y, en el caso del agente, el costo de cada conversación.",
      o: ["¿Cuál me conviene?", "Ver precios"] },
    { k: ["dominio", "hosting", "servidor", "pagina web", "página web"],
      t: "El dominio y el hospedaje van incluidos y quedan a su nombre, no al nuestro. Si algún día quiere llevarse el sitio a otro lado, puede hacerlo sin pedirnos permiso.",
      o: ["¿Cuál me conviene?", "Quiero hablar con una persona"] },
    { k: ["curso", "alumno", "membresia", "membresía", "clases", "escuela", "instituto", "taller"],
      t: "Eso es la Plataforma de alumnos: área privada, catálogo de cursos, membresías con cobro automático y baja automática de quien deja de pagar. Desde $35,000 MXN más $2,000 al mes, lista en 3 a 4 semanas.",
      p: "plataforma" },
    { k: ["whatsapp", "contestar", "responder", "bot", "agente", "chatbot", "automatiz", "inteligencia", "ia"],
      t: "Eso es el Agente de IA: atiende su WhatsApp o su página día y noche, responde las preguntas de siempre, agenda citas y le pasa la conversación cuando hace falta. Desde $20,000 MXN más $2,500 al mes, listo en 2 a 3 semanas.",
      p: "agente" },
    { k: ["cita", "agenda", "reserva", "calendario"],
      t: "Sí. La página incluye agenda o formulario de contacto, y el agente de IA puede agendar citas directamente en su calendario mientras conversa con el cliente.",
      o: ["¿Cuál me conviene?", "Quiero hablar con una persona"] },
    { k: ["tecnolog", "complicado", "dificil", "difícil", "sé nada", "se nada", "no entiendo"],
      t: "No necesita saber nada de tecnología. Usted cuenta su negocio y aprueba el diseño; nosotros hacemos el resto y le entregamos un manual sencillo para cambiar textos, precios y fotos usted mismo.",
      o: ["¿Cuál me conviene?", "Quiero hablar con una persona"] },
    { k: ["garantia", "garantía", "no me gusta", "devolucion", "devolución", "reembolso"],
      t: "El diseño lo ve antes de que construyamos nada. Si en esa propuesta no hay acuerdo, no se paga el segundo 50 % y ahí termina el compromiso.",
      o: ["¿Cuál me conviene?", "Quiero hablar con una persona"] },
    { k: ["quien", "quién", "forja", "ustedes", "empresa", "experiencia"],
      t: "Forja Labs es un estudio mexicano de desarrollo: sitios, plataformas de cursos y automatización con IA. Trabajamos con precio fijo y fecha de entrega por escrito, y todo queda a nombre del cliente.",
      o: ["¿Cuál me conviene?", "Ver precios"] },
    { k: ["factura", "fiscal", "iva", "sat"],
      t: "Sobre facturación y temas fiscales prefiero no improvisar: eso lo ve JP directamente con usted. ¿Le paso al WhatsApp?",
      o: ["Quiero hablar con una persona"] }
  ];

  var estado = { abierto: false, contexto: "" };

  var css = [
    "#chispa-btn{position:fixed;right:18px;bottom:18px;z-index:9998;display:flex;align-items:center;gap:9px;background:var(--ember,#FF5722);color:#fff;border:0;border-radius:999px;padding:13px 19px;font:600 15px/1 'Instrument Sans',-apple-system,'Segoe UI',sans-serif;cursor:pointer;box-shadow:0 8px 26px rgba(0,0,0,.28)}",
    "#chispa-btn svg{width:18px;height:18px;fill:var(--spark,#FFC845)}",
    "#chispa-btn:hover{filter:brightness(1.07)}",
    "#chispa{position:fixed;right:18px;bottom:18px;z-index:9999;width:min(380px,calc(100vw - 24px));height:min(600px,calc(100dvh - 24px));background:var(--bg,#EEEFF1);color:var(--ink,#15191D);border:1px solid var(--line,#D3D7DC);border-radius:16px;display:none;flex-direction:column;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.32);font-family:'Instrument Sans',-apple-system,'Segoe UI',sans-serif}",
    "#chispa.abierto{display:flex}",
    "#chispa .cab{display:flex;align-items:center;gap:10px;padding:14px 14px;background:var(--iron,#20262B);color:#F2F0EC}",
    "#chispa .cab svg{width:26px;height:26px;flex:none}",
    "#chispa .cab b{display:block;font-size:15px;font-weight:600}",
    "#chispa .cab span{display:block;font-size:12.5px;color:#A9B1B9}",
    "#chispa .cerrar{margin-left:auto;background:none;border:0;color:#A9B1B9;font-size:24px;line-height:1;cursor:pointer;padding:0 4px}",
    "#chispa .hilo{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}",
    "#chispa .m{max-width:88%;padding:11px 14px;border-radius:14px;font-size:15px;line-height:1.5}",
    "#chispa .m.bot{background:var(--paper,#F8F8F7);border:1px solid var(--line,#D3D7DC);border-bottom-left-radius:5px;align-self:flex-start;white-space:pre-line}",
    "#chispa .m.yo{background:var(--ember,#FF5722);color:#fff;border-bottom-right-radius:5px;align-self:flex-end}",
    "#chispa .ficha{align-self:flex-start;max-width:92%;background:var(--paper,#F8F8F7);border:1px solid var(--ember,#FF5722);border-radius:14px;padding:14px}",
    "#chispa .ficha h4{margin:0 0 4px;font:600 17px/1.2 'Fraunces',Georgia,serif}",
    "#chispa .ficha p{margin:0;font-size:14px;color:var(--ink-soft,#586069)}",
    "#chispa .ficha .dato{margin-top:8px;font-size:14px}",
    "#chispa .ficha .acc{margin-top:12px;display:flex;flex-wrap:wrap;gap:8px}",
    "#chispa .ficha a{text-decoration:none;font-size:14px;font-weight:600;padding:10px 14px;border-radius:8px}",
    "#chispa .ficha a.pri{background:var(--ember,#FF5722);color:#fff}",
    "#chispa .ficha a.sec{border:1px solid var(--line,#D3D7DC);color:var(--ink,#15191D)}",
    "#chispa .ops{display:flex;flex-wrap:wrap;gap:7px;padding:0 16px 8px}",
    "#chispa .ops button{background:none;border:1px solid var(--ember,#FF5722);color:var(--ember,#FF5722);border-radius:999px;padding:8px 13px;font:500 14px/1 inherit;cursor:pointer}",
    "#chispa .ops button:hover{background:var(--ember,#FF5722);color:#fff}",
    "#chispa .caja{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line,#D3D7DC);background:var(--paper,#F8F8F7)}",
    "#chispa input{flex:1;min-width:0;background:var(--bg,#fff);color:inherit;border:1px solid var(--line,#D3D7DC);border-radius:9px;padding:11px 12px;font:15px/1.3 inherit}",
    "#chispa input:focus,#chispa button:focus-visible,#chispa a:focus-visible{outline:2px solid var(--ember,#FF5722);outline-offset:2px}",
    "#chispa .enviar{background:var(--ember,#FF5722);border:0;color:#fff;border-radius:9px;padding:0 15px;font:600 15px inherit;cursor:pointer}",
    "@media (max-width:480px){#chispa{right:0;bottom:0;width:100vw;height:100dvh;border-radius:0;border:0}}"
  ].join("");

  var MARCA = "<svg viewBox='0 0 1080 1080' aria-hidden='true'><path d='M293 283a28 28 0 0 1 28-28h326a28 28 0 0 1 28 28v67a28 28 0 0 1-28 28H420v351a28 28 0 0 1-28 28h-71a28 28 0 0 1-28-28z' fill='#F2F0EC'/><rect x='293' y='478' width='254' height='114' rx='26' fill='#FF5722'/><path d='M712 526q14 90 100 104-86 14-100 104-14-90-100-104 86-14 100-104z' fill='#FFC845'/></svg>";
  var CHISPA_ICONO = "<svg viewBox='0 0 24 24' aria-hidden='true'><path d='M12 2q1.6 8 10 10-8.4 2-10 10-1.6-8-10-10 8.4-2 10-10z'/></svg>";

  var estilo = document.createElement("style");
  estilo.textContent = css;
  document.head.appendChild(estilo);

  var boton = document.createElement("button");
  boton.id = "chispa-btn";
  boton.type = "button";
  boton.setAttribute("aria-label", "Abrir el asistente de Forja Labs");
  boton.innerHTML = CHISPA_ICONO + "<span>¿Dudas? Pregúnteme</span>";
  document.body.appendChild(boton);

  var panel = document.createElement("div");
  panel.id = "chispa";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Asistente de Forja Labs");
  panel.innerHTML =
    "<div class='cab'>" + MARCA + "<div><b>Chispa</b><span>Asistente de Forja Labs</span></div>" +
    "<button class='cerrar' type='button' aria-label='Cerrar'>&times;</button></div>" +
    "<div class='hilo' id='chispa-hilo' aria-live='polite'></div>" +
    "<div class='ops' id='chispa-ops'></div>" +
    "<div class='caja'><input id='chispa-input' type='text' placeholder='Escriba su pregunta…' autocomplete='off'>" +
    "<button class='enviar' type='button' id='chispa-enviar'>Enviar</button></div>";
  document.body.appendChild(panel);

  var hilo = panel.querySelector("#chispa-hilo");
  var ops = panel.querySelector("#chispa-ops");
  var input = panel.querySelector("#chispa-input");

  function wa(texto) {
    return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
  }
  function abajo() { hilo.scrollTop = hilo.scrollHeight; }

  function decir(texto, retraso) {
    setTimeout(function () {
      var d = document.createElement("div");
      d.className = "m bot";
      d.textContent = texto;
      hilo.appendChild(d);
      abajo();
    }, retraso || 0);
  }
  function usuario(texto) {
    var d = document.createElement("div");
    d.className = "m yo";
    d.textContent = texto;
    hilo.appendChild(d);
    abajo();
  }
  function opciones(lista, retraso) {
    setTimeout(function () {
      ops.innerHTML = "";
      (lista || []).forEach(function (t) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = t;
        b.addEventListener("click", function () { manejar(t); });
        ops.appendChild(b);
      });
      abajo();
    }, retraso || 0);
  }
  function ficha(clave, retraso) {
    var p = PAQUETES[clave];
    estado.contexto = p.nombre;
    setTimeout(function () {
      var d = document.createElement("div");
      d.className = "ficha";
      d.innerHTML =
        "<h4>" + p.nombre + "</h4><p>" + p.resumen + "</p>" +
        "<div class='dato'><strong>" + p.precio + "</strong></div>" +
        "<div class='dato'>Entrega en " + p.entrega + "</div>" +
        "<div class='acc'><a class='pri' href='" + p.pago + "'>Pagar anticipo</a>" +
        "<a class='sec' href='" + wa("Hola, me interesa el paquete " + p.nombre + " de Forja Labs. Mi negocio es: ") + "'>Hablar antes</a></div>";
      hilo.appendChild(d);
      abajo();
    }, retraso || 0);
  }

  function bienvenida() {
    hilo.innerHTML = "";
    decir("Buen día. Soy Chispa, el asistente de Forja Labs. Le ayudo a encontrar qué le conviene y, si ya lo sabe, a contratarlo en un minuto.");
    decir("¿Qué se le atora hoy en su negocio?", 450);
    opciones([
      "Quiero cobrar en línea",
      "Vendo cursos o membresías",
      "Pierdo clientes por no contestar",
      "Solo tengo una duda"
    ], 500);
  }

  function recomendar(clave, intro) {
    decir(intro);
    ficha(clave, 500);
    opciones(["Ver los otros paquetes", "¿Cómo es el proceso?", "Quiero hablar con una persona"], 600);
  }

  function manejar(texto) {
    var t = (texto || "").trim();
    if (!t) return;
    usuario(t);
    ops.innerHTML = "";
    var n = t.toLowerCase();

    if (/cobrar en l|^quiero cobrar/.test(n)) {
      return recomendar("presencia", "Entonces lo suyo es la página que cobra: el cliente entra, entiende qué ofrece y paga sin llamarle.");
    }
    if (/cursos o membres/.test(n)) {
      return recomendar("plataforma", "Le conviene la Plataforma de alumnos: sus estudiantes pagan, entran y estudian solos, y quien deja de pagar pierde el acceso sin que usted intervenga.");
    }
    if (/no contestar|pierdo clientes/.test(n)) {
      return recomendar("agente", "Ese es trabajo para el Agente de IA: contesta a cualquier hora, resuelve lo de siempre y le pasa a usted solo lo que vale su tiempo.");
    }
    if (/otros paquetes|ver los otros|cual me conviene|cuál me conviene/.test(n)) {
      decir("Forja Labs hace tres cosas:\n\n• Presencia que cobra — página con pagos y agenda. Desde $12,000, en 10 días.\n• Plataforma de alumnos — cursos y membresías con cobro automático. Desde $35,000 más $2,000 al mes, en 3 a 4 semanas.\n• Agente de IA — atiende su WhatsApp día y noche. Desde $20,000 más $2,500 al mes, en 2 a 3 semanas.");
      opciones(["Quiero cobrar en línea", "Vendo cursos o membresías", "Pierdo clientes por no contestar"], 500);
      return;
    }
    if (/proceso|como funciona|cómo funciona/.test(n)) {
      decir("Cuatro pasos:\n\n1. Llamada de 30 minutos para entender su negocio.\n2. Propuesta en 48 horas, con alcance y fecha por escrito.\n3. Construimos y probamos un cobro real con usted.\n4. Entrega con manual. Todo queda a su nombre.");
      opciones(["Ver precios", "Quiero hablar con una persona"], 500);
      return;
    }
    if (/ver precios/.test(n)) {
      return manejar("precio");
    }
    if (/hablar con una persona|hablar con alguien|persona|humano|asesor/.test(n)) {
      decir("Con gusto. JP le contesta el mismo día.");
      setTimeout(function () {
        var d = document.createElement("div");
        d.className = "ficha";
        d.innerHTML = "<h4>Hablar con JP</h4><p>Escríbale por WhatsApp al 322 310 2049 o a hola@forjalabs.org.</p>" +
          "<div class='acc'><a class='pri' href='" + wa("Hola, vengo de la página de Forja Labs" + (estado.contexto ? " y me interesa el paquete " + estado.contexto : "") + ". Mi negocio es: ") + "'>Abrir WhatsApp</a>" +
          "<a class='sec' href='mailto:hola@forjalabs.org'>Escribir correo</a></div>";
        hilo.appendChild(d);
        abajo();
      }, 450);
      return;
    }
    if (/solo tengo una duda|duda|pregunta/.test(n)) {
      decir("Adelante, pregúnteme lo que sea. Si no lo sé, se lo digo y le paso con JP.");
      opciones(["Ver precios", "¿Cuánto tardan?", "¿A dónde llega el dinero?"], 400);
      return;
    }

    for (var i = 0; i < RESPUESTAS.length; i++) {
      var r = RESPUESTAS[i];
      for (var j = 0; j < r.k.length; j++) {
        if (n.indexOf(r.k[j]) !== -1) {
          decir(r.t);
          if (r.p) { ficha(r.p, 500); opciones(["Ver los otros paquetes", "Quiero hablar con una persona"], 600); }
          else { opciones(r.o || ["¿Cuál me conviene?", "Quiero hablar con una persona"], 500); }
          return;
        }
      }
    }

    decir("Esa no me la sé con certeza, y prefiero no inventarle una respuesta. JP se la contesta bien en un par de minutos por WhatsApp.");
    opciones(["Quiero hablar con una persona", "¿Cuál me conviene?", "Ver precios"], 450);
  }

  function abrir() {
    estado.abierto = true;
    panel.classList.add("abierto");
    boton.style.display = "none";
    if (!hilo.children.length) bienvenida();
    if (window.innerWidth > 480) setTimeout(function () { input.focus(); }, 120);
  }
  function cerrar() {
    estado.abierto = false;
    panel.classList.remove("abierto");
    boton.style.display = "flex";
  }
  function enviar() {
    var v = input.value;
    input.value = "";
    manejar(v);
  }

  boton.addEventListener("click", abrir);
  panel.querySelector(".cerrar").addEventListener("click", cerrar);
  panel.querySelector("#chispa-enviar").addEventListener("click", enviar);
  input.addEventListener("keydown", function (e) { if (e.key === "Enter") enviar(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && estado.abierto) cerrar(); });

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-chispa]");
    if (!a) return;
    e.preventDefault();
    abrir();
    manejar(a.getAttribute("data-chispa"));
  });
})();
