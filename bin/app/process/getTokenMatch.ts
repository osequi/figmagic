import { normalizeUnits } from '../helpers/normalizeUnits';

import { MsgGetTokenMatchNoMatch } from '../../frameworks/messages/messages';
import { ErrorGetTokenMatch, ErrorGetTokenMatchNoRemSize } from '../../frameworks/errors/errors';

import { TokenMatch } from '../../app/contracts/process/TokenMatch';

// TODO: Refactor

/**
 * @description Match and find design tokens for CSS values
 *
 * @param tokens Design tokens
 * @param tokenFileName String representing file name from which the token is exported
 * @param property CSS property to be assigned
 * @param expectedValue Expected value to match for
 * @param remSize HTML body REM size, required for padding and anything to do with rem/em
 */
export function getTokenMatch(
  tokens: object,
  tokenFileName: string,
  property: string,
  expectedValue: string | number | object,
  remSize: number
): TokenMatch {
  if (!tokens || !tokenFileName || !property || !expectedValue) throw new Error(ErrorGetTokenMatch);

  let updatedCss: string = ``;
  let updatedImports: any[] = [];

  // Padding requires both X and Y dimensions/values so requires a bit more noodling
  if (property === 'padding')
    doPadding(expectedValue, remSize, tokens, tokenFileName, property, updatedCss, updatedImports);
  else doOther(expectedValue, remSize, tokens, tokenFileName, property, updatedCss, updatedImports);

  return { updatedCss, updatedImports };
}

function doPadding(
  expectedValue: string | number | object,
  remSize: string,
  tokens: string,
  tokenFileName: string,
  property: string,
  updatedCss: string,
  updatedImports: string
) {
  const keys = Object.keys(expectedValue);

  keys.forEach((key) => {
    let foundMatch = false;

    if (expectedValue[key] && expectedValue[key] > 0) {
      if (!remSize) throw new Error(ErrorGetTokenMatchNoRemSize);
      const value = normalizeUnits(expectedValue[key], 'px', 'rem', remSize);

      // Check if we can match value with a token and its value
      Object.entries(tokens).forEach((s) => {
        if (s[1] === value) {
          updatedCss += `${property}-${key}: \${${tokenFileName}.${s[0]}};\n`;
          foundMatch = true;
        }
      });

      // Write expected value as-is, since we couldn't match it to a token
      if (!foundMatch) {
        console.warn(`${MsgGetTokenMatchNoMatch} ${property}: ${value}`);
        updatedCss += `${property}-${key}: ${value};\n`;
      }
    }
  });

  updatedImports.push(tokenFileName);
}

function doOther(
  expectedValue: string,
  remSize: string,
  tokens: string,
  tokenFileName: string,
  property: string,
  updatedCss: string,
  updatedImports: string
) {
  let foundMatch = false;

  Object.entries(tokens).forEach((s) => {
    const TOKEN_VALUE = (() => {
      if (typeof s[1] === 'number') return s[1]; //parseFloat(s[1])
      return s[1];
    })();

    // Multiply rem|em strings through REM size argument
    const VALUE_THROUGH_REM = (() => {
      if (TOKEN_VALUE && typeof TOKEN_VALUE === 'string') {
        if (TOKEN_VALUE.match('rem') || TOKEN_VALUE.match('em')) {
          return parseFloat(TOKEN_VALUE) * remSize;
        }
      }
      return null;
    })();

    const IS_TOKEN_MATCH = VALUE_THROUGH_REM
      ? VALUE_THROUGH_REM === expectedValue
      : TOKEN_VALUE == expectedValue;

    if (IS_TOKEN_MATCH) {
      updatedCss += `${property}: \${${tokenFileName}.${s[0]}};\n`;
      updatedImports.push(tokenFileName);
      foundMatch = true;
    }
  });

  // Write expected value as-is, since we couldn't match it to a token
  if (!foundMatch) {
    console.warn(`${MsgGetTokenMatchNoMatch} ${property}: ${expectedValue}`);
    updatedCss += `${property}: ${expectedValue};\n`;
  }
}