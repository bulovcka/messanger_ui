import { test,vi,expect, afterEach } from "vitest"
import {render, screen, cleanup, waitFor} from "@testing-library/react"
import { LoginPage } from "./LoginPage"
import userEvent from "@testing-library/user-event"

afterEach(cleanup);

const setup = () => {
    const onLoginSuccesMock = vi.fn();
    const onGoToRegisterMock= vi.fn();
    const user = userEvent.setup();
    render(<LoginPage onGoToRegister={onGoToRegisterMock} onLoginSuccess={onLoginSuccesMock}/>);

    return {
        onGoToRegisterMock,
        onLoginSuccesMock,
        user
    }
}

test('Пустая форма показывает ошибку имени и не вызывает вход', async () => {
    //подготовка
    const {onLoginSuccesMock, user} = setup();
    //действие

    const loginButton = screen.getByRole('button', {name: 'Log in'});
    await user.click(loginButton);
    //проверка
    const msg = screen.getByText("Enter your username");
    expect(msg).toBeTruthy();
    expect(onLoginSuccesMock).not.toHaveBeenCalled();
});

test("Пустая форма пароля показывает ошибку пароля и не вызывает вход", async () => {
    // Подготовка
    const {onLoginSuccesMock, user} = setup();
    // Действие
    const loginButton = screen.getByRole("button", {name: "Log in"});
    const usernameInput = screen.getByLabelText('Username');
    await user.type(usernameInput, 'Egor');
    await user.click(loginButton);

    // Проверка
    const msg = screen.getByText("Password cannot be empty");
    expect(msg).toBeTruthy(); 
    expect(onLoginSuccesMock).not.toHaveBeenCalled();
});

test("Нажатие на кнопку перехода к странице регистрации вызывает обработчик", async () => {
    //Подготовка
    const {onLoginSuccesMock, onGoToRegisterMock, user} = setup();
    //Действие

    const onGoToRegisterButton = screen.getByRole("button", {name: "Create it right now"});
    await user.click(onGoToRegisterButton);
    //Проверка
    expect(onGoToRegisterMock).toHaveBeenCalledTimes(1);
    expect(onLoginSuccesMock).not.toHaveBeenCalled();
});

test("Неверный пароль при допустимом имени пользователя", async() => {
    //Подготовка
    const { onLoginSuccesMock, user} = setup();
    //Действие
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', {name: "Log in"});
    await user.type(usernameInput, 'Egor');
    await user.type(passwordInput, '12356457');
    await user.click(loginButton);
    //Проверка
    const msg = screen.getByText("Incorrect username or password");
    expect(msg).toBeTruthy();
    expect(onLoginSuccesMock).not.toHaveBeenCalled();
}); 

test.each([
    {username: 'ab', expectedError: 'Username is too short'},
    {username: 'a'.repeat(26), expectedError: 'Username is too long'}
])("Имя $username: $expectedError", async({username, expectedError}) => {
    //подготовка
    const {onLoginSuccesMock, user} = setup();
    //действие 
    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", {name: "Log in"});
    await user.type(usernameInput, username);
    await user.type(passwordInput, "123");
    await user.click(loginButton);
    //проверка
    expect(expectedError).toBeTruthy();
    expect(onLoginSuccesMock).not.toHaveBeenCalled();
});

test.each([
    {username: 'eg!or', expectedError: 'Username can contain only latin symbols or numbers'},
    {username: 'егор', expectedError: 'Username can contain only latin symbols or numbers'},
    {username: 'eg or', expectedError: 'Username can contain only latin symbols or numbers'}
])("Некорректные символы в $username", async({username, expectedError}) => {
    //Подготовка
    const { onLoginSuccesMock, user } = setup();
    //Действие
    const usernameInput = screen.getByLabelText('Username');
    const loginButton = screen.getByRole('button', {name: "Log in"});
    await user.type(usernameInput, username);
    await user.click(loginButton);
    //Проверка
    expect(expectedError).toBeTruthy();
    expect(onLoginSuccesMock).not.toHaveBeenCalled();
});

test("Вход в аккаунт произошел", async() => {
    //Подготовка
    const {onLoginSuccesMock, user} = setup();
    //Действие
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByRole('button', {name: 'Log in'});
    await user.type(usernameInput, 'egor_123');
    await user.type(passwordInput, '123');
    await user.click(loginButton);
    //Проверка
    await waitFor(() => {
        expect(onLoginSuccesMock).toHaveBeenCalledTimes(1);
    }, { timeout: 1500});
});
