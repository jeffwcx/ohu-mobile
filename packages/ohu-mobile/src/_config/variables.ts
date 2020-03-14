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
export let $tagGreyColor: string = process.env.$tagGreyColor || $colorTextBase;
export let $tagGreyBackground: string = process.env.$tagGreyBackground || $colorGrey;
export let $tagGreenColor: string = process.env.$tagGreenColor || $colorGreen;
export let $tagGreenBackground: string = process.env.$tagGreenBackground || 'rgba($tagGreenColor, .15)';
export let $tagOrangeColor: string = process.env.$tagOrangeColor || $colorOrange;
export let $tagOrangeBackground: string = process.env.$tagOrangeBackground || 'rgba(255, 148, 52, 0.15)';
export let $tagRedColor: string = process.env.$tagRedColor || $colorRed;
export let $tagRedBackground: string = process.env.$tagRedBackground || 'rgba($tagRedColor, .15)';
export let $tagBlueColor: string = process.env.$tagBlueColor || $colorBlue;
export let $tagBlueBackground: string = process.env.$tagBlueBackground || 'rgba($tagBlueColor, .15)';
export let $tagPrimaryColor: string = process.env.$tagPrimaryColor || $colorPrimary;
export let $tagPrimaryBackground: string = process.env.$tagPrimaryBackground || 'rgba($tagPrimaryColor, .15)';
export let $tagOutlineBackground: string = process.env.$tagOutlineBackground || $colorTextBaseInverse;
export let $tagBorderRadiusSm: number = process.env.$tagBorderRadiusSm ? +process.env.$tagBorderRadiusSm : 4;
export let $tagBorderRadiusMd: number = process.env.$tagBorderRadiusMd ? +process.env.$tagBorderRadiusMd : 8;
export let $tagBorderRadiusLg: number = process.env.$tagBorderRadiusLg ? +process.env.$tagBorderRadiusLg : 8;
export let $tagPaddingSm: string = process.env.$tagPaddingSm || '0 12px';
export let $tagPaddingMd: string = process.env.$tagPaddingMd || '12px 24px';
export let $tagPaddingLg: string = process.env.$tagPaddingLg || '16px 40px';
export let $tagFontSizeSm: string = process.env.$tagFontSizeSm || '24px';
export let $tagFontSizeMd: string = process.env.$tagFontSizeMd || '24px';
export let $tagFontSizeLg: string = process.env.$tagFontSizeLg || '28px';

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
export let $cardBorderRadius: string = process.env.$cardBorderRadius || '8px';
export let $cardContentPadding: string = process.env.$cardContentPadding || '24px';
export let $cardHeaderFontSize: string =  process.env.$cardHeaderFontSize || '32px';
export let $cardHeaderTopOffset: string = process.env.$cardHeaderTopOffset || '22px';
export let $cardHeaderLeftOffset: string = process.env.$cardHeaderLeftOffset || '24px';
export let $cardHeaderExtraFontSize: string = process.env.$cardHeaderExtraFontSize || '32px';
export let $cardHeaderExtraColor: string = process.env.$cardHeaderExtraColor || $colorTextMinor;
export let $cardHeaderExtraErrorColor: string = process.env.$cardHeaderExtraErrorColor || $colorTextError;
export let $cardHeaderExtraSuccessColor: string = process.env.$cardHeaderExtraSuccessColor || $colorTextHighlight;
export let $cardHeaderBoldFontSize: string = process.env.$cardHeaderBoldFontSize || '36px';

// Component/Skeleton
export let $skeletonBackground: string = process.env.$skeletonBackground || $colorBackgroundBase;

// Component/Tabbar
export let $tabbarBackground: string = process.env.$tabbarBackground || 'rgba(255,255,255,0.9)';
export let $tabbarBorderColor: string = process.env.$tabbarBorderColor || 'rgba(0, 0, 0, .25)';
export let $tabbarItemIndicatorColor = process.env.$tabbarItemIndicatorColor || $colorPrimary;
export let $tabbarHeight = process.env.$tabbarHeight || '98px';

