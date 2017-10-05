import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'
import './font-awesome-4.7.0/css/font-awesome.css'
import './FullScreenDialog.css';

function FullScreenDialogHeader(props){
    return (
        <div className="dialog-box-header-container">
            <h1>this.props.title</h1>
            <div className="dialog-box-header-buttons">
                <button
                    className="dialog-box-header-close-button"
                    onClick={() => this.props.closeFunc()}>
                    <i className="fa fa-times"></i>
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
        if(typeof this.props.submitFunc !== undefined){
            var args = [];
            if(this.props.prologueArgs !== undefined) args = this.props.prologueArgs;
            var index = args.length;

            if(typeof this.props.submitFuncDataSpec !== undefined){
                for(int i = 0; i < this.props.submitFuncDataSpec; i++){
                    var elem = document.getElementById(this.props.submitFuncDataSpec[i]);
                    if(elem !== null && elem !== undefined){
                        args[index++] = elem.value;
                    } else {
                        console.error("Problem with data spec in dialog submitData() function");
                    }
                }

                if(this.props.epilogueArgs !== undefined) args.push(this.props.prologueArgs);
                this.props.submitFunc.apply(this, args);
            } else {
                if(this.props.epilogueArgs !== undefined) args.push(this.props.prologueArgs);
                this.props.submitFunc.apply(this, args);
            }
        }
        this.closeDialog();
    }

    closeDialog() {
        this.destroy();
    }

    render(){
        return (
            <div className="full-screen-splash">
                <div className="dialog-box-container">
                    <FullScreenDialogHeader
                        title={this.props.title}
                        closeFunc={(this.props.closeFunc !== undefined) ? () => this.closeDialog() : undefined}/>
                    {(this.props.content !== undefined) ? this.props.content : ''}
                    <div className="dialog-box-submit-button-container">
                        <button
                            className="dialog-box-submit-button"
                            onClick={this.submitData()}
                    </div>
                </div>
            </div>
        );
    }
}

export default FullScreenDialog;
