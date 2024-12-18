import React, { useState } from 'react';
import ItemList from './itemList';
import { Post } from '@prisma/client';

interface DiscoverListProps {
  items: Post[];
}

const DiscoverList: React.FC<DiscoverListProps> = ({items}) => {
    return (
        <div className="container mx-auto p-4">
        <h1 className='text-cougRed text-2xl underline decoration-4 underline-offset-8 p-4'>Discover</h1>
        
        {/* Render the item cards in a vertical list */}
        <div className="space-y-6">
          {items.map((item) => (
            <ItemList
              key={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl as string}
              price={item.price.toString()}
              // onAddToCart={() => console.log(`${item.title} added to cart`)}
            />
          ))}
        </div>
      </div>
    );
};

export default DiscoverList