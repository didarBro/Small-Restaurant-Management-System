import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

const AddMenuItem = ({ onAddItem, onCancel }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/api/placeholder/300/200');
  const [previewImage, setPreviewImage] = useState('/api/placeholder/300/200');

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
      onAddItem({
        id: Date.now(),
        name,
        price: parseFloat(price),
        description,
        image: previewImage
      });
      setName('');
      setPrice('');
      setDescription('');
      setImage('/api/placeholder/300/200');
      setPreviewImage('/api/placeholder/300/200');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">Item Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="price">Price ($)</label>
              <input
                type="number"
                id="price"
                step="0.01"
                min="0"
                className="w-full p-2 border border-gray-300 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="description">Description (Optional)</label>
              <textarea
                id="description"
                className="w-full p-2 border border-gray-300 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Item Image</label>
            <div className="mb-3">
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center h-48">
                {previewImage ? (
                  <img src={previewImage} alt="Food preview" className="object-cover w-full h-full" />
                ) : (
                  <Camera size={48} className="text-gray-400" />
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center">
                <Upload size={18} className="mr-2" />
                Upload Image
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
        
        <div className="flex justify-end space-x-2 mt-6">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenuItem;