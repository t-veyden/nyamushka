// POLYFILL for 'closest' method

if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i,
      el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));
    return el;
  };
}

// Product Card

(function() {
  var domStrings = {
    cardsSection: ".section",
    card: ".product-card",
    cardBtn: "product-card__btn",
    cardSelected: "product-card--selected"
  };

  var eventHandler = function(target, el, state) {
    target.addEventListener(
      "mouseleave",
      function(evt) {
        state
          ? el.classList.add("hover-selected")
          : el.classList.add("hover-default");

        target.removeEventListener(evt.type, arguments.callee);
      },
      false
    );
  };

  var cardHandler = function(evt) {
    var card = evt.target.closest(domStrings.card);
    var btn = evt.target.classList.contains(domStrings.cardBtn);

    if (card || btn) {
      var cardWrapper = card.firstElementChild;
      var defaultHover = cardWrapper.classList.contains("hover-default");
      var hoverType = defaultHover ? "default" : "selected";

      card.classList.toggle(domStrings.cardSelected);

      cardWrapper.classList.remove("hover-" + hoverType);
    }

    eventHandler(card, cardWrapper, defaultHover);
  };

  document
    .querySelector(domStrings.cardsSection)
    .addEventListener("click", cardHandler);
})();
