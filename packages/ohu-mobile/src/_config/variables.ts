import { env } from './env';

// General
export let $prefix: string = 'ohu-';
// Color
export let $colorOrange: string = env.$colorOrange || '#ff9434';
export let $colorRed: string = env.$colorRed || '#ff2d31';
export let $colorGreen: string = env.$colorGreen || '#36b365';
export let $colorGrey: string = env.$colorGrey || '#eee';
export let $colorBlue: string = env.colorBlue || '#2d7eff';
export let $colorGold: string = env.$colorGold || '#DBB46E';

export let $colorPrimary: string = env.$colorPrimary || $colorBlue;
export let $colorTextBase: string = env.$colorTextBase || '#333';
export let $colorTextBaseInverse: string = env.$colorTextBaseInverse || '#fff';
export let $colorTextMinor: string = env.$colorTextMinor || '#999';
export let $colorTextDisabled: string = env.$colorTextDisabled || $colorGrey;
export let $colorTextWarn: string = env.$colorTextWarn || $colorOrange;
export let $colorTextError: string = env.$colorTextError || $colorRed;
export let $colorTextHighlight: string = env.$colorTextHighlight || $colorGreen;

export let $colorBackgroundBase: string = env.$colorBackgroundBase || '#f5f5f5';
export let $colorBackgroundComponent: string =
  env.$colorBackgroundComponent || '#f8f8f8';
export let $colorDivider: string = env.$colorDivider || $colorGrey;
export let $colorMask: string = env.$colorMask || 'rgba(0, 0, 0, 0.639)';
export let $colorBorderBase: string = env.$colorBorderBase || '#ccc';

// Font
export let $fontFamily: string =
  env.$fontFamily ||
  'Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,微软雅黑,Arial,sans-serif';
export let $fontSizeBase: string = env.$fontSizeBase || '32px';
// Grid
export let $gridUnits: number = env.$gridUnits ? +env.$gridUnits : 24;
export let $gridGapLevel: number = env.$gridGapLevel ? +env.$gridGapLevel : 10;
export let $gridGapRate: string = env.$gridGapRate || '8px';

// Component/Tag
export let $tagGreyColor: string = env.$tagGreyColor || $colorTextBase;
export let $tagGreyBackground: string = env.$tagGreyBackground || $colorGrey;
export let $tagGreenColor: string = env.$tagGreenColor || $colorGreen;
export let $tagGreenBackground: string =
  env.$tagGreenBackground || 'rgba($tagGreenColor, .15)';
export let $tagOrangeColor: string = env.$tagOrangeColor || $colorOrange;
export let $tagOrangeBackground: string =
  env.$tagOrangeBackground || 'rgba(255, 148, 52, 0.15)';
export let $tagRedColor: string = env.$tagRedColor || $colorRed;
export let $tagRedBackground: string =
  env.$tagRedBackground || 'rgba($tagRedColor, .15)';
export let $tagBlueColor: string = env.$tagBlueColor || $colorBlue;
export let $tagBlueBackground: string =
  env.$tagBlueBackground || 'rgba($tagBlueColor, .15)';
export let $tagPrimaryColor: string = env.$tagPrimaryColor || $colorPrimary;
export let $tagPrimaryBackground: string =
  env.$tagPrimaryBackground || 'rgba($tagPrimaryColor, .15)';
export let $tagOutlineBackground: string =
  env.$tagOutlineBackground || $colorTextBaseInverse;
export let $tagBorderRadiusSm: number = env.$tagBorderRadiusSm
  ? +env.$tagBorderRadiusSm
  : 4;
export let $tagBorderRadiusMd: number = env.$tagBorderRadiusMd
  ? +env.$tagBorderRadiusMd
  : 8;
export let $tagBorderRadiusLg: number = env.$tagBorderRadiusLg
  ? +env.$tagBorderRadiusLg
  : 8;
