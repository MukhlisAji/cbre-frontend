export const generatedRounded = (index, length) => {
  if (index === 0 && length === 1) {
    return "border-radius: 100px";
  } else if (index === length - 1) {
    return "border-top-right-radius: 100px; border-bottom-right-radius: 100px";
  } else if (index === 1 && length === 3) {
    return "border-radius: 0px";
  } else if (index === 0 && length === 3) {
    return "border-top-left-radius: 100px; border-bottom-left-radius: 100px";
  }
};
