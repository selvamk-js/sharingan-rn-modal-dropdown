import { StyleSheet } from 'react-native';
import { ITEMLAYOUT } from './constants';

export default StyleSheet.create({
  headerView: {
    paddingLeft: 5,
    minHeight: ITEMLAYOUT,
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  fullWidth: {
    // flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  modalStyle: {
    margin: 0,
    borderRadius: 0,
  },
  textInput: {
    // backgroundColor: 'transparent',
    borderColor: 'black',
  },
  rippleStyle: {
    width: '100%',
    flexDirection: 'column',
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  ddIcon: {
    position: 'absolute',
    right: 0,
    marginStart: 10,
    width: 50,
    height: 50,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  surface: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    maxHeight: 250,
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  multiSelectSurface: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5,
    maxHeight: 350,
    minHeight: 100,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  emptyItemView: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  chipParentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipView: {
    // width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    height: 35,
    borderWidth: 1,
  },
  modalCloseIcon: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  chipScrollView: {
    padding: 8,
  },
  chipWrapper: { paddingLeft: 2 },
  centerChips: {
    paddingVertical: 5,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarView: {
    backgroundColor: 'transparent',
  },
  textView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
});
