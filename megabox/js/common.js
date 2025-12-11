// header 2depth background
// $(".main li:not(:nth-of-type(5)").mouseenter(function () {
//   $("#header").addClass("active");
//   $(this).find(".sub").addClass("active");
// });
// $(".main > li").mouseleave(() => {
//   $("#gnb .sub").removeClass("active");
// });
// $("#header .subbar").mouseenter(() => {
//   $(".main > li").find(".sub").addClass("active");
// });
// $("#header .subbar").mouseleave(() => {
//   $("#header").removeClass("active");
//   $(".main > li").find(".sub").removeClass("active");
// });

$(".main > li:not(:nth-of-type(5)").mouseenter((e) => {
  $(".sub").removeClass("active");
  const target = $(e.currentTarget);
  target.addClass("active");
  target.find(".sub").addClass("active");
  $("#header").addClass("active");
});

$(".main > li").mouseleave((e) => {
  const target = $(e.currentTarget);
  target.removeClass("active");
});

$("#header .subbar").mouseleave((e) => {
  $("#header").removeClass("active");
  $(".sub").removeClass("active");
});

// footer - looking for theater
$(".btn_looking_theater").on("click", () => {
  $(".theater").addClass("active");
});
$(".closed").on("click", () => {
  $(".theater").removeClass("active");
});
