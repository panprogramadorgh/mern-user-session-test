interface GetCookie {
  (cookieName: string): null | string;
}
export const getCookie: GetCookie = (cookieName) => {
  const cookieArr = document.cookie.split("; ");
  const cookie = cookieArr.find((eachCookie) => {
    if (eachCookie.startsWith(`${cookieName}=`)) {
      return eachCookie;
    }
  });
  if (!cookie) return null;
  return cookie.split("=")[1];
};

interface CreateCookie {
  ({
    name,
    value,
    maxAge,
  }: {
    name: string;
    value: string;
    maxAge: number;
  }): void;
}
export const createCookie: CreateCookie = ({ name, value, maxAge }) => {
  document.cookie = `${name}=${value}; maxAge=${maxAge}`;
};

interface DeleteCookie {
  (cookieName: string): boolean;
}
export const deleteCookie: DeleteCookie = (cookieName) => {
  const cookie = getCookie(cookieName);
  const cookieExists = cookie !== null;
  if (!cookieExists) return cookieExists;
  document.cookie = `${cookieName}=; maxAge=0`;
  return cookieExists;
};