export let $tagPaddingSm: string = env.$tagPaddingSm || '0 12px';
export let $tagPaddingMd: string = env.$tagPaddingMd || '12px 24px';
export let $tagPaddingLg: string = env.$tagPaddingLg || '16px 40px';
export let $tagFontSizeSm: string = env.$tagFontSizeSm || '24px';
export let $tagFontSizeMd: string = env.$tagFontSizeMd || '24px';
export let $tagFontSizeLg: string = env.$tagFontSizeLg || '28px';

// Component/Badge
export let $badgeDotSize = env.$badgeDotSize || '12px';
export let $badgeTagSize = env.$badgeTagSize || '32px';
export let $badgeTagFontSize = env.$badageTagFontSize || '24px';
export let $badgeCornerSize = env.$badgeCornerSize || '36px';
export let $badgeCornerFontSize = env.$badgeCornerFontSize || '24px';
export let $badgeTextColor = env.$badgeTextColor || $colorTextBaseInverse;

// Component/Button
export let $buttonColorPrimaryDisabled: string =
  env.$buttonColorPrimaryDisabled || 'rgba(47, 131, 255, .3)';
export let $buttonColorDefaultActive: string =
  env.$buttonColorDefaultActive || '#F5F5F5';
export let $buttonColorPrimaryActive: string =
  env.$buttonColorPrimaryActive || '#2773E3';
export let $buttonColorPrimaryPlainActive: string =
  env.$buttonColorPrimaryPlainActive || '#73ABFF';
export let $buttonColorPlainDisabled: string =
  env.$buttonColorPlainDisabled || '#CCC';
export let $buttonColorTranslucentActive: string =
  env.$buttonColorTranslucentActive || $buttonColorPrimaryPlainActive;
export let $buttonColorTranslucentBgActive: string =
  env.$buttonColorTranslucentBgActive || '#C1DBFF';
export let $buttonColorTranslucentDisabled: string =
  env.$buttonColorTranslucentDisabled || 'rgba(47, 131, 255, 0.1)';
export let $buttonSizeNormal: string = env.$buttonSizeNormal || '96px';
export let $buttonSizeMd: string = env.$buttonSizeMd || '80px';
export let $buttonSizeSm: string = env.$buttonSizeSm || '64px';

// Component/Card
export let $cardBackground: string = env.$cardBackground || '#FFF';
export let $cardBoxShadow: string =
  env.$cardBoxShadow || '0px 4px 20px 0px rgba(153,153,153,0.2)';
export let $cardBorderRadius: string = env.$cardBorderRadius || '8px';
export let $cardContentPadding: string = env.$cardContentPadding || '24px';
export let $cardHeaderFontSize: string = env.$cardHeaderFontSize || '32px';
export let $cardHeaderTopOffset: string = env.$cardHeaderTopOffset || '22px';
export let $cardHeaderLeftOffset: string = env.$cardHeaderLeftOffset || '24px';
export let $cardHeaderExtraFontSize: string =
  env.$cardHeaderExtraFontSize || '32px';
export let $cardHeaderExtraColor: string =
  env.$cardHeaderExtraColor || $colorTextMinor;
export let $cardHeaderExtraErrorColor: string =
  env.$cardHeaderExtraErrorColor || $colorTextError;
export let $cardHeaderExtraSuccessColor: string =
  env.$cardHeaderExtraSuccessColor || $colorTextHighlight;
export let $cardHeaderBoldFontSize: string =
  env.$cardHeaderBoldFontSize || '36px';

// Component/Skeleton
export let $skeletonBackground: string =
  env.$skeletonBackground || $colorBackgroundBase;

// Component/Tabbar
export let $tabbarBackground: string =
  env.$tabbarBackground || 'rgba(255,255,255,0.9)';
export let $tabbarBorderColor: string =
  env.$tabbarBorderColor || 'rgba(0, 0, 0, .25)';
export let $tabbarItemIndicatorColor =
  env.$tabbarItemIndicatorColor || $colorPrimary;
export let $tabbarHeight = env.$tabbarHeight || '98px';

// Component/Loading
export let $loadingTextColor: string = env.$loadingTextColor || $colorTextMinor;

