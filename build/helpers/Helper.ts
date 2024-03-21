const ResponseData = (
  errCode: number,
  message: string | null,
  error: any | null,
  data: any
) => {
  const res = {
    errCode,
    message,
    errors: error,
    data,
  };
  return res;
};

export default {
  ResponseData,
};
