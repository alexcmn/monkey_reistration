import React from 'react'
import { translate, t } from 'react-switch-lang';

const modal = ({ closeModal, open }) => {

    return (
        <div className={`modal ${open ? 'opened' : 'closed'}`}>
            <h1>{t('terms')}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, similique. Molestiae inventore cum quibusdam earum eligendi excepturi iure, illo sequi, fuga hic nemo dignissimos fugit exercitationem consequatur, ratione voluptas aspernatur?</p>
            <button onClick={closeModal}>{t('buttons.close')}</button>
        </div>
    )
}

export default translate(modal);