// Component/Popup
export let $popupRoundRadius: string = env.$popupRoundRadius || '16px';
export let $popupHeaderCloseButtonColor: string =
  env.$popupHeaderCloseButtonColor || '#848C95';
export let $popupHeaderBackground: string =
  env.$popupHeaderBackground || '#FFF';
export let $popupHeaderTextFontSize = env.$popupHeaderTextFontSize || '32px';
export let $popupHeaderColor = env.$popupHeaderColor || $colorTextBase;
export let $popupHeaderMinorTextColor =
  env.$popupHeaderMinorTextColor || $colorTextMinor;
export let $popupHeaderMinorTextFontSize =
  env.$popupHeaderMinorTextColor || '28px';
// Component/Popover
export let $popoverContentBackground: string =
  env.$popoverContentBackground || '#4C4C4C';
export let $popoverArrowSize: string = env.$popoverArrowSize || '12px';
export let $popoverDividerColor: string = env.$popoverDividerColor || '#6D6D6D';

// Component/DropMenu
export let $dropMenuItemOptionActiveColor: string =
  env.$dropMenuItemOptionActiveColor || '#F5F5F5';
export let $dropMenuItemOptionsBoxShadow: string =
  env.$dropMenuItemOptionsBoxShadow || '0px 2px 8px 0px rgba(153,153,153,0.2)';

// Component/Checkbox
export let $checkboxFontSize: string = env.$checkboxFontSize || $fontSizeBase;
export let $checkboxColor: string = env.$checkboxColor || '#CCC';
export let $checkboxActiveColor: string =
  env.$checkboxActiveColor || $colorPrimary;
export let $checkboxLabelColor: string =
  env.$checkboxLabelColor || $colorTextBase;
// Component/Radio
export let $radioFontSize: string = env.$radioFontSize || $checkboxFontSize;
export let $radioColor: string = env.$radioColor || $checkboxColor;
export let $radioActiveColor: string =
  env.$radioboxActiveColor || $checkboxActiveColor;
export let $radioLabelColor: string =
  env.$radioLabelColor || $checkboxLabelColor;

// Component/Agree
export let $agreeColor: string = env.$agreeColor || $colorTextBase;

// Component/List
export let $listItemPadding: string = env.$listItemPadding || '30px';
export let $listItemColor: string = env.$listItemColor || $colorTextBase;
export let $listItemBorderColor: string =
  env.$listItemBorderColor || $colorDivider;
export let $listItemFontSize: string = env.$listItemFontSize || $fontSizeBase;
export let $listItemTextLineHeight: string =
  env.$listItemTextLineHeight || '1.375em';
export let $listItemMinorTextFontSize: string =
  env.$listItemMinorTextFontSize || '26px';
export let $listItemMinorTextLineHeight: string =
  env.$listItemMinorTextLineHeight || '1.384615em';
export let $listItemMinorTextColor: string =
  env.$listItemMinorTextColor || $colorTextMinor;
export let $listItemButtonActiveColor: string =
  env.$listItemButtonActiveColor || $buttonColorDefaultActive;
export let $listItemThumbMargin: string = env.$listItemThumbMargin || '24px';
export let $listItemAvatarSize: string = env.$listItemAvatarSize || '88px';
export let $listItemAvatarMinWidth: string =
  env.$listItemAvatarMinWidth || '120px';
export let $listItemIconSize: string = env.$listItemIconSize || '48px';
export let $listItemActionSize: string = env.$listItemActionSize || '36px';
export let $listItenActionCheckSize: string =
  env.$listItenActionCheckSize || '32px';
export let $listSubheaderBackground: string =
  env.$listSubheaderBackground || '#EEE';
export let $listSubheaderColor: string = env.$listSubheaderColor || '#999';

export let $listBottomFontSize: string = '28px';
export let $listSubheaderFontSize: string =
  env.$listSubheaderFontSize || '28px';
export let $listSubheaderStickyColor: string =
  env.$listSubheaderStickyColor || $colorPrimary;
export let $listSubheaderStickyBackground: string =
  env.$listSubheaderStickyBackground || $colorTextBaseInverse;
