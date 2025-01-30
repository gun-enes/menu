import { List, ListItem, ListItemText, Typography, Divider, Chip } from '@mui/material';
import {useEffect, useState} from "react";
import {getCategories} from "../../api/Categories.tsx";
import {getDishes} from "../../api/Dishes.tsx";
import {Category} from "../../models/Category.tsx";
import {Dish} from "../../models/Dish.tsx";
import Navbar from "../../components/navbar/NavBar.tsx";



export default function ListView() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [dishes, setDishes] = useState<Dish[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await getCategories();
                setCategories(categories);
                const dishes = await getDishes();
                setDishes(dishes);
            } catch (error: any) {
            }
        };
        fetchData();
    }, []);

    const dishesByCategory = dishes.reduce((acc, dish) => {
        const categoryId = dish.category;
        if (!acc[categoryId]) {
            acc[categoryId] = [];
        }
        acc[categoryId].push(dish);
        return acc;
    }, {} as Record<string, Dish[]>);

    return (
        <>
            <Navbar/>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
            {categories.map((category) => (
                <div key={category._id} style={{ marginBottom: 32 }}>
                    {/* Category Header */}
                    <Typography variant="h5" style={{
                        marginBottom: 16,
                        fontWeight: 600,
                        color: '#2D3748',
                        borderBottom: `2px solid ${import.meta.env.VITE_PRIMARY_COLOR}`,
                        paddingBottom: 8
                    }}>
                        {category.title}
                    </Typography>

                    {/* Dishes List */}
                    {dishesByCategory[category._id!]?.length > 0 ? (
                        <List disablePadding>
                            {dishesByCategory[category._id!].map((dish) => (
                                <div key={dish._id}>
                                    <ListItem alignItems="flex-start" style={{ paddingLeft: 0 }}>
                                        <ListItemText
                                            primary={
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ fontWeight: 500 }}>{dish.title}</span>
                                                    <Chip
                                                        label={`$${dish.price.toFixed(2)}`}
                                                        size="small"
                                                        style={{
                                                            backgroundColor: import.meta.env.VITE_PRIMARY_COLOR,
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            borderRadius: 4
                                                        }}
                                                    />
                                                </div>
                                            }
                                            secondary={
                                                dish.content &&
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
                                            }
                                        />
                                    </ListItem>
                                    <Divider component="li" style={{ margin: '8px 0' }} />
                                </div>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" style={{ color: '#718096', marginLeft: 16 }}>
                            No dishes available in this category
                        </Typography>
                    )}
                </div>
            ))}
        </div>
        </>
    );
}