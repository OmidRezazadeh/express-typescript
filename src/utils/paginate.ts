export const paginate = (reqData: any, totalCount: any) => {
  // Pagination setup
  const page = reqData.page || 1; // If reqData.page is null, default to 1
  const pageSize = reqData.pageSize || 2; // If reqData.pageSize is null, default to 10
  const startIndex = (page - 1) * pageSize; 
  const totalPages = Math.ceil(totalCount / pageSize);
  const paginate: any = { page, pageSize, totalPages, startIndex };
  return paginate;
};
