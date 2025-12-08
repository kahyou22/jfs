import "./css/reset.css";
import BoxOfficeCard from "./BoxOfficeCard";
import { datas } from "./data";

function App() {
  return (
    <div className="box_office">
      {datas.map((data) => (
        <BoxOfficeCard data={data} key={data.title} />
      ))}
    </div>
  );
}

export default App;
