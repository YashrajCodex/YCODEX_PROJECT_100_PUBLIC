
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Link, Calendar, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Goal } from '../Interface/GlobalInterface';

interface AddEditGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Omit<Goal, 'id'>) => void;
  editingGoal: Goal | null;
}

const AddEditGoalModal: React.FC<AddEditGoalModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingGoal,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    deadline: '',
    completionDate: '',
    progress: 0,
    status: 'in-progress' as const,
    noteLinks: [{ url: '', title: '' }],
    isStarred: false,
  });

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title,
        description: editingGoal.description,
        startDate: editingGoal.startDate,
        deadline: editingGoal.deadline,
        completionDate: editingGoal.completionDate || '',
        progress: editingGoal.progress,
        status: editingGoal.status,
        noteLinks: editingGoal.noteLinks.length > 0 ? editingGoal.noteLinks : [{ url: '', title: '' }],
        isStarred: editingGoal.isStarred,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        deadline: '',
        completionDate: '',
        progress: 0,
        status: 'in-progress',
        noteLinks: [{ url: '', title: '' }],
        isStarred: false,
      });
    }
  }, [editingGoal, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.deadline) return;

    const filteredNoteLinks = formData.noteLinks.filter(link => link.url.trim() !== '');
    
    onSave({
      ...formData,
      noteLinks: filteredNoteLinks,
    });
  };

  const addNoteLink = () => {
    setFormData(prev => ({
      ...prev,
      noteLinks: [...prev.noteLinks, { url: '', title: '' }],
    }));
  };

  const removeNoteLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      noteLinks: prev.noteLinks.filter((_, i) => i !== index),
    }));
  };

  const updateNoteLink = (index: number, field: 'url' | 'title', value: string) => {
    setFormData(prev => ({
      ...prev,
      noteLinks: prev.noteLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingGoal ? 'Edit Goal' : 'Add New Goal'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter goal title..."
                  required
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your goal..."
                  rows={4}
                  className="border border-gray-300 rounded-lg px-4 py-3 w-full resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Start Date *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                    Deadline *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="progress" className="block text-sm font-medium text-gray-700">
                  Progress: {formData.progress}%
                </Label>
                <input
                  id="progress"
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none slider"
                />
              </div>

              {formData.status === 'completed' && (
                <div className="space-y-1">
                  <Label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">
                    Completion Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                      id="completionDate"
                      type="date"
                      value={formData.completionDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, completionDate: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Link size={20} className="text-gray-600" />
                  <Label className="text-sm font-medium text-gray-700">Note Links</Label>
                </div>
                
                {formData.noteLinks.map((link, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => updateNoteLink(index, 'url', e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Title (optional)"
                      value={link.title}
                      onChange={(e) => updateNoteLink(index, 'title', e.target.value)}
                      className="flex-1"
                    />
                    {formData.noteLinks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeNoteLink(index)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addNoteLink}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
                >
                  <Plus size={16} />
                  Add another link
                </button>
              </div>

              <div className="flex gap-3 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 flex items-center gap-2"
                >
                  <Save size={16} />
                  {editingGoal ? 'Update Goal' : 'Create Goal'}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddEditGoalModal;
