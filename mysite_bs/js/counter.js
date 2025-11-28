$(() => {
  function startCounter(selector) {
    const $el = $(selector);

    const targetCount = parseInt($el.attr("data-count"));
    const interval = parseInt($el.attr("data-interval")) || 50;
    const duration =
      parseInt($el.attr("data-duration")) || targetCount * interval;
    const step = targetCount / (duration / interval);

    let count = 0;

    const counterId = setInterval(() => {
      count += step;

      if (count >= targetCount) {
        clearInterval(counterId);
        count = targetCount;
      }

      $el.text(Math.floor(count));
    }, interval);
  }

  $("[data-count]").each((i, el) => {
    const $el = $(el);

    function scroller() {
      const windowHeight = $(window).height();
      const scrollTop = $(window).scrollTop();
      const y = $el.offset().top;
      const h = $el.outerHeight();

      if (scrollTop > y - windowHeight && scrollTop < y + h) {
        $(window).off("scroll", scroller);
        $el.addClass("active");
        startCounter(el);
      }
    }

    $(window).scroll(scroller);
    scroller();
  });
});
