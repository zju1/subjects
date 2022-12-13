import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  bookItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingRight: 10,
  },
  text: {
    fontFamily: 'Inter-Medium',
    flex: 1,
    marginLeft: 10,
  },
  size: {
    fontSize: 14
  }
});
