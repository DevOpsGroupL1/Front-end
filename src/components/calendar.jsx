import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
  Chip,
  Paper
} from "@mui/material";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import { GButton } from "./button";
import { useApiSend } from "../hooks/useApi";
import { markAsTaken } from "../urls";
import toast from "react-hot-toast";

// Function to generate events from medication data
const generateMedicationEvents = (medicationData) => {
  const events = [];

  medicationData.forEach((medication) => {
    const startDate = moment(medication.startDate);
    const endDate = moment(medication.endDate);

    const colors = [
      "#8E24AA",
      "#D81B60",
      "#0F2D6B",
      "#E53935",
      "#F57C00",
      "#FFB300",
      "#546E7A",
    ];

    // Select a consistent color based on medication ID
    const colorIndex = Math.abs(
      medication.id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
    ) % colors.length;
    const medicationColor = colors[colorIndex];

    // Generate events for each day and dosage
    for (let date = moment(startDate); date.isSameOrBefore(endDate); date.add(1, 'days')) {
      medication.dosages.forEach((dosage) => {
        const intakeTime = moment(dosage.intakeTime);
        const eventStart = moment(date)
          .hour(intakeTime.hour())
          .minute(intakeTime.minute())
          .second(0);
        const eventEnd = moment(eventStart).add(30, 'minutes');

        // Check if this dosage was taken on this specific date
        const formattedDate = date.format('YYYY-MM-DD');
        const isTakenOnThisDate = dosage.datesTaken.some(dateTaken => 
          moment(dateTaken.dateCreated).format('YYYY-MM-DD') === formattedDate
        );

        events.push({
          id: `${medication.id}-${dosage.id}-${formattedDate}`,
          scheduleId: medication.id,
          title: `${medication.drugName} - ${dosage.dosage}`,
          start: eventStart.toDate(),
          end: eventEnd.toDate(),
          color: medicationColor,
          description: `${dosage.description}`,
          prescription: medication.prescription,
          medicationId: medication.id,
          dosageId: dosage.id,
          isCompleted: isTakenOnThisDate, // Use the datesTaken to determine completion status
          allDosageData: dosage,
          allMedicationData: medication,
          date: formattedDate,
          datesTaken: dosage.datesTaken,
          rawEventStart: eventStart, // Keep the moment object for easy access
        });
      });
    }
  });

  return events;
};

