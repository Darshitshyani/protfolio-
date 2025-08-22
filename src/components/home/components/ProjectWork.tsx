import React from "react";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import { FolderCopy } from "@mui/icons-material";

const ProjectWork = () => {
  return (
    <div className="w-full mb-[40px] px-4 animate-slide-out">
      <div className="flex flex-wrap gap-5 items-center justify-center md:justify-around">
        {/* Item 1 */}
        <div className="flex items-center gap-4 sm:gap-2">
          <div className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] flex items-center justify-center border rounded-full text-pink-500 shadow-lg bg-pink-100 border-pink-600">
            <HomeWorkIcon
              style={{ fontSize: "40px" }}
              className="sm:text-[50px]"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-semibold text-[16px] sm:text-[18px]">
              3+ Years in
            </h3>
            <h3 className="font-semibold text-[16px] sm:text-[18px]">
              Industry
            </h3>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-center gap-4 sm:gap-2">
          <div className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] flex items-center justify-center border rounded-full text-pink-500 shadow-lg bg-pink-100 border-pink-600">
            <SignalCellularAltIcon
              style={{ fontSize: "40px" }}
              className="sm:text-[50px]"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-semibold text-[16px] sm:text-[18px]">
              10+ Happy
            </h3>
            <h3 className="font-semibold text-[16px] sm:text-[18px]">
              Clients
            </h3>
          </div>
        </div>

        {/* Item 3 */}
        {/* <div className="flex items-center gap-4 sm:gap-2">
            <div className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] flex items-center justify-center border rounded-full text-pink-500 shadow-lg bg-pink-100 border-pink-600">
              <SignalCellularAltIcon
                style={{ fontSize: "40px" }}
                className="sm:text-[50px]"
              />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="font-semibold text-[16px] sm:text-[18px]">
                10+ Expert
              </h3>
              <h3 className="font-semibold text-[16px] sm:text-[18px]">
                Employees
              </h3>
            </div>
          </div> */}

        {/* Item 4 */}
        <div className="flex items-center gap-4 sm:gap-2">
          <div className="w-[75px] h-[75px] sm:w-[85px] sm:h-[85px] flex items-center justify-center border rounded-full text-pink-500 shadow-lg bg-pink-100 border-pink-600">
            <FolderCopy
              style={{ fontSize: "40px" }}
              className="sm:text-[50px]"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-semibold text-[16px] sm:text-[18px]">
              20+ Completed
            </h3>
            <h3 className="font-semibold text-[16px] sm:text-[18px]">
              Projects
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectWork;
