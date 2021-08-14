import React, { useState, useRef, useEffect } from 'react';
import {
  TextInput,
  Surface,
  Divider,
  HelperText,
  Searchbar,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import Lo from 'lodash';

import Item from '../Components/Item';
import { defaultDropdownProps, ITEMLAYOUT } from '../constants';
import type { IDropdownData, IDropdownProps } from '../types';
import styles from '../styles';
import { deviceWidth, deviceHeight } from '../util';
import EmptyList from '../Components/EmptyList';
import PressableTouch from '../Components/PressableTouch';

const Dropdown: React.FC<IDropdownProps> = props => {
  const {
    error,
    value,
    label,
    required,
    disabled,
    data,
    onChange,
    floating,
    enableSearch,
    primaryColor,
    elevation,
    borderRadius,
    activityIndicatorColor,
    searchPlaceholder,
    rippleColor = 'transparent',
    helperText,
    errorColor,
    itemTextStyle,
    itemContainerStyle,
    showLoader,
    animationIn = 'fadeIn',
    animationOut = 'fadeOut',
    supportedOrientations = ['portrait', 'landscape'],
    animationInTiming,
    animationOutTiming,
    parentDDContainerStyle,
    emptyListText,
    disableSort,
    enableAvatar,
    avatarSize,
    defaultSortOrder = 'asc',
    onBlur,
    paperTheme,
    textInputStyle,
    mainContainerStyle,
    underlineColor,
    disableSelectionTick,
    textInputPlaceholder,
    textInputPlaceholderColor,
    selectedItemTextStyle,
    selectedItemViewStyle,
    removeLabel,
    mode = 'flat',
    disabledItemTextStyle,
    disabledItemViewStyle,
    dropdownIcon = 'menu-down',
    dropdownIconSize = 30,
    itemSelectIcon,
    itemSelectIconSize,
    multiline = false,
    searchInputTheme,
  } = props;
  const { colors } = useTheme();
  const [selected, setSelected] = useState<string | number>();
  const [labelv, setLabelV] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [iconColor, setIconColor] = useState<string | undefined>('grey');
  const [options, setOptions] = useState<IDropdownData[]>([]);
  const [hasError, setError] = useState<boolean>(false);
  const [contMeasure, setConMeasure] = useState({
    vx: 0,
    vy: 0,
    vWidth: 0,
    vHeight: 0,
  });
  const [dimension, setDimension] = useState({
    dw: deviceWidth,
    dh: deviceHeight,
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const pViewRef = useRef<View | any>();
  const listRef = useRef<FlatList | any>();

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setIsVisible(false);
      const { width, height } = Dimensions.get('window');
      setDimension({ dw: width, dh: height });
      setIconColor('grey');
    });
    return () => {
      Dimensions.removeEventListener('change', () => {});
    };
  }, []);

  useEffect(() => {
    if (!Lo.isEmpty(data) && value) {
      const lFilter = Lo.filter(data, { value: value })[0];
      if (!Lo.isEmpty(lFilter)) setLabelV(lFilter.label);
    }
  }, [value, data]);

  useEffect(() => {
    if (disabled) {
      setIconColor('lightgrey');
    }
  }, [disabled]);

  useEffect(() => {
    if (isVisible && listRef) {
      listRef.current.flashScrollIndicators();
    }
  }, [isVisible]);

  useEffect(() => {
    if (!disableSort)
      setOptions(Lo.orderBy(data, ['label'], [defaultSortOrder]));
    else setOptions(data);
  }, [data, disableSort, defaultSortOrder]);

  useEffect(() => {
    if (isVisible && selected) {
      const selectedIndex = Lo.findIndex(options, { value: selected });
      if (selectedIndex >= 0 && listRef) {
        setTimeout(() => {
          listRef.current.scrollToIndex({
            animated: false,
            index: selectedIndex,
            viewPosition: Platform.OS === 'android' ? 0 : 0.5,
          });
        }, 100);
      }
    }
  }, [selected, options, isVisible]);

  useEffect(() => {
    if (required && error) {
      setError(true);
      setIconColor(errorColor);
    } else {
      setError(false);
      setIconColor('grey');
    }
  }, [required, error, errorColor]);

  const onTextInputFocus = () => {
    if (hasError) {
      setIconColor('red');
    } else {
      setIconColor(primaryColor);
    }
    pViewRef.current.measureInWindow(
      (vx: number, vy: number, vWidth: number, vHeight: number) => {
        const ddTop = vy + vHeight;
        const bottomMetric = dimension.dh - vy;
        if (bottomMetric < 300) {
          setConMeasure({ vx, vy: ddTop - 217, vWidth, vHeight });
        } else {
          setConMeasure({ vx, vy: ddTop, vWidth, vHeight });
        }
      }
    );
    setIsVisible(true);
  };

  const androidOnLayout = () => {
    if (Platform.OS === 'android') {
      pViewRef.current.measureInWindow(
        (vx: number, vy: number, vWidth: number, vHeight: number) => {
          const ddTop = vy + vHeight;
          const bottomMetric = dimension.dh - vy;
          if (bottomMetric < 300) {
            setConMeasure({ vx, vy: ddTop - 217, vWidth, vHeight });
          } else {
            setConMeasure({ vx, vy: ddTop, vWidth, vHeight });
          }
        }
      );
    }
  };

  const onModalBlur = () => {
    setIsVisible(false);
    if (hasError) {
      setIconColor('red');
    } else {
      setIconColor('grey');
    }
    if (onBlur && typeof onBlur === 'function') onBlur();
  };

  const handleOptionSelect = (v: string | number) => {
    const lFilter = Lo.filter(data, { value: v })[0];
    if (!Lo.isEmpty(lFilter)) setLabelV(lFilter.label);
    setSelected(v);
    if (onChange && typeof onChange === 'function') {
      onChange(v);
      setIsVisible(false);
    }
    if (hasError) {
      setIconColor('red');
    } else {
      setIconColor('grey');
    }
    setSearchQuery('');

    if (!disableSort)
      setOptions(Lo.orderBy(data, ['label'], [defaultSortOrder]));
    else setOptions(data);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (!Lo.isEmpty(data) && query) {
      const lFilter = data.filter(opt =>
        opt.label
          .toString()
          .toLowerCase()
          .trim()
          .includes(query.toString().toLowerCase())
      );
      if (lFilter.length === 0) {
        setOptions([]);
      } else {
        setOptions(lFilter);
      }
    } else if (!Lo.isEmpty(data) && !query && !disableSort) {
      setOptions(Lo.sortBy(data, 'label'));
    } else setOptions(data);
  };

  const getEmptyComponent = () => {
    if (typeof emptyListText === 'string')
      return <EmptyList emptyItemMessage={emptyListText} />;
    else return <>{emptyListText}</>;
  };

  const labelAction = () => {
    if (removeLabel) {
      return '';
    } else {
      return required ? `${label}*` : label;
    }
  };

  return (
    <PaperProvider theme={paperTheme}>
      <View>
        <PressableTouch
          onPress={onTextInputFocus}
          disabled={disabled}
          rippleColor={rippleColor}
        >
          <View
            style={[styles.fullWidth, mainContainerStyle]}
            ref={pViewRef}
            onLayout={androidOnLayout}
            pointerEvents="none"
          >
            <TextInput
              label={labelAction()}
              placeholder={textInputPlaceholder}
              placeholderTextColor={textInputPlaceholderColor}
              value={labelv}
              style={[styles.textInput, textInputStyle]}
              underlineColor={underlineColor}
              underlineColorAndroid={underlineColor}
              editable={false}
              error={hasError}
              disabled={disabled}
              multiline={multiline}
              theme={{
                ...searchInputTheme,
                colors: { primary: primaryColor, error: errorColor },
              }}
              right={
                <TextInput.Icon
                  name={dropdownIcon}
                  size={dropdownIconSize}
                  color={iconColor}
                />
              }
              mode={mode}
            />
          </View>
          {required && hasError ? (
            <HelperText
              type="error"
              theme={{ colors: { error: errorColor } }}
              visible={hasError}
            >
              {helperText ? helperText : `${label} is required`}
            </HelperText>
          ) : null}
        </PressableTouch>
        <Modal
          isVisible={isVisible}
          onBackdropPress={onModalBlur}
          backdropColor={floating ? 'rgba(0,0,0,0.1)' : 'transparent'}
          style={styles.modalStyle}
          animationIn={animationIn}
          animationOut={animationOut}
          animationInTiming={animationInTiming}
          animationOutTiming={animationOutTiming}
          supportedOrientations={supportedOrientations}
        >
          <View
            style={{
              backgroundColor: colors.background,
              width: !floating ? contMeasure.vWidth : 'auto',
              left: !floating ? contMeasure.vx : 0,
              top: !floating ? contMeasure.vy : 100,
              right: 0,
              position: 'absolute',
              padding: floating ? 20 : 0,
            }}
          >
            <Surface
              style={[
                styles.surface,
                parentDDContainerStyle,
                { elevation, borderRadius },
                floating ? { maxHeight: dimension.dh / 2 } : null,
              ]}
            >
              {showLoader ? (
                <View style={[styles.loader, { borderRadius }]}>
                  <ActivityIndicator
                    size="small"
                    color={activityIndicatorColor}
                  />
                </View>
              ) : null}
              <FlatList
                ref={listRef}
                data={options}
                initialNumToRender={50}
                // maxToRenderPerBatch={25}
                persistentScrollbar
                scrollEnabled={!showLoader}
                ListHeaderComponent={
                  enableSearch ? (
                    <View>
                      <Searchbar
                        placeholder={searchPlaceholder}
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        theme={{ colors: { primary: primaryColor } }}
                        style={{
                          elevation: 0,
                          backgroundColor: showLoader
                            ? 'transparent'
                            : colors.background,
                          height: ITEMLAYOUT,
                        }}
                      />
                      <Divider style={styles.divider} />
                    </View>
                  ) : null
                }
                stickyHeaderIndices={enableSearch ? [0] : undefined}
                renderItem={({ item }) => (
                  <Item
                    item={item}
                    onSelect={handleOptionSelect}
                    selected={value}
                    selectedColor={primaryColor}
                    itemTextStyle={itemTextStyle}
                    itemContainerStyle={itemContainerStyle}
                    rippleColor={rippleColor}
                    disabled={showLoader || item?.disabled}
                    enableAvatar={enableAvatar}
                    avatarSize={avatarSize}
                    disableSelectionTick={disableSelectionTick}
                    selectedItemTextStyle={selectedItemTextStyle}
                    selectedItemViewStyle={selectedItemViewStyle}
                    disabledItemTextStyle={disabledItemTextStyle}
                    disabledItemViewStyle={disabledItemViewStyle}
                    itemSelectIcon={itemSelectIcon}
                    itemSelectIconSize={itemSelectIconSize}
                  />
                )}
                keyExtractor={() => Math.random().toString()}
                ItemSeparatorComponent={() => (
                  <Divider style={styles.divider} />
                )}
                getItemLayout={(_d, index) => ({
                  length: ITEMLAYOUT,
                  offset: ITEMLAYOUT * index,
                  index,
                })}
                ListEmptyComponent={getEmptyComponent()}
              />
            </Surface>
          </View>
        </Modal>
      </View>
    </PaperProvider>
  );
};

Dropdown.defaultProps = defaultDropdownProps;

export default Dropdown;
