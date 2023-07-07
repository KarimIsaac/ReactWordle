import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('starts the game when the Start Game button is clicked', () => {
  render(<App />);
  const startButton = screen.getByText('Start Game');
  fireEvent.click(startButton);
  expect(screen.getByText('Guesses: 0')).toBeInTheDocument();
});


  test('displays the hint when the game is not started', () => {
    render(<App />);
    expect(screen.getByText('The words : karim, david, johan')).toBeInTheDocument();
  });

  test('allows entering player name', () => {
    render(<App />);
    const nameInput = screen.getByLabelText('Enter your name:');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput.value).toBe('John');
  });

  test('increments the guess count when a guess is made', () => {
    render(<App />);
    const startButton = screen.getByText('Start Game');
    fireEvent.click(startButton);
    const letterButtons = screen.getAllByRole('button', { name: /letter/i });
    fireEvent.click(letterButtons[0]); // Make a guess
    expect(screen.getByText('Guesses: 1')).toBeInTheDocument();
  });

  

