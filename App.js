import React, {useEffect, useState} from 'react';
import {Modal, ActivityIndicator, StatusBar} from 'react-native';
import Routes from './src/routes';
import FlashMessage from 'react-native-flash-message';
import FlashMessageContainer from './src/components/toast';
import {Provider} from 'react-redux';
import {persistor, sagaMiddleware, store} from 'src/redux/store';
import rootSaga from 'src/redux/saga';
import {PersistGate} from 'redux-persist/integration/react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import KeepAwake from 'react-native-keep-awake';
import codePush from 'react-native-code-push';
import {Block, hp, ImageComponent, Text, wp} from '_elements';
import {light} from 'src/components/theme/colors';
import {socket, SocketContext} from 'src/utils/socketContext';

let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};
sagaMiddleware.run(rootSaga);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0884c7',
    accent: '#f1c40f',
  },
};

const App = () => {
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    codePush.sync(
      {
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
  }, []);
  const codePushStatusDidChange = (syncStatus) => {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for update.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Download packaging....');
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('Awaiting user action....');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update');
        setProgress(false);
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('codepush status up to date');
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        console.log('update cancel by user');
        setProgress(false);
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed and will be applied on restart.');
        setProgress(false);
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log('An unknown error occurred');
        setProgress(false);
        break;
    }
  };

  const codePushDownloadDidProgress = (pro) => {
    setProgress(pro);
  };

  const showProgressView = () => {
    return (
      <Modal visible={true} transparent>
        <Block center middle color={'rgba(0,0,0,0.8)'}>
          <Block
            center
            flex={false}
            borderRadius={8}
            padding={[hp(2), wp(10)]}
            color="#fff">
            <ImageComponent name="logoW" height={25} width={83} />
            <Text margin={[hp(0.5), 0, 0]} capitalize>
              In Progress....
            </Text>

            <Block flex={false} center>
              <Text margin={[8, 0, 0]}>{`${(
                Number(progress?.receivedBytes) / 1048576
              ).toFixed(2)}MB/${(
                Number(progress?.totalBytes) / 1048576
              ).toFixed(2)}`}</Text>
              <Block flex={false} center margin={[hp(1), 0]}>
                <ActivityIndicator color={light.secondary} />
              </Block>
              <Text>
                {(
                  (Number(progress?.receivedBytes) /
                    Number(progress?.totalBytes)) *
                  100
                ).toFixed(0)}
                %
              </Text>
            </Block>
          </Block>
        </Block>
      </Modal>
    );
  };
  return (
    <PaperProvider theme={theme}>
      {progress ? showProgressView() : null}
      <KeepAwake />
      <StatusBar barStyle="dark-content" />
      <SocketContext.Provider value={socket}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routes />
            <FlashMessage
              MessageComponent={(data) => <FlashMessageContainer data={data} />}
              position="bottom"
            />
          </PersistGate>
        </Provider>
      </SocketContext.Provider>
    </PaperProvider>
  );
};

export default codePush(codePushOptions)(App);
