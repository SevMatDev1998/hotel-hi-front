import React, { useEffect, useState } from 'react';
import CardContainer from '../../../../public/CardContainer';
import { useTranslation } from '../../../../../hooks/useTranslation';
import { HotelRoom } from '../../../../../types';
import { CreateHotelRoomPriceDto } from '../../../../../types/pricePolicyDto';
import Input from '../../../../../components/shared/Input';
import { Button } from '../../../../../components/shared/Button';

interface IAddRoomPricePolicyRoomProps {
  room: HotelRoom;
  hotelAvailabilityId: number;
  onChange: (data: Omit<CreateHotelRoomPriceDto, 'hotelAvailabilityId'>[]) => void;
  initialData?: (CreateHotelRoomPriceDto & { id: number })[];
}

const AddRoomPricePolicyRoom: React.FC<IAddRoomPricePolicyRoomProps> = ({ 
  room, 
  onChange,
  initialData
}) => {
  const maxGuests = room.mainGuestQuantity + room.additionalGuestQuantity;
  const { t } = useTranslation();
  
  // Определяем, есть ли данные для нескольких гостей
  const hasMultipleGuestPrices = initialData && initialData.length > 1;
  
  // State для раскрытия/закрытия дополнительных строк
  const [isExpanded, setIsExpanded] = useState(hasMultipleGuestPrices || false);
  
  // Создаём объект цен: { guestCount: price }
  const [prices, setPrices] = useState<Record<number, string>>(() => {
    const initialPrices: Record<number, string> = {};
    
    // Инициализируем все возможные guestCount пустыми строками
    for (let i = 1; i <= maxGuests; i++) {
      initialPrices[i] = '';
    }
    
    // Если есть initialData, заполняем существующие цены
    if (initialData && initialData.length > 0) {
      initialData.forEach(item => {
        initialPrices[item.guestCount] = item.price.toString();
      });
    }
    
    return initialPrices;
  });

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const newPrices: Record<number, string> = {};
      for (let i = 1; i <= maxGuests; i++) {
        newPrices[i] = '';
      }
      initialData.forEach(item => {
        newPrices[item.guestCount] = item.price.toString();
      });
      setPrices(newPrices);
    }
  }, [initialData, maxGuests]);

  useEffect(() => {
    // Формируем массив цен
    const roomPrices: Omit<CreateHotelRoomPriceDto, 'hotelAvailabilityId'>[] = [];
    
    if (isExpanded) {
      // Если раскрыто - ПРОВЕРЯЕМ, что ВСЕ поля заполнены
      let allFilled = true;
      for (let guestCount = 1; guestCount <= maxGuests; guestCount++) {
        const priceValue = prices[guestCount];
        if (!priceValue || priceValue === '' || Number(priceValue) <= 0) {
          allFilled = false;
          break;
        }
      }
      
      // Если все заполнены - формируем массив
      if (allFilled) {
        for (let guestCount = 1; guestCount <= maxGuests; guestCount++) {
          roomPrices.push({
            hotelRoomId: Number(room.id),
            guestCount,
            price: Number(prices[guestCount]),
          });
        }
      }
      // Если НЕ все заполнены - отправляем пустой массив (ошибка будет показана)
    } else {
      // Если свернуто - отправляем только цену для maxGuests
      const maxGuestPrice = prices[maxGuests];
      if (maxGuestPrice && maxGuestPrice !== '' && Number(maxGuestPrice) > 0) {
        roomPrices.push({
          hotelRoomId: Number(room.id),
          guestCount: maxGuests,
          price: Number(maxGuestPrice),
        });
      }
    }

    onChange(roomPrices);
  }, [prices, isExpanded, maxGuests, room.id, onChange]);

  const handlePriceChange = (guestCount: number, value: string) => {
    setPrices(prev => ({
      ...prev,
      [guestCount]: value
    }));
  };

  return (
    <CardContainer className='rounded-md p-4'>
      <table className="min-w-full border text-center">
        <thead>
          <tr>
            <th className="border px-4 py-2">{t('price_policy.number_of_guests_in_room')}</th>
            <th className="border px-4 py-2">{t('price_policy.price')}</th>
          </tr>
        </thead>
        <tbody>
          {isExpanded ? (
            // Показываем все строки
            Array.from({ length: maxGuests }, (_, index) => {
              const guestCount = index + 1;
              return (
                <tr key={guestCount}>
                  <td className="border px-4 py-2">{guestCount} {t('price_policy.guest', { count: guestCount })}</td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      className="w-full"
                      value={prices[guestCount] || ''}
                      onChange={(e) => handlePriceChange(guestCount, e.target.value)}
                      label=''
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            // Показываем только одну строку для максимального количества гостей
            <tr>
              <td className="border px-4 py-2">{maxGuests} {t('price_policy.guest', { count: maxGuests })}</td>
              <td className="border px-4 py-2">
                <Input
                  type="number"
                  className="w-full"
                  value={prices[maxGuests] || ''}
                  onChange={(e) => handlePriceChange(maxGuests, e.target.value)}
                  label=''
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
        <div className="mt-3">
          <Button 
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full"
          >
            {isExpanded 
              ? t('price_policy.hide_flexible_prices') 
              : t('price_policy.add_flexible_prices')
            }
          </Button>
        </div>
    </CardContainer>
  );
};

export default AddRoomPricePolicyRoom;
