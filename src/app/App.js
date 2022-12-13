import {ApplicationProvider, Text} from '@ui-kitten/components';
import React from 'react';
import * as eva from '@eva-design/eva';
import RootNavigator from './RootNavigator';
import {Provider} from 'react-redux';
import store, {persistor} from './store';
import {myTheme} from '../theme/custom-theme';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={{...eva.light, ...myTheme}}>
        <PersistGate loading={<Text> Kútip turıń... </Text>} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </ApplicationProvider>
    </Provider>
  );
}
