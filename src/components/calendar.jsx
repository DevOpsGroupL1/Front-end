import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Mock Data Generator
const generateMockEvents = () => {
  const events = [];
  const startDate = moment().subtract(2, "months").startOf("month");
  const endDate = moment().add(2, "months").endOf("month");

  const eventTypes = [
    {
      title: "Team Meeting",
      color: "#0F2D6B",
      descriptions: [
        "Discuss quarterly goals and progress",
        "Review team performance metrics",
        "Brainstorm new project initiatives",
      ],
    },
    {
      title: "Client Call",
      color: "#0F2D6B",
      descriptions: [
        "Quarterly business review",
        "Discuss project deliverables",
        "Address client concerns and feedback",
      ],
    },
    {
      title: "Project Deadline",
      color: "#0F2D6B",
      descriptions: [
        "Submit final project report",
        "Prepare presentation materials",
        "Compile project outcomes",
      ],
    },
    {
      title: "Conference",
      color: "#0F2D6B",
      descriptions: [
        "Attend keynote speeches",
        "Network with industry professionals",
        "Learn about latest industry trends",
      ],
    },
    {
      title: "Workshop",
      color: "#0F2D6B",
      descriptions: [
        "Hands-on skill development session",
        "Interactive learning experience",
        "Practical training workshop",
      ],
    },
    {
      title: "Training",
      color: "#0F2D6B",
      descriptions: [
        "Professional development course",
        "Learn new technologies",
        "Skill enhancement session",
      ],
    },
  ];

  // Generate events across a few months
  for (let m = moment(startDate); m.isBefore(endDate); m.add(1, "days")) {
    // Randomly decide if this day gets an event
    if (Math.random() > 0.7) {
      const eventType =
        eventTypes[Math.floor(Math.random() * eventTypes.length)];

      // Randomize event time
      const startHour = Math.floor(Math.random() * 16) + 8; // 8 AM to 11 PM
      const duration = Math.random() > 0.5 ? 1 : 2; // 1 or 2 hours

      events.push({
        id: events.length + 1,
        title: eventType.title,
        start: moment(m).hour(startHour).minute(0).toDate(),
        end: moment(m)
          .hour(startHour + duration)
          .minute(0)
          .toDate(),
        color: eventType.color,
        description:
          eventType.descriptions[
            Math.floor(Math.random() * eventType.descriptions.length)
          ],
        calendarId: Math.floor(Math.random() * 3) + 1, // Assign to random calendar
        isCompleted: false,
      });
    }
  }

  return events;
};

// Event Details Modal with Mark as Done
const EventDetailsModal = ({ event, isOpen, onClose, onMarkAsDone }) => {
  if (!isOpen || !event) return null;

  const handleBackgroundClick = (e) => {
    // Close modal if click is directly on the background overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white p-6 rounded-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-800">{event.title}</h2>

        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Date:</strong> {moment(event.start).format("MMMM Do, YYYY")}
          </p>
          <p className="text-gray-700">
            <strong>Time:</strong> {moment(event.start).format("h:mm A")} -{" "}
            {moment(event.end).format("h:mm A")}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="font-semibold mb-2 text-gray-800">Description</h3>
          <p className="text-gray-700">{event.description}</p>
        </div>

        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded ${event.isCompleted ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}
          >
            {event.isCompleted ? "Completed" : "Pending"}
          </span>

          {!event.isCompleted && (
            <button
              onClick={() => onMarkAsDone(event)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Mark as Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Custom Event Component to show color and completion status
const CustomEvent = ({ event }) => {
  return (
    <div
      className="p-1 text-xs relative"
      style={{
        backgroundColor: event.isCompleted
          ? "#48BB78" // Green for completed events
          : "#0F2D6B",
        color: "white",
        borderRadius: "4px",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {event.title}
      {event.isCompleted && (
        <span className="absolute top-0 right-0 text-white font-bold">✓</span>
      )}
    </div>
  );
};

// Custom Date Cell Wrapper
const CustomDateCellWrapper = ({ children, value }) => {
  // Check if this date has any events
  const hasEvents = children.props.events && children.props.events.length > 0;

  // Check if any events on this date are completed
  const hasCompletedEvents =
    hasEvents && children.props.events.some((event) => event.isCompleted);

  return React.cloneElement(children, {
    style: {
      ...children.props.style,
      backgroundColor: hasCompletedEvents
        ? "#9AE6B4" // Light green for dates with completed events
        : hasEvents
          ? "#eb3446"
          : "transparent", // Light blue for dates with events
    },
  });
};

// Main Calendar Component
export const GCalendar = () => {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState(generateMockEvents());
  const [currentDate, setCurrentDate] = useState(new Date());

  const [calendars, setCalendars] = useState([
    { id: 1, name: "Personal", color: "#0F2D6B", visible: true },
    { id: 2, name: "Work", color: "#0F2D6B", visible: true },
    { id: 3, name: "Holidays", color: "#0F2D6B", visible: true },
  ]);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleMarkAsDone = (event) => {
    setEvents(
      events.map((e) => (e.id === event.id ? { ...e, isCompleted: true } : e)),
    );
    setIsDetailsModalOpen(false);
  };

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentDate(moment(currentDate).subtract(1, "month").toDate());
  };

  const goToNextMonth = () => {
    setCurrentDate(moment(currentDate).add(1, "month").toDate());
  };

  return (
    <div className="flex h-screen bg-[transparent]">
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={goToPreviousMonth}
            className="bg-[#0F2D6B] text-white font-bold !px-4 !py-2 rounded hover:bg-blue-600 cursor-pointer text-xs"
          >
            Previous Month
          </button>
          <h2 className="text-xl font-bold">
            {moment(currentDate).format("MMMM YYYY")}
          </h2>
          <button
            onClick={goToNextMonth}
            className="bg-[#0F2D6B] text-white font-bold !px-4 !py-2 rounded hover:bg-blue-600 cursor-pointer text-xs"
          >
            Next Month
          </button>
        </div>
        <Calendar
          localizer={localizer}
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          events={events.filter(
            (event) =>
              calendars.find((cal) => cal.id === event.calendarId)?.visible ??
              true,
          )}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: "100%",
            border: "none",
            borderColor: "transparent",
          }}
          onSelectEvent={handleSelectEvent}
          selectable
          components={{
            event: CustomEvent,
            dateCellWrapper: CustomDateCellWrapper,
          }}
        />
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onMarkAsDone={handleMarkAsDone}
      />
    </div>
  );
};
