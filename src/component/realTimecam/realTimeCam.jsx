import React from 'react';
import './realTimeCam.scss';
import axios from 'axios';


class RealTimeCamera extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            value: 'Face Detect By Cam'
        };
    }

    openCam = () => {
        const data = { name: this.state.value }
        
        axios.post('http://127.0.0.1:5000/api/openCam', data, {
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(res => { console.log(res.data); })
        .catch( err => console.log(err) )

    };

    render(){

        return(
            <div className="container-fluid mb-4 realCam">
                <div className="row">

                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <h4>Real Time Camera Detection: </h4>
                        <div className="button text-center">
                            <button className="btn btn-outline-primary" onClick={this.openCam}>Click To Open</button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default RealTimeCamera;