// Component/Loading
export let $loadingTextColor: string = process.env.$loadingTextColor || $colorTextMinor;

// Component/Popup
export let $popupRoundRadius: string = process.env.$popupRoundRadius || '16px';
export let $popupHeaderCloseButtonColor: string = process.env.$popupHeaderCloseButtonColor || '#848C95';
export let $popupHeaderBackground: string =  process.env.$popupHeaderBackground || '#FFF';
export let $popupHeaderTextFontSize = process.env.$popupHeaderTextFontSize || '32px';
export let $popupHeaderColor =  process.env.$popupHeaderColor || $colorTextBase;
export let $popupHeaderMinorTextColor = process.env.$popupHeaderMinorTextColor || $colorTextMinor;
export let $popupHeaderMinorTextFontSize =  process.env.$popupHeaderMinorTextColor || '28px';
// Component/Popover
export let $popoverContentBackground: string = process.env.$popoverContentBackground || '#4C4C4C';
export let $popoverArrowSize: string =  process.env.$popoverArrowSize || '12px';
export let $popoverDividerColor: string = process.env.$popoverDividerColor || '#6D6D6D';

// Component/DropMenu
export let $dropMenuItemOptionActiveColor: string = process.env.$dropMenuItemOptionActiveColor || '#F5F5F5';
export let $dropMenuItemOptionsBoxShadow: string = process.env.$dropMenuItemOptionsBoxShadow || '0px 2px 8px 0px rgba(153,153,153,0.2)';

// Component/Checkbox
export let $checkboxFontSize: string = process.env.$checkboxFontSize || $fontSizeBase;
export let $checkboxColor: string = process.env.$checkboxColor || '#CCC';
export let $checkboxActiveColor: string = process.env.$checkboxActiveColor || $colorPrimary;
export let $checkboxLabelColor: string = process.env.$checkboxLabelColor || $colorTextBase;
// Component/Radio
export let $radioFontSize: string = process.env.$radioFontSize || $checkboxFontSize;
export let $radioColor: string = process.env.$radioColor || $checkboxColor;
export let $radioActiveColor: string = process.env.$radioboxActiveColor || $checkboxActiveColor;
export let $radioLabelColor: string = process.env.$radioLabelColor || $checkboxLabelColor;

// Component/Agree
export let $agreeColor: string = process.env.$agreeColor || $colorTextBase;

// Component/List
export let $listItemPadding: string = process.env.$listItemPadding || '30px';
export let $listItemColor: string = process.env.$listItemColor || $colorTextBase;
export let $listItemBorderColor: string = process.env.$listItemBorderColor || $colorDivider;
export let $listItemFontSize: string = process.env.$listItemFontSize || $fontSizeBase;
export let $listItemTextLineHeight: string = process.env.$listItemTextLineHeight || '1.375em';
export let $listItemMinorTextFontSize: string =  process.env.$listItemMinorTextFontSize || '26px';
export let $listItemMinorTextLineHeight: string =  process.env.$listItemMinorTextLineHeight || '1.384615em';
export let $listItemMinorTextColor: string = process.env.$listItemMinorTextColor || $colorTextMinor;
export let $listItemButtonActiveColor: string =  process.env.$listItemButtonActiveColor || $buttonColorDefaultActive;
export let $listItemThumbMargin: string =  process.env.$listItemThumbMargin || '24px';
export let $listItemAvatarSize: string = process.env.$listItemAvatarSize || '88px';
export let $listItemAvatarMinWidth: string = process.env.$listItemAvatarMinWidth || '120px';
export let $listItemIconSize: string = process.env.$listItemIconSize || '48px';
export let $listItemActionSize: string =  process.env.$listItemActionSize || '36px';
export let $listItenActionCheckSize: string =  process.env.$listItenActionCheckSize || '32px';
export let $listSubheaderBackground: string = process.env.$listSubheaderBackground || '#EEE';
export let $listSubheaderColor: string = process.env.$listSubheaderColor || '#999';

