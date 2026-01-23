import React, { useState } from 'react';
import {
  GitBranch,
  GitPullRequest,
  GitMerge,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Users,
  User,
  Code,
  RefreshCw,
  Lock,
  Zap
} from 'lucide-react';

interface DecisionStep {
  id: string;
  question: string;
  icon: React.ReactNode;
  answers: {
    text: string;
    nextStep: string;
    command?: string;
    description?: string;
    warning?: boolean;
  }[];
  description?: string;
}

interface WorkflowStep {
  id: string;
  type: 'question' | 'action' | 'warning' | 'success';
  title: string;
  content: string;
  command?: string;
  icon: React.ReactNode;
  details?: string[];
}

const GitWorkflowDecisionTree: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<string>('start');
  const [workflowHistory, setWorkflowHistory] = useState<WorkflowStep[]>([]);
  const [teamSize, setTeamSize] = useState<'solo' | 'small' | 'large'>('small');
  const [branchType, setBranchType] = useState<'feature' | 'bugfix' | 'hotfix' | 'release'>('feature');

  const decisionSteps: Record<string, DecisionStep> = {
    start: {
      id: 'start',
      question: 'How are you starting your work?',
      icon: <Zap className="w-6 h-6" />,
      answers: [
        {
          text: 'Starting a new feature/bugfix',
          nextStep: 'create_branch',
          description: 'Create a new branch from main/develop'
        },
        {
          text: 'Continuing existing work',
          nextStep: 'check_status',
          description: 'Resume work on an existing branch'
        },
        {
          text: 'Need to update from remote',
          nextStep: 'sync_remote',
          description: 'Sync with team changes'
        }
      ]
    },
    
    create_branch: {
      id: 'create_branch',
      question: 'What type of work are you doing?',
      icon: <GitBranch className="w-6 h-6" />,
      answers: [
        {
          text: 'New Feature',
          nextStep: 'feature_branch',
          command: 'git checkout -b feature/your-feature-name',
          description: 'For new functionality'
        },
        {
          text: 'Bug Fix',
          nextStep: 'bugfix_branch',
          command: 'git checkout -b bugfix/issue-description',
          description: 'For fixing issues'
        },
        {
          text: 'Hotfix',
          nextStep: 'hotfix_branch',
          command: 'git checkout -b hotfix/urgent-fix',
          description: 'For urgent production fixes'
        }
      ]
    },

    check_status: {
      id: 'check_status',
      question: 'What is your current branch status?',
      icon: <Code className="w-6 h-6" />,
      answers: [
        {
          text: 'Local changes not staged',
          nextStep: 'stage_changes',
          command: 'git status',
          description: 'Check what has changed'
        },
        {
          text: 'Changes staged but not committed',
          nextStep: 'commit_changes',
          command: 'git diff --staged',
          description: 'Review staged changes'
        },
        {
          text: 'Ready to push to remote',
          nextStep: 'before_push_check',
          command: 'git log --oneline -5',
          description: 'Review recent commits'
        }
      ]
    },

    before_push_check: {
      id: 'before_push_check',
      question: 'Are you working solo or with a team?',
      icon: teamSize === 'solo' ? <User className="w-6 h-6" /> : <Users className="w-6 h-6" />,
      answers: [
        {
          text: 'Working Solo',
          nextStep: 'solo_push',
          description: 'Only you are working on this branch'
        },
        {
          text: 'Working with Team',
          nextStep: 'team_push',
          description: 'Multiple people on same branch'
        }
      ],
      description: `Team Size: ${teamSize === 'solo' ? 'Solo Developer' : teamSize === 'small' ? 'Small Team (2-5)' : 'Large Team (5+)'}`
    },

    team_push: {
      id: 'team_push',
      question: 'Before pushing, did you pull latest changes?',
      icon: <GitPullRequest className="w-6 h-6" />,
      answers: [
        {
          text: 'Yes, already pulled',
          nextStep: 'verify_conflicts',
          command: 'git pull origin current-branch',
          description: 'Remote is synced with local'
        },
        {
          text: 'No, need to pull first',
          nextStep: 'pull_changes',
          command: 'git fetch && git pull origin current-branch',
          description: 'ALWAYS pull before push in team',
          warning: true
        },
        {
          text: 'Unsure, check remote status',
          nextStep: 'check_remote',
          command: 'git fetch && git status',
          description: 'Safe check before proceeding'
        }
      ]
    },

    pull_changes: {
      id: 'pull_changes',
      question: 'Pull resulted in conflicts?',
      icon: <AlertCircle className="w-6 h-6" />,
      answers: [
        {
          text: 'Yes, have conflicts',
          nextStep: 'resolve_conflicts',
          command: 'git mergetool',
          description: 'Need to resolve merge conflicts',
          warning: true
        },
        {
          text: 'No conflicts',
          nextStep: 'after_pull_push',
          command: 'git push origin current-branch',
          description: 'Ready to push after pull'
        }
      ]
    },

    resolve_conflicts: {
      id: 'resolve_conflicts',
      question: 'How to resolve conflicts?',
      icon: <GitMerge className="w-6 h-6" />,
      answers: [
        {
          text: 'Use merge tool',
          nextStep: 'merge_tool',
          command: 'git mergetool',
          description: 'Visual conflict resolution'
        },
        {
          text: 'Resolve manually',
          nextStep: 'manual_resolve',
          command: '# Edit conflicted files\n# Then: git add .',
          description: 'Edit files marked with <<<<<<<'
        },
        {
          text: 'Abort and discuss with team',
          nextStep: 'abort_merge',
          command: 'git merge --abort',
          description: 'When conflicts are complex',
          warning: true
        }
      ]
    },

    solo_push: {
      id: 'solo_push',
      question: 'Ready to push solo changes?',
      icon: <CheckCircle className="w-6 h-6" />,
      answers: [
        {
          text: 'Push directly',
          nextStep: 'direct_push',
          command: 'git push origin current-branch',
          description: 'Safe when you are the only contributor'
        },
        {
          text: 'Fetch and check first',
          nextStep: 'safe_solo_push',
          command: 'git fetch && git status',
          description: 'Recommended safety check'
        }
      ]
    },

    after_pull_push: {
      id: 'after_pull_push',
      question: 'Ready to push to remote?',
      icon: <ArrowRight className="w-6 h-6" />,
      answers: [
        {
          text: 'Push to origin',
          nextStep: 'create_pr',
          command: 'git push origin current-branch',
          description: 'Push to remote branch'
        },
        {
          text: 'Need force push (careful!)',
          nextStep: 'force_push_warning',
          command: 'git push origin current-branch --force-with-lease',
          description: 'Only after team coordination',
          warning: true
        }
      ]
    },

    create_pr: {
      id: 'create_pr',
      question: 'Create Pull Request?',
      icon: <GitPullRequest className="w-6 h-6" />,
      answers: [
        {
          text: 'Yes, create PR/MR',
          nextStep: 'pr_guidelines',
          description: 'Follow team PR guidelines'
        },
        {
          text: 'Direct merge (if allowed)',
          nextStep: 'direct_merge',
          command: 'git checkout main && git merge feature-branch',
          description: 'Only for trusted/maintainers',
          warning: true
        }
      ]
    }
  };

  const workflowSteps: Record<string, WorkflowStep> = {
    stage_changes: {
      id: 'stage_changes',
      type: 'action',
      title: 'Stage Your Changes',
      content: 'Add changes to staging area',
      command: 'git add .  # or git add specific-file',
      icon: <RefreshCw className="w-6 h-6" />,
      details: [
        'git add . - Stage all changes',
        'git add file1.js file2.js - Stage specific files',
        'git add -p - Interactive staging'
      ]
    },

    commit_changes: {
      id: 'commit_changes',
      type: 'action',
      title: 'Commit Your Changes',
      content: 'Create a commit with meaningful message',
      command: 'git commit -m "feat: add new feature"',
      icon: <CheckCircle className="w-6 h-6" />,
      details: [
        'Use conventional commit messages',
        'Keep commits atomic (one logical change)',
        'Reference issue/ticket numbers'
      ]
    },

    verify_conflicts: {
      id: 'verify_conflicts',
      type: 'action',
      title: 'Verify No Conflicts',
      content: 'Check that merge/pull didn\'t create conflicts',
      command: 'git status | grep -i conflict',
      icon: <AlertCircle className="w-6 h-6" />,
      details: [
        'Check git status output',
        'Look for "both modified" in files',
        'Ensure working tree is clean'
      ]
    },

    force_push_warning: {
      id: 'force_push_warning',
      type: 'warning',
      title: '⚠️ Force Push Warning',
      content: 'Force pushing can overwrite team members\' work',
      icon: <Lock className="w-6 h-6" />,
      details: [
        'ALWAYS coordinate with team before force push',
        'Use --force-with-lease instead of --force',
        'Consider rebase instead of force push'
      ]
    },

    pr_guidelines: {
      id: 'pr_guidelines',
      type: 'success',
      title: 'PR Creation Guidelines',
      content: 'Follow these best practices for Pull Requests',
      icon: <GitPullRequest className="w-6 h-6" />,
      details: [
        '✅ Clear title and description',
        '✅ Link related issues',
        '✅ Request reviews from teammates',
        '✅ Ensure CI passes',
        '✅ Update documentation if needed'
      ]
    }
  };

  const handleAnswerClick = (nextStep: string, answerText: string, command?: string) => {
    const currentDecision = decisionSteps[currentStep];
    const newWorkflowStep: WorkflowStep = {
      id: currentStep,
      type: 'action',
      title: `Chose: ${answerText}`,
      content: currentDecision.question,
      command: command,
      icon: currentDecision.icon
    };

    setWorkflowHistory(prev => [...prev, newWorkflowStep]);
    setCurrentStep(nextStep);
  };

  const handleRestart = () => {
    setCurrentStep('start');
    setWorkflowHistory([]);
  };

  const currentDecision = decisionSteps[currentStep];
  const currentWorkflowStep = workflowSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Git/GitHub Team Workflow Decision Tree
          </h1>
          <p className="text-gray-600">
            Interactive guide for collaborative development workflows
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Decision Tree */}
          <div className="lg:col-span-2 space-y-6">
            {/* Team Configuration */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Configuration
              </h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setTeamSize('solo')}
                  className={`px-4 py-2 rounded-lg ${teamSize === 'solo' ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  <User className="inline w-4 h-4 mr-2" />
                  Solo Developer
                </button>
                <button
                  onClick={() => setTeamSize('small')}
                  className={`px-4 py-2 rounded-lg ${teamSize === 'small' ? 'bg-green-100 text-green-700 border-2 border-green-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  <Users className="inline w-4 h-4 mr-2" />
                  Small Team (2-5)
                </button>
                <button
                  onClick={() => setTeamSize('large')}
                  className={`px-4 py-2 rounded-lg ${teamSize === 'large' ? 'bg-purple-100 text-purple-700 border-2 border-purple-300' : 'bg-gray-100 text-gray-700'}`}
                >
                  <Users className="inline w-4 h-4 mr-2" />
                  Large Team (5+)
                </button>
              </div>
            </div>

            {/* Current Decision */}
            {currentDecision && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    {currentDecision.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {currentDecision.question}
                    </h2>
                    {currentDecision.description && (
                      <p className="text-gray-600 text-sm mt-1">
                        {currentDecision.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {currentDecision.answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(answer.nextStep, answer.text, answer.command)}
                      className={`w-full text-left p-4 rounded-lg border transition-all hover:shadow-md ${answer.warning ? 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-800">{answer.text}</h3>
                          {answer.description && (
                            <p className="text-sm text-gray-600 mt-1">{answer.description}</p>
                          )}
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                      {answer.command && (
                        <div className="mt-3 p-3 bg-gray-800 text-gray-100 rounded-md font-mono text-sm overflow-x-auto">
                          {answer.command}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Workflow Step Details */}
            {currentWorkflowStep && (
              <div className={`bg-white rounded-xl shadow-md p-6 ${currentWorkflowStep.type === 'warning' ? 'border-l-4 border-yellow-500' : currentWorkflowStep.type === 'success' ? 'border-l-4 border-green-500' : ''}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${currentWorkflowStep.type === 'warning' ? 'bg-yellow-50' : currentWorkflowStep.type === 'success' ? 'bg-green-50' : 'bg-blue-50'}`}>
                    {currentWorkflowStep.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{currentWorkflowStep.title}</h2>
                    <p className="text-gray-600">{currentWorkflowStep.content}</p>
                  </div>
                </div>

                {currentWorkflowStep.command && (
                  <div className="mb-4">
                    <div className="font-medium text-gray-700 mb-2">Command:</div>
                    <div className="p-3 bg-gray-800 text-gray-100 rounded-md font-mono text-sm overflow-x-auto">
                      {currentWorkflowStep.command}
                    </div>
                  </div>
                )}

                {currentWorkflowStep.details && (
                  <div>
                    <div className="font-medium text-gray-700 mb-2">Details:</div>
                    <ul className="space-y-2">
                      {currentWorkflowStep.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                          {currentWorkflowStep.type === 'success' ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          ) : (
                            <ArrowRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          )}
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - History & Quick Actions */}
          <div className="space-y-6">
            {/* Workflow History */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Workflow History</h2>
                <button
                  onClick={handleRestart}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Restart
                </button>
              </div>

              {workflowHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <RefreshCw className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No steps taken yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {workflowHistory.map((step, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                          {index + 1}
                        </div>
                        <h3 className="font-medium text-gray-800">{step.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{step.content}</p>
                      {step.command && (
                        <div className="text-xs font-mono bg-gray-800 text-gray-100 p-2 rounded">
                          {step.command}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Reference */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Reference</h2>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-1">Team Workflow</h3>
                  <p className="text-sm text-blue-600">Always pull before push</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-1">Solo Workflow</h3>
                  <p className="text-sm text-green-600">Direct push usually safe</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-1">⚠️ Force Push</h3>
                  <p className="text-sm text-yellow-600">Always coordinate with team</p>
                </div>
              </div>
            </div>

            {/* Git Status Check */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Status Check</h2>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded border">
                  <code className="text-sm text-gray-700">git status</code>
                  <p className="text-xs text-gray-500 mt-1">Check current branch state</p>
                </div>
                <div className="p-3 bg-gray-50 rounded border">
                  <code className="text-sm text-gray-700">git fetch</code>
                  <p className="text-xs text-gray-500 mt-1">Safe check for remote changes</p>
                </div>
                <div className="p-3 bg-gray-50 rounded border">
                  <code className="text-sm text-gray-700">git log --oneline -5</code>
                  <p className="text-xs text-gray-500 mt-1">View recent commits</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Interactive Git/GitHub Workflow Guide • Use this tree to make collaborative development decisions</p>
        </div>
      </div>
    </div>
  );
};

export default GitWorkflowDecisionTree;