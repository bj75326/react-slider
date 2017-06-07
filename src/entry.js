//entry.js

import React from 'react';
import {render} from 'react-dom';
import Test from './component/Test.js';
import initReactFastClick from 'react-fastclick';

initReactFastClick();

render(<Test/>, document.querySelector('#App'));