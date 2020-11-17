import type { ReactNode } from 'react';
import type {
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { Animation, CustomAnimation } from 'react-native-animatable';
import type { Orientation } from 'react-native-modal';

export interface IDefaultValue {
  /**
   * Set the dropdown default value, can be used in redux-form or formik
   */
  value: string | number;

  /**
   * Call back function onSelecting the dropdown value. It will return the selected item value.
   */
  onChange: (value: any) => void;
}

export interface IDropdownDefault {
  /**
   * Set the dropdown label
   */
  label: string;
  /**
   * Set whether the dropdown is required or not and an asterisk symbol will be added with the label for indication. Also, it can be used with the error.
   * ### Default: false
   */
  required?: boolean;
  /**
   * Disable the dropdown
   * ### Default: false
   */
  disabled?: boolean;
  /**
   * Open the dropdown like the modal.
   * ### Default: false
   */
  floating?: boolean;
  /**
   * Enable search field for the dropdown.
   * ### Default: false
   */
  enableSearch?: boolean;
  /**
   * Set whether the dropdown has an error or not. The error field will work only when the required field is enabled.
   * ### Default: false
   */
  error?: boolean;

  /**
   * Call back function onClosing the dropdown modal.
   */
  onBlur?: () => void;
  /**
   * Set primary color for the dropdown component.
   * ### Default: #2196F3
   */
  primaryColor?: string;
  /**
   * Control the elevation for the dropdown container view.
   * ### Default: 2
   */
  elevation?: number;
  /**
   * Control the border radius for the dropdown container view.
   * ### Default: 2
   */
  borderRadius?: number;
  /**
   * Changes the loader indicator color.
   * ### Default: #2e3742
   */
  activityIndicatorColor?: string;
  /**
   * Search area filed placeholder text.
   * ### Default: Search
   */
  searchPlaceholder?: string;
  /**
   * Change the ripple color.
   * ### Default: rgba(0,0,0,0.1)
   */
  rippleColor?: string;
  /**
   * Set the helper text for the dropdown, this will be visible only when the dropdown field turned into an error field.
   * ### Default: ${label} is required
   */
  helperText?: string;
  /**
   * Set the dropdown error color.
   * ### Default: red
   */
  errorColor?: string;
  /**
   * Show or hide loader for the dropdown container.
   * ### Default: false
   */
  showLoader?: boolean;
  /**
   * Change the text view style for the dropdown item.
   */
  itemTextStyle?: StyleProp<TextStyle>;
  /**
   * Change the dropdown item container view style.
   */
  itemContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Modal open animation type same as react-native-modal.
   * ### Default: fadeIn
   */
  animationIn?: Animation | CustomAnimation;
  /**
   * Modal open animation duration same as react-native-modal.
   * ### Default: 400
   */
  animationInTiming?: number;
  /**
   * Modal close animation type same as react-native-modal.
   * ### Default: fadeOut
   */
  animationOut?: Animation | CustomAnimation;
  /**
   * Modal close animation duration same as react-native-modal.
   * ### Default: 400
   */
  animationOutTiming?: number;
  /**
   * Modal supported orientations same as react-native-modal.
   */
  supportedOrientations?: Orientation[];
  /**
   * Dropdown parent container style.
   */
  parentDDContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Dropdown main container style.
   */
  mainContainerStyle?: StyleProp<ViewStyle>;

  /**
   * String: Message to be shown when the dropdown is empty.
   * or
   * React Node: to completely change the empty component.
   * ### Default: No item found
   */
  emptyListText?: ReactNode;
  /**
   * Enable or disable avatar for the dropdown items.
   * ### Default: false
   */
  enableAvatar?: boolean;
  /**
   * Set the avatar view size.
   * ### Default: 30
   */
  avatarSize?: number;

  /**
   * Since the dropdown build on top of Native Paper you can over write the theme
   * by passing your own native paper theme, for more info refer https://callstack.github.io/react-native-paper/theming.html
   * ### Default: light theme config
   */
  paperTheme?: ReactNativePaper.Theme | undefined;

  /**
   * Dropdown input style.
   */
  textInputStyle?: StyleProp<TextStyle>;
}

export interface IDropdownData {
  label: string;
  value: string | number;
  avatarSource?: ImageSourcePropType;
}

export interface IGroupDropdownData {
  title: string;
  data: IDropdownData[];
  avatarSource?: ImageSourcePropType;
}

export interface IGroupDropdownProps extends IDropdownDefault, IDefaultValue {
  /**
   * Collection of object items to render the group dropdown.
   * ### Sample
   * ```js
   * const data = [
   *  {
   *    title: 'Apple',
   *    data: [
   *      {
   *        value: 'iphonese',
   *        label: 'iPhone SE(2020)',
   *        avatarSource: require('./ddicon.png'),
   *      },
   *      {
   *        value: '23',
   *        label: 'iPhone X',
   *        avatarSource: {
   *          uri: 'https://img.icons8.com/emoji/344/mobile-phone.png',
   *        },
   *      },
   *    ],
   *  }
   * }
   * ```
   */
  data: IGroupDropdownData[];
  /**
   * Keep the group header sticky or not
   * ### Default: true
   */
  stickySectionHeadersEnabled?: boolean;
  /**
   * Dropdown group header container view style
   */
  headerContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Dropdown group header text style
   */
  headerTextStyle?: StyleProp<TextStyle>;
}

declare type SortOrder = 'asc' | 'desc';

declare type ChipTypes = 'flat' | 'outlined';

export interface IDropdownProps extends IDropdownDefault, IDefaultValue {
  /**
   * Collection of object items to render the dropdown.
   * ### Sample
   * ```js
   * const data = [
   * {
   * value: '1',
   * label: 'Tiger Nixon',
   * avatarSource: require('./ddicon.png'),
   * },
   * {
   * value: '2',
   * label: 'Garrett Winters',
   * avatarSource: {
   *   uri: 'https://img.icons8.com/color/344/circled-user-female-skin-type-6.png',
   *  },
   * },
   * ]
   * ```
   */
  data: IDropdownData[];
  /**
   * Enable or disable sorting for the dropdown items.
   * ### Default: true
   */
  disableSort?: boolean;
  /**
   * Set the sorting order for the dropdown items
   * ### Default: asc
   */
  defaultSortOrder?: SortOrder;
}

export interface IMultiselectDropdownProps extends IDropdownDefault {
  /**
   * Set the dropdown default value(array of string or number). Aslo, can be used in redux-form or formik
   */
  value: Array<string | number>;

  /**
   * Call back function onSelecting the dropdown value. It will return the selected item value.
   */
  onChange: (value: any[]) => void;

  /**
   * Collection of object items to render the dropdown.
   * ### Sample
   * ```js
   * const data = [
   * {
   * value: '1',
   * label: 'Tiger Nixon',
   * avatarSource: require('./ddicon.png'),
   * },
   * {
   * value: '2',
   * label: 'Garrett Winters',
   * avatarSource: {
   *   uri: 'https://img.icons8.com/color/344/circled-user-female-skin-type-6.png',
   *  },
   * },
   * ]
   * ```
   */
  data: IDropdownData[];
  /**
   * Enable or disable sorting for the dropdown items.
   * ### Default: true
   */
  disableSort?: boolean;
  /**
   * Set the sorting order for the dropdown items
   * ### Default: asc
   */
  defaultSortOrder?: SortOrder;

  /**
   * Mode of the chip.
   * - `flat` - flat chip without outline.
   * - `outlined` - chip with an outline.
   * ### Default: flat
   */
  chipType?: ChipTypes;

  /**
   * Change chip label text style
   *
   */
  chipTextStyle?: StyleProp<TextStyle>;

  /**
   * Change the selection section empty text value
   * ### Default: Selected items will appear here...
   */
  emptySelectionText?: string;

  /**
   * Change the chip view style
   */
  chipStyle?: StyleProp<ViewStyle>;
}

export interface IDropdownItemProps {
  item: IDropdownData;
  selected: string | number;
  onSelect: (value: string | number) => void;
  selectedColor?: string;
  disabled?: boolean;
  itemTextStyle?: StyleProp<TextStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  rippleColor?: string;
  enableAvatar?: boolean;
  avatarSize?: number;
}

export interface IMultiselectDropdownItemProps {
  item: IDropdownData;
  selected: Array<string | number>;
  onSelect: (value: string | number) => void;
  selectedColor?: string;
  disabled?: boolean;
  itemTextStyle?: StyleProp<TextStyle>;
  itemContainerStyle?: StyleProp<ViewStyle>;
  rippleColor?: string;
  enableAvatar?: boolean;
  avatarSize?: number;
}