export let $listBottomFontSize: string =  '28px';
export let $listSubheaderFontSize: string =  process.env.$listSubheaderFontSize || '28px';
export let $listSubheaderStickyColor: string = process.env.$listSubheaderStickyColor || $colorTextHighlight;
export let $listSubheaderStickyBackground: string = process.env.$listSubheaderStickyBackground || $colorTextBaseInverse;
export let $listSubheaderStickyBoxShadow: string = process.env.$listSubheaderStickyBoxShadow || '0 1Px 10Px 0 #eee';


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

// Component/Form
export let $formFontSize: string = process.env.$formFontSize || '32px';
export let $formFieldControlPadding: string =  process.env.$formFieldControlPadding || '12px 0';
export let $formFieldControlErrorPadding: string = process.env.$formFieldControlErrorPadding || '20px 0';
export let $formFieldFontSize: string = process.env.$formFieldFontSize || '32px';
export let $formFieldBorderColor: string = process.env.$formFieldBorderColor || $colorDivider;
export let $formFieldHeight: string = process.env.$formFieldHeight || '100px';
export let $formFieldInlinePadding: string = process.env.$formFieldInlinePadding || '6px 0 6px 32px';
export let $formFieldBlockPadding: string = process.env.$formFieldBlockPadding || '0 32px';
export let $formFieldLineHeight: string =  process.env.$formFieldLineHeight || '88px';
export let $formFieldBackground: string =  process.env.$formFieldBackground || '#FFF';
export let $formFieldLabelWidth: string = process.env.$formFieldLabelWidth || '25.6%';
export let $formFieldLabelColor: string = process.env.$formFieldLabelColor || $colorTextBase;
export let $formFieldLabelPadding: string = process.env.$formFieldLabelPadding || '32px';
export let $formFieldErrorColor: string = process.env.$formFieldErrorColor || $colorTextError;

// Component/Input
export let $inputFontSize: string = process.env.$inputFontSize || '32px';
export let $inputLineHeight: string = process.env.$inputLineHeight || '48px';
export let $inputTextAreaLineHeight: string = process.env.$inputTextAreaLineHeight || '42px';
export let $inputColor: string = process.env.$inputColor || $colorTextBase;
export let $inputDisabledColor: string = process.env.$inputDisabledColor || $colorTextMinor;
export let $inputBorderRadius: string = process.env.$inputBorderRadius || '8Px';
export let $inputBorderColor: string =  process.env.inputBorderColor || $colorBorderBase;
export let $inputFocusBorderColor: string = process.env.$inputFocusBorderColor || 'rgba(45, 126, 255, 0.75)';
export let $inputPlaceholderColor: string = process.env.$inputPlaceholderColor || $colorTextMinor;
export let $inputAdornmentColor: string = process.env.$inputAdornmentColor || $colorTextMinor;
export let $inputPadding: string = process.env.$inputPadding || '20px 20px 20px 26px';
export let $inputPaddingWithAdornment: string = process.env.inputPaddingWithAdornment || '20px';
export let $inputOutlinePadding: string = process.env.$inputOutlinePadding || '20px 16px';
export let $inputOutlinePaddingWithAdornment: string = process.env.$inputOutlinePaddingWithAdornment || '20px';
export let $inputAdornmentFontSize: string = process.env.$inputAdornmentFontSize || '32px';
export let $inputAdornmentMargin: string = process.env.$inputAdornmentMargin || '20px';


