import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import playbtn from '../../assets/svgs/playbtn.svg';
import mutebtn from '../../assets/svgs/mute-btn.svg';
import useSound from 'use-sound';
import boopSfx from './music.mp3';

const MusicPlayerContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MusicPlayerTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`;

const MusicControls = styled.div`
  display: flex;
  gap: 1rem;
`;

const ControlButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

function MusicPlay() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [play, { stop }] = useSound(boopSfx, { 
    loop: true,
    volume: 0.3
  });

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    play(); // Start music on mount
    return () => stop(); // Stop music when unmounting
  }, [play, stop]);

  useEffect(() => {
    const checkLocation = () => {
      const musicElement = document.getElementById('music-play');
      if (!musicElement || !musicElement.getBoundingClientRect().top) {
        stop();
        setIsPlaying(false);
      }
    };

    window.addEventListener('scroll', checkLocation);
    window.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stop();
        setIsPlaying(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', checkLocation);
    };
  }, [stop]);

  return (
    <MusicPlayerContainer>
      <MusicPlayerTitle id='music-play'>Music</MusicPlayerTitle>
      <MusicControls>
        <ControlButton onClick={togglePlay}>
          <img src={isPlaying ? mutebtn : playbtn} alt={isPlaying ? "Mute" : "Play"} />
        </ControlButton>
      </MusicControls>
    </MusicPlayerContainer>
  );
}

export default MusicPlay;
