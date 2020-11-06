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
        employee_salary: '675000',
        employee_age: '40',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: '242',
        label: 'iPhone 11',
        employee_salary: '85600',
        employee_age: '23',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: '24w',
        label: 'iPhone 12',
        employee_salary: '85600',
        employee_age: '23',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/2x/iphone-x.png',
        },
      },
      {
        value: '99',
        label: 'iPhone 12 Mini',
        employee_salary: '85600',
        employee_age: '23',
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
        employee_salary: '132000',
        employee_age: '41',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '20',
        label: 'Pixel 3',
        employee_salary: '217500',
        employee_age: '35',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '21',
        label: 'Pixel 3 xl',
        employee_salary: '345000',
        employee_age: '30',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '16',
        label: 'Pixel 4',
        employee_salary: '198500',
        employee_age: '66',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '17',
        label: 'Pixel 4a',
        employee_salary: '725000',
        employee_age: '64',
        avatarSource: {
          uri: 'https://img.icons8.com/cute-clipart/344/android.png',
        },
      },
      {
        value: '18',
        label: 'Pixel 5',
        employee_salary: '237500',
        employee_age: '59',
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
