import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './font-awesome-4.7.0/css/font-awesome.css'
import './FullScreenDialog.css';

function FullScreenDialogHeader(props){
    return (
        <div className="dialog-box-header-container">
            <h1>{(typeof props.title !== undefined && props.title) ? props.title : "Dialog"}</h1>
            <div className="dialog-box-header-button-container">
                <button
                    className="dialog-box-header-close-button"
                    onClick={() => props.closeFunc()}>
                    <i className="fa fa-times dialog-box-header-close-button-icons"></i>
                </button>
            </div>
        </div>
    );
}

// It is important to note that if you want the submit func to do anything more
// than close the dialog, you must pass props in the following format:
//
//     submitFunc():
//         Callable function passed as a prop to this component.
//     submitFuncDataSpec:
//         Array of document IDs for the components to obtain the values of to be
//         passed to your func.
//     [prologueArgs]:
//         Arguments to append to beginning of the args list defined by sumbitFuncDataSpec.
//     [epilogueArgs]:
//         Arguments to append to the end of args list defined by sumbitFuncDataSpecs.
class FullScreenDialog extends Component {

    submitData(){
        if(typeof this.props.submitFunc !== undefined && this.props.submitFunc){
            var args = [];
            if(this.props.prologueArgs !== undefined) args = this.props.prologueArgs;
            var index = args.length;

            if(typeof this.props.submitFuncDataSpec !== undefined && this.props.submitFuncDataSpec !== undefined){
                for(var i = 0; i < this.props.submitFuncDataSpec.length; i++){
                    var elem = document.getElementById(this.props.submitFuncDataSpec[i]);
                    if(elem !== null && elem !== undefined){
                        args[index++] = elem.value;
                    } else {
                        console.error("Problem with data spec, or form content, in dialog submitData() function");
                    }
                }

                if(this.props.epilogueArgs !== undefined) args = args.concat(this.props.epilogueArgs);
                this.props.submitFunc.apply(this, args);
            } else {
                if(this.props.epilogueArgs !== undefined) args = args.concat(this.props.epilogueArgs);
                this.props.submitFunc.apply(this, args);
            }
        } else {
            this.closeDialog();
        }
    }

    closeDialog() {
        if(typeof this.props.closeFunc !== undefined && this.props.closeFunc){
            this.props.closeFunc();
        }
        else{
            ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
        }
    }

    closeDialogSplash(event) {
        var splashDiv = document.getElementById('dialog-full-screen-splash');
        if(event.target === splashDiv){
            this.closeDialog();
        }
    }

    renderError(){
        var returnValue;
        if(typeof this.props.dialogError !== undefined && this.props.dialogError){
            returnValue = (
                <div>
                    <label className="dialog-error">{this.props.dialogError}</label>
                </div>
            )
        }
        return returnValue;
    }

    render(){
        return (
            <div
                className="full-screen-splash"
                id="dialog-full-screen-splash"
                onClick={(e) => this.closeDialogSplash(e)}>
                <div className="dialog-box-container">
                    <FullScreenDialogHeader
                        title={this.props.title}
                        closeFunc={(typeof this.props.closeFunc !== undefined && this.props.closeFunc) ? () => this.props.closeFunc() : () => this.closeDialog()}/>
                    <div className="dialog-box-content-container">
                        {(this.props.content !== undefined) ? this.props.content : ''}
                    </div>
                    <div className="dialog-error-container">
                        {this.renderError()}
                    </div>
                    <div className="dialog-box-submit-button-container">
                        <button
                            className="dialog-box-submit-button"
                            onClick={() => this.submitData()}>
                                Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FullScreenDialog;
