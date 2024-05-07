import { listData } from "../../lib";
import Card from "../common/Card";

export default function List() {
  return (
    <div className="list flex flex-col items-center gap-10">
      {listData.map((item) => (
        <Card key={item._id} item={item} />
      ))}
    </div>
  );
}