// Event Details Modal with Mark as Done
const EventDetailsModal = ({
  user,
  event,
  isOpen,
  onClose,
  onMarkAsDone
}) => {
  // Format the date for API call
  const eventDateTime = event ? `${moment(event.start).format('YYYY-MM-DD')}T${moment(event.start).format('HH:mm:ss')}` : null;

  const {mutate, isPending} = useApiSend(
    () => markAsTaken(event?.dosageId, event?.scheduleId, eventDateTime),
    () => {
      toast.success("Marked as taken");
      // The actual UI update is now handled by onMarkAsDone below
    },
    () => {
      toast.error("Failed to mark as taken");
      // Revert the optimistic update
      onMarkAs,Done(event, true); // Pass true to indicate this is a reversion
    },
    ['get-my-reports', 'recently','upcoming']
  );

  if (!event) return null;

  // Check if this specific event is completed based on datesTaken
  const eventDate = moment(event.start).format('YYYY-MM-DD');
  const isTakenOnEventDate = event.datesTaken && event.datesTaken.some(
    dateTaken => moment(dateTaken.dateCreated).format('YYYY-MM-DD') === eventDate
  );

  const handleMarkAsDone = () => {
    // First, apply optimistic update
    onMarkAsDone(event);
    
    // Then trigger the API call
    mutate();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="text-sm !text-black" sx={{ m: 0, p: 2 }}>
        {event.title}
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <p className="text-sm !text-black">
            <strong>Date:</strong> {moment(event.start).format("MMMM Do, YYYY")}
          </p>
          <p className="text-sm !text-black">
            <strong>Time:</strong> {moment(event.start).format("h:mm A")} - {moment(event.end).format("h:mm A")}
          </p>
          <p className="text-sm !text-black">
            <strong>Drug:</strong> {event.allMedicationData.drugName}
          </p>
          <p className="text-sm !text-black">
            <strong>Prescription:</strong> {event.prescription}
          </p>
        </Box>

        <Box sx={{ p: 2, bgcolor: 'grey.100', mb: 2 }}>
          <p className="text-sm !text-black font-bold">Description</p>
          <p className="text-sm !text-black">{event.description}</p>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Chip
          label={isTakenOnEventDate ? "Taken" : "Not Taken"}
          color={isTakenOnEventDate ? "success" : "warning"}
        />

        {(!isTakenOnEventDate && user?.user?.userRole?.id === 1) && (
          <GButton
            className="!w-auto !px-4"
            label="Mark as Taken"
            onClick={handleMarkAsDone}
            isLoading={isPending}
            disabled={isPending}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

// Custom Event Component to show color and completion status
const CustomEvent = ({ event }) => {
  // Check if this specific date is completed
  const eventDate = moment(event.start).format('YYYY-MM-DD');
  const isTakenOnEventDate = event.datesTaken && event.datesTaken.some(
    dateTaken => moment(dateTaken.dateCreated).format('YYYY-MM-DD') === eventDate
  );

  return (
    <div
      className="p-1 text-xs relative"
      style={{
        backgroundColor: isTakenOnEventDate
          ? "#48BB78" // Green for completed events
          : event.color,
        color: "white",
        borderRadius: "4px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        padding: "4px",
      }}
    >
      {event.title}
      {isTakenOnEventDate && (
        <span className="absolute top-0 right-0 text-white font-bold">✓</span>
      )}
    </div>
  );
};

// Custom Date Cell Wrapper
const CustomDateCellWrapper = ({ children, value, darkMode }) => {
  const date = moment(value).format('YYYY-MM-DD');
  const events = children.props.events || [];

  // Filter events for this date
  const dateEvents = events.filter(e => moment(e.start).format('YYYY-MM-DD') === date);

  // Group by medication
  const medsMap = dateEvents.reduce((map, e) => {
    map[e.medicationId] = map[e.medicationId] || [];
    map[e.medicationId].push(e);
    return map;
  }, {});

  // Check if all medications for this date are taken
  const allTaken = dateEvents.length > 0 && Object.values(medsMap).every(arr => 
    arr.every(e => {
      // Check if this specific event is taken based on datesTaken
      return e.datesTaken && e.datesTaken.some(
        dateTaken => moment(dateTaken.dateCreated).format('YYYY-MM-DD') === date
      );
    })
  );

  return React.cloneElement(children, {
    style: {
      ...children.props.style,
      backgroundColor: allTaken
        ? "#9AE6B4" // Light green if all dosages done
        : darkMode ? "rgba(63,189,241,0.2)" : "transparent",
    },
  });
};

// Main Calendar Component
export const MedicationCalendar = ({ medicationData, darkMode }) => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month');
  const user = useSelector(state => state.auth);

  useEffect(() => {
    if (medicationData && medicationData.length) {
      setEvents(generateMedicationEvents(medicationData));
    }
  }, [medicationData]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleMarkAsDone = (event, isRevert = false) => {
    if (isRevert) {
      // If this is a reversion due to API error, remove the optimistic update
      setEvents(currentEvents => currentEvents.map(e => {
        if (e.id === event.id) {
          // Reset to the state before the optimistic update
          return event;
        }
        return e;
      }));
      return;
    }

    // Apply optimistic update
    const now = new Date();
    const updatedEvents = events.map(e => {
      if (e.id === event.id) {
        // Add a new datesTaken entry
        const newDateTaken = {
          id: `temp-${Date.now()}`, // Temporary ID for frontend
          userId: user?.user?.id,
          dateCreated: now.toISOString()
        };
        
        // Create a new datesTaken array with the new entry
        const updatedDatesTaken = [...(e.datesTaken || []), newDateTaken];
        
        return { 
          ...e, 
          datesTaken: updatedDatesTaken,
          isCompleted: true 
        };
      }
      return e;
    });
    
    setEvents(updatedEvents);
    
    // Automatically close the modal after optimistic update
    // This improves UX by showing the green color change immediately
    setIsDetailsModalOpen(false);
  };

  const goToPreviousMonth = () => setCurrentDate(moment(currentDate).subtract(1, "month").toDate());
  const goToNextMonth = () => setCurrentDate(moment(currentDate).add(1, "month").toDate());

  // Text color class based on dark mode
  const textColorClass = darkMode ? "text-white" : "text-black";

  // Custom components with dark mode prop
  const components = {
    event: CustomEvent,
    dateCellWrapper: (props) => <CustomDateCellWrapper {...props} darkMode={darkMode} />
  };

  return (
    <div className={`flex flex-col w-full h-full bg-[transparent] overflow-hidden ${darkMode ? "rgba(63,189,241,0.2)" : ""}`}>
      <div className="flex justify-between items-center !mb-4">
        <button onClick={goToPreviousMonth} className="bg-[#0F2D6B] text-white font-bold !px-4 !py-2 rounded hover:bg-blue-600 cursor-pointer text-xs">
          Previous
        </button>
        <button onClick={goToNextMonth} className="bg-[#0F2D6B] text-white font-bold !px-4 !py-2 rounded hover:bg-blue-600 cursor-pointer text-xs">
          Next
        </button>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <Calendar
          localizer={localizer}
          date={currentDate}
          onNavigate={setCurrentDate}
          events={events}
          view={currentView}
          onView={setCurrentView}
          views={['month', 'week', 'day', 'agenda']}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: "100%",
            minWidth: "800px",
            border: "none",
            borderColor: "transparent",
            color: darkMode ? "white" : "inherit"
          }}
          onSelectEvent={handleSelectEvent}
          selectable
          components={components}
        />
      </div>
      <EventDetailsModal
        event={selectedEvent}
        isOpen={isDetailsModalOpen}
        user={user}
        onClose={() => setIsDetailsModalOpen(false)}
        onMarkAsDone={handleMarkAsDone}
      />
    </div>
  );
};