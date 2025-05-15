import React from 'react';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  icon?: React.ReactNode;
  category?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

      {/* Timeline items */}
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id} className="relative pl-12">
            {/* Dot */}
            <div className="absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-primary-500 flex items-center justify-center">
              {item.icon}
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1">
                <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
              {item.category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-2">
                  {item.category}
                </span>
              )}
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;