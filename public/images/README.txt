Drop your images here, at these exact paths.

hero/hero-01.avif  ... hero-08.avif
hero/hero-09.jpg
    The scatter cards. NO fixed height any more - each card is sized
    by its own image, which is what removed the white letterbox bars.
    Card positions and drift speeds live in src/data/assets.js.

products/product-01.jpg ... product-05.jpg
    Roughly 264x387. object-fit: cover, so they will crop.

brands/
    brand-01 (1).png ... brand-01 (10).png
    images__2_-removebg-preview.png
    images__3_-removebg-preview.png
    Twelve marks, exactly as named in your downloads folder. If you
    rename them, edit BRANDS in src/data/assets.js - nowhere else
    references them.

bg.png
    Full-bleed background for the section after the maroon circle.

footer.png
    The embossed HALFSY panel, 1441x626. The footer height is derived
    from that ratio so the wordmark is never cropped horizontally.