// Component/Select
export let $selectFontSize: string =  process.env.$selectFontSize || '32px';
export let $selectColor: string = process.env.$selectColor || $colorTextBase;
export let $selectBorderRadius: string = process.env.$selectBorderRadius || '8Px';
export let $selectBorderColor: string = process.env.$selectBorderColor || $colorBorderBase;
export let $selectPlaceholderColor: string = process.env.$selectPlaceholderColor || $colorTextMinor;
export let $selectPopupBackground: string = process.env.$selectPopupBackground || '#FFF';
export let $selectPopupHeaderBackground: string = process.env.$selectPopupHeaderBackground || '#FFF';
export let $selectPopupHeaderColor: string = process.env.$selectPopupHeaderColor || $colorTextBase;
export let $selectInputPadding: string = process.env.$selectInputPadding || '20px 20px 20px 26px';
export let $selectInputOutlinePadding: string = process.env.$selectInputOutlinePadding || '20px 16px';
export let $selectIconMargin: string = process.env.$inputIcontMargin || '20px';
export let $selectIconColor: string = process.env.$selectIconColor || $colorTextMinor;

// Component/NoticeBar
export let $noticeBarDefaultBackground: string = process.env.$noticeBarDefaultBackground || '#FEFCEB';
export let $noticeBarDefaultColor: string = process.env.$noticeBarDefaultColor || $colorTextWarn;
export let $noticeBarWarningBackground: string = process.env.$noticeBarWarningBackground || '#FFF1F2';
export let $noticeBarWarningColor: string = process.env.$noticeBarWarningColor || $colorTextError;
export let $noticeBarFontSize: string = process.env.$noticeBarFontSize || '28px';
export let $noticeBarIconSize: string = process.env.$noticeBarIconSize || '48px';
export let $noticeBarPadding: string =  process.env.$noticeBarPadding || '20px';


// Component/NavBar
export let $navBarHeight: string = process.env.$navBarHeight || '100px';
export let $navBarFontSize: string = process.env.$navBarFontSize || '36px';
export let $navBarTitleLineHeight: string =  process.env.$navBarTitleLineHeight || '50px';
export let $navBarColor: string =  process.env.$navBarColor || $colorTextBase;
export let $navBarPrimaryBackground: string =  process.env.$navBarPrimaryBackground || $colorPrimary;
export let $navBarPrimaryColor: string =  process.env.$navBarPrimaryColor || $colorTextBaseInverse;
export let $navBarPrimaryActiveBackground: string = process.env.$navBarPrimaryActiveBackground || '#3c87ff';
export let $navBarBorderColor: string = process.env.$navBarBorderColor || $colorBorderBase;


// Component/ActionBar
export let $actionBarBackground: string = process.env.$actionBarBackground || '#FFF';
export let $actionBarPadding: string = process.env.$actionBarPadding || '20px 32px';
export let $actionBarToolBarPadding: string =  process.env.$actionBarToolBarPadding || '8px 16px 12px 16px';
export let $actionBarFontSize: string = process.env.$actionBarFontSize || '32px';
export let $actionBarButtonGap: string = process.env.$actionBarButtonGap || '22px';


// Compoment/TreeSelect

export let $treeSelectLeftColor: string = process.env.$treeSelectLeftColor || $colorTextBase;
export let $treeSelectLeftBackground: string = process.env.$treeSelectLeftBackground || $colorBackgroundBase;
export let $treeSelectLeftActiveColor: string = process.env.$treeSelectLeftActiveColor || $colorTextBase;
export let $treeSelectLeftActiveBackground: string = process.env.$treeSelectLeftActiveBackground || '#FFF';
export let $treeSelectItemPadding: string = process.env.$treeSelectItemPadding || '26px 32px 30px 32px';
export let $treeSelectItemFontSize: string = process.env.$treeSelectItemFontSize || '32px';
export let $treeSelectRightColor: string = process.env.$treeSelectRightColor || $colorTextBase;
export let $treeSelectRightBackground: string = process.env.$treeSelectRightBackground || '#FFF';
export let $treeSelectRightActiveColor: string = process.env.$treeSelectRightActiveColor || $colorPrimary;
export let $treeSelectCollapseColor: string = process.env.$treeSelectCollapseColor || $colorTextMinor;
