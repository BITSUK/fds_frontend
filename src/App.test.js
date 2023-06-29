import { render, screen } from '@testing-library/react';
import App from './App';


test('FDS Unit testing', () => {
  render(<App />);
  const linkElement = screen.getByTestId('app-1');
  expect(linkElement).toBeInTheDocument();
});

// test('render child component',()=>{
//   const componentApp = render(<App/>)
//  const childLogin = componentApp.getByLabelText('User Id')
//  expect(childLogin).toBeInTheDocument();
// })


