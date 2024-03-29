function mergeStyleAttributes(style1, style2) {
  const styleObject1 = styleToObject(style1);
  const styleObject2 = styleToObject(style2);
  const mergedStyleObject = { ...styleObject1, ...styleObject2 };
  const mergedStyleString = objectToStyle(mergedStyleObject);
  return mergedStyleString;
}
function styleToObject(style) {
  const styleObject = {};
  const stylePairs = style.split(";").filter((pair) => pair.trim() !== "");
  stylePairs.forEach((pair) => {
    const [key, value] = pair.split(":").map((part) => part.trim());
    styleObject[key] = value;
  });
  return styleObject;
}
function objectToStyle(styleObject) {
  return Object.entries(styleObject).map(([key, value]) => `${key}: ${value}`).join("; ");
}
export {
  mergeStyleAttributes
};
