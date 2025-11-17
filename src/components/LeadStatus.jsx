import Heading from "./Heading";
import Select from "react-select";
import LeadList from "./LeadList";
import { useLeadContext } from "../contexts/LeadContext";
const LeadStatus = () => {
  const { applyFilters, filters } = useLeadContext();
  const statusEnums = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Closed",
  ];
  const statusOptions = statusEnums.map((stat) => ({
    value: stat,
    label: stat,
  }));

  //   const handleStatusChange = (selectedOption) => {
  //     applyFilters({ status: selectedOption ? selectedOption.value : "" });
  //   };
  return (
    <>
      <div className="lead-status">
        <Heading tag="h2" name="Lead List By Status" />
        <div className={`$`}>
          <LeadList hideHeading />
        </div>
      </div>
    </>
  );
};

export default LeadStatus;
