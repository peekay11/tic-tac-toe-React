import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { HeaderWrapper, LightModeIcon, DarkModeIcon } from './Header.styled';
import Logo from '../../assets/svgs/logo.svg?react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogo = styled(Logo)`
  path {
    fill: ${props => props.theme.colors.text};
  }
`;

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <StyledLogo className="logo" width="48" onClick={() => navigate("./")} />
      {theme === 'dark' ? (
        <LightModeIcon onClick={toggleTheme} />
      ) : (
        <DarkModeIcon onClick={toggleTheme} />
      )}
    </HeaderWrapper>
  );
}
