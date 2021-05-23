import getByKey from 'lodash/get';
import { locale } from 'yargs';
const lang = locale();

const config = {
  en: {
    desc: '📦 WebApp/Library development toolkit',
    icon: {
      desc: 'Generate icon files from svg files',
      sourceDesc: 'SVG source',
      typeDesc: 'TS type file for icon',
      outputDirDesc: 'Directory to output icon files',
      templateDesc: 'SVG Template file',
      sortDirDesc: 'Sort themes by directory',
      noThemeSuffixDesc: 'Whether to remove the file name theme suffix',
      taskChunkDesc: 'Chunk of icon generation task',
      noIndexDesc: 'Whether to generate an export file',
      tsxDesc: 'Will generate react tsx files',
      vueDesc: 'Will generate vue files',
      dynamicIdDesc: 'Use dynamic ID',
      includedThemesDesc: 'Themes recognized by default',
      example1: 'Generate icons in ohu-mobile format',
      example2: 'Generate directory name as icon theme',
      example3: 'Generate icons in tsx format',
      example4: 'Generate icons in vue format',
      example5: 'Customize icon template',
      removeFilesQuestion: 'There are tsx, ts or vue files in the directory, delete them?',
      globsExistError: 'SVG file source does not exist',
      templateExistError: 'SVG template does not exist',
      genSuccess: ' generated successfully',
      genFail: ' fail to generate',
      start: 'Start to generate ...',
      iconsGenSuccess: 'All icon files are generated successfully',
      indexFileGenSuccess: 'export file (index.ts) generated successfully',
      typeFileGenSuccess: 'type file generated successfully',
      allGenSuccess: 'All files generated successfully',
      allGenFail: 'Generate Error!',
    },
    doc: {
      desc: 'Generate Markdown section or file from code (Support Vue, yargs)',
    },
  },
  zh_CN: {
    desc: '📦 WebApp及类库开发工具箱',
    icon: {
      desc: '图标文件生成器，可将SVG文件转换为TS图标文件',
      sourceDesc: 'SVG文件源',
      typeDesc: '图标类型文件模板（支持art-template模板）',
      outputDirDesc: 'TS图标输出目录',
      templateDesc: 'TS图标文件模板（支持art-template模板）',
      sortDirDesc: '通过目录对图标进行风格分类',
      noThemeSuffixDesc: '是否去除文件名类型后缀',
      taskChunkDesc: '图标生成任务分块',
      noIndexDesc: '是否生成导出文件',
      tsxDesc: '将会生成React tsx文件',
      vueDesc: '将会生成Vue文件',
      dynamicIdDesc: '使用动态ID',
      includedThemesDesc: '默认被识别的主题',
      example1: '生成ohu-mobile格式的图标',
      example2: '将文件夹名称作为图标类型去生成',
      example3: '生成tsx格式的图标',
      example4: '生成vue格式的图标',
      example5: '定制图标生成模板',
      removeFilesQuestion: '目录中存在tsx|ts|vue文件，是否删除？',
      globsExistError: 'SVG文件源不存在',
      templateExistError: '您指定的SVG模板不存在',
      genSuccess: ' 生成成功',
      genFail: '生成失败',
      start: '正在生成中...',
      iconsGenSuccess: '所有图标文件生成成功',
      indexFileGenSuccess: '导入文件(index.ts)生成成功',
      typeFileGenSuccess: '类型文件生成成功',
      allGenSuccess: '所有文件生成成功',
      allGenFail: '生成失败',
    },
    doc: {
      desc: '从代码中生成Markdown片段或是文件（支持Vue， yargs）',
    },
  },
};

const enLocale = config['en'];

const localeFile = config[lang] || enLocale;

export default function l(key: string) {
  const value = getByKey(localeFile, key);
  if (!value) return getByKey(enLocale, key);
  return value;
}
