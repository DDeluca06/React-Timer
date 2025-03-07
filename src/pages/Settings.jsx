import NavBar from "../components/ui/NavBar";
import SettingsPanel from "../components/settings/SettingsPanel";

function Settings() {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-custom">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
                                Settings
                            </h1>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">
                                Customize your Pomodoro Timer experience!
                            </p>
                        </div>
                        <div className="p-6">
                            <SettingsPanel />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;