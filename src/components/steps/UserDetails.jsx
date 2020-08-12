import React, { Component } from 'react'
import { translate } from 'react-switch-lang';
import FormField from '../utils/form/formFields';
import { isFormValid } from '../utils/form/formActions';

class UserDetails extends Component {

    render() {
        const { values, update, t, nextStep } = this.props;
        let formIsValid = isFormValid(values);
        return (
            <>
                <div className="form-group">
                    <FormField
                        id={'name'}
                        formdata={values.name}
                        change={(element) => update(element)}
                        t={t}
                    />
                </div>
                <div className="form-group">
                    <FormField
                        id={'lastname'}
                        formdata={values.lastname}
                        change={(element) => update(element)}
                        t={t}
                    />
                </div>
                <div className="form-group">
                    <FormField
                        id={'email'}
                        formdata={values.email}
                        change={(element) => update(element)}
                        t={t}
                    />
                </div>
                <div className="footer">
                    <div className="wrapp">
                        <div className="btns">
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

export default translate(UserDetails);