import React, { useState, useRef, useEffect } from 'react';
import {
  TextInput,
  Surface,
  Divider,
  HelperText,
  Searchbar,
  Provider as PaperProvider,
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
import { theme } from '../theme';

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
    rippleColor,
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
  } = props;
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
      setLabelV(lFilter.label);
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
    if (isVisible && value) {
      const selectedIndex = Lo.findIndex(options, { value: value });
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
  }, [value, options, isVisible]);

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

  const handleOptionSelect = (v: string) => {
    const lFilter = Lo.filter(data, { value: v })[0];
    setLabelV(lFilter.label);
    if (onChange && typeof onChange === 'function') {
      onChange(v.toString());
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

  return (
    <PaperProvider theme={paperTheme || theme}>
      <View>
        <PressableTouch
          onPress={onTextInputFocus}
          disabled={disabled}
          rippleColor={rippleColor}
        >
          <View
            style={styles.fullWidth}
            ref={pViewRef}
            onLayout={androidOnLayout}
            pointerEvents="none"
          >
            <TextInput
              label={required ? `${label}*` : label}
              value={labelv}
              style={[styles.textInput, textInputStyle]}
              editable={false}
              error={hasError}
              disabled={disabled}
              theme={{
                colors: { primary: primaryColor, error: errorColor },
                dark: false,
              }}
              right={
                <TextInput.Icon name="menu-down" size={30} color={iconColor} />
              }
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
              backgroundColor: 'transparent',
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
                initialNumToRender={25}
                maxToRenderPerBatch={25}
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
                            : '#FFFFFF',
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
                    selected={value.toString()}
                    selectedColor={primaryColor}
                    itemTextStyle={itemTextStyle}
                    itemContainerStyle={itemContainerStyle}
                    rippleColor={rippleColor}
                    disabled={showLoader}
                    enableAvatar={enableAvatar}
                    avatarSize={avatarSize}
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
