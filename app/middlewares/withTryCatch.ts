const withTryCatch = async <T>(query: Promise<T>, message?: string) => {
  try {
    const data = await query;
    if (!data) throw new Error(message || "Data not found");
    return { data, error: null };
  } catch (error) {
    if (error instanceof Error) {
      if (process.env.NODE_ENV === "development")
        return { data: null, error: { message: error.message } };
      else
        return {
          data: null,
          error: { message: message || "Unexpected Server Error" },
        };
    }
    return { data: null, error: { message: "Unknown Error" } };
  }
};

export default withTryCatch;
