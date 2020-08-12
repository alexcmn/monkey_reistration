import React, { Component } from 'react'
import { translate } from 'react-switch-lang';

class Stepper extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             steps:[]
        }
    }
    
    componentDidMount(){
        const { steps, currentStep } = this.props;
        const newSteps = steps.map((step, i) =>{
            const stepObj = {};
            stepObj.name = step;
            stepObj.completed = false;
            stepObj.active = i === 0 ? true : false;
            stepObj.selected = i === 0 ? true : false;
            return stepObj;
        })

        const current = this.updateStep(currentStep-1, newSteps);

        this.setState({
            steps: current
        })
    }

    componentDidUpdate(prevProps){
        // console.log(this.props.currentStep)
        if(prevProps.currentStep !== this.props.currentStep){
            const { steps } = this.state;
            const current = this.updateStep(this.props.currentStep - 1, steps);

            this.setState({
                steps: current
            })
        }
    }

    updateStep = (stepNumb, steps) =>{
        const newSteps = [...steps];
        let count = 0;

        while(count < newSteps.length){
            if(count === stepNumb){
                newSteps[count] = {
                    ...newSteps[count],
                    active: true,
                    selected: true,
                    completed: false,
                }
                count++
            }else if(count < stepNumb){
                newSteps[count] = {
                    ...newSteps[count],
                    active: false,
                    selected: true,
                    completed: true,
                }
                count++
            }else{
                newSteps[count] = {
                    ...newSteps[count],
                    active: false,
                    selected: false,
                    completed: false,
                }
                count++
            }
        }
        return newSteps
    }
    
    render() {
        const { steps } = this.state;
        const { t } = this.props;
        const showSteps = steps.map((step, i) => {
            return (
                <div className="stepper-wrapp" key={i}>
                    <div className={`numb ${step.selected ? 'active' : 'disabled'}`}>{step.completed ? <span>&#10003;</span> : i + 1}</div>
                    <div className={`desc ${step.active ? 'active' : 'disabled'}`}>{t(step.name)}</div>
                    <div className={i !== steps.length - 1 ? 'line' : ''}/>
                </div>
            )
        }) 
        return (
            <>
                {showSteps}
            </>
        )
    }
}


export default translate(Stepper);