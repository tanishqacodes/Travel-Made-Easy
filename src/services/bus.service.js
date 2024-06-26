const httpStatus = require('http-status');
const { Bus, User } = require('../models');
const ApiError = require('../utils/ApiError');

const addBus = async (bus) => {
  let checkIfUserIsDriver = await User.findById(bus.driver);
  if (!checkIfUserIsDriver) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is not a driver');
  }
  return Bus.create(bus);
};

const getAllBuses = async () => {
  return Bus.find();
};

const getBusById = async (id) => {
  const bus = await Bus.findById(id);
  if (!bus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bus not found');
  }
  return bus;
};

const updateBusById = async (id, updateBody) => {
  const bus = await getBusById(id);
  console.log(bus);
  if (!bus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bus not found');
  }
  console.log("=======",updateBody)
  Object.assign(bus, updateBody);
  await bus.save();
  return bus;
};

const deleteBusById = async (id) => {
  const bus = await getBusById(id);
  if (!bus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bus not found');
  }
  await bus.remove();
  return bus;
};

module.exports = {
  addBus,
  getBusById,
  updateBusById,
  deleteBusById,
  getAllBuses
};
