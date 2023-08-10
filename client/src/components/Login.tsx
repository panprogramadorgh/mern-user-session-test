/* Imports */

// react & nextjs
import { FC, FormEventHandler, MouseEventHandler } from "react";
// components

// libs

// utils
import { getCookie, createCookie, deleteCookie } from "../utils/cookies";

// types & interfaces

// css

interface Props {}

type LoginResponse =
  | { error: string }
  | { success: boolean; user: any; token: string };

const Login: FC<Props> = ({}) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      password: formData.get("password"),
    };
    fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data: LoginResponse) => {
        if ("success" in data && data.success) {
          createCookie({ name: "token", value: data.token, maxAge: 84600 });
          console.log("Te logeaste !");
        } else if ("error" in data) {
          console.log(data.error);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleProfileButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    const token = getCookie("token");
    fetch("http://localhost:4000/profile", {
      headers: { token: token! },
    })
      .then((response) => response.json())
      .then(({ user }: { user: any }) => {
        if (!user) {
          return console.log("No hay sesion de usuario");
        }
        console.log(user);
      })
      .catch((error) => console.error(error));
  };

  const handleCloseSessionButtonClick: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const cookie = getCookie("token");
    if (!cookie) return;
    if (
      window.confirm(
        "Estas seguro de que quieres cerrar la sesion de usuario ?"
      )
    )
      deleteCookie("token");
  };

  return (
    <main>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" />
          <input type="text" name="password" />
          <button>Login</button>
        </form>
      </div>

      <div>
        <h3>Boton de solicitudes</h3>
        <button onClick={handleProfileButtonClick}>
          Ver sesion de usuario
        </button>
        <button onClick={handleCloseSessionButtonClick}>
          Cerrar sesion de usuario
        </button>
      </div>
    </main>
  );
};

export default Login;
