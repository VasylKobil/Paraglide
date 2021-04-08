import React from 'react';
import './Main.css';
import Input from "../Input/Input";
import Moment from "moment";

class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            pilotName: '',
            compeClass: '',
            dataEvent: '',
            modelParag: '',
            registration: '',
            timeStartFli: '',
            timeFinishFli: '',
            timeTotalFli: ''
        }
        this.getData = this.getData.bind(this);
        this.calcTotalTime = this.calcTotalTime.bind(this);
        this.comeBack = this.comeBack.bind(this);
    }

    comeBack(){
        window.location.href='http://localhost:3000/';
        this.setState({
            data: ''
        })
    }

    async getData (data){
        await this.setState({
            data: data,
            pilotName: data.pilot ?? 'No information',
            compeClass: data.competitionClass ?? 'No information',
            modelParag: data.gliderType ?? 'No information',
            dataEvent: data.date ?? 'No information',
            registration: data.registration ?? 'No information',
            timeStartFli: data.fixes[0].time ?? 'No information',
            timeFinishFli: data.fixes[data.fixes.length - 1].time ?? 'No information'
        })
        this.calcTotalTime();
    }
    calcTotalTime(){
        const data = this.state.data;
        const startTime=Moment(data.fixes[0].time, "HH:mm:ss");
        const endTime=Moment(data.fixes[data.fixes.length - 1].time, "HH:mm:ss");
        const duration = Moment.duration(endTime.diff(startTime));
        const hours = parseInt(duration.asHours());
        const minutes = parseInt(duration.asMinutes())-hours*60;
        this.setState({
            timeTotalFli: `${hours}:${minutes}` ?? 'No information'
        })
    }


    render(){
        const {pilotName, compeClass, dataEvent, registration, timeStartFli, timeFinishFli, timeTotalFli, modelParag} = this.state
        return(
            <>
                <Input parentCallBack = {this.getData}/>
                <div className="inf" style={{display: this.state.data ? 'block' : 'none'}}>
                    <div className='Person'>
                        <h2>Flight Information:</h2>
                        <ul>
                            <li>Pilot Name: {pilotName}</li>
                            <li>Flight date: {dataEvent}</li>
                            <li>Class: {compeClass}</li>
                            <li>Paraglide model: {modelParag}</li>
                            <li>Registration: {registration}</li>
                            <li>Start Time: {timeStartFli}</li>
                            <li>Finish Time: {timeFinishFli}</li>
                            <li>Total Time: {timeTotalFli}</li>
                        </ul>
                    </div>
                    <div>
                        <button className="btn back" onClick={this.comeBack}>BACK</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Main;