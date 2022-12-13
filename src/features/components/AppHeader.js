import {Text, TopNavigation, useTheme} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import styles from '../HomeScreen/styles';

export default function AppHeader() {
  const theme = useTheme();
  return (
    <TopNavigation title={() =>
      <View style={{alignItems: 'center', flex: 1}} >
        <Text style={[styles.homeHeaderTitle]}>
          Sabaqlıqlar
        </Text>
      </View>} >
    </TopNavigation>
  );
}
