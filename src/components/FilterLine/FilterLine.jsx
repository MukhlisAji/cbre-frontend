import React, { useEffect, useRef, useState } from "react";
import IconLine from "../../assets/jalur.png";
import "./FilterLine.css";

const FilterLine = ({ expandedMenu, subMenu }) => {
  const [isHover, setIsHover] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef(null);
  const subMenuRef = useRef(null);
  let timeoutRef = useRef(null);

  const handleOutHover = () => {
    timeoutRef.current = setTimeout(() => {
      if (
        subMenuRef.current &&
        !subMenuRef.current.matches(":hover") &&
        menuRef.current &&
        !menuRef.current.matches(":hover")
      ) {
        setIsHover(false);
      }
    }, 300); // 5 seconds delay
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
        className="filter-container"
        onMouseEnter={() =>
          setTimeout(() => {
            setIsHover(true);
            clearHoverTimeout();
          }, 300)
        }
        onMouseLeave={() => handleOutHover()}
        ref={menuRef}
      >
        <div className="filter-content">
          <div className="filter-icon">
            <img src={IconLine} draggable="false" alt="line" />
            <p>Layer</p>
          </div>
        </div>
        {isHover && (
          <div
            className="submenu"
            onMouseEnter={clearHoverTimeout}
            onMouseLeave={() => handleOutHover()}
            ref={subMenuRef}
          >
            {subMenu && subMenu.map((item, index) => (
              <div key={index} className="submenu-item" onClick={item.onClick}>
                <div className="submenu-icon">
                  <img src={item.icon} draggable="false" alt={item.name} />
                </div>
                <p>{item.name}</p>
              </div>
            ))}
            <div className="submenu-item" onClick={() => setExpanded(true)}>
              <p>Lainnya</p>
            </div>
          </div>
        )}
      </div>
      {expanded && (
        <div className="expanded-menu">
          <button className="close-btn" onClick={() => setExpanded(false)}>
            x
          </button>
          {expandedMenu && expandedMenu.map((section, index) => (
            <div key={index} className="expanded-section">
              <h3>{section.label}</h3>
              <div className="expanded-items">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="submenu-item"
                    onClick={item.onClick}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      draggable="false"
                      className="submenu-icon"
                    />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
              {index !== expandedMenu.length - 1 && <hr />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FilterLine;
