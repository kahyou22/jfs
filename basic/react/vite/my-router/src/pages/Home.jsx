import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>🏠 메인 페이지</h1>
      <Link to="/about">→ 서브 페이지 이동</Link>
    </div>
  );
}
