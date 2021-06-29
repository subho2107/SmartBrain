import React, {useState} from 'react';
import './ImageLinkForm.css';
import TakePic from "../TakePic";
const ImageLinkForm = ({onInputChange, onButtonSubmit, onInputChangeImg})=>{
	const [showCam, setCam] = useState(false)
	const toggleCam = () =>{
		setCam(!showCam)
	}
	const func = (imgLink) =>{
		onInputChangeImg(imgLink);
		onButtonSubmit();
	}
	return(
		<div>
			<p className = 'f3'>
				{'this Magic brain will detect faces in your picture. Give it a go!'}
			</p>
			<div className = 'center'>
				<div className = 'form center pa3 br3 shadow-5 flex-column'>
					<div className='flex-row'>
                        <input className = 'f4 pa2 w-70 center' type='tex' onChange = {onInputChange}/>
                        <button onClick = {onButtonSubmit} className = 'w-30 grow f4 link ph3 pv2 div white bg-light-purple'>Detect</button>
					</div>
					<h3>OR</h3>
					{showCam===false?<button className='w-30 grow f4 link ph3 pv2 div white bg-light-purple center'
							 onClick={() => setCam(!showCam)}>Take a picture</button>:<button className='w-30 grow f4 link ph3 pv2 div white bg-light-purple center' onClick={()=>setCam(!showCam)}>Close</button>}
				</div>
				{showCam === true?<TakePic func={func} onClose={toggleCam}/>:null}
			</div>
		</div>
		);
}
export default ImageLinkForm;