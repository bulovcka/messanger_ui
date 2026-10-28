import { test, vi, expect, afterEach} from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { WelcomePage } from "./WelcomePage";
import { userEvent } from "@testing-library/user-event"

afterEach(cleanup);

test('нажатие Register вызывает обработчик регистрации', async () => {
    //подготовка
    const onGoToRegisterMock = vi.fn();
    const onGoToLoginMock = vi.fn();
    const user = userEvent.setup();

    render(<WelcomePage onGoToLogin={onGoToLoginMock} onGoToRegister={onGoToRegisterMock}/>)

    //действие
    const registerButton = screen.getByRole('button', { name: 'Register' });
    await user.click(registerButton);

    //проверка
    expect(onGoToRegisterMock).toHaveBeenCalledTimes(1);
    expect(onGoToLoginMock).not.toHaveBeenCalled();
});


test('Нажатие кнопки Log In вызывает обработчик входа в аккаунт', async () => {
    //подготовка
    const onGoToLoginMock = vi.fn();
    const onGoToRegisterMock = vi.fn();
    const user = userEvent.setup();

    render(<WelcomePage onGoToLogin={onGoToLoginMock} onGoToRegister={onGoToRegisterMock}/>);
    
    //действие
    const loginButton = screen.getByRole('button', {name: 'Log In'});
    await user.click(loginButton);
    //проверка

    expect(onGoToLoginMock).toHaveBeenCalledTimes(1);
    expect(onGoToRegisterMock).not.toHaveBeenCalled();
});
