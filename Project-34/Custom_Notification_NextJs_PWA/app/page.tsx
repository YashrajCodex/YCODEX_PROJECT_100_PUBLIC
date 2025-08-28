'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useNotifications, Notification } from '@/hooks/useNotifications';
import Header from '@/components/Header';
import NotificationCard from '@/components/NotificationCard';
import NotificationForm from '@/components/NotificationForm';
import FilterSort, { FilterType, SortType } from '@/components/FilterSort';
import EmptyState from '@/components/EmptyState';
import Modal from '@/components/Modal';

export default function Home() {
  const {
    notifications,
    addNotification,
    updateNotification,
    deleteNotification,
    toggleActive,
    toggleFavorite,
  } = useNotifications();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('time-asc');

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  const filteredAndSortedNotifications = useMemo(() => {
    let filtered = notifications;

    // Apply filter
    switch (filter) {
      case 'active':
        filtered = notifications.filter(n => n.isActive);
        break;
      case 'inactive':
        filtered = notifications.filter(n => !n.isActive);
        break;
      case 'favorites':
        filtered = notifications.filter(n => n.isFavorite);
        break;
      default:
        filtered = notifications;
    }

    // Apply sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case 'time-asc':
          return a.time.localeCompare(b.time);
        case 'time-desc':
          return b.time.localeCompare(a.time);
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'created-asc':
          return a.createdAt - b.createdAt;
        case 'created-desc':
          return b.createdAt - a.createdAt;
        default:
          return 0;
      }
    });

    return sorted;
  }, [notifications, filter, sort]);

  const handleAddNotification = () => {
    setIsAddModalOpen(true);
  };

  const handleEditNotification = (notification: Notification) => {
    setEditingNotification(notification);
    setIsEditModalOpen(true);
  };

  const handleSubmitAdd = (notificationData: Omit<Notification, 'id' | 'createdAt'>) => {
    addNotification(notificationData);
    setIsAddModalOpen(false);
  };

  const handleSubmitEdit = (notificationData: Omit<Notification, 'id' | 'createdAt'>) => {
    if (editingNotification) {
      updateNotification(editingNotification.id, notificationData);
      setIsEditModalOpen(false);
      setEditingNotification(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingNotification(null);
  };

  return (
    <div className="min-h-screen">
      <Header onAddNotification={handleAddNotification} />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notifications.length > 0 ? (
          <>
            <FilterSort
              filter={filter}
              sort={sort}
              onFilterChange={setFilter}
              onSortChange={setSort}
              notificationCount={notifications.length}
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onToggleActive={toggleActive}
                  onToggleFavorite={toggleFavorite}
                  onEdit={handleEditNotification}
                  onDelete={deleteNotification}
                />
              ))}
            </div>

            {filteredAndSortedNotifications.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400">
                  No notifications match your current filter.
                </p>
              </div>
            )}
          </>
        ) : (
          <EmptyState onAddNotification={handleAddNotification} />
        )}
      </main>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Notification"
      >
        <NotificationForm
          onSubmit={handleSubmitAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCancelEdit}
        title="Edit Notification"
      >
        <NotificationForm
          notification={editingNotification || undefined}
          onSubmit={handleSubmitEdit}
          onCancel={handleCancelEdit}
        />
      </Modal>
    </div>
  );
}