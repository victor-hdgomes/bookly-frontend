/**
 * Calculates the discount amount based on price and percentage
 * @param price - Original price
 * @param discountPercent - Discount percentage (0-100)
 * @returns Discount amount
 */
export function calculateDiscountAmount(
  price: number,
  discountPercent: number,
): number {
  if (discountPercent <= 0) return 0;
  return (price * discountPercent) / 100;
}

/**
 * Calculates the final price after applying the discount
 * @param price - Original price
 * @param discountPercent - Discount percentage (0-100)
 * @returns Final price with discount applied
 */
export function calculateFinalPrice(
  price: number,
  discountPercent: number,
): number {
  const discountAmount = calculateDiscountAmount(price, discountPercent);
  return price - discountAmount;
}

/**
 * Checks whether a discount is applicable
 * @param discountPercent - Discount percentage
 * @returns true if there is a discount, false otherwise
 */
export function hasDiscount(discountPercent: number): boolean {
  return discountPercent > 0;
}

/**
 * Calculates complete pricing and discount information
 * @param price - Original price
 * @param discountPercent - Discount percentage (0-100)
 * @returns Object containing all pricing information
 */
export function calculatePriceInfo(price: number, discountPercent: number) {
  const discountAmount = calculateDiscountAmount(price, discountPercent);
  const finalPrice = calculateFinalPrice(price, discountPercent);
  const hasDiscountApplied = hasDiscount(discountPercent);

  return {
    originalPrice: price,
    discountPercent,
    discountAmount,
    finalPrice,
    hasDiscount: hasDiscountApplied,
  };
}
