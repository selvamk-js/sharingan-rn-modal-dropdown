import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lo from 'lodash';

import { colors as ConstColors, ITEMLAYOUT } from '../constants';
import type { IMultiselectDropdownItemProps } from '../types';
import PressableTouch from './PressableTouch';

const defaultProps = {
  selectedColor: ConstColors.primary,
  itemTextStyle: {},
  itemContainerStyle: {},
  rippleColor: 'rgba(0,0,0,0.1)',
  enableAvatar: false,
};
const styles = StyleSheet.create({
  selected: {
    paddingLeft: 5,
  },
  listView: {
    flex: 1,
    paddingVertical: 10,
    height: ITEMLAYOUT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconView: {
    width: 30,
  },
  textView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarView: {
    backgroundColor: 'transparent',
  },
  disabledText: {
    color: '#CFCFCF',
  },
  disabledItemView: {
    backgroundColor: 'transparent',
  },
});

const defaultAvatar = require('../assets/ddicon.png');

const MultiselectItem: React.FC<IMultiselectDropdownItemProps> = ({
  item,
  selected,
  onSelect,
  selectedColor,
  itemTextStyle,
  itemContainerStyle,
  rippleColor,
  disabled,
  enableAvatar,
  avatarSize,
  disableSelectionTick,
  selectedItemTextStyle,
  selectedItemViewStyle,
  disabledItemViewStyle = styles.disabledItemView,
  disabledItemTextStyle = styles.disabledText,
  itemSelectIcon = 'check',
  itemSelectIconSize = 18,
}) => {
  const { label, value, avatarSource, avatarComponent } = item;
  const { colors } = useTheme();

  const handleSelectValue = () => {
    onSelect(value);
  };

  const getSelectedStyles = () => {
    if (!Lo.isEmpty(selectedItemTextStyle)) {
      return {
        ...styles.selected,
        color: selectedColor,
        ...(selectedItemTextStyle as {}),
      };
    } else return styles.selected;
  };

  const renderIcon = () => {
    if (typeof itemSelectIcon === 'string') {
      return (
        <MaterialCommunityIcons
          name={itemSelectIcon}
          size={itemSelectIconSize}
          color={selectedColor}
        />
      );
    }
    return itemSelectIcon;
  };

  const inlineStyle = StyleSheet.create({
    unselected: {
      color: colors.text,
      paddingLeft: 5,
    },
  });

  return (
    <PressableTouch
      onPress={handleSelectValue}
      disabled={disabled}
      key={Math.random().toString()}
      rippleColor={rippleColor}
    >
      <View
        style={[
          styles.listView,
          itemContainerStyle,
          selected.includes(value) ? selectedItemViewStyle : {},
          disabled && disabledItemViewStyle,
        ]}
      >
        <View style={styles.textView}>
          {enableAvatar ? (
            avatarComponent ? (
              avatarComponent
            ) : (
              <Avatar.Image
                size={avatarSize}
                style={styles.avatarView}
                source={avatarSource || defaultAvatar}
              />
            )
          ) : null}
          <Text
            style={[
              itemTextStyle,
              selected.includes(value)
                ? getSelectedStyles()
                : inlineStyle.unselected,
              disabled && disabledItemTextStyle,
            ]}
          >
            {label}
          </Text>
        </View>
        <View style={styles.iconView}>
          {selected.includes(value) && !disableSelectionTick && renderIcon()}
        </View>
      </View>
    </PressableTouch>
  );
};

MultiselectItem.defaultProps = defaultProps;

export default MultiselectItem;
