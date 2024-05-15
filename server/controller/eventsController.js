const eventModel = require("../model/eventModel");
const {eventEmitter} = require("../routes/notifications")
// Get Movies By ID
const eventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventModel.findById(id);
        res.json(event);
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

// Get Events 
const events = async (req, res) => {
    const { page, limit } = req.query;
    try {
        
        let skip = 0;
        if (page > 1) {
            skip = +limit * (page - 1);
        }

        // Page limit
        const eventList = await eventModel.find()
            .populate("category")
            .skip(skip)
            .limit(limit);
        const eventsCount = await eventModel.find().count({});
        const pageCount = eventsCount / limit;

        res.json({
            eventList,
            pageCount,
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

// Add Events to Events collection
const addEvents = async (req, res) => {
    try {
        const { title, description, location, image, category, price, attendees, startDate,endDate } = req.body;
        const categoryArr = category?.split(",");
        const attendeesArr = attendees?.split(",");

        // const eventImageUrl = res.locals.eventImageData?.secure_url
        const newEvent = await eventModel.create({ title, description, location, image, category:categoryArr, price, attendees:attendeesArr, startDate,endDate });
        //res.json(eventImageUrl);

        eventEmitter.emit('newEvent', {
            id:newEvent._id,
            title : newEvent.title,
            image : newEvent.url,
           
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// Edit Events in Events collection based on ID
const editEvents = async (req, res) => {console.log("server")
    try {
        let updatedEvent;
        const { _id, title, description, location, image, category, price, attendees, startDate,endDate } = req.body;
        console.log("from event controller",req.body)
        // const categoryArr = category.split(",");
        // const attendeesArr = attendees.split(",");
        updatedEvent = {
            title: title,
            description: description,
            location:location,
            image:image,
            price:price,
            attendees:attendees,
            category: category,
            startDate:startDate,
            endDate:endDate
        };
        console.log("updated event=>",updatedEvent)
        // if (res.locals.eventImageData) {
        //     const eventImageUrl = res.locals.eventImageData?.secure_url;
        //     updatedEvent.image = eventImageUrl;
        // }

        const isExists = await eventModel.findByIdAndUpdate(_id, updatedEvent, { new: true });
        eventEmitter.emit('notifyEvent', {
            id:isExists._id,
            title : isExists.title,
            type: 2,
        });
        res.json(isExists);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

// Delete Events in Events collection based on ID
const deleteEvents = async (req, res) => {
    try {
        const { id } = req.params;
        const removedEvent = await eventModel.findOneAndDelete({ _id: id });
        if (removedEvent) {
            eventEmitter.emit('notifyEvent', {
                id : removedEvent._id,
                title : removedEvent.title
               
            });
            res.status(200).json(removedEvent);
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

//filter events based on filter requirements
const filterEvents = async (req, res) => {
    const { categoryArr } = req.body;
    

    // Pagination
    const { page, limit } = req.query;
    let skip = 0;
    if (page > 1) {
        skip = +limit * (page - 1);
    }

    try {
        

        const query = {};
       

        if (categoryArr.length > 0) {
            query.category = {
                $in: categoryArr
            }
        }
        const categoriesList = await eventModel.find(query)
            .populate("category")
            .skip(skip)
            .limit(limit);

        // page limit
        const categoriesCount = await eventModel.find(query).count({});
        const pageCount = categoriesCount / limit;

        res.json({
            categoriesList: categoriesList,
            pageCount,
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

module.exports = {
    eventById, events, addEvents, editEvents, deleteEvents, filterEvents
};