export let $listSubheaderStickyBoxShadow: string =
  env.$listSubheaderStickyBoxShadow || '0 1Px 10Px 0 #eee';

// Component/Carousel
export let $carouselDotBackground: string =
  env.$carouselDotBackground || 'rgba(255, 255, 255, 0.4)';
export let $carouselDotActiveBackground: string =
  env.$carouselDotActiveBackground || 'rgb(255, 255, 255)';
export let $carouselDotDarkBackground: string =
  env.$carouselDotDarkBackground || 'rgba(179, 190, 209, 0.2)';
export let $carouselDotDarkActiveBackground: string =
  env.$carouselDotDarkActiveBackground || 'rgba(179, 190, 209, 0.7)';
export let $carouselDotSize: string = env.$carouselDotSize || '6Px';

// Component/DetailItem
export let $detailItemTitleColor: string =
  env.$detailItemTitleColor || $colorTextMinor;
export let $detailItemContentColor: string =
  env.$detailItemContentColor || $colorTextBase;
export let $detailItemExtraColor: string =
  env.$detailItemExtraColor || $colorTextMinor;

// Component/Image
export let $imageErrorBackground: string =
  env.$imageErrorBackground || $colorBackgroundBase;
export let $imageErrorColor: string = env.$imageErrorColor || $colorTextMinor;

// Component/Collapse
export let $collapseExpandIconColor = env.$collapseExpandIconColor || '#808080';
export let $collapseContntColor = env.$collapseContntColor || $colorTextMinor;
export let $collapseHeaderActiveColor =
  env.$collapseHeaderActiveColor || '#F5F5F5';
export let $collapseHeaderBackground = env.$collapseHeaderBackground || '#FFF';

// Component/Form
export let $formFontSize: string = env.$formFontSize || '32px';
export let $formFieldControlPadding: string =
  env.$formFieldControlPadding || '12px 0';
export let $formFieldControlErrorPadding: string =
  env.$formFieldControlErrorPadding || '20px 0';
export let $formFieldFontSize: string = env.$formFieldFontSize || '32px';
export let $formFieldBorderColor: string =
  env.$formFieldBorderColor || $colorDivider;
export let $formFieldHeight: string = env.$formFieldHeight || '100px';
export let $formFieldInlinePadding: string =
  env.$formFieldInlinePadding || '6px 0 6px 32px';
export let $formFieldBlockPadding: string =
  env.$formFieldBlockPadding || '0 32px';
export let $formFieldLineHeight: string = env.$formFieldLineHeight || '88px';
export let $formFieldBackground: string = env.$formFieldBackground || '#FFF';
export let $formFieldLabelWidth: string = env.$formFieldLabelWidth || '25.6%';
export let $formFieldLabelColor: string =
  env.$formFieldLabelColor || $colorTextBase;
export let $formFieldLabelPadding: string =
  env.$formFieldLabelPadding || '32px';
export let $formFieldErrorColor: string =
  env.$formFieldErrorColor || $colorTextError;

// Component/Input
export let $inputFontSize: string = env.$inputFontSize || '32px';
export let $inputLineHeight: string = env.$inputLineHeight || '48px';
export let $inputTextAreaLineHeight: string =
  env.$inputTextAreaLineHeight || '42px';
export let $inputColor: string = env.$inputColor || $colorTextBase;
export let $inputDisabledColor: string =
  env.$inputDisabledColor || $colorTextMinor;
export let $inputBorderRadius: string = env.$inputBorderRadius || '8Px';
export let $inputBorderColor: string = env.inputBorderColor || $colorBorderBase;
export let $inputFocusBorderColor: string =
  env.$inputFocusBorderColor || 'rgba(45, 126, 255, 0.75)';
export let $inputPlaceholderColor: string =
  env.$inputPlaceholderColor || $colorTextMinor;
export let $inputAdornmentColor: string =
  env.$inputAdornmentColor || $colorTextMinor;
export let $inputPadding: string = env.$inputPadding || '20px 20px 20px 26px';
export let $inputPaddingWithAdornment: string =
  env.inputPaddingWithAdornment || '20px';
