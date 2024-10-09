import pptxgen from "pptxgenjs";
import background1 from "../../../assets/backgroundPpt1.png";
import background2 from "../../../assets/backgroundPpt2.png";
import { formatDate } from "./FormatTime";

export const generatePPT = (data) => {
  let pptx = new pptxgen();
  let mapboxToken =
    "pk.eyJ1IjoicmFqaWZtYWhlbmRyYSIsImEiOiJjbHVjYTI2d2MwcnBzMmxxbndnMnNlNTUyIn0.aaCGYQ2OYIcIsAa4X-ILDA";

  // Slide 1: Name and Email
  let slide1 = pptx.addSlide();
  slide1.background = { path: background1 };
  slide1.addText(`${data.name ? data.name.toUpperCase() : "DATA BUILDING CBRE"}`, {
    x: 0.78,
    y: 1.93,
    fontSize: 48,
    bold: true,
    fontFace: "JetBrains Mono",
    color: "ffffff",
  });
  slide1.addText(
    `Date: ${formatDate(new Date())}\nPrepared by:\n${data.email ? data.email : "@CBRE TEAM"}`,
    {
      x: 0.853,
      y: 4.0,
      fontSize: 8,
      bold: true,
      fontFace: "Calibri",
      color: "dddddd",
    }
  );

  // Iterate through buildings and create slides for each
  data.building.forEach((building, i) => {
    let slide = pptx.addSlide();
    slide.background = { path: background2 };

    // Add building title
    slide.addText(`BUILDING ${i + 1}`, {
      x: 0.35,
      y: 0.8,
      bold: true,
      fontSize: 24,
      color: "ffffff",
    });

    let mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-${
      i + 1
    }+000(${building.LONGITUDE},${building.LATITUDE})/${building.LONGITUDE},${
      building.LATITUDE
    },15/400x200?access_token=${mapboxToken}`;
    slide.addImage({
      path: mapUrl,
      x: 0.5,
      y: 3,
      w: 4,
      h: 2,
    });

    // Define the table data for each building
    let tableData = [
      [
        {
          text: "Building ID",
          options: {
            bold: true,
            fill: "000000",
            fontFace: "JetBrains Mono",
            color: "ffffff",
          },
        },
        {
          text: building.BUILDINGID.toString(),
          options: { fontFace: "JetBrains Mono", color: "ffffff" },
        },
      ],
      [
        {
          text: "Building Name",
          options: {
            bold: true,
            fill: "000000",
            fontFace: "JetBrains Mono",
            color: "ffffff",
          },
        },
        {
          text: building.BUILDINGNAME,
          options: { fontFace: "JetBrains Mono", color: "ffffff" },
        },
      ],
      [
        {
          text: "Latitude",
          options: {
            bold: true,
            fill: "000000",
            fontFace: "JetBrains Mono",
            color: "ffffff",
          },
        },
        {
          text: building.LATITUDE.toString(),
          options: { fontFace: "JetBrains Mono", color: "ffffff" },
        },
      ],
      [
        {
          text: "Longitude",
          options: {
            bold: true,
            fill: "000000",
            fontFace: "JetBrains Mono",
            color: "ffffff",
          },
        },
        {
          text: building.LONGITUDE,
          options: { fontFace: "JetBrains Mono", color: "ffffff" },
        },
      ],
    ];

    // Add the table to the slide
    slide.addTable(tableData, {
      x: 0.5,
      y: 1.7,
      w: 9.0,
      border: { pt: 1, color: "ffffff" },
    });
  });

  // Save the PPT
  pptx.writeFile({ fileName: "Building CBRE.pptx" });
};