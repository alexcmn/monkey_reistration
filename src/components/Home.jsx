import React, { Component } from 'react'
import './Home.scss';
import PropTypes from 'prop-types';
import {
    setTranslations,
    setDefaultLanguage,
    setLanguageCookie,
    setLanguage,
    translate,
} from 'react-switch-lang';
import swal from 'sweetalert';
import eng from '../assets/translations/en.json';
import mne from '../assets/translations/mne.json';
import hr from '../assets/translations/hr.json';

import UserDetails from './steps/UserDetails';
import UserAddress from './steps/UserAddress';
import Confirm from './steps/Confirm';
import Stepper from './steps/Stepper';
import LangBtn from './utils/langBtn';
import AgreeModal from './utils/modal';

import Monkey1 from '../assets/img/monkey22.png';
import Monkey from '../assets/img/monkey1.png';
import Monkey2 from '../assets/img/monkey2.png';
import Monkey3 from '../assets/img/monkey3.png';
import Banana from '../assets/img/banana.png';

import { update, generateData, isFormValid } from './utils/form/formActions';

setTranslations({ eng, mne, hr });
setDefaultLanguage('eng');

setLanguageCookie();

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            step: 1,
            langOpen: false,
            agreeModalOpen: false,
            agreeTerms: false,
            nextLoad: false,
            submitLoad: false,
            isLoading: true,
            steps: [
                "steps.step1",
                "steps.step2",
                "steps.step3"
            ],
            formError: false,
            formSuccess: false,
            formdata: {
                name: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'fname',
                        type: 'text',
                        placeholder: 'form.input.name',
                        label: 'form.label.name'
                    },
                    validation: {
                        required: true,
                        minLength: 2,
                        maxLength: 25
                    },
                    dataType: 'string',
                    valid: true,
                    touched: true,
                    validationMessage: ''
                },
                lastname: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'lname',
                        type: 'text',
                        placeholder: 'form.input.lastname',
                        label: 'form.label.lastname'
                    },
                    validation: {
                        required: true,
                        minLength: 2,
                        maxLength: 25
                    },
                    dataType: 'string',
                    valid: true,
                    touched: true,
                    validationMessage: ''
                },
                email: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'email',
                        type: 'email',
                        placeholder: 'form.input.email',
                        label: 'form.label.email'
                    },
                    validation: {
                        required: true,
                        email: true
                    },
                    dataType: 'string',
                    valid: true,
                    touched: true,
                    validationMessage: ''
                },
                username: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'username',
                        type: 'text',
                        placeholder: 'form.input.username',
                        label: 'form.label.username'
                    },
                    validation: {
                        required: true,
                        minLength: 4,
                        maxLength: 20
                    },
                    dataType: 'string',
                    valid: true,
                    touched: true,
                    validationMessage: ''
                },
                password: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'password',
                        type: 'password',
                        placeholder: 'form.input.password',
                        label: 'form.label.password'
                    },
                    validation: {
                        required: true
                    },
                    dataType: 'string',
                    valid: true,
                    touched: true,
                    validationMessage: ''
                },
                confirmPassword: {
                    element: 'input',
                    value: '',
                    config: {
                        name: 'password_confirm',
                        type: 'password',
                        placeholder: 'form.input.confirmPassword',
                        label: 'form.label.confirmPassword'
                    },
                    validation: {
                        required: true,
                        confirm: 'password'
                    },
                    dataType: 'string',
                    valid: true,
                    touched: true,
                    validationMessage: ''
                }
            }
        }
    }

    nextStep = () => {
        const { step } = this.state;
        if (step <= 2) {
            this.setState({
                step: step + 1
            })
        }
    }

    prevStep = () => {
        const { step } = this.state;
        if (step > 1) {
            this.setState({
                step: step - 1
            })
        }
    }

    switchSteps = () => {
        const { step, agreeModalOpen, agreeTerms } = this.state;
        const { name, lastname, password, confirmPassword, email, username } = this.state.formdata;
        const values1 = { name, lastname, email };
        const values2 = { password, confirmPassword, username };
        const values = { name, lastname, password, email, username };
        const { t } = this.props;
        switch (step) {
            case 1:
                return <UserDetails
                    values={values1}
                    update={(element) => this.updateForm(element)}
                    t={t}
                    nextStep={this.nextStep}
                />
                break;
            case 2:
                return <UserAddress
                    values={values2}
                    update={(element) => this.updateForm(element)}
                    t={t}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                />
                break;
            case 3:
                return <Confirm
                    values={values}
                    t={t}
                    prevStep={this.prevStep}
                    toggleCheckbox={this.toggleCheckbox}
                    check={agreeTerms}
                    toggleModal={this.toggleModal}
                    handleSubmit={this.handleSubmit}
                />
        }
    }

    componentDidMount() {
        const { isLoading } = this.state;
        setTimeout(() => {
            this.setState({ isLoading: !isLoading })
        }, 2000)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata);
        const { t } = this.props;

        const promise = new Promise((fulfill, reject) => {
            setTimeout(function () {
                const newDataToSubmit = {
                    fields: { ...dataToSubmit },
                    info: {
                        success: true
                    }
                }
                fulfill(newDataToSubmit);
            }, 1000);
            setTimeout(function () {
                reject(
                    {
                        "info": {
                            success: false
                        }
                    }
                );
            }, 1000);
        })

        return promise.then((response) => {
            console.log(response)
            swal({
                title: t('modal.success.h1'),
                text: t('modal.success.p'),
                icon: 'success',
                buttons: t('buttons.close')
            })
            window.location.reload()
        }).catch((err) => {
            console.log(err)
            swal({
                title: t('modal.error.h1'),
                text: t('modal.error.p'),
                icon: 'error',
                buttons: t('buttons.close')
            })
        })
    }

    updateForm = (element) => {
        const { t } = this.props;
        const newFormdata = update(element, this.state.formdata, t);
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    toggleLang = () => {
        const { langOpen } = this.state;
        this.setState({
            langOpen: !langOpen
        });
    };


    changeLanguage = (key) => () => {
        setLanguage(key);
    }

    toggleModal = () => {
        const { agreeModalOpen } = this.state;
        this.setState({
            agreeModalOpen: !agreeModalOpen
        })
    }

    toggleCheckbox = () => {
        const { agreeTerms } = this.state;
        this.setState({
            agreeTerms: !agreeTerms
        })
    }

    render() {
        const { step, steps, langOpen, agreeModalOpen, agreeTerms, isLoading } = this.state;
        const { t } = this.props;
        return (
            <>
                {
                    isLoading ?
                        <div className="main-loading">
                            <div className="main">
                                <div className="box">
                                    <img src={Monkey1} alt=""/>
                                </div>
                                <div className="spin">
                                    <div className="wrapp">
                                        <img src={Banana} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={`registration ${step === 2 ? 'page-2' : ''} ${step === 3 ? 'page-3' : ''} ${agreeModalOpen ? 'modal-opened' : ''}`}>
                            {
                                step === 1 || step === 2 ?
                                    <div className={`monkey ${step === 2 ? 'monkey-2' : ''}`}>
                                        <div className="wrapp">
                                            <img src={step === 1 ? Monkey2 : Monkey3} alt="" />
                                        </div>
                                    </div>
                                    : ''

                            }
                            <div className="main">
                                <h1>{t('register')}</h1>
                                <div className="stepper">
                                    <Stepper steps={steps} currentStep={step} t={t} />
                                </div>
                                <form onSubmit={(event) => this.handleSubmit(event)}>
                                    {this.switchSteps()}
                                </form>
                            </div>
                            <LangBtn open={langOpen} openLang={this.toggleLang} changeLanguage={(key) => this.changeLanguage(key)} t={t} />
                            {
                                step === 3 ?
                                    <div className="monkey-3">
                                        <div className="wrapp">
                                            <img src={Monkey} alt="" />
                                        </div>
                                    </div>
                                    : ''
                            }
                            {
                                agreeModalOpen ?
                                    <div className="overlay"></div>
                                    : ''
                            }
                            <AgreeModal closeModal={this.toggleModal} open={agreeModalOpen}/>
                        </div>
                }
            </>
        )
    }
}

Home.propTypes = {
    t: PropTypes.func.isRequired,
};

export default translate(Home);