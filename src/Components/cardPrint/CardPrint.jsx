import React, { useRef } from 'react';
import './card.css';

const CardPrint = ({ name, memberId }) => {
    const iframeRef = useRef();

    const handlePrint = () => {
        const iframe = iframeRef.current;
        const doc = iframe.contentWindow.document;

        const cardHtml = getCardHTML(name, memberId);

        doc.open();
        doc.write(cardHtml);
        doc.close();

        iframe.onload = () => {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        };
    };

    return (
        <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
            <h3>Member Card</h3>
            <button onClick={handlePrint}>Print Card</button>
            <div style={{ display: 'none' }}>
                <iframe ref={iframeRef} id="printFrame" title="Print Frame" />
            </div>
        </div>
    );
};

// Template function (reuse your card HTML with data injected)
const getCardHTML = (name, memberId) => `
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
      <div class="logo">
        <img src="/ClubCard/Logos/logo.PNG" alt="HUC Logo" />
      </div>
      <div class="header">
        <h1>HUC</h1>
      </div>
      <div class="photo">
        <img src="/ClubCard/Logos/avatar.jpeg" alt="Member Photo" />
      </div>
      <div class="body">
        <div class="id">
          <h4>${memberId}</h4>
        </div>
        <div class="info">
          <div class="name">
            <span class="title">الإسم:</span>
            <span class="value">${name}</span>
          </div>
          <div class="membership">
            <span class="title">نوع العضوية:</span>
            <span class="value">عضو تابع</span>
          </div>
        </div>
        <div class="extra">
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
