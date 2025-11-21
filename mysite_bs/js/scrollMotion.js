$(window).scroll(function () {
  //변수 선언
  const windowHeight = $(window).height();
  let windowScrollTop = $(window).scrollTop();
  const speed = 1000,
    easing = "easeOutExpo",
    pos = 0,
    offset = 1;

  const motions = $(".motion");

  motions.each((i, el) => {
    const $el = $(el);
    const topVar = $el.css("top").slice(0, -2);
    const y = $el.offset().top - topVar;

    if (windowScrollTop > y - windowHeight / offset) {
      $el
        .stop()
        .animate({ top: pos, opacity: 1 }, (speed * (i + 1)) / 2, easing);
    } else {
      $el.stop().animate({ top: pos + 600, opacity: 0 }, speed, easing);
    }
  });
});
