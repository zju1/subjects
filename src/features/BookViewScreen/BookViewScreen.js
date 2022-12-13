import {Button, Text, useTheme} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Dimensions, ToastAndroid, View} from 'react-native';
import Pdf from 'react-native-pdf';
import BookViewHeader from './BookViewHeader';
import styles from './styles';
import Download from '../../../assets/icons/download-fill.svg';
import Bookmark from '../../../assets/icons/bookmarkf.svg';
import {useRef} from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {useDispatch, useSelector} from 'react-redux';
import {useCallback} from 'react';
import {pushToSaved} from '../../app/appSlice';
import {useMemo} from 'react';
import {setCachedItems} from '../../util/utils';
import RNFS from "react-native-fs"

const {width} = Dimensions.get('screen');

export default function BookViewScreen({route, navigation}) {
  const savedItems = useSelector(store => store.saved);
  const dispatch = useDispatch()
  const pdfRef = useRef();
  const theme = useTheme()
  const [thumb, setThumb] = useState(false)
  const [value, setValue] = useState(1);
  const [maxPage, setMaxPage] = useState(2);
  const [downloadDisabled, setDownloadDisabled] = useState(true);
  const [localFilePath, setLocalFilePath] = useState('');
  const title = route.params.item.title;

  const isSaved = useMemo(() => {
    return savedItems.find(item => item.id === route.params.item.id)
  }, [route.params.item, savedItems])

  const addToSaved = useCallback(() => {
    dispatch(pushToSaved(route.params.item));
    ToastAndroid.show('Kitap saqlanǵanlarǵa qosıldı !', ToastAndroid.SHORT)
  }, [savedItems, route.params.item])

  const handleLoadComplete = useCallback((numPages, path) => {
    setMaxPage(numPages);
    setLocalFilePath(path)
    setDownloadDisabled(false);
    setCachedItems()
  }, [setMaxPage]);

  const handleDownloadToPhone = useCallback(async () => {
    setDownloadDisabled(true);
    try {
      await RNFS.copyFile(localFilePath, `${RNFS.DownloadDirectoryPath}/${title}.pdf`);
      ToastAndroid.show("Fayl 'Júklengenler' papkasına júklendi. (Ingliz tilinde 'Download' papkası) ", ToastAndroid.LONG)
    } catch (error) {
      console.log(error);
    }
    setDownloadDisabled(false);
  }, [localFilePath, title])

  return (
    <View style={{flex: 1}}>
      <BookViewHeader
        onBack={() => navigation.pop()}
        title={title}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
        elevation={0.2}>
        <Pdf
          style={{
            flex: 1,
            width,
          }}

          onLoadComplete={handleLoadComplete}
          onPageChanged={(page) => setValue([page])}
          ref={pdfRef}
          source={{uri: route.params.item.url, cache: true, cacheFileName: `${title}[${route.params.item.id}`}}
          trustAllCerts={false}
          renderActivityIndicator={progress => (
            <Text style={{fontSize: 30}}> {(progress * 100).toFixed(1)}% </Text>
          )}
        />
      </View>
      <View style={{paddingHorizontal: 10, backgroundColor: '#ffffff'}}>
        <Slider
          value={value}
          renderAboveThumbComponent={() => thumb ?
            <View style={[styles.thumbContent, {backgroundColor: theme['color-success-400']}]}>
              <Text style={{color: '#fff', fontFamily: 'Inter-Medium', fontSize: 12}}> {value} / {maxPage} </Text>
            </View> : undefined}
          onSlidingComplete={(newValue) => {
            setThumb(false);
            pdfRef.current.setPage(newValue[0])
          }}
          thumbTintColor={theme['color-success-500']}
          minimumTrackTintColor={theme['color-success-500']}
          onSlidingStart={() => setThumb(true)}
          animateTransitions
          step={1}
          minimumValue={1}
          maximumValue={maxPage}
          onValueChange={(newValue) => {
            setValue(newValue);
          }} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          backgroundColor: '#fff',
          zIndex: 2,
        }}
        elevation={5}>
        <Button
          accessoryLeft={
            <Download fill="transparent" width="30px" height="30px" />
          }
          onPress={handleDownloadToPhone}
          disabled={downloadDisabled}
          status="success"
          style={{flex: 1, marginRight: 5, borderRadius: 5}}>
          {evaProps => (
            <Text {...evaProps} style={styles.btnText}>
              {downloadDisabled ? 'Kútip turıń...' : 'Telefonǵa júklew'}
            </Text>
          )}
        </Button>
        <Button
          disabled={!!isSaved}
          status="warning"
          accessoryLeft={
            <Bookmark width="30px" height="30px" />
          }
          onPress={addToSaved}
          style={{marginLeft: 5, borderRadius: 5}}>
        </Button>
      </View>
    </View >
  );
}
