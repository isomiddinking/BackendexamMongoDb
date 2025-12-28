const { Car } = require('../model/carSchema');

// postCar
const postCar = async (req, res) => {
    try {
        const {
            title,
            model,
            description,
            color,
            horsePower,
            carType,
            chargin,
            weight,
            gasoline,
            YearMachine,
            price
        } = req.body
        const existingCar = await Car.findOne({ title });

        if (existingCar) {
            return res.status(400).json({ sucess: false, message: "Bu nom bilan Moshina mavjud" })
        } else {
            const newCar = new Car({
                title,
                model,
                description,
                color,
                horsePower,
                carType,
                chargin,
                weight,
                gasoline,
                YearMachine,
                price
            });
            await newCar.save()
            res.status(200).json({ sucess: true, message: "Moshina muvofaqiyatli qushildi", car: newCar })
        }

    } catch (error) {
        res.status(500).json({
            sucess: false, message: "Serverda xatolik yuz berdi ", error: error.message
        })
    }
};   

// getCar
const getCar = async (req, res) => {
    try {
        const car = await Car.find({});
        res.json({
            sucess: true,
            message: "Barcha moshinalar",
            innerDate: car,
        })
    } catch (error) {
        console.error('Error Fetching car', error, message);
        res.status(500).json({
            success: false,
            message: 'Server xatosi',
            error: error.message
        });
    }
}

// getCarById
const getCarById = async (req, res) => {
    try {
        const carId = req.params.id;

        const car = await Car.findById(carId)

        if (!car) {
            return res.status(404).json({ message: 'Car not found' })
        }

        res.json({ message: 'Car found', car })
    } catch (error) {
        console.error(error)
        res.status(501).json({ message: 'Internal server error' })
    }
}

// updateCar
const updateCar = async (req,res) => {
  try{
    const { id } = req.params;
    const {title, color, description, price} = req.body;
    const updatedCar = await Car.findByIdAndUpdate( 
      id,
      {title, color, description, price},
      {new: true}
    );
    if(!updatedCar){
      return res.status(404).json({
        success: false,
        message: 'Car not found!',
      });
    };
      res.json({
        success: true,
        message: 'Car Updated succesful',
        car: updatedCar,
      });
    }catch(error){
    res.status(500).json({
      success: false,
      message: 'Internetal server err',
      error: error.message,
    })
  }
}

// deleteCar
const deleteCar = async (req,res)=> {
    try{
        const CarId = req.params.id;

        const deletedCar = await Car.findByIdAndDelete(CarId)

        res.json({message:" Car Deletd succesfuly", deletedCar})
    }catch(error){
    console.error(error)
    res.status(500).json({message: 'Internal server eror'})
  }
}

// searchCar
const searchCar = async (req,res) => {
  try{
    const {query} = req.query;

    if(!query || typeof query !== "string"){
      return res.status(400).json({message: "Invaild search query."})
    }

    const result = await Car.find({
      $or:[
        {title: {$regex: query, $options: "i"}},
        {model: {$regex: query, $options: "i"}}

      ] });

      if(result.length === 0){
        return res.json({message: "Bunday moshina yuq "})
      }

      res.json(result);
  }catch(error){
    console.error(error);
    res.status(500).json({message: "Server error: Faild to fetch"})
  }
}

module.exports = { postCar, getCar, getCarById, updateCar, deleteCar,searchCar}