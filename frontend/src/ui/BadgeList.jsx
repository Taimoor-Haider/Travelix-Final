import React from "react";
import { Badge } from "flowbite-react";

function BadgeList({ list }) {
  return (
    <>
      {list?.map((item, index) => (
        <Badge key={index} color="gray" className="text-[1.2rem] ">
          {item}
        </Badge>
      ))}
    </>
  );
}

export default BadgeList;
