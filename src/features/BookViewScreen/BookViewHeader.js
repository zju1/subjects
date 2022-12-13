import {Button, Card, Text, TopNavigation, TopNavigationAction, useTheme} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import Arrow from '../../../assets/icons/arrow-back.svg';
import styles from './styles';

export default function BookViewHeader({title, onBack}) {
  const theme = useTheme()
  return (
    <TopNavigation accessoryLeft={<TopNavigationAction onPress={onBack} icon={Arrow} />}
      title={() => <Text style={{fontSize: 18, fontFamily: 'Inter-Bold'}}> {title} </Text>} elevation={5}
      style={{zIndex: 2}} />
  );
}
