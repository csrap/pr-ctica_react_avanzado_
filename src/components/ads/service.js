import client from '../../api/client';

const adsBaseUrl = '/api';

export const getLastestdAds = () => {
  const url = `${adsBaseUrl}/v1/adverts`;
  return client.get(url);
};

export const createAds = async (advert) => {
  const url = `${adsBaseUrl}/v1/adverts`;
  try {
    await client.post(url, advert);
    // await client.post(url, formData, { 'Context-Type': 'multipart/form-data' });
  } catch (error) {
    console.log(error);
  }
};

export const getAd = (id) => {
  const url = `${adsBaseUrl}/v1/adverts/${id}`;
  return client.get(url);
};

export const deleteAdvert = (id) => {
  const url = `${adsBaseUrl}/v1/adverts/${id}`;
  return client.delete(url);
};

export const getFilterAdvert = ({ name, sale = "All", price, tags }) => {
  let url = `${adsBaseUrl}/v1/adverts?`;
  const arrayTags = tags || [];
  const arrayPrices = price || [];

  url += name ? `name=${name}` : "";
  url += sale !== "All" && sale !== "" ? `&sale=${sale}` : "";
  // url += price ? `&price=${price[0]}&price=${price[1]}` : "";

  if (arrayPrices.length > 0) {
    url += `&price=${arrayPrices[0]}&price=${arrayPrices[1]}`;
  }

  if (arrayTags.length > 0) {
    for (let arrayTag of arrayTags) {
      url += `&tags=${arrayTag}`;
    }
  }

  return client.get(url);
};




