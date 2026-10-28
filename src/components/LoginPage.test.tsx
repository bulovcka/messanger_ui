import { test,vi,expect, afterEach } from "vitest"
import {render, screen, cleanup} from "@testing-library/react"
import { LoginPage } from "./LoginPage"
import userEvent from "@testing-library/user-event"

afterEach(cleanup);

test('Пустая форма показывает ошибку имени и не вызывает вход', async () => {
    //подготовка
    const onLoginSuccesMock = vi.fn();
    const onGoToRegisterMock = vi.fn();
    const user = userEvent.setup();

    render(<LoginPage onGoToRegister={onGoToRegisterMock} onLoginSuccess={onLoginSuccesMock}/>)

    //действие

    const loginButton = screen.getByRole('button', {name: 'Log in'});
    await user.click(loginButton);


    //проверка
    const msg = screen.getByText("Enter your username");
    expect(msg).toBeTruthy();
    expect(onLoginSuccesMock).not.toHaveBeenCalled();
});
