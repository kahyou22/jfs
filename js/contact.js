document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // 페이지 이동 막기

    let form = e.target;
    let data = new FormData(form);

    let response = await fetch("https://formspree.io/f/xgvbwydv", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      alert("메시지가 성공적으로 전송되었습니다! 😊");
      form.reset();
    } else {
      alert("전송 중 오류가 발생했습니다 😢");
    }
  });
