import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Download, CheckCircle, Circle } from 'lucide-react';
import { cn } from './lib/utils';

// Card Component
const Card = ({ className, children, ...props }) => (
  <div
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props}>
    {children}
  </div>
);

// Button Component
const Button = ({ className, variant = "default", size = "default", children, ...props }) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

// Checkbox Component
const Checkbox = ({ checked, onCheckedChange, className, ...props }) => (
  <button
    type="button"
    role="checkbox"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-primary text-primary-foreground" : "bg-background",
      className
    )}
    {...props}
  >
    {checked && (
      <CheckCircle className="h-3 w-3" />
    )}
  </button>
);

// Select Component
const Select = ({ value, onValueChange, children, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>{value || placeholder}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              onClick: () => {
                onValueChange(child.props.value);
                setIsOpen(false);
              }
            })
          )}
        </div>
      )}
    </div>
  );
};

const SelectItem = ({ value, children, onClick }) => (
  <div
    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    onClick={onClick}
  >
    {children}
  </div>
);

// Textarea Component
const Textarea = ({ className, ...props }) => (
  <textarea
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

// Main App Component
function App() {
  const [expandedStages, setExpandedStages] = useState({});
  const [evaluationData, setEvaluationData] = useState({
    stages: {
      'welcome-confirmation': {
        score: '',
        comments: '',
        checklist: {}
      },
      'initial-objections': {
        score: '',
        comments: '',
        checklist: {}
      },
      'identification-needs': {
        score: '',
        comments: '',
        checklist: {}
      },
      'product-presentation': {
        score: '',
        comments: '',
        checklist: {}
      },
      'preparation-courses': {
        score: '',
        comments: '',
        checklist: {}
      },
      'price-objection-handling': {
        score: '',
        comments: '',
        checklist: {}
      },
      'completion-sale': {
        score: '',
        comments: '',
        checklist: {}
      }
    }
  });

  const stagesConfig = {
    'welcome-confirmation': {
      title: 'Welcome & Confirmation',
      keyCriteria: [
        'Warm and professional greeting',
        'Confirmation of appointment details',
        'Setting expectations for the call',
        'Building initial rapport'
      ],
      checklistItems: [
        'Used prospect\'s name during greeting',
        'Confirmed meeting purpose and duration',
        'Asked about prospect\'s availability',
        'Established professional tone'
      ]
    },
    'initial-objections': {
      title: 'Initial Objections',
      keyCriteria: [
        'Acknowledged prospect concerns',
        'Used empathy and understanding',
        'Redirected to discovery questions',
        'Maintained positive momentum'
      ],
      checklistItems: [
        'Listened actively to objections',
        'Acknowledged concerns without arguing',
        'Asked clarifying questions',
        'Transitioned smoothly to next phase'
      ]
    },
    'identification-needs': {
      title: 'Identification of Needs',
      keyCriteria: [
        'Asked open-ended discovery questions',
        'Identified pain points and challenges',
        'Understood current situation',
        'Uncovered decision-making process'
      ],
      checklistItems: [
        'Used effective questioning techniques',
        'Identified specific business challenges',
        'Understood budget considerations',
        'Mapped decision-making stakeholders'
      ]
    },
    'product-presentation': {
      title: 'Product Presentation',
      keyCriteria: [
        'Tailored presentation to identified needs',
        'Highlighted relevant benefits',
        'Used compelling examples/case studies',
        'Maintained engagement throughout'
      ],
      checklistItems: [
        'Connected features to specific needs',
        'Provided relevant social proof',
        'Used visual aids effectively',
        'Checked for understanding regularly'
      ]
    },
    'preparation-courses': {
      title: 'Preparation for Courses',
      keyCriteria: [
        'Explained implementation process',
        'Set clear expectations',
        'Addressed potential concerns',
        'Built confidence in solution'
      ],
      checklistItems: [
        'Outlined onboarding steps',
        'Discussed timeline expectations',
        'Explained support resources',
        'Addressed implementation concerns'
      ]
    },
    'price-objection-handling': {
      title: 'Price & Objection Handling',
      keyCriteria: [
        'Presented pricing confidently',
        'Handled objections professionally',
        'Reinforced value proposition',
        'Used appropriate closing techniques'
      ],
      checklistItems: [
        'Presented pricing clearly',
        'Addressed price objections effectively',
        'Reinforced ROI and value',
        'Used trial closes appropriately'
      ]
    },
    'completion-sale': {
      title: 'Completion of Sale',
      keyCriteria: [
        'Asked for the commitment',
        'Handled final objections',
        'Confirmed next steps',
        'Maintained professional close'
      ],
      checklistItems: [
        'Used direct closing question',
        'Addressed final concerns',
        'Confirmed agreement terms',
        'Scheduled follow-up actions'
      ]
    }
  };

  const toggleStage = (stageId) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  const updateStageData = (stageId, field, value) => {
    setEvaluationData(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [stageId]: {
          ...prev.stages[stageId],
          [field]: value
        }
      }
    }));
  };

  const updateChecklistItem = (stageId, itemIndex, checked) => {
    setEvaluationData(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [stageId]: {
          ...prev.stages[stageId],
          checklist: {
            ...prev.stages[stageId].checklist,
            [itemIndex]: checked
          }
        }
      }
    }));
  };

  const summary = useMemo(() => {
    const stages = Object.values(evaluationData.stages);
    const totalScore = stages.reduce((sum, stage) => {
      const score = parseInt(stage.score) || 0;
      return sum + score;
    }, 0);

    let totalChecklistItems = 0;
    let completedItems = 0;

    Object.keys(stagesConfig).forEach(stageId => {
      const checklistItems = stagesConfig[stageId].checklistItems.length;
      totalChecklistItems += checklistItems;
      
      const stageChecklist = evaluationData.stages[stageId].checklist;
      completedItems += Object.values(stageChecklist).filter(Boolean).length;
    });

    return {
      totalScore,
      maxScore: Object.keys(stagesConfig).length * 5,
      completedItems,
      totalChecklistItems,
      completionPercentage: totalChecklistItems > 0 ? Math.round((completedItems / totalChecklistItems) * 100) : 0
    };
  }, [evaluationData, stagesConfig]);

  const exportToJSON = () => {
    const exportData = {
      evaluationData,
      summary,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `script-evaluation-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Script Evaluation Table
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Sales Call Audit & Performance Assessment
          </p>
        </div>

        <div className="space-y-6">
          {Object.entries(stagesConfig).map(([stageId, config]) => {
            const isExpanded = expandedStages[stageId];
            const stageData = evaluationData.stages[stageId];
            
            return (
              <Card key={stageId} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleStage(stageId)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{config.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      {stageData.score && (
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                          Score: {stageData.score}/5
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <CardContent className="space-y-6">
                        {/* Key Criteria */}
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-gray-900">
                            Key Criteria
                          </h4>
                          <ul className="space-y-2">
                            {config.keyCriteria.map((criteria, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <Circle className="h-2 w-2 mt-2 text-gray-400 flex-shrink-0" />
                                <span className="text-gray-700">{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Auditor Checklist */}
                        <div>
                          <h4 className="text-lg font-semibold mb-3 text-gray-900">
                            Auditor Checklist
                          </h4>
                          <div className="space-y-3">
                            {config.checklistItems.map((item, index) => (
                              <div key={index} className="flex items-center space-x-3">
                                <Checkbox
                                  checked={stageData.checklist[index] || false}
                                  onCheckedChange={(checked) => 
                                    updateChecklistItem(stageId, index, checked)
                                  }
                                />
                                <label className="text-sm text-gray-700 cursor-pointer flex-1">
                                  {item}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Score and Comments */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Score (1-5)
                            </label>
                            <Select
                              value={stageData.score}
                              onValueChange={(value) => updateStageData(stageId, 'score', value)}
                              placeholder="Select score"
                            >
                              <SelectItem value="1">1 - Poor</SelectItem>
                              <SelectItem value="2">2 - Below Average</SelectItem>
                              <SelectItem value="3">3 - Average</SelectItem>
                              <SelectItem value="4">4 - Good</SelectItem>
                              <SelectItem value="5">5 - Excellent</SelectItem>
                            </Select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Comments
                            </label>
                            <Textarea
                              placeholder="Add your observations and feedback..."
                              value={stageData.comments}
                              onChange={(e) => updateStageData(stageId, 'comments', e.target.value)}
                              className="min-h-[100px]"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>

        {/* Summary Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Evaluation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {summary.totalScore}/{summary.maxScore}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Score</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {summary.completedItems}/{summary.totalChecklistItems}
                </div>
                <div className="text-sm text-gray-600 mt-1">Checklist Items</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {summary.completionPercentage}%
                </div>
                <div className="text-sm text-gray-600 mt-1">Completion Rate</div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button onClick={exportToJSON} className="inline-flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export to JSON</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;