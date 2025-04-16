'use client'

import React from 'react';
import { InfiniteMovingIcons } from './ui/infinite-moving-icons';

const items = [
    {
        icon: "/assets/icons8-html.svg",
    },
    {
        icon: "/assets/icons8-css3.svg",
    },
    {
        icon: "/assets/icons8-js.svg",
    },
    {
        icon: "/assets/icons8-react.svg",
    },
    {
        icon: "/assets/icons8-php.svg",
    },
    {
        icon: "/assets/icons8-sql.svg",
    },
    {
        icon: "/assets/icons8-tailwind.svg",
    },
    {
        icon: "/assets/icons8-next.svg",
    }, 
]

export const Stack = () => {
    return (
        <section className="py-10 glass">
            <div className='max-w-[1200px] mx-auto px-4 text-center'> 
                <div className='flex flex-wrap justify-center gap-4'>
                    <InfiniteMovingIcons items={items} />
                </div>
            </div>
        </section>
    );
};
