import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
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