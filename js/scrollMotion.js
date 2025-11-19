$(window).scroll(function () {
  //변수 선언
  const windowHeight = $(window).height();
  let windowScrollTop = $(window).scrollTop();
  const speed = 1000,
    easing = "easeOutExpo",
    pos = 0,
    offset = 1;

  // 오른쪽 상단에 스크롤 양과 창 높이 값 출력
  console.log(windowScrollTop + " , " + windowHeight);

  const motions = $(".motion");

  if (windowScrollTop > windowHeight / offset) {
    //참일 경우
    // i는 0, 1, 2, 3
    for (let i = 0; i < motions.length; i++) {
      motions
        .eq(i)
        .stop()
        .animate({ top: pos, opacity: 1 }, (speed * (i + 1)) / 2, easing);
    }
  } else {
    //거짓일 경우
    motions.stop().animate({ top: pos + 600, opacity: 0 }, speed, easing);
  }
});
