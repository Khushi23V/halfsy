/* ============================================================
   productDetails.js - what the product screen (/p/:id) knows
   beyond the listing itself.

   Only ONE product has details so far - the Brunello Cucinelli
   sequin dress - because this screen is being designed on it. Any
   other /p/:id still renders (image, brand, name, price, CTAs) and
   simply leaves out sizes and the price history.

   PLACEHOLDERS. The live halfsy.shop feed carries no sizes and no
   price history today; these are invented to show the design:
     sizes    - `stock: false` means sold out at the retailer. Only
                in/out: never "only 2 left" unless the retailer
                itself reports it (see the dark-patterns note in the
                direction doc).
     history  - one entry per price CHANGE, oldest first. The chart
                draws it as steps, because a price holds until it
                moves; the last entry is the price today.
     checked  - when the price and sizes were last read from the
                retailer. Shown next to the price.
   ------------------------------------------------------------ */

export const PRODUCT_DETAILS = {
  'brunello-cucinelli-sequin-midi-dress': {
    colour: 'Silver',
    sizeSystem: 'US',
    sizes: [
      { label: '0',  stock: false },
      { label: '2',  stock: true  },
      { label: '4',  stock: true  },
      { label: '6',  stock: true  },
      { label: '8',  stock: false },
      { label: '10', stock: true  },
      { label: '12', stock: false }
    ],
    checked: '2 hours ago',
    history: [
      { date: '2026-06-27', price: 7300 },
      { date: '2026-08-01', price: 5840 },
      { date: '2026-08-22', price: 4380 },
      { date: '2026-09-12', price: 3650 },
      { date: '2026-09-21', price: 2920 }
    ],
    retailerNote: 'Delivery and returns are handled by Bergdorf Goodman.'
  }
};
