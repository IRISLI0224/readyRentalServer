/**
 * @author: Jack Zhu
 * helper function to tackle user's compound search input
 * e.g. "Hobart, Tas" -> ['Hobart', 'Tas']
 */
function splitAddr(input) {
  if (input.includes(',')) {
    const splitStr = input.trim().split(',');
    const trimmedArr = splitStr.map((value) => {
      return value.trim();
    });
    return trimmedArr;
  }
  // else, only has ' ' (space)
  return input.trim().split(' ');
}

/**
 * @author: Jack Zhu
 * resolve and split the string from google auto-completion
 * for now, can tackle following permutations/combinations: i.e. {streetNumber}? {streetName}, {suburb}? {city} {, |' '} {state}
 * e.g. 
 * 25 Delavan Street, Wishart Brisbane, QLD
 * 25 Delavan Street, Temora NSW
 * Delavan Street, Temora NSW
 * Delavan Street, Wishart Brisbane, QLD
 */
function handleGoogleAddr(input) {
  // ['25 Delavan Street', ' Wishart Brisbane', ' QLD']
  // ['25 Delavan Street', ' Temora NSW']
  // ['Delavan Street', ' Temora NSW']
  // remember to trim()!
  const splitComma = input.split(',');
  const cityAndState = getStateAndCity(splitComma);
  // split splitComma[0] first
  const streetNumAndNameArr = splitComma[0].trim().split(' ');
  // unary operator to convert to type - Number
  if (!isNaN(streetNumAndNameArr[0])) {
    const streetNumber = +streetNumAndNameArr[0];
    // get rid off streetNumber and the last word, then join ' '
    const streetName = streetNumAndNameArr.slice(1, streetNumAndNameArr.length - 1).join(' ');
    // get 'city' and state

    // create an array:
    // [0] - streetNumber
    // [1] - streetName (get rid off 'Street', 'Avenue', 'Road' etc.)
    // [2] - city
    // [3] - state
    return [streetNumber, streetName, cityAndState[0], cityAndState[1]];
  }
  // ['Delavan Street', ' Temora NSW']
  // ['Delavan Street', ' Wishart Brisbane', ' QLD']
  // get rid off streetNumber and the last word, then join ' '
  const streetName = streetNumAndNameArr.slice(0, streetNumAndNameArr.length - 1).join(' ');
  return [streetName, cityAndState[0], cityAndState[1]];
}

// helper function for handleGoogleAddr()
function getStateAndCity(splitComma) {
  // length of splitComma[] to find out its index
  const length = splitComma.length;
  const lastEle = splitComma[length - 1].trim().split(' ');
  let state = '';
  let city = '';
  if (lastEle.length === 1) {
    // i.e. only has 'state' - e.g. 'QLD', 'NSW'
    state = lastEle[0];
    // in this case, 'city' is at the index of (length - 2)
    // and its position is at the last index (let's assume 'city' only has one word for now :( )
    const penultimateEle = splitComma[length - 2].trim().split(' ');
    city = penultimateEle[penultimateEle.length - 1];
  } else {
    // length > 1. e.g. ['Temora', 'NSW']
    state = lastEle[lastEle.length - 1];
    city = lastEle.slice(0, lastEle.length - 1).join(' ');
  }
  return [city, state];
}

module.exports = { splitAddr, handleGoogleAddr };
