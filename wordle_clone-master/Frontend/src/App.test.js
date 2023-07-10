import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('Increases guess count when a letter is guessed', () => {
  render(<App />);
  
  fireEvent.change(screen.getByLabelText('Enter your name:'), { target: { value: 'John' } });
  fireEvent.click(screen.getByText('Start Game'));

  fireEvent.click(screen.getByText('A'));

  expect(screen.getByText(/Guesses: \d+/)).toBeInTheDocument();
});


test('Increases guess count when a letter is guessed', async () => {
  render(<App />);
  
  fireEvent.change(screen.getByLabelText('Enter your name:'), { target: { value: 'John' } });
  fireEvent.click(screen.getByText('Start Game'));

  fireEvent.click(screen.getByText('A'));

  const guessCountElement = await screen.findByText(/Guesses: \d+/);
  expect(guessCountElement).toBeInTheDocument();
});


