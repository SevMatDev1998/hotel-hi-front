import { useState } from 'react';
import BaseInfoContainer from './BaseInfoContainer';
import BaseInfoEditContainer from './BaseInfoEditContainer';

const BaseInfo = () => {
  const [isEditing, setIsEditing] = useState(false);

  
  return (
    <div>
      {
        isEditing ? <BaseInfoEditContainer setIsEditing={setIsEditing} /> : <BaseInfoContainer setIsEditing={setIsEditing} />
      }
    </div>
  );
};

export default BaseInfo;