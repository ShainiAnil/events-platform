const { google } = require("googleapis");
const { eventById } = require("../controller/eventsController.js");
const Event = require("../model/eventModel.js");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:5173"
);

exports.getToken = async (req, res) => {
  try {
    console.log("in controller");
    const { code } = req.body;
    console.log(req.body);

    const { tokens } = await oAuth2Client.getToken(code);

    const { refresh_token } = tokens;
    console.log(refresh_token, "refreshToken");

    const { id } = req.params;
    const event = await Event.findById(id).populate("attendees");
    console.log("Event>>>>>", event);

    const createEvent = {
      summary: event.title,
      location: event.location,
      description: event.description,
      start: {
        dateTime: event.startDate,
      },
      end: {
        dateTime: event.endDate,
      },

      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 15 },
        ],
      },
    };

    oAuth2Client.setCredentials({ refresh_token: refresh_token });
    const calendar = google.calendar("v3");

    const response = await calendar.events.insert({
      calendarId: "primary",
      auth: oAuth2Client,
      requestBody: createEvent,
    });

    const googleCalendarEvent = response.data;
    console.log("google calendar event", googleCalendarEvent);

    if (!googleCalendarEvent) {
      return res
        .status(404)
        .send({ message: "google calendar event was not created" });
    }
    res.status(200).send(googleCalendarEvent);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
