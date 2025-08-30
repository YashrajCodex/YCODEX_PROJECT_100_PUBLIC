'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isActive: boolean;
  isFavorite: boolean;
  createdAt: number;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTimers, setActiveTimers] = useState<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      const parsedNotifications = JSON.parse(saved);
      setNotifications(parsedNotifications);
      
      // Restart active timers
      parsedNotifications.forEach((notification: Notification) => {
        if (notification.isActive) {
          scheduleNotification(notification);
        }
      });
    }

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const saveNotifications = useCallback((newNotifications: Notification[]) => {
    localStorage.setItem('notifications', JSON.stringify(newNotifications));
    setNotifications(newNotifications);
  }, []);

  const scheduleNotification = useCallback((notification: Notification) => {
    const now = new Date();
    const [hours, minutes] = notification.time.split(':').map(Number);
    const scheduledTime = new Date();
    scheduledTime.setHours(hours, minutes, 0, 0);
    
    // If the time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }
    
    const timeout = setTimeout(() => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/icon-192.png',
        });
      }
      
      // Schedule for the next day
      scheduleNotification(notification);
    }, scheduledTime.getTime() - now.getTime());
    
    setActiveTimers(prev => {
      const newTimers = new Map(prev);
      newTimers.set(notification.id, timeout);
      return newTimers;
    });
  }, []);

  const clearTimer = useCallback((id: string) => {
    const timer = activeTimers.get(id);
    if (timer) {
      clearTimeout(timer);
      setActiveTimers(prev => {
        const newTimers = new Map(prev);
        newTimers.delete(id);
        return newTimers;
      });
    }
  }, [activeTimers]);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: Date.now(),
    };
    
    const updated = [...notifications, newNotification];
    saveNotifications(updated);
    
    if (newNotification.isActive) {
      scheduleNotification(newNotification);
    }
  }, [notifications, saveNotifications, scheduleNotification]);

  const updateNotification = useCallback((id: string, updates: Partial<Notification>) => {
    const updated = notifications.map(notification => {
      if (notification.id === id) {
        const updatedNotification = { ...notification, ...updates };
        
        // Clear existing timer
        clearTimer(id);
        
        // Schedule new timer if active
        if (updatedNotification.isActive) {
          scheduleNotification(updatedNotification);
        }
        
        return updatedNotification;
      }
      return notification;
    });
    
    saveNotifications(updated);
  }, [notifications, saveNotifications, scheduleNotification, clearTimer]);

  const deleteNotification = useCallback((id: string) => {
    clearTimer(id);
    const updated = notifications.filter(notification => notification.id !== id);
    saveNotifications(updated);
  }, [notifications, saveNotifications, clearTimer]);

  const toggleActive = useCallback((id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (!notification) return;
    
    if (notification.isActive) {
      clearTimer(id);
    } else {
      scheduleNotification(notification);
    }
    
    updateNotification(id, { isActive: !notification.isActive });
  }, [notifications, updateNotification, scheduleNotification, clearTimer]);

  const toggleFavorite = useCallback((id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      updateNotification(id, { isFavorite: !notification.isFavorite });
    }
  }, [notifications, updateNotification]);

  return {
    notifications,
    addNotification,
    updateNotification,
    deleteNotification,
    toggleActive,
    toggleFavorite,
  };
}