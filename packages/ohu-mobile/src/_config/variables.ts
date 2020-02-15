// General
export let $prefix: string = 'ohu-';
// Color
export let $colorOrange: string = process.env.$colorOrange || '#ff9434';
export let $colorRed: string = process.env.$colorRed || '#ff2d31';
export let $colorGreen: string = process.env.$colorGreen || '#36b365';
export let $colorGrey: string = process.env.$colorGrey || '#eee';
export let $colorBlue: string = process.env.colorBlue || '#2d7eff';
export let $colorGold: string = process.env.$colorGold || '#DBB46E';

export let $colorPrimary: string = process.env.$colorPrimary || $colorBlue;
export let $colorTextBase: string = process.env.$colorTextBase || '#333';
export let $colorTextBaseInverse: string = process.env.$colorTextBaseInverse || '#fff';
export let $colorTextMinor: string = process.env.$colorTextMinor || '#999';
export let $colorTextDisabled: string = process.env.$colorTextDisabled || $colorGrey;
export let $colorTextWarn: string = process.env.$colorTextWarn || $colorOrange;
export let $colorTextError: string = process.env.$colorTextError || $colorRed;
export let $colorTextHighlight: string = process.env.$colorTextHighlight || $colorGreen;

export let $colorBackgroundBase: string = process.env.$colorBackgroundBase || '#f5f5f5';
export let $colorBackgroundComponent: string = process.env.$colorBackgroundComponent || '#f8f8f8';
export let $colorDivider: string = process.env.$colorDivider || $colorGrey;
export let $colorMask: string = process.env.$colorMask || 'rgba(0, 0, 0, 0.639)';
export let $colorBorderBase: string = process.env.$colorBorderBase || '#ccc';

// Font
export let $fontFamily: string =  process.env.$fontFamily || 'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,微软雅黑,Arial,sans-serif';
export let $fontSizeBase: string = process.env.$fontSizeBase || '32px';
// Grid
export let $gridUnits: number = process.env.$gridUnits ? +process.env.$gridUnits : 12;
export let $gridGapLevel: number = process.env.$gridGapLevel ? +process.env.$gridGapLevel : 10;
export let $gridGapRate: string = process.env.$gridGapRate || '8px'

// Component/Tag
export let $tagBackgroundOrange: string = process.env.tagBackgroundOrange || 'rgba(255, 185, 76, 0.149)';
export let $tagBackgroundBlue: string =  process.env.$tagBackgroundBlue || 'rgba(47, 131, 255, 0.102)';

// Component/Badge
export let $badgeDotSize =  process.env.$badgeDotSize || '12px';
export let $badgeTagSize =  process.env.$badgeTagSize || '32px';
export let $badgeTagFontSize = process.env.$badageTagFontSize || '24px';
export let $badgeCornerSize = process.env.$badgeCornerSize || '36px';
export let $badgeCornerFontSize = process.env.$badgeCornerFontSize || '24px';
export let $badgeTextColor = process.env.$badgeTextColor || $colorTextBaseInverse;

// Component/Button
export let $buttonColorPrimaryDisabled: string = process.env.$buttonColorPrimaryDisabled || 'rgba(47, 131, 255, .3)';
export let $buttonColorDefaultActive: string = process.env.$buttonColorDefaultActive || '#F5F5F5';
export let $buttonColorPrimaryActive: string = process.env.$buttonColorPrimaryActive || '#2773E3';
export let $buttonColorPrimaryPlainActive: string = process.env.$buttonColorPrimaryPlainActive || '#73ABFF';
export let $buttonColorPlainDisabled: string = process.env.$buttonColorPlainDisabled || '#CCC';
export let $buttonColorTranslucentActive: string = process.env.$buttonColorTranslucentActive || $buttonColorPrimaryPlainActive;
export let $buttonColorTranslucentBgActive: string = process.env.$buttonColorTranslucentBgActive || '#C1DBFF';
export let $buttonColorTranslucentDisabled: string = process.env.$buttonColorTranslucentDisabled || 'rgba(47, 131, 255, 0.1)';
export let $buttonSizeNormal: string = process.env.$buttonSizeNormal || '96px';
export let $buttonSizeMd: string = process.env.$buttonSizeMd || '80px';
export let $buttonSizeSm: string = process.env.$buttonSizeSm || '64px';

