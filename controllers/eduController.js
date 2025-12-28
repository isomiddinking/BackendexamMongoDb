const { Edu } = require('../model/eduSchema');

// postEdu
const postEdu = async (req, res) => {
    try {
        const {
            city,
            street,
            center_name,
            branch,
            rating
        } = req.body

        const existingEdu = await Edu.findOne({ center_name });

        if (existingEdu) {
            return res.status(400).json({ succes: false, message: "Bu nom bilan o'quv markaz mavjud" })
        } else {
            const newEdu = new Edu({
                city,
                street,
                center_name,
                branch,
                rating
            });

            await newEdu.save()

            res.status(200).json({succes: true, message: "O'quv markaz muvofaqiyatli qushildi", edu: newEdu})
        }
    }catch(err){
          res.status(500).json({
            sucess: false, message: "Serverda xatolik yuz berdi ", error: error.message
        })
    }
} 

// getEdu
const getEdu = async (req, res) => {
    try{
        const edu = await Edu.find({})
        res.json({
            succes: true,
            message: "Barcha markazlar",
            innerDate: edu
        })
    } catch(error){
         console.error('Error Fetching car', error, message);
        res.status(500).json({
            success: false,
            message: 'Server xatosi',
            error: error.message
        });
    }
}

// getEduById
const getEduById = async (req, res) => {
    try {
        const eduId = req.params.id;

        const edu = await Edu.findById(eduId)

        if (!edu) {
            return res.status(404).json({ message: 'Edu not found' })
        }

        res.json({ message: 'Edu found', edu })

    } catch (error) {
        console.error(error)
        res.status(501).json({ message: 'Internal server error' })
    }
}

// updateEdu
const updateEdu = async (req,res) => {
  try{
    const { id } = req.params;
    const {city, street} = req.body;
    const updatedEdu = await Edu.findByIdAndUpdate( 
      id,
      {city, street},
      {new: true}
    );
    if(!updatedEdu){
      return res.status(404).json({
        success: false,
        message: 'Edu not found!',
      });
    };
      res.json({
        success: true,
        message: 'Edu Updated succesful',
        Edu: updatedEdu,
      });
    }catch(error){
    res.status(500).json({
      success: false,
      message: 'Internetal server err',
      error: error.message,
    })
  }
}

// deleteEdu
const deleteEdu = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEdu = await Edu.findByIdAndDelete(id);

    if (!deletedEdu) {
      return res.status(404).json({
        success: false,
        message: "O‘quv markaz topilmadi",
      });
    }

    res.json({
      success: true,
      message: "O‘quv markaz muvaffaqiyatli o‘chirildi",
      edu: deletedEdu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server xatoligi yuz berdi",
      error: error.message,
    });
  }
};

// searchEdu
const searchEdu = async (req, res) => {
  try {
    const { query } = req.query; // masalan: /api/edu/search?query=IT

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Qidiruv so‘zi kiritilmadi",
      });
    }

    // center_name yoki city yoki branch bo‘yicha qidirish (case-insensitive)
    const results = await Edu.find({
      $or: [
        { center_name: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { branch: { $regex: query, $options: "i" } },
      ],
    });

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Hech narsa topilmadi",
      });
    }

    res.json({
      success: true,
      message: "Qidiruv natijalari",
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server xatosi",
      error: error.message,
    });
  }
};


module.exports = { postEdu, getEdu, getEduById, updateEdu, deleteEdu, searchEdu };
