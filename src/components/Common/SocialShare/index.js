import React from 'react';
import {
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon
} from 'react-share';
import './styles.css';

function SocialShare({ coinData }) {
    const shareUrl = window.location.href;
    const title = `Check out ${coinData.name} (${coinData.symbol.toUpperCase()}) price and market data!`;
    const message = `Current Price: $${coinData.current_price}\nMarket Cap: $${coinData.market_cap}\n24h Change: ${coinData.price_change_percentage_24h}%`;

    return (
        <div className="social-share-container">
            <h3>Share with friends</h3>
            <div className="social-buttons">
                <TwitterShareButton url={shareUrl} title={title}>
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

                <WhatsappShareButton url={shareUrl} title={title + '\n' + message}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <TelegramShareButton url={shareUrl} title={title}>
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </div>
        </div>
    );
}

export default SocialShare;