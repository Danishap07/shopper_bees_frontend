/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
// import store from './src/store';


// import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

AppRegistry.registerComponent(appName, () => App);
