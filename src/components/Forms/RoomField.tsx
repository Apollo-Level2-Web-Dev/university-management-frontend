import { useRoomsQuery } from "@/redux/api/roomApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type RoomProps = {
  name: string;
  label?: string;
};

const RoomField = ({ name }: RoomProps) => {
  const { data, isLoading } = useRoomsQuery({
    limit: 100,
    page: 1,
  });
  const rooms = data?.rooms;
  const roomsOptions = rooms?.map((room) => {
    // console.log(room);
    return {
      label: room?.roomNumber,
      value: room?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label="Room"
      options={roomsOptions as SelectOptions[]}
    />
  );
};

export default RoomField;
