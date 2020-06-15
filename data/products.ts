interface Product {
  /** Price in cents. */
  readonly price: number;
}

/** All available products that should be listed. */
type ProductIds = "RR20-black" | "RR20-white";

type Products = Record<ProductIds, Product>;

const products: Products = {
  "RR20-black": {
    price: 229900
  },
  "RR20-white": {
    price: 229900
  }
};

export default products;
