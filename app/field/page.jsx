'use client'; 

import React, { useState } from 'react';
import SoccerLineUp from 'react-soccer-lineup';
import './field.css';
import PropTypes from 'prop-types';

// Sample home and away teams
const initialHomeTeam = {
  squad: {
    gk: { name: "John Doe", number: 1 },
    df: [{ name: "Defender 1", number: 4 }, { name: "Defender 2", number: 5 }],
    cm: [{ name: "Midfielder 1", number: 6 }],
    fw: [{ name: "Forward 1", number: 10 }, { name: "Forward 2", number: 9 }],
  },
  style: {
    color: "#f08080",
    numberColor: "#ffffff",
    nameColor: "#ffffff"
  }
};

const initialAwayTeam = {
  squad: {
    gk: { name: "Jane Smith", number: 13 },
    df: [{ name: "Defender A", number: 14 }, { name: "Defender B", number: 15 }],
    cm: [{ name: "Midfielder A", number: 8 }],
    fw: [{ name: "Forward A", number: 11 }, { name: "Forward B", number: 7 }],
  },
  style: {
    color: "#add8e6",
    numberColor: "#333333",
    nameColor: "#333333"
  }
};

// Main Example component
const Example = ({ size, color, pattern, homeTeam, awayTeam }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [clickedPlayer, setClickedPlayer] = useState(null); // State for clicked player

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setClickedPlayer(player); // Set the clicked player
    // playSound(); // Function to play sound

    // Remove the clicked class after a short duration
    setTimeout(() => {
      setClickedPlayer(null);
    }, 300); // Adjust duration as needed
  };

  const playSound = () => {
    const audio = new Audio('/path/to/sound-effect.mp3'); // Provide your audio file path
    audio.play();
  };

  const enhanceTeamWithClickHandlers = (team) => ({
    ...team,
    squad: {
      ...team.squad,
      gk: { ...team.squad.gk, onClick: () => handlePlayerClick(team.squad.gk) },
      df: team.squad.df.map(player => ({
        ...player,
        onClick: () => handlePlayerClick(player),
      })),
      cm: team.squad.cm.map(player => ({
        ...player,
        onClick: () => handlePlayerClick(player),
      })),
      fw: team.squad.fw.map(player => ({
        ...player,
        onClick: () => handlePlayerClick(player),
      })),
    }
  });

  return (
    <div className="soccer-lineup-container">
      <SoccerLineUp
        size={size}
        color={color}
        pattern={pattern}
        homeTeam={enhanceTeamWithClickHandlers(homeTeam)}
        awayTeam={enhanceTeamWithClickHandlers(awayTeam)}
      />
      {selectedPlayer && (
        <div className="player-info">
          <h3>Selected Player</h3>
          <p><strong>Name:</strong> {selectedPlayer.name}</p>
          <p><strong>Number:</strong> {selectedPlayer.number}</p>
          <p><strong>Color:</strong> {selectedPlayer.color || homeTeam.style.color}</p>
        </div>
      )}
      <style>
        {`
          .player {
            transition: transform 0.2s ease, background-color 0.3s ease;
          }
          .player.clicked {
            transform: scale(1.1);
            background-color: rgba(255, 255, 0, 0.5);
            border: 2px solid #ffcc00;
          }
        `}
      </style>
    </div>
  );  
};

// Default Props and Prop Types
Example.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  pattern: PropTypes.string,
  homeTeam: PropTypes.object,
  awayTeam: PropTypes.object,
};

Example.defaultProps = {
  size: "normal",
  color: "lightseagreen",
  pattern: "lines",
  homeTeam: initialHomeTeam,
  awayTeam: initialAwayTeam,
};

const App = () => {
  return (
    <div className="App">
      <Example />
    </div>
  );
};

export default App;
