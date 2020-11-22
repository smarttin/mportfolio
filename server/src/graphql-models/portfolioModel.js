class PortfolioModel {
  constructor(model) {
    this.Model = model;
  }

  getAll() {
    return this.Model.find({}).sort({ createdAt: -1 });
  }

  getById(id) {
    return this.Model.findById(id);
  }

  getAllByUser(id) {
    return this.Model.find({ user: id }).sort({ startDate: -1 });
  }

  create(data) {
    return this.Model.create(data);
  }

  findAndUpdate(id, data) {
    return this.Model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });
  }

  findAndDelete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }
}

export default PortfolioModel;
