import {List, ListItem, ListItemText, Typography, Divider} from '@mui/material';
import {useEffect, useState} from "react";
import {deleteCategory, getCategories, updateCategory} from "../../api/Categories.tsx";
import {getDishes} from "../../api/Dishes.tsx";
import {Category} from "../Categories/Category.tsx";
import {Dish} from "../Dishes/Dish.tsx";
import Navbar from "../../components/navbar/NavBar.tsx";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import ConfirmationModal from "../../components/modals/DeleteModal.tsx";



export default function ArrangeList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [dishes, setDishes] = useState<Dish[]>([]);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState("");

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

    const handleDeleteCategory = async (id: string) => {
        try {
            const updatedData = await deleteCategory(id, categories);  // Pass data to the API function
            setCategories(updatedData);
        } catch (error: any) {
        }
    };
    const handleEdit = async (categoryId: string, title: string, url: string) => {
        try {
            const newCategory: Category = {
                title,
                url,
            };
            const updatedData = await updateCategory(categoryId, newCategory, categories);  // Pass data to the API function
            setCategories(updatedData);
        } catch (error: any) {
        }
    };

    const dishesByCategory = dishes.reduce((acc, dish) => {
        const categoryId = dish.category;
        if (!acc[categoryId]) {
            acc[categoryId] = [];
        }
        acc[categoryId].push(dish);
        return acc;
    }, {} as Record<string, Dish[]>);

    return (<>
            <Navbar/>
            <ConfirmationModal
                open={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={() => {
                    handleDeleteCategory(selectedCategory);
                    setIsConfirmationModalOpen(false);
                }}
            />
            <div style={{maxWidth: 800, margin: '0 auto', padding: 16}}>
                {categories.map((category) => (
                    <div key={category._id} style={{marginBottom: 32}}>
                        {/* Confirmation Modal */}

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottom: `2px solid ${import.meta.env.VITE_PRIMARY_COLOR}`,
                            paddingBottom: '8px'
                        }}>
                            <h3
                                style={{
                                    fontWeight: 600,
                                    color: '#2D3748',
                                }}
                            >
                                {category.title}
                            </h3>

                            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                <PencilIcon
                                    style={{width: '24px', height: '24px', color: '#3B82F6'}} // Blue color
                                    className="hover:text-blue-600 cursor-pointer"
                                    onClick={() => {
                                        // Handle edit action
                                    }}
                                />
                                <TrashIcon
                                    style={{width: '24px', height: '24px', color: '#EF4444'}} // Red color
                                    className="hover:text-red-600 cursor-pointer"
                                    onClick={() => {
                                        category._id && setSelectedCategory(category._id)
                                        setIsConfirmationModalOpen(true);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Dishes List */}
                        {dishesByCategory[category._id!]?.length > 0 ? (
                            <List disablePadding>
                                {dishesByCategory[category._id!].map((dish) => (
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
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" style={{color: '#718096', marginLeft: 16}}>
                                No dishes available in this category
                            </Typography>
                        )}
                    </div>
                ))}
            </div>

        </>
    );
}