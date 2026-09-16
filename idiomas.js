/* Selector de idioma de Forja Labs. El espanol vive en el HTML; los demas idiomas se descargan solo si el visitante los pide. */
(function () {
  "use strict";
  var RTL = { ar: 1, ur: 1 };
  var SOPORTADOS = ["es", "en", "zh", "hi", "ar", "bn", "pt", "ru", "fr", "ur"];
  var WA_TEXTO = {
    es: "Hola, vi la p\u00e1gina de Forja Labs y me interesa que mi negocio venda y atienda solo. Mi negocio es: ",
    en: "Hello, I saw the Forja Labs page and I want my business to sell and reply on its own. My business is: ",
    zh: "\u4f60\u597d\uff0c\u6211\u770b\u4e86 Forja Labs \u7684\u9875\u9762\uff0c\u5e0c\u671b\u6211\u7684\u751f\u610f\u80fd\u81ea\u52a8\u9500\u552e\u548c\u56de\u590d\u3002\u6211\u7684\u751f\u610f\u662f\uff1a",
    hi: "\u0928\u092e\u0938\u094d\u0924\u0947, \u092e\u0948\u0902\u0928\u0947 Forja Labs \u0915\u093e \u092a\u0947\u091c \u0926\u0947\u0916\u093e\u0964 \u092e\u0948\u0902 \u091a\u093e\u0939\u0924\u093e \u0939\u0942\u0901 \u0915\u093f \u092e\u0947\u0930\u093e \u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0916\u0941\u0926 \u092c\u093f\u0915\u094d\u0930\u0940 \u0914\u0930 \u091c\u0935\u093e\u092c \u0926\u0947\u0964 \u092e\u0947\u0930\u093e \u0935\u094d\u092f\u0935\u0938\u093e\u092f \u0939\u0948: ",
    ar: "\u0645\u0631\u062d\u0628\u064b\u0627\u060c \u0627\u0637\u0644\u0639\u062a \u0639\u0644\u0649 \u0635\u0641\u062d\u0629 Forja Labs \u0648\u0623\u0631\u063a\u0628 \u0641\u064a \u0623\u0646 \u064a\u0628\u064a\u0639 \u0645\u0634\u0631\u0648\u0639\u064a \u0648\u064a\u0631\u062f \u062a\u0644\u0642\u0627\u0626\u064a\u064b\u0627. \u0645\u0634\u0631\u0648\u0639\u064a \u0647\u0648: ",
    bn: "\u09b9\u09cd\u09af\u09be\u09b2\u09cb, \u0986\u09ae\u09bf Forja Labs \u098f\u09b0 \u09aa\u09c3\u09b7\u09cd\u09a0\u09be \u09a6\u09c7\u0996\u09c7\u099b\u09bf\u0964 \u0986\u09ae\u09bf \u099a\u09be\u0987 \u0986\u09ae\u09be\u09b0 \u09ac\u09cd\u09af\u09ac\u09b8\u09be \u09a8\u09bf\u099c\u09c7\u0987 \u09ac\u09bf\u0995\u09cd\u09b0\u09bf \u0993 \u0989\u09a4\u09cd\u09a4\u09b0 \u09a6\u09bf\u0995\u0964 \u0986\u09ae\u09be\u09b0 \u09ac\u09cd\u09af\u09ac\u09b8\u09be: ",
    pt: "Ol\u00e1, vi a p\u00e1gina da Forja Labs e quero que meu neg\u00f3cio venda e atenda sozinho. Meu neg\u00f3cio \u00e9: ",
    ru: "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u042f \u0432\u0438\u0434\u0435\u043b \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443 Forja Labs \u0438 \u0445\u043e\u0447\u0443, \u0447\u0442\u043e\u0431\u044b \u043c\u043e\u0439 \u0431\u0438\u0437\u043d\u0435\u0441 \u043f\u0440\u043e\u0434\u0430\u0432\u0430\u043b \u0438 \u043e\u0442\u0432\u0435\u0447\u0430\u043b \u0441\u0430\u043c. \u041c\u043e\u0439 \u0431\u0438\u0437\u043d\u0435\u0441: ",
    fr: "Bonjour, j'ai vu la page de Forja Labs et je veux que mon entreprise vende et r\u00e9ponde toute seule. Mon activit\u00e9 est : ",
    ur: "\u0633\u0644\u0627\u0645\u060c \u0645\u06cc\u06ba \u0646\u06d2 Forja Labs \u06a9\u0627 \u0635\u0641\u062d\u06c1 \u062f\u06cc\u06a9\u06be\u0627\u06d4 \u0645\u06cc\u06ba \u0686\u0627\u06c1\u062a\u0627 \u06c1\u0648\u06ba \u06a9\u06c1 \u0645\u06cc\u0631\u0627 \u06a9\u0627\u0631\u0648\u0628\u0627\u0631 \u062e\u0648\u062f \u0628\u06a9\u06d2 \u0627\u0648\u0631 \u062c\u0648\u0627\u0628 \u062f\u06d2\u06d4 \u0645\u06cc\u0631\u0627 \u06a9\u0627\u0631\u0648\u0628\u0627\u0631 \u06c1\u06d2: "
  };

  var sel = document.getElementById("idioma");
  if (!sel) return;
  var original = null;

  function guardarOriginal() {
    if (original) return;
    original = {};
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      original[el.getAttribute("data-i18n")] = el.textContent;
    });
  }

  function aplicar(dic, lang) {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dic[k]) el.textContent = dic[k];
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL[lang] ? "rtl" : "ltr";
    if (window.FL) {
      window.FL.texto = WA_TEXTO[lang] || WA_TEXTO.es;
      if (typeof window.flEnlaces === "function") window.flEnlaces();
    }
    if (typeof window.chispaIdioma === "function") window.chispaIdioma(lang, dic);
    try { localStorage.setItem("fl-idioma", lang); } catch (e) {}
  }

  function cambiar(lang) {
    guardarOriginal();
    if (SOPORTADOS.indexOf(lang) === -1) lang = "es";
    if (lang === "es") { aplicar(original, "es"); return; }
    sel.disabled = true;
    fetch("/i18n/" + lang + ".json")
      .then(function (r) { if (!r.ok) throw new Error("no disponible"); return r.json(); })
      .then(function (d) { aplicar(d, lang); })
      .catch(function () { aplicar(original, "es"); sel.value = "es"; })
      .then(function () { sel.disabled = false; });
  }

  sel.addEventListener("change", function () { cambiar(sel.value); });

  var inicial = null;
  try { inicial = localStorage.getItem("fl-idioma"); } catch (e) {}
  if (!inicial) {
    var nav = (navigator.language || "es").slice(0, 2).toLowerCase();
    if (SOPORTADOS.indexOf(nav) !== -1) inicial = nav;
  }
  if (inicial && inicial !== "es") { sel.value = inicial; cambiar(inicial); }
})();
