import React from 'react';
import Webcam from "react-webcam";
import '../TakePic.css';
// import Modal from "react-bootstrap/Modal";
// import "bootstrap/dist/css/bootstrap.min.css";
class TakePic extends React.Component {
    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.props.func(imageSrc);
    };
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };
    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };
        const webcam =  <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
        />;
        return (
                <div className="model" id="model">
                    <div className="content">
                        {webcam}
                    </div>
                    <div className="actions">
                        <button onClick={this.capture} className="toggle-button">Capture photo</button>
                        <button
                            onClose={e => {
                                this.onClose(e);
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
        );
    }
}
export default TakePic;
