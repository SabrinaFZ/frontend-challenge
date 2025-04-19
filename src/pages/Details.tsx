import { useParams } from "react-router";
import { Details as DetailsComponent } from "@/features/details/Details";

const Details = () => {
  const { id } = useParams<{ id: string }>();

  return <DetailsComponent id={id as string} />;
};

export default Details;
