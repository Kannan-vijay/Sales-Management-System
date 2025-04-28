const User = require("../models/userModel")
const bcrypt = require("bcrypt");

exports.verifyUser = async(req,res)=>{
    const{role,userName,password} = req.body;
    try {
        const user = await User.findOne({ userName, role });
    
        if (!user) {
          return res.status(400).json({
            message: "Invalid UserName or Role"
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) {
          return res.status(400).json({
            message: "Invalid Password"
          });
        }
    
        res.status(200).json({
          message: "Successfully Logged In"
        });
      } catch (error) {
        res.status(500).json({
          message: error.message
        });
      }
};


exports.addUsers = async (req,res) => {
    const users = [
        {
            "role" : "Admin",
            "userName" : "kannan",
            "password" : "kannan@2005"
        },
        {
            "role" : "Accounter",
            "userName" : "vijay",
            "password" : "vijay@2007"
        },
        {
            "role" : "Accounter",
            "userName" : "venkatachalam",
            "password" : "venkatachalam@1960"
        }
    ];
    try {
        const hashedUsers = await Promise.all(
            users.map(async (i) => {
                const hashedPassword = await bcrypt.hash(i.password, 10);
                return {
                    userName: i.userName,
                    role: i.role,
                    password: hashedPassword
                };
            })
        );
        const results = await User.insertMany(hashedUsers);
        res.status(201).json(results);
    } catch (error) {
        console.error("Error adding users:", error);
        res.status(400).json({ error: error.message });
    }
    
}