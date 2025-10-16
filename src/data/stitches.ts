import { Stitch, StitchCategory } from '../types/stitch';
import knitSvg from '../assets/stitches/knit.svg?raw';
import purlSvg from '../assets/stitches/purl.svg?raw';
import yarnOverSvg from '../assets/stitches/yarn-over.svg?raw';
import k2togSvg from '../assets/stitches/k2tog.svg?raw';
import sskSvg from '../assets/stitches/ssk.svg?raw';
import slipSvg from '../assets/stitches/slip.svg?raw';
import cable4FrontSvg from '../assets/stitches/cable-4-front.svg?raw';
import cable4BackSvg from '../assets/stitches/cable-4-back.svg?raw';
import k3togSvg from '../assets/stitches/k3tog.svg?raw';
import makeBobbleSvg from '../assets/stitches/make-bobble.svg?raw';
import noStitchSvg from '../assets/stitches/no-stitch.svg?raw';

export const defaultStitches: Stitch[] = [
  {
    id: 'k',
    name: 'Knit',
    symbol: knitSvg,
    category: StitchCategory.Basic,
    abbreviation: 'k',
    description: 'Knit stitch (RS: knit, WS: purl)',
    width: 1,
    height: 1,
  },
  {
    id: 'p',
    name: 'Purl',
    symbol: purlSvg,
    category: StitchCategory.Basic,
    abbreviation: 'p',
    description: 'Purl stitch (RS: purl, WS: knit)',
    width: 1,
    height: 1,
  },
  {
    id: 'yo',
    name: 'Yarn Over',
    symbol: yarnOverSvg,
    category: StitchCategory.Increase,
    abbreviation: 'yo',
    description: 'Yarn over - creates an eyelet and increases by 1 stitch',
    width: 1,
    height: 1,
  },
  {
    id: 'k2tog',
    name: 'Knit 2 Together',
    symbol: k2togSvg,
    category: StitchCategory.Decrease,
    abbreviation: 'k2tog',
    description: 'Knit 2 stitches together - right-leaning decrease',
    width: 1,
    height: 1,
  },
  {
    id: 'ssk',
    name: 'Slip Slip Knit',
    symbol: sskSvg,
    category: StitchCategory.Decrease,
    abbreviation: 'ssk',
    description: 'Slip slip knit - left-leaning decrease',
    width: 1,
    height: 1,
  },
  {
    id: 'sl',
    name: 'Slip Stitch',
    symbol: slipSvg,
    category: StitchCategory.Basic,
    abbreviation: 'sl',
    description: 'Slip stitch purlwise',
    width: 1,
    height: 1,
  },
  {
    id: 'c4f',
    name: 'Cable 4 Front',
    symbol: cable4FrontSvg,
    category: StitchCategory.Cable,
    abbreviation: 'c4f',
    description: 'Cable 4 front - cross 2 over 2 to the left',
    width: 2,
    height: 1,
  },
  {
    id: 'c4b',
    name: 'Cable 4 Back',
    symbol: cable4BackSvg,
    category: StitchCategory.Cable,
    abbreviation: 'c4b',
    description: 'Cable 4 back - cross 2 over 2 to the right',
    width: 2,
    height: 1,
  },
  {
    id: 'k3tog',
    name: 'Knit 3 Together',
    symbol: k3togSvg,
    category: StitchCategory.Decrease,
    abbreviation: 'k3tog',
    description: 'Knit 3 stitches together - centered double decrease',
    width: 1,
    height: 1,
  },
  {
    id: 'mb',
    name: 'Make Bobble',
    symbol: makeBobbleSvg,
    category: StitchCategory.Texture,
    abbreviation: 'mb',
    description: 'Make bobble - (k1, p1, k1, p1, k1) in same stitch, turn and purl 5, turn and k5tog',
    width: 1,
    height: 1,
  },
  {
    id: 'no-stitch',
    name: 'No Stitch',
    symbol: noStitchSvg,
    category: StitchCategory.Basic,
    abbreviation: '-',
    description: 'No stitch placeholder',
    width: 1,
    height: 1,
  },
];
