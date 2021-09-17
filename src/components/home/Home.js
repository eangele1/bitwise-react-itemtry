import React, { useEffect, useState } from "react";
import Header from "../header/Header.js";
import Product from "./Product";
import banner from '../../home-banner.png';
import Footer from "../footer/Footer.js";
import "./Home.css";
import { getAllProducts } from "../../utilities/utils.js";
import Spinner from "../Spinner/Spinner.js";

const Home = () => {

   const [randProds, setRandProds] = useState(null);
   const [isLoading, setLoading] = useState(true);

   const randomUnique = (arrSize, count) => {
      var arr = [];
      while (arr.length < count) {
         var r = Math.floor(Math.random() * arrSize - 1) + 1;
         if (arr.indexOf(r) === -1) arr.push(r);
      }
      return arr;
   }

   useEffect(() => {
      setLoading(true);
      getAllProducts()
         .then((result) => {
            var tempArr = [];
            var randNums = randomUnique(result.length, 4);

            for (var i in randNums) {
               tempArr.push(result[randNums[i]]);
            }

            setRandProds(tempArr);
            setLoading(false);
         });
      return;
   }, []);

   return (
      <>
         <Header />
         <div className="home">
            <div>
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                     className="home__image"
                     src={banner}
                     alt="amazon_home_clone"
                  />
               </div>
               <div style={{ minHeight: "calc(100vh - 625px)", height: "calc(50vw - 500px)" }}></div>

               <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>

                  {isLoading ? <><Spinner LoadState={isLoading} /></> : <>

                     {randProds.map((item, index) => (
                        <Product
                           key={index}
                           id={item.id}
                           title={item.title}
                           price={item.price}
                           rating={item.rating}
                           image={item.image}
                        />
                     ))}
                  </>
                  }
               </div>

               <br />

            </div>

         </div>
         <Footer>©2021 Itemtry is owned and operated by Ezer Angeles under an MIT License.<br />The owner is not responsible on any aspects of your purchases since you cannot actually purchase anything here.</Footer>
      </>
   );
}

export default Home;