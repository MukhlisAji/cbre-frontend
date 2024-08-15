import React, { useEffect, useRef, useState } from "react";
import { StyleStreet, ImageMore } from "../utils";
import { IoIosClose, IoMdClose } from "react-icons/io";

const FilterLine = ({ expandedMenu, subMenu }) => {
  const [isHover, setIsHover] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleOutHover = () => {
    timeoutRef.current = setTimeout(() => {
      if (
        subMenuRef.current &&
        !subMenuRef.current.matches(":hover") &&
        menuRef.current &&
        !menuRef.current.matches(":hover")
      ) {
        setIsHover(false);
        setExpanded(false);
      }
    }, 300);
  };

  const clearHoverTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        subMenuRef.current &&
        !subMenuRef.current.contains(event.target)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="absolute bottom-10 left-4 z-40 flex bg-white p-0.5 w-[90px] h-[90px] rounded-lg shadow-md text-center transition-all duration-200 delay-300 ease-in-out"
        onMouseEnter={() => {
          setTimeout(() => {
            setIsHover(true);
            clearHoverTimeout();
          }, 300);
        }}
        onMouseLeave={handleOutHover}
        ref={menuRef}
      >
        <div className="flex justify-center gap-2.5 items-center w-full h-full">
          <div className="relative cursor-pointer overflow-hidden transition-transform duration-300 ease-in-out hover:scale-90">
            <img
              src={StyleStreet}
              draggable="false"
              alt="line"
              className="object-cover w-[80px] h-[80px] rounded-lg transition-transform duration-300 ease-in-out hover:scale-90"
            />
            <p className="absolute bottom-0 w-full text-white text-md font-semibold z-10">
              Layer
            </p>
            <div className="absolute top-0 left-0 w-full h-full bg-black/30 rounded-lg"></div>
          </div>

        </div>
        {isHover && (
          <div
            className="absolute left-[110%] top-0 bg-white rounded-md shadow-md p-2 z-10 flex flex-row gap-4 items-start"
            onMouseEnter={clearHoverTimeout}
            onMouseLeave={handleOutHover}
            ref={subMenuRef}
          >
            {!expanded ? (
              <>
                {subMenu &&
                  subMenu.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center cursor-pointer"
                      onClick={item.onClick}
                    >
                      <div className="w-[70px] h-[70px] text-sm rounded-md overflow-hidden user-select-none object-cover shadow-md border hover:border-2 hover:border-c-teal">
                        <img
                          src={item.icon}
                          width={70}
                          height={70}
                          draggable="false"
                          alt={item.name}
                          className="w-full h-full object-cover text-sm"
                        />
                      </div>
                      <p className="text-sm text-neutral-700">{item.name}</p>
                    </div>
                  ))}
                <div
                  className="flex flex-col items-center justify-center w-[70px] cursor-pointer"
                  onClick={() => setExpanded(true)}
                >
                  <div className="p-2.5 w-full">
                    <img
                      src={ImageMore}
                      draggable="false"
                      alt="line"
                      className="w-full"
                    />
                  </div>
                  <p className="text-sm">More</p>
                </div>
              </>
            ) : (
              <>
                <div
                  className={`absolute -bottom-[75px] left-0 w-[450px] bg-white rounded-md shadow-md p-2 z-10 flex flex-col gap-5 ${expandedMenu ? "block" : "hidden"
                    }`}
                >
                  <button
                    className="absolute -right-2 -top-0 bg-transparent border-none text-xl cursor-pointer z-20"
                    onClick={() => setExpanded(false)}
                  >
                    <IoMdClose />
                  </button>
                  {expandedMenu &&
                    expandedMenu.map((section, index) => (
                      <div key={index} className="mb-5">

                        <h3 className="text-md text-neutral-700 font-bold text-md mb-5">{section.label}</h3>

                        <div className="flex flex-row px-2 gap-4 items-start flex-wrap text-center">
                          {section.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center justify-center w-[70px] cursor-pointer"
                              onClick={item.onClick}
                            >
                              <img
                                src={item.icon}
                                alt={item.name}
                                draggable="false"
                                className="w-full h-[70px] rounded-md object-cover shadow-md border hover:border-2 hover:border-c-teal"
                              />
                              <p className="text-sm text-neutral-700">{item.name}</p>
                            </div>
                          ))}
                        </div>
                        {index !== expandedMenu.length - 1 && (
                          <hr className="my-5" />
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FilterLine;
