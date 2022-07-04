/**
 * Uuid function
 */
export const uuid = () => {
  let d = performance.now();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
};

/**
 * Function that asserts if a value is defined and filled
 * @param value
 * @param type
 */
export const isDefined = (value, type = null) => {
  let valid = typeof (value) !== "undefined";

  if (type) {
    switch (type.toLowerCase()) {
      case "string":
        valid = valid && typeof (value) === "string" && value !== "";
        break;
      case "array":
        valid = valid && value instanceof Array && value.length > 0;
        break;
      case "object":
        valid = valid && typeof (value) === "object" && Object.keys(value).length > 0;
        break;
      case "function":
        valid = valid && typeof (value) === "function";
        break;
      case "number":
        valid = valid && typeof (value) === "number";
        break;
      case "value":
        valid = valid && value;
        break;
    }
  }

  return valid;
};

/**
 * Is defined shortcut
 * @param value
 * @param type
 */
export const iD = (value, type = null) => isDefined(value, type);

/**
 * Deep clone
 * @param {Any} obj Element to clone
 * @returns {Any}
 */
export const clone = obj => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return obj;
  }
};