export let $inputOutlinePadding: string =
  env.$inputOutlinePadding || '20px 16px';
export let $inputOutlinePaddingWithAdornment: string =
  env.$inputOutlinePaddingWithAdornment || '20px';
export let $inputAdornmentFontSize: string =
  env.$inputAdornmentFontSize || '32px';
export let $inputAdornmentMargin: string = env.$inputAdornmentMargin || '20px';

// Component/Select
export let $selectFontSize: string = env.$selectFontSize || '32px';
export let $selectColor: string = env.$selectColor || $colorTextBase;
export let $selectBorderRadius: string = env.$selectBorderRadius || '8Px';
export let $selectBorderColor: string =
  env.$selectBorderColor || $colorBorderBase;
export let $selectPlaceholderColor: string =
  env.$selectPlaceholderColor || $colorTextMinor;
export let $selectPopupBackground: string =
  env.$selectPopupBackground || '#FFF';
export let $selectPopupHeaderBackground: string =
  env.$selectPopupHeaderBackground || '#FFF';
export let $selectPopupHeaderColor: string =
  env.$selectPopupHeaderColor || $colorTextBase;
export let $selectInputPadding: string =
  env.$selectInputPadding || '20px 20px 20px 26px';
export let $selectInputOutlinePadding: string =
  env.$selectInputOutlinePadding || '20px 16px';
export let $selectIconMargin: string = env.$inputIcontMargin || '20px';
export let $selectIconColor: string = env.$selectIconColor || $colorTextMinor;

// Component/NoticeBar
export let $noticeBarDefaultBackground: string =
  env.$noticeBarDefaultBackground || '#FEFCEB';
export let $noticeBarDefaultColor: string =
  env.$noticeBarDefaultColor || $colorTextWarn;
export let $noticeBarWarningBackground: string =
  env.$noticeBarWarningBackground || '#FFF1F2';
export let $noticeBarWarningColor: string =
  env.$noticeBarWarningColor || $colorTextError;
export let $noticeBarFontSize: string = env.$noticeBarFontSize || '28px';
export let $noticeBarIconSize: string = env.$noticeBarIconSize || '48px';
export let $noticeBarPadding: string = env.$noticeBarPadding || '10px';

// Component/NavBar
export let $navBarHeight: string = env.$navBarHeight || '100px';
export let $navBarFontSize: string = env.$navBarFontSize || '36px';
export let $navBarTitleLineHeight: string =
  env.$navBarTitleLineHeight || '50px';
export let $navBarColor: string = env.$navBarColor || $colorTextBase;
export let $navBarPrimaryBackground: string =
  env.$navBarPrimaryBackground || $colorPrimary;
export let $navBarPrimaryColor: string =
  env.$navBarPrimaryColor || $colorTextBaseInverse;
export let $navBarPrimaryActiveBackground: string =
  env.$navBarPrimaryActiveBackground || '#3c87ff';
export let $navBarBorderColor: string =
  env.$navBarBorderColor || $colorBorderBase;

// Component/ActionBar
export let $actionBarBackground: string = env.$actionBarBackground || '#FFF';
export let $actionBarPadding: string = env.$actionBarPadding || '20px 32px';
export let $actionBarToolBarPadding: string =
  env.$actionBarToolBarPadding || '8px 16px 12px 16px';
export let $actionBarFontSize: string = env.$actionBarFontSize || '32px';
export let $actionBarButtonGap: string = env.$actionBarButtonGap || '22px';

// Compoment/TreeSelect

export let $treeSelectLeftColor: string =
  env.$treeSelectLeftColor || $colorTextBase;
export let $treeSelectLeftBackground: string =
  env.$treeSelectLeftBackground || $colorBackgroundBase;
export let $treeSelectLeftActiveColor: string =
  env.$treeSelectLeftActiveColor || $colorTextBase;
export let $treeSelectLeftActiveBackground: string =
  env.$treeSelectLeftActiveBackground || '#FFF';
export let $treeSelectItemPadding: string =
  env.$treeSelectItemPadding || '26px 32px 30px 32px';
