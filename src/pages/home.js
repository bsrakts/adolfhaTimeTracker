import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TimeLogList from "../components/layout/timeLogList";
import { fetchLogs, saveLog } from "../features/logs/logsSlice";
import Timer from "../components/layout/timer";
import Header from "../components/layout/header";

const HomePage = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logs.items);
  const logStatus = useSelector((state) => state.logs.status);
  const error = useSelector((state) => state.logs.error);
  const [isActive, setIsActive] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const [currentNote, setCurrentNote] = useState("");
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (logStatus === "idle" && userId) {
      dispatch(fetchLogs(userId));
    }
  }, [logStatus, dispatch, userId]);

  const handleSaveTime = async (duration, name, note) => {
    try {
      if (userId) {
        await dispatch(saveLog({ duration, name, note, user_id: userId }));
        console.log(userId);
        dispatch(fetchLogs(userId));
      } else {
        console.error("No user logged in or user ID is missing");
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <Timer
          onSave={handleSaveTime}
          isActive={isActive}
          onToggle={setIsActive}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
        />
        {logStatus === "loading" ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <TimeLogList logs={logs} />
        )}
      </div>
    </>
  );
};

export default HomePage;
