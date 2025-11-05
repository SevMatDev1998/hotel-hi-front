import { useEffect, useState } from "react";
import { Button } from "../components/shared/Button";
import { useTranslation } from "../hooks/useTranslation";
import { useAddHotelRoomPartsMutation, useGetRoomPartsQuery } from "../services/rooms";
import InfoBlock from "../components/shared/InfoBlock";
import { HotelRoomPart } from "../types";

interface IModalProps {
  hotelRoomId: string;
  hotelRoomParts?: HotelRoomPart[];
  onSubmit: (payload: any) => void;
  onCancel?: () => void;
}

interface RoomPartState {
  id: string;
  name: string;
  quantity: number;
  selected: boolean;
}

const SelectRoomPartsModal: ModalFC<IModalProps> = ({ hotelRoomId, hotelRoomParts, onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const { data: roomParts } = useGetRoomPartsQuery();
  const [parts, setParts] = useState<RoomPartState[]>([]);
  const [addHotelRoomParts] = useAddHotelRoomPartsMutation();

  // initialize parts when data is fetched
  useEffect(() => {
    if (roomParts) {
      // Group hotelRoomParts by roomPartId
      const partQuantities: Record<number, number> = {};

      hotelRoomParts?.forEach((hp) => {
        const id = hp.roomPartId || hp.roomPartId;
        if (id) {
          partQuantities[id] = (partQuantities[id] || 0) + 1;
        }
      });

      setParts(
        roomParts.map((p: any) => {
          const quantity = partQuantities[p.id] || 1;
          const selected = !!partQuantities[p.id];

          return {
            id: p.id,
            name: p.name,
            quantity,
            selected,
          };
        })
      );
    }
  }, [roomParts, hotelRoomParts]);


  const toggleSelect = (id: string) => {
    setParts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, selected: !p.selected } : p
      )
    );
  };

  const changeQuantity = (id: string, delta: number) => {
    setParts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, quantity: Math.max(1, p.quantity + delta) }
          : p
      )
    );
  };

  const handleConfirm = () => {
    const payload = {
      hotelRoomId,
      roomParts: parts
        .filter((p) => p.selected)
        .map((p) => ({
          roomPartId: p.id,
          quantity: p.quantity,
        })),
    };

    addHotelRoomParts({ hotelRoomId, roomParts: payload.roomParts });
    if (onCancel) onCancel();
  };
  console.log(333, hotelRoomParts);


  return (
    <div className="p-5 flex flex-col space-y-5 ">
      <h3 >
        {t("rooms.select_room_parts")}
      </h3>
      <InfoBlock text="You will have the opportunity to receive reservations during the mentioned period. Also to make changes through price regulation." />
      <div className="flex flex-col gap-2 overflow-y-auto max-h-64 mb-4">
        {parts.map((part) => (
          <label
            key={part.id}
            className="flex items-center justify-between border border-gray-200 rounded-md px-3 py-2 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={part.selected}
                onChange={() => toggleSelect(part.id)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-gray-700 text-sm">
                {t(`room_parts_options.${part.name}`)}
              </span>
            </div>

            {part.selected && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => changeQuantity(part.id, -1)}
                  className="w-6 h-6 border rounded text-gray-500 hover:text-gray-700"
                >
                  -
                </button>
                <span className="w-5 text-center text-sm font-medium">
                  {part.quantity}
                </span>
                <button
                  onClick={() => changeQuantity(part.id, 1)}
                  className="w-6 h-6 border rounded text-gray-500 hover:text-gray-700"
                >
                  +
                </button>
              </div>
            )}
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          onClick={handleConfirm}
        >
          {t("buttons.save")}
        </Button>
      </div>
    </div>
  );
};

export default SelectRoomPartsModal;
