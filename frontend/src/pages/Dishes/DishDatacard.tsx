import { Button } from "@mui/material";
import {useDishContext} from "./DishContext.tsx";
interface DishDatacardProps {
  arrange: boolean | undefined;
  handleDeleteDish: (id: string) => void;
}

export default function DishDatacard({arrange, handleDeleteDish }: DishDatacardProps) {
    const { setTitle, setURL, setEdit, data,setDishId ,setPrice, setContent} = useDishContext();
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
                      {arrange ? (
                        <div>
                          <Button
                            variant="contained"
                            style={{ color: "white" , marginRight: "10px"}}
                            onClick={(event) => {
                                event.stopPropagation();
                                setURL(item.url);
                                setTitle(item.title);
                                setContent(item.content);
                                setPrice(item.price);
                                setEdit(true);
                                item._id && setDishId(item._id);
                            }}
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
