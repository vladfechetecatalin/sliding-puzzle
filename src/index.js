require("../styles/application.scss");
require("../styles/mixins.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game/Game';

ReactDOM.render(
    <div className="app">
        <Game />
        <div className="footer">
            Vlad Fechete - fechetevladcatalin@gmail.com
        </div>
    </div>,
    document.getElementById('react-root')
);
