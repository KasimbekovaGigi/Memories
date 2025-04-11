const fetchMock = require('jest-fetch-mock');
fetchMock.enableMocks();

document.body.innerHTML = `
  <div class="wrapper">
    <form class="login hidden">
      <input class="login-username" type="text" placeholder="Username" required>
      <input class="login-password" type="password" placeholder="Password" required>
      <button id="login-btn" class="btn">Login</button>
    </form>
    <form class="reg hidden">
      <input class="reg-username" type="text" placeholder="Username" required>
      <input class="reg-email" type="email" placeholder="Email" required>
      <input class="reg-password" type="password" placeholder="Password" required>
      <input class="reg-confirm-password" type="password" placeholder="Confirm Password" required>
      <button id="reg-btn" class="btn">Register</button>
    </form>
    <form class="forgot hidden">
      <input class="forgot-input" type="email" placeholder="Enter your registered email" required>
      <button id="forgot-btn" class="btn">Reset Password</button>
    </form>
    <a id="login-link" href="#">Login</a>
    <div class="register-link">
      <a href="#">Register</a>
    </div>
    <a id="forgot-link" href="#">Forgot Password?</a>
  </div>
`;

require('../js/login.js');

describe('Auth Section Tests', () => {
  let alertMock;
  let locationMock;

  beforeAll(() => {
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    locationMock = jest.spyOn(window, 'location', 'get').mockReturnValue({
      href: '',
      assign: jest.fn(),
    });
  });

  afterAll(() => {
    alertMock.mockRestore();
    locationMock.mockRestore();
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('Login form submission triggers fetch and navigates on success', async () => {
    const loginButton = document.getElementById('login-btn');
    const usernameInput = document.querySelector('.login-username');
    const passwordInput = document.querySelector('.login-password');

    usernameInput.value = 'testuser';
    passwordInput.value = 'testpassword';

    fetchMock.mockResponseOnce(
      JSON.stringify({ message: 'Login successful', token: 'testtoken' })
    );

    loginButton.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
    });

    expect(localStorage.getItem('authToken')).toBe('testtoken');
    expect(alertMock).toHaveBeenCalledWith('Login successful!');
  });

  test('Registration form submission with matching passwords triggers fetch', async () => {
    const regButton = document.getElementById('reg-btn');
    const usernameInput = document.querySelector('.reg-username');
    const emailInput = document.querySelector('.reg-email');
    const passwordInput = document.querySelector('.reg-password');
    const confirmPasswordInput = document.querySelector(
      '.reg-confirm-password'
    );

    usernameInput.value = 'newuser';
    emailInput.value = 'newuser@example.com';
    passwordInput.value = 'newpassword';
    confirmPasswordInput.value = 'newpassword';

    fetchMock.mockResponseOnce(
      JSON.stringify({ message: 'Registration successful' })
    );

    regButton.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:5000/api/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'newpassword',
        }),
      }
    );

    expect(alertMock).toHaveBeenCalledWith('Registration successful!');
  });

  test('Forgot password form submission triggers fetch', async () => {
    const forgotButton = document.getElementById('forgot-btn');
    const emailInput = document.querySelector('.forgot-input');

    emailInput.value = 'test@example.com';

    fetchMock.mockResponseOnce(
      JSON.stringify({ message: 'Check your inbox to reset your password' })
    );

    forgotButton.click();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:5000/api/forgot-password',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      }
    );

    expect(alertMock).toHaveBeenCalledWith(
      'Check your inbox to reset your password!'
    );
  });
});
