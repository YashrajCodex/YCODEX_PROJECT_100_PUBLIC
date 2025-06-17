
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Calendar, Star, Edit, Trash2, Clock, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GoalCard from '@/components/GoalCard';
import AddEditGoalModal from '@/components/AddEditGoalModal';
import GoalDetailModal from '@/components/GoalDetailModal';
import Timer from '@/components/Timer';
import BreathingGame from '@/components/BreathingGame';
import Navbar from '@/components/ui/Navbar';
import { Goal } from '@/Interface/GlobalInterface';

const Index = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [searchTerm, setSearchTerm] = useState <string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'in-progress' | 'completed' | 'starred'>('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'startDate' | 'name'>('deadline');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [activeTab, setActiveTab] = useState('goals');

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('personalGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('personalGoals', JSON.stringify(goals));
  }, [goals]);

  // Shortcut before opening the app to get to specific features
  useEffect(() => {
    const handleHashChange = () => {
      const hash =  window.location.hash.substring(1);
      if (['timer', 'breathing', 'goals'].includes(hash)) {
        setActiveTab(hash)
      } else {
        setActiveTab('goals')
      }
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const filteredAndSortedGoals = goals
    .filter(goal => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'starred') return goal.isStarred;
      return goal.status === activeFilter;
    })
    .filter(goal => 
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'startDate':
          return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        default:
          return 0;
      }
    });

  const handleSaveGoal = (goal: Omit<Goal, 'id'>) => {
    if (editingGoal) {
      setGoals(prev => prev.map(g => g.id === editingGoal.id ? { ...goal, id: editingGoal.id } : g));
    } else {
      const newGoal: Goal = {
        ...goal,
        id: Date.now().toString(),
      };
      setGoals(prev => [...prev, newGoal]);
    }
    setShowAddModal(false);
    setEditingGoal(null);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    setShowDetailModal(false);
  };

  const handleToggleStar = (id: string) => {
    setGoals(prev => prev.map(g => 
      g.id === id ? { ...g, isStarred: !g.isStarred } : g
    ));
  };

  const handleMarkComplete = (id: string) => {
    setGoals(prev => prev.map(g => 
      g.id === id ? { 
        ...g, 
        status: 'completed' as const, 
        progress: 100, 
        completionDate: new Date().toISOString().split('T')[0] 
      } : g
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <Navbar setActiveTab={setActiveTab} activeTab={activeTab}/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'goals' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="xs-max:scale-75 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search goals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="xs-max:scale-[0.80] flex gap-2">
                {(['all', 'in-progress', 'completed', 'starred'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {filter === 'in-progress' ? 'In Progress' : 
                     filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-white border border-gray-200 rounded-lg px-3 py-2"
              >
                <option value="deadline">Sort by Deadline</option>
                <option value="startDate">Sort by Start Date</option>
                <option value="name">Sort by Name</option>
              </select>

              <Button onClick={() => setShowAddModal(true)} className="md:scale-75 flex items-center gap-2">
                <Plus size={20} />
                Add Goal
              </Button>
            </div>

            {/* Goals Grid */}
            {filteredAndSortedGoals.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4">
                  <Calendar size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No goals found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || activeFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first goal to get started on your journey!'
                  }
                </p>
                {!searchTerm && activeFilter === 'all' && (
                  <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 mx-auto">
                    <Plus size={20} />
                    Create Your First Goal
                  </Button>
                )}
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
              >
                <AnimatePresence>
                  {filteredAndSortedGoals.map((goal, index) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      index={index}
                      onEdit={(goal) => {
                        setEditingGoal(goal);
                        setShowAddModal(true);
                      }}
                      onDelete={handleDeleteGoal}
                      onToggleStar={handleToggleStar}
                      onMarkComplete={handleMarkComplete}
                      onViewDetail={(goal) => {
                        setSelectedGoal(goal);
                        setShowDetailModal(true);
                      }}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'timer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Timer />
          </motion.div>
        )}

        {activeTab === 'breathing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <BreathingGame />
          </motion.div>
        )}
      </main>

      {/* Modals */}
      <AddEditGoalModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingGoal(null);
        }}
        onSave={handleSaveGoal}
        editingGoal={editingGoal}
      />

      <GoalDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        goal={selectedGoal}
        onEdit={(goal) => {
          setEditingGoal(goal);
          setShowAddModal(true);
          setShowDetailModal(false);
        }}
        onDelete={handleDeleteGoal}
        onToggleStar={handleToggleStar}
        onMarkComplete={handleMarkComplete}
      />
    </div>
  );
};

export default Index;
