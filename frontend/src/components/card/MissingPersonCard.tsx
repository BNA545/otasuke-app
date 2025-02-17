import React from 'react';
import { MapPin } from 'lucide-react';
import { MissingPerson } from '../../types';

interface MissingPersonCardProps {
  data: MissingPerson;
}

const MissingPersonCard: React.FC<MissingPersonCardProps> = ({ data }) => {
  return (
    <div className="bg-white border rounded-lg hover:shadow-lg transition-shadow">
      <div className="border-b border-gray-100 p-4">
        <h3 className="text-lg font-medium text-gray-900">{data.title}</h3>
      </div>
      <div className="p-4">
        <div className="flex gap-4">
          <div className="w-32 h-40 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {data.photos[0] ? (
              <img
                src={data.photos[0]}
                alt={data.name}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-400">写真</span>
            )}
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-gray-600 text-sm line-clamp-3">
              {data.description}
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">名前：</span>
                {data.name}（{data.age}歳・{data.gender === 'male' ? '男性' : '女性'}）
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin size={14} className="text-teal-500 mr-1" />
                {data.lastSeenLocation}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">最終目撃：</span>
                {new Date(data.lastSeenDate).toLocaleString()}
              </p>
              {data.hasReward && (
                <p className="text-sm text-teal-600 font-medium">
                  報奨金: {data.rewardAmount?.toLocaleString()}円
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissingPersonCard;