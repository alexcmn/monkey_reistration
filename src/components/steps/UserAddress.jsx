import React, { Component } from 'react'
import { translate } from 'react-switch-lang';
import FormField from '../utils/form/formFields';
import { isFormValid } from '../utils/form/formActions';

class UserAddress extends Component {
    render() {
        const { values, update, nextStep, prevStep, t } = this.props;
        let formIsValid = isFormValid(values);
        return (
            <>
                <div className="form-group">
                    <FormField
                        id={'password'}
                        formdata={values.password}
                        change={(element) => update(element)}
                    />
                </div>
                <div className="form-group">
                    <FormField
                        id={'confirmPassword'}
                        formdata={values.confirmPassword}
                        change={(element) => update(element)}
                    />
                </div>
                <div className="form-group">
                    <FormField
                        id={'username'}
                        formdata={values.username}
                        change={(element) => update(element)}
                    />
                </div>
                <div className="footer">
                    <div className="wrapp">
                        <div className="btns">
                            <button className="prev" onClick={prevStep}>
                                {t('buttons.prev')}
                            </button>
                            <button className="next" onClick={nextStep} 
                            disabled={!formIsValid}
                            >
                                {t('buttons.next')}
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default translate(UserAddress);