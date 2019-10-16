import { CommercialOffersResponse, Product } from './ProductModel';

const apiURL = 'http://henri-potier.xebia.fr';

export const fetchProducts = async () => {
  const route = '/books';

  const response = await fetch(apiURL + route);

  const data: Product[] = await response.json();

  return data;
};

export const fetchCommercialOffers = async (productsIds: string[]) => {
  const route = `/books/${productsIds.join(',')}/commercialOffers`;

  const response = await fetch(apiURL + route);

  const data: CommercialOffersResponse = await response.json();

  return data.offers;
};
