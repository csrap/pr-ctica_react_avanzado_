import { fireEvent, render } from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  test('call onLogin', () => {
    const { container } = render(<LoginPage onLogin={() => { }} />);
    expect(container).toMatchSnapshot();
  });

});