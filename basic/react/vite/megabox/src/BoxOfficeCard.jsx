import { useState } from "react";

import "./css/BoxOfficeCard.css";

function BoxOfficeCard({ data }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(data.like);

  const formatCount = (num) => {
    if (num >= 1000) {
      num = Math.floor(num / 100) / 10 + "k";
    }
    return num;
  };

  const handleClick = () => {
    const newLiked = !liked;
    const newCount = newLiked ? count + 1 : count - 1;
    setLiked(newLiked);
    setCount(newCount);
  };

  return (
    <div className="box_office_card">
      <div className="inner">
        <div className="front">
          <span className="rank">{data.rank}</span>
          <div className="poster">
            <img src={data.poster} alt={data.title} />
          </div>
          <div className="screen_type">
            {data.screenTypes.map((src) => (
              <img src={src} alt="Screen Types" />
            ))}
          </div>
          <div className="grade">
            <img src={data.grade} alt={data.age} />
          </div>
        </div>
        <div className="back">
          <p dangerouslySetInnerHTML={{ __html: data.description }} />
          <div className="score">
            관람평<span>{data.score}</span>
          </div>
        </div>
      </div>
      <div className="btn">
        <button type="button" className={`like`} onClick={handleClick}>
          <i
            className={(liked ? "fa-solid" : "fa-regular") + " fa-heart"}
            style={liked ? { color: "red" } : {}}
          ></i>
          {formatCount(count)}
        </button>
        <a
          href="https://www.megabox.co.kr/booking"
          className="reservation_link"
        >
          예매
        </a>
      </div>
    </div>
  );
}

export default BoxOfficeCard;
