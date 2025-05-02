const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};

const errorResponse = (res, message = 'Error', statusCode = 400) => {
  res.status(statusCode).json({
    status: 'error',
    message
  });
};

const paginatedResponse = (res, data, total, page, limit, message = 'Success') => {
  const totalPages = Math.ceil(total / limit);
  
  res.status(200).json({
    status: 'success',
    message,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages
    }
  });
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse
}; 