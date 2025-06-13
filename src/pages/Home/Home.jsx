import React, { useContext } from "react";
import { Container, Subtitle, Title } from "../../styles/General.styled";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../contexts/ThemeContext";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Container>
      {/* Optional: Uncomment if Header is in use */}
      {/* <Header /> */}

      <Title>Tic Tac Toe</Title>
      <Subtitle>Play with your friends, higher score wins</Subtitle>
      <Button onClick={() => navigate("/game-on")}>Play Now</Button>
    </Container>
  );
}
