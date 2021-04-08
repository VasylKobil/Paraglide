import React, {useState} from 'react';
import './Input.css';
import Data from "../../services/request";

function Input(props){
    const [showContent, setShowContent] = useState(true);
    const [value, setValue] = useState('');

    const submit = () => {
        const promise = Data.reqData(value);
        promise.then((data) => {
            props.parentCallBack(data);
            setShowContent(false);
        });
    }

    return(
        <>
            <div className="container" style={{display: showContent ? 'block' : 'none'}}>
                <div className="form">
                    <h2>Please pass link to file format IGC:</h2>
                    <input placeholder="Your link..." value={value} onChange={e => setValue(e.target.value)}/>
                    <button onClick={submit}>Submit</button>
                </div>
            </div>
        </>

    )
}

export default Input;