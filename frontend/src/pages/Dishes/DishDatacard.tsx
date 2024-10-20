import { Dish } from "./Dish";
import { Button } from "@mui/material";
interface DishDatacardProps {
  data: Dish[] | null;
  edit: boolean | undefined;
  handleDeleteDish: (id: string) => void;
}

function DishDatacard({ data, edit, handleDeleteDish }: DishDatacardProps) {
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
                      {edit ? (
                        <div>
                          <Button
                            variant="contained"
                            style={{ color: "white" , marginRight: "10px"}}
                          >
                            Düzenle
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => {
                              item._id && handleDeleteDish(item._id);
                            }}
                            style={{ color: "white", backgroundColor: "red" }}
                          >
                            Sil
                          </Button>
                        </div>
                      ) : null}
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
