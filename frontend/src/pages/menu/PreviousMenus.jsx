import { useState } from 'react';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

const PreviousMenus = ({ previousDates, menuItems, onSelectDate, formatDateForDisplay }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Previous Menus</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {previousDates.map(date => (
          <button
            key={date}
            onClick={() => onSelectDate(date)}
            className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100"
          >
            <span className="flex items-center">
              <Clock size={18} className="mr-2 text-gray-600" />
              {formatDateForDisplay(date)}
            </span>
            <span className="text-blue-600">{menuItems[date]?.length || 0} items</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const PreviousMenuDisplay = ({ 
  selectedDate, 
  menuItems, 
  formatDateForDisplay, 
  onBack 
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Calendar size={20} className="mr-2 text-gray-600" />
          {formatDateForDisplay(selectedDate)}
        </h2>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-4">Previous Menu Items</h3>
        
        {(menuItems[selectedDate]?.length > 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems[selectedDate].map(item => (
              <div key={item.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex mb-3">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <span className="font-bold text-green-700">${item.price.toFixed(2)}</span>
                    </div>
                    {item.description && (
                      <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No menu items available for this date.
          </div>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Previous Menus
        </button>
      </div>
    </>
  );
};

export { PreviousMenus, PreviousMenuDisplay };