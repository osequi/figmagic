export const testConfig = {
  debugMode: false,
  borderWidthUnit: 'px',
  fontUnit: 'rem',
  letterSpacingUnit: 'em',
  lineHeightUnit: 'unitless',
  opacitiesUnit: 'float',
  radiusUnit: 'px',
  shadowUnit: 'px',
  spacingUnit: 'rem',
  figmaData: 'figma.json',
  figmagicFolder: '.figmagic',
  outputFolderElements: 'elements',
  outputFolderGraphics: 'graphics',
  outputFolderTokens: 'tokens',
  outputFormatColors: 'rgba',
  outputFormatCss: 'ts',
  outputFormatDescription: 'md',
  outputFormatElements: 'tsx',
  outputFormatGraphics: 'svg',
  outputFormatStorybook: 'js',
  outputFormatTokens: 'ts',
  outputGraphicElements: false,
  outputGraphicElementsMap: false,
  outputScaleGraphics: 1,
  outputDataTypeToken: null,
  overwrite: {
    css: false,
    description: false,
    graphic: false,
    react: false,
    storybook: false,
    styled: false
  },
  recompileLocal: false,
  remSize: 16,
  skipFileGeneration: {
    forceUpdate: true,
    skipCss: false,
    skipDescription: false,
    skipReact: false,
    skipStorybook: false,
    skipStyled: false
  },
  syncElements: false,
  syncGraphics: false,
  syncTokens: true,
  templates: {
    templatePathGraphic: './node_modules/figmagic/templates/graphic',
    templatePathReact: './node_modules/figmagic/templates/react',
    templatePathStorybook: './node_modules/figmagic/templates/story',
    templatePathStyled: './node_modules/figmagic/templates/styled'
  },
  token: '',
  url: '',
  usePostscriptFontNames: false
};
