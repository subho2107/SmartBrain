import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
                {/*<div className='bounding-box'*/}
                {/*     style={{top: boxes[0].topRow, bottom: boxes[0].bottomRow, left: boxes[0].leftCol, right: boxes[0].rightCol}}>*/}
                {/*</div>*/}
                {/*<div className='bounding-box'*/}
                {/*     style={{top: boxes[1].topRow, bottom: boxes[1].bottomRow, left: boxes[1].leftCol, right: boxes[1].rightCol}}>*/}
                {/*</div>*/}
                {boxes.map((face, index)=>(
                    <div className='bounding-box' key={index}
                         style={{top: face.topRow, bottom: face.bottomRow, left: face.leftCol, right: face.rightCol}}>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default FaceRecognition;