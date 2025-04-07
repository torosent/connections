import React from 'react';
import { ConnectionGroup, GROUP_COLORS } from '@/types';

interface GroupDisplayProps {
  group: ConnectionGroup;
}

const GroupDisplay: React.FC<GroupDisplayProps> = ({ group }) => {
  const colorInfo = GROUP_COLORS[group.level as keyof typeof GROUP_COLORS];
  
  return (
    <div 
      className="mb-2 p-2 rounded-md w-full text-center"
      style={{ 
        backgroundColor: colorInfo.bg,
        color: colorInfo.text,
        border: group.level === 0 ? '1px solid rgba(0,0,0,0.2)' : 'none'
      }}
    >
      <div className="text-sm uppercase font-bold mb-1">{group.group}</div>
      <div className="grid grid-cols-4 gap-1 text-xs">
        {group.members.map((member, index) => (
          <div key={index} className="text-center">
            {member}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupDisplay;