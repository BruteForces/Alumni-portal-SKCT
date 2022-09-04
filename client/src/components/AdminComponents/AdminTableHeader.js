import Divider from "components/UI/Divider";
import React, { useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import {MdDownload} from "react-icons/md"
import { FiSearch } from "react-icons/fi";
import Styles from "./AdminTableHeader.module.css";
import Select from "react-select";
import FilterModal from "./FilterModal";
import { useAlertContext } from "context/alert/alertContext";

const AdminTableHeader = ({
  onSelect,
  type,
  filters,
  onApplyFilter,
  onSearch,
}) => {
  const [selectedCount, setSelectedCount] = useState(10);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { success } = useAlertContext();
  const onChangeHandler = ({ value }) => {
    setSelectedCount(value);
    onSelect(value);
  };

  const handleClose = () => {
    setIsFilterModalOpen(false);
  };

  const handleOnSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <>
      <FilterModal
        onApplyFilter={onApplyFilter}
        isFilterModalOpen={isFilterModalOpen}
        handleClose={handleClose}
        filters={filters}
      />

      <p className={Styles.table_header}>{type} (beta)</p>
      <Divider mb={".6em"} mt={0} bgColor={"#ADADAD"} />
      <div className={Styles.table_controls}>
        <div className={Styles.search}>
          <FiSearch onClick={handleOnSearch} />
          <input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
        </div>
        <div className={Styles.table_actions}>
          <button
            onClick={() => {
              setIsFilterModalOpen(true);
            }}
          >
            Filter <FaFilter />
          </button>
          <button>
            Csv
            <MdDownload fontSize={18}
            onClick={() => {
              success("Feature will be enabled soon");
            }}/>
          </button>
        </div>
      </div>
      <Divider mt={".6em"} mb={".6em"} bgColor={"#ADADAD"} />
      <div className={Styles.table_info_handler}>
        <p className={Styles.no_of_results}>Showing 1-10 of 1000 results</p>
        <div className={Styles.results_count_changer}>
          <span>Results Per Page</span>
          <Select
            options={getOptionsForPages()}
            placeholder={null}
            value={{
              value: selectedCount,
              label: selectedCount,
            }}
            styles={{
              indicatorSeparator: () => null,
              control: (provided, state) => ({
                ...provided,
                borderRadius: "5em",
              }),
              singleValue: (provided, state) => ({
                ...provided,
                fontWeight: "bold",
              }),
            }}
            onChange={onChangeHandler}
            defaultValue={{ value: selectedCount, label: selectedCount }}
          />
        </div>
      </div>
    </>
  );
};

const getOptionsForPages = () => {
  return [...Array(10).keys()].map((ele) => ({
    value: (ele + 1) * 10,
    label: (ele + 1) * 10,
  }));
};

const getStylesForPages = () => {};

export default AdminTableHeader;
