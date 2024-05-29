import React from "react";
import Hero from "../components/hero/Hero";
import CategoryList from "../components/categoryList/CategoryList";
import SliderProduct from "../components/sliderProduct/SliderProduct";

const zxc = {
  category: [
    "airpodes",
    "watches",
    "mobiles",
    "Mouse",
    "televisions",
    "camera",
    "earphones",
    "speakers",
    "refrigerator",
    "trimmers",
  ],
  title: [
    "Top's Airpodes",
    "Popular's Watches",
    "Mobiles",
    "Mouse",
    "Televisions",
    "Camera & Photography",
    "Wired Earphones",
    "Bluetooth Speakers",
    "Refrigerator",
    "Trimmers",
  ],
};
const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryList />

      {zxc.category.map((item, index) => (
        <SliderProduct
          key={index}
          category={item}
          title={zxc.title[index]}
          sliderId={index + 1}
        />
      ))}
    </div>
  );
};

export default Home;
