import {useTheme} from '@ui-kitten/components';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import GradeButton from './GradeButton';
import {useDispatch, useSelector} from 'react-redux';
import {fetchGrades} from '../../app/appSlice';
import RNFS from "react-native-fs";
import {setCachedItems} from '../../util/utils';

export default function HomeScreen({navigation}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const grades = useSelector(store => store.grades);
  const [loading, setLoading] = useState(grades.length === 0);

  const loadData = useCallback(async () => {
    setLoading(true);
    await dispatch(fetchGrades());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (grades.length === 0) {

      loadData();
    }
    setCachedItems()
  }, []);


  return (
    <SafeAreaView style={{flex: 1}}>
      <AppHeader />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={40} color={theme['color-primary-900']} />
        </View>
      ) : (
        <FlatList
          data={grades}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={loadData} />
          }
          keyExtractor={item => `grade_${item.id}`}
          numColumns={3}
          renderItem={({item}) => (
            <GradeButton
              onClick={() => navigation.push('BookList', {item})}
              data={item}
              key={`gradeButton_${item.id}`}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
          columnWrapperStyle={{
            marginVertical: 5,
          }}
        />
      )}
    </SafeAreaView>
  );
}
