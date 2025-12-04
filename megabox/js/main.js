datas.forEach((data) => {
  const like = data.like >= 1000 ? data.like / 1000 + "k" : data.like;

  const card = `
          <div class="box_office_card">
            <div class="inner">
              <div class="front">
                <span class="rank">${data.rank}</span>
                <div class="poster">
                  <img src="${data.poster}" alt="${data.title}">
                </div>
                <div class="screen_type">
                  ${data.screenTypes
                    .map((src) => `<img src="${src}" alt="Screen Types">`)
                    .join("")}
                </div>
                <div class="grade">
                  <img src="${data.grade}" alt="Grade ${data.age}">
                </div>
              </div><!-- //.front -->
              <div class="back">
                <p>${data.description}</p>
                <div class="score">관람평<span>${data.score}</span></div>
              </div><!-- //.back -->
            </div><!-- //.inner -->
            <!-- btn -->
            <div class="btn">
              <button type="button" class="like"><i class="fa-regular fa-heart"></i>${like}</button>
              <a href="" class="reservation_link">예매</a>
            </div>
          </div>
        `;

  $(".box_office").append(card);
});

$(".btn_looking_theater").on("click", () => {
  $(".theater").addClass("active");
});
$(".closed").on("click", () => {
  $(".theater").removeClass("active");
});
