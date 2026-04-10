'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiMove, FiTrash2, FiEdit2, FiPlus } from 'react-icons/fi';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

export interface HomepageSection {
  id: string;
  type: 'hero' | 'features' | 'testimonials' | 'faq' | 'cta';
  title: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
}

interface SortableItemProps {
  id: string;
  section: HomepageSection;
  onUpdate: (id: string, updates: Partial<HomepageSection>) => void;
  onDelete: (id: string) => void;
}

const SortableSectionItem = ({ id, section, onUpdate, onDelete }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const [isEditing, setIsEditing] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-4 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-4 p-4 bg-slate-50 border-b border-slate-100">
        <div {...attributes} {...listeners} className="cursor-grab p-2 text-slate-400 hover:text-slate-600">
          <FiMove size={20} />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-slate-800">{section.title}</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-white inline-block px-2 py-0.5 rounded-full border border-slate-200">{section.type}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => onUpdate(id, { isActive: !section.isActive })} className={`px-3 py-1 rounded-full text-xs font-bold ${section.isActive ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-500'}`}>
            {section.isActive ? 'Active' : 'Hidden'}
          </button>
          <button onClick={() => setIsEditing(!isEditing)} className="p-2 text-slate-400 hover:text-blue-500 transition-colors">
            <FiEdit2 size={18} />
          </button>
          <button onClick={() => onDelete(id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
      
      {isEditing && (
        <div className="p-6 space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Section Title</label>
            <input 
              type="text" 
              value={section.title} 
              onChange={e => onUpdate(id, { title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:ring-2 focus:ring-primary/20" 
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Section Content</label>
            <RichTextEditor value={section.description} onChange={val => onUpdate(id, { description: val })} />
          </div>
        </div>
      )}
    </div>
  );
};

export const HomepageSectionBuilder = ({ sections, onChange }: { sections: HomepageSection[], onChange: (sections: HomepageSection[]) => void }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex(s => s.id === active.id);
      const newIndex = sections.findIndex(s => s.id === over?.id);
      onChange(arrayMove(sections, oldIndex, newIndex));
    }
  };

  const handleAddSection = () => {
    const newSection: HomepageSection = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'hero',
      title: 'New Hero Section',
      description: '<p>Edit this content...</p>',
      isActive: true,
    };
    onChange([...sections, newSection]);
  };

  const handleUpdate = (id: string, updates: Partial<HomepageSection>) => {
    onChange(sections.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleDelete = (id: string) => {
    onChange(sections.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <button onClick={handleAddSection} className="px-4 py-2 bg-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-purple-500/20 flex items-center gap-2 hover:bg-purple-600 transition-colors">
          <FiPlus /> Add Section
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
          {sections.map(section => (
            <SortableSectionItem 
              key={section.id} 
              id={section.id} 
              section={section} 
              onUpdate={handleUpdate} 
              onDelete={handleDelete} 
            />
          ))}
        </SortableContext>
      </DndContext>
      
      {sections.length === 0 && (
        <div className="p-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
           <p className="text-slate-400 font-bold italic">No sections added yet. Click &quot;Add Section&quot; to begin building your homepage.</p>
        </div>
      )}
    </div>
  );
};
