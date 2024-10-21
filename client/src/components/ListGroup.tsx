import { useState } from "react";

interface Item{
  title: String
  content: String
}

interface Props{
  items: Item[]
}

function ListGroup({items}:Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <>
      <div className="d-flex list-group">
        {items.map((item,index) => (
          <div
          className={selectedIndex == index ? "list-group-item active mb-3" : "list-group-item mb-3"}
          onMouseEnter={()=>(setSelectedIndex(index))}>
          <h4>{item.title}</h4> 
          <p>{item.content}</p>
          </div>
        ))}

      </div>
    </>
  );
}

export default ListGroup;
