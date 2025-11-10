import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import './styles.css';

function PriceAlert({ coinId, currentPrice }) {
    const [targetPrice, setTargetPrice] = useState('');
    const [alerts, setAlerts] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSetAlert = () => {
        if (!targetPrice) return;

        const newAlert = {
            coinId,
            targetPrice: parseFloat(targetPrice),
            currentPrice: parseFloat(currentPrice),
            timestamp: new Date().getTime()
        };

        setAlerts([...alerts, newAlert]);
        setTargetPrice('');
        setOpenSnackbar(true);

        // In a real app, you would set up a websocket or polling mechanism here
        checkPrice(newAlert);
    };

    const checkPrice = (alert) => {
        // Mock implementation - in real app, this would be connected to real-time price updates
        const interval = setInterval(() => {
            if (alert.targetPrice > alert.currentPrice) {
                if (currentPrice >= alert.targetPrice) {
                    notifyUser(`${coinId} has reached your target price of $${alert.targetPrice}!`);
                    clearInterval(interval);
                }
            } else {
                if (currentPrice <= alert.targetPrice) {
                    notifyUser(`${coinId} has reached your target price of $${alert.targetPrice}!`);
                    clearInterval(interval);
                }
            }
        }, 10000);
    };

    const notifyUser = (message) => {
        if (Notification.permission === 'granted') {
            new Notification('Crypto Price Alert', { body: message });
        }
    };

    return (
        <div className="price-alert-container">
            <div className="price-alert-input">
                <TextField
                    label="Target Price"
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <Button
                    variant="contained"
                    onClick={handleSetAlert}
                    startIcon={<NotificationsActiveIcon />}
                >
                    Set Alert
                </Button>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert severity="success">Price alert set successfully!</Alert>
            </Snackbar>
        </div>
    );
}

export default PriceAlert;