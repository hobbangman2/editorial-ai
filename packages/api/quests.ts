export type QuestStatus = 'ACTIVE' | 'FINISHED' | 'REWARDED';

export interface Quest {
    id: string;
    parentId: string;
    studentId: string;
    title: string;
    targetCount: number;
    currentCount: number;
    rewardDescription: string;
    status: QuestStatus;
}

export class QuestService {
    private quests: Quest[] = [];

    createQuest(quest: Omit<Quest, 'id' | 'currentCount' | 'status'>): Quest {
        const newQuest: Quest = {
            ...quest,
            id: Math.random().toString(36).substr(2, 9),
            currentCount: 0,
            status: 'ACTIVE',
        };
        this.quests.push(newQuest);
        return newQuest;
    }

    updateProgress(studentId: string): void {
        const activeQuests = this.quests.filter(q => q.studentId === studentId && q.status === 'ACTIVE');
        for (const quest of activeQuests) {
            quest.currentCount += 1;
            if (quest.currentCount >= quest.targetCount) {
                quest.status = 'FINISHED';
                console.log(`Quest Finished: ${quest.title} for student ${studentId}`);
                // TODO: Send notification to parent
            }
        }
    }

    approveReward(questId: string): void {
        const quest = this.quests.find(q => q.id === questId);
        if (quest && quest.status === 'FINISHED') {
            quest.status = 'REWARDED';
        }
    }

    getStudentQuests(studentId: string): Quest[] {
        return this.quests.filter(q => q.studentId === studentId);
    }
}

export const questService = new QuestService();
