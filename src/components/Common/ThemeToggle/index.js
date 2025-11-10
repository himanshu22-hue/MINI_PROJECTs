import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './styles.css';

function ThemeToggle({ darkMode, toggleTheme }) {
  return (
    <IconButton
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label="toggle theme"
    >
      {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}