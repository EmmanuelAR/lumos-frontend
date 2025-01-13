export interface Position {
    positionId: number;
    pool: {
      t1: string,
      t2: string
    };
    roi: number;
    feeAPY: number;
    liquidity: number;
    priceRange: {
      min: number;
      max: number;
    };
    currentPrice: number;
  }