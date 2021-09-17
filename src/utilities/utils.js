//API URL
const URL = "https://fakestoreapi.com/products";

export const getAllProducts = async () => {
  //checks to see if fetch works out, otherwise return an error
  try {
    const response = await fetch(URL);
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.log(e);
    const err = { Error: String(e) };
    return err;
  }
}

export const getProductsByCategory = async (input) => {

  //checks to see if fetch works out, otherwise return an error
  try {
    const response = await fetch(URL + `/category/${input}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.log(e);
    const err = { Error: String(e) };
    return err;
  }

}

export const getProduct = async (input) => {

  if (input <= 0 || isNaN(input)){
    return;
  }

  //checks to see if fetch works out, otherwise return an error
  try {
    const response = await fetch(URL + `/${input}`);
    const jsonData = await response.json();
    return jsonData;
  } catch (e) {
    console.log(e);
    const err = { Error: String(e) };
    return err;
  }
}