import React, { useRef, useState, useEffect } from "react";
// import { ImageSlider } from './ImageSlider';
import { LuSettings2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import ModalSearch from "./modal/ModalSearch";
import ModalFilter from "./modal/ModalFilter";
import { generateTransactionId } from "../../lib/api/Authorization";
// import './SearchArea.css';
import homeImage from "../../../../src/assets/home.avif";
import ClassicSearch from "./ClassicSearch";
import PopoverFilter from "./modal/PopoverFilter";
import PropertySearchForm from "./PropertySearchForm";
import SearchNew from "./SearchNew";

const SearchArea = () => {
  const [isClassic, setIsClassic] = useState(false);

  return (
    <div>
      {!isClassic ? (
        <div className="h-screen p-4">
          {/* carousel */}
          {/* <div className="relative flex justify-center items-center h-80 w-4/5 mx-auto"> */}
          <img
            className="relative flex justify-center items-center h-80 w-full max-w-[1200px] mx-auto rounded-xl"
            src={homeImage}
            alt="Scenery"
          />

          {/* </div> */}

          <SearchNew
            className="relative flex flex-col left-1/2 transform -translate-x-1/2 -mt-20 pt-2 z-30 flex justify-center items-center px-24"
            setIsClassic={setIsClassic}
          />
        </div>
      ) : (
        <PropertySearchForm />
      )}
    </div>
  );
};

export default SearchArea;
