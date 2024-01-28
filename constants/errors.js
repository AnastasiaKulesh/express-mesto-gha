// Не поняла как реализовать статус коды через http2
const http2 = require('node:http2');

const STATUS_SUCCESS = http2.constants.HTTP_STATUS_OK; // 200;
const STATUS_CREATED = http2.constants.HTTP_STATUS_CREATED; // 201;
const STATUS_BAD_REQUEST = http2.constants.HTTP_STATUS_BAD_REQUEST; // 400;
const STATUS_NOT_FOUND = http2.constants.HTTP_STATUS_NOT_FOUND; // 404;
const STATUS_SERVER_ERROR = http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR; // 500;

class NotFoundError extends Error {
  constructor() {
    super();
    this.status = 404;
  }
}

module.exports = {
  STATUS_SUCCESS,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_SERVER_ERROR,
  NotFoundError,
};