export let $treeSelectItemFontSize: string =
  env.$treeSelectItemFontSize || '32px';
export let $treeSelectRightColor: string =
  env.$treeSelectRightColor || $colorTextBase;
export let $treeSelectRightBackground: string =
  env.$treeSelectRightBackground || '#FFF';
export let $treeSelectRightActiveColor: string =
  env.$treeSelectRightActiveColor || $colorPrimary;
export let $treeSelectCollapseColor: string =
  env.$treeSelectCollapseColor || $colorTextMinor;

// Component/IndexList

export let $indexListBarWidth: string = env.$indexListBarWidth || '48px';
export let $indexListRightOffset: string = env.$indexListRightOffset || '4px';
export let $indexListZIndex: string = env.$indexListZIndex || '3';
export let $indexListTouchAreaWidth: string =
  env.$indexListTouchAreaWidth || '40px';
export let $indexListBarItemFontSize: string =
  env.$indexListBarItemFontSize || '28px';
export let $indexListBarItemTopOffset: string =
  env.$indexListBarItemTopOffset || '4px';
export let $indexListBarItemBottomOffset: string =
  env.$indexListBarItemBottomOffset || '4px';
export let $indexListBarItemWidth: string =
  env.$indexListBarItemWidth || '1.5em';
export let $indexListBarItemHeight: string =
  env.$indexListBarItemHeight || $indexListBarItemWidth;
export let $indexListBarItemLineHeight: string =
  env.$indexListBarItemLineHeight || $indexListBarItemHeight;
export let $indexListBarItemActiveColor: string =
  env.$indexListBarItemActiveColor || $colorPrimary;
export let $indexListBarItemBackground: string =
  env.$indexListBarItemBackground || 'transparent';
export let $indexListColor: string = env.$indexListColor || $colorTextMinor;
export let $indexListBackground: string =
  env.$indexListBackground || 'transparent';
export let $indexListBarPressedBackground: string =
  env.$indexListPressedBackground || $indexListBackground;
export let $indexListBarPressedColor: string =
  env.$indexListPressedColor || $indexListBarItemActiveColor;
export let $indexListBarLabelSize: string =
  env.$indexListBarLabelSize || '72px';
export let $indexListBarLabelColor: string =
  env.$indexListBarLabelColor || $colorTextBaseInverse;
export let $indexListBarLabelBackground: string =
  env.$indexListBarLabelBackground || $colorPrimary;
export let $indexListBarLabelFontSize: string =
  env.$indexListBarLabelFontSize || '32px';

// Component/Fab
export let $fabMarginLeft: string = env.$fabMarginLeft || '32px';
export let $fabMarginRight: string = env.$fabMarginRight || $fabMarginLeft;
export let $fabMarginTop: string = env.$fabMarginTop || '40px';
export let $fabMarginBottom: string = env.$fabMarginBottom || $fabMarginTop;
export let $fabBtnShadow: string = env.$fabBtnShadow || '0 2Px 8Px 0 #7aadff';
export let $fabActionMargin: string = env.$fabActionMargin || '22px';
export let $fabActionAnimateDelayStep: string =
  env.$fabActionAnimateDelayStep || '50ms';
export let $fabActionTransition: string =
  env.$fabActionTransition || 'all 300ms ease';
export let $fabMaskBackground: string =
  env.$fabMaskBackground || 'rgba(255, 255, 255, .9)';
export let $fabActionLabelMargin: string = env.$fabActionLabelMargin || '12px';
export let $fabActionLabelPadding: string =
  env.$fabActionLabelPadding || '6px 18px';
export let $fabActionLabelFontSize: string =
  env.$fabActionLabelFontSize || '28px';
export let $fabActionLabelBorderRadius: string =
  env.$fabActionLabelBorderRadius || '2Px';
export let $fabActionLabelLineHeight: string =
  env.$fabActionLabelLineHeight || '1.375em';
export let $fabActionLabelColor: string =
  env.$fabActionLabelColor || $colorTextBase;
export let $fabActionLabelBackground: string =
  env.$fabActionLabelBackground || 'transparent';
