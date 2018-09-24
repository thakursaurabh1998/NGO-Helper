const { mongoose } = require("./mongoose");

const Donations = mongoose.model("donations", {
  initiated_by: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  item: {
    type: String,
    minlength: 1
  },
  index: {
    type: Number,
    required: false
  },
  imgURL: {
    type: String,
    trim: true,
    default:
      "https://www.wesleymission.org.au/assets/Media/Get-involved/Donate/_resampled/CroppedFocusedImageWzM5MywyNjIsZmFsc2UsMF0/One-off-donation.jpg"
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: Number,
    required: true,
    trim: true
  },
  is_distributed: {
    type: Boolean,
    default: false
  },
  check: {
    type: Boolean,
    default: false
  },
  distributed_to: {
    type: String,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
});

const Requests = mongoose.model("requests", {
  initiated_by: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  index: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    trim: true
  },
  contact: {
    type: Number,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = {
  Donations,
  Requests
};
