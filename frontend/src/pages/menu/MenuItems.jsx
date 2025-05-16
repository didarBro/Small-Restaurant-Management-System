import { Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import EditMenuItem from './EditMenuItem';

// Component to display a single menu item
const MenuItem = ({ item, onEdit, isEditing, editingItem, onSaveItem, onCancelEdit }) => {
  const [isViewingImage, setIsViewingImage] = useState(false);

  if (isEditing && editingItem && editingItem.id === item.id) {
    return <EditMenuItem item={item} onSaveItem={onSaveItem} onCancel={onCancelEdit} />;
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="mr-4 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {item.image && (
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover cursor-pointer" 
              onClick={() => setIsViewingImage(true)}
            />
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">{item.name}</h3>
            <span className="font-bold text-green-700">${item.price.toFixed(2)}</span>
          </div>
          
          {item.description && (
            <p className="text-gray-600 mt-1">{item.description}</p>
          )}
          
          <div className="mt-3 flex justify-end space-x-3">
            <button
              onClick={() => setIsViewingImage(true)}
              className="flex items-center text-purple-600 hover:text-purple-800"
            >
              <Eye size={16} className="mr-1" /> View
            </button>
            
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <Edit size={16} className="mr-1" /> Edit
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Image Viewer Modal */}
      {isViewingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsViewingImage(false)}>
          <div className="bg-white p-4 rounded-lg max-w-2xl max-h-full overflow-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-2">{item.name} - ${item.price.toFixed(2)}</h3>
            <div className="mb-4">
              <img src={item.image} alt={item.name} className="w-full rounded-lg" />
            </div>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
              onClick={() => setIsViewingImage(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Component to display a list of menu items
const MenuItemList = ({ 
  items, 
  onEdit, 
  editingItem, 
  onSaveItem, 
  onCancelEdit 
}) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No menu items available for this date.
      </div>
    );
  }

  return (
    <div>
      {items.map(item => (
        <MenuItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          isEditing={!!editingItem}
          editingItem={editingItem}
          onSaveItem={onSaveItem}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </div>
  );
};

export { MenuItem, MenuItemList };