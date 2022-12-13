import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

export default function GradeButton({data, onClick}) {
  const theme = useTheme();
  return (
    <View style={styles.gradeButton}>
      <TouchableOpacity onPress={onClick}>
        <View style={{position: 'relative', height: 130}}>
          <Image
            source={require('../../../assets/images/book.jpg')}
            resizeMode="cover"
            style={{width: '100%', height: '100%'}}
          />
          <View
            style={[
              styles.gradeContainer,
              {
                overflow: 'hidden',
                backgroundColor: `${theme['color-primary-300']}aa`,
              },
            ]}>
            <Text
              style={[styles.gradeText, {color: theme['color-primary-900']}]}>
              {data.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
