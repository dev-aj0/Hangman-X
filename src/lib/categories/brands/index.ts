import { CarBrands } from './car-brands';
import { DesignerBrands } from './designer-brands';
import { TechBrands } from './tech-brands';
import { FashionBrands } from './fashion-brands';

export const Brands = {
  'Car Brands': CarBrands,
  'Designer Brands': DesignerBrands,
  'Tech Brands': TechBrands,
  'Fashion Brands': FashionBrands
} as const;