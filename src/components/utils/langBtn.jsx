import React, { Component } from 'react'
import { translate } from 'react-switch-lang';
import Eng from '../../assets/img/icons/eng.png';
import Mne from '../../assets/img/icons/mne.png';
import Hr from '../../assets/img/icons/hr.png';
import Lang from '../../assets/img/icons/lang';

class langBtn extends Component {
    render() {
        const { open, openLang, changeLanguage, t } = this.props;
        return (
            <div className={`language-btn ${open ? 'active' : ''}`} onClick={openLang}>
                <span>
                    <Lang />
                </span>
                <ul>
                    <li onClick={changeLanguage('eng')}>
                        <img src={Eng} alt="" />{t('langEn')}
                    </li>
                    <li onClick={changeLanguage('mne')}>
                        <img src={Mne} alt="" />{t('langMne')}
                    </li>
                    <li onClick={changeLanguage('hr')}>
                        <img src={Hr} alt="" />{t('langHr')}
                    </li>
                </ul>
            </div>
        )
    }
}

export default translate(langBtn);