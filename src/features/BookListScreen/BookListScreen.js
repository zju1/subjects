import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import BookViewHeader from '../BookViewScreen/BookViewHeader';
import BookItem from './BookItem';
import EmptyIcon from "../../../assets/icons/empty.svg"
import {Text} from '@ui-kitten/components';

export default function BookListScreen({route, navigation, isSaved, isDownloaded}) {
  const title = route.params?.item?.title;
  const subjects = route?.params?.item?.subjects ?? [];
  const savedItems = useSelector(store => store.saved);
  const downloadedItems = useSelector(store => store.downloaded);
  const isItemsExsist = isSaved ? savedItems.length > 0 : isDownloaded ? downloadedItems.length > 0 : subjects.length > 0;
  return (
    <View style={{flex: 1}}>
      <BookViewHeader
        title={isSaved ? "Saqlanǵan kitaplar" : isDownloaded ? "Júklengen kitaplar" : title}
        onBack={() => isSaved ? navigation.navigate('HomeScreen') : navigation.pop()}
      />
      <View style={{flex: 1}}>
        {
          isItemsExsist && <FlatList
            data={isSaved ? savedItems : isDownloaded ? downloadedItems : subjects}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <BookItem
                onClick={() => navigation.push('BookViewScreen', {item})}
                data={item}
                isSaved={isSaved}
                isDownloaded={isDownloaded}
              />
            )}
          />
        }
        {
          ((isSaved && savedItems.length === 0) || (isDownloaded && downloadedItems.length === 0)) &&
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <EmptyIcon width="150px" height="150px" />
            <Text style={{marginTop: 20, fontSize: 16}}> {isSaved ? "Saqlanǵan" : "Júklengen"} kitaplar joq </Text>
          </View>
        }
      </View>
    </View>
  );
}
