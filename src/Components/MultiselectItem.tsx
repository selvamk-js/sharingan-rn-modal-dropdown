import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lo from 'lodash';

import { colors, ITEMLAYOUT } from '../constants';
import type { IMultiselectDropdownItemProps } from '../types';
import PressableTouch from './PressableTouch';

const defaultProps = {
  selectedColor: colors.primary,
  itemTextStyle: {},
  itemContainerStyle: {},
  rippleColor: 'rgba(0,0,0,0.1)',
  enableAvatar: false,
};

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
}) => {
  const { label, value, avatarSource } = item;
  const styles = StyleSheet.create({
    unselected: {
      color: colors.unselected,
      paddingLeft: 5,
    },
    selected: {
      color: selectedColor,
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
  });

  const handleSelectValue = () => {
    onSelect(value);
  };

  const getSelectedStyles = () => {
    if (!Lo.isEmpty(selectedItemTextStyle)) {
      return { ...styles.selected, ...(selectedItemTextStyle as {}) };
    } else return styles.selected;
  };

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
        ]}
      >
        <View style={styles.textView}>
          {enableAvatar && (
            avatarSource && avatarSource.type && avatarSource.type !== Avatar.Image ?
              (avatarSource) :
              (<Avatar.Image
                size={avatarSize}
                style={styles.avatarView}
                source={avatarSource || defaultAvatar}
              />)
          )}
          <Text
            style={[
              itemTextStyle,
              selected.includes(value)
                ? getSelectedStyles()
                : styles.unselected,
            ]}
          >
            {label}
          </Text>
        </View>
        <View style={styles.iconView}>
          {selected.includes(value) && !disableSelectionTick ? (
            <MaterialCommunityIcons
              name="check"
              size={18}
              color={selectedColor}
            />
          ) : null}
        </View>
      </View>
    </PressableTouch>
  );
};

MultiselectItem.defaultProps = defaultProps;

export default MultiselectItem;
