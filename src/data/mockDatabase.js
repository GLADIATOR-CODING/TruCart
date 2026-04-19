export const PLATFORMS = {
  ZOMATO: { id: 'zomato', name: 'Zomato', colorClass: 'text-[#E23744]', bgClass: 'bg-[#E23744]' },
  SWIGGY: { id: 'swiggy', name: 'Swiggy', colorClass: 'text-[#FC8019]', bgClass: 'bg-[#FC8019]' },
  MAGICPIN: { id: 'magicpin', name: 'MagicPin', colorClass: 'text-[#E11452]', bgClass: 'bg-[#E11452]' },
  DIGIHAAT: { id: 'digihaat', name: 'DigiHaat', colorClass: 'text-[#1d4ed8]', bgClass: 'bg-[#1d4ed8]' },
};

export const RESTAURANTS = [
  // === BURGERS ===
  { id: 'r1', name: 'Burger King', rating: 4.2, cuisine: 'American, Fast Food, Burgers', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=60&w=500', startsFrom: 129, deliveryTime: '20-30 min', category: 'Burgers' },
  { id: 'r2', name: 'Truffles', rating: 4.6, cuisine: 'Burgers, Continental, Desserts', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=60&w=500', startsFrom: 299, deliveryTime: '35-45 min', category: 'Burgers' },
  { id: 'r3', name: "Leon's Burgers & Wings", rating: 4.3, cuisine: 'American, Fast Food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=60&w=500', startsFrom: 199, deliveryTime: '25-35 min', category: 'Burgers' },
  { id: 'r4', name: "McDonald's", rating: 4.1, cuisine: 'Burgers, Fast Food, Beverages', image: 'https://images.unsplash.com/photo-1619881589316-52166a1a1edb?auto=format&fit=crop&q=60&w=500', startsFrom: 149, deliveryTime: '20-35 min', category: 'Burgers' },
  { id: 'r5', name: "Wendy's", rating: 4.0, cuisine: 'Burgers, Fast Food', image: 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=60&w=500', startsFrom: 189, deliveryTime: '30-40 min', category: 'Burgers' },

  // === PIZZA ===
  { id: 'p1', name: "Domino's Pizza", rating: 4.1, cuisine: 'Pizza, Italian, Fast Food', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=60&w=500', startsFrom: 199, deliveryTime: '30 min', category: 'Pizza' },
  { id: 'p2', name: 'Pizza Hut', rating: 3.9, cuisine: 'Pizza, Fast Food', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=60&w=500', startsFrom: 249, deliveryTime: '35-40 min', category: 'Pizza' },
  { id: 'p3', name: "Ovenstory Pizza", rating: 4.4, cuisine: 'Pizza, Italian', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=60&w=500', startsFrom: 299, deliveryTime: '25-35 min', category: 'Pizza' },
  { id: 'p4', name: "La Pino'z Pizza", rating: 4.2, cuisine: 'Pizza, Beverages', image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=60&w=500', startsFrom: 349, deliveryTime: '40-50 min', category: 'Pizza' },
  { id: 'p5', name: "Toscano", rating: 4.7, cuisine: 'Italian, Pizza, Fine Dining', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=60&w=500', startsFrom: 699, deliveryTime: '45-60 min', category: 'Pizza' },

  // === THALI ===
  { id: 't1', name: 'Rajdhani Thali', rating: 4.5, cuisine: 'North Indian, Rajasthani, Thali', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=60&w=500', startsFrom: 399, deliveryTime: '35-45 min', category: 'Thali' },
  { id: 't2', name: 'Bhojohori Manna', rating: 4.3, cuisine: 'Bengali, Thali', image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=60&w=500', startsFrom: 299, deliveryTime: '40-55 min', category: 'Thali' },
  { id: 't3', name: 'Nagarjuna', rating: 4.6, cuisine: 'Andhra, Biryani, Thali', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=60&w=500', startsFrom: 249, deliveryTime: '30-40 min', category: 'Thali' },
  { id: 't4', name: 'Kapoor Cafe', rating: 4.2, cuisine: 'North Indian, Punjabi, Thali', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=60&w=500', startsFrom: 280, deliveryTime: '35-50 min', category: 'Thali' },
  { id: 't5', name: 'A2B - Adyar Ananda', rating: 4.1, cuisine: 'South Indian, North Indian, Thali', image: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=60&w=500', startsFrom: 180, deliveryTime: '20-30 min', category: 'Thali' },

  // === SOUTH INDIAN ===
  { id: 's1', name: 'Rameshwaram Cafe', rating: 4.8, cuisine: 'South Indian, Street Food', image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=60&w=500', startsFrom: 99, deliveryTime: '25-45 min', category: 'South Indian' },
  { id: 's2', name: 'Vidyarthi Bhavan', rating: 4.7, cuisine: 'South Indian, Coffee', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=60&w=500', startsFrom: 79, deliveryTime: '35-55 min', category: 'South Indian' },
  { id: 's3', name: 'MTR', rating: 4.5, cuisine: 'South Indian, Desserts', image: 'https://images.unsplash.com/photo-1630409351239-0129bc1269ed?auto=format&fit=crop&q=60&w=500', startsFrom: 150, deliveryTime: '30-40 min', category: 'South Indian' },
  { id: 's4', name: 'Sagar Ratna', rating: 4.2, cuisine: 'South Indian, North Indian', image: 'https://images.unsplash.com/photo-1589301773012-05f4fa815ca7?auto=format&fit=crop&q=60&w=500', startsFrom: 120, deliveryTime: '25-35 min', category: 'South Indian' },
  { id: 's5', name: 'Central Tiffin Room (CTR)', rating: 4.6, cuisine: 'South Indian, Breakfast', image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=60&w=500', startsFrom: 85, deliveryTime: '30-45 min', category: 'South Indian' },

  // === COFFEE ===
  { id: 'c1', name: 'Starbucks', rating: 4.3, cuisine: 'Coffee, Beverages, Desserts', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=60&w=500', startsFrom: 249, deliveryTime: '20-30 min', category: 'Coffee' },
  { id: 'c2', name: 'Third Wave Coffee', rating: 4.5, cuisine: 'Coffee, Bakery, Continental', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=60&w=500', startsFrom: 220, deliveryTime: '25-35 min', category: 'Coffee' },
  { id: 'c3', name: 'Blue Tokai', rating: 4.6, cuisine: 'Coffee, Healthy Food', image: 'https://images.unsplash.com/photo-1444418185997-1145401101e0?auto=format&fit=crop&q=60&w=500', startsFrom: 210, deliveryTime: '20-35 min', category: 'Coffee' },
  { id: 'c4', name: 'Costa Coffee', rating: 4.1, cuisine: 'Coffee, Sandwiches', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=60&w=500', startsFrom: 199, deliveryTime: '25-40 min', category: 'Coffee' },
  { id: 'c5', name: 'Filter Coffee Co', rating: 4.4, cuisine: 'Coffee, South Indian', image: 'https://images.unsplash.com/photo-1611095973763-414019e72400?auto=format&fit=crop&q=60&w=500', startsFrom: 99, deliveryTime: '15-25 min', category: 'Coffee' },

  // === BIRYANI (NEW) ===
  { id: 'b1', name: 'Meghana Foods', rating: 4.7, cuisine: 'Biryani, Andhra, Chinese', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=60&w=500', startsFrom: 250, deliveryTime: '30-40 min', category: 'Biryani' },
  { id: 'b2', name: 'Paradise Biryani', rating: 4.5, cuisine: 'Biryani, Hyderabadi', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=60&w=500', startsFrom: 280, deliveryTime: '35-45 min', category: 'Biryani' },
  { id: 'b3', name: 'Behrouz Biryani', rating: 4.3, cuisine: 'Biryani, Mughlai, Kebabs', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=60&w=500', startsFrom: 320, deliveryTime: '40-50 min', category: 'Biryani' },
  { id: 'b4', name: 'Biryani Blues', rating: 4.2, cuisine: 'Biryani, North Indian', image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=60&w=500', startsFrom: 199, deliveryTime: '30-40 min', category: 'Biryani' },
  { id: 'b5', name: 'Hyderabad House', rating: 4.4, cuisine: 'Biryani, Hyderabadi, Tandoor', image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&q=60&w=500', startsFrom: 260, deliveryTime: '35-50 min', category: 'Biryani' },

  // === CHINESE (NEW) ===
  { id: 'ch1', name: 'Chowman', rating: 4.4, cuisine: 'Chinese, Asian, Momos', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=60&w=500', startsFrom: 180, deliveryTime: '25-35 min', category: 'Chinese' },
  { id: 'ch2', name: 'Mainland China', rating: 4.6, cuisine: 'Chinese, Pan Asian, Fine Dining', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=60&w=500', startsFrom: 450, deliveryTime: '40-50 min', category: 'Chinese' },
  { id: 'ch3', name: 'Wow! Momo', rating: 4.1, cuisine: 'Chinese, Momos, Street Food', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=60&w=500', startsFrom: 99, deliveryTime: '20-30 min', category: 'Chinese' },
  { id: 'ch4', name: 'Hakka Noodles Co.', rating: 4.0, cuisine: 'Chinese, Indo-Chinese', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=60&w=500', startsFrom: 149, deliveryTime: '25-35 min', category: 'Chinese' },
  { id: 'ch5', name: 'Bao House', rating: 4.5, cuisine: 'Chinese, Taiwanese, Bao', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=60&w=500', startsFrom: 220, deliveryTime: '30-40 min', category: 'Chinese' },

  // === DESSERTS (NEW) ===
  { id: 'd1', name: 'Baskin Robbins', rating: 4.2, cuisine: 'Desserts, Ice Cream', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=60&w=500', startsFrom: 120, deliveryTime: '20-30 min', category: 'Desserts' },
  { id: 'd2', name: 'Theobroma', rating: 4.6, cuisine: 'Desserts, Bakery, Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=60&w=500', startsFrom: 150, deliveryTime: '25-35 min', category: 'Desserts' },
  { id: 'd3', name: 'Natural Ice Cream', rating: 4.5, cuisine: 'Ice Cream, Desserts', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9be7?auto=format&fit=crop&q=60&w=500', startsFrom: 99, deliveryTime: '20-30 min', category: 'Desserts' },
  { id: 'd4', name: 'Keventers', rating: 4.0, cuisine: 'Milkshakes, Desserts, Beverages', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=60&w=500', startsFrom: 149, deliveryTime: '15-25 min', category: 'Desserts' },
  { id: 'd5', name: 'Guilt Trip', rating: 4.4, cuisine: 'Waffles, Pancakes, Desserts', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=60&w=500', startsFrom: 180, deliveryTime: '25-35 min', category: 'Desserts' },

  // === WRAPS & ROLLS (NEW) ===
  { id: 'w1', name: 'Faasos', rating: 4.1, cuisine: 'Wraps, Rolls, Fast Food', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=60&w=500', startsFrom: 149, deliveryTime: '20-30 min', category: 'Wraps' },
  { id: 'w2', name: 'Kathi Junction', rating: 4.3, cuisine: 'Rolls, Kathi Rolls, Bengali', image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=60&w=500', startsFrom: 129, deliveryTime: '25-35 min', category: 'Wraps' },
  { id: 'w3', name: 'Tibbs Frankie', rating: 4.0, cuisine: 'Wraps, Frankie, Street Food', image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=60&w=500', startsFrom: 99, deliveryTime: '20-30 min', category: 'Wraps' },
  { id: 'w4', name: 'Wrap It Up', rating: 4.2, cuisine: 'Wraps, Healthy, Mediterranean', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc383?auto=format&fit=crop&q=60&w=500', startsFrom: 179, deliveryTime: '25-35 min', category: 'Wraps' },
  { id: 'w5', name: 'Roll Maal', rating: 4.4, cuisine: 'Rolls, Mughlai, Kebabs', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=60&w=500', startsFrom: 159, deliveryTime: '25-40 min', category: 'Wraps' },

  // === HEALTHY (NEW) ===
  { id: 'h1', name: 'EatFit', rating: 4.3, cuisine: 'Healthy, Salads, Diet Food', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=60&w=500', startsFrom: 199, deliveryTime: '25-35 min', category: 'Healthy' },
  { id: 'h2', name: 'Salad Days', rating: 4.5, cuisine: 'Healthy, Salads, Bowls', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=60&w=500', startsFrom: 249, deliveryTime: '25-35 min', category: 'Healthy' },
  { id: 'h3', name: 'Sweetgreen', rating: 4.4, cuisine: 'Healthy, Bowls, Smoothies', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=60&w=500', startsFrom: 299, deliveryTime: '30-40 min', category: 'Healthy' },
  { id: 'h4', name: 'Calorie Counter', rating: 4.1, cuisine: 'Healthy, Keto, Low Carb', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=60&w=500', startsFrom: 229, deliveryTime: '25-35 min', category: 'Healthy' },
  { id: 'h5', name: 'Fresh Menu', rating: 4.2, cuisine: 'Healthy, Continental, Wraps', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=60&w=500', startsFrom: 189, deliveryTime: '20-30 min', category: 'Healthy' },
];

// === ONBOARDING → DATABASE RESTAURANT MAPPING ===
export const ONBOARDING_MAP = {
  ob1: 'r1', ob2: 'r4', ob3: 'p1', ob4: 'p2', ob5: 'c1',
  ob6: 'r2', ob7: 's1', ob8: 'c2', ob9: 't1', ob10: 's3',
  ob11: 'p4', ob12: 'p3', ob13: 'r5', ob14: 'c3', ob15: 't3',
  ob16: 's2', ob17: 'p5', ob18: 'c4', ob19: 's4', ob20: 'c5',
};

// Favorites are now managed by FavoritesContext + Firestore
// See: src/context/FavoritesContext.jsx and src/services/firestore.js

// Price generation
function generatePrices(baseItemPrice) {
  const platforms = [PLATFORMS.ZOMATO, PLATFORMS.SWIGGY, PLATFORMS.MAGICPIN, PLATFORMS.DIGIHAAT];
  
  // ~28% chance for Zomato or Swiggy to have a massive coupon
  const hasCoupon = Math.random() < 0.28;
  const couponPlatform = Math.random() < 0.5 ? 'zomato' : 'swiggy';
  const couponNames = ['TRYNEW', 'TASTY', 'CRAVINGS', 'BINGE', 'FESTIVE'];
  const couponCode = couponNames[Math.floor(Math.random() * couponNames.length)];
  const discountAmount = Math.floor(baseItemPrice * 0.35); // 35% off to ensure they win

  return platforms.map(plat => {
    let modifier = 0;
    if (plat.id === 'magicpin') modifier = -20;
    if (plat.id === 'swiggy') modifier = 5;
    if (plat.id === 'digihaat') modifier = -15;
    if (plat.id === 'zomato') modifier = 10;

    let appliedCoupon = null;
    if (hasCoupon && plat.id === couponPlatform) {
      modifier -= discountAmount;
      appliedCoupon = { code: couponCode, discount: discountAmount };
    }

    const noise = Math.floor(Math.random() * 15) - 5;
    const finalItemPrice = Math.max(29, baseItemPrice + modifier + noise);
    const deliveryFee = plat.id === 'digihaat' ? 15 : Math.floor(Math.random() * 30) + 30;
    const taxes = Math.floor(finalItemPrice * 0.05);
    const platformFee = plat.id === 'magicpin' || plat.id === 'digihaat' ? 2 : Math.floor(Math.random() * 5) + 3;

    return {
      platform: plat,
      itemPrice: finalItemPrice, deliveryFee, taxes, platformFee,
      coupon: appliedCoupon,
      total: finalItemPrice + deliveryFee + taxes + platformFee
    };
  }).sort((a, b) => a.total - b.total);
}

export const MENU_ITEMS = [];
export const PLATFORM_PRICING = {};

let idCounter = 1;
function item(restaurantId, name, description, image, basePrice) {
  const iid = `i${idCounter++}`;
  MENU_ITEMS.push({ id: iid, restaurantId, name, description, image });
  PLATFORM_PRICING[iid] = generatePrices(basePrice);
}

// ---- BURGERS ----
item('r1', 'Whopper', 'Signature flame-grilled beef patty with fresh veggies.', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=60&w=500', 169);
item('r1', 'Crispy Veg', 'Crispy veg patty with fresh lettuce and mayo.', 'https://images.unsplash.com/photo-1481070555726-e2fe83477135?auto=format&fit=crop&q=60&w=500', 89);
item('r1', 'Chicken Royale', 'Crispy long chicken patty with lettuce and mayo.', 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=60&w=500', 149);
item('r2', 'All American Cheese Burger', 'Juicy patty overloaded with cheese and secret sauce.', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=60&w=500', 329);
item('r2', 'BBQ Bacon Burger', 'Smoky BBQ sauce, crispy bacon, and caramelized onions.', 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=60&w=500', 379);
item('r3', 'Spicy Chicken Wings', 'Crispy wings tossed in buffalo sauce.', 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=60&w=500', 249);
item('r3', 'Nashville Hot Chicken', 'Fiery Nashville-style crispy chicken sandwich.', 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&q=60&w=500', 289);
item('r4', 'McSpicy Chicken', 'Hot and crispy chicken with fiery sauce.', 'https://images.unsplash.com/photo-1619881589316-52166a1a1edb?auto=format&fit=crop&q=60&w=500', 199);
item('r4', 'McAloo Tikki', 'Classic potato tikki burger with tangy sauce.', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=60&w=500', 69);
item('r5', 'Dave\'s Double', 'Two fresh beef patties with cheese.', 'https://images.unsplash.com/photo-1603064752734-4c48eff53d05?auto=format&fit=crop&q=60&w=500', 289);
item('r5', 'Spicy Chicken Sandwich', 'Crispy spiced chicken fillet with pickles.', 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?auto=format&fit=crop&q=60&w=500', 229);

// ---- PIZZA ----
item('p1', 'Farmhouse Pizza', 'Crunchy capsicum, succulent mushrooms and fresh tomatoes.', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=60&w=500', 399);
item('p1', 'Peppy Paneer', 'Chunky paneer with crisp capsicum and spicy sauce.', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=60&w=500', 349);
item('p2', 'Veggie Supreme', 'Black olives, capsicum, mushroom, onion, sweet corn.', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=60&w=500', 449);
item('p2', 'Stuffed Crust', 'Cheese-stuffed crust with premium toppings.', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=60&w=500', 549);
item('p3', 'Double Cheese Margherita', 'Loaded with extra cheese for authentic taste.', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=60&w=500', 349);
item('p3', 'Peri Peri Chicken Pizza', 'Spicy peri peri chicken with roasted peppers.', 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=60&w=500', 449);
item('p4', 'Chicken Pepperoni', 'Premium chicken pepperoni slices.', 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=60&w=500', 499);
item('p5', 'Truffle Mushroom Pizza', 'Exquisite truffle oil infused mushroom pizza.', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=60&w=500', 899);

// ---- THALI ----
item('t1', 'Maharaja Thali', 'Authentic Rajasthani thali featuring 15 items.', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=60&w=500', 449);
item('t1', 'Royal Gujarati Thali', 'Sweet, spicy and tangy Gujarati flavors.', 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=60&w=500', 399);
item('t2', 'Fish Thali', 'Classic Bengali fish curry with rice and sides.', 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=60&w=500', 349);
item('t3', 'Andhra Meals', 'Spicy traditional Andhra thali on banana leaf.', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=60&w=500', 299);
item('t3', 'Guntur Chicken Biryani', 'Fiery Andhra-style chicken biryani.', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=60&w=500', 349);
item('t4', 'Punjabi Veg Thali', 'Dal makhani, paneer butter masala, naan and rice.', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=60&w=500', 320);
item('t5', 'Mini Meals', 'South Indian curd rice, sambar, rasam and poriyal.', 'https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&q=60&w=500', 180);

// ---- SOUTH INDIAN ----
item('s1', 'Ghee Roast Dosa', 'Ultra crispy dosa loaded with pure ghee.', 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=60&w=500', 140);
item('s1', 'Butter Podi Dosa', 'Crispy dosa with spicy podi and melted butter.', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=60&w=500', 120);
item('s2', 'Masala Dosa', 'Golden brown dosa with spicy potato filling.', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=60&w=500', 100);
item('s2', 'Thatte Idli', 'Flat plate-sized idli with chutney and sambar.', 'https://images.unsplash.com/photo-1630409351239-0129bc1269ed?auto=format&fit=crop&q=60&w=500', 90);
item('s3', 'Rava Idli', 'Soft and spongy idli made with semolina.', 'https://images.unsplash.com/photo-1630409351239-0129bc1269ed?auto=format&fit=crop&q=60&w=500', 85);
item('s3', 'Mysore Pak', 'Traditional sweet made with besan and ghee.', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=60&w=500', 95);
item('s4', 'Medu Vada (2 pcs)', 'Crispy savory donut with coconut chutney.', 'https://images.unsplash.com/photo-1589301773012-05f4fa815ca7?auto=format&fit=crop&q=60&w=500', 70);
item('s5', 'Benne Dosa', 'Butter-soaked thick fluffy dosa.', 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=60&w=500', 120);

// ---- COFFEE ----
item('c1', 'Caramel Macchiato', 'Espresso, vanilla, steamed milk, caramel drizzle.', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=60&w=500', 280);
item('c1', 'Java Chip Frappuccino', 'Blended coffee with chocolate chips and whipped cream.', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=60&w=500', 350);
item('c2', 'Iced Sea Salt Mocha', 'Cold mocha topped with sea salt foam.', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=60&w=500', 250);
item('c2', 'Cold Brew', 'Slow-steeped cold brew with notes of chocolate.', 'https://images.unsplash.com/photo-1444418185997-1145401101e0?auto=format&fit=crop&q=60&w=500', 220);
item('c3', 'Pour Over Coffee', 'Hand-brewed single estate black coffee.', 'https://images.unsplash.com/photo-1444418185997-1145401101e0?auto=format&fit=crop&q=60&w=500', 210);
item('c4', 'Cappuccino', 'Classic espresso with steamed milk foam.', 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=60&w=500', 220);
item('c5', 'Filter Kaapi', 'Strong traditional South Indian filter coffee.', 'https://images.unsplash.com/photo-1611095973763-414019e72400?auto=format&fit=crop&q=60&w=500', 95);

// ---- BIRYANI (NEW) ----
item('b1', 'Chicken Dum Biryani', 'Slow-cooked Hyderabadi style with layers of rice and spiced chicken.', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=60&w=500', 280);
item('b1', 'Mutton Kheema Biryani', 'Minced mutton biryani with caramelized onions.', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=60&w=500', 350);
item('b2', 'Paradise Special Biryani', 'The iconic Hyderabadi biryani with raita.', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=60&w=500', 320);
item('b3', 'Lucknowi Biryani', 'Aromatic awadhi-style biryani with saffron rice.', 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=60&w=500', 380);
item('b4', 'Veg Dum Biryani', 'Mixed vegetables layered with fragrant basmati rice.', 'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&q=60&w=500', 220);
item('b5', 'Egg Biryani', 'Boiled eggs nestled in aromatic spiced rice.', 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=60&w=500', 199);

// ---- CHINESE (NEW) ----
item('ch1', 'Chicken Manchurian', 'Battered chicken in tangy Manchurian sauce.', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=60&w=500', 220);
item('ch1', 'Hakka Noodles', 'Stir-fried noodles with vegetables and soy sauce.', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=60&w=500', 180);
item('ch2', 'Peking Duck', 'Tender roasted duck with hoisin sauce.', 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=60&w=500', 650);
item('ch3', 'Steamed Momos (8 pcs)', 'Juicy steamed chicken dumplings.', 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=60&w=500', 120);
item('ch4', 'Schezwan Fried Rice', 'Spicy fried rice with Schezwan sauce.', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=60&w=500', 180);
item('ch5', 'Pork Bao Buns (3 pcs)', 'Fluffy steamed buns with braised pork belly.', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=60&w=500', 280);

// ---- DESSERTS (NEW) ----
item('d1', 'Belgian Chocolate Scoop', 'Rich Belgian chocolate ice cream.', 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=60&w=500', 150);
item('d1', 'Sundae Supreme', 'Three scoops with fudge, nuts, and whipped cream.', 'https://images.unsplash.com/photo-1570197788417-0e82375c9be7?auto=format&fit=crop&q=60&w=500', 280);
item('d2', 'Chocolate Truffle Cake', 'Decadent triple-layer chocolate cake.', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=60&w=500', 350);
item('d3', 'Sitaphal Ice Cream', 'Seasonal custard apple natural ice cream.', 'https://images.unsplash.com/photo-1570197788417-0e82375c9be7?auto=format&fit=crop&q=60&w=500', 120);
item('d4', 'Oreo Milkshake', 'Thick and creamy Oreo cookie milkshake.', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=60&w=500', 179);
item('d5', 'Nutella Waffle', 'Crispy waffle drizzled with warm Nutella.', 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=60&w=500', 220);

// ---- WRAPS & ROLLS (NEW) ----
item('w1', 'Paneer Tikka Wrap', 'Grilled paneer with mint chutney in a tortilla.', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=60&w=500', 179);
item('w1', 'Chicken Seekh Wrap', 'Smoky chicken seekh kebab rolled up.', 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=60&w=500', 199);
item('w2', 'Mutton Kathi Roll', 'Flaky paratha stuffed with spiced mutton.', 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&q=60&w=500', 189);
item('w3', 'Veg Frankie', 'Mumbai-style frankie with spiced potato filling.', 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=60&w=500', 109);
item('w4', 'Falafel Mediterranean Wrap', 'Chickpea falafel with hummus and fresh greens.', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc383?auto=format&fit=crop&q=60&w=500', 229);
item('w5', 'Chicken Shawarma Roll', 'Middle Eastern spiced chicken wrapped tight.', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=60&w=500', 169);

// ---- HEALTHY (NEW) ----
item('h1', 'Quinoa Power Bowl', 'Quinoa with grilled veggies and tahini dressing.', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=60&w=500', 249);
item('h1', 'Grilled Chicken Salad', 'Lean chicken breast on a bed of fresh greens.', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=60&w=500', 229);
item('h2', 'Caesar Salad', 'Romaine, parmesan, croutons with Caesar dressing.', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=60&w=500', 279);
item('h3', 'Açaí Smoothie Bowl', 'Blended açaí topped with granola and fresh fruit.', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=60&w=500', 349);
item('h4', 'Keto Chicken Plate', 'Grilled chicken with avocado and greens, zero carbs.', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=60&w=500', 279);
item('h5', 'Protein Wrap', 'Egg white and turkey wrap with spinach.', 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=60&w=500', 219);

// ---- SEARCH & HELPERS ----
export function searchRestaurants(query) {
  if (!query) return RESTAURANTS;
  const q = query.toLowerCase();

  const matchedItemRestaurantIds = MENU_ITEMS.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  ).map(item => item.restaurantId);

  return RESTAURANTS.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.cuisine.toLowerCase().includes(q) ||
    (r.category && r.category.toLowerCase().includes(q)) ||
    matchedItemRestaurantIds.includes(r.id)
  ).sort((a, b) => b.rating - a.rating);
}

export function getMenuItemsForRestaurant(restaurantId) {
  return MENU_ITEMS.filter(item => item.restaurantId === restaurantId);
}

export function getItemPricing(itemId) {
  return PLATFORM_PRICING[itemId] || [];
}
