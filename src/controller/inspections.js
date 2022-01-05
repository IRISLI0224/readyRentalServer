const Inspection = require('../model/inspection');
const User = require('../model/user');

// create one inspection instance and return the created object
exports.store = async (req, res) => {
  const { userId, propertyId, preferredDate } = req.body;
  /**
   * BP-99-ensure-the-uniqueness-inspections:
   * Verify if the user has applied this very inspection before,
   * if so, return the error message
   */
  const existingInspection = await Inspection.findOne({ user: userId, property: propertyId }).exec();
  if (existingInspection) {
    // 注册/添加重名 — 请求与服务器端目标资源的当前状态相冲突 - http code : 409
    return res.status(409).json({
      error: 'You have already booked this inspection!',
    });
  }
  //! is it necessary to verify if user exists after tokenAuth?
  const inspection = new Inspection({
    user: userId,
    property: propertyId,
    preferredDate,
  });
  await inspection.save();

  //add inspection to user
  const user = await User.findById(userId).exec();

  user.inspections.addToSet(inspection._id);
  await user.save();
  res.status(201).json({ inspection, user });
};

//get all instances
exports.index = async (req, res) => {
  const inspections = await Inspection.find().exec();
  res.status(202).json(inspections);
};

// update one inspection information
exports.update = async (req, res) => {
  const { id } = req.params;
  const { userId, propertyId, preferredDate } = req.body;
  const inspection = await Inspection.findByIdAndUpdate(
    id,
    {
      userId,
      propertyId,
      preferredDate,
    },
    { new: true },
  ).exec();

  if (!inspection) {
    res.status(404).send('inspection not found');
  }
  res.status(404).json(inspection);
};

// delete one inspection
exports.destroy = async (req, res) => {
  const { id } = req.params;
  const inspection = await Inspection.findByIdAndDelete(id).exec();

  if (!inspection) {
    res.status(404).send('inspection not found');
  }
  res.status(204);
};

// display selected inspection
exports.show = async (req, res) => {
  const { id } = req.params;
  const inspection = await Inspection.findById(id).populate('user').populate('property').exec();

  if (!inspection) {
    res.status(404).send('inspection not found');
  }
  res.json(inspection);
};
