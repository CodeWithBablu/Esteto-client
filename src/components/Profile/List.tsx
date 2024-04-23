import { listData } from "../../lib";
import Card from "../common/Card";

export default function List() {
  return (
    <div className="list flex flex-col gap-10">
      {
        listData.map((item) => (
          <Card key={item.id} item={item} />
        ))
      }
    </div>
  );
}