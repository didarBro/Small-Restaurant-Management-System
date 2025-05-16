import { useState } from 'react';
import { Calendar, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import dummyMenuItems from '../../data/dummyData'; // Dummy data for menu items
import AddMenuItem from './AddMenuItem';
import { MenuItemList } from './MenuItems';
import { PreviousMenus, PreviousMenuDisplay } from './PreviousMenus';

// Main Food Menu component
const FoodMenu = () => {
  const [menuItems, setMenuItems] = useState(dummyMenuItems);
  const [currentDate, setCurrentDate] = useState('2025-05-17');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isShowingPrevious, setIsShowingPrevious] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [previousDates, setPreviousDates] = useState(Object.keys(dummyMenuItems).sort().reverse());
  const [selectedPreviousDate, setSelectedPreviousDate] = useState(null);

  // Format date for display (e.g., "Saturday, May 17, 2025")
  const formatDateForDisplay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handler for adding a new menu item
  const handleAddItem = (newItem) => {
    setMenuItems(prev => ({
      ...prev,
      [currentDate]: [...(prev[currentDate] || []), newItem]
    }));
    setIsAddingItem(false);
  };

  // Handler for editing a menu item
  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  // Handler for saving edited menu item
  const handleSaveItem = (updatedItem) => {
    setMenuItems(prev => ({
      ...prev,
      [currentDate]: prev[currentDate].map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    }));
    setEditingItem(null);
  };

  // Navigate to previous or next date
  const navigateDate = (direction) => {
    const sortedDates = Object.keys(menuItems).sort();
    const currentIndex = sortedDates.indexOf(currentDate);

    if (direction === 'prev' && currentIndex > 0) {
      setCurrentDate(sortedDates[currentIndex - 1]);
    } else if (direction === 'next' && currentIndex < sortedDates.length - 1) {
      setCurrentDate(sortedDates[currentIndex + 1]);
    }
  };

  // Toggle view for showing previous dates
  const togglePreviousView = () => {
    setIsShowingPrevious(!isShowingPrevious);
    setSelectedPreviousDate(null);
  };

  // Select a previous date to view
  const handleSelectPreviousDate = (date) => {
    setSelectedPreviousDate(date);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Restaurant Menu Manager</h1>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-6">
        <button 
          onClick={() => setIsAddingItem(!isAddingItem)}
          className={`flex items-center px-4 py-2 rounded-lg ${isAddingItem ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
        >
          {isAddingItem ? 'Cancel' : <><Plus size={18} className="mr-2" /> Add Menu Item</>}
        </button>
        
        <button 
          onClick={togglePreviousView}
          className={`flex items-center px-4 py-2 rounded-lg ${isShowingPrevious ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gray-600 hover:bg-gray-700'} text-white transition-colors`}
        >
          <Calendar size={18} className="mr-2" />
          {isShowingPrevious ? 'Current Menu' : 'Previous Menus'}
        </button>
      </div>

      {/* Add New Menu Item Form */}
      {isAddingItem && (
        <AddMenuItem 
          onAddItem={handleAddItem} 
          onCancel={() => setIsAddingItem(false)}
        />
      )}

      {/* Previous Dates Selection */}
      {isShowingPrevious && !selectedPreviousDate && (
        <PreviousMenus 
          previousDates={previousDates}
          menuItems={menuItems}
          onSelectDate={handleSelectPreviousDate}
          formatDateForDisplay={formatDateForDisplay}
        />
      )}

      {/* Menu Display */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {!isShowingPrevious || selectedPreviousDate ? (
          <>
            {selectedPreviousDate ? (
              <PreviousMenuDisplay 
                selectedDate={selectedPreviousDate}
                menuItems={menuItems}
                formatDateForDisplay={formatDateForDisplay}
                onBack={() => setSelectedPreviousDate(null)}
              />
            ) : (
              <>
                {/* Date Navigation */}
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={() => navigateDate('prev')}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  
                  <h2 className="text-2xl font-semibold flex items-center">
                    <Calendar size={20} className="mr-2 text-gray-600" />
                    {formatDateForDisplay(currentDate)}
                  </h2>
                  
                  <button 
                    onClick={() => navigateDate('next')}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* Menu Items List */}
                <div>
                  <h3 className="text-xl font-medium mb-4">Today's Menu Items</h3>
                  
                  <MenuItemList 
                    items={menuItems[currentDate]}
                    onEdit={handleEditItem}
                    editingItem={editingItem}
                    onSaveItem={handleSaveItem}
                    onCancelEdit={() => setEditingItem(null)}
                  />
                </div>
              </>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Select a date to view the menu.
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;