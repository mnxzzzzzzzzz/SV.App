export type Merchant = {
    id: string;
    name: string;
    category: string;
    offer: string;
    distance: string;
    rules: string;
  };
  
  export const merchants: Merchant[] = [
    {
      id: "1",
      name: "Costa Coffee",
      category: "Coffee",
      offer: "20% off all drinks",
      distance: "120m",
      rules: "1 use/day • Expires 23:59",
    },
    {
      id: "2",
      name: "Papa Johns",
      category: "Food",
      offer: "Buy 1 Get 1 Free",
      distance: "350m",
      rules: "Dine-in only • 1 use/day",
    },
    {
      id: "3",
      name: "VOX Cinemas",
      category: "Entertainment",
      offer: "Student ticket AED 25",
      distance: "1.2km",
      rules: "Mon–Thu • ID required",
    },
  ];
  