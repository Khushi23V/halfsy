/* ============================================================
   brands.js - the directory behind /brands.

   `name` matches the brand filter on the live halfsy.shop exactly
   (24 Sep 2026), so /shop?brand={name} lands on the same brand.
   `origin` is where the house is based, written by hand.
   `logo` comes from BRANDS in assets.js (the marks already used on
   the landing page) - only twelve exist so far; every other brand
   falls back to its name set in Cormorant on the hover card until a
   mark is added. Logos are trademarks: use the ones each affiliate
   programme provides, or ones the brand has approved.

   `origin` is not shown on the page any more; kept for filters later.
   ------------------------------------------------------------ */
import { BRANDS } from './assets.js';

const RAW = [
  ['Alemais', 'Australia'],
  ['Alexander McQueen', 'United Kingdom'],
  ['AMI Paris', 'France'],
  ['Amiri', 'United States'],
  ['Balenciaga', 'France'],
  ['Balmain', 'France'],
  ['Bogner', 'Germany'],
  ['Bottega Veneta', 'Italy'],
  ['Brioni', 'Italy'],
  ['Brunello Cucinelli', 'Italy'],
  ['Burberry', 'United Kingdom'],
  ['Canada Goose', 'Canada'],
  ['Canali', 'Italy'],
  ['Carolina Herrera', 'United States'],
  ['Cesare Attolini', 'Italy'],
  ['Chloe', 'France'],
  ['Christopher Esber', 'Australia'],
  ['Cult Gaia', 'United States'],
  ['Dolce & Gabbana', 'Italy'],
  ['Elie Saab', 'Lebanon'],
  ['Etro', 'Italy'],
  ['Falke', 'Germany'],
  ['Ferragamo', 'Italy'],
  ['Gabriela Hearst', 'United States'],
  ['Gianvito Rossi', 'Italy'],
  ['Gieves & Hawkes', 'United Kingdom'],
  ['Giorgio Armani', 'Italy'],
  ['Giuseppe Zanotti', 'Italy'],
  ['Givenchy', 'France'],
  ['Gucci', 'Italy'],
  ['Herno', 'Italy'],
  ['Jacquemus', 'France'],
  ['Jimmy Choo', 'United Kingdom'],
  ['Johanna Ortiz', 'Colombia'],
  ['John Lobb', 'United Kingdom'],
  ['Kiton', 'Italy'],
  ['Loewe', 'Spain'],
  ['Mackage', 'Canada'],
  ['Maison Margiela', 'France'],
  ['Marchesa', 'United States'],
  ['Missoni', 'Italy'],
  ['Miu Miu', 'Italy'],
  ['N. Peal', 'United Kingdom'],
  ['Off-White', 'Italy'],
  ['Orlebar Brown', 'United Kingdom'],
  ['Oscar De La Renta', 'United States'],
  ['Palm Angels', 'Italy'],
  ['Prada', 'Italy'],
  ['Ralph Lauren', 'United States'],
  ['Rick Owens', 'France'],
  ['Roberto Cavalli', 'Italy'],
  ['Saint Laurent', 'France'],
  ['Santoni', 'Italy'],
  ['Stone Island', 'Italy'],
  ["Tod's", 'Italy'],
  ['Tom Ford', 'United States'],
  ['Valentino', 'Italy'],
  ['Versace', 'Italy'],
  ['Vilebrequin', 'France'],
  ['Yves Salomon', 'France'],
  ['Zegna', 'Italy'],
  ['Zimmermann', 'Australia']
];

/* the landing page labels a few marks differently from the shop's
   brand names - map them onto the directory's names */
const LOGO_ALIASES = {
  'AMI Alexandre Mattiussi': 'AMI Paris',
  'Alémais': 'Alemais'
};
const logoFor = new Map(BRANDS.map(b => [LOGO_ALIASES[b.label] || b.label, b.src]));

export const BRAND_INDEX = RAW.map(([name, origin]) => ({
  name,
  origin,
  logo: logoFor.get(name) || null
}));
