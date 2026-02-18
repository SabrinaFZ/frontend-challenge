import { useParams } from "react-router";
import { WorkshopDetails } from "@/features/workshop-details/WorkshopDetails";

const WorkshopDetail = () => {
  const { id } = useParams<{ id: string }>();

  return <WorkshopDetails id={id as string} />;
};

export default WorkshopDetail;
