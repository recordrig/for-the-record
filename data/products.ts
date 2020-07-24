interface Product {
  readonly name: string;
  /** Price in cents. */
  readonly price: number;
  readonly quantityLimit: number;
}

/** All available products that should be listed. */
type ProductIds = "RR20-black" | "RR20-white";

type Products = Record<ProductIds, Product>;

/**
 * Complete list of products currently offered.
 *
 * This should be the sole source of truth for all products. Do not keep
 * an additional administration of products elsewhere, including external
 * services.
 */
const products: Products = {
  "RR20-black": {
    name: "RecordRig - Stealth Black",
    price: 1,
    quantityLimit: 25,
  },
  "RR20-white": {
    name: "RecordRig - Pristine White",
    price: 25,
    quantityLimit: 4,
  },
};

export default products;