// Component/Card
export let $cardBackground: string = process.env.$cardBackground || '#FFF';
export let $cardBoxShadow: string = process.env.$cardBoxShadow || '0px 4px 20px 0px rgba(153,153,153,0.2)';

// Component/Skeleton
export let $skeletonBackground: string = process.env.$skeletonBackground || $colorBackgroundBase;

// Component/Tabbar
export let $tabbarBackground: string = process.env.$tabbarBackground || 'rgba(255,255,255,0.9)';
export let $tabbarBorderColor: string = process.env.$tabbarBorderColor || 'rgba(0, 0, 0, .25)';

// Component/Loading
export let $loadingTextColor: string = process.env.$loadingTextColor || $colorTextMinor;

// Component/Popup
export let $popupHeaderCloseButtonColor: string = process.env.$popupHeaderCloseButtonColor || '#848C95';

// Component/Popover
export let $popoverContentBackground: string = process.env.$popoverContentBackground || '#4C4C4C';
export let $popoverArrowSize: string =  process.env.$popoverArrowSize || '12px';
export let $popoverDividerColor: string = process.env.$popoverDividerColor || '#6D6D6D';

// Component/DropMenu
export let $dropMenuItemOptionActiveColor: string = process.env.$dropMenuItemOptionActiveColor || '#F5F5F5';
export let $dropMenuItemOptionsBoxShadow: string = process.env.$dropMenuItemOptionsBoxShadow || '0px 2px 8px 0px rgba(153,153,153,0.2)';

// Component/Checkbox
export let $checkboxColor: string = process.env.$checkboxColor || '#ccc';

// Component/Radio
export let $radioColor: string = process.env.$radioColor || $checkboxColor;

// Component/Agree
export let $agreeColor: string = process.env.$agreeColor || $colorTextBase;

// Component/List
export let $listItemPadding: string = process.env.$listItemPadding || '30px';
export let $listSubheaderBackground: string = process.env.$listSubheaderBackground || '#EEE';
export let $listSubheaderColor: string = process.env.$listSubheaderColor || '#999';


// Component/Carousel
export let $carouselDotBackground: string =  process.env.$carouselDotBackground || 'rgba(255, 255, 255, 0.4)';
export let $carouselDotActiveBackground: string = process.env.$carouselDotActiveBackground || 'rgb(255, 255, 255)';
export let $carouselDotDarkBackground: string = process.env.$carouselDotDarkBackground || 'rgba(179, 190, 209, 0.2)';
export let $carouselDotDarkActiveBackground: string = process.env.$carouselDotDarkActiveBackground || 'rgba(179, 190, 209, 0.7)';
export let $carouselDotSize: string = process.env.$carouselDotSize || '6Px';

// Component/DetailItem
export let $detailItemTitleColor: string =  process.env.$detailItemTitleColor || $colorTextMinor;
export let $detailItemContentColor: string = process.env.$detailItemContentColor || $colorTextBase;
export let $detailItemExtraColor: string = process.env.$detailItemExtraColor || $colorTextMinor;

// Component/Image
export let $imageErrorBackground: string =  process.env.$imageErrorBackground || $colorBackgroundBase;
export let $imageErrorColor: string = process.env.$imageErrorColor || $colorTextMinor;

// Component/Collapse
export let $collapseExpandIconColor =  process.env.$collapseExpandIconColor || '#808080';
export let $collapseContntColor = process.env.$collapseContntColor || $colorTextMinor;
export let $collapseHeaderActiveColor = process.env.$collapseHeaderActiveColor || '#F5F5F5';
export let $collapseHeaderBackground =  process.env.$collapseHeaderBackground || '#FFF';

