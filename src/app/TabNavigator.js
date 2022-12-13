import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../features/HomeScreen/HomeScreen';
import Home from '../../assets/icons/home.svg';
import DownloadIcon from '../../assets/icons/download.svg';
import Bookmark from '../../assets/icons/bookmark.svg';
import AppTabbar from './Tab/Tabbar';
import TabbarIcon from './Tab/TabbarIcon';
import BookListScreen from '../features/BookListScreen/BookListScreen';
// import DownloadedScreen from '../features/DownloadsScreen/DownloadedScreen';

const Tab = createBottomTabNavigator();
const SavedScreen = (props) => <BookListScreen {...props} isSaved={true} />
const DownloadedScreen = props => <BookListScreen {...props} isDownloaded={true} />

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {position: 'relative', display: 'none'},
      }}
      safeAreaInsets={{bottom: 0, top: 1000, left: 100}}
      tabBar={props => <AppTabbar {...props} />}
      initialRouteName="HomeScreen">
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <TabbarIcon focused={focused} icon={Home} />
          ),
          tabBarLabel: 'Tiykarǵı',
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <TabbarIcon focused={focused} icon={DownloadIcon} />
          ),
          tabBarLabel: 'Júklengenler',
        }}
        name="Saved"
        component={DownloadedScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <TabbarIcon focused={focused} icon={Bookmark} />
          ),
          tabBarLabel: 'Saqlanǵanlar',
        }}
        name="Downloaded"
        component={SavedScreen}
      />
    </Tab.Navigator>
  );
}
