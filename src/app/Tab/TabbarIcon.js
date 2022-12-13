import {useTheme} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';

const TabBarIcon = props => {
  const theme = useTheme();
  const size = '30px';
  return (
    <View
      style={{
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <props.icon
        fill={props.focused ? theme['color-primary-200'] : 'transparent'}
        color={
          props.focused ? theme['color-primary-400'] : theme['color-basic-700']
        }
        style={{strokeWidth: '2px'}}
        width={size}
        height={size}
      />
    </View>
  );
};

export default TabBarIcon;
