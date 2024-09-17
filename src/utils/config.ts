import { ConfigMap } from '@fyo/core/types';
import Store from 'electron-store';

const config = new Store<ConfigMap>();
export default config;