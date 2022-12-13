import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  homeHeader: {
    backgroundColor: '#fff',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  homeHeaderTitle: {
    fontFamily: 'Cinzel',
    fontSize: 25,
  },
  homeBanner: {
    padding: 15,
  },
  homeBannerItem: {
    height: 200,
    width: width * 0.7,
    backgroundColor: '#ffffff',
    marginRight: 10,
    borderRadius: 20,
  },
  searchContainer: {
    marginBottom: 10,
    marginHorizontal: 5,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
  },
  gradeButton: {
    flex: 1,
    overflow: 'hidden',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  gradeText: {
    fontSize: 20,
    fontFamily: 'Inter-Medium',
  },
  gradeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
