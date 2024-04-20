import React from "react";

function IncreamentBox({
  tourPackage,
  mainText,
  persons,
  totalPersons,
  inc,
  dec,
}) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-lg ">{mainText}</p>
      </div>
      <div className="flex justify-center gap-5 items-center">
        <div>
          <button
            className="btn btn-circle "
            onClick={inc}
            disabled={totalPersons == tourPackage.personsAllowed}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
              ></path>
            </svg>
          </button>
        </div>
        <div>
          {totalPersons === 1 && mainText === "Persons"
            ? totalPersons
            : persons}
        </div>
        <div>
          <button
            className="btn btn-circle"
            onClick={dec}
            disabled={mainText === "Persons" && totalPersons === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M19 12.998H5v-2h14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default IncreamentBox;
