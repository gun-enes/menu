import {Category} from "../../models/Category.tsx";
import {PencilIcon, TrashIcon} from "@heroicons/react/24/outline";

export interface CategoryItemProps {
    category: Category;
    onDelete: (id: string) => void;
    onEdit: (category: Category) => void;
}


export function CategoryItem({category, onEdit, onDelete}: CategoryItemProps) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `2px solid ${import.meta.env.VITE_PRIMARY_COLOR}`,
            paddingBottom: '8px'
        }}>
            <h3
                className="cursor-pointer"
                style={{
                    fontWeight: 600,
                    color: '#2D3748',
                }}>
                {category.title}
            </h3>


            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                <PencilIcon
                    style={{width: '24px', height: '24px',}} // Blue color
                    className="hover:text-blue-600 cursor-pointer"
                    onClick={() => {
                        onEdit(category);
                    }}
                />
                <TrashIcon
                    style={{width: '24px', height: '24px', color: '#EF4444'}} // Red color
                    className="hover:text-red-600 cursor-pointer"
                    onClick={() => {
                        category._id && onDelete(category._id);
                    }}/>
            </div>
        </div>
    )
}