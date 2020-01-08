#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const glob = require("glob");
const util = require("util");
const fs = require("fs-extra");
const rimraf = require("rimraf");
const yargs = require("yargs");
const chalk = require("chalk");
const svgo_1 = require("svgo");
const art = require("art-template");
const globAsync = util.promisify(glob);
const svgo = new svgo_1.default({
    plugins: [{
            cleanupAttrs: true,
        }, {
            removeDoctype: true,
        }, {
            removeXMLProcInst: true,
        }, {
            removeComments: true,
        }, {
            removeMetadata: true,
        }, {
            removeTitle: true,
        }, {
            removeDesc: true,
        }, {
            removeUselessDefs: true,
        }, {
            removeEditorsNSData: true,
        }, {
            removeEmptyAttrs: true,
        }, {
            removeHiddenElems: true,
        }, {
            removeEmptyText: true,
        }, {
            removeEmptyContainers: true,
        }, {
            removeViewBox: false,
        }, {
            cleanupEnableBackground: true,
        }, {
            convertStyleToAttrs: true,
        }, {
            convertColors: true,
        }, {
            convertPathData: true,
        }, {
            convertTransform: true,
        }, {
            removeUnknownsAndDefaults: true,
        }, {
            removeNonInheritableGroupAttrs: true,
        }, {
            removeUselessStrokeAndFill: true,
        }, {
            removeUnusedNS: true,
        }, {
            cleanupIDs: true,
        }, {
            cleanupNumericValues: true,
        }, {
            moveElemsAttrsToGroup: true,
        }, {
            moveGroupAttrsToElems: true,
        }, {
            collapseGroups: true,
        }, {
            removeRasterImages: false,
        }, {
            mergePaths: true,
        }, {
            convertShapeToPath: true,
        }, {
            sortAttrs: true,
        }, {
            removeDimensions: true,
        }, {
            removeAttrs: { attrs: '(stroke|fill)' },
        }]
});
function upperCaseFirstLetter(str) {
    if (str) {
        return str[0].toUpperCase() + str.substring(1);
    }
    return '';
}
function transformToCamelCase(name) {
    return name.split('-').map(str => {
        return upperCaseFirstLetter(str);
    }).join('');
}
function genIcons(svgPath, outputPath, template, useSvgo, themeByFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, dir } = path.parse(svgPath);
        let iconTheme = '';
        let iconName;
        if (!themeByFile) {
            const dirNameArr = dir.split(path.sep);
            const theme = dirNameArr[dirNameArr.length - 1];
            iconTheme = theme;
            iconName = name;
        }
        else {
            const nameArr = name.split('-');
            const lastOne = nameArr[nameArr.length - 1];
            let result;
            if (lastOne && (result = lastOne.match(/.*(line)|(fill)|(multi).*/))) {
                const [_, l, f, m] = result;
                if (l)
                    iconTheme = 'outlined';
                if (f)
                    iconTheme = 'filled';
                if (m)
                    iconTheme = 'multi-color';
                iconName = nameArr.slice(0, nameArr.length - 1).join('-');
            }
            else {
                iconName = name;
                iconTheme = 'outlined';
            }
        }
        const fileName = transformToCamelCase(iconName) + transformToCamelCase(iconTheme);
        let fileContent = yield fs.readFile(svgPath, 'utf8');
        if (useSvgo) {
            const { data } = yield svgo.optimize(fileContent, { path: svgPath });
            fileContent = data;
        }
        let attrs = {};
        const children = fileContent.replace(/<svg([^>]*)>/, (_, attrsStr) => {
            if (attrsStr) {
                const reg = (/([a-zA-Z:]+)\="(.+?)"/g);
                let match = reg.exec(attrsStr);
                while (match !== null) {
                    const [_, key, value] = Array.from(match);
                    attrs[key] = value;
                    match = reg.exec(attrsStr);
                }
            }
            return '';
        }).replace(/<\/svg>/, '').replace('\n', '');
        const outputFilePath = path.format({
            dir: outputPath,
            name: fileName,
            ext: '.ts',
        });
        const outputFileData = art.render(template, Object.assign(Object.assign({}, attrs), { name: iconName, fileName, theme: iconTheme, children }));
        yield fs.writeFile(outputFilePath, outputFileData);
        return {
            outputPath: outputFilePath,
            fileName,
            theme: iconTheme,
            name: iconName,
        };
    });
}
function genIndex(outputPath, iconFileNames) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = '';
        iconFileNames.map((icon) => {
            result += `export { default as ${icon} } from './${icon}';\n`;
        });
        const outputFilePath = path.format({
            dir: outputPath,
            name: 'index',
            ext: '.ts',
        });
        yield fs.writeFile(outputFilePath, result);
    });
}
function genTypes(outputPath, typesFileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const str = yield fs.readFile(typesFileName, 'utf-8');
        const outputFilePath = path.format({
            dir: outputPath,
            name: 'types',
            ext: '.ts',
        });
        yield fs.writeFile(outputFilePath, str);
    });
}
function main({ outputDir, _, svgTemplate, useSvgo, themeByFile, types }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!path.isAbsolute(outputDir)) {
            outputDir = path.join(process.cwd(), outputDir);
        }
        const isExists = yield fs.pathExists(outputDir);
        if (!isExists) {
            yield fs.mkdirp(outputDir);
        }
        else {
            rimraf.sync(`${outputDir}/*.(tsx|ts)`);
        }
        let svgGlob = _[0];
        if (!path.isAbsolute(svgGlob)) {
            svgGlob = path.join(process.cwd(), svgGlob);
        }
        if (!path.isAbsolute(svgTemplate)) {
            svgTemplate = path.join(process.cwd(), svgTemplate);
        }
        const svgTplExists = yield fs.pathExists(svgTemplate);
        if (!svgTplExists) {
            throw new Error('svg模板不存在！请保证其存在');
        }
        const [svgPaths, templateStr] = yield Promise.all([
            globAsync(svgGlob),
            fs.readFile(svgTemplate, 'utf8'),
        ]);
        const iconFileNames = [];
        yield Promise.all(svgPaths.map((svgPath) => genIcons(svgPath, outputDir, templateStr, useSvgo, themeByFile)
            .then(({ outputPath, fileName }) => {
            iconFileNames.push(fileName);
            console.log(chalk.green(outputPath, '生成成功'));
        })
            .catch(error => {
            console.log(chalk.yellow(svgPath, '生成失败'));
            console.error(error);
        })));
        try {
            yield genIndex(outputDir, iconFileNames);
            if (types) {
                if (!path.isAbsolute(types)) {
                    types = path.join(process.cwd(), types);
                }
                yield genTypes(outputDir, types);
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.main = main;
const options = yargs
    .scriptName('generate-svg-icons')
    .options({
    types: {
        type: 'string',
        description: '类型文件'
    },
    outputDir: {
        alias: 'o',
        type: 'string',
        description: '图标输出路径',
    },
    svgTemplate: {
        alias: 't',
        type: 'string',
        description: 'svg模板文件地址',
    },
    useSvgo: {
        alias: 's',
        type: 'boolean',
        description: '是否使用svgo',
        default: false,
    },
    themeByFile: {
        alias: 'f',
        type: 'boolean',
        description: '是否通过文件名区分主题',
        default: false,
    },
})
    .help()
    .argv;
try {
    main(options);
}
catch (error) {
    console.error(chalk.red(error, '生成失败'));
}
