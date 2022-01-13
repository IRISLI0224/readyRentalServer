/**
 * author: Jack Zhu
 * helper function to tackle user's compound search input
 * e.g. "Hobart, Tas" -> ['Hobart', 'Tas']
 */
function splitAddr(input) {
  if (input.includes(',')) {
    const splitStr = input.split(',');
    const trimmedArr = splitStr.map((value) => {
      return value.trim();
    });
    return trimmedArr;
  }
  // else, only has ' ' (space)
  return input.split(' ');
}

module.exports = splitAddr;
