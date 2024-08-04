import {configureDependencies} from 'kdbx-ts';
import {AppRegistry} from 'react-native';
import {install} from 'react-native-quick-crypto';

import {name as appName} from './app.json';
import App from './src/App';
import {
  transformAes256KdfKey,
  transformArgon2KdfKey,
} from './src/modules/kdbxModule';

install();
configureDependencies({
  transformAes256KdfKey,
  transformArgon2KdfKey,
});

AppRegistry.registerComponent(appName, () => App);
