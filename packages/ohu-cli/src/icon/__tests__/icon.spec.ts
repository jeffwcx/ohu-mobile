/**
 * `ohu icon` testing
 */
import fs from 'fs-extra';
import mock from 'mock-fs';
import path from 'path';
import svgo from 'svgo';
import { buildIcon } from '..';
import pkgDir from 'pkg-dir';
import { optimizeSVG } from '../generate';
import defaultConfig from '../defaultConfig';
import resolvePlugins from '../svgo/resolvePlugins';
import jsxPlugin from '../svgo/jsxPlugin';

const config = {
  ...defaultConfig,
  _: [],
  $0: 'ohu',
};

describe('`ohu icon`', () => {
  const rootDir = pkgDir.sync(__dirname);
  beforeEach(() => {
    const normalSvg = mock.load(path.resolve(__dirname, './assets/basic/normal.svg'));
    const svgDir = mock.load(path.resolve(__dirname, './assets/basic'));
    mock({
      '/react-template.art': mock.load(path.resolve(rootDir, 'templates/react-template.art')),
      '/svg-template.art': mock.load(path.resolve(rootDir, 'templates/default-template.art')),
      '/svg-types.art': mock.load(path.resolve(rootDir, 'templates/default-type.art')),
      '/assets/normal.svg': normalSvg,
      '/assets/complex.svg': mock.load(path.resolve(__dirname, './assets/complex/complex.svg')),
      '/theme/regular': svgDir,
      '/theme/light': svgDir,
      '/bytheme': mock.load(path.resolve(__dirname, './assets/bytheme')),
      '/remixicon': mock.load(path.resolve(__dirname, './assets/remixicon')),
    });
  });
  afterEach(() => {
    mock.restore();
  });
  it('should transform svg file to ts icon file', async () => {
    await buildIcon({
      ...config,
      outputDir: '/icons',
      globs: '/assets/normal.svg',
      template: '/svg-template.art',
      type: '/svg-types.art',
    });
    let fileContent = Buffer.from([]);
    await expect(fs.readFile('/icons/Normal.ts').then((data) => {
      fileContent = data;
      return true;
    })).resolves.toBeTruthy();
    mock.restore();
    expect(fileContent.toString()).toMatchSnapshot();
  });

  it('should classified by directory when `sortDir` is `true`', async () => {
    await buildIcon({
      ...config,
      outputDir: '/icons',
      globs: '/theme/**/*.svg',
      template: '/svg-template.art',
      type: '/svg-types.art',
      sortDir: true,
    });
    const result = await fs.readdir('/icons');
    const expectFiles = expect.arrayContaining([
      'ActivityRegular.ts',
      'ActivityLight.ts',
      'index.ts',
      'types.ts',
    ]);
    expect(result).toEqual(expectFiles);
  });

  it('should get correct file list when using `theme-suffix`', async () => {
    await buildIcon({
      ...config,
      outputDir: '/icons',
      globs: '/bytheme/**/*.svg',
      template: '/svg-template.art',
      type: '/svg-types.art',
      noThemeSuffix: true,
      sortDir: true,
    });

    const result = await fs.readdir('/icons');
    const expectFiles = expect.arrayContaining([
      'XSquareThin.ts',
      'XSquareRegular.ts',
      'XThin.ts',
      'XRegular.ts',
      'YoutubeLogoThin.ts',
      'YoutubeLogoRegular.ts',
      'index.ts',
      'types.ts',
    ]);
    expect(result).toEqual(expectFiles);
  });

  it('optimize svg', () => {
    const svg = `
    <svg viewBox="0 0 135 120"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient x1="50%" y1="116.813%" x2="50%" y2="0%" id="b">
          <stop stop-color="#FFF" offset="0%"/>
          <stop stop-color="#E7F0FF" offset="100%"/>
        </linearGradient>
        <circle id="a" cx="60" cy="60" r="60"/>
      </defs>
      <g>
        <use fill="url(#b)" xlink:href="#a"/>
      </g>
    </svg>
    `;
    const { data } = optimizeSVG(svg, { dynamicId: true });
    mock.restore();
    expect(data).toMatchSnapshot();
  });

  it('resolvePlugins', () => {
    const plugins = resolvePlugins([
      'cleanupAttrs',
      { name: 'removeMetadata' },
      { name: 'removeTitle' },
      { name: 'removeAttrs', params: { attrs: '(fill|stroke)' } },
      'prefixIds',
    ], [
      { name: 'removeAttrs', active: false },
      'reusePaths',
      {
        name: 'prefixIds',
        params: { delim: '{{id}}' },
      }
    ]);
    expect(plugins).toEqual([
      'cleanupAttrs',
      { name: 'removeMetadata' },
      { name: 'removeTitle' },
      {
        name: 'prefixIds',
        params: { delim: '{{id}}' },
      },
      'reusePaths',
    ]);
  });

  it('should turn to react svg file when using `tsx`', async () => {
    await buildIcon({
      ...config,
      outputDir: '/icons',
      globs: '/assets/normal.svg',
      template: '/react-template.art',
      type: '/svg-types.art',
      tsx: true,
    });
    const fileContent = await fs.readFile('/icons/Normal.tsx');
    mock.restore();
    expect(fileContent.toString()).toMatchSnapshot();
  });

  it('should turn to react svg file when using `tsx` and `dynamicId`', async () => {
    await buildIcon({
      ...config,
      outputDir: '/icons',
      globs: '/assets/complex.svg',
      template: '/react-template.art',
      type: '/svg-types.art',
      tsx: true,
      dynamicId: true,
    });
    const fileContent = await fs.readFile('/icons/Complex.tsx');
    mock.restore();
    expect(fileContent.toString()).toMatchSnapshot();
  });

  it('jsx plugin', async () => {
    const fileContent = await fs.readFile('/assets/complex.svg');
    const data = svgo.optimize(fileContent.toString(), {
      multipass: true,
      plugins: [jsxPlugin],
    });
    mock.restore();
    expect(data).toMatchSnapshot();
  });

  it('should covert specific topics when using `includedThemes`', async () => {
    await buildIcon({
      ...config,
      outputDir: '/icons',
      globs: '/theme/regular/',
      template: '/svg-template.art',
      tsx: true,
      includedThemes: ['ty'],
      sortDir: false,
    });
    const result = await fs.readdir('/icons');
    const expectFiles = expect.arrayContaining([
      'ActiviTy.tsx',
      'Normal.tsx',
      'index.ts',
    ]);
    expect(result).toEqual(expectFiles);
  });

  it('should throw error when globs is undefined', async () => {
    expect(buildIcon({
      ...config,
    })).rejects.toThrowError();
  });

  it('should rename filename', async () => {
    await buildIcon({
      ...config,
      outputDir: '/icons',
      globs: '/bytheme',
      template: '/react-template.art',
      tsx: true,
      noIndex: true,
      sortDir: true,
      noThemeSuffix: true,
      rename: ({ name, theme }) => {
        return { name: 'e' + name, theme: theme + 'e' };
      },
    });
    const result = await fs.readdir('/icons');
    const expectFiles = expect.arrayContaining([
      'ExSquareThine.tsx',
      'ExSquareRegulare.tsx',
      'ExThine.tsx',
      'ExRegulare.tsx',
      'EyoutubeLogoThine.tsx',
      'EyoutubeLogoRegulare.tsx',
    ]);
    expect(result).toEqual(expectFiles);
  });


  it('remixicon test', async () => {
    await buildIcon({
      ...config,
      outputDir: '/icons',
      globs: '/remixicon',
      template: '/svg-template.art',
      svgoConfig: {
        plugins: [{
          name: 'removeUselessStrokeAndFill',
        }],
      },
    });
    const content = await fs.readFile('/icons/Activity.ts');
    expect(content.toString()).toMatchSnapshot();
  });

});
