import { setCookieToken } from "@/action/action-cookie";
import { getApiUrl, responseDataType } from "service";

interface userLoginRequestProps {
  email: string;
  password: string;
}

export const userLoginRequest = async ({ email, password }: userLoginRequestProps) => {
  try {
    const response = await fetch(`${getApiUrl()}/auth/jwt/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const { access } = data;
      setCookieToken(access);
      const responseData: responseDataType = {
        status: "success",
      };
      return responseData;
    } else {
      const responseData: responseDataType = {
        status: "error",
        data: data,
        message: data.detail
      };
      return responseData;
    }
  } catch (error) {
    const responseData: responseDataType = {
      status: "error",
      data: error
    };
    return responseData;
  }
}

interface userSignupRequestProps {
  email: string;
  username: string;
  password: string;
}

export const userSignupRequest = async ({ email, username, password }: userSignupRequestProps) => {
  try {
    const response = await fetch(`${getApiUrl()}/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const { access } = data;
      setCookieToken(access);
      const responseData: responseDataType = {
        status: "success",
      };
      return responseData;
    } else {
      const responseData: responseDataType = {
        status: "error",
        data: data,
        message: data.detail
      };
      return responseData;
    }
  } catch (error) {
    const responseData: responseDataType = {
      status: "error",
      data: error
    };
    return responseData;
  }
}
