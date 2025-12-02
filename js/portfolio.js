datas.forEach((data) => {
  const taskIcon =
    data.task == 1
      ? `<i class="fa-solid fa-person"></i>`
      : `<i class="fa-solid fa-people-group me-1"></i>`;
  const card = `
          <div class="box_office_card motion position-relative col-lg col-md-6 mt-4">
            <div class="inner">
              <div class="front">
                <span class="rank">${data.rank}</span>
                <div class="poster">
                  <img class="w-100 h-100 object-fit-cover" src="${
                    data.poster
                  }" alt="${data.title}">
                </div>
              </div><!-- //.front -->
              <div class="back">
                <ul>${data.description
                  .map((desc) => `<li>${desc}</li>`)
                  .join("")}</ul>
                <div class="worktime">작업 시간<span>${
                  data.worktime
                }</span></div>
              </div><!-- //.back -->
            </div><!-- //.inner -->
            <!-- btn -->
            <div class="btns">
              <span class="worktype text-center">${taskIcon}${data.task}</span>
              <a href="${
                data.siteurl
              }" class="btn btn-primary site_link text-white">사이트 바로가기</a>
            </div>
          </div>
        `;

  $(".portfolio").append(card);
});
