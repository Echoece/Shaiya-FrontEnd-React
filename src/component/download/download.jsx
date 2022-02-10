import React, {Component} from 'react';
import download from './download.css'

class Download extends Component {
    render() {
        return (
            <div className={download.background}>
              Download page
                <div className="downloadContainer">
                    <div className="google">
                        google
                    </div>
                    <div className="mega">
                        mega
                    </div>
                </div>

            </div>
        );
    }
}

export default Download;