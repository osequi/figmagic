import { camelize } from '../helpers/camelize';

import {
  errorSetupEasingTokensNoFrame,
  errorSetupEasingTokensNoChildren,
  errorSetupEasingTokensMissingProps
} from '../../meta/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma easings into a clean object
 *
 * @param easingFrame The easings frame from Figma
 */
export function setupEasingTokens(easingFrame: Frame): EasingTokens {
  if (!easingFrame) throw new Error(errorSetupEasingTokensNoFrame);
  if (!easingFrame.children) throw new Error(errorSetupEasingTokensNoChildren);

  let easingObject = {};

  easingFrame.children.forEach((type) => {
    if (!type.name || !type.characters) throw new Error(errorSetupEasingTokensMissingProps);

    const name = camelize(type.name);

    easingObject[name] = type.characters.trim();
  });

  return easingObject;
}
