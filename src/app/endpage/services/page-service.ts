import { getApiUrl, responseDataType } from "service";

interface createPageRequestProps {
  emotion: string;
  situation: string;
}

export const createPageRequest = async ({ emotion, situation }: createPageRequestProps) => {
  try {
    const response = await fetch(`${getApiUrl()}/pages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emotion,
        situation,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const responseData: responseDataType = {
        status: "success",
        data: data
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