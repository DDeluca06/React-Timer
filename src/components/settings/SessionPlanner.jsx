import { useState, useContext } from 'react';
import { TimerContext } from '../../context/TimerContext';

const SessionPlanner = () => {
    const { settings, updateSettings } = useContext(TimerContext);
    const [templates, setTemplates] = useState(settings.sessionTemplates || []);
    const [newTemplate, setNewTemplate] = useState({
        name: '',
        focusTime: 25,
        shortBreak: 5,
        longBreak: 15,
        rounds: 4,
        goals: ''
    });

    const handleTemplateAdd = () => {
        if (!newTemplate.name) return;
        const updatedTemplates = [...templates, { ...newTemplate, id: Date.now() }];
        setTemplates(updatedTemplates);
        updateSettings({ sessionTemplates: updatedTemplates });
        setNewTemplate({
            name: '',
            focusTime: 25,
            shortBreak: 5,
            longBreak: 15,
            rounds: 4,
            goals: ''
        });
    };

    const handleTemplateDelete = (id) => {
        const updatedTemplates = templates.filter(template => template.id !== id);
        setTemplates(updatedTemplates);
        updateSettings({ sessionTemplates: updatedTemplates });
    };

    return (
        <div className="space-y-6">
            {/* Template Creation */}
            <div className="bg-light-card dark:bg-dark-card rounded-lg p-4">
                <h4 className="text-md font-medium mb-3">Create Session Template</h4>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Template Name"
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="number"
                            placeholder="Focus Time (min)"
                            value={newTemplate.focusTime}
                            onChange={(e) => setNewTemplate({ ...newTemplate, focusTime: parseInt(e.target.value) })}
                            className="px-3 py-2 border rounded-md"
                        />
                        <input
                            type="number"
                            placeholder="Rounds"
                            value={newTemplate.rounds}
                            onChange={(e) => setNewTemplate({ ...newTemplate, rounds: parseInt(e.target.value) })}
                            className="px-3 py-2 border rounded-md"
                        />
                    </div>
                    <textarea
                        placeholder="Session Goals"
                        value={newTemplate.goals}
                        onChange={(e) => setNewTemplate({ ...newTemplate, goals: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                        rows="2"
                    />
                    <button
                        onClick={handleTemplateAdd}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Add Template
                    </button>
                </div>
            </div>

            {/* Template List */}
            <div className="space-y-3">
                <h4 className="text-md font-medium">Saved Templates</h4>
                {templates.map(template => (
                    <div key={template.id} className="bg-light-card dark:bg-dark-card rounded-lg p-4 flex justify-between items-center">
                        <div>
                            <h5 className="font-medium">{template.name}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {template.focusTime}min × {template.rounds} rounds
                            </p>
                        </div>
                        <button
                            onClick={() => handleTemplateDelete(template.id)}
                            className="text-red-600 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionPlanner; 