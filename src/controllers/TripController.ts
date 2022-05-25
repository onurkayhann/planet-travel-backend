import { Response, Request } from "express";
import User from "../database/models/User";


const getList = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (user) {
      return res.status(200).json({
        success: true,
        list: user.tripList,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const getTrip = async (req: Request, res: Response) => {
  const { userId, tripId } = req.params;

  try {
    const user = await User.findById(userId);

    if (user) {
      const trip = user.tripList.id(tripId);

      if (trip) {
        return res.status(200).json({ success: true, trip });
      } else {
        return res.status(404).json({ success: false, message: "Not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const createTrip = async (req: Request, res: Response) => {
  const { destination, travTime } = req.body;
  const { id } = req.params;

  if (destination && travTime) {
    try {
      const user = await User.findById(id);
  
      const updateList = await User.findByIdAndUpdate(
        id,
        {
          tripList: [...user.tripList, { destination, travTime }],
        },
        { new: true }
      );
  
      if (updateList) {
        return res.status(200).json({
          success: true,
          updateList,
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Could not update list" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  } else {
    return res.status(400).json({ success: false, message: "All fields must be populated" })
  } 
};

const editTrip = async (req: Request, res: Response) => {
  const { destination, travTime } = req.body;
  const { userId, tripId } = req.params;

  if (destination && travTime) {
    try {
      const updatedUser = await User.findOneAndUpdate({
          "_id": userId, "tripList._id": tripId
        },
        {
          "$set": {
            "tripList.$.destination": destination,
            "tripList.$.travTime": travTime
          }
        },
        { new: true }
      );
  
      if (updatedUser) {
        return res.status(200).json({ success: true, updatedUser });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Could not update trip" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error });
    }
  } else {
    return res.status(400).json({ success: false, message: "All fields must be populated" })
  }
}

const deleteTrip = async (req: Request, res: Response) => {
  const { userId, tripId } = req.params;

  try {
    const user = await User.findById(userId);

    user.tripList.id(tripId).remove((err, result) => {
      if (result) {
        return res.status(200).json({ success: true, result })
      } else {
        return res.status(400).json({ success: false, err })
      }
    })
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
}

export { getList, getTrip, createTrip, editTrip, deleteTrip };
