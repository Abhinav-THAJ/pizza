'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['SALAD', 'SOUP', 'PASTA', 'PIZZA', 'ACCOMPANIMENT'];
const subCategories = ['DESSERTS', 'GRILL'];

const allMenuItems: Record<string, { name: string; price: string; img: string }[]> = {
  SALAD: [
    { name: 'Quinoa Bowl Noodle', price: '$25.60', img: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&q=80&fit=crop' },
    { name: 'Garden Fresh Salad', price: '$19.40', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80&fit=crop' },
    { name: 'Caesar Bowl Noodle', price: '$23.60', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=80&fit=crop' },
    { name: 'Greek Salad Supreme', price: '$21.80', img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=300&q=80&fit=crop' },
    { name: 'Asian Fusion Bowl', price: '$24.40', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=80&fit=crop' },
    { name: 'Avocado Kale Mix', price: '$22.60', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&q=80&fit=crop' },
    { name: 'Roasted Veggie Bowl', price: '$23.40', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&q=80&fit=crop' },
    { name: 'Spinach Walnut Salad', price: '$20.60', img: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&q=80&fit=crop' },
    { name: 'Caprese Summer Mix', price: '$25.80', img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&q=80&fit=crop' },
    { name: 'Beet & Goat Cheese', price: '$27.60', img: 'https://images.unsplash.com/photo-1439127989242-c3749a012eac?w=300&q=80&fit=crop' },
    { name: 'Tuna Nicoise Bowl', price: '$29.40', img: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=300&q=80&fit=crop' },
    { name: 'Rainbow Power Bowl', price: '$26.60', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&q=80&fit=crop' },
  ],
  SOUP: [
    { name: 'Tomato Basil Soup', price: '$18.60', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80&fit=crop' },
    { name: 'French Onion Soup', price: '$22.40', img: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=300&q=80&fit=crop' },
    { name: 'Mushroom Bisque', price: '$20.60', img: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=300&q=80&fit=crop' },
    { name: 'Chicken Noodle', price: '$19.80', img: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=300&q=80&fit=crop' },
    { name: 'Minestrone Classic', price: '$17.60', img: 'https://images.unsplash.com/photo-1511909525232-61113c912358?w=300&q=80&fit=crop' },
    { name: 'Lentil Red Pepper', price: '$16.40', img: 'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=300&q=80&fit=crop' },
    { name: 'Clam Chowder', price: '$24.60', img: 'https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=300&q=80&fit=crop' },
    { name: 'Butternut Squash', price: '$18.80', img: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=300&q=80&fit=crop' },
    { name: 'Gazpacho Chilled', price: '$17.60', img: 'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=300&q=80&fit=crop' },
    { name: 'Coconut Curry Soup', price: '$21.40', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&q=80&fit=crop' },
    { name: 'Bouillabaisse', price: '$28.60', img: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c7?w=300&q=80&fit=crop' },
    { name: 'Borscht Beet Soup', price: '$16.60', img: 'https://images.unsplash.com/photo-1631301949571-c07757b9e5ae?w=300&q=80&fit=crop' },
  ],
  PASTA: [
    { name: 'Pasta Carbonara', price: '$28.60', img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&q=80&fit=crop' },
    { name: 'Spaghetti Bolognese', price: '$26.40', img: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=300&q=80&fit=crop' },
    { name: 'Fettuccine Alfredo', price: '$25.60', img: 'https://images.unsplash.com/photo-1552056776-9b5657aca328?w=300&q=80&fit=crop' },
    { name: 'Penne Arrabiata', price: '$23.80', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&q=80&fit=crop' },
    { name: 'Lasagna Al Forno', price: '$32.60', img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&q=80&fit=crop' },
    { name: 'Ravioli Ricotta', price: '$29.40', img: 'https://images.unsplash.com/photo-1551183053-bf91798d43d8?w=300&q=80&fit=crop' },
    { name: 'Linguine Vongole', price: '$34.60', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=80&fit=crop' },
    { name: 'Gnocchi Pesto', price: '$27.80', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&q=80&fit=crop' },
    { name: 'Bucatini Amatriciana', price: '$26.60', img: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=300&q=80&fit=crop' },
    { name: 'Tagliatelle Truffle', price: '$38.40', img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&q=80&fit=crop' },
    { name: 'Orzo Primavera', price: '$24.60', img: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?w=300&q=80&fit=crop' },
    { name: 'Seafood Pasta Mix', price: '$36.80', img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&q=80&fit=crop' },
  ],
  PIZZA: [
    { name: 'Margherita Classic', price: '$22.60', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80&fit=crop' },
    { name: 'Pepperoni Feast', price: '$25.40', img: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&q=80&fit=crop' },
    { name: 'BBQ Chicken Pizza', price: '$27.60', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80&fit=crop' },
    { name: 'Veggie Supreme', price: '$23.80', img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&q=80&fit=crop' },
    { name: 'Four Cheese Pizza', price: '$26.60', img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=80&fit=crop' },
    { name: 'Hawaiian Delight', price: '$24.40', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&q=80&fit=crop' },
    { name: 'Truffle Mushroom', price: '$32.60', img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=300&q=80&fit=crop' },
    { name: 'Spicy Diavola', price: '$28.80', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&q=80&fit=crop' },
    { name: 'Prosciutto Fig', price: '$34.60', img: 'https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=300&q=80&fit=crop' },
    { name: 'Calzone Primavera', price: '$26.40', img: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=300&q=80&fit=crop' },
    { name: 'Smoked Salmon', price: '$35.80', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80&fit=crop' },
    { name: 'Caramelized Onion', price: '$24.60', img: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&q=80&fit=crop' },
  ],
  ACCOMPANIMENT: [
    { name: 'Garlic Bread Sticks', price: '$8.60', img: 'https://images.unsplash.com/photo-1549783927-d72f6360e7dd?w=300&q=80&fit=crop' },
    { name: 'Truffle Fries', price: '$12.40', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&q=80&fit=crop' },
    { name: 'Coleslaw Classic', price: '$7.60', img: 'https://images.unsplash.com/photo-1572441710189-f3c5d3ac9f60?w=300&q=80&fit=crop' },
    { name: 'Roasted Potatoes', price: '$9.80', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80&fit=crop' },
    { name: 'Steamed Broccoli', price: '$8.40', img: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&q=80&fit=crop' },
    { name: 'Caramelized Carrots', price: '$7.60', img: 'https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=300&q=80&fit=crop' },
    { name: 'Corn on the Cob', price: '$6.80', img: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=300&q=80&fit=crop' },
    { name: 'Ratatouille Mix', price: '$11.60', img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&q=80&fit=crop' },
    { name: 'Hummus & Pita', price: '$10.40', img: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&q=80&fit=crop' },
    { name: 'Pickled Vegetables', price: '$6.60', img: 'https://images.unsplash.com/photo-1572441710189-f3c5d3ac9f60?w=300&q=80&fit=crop' },
    { name: 'Wild Rice Pilaf', price: '$9.80', img: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=300&q=80&fit=crop' },
    { name: 'Mushroom Sauté', price: '$11.40', img: 'https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=300&q=80&fit=crop' },
  ],
};

// Fill missing categories
['DESSERTS', 'GRILL'].forEach(cat => {
  allMenuItems[cat] = allMenuItems['SALAD'];
});

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('SALAD');
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Show only 12 items
  const items = (allMenuItems[activeCategory] || []).slice(0, 12);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.menu-header', {
        scrollTrigger: { trigger: '.menu-header', start: 'top 85%' },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory) return;
    // Animate out
    if (gridRef.current) {
      gsap.to(gridRef.current.children, {
        opacity: 0,
        y: 10,
        duration: 0.15,
        stagger: 0.02,
        onComplete: () => {
          setActiveCategory(cat);
        },
      });
    } else {
      setActiveCategory(cat);
    }
  };

  // Animate in when category changes
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
    );
  }, [activeCategory]);

  return (
    <section ref={sectionRef} id="our-menu" className="bg-[#F5F0E8] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="menu-header mb-10">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-3">
            ★ Our Menu
          </p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <p className="text-[14px] text-[#666] leading-relaxed max-w-[560px]">
              The flavors at this eatery are so rich, vibrant and memorable that they leave a lasting impression on the diner. The emphasis on "speaking louder than words" implies that the culinary experience is so powerful that it transcends the need for verbal expression.
            </p>
          </div>
        </div>

        {/* Category Tabs Row 1 */}
        <div className="flex items-center gap-0 border-b border-[#DDD8D0] mb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-[12px] font-semibold tracking-[1.5px] px-5 py-3 border-b-2 transition-all duration-200 ${
                activeCategory === cat
                  ? 'text-[#E8341A] border-[#E8341A]'
                  : 'text-[#888] border-transparent hover:text-[#333]'
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="flex-1" />
          {subCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`text-[12px] font-semibold tracking-[1.5px] px-5 py-3 border-b-2 transition-all duration-200 ${
                activeCategory === cat
                  ? 'text-[#E8341A] border-[#E8341A]'
                  : 'text-[#888] border-transparent hover:text-[#333]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Grid 4 columns x 3 rows */}
        <div ref={gridRef} className="grid grid-cols-4 gap-5 mb-10 mt-8">
          {items.map((item, i) => (
            <motion.div
              key={`${activeCategory}-${i}`}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer"
            >
              {/* Circular food image */}
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden mb-3 shadow-md">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <h3 className="text-[13px] font-semibold text-[#1A1A1A] mb-1 leading-snug">
                {item.name}
              </h3>
              <p className="text-[13px] font-bold text-[#1A1A1A] mb-3">{item.price}</p>
              <motion.button
                whileHover={{ backgroundColor: '#E8341A', color: '#fff', borderColor: '#E8341A' }}
                whileTap={{ scale: 0.96 }}
                className="border border-[#E8341A] text-[#E8341A] text-[11px] font-semibold px-4 py-1.5 rounded-full transition-all duration-200"
              >
                Order Now
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: '#C42B14' }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#E8341A] text-white text-[13px] font-semibold px-8 py-3 rounded-full transition-colors duration-200"
          >
            View All Menu
          </motion.button>
        </div>
      </div>
    </section>
  );
}
