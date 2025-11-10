import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './styles.css';

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [open, setOpen] = useState(false);
  const [newHolding, setNewHolding] = useState({
    coin: '',
    quantity: '',
    purchasePrice: ''
  });

  useEffect(() => {
    const savedPortfolio = localStorage.getItem('cryptoPortfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  const handleAddHolding = () => {
    const holding = {
      ...newHolding,
      id: Date.now(),
      currentPrice: 0, // This would be updated with real-time data
      profitLoss: 0
    };
    
    const updatedPortfolio = [...portfolio, holding];
    setPortfolio(updatedPortfolio);
    localStorage.setItem('cryptoPortfolio', JSON.stringify(updatedPortfolio));
    setOpen(false);
    setNewHolding({ coin: '', quantity: '', purchasePrice: '' });
  };

  const calculateTotalValue = () => {
    return portfolio.reduce((total, holding) => {
      return total + (holding.quantity * holding.currentPrice);
    }, 0);
  };

  const calculateTotalProfitLoss = () => {
    return portfolio.reduce((total, holding) => {
      const invested = holding.quantity * holding.purchasePrice;
      const current = holding.quantity * holding.currentPrice;
      return total + (current - invested);
    }, 0);
  };

  return (
    <div className="portfolio-container">
      <div className="portfolio-header">
        <h2>My Portfolio</h2>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setOpen(true)}
        >
          Add Holding
        </Button>
      </div>

      <div className="portfolio-summary">
        <div className="summary-card">
          <h3>Total Value</h3>
          <p>${calculateTotalValue().toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Total Profit/Loss</h3>
          <p className={calculateTotalProfitLoss() >= 0 ? 'profit' : 'loss'}>
            ${Math.abs(calculateTotalProfitLoss()).toFixed(2)}
          </p>
        </div>
      </div>

      <TableContainer component={Paper} className="portfolio-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Purchase Price</TableCell>
              <TableCell align="right">Current Price</TableCell>
              <TableCell align="right">Total Value</TableCell>
              <TableCell align="right">Profit/Loss</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolio.map((holding) => (
              <TableRow key={holding.id}>
                <TableCell>{holding.coin}</TableCell>
                <TableCell align="right">{holding.quantity}</TableCell>
                <TableCell align="right">${holding.purchasePrice}</TableCell>
                <TableCell align="right">${holding.currentPrice}</TableCell>
                <TableCell align="right">
                  ${(holding.quantity * holding.currentPrice).toFixed(2)}
                </TableCell>
                <TableCell 
                  align="right"
                  className={holding.profitLoss >= 0 ? 'profit' : 'loss'}
                >
                  ${Math.abs(holding.profitLoss).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Holding</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Coin Name"
            fullWidth
            value={newHolding.coin}
            onChange={(e) => setNewHolding({...newHolding, coin: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={newHolding.quantity}
            onChange={(e) => setNewHolding({...newHolding, quantity: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Purchase Price"
            type="number"
            fullWidth
            value={newHolding.purchasePrice}
            onChange={(e) => setNewHolding({...newHolding, purchasePrice: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddHolding} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Portfolio;