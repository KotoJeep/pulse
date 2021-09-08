$(document).ready(function () {
  $(".carousel_inner").slick({
    infinite: true,
    speed: 300,
    adaptiveHeight: true,
    autoplay: false,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: "linear",
    prevArrow: '<button type="button" class="prev"><img src="icons/prev.png"></button>',
    nextArrow: '<button type="button" class="next"><img src="icons/next.png"></button>',
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $("ul.catalog_tabs").on("click", "li:not(.catalog_tab_active)", function () {
    $(this)
      .addClass("catalog_tab_active")
      .siblings()
      .removeClass("catalog_tab_active")
      .closest("div.container")
      .find("div.catalog_content")
      .removeClass("catalog_content_active")
      .eq($(this).index())
      .addClass("catalog_content_active");
  });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-item_content").eq(i).toggleClass("catalog-item_content_active");
        $(".catalog-item_list").eq(i).toggleClass("catalog-item_list_active");
      });
    });
  }

  toggleSlide(".catalog-item_link");
  toggleSlide(".catalog-item_back");

  //modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal_close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  $(".catalog-item_btn").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal_descr").text($(".catalog-item_subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  function validateForm(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },

      messages: {
        name: "Пожалуйста введите своё имя",
        phone: "Пожалуйста введите свой номер телефона",
        email: {
          required: "Нам нужен ваш email, чтобы связаться с вами",
          email: "Неправильно введен адрес почты",
        },
      },
    });
  }

  validateForm("#consultation-form");
  validateForm("#consultation form");
  validateForm("#order form");

  $("input[name=phone]").mask("+7 (999) 999-9999");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn("slow");
      $("form").trigger("reset");
    });
    return false;
  });

  // scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  $("a[href^=#up]").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  new WOW().init();
});
