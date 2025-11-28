$(() => {
  const defaultViewOption = {
    offsetTop: 0,
    offsetBottom: 0,
    checkTop: true,
    checkBottom: true,
  };

  function isInView(selector, opts = defaultViewOption) {
    const $el = $(selector);
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const topVar = parseInt($el.css("top")) || 0;
    const y = $el.offset().top - topVar;
    const h = $el.outerHeight();

    opts = { ...defaultViewOption, ...opts };

    const checkTop = scrollTop > y - windowHeight + opts.offsetTop;
    const checkBottom = scrollTop < y + h + opts.offsetBottom;

    if (opts.checkTop && opts.checkBottom) {
      return checkTop && checkBottom;
    } else if (opts.checkTop) {
      return checkTop;
    } else if (opts.checkBottom) {
      return checkBottom;
    }
  }

  const scrollHandles = [];

  $(window).scroll(
    $.throttle(100, () => {
      scrollHandles.forEach((handler, i) => {
        handler();
      });
    })
  );

  function viewIf(
    selector,
    enterCallback,
    leaveCallback,
    opts = defaultViewOption
  ) {
    // 화면 안에 들어오면 true, 아니면 false지만
    // 초기 처음 불러왔을때 콜백 실행을 하기 위해서 반대되는 값으로 세팅
    let joined = !isInView(selector, opts);

    function end() {
      const idx = scrollHandles.indexOf(scroller);
      scrollHandles.splice(idx, 1);
    }

    function scroller() {
      if (isInView(selector, opts)) {
        if (!joined) {
          joined = true;
          if (enterCallback) enterCallback(end);
        }
      } else if (joined) {
        joined = false;
        if (leaveCallback) leaveCallback(end);
      }
    }
    scrollHandles.push(scroller);
    scroller();
  }

  function getCounterAttr(selector) {
    const $el = $(selector);
    const targetCount = parseInt($el.attr("data-count"));
    const interval = parseInt($el.attr("data-interval")) || 50;
    const duration =
      parseInt($el.attr("data-duration")) || targetCount * interval;
    const step = targetCount / (duration / interval);

    return { targetCount, interval, duration, step };
  }

  function startCounter(selector, onCount = (count) => {}) {
    const $el = $(selector);

    const { targetCount, interval, step } = getCounterAttr($el);

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

  $(".progress-bar [data-count]").each((i, el) => {
    const $el = $(el);
    const $bar = $el.parent();

    const { targetCount, duration } = getCounterAttr($el);

    $bar.css({ width: 0, transition: "none" });
    $el.css({ opacity: 1 });
    viewIf(
      $bar,
      () => {
        $bar.animate(
          { width: targetCount + "%" },
          {
            duration,
            step: (now) => {
              $el.text(Math.floor(now) + "%");
            },
            easing: "linear",
          }
        );
      },
      () => {
        $bar.stop().css({ width: 0 });
        $el.text("0%");
      }
    );
  });

  $("#counterWrap [data-count]").each((i, el) => {
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
    $el.css({ top: h, opacity: 0 });

    viewIf(
      el,
      () => {
        $el
          .stop()
          .animate({ top: 0, opacity: 1 }, (speed * (i + 1)) / 2, easing);
      },
      () => {
        $el.stop().animate({ top: h, opacity: 0 }, speed, easing);
      },
      {
        checkBottom: false,
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
    $el.css({ top: pos + h, opacity: 0 });

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
