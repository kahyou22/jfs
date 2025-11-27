$(() => {
  function isInView(selector) {
    const $el = $(selector);
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const topVar = parseInt($el.css("top")) || 0;
    const y = $el.offset().top - topVar;
    const h = $el.outerHeight();

    return scrollTop > y - windowHeight && scrollTop < y + h;
  }

  function viewIf(selector, enterCallback, leaveCallback) {
    // 화면 안에 들어오면 true, 아니면 false지만
    // 초기 처음 불러왔을때 콜백 실행을 하기 위해서 반대되는 값으로 세팅
    let joined = !isInView(selector);

    function scroller() {
      if (isInView(selector)) {
        if (!joined) {
          joined = true;
          enterCallback();
        }
      } else if (joined) {
        joined = false;
        leaveCallback();
      }
    }
    $(window).scroll(scroller);
    scroller();
  }

  function startCounter(selector, onCount = (count) => {}) {
    const $el = $(selector);
    const targetCount = parseInt($el.attr("data-count"));
    const interval = parseInt($el.attr("data-interval")) || 50;
    const duration =
      parseInt($el.attr("data-duration")) || targetCount * interval;
    const step = targetCount / (duration / interval);

    let current = 0;

    const counterId = setInterval(() => {
      current += step;

      if (current >= targetCount) {
        cancelCounter(counterId);
        current = targetCount;
      }

      onCount(Math.floor(current));
    }, interval);

    return counterId;
  }

  function cancelCounter(counterId) {
    clearInterval(counterId);
    return null;
  }

  $("[data-count]").each((i, el) => {
    const $el = $(el);
    let counterId = null;

    viewIf(
      el,
      () => {
        counterId = startCounter(el, (count) => {
          $el.addClass("active");
          $el.text(count);
        });
      },
      () => {
        counterId = cancelCounter(counterId);
        $el.removeClass("active");
        $el.text(0);
      }
    );
  });

  $("#about .motion").each((i, el) => {
    const $el = $(el);
    const easing = "easeOutExpo";
    const speed = 2000;
    const h = $el.outerHeight();

    viewIf(
      el,
      () => {
        $el
          .stop()
          .animate({ top: 0, opacity: 1 }, (speed * (i + 1)) / 2, easing);
      },
      () => {
        $el.stop().animate({ top: h, opacity: 0 }, speed, easing);
      }
    );
  });

  // (() => {
  //   const container = $("#about .basic");
  //   const easing = "easeOutExpo";
  //   const speed = 2000;

  //   viewIf(
  //     container,
  //     () => {
  //       $(".motion").each((i, el) => {
  //         const $el = $(el);
  //         $el
  //           .stop()
  //           .animate({ top: 0, opacity: 1 }, (speed * (i + 1)) / 2, easing);
  //       });
  //     },
  //     () => {
  //       $(".motion").each((i, el) => {
  //         const $el = $(el);
  //         $el.stop().animate({ top: 1000, opacity: 0 }, speed, easing);
  //       });
  //     }
  //   );
  // })();

  $("#work .motion").each((i, el) => {
    const $el = $(el);
    const speed = 1000,
      easing = "easeOutExpo",
      pos = 0;
    const h = $el.outerHeight();

    viewIf(
      el,
      () => {
        $el
          .stop()
          .animate({ top: pos, opacity: 1 }, (speed * (i + 1)) / 2, easing);
      },
      () => {
        $el.stop().animate({ top: pos + h, opacity: 0 }, speed, easing);
      }
    );
  });

  $(window).scroll(function () {
    let scrollTop = $(window).scrollTop();
    if (scrollTop > 0) {
      $("#header").addClass("active");
    } else {
      $("#header").removeClass("active");
    }
  });
});
