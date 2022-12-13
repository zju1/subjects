import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    zIndex: 1,
    borderWidth: 0,
    borderBottomWidth: 1,
    padding: 0,
    margin: 0
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    flex: 1,
  },
  btnText: {
    color: '#fff',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  thumbContent: {
    borderRadius: 10,
    minWidth: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{translateX: -20}]
  }
});
