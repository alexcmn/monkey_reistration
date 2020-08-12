import React, { Component } from 'react'
import { translate } from 'react-switch-lang';
import CheckBox from '../utils/checkbox';

class Confirm extends Component {
    render() {
        const { values, t, prevStep, toggleCheckbox, check, toggleModal, handleSubmit } = this.props;
        return (
            <>
                <div className="confirm">
                    <div className="confirmBx">
                        <h3>{t(values.name.config.label)}:</h3>
                        <p>{values.name.value}</p>
                    </div>
                    <div className="confirmBx">
                        <h3>{t(values.lastname.config.label)}:</h3>
                        <p>{values.lastname.value}</p>
                    </div>
                    <div className="confirmBx">
                        <h3>{t(values.password.config.label)}:</h3>
                        <p>{values.password.value}</p>
                    </div>
                    <div className="confirmBx">
                        <h3>{t(values.email.config.label)}:</h3>
                        <p>{values.email.value}</p>
                    </div>
                    <div className="confirmBx">
                        <h3>{t(values.username.config.label)}:</h3>
                        <p>{values.username.value}</p>
                    </div>
                </div>
                <div className="footer">
                    <div className="wrapp">
                        <div className="agree">
                            <CheckBox toggleCheckbox={toggleCheckbox} check={check}/>
                            <p onClick={toggleModal}>{t('terms')}</p>
                        </div>
                        <div className="btns">
                            <button className="prev" onClick={prevStep}>
                                {t('buttons.prev')}
                            </button>
                            <button className="next" onClick={handleSubmit}>
                                {t('buttons.submit')}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default translate(Confirm);