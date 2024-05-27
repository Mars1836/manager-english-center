class SuccessRespone {
  constructor(message, metadata, status = 200) {
    this.message = message;
    this.metadata = metadata;
    this.status = status;
  }
  send(res) {
    res
      .status(this.status)
      .json({ message: this.message, metadata: this.metadata });
  }
}
class CreateSuccess extends SuccessRespone {
  constructor(message, metadata) {
    super(message, metadata, 201);
  }
}
module.exports = {
  SuccessRespone,
  CreateSuccess,
};
