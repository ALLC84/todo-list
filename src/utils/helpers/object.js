// Check if object is empty
export const isEmptyObject = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

// Get field of objects and arrays
export const fetchFromObject = (obj, prop) => {
  if (typeof obj === "undefined") return false;
  const index = prop.indexOf(".");
  if (index > -1) {
    return fetchFromObject(
      obj[prop.substring(0, index)],
      prop.substr(index + 1)
    );
  }
  return obj[prop];
};

// Set value in field at objects and arrays
export const setValueObjectByField = (obj, prop, value) => {
  if (typeof obj !== "undefined") {
    const index = prop.indexOf(".");
    if (index > -1) {
      setValueObjectByField(
        obj[prop.substring(0, index)],
        prop.substr(index + 1),
        value
      );
    } else {
      // eslint-disable-next-line no-param-reassign
      obj[prop] = value;
    }
  }
};

export const isNil = (value) => value === null || value === undefined;

export const isEmpty = (value) => value === "";
