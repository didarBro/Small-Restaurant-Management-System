import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

const EditMenuItem = ({ item, onSaveItem, onCancel }) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description || '');
  const [image, setImage] = useState(item.image || '/api/placeholder/300/200');
  const [previewImage, setPreviewImage] = useState(item.image || '/api/placeholder/300/200');

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
        setImage(event.target.result);
      };
      
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price) {
      onSaveItem({
        ...item,
        name,
        price: parseFloat(price),
        description,
        image
      });
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
      <h3 className="text-lg font-medium mb-3">Edit Menu Item</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="block text-gray-700 mb-1 text-sm" htmlFor="edit-name">Item Name</label>
              <input
                type="text"
                id="edit-name"
                className="w-full p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1 text-sm" htmlFor="edit-price">Price ($)</label>
              <input
                type="number"
                id="edit-price"
                step="0.01"
                min="0"
                className="w-full p-2 border border-gray-300 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1 text-sm" htmlFor="edit-description">Description</label>
              <textarea
                id="edit-description"
                className="w-full p-2 border border-gray-300 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="2"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Item Image</label>
            <div className="mb-2">
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-32">
                {previewImage ? (
                  <img src={previewImage} alt="Food preview" className="object-cover w-full h-full" />
                ) : (
                  <Camera size={32} className="text-gray-400" />
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm flex items-center">
                <Upload size={14} className="mr-1" />
                Change Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMenuItem;