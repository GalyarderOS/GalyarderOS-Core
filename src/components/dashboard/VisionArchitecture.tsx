import { useState } from "react";
import useVisionStore from "@/stores/useVisionStore";
import { CreateGoalModal } from "./vision/CreateGoalModal";
import VisionStatementSection from './vision/VisionStatementSection';
import StrategicGoalsSection from './vision/StrategicGoalsSection';
import VisionBoardSection from './vision/VisionBoardSection';
import { Goal as GoalType } from '@/stores/useVisionStore';

const VisionArchitecture = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<GoalType | undefined>(undefined);

  const {
    visionStatement,
    goals,
    visionBoardItems,
    updateVisionStatement,
    addGoal,
    updateGoal,
    deleteGoal,
    addBoardItem,
    updateBoardItem,
    deleteBoardItem,
    toggleMilestone,
  } = useVisionStore();

  const handleOpenModal = (goal?: GoalType) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingGoal(undefined);
    setIsModalOpen(false);
  };

  const handleSaveGoal = (goal: Omit<GoalType, 'id' | 'status' | 'milestones'>) => {
    if (editingGoal) {
      updateGoal(editingGoal.id, goal);
    } else {
      addGoal(goal);
    }
    handleCloseModal();
  };

  return (
    <div className="p-4 md:p-6 space-y-8 bg-background text-foreground">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Vision Architecture</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Construct the blueprint for your ideal future. Define your guiding vision, set strategic goals, and visualize your success.
        </p>
      </div>
      
      <VisionStatementSection
        statement={visionStatement}
        onUpdate={updateVisionStatement}
      />
      
      <StrategicGoalsSection
        goals={goals}
        onAddNew={() => handleOpenModal()}
        onEdit={(goal) => handleOpenModal(goal)}
        onDelete={deleteGoal}
        onToggleMilestone={toggleMilestone}
      />
      
      <VisionBoardSection
        items={visionBoardItems}
        onAddItem={addBoardItem}
        onUpdateItem={updateBoardItem}
        onDeleteItem={deleteBoardItem}
      />

      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveGoal}
        goal={editingGoal}
      />
    </div>
  );
};

export default VisionArchitecture;
