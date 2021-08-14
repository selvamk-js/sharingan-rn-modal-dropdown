import React, { useState, useRef, useEffect } from 'react';
import {
  TextInput,
  Surface,
  Divider,
  HelperText,
  Searchbar,
  Text,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import {
  View,
  Dimensions,
  Platform,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import Lo from 'lodash';

import Item from '../Components/Item';
import { defaultDropdownProps, ITEMLAYOUT } from '../constants';
import styles from '../styles';
import type {
  IDropdownData,
  IGroupDropdownData,
  IGroupDropdownProps,
} from '../types';
import { deviceWidth, deviceHeight } from '../util';
import EmptyList from '../Components/EmptyList';
import PressableTouch from '../Components/PressableTouch';

const GroupDropdown: React.FC<IGroupDropdownProps> = props => {
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
    headerTextStyle,
    headerContainerStyle,
    stickySectionHeadersEnabled,
    parentDDContainerStyle,
    rippleColor,
    emptyListText,
    enableAvatar,
    avatarSize,
    onBlur,
    paperTheme,
    textInputStyle,
    mainContainerStyle,
    underlineColor,
    disableSelectionTick,
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
  const [labelv, setlabelV] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [iconColor, setIconColor] = useState<string | undefined>('grey');
  const [options, setOptions] = useState<IGroupDropdownData[]>([]);
  const [hasError, setError] = useState<boolean>(false);
  const [singluarData, setSingularData] = useState<IDropdownData[]>([]);

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
  const [searchQuery, setSearchQuery] = useState('');

  const pViewRef = useRef<View | any>();
  const listRef = useRef<SectionList | any>();

  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      const { width, height } = Dimensions.get('window');
      setDimension({ dw: width, dh: height });
      setIsVisible(false);
      setIconColor('grey');
    });
    return () => {
      Dimensions.removeEventListener('change', () => {});
    };
  }, []);

  useEffect(() => {
    const destructuredData: IDropdownData[] = [];
    Lo.forEach(data, d => {
      Lo.forEach(d.data, dv => destructuredData.push(dv));
    });
    setSingularData(destructuredData);
    setOptions(data);
  }, [data]);

  useEffect(() => {
    if (!Lo.isEmpty(singluarData) && value) {
      const lFilter = Lo.filter(singluarData, { value: value })[0];
      if (!Lo.isEmpty(lFilter)) setlabelV(lFilter.label);
      setSelected(value);
    }
  }, [value, singluarData]);

  useEffect(() => {
    if (isVisible && listRef) {
      listRef.current.flashScrollIndicators();
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && selected) {
      let secionIndex = 0;
      let itemIndex = 0;
      if (!Lo.isEmpty(options)) {
        options.forEach((e, secIndex) => {
          const itIndex = Lo.findIndex(e.data, { value: selected });
          if (itIndex >= 0 && listRef) {
            itemIndex = itIndex;
            secionIndex = secIndex;
            setTimeout(() => {
              listRef.current.scrollToLocation({
                animated: false,
                sectionIndex: secionIndex,
                itemIndex: itemIndex,
                viewPosition: Platform.OS === 'android' ? 0 : 0.5,
              });
            }, 100);
          }
        });
      }
    }
  }, [selected, options, isVisible]);

  useEffect(() => {
    if (disabled) {
      setIconColor('lightgrey');
    }
  }, [disabled]);

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
    // if (Platform.OS === 'ios') {
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
    // }
    setIsVisible(true);
  };

  const androidOnLayout = () => {
    if (Platform.OS === 'android') {
      pViewRef.current.measureInWindow(
        (vx: number, vy: number, vWidth: number, vHeight: number) => {
          const ddTop = vy + vHeight;
          const bottomMetric = dimension.dh - vy;
          // setPx(bottomMetric);
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
    const lFilter = Lo.filter(singluarData, { value: v })[0];
    if (!Lo.isEmpty(lFilter)) setlabelV(lFilter.label);
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

    setOptions(data);
  };

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (!Lo.isEmpty(data) && query) {
      let matches: IGroupDropdownData[] = [];
      data.forEach(e => {
        const sF = e.data.filter(c =>
          c.label
            .toString()
            .toLowerCase()
            .trim()
            .includes(query.toString().toLowerCase())
        );
        if (!Lo.isEmpty(sF))
          matches = matches.concat([{ title: e.title, data: sF }]);
      });
      if (matches.length === 0) setOptions([]);
      else setOptions(matches);
    } else if (!Lo.isEmpty(data) && !query) {
      setOptions(data);
    }
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
        </View>
        <View>
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
                <SectionList
                  ref={listRef}
                  sections={options}
                  legacyImplementation
                  initialNumToRender={25}
                  maxToRenderPerBatch={25}
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
                  renderSectionHeader={({ section: { title } }) => (
                    <View
                      style={{
                        backgroundColor: showLoader
                          ? 'transparent'
                          : colors.background,
                        borderRadius: 3,
                      }}
                    >
                      <Divider style={styles.divider} />
                      <View style={[styles.headerView, headerContainerStyle]}>
                        <Text style={[styles.headerText, headerTextStyle]}>
                          {title.trim()}
                        </Text>
                      </View>
                      <Divider style={styles.divider} />
                    </View>
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
                  stickySectionHeadersEnabled={stickySectionHeadersEnabled}
                  ListEmptyComponent={getEmptyComponent()}
                />
              </Surface>
            </View>
          </Modal>
        </View>
      </View>
    </PaperProvider>
  );
};

GroupDropdown.defaultProps = defaultDropdownProps;
export default GroupDropdown;
