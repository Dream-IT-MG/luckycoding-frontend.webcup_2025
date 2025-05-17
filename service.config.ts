export const getApiUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL;
};

export const createAuthorization = ({ token }: { token: string | null }) => {
  return `LUCKY ${token}`;
};

export type responseDataType = {
  status: "success" | "warning" | "error";
  message?: string;
  data?: unknown;
};
