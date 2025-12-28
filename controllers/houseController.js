const { House } = require('../model/houseSchema');

// POST 
const postHouse = async (req, res) => {
  try {
    const {
      region,
      city,
      house_number,
      street,
      family_numbers,
      location,
    } = req.body;

    const existingHouse = await House.findOne({
      region,
      city,
      street,
      house_number,
    });

    if (existingHouse) {
      return res
        .status(400)
        .json({ success: false, message: "Bu manzilda uy allaqachon mavjud" });
    }

    const newHouse = new House({
      region,
      city,
      house_number,
      street,
      family_numbers,
      location,
    });

    await newHouse.save();

    res.status(200).json({
      success: true,
      message: "Uy muvaffaqiyatli qo'shildi",
      house: newHouse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi",
      error: error.message,
    });
  }
};

// GET
const getHouse = async (req, res) => {
  try {
    const houses = await House.find({});
    res.json({
      success: true,
      message: "Barcha uylar ro'yxati",
      data: houses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server xatosi",
      error: error.message,
    });
  }
};

//  GETBYID
const getHouseById = async (req, res) => {
  try {
    const houseId = req.params.id;
    const house = await House.findById(houseId);

    if (!house) {
      return res.status(404).json({ success: false, message: "Uy topilmadi" });
    }

    res.json({ success: true, message: "Uy topildi", house });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi",
      error: error.message,
    });
  }
};

// UPDATE 
const updateHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { region, city, street, house_number, family_numbers, location } =
      req.body;

    const updatedHouse = await House.findByIdAndUpdate(
      id,
      { region, city, street, house_number, family_numbers, location },
      { new: true }
    );

    if (!updatedHouse) {
      return res.status(404).json({
        success: false,
        message: "Uy topilmadi",
      });
    }

    res.json({
      success: true,
      message: "Uy ma'lumotlari yangilandi",
      house: updatedHouse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Serverda xatolik",
      error: error.message,
    });
  }
};

// DELETE 
const deleteHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHouse = await House.findByIdAndDelete(id);

    if (!deletedHouse) {
      return res.status(404).json({
        success: false,
        message: "Uy topilmadi",
      });
    }

    res.json({
      success: true,
      message: "Uy muvaffaqiyatli o‘chirildi",
      house: deletedHouse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server xatosi",
      error: error.message,
    });
  }
};

// SEARCH 
const searchHouse = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Noto‘g‘ri qidiruv so‘rovi" });
    }

    const result = await House.find({
      $or: [
        { region: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { street: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ success: false, message: "Bunday uy topilmadi" });
    }

    res.json({ success: true, message: "Qidiruv natijasi", data: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Serverda xatolik yuz berdi",
      error: error.message,
    });
  }
};

module.exports = {
  postHouse, getHouse, getHouseById, updateHouse, deleteHouse, searchHouse,
};