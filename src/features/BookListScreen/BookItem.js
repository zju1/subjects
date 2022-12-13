import {Button, Card, Text, useTheme} from '@ui-kitten/components';
import React from 'react';
import {Image, ToastAndroid, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styles from './styles';
import Arrow from '../../../assets/icons/arrow.svg';
import Trash from '../../../assets/icons/trash.svg';
import RemoveIcon from "../../../assets/icons/remove.svg"
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {popFromSaved} from '../../app/appSlice';
import {deleteCachedItem} from '../../util/utils';
import {useState} from 'react';

export default function BookItem({data, onClick, isSaved, isDownloaded}) {
  const theme = useTheme()
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const deleteFromSaved = useCallback(() => {
    dispatch(popFromSaved(data.id));
    ToastAndroid.show("Kitap saqlanǵanlardan óshirildi", ToastAndroid.SHORT)
  }, [dispatch, data]);

  const deleteFromCache = useCallback(async () => {
    setLoading(true);
    await deleteCachedItem(data.url);
    setLoading(false);
    ToastAndroid.show("Kitap telefon keshinen óshirildi", ToastAndroid.SHORT)
  }, [data])

  return (
    <View style={{flexDirection: 'row'}}>
      {
        isDownloaded && <Button onPress={deleteFromCache} status='danger' style={{borderRadius: 0, borderBottomWidth: 1, borderBottomColor: theme['color-basic-500']}} accessoryLeft={<Trash color="#fff" />} />
      }
      <Card style={{borderRadius: 0, borderWidth: 0, borderBottomWidth: 1, flex: 1, borderBottomColor: theme['color-basic-500']}}>
        <TouchableOpacity disabled={loading}  {...!isSaved ? {onPress: onClick} : {activeOpacity: 1}} >
          <View style={[styles.flex, isSaved ? {paddingVertical: 0} : {}]}>
            <View style={styles.group}>
              <Image
                source={require('../../../assets/images/pdf.png')}
                resizeMode="contain"
                style={{
                  width: 35,
                  height: 35,
                }}
              />
              <View>
                <Text numberOfLines={isSaved ? 3 : 2} category='s1' style={[styles.text, {color: theme['text-basic-color'], maxWidth: !isSaved ? '100%' : '95%'}]}>
                  {data.title}
                </Text>
                <Text status='basic' numberOfLines={2} category='s2' style={[styles.text]}>
                  {(data.size * 0.000001).toFixed(2)} MB
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Arrow color={theme['text-basic-color']} />
            </View>
          </View>
        </TouchableOpacity>
      </Card>
      {
        isSaved && <Button
          onPress={deleteFromSaved} status='danger' style={{borderRadius: 0, borderBottomWidth: 1, borderBottomColor: theme['color-basic-500']}} accessoryLeft={<RemoveIcon color="#fff" />} />
      }
    </View>
  );
}
