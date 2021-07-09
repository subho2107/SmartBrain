import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const particleOptions = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};
const initialState = {
    input: '',
    imageUrl: '',
    boxes: [],
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}
class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }
    convertPosition = (data) =>{
        const clarifaiFace = data.region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
        }
    }
    calculateFaceLocation = (data) => {
        const positions = data.outputs[0].data.regions.map(this.convertPosition);
        return positions;
    }


    displayFaceBox = (boxes) => {
        this.setState({boxes: boxes});
    }
    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }
    onInputChangeImg = (event) => {
        this.setState({input: event})
    }

    onButtonSubmit = () => {
        const herokuLink = 'mysterious-temple-49161.herokuapp.com';
        // const localHost = 'localhost:3000';
        this.setState({imageUrl: this.state.input});
        fetch(`https://${herokuLink}/imageUrl`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch(`https://${herokuLink}/image`, {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                                    const userDup = {...this.state.user};
                                    userDup.entries = count;
                                    this.setState({user:userDup});
                        })
                        .catch(console.log)

                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }
    makeInitialState = () =>{
        this.setState(initialState)
    }
    onRouteChange = (route) => {
        if (route === 'home') {
            this.setState({isSignedIn: true})
        } else if (route === 'signout') {
            this.setState(initialState)
        }
        this.setState({route: route})
    }

    render() {
        const {isSignedIn, imageUrl, boxes, route} = this.state;
        return (
            <div className="App">
                <Particles className='particles' params={particleOptions}/>
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                {route === 'home'
                    ? <div>
                        <Logo/>
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onButtonSubmit={this.onButtonSubmit}
                            onInputChangeImg={this.onInputChangeImg}
                            makeInitialState = {this.makeInitialState}
                        />
                        <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
                    </div>
                    : (
                        route === 'signin'
                        ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
                }
            </div>
        );
    }
}

export default App;
