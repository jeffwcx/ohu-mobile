import type { Config } from 'svgo';

export type IconCommandRenameArgs = { name: string; theme: string };

export interface IconCommandOptions {
  /**
   * svg file postion, support glob format
   * https://github.com/isaacs/node-glob
   */
  globs: string;
  /**
   * directory to output icon files
   */
  outputDir: string;
  /**
   * TS type file for icon
   */
  type?: string;
  /**
   * svg template file, support art-template
   * https://github.com/aui/art-template
   */
  template?: string;
  /**
   * whether to generate an export file
   */
  noIndex?: boolean;
  /**
   * sort themes by directory
   */
  sortDir: boolean;
  /**
   * whether to remove the file name theme suffix
   */
  noThemeSuffix?: boolean;
  /**
   * themes recognized by default
   */
  includedThemes?: string[];
  /**
   * use uniqueId
   */
  uniqueId?: boolean;
  /**
   * chunk of icon generation promise task
   */
  taskChunk?: number;
  /**
   * generate react tsx files
   */
  tsx?: boolean;
  /**
   * generate vue files
   */
  vue?: boolean;
  /**
   * rename icon filename
   */
  rename?: (args: IconCommandRenameArgs) => IconCommandRenameArgs;
  /**
   * svgo config https://github.com/svg/svgo
   */
  svgoConfig?: Config;
}

export type IconGeneratedEvent = {
  /**
   * Number of icons currently generated
   */
  count: number;
  /**
   * Total number of icons
   */
  total: number;
  /**
   * Current icon file name
   */
  fileName: string;
};

export interface BuildIconOptions extends IconCommandOptions {
  /**
   * @event Start generating icons
   */
  onStart?: () => void;
  /**
   * @event Icon generation progress
   */
  onProgress?: (event: IconGeneratedEvent) => void;
  /**
   * @event All icons generated successfully
   */
  onIconsGenerated?: () => void;
  /**
   * @event Index file have been generated successfully
   */
  onIndexFileGenerated?: () => void;
  /**
   *
   * @returns Type file have been generated successfully
   */
  onTypeFileGenerated?: () => void;
}

export interface OhuOptions {
  /**
   * `ohu icon` options
   */
  icon?: IconCommandOptions;
}
