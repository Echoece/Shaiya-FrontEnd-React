import React, {Component} from 'react';
import CarousalSlider from "./carousal/carousal";
import ServerInfo from "./serverInfo/serverInfo";

import './home.css';
import pandaImage from '../../assets/panda.png';


class Home extends Component {
    render() {
        return (
            <div className='homeContainer'>
                <CarousalSlider/>
                <div className="d-flex m-5 ">
                    <div className='container col-8  bg-secondary'>
                        <img src={pandaImage} alt="" className="panda_image"/>
                        <div>
                            news
                        </div>
                    </div>
                    <div className='col-3 container bg-secondary'>
                        <ServerInfo/>

                        <div className="time">
                            Server date : 16 jan 2021 <br/>
                            Server time: 17:46
                        </div>

                        <div className="boss-wrapper ">
                            <div className="bosses bg-secondary">
                                <div  className="boss">
							<pre>
Secreta         Some players        2hour
                        </pre
                        >
                                </div>
                                <div  className="boss">
							<pre>
Secreta         Some players        2hour
                         </pre
                         >
                                </div>
                                <div  className="boss">
							<pre>
Secreta         Some players        2hour
                        </pre
                        >
                                </div>
                                <div  className="boss">
							<pre>
Secreta         Some players        2hour
                        </pre
                        >
                                </div>
                                <div  className="boss">
							<pre>
Secreta         Some players        2hour
                        </pre
                        >
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Home;