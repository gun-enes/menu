import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Dish } from './Dish';



// Create the context
export const DishContext = createContext<{
   dishes: Dish[];
} | null>(null);


export default function DishProvider() {

  const dishes = useContext(DishContext);

  if (dishes === undefined) {
    throw new Error('useUserContext must be used with a DashboardContext');
  }

  return dishes;
}
