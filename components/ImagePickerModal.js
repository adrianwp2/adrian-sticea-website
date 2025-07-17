"use client";

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ImagePickerModal({ 
    isOpen, 
    onClose, 
    onSelect, 
    title = "Choose Image",
    multiple = false 
}) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (isOpen) {
            fetchImages();
        }
    }, [isOpen]);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/images');
            if (res.ok) {
                const data = await res.json();
                setImages(data.images || []);
            } else {
                toast.error('Failed to fetch images');
            }
        } catch (error) {
            toast.error('Failed to fetch images');
        } finally {
            setLoading(false);
        }
    };

    const handleImageSelect = (image) => {
        if (multiple) {
            setSelectedImages(prev => {
                const isSelected = prev.find(img => img.filename === image.filename);
                if (isSelected) {
                    return prev.filter(img => img.filename !== image.filename);
                } else {
                    return [...prev, image];
                }
            });
        } else {
            onSelect(image.filename);
            onClose();
        }
    };

    const handleConfirm = () => {
        if (multiple && selectedImages.length > 0) {
            onSelect(selectedImages.map(img => img.filename));
        }
        onClose();
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const filteredImages = images.filter(image => 
        image.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost"
                    >
                        ×
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b">
                    <input
                        type="text"
                        placeholder="Search images..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-success w-full bg-transparent"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex items-center justify-center h-32">
                            <span className="loading loading-spinner loading-lg"></span>
                            <span className="ml-2">Loading images...</span>
                        </div>
                    ) : filteredImages.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            {searchTerm ? 'No images found matching your search.' : 'No images available.'}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredImages.map((image) => {
                                const isSelected = multiple 
                                    ? selectedImages.find(img => img.filename === image.filename)
                                    : false;

                                return (
                                    <div
                                        key={image.filename}
                                        className={`relative cursor-pointer rounded-md border-1 transition-all hover:shadow-md ${
                                            isSelected 
                                                ? 'border-primary bg-primary/10' 
                                                : 'border-gray-200 hover:border-primary/50'
                                        }`}
                                        onClick={() => handleImageSelect(image)}
                                    >
                                        <img
                                            src={`/${image.filename}`}
                                            alt={image.name}
                                            className="w-full h-32 object-cover rounded-md"
                                        />
                                        <div className="p-2">
                                            <p className="text-sm font-medium truncate" title={image.name}>
                                                {image.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatFileSize(image.size)}
                                            </p>
                                        </div>
                                        {isSelected && (
                                            <div className="absolute top-2 right-2">
                                                <div className="bg-primary text-primary-content rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                                    ✓
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {multiple && (
                    <div className="flex justify-between items-center p-4 border-t">
                        <span className="text-sm text-gray-600">
                            {selectedImages.length} image(s) selected
                        </span>
                        <div className="space-x-2">
                            <button
                                onClick={onClose}
                                className="btn btn-outline"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="btn btn-primary"
                                disabled={selectedImages.length === 0}
                            >
                                Select Images
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 