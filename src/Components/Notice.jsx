import React, { useContext, useRef, useEffect } from 'react';
import { LanguageContext } from './../context/LanguageProvider.context';
import lang from './../assets/lang/language';
import {Modal} from 'bootstrap';

const Notice = (props) => {
    const { language } = useContext(LanguageContext);
    const langs = lang[language];
    const modalRef = useRef(null);
    const modalOpenRef = useRef(null);

    useEffect(() => {
        if (!props.hasPaid && modalRef.current && props.role !== 'staff') {
            const modalCurr = modalRef.current;
            const modal = new Modal(modalCurr);
            modalOpenRef.current = modal;
            modal.show();

            // Auto-close after 2 minutes
            const timeoutId = setTimeout(() => {
                modal.hide();
            }, 120000);

            const handleHidden = () => {
                document.body.classList.remove('modal-open');
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) {
                    backdrop.remove();
                }
            }

            modalCurr.addEventListener('hidden.bs.modal', handleHidden);

            return () => {
                clearTimeout(timeoutId);
                modalCurr.removeEventListener('hidden.bs.modal', handleHidden);
            }
        }
    }, [props.hasPaid]);

    return (
        <div dir={langs.direction} className="text-center">
        

        <div
            className="modal fade"
            id="notice"
            tabIndex="-1"
            aria-hidden="true"
            ref={modalRef}
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
                </div>
                <div className="modal-body">
                <div className="message fs-5">
                    <h2>{langs.dear} {props.name}</h2>
                    <h5>{langs.welcome}</h5>
                    <br />
                    <p>
                    {langs.pay} <b>{props.cost} {langs.currency}</b> {langs.form}{' '}
                    <span style={{ color: '#1f3d7a' }}>{langs.destination}</span>{' '}
                    <span className="d-block fs-6">
                        google maps (
                        <span style={{ color: '#1f3d7a' }}>
                        https://maps.app.goo.gl/qUKnQezby97wfd6y9
                        </span>
                        )
                    </span>{' '}
                    {langs.messageEnd}
                    </p>
                    <p>{langs.gratitude}</p>
                    <br />
                    <p>{langs.regards}</p>
                    <h5>{langs.HUC}</h5>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

export default Notice;
