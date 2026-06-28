import api from "../api/axios";

export const getAuthors = async () => {
  const response = await api.get("/authors");
  return response.data;
};
