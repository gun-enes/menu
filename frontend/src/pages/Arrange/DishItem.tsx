import {Divider, ListItem, ListItemText, Typography} from "@mui/material";
import {Dish} from "../Dishes/Dish.tsx";

export interface DishItemProps {
    dish: Dish;
}


export function DishItem({dish}: DishItemProps) {
    return (
        <div key={dish._id}>
            <ListItem alignItems="flex-start" style={{paddingLeft: 0}}>
                <ListItemText
                    primary={
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span style={{fontWeight: 500}}>{dish.title}</span>
                            <div>₺{dish.price.toFixed(2)}</div>
                        </div>
                    }
                    secondary={
                        dish.content && (
                            <Typography
                                variant="body2"
                                style={{
                                    color: '#718096',
                                    marginTop: 4,
                                    lineHeight: 1.5
                                }}
                            >
                                {dish.content}
                            </Typography>
                        )
                    }
                />
            </ListItem>
            <Divider component="li" style={{margin: '8px 0'}}/>
        </div>
    )
}