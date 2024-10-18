import mapboxgl from "mapbox-gl";
import { useEffect, useState } from "react";
import { colorMap } from "../constant";
import { generatedColor, generatedRounded } from "../helper";
import { CONFIG_APP } from "../config/app";

export function useMRTData(zoom, map) {
  console.log("Using MRT data hook...");
  //mrt stasion
  const MRTData = async () => {
    console.log("Fetching MRT data...");
    const res = await fetch(
      `${CONFIG_APP.MAPBOX_API}/map-transportation/mrt`
    );

    console.log(res)
    const responseData = await res.json();
    responseData?.geojson?.features?.forEach((station) => {
      if (station.properties.CODES) {
        const values = station.properties.CODES.filter((value) => value);
        let linesOutput = "";

       
        linesOutput += `<div class="marker-testing">`;
        let first_code;
        values.forEach((value, index, array) => {
          const prefix = value.match(/^[A-Z]+/)[0];
          const separated = value.replace(/([A-Z]+)(\d+)/, "$1 $2");
          if(index==0){
            first_code= prefix
          }
          
          //ini warnany
          let color;
          if(station.properties.ISACTIVE){
            color = colorMap[prefix] || "gray";
          }else{
            color ="#696969";
          }
         
          if (color) {
            linesOutput += `<span class="${color}" style="padding: 0.3em 10px; display: inline-block; line-height: 1; background-color: ${color}; font-size: 15px; color: ${generatedColor(
              color
            )}; ${generatedRounded(index, array.length)};">${separated}</span>`;
          }
        });
        linesOutput += `</div>`;

        const element = document.createElement("div");
        element.innerHTML = `
    <div class="container-marker-name-testing">
      <div class="marker-name-testing">${station?.properties?.STATION}</div>
      <div class="icon-wrapper">
       ${
          first_code !== "BP" && first_code !== "SK" && first_code !== "PG" 
           ? `
           <svg
             width="15px"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 448 512"
           >
             <path
               fill="#ffffff"
               d="M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 128c0-17.7 14.3-32 32-32h80c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM272 96h80c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H272c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32zM64 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm288-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
             />
           </svg>`
           : `<svg
           width="15px"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 448 512"
         >
           <path
             fill="#ffffff"
             d="M86.8 48c-12.2 0-23.6 5.5-31.2 15L42.7 79C34.5 89.3 19.4 91 9 82.7S-3 59.4 5.3 49L18 33C34.7 12.2 60 0 86.8 0H361.2c26.7 0 52 12.2 68.7 33l12.8 16c8.3 10.4 6.6 25.5-3.8 33.7s-25.5 6.6-33.7-3.7L392.5 63c-7.6-9.5-19.1-15-31.2-15H248V96h40c53 0 96 43 96 96V352c0 30.6-14.3 57.8-36.6 75.4l65.5 65.5c7.1 7.1 2.1 19.1-7.9 19.1H365.3c-8.5 0-16.6-3.4-22.6-9.4L288 448H160l-54.6 54.6c-6 6-14.1 9.4-22.6 9.4H43c-10 0-15-12.1-7.9-19.1l65.5-65.5C78.3 409.8 64 382.6 64 352V192c0-53 43-96 96-96h40V48H86.8zM160 160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32H288c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32H160zm32 192a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
           />
         </svg>`
       }
      </div>
      </div>
      ${linesOutput}
    `;

        const markerNameLabel = new mapboxgl.Marker(element);
        markerNameLabel
          .setLngLat(station.geometry.coordinates)
          .addTo(map.current);

        let hoverPopup;

        element.addEventListener("mouseenter", () => {
          const backgroundColor = station.properties.ISACTIVE ? '' : 'grey';
          hoverPopup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="popup-container">
                <div class="info-box">
                    <div class="info-container">
                      <h3><b>Station Name : ${station.properties.STATION}<b></h3>
                      <p class="status" style="background-color: ${backgroundColor}; font-size: 12px; padding: 2px 4px;"> ${station.properties.ISACTIVE ? '' : 'U/C'}</p>
                    </div>
                </div>
            </div>`);
          hoverPopup.setLngLat(station.geometry.coordinates).addTo(map.current);
         

          element.hoverPopup = hoverPopup;

          hoverPopup.getElement().addEventListener("mouseleave", () => {
            hoverPopup.remove();
            element.hoverPopup = null;
          });
        });

        element.addEventListener("mouseleave", () => {
          if (hoverPopup && !hoverPopup.getElement().matches(":hover")) {
            hoverPopup.remove();
            element.hoverPopup = null;
          }
        });

        markerNameLabel
          .setLngLat(station.geometry.coordinates)
          .addTo(map.current);
      }

      const markerLabel = document.querySelectorAll(".marker-testing");
      markerLabel.forEach((item) => {
        item.style.display = "none";
      });

      const markerName = document.querySelectorAll(
        ".container-marker-name-testing"
      );
      markerName.forEach((item) => {
        item.style.display = "none";
      });

      if (zoom < 2) {
        const mLabel = document.querySelectorAll(".marker-testing");
        mLabel.forEach((item) => {
          item.style.display = "none";
        });
      }

      if (zoom < 2) {
        const mName = document.querySelectorAll(
          ".container-marker-name-testing"
        );
        mName.forEach((item) => {
          item.style.display = "none";
        });
      }
    });
  };
  useEffect(() => {
    MRTData();
  }, []);
}

export function useMRTLine(map) {
  const [showMRT, setShowMRT] = useState(false);
  const MRTLineData = async () => {
    const spinnerDiv = document.getElementById("spinner")

    let spinner = `
    
    <div class="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
    </div>

    `
    spinnerDiv.innerHTML=spinner

    const res = await fetch(
      `${CONFIG_APP.MAPBOX_API}/map-transportation/line`
    );
    const responseData = await res.json();

    spinnerDiv.innerHTML=``

    const geoJson = responseData.geojson;
    map.current.addSource("line", {
      type: "geojson",
      data: geoJson,
    });
    map.current.addLayer({
      id: "line",
      type: "line",
      source: "line",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": ["get", "color"],
        "line-width": 4,
      },
    });

    // Add click event listener to the map
    map.current?.on("click", "region", function (e) {
      var features = map.queryRenderedFeatures(e.point);
      if (!features.length) {
        return;
      }

      var f = features[0];
      $("#console-output").html(``);
      $("#console-output").html(
        `> Hey, you're click on -> Region ` + f.properties.name
      );
    });
  };
  useEffect(() => {
    if (showMRT) {
      MRTLineData();
    } else {
      if (map?.current?.getLayer("line")) {
        map?.current?.removeLayer("line");
      }
      if (map?.current?.getSource("line")) {
        map?.current?.removeSource("line");
      }
    }
  }, [showMRT]);

  return { showMRT, setShowMRT };
}