import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllLogs, deleteLog } from "../../features/logs/logsSlice";
import { Pencil, Trash2 } from "lucide-react";
import Badge from "../common/badge";
import Button from "../common/button";

const TimeLogList = ({ logs }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);

  const handleDelete = (logId) => {
    dispatch(deleteLog(logId));
  };

  const handleDeleteAll = () => {
    dispatch(deleteAllLogs(userId));
  };

  const disabled = logs.length > 0 ? false : true;
  return (
    <div className="log-list rounded py-4 my-4">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold ml-4">Aktiviteler</h2>
        <Button
          onClick={handleDeleteAll}
          text={"Aktiviteleri Sil"}
          className={`${
            disabled
              ? "bg-stone-300 text-stone-500 cursor-not-allowed"
              : "bg-red-100 text-red-500"
          } !px-4 rounded-full !py-2 text-sm`}
        />
      </div>
      {logs.length > 0 ? (
        <ul>
          {logs.map((log, index) => (
            <li
              key={index}
              className="log-item flex flex-col md:flex-row justify-between items-center p-4 border mb-4 rounded-2xl gap-y-8 md:gap-y-0"
            >
              <div className="flex flex-col gap-y-2">
                <p className="log-name font-extrabold text-xl capitalize text-stone-800 flex-wrap">
                  {log.name || "Unnamed Task"}
                </p>
                <p className="log-note text-sm flex items-center text-stone-600 flex-wrap">
                  <Pencil className="h-4" />
                  {log.note || "No additional notes"}
                </p>
              </div>
              <div className="flex items-center gap-x-4">
                <Badge
                  text={new Date(log.duration * 1000)
                    .toISOString()
                    .substr(11, 8)}
                  className="bg-purple-300 bg-opacity-50 text-purple-600"
                />
                <Badge
                  text={new Date(log.created_at).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                  className="bg-green-200 text-green-700"
                />
                <Button
                  onClick={() => handleDelete(log.id)}
                  className="bg-orange-200 text-orange-500 !p-2 text-xs rounded-full"
                  icon={Trash2}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex w-full justify-center my-32 text-red-500 font-bold">
          Listelenecek aktivite bulunamadı.
        </p>
      )}
    </div>
  );
};

export default TimeLogList;
