import { useState } from "react";

const CarStatusToggle = ({ car, toggleCarStatus }) => {
  const [isChecked, setIsChecked] = useState(car.status === "in-service");

  const handleToggle = () => {
    // Toggle the state
    const newStatus = isChecked ? "in-service" : "available";
    setIsChecked(!isChecked);
    toggleCarStatus(car._id, newStatus);
  };

  return (
    <td className="px-4 py-2 border-b font-light text-[15px] mq750:hidden">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={handleToggle}
        />
        <div
          className={`group peer bg-red-500 rounded-full w-16 h-8 ring-0.5 
            ${isChecked ? 'ring-green-500 bg-green-500' : 'ring-red-500 bg-red-500'}
            transition-colors duration-300 ease-in-out`}
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ease-in-out
              ${isChecked ? 'translate-x-8' : 'translate-x-0'}
            `}
          ></div>
        </div>
      </label>
    </td>
  );
};

export default CarStatusToggle;
