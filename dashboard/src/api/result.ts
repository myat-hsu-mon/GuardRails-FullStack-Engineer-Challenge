import service from "../config/service";

export const getAllResults = () =>
  service({
    method: "GET",
    url: `v1/results`,
  });

export const getResult = (id: string | undefined) =>
  service({
    method: "GET",
    url: `v1/results/${id}`,
  });

export const createResult = (body: any) =>
  service({
    method: "POST",
    url: `v1/results`,
    data: JSON.stringify(body),
  });

export const updateResult = (id: string, body: any) =>
  service({
    method: "PUT",
    url: `v1/results/${id}`,
    data: JSON.stringify(body),
  });

export const deleteResult = (id: string) =>
  service({
    method: "DELETE",
    url: `v1/results/${id}`,
  });
