import { Vector } from '../../contracts/Figma';

import { roundNumber } from '../../frameworks/string/roundNumber';

import { ErrorCalculateDegree2Point } from '../../frameworks/errors/errors';

/**
 * Calculate an angle based on 2 coordinates (x, y)
 *
 * NOTE! This implementation is not strictly equal to what Figma outputs in their CSS inspection panel
 * @see https://9elements.com/blog/gradient-angles-in-css/
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient#Composition_of_a_linear_gradient
 *
 * Overall implementation based on this work:
 * @see https://gist.github.com/conorbuck/2606166
 */
export function calculateDegree2Point(point1: Vector, point2: Vector): number {
  if (!point1 || !point2) throw Error(ErrorCalculateDegree2Point);

  const angleDeg =
    ((Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180) / Math.PI + 450) % 360;
  return roundNumber(angleDeg, 2);
}
