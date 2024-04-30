const  Users  = require("../model/userModel")
const Events = require("../model/eventModel")
const { generatedPasswordHash,comparePasswordHash } = require("../utils/bcrypt")
const { generateAccessToken,generateRefreshToken,verifyRefreshToken
} = require("../utils/jwt");


const register = async (req, res) => {
    const { username, email, password , role } = req.body;

    // Check if user exists, if not store use data in to db with hashed password 
    try {
        const isExists = await Users.findOne({ email });
        if (isExists) {
            return res.status(404).json({ message: "User already exists" });
        }
        const hashedPass = await generatedPasswordHash(password);
        const newUser = await Users.create({ email, username, password: hashedPass , role})
        if (newUser) {
            res.json({
                message: "Account has been created"
            });
        }

    } catch (error) {
        res.json({
            message: error.message
        });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exists.!" });
        }

        const validPassword = await comparePasswordHash(password, user.password);
        if (!validPassword) {
            return res.status(404).json({ message: "email/Paswword is not valid!" });
        }

         // Generate Access Token
        const accessToken = generateAccessToken(user._id);
        // Generate Refresh Token
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true, 
        })
        res.json({ _id: user._id, email: user.email, role: user.role, accessToken });

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};
//signed up for an event
const addEvent = async (req, res) => {
    const { eventId, userId } = req.body;

    try {
        const isUserExists = await Users.findById({ _id: userId });
        const event = await Events.findById({ _id: eventId });
        if (!isUserExists) {
            res.status(404).json({
                message: "User doesnot Exists!"
            });
        }
        if (!event) {
            res.status(404).json({
                message: "Event doesnot Exists!"
            });
        }
         
        let myEvents = isUserExists.myEvents || [];

        if (isUserExists.myEvents.indexOf(eventId) !== -1) {
            return res.status(404).json({
                message: "Already signed up for the event"
            });
        }
        myEvents.push(eventId);
        
        const updatedData = await Users.findByIdAndUpdate({ _id: userId }, { myEvents: myEvents }, { new: true });
        updatedData && res.status(200).json();
         // Update event's attendees
         let attendees = [...event.attendees, userId];
         await Events.findByIdAndUpdate(eventId, { attendees: attendees });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const myEvents = async (req, res) => {
    const { userId } = req.body;
    const { page, limit } = req.query;

    let skip = 0;
    if (page > 1) {
        skip = +limit * (page - 1);
    }

    try {
        
        const userData = await Users
            .findById({ _id: userId }, { myEvents: { $slice: [+skip, +limit] } })
            .populate({
                path: 'myEvents',
                populate: { path: 'category', select: 'category' }
            })
            .sort({ myEvents: -1 });
        const myEvents = userData.myEvents;

        const myEventsCount = (await Users
            .findById({ _id: userId }).select('myEvents')).myEvents.length;
        const pageCount = myEventsCount / limit;

        res.json({
            myEventsList: myEvents,
            myEventsCount: myEventsCount,
            pageCount,
        });
    } catch (error) {
        res.json({
            message: error.message
        });
    }
};

const deleteMyEvent = async (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;

    try {
        const removedEventId = await Users.findByIdAndUpdate(
            userId,
            { $pull: { myEvents: eventId } },
            { new: true }
        );

        if (removedEventId) {
            res.status(200).json({
                message: `${eventId} removed successfully`
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const refreshToken = async (req, res) => {
    // refresh token
    console.log(req.cookies["refreshtoken"], "====req.cookies.refreshToken");
    console.log(req.headers['Host'], "====Host");
    try {
        if (!req.cookies.refreshToken) {
            throw new Error("Refresh token not found in the cookie.");
        }
        const userId = verifyRefreshToken(req.cookies.refreshToken);

        if (!userId) {
            return res.status(401).json({
                message: "Refresh Token has expired!."
            });
        };

        // Generate Access Token
        const accessToken = generateAccessToken(userId);
        // Generate Refresh Token
        const refreshToken = generateRefreshToken(userId);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({
            message: "Refresh token not found in the cookie."
        })
    }
};

const logout = async (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged Out" });
};
module.exports = { register, login, addEvent, myEvents, deleteMyEvent}