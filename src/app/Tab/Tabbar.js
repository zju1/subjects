import {Text, useTheme} from '@ui-kitten/components';
import React from 'react';
import {View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';

export default function AppTabbar({state, descriptors, navigation}) {
  const theme = useTheme();
  return (
    <KeyboardAvoidingView
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: 70,
        }}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const tabBarIcon = options.tabBarIcon({focused: isFocused});

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={`tab_${index}`}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={{flex: 1}}
              onLongPress={onLongPress}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {tabBarIcon}
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Inter-Regular',
                    color: isFocused
                      ? theme['color-primary-800']
                      : theme['color-basic-700'],
                    textAlign: 'center',
                  }}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </KeyboardAvoidingView>
  );
}
