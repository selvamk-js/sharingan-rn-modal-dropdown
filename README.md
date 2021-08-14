# sharingan-rn-modal-dropdown (An extension component for the [react-native-paper](https://callstack.github.io/react-native-paper/))

## Pull requests are always welcome

[![Build Status][build-badge]][build]
[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

A simple and customizable react-native dropdown created using react-native-modal and react-native-paper.

- Checkout the [example/](example) folder for source code and example.

## Features

- Single, Group, and Multiselect Dropdowns
- Follows Material Design spec
- Highly customizable
- Easy to integrate with [formik](https://formik.org/docs/guides/react-native) and [redux-form](https://redux-form.com/7.2.0/docs/faq/reactnative.md/)
- Implemented using [react-native-modal](https://github.com/react-native-modal/react-native-modal)
- Fully typed with [TypeScript](https://typescriptlang.org)

## What's new in (v1.4)

- Dark mode support **_(React native - 0.63.3 or higher and React Native Paper - 4.2.0 or higher)_**
- Prop: multiline - Multiline support for the dropdown
- Prop: dropdownIcon - Change dropdown icon -> [material design icon](https://materialdesignicons.com/)
- Prop: itemSelectIcon - Change dropdown item select icon -> Custome react node or [material design icon](https://materialdesignicons.com/)
- Prop: dropdownIconSize - Change dropdown icon size
- Prop: itemSelectIconSize - Change dropdown item icon size
- Prop: hideChip - Hide multi select dropdown chip
- Prop: searchInputTheme - Change react native paper textinput theme
- Prop: disabledItemTextStyle - Change the disabled text view style for the dropdown item.
- Prop: disabledItemViewStyle - Change the disabled item view style for the dropdown item.
- Disable dropdown item by adding **_disabled_** attribute to the item object

```json
{
  "value": "1",
  "label": "Tiger Nixon",
  "employee_salary": "320800",
  "employee_age": "61",
  "avatarSource": require("./ddicon.png"),
  "disabled": true // disable the item
}
```

## Demo

![Demo Screen](demo/demo1.gif)

## Installation

Open a Terminal in the project root and run:

```sh
yarn add sharingan-rn-modal-dropdown
```

```sh
npm install sharingan-rn-modal-dropdown
```

## Quick Start

```js
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';

export const data = [
  {
    value: '1',
    label: 'Tiger Nixon',
    employee_salary: '320800',
    employee_age: '61',
    avatarSource: require('./ddicon.png'),
    disabled: true, // disable the item
  },
  {
    value: '2',
    label: 'Garrett Winters',
    employee_salary: '170750',
    employee_age: '63',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '3',
    label: 'Ashton Cox',
    employee_salary: '86000',
    employee_age: '66',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
  {
    value: '4',
    label: 'Cedric Kelly',
    employee_salary: '433060',
    employee_age: '22',
    avatarSource: {
      uri: 'https://img.icons8.com/color/344/circled-user-male-skin-type-5.png',
    },
  },
];

export const groupData = [
  {
    title: 'Apple',
    data: [
      {
        value: '233',
        label: 'iPhone SE(2020)',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: '242',
        label: 'iPhone 11',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: '24w',
        label: 'iPhone 12',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: '99',
        label: 'iPhone 12 Mini',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
    ],
  },
  {
    title: 'Google',
    data: [
      {
        value: '19',
        label: 'Pixel 3a',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '20',
        label: 'Pixel 3',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '21',
        label: 'Pixel 3 xl',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '16',
        label: 'Pixel 4',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '17',
        label: 'Pixel 4a',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '18',
        label: 'Pixel 5',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
    ],
  },
];

const Example = () => {
  const [valueMS, setValueMS] = useState<string[]>([]);
  const [valueSS, setValueSS] = useState('');
  const [valueGS, setValueGS] = useState('');
  const onChangeMS = (value: string[]) => {
    setValueMS(value);
  };
  const onChangeSS = (value: string) => {
    setValueSS(value);
  };
  const onChangeGS = (value: string) => {
    setValueGS(value);
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <MultiselectDropdown
            label="Multi select with avatar chip outlined"
            data={data}
            enableSearch
            enableAvatar
            chipType="outlined"
            value={valueMS}
            onChange={onChangeMS}
          />
        </View>
        <View style={styles.container}>
          <Dropdown
            label="Simple dropdown"
            data={data}
            enableSearch
            value={valueSS}
            onChange={onChangeSS}
          />
        </View>
        <View style={styles.container}>
          <GroupDropdown
            label="Group dropdown with avatar"
            data={groupData}
            enableSearch
            enableAvatar
            value={valueGS}
            onChange={onChangeGS}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default Example;
```

## Formik Example

```js
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import {
  Dropdown,
  GroupDropdown,
  MultiselectDropdown,
} from 'sharingan-rn-modal-dropdown';
import { data, groupData } from './data';
import {
  Button,
  Colors,
  Dialog,
  FAB,
  Paragraph,
  Portal,
  useTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { DropdownValidation } from './validation';

type tState = {
  msChipFlat: Array<string | number>,
  msChipOutlined: Array<string | number>,
  sddWoAvatar: string | number,
  sddWAvatar: string | number,
  gddWoAvatar: string | number,
  gddWAvatar: string | number,
};

const FormikExample = () => {
  const [visible, setVisible] = useState(false);
  const [state, setState] =
    useState <
    tState >
    {
      msChipFlat: [],
      msChipOutlined: [],
      sddWoAvatar: '',
      sddWAvatar: '',
      gddWoAvatar: '',
      gddWAvatar: '',
    };
  const hideDialog = () => setVisible(false);
  const { colors } = useTheme();
  return (
    <Formik
      initialValues={{
        msChipFlat: [1],
        msChipOutlined: [12, 2],
        sddWoAvatar: '',
        sddWAvatar: '',
        gddWoAvatar: '1',
        gddWAvatar: '1',
        text: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setVisible(true);
        setState(values);
        setSubmitting(false);
      }}
      validationSchema={DropdownValidation}
      enableReinitialize
    >
      {({ errors, handleSubmit, setFieldValue, values, isSubmitting }) => (
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Dropdown values</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{`msChipFlat: ${state.msChipFlat}`}</Paragraph>
                <Paragraph>{`msChipOutlined: ${state.msChipOutlined}`}</Paragraph>
                <Paragraph>{`sddWoAvatar: ${state.sddWoAvatar}`}</Paragraph>
                <Paragraph>{`sddWAvatar: ${state.sddWAvatar}`}</Paragraph>
                <Paragraph>{`gddWoAvatar: ${state.gddWoAvatar}`}</Paragraph>
                <Paragraph>{`gddWAvatar: ${state.gddWAvatar}`}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Done</Button>
              </Dialog.Actions>
            </Dialog>
            <FAB
              style={styles.fab}
              icon="send"
              onPress={handleSubmit}
              disabled={isSubmitting}
              label="Submit"
            />
          </Portal>
          <View
            style={{
              flexDirection: 'column',
              height: '100%',
              backgroundColor: colors.background,
            }}
          >
            <ScrollView>
              <View style={styles.container}>
                <MultiselectDropdown
                  label="Multi select without avatar chip flat"
                  data={data}
                  primaryColor={Colors.cyan500}
                  enableSearch
                  value={values.msChipFlat}
                  onChange={value => setFieldValue('msChipFlat', value)}
                  chipType="flat"
                  required
                  error={errors.msChipFlat ? true : false}
                  emptySelectionText="No item selected"
                  itemSelectIcon={
                    <Icon
                      name="chess-knight"
                      size={18}
                      color={Colors.amber700}
                    />
                  }
                  mode="outlined"
                />
              </View>
              <View style={styles.container}>
                <MultiselectDropdown
                  label="Multi select with avatar chip outlined"
                  data={data}
                  primaryColor={Colors.tealA700}
                  enableSearch
                  enableAvatar
                  chipType="outlined"
                  value={values.msChipOutlined}
                  onChange={value => setFieldValue('msChipOutlined', value)}
                  required
                  error={errors.msChipOutlined ? true : false}
                  selectedItemTextStyle={{ fontWeight: 'bold' }}
                  selectedItemsText="Select"
                />
              </View>
              <View style={styles.container}>
                <Dropdown
                  label="Simple dropdown"
                  data={data}
                  primaryColor={Colors.indigoA700}
                  enableSearch
                  value={values.sddWoAvatar}
                  onChange={value => setFieldValue('sddWoAvatar', value)}
                  required
                  mode="outlined"
                  error={errors.sddWoAvatar ? true : false}
                  selectedItemTextStyle={{ fontWeight: 'bold' }}
                  itemSelectIcon={
                    <Icon
                      name="check-double"
                      size={18}
                      color={Colors.indigoA700}
                    />
                  }
                />
              </View>
              <View style={styles.container}>
                <Dropdown
                  label="Simple dropdown with avatar"
                  data={data}
                  primaryColor={Colors.blueA700}
                  enableSearch
                  enableAvatar
                  value={values.sddWAvatar}
                  onChange={value => setFieldValue('sddWAvatar', value)}
                  required
                  error={errors.sddWAvatar ? true : false}
                  selectedItemViewStyle={{ backgroundColor: colors.backdrop }}
                  selectedItemTextStyle={{ fontWeight: 'bold' }}
                  disableSelectionTick
                  removeLabel
                  textInputPlaceholder="Simple dropdown with avatar"
                  underlineColor="transparent"
                />
              </View>
              <View style={styles.container}>
                <GroupDropdown
                  label="Group dropdown"
                  data={groupData}
                  headerTextStyle={{
                    color: Colors.tealA700,
                  }}
                  primaryColor={Colors.tealA700}
                  enableSearch
                  value={values.gddWoAvatar}
                  onChange={value => setFieldValue('gddWoAvatar', value)}
                  required
                  error={errors.gddWoAvatar ? true : false}
                  selectedItemTextStyle={{ fontWeight: 'bold' }}
                />
              </View>
              <View style={styles.container}>
                <GroupDropdown
                  label="Group dropdown with avatar"
                  data={groupData}
                  headerTextStyle={{
                    color: Colors.amberA700,
                  }}
                  primaryColor={Colors.amberA700}
                  enableSearch
                  enableAvatar
                  value={values.gddWAvatar}
                  onChange={value => setFieldValue('gddWAvatar', value)}
                  required
                  error={errors.gddWAvatar ? true : false}
                  selectedItemTextStyle={{ fontWeight: 'bold' }}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    marginLeft: 20,
    marginRight: 20,
    flex: 1,
  },
  appBar: { height: 80, backgroundColor: Colors.indigoA700 },
  appBarContent: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbarTitle: { paddingTop: 25 },
  buttonView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.pinkA700,
  },
});

export default FormikExample;
```

### API reference

---

The package exports a `Dropdown`, `GroupDropdown`, and `MultiselectDropdown,` components which is the one you'd use to render the dropdowns.

---

### Dropdown Items structure

Dropdown data expect an array of items that are needed to be rendered.

#### IDropdownData Type Ref

```js
export interface IDropdownData {
  label: string;
  value: string | number;
  avatarSource?: ImageSourcePropType;
  avatarComponent?: ReactNode;
  disabled?: boolean;
}
```

### Props (common)

---

#### `label` (`required`)

Set the dropdown field label.

#### `required`

Set whether the dropdown is required or not and an asterisk symbol will be added with the label for indication. Also, it can be used with the error.

#### `disabled`

Enable and Disable the dropdown

#### `floating`

Open the dropdown like the modal.

#### `enableSearch`

Enable search field for the dropdown.

#### `error`

Set whether the dropdown has an error or not. The error field will work only when the required field is enabled.

#### `onBlur`

Call back function onClosing the dropdown modal.

#### `elevation`

Control the elevation for the dropdown container view.

#### `borderRadius`

Control the border radius for the dropdown container view.

#### `activityIndicatorColor`

Changes the loader indicator color.

#### `searchPlaceholder`

Search area filed placeholder text.

#### `rippleColor`

Change the ripple color.

#### `helperText`

Set the helper text for the dropdown, this will be visible only when the dropdown field turned into an error field.

#### `errorColor`

Set the dropdown error color.

#### `showLoader`

Show or hide loader for the dropdown container.

#### `itemTextStyle`

Change the text view style for the dropdown item.

#### `itemContainerStyle`

Change the dropdown item container view style.

#### `animationIn`

Modal open animation type same as [react-native-modal](https://github.com/react-native-modal/react-native-modal).

#### `animationInTiming`

Modal open animation duration same as [react-native-modal](https://github.com/react-native-modal/react-native-modal).

#### `animationOut`

Modal close animation duration same as [react-native-modal](https://github.com/react-native-modal/react-native-modal).

#### `supportedOrientations`

Modal supported orientations same as [react-native-modal](https://github.com/react-native-modal/react-native-modal).

#### `parentDDContainerStyle`

Dropdown parent container style.

#### `emptyListText`

- String: Message to be shown when the dropdown is empty.
  or
- React Node: to completely change the empty component.

#### `enableAvatar`

Enable or disable avatar for the dropdown items.

#### `avatarSize`

Set the avatar view size.

#### avatarComponent

Set a custom avatar for your dropdown items

```jsx
 {
    value: '2',
    label: 'Garrett Winters',
    avatarComponent: <Avatar.Icon size={24} icon="folder" />
  }
```

#### `paperTheme`

Since the dropdown build on top of Native Paper you can over write the theme by passing your own native paper theme, for more info refer <https://callstack.github.io/react-native-paper/theming.html>

#### `textInputStyle`

Dropdown input style.

#### `mainContainerStyle`

Dropdown main container style.

#### `underlineColor`

Change TextInput Under Line color.

#### `disableSelectionTick`

Disable the selected item tick mark.

#### `textInputPlaceholder`

Change TextInput Placeholder text.

#### `textInputPlaceholderColor`

Change TextInput Placeholder color.

#### `selectedItemTextStyle`

Change the selected text view style for the dropdown item.

#### `selectedItemViewStyle`

Change the selected item view style for the dropdown item.

#### `disabledItemTextStyle`

Change the disabled text view style for the dropdown item.

#### `disabledItemViewStyle`

Change the disabled item view style for the dropdown item.

#### `removeLabel`

Remove TextInput label.
`Note`: Empty string must be passed since label is a required field

#### `mode`

Mode of the TextInput.

- `flat` (default) - flat input with an underline.
- `outlined` - input with an outline.
  In outlined mode, the background color of the label is derived from colors.background in theme or the backgroundColor style. This component render TextInputOutlined or TextInputFlat based on that props

Remove TextInput label. Note: Empty string must be passed since label is a required field

#### `dropdownIcon`

Material community icon string to change the dropdown down arrow refer: <https://materialdesignicons.com/>

#### `dropdownIconSize`

Change the dropdown icon size default: 30

#### `itemSelectIcon`

Material community icon string to change the dropdown item select check icon refer: <https://materialdesignicons.com/>

#### `itemSelectIconSize`

Change the dropdown item icon size default: 18

#### `multiline`

Enable multiline for the dropdown default: false <br>
_Note: this may lead to a style issue._

#### `searchInputTheme`

Since the dropdown build on top of Native Paper you can over write the theme
by passing your own native paper input theme, for more info refer <https://callstack.github.io/react-native-paper/theming.html>

#### Props (Simple Dropdown)

---

#### `value` (`required`)

Set the dropdown value `(only string or number based on the data node value)`, can be used in redux-form or formik.

#### `data` (`required`)

Collection of object items to render the group dropdown.

```js
const data = [
  {
    value: '1',
    label: 'Tiger Nixon',
    avatarSource: require('./ddicon.png'),
    disabled: true,
  },
  {
    value: '2',
    label: 'Garrett Winters',
    avatarSource: {
      uri:
        'https://img.icons8.com/color/344/circled-user-female-skin-type-6.png',
    },
    disabled: false,
  },
];
```

#### `onChange`

Call back function onSelecting the dropdown value. It will return the selected item value.

#### `disableSort`

Enable or disable sorting for the dropdown items.

#### `defaultSortOrder`

Set the sorting order for the dropdown items

- `asc` (default)
- `desc`

#### Props (Group Dropdown)

---

#### `value` (`required`)

Set the group dropdown value `(only string or number based on the data node value)`, can be used in redux-form or formik.

#### `data` (`required`)

Collection of object items to render the group dropdown.

#### Sample

```js
const data = [
 {
   title: 'Apple',
   data: [
     {
       value: 'iphonese',
       label: 'iPhone SE(2020)',
       avatarSource: require('./ddicon.png'),
     },
     {
       value: '23',
       label: 'iPhone X',
       avatarSource: {
         uri: 'https://img.icons8.com/emoji/344/mobile-phone.png',
       },
     },
   ],
 }
}
```

#### `onChange`

Call back function onSelecting the dropdown value. It will return the selected item value.

#### `stickySectionHeadersEnabled`

Keep the group header sticky or not.

#### `headerContainerStyle`

Dropdown group header container view style.

#### `headerContainerStyle`

Dropdown group header text style.

#### Props (Multiselect Dropdown)

---

#### `value` (`required`)

Set the multiselect dropdown value(`only array of string[] or number[] based on the data node value`) . Aslo, can be used in redux-form or formik

#### `data` (`required`)

Collection of object items to render the group dropdown.

```js
const data = [
  {
    value: '1',
    label: 'Tiger Nixon',
    avatarSource: require('./ddicon.png'),
  },
  {
    value: '2',
    label: 'Garrett Winters',
    avatarSource: {
      uri:
        'https://img.icons8.com/color/344/circled-user-female-skin-type-6.png',
    },
  },
];
```

#### `onChange`

Call back function onSelecting the dropdown value. It will return the selected item value.

#### `disableSort`

Enable or disable sorting for the dropdown items.

#### `defaultSortOrder`

Set the sorting order for the dropdown items

- `asc` (default)
- `desc`

#### `chipType`

Mode of the chip.

- `flat` - flat chip without outline.
- `outlined` - chip with an outline.

#### `chipTextStyle`

Change chip label text style.

#### `chipStyle`

Change the chip view style.

#### `emptySelectionText`

Change the selection section empty text value.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

[MIT](LICENSE)

[license]: https://opensource.org/licenses/MIT

<!-- badges -->

[build-badge]: https://img.shields.io/circleci/build/github/srk-sharingan/sharingan-rn-modal-dropdown/master.svg?style=flat-square
[build]: https://app.circleci.com/pipelines/github/srk-sharingan/sharingan-rn-modal-dropdown
[package]: https://www.npmjs.com/package/sharingan-rn-modal-dropdown
[version-badge]: https://img.shields.io/npm/v/sharingan-rn-modal-dropdown.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/sharingan-rn-modal-dropdown.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
