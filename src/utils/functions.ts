export function getNameById(myObject: any, id: number) {
  for (const [key, value] of Object.entries(myObject)) {
    if (value === id) {
      const nameKey = key === "id" ? "name" : "id"; // Assuming 'name' is the opposite key
      return myObject[nameKey];
    }
  }
  return null;
}

const reverseString = (str: any) => {
  return str.split("").reverse().join("");
};

export const groupDigital = (num: any) => {
  const emptyStr = "";
  const group_regex = /\d{3}/g;

  // delete extra comma by regex replace.
  const trimComma = (str: any) => {
    return str.replace(/^[,]+|[,]+$/g, emptyStr);
  };

  const str = num + emptyStr;
  const [integer, decimal] = str.split(".");

  const conversed = reverseString(integer);

  const grouped = trimComma(
    reverseString(conversed.replace(/\d{3}/g, (match: any) => `${match},`))
  );

  return !decimal
    ? `${grouped}.00`
    : decimal.length == 1
    ? `${grouped}.${decimal}0`
    : `${grouped}.${decimal.substring(0, 2)}`;
};
