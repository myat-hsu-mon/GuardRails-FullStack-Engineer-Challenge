import moment from "moment";

export const formatDateAndTime = (date: any) =>
  moment(date).format("DD-MM-YYYY HH:mm:ss");
