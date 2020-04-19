/* eslint-disable eqeqeq */
import React from 'react';
import './uploadFile.scss';

class UploadImage extends React.Component{

    constructor(props){
    
        super(props);
        this.state = {
            file: null,
            imagePreviewUrl: null,
            ftype: null,
            fileSize: null,
            fileuploadDate: null
        }
    }

    FetchData = () => {
        
    }
 
    notHandleSubmit = () => {
        alert('Sorry Please Enterd correct file type\nHint: [image type of file]');
    }

    handleimagechange = (event) => {
        
        
        this.setState({
            imagePreviewUrl : event.target.files[0],
            file: event.target.files[0],
            ftype: event.target.files[0].type,
            fileuploadDate: new Date().toString(),
            fileSize: (event.target.files[0].size / (1024 * 1024)).toFixed(2) + 'MB'
        });

        this.props.callMe(event.target.files[0].name);

        let reader = new FileReader();
        
        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });
        }
        
        reader.readAsDataURL( event.target.files[0]);

    }
            

    render(){

        const { imagePreviewUrl , ftype , fileuploadDate , fileSize } = this.state;

        let $imagePreview = (<div>Please select an Image for Preview</div>);
        let $smallImage = (<div>File small Preview</div>)
        let validate = null;

            if(ftype == 'video/mp4' || ftype == 'audio/mp3'){
                validate = false;
            }else{
                validate = true;
            }

            if (imagePreviewUrl && (ftype != 'video/mp4' || ftype != 'audio/mp3')) {
                
                $imagePreview = (<div className="image-container" ><img src={imagePreviewUrl} 
                alt={imagePreviewUrl} 
                width="100%"
                style={{ overflowY: 'hidden', height: 'auto' }} 
                /> 
                </div>);

                $smallImage = (<div className="image-container mt-3" ><img src={imagePreviewUrl} 
                alt={imagePreviewUrl}
                width="100%"
                style={{ overflowY: 'hidden', height: 'auto' }} 
                /> 
                </div>);

            } 

            
        return(
            <div className="row">
                <div className="col-md-3 col-lg-3 col-sm-12">
                                
                    <form onSubmit={this.FetchData} className="form" action = "http://localhost:5000/uploader" method = "POST" 
                    enctype = "multipart/form-data">
                        <div className="form-group">
                            <label htmlFor=""><b>Choose Your File</b></label>
                            <input type="file" id="image" name="img" onChange={(e) => this.handleimagechange(e)} accept="image/png, image/jpg, image/jpeg" required />
                        </div>
                        <div className="w-100 mt-2 mb-2 p-0 col-md-12 col-lg-12 col-sm-12">
                            <button 
                            className="btn btn-block btn-outline-primary btn-sm" type="submit"
                            onClick={validate ? this.handleSubmit : this.notHandleSubmit}
                            >
                                click submit
                            </button>
                        </div>
                    </form>
                    <br/><br/>
                    <div className="col-md-12 col-lg-12 col-sm-12 w-100 p-0">
                        <b>Entered Image File</b>: { validate 
                                                     ? $smallImage 
                                                     : $smallImage = (<div className="WrnogSelection">
                                                                        Ooops! Sorry! You Selected Wrong
                                                                     </div>) 
                                                    } 
                        <br/>
                        <b>File Type</b>: {ftype}
                        <br />
                        <b>File Size</b>: {fileSize}
                        <br />
                        <b>File Uploaded Time</b>: {fileuploadDate}
                        <br /><br />
                        <b>Detected Face</b>:
                    </div>

                </div>
                <div className="col-md-9 col-lg-9 col-sm-12 pl-5 pr-5 pb-4">
                    {
                        validate
                        ? $imagePreview
                        : $imagePreview = ( <div className="WrnogSelection">
                                            Ooops! Sorry! You Selected Wrong
                                          </div> )
                    }                               
                </div>

            </div>
        );
    }

}

export default UploadImage;