import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import BookListScreen from '../features/BookListScreen/BookListScreen';
import BookViewScreen from '../features/BookViewScreen/BookViewScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="HomeStack">
        <Stack.Screen name="HomeStack" component={TabNavigator} />
        <Stack.Screen name="BookList" component={BookListScreen} />
        <Stack.Screen name="BookViewScreen" component={BookViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
