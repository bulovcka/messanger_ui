import { test, vi, expect} from "vitest"
import { render, screen } from "@testing-library/react"
import { WelcomePage } from "./WelcomePage";
import { userEvent } from "@testing-library/user-event"

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