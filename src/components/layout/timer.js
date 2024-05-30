import { CirclePlay, Save, StopCircleIcon, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import Button from "../common/button";

const Timer = ({
  onSave,
  isActive,
  onToggle,
  currentTask,
  setCurrentTask,
  currentNote,
  setCurrentNote,
}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleToggle = () => {
    onToggle(!isActive);
  };

  const handleSave = () => {
    onSave(seconds, currentTask, currentNote);
    setSeconds(0);
    setCurrentTask("");
    setCurrentNote("");
  };

  const handleReset = () => {
    setSeconds(0);
    setCurrentTask("");
    setCurrentNote("");
  };

  return (
    <div className="timer bg-white rounded-2xl border-stone-200 mb-8 -mt-8">
      <div className="timer-header flex flex-col items-center mb-4">
        <div className="timer-display text-center text-[5rem] font-semibold text-stone-800 bg-gray-100 px-8 py-0 rounded-full border border-stone-800 shadow-md shadow-stone-200">
          {new Date(seconds * 1000).toISOString().substr(11, 8)}
        </div>
        <div className="timer-controls flex mb-5 mt-5 gap-x-8">
          <Button
            onClick={handleToggle}
            className={
              isActive
                ? "text-red-500 bg-red-200"
                : "text-green-500 bg-green-200"
            }
            icon={isActive ? StopCircleIcon : CirclePlay}
          />
          <Button
            onClick={handleSave}
            className="text-blue-500 bg-blue-200"
            icon={Save}
          />
          <Button
            onClick={handleReset}
            className="text-orange-500 bg-orange-200"
            icon={Trash2}
          />
        </div>
        <div className="md:w-1/4 w-full flex flex-col gap-y-4">
          <input
            type="text"
            placeholder="Şu anda ne yapıyorsunuz?"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            className="mr-2 border py-2 text-xs italic w-full rounded-xl px-2 placeholder-gray-400"
          />
          <textarea
            placeholder="Not eklemek ister misiniz?"
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            className="border text-xs italic w-full rounded-xl px-2 py-2 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;
