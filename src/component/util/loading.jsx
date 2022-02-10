import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color }) => <ReactLoading type={type}  color={color} height={'50%'} width={'30%'} />;

export default Loading;

/*
install    => npm i react-loading

type list  => blank, balls, bars, bubbles, cubes, cylon, spin, spinningBubbles, spokes
prop lists =>
                Name	    |   Type	    |   Default Value
                ----            -----           --------------
                type	    |   String	    |   balls
                color	    |   String	    |   #ffffff
                delay	    |   Number	    |   0 (msecs)
                height	    |   Number      |   or String	64 (px)
                width	    |   Number      |   or String	64 (px)
                className	|   String	    |   ''
*/