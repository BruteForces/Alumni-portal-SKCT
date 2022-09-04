import mongoose from "mongoose";
import notificationConstants from "../constants/notification-constants.js";
import Alumni from "./Alumni.js";
import AlumniRequest from "./AlumniRequest.js";

const { model, Schema } = mongoose;

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      index: true,
      enum: notificationConstants,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "ForumPost",
      required: false,
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "ForumComment",
      required: false,
    },
    commentedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    alumniRequest: {
      type: Schema.Types.ObjectId,
      ref: "AlumniRequest",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.pre("save", async function (next) {
  const { user, type, resolved } = this;

  if (!resolved) {
    return next();
  }

  if (type === notificationConstants.ALUMNI_REJECT) {
    await AlumniRequest.deleteOne({
      user,
    });

    await Alumni.deleteOne({
      user,
    });
  }

  return next();
});

const Notification = model("Notification", notificationSchema);

export default Notification;
