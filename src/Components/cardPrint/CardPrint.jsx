import React, { useRef } from 'react';
import './card.css';

const CardPrint = ({ name, memberId, imgs, memberType , keyin}) => {
    const iframeRef = useRef();

    const handlePrint = () => {
        const iframe = iframeRef.current;
        const doc = iframe.contentWindow.document;

        console.log(name);
        const cardHtml = getCardHTML(name, memberId, imgs, memberType);

        doc.open();
        doc.write(cardHtml);
        doc.close();

        iframe.onload = () => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };
    }; 
    return (
        <div key={keyin} style={{ padding: '1rem', border: '1px solid #ccc' }} className='border rounded rounded-3 text-start'>
            <h3>Member Card</h3>
            <ol dir='ltr' style={{textAlign: 'left'}}> 

                <li>options {'>'} printer {'('}Destination{')'} {'>'} MagicCard Rio Pro 360</li>
                <li>additional options {'>'} margine {'>'} none</li>
                <li>options {'>'} orintaion {'>'} portrait</li>
                <li>options {'>'} card type {'>'} cr80</li>
            </ol>
            <button onClick={handlePrint} className='btn btn-success'>Print</button>
            <div style={{ display: 'none' }}>
                <iframe ref={iframeRef} id="printFrame" title="Print Frame" key={keyin} />
            </div>
        </div>
    );
};

// Template function (reuse your card HTML with data injected)
const getCardHTML = (name, memberId, imgs, memberType=false) => `
<!DOCTYPE html>
<html lang="en" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>HUC Card</title>
    <link rel="stylesheet" href="/ClubCard/card.css" />
    <link rel="icon" href="/ClubCard/Logos/logo.PNG" />
  </head>
  <body style="display: flex; flex-direction: column;">
    <div class="containerF">
      <div class="logo" style=" display:flex; justify-content: end;">
        <img src="/ClubCard/Logos/logo.PNG" alt="HUC Logo" />
      </div>
      <div class="header">
        <h1>HUC</h1>
      </div>
      <div class="photo">
        <img src="${imgs}" alt="Member Photo" />
      </div>
      <div class="body" dir="rtl">
        <div class="id">
          <h4>${memberId}</h4>
        </div>
        <div class="info" style="display:flex; flex-direction: column; justify-content: space-between; align-items: flex-start;">
          <div class="name" dir="rtl" style="width:fit-content; display:flex; flex-direction: row; justify-content: center; align-items: center;"> 
            <span class="title">الإسم:</span>
            <span class="value" style="font-size: x-small;">${name}</span>
          </div>
          <div class="membership" dir="rtl">
            <span class="title">نوع العضوية:</span>
            <span class="value">${memberType ? 'عضو عامل' : 'عضو تابع'}</span>
          </div>
        </div>
        <div class="extra" dir="rtl" style=" display:flex; flex-direction: column; justify-content: space-between; align-items: flex-start;">
          <div class="director" dir="rtl">
            <span class="title">رئيس مجلس الإدارة:</span>
            <p class="value">أمير محمد السيد</p>
          </div>
        </div>
        <div class="year">
          <h4>2025</h4>
        </div>
      </div>
    </div>
    <div class="containerF containerBack">
      <div class="head">
        <div class="logoBack">
          <img src="/ClubCard/Logos/logoBack.svg" alt="HUC Logo" class="logoBackImage" />
        </div>
      </div>
      <div class="body">
        <div class="yearBack">
          <h4>2025</h4>
        </div>
      </div>
    </div>
  </body>
</html>
`;

export default CardPrint;
