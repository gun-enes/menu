import { Dish } from "./Dish";
interface DishDatacardProps {
  data: Dish[] | null;
}

function DishDatacard({ data }: DishDatacardProps) {
  return (
    <>
      <div className="container">
        <div className="row">
          {data &&
            data.map((item) => (
              <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id}>
                <div className="card mb-4" style={{ width: "18rem" }}>
                  {/* Make the image responsive and naturally fit the card */}
                  <img
                    src={item.url}
                    className="card-img-top"
                    alt={item.title}
                    style={{ objectFit: "cover", height: "180px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">{item.content}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="card-text font-weight-bold mb-0">
                        {item.price} TL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default DishDatacard;
