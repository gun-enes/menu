import { Type } from "./Type";

interface TypeDatacardProps {
  item: Type;
  handleDeleteType: (id: string) => void;
}

function TypeDatacard({ item, handleDeleteType }: TypeDatacardProps) {
  return (
    <div className="row">
      <div className="col-md-6">
        <img src={item.url} alt="Description" style={{ width: '450px', height: 'auto' }} />

      </div>
      <div className="col-md-6">
      <h4>{item.title}</h4>
      <button
        onClick={() => item._id && handleDeleteType(item._id)}
        className="btn btn-danger btn-sm ml-3"
      >
        Delete
      </button>


      </div>


    </div>
  );
}

export default TypeDatacard;
