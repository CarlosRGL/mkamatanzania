(self["webpackChunkseizedixneuf_theme"] = self["webpackChunkseizedixneuf_theme"] || []).push([["/build/js/product"],{

/***/ "./src/js/product.js":
/*!***************************!*\
  !*** ./src/js/product.js ***!
  \***************************/
/***/ (function() {

jQuery(document).ready(function ($) {
  // on désactive le btn ajout au panier
  $("button[name='add-to-cart']").attr("disabled", true);
  $(".modal-resa-open").on('click', function (e) {
    e.preventDefault();
    if ($('#seances').length && $('#seances').val() == '') {
      alert('Veuillez sélectionner une séance.');
      return false;
    } else {
      $('.2_pour_le_prix_dune input').val(0);
      $('.avant_premiere input').val(0);
      $('.reduction_si_2_personnes input').val(0);
      $('.reduction_si_4_personnes input').val(0);
      $('.reduction_1 input').val(0);
      $('.reduction_2 input').val(0);
      $('.plein_tarif input').val(0);
      rafraichirPrix();
      MicroModal.show('modal-reservation');
    }
  });
  jQuery('.btn_nb_places').on('click', function () {
    var nb_value = parseInt(jQuery(this).parent().find('input').val());
    var nb_step = parseInt(jQuery(this).parent().find('input').attr('step'));
    var max_value = parseInt(jQuery(this).parent().find('input').attr('max'));
    if (jQuery(this).hasClass('nb_places_min')) {
      if (nb_value > 0) {
        var new_val = nb_value - nb_step;
        if (new_val < 0) {
          new_val = 0;
        }
        jQuery(this).parent().find('input').val(new_val);
      }
    } else {
      if (!isNaN(max_value) && nb_value + nb_step <= max_value) {
        jQuery(this).parent().find('input').val(nb_value + nb_step);
      } else {
        if (isNaN(max_value)) {
          jQuery(this).parent().find('input').val(nb_value + nb_step);
        }
      }
    }
    rafraichirPrix();
    return false;
  });
  $("form.cart").change(function () {
    rafraichirPrix();
  });
  $(".add_cart_modal").on('click', function (e) {
    jQuery("button[name='add-to-cart']").attr("disabled", false).trigger('click');
  });
});

//
var rafraichirPrix = function rafraichirPrix() {
  var total = 0;
  var prix_plein_tarif = $('#seances').find(":selected").attr('data-prix_plein_tarif');
  var tarif_avant_premiere = $('#seances').find(":selected").attr('data-tarif_avant_premiere');
  var reduction_si_2_personnes = $('#seances').find(":selected").attr('data-reduction_si_2_personnes');
  var tarif_reduction_si_2_personnes = (prix_plein_tarif - prix_plein_tarif * reduction_si_2_personnes / 100) * 2;
  var reduction_si_4_personnes = $('#seances').find(":selected").attr('data-reduction_si_4_personnes');
  var tarif_reduction_si_4_personnes = (prix_plein_tarif - prix_plein_tarif * reduction_si_4_personnes / 100) * 4;
  var reduction_1 = $('#seances').find(":selected").attr('data-reduction_1');
  var tarif_reduction_1 = prix_plein_tarif - prix_plein_tarif * reduction_1 / 100;
  var reduction_2 = $('#seances').find(":selected").attr('data-reduction_2');
  var tarif_reduction_2 = prix_plein_tarif - prix_plein_tarif * reduction_2 / 100;
  var nombre_de_places_plein_tarif = $('#seances').find(":selected").attr('data-nombre_de_places_plein_tarif');
  var nombre_de_places_en_tarif_avant_premiere = $('#seances').find(":selected").attr('data-nombre_de_places_en_tarif_avant_premiere');
  var nombre_de_places_2_pour_le_prix_dune = $('#seances').find(":selected").attr('data-nombre_de_places_2_pour_le_prix_dune');
  var nombre_de_places_en_reduction_si_2_personnes = $('#seances').find(":selected").attr('data-nombre_de_places_en_reduction_si_2_personnes');
  var nombre_de_places_en_reduction_si_4_personnes = $('#seances').find(":selected").attr('data-nombre_de_places_en_reduction_si_4_personnes');
  var nombre_de_places_en_reduction_1 = $('#seances').find(":selected").attr('data-nombre_de_places_en_reduction_1');
  var nombre_de_places_en_reduction_2 = $('#seances').find(":selected").attr('data-nombre_de_places_en_reduction_2');
  $('.2_pour_le_prix_dune input').attr('max', nombre_de_places_2_pour_le_prix_dune);
  $('input[name="prix_plein_tarif"').val(prix_plein_tarif);
  $('input[name="prix_plein_tarif"').val(prix_plein_tarif);
  $('.2_pour_le_prix_dune .montant').text(prix_plein_tarif);
  $('.plein_tarif .montant').text(prix_plein_tarif);
  $('.plein_tarif input').attr('max', nombre_de_places_plein_tarif);
  $('input[name="tarif_avant_premiere"').val(tarif_avant_premiere);
  $('.avant_premiere .montant').text(tarif_avant_premiere);
  $('.avant_premiere input').attr('max', nombre_de_places_en_tarif_avant_premiere);
  $('input[name="reduction_si_2_personnes"').val(tarif_reduction_si_2_personnes);
  $('.reduction_si_2_personnes .pourcentage').text(reduction_si_2_personnes);
  $('.reduction_si_2_personnes .montant').text(tarif_reduction_si_2_personnes);
  $('.reduction_si_2_personnes input').attr('max', nombre_de_places_en_reduction_si_2_personnes);
  $('input[name="reduction_si_4_personnes"').val(tarif_reduction_si_4_personnes);
  $('.reduction_si_4_personnes .pourcentage').text(reduction_si_4_personnes);
  $('.reduction_si_4_personnes .montant').text(tarif_reduction_si_4_personnes);
  $('.reduction_si_4_personnes input').attr('max', nombre_de_places_en_reduction_si_4_personnes);
  $('input[name="reduction_1"').val(tarif_reduction_1);
  $('.reduction_1 .pourcentage').text(reduction_1);
  $('.reduction_1 .montant').text(tarif_reduction_1);
  $('.reduction_1 input').attr('max', nombre_de_places_en_reduction_1);
  $('input[name="reduction_2"').val(tarif_reduction_2);
  $('.reduction_2 .pourcentage').text(reduction_2);
  $('.reduction_2 .montant').text(tarif_reduction_2);
  $('.reduction_2 input').attr('max', nombre_de_places_en_reduction_2);
  $('.2_pour_le_prix_dune').show();
  $('.avant_premiere').show();
  $('.reduction_si_2_personnes').show();
  $('.reduction_si_4_personnes').show();
  $('.reduction_1').show();
  $('.reduction_2').show();
  if (nombre_de_places_2_pour_le_prix_dune == '' || nombre_de_places_2_pour_le_prix_dune == 0) {
    $('.2_pour_le_prix_dune').hide();
  }
  if (tarif_avant_premiere == '' || tarif_avant_premiere == 0 || nombre_de_places_en_tarif_avant_premiere == '' || nombre_de_places_en_tarif_avant_premiere == 0) {
    $('.avant_premiere').hide();
  }
  if (tarif_reduction_si_2_personnes == '' || tarif_reduction_si_2_personnes == 0 || nombre_de_places_en_reduction_si_2_personnes == '' || nombre_de_places_en_reduction_si_2_personnes == 0) {
    $('.reduction_si_2_personnes').hide();
  }
  if (tarif_reduction_si_4_personnes == '' || tarif_reduction_si_4_personnes == 0 || nombre_de_places_en_reduction_si_4_personnes == '' || nombre_de_places_en_reduction_si_4_personnes == 0) {
    $('.reduction_si_4_personnes').hide();
  }
  if (tarif_reduction_1 == '' || tarif_reduction_1 == 0 || nombre_de_places_en_reduction_1 == '' || nombre_de_places_en_reduction_1 == 0) {
    $('.reduction_1').hide();
  }
  if (tarif_reduction_2 == '' || tarif_reduction_2 == 0 || nombre_de_places_en_reduction_2 == '' || nombre_de_places_en_reduction_2 == 0) {
    $('.reduction_2').hide();
  }
  var total_plein_tarif = prix_plein_tarif * $('.plein_tarif input').val();
  var total_2_pour_le_prix_dune = prix_plein_tarif * $('.2_pour_le_prix_dune input').val() / 2;
  var total_avant_premiere = tarif_avant_premiere * $('.avant_premiere input').val();
  var total_reduction_si_2_personnes = tarif_reduction_si_2_personnes * $('.reduction_si_2_personnes input').val() / 2;
  var total_reduction_si_4_personnes = tarif_reduction_si_4_personnes * $('.reduction_si_4_personnes input').val() / 4;
  var total_reduction_1 = tarif_reduction_1 * $('.reduction_1 input').val();
  var total_reduction_2 = tarif_reduction_2 * $('.reduction_2 input').val();
  total = total_plein_tarif + total_2_pour_le_prix_dune + total_avant_premiere + total_reduction_si_2_personnes + total_reduction_si_4_personnes + total_reduction_1 + total_reduction_2;
  $('input[name="nombre_de_places_plein_tarif"').val($('.plein_tarif input').val());
  $('input[name="nombre_de_places_2_pour_le_prix_dune"').val($('.2_pour_le_prix_dune input').val());
  $('input[name="nombre_de_places_en_tarif_avant_premiere"').val($('.avant_premiere input').val());
  $('input[name="nombre_de_places_en_reduction_si_2_personnes"').val($('.reduction_si_2_personnes input').val());
  $('input[name="nombre_de_places_en_reduction_si_4_personnes"').val($('.reduction_si_4_personnes input').val());
  $('input[name="nombre_de_places_en_reduction_1"').val($('.reduction_1 input').val());
  $('input[name="nombre_de_places_en_reduction_2"').val($('.reduction_2 input').val());
  $('input[name="total"').val(total);
  $('.total .montant').text(total);
};
window.rafraichirPrix = rafraichirPrix;

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("./src/js/product.js"));
/******/ }
]);
//# sourceMappingURL=product.js.map