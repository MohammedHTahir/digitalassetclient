import { ReactNode } from "react";

export interface ActivityItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  timestamp: string;
}

export function ActivityItem({ icon, title, description, timestamp }: ActivityItemProps) {
    return (
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
        </div>
      </div>
    );
  }